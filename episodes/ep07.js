// EPISODE 7 — The Winner Shall Lose  (source: HPMOR ch. 6, second half + Aftermath)
import { Episode, say, shout, whisper, inner, cold, cap, capC, dark, note, title, plain, M } from '../engine/core/dsl.js';
import { backdrop } from '../engine/core/scene.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as L from '../engine/bg/london.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harry, mcgonagall, ollivander, dumbledore, trunkSeller, orangeMan } from '../engine/chars/cast.js';
import { wand, pouch, coinBag, galleon } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep07', number: 7, title: 'The Winner Shall Lose' });
ep.setBg(C.paper);
ep.beat(260, [plain('CHAPTER SEVEN', 400, 90, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('The Winner Shall Lose', 400, 170, { size: 48 })]);
// Harry's pencil notes: Caveat on cream paper
const T = (x, y, s, fs, a = 'middle', col = '#2d2a4a') => text(x, y, s, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, 'text-anchor': a, fill: col });
const HWAND = g({ transform: 'translate(0,-4)' }, wand(104, '#8a5a2a')); // under the fist (gripped), pointing on past it

// =============================================================== Ollivanders
const OL = () => L.ollivanders();
const OLV = (o = {}) => ({ def: ollivander, id: 'ollivander', x: 760, y: 900, turn: 0.3, pose: 'present', expr: 'calm', ...o });
const MO = { def: mcgonagall, id: 'mcgonagall', x: 1400, y: 1080, turn: -0.4, pose: 'stand', expr: 'calm' };
const HO = (o = {}) => ({ def: harry, id: 'harry', x: 1120, y: 1060, s: 1.1, turn: -0.4, pose: 'wand', expr: 'focus', armB: { sh: 92, el: -8, hand: 'hold', under: HWAND }, ...o });
ep.panel(940, { cam: { x: 1020, y: 660, w: 1080 }, bg: OL, actors: [OLV(), L.ollCounter(), HO({ pose: 'stand', armB: undefined, expr: 'awe' }), MO] },
  [cap('Later that day. Ollivanders: Makers of Fine Wands since 382 B.C.', 400, 125, { w: 460, anchor: 'tc' }),
   cap('The shop was narrow and dusty, and every wall was boxes, stacked up to the dark.', 200, 805, { w: 520 })], { mood: 'candle', shape: 'arch', frame: 'wood', alt: 'Ollivanders: a narrow, dim shop with walls made entirely of thin wand boxes stacked into the darkness. A pale old wizard behind the counter.' });
ep.panel(760, { cam: { head: 'ollivander', hw: 0.3, hx: 0.26, hy: 0.36 }, bg: OL, blur: 2, actors: [OLV({ expr: { base: 'smile', eyes: { open: 1.05 } }, pose: 'present', armB: { sh: 50, el: 45, hand: 'hold', under: g({ transform: 'translate(0,9) rotate(-65) translate(0,-4)' }, wand(80, '#8a5a2a')) } }), L.ollCounter()] },
  [say('Ollivander', 'Ah. Harry Potter. I wondered when I\'d be seeing you.', 570, 100, { w: 300, fixed: true }),
   say('Ollivander', 'Holly and phoenix feather. Eleven inches. Nice and supple. Give it a wave.', 215, 712, { w: 300, anchor: 'bc', fixed: true })], { mood: 'candle' });
// the moment
ep.panel(620, { cam: { on: ['harry'], fr: 'waist', dx: -0.55 }, bg: OL, blur: 2, actors: [HO({ expr: 'focus' })] }, [], { mood: 'candle', alt: 'Harry raises the wand.' });
ep.bleed(1100, { cam: { on: ['harry'], fr: 'waist', dy: -1.1 }, bg: OL, blur: 3, actors: [HO({ pose: 'wandUp', expr: 'awe', armB: { sh: 150, el: -10, hand: 'hold', under: g({ transform: 'rotate(-30)' }, HWAND) } })],
  under: (e) => rect(0, 0, e.w, e.h, { fill: '#120a08' }),
  over: (e) => { const h = e.anchors?.harry?.handB, hd = e.anchors?.harry?.head, hr = e.anchors?.harry?.hr ?? 100; const R = rng(7); let o = ''; if (!h) return o; for (let i = 0; i < 160; i++) { const a = R() * Math.PI * 2, d = R.range(30, 560), px = h[0] + 60 + Math.cos(a) * d, py = h[1] - 300 + Math.sin(a) * d * 0.7; if (hd && Math.hypot(px - hd[0], py - hd[1]) < hr * 1.9) continue; o += circle(px, py, R.range(3, 10), { fill: R.pick(['#ff6a5a', '#ffd26a', '#6ad0ff', '#9aff8a', '#f6a0ff', '#fff']), opacity: R.range(0.6, 1) }); } return K.glow(h[0] + 60, h[1] - 300, 560, '#ffe9a8', 0.7) + o + FX.sparkles([[h[0] - 60, h[1] - 380, 34], [h[0] + 260, h[1] - 260, 26], [h[0] + 120, h[1] - 520, 30], [h[0] + 380, h[1] - 480, 20]], { col: '#fff6d0' }); } },
  [cap('Multicoloured sparks.', 44, 40, { w: 280 })], { mood: 'candle', alt: 'A burst of multicoloured sparks pours from the wand. Harry\'s face is lit with wonder.' });
ep.panel(880, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#0c0a14' });
  out += `<defs><radialGradient id="eyeOpen" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff6d0"/><stop offset="0.35" stop-color="#ffd26a"/><stop offset="0.7" stop-color="#c46a2a" stop-opacity="0.5"/><stop offset="1" stop-color="#0c0a14" stop-opacity="0"/></radialGradient></defs>`;
  out += path(`M${w * 0.05},${h * 0.5} Q${w * 0.5},${h * 0.08} ${w * 0.95},${h * 0.5} Q${w * 0.5},${h * 0.92} ${w * 0.05},${h * 0.5}Z`, { fill: 'url(#eyeOpen)' });
  const R = rng(3); for (let i = 0; i < 40; i++) { const a = R() * Math.PI * 2, d = R.range(80, 360); out += line(w / 2 + Math.cos(a) * d * 0.4, h / 2 + Math.sin(a) * d * 0.3, w / 2 + Math.cos(a) * d, h / 2 + Math.sin(a) * d * 0.7, { stroke: '#ffe9a8', 'stroke-width': R.range(1, 3), opacity: R.range(0.3, 0.8) }); }
  return out;
}, [dark('He had *felt* it: magic pouring up his arm. And in that instant he realised he had always had that sense. It was like having eyes, but keeping them always closed, so that you didn\'t even know you were seeing darkness.', 400, 130, { w: 580 }),
    dark('And then one day, the eye opened.', 400, 790, { w: 440 })], { y: 260, ph: 460, shape: 'eye', frame: 'glow', glow: '#ffd26a', bg: '#0c0a14', alt: 'Abstract: an eye of golden light opening in darkness.' });
