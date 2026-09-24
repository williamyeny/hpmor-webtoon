// King's Cross (Muggle side) and Platform Nine-and-Three-Quarters, plus the newspaper/Comed-Tea stall.
import { C } from '../core/palette.js';
import { g, path, rect, circle, ellipse, line, polygon, text, smoothD, rng, shade, mixHex, uid, r2 } from '../core/svg.js';
import * as K from './kit.js';
const bl = K.bl;
export const FLOOR = 900;

// ---------------------------------------------------------------- King's Cross: iron arches, skylight, platforms 9 & 10 (2400 × 1200)
export function kingsCross(o = {}) {
  let out = rect(-300, -600, 3000, 2000, { fill: '#9aa6ae' });
  // glazed roof arches
  for (let i = 0; i < 5; i++) { const cx = -100 + i * 700; out += path(`M${cx - 380},200 Q${cx},-700 ${cx + 380},200`, { fill: '#c9d3d8', stroke: '#4a5058', 'stroke-width': 10 }); for (let k = -3; k <= 3; k++) out += path(`M${cx + k * 100},${-400 + Math.abs(k) * 70} L${cx + k * 110},200`, { stroke: '#4a5058', 'stroke-width': 4 }); }
  out += K.lightShaft(900, -500, 400, 900, FLOOR, 900, '#fff8e0', 0.2);
  // brick wall at the back with the barrier (pillar between platforms 9 & 10 at x≈1200)
  out += K.brickWall(-300, 200, 3000, 700, '#8a5a44', 11);
  out += rect(1110, 200, 180, 700, { fill: '#7a4a38', ...bl(2.2) }) + K.brickWall(1114, 204, 172, 692, '#7a4232', 12);
  out += rect(700, 300, 160, 80, { fill: '#1d3a5a', ...bl(2) }) + text(780, 358, '9', { 'font-family': 'Alegreya Sans', 'font-weight': 800, 'font-size': 60, fill: '#f1e6cc', 'text-anchor': 'middle' });
  out += rect(1540, 300, 160, 80, { fill: '#1d3a5a', ...bl(2) }) + text(1620, 358, '10', { 'font-family': 'Alegreya Sans', 'font-weight': 800, 'font-size': 60, fill: '#f1e6cc', 'text-anchor': 'middle' });
  // clock
  out += circle(1200, 100, 70, { fill: '#f3ead3', ...bl(3) }) + line(1200, 100, 1200, 50, bl(4)) + line(1200, 100, 1236, 110, bl(4));
  // platform floor with tiles
  out += rect(-300, FLOOR, 3000, 500, { fill: '#b9b2a2' });
  for (let x = -300; x < 2700; x += 90) out += line(x, FLOOR, x - 60, FLOOR + 500, bl(1, { opacity: 0.35 }));
  for (let y = FLOOR + 30; y < FLOOR + 500; y += 50) out += line(-300, y, 2700, y, bl(1, { opacity: 0.3 }));
  out += rect(-300, FLOOR + 420, 3000, 24, { fill: '#e6c34a' });
  return out;
}

