// The Verres-Evans house in Oxford: living room, stairs, Harry's bedroom, kitchen, back garden, street.
// World units: 1 unit ≈ 0.33 cm; an adult ≈ 560 units tall. Floor line of interiors at y = 900.
import { C } from '../core/palette.js';
import { g, path, rect, circle, ellipse, line, smoothD, rng, shade, mixHex, uid, text } from '../core/svg.js';
import * as K from './kit.js';
import { envelope, teacup, bookOpen } from '../props/props.js';

export const FLOOR = 900;

// ---------------------------------------------------------------- living room (2000 × 1100)
export function livingRoom(o = {}) {
  const W = 2000;
  let out = '';
  out += K.wallpaper(0, 0, W, FLOOR, '#5d6b4e', { c2: '#526145' });
  out += K.bookcase(20, 60, 300, 820, 'lr1');
  out += K.windowFrame(420, 190, 250, 380, { rain: o.rain !== false, curtains: C.burgundy, night: o.night, skyTop: '#6f8196', skyBot: '#a9b5bb', seed: 3 });
  out += K.bookPile(470, FLOOR - 10, 7, 11) + K.bookPile(600, FLOOR - 10, 5, 12);
  out += K.bookcase(760, 60, 300, 820, 'lr2');
  out += K.frame(1200, 150, 170, 130, K.glow(80, 60, 60, '#e6d39a', 0.5) + path('M0,110 L60,60 L100,90 L170,40 L170,130 L0,130Z', { fill: '#4f6a52' }));
  out += K.fireplace(1285, FLOOR, 320, 300, { clock: false, candles: true, lit: o.fire !== false });
  out += K.bookcase(1500, 60, 300, 820, 'lr3');
  out += K.door(1840, 330, 150, 570, '#5a3a24');
  // skirting & floor
  out += rect(0, FLOOR - 14, W, 16, { fill: '#3d2a1c' });
  out += K.floorboards(0, FLOOR, W, 260, '#8a5d38', 5);
  out += K.rug(1000, FLOOR + 110, 900, 150, C.burgundy);
  // furniture
  out += K.lamp(360, FLOOR + 40, 360, '#d9a55a', true);
  out += K.armchair(620, FLOOR + 70, 1.35, C.forest, { antimacassar: true });
  out += K.table(1000, FLOOR + 110, 260, 110, C.wood);
  if (o.letter !== false) out += g({ transform: `translate(990,${FLOOR - 4}) scale(0.55) rotate(-8)` }, envelope({}));
  out += K.bookPile(930, FLOOR - 2, 3, 21, 0.8);
  out += g({ transform: `translate(1070,${FLOOR - 10})` }, teacup(0.8));
  out += K.sofa(1500, FLOOR + 90, 480, 1.3, C.burgundy);
  out += K.bookPile(1360, FLOOR - 70, 4, 31, 0.9) + K.bookPile(1650, FLOOR - 70, 3, 32, 0.9);
  // warm glows
  out += K.glow(1285, FLOOR - 100, 260, C.ember, 0.18) + K.glow(360, FLOOR - 320, 220, C.candle, 0.22);
  return out;
}
// the foreground armchair Harry reads in (separately so actors can sit "in" it)
export function armchairFront(x, y, s = 1.2, col = C.mustardDark) {
  const W = 190 * s, H = 170 * s;
  return path(`M${x - W * 0.5},${y - H * 0.1} L${x - W * 0.5},${y - H * 0.55} Q${x - W * 0.52},${y - H * 0.72} ${x - W * 0.36},${y - H * 0.7} L${x - W * 0.32},${y - H * 0.1}Z`, { fill: shade(col, 0.08), ...K.bl(2.2) }) +
    rect(x - W * 0.5, y - H * 0.24, W, H * 0.16, { fill: shade(col, -0.12), ...K.bl(2), rx: 6 }) +
    path(`M${x + W * 0.5},${y - H * 0.1} L${x + W * 0.5},${y - H * 0.55} Q${x + W * 0.52},${y - H * 0.72} ${x + W * 0.36},${y - H * 0.7} L${x + W * 0.32},${y - H * 0.1}Z`, { fill: shade(col, -0.1), ...K.bl(2.2) });
}
export function armchairBack(x, y, s = 1.2, col = C.mustardDark) {
  const W = 190 * s, H = 170 * s;
  return path(`M${x - W * 0.42},${y - H * 0.45} Q${x - W * 0.45},${y - H * 1.05} ${x},${y - H * 1.05} Q${x + W * 0.45},${y - H * 1.05} ${x + W * 0.42},${y - H * 0.45}Z`, { fill: col, ...K.bl(2.2) }) +
    path(`M${x - W * 0.34},${y - H * 0.42} L${x + W * 0.34},${y - H * 0.42} L${x + W * 0.34},${y - H * 0.22} L${x - W * 0.34},${y - H * 0.22}Z`, { fill: shade(col, 0.12), ...K.bl(2) });
}

