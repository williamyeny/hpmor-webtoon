// Procedural hairstyles. Each returns {back(ctx), front(ctx)} drawing functions in head-local coords.
// ctx = {rx, ry, t, s (=sin(turn)), lw, color, expr}
import { C } from '../core/palette.js';
import { path, g, ellipse, circle, smoothD, polyD, rng, shade, lerp, uid, taperD } from '../core/svg.js';

const ink = (lw, k = 1) => ({ stroke: C.ink, 'stroke-width': lw * k, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });

function arcPts(cx, cy, rx, ry, a0, a1, n, fn) {
  const pts = [];
  for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * (i / n); const k = fn(i, a); pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
  return pts;
}
const shine = (ctx, y, w, col) => path(`M${-ctx.rx * w + ctx.s * 14},${y} Q${ctx.s * 14},${y - 10} ${ctx.rx * w + ctx.s * 14},${y}`, { fill: 'none', stroke: col, 'stroke-width': ctx.lw * 3.2, 'stroke-linecap': 'round', opacity: 0.55 });

// ---------- Harry: the famous untidy black mop
export function messy(seed = 'harry', o = {}) {
  const fringeY = o.fringeY ?? -0.34;
  return {
    back(ctx) {
      const { rx, ry, s, lw, color } = ctx; const R = rng(seed + 'b');
      const pts = arcPts(s * 6, -ry * 0.08, rx * 1.02, ry * 1.0, Math.PI * 0.72, Math.PI * 2.28, 22, (i) => (i % 2 ? 1.2 + R() * 0.12 : 1.04));
      return path(smoothD(pts, true, 0.35), { fill: shade(color, -0.2), ...ink(lw) });
    },
    front(ctx) {
      const { rx, ry, s, lw, color } = ctx; const R = rng(seed);
      const top = arcPts(s * 8, -ry * 0.1, rx * 1.0, ry * 0.98, Math.PI * 1.02, Math.PI * 1.98, 16, (i) => (i % 2 ? 1.2 + R() * 0.16 : 1.05));
      // fringe: jagged clumps pointing down across the forehead, shifted with the turn
      const fr = [];
      const n = 9; const off = s * rx * 0.32;
      for (let i = 0; i <= n; i++) {
        const u = i / n; const x = lerp(rx * 1.0, -rx * 1.0, u);
        const xx = x * (1 - Math.abs(s) * 0.15) + off * (1 - Math.abs(x) / rx * 0.6);
        const tip = i % 2 === 1;
        const y = tip ? ry * (fringeY + 0.2 + R() * 0.14) : ry * (fringeY - 0.02 + R() * 0.05);
        fr.push([xx + (tip ? (R() - 0.5) * 8 : 0), y]);
      }
      const pts = [[-rx * 1.04, -ry * 0.02], ...top, [rx * 1.04, -ry * 0.02], [rx * 0.98, ry * 0.18], ...fr, [-rx * 0.98, ry * 0.18]];
      const d = smoothD(pts, true, 0.28);
      const id = uid('hr');
      let strands = '';
      const R2 = rng(seed + 's');
      for (let i = 0; i < 7; i++) { const x = lerp(-rx * 0.7, rx * 0.7, i / 6) + s * rx * 0.2; strands += `M${x},${-ry * 0.95 + R2() * 10} q${(R2() - 0.3) * 12},${ry * 0.3} ${(R2() - 0.5) * 16},${ry * 0.52} `; }
      return path(d, { fill: color, ...ink(lw) }) +
        `<clipPath id="${id}"><path d="${d}"/></clipPath>` +
        g({ 'clip-path': `url(#${id})` },
          path(strands, { fill: 'none', stroke: shade(color, 0.35), 'stroke-width': lw * 0.7, opacity: 0.7 }),
          path(`M${-rx * 0.6 + s * 20},${-ry * 0.8} Q${s * 20},${-ry * 1.0} ${rx * 0.5 + s * 20},${-ry * 0.82}`, { fill: 'none', stroke: '#5d6a86', 'stroke-width': lw * 3, opacity: 0.45, 'stroke-linecap': 'round' }));
    },
  };
}

