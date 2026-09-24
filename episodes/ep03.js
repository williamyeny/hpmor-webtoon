// EPISODE 3 — The Boy Who Lived  (source: HPMOR ch. 3)
import { Episode, say, shout, whisper, think, inner, cold, cap, capC, dark, note, title, plain, M } from '../engine/core/dsl.js';
import { shot } from '../engine/core/scene.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as O from '../engine/bg/oxford.js';
import * as L from '../engine/bg/london.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harry, dad, mum, mcgonagall, tom, doris, quirrell, james, lilyAdult, darkLord, makeExtra } from '../engine/chars/cast.js';
import { envelope, seal, bookHeld, wand, pencil, tankard } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep03', number: 3, title: 'The Boy Who Lived' });
ep.setBg(C.paper);
const WAND = g({ transform: 'translate(0,26) rotate(180)' }, wand(120, '#4a2e1b'));
const WAND_OUT = g({ transform: 'translate(0,-20)' }, wand(120, '#4a2e1b')); // points out past the fingers when the arm is raised

// =============================================================== August
ep.beat(260, [plain('CHAPTER THREE', 400, 90, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('The Boy Who Lived', 400, 170, { size: 50 })]);
const calendar = (ctx) => {
  const B = ctx.h - 170; // calendar bottom; the caption sits in the band below it
  let out = rect(0, 0, ctx.w, ctx.h, { fill: '#3e4d66' }) + rect(ctx.w * 0.18, 30, ctx.w * 0.64, B - 30, { fill: '#f4ecd8', stroke: C.ink, 'stroke-width': 3 });
  out += text(ctx.w / 2, 100, 'AUGUST 1991', { 'font-family': 'IM Fell English SC', 'font-size': 40, 'text-anchor': 'middle', fill: C.ink });
  const x0 = ctx.w * 0.2, cw = ctx.w * 0.6 / 7, y0 = 130, ch = (B - 160) / 5;
  for (let d = 0; d < 31; d++) {
    const c = (d + 3) % 7, r = Math.floor((d + 3) / 7);
    const x = x0 + c * cw, y = y0 + r * ch;
    out += rect(x, y, cw, ch, { fill: 'none', stroke: '#b9ad92', 'stroke-width': 1 }) + text(x + 8, y + 26, String(d + 1), { 'font-family': 'Alegreya', 'font-size': 20, fill: '#5a4032' });
    if (d < 28) out += path(`M${x + 10},${y + 10} L${x + cw - 10},${y + ch - 10} M${x + cw - 10},${y + 10} L${x + 10},${y + ch - 10}`, { stroke: '#c43a32', 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0.85 });
    if (d === 28) out += circle(x + cw / 2, y + ch / 2 + 6, cw * 0.42, { fill: 'none', stroke: '#1d5a3a', 'stroke-width': 4 }) + text(x + cw / 2, y + ch - 8, 'D.A.!', { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': 22, fill: '#1d5a3a', 'text-anchor': 'middle' });
  }
  return out;
};
ep.panel(820, calendar, [capC('Thirty days is a very long time to wait, when you\'ve just found out that magic is real.', 400, 718, { w: 640, fixed: true })], { alt: 'A wall calendar for August 1991, every day crossed off in red up to the 29th, which is circled: "D.A.!"' });
ep.multi(780, [
  { x: M, y: 18, w: 752, h: 360, mood: 'candle', art: { cam: { on: ['harry'], fr: 'waist', dx: -0.6, dy: 0.3 }, bg: () => O.bedroom(), actors: [{ def: harry, id: 'harry', x: 560, y: 960, s: 1.1, turn: 0.3, pose: 'sitRead', expr: 'focus', armF: { prop: bookHeld('#2f5a40', { rot: 180 }) } }] } },
  { x: M, y: 396, w: 752, h: 366, mood: 'warm', art: { cam: { on: ['harry'], fr: 'waist', dx: 1.2 }, bg: () => O.bedroom({ night: false }), actors: [{ def: harry, id: 'harry', x: 560, y: 960, s: 1.1, turn: 0.2, pose: 'wand', expr: 'determined', armB: { sh: 92, el: -8, hand: 'hold', prop: g({ transform: 'translate(0,20) rotate(180)' }, pencil(90)) } }] } },
], [note('3 a.m.', 110, 70, { size: 40, color: '#f6e3b0' }), note('practising', 140, 448, { size: 40, color: '#f6e3b0' }), say('Harry', 'Wingardium… Leviosa.', 575, 468, { w: 360, fixed: true, tail: 'harry@1' })]);

// =============================================================== Charing Cross Road
const CX = () => L.charingCross();
const passers = [makeExtra(31, { muggle: true }), makeExtra(32, { muggle: true }), makeExtra(33, { muggle: true })];
ep.panel(780, { cam: { x: 1100, y: 640, w: 1180 }, bg: CX,
  actors: [{ def: passers[0], x: 480, y: 1060, turn: 0.7, pose: 'walk' }, { def: passers[1], x: 1600, y: 1080, turn: -0.7, pose: 'walk2' },
    { def: mcgonagall, id: 'mcgonagall', x: 1000, y: 1060, turn: 0.3, pose: 'stand', expr: 'calm' }, { def: harry, id: 'harry', x: 1180, y: 1070, s: 1.1, turn: -0.2, pose: 'stand', expr: 'suspicious' },
    { def: passers[2], x: 1850, y: 1070, turn: -0.6, pose: 'walk' }] },
  [cap('London. The twenty-ninth of August.', 44, 34, { w: 560 }),
   say('Harry', 'Nobody\'s even *looking* at it.', 620, 272, { w: 280 }),
   say('McGonagall', 'They can\'t see it.', 190, 560, { w: 220 })], { mood: 'day', alt: 'A busy London street of bookshops. Between them, a grubby little pub called the Leaky Cauldron that no passer-by so much as glances at.' });

// =============================================================== the Leaky Cauldron
const LI = () => L.leakyInterior({ counter: false });
const COUNTER = () => L.leakyCounter();
const patrons = [makeExtra(41, { witchHat: true }), makeExtra(42, { old: true }), makeExtra(43, { witchHat: true, female: true }), makeExtra(44, {}), makeExtra(45, { old: true, witchHat: true })];
const TOM = (o = {}) => ({ def: tom, id: 'tom', x: 1720, y: 1000, turn: -0.4, pose: 'stand', expr: 'neutral', ...o });
const HAR = (o = {}) => ({ def: harry, id: 'harry', x: 1420, y: 1080, s: 1.1, turn: 0.4, ...o });
const MCG = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 1160, y: 1080, turn: 0.4, ...o });
const QUI = (o = {}) => ({ def: quirrell, id: 'quirrell', x: 560, y: 990, turn: 0.4, pose: 'cower', expr: 'twitch', ...o });
const MUG = { sh: 30, el: 75, hand: 'hold', prop: g({ transform: 'translate(0,22)' }, tankard(1.1)) };
const crowd = (o = {}) => [
  { def: patrons[0], id: 'p0', x: o.xs?.[0] ?? 640, y: 1010, turn: 0.4, pose: o.stand ? 'reach' : 'holdOne', armF: o.stand ? undefined : MUG, expr: o.e || 'neutral' },
  { def: patrons[1], id: 'p1', x: o.xs?.[1] ?? 880, y: 1000, turn: -0.4, pose: 'holdOne', armF: MUG, expr: o.e || 'smile' },
  { def: patrons[2], id: 'p2', x: o.xs?.[2] ?? 990, y: 1020, turn: 0.5, pose: o.stand ? 'reach' : 'crossArms', expr: o.e || 'neutral' },
  { def: patrons[3], id: 'p3', x: o.xs?.[3] ?? 460, y: 1030, turn: 0.6, pose: o.stand ? 'reach' : 'holdOne', armF: o.stand ? undefined : MUG, expr: o.e || 'neutral' },
];
ep.panel(720, { cam: { x: 1070, y: 600, w: 1360 }, bg: LI,
  actors: [QUI({ x: 470, expr: 'neutral', pose: 'stand', s: 0.95 }), ...crowd({ xs: [730, 860, 990, 600] }), { def: doris, id: 'doris', x: 1110, y: 1000, turn: 0.4, pose: 'hold', expr: 'neutral' }, TOM({ expr: 'shock' }), COUNTER(), MCG({ x: 1260, y: 1100, turn: 0.5 }), HAR({ x: 1420, y: 1110, expr: 'awe' })] },
  [cap('It was dark, and shabby, and full of people in pointed hats.', 44, 34, { w: 380 })], { mood: 'candle', alt: 'Inside the Leaky Cauldron: dim, wood-beamed, smoky. Witches and wizards at small tables, an old barman behind the bar, and in the far corner by the fire, a pale young man.' });
ep.panel(600, { cam: { on: ['tom'], fr: 'bust', dx: -0.45, dy: -0.25 }, bg: LI, fg: COUNTER, actors: [TOM({ expr: 'shock', pose: 'hold' })] },
  [say('Tom', 'Good Lord. Is this—can this be—?', 250, 120, { w: 300, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: { on: ['harry'], fr: 'waist', dx: -0.75 }, bg: LI, blur: 2, mid: COUNTER, actors: [HAR({ x: 1420, y: 1080, expr: { base: 'smug', eyes: { open: 0.8 } }, pose: 'present' })] },
  [cap('A question like *that* deserved his very best.', 44, 30, { w: 360 }),
   say('Harry', 'Am I—could I be—maybe—you never know—if I\'m *not*—but then the question is—', 250, 370, { w: 340 }),
   say('Harry', '—*who?*', 300, 620, { w: 140 })], { mood: 'candle' });
ep.panel(620, { cam: { on: ['tom'], fr: 'close' }, bg: LI, blur: 2, actors: [TOM({ expr: 'awe' })], fg: COUNTER },
  [whisper('Tom', 'Bless my soul. Harry Potter… what an honour.', 260, 110, { w: 320, size: 28 })], { mood: 'candle' });
ep.panel(820, { cam: { x: 1290, y: 545, w: 760 }, bg: LI, blur: 1, actors: [MCG({ expr: 'stern', pose: 'handsHips' }), HAR({ expr: 'smug', pose: 'gesture' })] },
  [say('Harry', 'Well, yes, you\'re quite perceptive, most people don\'t realise it so quickly—', 552, 130, { w: 330, fixed: true }),
   say('McGonagall', 'That\'s enough. Don\'t pester the boy, Tom. He\'s new to all this.', 262, 335, { w: 320, fixed: true })], { mood: 'candle' });

// Doris
ep.panel(760, { cam: { on: ['doris', 'harry'], fr: 'waist' }, bg: LI, actors: [{ def: doris, id: 'doris', x: 1220, y: 1060, turn: 0.4, pose: 'reach', expr: 'teary' }, HAR({ x: 1440, turn: -0.4, expr: 'worried', pose: 'stand' })] },
  [say('Doris', 'But it *is* him? It\'s Harry Potter?', 220, 85, { w: 300, fixed: true }),
   say('Doris', 'I only want to shake his hand.', 575, 165, { w: 300, fixed: true, tail: 'doris' })], { mood: 'candle' });
ep.panel(660, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#3a2618' }) + K.glow(w * 0.5, h * 0.4, 500, C.candle, 0.35);
  // two hands clasped: an old wrinkled one, a small one; a tear falling onto them
  out += g({ transform: `translate(${w * 0.5},${h * 0.55})` },
    path('M-420,40 L-120,10 L-110,90 L-420,120Z', { fill: '#6b4a6e', stroke: C.ink, 'stroke-width': 4 }),
    path('M420,-20 L130,-10 L120,70 L420,80Z', { fill: '#c9922e', stroke: C.ink, 'stroke-width': 4 }),
    path('M-130,0 Q-40,-40 40,-10 Q90,10 80,60 Q20,110 -60,100 Q-130,90 -130,0Z', { fill: '#efcfb8', stroke: C.ink, 'stroke-width': 4 }),
    path('M-80,20 q30,-10 60,0 M-80,50 q30,-8 60,2', { fill: 'none', stroke: '#b98a70', 'stroke-width': 2.5 }),
    path('M140,-10 Q70,-40 10,-6 Q-20,20 0,60 Q50,90 110,70 Q150,50 140,-10Z', { fill: '#f3d2b5', stroke: C.ink, 'stroke-width': 4 }),
    path('M-10,-150 Q10,-120 -10,-100 Q-30,-120 -10,-150Z', { fill: '#cfe8f7', stroke: '#6b9ab5', 'stroke-width': 2 }),
    circle(20, 40, 16, { fill: '#cfe8f7', opacity: 0.8 }));
  return out;
}, [say('Doris', 'My grandson was an Auror. Died in seventy-nine.', 300, 90, { w: 380, tail: [40, 300] }),
    say('Doris', 'Thank you, Harry Potter. Thank heavens for you.', 330, 560, { w: 380, tail: [40, 440] })], { mood: 'candle', alt: 'Close on two hands: an old woman\'s, wrinkled, clasping Harry\'s small one. A tear falls onto them.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close', dx: -0.75 }, bg: LI, blur: 2, actors: [HAR({ x: 1440, turn: -0.2, expr: 'pleading' })] },
  [say('Harry', 'You\'re… welcome?', 235, 110, { w: 300, fixed: true, tail: 'harry' }),
   cap('He turned his head and shot Professor McGonagall a frightened, pleading look.', 44, 410, { w: 290 })], { mood: 'candle' });
ep.panel(700, { cam: { x: 1010, y: 610, w: 1300 }, bg: LI, mid: COUNTER,
  actors: [...crowd({ stand: true, e: 'hopeful' }), { def: doris, id: 'doris', x: 1220, y: 1060, turn: 0.4, pose: 'stand', expr: 'teary' }, { def: patrons[4], id: 'p4', x: 780, y: 1050, turn: 0.5, pose: 'reach', expr: 'delight' }, HAR({ x: 1440, turn: -0.3, expr: 'shock', pose: 'cower' }), MCG({ x: 1560, turn: -0.3, expr: 'stern' })] },
  [cap('Chairs scraped. The whole room was rising.', 44, 34, { w: 560 })], { mood: 'candle' });
ep.bleed(900, { cam: { on: ['mcgonagall'], fr: 'full', zoom: 0.85, dy: 0.1 }, bg: LI, blur: 2, actors: [MCG({ x: 1560, turn: -0.2, expr: 'menace', pose: 'stand', armF: { sh: -18, el: 14, hand: 'fist' }, armB: { sh: 18, el: -14, hand: 'fist' }, legF: { hip: -10, knee: 30 } })],
  under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.95, { bg: '#2a1a10', col: '#f3c66f', op: 0.5, n: 70 }),
  over: (e) => FX.sfxText(e.w * 0.5, e.h * 0.93, 'CRACK', { size: 120, fill: '#f6e3b0' }) },
  [cap('Professor McGonagall slammed her foot down. It gave Harry a new referent for the phrase "Crack of Doom".', 44, 34, { w: 600, fixed: true })], { mood: 'candle', fadeBottom: false, alt: 'McGonagall stamps her foot; the sound is enormous; everyone freezes.' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'close', dx: -0.55 }, bg: LI, blur: 2, actors: [MCG({ x: 1560, turn: -0.3, expr: 'calm' })] },
  [say('McGonagall', 'We\'re in a hurry.', 215, 150, { w: 300, fixed: true }), cap('…in a voice that sounded perfectly, utterly normal.', 44, 440, { w: 320 })], { mood: 'candle' });

