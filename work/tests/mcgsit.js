import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
import { mcgonagall } from '../../engine/chars/cast.js';
const P = (actors) => ({ h: 520, panels: [{ x: 20, y: 20, w: 760, h: 480, mood: 'warm', art: shot({ cam: { x: 1100, y: 560, w: 1400 }, bg: () => CS.mcgonagallOffice(), actors }) }] });
export default { title: 'mcgsit', tiles: [
  P([{ def: mcgonagall, id: 'm', x: 1000, y: 900, turn: 0.25, pose: 'sit', seat: 190, expr: 'stern' }]),
  P([{ def: mcgonagall, id: 'm', x: 1000, y: 900, turn: 0.25, pose: 'sit', seat: 190, expr: 'stern' }, () => CS.mcgDesk(1000, 960)]),
  P([{ def: mcgonagall, id: 'm', x: 1000, y: 900, turn: 0.25, pose: 'stand', expr: 'stern' }]),
]};