// ---------- Hermione: a tremendous bushy cloud (irregular big curls, wider at the bottom)
function curlCloud(cx, cy, rx, ry, R, n, amp) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const lower = Math.sin(a) > 0 ? 1 + Math.sin(a) * 0.35 : 1;
    const k = 1 + (i % 2 ? amp * (0.6 + R() * 0.8) : -amp * 0.2);
    pts.push([cx + Math.cos(a) * rx * k * lower, cy + Math.sin(a) * ry * k]);
  }
  return pts;
}
export function bushy(seed = 'herm') {
  return {
    back(ctx) {
      const { rx, ry, s, lw, color } = ctx; const R = rng(seed + 'b');
      const pts = curlCloud(s * 6, ry * 0.12, rx * 1.45, ry * 1.32, R, 22, 0.13);
      let curls = ''; const R2 = rng(seed + 'k');
      for (let i = 0; i < 14; i++) { const a = R2() * Math.PI * 2, d = R2.range(0.95, 1.3); const x = s * 6 + Math.cos(a) * rx * 1.3 * d, y = ry * 0.1 + Math.sin(a) * ry * 1.2 * d; curls += `M${x},${y} q${6 + R2() * 6},${-8} ${12},${2} `; }
      return path(smoothD(pts, true, 0.55), { fill: shade(color, -0.12), ...ink(lw) }) + path(curls, { fill: 'none', stroke: shade(color, -0.4), 'stroke-width': lw * 0.7, opacity: 0.7 });
    },
    front(ctx) {
      const { rx, ry, s, lw, color } = ctx; const R = rng(seed);
      const top = arcPts(s * 8, -ry * 0.02, rx * 1.08, ry * 1.02, Math.PI * 0.92, Math.PI * 2.08, 12, (i) => (i % 2 ? 1.16 + R() * 0.12 : 1.05));
      const part = s * rx * 0.25 + rx * 0.3;
      // side-parted fringe sweeping across the forehead, with curly ends
      const pts = [[-rx * 1.15, ry * 0.3], ...top, [rx * 1.15, ry * 0.3], [rx * 0.95, ry * 0.0], [rx * 0.8, -ry * 0.28], [part + rx * 0.1, -ry * 0.52], [part - rx * 0.1, -ry * 0.62], [part - rx * 0.55, -ry * 0.45], [-rx * 0.62, -ry * 0.3], [-rx * 0.85, -ry * 0.05], [-rx * 0.92, ry * 0.2]];
      let curls = '';
      const R2 = rng(seed + 'q');
      for (let i = 0; i < 8; i++) { const a = Math.PI * (1.05 + i * 0.11); const x = Math.cos(a) * rx * 0.95 + s * 8, y = Math.sin(a) * ry * 0.9; curls += `M${x},${y} q${(R2() - 0.5) * 12},${10} ${(R2() - 0.5) * 8},${18} `; }
      return path(smoothD(pts, true, 0.5), { fill: color, ...ink(lw) }) + path(curls, { fill: 'none', stroke: shade(color, -0.35), 'stroke-width': lw * 0.7, opacity: 0.75 });
    },
  };
}

