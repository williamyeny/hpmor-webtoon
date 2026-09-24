// Book Two cast: the first-years in their House colours, the older Slytherins, Madam Hooch, the
// portraits in the corridors, Dumbledore at home (pink pyjamas), and the dojo flashback.
import { C } from '../core/palette.js';
import { path, ellipse, circle, line, g, smoothD, shade, rng } from '../core/svg.js';
import * as H from './hair.js';
import { KID, KID_SMALL, TEEN, ADULT_M, ADULT_F, makeExtra, harryRaven, hermione, neville, draco, dumbledore, quirrell, student } from './cast.js';

export const HOUSE = { g: '#9a2a2a', s: '#2f5a40', r: '#2f4f86', h: '#d6a33a', n: '#3a3744' };
const robesOf = (house, base = {}) => ({ top: '#1f1d24', robe: true, robeColor: '#1f1d24', robeLen: 0.95, wideSleeves: true, cuffW: 1.6, legs: '#2a2630', shoes: '#2a1a12', collar: '#f2ecde', robeTrim: HOUSE[house], cuff: HOUSE[house], tie: HOUSE[house], ...base });
const kidFace = (o = {}) => ({ eyeY: 12, eyeSpacing: 25, noseY: 34, mouthY: 44, nose: 'button', eye: { w: 24, h: 28, iris: 10.5, color: '#5b4632', lash: 1.7, ...(o.eye || {}) }, brow: { len: 22, w: 5.5, gap: 9, ...(o.brow || {}) }, mouth: { w: 20 }, rosy: true, ...o, eye: { w: 24, h: 28, iris: 10.5, color: '#5b4632', lash: 1.7, ...(o.eye || {}) }, brow: { len: 22, w: 5.5, gap: 9, ...(o.brow || {}) } });
const teenFace = (o = {}) => ({ eyeY: 8, eyeSpacing: 23, noseY: 30, mouthY: 44, nose: 'long', noseLen: 18, eye: { w: 20, h: 18, iris: 8, color: '#5b4632', lash: 1.4, shape: 'almond', ...(o.eye || {}) }, brow: { len: 23, w: 5, gap: 7, ...(o.brow || {}) }, mouth: { w: 22 }, ...o, eye: { w: 20, h: 18, iris: 8, color: '#5b4632', lash: 1.4, shape: 'almond', ...(o.eye || {}) }, brow: { len: 23, w: 5, gap: 7, ...(o.brow || {}) } });

// ---------- the regulars, in House robes
export const hermioneRaven = { ...hermione, name: 'hermione', outfit: robesOf('r', { shoes: '#3a2418', robeTrim: HOUSE.r }) };
export const nevilleHuff = { ...neville, name: 'neville', outfit: robesOf('h', { shoes: '#3a2418' }) };
export const dracoSly = { ...draco, name: 'draco', outfit: { ...draco.outfit, robeTrim: HOUSE.s, cuff: HOUSE.s, tie: HOUSE.s } };
export { harryRaven };

