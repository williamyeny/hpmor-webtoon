// EPISODE 7 — The Winner Shall Lose  (source: HPMOR ch. 6, second half + Aftermath)
import { Episode, say, shout, whisper, think, inner, cold, cap, capC, dark, note, title, plain, M } from '../engine/core/dsl.js';
import { shot } from '../engine/core/scene.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as L from '../engine/bg/london.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harry, mcgonagall, ollivander, dumbledore, trunkSeller, orangeMan } from '../engine/chars/cast.js';
import { wand, pouch, coinBag, galleon, wandBox } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep07', number: 7, title: 'The Winner Shall Lose' });
ep.setBg(C.paper);
ep.beat(260, [plain('CHAPTER SEVEN', 400, 90, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('The Winner Shall Lose', 400, 170, { size: 48 })]);
const MWAND = g({ transform: 'translate(0,26) rotate(180)' }, wand(120, '#4a2e1b'));
const HWAND = g({ transform: 'translate(0,24) rotate(180)' }, wand(104, '#8a5a2a'));

// =============================================================== Ollivanders
const OL = () => L.ollivanders();
const OLV = (o = {}) => ({ def: ollivander, id: 'ollivander', x: 760, y: 900, turn: 0.3, pose: 'present', expr: 'calm', ...o });
const HO = (o = {}) => ({ def: harry, id: 'harry', x: 1120, y: 1060, s: 1.1, turn: -0.4, pose: 'wand', expr: 'focus', armB: { sh: 92, el: -8, hand: 'hold', prop: HWAND }, ...o });
ep.panel(760, { cam: { x: 900, y: 560, w: 1300 }, bg: OL, actors: [OLV(), L.ollCounter(), HO({ pose: 'stand', armB: undefined, expr: 'awe' }), { def: mcgonagall, id: 'mcgonagall', x: 1400, y: 1080, turn: -0.4, pose: 'stand', expr: 'calm' }] },
  [cap('Later that day. Ollivanders: Makers of Fine Wands since 382 B.C.', 44, 34, { w: 460 }),
   cap('The shop was narrow and dusty, and every wall was boxes, stacked up to the dark.', 330, 620, { w: 420 })], { mood: 'candle', alt: 'Ollivanders: a narrow, dim shop with walls made entirely of thin wand boxes stacked into the darkness. A pale old wizard behind the counter.' });
ep.panel(700, { cam: { on: ['ollivander'], fr: 'bust' }, bg: OL, blur: 2, actors: [OLV({ expr: { base: 'smile', eyes: { open: 1.05 } }, pose: 'hold' }), L.ollCounter()] },
  [say('Ollivander', 'Ah. Harry Potter. I wondered when I\'d be seeing you.', 540, 100, { w: 320 }),
   say('Ollivander', 'Holly and phoenix feather. Eleven inches. Nice and supple. Give it a wave.', 530, 560, { w: 330 })], { mood: 'candle' });
// the moment
ep.panel(620, { cam: { on: ['harry'], fr: 'waist' }, bg: OL, blur: 2, actors: [HO({ expr: 'focus' })] }, [], { mood: 'candle', alt: 'Harry raises the wand.' });
ep.bleed(1300, { cam: { on: ['harry'], fr: 'waist' }, bg: OL, blur: 3, actors: [HO({ pose: 'wandUp', expr: 'awe', armB: { sh: 150, el: -10, hand: 'hold', prop: HWAND } })],
  under: (e) => rect(0, 0, e.w, e.h, { fill: '#120a08' }),
  over: (e) => { const h = e.anchors?.harry?.handB; const R = rng(7); let o = ''; if (!h) return o; for (let i = 0; i < 60; i++) { const a = R() * Math.PI * 2, d = R.range(40, 520); o += circle(h[0] + Math.cos(a) * d, h[1] - 150 + Math.sin(a) * d * 0.8, R.range(2, 7), { fill: R.pick(['#ff6a5a', '#ffd26a', '#6ad0ff', '#9aff8a', '#f6a0ff', '#fff']), opacity: R.range(0.6, 1) }); } return K.glow(h[0], h[1] - 150, 520, '#ffe9a8', 0.55) + o + FX.sparkles([[h[0] - 120, h[1] - 300, 30], [h[0] + 160, h[1] - 220, 22], [h[0] + 40, h[1] - 420, 26]], { col: '#fff6d0' }); } },
  [cap('Multicoloured sparks.', 44, 40, { w: 280 })], { mood: 'candle', alt: 'A burst of multicoloured sparks pours from the wand. Harry\'s face is lit with wonder.' });
ep.panel(820, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#0c0a14' });
  out += `<defs><radialGradient id="eyeOpen" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff6d0"/><stop offset="0.35" stop-color="#ffd26a"/><stop offset="0.7" stop-color="#c46a2a" stop-opacity="0.5"/><stop offset="1" stop-color="#0c0a14" stop-opacity="0"/></radialGradient></defs>`;
  out += path(`M${w * 0.05},${h * 0.5} Q${w * 0.5},${h * 0.08} ${w * 0.95},${h * 0.5} Q${w * 0.5},${h * 0.92} ${w * 0.05},${h * 0.5}Z`, { fill: 'url(#eyeOpen)' });
  const R = rng(3); for (let i = 0; i < 40; i++) { const a = R() * Math.PI * 2, d = R.range(80, 360); out += line(w / 2 + Math.cos(a) * d * 0.4, h / 2 + Math.sin(a) * d * 0.3, w / 2 + Math.cos(a) * d, h / 2 + Math.sin(a) * d * 0.7, { stroke: '#ffe9a8', 'stroke-width': R.range(1, 3), opacity: R.range(0.3, 0.8) }); }
  return out;
}, [dark('He had *felt* it: magic pouring up his arm. And in that instant he realised he had always had that sense—like having eyes, but keeping them always closed, so that you didn\'t even know you were seeing darkness.', 400, 100, { w: 580 }),
    dark('And then one day, the eye opened.', 400, 720, { w: 440 })], { border: 'none', alt: 'Abstract: an eye of golden light opening in darkness.' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: OL, blur: 3, actors: [HO({ expr: { base: 'awe', eyes: { teary: true } } })] },
  [inner('Harry', '*I can do magic.*', 400, 110, { w: 300 }),
   inner('Harry', '*Me. As in, me personally. I am a wizard.*', 400, 470, { w: 420 })], { mood: 'candle' });