// ---------- slicked back (Draco; Lucius uses long:true)
export function slick(seed = 'draco', o = {}) {
  return {
    back(ctx) {
      const { rx, ry, s, lw, color } = ctx;
      if (!o.long) return '';
      const d = `M${-rx * 1.0 + s * 4},${-ry * 0.3} Q${-rx * 1.25},${ry * 1.2} ${-rx * 0.9},${ry * 2.6} L${rx * 0.9},${ry * 2.6} Q${rx * 1.25},${ry * 1.2} ${rx * 1.0 + s * 4},${-ry * 0.3}Z`;
      return path(d, { fill: shade(color, -0.12), ...ink(lw) }) +
        path(`M${-rx * 0.6},${ry * 0.6} Q${-rx * 0.7},${ry * 1.6} ${-rx * 0.5},${ry * 2.5} M${rx * 0.6},${ry * 0.6} Q${rx * 0.7},${ry * 1.6} ${rx * 0.5},${ry * 2.5}`, { fill: 'none', stroke: shade(color, -0.3), 'stroke-width': lw * 0.7 });
    },
    front(ctx) {
      const { rx, ry, s, lw, color } = ctx;
      const hl = o.hairline ?? -0.42;
      const pts = [[-rx * 1.04, ry * 0.05], [-rx * 1.1, -ry * 0.55], [-rx * 0.6 + s * 4, -ry * 1.12], [s * 10, -ry * 1.2], [rx * 0.7 + s * 4, -ry * 1.1], [rx * 1.1, -ry * 0.55], [rx * 1.04, ry * 0.05],
        [rx * 0.86, -ry * 0.1], [rx * 0.45 + s * 10, ry * hl], [s * 14, ry * (hl - 0.05)], [-rx * 0.5 + s * 10, ry * hl], [-rx * 0.86, -ry * 0.1]];
      let comb = '';
      for (let i = 0; i < 6; i++) { const x = lerp(-rx * 0.7, rx * 0.7, i / 5) + s * 10; comb += `M${x},${ry * (hl - 0.02)} Q${x * 0.9},${-ry * 0.85} ${x * 0.6 - rx * 0.1},${-ry * 1.12} `; }
      return path(smoothD(pts, true, 0.4), { fill: color, ...ink(lw) }) +
        path(comb, { fill: 'none', stroke: shade(color, -0.25), 'stroke-width': lw * 0.6, opacity: 0.7 }) + shine(ctx, -ry * 0.78, 0.5, '#ffffff');
    },
  };
}

// ---------- hair pulled into a bun (McGonagall, Mum)
export function bun(seed = 'bun', o = {}) {
  return {
    back(ctx) {
      const { rx, ry, s, lw, color } = ctx;
      const bx = -s * rx * 0.55 + (o.bunX ?? 0), by = -ry * (o.bunY ?? 0.8);
      const soft = o.soft ? path(smoothD([[-rx * 1.12, ry * 0.4], [-rx * 1.2, -ry * 0.4], [0, -ry * 1.15], [rx * 1.2, -ry * 0.4], [rx * 1.12, ry * 0.4], [rx * 0.7, ry * 0.7], [-rx * 0.7, ry * 0.7]], true, 0.5), { fill: shade(color, -0.1), ...ink(lw) }) : '';
      return soft + ellipse(bx, by, rx * (o.bunR ?? 0.5), rx * (o.bunR ?? 0.5) * 0.85, { fill: shade(color, -0.08), ...ink(lw) }) +
        path(`M${bx - rx * 0.25},${by - 4} q${rx * 0.25},${-10} ${rx * 0.5},0`, { fill: 'none', stroke: shade(color, -0.35), 'stroke-width': lw * 0.7 });
    },
    front(ctx) {
      const { rx, ry, s, lw, color } = ctx;
      const part = s * rx * 0.3;
      const pts = [[-rx * 1.06, ry * 0.15], [-rx * 1.12, -ry * 0.5], [-rx * 0.6, -ry * 1.1], [part, -ry * 1.13], [rx * 0.6, -ry * 1.1], [rx * 1.12, -ry * 0.5], [rx * 1.06, ry * 0.15],
        [rx * 0.9, -ry * 0.05], [part + rx * 0.4, -ry * (o.hairline ?? 0.55)], [part, -ry * ((o.hairline ?? 0.55) + 0.08)], [part - rx * 0.4, -ry * (o.hairline ?? 0.55)], [-rx * 0.9, -ry * 0.05]];
      let strands = '';
      for (let i = 0; i < 5; i++) { const x = lerp(-rx * 0.8, rx * 0.8, i / 4); strands += `M${part},${-ry * 0.62} Q${x},${-ry * 0.7} ${x * 1.1},${-ry * 0.1} `; }
      return path(smoothD(pts, true, 0.4), { fill: color, ...ink(lw) }) + path(strands, { fill: 'none', stroke: shade(color, -0.3), 'stroke-width': lw * 0.55, opacity: 0.6 }) +
        (o.wisps ? path(`M${rx * 0.95},${ry * 0.05} q${6},${16} ${-2},${30}`, { fill: 'none', stroke: color, 'stroke-width': lw * 1.2 }) : '');
    },
  };
}

