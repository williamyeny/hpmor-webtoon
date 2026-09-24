import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
import { mcgonagall } from '../../engine/chars/cast.js';
import { harryRaven } from '../../engine/chars/cast2.js';
const poses = ['relaxed', 'point', 'gesture'];
export default { title: 'fold', tiles: [mcgonagall, harryRaven].map((def) => ({ h: 520, panels: poses.map((pose, k) => ({ x: 18 + k * 258, y: 18, w: 248, h: 484, art: shot({ cam: { on: ['a'], fr: 'waist' }, bg: () => CS.defenceStage({}), actors: [{ def, id: 'a', x: 1000, y: 900, s: 1.1, turn: 0.35, pose, expr: 'neutral' }] }) })) })) };
