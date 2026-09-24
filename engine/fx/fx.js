// Panel effects, drawn in panel coordinates (ctx.w × ctx.h) unless noted.
import { C } from '../core/palette.js';
import { g, path, rect, circle, ellipse, line, smoothD, rng, shade, uid, r2, polygon } from '../core/svg.js';

// radial "focus" lines converging on (cx, cy) — the comedic/intense burst
export function burst(w, h, cx, cy, o = {}) {
  const R = rng(o.seed || 7);
  const n = o.n ?? 90, inner = o.inner ?? Math.min(w, h) * 0.28, col = o.col || C.ink;
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + R() * 0.03;
    const r0 = inner * R.range(0.9, 1.3), r1 = Math.hypot(w, h);
    const wdt = R.range(0.004, 0.012);
    d += `M${cx + Math.cos(a) * r0},${cy + Math.sin(a) * r0} L${cx + Math.cos(a - wdt) * r1},${cy + Math.sin(a - wdt) * r1} L${cx + Math.cos(a + wdt) * r1},${cy + Math.sin(a + wdt) * r1}Z `;
  }
  return (o.bg ? rect(0, 0, w, h, { fill: o.bg }) : '') + path(d, { fill: col, opacity: o.op ?? 0.8 });
}

export function speedLines(w, h, o = {}) {
  const R = rng(o.seed || 3); let out = '';
  const ang = o.angle ?? 0;
  for (let i = 0; i < (o.n ?? 40); i++) { const y = R() * h, x = R() * w * 0.6, L = R.range(w * 0.2, w * 0.7); out += line(x, y, x + L, y, { stroke: o.col || C.ink, 'stroke-width': R.range(1, 3.5), opacity: R.range(0.2, 0.6) }); }
  return g({ transform: `rotate(${ang} ${w / 2} ${h / 2})` }, out);
}

// short strokes radiating around a point (surprise emanata)
export function emanata(x, y, r, o = {}) {
  let d = '';
  const n = o.n ?? 7, a0 = o.a0 ?? -150, a1 = o.a1 ?? -30;
  for (let i = 0; i < n; i++) { const a = ((a0 + (a1 - a0) * (i / (n - 1))) * Math.PI) / 180; d += `M${x + Math.cos(a) * r},${y + Math.sin(a) * r} L${x + Math.cos(a) * r * 1.35},${y + Math.sin(a) * r * 1.35} `; }
  return path(d, { stroke: o.col || C.ink, 'stroke-width': o.w ?? 4, 'stroke-linecap': 'round' });
}

// The cold: frost creeping in from the panel edges. amount 0..1
export function frost(w, h, amount = 0.6, seed = 5) {
  const R = rng(seed);
  const id = uid('fr');
  let out = `<defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.72"><stop offset="${0.75 - amount * 0.35}" stop-color="#cfe3f2" stop-opacity="0"/><stop offset="1" stop-color="#e9f4fb" stop-opacity="${0.5 + amount * 0.4}"/></radialGradient></defs>`;
  out += rect(0, 0, w, h, { fill: `url(#${id})` });
  // crystals along the edges
  const n = Math.round(30 * amount + 10);
  let d = '';
  for (let i = 0; i < n; i++) {
    const side = R.int(0, 3);
    const t = R();
    const x = side === 0 ? t * w : side === 1 ? w : side === 2 ? t * w : 0;
    const y = side === 0 ? 0 : side === 1 ? t * h : side === 2 ? h : t * h;
    const L = R.range(20, 70) * (0.5 + amount);
    const inward = side === 0 ? Math.PI / 2 : side === 1 ? Math.PI : side === 2 ? -Math.PI / 2 : 0;
    const a = inward + R.range(-0.6, 0.6);
    const ex = x + Math.cos(a) * L, ey = y + Math.sin(a) * L;
    d += `M${r2(x)},${r2(y)} L${r2(ex)},${r2(ey)} `;
    for (let k = 1; k <= 3; k++) { const px = x + Math.cos(a) * L * k / 4, py = y + Math.sin(a) * L * k / 4; const b = L * 0.25 * (1 - k / 5); d += `M${r2(px)},${r2(py)} l${r2(Math.cos(a + 0.7) * b)},${r2(Math.sin(a + 0.7) * b)} M${r2(px)},${r2(py)} l${r2(Math.cos(a - 0.7) * b)},${r2(Math.sin(a - 0.7) * b)} `; }
  }
  out += path(d, { stroke: '#f4fbff', 'stroke-width': 2.2, 'stroke-linecap': 'round', opacity: 0.85 });
  out += path(d, { stroke: '#8fb4cf', 'stroke-width': 0.8, opacity: 0.6 });
  return out;
}

// "wrongness": the sense-of-doom effect (Quirrell). A colour-split ghost + interference bands.
export function doom(w, h, seed = 3) {
  const R = rng(seed); let out = '';
  for (let i = 0; i < 7; i++) { const y = R() * h; out += rect(0, y, w, R.range(2, 7), { fill: i % 2 ? '#ff2a4a' : '#29d0ff', opacity: 0.12, style: 'mix-blend-mode:screen' }); }
  out += rect(0, 0, w, h, { fill: '#2a0010', opacity: 0.12, style: 'mix-blend-mode:multiply' });
  return out;
}

