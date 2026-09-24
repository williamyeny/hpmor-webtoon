// EPISODE 6 — The Planning Fallacy  (source: HPMOR ch. 6, first half)
import { Episode, say, shout, whisper, inner, cold, cap, capC, dark, note, title, plain, M } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line } from '../engine/core/svg.js';
import * as O from '../engine/bg/oxford.js';
import * as L from '../engine/bg/london.js';
import * as B from '../engine/bg/bank.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harry, mcgonagall, mum, della, youngHarry } from '../engine/chars/cast.js';
import { wand, pouch, coinBag, healerKit } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep06', number: 6, title: 'The Planning Fallacy' });
ep.setBg(C.paper);
ep.beat(260, [plain('CHAPTER SIX', 400, 90, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('The Planning Fallacy', 400, 170, { size: 50 })]);
const WAND = g({ transform: 'translate(0,10)' }, wand(120, '#4a2e1b')); // gripped in the hand, pointing out past the fingers
const DA = (o = {}) => () => L.diagonAlley({ seed: 7, ...o });
// the near hand holds the open pouch; the far arm hangs relaxed
const POUCH = { armF: { sh: 22, el: 75, hand: 'hold', prop: g({ transform: 'rotate(97) translate(24,-22)' }, pouch(0.85, { open: true })) }, armB: { sh: 6, el: 12 } };
const HW = (o = {}) => ({ def: harry, id: 'harry', x: 900, y: 1080, s: 1.1, turn: 0.4, pose: 'hold', ...o });
// Harry's pencil notes (the pouch lab book, the two ways, the planning-fallacy chart): Caveat on cream paper
const T = FX.scrawl;
const MW = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 1150, y: 1090, turn: -0.4, pose: 'stand', expr: 'calm', ...o });

// =============================================================== the pouch experiments
ep.panel(760, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: DA({ start: 2 }), actors: [HW({ ...POUCH, expr: 'focus' }), MW({ expr: 'unimpressed' })] },
  [cap('Some children would have waited until after their first trip to Diagon Alley. Most would at least have waited to get their *wands* first.', 44, 34, { w: 480 }),
   say('Harry', 'Bag of element 79.', 230, 330, { w: 340, fixed: true })], { mood: 'day' });
const pouchGrid = (res) => (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  for (let y = 40; y < h; y += 32) out += line(0, y, w, y, { stroke: '#b9c9d8', 'stroke-width': 1 });
  const rows = [['"bag of element 79"', false], ['"bag of okane"  (Japanese: money)', true], ['"bag of tokens of economic exchange"', false], ['"give me back the bag I just put in"', true], ['"bag of ahava"', false], ['"bag of zahav"', true], ['"bag of 115 Galleons"', true], ['"bag of 90 plus 25 Galleons"', false]];
  rows.slice(0, res).forEach(([q, ok], i) => { const y = 72 + i * 64; out += T(40, y, q, 38, 'start') + T(w - 60, y, ok ? '✓' : '✗', 46, 'middle', ok ? '#2f7a3a' : '#c43a32'); });
  return out;
};
ep.panel(510, pouchGrid(4), [cap('Harry James Potter-Evans-Verres had got his hands on at least one magical item. Why wait?', 44, 350, { w: 600, fixed: true })], { shape: 'torn', frame: 'paper', seed: 11, alt: 'Harry\'s pencil lab notes on the pouch: some phrasings retrieve the gold, some don\'t.' });
ep.panel(900, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist', dy: -0.7 }, bg: DA({ start: 2 }), actors: [HW({ ...POUCH, expr: 'think' }), MW({ expr: 'calm' })] },
  [say('Harry', 'Professor, can you give me two words in a language I wouldn\'t know? One for gold, and one for something that isn\'t money. Don\'t tell me which is which.', 385, 196, { w: 530, fixed: true }),
   say('McGonagall', '*Ahava* and *zahav*. That\'s Hebrew. The other one means love.', 575, 728, { w: 300, fixed: true, tail: 'mcgonagall' })], { mood: 'day' });
ep.panel(600, pouchGrid(8), [], { shape: 'torn', frame: 'paper', seed: 23, alt: 'More notes: "ahava" fails, "zahav" works; "115 Galleons" works but "90 plus 25 Galleons" doesn\'t.' });
// the rant bursts off the page: Harry alone on the paper, rays exploding behind him
ep.cutout(1180, { cam: { x: 900, y: 880, w: 500 }, bg: DA({ start: 2 }), actors: [HW({ expr: 'rant', pose: 'armsUp' })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.42, { col: '#c9922e', op: 0.45, inner: 300 }) },
  [shout('Harry', 'AAAAAARGH THIS DOESN\'T MAKE ANY SENSE!', 400, 152, { w: 520, size: 40 }),
   say('Harry', 'It can *count* but it can\'t *add?* It understands nouns but not noun phrases that mean the same thing? It\'s not using the maker\'s knowledge and it\'s not using *mine!*', 400, 1040, { w: 600, size: 27, fixed: true, shape: 'box', noTail: true })], { alt: 'Harry, arms flung up, screams at the sky, rays bursting out behind him.' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 2 }), blur: 3, actors: [MW({ expr: { base: 'smile', mouth: { type: 'smirk' } } })] },
  [say('McGonagall', 'Magic.', 260, 100, { w: 150 })], { mood: 'day' });
ep.panel(800, { cam: { on: ['harry'], fr: 'bust', dy: -0.35 }, bg: DA({ start: 2 }), blur: 2, actors: [HW({ expr: 'yell', pose: 'fists' })] },
  [shout('Harry', 'That\'s just a *word!* Even after you say it, I can\'t make any new predictions! It\'s exactly like saying "phlogiston"!', 400, 192, { w: 430, size: 30, fixed: true })], { mood: 'day' });
ep.panel(860, { cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.25 }, bg: DA({ start: 2 }), blur: 2, actors: [MW({ expr: 'suspicious', pose: 'crossArms' })] },
  [say('McGonagall', 'With respect, Mr Potter, I\'m quite sure I don\'t understand what you\'re trying to do. Unless—this is just a guess, mind—you\'re trying to take over the world?', 400, 150, { w: 520, fixed: true })], { mood: 'day' });
