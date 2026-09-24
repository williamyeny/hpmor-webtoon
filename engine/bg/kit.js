// Background kit: furniture & architecture pieces, all procedural, drawn in world coordinates.
// Backgrounds use a softer line (BG_INK) and thinner weight than characters so figures pop.
import { C } from '../core/palette.js';
import { g, path, rect, circle, ellipse, line, polygon, smoothD, polyD, rng, shade, mixHex, lerp, uid, r2, rrectD, taperD } from '../core/svg.js';

export const BG_INK = '#3e2a1f';
export const bl = (w = 2.2, extra = {}) => ({ stroke: BG_INK, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', ...extra });

const BOOK_COLS = [C.burgundy, C.forest, C.navy, C.mustardDark, C.brown, C.leather, '#c9b48a', C.teal, C.plum, '#8a2f2a', '#3d5a3e', '#5b4a7a', '#a2682e', '#274060', '#6e2436', '#b99a5e', '#43302a'];

// ---------------------------------------------------------------- books & shelves
export function bookRow(x, y, w, h, seed, o = {}) {
  // books standing on a shelf whose top surface is at y (books rise upward from y)
  const R = rng(seed);
  let out = '';
  let cx = x;
  while (cx < x + w - 6) {
    const r = R();
    if (o.gaps !== false && r < 0.05) { cx += R.range(8, 26); continue; }
    if (r < 0.1 && cx < x + w - 60) {
      // horizontal stack
      const n = R.int(2, 5), sw = R.range(40, 62);
      let yy = y;
      for (let i = 0; i < n; i++) { const bh = R.range(7, 12); const col = R.pick(BOOK_COLS); out += rect(cx + R.range(-3, 3), yy - bh, sw, bh, { fill: col, ...bl(1.4) }); yy -= bh; }
      if (R() < 0.4) out += objectOn(cx + sw / 2, yy, R);
      cx += sw + 4;
      continue;
    }
    const bw = R.range(9, 22) * (o.scale ?? 1), bh = h * R.range(0.62, 0.97);
    const col = R.pick(BOOK_COLS);
    const lean = R() < 0.07 && cx > x + 20 ? R.range(-12, -5) : 0;
    const bx = cx, by = y - bh;
    const bk = rect(bx, by, bw, bh, { fill: col, ...bl(1.3), rx: 1 });
    let deco = '';
    if (R() < 0.7) { const band = shade(col, 0.45); deco += line(bx + 1.5, by + bh * 0.14, bx + bw - 1.5, by + bh * 0.14, { stroke: '#d9b35c', 'stroke-width': 1.3, opacity: 0.85 }) + line(bx + 1.5, by + bh * 0.84, bx + bw - 1.5, by + bh * 0.84, { stroke: '#d9b35c', 'stroke-width': 1.3, opacity: 0.85 }); if (R() < 0.5) deco += rect(bx + bw * 0.2, by + bh * 0.3, bw * 0.6, bh * 0.16, { fill: shade(col, -0.25), opacity: 0.8 }); void band; }
    if (R() < 0.25) deco += rect(bx, by, bw * 0.28, bh, { fill: '#000', opacity: 0.12 });
    out += lean ? g({ transform: `rotate(${r2(lean)} ${r2(bx)} ${r2(y)})` }, bk, deco) : bk + deco;
    cx += bw + (lean ? 6 : 0.5);
  }
  return out;
}

function objectOn(x, y, R) {
  const k = R.int(0, 3);
  if (k === 0) return circle(x, y - 12, 11, { fill: '#6d8f7a', ...bl(1.3) }) + path(`M${x - 11},${y - 12} Q${x},${y - 6} ${x + 11},${y - 12}`, { fill: 'none', ...bl(0.9) }) + rect(x - 2, y - 2, 4, 2, { fill: C.brass || '#b08d45' }); // globe
  if (k === 1) return rect(x - 5, y - 18, 10, 18, { fill: '#eee2c4', ...bl(1.2) }) + ellipse(x, y - 21, 3, 5, { fill: C.candle, opacity: 0.9 }); // candle stub
  if (k === 2) return path(`M${x - 8},${y} L${x - 6},${y - 18} L${x + 6},${y - 18} L${x + 8},${y}Z`, { fill: '#7fa7a0', opacity: 0.85, ...bl(1.2) }); // jar
  return ellipse(x, y - 6, 12, 6, { fill: '#9a7b4f', ...bl(1.2) });
}

export function bookcase(x, y, w, h, seed, o = {}) {
  // x,y = top-left. Wooden case with n shelves filled with books.
  const shelves = o.shelves ?? 6;
  const wood = o.wood || C.wood;
  const inset = 14;
  const sh = (h - inset * 2) / shelves;
  let out = rect(x, y, w, h, { fill: wood, ...bl(2.4) });
  out += rect(x + inset, y + inset, w - inset * 2, h - inset * 2, { fill: shade(wood, -0.55) });
  for (let i = 0; i < shelves; i++) {
    const sy = y + inset + sh * (i + 1);
    out += bookRow(x + inset + 2, sy - 3, w - inset * 2 - 4, sh - 10, `${seed}-${i}`, o);
    out += rect(x + inset - 2, sy - 4, w - inset * 2 + 4, 8, { fill: shade(wood, 0.08), ...bl(1.6) });
  }
  out += rect(x + inset, y + inset, w - inset * 2, 16, { fill: '#000', opacity: 0.25 });
  // crown moulding
  out += rect(x - 6, y - 8, w + 12, 14, { fill: shade(wood, 0.12), ...bl(2.2) });
  return out;
}

// ---------------------------------------------------------------- architecture
export function wallpaper(x, y, w, h, col, o = {}) {
  const id = uid('wp');
  const c2 = o.c2 || shade(col, -0.12);
  const pat = o.stripes
    ? `<pattern id="${id}" width="36" height="36" patternUnits="userSpaceOnUse"><rect width="36" height="36" fill="${col}"/><rect width="10" height="36" fill="${c2}"/><rect x="18" width="3" height="36" fill="${c2}" opacity="0.6"/></pattern>`
    : `<pattern id="${id}" width="64" height="72" patternUnits="userSpaceOnUse"><rect width="64" height="72" fill="${col}"/><path d="M32,8 q10,14 0,28 q-10,-14 0,-28Z M0,44 q10,14 0,28 q-10,-14 0,-28Z M64,44 q10,14 0,28 q-10,-14 0,-28Z" fill="${c2}"/><circle cx="32" cy="54" r="3" fill="${c2}"/><circle cx="0" cy="18" r="3" fill="${c2}"/><circle cx="64" cy="18" r="3" fill="${c2}"/></pattern>`;
  return `<defs>${pat}</defs>` + rect(x, y, w, h, { fill: `url(#${id})` });
}
export function wainscot(x, y, w, h, col = C.wood) {
  let out = rect(x, y, w, h, { fill: col, ...bl(2) });
  out += rect(x, y - 6, w, 10, { fill: shade(col, 0.15), ...bl(1.8) });
  const n = Math.max(1, Math.round(w / 130));
  const pw = w / n;
  for (let i = 0; i < n; i++) out += rect(x + i * pw + 12, y + 16, pw - 24, h - 30, { fill: shade(col, -0.08), ...bl(1.4) });
  return out;
}
export function floorboards(x, y, w, h, col = C.woodLight, seed = 1) {
  const R = rng(seed);
  let out = rect(x, y, w, h, { fill: col });
  let yy = y;
  let i = 0;
  while (yy < y + h) { const bh = 14 + i * 3.5; out += line(x, yy, x + w, yy, bl(1.1, { opacity: 0.5 })); let xx = x + R.range(-100, 0); while (xx < x + w) { xx += R.range(120, 260); out += line(xx, yy, xx, yy + bh, bl(1, { opacity: 0.45 })); } yy += bh; i++; }
  out += rect(x, y, w, h * 0.5, { fill: '#000', opacity: 0.1 });
  return out;
}
export function stoneWall(x, y, w, h, col = C.stone, seed = 3, o = {}) {
  const R = rng(seed);
  let out = rect(x, y, w, h, { fill: shade(col, -0.25) });
  const bh = o.bh ?? 46;
  let row = 0;
  for (let yy = y; yy < y + h; yy += bh) {
    let xx = x - (row % 2 ? R.range(20, 60) : 0);
    while (xx < x + w) {
      const bw = R.range(o.minW ?? 60, o.maxW ?? 120);
      const c = mixHex(col, R.pick([C.stoneLight, C.stoneDark, '#9b8f78', '#7f8a88']), R.range(0, 0.35));
      out += path(rrectD(xx + 2, yy + 2, bw - 4, bh - 4, 7, R.int(1, 999), 3), { fill: c, ...bl(1.4) });
      if (R() < 0.3) out += path(`M${xx + bw * 0.3},${yy + bh * 0.5} l${R.range(6, 14)},${R.range(-4, 4)}`, bl(0.9, { opacity: 0.5 }));
      xx += bw;
    }
    row++;
  }
  return out;
}
export function brickWall(x, y, w, h, col = '#8a4a36', seed = 4) {
  const R = rng(seed);
  let out = rect(x, y, w, h, { fill: '#5d4a3e' });
  const bh = 22, bw = 58;
  let row = 0;
  for (let yy = y; yy < y + h; yy += bh) {
    for (let xx = x - (row % 2) * bw / 2; xx < x + w; xx += bw) out += rect(xx + 1.5, yy + 1.5, bw - 3, bh - 3, { fill: mixHex(col, R.pick(['#6d3326', '#a0624a', '#7b4a3a', '#94503a']), R.range(0, 0.5)), rx: 2 });
    row++;
  }
  return out;
}

export function windowFrame(x, y, w, h, o = {}) {
  // sash window. o.sky: fill for the view; o.rain: rain streaks; o.night
  const id = uid('win');
  const sky = o.sky || (o.night ? `url(#${id}n)` : `url(#${id}s)`);
  const frame = o.frame || '#e8dcc2';
  let out = `<defs><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${o.skyTop || '#8fa3b5'}"/><stop offset="1" stop-color="${o.skyBot || '#c9d1d3'}"/></linearGradient>
    <linearGradient id="${id}n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1a33"/><stop offset="1" stop-color="#2c3f63"/></linearGradient>
    <clipPath id="${id}c"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath></defs>`;
  out += rect(x - 16, y - 16, w + 32, h + 32, { fill: frame, ...bl(2.2) });
  out += rect(x, y, w, h, { fill: sky });
  let view = o.view || '';
  if (o.rain) {
    const R = rng(o.seed || 9);
    for (let i = 0; i < w * h / 900; i++) { const rx = x + R() * w, ry = y + R() * h; view += line(rx, ry, rx - 3, ry + R.range(14, 30), { stroke: '#e3eef5', 'stroke-width': 1.2, opacity: R.range(0.35, 0.75) }); }
    for (let i = 0; i < w * h / 3000; i++) { const rx = x + R() * w, ry = y + R() * h; view += path(`M${rx},${ry} q2,8 0,${R.range(10, 26)}`, { stroke: '#f2f7fa', 'stroke-width': 2.4, fill: 'none', opacity: 0.55 }) + circle(rx, ry, 1.3, { fill: '#f7fbfd', opacity: 0.6 }); }
  }
  out += g({ 'clip-path': `url(#${id}c)` }, view);
  // glazing bars
  const cols = o.cols ?? 2, rows = o.rows ?? 3;
  for (let i = 1; i < cols; i++) out += rect(x + (w * i) / cols - 3, y, 6, h, { fill: frame, ...bl(1.2) });
  for (let j = 1; j < rows; j++) out += rect(x, y + (h * j) / rows - 3, w, 6, { fill: frame, ...bl(1.2) });
  out += rect(x - 5, y + h / 2 - 7, w + 10, 14, { fill: frame, ...bl(1.8) });
  out += rect(x, y, w, h, { fill: 'none', ...bl(2) });
  out += rect(x - 24, y + h + 14, w + 48, 14, { fill: shade(frame, -0.08), ...bl(2) }); // sill
  // light glass sheen
  out += path(`M${x + w * 0.1},${y + h * 0.9} L${x + w * 0.35},${y + h * 0.1}`, { stroke: '#fff', 'stroke-width': 10, opacity: 0.08 });
  if (o.curtains) {
    const cc = o.curtains;
    for (const side of [-1, 1]) {
      const cx0 = side < 0 ? x - 60 : x + w + 60;
      const d = side < 0
        ? `M${x - 70},${y - 40} L${x + 20},${y - 40} Q${x - 10},${y + h * 0.5} ${x + 4},${y + h + 40} L${x - 70},${y + h + 40}Z`
        : `M${x + w + 70},${y - 40} L${x + w - 20},${y - 40} Q${x + w + 10},${y + h * 0.5} ${x + w - 4},${y + h + 40} L${x + w + 70},${y + h + 40}Z`;
      out += path(d, { fill: cc, ...bl(2) });
      out += path(`M${cx0 + side * -20},${y - 30} Q${cx0 + side * -30},${y + h * 0.5} ${cx0 + side * -22},${y + h + 30} M${cx0},${y - 30} Q${cx0 + side * -8},${y + h * 0.5} ${cx0},${y + h + 30}`, { fill: 'none', stroke: shade(cc, -0.35), 'stroke-width': 2, opacity: 0.8 });
    }
    out += rect(x - 90, y - 52, w + 180, 12, { fill: '#8a6a3a', ...bl(1.6), rx: 6 });
  }
  return out;
}

export function door(x, y, w, h, col = '#5a3a24', o = {}) {
  let out = rect(x - 12, y - 12, w + 24, h + 12, { fill: shade(col, 0.15), ...bl(2) });
  out += rect(x, y, w, h, { fill: col, ...bl(2) });
  out += rect(x + w * 0.12, y + h * 0.06, w * 0.76, h * 0.38, { fill: shade(col, -0.1), ...bl(1.4) });
  out += rect(x + w * 0.12, y + h * 0.52, w * 0.76, h * 0.42, { fill: shade(col, -0.1), ...bl(1.4) });
  out += circle(x + w * 0.84, y + h * 0.52, 6, { fill: '#c9a24a', ...bl(1.2) });
  if (o.open) out += rect(x, y, w * o.open, h, { fill: '#1a120d', opacity: 0.9 });
  return out;
}

// ---------------------------------------------------------------- furniture
export function armchair(x, y, s = 1, col = C.burgundy, o = {}) {
  // x,y = floor centre
  const f = (d) => d;
  const W = 190 * s, H = 170 * s;
  let out = '';
  out += path(`M${x - W * 0.42},${y - H * 0.45} Q${x - W * 0.45},${y - H * 1.05} ${x},${y - H * 1.05} Q${x + W * 0.45},${y - H * 1.05} ${x + W * 0.42},${y - H * 0.45}Z`, { fill: col, ...bl(2.2) }); // back
  out += path(`M${x - W * 0.5},${y - H * 0.1} L${x - W * 0.5},${y - H * 0.55} Q${x - W * 0.52},${y - H * 0.72} ${x - W * 0.36},${y - H * 0.7} L${x - W * 0.32},${y - H * 0.1}Z`, { fill: shade(col, 0.08), ...bl(2.2) });
  out += path(`M${x + W * 0.5},${y - H * 0.1} L${x + W * 0.5},${y - H * 0.55} Q${x + W * 0.52},${y - H * 0.72} ${x + W * 0.36},${y - H * 0.7} L${x + W * 0.32},${y - H * 0.1}Z`, { fill: shade(col, -0.1), ...bl(2.2) });
  out += path(rrectD(x - W * 0.34, y - H * 0.42, W * 0.68, H * 0.2, 10), { fill: shade(col, 0.12), ...bl(2) }); // seat cushion
  out += rect(x - W * 0.5, y - H * 0.24, W, H * 0.16, { fill: shade(col, -0.12), ...bl(2), rx: 6 });
  for (const sx of [-0.44, 0.44]) out += rect(x + W * sx - 5, y - H * 0.09, 10, H * 0.09, { fill: C.woodDark, ...bl(1.4) });
  // buttons
  for (let i = 0; i < 3; i++) out += circle(x + (i - 1) * W * 0.18, y - H * 0.78, 3, { fill: shade(col, -0.35) });
  if (o.antimacassar) out += path(`M${x - W * 0.18},${y - H * 1.02} L${x + W * 0.18},${y - H * 1.02} L${x + W * 0.14},${y - H * 0.84} L${x - W * 0.14},${y - H * 0.84}Z`, { fill: '#efe6d2', ...bl(1.2) });
  return out;
}

export function sofa(x, y, w, s = 1, col = C.forest) {
  const H = 160 * s;
  let out = path(rrectD(x - w / 2 + 20, y - H, w - 40, H * 0.62, 18), { fill: col, ...bl(2.2) });
  out += path(rrectD(x - w / 2, y - H * 0.62, 50 * s, H * 0.52, 14), { fill: shade(col, 0.08), ...bl(2.2) });
  out += path(rrectD(x + w / 2 - 50 * s, y - H * 0.62, 50 * s, H * 0.52, 14), { fill: shade(col, -0.08), ...bl(2.2) });
  out += rect(x - w / 2 + 44 * s, y - H * 0.46, w - 88 * s, H * 0.18, { fill: shade(col, 0.1), ...bl(2), rx: 8 });
  out += rect(x - w / 2 + 10, y - H * 0.3, w - 20, H * 0.22, { fill: shade(col, -0.1), ...bl(2), rx: 6 });
  const n = Math.round((w - 88 * s) / (110 * s));
  for (let i = 1; i < n; i++) out += line(x - w / 2 + 44 * s + ((w - 88 * s) / n) * i, y - H * 0.46, x - w / 2 + 44 * s + ((w - 88 * s) / n) * i, y - H * 0.29, bl(1.4));
  return out;
}

export function table(x, y, w, h, col = C.wood, o = {}) {
  // x,y floor centre; h = table height
  let out = '';
  for (const lx of [-w / 2 + 16, w / 2 - 26]) out += rect(x + lx, y - h + 10, 10, h - 10, { fill: shade(col, -0.15), ...bl(1.6) });
  out += rect(x - w / 2, y - h, w, 16, { fill: col, ...bl(2), rx: 3 });
  out += rect(x - w / 2 + 6, y - h + 16, w - 12, 10, { fill: shade(col, -0.25), ...bl(1.4) });
  if (o.cloth) out += path(`M${x - w / 2 - 6},${y - h - 2} L${x + w / 2 + 6},${y - h - 2} L${x + w / 2 + 10},${y - h + 50} Q${x},${y - h + 62} ${x - w / 2 - 10},${y - h + 50}Z`, { fill: o.cloth, ...bl(1.8) });
  return out;
}

export function lamp(x, y, h = 300, col = '#d9a55a', lit = true) {
  let out = '';
  if (lit) out += glow(x, y - h + 20, 260, C.candle, 0.45);
  out += rect(x - 40, y - 8, 80, 10, { fill: C.woodDark, ...bl(1.6), rx: 4 });
  out += rect(x - 4, y - h + 40, 8, h - 44, { fill: '#8a6a3a', ...bl(1.4) });
  out += path(`M${x - 44},${y - h + 50} L${x - 28},${y - h} L${x + 28},${y - h} L${x + 44},${y - h + 50}Z`, { fill: col, ...bl(2) });
  if (lit) out += path(`M${x - 44},${y - h + 50} L${x - 28},${y - h} L${x + 28},${y - h} L${x + 44},${y - h + 50}Z`, { fill: '#fff3c9', opacity: 0.45 });
  return out;
}

export function rug(x, y, w, h, col = C.burgundy) {
  const c2 = C.mustardDark, c3 = C.navy;
  let out = ellipse(x, y, w / 2, h / 2, { fill: col, ...bl(2) });
  out += ellipse(x, y, w / 2 - 16, h / 2 - 7, { fill: 'none', stroke: c2, 'stroke-width': 4 });
  out += ellipse(x, y, w / 2 - 30, h / 2 - 13, { fill: 'none', stroke: c3, 'stroke-width': 2.5, 'stroke-dasharray': '10 6' });
  out += ellipse(x, y, w * 0.18, h * 0.18, { fill: c3, opacity: 0.6 });
  return out;
}

export function fireplace(x, y, w = 300, h = 280, o = {}) {
  // x,y floor centre
  const lit = o.lit !== false;
  let out = '';
  out += rect(x - w / 2, y - h, w, h, { fill: '#b9a78a', ...bl(2.2) });
  out += rect(x - w / 2 - 20, y - h - 22, w + 40, 24, { fill: C.woodDark, ...bl(2) }); // mantel
  out += path(`M${x - w * 0.3},${y} L${x - w * 0.3},${y - h * 0.55} Q${x},${y - h * 0.75} ${x + w * 0.3},${y - h * 0.55} L${x + w * 0.3},${y}Z`, { fill: '#1f140e', ...bl(2) });
  if (lit) {
    out += glow(x, y - h * 0.18, w * 0.7, C.ember, 0.55);
    out += path(`M${x - w * 0.18},${y - 12} Q${x - w * 0.2},${y - h * 0.3} ${x - w * 0.08},${y - h * 0.42} Q${x - w * 0.06},${y - h * 0.25} ${x},${y - h * 0.46} Q${x + w * 0.06},${y - h * 0.28} ${x + w * 0.12},${y - h * 0.38} Q${x + w * 0.2},${y - h * 0.22} ${x + w * 0.18},${y - 12}Z`, { fill: '#f0a13c', stroke: '#c9601f', 'stroke-width': 1.6 });
    out += path(`M${x - w * 0.1},${y - 12} Q${x - w * 0.1},${y - h * 0.2} ${x - w * 0.02},${y - h * 0.3} Q${x + w * 0.02},${y - h * 0.18} ${x + w * 0.08},${y - h * 0.25} Q${x + w * 0.1},${y - h * 0.12} ${x + w * 0.1},${y - 12}Z`, { fill: '#ffe08a' });
    out += rect(x - w * 0.22, y - 14, w * 0.44, 12, { fill: '#4a2a18', ...bl(1.4), rx: 5 });
  }
  out += rect(x - w / 2 - 10, y - 8, w + 20, 10, { fill: '#8f7f66', ...bl(1.6) });
  if (o.clock) out += clock(x, y - h - 60, 34);
  if (o.candles) for (const cx of [x - w * 0.42, x + w * 0.42]) out += candle(cx, y - h - 22, 1);
  return out;
}

export function candle(x, y, s = 1, lit = true) {
  let out = '';
  if (lit) out += glow(x, y - 46 * s, 90 * s, C.candle, 0.55);
  out += rect(x - 12 * s, y - 6 * s, 24 * s, 6 * s, { fill: '#b08d45', ...bl(1.2), rx: 3 });
  out += rect(x - 5 * s, y - 36 * s, 10 * s, 30 * s, { fill: '#f1e6cc', ...bl(1.2) });
  if (lit) out += path(`M${x},${y - 52 * s} Q${x + 5 * s},${y - 42 * s} ${x},${y - 37 * s} Q${x - 5 * s},${y - 42 * s} ${x},${y - 52 * s}Z`, { fill: '#ffd774', stroke: '#e0852e', 'stroke-width': 1 });
  return out;
}

export function clock(x, y, r) {
  return rect(x - r - 8, y - r - 10, (r + 8) * 2, (r + 10) * 2 + 20, { fill: C.woodDark, ...bl(1.8), rx: 10 }) + circle(x, y, r, { fill: '#f3ead3', ...bl(1.6) }) +
    line(x, y, x, y - r * 0.7, bl(2)) + line(x, y, x + r * 0.5, y + r * 0.2, bl(2));
}

export function frame(x, y, w, h, content = '', col = '#b08d45') {
  const id = uid('fr');
  return rect(x - 8, y - 8, w + 16, h + 16, { fill: col, ...bl(1.8) }) + `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>` +
    rect(x, y, w, h, { fill: '#5d6f5a' }) + g({ 'clip-path': `url(#${id})` }, content) + rect(x, y, w, h, { fill: 'none', ...bl(1.4) });
}

export function plant(x, y, s = 1) {
  let out = path(`M${x - 22 * s},${y} L${x - 28 * s},${y - 40 * s} L${x + 28 * s},${y - 40 * s} L${x + 22 * s},${y}Z`, { fill: '#a0522d', ...bl(1.6) });
  const R = rng(x | 0);
  for (let i = 0; i < 9; i++) { const a = -90 + (i - 4) * 18 + R.range(-6, 6); const L = R.range(50, 90) * s; const ex = x + Math.cos((a * Math.PI) / 180) * L, ey = y - 40 * s + Math.sin((a * Math.PI) / 180) * L; out += path(`M${x},${y - 40 * s} Q${(x + ex) / 2 + 10},${(y - 40 * s + ey) / 2} ${ex},${ey} Q${(x + ex) / 2 - 10},${(y - 40 * s + ey) / 2} ${x},${y - 40 * s}Z`, { fill: R.pick(['#4f7d5c', '#3f6b4c', '#5d8c63']), ...bl(1.2) }); }
  return out;
}

export function bookPile(x, y, n, seed = 1, s = 1) {
  const R = rng(seed);
  let out = '', yy = y;
  for (let i = 0; i < n; i++) { const w = R.range(70, 110) * s, h = R.range(12, 22) * s; const ox = R.range(-10, 10) * s; out += rect(x - w / 2 + ox, yy - h, w, h, { fill: R.pick(BOOK_COLS), ...bl(1.3), rx: 2 }) + line(x - w / 2 + ox + 4, yy - h / 2, x + w / 2 + ox - 4, yy - h / 2, { stroke: '#efe3c8', 'stroke-width': 1, opacity: 0.4 }); yy -= h; }
  return out;
}

// soft light pools & shafts
export const glow = (x, y, r, col = C.candle, op = 0.35) => {
  const id = uid('gl');
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${col}" stop-opacity="${op}"/><stop offset="0.45" stop-color="${col}" stop-opacity="${op * 0.55}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs>` + circle(x, y, r, { fill: `url(#${id})`, style: 'mix-blend-mode:screen' });
};
export function lightShaft(x1, y1, w1, x2, y2, w2, col = '#fff2c8', op = 0.14) {
  return path(`M${x1 - w1 / 2},${y1} L${x1 + w1 / 2},${y1} L${x2 + w2 / 2},${y2} L${x2 - w2 / 2},${y2}Z`, { fill: col, opacity: op, filter: 'url(#blur3)' });
}
export function dustMotes(x, y, w, h, n = 30, seed = 2) {
  const R = rng(seed); let out = '';
  for (let i = 0; i < n; i++) out += circle(x + R() * w, y + R() * h, R.range(1, 2.6), { fill: '#fff3c9', opacity: R.range(0.3, 0.8) });
  return out;
}
export function rainOverlay(w, h, seed = 3, density = 1, op = 0.5) {
  const R = rng(seed); let out = '';
  for (let i = 0; i < (w * h / 2500) * density; i++) { const x = R() * w, y = R() * h, L = R.range(20, 46); out += line(x, y, x - L * 0.25, y + L, { stroke: '#d9e6ef', 'stroke-width': R.range(1, 2), opacity: R.range(0.25, op) }); }
  return out;
}
