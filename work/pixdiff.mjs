// node work/pixdiff.mjs epXX [n,n,...] → per-tile % of pixels that changed noticeably vs git HEAD
import sharp from 'sharp'; import { execSync } from 'node:child_process'; import fs from 'node:fs';
const ep = process.argv[2];
const files = execSync(`git status --short site/${ep}`).toString().split('\n').filter((l) => l.endsWith('.webp')).map((l) => l.trim().split(/\s+/).pop());
const out = [];
for (const f of files) {
  let old; try { old = execSync(`git show HEAD:${f}`, { maxBuffer: 1 << 26 }); } catch { out.push([f, 'new']); continue; }
  const a = await sharp(old).raw().toBuffer({ resolveWithObject: true }), b = await sharp(fs.readFileSync(f)).raw().toBuffer({ resolveWithObject: true });
  if (a.info.height !== b.info.height) { out.push([f, 'size']); continue; }
  let n = 0; const ch = a.info.channels; for (let i = 0; i < a.data.length; i += ch) { if (Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]) > 60) n++; }
  out.push([f, (100 * n / (a.data.length / ch)).toFixed(2)]);
}
console.log(out.filter(([, v]) => v === 'new' || v === 'size' || +v > 0.05).map(([f, v]) => f.replace(/.*\/0*/, '').replace('.webp', '') + ':' + v).join(' '));
