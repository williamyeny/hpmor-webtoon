// Composes one "tile" (a horizontal strip of the vertical scroll) into HTML for the render stage.
// A tile = gutter background + panels (SVG art, clipped + textured + bordered) + lettering (HTML, laid out in-page).
import { baseDefs } from './filters.js';
import { C, MOODS } from './palette.js';
import { uid, rect, g, el, r2, rrectD, polyD, escText } from './svg.js';

export const TILE_W = 800;

function gutterFill(bg, id) {
  if (!bg) bg = C.paper;
  if (typeof bg === 'string') return { defs: '', fill: bg };
  const stops = bg.stops || [[0, bg.top], [1, bg.bottom]];
  return {
    defs: `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`,
    fill: `url(#${id})`,
  };
}

function panelShape(p) {
  const { w, h } = p;
  if (p.shape === 'poly' && p.pts) return { d: polyD(p.pts.map(([x, y]) => [x * w, y * h]), true) };
  if (p.shape === 'circle') return { d: `M${w / 2},0 A${w / 2},${h / 2} 0 1 1 ${w / 2 - 0.01},0Z` };
  const rad = p.round ?? 5;
  return { d: rrectD(0, 0, w, h, rad) };
}

export function composePanel(p, tileCtx) {
  const id = uid('p');
  const { w, h } = p;
  const mood = MOODS[p.mood || 'none'] || MOODS.none;
  const shape = panelShape(p);
  const ctx = { w, h, id, mood: p.mood, light: p.light ?? -0.6, tile: tileCtx };
  const art = typeof p.art === 'function' ? p.art(ctx) : (p.art || '');
  const bleed = p.border === 'bleed';
  const fadeMask = bleed ? `<linearGradient id="${id}fg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="${p.fadeTop === false ? 1 : 0}"/><stop offset="${p.fadeTop === false ? 0 : 0.12}" stop-color="#fff"/>
      <stop offset="${p.fadeBottom === false ? 1 : 0.88}" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="${p.fadeBottom === false ? 1 : 0}"/></linearGradient>
      <mask id="${id}fm"><rect width="${w}" height="${h}" fill="url(#${id}fg)"/></mask>` : '';
  const desat = mood.desat ? `<filter id="${id}ds"><feColorMatrix type="saturate" values="${1 - mood.desat}"/></filter>` : '';
  const vign = `<radialGradient id="${id}vg" cx="0.5" cy="0.48" r="0.75"><stop offset="0.55" stop-color="${mood.vig}" stop-opacity="0"/><stop offset="1" stop-color="${mood.vig}" stop-opacity="${mood.vigOp}"/></radialGradient>`;
  const defs = `<clipPath id="${id}c"><path d="${shape.d}"/></clipPath>${fadeMask}${desat}${vign}`;
  const wob = p.wobble === false ? null : 'url(#wobble)';
  const inner = g({ 'clip-path': `url(#${id}c)` },
    g({ filter: wob }, g({ filter: mood.desat ? `url(#${id}ds)` : null }, art)),
    mood.tintOp ? rect(0, 0, w, h, { fill: mood.tint, opacity: mood.tintOp, style: 'mix-blend-mode:soft-light' }) : '',
    mood.tintOp ? rect(0, 0, w, h, { fill: mood.tint, opacity: mood.tintOp * 0.6, style: 'mix-blend-mode:multiply' }) : '',
    p.grain === false ? '' : rect(0, 0, w, h, { filter: 'url(#grain)', opacity: 0.55, style: 'mix-blend-mode:multiply' }),
    p.grain === false ? '' : rect(0, 0, w, h, { filter: 'url(#mottle)', opacity: 0.16, style: 'mix-blend-mode:multiply' }),
    mood.vigOp ? rect(0, 0, w, h, { fill: `url(#${id}vg)` }) : '',
    p.overlay ? (typeof p.overlay === 'function' ? p.overlay(ctx) : p.overlay) : '',
  );
  const border = (p.border === 'none' || bleed) ? '' :
    `<path d="${shape.d}" fill="none" stroke="${p.borderColor || C.ink}" stroke-width="${p.borderWidth || 3.5}" filter="url(#wobble)" stroke-linejoin="round"/>`;
  const shadow = p.shadow ? `<path d="${shape.d}" fill="#000" opacity="0.25" filter="url(#blur3)" transform="translate(4,8)"/>` : '';
  const body = bleed ? g({ mask: `url(#${id}fm)` }, inner) : inner;
  const svg = `<g transform="translate(${r2(p.x)},${r2(p.y)})${p.rotate ? ` rotate(${p.rotate} ${w / 2} ${h / 2})` : ''}"><defs>${defs}</defs>${shadow}${body}${border}</g>`;
  const anchors = {};
  for (const k in ctx.anchors || {}) {
    const a = ctx.anchors[k]; const o = {};
    for (const kk in a) o[kk] = Array.isArray(a[kk]) ? [a[kk][0] + p.x, a[kk][1] + p.y] : a[kk];
    anchors[k] = o;
  }
  return Object.assign(new String(svg), { anchors });
}

