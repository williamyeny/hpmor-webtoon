// Composes one "tile" (a horizontal strip of the vertical scroll) into HTML for the render stage.
// A tile = gutter background + panels (SVG art, clipped + textured + bordered) + lettering (HTML, laid out in-page).
import { baseDefs } from './filters.js';
import { C, MOODS } from './palette.js';
import { uid, rect, g, el, r2, rrectD, escText } from './svg.js';
import { shapeD, STYLES } from './frames.js';

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

// the panel's outline: a named or custom shape (frames.js), else a rounded rectangle
function panelShape(p) {
  return { d: (p.shape && shapeD(p)) || rrectD(0, 0, p.w, p.h, p.round ?? 5) };
}

// anchors from panel coordinates to tile coordinates
function tileAnchors(ctx, p) {
  const out = {};
  for (const k in ctx.anchors || {}) {
    const a = ctx.anchors[k]; const o = {};
    for (const kk in a) o[kk] = Array.isArray(a[kk]) ? [a[kk][0] + p.x, a[kk][1] + p.y] : a[kk];
    out[k] = o;
  }
  return out;
}
// the paper finish every panel gets: grain, mottle and the mood's edge darkening, over the rect (x, y, w, h)
const paperFinish = (p, mood, x, y, w, h, vig) => [
  p.grain === false ? '' : rect(x, y, w, h, { filter: 'url(#grain)', opacity: 0.55, style: 'mix-blend-mode:multiply' }),
  p.grain === false || !vig ? '' : rect(x, y, w, h, { filter: 'url(#mottle)', opacity: 0.16, style: 'mix-blend-mode:multiply' }),
  mood.vigOp ? rect(x, y, w, h, vig ? { fill: vig } : { fill: mood.vig, opacity: mood.vigOp * 0.55, style: 'mix-blend-mode:multiply' }) : '',
].join('');
// edges that fade into the page: bleeds fade top and bottom; the dissolve frame feathers every edge
function edgeMask(p, id, w, h) {
  if (p.border === 'bleed') {
    const t = p.fadeTop === false, b = p.fadeBottom === false;
    return { id: `${id}fm`, defs: `<linearGradient id="${id}fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="${t ? 1 : 0}"/><stop offset="${t ? 0 : 0.12}" stop-color="#fff"/><stop offset="${b ? 1 : 0.88}" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="${b ? 1 : 0}"/></linearGradient><mask id="${id}fm"><rect width="${w}" height="${h}" fill="url(#${id}fg)"/></mask>` };
  }
  const fz = p.frame === 'dissolve' ? (p.feather ?? Math.min(w, h) * 0.12) : 0;
  if (fz) return { id: `${id}dm`, defs: `<filter id="${id}df" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${r2(fz / 2)}"/></filter><mask id="${id}dm"><rect x="${r2(fz)}" y="${r2(fz)}" width="${r2(w - 2 * fz)}" height="${r2(h - 2 * fz)}" fill="#fff" filter="url(#${id}df)"/></mask>` };
  return null;
}
// breakout: the characters step over the frame on the given edge(s) ('top' | 'bottom' | 'left' | 'right' | array).
// They're drawn again, unclipped, only beyond that edge, with the panel's tint, grain and shading so there's no seam.
function breakoutLayer(p, ctx, id, mood, wob) {
  const { w, h } = p, m = 6, far = 3000;
  const R = { top: [-far, -far, 2 * far + w, far + m], bottom: [-far, h - m, 2 * far + w, far], left: [-far, -far, far + m, 2 * far + h], right: [w - m, -far, far, 2 * far + h] };
  const actors = p.art({ ...ctx, layer: 'actors', only: p.breakoutOnly ? [].concat(p.breakoutOnly) : null });
  const tint = mood.tintOp ? `<filter id="${id}pt"><feFlood flood-color="${mood.tint}" flood-opacity="${Math.min(1, mood.tintOp * 1.2)}" result="f"/><feComposite in="f" in2="SourceGraphic" operator="in" result="fc"/><feBlend in="fc" in2="SourceGraphic" mode="multiply"/></filter>` : '';
  const silhouette = `<filter id="${id}pw"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/></filter><mask id="${id}pm" maskUnits="userSpaceOnUse" x="-3000" y="-3000" width="${6000 + w}" height="${6000 + h}"><g filter="url(#${id}pw)">${g({ filter: wob }, actors)}</g></mask>`;
  return `<clipPath id="${id}bo">${[].concat(p.breakout).map((e) => R[e] ? `<rect x="${R[e][0]}" y="${R[e][1]}" width="${R[e][2]}" height="${R[e][3]}"/>` : '').join('')}</clipPath>${tint}` +
    g({ 'clip-path': `url(#${id}bo)` }, g({ filter: wob }, g({ filter: mood.desat ? `url(#${id}ds)` : null }, g({ filter: tint ? `url(#${id}pt)` : null }, actors))),
      silhouette + g({ mask: `url(#${id}pm)` }, paperFinish(p, mood, -far, -far, 2 * far + w, 2 * far + h)));
}

