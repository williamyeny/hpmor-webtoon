// EPISODE 11 — Potter, Harry!  (source: HPMOR ch. 9; the lake crossing and the Hall reveal ADDED)
import { Episode, say, shout, whisper, inner, cap, capC, dark, note, title, plain, hat, M } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, ellipse } from '../engine/core/svg.js';
import * as HG from '../engine/bg/hogwarts.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harryRobes, hermione, neville, mcgonagall, dumbledore, snape, quirrell, flitwick, sprout, hagrid, trelawney, clearwater, fred, george, student } from '../engine/chars/cast.js';
import { toad } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep11', number: 11, title: 'Potter, Harry!' });
const NIGHT = '#0a1020';
ep.setBg(NIGHT);
ep.tile({ h: 280, bg: { top: C.paper, bottom: NIGHT }, panels: [], bubbles: [plain('CHAPTER ELEVEN', 400, 110, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('Potter, Harry!', 400, 190, { size: 54, color: '#f1e6cc' })] });

// =============================================================== the lake
const LAKE = (o = {}) => () => HG.lakeNight(o);
ep.bleed(1300, { cam: { x: 800, y: 300, w: 1400 }, bg: LAKE() },
  [capC('The train pulled in after dark. Then there were boats: little ones, with lanterns. And a great black lake.', 400, 80, { w: 540 }),
   capC('And then, across the water, there was Hogwarts.', 400, 1200, { w: 460 })], { mood: 'night', fadeTop: false, alt: 'First sight of Hogwarts: a vast castle of towers and turrets on a cliff, every window lit gold, above a black lake crossed by a flotilla of small lantern-lit boats. A full moon, a sky full of stars.' });
const BOATHAR = [
  { def: harryRobes, id: 'harry', x: 700, y: 1010, s: 1.1, turn: 0.4, pose: 'stand', expr: 'awe' },
  { def: hermione, id: 'hermione', x: 880, y: 1010, s: 1.1, turn: 0.6, pose: 'lecture', expr: 'delight' },
  { def: neville, id: 'neville', x: 540, y: 1010, s: 1.05, turn: 0.5, pose: 'holdOne', expr: 'blank', armF: { sh: 12, el: 100, hand: 'hold', prop: g({ transform: 'translate(0,20)' }, toad(0.9)) } },
];
const boatFg = () => g({ transform: 'translate(720,990) scale(3.4)' }, path('M-104,-10 L104,-10 Q88,38 0,46 Q-88,38 -104,-10Z', { fill: '#3a2a1e', stroke: '#1a120c', 'stroke-width': 1.2 }) + path('M-104,-10 L104,-10', { stroke: '#6a4c32', 'stroke-width': 3 }) + path('M-80,8 Q0,16 80,8', { fill: 'none', stroke: '#2a1e14', 'stroke-width': 1 }));
ep.panel(1000, { cam: { x: 715, y: 636, w: 640 }, bg: LAKE({ boats: [] }), actors: [...BOATHAR], fg: boatFg },
  [cap('Neville had his toad back. (A Ravenclaw prefect had jabbed her wand at him without even looking up from her book, and he\'d wandered off in a daze, straight to it.)', 44, 34, { w: 480, size: 25 }),
   say('Hermione', 'It\'s bewitched so it can\'t be reached except by the lake! I read it in *Hogwarts: A History!*', 500, 355, { w: 400, size: 27 })], { mood: 'night', alt: 'In a small boat: Neville, dazed, clutching his toad; Harry, awestruck; Hermione, lecturing happily.' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: LAKE({ boats: [] }), blur: 2, actors: [...BOATHAR], fg: boatFg },
  [say('Harry', 'And the Sorting? Is it a test? Nobody will tell me what the test *is.*', 400, 100, { w: 440 })], { mood: 'night' });
ep.panel(760, { cam: { on: ['hermione'], fr: 'bust' }, bg: LAKE({ boats: [] }), blur: 2, actors: [...BOATHAR], fg: boatFg },
  [say('Hermione', 'It\'s a *Hat.* An eight-hundred-year-old artefact of forgotten magic. You put it on and it looks inside your mind and tells you where you belong!', 400, 110, { w: 590, size: 28 }),
   inner('Harry', '*A telepathic hat. Of course. Why not.*', 400, 640, { w: 560 })], { mood: 'night' });

// =============================================================== the Great Hall
// the Hall seen through its own great doorway: the reader steps in with the first-years
const hallDoor = (e) => { const w = e.w, h = e.h, L = w * 0.09, R = w * 0.91, s = h * 0.46, t = h * 0.14; const arch = `M${L},${h + 10} L${L},${s} Q${L},${t + (s - t) * 0.22} ${w / 2},${t} Q${R},${t + (s - t) * 0.22} ${R},${s} L${R},${h + 10}`; return `<defs><clipPath id="ghd"><path clip-rule="evenodd" d="M-10,-10 L${w + 10},-10 L${w + 10},${h + 10} L-10,${h + 10}Z ${arch}Z"/></clipPath></defs>` + g({ 'clip-path': 'url(#ghd)' }, K.stoneWall(-10, -10, w + 20, h + 20, C.stone, 23, { bh: 58, minW: 80, maxW: 150 }), rect(-10, -10, w + 20, h + 20, { fill: '#140c08', opacity: 0.5 })) + path(arch, { fill: 'none', stroke: '#1a120c', 'stroke-width': 26, opacity: 0.55 }) + path(arch, { fill: 'none', stroke: '#2b2226', 'stroke-width': 7 }); };
ep.bleed(1400, { cam: { x: 800, y: 540, w: 1400 }, bg: () => HG.greatHallWide(), over: hallDoor },
  [capC('The Great Hall.', 400, 80, { w: 260 }),
   capC('Thousands of candles floated in mid-air. The ceiling wasn\'t there at all. There was only the night sky, full of stars.', 400, 1290, { w: 540 })], { mood: 'candle', fadeTop: false, alt: 'The Great Hall, seen through its great stone doorway: four long house tables packed with students running toward a high table on a dais; thousands of candles floating in the air; the ceiling bewitched into a starry night sky; house banners on the walls.' });
const FY = (o = {}) => [{ def: student(1201, 'n'), id: 's1', x: 380, y: 1080, s: 1.05, turn: 0.6, expr: 'awe' }, { def: student(1202, 'n'), id: 's2', x: 1360, y: 1080, s: 1.05, turn: -0.5, expr: 'worried' }, { def: harryRobes, id: 'harry', x: 700, y: 1080, s: 1.1, turn: 0.2, expr: 'awe', ...o.h }, { def: hermione, id: 'hermione', x: 900, y: 1080, s: 1.1, turn: -0.2, expr: 'delight', ...o.he }, { def: neville, id: 'neville', x: 1100, y: 1080, s: 1.05, turn: -0.3, expr: 'worried', ...o.n }];
ep.panel(700, { cam: { x: 870, y: 790, w: 700 }, bg: () => HG.hallTable('g'), actors: FY({}) },
  [say('Hermione', 'It\'s bewitched to look like the sky outside!', 560, 110, { w: 320 }), inner('Harry', '*Of course it is.*', 150, 640, { w: 280 })], { mood: 'candle' });
// the Hat's song
const DAIS = () => HG.dais();
const HAT = (mood = 'talk', x = 1000) => (e) => HG.stool(x, 900) + g({ transform: `translate(${x},${770})` }, HG.sortingHat(0.9, { mood }));
// no frame: the Hat sings straight out onto the page, lit by the Hall's candles
ep.cutout(790, { cam: { x: 1130, y: 620, w: 700 }, actors: [() => ellipse(1000, 904, 150, 16, { fill: '#000', opacity: 0.35, filter: 'url(#blur3)' }), HAT('amused')], behind: (e) => K.glow(e.w * 0.36, e.h * 0.52, 380, '#f3c878', 0.5), over: (e) => FX.sparkles([[e.w * 0.08, e.h * 0.34, 14], [e.w * 0.6, e.h * 0.28, 12], [e.w * 0.52, e.h * 0.8, 10]], { col: '#fff3b0' }) },
  [cap('On a stool on the dais sat a patched and frayed old wizard\'s hat. Then a rip near its brim opened wide like a mouth, and it began to sing.', 44, 34, { w: 540, size: 26 }),
   hat('♪ *Oh, I\'m the Sorting Hat and I\'m okay, I sleep all year and I work one day…* ♪', 578, 450, { w: 330, tail: [330, 545] })], { alt: 'The Sorting Hat on its stool, standing on the page itself with no frame, singing through the rip in its brim.' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: () => HG.hallTable('g'), blur: 3, actors: FY({}) },
  [inner('Harry', 'Was the Hat *conscious?* In the sense of being aware of its own awareness? And if so, was it satisfied with only getting to talk to eleven-year-olds once a year?', 400, 100, { w: 600, size: 27 })], { mood: 'candle' });

// the Sorting begins (fast)
const MCG = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 600, y: 900, turn: 0.3, pose: 'holdOne', expr: 'stern', armF: { sh: 40, el: 60, hand: 'hold', under: g({ transform: 'translate(0,34)' }, rect(-20, -40, 40, 80, { fill: '#efe3c4', stroke: C.ink, 'stroke-width': 2 })) }, ...o });
ep.panel(700, { cam: { x: 820, y: 600, w: 780 }, bg: DAIS, actors: [MCG(), HAT('sleep')] },
  [shout('McGonagall', '"Abbott, Hannah!"', 430, 110, { w: 300, size: 30 })], { mood: 'candle' });
