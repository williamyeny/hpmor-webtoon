// London & Diagon Alley: Charing Cross Road, the Leaky Cauldron, its courtyard, the brick archway,
// the Alley itself (procedural crooked shopfronts), and Gringotts.
import { C } from '../core/palette.js';
import { g, path, rect, circle, ellipse, line, polygon, text, smoothD, rng, shade, mixHex, uid, r2 } from '../core/svg.js';
import * as K from './kit.js';

export const FLOOR = 900;
const bl = K.bl;

// ---------------------------------------------------------------- Charing Cross Road (2400 × 1200), pub door at x≈1200
export function charingCross(o = {}) {
  let out = rect(-200, -300, 2800, 1600, { fill: '#8f9aa8' });
  const fronts = [['#6b4a3a', 'BOOKS'], ['#3d4f6b', 'RECORDS'], [null, null], ['#7a2e2e', 'CAFÉ'], ['#4a5a3a', 'BOOKS & MAPS']];
  let x = -100;
  for (let i = 0; i < fronts.length; i++) {
    const [col, name] = fronts[i];
    const w = i === 2 ? 360 : 520;
    if (!col) { // the Leaky Cauldron: grubby, overlooked
      out += rect(x, 120, w, 780, { fill: '#4a3a30', ...bl(2) });
      out += K.brickWall(x + 4, 124, w - 8, 772, '#5e4034', 44);
      out += rect(x, 124, w, 772, { fill: '#2a2a33', opacity: 0.35 });
      out += rect(x + 40, 250, w - 80, 90, { fill: '#2a1c14', ...bl(2) }) + text(x + w / 2, 310, 'The Leaky Cauldron', { 'font-family': 'IM Fell English', 'font-size': 40, fill: '#c9b48a', 'text-anchor': 'middle', opacity: 0.8 });
      out += rect(x + 110, 450, 140, 450, { fill: '#3a2a20', ...bl(2) }) + rect(x + 124, 470, 112, 120, { fill: '#8a6a3a', opacity: 0.7, ...bl(1.4) });
      out += rect(x + 20, 440, 70, 110, { fill: '#6a5a3a', ...bl(1.6) }) + rect(x + w - 90, 440, 70, 110, { fill: '#6a5a3a', ...bl(1.6) });
      // hanging sign: a cauldron
      out += line(x + w - 20, 200, x + w + 30, 200, bl(3)) + path(`M${x + w - 5},210 Q${x + w + 20},270 ${x + w + 45},210Z`, { fill: '#2a2a2a', ...bl(2) });
      x += w; continue;
    }
    out += rect(x, 60, w, 840, { fill: col, ...bl(2) });
    out += rect(x + 30, 110, w - 60, 90, { fill: '#1d1a1a', ...bl(1.6) }) + text(x + w / 2, 172, name, { 'font-family': 'Alegreya Sans', 'font-weight': 800, 'font-size': 46, fill: '#efe2c4', 'text-anchor': 'middle', 'letter-spacing': 3 });
    out += rect(x + 40, 330, w - 220, 420, { fill: '#c9d3d8', ...bl(2) }) + rect(x + 40, 330, w - 220, 420, { fill: '#fff', opacity: 0.25 });
    out += K.bookPile(x + 130, 740, 6, i * 7) + K.bookPile(x + 250, 740, 4, i * 9);
    out += rect(x + w - 160, 450, 120, 450, { fill: shade(col, -0.3), ...bl(2) });
    x += w;
  }
  out += rect(-200, 900, 2800, 60, { fill: '#9a958a', ...bl(1.6) });
  out += rect(-200, 960, 2800, 400, { fill: '#4d4c52' });
  for (let i = 0; i < 20; i++) out += line(-200 + i * 150, 930, -200 + i * 150, 960, bl(1.2, { opacity: 0.5 }));
  return out;
}

// ---------------------------------------------------------------- The Leaky Cauldron, inside (2200 × 1100)
export function leakyInterior(o = {}) {
  let out = rect(-200, -200, 2600, 1500, { fill: '#2e2019' });
  out += K.wallpaper(0, 0, 2200, FLOOR, '#4a3326', { stripes: true, c2: '#3e2a1f' });
  // beams
  for (let x = 0; x <= 2200; x += 440) out += rect(x - 20, 0, 40, FLOOR, { fill: '#2a1a10', ...bl(1.8) });
  out += rect(0, 60, 2200, 36, { fill: '#2a1a10', ...bl(1.8) });
  // fireplace (left)
  out += K.fireplace(300, FLOOR, 360, 330, { candles: true });
  // bar (right) with bottles
  out += rect(1400, 330, 760, 280, { fill: '#3a2618', ...bl(2) });
  const R = rng(9);
  for (let s = 0; s < 3; s++) { out += rect(1420, 380 + s * 80, 720, 10, { fill: '#5a3a22', ...bl(1.2) }); for (let i = 0; i < 18; i++) { const bx = 1440 + i * 38 + R.range(-4, 4), h = R.range(34, 60); out += rect(bx, 380 + s * 80 - h, 22, h, { fill: R.pick(['#3d5a3e', '#6e2436', '#b99a5e', '#274060', '#8a5a2a']), opacity: 0.9, ...bl(1), rx: 5 }); } }
  if (o.counter !== false) out += leakyCounter();
  // lanterns
  for (const lx of [700, 1150, 1700]) out += line(lx, 96, lx, 200, bl(2)) + rect(lx - 18, 200, 36, 50, { fill: '#f3c66f', ...bl(1.6) }) + K.glow(lx, 225, 220, C.candle, 0.4);
  // floor
  out += rect(0, FLOOR - 12, 2200, 14, { fill: '#1d130c' });
  out += K.floorboards(-200, FLOOR, 2600, 500, '#5a3a24', 13);
  // tables & stools (back row)
  for (const tx of [760, 1120]) out += K.table(tx, FLOOR + 40, 200, 120, '#5e3b22') + g({ transform: `translate(${tx - 40},${FLOOR - 94})` }, circle(0, 0, 12, { fill: '#c9b48a', ...bl(1.2) }));
  out += K.glow(300, FLOOR - 120, 360, C.ember, 0.35);
  return out;
}