ep.multi(680, [
  { x: M, y: 18, w: 316, h: 644, mood: 'day', art: { cam: { on: ['harry'], fr: 'close', dy: -0.5 }, bg: DA(), blur: 3, actors: [HW({ ...POUCH, expr: 'flustered' })] } },
  { x: 356, y: 18, w: 420, h: 644, mood: 'day', art: { cam: { on: ['mcgonagall'], fr: 'close', dy: -0.8 }, bg: DA(), blur: 3, actors: [MW({ expr: 'unimpressed' })] } },
], [say('Harry', 'No! I mean yes—well, *no!*', 188, 112, { w: 250, fixed: true }), say('McGonagall', 'I think I should perhaps be alarmed that you have trouble answering the question.', 566, 166, { w: 330, fixed: true, tail: 'mcgonagall@1' })]);
// ten Muggle-born a year
ep.panel(700, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust' }, bg: DA({ start: 4 }), actors: [HW({ expr: 'focus', pose: 'walk' }), MW({ expr: 'calm', pose: 'walk2', turn: 0.4 })] },
  [say('Harry', 'How many Muggle-raised children *do* you get at Hogwarts every year?', 288, 105, { w: 380 }),
   say('McGonagall', 'Perhaps ten or so?', 560, 615, { w: 300, fixed: true, tail: 'mcgonagall' })], { mood: 'day' });
ep.panel(600, { cam: { on: ['harry'], fr: 'bust', dy: 0.1 }, bg: DA({ start: 4 }), blur: 2, actors: [HW({ expr: 'shock', pose: 'walk2', lean: -14 })] },
  [shout('Harry', '*TEN?*', 400, 118, { w: 200, size: 50, fixed: true })], { mood: 'day', shape: 'burst', points: 26, seed: 12 });
const twoWays = (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  out += T(w / 2, 62, 'Nobody here has ever run an experiment. So either…', 38);
  out += rect(40, 100, w / 2 - 60, h - 150, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 2.5 }) + rect(w / 2 + 20, 100, w / 2 - 60, h - 150, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 2.5 });
  out += T(w * 0.25, 156, '(1) magic is so', 38) + T(w * 0.25, 200, 'impenetrable that', 38) + T(w * 0.25, 244, 'everyone gave up', 38) + path(`M${w * 0.25 - 50},320 q50,-50 100,0 q-50,50 -100,0Z`, { fill: '#b9ad92' }) + T(w * 0.25, 410, '…and I\'ll do', 36) + T(w * 0.25, 450, 'no better', 36);
  out += T(w * 0.75, 150, '(2)', 34) + g({ transform: `translate(${w * 0.75},290)` }, circle(0, 0, 70, { fill: '#8fb4cf', stroke: '#2d2a4a', 'stroke-width': 3 }), path('M-40,-20 q30,-30 60,0 q-10,30 -40,40Z M10,20 q20,-10 30,10', { fill: '#7fa06a', stroke: '#2d2a4a', 'stroke-width': 2 }), path('M-6,-110 L-6,-66 M-6,-110 L34,-98 L-6,-86', { stroke: '#c43a32', 'stroke-width': 4, fill: '#c43a32' })) + T(w * 0.75, 430, 'mine.', 50);
  return out;
};
ep.panel(560, twoWays, [], { shape: 'torn', frame: 'paper', seed: 17, alt: 'Harry\'s notes: either magic is so impenetrable that everyone gave up, or the whole world is his for the taking. A little flag planted on a globe.' });
ep.bleed(1000, { cam: { x: 1500, y: 700, w: 700 }, bg: DA({ start: 4 }), actors: [HW({ x: 1500, y: 1180, s: 1.6, turn: 0.1, pose: 'holdUp', expr: 'bigGrin', armF: { sh: -145, el: 15, hand: 'fist' }, armB: { sh: 8, el: -4 } })] },
  [cap('*You\'re mine now,* Harry thought at the walls of Diagon Alley, and at all the lands and people of wizarding Britain, and the entire universe of which Muggle scientists understood so much less than they believed.', 44, 40, { w: 500 }),
   dark('I, Harry James Potter-Evans-Verres, do now claim this territory in the name of Science.', 400, 870, { w: 560 })], { mood: 'day', alt: 'Harry thrusts a fist at the sky in the middle of Diagon Alley.' });
ep.panel(460, { cam: { x: 1500, y: -300, w: 900 }, bg: DA({ start: 4 }) }, [cap('Lightning and thunder completely failed to flash and boom in the cloudless skies.', 44, 30, { w: 420 })], { mood: 'day', alt: 'A perfectly calm, cloudless sky.' });
ep.panel(900, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: DA({ start: 4 }), actors: [HW({ x: 1400, expr: 'grin', pose: 'stand' }), MW({ x: 1640, expr: 'suspicious' })] },
  [say('McGonagall', 'What are you smiling about?', 560, 90, { w: 300 }),
   say('Harry', 'I\'m wondering if there\'s a spell to make lightning flash in the background whenever I make an ominous resolution.', 262, 338, { w: 360, fixed: true })], { mood: 'day' });
ep.panel(600, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 4 }), blur: 3, actors: [MW({ x: 1640, expr: 'exasperated' })] },
  [say('McGonagall', 'I have the distinct feeling that I ought to be doing something about this.', 400, 100, { w: 440 })], { mood: 'day' });

// =============================================================== the healer's kit
const DEL = (o = {}) => ({ def: della, id: 'della', x: 1250, y: 1080, turn: -0.4, pose: 'present', expr: 'smile', ...o });
const kitStall = () => L.stall(1000, 'Emergency Healing Pack Plus: 5 G', C.forest, 'none') + g({ transform: `translate(1000,${L.FLOOR - 90}) scale(0.9)` }, healerKit(1));
ep.panel(820, { cam: { x: 915, y: 690, w: 880 }, bg: DA({ start: 6 }), mid: kitStall, actors: [DEL(), HW({ x: 760, expr: 'delight', pose: 'reach' }), MW({ x: 560, turn: 0.4 })] },
  [cap('Harry had bought his potion ingredients and cauldron, and, oh, a few more things. Smart, sensible purchases. He genuinely didn\'t understand why Professor McGonagall was looking so *suspicious.*', 44, 34, { w: 630, size: 26 })], { mood: 'day' });
const KL = (t, x, y, o = {}) => note(t, x, y, { size: 34, color: '#2d2a4a', ...o });
// the kit laid out on the page itself, like a catalogue plate: no frame, just the object and Harry's pencil labels
ep.cutout(800, (ctx) => ellipse(400, 612, 300, 22, { fill: '#3a2a1a', opacity: 0.2, filter: 'url(#blur3)' }) + g({ transform: `translate(400,420)` }, healerKit(2.45)) + [[214, 212, 214, 292], [388, 212, 388, 305], [570, 212, 570, 300], [250, 612, 250, 545], [560, 612, 560, 548]].map(([a, b, c, d]) => line(a, b, c, d, { stroke: '#2d2a4a', 'stroke-width': 3, 'stroke-linecap': 'round' })).join(''),
  [cap('The Emergency Healing Pack Plus.', 44, 30, { w: 520 }),
   KL('tourniquets', 200, 180), KL('liquid fire', 388, 180), KL('numbing cloth', 590, 180),
   KL('"Dementor Exposure Treatment"', 250, 695, { w: 260 }), KL('Bafflesnaffle Counter', 560, 695, { w: 220 })], { mood: 'warm', alt: 'The Emergency Healing Pack Plus, open: self-tightening tourniquets, a syringe of liquid fire, numbing cloth, a "Dementor Exposure Treatment" that looks exactly like chocolate, and a Bafflesnaffle Counter shaped like a quivering egg.' });