// Quirrell — the wrong note
ep.panel(760, { cam: { on: ['quirrell'], fr: 'bust' }, bg: LI, blur: 1, actors: [QUI({ expr: { base: 'twitch', eyes: { lookX: 0.8 } }, pose: 'stand', turn: 0.3 })],
  over: (e) => FX.doom(e.w, e.h, 3) },
  [cap('In the corner, a pale young man with a twitching eye was watching him.', 44, 34, { w: 380 })], { mood: 'candle', panel: { filter: undefined }, alt: 'In the corner by the fire, a pale, thin, balding young man with a twitching eye watches Harry. The panel seems subtly wrong, its colours split.' });
ep.panel(460, { cam: { on: ['harry'], fr: 'eyes' }, bg: LI, blur: 3, actors: [HAR({ x: 1440, turn: -0.5, expr: { base: 'worried', eyes: { lookX: -1 } } })], over: (e) => FX.doom(e.w, e.h, 5) },
  [note('mmmmmmmmmm', 400, 62, { size: 64, color: '#f2c9dc', w: 600 })], { mood: 'candle', alt: 'Harry\'s eyes meet the stranger\'s. A low, wrong hum.' });

// =============================================================== the courtyard
const CY = () => L.courtyard();
const HC = (o = {}) => ({ def: harry, id: 'harry', x: 700, y: 1040, s: 1.1, turn: 0.4, ...o });
const MC = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 920, y: 1060, turn: -0.4, ...o });
ep.panel(720, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist', dy: -0.4 }, bg: CY, actors: [HC({ expr: 'think', pose: 'chin' }), MC({ expr: 'calm' })] },
  [say('Harry', 'Professor? Who was that pale man, by the corner? The one with the twitching eye?', 262, 130, { w: 360, fixed: true })], { mood: 'day' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.4 }, bg: CY, blur: 1, actors: [MC({ expr: 'calm', turn: -0.2 })] },
  [say('McGonagall', 'Hm? That was Professor Quirinus Quirrell. He\'ll be teaching Defence Against the Dark Arts at Hogwarts this year.', 400, 150, { w: 520, fixed: true })], { mood: 'day' });