ep.panel(760, { cam: { on: ['ollivander'], fr: 'close' }, bg: OL, blur: 3, actors: [OLV({ expr: { base: 'calm', eyes: { open: 1.1, irisScale: 0.9 } } })], over: (e) => FX.frost(e.w, e.h, 0.2, 21) },
  [whisper('Ollivander', 'Curious. Very curious…', 280, 100, { w: 260 }),
   whisper('Ollivander', 'It is very curious indeed that you should be destined for this wand, when its brother—why, its brother gave you that scar.', 400, 560, { w: 540, size: 27 })], { mood: 'candle' });
ep.panel(460, { cam: { on: ['harry'], fr: 'eyes' }, bg: OL, blur: 3, actors: [HO({ expr: 'shock' })] }, [], { mood: 'candle', alt: 'Harry\'s eyes widen.' });
const bayes = (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  const T = (x, y, s, fs = 30, a = 'middle', col = '#2d2a4a') => text(x, y, s, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, 'text-anchor': a, fill: col });
  const R = rng(5); for (let i = 0; i < 200; i++) out += rect(40 + (i % 25) * 28, 90 + Math.floor(i / 25) * 26, 20, 16, { fill: i === 137 ? '#c43a32' : '#b9ad92', opacity: i === 137 ? 1 : 0.6 });
  out += T(w / 2, 60, 'thousands of wands…', 34) + T(w / 2, h - 90, '…and I get the brother of HIS?', 34, 'middle', '#c43a32') + T(w / 2, h - 40, 'p(coincidence) ≈ 1/1000', 28);
  return out;
};
ep.panel(560, bayes, [], { alt: 'Harry\'s notes: a grid of hundreds of wand boxes, one circled in red. "…and I get the brother of HIS? p(coincidence) ≈ 1/1000."' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: OL, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1400, y: 1080, turn: -0.4, pose: 'stand', expr: 'calm' }] },
  [say('McGonagall', 'How peculiar.', 280, 110, { w: 200 }),
   cap('…and that was all she said. In no *imaginable* world would Harry have just gone "Hm" and walked out without even *trying* to form a hypothesis.', 44, 440, { w: 480, size: 26 })], { mood: 'candle' });

// =============================================================== the street at sunset — loose ends
const DA = (o = {}) => () => L.diagonAlley({ seed: 7, night: false, ...o });
const HS = (o = {}) => ({ def: harry, id: 'harry', x: 1000, y: 1080, s: 1.1, turn: 0.4, pose: 'walk', ...o });
const MS = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 1250, y: 1090, turn: -0.4, pose: 'walk2', expr: 'calm', ...o });
ep.panel(760, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: DA({ start: 5 }), actors: [HS({ expr: 'calm' }), MS({ turn: 0.4 })] },
  [say('McGonagall', 'You\'re a full wizard now. Congratulations.', 560, 100, { w: 300 }),
   say('McGonagall', 'And what do you think of the wizarding world?', 560, 280, { w: 300 })], { mood: 'dusk' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 5 }), blur: 2, actors: [HS({ expr: 'think', pose: 'stand' })] },
  [say('Harry', 'It\'s strange. I ought to be thinking about everything I\'ve seen of magic. And instead I\'m distracted by relative trivialities. Like the whole Boy-Who-Lived thing.', 400, 110, { w: 540, size: 28 }),
   say('McGonagall', 'Really? You don\'t say.', 620, 580, { w: 240, tail: [790, 640] })], { mood: 'dusk' });
ep.panel(900, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = `<defs><linearGradient id="doom" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a1a1a"/><stop offset="1" stop-color="#e8773a"/></linearGradient></defs>` + rect(0, 0, w, h, { fill: 'url(#doom)' });
  out += path(`M0,${h} L${w * 0.25},${h * 0.35} L${w * 0.4},${h * 0.5} L${w * 0.5},${h * 0.28} L${w * 0.62},${h * 0.48} L${w},${h * 0.2} L${w},${h}Z`, { fill: '#1a0e0a' });
  out += K.glow(w * 0.5, h * 0.3, 200, '#ffb04a', 0.8);
  out += g({ transform: `translate(${w * 0.42},${h * 0.85})`, filter: 'url(#silhouette)' }, path('M-30,0 L-24,-80 Q-40,-120 -10,-130 Q10,-150 30,-128 Q40,-110 26,-80 L30,0Z', { fill: '#000' }), path('M-20,-60 L-60,-20 L-50,-10 L-10,-50Z', { fill: '#000' }));
  out += g({ transform: `translate(${w * 0.58},${h * 0.86})`, filter: 'url(#silhouette)' }, path('M-40,0 L-34,-110 Q-50,-160 -10,-170 Q20,-180 34,-150 Q44,-120 32,-100 L40,0Z', { fill: '#000' }), path('M-10,-130 L-40,-190 L-30,-196 L0,-140Z', { fill: '#000' }));
  out += circle(w * 0.52, h * 0.18, 14, { fill: '#ffd26a' }) + K.glow(w * 0.52, h * 0.18, 60, '#ffd26a', 0.6);
  return out;
}, [say('Harry', 'It\'s like you\'re Frodo Baggins, and you find out your parents took you to Mount Doom and had you toss in the Ring when you were one year old—and you don\'t even remember it.', 400, 120, { w: 560, size: 28, tail: null })],
  { alt: 'Imagined: two tiny silhouettes before a volcano, one of them a toddler throwing a glinting ring.' });