ep.panel(760, { cam: { on: ['harry', 'della'], fr: 'bust', dy: -0.6 }, bg: DA({ start: 6 }), mid: kitStall, actors: [HW({ x: 900, expr: 'smug', pose: 'gesture' }), DEL({ x: 1180, expr: 'bigGrin' })] },
  [say('Harry', 'A definite buy at five Galleons, wouldn\'t you agree?', 250, 100, { w: 380 })], { mood: 'day' });
// the Evil Eye: the panel itself is an eye
ep.panel(600, { cam: { head: 'mcgonagall', hw: 0.9, hx: 0.5, hy: 0.52 }, bg: DA({ start: 6 }), blur: 3, actors: [MW({ x: 560, turn: 0.3, expr: 'menace' })] },
  [cap('What he was getting instead could only be described as the Evil Eye.', 400, 18, { w: 520, anchor: 'tc', fixed: true })], { mood: 'day', shape: 'eye', ph: 470, panel: { y: 112 } });
ep.panel(620, { cam: { head: 'mcgonagall', hw: 0.3, hx: 0.4, hy: 0.66 }, bg: DA({ start: 6 }), blur: 2, actors: [MW({ x: 560, turn: 0.4, pose: 'crossArms', expr: 'suspicious' })] },
  [say('McGonagall', 'And just *why* do you expect to *need* a healer\'s kit, young man?', 540, 100, { w: 320 })], { mood: 'day' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: DA({ start: 6 }), blur: 2, actors: [HW({ x: 900, expr: 'shock', pose: 'shrug' })] },
  [say('Harry', 'You think I\'m *planning* to do something dangerous, and *that\'s* why I want a medical kit?', 400, 110, { w: 540, fixed: true }),
   say('Harry', 'Were you also thinking that when I bought the Feather-Fall Potion, the Gillyweed, and the Food and Water Pills?', 400, 860, { w: 560, fixed: true })], { mood: 'day' });
ep.multi(540, [
  { x: M, y: 18, w: 368, h: 504, mood: 'day', art: { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA(), blur: 3, actors: [MW({ x: 560, turn: 0.3, expr: 'stern' })] } },
  { x: 408, y: 18, w: 368, h: 504, mood: 'day', art: { cam: { on: ['harry'], fr: 'close', dy: -0.75 }, bg: DA(), blur: 3, actors: [HW({ ...POUCH, x: 900, expr: 'confused' })] } },
], [say('McGonagall', 'Yes.', 110, 80, { w: 110, fixed: true }), say('Harry', 'Just what sort of plan do you think I have *going*, here?', 592, 150, { w: 262, fixed: true })]);
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: DA({ start: 6 }), blur: 2, actors: [MW({ x: 560, turn: 0.4, expr: 'menace', pose: 'handsHips' })] },
  [say('McGonagall', 'I don\'t know. But it ends either in you delivering a ton of silver to Gringotts, or in world domination.', 540, 110, { w: 360 })], { mood: 'day' });
ep.panel(580, { cam: { on: ['harry'], fr: 'close', dy: -0.15 }, bg: DA({ start: 6 }), blur: 3, actors: [HW({ ...POUCH, x: 900, expr: 'scheme' })] },
  [say('Harry', 'World domination is such an ugly phrase. I prefer to call it *world optimisation.*', 400, 100, { w: 440 })], { mood: 'day' });
ep.beat(260, [capC('This hilarious joke failed to reassure the witch giving him the Look of Doom.', 400, 130, { w: 560 })]);
ep.panel(720, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: DA({ start: 6 }), blur: 2, actors: [HW({ x: 900, expr: 'cross', pose: 'handsHips' })] },
  [say('Harry', 'Don\'t take this the wrong way, Professor McGonagall, but *what sort of crazy children are you used to dealing with?*', 400, 110, { w: 520 })], { mood: 'day' });
