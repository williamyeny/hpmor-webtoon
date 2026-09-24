import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
import { quirrell } from '../../engine/chars/cast.js';
import { harryRaven } from '../../engine/chars/cast2.js';
import * as P2 from '../../engine/props/props2.js';
import { g } from '../../engine/core/svg.js';
export default { title: 'b2space', tiles: [
 { h: 1100, panels: [{ x: 0, y: 0, w: 800, h: 1100, border: 'bleed', art: shot({ cam: { x: 1000, y: 500, w: 1800 }, bg: () => CS.deepSpace({}), actors: [{ def: harryRaven, id: 'h', x: 1000, y: 900, s: 1.1, turn: 0.1, expr: 'awe' }, { def: quirrell, id: 'q', x: 1500, y: 860, turn: -0.3, expr: 'calm' }] }) }] },
 { h: 800, panels: [{ x: 0, y: 0, w: 800, h: 800, border: 'bleed', art: shot({ cam: { x: 1000, y: 200, w: 1400 }, bg: () => CS.deepSpace({ disc: false, seed: 9 }), actors: [() => g({ transform: 'translate(1000,200) rotate(-14)' }, P2.pioneer(0.7, { glint: true }))] }) }] },
]};