ep.panel(760, { cam: { on: ['harry'], fr: 'waist' }, bg: DA({ start: 5 }), actors: [HS({ expr: 'sad', pose: 'shrug' })] },
  [say('Harry', 'It\'s almost enough to make me wish there were *some* loose ends from the quest. So I could say I really *participated* somehow.', 400, 110, { w: 520 })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [MS({ expr: { base: 'calm', mouth: { type: 'flat' } }, pose: 'stand' })] },
  [say('McGonagall', 'Oh? What did you have in mind?', 540, 100, { w: 300 })], { mood: 'dusk' });
ep.panel(620, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust' }, bg: DA({ start: 5 }), actors: [HS({ expr: 'think', pose: 'stand' }), MS({ expr: 'angry', pose: 'stand' })] },
  [say('Harry', 'Well—you mentioned my parents were betrayed. Who betrayed them?', 250, 90, { w: 320 }),
   say('McGonagall', 'Sirius Black. He\'s in Azkaban. Wizarding prison.', 560, 500, { w: 300 })], { mood: 'dusk' });
ep.panel(700, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 5 }), blur: 2, actors: [HS({ expr: 'scheme', pose: 'gesture' })] },
  [say('Harry', 'How probable is it that Sirius Black breaks out of prison and I have to defeat him in a spectacular duel? Or better yet, put a large bounty on his head and hide out in Australia while I wait for the results?', 400, 120, { w: 560, size: 27 })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [MS({ expr: 'unimpressed', pose: 'stand' })] },
  [say('McGonagall', 'Not likely. No-one has ever escaped from Azkaban.', 540, 110, { w: 300 })], { mood: 'dusk' });
ep.panel(820, { cam: { on: ['harry'], fr: 'waist' }, bg: DA({ start: 5 }), actors: [HS({ expr: 'delight', pose: 'armsUp' })], under: (e) => rect(0, 0, e.w, e.h, { fill: '#2a1a3a', opacity: 0.3 }) },
  [say('Harry', 'All right then, it\'s all nicely wrapped up. Or—maybe the Dark Lord didn\'t *really* die that night! His spirit lingers, whispering to people in nightmares, searching for a way back—', 400, 120, { w: 560, size: 27 }),
   say('Harry', '—and now, in accordance with the ancient prophecy, he and I are locked in a deadly duel where *the winner shall lose and the loser shall win*—', 400, 690, { w: 560, size: 27 })], { mood: 'dusk' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: DA({ start: 5 }), blur: 1, actors: [MS({ expr: { base: 'shock', eyes: { lookX: 1, style: 'normal' } }, pose: 'stand', turn: 0.6 })], over: (e) => FX.emanata(e.anchors?.mcgonagall?.head?.[0] ?? 400, e.anchors?.mcgonagall?.head?.[1] ?? 300, 180, { n: 5 }) },
  [cap('Professor McGonagall\'s head swivelled, and her eyes darted around, as though to search the street for listeners.', 44, 34, { w: 440 })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: 'unimpressed', pose: 'stand' })] },
  [say('Harry', 'I\'m *joking*, Professor. Sheesh, why do you always take everything so seriously—', 400, 110, { w: 480 })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['harry'], fr: 'eyes' }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: 'blank', pose: 'stand' })] },
  [cap('A slow sinking sensation began to dawn in the pit of Harry\'s stomach.', 44, 30, { w: 420 })], { mood: 'dusk' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [MS({ expr: { base: 'smile', eyes: { open: 1, squint: 0 }, mouth: { type: 'smile', open: 0.25, curve: 0.7 } }, pose: 'stand' })] },
  [cap('Professor McGonagall looked at Harry with a calm expression. A very, *very* calm expression.', 44, 34, { w: 420 }),
   say('McGonagall', 'Of course you are, Mr Potter.', 540, 600, { w: 280 })], { mood: 'dusk', alt: 'McGonagall wears a bright, fixed, perfectly controlled smile.' });
ep.panel(420, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#f4ecd6' }), [inner('Harry', '*Aw crap.*', 400, 210, { w: 200, size: 44 })], { alt: 'Aw crap.' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 5 }), blur: 2, actors: [HS({ expr: 'exasperated', pose: 'facepalm' })] },
  [say('Harry', 'He\'s *not* dead, is he.', 400, 90, { w: 280 }),
   say('Harry', 'Of *course* he\'s alive. Just because *someone* said his body was burned to a crisp, I can\'t *imagine* why I thought he was dead. *Clearly* I have much to learn about proper *pessimism.*', 400, 560, { w: 560, size: 27 })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: 'pained', pose: 'stand' })] },
  [say('Harry', 'At least tell me there\'s not really a prophecy…', 400, 100, { w: 420 })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [MS({ expr: { base: 'smile', eyes: { open: 1, squint: 0 }, mouth: { type: 'smile', open: 0.25, curve: 0.7 } }, pose: 'stand' })], over: (e) => FX.sweat ? '' : '' },
  [note('(fixed smile)', 520, 400, { size: 30 })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: 'rant', pose: 'stand' })] },
  [shout('Harry', 'Oh, you have *got* to be kidding me.', 400, 100, { w: 440, size: 32 })], { mood: 'dusk' });
ep.panel(620, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust' }, bg: DA({ start: 5 }), actors: [HS({ expr: 'cross', pose: 'crossArms' }), MS({ expr: 'worried', pose: 'stand' })] },
  [say('McGonagall', 'Mr Potter, you shouldn\'t go inventing things to worry about—', 560, 90, { w: 300 }),
   say('Harry', 'Are you *actually* going to tell me that? Imagine my reaction later, when I find out there *was* something to worry about after all.', 250, 520, { w: 360 })], { mood: 'dusk' });