ep.panel(680, { cam: { on: ['harry'], fr: 'bust', dx: 0.7 }, bg: CY, blur: 2, actors: [HC({ expr: 'pained', pose: 'facepalm', turn: 0.3 })] },
  [say('Harry', 'I had the strangest feeling that I knew him.', 580, 110, { w: 300, fixed: true }),
   say('Harry', 'And that I shouldn\'t shake his hand.', 590, 420, { w: 280, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: CY, blur: 1, actors: [MC({ expr: 'worried', turn: -0.3 })] },
  [say('McGonagall', 'Mr Potter… how much have you been told… about how your parents died?', 260, 100, { w: 340 })], { mood: 'day' });
ep.panel(800, { cam: { on: ['harry'], fr: 'bust', dx: 0.45, dy: -0.55 }, bg: CY, blur: 2, actors: [HC({ expr: 'determined', pose: 'stand' })] },
  [say('Harry', 'My parents are alive and well. They always refused to talk about how my *genetic* parents died.', 410, 125, { w: 440, fixed: true }),
   say('Harry', 'From which I infer that it wasn\'t good.', 612, 560, { w: 240, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'close', dx: -0.7 }, bg: CY, blur: 2, actors: [MC({ expr: 'pained' })] },
  [say('McGonagall', 'An admirable loyalty. Though it hurts a little, to hear you say it like that.', 225, 150, { w: 270, fixed: true }),
   say('McGonagall', 'Lily and James were friends of mine.', 215, 500, { w: 250, fixed: true, tail: 'mcgonagall' })], { mood: 'day' });
ep.panel(800, { cam: { on: ['harry'], fr: 'bust', dx: 0.8 }, bg: CY, blur: 2, actors: [HC({ expr: 'sad', pose: 'slump', turn: 0.2 })] },
  [whisper('Harry', 'I\'m sorry. But I *have* a Mum and Dad.', 580, 110, { w: 270, fixed: true }),
   whisper('Harry', 'And I\'d just make myself unhappy, comparing that reality to… something perfect I built up in my imagination.', 565, 480, { w: 290, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(800, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust', dy: 0.45 }, bg: CY, actors: [HC({ expr: 'sad', pose: 'slump' }), MC({ expr: 'warm' })] },
  [say('McGonagall', 'That is amazingly wise of you.', 225, 95, { w: 300, fixed: true, tail: 'mcgonagall' }),
   say('McGonagall', 'But your parents died very well indeed, Mr Potter. Protecting you.', 250, 285, { w: 290, fixed: true, tail: 'mcgonagall' })], { mood: 'day' });
ep.panel(520, { cam: { on: ['harry'], fr: 'eyes' }, bg: CY, blur: 3, actors: [HC({ expr: 'hurt', turn: 0.1 })] },
  [inner('Harry', '*Protecting me?*', 400, 70, { w: 300, fixed: true })], { mood: 'day' });
ep.panel(760, { cam: { on: ['mcgonagall', 'harry'], fr: 'waist' }, bg: CY,
  actors: [HC({ expr: { base: 'shock', eyes: { lookY: -0.8 } }, pose: 'stand' }), MC({ expr: 'calm', pose: 'wand', armB: { sh: 105, el: -35, hand: 'hold', prop: WAND_OUT } })],
  over: (e) => { const h = e.anchors?.harry?.head; return h ? FX.sparkles([[h[0], h[1] - 50, 18], [h[0] + 30, h[1] - 70, 10], [h[0] - 34, h[1] - 64, 8]], { col: '#fff3b0' }) : ''; } },
  [say('McGonagall', 'Something of a disguise. So that doesn\'t happen again. Not until you\'re ready.', 560, 90, { w: 320 })], { mood: 'day' });

// the archway
const alleyView = g({ transform: 'translate(560,310) scale(0.3)' }, L.diagonAlley({ seed: 7 }));
ep.panel(640, { cam: { x: 930, y: 560, w: 700 }, bg: CY, actors: [MC({ x: 850, turn: 0.6, expr: 'calm', pose: 'wand', armB: { sh: 146, el: 6, hand: 'hold', prop: WAND_OUT } })] },
  [note('tap', 590, 110, { size: 44, rot: -10, color: '#f6e3b0' }), note('tap', 650, 170, { size: 44, rot: 6, color: '#f6e3b0' }), note('tap', 610, 235, { size: 44, rot: -4, color: '#f6e3b0' })], { mood: 'day', alt: 'McGonagall taps a brick three times with her wand.' });
ep.multi(620, [
  { x: M, y: 18, w: 368, h: 584, mood: 'day', art: { cam: { x: 1030, y: 540, w: 700 }, bg: CY, mid: () => L.archway(1) } },
  { x: 408, y: 18, w: 368, h: 584, mood: 'day', art: { cam: { x: 1030, y: 540, w: 700 }, bg: CY, mid: () => L.archway(2, alleyView) } },
], [cap('The brick hollowed—', 44, 34, { w: 300 }), cap('—dilated, and shivered—', 450, 470, { w: 210 })]);
const archFrame = (e) => { const w = e.w, h = e.h, t = h * 0.1; return `<defs><clipPath id="afc"><path d="M0,0 L${w},0 L${w},${h} L${w * 0.93},${h} L${w * 0.93},${h * 0.32} Q${w * 0.93},${t} ${w / 2},${t} Q${w * 0.07},${t} ${w * 0.07},${h * 0.32} L${w * 0.07},${h} L0,${h}Z"/></clipPath></defs>` + g({ 'clip-path': 'url(#afc)' }, K.brickWall(0, 0, w, h, '#6a3a2c', 91), rect(0, 0, w, h, { fill: '#1a0e08', opacity: 0.45 })) + path(`M${w * 0.07},${h} L${w * 0.07},${h * 0.32} Q${w * 0.07},${t} ${w / 2},${t} Q${w * 0.93},${t} ${w * 0.93},${h * 0.32} L${w * 0.93},${h}`, { fill: 'none', stroke: '#2a1a10', 'stroke-width': 8 }); };
ep.bleed(1300, { cam: { x: 1250, y: 330, w: 1150 }, bg: () => L.diagonAlley({ seed: 7 }), over: archFrame,
  actors: [...[51, 52, 53, 54, 55, 56, 57].map((sd, i) => ({ def: makeExtra(sd, { witchHat: i % 2 === 0 }), x: 600 + i * 230, y: 1020 + (i % 3) * 40, turn: i % 2 ? -0.6 : 0.6, pose: i % 2 ? 'walk' : 'walk2', s: 0.95 })),
    ] },
  [capC('…into a huge archway.', 400, 60, { w: 360 }),
   capC('And they walked forwards, together, into the wizarding world.', 400, 1215, { w: 500 })], { mood: 'warm', fadeTop: true, alt: 'Diagon Alley: a winding street of crooked, tall, brightly-painted shops, bunting overhead, crowds in robes and pointed hats. Harry and McGonagall stand at the entrance.' });
ep.panel(520, { cam: { on: ['harry'], fr: 'close' }, bg: () => L.diagonAlley({ seed: 7 }), blur: 3, actors: [{ def: harry, id: 'harry', x: 1300, y: 1180, s: 1.3, turn: 0, expr: 'deadpan' }] },
  [cap('Harry didn\'t blink. It wasn\'t like anyone was turning into a cat.', 44, 30, { w: 380 })], { mood: 'day' });

// =============================================================== the Alley
const DA = (o = {}) => () => L.diagonAlley({ seed: 7, ...o });
const merch = makeExtra(61, { witchHat: true, female: false });
ep.panel(720, { cam: { x: 890, y: 660, w: 900 }, bg: DA(), mid: () => L.stall(700, 'BOUNCE BOOTS!', C.burgundy, 'boots') + L.stall(1140, 'Knives +3!  Forks +2!', C.forest, 'cutlery'),
  actors: [{ def: merch, id: 'merch', x: 520, y: 1060, turn: 0.4, pose: 'present', expr: 'bigGrin' }] },
  [shout('merch', '"Made with real Flubber!"', 250, 120, { w: 280, size: 28 }),
   say('?', 'Spoons with a +4 bonus!', 600, 170, { w: 240, tail: [1000 * 0 + 700, 400] })], { mood: 'day' });
ep.panel(880, (ctx) => {
  const s = shot({ cam: { on: ['harry'], fr: 'bust', dy: -0.05 }, bg: DA(), blur: 3, actors: [{ def: harry, id: 'harry', x: 1300, y: 1150, s: 1.2, turn: 0, expr: 'delight' }] })(ctx);
  const a = ctx.anchors?.harry; const hx = a ? a.head[0] : ctx.w / 2, hy = a ? a.head[1] - a.hr * 0.2 : ctx.h * 0.45, R = a ? a.hr * 1.18 : 170;
  let arcs = ''; for (let i = 0; i < 4; i++) arcs += path(`M${hx - R - i * 20},${hy} A${R + i * 20},${R * 0.95 + i * 18} 0 0 1 ${hx + R + i * 20},${hy}`, { fill: 'none', stroke: '#fff3d0', 'stroke-width': 5, opacity: 0.95 - i * 0.18, 'stroke-linecap': 'round', 'stroke-dasharray': '40 16' });
  return s + arcs;
}, [cap('Harry\'s head kept rotating, like it was trying to wind itself off his neck.', 44, 30, { w: 450 }),
    inner('Harry', 'It\'s like the magic items section of a *Dungeons & Dragons* rulebook! What if one of these is one of the three you need to complete the cycle of infinite *wish* spells?!', 400, 770, { w: 540 })], { mood: 'day' });
ep.panel(760, { cam: { x: 3000 * 0 + 520, y: 620, w: 700 }, bg: DA({ start: 0 }), actors: [{ def: harry, id: 'harry', x: 560, y: 1060, s: 1.1, turn: 0.4, pose: 'walk', expr: 'awe' }, { def: mcgonagall, id: 'mcgonagall', x: 820, y: 1080, turn: -0.3, pose: 'handsHips', expr: 'stern' }] },
  [cap('Harry had veered off, entirely without thinking, toward a shop with fiery letters in the window.', 44, 34, { w: 370 }),
   say('McGonagall', 'Mr Potter?', 610, 130, { w: 180 })], { mood: 'day' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust', dx: 0.6, dy: -0.3 }, bg: DA({ start: 0 }), blur: 2, actors: [{ def: harry, id: 'harry', x: 560, y: 1060, s: 1.1, turn: 0.5, pose: 'gesture', expr: 'embarrassed' }] },
  [say('Harry', 'I\'m sorry! When you walk past a bookshop you haven\'t visited before, you *have* to go in and look around.', 450, 130, { w: 440, fixed: true }),
   say('Harry', 'It\'s the family rule.', 615, 560, { w: 220, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 0 }), blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 820, y: 1080, turn: -0.2, expr: 'unimpressed' }] },
  [say('McGonagall', 'That is the most Ravenclaw thing I have ever heard.', 260, 110, { w: 320 })], { mood: 'day' });
ep.multi(360, [
  { x: M, y: 18, w: 368, h: 324, mood: 'day', art: { cam: { on: ['harry'], fr: 'close' }, bg: DA(), blur: 3, actors: [{ def: harry, id: 'harry', x: 560, y: 1060, s: 1.1, turn: 0.4, expr: 'confused' }] } },
  { x: 408, y: 18, w: 368, h: 324, mood: 'day', art: { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA(), blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 820, y: 1080, turn: -0.4, expr: 'calm' }] } },
], [say('Harry', 'What?', 120, 70, { w: 120 }), say('McGonagall', 'Nothing.', 675, 72, { w: 150 })]);

ep.panel(900, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist', dy: -0.75 }, bg: DA({ start: 3 }), actors: [{ def: harry, id: 'harry', x: 700, y: 1060, s: 1.1, turn: 0.4, pose: 'walk', expr: 'determined' }, { def: mcgonagall, id: 'mcgonagall', x: 940, y: 1080, turn: 0.4, pose: 'walk2', expr: 'calm' }] },
  [say('Harry', 'Don\'t get me wrong, this is a *great* distraction. Probably the best distraction anyone has ever tried on me.', 350, 150, { w: 440, fixed: true }),
   say('Harry', 'But don\'t think I\'ve forgotten about our pending discussion.', 250, 425, { w: 300, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust', dx: -0.6 }, bg: DA({ start: 3 }), blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 940, y: 1080, turn: -0.2, pose: 'stand', expr: 'sad' }] },
  [say('McGonagall', 'I suppose it would be rather pointless to hide it, when anyone on the street could tell you.', 262, 160, { w: 350, fixed: true }),
   say('McGonagall', 'Very well.', 205, 520, { w: 180, fixed: true, tail: 'mcgonagall' })], { mood: 'day' });

// =============================================================== the story (shadow theatre)
ep.setBg('#1b1210');
const SIL = { filter: 'url(#silhouette)' };
const stage = (a, b) => () => L.shadowStage(a, b);
const ember = (e) => { const R = rng(11); let out = ''; for (let i = 0; i < 30; i++) out += circle(R() * e.w, R() * e.h, R.range(1, 3), { fill: '#ffcf75', opacity: R.range(0.2, 0.7) }); return out; };
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: C.paper, bottom: '#1b1210' } });
ep.panel(900, { cam: { x: 800, y: 700, w: 620 }, bg: stage('#1d3a29', '#6a8f5a'),
  actors: [{ def: darkLord, id: 'dl', x: 800, y: 1080, turn: 0.1, pose: 'stand', ...SIL }],
  over: (e) => { const h = e.anchors?.dl?.head; return h ? ellipse(h[0] - 14, h[1] + 4, 9, 4, { fill: '#ff2a2a' }) + ellipse(h[0] + 16, h[1] + 4, 9, 4, { fill: '#ff2a2a' }) + K.glow(h[0], h[1] + 4, 60, '#ff2a2a', 0.5) : ''; } },
  [dark('And she told him of the Dark Lord.', 400, 80, { w: 480 })], { border: 'none', alt: 'Shadow-theatre: a tall hooded silhouette with two red slits for eyes against a sick green sky.' });
ep.panel(820, { cam: { on: ['harry'], fr: 'close', dy: 0.45 }, bg: DA({ start: 3 }), blur: 3, actors: [{ def: harry, id: 'harry', x: 700, y: 1060, s: 1.1, turn: 0.1, expr: 'cold' }], over: (e) => FX.frost(e.w, e.h, 0.7, 8) },
  [whisper('Harry', 'Voldemort?', 590, 110, { w: 200, fixed: true, tail: 'harry' }),
   cold('Harry', 'The name burned with a cold feeling. Ruthlessness. Diamond clarity. A hammer of titanium descending on an anvil of flesh.', 400, 690, { w: 560, fixed: true, noTail: true })],
  { mood: 'cold', alt: 'Harry whispers the name, and the panel freezes over.' });
ep.panel(300, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#e9f1f6' }), [inner('Harry', 'He resolved, then and there, to use safer terms. Like *You-Know-Who.*', 400, 150, { w: 520, fixed: true })], { border: 'none' });
// the war
ep.panel(820, { cam: { x: 800, y: 620, w: 1400 }, bg: stage('#5a1a1a', '#d97a3a'),
  actors: [{ def: darkLord, x: 800, y: 1080, s: 1.3, turn: 0, pose: 'armsUp', ...SIL }, ...[81, 82, 83, 84].map((sd, i) => ({ def: makeExtra(sd, { witchHat: true }), x: 280 + i * 110 + (i > 1 ? 700 : 0), y: 1080, s: 0.8, turn: i > 1 ? -0.6 : 0.6, pose: 'cower', ...SIL }))] },
  [dark('He raged upon wizarding Britain like a wilding wolf. Other countries wrung their hands, and hesitated—for whoever was first to oppose him would be his next target.', 400, 90, { w: 600 }),
   note('bystander effect!', 600, 700, { color: '#f6e3b0', size: 32, rot: -4 })], { border: 'none', alt: 'Shadow-theatre: the Dark Lord towers, arms raised, over cowering figures.' });
const masked = (x, s = 1) => ({ def: makeExtra(90 + x, { robe: '#111' }), id: 'm' + x, x, y: 1080, s, turn: 0.2, pose: 'stand', ...SIL });
ep.panel(700, { cam: { x: 800, y: 600, w: 1400 }, bg: stage('#2a1a2a', '#8a5a6a'), actors: [masked(300), masked(520, 1.1), masked(760, 1.2), masked(1000, 1.1), masked(1240)],
  over: (e) => { let o = ''; for (const id in e.anchors) { if (!id.startsWith('m')) continue; const [x, y0] = e.anchors[id].head; const k = e.anchors[id].hr / 50, y = y0 + 6 * k; o += g({ transform: `translate(${x},${y}) scale(${k})` }, path('M-30,-34 Q0,-54 30,-34 Q28,26 0,40 Q-28,26 -30,-34Z', { fill: '#d9d4c8', stroke: '#000', 'stroke-width': 2 }), ellipse(-11, -8, 7, 4, { fill: '#000' }), ellipse(11, -8, 7, 4, { fill: '#000' }), path('M-14,-30 Q0,-20 14,-30 M-6,12 L6,12', { stroke: '#8a857a', 'stroke-width': 2, fill: 'none' })); } return o; } },
  [dark('The Death Eaters followed in his wake. They wielded more than wands: wealth, and power, and secrets held in blackmail.', 400, 90, { w: 600 })], { border: 'none', alt: 'Five masked figures in a row, their pale masks the only light in them.' });
ep.panel(840, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#e8dcc0' }) + rect(0, h * 0.72, w, h, { fill: '#b9a47e' });
  out += rect(w * 0.1, h * 0.12, w * 0.8, h * 0.6, { fill: '#d9c9a4', stroke: C.ink, 'stroke-width': 4 });
  out += g({ transform: `translate(${w * 0.5},${h * 0.4}) rotate(-4)` }, rect(-140, -120, 280, 220, { fill: '#f4ecd8', stroke: C.ink, 'stroke-width': 3 }), text(0, -76, 'THE DAILY PROPHET', { 'font-family': 'UnifrakturMaguntia', 'font-size': 22, 'text-anchor': 'middle', fill: C.ink }), text(0, -20, 'ENOUGH!', { 'font-family': 'IM Fell English SC', 'font-size': 44, 'text-anchor': 'middle', fill: C.ink }), text(0, 20, 'by Yermy Wibble', { 'font-family': 'IM Fell English', 'font-size': 20, 'text-anchor': 'middle', fill: C.ink }), path('M-120,50 L120,50 M-120,66 L100,66 M-120,82 L110,82', { stroke: '#8a7d68', 'stroke-width': 3 }));
  out += circle(w * 0.5 - 130, h * 0.4 - 110, 7, { fill: '#555', stroke: C.ink, 'stroke-width': 2 }) + circle(w * 0.5 + 125, h * 0.4 - 125, 7, { fill: '#555', stroke: C.ink, 'stroke-width': 2 });
  out += rect(0, 0, w, h, { fill: '#2a0a0a', opacity: 0.25 });
  return out;
}, [dark('A journalist named Yermy Wibble called for everyone to stand together. It was absurd, he wrote, for the many to cower in fear of the few.', 400, 80, { w: 600 }),
    dark('The next morning, they found what was left of him—and of his wife, and his two daughters—nailed to the newsroom wall.', 400, 730, { w: 600 })],
  { border: 'none', mood: 'night', alt: 'An empty newsroom. A single newspaper — ENOUGH! by Yermy Wibble — is nailed to the wall.' });
ep.panel(460, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#120c0a' }), [dark('Whoever stood out the most became the next example.', 400, 150, { w: 500 }), dark('Until the names of James and Lily Potter rose to the top of that list.', 400, 300, { w: 560 })], { border: 'none' });
ep.panel(860, { cam: { x: 795, y: 700, w: 820 }, bg: stage('#3a2a14', '#e9b86a'),
  actors: [{ def: james, x: 690, y: 1080, turn: 0.4, pose: 'hug', ...SIL }, { def: lilyAdult, id: 'lily', x: 900, y: 1080, turn: -0.4, pose: 'hold', ...SIL }],
  over: (e) => { const a = e.anchors?.lily; let o = ember(e); if (a) { const [x, y] = a.handF; const k = a.hr / 40; o += g({ transform: `translate(${x - 10 * k},${y + 4 * k}) scale(${k})` }, ellipse(0, 0, 34, 24, { fill: '#f1e6cc', stroke: '#000', 'stroke-width': 2 }), circle(16, -10, 12, { fill: '#f3d2b5', stroke: '#000', 'stroke-width': 2 }), path('M8,-18 q6,-8 14,-2', { stroke: '#000', 'stroke-width': 2, fill: 'none' })) + K.glow(x, y, 120 * k, '#fff3c9', 0.5); } return o; } },
  [dark('They might have died with their wands in their hands and not regretted it, for they *were* heroes.', 400, 90, { w: 600 }),
   dark('But they had an infant son.', 400, 770, { w: 400 })], { border: 'none', alt: 'Silhouettes: a young man with untidy hair and glasses, and a young woman holding a baby.' });

// Harry breaks
ep.setBg(C.paper);
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: '#1b1210', bottom: C.paper } });
ep.panel(760, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 3 }), blur: 3, actors: [{ def: harry, id: 'harry', x: 700, y: 1060, s: 1.1, turn: 0.1, expr: 'teary' }] },
  [inner('Harry', '*I didn\'t know those people. Not really. They aren\'t my parents now. It would be pointless to feel so sad for them—*', 400, 110, { w: 560 })], { mood: 'day' });
