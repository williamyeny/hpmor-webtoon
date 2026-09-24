// EPISODE 16 — Of Course This Means War  (source: HPMOR ch. 15)
// Real magic turns out to be hard. Hermione is better at it. McGonagall's rules (which matter at the very end of HPMOR).
import { Episode, say, shout, inner, cold, cap, capC, plain, title, M } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, uid } from '../engine/core/svg.js';
import * as HG from '../engine/bg/hogwarts.js';
import * as CS from '../engine/bg/castle.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { mcgonagall, flitwick, student } from '../engine/chars/cast.js';
import { harryRaven, hermioneRaven, terry, anthony, padma, michael } from '../engine/chars/cast2.js';
import { wand, bookOpen } from '../engine/props/props.js';
import * as P2 from '../engine/props/props2.js';
import { dayBeat, header } from './b2.js';

const ep = new Episode({ id: 'ep16', number: 16, title: 'Of Course This Means War' });
ep.setBg(C.paper);
// rays for frameless (cut-out) panels: they fade out before the tile edges so nothing ends in a hard line
const RAYS = (col, op, cx = 0.5, cy = 0.45, inner = 170) => (e) => { const id = uid('ry'); return `<defs><radialGradient id="${id}g" cx="${cx}" cy="${cy}" r="0.5"><stop offset="0.6" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><mask id="${id}"><rect width="${e.w}" height="${e.h}" fill="url(#${id}g)"/></mask></defs>` + g({ mask: `url(#${id})` }, FX.burst(e.w, e.h, e.w * cx, e.h * cy, { col, op, inner })); };
header(ep, 'SIXTEEN', 'Of Course This Means War');
dayBeat(ep, 'Monday.', 'If you wanted to be specific, 1:30 on Monday afternoon. Charms.');

// ---------------------------------------------------------------- Charms
const CH = () => CS.charmsRoom();
const GL = (x, st) => ({ x, fn: (xx, y) => CS.waterGlass(xx, y, 1.2, st) });
// the Time-Turner glinting under Harry's robes
const TT_GLINT = (r, op) => (e) => { const a = e.anchors.harry; return a ? K.glow(a.head[0] - a.hr * 0.2, a.head[1] + a.hr * 2.2, r, '#ffe9a8', op) + g({ transform: `translate(${a.head[0] - a.hr * 0.2},${a.head[1] + a.hr * 2.2}) scale(${a.hr / 200})` }, P2.timeTurner(1, { chain: false })) : ''; };
const HS = (o = {}) => ({ def: harryRaven, id: 'harry', x: 900, y: 1060, s: 1.1, turn: 0.1, pose: 'wand', expr: 'focus', armB: { hand: 'hold', prop: wand(100) }, ...o });
const HE = (o = {}) => ({ def: hermioneRaven, id: 'hermione', x: 1250, y: 1060, s: 1.1, turn: -0.2, pose: 'wand', expr: 'focus', armB: { hand: 'hold', prop: wand(100) }, ...o });
const FL = (o = {}) => ({ def: flitwick, id: 'flitwick', x: 1080, y: 680, s: 1.0, turn: 0.1, pose: 'armsUp', expr: 'delight', ...o });
ep.bleed(620, { cam: { x: 930, y: 760, w: 1000 }, bg: CH, actors: [() => K.bookPile(540, 1110, 13, 7, 1.7), FL({ x: 540, y: 1110 - 13 * 17 * 1.7, pose: 'wandUp', armB: { hand: 'hold', prop: wand(80) } }), ...[[padma, 'st0', 780], [anthony, 'st1', 1400]].map(([def, id, x]) => ({ def, id, x, y: 1060, s: 1.05, turn: -0.2, pose: 'wand', expr: 'focus', armB: { hand: 'hold', prop: wand(90) } })), HS({ x: 985, turn: -0.1 }), HE({ x: 1190, turn: -0.2 }), () => CS.deskRow(1060, { x0: 660, h: 130, items: [GL(690, 'cool'), GL(885, 'warm'), GL(1095, 'ice'), GL(1300, 'warm')] })] },
  [capC('*Frigideiro!*', 400, 60, { w: 260, fixed: true })], { fadeTop: false, alt: 'The Charms classroom. Tiny Professor Flitwick stands on a pile of books. Rows of first-years point wands at glasses of water.' });
// Harry at his desk; the glass sits wherever his hand is (so the finger is really in the water)
const ATDESK = (h, o = {}) => [(o.who || HS)({ x: 1450, ...h }), (e) => { const hd = e.wa[o.id || 'harry'].handB; const top = hd[1] + (o.drop ?? 55); return CS.deskRow(1060, { h: 1060 - top }) + CS.waterGlass(hd[0] + (o.gx ?? 22), top, 1.0, o.st || 'warm'); }];
ep.panel(720, { cam: { on: ['harry'], fr: 'waist', dy: 0.1, dx: 0.6, zoom: 0.8 }, bg: CH, actors: ATDESK({ turn: 0.3, pose: 'point', expr: { base: 'suspicious', eyes: { lookY: 0.5 } }, armB: { sh: 55, el: 45, hand: 'point' } }) },
  [cap('Harry dipped a finger in his glass. It should have been cool. But lukewarm it was, and lukewarm it had stayed.', 44, 30, { w: 620, fixed: true })], { mood: 'warm', alt: 'Harry\'s finger in a perfectly lukewarm glass of water.' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'close', dy: -0.05 }, bg: CH, blur: 3, actors: [HS({ expr: 'cold', turn: 0.2 })], over: (e) => FX.frost(e.w, e.h, 0.55, 71) },
  [cap('He had read a great many fantasy novels. And it was starting to look like he had a mysterious dark side. So he glanced around to make sure no-one was watching, took a deep breath, and made himself angry.', 44, 30, { w: 620, fixed: true }),
   cold('Harry', '*Frigideiro.*', 400, 940, { anchor: 'bc', w: 250, fixed: true })], { mood: 'cold', shape: 'jag', jag: 22, seed: 5, frame: 'glow', glow: '#8fc4ee', alt: 'Harry thinks of the bullies, of Draco, and lets the cold rise. Frost at the edges. He says the spell in icy tones.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'waist', dy: 0.1, dx: 0.6, zoom: 0.8 }, bg: CH, actors: ATDESK({ turn: 0.3, pose: 'wand', expr: 'blank', armB: { sh: 55, el: 35, hand: 'hold', prop: wand(100) } }, { drop: 40, gx: 105 }) },
  [cap('Absolutely nothing happened.', 44, 30, { w: 360, fixed: true })], { mood: 'warm' });