ep.panel(800, { cam: { on: ['mcgonagall'], fr: 'close', dy: 0.3, zoom: 0.85 }, bg: DA({ start: 6 }), blur: 3, actors: [MW({ x: 560, turn: 0.2, expr: { base: 'pained', eyes: { open: 0.5 } } })], over: (e) => FX.frost(e.w, e.h, 0.2, 4) },
  [say('McGonagall', '*Gryffindors.*', 160, 150, { w: 240, fixed: true }),
   cap('The word carried a freight of bitterness and despair that fell like an eternal curse on all youthful enthusiasm and high spirits.', 44, 606, { w: 610, fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { on: ['harry'], fr: 'waist', dy: -0.3 }, bg: DA({ start: 6 }), actors: [HW({ x: 900, expr: 'determined', pose: 'lecture' })] },
  [say('Harry', 'I am not going to be in Gryffindor. I am going to be in *Ravenclaw.* I don\'t *like* danger, it is *scary.* I am being *prudent.* I am preparing for *unforeseen contingencies!*', 400, 160, { w: 620, fixed: true }),
   say('Harry', 'Like my parents used to sing: *Be prepared! That\'s the Boy Scout\'s marching song!*', 400, 790, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(680, { cam: { on: ['mcgonagall'], fr: 'close', dy: -0.05 }, bg: DA({ start: 6 }), blur: 3, actors: [MW({ x: 560, turn: 0.4, expr: 'calm' })] },
  [say('McGonagall', 'And what sort of *contingency* do you imagine this kit might prepare you for, young man?', 400, 110, { w: 560, fixed: true })], { mood: 'day' });
// the imagined worst case — rendered as Harry imagines it: cold, blue, slow
ep.setBg('#1b2433');
ep.tile({ h: 120, panels: [], bubbles: [], bg: { top: C.paper, bottom: '#1b2433' } });
const girl = { ...della, name: 'girlImagined', body: { ...della.body }, outfit: { ...della.outfit, top: '#23202a', robeColor: '#23202a' } };
ep.panel(1000, { cam: { x: 930, y: 830, w: 800 }, bg: () => rect(-500, -500, 3000, 3000, { fill: '#243352' }) + K.stoneWall(-500, -300, 3000, 1100, '#5f5b52', 5) + rect(-500, 800, 3000, 1000, { fill: '#3a3a44' }),
  actors: [{ def: girl, id: 'girl', x: 1250, y: 1000, turn: -0.3, pose: 'lie', expr: 'asleep' }, { def: harry, id: 'harry', x: 700, y: 1000, s: 1.1, turn: 0.5, pose: 'kneel', expr: { base: 'horror', mouth: { type: 'o', open: 0.7 } }, armF: { sh: 35, el: 30, hand: 'open', prop: g({ transform: 'rotate(65) translate(2,20)' }, pouch(0.8, { open: true })) }, armB: { sh: -4, el: 44, hand: 'hold' } }] },
  [dark('"One of my classmates gets bitten by a horrible monster. And as I scrabble frantically in my pouch for something that could help her, she looks at me sadly, and with her last breath she says…"', 400, 20, { w: 600, anchor: 'tc', fixed: true }),
   dark('"*Why weren\'t you prepared?*"', 400, 930, { w: 400, fixed: true })], { mood: 'cold', shape: 'cloud', seed: 6, frame: 'glow', glow: '#9fb6d6', ph: 700, panel: { y: 190 }, alt: 'Imagined, in cold blues: a girl in school robes lying on stone; Harry on his knees beside her, digging desperately in his pouch.' });
ep.panel(360, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#0f1622' }), [dark('"And then she dies, and I know as her eyes close that she won\'t ever forgive me."', 400, 170, { w: 560 })], { border: 'none' });
ep.setBg(C.paper);
ep.tile({ h: 120, panels: [], bubbles: [], bg: { top: '#1b2433', bottom: C.paper } });
ep.panel(620, { cam: { on: ['della'], fr: 'close' }, bg: DA({ start: 6 }), blur: 3, actors: [DEL({ expr: { base: 'hurt', mouth: { type: 'line', curve: -0.6, w: 0.6 } } })] },
  [whisper('Della', '(a small gasp)', 540, 110, { w: 200 })], { mood: 'day', alt: 'The young salesgirl stares at Harry, lips pressed tight.' });
ep.panel(700, { cam: { x: 1280, y: 700, w: 780 }, bg: DA({ start: 6 }), mid: kitStall, actors: [DEL({ x: 1400, turn: 0.7, pose: 'run', expr: 'cry' })], over: (e) => FX.speedLines(e.w, e.h, { n: 30 }) },
  [cap('Then she whirled, and fled into the back of the shop.', 104, 30, { w: 400, fixed: true })], { mood: 'day', shape: 'slant', slant: 70 });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 6 }), blur: 3, actors: [HW({ ...POUCH, x: 900, expr: 'confused' })] },
  [inner('Harry', '*What…?*', 130, 300, { w: 200, fixed: true })], { mood: 'day' });

// =============================================================== the Quietus alley
const QA = () => B.sideAlley({ dirt: true });
const HA = (o = {}) => ({ def: harry, id: 'harry', x: 820, y: 1080, s: 1.1, turn: -0.4, pose: 'stand', ...o });
const MA = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 560, y: 1090, turn: 0.4, pose: 'stand', expr: 'stern', ...o });
ep.panel(760, { cam: { x: 690, y: 740, w: 820 }, bg: QA, actors: [MA({ pose: 'wand', armB: { sh: 110, el: 20, hand: 'hold', prop: WAND }, turn: -0.4 }), HA({ expr: 'worried' })],
  over: (e) => path(`M${e.w * 0.02},0 L${e.w * 0.02},${e.h}`, { stroke: '#dfeaf4', 'stroke-width': 6, opacity: 0.6, 'stroke-dasharray': '4 10' }) },
  [say('McGonagall', '*Quietus.*', 150, 90, { w: 180, fixed: true }),
   cap('A screen of silence descended around them, blocking out all the street noises.', 404, 34, { w: 316, fixed: true })], { mood: 'day', frame: 'glow', glow: '#6fa3d8', alt: 'McGonagall leads Harry into an alley that dead-ends in black earth, and seals off the sound with her wand.' });
ep.panel(820, { cam: { on: ['mcgonagall'], fr: 'bust', dx: 0.65 }, bg: QA, blur: 2, actors: [MA({ expr: 'stern' })] },
  [say('McGonagall', 'You must remember, Mr Potter, that there was a war in this country not ten years ago.', 530, 160, { w: 350, fixed: true }),
   say('McGonagall', 'Everyone has lost someone. To speak of friends dying in your arms—is *not done lightly.*', 545, 648, { w: 350, fixed: true })], { mood: 'day' });
ep.panel(700, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: { base: 'horror', mouth: { type: 'o', open: 0.8 } }, turn: -0.2 })] },
  [inner('Harry', 'The war ended ten years ago. So that girl would have been eight, maybe nine, when… when…', 400, 110, { w: 560 })], { mood: 'day' });
ep.panel(900, { cam: { x: 830, y: 820, w: 540 }, bg: QA, actors: [HA({ turn: 0.6, pose: 'facepalm', expr: 'sob' })] },
  [shout('Harry', 'I\'m sorry, I\'m sorry, I\'m *sorry!*', 400, 130, { w: 420, size: 34, fixed: true }),
   cap('He turned to run from the older witch\'s gaze. But there was a wall of dirt blocking his way, and he didn\'t have his wand yet.', 44, 730, { w: 610, fixed: true })], { mood: 'day' });
ep.panel(640, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: 'sad' })] },
  [say('McGonagall', 'I know you are, Mr Potter.', 540, 110, { w: 260 })], { mood: 'day' });
ep.panel(820, { cam: { x: 700, y: 800, w: 580 }, bg: QA, actors: [MA({ expr: 'sad' }), HA({ expr: 'teary', turn: -0.2, pose: 'facepalm', armF: { sh: 60, el: 95, hand: 'palm' } })] },
  [whisper('Harry', 'Did anything like that happen to—', 590, 170, { w: 300, fixed: true }),
   cap('And then Harry shut his lips, and slapped a hand over his mouth for good measure.', 44, 690, { w: 620, fixed: true })], { mood: 'day' });