export function composePanel(p, tileCtx) {
  const id = uid('p');
  const { w, h } = p;
  const mood = MOODS[p.mood || 'none'] || MOODS.none;
  const ctx = { w, h, id, mood: p.mood, light: p.light ?? -0.6, tile: tileCtx, layer: p.cutout ? 'cutout' : undefined };
  const art = typeof p.art === 'function' ? p.art(ctx) : (p.art || '');
  const wob = p.wobble === false ? null : 'url(#wobble)';
  // cutout: no frame and no background; the figures stand on the page itself (the reader's side of the frame)
  if (p.cutout) return Object.assign(new String(`<g transform="translate(${r2(p.x)},${r2(p.y)})">${g({ filter: wob }, art)}</g>`), { anchors: tileAnchors(ctx, p) });
  const shape = panelShape(p);
  const desat = mood.desat ? `<filter id="${id}ds"><feColorMatrix type="saturate" values="${1 - mood.desat}"/></filter>` : '';
  const vign = `<radialGradient id="${id}vg" cx="0.5" cy="0.48" r="0.75"><stop offset="0.55" stop-color="${mood.vig}" stop-opacity="0"/><stop offset="1" stop-color="${mood.vig}" stop-opacity="${mood.vigOp}"/></radialGradient>`;
  const edge = edgeMask(p, id, w, h);
  const defs = `<clipPath id="${id}c"><path d="${shape.d}"/></clipPath>${p.border === 'bleed' && edge ? edge.defs : ''}${desat}${vign}`;
  const inner = g({ 'clip-path': `url(#${id}c)` },
    g({ filter: wob }, g({ filter: mood.desat ? `url(#${id}ds)` : null }, art)),
    mood.tintOp ? rect(0, 0, w, h, { fill: mood.tint, opacity: mood.tintOp, style: 'mix-blend-mode:soft-light' }) : '',
    mood.tintOp ? rect(0, 0, w, h, { fill: mood.tint, opacity: mood.tintOp * 0.6, style: 'mix-blend-mode:multiply' }) : '',
    paperFinish(p, mood, 0, 0, w, h, `url(#${id}vg)`),
    p.overlay ? (typeof p.overlay === 'function' ? p.overlay(ctx) : p.overlay) : '',
  );
  const body = !edge ? inner : (p.border === 'bleed' ? '' : edge.defs) + g({ mask: `url(#${edge.id})` }, inner);
  const border = (p.border === 'none' || p.border === 'bleed') ? '' : (STYLES[p.frame || 'ink'] || STYLES.ink)(shape.d, p);
  const pop = p.breakout && typeof p.art === 'function' ? breakoutLayer(p, ctx, id, mood, wob) : '';
  const shadow = p.shadow ? `<path d="${shape.d}" fill="#000" opacity="0.25" filter="url(#blur3)" transform="translate(4,8)"/>` : '';
  const svg = `<g transform="translate(${r2(p.x)},${r2(p.y)})${p.rotate ? ` rotate(${p.rotate} ${w / 2} ${h / 2})` : ''}"><defs>${defs}</defs>${shadow}${body}${border}${pop}</g>`;
  return Object.assign(new String(svg), { anchors: tileAnchors(ctx, p) });
}

