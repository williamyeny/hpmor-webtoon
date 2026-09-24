import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
import * as K from '../../engine/chars/cast.js';
const P = (bg, cam, actors = [], mood = 'warm', fg) => ({ h: 620, panels: [{ x: 20, y: 20, w: 760, h: 580, mood, art: shot({ cam, bg, actors, fg }) }] });
const H = (o = {}) => ({ def: K.harryRaven, id: 'harry', x: 1100, y: 1000, s: 1.1, turn: 0.2, expr: 'neutral', pose: 'stand', ...o });
export default { title: 'sets', tiles: [
  P(() => CS.ravenclawDorm({ time: 'night' }), { x: 1100, y: 450, w: 2200 }, [H({ x: 1100, y: 880, pose: 'sit', expr: 'asleep' })], 'candle', () => CS.dormBlanket()),
  P(() => CS.ravenclawDorm({ time: 'late', empty: true, harryNote: true, quiet: 1 }), { x: 1100, y: 450, w: 2000 }, [], 'warm'),
  P(() => CS.trunkCavern(), { x: 1000, y: 450, w: 2200 }, [H({ x: 900 })]),
  P(() => CS.corridor({ portraits: [{ x: 1000, w: 260, h: 340 }], rubble: true }), { x: 1200, y: 450, w: 2400 }, [H({ x: 900 })]),
  P(() => CS.staircases({ swing: [700, 500, 1, -10, 0.8] }), { x: 1000, y: 500, w: 2400 }, [H({ x: 1000, y: FLOOR() })]),
  P(() => CS.greenStudy(), { x: 1100, y: 450, w: 2400 }, [H({ x: 1100 })]),
  P(() => CS.mcgonagallOffice(), { x: 1100, y: 450, w: 2400 }, [{ def: K.mcgonagall, id: 'mcg', x: 1100, y: 900, pose: 'stand', expr: 'stern' }], 'warm', () => CS.mcgDesk()),
  P(() => CS.charmsRoom(), { x: 1100, y: 450, w: 2400 }, [{ def: K.flitwick, id: 'f', x: 1000, y: 820, pose: 'wand', expr: 'happy' }], 'warm', () => CS.deskRow(1100, { items: [{ x: 700, fn: (x, y) => CS.waterGlass(x, y, 1, 'ice') }, { x: 1300, fn: (x, y) => CS.waterGlass(x, y, 1, 'warm') }] })),
  P(() => CS.transfigRoom({ board: { x: 600, y: -300, w: 1100, h: 560, lines: [{ t: 'Transfiguration is not permanent!', y: 280, size: 70, underline: 900 }] } }), { x: 1100, y: 450, w: 2400 }, [{ def: K.mcgonagall, id: 'mcg', x: 1600, y: 900, pose: 'lecture', expr: 'stern' }], 'warm', () => CS.teacherDesk(1000)),
]};
function FLOOR() { return 900; }
