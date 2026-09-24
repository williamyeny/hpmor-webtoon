// EPISODE 9 — The Moon  (source: HPMOR ch. 7, second half + Aftermath; the Neville prank SHOWN, from ch. 8's telling)
import { Episode, say, shout, whisper, think, inner, cold, cap, dark, title, plain, M } from '../engine/core/dsl.js';
import { shot } from '../engine/core/scene.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as S from '../engine/bg/station.js';
import * as L from '../engine/bg/london.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harry, harryRobes, draco, fred, george, neville, chaosLord, makeExtra } from '../engine/chars/cast.js';
import { comedCan, spray, earthrise, bookOpen, owl, sheet, quill, galleon } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep09', number: 9, title: 'The Moon' });
ep.setBg(C.paper);
ep.beat(260, [plain('EPISODE NINE', 400, 90, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('The Moon', 400, 170, { size: 56 })]);

const P9 = () => S.platform934();
const TABLE = () => S.picnicTable(1100, 1170);
const CAN = { sh: 110, el: 40, hand: 'hold', prop: g({ transform: 'translate(0,8)' }, comedCan(1)) };
const CANLOW = { ...CAN, sh: 35, el: 95 };
const DP = (o = {}) => ({ def: draco, id: 'draco', x: 980, y: 1180, s: 1.1, turn: 0.4, pose: 'stand', expr: 'calm', ...o });
const HP = (o = {}) => ({ def: harryRobes, id: 'harry', x: 1230, y: 1180, s: 1.1, turn: -0.4, pose: 'stand', mask: 'scarfDown', ...o });

// =============================================================== the headline's author
ep.panel(660, { cam: { on: ['draco', 'harry'], fr: 'waist', dy: -0.55 }, bg: P9, mid: TABLE, actors: [DP(), HP({ expr: 'angry', pose: 'point' })],
  over: (e) => g({ transform: `translate(${e.w * 0.5},${e.h * 0.66}) scale(0.35) rotate(4)` }, S.quibblerPage()) },
  [say('Draco', 'Who\'ve you got in mind?', 190, 120, { w: 260, fixed: true }),
   say('Harry', 'The guy who came up with *this* headline.', 590, 120, { w: 290, fixed: true })], { mood: 'day', alt: 'Harry slams the Quibbler down on a picnic table.' });
ep.panel(900, { cam: { on: ['draco'], fr: 'bust', zoom: 0.95, dy: -0.1 }, bg: P9, blur: 2, actors: [DP({ expr: 'cross', pose: 'crossArms' })] },
  [say('Draco', 'Not a guy. A *girl.* A ten-year-old girl, can you believe it?', 250, 105, { w: 360 }),
   say('Draco', 'She went nuts after her mother died, and her father, who owns the paper, is *convinced* she\'s a seer. So he prints whatever Luna Lovegood says.', 400, 770, { w: 560, size: 27 })], { mood: 'day' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust', zoom: 0.9, dy: -0.1 }, bg: P9, blur: 2, actors: [HP({ expr: 'unimpressed', pose: 'holdOne', armF: { ...CAN, sh: 60, el: 85 } })] },
  [say('Harry', 'Are you kidding me? That\'s even worse than Muggle journalism, which I would have thought was physically impossible.', 400, 110, { w: 520 }),
   cap('Not really thinking about it, Harry opened another can and started to drink.', 44, 640, { w: 600 })], { mood: 'day' });
ep.panel(880, { cam: { on: ['draco'], fr: 'bust' }, bg: P9, blur: 3, actors: [DP({ expr: { base: 'coldSmile', eyes: { style: 'normal', open: 0.7 } } })] },
  [say('Draco', 'She has some sort of perverse obsession about the Malfoys, and her father is politically opposed to us, so he prints every word.', 400, 132, { w: 560, size: 28, fixed: true }),
   cold('Draco', 'As soon as I\'m old enough, I\'m going to make her pay. Curse her properly. The kind of curse St Mungo\'s can\'t fix.', 400, 722, { w: 500 })], { mood: 'cold', alt: 'Draco says it lightly, pleasantly, as if it were nothing.' });
ep.bleed(740, { cam: { on: ['harry'], fr: 'bust' }, bg: P9, blur: 3, actors: [HP({ expr: 'horror', pose: 'cower' })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.45, { bg: '#e8ffd8', col: '#6ad05a', op: 0.5 }), over: (e) => spray(e.w * 0.5, e.h * 0.55, 1, 1.6) + spray(e.w * 0.5, e.h * 0.55, -1, 1.4) },
  [cap('Green liquid spurted out of Harry\'s nostrils. Comed-Tea and lungs did not mix.', 40, 30, { w: 640 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['draco'], fr: 'close' }, bg: P9, blur: 3, actors: [DP({ expr: 'suspicious' })] }, [say('Draco', 'Something wrong?', 250, 95, { w: 340, fixed: true })], { mood: 'day' });
ep.panel(920, { cam: { on: ['draco', 'harry'], fr: 'waist', dy: -0.8 }, bg: P9, blur: 4, mid: TABLE, actors: [DP({ expr: 'calm', pose: 'handsHips' }), HP({ expr: 'blank' })], over: (e) => rect(0, 0, e.w, e.h, { fill: '#9ab0c8', opacity: 0.12 }) },
  [cap('It was at this point that Harry realised two things.', 40, 30, { w: 620, fixed: true }),
   cap('One: the sounds of the platform had blurred into white noise, at around the time Draco had reached inside his robes.', 200, 125, { w: 470, size: 26, fixed: true }),
   cap('Two: when they\'d talked about murder as a bonding method, exactly one person in the conversation had thought they were joking.', 40, 735, { w: 500, size: 26, fixed: true })], { mood: 'day', alt: 'The busy platform behind them has gone soft and silent, as if under glass.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: P9, blur: 4, actors: [HP({ expr: 'cold' })], over: (e) => FX.frost(e.w, e.h, 0.3, 4) },
  [inner('Harry', 'Right. Because he seemed like such a normal kid. And he *is* a normal kid. He is just what you\'d expect a boy to be like if Darth Vader were his doting father.', 400, 120, { w: 560, size: 28 })], { mood: 'cold' });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: P9, blur: 4, actors: [HP({ expr: { base: 'smile', eyes: { lookX: -0.6 } }, pose: 'shrug' })] },
  [say('Harry', 'I was just surprised how openly you discussed it. You didn\'t seem worried about getting caught.', 400, 110, { w: 480 })], { mood: 'day' });
ep.panel(480, { cam: { on: ['draco'], fr: 'close', dx: -0.55 }, bg: P9, blur: 4, actors: [DP({ expr: 'smug' })] }, [say('Draco', 'Are you joking? *Luna Lovegood\'s* word against *mine?*', 235, 130, { w: 300, fixed: true })], { mood: 'day' });
ep.panel(1060, { cam: { on: ['draco'], fr: 'waist', dy: -0.23 }, bg: P9, blur: 4, actors: [DP({ def: { ...draco, outfit: { ...draco.outfit, handOut: 0.3 } }, expr: 'calm', pose: 'lecture' })] },
  [say('Draco', 'Look, I\'ll explain how it really works, like you were already in Slytherin. The courts use truth potion, but it\'s a joke: you just get yourself Obliviated before you testify.', 400, 214, { w: 460, size: 27, fixed: true }),
   say('Draco', 'And if *I\'m* involved, it touches the honour of a Noble House, so it goes to the Wizengamot, where Father has the votes. Afterwards, the Lovegoods have to pay *us* reparations.', 400, 850, { w: 460, size: 27, fixed: true })], { mood: 'day' });
ep.panel(720, { cam: { head: 'harry', hw: 0.66, hx: 0.5, hy: 0.37 }, bg: P9, blur: 4, actors: [HP({ expr: 'cold' })], over: (e) => FX.frost(e.w, e.h, 0.6, 5) },
  [cold('Harry', 'Note to self: overthrow government of magical Britain at earliest convenience.', 400, 664, { w: 560, anchor: 'bc', fixed: true })], { mood: 'cold' });
ep.panel(920, { cam: { on: ['draco'], fr: 'bust', zoom: 0.95, dy: -0.1 }, bg: P9, blur: 4, actors: [DP({ expr: 'grin', pose: 'holdOne', armF: CANLOW })] },
  [say('Draco', 'Better still, only do things the Healers can fix. Then just Obliviate her afterwards, and do it all again next week.', 400, 134, { w: 520, fixed: true }),
   say('Draco', 'Though just imagine her saying she\'d been done by Draco Malfoy *and* the Boy-Who-Lived! Not even *Dumbledore* would believe her.', 400, 780, { w: 520, size: 27, fixed: true })], { mood: 'day' });
ep.panel(860, { cam: { on: ['harry'], fr: 'bust' }, bg: P9, blur: 4, actors: [HP({ expr: 'coldSmile', pose: 'think' })], over: (e) => FX.frost(e.w, e.h, 0.4, 6) },
  [inner('Harry', '*I am going to tear apart your pathetic little magical remnant of the Dark Ages into pieces smaller than its constituent atoms.*', 400, 120, { w: 560 }),
   say('Harry', 'Actually, can we hold off on that? Now that I know she\'s a year younger than me, I had a different thought for my revenge.', 400, 700, { w: 520, fixed: true })], { mood: 'cold' });
ep.panel(730, { cam: { on: ['draco'], fr: 'bust', zoom: 0.8, dy: -0.05 }, bg: P9, blur: 4, actors: [DP({ expr: 'focus', pose: 'holdOne', armF: { ...CAN, sh: 60, el: 85 } })] },
  [say('Draco', 'Huh? Do tell.', 230, 95, { w: 300, fixed: true }), cap('Draco started to take another swig. Harry timed it exactly right:', 40, 606, { w: 430, fixed: true })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: P9, blur: 4, actors: [HP({ expr: 'scheme' })] }, [say('Harry', 'I was thinking: *some day I\'m going to marry that woman.*', 400, 110, { w: 460 })], { mood: 'day' });
// the payoff of the spit-take gag: this time the whole panel explodes
ep.panel(840, { cam: { on: ['draco'], fr: 'bust', zoom: 0.92, dy: -0.02 }, bg: P9, blur: 4, actors: [DP({ expr: 'horror', pose: 'panic' })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.45, { bg: '#e8ffd8', col: '#6ad05a', op: 0.5 }), over: (e) => spray(e.w * 0.52, e.h * 0.5, 1, 1.8) + FX.sfxText(e.w / 2, e.h * 0.2, 'KER-SPLUTCH', { size: 66, fill: '#caffb0', rot: 4 }) },
  [shout('Draco', '*Are you NUTS?*', 400, 660, { w: 300, size: 38 })], { mood: 'day', shape: 'burst', points: 18, seed: 11 });
ep.panel(720, { cam: { head: 'harry', hw: 0.44, hx: 0.5, hy: 0.46 }, bg: P9, blur: 4, actors: [HP({ expr: 'coldSmile', pose: 'crossArms' })], over: (e) => FX.frost(e.w, e.h, 0.3, 7) },
  [cold('Harry', 'Quite the opposite. I\'m so sane it burns like ice.', 400, 110, { w: 440 })], { mood: 'cold' });
ep.panel(900, { cam: { on: ['draco'], fr: 'bust', zoom: 0.92, dx: -0.3, dy: -0.12 }, bg: P9, blur: 4, actors: [DP({ expr: { base: 'smug', eyes: { open: 0.8 } } })] },
  [say('Draco', 'You\'ve got weirder taste than a Lestrange. I suppose you want her all to yourself, huh?', 298, 140, { w: 380, fixed: true }),
   say('Harry', 'Yep. I\'ll owe you a favour for it—', 560, 680, { w: 250, tail: [784, 702], fixed: true }),
   say('Draco', 'Nah. This one\'s free.', 215, 800, { w: 240, fixed: true, tail: 'draco' })], { mood: 'day' });
// the cold reflection
ep.setBg('#1c2a3a');
ep.beat(140, [], { bg: { top: C.paper, bottom: '#1c2a3a' } });
ep.panel(800, { cam: { on: ['harry'], fr: 'close', dy: 0.1 }, bg: P9, blur: 4, actors: [HP({ expr: 'cold' })], over: (e) => FX.frost(e.w, e.h, 0.8, 8) },
  [dark('Charming. Happy. Generous with his favours to his friends. Draco wasn\'t a psychopath. That was the sad and awful part.', 400, 120, { w: 580 }),
   dark('It didn\'t take an evil mutant to say what Draco had said. It was very simple, very human. To Draco, his enemies weren\'t people.', 400, 680, { w: 580 })], { mood: 'cold', alt: 'Harry\'s face, very still, frosted over.' });
// the imagined list floats straight on the dark page: no frame, no backdrop
ep.cutout(940, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = K.glow(w * 0.5, h * 0.5, 420, '#9bb7cf', 0.18);
  // a scroll of names, a crude guillotine silhouette, very faint
  out += g({ transform: `translate(${w * 0.3},${h * 0.5})` }, rect(-110, -200, 220, 400, { fill: '#dfe8ef', opacity: 0.9, stroke: '#6a8aa8', 'stroke-width': 2 }), ...Array.from({ length: 12 }, (_, i) => line(-90, -170 + i * 30, 60 - (i % 3) * 30, -170 + i * 30, { stroke: '#4a6a86', 'stroke-width': 4 })), text(0, -210, 'BLOOD PURISTS', { 'font-family': 'Alegreya SC', 'font-size': 22, fill: '#dfe8ef', 'text-anchor': 'middle' }));
  out += g({ transform: `translate(${w * 0.72},${h * 0.52})`, opacity: 0.8 }, rect(-80, -260, 14, 440, { fill: '#9bb7cf' }), rect(66, -260, 14, 440, { fill: '#9bb7cf' }), rect(-80, -270, 160, 16, { fill: '#9bb7cf' }), path('M-66,-200 L66,-160 L66,-120 L-66,-160Z', { fill: '#dcebf5' }), rect(-110, 170, 220, 30, { fill: '#9bb7cf' }));
  return out;
}, [cold('Harry', 'I wonder how difficult it would be to just make a list of all the top blood purists and kill them.', 400, 105, { w: 560, fixed: true }),
    cap('(They\'d tried exactly that in the French Revolution, more or less. It hadn\'t worked out well. Maybe he should find out what went wrong, and whether it was easy to fix.)', 40, 730, { w: 530, size: 25, fixed: true })],
  { alt: 'In Harry\'s imagination, in freezing blue: a scroll of names headed BLOOD PURISTS, and beside it, the outline of a guillotine.' });
ep.setBg(C.paper);
ep.beat(140, [], { bg: { top: '#1c2a3a', bottom: C.paper } });
// looking up through the station's iron arch: the panel is the arch
ep.panel(880, { cam: { x: 1250, y: -210, w: 850 }, bg: P9, actors: [(e) => K.glow(1300, -420, 170, '#ffffff', 0.35) + circle(1300, -420, 74, { fill: '#f7f7f1', opacity: 0.85 }) + circle(1280, -434, 13, { fill: '#e0e0d6', opacity: 0.8 }) + circle(1326, -398, 9, { fill: '#e0e0d6', opacity: 0.8 }) + circle(1310, -450, 6, { fill: '#e0e0d6', opacity: 0.8 })] },
  [inner('Harry', '*So the world is broken and flawed and insane, and cruel and bloody and dark. This is news? You always knew that, anyway…*', 400, 470, { w: 560 }),
   cap('Harry gazed up at the pale shape of the Moon, visible that morning through the cloudless air.', 40, 690, { w: 420 })], { mood: 'day', shape: 'arch', spring: 0.46, panel: { borderWidth: 6, borderColor: '#34393f' }, alt: 'Above the station\'s iron arches, the pale morning Moon.' });

// =============================================================== the pitch
ep.panel(1000, { cam: { on: ['draco', 'harry'], fr: 'waist', dy: -0.4 }, bg: P9, mid: TABLE, actors: [DP({ expr: 'smile', pose: 'gesture' }), HP({ expr: 'sad' })] },
  [say('Draco', 'You\'re looking all serious. Let me guess. Your Muggle parents told you this sort of thing was bad.', 400, 142, { w: 540, fixed: true }),
   say('Draco', 'Like Father says, there may be four Houses, but in the end everyone belongs to either Slytherin or Hufflepuff. And you\'re *not* on the Hufflepuff end.', 390, 832, { w: 540, size: 27, fixed: true, tail: 'draco' })], { mood: 'day' });
ep.panel(680, { cam: { on: ['draco'], fr: 'close', zoom: 0.85, dy: -0.12 }, bg: P9, blur: 3, actors: [DP({ expr: 'scheme' })] },
  [say('Draco', 'If you side with the Malfoys under the table… our power and your reputation… you could get away with things even *I* can\'t. Want to *try* it for a while?', 400, 172, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(720, { cam: { on: ['harry'], fr: 'close', zoom: 0.8, dy: 0.12 }, bg: P9, blur: 3, actors: [HP({ expr: 'focus' })], over: (e) => FX.frost(e.w, e.h, 0.2, 10) },
  [inner('Harry', '*Aren\'t we a clever little serpent. Eleven years old and already coaxing your prey from hiding…*', 400, 92, { w: 600, fixed: true }),
   say('Harry', 'Draco, you want to explain the whole blood purity thing to me? I\'m sort of new.', 400, 610, { w: 520, fixed: true })], { mood: 'day' });
// Draco's creed as a hanging House banner: a dagged hem and gold trim
const BANNER = (w, h) => { const d = 70, n = 5, pts = [[0, 0], [w, 0], [w, h - d]]; for (let i = n; i > 0; i--) pts.push([w * (i - 0.5) / n, h], [w * (i - 1) / n, h - d]); return 'M' + pts.map(([x, y]) => `${Math.round(x)},${Math.round(y)}`).join(' L') + 'Z'; };
ep.panel(1060, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = `<defs><linearGradient id="fade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e7bb4f"/><stop offset="1" stop-color="#2a2220"/></linearGradient></defs>` + rect(0, 0, w, h, { fill: '#1d1812' });
  // four founders' treasures, bright on the left, generations of wizards fading to the right
  const icons = [(x, y) => path(`M${x - 20},${y - 30} L${x + 20},${y - 30} L${x + 14},${y + 30} L${x - 14},${y + 30}Z`, { fill: '#e7bb4f', stroke: C.ink, 'stroke-width': 2 }), (x, y) => path(`M${x},${y - 50} L${x + 6},${y + 20} L${x - 6},${y + 20}Z M${x - 22},${y + 20} L${x + 22},${y + 20}`, { fill: '#c9ced4', stroke: '#c9ced4', 'stroke-width': 4 }), (x, y) => path(`M${x - 26},${y} Q${x},${y - 30} ${x + 26},${y}`, { fill: 'none', stroke: '#6ab0e0', 'stroke-width': 6 }), (x, y) => ellipse(x, y, 20, 26, { fill: '#2f7a3a', stroke: '#e7bb4f', 'stroke-width': 3 })];
  out += K.glow(w / 2, 350, 300, '#e7bb4f', 0.35);
  icons.forEach((f, i) => { out += g({ transform: `translate(${w / 2 + (i - 1.5) * 150},355) scale(1.8)` }, f(0, 0)); });
  for (let i = 0; i < 8; i++) { const x = 80 + i * 90, y0 = 545, op = 1 - i * 0.12; out += g({ opacity: op }, circle(x, y0, 22, { fill: '#e8d9b8' }), path(`M${x - 30},${y0 + 110} L${x},${y0 + 20} L${x + 30},${y0 + 110}Z`, { fill: '#5a4a72' }), path(`M${x + 20},${y0 + 40} l30,-40`, { stroke: '#ffe08a', 'stroke-width': 3 }), circle(x + 50, y0, 6 - i * 0.6, { fill: '#ffe08a' })); }
  out += rect(0, h - 120, w, 120, { fill: 'url(#fade)', opacity: 0.4 });
  return out;
}, [dark('"Our powers have grown weaker, generation by generation, as the Mudblood taint increases. Where Salazar and Godric and Rowena and Helga raised Hogwarts by their power, no wizard of these faded days has risen to rival them."', 400, 110, { w: 600, size: 27 }),
    dark('"If the taint isn\'t checked, our wands will break, the line of Merlin will end, and our children will be left scratching at the dirt like the Muggles. And darkness will cover all the world for ever."', 400, 850, { w: 600, size: 27 })],
  { shape: BANNER, frame: 'gilt', alt: 'A tapestry-like illustration: the four Founders\' treasures shining, then a line of wizards, each generation\'s wand-spark dimmer than the last.' });
ep.panel(800, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.55 }, bg: P9, blur: 2, actors: [HP({ expr: 'think', pose: 'think' })] },
  [say('Harry', 'Persuasive. But I have to correct you on one point of fact. Your information about the Muggles is a bit out of date. *We* aren\'t exactly scratching at the dirt any more.', 400, 170, { w: 540, size: 28, fixed: true })], { mood: 'day' });
ep.panel(460, { cam: { on: ['draco'], fr: 'close' }, bg: P9, blur: 3, actors: [DP({ expr: 'shock' })] }, [shout('Draco', '*What?* What do you mean, *we?*', 300, 105, { w: 340, size: 30, fixed: true })], { mood: 'day' });
ep.panel(800, { cam: { on: ['harry'], fr: 'waist' }, bg: P9, actors: [HP({ expr: 'determined', pose: 'lecture' })], under: (e) => rect(0, 0, e.w, e.h, { fill: '#f6e3b0', opacity: 0.3 }) },
  [say('Harry', '*We.* The scientists. The line of Francis Bacon and the blood of the Enlightenment.', 400, 124, { w: 460, fixed: true }),
   say('Harry', 'Quick check, Draco. Have wizards ever been to the Moon? You know, *that* thing?', 400, 650, { w: 460, fixed: true })], { mood: 'day' });
ep.panel(700, { cam: { on: ['draco'], fr: 'bust', zoom: 0.9, dy: -0.15 }, bg: P9, blur: 2, actors: [DP({ expr: 'confused', pose: 'pointUp' })] },
  [say('Draco', 'Go to the—it\'s just a… you can\'t Apparate to somewhere you\'ve never *been.* How would anyone get to the Moon in the *first* place?', 400, 138, { w: 500, size: 28, fixed: true })], { mood: 'day' });
ep.panel(920, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#3a2618' }) + K.glow(ctx.w * 0.5, ctx.h * 0.3, 500, C.candle, 0.4) +
  g({}, ...Array.from({ length: 16 }, (_, i) => rect(40 + (i % 6) * 125, ctx.h - 60 - Math.floor(i / 6) * 130 - 110, 115, 110, { fill: '#b9955e', stroke: C.ink, 'stroke-width': 3 }))) +
  shot({ cam: { on: ['harry'], fr: 'full', zoom: 0.7, dx: -0.9, dy: -0.2 }, actors: [HP({ x: 400, y: 1000, turn: 0.6, pose: 'run', expr: 'determined' })] })(ctx) + FX.speedLines(ctx.w, ctx.h, { n: 20 }),
  [say('Harry', 'Hold on, I\'d like to show you a book. I think I remember which box it\'s in…', 338, 120, { w: 430, fixed: true }),
   cap('(Harry had inherited the nigh-magical Verres ability to remember where all his books were, which was rather mysterious considering the lack of any genetic connection.)', 40, 700, { w: 560, size: 24, fixed: true })], { mood: 'warm', shape: 'slant', slant: 56, alt: 'Harry dashes down the stairs into the cavern of his trunk, between stacked boxes of books.' });
// THE picture: the open book lies on the page itself, between the reader's hands
ep.cutout(980, (ctx) => ellipse(ctx.w / 2 + 10, ctx.h * 0.52 + 252, 370, 32, { fill: '#3a2a1a', opacity: 0.28, filter: 'url(#blur3)' }) + g({ transform: `translate(${ctx.w / 2},${ctx.h * 0.52}) scale(4.6)` }, bookOpen({ w: 150, h: 104, col: '#243352' })) + g({ transform: `translate(${ctx.w / 2 + 174},${ctx.h * 0.52})` }, earthrise(310, 228)),
  [dark('The one with the white, dry, cratered land, and the suited people, and the blue-white globe hanging over it all.', 400, 90, { w: 560, fixed: true }),
   dark('*That* picture. *The* picture, if only one picture in all the world were to survive.', 400, 895, { w: 560, fixed: true })], { alt: 'An open book. On the right-hand page, the photograph: astronauts on the grey lunar surface, and the Earth, blue and white, hanging in the black sky.' });
ep.panel(720, { cam: { on: ['harry'], fr: 'close', zoom: 0.78, dy: 0.05 }, bg: P9, blur: 3, actors: [HP({ expr: { base: 'hopeful', eyes: { teary: true } } })] },
  [say('Harry', '*That*… is what the Earth looks like from the Moon.', 400, 105, { w: 420, fixed: true }), cap('His voice trembled. He couldn\'t quite keep the pride out.', 40, 610, { w: 680, fixed: true })], { mood: 'day' });
ep.panel(720, { cam: { on: ['draco'], fr: 'close', zoom: 0.8, dy: 0.05 }, bg: P9, blur: 3, actors: [DP({ expr: { base: 'awe', eyes: { sparkle: false, lookY: 0.7 } } })] },
  [whisper('Draco', 'If that\'s a *real* picture… why isn\'t it moving?', 400, 105, { w: 400, fixed: true }),
   whisper('Draco', 'And what are *those?*', 400, 630, { w: 420, fixed: true })], { mood: 'day' });
ep.panel(680, { cam: { on: ['harry'], fr: 'bust', zoom: 0.9, dy: -0.45 }, bg: P9, blur: 2, actors: [HP({ expr: 'warm', pose: 'present' })] },
  [say('Harry', 'Those are human beings. Wearing suits that give them air, because there is no air on the Moon.', 400, 128, { w: 580, fixed: true })], { mood: 'day' });
ep.panel(600, { cam: { on: ['draco'], fr: 'close', zoom: 0.85, dy: -0.05 }, bg: P9, blur: 3, actors: [DP({ expr: 'horror' })] }, [whisper('Draco', 'That\'s impossible. No Muggle could ever do that. *How…*', 400, 95, { w: 460, fixed: true })], { mood: 'day' });
// book plates, drawn big enough to read on a phone
const ROCKET = (c, fire) => {
  const cx = c.w / 2, gy = c.h - 70, bw = 30, hh = 300, bot = fire ? gy - 160 : gy, top = bot - hh;
  let o = rect(0, 0, c.w, c.h, { fill: '#9fb8d8' }) + rect(0, gy, c.w, c.h - gy, { fill: '#b5ab96' }) + line(0, gy, c.w, gy, { stroke: C.ink, 'stroke-width': 2 });
  if (fire) o += path(`M${cx - bw},${bot} Q${cx - 46},${bot + 110} ${cx},${gy + 10} Q${cx + 46},${bot + 110} ${cx + bw},${bot}Z`, { fill: '#f0a13c', stroke: '#c86a1e', 'stroke-width': 2 }) + path(`M${cx - bw * 0.5},${bot} Q${cx - 18},${bot + 70} ${cx},${bot + 130} Q${cx + 18},${bot + 70} ${cx + bw * 0.5},${bot}Z`, { fill: '#ffe08a' }) + [-120, -70, -20, 30, 80, 125].map((dx, i) => circle(cx + dx, gy - 6 + (i % 2) * 10, 34 + (i % 3) * 8, { fill: '#f4f1ea', stroke: '#c9c2b2', 'stroke-width': 2, opacity: 0.95 })).join('');
  o += path(`M${cx},${top} L${cx + bw},${top + hh * 0.14} L${cx + bw},${bot} L${cx - bw},${bot} L${cx - bw},${top + hh * 0.14}Z`, { fill: '#f1efe8', stroke: C.ink, 'stroke-width': 2.5 });
  for (const f of [0.35, 0.6, 0.82]) o += rect(cx - bw, top + hh * f, bw * 2, 9, { fill: '#1b1b1b' });
  o += path(`M${cx - bw},${bot} l-22,26 l22,-6Z M${cx + bw},${bot} l22,26 l-22,-6Z`, { fill: '#1b1b1b' });
  if (!fire) { const px = cx + bw + 42; o += circle(px, gy - 12, 2.2, { fill: C.ink }) + line(px, gy - 10, px, gy - 3, { stroke: C.ink, 'stroke-width': 2 }) + circle(px, gy - 7, 20, { fill: 'none', stroke: '#c0392b', 'stroke-width': 3 }) + line(px + 14, gy - 22, px + 58, gy - 90, { stroke: '#c0392b', 'stroke-width': 3 }); }
  return o;
};
ep.multi(940, [
  // the book's plates, held up like prints: paper edges, a slight tilt, a shadow
  { x: M, y: 300, w: 368, h: 610, art: (c) => ROCKET(c, true), frame: 'paper', rotate: -2, shadow: true },
  { x: 408, y: 300, w: 368, h: 610, art: (c) => ROCKET(c, false), frame: 'paper', rotate: 2, shadow: true },
], [say('Harry', 'This is a rocket going up. The fire pushes it higher, until it gets to the Moon.', 208, 152, { w: 290, tail: null, fixed: true }), say('Harry', 'That tiny speck next to it is a person.', 592, 152, { w: 230, tail: null, fixed: true })],
  { alt: 'Two book plates: a Saturn V rocket lifting off on a column of fire; the same rocket on the ground, with a tiny speck of a person beside it.' });
ep.panel(880, { cam: { on: ['harry'], fr: 'bust', zoom: 0.9, dy: -0.1 }, bg: P9, blur: 2, actors: [HP({ expr: 'focus', pose: 'gesture' })] },
  [say('Harry', 'Going to the Moon cost probably around a thousand million Galleons. And it took more people than live in all of magical Britain.', 400, 146, { w: 540, fixed: true }),
   inner('Harry', '*And when they arrived, they left a plaque that said: "We came in peace, for all mankind." Though you\'re not yet ready to hear those words, Draco Malfoy…*', 400, 755, { w: 620, size: 26, fixed: true })], { mood: 'day' });
ep.panel(820, { cam: { on: ['draco'], fr: 'bust', zoom: 0.9, dy: -0.1 }, bg: P9, blur: 2, actors: [DP({ expr: 'teary', pose: 'hold' })] },
  [say('Draco', 'You\'re telling the truth. You wouldn\'t fake a whole book just for this. I can hear it in your voice.', 400, 145, { w: 520, fixed: true }),
   whisper('Draco', 'But… if *Muggles* have that kind of power… then what are *we?*', 400, 715, { w: 520, fixed: true })], { mood: 'day' });
ep.panel(750, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.12 }, bg: P9, actors: [HP({ expr: 'warm', pose: 'present' })], under: (e) => rect(0, 0, e.w, e.h, { fill: '#fff2c8', opacity: 0.3 }) },
  [say('Harry', 'No, Draco, that\'s not it. Science taps the power of human understanding. You look at the world and figure out how it works. It\'s not a *Muggle* thing. It\'s a *human* thing.', 400, 168, { w: 540, size: 27, fixed: true })], { mood: 'day' });
