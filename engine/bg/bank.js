// Gringotts inside: the banking hall, the mine-cart tunnels, the Potter vault. Plus the little Moke Shop
// and a narrow side alley off Diagon Alley.
import { C } from '../core/palette.js';
import { g, path, rect, circle, ellipse, line, polygon, text, smoothD, rng, shade, mixHex, uid, r2 } from '../core/svg.js';
import * as K from './kit.js';
const bl = K.bl;
export const FLOOR = 900;

// ---------------------------------------------------------------- the banking hall (2400 × 1200)
export function bankHall(o = {}) {
  let out = rect(-300, -600, 3000, 2000, { fill: '#d9d4c6' });
  // marble walls with pilasters and arched windows
  for (let i = 0; i < 7; i++) { const x = -100 + i * 400; out += rect(x, -500, 60, 1400, { fill: '#ece8de', ...bl(1.6) }); out += path(`M${x + 110},${-100} L${x + 110},${-380} Q${x + 230},${-520} ${x + 350},${-380} L${x + 350},${-100}Z`, { fill: '#aebfcc', ...bl(1.8) }) + K.lightShaft(x + 230, -380, 200, x + 180, FLOOR, 420, '#fff6dd', 0.18); }
  // chandeliers
  for (const cx of [500, 1300, 2100]) { out += line(cx, -600, cx, -250, bl(2)) + ellipse(cx, -240, 130, 26, { fill: '#b08d45', ...bl(2) }); for (let k = -3; k <= 3; k++) out += K.candle(cx + k * 36, -250, 0.7, true); }
  // long high counter with goblin clerks (drawn by episode as actors behind the counter)
  out += rect(-300, 740, 3000, 20, { fill: '#8a6a3a' });
  out += rect(-300, 900, 3000, 400, { fill: '#b9b2a2' });
  for (let i = 0; i < 30; i++) out += rect(-300 + i * 110, 900, 110, 400, { fill: i % 2 ? '#c9c2b2' : '#aaa393', opacity: 0.8 });
  return out;
}
export function bankCounter() {
  let out = rect(-300, 560, 3000, 36, { fill: '#6b4429', ...bl(2) }) + rect(-300, 596, 3000, 420, { fill: '#8a5d38', ...bl(2) });
  for (let i = 0; i < 12; i++) out += rect(-280 + i * 260, 630, 220, 360, { fill: '#7a4e2e', ...bl(1.4) });
  // ledgers, scales, quills, jewels on the counter
  const R = rng(3);
  for (let i = 0; i < 10; i++) { const x = -200 + i * 300; out += rect(x, 520, 120, 40, { fill: R.pick([C.burgundy, C.forest, C.navy]), ...bl(1.4) }) + rect(x + 6, 514, 108, 8, { fill: '#f1e6cc', ...bl(1) }); if (i % 2) out += line(x + 180, 450, x + 180, 560, bl(2)) + line(x + 140, 470, x + 220, 470, bl(2)) + ellipse(x + 140, 490, 24, 6, { fill: '#b08d45', ...bl(1.2) }) + ellipse(x + 220, 480, 24, 6, { fill: '#b08d45', ...bl(1.2) }); }
  return out;
}