const verdict = (house, col, txt) => (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: col }) + FX.burst(ctx.w, ctx.h, ctx.w / 2, ctx.h / 2, { col: '#fff', op: 0.18 }) + FX.sfxText(ctx.w / 2, ctx.h * 0.62, txt, { size: Math.min(64, ctx.w / (txt.length * 0.9)), fill: '#f6e7c4', font: 'IM Fell English SC', weight: 400, sw: 5 });
// the Sorting speeds up: the verdicts zigzag down the page on diagonal seams
ep.multi(602, [
  { x: M, y: 18, w: 752, h: 200, shape: 'cut', cutBottom: 40, art: verdict('h', '#8a6a1a', 'HUFFLEPUFF!') },
  { x: M, y: 196, w: 752, h: 210, shape: 'cut', cutTop: 40, cutBottom: -40, art: verdict('h', '#8a6a1a', 'HUFFLEPUFF!') },
  { x: M, y: 384, w: 752, h: 200, shape: 'cut', cutTop: -40, art: verdict('r', '#243a6a', 'RAVENCLAW!') },
], [note('Abbott, Hannah', 400, 52, { size: 28, color: '#f6e7c4' }), note('Bones, Susan', 400, 254, { size: 28, color: '#f6e7c4' }), note('Boot, Terry', 400, 440, { size: 28, color: '#f6e7c4' })], { alt: 'Abbott, Hannah: HUFFLEPUFF! Bones, Susan: HUFFLEPUFF! Boot, Terry: RAVENCLAW!' });