// ---------------------------------------------------------------- stairs & landing (1200 × 1100)
export const STAIR = { x0: 150, y0: 1040, w: 80, h: 58 };
export const stairStep = (k) => [STAIR.x0 + k * STAIR.w + STAIR.w * 0.45, STAIR.y0 - k * STAIR.h];
export function stairs(o = {}) {
  let out = K.wallpaper(0, 0, 1200, 1100, '#6b5a44', { stripes: true, c2: '#5f4f3b' });
  // side-view staircase rising to the right (feet on step k at stairStep(k))
  const n = 12, x0 = STAIR.x0, y0 = STAIR.y0, sw = STAIR.w, sh = STAIR.h;
  let poly = `M${x0 - 40},1200 L${x0 - 40},${y0}`;
  for (let i = 0; i < n; i++) poly += ` L${x0 + i * sw},${y0 - i * sh} L${x0 + (i + 1) * sw},${y0 - i * sh} L${x0 + (i + 1) * sw},${y0 - (i + 1) * sh}`;
  poly += ` L1300,${y0 - n * sh} L1300,1200Z`;
  out += path(poly, { fill: '#6e4428', ...K.bl(2) });
  for (let i = 0; i < n; i++) out += rect(x0 + i * sw, y0 - i * sh - 6, sw, 12, { fill: C.burgundy, ...K.bl(1.2) }) + rect(x0 + (i + 1) * sw - 6, y0 - (i + 1) * sh, 6, sh, { fill: '#5a3620' });
  out += path(`M${x0 - 40},${y0 + 40} L1300,${y0 - n * sh + 40 + (1300 - x0 - n * sw) * 0} L1300,1200 L${x0 - 40},1200Z`, { fill: '#000', opacity: 0.08 });
  // banister & balusters
  const bh = 300;
  for (let i = 0; i < n; i++) out += rect(x0 + i * sw + sw * 0.4, y0 - i * sh - bh, 10, bh, { fill: '#5e3b22', ...K.bl(1.2) });
  out += path(`M${x0 - 20},${y0 - bh + 20} L${x0 + n * sw},${y0 - n * sh - bh + 30}`, { stroke: '#3e2716', 'stroke-width': 20, 'stroke-linecap': 'round' });
  out += rect(x0 - 40, y0 - bh - 20, 30, bh + 20, { fill: '#4a2e1b', ...K.bl(1.6) }) + circle(x0 - 25, y0 - bh - 26, 16, { fill: '#4a2e1b', ...K.bl(1.6) });
  out += K.frame(160, 180, 140, 180, rect(0, 0, 140, 180, { fill: '#7d8b6a' }) + circle(70, 70, 30, { fill: '#e8d6a6' }));
  out += K.frame(380, 120, 120, 90, rect(0, 0, 120, 90, { fill: '#5a6f8c' }));
  return out;
}

