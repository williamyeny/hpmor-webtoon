// Camera "shots" into staged scenes. A location draws itself in world coordinates; each panel is a
// camera rectangle onto that world, with actors placed in the same world coords.
//
// cam can be explicit {x, y, w} or auto-framed: {on: ['harry','mum'], fr: 'close'|'bust'|'waist'|'knees'|'full'|'wide',
//   dx, dy (in head-heights), zoom (multiplier), bias ('top'…)}.
// Or aimed at one head: {head: 'harry', hw: 0.34, hx: 0.5, hy: 0.42}: the head is hw × the panel's width
//   across, with its centre at (hx, hy) as fractions of the panel. Works the same in tall, narrow or wide panels.
// Any cam may add roll: degrees of tilt (a Dutch angle), e.g. {on: ['snape'], fr: 'bust', roll: -8}.
import { g, r2, rect, ellipse } from './svg.js';
import { place } from '../chars/rig.js';

const FR = { // [fraction of body visible from the top, headroom in head-heights]
  eyes: [0.14, 0.02], close: [0.3, 0.25], bust: [0.45, 0.35], waist: [0.62, 0.4], knees: [0.8, 0.45], full: [1.0, 0.5], wide: [1.0, 1.4],
};

export function headCam(cam, placed, ctx) {
  const p = placed.find((q) => q.id === cam.head);
  if (!p) return { x: 400, y: 300, w: ctx.w };
  const [hx, hy] = p.anchors.head;
  const w = (p.def.body.headRx * 2 * p.s) / (cam.hw ?? 0.34);
  const h = w * ctx.h / ctx.w;
  return { x: hx + (0.5 - (cam.hx ?? 0.5)) * w, y: hy + (0.5 - (cam.hy ?? 0.42)) * h, w };
}

export function autoCam(cam, placed, ctx) {
  const ids = cam.on;
  const list = placed.filter((p) => ids.includes(p.id));
  if (!list.length) return { x: 400, y: 300, w: ctx.w };
  const fr = FR[cam.fr || 'waist'] || FR.waist;
  let top = Infinity, bot = -Infinity, left = Infinity, right = -Infinity, headH = 0;
  for (const p of list) {
    const A = p.anchors; const s = p.s;
    const hh = p.def.body.headRy * 2 * s; headH = Math.max(headH, hh);
    const topY = A.top[1] - (p.def.hatTop ?? 0) * hh;
    const feetY = p.y;
    const bodyH = feetY - topY;
    const b = topY + bodyH * fr[0];
    top = Math.min(top, topY - hh * fr[1]); bot = Math.max(bot, b);
    const hx = A.head[0];
    left = Math.min(left, hx - hh * 0.75); right = Math.max(right, hx + hh * 0.75);
  }
  if (cam.fr === 'close') { const hy = Math.min(...list.map((p) => p.anchors.head[1])); const hy2 = Math.max(...list.map((p) => p.anchors.head[1])); top = hy - headH * 0.8 - (list[0].def.hatTop ?? 0) * headH * 0.35; bot = hy2 + headH * 0.72; }
  if (cam.fr === 'eyes') { const hy = list[0].anchors.head[1] + headH * 0.06; top = hy - headH * 0.32; bot = hy + headH * 0.3; }
  const aspect = ctx.w / ctx.h;
  let h = bot - top, w = right - left;
  const padX = cam.padX ?? (list.length > 1 ? 1.25 : cam.fr === 'close' ? 1.25 : 1.6);
  w = Math.max(w * padX, h * aspect);
  h = w / aspect;
  let cx = (left + right) / 2, cy = (top + bot) / 2;
  // keep the top anchored: extra height goes to the bottom unless bias says otherwise
  const needH = bot - top;
  if (h > needH && cam.bias !== 'center') cy = top + h / 2 - (cam.bias === 'bottom' ? (h - needH) : (h - needH) * 0.18);
  if (cam.fr === 'eyes') { const hy = list[0].anchors.head[1] + headH * 0.06; h = headH * 0.7; w = h * aspect; cx = list[0].anchors.head[0]; cy = hy; }
  const z = cam.zoom ?? 1;
  w /= z;
  cx += (cam.dx ?? 0) * headH; cy += (cam.dy ?? 0) * headH;
  return { x: cx, y: cy, w };
}

