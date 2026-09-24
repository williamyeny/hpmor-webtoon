// Book Two: Hogwarts from the inside. The Ravenclaw dorm (and the trunk's cavern level), corridors &
// moving staircases, portraits, the green study room, McGonagall's office, and the Charms and
// Transfiguration classrooms. World coords like every location: floor line at y = FLOOR (900),
// walls rising above it, usable width about -200…2600.
import { C } from '../core/palette.js';
import { g, path, rect, circle, ellipse, line, polygon, text, smoothD, rng, shade, mixHex, uid, r2 } from '../core/svg.js';
import * as K from './kit.js';
const bl = K.bl;
export const FLOOR = 900;
export const HOUSE = { g: '#9a2a2a', s: '#2f5a40', r: '#2f4f86', h: '#d6a33a' };
const RAV = '#2f4f86', RAV_D = '#1d3257', BRONZE = '#b0713b';

// ---------------------------------------------------------------- shared bits
// a tall gothic window (pointed arch) with a sky; o.sky 'day' | 'dusk' | 'night' | 'high' (clouds below)
export function archWindow(x, y, w, h, o = {}) {
  const id = uid('aw');
  const skies = { day: ['#9fb6c9', '#dfe6e3'], dusk: ['#3a3a6a', '#e8a86a'], night: ['#0c1428', '#27365c'], high: ['#7fa0c4', '#e9eef0'], rain: ['#5f6f7e', '#9aa6ad'] };
  const [a, b] = skies[o.sky || 'day'];
  const arch = `M${x},${y + h} L${x},${y + w * 0.5} Q${x},${y} ${x + w / 2},${y - w * 0.18} Q${x + w},${y} ${x + w},${y + w * 0.5} L${x + w},${y + h}Z`;
  let out = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><clipPath id="${id}c"><path d="${arch}"/></clipPath></defs>`;
  out += path(arch, { fill: shade(C.stone, -0.1), transform: `translate(${-w * 0.08},${-w * 0.06}) scale(1)`, ...bl(2) });
  out += path(arch, { fill: `url(#${id})`, ...bl(2.2) });
  let view = '';
  const R = rng(o.seed || x | 0);
  if (o.sky === 'high') for (let i = 0; i < 6; i++) view += ellipse(x + R() * w, y + h * R.range(0.55, 0.95), R.range(40, 90), R.range(12, 22), { fill: '#fbfbf7', opacity: 0.9 });
  else if (o.sky === 'night') for (let i = 0; i < 18; i++) view += circle(x + R() * w, y + R() * h * 0.8, R.range(0.8, 2), { fill: '#f3f0d8', opacity: R.range(0.5, 1) });
  else if (o.sky !== 'dusk') { for (let i = 0; i < 3; i++) view += ellipse(x + R() * w, y + h * R.range(0.15, 0.5), R.range(30, 60), R.range(8, 14), { fill: '#fff', opacity: 0.6 }); view += path(`M${x - 10},${y + h} L${x - 10},${y + h * 0.8} Q${x + w * 0.3},${y + h * 0.7} ${x + w * 0.6},${y + h * 0.78} Q${x + w * 0.85},${y + h * 0.72} ${x + w + 10},${y + h * 0.8} L${x + w + 10},${y + h}Z`, { fill: '#5d7a5a', opacity: 0.8 }); }
  if (o.rain) view += K.rainOverlay(w, h, 7, 1.2, 0.55).replace(/<line /g, `<line transform="translate(${x},${y})" `);
  out += g({ 'clip-path': `url(#${id}c)` }, view);
  // leading
  out += line(x + w / 2, y - w * 0.18, x + w / 2, y + h, bl(3)) + line(x, y + h * 0.45, x + w, y + h * 0.45, bl(2.4));
  for (let k = 1; k < 4; k++) out += line(x, y + w * 0.5 + (h - w * 0.5) * k / 4, x + w, y + w * 0.5 + (h - w * 0.5) * k / 4, bl(1, { opacity: 0.5 }));
  out += rect(x - 14, y + h, w + 28, 18, { fill: C.stoneLight, ...bl(2) });
  return out;
}
// wall torch in an iron bracket
export function torch(x, y, s = 1, lit = true) {
  return g({ transform: `translate(${x},${y}) scale(${s})` },
    lit ? K.glow(0, -60, 170, C.candle, 0.5) : '',
    path('M-14,0 L14,0 L8,20 L-8,20Z', { fill: '#3a3230', ...bl(1.6) }), line(0, 20, 0, 60, { stroke: '#3a3230', 'stroke-width': 6 }), path('M-10,60 l20,0', { stroke: '#3a3230', 'stroke-width': 8 }),
    rect(-8, -40, 16, 42, { fill: '#6b4429', ...bl(1.4) }),
    lit ? path('M0,-86 Q16,-62 8,-44 Q0,-38 -8,-44 Q-16,-62 0,-86Z', { fill: '#f0a13c', stroke: '#c9601f', 'stroke-width': 1.4 }) + path('M0,-70 Q7,-56 3,-46 L-3,-46 Q-7,-56 0,-70Z', { fill: '#ffe08a' }) : '');
}
// four-poster bed, seen from the front-ish. x = centre, y = floor. o.col curtains, o.made, o.blanket (false to omit front blanket)
export function fourPoster(x, y, o = {}) {
  const col = o.col || RAV, w = o.w || 360, s = o.s || 1;
  const R = rng(o.seed || (x | 0));
  let out = '';
  const top = y - 620 * s;
  // posts + canopy
  out += rect(x - w / 2 - 12, top, 22, y - top, { fill: C.woodDark, ...bl(1.8) }) + rect(x + w / 2 - 10, top, 22, y - top, { fill: C.woodDark, ...bl(1.8) });
  out += rect(x - w / 2 - 24, top - 20, w + 48, 44, { fill: C.wood, ...bl(2) });
  // curtains (tied back)
  out += path(`M${x - w / 2 + 10},${top + 24} Q${x - w / 2 + 70},${top + 200} ${x - w / 2 + 30},${y - 260 * s} Q${x - w / 2 + 10},${top + 300} ${x - w / 2 + 10},${top + 24}Z`, { fill: col, ...bl(1.8) });
  out += path(`M${x + w / 2 - 10},${top + 24} Q${x + w / 2 - 70},${top + 200} ${x + w / 2 - 30},${y - 260 * s} Q${x + w / 2 - 10},${top + 300} ${x + w / 2 - 10},${top + 24}Z`, { fill: col, ...bl(1.8) });
  out += path(`M${x - w / 2 + 10},${top + 24} Q${x},${top + 70} ${x + w / 2 - 10},${top + 24}`, { fill: shade(col, -0.2), ...bl(1.6) });
  // headboard (with the Quieter slider plate)
  out += path(`M${x - w / 2 + 12},${y - 230 * s} L${x - w / 2 + 12},${y - 400 * s} Q${x},${y - 470 * s} ${x + w / 2 - 12},${y - 400 * s} L${x + w / 2 - 12},${y - 230 * s}Z`, { fill: C.wood, ...bl(2) });
  out += quieter(x + w * 0.28, y - 360 * s, 0.9 * s, o.quiet ?? 0.3);
  if (o.note) out += g({ transform: `translate(${x - w * 0.12},${y - 380 * s}) rotate(-4)` }, rect(-34, -24, 68, 48, { fill: '#f6efdc', ...bl(1.2) }), line(-24, -10, 22, -10, { stroke: '#555', 'stroke-width': 1.4 }), line(-24, 0, 20, 0, { stroke: '#555', 'stroke-width': 1.4 }), line(-24, 10, 12, 10, { stroke: '#555', 'stroke-width': 1.4 }));
  // mattress + pillow
  out += rect(x - w / 2 + 6, y - 250 * s, w - 12, 90 * s, { fill: '#e9e0cc', ...bl(1.8), rx: 10 });
  out += ellipse(x - w * 0.12, y - 250 * s, 70 * s, 26 * s, { fill: '#f6f0e2', ...bl(1.6) });
  if (o.blanket !== false) out += bedBlanket(x, y, { ...o, R });
  // base
  out += rect(x - w / 2 - 4, y - 170 * s, w + 8, 150 * s, { fill: C.woodDark, ...bl(2) });
  return out;
}
export function bedBlanket(x, y, o = {}) {
  const col = o.col || RAV, w = o.w || 360, s = o.s || 1;
  const rumpled = o.made === false;
  const lift = o.lift ?? 0; // raise the blanket over a sitting body
  return path(`M${x - w / 2 + 2},${y - 170 * s} L${x - w / 2 + 8},${y - 250 * s - lift} ${rumpled ? `Q${x - w * 0.2},${y - 300 * s - lift} ${x},${y - 250 * s - lift} Q${x + w * 0.2},${y - 290 * s - lift} ${x + w / 2 - 8},${y - 240 * s - lift}` : `Q${x},${y - 262 * s - lift} ${x + w / 2 - 8},${y - 250 * s - lift}`} L${x + w / 2 - 2},${y - 170 * s} Q${x},${y - 150 * s} ${x - w / 2 + 2},${y - 170 * s}Z`, { fill: shade(col, 0.12), ...bl(2) }) +
    path(`M${x - w / 2 + 20},${y - 200 * s - lift * 0.6} Q${x},${y - 214 * s - lift * 0.6} ${x + w / 2 - 20},${y - 200 * s - lift * 0.6}`, { fill: 'none', stroke: BRONZE, 'stroke-width': 5 });
}
// the Quietus slider on the headboard (level 0..1)
export function quieter(x, y, s = 1, level = 0.3) {
  return g({ transform: `translate(${x},${y}) scale(${s})` }, rect(-18, -46, 36, 92, { fill: '#c9a24a', ...bl(1.6), rx: 6 }), line(0, -34, 0, 34, { stroke: '#5a3a1a', 'stroke-width': 5, 'stroke-linecap': 'round' }),
    rect(-13, 34 - 68 * level - 7, 26, 14, { fill: '#e9e6de', ...bl(1.4), rx: 3 }), text(0, -52, 'QUIET', { 'font-family': 'IM Fell English SC', 'font-size': 11, 'text-anchor': 'middle', fill: '#5a3a1a' }));
}
export function nightstand(x, y, o = {}) {
  let out = rect(x - 60, y - 150, 120, 150, { fill: C.wood, ...bl(2) }) + rect(x - 52, y - 110, 104, 50, { fill: shade(C.wood, -0.15), ...bl(1.4) }) + circle(x, y - 85, 5, { fill: '#c9a24a' });
  if (o.clock !== false) out += alarmClock(x - 12, y - 150, 1, o.time || [1, 0]);
  if (o.candle) out += K.candle(x + 36, y - 150, 0.9, o.candle !== 'out');
  return out;
}
// a Muggle mechanical alarm clock with bells. t = [h, m]
export function alarmClock(x, y, s = 1, t = [7, 0], o = {}) {
  const [h, m] = t; const ah = ((h % 12) + m / 60) / 12 * Math.PI * 2, am = m / 60 * Math.PI * 2;
  return g({ transform: `translate(${x},${y}) scale(${s})` },
    circle(-22, -70, 14, { fill: '#c9a24a', ...bl(1.6) }), circle(22, -70, 14, { fill: '#c9a24a', ...bl(1.6) }), line(-26, -8, -36, 0, { stroke: '#5a4a3a', 'stroke-width': 5 }), line(26, -8, 36, 0, { stroke: '#5a4a3a', 'stroke-width': 5 }),
    circle(0, -38, 32, { fill: '#9a2a2a', ...bl(1.8) }), circle(0, -38, 25, { fill: '#f6efdc', ...bl(1.2) }),
    line(0, -38, Math.sin(ah) * 14, -38 - Math.cos(ah) * 14, { stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' }), line(0, -38, Math.sin(am) * 20, -38 - Math.cos(am) * 20, { stroke: C.ink, 'stroke-width': 2, 'stroke-linecap': 'round' }),
    o.off ? path('M-8,-80 l16,0', { stroke: '#555', 'stroke-width': 2 }) : '');
}

// ---------------------------------------------------------------- the Ravenclaw first-year boys' dormitory (tower room)
// o.time 'night' | 'morning' | 'late'; o.empty: other beds unmade & empty; o.harryNote; o.quiet level on Harry's bed
export function ravenclawDorm(o = {}) {
  const R = rng(41);
  const sky = o.time === 'night' ? 'night' : 'day';
  let out = rect(-400, -600, 3400, 1800, { fill: '#2a3448' });
  out += K.stoneWall(-400, -600, 3400, 1500, '#8a8f98', 44, { bh: 58 });
  out += rect(-400, -600, 3400, 1500, { fill: o.time === 'night' ? '#0c1428' : '#4a6a9a', opacity: o.time === 'night' ? 0.45 : 0.12 });
  // tall windows between the beds
  for (const wx of [-260, 440, 1140, 1840, 2540]) out += archWindow(wx, -300, 180, 480, { sky, seed: wx + 3 });
  // blue-and-bronze hangings high on the wall
  for (let x = -300; x < 2900; x += 700) out += path(`M${x},-560 L${x + 140},-560 L${x + 140},-300 L${x + 70},-340 L${x},-300Z`, { fill: RAV, ...bl(1.6) }) + path(`M${x + 50},-480 l20,-30 l20,30 l-20,10Z`, { fill: BRONZE });
  // floor
  out += rect(-400, FLOOR - 20, 3400, 700, { fill: '#6b5540' }) + K.floorboards(-400, FLOOR - 20, 3400, 700, '#7a6048', 8);
  out += K.rug(1100, FLOOR + 150, 1100, 160, RAV);
  // beds: harry's at x=1100; others either side
  const beds = [-120, 560, 1100, 1640, 2320];
  beds.forEach((bx, i) => {
    const mine = bx === 1100;
    out += fourPoster(bx, FLOOR, { seed: 50 + i, made: mine ? o.harryMade : (o.empty ? false : true), quiet: mine ? (o.quiet ?? 0.3) : R.range(0.1, 0.6), note: mine && o.harryNote, blanket: mine ? o.harryBlanket !== false : true });
    if (!mine) out += trunkBox(bx + 180, FLOOR + 20, 0.8, R.pick([C.leather, C.brown, '#5a3a2a']));
  });
  out += nightstand(1360, FLOOR, { time: o.clock || (o.time === 'night' ? [1, 0] : [9, 52]), candle: o.time === 'night' ? true : false });
  if (o.time === 'late' || o.time === 'morning') out += K.lightShaft(1230, -160, 120, 1500, FLOOR + 80, 360, '#fff2c8', 0.18) + K.lightShaft(530, -160, 120, 800, FLOOR + 80, 360, '#fff2c8', 0.12) + K.dustMotes(600, 0, 1000, 800, 40, 7);
  // Harry's trunk (with its cavern level) at the foot of his bed
  out += trunkBox(1100, FLOOR + 110, 1, '#7a4e2e');
  // the cabinet by his bed & the rubbish bin (fair-play clue lives here)
  out += cabinet(1560, FLOOR) + bin(820, FLOOR + 30, o.binClue !== false);
  return out;
}
export const dormBlanket = (o = {}) => bedBlanket(1100, FLOOR, { made: o.made ?? true, lift: o.lift ?? 60 });
export function trunkBox(x, y, s = 1, col = '#7a4e2e') {
  return g({ transform: `translate(${x},${y}) scale(${s})` }, rect(-120, -110, 240, 110, { fill: col, ...bl(2), rx: 6 }), rect(-120, -120, 240, 26, { fill: shade(col, 0.12), ...bl(2), rx: 6 }), rect(-126, -60, 252, 12, { fill: '#c9a24a', ...bl(1.4) }), rect(-14, -84, 28, 30, { fill: '#c9a24a', ...bl(1.4) }), circle(0, -70, 5, { fill: '#5a3a1a' }));
}
export function cabinet(x, y) {
  return rect(x - 80, y - 330, 160, 330, { fill: C.wood, ...bl(2) }) + rect(x - 68, y - 318, 66, 190, { fill: shade(C.wood, -0.12), ...bl(1.4) }) + rect(x + 2, y - 318, 66, 190, { fill: shade(C.wood, -0.12), ...bl(1.4) }) +
    rect(x - 68, y - 116, 136, 50, { fill: shade(C.wood, -0.1), ...bl(1.4) }) + rect(x - 68, y - 60, 136, 50, { fill: shade(C.wood, -0.1), ...bl(1.4) }) + circle(x, y - 90, 5, { fill: '#c9a24a' }) + circle(x, y - 34, 5, { fill: '#c9a24a' }) + circle(x - 10, y - 220, 5, { fill: '#c9a24a' }) + circle(x + 10, y - 220, 5, { fill: '#c9a24a' });
}
// rubbish bin; clue = a crumpled envelope + red-and-green wrapping paper sticking out of the top
export function bin(x, y, clue = true) {
  let out = path(`M${x - 44},${y - 100} L${x + 44},${y - 100} L${x + 36},${y} L${x - 36},${y}Z`, { fill: '#6a6a70', ...bl(1.8) }) + line(x - 30, y - 90, x - 26, y - 6, bl(1, { opacity: 0.5 })) + line(x, y - 90, x, y - 6, bl(1, { opacity: 0.5 })) + line(x + 30, y - 90, x + 26, y - 6, bl(1, { opacity: 0.5 }));
  if (clue) out = path(`M${x - 30},${y - 96} q10,-40 34,-30 q14,-26 30,4 l-8,26Z`, { fill: '#b8262e', ...bl(1.4) }) + path(`M${x - 18},${y - 116} l10,20 M${x + 4},${y - 124} l6,24 M${x + 20},${y - 118} l-2,22`, { stroke: '#2f6a3a', 'stroke-width': 5 }) + path(`M${x - 36},${y - 98} l20,-30 l22,10 l-6,22Z`, { fill: '#efe3c4', ...bl(1.2) }) + out;
  return out;
}
// inside the trunk: the "cavern level" — a small panelled room reached by steps, crowded with boxes of books
export function trunkCavern(o = {}) {
  let out = rect(-400, -600, 3400, 1800, { fill: '#3a2618' });
  out += K.wainscot(-400, -500, 3400, 1400, '#6b4429');
  out += rect(-400, -600, 3400, 180, { fill: '#2a1a10' });
  for (let i = 0; i < 12; i++) out += line(-400 + i * 300, -600, -400 + i * 300, -420, bl(1.4));
  // steps up to the lid
  for (let k = 0; k < 8; k++) out += rect(1500 + k * 60, FLOOR - (k + 1) * 70, 260, 18, { fill: C.woodLight, ...bl(1.6) }) + rect(1500 + k * 60, FLOOR - (k + 1) * 70 + 18, 20, (k + 1) * 70 - 18, { fill: C.woodDark });
  out += rect(1860, -500, 360, 60, { fill: '#e9d9a8', opacity: 0.8, ...bl(1.4) }) + K.lightShaft(2040, -440, 300, 1900, FLOOR, 500, '#fff2c8', 0.16);
  // boxes of books
  const R = rng(66);
  for (let i = 0; i < 9; i++) { const x = -200 + i * 170 + R.range(-20, 20), hh = R.range(90, 150); const y = FLOOR - (i % 3 === 1 ? hh : 0); out += rect(x, y - hh, 150, hh, { fill: '#b08a5a', ...bl(1.8) }) + path(`M${x},${y - hh} l75,-20 l75,20`, { fill: 'none', ...bl(1.4) }) + text(x + 75, y - hh / 2 + 8, R.pick(['BOOKS', 'PHYSICS', 'MISC', 'SF', 'MATHS']), { 'font-family': 'Caveat', 'font-size': 26, 'text-anchor': 'middle', fill: '#4a3a2e' }); }
  out += K.lamp(1200, FLOOR - 10, 380) + K.table(900, FLOOR, 300, 180, C.wood);
  out += rect(-400, FLOOR, 3400, 400, { fill: '#5a3a24' }) + K.floorboards(-400, FLOOR, 3400, 400, '#6b4429', 12);
  return out;
}

// ---------------------------------------------------------------- corridors
// o.portraits: [{x, w, h, fn(x,y,w,h) → svg}] ; o.rubble: cave-in at the far end ; o.dir 'day'|'dim'
export function corridor(o = {}) {
  const R = rng(o.seed || 71);
  let out = rect(-400, -700, 3400, 1900, { fill: '#3a3530' });
  out += K.stoneWall(-400, -700, 3400, 1600, '#948b7c', o.seed || 71, { bh: 62 });
  // vaulted ceiling ribs
  for (let x = -300; x < 3000; x += 520) out += path(`M${x},-700 Q${x + 260},-560 ${x + 520},-700`, { fill: 'none', stroke: '#6a6258', 'stroke-width': 18 });
  for (const x of o.windows || [260, 1300, 2340]) out += archWindow(x, -380, 200, 520, { sky: o.sky || 'day', seed: x });
  for (const x of o.torches || [780, 1820]) out += torch(x, -60, 1, o.dim !== false);
  for (const p of o.portraits || []) out += portraitFrame(p.x, p.y ?? -330, p.w ?? 240, p.h ?? 320, p.fn ? p.fn(p.x, p.y ?? -330, p.w ?? 240, p.h ?? 320) : '', p.gilt);
  if (o.rubble) { for (let i = 0; i < 40; i++) { const x = 1700 + R.range(-500, 500), y = FLOOR + R.range(-420, 0) * (1 - Math.abs(x - 1700) / 600); out += path(`M${x - 50},${y} l${R.range(10, 30)},${-R.range(40, 80)} l${R.range(40, 70)},${-R.range(0, 20)} l${R.range(20, 40)},${R.range(40, 70)}Z`, { fill: R.pick(['#8e897c', '#7a7468', '#a09888']), ...bl(1.6) }); } }
  out += rect(-400, FLOOR - 10, 3400, 600, { fill: '#6e665a' });
  for (let x = -400; x < 3000; x += 160) out += line(x, FLOOR - 10, x - 60, FLOOR + 600, bl(1.2, { opacity: 0.4 }));
  out += line(-400, FLOOR + 90, 3000, FLOOR + 90, bl(1.2, { opacity: 0.4 })) + line(-400, FLOOR + 240, 3000, FLOOR + 240, bl(1.2, { opacity: 0.4 }));
  return out;
}
// a gilt portrait frame with an arbitrary painted scene inside (content in world coords)
export function portraitFrame(x, y, w, h, content = '', gilt = '#c9a24a') {
  const id = uid('pf');
  return rect(x - 22, y - 22, w + 44, h + 44, { fill: gilt, ...bl(2) }) + rect(x - 12, y - 12, w + 24, h + 24, { fill: shade(gilt, -0.25), ...bl(1.2) }) +
    `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>` + rect(x, y, w, h, { fill: '#4a4a3a' }) + g({ 'clip-path': `url(#${id})` }, content) +
    rect(x, y, w, h, { fill: 'none', ...bl(1.6) }) + rect(x, y, w, h, { fill: '#d8c090', opacity: 0.08, filter: 'url(#grain)' });
}
// moving staircases: a deep shaft of criss-crossing flights, with one flight swinging (o.swing)
export function staircases(o = {}) {
  const R = rng(o.seed || 83);
  const id = uid('sh');
  let out = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2622"/><stop offset="0.5" stop-color="#5a5044"/><stop offset="1" stop-color="#1a1714"/></linearGradient></defs>`;
  out += rect(-600, -1200, 3600, 3000, { fill: `url(#${id})` });
  // walls of portraits receding up and down
  for (let row = -6; row < 8; row++) for (let c = 0; c < 9; c++) { const x = -500 + c * 380 + (row % 2) * 120, y = row * 260; out += rect(x, y, R.range(70, 130), R.range(90, 160), { fill: R.pick(['#5a4a3a', '#4a5a4a', '#3a4a5a', '#6a5040']), stroke: '#b08d45', 'stroke-width': 5, opacity: 0.55 + (row > 0 && row < 4 ? 0.3 : 0) }); }
  // flights of stairs at various angles and depths
  const flight = (x, y, len, ang, dep) => { const s = 0.5 + dep * 0.6; let f = ''; const n = 12; for (let k = 0; k < n; k++) f += rect(k * 30, -k * 22, 34, 22, { fill: shade('#9a8a70', -0.3 * (1 - dep)), ...bl(1.2 * s) }); f += path(`M0,22 L${n * 30},${-n * 22 + 22} L${n * 30},${-n * 22 + 70} L0,70Z`, { fill: shade('#6a5a48', -0.3 * (1 - dep)), ...bl(1.4) }); f += line(0, -30, n * 30, -n * 22 - 30, { stroke: '#4a3a2a', 'stroke-width': 6 }); return g({ transform: `translate(${x},${y}) rotate(${ang}) scale(${s * len})`, opacity: 0.45 + dep * 0.55 }, f); };
  const fl = o.flights || [[-300, 200, 1, -8, 0.3], [700, -300, 1.1, 12, 0.2], [1600, 600, 1, -20, 0.4], [200, 1100, 1.2, 4, 0.5], [1300, -700, 0.9, -4, 0.2], [2000, 1000, 1, 18, 0.35]];
  for (const f of fl) out += flight(...f);
  if (o.swing) out += flight(...o.swing) + path(`M${o.swing[0] + 200},${o.swing[1] - 200} q80,-40 160,0`, { fill: 'none', stroke: '#f1e6cc', 'stroke-width': 4, 'stroke-dasharray': '10 8', opacity: 0.7 });
  // landing where the actors stand (y = FLOOR)
  out += rect(o.landX ?? 600, FLOOR - 10, o.landW ?? 900, 60, { fill: '#8a7a62', ...bl(2) }) + rect(o.landX ?? 600, FLOOR + 50, o.landW ?? 900, 260, { fill: '#5a4a3a', ...bl(1.6) });
  out += line((o.landX ?? 600), FLOOR - 110, (o.landX ?? 600) + (o.landW ?? 900), FLOOR - 110, { stroke: '#4a3a2a', 'stroke-width': 8 });
  for (let k = 0; k <= 8; k++) out += line((o.landX ?? 600) + k * (o.landW ?? 900) / 8, FLOOR - 110, (o.landX ?? 600) + k * (o.landW ?? 900) / 8, FLOOR - 10, { stroke: '#4a3a2a', 'stroke-width': 4 });
  for (const [x, y] of [[-100, -300], [1900, -100], [900, 1400]]) out += torch(x, y, 0.8);
  return out;
}

// ---------------------------------------------------------------- the green study room: dragon stained glass, deep chairs, low tables, shelves
export function greenStudy(o = {}) {
  let out = rect(-400, -600, 3400, 1800, { fill: '#2c3a2a' });
  out += K.wallpaper ? K.wallpaper(-400, -600, 3400, 1500, '#35503c', { stripe: true }) : '';
  out += K.wainscot(-400, 420, 3400, 480, '#4a3422');
  for (const wx of [100, 900, 1700]) out += dragonGlass(wx, -420, 300, 700, wx);
  out += K.lightShaft(250, 280, 300, 400, FLOOR + 100, 700, '#b9e3a8', 0.16) + K.lightShaft(1050, 280, 300, 1200, FLOOR + 100, 700, '#b9e3a8', 0.16) + K.lightShaft(1850, 280, 300, 2000, FLOOR + 100, 700, '#b9e3a8', 0.16);
  out += K.bookcase(2250, -300, 420, 1200, 91, { wood: '#5a3a24' });
  out += rect(-400, FLOOR, 3400, 500, { fill: '#5a4030' }) + K.rug(1000, FLOOR + 140, 1400, 180, C.forest);
  out += K.armchair(300, FLOOR + 40, 1.2, C.forest) + K.armchair(1500, FLOOR + 40, 1.2, C.forestLight) + K.table(900, FLOOR + 60, 380, 170, C.wood);
  return out;
}
function dragonGlass(x, y, w, h, seed) {
  const R = rng(seed); const id = uid('dg');
  const arch = `M${x},${y + h} L${x},${y + w * 0.5} Q${x},${y} ${x + w / 2},${y - w * 0.2} Q${x + w},${y} ${x + w},${y + w * 0.5} L${x + w},${y + h}Z`;
  let out = `<defs><clipPath id="${id}"><path d="${arch}"/></clipPath></defs>` + path(arch, { fill: '#7fb07a', ...bl(3) });
  let glass = '';
  for (let i = 0; i < 26; i++) glass += polygon([[x + R() * w, y + R() * h], [x + R() * w, y + R() * h], [x + R() * w, y + R() * h]], { fill: R.pick(['#9ccf8a', '#6fa86a', '#c9e3a0', '#4f8a5a', '#e3d58a']), stroke: '#1d2a1a', 'stroke-width': 3, opacity: 0.9 });
  // a calm pastoral dragon, curled on a hill
  glass += path(`M${x + w * 0.1},${y + h * 0.82} Q${x + w * 0.5},${y + h * 0.68} ${x + w * 0.9},${y + h * 0.84} L${x + w},${y + h} L${x},${y + h}Z`, { fill: '#3f7a4a', stroke: '#1d2a1a', 'stroke-width': 4 });
  glass += path(`M${x + w * 0.2},${y + h * 0.74} Q${x + w * 0.35},${y + h * 0.55} ${x + w * 0.55},${y + h * 0.62} Q${x + w * 0.7},${y + h * 0.5} ${x + w * 0.78},${y + h * 0.56} Q${x + w * 0.72},${y + h * 0.62} ${x + w * 0.62},${y + h * 0.68} Q${x + w * 0.5},${y + h * 0.76} ${x + w * 0.2},${y + h * 0.74}Z`, { fill: '#b8d86a', stroke: '#1d2a1a', 'stroke-width': 4 });
  glass += path(`M${x + w * 0.42},${y + h * 0.6} l${w * 0.06},${-h * 0.12} l${w * 0.08},${h * 0.1}Z`, { fill: '#e3a64a', stroke: '#1d2a1a', 'stroke-width': 3 });
  glass += circle(x + w * 0.74, y + h * 0.55, 4, { fill: '#1d2a1a' });
  out += g({ 'clip-path': `url(#${id})` }, glass) + path(arch, { fill: 'none', stroke: '#1d2a1a', 'stroke-width': 6 });
  return out;
}

// ---------------------------------------------------------------- McGonagall's office: tidy, a wall of cubbyholes, one parchment on the desk, a locked back door
export function mcgonagallOffice(o = {}) {
  const R = rng(97);
  let out = rect(-400, -600, 3400, 1800, { fill: '#3a2a22' });
  out += K.stoneWall(-400, -600, 3400, 1500, '#8e8474', 97, { bh: 60 });
  out += rect(-400, -600, 3400, 1500, { fill: '#3a1a10', opacity: 0.18 });
  // tartan hanging
  out += tartan(-250, -460, 260, 700);
  // the wall of cubbyholes
  const cx = 250, cy = -420, cw = 900, ch = 1000;
  out += rect(cx - 16, cy - 16, cw + 32, ch + 32, { fill: C.woodDark, ...bl(2.2) });
  let yy = cy;
  while (yy < cy + ch - 10) { const rh = R.range(70, 130); let xx = cx; while (xx < cx + cw - 10) { const ww = Math.min(R.range(70, 150), cx + cw - xx); out += rect(xx, yy, ww, rh, { fill: '#2a1a10', ...bl(1.4) }); const n = R.int(0, 4); for (let k = 0; k < n; k++) { const sx = xx + 10 + k * (ww - 20) / Math.max(n, 1); out += ellipse(sx + 8, yy + rh - 16, 9, 9, { fill: '#e9dcbc', ...bl(1) }) + rect(sx, yy + rh - 25, R.range(ww * 0.3, ww * 0.7), 18, { fill: '#e2d3ae', ...bl(1), transform: `rotate(${R.range(-6, 6)} ${sx} ${yy + rh - 16})` }); } xx += ww; } yy += rh; }
  // locked back door with several locks
  out += K.door(1500, 60, 280, FLOOR - 60, '#4a2e1b');
  for (let k = 0; k < 4; k++) out += rect(1740, 280 + k * 90, 26, 40, { fill: '#b08d45', ...bl(1.4), rx: 4 }) + circle(1753, 300 + k * 90, 4, { fill: '#3a2a18' });
  // window
  out += archWindow(2050, -340, 260, 640, { sky: o.sky || 'day', seed: 7 });
  out += rect(-400, FLOOR, 3400, 500, { fill: '#5a3a26' }) + K.floorboards(-400, FLOOR, 3400, 500, '#6b4429', 21);
  out += K.rug(1000, FLOOR + 120, 1200, 160, C.forest);
  return out;
}
// her desk (fg): clean, one parchment. x = centre, y = floor
export function mcgDesk(x = 1000, y = FLOOR + 40, o = {}) {
  let out = rect(x - 330, y - 300, 660, 40, { fill: C.wood, ...bl(2.2), rx: 4 }) + rect(x - 310, y - 260, 620, 300, { fill: C.woodDark, ...bl(2) });
  out += rect(x - 290, y - 240, 180, 110, { fill: shade(C.woodDark, 0.1), ...bl(1.4) }) + rect(x + 110, y - 240, 180, 110, { fill: shade(C.woodDark, 0.1), ...bl(1.4) });
  if (o.parchment !== false) out += g({ transform: `translate(${x + 60},${y - 304}) rotate(-3)` }, path('M-70,0 L70,0 L64,-10 L-64,-10Z', { fill: '#efe3c4', ...bl(1.2) }));
  if (o.inkwell !== false) out += rect(x - 200, y - 330, 30, 30, { fill: '#2a2a3a', ...bl(1.2), rx: 6 }) + line(x - 186, y - 330, x - 160, y - 390, { stroke: '#e9e2d0', 'stroke-width': 4 });
  return out;
}
export function tartan(x, y, w, h) {
  const id = uid('tt');
  return `<defs><pattern id="${id}" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#2f5a40"/><rect width="60" height="16" y="22" fill="#7b2433" opacity="0.85"/><rect width="16" height="60" x="22" fill="#7b2433" opacity="0.6"/><rect width="60" height="3" y="29" fill="#e7bb4f" opacity="0.8"/><rect width="3" height="60" x="29" fill="#e7bb4f" opacity="0.6"/><rect width="60" height="6" y="4" fill="#141d33" opacity="0.6"/></pattern></defs>` +
    path(`M${x},${y} L${x + w},${y} L${x + w},${y + h} L${x + w / 2},${y + h - 60} L${x},${y + h}Z`, { fill: `url(#${id})`, ...bl(2) });
}

// ---------------------------------------------------------------- classrooms
// generic classroom: stone room, big windows, rows of desks seen from the front (fg rows supplied separately)
export function classroom(o = {}) {
  let out = rect(-400, -600, 3400, 1800, { fill: '#3a3228' });
  out += K.stoneWall(-400, -600, 3400, 1500, o.wall || '#958c7d', o.seed || 111, { bh: 60 });
  for (const x of o.windows || [-200, 2300]) out += archWindow(x, -380, 240, 700, { sky: o.sky || 'day', seed: x + 1 });
  if (o.board) out += blackboard(o.board.x ?? 700, o.board.y ?? -250, o.board.w ?? 1000, o.board.h ?? 520, o.board);
  if (o.shelves) out += K.bookcase(1900, -300, 360, 1200, 121, { wood: '#5a3a24' });
  out += rect(-400, FLOOR, 3400, 500, { fill: '#6a5846' }) + K.floorboards(-400, FLOOR, 3400, 500, '#7a6048', 31);
  return out;
}
// polished wooden board; lines: [{t, x, y, size, col, underline}]
export function blackboard(x, y, w, h, o = {}) {
  let out = rect(x - 18, y - 18, w + 36, h + 36, { fill: C.woodDark, ...bl(2.2) }) + rect(x, y, w, h, { fill: o.col || '#b89a6a', ...bl(1.6) });
  out += rect(x, y, w, h, { fill: '#fff', opacity: 0.06 }) + path(`M${x + 20},${y + 30} L${x + w * 0.4},${y + 10}`, { stroke: '#fff', 'stroke-width': 10, opacity: 0.08 });
  for (const L of o.lines || []) {
    out += text(x + (L.x ?? w / 2), y + (L.y ?? h / 2), L.t, { 'font-family': L.font || 'Caveat', 'font-weight': 700, 'font-size': L.size || 64, 'text-anchor': L.anchor || 'middle', fill: L.col || '#9a1f1f' });
    if (L.underline) out += path(`M${x + (L.x ?? w / 2) - L.underline / 2},${y + (L.y ?? h / 2) + 14} q${L.underline / 2},10 ${L.underline},-4`, { fill: 'none', stroke: L.ucol || '#1f3a8a', 'stroke-width': 6, 'stroke-linecap': 'round' });
  }
  out += rect(x, y + h, w, 16, { fill: C.wood, ...bl(1.4) });
  return out;
}
// a row of student desks across the frame (fg), at floor y; o.items: [{x, fn}]
export function deskRow(y, o = {}) {
  const x0 = o.x0 ?? -300, x1 = o.x1 ?? 2700, h = o.h ?? 260;
  let out = rect(x0, y - h, x1 - x0, 34, { fill: C.woodLight, ...bl(2) }) + rect(x0 + 10, y - h + 34, x1 - x0 - 20, h - 34, { fill: C.wood, ...bl(2) });
  for (let x = x0 + 200; x < x1; x += o.gap || 420) out += line(x, y - h + 40, x, y, bl(1.6, { opacity: 0.6 }));
  for (const it of o.items || []) out += it.fn(it.x, y - h);
  return out;
}
// a glass of water on a desk; state: 'warm' | 'cool' | 'ice'
export function waterGlass(x, y, s = 1, state = 'warm') {
  const water = state === 'ice' ? '#dcebf5' : state === 'cool' ? '#b9d8ea' : '#cfe2ec';
  let out = path(`M${x - 24 * s},${y - 90 * s} L${x + 24 * s},${y - 90 * s} L${x + 19 * s},${y} L${x - 19 * s},${y}Z`, { fill: '#eef6fa', opacity: 0.55, ...bl(1.6) });
  out += path(`M${x - 22 * s},${y - 64 * s} L${x + 22 * s},${y - 64 * s} L${x + 19 * s},${y - 2 * s} L${x - 19 * s},${y - 2 * s}Z`, { fill: water, opacity: 0.9 });
  if (state === 'ice') { out += path(`M${x - 22 * s},${y - 64 * s} l8,-10 l6,8 l8,-12 l6,10 l8,-8 l8,12`, { fill: 'none', stroke: '#fff', 'stroke-width': 2.4 }); for (let k = 0; k < 6; k++) out += path(`M${x - 26 * s + k * 10 * s},${y - 92 * s} l3,-8 l3,8`, { fill: '#fff', stroke: '#9bc4e8', 'stroke-width': 1 }); out += K.glow(x, y - 50 * s, 60 * s, '#dcebf5', 0.5); }
  return out;
}
// Charms: Flitwick's room — tiered desks; his stack of books to stand on
export function charmsRoom(o = {}) {
  let out = classroom({ seed: 131, windows: [-240, 2200], sky: o.sky || 'day', shelves: true, wall: '#8e8a86' });
  out += K.bookPile(1000, FLOOR, 7, 3, 1.4);
  out += path('M300,-560 Q1000,-420 1700,-560', { fill: 'none', stroke: '#2f4f86', 'stroke-width': 30, opacity: 0.8 }) + path('M300,-560 Q1000,-420 1700,-560', { fill: 'none', stroke: BRONZE, 'stroke-width': 6, opacity: 0.8 });
  return out;
}
// Transfiguration: severe, tidy; the board; her desk front
export function transfigRoom(o = {}) {
  return classroom({ seed: 151, windows: [-260, 2240], sky: o.sky || 'day', board: o.board || { x: 600, y: -300, w: 1100, h: 560, lines: [] } }) + tartan(2000, -470, 180, 520);
}
export function teacherDesk(x = 1000, y = FLOOR + 30, o = {}) {
  return rect(x - 260, y - 290, 520, 36, { fill: C.wood, ...bl(2.2), rx: 4 }) + rect(x - 240, y - 254, 480, 254, { fill: C.woodDark, ...bl(2) }) + rect(x - 200, y - 220, 400, 160, { fill: shade(C.woodDark, 0.12), ...bl(1.4) });
}
// portraits as *world* pieces, so the painted person can be a rigged actor with anchors:
// draw portraitCanvas in bg, the actor at the same world spot, then portraitFrameOnly as fg.
export function portraitCanvas(x, y, w, h, o = {}) {
  const id = uid('pc');
  const [a, b] = o.cols || ['#4a4a3a', '#2a2a22'];
  return `<defs><radialGradient id="${id}" cx="0.5" cy="0.4" r="0.8"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient></defs>` + rect(x, y, w, h, { fill: `url(#${id})` }) + (o.drape ? path(`M${x},${y} Q${x + w * 0.3},${y + h * 0.2} ${x + w * 0.18},${y + h * 0.7} L${x},${y + h * 0.75}Z`, { fill: o.drape, opacity: 0.8 }) : '');
}
export function portraitFrameOnly(x, y, w, h, gilt = '#c9a24a', o = {}) {
  const id = uid('pfo');
  return `<defs><mask id="${id}"><rect x="${x - 60}" y="${y - 60}" width="${w + 120}" height="${h + 120}" fill="#fff"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#000"/></mask></defs>` +
    g({ mask: `url(#${id})` }, rect(x - 30, y - 30, w + 60, h + 60, { fill: gilt, ...bl(2.4) }), rect(x - 16, y - 16, w + 32, h + 32, { fill: shade(gilt, -0.28), ...bl(1.4) }),
      ...[[x - 30, y - 30], [x + w + 30, y - 30], [x - 30, y + h + 30], [x + w + 30, y + h + 30]].map(([cx, cy]) => circle(cx, cy, 20, { fill: shade(gilt, 0.1), ...bl(1.6) }))) +
    rect(x, y, w, h, { fill: '#e8c890', opacity: o.varnish ?? 0.1, style: 'mix-blend-mode:multiply' });
}
// the wall *in front of* a painted person: redraw the background with a hole where the canvas is, plus
// the gilt frame. Put it in `actors` between the painted actor and the living ones:
//   actors: [LADY, CS.wallWithHole(BG, x, y, w, h), HARRY]
export const wallWithHole = (bgFn, x, y, w, h, gilt = '#c9a24a') => () => {
  const id = uid('hole');
  return `<defs><mask id="${id}"><rect x="-2000" y="-2000" width="7000" height="5000" fill="#fff"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#000"/></mask></defs>` + g({ mask: `url(#${id})` }, bgFn()) + portraitFrameOnly(x, y, w, h, gilt);
};
// Herbology: a greenhouse — glass panes, iron ribs, potting benches crowded with odd plants
export function greenhouse(o = {}) {
  const R = rng(171);
  let out = rect(-400, -700, 3400, 1900, { fill: '#cfe0d0' });
  for (let x = -400; x < 3000; x += 180) out += line(x, -700, x, FLOOR, { stroke: '#3a4a3a', 'stroke-width': 8 });
  for (let y = -700; y < FLOOR; y += 160) out += line(-400, y, 3000, y, { stroke: '#3a4a3a', 'stroke-width': 5 });
  out += rect(-400, -700, 3400, 1600, { fill: '#fff', opacity: 0.25 });
  for (let i = 0; i < 6; i++) out += K.lightShaft(-200 + i * 520, -700, 200, -100 + i * 520, FLOOR, 400, '#fffbe0', 0.18);
  // benches with plants
  for (const bx of [-200, 700, 1600, 2400]) {
    out += rect(bx, FLOOR - 260, 600, 30, { fill: C.wood, ...bl(2) }) + rect(bx + 20, FLOOR - 230, 20, 230, { fill: C.woodDark }) + rect(bx + 560, FLOOR - 230, 20, 230, { fill: C.woodDark });
    for (let k = 0; k < 5; k++) { const px = bx + 60 + k * 110; out += path(`M${px - 30},${FLOOR - 260} L${px - 36},${FLOOR - 320} L${px + 36},${FLOOR - 320} L${px + 30},${FLOOR - 260}Z`, { fill: '#a0522d', ...bl(1.6) }); for (let l = 0; l < 6; l++) { const a = -90 + (l - 2.5) * 22 + R.range(-8, 8), L = R.range(50, 130); const ex = px + Math.cos(a * Math.PI / 180) * L, ey = FLOOR - 320 + Math.sin(a * Math.PI / 180) * L; out += path(`M${px},${FLOOR - 320} Q${(px + ex) / 2 + 14},${(FLOOR - 320 + ey) / 2} ${ex},${ey}`, { fill: 'none', stroke: R.pick(['#3f6b4c', '#5d8c63', '#7a9a3a', '#6a4a8a']), 'stroke-width': R.range(4, 9), 'stroke-linecap': 'round' }); } if (R() < 0.4) out += circle(px, FLOOR - 400, 14, { fill: R.pick(['#e2485a', '#e7bb4f', '#b07ad0']), ...bl(1.2) }); }
  }
  out += rect(-400, FLOOR, 3400, 500, { fill: '#6a5a44' });
  return out;
}
// Harry under the Invisibility Cloak: a faint shimmer in the rough shape of a boy (x = feet centre)
export function invisible(x, y, s = 1.1, o = {}) {
  const R = rng(o.seed || 3); const h = 420 * s, w = 150 * s;
  const d = `M${x - w * 0.35},${y} Q${x - w * 0.55},${y - h * 0.5} ${x - w * 0.3},${y - h * 0.78} Q${x - w * 0.45},${y - h * 1.02} ${x},${y - h * 1.05} Q${x + w * 0.45},${y - h * 1.02} ${x + w * 0.3},${y - h * 0.78} Q${x + w * 0.55},${y - h * 0.5} ${x + w * 0.35},${y}Z`;
  let out = path(d, { fill: '#ffffff', opacity: 0.07, stroke: '#dfe8f5', 'stroke-width': 3, 'stroke-dasharray': '6 10', 'stroke-opacity': 0.5 });
  for (let i = 0; i < 14; i++) out += circle(x + R.range(-w * 0.4, w * 0.4), y - R.range(0, h), R.range(1, 2.6), { fill: '#f6fbff', opacity: R.range(0.4, 0.9) });
  return out;
}

// ---------------------------------------------------------------- Defence (Battle Magic): a huge lecture hall
// view from the seats: a gigantic flat stage of white marble; on a dais of darker marble, the lone teacher's desk.
// Stage floor at y = FLOOR; desk centre x = 1000. Doors in the back wall (door 3 from the left leads to a small room).
export function defenceStage(o = {}) {
  const id = uid('ds');
  let out = rect(-800, -900, 4000, 2200, { fill: '#2e2a30' });
  out += K.stoneWall(-800, -900, 4000, 1450, '#8a8690', 211, { bh: 70 });
  out += rect(-800, -900, 4000, 1450, { fill: '#1a1428', opacity: 0.3 });
  for (let k = 0; k < 6; k++) out += path(`M${-600 + k * 700},550 L${-600 + k * 700},-500 Q${-250 + k * 700},-800 ${100 + k * 700},-500 L${100 + k * 700},550`, { fill: 'none', stroke: '#5a5660', 'stroke-width': 26 });
  for (let k = 0; k < 5; k++) out += K.door(-420 + k * 620, 250, 180, 300, '#3a2a22');
  if (o.banner !== false) out += path('M800,-760 L1200,-760 L1200,-420 L1000,-480 L800,-420Z', { fill: '#3b3242', ...bl(2) }) + text(1000, -600, 'Battle Magic', { 'font-family': 'IM Fell English SC', 'font-size': 48, 'text-anchor': 'middle', fill: '#c9b48a' });
  out += `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dcd8d0"/><stop offset="1" stop-color="#f4f1ea"/></linearGradient></defs>`;
  out += path(`M-800,550 L3200,550 L3600,${FLOOR + 400} L-1200,${FLOOR + 400}Z`, { fill: `url(#${id})`, ...bl(2) });
  for (let k = 0; k < 9; k++) out += path(`M${-600 + k * 450},550 Q${-640 + k * 460},${FLOOR} ${-800 + k * 520},${FLOOR + 400}`, { fill: 'none', stroke: '#c9c4ba', 'stroke-width': 2, opacity: 0.6 });
  // the dais and the lone desk
  out += ellipse(1000, 700, 520, 90, { fill: '#5a5660', ...bl(2) }) + ellipse(1000, 690, 500, 80, { fill: '#6e6a74' });
  if (o.desk !== false) out += defenceDesk(1000, 700);
  if (o.mat) out += g({ transform: `translate(${o.mat},${FLOOR - 40})` }, rect(-420, -30, 840, 90, { fill: '#4a6a9a', ...bl(2.4) }), line(-400, -10, 400, -10, { stroke: '#6a8aba', 'stroke-width': 3 }));
  if (o.spheres) { const R = rng(7); for (let i = 0; i < o.spheres; i++) { const x = -300 + i * 2600 / o.spheres + R.range(-40, 40), y = R.range(-200, 200); out += K.glow(x, y, 80, '#6a9ae0', 0.4) + circle(x, y, 34, { fill: '#3a6ad0', ...bl(2) }) + circle(x - 10, y - 12, 9, { fill: '#fff', opacity: 0.5 }); } }
  return out;
}
export function defenceDesk(x = 1000, y = 700) { return rect(x - 170, y - 160, 340, 30, { fill: '#3a2a22', ...bl(2) }) + rect(x - 160, y - 130, 320, 130, { fill: '#2a1c16', ...bl(1.8) }) + rect(x - 120, y - 110, 240, 80, { fill: '#3a2a22', ...bl(1.2) }); }
// view from the stage up at the seats: curved tiers of desks rising to the back. Row k's floor is at y = FLOOR - k*ROW.
// Actors in row k stand at y = FLOOR - k*ROW (seated: pose 'sit', seat 140) and the row's desk front is drawn by tierFront(k).
export const ROW = 190;
export function defenceTiers(o = {}) {
  const rows = o.rows ?? 5;
  let out = rect(-800, -1400, 4000, 2800, { fill: '#2a2630' });
  out += K.stoneWall(-800, -1400, 4000, 1600, '#7a7680', 223, { bh: 70 });
  out += rect(-800, -1400, 4000, 1600, { fill: '#140e20', opacity: 0.35 });
  for (let k = 0; k < 7; k++) out += torch(-500 + k * 560, -1080, 1.1);
  for (let k = rows - 1; k >= 0; k--) { const y = FLOOR - k * ROW; out += rect(-800, y - 20, 4000, ROW + 40, { fill: shade('#6b4429', -0.04 * k), ...bl(1.4) }); }
  return out;
}
// the desk front of row k (draw AFTER the actors in that row, BEFORE rows in front). o.screens: x positions of desk screens
export function tierFront(k, o = {}) {
  const y = FLOOR - k * ROW + 30, x0 = o.x0 ?? -800, x1 = o.x1 ?? 3200;
  let out = rect(x0, y - 120, x1 - x0, 22, { fill: C.woodLight, ...bl(1.8) }) + rect(x0 + 6, y - 98, x1 - x0 - 12, 128, { fill: shade(C.wood, -0.05 * k), ...bl(1.6) });
  for (const sx of o.screens || []) out += g({ transform: `translate(${sx},${y - 170})` }, rect(-60, -46, 120, 88, { fill: '#f7f4ec', ...bl(1.6) }), rect(-52, -38, 104, 72, { fill: o.lit ? '#dfe6ea' : '#e9e6de' }), o.lit ? quirrellIcon(0, -2, 0.5) : '', path('M-16,42 L16,42 L22,52 L-22,52Z', { fill: '#d9d2c2', ...bl(1) }));
  return out;
}
// Quirrell's face on the desk screens: a simple pale head, balding, thin smile
export function quirrellIcon(x, y, s = 1) {
  return g({ transform: `translate(${x},${y}) scale(${s})` }, rect(-46, 20, 92, 60, { fill: '#3b3242', rx: 20 }), ellipse(0, -8, 36, 44, { fill: '#ecdfd2', stroke: C.ink, 'stroke-width': 2.4 }),
    path('M-36,-10 q-4,-20 6,-30 M36,-10 q4,-20 -6,-30', { fill: 'none', stroke: '#6b5a48', 'stroke-width': 5 }), path('M-16,-14 q6,-4 12,0 M4,-14 q6,-4 12,0', { fill: 'none', stroke: C.ink, 'stroke-width': 2.4 }),
    circle(-10, -8, 3, { fill: '#5a6a80' }), circle(10, -8, 3, { fill: '#5a6a80' }), path('M-10,16 q10,4 20,-2', { fill: 'none', stroke: C.ink, 'stroke-width': 2 }));
}

// ---------------------------------------------------------------- the flying field: a clear bright day, baked-hard grass, the castle beyond
export function flyingField(o = {}) {
  const id = uid('ff');
  let out = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5f8fc8"/><stop offset="0.7" stop-color="#bcd4e6"/><stop offset="1" stop-color="#e6ecd8"/></linearGradient></defs>`;
  out += rect(-1000, -1600, 5000, 2600, { fill: `url(#${id})` });
  out += K.glow(o.sunX ?? 2400, -900, 500, '#fff6c8', 0.7) + circle(o.sunX ?? 2400, -900, 70, { fill: '#fffbe8' });
  const R = rng(191); for (let i = 0; i < 7; i++) out += ellipse(-800 + R() * 4400, -1300 + R() * 700, R.range(140, 280), R.range(30, 50), { fill: '#fbfbf7', opacity: 0.8 });
  // hills + the castle far off
  out += path('M-1000,520 Q-400,300 200,420 Q900,260 1600,400 Q2300,280 3000,440 Q3600,360 4000,480 L4000,1000 L-1000,1000Z', { fill: '#7fa06a' });
  out += g({ opacity: 0.55 }, HGcastleSilhouette(900, 380, 0.55));
  out += rect(-1000, 600, 5000, 900, { fill: '#9ab574' });
  for (let i = 0; i < 140; i++) { const x = -900 + R() * 4800, y = 620 + R() * 600; out += path(`M${x},${y} l3,-12 M${x + 6},${y} l-2,-10`, { stroke: '#6f8f4a', 'stroke-width': 2 }); }
  if (o.brooms) for (let i = 0; i < o.brooms; i++) { const x = (o.bx ?? 200) + i * 190; out += g({ transform: `translate(${x},${FLOOR + 20}) rotate(${R.range(-4, 4)}) scale(0.9)` }, broomProp()); }
  return out;
}
function broomProp() { const R = rng(9); let tw = ''; for (let i = 0; i < 12; i++) tw += line(80, R.range(-4, 4), 150 + R.range(0, 20), R.range(-18, 18), { stroke: '#8a6a3a', 'stroke-width': 2 }); return path('M-130,-4 L90,-5 L90,5 L-130,4Z', { fill: '#8a5d38', ...bl(1.6) }) + tw + path('M80,-12 Q130,-20 160,-14 Q168,0 160,14 Q130,20 80,12Z', { fill: '#b58a4a', ...bl(1.4) }); }
function HGcastleSilhouette(x, y, s) { let o = path(`M${x - 520 * s},${y + 140 * s} L${x - 480 * s},${y - 200 * s} L${x + 440 * s},${y - 200 * s} L${x + 480 * s},${y + 140 * s}Z`, { fill: '#6a7a8a' }); const T = [[-420, 220, 60, 300], [-300, 240, 90, 200], [-160, 200, 70, 420], [-40, 200, 160, 260], [120, 190, 60, 380], [240, 200, 110, 240], [380, 180, 70, 330]]; for (const [dx, dy, tw, th] of T) o += rect(x + (dx - tw / 2) * s, y - (dy + th) * s, tw * s, th * s, { fill: '#6a7a8a' }) + polygon([[x + (dx - tw / 2 - 8) * s, y - (dy + th) * s], [x + (dx + tw / 2 + 8) * s, y - (dy + th) * s], [x + dx * s, y - (dy + th + tw * 1.3) * s]], { fill: '#5a6a7a' }); return o; }
// a broom under a seated actor (actor pose 'sit', seat = S): (e) => svg
export const broomUnder = (id, S = 60, rot = 0, s = 1.1) => (e) => { const a = e.wa[id]; if (!a) return ''; const hx = a.head[0], hy = a.head[1] + a.hr * 2.6; return g({ transform: `translate(${hx},${hy}) rotate(${rot}) scale(${s})` }, broomProp()); };

// ---------------------------------------------------------------- Dumbledore's office (Book Two): whirring instruments, sleeping portraits,
// the hat rack (Sorting Hat, two umbrellas, three red left slippers), a golden perch whose bird is o.bird:
// 'chicken' | 'fire' | 'ash' | 'egg' | 'phoenix' | 'none'. Desk centre x = 1000; throne behind; door at x ≈ 2200.
import * as P2c from '../props/props2.js';
import { sortingHat } from './hogwarts.js';
export function dumbledoreOffice(o = {}) {
  const R = rng(233);
  let out = rect(-800, -900, 4000, 2200, { fill: '#2a2440' });
  out += K.stoneWall(-800, -900, 4000, 1800, '#6a6078', 233, { bh: 62 });
  out += rect(-800, -900, 4000, 1800, { fill: '#1a1030', opacity: 0.35 });
  // circular room hints: tall arched windows with night/dusk sky
  for (const x of [-560, 2560]) out += archWindow(x, -560, 220, 700, { sky: o.sky || 'dusk', seed: x });
  // sleeping portraits
  for (let i = 0; i < 7; i++) { const x = -420 + i * 430, y = -760 + (i % 2) * 70; out += K.frame(x, y, 170, 210, rect(0, 0, 170, 210, { fill: R.pick(['#4a5a4a', '#5a4a3a', '#3a4a5a']) }) + circle(85, 95, 38, { fill: '#e0c8a8' }) + path('M60,92 q8,5 16,0 M94,92 q8,5 16,0', { stroke: C.ink, 'stroke-width': 2, fill: 'none' }) + path('M40,210 Q85,135 130,210Z', { fill: R.pick([C.burgundy, C.navy, C.forest, C.plum]) }) + (i % 3 === 0 ? path('M58,80 Q85,30 112,80', { fill: '#ddd' }) : '') + text(130, 60, 'z', { 'font-family': 'Caveat', 'font-size': 26, fill: '#e9dcc0' })); }
  // shelves of instruments, left and right
  for (const [sx, sy] of [[-640, 160], [-640, 380], [1780, 160], [1780, 380]]) {
    out += rect(sx, sy, 640, 18, { fill: '#5a3a2a', ...bl(1.6) });
    for (let i = 0; i < 5; i++) { const x = sx + 60 + i * 120, kind = R.pick(['dial8', 'blorple', 'wibblers', 'glass', 'orrery']); out += kind === 'glass' ? path(`M${x - 20},${sy} L${x - 26},${sy - 70} Q${x},${sy - 110} ${x + 26},${sy - 70} L${x + 20},${sy}Z`, { fill: R.pick(['#8ad0a0', '#d08ab0', '#8ab0e0', '#e0c06a']), opacity: 0.75, ...bl(1.4) }) + ellipse(x, sy - 88, 8, 8, { fill: '#fff', opacity: 0.6 }) : kind === 'orrery' ? g({ transform: `translate(${x},${sy - 60})` }, circle(0, 0, 10, { fill: '#e7bb4f', ...bl(1.2) }), ellipse(0, 0, 44, 16, { fill: 'none', stroke: '#c9ced4', 'stroke-width': 2 }), circle(40, 6, 6, { fill: '#6a9ad0' }), ellipse(0, 0, 28, 30, { fill: 'none', stroke: '#b08d45', 'stroke-width': 2 }), line(0, 10, 0, 60, { stroke: '#b08d45', 'stroke-width': 3 })) : g({ transform: `translate(${x},${sy - (kind === 'dial8' ? 80 : 44)}) scale(0.9)` }, P2c.instrument(kind)); }
  }
  // the hat rack: Sorting Hat, two umbrellas, three red slippers (all left)
  if (o.rack !== false) {
    out += line(1500, FLOOR, 1500, 180, { stroke: '#5a3a2a', 'stroke-width': 14 }) + line(1440, 200, 1560, 160, { stroke: '#5a3a2a', 'stroke-width': 10 }) + line(1440, 160, 1560, 200, { stroke: '#5a3a2a', 'stroke-width': 10 });
    out += g({ transform: 'translate(1500,170) scale(0.55)' }, sortingHat(1, { mood: 'sleep' }));
    out += path('M1450,220 l-30,260 M1450,220 q-20,-20 -40,0', { fill: 'none', stroke: '#2a2a3a', 'stroke-width': 8 }) + path('M1420,480 q-40,0 -30,-40 l30,-200 l30,200 q10,40 -30,40', { fill: '#3a3a5a', opacity: 0.7 });
    out += path('M1550,230 l24,250', { stroke: '#7b2433', 'stroke-width': 8 }) + path('M1574,480 q-12,-150 -24,-250 q30,110 24,250Z', { fill: '#7b2433', opacity: 0.7 });
    for (let k = 0; k < 3; k++) out += g({ transform: `translate(${1470 + k * 30},${FLOOR - 40 - k * 6}) rotate(${-10 + k * 8})` }, path('M-26,0 Q-30,-22 0,-22 Q30,-18 34,0 Q10,8 -26,0Z', { fill: '#b8262e', ...bl(1.4) }));
  }
  // the golden perch
  out += line(700, FLOOR, 700, 380, { stroke: '#b08d45', 'stroke-width': 9 }) + line(610, 380, 790, 380, { stroke: '#e7bb4f', 'stroke-width': 10, 'stroke-linecap': 'round' }) + ellipse(700, FLOOR, 60, 14, { fill: '#b08d45', ...bl(1.4) });
  const bird = o.bird ?? 'chicken';
  if (bird === 'chicken') out += g({ transform: 'translate(700,378) scale(1.1)' }, P2c.chicken(1));
  if (bird === 'fire') out += g({ transform: 'translate(700,378) scale(1.1)' }, P2c.chicken(1, { fire: true }));
  if (bird === 'ash' || bird === 'egg') out += g({ transform: 'translate(700,370) scale(1.2)' }, P2c.chicken(1, { ash: true })) + (bird === 'egg' ? g({ transform: 'translate(716,360)' }, P2c.egg(1)) : '');
  if (bird === 'phoenix') out += g({ transform: 'translate(700,372) scale(0.9)' }, P2c.phoenix(1));
  // Tolkien shelf by the throne
  out += K.bookcase(1180, -40, 240, 560, 239, { wood: '#4a2e1b', shelves: 4 });
  out += K.glow(1000, 200, 1100, '#f0b060', 0.22);
  out += rect(-800, FLOOR, 4000, 500, { fill: '#3a2a4a' }) + K.rug(1000, FLOOR + 120, 1500, 190, C.plum);
  // the door
  if (o.door !== false) out += K.door(2150, 280, 300, 620, '#4a2e1b', { open: o.doorOpen }) + circle(2400, 590, 16, { fill: '#b08d45', ...bl(1.4) }) + path('M2285,300 q15,-40 30,0', { fill: 'none', stroke: '#b08d45', 'stroke-width': 4 });
  return out;
}
// the throne (behind the desk) and the clean black oaken desk + oaken stool (fg pieces). x = desk centre
export function dumbledoreThrone(x = 1000) { return path(`M${x - 160},${FLOOR - 40} L${x - 150},${FLOOR - 560} Q${x},${FLOOR - 700} ${x + 150},${FLOOR - 560} L${x + 160},${FLOOR - 40}Z`, { fill: '#6a2a4a', ...bl(2.4) }) + path(`M${x - 120},${FLOOR - 540} Q${x},${FLOOR - 640} ${x + 120},${FLOOR - 540}`, { fill: 'none', stroke: '#e7bb4f', 'stroke-width': 6 }); }
export function blackDesk(x = 1000, y = FLOOR + 40, o = {}) {
  let out = rect(x - 300, y - 300, 600, 34, { fill: '#221a1c', ...bl(2.2), rx: 4 }) + rect(x - 280, y - 266, 560, 266, { fill: '#181214', ...bl(2) }) + rect(x - 250, y - 240, 220, 150, { fill: '#221a1c', ...bl(1.4) }) + rect(x + 30, y - 240, 220, 150, { fill: '#221a1c', ...bl(1.4) });
  if (o.rock) out += g({ transform: `translate(${x - 60},${y - 330})` }, P2c.rock(1));
  if (o.book) out += g({ transform: `translate(${x + 150},${y - 312}) rotate(-6) scale(0.5)` }, P2c.potionsBook(1, o.book === 'open' ? { open: true } : {}));
  if (o.drawer) out += rect(x - 250, y - 250, 220, 60, { fill: '#2e2226', ...bl(1.4) });
  return out;
}
export function stoolFront(x = 1000, y = FLOOR + 160) { return g({ transform: `translate(${x},${y})` }, ellipse(0, -110, 70, 16, { fill: '#8a5d38', ...bl(2) }), line(-54, -100, -64, 0, { stroke: '#5a3a22', 'stroke-width': 12 }), line(54, -100, 64, 0, { stroke: '#5a3a22', 'stroke-width': 12 })); }
// the gargoyle and the spiral stair
export function gargoyleCorridor(o = {}) {
  let out = corridor({ seed: 241, windows: [2300], torches: [400, 1500] });
  out += path('M880,-80 L1120,-80 L1140,560 L860,560Z', { fill: '#2a2430', ...bl(2) }); // the opening
  if (o.open) for (let k = 0; k < 6; k++) out += path(`M${900 + k * 10},${500 - k * 90} L1100,${470 - k * 90} L1100,${500 - k * 90} L${900 + k * 10},${530 - k * 90}Z`, { fill: '#8a7a68', ...bl(1.4) });
  const gx = o.open ? 1300 : 1000;
  out += g({ transform: `translate(${gx},${FLOOR})` }, rect(-100, -60, 200, 60, { fill: '#6a6a6a', ...bl(2) }),
    path('M-80,-60 Q-100,-240 -40,-300 Q-60,-360 -20,-400 L0,-360 L20,-400 Q60,-360 40,-300 Q100,-240 80,-60Z', { fill: '#8a8a8a', ...bl(2.4) }),
    path('M-80,-240 Q-180,-320 -150,-400 Q-120,-330 -60,-300 M80,-240 Q180,-320 150,-400 Q120,-330 60,-300', { fill: '#7a7a7a', ...bl(2) }),
    circle(-18, -330, 7, { fill: '#2a2a2a' }), circle(18, -330, 7, { fill: '#2a2a2a' }), path('M-20,-300 q20,14 40,0', { fill: 'none', stroke: '#2a2a2a', 'stroke-width': 3 }));
  return out;
}

// ---------------------------------------------------------------- Potions: "dungeons" (a basement), jars of preserved creatures, cauldrons, the cupboard
export function potionsRoom(o = {}) {
  const R = rng(251);
  let out = rect(-800, -900, 4000, 2200, { fill: '#1e2422' });
  out += K.stoneWall(-800, -900, 4000, 1800, '#6a706a', 251, { bh: 56 });
  out += rect(-800, -900, 4000, 1800, { fill: '#0c1a14', opacity: 0.4 });
  // low vaulted ceiling
  for (let x = -700; x < 3200; x += 600) out += path(`M${x},-900 Q${x + 300},-620 ${x + 600},-900`, { fill: 'none', stroke: '#3a403a', 'stroke-width': 24 });
  // shelves of jars on every wall
  for (const sy of [-440, -180, 80]) {
    out += rect(-760, sy, 3900, 16, { fill: '#3a2a1a', ...bl(1.4) });
    for (let x = -720; x < 3100; x += R.range(70, 120)) {
      if (x > 1450 && x < 1850 && sy > -200) continue; // cupboard
      const h = R.range(80, 170), w = R.range(50, 90), col = R.pick(['#6a8a4a', '#8a9a5a', '#5a7a6a', '#9a8a4a', '#7a6a8a']);
      out += rect(x, sy - h, w, h, { fill: col, opacity: 0.55, ...bl(1.3), rx: 8 }) + rect(x - 4, sy - h - 12, w + 8, 14, { fill: '#5a4a3a', ...bl(1) });
      const kind = R.int(0, 4); const cx = x + w / 2, cy = sy - h * 0.45;
      out += kind === 0 ? path(`M${cx - w * 0.3},${cy} Q${cx},${cy - h * 0.25} ${cx + w * 0.3},${cy} Q${cx},${cy + h * 0.2} ${cx - w * 0.3},${cy}Z M${cx + w * 0.3},${cy} l12,-8 l0,16Z`, { fill: '#c9c4a0', opacity: 0.7 }) :
        kind === 1 ? circle(cx, cy, w * 0.25, { fill: '#d9d0b0', opacity: 0.7 }) + circle(cx - 5, cy - 4, 3, { fill: '#2a1a14' }) + circle(cx + 5, cy - 4, 3, { fill: '#2a1a14' }) :
        kind === 2 ? path(`M${cx},${cy - h * 0.3} q${w * 0.3},${h * 0.2} 0,${h * 0.5} q${-w * 0.3},${-h * 0.2} 0,${-h * 0.5}`, { fill: 'none', stroke: '#e9e0c8', 'stroke-width': 4, opacity: 0.6 }) : '';
    }
  }
  // the dust ball with eyes and feet; the too-small Acromantula
  out += g({ transform: 'translate(300,70)' }, circle(0, -40, 34, { fill: '#9a948a', ...bl(1.4) }), circle(-10, -46, 5, { fill: '#fff' }), circle(10, -46, 5, { fill: '#fff' }), circle(-10, -46, 2, { fill: C.ink }), circle(10, -46, 2, { fill: C.ink }), line(-12, -8, -16, 0, bl(2)), line(12, -8, 16, 0, bl(2)));
  out += g({ transform: 'translate(2400,-190)' }, rect(-80, -170, 160, 170, { fill: '#6a7a5a', opacity: 0.5, ...bl(1.4), rx: 10 }), ellipse(0, -80, 30, 22, { fill: '#2a2018' }), ...[-1, 1].flatMap((sgn) => [0, 1, 2, 3].map((k) => path(`M${sgn * 20},${-84 + k * 6} q${sgn * 30},${-20 + k * 8} ${sgn * 56},${10 + k * 10}`, { fill: 'none', stroke: '#2a2018', 'stroke-width': 4 }))));
  // the cupboard (o.cupboard 'open' | 'closed')
  out += rect(1480, 240, 340, 660, { fill: '#3a2a1a', ...bl(2.2) }) + (o.cupboard === 'open' ? rect(1500, 260, 300, 640, { fill: '#0a0806' }) + path('M1500,260 L1400,300 L1400,860 L1500,900Z', { fill: '#4a3624', ...bl(2) }) : rect(1500, 260, 300, 640, { fill: '#4a3624', ...bl(1.8) }) + rect(1530, 290, 240, 270, { fill: '#3a2a1a', ...bl(1.2) }) + rect(1530, 600, 240, 270, { fill: '#3a2a1a', ...bl(1.2) }) + circle(1770, 580, 8, { fill: '#b08d45' }));
  // the classroom door (locked)
  out += K.door(-560, 300, 280, 600, '#2e2218');
  out += rect(-800, FLOOR, 4000, 500, { fill: '#2e3230' });
  for (let x = -800; x < 3200; x += 140) out += line(x, FLOOR, x - 50, FLOOR + 500, bl(1, { opacity: 0.35 }));
  out += K.glow(1000, 200, 1300, '#9ab090', 0.12);
  return out;
}
// a row of student benches with cauldrons (fg): y = floor line; xs = cauldron centres
export function cauldronRow(y, xs = [], o = {}) {
  let out = rect(-800, y - 220, 4000, 30, { fill: '#4a3a2a', ...bl(2) }) + rect(-790, y - 190, 3980, 190, { fill: '#3a2c20', ...bl(1.8) });
  for (const x of xs) out += ellipse(x, y - 230, 70, 18, { fill: '#1a1a1a', ...bl(2) }) + path(`M${x - 70},${y - 230} Q${x - 80},${y - 150} ${x},${y - 140} Q${x + 80},${y - 150} ${x + 70},${y - 230}`, { fill: '#2a2a2a', ...bl(2) }) + (o.steam ? path(`M${x - 20},${y - 250} q-10,-30 10,-50 q20,-20 0,-50`, { fill: 'none', stroke: '#c9d8c0', 'stroke-width': 6, opacity: 0.35 }) : '');
  return out;
}
export function snapeDesk(x = 1000, y = FLOOR + 30) { return rect(x - 280, y - 280, 560, 32, { fill: '#2a1e18', ...bl(2.2) }) + rect(x - 260, y - 248, 520, 248, { fill: '#1e1612', ...bl(2) }) + g({ transform: `translate(${x - 150},${y - 300})` }, ellipse(0, 0, 24, 8, { fill: '#6a8a4a', ...bl(1.2) }), rect(-6, -40, 12, 40, { fill: '#8ab09a', opacity: 0.8, ...bl(1) })); }
// History of Magic: rows of desks in a dim room, a ghost at the front
export function historyRoom(o = {}) {
  return classroom({ seed: 261, windows: [-200, 2250], sky: 'rain', wall: '#8a857c' }) + rect(-800, -900, 4000, 2200, { fill: '#2a2a3a', opacity: 0.2 }) + blackboard(700, -250, 1000, 480, { col: '#3a3a3a', lines: [{ t: 'The Goblin Rebellion of 1612 (part 4 of 11)', y: 200, size: 44, col: '#e9e6de', font: 'Caveat' }] });
}

// ---------------------------------------------------------------- the mountain dojo (Ep 22 flashback): polished wooden floor, paper screens, mountains beyond
export function dojo(o = {}) {
  const R = rng(271);
  let out = rect(-800, -900, 4000, 2200, { fill: '#d9c9a8' });
  // open wall onto mountains
  out += rect(-300, -600, 2600, 900, { fill: '#c9d4d8' });
  out += path('M-300,300 L200,-260 L500,20 L900,-420 L1300,-40 L1700,-360 L2100,0 L2300,-140 L2300,300Z', { fill: '#8a9aa0' }) + path('M800,-340 L900,-420 L1000,-330 L950,-320 L900,-360 L850,-320Z M1600,-290 L1700,-360 L1790,-280Z', { fill: '#f3f0e8' });
  out += path('M-300,300 L300,40 L700,200 L1200,60 L1800,220 L2300,120 L2300,300Z', { fill: '#6a7a6a' });
  // posts, beams, screens
  for (let x = -300; x <= 2300; x += 520) out += rect(x - 20, -700, 40, 1600, { fill: '#5a3a24', ...bl(2) });
  out += rect(-800, -720, 4000, 80, { fill: '#4a2e1b', ...bl(2) });
  for (const x of [-760, 2340]) { out += rect(x, -640, 420, 1540, { fill: '#efe6d2', ...bl(2) }); for (let k = 1; k < 4; k++) out += line(x + k * 105, -640, x + k * 105, 900, bl(1.4)); for (let k = 1; k < 8; k++) out += line(x, -640 + k * 190, x + 420, -640 + k * 190, bl(1.4)); }
  if (o.empty) out += g({ transform: 'translate(1000,880) rotate(-6)' }, P2c.bokken(1.3));
  out += rect(-800, FLOOR, 4000, 500, { fill: '#b88a5a' }) + K.floorboards(-800, FLOOR, 4000, 500, '#c99a6a', 13);
  return out;
}
// the room behind the third door: a small room with a bed and a tray of expensive sweets
export function restRoom(o = {}) {
  let out = rect(-800, -900, 4000, 2200, { fill: '#6a6470' }) + K.stoneWall(-800, -900, 4000, 1800, '#8a8690', 281, { bh: 64 }) + rect(-800, FLOOR, 4000, 500, { fill: '#4a4450' });
  out += rect(700, FLOOR - 200, 700, 120, { fill: '#e9e0cc', ...bl(2), rx: 16 }) + rect(680, FLOOR - 90, 740, 90, { fill: '#5a3a24', ...bl(2) }) + ellipse(820, FLOOR - 210, 90, 30, { fill: '#f6f0e2', ...bl(1.6) });
  out += K.table(1600, FLOOR, 260, 170, C.wood) + g({ transform: `translate(1600,${FLOOR - 180})` }, ellipse(0, 0, 100, 20, { fill: '#c9ced4', ...bl(1.4) }), ...[-60, -30, 0, 30, 60].map((x, i) => circle(x, -10, 12, { fill: ['#6a3a22', '#e2485a', '#f0d27e', '#b07ad0', '#6a3a22'][i], ...bl(1.2) })));
  out += K.candle(1450, FLOOR - 180, 1, true) + K.bookPile(1700, FLOOR - 170, 3, 11, 0.8);
  return out;
}

// ---------------------------------------------------------------- the stars (Ep 23): Quirrell's spell. No sky, no dome: points of perfect light in perfect black,
// the Milky Way as a great wash of light. o.disc: draw the small circle of white marble at (x, FLOOR). o.room: fraction of the classroom still visible (fading in/out)
export function deepSpace(o = {}) {
  const R = rng(o.seed || 307); const a = -24 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
  const band = (u, v) => [1000 + u * ca - v * sa, 200 + u * sa + v * ca]; // u along the band, v across it
  const k = o.k ?? 1; // star size multiplier (use >1 for wide shots)
  let out = rect(-3000, -3000, 8000, 7000, { fill: '#020206' });
  // the Milky Way: overlapping soft glows along a tilted band, warm in the core
  for (let i = 0; i < 90; i++) { const u = R.range(-3200, 3200), v = R.range(-1, 1) * R.range(0, 260); const [x, y] = band(u, v); const core = Math.abs(u) < 900; out += K.glow(x, y, R.range(160, 420) * (core ? 1.3 : 1), R.pick(core ? ['#ffe2c0', '#fff0dc', '#e8d8ff'] : ['#cfd8ff', '#e0d8ff', '#bcd0ff']), R.range(0.08, 0.16) * (core ? 1.4 : 1)); }
  for (let i = 0; i < 16; i++) { const [x, y] = band(R.range(-2600, 2600), R.range(-60, 60)); out += ellipse(x, y, R.range(220, 460), R.range(10, 26), { fill: '#050308', opacity: R.range(0.12, 0.26), transform: `rotate(-24 ${x} ${y})`, filter: 'url(#blur3)' }); }
  // stars: a dense river along the band, and a scatter everywhere; a few bright ones with glints
  for (let i = 0; i < 3200; i++) {
    let x, y; if (R() < 0.6) { const v = (R() - 0.5) * (R() < 0.7 ? 380 : 900); [x, y] = band(R.range(-3200, 3200), v); } else { x = R.range(-2800, 4800); y = R.range(-2800, 3800); }
    const big = R() < 0.025; const r = (big ? R.range(3.5, 6) : R.range(1.2, 3)) * k;
    out += circle(x, y, r, { fill: R.pick(['#ffffff', '#fff4dc', '#dbe6ff', '#ffe2c8', '#ffffff']), opacity: R.range(0.55, 1) });
    if (big) out += circle(x, y, r * 3.5, { fill: '#dbe6ff', opacity: 0.16 }) + path(`M${x - r * 6},${y} L${x + r * 6},${y} M${x},${y - r * 6} L${x},${y + r * 6}`, { stroke: '#fff', 'stroke-width': 1.4 * k, opacity: 0.7 });
  }
  if (o.disc !== false) out += ellipse(o.discX ?? 1000, FLOOR + 6, o.discR ?? 200, (o.discR ?? 200) * 0.22, { fill: '#e9e4da', stroke: '#b9b4aa', 'stroke-width': 3 }) + ellipse(o.discX ?? 1000, FLOOR + 6, (o.discR ?? 200) * 0.9, (o.discR ?? 200) * 0.18, { fill: 'none', stroke: '#fff', 'stroke-width': 2, opacity: 0.6 });
  return out;
}
