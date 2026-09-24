// EPISODE 1 — A Day of Very Low Probability  (source: HPMOR ch. 1 + ch. 1 epigraph)
// See docs/episodes/ep01.md for beat notes and adaptation choices.
import { Episode, say, shout, whisper, think, inner, cold, cap, capC, dark, note, title, plain, M } from '../engine/core/dsl.js';
import { shot } from '../engine/core/scene.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text } from '../engine/core/svg.js';
import * as O from '../engine/bg/oxford.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harry, dad, mum, figg, lilyTeen, petuniaTeen, vernon } from '../engine/chars/cast.js';
import { envelope, sheet, seal, bookHeld, bookOpen, pencil, cat, crumpledBall, teacup } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep01', number: 1, title: 'A Day of Very Low Probability' });
const NIGHT = '#07080d';

// ---------- staging helpers
const LR = (o = {}) => (env) => O.livingRoom(o);
const chairBack = O.armchairBack(1520, 1010, 1.3);
const chairFront = O.armchairFront(1520, 1010, 1.3);
const DAD = (o = {}) => ({ def: dad, id: 'dad', x: 820, y: 1000, turn: 0.45, ...o });
const MUM = (o = {}) => ({ def: mum, id: 'mum', x: 1170, y: 1000, turn: -0.45, ...o });
const HARRY_CHAIR = (o = {}) => ({ def: harry, id: 'harry', x: 1520, y: 972, s: 1.12, turn: -0.35, pose: 'sitRead', expr: 'focus', armF: { prop: bookHeld('#274060', { rot: 180, w: 60, h: 80 }) }, ...o });

// =============================================================== COLD OPEN
ep.setBg(NIGHT);
ep.bleed(1000, { cam: { x: 800, y: 700, w: 900 }, bg: () => O.moonNight({ moonX: 980, moonY: 455 }),
  over: (e) => FX.silverThread(-20, e.h * 0.86, e.w + 20, e.h * 0.34, { gx: e.w * 0.62 }) },
  [dark('Beneath the moonlight glints a tiny fragment of silver, a fraction of a line…', 400, 100, { w: 560 })],
  { fadeTop: false, alt: 'A moonlit night sky. A single hair-thin silver thread catches the light.' });
ep.bleed(900, { cam: { x: 800, y: 800, w: 1000 }, bg: () => O.moonNight({ moonX: 1300, moonY: 300, seed: 5 }),
  over: (e) => FX.fallingRobes(e.w, e.h, 14, 6) + rect(0, 0, e.w, e.h, { fill: '#000', opacity: 0.15 }) },
  [dark('(black robes, falling)', 280, 490, { w: 420 })], { alt: 'Black robes tumble through the moonlit air like crows.' });
ep.bleed(760, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#050507' }) +
  `<defs><radialGradient id="bl1" cx="0.5" cy="1.1" r="0.9"><stop offset="0" stop-color="#6e0d14" stop-opacity="0.9"/><stop offset="1" stop-color="#050507" stop-opacity="0"/></radialGradient></defs>` +
  rect(0, 0, ctx.w, ctx.h, { fill: 'url(#bl1)' }) + FX.screamShape(ctx.w * 0.55, ctx.h * 0.52, 360, 150, 3) +
  g({ opacity: 0.85 }, rect(ctx.w * 0.55 - 120, ctx.h * 0.52 - 8, 240, 16, { fill: '#8a1a1a', filter: 'url(#blur2)' })),
  [dark('…blood spills out in litres, and someone screams a word.', 400, 110, { w: 560 })], { alt: 'Darkness. A red stain rising. A scream too loud to read.' });
ep.tile({ h: 900, bg: { top: NIGHT, bottom: C.paper }, gutterGrain: true,
  over: (t) => g({ transform: 'translate(400,640) scale(1.1)' }, envelope({ back: true, w: 150, h: 96, sealText: 'H' })),
  bubbles: [
    title('Harry Potter', 400, 330, { size: 70, color: '#f1e6cc' }),
    plain('and the', 400, 400, { font: "'IM Fell English', serif", size: 34, color: '#e8dcc2' }),
    title('Methods of Rationality', 400, 460, { size: 58, color: '#f6ead0' }),
    plain('CHAPTER ONE · A Day of Very Low Probability', 400, 790, { font: "'IM Fell English SC', serif", size: 26, color: '#3a2a20', w: 700 }),
  ], alt: 'Title: Harry Potter and the Methods of Rationality. Chapter One: A Day of Very Low Probability.' });

// =============================================================== OXFORD
ep.setBg(C.paper);
ep.panel(660, { cam: { x: 800, y: 580, w: 1500 }, bg: () => O.houseExterior() },
  [cap('Oxford, England. The wettest July anyone could remember.', 44, 36, { w: 340 })], { mood: 'rainy', alt: 'A row of Victorian brick houses in the rain. One window glows warm.' });

