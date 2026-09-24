// The puppet rig. A character definition (see cast.js) + a pose + an expression → SVG.
// Local coords: feet on the ground at (0,0), +y down. Characters always face screen-right when
// turn ≥ 0; pass flip:true (or a negative turn) to face left. "F" = near/front limbs, "B" = far/back.
import { C } from '../core/palette.js';
import { g, path, circle, ellipse, taperD, smoothD, polyD, add, sub, mul, rot, deg, norm, perp, len, lerp, clamp, r2, shade, uid, mix, rng } from '../core/svg.js';
import { headOutline, onSphere, eye, brow, mouth, blush, sweat, tearStream, tearDrop, vein, gloom } from './face.js';
import { resolveExpr, deepMerge } from './expressions.js';

// ---------------------------------------------------------------- poses
// Angles in degrees from straight down; + rotates toward screen-right (the facing direction).
// arm: {sh, el, hand, hr}  leg: {hip, knee}  plus lean, headTilt, hipY (for sitting/crouching)
// hooks.onDraw(def, opts) is called for every character drawn (work/tilesfor.mjs uses it to find tiles by pose)
export const hooks = { onDraw: null };

export const POSES = {
  stand:      { armF: { sh: -6, el: 4 }, armB: { sh: 8, el: -4 }, legF: { hip: -3 }, legB: { hip: 4 } },
  relaxed:    { armF: { sh: -3, el: 10, hand: 'open' }, armB: { sh: 5, el: 8 }, legF: { hip: -5 }, legB: { hip: 6 } },
  handsHips:  { armF: { sh: -40, el: 95, hand: 'fist' }, armB: { sh: 40, el: -95, hand: 'fist' }, legF: { hip: -7 }, legB: { hip: 7 } },
  armsUp:     { armF: { sh: -140, el: -15, hand: 'splay' }, armB: { sh: 140, el: 15, hand: 'splay' }, legF: { hip: -8 }, legB: { hip: 8 } },
  panic:      { armF: { sh: -120, el: -50, hand: 'splay' }, armB: { sh: 125, el: 45, hand: 'splay' }, legF: { hip: -10, knee: 8 }, legB: { hip: 12, knee: -6 }, lean: -4 },
  point:      { armB: { sh: 84, el: 2, hand: 'point' }, armF: { sh: -6, el: 8 }, legF: { hip: -4 }, legB: { hip: 6 }, lean: 3 },
  pointUp:    { armB: { sh: 150, el: 10, hand: 'point' }, armF: { sh: -6, el: 6 }, legF: { hip: -4 }, legB: { hip: 6 } },
  raiseHand:  { armB: { sh: 160, el: 5, hand: 'palm' }, armF: { sh: -6, el: 6 }, legF: { hip: -3 }, legB: { hip: 4 } },
  holdUp:     { armB: { sh: 168, el: 4, hand: 'hold' }, armF: { sh: -8, el: 20, hand: 'fist' }, legF: { hip: -6 }, legB: { hip: 6 }, lean: -3 },
  present:    { armB: { sh: 62, el: 30, hand: 'palm' }, armF: { sh: 10, el: 40, hand: 'open' }, legF: { hip: -3 }, legB: { hip: 5 } },
  shrug:      { armF: { sh: -40, el: 120, hand: 'palm' }, armB: { sh: 40, el: -120, hand: 'palm' }, legF: { hip: -4 }, legB: { hip: 4 } },
  think:      { armF: { sh: 25, el: 135, hand: 'fist', hr: -20 }, armB: { sh: -8, el: -100, hand: 'fist', front: true }, legF: { hip: -3 }, legB: { hip: 5 }, headTilt: 5 },
  chin:       { armF: { sh: 20, el: 145, hand: 'point', hr: 170 }, armB: { sh: -8, el: -100, hand: 'fist', front: true }, legF: { hip: -3 }, legB: { hip: 5 }, headTilt: -4 },
  crossArms:  { armF: { sh: 18, el: 95, hand: 'fist' }, armB: { sh: -14, el: -100, hand: 'fist', front: true }, legF: { hip: -4 }, legB: { hip: 5 } },
  facepalm:   { armF: { sh: 45, el: 140, hand: 'palm', hr: 0 }, armB: { sh: 10, el: -5 }, legF: { hip: -4 }, legB: { hip: 5 }, headTilt: 12, lean: 5 },
  hold:       { armF: { sh: 22, el: 70, hand: 'hold' }, armB: { sh: 30, el: 60, hand: 'hold' }, legF: { hip: -3 }, legB: { hip: 4 } },
  holdOne:    { armF: { sh: 30, el: 70, hand: 'hold' }, armB: { sh: 8, el: -6 }, legF: { hip: -3 }, legB: { hip: 4 } },
  reach:      { armF: { sh: 70, el: 10, hand: 'open' }, armB: { sh: 60, el: 20, hand: 'open' }, legF: { hip: -12, knee: 5 }, legB: { hip: 14 }, lean: 10 },
  wave:       { armB: { sh: 145, el: 25, hand: 'palm' }, armF: { sh: -6, el: 6 }, legF: { hip: -3 }, legB: { hip: 4 } },
  walk:       { armF: { sh: -22, el: 12 }, armB: { sh: 24, el: 18 }, legF: { hip: 22, knee: -12 }, legB: { hip: -20, knee: -22 } },
  walk2:      { armF: { sh: 20, el: 18 }, armB: { sh: -20, el: 10 }, legF: { hip: -20, knee: -20 }, legB: { hip: 22, knee: -10 } },
  run:        { armF: { sh: -45, el: 80, hand: 'fist' }, armB: { sh: 50, el: 80, hand: 'fist' }, legF: { hip: 55, knee: -60 }, legB: { hip: -35, knee: -70 }, lean: 14, hipY: -8 },
  sit:        { armF: { sh: 15, el: 45, hand: 'open' }, armB: { sh: 18, el: 40 }, legF: { hip: 88, knee: -86 }, legB: { hip: 84, knee: -84 }, hipY: 'sit' },
  sitRead:    { armF: { sh: 28, el: 85, hand: 'hold' }, armB: { sh: 32, el: 80, hand: 'hold' }, legF: { hip: 88, knee: -86 }, legB: { hip: 84, knee: -84 }, hipY: 'sit', headTilt: 8 },
  sitFloor:   { armF: { sh: -35, el: -10, hand: 'palm' }, armB: { sh: -30, el: -10, hand: 'palm' }, legF: { hip: 80, knee: -40 }, legB: { hip: 70, knee: -50 }, hipY: 'floor', lean: -12 },
  fallBack:   { armF: { sh: -60, el: -10, hand: 'splay' }, armB: { sh: 120, el: 30, hand: 'splay' }, legF: { hip: 120, knee: -30 }, legB: { hip: 95, knee: -20 }, hipY: 'floor', lean: -28 },
  kneel:      { armF: { sh: 30, el: 40, hand: 'open' }, armB: { sh: 20, el: 30 }, legF: { hip: 85, knee: -85 }, legB: { hip: 0, knee: -90 }, hipY: 'kneel' },
  crouch:     { armF: { sh: 40, el: 50 }, armB: { sh: 30, el: 40 }, legF: { hip: 70, knee: -120 }, legB: { hip: 50, knee: -110 }, hipY: 'crouch', lean: 20 },
  bow:        { armF: { sh: 0, el: 20 }, armB: { sh: 30, el: 20 }, legF: { hip: -3 }, legB: { hip: 4 }, lean: 35, headTilt: 10 },
  bowGrand:   { armF: { sh: -70, el: -20, hand: 'open' }, armB: { sh: 80, el: 30, hand: 'palm' }, legF: { hip: 12 }, legB: { hip: -6 }, lean: 30, headTilt: 5 },
  slump:      { armF: { sh: 3, el: 2 }, armB: { sh: -3, el: 2 }, legF: { hip: -2 }, legB: { hip: 3 }, lean: 8, headTilt: 12 },
  fists:      { armF: { sh: 10, el: 60, hand: 'fist' }, armB: { sh: -10, el: -60, hand: 'fist' }, legF: { hip: -6 }, legB: { hip: 6 } },
  gesture:    { armB: { sh: 45, el: 55, hand: 'palm', hr: -20 }, armF: { sh: -4, el: 10 }, legF: { hip: -3 }, legB: { hip: 5 } },
  gesture2:   { armF: { sh: 55, el: 30, hand: 'open' }, armB: { sh: 30, el: 60, hand: 'palm' }, legF: { hip: -4 }, legB: { hip: 5 } },
  lecture:    { armB: { sh: 125, el: 35, hand: 'point' }, armF: { sh: 15, el: 60, hand: 'hold' }, legF: { hip: -4 }, legB: { hip: 6 }, lean: -2 },
  wand:       { armB: { sh: 92, el: -8, hand: 'hold' }, armF: { sh: -6, el: 8 }, legF: { hip: -6 }, legB: { hip: 8 } },
  wandUp:     { armB: { sh: 140, el: -15, hand: 'hold' }, armF: { sh: -10, el: 10 }, legF: { hip: -8 }, legB: { hip: 8 }, lean: -4 },
  hug:        { armF: { sh: 75, el: 80, hand: 'open' }, armB: { sh: 80, el: 70, hand: 'open' }, legF: { hip: -3 }, legB: { hip: 4 }, lean: 6 },
  scribble:   { armF: { sh: 45, el: 75, hand: 'hold' }, armB: { sh: 40, el: 90, hand: 'palm' }, legF: { hip: 88, knee: -86 }, legB: { hip: 84, knee: -84 }, hipY: 'sit', lean: 12, headTilt: 12 },
  cower:      { armF: { sh: 60, el: 130, hand: 'fist' }, armB: { sh: 50, el: 130, hand: 'fist' }, legF: { hip: -6, knee: 10 }, legB: { hip: 6, knee: 8 }, lean: -6, headTilt: 8 },
  // lying down, head to the left (pass rot: 90 for head to the right)
  lie:        { armF: { sh: -4, el: 6, hand: 'open' }, armB: { sh: 6, el: -6, hand: 'open' }, legF: { hip: -2 }, legB: { hip: 3 }, rot: -90, headTilt: 0 },
  tiptoe:     { armF: { sh: -30, el: 60, hand: 'fist' }, armB: { sh: 30, el: -60, hand: 'fist' }, legF: { hip: -2 }, legB: { hip: 2 }, hipY: 10 },
};