// staff, Flitwick & Lithuania
const STAFF = () => HG.staffWall();
// Snape's goblet drawn under his fist, so the fist grips its stem; counter-rotated to stand upright
const SNAPEF = (sh, el, crushed = 0) => ({ sh, el, hand: 'fist', under: g({ transform: `rotate(${sh + el})` }, (crushed ? HG.goblet(12, -20, 1.4, 1) : HG.goblet(8, -4, 1.2))) });
const staff = (o = {}) => [
  { def: trelawney, id: 'trelawney', x: 60, y: 900, turn: 0.3, pose: 'stand', armB: { sh: 15, el: 160, hand: 'splay', front: true }, expr: 'worried' },
  { def: sprout, id: 'sprout', x: 300, y: 900, turn: 0.3, pose: 'relaxed', expr: 'stern' },
  { def: { ...snape, outfit: { ...snape.outfit, handOut: 0.6 } }, id: 'snape', x: 560, y: 900, turn: 0.2, pose: 'holdOne', expr: 'menace', armF: SNAPEF(40, 90, o.crushed) },
  { def: dumbledore, id: 'dumbledore', x: 860, y: 900, turn: 0, pose: 'hold', armF: { sh: 0, el: 150, hand: 'palm' }, armB: { sh: 0, el: -150, hand: 'palm', front: true }, expr: { base: 'warm', eyes: { sparkle: true } } },
  { def: quirrell, id: 'quirrell', x: 1140, y: 900, turn: -0.2, pose: 'slump', expr: 'twitch' },
  { def: flitwick, id: 'flitwick', x: 1360, y: 760, turn: -0.3, pose: 'raiseHand', expr: 'delight' },
  { def: hagrid, id: 'hagrid', x: 1700, y: 900, s: 0.85, turn: -0.3, pose: 'stand', armF: { sh: 0, el: 150, hand: 'palm' }, armB: { sh: 0, el: -150, hand: 'palm', front: true }, expr: 'bigGrin' },
];
ep.bleed(900, { cam: { x: 700, y: 330, w: 900 }, bg: STAFF, actors: [...staff(), () => HG.staffTable()] },
  [cap('At the High Table: a wizened ancient with a silver-white beard, in a great golden chair, applauding every student as if freshly delighted by each. To his left, a man with sharp eyes and a dour face, who applauded no-one. And who somehow looked straight back at Harry every time Harry looked at him.', 44, 34, { w: 520, size: 25 })], { mood: 'candle', alt: 'The staff at the High Table: Sprout, Snape with a silver goblet, a beaming Dumbledore, and the twitching Quirrell.' });