// ---------- short curly (Dad), short neat (generic boy), cropped
export function curlyShort(seed = 'dad', o = {}) {
  return {
    back(ctx) { const { rx, ry, s, lw, color } = ctx; const R = rng(seed + 'b');
      const pts = arcPts(s * 4, -ry * 0.05, rx * 1.02, ry * 1.0, Math.PI * 0.85, Math.PI * 2.15, 20, (i) => (i % 2 ? 1.14 + R() * 0.05 : 1.05));
      return path(smoothD(pts, true, 0.6), { fill: shade(color, -0.15), ...ink(lw) }); },
    front(ctx) {
      const { rx, ry, s, lw, color } = ctx; const R = rng(seed);
      const recede = o.recede ?? 0;
      const top = arcPts(s * 6, -ry * 0.05, rx * 1.02, ry * 1.0, Math.PI * 1.0, Math.PI * 2.0, 16, (i) => (i % 2 ? 1.12 + R() * 0.06 : 1.04));
      const hl = -ry * (0.5 + recede * 0.3);
      const pts = [[-rx * 1.04, ry * 0.0], ...top, [rx * 1.04, ry * 0.0], [rx * 0.86, -ry * 0.15], [rx * 0.4 + s * 10, hl + ry * (0.04 + recede * 0.1)], [s * 10, hl - recede * ry * 0.15], [-rx * 0.4 + s * 10, hl + ry * (0.04 + recede * 0.1)], [-rx * 0.86, -ry * 0.15]];
      let curls = '';
      const R2 = rng(seed + 'c');
      for (let i = 0; i < 10; i++) { const x = lerp(-rx * 0.8, rx * 0.8, R2()); const y = lerp(-ry * 1.0, hl, R2()); curls += `M${x},${y} q4,-5 8,0 `; }
      return path(smoothD(pts, true, 0.55), { fill: color, ...ink(lw) }) + path(curls, { fill: 'none', stroke: shade(color, -0.35), 'stroke-width': lw * 0.6, opacity: 0.8 });
    },
  };
}

export function neat(seed = 'neat', o = {}) {
  return {
    back(ctx) { const { rx, ry, s, lw, color } = ctx; return ellipse(s * 4, -ry * 0.12, rx * 1.06, ry * 0.98, { fill: shade(color, -0.15), ...ink(lw) }); },
    front(ctx) {
      const { rx, ry, s, lw, color } = ctx; const R = rng(seed);
      const part = s * rx * 0.2 + (o.part ?? 0.35) * rx;
      const fy = o.fringe ? -ry * 0.25 : -ry * 0.5;
      const fr = [];
      for (let i = 0; i <= 6; i++) { const x = lerp(rx * 0.92, -rx * 0.92, i / 6) + s * rx * 0.2; fr.push([x, fy + (i % 2 ? 6 + R() * 6 : 0) + Math.abs(x) * 0.12]); }
      const pts = [[-rx * 1.04, ry * 0.02], [-rx * 1.12, -ry * 0.5], [-rx * 0.6, -ry * 1.1], [part, -ry * 1.16], [rx * 0.6, -ry * 1.1], [rx * 1.12, -ry * 0.5], [rx * 1.04, ry * 0.02], [rx * 0.95, -ry * 0.1], ...fr, [-rx * 0.95, -ry * 0.1]];
      return path(smoothD(pts, true, 0.4), { fill: color, ...ink(lw) }) + shine(ctx, -ry * 0.8, 0.45, shade(color, 0.4));
    },
  };
}

