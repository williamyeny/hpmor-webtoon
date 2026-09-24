// EPISODE 6 — The Planning Fallacy  (source: HPMOR ch. 6, first half)
import { Episode, say, shout, whisper, think, inner, cold, cap, capC, dark, note, title, plain, M } from '../engine/core/dsl.js';
import { shot } from '../engine/core/scene.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as O from '../engine/bg/oxford.js';
import * as L from '../engine/bg/london.js';
import * as B from '../engine/bg/bank.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harry, mcgonagall, mum, della, youngHarry, goblin } from '../engine/chars/cast.js';
import { wand, pouch, coinBag, healerKit, bookHeld } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep06', number: 6, title: 'The Planning Fallacy' });
ep.setBg(C.paper);
ep.beat(260, [plain('CHAPTER SIX', 400, 90, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('The Planning Fallacy', 400, 170, { size: 50 })]);
const WAND = g({ transform: 'translate(0,26) rotate(180)' }, wand(120, '#4a2e1b'));
const DA = (o = {}) => () => L.diagonAlley({ seed: 7, ...o });
const POUCH = { sh: 22, el: 75, hand: 'hold', prop: g({ transform: 'translate(0,30)' }, pouch(0.9, { open: true })) };
const HW = (o = {}) => ({ def: harry, id: 'harry', x: 900, y: 1080, s: 1.1, turn: 0.4, pose: 'hold', armF: POUCH, ...o });
const MW = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 1150, y: 1090, turn: -0.4, pose: 'stand', expr: 'calm', ...o });

// =============================================================== the pouch experiments
ep.panel(760, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: DA({ start: 2 }), actors: [HW({ expr: 'focus' }), MW({ expr: 'unimpressed' })] },
  [cap('Some children would have waited until after their first trip to Diagon Alley. Most would at least have waited to get their *wands* first.', 44, 34, { w: 480 }),
   say('Harry', 'Bag of element 79.', 250, 560, { w: 240 })], { mood: 'day' });
const pouchGrid = (res) => (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  for (let y = 36; y < h; y += 32) out += line(0, y, w, y, { stroke: '#b9c9d8', 'stroke-width': 1 });
  const T = (x, y, s, fs = 30, a = 'start', col = '#2d2a4a') => text(x, y, s, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, 'text-anchor': a, fill: col });
  const rows = [['"bag of element 79"', false], ['"bag of okane"  (Japanese: money)', true], ['"bag of tokens of economic exchange"', false], ['"give me back the bag I just put in"', true], ['"bag of ahava"', false], ['"bag of zahav"', true], ['"bag of 115 Galleons"', true], ['"bag of 90 plus 25 Galleons"', false]];
  rows.slice(0, res).forEach(([q, ok], i) => { const y = 70 + i * 58; out += T(40, y, q, 30) + T(w - 60, y, ok ? '✓' : '✗', 40, 'middle', ok ? '#2f7a3a' : '#c43a32'); });
  return out;
};
ep.panel(620, pouchGrid(4), [cap('Harry James Potter-Evans-Verres had got his hands on at least one magical item. Why wait?', 360, 500, { w: 380 })], { alt: 'Harry\'s pencil lab notes on the pouch: some phrasings retrieve the gold, some don\'t.' });
ep.panel(760, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: DA({ start: 2 }), actors: [HW({ expr: 'think' }), MW({ expr: 'calm' })] },
  [say('Harry', 'Professor, can you give me two words—one for gold, and one for something else that isn\'t money—in a language I wouldn\'t know? Don\'t tell me which is which.', 250, 100, { w: 380, size: 28 }),
   say('McGonagall', '*Ahava* and *zahav*. That\'s Hebrew. The other one means love.', 560, 620, { w: 320 })], { mood: 'day' });