// ---------------------------------------------------------------- Harry's bedroom (1400 × 1100)
export function bedroom(o = {}) {
  let out = K.wallpaper(0, 0, 1400, FLOOR, '#3e4d66', { c2: '#36445b' });
  out += K.windowFrame(560, 170, 230, 320, { rain: true, night: o.night !== false, curtains: '#7a6a3a', seed: 8 });
  // shelves crammed with science books
  out += K.bookcase(40, 120, 260, 760, 'hb1', { shelves: 5, wood: '#6e4a2c' });
  out += K.bookcase(1100, 120, 260, 760, 'hb2', { shelves: 5, wood: '#6e4a2c' });
  // periodic table poster & star chart
  out += rect(360, 150, 150, 110, { fill: '#efe6cf', ...K.bl(1.6) });
  for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) if (!(r === 0 && c > 0 && c < 8) && !(r < 3 && c > 1 && c < 7 && r > 0 && false)) out += rect(368 + c * 15, 160 + r * 15, 12, 12, { fill: ['#d98a6a', '#e8c26a', '#8fb58a', '#8ab0d0', '#c49ad0'][(r + c) % 5], opacity: 0.85 });
  out += rect(850, 140, 160, 200, { fill: '#1d2a44', ...K.bl(1.6) });
  const R = rng(4); for (let i = 0; i < 26; i++) out += circle(860 + R() * 140, 150 + R() * 180, R.range(1, 2.6), { fill: '#f3e6b0' });
  out += path('M870,300 L910,250 L950,270 L990,200', { stroke: '#f3e6b0', 'stroke-width': 1, fill: 'none', opacity: 0.7 });
  out += rect(0, FLOOR - 12, 1400, 14, { fill: '#2f2217' });
  out += K.floorboards(0, FLOOR, 1400, 220, '#7c5434', 7);
  // bed (right)
  out += rect(880, 700, 380, 200, { fill: '#6e4a2c', ...K.bl(2) });
  out += rect(880, 650, 380, 90, { fill: '#2f4f86', ...K.bl(2), rx: 10 });
  out += path('M880,660 q60,-30 120,0 L1000,720 L880,720Z', { fill: '#efe6cf', ...K.bl(1.6) });
  // desk (left-centre)
  out += deskSet(560, FLOOR, o);
  out += K.glow(560, FLOOR - 250, 240, C.candle, 0.3);
  return out;
}
export function deskSet(x, y, o = {}) {
  let out = '';
  out += rect(x - 190, y - 250, 380, 22, { fill: '#7a4e2e', ...K.bl(2) });
  out += rect(x - 180, y - 228, 24, 228, { fill: '#5e3b22', ...K.bl(1.6) }) + rect(x + 156, y - 228, 24, 228, { fill: '#5e3b22', ...K.bl(1.6) });
  out += rect(x + 40, y - 228, 116, 90, { fill: '#6b4429', ...K.bl(1.6) }) + circle(x + 98, y - 184, 5, { fill: '#c9a24a' });
  out += K.bookPile(x - 130, y - 250, 4, 44, 0.7);
  if (o.candle !== false) out += K.candle(x + 130, y - 250, 1.2, true);
  out += rect(x - 60, y - 262, 120, 14, { fill: '#f7f3e8', ...K.bl(1.2), transform: `rotate(-3 ${x} ${y - 255})` });
  return out;
}

// ---------------------------------------------------------------- kitchen strip (1200 × 1100)
export function kitchen(o = {}) {
  let out = rect(0, 0, 1200, FLOOR, { fill: '#c9b58a' });
  for (let x = 0; x < 1200; x += 40) for (let y = 380; y < 620; y += 40) out += rect(x + 1, y + 1, 38, 38, { fill: (x / 40 + y / 40) % 2 ? '#e8e0cc' : '#dcd2ba', opacity: 0.9 });
  out += rect(0, 620, 1200, 280, { fill: '#6b8a70', ...K.bl(2) });
  for (let x = 20; x < 1200; x += 200) out += rect(x, 660, 170, 220, { fill: '#5f7d64', ...K.bl(1.6) }) + circle(x + 150, 770, 5, { fill: '#c9a24a' });
  out += rect(0, 600, 1200, 26, { fill: '#b89a6a', ...K.bl(2) });
  out += K.windowFrame(420, 110, 300, 230, { rain: true, night: o.night, cols: 3, rows: 2, frame: '#f1ead8' });
  // hanging pans
  for (let i = 0; i < 4; i++) out += circle(120 + i * 70, 250, 26, { fill: '#9a6a42', ...K.bl(1.6) }) + line(120 + i * 70, 180, 120 + i * 70, 224, K.bl(2));
  out += rect(830, 520, 90, 80, { fill: '#c65a24', ...K.bl(1.6), rx: 6 }) + ellipse(875, 520, 45, 10, { fill: '#a8481a', ...K.bl(1.4) });
  out += ellipse(875, 480, 50, 18, { fill: '#fff', opacity: 0.35, filter: 'url(#blur3)' });
  out += rect(0, FLOOR - 10, 1200, 200, { fill: '#8c7a5c' });
  return out;
}