ep.panel(760, { cam: { on: ['quirrell'], fr: 'close', dy: -0.35 }, bg: STAFF, blur: 2, actors: [...staff(), () => HG.staffTable()], over: (e) => FX.doom(e.w, e.h, 8) },
  [cap('And further along, the pale man from the Leaky Cauldron. His eyes darted around in panic, and he twitched in his seat. For some reason, Harry kept finding himself staring at him.', 44, 34, { w: 580, size: 25 }),
   note('mmmmmmmm', 680, 560, { size: 32, color: '#c07a8a' })], { mood: 'candle', alt: 'Quirrell, twitching. The same wrong hum as before.' });
const RP = (o = {}) => ({ def: clearwater, id: 'clearwater', x: 1150, y: 1080, turn: -0.4, pose: 'relaxed', expr: 'calm', ...o });
ep.panel(780, { cam: { on: ['harry', 'clearwater'], fr: 'bust', dy: -0.6 }, bg: () => HG.hallTable('r'), actors: [...FY({ he: { expr: { base: 'focus', eyes: { lookX: 1 } } } }).slice(2, 4), RP()] },
  [whisper('Harry', 'Is the man standing on his chair the Head of Ravenclaw?', 250, 100, { w: 300 }),
   whisper('Clearwater', 'That is Professor Filius Flitwick. The most knowledgeable Charms Master alive, and a past Duelling Champion. He does have goblin ancestry…', 470, 620, { w: 510, size: 25, tail: [600, 445] })], { mood: 'candle' });
ep.panel(700, { cam: { on: ['harry'], fr: 'bust' }, bg: () => HG.hallTable('r'), blur: 2, actors: FY({}).slice(2, 3) },
  [whisper('Harry', 'What? How is that *possible?* You can\'t mix two different species and get viable offspring! Where did goblins *come* from, anyway?', 400, 110, { w: 520 })], { mood: 'candle' });