ep.panel(620, pouchGrid(8), [], { alt: 'More notes: "ahava" fails, "zahav" works; "115 Galleons" works but "90 plus 25 Galleons" doesn\'t.' });
ep.bleed(900, { cam: { on: ['harry'], fr: 'waist' }, bg: DA({ start: 2 }), blur: 3, actors: [HW({ expr: 'rant', pose: 'armsUp', armF: undefined })], under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { bg: '#f6e0b0', col: '#c9922e', op: 0.6 }) },
  [shout('Harry', 'AAAAAARGH THIS DOESN\'T MAKE ANY SENSE!', 400, 110, { w: 520, size: 40 }),
   say('Harry', 'It can *count* but it can\'t *add?* It understands nouns but not noun phrases that mean the same thing? It\'s not using the maker\'s knowledge and it\'s not using *mine*—', 400, 740, { w: 580, size: 27 })], { mood: 'day' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 2 }), blur: 3, actors: [MW({ expr: { base: 'smile', mouth: { type: 'smirk' } } })] },
  [say('McGonagall', 'Magic.', 260, 100, { w: 150 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 2 }), blur: 2, actors: [HW({ expr: 'yell', pose: 'fists', armF: undefined })] },
  [shout('Harry', 'That\'s just a *word!* Even after you say it, I can\'t make any new predictions! It\'s exactly like saying "phlogiston"!', 400, 110, { w: 520, size: 30 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: DA({ start: 2 }), blur: 2, actors: [MW({ expr: 'suspicious', pose: 'crossArms' })] },
  [say('McGonagall', 'With respect, Mr Potter, I\'m quite sure I don\'t understand what you\'re trying to do. Unless—this is just a guess, mind—you\'re trying to take over the world?', 280, 110, { w: 420, size: 28 })], { mood: 'day' });
ep.multi(420, [
  { x: M, y: 18, w: 368, h: 384, mood: 'day', art: { cam: { on: ['harry'], fr: 'close' }, bg: DA(), blur: 3, actors: [HW({ expr: 'flustered' })] } },
  { x: 408, y: 18, w: 368, h: 384, mood: 'day', art: { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA(), blur: 3, actors: [MW({ expr: 'unimpressed' })] } },
], [say('Harry', 'No! I mean yes—well, *no!*', 190, 70, { w: 260 }), say('McGonagall', 'I think I should perhaps be alarmed that you have trouble answering the question.', 600, 90, { w: 300, size: 24 })]);
// ten Muggle-born a year
ep.panel(620, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust' }, bg: DA({ start: 4 }), actors: [HW({ expr: 'focus', pose: 'walk', armF: undefined }), MW({ expr: 'calm', pose: 'walk2', turn: 0.4 })] },
  [say('Harry', 'How many Muggle-raised children *do* you get at Hogwarts every year?', 250, 100, { w: 340 }),
   say('McGonagall', 'Perhaps ten or so?', 560, 500, { w: 220 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 4 }), blur: 2, actors: [HW({ expr: 'shock', pose: 'walk2', armF: undefined, lean: -14 })] },
  [shout('Harry', '*TEN?*', 400, 110, { w: 200, size: 50 })], { mood: 'day' });
const twoWays = (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  const T = (x, y, s, fs = 30, a = 'middle', col = '#2d2a4a') => text(x, y, s, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, 'text-anchor': a, fill: col });
  out += T(w / 2, 60, 'Nobody here has ever run an experiment. So either…', 32);
  out += rect(40, 100, w / 2 - 60, h - 150, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 2.5 }) + rect(w / 2 + 20, 100, w / 2 - 60, h - 150, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 2.5 });
  out += T(w * 0.25, 150, '(1) magic is so', 28) + T(w * 0.25, 186, 'impenetrable that', 28) + T(w * 0.25, 222, 'everyone gave up', 28) + path(`M${w * 0.25 - 40},300 q40,-40 80,0 q-40,40 -80,0Z`, { fill: '#b9ad92' }) + T(w * 0.25, 380, '…and I\'ll do no better', 26);
  out += T(w * 0.75, 150, '(2)', 34) + g({ transform: `translate(${w * 0.75},290)` }, circle(0, 0, 70, { fill: '#8fb4cf', stroke: '#2d2a4a', 'stroke-width': 3 }), path('M-40,-20 q30,-30 60,0 q-10,30 -40,40Z M10,20 q20,-10 30,10', { fill: '#7fa06a', stroke: '#2d2a4a', 'stroke-width': 2 }), path('M-6,-110 L-6,-66 M-6,-110 L34,-98 L-6,-86', { stroke: '#c43a32', 'stroke-width': 4, fill: '#c43a32' })) + T(w * 0.75, 420, 'mine.', 40);
  return out;
};
ep.panel(560, twoWays, [], { alt: 'Harry\'s notes: either magic is so impenetrable that everyone gave up — or the whole world is his for the taking. A little flag planted on a globe.' });
ep.bleed(1000, { cam: { x: 1500, y: 560, w: 950 }, bg: DA({ start: 4 }), actors: [HW({ x: 1500, y: 1180, s: 1.6, turn: 0.1, pose: 'holdUp', expr: 'bigGrin', armF: undefined, armB: { sh: 160, el: 6, hand: 'fist' } })] },
  [cap('*You\'re mine now,* Harry thought at the walls of Diagon Alley—at all the lands and people of wizarding Britain, and the entire universe of which Muggle scientists understood so much less than they believed.', 44, 40, { w: 500 }),
   dark('I, Harry James Potter-Evans-Verres, do now claim this territory in the name of Science.', 400, 870, { w: 560 })], { mood: 'day', alt: 'Harry thrusts a fist at the sky in the middle of Diagon Alley.' });
ep.panel(460, (ctx) => shot({ cam: { x: 1500, y: -300, w: 900 }, bg: DA({ start: 4 }) })(ctx), [cap('Lightning and thunder completely failed to flash and boom in the cloudless skies.', 44, 30, { w: 420 })], { mood: 'day', alt: 'A perfectly calm, cloudless sky.' });
ep.panel(620, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust' }, bg: DA({ start: 4 }), actors: [HW({ x: 1400, expr: 'grin', pose: 'stand', armF: undefined }), MW({ x: 1640, expr: 'suspicious' })] },
  [say('McGonagall', 'What are you smiling about?', 560, 90, { w: 270 }),
   say('Harry', 'I\'m wondering if there\'s a spell to make lightning flash in the background whenever I make an ominous resolution.', 250, 540, { w: 360 })], { mood: 'day' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 4 }), blur: 3, actors: [MW({ x: 1640, expr: 'exasperated' })] },
  [say('McGonagall', 'I have the distinct feeling that I ought to be doing something about this.', 400, 100, { w: 440 })], { mood: 'day' });

// =============================================================== the healer's kit
const DEL = (o = {}) => ({ def: della, id: 'della', x: 1250, y: 1080, turn: -0.4, pose: 'present', expr: 'smile', ...o });
const kitStall = () => L.stall(1000, 'Emergency Healing Pack Plus — 5 G', C.forest, 'none') + g({ transform: `translate(1000,${L.FLOOR - 90}) scale(0.9)` }, healerKit(1));
ep.panel(760, { cam: { x: 1020, y: 700, w: 1100 }, bg: DA({ start: 6 }), mid: kitStall, actors: [DEL(), HW({ x: 760, expr: 'delight', pose: 'reach', armF: undefined }), MW({ x: 560, turn: 0.4 })] },
  [cap('Harry had bought his potion ingredients and cauldron, and, oh, a few more things. Smart, sensible purchases. He genuinely didn\'t understand why Professor McGonagall was looking so *suspicious.*', 44, 34, { w: 500, size: 26 })], { mood: 'day' });