ep.panel(700, { cam: { on: ['harry'], fr: 'close', dy: 0.3 }, bg: OL, blur: 3, actors: [HO({ expr: { base: 'awe', eyes: { teary: true } } })] },
  [inner('Harry', '*I can do magic.*', 400, 90, { w: 300 }),
   inner('Harry', '*Me. As in, me personally.*\n*I am a wizard.*', 400, 610, { w: 420 })], { mood: 'candle' });
ep.panel(820, { cam: { on: ['ollivander'], fr: 'close', zoom: 0.85, dy: 0.15 }, bg: OL, blur: 3, actors: [OLV({ expr: { base: 'calm', eyes: { open: 1.1, irisScale: 0.9 } } })], over: (e) => FX.frost(e.w, e.h, 0.2, 21) },
  [whisper('Ollivander', 'Curious. Very curious…', 290, 80, { w: 380 }),
   whisper('Ollivander', 'It is very curious indeed that you should be destined for this wand, when its brother… why, its brother gave you that scar.', 400, 660, { w: 560, size: 27 })], { mood: 'candle' });
ep.panel(460, { cam: { on: ['harry'], fr: 'eyes' }, bg: OL, blur: 3, actors: [HO({ expr: 'shock' })] }, [], { mood: 'candle', alt: 'Harry\'s eyes widen.' });
const bayes = (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  const R = rng(5); for (let i = 0; i < 200; i++) out += rect(40 + (i % 25) * 28, 90 + Math.floor(i / 25) * 26, 20, 16, { fill: i === 137 ? '#c43a32' : '#b9ad92', opacity: i === 137 ? 1 : 0.6 });
  out += circle(386, 228, 24, { fill: 'none', stroke: '#c43a32', 'stroke-width': 4 });
  out += T(w / 2, 62, 'thousands of wands…', 40) + T(w / 2, h - 88, '…and I get the brother of HIS?', 44, 'middle', '#c43a32') + T(w / 2, h - 36, 'p(coincidence) ≈ 1/1000', 36);
  return out;
};
ep.panel(470, bayes, [], { shape: 'torn', frame: 'paper', seed: 11, alt: 'Harry\'s notes: a grid of hundreds of wand boxes, one circled in red. "…and I get the brother of HIS? p(coincidence) ≈ 1/1000."' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'bust', dx: -0.7, dy: 0.7 }, bg: OL, blur: 2, actors: [MO] },
  [say('McGonagall', 'How peculiar.', 220, 150, { w: 260 }),
   cap('…and that was all she said. In no *imaginable* world would Harry have just gone "Hm" and walked out without even *trying* to form a hypothesis.', 44, 560, { w: 480, size: 26 })], { mood: 'candle' });

// =============================================================== the street at sunset — loose ends
const FIXED_SMILE = { base: 'smile', eyes: { open: 1, squint: 0 }, mouth: { type: 'smile', open: 0.25, curve: 0.7 } }; // McGonagall's very, very calm expression
const DA = (o = {}) => () => L.diagonAlley({ seed: 7, night: false, ...o });
const HS = (o = {}) => ({ def: harry, id: 'harry', x: 1000, y: 1080, s: 1.1, turn: 0.4, pose: 'stand', ...o });
const MS = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 1250, y: 1090, turn: -0.4, pose: 'stand', expr: 'calm', ...o });
ep.panel(960, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist', dy: -1.4 }, bg: DA({ start: 5 }), actors: [HS({ expr: 'calm', pose: 'walk' }), MS({ turn: 0.4, pose: 'walk2' })] },
  [say('McGonagall', 'You\'re a full wizard now. Congratulations.', 500, 90, { w: 360 }),
   say('McGonagall', 'And what do you think of the wizarding world?', 540, 285, { w: 340 })], { mood: 'dusk' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 5 }), blur: 2, actors: [HS({ expr: 'think' })] },
  [say('Harry', 'It\'s strange. I ought to be thinking about everything I\'ve seen of magic. And instead I\'m distracted by relative trivialities. Like the whole Boy-Who-Lived thing.', 400, 180, { w: 600, size: 28, fixed: true }),
   say('McGonagall', 'Really? You don\'t say.', 620, 580, { w: 240, tail: [790, 640] })], { mood: 'dusk' });
ep.panel(1000, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = `<defs><linearGradient id="doom" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a1a1a"/><stop offset="1" stop-color="#e8773a"/></linearGradient></defs>` + rect(0, 0, w, h, { fill: 'url(#doom)' });
  out += `<defs><linearGradient id="lava" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0a0"/><stop offset="0.5" stop-color="#ffb04a"/><stop offset="1" stop-color="#e8552a"/></linearGradient></defs>`;
  out += path(`M0,${h} L0,${h * 0.62} L${w * 0.2},${h * 0.5} L${w * 0.4},${h * 0.38} L${w * 0.6},${h * 0.38} L${w * 0.82},${h * 0.52} L${w},${h * 0.46} L${w},${h}Z`, { fill: '#1a0e0a' });
  out += K.glow(w * 0.5, h * 0.38, 260, '#ffb04a', 0.9);
  out += path(`M${w * 0.42},${h * 0.385} L${w * 0.58},${h * 0.385} Q${w * 0.6},${h * 0.6} ${w * 0.8},${h} L${w * 0.2},${h} Q${w * 0.4},${h * 0.6} ${w * 0.42},${h * 0.385}Z`, { fill: 'url(#lava)' });
  const adult = (x, y) => g({ transform: `translate(${x},${y})` }, circle(0, -168, 19, { fill: '#000' }), path('M-6,-152 L6,-152 L16,-140 L30,-60 L36,0 L-36,0 L-30,-60 L-16,-140Z', { fill: '#000' }));
  const tot = (x, y) => g({ transform: `translate(${x},${y})` }, circle(0, -74, 17, { fill: '#000' }), path('M-10,-60 L10,-60 L20,0 L-20,0Z', { fill: '#000' }), line(6, -52, 30, -96, { stroke: '#000', 'stroke-width': 9, 'stroke-linecap': 'round' }));
  out += adult(w * 0.36, h * 0.9) + tot(w * 0.5, h * 0.9) + adult(w * 0.64, h * 0.9);
  const rx = w * 0.5 + 24, ry = h * 0.66;
  out += K.glow(rx, ry, 70, '#fff6d0', 0.9) + circle(rx, ry, 13, { fill: 'none', stroke: '#1a0e0a', 'stroke-width': 9 }) + circle(rx, ry, 13, { fill: 'none', stroke: '#ffd84a', 'stroke-width': 5 });
  return out;
}, [say('Harry', 'It\'s like you\'re Frodo Baggins, and you find out your parents took you to Mount Doom and had you toss in the Ring when you were one year old. And you don\'t even remember it.', 400, 150, { w: 580, size: 28, tail: null })],
  { y: 290, ph: 690, shape: 'cloud', seed: 4, alt: 'Imagined: two tiny silhouettes before a volcano, one of them a toddler throwing a glinting ring.' });