ep.panel(800, { cam: { on: ['hermione'], fr: 'close', dy: 0.1 }, bg: () => HG.hallTable('r'), blur: 3, actors: FY({ he: { expr: { base: 'focus', eyes: { lookX: 1, lookY: -0.3 } } } }).slice(3, 4) },
  [whisper('Hermione', 'Lithuania.', 400, 90, { w: 180 }), cap('…Hermione whispered absently, her eyes still fixed firmly on the Sorting Hat. Now *she* was getting a smile from the prefect.', 44, 620, { w: 560, size: 25 })], { mood: 'candle' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close', dy: -0.1, zoom: 0.8 }, bg: () => HG.hallTable('r'), blur: 3, actors: FY({ h: { expr: 'deadpan' } }).slice(2, 3) }, [whisper('Harry', 'Never mind.', 400, 80, { w: 180 })], { mood: 'candle' });

// Hermione
// no frame: Hermione bounces right up off the page
ep.cutout(760, { cam: { head: 'hermione', hw: 0.2, hx: 0.36, hy: 0.42 }, ground: false, behind: (e) => K.glow(e.w * 0.36, e.h * 0.6, 360, '#f3c878', 0.5), actors: [() => ellipse(900, 1086, 150, 24, { fill: '#f3c878', opacity: 0.22, filter: 'url(#blur3)' }) + ellipse(900, 1084, 62, 11, { fill: '#000', opacity: 0.5 }) + [-1, 1].map((d) => path(`M${900 + d * 58},${1060} l${d * 16},6 M${900 + d * 62},${1040} l${d * 20},0 M${900 + d * 58},${1020} l${d * 16},-6`, { stroke: '#f1e6cc', 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.75 })).join(''), ...FY({ he: { pose: 'tiptoe', expr: 'delight', y: 1040 } }).slice(3, 4)] },
  [cap('Hermione was bouncing on her tiptoes so hard her feet were actually leaving the ground.', 44, 34, { w: 400 }), shout('McGonagall', '"Granger, Hermione!"', 610, 500, { w: 300, size: 30, tail: [790, 330] })], { alt: 'Hermione, on the page itself with no frame, bouncing so hard on her tiptoes that her feet leave the ground.' });
// she jams the Hat down so hard its tip punches out through the top of the panel; Harry winces beside it
ep.multi(880, [
  { x: M, y: 130, w: 436, h: 732, mood: 'candle', breakout: 'top', art: { cam: { head: 'hermione', hw: 0.3, hx: 0.31, hy: 0.46 }, bg: DAIS, actors: [() => HG.stool(1000, 900), { def: hermione, id: 'hermione', x: 1000, y: 900, s: 1.1, turn: 0.1, pose: 'sit', seat: 125, expr: 'determined' }, HG.hatOn('hermione', 'amused')], over: (e) => FX.speedLines(e.w, e.h, { n: 16, angle: 90 }) } },
  { x: 476, y: 250, w: 300, h: 612, mood: 'candle', art: { cam: { head: 'harry', hw: 0.66, hx: 0.5, hy: 0.5 }, bg: () => HG.hallTable('r'), blur: 3, actors: FY({ h: { expr: 'wince' } }).slice(2, 3) } },
], [cap('She ran full tilt, and jammed the patchy old eight-hundred-year-old artefact of forgotten magic down hard over her head.', 766, 22, { w: 385, size: 26, anchor: 'tr', fixed: true }), cap('Harry winced.', 492, 266, { w: 240, size: 26, fixed: true })], { alt: 'Hermione on the stool, the huge Sorting Hat jammed down over her head, its tip poking up out of the panel. Beside her, Harry winces.' });
ep.panel(460, verdict('r', '#243a6a', 'RAVENCLAW!'), [], { alt: 'RAVENCLAW!' });
ep.panel(820, { cam: { on: ['harry'], fr: 'bust', zoom: 0.9, dy: -0.1 }, bg: () => HG.hallTable('r'), blur: 2, actors: FY({ h: { expr: 'unimpressed', pose: 'crossArms' } }).slice(2, 3) },
  [inner('Harry', 'Talk about your foregone conclusions. In what weird alternative universe would that girl *not* be sorted into Ravenclaw?', 400, 110, { w: 540 }),
   inner('Harry', 'Harry knew pi to 3.141592, because that\'s accurate enough for most purposes. Hermione knew a hundred digits, because that\'s how many were printed in the back of her maths book.', 400, 700, { w: 560, size: 26 })], { mood: 'candle' });
ep.multi(460, [
  { x: M, y: 18, w: 368, h: 424, art: verdict('h', '#8a6a1a', 'HUFFLEPUFF!') },
  { x: 408, y: 18, w: 368, h: 424, art: verdict('s', '#1f4a35', 'SLYTHERIN!') },
], [note('Longbottom, Neville', 200, 60, { size: 28, color: '#f6e7c4' }), note('Malfoy, Draco', 590, 60, { size: 28, color: '#f6e7c4' })], { alt: 'Longbottom, Neville: HUFFLEPUFF! Malfoy, Draco: SLYTHERIN!' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: () => HG.hallTable('r'), blur: 2, actors: FY({ h: { expr: 'smile' } }).slice(2, 3) },
  [inner('Harry', 'Neville in Hufflepuff. Good. A Houseful of reliable friends would do him a whole world of good.', 400, 100, { w: 600 }),
   inner('Harry', 'Clever kids in Ravenclaw, evil kids in Slytherin, wannabe heroes in Gryffindor, and everyone who does the actual work in Hufflepuff.', 400, 580, { w: 560, size: 27 })], { mood: 'candle' });
ep.beat(300, [capC('And Draco to Slytherin, as planned. You never did know what tiny event might upset the course of your master plan.', 400, 150, { w: 580, color: '#e8dcc2', bg: '#1a120a' })]);

// "Potter, Harry!"
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: DAIS, blur: 1, actors: [MCG({ expr: { base: 'stern', eyes: { open: 0.95 } } })] },
  [cap('With a note of trepidation so firmly kept from her voice and face that you\'d have needed to know her very well indeed to notice, Minerva McGonagall inhaled deeply.', 44, 34, { w: 600, size: 26 }),
   shout('McGonagall', '"Potter, Harry!"', 190, 670, { w: 280, size: 34 })], { mood: 'candle' });
