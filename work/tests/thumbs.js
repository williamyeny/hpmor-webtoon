import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
import { harry } from '../../engine/chars/cast.js';
const P = [['reach', 0.6], ['reach', -0.6], ['present', 0.4]];
export default { title: 'thumbs', tiles: [{ h: 420, panels: P.map(([pose, turn], k) => ({ x: 18 + k * 258, y: 18, w: 248, h: 384, art: shot({ cam: { on: ['a'], fr: 'waist' }, bg: () => CS.defenceStage({}), actors: [{ def: harry, id: 'a', x: 1000, y: 900, s: 1.1, turn, pose, expr: 'delight' }] }) })) }] };