ep.panel(760, { cam: { on: ['harry'], fr: 'waist' }, bg: DA({ start: 5 }), actors: [HS({ expr: 'sad', pose: 'shrug', armF: { sh: -25, el: -70, hand: 'palm' }, armB: { sh: 25, el: 70, hand: 'palm' } })] },
  [say('Harry', 'It\'s almost enough to make me wish there were *some* loose ends from the quest. So I could say I really *participated* somehow.', 400, 160, { w: 520, fixed: true })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [MS({ expr: { base: 'calm', mouth: { type: 'flat' } } })] },
  [say('McGonagall', 'Oh? What did you have in mind?', 540, 100, { w: 300 })], { mood: 'dusk' });
ep.panel(620, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust' }, bg: DA({ start: 5 }), actors: [HS({ expr: 'think' }), MS({ expr: 'angry' })] },
  [say('Harry', 'Well, you mentioned my parents were betrayed. Who betrayed them?', 290, 130, { w: 400, fixed: true }),
   say('McGonagall', 'Sirius Black.\nHe\'s in Azkaban.\nWizarding prison.', 560, 490, { w: 300, fixed: true })], { mood: 'dusk' });
ep.panel(900, { cam: { on: ['harry'], fr: 'bust', dy: -0.45, zoom: 0.8 }, bg: DA({ start: 5 }), blur: 2, actors: [HS({ expr: 'scheme', pose: 'gesture' })] },
  [say('Harry', 'How probable is it that Sirius Black breaks out of prison and I have to defeat him in a spectacular duel? Or better yet, put a large bounty on his head and hide out in Australia while I wait for the results?', 400, 205, { w: 560, size: 27 })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [MS({ expr: 'unimpressed' })] },
  [say('McGonagall', 'Not likely. No-one has ever escaped from Azkaban.', 540, 130, { w: 300, fixed: true })], { mood: 'dusk' });
ep.cutout(1240, { cam: { head: 'harry', hw: 0.27, hx: 0.5, hy: 0.39 }, actors: [HS({ expr: 'delight', pose: 'armsUp' })] },
  [say('Harry', 'All right then, it\'s all nicely wrapped up. Or… maybe the Dark Lord didn\'t *really* die that night! His spirit lingers, whispering to people in nightmares, searching for a way back.', 400, 160, { w: 560, size: 27, fixed: true }),
   say('Harry', 'And now, in accordance with the ancient prophecy, he and I are locked in a deadly duel where *the winner shall lose and the loser shall win—*', 400, 1075, { w: 560, size: 27, fixed: true, noTail: true })], { mood: 'dusk' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: DA({ start: 5 }), blur: 1, actors: [MS({ expr: { base: 'shock', eyes: { lookX: 1, style: 'normal' } }, turn: 0.6 })], over: (e) => FX.emanata(e.anchors?.mcgonagall?.head?.[0] ?? 400, e.anchors?.mcgonagall?.head?.[1] ?? 300, 180, { n: 5 }) },
  [cap('Professor McGonagall\'s head swivelled, and her eyes darted around, as though to search the street for listeners.', 44, 34, { w: 440 })], { mood: 'dusk' });
ep.panel(540, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: 'unimpressed' })] },
  [say('Harry', 'I\'m *joking*, Professor. Sheesh, why do you always take everything so seriously?', 400, 125, { w: 480 })], { mood: 'dusk' });
ep.panel(460, { cam: { head: 'harry', hw: 0.85, hx: 0.5, hy: 0.57 }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: 'blank' })] },
  [cap('A slow sinking sensation began to dawn in the pit of Harry\'s stomach.', 44, 30, { w: 420 })], { mood: 'dusk' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'close', zoom: 0.85, dx: -0.45, dy: -0.1 }, bg: DA({ start: 5 }), blur: 3, actors: [MS({ expr: FIXED_SMILE })] },
  [cap('Professor McGonagall looked at Harry with a calm expression. A very, *very* calm expression.', 44, 34, { w: 420 }),
   say('McGonagall', 'Of course you are, Mr Potter.', 215, 620, { w: 280 })], { mood: 'dusk', alt: 'McGonagall wears a bright, fixed, perfectly controlled smile.' });
ep.panel(320, backdrop('#f4ecd6'), [inner('Harry', '*Aw crap.*', 400, 160, { w: 240, size: 48 })], { alt: 'Aw crap.' });
ep.panel(980, { cam: { on: ['harry'], fr: 'bust', zoom: 0.9, dy: 0.05 }, bg: DA({ start: 5 }), blur: 2, actors: [HS({ expr: 'exasperated', pose: 'facepalm', armF: { sh: 90, el: 115, hand: 'palm', hr: 0 } })] },
  [say('Harry', 'He\'s *not* dead, is he.', 400, 90, { w: 400 }),
   say('Harry', 'Of *course* he\'s alive. Just because *someone* said his body was burned to a crisp, I can\'t *imagine* why I thought he was dead. *Clearly* I have much to learn about proper *pessimism.*', 400, 820, { w: 560, size: 27 })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: 'pained' })] },
  [say('Harry', 'At least tell me there\'s not really a prophecy…', 400, 100, { w: 420 })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [MS({ expr: FIXED_SMILE })] },
  [note('(fixed smile)', 140, 170, { size: 34, w: 220, fixed: true })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: 'rant' })] },
  [shout('Harry', 'Oh, you have *got* to be kidding me.', 400, 115, { w: 440, size: 32, fixed: true })], { mood: 'dusk' });
ep.panel(1000, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust', dy: -1.45 }, bg: DA({ start: 5 }), actors: [HS({ expr: 'cross', pose: 'crossArms' }), MS({ expr: 'worried' })] },
  [say('McGonagall', 'Mr Potter, you shouldn\'t go inventing things to worry about—', 520, 130, { w: 380, fixed: true }),
   say('Harry', 'Are you *actually* going to tell me that? Imagine my reaction later, when I find out there *was* something to worry about after all.', 250, 470, { w: 370, fixed: true, shape: 'box' })], { mood: 'dusk' });