ep.bleed(640, { cam: { x: 800, y: 780, w: 880 }, bg: () => HG.hallTable('s'), actors: [...[1211, 1212, 1213, 1214, 1215, 1216, 1217].map((sd, i) => ({ def: student(sd, ['g', 'r', 'h', 's'][i % 4]), id: 't' + i, x: 150 + i * 220, y: 1050, s: 1.05, turn: i < 3 ? 0.4 : -0.4, expr: { base: 'awe', eyes: { sparkle: false, lookX: i < 3 ? 1 : -1 } } })), () => HG.tableFront()] },
  [capC('All conversation stopped. All eyes turned to stare.', 400, 90, { w: 480 })], { mood: 'candle', alt: 'Every student in the Hall turns to stare.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: () => HG.hallTable('r'), blur: 3, actors: FY({ h: { expr: { base: 'worried', sweat: true } } }).slice(2, 3) },
  [inner('Harry', 'For the first time in his entire life, Harry felt like he might be having an opportunity to experience stage fright.', 400, 110, { w: 540 })], { mood: 'candle' });
// the twins leap up so hard their arms punch out through the top of the panel
ep.panel(900, { cam: { head: 'fred', hw: 0.2, hx: 0.31, hy: 0.1 }, bg: () => HG.hallTable('g'), actors: [{ def: fred, id: 'fred', x: 900, y: 1050, turn: 0.3, pose: 'armsUp', armF: { sh: -166, el: -6, hand: 'splay' }, armB: { sh: 162, el: 10, hand: 'splay' }, expr: 'laugh' }, { def: george, id: 'george', x: 1150, y: 1050, turn: -0.3, pose: 'armsUp', armF: { sh: -162, el: -10, hand: 'splay' }, armB: { sh: 166, el: 6, hand: 'splay' }, expr: 'laugh' }, ...[1221, 1222, 1223].map((sd, i) => ({ def: student(sd, 'g'), x: 500 + i * 450 + (i > 0 ? 600 : 0), y: 1060, s: 1.05, turn: 0.2, pose: 'raiseHand', expr: 'bigGrin' })), () => HG.tableFront()] },
  [shout('Fred', '*HARRY POTTER!*', 262, 76, { w: 320, size: 34 }), shout('George', '*HARRY POTTER!*', 540, 196, { w: 320, size: 34 })], { mood: 'candle', breakout: 'top', ph: 562, panel: { y: 320 }, alt: 'At the Gryffindor table, the Weasley twins leap up and start chanting, their arms flung up out of the top of the panel.' });
ep.bleed(1100, { cam: { x: 800, y: 640, w: 1500 }, bg: () => HG.greatHallWide() },
  [shout('hall', 'HARRY POTTER! HARRY POTTER! HARRY POTTER!', 400, 520, { w: 600, size: 52, noTail: true })], { mood: 'candle', fadeTop: false, alt: 'The whole Hall chants his name.' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'full', zoom: 0.8, dy: -0.9 }, bg: () => HG.greatHallWide(), blur: 2, actors: [{ def: harryRobes, id: 'harry', x: 800, y: 1150, s: 1.3, turn: 0.1, pose: 'walk', expr: 'grin' }] },
  [cap('And Harry Potter walked forwards. Much too slowly, he realised once he\'d begun, but by then it was too late to change pace without looking awkward. So he put on a wide grin, bowed to one side and then the other, and walked on at a grandly measured pace, like a prince inheriting his castle.', 44, 34, { w: 580, size: 25 })], { mood: 'candle' });