ep.panel(620, { cam: { x: 560, y: 600, w: 1100 }, bg: LR() },
  [cap('Every inch of wall space is covered by a bookcase.', 44, 36, { w: 330 }),
   cap('And it still isn\'t enough.', 440, 330, { w: 300 })],
  { mood: 'warm', alt: 'A cosy living room drowning in books: shelves to the ceiling, more books heaped under the rain-streaked window.' });

ep.panel(760, { cam: { x: 1170, y: 700, w: 1000 }, bg: LR(),
  actors: [DAD({ pose: 'gesture', expr: 'unimpressed' }), MUM({ pose: 'hold', expr: 'worried' }), chairBack, HARRY_CHAIR(), chairFront] },
  [cap('This is the home of Professor Michael Verres-Evans, his wife Petunia Evans-Verres, and their adopted son, Harry James Potter-Evans-Verres.', 44, 36, { w: 610 })],
  { mood: 'warm', alt: 'A man and a woman stand arguing by the fire. A small boy with messy black hair and round glasses reads in an armchair.' });

ep.panel(560, { cam: { x: 990, y: 860, w: 290 }, bg: LR(), blur: 0 },
  [cap('There is a letter on the table. Yellowish parchment. Emerald ink. No stamp.', 44, 30, { w: 440 })],
  { mood: 'warm', alt: 'Close on the coffee table: a parchment envelope addressed in emerald ink to Mr H. Potter.' });

ep.panel(760, { cam: { on: ['dad', 'mum'], fr: 'waist' }, bg: LR(), actors: [DAD({ expr: 'unimpressed', pose: 'crossArms' }), MUM({ expr: 'determined', pose: 'fists' })] },
  [say('Dad', 'You\'re joking.', 190, 90, { w: 220 }),
   say('Mum', 'My sister was a witch.', 560, 90, { w: 260 }),
   say('Mum', 'Her husband was a wizard.', 580, 220, { w: 260 })], { mood: 'warm' });

ep.panel(700, { cam: { on: ['dad'], fr: 'bust' }, bg: LR(), actors: [DAD({ expr: 'yell', pose: 'shrug', turn: 0.5 })] },
  [shout('Dad', 'This is absurd! They were at our *wedding!* They came for *Christmas!*', 420, 120, { w: 400, size: 30 })], { mood: 'warm' });

ep.panel(640, { cam: { on: ['mum'], fr: 'close' }, bg: LR(), actors: [MUM({ expr: 'pained', turn: -0.35 })] },
  [whisper('Mum', 'I told them you weren\'t to know.', 250, 100, { w: 280 })], { mood: 'warm' });

// Harry peeks over his book — his first real appearance
ep.panel(560, { cam: { on: ['harry'], fr: 'close', dy: 0.15 }, bg: LR(), blur: 2,
  actors: [chairBack, HARRY_CHAIR({ expr: { base: 'focus', eyes: { lookX: -0.9, open: 0.9 } }, turn: -0.2, armF: { sh: 40, el: 118, hand: 'hold', prop: '' }, armB: { sh: 10, el: 30, hand: 'hold' } }),
    (env) => { const h = env.wa.harry.handF; return g({ transform: `translate(${h[0] + 17},${h[1] - 7}) scale(1.12)` }, bookHeld("#274060", { rot: -22, w: 150, h: 170 })); }] },
  [note('…', 700, 170, { size: 130 })], { mood: 'warm', alt: 'Harry peers over the top of a large book, eyes darting between his parents.' });

ep.panel(980, { cam: { on: ['dad'], fr: 'waist', dx: 0.6, dy: -0.4 }, bg: LR(), actors: [DAD({ expr: 'smug', pose: 'lecture', turn: 0.4 })] },
  [say('Dad', 'Dear, I understand you\'re not familiar with the sceptical literature.', 520, 90, { w: 380 }),
   say('Dad', 'A trained magician can fake almost anything. Remember how I taught Harry to bend spoons?', 520, 590, { w: 400 })], { mood: 'warm' });

ep.panel(760, { cam: { on: ['mum'], fr: 'bust', dy: -0.3 }, bg: LR(), actors: [MUM({ expr: 'hurt', pose: 'hold', turn: -0.3 })] },
  [say('Mum', 'It wasn\'t bending spoons.', 230, 80, { w: 280 }),
   say('Mum', 'Michael. I wasn\'t… always like this.', 250, 630, { w: 300 })], { mood: 'warm' });

// ---- Petunia's memory (sepia)
const MEM = { mood: 'sepia', overlay: (ctx) => FX.memoryEdge(ctx.w, ctx.h) };
const gardenMem = (env) => rect(-400, -400, 3000, 3000, { fill: '#cdb68a' }) + K.brickWall(-400, 200, 3000, 700, '#9a6a52', 3) + rect(-400, 900, 3000, 900, { fill: '#8aa070' });
ep.panel(760, { cam: { on: ['lily', 'pet'], fr: 'knees', dy: -1.2 }, bg: gardenMem,
  actors: [{ def: petuniaTeen, id: 'pet', x: 700, y: 1100, turn: 0.45, expr: 'sad', pose: 'crossArms' }, { def: lilyTeen, id: 'lily', x: 1060, y: 1100, turn: -0.4, expr: 'delight', pose: 'present' }],
  over: (e) => FX.sparkles([[e.anchors?.lily?.handF?.[0] ?? 430, (e.anchors?.lily?.handF?.[1] ?? 380) - 30, 14]]) },
  [cap('“Lily was always the pretty one. And then she got *magic.* Can you imagine how I felt?”', 60, 40, { w: 400 })], { ...MEM, alt: 'Memory, in sepia: two teenage sisters. The red-haired one makes flowers bloom in her palm. The plainer one watches, arms crossed.' });

