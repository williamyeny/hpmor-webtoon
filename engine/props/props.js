// Hand-held and set-dressing props. Drawn centred at (0,0) unless noted; scale with transforms.
import { C } from '../core/palette.js';
import { g, path, rect, circle, ellipse, line, text, smoothD, rng, shade, uid, r2, escText } from '../core/svg.js';

const INK = C.ink;
const S = (fill, w = 2.2) => ({ fill, stroke: INK, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });

// Hogwarts-style envelope: yellowish parchment, emerald ink, red wax seal
export function envelope(o = {}) {
  const w = o.w ?? 160, h = o.h ?? 104;
  const back = o.back;
  let out = rect(-w / 2, -h / 2, w, h, { ...S('#eadcae'), rx: 3 });
  out += rect(-w / 2, -h / 2, w, h, { fill: 'url(#none)', opacity: 0 });
  if (back) {
    out += path(`M${-w / 2},${-h / 2} L0,${h * 0.08} L${w / 2},${-h / 2}`, { fill: '#e2d09c', stroke: INK, 'stroke-width': 1.6 });
    out += seal(0, h * 0.06, h * 0.2, o.sealText);
  } else {
    out += text(0, -h * 0.02, o.to || 'Mr H. Potter', { 'font-family': 'Pinyon Script', 'font-size': h * 0.22, fill: '#1d5a3a', 'text-anchor': 'middle' });
    if (o.addr !== false) {
      out += text(0, h * 0.2, o.addr || 'The Smallest Bedroom', { 'font-family': 'Pinyon Script', 'font-size': h * 0.13, fill: '#1d5a3a', 'text-anchor': 'middle', opacity: 0.9 });
    }
  }
  out += rect(-w / 2, -h / 2, w, h, { fill: 'none', stroke: '#b89e62', 'stroke-width': 1, opacity: 0.6, rx: 3, transform: 'scale(0.96)' });
  return g({ transform: o.rot ? `rotate(${o.rot})` : undefined }, out);
}

export function seal(x, y, r, letter = 'H') {
  const R = rng(Math.round(r * 7));
  const pts = [];
  for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2; const k = 1 + (R() - 0.5) * 0.22; pts.push([x + Math.cos(a) * r * k, y + Math.sin(a) * r * k]); }
  return path(smoothD(pts, true, 0.6), { fill: '#9c1f25', stroke: '#5a0f13', 'stroke-width': 1.4 }) +
    circle(x, y, r * 0.66, { fill: '#b52a2f', stroke: '#6b1216', 'stroke-width': 1 }) +
    text(x, y + r * 0.26, letter, { 'font-family': 'IM Fell English SC', 'font-size': r * (letter.length > 2 ? 0.34 : 0.8), fill: '#6b1216', 'text-anchor': 'middle' }) +
    ellipse(x - r * 0.3, y - r * 0.35, r * 0.22, r * 0.12, { fill: '#fff', opacity: 0.35 });
}

// A sheet of paper/parchment with lines of text (for letters shown in-panel)
export function sheet(o = {}) {
  const w = o.w ?? 300, h = o.h ?? 380;
  const col = o.parchment ? '#eddcae' : '#f7f3e8';
  let out = path(`M${-w / 2},${-h / 2} L${w / 2},${-h / 2 + 3} L${w / 2 - 2},${h / 2} L${-w / 2 + 3},${h / 2 - 2}Z`, S(col, 1.8));
  if (o.ruled) for (let y = -h / 2 + 40; y < h / 2 - 10; y += 22) out += line(-w / 2 + 6, y, w / 2 - 6, y, { stroke: '#9fb6d0', 'stroke-width': 1, opacity: 0.8 });
  if (o.ruled) out += line(-w / 2 + 34, -h / 2 + 4, -w / 2 + 34, h / 2 - 4, { stroke: '#d98a8a', 'stroke-width': 1.2 });
  const lines = o.lines || [];
  let y = -h / 2 + (o.top ?? 44);
  for (const L of lines) {
    const fs = L.size ?? o.size ?? 17;
    out += text(o.align === 'center' ? 0 : -w / 2 + (o.margin ?? 40), y, L.t ?? L, { 'font-family': L.font || o.font || 'Caveat', 'font-size': fs, fill: L.color || o.color || '#2d2a4a', 'text-anchor': o.align === 'center' ? 'middle' : 'start', 'font-style': L.italic ? 'italic' : undefined });
    y += fs * (o.lh ?? 1.25);
  }
  if (o.crumpled) {
    const R = rng(4);
    let d = '';
    for (let i = 0; i < 9; i++) d += `M${(R() - 0.5) * w},${(R() - 0.5) * h} l${(R() - 0.5) * 80},${(R() - 0.5) * 80} `;
    out += path(d, { stroke: '#b9ad92', 'stroke-width': 1.4, fill: 'none' });
  }
  return g({ transform: o.rot ? `rotate(${o.rot})` : undefined }, out);
}

