// EPISODE 17 — The Most Dangerous Student  (source: HPMOR ch. 16)
// Quirrell's first lesson. Harry is finally taken seriously by a teacher: as a killer.
import { Episode, say, shout, whisper, inner, cold, cap, title, sfx, M } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, rng } from '../engine/core/svg.js';
import * as CS from '../engine/bg/castle.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { quirrell, student } from '../engine/chars/cast.js';
import { harryRaven, hermioneRaven, dracoSly, crabbe, goyle, terry, anthony, padma, michael, dean, zabini, ernie, nevilleHuff } from '../engine/chars/cast2.js';
import { wand, bookHeld, bookOpen, quill } from '../engine/props/props.js';
import * as P2 from '../engine/props/props2.js';
import { dayBeat, header } from './b2.js';

const ep = new Episode({ id: 'ep17', number: 17, title: 'The Most Dangerous Student' });
ep.setBg(C.paper);
header(ep, 'SEVENTEEN', 'The Most Dangerous Student');
dayBeat(ep, 'Wednesday.', 'If you wanted to be specific, 2:23 on Wednesday afternoon. (Harry\'s watch said 11:23.)');

// ---------------------------------------------------------------- staging
const ST = (o = {}) => () => CS.defenceStage(o);
const TI = () => CS.defenceTiers();
const Q = (o = {}) => ({ def: quirrell, id: 'quirrell', x: 1000, y: 690, turn: 0.1, pose: 'stand', expr: 'calm', ...o });
const QDESK = () => CS.defenceDesk(1000, 700);
const WAND = (o = {}) => ({ hand: 'hold', prop: wand(100), ...o });
const rowY = (k) => CS.FLOOR - k * CS.ROW + 60;
// the tiers, seen from the stage. who: overrides by id
const SEATS = (o = {}) => {
  const who = o.who || {};
  const R = rng(3);
  const rows = [
    [[dean, 'dean', 400], [student(1701, 'g'), 'g1', 650], [dracoSly, 'draco', 950], [crabbe, 'crabbe', 1180], [goyle, 'goyle', 720 + 900], [zabini, 'zabini', 1900]],
    [[student(1702, 'h'), 'h1', 300], [ernie, 'ernie', 560], [nevilleHuff, 'neville', 820], [student(1703, 's'), 's1', 1300], [student(1704, 's'), 's2', 1560]],
    [[padma, 'padma', 420], [hermioneRaven, 'hermione', 700], [anthony, 'anthony', 980], [student(1705, 'g'), 'g2', 1400], [student(1706, 'g'), 'g3', 1680]],
    [[student(1707, 'h'), 'h2', 500], [student(1708, 'g'), 'g4', 900], [michael, 'michael', 1250], [student(1709, 'r'), 'r1', 1600]],
    [[terry, 'terry', 1050], [harryRaven, 'harry', 1450], [student(1710, 's'), 's3', 700]],
  ];
  const out = [];
  for (let k = rows.length - 1; k >= 0; k--) {
    for (const [def, id, x] of rows[k]) out.push({ def, id, x, y: rowY(k), s: 1.05, turn: R.range(-0.15, 0.15), pose: 'sit', seat: 140, expr: 'neutral', ...(who[id] || {}) });
    out.push(() => CS.tierFront(k, { screens: rows[k].map(([, , x]) => x + 95), lit: o.lit }));
  }
  return out;
};
const HB = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1450, y: rowY(4), s: 1.1, turn: -0.1, pose: 'sitRead', seat: 140, expr: 'focus', armF: { prop: bookHeld('#3b3242', { rot: 180, w: 60, h: 80 }) }, ...o });

// Quirrell slumped at his desk; the drool is scaled to his head so it reads at any zoom
const DROOL = (e) => { const a = e.anchors.quirrell; if (!a) return ''; const k = a.hr / 40; return path(`M${a.mouth[0] + 8 * k},${a.mouth[1] + 7 * k} q${3 * k},${14 * k} ${1 * k},${26 * k}`, { fill: 'none', stroke: '#bfe0f0', 'stroke-width': Math.max(2, 2.6 * k), 'stroke-linecap': 'round' }) + circle(a.mouth[0] + 9 * k, a.mouth[1] + 34 * k, 3 * k, { fill: '#bfe0f0' }); };
const QSLUMP = (o = {}) => Q({ pose: 'sit', seat: 150, y: 690, expr: { base: 'asleep', mouth: { type: 'o' } }, turn: 0, poseMod: { lean: -6, armF: { sh: 4, el: 4 }, armB: { sh: -4, el: 4 } }, ...o });
// the empty back desks in the foreground (the view from the seats): desk rows with blank white screens
const FGDESKS = (y0, s = 1.4) => () => g({ transform: `translate(1000,${y0}) scale(${s}) translate(-1000,${-(CS.FLOOR + 30 - 120)})` }, CS.tierFront(0, { screens: [140, 480, 820, 1160, 1500, 1840] }));
// the way in: the panel is the classroom's stone doorway, so the reader steps into the hall with Harry
ep.panel(1340, { cam: { x: 1000, y: 540, w: 1150 }, bg: ST({}), actors: [QSLUMP(), QDESK, FGDESKS(1190, 1.7)], over: DROOL },
  [cap('The Defence classroom was the largest Harry had yet seen at Hogwarts: tier upon tier of desks, facing a gigantic flat stage of white marble. On a raised dais of darker marble stood a lone teacher\'s desk.', 44, 40, { w: 640, fixed: true }),
   cap('At which Professor Quirrell sat slumped in his chair, head lolled back, drooling slightly over his robes.', 64, 1000, { w: 600, fixed: true })], { shape: 'gothic', frame: 'stone', spring: 0.36, ph: 1130, y: 192, alt: 'Through a tall stone doorway: a vast hall with a white marble stage. Rows of empty desks, each with a blank white screen. Quirrell slumps at the lone desk like a switched-off puppet.' });