export function leakyCounter() {
  let out = rect(1380, 640, 800, 40, { fill: '#6b4429', ...bl(2) }) + rect(1400, 680, 760, 370, { fill: '#4a2e1b', ...bl(2) });
  for (let i = 0; i < 5; i++) out += rect(1430 + i * 150, 700, 110, 330, { fill: '#3e2716', ...bl(1.2) });
  return out;
}

// ---------------------------------------------------------------- the courtyard behind the pub (1600 × 1200)
export function courtyard(o = {}) {
  let out = rect(-300, -400, 2200, 1800, { fill: '#6d7a8a' });
  out += K.brickWall(-300, -100, 2200, 1000, '#7a4232', 55);
  out += rect(-300, -100, 2200, 1000, { fill: '#2a2a33', opacity: 0.18 });
  out += rect(-300, 900, 2200, 500, { fill: '#5e5a52' });
  for (let i = 0; i < 16; i++) out += line(-300 + i * 140, 900, -300 + i * 180 - 100, 1400, bl(1, { opacity: 0.35 }));
  // bins & weeds
  out += rect(120, 700, 150, 210, { fill: '#5d6a5a', ...bl(2), rx: 8 }) + ellipse(195, 700, 80, 18, { fill: '#6d7a6a', ...bl(2) });
  out += rect(300, 740, 130, 170, { fill: '#6a5d4a', ...bl(2), rx: 8 });
  for (let i = 0; i < 12; i++) out += path(`M${60 + i * 40},905 q-6,-30 4,-50 M${70 + i * 40},905 q8,-24 18,-34`, { fill: 'none', stroke: '#4f7045', 'stroke-width': 3 });
  // the magic bricks (target), subtly marked
  if (o.mark !== false) out += rect(1000, 420, 58, 22, { fill: '#9a5a44', stroke: '#e0c070', 'stroke-width': 2, opacity: 0.6 });
  return out;
}

// the archway opening: stage 0 = wall, 1 = bricks shuffling, 2 = hole dilating, 3 = full arch showing the Alley
export function archway(stage = 3, view = '') {
  const R = rng(66);
  let out = '';
  const cx = 1030, cy = 560;
  if (stage >= 2) {
    const r = stage === 2 ? 180 : 520;
    const id = uid('ar');
    out += `<clipPath id="${id}"><path d="M${cx - r * 0.75},${900} L${cx - r * 0.75},${cy - r * 0.2} Q${cx - r * 0.75},${cy - r * 1.05} ${cx},${cy - r * 1.05} Q${cx + r * 0.75},${cy - r * 1.05} ${cx + r * 0.75},${cy - r * 0.2} L${cx + r * 0.75},900Z"/></clipPath>`;
    out += g({ 'clip-path': `url(#${id})` }, view);
    out += path(`M${cx - r * 0.75},${900} L${cx - r * 0.75},${cy - r * 0.2} Q${cx - r * 0.75},${cy - r * 1.05} ${cx},${cy - r * 1.05} Q${cx + r * 0.75},${cy - r * 1.05} ${cx + r * 0.75},${cy - r * 0.2} L${cx + r * 0.75},900`, { fill: 'none', stroke: '#5a2a1e', 'stroke-width': 14 });
  }
  if (stage === 1 || stage === 2) {
    for (let i = 0; i < 26; i++) { const a = R() * Math.PI * 2, d = R.range(stage === 1 ? 20 : 200, stage === 1 ? 160 : 330); const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * 0.9; out += g({ transform: `rotate(${R.range(-40, 40)} ${x} ${y})` }, rect(x - 28, y - 11, 56, 22, { fill: R.pick(['#8a4a36', '#9a5a44', '#7b3e2e']), ...bl(1.4) })); }
    out += K.glow(cx, cy, 300, '#ffe9a8', 0.4);
  }
  return out;
}