ep.panel(680, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#6b4429' }) + K.glow(ctx.w / 2, ctx.h / 2, 500, C.candle, 0.3) + g({ transform: `translate(${ctx.w / 2},${ctx.h / 2 + 20})` }, healerKit(2.7, { labels: true })),
  [cap('The Emergency Healing Pack Plus.', 44, 30, { w: 360 })], { mood: 'warm', alt: 'The Emergency Healing Pack Plus, open: self-tightening tourniquets, a syringe of liquid fire, numbing cloth, a "Dementor Exposure Treatment" that looks exactly like chocolate, and a Bafflesnaffle Counter shaped like a quivering egg.' });
ep.panel(620, { cam: { on: ['harry', 'della'], fr: 'bust' }, bg: DA({ start: 6 }), mid: kitStall, actors: [HW({ x: 900, expr: 'smug', pose: 'gesture', armF: undefined }), DEL({ x: 1180, expr: 'bigGrin' })] },
  [say('Harry', 'A definite buy at five Galleons, wouldn\'t you agree?', 250, 90, { w: 300 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'eyes' }, bg: DA({ start: 6 }), blur: 3, actors: [MW({ x: 560, turn: 0.3, expr: 'menace' })] },
  [cap('What he was getting instead could only be described as the Evil Eye.', 44, 30, { w: 440 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: DA({ start: 6 }), blur: 2, actors: [MW({ x: 560, turn: 0.4, pose: 'crossArms', expr: 'suspicious' })] },
  [say('McGonagall', 'And just *why* do you expect to *need* a healer\'s kit, young man?', 540, 100, { w: 320 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 6 }), blur: 2, actors: [HW({ x: 900, expr: 'shock', pose: 'shrug', armF: undefined })] },
  [say('Harry', 'You think I\'m *planning* to do something dangerous, and *that\'s* why I want a medical kit?', 280, 100, { w: 380 }),
   say('Harry', 'Were you also thinking that when I bought the Feather-Fall Potion, the Gillyweed, and the Food and Water Pills?', 280, 540, { w: 380 })], { mood: 'day' });
ep.multi(420, [
  { x: M, y: 18, w: 368, h: 384, mood: 'day', art: { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA(), blur: 3, actors: [MW({ x: 560, turn: 0.3, expr: 'stern' })] } },
  { x: 408, y: 18, w: 368, h: 384, mood: 'day', art: { cam: { on: ['harry'], fr: 'close' }, bg: DA(), blur: 3, actors: [HW({ x: 900, expr: 'confused' })] } },
], [say('McGonagall', 'Yes.', 130, 60, { w: 110 }), say('Harry', 'Just what sort of plan do you think I have *going*, here?', 610, 80, { w: 290, size: 26 })]);
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: DA({ start: 6 }), blur: 2, actors: [MW({ x: 560, turn: 0.4, expr: 'menace', pose: 'handsHips' })] },
  [say('McGonagall', 'I don\'t know. But it ends either in you delivering a ton of silver to Gringotts, or in world domination.', 540, 110, { w: 360 })], { mood: 'day' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 6 }), blur: 3, actors: [HW({ x: 900, expr: 'scheme' })] },
  [say('Harry', 'World domination is such an ugly phrase. I prefer to call it *world optimisation.*', 400, 100, { w: 440 })], { mood: 'day' });
ep.beat(260, [capC('This hilarious joke failed to reassure the witch giving him the Look of Doom.', 400, 130, { w: 560 })]);
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 6 }), blur: 2, actors: [HW({ x: 900, expr: 'cross', pose: 'handsHips', armF: undefined })] },
  [say('Harry', 'Don\'t take this the wrong way, Professor McGonagall, but *what sort of crazy children are you used to dealing with?*', 400, 110, { w: 520 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 6 }), blur: 3, actors: [MW({ x: 560, turn: 0.2, expr: { base: 'pained', eyes: { open: 0.5 } } })], over: (e) => FX.frost(e.w, e.h, 0.2, 4) },
  [say('McGonagall', '*Gryffindors.*', 540, 110, { w: 220 }),
   cap('The word carried a freight of bitterness and despair that fell like an eternal curse on all youthful enthusiasm and high spirits.', 44, 400, { w: 440, size: 26 })], { mood: 'day' });
