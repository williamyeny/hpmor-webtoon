// Panel effects, drawn in panel coordinates (ctx.w × ctx.h) unless noted.
import { C } from '../core/palette.js';
import { g, path, rect, circle, ellipse, line, smoothD, rng, shade, uid, r2, polygon, text } from '../core/svg.js';

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
  for (let i = 0; i < n; i++) { const a = ((a0 + (a1 - a0) * (i / (n - 1))) * Math.PI) / 180; d += `M${x + Math.cos(a) * r},${y + Math.sin(a) * r} L${x + Math.cos(a) * r * 1.5},${y + Math.sin(a) * r * 1.5} `; }
  return path(d, { stroke: o.col || C.ink, 'stroke-width': o.w ?? 6, 'stroke-linecap': 'round' });
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
  // the glint always sits ON the thread: pick it by x (o.gx) or by fraction along the line (o.t)
  const t = o.gx != null ? (o.gx - x1) / (x2 - x1) : (o.t ?? 0.5);
  const gx = x1 + (x2 - x1) * t, gy = y1 + (y2 - y1) * t;
  return line(x1, y1, x2, y2, { stroke: '#fff', 'stroke-width': o.w ?? 1.4, opacity: 0.95 }) +
    line(x1, y1, x2, y2, { stroke: '#dfe8ff', 'stroke-width': (o.w ?? 1.4) * 6, opacity: 0.18, filter: 'url(#glowSm)' }) +
    circle(gx, gy, 5, { fill: '#fff', filter: 'url(#glowXs)' }) +
    path(`M${gx - 26},${gy} L${gx + 26},${gy} M${gx},${gy - 26} L${gx},${gy + 26}`, { stroke: '#fff', 'stroke-width': 1.2, opacity: 0.9 });
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
  for (const [x, y, r] of pts) out += path(`M${x},${y - r} Q${x + r * 0.15},${y - r * 0.15} ${x + r},${y} Q${x + r * 0.15},${y + r * 0.15} ${x},${y + r} Q${x - r * 0.15},${y + r * 0.15} ${x - r},${y} Q${x - r * 0.15},${y - r * 0.15} ${x},${y - r}Z`, { fill: o.col || '#fff6cf', stroke: o.stroke || 'rgba(90,60,20,0.55)', 'stroke-width': o.sw ?? 1.6 });  // a faint warm outline so they read on light backgrounds too
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

// Physics going down the drain: orbits, apple, atom, brain, equations swirling into a vortex at (cx,cy)
export function physicsDrain(w, h, cx, cy, o = {}) {
  const R = rng(o.seed || 21);
  let out = '';
  for (let i = 0; i < 9; i++) { const r = 40 + i * 70; out += path(`M${cx + r},${cy} A${r},${r * 0.55} 0 1 1 ${cx - r * 0.2},${cy - r * 0.5}`, { fill: 'none', stroke: '#8fb4cf', 'stroke-width': 2.2, opacity: 0.55 - i * 0.04, transform: `rotate(${i * 23} ${cx} ${cy})` }); }
  const items = [
    (x, y, s) => circle(x, y, 22 * s, { fill: '#d9a55a', stroke: C.ink, 'stroke-width': 2 }) + ellipse(x, y, 40 * s, 9 * s, { fill: 'none', stroke: C.ink, 'stroke-width': 2 }),
    (x, y, s) => circle(x, y, 18 * s, { fill: '#c43a32', stroke: C.ink, 'stroke-width': 2 }) + path(`M${x},${y - 18 * s} q4,-12 12,-14`, { stroke: '#4f7d5c', 'stroke-width': 3, fill: 'none' }),
    (x, y, s) => circle(x, y, 5 * s, { fill: C.ink }) + [0, 60, 120].map((a) => ellipse(x, y, 30 * s, 10 * s, { fill: 'none', stroke: '#2f5f63', 'stroke-width': 2, transform: `rotate(${a} ${x} ${y})` })).join(''),
    (x, y, s) => text(x, y, 'E = mc²', { 'font-family': 'Caveat', 'font-size': 34 * s, fill: '#2d2a4a', 'text-anchor': 'middle', 'font-weight': 700 }),
    (x, y, s) => text(x, y, 'ΔE = 0', { 'font-family': 'Caveat', 'font-size': 30 * s, fill: '#2d2a4a', 'text-anchor': 'middle', 'font-weight': 700 }),
    (x, y, s) => text(x, y, 'Ĥψ = iħ∂ψ/∂t', { 'font-family': 'Caveat', 'font-size': 28 * s, fill: '#2d2a4a', 'text-anchor': 'middle', 'font-weight': 700 }),
    (x, y, s) => path(`M${x - 20 * s},${y} q-6,-22 14,-24 q20,-8 28,10 q14,4 6,20 q-6,12 -24,8 q-16,8 -24,-14Z`, { fill: '#e7b3b0', stroke: C.ink, 'stroke-width': 2 }),
    (x, y, s) => text(x, y, 'F = ma', { 'font-family': 'Caveat', 'font-size': 30 * s, fill: '#2d2a4a', 'text-anchor': 'middle', 'font-weight': 700 }),
  ];
  for (let i = 0; i < (o.n ?? 16); i++) {
    const a = R() * Math.PI * 2, r = R.range(80, Math.min(w, h) * 0.75), s = 0.6 + r / 500;
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * 0.6;
    out += g({ transform: `rotate(${R.range(-40, 40)} ${x} ${y})`, opacity: 0.4 + r / 900 }, items[i % items.length](x, y, s));
  }
  out += ellipse(cx, cy, 60, 30, { fill: '#0d1220' }) + ellipse(cx, cy, 30, 14, { fill: '#000' });
  return out;
}