ep.panel(760, { cam: { x: 1250, y: 700, w: 1200 }, bg: DA({ start: 5 }), actors: [HS({ expr: 'suspicious', pose: 'stand', turn: 0.6 }), MS({ expr: 'suspicious', pose: 'stand', turn: 0.6 }), { def: orangeMan, id: 'orange', x: 1600, y: 1070, turn: -0.6, pose: 'walk', s: 0.95 }] },
  [cap('Then both of them shut up, as a man in flowing orange robes appeared on the street and slowly passed them by. Professor McGonagall\'s eyes tracked him, unobtrusively.', 44, 34, { w: 480, size: 26 })], { mood: 'dusk', alt: 'A man in flowing orange robes passes. McGonagall watches him go.' });
// =============================================================== the cold
ep.setBg('#1c2a3a');
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: C.paper, bottom: '#1c2a3a' } });
ep.panel(620, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust' }, bg: DA({ start: 5 }), actors: [HS({ expr: 'determined', pose: 'stand' }), MS({ expr: 'stern', pose: 'stand' })] },
  [say('Harry', 'Are you going to tell me the truth now, Professor? And don\'t bother trying to wave it off. I\'m not stupid.', 250, 100, { w: 360 }),
   shout('McGonagall', 'You\'re *eleven years old*, Mr Potter!', 560, 520, { w: 320, size: 30 })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: 'cold', pose: 'stand' })], over: (e) => FX.frost(e.w, e.h, 0.4, 3) },
  [cold('Harry', 'And therefore subhuman. Sorry—for a moment there, I *forgot.*', 400, 100, { w: 420 })], { mood: 'cold' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: DA({ start: 5 }), blur: 2, actors: [MS({ expr: 'angry', pose: 'point' })] },
  [shout('McGonagall', 'These are dreadful and important matters! They are *secret!* It is a *catastrophe* that you, still a child, know even this much!', 540, 130, { w: 440, size: 28 }),
   shout('McGonagall', 'You must not tell *anyone*, do you understand? Absolutely no-one!', 400, 640, { w: 480, size: 28 })], { mood: 'dusk' });
ep.bleed(900, { cam: { on: ['harry'], fr: 'eyes' }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: { base: 'cold', glint: false }, pose: 'stand' })],
  over: (e) => FX.frost(e.w, e.h, 0.9, 5) + rect(0, 0, e.w, e.h, { fill: '#9bc4e8', opacity: 0.15 }) },
  [dark('As sometimes happened when Harry got *sufficiently* angry, his blood went cold instead of hot.', 400, 100, { w: 580 }),
   dark('And a terrible dark clarity descended over his mind, mapping out tactics and assessing their consequences with iron realism.', 400, 760, { w: 580 })], { mood: 'cold', alt: 'Harry\'s eyes, pupils shrunk to pinpricks. Frost grows over everything.' });
ep.panel(760, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#0e1a28' }) + FX.frost(ctx.w, ctx.h, 0.6, 8),
  [cold('Harry', 'Point out that you have a right to know: *failure.* Children have no rights to know anything, in her eyes.', 400, 110, { w: 560 }),
   cold('Harry', 'Say you won\'t be friends any more: *failure.* She does not value your friendship enough.', 400, 330, { w: 560 }),
   cold('Harry', 'Point out you\'ll be in danger if you don\'t know: *failure.* Plans are already made around your ignorance.', 400, 550, { w: 560 })], { border: 'none', alt: 'Cold, blue captions list Harry\'s options and cross each out.' });
ep.panel(560, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#0e1a28' }) + FX.frost(ctx.w, ctx.h, 0.6, 9),
  [cold('Harry', 'Justice and reason will both fail. You must find something you have that she wants—or something you can do that she fears.', 400, 150, { w: 580 }),
   cold('Harry', 'Ah.', 400, 400, { w: 120 })], { border: 'none' });
ep.panel(820, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 5 }), blur: 2, actors: [HS({ expr: 'coldSmile', pose: 'crossArms' })], over: (e) => FX.frost(e.w, e.h, 0.5, 14) },
  [cold('Harry', 'Well then, Professor. It sounds like I have something you want.', 400, 100, { w: 480 }),
   cold('Harry', 'You can tell me the truth—the *whole* truth—and in return, I will keep your secrets. Or you can try to keep me ignorant so you can use me as a pawn. In which case I will owe you nothing.', 400, 620, { w: 580 })], { mood: 'cold' });
ep.bleed(820, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: DA({ start: 5 }), blur: 3, actors: [MS({ expr: 'angry', pose: 'fists' })], under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { bg: '#2a0808', col: '#8a1a1a', op: 0.8 }) },
  [shout('McGonagall', 'How *dare* you!', 400, 110, { w: 320, size: 40 })], { mood: 'dread' });
ep.panel(460, { cam: { on: ['harry'], fr: 'eyes' }, bg: DA({ start: 5 }), blur: 3, actors: [HS({ expr: 'menace', pose: 'stand' })], over: (e) => FX.frost(e.w, e.h, 0.6, 15) },
  [cold('Harry', '*How dare YOU.*', 400, 380, { w: 280 })], { mood: 'cold' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DA({ start: 5 }), blur: 3, actors: [MS({ expr: 'horror', pose: 'stand' })] },
  [say('McGonagall', 'You would *blackmail* me?', 540, 110, { w: 260 })], { mood: 'dusk' });
