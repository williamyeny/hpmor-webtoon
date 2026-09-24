// engine pass test: head camera, lying pose, box balloon, calmer long shout, far tail, speaker alias, no glasses, deep bow
import { shot } from '../../engine/core/scene.js';
import { say, shout } from '../../engine/core/dsl.js';
import * as CS from '../../engine/bg/castle.js';
import { quirrell, mcgonagall } from '../../engine/chars/cast.js';
import { harryRaven, hermioneRaven } from '../../engine/chars/cast2.js';
const H = { def: harryRaven, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0.2, expr: 'neutral' };
export default { title: 'enginepass', tiles: [
 { h: 700, panels: [
   { x: 18, y: 18, w: 250, h: 664, art: shot({ cam: { head: 'harry', hw: 0.6, hy: 0.62 }, bg: () => CS.defenceStage({}), actors: [H] }) },
   { x: 280, y: 18, w: 250, h: 664, art: shot({ cam: { head: 'harry', hw: 0.6, hy: 0.62 }, bg: () => CS.defenceStage({}), actors: [{ ...H, glasses: false, expr: 'smile' }] }) },
   { x: 542, y: 18, w: 240, h: 664, art: shot({ cam: { on: ['mcg'], fr: 'full' }, bg: () => CS.defenceStage({}), actors: [{ def: mcgonagall, id: 'mcg', x: 1000, y: 900, pose: 'bow', lean: 30, expr: 'calm' }] }) },
 ], bubbles: [say('Harry', 'Head camera.', 143, 60, { anchor: 'tc', w: 200, fixed: true }), say('Harry', 'No glasses.', 405, 60, { anchor: 'tc', w: 200, fixed: true })] },
 { h: 900, panels: [{ x: 18, y: 18, w: 764, h: 864, art: shot({ cam: { x: 1100, y: 700, w: 1400 }, bg: () => CS.defenceStage({}), actors: [{ ...H, x: 1000, pose: 'lie', expr: 'exasperated' }, { def: quirrell, id: 'quirrell', x: 1600, y: 700, turn: -0.4, expr: 'smile' }] }) }],
   bubbles: [
     say('Professor Quirrell', 'Still too much indignation. (Alias: "Professor Quirrell" finds id quirrell.)', 560, 60, { anchor: 'tc', w: 360, fixed: true }),
     shout('Harry', 'I shall achieve my objectives through the power of *Science!* This is a long shout to check the calmer spikes.', 330, 330, { w: 520, fixed: true }),
     say('Harry', 'This is a long speech in the boxier balloon shape, which hugs the text rather than making a big ellipse around it. It should fit narrow panels much better.', 400, 860, { anchor: 'bc', w: 560, fixed: true, shape: 'box' }),
   ] },
  { h: 700, panels: ['crossArms', 'gesture', 'think'].map((pose, k) => ({ x: 18 + k * 258, y: 18, w: 248, h: 664, art: shot({ cam: { head: 'h' + k, hw: 0.55, hy: 0.3 }, bg: () => CS.defenceStage({}), actors: [{ def: k === 1 ? quirrell : harryRaven, id: 'h' + k, x: 1000, y: 900, s: k === 1 ? 1 : 1.1, turn: 0.3, pose, expr: 'neutral' }] }) })) },
]};