ep.panel(700, { cam: { on: ['lily', 'pet'], fr: 'bust', dy: -0.9 }, bg: gardenMem,
  actors: [{ def: petuniaTeen, id: 'pet', x: 760, y: 1100, turn: 0.45, expr: 'pleading', pose: 'reach' }, { def: lilyTeen, id: 'lily', x: 1060, y: 1100, turn: -0.45, expr: 'worried', pose: 'crossArms' }] },
  [cap('“I begged her to use it on me. For *years.* She always said no, with the most ridiculous excuses. A *centaur* told her not to!”', 272, 40, { w: 420 })], MEM);

ep.panel(900, { cam: { on: ['pet', 'vernon'], fr: 'waist', dy: -1.4 }, bg: gardenMem,
  actors: [{ def: vernon, id: 'vernon', x: 1120, y: 1120, turn: -0.4, expr: 'smug', pose: 'handsHips' }, { def: petuniaTeen, id: 'pet', x: 740, y: 1100, turn: 0.4, expr: 'horror', pose: 'panic' }] },
  [cap('“Then I started going out with a boy called Vernon Dursley. He said he wanted a son, and he\'d name him *Dudley.*”', 60, 36, { w: 460 }),
   say('Vernon', 'Dudley Dursley. Good strong name, that.', 560, 250, { w: 250 }),
   whisper('Petunia', '*Dudley… Dursley?*', 330, 600, { w: 260, tail: 'pet' })], MEM);

ep.panel(700, { cam: { on: ['lily', 'pet'], fr: 'bust', dy: -0.7 }, bg: gardenMem,
  actors: [{ def: petuniaTeen, id: 'pet', x: 760, y: 1100, turn: 0.45, expr: 'determined', pose: 'holdOne', armF: { prop: g({ transform: 'translate(0,34)' }, path('M-10,-30 L10,-30 L14,-4 Q14,30 0,30 Q-14,30 -14,-4Z', { fill: '#9fd0a8', stroke: C.ink, 'stroke-width': 2 }), rect(-6, -42, 12, 14, { fill: '#8a6a3a', stroke: C.ink, 'stroke-width': 2 })) } },
    { def: lilyTeen, id: 'lily', x: 1060, y: 1100, turn: -0.45, expr: 'sad', pose: 'present' }] },
  [cap('“So she gave in. I drank a potion. I was sick for weeks… and when I got better, I was *beautiful.*”', 300, 40, { w: 440 })], MEM);

// ---- back to the present
ep.panel(820, { cam: { on: ['mum'], fr: 'close', dy: -0.35 }, bg: LR(), actors: [MUM({ expr: 'teary', turn: -0.3 })] },
  [say('Mum', 'After that I couldn\'t hate her any more. Especially when I learned what her magic brought her in the end.', 270, 110, { w: 400 })], { mood: 'warm' });

ep.panel(900, { cam: { on: ['dad', 'mum'], fr: 'waist', dy: -1.3, zoom: 1.25 }, bg: LR(), actors: [DAD({ expr: 'warm', pose: 'gesture' }), MUM({ expr: 'teary', pose: 'hold' })] },
  [say('Dad', 'Darling. You got sick, you rested in bed, and your skin cleared up on its own.', 250, 100, { w: 400 }),
   say('Mum', 'She was a witch. I *saw* it.', 600, 640, { w: 240 })], { mood: 'warm' });

ep.panel(780, { cam: { on: ['dad'], fr: 'bust', dx: 0.3, dy: -0.35 }, bg: LR(), actors: [DAD({ expr: 'cross', pose: 'handsHips' })] },
  [say('Dad', 'Petunia. You *know* that can\'t be true. Do I really have to explain why?', 470, 100, { w: 360 })], { mood: 'warm' });

ep.panel(760, { cam: { on: ['mum'], fr: 'bust', dy: -0.45 }, bg: LR(), actors: [MUM({ expr: 'pleading', pose: 'hold', turn: -0.4 })] },
  [say('Mum', 'My love, I know I can\'t win arguments with you, but please, just this once…', 270, 90, { w: 380 })], { mood: 'warm' });

