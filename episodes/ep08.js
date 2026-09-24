// EPISODE 8 — Reciprocation  (source: HPMOR ch. 7, first half; bookshop raid ADDED from summary)
import { Episode, say, shout, whisper, inner, cap, capC, note, title, plain, M } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng, uid } from '../engine/core/svg.js';
import * as O from '../engine/bg/oxford.js';
import * as L from '../engine/bg/london.js';
import * as S from '../engine/bg/station.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harry, harryRobes, dad, mum, draco, molly, fred, george, ron, ginny, stallMan, makeExtra } from '../engine/chars/cast.js';
import { owl, comedCan, spray } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep08', number: 8, title: 'Reciprocation' });
ep.setBg(C.paper);
ep.beat(260, [plain('CHAPTER EIGHT', 400, 90, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('Reciprocation', 400, 170, { size: 54 })]);
// Harry's pencil notes: Caveat on cream paper
const T = FX.scrawl;
const OWL = (x, y, k = 0.5) => (e) => g({ transform: `translate(${x},${y}) scale(${k})` }, owl({ col: '#e8e0d0' }));

// =============================================================== the great second-hand bookshop raid (ADDED)
const shop = (seed) => () => rect(-500, -500, 3000, 3000, { fill: '#6b4a3a' }) + K.bookcase(-100, 120, 400, 820, 'r' + seed) + K.bookcase(320, 120, 400, 820, 's' + seed) + K.bookcase(740, 120, 400, 820, 't' + seed) + K.bookcase(1160, 120, 400, 820, 'u' + seed) + rect(-500, 940, 3000, 600, { fill: '#5a3a22' }) + K.bookPile(300, 940, 8, seed) + K.bookPile(1100, 940, 6, seed + 1);
const DR = (o = {}) => ({ def: dad, id: 'dad', x: 900, y: 1060, turn: 0.4, pose: 'hold', expr: 'delight', ...o });
const HR = (o = {}) => ({ def: harry, id: 'harry', x: 650, y: 1060, s: 1.1, turn: 0.4, pose: 'hold', expr: 'bigGrin', ...o });
// arms full of books, a pile gripped in the near hand
const armful = (seed, dx, k) => ({ armF: { sh: 30, el: 70, hand: 'hold', under: g({ transform: `rotate(90) translate(${dx},12)` }, K.bookPile(0, 0, 6, seed, k)) }, armB: { sh: 15, el: -80, hand: 'hold' } });
const DBOOKS = armful(3, -22, 0.8), HBOOKS = armful(5, -20, 0.7);
const HOME = () => O.livingRoom({ letter: false });
ep.panel(900, { cam: { on: ['harry', 'dad'], fr: 'waist', dy: -1.3 }, bg: HOME, actors: [DR({ pose: 'lecture', expr: 'determined' }), HR({ pose: 'present', expr: 'hopeful' })] },
  [cap('Two days before term. Harry explained that this might be his big chance to do something really revolutionary.', 44, 34, { w: 460 }),
   say('Dad', 'Then we\'d better get you some books.', 560, 280, { w: 340 })], { mood: 'warm', alt: 'At home: Harry explains; Dad decides.' });
ep.beat(220, [capC('The Greatest Second-hand Bookshop Raid Ever: four cities, two days.', 400, 110, { w: 560 })]);
// the raid montage: four shops on a tilted cross of seams (the rush of four cities in two days)
const quad = (pts) => { const xs = pts.map((q) => q[0]), ys = pts.map((q) => q[1]), x = Math.min(...xs), y = Math.min(...ys), w = Math.max(...xs) - x, h = Math.max(...ys) - y; return { x, y, w, h, shape: 'poly', pts: pts.map(([a, b]) => [(a - x) / w, (b - y) / h]) }; };
ep.multi(820, [
  { ...quad([[M, 18], [405, 18], [393, 403], [M, 418]]), mood: 'warm', art: { cam: { on: ['harry', 'dad'], fr: 'waist', zoom: 0.8, dy: 0.1 }, bg: shop(1), actors: [DR(DBOOKS), HR(HBOOKS)] } },
  { ...quad([[419, 18], [776, 18], [776, 388], [407, 403]]), mood: 'warm', art: { cam: { on: ['harry', 'dad'], fr: 'waist', zoom: 0.8, dy: 0.1 }, bg: shop(2), actors: [DR({ expr: 'focus', pose: 'think' }), HR({ expr: 'awe', ...HBOOKS })] } },
  { ...quad([[M, 432], [393, 417], [381, 802], [M, 802]]), mood: 'warm', art: { cam: { on: ['harry', 'dad'], fr: 'waist', zoom: 0.8, dy: 0.1 }, bg: shop(3), actors: [DR({ expr: 'laugh', ...DBOOKS }), HR({ expr: 'laugh', pose: 'armsUp' })] } },
  { ...quad([[407, 417], [776, 402], [776, 802], [395, 802]]), mood: 'rainy', art: { cam: { x: 800, y: 700, w: 1400 }, bg: () => O.houseExterior(), actors: [(e) => g({}, ...[0, 1, 2, 3, 4].map((i) => rect(560 + (i % 3) * 110, 980 - Math.floor(i / 3) * 90, 100, 86, { fill: '#b9955e', stroke: C.ink, 'stroke-width': 3 })))] } },
], [cap('Oxford', 36, 30, { w: 200, fixed: true }), cap('Cambridge', 430, 30, { w: 200, fixed: true }), cap('London', 36, 446, { w: 200, fixed: true }), cap('Bath', 424, 434, { w: 200, fixed: true })], { alt: 'Montage: Harry and Dad in four dusty bookshops, arms full of books, laughing; then boxes of books stacked outside the house in the rain.' });
ep.panel(890, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#3a2618' }) + K.glow(w / 2, h * 0.2, 500, C.candle, 0.4);
  const R = rng(4);
  for (let r = 0; r < 4; r++) for (let k = 0; k < 5; k++) { const x = 48 + k * 144, y = h - 40 - r * 136, bw = 132; out += rect(x, y - 124, bw, 124, { fill: R.pick(['#b9955e', '#c9a56e', '#a9854e']), stroke: C.ink, 'stroke-width': 3 }) + text(x + bw / 2, y - 54, R.pick(['PHYSICS', 'CHEM.', 'MATHS', 'SCI-FI', 'BIOLOGY', 'HISTORY', 'ECON.']), { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': 26, 'text-anchor': 'middle', fill: '#3a2618' }); }
  return out;
}, [cap('Thirty boxes of science books, now sitting in the cavern level of Harry\'s trunk. His father had tried to hide the till displays, but Harry figured he must have spent at least a thousand pounds.', 44, 30, { w: 600, size: 26 })],
  { alt: 'The cavern under the trunk, stacked with thirty cardboard boxes labelled PHYSICS, MATHS, SCI-FI…' });
ep.panel(620, { cam: { on: ['harry', 'dad'], fr: 'bust' }, bg: HOME, actors: [DR({ expr: 'smile', pose: 'stand' }), HR({ expr: 'hopeful', pose: 'stand' })] },
  [say('Harry', 'I\'ll pay you back as soon as I figure out how to convert wizarding gold into Muggle money.', 250, 100, { w: 340 }),
   say('Dad', 'Go boil your head.', 580, 520, { w: 220 })], { mood: 'warm' });

// =============================================================== King's Cross
const KX = () => S.kingsCross();
const P9 = () => S.platform934();
const HK = (o = {}) => ({ def: harry, id: 'harry', x: 1000, y: 1080, s: 1.1, turn: -0.3, pose: 'stand', mask: 'sweatband', ...o });
const MK = (o = {}) => ({ def: mum, id: 'mum', x: 780, y: 1090, turn: 0.4, pose: 'hold', expr: 'teary', ...o });
const DK = (o = {}) => ({ def: dad, id: 'dad', x: 1260, y: 1090, turn: -0.4, pose: 'stand', expr: 'calm', ...o });
ep.panel(740, { cam: { x: 1030, y: 670, w: 1250 }, bg: KX, actors: [...[901, 902, 903, 904].map((sd, i) => ({ def: makeExtra(sd, { muggle: true }), x: [470, 1560, 1760, 250][i], y: 1150 + (i % 2) * 40, turn: i % 2 ? -0.6 : 0.6, pose: i % 2 ? 'walk' : 'walk2' })), MK(), HK(), DK(), S.picnicTable(-1000, 0), L.trunk(1130, 1100, 0.35, '#7a4e2e', true)] },
  [cap('King\'s Cross Station. The first of September. Platform Nine.', 44, 34, { w: 420 })], { mood: 'day', alt: 'King\'s Cross: iron arches, a glass roof, crowds. Harry with Mum and Dad on Platform Nine, his dragon-carved trunk at his heels.' });
ep.panel(720, { cam: { on: ['mum'], fr: 'bust' }, bg: KX, blur: 2, actors: [MK({ expr: 'pleading', turn: 0.3 })] },
  [say('Mum', 'Are you sure you don\'t want me to come with you, Harry?', 300, 125, { w: 420, fixed: true })], { mood: 'day' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: KX, blur: 2, actors: [HK({ expr: 'warm', turn: -0.4 })] },
  [say('Harry', 'Mum, I know you don\'t like the wizarding world very much. You don\'t have to come. I mean it.', 400, 125, { w: 480, fixed: true }),
   whisper('Harry', 'Besides, they all love me over there. If I have any problems, I just take off my sweatband, and I\'ll have *way* more help than I can handle.', 400, 830, { w: 520, size: 26, fixed: true })], { mood: 'day' });
ep.cutout(900, { cam: { on: ['mum', 'harry'], fr: 'bust', padX: 1.2, dy: -0.28 }, bg: KX, ground: false, over: FX.fadeOut(0.6, 0.9), actors: [MK({ x: 900, pose: 'kneel', expr: 'cry', turn: 0.5, armF: { sh: 40, el: 40, hand: 'open' }, armB: { sh: 65, el: 45, hand: 'open' } }), HK({ x: 1060, expr: 'teary', pose: 'stand', turn: -0.5 })] },
  [whisper('Mum', 'Oh, Harry. I do love you. Always remember that.', 280, 170, { w: 360, fixed: true }),
   inner('Harry', '*It\'s like she\'s afraid she\'ll never see me again.*', 400, 800, { w: 560 })], { mood: 'day', alt: 'Mum kneels and hugs Harry hard, crying.' });
ep.panel(1020, { cam: { on: ['harry'], fr: 'close', zoom: 0.8, dy: 0.2 }, bg: KX, blur: 3, actors: [HK({ expr: 'worried', turn: -0.3 })] },
  [say('Harry', 'Mum, you know I\'m not going to turn into your sister just because I\'m learning magic, right?', 400, 135, { w: 540, fixed: true }),
   say('Harry', 'I\'ll do any magic you ask for. Or if you want me *not* to use any magic around the house, I\'ll do that too. I promise I\'ll never let magic come between us—', 400, 830, { w: 520, size: 28, fixed: true })], { mood: 'day' });
ep.panel(620, { cam: { on: ['mum'], fr: 'close' }, bg: KX, blur: 3, actors: [MK({ expr: { base: 'teary', mouth: { type: 'line', curve: 0.5 } }, turn: 0.2, x: 930 })] },
  [whisper('Mum', 'You have a good heart. A very good heart, my son.', 400, 110, { w: 440, size: 30 })], { mood: 'day' });
ep.panel(1000, { cam: { on: ['dad', 'harry'], fr: 'waist', dy: -1.5 }, bg: KX, actors: [HK({ x: 1000, expr: 'hopeful', turn: 0.4 }), DK({ x: 1220, pose: 'stand', expr: 'calm' })] },
  [cap('There was no question of his father coming through to the magical side. Dad had trouble just looking at Harry\'s trunk directly.', 44, 34, { w: 560 }),
   say('Dad', 'Good luck at school, Harry.', 470, 250, { w: 420 }),
   say('Dad', 'Do you think I bought you enough books?', 530, 410, { w: 400 })], { mood: 'day' });
ep.panel(700, { cam: { on: ['harry'], fr: 'close', zoom: 0.9, dy: 0.1 }, bg: KX, blur: 3, actors: [HK({ expr: 'teary', turn: 0.2 })] },
  [cap('It was quite clear what answer Dad wanted to hear.', 44, 30, { w: 410 }),
   say('Harry', 'You can never have enough books.', 400, 610, { w: 400 })], { mood: 'day' });
ep.panel(900, { cam: { on: ['dad', 'harry'], fr: 'bust', padX: 1.2, dy: -0.5 }, bg: KX, blur: 2, actors: [HK({ x: 980, expr: 'cry', pose: 'stand', turn: 0.5 }), DK({ x: 1150, pose: 'kneel', expr: 'warm', turn: -0.5, armF: { sh: 55, el: 25, hand: 'open' }, armB: { sh: 45, el: 35, hand: 'open' } })] },
  [say('Harry', 'But you *certainly* tried. It was a really, really, *really* good try.', 260, 120, { w: 440 })], { mood: 'day', alt: 'Dad kneels and gives Harry a quick, firm hug. Harry\'s eyes are wet.' });

// the barrier
ep.panel(860, { cam: { x: 1190, y: 630, w: 1080 }, bg: KX, actors: [HK({ x: 1020, turn: 0.4, expr: 'suspicious', pose: 'think' }), DK({ x: 800, turn: 0.4 })] },
  [say('Dad', 'So… do *you* see a Platform Nine-and-Three-Quarters?', 260, 100, { w: 440 }),
   cap('There was a Platform Nine and a Platform Ten, and nothing between them but a thin, unpromising barrier wall.', 372, 290, { w: 360 })], { mood: 'day' });
ep.panel(940, { cam: { on: ['harry', 'dad'], fr: 'waist', dy: -1.3 }, bg: KX, actors: [HK({ x: 1020, turn: -0.4, expr: 'yell', pose: 'fists' }), DK({ x: 800, turn: 0.4, pose: 'lecture' })] },
  [say('Dad', 'Hm. Maybe look for a trail of mixed footprints leading somewhere that doesn\'t make sense—', 260, 110, { w: 440 }),
   shout('Harry', '*Dad!* Stop that! I haven\'t even *tried* to figure it out on my own!', 540, 360, { w: 340, size: 28 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: KX, blur: 3, actors: [HK({ expr: 'embarrassed' })] }, [cap('It was a very good suggestion, too, which was worse.', 44, 30, { w: 360 })], { mood: 'day' });
ep.panel(800, { cam: { on: ['mum', 'harry'], fr: 'bust', dy: -0.95 }, bg: KX, actors: [MK({ x: 800, expr: 'confused', pose: 'stand' }), HK({ x: 1020, turn: -0.4, expr: 'smile' })] },
  [say('Mum', 'Are you sure Professor McGonagall didn\'t tell you anything?', 280, 100, { w: 400 }),
   say('Harry', 'Maybe she was distracted.', 580, 290, { w: 300 })], { mood: 'day' });
ep.panel(884, { cam: { head: 'mum', hw: 0.2, hx: 0.28, hy: 0.1 }, bg: KX, blur: 1, actors: [MK({ x: 800, expr: 'yell', pose: 'panic', turn: 0.3, armF: { sh: -152, el: -14, hand: 'splay' }, armB: { sh: 152, el: 14, hand: 'splay' } }), DK({ x: 1050, expr: 'yell', pose: 'point', turn: 0.2 })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { col: '#e0b060', op: 0.5 }) },
  [shout('both', '*Harry!* *What did you do?!*', 400, 116, { w: 380, size: 38, tails: ['mum', 'dad'] })], { mood: 'day', breakout: 'top', ph: 582, panel: { y: 284 } });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.2 }, bg: KX, blur: 2, actors: [HK({ expr: 'flustered', pose: 'panic' })] },
  [say('Harry', 'I, um… about half as bad as the Incident with the Science Project?', 400, 130, { w: 440, fixed: true }),
   shout('Harry', 'Oh look, there are some people with an owl, I\'ll go ask them how to get in!', 400, 860, { w: 520, size: 28, fixed: true })], { mood: 'day' });

// the Weasleys
const WZ = (o = {}) => [
  { def: molly, id: 'molly', x: 1500, y: 1090, turn: -0.4, pose: 'stand', expr: 'warm', ...(o.molly || {}) },
  { def: fred, id: 'fred', x: 1700, y: 1080, turn: -0.4, pose: 'stand', expr: 'grin', ...(o.fred || {}) },
  { def: george, id: 'george', x: 1860, y: 1080, turn: -0.4, pose: 'stand', expr: 'grin', ...(o.george || {}) },
  { def: ron, id: 'ron', x: 1330, y: 1080, s: 1.05, turn: -0.3, pose: 'stand', expr: 'neutral', armF: { sh: 20, el: 30, hand: 'hold' }, ...(o.ron || {}) },
  { def: ginny, id: 'ginny', x: 1600, y: 1080, s: 0.9, turn: -0.3, pose: 'stand', expr: 'shock', ...(o.ginny || {}) },
  OWL(1300, 700, 0.6),
];
ep.panel(860, { cam: { x: 1480, y: 740, w: 1080 }, bg: KX, actors: [...WZ({ molly: { expr: 'shock' }, fred: { expr: 'shock' }, george: { expr: 'shock' }, ron: { expr: 'shock' } }), HK({ x: 1100, turn: 0.5, expr: 'hopeful', pose: 'walk' })] },
  [say('Molly', 'Hello, dear. First time at Hogwarts? Ron\'s new, too—', 320, 104, { w: 420, fixed: true }),
   say('Molly', '*Harry Potter?*', 585, 262, { w: 260, fixed: true }),
   cap('Four boys, a red-headed girl, and an owl all swung round and froze in place.', 44, 730, { w: 560 })], { mood: 'day', alt: 'A family of fiery redheads (a plump mother, identical twin teenage boys, a tall skinny boy, a small girl, and a white owl) all freeze and stare at Harry.' });
ep.cutout(780, { cam: { head: 'harry', hw: 0.3, hx: 0.5, hy: 0.55 }, bg: KX, ground: false, over: FX.fadeOut(0.74, 0.98), actors: [HK({ x: 1100, expr: 'rant', pose: 'shrug', turn: 0.12, armF: { sh: -48, el: -75, hand: 'palm' }, armB: { sh: 48, el: 75, hand: 'palm' } })] },
  [shout('Harry', 'Oh, *come on!* I bought a sweatband and everything!', 400, 138, { w: 440, size: 32, fixed: true })], { mood: 'day' });
ep.panel(700, { cam: { on: ['fred', 'george'], fr: 'bust', dy: -0.4 }, bg: KX, blur: 2, actors: WZ({ fred: { expr: 'smug' }, george: { expr: 'smug' } }).slice(1, 3) },
  [say('Fred', 'Your picture was in the newspapers.', 270, 112, { w: 280, fixed: true })], { mood: 'day' });
ep.panel(1040, { cam: { on: ['dad', 'harry'], fr: 'waist', dy: -1.9 }, bg: KX, actors: [DK({ x: 880, turn: 0.4, expr: 'suspicious', pose: 'walk', armB: { sh: 10, el: 10 } }), HK({ x: 1100, turn: -0.4, expr: 'flustered', pose: 'shrug' })] },
  [say('Dad', 'Yes, how *do* you know who he is?', 205, 112, { w: 330, fixed: true }),
   shout('Harry', '*Dad!* It\'s not like that! It\'s \'cause I defeated the Dark Lord You-Know-Who when I was one year old!', 445, 345, { w: 420, size: 26, fixed: true }),
   say('Dad', '*What?*', 140, 535, { w: 160, fixed: true })], { mood: 'day' });
ep.panel(640, { cam: { on: ['mum'], fr: 'close', zoom: 0.9, dy: 0.1 }, bg: KX, blur: 3, actors: [MK({ x: 700, expr: 'embarrassed', turn: 0.4 })] },
  [say('Mum', 'Ah… Michael dear, there are certain things I thought it best not to bother you with until now—', 400, 125, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(1260, { cam: { on: ['molly', 'harry'], fr: 'waist', dy: -2.6 }, bg: KX, actors: [...WZ().slice(0, 1), HK({ x: 1280, turn: 0.4, expr: 'pleading', pose: 'gesture' })] },
  [say('Harry', 'Excuse me, but it would be\n*extremely* helpful if you could\ntell me how to get to\nPlatform Nine-and-Three-Quarters\n*right now.*', 392, 180, { w: 540, size: 28, fixed: true, tail: [180, 470] }),
   say('Molly', 'Just walk straight at the barrier between platforms nine and ten. Don\'t stop, and don\'t be scared you\'ll crash into it. That\'s very important.', 490, 500, { w: 400, size: 27, fixed: true })], { mood: 'day' });
ep.panel(1040, { cam: { on: ['fred', 'molly'], fr: 'bust', dy: -1.95 }, bg: KX, blur: 2, actors: WZ({ fred: { expr: 'scheme' }, molly: { expr: 'cross' } }).slice(0, 2) },
  [say('Fred', 'And whatever you do, don\'t think of an elephant.', 510, 105, { w: 400, fixed: true, shape: 'box' }),
   say('Molly', '*George!* Ignore him, Harry dear, there\'s no reason not to think of an elephant.', 250, 318, { w: 400, fixed: true }),
   say('Fred', 'I\'m Fred, Mum, not George—', 575, 525, { w: 320, fixed: true })], { mood: 'day' });
ep.panel(960, { cam: { x: 930, y: 880, w: 640 }, bg: KX, actors: [HK({ x: 950, y: 1100, turn: 0.4, pose: 'run', expr: 'determined' }), L.trunk(740, 1110, 0.35, '#7a4e2e', true)], over: (e) => FX.speedLines(e.w, e.h, { n: 40 }) },
  [say('Harry', 'Thanks!', 420, 110, { w: 200 }),
   inner('Harry', 'Wait a minute. It only works *if you believe in it?*', 380, 860, { w: 560 })], { mood: 'day', shape: 'slant', slant: 70 });
// the doubt loop, drawn inside a thought cloud (the narration stays outside it)
ep.panel(920, (ctx) => {
  const w = ctx.w, cx = w / 2, cy = 520;
  const A = (x1, y1, x2, y2) => { const a = Math.atan2(y2 - y1, x2 - x1); return line(x1, y1, x2, y2, { stroke: '#c43a32', 'stroke-width': 4 }) + path(`M${x2},${y2} L${x2 - 16 * Math.cos(a - 0.45)},${y2 - 16 * Math.sin(a - 0.45)} M${x2},${y2} L${x2 - 16 * Math.cos(a + 0.45)},${y2 - 16 * Math.sin(a + 0.45)}`, { stroke: '#c43a32', 'stroke-width': 4, fill: 'none' }); };
  let out = circle(cx, cy, 70, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 3, 'stroke-dasharray': '14 10' }) + T(cx, cy + 14, 'doubt', 44, 'middle', '#c43a32');
  out += T(200, 320, 'I\'ll get through', 42) + T(590, 320, '…if I believe', 42) + T(570, 750, '…but now I\'m worried', 40) + T(200, 750, '…so I don\'t believe', 40);
  out += A(345, 308, 480, 308) + A(590, 350, 590, 700) + A(420, 738, 360, 738) + A(200, 700, 200, 360);
  return rect(0, 0, w, ctx.h, { fill: '#f4ecd6' }) + g({ transform: `translate(${cx},${ctx.h / 2 + 8}) scale(0.8) translate(${-cx},${-cy})` }, out);
},
  [cap('It was at times like this that Harry hated his mind for working fast enough to realise this was a case of *resonant doubt.*', 44, 22, { w: 500, size: 26, fixed: true })], { alt: 'A loop in pencil: "I\'ll get through… if I believe… but now I\'m worried… so I don\'t believe…" around the word "doubt".', shape: 'cloud', seed: 5, ph: 740, panel: { y: 160 } });
ep.panel(900, { cam: { on: ['harry'], fr: 'close', zoom: 0.9, dy: 0.1 }, bg: KX, blur: 3, actors: [HK({ expr: { base: 'wince' } })] },
  [shout('Dad', 'Harry! Get back here, you have some explaining to do!', 360, 145, { w: 380, size: 28, tail: [785, 250] }),
   inner('Harry', 'He shut his eyes, ignored everything he knew about justified credibility, and just tried to believe *really hard*…', 400, 790, { w: 520 })], { mood: 'day' });
// through the barrier: the reader looks out of the brick archway Harry has just come through
const barrierArch = (e) => { const w = e.w, h = e.h, t = h * 0.1, id = uid('ba'); return `<defs><clipPath id="${id}"><path d="M0,0 L${w},0 L${w},${h} L${w * 0.93},${h} L${w * 0.93},${h * 0.34} Q${w * 0.93},${t} ${w / 2},${t} Q${w * 0.07},${t} ${w * 0.07},${h * 0.34} L${w * 0.07},${h} L0,${h}Z"/></clipPath></defs>` + g({ 'clip-path': `url(#${id})` }, K.brickWall(0, 0, w, h, '#7a4232', 12), rect(0, 0, w, h, { fill: '#1a0e08', opacity: 0.5 })) + path(`M${w * 0.07},${h} L${w * 0.07},${h * 0.34} Q${w * 0.07},${t} ${w / 2},${t} Q${w * 0.93},${t} ${w * 0.93},${h * 0.34} L${w * 0.93},${h}`, { fill: 'none', stroke: '#2a1a10', 'stroke-width': 8 }); };
ep.bleed(1040, { cam: { x: 1480, y: 560, w: 1750 }, bg: P9, over: barrierArch, actors: [...[911, 912, 913, 914, 915, 916].map((sd, i) => ({ def: makeExtra(sd, { kid: i % 2 === 0, witchHat: i === 5 }), x: [1080, 2090, 1210, 2230, 1960, 2330][i], y: 960 + (i % 3) * 25, turn: i % 2 ? -0.6 : 0.6, pose: i % 2 ? 'walk' : 'stand', s: i % 2 === 0 ? 1.05 : 1 })),
  { def: harry, id: 'harry', x: 900, y: 1560, s: 2.3, turn: 0.4, pose: 'stand', expr: 'awe', mask: 'sweatband' }] },
  [capC('…and the sounds around him changed.', 400, 70, { w: 440 }),
   cap('A bright open-air platform, a massive scarlet steam engine, and it went entirely without saying that there was no such place in King\'s Cross Station and no room to hide it.', 300, 866, { w: 466, size: 26 })], { mood: 'day', alt: 'Platform Nine-and-Three-Quarters: a long scarlet steam train, the Hogwarts Express, puffing white steam; crowds of children and parents; an iron archway sign reading 9¾.' });
ep.panel(820, { cam: { on: ['harry'], fr: 'close', zoom: 0.9, dy: 0.05 }, bg: P9, blur: 3, actors: [{ def: harry, id: 'harry', x: 760, y: 1260, s: 1.3, turn: 0.3, expr: 'think', mask: 'sweatband' }] },
  [inner('Harry', 'So either (a) I just teleported somewhere else entirely, (b) they can fold space like nobody\'s business, or (c) they are simply ignoring all the rules.', 400, 110, { w: 600 }),
   cap('He also felt vaguely dirtied by having made a deliberate effort to believe something.', 44, 690, { w: 560, size: 26 })], { mood: 'day' });

// =============================================================== Ron, Mr Spoo, and Quidditch
const HP = (o = {}) => ({ def: harryRobes, id: 'harry', x: 1000, y: 1150, s: 1.1, turn: 0.4, pose: 'stand', mask: 'scarf', ...o });
const RP = (o = {}) => ({ def: ron, id: 'ron', x: 1250, y: 1150, s: 1.05, turn: -0.4, pose: 'stand', expr: 'neutral', ...o });
ep.panel(1000, { cam: { on: ['harry', 'ron'], fr: 'waist', dy: -1.7 }, bg: P9, actors: [HP({ expr: 'focus', mask: undefined, def: harry }), RP({ expr: 'awe' }), OWL(1292, 925)] },
  [say('Ron', 'Cor. Are you *really* Harry Potter?', 556, 108, { w: 300, fixed: true, tail: [690, 430] }),
   say('Harry', 'I have no logical way of knowing that for certain. For all *I* know, there could easily be spells to polymorph a child into a specified appearance—', 298, 370, { w: 430, size: 27, fixed: true, shape: 'box' })], { mood: 'day' });
ep.panel(460, { cam: { on: ['ron'], fr: 'close' }, bg: P9, blur: 3, actors: [RP({ expr: 'confused' })] }, [say('Ron', 'Er, what, mate?', 280, 100, { w: 220 })], { mood: 'day' });
ep.panel(1000, { cam: { on: ['harry', 'ron'], fr: 'waist', dy: -1.7 }, bg: P9, actors: [HP({ expr: 'determined', pose: 'handsHips' }), RP({ expr: 'deadpan' }), OWL(1292, 925)] },
  [cap('Harry tied his scarf over his face and pulled on his robes.', 36, 34, { w: 700 }),
   say('Harry', 'There. Am I identifiable as Harry Potter? No? Very good. You will henceforth address me as *Mr Spoo.*', 290, 300, { w: 460 })], { mood: 'day', alt: 'Harry, now in black robes with a red-and-gold striped winter scarf wrapped over his face like a bandit, eyes peeking out.' });
ep.panel(780, { cam: { on: ['ron'], fr: 'bust', zoom: 0.85, dy: 0.1 }, bg: P9, blur: 2, actors: [RP({ expr: 'embarrassed' })] },
  [say('Ron', 'Okay, Mister Spoo—', 280, 90, { w: 340 }), say('Ron', 'I can\'t do that, it makes me feel stupid.', 580, 640, { w: 340 })], { mood: 'day' });
ep.panel(720, { cam: { on: ['harry'], fr: 'close', zoom: 0.9, dy: -0.05 }, bg: P9, blur: 3, actors: [HP({ expr: 'unimpressed' })] },
  [inner('Harry', '*That\'s not just a feeling.*', 400, 60, { w: 420 }), say('Harry', 'Okay. *You* pick a name.', 400, 640, { w: 420 })], { mood: 'day' });
ep.panel(1000, { cam: { on: ['ron'], fr: 'waist', dx: 0.62, dy: -0.4, zoom: 0.85 }, bg: P9, actors: [RP({ expr: 'delight', pose: 'armsUp' })], over: (e) => FX.sparkles([[80, 300, 22], [520, 330, 18], [440, 170, 14]], { col: '#ffb070' }) },
  [say('Ron', 'Mr Cannon! For the Chudley Cannons!', 330, 100, { w: 420 }),
   say('Harry', 'Who or what are the Chudley Cannons?', 600, 740, { w: 330, tail: [790, 800] }),
   cap('Asking this was a mistake.', 390, 900, { w: 380 })], { mood: 'day' });
const quidditch = (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#faf3e1' });
  out += T(w / 2, 62, 'QUIDDITCH (as explained, with hand gestures)', 38);
  out += rect(50, 96, w - 100, 210, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 3 }) + T(w / 2, 160, 'goals: 10 points each', 44) + T(w / 2, 212, '(~15-20 per game)', 36) + T(w / 2, 272, 'so maybe ~150-200 points of actual play', 34);
  out += circle(w / 2, 390, 30, { fill: '#e7bb4f', stroke: '#2d2a4a', 'stroke-width': 3 }) + path(`M${w / 2 - 30},380 q-60,-34 -100,8 M${w / 2 + 30},380 q60,-34 100,8`, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 3 }) + T(w / 2, 486, 'the Snitch: 150 POINTS ?!', 58, 'middle', '#c43a32') + T(w / 2, 546, 'mostly luck. ends the game.', 38);
  return out;
};
ep.panel(600, quidditch, [], { alt: 'Harry\'s notes on Quidditch: goals are 10 points; the golden Snitch is 150 points, mostly luck, and ends the game.', shape: 'torn', frame: 'paper', seed: 8, tear: 12, rotate: -1.2, shadow: true });
ep.panel(1000, { cam: { on: ['harry'], fr: 'waist', zoom: 0.85, dy: -0.2 }, bg: P9, actors: [HP({ expr: 'rant', pose: 'lecture' })] },
  [say('Harry', 'That violates every possible rule of game design! Whichever Seeker gets lucky swoops in and makes everyone else\'s work moot!', 400, 110, { w: 540 }),
   say('Harry', 'Who was the first Seeker, the King\'s idiot son who wanted to play but couldn\'t understand the rules? Get rid of the Snitch. *Buy a clock.*', 400, 860, { w: 560, size: 28 })], { mood: 'day' });
ep.panel(720, { cam: { on: ['ron'], fr: 'bust', dy: -0.4 }, bg: P9, blur: 2, actors: [RP({ expr: 'horror' })] },
  [shout('Ron', 'But if you get rid of the Snitch, how will anyone know when the game *ends?*', 400, 160, { w: 500, size: 28 })], { mood: 'day' });
ep.panel(900, { cam: { head: 'harry', hw: 0.32, hx: 0.5, hy: 0.77 }, bg: P9, blur: 3, actors: [HP({ expr: { base: 'scheme', glint: false }, pose: 'crossArms' })] },
  [say('Harry', 'I *am* the Boy-Who-Lived. People will listen to me. It wouldn\'t take much time to write the Ninety-Five Theses of the Snitchless Reformation and nail them to a church door.', 400, 272, { w: 460, size: 27, fixed: true })], { mood: 'day', shape: 'gothic', frame: 'wood', spring: 0.3 });

// =============================================================== Draco
const DP = (o = {}) => ({ def: draco, id: 'draco', x: 760, y: 1150, s: 1.1, turn: 0.4, pose: 'stand', expr: 'smug', ...o });
ep.panel(760, { cam: { on: ['draco'], fr: 'waist' }, bg: P9, actors: [DP({ pose: 'handsHips' }), L.trunk(560, 1160, 0.35, '#2f4a3a', false)] },
  [say('Draco', 'Potter. *What* is that on your face? And *what* is standing next to you?', 300, 118, { w: 360, fixed: true })], { mood: 'day', alt: 'Draco Malfoy, in school robes, with an elegant silver-and-emerald trunk.' });
ep.panel(560, { cam: { on: ['ron'], fr: 'close' }, bg: P9, blur: 3, actors: [RP({ expr: 'angry', turn: -0.5 })] }, [shout('Ron', '*You!*', 400, 100, { w: 160, size: 40 })], { mood: 'day' });
ep.panel(1000, { cam: { on: ['draco', 'harry', 'ron'], fr: 'waist', dy: -2.5, zoom: 1.3 }, bg: P9, actors: [DP({ x: 780 }), HP({ x: 1000, turn: -0.4, expr: 'happy', pose: 'present' }), RP({ x: 1220, expr: 'yell' })] },
  [say('Harry', 'Draco! Good to see you\'re doing so well after, um, our last meeting. This is Ron Weasley. And I\'m going incognito, so call me, er… *Mister Black.*', 380, 165, { w: 480, size: 27, fixed: true }),
   shout('Ron', '*Harry!* You can\'t use *that* name!', 572, 425, { w: 270, size: 26, fixed: true })], { mood: 'day' });
ep.panel(760, { cam: { on: ['draco'], fr: 'bust', zoom: 0.8, dy: -0.25 }, bg: P9, blur: 2, actors: [DP({ expr: 'smug', pose: 'crossArms' })] },
  [say('Draco', 'I\'d say it\'s a *fine* name, but it belongs to the Noble and Most Ancient House of Black. I\'ll call you Mr Silver.', 400, 148, { w: 520, fixed: true })], { mood: 'day' });
ep.panel(460, { cam: { on: ['ron'], fr: 'close' }, bg: P9, blur: 3, actors: [RP({ expr: 'cross' })] }, [say('Ron', '*You* get away from… from Mr *Gold!*', 400, 100, { w: 360 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close', dy: 0.1, zoom: 0.9 }, bg: P9, blur: 3, actors: [HP({ expr: 'exasperated' })] }, [say('Harry', 'I\'ll go by Mr Bronze, thanks for the naming schema.', 400, 90, { w: 440 })], { mood: 'day' });
ep.panel(1060, { cam: { on: ['draco', 'ron'], fr: 'bust', dy: -2.0, zoom: 1.15 }, bg: P9, actors: [DP({ x: 900, expr: 'coldSmile', turn: 0.4 }), RP({ x: 1150, expr: 'hurt' }), OWL(1192, 925)] },
  [say('Draco', 'Oh, what\'s *this?* Where\'s the famous Weasley family rat?', 250, 100, { w: 400 }),
   say('Ron', 'Buried in the backyard.', 600, 290, { w: 340, fixed: true }),
   say('Draco', 'Aw, how sad. The Weasleys have *the best pet story ever*, Mr Bronze. Want to tell it, Weasley?', 250, 462, { w: 360, size: 27, fixed: true })], { mood: 'day' });
ep.panel(760, { cam: { on: ['ron'], fr: 'close', zoom: 0.9, dy: 0.05 }, bg: P9, blur: 3, actors: [RP({ expr: 'teary' })] },
  [say('Ron', 'You wouldn\'t think it was funny if it happened to *your* family!', 400, 110, { w: 460 }), say('Draco', 'Oh, but it wouldn\'t ever *happen* to the Malfoys.', 420, 660, { w: 480, tail: [30, 720] })], { mood: 'day' });
ep.panel(940, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.15 }, bg: P9, blur: 2, actors: [HP({ expr: 'stern', pose: 'raiseHand', armB: { sh: 110, el: 50, hand: 'palm' }, mask: 'scarfDown' })] },
  [say('Harry', 'That\'s enough.', 400, 90, { w: 320 }),
   say('Harry', 'If Ron doesn\'t want to talk about it, he doesn\'t have to. And I\'d ask that you not talk about it either.', 400, 790, { w: 560 })], { mood: 'day' });
ep.panel(720, { cam: { on: ['ron'], fr: 'bust', dx: -0.4, dy: -0.4 }, bg: P9, blur: 2, actors: [RP({ expr: 'delight', pose: 'point', turn: -0.3 })] },
  [say('Ron', 'That\'s right! You see what kind of person he is? Now tell him to go away!', 400, 100, { w: 460 })], { mood: 'day' });
ep.panel(840, { cam: { on: ['harry'], fr: 'close', zoom: 0.85, dy: -0.12 }, bg: P9, blur: 3, actors: [HP({ expr: 'calm', mask: 'scarfDown' })] },
  [note('(1 2 3 4 5 6 7 8 9 10)', 400, 55, { size: 40, w: 500, color: '#1e1b33' }), say('Harry', 'I\'m not telling him to go away. He\'s welcome to talk to me if he wants.', 400, 740, { w: 560 })], { mood: 'day', alt: 'Harry counts to ten, very fast.' });
ep.panel(960, { cam: { on: ['ron'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: P9, blur: 2, actors: [RP({ expr: 'cross', pose: 'crossArms' })] },
  [say('Ron', 'Well, I don\'t intend to hang around with anyone who hangs around with Draco Malfoy.', 400, 110, { w: 540 }),
   say('Harry', 'That\'s up to you. *I* don\'t intend to let anyone say who I can and can\'t hang around with.', 420, 830, { w: 560, tail: [30, 890] })], { mood: 'day' });
ep.panel(620, { cam: { x: 1560, y: 880, w: 820 }, bg: P9, actors: [RP({ x: 1600, turn: 0.7, pose: 'walk', expr: 'hurt' }), OWL(1555, 945)] },
  [cap('Ron\'s face went blank with surprise, like he\'d actually expected that line to work. Then he stormed off down the platform.', 44, 30, { w: 460 })], { mood: 'day' });
ep.panel(680, { cam: { on: ['harry'], fr: 'close', zoom: 0.9, dy: 0.2 }, bg: P9, blur: 3, actors: [HP({ expr: 'pained', mask: 'scarfDown' })] },
  [inner('Harry', 'His mum had helped Harry find the platform. He\'d have to find a way to make that up to Ron.', 400, 600, { w: 600 })], { mood: 'day' });

// Draco & Harry
const HD = (o = {}) => HP({ x: 1000, turn: -0.4, mask: 'scarfDown', ...o });
ep.panel(1080, { cam: { on: ['draco', 'harry'], fr: 'waist', dy: -2.3 }, bg: P9, actors: [DP({ expr: 'calm', pose: 'gesture' }), HD({ expr: 'focus' })] },
  [say('Draco', 'If you really were raised by Muggles, you mightn\'t know what it\'s like to be famous. People will take up *all* your time. You *have* to learn to say no.', 400, 130, { w: 540, size: 27, fixed: true }),
   say('Draco', 'Decide who you *want* to be seen with, Potter. Everyone\'s going to judge you by it.', 350, 410, { w: 480, fixed: true })], { mood: 'day' });
ep.panel(1040, { cam: { on: ['harry', 'draco'], fr: 'bust', dy: -2.0 }, bg: P9, actors: [DP({ expr: 'smug' }), HD({ expr: 'think' })] },
  [say('Harry', 'How did you recognise me, if you don\'t mind my asking?', 544, 112, { w: 340, fixed: true }),
   say('Draco', 'I *have* met you, remember. I saw someone going around with a scarf wrapped round his head, looking absolutely ridiculous. So I took a *guess.*', 316, 425, { w: 420, size: 26, fixed: true })], { mood: 'day' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust', dy: -0.5 }, bg: P9, blur: 2, actors: [HD({ expr: 'sad', pose: 'bow' })] },
  [say('Harry', 'I\'m *terribly* sorry about our first meeting. I didn\'t mean to embarrass you in front of Lucius.', 400, 100, { w: 540 })], { mood: 'day' });
ep.panel(920, { cam: { on: ['draco'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: P9, blur: 2, actors: [DP({ expr: 'grin', pose: 'gesture' })] },
  [say('Draco', 'Thank *you* for what you said to Father. If not for that, I might\'ve had a harder time explaining.', 400, 110, { w: 520 }),
   say('Harry', 'And thank *you* for reciprocating with what you said to Professor McGonagall.', 400, 800, { w: 540, tail: [790, 860] })], { mood: 'day' });
ep.panel(1020, { cam: { on: ['draco'], fr: 'bust', zoom: 0.85, dy: -0.25 }, bg: P9, actors: [DP({ expr: 'smug', pose: 'handsHips' })] },
  [say('Draco', 'Father has a *refined* sense of humour. But he *does* understand making friends. He made me repeat it every night for a month: "I will make friends at Hogwarts."', 400, 140, { w: 540, size: 27 }),
   say('Draco', 'When I explained everything and he saw that\'s what I was doing, he bought me an ice-cream.', 400, 880, { w: 560 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: P9, blur: 3, actors: [HD({ expr: 'shock' })] }, [shout('Harry', '*You managed to spin THAT into an ice-cream?*', 400, 100, { w: 480, size: 30 })], { mood: 'day' });
ep.panel(980, { cam: { on: ['draco'], fr: 'bust', zoom: 0.85, dy: -0.35 }, bg: P9, blur: 2, actors: [DP({ expr: 'smug', pose: 'crossArms' })] },
  [say('Draco', 'Father *knew* what I was doing, of course. But he taught me *how*, and if I grin the right way *while* I\'m doing it, it becomes a father-son thing and then he *has* to buy me an ice-cream.', 400, 150, { w: 560, size: 27 }),
   say('Draco', 'Or I\'ll give him this sort of sad look.', 400, 880, { w: 420 })], { mood: 'day' });
// the sad look, framed like a romance-comic close-up: a soft pink oval with sparkles
ep.panel(580, { cam: { on: ['draco'], fr: 'close' }, bg: P9, blur: 3, actors: [DP({ expr: 'pleading' })], behind: (e) => rect(0, 0, e.w, e.h, { fill: '#f7c4d2', opacity: 0.8 }) + K.glow(e.w / 2, e.h * 0.4, e.w * 0.55, '#fff8fa', 0.8), over: (e) => FX.sparkles([[e.w * 0.17, e.h * 0.3, 20], [e.w * 0.84, e.h * 0.24, 16], [e.w * 0.12, e.h * 0.62, 12], [e.w * 0.86, e.h * 0.58, 22], [e.w * 0.25, e.h * 0.12, 10]], { col: '#fff6fa' }) }, [note('(sad look)', 680, 520, { size: 40 })], { shape: 'oval', frame: 'glow', glow: '#f2a2b8', ph: 500, alt: 'Draco demonstrates the sad look. It is devastatingly effective.' });
ep.panel(800, { cam: { on: ['harry'], fr: 'bust', zoom: 0.9, dy: -0.2 }, bg: P9, blur: 2, actors: [HD({ expr: 'awe' })] },
  [say('Harry', 'You\'ve had *lessons* on how to manipulate people?', 400, 90, { w: 480 }), say('Draco', 'Of course. I\'m a *Malfoy.* Father bought me tutors.', 420, 690, { w: 480, tail: [30, 740] })], { mood: 'day' });
ep.panel(1000, { cam: { on: ['harry', 'draco'], fr: 'bust', dy: -2.0 }, bg: P9, actors: [DP({ expr: 'smug' }), HD({ expr: 'bigGrin' })] },
  [say('Harry', 'Wow. Your dad is almost as awesome as my dad.', 530, 90, { w: 420 }),
   say('Draco', 'Oh? And what does *your* father do?', 260, 260, { w: 400 }),
   say('Harry', 'He buys me books.', 570, 420, { w: 320 })], { mood: 'day' });
ep.panel(640, { cam: { on: ['draco'], fr: 'close', zoom: 0.9, dy: 0.05 }, bg: P9, blur: 3, actors: [DP({ expr: 'unimpressed' })] }, [say('Draco', 'That doesn\'t sound very impressive.', 400, 80, { w: 480 }), say('Harry', 'You had to be there.', 480, 570, { w: 420, tail: [790, 600] })], { mood: 'day' });

// the secret exchange
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: P9, blur: 2, actors: [HD({ expr: 'think' })] },
  [say('Harry', 'The way Lucius was looking at you in that shop… I thought he was going to crucify you.', 400, 132, { w: 460, fixed: true }),
   say('Draco', 'My father really loves me. He wouldn\'t ever do that.', 400, 580, { w: 400, tail: [30, 640] })], { mood: 'day' });
ep.panel(680, { cam: { on: ['harry'], fr: 'close', dy: -0.2 }, bg: P9, blur: 3, actors: [HD({ expr: 'focus' })] },
  [say('Harry', 'Don\'t take this the wrong way, but how do you *know* that? What do you think you know, and how do you think you know it?', 400, 162, { w: 520, fixed: true })], { mood: 'day' });
ep.panel(1040, { cam: { on: ['draco'], fr: 'bust', zoom: 0.85, dy: -0.15 }, bg: P9, blur: 2, actors: [DP({ expr: { base: 'sad', eyes: { lookY: 0.5 } }, pose: 'crossArms' })] },
  [say('Draco', 'Father once missed a Wizengamot vote for me. I fell off a broom and broke a lot of ribs. It really hurt. I thought I was going to die.', 400, 160, { w: 540, size: 28, fixed: true }),
   say('Draco', 'So Father missed this really important vote, because he was there by my bed at St Mungo\'s, holding my hands and promising me I was going to be okay.', 400, 850, { w: 520, size: 28, fixed: true })], { mood: 'day', alt: 'Draco, unusually quiet, looks down while he tells it.' });
ep.panel(660, { cam: { on: ['harry'], fr: 'close', zoom: 0.9, dy: 0.05 }, bg: P9, blur: 3, actors: [HD({ expr: 'embarrassed' })] }, [say('Harry', 'Why are you telling me *that?* It seems sort of… private.', 400, 90, { w: 500 })], { mood: 'day' });
ep.panel(980, { cam: { on: ['draco'], fr: 'bust', zoom: 0.9, dy: -0.55 }, bg: P9, blur: 2, actors: [DP({ expr: 'hopeful', pose: 'present' })] },
  [say('Draco', 'One of my tutors said people form close friendships by knowing private things about each other. Most people are too embarrassed to share anything important.', 400, 170, { w: 580, size: 27, fixed: true }),
   say('Draco', 'Your turn?', 175, 700, { w: 240, fixed: true })], { mood: 'day' });
ep.panel(700, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#faf3e1' });
  out += T(w / 2, 64, 'RECIPROCATION (Cialdini, ch. 2)', 42);
  out += rect(40, 104, 290, 160, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 3 }) + T(185, 175, 'unasked gift', 42) + T(185, 228, '(a secret)', 36);
  out += rect(w - 330, 104, 290, 160, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 3 }) + T(w - 185, 175, 'pressure to', 42) + T(w - 185, 228, 'give one back', 42);
  out += path(`M334,184 L${w - 336},184`, { stroke: '#c43a32', 'stroke-width': 5 }) + path(`M${w - 350},172 l14,12 l-14,12`, { fill: 'none', stroke: '#c43a32', 'stroke-width': 5 });
  out += T(w / 2, 332, 'a gift of 2 Sickles beats an offer of 20.', 40) + T(w / 2, 398, 'knowing the trick ≠ immune to it.', 44, 'middle', '#c43a32');
  return out;
}, [cap('Knowing that Draco\'s hopeful face had probably been drilled into him by months of practice did not make it any less effective. Well, *less* effective. Unfortunately not *ineffective.*', 60, 500, { w: 580, size: 26, fixed: true })],
  { alt: 'Harry\'s notes: an unasked-for gift (a secret) creates pressure to give one back. "Knowing the trick ≠ immune to it."', ph: 450, shape: 'torn', frame: 'paper', seed: 3, tear: 12, rotate: 1, shadow: true });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.3 }, bg: P9, blur: 2, actors: [HD({ expr: 'focus', pose: 'raiseHand', armB: { sh: 110, el: 50, hand: 'palm' } })] },
  [say('Harry', 'Draco, just so you know, I recognise *exactly* what you\'re doing. My books call it *reciprocation.*', 400, 160, { w: 500, fixed: true }),
   say('Harry', 'I didn\'t say I wouldn\'t respond. I just need time to pick something private but just as non-damaging.', 400, 840, { w: 480, fixed: true })], { mood: 'day' });
