import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
import { dumbledorePJ, harryRaven } from '../../engine/chars/cast2.js';
const P = (bg, cam, actors = []) => ({ h: 620, panels: [{ x: 20, y: 20, w: 760, h: 580, mood: 'candle', art: shot({ cam, bg, actors }) }] });
export default { title: 'b2off', tiles: [
  P(() => CS.dumbledoreOffice({}), { x: 1000, y: 350, w: 2600 }, [() => CS.dumbledoreThrone(1000), { def: dumbledorePJ, id: 'd', x: 1000, y: 880, pose: 'sit', seat: 200, expr: 'smile' }, () => CS.blackDesk(1000, 960, { rock: true, book: true }), () => CS.stoolFront(1000, 1080), { def: harryRaven, id: 'h', x: 1400, y: 1060, s: 1.1, turn: -0.4, expr: 'worried' }]),
  P(() => CS.gargoyleCorridor({}), { x: 1000, y: 450, w: 1600 }, []),
]};