// ---- DAD! MUM!
ep.panel(900, { cam: { on: ['harry'], fr: 'full', dy: -0.2 }, bg: LR(), blur: 1,
  actors: [chairBack, { def: harry, id: 'harry', x: 1520, y: 925, s: 1.12, turn: -0.2, pose: 'fists', expr: 'yell' }, chairFront,
    g({ transform: 'translate(1420,860) rotate(-35)' }, bookHeld('#274060', { w: 60, h: 80 }))],
  mid: (e) => g({ transform: `translate(${e.cam.x - e.w / 2 / e.z},${e.cam.y - e.h / 2 / e.z}) scale(${1 / e.z})` }, FX.burst(e.w, e.h, e.w / 2, e.h * 0.35, { bg: '#f3e2b8', col: '#d9a55a', op: 0.9 })) },
  [shout('Harry', 'DAD! MUM!', 400, 110, { w: 400, size: 56 })], { mood: 'warm', alt: 'Harry leaps up on the armchair, fists clenched, book flying.' });

ep.panel(730, { cam: { on: ['dad', 'mum'], fr: 'bust', dy: -0.9, zoom: 1.25 }, bg: LR(), actors: [DAD({ expr: 'gasp', turn: 0.8 }), MUM({ expr: 'gasp', turn: 0.6 })] },
  [cap('They looked at him as though they\'d forgotten there was a third person in the room.', 44, 30, { w: 600 })], { mood: 'warm' });

ep.panel(760, { cam: { on: ['harry'], fr: 'waist' }, bg: LR(), actors: [{ def: harry, id: 'harry', x: 1400, y: 1010, s: 1.12, turn: -0.4, pose: 'gesture', expr: 'focus' }] },
  [say('Harry', 'Mum, *your* parents didn\'t have magic, did they?', 250, 90, { w: 320 }),
   say('Harry', 'So when Lily got her letter… how did *they* get convinced?', 270, 560, { w: 320 })], { mood: 'warm' });

ep.panel(760, { cam: { on: ['mum'], fr: 'bust', dy: -0.35, dx: 0.3 }, bg: LR(), actors: [MUM({ expr: 'confused', turn: 0.4 })] },
  [say('Mum', 'Ah… They didn\'t just send a letter. They sent a professor from Hogwarts.', 470, 100, { w: 400 }),
   say('Mum', 'She showed us some magic.', 610, 560, { w: 250 })], { mood: 'warm' });

ep.panel(1000, { cam: { on: ['harry'], fr: 'waist', dx: -0.6, dy: -0.75, zoom: 0.88 }, bg: LR(), actors: [{ def: harry, id: 'harry', x: 1400, y: 1010, s: 1.12, turn: -0.3, pose: 'present', expr: 'delight' }],
  mid: (e) => g({ transform: `translate(${e.cam.x - e.w / 2 / e.z},${e.cam.y - e.h / 2 / e.z}) scale(${1 / e.z})` }, rect(0, 0, e.w, e.h, { fill: '#f6e3b0', opacity: 0.55 })) },
  [say('Harry', 'Then you don\'t have to fight about this!', 256, 84, { w: 320 }),
   say('Harry', 'We get a Hogwarts professor here, and we *look.* If it\'s real, Dad admits it. If it isn\'t, Mum admits it.', 505, 300, { w: 400 }),
   say('Harry', 'That\'s what experiments are *for!* So we don\'t have to settle things by arguing!', 250, 790, { w: 300 })], { mood: 'warm', alt: 'Harry, lit up with the idea, spreads his hands.' });

ep.panel(820, { cam: { on: ['dad', 'harry'], fr: 'waist' }, bg: LR(),
  actors: [DAD({ x: 1150, expr: 'smile', pose: 'gesture2', turn: 0.3 }), { def: harry, id: 'harry', x: 1400, y: 1010, s: 1.12, turn: -0.3, pose: 'stand', expr: 'hopeful' }] },
  [say('Dad', 'Oh, come now, Harry. Really? *Magic?*', 262, 84, { w: 360 }),
   say('Dad', 'I thought *you\'d* know better than to take this seriously, son. Even if you\'re only ten.', 200, 620, { w: 360, tail: [185, 545] })], { mood: 'warm' });

ep.panel(760, { cam: { on: ['harry'], fr: 'close' }, bg: LR(), blur: 3, actors: [{ def: harry, id: 'harry', x: 1400, y: 1010, s: 1.12, turn: -0.15, expr: 'hurt' }] },
  [cap('Harry was given anything reasonable he wanted. Books. Tutors. Every maths competition he cared to enter.', 44, 30, { w: 420 }),
   cap('Anything, except the slightest shred of respect.', 360, 610, { w: 360 })], { mood: 'warm' });

ep.panel(520, { cam: { on: ['harry'], fr: 'eyes' }, bg: LR(), blur: 3, actors: [{ def: harry, id: 'harry', x: 1400, y: 1010, s: 1.12, turn: -0.1, expr: 'cold' }],
  over: (e) => FX.frost(e.w, e.h, 0.5, 3) },
  [inner('Harry', '*Sometimes Harry wanted to scream at his father.*', 400, 420, { w: 420 })], { mood: 'cold', alt: 'Extreme close-up on Harry\'s eyes, gone flat and cold. Frost creeps at the edges of the panel.' });