ep.panel(860, { cam: { on: ['harry'], fr: 'close', zoom: 0.78, dy: 0.62 }, bg: P9, blur: 2, actors: [HP({ expr: { base: 'warm', eyes: { lookX: -0.4 } }, pose: 'gesture' })], under: (e) => rect(0, 0, e.w, e.h, { fill: '#fff2c8', opacity: 0.3 }) },
  [say('Harry', 'Your magic could turn off, and you would hate that. But science is the power that can\'t be taken from me without taking *me.* It just trains the power you use every time you look at something you don\'t understand and ask, *"Why?"*', 400, 605, { w: 500, size: 26, fixed: true })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: P9, blur: 3, actors: [HP({ expr: 'scheme' })] }, [say('Harry', 'You\'re of Slytherin, Draco. Don\'t you see the implication?', 400, 110, { w: 440 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['draco'], fr: 'close' }, bg: P9, blur: 3, actors: [DP({ expr: { base: 'focus', eyes: { open: 1 } } })] }, [whisper('Draco', 'Wizards can learn to use this power.', 400, 110, { w: 400 })], { mood: 'day' });
ep.panel(800, { cam: { on: ['harry'], fr: 'close', zoom: 0.78, dy: 0.12 }, bg: P9, blur: 3, actors: [HP({ expr: 'smug' })] },
  [inner('Harry', '*Very carefully, now… the bait is set; now the hook…*', 400, 70, { w: 640, fixed: true }),
   say('Harry', 'If you can learn to think of yourself as a *human* instead of a *wizard*, then you can train your powers as a human.', 400, 660, { w: 520, fixed: true })], { mood: 'day' });
ep.panel(680, { cam: { on: ['draco'], fr: 'bust', zoom: 0.9, dy: -0.2 }, bg: P9, blur: 2, actors: [DP({ expr: { base: 'awe', eyes: { sparkle: false } } })] },
  [say('Draco', 'You think you can master *both* arts. Add the powers together, and… make yourself Lord of the two worlds?', 400, 142, { w: 520, fixed: true })], { mood: 'day' });
// the evil laugh can't be contained: his hands fly up past the frame
ep.panel(1080, { cam: { head: 'harry', hw: 0.38, hx: 0.5, hy: 0.17 }, bg: P9, blur: 2, actors: [HP({ expr: { base: 'scheme', glint: true }, pose: 'armsUp' })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.17, { bg: '#2a1a3a', col: '#8a5fb0', op: 0.7 }) },
  [shout('Harry', 'MWAHAHAHA!', 400, 74, { w: 300, size: 40, fixed: true }),
   say('Harry', 'The whole world you know is one square on a much larger game board, Draco. But I really *am* Ravenclaw. I don\'t want to rule the universe. I just think it could be more sensibly organised.', 400, 890, { w: 540, size: 27, fixed: true })], { mood: 'day', breakout: 'top', ph: 872, panel: { y: 190 }, alt: 'Harry gives an evil laugh, which just seemed to come naturally at that point.' });
ep.panel(460, { cam: { on: ['draco'], fr: 'close' }, bg: P9, blur: 3, actors: [DP({ expr: 'awe' })] }, [say('Draco', 'Why are you telling *me* this?', 280, 100, { w: 280 })], { mood: 'day' });
ep.panel(860, { cam: { on: ['harry'], fr: 'bust', zoom: 0.9, dy: -0.08 }, bg: P9, blur: 2, actors: [HP({ expr: 'determined' })] },
  [say('Harry', 'There aren\'t many people who know how to do *true* science. Help would be helpful.', 400, 110, { w: 480, fixed: true }),
   say('Harry', 'But science isn\'t like learning a spell. The power comes with a cost. A cost so high that most people refuse to pay it.', 400, 730, { w: 520, fixed: true })], { mood: 'day' });
ep.panel(460, { cam: { on: ['draco'], fr: 'close' }, bg: P9, blur: 3, actors: [DP({ expr: 'focus' })] }, [say('Draco', 'And that cost?', 250, 95, { w: 320, fixed: true })], { mood: 'day' });
// the answer, with no panel around it: said straight to the reader
ep.beat(400, [say('Harry', 'Learning to admit you\'re wrong.', 400, 200, { w: 460, size: 44, tail: null, fixed: true })]);
ep.panel(460, { cam: { on: ['draco'], fr: 'close' }, bg: P9, blur: 3, actors: [DP({ expr: 'deadpan' })] }, [say('Draco', 'Um. You going to explain that?', 280, 100, { w: 300 })], { mood: 'day' });
ep.panel(840, { cam: { on: ['harry'], fr: 'bust', zoom: 0.8, dy: -0.3 }, bg: P9, blur: 2, actors: [HP({ expr: 'warm', pose: 'gesture' })] },
  [say('Harry', 'Trying to figure out how something works, the first ninety-nine explanations you come up with are wrong. So you have to admit you\'re wrong, over and over and over again. And every time you change your mind, you change yourself.', 400, 195, { w: 540, size: 27, fixed: true })], { mood: 'day' });
ep.panel(720, { cam: { on: ['harry'], fr: 'close', zoom: 0.8, dy: 0.5 }, bg: P9, blur: 3, actors: [HP({ expr: 'determined' })] },
  [say('Harry', 'There\'s one condition. I\'m dealing with *you*, Draco. Not your father. Your moves in our game have to be your own.', 400, 555, { w: 520, fixed: true })], { mood: 'day' });
ep.panel(620, { cam: { on: ['draco'], fr: 'waist' }, bg: P9, actors: [DP({ expr: { base: 'worried', eyes: { lookY: 0.5 } }, pose: 'crossArms' })] },
  [say('Draco', 'I\'ve got to go. I\'ve got to go off and think about this.', 280, 100, { w: 340 }), say('Harry', 'Take your time.', 575, 470, { w: 300, tail: [790, 500], fixed: true })], { mood: 'day' });
ep.panel(640, { cam: { x: 1250, y: 860, w: 860 }, bg: P9, actors: [DP({ x: 1500, turn: 0.7, pose: 'walk', expr: 'think' }), HP({ x: 1000, turn: 0.3, pose: 'slump', expr: 'exasperated'})] },
  [cap('The sounds of the platform came back as Draco wandered off. Harry slowly exhaled a breath he hadn\'t realised he\'d been holding.', 40, 30, { w: 620, fixed: true })], { mood: 'day' });

// =============================================================== the Order of Chaos
ep.panel(820, { cam: { x: 1360, y: 800, w: 820 }, bg: P9, actors: [HP({ x: 1100, turn: 0.4, expr: 'suspicious' }), { def: chaosLord(fred, 1), id: 'fred', x: 1450, y: 1170, turn: -0.4, pose: 'stand', expr: 'grin' }, { def: chaosLord(george, 2), id: 'george', x: 1620, y: 1170, turn: -0.4, pose: 'crossArms', expr: 'grin' }] },
  [cap('When Harry looked up, two figures were approaching. They looked utterly ridiculous, their faces cloaked by winter scarves.', 40, 30, { w: 640, fixed: true }),
   say('Fred', 'Hello, Mr Bronze. Can we interest you in joining the Order of Chaos?', 545, 660, { w: 340, fixed: true, tail: 'fred' })], { mood: 'day', alt: 'Two tall figures with scarves wound over their heads like shrouds, only their eyes glinting through.' });
// the prank (shown)
const NEV = (o = {}) => ({ def: neville, id: 'neville', x: 1300, y: 1180, s: 1.05, turn: -0.2, pose: 'cower', expr: 'horror', ...o });
// alone on the bare page: no platform, no crowd, nobody near him
ep.cutout(820, { cam: { on: ['neville'], fr: 'full', zoom: 0.8, dx: -0.62, dy: -0.03 }, actors: [NEV({ pose: 'stand', expr: 'worried' })] },
  [cap('Meanwhile, not far away, a small, round boy had been left alone for a moment on the platform. He looked sure he was about to be attacked by Death Eaters.', 30, 30, { w: 380, fixed: true }),
   cap('(There\'s a saying: the fear is often worse than the thing itself.)', 30, 600, { w: 300, size: 25, fixed: true })], { alt: 'A small, round-faced boy stands alone and very frightened.' });
ep.bleed(1000, { cam: { x: 1320, y: 930, w: 840 }, bg: P9, actors: [
  { def: chaosLord(fred, 1), id: 'fred', x: 1040, y: 1180, turn: 0.5, pose: 'armsUp', expr: 'laugh' },
  NEV({ x: 1410, y: 1110, s: 0.95 }),
  { def: chaosLord(harryRobes, 3), id: 'harry', x: 1210, y: 1260, s: 1.1, turn: 0.3, pose: 'present', expr: 'laugh', armB: { sh: 62, el: 30, hand: 'palm', prop: g({ transform: 'translate(0,-6)' }, rect(-22, -10, 44, 20, { fill: '#6b3a1e', stroke: C.ink, 'stroke-width': 2 }), text(0, 5, 'CHOC', { 'font-family': 'Alegreya Sans', 'font-weight': 800, 'font-size': 11, fill: '#f1e6cc', 'text-anchor': 'middle' })) } },
  { def: chaosLord(george, 2), id: 'george', x: 1600, y: 1180, turn: -0.5, pose: 'wave', expr: 'laugh' }],
  over: (e) => { const R = rng(3); let o = ''; for (let i = 0; i < 14; i++) o += g({ transform: `translate(${R() * e.w},${R() * e.h * 0.7})` }, galleon(R.range(6, 12))); return o + FX.sfxText(e.w * 0.32, e.h * 0.12, 'HA HA HA!', { size: 70, rot: -8 }); } },
  [shout('Fred', 'Have some Knuts, boy!', 190, 870, { w: 230, size: 26, fixed: true }), shout('George', 'Have a silver *Sickle!*', 610, 870, { w: 230, size: 26, fixed: true })], { mood: 'day', alt: 'Three shrouded figures cavort around the terrified boy, laughing evilly, and showering him with chocolate and coins.' });
ep.panel(560, { cam: { on: ['neville'], fr: 'close' }, bg: P9, blur: 3, actors: [NEV({ x: 1300, y: 1120, s: 0.95, expr: 'teary' })] }, [whisper('Neville', 'go away', 400, 110, { w: 160, size: 24 })], { mood: 'day' });
ep.panel(800, { cam: { x: 1475, y: 800, w: 1250 }, bg: P9, actors: [...[921, 922, 923].map((sd, i) => ({ def: makeExtra(sd, {}), x: 945 + i * 180, y: 1120, turn: 0.3, pose: 'stand', expr: 'confused', s: 0.95 })), { def: chaosLord(fred, 1), x: 1580, y: 1180, turn: 0.7, pose: 'run', expr: 'laugh' }, { def: chaosLord(harryRobes, 3), id: 'harry', x: 1780, y: 1200, s: 1.1, turn: 0.7, pose: 'run', expr: 'laugh' }, { def: chaosLord(george, 2), x: 1980, y: 1180, turn: 0.7, pose: 'run', expr: 'laugh' }], behind: (e) => FX.speedLines(e.w, e.h, { n: 30 }) },
  [shout('Harry', 'AAAH! THE LIGHT! IT BURNS!', 505, 120, { w: 360, size: 30, fixed: true, tail: 'harry' }),
   cap('Some of the crowd had wanted to interfere at first. Then they saw what was actually happening, and were too confused to do anything.', 40, 612, { w: 600, size: 26, fixed: true })], { mood: 'day', shape: 'cut', cutTop: -60, cutBottom: -60 });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: P9, blur: 3, actors: [HP({ x: 1200, turn: 0.2, expr: 'bigGrin' })] },
  [inner('Harry', 'Hopefully, he wouldn\'t be as scared of being bullied in the future. That\'s called desensitisation therapy.', 400, 90, { w: 620 }),
   inner('Harry', 'It was *definitely* for his own good.', 400, 548, { w: 400, fixed: true })], { mood: 'day', alt: 'Harry, very pleased with himself.' });