export function zebra(o = {}) {
  let out = '';
  const flame = (x, y, s) => path(`M${x},${y} q${-14 * s},${-30 * s} ${4 * s},${-60 * s} q${4 * s},${24 * s} ${16 * s},${10 * s} q${4 * s},${30 * s} ${-20 * s},${50 * s}Z`, { fill: '#f0a13c', stroke: '#c9601f', 'stroke-width': 2 }) + path(`M${x},${y - 6 * s} q${-6 * s},${-18 * s} ${4 * s},${-34 * s} q${6 * s},${18 * s} ${-4 * s},${34 * s}Z`, { fill: '#ffe08a' });
  out += path('M-90,0 L-80,-70 Q-60,-110 20,-110 Q70,-110 90,-140 L130,-190 Q150,-196 158,-178 L140,-120 Q120,-80 100,-70 L90,0 L74,0 L70,-60 L-40,-60 L-50,0 L-66,0 L-66,-50 L-76,0Z', { fill: '#f4efe4', stroke: C.ink, 'stroke-width': 3 });
  let d = ''; for (let i = 0; i < 8; i++) d += `M${-70 + i * 22},-100 q6,20 0,40 `; for (let i = 0; i < 3; i++) d += `M${100 + i * 12},${-150 + i * 20} l20,-8 `;
  out += path(d, { stroke: '#1b1310', 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' });
  out += circle(144, -170, 4, { fill: C.ink });
  out += flame(-60, -110, 1.1) + flame(0, -112, 1.4) + flame(60, -115, 1) + flame(118, -190, 1.2) + flame(-95, -60, 0.9);
  return g({ transform: o.flip ? 'scale(-1,1)' : undefined }, out);
}
export function crater(w = 400) {
  return ellipse(0, 0, w / 2, w / 8, { fill: '#3a2a22', stroke: C.ink, 'stroke-width': 3 }) + ellipse(0, -4, w / 2.6, w / 12, { fill: '#1a120d' }) +
    [0, 1, 2, 3].map((i) => circle(-w * 0.2 + i * w * 0.14, -w * 0.18 - i * 30, w * 0.12 + i * 10, { fill: '#8a5fb0', opacity: 0.55 - i * 0.08, filter: 'url(#blur2)' })).join('');
}

// a cut-out figure cropped above the feet fades into the page below (y0..y1 as fractions of the panel height).
// Use as a shot's `over`: fg: FX.fadeOut() or over: FX.fadeOut(0.6, 0.95)
export const fadeOut = (y0 = 0.62, y1 = 0.97) => (e) => { const id = uid('fo'), W0 = -400, WW = e.w + 800; return `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${e.h * y0}" x2="0" y2="${e.h * y1}"><stop offset="0" stop-color="${C.paper}" stop-opacity="0"/><stop offset="1" stop-color="${C.paper}" stop-opacity="1"/></linearGradient><mask id="${id}m"><rect x="${W0}" y="0" width="${WW}" height="${e.h + 400}" fill="url(#${id})"/></mask></defs>` + rect(W0, 0, WW, e.h + 400, { fill: `url(#${id})` }) + g({ mask: `url(#${id}m)` }, rect(W0, 0, WW, e.h + 400, { filter: 'url(#grain)', opacity: 0.35, style: 'mix-blend-mode:multiply' })); };

// Harry's pencil handwriting (Caveat, bold): notes, diagrams, the Game's clues in his own hand.
export const scrawl = (x, y, str, size = 32, anchor = 'middle', col = '#2d2a4a', attrs = {}) => text(x, y, str, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': size, 'text-anchor': anchor, fill: col, ...attrs });
// lined notebook paper filling (0,0)-(w,h): ruled lines every `step` from `top`, and a red margin line (margin: 0 for none)
export const notebook = (w, h, o = {}) => {
  const { fill = '#f3ead3', top = 20, step = 34, line: lc = '#b9c8d8', lw = 1.4, margin = 70 } = o;
  let out = rect(0, 0, w, h, { fill });
  for (let y = top; y < h; y += step) out += line(0, y, w, y, { stroke: lc, 'stroke-width': lw });
  return out + (margin ? line(margin, 0, margin, h, { stroke: '#e2a0a0', 'stroke-width': 2 }) : '');
};