// ---------------------------------------------------------------- Diagon Alley (a long street, 4000 × 1400)
const SHOPS = [
  { n: 'Eeylops Owl Emporium', c: '#4a5a3a', goods: 'owls' },
  { n: 'Bigbam\'s Brilliant Books', c: '#2f4f86', goods: 'books', fire: true },
  { n: 'Potage\'s Cauldrons', c: '#5a4a3a', goods: 'cauldrons' },
  { n: 'Slug & Jiggers', c: '#3d5a52', goods: 'jars' },
  { n: 'Madam Malkin\'s Robes', c: '#8a3a3a', goods: 'robes' },
  { n: 'Quality Quidditch', c: '#6b4a2a', goods: 'brooms' },
  { n: 'Flourish & Blotts', c: '#6e2436', goods: 'books' },
  { n: 'Magical Menagerie', c: '#5b3553', goods: 'jars' },
  { n: 'Ollivanders', c: '#3a3530', goods: 'wands' },
  { n: 'Wiseacre\'s Wizarding', c: '#35505a', goods: 'instruments' },
];
function goods(kind, x, y, w, h, R) {
  let out = '';
  if (kind === 'books') { out += K.bookRow(x + 10, y + h - 10, w - 20, h * 0.45, `b${x}`); out += K.bookRow(x + 10, y + h * 0.48, w - 20, h * 0.35, `c${x}`); }
  else if (kind === 'cauldrons') for (let i = 0; i < 3; i++) out += ellipse(x + w * (0.2 + i * 0.3), y + h - 40, 40, 34, { fill: '#2a2a2a', ...bl(1.6) }) + ellipse(x + w * (0.2 + i * 0.3), y + h - 70, 42, 8, { fill: '#444', ...bl(1.2) });
  else if (kind === 'jars') for (let i = 0; i < 8; i++) out += rect(x + 14 + (i % 4) * (w - 28) / 4, y + 30 + Math.floor(i / 4) * h * 0.45, 30, 50, { fill: R.pick(['#9fd0a8', '#e0b0d0', '#f0d080', '#a0c0e0']), opacity: 0.8, ...bl(1.2), rx: 6 });
  else if (kind === 'robes') for (let i = 0; i < 3; i++) out += path(`M${x + w * (0.2 + i * 0.3) - 26},${y + 40} L${x + w * (0.2 + i * 0.3) + 26},${y + 40} L${x + w * (0.2 + i * 0.3) + 40},${y + h - 10} L${x + w * (0.2 + i * 0.3) - 40},${y + h - 10}Z`, { fill: '#1d1a20', ...bl(1.4) }) + circle(x + w * (0.2 + i * 0.3), y + 30, 14, { fill: '#c9b48a', ...bl(1.2) });
  else if (kind === 'brooms') for (let i = 0; i < 3; i++) out += line(x + 20 + i * 40, y + h - 10, x + w - 30, y + 30 + i * 30, { stroke: '#8a6a3a', 'stroke-width': 7 }) + path(`M${x + w - 30},${y + 30 + i * 30} l40,-20 l6,24Z`, { fill: '#c9a24a', ...bl(1) });
  else if (kind === 'owls') for (let i = 0; i < 3; i++) out += g({ transform: `translate(${x + w * (0.22 + i * 0.28)},${y + h * 0.55}) scale(0.7)` }, circle(0, 0, 26, { fill: R.pick(['#9a7a52', '#e8e0d0', '#6a5a4a']), ...bl(1.6) }) + circle(-9, -6, 8, { fill: '#f3e6b0' }) + circle(9, -6, 8, { fill: '#f3e6b0' }) + circle(-9, -6, 3, { fill: C.ink }) + circle(9, -6, 3, { fill: C.ink }));
  else if (kind === 'wands') for (let i = 0; i < 12; i++) out += rect(x + 14 + (i % 6) * (w - 28) / 6, y + 40 + Math.floor(i / 6) * 60, (w - 40) / 6, 20, { fill: '#6b4429', ...bl(1), rx: 3 });
  else out += circle(x + w / 2, y + h / 2, h * 0.3, { fill: '#b08d45', ...bl(1.6) }) + circle(x + w / 2, y + h / 2, h * 0.2, { fill: 'none', stroke: C.ink, 'stroke-width': 2 });
  return out;
}
export function shopfront(x, w, shop, seed, o = {}) {
  const R = rng('shop' + seed);
  const h = R.range(820, 1180), tilt = R.range(-3, 3);
  const top = FLOOR - h;
  const col = shop.c;
  let out = '';
  // upper storeys: jettied (wider than the shop), plaster or brick, often half-timbered
  const ux = x - 18, uw = w + 36;
  const plaster = R.pick(['#e8dcc0', '#d9c8a8', '#e2d2b0', '#cdb994', mixHex(col, '#e2d2b0', 0.7)]);
  out += rect(ux, top, uw, h - 430, { fill: plaster, ...bl(2) });
  if (R.chance(0.6)) { // half-timbering
    let d = '';
    for (let yy = top + 10; yy < FLOOR - 450; yy += 150) d += `M${ux},${yy} L${ux + uw},${yy} `;
    for (let k = 0; k <= 4; k++) d += `M${ux + (uw * k) / 4},${top} L${ux + (uw * k) / 4},${FLOOR - 440} `;
    for (let yy = top + 10; yy < FLOOR - 600; yy += 150) for (let k = 0; k < 4; k++) if ((k + Math.round(yy)) % 2) d += `M${ux + (uw * k) / 4},${yy} L${ux + (uw * (k + 1)) / 4},${yy + 150} `;
    out += path(d, { stroke: '#4a2e1b', 'stroke-width': 9, fill: 'none', 'stroke-linecap': 'square' });
  }
  for (let wy = top + 40; wy < FLOOR - 520; wy += 150) for (let j = 0; j < 2; j++) {
    const wx = ux + uw * (0.14 + j * 0.46), lit = R.chance(0.35);
    out += rect(wx, wy, uw * 0.26, 96, { fill: lit ? '#f3c66f' : '#3a4a5a', ...bl(1.8) });
    for (let q = 1; q < 3; q++) out += line(wx + (uw * 0.26 * q) / 3, wy, wx + (uw * 0.26 * q) / 3, wy + 96, bl(0.9)) + line(wx, wy + 32 * q, wx + uw * 0.26, wy + 32 * q, bl(0.9));
    if (lit) out += K.glow(wx + uw * 0.13, wy + 48, 90, C.candle, 0.35);
    if (R.chance(0.3)) out += rect(wx - 6, wy + 96, uw * 0.26 + 12, 18, { fill: '#6b4429', ...bl(1.2) }) + [0, 1, 2].map((q) => circle(wx + 14 + q * 22, wy + 92, 9, { fill: R.pick(['#c43a32', '#e7bb4f', '#8a5fb0']) })).join('');
  }
  out += rect(ux - 6, FLOOR - 452, uw + 12, 24, { fill: '#4a2e1b', ...bl(1.6) }); // jetty beam
  // roof & chimneys
  const peak = R.range(90, 170);
  out += path(`M${ux - 26},${top + 12} L${x + w / 2},${top - peak} L${ux + uw + 26},${top + 12}Z`, { fill: R.pick(['#3b3444', '#4a3a3a', '#2f3a44', '#3f4a3a']), ...bl(2) });
  if (R.chance(0.5)) out += rect(x + w / 2 - 34, top - peak * 0.55, 68, 70, { fill: plaster, ...bl(1.6) }) + rect(x + w / 2 - 18, top - peak * 0.45, 36, 44, { fill: R.chance(0.5) ? '#f3c66f' : '#3a4a5a', ...bl(1.2) });
  if (R.chance(0.7)) { const cx2 = x + w * R.range(0.6, 0.85); out += rect(cx2, top - peak * 0.7 - 40, 36, 110, { fill: '#6a4a3a', ...bl(1.6) }) + circle(cx2 + 18, top - peak * 0.7 - 70, 20, { fill: '#cfc8c0', opacity: 0.35 }) + circle(cx2 + 34, top - peak * 0.7 - 110, 28, { fill: '#cfc8c0', opacity: 0.25 }); }
  // shop level
  const sy = FLOOR - 430;
  out += rect(x, sy, w, 430, { fill: col, ...bl(2.2) });
  out += rect(x + 10, sy + 10, w - 20, 70, { fill: shade(col, -0.35), ...bl(1.6) });
  const signCol = shop.fire ? '#ffb347' : '#f0dcb0';
  out += text(x + w / 2, sy + 58, shop.n, { 'font-family': 'IM Fell English', 'font-size': Math.min(36, (w - 40) / (shop.n.length * 0.56)), fill: signCol, 'text-anchor': 'middle' });
  if (shop.fire) out += K.glow(x + w / 2, sy + 45, w * 0.6, '#ff9a3c', 0.45);
  // window + door
  const ww = w * 0.58;
  out += rect(x + 20, sy + 100, ww, 250, { fill: '#e3d9c0', ...bl(1.8) });
  out += g({}, goods(shop.goods, x + 24, sy + 104, ww - 8, 242, R));
  out += rect(x + 20, sy + 100, ww, 250, { fill: '#fff5d6', opacity: 0.18 });
  out += line(x + 20 + ww / 2, sy + 100, x + 20 + ww / 2, sy + 350, bl(1.6)) + line(x + 20, sy + 225, x + 20 + ww, sy + 225, bl(1.2));
  const dx = x + w * 0.68;
  out += rect(dx, sy + 120, w * 0.26, 310, { fill: shade(col, -0.4), ...bl(2) }) + rect(dx + 10, sy + 134, w * 0.26 - 20, 100, { fill: '#f3c66f', opacity: 0.8 }) + circle(dx + w * 0.22, sy + 290, 5, { fill: '#c9a24a' });
  // awning
  if (R.chance(0.6)) { const ac = R.pick([C.burgundy, C.forest, C.navy, C.mustardDark]); let d = ''; const n = Math.round(w / 40); for (let i = 0; i < n; i++) d += `M${x + i * w / n},${sy + 86} L${x + (i + 1) * w / n},${sy + 86} L${x + (i + 1) * w / n - 6},${sy + 130} L${x + i * w / n + 6},${sy + 130}Z `; out += path(d, { fill: ac, ...bl(1.4) }) + path(d.split('Z').filter((_, i) => i % 2).join('Z') + 'Z', { fill: '#efe2c4', opacity: 0.85 }); }
  // hanging sign
  if (R.chance(0.5)) out += line(x + w - 10, sy - 30, x + w + 60, sy - 30, bl(3)) + rect(x + w + 10, sy - 26, 70, 56, { fill: '#e8d9b8', ...bl(1.6), rx: 6 });
  return g({ transform: `rotate(${r2(tilt)} ${x + w / 2} ${FLOOR})` }, out);
}
export function alleyLayout(o = {}) {
  const R = rng('lay' + (o.seed || 42));
  const out = [];
  let x = -200, i = o.start || 0;
  while (x < (o.width || 4000)) { const w = R.range(260, 380); out.push({ x, w, shop: SHOPS[i % SHOPS.length], i }); x += w + R.range(-6, 10); i++; }
  return out;
}
export const shopAt = (name, o = {}) => { const L = alleyLayout(o).find((l) => l.shop.n.startsWith(name)); return L ? L.x + L.w / 2 : 0; };
export function diagonAlley(o = {}) {
  const R = rng(o.seed || 42);
  let out = '';
  const id = uid('da');
  out += `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${o.night ? '#1d2440' : '#8fa6c0'}"/><stop offset="0.7" stop-color="${o.night ? '#6a4a5a' : '#f6d9a0'}"/><stop offset="1" stop-color="${o.night ? '#6a4a5a' : '#f3c98a'}"/></linearGradient></defs>`;
  out += rect(-400, -700, 4800, 1700, { fill: `url(#${id})` });
  // sunbeams & owls
  if (!o.night) for (let k = 0; k < 4; k++) out += K.lightShaft(300 + k * 900, -700, 200, 100 + k * 900, FLOOR, 500, '#fff2c8', 0.16);
  for (let k = 0; k < 6; k++) { const ox = R.range(0, 3800), oy = R.range(-500, -150), sc = R.range(0.3, 0.6); out += g({ transform: `translate(${ox},${oy}) scale(${sc})` }, path('M0,0 Q-40,-40 -90,-10 Q-40,-20 -10,10 Q30,-30 80,-14 Q40,-40 0,0Z', { fill: '#3a2a22', opacity: 0.8 }), circle(0, 6, 16, { fill: '#3a2a22', opacity: 0.8 })); }
  // far roofs silhouette
  for (let i = 0; i < 30; i++) { const x = -400 + i * 170; const hh = R.range(260, 480); out += path(`M${x},${FLOOR - 540 - hh * 0.2} L${x + 85},${FLOOR - 640 - hh * 0.3} L${x + 170},${FLOOR - 540 - hh * 0.2}Z`, { fill: '#8a7f8a', opacity: 0.5 }); }
  for (const L of alleyLayout(o)) out += shopfront(L.x, L.w, L.shop, L.i);
  // bunting
  for (let b = 0; b < 3; b++) { const y0 = FLOOR - 470 - b * 10; let d = `M-200,${y0}`; for (let k = 0; k < 12; k++) d += ` Q${-200 + k * 380 + 190},${y0 + 60} ${-200 + (k + 1) * 380},${y0}`; out += path(d, { fill: 'none', stroke: '#3e2a1f', 'stroke-width': 2 }); for (let k = 0; k < 60; k++) { const px = -200 + k * 76 + b * 20, py = y0 + 30 * Math.sin(((k % 5) / 5) * Math.PI) + 8; out += polygon([[px - 12, py], [px + 12, py], [px, py + 26]], { fill: [C.burgundy, C.mustard, C.forest, C.navy][k % 4], ...bl(1) }); } }
  // cobbles
  out += rect(-400, FLOOR, 4800, 600, { fill: '#7d7468' });
  for (let r = 0; r < 12; r++) for (let k = 0; k < 90; k++) { const cx = -400 + k * 56 + (r % 2) * 28, cy = FLOOR + 14 + r * (16 + r * 3); out += ellipse(cx, cy, 24 + r * 1.2, 7 + r * 0.9, { fill: R.pick(['#8a8174', '#736b60', '#958b7d']), ...bl(0.9, { opacity: 0.7 }) }); }
  out += rect(-400, FLOOR, 4800, 30, { fill: '#000', opacity: 0.18 });
  // lamp posts
  for (let lx = 200; lx < 4000; lx += 900) out += rect(lx - 6, FLOOR - 360, 12, 370, { fill: '#1f2430', ...bl(1.2) }) + rect(lx - 20, FLOOR - 410, 40, 54, { fill: '#f3d27a', ...bl(1.6) }) + K.glow(lx, FLOOR - 385, 150, '#f3d27a', 0.4);
  return out;
}