// ---------------------------------------------------------------- the tunnels (a rushing mine cart), 1600 × 1200
export function tunnel(o = {}) {
  const R = rng(o.seed || 8);
  let out = rect(-300, -300, 2200, 1800, { fill: '#1a1512' });
  // rock layers
  for (let i = 0; i < 40; i++) { const x = R.range(-300, 1900), y = R.range(-300, 1500), r = R.range(60, 200); out += path(smoothD(Array.from({ length: 8 }, (_, k) => [x + Math.cos(k / 8 * 6.28) * r * R.range(0.7, 1.2), y + Math.sin(k / 8 * 6.28) * r * R.range(0.5, 0.9)]), true), { fill: R.pick(['#2a221c', '#332a22', '#241e19']), stroke: '#0f0c0a', 'stroke-width': 3 }); }
  // stalactites
  for (let i = 0; i < 24; i++) { const x = R.range(-300, 1900), L = R.range(80, 260); out += polygon([[x - 26, -300], [x + 26, -300], [x, -300 + L]], { fill: '#3a2f27', ...bl(1.6) }); }
  // torches
  for (let i = 0; i < 4; i++) { const x = 100 + i * 450, y = 200 + (i % 2) * 120; out += rect(x - 6, y, 12, 50, { fill: '#6b4429' }) + path(`M${x},${y - 40} q16,20 0,40 q-16,-20 0,-40Z`, { fill: '#f0a13c' }) + K.glow(x, y - 20, 260, C.ember, 0.55); }
  // rails, receding at an angle
  out += path('M-300,1150 L1900,700', { stroke: '#8a8f96', 'stroke-width': 10 }) + path('M-300,1300 L1900,820', { stroke: '#8a8f96', 'stroke-width': 10 });
  for (let i = 0; i < 18; i++) { const x = -300 + i * 130; out += line(x, 1150 - i * 26 + 0, x + 20, 1300 - i * 29, { stroke: '#4a3a2a', 'stroke-width': 12 }); }
  if (o.dragon) out += g({ opacity: 0.5 }, path('M1500,300 Q1650,150 1850,260 Q1750,250 1700,320 Q1800,380 1900,360 Q1760,440 1620,380Z', { fill: '#0c0a08' }), circle(1560, 300, 8, { fill: '#e8a23a' }));
  return out;
}
export function mineCart(x, y, s = 1) {
  return g({ transform: `translate(${x},${y}) scale(${s})` },
    path('M-230,-150 L230,-150 L200,40 L-200,40Z', { fill: '#5a4a3a', ...bl(2.4) }),
    rect(-230, -168, 460, 26, { fill: '#6b5a48', ...bl(2) }),
    ...[-170, -60, 50, 160].map((dx) => circle(dx, -60, 8, { fill: '#8a8f96', ...bl(1.2) })),
    circle(-140, 50, 42, { fill: '#2a2a2a', ...bl(2) }), circle(140, 50, 42, { fill: '#2a2a2a', ...bl(2) }), circle(-140, 50, 12, { fill: '#8a8f96' }), circle(140, 50, 12, { fill: '#8a8f96' }));
}

// ---------------------------------------------------------------- the Potter vault (1800 × 1200)
export function coinHeap(cx, baseY, w, h, seed = 1, n = 700) {
  const R = rng(seed);
  let out = path(`M${cx - w / 2},${baseY} Q${cx - w * 0.2},${baseY - h * 1.1} ${cx},${baseY - h} Q${cx + w * 0.2},${baseY - h * 1.1} ${cx + w / 2},${baseY}Z`, { fill: '#c9922e', stroke: '#8a5a1a', 'stroke-width': 3 });
  const cols = ['#e7bb4f', '#f0c860', '#d9a53a', '#f7dc8c', '#c0c4c8', '#b0713b'];
  for (let i = 0; i < n; i++) {
    const t = R(), u = R() * 2 - 1;
    const y = baseY - Math.pow(t, 0.8) * h * (1 - Math.abs(u) * 0.95);
    const x = cx + u * w / 2 * (1 - Math.pow(t, 1.5) * 0.3);
    const col = R() < 0.9 ? R.pick(cols.slice(0, 4)) : R.pick(cols.slice(4));
    out += ellipse(x, y, 11, 5, { fill: col, stroke: '#8a5a1a', 'stroke-width': 1 });
  }
  for (let i = 0; i < 40; i++) { const x = cx + R.range(-w / 2.5, w / 2.5), y = baseY - R.range(0, h * 0.9) * (1 - Math.abs(x - cx) / w); out += path(`M${x - 8},${y} L${x + 8},${y} M${x},${y - 8} L${x},${y + 8}`, { stroke: '#fff9e0', 'stroke-width': 2, opacity: 0.8 }); }
  return out;
}
export function vault(o = {}) {
  let out = rect(-300, -300, 2400, 1800, { fill: '#2a241f' });
  out += K.stoneWall(-300, -200, 2400, 1110, '#5f5b52', 21, { bh: 60, minW: 90, maxW: 170 });
  out += rect(-300, -200, 2400, 1110, { fill: '#1a120a', opacity: 0.35 });
  out += rect(-300, FLOOR, 2400, 600, { fill: '#3a332c' });
  out += K.glow(900, 500, 900, '#f7c86a', 0.4);
  out += coinHeap(300, FLOOR + 60, 620, 380, 1) + coinHeap(1500, FLOOR + 40, 700, 440, 2) + coinHeap(900, FLOOR + 10, 800, 520, 3) + coinHeap(-100, FLOOR + 90, 500, 260, 4) + coinHeap(1950, FLOOR + 80, 500, 280, 5);
  // silver & bronze piles in front
  out += g({ transform: 'translate(0,0)' }, ...Array.from({ length: 30 }, (_, i) => ellipse(200 + i * 55, FLOOR + 170 + (i % 3) * 12, 12, 5, { fill: i % 2 ? '#c0c4c8' : '#b0713b', stroke: '#5a4a3a', 'stroke-width': 1 })));
  return out;
}
export function vaultDoor(open = true) {
  // round vault door frame (for the "doorway" shot); x 700–1100
  let out = rect(-300, -300, 2400, 1800, { fill: '#2a2320' });
  out += K.stoneWall(-300, -300, 2400, 1300, '#6a655a', 31, { bh: 70, minW: 100, maxW: 180 });
  out += circle(900, 500, 380, { fill: '#3a3530', ...bl(3) });
  if (open) out += circle(900, 500, 340, { fill: '#f0c050' }) + K.glow(900, 500, 600, '#ffd76a', 0.7);
  else out += circle(900, 500, 340, { fill: '#6b5a48', ...bl(2) }) + ellipse(900, 500, 60, 60, { fill: '#b08d45', ...bl(2) });
  out += rect(-300, 1000, 2400, 500, { fill: '#3a3530' });
  return out;
}