// ---------- first-years
const kid = (name, o) => ({ name, body: { ...KID, ...(o.body || {}) }, skin: o.skin, skinShade: o.skinShade, head: { jaw: 0.6, chin: 1.0, cheek: 0.92, ...(o.head || {}) }, face: kidFace(o.face || {}), hair: o.hair, outfit: robesOf(o.house), glasses: o.glasses });
export const ernie = kid('ernie', { house: 'h', skin: '#f3d6c0', skinShade: '#d8ae94', head: { jaw: 0.64, chin: 1.02 }, face: { eye: { color: '#3d6a8a' }, brow: { color: '#b9924a' } }, hair: { color: '#d4b06a', ...H.neat('ernie', { part: -0.5 }) } });
export const terry = kid('terry', { house: 'r', skin: '#eec4a1', skinShade: '#d49c7b', face: { eye: { color: '#5b4632' }, brow: { color: '#5a3722' } }, hair: { color: '#5a3722', ...H.messy('terry', { fringeY: -0.2 }) } });
export const anthony = kid('anthony', { house: 'r', skin: '#f0d6c2', skinShade: '#d2b19a', face: { eye: { color: '#3f6b4f' }, brow: { color: '#2a1a14' } }, hair: { color: '#2a1a14', ...H.curlyShort('anthony') } });
export const padma = kid('padma', { house: 'r', skin: '#b98060', skinShade: '#94613f', face: { eye: { color: '#3a2618', lash: 2.0 }, brow: { color: '#1b1310' }, lips: '#9a5a50' }, hair: { color: '#1b1310', ...H.long('padma', { len: 1.9 }) } });
export const michael = kid('michael', { house: 'r', skin: '#eec4a1', skinShade: '#d49c7b', face: { eye: { color: '#3d6a8a' }, brow: { color: '#2a1a14' } }, hair: { color: '#2a1a14', ...H.neat('michael', { part: 0.3, fringe: true }) } });
export const dean = kid('dean', { house: 'g', skin: '#6e4530', skinShade: '#52301f', face: { eye: { color: '#2a1a12' }, brow: { color: '#1b1310' } }, hair: { color: '#1b1310', ...H.curlyShort('dean') } });
export const zabini = kid('zabini', { house: 's', skin: '#5e3a28', skinShade: '#442818', head: { jaw: 0.5, chin: 1.08, cheek: 0.88 }, face: { eye: { color: '#2a1a12', w: 22, h: 22 }, brow: { color: '#1b1310', len: 20, w: 4 } }, hair: { color: '#1b1310', ...H.curlyShort('zabini') } });
// Mr Crabbe (muscles) and Mr Goyle (balance): bodyguards who have practised looming for years
export const crabbe = kid('crabbe', { house: 's', body: { shoulderW: 92, waistW: 82, hipW: 80, armW: 26, legW: 28, headRx: 62, torsoH: 98 }, skin: '#efc9a8', skinShade: '#d09c7c', head: { jaw: 0.82, chin: 0.94, cheek: 1.0 }, face: { eye: { w: 18, h: 18, iris: 8 }, brow: { color: '#3a2a1a', w: 7, len: 24, gap: 5 }, mouth: { w: 22 } }, hair: { color: '#3a2a1a', ...H.neat('crabbe', { part: 0, fringe: true }) } });
export const goyle = kid('goyle', { house: 's', body: { shoulderW: 80, waistW: 70, legU: 58 }, skin: '#e8c2a0', skinShade: '#c99a78', head: { jaw: 0.7, chin: 1.0 }, face: { eye: { w: 16, h: 14, iris: 7 }, brow: { color: '#6a4a2a', w: 6, len: 22, gap: 5 } }, hair: { color: '#6a4a2a', ...H.curlyShort('goyle') } });

// ---------- older Slytherins (Derrick & co.)
const teen = (name, seed, o = {}) => {
  const e = makeExtra(seed, { kid: false, female: false, old: false, hairStyle: o.hairStyle || 'neat', robe: '#1f1d24' });
  return { ...e, name, body: { ...TEEN, ...(o.body || {}) }, face: teenFace({ eye: { color: o.eye || '#5b4632' }, brow: { color: e.hair.color }, ...(o.face || {}) }), outfit: robesOf('s', { robeLen: 0.97 }), ...(o.extra || {}) };
};
export const derrick = teen('derrick', 1301, { hairStyle: 'neat', body: { shoulderW: 116, waistW: 92, torsoH: 136, armW: 26, legW: 30, headRx: 56, headRy: 58 }, face: { brow: { w: 7, gap: 4 } },
  extra: { facialHair: ({ rx, ry, s, lw, F, mz }) => path(`M${mz.x - rx * 0.7},${F.mouthY - 6} Q${mz.x},${ry * 1.05} ${mz.x + rx * 0.7},${F.mouthY - 6}`, { fill: 'none', stroke: '#7a6a5a', 'stroke-width': lw * 5, opacity: 0.25, 'stroke-linecap': 'round' }) } });
export const slyTeen = (seed, o = {}) => teen('sly' + seed, 1310 + seed, { hairStyle: ['neat', 'curly', 'messy'][seed % 3], ...o });
// the one who said "stop, you shouldn't actually do that" (absent from the lesson in Ep 22)
export const conscience = teen('conscience', 1320, { hairStyle: 'neat', eye: '#3d6a8a' });

// ---------- staff
export const hooch = { name: 'hooch', body: { ...ADULT_F, headRx: 46, headRy: 54, torsoH: 152 }, skin: '#e9c8aa', skinShade: '#c99f82', head: { jaw: 0.5, chin: 1.04, cheek: 0.86 },
  face: { eyeY: 4, eyeSpacing: 21, noseY: 26, mouthY: 42, nose: 'hook', noseLen: 22, eye: { w: 20, h: 16, iris: 8, color: '#d6a33a', lash: 1.2, shape: 'almond' }, brow: { len: 22, w: 4, gap: 6, color: '#b9b4ab' }, mouth: { w: 20 }, wrinkles: true },
  hair: { color: '#c9c6bd', ...H.messy('hooch', { fringeY: -0.5 }) },
  outfit: { top: '#e9e4d8', robe: true, robeColor: '#6b6560', robeLen: 0.92, wideSleeves: false, legs: '#3a3a3a', shoes: '#2a1a12', robeTrim: '#d6a33a', collar: '#f2ecde' } };