// ---------------------------------------------------------------- the Hogwarts Express (engine drawn at x, y = rail level)
export function engine(x, y, s = 1) {
  let out = '';
  const R = (a, b, c, d, f, w = 2.4) => rect(x + a * s, y + b * s, c * s, d * s, { fill: f, ...bl(w) });
  out += R(-520, -300, 700, 230, '#9a1e22') + R(-520, -300, 700, 30, '#6e1418');
  out += path(`M${x + 180 * s},${y - 290 * s} L${x + 420 * s},${y - 290 * s} Q${x + 470 * s},${y - 200 * s} ${x + 420 * s},${y - 70 * s} L${x + 180 * s},${y - 70 * s}Z`, { fill: '#8a1a1e', ...bl(2.4) });
  out += R(-500, -470, 300, 180, '#9a1e22') + R(-470, -440, 100, 90, '#f3c66f', 1.8) + R(-340, -440, 100, 90, '#f3c66f', 1.8);
  out += R(250, -470, 70, 180, '#2a2a2a') + R(235, -500, 100, 36, '#3a3a3a');
  out += circle(x + 430 * s, y - 180 * s, 60 * s, { fill: '#2a2a2a', ...bl(2.4) }) + circle(x + 430 * s, y - 180 * s, 30 * s, { fill: '#e7bb4f', ...bl(1.6) });
  out += text(x - 170 * s, y - 160 * s, 'HOGWARTS EXPRESS', { 'font-family': 'IM Fell English SC', 'font-size': 44 * s, fill: '#e7bb4f', 'text-anchor': 'middle' });
  for (const wx of [-440, -280, -100, 80, 300]) out += circle(x + wx * s, y - 40 * s, 70 * s, { fill: '#2a2020', ...bl(2.4) }) + circle(x + wx * s, y - 40 * s, 22 * s, { fill: '#b0713b' }) + [0, 60, 120].map((a) => line(x + wx * s - Math.cos(a / 57.3) * 60 * s, y - 40 * s - Math.sin(a / 57.3) * 60 * s, x + wx * s + Math.cos(a / 57.3) * 60 * s, y - 40 * s + Math.sin(a / 57.3) * 60 * s, { stroke: '#8a1a1e', 'stroke-width': 6 * s })).join('');
  out += line(x - 440 * s, y - 40 * s, x + 300 * s, y - 40 * s, { stroke: '#8a8f96', 'stroke-width': 10 * s });
  // steam
  const Rn = rng(3); for (let i = 0; i < 9; i++) out += circle(x + 285 * s + Rn.range(-60, 200) * s, y - 560 * s - i * 60 * s, (60 + i * 18) * s, { fill: '#f4f1ea', opacity: 0.55 - i * 0.04 });
  return out;
}
export function carriage(x, y, s = 1, seed = 1) {
  let out = rect(x - 400 * s, y - 380 * s, 800 * s, 330 * s, { fill: '#9a1e22', ...bl(2.4), rx: 12 });
  out += rect(x - 400 * s, y - 400 * s, 800 * s, 30 * s, { fill: '#2a2a2a', ...bl(2), rx: 10 });
  const R = rng('car' + seed);
  for (let i = 0; i < 5; i++) { const wx = x - 370 * s + i * 150 * s; out += rect(wx, y - 330 * s, 110 * s, 110 * s, { fill: R.chance(0.6) ? '#f3c66f' : '#3a4a5a', ...bl(1.8), rx: 6 }); }
  out += rect(x - 400 * s, y - 180 * s, 800 * s, 16 * s, { fill: '#e7bb4f' });
  for (const wx of [-300, 300]) out += circle(x + wx * s, y - 40 * s, 44 * s, { fill: '#2a2020', ...bl(2) });
  return out;
}
export function platform934(o = {}) {
  let out = rect(-400, -700, 3600, 2200, { fill: '#aebfcc' });
  for (let i = 0; i < 6; i++) { const cx = -100 + i * 650; out += path(`M${cx - 330},100 Q${cx},-600 ${cx + 330},100`, { fill: 'none', stroke: '#4a5058', 'stroke-width': 10 }); }
  out += rect(-400, 100, 3600, 30, { fill: '#4a5058' });
  out += K.lightShaft(1400, -600, 500, 1300, 900, 1000, '#fff8e0', 0.18);
  // the train along the back
  out += carriage(-300, 820, 1, 1) + carriage(560, 820, 1, 2) + engine(1720, 820, 1.05) + carriage(2560, 820, 1, 3);
  out += rect(-400, 820, 3600, 20, { fill: '#5a5a5a' });
  out += rect(-400, FLOOR - 60, 3600, 700, { fill: '#b9ad92' }) + rect(-400, FLOOR - 60, 3600, 16, { fill: '#8a8272' });
  for (let x = -400; x < 3200; x += 120) out += line(x, FLOOR - 44, x - 80, FLOOR + 600, bl(1, { opacity: 0.3 }));
  // wrought-iron archway sign
  out += path('M-60,900 L-60,320 Q100,200 260,320 L260,900', { fill: 'none', stroke: '#2a2a30', 'stroke-width': 16 }) + rect(-20, 250, 240, 64, { fill: '#1d3a5a', ...bl(2) }) + text(100, 294, '9¾', { 'font-family': 'IM Fell English', 'font-size': 46, fill: '#e7bb4f', 'text-anchor': 'middle' });
  return out;
}
// newspaper & Comed-Tea stall (x centre, y floor)
export function comedStall(x, y, o = {}) {
  let out = rect(x - 220, y - 120, 440, 130, { fill: '#6b4429', ...bl(2) }) + rect(x - 230, y - 140, 460, 26, { fill: '#8a5d38', ...bl(2) });
  out += line(x - 210, y - 140, x - 210, y - 440, bl(5)) + line(x + 210, y - 140, x + 210, y - 440, bl(5));
  let d = ''; for (let i = 0; i < 10; i++) d += `M${x - 230 + i * 46},${y - 450} l46,0 l-4,56 l-38,0Z `;
  out += path(d, { fill: '#2f5a40', ...bl(1.4) }) + path(d.split('Z').filter((_, i) => i % 2).join('Z') + 'Z', { fill: '#efe2c4' });
  // pyramid of neon-green cans
  for (let r = 0; r < 4; r++) for (let k = 0; k <= r; k++) { const cx = x + 90 + (k - r / 2) * 30, cy = y - 150 - (3 - r) * 42; out += rect(cx - 13, cy - 38, 26, 38, { fill: '#7dff5a', ...bl(1.2), rx: 4 }) + rect(cx - 13, cy - 26, 26, 8, { fill: '#2a8a2a' }); }
  // newspapers on a rack
  out += rect(x - 200, y - 330, 150, 180, { fill: '#5a3a22', ...bl(1.6) });
  if (o.quibbler !== false) out += g({ transform: `translate(${x - 125},${y - 250}) rotate(-3)` }, rect(-64, -76, 128, 150, { fill: '#f4ecd8', ...bl(1.4) }), text(0, -48, 'THE QUIBBLER', { 'font-family': 'UnifrakturMaguntia', 'font-size': 16, 'text-anchor': 'middle', fill: C.ink }), rect(-50, -34, 100, 50, { fill: '#b9ad92' }), path('M-50,30 h100 M-50,42 h80 M-50,54 h90', { stroke: '#8a7d68', 'stroke-width': 3 }));
  out += rect(x - 30, y - 330, 80, 100, { fill: '#e9e0cc', ...bl(1.2) }) + text(x + 10, y - 300, 'COMED-TEA', { 'font-family': 'Alegreya Sans', 'font-weight': 800, 'font-size': 14, 'text-anchor': 'middle', fill: '#2a8a2a' }) + text(x + 10, y - 280, '5 Knuts', { 'font-family': 'Caveat', 'font-size': 20, 'text-anchor': 'middle', fill: C.ink });
  return out;
}
export function picnicTable(x, y) {
  return rect(x - 180, y - 120, 360, 22, { fill: '#8a5d38', ...bl(2) }) + rect(x - 150, y - 98, 16, 98, { fill: '#6b4429', ...bl(1.4) }) + rect(x + 134, y - 98, 16, 98, { fill: '#6b4429', ...bl(1.4) });
}
// the Quibbler front page, large (centred)
export function quibblerPage(o = {}) {
  let out = rect(-210, -270, 420, 540, { fill: '#f4ecd8', ...bl(2) });
  out += text(0, -210, 'THE QUIBBLER', { 'font-family': 'UnifrakturMaguntia', 'font-size': 52, 'text-anchor': 'middle', fill: C.ink });
  out += line(-190, -190, 190, -190, bl(2));
  out += text(0, -130, 'Boy-Who-Lived Gets', { 'font-family': 'IM Fell English SC', 'font-size': 38, 'text-anchor': 'middle', fill: C.ink });
  out += text(0, -80, 'Draco Malfoy Pregnant', { 'font-family': 'IM Fell English SC', 'font-size': 38, 'text-anchor': 'middle', fill: C.ink });
  out += rect(-180, -50, 360, 180, { fill: '#b9ad92', ...bl(1.4) }) + circle(-60, 20, 40, { fill: '#8a7d68' }) + circle(60, 20, 40, { fill: '#d9cba0' }) + path('M-20,40 Q0,70 20,40', { fill: 'none', stroke: '#c43a32', 'stroke-width': 4 }) + path('M-4,30 l4,-6 l4,6 l-4,8Z', { fill: '#c43a32' });
  for (let i = 0; i < 6; i++) out += line(-180, 160 + i * 16, 180 - (i % 3) * 40, 160 + i * 16, { stroke: '#8a7d68', 'stroke-width': 4 });
  return out;
}
