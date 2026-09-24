import { shot } from '../../engine/core/scene.js';
import * as K2 from '../../engine/chars/cast2.js';
import * as P2 from '../../engine/props/props2.js';
import { g, rect } from '../../engine/core/svg.js';
const row = (defs, w = 2600) => ({ h: 560, panels: [{ x: 20, y: 20, w: 760, h: 520, mood: 'warm', art: shot({ cam: { x: w / 2 - 150, y: 520, w }, bg: () => rect(-500, -500, 4000, 2000, { fill: '#d9c9a8' }), actors: defs.map((d, i) => ({ def: d, id: 'a' + i, x: i * (w / defs.length), y: 1000, s: d.body.headRy > 57 && d.body.torsoH < 110 ? 1.1 : 1, turn: 0.2, pose: 'stand', expr: 'neutral' })) }) }] });
const props = (items) => ({ h: 560, panels: [{ x: 20, y: 20, w: 760, h: 520, mood: 'warm', art: (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#d9c9a8' }) + items.map(([fn, x, y, s]) => g({ transform: `translate(${x},${y}) scale(${s})` }, fn)).join('') }] });
export default { title: 'cast', tiles: [
  row([K2.hermioneRaven, K2.nevilleHuff, K2.dracoSly, K2.ernie, K2.terry, K2.anthony, K2.padma]),
  row([K2.michael, K2.dean, K2.zabini, K2.crabbe, K2.goyle, K2.derrick, K2.slyTeen(1)]),
  row([K2.hooch, K2.dumbledorePJ, K2.oldLady, K2.flubberwalt, K2.aristocrat, K2.master, K2.youngQuirrell], 3200),
  props([[P2.timeTurner(1), 110, 270, 0.8], [P2.timeTurner(1, { shell: true, lock: true, chain: false }), 260, 290, 0.7], [P2.pie(1), 420, 300, 0.8], [P2.pie(1, 'blueberry'), 600, 300, 0.8], [P2.splat(0.5), 110, 440, 1], [P2.giftBox(0.6), 300, 440, 1], [P2.cloak(260, 140), 560, 450, 1]]),
  props([[P2.pig(0.8), 120, 250, 1], [P2.chicken(1.2), 420, 250, 1], [P2.chicken(1.2, { fire: true }), 600, 250, 1], [P2.phoenix(0.7), 130, 470, 1], [P2.remembrall(1, { red: true }), 330, 430, 1], [P2.rock(0.8), 480, 440, 1], [P2.potionsBook(0.6, { open: true }), 640, 440, 1]]),
  props([[P2.cake(0.9), 150, 200, 1], [P2.sign(), 480, 170, 0.7], [P2.pioneer(0.6, { glint: true }), 150, 440, 1], [P2.instrument('dial8', 1), 350, 420, 1], [P2.instrument('blorple', 1), 450, 420, 1], [P2.instrument('wibblers', 1), 550, 420, 1], [P2.broom(0.4), 650, 480, 1], [P2.deskScreen(1), 650, 380, 1], [P2.targetSphere(1), 350, 520, 1], [P2.textbookPage('dementor', 150, 200), 520, 300, 1]]),
]};