// ---------------------------------------------------------------- back garden at dusk (2000 × 1300)
export function garden(o = {}) {
  const id = uid('gd');
  let out = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b4a70"/><stop offset="0.55" stop-color="#b98a8a"/><stop offset="0.85" stop-color="#f0bf86"/></linearGradient></defs>`;
  out += rect(-200, -600, 2400, 1500, { fill: `url(#${id})` });
  // clouds
  const R = rng(12);
  for (let i = 0; i < 9; i++) { const cx = R.range(-100, 2100), cy = R.range(-500, 300); out += ellipse(cx, cy, R.range(160, 320), R.range(30, 60), { fill: '#e8c2b8', opacity: 0.35 }) + ellipse(cx + 40, cy + 14, R.range(120, 240), R.range(20, 40), { fill: '#5d5a80', opacity: 0.25 }); }
  if (o.star) out += circle(1500, -300, 3, { fill: '#fff8d8' });
  // neighbouring roofs & chimneys
  for (let i = 0; i < 6; i++) { const x = -100 + i * 380; out += path(`M${x},560 L${x + 170},430 L${x + 340},560Z`, { fill: '#4a3d4c', ...K.bl(1.6) }) + rect(x + 50, 560, 260, 200, { fill: '#6b5a58', ...K.bl(1.6) }) + rect(x + 240, 440, 30, 70, { fill: '#5a4545', ...K.bl(1.4) }) + rect(x + 100, 610, 50, 60, { fill: i % 2 ? '#f0c878' : '#3c3a4a', ...K.bl(1.2) }); }
  // hedge & fence
  out += path(smoothD([[-200, 700], [0, 660], [200, 690], [400, 650], [600, 690], [800, 655], [1000, 690], [1200, 650], [1400, 690], [1600, 660], [1800, 690], [2200, 670], [2200, 800], [-200, 800]], false, 0.5) + 'Z', { fill: '#2f4a33', ...K.bl(1.8) });
  for (let x = 1100; x < 2200; x += 44) out += path(`M${x},820 L${x},640 L${x + 20},622 L${x + 40},640 L${x + 40},820Z`, { fill: '#8a6e50', ...K.bl(1.6) });
  out += rect(1100, 680, 1100, 16, { fill: '#6e5438', ...K.bl(1.4) }) + rect(1100, 770, 1100, 16, { fill: '#6e5438', ...K.bl(1.4) });
  // lawn
  out += rect(-200, 800, 2400, 700, { fill: '#4f7045' });
  out += rect(-200, 800, 2400, 60, { fill: '#3d5a38', opacity: 0.6 });
  for (let i = 0; i < 160; i++) { const x = R.range(-200, 2200), y = R.range(820, 1400); out += path(`M${x},${y} l-3,-12 M${x + 4},${y} l2,-14`, { stroke: '#3a5634', 'stroke-width': 2 }); }
  // puddles reflecting the sky
  for (const [px, py, pw] of [[500, 1050, 180], [1300, 1180, 240], [900, 950, 120]]) out += ellipse(px, py, pw, pw * 0.16, { fill: '#b9a0a8', ...K.bl(1.4) }) + ellipse(px - pw * 0.2, py - 2, pw * 0.4, pw * 0.04, { fill: '#f0d0b0', opacity: 0.7 });
  // back door & house wall on the left
  out += rect(-200, 200, 380, 900, { fill: '#8f6a55', ...K.bl(2) });
  out += K.brickWall(-190, 210, 360, 880, '#8a4a36', 6);
  out += K.door(20, 560, 130, 330, '#2f4a33');
  out += rect(20 + 12, 560 + 20, 106, 120, { fill: '#f0c878', opacity: 0.8 });
  out += K.glow(80, 700, 200, C.candle, 0.25);
  return out;
}