// head table reactions
ep.multi(1000, [
  { x: M, y: 18, w: 240, h: 280, mood: 'candle', art: { cam: { on: ['trelawney'], fr: 'close' }, bg: STAFF, blur: 3, actors: [...staff()] } },
  { x: 280, y: 18, w: 240, h: 280, mood: 'candle', art: { cam: { on: ['hagrid'], fr: 'close' }, bg: STAFF, blur: 3, actors: [...staff()] } },
  { x: 536, y: 18, w: 240, h: 280, mood: 'candle', art: { cam: { on: ['quirrell'], fr: 'close' }, bg: STAFF, blur: 3, actors: [...staff()] } },
  { x: M, y: 312, w: 368, h: 280, mood: 'candle', art: { cam: { on: ['dumbledore'], fr: 'close' }, bg: STAFF, blur: 3, actors: [...staff()] } },
  { x: 408, y: 312, w: 368, h: 280, mood: 'candle', art: { cam: { on: ['flitwick'], fr: 'close' }, bg: STAFF, blur: 3, actors: [...staff()] } },
  { x: M, y: 606, w: 752, h: 376, mood: 'candle', art: { cam: { on: ['snape'], fr: 'bust', dx: 1.2 }, bg: STAFF, blur: 2, actors: [...staff().filter((a) => a.id !== 'dumbledore' && a.id !== 'quirrell'), () => HG.staffTable()] } },
], [note('fanning herself', 145, 270, { size: 24, color: '#f6e7c4' }), note('clapping along', 400, 270, { size: 24, color: '#f6e7c4' }), note('…vacant', 655, 270, { size: 24, color: '#f6e7c4' }), note('beaming', 110, 345, { size: 26, color: '#f6e7c4' }), note('curious', 490, 345, { size: 26, color: '#f6e7c4' }),
    cap('And Severus Snape, gripping his wine goblet so hard that the silver was slowly deforming.', 430, 700, { w: 300, size: 24 })], { alt: 'Head table reactions: Trelawney fanning herself, Hagrid clapping along, Quirrell gazing at nothing, Dumbledore beaming, Flitwick curious, and Snape gripping his silver goblet until it bends.' });
ep.panel(760, { cam: { x: 1100, y: 640, w: 760 }, bg: () => HG.hallTable('g'), actors: [{ def: fred, id: 'fred', x: 950, y: 1050, turn: 0.3, pose: 'gesture2', expr: 'bigGrin' }, { def: george, id: 'george', x: 1260, y: 1050, turn: -0.3, pose: 'fists', expr: 'laugh' }, () => HG.tableFront()] },
  [shout('Fred', 'Save us from some more Dark Lords!', 290, 95, { w: 280, size: 28 }), shout('George', 'Especially if they\'re *Professors!*', 530, 250, { w: 300, size: 28 })], { mood: 'candle' });
ep.panel(1000, { cam: { on: ['snape'], fr: 'bust', dy: -0.1, zoom: 0.9 }, bg: STAFF, blur: 3, actors: [...staff({ crushed: 1 }).filter((a) => a.id !== 'dumbledore' && a.id !== 'quirrell').map((a) => a.id === 'snape' ? { ...a, expr: { base: 'smile', eyes: { open: 0.6 } }, pose: 'hold', armF: SNAPEF(22, 95, 1), armB: { sh: 8, el: 40, hand: 'fist' } } : a)] },
  [cap('Severus Snape\'s face had gone beyond rage into a kind of pleasant indifference. A faint smile played about his lips.', 44, 34, { w: 520 }),
   cap('He was looking at Harry Potter, not the Gryffindor table. And his hands held the crumpled remains of a former wine goblet.', 44, 850, { w: 600 })], { mood: 'candle', alt: 'Snape, faintly smiling, looking straight at Harry, a crushed silver goblet in his hands.' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DAIS, blur: 3, actors: [MCG({ expr: 'horror', turn: -0.3 })] }, [cap('(Surely he realised the Potter boy had no idea who that was about…)', 44, 30, { w: 440 })], { mood: 'candle' });