ep.panel(820, { cam: { x: 1260, y: 610, w: 1020 }, bg: DA({ start: 5 }), actors: [HS({ expr: 'suspicious', turn: 0.6 }), MS({ expr: 'suspicious', turn: 0.6 }), { def: orangeMan, id: 'orange', x: 1600, y: 1070, turn: -0.6, pose: 'walk', s: 0.95 }] },
  [cap('Then both of them shut up, as a man in flowing orange robes appeared on the street and slowly passed them by. Professor McGonagall\'s eyes tracked him, unobtrusively.', 44, 34, { w: 480, size: 26 })], { mood: 'dusk', alt: 'A man in flowing orange robes passes. McGonagall watches him go.' });
// =============================================================== the cold
ep.setBg('#1c2a3a');
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: C.paper, bottom: '#1c2a3a' } });
ep.panel(1000, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust', dy: -1.45 }, bg: DA({ start: 5 }), actors: [HS({ expr: 'determined' }), MS({ expr: 'stern' })] },
  [say('Harry', 'Are you going to tell me the truth now, Professor? And don\'t bother trying to wave it off. I\'m not stupid.', 310, 150, { w: 440, fixed: true }),
   shout('McGonagall', 'You\'re *eleven years old*, Mr Potter!', 535, 405, { w: 310, size: 29, fixed: true })], { mood: 'dusk' });
ep.panel(500, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: 'cold' })], over: (e) => FX.frost(e.w, e.h, 0.4, 3) },
  [cold('Harry', 'And therefore subhuman. Sorry. For a moment there, I *forgot.*', 400, 132, { w: 420, fixed: true })], { mood: 'cold' });
ep.panel(1060, { cam: { on: ['mcgonagall'], fr: 'bust', zoom: 0.8, dx: -0.35, dy: -0.1 }, bg: DA({ start: 5 }), blur: 2, actors: [MS({ expr: 'angry', pose: 'point' })] },
  [shout('McGonagall', 'These are dreadful and important matters! They are *secret!* It is a *catastrophe* that you, still a child, know even this much!', 400, 200, { w: 380, size: 27, fixed: true }),
   shout('McGonagall', 'You must not tell *anyone*, do you understand? Absolutely no-one!', 430, 930, { w: 440, size: 28, fixed: true })], { mood: 'dusk' });
ep.bleed(900, { cam: { head: 'harry', hw: 0.7, hx: 0.5, hy: 0.49 }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: { base: 'cold', glint: false } })],
  over: (e) => FX.frost(e.w, e.h, 0.9, 5) + rect(0, 0, e.w, e.h, { fill: '#9bc4e8', opacity: 0.15 }) },
  [dark('As sometimes happened when Harry got *sufficiently* angry, his blood went cold instead of hot.', 400, 100, { w: 580 }),
   dark('And a terrible dark clarity descended over his mind, mapping out tactics and assessing their consequences with iron realism.', 400, 790, { w: 580 })], { mood: 'cold', alt: 'Harry\'s eyes, pupils shrunk to pinpricks. Frost grows over everything.' });
ep.panel(840, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#0e1a28' }) + FX.frost(ctx.w, ctx.h, 0.6, 8),
  [cold('Harry', 'Point out that you have a right to know: *failure.* Children have no rights to know anything, in her eyes.', 400, 150, { w: 520 }),
   cold('Harry', 'Say you won\'t be friends any more: *failure.* She does not value your friendship enough.', 400, 410, { w: 520 }),
   cold('Harry', 'Point out you\'ll be in danger if you don\'t know: *failure.* Plans are already made around your ignorance.', 400, 665, { w: 520 })], { border: 'none', alt: 'Cold, blue captions list Harry\'s options and cross each out.' });
ep.panel(560, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#0e1a28' }) + FX.frost(ctx.w, ctx.h, 0.6, 9),
  [cold('Harry', 'Justice and reason will both fail. You must find something you have that she wants. Or something you can do that she fears.', 400, 150, { w: 580 }),
   cold('Harry', 'Ah.', 400, 400, { w: 120 })], { border: 'none' });
ep.panel(1100, { cam: { on: ['harry'], fr: 'bust', zoom: 0.9, dy: 0.1 }, bg: DA({ start: 5 }), blur: 2, actors: [HS({ expr: 'coldSmile', pose: 'crossArms' })], over: (e) => FX.frost(e.w, e.h, 0.5, 14) },
  [cold('Harry', 'Well then, Professor. It sounds like I have something you want.', 400, 100, { w: 480 }),
   cold('Harry', 'You can tell me the truth. The *whole* truth. In return, I will keep your secrets. Or you can try to keep me ignorant so you can use me as a pawn. In which case I will owe you nothing.', 400, 950, { w: 540, tail: [370, 718] })], { mood: 'cold' });
ep.panel(820, { cam: { on: ['mcgonagall'], fr: 'bust', zoom: 0.9 }, actors: [MS({ expr: 'angry', pose: 'fists' })], under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { bg: '#2a0808', col: '#8a1a1a', op: 0.8 }) },
  [shout('McGonagall', 'How *dare* you!', 400, 110, { w: 320, size: 40, fixed: true })], { mood: 'dread', shape: 'burst', points: 16, seed: 9, panel: { borderColor: '#d8452e', borderWidth: 6 } });
ep.panel(520, { cam: { head: 'harry', hw: 0.8, hx: 0.5, hy: 0.37 }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: 'menace' })], over: (e) => FX.frost(e.w, e.h, 0.6, 15) },
  [cold('Harry', '*How dare YOU.*', 400, 60, { w: 300, fixed: true })], { mood: 'cold', shape: 'eye', frame: 'glow', glow: '#9bc4e8', y: 70, ph: 440 });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [MS({ expr: 'horror' })] },
  [say('McGonagall', 'You would *blackmail* me?', 540, 110, { w: 260 })], { mood: 'dusk' });
ep.panel(1120, { cam: { on: ['harry'], fr: 'waist', zoom: 0.9 }, bg: DA({ start: 5 }), actors: [HS({ expr: 'cold', pose: 'lecture' })], over: (e) => FX.frost(e.w, e.h, 0.5, 16) },
  [cold('Harry', 'I am *offering* you a *favour.* If you refuse, I will have every natural motive to make inquiries elsewhere. Not to spite you, but because I *have to know!*', 400, 170, { w: 520 }),
   cold('Harry', 'Get past your pointless anger at a *child* who you think ought to obey you, and you\'ll realise any sane adult would do the same! *How would you feel if it was you?*', 400, 935, { w: 520, tail: [340, 790] })], { mood: 'cold' });
ep.panel(980, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: 0.1 }, bg: DA({ start: 5 }), blur: 2, actors: [HS({ expr: 'cold' })], over: (e) => FX.frost(e.w, e.h, 0.35, 17) },
  [say('Harry', 'You don\'t have to decide right away.', 400, 105, { w: 320, fixed: true }),
   cold('Harry', 'But I\'ll warn you of one thing: don\'t try that Obliviation spell on me. Some time ago I worked out a signal, and I have already sent it to myself. If I find that signal and I don\'t *remember* sending it…', 400, 780, { w: 520, size: 27 })], { mood: 'cold' });