ep.panel(900, { cam: { on: ['harry'], fr: 'waist' }, bg: DA({ start: 5 }), actors: [HS({ expr: 'cold', pose: 'lecture' })], over: (e) => FX.frost(e.w, e.h, 0.5, 16) },
  [cold('Harry', 'I am *offering* you a *favour.* If you refuse, I will have every natural motive to make inquiries elsewhere—not to spite you, but because I *have to know!*', 400, 120, { w: 580 }),
   cold('Harry', 'Get past your pointless anger at a *child* who you think ought to obey you, and you\'ll realise any sane adult would do the same! *How would you feel if it was you?*', 400, 740, { w: 580 })], { mood: 'cold' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 5 }), blur: 2, actors: [HS({ expr: 'cold', pose: 'stand' })], over: (e) => FX.frost(e.w, e.h, 0.35, 17) },
  [say('Harry', 'You don\'t have to decide right away.', 400, 90, { w: 320 }),
   cold('Harry', 'But I\'ll warn you of one thing: don\'t try that Obliviation spell on me. Some time ago I worked out a signal, and I have already sent it to myself. If I find that signal and I don\'t *remember* sending it…', 400, 600, { w: 580, size: 27 })], { mood: 'cold' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: DA({ start: 5 }), blur: 2, actors: [MS({ expr: 'pained', pose: 'slump' })] },
  [say('McGonagall', 'I wasn\'t thinking of Obliviating you, Mr Potter. But why would you have *invented* such a signal, if you didn\'t know about—', 540, 110, { w: 380, size: 28 }),
   say('Harry', 'Muggle science fiction. *Just in case.* And no, I won\'t tell you the signal. I\'m not dumb.', 250, 540, { w: 360, tail: [30, 600] })], { mood: 'dusk' });
ep.panel(820, { cam: { on: ['mcgonagall'], fr: 'waist' }, bg: DA({ start: 5 }), actors: [MS({ expr: 'sad', pose: 'slump', lean: 10 })] },
  [cap('She seemed to fold in on herself, and suddenly looked very old, and very tired.', 44, 34, { w: 420 }),
   say('McGonagall', 'This has been an exhausting day, Mr Potter. I will trust you not to speak of this until I have had time to think.', 540, 520, { w: 380, size: 28 }),
   say('McGonagall', 'Keep in mind that only two other people in the whole world know about this: Headmaster Albus Dumbledore, and Professor Severus Snape.', 400, 740, { w: 560, size: 26 })], { mood: 'dusk' });
ep.setBg(C.paper);
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: '#1c2a3a', bottom: C.paper } });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: DA({ start: 6 }), blur: 2, actors: [HS({ expr: 'exasperated', pose: 'walk' })] },
  [cap('New information. That was a peace offering. Harry accepted it, and slowly, his blood began to warm again.', 44, 30, { w: 440 }),
   say('Harry', 'So now I\'ve got to find some way to kill an immortal Dark Wizard. I *really* wish you\'d told me that *before* I started shopping.', 400, 560, { w: 520 })], { mood: 'dusk' });

// =============================================================== the trunk shop
const TS = () => L.trunkShop();
const SEL = (o = {}) => ({ def: trunkSeller, id: 'seller', x: 1420, y: 1060, turn: -0.4, pose: 'present', expr: 'smile', ...o });
const HT = (o = {}) => ({ def: harry, id: 'harry', x: 700, y: 1080, s: 1.1, turn: 0.4, pose: 'stand', ...o });
const MT = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 500, y: 1090, turn: 0.4, pose: 'stand', expr: 'calm', ...o });
const DTRUNK = (e) => L.trunk(1060, 1060, 1.3, '#7a4e2e', true, { stairs: false });
ep.panel(820, { cam: { x: 1000, y: 680, w: 1500 }, bg: TS, actors: [MT(), HT({ expr: 'awe' }), DTRUNK, SEL()] },
  [cap('The trunk shop was richer than any other shop Harry had visited—lush curtains, polished wood, trunks on ivory platforms—and the salesman spoke with exquisite, oily politeness.', 44, 34, { w: 500, size: 26 })], { mood: 'warm', alt: 'A luxurious trunk shop. In the middle, a heavy wooden trunk carved with a guardian dragon.' });
ep.panel(760, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#3a4a3a' }) + K.glow(ctx.w / 2, ctx.h * 0.3, 500, C.candle, 0.35) + L.trunk(ctx.w / 2, ctx.h * 0.62, 1.4, '#7a4e2e', true, { stairs: true }) + g({ transform: `translate(${ctx.w * 0.5},${ctx.h * 0.86})` }, rect(-60, 0, 120, 90, { fill: '#f3c66f', opacity: 0.8 }), K.glow(0, 40, 150, C.candle, 0.6)),
  [cap('Charmed to be light. Shrinks on command. Sprouts small clawed tentacles and squirms after its owner. And—the important part—a handle on the bottom that slides out a *staircase*, down to a small lighted room that would hold around twelve bookcases.', 44, 30, { w: 500, size: 25 }),
   inner('Harry', 'If they made luggage like this, why did anyone bother owning a house?', 400, 660, { w: 520 })], { mood: 'warm', alt: 'The dragon trunk, with a hidden staircase glowing below it.' });
ep.panel(620, { cam: { on: ['seller'], fr: 'bust' }, bg: TS, blur: 2, actors: [SEL({ expr: 'smug' })] },
  [say('Seller', 'One hundred and eight Galleons, young sir. Lightly used.', 260, 100, { w: 320 })], { mood: 'warm' });
ep.panel(560, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#6b4429' }) + g({ transform: `translate(${ctx.w / 2},${ctx.h * 0.55})` }, coinBag(3)) + text(ctx.w * 0.75, ctx.h * 0.5, '97', { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': 90, fill: '#c43a32', 'text-anchor': 'middle' }),
  [cap('Ninety-seven Galleons. That was how much was left in the bag.', 44, 30, { w: 420 })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: TS, blur: 2, actors: [MT({ expr: 'pained' })] },
  [say('McGonagall', 'I\'m sorry, young man. This is entirely my fault. I would offer to take you back to Gringotts, but the bank will be closed for all but emergencies now.', 540, 120, { w: 380, size: 28 }),
   say('McGonagall', 'Well. We may as well go, I suppose.', 540, 560, { w: 300 })], { mood: 'warm' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: TS, blur: 3, actors: [HT({ expr: 'think' })] },
  [inner('Harry', 'She hadn\'t lost it completely when a child dared defy her. She hadn\'t been happy—but she\'d *thought*, instead of exploding. Most adults wouldn\'t have been capable of even that much…', 400, 120, { w: 560, size: 28 })], { mood: 'warm' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: TS, blur: 3, actors: [HT({ expr: 'determined' })] }, [say('Harry', 'Professor?', 400, 100, { w: 170 })], { mood: 'warm' });
