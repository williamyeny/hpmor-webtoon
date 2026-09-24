// Shared staging for Book Two (Ep 13–23): day captions, the Game's notes, the Ravenclaw table,
// portraits as world pieces, and the standard casts.
import { plain, title, capC } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { g, rect } from '../engine/core/svg.js';
import * as HG from '../engine/bg/hogwarts.js';
import * as CS from '../engine/bg/castle.js';

// Every Book Two episode opens on the day, ch. 17 style: "Thursday." / "If you wanted to be specific, 7:24 on Thursday morning."
export function dayBeat(ep, day, specific, o = {}) {
  const h = o.h ?? 300;
  return ep.beat(h, [title(day, 400, h * 0.4, { size: 60, color: o.color || C.ink }), plain(specific ? `*${specific}*` : '', 400, h * 0.4 + 42, { anchor: 'tc', font: "'IM Fell English', serif", size: 28, color: o.sub || '#5a4032' })], o.bg ? { bg: o.bg } : {});
}
// episode header: book line + episode number (in words) + title
export function header(ep, number, name, o = {}) {
  return ep.beat(o.h ?? 330, [
    plain(o.book ?? 'BOOK TWO · THE FIRST WEEK', 400, 70, { font: "'IM Fell English SC', serif", size: 22, color: '#8a6a4a' }),
    plain(`EPISODE ${number}`, 400, 125, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }),
    title(name, 400, 205, { size: 54 }),
  ]);
}
// a note from the Game: lettering on paper. kind 'hand' (his own pencil) | 'quill' (the Quotes Quill's perfectly regular writing)
export const note = (text, x, y, o = {}) => ({ type: 'letter', text, x, y, w: o.w ?? 420, fixed: true, font: o.kind === 'hand' ? "'Caveat', cursive" : "'IM Fell DW Pica', serif", size: o.size ?? (o.kind === 'hand' ? 34 : 27), align: o.align || (o.kind === 'hand' ? 'left' : 'center'), rot: o.rot ?? 0, ...o });

// the Ravenclaw table (reverse shot), Sunday night
export const RT = () => HG.hallTable('r');
// standard world spots in the Ravenclaw dorm: Harry's bed at x=1100
export const DORM = (o = {}) => () => CS.ravenclawDorm(o);
