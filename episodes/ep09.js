// EPISODE 9 — The Moon  (source: HPMOR ch. 7, second half + Aftermath; the Neville prank SHOWN, from ch. 8's telling)
import { Episode, say, shout, whisper, think, inner, cold, cap, capC, dark, note, title, plain, M } from '../engine/core/dsl.js';
import { shot } from '../engine/core/scene.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as S from '../engine/bg/station.js';
import * as L from '../engine/bg/london.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harry, harryRobes, draco, fred, george, neville, chaosLord, makeExtra } from '../engine/chars/cast.js';
import { comedCan, spray, earthrise, rocketPlate, bookOpen, owl, sheet, envelope, quill, galleon } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep09', number: 9, title: 'The Moon' });
ep.setBg(C.paper);
ep.beat(260, [plain('CHAPTER NINE', 400, 90, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('The Moon', 400, 170, { size: 56 })]);

const P9 = (o = {}) => () => S.platform934(o);
const TABLE = () => S.picnicTable(1100, 1170);
const CAN = { sh: 110, el: 40, hand: 'hold', prop: g({ transform: 'translate(0,8)' }, comedCan(1)) };
const DP = (o = {}) => ({ def: draco, id: 'draco', x: 980, y: 1180, s: 1.1, turn: 0.4, pose: 'stand', expr: 'calm', ...o });
const HP = (o = {}) => ({ def: harryRobes, id: 'harry', x: 1230, y: 1180, s: 1.1, turn: -0.4, pose: 'stand', mask: 'scarfDown', ...o });

// =============================================================== the headline's author
ep.panel(760, { cam: { on: ['draco', 'harry'], fr: 'waist' }, bg: P9(), mid: TABLE, actors: [DP({ expr: 'calm' }), HP({ expr: 'angry', pose: 'point' })],
  over: (e) => g({ transform: `translate(${e.w * 0.5},${e.h * 0.66}) scale(0.35) rotate(4)` }, S.quibblerPage()) },
  [say('Draco', 'Who\'ve you got in mind?', 250, 100, { w: 260 }),
   say('Harry', 'The guy who came up with *this* headline.', 560, 100, { w: 300 })], { mood: 'day', alt: 'Harry slams the Quibbler down on a picnic table.' });
ep.panel(760, { cam: { on: ['draco'], fr: 'bust' }, bg: P9(), blur: 2, actors: [DP({ expr: 'cross', pose: 'crossArms' })] },
  [say('Draco', 'Not a guy. A *girl.* A ten-year-old girl, can you believe it?', 280, 100, { w: 360 }),
   say('Draco', 'She went nuts after her mother died, and her father, who owns the paper, is *convinced* she\'s a seer. So he prints whatever Luna Lovegood says.', 280, 560, { w: 400, size: 27 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: P9(), blur: 2, actors: [HP({ expr: 'unimpressed', pose: 'holdOne', armF: CAN })] },
  [say('Harry', 'Are you kidding me? That\'s even worse than Muggle journalism, which I would have thought was physically impossible.', 400, 110, { w: 520 }),
   cap('Not really thinking about it, Harry opened another can and started to drink.', 44, 460, { w: 420 })], { mood: 'day' });
ep.panel(820, { cam: { on: ['draco'], fr: 'bust' }, bg: P9(), blur: 3, actors: [DP({ expr: { base: 'coldSmile', eyes: { style: 'normal', open: 0.7 } } })] },
  [say('Draco', 'She has some sort of perverse obsession about the Malfoys, and her father is politically opposed to us, so he prints every word.', 280, 120, { w: 400, size: 28 }),
   cold('Draco', 'As soon as I\'m old enough, I\'m going to make her pay. Curse her properly—the kind of curse St Mungo\'s can\'t fix.', 400, 620, { w: 520 })], { mood: 'cold', alt: 'Draco says it lightly, pleasantly, as if it were nothing.' });
ep.bleed(820, { cam: { on: ['harry'], fr: 'bust' }, bg: P9(), blur: 3, actors: [HP({ expr: 'horror', pose: 'cower' })], under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.45, { bg: '#e8ffd8', col: '#6ad05a', op: 0.5 }), over: (e) => spray(e.w * 0.5, e.h * 0.55, 1, 1.6) + spray(e.w * 0.5, e.h * 0.55, -1, 1.4) },
  [cap('Green liquid spurted out of Harry\'s nostrils. Comed-Tea and lungs did not mix.', 44, 34, { w: 440 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['draco'], fr: 'close' }, bg: P9(), blur: 3, actors: [DP({ expr: 'suspicious' })] }, [say('Draco', 'Something wrong?', 280, 100, { w: 220 })], { mood: 'day' });
ep.panel(820, { cam: { on: ['draco', 'harry'], fr: 'waist' }, bg: P9(), blur: 4, mid: TABLE, actors: [DP({ expr: 'calm', pose: 'handsHips' }), HP({ expr: 'blank' })], over: (e) => rect(0, 0, e.w, e.h, { fill: '#9ab0c8', opacity: 0.12 }) },
  [cap('It was at this point that Harry realised two things.', 44, 34, { w: 400 }),
   cap('One: the sounds of the platform had blurred into white noise, at around the time Draco had reached inside his robes.', 44, 150, { w: 420, size: 26 }),
   cap('Two: when they\'d talked about murder as a bonding method, exactly one person in the conversation had thought they were joking.', 300, 640, { w: 460, size: 26 })], { mood: 'day', alt: 'The busy platform behind them has gone soft and silent, as if under glass.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: P9(), blur: 4, actors: [HP({ expr: 'cold' })], over: (e) => FX.frost(e.w, e.h, 0.3, 4) },
  [inner('Harry', 'Right. Because he seemed like such a normal kid. And he *is* a normal kid. He is just what you\'d expect a boy to be like if Darth Vader were his doting father.', 400, 120, { w: 560, size: 28 })], { mood: 'cold' });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: P9(), blur: 4, actors: [HP({ expr: { base: 'smile', eyes: { lookX: -0.6 } }, pose: 'shrug' })] },
  [say('Harry', 'I was just surprised how openly you discussed it. You didn\'t seem worried about getting caught.', 400, 110, { w: 480 })], { mood: 'day' });
ep.panel(460, { cam: { on: ['draco'], fr: 'close' }, bg: P9(), blur: 4, actors: [DP({ expr: 'smug' })] }, [say('Draco', 'Are you joking? *Luna Lovegood\'s* word against *mine?*', 280, 100, { w: 360 })], { mood: 'day' });
ep.panel(900, { cam: { on: ['draco'], fr: 'waist' }, bg: P9(), blur: 4, actors: [DP({ expr: 'calm', pose: 'lecture' })] },
  [say('Draco', 'Look—I\'ll explain how it really works, like you were already in Slytherin. The courts use truth potion, but it\'s a joke: you just get yourself Obliviated before you testify.', 280, 130, { w: 420, size: 27 }),
   say('Draco', 'And if *I\'m* involved, it touches the honour of a Noble House, so it goes to the Wizengamot—where Father has the votes. Afterwards, the Lovegoods have to pay *us* reparations.', 280, 700, { w: 420, size: 27 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'eyes' }, bg: P9(), blur: 4, actors: [HP({ expr: 'cold' })], over: (e) => FX.frost(e.w, e.h, 0.6, 5) },
  [cold('Harry', 'Note to self: overthrow government of magical Britain at earliest convenience.', 400, 420, { w: 560 })], { mood: 'cold' });
ep.panel(760, { cam: { on: ['draco'], fr: 'bust' }, bg: P9(), blur: 4, actors: [DP({ expr: 'grin', pose: 'holdOne', armF: CAN })] },
  [say('Draco', 'Better still, only do things the Healers can fix. Then just Obliviate her afterwards, and do it all again next week.', 280, 110, { w: 400 }),
   say('Draco', 'Though just imagine her saying she\'d been done by Draco Malfoy *and* the Boy-Who-Lived! Not even *Dumbledore* would believe her.', 280, 570, { w: 420, size: 27 })], { mood: 'day' });
ep.panel(820, { cam: { on: ['harry'], fr: 'bust' }, bg: P9(), blur: 4, actors: [HP({ expr: 'coldSmile', pose: 'think' })], over: (e) => FX.frost(e.w, e.h, 0.4, 6) },
  [inner('Harry', '*I am going to tear apart your pathetic little magical remnant of the Dark Ages into pieces smaller than its constituent atoms.*', 400, 120, { w: 560 }),
   say('Harry', 'Actually, can we hold off on that? Now that I know she\'s a year younger than me, I had a different thought for my revenge.', 400, 620, { w: 520 })], { mood: 'cold' });
ep.panel(560, { cam: { on: ['draco'], fr: 'bust' }, bg: P9(), blur: 4, actors: [DP({ expr: 'focus', pose: 'holdOne', armF: { ...CAN, sh: 150 } })] },
  [say('Draco', 'Huh? Do tell.', 280, 100, { w: 180 }), cap('Draco started to take another swig. Harry timed it exactly right:', 44, 440, { w: 400 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: P9(), blur: 4, actors: [HP({ expr: 'scheme' })] }, [say('Harry', 'I was thinking: *some day I\'m going to marry that woman.*', 400, 110, { w: 460 })], { mood: 'day' });
ep.bleed(820, { cam: { on: ['draco'], fr: 'bust' }, bg: P9(), blur: 4, actors: [DP({ expr: 'horror', pose: 'panic' })], under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.45, { bg: '#e8ffd8', col: '#6ad05a', op: 0.5 }), over: (e) => spray(e.w * 0.52, e.h * 0.5, 1, 1.8) + FX.sfxText(e.w / 2, e.h * 0.2, 'KER-SPLUTCH', { size: 80, fill: '#caffb0', rot: 4 }) },
  [shout('Draco', '*Are you NUTS?*', 400, 700, { w: 300, size: 38 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: P9(), blur: 4, actors: [HP({ expr: 'coldSmile', pose: 'crossArms' })], over: (e) => FX.frost(e.w, e.h, 0.3, 7) },
  [cold('Harry', 'Quite the opposite. I\'m so sane it burns like ice.', 400, 110, { w: 440 })], { mood: 'cold' });
ep.panel(620, { cam: { on: ['draco'], fr: 'bust' }, bg: P9(), blur: 4, actors: [DP({ expr: { base: 'smug', eyes: { open: 0.8 } } })] },
  [say('Draco', 'You\'ve got weirder taste than a Lestrange. I suppose you want her all to yourself, huh?', 280, 100, { w: 380 }),
   say('Harry', 'Yep. I can owe you a favour for it—', 560, 470, { w: 280, tail: [790, 520] }),
   say('Draco', 'Nah. This one\'s free.', 280, 590, { w: 240 })], { mood: 'day' });
// the cold reflection
ep.setBg('#1c2a3a');
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: C.paper, bottom: '#1c2a3a' } });
ep.panel(760, { cam: { on: ['harry'], fr: 'close' }, bg: P9(), blur: 4, actors: [HP({ expr: 'cold' })], over: (e) => FX.frost(e.w, e.h, 0.8, 8) },
  [dark('Charming. Happy. Generous with his favours to his friends. Draco wasn\'t a psychopath. That was the sad and awful part.', 400, 120, { w: 580 }),
   dark('It didn\'t take an evil mutant to say what Draco had said. It was very simple, very human. To Draco, his enemies weren\'t people.', 400, 620, { w: 580 })], { mood: 'cold', alt: 'Harry\'s face, very still, frosted over.' });
ep.panel(760, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#0e1a28' });
  // a scroll of names, a crude guillotine silhouette, very faint
  out += g({ transform: `translate(${w * 0.3},${h * 0.5})` }, rect(-110, -200, 220, 400, { fill: '#dfe8ef', opacity: 0.9, stroke: '#6a8aa8', 'stroke-width': 2 }), ...Array.from({ length: 12 }, (_, i) => line(-90, -170 + i * 30, 60 - (i % 3) * 30, -170 + i * 30, { stroke: '#4a6a86', 'stroke-width': 4 })), text(0, -210, 'BLOOD PURISTS', { 'font-family': 'Alegreya SC', 'font-size': 22, fill: '#dfe8ef', 'text-anchor': 'middle' }));
  out += g({ transform: `translate(${w * 0.72},${h * 0.52})`, opacity: 0.8 }, rect(-80, -260, 14, 440, { fill: '#9bb7cf' }), rect(66, -260, 14, 440, { fill: '#9bb7cf' }), rect(-80, -270, 160, 16, { fill: '#9bb7cf' }), path('M-66,-200 L66,-160 L66,-120 L-66,-160Z', { fill: '#dcebf5' }), rect(-110, 170, 220, 30, { fill: '#9bb7cf' }));
  return out + FX.frost(w, h, 0.9, 9);
}, [cold('Harry', 'I wonder how difficult it would be to just make a list of all the top blood purists and kill them.', 400, 100, { w: 560 }),
    cap('(They\'d tried exactly that in the French Revolution, more or less. It hadn\'t worked out well. Maybe he should find out what went wrong, and whether it was easy to fix.)', 44, 600, { w: 520, size: 25 })],
  { border: 'none', alt: 'In Harry\'s imagination, in freezing blue: a scroll of names headed BLOOD PURISTS, and beside it, the outline of a guillotine.' });
ep.setBg(C.paper);
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: '#1c2a3a', bottom: C.paper } });
ep.panel(820, { cam: { x: 1100, y: -200, w: 1300 }, bg: P9(), actors: [(e) => circle(1300, -420, 60, { fill: '#f4f4ee', opacity: 0.7 }) + circle(1285, -430, 10, { fill: '#e2e2da', opacity: 0.7 }) + circle(1320, -400, 7, { fill: '#e2e2da', opacity: 0.7 })] },
  [inner('Harry', '*So the world is broken and flawed and insane, and cruel and bloody and dark. This is news? You always knew that, anyway…*', 400, 120, { w: 560 }),
   cap('Harry gazed up at the pale shape of the Moon, visible that morning through the cloudless air.', 44, 640, { w: 420 })], { mood: 'day', alt: 'Above the station\'s iron arches, the pale morning Moon.' });