// ---------------------------------------------------------------- hands
function handShape(type, r, lw, skin, side = 1) {
  const S = { fill: skin, stroke: C.ink, 'stroke-width': lw, 'stroke-linejoin': 'round' };
  const thumbX = side * r * 0.8;
  switch (type) {
    case 'fist':
      return ellipse(0, r * 0.75, r * 0.95, r * 0.9, S) +
        path(`M${-r * 0.55},${r * 1.1} q${r * 0.3},${r * 0.2} ${r * 0.5},0 M${-r * 0.05},${r * 1.2} q${r * 0.3},${r * 0.2} ${r * 0.5},0`, { fill: 'none', stroke: C.ink, 'stroke-width': lw * 0.6 }) +
        ellipse(thumbX * 0.7, r * 0.55, r * 0.32, r * 0.5, S);
    case 'point':
      return path(`M${-r * 0.2},${r * 1.1} L${-r * 0.2},${r * 2.5} Q${0},${r * 2.75} ${r * 0.2},${r * 2.5} L${r * 0.25},${r * 1.1}Z`, S) +
        ellipse(0, r * 0.75, r * 0.92, r * 0.85, S) + ellipse(thumbX * 0.72, r * 0.6, r * 0.3, r * 0.48, S);
    case 'palm':
    case 'open': {
      // mitten with a thumb; palm faces viewer for 'palm'
      const d = `M${-r * 0.8},${0} L${-r * 0.85},${r * 1.2} Q${-r * 0.8},${r * 1.9} ${0},${r * 1.95} Q${r * 0.8},${r * 1.9} ${r * 0.85},${r * 1.2} L${r * 0.8},0Z`;
      const fingers = type === 'palm'
        ? path(`M${-r * 0.4},${r * 1.25} L${-r * 0.4},${r * 1.85} M${0},${r * 1.25} L${0},${r * 1.95} M${r * 0.4},${r * 1.25} L${r * 0.4},${r * 1.85}`, { fill: 'none', stroke: C.ink, 'stroke-width': lw * 0.55, 'stroke-linecap': 'round' })
        : path(`M${-r * 0.3},${r * 1.5} L${-r * 0.3},${r * 1.9} M${r * 0.15},${r * 1.55} L${r * 0.15},${r * 1.93}`, { fill: 'none', stroke: C.ink, 'stroke-width': lw * 0.5, 'stroke-linecap': 'round' });
      return path(d, S) + fingers + path(`M${thumbX},${r * 0.35} Q${thumbX + side * r * 0.75},${r * 0.7} ${thumbX + side * r * 0.45},${r * 1.25} Q${thumbX + side * r * 0.05},${r * 1.1} ${thumbX * 0.9},${r * 0.75}`, S);
    }
    case 'splay': {
      let d = '';
      const f = [-40, -14, 12, 38];
      let out = ellipse(0, r * 0.7, r * 0.9, r * 0.8, S);
      for (const a of f) {
        const p = [Math.sin(deg(a)) * r * 1.9, Math.cos(deg(a)) * r * 1.9];
        out += path(taperD([[Math.sin(deg(a)) * r * 0.5, r * 0.8], p], [r * 0.46, r * 0.36]), S);
      }
      out += path(taperD([[side * r * 0.6, r * 0.5], [side * r * 1.5, r * 0.9]], [r * 0.45, r * 0.34]), S);
      out += ellipse(0, r * 0.75, r * 0.72, r * 0.62, { fill: skin });
      return out;
    }
    case 'hold':
    default:
      return ellipse(0, r * 0.8, r * 0.95, r * 0.85, S) + path(`M${-r * 0.5},${r * 1.25} q${r * 0.5},${r * 0.25} ${r},0`, { fill: 'none', stroke: C.ink, 'stroke-width': lw * 0.55 }) +
        ellipse(thumbX * 0.75, r * 0.5, r * 0.3, r * 0.45, S);
  }
}

// ---------------------------------------------------------------- helpers
const dirDown = (a) => [Math.sin(deg(a)), Math.cos(deg(a))];
function hull(points) {
  const pts = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [], upper = [];
  for (const p of pts) { while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop(); lower.push(p); }
  for (let i = pts.length - 1; i >= 0; i--) { const p = pts[i]; while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop(); upper.push(p); }
  upper.pop(); lower.pop();
  return lower.concat(upper);
}
function capsule(a, b, wa, wb, style) {
  return path(taperD([a, mix(a, b, 0.5), b], [wa, (wa + wb) / 2, wb]), style);
}
// One smooth outline around a bent limb p0→p1→p2 (no seam at the joint).
export function limbD(p0, p1, p2, w0, w1, w2, cap = true) {
  const d1 = norm(sub(p1, p0)), d2 = norm(sub(p2, p1));
  const n1 = perp(d1), n2 = perp(d2);
  const bis = norm(add(n1, n2));
  const cosH = Math.max(0.35, (n1[0] * bis[0] + n1[1] * bis[1]));
  const turn = d1[0] * d2[1] - d1[1] * d2[0]; // sign of bend
  const outer = Math.min(w1 / 2 / cosH, w1 * 0.9);
  const inner = Math.min(w1 / 2 / cosH, w1 * 0.55);
  const jA = add(p1, mul(bis, turn > 0 ? inner : outer));
  const jB = add(p1, mul(bis, -(turn > 0 ? outer : inner)));
  const m1 = mix(p0, p1, 0.5), m2 = mix(p1, p2, 0.5);
  const wm1 = (w0 + w1) / 4, wm2 = (w1 + w2) / 4;
  const A = [add(p0, mul(n1, w0 / 2)), add(m1, mul(n1, wm1)), jA, add(m2, mul(n2, wm2)), add(p2, mul(n2, w2 / 2))];
  const Bs = [add(p2, mul(n2, -w2 / 2)), add(m2, mul(n2, -wm2)), jB, add(m1, mul(n1, -wm1)), add(p0, mul(n1, -w0 / 2))];
  const capEnd = cap ? [add(p2, mul(d2, w2 * 0.42))] : [];
  const capStart = cap ? [add(p0, mul(d1, -w0 * 0.4))] : [];
  return smoothD([...A, ...capEnd, ...Bs, ...capStart], true, 0.42);
}

