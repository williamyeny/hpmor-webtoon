// EPISODE 18 — Do Not Mess With Time  (source: HPMOR ch. 17, first half)
// A brilliant experiment gets the scariest result in science. Harry wins in public with the Time-Turner,
// and McGonagall names his flaw: "Then you should have picked wrestling!"
import { Episode, say, shout, whisper, inner, cold, cap, capC, plain, title, sfx, M } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as CS from '../engine/bg/castle.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { mcgonagall, student } from '../engine/chars/cast.js';
import { place } from '../engine/chars/rig.js';
import { harryRaven, harryPJ, anthony, terry, michael, nevilleHuff, ernie, dracoSly, crabbe, goyle, zabini, dean, hooch } from '../engine/chars/cast2.js';
import { healerKit, wand, pouch } from '../engine/props/props.js';
import * as P2 from '../engine/props/props2.js';
import { dayBeat, header, note } from './b2.js';

const ep = new Episode({ id: 'ep18', number: 18, title: 'Do Not Mess With Time' });
ep.setBg(C.paper);
header(ep, 'EIGHTEEN', 'Do Not Mess With Time');
dayBeat(ep, 'Thursday.', 'If you wanted to be specific, 7:24 on Thursday morning.');

const PENCIL = (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#f3ead3' }) + [...Array(Math.ceil(ctx.h / 34)).keys()].map((k) => line(0, 20 + k * 34, ctx.w, 20 + k * 34, { stroke: '#b9c8d8', 'stroke-width': 1.4 })).join('') + line(70, 0, 70, ctx.h, { stroke: '#e2a0a0', 'stroke-width': 2 });
const PT = (x, y, s, fs = 34, col = '#2d2a4a', a = 'middle') => text(x, y, s, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, fill: col, 'text-anchor': a });
const DORM = (o = {}) => () => CS.ravenclawDorm({ time: 'morning', ...o });

// ---------------------------------------------------------------- the brilliant experiment
ep.panel(900, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: DORM(), blur: 2, actors: [{ def: harryRaven, id: 'harry', x: 1100, y: 1000, s: 1.1, turn: 0.1, pose: 'stand', expr: { base: 'shock', eyes: { sparkle: true } } }] },
  [cap('Harry was sitting on his bed, a textbook lying limp in his hands. He had just had an idea for a *truly brilliant* experimental test.', 44, 30, { w: 620, fixed: true }),
   cap('It absolutely positively had to be tested right away. Immediately. Now.', 44, 780, { w: 560, fixed: true })], { mood: 'warm' });