ep.panel(900, { cam: { on: ['mcgonagall', 'harry'], fr: 'waist', padX: 1.05 }, bg: DA({ start: 3 }), blur: 2,
  actors: [{ def: mcgonagall, id: 'mcgonagall', x: 900, y: 1080, turn: -0.3, pose: 'stand', armF: { sh: 38, el: 62, hand: 'open' }, armB: { sh: 30, el: 70, hand: 'open' }, expr: 'teary' }, { def: harry, id: 'harry', x: 820, y: 1060, s: 1.1, turn: 0.6, pose: 'stand', armF: { sh: 40, el: 30, hand: 'open' }, armB: { sh: 35, el: 30, hand: 'open' }, expr: 'sob' }] },
  [cap('When Harry was done sobbing into the witch\'s robes, he looked up—and felt a little better to see tears in Professor McGonagall\'s eyes as well.', 44, 34, { w: 460 })], { mood: 'day', alt: 'Harry cries into McGonagall\'s robes. She holds him, and she is crying too.' });
ep.panel(700, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 3 }), blur: 2, actors: [{ def: harry, id: 'harry', x: 820, y: 1060, s: 1.1, turn: 0.4, expr: 'hurt' }] },
  [whisper('Harry', 'So what happened?', 555, 100, { w: 280, fixed: true })], { mood: 'day' });