// Professor Binns: a ghost (render him with opacity & a pale tint)
export const binns = { ...makeExtra(1401, { old: true, female: false, hairStyle: 'bald', robe: '#8a9aa0' }), name: 'binns', skin: '#dfe9ea', skinShade: '#b9c8ca' };
// Dumbledore at home: three layers of bright pink pyjamas, and a hat like a squashed giant mushroom
export const dumbledorePJ = { ...dumbledore, name: 'dumbledore',
  outfit: { ...dumbledore.outfit, top: '#e58aa8', robeColor: '#e58aa8', robeTrim: '#f4b8cc', cuff: '#c9607f', torsoDetail: ({ T, sw, B, lw }) => { let st = ''; for (let k = 0; k < 3; k++) { const a = T(-sw * 0.9, -B.torsoH * (0.2 + k * 0.28)), b = T(sw * 0.9, -B.torsoH * (0.2 + k * 0.28)); st += `M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${a[1] + 10} ${b[0]},${b[1]} `; } return path(st, { fill: 'none', stroke: '#c9607f', 'stroke-width': lw * 1.4, 'stroke-dasharray': '10 6' }); } },
  hat: ({ rx, ry, s, lw }) => { const y = -ry * 0.78; return path(`M${-rx * 1.7},${y + 6} Q${-rx * 1.5},${y - ry * 0.95} ${s * 12},${y - ry * 1.05} Q${rx * 1.5},${y - ry * 0.95} ${rx * 1.7},${y + 6} Q0,${y + 22} ${-rx * 1.7},${y + 6}Z`, { fill: '#c9607f', stroke: C.ink, 'stroke-width': lw }) + [[-0.9, -0.5], [-0.3, -0.8], [0.4, -0.6], [1.0, -0.35]].map(([a, b]) => circle(rx * a + s * 10, y + ry * b, rx * 0.13, { fill: '#f6e0e8', stroke: C.ink, 'stroke-width': lw * 0.6 })).join(''); } };

// ---------- portraits (painted people; draw them inside CS.portraitFrame)
// the wise old lady ("the game is life"): lace cap, shawl
export const oldLady = { ...makeExtra(1501, { old: true, female: true, hairStyle: 'bun', robe: '#4a3a5a' }), name: 'oldlady',
  hat: ({ rx, ry, s, lw }) => path(`M${-rx * 1.1},${-ry * 0.35} Q${-rx * 0.9},${-ry * 1.3} 0,${-ry * 1.28} Q${rx * 0.9},${-ry * 1.3} ${rx * 1.1},${-ry * 0.35} Q${rx * 0.4},${-ry * 0.62} 0,${-ry * 0.6} Q${-rx * 0.4},${-ry * 0.62} ${-rx * 1.1},${-ry * 0.35}Z`, { fill: '#f3ecdc', stroke: C.ink, 'stroke-width': lw }) + path(`M${-rx * 1.05},${-ry * 0.4} q${rx * 0.2},${ry * 0.1} ${rx * 0.3},0 q${rx * 0.2},${ry * 0.1} ${rx * 0.3},0 q${rx * 0.2},${ry * 0.1} ${rx * 0.3},0 q${rx * 0.2},${ry * 0.1} ${rx * 0.3},0 q${rx * 0.2},${ry * 0.1} ${rx * 0.3},0 q${rx * 0.2},${ry * 0.1} ${rx * 0.3},0 q${rx * 0.2},${ry * 0.1} ${rx * 0.3},0`, { fill: 'none', stroke: '#c9bea6', 'stroke-width': lw * 0.8 }) };