ep.panel(900, { cam: { x: 1200, y: 520, w: 900 }, bg: LR(),
  actors: [DAD({ x: 900, expr: 'cross', pose: 'lecture' }), MUM({ x: 1180, expr: 'cross', pose: 'fists' }), { def: harry, id: 'harry', x: 1500, y: 1040, s: 1.12, turn: -0.6, pose: 'slump', expr: 'sad' }] },
  [say('Mum', 'Just *once*, trust your wife who loves you!', 530, 90, { w: 320, tail: 'mum' }),
   say('Dad', 'It isn\'t a question of *trust*, dear. It\'s a question of *evidence!*', 200, 260, { w: 320, tail: 'dad' }),
   whisper('Harry', 'I\'m going to go to my room.', 620, 480, { w: 220, tail: 'harry' })], { mood: 'warm' });

ep.panel(760, { cam: { x: 652, y: 640, w: 1070 }, bg: () => O.stairs(),
  actors: [{ def: harry, id: 'harry', x: O.stairStep(6)[0], y: O.stairStep(6)[1], s: 1.0, turn: 0.6, pose: 'walk', expr: 'sad' }] },
  [whisper('Mum', '…never *listen*…', 160, 560, { w: 200, tail: [80, 700] }),
   whisper('Dad', '…being *hysterical*…', 350, 660, { w: 320, tail: [260, 760] }),
   cap('And they went on fighting while Harry climbed the stairs.', 320, 30, { w: 350 })], { mood: 'warm', alt: 'Harry climbs the staircase alone; muffled argument drifts up from below.' });

// =============================================================== BEDROOM
const HB = (o = {}) => (env) => O.bedroom(o);
const chair = (x, y) => g({}, rect(x - 50, y - 150, 100, 16, { fill: '#6b4429', stroke: C.ink, 'stroke-width': 2 }), rect(x - 46, y - 136, 10, 136, { fill: '#5e3b22' }), rect(x + 36, y - 136, 10, 136, { fill: '#5e3b22' }), rect(x - 52, y - 330, 14, 190, { fill: '#6b4429', stroke: C.ink, 'stroke-width': 2 }));
ep.panel(760, { cam: { on: ['harry'], fr: 'knees', dx: 0.4 }, bg: HB(), actors: [{ def: harry, id: 'harry', x: 330, y: 960, s: 1.1, turn: 0.35, pose: 'slump', expr: 'sad' }] },
  [think('Harry', 'The funny thing is, I *should* agree with Dad.', 520, 124, { w: 300 })], { mood: 'candle' });

ep.panel(760, { cam: { on: ['harry'], fr: 'waist' }, bg: HB(), actors: [chair(430, 960), { def: harry, id: 'harry', x: 470, y: 965, s: 1.1, turn: 0.5, pose: 'chin', expr: 'think' }] },
  [inner('Harry', 'No-one has ever seen real evidence of magic. It should be a clean case for Mum joking, lying, or being insane…', 290, 110, { w: 500 }),
   inner('Harry', '…in ascending order of awfulness.', 480, 660, { w: 520 })], { mood: 'candle' });

ep.panel(620, { cam: { x: 560, y: 632, w: 360 }, bg: HB(), actors: [g({ transform: 'translate(560,640) scale(0.9) rotate(-4)' }, envelope({}))] },
  [inner('Harry', 'Except some part of me is *utterly certain* that magic is real.', 400, 80, { w: 440 }),
   inner('Harry', '*Where do you come from, strange little prediction?*', 400, 510, { w: 390 })], { mood: 'candle', alt: 'The Hogwarts envelope in the candlelight.' });

ep.panel(680, { cam: { on: ['harry'], fr: 'close' }, bg: HB(), blur: 2, actors: [{ def: harry, id: 'harry', x: 470, y: 965, s: 1.1, turn: 0.2, expr: 'grin' }] },
  [say('Harry', 'Well. You know what you do with a testable hypothesis?', 250, 90, { w: 380 }),
   say('Harry', 'You go and *test* it.', 610, 570, { w: 260 })], { mood: 'candle' });