ep.panel(760, { cam: { on: ['harry'], fr: 'waist' }, bg: DA({ start: 6 }), actors: [HW({ x: 900, expr: 'determined', pose: 'lecture', armF: undefined })] },
  [say('Harry', 'I am not going to be in Gryffindor. I am going to be in *Ravenclaw.* I don\'t *like* danger, it is *scary.* I am being *prudent.* I am preparing for *unforeseen contingencies!*', 400, 110, { w: 560, size: 28 }),
   say('Harry', 'Like my parents used to sing: *Be prepared! That\'s the Boy Scout\'s marching song!*', 400, 640, { w: 480 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: DA({ start: 6 }), blur: 2, actors: [MW({ x: 560, turn: 0.4, expr: 'calm' })] },
  [say('McGonagall', 'And what sort of *contingency* do you imagine this kit might prepare you for, young man?', 540, 110, { w: 340 })], { mood: 'day' });
// the imagined worst case — rendered as Harry imagines it: cold, blue, slow
ep.setBg('#1b2433');
ep.tile({ h: 120, panels: [], bubbles: [], bg: { top: C.paper, bottom: '#1b2433' } });
const girl = { ...della, name: 'girlImagined', body: { ...della.body }, outfit: { ...della.outfit, top: '#23202a', robeColor: '#23202a' } };
ep.panel(820, { cam: { x: 800, y: 820, w: 700 }, bg: () => rect(-500, -500, 3000, 3000, { fill: '#243352' }) + K.stoneWall(-500, -300, 3000, 1100, '#5f5b52', 5) + rect(-500, 800, 3000, 1000, { fill: '#3a3a44' }),
  actors: [{ def: girl, id: 'girl', x: 900, y: 1000, turn: -0.3, pose: 'fallBack', expr: 'asleep', lean: -50 }, { def: harry, id: 'harry', x: 700, y: 1000, s: 1.1, turn: 0.5, pose: 'kneel', expr: 'horror', armF: { sh: 60, el: 60, hand: 'open', prop: g({ transform: 'translate(0,30)' }, pouch(0.8, { open: true })) } }] },
  [dark('"One of my classmates gets bitten by a horrible monster. And as I scrabble frantically in my pouch for something that could help her, she looks at me sadly, and with her last breath says—"', 400, 100, { w: 580 }),
   dark('"*Why weren\'t you prepared?*"', 400, 740, { w: 400 })], { mood: 'cold', border: 'none', alt: 'Imagined, in cold blues: a girl in school robes lying on stone; Harry on his knees beside her, digging desperately in his pouch.' });
ep.panel(460, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#0f1622' }), [dark('"And then she dies, and I know as her eyes close that she won\'t ever forgive me—"', 400, 200, { w: 560 })], { border: 'none' });
ep.setBg(C.paper);
ep.tile({ h: 120, panels: [], bubbles: [], bg: { top: '#1b2433', bottom: C.paper } });
ep.panel(620, { cam: { on: ['della'], fr: 'close' }, bg: DA({ start: 6 }), blur: 3, actors: [DEL({ expr: { base: 'hurt', mouth: { type: 'line', curve: -0.6, w: 0.6 } } })] },
  [whisper('Della', '(a small gasp)', 540, 110, { w: 200 })], { mood: 'day', alt: 'The young salesgirl stares at Harry, lips pressed tight.' });
ep.panel(620, { cam: { x: 1250, y: 700, w: 1000 }, bg: DA({ start: 6 }), mid: kitStall, actors: [DEL({ x: 1400, turn: 0.7, pose: 'run', expr: 'cry' })], over: (e) => FX.speedLines(e.w, e.h, { n: 30 }) },
  [cap('Then she whirled, and fled into the back of the shop.', 44, 30, { w: 400 })], { mood: 'day' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 6 }), blur: 3, actors: [HW({ x: 900, expr: 'confused' })] },
  [inner('Harry', '*What…?*', 400, 380, { w: 200 })], { mood: 'day' });

// =============================================================== the Quietus alley
const QA = () => B.sideAlley({ dirt: true });
const HA = (o = {}) => ({ def: harry, id: 'harry', x: 820, y: 1080, s: 1.1, turn: -0.4, pose: 'stand', ...o });
const MA = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 560, y: 1090, turn: 0.4, pose: 'stand', expr: 'stern', ...o });
ep.panel(760, { cam: { x: 700, y: 640, w: 1200 }, bg: QA, actors: [MA({ pose: 'wand', armB: { sh: 110, el: 20, hand: 'hold', prop: WAND }, turn: -0.4 }), HA({ expr: 'worried' })],
  over: (e) => path(`M${e.w * 0.02},0 L${e.w * 0.02},${e.h}`, { stroke: '#dfeaf4', 'stroke-width': 6, opacity: 0.6, 'stroke-dasharray': '4 10' }) },
  [say('McGonagall', '*Quietus.*', 250, 100, { w: 180 }),
   cap('A screen of silence descended around them, blocking out all the street noises.', 330, 620, { w: 380 })], { mood: 'day', alt: 'McGonagall leads Harry into an alley that dead-ends in black earth, and seals off the sound with her wand.' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: QA, blur: 2, actors: [MA({ expr: 'stern' })] },
  [say('McGonagall', 'You must remember, Mr Potter, that there was a war in this country not ten years ago.', 540, 100, { w: 340 }),
   say('McGonagall', 'Everyone has lost someone. To speak of friends dying in your arms is *not done lightly.*', 540, 560, { w: 340 })], { mood: 'day' });
ep.panel(700, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'horror', turn: -0.2 })] },
  [inner('Harry', 'The war ended ten years ago. So that girl would have been eight, maybe nine, when—when—', 400, 110, { w: 560 })], { mood: 'day' });
ep.panel(760, { cam: { x: 820, y: 700, w: 900 }, bg: QA, actors: [HA({ turn: 0.6, pose: 'facepalm', expr: 'sob' })] },
  [shout('Harry', 'I\'m sorry, I\'m sorry, I\'m *sorry!*', 400, 110, { w: 420, size: 34 }),
   cap('He turned to run from the older witch\'s gaze—but there was a wall of dirt blocking his way, and he didn\'t have his wand yet.', 300, 620, { w: 440 })], { mood: 'day' });
ep.panel(640, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: 'sad' })] },
  [say('McGonagall', 'I know you are, Mr Potter.', 540, 110, { w: 260 })], { mood: 'day' });
ep.panel(760, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: QA, actors: [MA({ expr: 'sad' }), HA({ expr: 'teary', turn: -0.2, pose: 'slump' })] },
  [whisper('Harry', 'Did anything like that happen to—', 560, 90, { w: 300 }),
   cap('And then Harry shut his lips, and slapped a hand over his mouth for good measure.', 44, 620, { w: 420 })], { mood: 'day' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: QA, blur: 2, actors: [MA({ expr: 'pained' })] },
  [say('McGonagall', 'You must learn to think before you speak, Mr Potter, or go through life without many friends. That has been the fate of many a Ravenclaw. I hope it will not be yours.', 540, 120, { w: 380, size: 28 })], { mood: 'day' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: 'sad', turn: 0.2 })] },
  [say('McGonagall', 'But to answer your question: no. Certainly I\'ve watched a friend breathe their last, once or seven times.', 400, 110, { w: 500 }),
   say('McGonagall', 'But not one of them ever cursed me as they died. Why would you *say* such a thing, Mr Potter? Why would you even *think* it?', 400, 590, { w: 520 })], { mood: 'day' });