ep.panel(860, { cam: { on: ['harry'], fr: 'close', dy: -0.3 }, bg: CH, blur: 3, actors: [HS({ expr: 'deadpan', turn: 0 })] },
  [inner('Harry', '*He had been* swindled. *He wanted to write to someone and demand a* refund *on his dark side, which clearly* ought *to have come with irresistible magical power, and had turned out to be defective.*', 400, 64, { anchor: 'tc', w: 600, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { on: ['hermione'], fr: 'waist', dy: 0.2, dx: -0.9, zoom: 0.8 }, bg: CH, actors: ATDESK({ turn: -0.3, pose: 'wand', expr: 'determined', armB: { sh: 60, el: 30, hand: 'hold', prop: wand(100) } }, { who: HE, id: 'hermione', drop: 30, gx: -105, st: 'ice' }), over: (e) => { const a = e.anchors.hermione; return a ? K.glow(a.handB[0] - 105 * a.s, a.handB[1], 170, '#dcebf5', 0.6) : ''; } },
  [say('Hermione', '*Frigideiro!*', 560, 64, { anchor: 'tc', w: 280, fixed: true }),
   cap('Hermione\'s water was solid ice, with white crystals forming on the rim of the glass. She seemed totally intent on her own work, and not at all conscious of the other students staring at her with hateful eyes.', 44, 760, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(880, { cam: { on: ['flitwick'], fr: 'waist', dy: -0.3 }, bg: CH, actors: [FL({ y: 820 })] },
  [shout('Flitwick', 'Oh, *very* good, Miss Granger! Excellent! *Stupendous!*', 400, 100, { anchor: 'tc', w: 480, fixed: true })], { mood: 'warm' });
// Harry and Hermione side by side at their desk
const PAIR = (h = {}, he = {}, st = 'warm') => [HS({ x: 1400, ...h }), HE({ x: 1650, ...he }), (e) => { const top = e.wa.harry.hip[1] - 30; return CS.deskRow(1060, { h: 1060 - top, items: [GL(1290, st), GL(1760, 'ice')] }); }];
ep.panel(820, { cam: { on: ['harry', 'hermione'], fr: 'bust', dy: -0.5, zoom: 0.9 }, bg: CH, actors: PAIR({ turn: 0.45, pose: 'stand', expr: 'pained' }, { turn: -0.2, pose: 'relaxed', armB: {}, expr: 'focus' }) },
  [cap('It was the obvious role for her in the scheme of things. Harry swallowed hard.', 44, 30, { w: 620, fixed: true }),
   say('Harry', 'Hermione? Do you have any idea what I might be doing wrong?', 240, 772, { anchor: 'bc', w: 330, fixed: true })], { mood: 'warm' });
// Hermione turns her full helpfulness on Harry, and on the reader: no frame, just her face on the page (cut-out)
ep.cutout(860, { cam: { head: 'hermione', hw: 0.46, hx: 0.5, hy: 0.54 }, actors: [HE({ turn: -0.1, pose: 'stand', expr: { base: 'delight', eyes: { sparkle: true } } })], behind: RAYS('#dba53a', 0.9, 0.5, 0.54, 240), over: FX.fadeOut(0.88, 0.995) },
  [cap('Hermione\'s eyes lit up with a terrible light of helpfulness. And something in the back of Harry\'s brain screamed in desperate humiliation.', 44, 30, { w: 620, fixed: true })], { mood: 'warm', alt: 'Hermione beams straight out of the page, eyes alight with helpfulness.' });
ep.panel(900, { cam: { on: ['harry', 'hermione'], fr: 'bust', dy: -0.3, zoom: 0.9 }, bg: CH, actors: PAIR({ turn: -0.25, pose: 'wand', expr: 'wince' }, { x: 1620, turn: -0.4, pose: 'lecture', expr: 'smile' }, 'cool') },
  [cap('Five minutes later…', 44, 30, { w: 260, fixed: true }),
   say('Hermione', 'Much better! Just pronounce it more *carefully* next time.', 560, 260, { w: 320, fixed: true }),
   say('Flitwick', 'A point to Miss Granger, for helping!', 250, 820, { anchor: 'bc', w: 320, fixed: true, noTail: true })], { mood: 'warm', alt: 'Harry\'s water is noticeably cooler. Hermione pats him on the head, verbally, and moves on to help someone else.' });
ep.panel(1160, { cam: { on: ['harry'], fr: 'close', dy: 0.35 }, bg: CH, blur: 3, actors: [HS({ expr: 'angry', turn: 0, pose: 'stand', armB: {} })], over: TT_GLINT(50, 0.8) },
  [cap('Harry was gritting his teeth so hard his jaw ached. That wasn\'t helping his pronunciation.', 44, 30, { w: 620, fixed: true }),
   inner('Harry', '*I don\'t care if it\'s unfair competition. I know exactly what I am doing with two extra hours every day. I am going to sit in my trunk and study until I am keeping up with Hermione Granger.*', 400, 1100, { anchor: 'bc', w: 600, fixed: true })], { mood: 'warm', alt: 'Harry, jaw clenched. Under his robes, a glint of the hourglass necklace.' });

// ---------------------------------------------------------------- Transfiguration
ep.beat(200, [plain('*Transfiguration.*', 400, 100, { font: "'IM Fell English', serif", size: 34, color: '#5a4032' })]);
const BOARD = (lines = []) => ({ x: 600, y: -300, w: 1100, h: 560, lines });
const TR = (lines) => () => CS.transfigRoom({ board: BOARD(lines) });
const NOTPERM = [{ t: 'Transfiguration is not permanent!', y: 290, size: 76, underline: 950 }];
const MG = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 1500, y: 900, turn: -0.2, pose: 'lecture', expr: 'stern', ...o });
const TDESK = () => CS.teacherDesk(1000);
const CLASS = (o = {}) => [
  ...[380, 620].map((x, i) => ({ def: [padma, anthony][i], id: 'c' + i, x, y: 1080, s: 1.05, turn: 0.1, pose: 'sit', seat: 140, expr: 'focus', ...((o.c || {})[i] || {}) })),
  { def: harryRaven, id: 'harry', x: 900, y: 1080, s: 1.1, turn: 0.1, pose: 'sit', seat: 140, expr: 'focus', ...(o.h || {}) },
  { def: hermioneRaven, id: 'hermione', x: 1170, y: 1080, s: 1.1, turn: -0.05, pose: 'sit', seat: 140, expr: 'focus', ...(o.he || {}) },
  { def: terry, id: 'terry', x: 1430, y: 1080, s: 1.05, turn: -0.1, pose: 'sit', seat: 140, expr: 'focus', ...((o.c || {})[2] || {}) },
  () => CS.deskRow(1120, { h: 200, items: o.items || [] }),
];
const RAISED = { pose: 'raiseHand', expr: 'focus', turn: 0.2, armF: { sh: -142, el: -12, hand: 'palm' }, armB: { sh: 20, el: 60 } };
ep.bleed(920, { cam: { x: 1130, y: 420, w: 1000 }, bg: TR([]), actors: [MG({ x: 1440, pose: 'stand', turn: -0.3 }), TDESK, ...CLASS()] },
  [say('McGonagall', 'Transfiguration is some of the most complex and dangerous magic you will learn at Hogwarts. Anyone messing around in my class will leave and not come back.', 400, 64, { anchor: 'tc', w: 580, fixed: true }),
   say('McGonagall', 'You have been warned.', 400, 470, { w: 250, fixed: true })], { fadeTop: false, alt: 'The Transfiguration classroom: stern, tidy, a polished wooden board, a tartan hanging. There is no trace of levity on the witch\'s face.' });
const PIG = (x = 1150) => () => g({ transform: `translate(${x},930)` }, P2.pig(1.2, { confused: true }));
// the desk turns into a pig across one slanted seam, the way a transformation snaps from one thing to the next
ep.multi(700, [
  { x: M, y: 18, w: 420, h: 664, mood: 'warm', shape: 'poly', pts: [[0, 0], [1, 0], [0.8, 1], [0, 1]], art: { cam: { x: 1180, y: 640, w: 640 }, bg: TR([]), actors: [MG({ x: 1290, pose: 'wand', expr: 'stern', turn: -0.4, armB: { hand: 'hold', prop: wand(110) } }), TDESK] } },
  { x: 362, y: 18, w: 420, h: 664, mood: 'warm', shape: 'poly', pts: [[0.23, 0], [1, 0], [1, 1], [0.03, 1]], art: { cam: { x: 1070, y: 640, w: 640 }, bg: TR([]), actors: [MG({ x: 1290, pose: 'wand', expr: 'stern', turn: -0.4, armB: { hand: 'hold', prop: wand(110) } }), PIG(1000)] } },
], [cap('*Tap.*', 44, 34, { w: 120, fixed: true }), cap('Her desk became a pig.', 478, 34, { w: 280, fixed: true })],
  { alt: 'McGonagall taps her desk with her wand; it becomes a confused pig. Then a desk again.' });
ep.panel(900, { cam: { x: 1325, y: 460, w: 800 }, bg: TR([]), actors: [MG({ x: 1560, pose: 'point', turn: -0.5, expr: 'stern' }), PIG()] },
  [say('McGonagall', 'Mr Potter. Would you care to guess whether this is a desk which I Transfigured into a pig, or whether it began as a pig? If you had read the first chapter of your textbook, you would know.', 372, 64, { anchor: 'tc', w: 460, fixed: true })], { mood: 'warm', alt: 'McGonagall points at the confused pig.' });
ep.panel(640, { cam: { x: 1100, y: 740, w: 700 }, bg: TR([]), actors: CLASS({ h: { expr: 'think' } }) },
  [say('Harry', 'I\'d guess it\'d be easier to start with a pig, since if it started as a desk, it might not know how to stand up.', 525, 60, { anchor: 'tc', w: 380, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { head: 'mcgonagall', w: 480, hx: 0.76, hy: 0.62 }, bg: TR([]), blur: 2, actors: [MG({ x: 1400, pose: 'lecture', turn: -0.3 })] },
  [say('McGonagall', 'No fault to you, Mr Potter. But the correct answer is that in Transfiguration, you do *not* care to guess.', 290, 64, { anchor: 'tc', w: 380, fixed: true })], { mood: 'warm' });
ep.bleed(1000, { cam: { x: 1130, y: 440, w: 1000 }, bg: TR([]), actors: [MG({ x: 1440, pose: 'gesture', turn: -0.4 }), TDESK, ...CLASS({ h: { expr: 'focus' }, he: { expr: 'determined' } })] },
  [say('McGonagall', 'Wrong answers will be marked with extreme severity. Questions left blank, with great leniency. If I ask you anything, no matter how elementary, and you answer "I\'m not sure", I will not hold it against you. And anyone who laughs will lose House points.', 400, 64, { anchor: 'tc', w: 560, fixed: true })], { alt: 'McGonagall lays down the law to the class.' });
ep.panel(900, { cam: { x: 960, y: 680, w: 560 }, bg: TR([]), blur: 2, actors: CLASS({ h: { expr: 'think' } }) },
  [say('McGonagall', 'Can you tell me why this rule exists, Mr Potter?', 400, 64, { anchor: 'tc', w: 440, fixed: true, noTail: true }),
   inner('Harry', '*Because a single error in Transfiguration can be incredibly dangerous.*', 400, 290, { w: 540, fixed: true }),
   say('Harry', 'No.', 120, 470, { w: 100, fixed: true })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: TR([]), blur: 3, actors: [MG({ x: 1400, expr: { base: 'stern', mouth: { type: 'smile' } } })] },
  [say('McGonagall', 'Correct.', 400, 64, { anchor: 'tc', w: 200, fixed: true })], { mood: 'warm' });
ep.bleed(960, { cam: { x: 1160, y: 405, w: 1000 }, bg: TR(NOTPERM), actors: [MG({ x: 1560, pose: 'point', turn: -0.6, expr: 'yell' })] },
  [shout('McGonagall', 'Transfiguration is not permanent!', 290, 330, { w: 300, size: 28, fixed: true, noTail: true }),
   shout('McGonagall', 'Transfiguration is not permanent!', 300, 555, { w: 330, size: 33, fixed: true, noTail: true }),
   shout('McGonagall', '*Transfiguration is not permanent!*', 350, 870, { anchor: 'bc', w: 380, size: 40, fixed: true })],
  { alt: 'On the board, in red, underlined in blue: Transfiguration is not permanent!' });
ep.panel(860, { cam: { head: 'mcgonagall', w: 600, hx: 0.75, hy: 0.55 }, bg: TR(NOTPERM), actors: [MG({ x: 1560, pose: 'gesture', turn: -0.4, expr: 'stern' })] },
  [say('McGonagall', 'Mr Potter, suppose a student Transfigured a block of wood into a cup of water, and you drank it. What do you imagine might happen to you when the Transfiguration wore off?', 328, 64, { anchor: 'tc', w: 420, fixed: true })], { mood: 'warm' });
ep.panel(520, { cam: { head: 'mcgonagall', w: 440, hx: 0.84, hy: 0.56 }, bg: TR(NOTPERM), blur: 3, actors: [MG({ pose: 'stand', turn: -0.3, expr: { base: 'worried', mouth: { type: 'small' } } })] },
  [say('McGonagall', '…Excuse me, I should not have asked that of you. I forgot you are blessed with an unusually pessimistic imagination—', 270, 250, { w: 370, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: TR(NOTPERM), blur: 2, actors: CLASS({ h: { expr: 'pained' } }) },
  [say('Harry', 'I\'m fine. So the first answer is that I don\'t *know.* But I *imagine* there might be… wood. In my stomach. And in my bloodstream. And if any of that water had been absorbed into my body\'s tissues…', 400, 64, { anchor: 'tc', w: 580, fixed: true }),
   cap('His grasp of magic failed him. He couldn\'t understand how wood mapped into water in the first place.', 44, 790, { w: 620, fixed: true })], { mood: 'warm', alt: 'Harry, gone a little pale.' });
ep.panel(940, { cam: { head: 'mcgonagall', w: 620, hx: 0.74, hy: 0.5 }, bg: TR(NOTPERM), actors: [MG({ expr: 'stern', pose: 'present', turn: -0.4, armB: { sh: 35, el: 55, hand: 'hold', prop: bookOpen({ w: 150, h: 100, col: '#6a2a2a' }) } })] },
  [say('McGonagall', 'As Mr Potter has correctly reasoned, he would become extremely sick, and require immediate Flooing to St Mungo\'s if he was to have any chance of survival.', 320, 64, { anchor: 'tc', w: 440, fixed: true }),
   say('McGonagall', 'Please turn your textbooks to page five.', 205, 470, { w: 240, fixed: true })], { mood: 'warm' });
// the textbook page itself, lying on the reader's own page (cut-out): no panel between us and the picture
ep.cutout(640, (ctx) => rect(62, 70, 350, 520, { fill: '#3a2a1a', opacity: 0.28, filter: 'url(#blur3)', transform: 'rotate(-3 225 320)' }) + g({ transform: 'translate(50,52) rotate(-3 175 260)' }, P2.textbookPage('victim', 350, 520) + '<clipPath id="tbv"><rect x="28" y="31" width="294" height="322"/></clipPath>' + g({ 'clip-path': 'url(#tbv)' }, FX.burst(350, 360, 175, 160, { n: 18, op: 0.25, inner: 70 }))),
  [cap('Even without any sound in the moving picture, you could tell the woman with the discoloured skin was screaming.', 430, 210, { w: 290, fixed: true })],
  { alt: 'A textbook page with a moving picture of a poisoned woman, screaming.' });
ep.panel(740, { cam: { x: 1037, y: 690, w: 560 }, bg: TR(NOTPERM), blur: 2, actors: CLASS({ h: { expr: 'horror' }, he: { expr: 'horror' } }) },
  [say('McGonagall', 'The criminal who Transfigured gold into wine and gave it to this woman to drink, "in payment of the debt", received ten years in Azkaban.', 400, 64, { anchor: 'tc', w: 540, fixed: true, noTail: true })],
  { mood: 'warm', alt: 'Harry and Hermione stare at the page in horror.' });
// the Dementor page: the panel's edges drain away into the page, like everything near a Dementor (dissolve)
ep.panel(1060, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#262a36' }) + g({ transform: `translate(${ctx.w / 2 - 200},290)` }, P2.textbookPage('dementor', 400, 500)) + FX.frost(ctx.w, ctx.h, 0.35, 16),
  [say('McGonagall', 'Page six. That is a Dementor. They are the guardians of Azkaban. They suck away at your magic, your life, and any happy thoughts you try to have.', 400, 64, { anchor: 'tc', w: 540, fixed: true, noTail: true }),
   say('McGonagall', 'The picture on page seven is of the criminal, ten years later, on his release. You will note that he is dead.', 400, 1010, { anchor: 'bc', w: 520, fixed: true, noTail: true })], { frame: 'dissolve', feather: 60, alt: 'Page six: a tall, hooded, cold shape. A Dementor.' });
ep.panel(700, { cam: { x: 1010, y: 690, w: 620 }, bg: TR(NOTPERM), actors: CLASS({ h: { ...RAISED, expr: 'worried' } }) },
  [say('Harry', 'Professor, if the worst happens in a case like that, is there any way of *maintaining* the Transfiguration?', 520, 50, { anchor: 'tc', w: 360, fixed: true })], { mood: 'warm' });
ep.panel(780, { cam: { head: 'mcgonagall', w: 540, hx: 0.23, hy: 0.55 }, bg: TR(NOTPERM), actors: [MG({ pose: 'gesture', turn: 0.3, expr: 'stern' })] },
  [say('McGonagall', 'No. Sustaining a Transfiguration is a constant drain on your magic, and you would need to re-contact the target every few hours. Disasters like this are *unrecoverable!*', 520, 64, { anchor: 'tc', w: 360, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { head: 'mcgonagall', w: 470, hx: 0.58, hy: 0.71 }, bg: TR(NOTPERM), blur: 2, actors: [MG({ pose: 'point', expr: 'cross', turn: -0.3 })] },
  [say('McGonagall', 'You will absolutely never, under any circumstances, Transfigure anything into a liquid or a gas. No water, no air. Nothing like water, nothing like air. You will not Transfigure anything that is to be burned. It will make smoke, and someone could breathe it.', 400, 64, { anchor: 'tc', w: 560, fixed: true })], { mood: 'warm', alt: 'McGonagall leans forward, her face very hard.' });
ep.panel(900, { cam: { x: 880, y: 560, w: 940 }, bg: TR(NOTPERM), actors: [MG({ x: 520, y: 960, pose: 'point', expr: 'stern', turn: 0.5 }), ...CLASS({ h: { expr: 'worried' }, he: { expr: 'focus' }, c: [{}, { expr: 'shock' }, { expr: 'worried' }] }).filter((a) => a.id !== 'c0')] },
  [say('McGonagall', 'You will never Transfigure anything that could conceivably go inside anyone\'s body. No food. Nothing that *looks like* food. Not even as a funny little prank. Is that well understood by *every single student?*', 510, 50, { anchor: 'tc', w: 440, shape: 'box', fixed: true })], { mood: 'warm', alt: 'McGonagall looms over the front row.' });
ep.panel(640, { cam: { x: 1000, y: 790, w: 860 }, bg: TR(NOTPERM), actors: CLASS({ h: { expr: 'worried' }, he: { expr: 'determined' } }) },
  [say('Harry', 'Yes.', 260, 64, { anchor: 'tc', w: 100, fixed: true }), say('Hermione', 'Yes!', 560, 64, { anchor: 'tc', w: 100, fixed: true }),
   cap('Said Harry, Hermione, and a few others. The rest seemed to be speechless.', 44, 520, { w: 620, fixed: true })], { mood: 'warm' });
// the one time she roars: the panel itself explodes (burst)
ep.panel(960, { cam: { head: 'mcgonagall', w: 300, hy: 0.72 }, bg: TR(NOTPERM), blur: 3, actors: [MG({ expr: 'yell', pose: 'fists', turn: 0 })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.55, { n: 30, op: 0.2 }) },
  [shout('McGonagall', '*IS THAT WELL UNDERSTOOD BY EVERY SINGLE STUDENT?*', 400, 150, { anchor: 'tc', w: 440, fixed: true })], { mood: 'warm', shape: 'burst', points: 26, seed: 4, ph: 940, pad: 10 });
// the chant
const CHANT = (t, y, o = {}) => capC(t, 400, y, { w: 620, fixed: true, ...o });
const CHORUS = { h: { expr: 'determined' }, he: { expr: 'determined' }, c: [{ expr: 'worried' }, { expr: 'shock' }, { expr: 'worried' }] };
ep.panel(700, { cam: { x: 900, y: 615, w: 760 }, bg: TR(NOTPERM), actors: CLASS(CHORUS) },
  [cap('"Yes," they said, or muttered, or whispered. Then they repeated the rules along with her, in ragged chorus:', 44, 30, { w: 620, fixed: true }),
   CHANT('I will never Transfigure anything into a liquid or gas.', 185),
   CHANT('I will never Transfigure anything that looks like food, or anything else that goes inside a human body.', 300)],
  { mood: 'warm', alt: 'The whole class chanting the rules.' });
ep.panel(680, { cam: { x: 1035, y: 661, w: 600 }, bg: TR(NOTPERM), actors: CLASS({ ...CHORUS, h: { expr: 'yell' }, he: { expr: 'yell' } }) },
  [CHANT('I will never Transfigure anything that is to be burned, because it could make smoke.', 86, { size: 30 }),
   CHANT('I will never Transfigure anything that looks like money.', 228, { size: 32 })],
  { mood: 'warm', alt: 'Louder now.' });
ep.panel(760, { cam: { head: 'mcgonagall', w: 560, hx: 0.76, hy: 0.55 }, bg: TR(NOTPERM), actors: [MG({ pose: 'gesture', turn: -0.3, expr: 'stern' })] },
  [say('McGonagall', 'Including Muggle money. The goblins have ways of finding out who did it. As a matter of recognised law, the goblin nation is in a permanent state of *war* with all magical counterfeiters.', 300, 60, { anchor: 'tc', w: 420, shape: 'box', fixed: true })], { mood: 'warm' });
ep.panel(520, { cam: { head: 'mcgonagall', w: 360, hx: 0.24, hy: 0.5 }, bg: TR(NOTPERM), blur: 3, actors: [MG({ pose: 'stand', turn: 0.1, expr: { base: 'stern', brows: { angle: -12 } } })] },
  [say('McGonagall', 'They will not send Aurors. They will send an *army.*', 540, 250, { w: 280, fixed: true })], { mood: 'warm' });
ep.panel(700, { cam: { head: 'mcgonagall', w: 420, hx: 0.76, hy: 0.62 }, bg: TR(NOTPERM), blur: 2, actors: [MG({ pose: 'point', turn: -0.3, expr: 'cross' })] },
  [say('McGonagall', 'And *above all*, you will not Transfigure any living subject. *Especially yourselves.*', 260, 64, { anchor: 'tc', w: 340, fixed: true })], { mood: 'warm' });
ep.panel(700, { cam: { x: 1010, y: 720, w: 620 }, bg: TR(NOTPERM), actors: CLASS({ h: RAISED, he: { expr: 'unimpressed' } }) },
  [say('McGonagall', 'Mr Potter is currently holding up his hand, because he has seen an Animagus transformation. But an Animagus transformation is not *free* Transfiguration.', 400, 50, { anchor: 'tc', w: 560, fixed: true, noTail: true })], { mood: 'warm', alt: 'Harry, hand up.' });
const SW = [160, 160, 236, 160], SX = [M, M + 172, M + 344, M + 592];
// the demonstration objects sit on the bare page (cut-outs), one after another, no boxes in the way
ep.multi(346, [0, 1, 2, 3].map((k) => ({ x: SX[k], y: 18, w: SW[k], h: 310, cutout: true, border: 'none', art: (ctx) => ellipse(ctx.w / 2 + 4, ctx.h * 0.34 + (k === 0 || k === 3 ? 44 : 56), 56, 8, { fill: '#3a2a1a', opacity: 0.22, filter: 'url(#blur3)' }) + (k === 2 ? K.glow(ctx.w / 2, ctx.h * 0.34, 110, '#fff6d8', 0.9) : '') + g({ transform: `translate(${ctx.w / 2},${ctx.h * 0.34}) scale(1.35)` },
    k === 0 || k === 3 ? rect(-40, -30, 80, 60, { fill: '#a8784c', stroke: C.ink, 'stroke-width': 3 }) + line(-30, -10, 30, -12, { stroke: '#7a4e2e', 'stroke-width': 2 }) + line(-26, 8, 28, 6, { stroke: '#7a4e2e', 'stroke-width': 2 }) :
    k === 1 ? circle(0, 0, 40, { fill: '#dfeef5', stroke: C.ink, 'stroke-width': 3, opacity: 0.9 }) + circle(-13, -13, 9, { fill: '#fff' }) :
    circle(0, 0, 40, { fill: '#8a929c', stroke: C.ink, 'stroke-width': 3 }) + circle(-13, -13, 9, { fill: '#e9eef2' })) })),
  [capC('wood', 104, 252, { w: 130, fixed: true }), capC('glass', 276, 252, { w: 130, fixed: true }), capC('*Crystferrium!* steel', 486, 248, { w: 170, size: 25, fixed: true }), capC('wood again', 696, 248, { w: 110, fixed: true })],
  { alt: 'A chunk of wood becomes a glass ball, then (Crystferrium!) a steel ball, then wood again.' });
ep.panel(800, { cam: { head: 'mcgonagall', w: 580, hx: 0.22, hy: 0.63 }, bg: TR(NOTPERM), actors: [MG({ pose: 'wandUp', turn: 0.3, expr: 'stern', armB: { hand: 'hold', prop: wand(110) } })] },
  [say('McGonagall', 'Free Transfiguration can turn any subject into any target. It must be done wordlessly: by holding the subject, the target, and the transformation, within your own mind.', 510, 60, { anchor: 'tc', w: 380, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { head: 'mcgonagall', w: 400, hx: 0.55, hy: 0.66 }, bg: TR(NOTPERM), blur: 3, actors: [MG({ pose: 'stand', turn: -0.1, expr: { base: 'stern', mouth: { type: 'flat' } } })], over: (e) => rect(0, 0, e.w, e.h, { fill: '#1a1410', opacity: 0.18 }) },
  [say('McGonagall', 'If you press your wand to your body and imagine yourself with golden hair, afterwards your hair will fall out. And if you Transfigure yourself into an adult body, then, when the Transfiguration wears off, you will die.', 400, 64, { anchor: 'tc', w: 560, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: TR(NOTPERM), blur: 2, actors: CLASS({ h: { ...RAISED, expr: 'think' } }) },
  [inner('Harry', '*That explained why there were still fat boys, and girls who weren\'t perfectly pretty, and old people. That wouldn\'t happen if you could just Transfigure yourself every morning…*', 400, 64, { anchor: 'tc', w: 580, fixed: true }),
   say('Harry', 'Is it possible to Transfigure a living subject into something static, such as a coin—no, excuse me, I\'m terribly sorry, let\'s just say a *steel ball.*', 400, 940, { anchor: 'bc', w: 540, fixed: true })], { mood: 'warm' });
ep.panel(700, { cam: { head: 'mcgonagall', w: 480, hx: 0.79, hy: 0.6 }, bg: TR(NOTPERM), blur: 2, actors: [MG({ pose: 'gesture', expr: 'stern', turn: -0.3 })] },
  [say('McGonagall', 'Mr Potter, even inanimate objects undergo small internal changes over time. For the first minute, you would notice nothing wrong.', 262, 64, { anchor: 'tc', w: 380, fixed: true })], { mood: 'warm' });
ep.panel(480, { cam: { head: 'mcgonagall', w: 330, hx: 0.17, hy: 0.5 }, bg: TR(NOTPERM), blur: 3, actors: [MG({ pose: 'stand', expr: 'stern', turn: 0.2 })], over: (e) => rect(0, 0, e.w, e.h, { fill: '#1a1410', opacity: 0.18 }) },
  [say('McGonagall', 'But in an hour you would be sick. And in a day you would be dead.', 545, 240, { w: 290, fixed: true })], { mood: 'warm' });
ep.panel(720, { cam: { x: 900, y: 600, w: 760 }, bg: TR(NOTPERM), actors: CLASS({ h: { expr: 'focus' }, he: { expr: 'determined' }, c: [{}, { expr: 'worried' }, {}] }) },
  [cap('They repeated the last of the rules:', 44, 30, { w: 440, fixed: true }),
   CHANT('If I am not sure whether a Transfiguration is safe, I will not try it until I have asked Professor McGonagall or Professor Flitwick or Professor Snape or the Headmaster.', 205)],
  { mood: 'warm', alt: 'The class chants the last rules.' });
ep.panel(700, { cam: { x: 1035, y: 646, w: 560 }, bg: TR(NOTPERM), actors: CLASS({ h: { expr: 'yell' }, he: { expr: 'yell' } }) },
  [CHANT('Even if the current Defence Professor tells me that a Transfiguration is safe, and even if I see the Defence Professor do it and nothing bad seems to happen, I will not try it myself.', 150, { size: 30 })],
  { mood: 'warm', alt: 'Harry and Hermione chant the rule about the Defence Professor.' });
ep.panel(720, { cam: { x: 650, y: 628, w: 700 }, bg: TR(NOTPERM), actors: CLASS({ h: { expr: 'determined' }, he: { expr: 'determined' }, c: [{ expr: 'determined' }, { expr: 'worried' }, {}] }) },
  [CHANT('I have the absolute right to refuse to perform any Transfiguration about which I feel the slightest bit nervous. And I certainly will not accept any such order from the Defence Professor, even if the Defence Professor threatens to deduct one hundred House points and have me expelled.', 170)],
  { mood: 'warm', alt: 'The class, chanting the right to refuse.' });
ep.panel(700, { cam: { head: 'mcgonagall', w: 540, hx: 0.24, hy: 0.55 }, bg: TR(NOTPERM), actors: [MG({ pose: 'present', expr: 'stern', turn: 0.3 })] },
  [say('McGonagall', 'We will repeat these rules at the start of every class for the first month. And now, we will begin with matches as subjects, and needles as targets.', 505, 70, { anchor: 'tc', w: 390, fixed: true })], { mood: 'warm' });
const WANDUP = { pose: 'wandUp', expr: 'determined', armB: { sh: 168, el: -8, hand: 'hold', prop: wand(100) } };
ep.panel(600, { cam: { x: 900, y: 700, w: 700 }, bg: TR(NOTPERM), actors: CLASS({ h: WANDUP, he: { ...WANDUP, expr: 'delight' }, c: [WANDUP, WANDUP, WANDUP] }) },
  [say('McGonagall', '…Put away your wands, thank you. By "begin", I meant that you will begin taking notes.', 400, 40, { anchor: 'tc', w: 480, fixed: true, noTail: true })], { mood: 'warm', alt: 'The whole class, wands raised, eager.' });
ep.panel(700, { cam: { x: 1035, y: 790, w: 560 }, bg: TR(NOTPERM), actors: CLASS({ h: { expr: 'exasperated' }, he: { expr: 'happy' }, items: [{ x: 960, fn: (x, y) => g({ transform: `translate(${x},${y - 14}) rotate(84)` }, P2.match(2)) }, { x: 1230, fn: (x, y) => K.glow(x, y - 14, 70, '#fff', 0.8) + g({ transform: `translate(${x},${y - 14}) rotate(84)` }, P2.match(2, 1)) }] }) },
  [cap('At the end of the class, Hermione had a silvery-looking match. The entire rest of the class, Muggle-born or otherwise, had exactly what they\'d started with.', 44, 30, { w: 620, fixed: true }),
   say('McGonagall', 'A point to Ravenclaw.', 560, 650, { anchor: 'bc', w: 300, fixed: true, noTail: true })], { mood: 'warm' });

// ---------------------------------------------------------------- the war
const HH = (o = {}) => ({ def: harryRaven, id: 'harry', x: 900, y: 1080, s: 1.1, turn: 0.3, pose: 'sit', seat: 140, expr: 'neutral', ...o });
const HR = (o = {}) => ({ def: hermioneRaven, id: 'hermione', x: 1200, y: 1080, s: 1.15, turn: -0.4, pose: 'stand', expr: 'smile', ...o });
const WAR = (h = {}, he = {}) => [HH(h), () => CS.deskRow(1120, { h: 200, x1: 1080 }), HR(he)];
ep.panel(860, { cam: { x: 1050, y: 770, w: 560 }, bg: TR(NOTPERM), actors: WAR({}, { pose: 'handsHips' }) },
  [say('Hermione', 'You know, I earned *two* points for Ravenclaw today.', 560, 64, { anchor: 'tc', w: 320, fixed: true }),
   say('Harry', 'So you did.', 190, 230, { w: 180, fixed: true }),
   say('Hermione', 'But that wasn\'t as good as your *seven* points. I guess I\'m just not as intelligent as you.', 240, 815, { anchor: 'bc', w: 330, fixed: true })], { mood: 'warm', alt: 'Hermione, all innocence, at Harry\'s desk.' });
ep.panel(620, { cam: { on: ['hermione'], fr: 'close', dy: 0.1 }, bg: TR(NOTPERM), blur: 3, actors: WAR({}, { expr: { base: 'smile', eyes: { open: 0.6 } } }) },
  [cap('She *batted her eyelashes* at him.', 44, 30, { w: 400, fixed: true })], { mood: 'warm' });
ep.panel(860, { cam: { x: 1110, y: 760, w: 480 }, bg: TR(NOTPERM), blur: 2, actors: WAR({}, { expr: 'smug', pose: 'handsHips' }) },
  [say('Hermione', 'We have lessons every day, though. I wonder how long it will take you to find some more Hufflepuffs to rescue?', 260, 64, { anchor: 'tc', w: 370, fixed: true }),
   say('Hermione', 'Today is Monday. So that gives you until Thursday.', 225, 800, { anchor: 'bc', w: 300, fixed: true })], { mood: 'warm' });
// the stare-down, eye to eye: each panel is an eye (almond)
ep.multi(640, [
  { x: M, y: 96, w: 752, h: 256, mood: 'warm', shape: 'eye', art: { cam: { on: ['harry'], fr: 'eyes' }, bg: TR(NOTPERM), blur: 3, actors: WAR({ expr: { base: 'suspicious', eyes: { open: 0.55 } }, turn: 0.4 }) } },
  { x: M, y: 366, w: 752, h: 256, mood: 'warm', shape: 'eye', art: { cam: { on: ['hermione'], fr: 'eyes' }, bg: TR(NOTPERM), blur: 3, actors: WAR({}, { expr: { base: 'smug', eyes: { open: 0.55 } }, turn: -0.4 }) } },
], [cap('The two of them stared into each other\'s eyes, unblinking.', 44, 22, { w: 700, fixed: true })], { alt: 'Eye to eye.' });
// the declaration of war: one diagonal battle line splits the tile between them
const WARLINE = { x: M, y: 18, w: 764, h: 824 };
ep.multi(860, [
  { ...WARLINE, mood: 'warm', shape: 'poly', pts: [[0, 0], [0.7, 0], [0.3, 1], [0, 1]], art: { cam: { head: 'harry', hw: 0.3, hx: 0.24, hy: 0.52 }, bg: TR(NOTPERM), blur: 2, actors: WAR({ expr: 'menace', turn: 0.4 }, { expr: 'determined', turn: -0.4 }), behind: (e) => FX.burst(e.w, e.h, e.w * 0.24, e.h * 0.52, { n: 30, op: 0.25 }) } },
  { ...WARLINE, mood: 'warm', shape: 'poly', pts: [[0.727, 0], [1, 0], [1, 1], [0.327, 1]], art: { cam: { head: 'hermione', hw: 0.3, hx: 0.76, hy: 0.5 }, bg: TR(NOTPERM), blur: 2, actors: WAR({ expr: 'menace', turn: 0.4 }, { expr: 'determined', turn: -0.4 }), behind: (e) => FX.burst(e.w, e.h, e.w * 0.76, e.h * 0.5, { n: 30, op: 0.25 }) } },
], [say('Harry', 'Of course you realise this means war.', 220, 60, { anchor: 'tc', w: 300, fixed: true, tail: 'harry@0' }),
   say('Hermione', 'I didn\'t know we\'d been at peace.', 590, 820, { anchor: 'bc', w: 300, fixed: true, tail: 'hermione@1' })], { alt: 'Harry and Hermione, eye to eye, a diagonal line between them.' });
ep.panel(840, { cam: { x: 1100, y: 610, w: 980 }, bg: TR(NOTPERM), actors: [MG({ x: 1510, pose: 'handsHips', turn: -0.5, expr: 'smile' }), { def: padma, id: 'padma', x: 640, y: 1080, s: 1.05, turn: 0.4, pose: 'sit', seat: 140, expr: 'awe' }, { def: anthony, id: 'anthony', x: 1440, y: 1080, s: 1.05, turn: -0.4, pose: 'sit', seat: 140, expr: 'awe' }, () => CS.deskRow(1120, { h: 200, x0: 1330 }), ...WAR({ expr: 'menace' }, { expr: 'determined' })] },
  [cap('All of the other students were now watching with fascinated eyes. All of the other students, plus, unfortunately, Professor McGonagall.', 44, 30, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(740, { cam: { head: 'mcgonagall', w: 560, hx: 0.24, hy: 0.56 }, bg: TR(NOTPERM), actors: [MG({ pose: 'present', expr: 'happy', turn: 0.3 })] },
  [say('McGonagall', 'Oh, Mr Potter, I have some good news for you! Madam Pomfrey has approved your suggestion for preventing breakage in her Spimster wickets.', 510, 64, { anchor: 'tc', w: 380, fixed: true })], { mood: 'warm', alt: 'McGonagall, practically singing.' });
ep.panel(480, { cam: { head: 'mcgonagall', w: 360, hx: 0.76, hy: 0.5 }, bg: TR(NOTPERM), blur: 3, actors: [MG({ pose: 'stand', expr: 'smug', turn: -0.2 })] },
  [say('McGonagall', 'I\'d say that deserves… let\'s call it *ten* points for Ravenclaw.', 250, 240, { w: 300, fixed: true })], { mood: 'warm' });
ep.multi(620, [
  { x: M, y: 108, w: 368, h: 494, mood: 'warm', art: { cam: { on: ['hermione'], fr: 'close' }, bg: TR(NOTPERM), blur: 3, actors: WAR({}, { expr: 'horror' }) } },
  { x: 408, y: 108, w: 368, h: 494, mood: 'warm', art: { cam: { on: ['harry'], fr: 'close' }, bg: TR(NOTPERM), blur: 3, actors: WAR({ expr: 'horror' }) } },
], [cap('Hermione\'s face gaped in betrayal and shock. Harry imagined his own didn\'t look much different.', 44, 26, { w: 600, fixed: true })], { alt: 'Two faces of betrayal.' });
const HUP = (o = {}, he = { expr: 'shock' }) => WAR({ pose: 'stand', seat: undefined, y: 1060, turn: 0.3, ...o }, he);
ep.panel(460, { cam: { x: 960, y: 780, w: 520 }, bg: TR(NOTPERM), blur: 2, actors: HUP({ expr: 'angry', pose: 'fists' }) },
  [say('Harry', '*Professor…*', 560, 150, { w: 200, fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: { head: 'mcgonagall', w: 520, hx: 0.73, hy: 0.72 }, bg: TR(NOTPERM), actors: [MG({ pose: 'gesture', turn: -0.3, expr: 'smug' })] },
  [say('McGonagall', 'Those ten points are *unquestionably* deserved, Mr Potter. My, I wonder if any other student has ever earned *seventeen* House points on his first day of lessons? I\'ll have to look it up. Perhaps we should have an announcement at dinner?', 400, 56, { anchor: 'tc', w: 560, shape: 'box', fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { x: 1010, y: 760, w: 480 }, bg: TR(NOTPERM), actors: HUP({ expr: 'yell', pose: 'fists' }), behind: (e) => FX.burst(e.w, e.h, e.w * 0.33, e.h * 0.6, { n: 26, op: 0.2 }) },
  [shout('Harry', '*PROFESSOR!* This is *our* war! Stop *meddling!*', 440, 94, { anchor: 'tc', w: 400, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { head: 'mcgonagall', w: 520, hx: 0.23, hy: 0.58 }, bg: TR(NOTPERM), actors: [MG({ pose: 'handsHips', turn: 0.3, expr: 'smile' })] },
  [say('McGonagall', 'Now you have until Thursday of *next* week, Mr Potter. Unless, of course, you engage in some sort of mischief and *lose* House points before then. Addressing a professor disrespectfully, for example.', 530, 50, { anchor: 'tc', w: 400, shape: 'box', fixed: true })], { mood: 'warm', alt: 'McGonagall, hands on her hips, looking reflective.' });
ep.panel(460, { cam: { head: 'mcgonagall', w: 440, hx: 0.86, hy: 0.52 }, bg: TR(NOTPERM), blur: 3, actors: [MG({ pose: 'stand', expr: { base: 'smile', eyes: { open: 0.6 } }, turn: -0.2 })] },
  [say('McGonagall', 'I expect you\'ll hit negative numbers before the end of Friday.', 282, 230, { w: 380, shape: 'box', fixed: true })], { mood: 'warm' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: TR(NOTPERM), blur: 3, actors: WAR({ pose: 'stand', seat: undefined, y: 1060, expr: 'menace' }) },
  [cap('Harry\'s mouth snapped shut. He sent his best Death Glare. She only seemed to find it amusing.', 44, 30, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { head: 'mcgonagall', w: 560, hx: 0.76, hy: 0.6 }, bg: TR(NOTPERM), actors: [MG({ pose: 'present', turn: -0.4, expr: 'smile' })] },
  [say('McGonagall', '…and if anyone comes to you for help with their schoolwork, and is disappointed that you haven\'t even started reading your textbooks, you can always refer them to Miss Granger.', 285, 56, { anchor: 'tc', w: 400, shape: 'box', fixed: true })], { mood: 'warm' });
ep.panel(560, { cam: { x: 1150, y: 800, w: 520 }, bg: TR(NOTPERM), actors: HUP({ expr: 'shock' }, { expr: 'yell', pose: 'fists' }), behind: (e) => FX.burst(e.w, e.h, e.w * 0.62, e.h * 0.5, { n: 24, op: 0.2 }) },
  [shout('Hermione', '*Professor!*', 290, 130, { w: 240, fixed: true })], { mood: 'warm' });
ep.panel(600, { cam: { head: 'mcgonagall', w: 400, hx: 0.2, hy: 0.52 }, bg: TR(NOTPERM), blur: 3, actors: [MG({ pose: 'stand', turn: 0.2, expr: 'smile' })] },
  [say('McGonagall', 'My, I wonder how long it will take before Miss *Granger* does something deserving of a dinner-time announcement? I look forward to seeing it.', 525, 290, { w: 340, shape: 'box', fixed: true })], { mood: 'warm' });
const COR = () => CS.corridor({ seed: 31, windows: [400, 1600], torches: [1000] });
// they storm out so fast that Harry marches straight out of the panel (breakout)
ep.panel(640, { cam: { x: 776, y: 600, w: 820 }, bg: COR, actors: [{ def: harryRaven, id: 'harry', x: 1250, y: 900, s: 1.1, turn: 0.7, pose: 'walk', expr: 'angry' }, { def: hermioneRaven, id: 'hermione', x: 1050, y: 900, s: 1.1, turn: 0.7, pose: 'walk', expr: 'cross' }, ...[0, 1, 2, 3].map((i) => ({ def: [padma, anthony, terry, michael][i], id: 'r' + i, x: 800 - i * 170, y: 900, s: 1.05, turn: 0.6, pose: 'walk', expr: 'awe' }))] },
  [cap('Harry and Hermione, by unspoken mutual consent, turned and stormed out of the classroom. They were followed by a trail of hypnotised Ravenclaws.', 40, 30, { w: 610, fixed: true })], { breakout: 'right', w: 640, alt: 'Harry and Hermione storm down the corridor side by side; a line of Ravenclaws trails behind, entranced.' });
const HW = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1250, y: 900, s: 1.1, turn: -0.3, pose: 'walk', expr: 'neutral', ...o });
const HEW = (o = {}) => ({ def: hermioneRaven, id: 'hermione', x: 950, y: 900, s: 1.1, turn: 0.3, pose: 'walk', expr: 'neutral', ...o });
ep.panel(1040, { cam: { x: 1100, y: 596, w: 640 }, bg: COR, actors: [HEW({ expr: 'smug' }), HW({ expr: 'embarrassed' })] },
  [say('Harry', 'Um. Are we still on for after dinner?', 540, 36, { anchor: 'tc', w: 300, fixed: true }),
   say('Hermione', 'Of course. I wouldn\'t want you to fall *further behind* on your studying.', 250, 196, { anchor: 'tc', w: 330, shape: 'box', fixed: true }),
   say('Harry', 'Why, thank you. And as brilliant as you are already, I can\'t help but wonder what you\'ll be like once you have some elementary training in rationality.', 400, 990, { anchor: 'bc', w: 540, fixed: true })], { mood: 'warm' });
ep.panel(960, { cam: { x: 1100, y: 630, w: 640 }, bg: COR, actors: [HEW({ expr: 'smug', pose: 'stand' }), HW({ expr: 'deadpan' })] },
  [say('Hermione', 'Is it really that useful? It didn\'t seem to help you with Charms or Transfiguration.', 255, 50, { anchor: 'tc', w: 330, fixed: true }),
   cap('There was a slight pause.', 432, 306, { w: 300, fixed: true }),
   say('Harry', 'Well, I only got my schoolbooks four days ago. That\'s why I had to earn those seventeen House points *without using my wand.*', 400, 910, { anchor: 'bc', w: 540, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { head: 'hermione', w: 420, hx: 0.48, hy: 0.57 }, bg: COR, actors: [HEW({ expr: 'smug', pose: 'gesture', turn: 0.2 })] },
  [say('Hermione', 'Four days ago? Maybe you can\'t read eight books in four days, but you might at least have read *one.* How many days will it take you at that rate?', 400, 64, { anchor: 'tc', w: 560, fixed: true }),
   say('Hermione', 'You know all that mathematics. So can you tell me what\'s eight, times four, divided by zero?', 400, 940, { anchor: 'bc', w: 500, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'waist', dy: -0.3 }, bg: COR, actors: [HW({ expr: 'focus', pose: 'think', turn: -0.2 })] },
  [say('Harry', 'I\'ve got classes now, which you didn\'t. But weekends are free, so… the limit of eight times four divided by epsilon, as epsilon approaches zero from above…', 400, 64, { anchor: 'tc', w: 560, fixed: true }),
   say('Harry', '10:47 on Sunday.', 400, 940, { anchor: 'bc', w: 260, fixed: true })], { mood: 'warm' });
ep.panel(620, { cam: { on: ['hermione'], fr: 'close' }, bg: COR, blur: 3, actors: [HEW({ expr: 'smug' })] },
  [say('Hermione', 'I did it in *three* days, actually.', 400, 64, { anchor: 'tc', w: 360, fixed: true })], { mood: 'warm' });
// Harry leans out of the comic to share his secret with the reader (cut-out): only we can see the Time-Turner
ep.cutout(940, { cam: { head: 'harry', hw: 0.42, hx: 0.5, hy: 0.4 }, actors: [HW({ expr: { base: 'scheme', eyes: { lookX: 0.3 } }, turn: -0.1 })], over: (e) => FX.fadeOut(0.84, 0.99)(e) + TT_GLINT(60, 0.9)(e) },
  [say('Harry', '2:47 on Saturday it is, then.', 400, 64, { anchor: 'tc', w: 340, fixed: true }),
   say('Harry', 'I\'m sure I\'ll find the time somewhere.', 630, 790, { w: 230, fixed: true })], { mood: 'warm', alt: 'Harry smiles. Something glints gold under his robes.' });
ep.setBg('#2a2440');
ep.bleed(1000, { cam: { x: 800, y: 380, w: 1500 }, bg: () => HG.lakeNight({ boats: [] }) + rect(-400, -800, 2400, 1500, { fill: '#e8a86a', opacity: 0.22, style: 'mix-blend-mode:soft-light' }) },
  [capC('And there was evening, and there was morning: the first day.', 400, 860, { w: 520, fixed: true })], { mood: 'dusk', alt: 'The castle across the lake, windows lit, as evening falls.' });
ep.setBg(C.paper);
ep.end();
export default ep;