const PRIMES = g({ transform: 'rotate(-8)' }, P2.slip(90, 120, { lines: 5 }));
ep.panel(1060, { cam: { on: ['anthony', 'harry'], fr: 'waist', dy: -1.2 }, bg: DORM(), actors: [{ def: anthony, id: 'anthony', x: 820, y: 1000, s: 1.05, turn: 0.4, pose: 'stand', expr: 'deadpan' }, { def: harryRaven, id: 'harry', x: 1130, y: 1000, s: 1.1, turn: -0.4, pose: 'present', expr: 'bigGrin', armB: { sh: 70, el: 30, hand: 'hold', prop: PRIMES } }] },
  [say('Harry', 'Excuse me, can you do something for me? Pick two three-digit numbers from this list of primes. Don\'t tell me what they are. Just multiply them together and tell me the product.', 400, 56, { anchor: 'tc', w: 520, fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: { on: ['harry'], fr: 'bust', dy: -0.55 }, bg: DORM(), blur: 2, actors: [{ def: harryRaven, id: 'harry', x: 1130, y: 1000, s: 1.1, turn: -0.2, pose: 'present', expr: { base: 'grin', eyes: { sparkle: true } }, armB: { sh: 70, el: 30, hand: 'hold', prop: PRIMES } }] },
  [say('Harry', 'Oh, and do the calculation twice to double-check? Please make *really* sure. I\'m not sure what\'s going to happen to me or the universe if you make a multiplication error.', 400, 56, { anchor: 'tc', w: 560, fixed: true }),
   cap('It said a lot about life in that dorm that Anthony Goldstein didn\'t even ask.', 44, 764, { w: 600, fixed: true })], { mood: 'warm' });
ep.panel(640, { cam: { on: ['anthony'], fr: 'close' }, bg: DORM(), blur: 3, actors: [{ def: anthony, id: 'anthony', x: 820, y: 1000, s: 1.05, turn: 0.3, expr: 'deadpan' }] },
  [say('Anthony', 'One hundred and eighty-one thousand, four hundred and twenty-nine.', 400, 56, { anchor: 'tc', w: 480, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { x: 1520, y: 640, w: 800 }, bg: () => CS.trunkCavern(), actors: [{ def: harryRaven, id: 'harry', x: 1330, y: 990, s: 1.1, turn: 0.3, pose: 'sitFloor', expr: { base: 'wince', eyes: { open: 0 } } }] },
  [cap('Harry raced down into the cavern level of his trunk, checked his watch, and shut his eyes. Around thirty seconds later, he heard footsteps. Then the sound of the trunk lid sliding shut.', 44, 30, { w: 620, fixed: true }),
   sfx('tap tap tap', 590, 400, { size: 40, rot: -40, font: "'Caveat', cursive" }), sfx('shhk', 700, 240, { size: 36, rot: 4, font: "'Caveat', cursive" })], { mood: 'candle', alt: 'Harry sits on the floor of his trunk\'s cavern level, eyes squeezed shut. Footsteps. Something set down. Footsteps leaving.' });
// the folded note lying on the floorboards, in perspective
const FLOORNOTE = () => g({ transform: 'translate(1000,1040) scale(1.5)' }, ellipse(4, 16, 110, 22, { fill: '#1a0e06', opacity: 0.35 }), path('M-96,-8 L-6,-22 L0,22 L-86,30Z', { fill: '#efe5cc', stroke: C.ink, 'stroke-width': 2 }), path('M-6,-22 L92,-14 L98,26 L0,22Z', { fill: '#f8f1de', stroke: C.ink, 'stroke-width': 2 }), line(-6, -22, 0, 22, { stroke: '#b9a882', 'stroke-width': 2 }));
ep.panel(700, { cam: { x: 1000, y: 960, w: 660 }, bg: () => CS.trunkCavern(), actors: [FLOORNOTE] },
  [cap('When he opened his eyes, he saw just what he\'d been hoping to see: a folded piece of paper on the floor. The gift of his future self.', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
// the algorithm, as a pencil flowchart on lined paper (boxes in tile coords, text as lettering)
const PBOX = (cx, cy, w, h, seed) => { const R = rng(seed); const j = () => R.range(-3, 3); const d = (o) => `M${cx - w / 2 + j() + o},${cy - h / 2 + j()} L${cx + w / 2 + j()},${cy - h / 2 + j() + o} L${cx + w / 2 + j() - o},${cy + h / 2 + j()} L${cx - w / 2 + j()},${cy + h / 2 + j() - o}Z`; return path(d(0), { fill: 'rgba(255,255,255,0.35)', stroke: '#4a4858', 'stroke-width': 2.4, 'stroke-linejoin': 'round' }) + path(d(3), { fill: 'none', stroke: '#4a4858', 'stroke-width': 1.2, opacity: 0.6 }); };
const PARROW = (x1, y1, x2, y2) => { const a = Math.atan2(y2 - y1, x2 - x1), k = 16; return path(`M${x1},${y1} L${x2},${y2} M${x2 - k * Math.cos(a - 0.45)},${y2 - k * Math.sin(a - 0.45)} L${x2},${y2} L${x2 - k * Math.cos(a + 0.45)},${y2 - k * Math.sin(a + 0.45)}`, { fill: 'none', stroke: '#4a4858', 'stroke-width': 2.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); };
const FLOW = (ctx) => PENCIL(ctx) + g({ transform: 'translate(-24,-18)' },
  PBOX(400, 190, 560, 110, 1), PARROW(400, 250, 400, 296),
  PBOX(400, 340, 560, 80, 2), PARROW(300, 384, 220, 444), PARROW(500, 384, 580, 444),
  PBOX(210, 530, 340, 160, 3), PBOX(590, 530, 340, 160, 4),
  PARROW(210, 614, 320, 680), PARROW(590, 614, 480, 680),
  PBOX(400, 750, 600, 120, 5));
const FT = (t, x, y, w) => plain(t, x, y, { w, fixed: true, font: "'Caveat', cursive", size: 36, weight: 700, color: '#2d2a4a' });
ep.panel(1160, FLOW,
  [cap('The algorithm:', 44, 30, { w: 240, fixed: true }),
   FT('If the paper is blank: write "101 × 101" on it.', 400, 190, 500),
   FT('If it has two numbers: multiply them.', 400, 340, 520),
   FT('If the product is 181,429: copy them out, send them back.', 210, 530, 290),
   FT('If not: try the next pair. Send that back.', 590, 530, 290),
   FT('When I\'m done: go back in time an hour, and drop off the paper.', 400, 750, 540),
   cap('So the only possible *stable* time loop was the one in which the paper already held the answer. If this worked, he could find any answer that was hard to find but easy to check. Combination locks. Passwords. Maybe even the entrance to the Chamber of Secrets.', 44, 860, { w: 620, fixed: true })], { alt: 'Harry\'s pencil algorithm for a time loop that factors a number, drawn as a flowchart.' });
// trembling-hand marks around a hand anchor
// SHAKE('handF', dx) centres the marks on Harry's hand (shifted dx); SHAKE(x, y) on a fixed point
const SHAKE = (x0, y0, k = 1) => (e) => { let x = x0, y = y0; if (typeof x0 === 'string') { const p = e.anchors.harry[x0]; x = p[0] + (y0 || 0); y = p[1]; } return SHAKE0(x, y, k); };
const SHAKE0 = (x, y, k = 1) => [-1, 1].map((d) => path(`M${x + d * 120 * k},${y - 40 * k} q${d * 14 * k},${34 * k} 0,${68 * k} M${x + d * 146 * k},${y - 24 * k} q${d * 10 * k},${22 * k} 0,${44 * k}`, { fill: 'none', stroke: '#f3e6c4', 'stroke-width': 4, 'stroke-linecap': 'round' })).join('');
ep.panel(760, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: () => CS.trunkCavern(), blur: 2, actors: [{ def: harryRaven, id: 'harry', x: 900, y: 900, s: 1.1, turn: 0.1, pose: 'hold', expr: 'hopeful', armF: { sh: 30, el: 90, hand: 'hold', prop: P2.slip(70, 50, {}) } }], over: SHAKE('handF') },
  [cap('Harry took the paper in his trembling hand, and unfolded it.', 44, 30, { w: 560, fixed: true })], { mood: 'candle' });
ep.bleed(960, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#2a1c14' }) + g({ transform: `translate(${ctx.w / 2},${ctx.h / 2}) rotate(-3)` }, P2.slip(560, 380, {})),
  [{ type: 'plain', text: 'DO NOT MESS WITH TIME', x: 400, y: 480, w: 520, fixed: true, font: "'Caveat', cursive", size: 76, color: '#2d2a4a', rot: -5 }],
  { alt: 'The paper says, in slightly shaky handwriting: DO NOT MESS WITH TIME.' });
ep.panel(1150, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: () => CS.trunkCavern(), blur: 2, actors: [{ def: harryRaven, id: 'harry', x: 900, y: 900, s: 1.1, turn: 0.1, pose: 'hold', expr: 'horror', armF: { sh: 30, el: 80, hand: 'hold', prop: g({ transform: 'rotate(-6)' }, P2.slip(60, 40, {})) } }], over: SHAKE('handF') },
  [cap('Harry wrote down "DO NOT MESS WITH TIME" on a fresh piece of paper, in slightly shaky handwriting, and folded it neatly.', 44, 30, { w: 620, fixed: true }),
   cap('He resolved not to do any more truly brilliant experiments on Time until he was at least fifteen. To the best of his knowledge, it had been the scariest experimental result in the entire history of science.', 44, 900, { w: 620, fixed: true })], { mood: 'candle' });

// ---------------------------------------------------------------- flying
dayBeat(ep, 'Thursday.', 'If you wanted to be specific, 3:32 on Thursday afternoon.', { h: 260 });
const FIELD = (o = {}) => () => CS.flyingField(o);
const HO = (o = {}) => ({ def: hooch, id: 'hooch', x: 600, y: 900, turn: 0.4, pose: 'lecture', expr: 'stern', ...o });
const BOY = (def, id, x, o = {}) => ({ def, id, x, y: 960, s: 1.05, turn: -0.3, pose: 'stand', expr: 'neutral', ...o });
const BROOMS = (xs) => () => xs.map((x) => g({ transform: `translate(${x},975) scale(0.95)` }, P2.broom(0.5))).join('');
const LINEUP = (o = {}) => [HO(o.hooch), BROOMS([1080, 1280, 1480, 1680, 1880, 2080]), BOY(nevilleHuff, 'neville', 1100, o.n), BOY(ernie, 'ernie', 1300, o.e), BOY(harryRaven, 'harry', 1500, { s: 1.1, ...(o.h || {}) }), BOY(dracoSly, 'draco', 1700, o.d), BOY(goyle, 'goyle', 1900, o.go), BOY(crabbe, 'crabbe', 2100, o.cr)];
ep.bleed(880, { cam: { x: 1330, y: 760, w: 1360 }, bg: FIELD({ brooms: 0 }), actors: LINEUP({ hooch: { x: 770, y: 960 } }) },
  [cap('All the first-year boys, out on a grassy field with Madam Hooch, standing next to the Hogwarts supply of broomsticks. (For some reason, the girls learned separately.)', 44, 40, { w: 620, fixed: true }),
   cap('It was a clear day, with a brilliant sun just begging to get in your eyes. The ground was nice and dry. It felt very, very hard.', 44, 850, { anchor: 'bl', w: 620, fixed: true })], { alt: 'A bright field. A row of first-year boys beside broomsticks on the grass. Madam Hooch, grey-haired, yellow-eyed.' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: FIELD(), blur: 2, actors: LINEUP({ h: { expr: 'suspicious' } }) },
  [inner('Harry', '*Broomsticks? Seriously? He was going to fly on, basically, a* line segment? *Wasn\'t that the single most unstable shape you could possibly find? There was no way the optimal designs for cleaning kitchens and for flying happened to coincide.*', 400, 64, { anchor: 'tc', w: 600, fixed: true })], { mood: 'day' });
ep.panel(740, { cam: { x: 1250, y: 470, w: 1300 }, bg: FIELD(), actors: LINEUP({ hooch: { x: 700, y: 960, pose: 'point', turn: 0.5 }, h: { pose: 'reach', expr: 'determined', armB: { sh: 70, el: 10, hand: 'open' } }, n: { pose: 'reach' }, e: { pose: 'reach' }, d: { pose: 'reach' } }) },
  [say('Hooch', 'Stick out your right hand over the broom, and say, *Up!*', 300, 48, { anchor: 'tc', w: 380, fixed: true }),
   shout('Boys', '*UP!*', 580, 330, { w: 180, fixed: true, noTail: true })], { mood: 'day' });
ep.panel(1000, { cam: { x: 1500, y: 640, w: 880 }, bg: FIELD(), actors: LINEUP({ h: { pose: 'holdUp', turn: -0.2, expr: 'bigGrin', armB: { sh: 140, el: -20, hand: 'hold', prop: g({ transform: 'rotate(30)' }, P2.broom(0.8)) } }, n: { expr: 'worried' }, e: { expr: 'confused' }, d: { expr: 'cross' } }) },
  [cap('The broomstick leapt eagerly into Harry\'s hand. Which put him at the head of the class, for once. Most of the other brooms were rolling around on the ground, or trying to inch away from their would-be riders.', 44, 30, { w: 620, fixed: true }),
   inner('Harry', '*(If it turned out to be* broomstick riding *he could beat Hermione at, instead of anything intellectual, Harry would just die.)*', 400, 966, { anchor: 'bc', w: 600, fixed: true })], { mood: 'day' });
ep.panel(800, { cam: { x: 1220, y: 520, w: 1250 }, bg: FIELD(), actors: [HO({ pose: 'point', x: 680, y: 960 }), ...LINEUP({ n: { pose: 'sit', seat: 60, expr: 'worried' }, e: { pose: 'sit', seat: 60 }, h: { pose: 'sit', seat: 60, expr: 'wince' }, d: { pose: 'sit', seat: 60, expr: 'smug' }, go: { pose: 'sit', seat: 60 }, cr: { pose: 'sit', seat: 60 } }).slice(2), ...['neville', 'ernie', 'harry', 'draco', 'goyle', 'crabbe'].map((id) => CS.broomUnder(id, 60, 0, 0.9))] },
  [say('Hooch', 'When I blow my whistle, you kick off from the ground, hard. Rise a few feet, then come straight back down by leaning forwards slightly. On my whistle—three—two—', 420, 60, { anchor: 'tc', w: 520, fixed: true })], { mood: 'day' });
// Neville
// motion ghosts: faint copies of a spinning actor at other angles
const GHOST = (a, rots, op = 0.22) => rots.map((r) => () => g({ opacity: op }, String(place(a.def, { ...a, rot: r })))) ;
ep.bleed(1200, { cam: { x: 1100, y: -160, w: 900 }, bg: FIELD(), actors: [...GHOST({ def: nevilleHuff, x: 1100, y: -120, s: 1.05, turn: 0.2, pose: 'panic', expr: 'horror' }, [-30, 110]), { def: nevilleHuff, id: 'neville', x: 1100, y: -120, s: 1.05, turn: 0.2, pose: 'panic', expr: 'horror', rot: 40 }, CS.broomUnder('neville', 60, 60, 0.9)], behind: (e) => FX.speedLines(e.w, e.h, { n: 34, angle: 90 }) },
  [cap('One of the brooms shot skyward, before the whistle. Its rider was screaming. Of horror, not delight. He was spinning at an awful rate, and they only got glimpses of his white face…', 44, 40, { w: 620, fixed: true }),
   shout('Neville', 'Aaaaaaaa!', 230, 820, { w: 260, fixed: true })], { alt: 'A broom rockets skyward with a small boy clinging to it, spinning.' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'waist', dy: -0.2 }, bg: FIELD(), actors: [{ def: harryRaven, id: 'harry', x: 1500, y: 960, s: 1.1, turn: 0, pose: 'wandUp', expr: 'yell', armB: WAND_UP() }], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.3, { n: 20, op: 0.15 }) },
  [inner('Harry', '*If there is any hidden power in me, let it reveal itself now!*', 400, 64, { anchor: 'tc', w: 460, fixed: true }),
   shout('Harry', '*Wingardium Leviosa!*', 400, 940, { anchor: 'bc', w: 360, fixed: true })], { mood: 'day' });
function WAND_UP() { return { sh: 160, el: 0, hand: 'hold', prop: wand(110) }; }
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: FIELD(), blur: 3, actors: [{ def: harryRaven, id: 'harry', x: 1500, y: 960, s: 1.1, turn: 0, expr: 'horror' }] },
  [cap('The spell failed. He could feel it fail.', 44, 30, { w: 420, fixed: true })], { mood: 'day' });
const LOOSEBROOM = (x, y, r = 8) => () => g({ transform: `translate(${x},${y}) rotate(${r})` }, P2.broom(0.75));
const NEV_DOWN = (o = {}) => ({ def: nevilleHuff, id: 'neville', x: 1100, y: 1010, s: 1.05, turn: 0.2, pose: 'lie', expr: 'hurt', rot: 90, armF: { sh: -40, el: -30, hand: 'splay' }, legF: { hip: 12, knee: -18 }, ...o });
// the syringe of liquid fire
const SYRINGE = g({ transform: 'rotate(-70) scale(1.6)' }, circle(0, -6, 26, { fill: '#ffb040', opacity: 0.35 }), rect(-30, -12, 60, 22, { fill: '#e8773a', stroke: C.ink, 'stroke-width': 2.4, rx: 6 }), rect(30, -3, 26, 4, { fill: '#c9ced4', stroke: C.ink, 'stroke-width': 1.2 }), rect(-44, -8, 14, 14, { fill: '#8a8f96', stroke: C.ink, 'stroke-width': 1.6 }), circle(-4, -1, 7, { fill: '#ffe08a' }));
ep.panel(720, { cam: { x: 1250, y: 910, w: 600 }, bg: FIELD(), actors: [LOOSEBROOM(1250, 1110, -4), NEV_DOWN()] },
  [sfx('THUD', 250, 170, { size: 110, rot: -6 }), sfx('crack', 580, 330, { size: 50, rot: 8, font: "'Caveat', cursive" })], { mood: 'day', alt: 'The boy lies face down on the grass in a heap.' });
ep.panel(1090, { cam: { x: 1120, y: 540, w: 840 }, bg: FIELD(), actors: [NEV_DOWN({ x: 960 }), () => g({ transform: 'translate(1250,1060) scale(0.6)' }, healerKit(1)), { def: harryRaven, id: 'harry', x: 1420, y: 1010, s: 1.1, turn: -0.5, pose: 'kneel', expr: 'yell', armB: { sh: 120, el: 40, hand: 'hold', prop: SYRINGE } }, HO({ x: 820, y: 960, pose: 'reach', expr: 'cross', turn: 0.6 })] },
  [say('Harry', '*Healer\'s Pack!*', 600, 50, { anchor: 'tc', w: 260, fixed: true }),
   shout('Hooch', 'Broken wrist! Calm *down*, boy, he just has a broken wrist!', 305, 150, { anchor: 'tc', w: 310, fixed: true })], { mood: 'day', alt: 'Harry, in full panic, has the Emergency Healing Pack open and a syringe of liquid fire in his hand.' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.1 }, bg: FIELD(), blur: 2, actors: [{ def: harryRaven, id: 'harry', x: 1450, y: 1010, s: 1.1, turn: -0.4, pose: 'kneel', expr: 'blank', armB: { sh: 120, el: 40, hand: 'hold', prop: SYRINGE } }] },
  [cap('There was a sort of mental lurch as Harry\'s mind snapped out of Panic Mode. In his hand was a syringe of liquid fire, which would have kept the boy\'s brain oxygenated if he\'d snapped his neck.', 44, 30, { w: 620, fixed: true }),
   say('Harry', 'Ah… broken bone… right… Setting String?', 400, 900, { anchor: 'bc', w: 360, fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { x: 1170, y: 610, w: 860 }, bg: FIELD(), actors: [HO({ x: 880, y: 960, pose: 'hold', turn: 0.5, expr: 'stern' }), { def: nevilleHuff, id: 'neville', x: 1120, y: 970, s: 1.05, turn: -0.3, pose: 'hold', expr: 'cry' }, { def: harryRaven, id: 'harry', x: 1430, y: 1010, s: 1.1, turn: -0.5, pose: 'kneel', expr: 'shock', armB: { sh: 60, el: 30, hand: 'hold', prop: SYRINGE } }] },
  [say('Hooch', 'That\'s for emergencies only. Put it away, he\'s fine.', 200, 50, { anchor: 'tc', w: 300, fixed: true }),
   cap('It was Neville Longbottom *again.* What was *with* him?', 386, 240, { w: 330, fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { on: ['hooch', 'neville'], fr: 'waist', dy: -0.8 }, bg: FIELD(), actors: [HO({ x: 1000, y: 960, pose: 'point', turn: 0.4, expr: 'cross' }), { def: nevilleHuff, id: 'neville', x: 1230, y: 970, s: 1.05, turn: -0.2, pose: 'hold', expr: 'cry' }] },
  [say('Hooch', 'None of you is to move while I take this boy to the hospital wing! Leave those brooms where they are, or you\'ll be out of Hogwarts before you can say *Quidditch.*', 400, 56, { anchor: 'tc', w: 580, fixed: true })], { mood: 'day' });
// the Remembrall
const GR = (o = {}) => [
  ...[['s1', student(1801, 's'), 2300], ['s2', student(1802, 's'), 2500], ['zabini', zabini, 2700]].map(([id, def, x]) => ({ def, id, x, y: 960, s: 1.05, turn: -0.4, expr: 'laugh', ...((o.who || {})[id] || {}) })),
  { def: dracoSly, id: 'draco', x: 1800, y: 960, s: 1.1, turn: -0.3, pose: 'stand', expr: 'smug', ...(o.d || {}) },
  { def: crabbe, id: 'crabbe', x: 1990, y: 960, s: 1.12, turn: -0.3, pose: 'crossArms', expr: 'neutral', ...(o.cr || {}) },
  { def: goyle, id: 'goyle', x: 2150, y: 960, s: 1.12, turn: -0.3, pose: 'stand', expr: 'grin', ...(o.go || {}) },
  { def: harryRaven, id: 'harry', x: 1450, y: 960, s: 1.1, turn: 0.4, pose: 'stand', expr: 'cold', ...(o.h || {}) },
  { def: ernie, id: 'ernie', x: 1150, y: 960, s: 1.05, turn: 0.4, pose: 'stand', expr: 'neutral', ...(o.e || {}) },
  ...[['h1', student(1803, 'h'), 900], ['h2', student(1804, 'h'), 700], ['dean', dean, 450], ['michael', michael, 250]].map(([id, def, x]) => ({ def, id, x, y: 960, s: 1.05, turn: 0.4, expr: 'neutral', ...((o.who || {})[id] || {}) })),
];
ep.panel(1000, { cam: { x: 2200, y: 790, w: 1100 }, bg: FIELD(), actors: GR({ h: { x: 1830, y: 1500, s: 2.1, turn: 0.55, expr: 'cold' }, go: { expr: 'laugh' }, d: { expr: 'smug' } }) },
  [cap('When they were out of earshot, one of the Slytherins started giggling. That set off the others.', 44, 30, { w: 620, fixed: true }),
   cap('Harry turned and looked at them. It seemed like a good time to memorise some faces.', 44, 820, { w: 620, fixed: true })], { mood: 'day' });
ep.panel(1100, { cam: { x: 1575, y: 723, w: 700 }, bg: FIELD(), actors: GR({ h: { expr: 'deadpan' }, d: { x: 1700, turn: -0.4, expr: { base: 'smug', mouth: { type: 'wobble' } } } }) },
  [say('Draco', 'Just wanted to say, Potter: when you take advantage of emergencies to demonstrate leadership, you want to look like you\'re in total control of the situation. Rather than, say, going into a complete panic.', 400, 62, { anchor: 'tc', w: 500, fixed: true }),
   say('Draco', 'But you probably scored a few points anyway.', 560, 1050, { anchor: 'bc', w: 340, fixed: true })], { mood: 'day', alt: 'Draco\'s face is very controlled and twitches occasionally: he thinks it\'s hilarious, but there\'s no political advantage in laughing now.' });
ep.panel(1150, { cam: { x: 1370, y: 726, w: 900 }, bg: FIELD(), actors: GR({ d: { x: 1640, turn: -0.5, pose: 'crossArms', expr: 'smug' }, h: { x: 1380, turn: -0.3, expr: 'neutral' }, e: { x: 1110, pose: 'bow', expr: 'calm' } }) },
  [say('Ernie', 'Thank you, Harry Potter, on behalf of Hufflepuff. It was a good try, and a good thought.', 270, 56, { anchor: 'tc', w: 360, fixed: true }),
   say('Draco', 'A good thought *indeed.* Why didn\'t anyone in Hufflepuff have their wands out? I thought Hufflepuffs were supposed to stick together? I guess that\'s why it\'s better to have one Ravenclaw as a friend than *all* of Hufflepuff.', 470, 1110, { anchor: 'bc', w: 440, shape: 'box', fixed: true })], { mood: 'day' });
ep.panel(1000, { cam: { on: ['ernie', 'goyle'], fr: 'waist', dy: -1.3 }, bg: FIELD(), actors: GR({ d: { x: 1640 }, cr: { x: 2420 }, e: { x: 1880, turn: 0.4, pose: 'reach', expr: 'worried' }, go: { x: 2170, pose: 'stand', turn: -0.4, expr: 'grin', armB: { sh: 100, el: 40, hand: 'hold', prop: P2.remembrall(1.5) } } }) },
  [say('Goyle', 'Hey, what\'s this?', 610, 50, { anchor: 'tc', w: 240, fixed: true }),
   say('Ernie', 'Neville\'s Remembrall! It turns red if you\'ve forgotten something. Give it here, please, and I\'ll hand it back to him later.', 260, 150, { anchor: 'tc', w: 360, fixed: true })], { mood: 'day', alt: 'Goyle picks up a glass marble full of swirling white mist.' });
ep.bleed(1200, { cam: { x: 2230, y: 470, w: 1020 }, bg: FIELD(), actors: [{ def: goyle, id: 'goyle', x: 2360, y: 250, s: 1.12, turn: -0.3, pose: 'sit', seat: 60, expr: 'laugh', armB: { sh: 120, el: 30, hand: 'hold', prop: P2.remembrall(1.5) } }, CS.broomUnder('goyle', 60, -8, 1.0), ...GR({ who: { s1: { pose: 'armsUp' }, s2: { pose: 'armsUp' }, zabini: { pose: 'armsUp' } } }).filter((a) => a.id !== 'goyle')] },
  [shout('Goyle', 'Come and get it, *Hufflepuffle!*', 300, 70, { anchor: 'tc', w: 320, fixed: true }),
   cap('Hadn\'t Madam Hooch said that would get him *expelled?* The Slytherins started cheering and hooting.', 44, 1170, { anchor: 'bl', w: 620, fixed: true })], { alt: 'Goyle, on a broom, soaring up above the field, the Remembrall in his hand.' });
ep.panel(1100, { cam: { x: 1550, y: 575, w: 520 }, bg: FIELD(), actors: GR({ d: { x: 1660, turn: -0.4, expr: 'pained' }, h: { x: 1440, turn: 0.4, expr: 'cross' } }) },
  [whisper('Harry', 'Draco, if you don\'t order that idiot back on the ground, the teacher\'s going to get back and—', 284, 50, { anchor: 'tc', w: 360, fixed: true }),
   whisper('Draco', 'I *can\'t!* Everyone in Slytherin would think I\'m *weak!*', 590, 250, { anchor: 'tc', w: 300, fixed: true }),
   whisper('Harry', 'And if Mr Goyle gets expelled, your *father* is going to think you\'re a *moron!*', 260, 1060, { anchor: 'bc', w: 380, fixed: true })], { mood: 'day', alt: 'Draco\'s face twists in agony.' });
// wands out: four houses
const WO = (id, def, turn) => ({ def, id, x: 1000, y: 960, s: 1.1, turn, pose: 'wandUp', expr: 'yell', armB: { sh: 110, el: 20, hand: 'hold', prop: wand(100) } });
const STRIP = (y, h, cx, actors, tint) => ({ x: M, y, w: 752, h, mood: 'day', art: { cam: { x: cx, y: 690, w: 700 }, bg: FIELD(), actors }, overlay: rect(0, 0, 752, h, { fill: tint, opacity: 0.22 }) });
ep.multi(1520, [
  STRIP(18, 362, 1000, [...[2, 1].map((i) => ({ ...WO('hx' + i, student(1803 + i, 'h'), 0.4), x: 800 - i * 190 })), { ...WO('ernie', ernie, 0.4), x: 800 }], '#d6a33a'),
  STRIP(392, 362, 960, [2, 1, 0].map((i) => ({ ...WO('sx' + i, [zabini, student(1801, 's'), student(1802, 's')][i], -0.4), x: 1000 + i * 230 })), '#2f5a40'),
  STRIP(766, 362, 1000, [{ ...WO('dean', dean, 0.3), x: 830, armB: { sh: 150, el: 10, hand: 'hold', prop: wand(100) } }, { ...WO('gx', student(1805, 'g'), -0.3), x: 640 }], '#9a2a2a'),
  STRIP(1140, 362, 820, [WO('michael', michael, -0.3)], '#2f4f86'),
], [shout('Ernie', 'Hufflepuffs stick together! *Wands out, Hufflepuff!*', 530, 199, { w: 260, size: 30, fixed: true }),
  shout('Slytherins', '*Wands out, Slytherin!*', 226, 573, { w: 270, size: 30, fixed: true, noTail: true }),
  shout('Dean', '*Wands out, Gryffindor!*', 566, 985, { w: 230, fixed: true }),
  shout('Michael', '*Wands out, Ravenclaw!*', 236, 1250, { w: 230, fixed: true }), cap('(Michael Corner, who was apparently feeling left out.)', 44, 1486, { anchor: 'bl', w: 380, fixed: true })],
  { alt: 'Four strips, one per House: every boy on the field whips out his wand.' });
ep.panel(900, { cam: { on: ['draco'], fr: 'close', dy: 0.1 }, bg: FIELD(), blur: 3, actors: GR({ d: { x: 1650, expr: 'horror' } }) },
  [whisper('Draco', '*Do something, Potter! I can\'t be the one to stop this, it has to be you! I\'ll owe you a favour, just think of something! Aren\'t you supposed to be brilliant?*', 400, 50, { anchor: 'tc', w: 520, fixed: true })], { mood: 'day' });
ep.panel(760, { cam: { on: ['harry'], fr: 'close', dy: 0.1 }, bg: FIELD(), blur: 3, actors: GR({ h: { expr: 'focus' } }) },
  [cap('In around five and a half seconds, someone was going to cast a Simple Strike Hex. And by the time the teachers were done expelling people, the only boys left in his year would be Ravenclaws.', 44, 30, { w: 620, fixed: true })], { mood: 'day' });
ep.bleed(960, { cam: { on: ['harry'], fr: 'waist', dy: -0.5 }, bg: FIELD(), actors: GR({ h: { pose: 'point', expr: 'yell', turn: 0.2, armB: { sh: 145, el: 5, hand: 'point' } } }), behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { n: 26, op: 0.2 }) },
  [shout('Harry', '*GREGORY GOYLE! I challenge you to a contest for possession of Neville\'s Remembrall!*', 400, 90, { anchor: 'tc', w: 430, fixed: true })], { alt: 'Harry, pointing at the sky, at the top of his lungs.' });
ep.panel(1000, { cam: { x: 1525, y: 649, w: 440 }, bg: FIELD(), actors: GR({ d: { x: 1640, turn: -0.4, pose: 'present', expr: 'smug' }, h: { x: 1400, expr: 'focus', turn: 0.3 } }) },
  [say('Draco', 'Oh, really? That sounds interesting. What sort of contest, Potter?', 526, 50, { anchor: 'tc', w: 360, fixed: true }),
   inner('Harry', '*"Contest" had been as far as his inspiration had got. Not chess: Draco couldn\'t accept that without it looking strange. Not arm-wrestling: Goyle would crush him…*', 400, 966, { anchor: 'bc', w: 600, fixed: true })], { mood: 'day' });
ep.panel(1000, { cam: { x: 1570, y: 656, w: 520 }, bg: FIELD(), actors: GR({ d: { x: 1720, turn: -0.4, pose: 'stand', expr: 'suspicious' }, h: { x: 1440, expr: 'determined', pose: 'lecture', turn: 0.3 } }) },
  [say('Harry', 'We stand apart. No-one else comes near either of us. No wands. If I can get my hands on Neville\'s Remembrall without moving, Gregory Goyle gives me the one he\'s holding.', 360, 50, { anchor: 'tc', w: 500, fixed: true })], { mood: 'day' });
ep.panel(1000, { cam: { on: ['draco'], fr: 'bust', dy: -0.5 }, bg: FIELD(), blur: 2, actors: GR({ h: { x: 1200 }, d: { x: 1650, pose: 'point', expr: 'grin' } }) },
  [shout('Draco', '*Hah,* Potter! I\'d like to see you do *that!* Mr Goyle accepts!', 400, 88, { anchor: 'tc', w: 460, fixed: true }),
   whisper('Draco', 'Potter, *what?*', 590, 820, { w: 220, fixed: true }),
   cap('(which he somehow did without moving his lips)', 44, 966, { anchor: 'bl', w: 440, fixed: true })], { mood: 'day' });
// a Remembrall resting on an actor's open hand (drawn over the hand so it reads)
const ONHAND = (id, k = 0.5, side = 'handB', o = {}) => (e) => { const a = e.anchors[id]; if (!a) return ''; const h = a[side]; return g({ transform: `translate(${h[0]},${h[1] - a.hr * 0.3})` }, P2.remembrall(k * a.hr / 40, o)); };
const DUEL = (g0, h0) => [{ def: goyle, id: 'goyle', x: 2100, y: 960, s: 1.12, turn: -0.5, ...g0 }, { def: harryRaven, id: 'harry', x: 1570, y: 960, s: 1.1, turn: 0.4, ...h0 }];
ep.panel(1150, { cam: { x: 1835, y: 770, w: 720 }, bg: FIELD(), actors: DUEL({ pose: 'stand', expr: 'confused', armB: { sh: 100, el: 40, hand: 'hold', prop: P2.remembrall(1.4) } }, { pose: 'stand', expr: 'determined', armB: { sh: 100, el: 70, hand: 'point' } }) },
  [cap('Harry stopped a few paces from Mr Goyle, far enough that they couldn\'t reach each other. Slowly, deliberately, he sheathed his wand. Everyone backed away.', 44, 30, { w: 620, fixed: true }),
   shout('Harry', '*I call upon the insanity of Hogwarts! Happy happy boom boom swamp swamp swamp!*', 405, 1060, { anchor: 'bc', w: 420, size: 30, fixed: true })], { mood: 'day', alt: 'Harry raises one hand, fingers ready to snap. Gasps from anyone who has heard about the pies, which is practically everyone.' });
ep.panel(900, { cam: { x: 1835, y: 640, w: 720 }, bg: FIELD(), actors: DUEL({ pose: 'cower', expr: 'wince' }, { pose: 'stand', expr: 'calm', armB: { sh: 100, el: 70, hand: 'fist' } }), behind: (e) => { const a = e.anchors.harry; return a ? FX.burst(e.w, e.h, a.handB[0], a.handB[1], { n: 16, inner: 60, op: 0.22 }) : ''; } },
  [sfx('SNAP', 300, 170, { size: 100, rot: -8 }), cap('A lot of people flinched. And nothing happened.', 44, 866, { anchor: 'bl', w: 520, fixed: true })], { mood: 'day' });
const BARE = () => g({ transform: 'translate(880,1010)' }, ellipse(0, 0, 110, 26, { fill: '#8a6a44', stroke: '#5a4430', 'stroke-width': 2 }), ellipse(-10, -2, 60, 12, { fill: '#6a4e30' }));
ep.panel(950, { cam: { x: 950, y: 700, w: 700 }, bg: FIELD(), actors: [BARE, { def: dean, id: 'dean', x: 740, y: 1000, s: 1.05, turn: 0.4, pose: 'crouch', expr: 'confused' }, { def: harryRaven, id: 'harry', x: 1180, y: 960, s: 1.1, turn: -0.4, pose: 'point', expr: 'calm' }] },
  [say('Dean', 'Um. Is that it?', 230, 50, { anchor: 'tc', w: 220, fixed: true }),
   say('Harry', 'Look in front of you. That patch of ground with no grass on it? Dig it up.', 540, 180, { anchor: 'tc', w: 360, fixed: true })], { mood: 'day' });
const DUG = () => g({ transform: 'translate(880,1010)' }, ellipse(0, 0, 110, 26, { fill: '#5a4028', stroke: '#3a2a18', 'stroke-width': 2 }), ellipse(0, 4, 70, 14, { fill: '#2e2012' }), path('M-150,6 q20,-40 50,-4 M120,8 q24,-34 50,-2', { fill: '#8a6a44', stroke: '#5a4430', 'stroke-width': 2 }));
ep.panel(950, { cam: { x: 930, y: 700, w: 700 }, bg: FIELD(), actors: [DUG, { def: dean, id: 'dean', x: 740, y: 1000, s: 1.05, turn: 0.4, pose: 'crouch', expr: 'unimpressed' }, { def: terry, id: 'terry', x: 1130, y: 960, s: 1.05, turn: -0.3, pose: 'crossArms', expr: 'deadpan' }] },
  [say('Terry', 'Just do it. No point asking why, trust me on this one.', 540, 50, { anchor: 'tc', w: 340, fixed: true }),
   cap('After a minute: "There\'s nothing there."', 44, 916, { anchor: 'bl', w: 460, fixed: true })], { mood: 'day', alt: 'Dean kneels and scoops away dirt. Nothing.' });
ep.panel(820, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: FIELD(), blur: 2, actors: [{ def: harryRaven, id: 'harry', x: 1300, y: 960, s: 1.1, turn: -0.2, expr: 'think' }] },
  [inner('Harry', '*Huh. He\'d been* planning *to go back in time and bury a treasure map there. Then Harry realised there was a much simpler way, which didn\'t threaten the secret of Time-Turners quite as much.*', 400, 64, { anchor: 'tc', w: 580, fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { x: 1290, y: 650, w: 620 }, bg: FIELD(), actors: [{ def: ernie, id: 'ernie', x: 1130, y: 980, s: 1.05, turn: 0.4, pose: 'stand', expr: 'confused' }, { def: harryRaven, id: 'harry', x: 1420, y: 960, s: 1.1, turn: -0.4, pose: 'present', expr: 'calm' }] },
  [say('Harry', 'Ernie, would you look around on the ground where Neville fell, and see if you can find Neville\'s Remembrall?', 420, 50, { anchor: 'tc', w: 520, fixed: true })], { mood: 'day' });
ep.panel(860, { cam: { on: ['ernie'], fr: 'bust', dy: -0.35 }, bg: FIELD(), blur: 2, actors: [{ def: ernie, id: 'ernie', x: 1000, y: 980, s: 1.05, turn: 0.3, pose: 'stand', expr: { base: 'shock', eyes: { open: 1.2 } }, armB: { sh: 110, el: 50, hand: 'open' } }], over: ONHAND('ernie') },
  [shout('Ernie', '*Merlin!* It\'s *here!* Right where he fell!', 400, 82, { anchor: 'tc', w: 420, fixed: true })], { mood: 'day', alt: 'Ernie holds up a Remembrall he has just found on the grass.' });
ep.panel(820, { cam: { on: ['goyle'], fr: 'bust', dy: -0.25 }, bg: FIELD(), blur: 2, actors: [{ def: goyle, id: 'goyle', x: 1800, y: 960, s: 1.12, turn: -0.3, pose: 'stand', expr: 'horror', armB: { sh: 90, el: 50, hand: 'open' } }], over: ONHAND('goyle') },
  [cap('Mr Goyle looked down, and saw that he was *still holding* Neville\'s Remembrall.', 44, 30, { w: 620, fixed: true })], { mood: 'day' });
ep.panel(1060, { cam: { x: 1210, y: 650, w: 600 }, bg: FIELD(), actors: [{ def: dean, id: 'dean', x: 1040, y: 980, s: 1.05, turn: 0.4, pose: 'point', expr: 'shock' }, { def: harryRaven, id: 'harry', x: 1340, y: 960, s: 1.1, turn: -0.2, pose: 'shrug', expr: 'deadpan' }] },
  [say('Dean', 'Er. That\'s not possible, is it?', 210, 50, { anchor: 'tc', w: 280, fixed: true }),
   say('Harry', 'It\'s a plot hole. I made myself weird enough to distract the universe for a moment, and it forgot that Goyle had already picked up the Remembrall.', 480, 180, { anchor: 'tc', w: 440, fixed: true })], { mood: 'day', alt: 'Harry shrugs, perfectly deadpan.' });
ep.panel(640, { cam: { on: ['dean'], fr: 'close', dy: 0.25 }, bg: FIELD(), blur: 3, actors: [{ def: dean, id: 'dean', x: 1040, y: 980, s: 1.05, turn: 0.3, expr: 'exasperated' }] },
  [say('Dean', 'No, wait, I mean, that\'s *totally* not possible—', 400, 44, { anchor: 'tc', w: 460, fixed: true })], { mood: 'day' });
ep.panel(1150, { cam: { x: 1930, y: 563, w: 800 }, bg: FIELD(), actors: GR({ who: { s1: { x: 2600 }, s2: { x: 2800 }, zabini: { x: 2170, pose: 'point', expr: 'cross', turn: -0.4 } }, go: { x: 2420 }, d: { x: 1660, pose: 'stand', expr: 'think', turn: 0.2 }, cr: { x: 1920, expr: 'menace', pose: 'fists', turn: 0.5 } }) },
  [shout('Zabini', 'Hold on! How do we know that\'s Neville\'s Remembrall? You could\'ve just dropped *another* one there!', 505, 84, { anchor: 'tc', w: 340, size: 30, fixed: true }),
   say('Crabbe', 'Shut up, you. Mr Malfoy doesn\'t need *you* to tell him what to do!', 220, 420, { anchor: 'tc', w: 340, fixed: true }),
   inner('Harry', '*Good* minion.', 400, 1110, { anchor: 'bc', w: 240, fixed: true })], { mood: 'day' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.8 }, bg: FIELD(), blur: 2, actors: GR({ d: { x: 1700 }, h: { x: 1400, turn: 0.3, expr: 'calm', pose: 'present' } }) },
  [say('Harry', 'The Slytherin is strong with this one. But you have my word that the one Ernie\'s holding is Neville\'s. No comment about the one Gregory Goyle\'s holding. I leave the judgement of the bet to Mr Malfoy.', 400, 56, { anchor: 'tc', w: 540, fixed: true })], { mood: 'day' });
ep.panel(1000, { cam: { x: 1540, y: 688, w: 480 }, bg: FIELD(), actors: GR({ d: { x: 1670, turn: -0.4, expr: 'suspicious' }, h: { x: 1410, turn: 0.4, expr: 'calm' } }) },
  [say('Draco', 'You promise that actually *is* Neville\'s Remembrall?', 540, 50, { anchor: 'tc', w: 340, fixed: true }),
   say('Harry', 'Yes. That\'s the one that\'ll go back to Neville, and it was his originally.', 296, 954, { anchor: 'bc', w: 420, fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { on: ['draco'], fr: 'bust', dy: -0.5 }, bg: FIELD(), blur: 2, actors: GR({ h: { x: 1250 }, d: { x: 1650, pose: 'present', turn: 0, expr: 'determined' } }) },
  [say('Draco', 'I won\'t question the word of the Noble House of Potter, then, no matter how strange that all was. And the Noble and Most Ancient House of Malfoy keeps its word as well. Mr Goyle, give that to Mr Potter—', 400, 44, { anchor: 'tc', w: 560, shape: 'box', fixed: true })], { mood: 'day' });
const TOSS = (e) => { const A = e.anchors.ernie, B = e.anchors.harry; if (!A || !B) return ''; const a = A.handB, b = B.handB, bx = a[0] + (b[0] - a[0]) * 0.62, by = Math.min(a[1], b[1]) - A.hr * 1.4; return path(`M${a[0]},${a[1] - A.hr * 0.3} Q${a[0] + (bx - a[0]) * 0.5},${by - A.hr * 0.9} ${bx},${by}`, { fill: 'none', stroke: '#6a5a4a', 'stroke-width': 3.5, 'stroke-dasharray': '10 9', 'stroke-linecap': 'round' }) + g({ transform: `translate(${bx},${by})` }, P2.remembrall(A.hr / 40 * 0.8)); };
ep.panel(900, { cam: { x: 1200, y: 640, w: 720 }, bg: FIELD(), actors: [{ def: ernie, id: 'ernie', x: 950, y: 980, s: 1.05, turn: 0.4, pose: 'reach', expr: 'grin', armB: { sh: 130, el: 10, hand: 'open' } }, { def: harryRaven, id: 'harry', x: 1440, y: 960, s: 1.1, turn: -0.3, pose: 'reach', expr: 'smile', armB: { sh: 120, el: 10, hand: 'open' } }], over: TOSS },
  [say('Ernie', 'Catch, Harry!', 200, 50, { anchor: 'tc', w: 220, fixed: true }), say('Harry', 'There. I win…', 610, 110, { anchor: 'tc', w: 220, fixed: true })], { mood: 'day' });
// the Remembrall blazing red: a small red sun in his hand, washing the whole frame
const BLAZE = (e) => { const a = e.anchors.harry; if (!a) return ''; const x = a.handB[0], y = a.handB[1] - a.hr * 0.35; const R = rng(17); let rays = ''; for (let k = 0; k < 28; k++) { const t = k / 28 * Math.PI * 2 + R.range(-0.05, 0.05), r0 = a.hr * 0.6, r1 = a.hr * R.range(1.2, 2.3); rays += line(x + Math.cos(t) * r0, y + Math.sin(t) * r0, x + Math.cos(t) * r1, y + Math.sin(t) * r1, { stroke: '#ffd0a0', 'stroke-width': R.range(2, 5), opacity: 0.75, 'stroke-linecap': 'round' }); } return rect(0, 0, e.w, e.h, { fill: '#ff3a1a', opacity: 0.12 }) + K.glow(x, y, e.w * 0.7, '#ff4a2a', 0.42) + rays + g({ transform: `translate(${x},${y})` }, P2.remembrall(a.hr / 40 * 0.75, { red: true })); };
ep.bleed(1200, { cam: { on: ['harry'], fr: 'bust', dy: 0.1, zoom: 0.8 }, bg: FIELD(), actors: [{ def: harryRaven, id: 'harry', x: 1500, y: 960, s: 1.1, turn: 0, pose: 'holdUp', expr: { base: 'shock', eyes: { open: 1.2 } }, armB: { sh: 50, el: 70, hand: 'open' } }], over: BLAZE },
  [cap('Harry trailed off. All conversation stopped.', 44, 40, { w: 480, fixed: true }),
   capC('The Remembrall was glowing bright red in his hand, blazing like a miniature sun, casting shadows on the ground in broad daylight.', 400, 1080, { anchor: 'bc', w: 600, fixed: true })], { alt: 'The Remembrall blazes red in Harry\'s hand.' });

// ---------------------------------------------------------------- McGonagall's office
// (dayBeat centres its subtitle on one line; this one runs to three, so it's hung from the top instead)
ep.beat(340, [title('Thursday.', 400, 100, { size: 60, color: C.ink }), plain('*If you wanted to be specific, 5:09 on Thursday afternoon, in Professor McGonagall\'s office. (With an extra hour for Harry slipped in between.)*', 400, 160, { anchor: 'tc', w: 600, font: "'IM Fell English', serif", size: 28, color: '#5a4032' })]);
const MO = () => CS.mcgonagallOffice();
const MCG = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 1000, y: 900, turn: 0.25, pose: 'sit', seat: 190, expr: 'angry', ...o });
const DESK = () => CS.mcgDesk(1000, 960);
const HP = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1450, y: 1040, s: 1.1, turn: -0.4, pose: 'stand', expr: 'neutral', ...o });
ep.panel(1150, { cam: { on: ['mcgonagall'], fr: 'waist', dy: -0.9 }, bg: MO, actors: [MCG({ expr: 'yell', pose: 'fists', seat: undefined, y: 960 }), DESK] },
  [shout('McGonagall', '*You are not to use the Time-Turner in that fashion, Mr Potter!* Is the concept of secrecy not something that you understand?', 400, 100, { anchor: 'tc', w: 480, size: 30, fixed: true })], { mood: 'warm' });
ep.panel(1100, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: MO, blur: 2, actors: [HP({ expr: 'rant', pose: 'gesture' })] },
  [say('Harry', 'Professor, Slytherin was pointing their wands at Hufflepuff, Gryffindor at Slytherin, some *idiot* called wands out in Ravenclaw, and I had maybe five seconds to keep the whole thing from blowing sky-high!', 400, 56, { anchor: 'tc', w: 540, fixed: true }),
   say('Harry', 'They don\'t *know* how I did it! They just think I can do really weird things by snapping my fingers! I *had to do it!*', 400, 1040, { anchor: 'bc', w: 540, fixed: true })], { mood: 'warm' });
ep.panel(1500, { cam: { head: 'mcgonagall', hw: 0.25, hx: 0.4, hy: 0.54 }, bg: MO, actors: [MCG({ expr: 'yell', pose: 'point', seat: undefined, y: 960, turn: 0.4 }), DESK] },
  [shout('McGonagall', 'You did *not* have to do it! All you needed was to get this *anonymous Slytherin* back on the ground! You could have challenged him to a game of Exploding Snap!', 400, 125, { anchor: 'tc', w: 450, fixed: true }),
   shout('McGonagall', 'But no, you had to use the Time-Turner in a flagrant and unnecessary manner!', 400, 1395, { anchor: 'bc', w: 450, fixed: true })], { mood: 'warm' });
ep.panel(880, { cam: { on: ['harry'], fr: 'bust', dy: -0.4 }, bg: MO, blur: 2, actors: [HP({ expr: 'rant', pose: 'gesture' })] },
  [say('Harry', 'It was all I could think of! They wouldn\'t have accepted chess, and if I\'d picked arm-wrestling I would have lost!', 400, 50, { anchor: 'tc', w: 520, fixed: true })], { mood: 'warm' });
ep.bleed(1000, { cam: { on: ['mcgonagall'], fr: 'close', dy: -0.3 }, bg: MO, blur: 3, actors: [MCG({ expr: 'yell', pose: 'fists', seat: undefined, y: 960, turn: 0.05 })], under: (e) => rect(0, 0, e.w, e.h, { fill: '#7b2433' }), behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.66, { n: 40, op: 0.7, inner: e.w * 0.36, col: '#f6e2b8' }) },
  [shout('McGonagall', '*Then you should have picked WRESTLING!*', 400, 82, { anchor: 'tc', w: 500, size: 56, fixed: true })], { alt: 'McGonagall, at full volume.' });