ep.panel(660, { cam: { on: ['draco'], fr: 'close', zoom: 0.9, dy: 0.05 }, bg: P9, blur: 3, actors: [DP({ expr: 'smile' })] }, [say('Draco', 'All right. I\'ll wait. Oh, and please take off the scarf while you say it.', 400, 100, { w: 540 })], { mood: 'day' });
ep.panel(640, { cam: { on: ['harry'], fr: 'close', zoom: 0.9, dy: 0.2 }, bg: P9, blur: 3, actors: [HD({ expr: 'unimpressed', mask: 'sweatband' })] }, [inner('Harry', '*Simple, but effective.* I need those tutors.', 400, 580, { w: 600 })], { mood: 'day' });
ep.panel(900, { cam: { on: ['harry'], fr: 'close' }, bg: P9, blur: 3, actors: [HD({ expr: { base: 'sad', eyes: { lookX: -0.8 } }, mask: 'sweatband' })] },
  [say('Harry', 'It sounds like you can really rely on your father. If you talk to him seriously, he\'ll always listen to you, and take you seriously.', 400, 145, { w: 520, fixed: true }),
   whisper('Harry', 'Sometimes… I wish my own Dad was like yours.', 400, 660, { w: 400, size: 30 })], { mood: 'day', alt: 'Harry, face uncovered except for the band over his scar, looks away as he says it.' });