// the narrator turns to the reader: no panel at all
ep.beat(340, [cap('Wasn\'t it?', 330, 140, { w: 200 })]);

// =============================================================== Aftermath: Draco's letter
ep.setBg('#10201a');
ep.beat(160, [plain('AFTERMATH', 400, 100, { font: "'IM Fell English SC', serif", size: 30, color: '#dfe8d8' })], { bg: { top: C.paper, bottom: '#10201a' } });
const SR = () => S.slytherinRoom({ desk: false });
ep.panel(720, { cam: { x: 830, y: 600, w: 1040 }, bg: SR, fg: () => rect(260, 800, 620, 30, { fill: '#3a2618', stroke: '#3e2a1f', 'stroke-width': 2 }) + rect(285, 830, 570, 240, { fill: '#2e1e12', stroke: '#3e2a1f', 'stroke-width': 2 }) + K.candle(780, 800, 1.2, true) + g({ transform: 'translate(520,796) scale(0.5,0.18)' }, rect(-120, -60, 240, 120, { fill: '#e9dcb0' })), actors: [{ def: draco, id: 'draco', x: 560, y: 1000, s: 1.25, turn: 0.2, pose: 'stand', lean: 14, expr: 'focus', armB: { sh: 70, el: 40, hand: 'hold', prop: g({ transform: 'translate(0,10) rotate(200)' }, quill(90)) } }] },
  [cap('That night, after all the day\'s fuss had subsided. A private room in the Slytherin dungeons. You had to be the *very* best of the House to have one.', 40, 30, { w: 620, size: 26, fixed: true })], { mood: 'candle', alt: 'Draco alone at a desk in a green-hung stone room by a fire, quill in hand.' });