export function bald(o = {}) {
  return {
    back(ctx) { if (!o.fringe) return ''; const { rx, ry, lw, color } = ctx; return path(`M${-rx * 1.05},${-ry * 0.1} Q${-rx * 1.1},${ry * 0.5} ${-rx * 0.7},${ry * 0.55} L${rx * 0.7},${ry * 0.55} Q${rx * 1.1},${ry * 0.5} ${rx * 1.05},${-ry * 0.1}Z`, { fill: color, ...ink(lw) }); },
    front(ctx) {
      const { rx, ry, s, lw, color } = ctx;
      let out = path(`M${-rx * 0.3 + s * 20},${-ry * 0.8} Q${s * 20},${-ry * 0.95} ${rx * 0.3 + s * 20},${-ry * 0.82}`, { fill: 'none', stroke: '#fff', 'stroke-width': lw * 2, opacity: 0.45, 'stroke-linecap': 'round' });
      if (o.fringe) out += path(`M${-rx * 1.03},${-ry * 0.25} q${-4},${ry * 0.3} ${2},${ry * 0.5} M${rx * 1.03},${-ry * 0.25} q${4},${ry * 0.3} ${-2},${ry * 0.5}`, { fill: 'none', stroke: color, 'stroke-width': lw * 3, 'stroke-linecap': 'round' });
      if (o.wisps) out += path(`M${s * 10 - 12},${-ry * 0.96} q${8},${-12} ${18},${-6} M${s * 10},${-ry * 0.98} q${6},${-10} ${14},${-4}`, { fill: 'none', stroke: color, 'stroke-width': lw * 0.9, 'stroke-linecap': 'round' });
      return out;
    },
  };
}

export function long(seed = 'long', o = {}) {
  // long hair (girls, Dumbledore's white locks with o.len)
  const len = o.len ?? 1.6;
  return {
    back(ctx) {
      const { rx, ry, s, lw, color } = ctx;
      const d = smoothD([[-rx * 1.12, -ry * 0.2], [-rx * 1.18, ry * len * 0.6], [-rx * 0.9, ry * len], [0, ry * (len + 0.08)], [rx * 0.9, ry * len], [rx * 1.18, ry * len * 0.6], [rx * 1.12, -ry * 0.2], [0, -ry * 1.15]], true, 0.45);
      return path(d, { fill: shade(color, -0.12), ...ink(lw) });
    },
    front(ctx) {
      const { rx, ry, s, lw, color } = ctx; const R = rng(seed);
      const part = s * rx * 0.25 + (o.part ?? 0) * rx;
      const pts = [[-rx * 1.1, ry * 0.6], [-rx * 1.14, -ry * 0.5], [-rx * 0.6, -ry * 1.12], [part, -ry * 1.17], [rx * 0.6, -ry * 1.12], [rx * 1.14, -ry * 0.5], [rx * 1.1, ry * 0.6], [rx * 0.92, ry * 0.2], [rx * 0.85, -ry * 0.35], [part + rx * 0.2, -ry * 0.6], [part, -ry * 0.66], [part - rx * 0.3, -ry * 0.58], [-rx * 0.85, -ry * 0.35], [-rx * 0.92, ry * 0.2]];
      if (o.fringe) { pts.splice(8, 5, [rx * 0.85, -ry * 0.2], [rx * 0.3 + s * 10, -ry * 0.25], [s * 10, -ry * 0.22], [-rx * 0.3 + s * 10, -ry * 0.26], [-rx * 0.85, -ry * 0.2]); }
      return path(smoothD(pts, true, 0.4), { fill: color, ...ink(lw) }) + shine(ctx, -ry * 0.8, 0.5, shade(color, 0.4));
    },
  };
}

