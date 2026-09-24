// Tiny SVG-string toolkit. Everything in the engine returns strings of SVG markup.

let _uid = 0;
export const uid = (p = 'u') => `${p}${(++_uid).toString(36)}`;
export const resetUid = () => { _uid = 0; };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
export const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function attrs(a = {}) {
  let s = '';
  for (const k in a) {
    const v = a[k];
    if (v === undefined || v === null || v === false) continue;
    const key = k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()).replace(/^xlink-/, 'xlink:');
    s += ` ${key === 'class-name' ? 'class' : key}="${esc(typeof v === 'number' ? r2(v) : v)}"`;
  }
  return s;
}
export const el = (tag, a, ...kids) => {
  const inner = kids.flat(Infinity).filter((k) => k !== undefined && k !== null && k !== false).join('');
  return inner ? `<${tag}${attrs(a)}>${inner}</${tag}>` : `<${tag}${attrs(a)}/>`;
};
export const g = (a, ...kids) => el('g', a, ...kids);
export const path = (d, a = {}) => el('path', { d, ...a });
export const circle = (cx, cy, r, a = {}) => el('circle', { cx, cy, r, ...a });
export const ellipse = (cx, cy, rx, ry, a = {}) => el('ellipse', { cx, cy, rx, ry, ...a });
export const rect = (x, y, width, height, a = {}) => el('rect', { x, y, width, height, ...a });
export const line = (x1, y1, x2, y2, a = {}) => el('line', { x1, y1, x2, y2, ...a });
export const polygon = (pts, a = {}) => el('polygon', { points: pts.map((p) => `${r2(p[0])},${r2(p[1])}`).join(' '), ...a });
export const text = (x, y, s, a = {}) => el('text', { x, y, ...a }, escText(s));

// ---------- numbers & geometry ----------
export const r2 = (n) => Math.round(n * 100) / 100;
export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const deg = (d) => (d * Math.PI) / 180;
export const P = (x, y) => [x, y];
export const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const mul = (a, k) => [a[0] * k, a[1] * k];
export const len = (a) => Math.hypot(a[0], a[1]);
export const norm = (a) => { const l = len(a) || 1; return [a[0] / l, a[1] / l]; };
export const perp = (a) => [-a[1], a[0]];
export const mix = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
export const rot = (p, ang, c = [0, 0]) => {
  const s = Math.sin(ang), co = Math.cos(ang);
  const x = p[0] - c[0], y = p[1] - c[1];
  return [c[0] + x * co - y * s, c[1] + x * s + y * co];
};
// polar: angle in degrees, 0 = straight down (+y), positive = counter-clockwise toward +x
export const polarDown = (o, l, angDeg) => [o[0] + Math.sin(deg(angDeg)) * l, o[1] + Math.cos(deg(angDeg)) * l];

// ---------- deterministic randomness ----------
export function rng(seed = 1) {
  let s = typeof seed === 'string' ? [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) : seed >>> 0;
  if (!s) s = 1;
  const f = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  f.range = (a, b) => a + f() * (b - a);
  f.int = (a, b) => Math.floor(a + f() * (b - a + 1));
  f.pick = (arr) => arr[Math.floor(f() * arr.length)];
  f.chance = (p) => f() < p;
  return f;
}

// ---------- path builders ----------
const fmt = (p) => `${r2(p[0])},${r2(p[1])}`;
export const polyD = (pts, closed = false) => 'M' + pts.map(fmt).join(' L') + (closed ? 'Z' : '');

// Catmull-Rom spline through points → cubic Bezier path. tension 0..1 (0.5 is classic)
export function smoothD(pts, closed = false, tension = 0.5) {
  const n = pts.length;
  if (n < 2) return '';
  if (n === 2) return polyD(pts, closed);
  const get = (i) => (closed ? pts[(i + n) % n] : pts[clamp(i, 0, n - 1)]);
  let d = 'M' + fmt(pts[0]);
  const segs = closed ? n : n - 1;
  const k = tension / 3;
  for (let i = 0; i < segs; i++) {
    const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) * k, p1[1] + (p2[1] - p0[1]) * k];
    const c2 = [p2[0] - (p3[0] - p1[0]) * k, p2[1] - (p3[1] - p1[1]) * k];
    d += ` C${fmt(c1)} ${fmt(c2)} ${fmt(p2)}`;
  }
  return d + (closed ? 'Z' : '');
}