ep.panel(780, { cam: { on: ['harry'], fr: 'close', zoom: 0.9, dy: -0.1 }, bg: P9, blur: 3, actors: [HD({ expr: 'flustered', mask: 'sweatband' })] },
  [say('Harry', 'Not that I wish my Dad was a flawless instrument of death like Lucius! I only mean taking me seriously—', 400, 150, { w: 520, fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { on: ['draco'], fr: 'bust', zoom: 0.9, dy: -0.15 }, bg: P9, blur: 2, actors: [DP({ expr: 'warm' })] },
  [say('Draco', 'I understand. There… now doesn\'t it feel like we\'re a little closer to being friends?', 400, 125, { w: 560, fixed: true }),
   say('Harry', 'Yeah. It does, actually.', 480, 790, { w: 440, tail: [790, 820] })], { mood: 'day' });
ep.panel(860, { cam: { on: ['draco'], fr: 'close', zoom: 0.85, dy: 0.1 }, bg: P9, blur: 3, actors: [DP({ expr: 'smug' })] },
  [say('Draco', 'My father takes all his friends seriously. That\'s why he has lots of friends. You should meet him.', 400, 125, { w: 580, fixed: true }),
   say('Harry', 'I\'ll think about it. So you really are his one weak point. Huh.', 415, 745, { w: 560, tail: [790, 800], fixed: true })], { mood: 'day' });

// =============================================================== the Comed-Tea
const ST = () => S.comedStall(1300, 1150);
// a Comed-Tea can in the near hand: held low, or raised to drink
const CAN = { sh: 55, el: 70, hand: 'hold', under: g({ transform: 'rotate(125) translate(8,18)' }, comedCan(1.3)) };
const CAN_UP = { sh: 55, el: 80, hand: 'hold', under: g({ transform: 'rotate(115) translate(8,12)' }, comedCan(1.3)) };
// the counter front again, drawn over the stall-holder so he stands behind it
const STF = () => rect(1080, 1030, 440, 130, { fill: '#6b4429', ...K.bl(2) }) + rect(1070, 1010, 460, 26, { fill: '#8a5d38', ...K.bl(2) });
ep.panel(900, { cam: { x: 1250, y: 910, w: 900 }, bg: P9, mid: ST, actors: [{ def: stallMan, id: 'stall', x: 1420, y: 1050, turn: -0.4, pose: 'holdOne', expr: 'shock', armF: { sh: 55, el: 75, hand: 'hold', prop: g({ transform: 'translate(0,10)' }, comedCan(1.1)) } }, STF, DP({ x: 980, y: 1180, turn: 0.4 }), HP({ x: 1110, y: 1180, turn: 0.4, expr: 'focus' })],
  over: (e) => { const m = e.anchors?.stall?.mouth; return m ? spray(m[0] - 10, m[1], -1, 1.2) : ''; } },
  [cap('The stall-holder spotted the refined Draco Malfoy approaching with a boy looking incredibly stupid with a scarf tied over his face, and had a sudden coughing fit in mid-drink.', 44, 700, { w: 600, size: 26 })], { mood: 'day', alt: 'A newspaper stall stacked with neon-green cans. The bald, bearded stall-holder sprays green fizz over his beard.' });
ep.panel(1060, { cam: { on: ['stall'], fr: 'bust', zoom: 0.85, dy: -0.3 }, bg: P9, blur: 2, mid: ST, actors: [{ def: stallMan, id: 'stall', x: 1420, y: 1000, turn: -0.3, pose: 'present', expr: 'grin' }] },
  [say('Harry', '\'Scuse me, but what *is* that stuff?', 520, 110, { w: 440, tail: [790, 130], fixed: true }),
   say('Stall-holder', 'Comed-Tea. Drink it, and something surprising is bound to happen that makes you spill it on yourself or someone else. Charmed to vanish a few seconds later.', 400, 875, { w: 540, size: 27, fixed: true })], { mood: 'day' });
ep.panel(600, { cam: { on: ['draco'], fr: 'close', zoom: 0.9, dy: 0.05 }, bg: P9, blur: 3, actors: [DP({ x: 980, y: 1180, expr: 'unimpressed' })] }, [say('Draco', 'How droll. How very, *very* droll. Come, Mr Bronze.', 400, 105, { w: 560, fixed: true })], { mood: 'day' });
ep.panel(960, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: P9, blur: 2, actors: [HP({ x: 1110, y: 1180, expr: 'rant', pose: 'fists' })] },
  [say('Harry', 'No. I\'m sorry. I just don\'t believe it. There is just *no way* a bloody *drink* can manipulate reality to produce *comedy setups.*', 400, 160, { w: 540, fixed: true }),
   say('Harry', 'I *have* to investigate. *Have* to.\nTwo dozen cans, please.', 400, 830, { w: 560, fixed: true })], { mood: 'day' });
// the pouch and its cans, cut out onto the page itself
ep.cutout(620, (ctx) => {
  const w = ctx.w, h = ctx.h, px = w * 0.34, py = h * 0.74;
  let out = ellipse(px, py + 122, 120, 16, { fill: '#3a2a1a', opacity: 0.2, filter: 'url(#blur3)' });
  out += g({ transform: `translate(${px},${py}) scale(1.7)` }, path('M-60,-20 Q-80,60 0,70 Q80,60 60,-20Z', { fill: '#8a6a4a', stroke: C.ink, 'stroke-width': 3 }), ellipse(0, -20, 64, 16, { fill: '#1a120a', stroke: C.ink, 'stroke-width': 3 }));
  out += [0, 1, 2].map((i) => g({ transform: `translate(${px + 90 + i * 130},${py - 150 - i * 95}) rotate(${-30 - i * 12})` }, comedCan(2.2))).join('');
  return out;
},
  [note('burp', 110, 330, { size: 40, color: '#5a3a22', fixed: true }), note('burp', 470, 400, { size: 40, color: '#5a3a22', fixed: true }), note('*BURP*', 650, 470, { size: 48, color: '#5a3a22', fixed: true }), cap('Twenty-two burps later…', 44, 30, { w: 360 })], { alt: 'The pouch swallows can after can, burping each time.' });
ep.panel(820, { cam: { on: ['draco', 'harry'], fr: 'bust', dy: -0.8 }, bg: P9, actors: [DP({ x: 1000, y: 1180, turn: 0.4, pose: 'holdOne', expr: 'deadpan', armF: CAN_UP }), HP({ x: 1200, y: 1180, turn: -0.4, pose: 'holdOne', expr: 'focus', mask: 'scarfDown', armF: CAN_UP })] },
  [cap('They pulled the rings at the same time, and drank. It tasted *bright green*—extra-fizzy, and limer than lime.', 44, 30, { w: 520 }), cap('Aside from that, nothing else happened.', 240, 715, { w: 480, fixed: true })], { mood: 'day' });
ep.panel(700, { cam: { on: ['harry'], fr: 'close', zoom: 0.9, dy: 0.3 }, bg: P9, blur: 3, actors: [HP({ x: 1200, y: 1180, expr: 'suspicious', mask: 'scarfDown' })] },
  [inner('Harry', 'If this guy took advantage of a natural accident to sell me twenty-four cans of nothing, I\'m going to applaud his entrepreneurial spirit and then kill him.', 400, 590, { w: 600 })], { mood: 'day' });
ep.panel(660, { cam: { on: ['stall'], fr: 'close', zoom: 0.9, dy: -0.1 }, bg: P9, blur: 3, mid: ST, actors: [{ def: stallMan, id: 'stall', x: 1420, y: 1000, turn: -0.3, expr: 'smile' }] },
  [say('Stall-holder', 'It doesn\'t always happen immediately. But it\'s guaranteed once per can, or your money back.', 400, 100, { w: 540 })], { mood: 'day' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'waist', zoom: 0.9, dy: -0.35 }, bg: P9, actors: [HP({ x: 1200, y: 1180, turn: 0.5, pose: 'walk', expr: 'smug', mask: 'scarfDown', armF: CAN })] },
  [inner('Harry', 'In his state of mental preparedness, Lucius Malfoy could walk past in a ballerina outfit and it wouldn\'t make him do a spit-take. Just what wacky shenanigan was the universe supposed to cough up *now?*', 400, 110, { w: 600, size: 27 }),
   cap('He swigged, and glanced back at the newspaper stand.', 44, 900, { w: 640 })], { mood: 'day' });