// ---------------------------------------------------------------- main
export function drawCharacter(def, opts = {}) {
  if (hooks.onDraw) hooks.onDraw(def, opts);
  const B = def.body;
  const lw = opts.lw ?? 3.2;
  let pose = typeof opts.pose === 'string' ? POSES[opts.pose] : opts.pose;
  if (!pose) pose = POSES.stand;
  if (opts.poseMod) pose = deepMerge(pose, opts.poseMod);
  const expr = resolveExpr(opts.expr || 'neutral');
  const bodyTurn = clamp(opts.bodyTurn ?? opts.turn ?? 0.35, -1, 1);
  const headTurn = clamp(opts.headTurn ?? opts.turn ?? 0.35, -1.3, 1.3);
  const bt = Math.abs(bodyTurn), bsgn = bodyTurn >= 0 ? 1 : -1;
  // everything is built facing right (bt ≥ 0) and mirrored if the turn is negative or flip is set
  const flip = (opts.flip ? 1 : 0) ^ (bodyTurn < 0 ? 1 : 0);
  const ht = headTurn * (bodyTurn < 0 ? -1 : 1);
  const light = (opts.light ?? -0.6) * (flip ? -1 : 1);
  const skin = def.skin, skinSh = def.skinShade || shade(def.skin, -0.18);
  const O = def.outfit || {};
  const S = (fill, extra = {}) => ({ fill, stroke: C.ink, 'stroke-width': lw, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', ...extra });

  // ---- skeleton
  const legLen = B.legU + B.legL;
  let hipY = -legLen;
  if (pose.hipY === 'sit') hipY = -(opts.seat ?? B.legL * 0.98);
  else if (pose.hipY === 'floor') hipY = -B.legW * 0.9;
  else if (pose.hipY === 'kneel') hipY = -(B.legU * 0.85 + B.legW * 0.4);
  else if (pose.hipY === 'crouch') hipY = -legLen * 0.55;
  else if (typeof pose.hipY === 'number') hipY += pose.hipY;
  const hip = [opts.hipX ?? 0, hipY];
  const lean = (pose.lean || 0) + (opts.lean || 0);
  const R = (p) => add(hip, rot(p, deg(lean)));
  const tw = 1 - 0.18 * bt; // torso compression
  const cx = B.shoulderW * 0.1 * bt;
  const shF = R([cx - B.shoulderW / 2 * (1 - 0.1 * bt), -B.torsoH + B.shoulderDrop]);
  const shB = R([cx + B.shoulderW / 2 * (1 - 0.42 * bt), -B.torsoH + B.shoulderDrop + 2 * bt]);
  const neckBase = R([cx * 0.7, -B.torsoH]);
  const headTilt = (pose.headTilt || 0) + (opts.headTilt || 0);
  const neckTop = add(neckBase, rot([0, -B.neck], deg(lean * 0.6)));
  // the head follows the lean only so far: a deep bow shouldn't turn the face on its side (eyes stacked)
  const hTilt = clamp(lean * 0.6 + headTilt, -30, 30);
  const headC = add(neckTop, rot([0, -B.headRy * (B.headAttach ?? 0.92)], deg(hTilt)));
  const hipF = add(hip, [-B.hipW * 0.26 * (1 - 0.3 * bt) + cx * 0.3, 0]);
  const hipB = add(hip, [B.hipW * 0.26 * (1 - 0.5 * bt) + cx * 0.3, 0]);

  function limb(root, L1, L2, a1, a2) {
    const j = add(root, mul(dirDown(a1), L1));
    const e = add(j, mul(dirDown(a1 + a2), L2));
    return [root, j, e];
  }
  const aF = { sh: -6, el: 4, ...(pose.armF || {}), ...(opts.armF || {}) };
  const aB = { sh: 8, el: -4, ...(pose.armB || {}), ...(opts.armB || {}) };
  const lF = { hip: 0, knee: 0, ...(pose.legF || {}), ...(opts.legF || {}) };
  const lB = { hip: 0, knee: 0, ...(pose.legB || {}), ...(opts.legB || {}) };
  const armFp = limb(shF, B.armU, B.armL, aF.sh + lean, aF.el);
  const armBp = limb(shB, B.armU, B.armL, aB.sh + lean, aB.el);
  const legFp = limb(hipF, B.legU, B.legL, lF.hip, lF.knee);
  const legBp = limb(hipB, B.legU, B.legL, lB.hip, lB.knee);

  const layers = { back: [], legs: [], lower: [], torso: [], armB: [], armF: [], head: [], front: [] };

  // ---- legs
  const pantsCol = O.legs || C.brownDark;
  const shoeCol = O.shoes || C.leatherDark;
  function leg(p, far) {
    const col = far ? shade(pantsCol, -0.12) : pantsCol;
    const out = [];
    if (O.bareLegs) {
      out.push(path(limbD(p[0], p[1], p[2], B.legW * 0.8, B.legW * 0.6, B.legW * 0.48), S(far ? skinSh : skin)));
      if (O.socks) out.push(capsule(mix(p[1], p[2], 0.45), p[2], B.legW * 0.58, B.legW * 0.52, S(O.socks)));
    } else {
      out.push(path(limbD(p[0], p[1], p[2], B.legW * 1.08, B.legW * 0.95, B.legW * 0.86), S(col)));
    }
    // shoe
    const ang = Math.atan2(p[2][0] - p[1][0], p[2][1] - p[1][1]);
    const fwd = rot([1, 0], -ang * 0.35);
    const toe = B.foot * (0.45 + 0.55 * Math.max(bt, 0.25));
    const a = p[2];
    const d = `M${a[0] - B.foot * 0.28},${a[1] - B.legW * 0.1} Q${a[0] - B.foot * 0.35},${a[1] + B.legW * 0.55} ${a[0]},${a[1] + B.legW * 0.55} L${a[0] + toe * fwd[0]},${a[1] + B.legW * 0.55 + toe * fwd[1] * 0.3} Q${a[0] + toe * fwd[0] + B.legW * 0.35},${a[1] + B.legW * 0.2} ${a[0] + toe * fwd[0] * 0.55},${a[1] - B.legW * 0.12}Z`;
    out.push(path(d, S(far ? shade(shoeCol, -0.15) : shoeCol)));
    out.push(path(`M${a[0] - B.foot * 0.1},${a[1] + B.legW * 0.1} Q${a[0] + toe * 0.4},${a[1] - B.legW * 0.1} ${a[0] + toe * 0.8},${a[1] + B.legW * 0.18}`, { fill: 'none', stroke: shade(shoeCol, 0.35), 'stroke-width': lw * 0.6, opacity: 0.6 }));
    return out.join('');
  }
  layers.legs.push(leg(legBp, true), leg(legFp, false));

  // ---- torso & lower garment
  const T = (x, y) => R([cx + x, y]);
  const sw = B.shoulderW / 2, ww = B.waistW / 2, hw = B.hipW / 2;
  const torsoPts = [
    T(-sw * tw * 0.72, -B.torsoH - 1),
    T(-sw * tw * 1.0 + 2, -B.torsoH + B.shoulderDrop + 3),
    T(-ww * tw * 1.0, -B.torsoH * 0.45),
    T(-hw * tw * 1.0, -B.torsoH * 0.02),
    T(-hw * tw * 0.95, B.hemDrop ?? 8),
    T(hw * tw * (1 - 0.3 * bt), B.hemDrop ?? 8),
    T(hw * tw * (1 - 0.3 * bt), -B.torsoH * 0.02),
    T(ww * tw * (1 - 0.3 * bt), -B.torsoH * 0.45),
    T(sw * tw * (1 - 0.35 * bt) - 2, -B.torsoH + B.shoulderDrop + 3),
    T(sw * tw * 0.72 * (1 - 0.3 * bt), -B.torsoH - 1),
  ];
  let torsoD = smoothD(torsoPts, true, 0.35);
  const robeExtras = [];
  const topCol = O.top || C.mustard;

  if (O.robe || O.skirt) {
    // lower garment hull over legs
    const hemFrac = O.robe ? (O.robeLen ?? 0.96) : (O.skirtLen ?? 0.55);
    const pts = [T(-ww * tw * 1.05, -B.torsoH * 0.45), T(ww * tw * 1.05, -B.torsoH * 0.45), add(hip, [-hw * 1.05, 0]), add(hip, [hw * 1.05, 0])];
    const flare = (O.flare ?? 1) * B.legW;
    for (const L of [legFp, legBp]) {
      const kneeF = hemFrac > 0.5 ? L[1] : mix(L[0], L[1], hemFrac / 0.5);
      pts.push(add(kneeF, [-flare * 0.8, 0]), add(kneeF, [flare * 0.8, 0]));
      if (hemFrac > 0.5) {
        const f = (hemFrac - 0.5) / 0.5;
        const end = mix(L[1], L[2], f);
        pts.push(add(end, [-flare * 1.35, B.legW * 0.1]), add(end, [flare * 1.35, B.legW * 0.1]));
      }
    }
    const hl = hull(O.robe ? [...pts, ...torsoPts] : pts);
    const lowerCol = O.robeColor || O.skirt || O.top;
    const lowerD = smoothD(hl, true, 0.25);
    if (O.robe) torsoD = smoothD(hl, true, 0.3);
    else layers.lower.push(path(lowerD, S(lowerCol)));
    const tgt = O.robe ? robeExtras : layers.lower;
    // folds
    const R2 = rng(def.name || 'x');
    let folds = '';
    const hemY = Math.max(...hl.map((p) => p[1]));
    for (let i = 0; i < 3; i++) {
      const x = lerp(-hw * 0.6, hw * 0.7, (i + 0.5) / 3) + hip[0] + R2.range(-6, 6);
      folds += `M${x},${hip[1] + 20} Q${x + R2.range(-8, 8)},${(hip[1] + hemY) / 2} ${x + R2.range(-10, 10)},${hemY - 6} `;
    }
    tgt.push(path(folds, { fill: 'none', stroke: shade(lowerCol, -0.35), 'stroke-width': lw * 0.7, opacity: 0.55, 'stroke-linecap': 'round' }));
    if (O.robeTrim) {
      // front opening trim line
      const top = T(-sw * 0.15 + sw * 0.35 * bt, -B.torsoH * 0.4);
      tgt.push(path(`M${top[0]},${top[1]} Q${top[0] + 4},${(top[1] + hemY) / 2} ${top[0] + 10 * bt},${hemY - 3}`, { fill: 'none', stroke: O.robeTrim, 'stroke-width': lw * 2.4, 'stroke-linecap': 'round' }));
    }
    layers.lower._shade = { d: lowerD };
  }

  // torso body
  // Seamless shoulders, drawn in two passes like a union of shapes: first the torso's and each front arm's upper
  // sleeve OUTLINES at double width, then the torso FILL over them (the arm's fill comes later with the arm).
  // Where arm and body overlap, the fills hide the inner lines; only the outer half of the double line survives,
  // at normal width. The arm's own outline (in arm()) is left out of its rounded top so no arc cuts across the body.
  const seamArms = O.shortSleeves ? [] : [armFp, ...(aB.front === true ? [armBp] : [])];
  if (seamArms.length) {
    layers.torso.push(path(torsoD, { fill: 'none', stroke: C.ink, 'stroke-width': lw * 2, 'stroke-linejoin': 'round' }));
    for (const P of seamArms) layers.torso.push(capOnly(P, sleeveShape(P, { fill: 'none', stroke: C.ink, 'stroke-width': lw * 2, 'stroke-linejoin': 'round' })));
    layers.torso.push(path(torsoD, { fill: topCol }));
  } else layers.torso.push(path(torsoD, S(topCol)));
  if (O.pattern) layers.torso.push(path(torsoD, { fill: `url(#pat-${O.pattern})`, opacity: 0.55 }));
  // cel shading on torso (far side)
  const tid = uid('ts');
  layers.torso.push(`<clipPath id="${tid}"><path d="${torsoD}"/></clipPath>`);
  const shadeSide = light < 0 ? 1 : -1;
  const sc = T(sw * 1.5 * shadeSide, -B.torsoH * 0.5);
  layers.torso.push(g({ 'clip-path': `url(#${tid})` },
    ellipse(sc[0], sc[1] + B.torsoH * 0.3, sw * 0.8, B.torsoH * 1.6, { fill: '#3b1f3a', opacity: 0.18, filter: 'url(#blur4)' }),
    robeExtras.join(''),
    O.torsoDetail ? O.torsoDetail({ T, sw, ww, hw, tw, bt, B, lw, S, cx, R }) : ''));
  if (O.hem !== false && !O.robe) {
    const hl = T(-hw * tw * 0.96, (B.hemDrop ?? 8) - 9), hr = T(hw * tw * (1 - 0.3 * bt), (B.hemDrop ?? 8) - 9);
    layers.torso.push(path(`M${hl[0]},${hl[1]} L${hr[0]},${hr[1]}`, { stroke: C.ink, 'stroke-width': lw * 0.6, opacity: 0.7 }));
    if (O.ribbed) { let d = ''; for (let i = 0; i <= 8; i++) { const a = mix(hl, hr, i / 8); d += `M${a[0]},${a[1]} l0,9 `; } layers.torso.push(path(d, { stroke: shade(topCol, -0.35), 'stroke-width': lw * 0.45 })); }
  }
  // collar / neckline
  const nl = T(-sw * 0.3, -B.torsoH + 1), nr = T(sw * 0.3 * (1 - 0.3 * bt), -B.torsoH + 1), nm = T(sw * 0.05 * bt, -B.torsoH + (O.vneck ? B.torsoH * 0.3 : 10));
  if (O.collar) {
    layers.torso.push(path(`M${nl[0] - 2},${nl[1] - 3} L${nm[0]},${nm[1] + 6} L${nm[0] - 16},${nm[1] + 2}Z M${nr[0] + 2},${nr[1] - 3} L${nm[0]},${nm[1] + 6} L${nm[0] + 14},${nm[1] + 1}Z`, S(O.collar)));
  }
  if (O.neckline !== false) layers.torso.push(path(`M${nl[0]},${nl[1]} Q${nm[0]},${nm[1] + 4} ${nr[0]},${nr[1]}`, { fill: 'none', stroke: C.ink, 'stroke-width': lw * 0.9 }));
  if (O.tie) layers.torso.push(path(`M${nm[0] - 4},${nm[1] + 2} L${nm[0] + 4},${nm[1] + 2} L${nm[0] + 6},${nm[1] + 44} L${nm[0]},${nm[1] + 52} L${nm[0] - 6},${nm[1] + 44}Z`, S(O.tie)));
  if (O.over) layers.torso.push(O.over({ T, sw, ww, hw, tw, bt, B, lw, S, cx, R, hip, nm, nl, nr }));

  // ---- arms
  // the sleeve's outline shape (same geometry arm() draws), and the shoulder cap region: a disk round the joint,
  // on the far side of a line across the arm just below the shoulder
  function sleeveShape(p, style) {
    const w0 = B.armW * 1.05, w1 = B.armW * 0.95, w2 = O.wideSleeves ? B.armW * (O.cuffW ?? 2.1) : B.armW * 0.82;
    return O.wideSleeves ? capsule(p[0], p[1], w0, w1, style) : path(limbD(p[0], p[1], p[2], w0, w1, w2 * 1.05), style);
  }
  function capDefs(p) {
    const u = norm(sub(p[1], p[0])), cut = add(p[0], mul(u, B.armW * 0.35)), ang = Math.atan2(u[1], u[0]) * 180 / Math.PI;
    const hid = uid('ch'), cid = uid('cc'), r = B.armW * 0.95 + lw * 3;
    const defs = `<clipPath id="${hid}"><rect x="-400" y="-200" width="400" height="400" transform="translate(${r2(cut[0])},${r2(cut[1])}) rotate(${r2(ang)})"/></clipPath><clipPath id="${cid}">${circle(p[0][0], p[0][1], r, {})}</clipPath>`;
    return { defs, hid, cid, r };
  }
  // draw content only inside the shoulder cap region
  function capOnly(p, content) { const c = capDefs(p); return c.defs + g({ 'clip-path': `url(#${c.hid})` }, g({ 'clip-path': `url(#${c.cid})` }, content)); }
  // draw content everywhere except the shoulder cap region
  function capExcept(p, content) {
    const c = capDefs(p), mid = uid('cm');
    return c.defs + `<mask id="${mid}" maskUnits="userSpaceOnUse" x="-3000" y="-3000" width="6000" height="6000"><rect x="-3000" y="-3000" width="6000" height="6000" fill="#fff"/><g clip-path="url(#${c.hid})">${circle(p[0][0], p[0][1], c.r, { fill: '#000' })}</g></mask>` + g({ mask: `url(#${mid})` }, content);
  }
  const handAt = {}; // where each hand is actually drawn (past the cuff in wide sleeves), for the handF/handB anchors
  function arm(p, a, far) {
    const out = [];
    const seam = !O.shortSleeves && (!far || a.front === true); // arm drawn over the torso: its shoulder merges into it
    const sleeve = O.sleeve || topCol;
    const col = far ? shade(sleeve, -0.15) : sleeve;
    // dark sleeves (Hogwarts robes) vanish against the dark torso: give them a faint lighter rim just outside the ink line
    const hexL = (h) => { const m = /^#?([0-9a-f]{6})$/i.exec(h || ''); if (!m) return 1; const n = parseInt(m[1], 16); return (0.3 * (n >> 16) + 0.59 * ((n >> 8) & 255) + 0.11 * (n & 255)) / 255; };
    const RS = hexL(col) < 0.2 && (!far || a.front === true) ? { fill: 'none', stroke: shade(col, 0.55), 'stroke-width': lw * 2.6, 'stroke-linejoin': 'round', opacity: 0.42 } : null;
    const wide = O.wideSleeves;
    const w0 = B.armW * 1.05, w1 = B.armW * 0.95, w2 = wide ? B.armW * (O.cuffW ?? 2.1) : B.armW * 0.82;
    const side = far ? 1 : -1;
    const forearmAng = Math.atan2(p[2][0] - p[1][0], p[2][1] - p[1][1]);
    const handRot = -forearmAng * 180 / Math.PI + (a.hr || 0);
    const handType = a.hand || 'open';
    const handR = B.handR;
    // in wide sleeves the hand comes out past the cuff instead of hiding inside it
    // (not for folded arms, elbow bent ~90-125°: there the hand stays at the cuff)
    const hp = wide ? add(p[2], mul([Math.sin(forearmAng), Math.cos(forearmAng)], handR * (O.handOut ?? (Math.abs(a.el || 0) > 80 && Math.abs(a.el || 0) < 125 ? 0.2 : 0.8)))) : p[2];
    handAt[far ? 'B' : 'F'] = hp;
    // hanging hands show mirrored thumbs; hands held out roughly level show both thumbs the same way (up)
    const thumbSide = Math.abs(Math.sin(forearmAng)) > 0.8 ? 1 : (flip ? -side : side);
    const hand = g({ transform: `translate(${r2(hp[0])},${r2(hp[1])}) rotate(${r2(handRot)})` },
      a.under ? a.under : '',
      handShape(handType, handR, lw * 0.9, far ? skinSh : skin, thumbSide));
    // a held prop is drawn after the sleeve, so the cuff never swallows it
    const propG = a.prop ? g({ transform: `translate(${r2(hp[0])},${r2(hp[1])}) rotate(${r2(handRot)})` }, a.prop) : '';
    if (O.shortSleeves) {
      out.push(path(limbD(p[0], p[1], p[2], B.armW * 0.75, B.armW * 0.65, B.armW * 0.55), S(far ? skinSh : skin)));
      const mid = mix(p[0], p[1], 0.55);
      out.push(capsule(p[0], mid, w0 * 1.1, w0 * 1.05, S(col)));
      out.push(hand);
      return out.join('') + propG;
    }
    if (!wide) {
      out.push(hand);
      const armD = limbD(p[0], p[1], p[2], w0, w1, w2 * 1.05);
      if (seam) {
        // outline pass (double width, minus the shoulder cap, which the torso pass draws), then the fill over it
        if (RS) out.push(capExcept(p, path(armD, RS)));
        out.push(capExcept(p, path(armD, S(col, { fill: 'none', 'stroke-width': lw * 2 }))), path(armD, { fill: col }));
      } else {
        if (RS) out.push(path(armD, RS));
        out.push(path(armD, S(col)));
      }
      // elbow crease
      const cr = add(p[1], mul(norm(sub(p[2], p[0])), -2));
      out.push(path(`M${r2(cr[0] - 4)},${r2(cr[1] - 3)} q4,3 8,0`, { fill: 'none', stroke: shade(col, -0.4), 'stroke-width': lw * 0.5, opacity: 0.7 }));
      if (O.cuff) out.push(capsule(mix(p[1], p[2], 0.84), mix(p[1], p[2], 0.99), w2 * 1.08, w2 * 1.08, S(O.cuff)));
      return out.join('') + propG;
    }
    const lowerD = wide ? `M${p[1][0] - w1 / 2 * Math.cos(forearmAng)},${p[1][1] + w1 / 2 * Math.sin(forearmAng)} L${p[2][0] - w2 / 2 * Math.cos(forearmAng) + Math.sin(forearmAng) * 6},${p[2][1] + w2 / 2 * Math.sin(forearmAng) + Math.cos(forearmAng) * 6} Q${p[2][0] + Math.sin(forearmAng) * 14},${p[2][1] + Math.cos(forearmAng) * 14} ${p[2][0] + w2 / 2 * Math.cos(forearmAng) + Math.sin(forearmAng) * 6},${p[2][1] - w2 / 2 * Math.sin(forearmAng) + Math.cos(forearmAng) * 6} L${p[1][0] + w1 / 2 * Math.cos(forearmAng)},${p[1][1] - w1 / 2 * Math.sin(forearmAng)}Z` : '';
    const lower = wide ? path(lowerD, S(col)) : capsule(p[1], p[2], w1, w2, S(col));
    if (wide) {
      out.push(hand);
      if (RS) out.push(path(lowerD, RS), seam ? capExcept(p, capsule(p[0], p[1], w0, w1, RS)) : capsule(p[0], p[1], w0, w1, RS));
      // one outline round the whole sleeve: both pieces stroked double-width, then both filled on top,
      // so the fills hide the seam at the elbow and only the outer half of the stroke shows
      const S2 = S(col, { 'stroke-width': lw * 2 }), F = { fill: col, stroke: 'none' };
      out.push(path(lowerD, S2), seam ? capExcept(p, capsule(p[0], p[1], w0, w1, S2)) : capsule(p[0], p[1], w0, w1, S2), path(lowerD, F), capsule(p[0], p[1], w0, w1, F));
      // dark sleeve mouth
      const mouthC = add(p[2], mul([Math.sin(forearmAng), Math.cos(forearmAng)], 8));
      out.push(ellipse(mouthC[0], mouthC[1], w2 * 0.42, w2 * 0.16, { fill: shade(col, -0.55), transform: `rotate(${r2(-forearmAng * 180 / Math.PI)} ${r2(mouthC[0])} ${r2(mouthC[1])})`, opacity: 0.9 }));
      if (O.cuff) out.push(path(taperD([add(p[2], mul(perp([Math.sin(forearmAng), Math.cos(forearmAng)]), -w2 * 0.48)), add(p[2], mul(perp([Math.sin(forearmAng), Math.cos(forearmAng)]), w2 * 0.48))].map((q) => add(q, mul([Math.sin(forearmAng), Math.cos(forearmAng)], 4))), lw * 2.2), { fill: O.cuff, stroke: 'none' }));
      return out.join('') + propG;
    } else {
      out.push(lower);
      if (O.cuff) out.push(capsule(mix(p[1], p[2], 0.86), p[2], w2 * 1.02, w2 * 1.02, S(O.cuff)));
      out.push(hand);
    }
    if (RS) out.push(capsule(p[0], p[1], w0, w1, RS));
    out.push(capsule(p[0], p[1], w0, w1, S(col)));
    return out.join('') + propG;
  }
  layers.armB.push(arm(armBp, aB, true));
  layers.armF.push(arm(armFp, aF, false));

  // ---- head
  const H = drawHead(def, { turn: ht, expr, lw, light, tilt: hTilt, extras: opts.extras || {}, noGlasses: opts.noGlasses || opts.glasses === false || (opts.extras || {}).glasses === false, hatOff: opts.hatOff, hairOverride: opts.hair, mask: opts.mask });
  const headG = g({ transform: `translate(${r2(headC[0])},${r2(headC[1])}) rotate(${r2(lean * 0.6 + headTilt)})` }, H.main);
  const headBack = g({ transform: `translate(${r2(headC[0])},${r2(headC[1])}) rotate(${r2(lean * 0.6 + headTilt)})` }, H.back);
  // neck
  const neck = capsule(neckBase, add(neckTop, [0, -6]), B.neckW, B.neckW * 0.92, S(skin));
  const neckShadow = ellipse(neckTop[0] + 2, neckTop[1] + 2, B.neckW * 0.55, 6, { fill: skinSh, opacity: 0.8 });

  const inFront = aB.front === true;
  const order = [
    headBack,
    inFront ? '' : layers.armB.join(''),
    layers.legs.join(''),
    layers.lower.filter((x) => typeof x === 'string').join(''),
    neck, neckShadow,
    layers.torso.join(''),
    O.scarf ? O.scarf({ neckBase, neckTop, lw, S, bt, B }) : '',
    headG,
    inFront ? layers.armB.join('') : '',
    layers.armF.join(''),
    opts.front || '',
  ];
  let out = order.join('');
  if (flip) out = g({ transform: 'scale(-1,1)' }, out);
  // anchor points (in un-flipped local coords, mirrored if flipped) for props/bubbles
  const fx = (p) => [flip ? -p[0] : p[0], p[1]];
  const anchors = { head: fx(headC), mouth: fx(add(headC, [H.mouthX, B.headRy * 0.55])), handF: fx(handAt.F || armFp[2]), handB: fx(handAt.B || armBp[2]), top: fx([headC[0], headC[1] - B.headRy * 1.25]), hip: fx(hip), neck: fx(neckTop) };
  return { svg: out, anchors };
}

// ---------------------------------------------------------------- head
export function drawHead(def, o) {
  const B = def.body;
  const t = clamp(o.turn ?? 0, -0.8, 0.8), lw = o.lw ?? 3.2;
  const expr = o.expr || {};
  const rx = B.headRx, ry = B.headRy;
  const hd = { rx, ry, ...def.head };
  // the blue 'cold' tint is Harry's dark side; other characters' cold/menace faces keep their own skin
  const coldTint = expr.cold && (def.coldTint ?? /harry/i.test(def.name || ''));
  const skin = expr.pale ? shade(def.skin, 0.25) : (coldTint ? mixCold(def.skin) : def.skin);
  const skinSh = def.skinShade || shade(def.skin, -0.18);
  const outline = headOutline(hd, t);
  const s = Math.sin(t * 0.62);
  const back = [], main = [];
  const hairCtx = { rx, ry, t, s, lw, color: def.hair?.color || C.hairBrown, expr, def };
  // hair behind head
  if (def.hair?.back) back.push(def.hair.back(hairCtx));
  // ears
  const E = def.ears ?? { y: 8, r: 12 };
  for (const side of [-1, 1]) {
    const p = onSphere(side * rx * 0.97, rx, t);
    const vis = Math.cos(Math.asin(clamp(side * 0.97, -1, 1)) + t * 0.62);
    if (vis > -0.15 && vis < 0.75) {
      const ex = p.x - side * 2 + (side * t < 0 ? side * 4 : 0);
      const ew = E.r * (0.45 + 0.55 * Math.min(1, Math.abs(Math.sin(Math.asin(side * 0.97) + t * 0.62)) * 0.2 + (1 - Math.max(0, vis)) * 0.9));
      if (def.ears?.pointy) main.push(path(`M${ex},${E.y - E.r} L${ex + side * E.r * 2.2},${E.y - E.r * 1.6} L${ex + side * ew * 0.4},${E.y + E.r}Z`, { fill: skin, stroke: C.ink, 'stroke-width': lw }));
      else main.push(ellipse(ex + side * ew * 0.35, E.y, ew, E.r, { fill: skin, stroke: C.ink, 'stroke-width': lw }) +
        path(`M${ex + side * ew * 0.3},${E.y - E.r * 0.5} q${side * ew * 0.4},${E.r * 0.4} 0,${E.r}`, { fill: 'none', stroke: skinSh, 'stroke-width': lw * 0.8 }));
    }
  }
  main.push(path(outline, { fill: skin, stroke: C.ink, 'stroke-width': lw * 1.05, 'stroke-linejoin': 'round' }));
  // cel shade on far side from light
  const hid = uid('hd');
  main.push(`<clipPath id="${hid}"><path d="${outline}"/></clipPath>`);
  const L = o.light ?? -0.6;
  const shx = (L < 0 ? 1 : -1) * rx * 1.25 + s * rx * 0.2;
  main.push(g({ 'clip-path': `url(#${hid})` },
    ellipse(shx, ry * 0.1, rx * 0.8, ry * 1.5, { fill: skinSh, opacity: 0.22, filter: 'url(#blur4)' }),
    coldTint ? path(`M${-rx},${-ry} L${rx},${-ry} L${rx},${ry * 0.2} L${-rx},${ry * 0.2}Z`, { fill: '#6d8fb0', opacity: 0.18 }) : '',
  ));

  // ---- face
  const F = def.face;
  const eyeY = F.eyeY, sp = F.eyeSpacing;
  const eyesSt = expr.eyes || {};
  const out = [];
  const pL = onSphere(-sp, rx, t), pR = onSphere(sp, rx, t);
  const eyeSkin = skin;
  const eyeState = (side) => ({ ...eyesSt, ...(side < 0 ? expr.eyeL : expr.eyeR), skin: eyeSkin });
  // brows first under hair? draw after eyes
  if (pL.vis) out.push(eye(pL.x, eyeY, F.eye, eyeState(-1), -1, Math.min(1.15, pL.k), lw, null));
  if (pR.vis) out.push(eye(pR.x, eyeY, F.eye, eyeState(1), 1, Math.min(1.15, pR.k), lw, null));
  // nose
  const nz = onSphere(0, rx, t);
  const noseY = F.noseY;
  if (F.nose === 'button') {
    out.push(path(`M${nz.x + s * 6 - 3},${noseY} q${4 + s * 5},${3} ${1 + s * 6},${6}`, { fill: 'none', stroke: skinSh, 'stroke-width': lw * 1.1, 'stroke-linecap': 'round' }));
  } else if (F.nose === 'long' || F.nose === 'hook' || F.nose === 'point') {
    const L2 = F.noseLen ?? 22, dir = s >= 0 ? 1 : -1, a = Math.min(1, Math.abs(s) / 0.58);
    const bx = nz.x, nc = shade(skin, -0.5);
    const top = [bx + dir * a * 2, noseY - L2 * 0.62];
    const tip = [bx + dir * (a * L2 * 0.32 + (F.nose === 'point' ? 2 : 0) + 2), noseY + L2 * 0.36];
    const base = [bx - dir * (2 + (1 - a) * 5), noseY + L2 * 0.5];
    if (a > 0.15) out.push(path(`M${top[0]},${top[1]} Q${bx + dir * a * L2 * (F.nose === 'hook' ? 0.45 : 0.22)},${noseY - L2 * 0.05} ${tip[0]},${tip[1]}`, { fill: 'none', stroke: nc, 'stroke-width': lw * 0.8, 'stroke-linecap': 'round' }));
    out.push(path(`M${tip[0]},${tip[1]} Q${tip[0] + dir * 1.5},${tip[1] + L2 * 0.16} ${base[0]},${base[1]}`, { fill: 'none', stroke: nc, 'stroke-width': lw * 0.95, 'stroke-linecap': 'round' }));
    if (a < 0.6) out.push(path(`M${bx - dir * 7 - 2},${noseY + L2 * 0.42} q3,3 6,1`, { fill: 'none', stroke: nc, 'stroke-width': lw * 0.7, 'stroke-linecap': 'round', opacity: 0.8 }));
  } else if (F.nose === 'goblin') {
    const dir = s >= 0 ? 1 : -1, a = Math.min(1, Math.abs(s) / 0.5);
    const tip = [nz.x + dir * (10 + 26 * a), noseY + 20];
    out.push(path(`M${nz.x - dir * 4},${noseY - 18} Q${nz.x + dir * (8 + 14 * a)},${noseY - 12} ${tip[0]},${tip[1]} Q${tip[0] - dir * 6},${tip[1] + 6} ${nz.x - dir * 2},${noseY + 16} Q${nz.x - dir * 10},${noseY + 10} ${nz.x - dir * 8},${noseY + 2}`, { fill: skin, stroke: C.ink, 'stroke-width': lw * 0.9, 'stroke-linejoin': 'round' }));
  } else {
    out.push(path(`M${nz.x + s * 5 - 2},${noseY - 4} q${3 + s * 4},${6} ${-2 + s * 4},${9}`, { fill: 'none', stroke: skinSh, 'stroke-width': lw * 1.0, 'stroke-linecap': 'round' }));
  }
  // cheeks
  if (F.freckles) {
    const R = rng(7);
    for (const side of [-1, 1]) { const p = onSphere(side * sp * 1.05, rx, t); if (!p.vis) continue; for (let i = 0; i < 6; i++) out.push(circle(p.x + (R() - 0.5) * 18 * p.k, noseY - 4 + (R() - 0.3) * 10, 1.6, { fill: '#b56a42', opacity: 0.75 })); }
  }
  if (F.cheekLines) for (const side of [-1, 1]) { const p = onSphere(side * sp * 1.1, rx, t); if (p.vis) out.push(path(`M${p.x - side * 2},${F.mouthY - 12} q${side * 4},${8} ${side * 2},${16}`, { fill: 'none', stroke: skinSh, 'stroke-width': lw * 0.7 })); }
  if (F.wrinkles) for (const side of [-1, 1]) { const p = onSphere(side * (sp + F.eye.w * 0.7), rx, t); if (p.vis) out.push(path(`M${p.x},${eyeY - 2} l${side * 6},-3 M${p.x},${eyeY + 3} l${side * 6},2`, { fill: 'none', stroke: skinSh, 'stroke-width': lw * 0.6 })); }
  const mz = onSphere(F.mouthX ?? 0, rx, t);
  if (def.facialHair) out.push(def.facialHair({ rx, ry, t, s, lw, F, mz, expr }));
  if (F.rosy) for (const side of [-1, 1]) { const p = onSphere(side * sp * 1.12, rx, t); if (p.vis) out.push(ellipse(p.x, eyeY + F.eye.h * 0.72, 11 * p.k + 2, 6, { fill: C.blush, opacity: 0.22, filter: 'url(#glowXs)' })); }
  // mouth
  const mSt = expr.mouth || { type: 'line' };
  out.push(mouth(mz.x + s * 3, F.mouthY, F.mouth || { w: 20 }, mSt, Math.min(1, 0.6 + mz.k * 0.4), lw, skin));
  if (F.buckTeeth && ['line', 'smirk', 'wobble', 'flat', 'smile2', 'pout'].includes(mSt.type) && (mSt.curve ?? 0) > -0.3) { const tx = mz.x + s * 3; out.push(path(`M${tx - 3.5},${F.mouthY + 1.5} L${tx - 3.5},${F.mouthY + 5.5} L${tx + 3.5},${F.mouthY + 5.5} L${tx + 3.5},${F.mouthY + 1.5}Z M${tx},${F.mouthY + 1.5} L${tx},${F.mouthY + 5.5}`, { fill: '#fffaf0', stroke: C.ink, 'stroke-width': lw * 0.45, 'stroke-linejoin': 'round' })); }
  if (F.lips && !['shout', 'scream', 'grin', 'laugh', 'smile', 'o', 'open', 'grit', 'grimace', 'frown-open', 'wobble'].includes(mSt.type)) { const lw2 = (F.mouth?.w ?? 20) * 0.5, lx0 = mz.x + s * 3; out.push(path(`M${lx0 - lw2 * 0.6},${F.mouthY + 3.5} Q${lx0},${F.mouthY + 8} ${lx0 + lw2 * 0.6},${F.mouthY + 3.5}`, { fill: 'none', stroke: F.lips, 'stroke-width': lw * 1.3, 'stroke-linecap': 'round', opacity: 0.7 })); }
  // extras
  if (expr.blush) for (const side of [-1, 1]) { const p = onSphere(side * sp * 1.15, rx, t); if (p.vis) out.push(blush(p.x, eyeY + F.eye.h * 0.75, 10 * p.k + 3, lw, expr.blush === 'strong')); }
  if (expr.tears === 'stream') for (const side of [-1, 1]) { const p = side < 0 ? pL : pR; if (p.vis) out.push(tearStream(p.x, eyeY + 6, ry * 0.8, lw)); }
  if (expr.tearDrop) out.push(tearDrop(pR.x + 6, eyeY + 12, 9, lw));
  main.push(out.join(''));
  // brows
  const BR = F.brow;
  const bSt = expr.brows || {};
  const bcol = BR.color || def.hair?.color || C.hairBrown;
  const browsSvg = [];
  if (pL.vis) browsSvg.push(brow(pL.x, eyeY - F.eye.h * 0.62 - (BR.gap ?? 8), BR, bSt, -1, pL.k, bcol));
  if (pR.vis) browsSvg.push(brow(pR.x, eyeY - F.eye.h * 0.62 - (BR.gap ?? 8), BR, bSt, 1, pR.k, bcol));
  if (def.scar) {
    const p = onSphere(-rx * 0.28, rx, t);
    if (p.vis && !o.hideScar) main.push(path(`M${p.x - 5},${-ry * 0.34} l9,8 l-8,3 l9,9`, { fill: 'none', stroke: '#a3322e', 'stroke-width': lw * 0.95, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
  }
  // hair front
  const hairFront = def.hair?.front ? def.hair.front(hairCtx) : '';
  if (def.browsOverHair) { main.push(hairFront); main.push(browsSvg.join('')); }
  else { main.push(browsSvg.join('')); main.push(hairFront); }
  // glasses
  if (def.glasses && !o.noGlasses) main.push(glasses(def.glasses, pL, pR, eyeY, F, t, lw, expr.glint || o.extras.glint));
  if (expr.sweat) { const p = onSphere(rx * 0.72, rx, t); main.push(sweat(p.x + 6, -ry * 0.25, 13, lw)); }
  if (expr.vein) main.push(vein(-rx * 0.45 + s * 20, -ry * 0.55, 7, lw));
  if (expr.gloom) main.push(gloom(rx, ry, lw));
  if (o.mask) main.push(faceMask(o.mask, { rx, ry, t, s, lw, F: def.face, outline }));
  if (def.hat && !o.hatOff) main.push(def.hat(hairCtx));
  return { main: main.join(''), back: back.join(''), mouthX: mz.x };
}

function mixCold(hex) { return shade(hex, 0.05); }

// Harry's disguises. 'scarf' = winter scarf wrapped over the lower face and brow (eyes peeking out);
// 'scarfDown' = pulled down to the chin (mouth free, e.g. to drink); 'sweatband' = band over the scar only.
function faceMask(kind, { rx, ry, t, s, lw, F, outline }) {
  const col = '#7b2433', stripe = '#d6a33a';
  const S = { fill: col, stroke: C.ink, 'stroke-width': lw, 'stroke-linejoin': 'round' };
  let out = '';
  const band = (y0, y1, bulge) => `M${-rx * 1.06},${y0} Q${s * rx * 0.3},${y0 - bulge} ${rx * 1.06},${y0} L${rx * 1.02},${y1} Q${s * rx * 0.3},${y1 + bulge * 0.6} ${-rx * 1.02},${y1}Z`;
  if (kind === 'sweatband') return path(band(-ry * 0.58, -ry * 0.3, 8), { fill: '#f2ecde', stroke: C.ink, 'stroke-width': lw }) + path(`M${-rx},${-ry * 0.44} Q${s * rx * 0.3},${-ry * 0.5} ${rx},${-ry * 0.44}`, { fill: 'none', stroke: '#c43a32', 'stroke-width': lw * 1.4 });
  const stripes = (y0, y1) => { let d = ''; for (let i = 0; i < 4; i++) { const y = y0 + (y1 - y0) * (i + 0.5) / 4; d += `M${-rx},${y} Q${s * rx * 0.3},${y - 4} ${rx},${y} `; } return path(d, { fill: 'none', stroke: stripe, 'stroke-width': lw * 1.1, opacity: 0.8 }); };
  const cid = uid('mk');
  let inner = path(band(-ry * 0.62, -ry * 0.2, 10), S) + stripes(-ry * 0.58, -ry * 0.24);
  if (kind === 'scarf') inner += path(band(F.noseY - 12, ry * 1.3, 6), S) + stripes(F.noseY - 6, ry * 1.0);
  else if (kind === 'scarfDown') inner += path(band(ry * 0.78, ry * 1.3, 4), S);
  out += `<clipPath id="${cid}"><path d="${outline}" transform="scale(1.04)"/></clipPath>` + g({ 'clip-path': `url(#${cid})` }, inner) + path(outline, { fill: 'none', stroke: C.ink, 'stroke-width': lw * 1.05, transform: 'scale(1.04)', opacity: 0 });
  // knot & trailing ends at the back of the head
  const kx = (s >= 0 ? -1 : 1) * rx * 0.95;
  if (kind !== 'scarfDown') out += path(`M${kx},${-ry * 0.42} q${-Math.sign(kx) * -18},10 ${Math.sign(kx) * 22},34 l${Math.sign(kx) * 10},-8 q-10,-18 -8,-30Z`, S);
  return out;
}

function glasses(G, pL, pR, eyeY, F, t, lw, glint) {
  const out = [];
  const r = G.r, sq = G.shape === 'square', half = G.shape === 'half';
  const lens = (x, k) => {
    const w = r * Math.max(0.3, k), h = r * (sq ? 0.8 : 1);
    if (sq) return `M${x - w},${eyeY - h} L${x + w},${eyeY - h} L${x + w},${eyeY + h} L${x - w},${eyeY + h}Z`;
    if (half) return `M${x - w},${eyeY} L${x + w},${eyeY} Q${x + w},${eyeY + h * 0.9} ${x},${eyeY + h * 0.9} Q${x - w},${eyeY + h * 0.9} ${x - w},${eyeY}Z`;
    return `M${x - w},${eyeY} a${w},${h} 0 1 0 ${2 * w},0 a${w},${h} 0 1 0 ${-2 * w},0Z`;
  };
  const Ls = [];
  if (pL.vis) Ls.push([pL.x, Math.min(1.1, pL.k)]);
  if (pR.vis) Ls.push([pR.x, Math.min(1.1, pR.k)]);
  for (const [x, k] of Ls) {
    out.push(path(lens(x, k), { fill: glint ? '#f4fbff' : '#dfeff7', opacity: glint ? 0.95 : 0.12 }));
    if (glint) out.push(path(`M${x - r * 0.5 * k},${eyeY + r * 0.35} L${x + r * 0.1 * k},${eyeY - r * 0.55} M${x - r * 0.05 * k},${eyeY + r * 0.6} L${x + r * 0.55 * k},${eyeY - r * 0.2}`, { stroke: '#9cc6de', 'stroke-width': lw * 1.1, 'stroke-linecap': 'round' }));
    else out.push(path(`M${x + r * 0.2 * k},${eyeY - r * 0.6} q${r * 0.35 * k},${r * 0.1} ${r * 0.45 * k},${r * 0.45}`, { fill: 'none', stroke: '#fff', 'stroke-width': lw * 0.7, opacity: 0.8, 'stroke-linecap': 'round' }));
    out.push(path(lens(x, k), { fill: 'none', stroke: G.color || C.ink, 'stroke-width': lw * (G.frame ?? 1.1) }));
  }
  if (Ls.length === 2) {
    const a = Ls[0][0] + r * Ls[0][1], b = Ls[1][0] - r * Ls[1][1];
    out.push(path(`M${a},${eyeY - 2} Q${(a + b) / 2},${eyeY - 7} ${b},${eyeY - 2}`, { fill: 'none', stroke: G.color || C.ink, 'stroke-width': lw * (G.frame ?? 1.1) }));
  }
  // temple arm toward the visible ear
  const s = Math.sin(t * 0.62);
  if (Math.abs(s) > 0.15) {
    const [x, k] = s > 0 ? Ls[0] : Ls[Ls.length - 1];
    const edge = x - Math.sign(s) * r * k;
    out.push(path(`M${edge},${eyeY - 3} L${edge - Math.sign(s) * r * 1.6},${eyeY - 5}`, { stroke: G.color || C.ink, 'stroke-width': lw * 0.9, 'stroke-linecap': 'round' }));
  }
  return out.join('');
}

// Convenience: place a character in a scene. s = scale; line width compensates so close-ups aren't clunky.
export function place(def, o = {}) {
  const s = o.s ?? 1;
  const lw = (o.lw ?? 3.1) / Math.pow(s, 0.55);
  const res = drawCharacter(def, { ...o, lw });
  // rotation (o.rot, or a pose's own rot, e.g. 'lie') turns the whole figure about its feet; anchors turn with it
  const pz = typeof o.pose === 'string' ? POSES[o.pose] : o.pose;
  const rotD = o.rot ?? pz?.rot ?? 0;
  const lift = pz?.rot ? -def.body.hipW * 0.42 : 0; // lying figures rest on the floor, not half inside it
  const transform = `translate(${r2(o.x ?? 0)},${r2(o.y ?? 0)}) scale(${r2(s)})${lift ? ` translate(0,${r2(lift)})` : ''}${rotD ? ` rotate(${rotD})` : ''}`;
  const ca = Math.cos(rotD * Math.PI / 180), sa = Math.sin(rotD * Math.PI / 180);
  const A = {};
  for (const k in res.anchors) { const [ax, ay] = res.anchors[k]; A[k] = [(o.x ?? 0) + (ax * ca - ay * sa) * s, (o.y ?? 0) + (ax * sa + ay * ca + lift) * s]; }
  const svg = g({ transform, opacity: o.opacity, filter: o.filter }, res.svg);
  return Object.assign(new String(svg), { anchors: A, svg });
}
