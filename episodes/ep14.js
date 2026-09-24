// EPISODE 14 — Minus Infinity  (source: HPMOR ch. 13, second half)
// Harry wins the fight, loses the boy he saved, and loses the Game.
import { Episode, say, shout, whisper, inner, cold, cap, capC, plain, sfx, M } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as CS from '../engine/bg/castle.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { sprout, student, dad } from '../engine/chars/cast.js';
import { harryRaven, nevilleHuff, ernie, derrick, slyTeen, conscience } from '../engine/chars/cast2.js';
import { wand, bookHeld } from '../engine/props/props.js';
import * as P2 from '../engine/props/props2.js';
import { dayBeat, header, note } from './b2.js';

const ep = new Episode({ id: 'ep14', number: 14, title: 'Minus Infinity' });
ep.setBg(C.paper);
header(ep, 'FOURTEEN', 'Minus Infinity');
dayBeat(ep, 'Monday.', 'Still.');

// ---------------------------------------------------------------- the corridor (same staging as the end of Ep 13)
const COR = () => CS.corridor({ seed: 13, windows: [300, 2200], torches: [1200] });
const T = (id, def, x, y, s, turn, o = {}) => ({ def, id, x, y, s, turn, pose: 'stand', expr: 'smug', ...o });
const RING = (o = {}) => [
  ...(o.huff !== false ? [0, 1, 2, 3, 4, 5].map((i) => ({ def: i === 0 ? ernie : student(1340 + i, 'h'), id: i === 0 ? 'ernie' : 'h' + i, x: 200 + i * 95, y: 960 + (i % 2) * 30, s: 1.0, turn: 0.5, expr: i % 2 ? 'worried' : 'horror', pose: 'stand', ...((o.hf || {})[i] || {}) })) : []),
  T('s1', slyTeen(1), 1010, 930, 1.3, 0.2, { expr: 'laugh', pose: 'handsHips', ...(o.s1 || {}) }),
  T('s3', slyTeen(3), 1140, 880, 1.3, 0.1, { expr: 'grin', ...(o.s3 || {}) }),
  T('derrick', derrick, 1400, 940, 1.4, -0.3, { expr: 'smug', pose: 'crossArms', ...(o.d || {}) }),
  T('s2', slyTeen(2), 1560, 930, 1.3, -0.4, { expr: 'smug', ...(o.s2 || {}) }),
  T('conscience', conscience, 1720, 910, 1.28, -0.5, { expr: 'worried', ...(o.c || {}) }),
  ...(o.nev !== false ? [{ def: nevilleHuff, id: 'neville', x: 520, y: 1000, s: 1.05, turn: 0.4, expr: 'cry', pose: 'cower', ...(o.n || {}) }] : []),
  { def: harryRaven, id: 'harry', x: 1250, y: 990, s: 1.1, turn: 0.1, pose: 'stand', expr: 'cold', ...(o.h || {}) },
  ...(o.books !== false ? [() => g({}, ...[[1180, 1010, -20], [1330, 1030, 12], [1420, 1000, 40]].map(([x, y, r]) => g({ transform: `translate(${x},${y}) rotate(${r})` }, rect(-40, -10, 80, 20, { fill: '#6b2433', stroke: C.ink, 'stroke-width': 2 }))))] : []),
];
// after the first pie, the two Slytherins who dived clear stay off to the side
const R2 = (o = {}, front) => { const l = RING({ ...o, s1: { x: 760, ...(o.s1 || {}) }, s3: { x: 880, ...(o.s3 || {}) } }); return front ? [...l.filter((a) => a.id !== front), l.find((a) => a.id === front)] : l; };
// a pie stuck to someone's face / head: (e) => overlay on actor `id`
const PIE_ON = (id, kind = 'cherry', dx = 0, dy = 0, k = 1) => (e) => { const a = e.anchors[id]; if (!a) return ''; return g({ transform: `translate(${a.head[0] + dx * a.hr},${a.head[1] + dy * a.hr})` }, P2.splat(a.hr / 80 * k, kind, kind.length, { eyes: kind === 'cherry' && dx === 0 })); };