ep.panel(760, { cam: { on: ['harry'], fr: 'close', dy: 0.1 }, bg: MO, blur: 3, actors: [HP({ expr: 'blank' })] },
  [say('Harry', 'But then I\'d have *lost*—', 400, 64, { anchor: 'tc', w: 320, fixed: true }),
   cap('Harry stopped.', 44, 620, { w: 200, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: MO, blur: 2, actors: [HP({ expr: 'sad', pose: 'slump' })] },
  [cap('It was suddenly apparent that he\'d had a *lot* of other options. He could have asked Draco to suggest something. He could have asked the crowd. There had been a giant space of possibilities. Why had he picked *that* one?', 44, 30, { w: 620, fixed: true }),
   cap('Because he\'d seen a way to *win.* Win possession of an unimportant trinket the teachers would have taken back from Goyle anyway.', 44, 700, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(620, { cam: { on: ['harry'], fr: 'eyes' }, bg: MO, blur: 3, actors: [HP({ expr: 'sad' })], over: (e) => FX.frost(e.w, e.h, 0.2, 83) },
  [capC('*Intent to win.* That was what had got him.', 400, 64, { w: 500, fixed: true })], { mood: 'warm' });
// over the desk: McGonagall seated behind it, Harry in the foreground on the right
const TWO = (m, h, cam = {}) => ({ cam: { on: ['mcgonagall', 'harry'], fr: 'bust', dy: -0.75, zoom: 1.2, dx: 0.1, ...cam }, bg: MO, actors: [MCG({ x: 1020, ...m }), DESK, HP({ x: 1330, y: 1130, s: 1.35, turn: -0.5, ...h })] });
ep.panel(820, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: MO, blur: 2, actors: [HP({ expr: 'sad', pose: 'bow' })] },
  [say('Harry', 'I\'m sorry. For my pride, and my stupidity.', 400, 50, { anchor: 'tc', w: 460, fixed: true })], { mood: 'warm' });
ep.panel(1100, TWO({ expr: 'stern', pose: 'sit' }, { expr: 'sad' }),
  [say('McGonagall', 'One more display like that, Mr Potter, and you will be returning that Time-Turner. Do I make myself very clear?', 530, 50, { anchor: 'tc', w: 400, fixed: true }),
   say('Harry', 'Yes. I understand, and I\'m sorry.', 230, 1066, { anchor: 'bc', w: 300, fixed: true })], { mood: 'warm', alt: 'She wipes a hand across her forehead. Some of the anger dissipates.' });
const MBUST = (o = {}, cam = {}) => ({ cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.1, ...cam }, bg: MO, blur: 2, actors: [MCG(o), DESK] });
ep.panel(900, TWO({ expr: 'neutral', pose: 'sit' }, { expr: 'worried' }, { dy: -0.2 }),
  [say('Harry', 'More importantly, why did the Remembrall go off like that? Does it mean I\'ve been Obliviated?', 508, 64, { anchor: 'tc', w: 400, fixed: true })], { mood: 'warm' });
ep.panel(950, MBUST({ expr: 'think', pose: 'chin' }),
  [say('McGonagall', 'That puzzles me as well. If it were that simple, the courts would use Remembralls, and they do not. I shall look into it, Mr Potter. You can go now.', 400, 50, { anchor: 'tc', w: 540, fixed: true })], { mood: 'warm' });
ep.panel(900, TWO({ expr: 'neutral', pose: 'sit' }, { expr: 'neutral', pose: 'raiseHand' }, { dy: -0.2 }),
  [say('Harry', 'Um, sorry, I did have something else. It\'s about Professor Quirrell…', 505, 50, { anchor: 'tc', w: 400, fixed: true })], { mood: 'warm' });
ep.panel(1000, MBUST({ expr: 'worried', pose: 'sit' }, { dy: -0.2 }),
  [say('McGonagall', 'I\'m sure, Mr Potter, that it is nothing of importance. Surely you heard the Headmaster tell the students not to bother us with any unimportant complaints about the Defence Professor?', 400, 50, { anchor: 'tc', w: 560, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['harry'], fr: 'bust', dy: -0.5 }, bg: MO, blur: 2, actors: [HP({ expr: 'determined', pose: 'gesture' })] },
  [say('Harry', 'But this could *be* important. Yesterday I got this sudden sense of doom when—', 400, 50, { anchor: 'tc', w: 520, fixed: true })], { mood: 'warm' });
ep.bleed(1050, { cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.7 }, bg: MO, blur: 2, actors: [MCG({ expr: 'yell', pose: 'raiseHand', seat: undefined, y: 960, turn: 0.1 })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.66, { n: 30, op: 0.55, inner: e.w * 0.36, col: '#f6e2b8' }) },
  [shout('McGonagall', 'Mr Potter! I have a sense of doom as well! And my sense of doom is suggesting that *you must not finish that sentence!*', 400, 104, { anchor: 'tc', w: 470, fixed: true })], { alt: 'McGonagall cuts him off.' });
ep.panel(1360, { cam: { on: ['harry'], fr: 'bust', dy: -1.3 }, bg: MO, blur: 2, actors: [HP({ expr: 'rant', pose: 'gesture' })] },
  [shout('Harry', '*This isn\'t like you!* That seems *unbelievably* irresponsible! If there\'s some kind of jinx on the Defence position, if you already *know* something\'s going to go wrong, I\'d think you\'d all be on your toes—', 400, 140, { anchor: 'tc', w: 460, fixed: true })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'close', dy: -0.1 }, bg: MO, blur: 3, actors: [MCG({ expr: 'blank', pose: 'sit' })] },
  [say('McGonagall', 'Go *wrong*, Mr Potter? *I certainly hope not.*', 400, 44, { anchor: 'tc', w: 460, fixed: true })], { mood: 'warm', alt: 'Her face is expressionless.' });
ep.panel(1250, { cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.95 }, bg: MO, blur: 2, actors: [MCG({ expr: 'deadpan', pose: 'sit' }), DESK] },
  [say('McGonagall', 'Last February, Professor Blake was arrested for selling the O.W.L. papers to three fifth-year Slytherins. The year before that, Professor Summers failed so completely as an educator that her students thought a boggart was a kind of *furniture.* It would be *catastrophic* if some problem with the extraordinarily competent Professor Quirrell came to my attention now.', 400, 44, { anchor: 'tc', w: 600, shape: 'box', fixed: true })], { mood: 'warm', alt: 'Her face is expressionless.' });
ep.panel(1100, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: MO, blur: 2, actors: [HP({ expr: 'think', pose: 'chin' })] },
  [say('Harry', 'I see. So in other words, whatever\'s wrong with Professor Quirrell, you desperately don\'t want to know about it until the end of the school year.', 400, 64, { anchor: 'tc', w: 560, fixed: true }),
   say('Harry', 'And since it\'s currently September, he could assassinate the Prime Minister on live television and get away with it, so far as you\'re concerned.', 400, 1040, { anchor: 'bc', w: 560, fixed: true })], { mood: 'warm' });