// merchant stalls in the street (Bounce Boots, +3 Knives…)
export function stall(x, sign, col = C.burgundy, wares = 'boots') {
  let out = rect(x - 140, FLOOR - 40, 280, 150, { fill: '#6b4429', ...bl(2) });
  out += rect(x - 150, FLOOR - 60, 300, 26, { fill: '#8a5d38', ...bl(2) });
  out += line(x - 135, FLOOR - 60, x - 135, FLOOR - 330, bl(4)) + line(x + 135, FLOOR - 60, x + 135, FLOOR - 330, bl(4));
  let d = ''; for (let i = 0; i < 7; i++) d += `M${x - 150 + i * 43},${FLOOR - 340} l43,0 l-4,50 l-35,0Z `;
  out += path(d, { fill: col, ...bl(1.4) });
  // price board: one line if it fits, else two (split at ": " or the middle space); Caveat averages ~0.47em per character
  const fit = (t) => Math.min(30, 220 / (t.length * 0.47)), T = (t, y, fs) => text(x, y, t, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, fill: '#3a2a20', 'text-anchor': 'middle' });
  if (fit(sign) >= 24) out += rect(x - 120, FLOOR - 260, 240, 50, { fill: '#efe2c4', ...bl(1.6), rx: 4 }) + T(sign, FLOOR - 226, fit(sign));
  else {
    const at = sign.includes(': ') ? sign.indexOf(': ') : sign.lastIndexOf(' ', sign.length / 2), l1 = sign.slice(0, at + (sign[at] === ':' ? 1 : 0)).trim(), l2 = sign.slice(at + 1).replace(/^:?\s*/, '');
    // the name as big as the stall's full width allows, the price on its own line at full size
    out += rect(x - 148, FLOOR - 286, 296, 84, { fill: '#efe2c4', ...bl(1.6), rx: 4 }) + T(l1, FLOOR - 252, Math.min(30, 276 / (l1.length * 0.47))) + T(l2, FLOOR - 214, fit(l2));
  }
  if (wares === 'boots') for (let i = 0; i < 3; i++) out += path(`M${x - 100 + i * 70},${FLOOR - 64} l0,-50 l24,0 l0,34 l24,6 l0,10Z`, { fill: ['#c43a32', '#2f5a40', '#d6a33a'][i], ...bl(1.4) });
  if (wares === 'cutlery') for (let i = 0; i < 6; i++) out += line(x - 110 + i * 42, FLOOR - 64, x - 100 + i * 42, FLOOR - 140, { stroke: '#c9c9d0', 'stroke-width': 7, 'stroke-linecap': 'round' }) + circle(x - 100 + i * 42, FLOOR - 144, 8, { fill: '#c9c9d0' });
  return out;
}