// Godric's Hollow
ep.setBg('#0c0f1a');
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: C.paper, bottom: '#0c0f1a' } });
const hollow = (flash = false) => (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: flash ? '#1d4a2a' : '#0f1830' });
  const R = rng(5); for (let i = 0; i < 50; i++) out += circle(R() * w, R() * h * 0.6, R.range(0.6, 2), { fill: '#e9eed8', opacity: 0.6 });
  out += g({ filter: 'url(#silhouette)' }, path(`M${w * 0.2},${h} L${w * 0.2},${h * 0.5} L${w * 0.5},${h * 0.28} L${w * 0.8},${h * 0.5} L${w * 0.8},${h}Z`, { fill: '#000' }), rect(w * 0.62, h * 0.3, 36, 90, { fill: '#000' }));
  out += rect(w * 0.3, h * 0.6, 80, 90, { fill: flash ? '#7dff9a' : '#f3c66f' }) + rect(w * 0.58, h * 0.6, 80, 90, { fill: flash ? '#7dff9a' : '#3a4a6a' });
  out += rect(w * 0.45, h * 0.44, 60, 60, { fill: flash ? '#b8ffc8' : '#f3c66f' });
  if (flash) out += K.glow(w * 0.48, h * 0.48, 600, '#6dff8a', 0.8);
  out += rect(0, h * 0.9, w, h * 0.1, { fill: '#000' });
  return out;
};
ep.panel(820, hollow(false), [dark('"The Dark Lord came to Godric\'s Hollow. You should have been hidden—but you were betrayed."', 400, 90, { w: 560 })], { border: 'none', alt: 'A cottage at night in a village. Warm lamplight in the windows.' });
ep.panel(820, hollow(true), [dark('"He killed James. He killed Lily. And he came, in the end, to you. To your cot."', 400, 90, { w: 560 }),
  dark('"He cast the Killing Curse."', 400, 700, { w: 360 })], { border: 'none', alt: 'The same cottage, its windows blazing with sickly green light.' });