ep.panel(620, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#2e1e12' }) + K.glow(ctx.w * 0.8, ctx.h * 0.2, 400, C.candle, 0.4) + g({ transform: `translate(${ctx.w / 2},${ctx.h / 2 + 75}) rotate(-2)` }, sheet({ w: 520, h: 420, parchment: true, font: 'Pinyon Script', size: 38, top: 70, lines: ['Dear Father,'], color: '#1f3a2a' }), ellipse(20, -110, 22, 14, { fill: '#1a1a1a' }), ellipse(46, -90, 10, 6, { fill: '#1a1a1a' }), circle(34, -70, 5, { fill: '#1a1a1a' })),
  [cap('And then he stopped. Ink slowly dripped from his quill, staining the parchment near the words.', 40, 28, { w: 620, fixed: true })], { mood: 'candle', alt: '"Dear Father," and a spreading blot of ink.' });
ep.panel(820, { cam: { on: ['draco'], fr: 'close' }, bg: SR, blur: 3, actors: [{ def: draco, id: 'draco', x: 560, y: 900, s: 1.1, turn: 0.2, expr: 'think' }] },
  [inner('Draco', 'Potter was brilliant, and a whole lot more than slightly mad, playing a vast game he mostly didn\'t understand, with the subtlety of a rampaging nundu.', 400, 124, { w: 610, size: 27, fixed: true }),
   inner('Draco', 'But he had offered *me* the chance to play. And if I blurted the whole thing out, it would become Father\'s.', 400, 700, { w: 610, fixed: true })], { mood: 'candle' });
