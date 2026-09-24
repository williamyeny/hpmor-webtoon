// Book Two props. Drawn centred at (0,0) unless noted; scale with transforms (same conventions as props.js).
import { C } from '../core/palette.js';
import { g, path, rect, circle, ellipse, line, text, polygon, smoothD, rng, shade, uid, r2 } from '../core/svg.js';

const INK = C.ink;
const S = (fill, w = 2.2) => ({ fill, stroke: INK, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
const glowC = (x, y, r, col, op) => { const id = uid('gl'); return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${col}" stop-opacity="${op}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs>` + circle(x, y, r, { fill: `url(#${id})` }); };

// ---------- the Time-Turner: a silver ring with an hourglass inside, on a fine gold chain. o.shell: protective cover; o.glow
export function timeTurner(s = 1, o = {}) {
  let out = '';
  if (o.chain !== false) out += path('M-4,-66 Q-40,-140 0,-200 Q40,-140 4,-66', { fill: 'none', stroke: '#e7bb4f', 'stroke-width': 2.4, 'stroke-dasharray': '3 2' });
  if (o.glow) out += glowC(0, 0, 110, '#ffe9a8', 0.55);
  out += circle(0, 0, 62, S('#dfe3e8', 2.6)) + circle(0, 0, 50, { fill: 'none', stroke: '#9aa3ad', 'stroke-width': 3 });
  out += circle(0, -64, 7, S('#e7bb4f', 1.6));
  // the hourglass, pivoting inside the ring
  out += g({ transform: `rotate(${o.rot || 0})` }, line(-50, 0, 50, 0, { stroke: '#b0842a', 'stroke-width': 4 }),
    path('M-22,-40 L22,-40 Q22,-14 3,0 Q22,14 22,40 L-22,40 Q-22,14 -3,0 Q-22,-14 -22,-40Z', S('rgba(230,240,248,0.55)', 2)),
    path('M-18,-36 L18,-36 Q16,-22 0,-6 Q-16,-22 -18,-36Z', { fill: '#e7bb4f', opacity: o.sand === 'bottom' ? 0.15 : 0.85 }),
    path('M-18,36 L18,36 Q12,24 0,18 Q-12,24 -18,36Z', { fill: '#e7bb4f', opacity: o.sand === 'bottom' ? 0.9 : 0.5 }),
    line(0, -6, 0, 18, { stroke: '#e7bb4f', 'stroke-width': 1.5, opacity: 0.8 }),
    rect(-26, -46, 52, 8, S('#c9ced4', 1.4)), rect(-26, 38, 52, 8, S('#c9ced4', 1.4)));
  if (o.shell) out += circle(0, 0, 68, S('rgba(176,132,42,0.85)', 2.6)) + circle(0, 0, 68, { fill: 'none', stroke: '#f7dc8c', 'stroke-width': 1.4, 'stroke-dasharray': '4 6' }) + path('M-40,-20 q40,-30 80,0', { fill: 'none', stroke: '#fff', 'stroke-width': 3, opacity: 0.5 }) + (o.lock ? text(0, 12, 'IX–XII', { 'font-family': 'IM Fell English SC', 'font-size': 26, 'text-anchor': 'middle', fill: '#3a2a10' }) : '');
  return g({ transform: `scale(${s})` }, out);
}

// ---------- pies (a pan, a crust, filling slopping over). kind: 'cherry' | 'blueberry'. o.splat: on a face
export function pie(s = 1, kind = 'cherry', o = {}) {
  const fill = kind === 'blueberry' ? '#3a3a8a' : '#b81f2e', dots = kind === 'blueberry' ? '#5a5ab0' : '#e2485a';
  const R = rng(kind.length * 7 + (o.seed || 0));
  let out = ellipse(0, 10, 96, 30, S('#9aa3ad', 2.4)) + ellipse(0, 4, 90, 26, S('#d9a55a', 2)) + ellipse(0, 2, 72, 19, S(fill, 1.6));
  for (let i = 0; i < 14; i++) out += circle(R.range(-60, 60), R.range(-10, 12), R.range(4, 8), { fill: dots, opacity: 0.8 });
  for (let k = 0; k < 5; k++) out += line(-60 + k * 30, -12, -40 + k * 30, 16, { stroke: '#e8b86a', 'stroke-width': 6, 'stroke-linecap': 'round' });
  return g({ transform: `scale(${s})${o.rot ? ` rotate(${o.rot})` : ''}` }, out);
}
// a splat of pie filling (for a face / the floor)
export function splat(s = 1, kind = 'cherry', seed = 3, o = {}) {
  // pie filling plastered over a face: a soft blob with drips running down, crust chunks, and (o.eyes) two blinking eyes
  const R = rng(seed); const col = kind === 'blueberry' ? '#3b3b8e' : '#b81f2e', hi = kind === 'blueberry' ? '#6a6ac0' : '#e2485a';
  const pts = []; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, r = 70 * R.range(0.85, 1.12); pts.push([Math.cos(a) * r * 1.1, Math.sin(a) * r * 0.85]); }
  let out = path(smoothD(pts, true, 0.42), { fill: col, stroke: shade(col, -0.4), 'stroke-width': 2.2 });
  for (let i = 0; i < 4; i++) { const x = R.range(-60, 60), L = R.range(14, 36), w = R.range(7, 12); out += path(`M${x - w},${40} Q${x - w},${40 + L} ${x},${46 + L} Q${x + w},${40 + L} ${x + w},${40}Z`, { fill: col, stroke: shade(col, -0.4), 'stroke-width': 1.6 }); }
  for (let i = 0; i < 7; i++) out += circle(R.range(-55, 55), R.range(-40, 30), R.range(4, 8), { fill: hi, opacity: 0.85 });
  for (let i = 0; i < 4; i++) out += path(`M${R.range(-60, 40)},${R.range(-50, 20)} l${R.range(18, 30)},-6 l6,12 l-22,8Z`, { fill: '#e8b86a', stroke: '#a8783a', 'stroke-width': 1.4 });
  out += path('M-40,-44 q20,-12 44,-4', { fill: 'none', stroke: '#fff', 'stroke-width': 5, opacity: 0.5, 'stroke-linecap': 'round' });
  if (o.eyes) out += [-24, 24].map((x) => ellipse(x, -6, 13, 11, { fill: '#fbf7ec', stroke: '#2a1b14', 'stroke-width': 2 }) + circle(x + 2, -5, 5, { fill: '#2a1b14' })).join('');
  return g({ transform: `scale(${s})` }, out);
}

// ---------- the Game's notes. A slip of paper; typed notes (Quotes Quill) are lettered with bubbles on top.
export function slip(w = 220, h = 150, o = {}) {
  const R = rng(o.seed || 5);
  let out = path(`M${-w / 2},${-h / 2 + R.range(-3, 3)} L${w / 2},${-h / 2 + R.range(-3, 3)} L${w / 2 + R.range(-3, 3)},${h / 2} L${-w / 2 + R.range(-3, 3)},${h / 2}Z`, S('#f8f1de', 1.6));
  if (o.lines) for (let k = 0; k < o.lines; k++) out += line(-w / 2 + 16, -h / 2 + 24 + k * 18, w / 2 - 16 - R.range(0, w * 0.4), -h / 2 + 24 + k * 18, { stroke: o.ink || '#555', 'stroke-width': 2, opacity: 0.8 });
  if (o.crumpled) for (let k = 0; k < 6; k++) out += path(`M${R.range(-w / 2, w / 2)},${R.range(-h / 2, h / 2)} l${R.range(-30, 30)},${R.range(-30, 30)}`, { stroke: '#c9b48a', 'stroke-width': 1.4 });
  return g({ transform: o.rot ? `rotate(${o.rot})` : undefined }, out);
}
export function cerealBox(s = 1, o = {}) {
  return g({ transform: `scale(${s})` }, rect(-50, -80, 100, 160, S('#e8a23a', 2.2)), rect(-40, -64, 80, 40, S('#fff3c9', 1.4)), text(0, -38, 'OAT', { 'font-family': 'Grenze Gotisch', 'font-size': 26, 'text-anchor': 'middle', fill: '#7b2433' }), ellipse(0, 20, 30, 22, S('#c9922e', 1.4)), o.open ? path('M-50,-80 l20,-26 l60,0 l20,26', S('#e8a23a', 2)) : '');
}
export function cerealBar(s = 1) { return g({ transform: `scale(${s})` }, rect(-44, -12, 88, 24, S('#c9922e', 1.8)), rect(-30, -12, 60, 24, S('#e9d9a8', 1.2)), text(0, 6, 'OATY', { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': 16, 'text-anchor': 'middle', fill: '#7b2433' })); }
export function tinyChocolate(s = 1) { return g({ transform: `scale(${s})` }, rect(-16, -9, 32, 18, S('#5a3322', 1.4)), rect(-16, -9, 12, 18, S('#c8a24a', 1.2))); }

// ---------- the Christmas box and the Cloak
export function giftBox(s = 1, o = {}) {
  let out = rect(-90, -70, 180, 140, S('#b8262e', 2.4)) + rect(-100, -86, 200, 30, S('#c93a40', 2.2));
  for (const x of [-60, -20, 20, 60]) out += line(x, -56, x, 70, { stroke: '#2f6a3a', 'stroke-width': 8, opacity: 0.85 });
  out += rect(-10, -86, 20, 156, { fill: '#e7bb4f', stroke: INK, 'stroke-width': 1.4 }) + path('M0,-86 Q-50,-140 -60,-100 Q-50,-80 0,-86 Q50,-80 60,-100 Q50,-140 0,-86Z', S('#e7bb4f', 1.8));
  if (o.envelope !== false) out += g({ transform: 'translate(50,-20) rotate(12)' }, rect(-40, -26, 80, 52, S('#f3ead3', 1.4)), path('M-40,-26 L0,4 L40,-26', { fill: 'none', stroke: INK, 'stroke-width': 1.2 }), circle(0, 4, 8, { fill: '#e9e4d6', stroke: '#b9b0a0', 'stroke-width': 1.2 }));
  return g({ transform: `scale(${s})` }, out);
}
// the Cloak of Invisibility: a shimmering silvery-black drape. o.w, o.h; draws starry shimmer
export function cloak(w = 300, h = 200, o = {}) {
  const R = rng(o.seed || 17); const id = uid('ck');
  let out = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b1a24"/><stop offset="0.45" stop-color="#4a4e62"/><stop offset="0.55" stop-color="#8a92a8"/><stop offset="0.65" stop-color="#3a3c4e"/><stop offset="1" stop-color="#15141c"/></linearGradient></defs>`;
  out += path(`M${-w / 2},${-h / 2} Q0,${-h / 2 - 20} ${w / 2},${-h / 2} Q${w / 2 + 20},0 ${w / 2 - 10},${h / 2} Q${w * 0.2},${h / 2 + 20} 0,${h / 2 - 10} Q${-w * 0.25},${h / 2 + 18} ${-w / 2 + 6},${h / 2} Q${-w / 2 - 16},0 ${-w / 2},${-h / 2}Z`, { fill: `url(#${id})`, stroke: '#0e0d14', 'stroke-width': 2, opacity: o.fade ?? 1 });
  for (let i = 0; i < 5; i++) out += path(`M${R.range(-w / 2, w / 2)},${-h / 2} q${R.range(-30, 30)},${h * 0.5} ${R.range(-20, 20)},${h}`, { fill: 'none', stroke: '#a9b3c8', 'stroke-width': 1.4, opacity: 0.35 });
  for (let i = 0; i < 24; i++) out += circle(R.range(-w / 2, w / 2), R.range(-h / 2, h / 2), R.range(0.8, 2.2), { fill: '#e6ecff', opacity: R.range(0.3, 0.9) });
  return out;
}

// ---------- Charms & Transfiguration
export function match(s = 1, silver = 0) { return g({ transform: `scale(${s})` }, rect(-3, -40, 6, 70, S(silver ? '#c9ced4' : '#d9b27a', 1.2)), silver ? path('M0,-40 L0,-50', { stroke: '#c9ced4', 'stroke-width': 2 }) : ellipse(0, -42, 5, 8, S('#9a2a2a', 1.2))); }
// a pig (McGonagall's desk). o.pose 'stand'; facing right
export function pig(s = 1, o = {}) {
  let out = ellipse(0, -80, 130, 72, S('#f0b7ae', 2.6));
  for (const x of [-80, -36, 40, 84]) out += rect(x - 14, -30, 28, 50, S('#e8a79e', 2.2)) + rect(x - 14, 14, 28, 10, S('#6a4a3a', 1.6));
  out += ellipse(118, -96, 48, 44, S('#f0b7ae', 2.4)) + ellipse(158, -88, 20, 16, S('#e89a92', 2)) + circle(152, -90, 3, { fill: INK }) + circle(164, -90, 3, { fill: INK });
  out += path('M100,-136 l14,-26 l12,24Z', S('#e89a92', 1.8)) + circle(126, -108, 5, { fill: INK }) + path('M-128,-96 q-26,-10 -14,-28 q14,-6 8,10', { fill: 'none', stroke: INK, 'stroke-width': 2.4 });
  if (o.confused) out += text(150, -170, '?', { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': 60, fill: INK, 'text-anchor': 'middle' });
  return g({ transform: `scale(${s})` }, out);
}
// a textbook page with a moving picture: kind 'dementor' (a cold, hooded silhouette), 'victim' (a shocked woman, tasteful), 'dead' (an empty chair)
export function textbookPage(kind = 'dementor', w = 360, h = 460) {
  const id = uid('tb');
  let pic = '';
  if (kind === 'dementor') pic = rect(0, 0, w, h * 0.7, { fill: '#2a3440' }) + path(`M${w * 0.5},${h * 0.08} Q${w * 0.72},${h * 0.1} ${w * 0.7},${h * 0.3} Q${w * 0.78},${h * 0.55} ${w * 0.86},${h * 0.7} L${w * 0.14},${h * 0.7} Q${w * 0.22},${h * 0.55} ${w * 0.3},${h * 0.3} Q${w * 0.28},${h * 0.1} ${w * 0.5},${h * 0.08}Z`, { fill: '#0c0f14' }) + ellipse(w * 0.5, h * 0.2, w * 0.08, h * 0.05, { fill: '#000' }) + path(`M${w * 0.62},${h * 0.4} q${w * 0.1},${h * 0.04} ${w * 0.14},${h * 0.12} M${w * 0.66},${h * 0.44} q${w * 0.06},${h * 0.06} ${w * 0.06},${h * 0.14}`, { fill: 'none', stroke: '#9aa6ad', 'stroke-width': 3 }) + rect(0, 0, w, h * 0.7, { fill: '#9bc4e8', opacity: 0.12 });
  if (kind === 'victim') pic = rect(0, 0, w, h * 0.7, { fill: '#e9e0cc' }) + ellipse(w * 0.5, h * 0.32, w * 0.16, h * 0.14, { fill: '#8aa86a', stroke: INK, 'stroke-width': 2 }) + path(`M${w * 0.34},${h * 0.7} Q${w * 0.5},${h * 0.44} ${w * 0.66},${h * 0.7}Z`, { fill: '#6a5a7a', stroke: INK, 'stroke-width': 2 }) + ellipse(w * 0.5, h * 0.37, w * 0.035, h * 0.04, { fill: '#2a1a14' }) + circle(w * 0.45, h * 0.3, 4, { fill: INK }) + circle(w * 0.55, h * 0.3, 4, { fill: INK });
  if (kind === 'dead') pic = rect(0, 0, w, h * 0.7, { fill: '#d8ccb0' }) + rect(w * 0.35, h * 0.3, w * 0.3, h * 0.28, { fill: '#6b4429', stroke: INK, 'stroke-width': 2 }) + rect(w * 0.35, h * 0.12, w * 0.06, h * 0.46, { fill: '#5a3a24', stroke: INK, 'stroke-width': 2 });
  let out = rect(0, 0, w, h, S('#f3ead3', 2)) + `<clipPath id="${id}"><rect x="${w * 0.08}" y="${h * 0.06}" width="${w * 0.84}" height="${h * 0.62}"/></clipPath>`;
  out += g({ 'clip-path': `url(#${id})` }, g({ transform: `translate(${w * 0.08},${h * 0.06}) scale(0.84)` }, pic)) + rect(w * 0.08, h * 0.06, w * 0.84, h * 0.62, { fill: 'none', stroke: INK, 'stroke-width': 2 });
  for (let k = 0; k < 6; k++) out += line(w * 0.1, h * 0.74 + k * 18, w * (0.9 - (k === 5 ? 0.4 : 0)), h * 0.74 + k * 18, { stroke: '#8a7a6a', 'stroke-width': 3, opacity: 0.6 });
  return out;
}

// ---------- Defence: the desk screens (like Muggle televisions), target spheres, red bolts
export function deskScreen(s = 1, face = '') { return g({ transform: `scale(${s})` }, rect(-70, -52, 140, 100, S('#f7f4ec', 2)), rect(-62, -44, 124, 84, { fill: '#e6ecef' }), face, path('M-20,48 L20,48 L28,62 L-28,62Z', S('#d9d2c2', 1.6))); }
export function targetSphere(s = 1, col = '#3a6ad0', o = {}) { return g({ transform: `scale(${s})` }, o.glow !== false ? glowC(0, 0, 70, col, 0.45) : '', circle(0, 0, 34, S(col, 2)), circle(-10, -12, 9, { fill: '#fff', opacity: 0.5 }), o.hit ? circle(0, 0, 44, { fill: 'none', stroke: '#fff3c9', 'stroke-width': 4, opacity: 0.8 }) : ''); }
export function bolt(x1, y1, x2, y2, o = {}) { const R = rng(o.seed || 5); const pts = [[x1, y1]]; const n = 6; for (let i = 1; i < n; i++) { const t = i / n; pts.push([x1 + (x2 - x1) * t + R.range(-10, 10), y1 + (y2 - y1) * t + R.range(-10, 10)]); } pts.push([x2, y2]); const d = 'M' + pts.map((p) => p.join(',')).join(' L'); return glowC(x2, y2, 60, '#ff5a3a', 0.5) + path(d, { fill: 'none', stroke: '#ff6a4a', 'stroke-width': 10, opacity: 0.45, 'stroke-linecap': 'round' }) + path(d, { fill: 'none', stroke: '#fff0d8', 'stroke-width': 3.4, 'stroke-linecap': 'round' }); }

// ---------- Flying: a school broom; the Remembrall (o.red: blazing)
export function broom(s = 1, o = {}) {
  const R = rng(9); let tw = ''; for (let i = 0; i < 16; i++) tw += line(150, R.range(-6, 6), 250 + R.range(0, 30), R.range(-26, 26), { stroke: '#8a6a3a', 'stroke-width': 2.4 });
  return g({ transform: `scale(${s}) rotate(${o.rot || 0})` }, path('M-200,-5 L160,-7 L160,7 L-200,5Z', S('#8a5d38', 1.8)), tw, path('M150,-18 Q220,-30 270,-20 Q280,0 270,20 Q220,30 150,18Z', S('#b58a4a', 1.8)), line(150, -16, 150, 16, { stroke: '#5a3a1a', 'stroke-width': 5 }), tw);
}
export function remembrall(s = 1, o = {}) {
  const red = o.red; let out = '';
  if (red) out += glowC(0, 0, 150, '#ff3a2a', 0.55) + glowC(0, 0, 60, '#fff0d0', 0.6);
  out += circle(0, 0, 28, S(red ? '#ff5a3a' : 'rgba(230,236,240,0.8)', 2.2));
  out += red ? circle(0, 0, 18, { fill: '#ffd0a0', opacity: 0.8 }) : path('M-16,4 q10,-14 18,-2 q8,12 16,-4', { fill: 'none', stroke: '#fff', 'stroke-width': 4, opacity: 0.9 });
  out += circle(-9, -10, 6, { fill: '#fff', opacity: 0.7 });
  if (red) for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; out += line(Math.cos(a) * 38, Math.sin(a) * 38, Math.cos(a) * 70, Math.sin(a) * 70, { stroke: '#ffb080', 'stroke-width': 3, opacity: 0.7 }); }
  return g({ transform: `scale(${s})` }, out);
}

// ---------- Dumbledore's office: the rock; Lily's potions book; curious instruments; Fawkes as a chicken; an egg
export function rock(s = 1) { return g({ transform: `scale(${s})` }, path('M-90,30 L-70,-30 L-20,-58 L40,-50 L88,-10 L80,34 L20,48 L-50,44Z', S('#9a968c', 2.4)), path('M-20,-58 L-6,0 L40,-50 M-6,0 L80,34 M-6,0 L-50,44', { fill: 'none', stroke: '#6f6b62', 'stroke-width': 2 }), path('M-60,-10 l20,-6', { stroke: '#c9c5bb', 'stroke-width': 3 })); }
export function potionsBook(s = 1, o = {}) {
  if (o.open) return g({ transform: `scale(${s})` }, path('M0,-10 Q-80,-24 -160,-10 L-160,110 Q-80,96 0,110Z', S('#efe3c4', 2)), path('M0,-10 Q80,-24 160,-10 L160,110 Q80,96 0,110Z', S('#efe3c4', 2)), ...[0, 1, 2, 3, 4].map((k) => line(-140, 10 + k * 18, -30, 8 + k * 18, { stroke: '#8a7a6a', 'stroke-width': 2.4, opacity: 0.6 })), text(-150, 106, 'I wonder what would happen…', { 'font-family': 'Caveat', 'font-size': 15, fill: '#1f3a8a' }), text(20, 96, 'You\'d get sick for weeks.', { 'font-family': 'Pinyon Script', 'font-size': 16, fill: '#2f6a3a' }));
  return g({ transform: `scale(${s})` }, rect(-70, -94, 140, 188, S('#6b5a3a', 2.4)), rect(-60, -84, 120, 168, { fill: 'none', stroke: '#c9a24a', 'stroke-width': 1.4 }), path('M-6,-40 L6,-40 L10,10 Q0,26 -10,10Z', S('#8ab09a', 1.4)), path('M0,-54 q-8,-12 0,-20 q8,8 0,20', { fill: '#d9e6d0', opacity: 0.7 }));
}
export function chicken(s = 1, o = {}) {
  let out = '';
  if (o.fire) out += glowC(0, -40, 160, '#ff9a3a', 0.8) + path('M-60,20 Q-80,-60 -30,-120 Q-20,-70 0,-150 Q20,-80 40,-120 Q80,-60 60,20Z', { fill: '#ff9a3a', stroke: '#c9601f', 'stroke-width': 2 }) + path('M-30,20 Q-40,-40 -10,-80 Q0,-50 20,-90 Q40,-40 30,20Z', { fill: '#ffe08a' });
  if (o.ash) return g({ transform: `scale(${s})` }, ellipse(0, 10, 50, 12, S('#6a6560', 1.6)), ellipse(-10, 4, 20, 8, { fill: '#8a8580' }), ellipse(16, 6, 14, 6, { fill: '#4a4540' }));
  out += g({ opacity: o.fire ? 0.55 : 1 }, ellipse(0, -30, 56, 44, S('#d9a066', 2.2)), path('M-50,-40 Q-80,-60 -70,-20Z', S('#c98a50', 1.8)), ellipse(40, -76, 24, 26, S('#d9a066', 2)), path('M58,-80 l18,6 l-18,6Z', S('#e7bb4f', 1.6)), path('M34,-102 q6,-12 12,0 q6,-10 10,4', S('#c9302a', 1.6)), circle(46, -82, 3.4, { fill: INK }), path('M52,-66 q4,10 -2,14', S('#c9302a', 1.4)), line(-12, 12, -16, 40, { stroke: '#e7bb4f', 'stroke-width': 4 }), line(12, 12, 16, 40, { stroke: '#e7bb4f', 'stroke-width': 4 }));
  return g({ transform: `scale(${s})` }, out);
}
export function egg(s = 1) { return g({ transform: `scale(${s})` }, ellipse(0, 0, 16, 21, S('#f0e2b8', 1.8)), ellipse(-5, -7, 4, 6, { fill: '#fff', opacity: 0.6 })); }
// Fawkes, the real phoenix: crimson and gold, long tail, a flame-like crest. o.fly: wings spread
export function phoenix(s = 1, o = {}) {
  const fly = o.fly; let out = '';
  if (o.glow !== false) out += glowC(0, -40, 220, '#ffb24a', 0.4);
  out += path('M-10,20 Q-40,120 -20,240 Q0,160 10,120 Q30,180 50,250 Q50,130 20,20Z', S('#e7a23a', 2));
  out += fly ? path('M-20,-40 Q-180,-160 -300,-60 Q-200,-60 -160,-20 Q-230,0 -250,60 Q-120,10 -30,10Z', S('#c4321e', 2.2)) + path('M20,-40 Q180,-160 300,-60 Q200,-60 160,-20 Q230,0 250,60 Q120,10 30,10Z', S('#c4321e', 2.2)) : path('M-40,-30 Q-70,40 -20,80 Q-10,20 -10,-20Z', S('#a82818', 2));
  out += ellipse(0, -20, 44, 60, S('#d13a22', 2.2)) + ellipse(10, -92, 30, 30, S('#d13a22', 2)) + path('M34,-96 l24,8 l-22,8Z', S('#e7bb4f', 1.8)) + circle(18, -98, 4.4, { fill: INK }) + circle(19.5, -99.5, 1.4, { fill: '#fff' });
  out += path('M-8,-118 Q-20,-150 0,-170 Q4,-140 14,-160 Q20,-130 28,-146 Q30,-118 18,-112Z', S('#f0a13c', 1.8));
  return g({ transform: `scale(${s})` }, out);
}
// three odd instruments: 'blorple' cube, 'dial8' (eight-handed dial), 'wibblers' (golden)
export function instrument(kind = 'dial8', s = 1) {
  if (kind === 'blorple') return g({ transform: `scale(${s})` }, path('M-30,-10 L0,-26 L30,-10 L30,26 L0,42 L-30,26Z', S('#7a8aa0', 2)), path('M-30,-10 L0,6 L30,-10 M0,6 L0,42', { fill: 'none', stroke: INK, 'stroke-width': 1.6 }), circle(12, 14, 4, { fill: '#ffe08a' }));
  if (kind === 'dial8') { let h = ''; const R = rng(8); for (let k = 0; k < 8; k++) { const a = R() * 6.28, L = R.range(14, 34); h += line(0, 0, Math.sin(a) * L, -Math.cos(a) * L, { stroke: INK, 'stroke-width': 1.6 }); } return g({ transform: `scale(${s})` }, rect(-6, 40, 12, 40, S('#b08d45', 1.4)), circle(0, 0, 42, S('#f3ead3', 2.2)), circle(0, 0, 36, { fill: 'none', stroke: '#b08d45', 'stroke-width': 2 }), h, circle(0, 0, 4, { fill: INK })); }
  return g({ transform: `scale(${s})` }, line(0, 60, 0, -20, { stroke: '#b08d45', 'stroke-width': 3 }), ...[-40, -10, 20].map((y, i) => g({ transform: `rotate(${i * 30 - 30} 0 ${y})` }, ellipse(0, y, 36, 8, S('#e7bb4f', 1.6)), circle(36, y, 5, S('#f7dc8c', 1.2)), circle(-36, y, 5, S('#f7dc8c', 1.2)))), rect(-20, 60, 40, 12, S('#6b4429', 1.4)));
}

// ---------- Friday: the cake with candles (n unlit); the fingerspelled sign
export function cake(s = 1, n = 51, o = {}) {
  let out = ellipse(0, 40, 170, 34, S('#e9e4d6', 2)) + rect(-140, -40, 280, 80, S('#f3e2c0', 2.2)) + ellipse(0, -40, 140, 28, S('#fbf1dc', 2.2)) + path('M-140,-30 q20,20 40,0 q20,20 40,0 q20,20 40,0 q20,20 40,0 q20,20 40,0 q20,20 40,0 q20,20 40,0', { fill: 'none', stroke: '#c9302a', 'stroke-width': 5 });
  const R = rng(51); for (let i = 0; i < n; i++) { const a = R() * 6.28, r = Math.sqrt(R()) * 0.92; const x = Math.cos(a) * 128 * r, y = -40 + Math.sin(a) * 22 * r; out += rect(x - 2.5, y - 26, 5, 26, { fill: R.pick(['#2f4f86', '#e7bb4f', '#9a2a2a', '#f3ead3']), stroke: INK, 'stroke-width': 0.8 }) + (o.lit ? circle(x, y - 30, 3.4, { fill: '#ffd774' }) : line(x, y - 26, x, y - 31, { stroke: INK, 'stroke-width': 1 })); }
  return g({ transform: `scale(${s})` }, out);
}
export function sign(lines = ["I'M LEAVING", 'DOES ANYONE ELSE', 'NEED TO GET OUT?'], w = 360, h = 260) {
  let out = rect(-w / 2, -h / 2, w, h, S('#fbf7ec', 2)) + path(`M${-w / 2},${-h / 2 + 10} h${w}`, { stroke: '#9aa3ad', 'stroke-width': 1.4, 'stroke-dasharray': '3 3' });
  lines.forEach((t, i) => { out += text(0, -h / 2 + (i + 1) * h / (lines.length + 1) + 16, t, { 'font-family': 'Patrick Hand, Caveat', 'font-weight': 700, 'font-size': Math.min(44, w / (t.length * 0.52)), 'text-anchor': 'middle', fill: '#1f1d24' }); });
  return out;
}
export function marker(s = 1) { return g({ transform: `scale(${s})` }, rect(-6, -40, 12, 70, S('#1f1d24', 1.4)), rect(-6, -52, 12, 14, S('#4a4a4a', 1.2))); }

// ---------- the ring McGonagall has forged (a small jewel set against the skin)
export function ring(s = 1, jewel = '#dfe9f0') { return g({ transform: `scale(${s})` }, ellipse(0, 0, 22, 8, { fill: 'none', stroke: '#e7bb4f', 'stroke-width': 5 }), path('M-7,-6 L0,-16 L7,-6 L0,-2Z', S(jewel, 1.2))); }

// ---------- the Defence mat; dojo practice sword (bokken)
export function mat(w = 900, h = 120) { return path(`M${-w / 2},0 L${w / 2},0 L${w / 2 + 40},${h} L${-w / 2 - 40},${h}Z`, S('#4a6a9a', 2.4)) + path(`M${-w / 2 + 20},${h * 0.2} L${w / 2 - 20},${h * 0.2}`, { stroke: '#6a8aba', 'stroke-width': 3 }); }
export function bokken(s = 1, rot = 0) { return g({ transform: `scale(${s}) rotate(${rot})` }, path('M-140,-4 Q40,-10 150,-2 L150,4 Q40,6 -140,4Z', S('#c9a06a', 1.6)), rect(-150, -6, 80, 12, S('#7a4e2e', 1.4))); }

// ---------- Pioneer 11: dish, instrument bus, the golden plaque. o.glint: the wrongness shimmer
export function pioneer(s = 1, o = {}) {
  let out = ellipse(0, -40, 150, 56, S('#e9e4d6', 2.4)) + ellipse(0, -44, 120, 40, { fill: '#d9d2c2', opacity: 0.7 }) + line(0, -40, 0, -150, { stroke: '#c9ced4', 'stroke-width': 4 }) + circle(0, -150, 8, S('#c9ced4', 1.6));
  out += path('M-60,-10 L60,-10 L70,50 L-70,50Z', S('#b9b4a8', 2.2)) + line(-70, 30, -220, 90, { stroke: '#9aa3ad', 'stroke-width': 4 }) + line(70, 30, 220, 90, { stroke: '#9aa3ad', 'stroke-width': 4 }) + rect(-236, 82, 34, 24, S('#8a8f96', 1.4)) + rect(202, 82, 34, 24, S('#8a8f96', 1.4));
  out += g({ transform: 'translate(0,70)' }, rect(-46, -24, 92, 60, S('#e7bb4f', 1.8)), path('M-30,-10 l6,-8 l6,8 M-30,-10 l0,24 M-18,-10 l0,24 M10,-12 a5,5 0 1,1 0.1,0 M10,-6 l0,18', { fill: 'none', stroke: '#8a6a1a', 'stroke-width': 1.4 }), line(-40, 30, 40, 30, { stroke: '#8a6a1a', 'stroke-width': 1.2 }));
  if (o.glint) out += glowC(0, 76, 90, '#ffe9a8', 0.5) + g({ transform: 'translate(0,70)' }, rect(-46, -24, 92, 60, { fill: '#9bc4e8', opacity: 0.25, transform: 'translate(-4,0)' }), rect(-46, -24, 92, 60, { fill: '#ffcf75', opacity: 0.25, transform: 'translate(4,0)' }));
  return g({ transform: `scale(${s})${o.rot ? ` rotate(${o.rot})` : ''}` }, out);
}
