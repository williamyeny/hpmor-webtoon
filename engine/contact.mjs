// Stack rendered preview PNGs into contact sheets for review: node engine/contact.mjs ep01 [width=520] [maxH=2400]
import fs from 'node:fs'; import path from 'node:path'; import sharp from 'sharp';
const [ep, W = 520, MAXH = 2400] = process.argv.slice(2);
const dir = 'scratch';
const files = fs.readdirSync(dir).filter((f) => f.startsWith(ep + '-') && /\d{3}\.png$/.test(f)).sort();
let group = [], h = 0, n = 0;
const flush = async () => {
  if (!group.length) return;
  const parts = []; let y = 0;
  for (const g of group) { parts.push({ input: g.buf, top: y, left: 0 }); y += g.h + 6; }
  await sharp({ create: { width: +W, height: y, channels: 3, background: '#222' } }).composite(parts).png().toFile(path.join(dir, `sheet-${ep}-${String(++n).padStart(2, '0')}.png`));
  console.log(`sheet ${n}: ${group.map((g) => g.name).join(', ')}`);
  group = []; h = 0;
};
for (const f of files) {
  const buf = await sharp(path.join(dir, f)).resize({ width: +W }).png().toBuffer();
  const { height } = await sharp(buf).metadata();
  if (h + height > MAXH) await flush();
  group.push({ buf, h: height, name: f.match(/(\d{3})/)[1] }); h += height + 6;
}
await flush();