ep.panel(740, { cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.05 }, bg: QA, blur: 2, actors: [MA({ expr: 'pained' })] },
  [say('McGonagall', 'You must learn to think before you speak, Mr Potter, or go through life without many friends. That has been the fate of many a Ravenclaw. I hope it will not be yours.', 400, 168, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(960, { cam: { on: ['mcgonagall'], fr: 'close', dy: 0.1 }, bg: QA, blur: 3, actors: [MA({ expr: 'sad', turn: 0.2 })] },
  [say('McGonagall', 'But to answer your question: no. Certainly I\'ve watched a friend breathe their last, once or seven times.', 400, 132, { w: 540, fixed: true }),
   say('McGonagall', 'But not one of them ever cursed me as they died. Why would you *say* such a thing, Mr Potter? Why would you even *think* it?', 400, 818, { w: 580, fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { on: ['harry'], fr: 'bust', dy: 0.3 }, bg: QA, blur: 2, actors: [HA({ expr: 'hurt' })] },
  [say('Harry', 'I… it\'s just that I always try to imagine the worst thing that could happen.', 400, 100, { w: 520, fixed: true }),
   say('McGonagall', 'But *why?*', 150, 660, { w: 160, tail: [20, 740], fixed: true }),
   shout('Harry', 'So I can stop it from happening!', 470, 772, { w: 460, size: 32, fixed: true, tail: [440, 680] })], { mood: 'day' });
ep.panel(1000, { cam: { x: 720, y: 830, w: 560 }, bg: QA, actors: [MA({ pose: 'kneel', expr: 'warm', x: 600 }), HA({ expr: 'teary' })] },
  [say('McGonagall', 'Mr Potter. It\'s not your responsibility to take care of the students at Hogwarts. It\'s *mine.* I won\'t let anything bad happen to you or anyone else.', 400, 160, { w: 580, fixed: true }),
   say('McGonagall', 'You won\'t need a healer\'s kit at all, let alone a five-Galleon one.', 400, 878, { w: 560, fixed: true, tail: [300, 790] })], { mood: 'day' });
ep.panel(880, { cam: { on: ['harry'], fr: 'bust', dy: -0.5 }, bg: QA, blur: 2, actors: [HA({ expr: 'yell', pose: 'fists' })] },
  [shout('Harry', 'But I *do!* *Nowhere* is perfectly safe! What if my parents have a heart attack when I go home for Christmas—Madam Pomfrey won\'t be there!', 400, 214, { w: 390, size: 30, fixed: true })], { mood: 'day' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: 'worried' })] },
  [say('McGonagall', 'There\'s no need to think about such terrible things, Mr Potter!', 400, 100, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(660, { cam: { on: ['harry'], fr: 'close', dy: -0.1 }, bg: QA, blur: 3, actors: [HA({ expr: 'angry' })], over: (e) => FX.frost(e.w, e.h, 0.25, 7) },
  [say('Harry', 'Yes there *is!* If you don\'t think, you don\'t just get hurt yourself. You end up hurting other people!', 400, 110, { w: 520 })], { mood: 'day' });
ep.panel(960, { cam: { on: ['mcgonagall'], fr: 'bust', dy: 0.2 }, bg: QA, blur: 2, actors: [MA({ expr: 'think', pose: 'stand' })] },
  [cap('Professor McGonagall opened her mouth, then closed it.', 44, 30, { w: 360, fixed: true }),
   say('McGonagall', 'Mr Potter… if I were to offer to listen to you, for a while… is there anything you\'d like to talk to me about?', 400, 830, { w: 500, fixed: true })], { mood: 'day' });
ep.panel(520, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'confused' })] },
  [say('Harry', 'About what?', 400, 90, { w: 260 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: 'warm' })] },
  [say('McGonagall', 'About why you\'re convinced you must always be on your guard against terrible things happening to you.', 400, 110, { w: 520 })], { mood: 'day' });
// the planning fallacy, visualised
const pf = (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  out += T(w / 2, 62, '"When will you finish your homework?"', 40);
  const bars = [['50% sure', 13], ['75% sure', 19], ['99% sure', 45]];
  bars.forEach(([lab, pct], i) => { const x = 100 + i * 220, base = h - 80; out += rect(x, base - 300, 150, 300, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 2.5, 'stroke-dasharray': '6 5' }) + rect(x, base - pct * 3, 150, pct * 3, { fill: '#c43a32', opacity: 0.7 }) + T(x + 75, base + 40, lab, 36) + T(x + 75, base - pct * 3 - 14, pct + '% did', 36, 'middle', '#c43a32'); });
  out += T(w / 2, 112, '…and "best case" guesses = "normal case" guesses', 32);
  return out;
};
ep.panel(1000, pf, [say('Harry', 'Muggle researchers found people are always too optimistic. Even when they were 99% sure, less than half the students finished on time. It\'s called the *planning fallacy.*', 400, 335, { w: 520, tail: null, fixed: true })],
  { alt: 'A pencil bar chart: of students 50%, 75% and 99% sure they\'d finish their homework in time, only 13%, 19% and 45% did.' });
ep.panel(880, { cam: { on: ['harry'], fr: 'waist', dy: -0.4 }, bg: QA, actors: [HA({ expr: 'focus', pose: 'lecture' })] },
  [say('Harry', 'So when you\'re doing something new, you have to be really, *really* pessimistic. So pessimistic that reality comes out better as often as it comes out worse.', 400, 150, { w: 560, fixed: true })], { mood: 'day' });
ep.panel(920, { cam: { on: ['harry'], fr: 'close', dy: 0.5 }, bg: QA, blur: 3, actors: [HA({ expr: 'focus' })] },
  [say('Harry', 'Like, I make this big effort to be gloomy and imagine one classmate getting bitten. But what *actually* happens is that the surviving Death Eaters attack the whole school to get at me. But on a happier note—', 400, 688, { w: 500, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'eyes' }, bg: QA, blur: 3, actors: [MA({ expr: 'stern' })] },
  [say('McGonagall', 'Stop.', 125, 82, { w: 140, fixed: true, tail: [160, 300] })], { mood: 'day' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'close', dy: 0.05 }, bg: QA, blur: 3, actors: [MA({ expr: 'worried' })] },
  [say('McGonagall', 'I think I might not have made myself clear. Did anything happen to *you personally* that frightened you, Mr Potter?', 400, 130, { w: 560, fixed: true })], { mood: 'day' });
ep.panel(780, { cam: { on: ['harry'], fr: 'bust', dy: -0.3 }, bg: QA, blur: 2, actors: [HA({ expr: 'unimpressed', pose: 'shrug' })] },
  [say('Harry', 'What happened to me personally is only anecdotal evidence. It doesn\'t carry the same weight as a replicated, peer-reviewed study with random assignment.', 400, 162, { w: 580, fixed: true })], { mood: 'day' });
ep.panel(520, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: 'exasperated' })] },
  [say('McGonagall', 'I would still like to hear about it.', 540, 100, { w: 300 })], { mood: 'day' });