oldLady.face = { ...oldLady.face, eye: { ...oldLady.face.eye, color: '#4a6a8a' }, wrinkles: true, cheekLines: true };
// Cornelion Flubberwalt: the loudest pink robes ever imagined; a droopy pointed hat with a fish on it (an actual fish)
export const flubberwalt = { ...makeExtra(1502, { old: false, female: false, hairStyle: 'curly', robe: '#ff4fa3' }), name: 'flubberwalt',
  outfit: { top: '#ff4fa3', robe: true, robeColor: '#ff4fa3', robeLen: 1.0, wideSleeves: true, cuffW: 1.9, legs: '#2a2630', shoes: '#2a1a12', robeTrim: '#ffd84f', cuff: '#ffd84f' },
  hat: ({ rx, ry, s, lw }) => { const y = -ry * 0.7; return path(`M${-rx * 1.3},${y + 4} Q0,${y + 18} ${rx * 1.3},${y} Q${rx * 0.6},${y - ry * 1.3} ${-rx * 0.1},${y - ry * 1.5} Q${-rx * 0.9},${y - ry * 1.4} ${-rx * 1.6},${y - ry * 0.4} Q${-rx * 1.2},${y - ry * 0.7} ${-rx * 0.8},${y - ry * 0.6} Q${-rx * 1.0},${y - ry * 0.2} ${-rx * 1.3},${y + 4}Z`, { fill: '#8a3a6a', stroke: C.ink, 'stroke-width': lw }) +
    g({ transform: `translate(${rx * 0.25},${y - ry * 0.55}) rotate(-8)` }, path(`M${-rx * 0.7},0 Q${-rx * 0.2},${-ry * 0.34} ${rx * 0.45},${-ry * 0.05} L${rx * 0.75},${-ry * 0.3} L${rx * 0.7},${ry * 0.22} L${rx * 0.45},${ry * 0.05} Q${-rx * 0.2},${ry * 0.3} ${-rx * 0.7},0Z`, { fill: '#9ab3b0', stroke: C.ink, 'stroke-width': lw }), circle(-rx * 0.45, -ry * 0.03, 4, { fill: C.ink }), path(`M${-rx * 0.2},${-ry * 0.15} q6,12 0,26`, { fill: 'none', stroke: C.ink, 'stroke-width': lw * 0.7 })); } };
// the aristocrat with the perfectly normal nose (relays the message in Ep 15)
export const aristocrat = { ...makeExtra(1503, { old: false, female: false, hairStyle: 'neat', robe: '#243352' }), name: 'aristocrat',
  outfit: { top: '#243352', robe: true, robeColor: '#243352', robeLen: 1.0, wideSleeves: true, cuffW: 1.8, legs: '#1a1a22', shoes: '#1a1010', robeTrim: '#e7bb4f', collar: '#fbf7ec' },
  facialHair: ({ rx, ry, s, lw, F, mz }) => path(`M${mz.x - 20},${F.mouthY - 6} Q${mz.x - 30},${F.mouthY - 18} ${mz.x - 40},${F.mouthY - 12} M${mz.x + 20},${F.mouthY - 6} Q${mz.x + 30},${F.mouthY - 18} ${mz.x + 40},${F.mouthY - 12}`, { fill: 'none', stroke: '#3a2a1a', 'stroke-width': lw * 1.6, 'stroke-linecap': 'round' }) };

// ---------- the dojo (Ep 22, sepia flashback): the old Master; students in white
export const master = { ...makeExtra(1601, { old: true, female: false, hairStyle: 'bald', outfit: { top: '#efe6d2', legs: '#efe6d2', shoes: '#efe6d2', collar: '#efe6d2', belt: '#1b1310' } }), name: 'master', skin: '#e2b893', skinShade: '#c08c68' };
master.facialHair = ({ rx, ry, s, lw, F, mz }) => path(smoothD([[mz.x - 14, F.mouthY + 8], [mz.x - 8, ry * 1.5], [mz.x, ry * 1.8], [mz.x + 8, ry * 1.5], [mz.x + 14, F.mouthY + 8]], false, 0.4), { fill: '#ecebe4', stroke: C.ink, 'stroke-width': lw * 0.8 });
export const dojoStudent = (seed) => ({ ...makeExtra(1610 + seed, { kid: false, old: false, female: seed % 3 === 0, outfit: { top: '#f3ecdc', legs: '#f3ecdc', shoes: '#e9dfc8', collar: '#f3ecdc' } }), name: 'dojo' + seed });
export const youngQuirrell = { ...quirrell, name: 'quirrell', outfit: { top: '#f3ecdc', legs: '#f3ecdc', shoes: '#e9dfc8', collar: '#f3ecdc' } };
export { student };
// Harry in pyjamas (blue, pinstriped) for the Game morning
export const harryPJ = { ...harryRaven, name: 'harry', outfit: { top: '#6f8cb6', legs: '#6f8cb6', shoes: '#e9dfc8', collar: '#dfe8f2', pattern: 'pinstripe', ribbed: false } };