ep.panel(1040, { cam: { on: ['harry'], fr: 'waist' }, bg: TS, actors: [HT({ expr: 'focus', pose: 'lecture' })] },
  [say('Harry', 'You thought a hundred Galleons would be more than enough. That\'s the sort of thing the studies show: people think they\'re leaving themselves a little error margin, and they\'re not pessimistic enough.', 400, 130, { w: 580, size: 27 }),
   say('Harry', 'If it\'d been up to me, I\'d have taken *two hundred.* But I thought you\'d be angry at me just for asking. Was I wrong?', 400, 520, { w: 540, size: 28 }),
   say('McGonagall', 'I suppose I must confess that you are right. But, young man—', 560, 920, { w: 360, tail: [790, 960] })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: TS, blur: 2, actors: [HT({ expr: 'sad', pose: 'stand' })] },
  [say('Harry', 'That sort of thing is why I have trouble trusting adults. They get *angry* if you even *try* to reason with them.', 400, 110, { w: 520 }),
   say('Harry', 'So if I had anything *really important* to do, I couldn\'t trust you. Even if you listened with deep concern, you\'d never *change your actions* because of anything I said.', 400, 580, { w: 560, size: 27 })], { mood: 'warm' });
ep.panel(460, { cam: { on: ['seller'], fr: 'close' }, bg: TS, blur: 3, actors: [SEL({ expr: { base: 'awe', eyes: { sparkle: false } } })] },
  [cap('The salesman was watching them both with unabashed fascination.', 44, 30, { w: 400 })], { mood: 'warm' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: TS, blur: 2, actors: [MT({ expr: 'warm' })] },
  [say('McGonagall', 'I can understand your point of view. If I sometimes seem too strict, please remember that I have been Head of Gryffindor House for what feels like several thousand years.', 540, 130, { w: 380, size: 27 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: TS, actors: [MT({ expr: 'confused' }), HT({ expr: 'hopeful', pose: 'gesture' })] },
  [say('Harry', 'So—suppose I had a way to get more Galleons *without* going back to Gringotts, but it involved me violating the role of an obedient child.', 560, 110, { w: 360, size: 28 }),
   say('Harry', 'Would it be all right, even though it would involve a child being insolent to an adult… in retrospect?', 560, 560, { w: 360, size: 28 }),
   say('McGonagall', 'I… suppose…', 190, 330, { w: 200 })], { mood: 'warm' });
ep.panel(760, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#5a3a22' }) + K.glow(ctx.w / 2, ctx.h * 0.4, 400, '#f7c86a', 0.5) + g({ transform: `translate(${ctx.w * 0.45},${ctx.h * 0.66})` }, pouch(2.6, { open: true })) +
  g({ transform: `translate(${ctx.w * 0.6},${ctx.h * 0.32})` }, path('M-60,40 L-20,-10 L20,10 L-20,60Z', { fill: '#c9922e', stroke: C.ink, 'stroke-width': 3 }), ellipse(0, 0, 34, 28, { fill: '#f3d2b5', stroke: C.ink, 'stroke-width': 3 }), ...[[-14, -18], [8, -24], [20, -6], [-2, -34], [-20, -2], [12, 8], [-10, 12], [26, -24], [0, -8], [-24, -22], [14, -40]].map(([x, y]) => g({ transform: `translate(${x},${y})` }, galleon(11)))),
  [say('Harry', '*Eleven Galleons originally from my family vault.*', 400, 90, { w: 420, tail: null })], { mood: 'warm', alt: 'Harry\'s hand comes out of the pouch holding eleven gold Galleons.' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: TS, blur: 2, actors: [MT({ expr: 'yell', pose: 'point' })] },
  [shout('McGonagall', '*Where* did you get that—', 540, 100, { w: 320, size: 32 }), say('Harry', 'From my family vault, like I said.', 200, 460, { w: 250, tail: [20, 540] }), shout('McGonagall', '*How?*', 600, 470, { w: 150, size: 34 })], { mood: 'warm' });
ep.multi(420, [
  { x: M, y: 18, w: 368, h: 384, mood: 'warm', art: { cam: { on: ['harry'], fr: 'close' }, bg: TS, blur: 3, actors: [HT({ expr: 'smug' })] } },
  { x: 408, y: 18, w: 368, h: 384, mood: 'warm', art: { cam: { on: ['mcgonagall'], fr: 'close' }, bg: TS, blur: 3, actors: [MT({ expr: 'rant' })] } },
], [say('Harry', 'Magic.', 150, 60, { w: 140 }), shout('McGonagall', 'That\'s hardly an answer!', 600, 70, { w: 260, size: 28 })]);
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: TS, blur: 3, actors: [MT({ expr: 'blank' })] }, [cap('…and then stopped, blinking.', 44, 30, { w: 300 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: TS, blur: 2, actors: [HT({ expr: 'grin', pose: 'present' })] },
  [say('Harry', 'No, it isn\'t, is it? I *ought* to claim I discovered the true secret of how the pouch works. But actually it\'s from when I fell into that pile of gold, and shoved some Galleons into my pocket.', 400, 120, { w: 560, size: 27 }),
   say('Harry', 'So. Are you angry at me for defying your authority? Or glad that we succeeded in our important mission?', 400, 600, { w: 540 })], { mood: 'warm' });
ep.panel(460, { cam: { on: ['seller'], fr: 'eyes' }, bg: TS, blur: 3, actors: [SEL({ expr: 'shock' })] }, [cap('The salesman\'s eyes were wide like saucers.', 44, 30, { w: 380 })], { mood: 'warm' });
ep.beat(300, [capC('The tall witch stood there, silent, for almost a full minute.', 400, 150, { w: 480 })]);
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: TS, blur: 2, actors: [MT({ expr: 'stern' })] },
  [say('McGonagall', 'Discipline at Hogwarts *must* be enforced. For the sake of *all* the students. And that *must* include courtesy and obedience from you to *all* professors.', 540, 130, { w: 380, size: 28 }),
   say('Harry', 'I understand, Professor McGonagall.', 220, 520, { w: 260, tail: [30, 600] }),
   say('McGonagall', 'Good. Now let us buy that trunk, and go home.', 540, 620, { w: 320 })], { mood: 'warm' });
