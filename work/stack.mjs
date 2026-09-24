// node work/stack.mjs out.png a.png b.png ... [--w 700]  → stacks images vertically (scaled to width)
import sharp from 'sharp';
const args = process.argv.slice(2); let W = 700; const wi = args.indexOf('--w'); if (wi >= 0) { W = +args[wi + 1]; args.splice(wi, 2); }
const [out, ...files] = args;
const imgs = await Promise.all(files.map(async (f) => { const b = await sharp(f).resize({ width: W }).png().toBuffer(); const m = await sharp(b).metadata(); return { b, h: m.height }; }));
const H = imgs.reduce((s, i) => s + i.h + 8, 0);
let y = 0; const comp = imgs.map((i) => { const c = { input: i.b, top: y, left: 0 }; y += i.h + 8; return c; });
await sharp({ create: { width: W, height: H, channels: 3, background: '#222' } }).composite(comp).png().toFile(out);
console.log(out);