export function shot(o) {
  return (ctx) => {
    ctx.anchors = ctx.anchors || {};
    const placed = [];
    const actorsSvg = [];
    for (const a of o.actors || []) {
      if (!a) continue;
      if (typeof a === 'string' || a instanceof String) { actorsSvg.push({ svg: String(a) }); continue; }
      if (a.svg && !a.def) { actorsSvg.push({ svg: a.svg }); continue; }
      if (typeof a === 'function') { actorsSvg.push({ fn: a }); continue; }
      const p = place(a.def, { light: ctx.light, ...a });
      placed.push({ ...a, s: a.s ?? 1, anchors: p.anchors, y: a.y ?? 0 });
      actorsSvg.push({ svg: p.svg, id: a.id });
    }
    let cam = o.cam || { x: 400, y: 300, w: ctx.w };
    if (cam.head) cam = headCam(cam, placed, ctx);
    else if (cam.on) cam = autoCam(cam, placed, ctx);
    // cam.roll (degrees) tilts the camera; the picture zooms just enough that no empty corners show
    const roll = (o.cam && o.cam.roll) || 0, th = Math.abs(roll) * Math.PI / 180, cr = Math.cos(roll * Math.PI / 180), sr = Math.sin(roll * Math.PI / 180);
    const cover = roll ? Math.max(Math.cos(th) + (ctx.h / ctx.w) * Math.sin(th), Math.cos(th) + (ctx.w / ctx.h) * Math.sin(th)) : 1;
    const z = ctx.w / cam.w * cover;
    const toPanel = (p) => { const x = (p[0] - cam.x) * z, y = (p[1] - cam.y) * z; return [x * cr - y * sr + ctx.w / 2, x * sr + y * cr + ctx.h / 2]; };
    for (const p of placed) if (p.id) {
      const an = {}; for (const k in p.anchors) an[k] = toPanel(p.anchors[k]);
      an.s = p.s * z; an.hr = p.def.body.headRy * p.s * z; ctx.anchors[p.id] = an;
    }
    const T = `translate(${r2(ctx.w / 2)},${r2(ctx.h / 2)})${roll ? ` rotate(${r2(roll)})` : ''} scale(${r2(z)}) translate(${r2(-cam.x)},${r2(-cam.y)})`;
    const wa = {}; for (const p of placed) if (p.id) wa[p.id] = { ...p.anchors, s: p.s, hr: p.def.body.headRy * p.s };
    const env = { ...ctx, cam, z, toPanel, wa };
    const bg = typeof o.bg === 'function' ? o.bg(env) : (o.bg || '');
    const mid = typeof o.mid === 'function' ? o.mid(env) : (o.mid || '');
    const fg = typeof o.fg === 'function' ? o.fg(env) : (o.fg || '');
    const over = typeof o.over === 'function' ? o.over(env) : (o.over || '');
    const under = typeof o.under === 'function' ? o.under(env) : (o.under || '');
    // behind: panel-coordinate effects (FX.burst, speedLines…) drawn over the background but behind the characters
    const behind = typeof o.behind === 'function' ? o.behind(env) : (o.behind || '');
    const blur = o.blur ? `url(#blur${o.blur})` : null;
    const acts = actorsSvg.map((a) => a.fn ? a.fn(env) : a.svg).join('');
    // cutout panels (layout.js) draw no background: the figures stand on the page, with a soft shadow at their feet
    // breakout layer: only the named actors when the panel says breakoutOnly (layout.js)
    if (ctx.layer === 'actors') return g({ transform: T }, ctx.only ? actorsSvg.filter((a) => a.id && ctx.only.includes(a.id)).map((a) => a.svg).join('') : acts);
    if (ctx.layer === 'cutout') {
      const ground = o.ground === false ? '' : placed.map((p) => ellipse(p.x ?? 0, (p.y ?? 0) + 4, p.def.body.headRx * 1.5 * p.s, p.def.body.headRx * 0.28 * p.s, { fill: '#3a2a1a', opacity: 0.22, filter: 'url(#blur3)' })).join('');
      return behind + g({ transform: T }, ground, mid, acts, fg) + over;
    }
    return under + (behind ? g({ transform: T }, g({ filter: blur }, bg)) + behind + g({ transform: T }, mid, acts, fg) : g({ transform: T }, g({ filter: blur }, bg), mid, acts, fg)) + over;
  };
}

export const backdrop = (fill) => (ctx) => rect(0, 0, ctx.w, ctx.h, { fill });
