import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
import { harryRaven } from '../../engine/chars/cast2.js';
import { dad } from '../../engine/chars/cast.js';
import { rect } from '../../engine/core/svg.js';
const CAN = rect(-9, -30, 18, 34, { fill: '#c0392b', stroke: '#2b2226', 'stroke-width': 2 });
export default { title: 'props', tiles: [{ h: 520, panels: [harryRaven, dad].map((def, k) => ({ x: 18 + k * 386, y: 18, w: 376, h: 484, art: shot({ cam: { on: ['a'], fr: 'waist' }, bg: () => CS.defenceStage({}), actors: [{ def, id: 'a', x: 1000, y: 900, s: 1.1, turn: 0.35, pose: 'holdOne', armF: { prop: CAN }, expr: 'neutral' }] }) })) }] };
