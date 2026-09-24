// Heads & faces. A head is drawn in head-local coords: (0,0) = centre of the cranium, +y down.
// `turn` t ∈ [-1.4, 1.4]: 0 = facing viewer, + = turned toward screen-right. Features ride on a sphere.
import { C } from '../core/palette.js';
import { path, circle, ellipse, g, smoothD, taperD, r2, clamp, lerp, rng, shade, uid, el } from '../core/svg.js';

const ROT = 0.62; // radians of head rotation per unit turn

// Place a feature that sits at front-view x0 on a head of half-width rx, for turn t.
export function onSphere(x0, rx, t) {
  const th0 = Math.asin(clamp(x0 / rx, -1, 1));
  const th = th0 + t * ROT;
  return { x: rx * Math.sin(th), k: Math.max(0, Math.cos(th)) / Math.max(0.2, Math.cos(th0)), vis: Math.cos(th) > 0.05 };
}

// ---------------- head outline ----------------
export function headOutline(h, t) {
  const rx = h.rx, ry = h.ry, jaw = h.jaw ?? 0.62, chin = h.chin ?? 1.02, cheek = h.cheek ?? 0.93, chinW = h.chinW ?? 0;
  const s = Math.sin(t * ROT);
  const pts = [
    [0 + s * rx * 0.05, -ry],
    [rx * 0.74, -ry * 0.7],
    [rx * 1.0, -ry * 0.05 + (h.templeY || 0)],
    [rx * (cheek + 0.05 * s) + s * rx * 0.1, ry * 0.42],
    [rx * (jaw + chinW) + s * rx * 0.34, ry * 0.84],
    [s * rx * 0.5 + chinW * rx * 0.6, ry * chin],
    ...(chinW ? [[s * rx * 0.5 - chinW * rx * 0.6, ry * chin]] : []),
    [-rx * (jaw + chinW) + s * rx * 0.52, ry * (0.84 - 0.06 * Math.abs(s))],
    [-rx * cheek + s * rx * (s > 0 ? 0.16 : 0.06), ry * 0.42],
    [-rx * 1.0, -ry * 0.05 + (h.templeY || 0)],
    [-rx * 0.74, -ry * 0.7],
  ];
  return smoothD(pts, true, h.tension ?? 0.55);
}