// Tapered stroke along a polyline: widths per point → closed filled outline (for limbs, brows, hair strands)
export function taperD(pts, widths, capRound = true) {
  const n = pts.length;
  const L = [], R = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
    const t = norm(sub(b, a));
    const nrm = perp(t);
    const w = (Array.isArray(widths) ? widths[i] : widths) / 2;
    L.push(add(pts[i], mul(nrm, w)));
    R.push(add(pts[i], mul(nrm, -w)));
  }
  const pts2 = [...L, ...R.reverse()];
  return smoothD(pts2, true, capRound ? 0.5 : 0.2);
}

// Sample a polyline/curve evenly by index along a quadratic bezier
export const quad = (a, c, b, t) => [
  (1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0],
  (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1],
];
export const quadPts = (a, c, b, n = 8) => Array.from({ length: n + 1 }, (_, i) => quad(a, c, b, i / n));

// ellipse point, angle in radians (0 = +x, clockwise since y is down)
export const ePt = (cx, cy, rx, ry, a) => [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];

// A slightly irregular ("hand-drawn") closed blob around a center
export function blobD(cx, cy, rx, ry, seed = 1, wob = 0.06, n = 14) {
  const R = rng(seed);
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + (R() - 0.5) * 2 * wob;
    pts.push(ePt(cx, cy, rx * k, ry * k, a));
  }
  return smoothD(pts, true);
}

// Rounded rect path with optional wobble
export function rrectD(x, y, w, h, r, seed = 0, wob = 0) {
  r = Math.min(r, w / 2, h / 2);
  const R = rng(seed || 3);
  const j = () => (wob ? (R() - 0.5) * wob : 0);
  return `M${r2(x + r + j())},${r2(y + j())} L${r2(x + w - r + j())},${r2(y + j())} Q${r2(x + w)},${r2(y)} ${r2(x + w + j())},${r2(y + r + j())} L${r2(x + w + j())},${r2(y + h - r + j())} Q${r2(x + w)},${r2(y + h)} ${r2(x + w - r + j())},${r2(y + h + j())} L${r2(x + r + j())},${r2(y + h + j())} Q${r2(x)},${r2(y + h)} ${r2(x + j())},${r2(y + h - r + j())} L${r2(x + j())},${r2(y + r + j())} Q${r2(x)},${r2(y)} ${r2(x + r + j())},${r2(y + j())}Z`;
}

export const translate = (x, y, ...kids) => g({ transform: `translate(${r2(x)},${r2(y)})` }, ...kids);
export const tf = ({ x = 0, y = 0, s = 1, sx, sy, r = 0, flip = false }) => {
  const SX = (sx ?? s) * (flip ? -1 : 1), SY = sy ?? s;
  return `translate(${r2(x)},${r2(y)})${r ? ` rotate(${r2(r)})` : ''} scale(${r2(SX)},${r2(SY)})`;
};

// colour helpers
export function hex2rgb(h) {
  h = h.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
export const rgb2hex = (r, g2, b) => '#' + [r, g2, b].map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('');
export function shade(hex, k) { // k<0 darker, k>0 lighter
  const [r, g2, b] = hex2rgb(hex);
  if (k < 0) return rgb2hex(r * (1 + k), g2 * (1 + k), b * (1 + k));
  return rgb2hex(r + (255 - r) * k, g2 + (255 - g2) * k, b + (255 - b) * k);
}
export function mixHex(a, b, t) {
  const A = hex2rgb(a), B = hex2rgb(b);
  return rgb2hex(lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t));
}