// letter-writing sequence (three small panels)
const deskTop = (inner2) => (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#6e4a2c' }) + K.glow(ctx.w * 0.8, ctx.h * 0.1, 400, C.candle, 0.35) + inner2(ctx);
ep.multi(680, [
  { x: M, y: 18, w: 360, h: 280, mood: 'candle', art: deskTop((c) => g({ transform: `translate(${c.w / 2},${c.h / 2}) rotate(-6)` }, sheet({ w: 280, h: 200, ruled: true, lines: [{ t: 'Dear Deputy Headmistress', size: 24 }], top: 50 }))) },
  { x: 400, y: 18, w: 376, h: 280, mood: 'candle', art: deskTop((c) => g({ transform: `translate(${c.w * 0.4},${c.h * 0.36})` }, crumpledBall(40, 2)) + g({ transform: `translate(${c.w * 0.72},${c.h * 0.3}) rotate(40)` }, pencil(120))) },
  { x: M, y: 316, w: 752, h: 346, mood: 'candle', art: deskTop((c) => g({ transform: `translate(${c.w / 2},${385}) scale(1.4) rotate(-2)` }, sheet({ w: 560, h: 520, parchment: false, ruled: true, top: 50, size: 21, lh: 1.05, lines: [
    { t: 'Dear Deputy Headmistress Minerva McGonagall,', size: 23 }, 'Or Whomsoever It May Concern:', '',
    'I recently received your letter of acceptance to Hogwarts,', 'addressed to Mr H. Potter. I am extremely interested in', 'attending Hogwarts, conditional on such a place actually existing.'] }))) },
], [cap('This called for careful calligraphy.', 428, 184, { w: 270, fixed: true })], {});
ep.panel(600, (ctx) => deskTop((c) => g({ transform: `translate(${c.w / 2},${420}) scale(1.45) rotate(-2)` }, sheet({ w: 540, h: 540, ruled: true, top: 44, size: 21, lh: 1.08, lines: [
  'Mother mentioned that you sent a Hogwarts representative', 'to Lily Potter (then Lily Evans) in order to demonstrate to', 'her family that magic was real. If you could do this for my', 'own family it would be extremely helpful.', '', { t: 'Harry James Potter-Evans-Verres', size: 26 }] })))(ctx),
  [cap('P.S. My father is highly sceptical. I myself am uncertain.', 330, 420, { w: 370, fixed: true })], { mood: 'candle', alt: 'Harry\'s letter to Hogwarts, in careful handwriting.' });

ep.panel(700, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#5e3e25' }) + K.glow(ctx.w * 0.7, ctx.h * 0.3, 500, C.candle, 0.5) +
  g({ transform: `translate(${ctx.w * 0.42},${ctx.h * 0.62}) scale(2.3) rotate(-8)` }, envelope({ back: true, sealText: 'H.J.P.E.V.' })) +
  g({ transform: `translate(${ctx.w * 0.72},${ctx.h * 0.38}) scale(2.2) rotate(18)` }, K.candle(0, 40, 1.4, true)) +
  path(`M${ctx.w * 0.66},${ctx.h * 0.43} Q${ctx.w * 0.62},${ctx.h * 0.5} ${ctx.w * 0.6},${ctx.h * 0.55}`, { fill: 'none', stroke: '#9c1f25', 'stroke-width': 6, 'stroke-linecap': 'round' }),
  [cap('If he was going to descend into this madness, he was going to do it with *style.*', 44, 34, { w: 540 })], { mood: 'candle', alt: 'Red wax drips onto the envelope flap; Harry has pressed his initials into it with a penknife: H.J.P.E.V.' });

// =============================================================== THE SILENCE
ep.multi(640, [
  { x: M, y: 18, w: 368, h: 604, mood: 'warm', art: { cam: { on: ['dad'], fr: 'waist' }, bg: LR(), actors: [K.armchair(620, 1070, 1.35, C.forest), { def: dad, id: 'dad', x: 620, y: 1040, turn: 0.2, pose: 'sitRead', expr: 'deadpan', armF: { prop: bookHeld('#43302a', { rot: 180, w: 70, h: 90 }) } }] } },
  { x: 408, y: 18, w: 368, h: 604, mood: 'warm', art: { cam: { on: ['mum'], fr: 'waist' }, bg: () => O.kitchen(), actors: [{ def: mum, id: 'mum', x: 800, y: 1000, turn: 0.7, pose: 'hold', expr: 'sad' }] } },
], [cap('His father was reading a book of higher maths, to show how smart he was.', 40, 30, { w: 280, fixed: true }),
    cap('His mother was cooking his father\'s favourite dinner, to show how loving she was.', 428, 424, { w: 280, fixed: true })]);
ep.beat(360, [capC('As scary as arguments could be, *not* arguing was somehow much worse.', 400, 180, { w: 560 })]);

ep.panel(800, { cam: { on: ['mum', 'harry'], fr: 'waist', dy: -0.8, zoom: 1.1 }, bg: () => O.kitchen(),
  actors: [{ def: mum, id: 'mum', x: 820, y: 1000, turn: -0.5, pose: 'hold', expr: 'shock' }, { def: harry, id: 'harry', x: 420, y: 1000, s: 1.12, turn: 0.5, pose: 'holdOne', expr: 'determined', armF: { prop: g({ transform: 'translate(0,30) scale(0.35) rotate(90)' }, envelope({ back: true, sealText: 'H' })) } }] },
  [say('Harry', 'Mum, I\'m going to test the hypothesis. According to your theory, how do I send an owl to Hogwarts?', 272, 90, { w: 380 }),
   say('Mum', 'I… I don\'t know. I suppose you just need a magic owl?', 560, 560, { w: 300 })], { mood: 'warm' });

ep.panel(900, { cam: { on: ['harry', 'dad'], fr: 'waist', dy: -2.3 }, bg: LR(),
  actors: [K.armchair(620, 1070, 1.35, C.forest), { def: dad, id: 'dad', x: 620, y: 1040, turn: 0.4, pose: 'sitRead', expr: 'deadpan', armF: { prop: bookHeld('#43302a', { rot: 180, w: 70, h: 90 }) } },
    { def: harry, id: 'harry', x: 940, y: 1010, s: 1.12, turn: -0.5, pose: 'gesture', expr: 'hopeful' }] },
  [say('Harry', 'Well, the letter got here *somehow.* I\'ll wave it around outside and ask for an owl.', 500, 90, { w: 380 }),
   say('Harry', 'Dad, do you want to come and watch?', 560, 300, { w: 300 })], { mood: 'warm' });
ep.panel(520, { cam: { on: ['dad'], fr: 'close' }, bg: LR(), blur: 2, actors: [{ def: dad, id: 'dad', x: 620, y: 1040, turn: 0.1, pose: 'sitRead', expr: { base: 'deadpan', eyes: { lookY: 0.8, open: 0.5 } } }] },
  [cap('His father shook his head, minutely, and kept on reading.', 44, 30, { w: 380 })], { mood: 'warm' });
ep.panel(480, { cam: { on: ['harry'], fr: 'close' }, bg: LR(), blur: 3, actors: [{ def: harry, id: 'harry', x: 940, y: 1010, s: 1.12, turn: -0.2, expr: 'unimpressed' }] },
  [inner('Harry', '*Of course.*', 600, 380, { w: 200 })], { mood: 'warm' });

// =============================================================== THE GARDEN
const GD = (o = {}) => (env) => O.garden(o);
ep.panel(760, { cam: { x: 840, y: 700, w: 1250 }, bg: GD(), actors: [{ def: harry, id: 'harry', x: 780, y: 1030, s: 1.1, turn: 0.3, pose: 'holdOne', expr: 'worried', armF: { prop: g({ transform: 'translate(0,30) scale(0.35) rotate(90)' }, envelope({ back: true })) } }] },
  [cap('Standing in your own back garden, about to shout for an owl, it occurs to you that this is… actually pretty embarrassing.', 44, 34, { w: 460 })], { mood: 'dusk', alt: 'The back garden at dusk after rain. Harry stands alone on the wet lawn holding the envelope.' });

ep.panel(700, { cam: { on: ['harry'], fr: 'bust' }, bg: GD(), blur: 2, actors: [{ def: harry, id: 'harry', x: 780, y: 1030, s: 1.1, turn: 0.2, pose: 'fists', expr: 'determined' }] },
  [inner('Harry', '*No.* I\'m better than Dad.', 250, 80, { w: 320 }),
   inner('Harry', 'I will use the scientific method *even if it makes me feel stupid.*', 520, 570, { w: 380 })], { mood: 'dusk' });

ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: GD(), blur: 2, actors: [{ def: harry, id: 'harry', x: 780, y: 1030, s: 1.1, turn: 0.1, expr: 'embarrassed' }] },
  [whisper('Harry', 'Letter…', 560, 110, { w: 160, size: 22 })], { mood: 'dusk' });