ep.panel(820, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  for (let y = 40; y < h; y += 34) out += line(0, y, w, y, { stroke: '#b9c9d8', 'stroke-width': 1 });
  const T = (x, y, s, fs = 40, a = 'start', col = '#2d2a4a') => text(x, y, s, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, 'text-anchor': a, fill: col });
  out += T(60, 110, 'ADULTS WHO CHANGED THEIR ACTIONS', 36) + T(60, 150, 'BECAUSE OF SOMETHING I SAID:', 36);
  out += line(60, 170, w - 60, 170, { stroke: '#2d2a4a', 'stroke-width': 2 });
  out += T(60, 260, 'Minerva McGonagall', 46) + T(w - 80, 260, '+1', 64, 'end', '#2f7a3a');
  out += path(`M${w - 170},${210} q40,-30 80,4 q20,50 -30,70 q-60,10 -60,-40`, { fill: 'none', stroke: '#2f7a3a', 'stroke-width': 4 });
  out += T(60, 360, '(first entry)', 30, 'start', '#8a7d68');
  return out;
}, [cap('That was the first time his careful reasoning had ever worked on *anyone.*', 44, 520, { w: 460 })], { alt: 'Harry\'s mental ledger, titled "Adults who changed their actions because of something I said": one entry — Minerva McGonagall, +1 — circled. "(first entry)".' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: TS, blur: 2, actors: [HT({ expr: 'wince', pose: 'bow' })] },
  [say('Harry', 'Thank you very much, Professor. Can you finish up the purchase for me? I\'ve got to visit the lavatory.', 400, 100, { w: 520 }),
   say('Seller', 'May I inquire who *that* was, Madam McGonagall? I take it he is Slytherin—third-year, perhaps?—and from a prominent family—', 480, 590, { w: 480, size: 26, tail: [790, 660] })], { mood: 'warm' });
ep.panel(620, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#6b8a70' }) + FX.sfxText(ctx.w * 0.3, ctx.h * 0.3, 'SLAM', { size: 80, rot: -6 }), [cap('Behind the locked lavatory door, Harry grabbed the magical self-cleaning towel and, with shaky hands, wiped the sweat off his forehead. His whole body was soaked.', 44, 300, { w: 480, size: 26 })], { alt: 'SLAM. Harry, alone, shaking and drenched in sweat.' });

// =============================================================== the courtyard, goodbye
const CY = () => L.courtyard({ mark: false });
const HC = (o = {}) => ({ def: harry, id: 'harry', x: 700, y: 1040, s: 1.1, turn: 0.4, pose: 'stand', ...o });
const MC = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 920, y: 1060, turn: -0.4, pose: 'stand', expr: 'calm', ...o });
ep.panel(760, { cam: { on: ['harry', 'mcgonagall'], fr: 'knees' }, bg: CY, actors: [HC({ expr: 'calm' }), L.trunk(460, 1060, 0.4, '#7a4e2e', true), MC()] },
  [cap('Sunset, in the leaf-dusted courtyard between Diagon Alley and the entire Muggle world.', 44, 34, { w: 440 }),
   say('McGonagall', 'This has been the strangest day of my life for… many a year. Since the day I learned that a child had defeated You-Know-Who.', 560, 590, { w: 360, size: 27 })], { mood: 'dusk' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: CY, blur: 3, actors: [HC({ expr: 'unimpressed' })] },
  [inner('Harry', '*You think YOUR day was surreal? Try mine.*', 400, 450, { w: 480 })], { mood: 'dusk' });
ep.panel(700, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust' }, bg: CY, actors: [HC({ expr: 'warm' }), MC({ expr: 'shock' })] },
  [say('Harry', 'I was very impressed with you today. I should have said so out loud. I was awarding you points in my head and everything.', 250, 100, { w: 380, size: 28 }),
   say('McGonagall', 'Thank you, Mr Potter. If you had already been sorted into a House, I would have deducted so many points your *grandchildren* would still be losing the House Cup.', 560, 580, { w: 360, size: 26 })], { mood: 'dusk' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: CY, blur: 3, actors: [HC({ expr: 'bigGrin' })] },
  [say('Harry', 'Thank *you*, Professor.', 400, 100, { w: 280 }), cap('It was probably too early to call her Minnie.', 44, 430, { w: 360 })], { mood: 'dusk' });
ep.panel(660, { cam: { on: ['harry'], fr: 'bust' }, bg: CY, blur: 2, actors: [HC({ expr: 'scheme', pose: 'think' })] },
  [inner('Harry', 'This woman might well be the sanest adult he had ever met. He was even considering offering her the number-two position in whatever group he formed to fight the Dark Lord.', 400, 110, { w: 560, size: 27 }),
   inner('Harry', '*What would be a good name for that…? The Death Eater Eaters?*', 400, 560, { w: 520 })], { mood: 'dusk' });