// the Quibbler itself, held up to the reader: no frame, just the newspaper on the page
ep.cutout(920, (ctx) => g({ transform: `translate(${ctx.w / 2 + 10},${ctx.h * 0.5 + 14}) scale(1.45) rotate(-2)` }, rect(-210, -270, 420, 540, { fill: '#3a2a1a', opacity: 0.28, filter: 'url(#blur3)' })) + g({ transform: `translate(${ctx.w / 2},${ctx.h * 0.5}) scale(1.45) rotate(-2)` }, S.quibblerPage().replace('font-size="52"', 'font-size="42"')), [], { alt: 'The Quibbler\'s front page. Headline: BOY-WHO-LIVED GETS DRACO MALFOY PREGNANT.' });
ep.panel(900, { cam: { on: ['harry', 'draco'], fr: 'bust', dy: -0.6 }, bg: P9, blur: 3,
  actors: [HP({ x: 1200, y: 1180, turn: -0.3, pose: 'fists', expr: 'rant', mask: 'scarfDown' }), DP({ x: 1000, y: 1180, turn: 0.3, pose: 'panic', expr: 'horror' })],
  behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h / 2, { bg: '#e8ffd8', col: '#6ad05a', op: 0.6, n: 110 }),
  over: (e) => { const hm = e.anchors?.harry?.mouth, dm = e.anchors?.draco?.mouth; return (hm ? spray(hm[0] - 30, hm[1] + 10, -1, 1.15) : '') + (dm ? spray(dm[0] + 30, dm[1] + 10, 1, 1.15) : '') + FX.sfxText(e.w / 2, e.h * 0.21, 'PFFFFT', { size: 100, fill: '#caffb0', rot: -6 }); } },
  [shout('Draco', '*GAH!*', 170, 640, { w: 180, size: 40 })], { mood: 'day', shape: 'burst', points: 18, seed: 4, alt: 'Harry and Draco spray bright green fizz all over each other in a double spit-take.' });