ep.panel(700, { cam: { on: ['harry'], fr: 'bust' }, bg: QA, blur: 2, actors: [HA({ expr: 'hurt' })] },
  [say('Harry', 'I—I—it\'s just that I always try to imagine the worst thing that could happen.', 400, 100, { w: 440 }),
   say('McGonagall', 'But *why?*', 150, 480, { w: 160, tail: [30, 560] }),
   shout('Harry', 'So I can stop it from happening!', 470, 600, { w: 380, size: 30 })], { mood: 'day' });
ep.panel(760, { cam: { on: ['mcgonagall', 'harry'], fr: 'waist' }, bg: QA, actors: [MA({ pose: 'kneel', expr: 'warm', x: 620 }), HA({ expr: 'teary' })] },
  [say('McGonagall', 'Mr Potter. It\'s not your responsibility to take care of the students at Hogwarts. It\'s *mine.* I won\'t let anything bad happen to you or anyone else.', 300, 110, { w: 440 }),
   say('McGonagall', 'You won\'t need a healer\'s kit at all, let alone a five-Galleon one.', 300, 620, { w: 360 })], { mood: 'day' });
ep.panel(700, { cam: { on: ['harry'], fr: 'bust' }, bg: QA, blur: 2, actors: [HA({ expr: 'yell', pose: 'fists' })] },
  [shout('Harry', 'But I *do!* *Nowhere* is perfectly safe! What if my parents have a heart attack when I go home for Christmas—Madam Pomfrey won\'t be there—', 400, 120, { w: 560, size: 30 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: QA, blur: 2, actors: [MA({ expr: 'worried' })] },
  [say('McGonagall', 'There\'s no need to think about such terrible things, Mr Potter!', 540, 100, { w: 330 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'angry' })], over: (e) => FX.frost(e.w, e.h, 0.25, 7) },
  [say('Harry', 'Yes there *is!* If you don\'t think, you don\'t just get hurt yourself—you end up hurting other people!', 400, 110, { w: 520 })], { mood: 'day' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: QA, blur: 2, actors: [MA({ expr: 'think', pose: 'chin' })] },
  [cap('Professor McGonagall opened her mouth, then closed it.', 44, 30, { w: 360 }),
   say('McGonagall', 'Mr Potter… if I were to offer to listen to you, for a while… is there anything you\'d like to talk to me about?', 540, 560, { w: 360 })], { mood: 'day' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'confused' })] },
  [say('Harry', 'About what?', 400, 100, { w: 180 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: 'warm' })] },
  [say('McGonagall', 'About why you\'re convinced you must always be on your guard against terrible things happening to you.', 400, 110, { w: 520 })], { mood: 'day' });
// the planning fallacy, visualised
const pf = (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  const T = (x, y, s, fs = 28, a = 'middle', col = '#2d2a4a') => text(x, y, s, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, 'text-anchor': a, fill: col });
  out += T(w / 2, 50, '"When will you finish your homework?"', 32);
  const bars = [['50% sure', 13], ['75% sure', 19], ['99% sure', 45]];
  bars.forEach(([lab, pct], i) => { const x = 110 + i * 220, base = h - 90; out += rect(x, base - 300, 110, 300, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 2, 'stroke-dasharray': '6 5' }) + rect(x, base - pct * 3, 110, pct * 3, { fill: '#c43a32', opacity: 0.7 }) + T(x + 55, base + 34, lab) + T(x + 55, base - pct * 3 - 12, pct + '% did', 26, 'middle', '#c43a32'); });
  out += T(w / 2, 100, '…and "best case" guesses = "normal case" guesses', 26);
  return out;
};
ep.panel(760, pf, [say('Harry', 'Muggle researchers found people are always too optimistic. Even when they were 99% sure, less than half the students finished on time. It\'s called the *planning fallacy.*', 400, 170, { w: 560, size: 26, tail: null })],
  { alt: 'A pencil bar chart: of students 50%, 75% and 99% sure they\'d finish their homework in time, only 13%, 19% and 45% did.' });
ep.panel(760, { cam: { on: ['harry'], fr: 'waist' }, bg: QA, actors: [HA({ expr: 'focus', pose: 'lecture' })] },
  [say('Harry', 'So when you\'re doing something new, you have to be really, *really* pessimistic. So pessimistic that reality comes out better as often as it comes out worse.', 400, 110, { w: 560, size: 28 }),
   say('Harry', 'Like, I make this big effort to be gloomy and imagine one classmate getting bitten—but what *actually* happens is that the surviving Death Eaters attack the whole school to get at me. But on a happier note—', 400, 640, { w: 580, size: 26 })], { mood: 'day' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'eyes' }, bg: QA, blur: 3, actors: [MA({ expr: 'stern' })] },
  [say('McGonagall', 'Stop.', 400, 360, { w: 140 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: QA, blur: 2, actors: [MA({ expr: 'worried' })] },
  [say('McGonagall', 'I think I might not have made myself clear. Did anything happen to *you personally* that frightened you, Mr Potter?', 540, 120, { w: 360 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'bust' }, bg: QA, blur: 2, actors: [HA({ expr: 'unimpressed', pose: 'shrug' })] },
  [say('Harry', 'What happened to me personally is only anecdotal evidence. It doesn\'t carry the same weight as a replicated, peer-reviewed study with random assignment.', 400, 110, { w: 540, size: 27 })], { mood: 'day' });
ep.panel(520, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: 'exasperated' })] },
  [say('McGonagall', 'I would still like to hear about it.', 540, 100, { w: 300 })], { mood: 'day' });