// Resolve bubble positions/tails that refer to actors ("harry", "harry.head", "harry@1").
function resolveRef(ref, panelsA, fallbackAnchor = 'mouth') {
  let [who, idx] = String(ref).split('@');
  let [id, part] = who.split('.');
  part = part || fallbackAnchor;
  const list = idx !== undefined ? [panelsA[+idx]] : panelsA;
  for (const A of list) if (A && A[id] && A[id][part]) return { p: A[id][part], s: A[id].s || 1, A: A[id] };
  return null;
}
function resolveBubbles(bubbles, panelsA) {
  return (bubbles || []).map((b0) => {
    const b = { ...b0 };
    if (b.near) {
      const r = resolveRef(b.near, panelsA, 'top');
      if (r) { b.x = r.p[0] + (b.dx ?? 0); b.y = r.p[1] + (b.dy ?? -60); }
    }
    const fix = (t) => {
      if (Array.isArray(t)) return t;
      const r = resolveRef(t, panelsA, 'mouth');
      if (!r) return null;
      const bx = b.x ?? 400, by = b.y ?? 100;
      const dx = bx - r.p[0], dy = by - r.p[1]; const L = Math.hypot(dx, dy) || 1;
      const off = Math.min(Math.max(r.s * 48, 14), 110, L * 0.5);
      return [r.p[0] + (dx / L) * off, r.p[1] + (dy / L) * off];
    };
    if (b.tail !== undefined && b.tail !== null) b.tail = fix(b.tail);
    if (b.tails) b.tails = b.tails.map(fix).filter(Boolean);
    if (b.tail === undefined && b.who && !b.noTail && ['speech', 'shout', 'whisper', 'thought', 'cold'].includes(b.type || 'speech')) {
      const t = fix(b.who.toLowerCase());
      if (t) b.tail = t;
    }
    return b;
  });
}

// Lettering is laid out by the stage page (see stage.js); here we only serialise it.
function bubbleHTML(b, i) {
  const data = {
    type: b.type || 'speech', x: b.x, y: b.y, w: b.w || 360, tail: b.tail || null, anchor: b.anchor || 'c',
    tails: b.tails || null, size: b.size || null, font: b.font || null, color: b.color || null, align: b.align || null,
    rot: b.rot || 0, pad: b.pad ?? null, bg: b.bg || null, border: b.border || null, weight: b.weight || null,
  };
  const html = b.html ?? escText(b.text || '').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>').replace(/\n/g, '<br>');
  return `<div class="bub t-${data.type}" data-b='${JSON.stringify(data).replace(/'/g, '&#39;')}'><div class="bt">${html}</div></div>`;
}

export function composeTile(tile) {
  const W = TILE_W, H = tile.h;
  const gid = uid('gut');
  const gf = gutterFill(tile.bg, gid);
  const tctx = { W, H };
  const composed = (tile.panels || []).map((p) => composePanel({ x: 0, y: 0, w: W, ...p }, tctx));
  const panels = composed.join('');
  const panelsA = composed.map((c) => c.anchors);
  const under = tile.under ? (typeof tile.under === 'function' ? tile.under(tctx) : tile.under) : '';
  const over = tile.over ? (typeof tile.over === 'function' ? tile.over(tctx) : tile.over) : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;left:0;top:0">
<defs>${baseDefs()}${gf.defs}</defs>
<rect width="${W}" height="${H}" fill="${gf.fill}"/>
${tile.gutterGrain === false ? '' : `<rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.35" style="mix-blend-mode:multiply"/>`}
${under}${panels}${over}
</svg>`;
  const bubbles = resolveBubbles(tile.bubbles, panelsA).map(bubbleHTML).join('');
  return { W, H, html: `<div id="tile" style="position:relative;width:${W}px;height:${H}px;overflow:hidden">${svg}<svg id="bsvg" width="${W}" height="${H}" style="position:absolute;left:0;top:0;overflow:visible"></svg>${bubbles}</div>` };
}
