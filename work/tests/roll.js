import { shot } from '../../engine/core/scene.js';
import { say } from '../../engine/core/dsl.js';
import * as CS from '../../engine/bg/castle.js';
import * as FX from '../../engine/fx/fx.js';
import { snape } from '../../engine/chars/cast.js';
export default { title: 'roll', tiles: [
 { h: 800, panels: [
   { x: 18, y: 18, w: 376, h: 764, art: shot({ cam: { on: ['snape'], fr: 'bust', roll: -9 }, bg: () => CS.potionsRoom({}), actors: [{ def: snape, id: 'snape', x: 1000, y: 900, turn: 0.2, expr: 'menace' }] }) },
   { x: 406, y: 18, w: 376, h: 764, art: shot({ cam: { on: ['snape'], fr: 'bust' }, bg: () => CS.potionsRoom({}), behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { n: 30, op: 0.4 }), actors: [{ def: snape, id: 'snape', x: 1000, y: 900, turn: 0.2, expr: 'menace' }] }) },
 ], bubbles: [say('Snape', 'Sit down. Now.', 200, 60, { anchor: 'tc', w: 240, fixed: true }), say('Snape', 'Behind me.', 594, 60, { anchor: 'tc', w: 220, fixed: true })] },
]};
