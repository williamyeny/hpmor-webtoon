// Hogwarts: the castle across the lake, the Great Hall (wide perspective + reverse shots), the dais,
// the Sorting Hat itself, and the inside of Harry's head (the Hat conversation's mindscape).
import { C } from '../core/palette.js';
import { g, path, rect, circle, ellipse, line, polygon, text, smoothD, rng, shade, mixHex, uid, r2 } from '../core/svg.js';
import * as K from './kit.js';
const bl = K.bl;
export const FLOOR = 900;
const HOUSE = { g: '#9a2a2a', s: '#2f5a40', r: '#2f4f86', h: '#d6a33a' };

function stars(w, h, n, seed, y0 = 0) { const R = rng(seed); let o = ''; for (let i = 0; i < n; i++) o += circle(R() * w, y0 + R() * h, R.range(0.6, 2.4), { fill: '#f3f0d8', opacity: R.range(0.4, 1) }); return o; }

// ---------------------------------------------------------------- the castle across the black lake (1600 × 1200)
export function castle(x, y, s = 1, lit = true) {
  const R = rng(17);
  let out = '';
  const tower = (tx, ty, tw, th, cone = true) => {
    let o = rect(tx - tw / 2, ty - th, tw, th, { fill: '#141424' });
    if (cone) o += polygon([[tx - tw / 2 - 8, ty - th], [tx + tw / 2 + 8, ty - th], [tx, ty - th - tw * 1.3]], { fill: '#141424' });
    for (let k = 0; k < th / 40; k++) if (R() < 0.5) o += rect(tx - 4 + R.range(-tw / 4, tw / 4), ty - th + 30 + k * 40, 8, 14, { fill: lit ? '#ffcf75' : '#2a2a3a' });
    return o;
  };
  out += path(`M${x - 700 * s},${y} L${x - 520 * s},${y - 140 * s} L${x - 200 * s},${y - 200 * s} L${x + 300 * s},${y - 180 * s} L${x + 650 * s},${y - 100 * s} L${x + 760 * s},${y}Z`, { fill: '#0e0e1a' });
  const T = [[-420, 220, 60, 300], [-300, 240, 90, 200], [-160, 200, 70, 420], [-40, 200, 160, 260, false], [120, 190, 60, 380], [240, 200, 110, 240], [380, 180, 70, 330], [520, 150, 50, 240]];
  for (const [dx, dy, tw, th, cone] of T) out += tower(x + dx * s, y - dy * s, tw * s, th * s, cone !== false);
  // great hall block with a row of tall lit windows
  out += rect(x - 140 * s, y - 360 * s, 300 * s, 160 * s, { fill: '#141424' });
  for (let k = 0; k < 6; k++) out += path(`M${x + (-120 + k * 48) * s},${y - 220 * s} l0,${-80 * s} q${10 * s},${-16 * s} ${20 * s},0 l0,${80 * s}Z`, { fill: lit ? '#ffd27a' : '#2a2a3a' });
  if (lit) out += K.glow(x, y - 280 * s, 420 * s, '#ffcf75', 0.25);
  return out;
}
export function lakeNight(o = {}) {
  const id = uid('lk');
  let out = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070b1c"/><stop offset="0.6" stop-color="#1c2a50"/><stop offset="1" stop-color="#2e3f6a"/></linearGradient></defs>`;
  out += rect(-400, -800, 2400, 1500, { fill: `url(#${id})` }) + stars(2400, 1000, 220, 5, -800).replace(/<circle cx="/g, '<circle cx="') ;
  out += g({ transform: 'translate(-400,0)' }, '');
  out += circle(1250, -450, 70, { fill: '#eef0dc' }) + K.glow(1250, -450, 260, C.moon, 0.35);
  out += castle(800, 520, 1.1);
  // lake + reflections
  out += rect(-400, 520, 2400, 800, { fill: '#0a1020' });
  const R = rng(3); for (let i = 0; i < 80; i++) { const x = R.range(-300, 1900), y = R.range(540, 1200); out += line(x, y, x + R.range(20, 80), y, { stroke: '#ffcf75', 'stroke-width': 2, opacity: R.range(0.1, 0.35) }); }
  // little boats with lanterns
  for (const [bx, by, sc] of (o.boats || [[400, 900, 1], [700, 980, 1.2], [1050, 880, 0.9], [1300, 1000, 1.3]])) out += boat(bx, by, sc);
  return out;
}
export function boat(x, y, s = 1) {
  return g({ transform: `translate(${x},${y}) scale(${s})` }, path('M-90,0 Q0,40 90,0 L70,-18 L-70,-18Z', { fill: '#3a2a1e', ...bl(2) }), line(60, -18, 60, -80, bl(2)), rect(52, -96, 16, 20, { fill: '#ffcf75', ...bl(1.4) }), K.glow(60, -86, 60, '#ffcf75', 0.6), ellipse(0, 16, 110, 10, { fill: '#ffcf75', opacity: 0.12 }));
}

// ---------------------------------------------------------------- floating candles
export function floatingCandles(x0, y0, w, h, n, seed, s = 1) {
  const R = rng(seed); let out = '';
  for (let i = 0; i < n; i++) { const x = x0 + R() * w, y = y0 + R() * h, k = s * R.range(0.6, 1.1); out += K.glow(x, y - 20 * k, 40 * k, '#ffcf75', 0.45) + rect(x - 4 * k, y - 10 * k, 8 * k, 26 * k, { fill: '#f1e6cc' }) + path(`M${x},${y - 24 * k} q${4 * k},${8 * k} 0,${12 * k} q${-4 * k},${-4 * k} 0,${-12 * k}Z`, { fill: '#ffd774' }); }
  return out;
}
export function enchantedCeiling(x0, y0, w, h, seed = 7, day = false) {
  const id = uid('ec');
  if (day) { let o = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fa3c9"/><stop offset="1" stop-color="#d9e3e6"/></linearGradient></defs>` + rect(x0, y0, w, h, { fill: `url(#${id})` }); const R = rng(seed); for (let i = 0; i < 9; i++) o += ellipse(x0 + R() * w, y0 + R() * h * 0.8, R.range(120, 260), R.range(24, 44), { fill: '#fbfbf7', opacity: 0.85 }); return o; }
  let out = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070b1c"/><stop offset="1" stop-color="#23305a"/></linearGradient></defs>` + rect(x0, y0, w, h, { fill: `url(#${id})` });
  const R = rng(seed); for (let i = 0; i < w * h / 2500; i++) out += circle(x0 + R() * w, y0 + R() * h, R.range(0.6, 2.2), { fill: '#f3f0d8', opacity: R.range(0.4, 1) });
  for (let i = 0; i < 5; i++) out += ellipse(x0 + R() * w, y0 + R() * h * 0.8, R.range(120, 260), R.range(20, 40), { fill: '#3a4a7a', opacity: 0.35 });
  return out;
}

// ---------------------------------------------------------------- the Great Hall, wide perspective toward the head table (1600 × 1200)
export function greatHallWide(o = {}) {
  const W = 1600, H = 1200, vx = 800, vy = 420;
  let out = enchantedCeiling(-200, -400, 2000, 820, 9);
  // side walls in perspective
  out += path(`M-200,-100 L${vx - 420},${vy - 160} L${vx - 420},${vy + 180} L-200,${H + 200}Z`, { fill: '#4a4450', ...bl(2) }) + path(`M${W + 200},-100 L${vx + 420},${vy - 160} L${vx + 420},${vy + 180} L${W + 200},${H + 200}Z`, { fill: '#4a4450', ...bl(2) });
  // tall windows along the walls
  for (let k = 0; k < 4; k++) { const t = k / 4; const xL = -120 + (vx - 420 + 120) * t, xR = W + 120 - (W + 120 - vx - 420) * t; const hh = 320 * (1 - t * 0.7); out += path(`M${xL},${vy + 60 - hh * 0.4} l0,${-hh} q${24 * (1 - t)},${-30 * (1 - t)} ${48 * (1 - t)},0 l0,${hh}Z`, { fill: '#2a3a6a', ...bl(1.4) }) + path(`M${xR},${vy + 60 - hh * 0.4} l0,${-hh} q${-24 * (1 - t)},${-30 * (1 - t)} ${-48 * (1 - t)},0 l0,${hh}Z`, { fill: '#2a3a6a', ...bl(1.4) }); }
  // back wall + banners
  out += rect(vx - 420, vy - 160, 840, 340, { fill: '#5a5260', ...bl(2) });
  ['r', 'h', 'g', 's'].forEach((hs, i) => { const bx = vx - 330 + i * 200; out += path(`M${bx},${vy - 150} l70,0 l0,150 l-35,-24 l-35,24Z`, { fill: HOUSE[hs], ...bl(1.4) }); });
  out += path(`M${vx - 60},${vy - 150} l120,0 l0,190 l-60,-30 l-60,30Z`, { fill: '#c9a24a', ...bl(1.6) });
  // dais & head table
  out += rect(vx - 420, vy + 120, 840, 60, { fill: '#6b4429', ...bl(1.6) });
  out += rect(vx - 380, vy + 70, 760, 50, { fill: '#8a2a2a', ...bl(1.6) });
  const R = rng(4);
  for (let i = 0; i < 12; i++) { const hx = vx - 350 + i * 64; out += circle(hx, vy + 50, 14, { fill: R.pick(['#e8d0b8', '#d8c0a8']), ...bl(1) }) + path(`M${hx - 16},${vy + 70} l32,0 l-4,-14 l-24,0Z`, { fill: R.pick(['#15131a', '#46337e', '#1f4a35', '#3b3242']) }); }
  out += circle(vx, vy + 44, 18, { fill: '#f0d9c4', ...bl(1) }) + rect(vx - 26, vy + 10, 52, 30, { fill: '#c9a24a', opacity: 0.8 }); // Dumbledore's chair
  // floor
  out += path(`M-200,${H + 200} L${vx - 420},${vy + 180} L${vx + 420},${vy + 180} L${W + 200},${H + 200}Z`, { fill: '#6a5e50' });
  // four long tables receding
  const tables = [-0.9, -0.3, 0.3, 0.9];
  tables.forEach((f, i) => {
    const nearX = vx + f * 700, farX = vx + f * 170;
    out += path(`M${nearX - 110},${H + 200} L${farX - 30},${vy + 190} L${farX + 30},${vy + 190} L${nearX + 110},${H + 200}Z`, { fill: '#7a4e2e', ...bl(1.6) });
    // students as heads along both sides
    for (let k = 0; k < 14; k++) { const t = k / 14; const px = nearX + (farX - nearX) * t, py = H + 150 - (H + 150 - vy - 200) * t, sc = 1 - t * 0.75; for (const side of [-1, 1]) { const x = px + side * (130 - 100 * t); out += circle(x, py - 40 * sc, 16 * sc, { fill: R.pick(['#f3d2b5', '#d7a57d', '#8e5a3b', '#eec4a1']), ...bl(1) }) + path(`M${x - 22 * sc},${py} L${x - 16 * sc},${py - 28 * sc} L${x + 16 * sc},${py - 28 * sc} L${x + 22 * sc},${py}Z`, { fill: '#1f1d24' }) + rect(x - 18 * sc, py - 30 * sc, 36 * sc, 5 * sc, { fill: HOUSE[['r', 'h', 'g', 's'][i]] }) + circle(x, py - 48 * sc, 17 * sc, { fill: R.pick([C.hairBlack, C.hairBrown, C.hairBlonde, C.hairGinger]), opacity: 0.9 }); } }
  });
  out += floatingCandles(-100, -300, 1800, 640, 140, 3, 1);
  return out;
}

// ---------------------------------------------------------------- reverse shot: along a student table (world 2400 × 1200); bench at y≈900
export function hallTable(house = 'r', o = {}) {
  let out = enchantedCeiling(-300, -700, 3000, 900, 12, o.day) + rect(-300, 200, 3000, 700, { fill: o.day ? '#6a6470' : '#4a4450' });
  for (let i = 0; i < 5; i++) out += path(`M${i * 600},700 l0,-460 q60,-80 120,0 l0,460Z`, { fill: '#2a3a6a', ...bl(1.6) });
  out += path(`M${900},200 l140,0 l0,300 l-70,-40 l-70,40Z`, { fill: HOUSE[house], ...bl(1.6) });
  if (!o.day) out += floatingCandles(-300, -500, 3000, 700, 60, 21, 1.4);
  out += rect(-300, FLOOR, 3000, 400, { fill: '#6a5e50' });
  return out;
}
export function tableFront(x0 = -300, x1 = 2700, y = 960) {
  let out = rect(x0, y, x1 - x0, 30, { fill: '#8a5d38', ...bl(2) }) + rect(x0 + 20, y + 30, x1 - x0 - 40, 300, { fill: '#6b4429', ...bl(2) });
  const R = rng(5);
  for (let x = x0 + 60; x < x1; x += 160) out += ellipse(x, y - 4, 42, 10, { fill: '#e7bb4f', ...bl(1.2) }) + (R() < 0.5 ? ellipse(x + 50, y - 16, 22, 16, { fill: R.pick(['#c46a3a', '#8a3a2a', '#d9a55a']), ...bl(1.2) }) : rect(x + 40, y - 36, 16, 34, { fill: '#e7bb4f', ...bl(1.2), rx: 3 }));
  return out;
}

// ---------------------------------------------------------------- the staff table (world 2400 × 1200); staff stand behind the table (feet y≈900), table front drawn as fg
export function staffWall(o = {}) {
  let out = enchantedCeiling(-300, -700, 3000, 700, 14) + rect(-300, 0, 3000, 900, { fill: '#5a5260' });
  out += K.stoneWall(-300, 0, 3000, 900, '#6a6270', 33, { bh: 70 });
  out += rect(-300, 0, 3000, 900, { fill: '#1a1030', opacity: 0.3 });
  out += path('M1100,40 l200,0 l0,320 l-100,-50 l-100,50Z', { fill: '#c9a24a', ...bl(1.6) }) + text(1200, 180, 'H', { 'font-family': 'IM Fell English SC', 'font-size': 120, 'text-anchor': 'middle', fill: '#6a4a1a' });
  out += floatingCandles(-300, -600, 3000, 560, 60, 31, 1.3);
  out += rect(-300, FLOOR, 3000, 400, { fill: '#6b4429' });
  return out;
}
export function staffTable() { return rect(-300, 700, 3000, 30, { fill: '#8a2a2a', ...bl(2) }) + path('M-300,730 L2700,730 L2700,1100 L-300,1100Z', { fill: '#7a2433', ...bl(2) }) + path('M-300,760 L2700,760', { stroke: '#d6a33a', 'stroke-width': 8 }); }
export const goblet = (x, y, s = 1, crushed = 0) => crushed ? g({ transform: `translate(${x},${y}) scale(${s})` }, path(`M-20,-20 Q-4,-40 10,-24 Q24,-10 8,0 Q18,14 -2,16 Q-22,10 -14,-4 Q-30,-10 -20,-20Z`, { fill: '#c9ced4', stroke: C.ink, 'stroke-width': 2 }), path('M-10,-12 l14,6 M-6,4 l10,-8', { stroke: '#8a8f96', 'stroke-width': 2 })) : g({ transform: `translate(${x},${y}) scale(${s})` }, path('M-18,-50 L18,-50 Q16,-14 4,-8 L4,10 L16,16 L-16,16 L-4,10 L-4,-8 Q-16,-14 -18,-50Z', { fill: '#c9ced4', stroke: C.ink, 'stroke-width': 2 }));

// ---------------------------------------------------------------- the dais: stool, lectern (world); stool top at (1000, 780)
export function dais(o = {}) {
  let out = staffWall();
  out += rect(-300, 820, 3000, 80, { fill: '#6b4429', ...bl(2) });
  out += staffTable();
  // lectern at x 600
  out += path('M560,900 L640,900 L620,640 L580,640Z', { fill: '#6b4429', ...bl(2) }) + path('M530,650 L670,650 L640,600 L560,600Z', { fill: '#8a5d38', ...bl(2) });
  return out;
}
export function stool(x = 1000, y = 900, s = 1) {
  return g({ transform: `translate(${x},${y}) scale(${s})` }, ellipse(0, -130, 70, 18, { fill: '#8a5d38', ...bl(2) }), rect(-70, -130, 140, 14, { fill: '#7a4e2e', ...bl(1.6) }), line(-56, -116, -70, 0, { stroke: '#5a3a22', 'stroke-width': 12 }), line(56, -116, 70, 0, { stroke: '#5a3a22', 'stroke-width': 12 }), line(-10, -116, -14, 0, { stroke: '#4a2e1b', 'stroke-width': 10 }));
}

// ---------------------------------------------------------------- the Sorting Hat. (0,0) = centre of the brim; brim ≈ 200 wide at s=1.
// mood: 'sleep' | 'talk' | 'worried' | 'amused' | 'stern' | 'shout'
export function sortingHat(s = 1, o = {}) {
  const mood = o.mood || 'talk';
  const col = '#6b5238', dark = '#4a3826', light = '#8a6a48', INKH = '#1a120a';
  let out = '';
  // floppy brim (drawn as a wide, drooping ellipse)
  out += path('M-150,6 Q-150,40 -60,44 Q0,48 60,44 Q150,40 150,6 Q110,-20 0,-18 Q-110,-20 -150,6Z', { fill: dark, ...bl(3) });
  // tall slumped cone: goes up, then flops over to the right
  out += path('M-96,-4 Q-110,-150 -70,-250 Q-40,-330 20,-360 Q80,-380 120,-340 Q140,-320 130,-296 Q100,-320 70,-300 Q60,-250 80,-170 Q96,-90 100,-4Z', { fill: col, ...bl(3) });
  out += path('M-80,-210 Q-40,-230 10,-214 M-60,-150 Q0,-170 70,-150', { fill: 'none', stroke: dark, 'stroke-width': 3 });
  // patches & stitches
  out += path('M-74,-120 l42,-8 l8,44 l-44,6Z', { fill: light, stroke: INKH, 'stroke-width': 2, 'stroke-dasharray': '4 3' }) + path('M30,-300 l34,-6 l6,32 l-34,8Z', { fill: '#5a4430', stroke: INKH, 'stroke-width': 2, 'stroke-dasharray': '4 3' });
  // face low on the cone: creased eye-folds + a ripped mouth just above the brim
  const ey = -96;
  const eyes = { sleep: `M-50,${ey} q16,8 32,0 M18,${ey - 4} q16,8 32,0`, talk: `M-50,${ey} q16,-12 32,0 M18,${ey - 4} q16,-12 32,0`, worried: `M-50,${ey + 2} q16,-14 32,-6 M18,${ey - 4} q16,-8 32,6`, amused: `M-50,${ey} q16,-16 32,0 M18,${ey - 4} q16,-16 32,0`, stern: `M-50,${ey - 2} q16,6 32,4 M18,${ey} q16,6 32,-4`, shout: `M-52,${ey - 2} q18,-18 36,0 M16,${ey - 6} q18,-18 36,0` }[mood];
  out += path(eyes, { fill: 'none', stroke: INKH, 'stroke-width': 6, 'stroke-linecap': 'round' });
  if (mood !== 'sleep') out += path(mood === 'worried' ? `M-56,${ey - 18} l24,8 M50,${ey - 22} l-24,10` : mood === 'stern' ? `M-56,${ey - 24} l28,12 M50,${ey - 28} l-28,12` : `M-56,${ey - 20} l26,-6 M48,${ey - 24} l-26,-6`, { stroke: INKH, 'stroke-width': 5, 'stroke-linecap': 'round' });
  const open = { sleep: 3, talk: 20, worried: 14, amused: 22, stern: 8, shout: 44 }[mood];
  const my = -38;
  out += path(`M-64,${my} Q-24,${my - (mood === 'worried' ? -8 : 10)} 0,${my} Q28,${my - (mood === 'amused' ? 14 : 5)} 66,${my - 4} Q22,${my + open} -64,${my}Z`, { fill: '#1a0e08', stroke: INKH, 'stroke-width': 3.4, 'stroke-linejoin': 'round' });
  out += path(`M-64,${my} l-12,8 M66,${my - 4} l12,4`, { stroke: INKH, 'stroke-width': 3 });
  return g({ transform: `scale(${s})${o.flip ? ' scale(-1,1)' : ''}` }, out);
}
// put the Hat on an actor's head in a shot: actors: [..., HG.hatOn('harry', 'worried')]
export const hatOn = (id, mood = 'talk', k = 1) => (e) => { const a = e.wa[id]; if (!a) return ''; const hx = a.head[0], hy = a.head[1] - a.hr * 0.42; return g({ transform: `translate(${hx},${hy}) scale(${(a.hr / 66) * k})` }, sortingHat(1, { mood })); };

// ---------------------------------------------------------------- inside Harry's head: an endless candlelit library (panel coords)
// tone: 'warm' | 'cold' | 'void'
export function mindscape(w, h, tone = 'warm', seed = 1) {
  const R = rng(seed);
  const pal = tone === 'cold' ? ['#0c1626', '#1f3a5a', '#9bc4e8'] : tone === 'void' ? ['#05060a', '#141826', '#6a7a9a'] : ['#1a1024', '#3a2a4a', '#ffcf75'];
  const id = uid('mind');
  let out = `<defs><radialGradient id="${id}" cx="0.5" cy="0.45" r="0.8"><stop offset="0" stop-color="${pal[1]}"/><stop offset="1" stop-color="${pal[0]}"/></radialGradient></defs>` + rect(0, 0, w, h, { fill: `url(#${id})` });
  // receding shelves toward a vanishing point
  const vx = w / 2, vy = h * 0.45;
  for (let k = 0; k < 7; k++) {
    const t = 1 - k / 7, sc = Math.pow(t, 1.6);
    for (const side of [-1, 1]) {
      const x = vx + side * (60 + 480 * sc), top = vy - 420 * sc - 20, bot = vy + 520 * sc + 20, ww = 140 * sc + 8;
      out += rect(side < 0 ? x - ww : x, top, ww, bot - top, { fill: tone === 'cold' ? '#2a4a6a' : '#2a1a14', opacity: 0.5 + sc * 0.5 });
      for (let r = 0; r < 6; r++) { const yy = top + (bot - top) * (r + 1) / 7; for (let b = 0; b < 6; b++) out += rect((side < 0 ? x - ww : x) + b * ww / 6, yy - 30 * sc - 6, ww / 7, 30 * sc + 6, { fill: R.pick(tone === 'cold' ? ['#3a5a7a', '#2a4a6a', '#6a8aaa', '#1f3a5a'] : [C.burgundy, C.forest, C.navy, C.mustardDark, C.brown]), opacity: 0.4 + sc * 0.6 }); }
    }
  }
  // floating lights (candles or snowflakes)
  for (let i = 0; i < 40; i++) { const x = R() * w, y = R() * h, r = R.range(2, 6); out += tone === 'cold' ? path(`M${x - r},${y} L${x + r},${y} M${x},${y - r} L${x},${y + r} M${x - r * 0.7},${y - r * 0.7} L${x + r * 0.7},${y + r * 0.7} M${x + r * 0.7},${y - r * 0.7} L${x - r * 0.7},${y + r * 0.7}`, { stroke: '#dcebf5', 'stroke-width': 1.4, opacity: 0.8 }) : K.glow(x, y, r * 8, pal[2], 0.35) + circle(x, y, r * 0.5, { fill: '#fff3c9' }); }
  return out;
}
// four doors in the mindscape, for the four Houses (panel coords); highlight = which glows
export function houseDoors(w, h, highlight = null, dim = {}) {
  const Hs = [['h', 'Hufflepuff', '#d6a33a'], ['g', 'Gryffindor', '#9a2a2a'], ['r', 'Ravenclaw', '#2f4f86'], ['s', 'Slytherin', '#2f5a40']];
  let out = '';
  Hs.forEach(([k, name, col], i) => {
    const x = w * (0.14 + i * 0.24), y = h * 0.62, dw = w * 0.17, dh = h * 0.42;
    const glowing = highlight === k;
    if (glowing) out += K.glow(x, y - dh / 2, dw * 2.2, k === 'r' ? '#9bc4e8' : k === 'h' ? '#ffd27a' : col, 0.6);
    out += g({ opacity: dim[k] ?? 1 }, path(`M${x - dw / 2},${y} L${x - dw / 2},${y - dh * 0.7} Q${x},${y - dh * 1.05} ${x + dw / 2},${y - dh * 0.7} L${x + dw / 2},${y}Z`, { fill: col, ...bl(2.4) }), path(`M${x - dw / 2 + 10},${y} L${x - dw / 2 + 10},${y - dh * 0.66} Q${x},${y - dh * 0.96} ${x + dw / 2 - 10},${y - dh * 0.66} L${x + dw / 2 - 10},${y}Z`, { fill: glowing ? (k === 'h' ? '#ffe9a8' : '#dcebf5') : shade(col, -0.45) }), text(x, y + 40, name, { 'font-family': 'IM Fell English SC', 'font-size': 24, 'text-anchor': 'middle', fill: '#f1e6cc' }));
  });
  return out;
}