// ---------------------------------------------------------------- Gringotts (exterior, 2000 × 1400)
export function gringotts(o = {}) {
  let out = rect(-300, -900, 2600, 2400, { fill: '#b7c3cc' });
  out += rect(100, -700, 1800, 1600, { fill: '#efece4', ...bl(2) });
  out += path('M60,-700 L1000,-980 L1940,-700Z', { fill: '#e2ddd0', ...bl(2.4) });
  out += text(1000, -760, 'GRINGOTTS', { 'font-family': 'IM Fell English SC', 'font-size': 120, fill: '#6a6258', 'text-anchor': 'middle', 'letter-spacing': 10 });
  for (let i = 0; i < 8; i++) { const cx = 200 + i * 228; out += rect(cx - 36, -620, 72, 1400, { fill: '#f7f5ef', ...bl(1.8) }) + rect(cx - 50, -640, 100, 30, { fill: '#e2ddd0', ...bl(1.6) }) + rect(cx - 50, 770, 100, 30, { fill: '#e2ddd0', ...bl(1.6) }); for (let k = 0; k < 3; k++) out += line(cx - 18 + k * 18, -610, cx - 18 + k * 18, 770, bl(0.8, { opacity: 0.4 })); }
  // bronze doors
  out += rect(780, 160, 440, 640, { fill: '#8a5a2a', ...bl(2.4) }) + rect(790, 170, 205, 620, { fill: '#b0713b', ...bl(1.6) }) + rect(1005, 170, 205, 620, { fill: '#b0713b', ...bl(1.6) });
  for (const dx of [890, 1110]) for (let k = 0; k < 3; k++) out += rect(dx - 70, 220 + k * 190, 140, 150, { fill: 'none', stroke: '#7a4a1e', 'stroke-width': 4 });
  out += circle(975, 500, 12, { fill: '#e7bb4f', ...bl(1.4) }) + circle(1025, 500, 12, { fill: '#e7bb4f', ...bl(1.4) });
  for (let s = 0; s < 5; s++) out += rect(300 + s * 30, 800 + s * 22, 1400 - s * 60, 22, { fill: s % 2 ? '#e2ddd0' : '#ebe7dd', ...bl(1.4) });
  out += rect(-300, 910, 2600, 600, { fill: '#7d7468' });
  return out;
}