// the pan memory
ep.setBg('#e8dcc2');
const MEM = { mood: 'sepia', overlay: (ctx) => FX.memoryEdge(ctx.w, ctx.h) };
const street = () => O.houseExterior({ rain: false });
ep.panel(760, { cam: { on: ['mum', 'kid'], fr: 'waist' }, bg: () => O.kitchen(), actors: [{ def: mum, id: 'mum', x: 900, y: 1000, turn: -0.4, pose: 'present', expr: 'laugh' }, { def: youngHarry, id: 'kid', x: 560, y: 1000, s: 0.95, turn: 0.4, pose: 'hold', expr: 'pleading' }] },
  [cap('"There\'d been some muggings in our neighbourhood. Mum asked me to return a pan to a neighbour two streets away. I said I didn\'t want to, because I might get mugged."', 44, 34, { w: 500, size: 26 }),
   say('Mum', 'Harry, don\'t say things like that!', 560, 560, { w: 280 })], { ...MEM, alt: 'Memory, sepia: Mum, laughing, hands a much younger Harry a saucepan. He is pleading.' });
ep.panel(900, { cam: { x: 820, y: 860, w: 900 }, bg: street, actors: [{ def: youngHarry, id: 'kid', x: 820, y: 1120, s: 0.9, turn: 0.6, pose: 'hold', expr: 'horror', armF: { sh: 30, el: 70, hand: 'hold', prop: g({ transform: 'translate(0,20)' }, ellipse(0, 0, 40, 14, { fill: '#8a8f96', stroke: C.ink, 'stroke-width': 3 }), rect(36, -6, 70, 12, { fill: '#2a2a2a', stroke: C.ink, 'stroke-width': 2 })) } }],
  over: (e) => rect(0, 0, e.w, e.h, { fill: '#1a1210', opacity: 0.35 }) },
  [cap('"Like thinking about it would *make* it happen. So if I didn\'t talk about it, I\'d be safe."', 44, 34, { w: 460 }),
   cap('"I was too young to know how unlikely it was. But I was old enough to know that not thinking about something doesn\'t stop it from happening. So I was really scared."', 280, 720, { w: 460, size: 26 })], { ...MEM, alt: 'Memory: tiny Harry walks alone down a dim street, clutching a saucepan, terrified.' });
ep.setBg(C.paper);
ep.panel(700, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'angry', turn: -0.1 })] },
  [say('Harry', 'She *wouldn\'t listen.* I *begged* her not to send me out, and she *laughed it off.*', 400, 100, { w: 520 }),
   say('Harry', 'That\'s when I realised that everyone who was supposed to protect me was actually crazy. And that I couldn\'t ever rely on them to get anything right.', 400, 560, { w: 540, size: 28 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: QA, actors: [MA({ expr: 'think' }), HA({ expr: 'sad', pose: 'slump' })] },
  [cap('There was a long silence.', 44, 30, { w: 300 }), cap('Harry didn\'t like himself when he was angry.', 400, 470, { w: 360 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: QA, blur: 2, actors: [MA({ expr: { base: 'think', eyes: { lookX: 0 } }, pose: 'crossArms' })] },
  [say('McGonagall', 'Thank you for sharing that, Mr Potter. I shall have to think about this.', 540, 110, { w: 340 }),
   cap('(Almost exactly the look Harry wore while experimenting on the pouch—if he\'d only had a mirror to see it.)', 44, 480, { w: 440, size: 25 })], { mood: 'day' });

// =============================================================== "can we get the kit?"
ep.panel(620, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: QA, actors: [MA({ expr: 'calm', turn: -0.4 }), HA({ expr: 'hopeful' })] },
  [say('Harry', 'Um. Can we go get the healer\'s kit now?', 560, 100, { w: 300 }),
   say('McGonagall', 'And if I say no—that it is too expensive and you won\'t need it—then what?', 250, 480, { w: 330 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'cold' })], over: (e) => FX.frost(e.w, e.h, 0.35, 12) },
  [cold('Harry', 'Exactly what you\'re thinking, Professor. I conclude you\'re another crazy adult I can\'t talk to—and I start planning how to get my hands on a healer\'s kit anyway.', 400, 120, { w: 560 })], { mood: 'cold' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: QA, blur: 2, actors: [MA({ expr: 'stern' })] },
  [say('McGonagall', 'I am your guardian on this trip. I *will not* allow you to push me around.', 540, 110, { w: 330 })], { mood: 'day' });
ep.panel(520, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'sad' })] },
  [say('Harry', 'I understand.', 400, 100, { w: 200 }),
   cap('Professor McGonagall had told him to think before he spoke. He probably wouldn\'t remember that tomorrow, but he could at least remember it for five minutes.', 44, 380, { w: 520, size: 25 })], { mood: 'day' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: QA, blur: 2, actors: [MA({ expr: 'warm', pose: 'wand', turn: -0.4, armB: { sh: 60, el: 30, hand: 'hold', prop: WAND } })] },
  [cap('The witch\'s wand made a slight circle, and the noises of Diagon Alley came back.', 44, 30, { w: 400 }),
   say('McGonagall', 'All right, young man. Let\'s go get that healer\'s kit.', 540, 540, { w: 300 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'shock' })] }, [], { mood: 'day', alt: 'Harry\'s jaw drops.' });