ep.panel(960, { cam: { on: ['mcgonagall'], fr: 'bust', dx: -0.45, dy: -0.35, zoom: 0.8 }, bg: DA({ start: 5 }), blur: 2, actors: [MS({ expr: 'pained', pose: 'slump' })] },
  [say('McGonagall', 'I wasn\'t thinking of Obliviating you, Mr Potter. But why would you have *invented* such a signal, if you didn\'t know about—', 300, 130, { w: 440, size: 28 }),
   say('Harry', 'Muggle science fiction. *Just in case.* And no, I won\'t tell you the signal. I\'m not dumb.', 190, 780, { w: 320, shape: 'box', tail: [20, 830] })], { mood: 'dusk' });
ep.panel(1260, { cam: { on: ['mcgonagall'], fr: 'waist' }, bg: DA({ start: 5 }), actors: [MS({ expr: 'sad', pose: 'slump', lean: 10 })] },
  [cap('She seemed to fold in on herself, and suddenly looked very old, and very tired.', 44, 34, { w: 540 }),
   say('McGonagall', 'This has been an exhausting day, Mr Potter. I will trust you not to speak of this until I have had time to think.', 520, 330, { w: 440, size: 28 }),
   say('McGonagall', 'Keep in mind that only two other people in the whole world know about this: Headmaster Albus Dumbledore, and Professor Severus Snape.', 400, 980, { w: 560, size: 26 })], { mood: 'dusk' });
ep.setBg(C.paper);
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: '#1c2a3a', bottom: C.paper } });
ep.panel(940, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.15 }, bg: DA({ start: 6 }), blur: 2, actors: [HS({ expr: 'exasperated', pose: 'walk' })] },
  [cap('New information. That was a peace offering. Harry accepted it, and slowly, his blood began to warm again.', 44, 30, { w: 440 }),
   say('Harry', 'So now I\'ve got to find some way to kill an immortal Dark Wizard. I *really* wish you\'d told me that *before* I started shopping.', 400, 770, { w: 520, fixed: true, tail: [410, 612] })], { mood: 'dusk' });

// =============================================================== the trunk shop
const TS = () => L.trunkShop();
const SEL = (o = {}) => ({ def: trunkSeller, id: 'seller', x: 1420, y: 1060, turn: -0.4, pose: 'present', expr: 'smile', ...o });
const HT = (o = {}) => ({ def: harry, id: 'harry', x: 700, y: 1080, s: 1.1, turn: 0.4, pose: 'stand', ...o });
const MT = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 500, y: 1090, turn: 0.4, pose: 'stand', expr: 'calm', ...o });
const DTRUNK = (e) => L.trunk(1060, 1060, 1.3, '#7a4e2e', true, { stairs: false });
ep.panel(820, { cam: { x: 960, y: 590, w: 1240 }, bg: TS, actors: [MT(), HT({ expr: 'awe' }), DTRUNK, SEL()] },
  [cap('The trunk shop was richer than any other shop Harry had visited: lush curtains, polished wood, trunks on ivory platforms. The salesman spoke with exquisite, oily politeness.', 44, 34, { w: 560, size: 26 })], { mood: 'warm', alt: 'A luxurious trunk shop. In the middle, a heavy wooden trunk carved with a guardian dragon.' });
ep.panel(1010, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#3a4a3a' }) + K.glow(ctx.w / 2, ctx.h * 0.5, 500, C.candle, 0.35) + L.trunk(ctx.w / 2, ctx.h * 0.62, 1.4, '#7a4e2e', true, { stairs: true }) + g({ transform: `translate(${ctx.w * 0.5},${ctx.h * 0.74})` }, rect(-60, 0, 120, 90, { fill: '#f3c66f', opacity: 0.8 }), K.glow(0, 40, 150, C.candle, 0.6)),
  [cap('Charmed to be light. Shrinks on command. Sprouts small clawed tentacles and squirms after its owner. And the important part—a handle on the bottom that slides out a *staircase*, down to a small lighted room that would hold around twelve bookcases.', 44, 30, { w: 580, size: 25 }),
   inner('Harry', 'If they made luggage like this, why did anyone bother owning a house?', 400, 920, { w: 520 })], { mood: 'warm', alt: 'The dragon trunk, with a hidden staircase glowing below it.' });
ep.panel(700, { cam: { on: ['seller'], fr: 'bust', dx: -0.6, dy: -0.6 }, bg: TS, blur: 2, actors: [SEL({ expr: 'smug' })] },
  [say('Seller', 'One hundred and eight\nGalleons, young sir.\nLightly used.', 290, 125, { w: 420, fixed: true })], { mood: 'warm' });
ep.panel(520, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#6b4429' }) + K.glow(ctx.w * 0.42, ctx.h * 0.6, 260, '#f7c86a', 0.3) + g({ transform: `translate(${ctx.w * 0.4},${ctx.h * 0.56}) scale(1.6)` }, coinBag(3)) + g({ transform: `translate(${ctx.w * 0.72},${ctx.h * 0.72}) scale(3)` }, text(0, 0, '97', { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': 60, fill: '#e04a3a', 'text-anchor': 'middle' })),
  [cap('Ninety-seven Galleons. That was how much was left in the bag.', 44, 30, { w: 420 })], { mood: 'warm' });
ep.panel(840, { cam: { on: ['mcgonagall'], fr: 'bust', dx: 0.6, dy: -0.15, zoom: 0.9 }, bg: TS, blur: 2, actors: [MT({ expr: 'pained' })] },
  [say('McGonagall', 'I\'m sorry, young man. This is entirely my fault. I would offer to take you back to Gringotts, but the bank will be closed for all but emergencies now.', 430, 185, { w: 480, fixed: true }),
   say('McGonagall', 'Well. We may as well go, I suppose.', 552, 700, { w: 280, fixed: true })], { mood: 'warm' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: TS, blur: 3, actors: [HT({ expr: 'think' })] },
  [inner('Harry', 'She hadn\'t lost it completely when a child dared defy her. She hadn\'t been happy. But she\'d *thought*, instead of exploding. Most adults wouldn\'t have been capable of even that much…', 400, 120, { w: 560, size: 28 })], { mood: 'warm' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: TS, blur: 3, actors: [HT({ expr: 'determined' })] }, [say('Harry', 'Professor?', 400, 100, { w: 170 })], { mood: 'warm' });