ep.panel(900, { cam: { on: ['harry'], fr: 'close', zoom: 0.95, dy: 0.3 }, bg: P9, blur: 3, actors: [HP({ x: 1200, y: 1180, expr: 'blank', mask: 'scarfDown' })] },
  [say('Harry', 'Buh-bluh-buh-buh…', 400, 80, { w: 400 }),
   cap('Too many competing objections, that was the problem. Every time Harry tried to say "But we\'re only eleven!", the objection "But men can\'t get pregnant!" demanded priority, and was then run over by "But there\'s nothing between us, really!"', 44, 650, { w: 600, size: 26 })], { mood: 'day' });
ep.panel(720, { cam: { on: ['draco'], fr: 'bust', zoom: 0.9, dy: -0.2 }, bg: P9, blur: 2, actors: [DP({ x: 1000, y: 1180, expr: { base: 'awe', eyes: { sparkle: false } }, pose: 'holdOne', armF: CAN })] },
  [say('Draco', 'I take it back. That was pretty good.', 400, 100, { w: 480 })], { mood: 'day' });
ep.panel(980, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.15 }, bg: P9, blur: 2, actors: [HP({ x: 1200, y: 1180, expr: { base: 'cross', mouth: { type: 'grit' } }, pose: 'fists', mask: 'scarfDown' })] },
  [say('Harry', 'Hey, Draco. You know what I bet is even better for becoming friends than exchanging secrets?', 400, 100, { w: 580 }),
   shout('Harry', '*Committing murder.*', 400, 850, { w: 460, size: 36 })], { mood: 'day' });
ep.panel(820, { cam: { on: ['draco'], fr: 'bust', zoom: 0.95, dy: -0.1 }, bg: P9, blur: 2, actors: [DP({ x: 1000, y: 1180, expr: 'calm', pose: 'stand' })] },
  [say('Draco', 'I have a tutor who says that.', 400, 90, { w: 480 }),
   say('Draco', 'Who\'ve you got in mind?', 400, 730, { w: 440 })], { mood: 'day', alt: 'Draco answers perfectly calmly. He does not think it is a joke.' });
ep.end();
export default ep;