ep.panel(760, { cam: { on: ['harry', 'della'], fr: 'bust' }, bg: DA({ start: 6 }), mid: kitStall, actors: [HW({ x: 900, expr: 'sad', pose: 'bow', armF: undefined }), DEL({ x: 1180, expr: 'embarrassed', pose: 'bow' })] },
  [say('Della', 'I\'m sorry—', 560, 90, { w: 180 }), say('Harry', 'I apologise for—', 250, 90, { w: 200 }),
   say('Della', 'I didn\'t mean to get you in trouble with Professor McGonagall. I hope she wasn\'t *too* awful to you.', 560, 560, { w: 320, size: 27 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 6 }), blur: 3, actors: [MW({ x: 560, turn: 0.3, expr: 'shock' })] },
  [shout('McGonagall', '*Della!*', 540, 110, { w: 180, size: 40 })], { mood: 'day' });
ep.panel(700, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 6 }), blur: 2, actors: [HW({ x: 900, expr: 'warm', pose: 'holdOne', armF: { sh: 30, el: 70, hand: 'hold', prop: g({ transform: 'translate(0,24)' }, coinBag(0.9)) } })] },
  [say('Harry', 'Don\'t worry. I understand that she\'s only awful to me because she loves me.', 400, 100, { w: 440 }),
   say('Harry', 'One Emergency Healing Pack Plus, please.', 400, 560, { w: 360 })], { mood: 'day' });
ep.panel(640, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#6b4429' }) + K.glow(ctx.w / 2, ctx.h / 2, 400, C.candle, 0.3) + g({ transform: `translate(${ctx.w / 2},${ctx.h * 0.6})` }, pouch(3.2, { open: true }), g({ transform: 'translate(0,-120) scale(0.8) rotate(-12)' }, healerKit(1.3))),
  [note('glurp', 560, 180, { size: 40 }), note('*burp*', 620, 520, { size: 34 }), cap('Harry swore he heard a small burping sound afterwards. That *had* to have been spelled in on purpose.', 44, 30, { w: 420 })], { mood: 'warm', alt: 'The pouch\'s Widening Lip swallows the briefcase-sized kit. It burps.' });
// the owl — "I had a pet rock once."
ep.panel(700, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: DA({ start: 0 }), actors: [HW({ x: 500, expr: 'suspicious', armF: undefined, pose: 'stand' }), MW({ x: 760, expr: 'calm', pose: 'gesture' })] },
  [say('McGonagall', 'Small pets are permitted at Hogwarts. You could get an owl to send letters, for example—', 540, 100, { w: 330 }),
   say('Harry', 'Can I pay a Knut or something and *rent* an owl when I need one?', 250, 560, { w: 300 })], { mood: 'day' });
ep.multi(420, [
  { x: M, y: 18, w: 368, h: 384, mood: 'day', art: { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 0 }), blur: 3, actors: [MW({ x: 760, expr: 'calm' })] } },
  { x: 408, y: 18, w: 368, h: 384, mood: 'day', art: { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 0 }), blur: 3, actors: [HW({ x: 500, expr: 'deadpan', armF: undefined })] } },
], [say('McGonagall', 'Yes.', 130, 60, { w: 110 }), say('Harry', 'Then I think emphatically *no.*', 620, 70, { w: 260 })]);
ep.panel(560, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 0 }), blur: 2, actors: [HW({ x: 500, expr: 'sad', armF: undefined, pose: 'stand' })] },
  [say('Harry', 'I had a pet rock once. It died.', 400, 100, { w: 300 })], { mood: 'day' });
ep.panel(700, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: DA({ start: 0 }), actors: [HW({ x: 500, expr: 'worried', armF: undefined, pose: 'shrug' }), MW({ x: 760, expr: 'calm' })] },
  [say('Harry', 'I *could* take care of it. But I\'d end up obsessing all day about whether I\'d remembered to feed it, or if it was slowly starving in its cage, wondering where its master was.', 300, 110, { w: 460, size: 27 }),
   whisper('McGonagall', 'That poor owl. Abandoned like that. I wonder what it would do.', 560, 620, { w: 300 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 0 }), blur: 3, actors: [HW({ x: 500, expr: 'focus', armF: undefined })] },
  [say('Harry', 'Well, I expect it\'d get really hungry and start trying to claw its way out of the cage, though it probably wouldn\'t have much luck with—', 400, 110, { w: 540 })], { mood: 'day' });
ep.panel(460, { cam: { on: ['harry'], fr: 'eyes' }, bg: DA({ start: 0 }), blur: 3, actors: [HW({ x: 500, expr: 'what', armF: undefined })] }, [], { mood: 'day', alt: 'Harry stops short.' });

// the abuse question
ep.panel(760, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: QA, actors: [MA({ expr: 'calm' }), HA({ expr: 'angry', pose: 'fists' })],
  under: (e) => '' },
  [shout('Harry', 'That owl does *not* represent me! My parents *never* locked me in a cupboard and left me to starve! I do *not* have abandonment issues, and I *don\'t like the trend of your thoughts!*', 400, 130, { w: 580, size: 28 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'hurt' })] },
  [say('Harry', 'You think I was… I was *abused?*', 400, 100, { w: 320 }), say('McGonagall', 'Were you?', 150, 460, { w: 150, tail: [20, 540] })], { mood: 'day' });
ep.bleed(1000, { cam: { on: ['harry'], fr: 'waist' }, bg: QA, blur: 3, actors: [HA({ expr: 'rant', pose: 'fists' })], under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { bg: '#2a0808', col: '#a02020', op: 0.8, n: 120 }) },
  [shout('Harry', '*NO!* I *know* about child abuse, and if anything like that happened I would call the police! But my parents *never* did anything like that, never *ever!*', 400, 140, { w: 580, size: 30, bg: '#fff0e0' }),
   shout('Harry', 'An accusation like that can *destroy families* even when the parents are completely innocent! *Don\'t you dare threaten my family with that! I won\'t let you destroy my home!*', 400, 830, { w: 580, size: 28, bg: '#fff0e0' })], { mood: 'dread', alt: 'Harry, screaming, in a red blaze of fury.' });