ep.panel(1220, { cam: { on: ['harry'], fr: 'waist', zoom: 0.85, dy: -0.2 }, bg: TS, actors: [HT({ expr: 'focus', pose: 'lecture' })] },
  [say('Harry', 'You thought a hundred Galleons would be more than enough. That\'s the sort of thing the studies show: people think they\'re leaving themselves a little error margin, and they\'re not pessimistic enough.', 400, 205, { w: 580, size: 27, fixed: true }),
   say('Harry', 'If it\'d been up to me, I\'d have taken *two hundred.* But I thought you\'d be angry at me just for asking. Was I wrong?', 400, 830, { w: 540, size: 28 }),
   say('McGonagall', 'I suppose I must confess that you are right. But, young man…', 300, 1085, { w: 400, tail: [20, 1130], fixed: true })], { mood: 'warm' });
ep.panel(1040, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.15 }, bg: TS, blur: 2, actors: [HT({ expr: 'sad', pose: 'stand' })] },
  [say('Harry', 'That sort of thing is why I have trouble trusting adults. They get *angry* if you even *try* to reason with them.', 400, 162, { w: 520, fixed: true }),
   say('Harry', 'So if I had anything *really important* to do, I couldn\'t trust you. Even if you listened with deep concern, you\'d never *change your actions* because of anything I said.', 400, 855, { w: 540, size: 27, fixed: true })], { mood: 'warm' });
ep.panel(460, { cam: { on: ['seller'], fr: 'close' }, bg: TS, blur: 3, actors: [SEL({ expr: { base: 'awe', eyes: { sparkle: false } } })] },
  [cap('The salesman was watching them both with unabashed fascination.', 44, 30, { w: 400 })], { mood: 'warm' });
ep.panel(880, { cam: { on: ['mcgonagall'], fr: 'bust', dx: 0.5, dy: -0.4, zoom: 0.9 }, bg: TS, blur: 2, actors: [MT({ expr: 'warm' })] },
  [say('McGonagall', 'I can understand your point of view. If I sometimes seem too strict, please remember that I have been Head of Gryffindor House for what feels like several thousand years.', 440, 200, { w: 460, size: 27, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist', dy: -1.1 }, bg: TS, actors: [MT({ expr: 'confused' }), HT({ expr: 'hopeful', pose: 'gesture' })] },
  [say('Harry', 'So—suppose I had a way to get more Galleons *without* going back to Gringotts, but it involved me violating the role of an obedient child.', 400, 180, { w: 520, size: 28, fixed: true, noTail: true }),
   say('Harry', 'Would it be all right, even though it would involve a child being insolent to an adult… in retrospect?', 470, 420, { w: 440, size: 28, fixed: true }),
   say('McGonagall', 'I… suppose…', 200, 720, { w: 220, fixed: true })], { mood: 'warm' });
ep.panel(760, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#5a3a22' }) + K.glow(ctx.w / 2, ctx.h * 0.4, 400, '#f7c86a', 0.5) + g({ transform: `translate(${ctx.w * 0.42},${ctx.h * 0.74})` }, pouch(2.2, { open: true })) +
  g({ transform: `translate(${ctx.w * 0.56},${ctx.h * 0.4}) scale(2.6)` }, path('M-60,40 L-20,-10 L20,10 L-20,60Z', { fill: '#c9922e', stroke: C.ink, 'stroke-width': 3 }), ellipse(0, 0, 34, 28, { fill: '#f3d2b5', stroke: C.ink, 'stroke-width': 3 }), ...[[-14, -18], [8, -24], [20, -6], [-2, -34], [-20, -2], [12, 8], [-10, 12], [26, -24], [0, -8], [-24, -22], [14, -40]].map(([x, y]) => g({ transform: `translate(${x},${y})` }, galleon(11)))),
  [say('Harry', '*Eleven Galleons originally from my family vault.*', 400, 105, { w: 420, tail: null, fixed: true })], { mood: 'warm', alt: 'Harry\'s hand comes out of the pouch holding eleven gold Galleons.' });
ep.panel(820, { cam: { on: ['mcgonagall'], fr: 'bust', zoom: 0.8, dx: 0.35, dy: -0.35 }, bg: TS, blur: 2, actors: [MT({ expr: 'yell', pose: 'point' })] },
  [shout('McGonagall', '*Where* did you get that—', 430, 110, { w: 420, size: 32, fixed: true }), say('Harry', 'From my family vault, like I said.', 590, 330, { w: 300, tail: [790, 400], fixed: true }), shout('McGonagall', '*How?*', 620, 560, { w: 150, size: 34 })], { mood: 'warm' });
ep.multi(470, [
  { x: M, y: 18, w: 412, h: 434, mood: 'warm', shape: 'poly', pts: [[0, 0], [1, 0], [352 / 412, 1], [0, 1]], art: { cam: { on: ['harry'], fr: 'close', dx: -0.1 }, bg: TS, blur: 3, actors: [HT({ expr: 'smug' })] } },
  { x: 390, y: 18, w: 392, h: 434, mood: 'warm', shape: 'poly', pts: [[60 / 392, 0], [1, 0], [1, 1], [0, 1]], art: { cam: { on: ['mcgonagall'], fr: 'close', dx: 0.1 }, bg: TS, blur: 3, actors: [MT({ expr: 'rant' })] } },
], [say('Harry', 'Magic.', 150, 80, { w: 140, fixed: true }), shout('McGonagall', 'That\'s hardly an answer!', 606, 100, { w: 240, size: 28, fixed: true })]);
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: TS, blur: 3, actors: [MT({ expr: 'blank' })] }, [cap('…and then stopped, blinking.', 44, 30, { w: 300 })], { mood: 'warm' });
ep.panel(980, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.15 }, bg: TS, blur: 2, actors: [HT({ expr: 'grin', pose: 'present' })] },
  [say('Harry', 'No, it isn\'t, is it? I *ought* to claim I discovered the true secret of how the pouch works. But actually it\'s from when I fell into that pile of gold, and shoved some Galleons into my pocket.', 400, 120, { w: 560, size: 27 }),
   say('Harry', 'So. Are you angry at me for defying your authority? Or glad that we succeeded in our important mission?', 400, 830, { w: 540 })], { mood: 'warm' });
ep.panel(460, { cam: { head: 'seller', hw: 0.75, hx: 0.5, hy: 0.46 }, bg: TS, blur: 3, actors: [SEL({ expr: 'shock' })] }, [cap('The salesman\'s eyes were wide like saucers.', 44, 30, { w: 520 })], { mood: 'warm' });
ep.beat(300, [capC('The tall witch stood there, silent, for almost a full minute.', 400, 150, { w: 480 })]);
ep.panel(1000, { cam: { on: ['mcgonagall'], fr: 'bust', dx: 0.45, zoom: 0.85, dy: -0.1 }, bg: TS, blur: 2, actors: [MT({ expr: 'stern' })] },
  [say('McGonagall', 'Discipline at Hogwarts *must* be enforced. For the sake of *all* the students. And that *must* include courtesy and obedience from you to *all* professors.', 390, 170, { w: 520, size: 28, fixed: true }),
   say('Harry', 'I understand, Professor McGonagall.', 600, 540, { w: 240, tail: [790, 620], fixed: true }),
   say('McGonagall', 'Good. Now let us buy that trunk, and go home.', 315, 870, { w: 380, fixed: true })], { mood: 'warm' });