export function ponytail(seed = 'pony', o = {}) {
  const base = neat(seed, { part: 0 });
  return {
    back(ctx) { const { rx, ry, s, lw, color } = ctx; return path(`M${-s * rx * 0.8 - rx * 0.2},${-ry * 0.5} Q${-s * rx * 1.6 - rx * 0.6},${ry * 0.4} ${-s * rx * 0.9 - rx * 0.3},${ry * 1.3} Q${-s * rx * 0.6},${ry * 0.3} ${-s * rx * 0.3},${-ry * 0.5}Z`, { fill: shade(color, -0.1), ...ink(lw) }) + base.back(ctx); },
    front: base.front,
  };
}

// ---------- hand-keyed hair: author a front view and a 3/4 (facing right) view with the same number
// of points; the turn interpolates. Each clump edge is a quadratic that bulges outward.
export function tuftD(pts, bulge = 0.18) {
  const n = pts.length;
  const cx = pts.reduce((a, p) => a + p[0], 0) / n, cy = pts.reduce((a, p) => a + p[1], 0) / n;
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const a = pts[i], b = pts[(i + 1) % n];
    const b2 = typeof b[2] === 'number' ? b[2] : bulge;
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    const dx = b[0] - a[0], dy = b[1] - a[1];
    let nx = -dy, ny = dx; // perpendicular
    // choose outward direction (away from centroid)
    if ((mx - cx) * nx + (my - cy) * ny < 0) { nx = -nx; ny = -ny; }
    const c = [mx + nx * b2, my + ny * b2];
    d += ` Q${c[0].toFixed(1)},${c[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;
  }
  return d + 'Z';
}
export function morph(F, S, t) {
  const k = Math.min(1, Math.abs(t));
  const pts = F.map((p, i) => [lerp(p[0], S[i][0], k), lerp(p[1], S[i][1], k), p[2]]);
  return t < 0 ? pts.map((p) => [-p[0], p[1], p[2]]) : pts;
}
export function keyed(K) {
  // K: {back:{F,S}, front:{F,S}, strands:{F,S} (array of polylines), shine?:bool}
  return {
    back(ctx) {
      if (K.backFn) return K.backFn(ctx);
      if (!K.back) return '';
      const { t, lw, color, rx } = ctx; const sc = rx / (K.base ?? 60);
      const pts = morph(K.back.F, K.back.S, t).map((p) => [p[0] * sc, p[1] * sc, p[2]]);
      return path(tuftD(pts, K.bulge ?? 0.16), { fill: shade(color, -0.18), ...ink(lw) });
    },
    front(ctx) {
      const { t, lw, color, rx } = ctx; const sc = rx / (K.base ?? 60);
      const pts = morph(K.front.F, K.front.S, t).map((p) => [p[0] * sc, p[1] * sc, p[2]]);
      const d = tuftD(pts, K.bulge ?? 0.16);
      const id = uid('hk');
      let inner = '';
      if (K.strands) {
        for (let i = 0; i < K.strands.F.length; i++) {
          const sp = morph(K.strands.F[i], K.strands.S[i], t).map((p) => [p[0] * sc, p[1] * sc]);
          inner += path(smoothD(sp, false, 0.5), { fill: 'none', stroke: K.strandColor || shade(color, 0.3), 'stroke-width': lw * 0.75, 'stroke-linecap': 'round', opacity: 0.85 });
        }
      }
      if (K.shine) {
        const sp = morph(K.shine.F, K.shine.S, t).map((p) => [p[0] * sc, p[1] * sc]);
        inner += path(smoothD(sp, false, 0.5), { fill: 'none', stroke: K.shineColor || shade(color, 0.5), 'stroke-width': lw * 2.2, 'stroke-linecap': 'round', opacity: 0.45 });
      }
      return path(d, { fill: color, ...ink(lw) }) + `<clipPath id="${id}"><path d="${d}"/></clipPath>` + g({ 'clip-path': `url(#${id})` }, inner);
    },
  };
}