ep.panel(660, { cam: { head: 'draco', hw: 0.6, hx: 0.5, hy: 0.35 }, bg: SR, blur: 3, actors: [{ def: draco, id: 'draco', x: 560, y: 900, s: 1.1, turn: 0.2, expr: 'determined' }] },
  [cap('So now, for the first time in his life, he had real secrets to keep.', 400, 630, { w: 440, anchor: 'bc' })], { mood: 'candle' });
ep.panel(600, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#2e1e12' }) + K.glow(ctx.w * 0.8, ctx.h * 0.2, 400, C.candle, 0.4) + g({ transform: `translate(${ctx.w / 2},${ctx.h / 2}) rotate(-2)` }, sheet({ w: 700, h: 500, parchment: true, font: 'Pinyon Script', size: 40, top: 80, lh: 1.32, color: '#1f3a2a', margin: 40, lines: ['Dear Father,', 'Suppose I told you I met a student,', 'not already of our acquaintance,', 'who called you a ‘flawless instrument', 'of death’ and said that I was your', '‘one weak point’.', 'What would you say about him?'] })),
  [], { mood: 'candle', alt: 'Draco\'s letter: "Dear Father, suppose I told you I met a student, not already of our acquaintance, who called you a \'flawless instrument of death\' and said that I was your \'one weak point\'. What would you say about him?"' });