ep.panel(600, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  for (let y = 40; y < h; y += 34) out += line(0, y, w, y, { stroke: '#b9c9d8', 'stroke-width': 1 });
  out += T(60, 110, 'ADULTS WHO CHANGED THEIR ACTIONS', 36, 'start') + T(60, 150, 'BECAUSE OF SOMETHING I SAID:', 36, 'start');
  out += line(60, 170, w - 60, 170, { stroke: '#2d2a4a', 'stroke-width': 2 });
  out += T(60, 262, 'Minerva McGonagall', 52, 'start') + T(w - 120, 268, '+1', 76, 'middle', '#2f7a3a');
  out += ellipse(w - 118, 248, 52, 38, { fill: 'none', stroke: '#2f7a3a', 'stroke-width': 4, transform: `rotate(-8 ${w - 118} 248)` });
  out += T(60, 360, '(first entry)', 30, 'start', '#8a7d68');
  return out;
}, [cap('That was the first time his careful reasoning had ever worked on *anyone.*', 44, 440, { w: 460 })], { shape: 'torn', frame: 'paper', seed: 17, alt: 'Harry\'s mental ledger, titled "Adults who changed their actions because of something I said": one entry, "Minerva McGonagall, +1", circled. "(first entry)".' });
ep.panel(1040, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: TS, blur: 2, actors: [HT({ expr: 'wince', pose: 'bow' })] },
  [say('Harry', 'Thank you very much, Professor. Can you finish up the purchase for me? I\'ve got to visit the lavatory.', 400, 125, { w: 520, fixed: true }),
   say('Seller', 'May I inquire who *that* was, Madam McGonagall? I take it he is Slytherin—third-year, perhaps?—and from a prominent family—', 410, 870, { w: 560, size: 26, tail: [790, 930], fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['harry'], fr: 'close', zoom: 0.85, dy: 0.1 }, actors: [HT({ expr: 'wince' })],
  under: (e) => { let o = rect(0, 0, e.w, e.h, { fill: '#6b8a70' }); for (let y = 0; y < e.h; y += 80) o += line(0, y, e.w, y, { stroke: '#5a7760', 'stroke-width': 3 }); for (let x = 0; x < e.w; x += 80) o += line(x, 0, x, e.h, { stroke: '#5a7760', 'stroke-width': 3 }); return o; },
  over: (e) => FX.sfxText(e.w * 0.76, e.h * 0.14, 'SLAM', { size: 110, rot: -8 }) },
  [cap('Behind the locked lavatory door, Harry grabbed the magical self-cleaning towel and, with shaky hands, wiped the sweat off his forehead. His whole body was soaked.', 44, 610, { w: 560, size: 26 })], { shape: 'slant', slant: 60, alt: 'SLAM. Harry, alone, shaking and drenched in sweat.' });

// =============================================================== the courtyard, goodbye
const CY = () => L.courtyard({ mark: false });
const HC = (o = {}) => ({ def: harry, id: 'harry', x: 700, y: 1040, s: 1.1, turn: 0.4, pose: 'stand', ...o });
const MC = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 920, y: 1060, turn: -0.4, pose: 'stand', expr: 'calm', ...o });
ep.panel(940, { cam: { on: ['harry', 'mcgonagall'], fr: 'knees', dy: -1.15, zoom: 0.85 }, bg: CY, actors: [HC({ expr: 'calm' }), L.trunk(460, 1060, 0.4, '#7a4e2e', true), MC()] },
  [cap('Sunset, in the leaf-dusted courtyard between Diagon Alley and the entire Muggle world.', 44, 34, { w: 460 }),
   say('McGonagall', 'This has been the strangest day of my life for… many a year. Since the day I learned that a child had defeated You-Know-Who.', 500, 330, { w: 460, size: 27 })], { mood: 'dusk' });
ep.panel(640, { cam: { on: ['harry'], fr: 'close', zoom: 0.9, dy: 0.25 }, bg: CY, blur: 3, actors: [HC({ expr: 'unimpressed' })] },
  [inner('Harry', '*You think YOUR day was surreal? Try mine.*', 400, 565, { w: 560 })], { mood: 'dusk' });
ep.panel(1240, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust', dy: -1.45 }, bg: CY, actors: [HC({ expr: 'warm' }), MC({ expr: 'shock' })] },
  [say('Harry', 'I was very impressed with you today. I should have said so out loud. I was awarding you points in my head and everything.', 272, 46, { w: 390, size: 28, shape: 'box', anchor: 'tc', fixed: true }),
   say('McGonagall', 'Thank you, Mr Potter. If you had already been sorted into a House, I would have deducted so many points your *grandchildren* would still be losing the House Cup.', 502, 448, { w: 410, size: 26, shape: 'box', fixed: true })], { mood: 'dusk' });
ep.panel(700, { cam: { on: ['harry'], fr: 'close', zoom: 0.9, dy: 0.15 }, bg: CY, blur: 3, actors: [HC({ expr: 'bigGrin' })] },
  [say('Harry', 'Thank *you*, Professor.', 400, 90, { w: 400 }), cap('It was probably too early to call her Minnie.', 44, 610, { w: 560 })], { mood: 'dusk' });
ep.panel(860, { cam: { on: ['harry'], fr: 'bust', zoom: 0.9, dy: -0.25 }, bg: CY, blur: 2, actors: [HC({ expr: 'scheme', pose: 'think' })] },
  [inner('Harry', 'This woman might well be the sanest adult he had ever met. He was even considering offering her the number-two position in whatever group he formed to fight the Dark Lord.', 400, 110, { w: 560, size: 27 }),
   inner('Harry', '*What would be a good name for that…?*\n*The Death Eater Eaters?*', 400, 790, { w: 580 })], { mood: 'dusk' });
ep.panel(1040, { cam: { on: ['harry', 'mcgonagall'], fr: 'knees', dy: -0.9, zoom: 1.1 }, bg: CY, actors: [HC({ expr: 'sad', pose: 'present', armB: { sh: 60, el: 30, hand: 'hold', under: g({ transform: 'translate(0,9) rotate(-80) translate(0,-4)' }, wand(104, '#8a5a2a')) } }), MC({ expr: 'calm' })] },
  [say('McGonagall', 'And, Mr Potter, about your wand—', 570, 86, { w: 300, fixed: true }),
   say('Harry', 'I know what you\'re going to ask. Take it. I hadn\'t planned to do anything, but I don\'t want you to have nightmares about me blowing up my house.', 285, 318, { w: 370, size: 27, fixed: true })], { mood: 'dusk' });