// the pan memory
ep.setBg('#e8dcc2');
const MEM = { mood: 'sepia', overlay: (ctx) => FX.memoryEdge(ctx.w, ctx.h) };
const street = () => O.houseExterior({ rain: false });
ep.panel(960, { cam: { on: ['mum', 'kid'], fr: 'knees', dy: -1.3 }, bg: () => O.kitchen(), actors: [{ def: mum, id: 'mum', x: 900, y: 1000, turn: -0.4, pose: 'present', expr: 'laugh' }, { def: youngHarry, id: 'kid', x: 560, y: 1000, s: 0.95, turn: 0.4, pose: 'hold', expr: 'pleading' }] },
  [cap('"There\'d been some muggings in our neighbourhood. Mum asked me to return a pan to a neighbour two streets away. I said I didn\'t want to, because I might get mugged."', 44, 34, { w: 580, fixed: true }),
   say('Mum', 'Harry, don\'t say things like that!', 270, 370, { w: 300, fixed: true })], { ...MEM, shape: 'torn', frame: 'paper', seed: 31, tear: 12, alt: 'Memory, sepia: Mum, laughing, hands a much younger Harry a saucepan. He is pleading.' });
// tunnel vision: the dark street seen through a shrinking oval of memory
ep.panel(1070, { cam: { x: 830, y: 930, w: 500 }, bg: street, actors: [{ def: youngHarry, id: 'kid', x: 820, y: 1120, s: 0.9, turn: 0.6, pose: 'cower', expr: 'horror', armF: { sh: 10, el: 20, hand: 'hold', prop: g({ transform: 'rotate(215) translate(-98,0)' }, ellipse(0, 0, 40, 14, { fill: '#8a8f96', stroke: C.ink, 'stroke-width': 3 }), rect(36, -6, 70, 12, { fill: '#2a2a2a', stroke: C.ink, 'stroke-width': 2 })) } }],
  over: (e) => rect(0, 0, e.w, e.h, { fill: '#1a1210', opacity: 0.35 }) },
  [cap('"Like thinking about it would *make* it happen. So if I didn\'t talk about it, I\'d be safe."', 44, 24, { w: 610, fixed: true }),
   cap('"I was too young to know how unlikely it was. But I was old enough to know that not thinking about something doesn\'t stop it from happening. So I was really scared."', 44, 870, { w: 610, fixed: true })], { ...MEM, shape: 'oval', border: 'none', ph: 720, panel: { y: 128 }, alt: 'Memory: tiny Harry walks alone down a dim street, clutching a saucepan, terrified, seen through a narrowing oval of darkness.' });
ep.setBg(C.paper);
ep.panel(960, { cam: { on: ['harry'], fr: 'close', dy: 0.15 }, bg: QA, blur: 3, actors: [HA({ expr: 'angry', turn: -0.1 })] },
  [say('Harry', 'She *wouldn\'t listen.* I *begged* her not to send me out, and she *laughed it off.*', 400, 110, { w: 540, fixed: true }),
   say('Harry', 'That\'s when I realised that everyone who was supposed to protect me was actually crazy. And that I couldn\'t ever rely on them to get anything right.', 400, 792, { w: 580, fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { x: 690, y: 765, w: 620 }, bg: QA, actors: [MA({ expr: 'think' }), HA({ expr: 'sad', pose: 'slump' })] },
  [cap('There was a long silence.', 44, 30, { w: 400, fixed: true }), cap('Harry didn\'t like himself when he was angry.', 376, 110, { w: 330, fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { on: ['mcgonagall'], fr: 'close', dy: 0.1 }, bg: QA, blur: 3, actors: [MA({ expr: { base: 'think', eyes: { lookX: 0 } } })] },
  [say('McGonagall', 'Thank you for sharing that, Mr Potter. I shall have to think about this.', 400, 110, { w: 540, fixed: true }),
   cap('(Almost exactly the look Harry wore while experimenting on the pouch, if he\'d only had a mirror to see it.)', 44, 716, { w: 610, fixed: true })], { mood: 'day' });

// =============================================================== "can we get the kit?"
ep.panel(900, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist', dy: -1.1 }, bg: QA, actors: [MA({ expr: 'calm', turn: -0.4 }), HA({ expr: 'hopeful' })] },
  [say('Harry', 'Um. Can we go get the healer\'s kit now?', 556, 110, { w: 330, fixed: true }),
   say('McGonagall', 'And if I say no—that it is too expensive and you won\'t need it—then what?', 256, 292, { w: 330, fixed: true })], { mood: 'day' });
ep.panel(720, { cam: { on: ['harry'], fr: 'close', dy: -0.2 }, bg: QA, blur: 3, actors: [HA({ expr: 'cold' })], over: (e) => FX.frost(e.w, e.h, 0.35, 12) },
  [cold('Harry', 'Exactly what you\'re thinking, Professor. I conclude you\'re another crazy adult I can\'t talk to. And I start planning how to get my hands on a healer\'s kit anyway.', 400, 120, { w: 560 })], { mood: 'cold' });
ep.panel(660, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: 'stern' })] },
  [say('McGonagall', 'I am your guardian on this trip. I *will not* allow you to push me around.', 400, 105, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(820, { cam: { on: ['harry'], fr: 'close', dy: 0.1 }, bg: QA, blur: 3, actors: [HA({ expr: 'sad' })] },
  [say('Harry', 'I understand.', 400, 90, { w: 320, fixed: true }),
   cap('Professor McGonagall had told him to think before he spoke. He probably wouldn\'t remember that tomorrow, but he could at least remember it for five minutes.', 44, 640, { w: 618, fixed: true })], { mood: 'day' });
// the silence lifts: the frame dissolves back into the page as the street noise returns
ep.bleed(900, { cam: { on: ['mcgonagall'], fr: 'bust', dy: 0.2, dx: -0.2, zoom: 0.85 }, bg: QA, blur: 2, actors: [MA({ expr: 'warm', pose: 'wand', turn: -0.4, armB: { sh: 128, el: 30, hand: 'hold', prop: WAND } })] },
  [cap('The witch\'s wand made a slight circle, and the noises of Diagon Alley came back.', 44, 30, { w: 618, fixed: true }),
   say('McGonagall', 'All right, young man. Let\'s go get that healer\'s kit.', 440, 790, { w: 520, fixed: true })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'shock' })] }, [], { mood: 'day', alt: 'Harry\'s jaw drops.' });
ep.panel(960, { cam: { on: ['harry', 'della'], fr: 'waist', dy: -0.6 }, bg: DA({ start: 6 }), mid: kitStall, actors: [HW({ x: 820, expr: 'sad', pose: 'bow' }), DEL({ x: 1300, expr: 'embarrassed', pose: 'bow' })] },
  [say('Harry', 'I apologise for…', 215, 105, { w: 300, fixed: true }), say('Della', 'I\'m sorry!', 600, 150, { w: 260, fixed: true }),
   say('Della', 'I didn\'t mean to get you in trouble with Professor McGonagall. I hope she wasn\'t *too* awful to you.', 400, 820, { w: 560, fixed: true })], { mood: 'day' });
