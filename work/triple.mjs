// Stack three consecutive final tiles for review: node work/triple.mjs ep05 12  → scratch/triple-ep05-012.png (tiles 12,13,14)
import fs from 'node:fs'; import path from 'node:path'; import sharp from 'sharp';
const [ep, start, count = 3, W = 640] = process.argv.slice(2);
const parts = []; let y = 0;
for (let i = +start; i < +start + +count; i++) {
  const f = path.join('site', ep, String(i).padStart(3, '0') + '.webp');
  if (!fs.existsSync(f)) break;
  const buf = await sharp(f).resize({ width: +W }).png().toBuffer();
  const { height } = await sharp(buf).metadata();
  parts.push({ input: buf, top: y, left: 0 }); y += height + 8;
}
const out = path.join('scratch', `triple-${ep}-${String(start).padStart(3, '0')}.png`);
await sharp({ create: { width: +W, height: y, channels: 3, background: '#ff00ff' } }).composite(parts).png().toFile(out);
console.log(out, `(${parts.length} tiles; magenta = gaps between tiles)`);
