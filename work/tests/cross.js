import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
import { dad, mcgonagall } from '../../engine/chars/cast.js';
import { harryRaven, dracoSly } from '../../engine/chars/cast2.js';
const turns = [0.1, 0.35, 0.6];
export default { title: 'cross', tiles: [harryRaven, dad].map((def) => ({ h: 520, panels: turns.map((turn, k) => ({ x: 18 + k * 258, y: 18, w: 248, h: 484, art: shot({ cam: { on: ['a'], fr: 'waist' }, bg: () => CS.defenceStage({}), actors: [{ def, id: 'a', x: 1000, y: 900, s: 1.1, turn, pose: 'crossArms', expr: 'neutral' }] }) })) })) };