// ---------------------------------------------------------------- the Moke Shop (1400 × 1100): tiny, crammed, cute
export function mokeShop(o = {}) {
  const R = rng(4);
  let out = K.wallpaper(-200, -200, 1800, 1100, '#8a6a3a', { c2: '#7a5c30' });
  for (let s = 0; s < 3; s++) { out += rect(-100, 120 + s * 220, 1600, 18, { fill: '#6b4429', ...bl(1.6) }); for (let i = 0; i < 16; i++) { const x = -60 + i * 100 + R.range(-10, 10), y = 120 + s * 220; const c = R.pick(['#8a5a3a', '#6a5a4a', '#a0785a', '#5a6a4a', '#7a4a5a']); out += path(`M${x - 30},${y - 10} Q${x - 36},${y - 90} ${x},${y - 96} Q${x + 36},${y - 90} ${x + 30},${y - 10}Z`, { fill: c, ...bl(1.4) }) + path(`M${x - 18},${y - 80} q18,10 36,0`, { fill: 'none', stroke: shade(c, -0.4), 'stroke-width': 3 }); } }
  out += rect(-200, FLOOR - 10, 1800, 12, { fill: '#3e2716' }) + K.floorboards(-200, FLOOR, 1800, 400, '#7a5434', 44);
  out += rect(200, 640, 700, 60, { fill: '#6b4429', ...bl(2) }) + rect(220, 700, 660, 300, { fill: '#5a3a22', ...bl(2) });
  out += K.glow(700, 300, 600, C.candle, 0.3);
  return out;
}
export const mokeCounter = () => rect(200, 640, 700, 60, { fill: '#6b4429', ...bl(2) }) + rect(220, 700, 660, 330, { fill: '#5a3a22', ...bl(2) });

// ---------------------------------------------------------------- a narrow side alley (1400 × 1200)
export function sideAlley(o = {}) {
  let out = rect(-300, -400, 2000, 1800, { fill: '#b9c3cc' });
  out += K.brickWall(-300, -300, 700, 1200, '#6a4a3a', 71) + K.brickWall(1000, -300, 700, 1200, '#7a4a3a', 72);
  out += rect(400, -300, 600, 1200, { fill: '#8a8074' }) + K.brickWall(400, 100, 600, 800, '#5a4034', 73);
  out += rect(400, 100, 600, 800, { fill: '#1a1210', opacity: 0.35 });
  out += rect(-300, -300, 700, 1200, { fill: '#1a1210', opacity: 0.2 }) + rect(1000, -300, 700, 1200, { fill: '#1a1210', opacity: 0.3 });
  out += rect(-300, 900, 2000, 500, { fill: '#6d665c' });
  const R = rng(9);
  for (let i = 0; i < 30; i++) { const x = R.range(-200, 1500), y = R.range(910, 1300); out += path(`M${x},${y} q8,-10 16,0 q-8,8 -16,0Z`, { fill: R.pick(['#b0713b', '#c9922e', '#8a5a2a']), opacity: 0.9 }); }
  return out;
}