// ---------------------------------------------------------------- silhouette stage for McGonagall's history
export function shadowStage(col1 = '#7b2433', col2 = '#e7a95a', o = {}) {
  const id = uid('ss');
  return `<defs><radialGradient id="${id}" cx="0.5" cy="0.45" r="0.7"><stop offset="0" stop-color="${col2}"/><stop offset="1" stop-color="${col1}"/></radialGradient></defs>` + rect(-2000, -2000, 6000, 6000, { fill: `url(#${id})` });
}

// ---------------------------------------------------------------- Madam Malkin's, inside (2000 × 1100)
// Two fitting footstools at x≈780 (Harry) and x≈1080 (Draco); the open door on the right at x 1700–1880.
export function malkinInterior(o = {}) {
  const R = rng(51);
  let out = K.wallpaper(-200, -200, 2400, 1100, '#7a4a5a', { c2: '#6e4050', stripes: true });
  out += K.wainscot(-200, 560, 2400, 340, '#5a3a2a');
  // racks of robes (left)
  out += line(-100, 250, 560, 250, bl(6));
  for (let i = 0; i < 9; i++) { const x = -60 + i * 70; out += path(`M${x - 34},262 L${x + 34},262 L${x + 46},${620 + R.range(-20, 20)} L${x - 46},${620 + R.range(-20, 20)}Z`, { fill: R.pick(['#1d1a20', '#23202a', '#2f2a35', '#1f2a24', '#3a2030']), ...bl(1.4) }) + path(`M${x - 8},250 q8,-24 16,0`, { fill: 'none', ...bl(2) }); }
  // bolts of fabric shelves
  for (let s2 = 0; s2 < 3; s2++) { out += rect(1180, 120 + s2 * 140, 420, 14, { fill: '#6b4429', ...bl(1.4) }); for (let i = 0; i < 7; i++) out += ellipse(1210 + i * 58, 120 + s2 * 140 - 26, 26, 26, { fill: R.pick([C.burgundy, C.forest, C.navy, '#c9b48a', '#8a5a7a', C.mustardDark, '#1d1a20']), ...bl(1.4) }) + circle(1210 + i * 58, 120 + s2 * 140 - 26, 6, { fill: '#f1e6cc' }); }
  // tall mirrors
  for (const mx of [620, 1240]) out += path(`M${mx - 70},80 Q${mx},-10 ${mx + 70},80 L${mx + 70},560 L${mx - 70},560Z`, { fill: '#b9c9d0', stroke: '#b08d45', 'stroke-width': 10 }) + path(`M${mx - 40},120 L${mx - 10},500`, { stroke: '#fff', 'stroke-width': 8, opacity: 0.4 });
  // the open door + street light
  out += rect(1700, 180, 200, 720, { fill: '#e9d9b0', ...bl(2) }) + rect(1712, 196, 176, 704, { fill: '#f6e3b0' }) + K.lightShaft(1800, 200, 180, 1700, 1100, 380, '#fff2c8', 0.22);
  out += rect(-200, FLOOR - 10, 2400, 12, { fill: '#2a1a10' }) + K.floorboards(-200, FLOOR, 2400, 400, '#6e4a2c', 52);
  out += K.rug(930, FLOOR + 90, 700, 120, '#5a3a5a');
  // footstools
  for (const sx of [780, 1080]) out += rect(sx - 70, FLOOR + 30, 140, 50, { fill: '#6b4429', ...bl(2), rx: 8 }) + rect(sx - 76, FLOOR + 20, 152, 18, { fill: '#8a5a7a', ...bl(1.6), rx: 6 });
  out += K.glow(900, 200, 900, C.candle, 0.2);
  return out;
}
// animated tape measures, writhing around a point (panel-independent: world coords)
export function tapeMeasures(x, y, s = 1, seed = 3) {
  const R = rng(seed); let out = '';
  for (let i = 0; i < 4; i++) {
    const pts = []; let px = x + R.range(-40, 40) * s, py = y + R.range(-80, 80) * s;
    for (let k = 0; k < 8; k++) { pts.push([px, py]); px += R.range(-50, 50) * s; py += R.range(-40, 40) * s; }
    const d = smoothD(pts, false, 0.6);
    out += path(d, { fill: 'none', stroke: '#2a1b14', 'stroke-width': 11 * s, 'stroke-linecap': 'round' }) + path(d, { fill: 'none', stroke: '#f0dca0', 'stroke-width': 8 * s, 'stroke-linecap': 'round' }) + path(d, { fill: 'none', stroke: '#8a6a3a', 'stroke-width': 8 * s, 'stroke-dasharray': `1 ${7 * s}` });
  }
  return out;
}
// the pub opposite (sign of a wooden keg), exterior strip
export function kegPub(o = {}) {
  let out = rect(-200, -300, 2000, 1500, { fill: '#b9c3cc' });
  out += rect(200, -100, 900, 1000, { fill: '#8a6a4a', ...bl(2) }) + K.brickWall(204, -96, 892, 992, '#7a4a36', 61);
  out += rect(420, 380, 220, 520, { fill: '#3a2618', ...bl(2) }) + rect(700, 380, 300, 260, { fill: '#f3c66f', ...bl(2) }) + K.glow(850, 510, 260, C.candle, 0.4);
  out += line(1090, 100, 1260, 100, bl(4)) + g({ transform: 'translate(1180,190)' }, ellipse(0, 0, 60, 70, { fill: '#8a5a2a', ...bl(2) }), line(-58, -20, 58, -20, bl(3)), line(-58, 20, 58, 20, bl(3)));
  out += rect(-200, 900, 2000, 500, { fill: '#7d7468' });
  return out;
}