ep.bleed(1150, { cam: { x: 860, y: 630, w: 1150 }, bg: GD({ star: true }), actors: [{ def: harry, id: 'harry', x: 800, y: 1190, s: 2.3, turn: 0.15, pose: 'holdUp', expr: 'yell', armB: { sh: 150, el: -25, hand: 'hold', prop: g({ transform: 'translate(0,24) scale(0.42) rotate(180)' }, envelope({ back: true })) } }],
  under: (e) => '' },
  [shout('Harry', 'LETTER FOR HOGWARTS! CAN I GET AN OWL?', 400, 170, { w: 520, size: 46 })], { mood: 'dusk', alt: 'Low angle: Harry thrusts the envelope at the enormous evening sky and yells.' });

ep.beat(300, [say('?', 'Harry?', 620, 150, { w: 150, tail: [790, 120] })]);

ep.panel(700, { cam: { on: ['harry'], fr: 'waist', dy: -0.4 }, bg: GD(), blur: 2, actors: [{ def: harry, id: 'harry', x: 780, y: 1030, s: 1.1, turn: -0.5, pose: 'cower', expr: 'flustered' }],
  over: (e) => FX.emanata(e.anchors?.harry?.head?.[0] ?? 400, (e.anchors?.harry?.head?.[1] ?? 250), 150, { n: 7 }) },
  [cap('Harry whipped his arm down and hid the envelope behind his back like it was drug money.', 44, 34, { w: 560 })], { mood: 'dusk' });

// Mrs Figg over the fence
const FENCE = (env) => g({}, ...Array.from({ length: 22 }, (_, i) => path(`M${1100 + i * 44},900 L${1100 + i * 44},720 L${1120 + i * 44},702 L${1140 + i * 44},720 L${1140 + i * 44},900Z`, { fill: '#8a6e50', stroke: '#3e2a1f', 'stroke-width': 2 })), rect(1100, 760, 1100, 18, { fill: '#6e5438', stroke: '#3e2a1f', 'stroke-width': 1.6 }));
const CAT = (env) => g({ transform: 'translate(1330,712) scale(0.9)' }, cat({ col: '#8f8f8f' }));
ep.panel(820, { cam: { on: ['figg', 'harry'], fr: 'waist', zoom: 1.15, dy: -0.9 }, bg: GD(),
  actors: [{ def: figg, id: 'figg', x: 1500, y: 885, turn: -0.5, expr: 'suspicious', pose: 'stand' },
    FENCE, CAT,
    { def: harry, id: 'harry', x: 900, y: 1040, s: 1.1, turn: 0.5, pose: 'cower', expr: 'embarrassed' }] },
  [say('Mrs Figg', 'What are you doing, Harry?', 560, 90, { w: 280, tail: 'figg' }),
   say('Harry', 'Nothing! Just testing a really silly theory!', 420, 650, { w: 300, tail: 'harry' })], { mood: 'dusk', alt: 'An old woman in a hairnet peers over the fence, a grey cat perched beside her.' });