ep.panel(560, { cam: { x: 720, y: 400, w: 620 }, bg: SR, actors: [(e) => g({ transform: 'translate(700,420) scale(1.2)' }, owl({ col: '#2a2a2a', flying: true, letter: true }))] }, [cap('It didn\'t take long for the family owl to bring the reply.', 40, 28, { w: 620, fixed: true })], { mood: 'candle', alt: 'A black owl swoops in with a sealed letter.' });
// the reply floats on the dark page itself, lit coldly from nowhere
ep.cutout(600, (ctx) => K.glow(ctx.w / 2, ctx.h / 2, 520, '#c9ced4', 0.25) + g({ transform: `translate(${ctx.w / 2},${ctx.h / 2}) rotate(1.5)` }, sheet({ w: 700, h: 480, parchment: true, font: 'Pinyon Script', size: 40, top: 80, lh: 1.32, color: '#1d1a20', margin: 40, lines: ['My beloved son,', 'I would say that you had been', 'so fortunate as to meet someone', 'who enjoys the intimate confidence', 'of our friend and valuable ally,', '', { t: 'Severus Snape.', size: 56 }] })),
  [], { mood: 'candle', alt: 'Lucius\'s reply: "My beloved son, I would say that you had been so fortunate as to meet someone who enjoys the intimate confidence of our friend and valuable ally, Severus Snape."' });
