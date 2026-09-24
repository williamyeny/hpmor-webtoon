import { Episode, say, cap, capC, shout } from '../../engine/core/dsl.js';
import * as CS from '../../engine/bg/castle.js';
import * as HG from '../../engine/bg/hogwarts.js';
import { mcgonagall, quirrell } from '../../engine/chars/cast.js';
import { harryRaven, hermioneRaven } from '../../engine/chars/cast2.js';
const ep = new Episode({ id: 'frames', number: 0, title: 'frames' });
const H = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0.3, pose: 'stand', expr: 'neutral', ...o });
ep.panel(900, { cam: { x: 1000, y: 500, w: 1400 }, bg: () => CS.corridor({}), actors: [H({ pose: 'walk' })] }, [cap('A gothic arch, stone frame.', 44, 30, { w: 360, fixed: true })], { shape: 'gothic', frame: 'stone', mood: 'candle' });
ep.cutout(700, { cam: { on: ['harry'], fr: 'full' }, actors: [H({ pose: 'armsUp', expr: 'bigGrin' })] }, [shout('Harry', 'Cutout: no frame at all!', 560, 80, { w: 300, fixed: true })]);
ep.panel(700, { cam: { head: 'mcg', hw: 0.3, hy: 0.1 }, bg: () => CS.defenceStage({}), actors: [{ def: mcgonagall, id: 'mcg', x: 1000, y: 900, turn: 0.2, pose: 'point', expr: 'stern' }] }, [say('McGonagall', 'Breakout: my hat goes over the top edge.', 560, 420, { w: 300, fixed: true })], { breakout: 'top', mood: 'warm', ph: 520, panel: { y: 160 } });
ep.multi(620, [
  { x: 18, y: 18, w: 370, h: 584, shape: 'keyhole', frame: 'wood', art: { cam: { on: ['harry'], fr: 'bust' }, bg: () => CS.corridor({}), actors: [H({ expr: 'suspicious' })] } },
  { x: 410, y: 18, w: 372, h: 584, shape: 'torn', frame: 'paper', seed: 4, art: { cam: { on: ['h2'], fr: 'bust' }, bg: () => CS.corridor({}), actors: [{ def: hermioneRaven, id: 'h2', x: 1000, y: 900, s: 1.1, turn: -0.3, expr: 'smile' }] } },
]);
ep.multi(520, [
  { x: 18, y: 18, w: 400, h: 484, shape: 'slant', slant: 60, art: { cam: { on: ['harry'], fr: 'bust' }, bg: () => CS.corridor({}), actors: [H({ expr: 'shock' })] } },
  { x: 382, y: 18, w: 400, h: 484, shape: 'burst', art: { cam: { on: ['q'], fr: 'close' }, bg: () => CS.defenceStage({}), actors: [{ def: quirrell, id: 'q', x: 1000, y: 900, turn: -0.2, expr: 'coldSmile' }] } },
]);
ep.multi(520, [
  { x: 18, y: 18, w: 370, h: 484, shape: 'oval', frame: 'gilt', art: { cam: { on: ['mcg'], fr: 'bust' }, bg: () => CS.defenceStage({}), actors: [{ def: mcgonagall, id: 'mcg', x: 1000, y: 900, turn: 0.2, expr: 'smile' }] } },
  { x: 410, y: 60, w: 372, h: 400, shape: 'cloud', border: 'none', frame: 'none', mood: 'sepia', art: { cam: { on: ['harry'], fr: 'bust' }, bg: () => CS.corridor({}), actors: [H({ expr: 'smile' })] } },
]);
export default ep;
