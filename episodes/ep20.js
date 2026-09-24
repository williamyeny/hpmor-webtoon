// EPISODE 20 — Dominance Hierarchies  (source: HPMOR ch. 18, first half)
// The cold takes over and wins, and Harry *chooses* to stay cold. The low point begins.
import { Episode, say, shout, whisper, inner, cold, cap, capC, plain, title, sfx, M } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as CS from '../engine/bg/castle.js';
import * as HG from '../engine/bg/hogwarts.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { snape, student, fred, george, mcgonagall, dad as DAD0, mum as MUM0 } from '../engine/chars/cast.js';
const dadDef = () => DAD0, mumDef = () => MUM0;
import { harryRaven, hermioneRaven, nevilleHuff, ernie, terry, padma, anthony, binns } from '../engine/chars/cast2.js';
import { wand, bookOpen, bookHeld, sheet } from '../engine/props/props.js';
import * as P2 from '../engine/props/props2.js';
import { dayBeat, header } from './b2.js';
import { shot } from '../engine/core/scene.js';

// A dutch-angle shot: rotates (and slightly enlarges) the whole camera view, keeping balloon tails on the actors.
// `over` is drawn un-rotated on top (frost, vignettes).
const tilt = (deg, o, over) => (ctx) => {
  const sc = 1 + Math.abs(deg) * 0.022;
  const art = shot(o)(ctx);
  const cx = ctx.w / 2, cy = ctx.h / 2, a = (deg * Math.PI) / 180, c = Math.cos(a), sn = Math.sin(a);
  const f = ([x, y]) => { const dx = (x - cx) * sc, dy = (y - cy) * sc; return [cx + dx * c - dy * sn, cy + dx * sn + dy * c]; };
  for (const id in ctx.anchors || {}) { const A = ctx.anchors[id]; for (const k in A) if (Array.isArray(A[k])) A[k] = f(A[k]); if (A.hr) A.hr *= sc; if (A.s) A.s *= sc; }
  return g({ transform: `translate(${cx},${cy}) rotate(${deg}) scale(${sc}) translate(${-cx},${-cy})` }, art) + (typeof over === 'function' ? over(ctx) : over || '');
};
// a soft top-down darkening (no hard edge)
let shadeN = 0;
const SHADE = (col, op) => (e) => { const id = 'ep20sh' + (shadeN++); return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity="${op}"/><stop offset="0.55" stop-color="${col}" stop-opacity="0"/></linearGradient></defs>` + rect(0, 0, e.w, e.h, { fill: `url(#${id})` }); };
// dark foreground heads (the class seen from behind / below), for looming shots
const SIL = (seeds, xs, y, s = 1.3) => seeds.map((sd, i) => ({ def: student(sd, i % 2 ? 'h' : 'r'), x: xs[i], y, s, turn: i % 2 ? 0.2 : -0.2, filter: 'url(#silhouette)' }));

const ep = new Episode({ id: 'ep20', number: 20, title: 'Dominance Hierarchies' });
ep.setBg(C.paper);
header(ep, 'TWENTY', 'Dominance Hierarchies');
dayBeat(ep, 'Friday.', 'If you wanted to be specific, 8:05 on Friday morning. Breakfast.');

// ---------------------------------------------------------------- breakfast warnings
const BT = () => HG.hallTable('r', { day: true });
const HB = (o = {}) => ({ def: harryRaven, id: 'harry', x: 800, y: 1050, s: 1.1, turn: 0.1, pose: 'stand', expr: 'neutral', ...o });
const FRONT = () => HG.tableFront();
ep.panel(840, { cam: { x: 950, y: 750, w: 620 }, bg: BT, actors: [HB({ expr: { base: 'bigGrin', eyes: { sparkle: true } } }), { def: padma, id: 'padma', x: 1100, y: 1050, s: 1.05, turn: -0.3, expr: 'neutral' }, FRONT] },
  [cap('Dungeons! In Hogwarts! Harry\'s imagination was already sketching the chasms, narrow bridges, torch-lit sconces and patches of glowing moss. Would there be rats? Would there be *dragons?*', 44, 30, { w: 620, fixed: true })], { mood: 'day', alt: 'Harry at breakfast, eating toast far too fast, dreaming of dungeons.' });
ep.panel(1220, { cam: { x: 660, y: 490, w: 640 }, bg: BT, actors: [HB({ turn: -0.3, expr: 'neutral' }), { def: ernie, id: 'ernie', x: 520, y: 1050, s: 1.05, turn: 0.4, pose: 'stand', expr: 'worried' }, FRONT] },
  [say('Ernie', 'Neville thought I should warn you. Be careful of the Potions Master today. The older Hufflepuffs say Professor Snape can be really nasty to people he doesn\'t like, and he doesn\'t like most people who aren\'t Slytherins.', 400, 76, { anchor: 'tc', w: 520, fixed: true }),
   say('Ernie', 'Just keep your head down, and don\'t give him any reason to notice you.', 240, 440, { anchor: 'tc', w: 330, fixed: true }),
   say('Harry', 'Thanks. You might\'ve just saved me a lot of trouble.', 570, 690, { w: 280, fixed: true })], { mood: 'day' });
ep.multi(620, [
  { x: M, y: 18, w: 240, h: 584, mood: 'day', art: { cam: { x: 800, y: 660, w: 280 }, bg: BT, actors: [{ def: student(2001, 'r'), id: 's1', x: 800, y: 1050, s: 1.2, turn: 0.3, expr: 'worried' }] } },
  { x: 280, y: 18, w: 240, h: 584, mood: 'day', art: { cam: { x: 800, y: 670, w: 280 }, bg: BT, actors: [{ def: student(2002, 'g'), id: 's2', x: 800, y: 1050, s: 1.15, turn: -0.3, expr: 'worried' }] } },
  { x: 536, y: 18, w: 240, h: 584, mood: 'day', art: { cam: { x: 800, y: 670, w: 280 }, bg: BT, actors: [HB({ expr: 'exasperated' })] } },
], [say('S1', 'Pardon me…', 144, 64, { anchor: 'tc', w: 180, fixed: true, tail: 's1' }), say('S2', 'Harry? About Snape…', 400, 64, { anchor: 'tc', w: 190, fixed: true, tail: 's2' }), say('Harry', 'Yes, I\'ll try not to draw his attention…', 656, 64, { anchor: 'tc', w: 200, fixed: true, shape: 'box' })], { alt: 'Warning after warning.' });
const TW = (o = {}) => [{ def: fred, id: 'fred', x: 560, y: 1050, turn: 0.4, pose: 'present', expr: 'grin', ...(o.f || {}) }, { def: george, id: 'george', x: 780, y: 1050, turn: 0.4, pose: 'present', expr: 'grin', ...(o.g || {}) }, HB({ x: 1080, turn: -0.4, ...(o.h || {}) }), FRONT];
ep.panel(1300, { cam: { x: 815, y: 399, w: 720 }, bg: BT, actors: TW({ h: { expr: 'wince' } }) },
  [say('Fred', 'Oh, that\'s hopeless.', 170, 80, { anchor: 'tc', w: 200, fixed: true }),
   say('George', 'Completely hopeless.', 520, 120, { anchor: 'tc', w: 200, fixed: true, tail: [540, 400] }),
   say('Fred', 'So we had the house elves bake you a cake. We\'re going to put one candle on it for every point you lose for Ravenclaw.', 250, 300, { anchor: 'tc', w: 340, fixed: true }),
   say('George', 'And have a party for you at the Gryffindor table during lunch. We hope that\'ll cheer you up afterwards.', 540, 600, { anchor: 'tc', w: 340, fixed: true })], { mood: 'day' });
ep.panel(1190, { cam: { x: 815, y: 580, w: 720 }, bg: BT, actors: TW({ f: { expr: 'confused', pose: 'think' }, g: { expr: 'confused', pose: 'chin' }, h: { expr: 'deadpan', pose: 'gesture' } }) },
  [say('Harry', 'All right. If Professor Snape is *that* awful, why hasn\'t he been fired?', 540, 80, { anchor: 'tc', w: 340, fixed: true }),
   say('Fred', 'Fired?', 140, 390, { w: 140, fixed: true }),
   say('George', 'You mean, let go?', 380, 460, { w: 200, fixed: true }),
   cap('Fred and George were frowning in much the same way that hunter-gatherer tribal elders might frown if you tried to tell them about calculus.', 44, 1000, { w: 620, fixed: true })], { mood: 'day' });
ep.panel(1000, { cam: { x: 815, y: 594, w: 720 }, bg: BT, actors: TW({ f: { x: 540, expr: 'laugh', pose: 'bow' }, g: { x: 750, expr: 'laugh', pose: 'bow' }, h: { x: 1100, expr: 'smug' } }) },
  [say('Fred', 'I never thought about that.', 200, 80, { anchor: 'tc', w: 240, fixed: true }),
   say('Harry', 'Yeah. I get that a lot. See you at lunch, and don\'t blame me if there aren\'t any candles on that cake.', 540, 200, { anchor: 'tc', w: 340, fixed: true })], { mood: 'day' });
// Binns
const EARPLUGS = (e) => { const a = e.wa.harry; if (!a) return ''; const r = a.hr; return circle(a.head[0] - r * 1.02, a.head[1] + r * 0.12, r * 0.13, { fill: '#e8c34a', stroke: '#2a1a14', 'stroke-width': 3 }) + circle(a.head[0] + r * 0.98, a.head[1] + r * 0.12, r * 0.11, { fill: '#e8c34a', stroke: '#2a1a14', 'stroke-width': 3 }); };
// an open textbook held between Harry's two hands
const READBOOK = (e) => { const a = e.wa.harry; if (!a) return ''; const [x1, y1] = a.handF, [x2, y2] = a.handB; return g({ transform: `translate(${(x1 + x2) / 2},${(y1 + y2) / 2 + 26})` }, bookOpen({ w: Math.abs(x2 - x1) + 30, h: 90, col: '#3a4a6a' })); };
ep.panel(1000, { cam: { x: 1030, y: 560, w: 860 }, bg: () => CS.historyRoom(), actors: [{ def: binns, id: 'binns', x: 1260, y: 880, turn: -0.1, pose: 'lecture', expr: { base: 'blank', eyes: { open: 0.5 } }, opacity: 0.75 }, (e) => { const a = e.wa.binns; return a ? K.glow(a.head[0], a.head[1] + 200, 380, '#dfe8f0', 0.45) : ''; }, { def: harryRaven, id: 'harry', x: 820, y: 1170, s: 1.3, turn: 0.1, pose: 'sitRead', seat: 140, expr: { base: 'unimpressed', eyes: { lookY: 0.7, lookX: 0 } }, }, EARPLUGS, READBOOK, () => CS.deskRow(1250, { h: 250 })] },
  [cap('Harry had met some stupid teachers before. But History was the first time he had met a teacher who literally wasn\'t sentient. Professor Binns was a ghost. Harry had given up after five minutes, and taken out a textbook. And earplugs.', 44, 30, { w: 620, fixed: true }),
   whisper('Binns', '…and in 1612, the goblins…', 300, 330, { w: 260, fixed: true })], { mood: 'rainy', alt: 'A pale, translucent old ghost drones at the blackboard. Harry, earplugs in, reads a textbook.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: () => CS.corridor({ seed: 41, windows: [], torches: [600, 1400], dim: true }), blur: 3, actors: [{ def: harryRaven, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0.2, expr: 'exasperated' }] },
  [inner('Harry', '*I swear this place is almost eight and a half percent as bad as what Dad says about Oxford.*', 400, 64, { anchor: 'tc', w: 520, fixed: true })], { mood: 'candle' });

// ---------------------------------------------------------------- the dungeons
const PR = (o = {}) => () => CS.potionsRoom(o);
ep.bleed(900, { cam: { x: 705, y: 625, w: 1100 }, bg: () => CS.corridor({ seed: 43, windows: [], torches: [500, 1500], dim: true }) + rect(-800, -900, 4000, 2200, { fill: '#0c1a14', opacity: 0.35 }), actors: [{ def: harryRaven, id: 'harry', x: 1100, y: 900, s: 1.1, turn: 0.5, pose: 'armsUp', expr: 'rant' }, ...[0, 1, 2].map((i) => ({ def: [padma, terry, anthony][i], id: 'r' + i, x: 690 - i * 210, y: 900, s: 1.05, turn: 0.4, pose: 'walk', expr: 'confused' }))] },
  [shout('Harry', 'Dungeons! These are not dungeons! This is a *basement!* A *BASEMENT!*', 440, 110, { anchor: 'tc', w: 400, fixed: true }),
   cap('It seemed the level was called "the dungeons" for no better reason than that it was below ground, and slightly colder. Was Harry going to have to build his own castle if he wanted to see one little bottomless abyss?', 44, 690, { w: 640, fixed: true })], { alt: 'A perfectly ordinary stone corridor underground. Harry, outraged.' });
const SEAT = (def, id, x, o = {}) => ({ def, id, x, y: 1080, s: 1.05, turn: 0.1, pose: 'sit', seat: 140, expr: 'worried', ...o });
const CLASS = (o = {}) => [
  SEAT(padma, 'padma', 250, (o.who || {}).padma), SEAT(student(2011, 'h'), 'hannah', 450, (o.who || {}).hannah),
  { def: harryRaven, id: 'harry', x: 700, y: 1080, s: 1.1, turn: 0.1, pose: 'sit', seat: 140, expr: 'neutral', ...(o.h || {}) },
  SEAT(student(2012, 'h'), 'justin', 920, (o.who || {}).justin),
  { def: hermioneRaven, id: 'hermione', x: 1150, y: 1080, s: 1.1, turn: -0.1, pose: 'sit', seat: 140, expr: 'worried', ...(o.he || {}) },
  SEAT(nevilleHuff, 'neville', 1380, { expr: 'horror', ...(o.n || {}) }), SEAT(ernie, 'ernie', 1600, (o.who || {}).ernie), SEAT(terry, 'terry', 1820, (o.who || {}).terry),
  () => CS.cauldronRow(1120, [700, 1150, 1600], { steam: false }),
];
// Snape never gets Harry's blue "cold" face-tint: that motif is Harry's alone
const noTint = (e) => typeof e === 'string' ? { base: e, cold: false } : { ...e, cold: false };
const SN = (o = {}) => ({ def: snape, id: 'snape', x: 1000, y: 900, turn: 0.05, pose: 'stand', ...o, expr: noTint(o.expr ?? 'menace') });
ep.multi(1230, [
  { x: M, y: 18, w: 752, h: 704, mood: 'candle', art: { cam: { x: 2150, y: -233, w: 800 }, bg: PR({}) } },
  { x: M, y: 738, w: 368, h: 474, mood: 'candle', art: { cam: { on: ['harry'], fr: 'close', dy: 0.2 }, bg: PR({}), blur: 2, actors: CLASS({ h: { expr: 'awe', pose: 'stand', seat: undefined, y: 1060, turn: 0.2 } }) } },
  { x: 408, y: 738, w: 368, h: 474, mood: 'candle', art: { cam: { on: ['hermione'], fr: 'close', dy: 0.2 }, bg: PR({}), blur: 2, actors: CLASS({ he: { expr: { base: 'worried', eyes: { lookX: -1, lookY: 0.4 } }, turn: -0.5 } }) } },
], [cap('The actual Potions classroom cheered him up considerably. Strange preserved creatures floated in huge jars on every shelf. A fifty-centimetre spider that *looked* like an Acromantula, but was too small to *be* one. A large dust ball with eyes and feet.', 44, 36, { w: 620, fixed: true })],
  { alt: 'Shelves of murky jars with floating things in them, and a preserved giant spider. Harry gazes up in delight; Hermione refuses to look at the spider.' });
ep.bleed(1100, tilt(-6, { cam: { x: 1000, y: 700, w: 800 }, bg: PR({}), blur: 2, actors: [{ def: snape, id: 'snape', x: 1000, y: 1100, s: 1.45, turn: 0.1, pose: 'walk', expr: 'menace' }, ...SIL([2021, 2022, 2023, 2024, 2025], [520, 760, 1000, 1240, 1480], 1400, 1.35)] }, SHADE('#050a08', 0.45)),
  [cap('Harry was looking at the dust ball when the assassin swept into the room.', 44, 40, { w: 620, fixed: true })], { mood: 'candle', fadeBottom: false, alt: 'Professor Snape sweeps in, robes billowing, towering over the rows of students.' });
ep.bleed(850, { cam: { x: 1150, y: 631, w: 1100 }, bg: PR({}), actors: [SN({ x: 1265, y: 900, turn: -0.3, pose: 'stand', expr: 'menace' }), ...CLASS({ h: { expr: 'horror' }, he: { expr: 'horror' }, who: { justin: { expr: 'horror' }, hannah: { expr: 'worried' } } })] },
  [cap('That was the first thought that crossed his mind. There was something quiet and deadly about the way the man stalked between the desks. Where Lucius would kill you with flawless elegance, this man would simply kill you.', 44, 40, { w: 640, fixed: true })], { alt: 'Snape stalks between the benches; the students freeze.' });
const SDESK = () => CS.snapeDesk(1000);
ep.panel(700, tilt(4, { cam: { x: 942, y: 429, w: 420 }, bg: PR({}), blur: 2, actors: [SN({ expr: 'cold', turn: -0.15 })] }, SHADE('#050a08', 0.5)),
  [say('Snape', 'Sit down. *Now.*', 180, 150, { w: 220, fixed: true })], { mood: 'candle' });
ep.panel(1000, { cam: { x: 1000, y: 520, w: 560 }, bg: PR({}), actors: [SN({ pose: 'holdOne', turn: 0.15, expr: { base: 'coldSmile', eyes: { lookY: 0.5 } }, armF: { sh: 28, el: 100, hand: 'hold', prop: g({ transform: 'rotate(12)' }, sheet({ parchment: true, w: 70, h: 95 })) } }), () => CS.snapeDesk(1000, 1030), ...SIL([2031, 2032, 2033, 2034], [700, 900, 1120, 1320], 1270, 1.4)] },
  [cap('Without the slightest introduction, he began to take the register. "Hannah Abbott." "H-here." "Susan Bones." "Present." And so on, no-one daring to say a word, until:', 44, 30, { w: 620, fixed: true }),
   say('Snape', 'Ah, yes. Harry Potter. Our new… *celebrity.*', 600, 260, { w: 250, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: PR({}), blur: 2, actors: CLASS({ h: { expr: 'deadpan' } }) },
  [say('Harry', 'The celebrity is present, *sir.*', 400, 64, { anchor: 'tc', w: 320, fixed: true }),
   cap('Half the class flinched. Some of the smarter ones looked like they wanted to run out of the door while the classroom was still there.', 44, 600, { w: 620, fixed: true })], { mood: 'candle' });
ep.panel(900, { cam: { x: 940, y: 350, w: 560 }, bg: PR({}), blur: 2, actors: [SN({ pose: 'lecture', turn: -0.2, expr: 'coldSmile' })] },
  [say('Snape', 'You are here to learn the subtle science and exact art of potion-making. I don\'t expect you will really understand the beauty of the softly simmering cauldron, the delicate power of liquids that creep through human veins, bewitching the mind, ensnaring the senses…', 400, 70, { anchor: 'tc', w: 600, fixed: true })], { mood: 'candle', alt: 'Snape\'s eyes are as empty as a night sky without stars.' });
ep.panel(760, tilt(-4, { cam: { on: ['snape'], fr: 'close', dy: 0.4 }, bg: PR({}), blur: 3, actors: [SN({ turn: 0.1, expr: { base: 'coldSmile', eyes: { open: 0.45 } } })] }, SHADE('#050a08', 0.5)),
  [say('Snape', 'I can teach you how to bottle fame, brew glory, even stopper death. If you aren\'t as great a pack of fools as I usually have to teach.', 400, 712, { anchor: 'bc', w: 560, fixed: true })], { mood: 'candle' });
ep.panel(1150, { cam: { x: 880, y: 674, w: 760 }, bg: PR({}), actors: [SN({ x: 1080, pose: 'point', turn: -0.4, expr: 'menace' }), ...CLASS({ h: { expr: 'suspicious', turn: 0.4 } })] },
  [say('Snape', 'Potter! What would I get if I added powdered root of asphodel to an infusion of wormwood?', 265, 90, { anchor: 'tc', w: 355, fixed: true }),
   say('Harry', 'Was that in *Magical Drafts and Potions?* I just finished reading it, and I don\'t remember anything which used wormwood…', 500, 1085, { anchor: 'bc', w: 400, fixed: true })], { mood: 'candle' });
ep.multi(1060, [
  { x: M, y: 18, w: 752, h: 430, mood: 'candle', art: { cam: { x: 963, y: 434, w: 560 }, bg: PR({}), blur: 2, actors: [SN({ x: 1100, turn: -0.3, expr: { base: 'smug', eyes: { lookX: -0.6, lookY: 0.4 } } })] } },
  { x: M, y: 464, w: 752, h: 578, mood: 'candle', art: { cam: { x: 628, y: 693, w: 520 }, bg: PR({}), blur: 2, actors: CLASS({ h: { expr: { base: 'calm', eyes: { lookX: 0.5, lookY: -0.3 } }, turn: 0.3 } }) } },
], [say('Snape', 'Tut, tut. Fame clearly isn\'t everything.', 230, 210, { w: 320, fixed: true }),
   say('Harry', 'Really? But you just told us you\'d teach us how to bottle fame. How *does* that work, exactly? You drink it and turn into a celebrity?', 400, 500, { anchor: 'tc', w: 540, fixed: true })]);
ep.panel(1200, { cam: { x: 800, y: 790, w: 700 }, bg: PR({}), actors: [SN({ x: 950, pose: 'lecture', turn: -0.3, expr: { base: 'coldSmile', eyes: { lookX: -0.5, lookY: 0.5 } } }), ...CLASS({ h: { expr: { base: 'focus', eyes: { lookX: 0.6, lookY: -0.6 } }, turn: 0.4 } })] },
  [cap('Three-quarters of the class flinched.', 44, 30, { w: 380, fixed: true }),
   say('Snape', 'Let\'s try again. Potter, where would you look if I told you to find me a bezoar?', 240, 170, { anchor: 'tc', w: 330, fixed: true }),
   say('Harry', 'That\'s not in the textbook either. But in one Muggle book I read that a trichobezoar is a mass of hair found in a human stomach, and Muggles used to believe it would cure any poison…', 420, 1150, { anchor: 'bc', w: 560, fixed: true })], { mood: 'candle' });
ep.multi(1222, [
  { x: M, y: 18, w: 752, h: 470, mood: 'candle', art: tilt(5, { cam: { x: 1010, y: 452, w: 520 }, bg: PR({}), blur: 3, actors: [SN({ x: 1100, turn: -0.3, expr: { base: 'cold', eyes: { lookX: -0.5, lookY: 0.4 } } })] }, SHADE('#050a08', 0.45)) },
  { x: M, y: 504, w: 752, h: 700, mood: 'candle', art: { cam: { x: 820, y: 590, w: 680 }, bg: PR({}), actors: [SN({ x: 1040, turn: -0.4, poseMod: { lean: 16, headTilt: 8 }, expr: { base: 'menace', eyes: { lookX: -0.5, lookY: 0.6 } } }), ...CLASS({ h: { expr: { base: 'determined', eyes: { lookX: 0.5, lookY: -0.6 } }, turn: 0.4 } })] } },
], [say('Snape', 'Wrong. A bezoar is found in the stomach of a goat. It is not made of hair. And it will cure most poisons, but not all.', 250, 90, { anchor: 'tc', w: 330, fixed: true }),
   say('Snape', 'No-one here is interested in your *pathetic* Muggle books. Final try. What is the difference, Potter, between monkshood and wolfsbane?', 270, 560, { anchor: 'tc', w: 380, fixed: true, tail: [530, 800] })]);
ep.panel(820, { cam: { x: 700, y: 605, w: 560 }, bg: PR({}), blur: 2, actors: CLASS({ h: { expr: { base: 'cold', eyes: { lookX: 0.4, lookY: -0.3 } }, turn: 0.3 } }), over: (e) => FX.frost(e.w, e.h, 0.2, 91) },
  [cold('Harry', 'You know, in one of my quite *fascinating* Muggle books, they describe a study in which people made themselves look very smart by asking questions about random facts that only they knew. The onlookers failed to adjust for the unfairness of the game.', 400, 64, { anchor: 'tc', w: 540, fixed: true })], { mood: 'cold' });
ep.panel(700, { cam: { x: 700, y: 800, w: 380 }, bg: PR({}), blur: 3, actors: CLASS({ h: { expr: { base: 'cold', glint: true }, turn: 0.15 } }), over: (e) => FX.frost(e.w, e.h, 0.3, 92) },
  [cold('Harry', 'So, Professor. Can you tell me how many electrons are in the outermost orbital of a carbon atom?', 400, 655, { anchor: 'bc', w: 520, fixed: true })], { mood: 'cold' });
ep.panel(1050, tilt(-4, { cam: { x: 1000, y: 401, w: 620 }, bg: PR({}), blur: 2, actors: [SN({ pose: 'stand', turn: -0.15, expr: { base: 'smug', eyes: { lookX: -0.4, lookY: 0.4 } } }), ...SIL([2041, 2042, 2043, 2044], [680, 900, 1120, 1340], 1200, 1.4)] }, SHADE('#050a08', 0.4)),
  [say('Snape', 'Four. It is a useless fact which no-one should bother writing down, however. And for your information, Potter, asphodel and wormwood make a sleeping potion so powerful it is known as the Draught of Living Death. Monkshood and wolfsbane are the same plant.', 400, 70, { anchor: 'tc', w: 600, fixed: true })], { mood: 'candle' });
ep.panel(820, { cam: { x: 700, y: 700, w: 420 }, bg: PR({}), blur: 3, actors: CLASS({ h: { expr: 'cold', turn: 0.1 } }), over: (e) => FX.frost(e.w, e.h, 0.28, 94) },
  [say('Snape', 'Thought you didn\'t need to open the book before coming, eh, Potter? And that will be… five points? No. Let us make it an even *ten* points from Ravenclaw, for backchat.', 400, 60, { anchor: 'tc', w: 580, fixed: true, noTail: true })], { mood: 'candle' });
ep.panel(820, { cam: { x: 880, y: 560, w: 640 }, bg: PR({}), blur: 2, actors: CLASS({ h: { expr: { base: 'determined', eyes: { lookX: 0.5, lookY: -0.5 } }, turn: 0.3 }, he: { expr: 'gasp', turn: -0.4 } }), over: (e) => FX.frost(e.w, e.h, 0.18, 96) },
  [cap('Hermione gasped, along with a number of others.', 44, 30, { w: 480, fixed: true }),
   say('Harry', 'Professor Severus Snape. I know of nothing which I have done to earn your enmity. If there is some problem you have with me which I do not know about, I suggest we…', 505, 150, { anchor: 'tc', w: 380, fixed: true })], { mood: 'candle' });
ep.panel(560, tilt(3, { cam: { x: 863, y: 454, w: 560 }, bg: PR({}), blur: 3, actors: [SN({ turn: -0.7, expr: { base: 'cold', eyes: { open: 0.35 } } })] }, SHADE('#050a08', 0.45)),
  [say('Snape', 'Shut up, Potter. Ten more points from Ravenclaw. The rest of you, open your books to page three.', 240, 270, { w: 320, fixed: true })], { mood: 'candle' });
// the cold arrives
ep.panel(1100, { cam: { on: ['harry'], fr: 'close', dy: 0.15 }, bg: PR({}), blur: 3, actors: CLASS({ h: { expr: 'cold' } }), over: (e) => FX.frost(e.w, e.h, 0.55, 93) },
  [cap('There was only a slight, only a very faint burning sensation in the back of Harry\'s throat, and no moisture at all in his eyes. If crying was not an effective strategy for destroying this Potions professor, then there was no point in crying.', 44, 30, { w: 620, fixed: true }),
   cap('Slowly, Harry sat up very straight. All his blood seemed to have been drained away and replaced with liquid nitrogen.', 44, 860, { w: 620, fixed: true })], { mood: 'cold', alt: 'Frost spreads across the panel. Harry\'s face goes still and cold.' });
ep.panel(900, { cam: { x: 800, y: 723, w: 520 }, bg: PR({}), blur: 2, actors: CLASS({ he: { x: 890, expr: { base: 'pleading', eyes: { lookX: 0.7 } }, turn: -0.5, poseMod: { lean: 10 } }, who: { justin: { x: 1150 } }, h: { expr: { base: 'cold', eyes: { lookX: 0.6, lookY: -0.3 } }, turn: 0.25 } }), over: (e) => FX.frost(e.w, e.h, 0.55, 94) },
  [whisper('Hermione', 'Harry, stop, please, it\'s all right, we won\'t count it…', 480, 80, { anchor: 'tc', w: 360, fixed: true }),
   say('Snape', 'Talking in class, Granger? Three…', 400, 862, { anchor: 'bc', w: 420, fixed: true, noTail: true })], { mood: 'candle' });
ep.panel(980, { cam: { x: 700, y: 725, w: 480 }, bg: PR({}), blur: 2, actors: CLASS({ h: { expr: 'cold', turn: 0.2 } }), over: (e) => FX.frost(e.w, e.h, 0.58, 95) },
  [cold('Harry', 'So. How does one go about filing a formal complaint against an abusive professor? Does one talk to the Deputy Headmistress? Write a letter to the Board of Governors? Would you care to explain how it works?', 400, 64, { anchor: 'tc', w: 600, fixed: true }),
   cap('The class was utterly frozen.', 44, 880, { w: 380, fixed: true })], { mood: 'cold', alt: 'A voice colder than zero Kelvin.' });
ep.panel(640, tilt(-4, { cam: { x: 1043, y: 447, w: 560 }, bg: PR({}), blur: 2, actors: [SN({ x: 1150, turn: -0.4, expr: { base: 'coldSmile', eyes: { lookX: -0.5, lookY: 0.5 } } })] }, SHADE('#050a08', 0.45)),
  [say('Snape', 'Detention for one month, Potter.', 230, 240, { w: 300, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: { x: 623, y: 773, w: 400 }, bg: PR({}), blur: 3, actors: CLASS({ who: { hannah: { x: -3000 } }, h: { expr: { base: 'cold', eyes: { lookX: 0.4, lookY: -0.4 } }, turn: 0.3 } }), over: (e) => FX.frost(e.w, e.h, 0.62, 97) + rect(0, 0, e.w, e.h, { fill: '#0c1428', opacity: 0.1 }) },
  [cold('Harry', 'I decline to recognise your authority as a teacher, and I will not serve any detention you give.', 215, 380, { w: 290, fixed: true })], { mood: 'cold', alt: 'Harry, perfectly still, frost at the edges of the panel.' });
ep.panel(560, { cam: { x: 1000, y: 657, w: 1100 }, bg: PR({}), actors: CLASS({ who: { padma: { expr: 'gasp' }, hannah: { expr: 'gasp' }, justin: { expr: 'gasp' }, ernie: { expr: 'gasp' }, terry: { expr: 'gasp' } }, he: { expr: 'gasp' }, n: { expr: 'gasp' }, h: { expr: 'cold' } }) },
  [cap('People stopped breathing.', 44, 30, { w: 320, fixed: true })], { mood: 'candle' });
ep.panel(480, tilt(5, { cam: { x: 1060, y: 452, w: 480 }, bg: PR({}), blur: 3, actors: [SN({ x: 1150, turn: -0.4, expr: { base: 'angry', eyes: { lookX: -0.5, lookY: 0.5 } } })] }, SHADE('#050a08', 0.5)),
  [say('Snape', 'Then you will be…', 230, 170, { w: 240, fixed: true })], { mood: 'candle' });
ep.panel(940, { cam: { x: 760, y: 625, w: 540 }, bg: PR({}), blur: 2, actors: CLASS({ h: { expr: { base: 'cold', eyes: { lookX: 0.5, lookY: -0.4 } }, turn: 0.3 } }), over: (e) => FX.frost(e.w, e.h, 0.64, 99) },
  [cold('Harry', 'Expelled, were you about to say? But then you seemed to doubt your ability to carry out the threat. Or fear the consequences. I, on the other hand, neither doubt nor fear the prospect of finding a school with less abusive professors. I have enough money. Something about bounties on a Dark Lord I defeated.', 400, 60, { anchor: 'tc', w: 600, fixed: true })], { mood: 'cold' });
ep.panel(1000, { cam: { x: 700, y: 668, w: 460 }, bg: PR({}), blur: 2, actors: CLASS({ h: { expr: 'coldSmile', turn: 0.2 } }), over: (e) => FX.frost(e.w, e.h, 0.68, 101) },
  [cold('Harry', 'But there *are* teachers at Hogwarts I rather like. So I think it will be easier if I find some way to get rid of *you* instead. I understand there have been a number of complaints about you. Is Hogwarts too poor to afford a real Potions professor? I could chip in. I\'m sure they could find a better class of teacher at double your salary.', 400, 60, { anchor: 'tc', w: 600, fixed: true })], { mood: 'cold', alt: 'Harry smiles coldly. Frost creeps in from every edge of the classroom.' });
ep.panel(820, { cam: { x: 900, y: 720, w: 760 }, bg: PR({}), actors: [SN({ x: 1130, turn: -0.45, expr: { base: 'cold', eyes: { lookX: -0.6, lookY: 0.4 } } }), () => CS.cauldronRow(1130, [1130], { steam: true }), { def: harryRaven, id: 'harry', x: 700, y: 1330, s: 1.7, turn: 0.5, expr: { base: 'cold', eyes: { lookX: 0.6, lookY: -0.5 } } }], over: (e) => FX.frost(e.w, e.h, 0.69, 102) },
  [say('Snape', 'You will find that the Board of Governors is not the slightest bit sympathetic to your offer.', 270, 70, { anchor: 'tc', w: 380, fixed: true })], { mood: 'cold', alt: 'Harry and Snape face each other across the classroom, frost spreading between them.' });
ep.panel(820, { cam: { x: 700, y: 700, w: 420 }, bg: PR({}), blur: 3, actors: CLASS({ h: { expr: { base: 'cold', glint: true }, turn: 0.15 } }), over: (e) => FX.frost(e.w, e.h, 0.7, 103) + rect(0, 0, e.w, e.h, { fill: '#0c1428', opacity: 0.12 }) },
  [cold('Harry', 'Lucius… *that\'s* why you\'re still here. Perhaps I should chat with Lucius about that. I believe he desires to meet with me. I wonder if I have anything he wants?', 400, 60, { anchor: 'tc', w: 560, fixed: true })], { mood: 'cold' });
ep.panel(620, tilt(-4, { cam: { x: 1030, y: 440, w: 480 }, bg: PR({}), blur: 3, actors: [SN({ x: 1150, turn: -0.3, expr: { base: 'menace', mouth: { type: 'smirk', w: 0.8 }, eyes: { lookX: -0.5, lookY: 0.4 } } })] }, SHADE('#050a08', 0.5)),
  [say('Snape', 'You are a very foolish boy. You have nothing that Lucius values more than my friendship.', 230, 270, { w: 300, fixed: true })], { mood: 'candle' });
ep.panel(1120, { cam: { x: 810, y: 480, w: 620 }, bg: PR({}), actors: [SN({ x: 940, turn: -0.4, pose: 'crossArms', poseMod: { lean: 18, headTilt: 8 }, expr: { base: 'menace', eyes: { lookX: -0.5, lookY: 0.6 } } }), ...CLASS({ h: { expr: { base: 'cold', eyes: { lookX: 0.5, lookY: -0.6 } }, turn: 0.4 } })], over: (e) => FX.frost(e.w, e.h, 0.72, 104) },
  [say('Snape', 'And I find it increasingly unlikely that you were not Sorted into Slytherin. How did you stay out of my House? Ah, yes: the Hat claimed it was *joking.* For the first time in recorded history. What were you *really* chatting about with the Sorting Hat, Potter?', 400, 50, { anchor: 'tc', w: 580, fixed: true, shape: 'box' })], { mood: 'candle', alt: 'Snape leans down over Harry\'s bench.' });
ep.panel(460, { cam: { on: ['snape'], fr: 'eyes', zoom: 1.45, dy: -0.04 }, bg: PR({}), actors: [SN({ x: 1150, turn: -0.05, expr: { base: 'menace', eyes: { open: 0.75, lookX: 0, lookY: 0 } } })], over: (e) => FX.doom(e.w, e.h, 105) + SHADE('#000', 0.35)(e) },
  [cap('Harry stared into Snape\'s cold gaze. And remembered the Hat\'s warning: *don\'t meet anyone\'s eyes*…', 44, 22, { w: 640, fixed: true })], { mood: 'candle', y: 130, ph: 312, alt: 'Snape\'s black eyes, very close.' });
ep.panel(620, { cam: { x: 700, y: 765, w: 430 }, bg: PR({}), blur: 2, actors: CLASS({ h: { expr: { base: 'worried', eyes: { lookX: -0.9, lookY: 0.8 }, sweat: true }, turn: -0.1 } }), over: (e) => FX.frost(e.w, e.h, 0.35, 106) },
  [say('Snape', 'You seem oddly reluctant to look me in the eyes, Potter!', 400, 70, { anchor: 'tc', w: 460, fixed: true, noTail: true })], { mood: 'candle' });
ep.panel(760, { cam: { x: 700, y: 720, w: 420 }, bg: PR({}), blur: 3, actors: CLASS({ h: { expr: { base: 'shock', eyes: { lookX: 0.3, lookY: -0.4 } }, turn: 0.25 } }), behind: (e) => FX.burst(e.w, e.h, e.w * 0.5, e.h * 0.66, { n: 70, op: 0.35 }) },
  [shout('Harry', '*So it was* you *the Sorting Hat was warning me about!*', 400, 80, { anchor: 'tc', w: 480, fixed: true })], { mood: 'candle', alt: 'Harry, eyes wide with realisation.' });
// the door
ep.panel(900, { cam: { x: 800, y: 695, w: 1000 }, bg: PR({}), actors: [SN({ x: 1200, turn: -0.4, expr: { base: 'angry', eyes: { lookX: -0.6, lookY: 0.4 } } }), ...CLASS({ h: { x: -900 }, who: { padma: { expr: 'gasp', turn: -0.3 }, hannah: { expr: 'gasp', turn: -0.4 }, justin: { expr: 'gasp', turn: -0.4 } }, he: { expr: 'horror', turn: -0.4 } }), { def: harryRaven, id: 'harry', x: 700, y: 1400, s: 1.55, turn: -0.4, pose: 'walk', expr: 'cold' }], over: (e) => FX.frost(e.w, e.h, 0.72, 106) },
  [cold('Harry', 'I have no intention of letting one unprofessional teacher ruin my time at Hogwarts. I think I\'ll take my leave of this class, and hire a tutor. If any of you decide you don\'t care to be bullied by this man, my sessions will be open to you.', 340, 68, { anchor: 'tc', w: 460, fixed: true })], { mood: 'cold', alt: 'Harry walks out from the benches toward the door. The class stares.' });
ep.panel(900, { cam: { x: -280, y: 640, w: 700 }, bg: PR({}), actors: [{ def: harryRaven, id: 'harry', x: -190, y: 960, s: 1.35, turn: 0.45, pose: 'stand', expr: 'cold', armF: { sh: -142, el: 0, hand: 'hold' } }], over: (e) => FX.frost(e.w, e.h, 0.72, 107) },
  [shout('Snape', '*Sit down, Potter!*', 560, 150, { w: 280, fixed: true, noTail: true }),
   cap('Harry grasped the doorknob. It didn\'t turn.', 44, 790, { w: 520, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: { x: 25, y: 680, w: 800 }, bg: PR({}), actors: [{ def: harryRaven, id: 'harry', x: -250, y: 960, s: 1.1, turn: 0.5, pose: 'stand', expr: 'cold' }, SN({ x: 300, turn: -0.5, pose: 'crossArms', expr: 'coldSmile' })], over: (e) => FX.frost(e.w, e.h, 0.75, 108) },
  [cold('Harry', 'Open this door.', 220, 120, { w: 240, fixed: true }),
   say('Snape', 'No.', 460, 250, { w: 100, fixed: true })], { mood: 'cold' });
ep.multi(700, [
  { x: M, y: 18, w: 368, h: 664, mood: 'cold', art: { cam: { x: -250, y: 619, w: 300 }, bg: PR({}), blur: 3, actors: [{ def: harryRaven, id: 'harry', x: -250, y: 960, s: 1.1, turn: 0.3, expr: { base: 'cold', glint: true } }], over: (e) => FX.frost(e.w, e.h, 0.8, 109) } },
  { x: 408, y: 18, w: 368, h: 664, mood: 'candle', art: tilt(4, { cam: { x: 300, y: 390, w: 300 }, bg: PR({}), blur: 3, actors: [SN({ x: 300, turn: -0.35, expr: { base: 'smug', eyes: { lookX: -0.6, lookY: 0.5 } } })] }, SHADE('#050a08', 0.5)) },
], [cold('Harry', 'You are making me feel threatened. And that is a mistake.', 208, 60, { anchor: 'tc', w: 290, fixed: true }),
   say('Snape', 'What do you intend to do about it, little boy?', 592, 64, { anchor: 'tc', w: 240, fixed: true })]);
ep.bleed(920, tilt(-5, { cam: { x: 850, y: 840, w: 700 }, bg: PR({}), actors: [SN({ x: 1090, y: 1190, turn: -0.4, expr: 'shock' }), { def: harryRaven, id: 'harry', x: 720, y: 1250, s: 1.5, turn: 0.35, pose: 'stand', poseMod: { armB: { sh: 100, el: 78, hand: 'fist', front: true } }, expr: { base: 'cold', eyes: { lookX: 0.5 } } }], behind: (e) => FX.burst(e.w, e.h, e.w * 0.3, e.h * 0.42, { n: 50, op: 0.18 }) }, (e) => FX.frost(e.w, e.h, 0.85, 109)),
  [cap('Harry took six long strides back into the room. Then he drew himself upright, and raised his right hand in one terrible motion, fingers poised to snap.', 44, 40, { w: 640, fixed: true })], { mood: 'cold', alt: 'Harry, towering in the aisle, one hand raised to snap. Snape stares.' });
ep.panel(900, { cam: { x: 1230, y: 747, w: 520 }, bg: PR({}), blur: 2, actors: CLASS({ he: { pose: 'panic', seat: undefined, y: 1080, expr: 'yell', turn: -0.3 }, n: { pose: 'cower', seat: undefined, y: 1210, expr: 'horror', turn: -0.2 }, who: { ernie: { expr: 'horror' } } }), over: (e) => FX.frost(e.w, e.h, 0.4, 110) },
  [cap('Neville screamed and dived under his desk.', 44, 30, { w: 460, fixed: true }),
   shout('Hermione', '*HARRY DON\'T! Whatever you were going to do to him, don\'t do it!*', 400, 175, { anchor: 'tc', w: 440, fixed: true })], { mood: 'candle' });
ep.panel(900, { cam: { x: 524, y: 722, w: 480 }, bg: PR({}), blur: 2, actors: [{ def: harryRaven, id: 'harry', x: 450, y: 1000, s: 1.1, turn: 0.3, pose: 'stand', expr: { base: 'calm', cold: true, eyes: { lookX: 0.6 } } }], over: (e) => FX.frost(e.w, e.h, 0.7, 111) },
  [say('Snape', 'Have you all gone *mad?*', 400, 70, { anchor: 'tc', w: 280, fixed: true, noTail: true }),
   say('Harry', 'I wasn\'t going to hurt him, Hermione. I was just going to blow up the door.', 555, 330, { w: 300, fixed: true }),
   inner('Harry', '*(Though now that he remembered it, you weren\'t supposed to Transfigure anything that was to be burned…)*', 400, 860, { anchor: 'bc', w: 540, fixed: true })], { mood: 'cold' });
ep.panel(900, tilt(-4, { cam: { x: 930, y: 389, w: 620 }, bg: PR({}), blur: 2, actors: [SN({ x: 1000, turn: -0.4, pose: 'wand', expr: 'angry', armB: { hand: 'hold', prop: wand(110) } })] }, SHADE('#050a08', 0.4)),
  [say('Snape', '*Silencio.* This has become ridiculous. You are the most disruptive and unruly student I have ever seen. I don\'t recall how many points Ravenclaw has right now, but I\'m sure I can manage to wipe them all out.', 400, 64, { anchor: 'tc', w: 560, fixed: true })], { mood: 'candle', alt: 'Snape levels his wand at Harry.' });
ep.bleed(1080, tilt(6, { cam: { x: 1000, y: 602, w: 440 }, bg: PR({}), blur: 3, actors: [SN({ x: 1000, turn: -0.1, expr: { base: 'yell', eyes: { style: 'cold', open: 0.8, lidTilt: -0.5 }, brows: { raise: -0.4, inner: -1.5, outer: 0.3 } } })] }, (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.3, { n: 40, op: 0.25 })),
  [shout('Snape', 'Ten points from Ravenclaw! Ten points from Ravenclaw! Ten points from Ravenclaw! *FIFTY* points from Ravenclaw! Now sit down and watch the rest of the class take their lesson!', 400, 945, { anchor: 'bc', w: 390, size: 31, fixed: true })], { alt: 'Snape, shouting, taking points in a stream.' });
ep.panel(1000, { cam: { x: 480, y: 742, w: 340 }, bg: PR({}), blur: 2, actors: [{ def: harryRaven, id: 'harry', x: 450, y: 1000, s: 1.1, turn: 0.2, pose: 'hold', expr: { base: 'cold', eyes: { lookY: 0.6 } }, armF: { sh: -35, el: -115, hand: 'hold', prop: g({ transform: 'rotate(180) translate(0,-20)' }, P2.marker(0.55)) }, armB: { sh: 30, el: 70, hand: 'hold', prop: g({ transform: 'rotate(8)' }, sheet({ w: 110, h: 80 })) } }], over: (e) => FX.frost(e.w, e.h, 0.72, 112) },
  [cap('Harry tried to say "What?", and found that no sound came out.', 44, 30, { w: 620, fixed: true }),
   cap('He put his hand into his pouch and tried to say "marker". Nothing, of course. Then it occurred to him to spell out M-A-R-K-E-R with his fingers. It worked. P-A-D. A pad of paper.', 44, 800, { w: 620, fixed: true })], { mood: 'candle' });
const HOLDERS = (cx, cy, w, h) => [-1, 1].map((k) => { const x = cx + k * (w / 2 - 40), y = cy + h / 2 - 20; return path(`M${x - 46},${y + 420} L${x - 38},${y + 20} Q${x},${y - 10} ${x + 38},${y + 20} L${x + 46},${y + 420}Z`, { fill: '#1c1e2a', stroke: C.ink, 'stroke-width': 3 }) + ellipse(x, y - 4, 26, 30, { fill: '#f0c9a6', stroke: C.ink, 'stroke-width': 3 }) + ellipse(x - k * 18, y - 30, 12, 20, { fill: '#f0c9a6', stroke: C.ink, 'stroke-width': 3 }); }).join('');
ep.bleed(900, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#1e2422' }) + g({ transform: `translate(${ctx.w / 2},${ctx.h / 2 + 30})` }, P2.sign(["I'M LEAVING", 'DOES ANYONE ELSE', 'NEED TO GET OUT?'], 620, 460)) + HOLDERS(ctx.w / 2, ctx.h / 2 + 30, 620, 460),
  [cap('He held up his message. Not to Snape. To the rest of the class.', 44, 40, { w: 560, fixed: true })], { alt: 'A sheet of paper in marker: I\'M LEAVING / DOES ANYONE ELSE / NEED TO GET OUT?' });
ep.panel(800, { cam: { x: 850, y: 700, w: 1200 }, bg: PR({}), actors: [SN({ x: 1350, turn: -0.4, expr: { base: 'cold', eyes: { lookX: -0.6, lookY: 0.3 } } }), ...CLASS({ h: { x: -900 }, who: { padma: { expr: 'gasp', turn: -0.3 }, hannah: { expr: 'worried', turn: -0.4 }, justin: { expr: 'gasp', turn: -0.4 }, ernie: { expr: 'worried', turn: -0.4 }, terry: { expr: 'gasp', turn: -0.5 } }, he: { expr: 'worried', turn: -0.4 }, n: { expr: 'gasp', turn: -0.4 } }), { def: harryRaven, id: 'harry', x: 420, y: 1400, s: 1.45, turn: 0.5, pose: 'hold', expr: 'cold', armB: { sh: 60, el: 40, hand: 'hold', prop: g({ transform: 'rotate(92) translate(30,-2)' }, P2.sign(["I'M LEAVING", 'DOES ANYONE ELSE', 'NEED TO GET OUT?'], 170, 125)) } }], over: (e) => FX.frost(e.w, e.h, 0.6, 113) },
  [say('Snape', 'You\'re insane, Potter.', 540, 100, { w: 240, fixed: true }),
   cap('Aside from that, no-one spoke.', 44, 230, { w: 400, fixed: true })], { mood: 'candle', alt: 'Harry faces the class, holding up his sign. Snape watches from the front.' });
ep.panel(900, { cam: { x: 1600, y: 620, w: 700 }, bg: PR({ cupboard: 'open' }), actors: [{ def: harryRaven, id: 'harry', x: 1650, y: 920, s: 1.1, turn: 0.4, pose: 'bowGrand', expr: 'coldSmile' }], over: (e) => FX.frost(e.w, e.h, 0.5, 114) },
  [cap('Harry swept an ironic bow to the teacher\'s desk, walked over to the wall, and with one smooth motion yanked open a cupboard door, stepped in, and slammed it shut behind him.', 44, 30, { w: 620, fixed: true }),
   sfx('SLAM', 610, 800, { size: 84, rot: 6 })], { mood: 'candle' });
ep.panel(760, { cam: { x: 1650, y: 560, w: 700 }, bg: PR({}) },
  [cap('There was the muffled sound of someone snapping his fingers. And then nothing.', 44, 30, { w: 560, fixed: true }),
   sfx('snap', 470, 600, { size: 54, font: "'Caveat', cursive", rot: -8 })], { mood: 'candle', alt: 'The closed cupboard door.' });
ep.panel(820, tilt(4, { cam: { x: 1330, y: 520, w: 640 }, bg: PR({ cupboard: 'open' }), actors: [SN({ x: 1250, y: 920, turn: 0.4, pose: 'reach', expr: { base: 'angry', mouth: { type: 'shout', open: 0.5 } }, armB: { sh: 90, el: 10, hand: 'hold' } })] }, SHADE('#050a08', 0.4)),
  [cap('The Potions Master\'s face was completely enraged. He crossed the room in terrible strides and yanked open the cupboard door.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'Snape wrenches the cupboard door open.' });
ep.panel(620, { cam: { x: 1650, y: 590, w: 440 }, bg: PR({ cupboard: 'open' }), over: SHADE('#000', 0.3) },
  [capC('The cupboard was empty.', 400, 300, { w: 360, fixed: true })], { mood: 'candle', alt: 'An empty cupboard, dark inside.' });

// ---------------------------------------------------------------- one hour earlier
ep.setBg('#1c2233');
ep.beat(380, [title('One hour earlier.', 400, 190, { size: 50, color: '#f1e6cc' })], { over: () => g({ transform: 'translate(400,300) scale(0.5)' }, P2.timeTurner(1, { chain: false, rot: 20, glow: true })) });
ep.setBg(C.paper);
ep.panel(960, { cam: { x: 1650, y: 590, w: 640 }, bg: PR({ cupboard: 'open' }), actors: [{ def: harryRaven, id: 'harry', x: 1650, y: 900, s: 1.1, turn: 0.1, pose: 'hold', expr: 'focus' }, (e) => g({ transform: 'translate(1650,700)' }, P2.cloak(260, 340, { fade: 0.85 }))] },
  [cap('One hour earlier, Harry listened from inside the closed cupboard. No sound. C-L-O-A-K, his fingers spelled. The classroom was empty. The door wasn\'t locked.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'Harry in the cupboard, pulling the shimmering Cloak over himself.' });
ep.bleed(1100, { cam: { x: 1000, y: 560, w: 1100 }, bg: () => CS.corridor({ seed: 43, windows: [], torches: [500, 1500], dim: true }) + rect(-800, -900, 4000, 2200, { fill: '#0c1a14', opacity: 0.3 }), actors: [() => CS.invisible(1000, 900, 1.25) + K.glow(1000, 620, 260, '#dfe8f5', 0.12)] },
  [cap('It was when Harry was outside the dangerous place, and inside the hallway, safely invisible, that some of the anger drained away. And he realised what he had just done.', 44, 40, { w: 640, fixed: true }),
   capC('What he had just done.', 400, 1000, { anchor: 'bc', w: 360, fixed: true })], { alt: 'An empty corridor. A faint shimmer where a boy is standing, very still.' });
ep.panel(950, { cam: { x: 1000, y: 536, w: 320 }, bg: () => CS.corridor({ seed: 43, windows: [], torches: [500, 1500], dim: true }), blur: 3, actors: [{ def: harryRaven, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0, expr: 'horror' }], over: (e) => rect(0, 0, e.w, e.h, { fill: '#dfe8f5', opacity: 0.18 }) },
  [cap('Under the Cloak, his face was frozen in absolute horror. He had antagonised a teacher three orders of magnitude beyond anything he\'d ever managed before. He had threatened to walk out of Hogwarts. He had lost all of Ravenclaw\'s points. And then he had used the Time-Turner…', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
ep.multi(1000, [
  { x: M, y: 18, w: 752, h: 480, mood: 'sepia', art: { cam: { x: 965, y: 514, w: 520 }, bg: () => rect(-500, -500, 3000, 2000, { fill: '#b9a27a' }), actors: [{ def: dadDef(), id: 'dad', x: 850, y: 1000, turn: 0.3, pose: 'fists', expr: 'yell' }, { def: mumDef(), id: 'mum', x: 1050, y: 1010, turn: -0.3, pose: 'stand', expr: 'cry' }], over: (e) => FX.memoryEdge(e.w, e.h) } },
  { x: M, y: 514, w: 752, h: 468, mood: 'sepia', art: { cam: { x: 892, y: 516, w: 440 }, bg: () => rect(-500, -500, 3000, 2000, { fill: '#b9a27a' }), actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1000, y: 1000, turn: 0, expr: 'sad' }], over: (e) => FX.memoryEdge(e.w, e.h) } },
], [cap('His imagination showed him his parents yelling at him after he was expelled.', 36, 30, { w: 300, fixed: true }), cap('And Professor McGonagall, disappointed in him.', 36, 526, { w: 370, fixed: true })],
  { alt: 'Imagined: his parents shouting; McGonagall\'s sad face.' });
ep.panel(1100, { cam: { on: ['harry'], fr: 'bust', dy: -0.1 }, bg: () => CS.corridor({ seed: 43, windows: [], torches: [500, 1500], dim: true }), blur: 2, actors: [{ def: harryRaven, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0, pose: 'panic', expr: 'cry' }], over: (e) => rect(0, 0, e.w, e.h, { fill: '#dfe8f5', opacity: 0.18 }) },
  [cap('It was just too painful, and he couldn\'t bear it, and he *couldn\'t think of any way to save himself…*', 44, 30, { w: 620, fixed: true }),
   cap('The thought Harry allowed himself to think was that if getting angry had landed him in all this trouble, then maybe when he was angry he\'d think of a way out. Things seemed clearer, somehow, when he was angry.', 44, 740, { w: 620, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: { head: 'harry', hw: 0.95, hx: 0.5, hy: 0.56 }, bg: () => CS.corridor({ seed: 43, windows: [], torches: [500, 1500], dim: true }), blur: 3, actors: [{ def: harryRaven, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0, expr: 'sad' }], over: (e) => rect(0, 0, e.w, e.h, { fill: '#0c1428', opacity: 0.3 }) },
  [capC('And the thought that Harry *didn\'t* let himself think was that he just couldn\'t face this future if he wasn\'t angry.', 400, 64, { anchor: 'tc', w: 560, fixed: true })], { mood: 'candle' });
ep.panel(1000, { cam: { x: 1072, y: 456, w: 360 }, bg: PR({}), blur: 3, actors: [SN({ x: 1150, turn: -0.25, expr: { base: 'smug', eyes: { lookX: -0.5, lookY: 0.4 } } })], over: (e) => FX.memoryEdge(e.w, e.h) + FX.frost(e.w, e.h, 0.45, 111) },
  [cap('So he cast his thoughts back, and remembered the burning humiliation…', 44, 30, { w: 620, fixed: true }),
   say('Snape', '*Tut, tut. Fame clearly isn\'t everything.*', 200, 330, { w: 250, fixed: true }),
   say('Snape', '*Ten points from Ravenclaw for backchat.*', 210, 640, { w: 250, fixed: true })], { mood: 'sepia', alt: 'Remembered: Snape\'s smirk.' });
ep.bleed(1100, { cam: { x: 1085, y: 651, w: 420 }, bg: () => CS.corridor({ seed: 43, windows: [], torches: [500, 1500], dim: true }), actors: [{ def: harryRaven, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0, expr: 'cold' }], over: (e) => FX.frost(e.w, e.h, 0.85, 113) + rect(0, 0, e.w, e.h, { fill: '#0c1428', opacity: 0.25 }) },
  [cap('The calming cold washed back through his veins like a wave returning from some breaker. And Harry let out his breath.', 44, 40, { w: 620, fixed: true }),
   cold('Harry', 'Okay. Back to being sane now.', 570, 560, { w: 300, fixed: true })], { mood: 'cold', alt: 'The frost comes back, all the way.' });
ep.panel(1300, { cam: { x: 1000, y: 630, w: 440 }, bg: () => CS.corridor({ seed: 43, windows: [], torches: [500, 1500], dim: true }), blur: 2, actors: [{ def: harryRaven, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0.2, pose: 'stand', expr: 'coldSmile' }], over: (e) => FX.frost(e.w, e.h, 0.88, 115) + rect(0, 0, e.w, e.h, { fill: '#0c1428', opacity: 0.2 }) },
  [cold('Harry', 'He was actually a bit disappointed in his non-angry self, for collapsing like that and wanting only to get out of trouble. Snape was *everyone\'s* problem. Normal-Harry had forgotten that, and wished only to protect *himself.* And let all the other victims go hang?', 400, 76, { anchor: 'tc', w: 560, fixed: true }),
   cold('Harry', 'So this is my dark side, is it? Bit of a prejudiced term, that. My light side seems more selfish and cowardly. Not to mention confused and panicky.', 400, 1255, { anchor: 'bc', w: 560, fixed: true, tail: [430, 1040] })], { mood: 'cold' });
ep.bleed(820, { cam: { on: ['harry'], fr: 'eyes', zoom: 0.8 }, bg: () => CS.corridor({ seed: 43, windows: [], torches: [500, 1500], dim: true }), actors: [{ def: harryRaven, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0, expr: { base: 'cold', eyes: { open: 0.5 } } }], over: (e) => FX.frost(e.w, e.h, 0.92, 117) + rect(0, 0, e.w, e.h, { fill: '#0c1428', opacity: 0.35 }) },
  [capC('The question wasn\'t how to protect himself.', 400, 70, { anchor: 'tc', w: 560, fixed: true })], { mood: 'cold', fadeBottom: false, alt: 'Harry\'s eyes, ice-cold.' });
ep.setBg('#0c1428');
ep.beat(460, [plain('The question was how to destroy this Potions professor.', 400, 230, { font: "'IM Fell English', serif", size: 44, color: '#e3eef7', w: 640 })], { over: (t) => FX.frost(t.W, t.H, 0.6, 119) });
ep.setBg(C.paper);
ep.end();
export default ep;
