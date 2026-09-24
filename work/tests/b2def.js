import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
import { quirrell } from '../../engine/chars/cast.js';
import * as K2 from '../../engine/chars/cast2.js';
const P = (bg, cam, actors = []) => ({ h: 620, panels: [{ x: 20, y: 20, w: 760, h: 580, mood: 'candle', art: shot({ cam, bg, actors }) }] });
const row = (k, list) => [...list.map(([def, x], i) => ({ def, id: 'k' + k + i, x, y: CS.FLOOR - k * CS.ROW + 60, s: 1.05, turn: 0, pose: 'sit', seat: 140, expr: 'neutral' })), () => CS.tierFront(k, { screens: list.map(([, x]) => x), lit: true })];
export default { title: 'b2def', tiles: [
  P(() => CS.defenceStage({ spheres: 8 }), { x: 1000, y: 400, w: 2400 }, [{ def: quirrell, id: 'q', x: 1000, y: 690, pose: 'slump', expr: 'twitch' }]),
  P(() => CS.defenceTiers(), { x: 1000, y: 300, w: 2200 }, [...row(4, [[K2.harryRaven, 1400]]), ...row(3, [[K2.hermioneRaven, 700], [K2.terry, 1000]]), ...row(1, [[K2.dracoSly, 900], [K2.crabbe, 1150], [K2.goyle, 650]]), ...row(0, [[K2.dean, 1300]])]),
]};