// ---------------------------------------------------------------- Ollivanders (1800 × 1100): walls of narrow boxes to the ceiling
export function ollivanders(o = {}) {
  const R = rng(81);
  let out = rect(-200, -400, 2200, 1500, { fill: '#2a2018' });
  for (let x = -180; x < 2000; x += 150) {
    out += rect(x, -380, 140, 1270, { fill: '#3a2a1e', ...bl(1.4) });
    for (let y = -370; y < 880; y += 30) out += rect(x + 6, y, 128, 26, { fill: R.pick(['#4a3a5a', '#3a4a3a', '#5a3a2a', '#4a4038', '#2f3a4a', '#6a5040']), ...bl(0.9), rx: 2 }) + (R() < 0.15 ? circle(x + 20, y + 13, 4, { fill: '#b08d45' }) : '');
  }
  out += K.lightShaft(1400, -400, 160, 1100, 900, 400, '#fff2c8', 0.12) + K.dustMotes(900, 100, 700, 700, 50, 3);
  out += rect(300, 640, 900, 40, { fill: '#4a2e1b', ...bl(2) }) + rect(320, 680, 860, 360, { fill: '#3a2414', ...bl(2) });
  out += K.candle(420, 640, 1.2, true) + K.candle(1080, 640, 1.2, true);
  out += rect(-200, FLOOR + 40, 2200, 400, { fill: '#2a1c12' });
  return out;
}
export const ollCounter = () => rect(300, 640, 900, 40, { fill: '#4a2e1b', ...bl(2) }) + rect(320, 680, 860, 400, { fill: '#3a2414', ...bl(2) });

// ---------------------------------------------------------------- the trunk shop (2000 × 1100): polished, lush, ivory platforms
export function trunkShop(o = {}) {
  let out = K.wallpaper(-200, -300, 2400, 1200, '#3a4a3a', { c2: '#34443a' });
  for (const cx of [100, 700, 1300, 1900]) out += path(`M${cx - 120},-300 Q${cx - 80},300 ${cx - 140},900 L${cx - 40},900 Q${cx - 20},300 ${cx - 40},-300Z`, { fill: C.burgundy, ...bl(1.6) }) + path(`M${cx + 40},-300 Q${cx + 20},300 ${cx + 40},900 L${cx + 140},900 Q${cx + 80},300 ${cx + 120},-300Z`, { fill: C.burgundy, ...bl(1.6) });
  out += rect(-200, FLOOR - 10, 2400, 14, { fill: '#2a1a10' }) + K.floorboards(-200, FLOOR, 2400, 400, '#8a5a34', 91);
  for (const [px, c] of [[260, '#6b2a2a'], [1550, '#2a3a5a']]) out += rect(px - 150, FLOOR - 30, 300, 40, { fill: '#efe8da', ...bl(2), rx: 6 }) + trunk(px, FLOOR - 30, 0.8, c, false);
  out += K.glow(1000, 100, 900, C.candle, 0.25);
  for (const lx of [500, 1000, 1500]) out += line(lx, -300, lx, -80, bl(2)) + ellipse(lx, -70, 70, 16, { fill: '#b08d45', ...bl(1.6) }) + K.glow(lx, -60, 200, C.candle, 0.4);
  return out;
}
// the dragon trunk (x = centre, y = floor)
export function trunk(x, y, s = 1, col = '#7a4e2e', dragon = true, o = {}) {
  let out = rect(x - 170 * s, y - 190 * s, 340 * s, 190 * s, { fill: col, ...bl(2.4), rx: 10 * s });
  out += path(`M${x - 176 * s},${y - 190 * s} Q${x},${y - 250 * s} ${x + 176 * s},${y - 190 * s}Z`, { fill: shade(col, 0.1), ...bl(2.4) });
  for (const k of [-1, 1]) out += rect(x + k * 120 * s - 12 * s, y - 196 * s, 24 * s, 196 * s, { fill: '#b08d45', ...bl(1.4) });
  for (let k = 0; k < 4; k++) out += rect(x - 60 * s + k * 34 * s, y - 180 * s, 20 * s, 14 * s, { fill: '#c9a24a', ...bl(1), rx: 3 });
  if (dragon) out += path(`M${x - 80 * s},${y - 60 * s} Q${x - 40 * s},${y - 150 * s} ${x + 20 * s},${y - 110 * s} Q${x + 70 * s},${y - 150 * s} ${x + 90 * s},${y - 90 * s} Q${x + 40 * s},${y - 70 * s} ${x + 10 * s},${y - 40 * s} Q${x - 30 * s},${y - 80 * s} ${x - 80 * s},${y - 60 * s}Z`, { fill: shade(col, -0.25), stroke: shade(col, -0.5), 'stroke-width': 2 }) + circle(x + 60 * s, y - 118 * s, 6 * s, { fill: o.eyeOpen === false ? shade(col, -0.5) : '#e8a23a' });
  if (o.stairs) out += rect(x - 60 * s, y - 20 * s, 120 * s, 30 * s, { fill: '#2a1a10', ...bl(1.6) }) + path(`M${x - 50 * s},${y + 10 * s} L${x - 50 * s},${y + 110 * s} M${x + 50 * s},${y + 10 * s} L${x + 50 * s},${y + 110 * s}`, bl(3));
  return out;
}