// Resolve bubble positions/tails that refer to actors ("harry", "harry.head", "harry@1").
function resolveRef(ref, panelsA, fallbackAnchor = 'mouth') {
  let [who, idx] = String(ref).split('@');
  let [id, part] = who.split('.');
  part = part || fallbackAnchor;
  const list = idx !== undefined ? [panelsA[+idx]] : panelsA;
  for (const A of list) { const k = A && alias(A, id); if (k && A[k][part]) return { p: A[k][part], s: A[k].s || 1, A: A[k] }; }
  return null;
}
// speaker names are loose: 'Mrs Figg' finds id 'figg', 'Professor Quirrell' finds 'quirrell', 'Mr Malfoy' finds 'lucius' only if spelled out
function alias(A, id) {
  if (A[id]) return id;
  const words = id.replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter((w) => w && !['mr', 'mrs', 'ms', 'miss', 'madam', 'professor', 'headmaster', 'the'].includes(w));
  for (const k of [words.join(''), words.join('-'), words.at(-1), words[0]]) if (k && A[k]) return k;
  return null;
}
const panelAt = (rects, x, y) => rects.findIndex((p) => x >= p[0] && x <= p[0] + p[2] && y >= p[1] && y <= p[1] + p[3]);
function resolveBubbles(bubbles, panelsA, W = 800, H = 1000, rects = []) {
  const pre = (bubbles || []).map((b0) => {
    const b = { ...b0 };
    if (b.near) {
      const r = resolveRef(b.near, panelsA, 'top');
      if (r) { b.x = r.p[0] + (b.dx ?? 0); b.y = r.p[1] + (b.dy ?? -60); }
    }
    return b;
  });
  return pre.map((b) => {
    const fix = (t) => {
      if (Array.isArray(t)) return t;
      const r = resolveRef(t, panelsA, 'mouth');
      if (!r) return null;
      const bx = b.x ?? 400, by = b.y ?? 100;
      const base = r.A.head && r.A.hr ? r.A.head : r.p;
      const dx = bx - base[0], dy = by - base[1]; const L = Math.hypot(dx, dy) || 1;
      const off = r.A.hr ? Math.min(r.A.hr * 1.12, L * 0.6) : Math.min(Math.max(r.s * 48, 14), 110, L * 0.5);
      return [base[0] + (dx / L) * off, base[1] + (dy / L) * off];
    };
    if (b.tail !== undefined && b.tail !== null) b.tail = fix(b.tail);
    if (b.tails) b.tails = b.tails.map(fix).filter(Boolean);
    if (b.tail === undefined && b.who && !b.noTail && ['speech', 'shout', 'whisper', 'thought', 'cold'].includes(b.type || 'speech')) {
      const r = resolveRef(b.who.toLowerCase(), panelsA, 'mouth');
      // a tail only makes sense inside the speaker's own panel; in a gutter, only if the speaker is close by
      const pb = panelAt(rects, b.x ?? 0, b.y ?? 0), ph = r && r.A.head ? panelAt(rects, r.A.head[0], r.A.head[1]) : -1;
      const far = r && r.A.hr && (pb >= 0 ? (ph >= 0 && ph !== pb) : (b.y ?? 0) > r.A.head[1] + r.A.hr * 2.6);
      const t = far ? null : fix(b.who.toLowerCase());
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
    rot: b.rot || 0, shape: b.shape || null, fixed: b.fixed || false, pad: b.pad ?? null, bg: b.bg || null, border: b.border || null, weight: b.weight || null,
  };
  let html = b.html ?? escText(b.text || '').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>').replace(/\n/g, '<br>');
  // keep hyphenated words (Boy-Who-Lived, Nine-and-Three-Quarters) on one line: wrap them in nowrap spans, text nodes only
  // a line never starts with an em dash: a word joiner glues the dash to the word before it (it may still break after)
  if (b.html === undefined) html = html.replace(/(\S)—/g, '$1\u2060—');
  if (b.html === undefined) html = html.split(/(<[^>]+>)/).map((seg) => seg.startsWith('<') ? seg : seg.replace(/([^\s<>]*[A-Za-z0-9’'][-‑][A-Za-z0-9‘'][^\s<>]*)/g, '<span style="white-space:nowrap">$1</span>')).join('');
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
  // bordered panel rects: the stage keeps auto-placed balloons inside their panel and warns when one crosses a frame
  const rects = (tile.panels || []).map((p) => [p.x ?? 0, p.y ?? 0, p.w ?? W, p.h, p.border === 'none' || p.border === 'bleed' ? 0 : 1]);
  const bubbles = resolveBubbles(tile.bubbles, panelsA, W, H, rects).map(bubbleHTML).join('');
  const heads = [];
  // faces the balloons avoid: only heads that are actually visible inside their own panel
  panelsA.forEach((A, k) => { const [px, py, pw, ph] = rects[k] || [0, 0, W, H]; for (const id in A || {}) { const a = A[id]; if (a.head && a.hr && a.head[0] > px && a.head[0] < px + pw && a.head[1] > py && a.head[1] < py + ph) heads.push([Math.round(a.head[0]), Math.round(a.head[1] + a.hr * 0.28), Math.round(a.hr * 0.78), ...[px, py, pw, ph].map(Math.round)]); } }); // face circle + its panel box
  return { W, H, html: `<div id="tile" data-heads='${JSON.stringify(heads)}' data-panels='${JSON.stringify(rects.map((r) => r.map((v) => Math.round(v))))}' style="position:relative;width:${W}px;height:${H}px;overflow:hidden">${svg}<svg id="bsvg" width="${W}" height="${H}" style="position:absolute;left:0;top:0;overflow:visible"></svg>${bubbles}</div>` };
}