ep.panel(700, { cam: { on: ['figg'], fr: 'close' }, bg: GD(), blur: 2, actors: [{ def: figg, id: 'figg', x: 1500, y: 1180, turn: -0.4, expr: 'smile' }] },
  [say('Mrs Figg', 'Did you get your acceptance letter from Hogwarts?', 260, 90, { w: 320, tail: 'figg' })], { mood: 'dusk' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: GD(), blur: 3, actors: [{ def: harry, id: 'harry', x: 900, y: 1040, s: 1.1, turn: 0.3, expr: 'what' }] },
  [], { mood: 'dusk', alt: 'Harry, frozen.' });

ep.panel(900, { cam: { on: ['figg', 'harry'], fr: 'bust', dy: -0.6 }, bg: GD(),
  actors: [{ def: figg, id: 'figg', x: 1440, y: 885, turn: -0.5, expr: 'worried', pose: 'stand' }, FENCE, CAT, { def: harry, id: 'harry', x: 930, y: 1040, s: 1.1, turn: 0.5, pose: 'stand', expr: 'blank' }] },
  [say('Harry', '…Yes. I got a letter from Hogwarts. They want my owl by the 31st of July, but—', 230, 90, { w: 330, tail: 'harry' }),
   say('Mrs Figg', 'But you don\'t *have* an owl! Poor dear. I can\'t imagine *what* someone was thinking, sending you just the standard letter.', 530, 668, { w: 305, tail: 'figg', fixed: true })], { mood: 'dusk' });

ep.panel(700, { cam: { on: ['figg', 'harry'], fr: 'bust' }, bg: GD(),
  actors: [{ def: figg, id: 'figg', x: 1420, y: 885, turn: -0.5, expr: 'warm', pose: 'stand', armB: { sh: 50, el: 10, hand: 'open' }, lean: 8 }, FENCE,
    { def: harry, id: 'harry', x: 1130, y: 1040, s: 1.1, turn: 0.4, pose: 'holdUp', expr: 'blank', armB: { sh: 145, el: 0, hand: 'hold', prop: g({ transform: 'translate(0,34) scale(0.4) rotate(170)' }, envelope({})) } }] },
  [cap('Hardly thinking at all by now, Harry handed it over.', 44, 30, { w: 400 })], { mood: 'dusk', alt: 'A wrinkled hand reaches over the fence; Harry hands up the envelope.' });

ep.panel(760, { cam: { on: ['figg'], fr: 'bust', dx: -0.4 }, bg: GD(), actors: [{ def: figg, id: 'figg', x: 1500, y: 885, turn: -0.3, expr: 'warm', pose: 'wave' }, FENCE] },
  [say('Mrs Figg', 'Just leave it to me, dear. In a jiffy or two I\'ll have someone over.', 260, 90, { w: 330, tail: 'figg' })], { mood: 'dusk' });

ep.panel(560, { cam: { x: 1330, y: 640, w: 520 }, bg: GD(), actors: [(env) => g({ transform: 'translate(1330,712) scale(0.9)' }, cat({ col: '#8f8f8f' })), (env) => g({}, ...Array.from({ length: 22 }, (_, i) => path(`M${1100 + i * 44},900 L${1100 + i * 44},720 L${1120 + i * 44},702 L${1140 + i * 44},720 L${1140 + i * 44},900Z`, { fill: '#8a6e50', stroke: '#3e2a1f', 'stroke-width': 2 })))] },
  [cap('And her face disappeared from over the fence.', 44, 30, { w: 380 }), cap('The cat stayed.', 520, 440, { w: 200 })], { mood: 'dusk', alt: 'The old woman has gone. Her grey cat stays on the fence, looking straight at Harry.' });

ep.bleed(1200, { cam: { x: 1000, y: 380, w: 1500 }, bg: GD({ star: true }), actors: [{ def: harry, id: 'harry', x: 780, y: 1030, s: 1.1, turn: 0.1, pose: 'stand', expr: 'blank' }] },
  [capC('There was a long silence in the garden.', 400, 150, { w: 480 })], { mood: 'dusk', alt: 'A wide, quiet shot: Harry alone on the lawn under a huge evening sky with a single first star.' });

ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: GD(), blur: 3, actors: [{ def: harry, id: 'harry', x: 780, y: 1030, s: 1.1, turn: 0, expr: 'what' }] },
  [say('Harry', 'What.', 560, 140, { w: 140, size: 34 })], { mood: 'dusk' });

ep.end();

export default ep;
