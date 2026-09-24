// Panel frames: shapes and border styles beyond the plain rectangle.
// The point of a special frame is immersion: the frame should belong to the scene (walking through an
// archway -> the panel IS the arch; peering through a keyhole -> keyhole panel) or dissolve entirely so a
// character stands on the page with the reader. See docs/ART_BIBLE.md -> "Panel frames".
//
// Use on any panel: { shape: 'arch', frame: 'stone' }  (in ep.panel/bleed opts: panel: { shape, frame })
// Shapes take (w, h, p) and return an SVG path in panel coordinates (0,0)-(w,h).
import { rng, r2 } from './svg.js';

const f = (n) => r2(n);
const P = (pts) => 'M' + pts.map(([x, y]) => `${f(x)},${f(y)}`).join(' L') + 'Z';

export const SHAPES = {
  // round-topped arch: doorways, the Leaky Cauldron's wall, castle windows. p.spring = where the curve starts (0-1 of h)
  arch: (w, h, p) => { const s = h * (p.spring ?? Math.min(0.5, (w / 2) / h)); return `M0,${f(h)} L0,${f(s)} A${f(w / 2)},${f(s)} 0 0 1 ${f(w)},${f(s)} L${f(w)},${f(h)}Z`; },
  // pointed (gothic) arch: Hogwarts corridors, the Great Hall windows
  gothic: (w, h, p) => { const s = h * (p.spring ?? 0.42); return `M0,${f(h)} L0,${f(s)} Q0,${f(s * 0.25)} ${f(w / 2)},0 Q${f(w)},${f(s * 0.25)} ${f(w)},${f(s)} L${f(w)},${f(h)}Z`; },
  oval: (w, h) => `M${f(w / 2)},0 A${f(w / 2)},${f(h / 2)} 0 1 1 ${f(w / 2 - 0.01)},0Z`,
  circle: (w, h) => { const r = Math.min(w, h) / 2; return `M${f(w / 2)},${f(h / 2 - r)} A${f(r)},${f(r)} 0 1 1 ${f(w / 2 - 0.01)},${f(h / 2 - r)}Z`; },
  // almond: an eye-shaped panel for eyes-only close-ups
  eye: (w, h) => `M0,${f(h / 2)} Q${f(w / 2)},${f(-h * 0.45)} ${f(w)},${f(h / 2)} Q${f(w / 2)},${f(h * 1.45)} 0,${f(h / 2)}Z`,
  keyhole: (w, h) => { const r = Math.min(w * 0.42, h * 0.3); const cx = w / 2, cy = r * 1.05; return `M${f(cx - r * 0.55)},${f(cy + r * 0.75)} A${f(r)},${f(r)} 0 1 1 ${f(cx + r * 0.55)},${f(cy + r * 0.75)} L${f(w * 0.78)},${f(h)} L${f(w * 0.22)},${f(h)}Z`; },
  diamond: (w, h) => P([[w / 2, 0], [w, h / 2], [w / 2, h], [0, h / 2]]),
  // slanted edges: action, a fall, a lurch. p.slant = horizontal offset in px (+ leans right)
  slant: (w, h, p) => { const s = p.slant ?? w * 0.12; return P([[Math.max(0, s), 0], [w + Math.min(0, s), 0], [w - Math.max(0, s), h], [-Math.min(0, s), h]]); },
  // top/bottom cut on a diagonal (two panels stacked with a shared diagonal seam): p.cutTop / p.cutBottom in px (+ = right side lower)
  cut: (w, h, p) => { const t = p.cutTop ?? 0, b = p.cutBottom ?? 0; return P([[0, Math.max(0, -t)], [w, Math.max(0, t)], [w, h - Math.max(0, -b)], [0, h - Math.max(0, b)]]); },
  // torn paper: notes, letters, the Game's clues, memories
  torn: (w, h, p) => { const R = rng(p.seed ?? 5), a = p.tear ?? 9, pts = []; const edge = (x0, y0, x1, y1, n) => { for (let i = 0; i < n; i++) { const t = i / n; pts.push([x0 + (x1 - x0) * t + (R() - 0.5) * a * (y0 === y1 ? 0.3 : 1), y0 + (y1 - y0) * t + (R() - 0.5) * a * (x0 === x1 ? 0.3 : 1)]); } }; const nx = Math.round(w / 22), ny = Math.round(h / 22); edge(a / 2, a / 2, w - a / 2, a / 2, nx); edge(w - a / 2, a / 2, w - a / 2, h - a / 2, ny); edge(w - a / 2, h - a / 2, a / 2, h - a / 2, nx); edge(a / 2, h - a / 2, a / 2, a / 2, ny); return P(pts); },
  // jagged burst: shock, a spell hitting, a scream (the panel itself explodes)
  burst: (w, h, p) => { const R = rng(p.seed ?? 7), n = p.points ?? 22, pts = []; for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2, out = i % 2 === 0, k = out ? 1 : 0.84 + R() * 0.06; pts.push([w / 2 + Math.cos(a) * w / 2 * k, h / 2 + Math.sin(a) * h / 2 * k]); } return P(pts); },
  // jagged rectangle: a crack, a stamp, a jolt that still fits captions in its corners. p.jag = tooth depth px
  jag: (w, h, p) => { const R = rng(p.seed ?? 11), a = p.jag ?? 12, pts = []; const edge = (x0, y0, x1, y1, n, nx, ny) => { for (let i = 0; i < n; i++) { const t = i / n, d = (i % 2 ? 1 : 0.2 + R() * 0.3) * a; pts.push([x0 + (x1 - x0) * t + nx * d, y0 + (y1 - y0) * t + ny * d]); } }; const nx = Math.max(6, Math.round(w / 34)), ny = Math.max(6, Math.round(h / 34)); edge(0, 0, w, 0, nx, 0, 1); edge(w, 0, w, h, ny, -1, 0); edge(w, h, 0, h, nx, 0, -1); edge(0, h, 0, 0, ny, 1, 0); return P(pts); },
  // soft cloud: daydreams, imagined scenes, what-ifs
  cloud: (w, h, p) => { const R = rng(p.seed ?? 3), n = Math.max(10, Math.round((w + h) / 70)); let d = ''; const pts = []; for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; pts.push([w / 2 + Math.cos(a) * (w / 2 - 22), h / 2 + Math.sin(a) * (h / 2 - 22)]); } d = `M${f(pts[0][0])},${f(pts[0][1])}`; for (let i = 0; i < n; i++) { const A = pts[i], B = pts[(i + 1) % n], mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, dx = mx - w / 2, dy = my - h / 2, L = Math.hypot(dx, dy) || 1, bl = 18 + R() * 8; d += ` Q${f(mx + dx / L * bl)},${f(my + dy / L * bl)} ${f(B[0])},${f(B[1])}`; } return d + 'Z'; },
  // a screen: Quirrell's face on every desk, a TV memory
  screen: (w, h) => { const r = Math.min(w, h) * 0.08; return `M${f(r)},0 L${f(w - r)},0 Q${f(w)},0 ${f(w)},${f(r)} L${f(w)},${f(h - r)} Q${f(w)},${f(h)} ${f(w - r)},${f(h)} L${f(r)},${f(h)} Q0,${f(h)} 0,${f(h - r)} L0,${f(r)} Q0,0 ${f(r)},0Z`; },
};