export function crumpledBall(r = 22, seed = 3) {
  const R = rng(seed); const pts = [];
  for (let i = 0; i < 11; i++) { const a = (i / 11) * Math.PI * 2; const k = 1 + (R() - 0.5) * 0.35; pts.push([Math.cos(a) * r * k, Math.sin(a) * r * k]); }
  let d = ''; for (let i = 0; i < 5; i++) d += `M${(R() - 0.5) * r},${(R() - 0.5) * r} l${(R() - 0.5) * r},${(R() - 0.5) * r} `;
  return path(smoothD(pts, true, 0.3), S('#f5f0e2', 1.6)) + path(d, { stroke: '#b9ad92', 'stroke-width': 1.2, fill: 'none' });
}

// a held book, closed, seen at an angle (hand-local: centred on grip)
export function bookHeld(col = C.burgundy, o = {}) {
  const w = o.w ?? 46, h = o.h ?? 62;
  return g({ transform: `rotate(${o.rot ?? 0})` },
    rect(-w / 2, -h * 0.2, w, h, S(col, 2)), rect(-w / 2 + 4, -h * 0.2 + 3, 5, h - 6, { fill: shade(col, -0.3) }),
    line(-w / 2 + 12, -h * 0.2 + 12, w / 2 - 6, -h * 0.2 + 12, { stroke: '#d9b35c', 'stroke-width': 2 }),
    rect(w / 2 - 3, -h * 0.2 + 2, 4, h - 4, { fill: '#f1e6cc' }));
}
// an open book (as if read), centred
export function bookOpen(o = {}) {
  const w = o.w ?? 120, h = o.h ?? 80, col = o.col || C.forest;
  let out = path(`M${-w / 2 - 4},${-h / 2 + 4} L0,${-h / 2 + 10} L${w / 2 + 4},${-h / 2 + 4} L${w / 2 + 4},${h / 2 + 4} L0,${h / 2 + 8} L${-w / 2 - 4},${h / 2 + 4}Z`, S(col, 2));
  out += path(`M${-w / 2},${-h / 2} Q${-w / 4},${-h / 2 - 6} 0,${-h / 2 + 6} L0,${h / 2 + 4} Q${-w / 4},${h / 2 - 8} ${-w / 2},${h / 2}Z`, S('#f4ecd6', 1.5));
  out += path(`M${w / 2},${-h / 2} Q${w / 4},${-h / 2 - 6} 0,${-h / 2 + 6} L0,${h / 2 + 4} Q${w / 4},${h / 2 - 8} ${w / 2},${h / 2}Z`, S('#f4ecd6', 1.5));
  for (let i = 0; i < 6; i++) { const y = -h / 2 + 14 + i * (h - 24) / 6; out += line(-w / 2 + 8, y, -8, y + 3, { stroke: '#8a7d68', 'stroke-width': 1.3 }) + line(8, y + 3, w / 2 - 8, y, { stroke: '#8a7d68', 'stroke-width': 1.3 }); }
  return out;
}

export function pencil(len = 70) {
  return g({}, rect(-3, -len / 2, 6, len, S('#3c4c6b', 1.3)), path(`M-3,${len / 2} L0,${len / 2 + 12} L3,${len / 2}Z`, S('#c0a888', 1.2)), rect(-3, -len / 2 - 6, 6, 6, S('#b7b7b7', 1.2)));
}
export function quill(len = 110) {
  return path(`M0,${len * 0.5} Q${-10},${-len * 0.1} ${-4},${-len * 0.5} Q${14},${-len * 0.15} 0,${len * 0.5}Z`, S('#f3eee2', 1.4)) + line(0, len * 0.5, -3, -len * 0.4, { stroke: '#9d937e', 'stroke-width': 1 });
}
export function wand(len = 110, col = '#6b4429') {
  return path(`M-3,${-len * 0.1} L-2,${len * 0.9} L2,${len * 0.9} L4,${-len * 0.1}Z`, S(col, 1.4)) + rect(-4.5, -len * 0.1, 9, len * 0.28, S(shade(col, -0.2), 1.4));
}
export function teacup(s = 1) {
  return g({ transform: `scale(${s})` }, ellipse(0, 18, 28, 7, S('#f2ece0', 1.6)), path('M-18,-4 L-14,16 Q0,22 14,16 L18,-4Z', S('#f6f1e6', 1.6)), ellipse(0, -4, 18, 5, S('#8a4b2b', 1.4)), path('M18,0 q12,2 6,12 l-7,-2', { fill: 'none', stroke: INK, 'stroke-width': 1.6 }), path('M-12,4 q4,8 12,6', { fill: 'none', stroke: '#6b8fb5', 'stroke-width': 1.6 }));
}
export function galleon(r = 10) {
  return circle(0, 0, r, S('#e7bb4f', 1.3)) + circle(0, 0, r * 0.7, { fill: 'none', stroke: '#b0842a', 'stroke-width': 1 }) + ellipse(-r * 0.3, -r * 0.35, r * 0.25, r * 0.15, { fill: '#fff6d0', opacity: 0.8 });
}