ep.panel(1150, { cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.95 }, bg: MO, blur: 2, actors: [MCG({ expr: 'stern', pose: 'lecture', seat: undefined, y: 960, turn: 0.15 })] },
  [say('McGonagall', 'You, and you alone, have reported this mysterious sense of doom. You, and you alone, are a chaos magnet the likes of which I have never seen. I can well foresee that I am fated to sit in the Headmaster\'s office and hear some hilarious tale about Professor Quirrell in which you, and you alone, play a starring role. After which there will be no choice but to fire him.', 400, 44, { anchor: 'tc', w: 620, shape: 'box', fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { on: ['mcgonagall'], fr: 'close', dy: -0.55 }, bg: MO, blur: 3, actors: [MCG({ expr: 'menace', seat: undefined, y: 960, turn: 0.05 })], over: (e) => rect(0, 0, e.w, e.h, { fill: '#3a0a10', opacity: 0.25 }) },
  [say('McGonagall', 'And if this sad event takes place any earlier than the Ides of May, I will string you up by the gates of Hogwarts with your own intestines and pour *fire beetles* into your nose. *Now* do you understand me completely?', 400, 44, { anchor: 'tc', w: 600, shape: 'box', fixed: true })], { mood: 'warm', alt: 'McGonagall, very close, very calm, very menacing.' });
ep.panel(760, { cam: { on: ['harry'], fr: 'close', dy: 0.15 }, bg: MO, blur: 3, actors: [HP({ expr: { base: 'shock', eyes: { open: 1.2 } } })] },
  [cap('Harry nodded, eyes very wide. Then, after a second:', 44, 30, { w: 660, fixed: true }),
   say('Harry', 'What do I get if I can make it happen on the last day of the school year?', 400, 700, { anchor: 'bc', w: 460, fixed: true })], { mood: 'warm' });
ep.bleed(1050, { cam: { on: ['mcgonagall'], fr: 'waist', padX: 2.3, dx: 0.9, dy: -0.8 }, bg: MO, actors: [MCG({ expr: 'yell', pose: 'point', seat: undefined, y: 960, turn: 0.3 }), DESK], under: (e) => rect(0, 0, e.w, e.h, { fill: '#2a1a10' }), behind: (e) => FX.burst(e.w, e.h, e.w * 0.42, e.h * 0.6, { n: 44, op: 0.55, inner: e.w * 0.3, col: '#f6e2b8' }) },
  [shout('McGonagall', '*GET OUT OF MY OFFICE!*', 400, 84, { anchor: 'tc', w: 560, size: 70, fixed: true })], { alt: 'McGonagall points at the door.' });
ep.end();
export default ep;