// Border styles, drawn over the edge of the shape. Each returns SVG for path d (panel coords).
export const STYLES = {
  ink: (d, p) => `<path d="${d}" fill="none" stroke="${p.borderColor || '#2b2226'}" stroke-width="${p.borderWidth || 3.5}" filter="url(#wobble)" stroke-linejoin="round"/>`,
  // gilt: portraits, mirrors, the Headmaster's office
  gilt: (d) => `<path d="${d}" fill="none" stroke="#2b2226" stroke-width="16" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#c9a24a" stroke-width="12" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#f0d27e" stroke-width="3" stroke-linejoin="round" opacity="0.8"/><path d="${d}" fill="none" stroke="#7a5a1e" stroke-width="1.5" stroke-dasharray="2 7" stroke-linejoin="round"/>`,
  // stone: arches, castle windows
  stone: (d) => `<path d="${d}" fill="none" stroke="#2b2226" stroke-width="22" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#8a8378" stroke-width="18" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#b7ad9c" stroke-width="18" stroke-dasharray="26 5" stroke-linejoin="round" opacity="0.7"/><path d="${d}" fill="none" stroke="#2b2226" stroke-width="2" stroke-linejoin="round" transform="translate(0,0)"/>`,
  // wood: doors, window frames, the trunk
  wood: (d) => `<path d="${d}" fill="none" stroke="#2b2226" stroke-width="16" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#6b4429" stroke-width="12" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#8a5d38" stroke-width="3" stroke-dasharray="30 12" stroke-linejoin="round"/>`,
  // glow: magic, the stars, a screen switched on
  glow: (d, p) => `<path d="${d}" fill="none" stroke="${p.glow || '#bfe3ff'}" stroke-width="12" opacity="0.35" filter="url(#blur3)"/><path d="${d}" fill="none" stroke="${p.glow || '#bfe3ff'}" stroke-width="3"/>`,
  // paper: torn notes and letters (thin, no wobble)
  paper: (d) => `<path d="${d}" fill="none" stroke="#6a5030" stroke-width="1.6" stroke-linejoin="round"/>`,
  // double rule: formal documents, the Hat's verdicts
  double: (d) => `<path d="${d}" fill="none" stroke="#2b2226" stroke-width="3" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#2b2226" stroke-width="1.2" stroke-linejoin="round" transform="translate(0,0)" opacity="0.6" stroke-dasharray="1 0"/>`,
  none: () => '',
  // dissolve: no line at all; the panel's edges fade softly into the page on every side (layout.js masks it). p.feather = px
  dissolve: () => '',
};

export function shapeD(p) {
  const s = typeof p.shape === 'function' ? p.shape : SHAPES[p.shape];
  return s ? s(p.w, p.h, p) : null;
}