// the last panel is the hearth itself: we stare into the fire with Draco
const FLAME = (cx, base, hh, wd, fill) => path(`M${cx - wd},${base} Q${cx - wd * 1.1},${base - hh * 0.55} ${cx - wd * 0.1},${base - hh} Q${cx + wd * 0.15},${base - hh * 0.5} ${cx + wd * 0.5},${base - hh * 0.62} Q${cx + wd * 1.05},${base - hh * 0.3} ${cx + wd},${base}Z`, { fill });
ep.panel(760, { cam: { x: 1350, y: 800, w: 222 }, bg: SR, actors: [(e) => g({ transform: 'translate(1352,818) rotate(12)' },
    rect(-60, -40, 120, 80, { fill: '#e9dcb0', stroke: C.ink, 'stroke-width': 1.4 }),
    ...[-24, -12, 0, 12].map((y, i) => path(`M-46,${y} q10,-4 20,0 t20,0 t20,0 t${14 - i * 6},0`, { fill: 'none', stroke: '#1d1a20', 'stroke-width': 1.1, opacity: 0.55 })),
    path('M-60,40 L-60,4 Q-44,10 -38,22 Q-24,18 -18,40Z', { fill: '#2a1a10' }), path('M-60,4 Q-44,10 -38,22 Q-24,18 -18,40', { fill: 'none', stroke: '#e8773a', 'stroke-width': 2.4 }))
    + FLAME(1296, 900, 62, 22, '#f0a13c') + FLAME(1336, 900, 84, 26, '#f0a13c') + FLAME(1394, 900, 56, 20, '#f0a13c')
    + FLAME(1306, 900, 34, 12, '#ffe08a') + FLAME(1342, 900, 48, 14, '#ffe08a') + FLAME(1390, 900, 30, 10, '#ffe08a')] },
  [cap('Draco stared at the letter for a while. Then he threw it into the fire.', 400, 22, { w: 500, anchor: 'tc', fixed: true })], { mood: 'candle', shape: 'arch', spring: 0.42, frame: 'stone', ph: 612, panel: { y: 130 }, alt: 'The letter curls in the flames.' });
ep.setBg(C.paper);
ep.beat(140, [], { bg: { top: '#10201a', bottom: C.paper } });
ep.end();
export default ep;