// Tabby cat (McGonagall's Animagus form has spectacle markings round the eyes)
export function cat(o = {}) {
  const col = o.col || '#9b7a52', dark = shade(col, -0.35);
  const sit = o.pose !== 'walk';
  let out = '';
  // tail
  out += path(`M28,-6 Q62,-4 58,-40 Q56,-60 66,-66`, { fill: 'none', stroke: INK, 'stroke-width': 13, 'stroke-linecap': 'round' }) + path(`M28,-6 Q62,-4 58,-40 Q56,-60 66,-66`, { fill: 'none', stroke: col, 'stroke-width': 9, 'stroke-linecap': 'round' });
  // body
  out += path(`M-30,0 Q-36,-50 -12,-70 L18,-70 Q38,-50 34,0Z`, S(col, 2.2));
  for (let i = 0; i < 4; i++) out += path(`M${-24 + i * 4},${-55 + i * 14} q16,-4 30,0`, { fill: 'none', stroke: dark, 'stroke-width': 4, 'stroke-linecap': 'round' });
  out += path(`M-18,0 L-16,-22 M4,0 L6,-22`, { stroke: INK, 'stroke-width': 1.4 });
  // head
  out += path(`M-26,-78 L-30,-112 L-12,-96 Q2,-100 16,-96 L32,-112 L28,-78 Q26,-58 2,-56 Q-22,-58 -26,-78Z`, S(col, 2.2));
  out += path(`M-4,-100 l2,10 M4,-100 l-1,10 M-12,-98 l3,8`, { stroke: dark, 'stroke-width': 2.6, 'stroke-linecap': 'round' });
  const ey = -80;
  if (o.spectacles) out += path(`M-18,${ey - 8} h14 v14 h-14Z M6,${ey - 8} h14 v14 h-14Z M-4,${ey - 2} h10`, { fill: 'none', stroke: dark, 'stroke-width': 2.6 });
  const eyeC = o.eyeCol || '#c9c24a';
  if (o.blink) out += path(`M-15,${ey} q4,3 8,0 M9,${ey} q4,3 8,0`, { fill: 'none', stroke: INK, 'stroke-width': 2 });
  else out += ellipse(-11, ey, 5, 5.5, S(eyeC, 1.4)) + ellipse(13, ey, 5, 5.5, S(eyeC, 1.4)) + ellipse(-11, ey, 1.6, 4.5, { fill: INK }) + ellipse(13, ey, 1.6, 4.5, { fill: INK });
  out += path(`M-2,${ey + 9} l3,3 l3,-3Z`, { fill: '#d9888a', stroke: INK, 'stroke-width': 1 });
  out += path(`M1,${ey + 12} q-4,5 -8,3 M1,${ey + 12} q4,5 8,3`, { fill: 'none', stroke: INK, 'stroke-width': 1.3 });
  out += path(`M-10,${ey + 10} l-22,-4 M-10,${ey + 13} l-22,2 M12,${ey + 10} l22,-4 M12,${ey + 13} l22,2`, { stroke: '#f3ead3', 'stroke-width': 1, opacity: 0.8 });
  return g({ transform: o.flip ? 'scale(-1,1)' : undefined }, out);
}

// owl in flight or perched
export function owl(o = {}) {
  const col = o.col || '#8a6a45', light = '#e8dcc0';
  let out = '';
  if (o.flying) {
    out += path(`M-10,-10 Q-70,-60 -110,-20 Q-70,-30 -40,0Z`, S(shade(col, -0.1), 2)) + path(`M10,-10 Q70,-60 110,-20 Q70,-30 40,0Z`, S(shade(col, -0.1), 2));
  }
  out += ellipse(0, 0, 30, 38, S(col, 2.2));
  out += ellipse(0, 8, 20, 26, { fill: light, opacity: 0.9 });
  out += circle(-11, -16, 11, S('#f6efdc', 1.6)) + circle(11, -16, 11, S('#f6efdc', 1.6)) + circle(-11, -16, 5, { fill: '#e9a93a' }) + circle(11, -16, 5, { fill: '#e9a93a' }) + circle(-11, -16, 2.6, { fill: INK }) + circle(11, -16, 2.6, { fill: INK });
  out += path(`M-4,-8 L0,0 L4,-8Z`, S('#c99a3a', 1.2));
  out += path(`M-26,-30 L-16,-40 L-12,-28 M26,-30 L16,-40 L12,-28`, { fill: col, stroke: INK, 'stroke-width': 2 });
  if (o.letter) out += g({ transform: 'translate(0,44) scale(0.35)' }, envelope({ back: true }));
  return out;
}