ep.panel(760, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#050807' }) + K.glow(ctx.w / 2, ctx.h / 2, 300, '#6dff8a', 0.6) + circle(ctx.w / 2, ctx.h / 2, 26, { fill: '#e9ffe9' }),
  [dark('"The Killing Curse is formed of pure hate. It strikes directly at the soul. It cannot be blocked, and whomever it strikes, they die."', 400, 110, { w: 560 }),
   dark('"But you survived. You are the only person ever to survive."', 400, 640, { w: 540 })], { border: 'none' });
ep.panel(700, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#0c0f1a' });
  out += g({ transform: `translate(${w * 0.5},${h * 0.5}) scale(2.2)` }, path('M-10,-40 l20,20 l-16,8 l20,22', { fill: 'none', stroke: '#c43a32', 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }), K.glow(0, 0, 90, '#c43a32', 0.3));
  return out;
}, [dark('"The curse rebounded, and struck the Dark Lord—leaving only the burnt hulk of his body, and a scar upon your forehead."', 400, 100, { w: 560 }),
    dark('"That was the end of the terror. We were free. That is why people want to see your scar, and shake your hand."', 400, 590, { w: 560 })], { border: 'none', alt: 'A lightning-bolt scar, glowing faintly red in the dark.' });
// the note of confusion
ep.setBg(C.paper);
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: '#0c0f1a', bottom: C.paper } });
ep.beat(380, [plain('?', 680, 190, { font: "'IM Fell English', serif", size: 46, color: '#a08f70' }),
  capC('(And somewhere in the back of his mind was a small, small note of confusion—a sense of something wrong about that story. But he was distracted.)', 360, 190, { w: 520, size: 25 })],
  { alt: 'A faint question mark sits alone in the margin.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 3 }), blur: 2, actors: [{ def: harry, id: 'harry', x: 820, y: 1060, s: 1.1, turn: 0.5, pose: 'slump', expr: 'sad' }] },
  [say('Harry', 'I\'ll—have to think about this.', 560, 90, { w: 280 })], { mood: 'day' });
ep.panel(880, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist', dy: -0.2 }, bg: DA({ start: 3 }), blur: 2, actors: [{ def: harry, id: 'harry', x: 820, y: 1060, s: 1.1, turn: 0.4, pose: 'stand', expr: 'warm' }, { def: mcgonagall, id: 'mcgonagall', x: 1060, y: 1080, turn: -0.3, pose: 'stand', expr: 'sad' }] },
  [say('Harry', 'You can call them my parents, if you want. You don\'t have to say "genetic parents".', 262, 132, { w: 330, fixed: true }),
   say('Harry', 'I guess there\'s no reason I can\'t have two mothers and two fathers.', 275, 365, { w: 320, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 3 }), blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 900, y: 1080, turn: -0.2, expr: { base: 'teary', mouth: { type: 'line', curve: 0.3 } } }] },
  [cap('There was no sound from Professor McGonagall.', 44, 30, { w: 360 })], { mood: 'day', alt: 'McGonagall, moved beyond words.' });
ep.bleed(1300, { cam: { x: 1000, y: 230, w: 1500 }, bg: () => L.gringotts(),
  actors: [{ def: mcgonagall, id: 'mcgonagall', x: 880, y: 1090, s: 1, turn: 0.1, pose: 'stand', expr: 'calm' }, { def: harry, id: 'harry', x: 1060, y: 1100, s: 1.1, turn: -0.1, pose: 'stand', expr: 'awe' }] },
  [capC('They walked together in silence, until they came before a great white building with vast bronze doors.', 400, 1150, { w: 540 })], { mood: 'day', fadeTop: true, alt: 'Gringotts: a vast white marble bank with columns and bronze doors. Harry and McGonagall, tiny, at the foot of its steps.' });
ep.end();

export default ep;