// ---------------------------------------------------------------- the house from the street, raining (1600 × 1200)
export function houseExterior(o = {}) {
  const id = uid('ex');
  let out = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3550"/><stop offset="1" stop-color="#5d6a80"/></linearGradient></defs>`;
  out += rect(-100, -200, 1800, 1500, { fill: `url(#${id})` });
  // terrace of Victorian houses
  for (let i = 0; i < 3; i++) {
    const x = -60 + i * 560;
    out += path(`M${x},330 L${x + 280},170 L${x + 560},330Z`, { fill: '#3b3444', ...K.bl(2) });
    out += rect(x + 380, 150, 50, 110, { fill: '#5a4545', ...K.bl(1.6) }) + rect(x + 372, 140, 66, 16, { fill: '#4a3a3a', ...K.bl(1.4) });
    out += rect(x, 330, 560, 700, { fill: '#8f5a44', ...K.bl(2) });
    out += K.brickWall(x + 4, 334, 552, 690, '#8a4a36', 20 + i);
    // bay window & upper windows
    const lit = i === 1;
    for (const wx of [x + 60, x + 330]) {
      out += rect(wx, 400, 150, 190, { fill: '#e9e0cc', ...K.bl(1.8) }) + rect(wx + 10, 410, 130, 170, { fill: lit ? '#f3c66f' : '#2b3550', ...K.bl(1.4) }) + line(wx + 75, 410, wx + 75, 580, { stroke: '#e9e0cc', 'stroke-width': 6 }) + line(wx + 10, 495, wx + 140, 495, { stroke: '#e9e0cc', 'stroke-width': 6 });
      if (lit) out += K.glow(wx + 75, 495, 140, C.candle, 0.35);
    }
    out += rect(x + 50, 680, 250, 250, { fill: '#e9e0cc', ...K.bl(1.8) }) + rect(x + 64, 694, 222, 222, { fill: lit ? '#f7c86a' : '#2b3550', ...K.bl(1.4) });
    for (let k = 1; k < 3; k++) out += line(x + 64 + k * 74, 694, x + 64 + k * 74, 916, { stroke: '#e9e0cc', 'stroke-width': 6 });
    if (lit) out += K.glow(x + 175, 800, 200, C.candle, 0.4) + rect(x + 70, 750, 210, 160, { fill: '#6b4429', opacity: 0.35 });
    out += K.door(x + 380, 700, 120, 250, ['#2f4a33', '#7b2433', '#243352'][i]);
    out += rect(x + 360, 950, 160, 20, { fill: '#7a7266', ...K.bl(1.4) });
  }
  out += rect(-100, 1030, 1800, 300, { fill: '#3a3a44' });
  for (let i = 0; i < 30; i++) out += ellipse(i * 60, 1100 + (i % 3) * 40, 40, 5, { fill: '#8a9ab8', opacity: 0.35 });
  // street lamp
  out += rect(1420, 520, 14, 520, { fill: '#1f2430', ...K.bl(1.4) }) + path('M1398,520 L1456,520 L1446,470 L1408,470Z', { fill: '#f3d27a', ...K.bl(1.6) }) + K.glow(1427, 500, 160, '#f3d27a', 0.45);
  if (o.rain !== false) out += K.rainOverlay(1600, 1200, 5, 1.3, 0.55).replace(/<line /g, '<line transform="translate(0,0)" ');
  return out;
}

