import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
import { asst1, mcgonagall } from '../../engine/chars/cast.js';
const ex = ['wince', 'focus', 'neutral', 'smile', 'shock', 'laugh'];
export default { title: 'asst', tiles: [0, 1].map((r) => ({ h: 420, panels: ex.slice(r * 3, r * 3 + 3).map((e, k) => ({ x: 18 + k * 258, y: 18, w: 248, h: 384, art: shot({ cam: { on: ['a'], fr: 'close' }, bg: () => CS.defenceStage({}), actors: [{ def: asst1, id: 'a', x: 1000, y: 900, turn: -0.3, expr: e }] }) })) })) };