// Harry's resolve
ep.panel(1100, { cam: { on: ['harry'], fr: 'bust' }, bg: () => HG.greatHallWide(), blur: 3, actors: [{ def: harryRobes, id: 'harry', x: 800, y: 1150, s: 1.3, turn: 0.1, pose: 'walk', expr: { base: 'smile', eyes: { teary: true } } }] },
  [inner('Harry', 'They were cheering him for a job he\'d done when he was one year old. A job he hadn\'t really finished. Somewhere, somehow, the Dark Lord was still alive. Would they cheer so hard if they knew?', 400, 120, { w: 560, size: 27 }),
   inner('Harry', 'He couldn\'t stand to let it be false. To flash and fade like so many child prodigies. To be a disappointment.', 400, 650, { w: 620, fixed: true }),
   inner('Harry', 'He would fulfil their expectations. And then exceed them, so that people wondered, looking back, that they had once asked so little of him.', 400, 830, { w: 560, size: 27 })], { mood: 'candle' });
ep.panel(800, { cam: { x: 935, y: 530, w: 940 }, bg: DAIS, actors: [MCG({ x: 560 }), HAT('sleep'), { def: harryRobes, id: 'harry', x: 1300, y: 900, s: 1.1, turn: -0.2, pose: 'bowGrand', expr: 'bigGrin' }] },
  [cap('He swept a bow to the Order of Chaos at the Gryffindor table, and another to the rest of the Hall, and waited for the applause and giggling to die away.', 44, 34, { w: 460, size: 26 })], { mood: 'candle' });
ep.panel(820, { cam: { x: 1000, y: 450, w: 760 }, bg: DAIS, actors: [() => HG.stool(1000, 900), { def: harryRobes, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0.1, pose: 'sit', seat: 125, expr: 'determined' }, HG.hatOn('harry', 'sleep')] },
  [cap('Then he sat on the stool, and *carefully* placed the eight-hundred-year-old telepathic artefact onto his head.', 44, 34, { w: 460 })], { mood: 'candle' });
ep.bleed(680, (ctx) => HG.mindscape(ctx.w, ctx.h, 'warm', 3),
  [inner('Harry', '*Don\'t Sort me yet! I have questions! Have I ever been Obliviated? Did you Sort the Dark Lord when he was a child? Can you tell me his weaknesses? Why did I get the brother wand to his?*', 400, 140, { w: 580, size: 27 }),
   inner('Harry', '*Is the Dark Lord\'s ghost bound to my scar, and is that why I get so angry sometimes? And if you\'ve got a moment, how do I rediscover the lost magics that created you?*', 400, 450, { w: 580, size: 27 })], { alt: 'Inside Harry\'s head: an endless candlelit library, and his questions tumbling out.' });
ep.panel(460, (ctx) => HG.mindscape(ctx.w, ctx.h, 'void', 4), [capC('Into the silence of Harry\'s spirit, where before there had never been any voice but one, there came a second voice.', 400, 220, { w: 560, bg: 'rgba(20,12,8,0.8)', color: '#efe4cc' })], { border: 'none' });
ep.bleed(1000, (ctx) => HG.mindscape(ctx.w, ctx.h, 'void', 5) + g({ transform: `translate(${ctx.w / 2},${ctx.h * 0.9}) scale(1.85)` }, HG.sortingHat(1, { mood: 'worried' })),
  [hat('*Oh, dear.*', 200, 90, { w: 260, size: 40 }), hat('*This has never happened before…*', 400, 400, { w: 380, size: 34 })], { alt: 'In the dark of Harry\'s mind, a gigantic, patched, worried Sorting Hat looms.' });
ep.setBg(C.paper);
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: NIGHT, bottom: C.paper } });
ep.end();
export default ep;