// ---------------------------------------------------------------- cold open: moonlit night
export function moonNight(o = {}) {
  const id = uid('mn');
  let out = `<defs><radialGradient id="${id}" cx="0.7" cy="0.25" r="0.9"><stop offset="0" stop-color="#2c3a5c"/><stop offset="0.5" stop-color="#121a30"/><stop offset="1" stop-color="#05070e"/></radialGradient></defs>`;
  out += rect(0, 0, 1600, 1600, { fill: `url(#${id})` });
  const R = rng(o.seed || 3);
  for (let i = 0; i < 90; i++) out += circle(R() * 1600, R() * 1600, R.range(0.6, 2), { fill: '#e9eed8', opacity: R.range(0.3, 0.9) });
  out += circle(o.moonX ?? 1100, o.moonY ?? 380, 150, { fill: C.moon, opacity: 0.25, filter: 'url(#glow)' });
  out += circle(o.moonX ?? 1100, o.moonY ?? 380, 90, { fill: '#eef0dc' });
  out += circle((o.moonX ?? 1100) - 25, (o.moonY ?? 380) - 20, 18, { fill: '#d9dcc4' }) + circle((o.moonX ?? 1100) + 30, (o.moonY ?? 380) + 25, 12, { fill: '#d9dcc4' });
  return out;
}

// ---------------------------------------------------------------- the front doorstep, at character scale (1600 × 1200)
// The open door is at x 700–1000; floor/step at y = 980. Inside (left) is warm; outside (right) is rain.
export function doorstep(o = {}) {
  const id = uid('ds');
  let out = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141b2e"/><stop offset="1" stop-color="#34405a"/></linearGradient></defs>`;
  out += rect(-200, -200, 2000, 1600, { fill: `url(#${id})` });
  out += K.brickWall(-200, 0, 2000, 1000, '#7a4232', 31);
  out += rect(-200, 0, 2000, 1000, { fill: '#0b1020', opacity: 0.45 });
  // doorway
  out += rect(660, 190, 380, 800, { fill: '#e9e0cc', ...K.bl(2.4) });
  out += rect(690, 220, 320, 770, { fill: '#f0c878' });
  out += K.glow(850, 600, 520, C.candle, 0.45);
  out += K.wallpaper(690, 220, 320, 770, '#6b5a44', { stripes: true, c2: '#5f4f3b' }).replace('<rect', '<rect opacity="0.55"');
  out += rect(690, 220, 320, 770, { fill: '#f7c86a', opacity: 0.35 });
  // open door leaf
  out += path('M1010,220 L1090,180 L1090,1010 L1010,990Z', { fill: '#2f4a33', ...K.bl(2) });
  out += circle(1070, 610, 7, { fill: '#c9a24a' });
  out += rect(640, 990, 420, 26, { fill: '#8a8272', ...K.bl(2) }); // step
  out += path('M650,1016 L1050,1016 L1300,1300 L400,1300Z', { fill: '#f0c878', opacity: 0.18 });
  out += rect(-200, 1016, 2000, 400, { fill: '#2b2f3c' });
  out += rect(730, 100, 240, 60, { fill: '#e9e0cc', ...K.bl(1.6) }) + text(850, 142, '17', { 'font-family': 'IM Fell English', 'font-size': 36, fill: C.ink, 'text-anchor': 'middle' });
  if (o.rain !== false) {
    const R = rng(71); let r = '';
    for (let i = 0; i < 260; i++) { const x = R.range(-200, 1800), y = R.range(-200, 1300); if (x > 660 && x < 1040 && y > 190 && y < 990) continue; r += line(x, y, x - 8, y + R.range(30, 60), { stroke: '#cfe0ee', 'stroke-width': R.range(1.2, 2.4), opacity: R.range(0.35, 0.7) }); }
    out += r;
  }
  return out;
}

// kitchen with the dinner table in front (for the silent dinner)
export function dinner(o = {}) { return kitchen(o) + dinnerTable(); }
export function dinnerTable() {
  let out = '';
  out += rect(250, 850, 900, 34, { fill: '#8a5d38', ...K.bl(2.2), rx: 4 });
  out += path('M240,852 L1160,852 L1180,930 L220,930Z', { fill: '#efe6d2', ...K.bl(1.8) });
  for (const x of [380, 700, 1020]) out += ellipse(x, 850, 70, 14, { fill: '#f6f1e6', ...K.bl(1.6) }) + ellipse(x, 846, 40, 8, { fill: '#a0522d', opacity: 0.8 });
  out += K.candle(560, 846, 1.1, true) + K.candle(840, 846, 1.1, true);
  return out;
}