// her hat jumps out of the panel with the shout
ep.panel(640, { cam: { head: 'mcgonagall', hw: 0.3, hx: 0.42, hy: 0.52 }, bg: DA({ start: 6 }), blur: 3, actors: [MW({ x: 560, turn: 0.3, expr: 'shock' })] },
  [shout('McGonagall', '*Della!*', 590, 300, { w: 180, size: 40, fixed: true })], { mood: 'day', breakout: 'top', ph: 472, panel: { y: 150 } });
ep.panel(800, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 6 }), blur: 2, actors: [HW({ x: 900, expr: 'warm', pose: 'holdOne', armF: { sh: 36, el: 60, hand: 'hold', prop: g({ transform: 'rotate(96) translate(12,-32)' }, coinBag(0.9)) } })] },
  [say('Harry', 'Don\'t worry. I understand that she\'s only awful to me because she loves me.', 400, 100, { w: 440 }),
   say('Harry', 'One Emergency Healing Pack Plus, please.', 400, 700, { w: 520, fixed: true })], { mood: 'day' });
// the pouch on the page itself, swallowing the kit
ep.cutout(640, (ctx) => ellipse(ctx.w / 2, ctx.h * 0.6 + 150, 190, 18, { fill: '#3a2a1a', opacity: 0.2, filter: 'url(#blur3)' }) + g({ transform: `translate(${ctx.w / 2},${ctx.h * 0.6})` }, pouch(3.2, { open: true }), g({ transform: 'translate(0,-120) scale(0.8) rotate(-12)' }, healerKit(1.3))),
  [note('glurp', 640, 250, { size: 50, color: '#2d2a4a' }), note('*burp*', 620, 520, { size: 44, color: '#2d2a4a' }), cap('Harry swore he heard a small burping sound afterwards. That *had* to have been spelled in on purpose.', 44, 30, { w: 440, fixed: true })], { alt: 'The pouch\'s Widening Lip swallows the briefcase-sized kit. It burps.' });
// the owl — "I had a pet rock once."
ep.panel(940, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist', dy: -0.35 }, bg: DA({ start: 0 }), actors: [HW({ x: 500, expr: 'suspicious', pose: 'stand' }), MW({ x: 800, expr: 'calm', pose: 'gesture' })] },
  [say('McGonagall', 'Small pets are permitted at Hogwarts—you could get an owl to send letters, for example—', 400, 110, { w: 560, fixed: true }),
   say('Harry', 'Can I pay a Knut or something and *rent* an owl when I need one?', 400, 830, { w: 560, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.multi(540, [
  { x: M, y: 18, w: 368, h: 504, mood: 'day', art: { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 0 }), blur: 3, actors: [MW({ x: 760, expr: 'calm' })] } },
  { x: 408, y: 18, w: 368, h: 504, mood: 'day', art: { cam: { on: ['harry'], fr: 'close', dy: -0.75 }, bg: DA({ start: 0 }), blur: 3, actors: [HW({ x: 500, expr: 'deadpan' })] } },
], [say('McGonagall', 'Yes.', 110, 80, { w: 110, fixed: true }), say('Harry', 'Then I think emphatically *no.*', 592, 110, { w: 290, fixed: true })]);
ep.panel(560, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 0 }), blur: 2, actors: [HW({ x: 500, expr: 'sad', pose: 'stand' })] },
  [say('Harry', 'I had a pet rock once. It died.', 400, 100, { w: 300 })], { mood: 'day' });
ep.panel(1060, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist', dy: -0.2 }, bg: DA({ start: 0 }), actors: [HW({ x: 500, expr: 'worried', pose: 'shrug' }), MW({ x: 760, expr: 'calm' })] },
  [say('Harry', 'I *could* take care of it. But I\'d end up obsessing all day about whether I\'d remembered to feed it, or if it was slowly starving in its cage, wondering where its master was.', 400, 158, { w: 600, fixed: true }),
   whisper('McGonagall', 'That poor owl. Abandoned like that. I wonder what it would do.', 400, 960, { w: 560, fixed: true })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 0 }), blur: 3, actors: [HW({ x: 500, expr: 'focus' })] },
  [say('Harry', 'Well, I expect it\'d get really hungry and start trying to claw its way out of the cage, though it probably wouldn\'t have much luck with—', 400, 110, { w: 540 })], { mood: 'day' });
ep.panel(460, { cam: { on: ['harry'], fr: 'eyes' }, bg: DA({ start: 0 }), blur: 3, actors: [HW({ x: 500, expr: 'what' })] }, [], { mood: 'day', alt: 'Harry stops short.' });

// the abuse question
ep.panel(1140, { cam: { x: 690, y: 650, w: 640 }, bg: QA, actors: [MA({ expr: 'calm' }), HA({ expr: 'angry', pose: 'fists' })] },
  [shout('Harry', 'That owl does *not* represent me! My parents *never* locked me in a cupboard and left me to starve! I do *not* have abandonment issues, and I *don\'t like the trend of your thoughts!*', 420, 266, { w: 420, size: 30, fixed: true })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'hurt' })] },
  [say('Harry', 'You think I was… I was *abused?*', 400, 100, { w: 320 }), say('McGonagall', 'Were you?', 140, 470, { w: 220, tail: [20, 540], fixed: true })], { mood: 'day' });
// the frame itself explodes: a jagged rectangle, teeth all round like a shout balloon
ep.panel(1330, { cam: { on: ['harry'], fr: 'waist', dy: -0.12 }, bg: QA, blur: 3, actors: [HA({ expr: 'rant', pose: 'fists' })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { bg: '#2a0808', col: '#a02020', op: 0.8, n: 120 }) },
  [shout('Harry', '*NO!* I *know* about child abuse, and if anything like that happened I would call the police! But my parents *never* did anything like that, never *ever!*', 400, 232, { w: 470, size: 29, bg: '#fff0e0' }),
   shout('Harry', 'An accusation like that can *destroy families* even when the parents are completely innocent! *Don\'t you dare threaten my family with that! I won\'t let you destroy my home!*', 400, 1100, { w: 430, size: 27, bg: '#fff0e0', fixed: true })], { mood: 'dread', shape: 'jag', jag: 24, seed: 5, borderColor: '#3a0606', borderWidth: 5, alt: 'Harry, screaming, in a red blaze of fury; the panel\'s edges are jagged like a shout.' });
