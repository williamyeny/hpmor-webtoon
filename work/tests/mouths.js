// McGonagall's mouth across expressions (close-ups): check lips and open mouths read as a mouth
import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
import { mcgonagall } from '../../engine/chars/cast.js';
const EX = ['neutral', 'stern', 'suspicious', 'talk', 'focus', 'tired', 'shock', 'smile'];
export default { title: 'mouths', tiles: [0, 1].map((r) => ({ h: 330, panels: EX.slice(r * 4, r * 4 + 4).map((e, k) => ({ x: 18 + k * 192, y: 18, w: 184, h: 294, art: shot({ cam: { head: 'm', hw: 0.8, hy: 0.45 }, bg: () => CS.defenceStage({}), actors: [{ def: mcgonagall, id: 'm', x: 1000, y: 900, turn: 0.1, expr: e }] }) })) })) };