ep.panel(700, { cam: { head: 'mcgonagall', hw: 0.28, hx: 0.5, hy: 0.7 }, bg: CY, blur: 2, actors: [MC({ expr: 'flustered', pose: 'shrug' })] },
  [say('McGonagall', 'Oh no, Mr Potter! That isn\'t done. I only meant to warn you not to *use* it at home. The Ministry can detect underage magic, and it is prohibited without supervision.', 400, 130, { w: 560, size: 27 })], { mood: 'dusk' });
ep.panel(900, { cam: { on: ['harry'], fr: 'bust', zoom: 0.9, dy: -0.2 }, bg: CY, blur: 2, actors: [HC({ expr: 'calm' })] },
  [say('Harry', 'Ah. That sounds like a very sensible rule. I get it. Magic is dangerous and the rules are there for good reasons. Certain *other* matters are also dangerous. I get that too.', 400, 120, { w: 560, size: 27 }),
   say('Harry', 'Remember that I am not stupid.', 400, 800, { w: 460 })], { mood: 'dusk' });
ep.panel(860, { cam: { on: ['mcgonagall'], fr: 'close', zoom: 0.85, dy: 0.1 }, bg: CY, blur: 3, actors: [MC({ expr: 'warm' })] },
  [say('McGonagall', 'I am unlikely ever to forget it. Thank you, *Harry.* That does make me feel better about entrusting you with certain things.', 400, 160, { w: 540, fixed: true }),
   say('McGonagall', 'Goodbye for now.', 400, 770, { w: 340, fixed: true })], { mood: 'dusk' });
ep.panel(820, { cam: { x: 520, y: 760, w: 820 }, bg: CY, actors: [HC({ x: 300, turn: -0.7, pose: 'walk', expr: 'calm' }), L.trunk(180, 1060, 0.4, '#7a4e2e', true)] },
  [cap('Harry turned to go: into the Leaky Cauldron, and out towards the Muggle world. As his hand touched the door handle, he heard a last whisper from behind him.', 330, 34, { w: 420, size: 26 }),
   whisper('McGonagall', 'Hermione Granger.', 540, 700, { w: 340, tail: [790, 740] })], { mood: 'dusk' });
ep.panel(720, { cam: { on: ['harry'], fr: 'close', zoom: 0.9, dy: 0.15 }, bg: CY, blur: 3, actors: [HC({ x: 300, turn: 0.3, expr: 'confused' })] },
  [say('Harry', 'What?', 400, 100, { w: 150 }),
   whisper('McGonagall', 'Look for a first-year girl named Hermione Granger on the train to Hogwarts.', 400, 595, { w: 560, tail: [790, 650], fixed: true })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: CY, blur: 3, actors: [HC({ x: 300, turn: 0.5, expr: 'focus' })] }, [say('Harry', 'Who is she?', 400, 100, { w: 200 })], { mood: 'dusk' });
ep.bleed(800, { cam: { x: 900, y: 700, w: 1000 }, bg: CY, actors: [(e) => K.glow(920, 700, 160, '#fff3b0', 0.35) + FX.sparkles([[920, 720, 44], [850, 620, 28], [990, 590, 22], [880, 800, 18], [1010, 760, 26]], { col: '#fff3b0' })] },
  [capC('There was no answer. When Harry turned around, Professor McGonagall was gone.', 400, 100, { w: 520 })], { mood: 'dusk', alt: 'The courtyard is empty; a last few sparkles hang in the air.' });

// =============================================================== Aftermath
ep.setBg('#241a2e');
ep.tile({ h: 160, panels: [], bubbles: [plain('AFTERMATH', 400, 100, { font: "'IM Fell English SC', serif", size: 30, color: '#e8dcc2' })], bg: { top: C.paper, bottom: '#241a2e' } });
const HM = () => L.headmasterOffice();
const DUM = (o = {}) => ({ def: dumbledore, id: 'dumbledore', x: 1000, y: 900, turn: 0.1, pose: 'crossArms', expr: { base: 'warm', eyes: { sparkle: true } }, ...o });
ep.panel(780, { cam: { x: 880, y: 640, w: 1200 }, bg: HM, actors: [DUM({ pose: 'sit', y: 820 }), L.officeDesk(), { def: mcgonagall, id: 'mcgonagall', x: 400, y: 1060, turn: 0.4, pose: 'stand', expr: 'blank' }] },
  [cap('Hogwarts. The Headmaster\'s office. Late.', 44, 34, { w: 500 })], { mood: 'candle', alt: 'A round office crowded with spindly silver instruments and sleeping portraits; a red-gold phoenix on a perch. Behind a great desk sits an ancient wizard with a long silver beard and half-moon spectacles.' });
ep.panel(820, { cam: { head: 'dumbledore', hw: 0.34, hx: 0.6, hy: 0.48 }, bg: HM, blur: 2, actors: [DUM({ pose: 'sit', y: 820, turn: -0.2 })] },
  [say('Dumbledore', 'So, my dear. How did you find Harry?', 185, 390, { w: 280, fixed: true })], { mood: 'candle', breakout: 'top', frame: 'gilt', y: 230, ph: 572 });
ep.multi(900, [0, 1, 2].map((i) => ({ x: M, y: 18 + i * 296, w: 752, h: 280, mood: 'candle', art: { cam: { on: ['mcgonagall'], fr: 'close', padX: 2, zoom: 1.7, dx: 0.9, dy: 0.25 }, bg: HM, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 400, y: 1060, turn: 0.2, expr: i === 1 ? { base: 'blank', mouth: { type: 'tiny' } } : { base: 'blank', mouth: { type: 'o', open: 0.6 } } }] } })),
  [note('(opens mouth)', 600, 160, { size: 36, color: '#f1e6cc' }), note('(closes mouth)', 600, 456, { size: 36, color: '#f1e6cc' }), note('(opens mouth again)', 590, 752, { size: 36, color: '#f1e6cc' })], { alt: 'Three panels: McGonagall opens her mouth, closes it, and opens it again. No words come out.' });
ep.panel(820, { cam: { on: ['dumbledore'], fr: 'close', zoom: 0.8, dy: 0.45 }, bg: HM, blur: 2, actors: [DUM({ pose: 'sit', y: 820, turn: -0.2, expr: { base: 'calm', eyes: { open: 0.8 } } })] },
  [say('Dumbledore', 'I see.', 170, 90, { w: 200 }),
   say('Dumbledore', 'Thank you for your report, Minerva. You may go.', 560, 250, { w: 360 })], { mood: 'candle' });
ep.setBg(C.paper);
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: '#241a2e', bottom: C.paper } });
ep.end();
export default ep;