ep.panel(620, { cam: { on: ['quirrell'], fr: 'close', dy: 0.2 }, bg: ST({}), blur: 3, actors: [QSLUMP(), QDESK], over: DROOL },
  [inner('Harry', '*Now what does that remind me of…?*', 400, 50, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: { x: 1420, y: rowY(4) - 275, w: 640 }, bg: TI, actors: [HB({ x: 1420, turn: 0.15, pose: 'sit', headTilt: 8, armF: undefined, expr: { base: 'focus', eyes: { lookY: 0.6 } } }), () => CS.tierFront(4, { screens: [1100, 1740] }), () => g({ transform: `translate(1420,${CS.FLOOR - 4 * CS.ROW - 90}) rotate(-4)` }, bookOpen({ w: 150, h: 90, col: '#3b3242' })), () => CS.tierFront(3, { screens: [1000, 1300, 1620, 1920] })] },
  [cap('Harry had got there so early that nobody else had arrived. (English was defective when it came to time travel. In particular, it lacked any words for how *convenient* it was.)', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'Harry alone in the back row, reading, surrounded by empty desks.' });

// ---------------------------------------------------------------- minions
// Draco and his minions stand in the aisle at the end of Harry's row (no desk in front of them, so the looming reads);
// Harry sits behind his desk. Crabbe (the muscle) and Goyle (the balanced stance) tower behind Draco, leaning in.
const DR = (o = {}) => ({ def: dracoSly, id: 'draco', x: 1130, y: rowY(4), s: 1.1, turn: 0.4, pose: 'stand', expr: 'smug', ...o });
const LOOM = { base: 'menace', eyes: { open: 0.8, style: 'normal', lidTilt: -0.5, pupil: 0.32, lookX: 0.5 }, brows: { raise: -0.6, inner: -1.3 }, mouth: { type: 'line', curve: -0.5, w: 0.9 } };
const CR = (o = {}) => ({ def: crabbe, id: 'crabbe', x: 900, y: rowY(4) + 10, s: 1.36, turn: 0.4, pose: 'fists', lean: 22, expr: LOOM, ...o });
const GO = (o = {}) => ({ def: goyle, id: 'goyle', x: 650, y: rowY(4), s: 1.3, turn: 0.4, pose: 'stand', lean: 18, expr: LOOM, ...o });
const MIN = (d = {}, c = {}, go = {}, h = {}) => [GO(go), CR(c), DR(d), HB({ pose: 'sit', turn: -0.4, expr: 'neutral', armF: undefined, ...h }), () => CS.tierFront(4, { x0: 1290, screens: [1660, 1980] })];
ep.panel(800, { cam: { x: 1050, y: -110, w: 940 }, bg: TI, actors: MIN({ expr: 'shock' }, {}, {}, { expr: 'shock' }) },
  [say('Draco', 'Potter? What are *you* doing here?', 240, 36, { anchor: 'tc', w: 300, fixed: true }),
   say('Harry', 'Draco? What are *you* doing in oh my god you have *minions.*', 540, 150, { anchor: 'tc', w: 320, fixed: true })], { mood: 'candle', alt: 'Draco in the aisle by Harry\'s desk, with two very large boys looming behind him.' });
ep.panel(1000, { cam: { x: 900, y: -200, w: 680 }, bg: TI, actors: MIN({ expr: 'smug', pose: 'present' }) },
  [cap('One of the lads standing behind Draco had rather a lot of muscle for an eleven-year-old. The other stood in a suspiciously balanced-looking stance.', 44, 30, { w: 620, fixed: true }),
   say('Draco', 'Potter, I introduce to you Mr Crabbe, and Mr Goyle.', 560, 196, { anchor: 'tc', w: 300, fixed: true }),
   say('Crabbe', 'Please ta meetcha.', 420, 950, { anchor: 'bc', w: 240, fixed: true })], { mood: 'candle', alt: 'Crabbe and Goyle, trying very hard to loom: leaning forward, hunching their shoulders, necks stuck out.' });
ep.panel(1100, { cam: { x: 1290, y: -40, w: 720 }, bg: TI, actors: MIN({ pose: 'lecture', expr: 'smug' }, {}, {}, { expr: 'bigGrin', pose: 'armsUp' }) },
  [say('Harry', 'You have *minions!* Where do *I* get minions?', 580, 36, { anchor: 'tc', w: 290, fixed: true }),
   say('Draco', 'I\'m afraid, Potter, that the first step is to be Sorted into Slytherin.', 232, 180, { anchor: 'tc', w: 300, fixed: true }),
   say('Harry', 'What? That\'s not fair!', 590, 880, { anchor: 'bc', w: 240, fixed: true }),
   say('Draco', 'And then for your families to have an arrangement from before you were born.', 262, 1040, { anchor: 'bc', w: 340, fixed: true })], { mood: 'candle' });
ep.panel(900, { cam: { on: ['harry'], fr: 'waist', dy: -0.6 }, bg: TI, blur: 2, actors: MIN({}, {}, {}, { expr: 'scheme', pose: 'point' }) },
  [say('Harry', 'Um, hold on. So they\'ve been told their *whole lives* that they\'re going to be your minions, and they\'ve spent *years* imagining what minions are supposed to be like—', 400, 50, { anchor: 'tc', w: 560, fixed: true })], { mood: 'candle' });
// the loom: their heads push up over the top of the frame, into the reader's space
ep.panel(940, { cam: { x: 815, y: 120, w: 490 }, bg: TI, blur: 2, actors: [GO(), CR()] },
  [say('Harry', '…and what\'s worse, they *do* know *each other*, and they\'ve been *practising—*', 330, 34, { anchor: 'tc', w: 480, fixed: true, noTail: true })], { mood: 'candle', breakout: 'top', ph: 540, panel: { y: 382 }, alt: 'Crabbe and Goyle, looming in perfect unison, their heads rising over the top of the frame.' });
const PICK = line(-4, 4, 44, -2, { stroke: '#f1e6cc', 'stroke-width': 6, 'stroke-linecap': 'round' });
const KNUCK = { armF: { sh: 26, el: 72, hand: 'fist' }, armB: { sh: 6, el: 8 } };
// kids' hands hide inside their wide sleeves, so the knuckle-crack gets drawn over the near hand: a fist pushed into a palm
const CRACK = (a) => { const k = a.hr / 95, [x, y] = a.handF, sk = '#efc9a8', st = { stroke: C.ink, 'stroke-width': 3 * k, 'stroke-linejoin': 'round' };
  return g({ transform: `translate(${x},${y}) scale(${k})` }, ellipse(18, 10, 34, 26, { fill: '#d09c7c', ...st }), ellipse(-6, 0, 28, 24, { fill: sk, ...st }),
    path('M-24,-8 q8,-8 16,0 M-10,-10 q8,-8 16,0 M4,-8 q8,-8 14,2', { fill: 'none', stroke: C.ink, 'stroke-width': 2.4 * k })); };
ep.multi(760, [
  { x: M, y: 18, w: 368, h: 724, mood: 'candle', art: { cam: { on: ['goyle'], fr: 'close', zoom: 1.6, dy: -0.4 }, bg: TI, blur: 2, actors: MIN({}, {}, { pose: 'hold', lean: 10, armF: { sh: 24, el: 128, hand: 'hold', prop: PICK }, armB: { sh: 8, el: 6 } }) } },
  { x: 408, y: 18, w: 368, h: 724, mood: 'candle', art: { cam: { on: ['crabbe'], fr: 'close', zoom: 1.2, dy: 0.05 }, bg: TI, blur: 2, actors: MIN({}, { pose: 'stand', lean: 6, turn: 0.25, poseMod: KNUCK }), over: (e) => { const a = e.anchors.crabbe; return a ? CRACK(a) : ''; } } },
], [say('Crabbe', 'The boss told ya to shut it.', 592, 40, { anchor: 'tc', w: 280, fixed: true }), sfx('crack crack', 610, 540, { size: 42, rot: -10, font: "'Caveat', cursive" })],
  { alt: 'Goyle produces a toothpick and begins cleaning his teeth, still looming. Crabbe cracks his knuckles.' });
const DYELL = { base: 'yell', brows: { raise: -0.5, inner: -1.5, outer: 0.3 }, eyes: { open: 0.9, lidTilt: -0.45 } };
ep.panel(820, { cam: { x: 1070, y: -165, w: 480 }, bg: TI, blur: 2, actors: MIN({ expr: DYELL, turn: -0.4, pose: 'fists' }), over: (e) => { const a = e.anchors.draco; return a ? FX.emanata(a.head[0], a.head[1] - a.hr * 0.4, a.hr * 1.7, { n: 7 }) : ''; } },
  [shout('Draco', '*I told you not to do this in front of Harry Potter!*', 440, 84, { anchor: 'tc', w: 400, fixed: true })], { mood: 'candle', alt: 'Draco rounds on his two looming minions.' });
ep.multi(620, [
  { x: M, y: 18, w: 368, h: 584, mood: 'candle', art: { cam: { x: 880, y: -150, w: 560 }, bg: TI, actors: MIN({ turn: -0.4, expr: 'cross' }, { pose: 'stand', lean: 0, expr: 'embarrassed', turn: 0.2 }, { pose: 'stand', lean: 0, expr: 'embarrassed', turn: 0.2 }) } },
  { x: 408, y: 18, w: 368, h: 584, mood: 'candle', art: { cam: { x: 890, y: -150, w: 560 }, bg: TI, actors: MIN({ turn: 0.6, expr: 'smug' }, { pose: 'fists', expr: LOOM }, { expr: LOOM }) } },
], [cap('The two looked a bit sheepish.', 40, 34, { w: 270, fixed: true }), cap('But the moment Draco turned away, they went back to looming.', 424, 34, { w: 290, fixed: true })], { alt: 'Sheepish; then, the instant Draco looks away, looming again.' });
ep.panel(1100, { cam: { x: 1270, y: -20, w: 720 }, bg: TI, actors: MIN({ expr: { base: 'calm', eyes: { open: 0.6 } }, turn: 0.3, pose: 'bow', lean: -20 }, {}, {}, { expr: 'smile', pose: 'sit' }) },
  [say('Draco', 'I apologise for the insult which these *imbeciles* have offered you.', 250, 50, { anchor: 'tc', w: 320, fixed: true }),
   say('Harry', 'I\'d say you\'re being a little harsh on them, Draco. *I* think they\'re acting exactly the way I\'d want *my* minions to act. I mean, if I had any minions.', 505, 1036, { anchor: 'bc', w: 380, fixed: true })], { mood: 'candle' });
ep.panel(560, { cam: { head: 'draco', hw: 0.3, hx: 0.5, hy: 0.5 }, bg: TI, blur: 3, actors: MIN({ expr: { base: 'shock', mouth: { type: 'o', open: 1.3 } }, turn: 0.3 }, { x: 700 }, { x: 500 }) },
  [cap('Draco\'s jaw dropped.', 44, 30, { w: 280, fixed: true })], { mood: 'candle', shape: 'burst', points: 26, seed: 4 });
ep.panel(1100, { cam: { x: 760, y: -100, w: 640 }, bg: TI, actors: MIN({}, { expr: 'suspicious', turn: -0.35, lean: 10, pose: 'stand' }, { expr: 'think', turn: 0.4, lean: 8 }) },
  [say('Crabbe', 'Hey, Gregory, you don\' think he\'s tryna lure us away from the boss, do ya?', 520, 52, { anchor: 'tc', w: 330, fixed: true }),
   say('Goyle', 'I\'m sure Mr Potter wouldn\'t be that foolish.', 230, 250, { anchor: 'tc', w: 280, fixed: true }),
   say('Harry', 'Oh, I wouldn\'t dream of it. It\'s just something to keep in mind if your current employer seems unappreciative.', 400, 1050, { anchor: 'bc', w: 520, fixed: true, noTail: true })], { mood: 'candle', alt: 'Crabbe and Goyle confer in a stage whisper.' });
ep.panel(860, { cam: { x: 780, y: -110, w: 560 }, bg: TI, actors: MIN({}, { expr: 'confused' }, { expr: 'smug' }) },
  [say('Crabbe', 'What\'s *he* doin\' in Ravenclaw?', 570, 40, { anchor: 'tc', w: 280, fixed: true }),
   say('Goyle', 'I can\'t imagine, Mr Crabbe.', 222, 190, { w: 260, fixed: true })], { mood: 'candle' });
ep.panel(620, { cam: { x: 960, y: -170, w: 560 }, bg: TI, blur: 2, actors: MIN({ expr: 'cross', turn: -0.4, pose: 'lecture' }, { expr: 'embarrassed', lean: 0, pose: 'stand' }, { expr: 'embarrassed', lean: 0 }) },
  [say('Draco', 'Both of you *shut up.* That\'s an *order.*', 560, 40, { anchor: 'tc', w: 300, fixed: true })], { mood: 'candle' });
ep.panel(1260, { cam: { x: 1250, y: -345, w: 540 }, bg: TI, blur: 2, actors: MIN({ expr: 'exasperated', pose: 'shrug', turn: 0.35 }, {}, {}, { expr: 'smile' }) },
  [say('Draco', 'You\'re confusing everyone, you know. Warrington said spending a long time under the Sorting Hat is a warning sign of a major Dark Wizard.', 340, 50, { anchor: 'tc', w: 480, fixed: true }),
   say('Draco', 'People were wondering if they should start sucking up to you. Then you protected a bunch of *Hufflepuffs*, for Merlin\'s sake. *Then* you told Derrick he\'s a disgrace to Salazar Slytherin. What\'s anyone *supposed* to think?', 460, 340, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust', dy: -0.1 }, bg: TI, blur: 2, actors: MIN({}, {}, {}, { expr: 'grin' }) },
  [say('Harry', 'That the Sorting Hat put me in the House of "Slytherin! Just kidding! Ravenclaw!", and I\'ve been acting accordingly.', 400, 50, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle' });
ep.panel(560, { cam: { x: 790, y: -200, w: 560 }, bg: TI, actors: MIN({ expr: 'exasperated', turn: 0.4 }, { expr: 'laugh', lean: 4, pose: 'stand' }, { expr: { base: 'laugh', eyes: { style: 'happy' }, mouth: { type: 'line' } }, lean: 4, pose: 'hold', armF: { sh: 30, el: 132, hand: 'palm' }, armB: { sh: 8, el: 6 } }), over: (e) => { const a = e.anchors.crabbe, b = e.anchors.goyle; if (!a || !b) return ''; const k = b.hr / 95;
    // Goyle's palm clapped over his mouth, drawn big enough to cover the engine's own (small) hand under it
    const px = b.mouth[0] * 0.6 + b.handF[0] * 0.4, py = b.mouth[1] * 0.6 + b.handF[1] * 0.4;
    return FX.emanata(a.head[0], a.head[1], a.hr * 1.6, { n: 6 }) + g({ transform: `translate(${px},${py}) scale(${k})` }, ellipse(0, 4, 38, 30, { fill: '#e8c2a0', stroke: C.ink, 'stroke-width': 3 }), path('M-22,-14 q4,18 0,34 M-5,-21 q4,22 0,44 M13,-17 q4,20 0,38', { fill: 'none', stroke: '#c99a78', 'stroke-width': 2.5 })); } },
  [cap('Mr Crabbe and Mr Goyle both giggled, causing Mr Goyle to quickly clap a hand over his mouth.', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
ep.panel(960, { cam: { x: 1270, y: -4, w: 720 }, bg: TI, actors: MIN({ expr: 'calm', pose: 'stand' }, {}, {}, { expr: 'neutral' }) },
  [say('Draco', 'I do want to continue our last conversation. And I accept your conditions.', 300, 40, { anchor: 'tc', w: 360, fixed: true }),
   say('Harry', 'Would you mind terribly waiting until Saturday? I\'m in a bit of a contest. See if I can read all my textbooks as fast as Hermione Granger did.', 480, 910, { anchor: 'bc', w: 400, fixed: true })], { mood: 'candle' });
ep.panel(640, { cam: { head: 'draco', hw: 0.3, hx: 0.5, hy: 0.68 }, bg: TI, blur: 2, actors: MIN({ expr: 'smug', pose: 'stand' }, {}, {}, { expr: 'neutral' }) },
  [say('Draco', 'Granger. The mudblood who thinks she\'s Merlin? If you\'re trying to show *her* up, then all Slytherin wishes you the *very* best of luck, Potter.', 400, 50, { anchor: 'tc', w: 520, fixed: true })], { mood: 'candle' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: TI, blur: 3, actors: [HB({ expr: 'deadpan', armF: undefined, pose: 'sit' })] },
  [inner('Harry', '*Oh, this is going to be* so *much fun to juggle. I can already tell.*', 400, 64, { anchor: 'tc', w: 480, fixed: true })], { mood: 'candle' });

// ---------------------------------------------------------------- Battle Magic
ep.panel(1000, { cam: { x: 1120, y: 190, w: 1100 }, bg: TI, actors: SEATS({ lit: true }), over: (e) => K.glow(e.w / 2, e.h / 2, 900, '#dfe6ea', 0.15) },
  [cap('At 2:35, Professor Quirrell gave a sudden jerk in his chair and sat up straight. And his face appeared on all the flat, white rectangles propped up on the students\' desks.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'The tiers, now full: all four Houses. On every desk, a white screen showing Quirrell\'s face.' });
// the screen: the reader watches Quirrell's face the way Harry does, as if it were television; Harry in an inset below
const TVBG = (e) => rect(0, 0, e.w, e.h, { fill: '#bccfd9' }) + K.glow(e.w * 0.55, e.h * 0.38, e.w * 0.5, '#f4f8fa', 0.6);
const TVOVER = (e) => { let o = ''; for (let y = 3; y < e.h; y += 7) o += line(0, y, e.w, y, { stroke: '#5a6a78', 'stroke-width': 1.2, opacity: 0.08 });
  return o + path(`M${e.w * 0.62},0 L${e.w * 0.86},0 L${e.w * 0.5},${e.h} L${e.w * 0.26},${e.h}Z`, { fill: '#ffffff', opacity: 0.12 }); };
ep.multi(960, [
  { x: M, y: 176, w: 764, h: 766, shape: 'screen', borderWidth: 7, art: { cam: { head: 'quirrell', hw: 0.27, hx: 0.58, hy: 0.36 }, under: TVBG, actors: [Q({ turn: 0, expr: 'calm', y: 900 })], over: TVOVER } },
  { x: M, y: 560, w: 360, h: 382, mood: 'candle', shadow: true, art: { cam: { head: 'harry', hw: 0.36, hx: 0.42, hy: 0.46 }, bg: TI, actors: [HB({ x: 1400, turn: 0.35, pose: 'sit', armF: undefined, expr: { base: 'teary', eyes: { lookY: -0.3, lookX: 0.6 } } }), () => CS.tierFront(4, { screens: [1580], lit: true })] } },
], [cap('It was so much like Muggle television. There was something both nostalgic and sad about it. So much like a piece of home, and yet it wasn\'t, really.', 44, 30, { w: 620, fixed: true })],
  { alt: 'Quirrell\'s face on a desk screen, like a television. Below, Harry watches it, a little teary.' });
const QS = (o = {}) => ({ def: quirrell, id: 'quirrell', x: 1000, y: 700, turn: 0.05, pose: 'stand', expr: 'calm', ...o });
// the class seen from behind, in the foreground (a view over the students' heads toward the stage)
const HAIRS = ['#2a1d14', '#6a4a2a', '#c9a45a', '#1a1414', '#8a4a22', '#3a2a1a', '#e2cf92', '#4a3222'];
const BACKS = (y, xs, s = 1) => () => xs.map((x, i) => g({ transform: `translate(${x},${y + (i % 2) * 30}) scale(${s})` },
  path('M-130,260 Q-126,70 -48,40 L48,40 Q126,70 130,260Z', { fill: '#1c1822', stroke: C.ink, 'stroke-width': 3 }),
  ellipse(-64, -26, 13, 20, { fill: '#e9c4a4', stroke: C.ink, 'stroke-width': 2.5 }), ellipse(64, -26, 13, 20, { fill: '#e9c4a4', stroke: C.ink, 'stroke-width': 2.5 }),
  ellipse(0, -44, 66, 76, { fill: HAIRS[i % HAIRS.length], stroke: C.ink, 'stroke-width': 3 }))).join('');
// Quirrell's "wrongness": the doom scanlines plus a faint reddish vignette closing in from the edges
const DOOMV = (seed, k = 1) => (e) => { const id = `dv${seed}`; return FX.doom(e.w, e.h, seed) +
  `<defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.75"><stop offset="0.55" stop-color="#2a0010" stop-opacity="0"/><stop offset="1" stop-color="#2a0010" stop-opacity="${0.45 * k}"/></radialGradient></defs>` + rect(0, 0, e.w, e.h, { fill: `url(#${id})` }); };
const STU = () => BACKS(930, [420, 760, 1100, 1440, 1780], 1.2);
ep.panel(1150, { cam: { x: 1000, y: 350, w: 930 }, bg: ST({}), actors: [QS({ pose: 'present', expr: 'coldSmile' }), QDESK, STU()] },
  [say('Quirrell', 'Good afternoon, my young apprentices. Welcome to your first lesson in Battle Magic, as the founders of Hogwarts would have put it. Or, as it happens to be called in the late twentieth century, Defence Against the Dark Arts.', 400, 62, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle', alt: 'Over the heads of the class: Quirrell on his dais, wide awake now.' });
// parchment and a quill on the desk top in front of a seated student (row k)
const SCRIB = (list) => () => list.map(([x, k], i) => g({ transform: `translate(${x - 30},${CS.FLOOR - k * CS.ROW + 30 - 116}) rotate(${i % 2 ? 4 : -5})` },
  path('M-60,-8 L50,-12 L56,6 L-56,10Z', { fill: '#f1e6cc', stroke: C.ink, 'stroke-width': 2 }), g({ transform: 'translate(34,-40) rotate(28)' }, quill(90)))).join('');
const DOWN = (expr) => ({ expr: { base: expr, eyes: { lookY: 0.7 } }, lean: 8, turn: 0.1 });
// (row 2 is left empty here: its desks sit under the caption)
const GONE = { x: -9999 };
ep.panel(720, { cam: { x: 820, y: 560, w: 700 }, bg: TI, actors: [...SEATS({ lit: true, who: { dean: DOWN('focus'), g1: DOWN('worried'), draco: DOWN('focus'), ernie: DOWN('worried'), neville: DOWN('worried'), h1: DOWN('focus'), padma: GONE, hermione: GONE, anthony: GONE, g2: GONE, g3: GONE } }), SCRIB([[400, 0], [650, 0], [950, 0], [300, 1], [560, 1], [820, 1]])] },
  [cap('There was a certain amount of frantic scrabbling for parchment.', 44, 30, { w: 560, fixed: true })], { mood: 'candle' });
ep.panel(900, { cam: { on: ['quirrell'], fr: 'waist', dy: -0.9 }, bg: ST({}), blur: 2, actors: [QDESK, QS({ pose: 'raiseHand', expr: 'stern', turn: 0.15 })] },
  [say('Quirrell', 'No. Don\'t bother writing down what this subject was once called. No such pointless question will count toward your marks in any of my lessons. That is a promise.', 400, 50, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle' });
ep.panel(1000, { cam: { x: 1330, y: 470, w: 780 }, bg: ST({}), actors: [QS({ x: 1450, y: 920, pose: 'walk', expr: 'coldSmile', turn: -0.55 })] },
  [say('Quirrell', 'Those of you who have wasted time by reading your useless first-year Defence textbooks—', 400, 50, { anchor: 'tc', w: 480, fixed: true }),
   cap('Someone made a choking sound. Harry wondered if it was Hermione.', 44, 800, { w: 300, fixed: true })], { mood: 'candle', alt: 'Quirrell strides across the white marble stage.' });
// the monsters: silhouettes conjured by the lecture
const INK2 = '#141018';
const DRAGON = () => g({},
  path('M-150,20 Q-320,70 -360,-40 Q-370,-110 -300,-120 Q-330,-70 -300,-20 Q-240,40 -130,-10Z', { fill: INK2 }),
  path('M-40,-50 L-120,-340 L-40,-250 L20,-400 L80,-240 L150,-330 L140,-110Z', { fill: '#1e1826' }),
  path('M-40,-50 L-120,-340 M20,-400 L20,-60 M150,-330 L110,-80', { fill: 'none', stroke: INK2, 'stroke-width': 10 }),
  ellipse(0, 0, 160, 80, { fill: INK2 }),
  rect(-100, 40, 36, 110, { fill: INK2, rx: 12 }), rect(70, 40, 36, 110, { fill: INK2, rx: 12 }),
  path('M110,-40 Q220,-140 190,-280', { fill: 'none', stroke: INK2, 'stroke-width': 64, 'stroke-linecap': 'round' }),
  path('M160,-320 L290,-300 L300,-284 L220,-276 L286,-250 L180,-250 Q150,-280 160,-320Z', { fill: INK2 }),
  path('M175,-318 L160,-370 L200,-322Z M205,-314 L200,-360 L228,-312Z', { fill: INK2 }),
  path('M292,-282 Q420,-320 560,-270 Q430,-240 292,-270Z', { fill: '#ff8a3a', opacity: 0.95 }), path('M300,-280 Q400,-300 500,-272 Q400,-258 300,-274Z', { fill: '#ffd27a' }));
const TROLL = (o = {}) => g({},
  o.stump ? '' : path('M-100,-330 Q-190,-200 -170,-40', { fill: 'none', stroke: INK2, 'stroke-width': 56, 'stroke-linecap': 'round' }),
  o.stump ? path('M-100,-330 Q-150,-270 -150,-230', { fill: 'none', stroke: '#2e3a26', 'stroke-width': 50, 'stroke-linecap': 'round', opacity: 0.85 }) : '',
  path('M-120,0 L-110,-200 Q-150,-320 -70,-380 Q0,-410 70,-380 Q150,-320 115,-200 L110,0 L50,0 L40,-120 L-40,-120 L-50,0Z', { fill: INK2 }),
  circle(10, -420, 44, { fill: INK2 }), circle(-6, -426, 6, { fill: '#e7bb4f' }), circle(24, -426, 6, { fill: '#e7bb4f' }),
  path('M100,-330 Q180,-230 190,-130', { fill: 'none', stroke: INK2, 'stroke-width': 56, 'stroke-linecap': 'round' }),
  g({ transform: 'translate(190,-120) rotate(-24)' }, path('M-16,20 L-26,-240 Q0,-290 26,-240 L16,20Z', { fill: '#2a2018', stroke: INK2, 'stroke-width': 6 })));
const BEAST = (kind, o = {}) => (ctx) => {
  let out = rect(0, 0, ctx.w, ctx.h, { fill: '#2a2230' }) + K.glow(ctx.w / 2, ctx.h * (o.gy ?? 0.6), 520, kind === 'dragon' ? '#ff7a3a' : '#7a8a6a', 0.35);
  if (kind === 'dragon') out += g({ transform: `translate(${ctx.w * 0.4},${ctx.h * (o.y ?? 0.72)}) scale(${o.s ?? 1.05})` }, DRAGON());
  else out += g({ transform: `translate(${ctx.w * (o.x ?? 0.5)},${ctx.h * (o.y ?? 0.97)}) scale(${o.s ?? 1.3})` }, TROLL(o));
  if (o.regrow) out += K.glow(ctx.w * (o.x ?? 0.5) - 150 * (o.s ?? 1.3), ctx.h * (o.y ?? 0.97) - 280 * (o.s ?? 1.3), 140, '#b8f07a', 0.55) + FX.emanata(ctx.w * (o.x ?? 0.5) - 160 * (o.s ?? 1.3), ctx.h * (o.y ?? 0.97) - 250 * (o.s ?? 1.3), 70, { n: 6, a0: 120, a1: 240, col: '#c8f08a', w: 5 });
  return out;
};
ep.bleed(1400, BEAST('dragon', { y: 0.73 }),
  [shout('Quirrell', 'The Hungarian Horntail is taller than a dozen men! It breathes fire so quickly and so accurately that it can melt a Snitch in mid-flight!', 400, 124, { anchor: 'tc', w: 460, fixed: true, noTail: true }),
   shout('Quirrell', 'One Killing Curse will bring it down!', 400, 1340, { anchor: 'bc', w: 400, fixed: true, noTail: true })], { alt: 'A dragon\'s silhouette, wings raised, breathing a jet of fire.' });
ep.bleed(1500, BEAST('troll', { y: 0.99, s: 1.3, gy: 0.8 }),
  [shout('Quirrell', 'The Mountain Troll is more dangerous than the Hungarian Horntail! It is strong enough to bite through steel! Its hide withstands Stunning Hexes and Cutting Charms! Its sense of smell can tell from afar whether its prey is part of a pack, or alone and vulnerable!', 400, 150, { anchor: 'tc', w: 480, fixed: true, noTail: true })], { alt: 'A mountain troll\'s silhouette, club in hand, small yellow eyes.' });
ep.bleed(1250, BEAST('troll', { y: 1.02, s: 1.25, x: 0.62, stump: true, regrow: true, gy: 0.8 }),
  [shout('Quirrell', 'It is always Transfiguring itself into its own body. Rip off its arm, and it will grow another within seconds! Fire and acid will confuse its regeneration, for an hour or two!', 400, 124, { anchor: 'tc', w: 480, fixed: true, noTail: true })], { alt: 'The troll\'s torn-off arm already growing back, glowing.' });
ep.panel(1000, { cam: { x: 1070, y: 360, w: 480 }, bg: ST({}), actors: [QDESK, QS({ pose: 'wandUp', expr: 'coldSmile', turn: 0.2, armB: WAND() })], over: (e) => { const a = e.anchors.quirrell; return a ? K.glow(a.handB[0] + a.hr * 1.5, a.handB[1] - a.hr * 0.8, a.hr * 1.6, '#6ad07a', 0.6) + circle(a.handB[0] + a.hr * 1.5, a.handB[1] - a.hr * 0.8, a.hr * 0.18, { fill: '#c8ffb0' }) : ''; } },
  [say('Quirrell', 'The mountain troll is the third most perfect killing machine in all Nature! One Killing Curse will bring it down.', 400, 950, { anchor: 'bc', w: 520, fixed: true })], { mood: 'candle' });
ep.panel(900, { cam: { head: 'quirrell', hw: 0.24, hx: 0.48, hy: 0.68 }, bg: ST({}), blur: 2, actors: [QDESK, QS({ pose: 'holdUp', expr: { base: 'unimpressed', eyes: { lookY: -0.4, lookX: 0.4 } }, turn: 0.2, armB: { hand: 'hold', under: g({ transform: 'translate(0,84)' }, bookHeld('#6a5a3a', { rot: 180, w: 70, h: 94 })) } })] },
  [say('Quirrell', 'Your sad excuse for a textbook will suggest you expose the troll to sunlight. You do not encounter mountain trolls in open daylight!', 400, 50, { anchor: 'tc', w: 520, fixed: true })], { mood: 'candle', alt: 'Quirrell holds up the first-year textbook between two fingers, like something unpleasant.' });
ep.panel(1050, { cam: { x: 1080, y: 515, w: 820 }, bg: ST({}), actors: [QDESK, QS({ x: 1080, y: 960, pose: 'shrug', expr: 'smile', turn: -0.15 }), BACKS(1130, [700, 1480], 1.5)] },
  [say('Quirrell', 'If, as an adult wizard, you find yourself incapable of the Killing Curse, you can simply Apparate away. Likewise if you face the *second* most perfect killing machine: a Dementor. You just Apparate away!', 400, 60, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle' });
ep.panel(1000, { cam: { x: 1010, y: 175, w: 330 }, bg: ST({}), blur: 3, actors: [QS({ turn: 0.35, expr: { base: 'calm', eyes: { style: 'cold', open: 0.7 } } })], over: DOOMV(71, 0.8) },
  [say('Quirrell', 'Unless, of course, you are under the influence of an anti-Apparition jinx. No. There is exactly one monster which can threaten you once you are fully grown. The single most dangerous monster in all the world.', 400, 60, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle', alt: 'Quirrell\'s voice goes low and hard. The air around him feels subtly wrong.' });
const LIDS = (e) => `<defs><linearGradient id="lid72" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a0610" stop-opacity="0.7"/><stop offset="0.34" stop-color="#1a0610" stop-opacity="0"/><stop offset="0.7" stop-color="#1a0610" stop-opacity="0"/><stop offset="1" stop-color="#1a0610" stop-opacity="0.6"/></linearGradient></defs>` + rect(0, 0, e.w, e.h, { fill: 'url(#lid72)' });
// the eyes: the panel itself becomes an eye, the reader held in Quirrell's stare
ep.panel(574, { cam: { head: 'quirrell', hw: 0.8, hx: 0.5, hy: 0.4 }, bg: ST({}), blur: 3, actors: [QS({ turn: 0.05, expr: { base: 'calm', eyes: { style: 'cold', open: 0.62 }, brows: { raise: -0.3, inner: -0.5 } } })], over: (e) => DOOMV(72, 1.8)(e) + LIDS(e) },
  [say('Quirrell', '*The Dark Wizard.*', 400, 556, { anchor: 'bc', w: 300, fixed: true, noTail: true })], { mood: 'candle', shape: 'eye', ph: 372, borderWidth: 5, alt: 'His eyes, very close, framed in an eye-shaped panel. Something about them is wrong.' });
ep.bleed(1320, { cam: { x: 1060, y: 350, w: 600 }, bg: ST({}), actors: [QDESK, QS({ pose: 'point', expr: { base: 'yell', eyes: { open: 0.85, style: 'normal', lidTilt: -0.35 }, brows: { raise: -0.2, inner: -1.3, outer: 0.4 }, mouth: { type: 'shout', open: 0.9 } }, turn: 0.1 })] },
  [shout('Quirrell', 'There is no defence without offence! There is no defence without fighting!', 400, 96, { anchor: 'tc', w: 420, fixed: true }),
   shout('Quirrell', 'This reality is deemed too harsh for eleven-year-olds by the fat, overpaid, Auror-guarded politicians who mandated your curriculum.', 400, 1215, { anchor: 'bc', w: 440, fixed: true })], { alt: 'Quirrell jabs a finger at the class.' });
// the triumph: no frame at all, Quirrell flings his arms wide on the page itself, straight at the reader
ep.cutout(1150, { cam: { head: 'quirrell', hw: 0.175, hx: 0.5, hy: 0.15 }, actors: [QS({ pose: 'armsUp', expr: { base: 'yell', eyes: { open: 1, style: 'normal' }, brows: { raise: 0.7, inner: 0.2 }, mouth: { type: 'shout', open: 1.1 } }, turn: 0 })], behind: (e) => { const a = e.anchors.quirrell; return a ? FX.burst(e.w, e.h, a.head[0], a.head[1], { n: 34, op: 0.2, inner: a.hr * 4 }) : ''; } },
  [shout('Quirrell', 'To the abyss with those fools! Welcome to your first year of *Battle Magic!*', 400, 1060, { anchor: 'bc', w: 440, fixed: true })], { alt: 'Quirrell, arms flung wide, triumphant, standing on the bare page with no frame around him.' });
// Harry claps: the palms are drawn over his hands (kids' hands hide in their wide sleeves)
const CLAP = (a) => { const k = a.hr / 95, [x, y] = a.handF, st = { fill: '#f1d2b4', stroke: C.ink, 'stroke-width': 3 * k };
  return g({ transform: `translate(${x},${y}) scale(${k}) rotate(-12)` }, ellipse(-10, 0, 22, 34, st), ellipse(12, -4, 22, 34, st)); };
ep.panel(820, { cam: { x: 1330, y: rowY(4) - 230, w: 620 }, bg: TI, actors: [{ def: terry, id: 'terry', x: 1130, y: rowY(4), s: 1.05, turn: 0.35, pose: 'sit', seat: 140, expr: 'shock' }, HB({ x: 1450, pose: 'stand', seat: undefined, expr: 'bigGrin', armF: { sh: 22, el: 100, hand: 'palm' }, armB: { sh: -22, el: -100, hand: 'palm', front: true }, turn: -0.15 }), () => CS.tierFront(4, { screens: [1250, 1600], lit: true })], over: (e) => { const a = e.anchors.harry; return a ? CLAP(a) + FX.emanata(a.handF[0], a.handF[1], a.hr * 0.6, { n: 5 }) : ''; } },
  [sfx('clap clap clap', 590, 170, { size: 42, rot: -6, font: "'Caveat', cursive" }),
   cap('Harry started applauding. He couldn\'t help himself. It was too inspiring. (The rest of the class seemed too stunned to react.)', 44, 630, { w: 620, fixed: true })], { mood: 'candle' });
ep.panel(900, { cam: { x: 1000, y: 355, w: 760 }, bg: ST({}), actors: [QDESK, QS({ y: 800, pose: 'sit', seat: 250, expr: 'smile', turn: 0.15 })] },
  [say('Quirrell', 'Now to practicalities. I have combined all my first-year classes into one, which allows me to offer you twice as much classroom time as Doubles sessions—', 400, 50, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle', alt: 'Quirrell perches on the front of his desk, relaxed.' });
ep.panel(880, { cam: { x: 820, y: CS.FLOOR - 352, w: 700 }, bg: TI, blur: 2, actors: SEATS({ lit: true, who: { hermione: { expr: 'gasp' }, padma: { expr: 'horror' }, dean: { expr: 'horror' }, g1: { expr: 'gasp' }, draco: { expr: 'shock' }, ernie: { expr: 'horror' }, neville: { expr: 'gasp' }, h1: { expr: 'shock' } } }) },
  [cap('*Gasps of horror.*', 44, 30, { w: 260, fixed: true }),
   say('Quirrell', '…an increased load which I will make up to you by not assigning any homework.', 400, 832, { anchor: 'bc', w: 460, fixed: true, noTail: true })], { mood: 'candle' });
ep.multi(720, [
  // Harry is only *imagining* Hermione's face, so it floats in a thought-cloud
  { x: M, y: 168, w: 372, h: 520, mood: 'candle', shape: 'cloud', seed: 5, art: { cam: { head: 'hermione', hw: 0.46, hx: 0.5, hy: 0.46 }, bg: TI, blur: 2, actors: SEATS({ lit: true, who: { hermione: { expr: 'horror' } } }) } },
  { x: 408, y: 18, w: 368, h: 684, mood: 'candle', art: { cam: { on: ['harry'], fr: 'close', zoom: 1.15, dy: 0.3 }, bg: TI, blur: 2, actors: SEATS({ lit: true, who: { harry: { expr: { base: 'delight', eyes: { sparkle: true } } } } }), over: (e) => { const a = e.anchors.harry; return a ? FX.sparkles([[a.head[0] - a.hr * 1.25, a.head[1] - a.hr * 0.2, a.hr * 0.22], [a.head[0] + a.hr * 1.3, a.head[1] - a.hr * 0.5, a.hr * 0.28], [a.head[0] + a.hr * 1.45, a.head[1] + a.hr * 0.3, a.hr * 0.16]], { stroke: C.ink }) : ''; } } },
], [cap('Harry was pretty sure he was imagining Hermione\'s face accurately.', 40, 34, { w: 290, fixed: true }), cap('Also, Harry was in love. It would be a three-way wedding: him, the Time-Turner, and Professor Quirrell.', 424, 690, { anchor: 'bl', w: 290, fixed: true })],
  { alt: 'Hermione\'s appalled face, as Harry imagines it, in a thought-cloud. Harry, in love.', over: () => [[462, 250, 8], [436, 282, 12], [404, 318, 16]].map(([x, y, r]) => circle(x, y, r, { fill: '#f7f0e0', stroke: C.ink, 'stroke-width': 3 })).join('') });
ep.panel(1100, { cam: { x: 1000, y: 270, w: 820 }, bg: ST({}), actors: [QS({ pose: 'gesture', expr: 'scheme', turn: 0.15 }), QDESK, BACKS(800, [600, 930, 1260, 1590], 1.3)] },
  [say('Quirrell', 'For those who so choose, I have arranged some after-school activities. Do you want to show the world your *own* abilities, instead of watching fourteen other people play Quidditch? More than seven people can fight in an *army.*', 400, 56, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle' });
ep.panel(1100, { cam: { x: 1020, y: 140, w: 480 }, bg: ST({}), blur: 2, actors: [QDESK, QS({ pose: 'pointUp', expr: 'scheme', turn: 0.2 })] },
  [say('Quirrell', 'And for Christmas, I will grant someone a wish. Any school-related feat within my power, my influence, or above all, my ingenuity. Yes, I was in Slytherin, and I am offering to formulate a cunning plot on your behalf. The wish goes to whoever has earned the most *Quirrell points.*', 400, 60, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: TI, blur: 3, actors: [HB({ pose: 'sit', armF: undefined, expr: 'scheme' })] },
  [inner('Harry', '*Hot* damn. *That would be Harry.*', 400, 64, { anchor: 'tc', w: 380, fixed: true })], { mood: 'candle' });
ep.panel(950, { cam: { x: 1150, y: 380, w: 1000 }, bg: ST({}), actors: [QDESK, QS({ pose: 'present', expr: 'coldSmile', turn: 0.3 })] },
  [say('Quirrell', 'Now leave your books at your desks, and come down onto this platform. It\'s time to play a game called *Who\'s the Most Dangerous Student in the Classroom.*', 400, 50, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle', alt: 'Quirrell gestures to the wide, empty expanse of white marble.' });

// ---------------------------------------------------------------- the Simple Strike Hex
const PR = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1300, y: 960, s: 1.1, turn: -0.3, pose: 'wandUp', expr: 'focus', armB: WAND(), ...o });
// wand tip in panel coords: out along the shoulder-to-hand line (the wand is 100 long, held in the B hand)
const TIP = (a, len = 90) => { const dx = a.handB[0] - a.neck[0], dy = a.handB[1] - a.neck[1], d = Math.hypot(dx, dy) || 1; return [a.handB[0] + dx / d * len * a.s, a.handB[1] + dy / d * len * a.s]; };
const SPH8 = [[-340, -156], [57, 86], [363, -5], [640, -126], [989, -168], [1357, -142], [1644, 16], [1965, 128]]; // where ST({ spheres: 8 }) puts its spheres
const LINE = (o = {}) => [{ def: padma, id: 'padma', x: 860, y: 960, s: 1.05, turn: 0.3, pose: 'wandUp', expr: 'focus', armB: WAND() }, { def: dean, id: 'dean', x: 1320, y: 960, s: 1.05, turn: 0.3, pose: 'wandUp', expr: 'focus', armB: WAND() }, PR({ x: 1560, turn: 0.3, ...(o.h || {}) }), { def: ernie, id: 'ernie', x: 1090, y: 960, s: 1.05, turn: 0.3, pose: 'wandUp', expr: 'focus', armB: WAND() }];
ep.bleed(1100, { cam: { x: 1270, y: 420, w: 1000 }, bg: ST({ spheres: 8 }), actors: [...LINE({ h: { expr: { base: 'focus', eyes: { lookY: -0.5, lookX: 0.2 } } } })], over: (e) => { const a = e.anchors.harry; if (!a) return ''; const t = TIP(a), sp = e.toPanel(SPH8[6]); return P2.bolt(t[0], t[1], sp[0], sp[1] + 20, { seed: 3 }); } },
  [say('Harry', '*Ma-ha-su!*', 540, 690, { anchor: 'bc', w: 220, fixed: true }),
   sfx('bing!', 700, 110, { size: 50, rot: -8, font: "'Caveat', cursive" }),
   cap('Professor Quirrell had dug up a spell that was incredibly easy to pronounce, with a ridiculously simple wand motion, which tended to hit wherever you happened to be looking. Useless in real combat, he said. It hurt about as much as a hard punch on the nose.', 30, 30, { w: 440, fixed: true })],
  { alt: 'On the marble stage, the first-years in lines, firing red bolts at floating blue spheres. Harry\'s sphere goes "bing".' });
// the thrill: the panel itself leans, like Harry skipping from side to side
ep.panel(1100, { cam: { on: ['harry'], fr: 'waist', dy: -0.2, zoom: 0.85, roll: -5 }, bg: ST({ spheres: 6 }), actors: [PR({ expr: { base: 'bigGrin', eyes: { sparkle: true } }, pose: 'wandUp', turn: -0.1 })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.45, { n: 26, col: '#ff9a7a', op: 0.2 }), over: (e) => { const a = e.anchors.harry; if (!a) return ''; const t = TIP(a); return P2.bolt(t[0], t[1], e.w * 0.06, e.h * 0.22, { seed: 5 }) + P2.bolt(t[0], t[1], e.w * 0.3, e.h * 0.12, { seed: 9 }); } },
  [cap('Harry was feeling like a real wizard for the first time since he\'d come to Hogwarts.', 44, 40, { w: 620, fixed: true }),
   shout('Harry', '*I can do magic! Fear me, laws of physics, I\'m coming to violate you!*', 430, 1060, { anchor: 'bc', w: 480, fixed: true, type: 'thought' })], { shape: 'slant', slant: -70, alt: 'Harry skipping left and right, firing bolt after bolt, grinning like mad, in a leaning panel.' });
// Hermione
const DA = (o = {}) => ({ def: hermioneRaven, id: 'hermione', x: 800, y: 700, s: 1.1, turn: 0.2, pose: 'stand', expr: 'determined', ...o });
const CROWD = (o = {}) => [
  ...[[padma, 'padma', 200], [anthony, 'anthony', 380], [terry, 'terry', 560], [michael, 'michael', 740]].map(([def, id, x]) => ({ def, id, x, y: 1040, s: 1.05, turn: 0.2, expr: 'worried', ...((o.who || {})[id] || {}) })),
  ...(o.harry !== false ? [{ def: harryRaven, id: 'harry', x: 1650, y: 1040, s: 1.1, turn: -0.3, expr: 'worried', ...(o.h || {}) }] : []),
  ...[[dracoSly, 'draco', 1300], [crabbe, 'crabbe', 1150], [goyle, 'goyle', 1450], [zabini, 'zabini', 1850]].map(([def, id, x]) => ({ def, id, x, y: 1060, s: 1.08, turn: -0.2, expr: 'smug', ...((o.who || {})[id] || {}) })),
];
ep.panel(1000, { cam: { x: 1000, y: 520, w: 1500 }, bg: ST({}), actors: [QDESK, QS({ x: 1200, pose: 'present', expr: 'calm' }), DA({ pose: 'walk' }), ...CROWD({ h: { expr: 'cross' } })] },
  [say('Quirrell', 'There is one student who mastered the Sumerian Simple Strike Hex faster than anyone else, and went on to help seven other students. Come forth, Hermione Granger.', 400, 64, { anchor: 'tc', w: 580, fixed: true }),
   cap('Somewhere in the back of Harry\'s mind was the fear that Hermione was simply smarter than him.', 44, 860, { w: 620, fixed: true })], { mood: 'candle' });
ep.panel(1100, { cam: { x: 1020, y: 390, w: 700 }, bg: ST({}), actors: [QDESK, QS({ x: 1200, pose: 'gesture', expr: 'coldSmile', turn: -0.3 }), DA({ expr: 'shock' })] },
  [say('Quirrell', 'Could Miss Granger\'s intelligence make her the most dangerous student in the classroom? Let\'s find out, shall we?', 470, 64, { anchor: 'tc', w: 460, fixed: true }),
   say('Quirrell', 'Select any student you like, and cast the Simple Strike Hex on them.', 470, 1040, { anchor: 'bc', w: 420, fixed: true })], { mood: 'candle' });
ep.panel(1000, { cam: { on: ['hermione'], fr: 'bust', dy: -0.1 }, bg: ST({}), blur: 2, actors: [DA({ expr: { base: 'pained', eyes: { open: 1 } }, pose: 'wand', armB: WAND() })], over: (e) => { const a = e.anchors.hermione; return a ? FX.emanata(a.head[0], a.head[1], a.hr * 1.5, { n: 6 }) : ''; } },
  [say('Quirrell', 'Come now. You have cast this spell perfectly over fifty times. It hurts as much as a hard punch, and lasts only a few seconds.', 400, 64, { anchor: 'tc', w: 540, fixed: true, noTail: true }),
   say('Quirrell', 'This is a direct order from your professor, Miss Granger. If you do *not* fire, you will lose a Quirrell point.', 400, 940, { anchor: 'bc', w: 520, fixed: true, noTail: true })], { mood: 'candle', alt: 'Hermione\'s face screwed up in horror, her wand trembling.' });
// Harry taps his own chest (the rig's hand, out past the cuff, on his chest; little tap marks beside it)
const TAP = (a) => { const [x, y] = a.handF; return FX.emanata(x, y, a.hr * 0.5, { n: 3, a0: -160, a1: -110, w: 3 }); };
ep.panel(820, { cam: { x: 1650, y: 820, w: 420 }, bg: ST({}), actors: [{ def: harryRaven, id: 'harry', x: 1650, y: 1040, s: 1.1, turn: -0.3, pose: 'stand', expr: 'determined', armF: { sh: 2, el: 132, hand: 'palm' } }], over: (e) => { const a = e.anchors.harry; return a ? TAP(a) : ''; } },
  [inner('Harry', '*Pick me. I\'m not afraid…*', 400, 40, { anchor: 'tc', w: 340, fixed: true }),
   cap('His right hand was softly tapping his own chest, willing her to look his way.', 44, 790, { anchor: 'bl', w: 620, fixed: true })], { mood: 'candle' });
// the refusal: no frame, Hermione simply stands there on the page, calm
ep.cutout(860, { cam: { head: 'hermione', hw: 0.29, hx: 0.42, hy: 0.345 }, actors: [DA({ expr: { base: 'calm', eyes: { soft: true, lookX: 0.3 }, mouth: { type: 'line', curve: 0.05, w: 0.7 } }, pose: 'stand', turn: 0.3, armF: { ...WAND(), sh: 10, el: 8 } })] },
  [cap('Hermione\'s wand twitched. Then her face relaxed, and she lowered her wand to her side.', 44, 30, { w: 620, fixed: true }),
   say('Hermione', 'No.', 650, 270, { w: 120, fixed: true })], { alt: 'Hermione, calm now, wand lowered, standing on the bare page.' });
ep.panel(560, { cam: { x: 1000, y: 520, w: 1500 }, bg: ST({}), actors: [QDESK, QS({ x: 1200 }), DA({ expr: 'calm' }), ...CROWD({})] },
  [cap('Her voice was calm, and even though it wasn\'t loud, everyone heard it in the silence.', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
ep.panel(1060, { cam: { x: 1010, y: 440, w: 720 }, bg: ST({}), actors: [QDESK, QS({ x: 1200, pose: 'stand', expr: 'calm', turn: -0.3 }), DA({ expr: { base: 'determined', eyes: { teary: true } } })] },
  [say('Quirrell', 'Then I must deduct one point from you. This is a test, and you have failed it.', 460, 40, { anchor: 'tc', w: 440, fixed: true }),
   say('Quirrell', 'Knowing things isn\'t always enough, Miss Granger. If you cannot give and receive violence on the order of stubbing your toe, then you cannot defend yourself. Please rejoin your classmates.', 420, 1000, { anchor: 'bc', w: 520, fixed: true })], { mood: 'candle', alt: 'That reached her. But she keeps her shoulders straight.' });
ep.panel(680, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: ST({}), blur: 2, actors: [{ def: harryRaven, id: 'harry', x: 1650, y: 1040, s: 1.1, turn: -0.3, expr: { base: 'awe', eyes: { soft: true } } }] },
  [cap('Her face looked peaceful. And Harry, for some odd reason, wanted to start clapping. Even though Professor Quirrell had been *right.*', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
// Draco
ep.panel(1100, { cam: { x: 1100, y: 520, w: 1500 }, bg: ST({}), actors: [QDESK, QS({ x: 1250, pose: 'point', expr: 'coldSmile' }), { def: dracoSly, id: 'draco', x: 950, y: 700, s: 1.1, turn: 0.2, pose: 'stand', expr: 'smug' }, ...CROWD({ who: { draco: { x: -9999 } } })] },
  [say('Quirrell', 'It becomes clear that Hermione Granger is not the most dangerous student in the classroom. Who do you think might actually be the most dangerous person here? Besides me, of course.', 400, 64, { anchor: 'tc', w: 580, fixed: true }),
   say('Quirrell', 'Draco, of the Noble and Most Ancient House of Malfoy. Come forth. …Mr Malfoy. *Fire.*', 430, 1040, { anchor: 'bc', w: 480, fixed: true })], { mood: 'candle' });
// the strike: a diagonal-cut panel, the whole picture tipping with Draco's spin
ep.panel(900, { cam: { x: 880, y: 720, w: 880 }, bg: ST({}), actors: [{ def: hermioneRaven, id: 'hermione', x: 600, y: 860, s: 1.0, turn: 0.3, pose: 'fallBack', expr: 'wince' }, { def: dracoSly, id: 'draco', x: 1180, y: 1110, s: 1.35, turn: -0.7, pose: 'wand', lean: -4, expr: { base: 'cold', eyes: { lookX: -0.6 } }, armB: WAND() }], behind: (e) => FX.speedLines(e.w, e.h, { n: 26, col: '#6a6470' }), over: (e) => { const d = e.anchors.draco, h = e.anchors.hermione; if (!d || !h) return ''; const t = TIP(d, 95); return P2.bolt(t[0], t[1], h.neck[0] + h.hr * 0.3, h.neck[1] + h.hr * 0.4, { seed: 11 }) + FX.emanata(h.neck[0], h.neck[1], h.hr * 1.4, { n: 7, a0: -200, a1: 20, col: '#ff5a3a' }); } },
  [say('Draco', '*Mahasu!*', 560, 60, { anchor: 'tc', w: 200, fixed: true }),
   say('Hermione', 'Ow!', 150, 250, { w: 110, fixed: true })], { shape: 'cut', cutTop: -90, cutBottom: -90, alt: 'In one smooth motion Draco spins and fires at Hermione. It\'s over before anyone can move.' });
ep.panel(1150, { cam: { x: 1100, y: 410, w: 640 }, bg: ST({}), actors: [QDESK, QS({ x: 1250, pose: 'stand', expr: 'coldSmile', turn: -0.3 }), { def: dracoSly, id: 'draco', x: 950, y: 700, s: 1.1, turn: 0.3, pose: 'stand', expr: 'smug' }] },
  [say('Quirrell', 'Well struck. Two Quirrell points. But tell me: why did you target Miss Granger?', 470, 40, { anchor: 'tc', w: 440, fixed: true }),
   say('Draco', 'Because she stood out the most.', 250, 300, { anchor: 'tc', w: 280, fixed: true }),
   say('Quirrell', 'And *that* is the true reason Draco Malfoy is dangerous. He knows who to strike and who not to strike. How to make allies, and avoid making enemies.', 420, 1100, { anchor: 'bc', w: 500, fixed: true })], { mood: 'candle' });

// ---------------------------------------------------------------- Harry
ep.panel(1000, { cam: { on: ['quirrell'], fr: 'bust', dy: -0.45 }, bg: ST({}), blur: 2, actors: [QDESK, QS({ x: 1000, pose: 'present', expr: { base: 'calm', eyes: { style: 'cold', open: 0.75 } } })], over: DOOMV(73, 0.8) },
  [say('Quirrell', 'It might seem that our game is done. And yet there is a single student in this classroom who is more dangerous than the scion of Malfoy.', 400, 60, { anchor: 'tc', w: 540, fixed: true }),
   say('Quirrell', 'Harry Potter. Come forth.', 400, 940, { anchor: 'bc', w: 320, fixed: true })], { mood: 'candle' });
const HQ = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1500, y: 960, s: 1.1, turn: -0.4, pose: 'stand', expr: 'worried', ...o });
ep.panel(820, { cam: { x: 1250, y: 560, w: 1100 }, bg: ST({}), actors: [QDESK, QS({ x: 1000, pose: 'stand', expr: 'calm', turn: 0.3 }), HQ()] },
  [cap('Harry stopped well short of the dais. And Professor Quirrell didn\'t ask him to come any closer.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'A wide gap of white marble between them.' });
ep.panel(950, { cam: { x: 1030, y: 238, w: 520 }, bg: ST({}), blur: 2, actors: [QDESK, QS({ x: 1000, pose: 'lecture', expr: 'coldSmile', turn: 0.3 })] },
  [say('Quirrell', 'The irony is, you all looked at the right person for entirely the wrong reasons. You think that Harry Potter defeated the Dark Lord, and so must be very dangerous. Bah. He was *one year old.*', 400, 56, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle' });
ep.panel(900, { cam: { x: 1500, y: 651, w: 420 }, bg: ST({}), blur: 2, actors: [HQ({ expr: { base: 'worried', eyes: { lookX: -0.5 } }, turn: -0.3 })], over: (e) => { const a = e.anchors.harry; return a ? FX.emanata(a.head[0], a.head[1], a.hr * 1.5, { n: 5, w: 3 }) : ''; } },
  [say('Quirrell', 'But after I heard rumours of one Ravenclaw facing down five older Slytherins, I interviewed several eyewitnesses. And I came to the conclusion that Harry Potter would be my most dangerous student.', 400, 56, { anchor: 'tc', w: 540, fixed: true, noTail: true })], { mood: 'candle' });
ep.multi(800, [
  { x: M, y: 18, w: 368, h: 764, mood: 'candle', art: { cam: { head: 'harry', hw: 0.4, hx: 0.5, hy: 0.52 }, bg: ST({}), actors: [HQ({ x: 1480, pose: 'stand', armF: { sh: -168, el: -4, hand: 'palm' }, expr: 'worried' })] } },
  { x: 408, y: 18, w: 368, h: 764, mood: 'candle', art: { cam: { head: 'quirrell', hw: 0.3, hx: 0.45, hy: 0.72 }, bg: ST({}), actors: [QDESK, QS({ x: 1000, pose: 'present', expr: 'smile', turn: 0.3 })] } },
], [say('Harry', 'Ah, Professor Quirrell…', 202, 40, { anchor: 'tc', w: 260, fixed: true }),
   say('Quirrell', 'You\'re thinking I\'ve come up with a wrong answer, aren\'t you, Mr Potter? You will learn to expect better of *me.*', 592, 44, { anchor: 'tc', w: 280, shape: 'box', fixed: true })], { alt: 'Harry, well back from the dais, raises a hand. Quirrell smiles.' });
ep.bleed(1000, { cam: { x: 1090, y: 200, w: 560 }, bg: ST({}), actors: [QDESK, QS({ x: 1000, pose: 'point', expr: { base: 'coldSmile', eyes: { open: 0.9 } }, turn: 0.4 })], behind: (e) => { const a = e.anchors.quirrell; return a ? FX.burst(e.w, e.h, a.head[0], a.head[1], { n: 30, op: 0.14, inner: a.hr * 3.5 }) : ''; } },
  [shout('Quirrell', 'Mr Potter, all things have their accustomed uses. Give me ten *unaccustomed* uses of objects in this room for combat!', 400, 112, { anchor: 'tc', w: 460, fixed: true })], { alt: 'Quirrell points at Harry: a challenge.' });
// being understood: the hard edges melt away, the panel dissolves into the page around him
ep.panel(820, { cam: { head: 'harry', hw: 0.44, hx: 0.5, hy: 0.52 }, bg: ST({}), blur: 3, actors: [HQ({ expr: { base: 'awe', eyes: { open: 1.2, sparkle: true } } })], over: (e) => K.glow(e.w / 2, e.h * 0.62, e.w * 0.5, '#fff1c8', 0.2) },
  [cap('For a moment Harry was rendered speechless by the sheer, raw shock of having been *understood.*', 44, 30, { w: 620, fixed: true }),
   cap('And then the ideas started to pour out.', 44, 690, { w: 440, fixed: true })], { mood: 'candle', frame: 'dissolve', feather: 70, alt: 'Harry, speechless, eyes shining. The panel\'s edges melt softly into the page.' });
// the flood of ideas: Harry keeps going, and each cut back to the class is a notch more horrified
const UP = (expr, pose = 'gesture', o = {}) => [HQ({ expr, pose, x: 1400, ...o })];
const RAV = (who) => ({ cam: { x: 470, y: 767, w: 700 }, bg: ST({}), blur: 2, actors: CROWD({ harry: false, who }) });
const SLY = (who) => ({ cam: { x: 1300, y: 800, w: 600 }, bg: ST({}), blur: 2, actors: CROWD({ harry: false, who }) });
ep.panel(900, { cam: { x: 1400, y: 640, w: 440 }, bg: ST({}), actors: UP('focus', 'lecture') },
  [say('Harry', 'There are desks, heavy enough to be fatal if dropped from a great height. Chairs with metal legs that could impale someone. The *air* in this classroom would be deadly by its absence, and it can carry poison gas.', 400, 56, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle' });
ep.panel(700, RAV({ padma: { expr: 'awe' }, anthony: { expr: 'think', pose: 'chin' }, terry: { expr: 'smile' }, michael: { expr: 'awe' } }),
  [say('Quirrell', 'That\'s three. You need ten. The rest of the class thinks you\'ve already used up the whole contents of the room.', 400, 40, { anchor: 'tc', w: 500, fixed: true, noTail: true })], { mood: 'candle', alt: 'The Ravenclaws, impressed.' });
ep.bleed(1150, { cam: { x: 1400, y: 580, w: 460 }, bg: ST({}), actors: UP('grin', 'point', { turn: -0.2 }) },
  [shout('Harry', '*Ha!* The floor can be removed to make a spike pit! The ceiling can be collapsed on someone! The walls can be raw material for Transfiguration into any number of deadly things—knives, say.', 400, 122, { anchor: 'tc', w: 470, fixed: true })], { alt: 'Harry, grinning, pointing at the floor, the ceiling, the walls.' });
ep.panel(700, SLY({ draco: { expr: 'suspicious' }, crabbe: { expr: 'confused' }, goyle: { expr: 'worried' }, zabini: { expr: 'worried' } }),
  [say('Quirrell', 'That\'s six. But surely you\'re scraping the bottom of the barrel now?', 400, 40, { anchor: 'tc', w: 460, fixed: true, noTail: true })], { mood: 'candle', alt: 'The Slytherins, less sure now.' });
// Harry's delight can't be contained: his hair and hands burst up over the top of the frame
ep.panel(870, { cam: { x: 1400, y: 820, w: 430 }, bg: ST({}), actors: UP({ base: 'bigGrin', eyes: { sparkle: true } }, 'armsUp'), behind: (e) => { const a = e.anchors.harry; return a ? FX.burst(e.w, e.h, a.head[0], a.head[1], { n: 30, op: 0.15, inner: a.hr * 3.2 }) : ''; } },
  [shout('Harry', 'I haven\'t even *started!* Just look at all the *people!*', 400, 794, { anchor: 'bc', w: 460, fixed: true })], { breakout: 'top', ph: 700, panel: { y: 152 }, alt: 'Harry, delighted, arms flung wide at the whole class, his hands and hair breaking over the top of the frame.' });
ep.panel(1150, { cam: { x: 420, y: 700, w: 560 }, bg: ST({}), blur: 2, actors: CROWD({ harry: false, who: { padma: { expr: 'worried' }, anthony: { expr: 'shock' }, terry: { expr: 'gasp' }, michael: { expr: 'worried' } } }) },
  [say('Harry', 'Their blood can be used to drown someone. Ravenclaws are known for their brains, but their internal organs could be sold on the black market for enough to hire an assassin. Slytherins can be thrown at sufficient velocity to crush an enemy. And Hufflepuffs, in addition to being hard workers, contain bones that can be removed, sharpened, and used to stab someone.', 400, 88, { anchor: 'tc', w: 540, fixed: true, noTail: true })], { mood: 'candle', alt: 'The Ravenclaws listen, their smiles gone.' });
ep.panel(760, { ...SLY({ draco: { expr: 'shock' }, crabbe: { expr: 'horror' }, goyle: { expr: 'shock' }, zabini: { expr: 'horror' } }), cam: { x: 1330, y: 790, w: 440 } },
  [cap('By now the rest of the class was staring at Harry in some horror. Even the Slytherins looked shocked.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'Even the Slytherins look shocked.' });
ep.panel(640, { cam: { x: 1010, y: 228, w: 400 }, bg: ST({}), blur: 2, actors: [QDESK, QS({ x: 1000, pose: 'stand', expr: 'smile', turn: 0.3 })] },
  [say('Quirrell', 'That\'s ten, though I\'m being generous about the Ravenclaw one. Now, for extra credit…', 400, 40, { anchor: 'tc', w: 520, fixed: true })], { mood: 'candle' });
ep.panel(1150, { cam: { x: 1360, y: 587, w: 520 }, bg: ST({}), actors: UP('grin', 'wand', { turn: -0.35, armB: WAND() }) },
  [say('Harry', 'My robes can suffocate an enemy if wrapped round their head enough times. Hermione Granger\'s robes can be torn into strips and tied into a rope and used to hang someone. Draco Malfoy\'s robes can start a fire. My *wand* can be pushed into an enemy\'s brain through their eye socket…', 400, 66, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle', alt: 'Harry, happily holding up his own wand as exhibit A.' });
ep.panel(1000, { cam: { x: 1250, y: 420, w: 760 }, bg: ST({}), actors: [QDESK, QS({ x: 1000, pose: 'raiseHand', expr: 'stern', turn: 0.3 }), HQ({ x: 1480, pose: 'crossArms', expr: 'smug' })] },
  [say('Quirrell', 'Five points, and *enough.*', 250, 40, { anchor: 'tc', w: 280, fixed: true }),
   say('Harry', 'Hmph. You should have let me keep going until I\'d won the House Cup. I haven\'t even started on what\'s in my pockets.', 505, 330, { anchor: 'tc', w: 380, fixed: true })], { mood: 'candle' });
ep.panel(900, { cam: { on: ['terry'], fr: 'bust', dy: -0.1 }, bg: ST({}), blur: 2, actors: CROWD({ who: { terry: { expr: 'worried', pose: 'shrug' } } }) },
  [say('Quirrell', 'Well, do you all understand what makes Mr Potter the most dangerous student in the classroom? Terry Boot, what makes your dorm-mate dangerous?', 400, 64, { anchor: 'tc', w: 560, fixed: true, noTail: true }),
   say('Terry', 'Ah… um… he\'s *creative?*', 400, 820, { anchor: 'bc', w: 280, fixed: true })], { mood: 'candle' });
// WRONG!: Quirrell's fist comes down on the desk. The rig's own hand ends just behind the desk front,
// so the fist is drawn on the desk top, where the sleeve meets it.
const SLAM = (e) => { const a = e.anchors.quirrell; if (!a) return ''; const [x, y] = [a.handF[0], e.toPanel([0, 492])[1]], k = a.hr / 58;
  return FX.emanata(x, y - 10 * k, a.hr * 1.3, { n: 7, w: 5 }) +
    g({ transform: `translate(${x},${y}) scale(${k})` }, ellipse(0, -14, 30, 26, { fill: '#ecdfd2', stroke: C.ink, 'stroke-width': 3.2 }), path('M-20,-24 q8,-6 14,0 M-4,-26 q8,-6 14,0 M12,-22 q6,-4 10,2', { fill: 'none', stroke: C.ink, 'stroke-width': 2.4 })); };
// the slam: the frame itself cracks and jolts with the bang
ep.panel(1100, { cam: { x: 1020, y: 380, w: 620 }, bg: ST({ desk: false }), actors: [QS({ x: 1000, y: 722, pose: 'stand', lean: 10, armF: { sh: 18, el: -4, hand: 'fist' }, armB: { sh: 4, el: 6 }, expr: { base: 'yell', eyes: { style: 'normal', open: 0.95, lidTilt: -0.45 }, brows: { raise: -0.4, inner: -1.5, outer: 0.3 }, mouth: { type: 'shout', open: 1 } }, turn: 0.15 }), () => CS.defenceDesk(1000, 650)], over: SLAM, behind: (e) => { const a = e.anchors.quirrell; return a ? FX.burst(e.w, e.h, a.handF[0], e.toPanel([0, 492])[1], { n: 40, op: 0.22, inner: a.hr * 1.2 }) : ''; } },
  [shout('Quirrell', '*WRONG!*', 400, 84, { anchor: 'tc', w: 280, size: 64, fixed: true }),
   sfx('BANG', 620, 600, { size: 76, rot: 8 }),
   shout('Quirrell', 'All of Mr Potter\'s ideas were worse than useless!', 380, 1004, { anchor: 'bc', w: 420, fixed: true, noTail: true })], { shape: 'jag', jag: 20, seed: 8, borderWidth: 5, alt: 'Quirrell\'s fist comes down on the desk with an amplified bang that makes everyone jump. The panel\'s edges are jagged with the shock.' });
ep.panel(1000, { cam: { x: 1380, y: 560, w: 600 }, bg: ST({}), actors: [QS({ x: 1400, y: 920, pose: 'walk', expr: 'stern', turn: 0.55 })] },
  [say('Quirrell', 'Remove the floor to make a spike trap? Ridiculous! In combat you do not have that sort of time. Transfigure the walls? Mr Potter cannot perform Transfiguration!', 400, 50, { anchor: 'tc', w: 520, fixed: true })], { mood: 'candle', alt: 'Quirrell paces the stage, ticking off Harry\'s ideas.' });
ep.panel(1000, { cam: { x: 1470, y: 400, w: 440 }, bg: ST({}), blur: 2, actors: [QS({ x: 1400, y: 920, pose: 'wand', expr: { base: 'unimpressed', eyes: { lookX: 0.5 } }, turn: 0.4, armB: WAND() })] },
  [say('Quirrell', 'He had exactly one idea he could use right now: to jam his wand through his enemy\'s eye socket. Which would more likely break his wand than kill his opponent. In short, Mr Potter, your proposals were *uniformly awful.*', 400, 66, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle', alt: 'Quirrell mimes a stab with his wand, unimpressed.' });
ep.panel(920, { cam: { x: 1520, y: 580, w: 480 }, bg: ST({}), actors: [HQ({ x: 1500, pose: 'armsUp', expr: { base: 'rant', vein: false }, turn: -0.3 })] },
  [shout('Harry', 'What? You *asked* for unusual ideas, not practical ones! How would *you* use something in this classroom to kill someone?', 400, 110, { anchor: 'tc', w: 460, fixed: true })], { mood: 'candle' });
ep.panel(1000, { cam: { x: 1030, y: 290, w: 420 }, bg: ST({}), actors: [QDESK, QS({ x: 1000, pose: 'gesture', expr: { base: 'stern', eyes: { squint: 0.4 }, mouth: { type: 'smile', w: 0.6 } }, turn: 0.3 })], over: (e) => { const a = e.anchors.quirrell; if (!a) return ''; const x = a.head[0], y = a.head[1], r = a.hr; return path(`M${x - r * 0.75},${y - r * 0.02} l${-r * 0.22},${-r * 0.08} M${x - r * 0.75},${y + r * 0.08} l${-r * 0.24},${r * 0.04} M${x + r * 0.75},${y - r * 0.02} l${r * 0.22},${-r * 0.08} M${x + r * 0.75},${y + r * 0.08} l${r * 0.24},${r * 0.04}`, { stroke: C.ink, 'stroke-width': 2.2, 'stroke-linecap': 'round' }); } },
  [say('Quirrell', 'Mr Potter, I never said you were to *kill.* But to answer your question: hit them on the neck with the edge of a chair.', 400, 50, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle', alt: 'Quirrell\'s expression is disapproving, but there are smile crinkles around his eyes.' });
ep.panel(560, { ...SLY({ draco: { expr: 'laugh' }, crabbe: { expr: 'laugh' }, goyle: { expr: 'grin' }, zabini: { expr: 'laugh' } }), blur: 0, cam: { x: 1330, y: 800, w: 560 } },
  [], { mood: 'candle', alt: 'The Slytherins laugh, with Harry, not at him.' });
ep.panel(1100, { cam: { x: 1000, y: 330, w: 780 }, bg: ST({}), actors: [QS({ pose: 'present', expr: 'calm', turn: 0.15 }), QDESK, BACKS(760, [560, 900, 1240, 1580], 1.2)] },
  [say('Quirrell', 'But Mr Potter has now shown why he is the most dangerous student in the classroom. He could have suggested using a desk to block a curse, or wrapping cloth around his arm for a shield.', 400, 56, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle' });
ep.panel(900, { cam: { x: 1010, y: 245, w: 440 }, bg: ST({}), blur: 2, actors: [QDESK, QS({ x: 1000, pose: 'stand', expr: { base: 'calm', eyes: { open: 0.7 } }, turn: 0.1 })] },
  [say('Quirrell', 'Instead, every single use he named was *offensive* rather than defensive. And either fatal, or potentially fatal.', 400, 50, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
// vertigo: the whole panel tips off true as Harry's certainty gives way
ep.panel(840, { cam: { x: 1500, y: 640, w: 330, roll: 6 }, bg: ST({}), blur: 3, actors: [HQ({ expr: 'horror' })], behind: (e) => FX.speedLines(e.w, e.h, { n: 30, radial: true }) },
  [inner('Harry', '*What? Wait, that couldn\'t be true… surely there had to be a counterexample…*', 420, 84, { anchor: 'tc', w: 480, fixed: true })], { mood: 'candle', rotate: -3.5, x: 52, w: 696, y: 44, ph: 752, alt: 'A sense of vertigo: the panel tips sideways.' });
ep.panel(900, { cam: { x: 1010, y: 215, w: 370 }, bg: ST({}), blur: 2, actors: [QDESK, QS({ x: 1000, pose: 'stand', expr: { base: 'calm', eyes: { style: 'cold', open: 0.7 } }, turn: 0.1 })], over: DOOMV(77, 0.9) },
  [say('Quirrell', 'This reflects a quality that we might call *intent to kill.* I have it. Harry Potter has it, which is how he could stare down five older Slytherins.', 400, 50, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle', alt: 'Quirrell, quiet and certain. The hum of wrongness around him.' });
ep.panel(1100, { cam: { x: 1300, y: 700, w: 440 }, bg: ST({}), blur: 2, actors: CROWD({ harry: false, who: { draco: { expr: { base: 'wince', eyes: { lookX: -0.6 } }, turn: -0.4 }, crabbe: { expr: 'worried' }, goyle: { expr: 'worried' } } }) },
  [say('Quirrell', 'Draco Malfoy does not have it. Not yet. Yes you were shocked, Mr Malfoy; I was watching your face. There are censors inside your mind which make you flinch away from thoughts like that. Mr Potter thinks *purely* of killing the enemy. His censors are off.', 400, 58, { anchor: 'tc', w: 560, fixed: true, noTail: true })], { mood: 'candle', alt: 'Draco flinches.' });
ep.bleed(900, { cam: { x: 1270, y: 540, w: 900 }, bg: ST({}), actors: [QDESK, QS({ x: 1000, pose: 'point', expr: { base: 'calm', eyes: { style: 'cold', open: 0.7 } }, turn: 0.4 }), HQ({ x: 1600, expr: 'shock' })], over: DOOMV(78, 1.1) },
  [say('Quirrell', 'His *intent to kill* makes Harry Potter the Most Dangerous Student in the Classroom.', 480, 50, { anchor: 'tc', w: 460, fixed: true })], { alt: 'Quirrell points across the empty white marble at Harry, who stands well back from the dais.' });
ep.panel(700, { cam: { on: ['harry'], fr: 'close' }, bg: ST({}), blur: 2, actors: [HQ({ expr: 'shock' })] },
  [inner('Harry', '*That is so completely not what I am about!*', 400, 40, { anchor: 'tc', w: 560, fixed: true })], { mood: 'candle' });
ep.panel(820, { cam: { x: 470, y: 760, w: 600 }, bg: ST({}), blur: 2, actors: CROWD({ harry: false, who: { padma: { expr: 'suspicious', turn: 0.5 }, anthony: { expr: 'worried', turn: 0.5 }, terry: { expr: 'suspicious', turn: 0.5 }, michael: { expr: 'worried', turn: 0.5 } } }) },
  [inner('Harry', '*But he could see the other students starting to believe it. The best denial he could come up with was "I\'m not a psychopath, I\'m just very creative." Which sounded kind of ominous.*', 400, 40, { anchor: 'tc', w: 580, fixed: true })], { mood: 'candle', alt: 'The Ravenclaws eye Harry warily.' });
ep.panel(1000, { cam: { x: 1270, y: 420, w: 860 }, bg: ST({}), actors: [QDESK, QS({ x: 1000, pose: 'point', expr: 'calm', turn: 0.4 }), HQ({ x: 1600, expr: 'worried' })] },
  [say('Quirrell', 'And now, Mr Potter. Select any student you please for a Simple Strike Hex. You *will* do so before I dismiss this class.', 312, 58, { anchor: 'tc', w: 440, fixed: true })], { mood: 'candle' });
ep.panel(900, { cam: { x: 1190, y: 640, w: 820 }, bg: ST({}), actors: [...CROWD({ harry: false, who: { draco: { x: 1050, expr: { base: 'calm', eyes: { lookX: 0.5 } }, turn: 0.3 }, crabbe: { x: 860, expr: LOOM, turn: 0.3 }, goyle: { x: 1240, expr: LOOM, turn: 0.3 }, zabini: { x: 700, expr: 'smug', turn: 0.3 }, padma: { x: -9999 }, anthony: { x: -9999 }, terry: { x: -9999 }, michael: { x: -9999 } } }).map((a) => ({ ...a, y: 900 })), HQ({ x: 1480, y: 1120, s: 1.4, turn: -0.5, pose: 'wand', expr: { base: 'cold', eyes: { lookX: -0.5 } }, armB: WAND() })] },
  [cap('Slowly, as though on a roasting platter, Harry turned to face the Slytherins. And his eyes met Draco\'s.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'Harry, wand out, faces the Slytherins.' });
ep.panel(640, { cam: { on: ['draco'], fr: 'close', dy: -0.1 }, bg: ST({}), blur: 3, actors: [{ def: dracoSly, id: 'draco', x: 1700, y: 1060, s: 1.08, turn: -0.2, expr: { base: 'calm', eyes: { lookX: -0.3 } } }] },
  [cap('Draco didn\'t look the slightest bit afraid.', 44, 30, { w: 520, fixed: true })], { mood: 'candle', alt: 'Draco, calm.' });
ep.panel(1000, { cam: { x: 1500, y: 640, w: 400 }, bg: ST({}), blur: 3, actors: [HQ({ expr: { base: 'think', eyes: { lookX: -0.4 } } })] },
  [say('Quirrell', 'Why the hesitation? Surely there\'s only one obvious choice.', 400, 40, { anchor: 'tc', w: 460, fixed: true, noTail: true }),
   say('Harry', 'Yes. Only one *obvious* choice.', 560, 960, { anchor: 'bc', w: 300, fixed: true })], { mood: 'candle', alt: 'Harry, thinking.' });
// Harry hexes his own left arm: left (near) arm held out, wand in the right hand aimed down at it
// the twist: a spell hitting, so the panel bursts
ep.panel(900, { cam: { x: 1450, y: 680, w: 480 }, bg: ST({}), actors: [HQ({ pose: 'stand', turn: 0.1, expr: { base: 'determined', eyes: { lookX: -0.7, lookY: 0.3 } }, armF: { sh: -80, el: -5, hand: 'open' }, armB: { sh: 0, el: -85 } })], over: (e) => { const a = e.anchors.harry; if (!a) return ''; const r = a.hr, k = r / 64, f = [a.handF[0] * 0.62 + a.neck[0] * 0.38, a.handF[1] * 0.62 + a.neck[1] * 0.38 + r * 0.2];
    // the wand hand, drawn over the robe: sleeve from the chest, fist, wand angled up at the outstretched forearm
    const sh = [a.neck[0] + r * 0.2, a.neck[1] + r * 1.3], hd = [f[0] + r * 0.9, f[1] + r * 1.3], tip = [f[0] + r * 0.12, f[1] + r * 0.32];
    const inkS = { stroke: C.ink, 'stroke-width': 3 * k, 'stroke-linecap': 'round' };
    return line(sh[0], sh[1], hd[0] + r * 0.25, hd[1] + r * 0.05, { ...inkS, 'stroke-width': r * 0.62 }) + line(sh[0], sh[1], hd[0] + r * 0.25, hd[1] + r * 0.05, { stroke: '#1d1a24', 'stroke-width': r * 0.62 - 6 * k, 'stroke-linecap': 'round' }) +
      circle(hd[0] + r * 0.22, hd[1] + r * 0.04, r * 0.3, { fill: '#2f5fa8', ...inkS }) +
      line(hd[0], hd[1], tip[0], tip[1], { stroke: '#6b4429', 'stroke-width': 7 * k, 'stroke-linecap': 'round' }) + circle(hd[0], hd[1], r * 0.24, { fill: '#f1d2b4', ...inkS }) +
      P2.bolt(tip[0], tip[1], f[0], f[1] - r * 0.05, { seed: 13 }) + FX.emanata(f[0], f[1], r * 0.55, { n: 7, a0: -200, a1: 20, col: '#ff5a3a' }); } },
  [say('Harry', '*Ma-ha-su!*', 400, 110, { anchor: 'tc', w: 220, fixed: true })], { shape: 'burst', points: 24, seed: 9, alt: 'Harry hexes his own left arm, in a burst-shaped panel.' });
ep.panel(700, { cam: { x: 1500, y: 650, w: 480 }, bg: ST({}), actors: [HQ({ pose: 'stand', turn: 0.2, expr: 'wince', armF: { sh: 40, el: 60, hand: 'open' } })], over: (e) => { const a = e.anchors.harry; return a ? FX.emanata(a.handF[0], a.handF[1], a.hr * 0.5, { n: 6 }) : ''; } },
  [cap('There was complete silence in the classroom. Harry shook his left arm, trying to get rid of the lingering sting.', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
ep.panel(1000, { cam: { on: ['quirrell'], fr: 'bust', dy: -0.1 }, bg: ST({}), blur: 2, actors: [QDESK, QS({ x: 1000, pose: 'stand', expr: 'exasperated', turn: 0.3 })] },
  [cap('More silence. Finally, Professor Quirrell sighed.', 44, 30, { w: 520, fixed: true }),
   say('Quirrell', 'Yes, quite ingenious. But there was a lesson to be taught, and you dodged it. One point from Ravenclaw, for showing off your own cleverness at the expense of the actual goal. Class dismissed.', 400, 940, { anchor: 'bc', w: 580, fixed: true })], { mood: 'candle' });
// the punchline: no frame, Harry sings it out straight at the reader (an echo of Quirrell's own arms-up cut-out)
ep.cutout(1030, { cam: { head: 'harry', hw: 0.25, hx: 0.5, hy: 0.39 }, actors: [HQ({ pose: 'armsUp', expr: 'laugh', turn: 0 })], behind: (e) => { const a = e.anchors.harry; return a ? FX.burst(e.w, e.h, a.head[0], a.head[1], { n: 30, op: 0.18, inner: a.hr * 3 }) : ''; } },
  [shout('Harry', '*Just kidding! RAVENCLAW!*', 400, 74, { anchor: 'tc', w: 460, size: 48, fixed: true }),
   cap('There was silence for a brief moment. A sound of people thinking. Then the murmurs started, and rapidly rose to a roar.', 44, 862, { w: 560, fixed: true })], { alt: 'Harry, arms up, singing it out, standing on the bare page with no frame around him.' });
ep.panel(1060, { cam: { x: 1200, y: 580, w: 900 }, bg: ST({}), actors: [QDESK, QS({ x: 920, pose: 'slump', expr: { base: 'asleep', mouth: { type: 'o' } }, turn: -0.7 }), HQ({ x: 1520, pose: 'walk', turn: -0.6, expr: 'determined' })] },
  [cap('Harry turned toward Professor Quirrell. The two of them *needed* to talk. But Quirrell had slumped over, and was trudging back to his chair.', 44, 30, { w: 620, fixed: true }),
   inner('Harry', '*Stuff the zombie act. He\'d probably wake up if Harry poked him a couple of times…*', 400, 1020, { anchor: 'bc', w: 640, fixed: true })], { mood: 'candle' });
ep.bleed(1150, { cam: { x: 1400, y: 640, w: 500 }, bg: ST({}), blur: 2, actors: [QDESK, QS({ x: 1000, pose: 'slump', expr: { base: 'asleep', mouth: { type: 'o' } }, turn: -0.7, opacity: 0.8 }), HQ({ x: 1420, y: 1000, s: 1.25, pose: 'panic', lean: 10, expr: { base: 'horror', eyes: { style: 'wide' } }, turn: -0.4 })], over: (e) => rect(0, 0, e.w, e.h, { fill: '#12060e', opacity: 0.38 }) + DOOMV(79, 1.6)(e) + FX.doom(e.w, e.h, 81) + rect(0, 0, e.w, e.h, { fill: '#9bc4e8', opacity: 0.1, transform: 'translate(-10,0)' }) + rect(0, 0, e.w, e.h, { fill: '#ff5a6a', opacity: 0.1, transform: 'translate(10,0)' }) },
  [sfx('WRONG', 400, 110, { size: 110, rot: -3, color: '#f2d8c8' }), sfx('DON\'T', 150, 470, { size: 84, rot: -12, color: '#f2d8c8' }), sfx('BAD IDEA', 500, 1030, { size: 90, rot: 5, color: '#f2d8c8' })],
  { alt: 'A wave of wrongness. Harry sways and stops dead, dizzy.' });
ep.panel(820, { cam: { x: 1500, y: 620, w: 1000 }, bg: ST({}), actors: [HQ({ x: 1500, expr: 'shock', pose: 'stand' }), ...[[padma, 1250], [anthony, 1700], [terry, 1850], [michael, 1150], [hermioneRaven, 1350]].map(([def, x], i) => ({ def, id: 'fl' + i, x, y: 1000 + (i % 2) * 30, s: 1.05, turn: x < 1500 ? 0.5 : -0.5, pose: 'gesture', expr: 'yell' }))] },
  [cap('And then a flock of Ravenclaws descended on him, and the discussions began.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'Ravenclaws mob Harry, all talking at once.' });
ep.end();
export default ep;