ep.panel(700, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist' }, bg: CY, actors: [HC({ expr: 'sad', pose: 'present', armB: { sh: 60, el: 30, hand: 'hold', prop: g({ transform: 'rotate(-80)' }, wand(104, '#8a5a2a')) } }), MC({ expr: 'calm' })] },
  [say('McGonagall', 'And, Mr Potter, about your wand—', 560, 90, { w: 300 }),
   say('Harry', 'I know what you\'re going to ask. Take it. I hadn\'t planned to do anything, but I don\'t want you to have nightmares about me blowing up my house.', 250, 560, { w: 380, size: 27 })], { mood: 'dusk' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: CY, blur: 2, actors: [MC({ expr: 'flustered', pose: 'shrug' })] },
  [say('McGonagall', 'Oh no, Mr Potter! That isn\'t done. I only meant to warn you not to *use* it at home. The Ministry can detect underage magic, and it is prohibited without supervision.', 540, 130, { w: 380, size: 27 })], { mood: 'dusk' });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: CY, blur: 2, actors: [HC({ expr: 'calm' })] },
  [say('Harry', 'Ah. That sounds like a very sensible rule. I get it. Magic is dangerous and the rules are there for good reasons. Certain *other* matters are also dangerous. I get that too.', 400, 120, { w: 560, size: 27 }),
   say('Harry', 'Remember that I am not stupid.', 400, 520, { w: 300 })], { mood: 'dusk' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: CY, blur: 3, actors: [MC({ expr: 'warm' })] },
  [say('McGonagall', 'I am unlikely ever to forget it. Thank you, *Harry.* That does make me feel better about entrusting you with certain things.', 400, 110, { w: 540 }),
   say('McGonagall', 'Goodbye for now.', 540, 480, { w: 200 })], { mood: 'dusk' });
ep.panel(760, { cam: { x: 520, y: 700, w: 1000 }, bg: CY, actors: [HC({ x: 300, turn: -0.7, pose: 'walk', expr: 'calm' }), L.trunk(180, 1060, 0.4, '#7a4e2e', true)] },
  [cap('Harry turned to go—into the Leaky Cauldron, and out towards the Muggle world. As his hand touched the door handle, he heard a last whisper from behind him.', 330, 34, { w: 420, size: 26 }),
   whisper('McGonagall', 'Hermione Granger.', 640, 600, { w: 240, tail: [790, 640] })], { mood: 'dusk' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: CY, blur: 3, actors: [HC({ x: 300, turn: 0.3, expr: 'confused' })] },
  [say('Harry', 'What?', 400, 100, { w: 150 }),
   whisper('McGonagall', 'Look for a first-year girl named Hermione Granger on the train to Hogwarts.', 400, 460, { w: 440, tail: [790, 480] })], { mood: 'dusk' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: CY, blur: 3, actors: [HC({ x: 300, turn: 0.5, expr: 'focus' })] }, [say('Harry', 'Who is she?', 400, 100, { w: 200 })], { mood: 'dusk' });
ep.bleed(900, { cam: { x: 900, y: 640, w: 1100 }, bg: CY, actors: [(e) => FX.sparkles([[920, 700, 20], [880, 620, 12], [960, 560, 9]], { col: '#fff3b0' })] },
  [capC('There was no answer. When Harry turned around, Professor McGonagall was gone.', 400, 100, { w: 520 })], { mood: 'dusk', alt: 'The courtyard is empty; a last few sparkles hang in the air.' });

// =============================================================== Aftermath
ep.setBg('#241a2e');
ep.tile({ h: 160, panels: [], bubbles: [plain('AFTERMATH', 400, 100, { font: "'IM Fell English SC', serif", size: 30, color: '#e8dcc2' })], bg: { top: C.paper, bottom: '#241a2e' } });
const HM = () => L.headmasterOffice();
const DUM = (o = {}) => ({ def: dumbledore, id: 'dumbledore', x: 1000, y: 900, turn: 0.1, pose: 'crossArms', expr: { base: 'warm', eyes: { sparkle: true } }, ...o });
ep.panel(900, { cam: { x: 1000, y: 520, w: 1500 }, bg: HM, actors: [DUM({ pose: 'sit', y: 820 }), L.officeDesk(), { def: mcgonagall, id: 'mcgonagall', x: 400, y: 1060, turn: 0.4, pose: 'stand', expr: 'blank' }] },
  [cap('Hogwarts. The Headmaster\'s office. Late.', 44, 34, { w: 360 })], { mood: 'candle', alt: 'A round office crowded with spindly silver instruments and sleeping portraits; a red-gold phoenix on a perch. Behind a great desk sits an ancient wizard with a long silver beard and half-moon spectacles.' });
ep.panel(760, { cam: { on: ['dumbledore'], fr: 'close' }, bg: HM, blur: 2, actors: [DUM({ pose: 'sit', y: 820, turn: -0.2 })] },
  [say('Dumbledore', 'So, my dear. How did you find Harry?', 280, 110, { w: 300 })], { mood: 'candle' });
ep.multi(900, [0, 1, 2].map((i) => ({ x: M, y: 18 + i * 296, w: 752, h: 280, mood: 'candle', art: { cam: { on: ['mcgonagall'], fr: 'close', padX: 2 }, bg: HM, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 400, y: 1060, turn: 0.2, expr: i === 1 ? { base: 'blank', mouth: { type: 'o', open: 0.3 } } : 'blank' }] } })),
  [note('(opens mouth)', 600, 250, { size: 32, color: '#f1e6cc' }), note('(closes mouth)', 600, 546, { size: 32, color: '#f1e6cc' }), note('(opens mouth again)', 580, 842, { size: 32, color: '#f1e6cc' })], { alt: 'Three panels: McGonagall opens her mouth, closes it, and opens it again. No words come out.' });
ep.panel(760, { cam: { on: ['dumbledore'], fr: 'bust' }, bg: HM, blur: 2, actors: [DUM({ pose: 'sit', y: 820, turn: -0.2, expr: { base: 'calm', eyes: { open: 0.8 } } })] },
  [say('Dumbledore', 'I see.', 280, 100, { w: 150 }),
   say('Dumbledore', 'Thank you for your report, Minerva. You may go.', 280, 560, { w: 320 })], { mood: 'candle' });
ep.setBg(C.paper);
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: '#241a2e', bottom: C.paper } });
ep.end();
export default ep;
