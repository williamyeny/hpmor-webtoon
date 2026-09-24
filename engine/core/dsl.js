// Script helpers. An episode is a list of tiles; most tiles hold one panel. These helpers keep the
// episode files readable: `ep.panel(h, shotOpts, bubbles, panelOpts)`.
import { shot } from './scene.js';
import { C } from './palette.js';
import { g } from './svg.js';
import { seal } from '../props/props.js';

export const M = 24; // standard side margin
export const W = 800;

// lettering
export const say = (who, text, x, y, o = {}) => ({ type: 'speech', who, text, x, y, w: o.w ?? 330, ...o });
export const shout = (who, text, x, y, o = {}) => ({ type: 'shout', who, text, x, y, w: o.w ?? 420, ...o });
export const whisper = (who, text, x, y, o = {}) => ({ type: 'whisper', who, text, x, y, w: o.w ?? 300, ...o });
export const think = (who, text, x, y, o = {}) => ({ type: 'thought', who, text, x, y, w: o.w ?? 330, ...o });
export const inner = (who, text, x, y, o = {}) => ({ type: 'inner', who, text, x, y, w: o.w ?? 360, anchor: o.anchor ?? 'c', ...o });
export const cold = (who, text, x, y, o = {}) => ({ type: 'cold', who, text, x, y, w: o.w ?? 360, ...o });
export const cap = (text, x, y, o = {}) => ({ type: 'caption', text, x, y, w: o.w ?? 520, anchor: o.anchor ?? 'tl', ...o });
export const capC = (text, x, y, o = {}) => ({ type: 'captionC', text, x, y, w: o.w ?? 560, ...o });
export const dark = (text, x, y, o = {}) => ({ type: 'dark', text, x, y, w: o.w ?? 600, ...o });
export const note = (text, x, y, o = {}) => ({ type: 'note', text, x, y, w: o.w ?? 300, ...o });
export const sfx = (text, x, y, o = {}) => ({ type: 'sfx', text, x, y, w: o.w ?? 700, ...o });
export const hat = (text, x, y, o = {}) => ({ type: 'hat', who: 'Sorting Hat', text, x, y, w: o.w ?? 440, ...o });
export const title = (text, x, y, o = {}) => ({ type: 'title', text, x, y, w: o.w ?? 700, ...o });
export const plain = (text, x, y, o = {}) => ({ type: 'plain', text, x, y, w: o.w ?? 600, ...o });

// tile-level options, dropping the ones that weren't given
const tileOpts = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== ''));

export class Episode {
  constructor({ id, number, title, subtitle = '' }) {
    Object.assign(this, { id, number, title, subtitle });
    this.tiles = [];
    this.bg = C.paper;
  }
  setBg(bg) { this.bg = bg; return this; }
  // raw tile
  tile(t) { this.tiles.push({ bg: this.bg, ...t }); return this; }
  // one panel in a tile. h = tile height; shotOpts → scene.shot (or a function drawing the art).
  // Layout options: pad, x, y, w, ph (panel height), panel (raw overrides); tile options: bg, alt, tile.
  // Every other option (mood, border, shape, frame, breakout…) is a panel property, see layout.js and frames.js.
  panel(h, shotOpts, bubbles = [], o = {}) {
    const { pad = 18, x = M, y = pad, w = W - 2 * M, ph = h - 2 * pad, panel = {}, tile = {}, bg, alt, over, under, ...props } = o;
    const p = { ...props, x, y, w, h: ph, art: typeof shotOpts === 'function' ? shotOpts : shot(shotOpts), ...panel };
    return this.tile({ h, panels: [p], bubbles, ...tile, ...tileOpts({ bg, alt }) });
  }
  // a figure (or object) with no frame and no background, standing on the page itself
  cutout(h, shotOpts, bubbles = [], o = {}) { return this.panel(h, shotOpts, bubbles, { ...o, cutout: true, border: 'none' }); }
  // full-bleed panel (edge to edge), faded top/bottom into gutter unless disabled
  bleed(h, shotOpts, bubbles = [], o = {}) {
    return this.panel(h, shotOpts, bubbles, { ...o, x: 0, w: W, pad: 0, ph: h, border: 'bleed', panel: { fadeTop: o.fadeTop, fadeBottom: o.fadeBottom, ...(o.panel || {}) } });
  }
  // gutter-only beat (text between panels)
  beat(h, bubbles = [], o = {}) { return this.tile({ h, panels: [], bubbles, ...tileOpts({ bg: o.bg, over: o.over, under: o.under }) }); }
  // closing tile: "To be continued" + wax seal (the site's next-episode card handles the rest)
  end(text = 'To be continued') {
    return this.beat(340, [plain(text, 400, 140, { font: "'IM Fell English SC', serif", size: 34, color: '#3a2a20' })], { over: () => g({ transform: 'translate(400,230)' }, seal(0, 0, 34, 'H')) });
  }
  // multi-panel tile
  multi(h, panels, bubbles = [], o = {}) {
    return this.tile({ h, panels: panels.map((p) => ({ ...p, art: typeof p.art === 'function' || typeof p.art === 'string' ? p.art : shot(p.art) })), bubbles, ...tileOpts({ bg: o.bg, over: o.over, alt: o.alt }) });
  }
}