// close-up insert: a big hand bending a small index finger back (drawn directly; the rig's hands are too small to read here)
const FINGER = (e) => {
  const INK = C.ink, lw = 4.5, SK = { stroke: INK, 'stroke-width': lw, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
  const hs = harryRaven.skin, hsh = harryRaven.skinShade, ds = derrick.skin, dsh = derrick.skinShade;
  const sx = e.w / 752, sy = e.h / 604;
  const harry = g({ transform: `translate(${250 * sx},${420 * sy}) rotate(-38)` },
    rect(-460, -78, 420, 156, { fill: '#1c1a22', ...SK }),                               // sleeve
    rect(-60, -80, 34, 160, { fill: '#2d4f9a', ...SK }),                                 // Ravenclaw cuff
    rect(-30, -44, 50, 88, { fill: hs, ...SK }),                                         // wrist
    ellipse(58, 6, 82, 66, { fill: hs, ...SK }),                                         // fist
    path('M92,-8 q34,4 40,24 M86,26 q34,4 38,24 M70,54 q24,6 26,18', { fill: 'none', stroke: INK, 'stroke-width': 3, 'stroke-linecap': 'round' }), // curled fingers
    path('M24,-42 q30,-26 64,-12', { fill: 'none', stroke: hsh, 'stroke-width': 10, 'stroke-linecap': 'round' }),
    g({ transform: 'translate(86,-40) rotate(-78)' }, rect(-6, -22, 200, 44, { rx: 22, fill: hs, ...SK }), path('M70,-12 q6,12 0,24 M126,-12 q6,12 0,24', { fill: 'none', stroke: hsh, 'stroke-width': 3 })), // index finger, forced back
  );
  // the finger tip in panel space (approx), where the big hand grips
  const tx = 250 * sx + 5, ty = 420 * sy - 230;
  const big = g({ transform: `translate(${tx + 70},${ty + 10}) rotate(-8)` },
    path('M120,-40 L560,-150 L560,150 L150,90 Z', { fill: '#1f1d24', ...SK }),         // sleeve from the right
    path('M118,-44 L150,92', { fill: 'none', stroke: '#2f6b45', 'stroke-width': 26 }),  // Slytherin cuff
    path('M118,-44 L150,92', { fill: 'none', stroke: INK, 'stroke-width': 3, 'stroke-dasharray': '0' }),
    ellipse(40, 20, 108, 88, { fill: ds, ...SK }),                                      // palm/back of hand
    ...[-52, -8, 36, 78].map((y, i) => ellipse(-60 + i * 4, y, 44, 26, { fill: ds, ...SK })), // fingers curled over
    ellipse(20, -70, 50, 26, { fill: ds, ...SK, transform: 'rotate(-20 20 -70)' }),    // thumb pressing
    path('M60,-10 q30,10 40,40', { fill: 'none', stroke: dsh, 'stroke-width': 8, 'stroke-linecap': 'round' }),
  );
  const strain = g({}, ...[[-40, -10], [-50, 30], [-30, 60]].map(([dx, dy]) => path(`M${tx + dx},${ty + dy} l-34,${dy / 4}`, { stroke: INK, 'stroke-width': 3.5, 'stroke-linecap': 'round' })));
  return g({}, harry, big, strain);
};
ep.panel(900, { cam: { x: 1270, y: 560, w: 1000 }, bg: COR, actors: RING() },
  [cap('There was a rather awkward pause. No-one seemed to know where the conversation was supposed to go from there.', 44, 30, { w: 495, fixed: true })],
  { mood: 'warm', alt: 'Harry stands where Neville stood, looking up at five much bigger Slytherins. Neville huddles with the Hufflepuffs.' });
ep.panel(500, { cam: { x: 1300, y: 950, w: 520 }, bg: COR, actors: RING() },
  [cap('Harry\'s eyes dropped to the books scattered on the floor. Oh. The old game where you let a boy try to pick up his books, and then knock them out of his hands again.', 44, 30, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['derrick'], fr: 'bust', dy: -0.2 }, bg: COR, blur: 2, actors: RING({ d: { pose: 'point', expr: 'grin', turn: -0.2, armB: { sh: 40, el: 10, hand: 'point' } } }) },
  [say('Derrick', 'Ooh, did \'oo want the widdle books…', 400, 64, { anchor: 'tc', w: 460, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['harry'], fr: 'close', dy: 0.15 }, bg: COR, blur: 3, actors: RING({ h: { expr: 'cold' } }), over: (e) => FX.frost(e.w, e.h, 0.3, 41) },
  [cold('Harry', 'Shut up.', 170, 64, { anchor: 'tc', w: 200, fixed: true }),
   inner('Harry', '*Keep them off balance. Don\'t do what they expect. Don\'t fall into a pattern that calls for them to bully you.*', 400, 640, { w: 560, fixed: true })], { mood: 'cold' });
ep.panel(960, { cam: { x: 1310, y: 500, w: 640 }, bg: COR, blur: 2, actors: RING({ h: { turn: 0.4 }, d: { expr: 'angry', pose: 'stand' } }), over: (e) => FX.frost(e.w, e.h, 0.2, 43) },
  [cold('Harry', 'Is this part of some incredibly clever plan that will gain you future advantage? Or is it as pointless a disgrace to the name of Salazar Slytherin as it—', 400, 44, { anchor: 'tc', w: 480, fixed: true })], { mood: 'cold' });
ep.bleed(820, { cam: { x: 1180, y: 670, w: 820 }, bg: COR, actors: RING({ h: { x: 1000, y: 1030, pose: 'fallBack', expr: 'shock', turn: 0.5 }, d: { pose: 'reach', expr: 'angry', turn: -0.6, armB: { sh: 62, el: 8, hand: 'open' } } }), over: (e) => FX.speedLines(e.w, e.h, { n: 30 }) },
  [sfx('SHOVE!', 390, 470, { size: 96, rot: -12 })], { alt: 'The biggest Slytherin shoves Harry hard. He goes sprawling across the stone floor.' });
ep.panel(700, { cam: { x: 1290, y: 640, w: 1000 }, bg: COR, actors: RING({ h: { x: 1000, y: 1030, pose: 'fallBack', expr: 'hurt', turn: 0.5 }, s1: { expr: 'laugh' }, s3: { expr: 'laugh' }, s2: { expr: 'laugh' }, d: { expr: 'laugh' } }) },
  [cap('And the Slytherins laughed.', 44, 30, { w: 360, fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: { on: ['harry'], fr: 'waist', dy: -0.1 }, bg: COR, blur: 2, actors: RING({ h: { x: 1000, pose: 'stand', expr: 'cold', turn: 0.4 } }), over: (e) => FX.frost(e.w, e.h, 0.5, 45) },
  [cap('Harry rose in what seemed to him like terribly slow motion.', 44, 30, { w: 500, fixed: true }),
   cap('He didn\'t know how to use his wand yet. But there was no reason to let that stop him.', 44, 740, { w: 620, fixed: true })], { mood: 'cold', alt: 'Harry gets up, face gone flat and cold. Frost at the edges.' });
ep.panel(820, { cam: { x: 1220, y: 640, w: 600 }, bg: COR, blur: 2, actors: RING({ s1: { x: 640 }, s3: { x: 820 }, h: { x: 1000, pose: 'point', turn: 0.5, expr: 'cold', armB: { sh: 120, el: 4, hand: 'point' } } }), over: (e) => FX.frost(e.w, e.h, 0.45, 47) },
  [cold('Harry', 'I\'d like to pay *as many points as it takes* to get rid of this person.', 250, 44, { anchor: 'tc', w: 320, fixed: true })], { mood: 'cold' });
ep.panel(760, { cam: { on: ['harry'], fr: 'waist', dx: 0.5, dy: -0.1 }, bg: COR, blur: 3, actors: RING({ h: { x: 1000, pose: 'wandUp', turn: 0.3, expr: 'cold', armB: { sh: 95, el: 70, hand: 'point' } } }), over: (e) => FX.frost(e.w, e.h, 0.45, 49) },
  [cold('Harry', 'Abracadabra.', 250, 64, { anchor: 'tc', w: 280, fixed: true }), sfx('SNAP', 600, 330, { size: 80, rot: -10 })], { mood: 'cold', alt: 'Harry lifts his other hand and snaps his fingers.' });
ep.multi(640, [
  { x: M, y: 18, w: 368, h: 604, mood: 'warm', art: { cam: { x: 420, y: 745, w: 400 }, bg: COR, actors: RING({ n: { expr: 'horror', pose: 'cower' }, hf: { 1: { expr: 'horror', pose: 'panic' }, 2: { expr: 'horror' } } }) } },
  { x: 408, y: 18, w: 368, h: 604, mood: 'warm', art: { cam: { x: 1390, y: 600, w: 620 }, bg: COR, actors: RING({ d: { expr: 'what' }, s1: { pose: 'fallBack', expr: 'horror', x: 1200, y: 1060, turn: -0.5 }, s3: { pose: 'panic', expr: 'horror', x: 1230, turn: -0.5 }, s2: { pose: 'fallBack', expr: 'horror', x: 1580, y: 1010, turn: 0.5 }, h: { x: 1000 } }), over: (e) => FX.speedLines(e.w, e.h, { n: 16 }) } },
], [cap('Two of the Hufflepuffs screamed.', 44, 34, { w: 290, fixed: true }), cap('Three Slytherins leapt desperately out of the way.', 428, 34, { w: 270, fixed: true })],
  { alt: 'Neville and another Hufflepuff scream. Three Slytherins dive aside.' });
ep.bleed(1000, { cam: { on: ['derrick'], fr: 'bust', dy: -0.1 }, bg: COR, blur: 2, actors: RING({ h: { x: 800 }, d: { expr: 'shock', pose: 'panic', turn: -0.1 } }), over: (e) => PIE_ON('derrick', 'cherry', 0, 0.1, 1.0)(e) + FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { n: 20, col: '#b81f2e', op: 0.25 }) },
  [sfx('SPLAT!', 400, 150, { size: 110, rot: -6 })], { alt: 'A cherry pie hits the biggest Slytherin square in the face.' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close', zoom: 0.85, dy: -0.2 }, bg: COR, blur: 3, actors: R2({ h: { x: 1000, expr: { base: 'shock', mouth: { type: 'flat' } } } }) },
  [cap('Harry had *not* been expecting *that.*', 44, 30, { w: 420, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['derrick'], fr: 'waist', dy: -0.3 }, bg: COR, actors: R2({ h: { x: 1080 }, d: { expr: 'blank', pose: 'stand', armB: { sh: 140, el: 20, hand: 'hold', prop: g({ transform: 'rotate(-30)' }, P2.pie(0.7)) } } }), over: (e) => PIE_ON('derrick', 'cherry', 0, 0.2, 0.9)(e) },
  [cap('Slowly, the largest Slytherin reached up and peeled off the pan of cherry pie that had just draped itself over him.', 44, 30, { w: 540, fixed: true })], { mood: 'warm' });
ep.panel(620, { cam: { x: 600, y: 760, w: 540 }, bg: COR, blur: 2, actors: RING({ hf: { 3: { expr: 'worried' }, 4: { expr: 'horror' }, 5: { expr: { base: 'bigGrin', blush: true }, pose: 'shrug', turn: -0.2 } } }) },
  [cap('It probably wasn\'t the best time in the world for one of the Hufflepuffs to start giggling. But that was exactly what one of the Hufflepuffs was doing.', 44, 30, { w: 620, fixed: true })], { mood: 'warm', alt: 'One of the Hufflepuffs has his hands over his mouth, giggling helplessly.' });
ep.panel(760, { cam: { x: 1290, y: 540, w: 640 }, bg: COR, actors: R2({ h: { x: 1150, pose: 'reach', expr: 'focus', turn: 0.4 }, d: { expr: 'angry', pose: 'fists' } }), over: (e) => PIE_ON('derrick', 'cherry', 0, 0.2, 0.9)(e) },
  [say('Harry', 'Hold on, this note\'s for me, I think…', 226, 320, { w: 280, fixed: true }),
   say('Derrick', '*You.* Are. Going. To…', 560, 44, { anchor: 'tc', w: 280, fixed: true })], { mood: 'warm' });
ep.panel(1120, { cam: { x: 1170, y: 735, w: 420 }, bg: COR, blur: 2, actors: R2({ d: { expr: 'angry' }, h: { x: 1150, pose: 'holdUp', expr: 'rant', turn: 0.4, armB: { sh: 110, el: 30, hand: 'hold', prop: g({ transform: 'translate(0,-30) rotate(-10)' }, P2.slip(110, 80, { lines: 4 })) } } }) },
  [shout('Harry', '*Look* at this! Can you believe I\'m being charged *30 points* for shipping and handling on one lousy pie?', 400, 90, { anchor: 'tc', w: 420, size: 34, fixed: true }),
   shout('Harry', 'I\'m turning a *loss* on the deal, even after rescuing an innocent boy in distress!', 400, 1010, { anchor: 'bc', w: 420, size: 34, fixed: true })], { mood: 'warm', alt: 'Harry brandishes the note from the bottom of the pie pan in the Slytherin\'s face.' });
ep.panel(760, { cam: { on: ['derrick'], fr: 'close', dx: -0.5, dy: -0.4, zoom: 0.8 }, bg: COR, blur: 2, actors: R2({ h: { x: 1150 }, d: { expr: 'blank', turn: -0.3 } }), over: (e) => PIE_ON('derrick', 'cherry', 0, 0.2, 0.9)(e) },
  [shout('Harry', 'Storage fees? Conveyance charges? How do you get *drayage costs* on a *pie?*', 310, 80, { anchor: 'tc', w: 300, size: 34, fixed: true })], { mood: 'warm', alt: 'The pie-smeared Slytherin stares blankly.' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: COR, blur: 3, actors: R2({ h: { x: 1150, expr: 'menace', turn: 0.3 } }) },
  [say('Harry', 'Now go away, or I will just keep making your existence more and more surreal until you do.', 400, 64, { anchor: 'tc', w: 540, fixed: true }),
   say('Harry', 'Let me warn you… messing with *my* life tends to make *your* life… *a little hairy.* Get it?', 400, 960, { anchor: 'bc', w: 520, fixed: true })], { mood: 'warm' });
ep.bleed(1000, { cam: { on: ['derrick'], fr: 'waist', dy: -0.25, zoom: 0.85 }, bg: COR, actors: R2({ h: { x: 1060 }, d: { expr: 'shock', pose: 'wand', turn: -0.4, armB: { sh: 120, el: -10, hand: 'hold', prop: wand(120) } } }), over: (e) => PIE_ON('derrick', 'cherry', 0, 0.2, 0.9)(e) + PIE_ON('derrick', 'blueberry', 1.05, -0.45, 0.9)(e) + FX.burst(e.w, e.h, e.w * 0.7, e.h * 0.3, { n: 18, col: '#3a3a8a', op: 0.25 }) },
  [cap('In a single terrible motion, the largest Slytherin whipped out his wand. And in the same instant was hit on the other side of his head by another pie, this one bright blueberry.', 44, 30, { w: 620, fixed: true }),
   sfx('SPLAT!', 610, 300, { size: 90, rot: 12 })], { alt: 'A second pie, blueberry this time, smacks into the side of his head.' });
ep.panel(760, { cam: { x: 1270, y: 560, w: 680 }, bg: COR, actors: R2({ h: { x: 1150, expr: 'smug', turn: 0.4, pose: 'point', armB: { sh: 115, el: 5, hand: 'point' } }, d: { expr: 'blank', turn: -0.2 } }), over: (e) => PIE_ON('derrick', 'cherry', 0, 0.2, 0.9)(e) + PIE_ON('derrick', 'blueberry', 1.05, -0.45, 0.9)(e) },
  [say('Harry', 'You might want to read the note on that pie. I think it\'s for you this time.', 232, 44, { anchor: 'tc', w: 300, fixed: true })], { mood: 'warm' });
ep.panel(520, { cam: { x: 400, y: 500, w: 800 }, bg: () => CS.corridor({ seed: 13 }) },
  [note('**WARNING**\n\nNo magic may be used on the contestant\nwhile the Game is in progress\n\nFurther interference in the Game\nwill be reported to the Game Authorities', 400, 260, { w: 560, rot: -3 })], { mood: 'warm', alt: 'The note under the second pie.' });
ep.panel(600, { cam: { on: ['harry'], fr: 'close' }, bg: COR, blur: 3, actors: R2({ h: { x: 1150, expr: 'grin' } }) },
  [cap('The look of sheer bafflement on the Slytherin\'s face was a work of art. Harry thought he might be starting to like this Game Controller.', 44, 30, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { x: 1300, y: 405, w: 640 }, bg: COR, actors: R2({ h: { x: 1150, expr: 'neutral', turn: 0.4, pose: 'shrug' }, d: { expr: 'menace', turn: -0.3 } }), over: (e) => PIE_ON('derrick', 'cherry', 0, 0.2, 0.9)(e) + PIE_ON('derrick', 'blueberry', 1.05, -0.45, 0.9)(e) },
  [say('Harry', 'Look. You want to call it a day? I think things are spiralling out of control here.', 208, 44, { anchor: 'tc', w: 262, fixed: true }),
   say('Derrick', 'I\'ve got a better idea. How about if you *accidentally* break all your fingers?', 584, 176, { anchor: 'tc', w: 282, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust', dy: -0.45, zoom: 0.9 }, bg: COR, blur: 2, actors: R2({ h: { x: 1150, expr: 'exasperated', turn: 0.3, pose: 'shrug' } }) },
  [say('Harry', 'How in Merlin\'s name do you stage a believable accident after making the threat in front of a dozen witnesses, you *idiot…*', 400, 40, { anchor: 'tc', w: 520, fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: { x: 1330, y: 540, w: 640 }, bg: COR, actors: R2({ h: { x: 1270, turn: 0.3, pose: 'stand', armB: { sh: 120, el: 10, hand: 'point' }, expr: 'determined' }, d: { x: 1390, y: 960, turn: -0.3, pose: 'stand', armF: { sh: 20, el: 20, hand: 'fist' }, armB: { sh: 0, el: 5, hand: 'fist' }, expr: 'menace' } }), over: (e) => PIE_ON('derrick', 'cherry', 0, 0.2, 0.9)(e) + PIE_ON('derrick', 'blueberry', 1.05, -0.45, 0.9)(e) },
  [cap('The largest Slytherin slowly, deliberately, took Harry\'s right hand in one of his. And took Harry\'s index finger in the other.', 44, 30, { w: 620, fixed: true }),
   whisper('Conscience', 'Wait! Stop, you shouldn\'t actually do that!', 590, 800, { w: 300, fixed: true, noTail: true })], { mood: 'warm', alt: 'The big Slytherin holds Harry\'s hand and starts to bend his index finger back.' });
ep.panel(700, { cam: { x: 1345, y: 690, w: 300 }, bg: COR, blur: 3, actors: [], over: FINGER },
  [cap('Slowly, the Slytherin started to bend the finger backwards.', 44, 30, { w: 520, fixed: true })], { mood: 'warm', alt: 'Close on the two hands: a big hand bending a small finger back.' });
ep.panel(880, { cam: { on: ['harry'], fr: 'eyes', zoom: 0.8 }, bg: COR, blur: 3, actors: R2({ h: { x: 1250, expr: { base: 'cold', eyes: { lookX: 0.4, lookY: -0.4 } }, turn: 0.3 } }), over: (e) => FX.frost(e.w, e.h, 0.4, 51) },
  [inner('Harry', '*Part of him was screaming that this wasn\'t supposed to happen, this wasn\'t* allowed *to happen, grown-ups would never let something like this* actually *happen…*', 400, 64, { anchor: 'tc', w: 600, fixed: true }),
   cold('Harry', 'He hasn\'t actually broken my finger. And it is beneath me to so much as flinch until he does.', 400, 820, { anchor: 'bc', w: 560, fixed: true })], { mood: 'cold', alt: 'Harry stares the Slytherin straight in the eyes, and does not flinch.' });
ep.panel(760, { cam: { on: ['conscience'], fr: 'bust', dy: -0.1 }, bg: COR, blur: 2, actors: R2({ c: { expr: 'horror', pose: 'reach', turn: -0.3 } }) },
  [shout('Conscience', 'Stop! Stop, this is a very bad idea!', 400, 64, { anchor: 'tc', w: 420, fixed: true }),
   say('Voice', 'I rather agree.', 560, 700, { w: 260, fixed: true, noTail: true })], { mood: 'warm' });

// ---------------------------------------------------------------- Professor Sprout
const SP = (o = {}) => ({ def: sprout, id: 'sprout', x: 700, y: 950, turn: 0.4, pose: 'point', expr: 'stern', ...o });
ep.bleed(760, { cam: { x: 1010, y: 520, w: 1100 }, bg: COR, actors: [...R2({ nev: false, huff: false, s1: { x: 900, expr: 'shock', turn: -0.4 }, s3: { x: 1020, expr: 'horror', turn: -0.4 }, d: { x: 1480, expr: 'shock', pose: 'fallBack' }, h: { x: 1250, turn: -0.3, expr: 'shock' } }), SP({ x: 580 })] },
  [cap('The largest Slytherin let go of Harry\'s hand and jumped backwards as if burned.', 44, 40, { w: 560, fixed: true }),
   shout('Hufflepuff', 'Professor Sprout!', 180, 250, { w: 220, size: 34, fixed: true, noTail: true })], { alt: 'A dumpy little witch with messy grey curls and earth-stained robes stalks in, pointing an accusing finger.' });
ep.panel(1000, { cam: { on: ['sprout'], fr: 'waist', dy: -0.2 }, bg: COR, actors: [...R2({ nev: false, huff: false }), SP({ x: 560, expr: 'cross' })] },
  [say('Sprout', 'Explain yourselves. What are you doing with my Hufflepuffs and…', 400, 64, { anchor: 'tc', w: 420, fixed: true }),
   say('Sprout', '…my fine student, Harry Potter.', 400, 950, { anchor: 'bc', w: 360, fixed: true })], { mood: 'warm' });
ep.panel(520, { cam: { on: ['harry'], fr: 'close' }, bg: COR, blur: 3, actors: R2({ h: { expr: 'wince', turn: -0.3 } }) },
  [inner('Harry', '*Uh oh. It was her class he\'d missed this morning.*', 400, 50, { anchor: 'tc', w: 400, fixed: true })], { mood: 'warm' });
ep.panel(960, { cam: { x: 1350, y: 640, w: 640 }, bg: COR, actors: R2({ c: { pose: 'point', expr: 'yell', turn: -0.4, x: 1480 }, d: { x: 1660, expr: 'cross' }, s2: { x: 1820 }, h: { expr: 'what', turn: 0.4 } }) },
  [shout('Conscience', 'He threatened to *kill* us!', 300, 72, { anchor: 'tc', w: 300, fixed: true }),
   say('Harry', 'What? I did *not!* If I was going to kill you, I wouldn\'t make *public threats* first!', 330, 906, { anchor: 'bc', w: 420, fixed: true })], { mood: 'warm' });
ep.panel(640, { cam: { on: ['s3', 'derrick'], fr: 'bust', dy: -0.3 }, bg: COR, actors: R2({ h: { x: 500 }, s1: { x: 960, expr: 'angry', turn: 0.5 }, s3: { x: 1160, expr: 'laugh', pose: 'crossArms', turn: 0.1 }, d: { expr: 'angry', turn: -0.6 }, s2: { expr: 'angry', turn: -0.6 }, c: { expr: 'cross', turn: -0.6 } }) },
  [cap('One Slytherin laughed helplessly, and stopped abruptly under the others\' glares.', 44, 30, { w: 560, fixed: true })], { mood: 'warm', alt: 'One Slytherin snorts with laughter; the others glare at him.' });
ep.panel(600, { cam: { on: ['sprout'], fr: 'bust', dy: -0.3 }, bg: COR, blur: 2, actors: [SP({ x: 900, expr: 'suspicious', pose: 'handsHips' })] },
  [say('Sprout', 'What death threat would this be, exactly?', 400, 40, { anchor: 'tc', w: 400, fixed: true })], { mood: 'warm' });
ep.panel(680, { cam: { on: ['conscience'], fr: 'bust', dy: -0.45 }, bg: COR, blur: 2, actors: R2({ h: { x: 500 }, c: { pose: 'point', expr: 'yell', turn: -0.4, x: 1480 }, d: { x: 1660, expr: 'cross' }, s2: { x: 1820 } }) },
  [shout('Conscience', 'The Killing Curse! He pretended to use the Killing Curse on us!', 400, 76, { anchor: 'tc', w: 440, size: 34, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['sprout'], fr: 'bust', dy: -0.4 }, bg: COR, blur: 2, actors: [SP({ x: 900, expr: 'stern', pose: 'handsHips' })] },
  [say('Sprout', 'Yes, quite a terrible threat from an eleven-year-old boy. Though still not something you should *ever* dream of pretending, Harry Potter.', 400, 40, { anchor: 'tc', w: 540, fixed: true })], { mood: 'warm' });
ep.panel(860, { cam: { on: ['sprout', 'harry'], fr: 'waist', dy: -0.9 }, bg: COR, actors: [SP({ x: 900, pose: 'crossArms', expr: 'suspicious' }), { def: harryRaven, id: 'harry', x: 1200, y: 990, s: 1.1, turn: -0.4, pose: 'shrug', expr: 'neutral' }, { def: ernie, id: 'hufflepuff', x: 1500, y: 990, s: 1.0, turn: -0.5, pose: 'point', expr: 'yell' }] },
  [say('Harry', 'I don\'t even know the *words* to the Killing Curse. And I didn\'t have my wand out at any time.', 560, 50, { anchor: 'tc', w: 340, fixed: true }),
   say('Sprout', 'I suppose this boy hit *himself* with two pies, then.', 250, 800, { anchor: 'bc', w: 320, fixed: true })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['hufflepuff'], fr: 'bust', dy: -0.35, zoom: 0.8 }, bg: COR, blur: 2, actors: [SP({ x: 900, pose: 'crossArms', expr: 'suspicious' }), { def: harryRaven, id: 'harry', x: 1200, y: 990, s: 1.1, turn: -0.4, pose: 'shrug', expr: 'neutral' }, { def: ernie, id: 'hufflepuff', x: 1500, y: 990, s: 1.0, turn: -0.5, pose: 'point', expr: 'yell' }] },
  [shout('Hufflepuff', 'He *didn\'t* use his wand! He just snapped his fingers and there was *pie!*', 400, 70, { anchor: 'tc', w: 420, size: 34, fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: { on: ['sprout', 'harry'], fr: 'bust', dy: -0.7 }, bg: COR, actors: [SP({ x: 1000, pose: 'wand', expr: 'focus', armB: { sh: 42, el: 0, hand: 'hold', prop: wand(110) } }), { def: harryRaven, id: 'harry', x: 1260, y: 990, s: 1.1, turn: -0.4, pose: 'present', expr: 'neutral', armB: { hand: 'hold', prop: wand(110) } }], over: (e) => { const a = e.anchors.harry; return a ? FX.sparkles([[a.head[0] - a.hr * 1.8, a.head[1] + a.hr * 1.4]], { r: 30 }) : ''; } },
  [say('Sprout', '*Prior Incantato.*', 200, 36, { anchor: 'tc', w: 260, fixed: true }),
   say('Sprout', 'That\'s odd. Your wand doesn\'t seem to have been used at all.', 540, 110, { anchor: 'tc', w: 320, fixed: true }),
   say('Harry', 'It hasn\'t, actually. I only got my wand a few days ago.', 560, 860, { anchor: 'bc', w: 320, fixed: true })], { mood: 'warm' });
ep.panel(840, { cam: { on: ['sprout'], fr: 'bust', dy: -0.5 }, bg: COR, blur: 2, actors: [SP({ x: 900, expr: 'calm', pose: 'stand' })] },
  [say('Sprout', 'Then we have a clear case of accidental magic from a boy who felt threatened. And the rules plainly state that you are not to be held responsible.', 400, 64, { anchor: 'tc', w: 560, fixed: true }),
   say('Sprout', 'As for *you…*', 600, 720, { w: 240, fixed: true })], { mood: 'warm' });
ep.panel(460, { cam: { x: 1300, y: 990, w: 560 }, bg: COR, actors: R2({ nev: false, huff: false }) },
  [cap('Her eyes dropped, deliberately, to Neville\'s books lying on the floor. There was a long silence.', 44, 30, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(1060, { cam: { on: ['sprout'], fr: 'waist', dy: -0.3, zoom: 0.8 }, bg: COR, actors: [SP({ x: 900, expr: 'cross', pose: 'point' })] },
  [say('Sprout', 'Three points from Slytherin, *each.* And six from *him.*', 400, 64, { anchor: 'tc', w: 420, fixed: true }),
   shout('Sprout', 'Don\'t you *ever* meddle with my Hufflepuffs again, or my student Harry Potter either. Now *go.*', 400, 972, { anchor: 'bc', w: 400, size: 34, fixed: true })], { mood: 'warm' });
ep.panel(580, { cam: { x: 1640, y: 620, w: 1150 }, bg: COR, actors: R2({ nev: false, huff: false, h: { x: 1190, turn: 0.4, expr: 'neutral' }, s1: { x: 1600, turn: 0.8, pose: 'walk', expr: 'cross' }, s3: { x: 1750, turn: 0.8, pose: 'walk', expr: 'cross' }, d: { x: 1950, turn: 0.8, pose: 'walk', expr: 'angry' }, s2: { x: 2150, turn: 0.8, pose: 'walk', expr: 'cross' }, c: { x: 2300, turn: 0.8, pose: 'walk', expr: 'worried' } }), over: (e) => PIE_ON('derrick', 'blueberry', 0.2, 0, 0.8)(e) },
  [cap('She didn\'t have to repeat herself.', 44, 30, { w: 400, fixed: true })], { mood: 'warm', alt: 'The Slytherins walk away very quickly, the biggest still dripping pie.' });
ep.panel(660, { cam: { x: 620, y: 770, w: 740 }, bg: COR, actors: [...[0, 1, 2].map((i) => ({ def: i === 0 ? ernie : student(1341 + i, 'h'), id: i === 0 ? 'ernie' : 'h' + (i + 1), x: 350 + i * 330, y: 1000, s: 1.0, turn: i === 2 ? -0.4 : 0.4, pose: 'crouch', expr: 'warm' })), { def: nevilleHuff, id: 'neville', x: 600, y: 1000, s: 1.05, turn: 0.2, pose: 'crouch', expr: 'teary' }, () => g({}, ...[[500, 1010, -20], [730, 1020, 12]].map(([x, y, r]) => g({ transform: `translate(${x},${y}) rotate(${r})` }, rect(-40, -10, 80, 20, { fill: '#6b2433', stroke: C.ink, 'stroke-width': 2 }))))] },
  [cap('Neville went to pick up his books. He seemed to be crying, but only a little. It might have been delayed shock. Or it might have been because the other boys were helping him.', 44, 30, { w: 620, fixed: true })], { mood: 'warm', alt: 'Neville kneels to gather his books; the other Hufflepuffs crouch to help.' });
ep.panel(1000, { cam: { on: ['sprout', 'harry'], fr: 'waist', dy: -1.0 }, bg: COR, actors: [SP({ x: 1000, expr: 'warm', pose: 'stand' }), { def: harryRaven, id: 'harry', x: 1280, y: 990, s: 1.1, turn: -0.4, pose: 'stand', expr: 'shock' }] },
  [say('Sprout', 'Thank you *very* much, Harry Potter. Seven points to Ravenclaw, one for each Hufflepuff you helped protect.', 290, 50, { anchor: 'tc', w: 440, fixed: true }),
   say('Sprout', 'And I won\'t say anything more.', 200, 700, { w: 260, fixed: true }),
   cap('Harry had been expecting a lecture. And a rather severe scolding for missing his very first class.', 344, 770, { w: 330, fixed: true })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: COR, blur: 3, actors: [{ def: harryRaven, id: 'harry', x: 1280, y: 990, s: 1.1, turn: -0.4, expr: 'awe' }] },
  [inner('Harry', '*Maybe he* should *have gone to Hufflepuff. Sprout was cool.*', 400, 64, { anchor: 'tc', w: 460, fixed: true })], { mood: 'warm' });

// ---------------------------------------------------------------- the Hufflepuffs
// Neville hugging his books
const NB = { pose: 'hold', armF: { sh: 4, el: 96, hand: 'hold', prop: g({ transform: 'rotate(-10)' }, bookHeld('#6b2433')) }, armB: { sh: 10, el: 92, hand: 'hold' } };
const HUFFS = (o = {}) => [
  { def: ernie, id: 'ernie', x: 800, y: 1000, s: 1.0, turn: 0.5, expr: 'awe', ...(o.e || {}) },
  ...[1, 2, 3].map((i) => ({ def: student(1340 + i, 'h'), id: 'h' + i, x: 520 + i * 100 - (i === 3 ? 700 : 0) - (o.apart && i < 3 ? 260 : 0), y: 980, s: 0.95, turn: 0.4, expr: 'awe' })),
  { def: nevilleHuff, id: 'neville', x: 600, y: 1010, s: 1.05, turn: 0.4, expr: 'worried', ...(o.n || {}) },
  { def: harryRaven, id: 'harry', x: 1150, y: 990, s: 1.1, turn: -0.4, pose: 'stand', expr: 'smug', ...(o.h || {}) },
];
ep.panel(1000, { cam: { x: 975, y: 609, w: 650 }, bg: COR, actors: HUFFS({ e: { pose: 'gesture' } }) },
  [whisper('Ernie', 'How did you *do* that?', 230, 40, { anchor: 'tc', w: 280, fixed: true }),
   say('Harry', 'I can make anything I want happen just by snapping my fingers.', 545, 140, { anchor: 'tc', w: 360, fixed: true }),
   say('Ernie', '*Really?*', 200, 310, { anchor: 'tc', w: 180, fixed: true }),
   say('Harry', 'No.', 620, 380, { anchor: 'tc', w: 120, fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: COR, blur: 2, actors: HUFFS({ h: { expr: 'grin', pose: 'gesture' } }) },
  [say('Harry', 'But when you\'re telling everyone this story, be sure to share it with Hermione Granger in first-year Ravenclaw. She has an anecdote you might find amusing.', 400, 64, { anchor: 'tc', w: 560, fixed: true }),
   cap('He had absolutely no clue what was happening. But he wasn\'t about to pass up an opportunity to add to his growing legend.', 44, 700, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { x: 975, y: 609, w: 650 }, bg: COR, actors: HUFFS({ e: { pose: 'shrug', expr: 'worried' }, h: { expr: 'think' } }) },
  [say('Harry', 'Oh, and what was all that about the Killing Curse?', 550, 40, { anchor: 'tc', w: 340, fixed: true }),
   say('Ernie', 'You really don\'t know?', 210, 190, { anchor: 'tc', w: 260, fixed: true }),
   whisper('Ernie', 'The words to the Killing Curse are… *Avada Kedavra.*', 290, 350, { anchor: 'tc', w: 340, fixed: true })], { mood: 'warm', alt: 'Ernie whispers, holding his empty hands well away from his sides.' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: COR, blur: 3, actors: HUFFS({ h: { expr: 'deadpan' } }) },
  [inner('Harry', '*Well of* course *they are.*', 400, 64, { anchor: 'tc', w: 360, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['dad'], fr: 'bust', dy: -0.5 }, bg: () => rect(-500, -500, 3000, 2000, { fill: '#c9b48a' }), actors: [{ def: dad, id: 'dad', x: 900, y: 1000, turn: 0.2, expr: 'unimpressed', pose: 'crossArms' }], over: (e) => FX.memoryEdge(e.w, e.h) },
  [cap('Harry added it to his growing list of things never to tell his father. It was bad enough being the only person to survive the fearsome Killing Curse, without admitting that the Killing Curse was "Abracadabra".', 44, 30, { w: 620, fixed: true })], { mood: 'sepia', alt: 'Imagined: Dad\'s face, if he ever found out.' });
ep.panel(900, { cam: { x: 990, y: 640, w: 600 }, bg: COR, actors: HUFFS({ e: { x: 900, pose: 'stand', expr: 'smile', armB: { sh: 55, el: 10, hand: 'open' } }, h: { x: 1100, pose: 'stand', expr: 'smile', armB: { sh: 50, el: 10, hand: 'open' } } }) },
  [say('Ernie', 'I\'m Ernie Macmillan. Honoured to meet you.', 225, 44, { anchor: 'tc', w: 270, fixed: true }),
   say('Harry', 'Pleased to meet you. Skip the honoured thing.', 560, 170, { anchor: 'tc', w: 320, fixed: true }),
   cap('Then the other boys crowded round, and there was a sudden flood of introductions.', 44, 760, { w: 560, fixed: true })], { mood: 'warm' });

// ---------------------------------------------------------------- the apology
ep.panel(900, { cam: { x: 975, y: 609, w: 650 }, bg: COR, actors: HUFFS({ apart: true, h: { expr: 'worried', pose: 'stand' }, n: { x: 800, expr: 'worried', pose: 'cower' }, e: { x: 500 } }) },
  [say('Harry', 'Um… if everyone would excuse me… I have something to say to Neville.', 555, 40, { anchor: 'tc', w: 360, fixed: true }),
   whisper('Neville', 'I suppose you\'re going to say I should\'ve been braver…', 250, 250, { anchor: 'tc', w: 340, fixed: true })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: COR, blur: 2, actors: HUFFS({ apart: true, h: { expr: 'flustered', pose: 'gesture' } }) },
  [say('Harry', 'Oh, no, nothing like that! It\'s just, um, something the Sorting Hat told me…', 400, 64, { anchor: 'tc', w: 520, fixed: true })], { mood: 'warm' });
ep.panel(600, { cam: { on: ['harry'], fr: 'close', dy: 0.2 }, bg: COR, blur: 3, actors: HUFFS({ apart: true, h: { expr: 'pained' } }) },
  [cap('Something seemed to be blocking Harry\'s throat. As though he\'d swallowed a large brick, and it was stuck.', 44, 30, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(640, { cam: { on: ['harry'], fr: 'close', zoom: 0.8, dy: -0.25 }, bg: COR, blur: 2, actors: HUFFS({ apart: true, h: { expr: 'hurt' } }) },
  [say('Harry', 'I\'m, sor, ry.', 400, 44, { anchor: 'tc', w: 260, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { x: 985, y: 615, w: 520 }, bg: COR, actors: HUFFS({ apart: true, h: { x: 1110, expr: 'sad' }, n: { x: 860, expr: 'teary', ...NB }, e: { x: 480 } }) },
  [say('Harry', 'For what I did the other day. You don\'t have to be gracious about it or anything. I\'ll understand if you just hate me. This isn\'t about me trying to look cool. What I did was wrong.', 400, 50, { anchor: 'tc', w: 540, fixed: true })], { mood: 'warm', alt: 'Harry, head down, apologises to Neville, who clutches his books.' });
ep.panel(820, { cam: { on: ['neville'], fr: 'bust', dy: -0.2, zoom: 0.9 }, bg: COR, blur: 2, actors: HUFFS({ apart: true, e: { x: 480 }, n: { x: 800, expr: 'teary', ...NB } }) },
  [say('Neville', 'Why did you do it?', 200, 50, { anchor: 'tc', w: 200, fixed: true }),
   say('Neville', 'Why does *everyone* do that to me, even the Boy-Who-Lived?', 530, 110, { anchor: 'tc', w: 380, fixed: true })], { mood: 'warm', alt: 'Neville clutches his books to his chest, blinking back tears.' });
ep.panel(560, { cam: { x: 1100, y: 620, w: 1400 }, bg: COR, actors: HUFFS({ apart: true, h: { expr: 'sad' }, n: { x: 800, expr: 'teary', ...NB } }) },
  [cap('Harry suddenly felt smaller than he ever had in his life.', 44, 30, { w: 640, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.55 }, bg: COR, blur: 2, actors: HUFFS({ apart: true, h: { expr: 'hurt', pose: 'gesture' } }) },
  [say('Harry', 'I\'m sorry. It\'s just… you looked so scared, it was like there was a sign over your head saying *victim.* And I wanted to show you that things *don\'t* always turn out badly. That sometimes the monsters give you chocolate…', 400, 62, { anchor: 'tc', w: 500, fixed: true })], { mood: 'warm' });
ep.panel(620, { cam: { on: ['neville'], fr: 'close' }, bg: COR, blur: 3, actors: HUFFS({ apart: true, e: { x: 480 }, n: { x: 800, expr: 'cry' } }) },
  [whisper('Neville', 'But there *is.* You saw it today. There *is!*', 400, 64, { anchor: 'tc', w: 420, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['harry'], fr: 'bust', dy: -0.5 }, bg: COR, blur: 2, actors: HUFFS({ apart: true, h: { expr: 'sad' } }) },
  [say('Harry', 'They wouldn\'t have done anything really bad in front of witnesses. Their main weapon is fear. I wanted to make you less afraid. Or that was what I told myself.', 400, 50, { anchor: 'tc', w: 520, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['neville'], fr: 'bust', dy: -0.4 }, bg: COR, blur: 2, actors: HUFFS({ apart: true, e: { x: 480 }, n: { x: 800, expr: 'teary', ...NB } }) },
  [say('Harry', 'But the Sorting Hat told me I was lying to myself, and that I really did it because it was *fun.* So that\'s why I\'m apologising.', 400, 50, { anchor: 'tc', w: 520, fixed: true })], { mood: 'warm', alt: 'Neville listens, eyes wet.' });
ep.panel(760, { cam: { on: ['neville'], fr: 'bust', dy: -0.45 }, bg: COR, blur: 2, actors: HUFFS({ apart: true, e: { x: 480 }, n: { x: 800, expr: 'hurt', ...NB } }) },
  [say('Neville', 'You hurt me. Just now. When you grabbed me and pulled me away from them.', 400, 50, { anchor: 'tc', w: 460, fixed: true })], { mood: 'warm' });
ep.panel(800, { cam: { x: 990, y: 650, w: 500 }, bg: COR, actors: HUFFS({ apart: true, e: { x: 480 }, h: { x: 1120, expr: 'sad', turn: -0.3 }, n: { x: 860, expr: 'hurt', pose: 'present', armB: { sh: 70, el: 15, hand: 'open' } } }) },
  [say('Neville', 'I might have a bruise here later, from how hard you pulled. You hurt me worse than anything the Slytherins did, actually.', 400, 50, { anchor: 'tc', w: 520, fixed: true })], { mood: 'warm', alt: 'Neville holds out his arm, where Harry grabbed him. Harry looks at it.' });
ep.panel(900, { cam: { x: 965, y: 616, w: 600 }, bg: COR, actors: HUFFS({ apart: true, e: { x: 960, expr: 'angry', pose: 'fists', turn: -0.5 }, n: { x: 760, expr: 'hurt', ...NB }, h: { x: 1170, expr: 'sad', turn: -0.4 } }) },
  [whisper('Ernie', '*Neville!* He was trying to *save* you!', 400, 40, { anchor: 'tc', w: 320, fixed: true }),
   whisper('Harry', 'I\'m sorry. When I saw that I just got… really angry…', 575, 250, { anchor: 'tc', w: 300, fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: { on: ['neville'], fr: 'bust', dy: -0.35 }, bg: COR, blur: 2, actors: HUFFS({ apart: true, e: { x: 480 }, n: { x: 800, expr: { base: 'calm', mouth: { type: 'flat' } }, ...NB } }) },
  [say('Neville', 'So you yanked me out really hard, and put yourself in where I was, and went, "Hello, I\'m the Boy-Who-Lived."', 400, 64, { anchor: 'tc', w: 520, fixed: true })], { mood: 'warm', alt: 'Neville looks at him steadily.' });
ep.panel(480, { cam: { on: ['harry'], fr: 'close', dy: -0.1 }, bg: COR, blur: 3, actors: HUFFS({ apart: true, h: { expr: { base: 'sad', eyes: { lookY: 0.6 } } } }) },
  [cap('Harry nodded.', 44, 30, { w: 200, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['neville'], fr: 'close', dy: 0.1 }, bg: COR, blur: 3, actors: HUFFS({ apart: true, e: { x: 480 }, n: { x: 800, expr: { base: 'calm', eyes: { lookX: 0.3 } } } }) },
  [say('Neville', 'I think you\'re going to be really cool some day.', 400, 64, { anchor: 'tc', w: 460, fixed: true })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['neville'], fr: 'close', dx: 0.55, dy: 0.05, zoom: 0.95 }, bg: COR, blur: 3, actors: HUFFS({ apart: true, e: { x: 480 }, n: { x: 800, expr: { base: 'sad', eyes: { lookX: 0.3 } } } }) },
  [say('Neville', 'But right now, you\'re not.', 590, 520, { w: 240, fixed: true })], { mood: 'warm' });
ep.bleed(900, { cam: { x: 1100, y: 470, w: 1400 }, bg: () => CS.corridor({ seed: 17, windows: [100, 1100, 2100], torches: [600, 1600] }), actors: [{ def: harryRaven, id: 'harry', x: 1500, y: 900, s: 1.1, turn: 0.8, pose: 'walk', expr: 'blank' }] },
  [cap('Harry swallowed the sudden knot in his throat, and walked away.', 44, 40, { w: 560, fixed: true })], { alt: 'A long, empty corridor. A small figure walking away down it.' });

// ---------------------------------------------------------------- walking blindly
const WALK = () => CS.corridor({ seed: 19, windows: [300, 1400], torches: [900] });
const HW = (o = {}) => ({ def: harryRaven, id: 'harry', x: 900, y: 900, s: 1.1, turn: 0.4, pose: 'walk', expr: 'think', ...o });
ep.panel(1080, { cam: { on: ['harry'], fr: 'waist', dy: -0.35 }, bg: WALK, blur: 2, actors: [HW()] },
  [inner('Harry', '*What was he* supposed *to do here? Never get angry? He wasn\'t sure he could have done anything without being angry. And who knew what would have happened to Neville then?*', 400, 64, { anchor: 'tc', w: 580, fixed: true }),
   inner('Harry', '*He\'d read enough fantasy books to know how this one went. He\'d try to suppress the anger, and fail, and at the end of a long journey of self-discovery he\'d learn that it was a part of him. Fine. He\'d skip the journey and go straight to the end.*', 400, 1030, { anchor: 'bc', w: 580, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['harry'], fr: 'close', dy: 0.2 }, bg: WALK, blur: 3, actors: [HW({ expr: 'worried' })], over: (e) => FX.frost(e.w, e.h, 0.18, 55) },
  [inner('Harry', '*The trouble was that he didn\'t* feel *out of control when he was angry. The cold made him feel* in *control.*', 400, 50, { anchor: 'tc', w: 610, fixed: true }),
   inner('Harry', '*It was only when he looked back that everything seemed to have blown up.*', 400, 780, { anchor: 'bc', w: 520, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: WALK, blur: 2, actors: [HW({ pose: 'chin', expr: 'suspicious' })] },
  [inner('Harry', '*Had the Game Controller sent Professor Sprout? The note had threatened the Game Authorities, and there she was. Maybe Sprout* was *the Game Controller. The Head of Hufflepuff would be the* last *person anyone would suspect.*', 400, 64, { anchor: 'tc', w: 580, fixed: true }),
   say('Harry', 'So how am I doing in the game?', 400, 830, { anchor: 'bc', w: 360, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['harry'], fr: 'waist', dy: -0.6 }, bg: WALK, actors: [HW({ pose: 'stand', turn: -0.6, expr: 'shock' }), (e) => { const a = e.wa.harry; return path(`M${a.head[0] - 200},${a.head[1] - 30} q140,-150 300,-95`, { fill: 'none', stroke: '#8a7a6a', 'stroke-width': 2.5, 'stroke-dasharray': '7 7' }) + g({ transform: `translate(${a.head[0] + 95},${a.head[1] - 118}) rotate(-20)` }, P2.slip(76, 52, { lines: 3 })); }] },
  [cap('A sheet of paper flew over his head, as if someone had thrown it from behind him. Harry spun around. There was no-one there.', 44, 30, { w: 620, fixed: true })], { mood: 'warm', alt: 'A note sails over Harry\'s head from nowhere.' });
ep.panel(820, { cam: { x: 400, y: 560, w: 800 }, bg: () => CS.corridor({ seed: 19 }) },
  [note('Points for style: 10\nPoints for good thinking: −3,000,000\nRavenclaw House points bonus: 70\n\nCurrent points: −2,999,871\nTurns remaining: 2', 400, 410, { w: 580, rot: -1.5 })], { mood: 'warm', alt: 'The note.' });
ep.panel(1200, { cam: { on: ['harry'], fr: 'waist', dy: -0.15, zoom: 0.8 }, bg: WALK, actors: [HW({ pose: 'armsUp', turn: 0.1, expr: 'rant' })] },
  [shout('Harry', '*Minus three million points?* That seems excessive! I want to file an appeal with the Game Authorities!', 400, 80, { anchor: 'tc', w: 420, size: 34, fixed: true }),
   shout('Harry', 'And how am I supposed to make up three million points in the next two turns?', 400, 1130, { anchor: 'bc', w: 400, size: 34, fixed: true })], { mood: 'warm', alt: 'Harry shouting at the empty hallway.' });
ep.panel(780, { cam: { x: 400, y: 560, w: 800 }, bg: () => CS.corridor({ seed: 19 }) },
  [note('Appeal: Failed\n\nAsking the wrong questions:\n−1,000,000,000,000 points\n\nCurrent points: −1,000,002,999,871\nTurns remaining: 1', 400, 390, { w: 580, rot: 2 })], { mood: 'warm', alt: 'Another note.' });
ep.panel(840, { cam: { on: ['harry'], fr: 'bust', dy: -0.3, zoom: 0.85 }, bg: WALK, blur: 2, actors: [HW({ pose: 'shrug', turn: 0.1, expr: 'deadpan' })] },
  [cap('Harry gave up. With one turn remaining, all he could do was take his best shot.', 44, 30, { w: 560, fixed: true }),
   say('Harry', 'My guess is that the game represents life.', 400, 800, { anchor: 'bc', w: 380, fixed: true })], { mood: 'warm' });
ep.bleed(1320, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#2a1c14' }) + K.floorboards(0, 0, ctx.w, ctx.h, '#3a2a1e', 5),
  [note('Attempt failed\n\nFailed Failed Failed\n\n**Aiiiiiiiiiieeeeeeeeeeeeee**\n\nCurrent points: minus Infinity\n\n**You have lost the game**\n\nFinal instruction:', 400, 560, { w: 560, rot: -1 }),
   note('go to Professor McGonagall\'s office', 420, 1070, { kind: 'hand', w: 540, rot: -1 })],
  { alt: 'The final note: "You have lost the game." And under it, in his own handwriting: go to Professor McGonagall\'s office.' });
ep.panel(520, { cam: { on: ['harry'], fr: 'close' }, bg: WALK, blur: 3, actors: [HW({ expr: 'blank' })] },
  [cap('The last line was in his own handwriting.', 44, 30, { w: 460, fixed: true })], { mood: 'warm' });
ep.panel(1100, { cam: { x: 1590, y: 510, w: 620 }, bg: () => CS.corridor({ seed: 23, windows: [2300], torches: [1200] }) + K.door(1540, 400, 260, 500, '#4a2e1b') + rect(1580, 330, 180, 50, { fill: '#b08d45', stroke: C.ink, 'stroke-width': 2 }) + text(1670, 364, 'Prof. M. McGonagall', { 'font-family': 'IM Fell English', 'font-size': 20, 'text-anchor': 'middle', fill: '#2a1b14' }),
    actors: [{ def: harryRaven, id: 'harry', x: 1450, y: 910, s: 1.1, turn: 0.6, pose: 'raiseHand', armB: { sh: 105, el: 40, hand: 'fist' }, expr: 'worried' }] },
  [inner('Harry', '*If* she *was the Game Controller…*', 400, 36, { anchor: 'tc', w: 400, fixed: true }),
   inner('Harry', '*Harry had absolutely no idea how he would feel about that. His mind was drawing a complete blank. It was, literally, unimaginable.*', 400, 120, { anchor: 'tc', w: 540, fixed: true }),
   sfx('knock knock', 560, 640, { size: 50, rot: -6, font: "'Caveat', cursive" })], { mood: 'warm', alt: 'Harry outside Professor McGonagall\'s office door, raising his hand to knock.' });
ep.panel(560, { cam: { x: 1670, y: 640, w: 500 }, bg: () => CS.corridor({ seed: 23, windows: [2300], torches: [1200] }) + K.door(1540, 400, 260, 500, '#4a2e1b') },
  [say('McGonagall', 'Come in.', 400, 64, { anchor: 'tc', w: 220, fixed: true, noTail: true })], { mood: 'warm', alt: 'The closed door.' });
ep.end();
export default ep;