// =============================================================== the pitch
ep.panel(760, { cam: { on: ['draco', 'harry'], fr: 'waist' }, bg: P9(), mid: TABLE, actors: [DP({ expr: 'smile', pose: 'gesture' }), HP({ expr: 'sad' })] },
  [say('Draco', 'You\'re looking all serious. Let me guess—your Muggle parents told you this sort of thing was bad.', 250, 100, { w: 380 }),
   say('Draco', 'Like Father says, there may be four Houses, but in the end everyone belongs to either Slytherin or Hufflepuff. And you\'re *not* on the Hufflepuff end.', 250, 580, { w: 400, size: 27 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['draco'], fr: 'close' }, bg: P9(), blur: 3, actors: [DP({ expr: 'scheme' })] },
  [say('Draco', 'If you side with the Malfoys under the table… our power and your reputation… you could get away with things even *I* can\'t. Want to *try* it for a while?', 400, 120, { w: 540 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: P9(), blur: 3, actors: [HP({ expr: 'focus' })], over: (e) => FX.frost(e.w, e.h, 0.2, 10) },
  [inner('Harry', '*Aren\'t we a clever little serpent. Eleven years old and already coaxing your prey from hiding…*', 400, 110, { w: 540 }),
   say('Harry', 'Draco, you want to explain the whole blood purity thing to me? I\'m sort of new.', 400, 450, { w: 440 })], { mood: 'day' });
ep.panel(1000, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = `<defs><linearGradient id="fade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e7bb4f"/><stop offset="1" stop-color="#2a2220"/></linearGradient></defs>` + rect(0, 0, w, h, { fill: '#1d1812' });
  // four founders' treasures, bright on the left, generations of wizards fading to the right
  const icons = [(x, y) => path(`M${x - 20},${y - 30} L${x + 20},${y - 30} L${x + 14},${y + 30} L${x - 14},${y + 30}Z`, { fill: '#e7bb4f', stroke: C.ink, 'stroke-width': 2 }), (x, y) => path(`M${x},${y - 50} L${x + 6},${y + 20} L${x - 6},${y + 20}Z M${x - 22},${y + 20} L${x + 22},${y + 20}`, { fill: '#c9ced4', stroke: '#c9ced4', 'stroke-width': 4 }), (x, y) => path(`M${x - 26},${y} Q${x},${y - 30} ${x + 26},${y}`, { fill: 'none', stroke: '#6ab0e0', 'stroke-width': 6 }), (x, y) => ellipse(x, y, 20, 26, { fill: '#2f7a3a', stroke: '#e7bb4f', 'stroke-width': 3 })];
  icons.forEach((f, i) => { out += f(80 + i * 70, 120); });
  for (let i = 0; i < 8; i++) { const x = 80 + i * 90, op = 1 - i * 0.12; out += g({ opacity: op }, circle(x, h * 0.55, 22, { fill: '#e8d9b8' }), path(`M${x - 30},${h * 0.55 + 110} L${x},${h * 0.55 + 20} L${x + 30},${h * 0.55 + 110}Z`, { fill: '#3a2e4a' }), path(`M${x + 20},${h * 0.55 + 40} l30,-40`, { stroke: '#ffe08a', 'stroke-width': 3 }), circle(x + 50, h * 0.55, 6 - i * 0.6, { fill: '#ffe08a' })); }
  out += rect(0, h - 120, w, 120, { fill: 'url(#fade)', opacity: 0.4 });
  return out;
}, [dark('"Our powers have grown weaker, generation by generation, as the Mudblood taint increases. Where Salazar and Godric and Rowena and Helga raised Hogwarts by their power, no wizard of these faded days has risen to rival them."', 400, 110, { w: 600, size: 27 }),
    dark('"If the taint isn\'t checked, our wands will break, the line of Merlin will end, and our children will be left scratching at the dirt like the Muggles. And darkness will cover all the world for ever."', 400, 860, { w: 600, size: 27 })],
  { border: 'none', alt: 'A tapestry-like illustration: the four Founders\' treasures shining, then a line of wizards, each generation\'s wand-spark dimmer than the last.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: P9(), blur: 2, actors: [HP({ expr: 'think', pose: 'chin' })] },
  [say('Harry', 'Persuasive. But I have to correct you on one point of fact. Your information about the Muggles is a bit out of date. *We* aren\'t exactly scratching at the dirt any more.', 400, 120, { w: 540, size: 28 })], { mood: 'day' });
ep.panel(460, { cam: { on: ['draco'], fr: 'close' }, bg: P9(), blur: 3, actors: [DP({ expr: 'shock' })] }, [shout('Draco', '*What?* What do you mean, *we?*', 280, 100, { w: 340, size: 30 })], { mood: 'day' });
ep.panel(760, { cam: { on: ['harry'], fr: 'waist' }, bg: P9(), actors: [HP({ expr: 'determined', pose: 'lecture' })], under: (e) => rect(0, 0, e.w, e.h, { fill: '#f6e3b0', opacity: 0.3 }) },
  [say('Harry', '*We.* The scientists. The line of Francis Bacon and the blood of the Enlightenment.', 400, 100, { w: 460 }),
   say('Harry', 'Quick check, Draco. Have wizards ever been to the Moon? You know—*that* thing?', 400, 580, { w: 460 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['draco'], fr: 'bust' }, bg: P9(), blur: 2, actors: [DP({ expr: 'confused', pose: 'pointUp' })] },
  [say('Draco', 'Go to the—it\'s just a—you can\'t Apparate to somewhere you\'ve never *been.* How would anyone get to the Moon in the *first* place?', 280, 120, { w: 420, size: 28 })], { mood: 'day' });
ep.panel(760, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#3a2618' }) + K.glow(ctx.w * 0.5, ctx.h * 0.3, 500, C.candle, 0.4) +
  g({}, ...Array.from({ length: 16 }, (_, i) => rect(40 + (i % 6) * 125, ctx.h - 60 - Math.floor(i / 6) * 130 - 110, 115, 110, { fill: '#b9955e', stroke: C.ink, 'stroke-width': 3 }))) +
  shot({ cam: { on: ['harry'], fr: 'full' }, actors: [{ def: harryRobes, id: 'harry', x: 400, y: 1000, s: 1.1, turn: 0.6, pose: 'run', expr: 'determined', mask: 'scarfDown' }] })(ctx) + FX.speedLines(ctx.w, ctx.h, { n: 20 }),
  [say('Harry', 'Hold on—I\'d like to show you a book—I think I remember which box it\'s in—', 400, 90, { w: 480 }),
   cap('(Harry had inherited the nigh-magical Verres ability to remember where all his books were, which was rather mysterious considering the lack of any genetic connection.)', 44, 560, { w: 520, size: 24 })], { mood: 'warm', alt: 'Harry dashes down the stairs into the cavern of his trunk, between stacked boxes of books.' });
ep.bleed(1100, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#6b4429' }) + K.glow(ctx.w / 2, ctx.h / 2, 600, '#fff2c8', 0.35) + g({ transform: `translate(${ctx.w / 2},${ctx.h * 0.55}) scale(4.4)` }, bookOpen({ w: 150, h: 104, col: '#243352' })) + g({ transform: `translate(${ctx.w / 2 + 150},${ctx.h * 0.55})` }, earthrise(270, 200)),
  [dark('The one with the white, dry, cratered land, and the suited people, and the blue-white globe hanging over it all.', 400, 100, { w: 560 }),
   dark('*That* picture. *The* picture, if only one picture in all the world were to survive.', 400, 980, { w: 560 })], { alt: 'An open book. On the right-hand page, the photograph: astronauts on the grey lunar surface, and the Earth — blue and white — hanging in the black sky.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: P9(), blur: 3, actors: [HP({ expr: { base: 'hopeful', eyes: { teary: true } } })] },
  [say('Harry', '*That*… is what the Earth looks like from the Moon.', 400, 110, { w: 420 }), cap('His voice trembled. He couldn\'t quite keep the pride out.', 44, 470, { w: 400 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['draco'], fr: 'close' }, bg: P9(), blur: 3, actors: [DP({ expr: { base: 'awe', eyes: { sparkle: false, lookY: 0.7 } } })] },
  [whisper('Draco', 'If that\'s a *real* picture… why isn\'t it moving?', 400, 110, { w: 400 }),
   whisper('Draco', 'And what are *those?*', 400, 470, { w: 280 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'bust' }, bg: P9(), blur: 2, actors: [HP({ expr: 'warm', pose: 'present' })] },
  [say('Harry', 'Those are human beings. Wearing suits that give them air, because there is no air on the Moon.', 400, 110, { w: 500 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['draco'], fr: 'close' }, bg: P9(), blur: 3, actors: [DP({ expr: 'horror' })] }, [whisper('Draco', 'That\'s impossible. No Muggle could ever do that. *How…*', 400, 110, { w: 420 })], { mood: 'day' });
ep.multi(620, [
  { x: M, y: 18, w: 368, h: 584, art: (c) => rect(0, 0, c.w, c.h, { fill: '#f4ecd6' }) + g({ transform: `translate(${c.w / 2},${c.h / 2 + 20})` }, rocketPlate(c.w * 0.7, c.h * 0.8)) },
  { x: 408, y: 18, w: 368, h: 584, art: (c) => rect(0, 0, c.w, c.h, { fill: '#f4ecd6' }) + g({ transform: `translate(${c.w / 2},${c.h / 2 + 20})` }, rocketPlate(c.w * 0.7, c.h * 0.8, { fire: false, speck: true })) },
], [say('Harry', 'This is a rocket going up. The fire pushes it higher, until it gets to the Moon.', 200, 80, { w: 280, size: 25, tail: null }), say('Harry', 'That tiny speck next to it is a person.', 590, 80, { w: 260, size: 25, tail: null })],
  { alt: 'Two book plates: a Saturn V rocket lifting off on a column of fire; the same rocket on the ground, with a tiny speck of a person beside it.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust' }, bg: P9(), blur: 2, actors: [HP({ expr: 'focus', pose: 'gesture' })] },
  [say('Harry', 'Going to the Moon cost probably around a thousand million Galleons. And it took more people than live in all of magical Britain.', 400, 110, { w: 540 }),
   inner('Harry', '*And when they arrived, they left a plaque that said: "We came in peace, for all mankind." Though you\'re not yet ready to hear those words, Draco Malfoy…*', 400, 500, { w: 560, size: 26 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['draco'], fr: 'bust' }, bg: P9(), blur: 2, actors: [DP({ expr: 'teary', pose: 'hold' })] },
  [say('Draco', 'You\'re telling the truth. You wouldn\'t fake a whole book just for this—I can hear it in your voice.', 280, 100, { w: 400 }),
   whisper('Draco', 'But… if *Muggles* have that kind of power… then what are *we?*', 280, 530, { w: 380 })], { mood: 'day' });
ep.panel(900, { cam: { on: ['harry'], fr: 'waist' }, bg: P9(), actors: [HP({ expr: 'warm', pose: 'present' })], under: (e) => rect(0, 0, e.w, e.h, { fill: '#fff2c8', opacity: 0.3 }) },
  [say('Harry', 'No, Draco, that\'s not it. Science taps the power of human understanding—looking at the world and figuring out how it works. It\'s not a *Muggle* thing. It\'s a *human* thing.', 400, 130, { w: 580, size: 27 }),
   say('Harry', 'Your magic could turn off, and you would hate that. But science is the power that can\'t be taken from me without taking *me.* It just trains the power you use every time you look at something you don\'t understand and ask, *"Why?"*', 400, 700, { w: 580, size: 26 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: P9(), blur: 3, actors: [HP({ expr: 'scheme' })] }, [say('Harry', 'You\'re of Slytherin, Draco. Don\'t you see the implication?', 400, 110, { w: 440 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['draco'], fr: 'close' }, bg: P9(), blur: 3, actors: [DP({ expr: { base: 'focus', eyes: { open: 1 } } })] }, [whisper('Draco', 'Wizards can learn to use this power.', 400, 110, { w: 400 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: P9(), blur: 3, actors: [HP({ expr: 'smug' })] },
  [inner('Harry', '*Very carefully, now… the bait is set; now the hook…*', 400, 110, { w: 480 }),
   say('Harry', 'If you can learn to think of yourself as a *human* instead of a *wizard*, then you can train your powers as a human.', 400, 480, { w: 520 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['draco'], fr: 'bust' }, bg: P9(), blur: 2, actors: [DP({ expr: { base: 'awe', eyes: { sparkle: false } } })] },
  [say('Draco', 'You think you can master *both* arts. Add the powers together, and… make yourself Lord of the two worlds?', 280, 110, { w: 400 })], { mood: 'day' });
ep.panel(760, { cam: { on: ['harry'], fr: 'waist' }, bg: P9(), blur: 2, actors: [HP({ expr: { base: 'scheme', glint: true }, pose: 'armsUp' })], under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.35, { bg: '#2a1a3a', col: '#8a5fb0', op: 0.7 }) },
  [shout('Harry', 'MWAHAHAHA—', 400, 100, { w: 340, size: 40 }),
   say('Harry', 'The whole world you know is one square on a much larger game board, Draco. But I really *am* Ravenclaw. I don\'t want to rule the universe. I just think it could be more sensibly organised.', 400, 610, { w: 560, size: 27 })], { mood: 'day', alt: 'Harry gives an evil laugh, which just seemed to come naturally at that point.' });
ep.panel(460, { cam: { on: ['draco'], fr: 'close' }, bg: P9(), blur: 3, actors: [DP({ expr: 'awe' })] }, [say('Draco', 'Why are you telling *me* this?', 280, 100, { w: 280 })], { mood: 'day' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: P9(), blur: 2, actors: [HP({ expr: 'determined' })] },
  [say('Harry', 'There aren\'t many people who know how to do *true* science. Help would be helpful.', 400, 100, { w: 480 }),
   say('Harry', 'But science isn\'t like learning a spell. The power comes with a cost. A cost so high that most people refuse to pay it.', 400, 560, { w: 520 })], { mood: 'day' });
ep.panel(460, { cam: { on: ['draco'], fr: 'close' }, bg: P9(), blur: 3, actors: [DP({ expr: 'focus' })] }, [say('Draco', 'And that cost?', 280, 100, { w: 200 })], { mood: 'day' });
ep.panel(460, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#f4ecd6' }), [say('Harry', 'Learning to admit you\'re wrong.', 400, 230, { w: 420, size: 38, tail: null })], { alt: 'Learning to admit you\'re wrong.' });
ep.panel(460, { cam: { on: ['draco'], fr: 'close' }, bg: P9(), blur: 3, actors: [DP({ expr: 'deadpan' })] }, [say('Draco', 'Um. You going to explain that?', 280, 100, { w: 300 })], { mood: 'day' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: P9(), blur: 2, actors: [HP({ expr: 'warm', pose: 'gesture' })] },
  [say('Harry', 'Trying to figure out how something works, the first ninety-nine explanations you come up with are wrong. So you have to admit you\'re wrong, over and over and over again. And every time you change your mind, you change yourself.', 400, 130, { w: 580, size: 27 }),
   say('Harry', 'There\'s one condition. I\'m dealing with *you*, Draco. Not your father. Your moves in our game have to be your own.', 400, 600, { w: 540 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['draco'], fr: 'waist' }, bg: P9(), actors: [DP({ expr: { base: 'worried', eyes: { lookY: 0.5 } }, pose: 'crossArms' })] },
  [say('Draco', 'I\'ve got to go. I\'ve got to go off and think about this.', 280, 100, { w: 340 }), say('Harry', 'Take your time.', 580, 460, { w: 200, tail: [790, 500] })], { mood: 'day' });
ep.panel(620, { cam: { x: 1250, y: 820, w: 1100 }, bg: P9(), actors: [DP({ x: 1500, turn: 0.7, pose: 'walk', expr: 'think' }), HP({ x: 1000, turn: 0.3, pose: 'slump', expr: 'exasperated', armF: undefined })] },
  [cap('The sounds of the platform came back as Draco wandered off. Harry slowly exhaled a breath he hadn\'t realised he\'d been holding.', 44, 34, { w: 480 })], { mood: 'day' });

// =============================================================== the Order of Chaos
const FG = (o = {}) => [{ def: chaosLord(fred, 1), id: 'fred', x: 1450, y: 1170, turn: -0.4, pose: 'stand', expr: 'grin', ...(o.fred || {}) }, { def: chaosLord(george, 2), id: 'george', x: 1620, y: 1170, turn: -0.4, pose: 'crossArms', expr: 'grin', ...(o.george || {}) }];
ep.panel(820, { cam: { x: 1350, y: 780, w: 1100 }, bg: P9(), actors: [HP({ x: 1100, turn: 0.4, expr: 'suspicious' }), ...FG()] },
  [cap('When Harry looked up, two figures were approaching—looking utterly ridiculous, with their faces cloaked by winter scarves.', 44, 34, { w: 460 }),
   say('Fred', 'Hello, Mr Bronze. Can we interest you in joining the Order of Chaos?', 560, 620, { w: 320 })], { mood: 'day', alt: 'Two tall figures with scarves wound over their heads like shrouds, only their eyes glinting through.' });
// the prank (shown)
const NEV = (o = {}) => ({ def: neville, id: 'neville', x: 1300, y: 1180, s: 1.05, turn: -0.2, pose: 'cower', expr: 'horror', ...o });
ep.panel(760, { cam: { on: ['neville'], fr: 'waist' }, bg: P9(), blur: 2, actors: [NEV({ pose: 'stand', expr: 'worried' })] },
  [cap('Meanwhile, not far away, a small, round boy had been left alone for a moment on the platform. He looked sure he was about to be attacked by Death Eaters.', 44, 34, { w: 460 }),
   cap('(There\'s a saying: the fear is often worse than the thing itself.)', 330, 620, { w: 420, size: 25 })], { mood: 'day', alt: 'A small, round-faced boy stands alone and very frightened.' });
ep.bleed(1250, { cam: { x: 1300, y: 760, w: 1100 }, bg: P9(), actors: [
  { def: chaosLord(fred, 1), id: 'fred', x: 1050, y: 1180, turn: 0.5, pose: 'armsUp', expr: 'laugh' },
  NEV({ x: 1330, y: 1110, s: 0.95 }),
  { def: chaosLord(harryRobes, 3), id: 'harry', x: 1230, y: 1260, s: 1.1, turn: 0.3, pose: 'present', expr: 'laugh', armB: { sh: 62, el: 30, hand: 'palm', prop: g({ transform: 'translate(0,-6)' }, rect(-22, -10, 44, 20, { fill: '#6b3a1e', stroke: C.ink, 'stroke-width': 2 }), text(0, 5, 'CHOC', { 'font-family': 'Alegreya Sans', 'font-weight': 800, 'font-size': 11, fill: '#f1e6cc', 'text-anchor': 'middle' })) } },
  { def: chaosLord(george, 2), id: 'george', x: 1560, y: 1180, turn: -0.5, pose: 'wave', expr: 'laugh' }],
  over: (e) => { const R = rng(3); let o = ''; for (let i = 0; i < 14; i++) o += g({ transform: `translate(${R() * e.w},${R() * e.h * 0.7})` }, galleon(R.range(6, 12))); return o + FX.sfxText(e.w * 0.22, e.h * 0.14, 'HA HA HA!', { size: 70, rot: -8 }); } },
  [shout('Fred', 'Have some Knuts, boy!', 150, 1000, { w: 230, size: 26 }), shout('George', 'Have a silver *Sickle!*', 640, 1000, { w: 230, size: 26 })], { mood: 'day', alt: 'Three shrouded figures cavort around the terrified boy, laughing evilly — and showering him with chocolate and coins.' });
ep.panel(560, { cam: { on: ['neville'], fr: 'close' }, bg: P9(), blur: 3, actors: [NEV({ x: 1300, y: 1120, s: 0.95, expr: 'teary' })] }, [whisper('Neville', 'go away', 400, 110, { w: 160, size: 24 })], { mood: 'day' });
ep.panel(760, { cam: { x: 1300, y: 780, w: 1300 }, bg: P9(), actors: [...[921, 922, 923].map((sd, i) => ({ def: makeExtra(sd, {}), x: 700 + i * 260, y: 1120, turn: 0.3, pose: 'stand', expr: 'confused', s: 0.95 })), { def: chaosLord(fred, 1), x: 1650, y: 1180, turn: 0.7, pose: 'run', expr: 'laugh' }, { def: chaosLord(harryRobes, 3), x: 1850, y: 1200, s: 1.1, turn: 0.7, pose: 'run', expr: 'laugh' }, { def: chaosLord(george, 2), x: 2050, y: 1180, turn: 0.7, pose: 'run', expr: 'laugh' }], over: (e) => FX.speedLines(e.w, e.h, { n: 30 }) },
  [shout('Harry', 'AAAH! THE LIGHT! IT BURNS!', 560, 110, { w: 360, size: 30 }),
   cap('Some of the crowd had wanted to interfere at first. Then they saw what was actually happening, and were too confused to do anything.', 44, 620, { w: 480, size: 26 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: P9(), blur: 3, actors: [{ def: harryRobes, id: 'harry', x: 1200, y: 1180, s: 1.1, turn: 0.2, expr: 'bigGrin', mask: 'scarfDown' }] },
  [inner('Harry', 'Hopefully, he wouldn\'t be as scared of being bullied in the future. That\'s called desensitisation therapy.', 400, 110, { w: 520 }),
   inner('Harry', 'It was *definitely* for his own good.', 400, 500, { w: 400 })], { mood: 'day', alt: 'Harry, very pleased with himself.' });
ep.panel(460, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#f4ecd6' }), [cap('Wasn\'t it?', 330, 200, { w: 200 })], { alt: 'Wasn\'t it?' });

// =============================================================== Aftermath: Draco's letter
ep.setBg('#10201a');
ep.tile({ h: 160, panels: [], bubbles: [plain('AFTERMATH', 400, 100, { font: "'IM Fell English SC', serif", size: 30, color: '#dfe8d8' })], bg: { top: C.paper, bottom: '#10201a' } });
const SR = () => S.slytherinRoom({ desk: false });
ep.panel(820, { cam: { x: 800, y: 560, w: 1100 }, bg: SR, fg: () => rect(260, 800, 620, 30, { fill: '#3a2618', stroke: '#3e2a1f', 'stroke-width': 2 }) + rect(285, 830, 570, 240, { fill: '#2e1e12', stroke: '#3e2a1f', 'stroke-width': 2 }) + K.candle(780, 800, 1.2, true) + g({ transform: 'translate(520,796) scale(0.5,0.18)' }, rect(-120, -60, 240, 120, { fill: '#e9dcb0' })), actors: [{ def: draco, id: 'draco', x: 560, y: 1000, s: 1.25, turn: 0.2, pose: 'stand', lean: 14, expr: 'focus', armB: { sh: 70, el: 40, hand: 'hold', prop: g({ transform: 'translate(0,10) rotate(200)' }, quill(90)) } }] },
  [cap('That night, after all the day\'s fuss had subsided. A private room in the Slytherin dungeons—you had to be the *very* best of the House to have one.', 44, 34, { w: 500, size: 26 })], { mood: 'candle', alt: 'Draco alone at a desk in a green-hung stone room by a fire, quill in hand.' });
ep.panel(620, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#2e1e12' }) + K.glow(ctx.w * 0.8, ctx.h * 0.2, 400, C.candle, 0.4) + g({ transform: `translate(${ctx.w / 2},${ctx.h / 2 + 40}) rotate(-2)` }, sheet({ w: 520, h: 420, parchment: true, font: 'Pinyon Script', size: 38, top: 70, lines: ['Dear Father,'], color: '#1f3a2a' }), ellipse(40, 20, 16, 10, { fill: '#1a1a1a' }), ellipse(60, 40, 8, 5, { fill: '#1a1a1a' }), circle(52, 60, 4, { fill: '#1a1a1a' })),
  [cap('And then he stopped. Ink slowly dripped from his quill, staining the parchment near the words.', 44, 30, { w: 440 })], { mood: 'candle', alt: '"Dear Father," — and a spreading blot of ink.' });
ep.panel(820, { cam: { on: ['draco'], fr: 'close' }, bg: SR, blur: 3, actors: [{ def: draco, id: 'draco', x: 560, y: 900, s: 1.1, turn: 0.2, expr: 'think' }] },
  [inner('Draco', 'Potter was brilliant, and a whole lot more than slightly mad, playing a vast game he mostly didn\'t understand, with the subtlety of a rampaging nundu.', 400, 120, { w: 560, size: 27 }),
   inner('Draco', 'But he had offered *me* the chance to play. And if I blurted the whole thing out, it would become Father\'s.', 400, 640, { w: 560 })], { mood: 'candle' });
ep.panel(560, { cam: { on: ['draco'], fr: 'eyes' }, bg: SR, blur: 3, actors: [{ def: draco, id: 'draco', x: 560, y: 900, s: 1.1, turn: 0.2, expr: 'determined' }] },
  [cap('So now, for the first time in his life, he had real secrets to keep.', 44, 30, { w: 440 })], { mood: 'candle' });
ep.panel(760, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#2e1e12' }) + K.glow(ctx.w * 0.8, ctx.h * 0.2, 400, C.candle, 0.4) + g({ transform: `translate(${ctx.w / 2},${ctx.h / 2 + 20}) rotate(-2)` }, sheet({ w: 600, h: 560, parchment: true, font: 'Pinyon Script', size: 30, top: 60, lh: 1.25, color: '#1f3a2a', margin: 34, lines: ['Dear Father,', 'Suppose I told you I met a student,', 'not already of our acquaintance, who called', 'you a ‘flawless instrument of death’ and said', 'that I was your ‘one weak point’.', 'What would you say about him?'] })),
  [], { mood: 'candle', alt: 'Draco\'s letter: "Dear Father, suppose I told you I met a student, not already of our acquaintance, who called you a \'flawless instrument of death\' and said that I was your \'one weak point\'. What would you say about him?"' });
ep.panel(620, { cam: { x: 800, y: 500, w: 1100 }, bg: SR, actors: [(e) => g({ transform: 'translate(700,420) scale(1.2)' }, owl({ col: '#2a2a2a', flying: true, letter: true }))] }, [cap('It didn\'t take long for the family owl to bring the reply.', 44, 30, { w: 400 })], { mood: 'candle', alt: 'A black owl swoops in with a sealed letter.' });
ep.panel(760, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#10201a' }) + K.glow(ctx.w / 2, ctx.h / 2, 500, '#c9ced4', 0.25) + g({ transform: `translate(${ctx.w / 2},${ctx.h / 2 + 20})` }, sheet({ w: 600, h: 520, parchment: true, font: 'Pinyon Script', size: 30, top: 60, lh: 1.25, color: '#1d1a20', margin: 34, lines: ['My beloved son,', 'I would say that you had been so fortunate', 'as to meet someone who enjoys the intimate', 'confidence of our friend and valuable ally,', '', { t: 'Severus Snape.', size: 40 }] })),
  [], { mood: 'candle', alt: 'Lucius\'s reply: "My beloved son, I would say that you had been so fortunate as to meet someone who enjoys the intimate confidence of our friend and valuable ally, Severus Snape."' });
ep.panel(620, { cam: { x: 1350, y: 700, w: 700 }, bg: SR, actors: [(e) => g({ transform: 'translate(1350,800) rotate(20)' }, rect(-60, -40, 120, 80, { fill: '#e9dcb0', stroke: C.ink, 'stroke-width': 3 }), path('M-60,40 Q-20,0 -40,-40', { fill: 'none', stroke: '#e8773a', 'stroke-width': 6 }))] },
  [cap('Draco stared at the letter for a while. Then he threw it into the fire.', 44, 30, { w: 440 })], { mood: 'candle', alt: 'The letter curls in the flames.' });
ep.setBg(C.paper);
ep.tile({ h: 140, panels: [], bubbles: [], bg: { top: '#10201a', bottom: C.paper } });
ep.end();
export default ep;
