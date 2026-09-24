import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
import { mcgonagall, quirrell } from '../../engine/chars/cast.js';
import { harryRaven, hermioneRaven, dracoSly } from '../../engine/chars/cast2.js';
const poses = ['point', 'raiseHand', 'hold', 'gesture', 'crossArms', 'wave'];
export default { title: 'hands', tiles: [0, 1].map((row) => ({ h: 520, panels: poses.slice(row * 3, row * 3 + 3).map((pose, k) => ({ x: 18 + k * 258, y: 18, w: 248, h: 484, art: shot({ cam: { on: ['a'], fr: 'knees' }, bg: () => CS.defenceStage({}), actors: [{ def: [harryRaven, hermioneRaven, dracoSly][k], id: 'a', x: 1000, y: 900, s: 1.1, turn: 0.35, pose, expr: { base: 'grimace' === 'x' ? '' : 'neutral', mouth: { type: 'grimace' } } }] }) })) })) };
