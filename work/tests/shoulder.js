import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
import { harry, mcgonagall, dad } from '../../engine/chars/cast.js';
import { harryRaven } from '../../engine/chars/cast2.js';
const D = [[harry, 'relaxed'], [dad, 'relaxed'], [mcgonagall, 'relaxed']];
export default { title: 'shoulder', tiles: [{ h: 520, panels: D.map(([def, pose], k) => ({ x: 18 + k * 258, y: 18, w: 248, h: 484, art: shot({ cam: { head: 'a', hw: 0.55, hy: 0.25 }, bg: () => CS.defenceStage({}), actors: [{ def, id: 'a', x: 1000, y: 900, s: 1.1, turn: 0.35, pose, expr: 'neutral' }] }) })) }] };