// ---------------- eyes ----------------
// e: {w,h, iris, pupil, style:'kid'|'adult'|'narrow'}  st: expression eye state
export function eye(cx, cy, e, st, side, k, lw, ids) {
  // side: -1 = screen-left eye, +1 = screen-right eye ; k = horizontal foreshortening
  const w = e.w * k, hgt = e.h;
  const open = st.open ?? 1;
  const out = [];
  const style = st.style || 'normal';
  const tiltSign = side; // outer corner direction
  const INK = C.ink;
  if (k < 0.12) return '';
  if (style === 'happy' || style === 'closed' || style === 'shut' || style === 'wince' || style === 'line') {
    // drawn as strokes only
    let d;
    if (style === 'happy') d = `M${cx - w * 0.55},${cy + hgt * 0.1} Q${cx},${cy - hgt * 0.55} ${cx + w * 0.55},${cy + hgt * 0.1}`;
    else if (style === 'closed') d = `M${cx - w * 0.55},${cy} Q${cx},${cy + hgt * 0.35} ${cx + w * 0.55},${cy}`;
    else if (style === 'line') d = `M${cx - w * 0.55},${cy + hgt * 0.05} L${cx + w * 0.55},${cy + hgt * 0.05}`;
    else if (style === 'wince') d = `M${cx - w * 0.5 * side},${cy - hgt * 0.25} L${cx + w * 0.45 * side},${cy + hgt * 0.02} L${cx - w * 0.5 * side},${cy + hgt * 0.28}`;
    else d = `M${cx - w * 0.5 * side},${cy - hgt * 0.3} L${cx + w * 0.5 * side},${cy} L${cx - w * 0.5 * side},${cy + hgt * 0.3}`; // shut ><
    return path(d, { fill: 'none', stroke: INK, 'stroke-width': lw * 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  }
  const id = uid('ey');
  const rx = w / 2, ry = hgt / 2;
  const sclera = e.shape === 'almond'
    ? `M${cx - rx},${cy + ry * 0.1} Q${cx - rx * 0.3},${cy - ry * 1.35} ${cx + rx},${cy - ry * 0.15 * side} Q${cx + rx * 0.3},${cy + ry * 1.25} ${cx - rx},${cy + ry * 0.1}Z`
    : `M${cx - rx},${cy} a${rx},${ry} 0 1 0 ${2 * rx},0 a${rx},${ry} 0 1 0 ${-2 * rx},0Z`;
  out.push(`<clipPath id="${id}"><path d="${sclera}"/></clipPath>`);
  out.push(path(sclera, { fill: st.sclera || '#fffaf0' }));
  const lx = (st.lookX ?? 0), ly = (st.lookY ?? 0);
  const irisR = e.iris * (style === 'wide' ? 0.62 : style === 'tiny' ? 0.42 : 1) * (st.irisScale ?? 1);
  const ix = cx + lx * rx * 0.42, iy = cy + ly * ry * 0.35 + (e.irisDrop ?? 0) * ry;
  const inner = [];
  if (style !== 'blank') {
    inner.push(ellipse(ix, iy, irisR * Math.min(1, k * 1.05), irisR, { fill: e.color }));
    inner.push(ellipse(ix, iy - irisR * 0.35, irisR * 0.95 * Math.min(1, k * 1.05), irisR * 0.62, { fill: shade(e.color, -0.4), opacity: 0.45 }));
    if (style !== 'cold') inner.push(ellipse(ix, iy + irisR * 0.45, irisR * 0.55 * k, irisR * 0.3, { fill: shade(e.color, 0.35), opacity: 0.5 }));
    const pr = irisR * (st.pupil ?? (style === 'cold' ? 0.3 : 0.5));
    inner.push(ellipse(ix, iy, pr * Math.min(1, k * 1.05), pr, { fill: '#130c0a' }));
    if (style !== 'cold' && !st.noShine) {
      inner.push(circle(ix + irisR * 0.32 * side * 0 + irisR * 0.3, iy - irisR * 0.38, irisR * 0.3, { fill: '#fff' }));
      inner.push(circle(ix - irisR * 0.32, iy + irisR * 0.38, irisR * 0.13, { fill: '#fff', opacity: 0.9 }));
    }
    if (st.sparkle) {
      inner.push(path(star4(ix - irisR * 0.1, iy - irisR * 0.1, irisR * 0.55), { fill: '#fff' }));
    }
    if (style === 'teary' || st.teary) {
      inner.push(path(`M${cx - rx},${cy + ry * 0.35} Q${cx},${cy + ry * 0.15} ${cx + rx},${cy + ry * 0.35} L${cx + rx},${cy + ry} L${cx - rx},${cy + ry}Z`, { fill: '#bfe3f5', opacity: 0.7 }));
      inner.push(path(`M${cx - rx * 0.7},${cy + ry * 0.38} Q${cx},${cy + ry * 0.2} ${cx + rx * 0.7},${cy + ry * 0.38}`, { fill: 'none', stroke: '#fff', 'stroke-width': lw * 0.9, opacity: 0.9 }));
    }
  } else {
    inner.push(circle(ix, iy, irisR * 0.18, { fill: '#130c0a' }));
  }
  // lids (skin coloured masks) — upper lid lowers with `open`, lower lid rises with `squint`
  const topY = cy - ry, botY = cy + ry;
  const lidTilt = (st.lidTilt ?? 0) * side; // + = outer corner lower (sad) ; - = outer higher (angry: inner lower)
  const upY = lerp(topY - 2, botY, 1 - clamp(open, 0, 1));
  const skin = st.skin || C.skinFair;
  const lidPath = `M${cx - rx - 4},${topY - 10} L${cx + rx + 4},${topY - 10} L${cx + rx + 4},${upY + lidTilt * ry * 0.6} Q${cx},${upY - ry * 0.25 * (open > 0.6 ? 1 : -0.2)} ${cx - rx - 4},${upY - lidTilt * ry * 0.6}Z`;
  if (open < 0.97 || lidTilt) inner.push(path(lidPath, { fill: skin }));
  const sq = st.squint ?? 0;
  if (sq > 0) {
    const lowY = lerp(botY + 2, cy - ry * 0.1, sq);
    inner.push(path(`M${cx - rx - 4},${botY + 10} L${cx + rx + 4},${botY + 10} L${cx + rx + 4},${lowY + ry * 0.1} Q${cx},${lowY - ry * 0.35} ${cx - rx - 4},${lowY + ry * 0.1}Z`, { fill: skin }));
  }
  out.push(g({ 'clip-path': `url(#${id})` }, inner));
  // lash line
  const lashW = lw * (e.lash ?? 1.6);
  if (open >= 0.97 && !lidTilt) {
    out.push(path(`M${cx - rx * 1.02},${cy + ry * 0.05} Q${cx - rx * 0.9},${topY - ry * 0.12} ${cx},${topY - 0.5} Q${cx + rx * 0.9},${topY - ry * 0.12} ${cx + rx * 1.08},${cy - ry * 0.05}`,
      { fill: 'none', stroke: C.ink, 'stroke-width': lashW, 'stroke-linecap': 'round' }));
  } else {
    const a = [cx - rx - 1, upY - lidTilt * ry * 0.6], b = [cx + rx + 1, upY + lidTilt * ry * 0.6];
    out.push(path(`M${a[0]},${a[1]} Q${cx},${upY - ry * 0.25 * (open > 0.6 ? 1 : -0.2)} ${b[0]},${b[1]}`, { fill: 'none', stroke: C.ink, 'stroke-width': lashW, 'stroke-linecap': 'round' }));
  }
  // outer lash flick
  if (e.flick !== false && open > 0.3) {
    const fx = side > 0 ? cx + rx : cx - rx;
    const fy = open >= 0.97 && !lidTilt ? cy - ry * 0.05 : upY + lidTilt * ry * 0.6 * side * side;
    out.push(path(`M${fx},${fy} l${side * rx * 0.35},${-ry * 0.18}`, { stroke: C.ink, 'stroke-width': lashW * 0.8, 'stroke-linecap': 'round' }));
  }
  // lower lid hint
  if (e.lower !== false) out.push(path(`M${cx - rx * 0.5},${botY + 1} Q${cx},${botY + ry * 0.12} ${cx + rx * 0.5},${botY + 1}`, { fill: 'none', stroke: C.ink, 'stroke-width': lw * 0.55, opacity: 0.55 }));
  // outline of sclera sides (thin)
  out.push(path(sclera, { fill: 'none', stroke: C.ink, 'stroke-width': lw * 0.5, opacity: 0.35 }));
  return out.join('');
}

export function star4(x, y, r) {
  return `M${x},${y - r} Q${x + r * 0.15},${y - r * 0.15} ${x + r},${y} Q${x + r * 0.15},${y + r * 0.15} ${x},${y + r} Q${x - r * 0.15},${y + r * 0.15} ${x - r},${y} Q${x - r * 0.15},${y - r * 0.15} ${x},${y - r}Z`;
}

// ---------------- brows ----------------
export function brow(cx, cy, b, st, side, k, color) {
  // st: {raise, inner, outer, arch}  inner>0 = inner end up (worry); inner<0 = down (anger)
  const L = b.len * Math.max(0.35, k);
  const raise = (st.raise ?? 0) * 8;
  const yIn = cy - raise - (st.inner ?? 0) * 7;
  const yOut = cy - raise - (st.outer ?? 0) * 7 + 2;
  const xin = cx - side * L * 0.5, xout = cx + side * L * 0.5;
  const arch = (st.arch ?? 0.5) * 5;
  const mid = [(xin + xout) / 2, (yIn + yOut) / 2 - arch];
  const pts = [[xin, yIn], mid, [xout, yOut]];
  const W = b.w;
  return path(taperD(pts, [W * 1.05, W, W * 0.55]), { fill: color, stroke: color, 'stroke-width': 0.6, 'stroke-linejoin': 'round' });
}

// ---------------- mouths ----------------
export function mouth(mx, my, m, st, k, lw, skin) {
  const type = st.type || 'line';
  const W = (m.w ?? 20) * (st.w ?? 1) * Math.max(0.5, k);
  const open = st.open ?? 0.5;
  const curve = st.curve ?? 0; // + smile, - frown
  const asym = st.asym ?? 0;   // + right corner up
  const INK = C.ink;
  const inside = '#5a1f22', tongue = '#d4706a', teeth = '#fffaf0';
  const S = { stroke: INK, 'stroke-width': lw * 1.25, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  const lx = mx - W / 2, rx = mx + W / 2;
  const ly = my - curve * 6 - asym * 4, ry = my - curve * 6 + asym * 4;
  switch (type) {
    case 'line':
      return path(`M${lx},${ly} Q${mx},${my + curve * 7} ${rx},${ry}`, { fill: 'none', ...S });
    case 'smirk':
      return path(`M${lx},${my + 1} Q${mx + W * 0.1},${my + 5} ${rx + 3},${my - 7}`, { fill: 'none', ...S }) +
        path(`M${rx + 1},${my - 9} q3,1 3,5`, { fill: 'none', ...S, 'stroke-width': lw * 0.8 });
    case 'wobble': {
      const n = 3; let d = `M${lx},${my}`;
      for (let i = 1; i <= n; i++) d += ` Q${lx + (W / n) * (i - 0.5)},${my + (i % 2 ? -3 : 3)} ${lx + (W / n) * i},${my}`;
      return path(d, { fill: 'none', ...S });
    }
    case 'cat':
      return path(`M${lx},${my - 3} Q${mx - W * 0.25},${my + 6} ${mx},${my - 1} Q${mx + W * 0.25},${my + 6} ${rx},${my - 3}`, { fill: 'none', ...S });
    case 'tiny':
      return path(`M${mx - W * 0.2},${my} L${mx + W * 0.2},${my}`, { fill: 'none', ...S });
    case 'o': case 'open': {
      const rw = W * 0.28 * (0.6 + open), rh = W * 0.3 * (0.5 + open * 1.2);
      return ellipse(mx, my + rh * 0.3, rw, rh, { fill: inside, ...S }) + ellipse(mx, my + rh * 0.9, rw * 0.6, rh * 0.35, { fill: tongue, opacity: 0.9 });
    }
    case 'smile': case 'grin': case 'laugh': {
      // D-shape: straight-ish top, round bottom
      const h = W * (type === 'laugh' ? 0.75 : type === 'grin' ? 0.45 : 0.32) * (0.5 + open);
      const top = `M${lx},${ly} Q${mx},${my + (type === 'smile' ? 2 : 0) - curve * 2} ${rx},${ry}`;
      const d = `${top} Q${rx - W * 0.05},${my + h} ${mx},${my + h} Q${lx + W * 0.05},${my + h} ${lx},${ly}Z`;
      const id = uid('mo');
      const teethBand = type !== 'laugh' ? path(`M${lx},${ly - 4} L${rx},${ry - 4} L${rx},${my + h * 0.38} Q${mx},${my + h * 0.5} ${lx},${my + h * 0.38}Z`, { fill: teeth }) : '';
      return `<clipPath id="${id}"><path d="${d}"/></clipPath>` + path(d, { fill: inside }) +
        g({ 'clip-path': `url(#${id})` }, teethBand, ellipse(mx, my + h, W * 0.3, h * 0.45, { fill: tongue })) + path(d, { fill: 'none', ...S });
    }
    case 'shout': case 'scream': {
      const h = W * (type === 'scream' ? 1.1 : 0.8) * (0.6 + open * 0.8);
      const ww = W * 0.62;
      const d = `M${mx - ww},${my - h * 0.1} Q${mx},${my - h * 0.28} ${mx + ww},${my - h * 0.1} Q${mx + ww * 0.95},${my + h * 0.85} ${mx},${my + h} Q${mx - ww * 0.95},${my + h * 0.85} ${mx - ww},${my - h * 0.1}Z`;
      const id = uid('mo');
      return `<clipPath id="${id}"><path d="${d}"/></clipPath>` + path(d, { fill: inside }) +
        g({ 'clip-path': `url(#${id})` }, path(`M${mx - ww},${my - h * 0.3} L${mx + ww},${my - h * 0.3} L${mx + ww},${my + h * 0.06} Q${mx},${my + h * 0.12} ${mx - ww},${my + h * 0.06}Z`, { fill: teeth }), ellipse(mx, my + h * 0.95, ww * 0.6, h * 0.35, { fill: tongue })) +
        path(d, { fill: 'none', ...S });
    }
    case 'frown-open': {
      const h = W * 0.4 * (0.5 + open);
      const d = `M${lx},${my + h * 0.55} Q${mx},${my - h * 0.6} ${rx},${my + h * 0.55} Q${mx},${my + h * 0.3} ${lx},${my + h * 0.55}Z`;
      return path(d, { fill: inside, ...S });
    }
    case 'grit': case 'grimace': {
      const h = W * 0.32;
      const d = `M${lx},${my - h / 2 + curve * -3} L${rx},${my - h / 2 + curve * -3} Q${rx + 3},${my} ${rx},${my + h / 2} L${lx},${my + h / 2} Q${lx - 3},${my} ${lx},${my - h / 2 + curve * -3}Z`;
      // one gap line and two tooth lines, thin, so small adult mouths read as teeth, not a zip
      let lines = `M${lx + 2},${my} L${rx - 2},${my}`;
      for (let i = 1; i < 3; i++) lines += ` M${lx + (W / 3) * i},${my - h / 2} L${lx + (W / 3) * i},${my + h / 2}`;
      return path(d, { fill: teeth, ...S, 'stroke-width': lw * 1.05 }) + path(lines, { fill: 'none', stroke: INK, 'stroke-width': lw * 0.45, opacity: 0.8 });
    }
    case 'pout':
      return path(`M${mx - W * 0.25},${my + 2} Q${mx},${my - 5} ${mx + W * 0.25},${my + 2}`, { fill: 'none', ...S });
    case 'flat':
    default:
      return path(`M${lx},${my} L${rx},${my}`, { fill: 'none', ...S });
  }
}

// ---------------- extras (sweat, tears, blush...) ----------------
export function blush(x, y, r, lw, strong = false) {
  return ellipse(x, y, r * 1.2, r * 0.55, { fill: C.blush, opacity: strong ? 0.55 : 0.38, filter: 'url(#glowXs)' }) +
    [0, 1, 2].map((i) => path(`M${x - r * 0.7 + i * r * 0.55},${y + r * 0.25} l${r * 0.3},${-r * 0.5}`, { stroke: '#b8483f', 'stroke-width': lw * 0.7, 'stroke-linecap': 'round', opacity: 0.8 })).join('');
}
export function sweat(x, y, s, lw) {
  return path(`M${x},${y} Q${x + s * 0.55},${y + s * 0.9} ${x},${y + s * 1.2} Q${x - s * 0.55},${y + s * 0.9} ${x},${y}Z`, { fill: '#cfe8f7', stroke: C.ink, 'stroke-width': lw * 0.8 }) +
    ellipse(x - s * 0.12, y + s * 0.85, s * 0.1, s * 0.16, { fill: '#fff' });
}
export function tearStream(x, y, len, lw) {
  return path(`M${x - 3},${y} Q${x - 6},${y + len * 0.5} ${x - 2},${y + len} L${x + 4},${y + len} Q${x + 3},${y + len * 0.5} ${x + 4},${y}Z`, { fill: '#bfe3f5', stroke: '#7fb3cf', 'stroke-width': lw * 0.6, opacity: 0.9 });
}
export function tearDrop(x, y, s, lw) {
  return path(`M${x},${y} Q${x + s * 0.5},${y + s * 0.9} ${x},${y + s * 1.1} Q${x - s * 0.5},${y + s * 0.9} ${x},${y}Z`, { fill: '#cfe8f7', stroke: '#6b9ab5', 'stroke-width': lw * 0.6 });
}
export function vein(x, y, s, lw) {
  const d = `M${x - s},${y - s * 0.3} Q${x - s * 0.3},${y - s * 0.3} ${x - s * 0.3},${y - s} M${x + s},${y - s * 0.3} Q${x + s * 0.3},${y - s * 0.3} ${x + s * 0.3},${y - s} M${x - s},${y + s * 0.3} Q${x - s * 0.3},${y + s * 0.3} ${x - s * 0.3},${y + s} M${x + s},${y + s * 0.3} Q${x + s * 0.3},${y + s * 0.3} ${x + s * 0.3},${y + s}`;
  return path(d, { fill: 'none', stroke: '#b3262c', 'stroke-width': lw * 1.3, 'stroke-linecap': 'round' });
}
export function gloom(rx, ry, lw) {
  let d = '';
  const R = rng(5);
  for (let i = 0; i < 9; i++) { const x = -rx * 0.8 + (i / 8) * rx * 1.6; d += `M${x},${-ry * 0.95} l0,${ry * (0.5 + R() * 0.45)} `; }
  return path(d, { stroke: '#2a2140', 'stroke-width': lw * 0.7, opacity: 0.5 });
}