ep.panel(700, (ctx) => {
  const s = shot({ cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: QA, actors: [MA({ expr: 'shock', pose: 'reach' }), HA({ expr: 'angry', pose: 'cower', armF: { sh: 110, el: 20, hand: 'open' } })] })(ctx);
  return s + FX.emanata(ctx.w * 0.52, ctx.h * 0.45, 50, { n: 6, a0: -180, a1: 180 });
}, [say('McGonagall', 'Harry—', 250, 100, { w: 150 }), cap('Harry took a fast step back, and his hand snapped up and knocked hers away.', 330, 620, { w: 420 })], { mood: 'day' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: QA, blur: 2, actors: [MA({ expr: 'warm' })] },
  [say('McGonagall', 'Harry, it\'s all right. I believe you.', 540, 100, { w: 300 }),
   say('McGonagall', 'I saw your house. I saw you with your parents. They love you. You love them. But I *had* to ask, because there is something strange at work here.', 540, 540, { w: 380, size: 27 })], { mood: 'day' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: 'worried' })] },
  [say('McGonagall', 'When you\'re happy, you don\'t behave like an abused child. Not at *all.* You smile at strangers. I put my hand on your shoulder and you didn\'t flinch.', 400, 110, { w: 560, size: 28 }),
   say('McGonagall', 'But sometimes—only sometimes—you say or do something that seems *very* much like someone who spent his first eleven years locked in a cellar.', 400, 600, { w: 560, size: 28 })], { mood: 'day' });
ep.panel(520, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'focus' })] },
  [say('Harry', 'And how *do* you explain your observations, Professor McGonagall?', 400, 100, { w: 440 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: QA, blur: 2, actors: [MA({ expr: 'sad' })] },
  [say('McGonagall', 'I don\'t know. But it\'s possible that something could have happened to you that you don\'t remember.', 540, 110, { w: 350 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'bust' }, bg: QA, blur: 2, actors: [HA({ expr: 'angry', pose: 'point' })] },
  [say('Harry', 'Suppressed memory is a load of *pseudo-science!* People don\'t repress traumatic memories, they remember them all *too* well!', 400, 110, { w: 540 })], { mood: 'day' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'eyes' }, bg: QA, blur: 3, actors: [MA({ expr: 'calm' })] },
  [say('McGonagall', 'No, Mr Potter. There is a Charm called *Obliviation.*', 400, 330, { w: 420 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'horror' })], over: (e) => FX.frost(e.w, e.h, 0.4, 13) },
  [whisper('Harry', 'A spell that erases memories?', 400, 100, { w: 320 }),
   say('McGonagall', 'But not all the *effects* of the experience, if you see what I\'m saying.', 400, 520, { w: 440, tail: [30, 600] })], { mood: 'cold' });
ep.panel(700, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust' }, bg: QA, actors: [MA({ expr: 'sad' }), HA({ expr: 'think', pose: 'chin' })] },
  [say('Harry', 'Professor—how sure are you of your observations? And what alternative explanations could there be?', 560, 100, { w: 320 }),
   say('McGonagall', 'Sure? I\'m sure of *nothing.* In all my life I\'ve never met anyone like you. Sometimes you just don\'t seem eleven years old—or even all that *human.*', 280, 560, { w: 420, size: 27 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: 'flustered' })] },
  [say('McGonagall', 'I\'m sorry! That came out sounding different from what I had in mind—', 400, 100, { w: 440 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: QA, blur: 3, actors: [HA({ expr: 'smile' })] },
  [say('Harry', 'On the contrary, Professor McGonagall. I shall take it as a very great compliment.', 400, 100, { w: 460 }),
   say('Harry', 'But may I offer an alternative explanation?', 400, 500, { w: 380 })], { mood: 'day' });
ep.panel(900, { cam: { on: ['harry'], fr: 'waist' }, bg: QA, actors: [HA({ expr: 'sad', pose: 'slump' })] },
  [say('Harry', 'Children aren\'t meant to be too much smarter than their parents. Or too much saner. I\'m too smart, Professor. I\'ve got nothing to say to normal children. Adults don\'t respect me enough to really talk to me.', 400, 130, { w: 580, size: 27 }),
   say('Harry', 'I\'m *isolated.* I\'ve been isolated my whole life. Maybe that has some of the same effects as being locked in a cellar.', 400, 520, { w: 540, size: 28 }),
   say('Harry', 'And I also have an anger management problem. But I\'m working on it. That\'s all.', 400, 790, { w: 480, size: 28 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: QA, blur: 3, actors: [MA({ expr: { base: 'teary', mouth: { type: 'line', curve: -0.2 } } })] },
  [say('McGonagall', '*That\'s all?*', 540, 100, { w: 200 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: QA, blur: 2, actors: [HA({ expr: 'warm', pose: 'stand' })] },
  [say('Harry', 'That\'s all. Surely, Professor, even in magical Britain, the normal explanation is always worth *considering?*', 400, 100, { w: 520 })], { mood: 'day' });
ep.bleed(820, { cam: { x: 700, y: 560, w: 1400 }, bg: QA, actors: [MA({ expr: 'think', turn: 0.2, x: 600 }), HA({ expr: 'calm', turn: 0.2, x: 820 })], over: (e) => rect(0, 0, e.w, e.h, { fill: '#2a1a3a', opacity: 0.2 }) },
  [cap('Professor McGonagall didn\'t say whether she agreed.', 300, 680, { w: 440 })], { mood: 'dusk', alt: 'The two of them stand in the dead-end alley, quiet, in lengthening shadows.' });
ep.end();
export default ep;