ep.panel(860, { cam: { x: 700, y: 690, w: 600 }, bg: QA, actors: [MA({ expr: 'shock', pose: 'reach', armF: { sh: 20, el: 30, hand: 'open' }, armB: { sh: 100, el: 25, hand: 'splay' } }), HA({ expr: 'angry', pose: 'cower', armF: { sh: 30, el: 70, hand: 'fist' }, armB: { sh: 142, el: 0, hand: 'open' } })],
  over: (e) => FX.emanata(e.w * 0.52, e.h * 0.45, 50, { n: 6, a0: -180, a1: 180 }) }, [cap('Harry took a fast step back, and his hand snapped up and knocked hers away.', 44, 30, { w: 618, fixed: true }), say('McGonagall', 'Harry…', 150, 200, { w: 180, fixed: true })], { mood: 'day' });
ep.panel(1000, { cam: { on: ['mcgonagall'], fr: 'close', dy: 0.15 }, bg: QA, blur: 3, actors: [MA({ expr: 'warm' })] },
  [say('McGonagall', 'Harry, it\'s all right. I believe you.', 400, 90, { w: 520, fixed: true }),
   say('McGonagall', 'I saw your house. I saw you with your parents. They love you. You love them. But I *had* to ask, because there is something strange at work here.', 400, 850, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(1080, { cam: { on: ['mcgonagall'], fr: 'close', dy: 0.2 }, bg: QA, blur: 3, actors: [MA({ expr: 'worried' })] },
  [say('McGonagall', 'When you\'re happy, you don\'t behave like an abused child. Not at *all.* You smile at strangers. I put my hand on your shoulder and you didn\'t flinch.', 400, 150, { w: 500, fixed: true }),
   say('McGonagall', 'But sometimes, only sometimes, you say or do something that seems *very* much like someone who spent his first eleven years locked in a cellar.', 400, 900, { w: 500, fixed: true, tail: 'mcgonagall' })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'focus' })] },
  [say('Harry', 'And how *do* you explain your observations, Professor McGonagall?', 400, 100, { w: 440, fixed: true })], { mood: 'day' });
ep.panel(680, { cam: { on: ['mcgonagall'], fr: 'close', dy: -0.05 }, bg: QA, blur: 3, actors: [MA({ expr: 'sad' })] },
  [say('McGonagall', 'I don\'t know. But it\'s possible that something could have happened to you that you don\'t remember.', 400, 110, { w: 560, fixed: true })], { mood: 'day' });
ep.panel(660, { cam: { on: ['harry'], fr: 'bust' }, bg: QA, blur: 2, actors: [HA({ expr: 'angry', pose: 'point' })] },
  [say('Harry', 'Suppressed memory is a load of *pseudo-science!* People don\'t repress traumatic memories, they remember them all *too* well!', 400, 110, { w: 540 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'eyes', dy: -0.2 }, bg: QA, blur: 3, actors: [MA({ expr: 'calm' })] },
  [say('McGonagall', 'No, Mr Potter. There is a Charm called *Obliviation.*', 400, 80, { w: 580, fixed: true, tail: [400, 250] })], { mood: 'day' });
ep.panel(820, { cam: { on: ['harry'], fr: 'close', dy: 0.05 }, bg: QA, blur: 3, actors: [HA({ expr: 'horror' })], over: (e) => FX.frost(e.w, e.h, 0.4, 13) },
  [whisper('Harry', 'A spell that erases memories?', 400, 90, { w: 460, fixed: true }),
   say('McGonagall', 'But not all the *effects* of the experience, if you see what I\'m saying.', 400, 718, { w: 560, tail: [30, 790], fixed: true })], { mood: 'cold' });
ep.panel(1060, { cam: { x: 700, y: 760, w: 600 }, bg: QA, actors: [MA({ expr: 'sad' }), HA({ expr: 'think', pose: 'chin', armF: { sh: 54, el: 96, hand: 'fist', hr: 0 } })] },
  [say('Harry', 'Professor, how sure are you of your observations? And what alternative explanations could there be?', 410, 128, { w: 560, fixed: true }),
   say('McGonagall', 'Sure? I\'m sure of *nothing.* In all my life I\'ve never met anyone like you. Sometimes you just don\'t seem eleven years old. Or even all that *human.*', 390, 900, { w: 540, fixed: true, tail: [220, 560] })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: 'flustered' })] },
  [say('McGonagall', 'I\'m sorry! That came out sounding different from what I had in mind—', 400, 100, { w: 440 })], { mood: 'day' });
ep.panel(820, { cam: { on: ['harry'], fr: 'close', dy: 0.05 }, bg: QA, blur: 3, actors: [HA({ expr: 'smile' })] },
  [say('Harry', 'On the contrary, Professor McGonagall. I shall take it as a very great compliment.', 400, 105, { w: 540, fixed: true }),
   say('Harry', 'But may I offer an alternative explanation?', 400, 735, { w: 520, fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { on: ['harry'], fr: 'close', dy: -0.62 }, bg: QA, blur: 3, actors: [HA({ expr: 'sad', pose: 'slump' })] },
  [say('Harry', 'Children aren\'t meant to be too much smarter than their parents. Or too much saner. I\'m too smart, Professor. I\'ve got nothing to say to normal children. Adults don\'t respect me enough to really talk to me.', 400, 205, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'waist', dy: 0.22 }, bg: QA, actors: [HA({ expr: 'sad', pose: 'slump' })] },
  [say('Harry', 'I\'m *isolated.* I\'ve been isolated my whole life. Maybe that has some of the same effects as being locked in a cellar.', 400, 128, { w: 560, fixed: true }),
   say('Harry', 'And I also have an anger management problem. But I\'m working on it. That\'s all.', 400, 898, { w: 560, fixed: true })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: { base: 'teary', mouth: { type: 'line', curve: -0.2 } } })] },
  [say('McGonagall', '*That\'s all?*', 560, 100, { w: 240 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: QA, blur: 2, actors: [HA({ expr: 'warm', pose: 'stand' })] },
  [say('Harry', 'That\'s all. Surely, Professor, even in magical Britain, the normal explanation is always worth *considering?*', 400, 100, { w: 520 })], { mood: 'day' });
ep.bleed(900, { cam: { x: 710, y: 700, w: 900 }, bg: QA, actors: [MA({ expr: 'think', turn: 0.2, x: 600 }), HA({ expr: 'calm', turn: 0.2, x: 820 })], over: (e) => rect(0, 0, e.w, e.h, { fill: '#2a1a3a', opacity: 0.2 }) },
  [cap('Professor McGonagall didn\'t say whether she agreed.', 44, 60, { w: 640, fixed: true })], { mood: 'dusk', alt: 'The two of them stand in the dead-end alley, quiet, in lengthening shadows.' });
ep.end();
export default ep;