// ---------------------------------------------------------------- the Headmaster's office (2000 × 1100): round, crammed with silver instruments
export function headmasterOffice(o = {}) {
  const R = rng(99);
  let out = rect(-200, -400, 2400, 1600, { fill: '#2a2440' });
  out += K.stoneWall(-200, -400, 2400, 1300, '#6a6070', 7, { bh: 60 });
  out += rect(-200, -400, 2400, 1300, { fill: '#1a1030', opacity: 0.35 });
  // portraits (sleeping headmasters)
  for (let i = 0; i < 6; i++) { const x = -60 + i * 340, y = -300 + (i % 2) * 60; out += K.frame(x, y, 160, 200, rect(0, 0, 160, 200, { fill: R.pick(['#4a5a4a', '#5a4a3a', '#3a4a5a']) }) + circle(80, 90, 36, { fill: '#e0c8a8' }) + path('M56,86 q8,4 16,0 M88,86 q8,4 16,0', { stroke: C.ink, 'stroke-width': 2, fill: 'none' }) + path('M40,200 Q80,130 120,200Z', { fill: R.pick([C.burgundy, C.navy, C.forest]) }) + (i % 2 ? path('M50,80 Q80,20 110,80', { fill: '#ddd' }) : '')); }
  // shelves of spindly silver instruments
  for (let s2 = 0; s2 < 2; s2++) { out += rect(-100, 300 + s2 * 180, 700, 16, { fill: '#5a3a2a', ...bl(1.6) }); for (let i = 0; i < 7; i++) { const x = -60 + i * 95, y = 300 + s2 * 180; out += line(x, y, x, y - 90, { stroke: '#c9ced4', 'stroke-width': 3 }) + circle(x, y - 100, 16, { fill: 'none', stroke: '#c9ced4', 'stroke-width': 3 }) + circle(x + 18, y - 60, 8, { fill: '#c9ced4', opacity: 0.8 }) + path(`M${x - 20},${y - 40} q20,-20 40,0`, { fill: 'none', stroke: '#b08d45', 'stroke-width': 2 }); } }
  // Fawkes on his perch
  out += line(1600, 900, 1600, 360, { stroke: '#b08d45', 'stroke-width': 8 }) + line(1520, 360, 1680, 360, { stroke: '#b08d45', 'stroke-width': 8 });
  out += path('M1560,360 Q1540,260 1600,240 Q1660,250 1650,320 Q1700,420 1640,470 L1600,380Z', { fill: '#c4321e', ...bl(2) }) + circle(1612, 268, 6, { fill: '#1a1a1a' }) + path('M1630,262 l18,8 l-16,6Z', { fill: '#e7bb4f', ...bl(1) }) + path('M1620,440 Q1660,560 1640,640 Q1610,560 1600,450Z', { fill: '#e7a23a', ...bl(1.4) });
  // great desk
  out += rect(500, 640, 1000, 50, { fill: '#6b4429', ...bl(2.4), rx: 6 }) + rect(530, 690, 940, 330, { fill: '#5a3a22', ...bl(2) });
  out += K.bookPile(640, 640, 5, 17, 0.9) + K.candle(1380, 640, 1.2, true) + g({ transform: 'translate(1000,630)' }, ellipse(0, 0, 60, 14, { fill: '#b08d45', ...bl(1.4) }), ...[-30, -10, 10, 30].map((dx) => path(`M${dx},-6 q4,-10 8,0`, { fill: '#f0c050', stroke: C.ink, 'stroke-width': 1.4 })));
  out += K.glow(1000, 400, 900, '#f0b060', 0.3);
  out += rect(-200, FLOOR + 60, 2400, 400, { fill: '#3a2a4a' });
  return out;
}
export const officeDesk = () => rect(500, 640, 1000, 50, { fill: '#6b4429', ...bl(2.4), rx: 6 }) + rect(530, 690, 940, 400, { fill: '#5a3a22', ...bl(2) }) + K.bookPile(640, 640, 5, 17, 0.9) + K.candle(1380, 640, 1.2, true);