// a thin line of silver catching moonlight
export function silverThread(x1, y1, x2, y2, o = {}) {
  return line(x1, y1, x2, y2, { stroke: '#fff', 'stroke-width': o.w ?? 1.4, opacity: 0.95 }) +
    line(x1, y1, x2, y2, { stroke: '#dfe8ff', 'stroke-width': (o.w ?? 1.4) * 6, opacity: 0.18, filter: 'url(#glowSm)' }) +
    circle(o.gx ?? (x1 + x2) / 2, o.gy ?? (y1 + y2) / 2, 5, { fill: '#fff', filter: 'url(#glowXs)' }) +
    path(`M${(o.gx ?? (x1 + x2) / 2) - 26},${o.gy ?? (y1 + y2) / 2} L${(o.gx ?? (x1 + x2) / 2) + 26},${o.gy ?? (y1 + y2) / 2} M${o.gx ?? (x1 + x2) / 2},${(o.gy ?? (y1 + y2) / 2) - 26} L${o.gx ?? (x1 + x2) / 2},${(o.gy ?? (y1 + y2) / 2) + 26}`, { stroke: '#fff', 'stroke-width': 1.2, opacity: 0.9 });
}

// black robes tumbling through the air like crows
export function fallingRobes(w, h, n = 12, seed = 4) {
  const R = rng(seed); let out = '';
  for (let i = 0; i < n; i++) {
    const x = R() * w, y = R() * h, s = R.range(0.5, 1.4), rot = R.range(-60, 60);
    const d = `M0,-40 Q30,-50 46,-20 Q60,20 40,60 Q20,40 8,70 Q-4,40 -20,66 Q-36,30 -44,50 Q-50,0 -30,-30Z`;
    out += g({ transform: `translate(${r2(x)},${r2(y)}) rotate(${r2(rot)}) scale(${r2(s)})` },
      path(d, { fill: '#0d0b12', stroke: '#2b2a3a', 'stroke-width': 2 }),
      path('M-20,-20 Q0,10 10,50', { fill: 'none', stroke: '#3d3d52', 'stroke-width': 2, opacity: 0.8 }),
      path('M-30,-30 Q10,-46 40,-24', { fill: 'none', stroke: '#8f9bc0', 'stroke-width': 1.5, opacity: 0.5 }));
  }
  return out;
}

// sparkles / twinkles
export function sparkles(pts, o = {}) {
  let out = '';
  for (const [x, y, r] of pts) out += path(`M${x},${y - r} Q${x + r * 0.15},${y - r * 0.15} ${x + r},${y} Q${x + r * 0.15},${y + r * 0.15} ${x},${y + r} Q${x - r * 0.15},${y + r * 0.15} ${x - r},${y} Q${x - r * 0.15},${y - r * 0.15} ${x},${y - r}Z`, { fill: o.col || '#fff6cf', stroke: o.stroke || 'none' });
  return out;
}

// soft vignette for flashbacks: sepia + torn edge feel
export function memoryEdge(w, h) {
  const id = uid('me');
  return `<defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.7"><stop offset="0.6" stop-color="#f1e6cc" stop-opacity="0"/><stop offset="1" stop-color="#f1e6cc" stop-opacity="0.95"/></radialGradient></defs>` + rect(0, 0, w, h, { fill: `url(#${id})` });
}

// big lettering drawn into the art (SVG text with outline), for SFX
export function sfxText(x, y, s, o = {}) {
  const fs = o.size ?? 90;
  const common = { x, y, 'font-family': o.font || 'Grenze Gotisch', 'font-weight': o.weight ?? 900, 'font-size': fs, 'text-anchor': o.anchor || 'middle', transform: o.rot ? `rotate(${o.rot} ${x} ${y})` : undefined, 'letter-spacing': o.ls ?? 2 };
  const esc = String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<text ${Object.entries({ ...common, fill: 'none', stroke: o.stroke || C.ink, 'stroke-width': o.sw ?? fs * 0.12, 'stroke-linejoin': 'round' }).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}="${v}"`).join(' ')}>${esc}</text>` +
    `<text ${Object.entries({ ...common, fill: o.fill || '#f4e3bd' }).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}="${v}"`).join(' ')}>${esc}</text>`;
}

// jagged, unreadable scream shape
export function screamShape(cx, cy, w, h, seed = 9) {
  const R = rng(seed); const pts = [];
  const n = 30;
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; const k = i % 2 ? R.range(1.05, 1.5) : R.range(0.65, 0.8); pts.push([cx + Math.cos(a) * w / 2 * k, cy + Math.sin(a) * h / 2 * k]); }
  return path('M' + pts.map((p) => `${r2(p[0])},${r2(p[1])}`).join(' L') + 'Z', { fill: '#f5efe2', stroke: '#8a1a1a', 'stroke-width': 3 });
}
