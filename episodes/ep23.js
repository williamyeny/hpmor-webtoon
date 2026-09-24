// EPISODE 23 — The Stars  (source: HPMOR ch. 20) — Book Two finale
// Harry chooses his first mentor. Dumbledore warns him what it will cost. "You win."
import { Episode, say, shout, whisper, inner, cold, cap, capC, plain, title, sfx, M } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as CS from '../engine/bg/castle.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { quirrell, dumbledore } from '../engine/chars/cast.js';
import { harryRaven } from '../engine/chars/cast2.js';
import * as P2 from '../engine/props/props2.js';
import { dayBeat, header } from './b2.js';

const ep = new Episode({ id: 'ep23', number: 23, title: 'The Stars' });
ep.setBg(C.paper);
header(ep, 'TWENTY-THREE', 'The Stars');
dayBeat(ep, 'Friday.', 'If you wanted to be specific, 3:40 on Friday afternoon. A small room behind the third door.');

// ---------------------------------------------------------------- helpers
import { place, POSES } from '../engine/chars/rig.js';
// head position of an actor spec (world units); place() already turns anchors with a.rot
const HEAD = (a) => place(a.def, a).anchors.head;
// camera of world-width w that puts actor a's head at panel point (px, py); ph/pw = panel size
const AT = (a, w, px, py, ph, pw = 752) => { const [x, y] = HEAD(a); const z = pw / w; return { x: x - (px - pw / 2) / z, y: y - (py - ph / 2) / z, w }; };
// same for a single-panel tile of height h (panel = 752 × h-36) and a full-bleed tile (800 × h)
const PAT = (a, w, px, py, h) => AT(a, w, px, py, h - 36);
const BAT = (a, w, px, py, h) => AT(a, w, px, py, h, 800);
// a panel inside a multi-panel tile
const P = (y, h, art, o = {}) => ({ x: M, y, w: 752, h, mood: 'candle', art, ...o });

// ---------------------------------------------------------------- the little room
const RR = () => CS.restRoom() + K.door(250, 560, 200, 340, '#3a2a22');
const HR = (o = {}) => ({ def: harryRaven, id: 'harry', x: 900, y: 900, s: 1.1, turn: 0.2, pose: 'sit', seat: 150, expr: 'think', ...o });
// lying on the bed, head on the pillow, face turned up to the ceiling
const HL = (o = {}) => HR({ x: 1160, y: 735, turn: 0.7, pose: 'stand', rot: -90, seat: undefined, ...o });
ep.panel(1000, { cam: { x: 1080, y: 640, w: 880 }, bg: RR, actors: [HL({ expr: { base: 'calm', eyes: { lookX: 0.6 } } })] },
  [cap('Harry stared up at the grey ceiling. He\'d eaten quite a lot of Professor Quirrell\'s snacks: intricate confections of chocolate, dusted with sparkling sprinkles and jewelled with tiny sugar gems. He hadn\'t felt the least bit guilty. *This* he had *earned.*', 44, 34, { w: 620, fixed: true }),
   cap('He hadn\'t tried to sleep. He had a feeling he wouldn\'t like what happened when he closed his eyes.', 44, 850, { w: 620, fixed: true })], { mood: 'candle', alt: 'A small stone room with a bed and a tray of expensive sweets. Harry lies on the bed, staring at the ceiling.' });
ep.panel(1000, { cam: PAT(HL(), 480, 340, 500, 1000), bg: RR, blur: 2, actors: [HL({ expr: { base: 'smile', eyes: { soft: true, lookX: 0.6 } } })] },
  [cap('But there was, there really and truly was, a feeling of triumph. *Anti-Dark-Lord-Harry programme, +1 point* didn\'t *begin* to cover it.', 44, 34, { w: 620, fixed: true }),
   inner('Harry', '*"The Dark Lord did not win that day. His goal was to learn, and he left without a single lesson." Harry had gone into Potions to learn Potions. And he\'d left without a single lesson.*', 400, 950, { anchor: 'bc', w: 600, fixed: true })], { mood: 'candle' });
ep.panel(860, { cam: PAT(HR({ x: 1000, expr: 'awe' }), 470, 400, 520, 860), bg: RR, blur: 3, actors: [HR({ x: 1000, expr: 'awe' })] },
  [cap('And Professor Quirrell had heard, and understood with frightening precision, and reached out and yanked him off that path. The path that led to his becoming a copy of You-Know-Who.', 44, 34, { w: 620, fixed: true })], { mood: 'candle' });
// a knock: the voice comes through the door, then the footsteps go away
const HD = (o = {}) => HR({ x: 780, y: 900, turn: -0.5, pose: 'stand', seat: undefined, expr: 'worried', ...o });
ep.panel(820, { cam: { x: 560, y: 660, w: 760 }, bg: RR, actors: [HD()] },
  [say('Quirrell', 'Classes are over.', 232, 300, { anchor: 'bc', w: 260, fixed: true, tail: [196, 420] })], { mood: 'candle', alt: 'Inside the little room: Professor Quirrell\'s voice comes through the closed door. Harry turns toward it.' });
ep.panel(700, { cam: { x: 520, y: 650, w: 760 }, bg: RR, actors: [HD({ x: 560, turn: -0.6, pose: 'reach', expr: { base: 'calm', eyes: { lookX: -0.6 } } })] },
  [cap('Harry approached the door, suddenly nervous. Then the tension eased, as he heard Professor Quirrell\'s footsteps moving *away* from the door.', 44, 34, { w: 620, fixed: true })], { mood: 'candle', alt: 'Harry at the door, listening to the footsteps go away before he opens it.' });
ep.panel(640, { cam: PAT(HD({ x: 560, expr: 'suspicious' }), 430, 400, 400, 640), bg: RR, blur: 3, actors: [HD({ x: 560, expr: 'suspicious' })] },
  [inner('Harry', '*What on Earth is that about? Does Professor Quirrell feel it too?*', 400, 40, { anchor: 'tc', w: 520, fixed: true })], { mood: 'candle' });

// ---------------------------------------------------------------- the empty stage
const ST = () => CS.defenceStage({});
const Q = (o = {}) => ({ def: quirrell, id: 'quirrell', x: 1000, y: 700, turn: 0.2, pose: 'stand', expr: 'calm', ...o });
const QD = () => CS.defenceDesk(1000, 700);
const H = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1380, y: 900, s: 1.1, turn: -0.4, pose: 'stand', expr: 'neutral', ...o });
const TWO = (q = {}, h = {}) => [Q(q), QD, H(h)];
// reverse angle: from the dais out toward the empty tiers of seats; Harry stands on the marble
const REV = () => CS.defenceTiers() + [4, 3, 2, 1, 0].map((k) => CS.tierFront(k)).join('') + rect(-800, 1110, 4000, 900, { fill: '#e6e2da' }) + rect(-800, 1110, 4000, 8, { fill: '#b9b4aa' });
const HR2 = (o = {}) => H({ x: 1150, y: 1400, turn: -0.2, ...o });          // Harry, seen from the dais
const QF = (o = {}) => Q({ x: 640, y: 1720, s: 1.6, turn: 0.7, ...o });     // Quirrell's shoulder, foreground left
const HF = (o = {}) => H({ x: 1440, y: 1190, s: 1.9, turn: -0.7, ...o });   // Harry's head, foreground right
// move an actor spec so its head lands on world point [wx, wy]
const PUT = (a, [wx, wy]) => { const [hx, hy] = HEAD({ ...a, x: 0, y: 0 }); return { ...a, x: wx - hx, y: wy - hy }; };
// world point under panel point (px, py) for a camera
const WPT = (cam, px, py, ph, pw = 752) => { const z = pw / cam.w; return [cam.x + (px - pw / 2) / z, cam.y + (py - ph / 2) / z]; };
// Quirrell close (from Harry's side); o.fg = {px, py, s, ...} puts Harry's head in the foreground at that panel point
const QC = (q, w, px, py, ph, o = {}) => { const cam = AT(Q(q), w, px, py, ph, o.pw); const fg = o.fg ? [PUT(H({ turn: -0.7, s: 1.4, ...o.fg }), WPT(cam, o.fg.px, o.fg.py, ph, o.pw))] : []; return { cam, bg: ST, blur: o.blur ?? 2, actors: [Q(q), QD, ...fg], ...(o.over ? { over: o.over } : {}), ...(o.behind ? { behind: o.behind } : {}) }; };
// Harry close, standing on the stage (from Quirrell's side: the tiers behind him); o.fg puts Quirrell's shoulder in the foreground
const HC = (h, w, px, py, ph, o = {}) => { const cam = AT(HR2(h), w, px, py, ph, o.pw); const fg = o.fg ? [PUT(Q({ turn: 0.7, s: 1.5, ...o.fg }), WPT(cam, o.fg.px, o.fg.py, ph, o.pw))] : []; return { cam, bg: REV, blur: o.blur ?? 2, actors: [HR2(h), ...fg], ...(o.over ? { over: o.over } : {}), ...(o.behind ? { behind: o.behind } : {}) }; };

ep.bleed(900, { cam: { x: 1005, y: 360, w: 1000 }, bg: ST, actors: TWO({ pose: 'relaxed' }, { pose: 'walk' }) },
  [cap('They walked across the now-deserted stage to Professor Quirrell\'s desk. Professor Quirrell leaned on it. And Harry, as before, stopped short of the dais.', 48, 30, { w: 600, fixed: true }),
   say('Quirrell', 'So. What was it you wanted to talk to me about, Mr Potter?', 608, 290, { w: 260, fixed: true, tail: [446, 322] })], { alt: 'The empty white-marble stage. A gap between them.' });
ep.panel(880, HC({ expr: 'hopeful' }, 560, 470, 560, 844, { fg: { px: 70, py: 330 } }),
  [say('Harry', 'Professor Quirrell, am I off the path to becoming a Dark Lord, now?', 500, 70, { anchor: 'tc', w: 360, fixed: true })], { mood: 'candle' });
ep.panel(1000, QC({ expr: 'smile' }, 460, 300, 620, 964, { fg: { px: 650, py: 880, expr: 'hopeful' } }),
  [say('Quirrell', 'A word of advice, Mr Potter. There is such a thing as a performance which is *too* perfect. Real people who have just been beaten and humiliated for fifteen minutes do not stand up and graciously forgive their enemies.', 420, 80, { anchor: 'tc', w: 460, fixed: true })], { mood: 'candle' });
ep.panel(880, HC({ expr: 'rant', pose: 'armsUp' }, 560, 400, 560, 844, { behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.64, { n: 30, op: 0.14 }) }),
  [shout('Harry', '*I can\'t believe this! You can\'t have every possible observation confirm your theory!*', 400, 90, { anchor: 'tc', w: 400, fixed: true })], { mood: 'candle' });
ep.panel(1060, { cam: { x: 1190, y: 330, w: 860 }, bg: ST, actors: TWO({ expr: 'smile', pose: 'relaxed' }, { x: 1360, expr: 'yell', pose: 'fists' }) },
  [say('Quirrell', 'And that was a *trifle* too much indignation.', 200, 80, { anchor: 'tc', w: 240, fixed: true }),
   shout('Harry', '*What on Earth do I have to do to convince you?*', 550, 350, { anchor: 'tc', w: 280, fixed: true })], { mood: 'candle' });
ep.multi(1300, [
  P(18, 700, QC({ expr: 'smile', pose: 'gesture' }, 440, 560, 480, 700)),
  P(736, 546, HC({ expr: 'confused' }, 480, 540, 300, 546)),
], [say('Quirrell', 'To convince me that you harbour no ambitions of becoming a Dark Lord? I suppose you could just raise your right hand.', 270, 70, { anchor: 'tc', w: 360, fixed: true }),
   say('Harry', 'What? But I can raise my right hand whether or not I…', 250, 790, { anchor: 'tc', w: 340, fixed: true })]);
ep.multi(1400, [
  P(18, 900, QC({ expr: 'calm', pose: 'lecture' }, 460, 400, 700, 900)),
  P(936, 446, HC({ expr: { base: 'blank', eyes: { open: 1.1 } } }, 480, 560, 250, 446)),
], [say('Quirrell', 'Indeed. There is nothing you can do to convince me, because I would know that was exactly what you were trying to do. The meaning of an act lies not in what it *resembles on the surface*, Mr Potter, but in the states of mind which make it more or less probable.', 400, 90, { anchor: 'tc', w: 480, fixed: true }),
   cap('Harry had just had the Bayesian definition of evidence explained to him by a wizard.', 48, 970, { w: 330, fixed: true })]);
ep.multi(1380, [
  P(18, 880, QC({ expr: 'calm', turn: 0.3 }, 520, 330, 690, 880, { fg: { px: 640, py: 810, expr: 'think' } })),
  P(916, 446, HC({ expr: { base: 'think', eyes: { soft: true } } }, 480, 240, 250, 446)),
], [say('Quirrell', 'But then again, anyone can want to impress their friends. That need not be Dark. So tell me honestly. What thought was in your mind at the moment you forbade any vengeance? A true impulse to forgiveness? Or an awareness of how your classmates would see it?', 410, 90, { anchor: 'tc', w: 480, fixed: true }),
   inner('Harry', '*Sometimes we make our own phœnix song.*', 560, 1140, { w: 300, fixed: true })], { alt: 'Harry doesn\'t say it out loud. Quirrell wouldn\'t believe him.' });
ep.panel(1100, QC({ expr: 'coldSmile', pose: 'gesture' }, 440, 400, 880, 1064, { over: (e) => FX.doom(e.w, e.h, 171) }),
  [say('Quirrell', 'Believe it or not, Mr Potter, you need not fear me for having discovered your secret. I am *not* going to tell you to give up on becoming the next Dark Lord. For as long as I thought that was my goal, it drove me to study, and learn, and become stronger. We become what we are meant to be by following our desires wherever they lead. That is the insight of Salazar.', 400, 100, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
ep.panel(820, QC({ expr: 'smile', pose: 'relaxed', turn: 0.4 }, 640, 300, 470, 784, { fg: { px: 640, py: 650, expr: 'exasperated', s: 1.3 } }),
  [say('Quirrell', 'Ask me to show you the library section which holds the books I read at thirteen, and I will happily lead the way.', 520, 60, { anchor: 'tc', w: 380, fixed: true })], { mood: 'candle' });
// Harry gives up and lies flat on the marble (seen from the ceiling), then sits up to explain
const FLOORV = () => rect(-2000, -2000, 6000, 6000, { fill: '#e8e4db' }) + g({ transform: 'rotate(18 1380 700)' }, [...Array(14)].map((_, k) => line(200 + k * 200, -800, 200 + k * 200, 2200, { stroke: '#c4bfb4', 'stroke-width': 3 }) + line(-800, -400 + k * 200, 3600, -400 + k * 200, { stroke: '#c4bfb4', 'stroke-width': 3 })).join('')) + g({ transform: 'rotate(18 1380 900)' }, ellipse(1392, 700, 170, 270, { fill: '#8a847a', opacity: 0.35, filter: 'url(#blur3)' }));
const STAR = { armF: { sh: -115, el: -20, hand: 'splay' }, armB: { sh: 115, el: 20, hand: 'splay' }, legF: { hip: -16 }, legB: { hip: 16 } };
const HLie = (o = {}) => H({ x: 1380, y: 900, turn: 0, pose: STAR, expr: 'deadpan', rot: 18, ...o });
const SITG = { ...POSES.sitFloor, armB: { sh: 55, el: -70, hand: 'palm' } };
const HSit = (o = {}) => H({ x: 1380, y: 960, turn: -0.4, pose: 'sitFloor', ...o });
ep.panel(960, { cam: { x: 1200, y: 590, w: 800 }, bg: ST, actors: TWO({ expr: 'laugh', pose: 'relaxed' }, { y: 960, pose: 'sitFloor', expr: 'exasperated' }) },
  [shout('Harry', 'Oh, for crying out *loud.*', 560, 190, { anchor: 'tc', w: 260, fixed: true })], { mood: 'candle', alt: 'Harry drops to the floor in front of the desk. Quirrell laughs.' });
ep.panel(860, { cam: AT(HLie(), 620, 420, 400, 824), bg: FLOORV, actors: [HLie()] },
  [cap('Harry sat down on the hard marble floor, and then lay back on it, staring at the distant arches of the ceiling. It was as close as he could come to collapsing in despair without hurting himself.', 48, 34, { w: 600, fixed: true })], { alt: 'Seen from above: Harry, flat on his back on the stage, arms flung out.' });
ep.multi(1170, [
  P(18, 400, QC({ expr: { base: 'smile', eyes: { lookY: 0.5 } }, pose: 'relaxed', turn: 0.4 }, 440, 520, 250, 400)),
  P(436, 716, { cam: AT(HLie(), 560, 520, 470, 716), bg: FLOORV, actors: [HLie({ expr: { base: 'think', eyes: { lookX: -0.3 } } })] }),
], [say('Quirrell', 'Still too much indignation.', 220, 90, { anchor: 'tc', w: 280, fixed: true }),
   say('Harry', 'Actually, I think I know what\'s confusing you. That was what I wanted to talk to you about. Professor Quirrell, I think what you\'re seeing is my mysterious dark side.', 330, 470, { anchor: 'tc', w: 440, fixed: true, tail: [M + 520, 436 + 400] })]);
ep.panel(760, QC({ expr: { base: 'blank', brows: { raise: 0.8 } } }, 400, 470, 410, 724, { blur: 3 }),
  [say('Quirrell', 'Your… dark side…', 190, 80, { anchor: 'tc', w: 200, fixed: true }),
   cap('One of the strangest expressions Harry had seen on anyone\'s face.', 48, 600, { w: 340, fixed: true })], { mood: 'candle' });
const HSitR = (o = {}) => HR2({ y: 1460, pose: SITG, ...o });   // sitting, seen from the dais
ep.panel(980, { cam: PAT(HSit(), 440, 400, 780, 980), bg: ST, blur: 2, actors: [HSit({ pose: SITG, expr: 'neutral' })], over: (e) => FX.frost(e.w, e.h, 0.2, 173) },
  [say('Harry', 'It happens when I get angry. My blood runs cold, everything seems perfectly clear… In my first year at Muggle school someone tried to take away my ball, and I kicked him in the solar plexus, which I\'d read was a weak point. And I bit a maths teacher when she wouldn\'t accept my dominance.', 400, 80, { anchor: 'tc', w: 510, fixed: true })], { mood: 'candle', alt: 'Harry sits up on the floor to explain.' });
ep.panel(960, HC({ pose: SITG, y: 1460, expr: 'think' }, 560, 470, 760, 924, { fg: { px: 30, py: 640, s: 2.3, expr: { base: 'focus', eyes: { lookY: 0.4 } } } }),
  [say('Harry', 'I\'ve already guessed that it\'s just another part of me, and the answer isn\'t to never get angry, but to learn to stay in control by accepting it. I\'ve seen this story enough times to know where it\'s going. But it\'s hard, and you seem like the person to help me.', 420, 90, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle', alt: 'Quirrell leans on his desk and listens.' });
ep.multi(1300, [
  P(18, 820, QC({ expr: { base: 'think', eyes: { lookX: -0.3 } }, pose: 'chin' }, 440, 420, 600, 820)),
  P(856, 426, { cam: AT(HSit(), 480, 520, 250, 426), bg: ST, blur: 2, actors: [HSit({ expr: 'determined' })] }),
], [cap('Professor Quirrell rubbed his nose. "Let me think about this." Harry waited a full minute.', 48, 34, { w: 600, fixed: true }),
   say('Quirrell', 'Well… yes… very perspicacious of you, Mr Potter, I must say… that side of you is, as you have already surmised, your intent to kill…', 380, 170, { anchor: 'tc', w: 440, fixed: true }),
   say('Harry', 'And needs to be trained.', 240, 900, { anchor: 'tc', w: 280, fixed: true })]);
ep.multi(1110, [
  P(18, 660, QC({ expr: 'coldSmile', pose: 'lecture' }, 440, 560, 520, 660)),
  P(696, 396, HC({ expr: 'yell', pose: 'fists' }, 460, 560, 250, 396, { behind: (e) => FX.burst(e.w, e.h, e.w * 0.75, e.h * 0.6, { n: 24, op: 0.14 }) })),
], [say('Quirrell', 'And needs to be trained, yes. Mr Potter, if you truly do not wish to be the next Dark Lord, then what was the ambition for which you were Sorted into Slytherin?', 305, 70, { anchor: 'tc', w: 380, fixed: true }),
   shout('Harry', 'I was Sorted into *Ravenclaw!*', 240, 770, { anchor: 'tc', w: 300, fixed: true })]);
ep.panel(1000, QC({ expr: 'calm', turn: 0.3 }, 520, 280, 760, 964, { fg: { px: 660, py: 900, expr: 'exasperated' } }),
  [say('Quirrell', 'Please do not mistake me for one of the fools around you. The Hat playing its first prank in eight hundred years, while it happened to be on *your* head? By far the most probable explanation is that Dumbledore was not happy with the Hat\'s choice for the Boy-Who-Lived.', 400, 80, { anchor: 'tc', w: 530, fixed: true })], { mood: 'candle' });
ep.panel(860, HC({ expr: 'exasperated' }, 420, 400, 580, 824, { blur: 3 }),
  [cap('Professor Quirrell was wrong. But wrong in such a convincing way, it simply *was* the rational judgement, given what he knew. If you had a medical test that was only wrong one time in a thousand, sometimes it would still be wrong anyway.', 48, 34, { w: 600, fixed: true })], { mood: 'candle' });
// why not a Dark Lord
const TWOC = (q = {}, h = {}, y = 330) => ({ cam: { x: 1190, y, w: 860 }, bg: ST, actors: TWO(q, h) });
ep.multi(1500, [
  P(18, 520, HC({ expr: 'neutral', pose: 'gesture' }, 480, 580, 330, 520, { fg: { px: 20, py: 420, s: 2.3, expr: 'calm' } })),
  P(556, 520, QC({ expr: { base: 'calm', eyes: { lookX: 0.4 } }, pose: 'relaxed', turn: 0.3 }, 440, 580, 330, 520)),
  P(1094, 388, HC({ expr: 'embarrassed' }, 460, 540, 230, 388)),
], [say('Harry', 'The Sorting Hat did seem to think I was going to end up a Dark Lord, unless I went to Hufflepuff. But I don\'t *want* to be one.', 310, 60, { anchor: 'tc', w: 380, fixed: true }),
   say('Quirrell', 'Mr Potter… I promise you will not be graded on the answer. I only want your honest reply. *Why not?*', 300, 616, { anchor: 'tc', w: 360, fixed: true }),
   say('Harry', 'Um, people would get hurt?', 250, 1140, { anchor: 'tc', w: 260, fixed: true })]);
ep.multi(1620, [
  P(18, 900, QC({ expr: 'coldSmile', pose: 'gesture' }, 460, 330, 700, 900, { fg: { px: 670, py: 880, expr: 'suspicious' } })),
  P(936, 666, HC({ expr: 'unimpressed' }, 480, 400, 520, 666)),
], [say('Quirrell', 'Surely you\'ve *wanted* to hurt people. You wanted to hurt those bullies today. Being a Dark Lord means that people you *want* to hurt get hurt. And what have all the innocent bystanders ever done for you?', 400, 90, { anchor: 'tc', w: 480, fixed: true }),
   say('Harry', 'Oh, now *that* was around as subtle as *Atlas Shrugged.* Blah blah blah, appeal to my sense of superiority, other people are trying to keep me down, blah blah blah.', 400, 1010, { anchor: 'tc', w: 480, fixed: true })]);
ep.panel(900, TWOC({ expr: 'laugh', pose: 'chin' }, { expr: 'laugh' }, 360),
  [say('Quirrell', 'So you\'re saying I need to make my traps less obvious? I can work on that.', 230, 70, { anchor: 'tc', w: 330, fixed: true }),
   capC('They both laughed.', 250, 800, { w: 260, fixed: true })], { mood: 'candle' });
ep.multi(1500, [
  P(18, 420, QC({ expr: 'calm', turn: 0.3 }, 420, 580, 240, 420)),
  P(456, 1026, HC({ expr: 'determined', pose: 'gesture' }, 480, 400, 870, 1026)),
], [say('Quirrell', 'But to stay with the question. What *have* all these other people done for you?', 270, 70, { anchor: 'tc', w: 360, fixed: true }),
   shout('Harry', 'Other people have done *huge* amounts for me! My parents took me in when my parents died, because they were *good people!* And to become a Dark Lord is to betray that!', 400, 580, { anchor: 'tc', w: 430, fixed: true })]);
ep.panel(880, QC({ expr: { base: 'sad', eyes: { lookX: -0.4 } } }, 380, 420, 440, 844, { blur: 3, over: (e) => FX.doom(e.w, e.h, 175) }),
  [cap('Professor Quirrell was silent for a time.', 48, 34, { w: 560, fixed: true }),
   whisper('Quirrell', 'I confess, when I was your age, that thought could not ever have come to me.', 400, 816, { anchor: 'bc', w: 460, fixed: true })], { mood: 'candle' });
ep.multi(1560, [
  P(18, 330, HC({ expr: 'sad' }, 440, 560, 200, 330)),
  P(366, 700, QC({ expr: 'calm', turn: 0.3 }, 440, 580, 520, 700)),
  P(1084, 458, HC({ expr: 'determined', pose: 'fists' }, 440, 640, 300, 458)),
], [say('Harry', 'I\'m sorry.', 280, 130, { w: 200, fixed: true }),
   say('Quirrell', 'Don\'t be. It was long ago, and I resolved my parental issues to my own satisfaction. So you are held back by your parents\' disapproval? If they died in an accident, would there be nothing left to stop you?', 300, 420, { anchor: 'tc', w: 400, fixed: true }),
   say('Harry', 'No. Just no. It is their *impulse to kindness* that sheltered me. That impulse is not only in my parents. And that impulse is what would be betrayed.', 280, 1125, { anchor: 'tc', w: 400, fixed: true })]);
// the ambition
ep.multi(1340, [
  P(18, 400, QC({ expr: 'calm' }, 420, 610, 230, 400)),
  P(436, 886, HC({ expr: 'smile', pose: 'lecture' }, 480, 400, 720, 886)),
], [say('Quirrell', 'In any case, Mr Potter, you have not answered my original question. What *is* your ambition?', 274, 60, { anchor: 'tc', w: 380, fixed: true, tail: [520, 206] }),
   say('Harry', 'Oh. Um. To understand everything important there is to know about the universe, apply that knowledge to become omnipotent, and use that power to rewrite reality, because I have some objections to the way it works now.', 400, 480, { anchor: 'tc', w: 480, fixed: true })]);
ep.multi(1480, [
  P(18, 960, TWOC({ expr: 'deadpan', pose: 'relaxed' }, { expr: 'smile', pose: 'gesture' }, 270)),
  P(996, 466, QC({ expr: { base: 'calm', eyes: { lookX: 0.3 } }, pose: 'chin' }, 420, 590, 300, 466)),
], [say('Quirrell', 'Forgive me if this is a stupid question, but are you *sure* you did not just confess to wanting to be a Dark Lord?', 240, 60, { anchor: 'tc', w: 340, fixed: true }),
   say('Harry', 'That\'s only if you use your power for evil. If you use the power for good, you\'re a *Light* Lord.', 560, 400, { anchor: 'tc', w: 300, fixed: true }),
   say('Quirrell', 'I see. I suppose I can work with that. And step one? A great fighting wizard? Minister of Magic?', 280, 1030, { anchor: 'tc', w: 360, fixed: true })]);
ep.bleed(1000, { cam: BAT(H({ pose: 'armsUp' }), 470, 400, 430, 1000), bg: ST, blur: 2, actors: [H({ pose: 'armsUp', expr: { base: 'bigGrin', eyes: { sparkle: true } } })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.56, { n: 26, op: 0.18 }) },
  [say('Harry', 'Step one is to become a scientist.', 400, 70, { anchor: 'tc', w: 360, fixed: true }),
   shout('Harry', 'I shall achieve my objectives through the power… of *Science!*', 400, 928, { anchor: 'bc', w: 400, fixed: true })], { alt: 'Harry, arms flung up, triumphant.' });
ep.panel(820, QC({ expr: { base: 'shock', eyes: { open: 1.1 } } }, 380, 400, 470, 784, { blur: 3 }),
  [cap('Professor Quirrell was looking at Harry as if he\'d just turned into a cat.', 48, 34, { w: 600, fixed: true }),
   say('Quirrell', 'A *scientist?*', 400, 770, { anchor: 'bc', w: 220, fixed: true })], { mood: 'candle' });
ep.panel(1250, QC({ expr: 'angry', pose: 'fists' }, 460, 400, 1036, 1214, { over: (e) => FX.doom(e.w, e.h, 177) }),
  [shout('Quirrell', 'You could be the best of all my students! The greatest fighting wizard to come out of Hogwarts in five decades!', 360, 110, { anchor: 'tc', w: 340, fixed: true, noTail: true }),
   shout('Quirrell', 'I cannot picture you wasting your days in a white lab coat, doing pointless things to *rats!*', 450, 590, { anchor: 'tc', w: 320, fixed: true })], { mood: 'candle' });
ep.panel(900, QC({ expr: 'stern', pose: 'lecture', turn: 0.4 }, 620, 250, 590, 864, { fg: { px: 710, py: 800, expr: 'worried' }, over: (e) => FX.doom(e.w, e.h, 178) }),
  [say('Quirrell', '*Fool.* You\'re a fool, Harry Potter. Or more likely you have not yet found your true ambition. May I strongly recommend that you try to become a Dark Lord instead? I will do anything I can to help, as a matter of public service.', 420, 70, { anchor: 'tc', w: 480, fixed: true })], { mood: 'candle' });
ep.multi(1780, [
  P(18, 330, HC({ expr: 'think' }, 460, 580, 200, 330)),
  P(366, 934, QC({ expr: 'rant', pose: 'point' }, 460, 424, 770, 934, { pw: 800, over: (e) => FX.doom(e.w, e.h, 179), behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.82, { n: 20, op: 0.12 }) }), { x: 0, w: 800, border: 'bleed', fadeTop: false, fadeBottom: false }),
  P(1318, 444, QC({ expr: 'angry', pose: 'fists', turn: 0.4 }, 620, 560, 280, 444, { over: (e) => FX.doom(e.w, e.h, 176) })),
], [say('Harry', 'You don\'t like science. Why not?', 280, 110, { w: 300, fixed: true }),
   shout('Quirrell', 'Those fool Muggles will kill us all some day! They will end it! End *all* of it!', 330, 470, { anchor: 'tc', w: 320, fixed: true, noTail: true }),
   shout('Quirrell', 'Nuclear weapons! Even He-Who-Must-Not-Be-Named never used those!', 400, 860, { anchor: 'tc', w: 500, size: 30, fixed: true }),
   shout('Quirrell', 'They never should have been made!', 290, 1420, { anchor: 'tc', w: 280, fixed: true })], { alt: 'Quirrell, almost shouting, standing straight instead of leaning.' });
ep.multi(1880, [
  P(18, 1240, QC({ expr: 'rant', pose: 'fists', turn: 0.1 }, 480, 400, 1100, 1240, { over: (e) => FX.doom(e.w, e.h, 180), behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.85, { n: 20, op: 0.12 }) })),
  P(1276, 586, QC({ expr: 'yell', pose: 'fists', turn: 0.2 }, 640, 300, 450, 586, { fg: { px: 660, py: 560, expr: 'shock' }, over: (e) => FX.doom(e.w, e.h, 181) })),
], [shout('Quirrell', 'There are gates you do not open! There are seals you do not breach!', 340, 100, { anchor: 'tc', w: 320, fixed: true, noTail: true }),
   shout('Quirrell', 'Every powerful wizard knows there are secrets you *do not share* with anyone who lacks the discipline to find them for themselves.', 430, 504, { anchor: 'tc', w: 380, fixed: true }),
   shout('Quirrell', 'And those idiot Muggles couldn\'t figure it out!', 360, 1400, { anchor: 'tc', w: 340, fixed: true })], { alt: 'Quirrell, almost shouting, standing straight instead of leaning.' });
ep.multi(1830, [
  P(18, 820, HC({ expr: 'think', pose: 'chin' }, 480, 400, 640, 820)),
  P(856, 600, QC({ expr: 'calm', pose: 'relaxed', turn: 0.3 }, 480, 580, 400, 600)),
  P(1474, 338, HC({ expr: { base: 'smile', eyes: { soft: true } } }, 460, 624, 200, 338)),
], [say('Harry', 'I\'ll have to think about that. It\'s a new idea to me. And one of the *hidden* secrets of science is how to avoid flushing new ideas down the toilet the instant you hear one you don\'t like. Is there any sort of science you *do* approve of?', 400, 90, { anchor: 'tc', w: 480, fixed: true }),
   say('Quirrell', 'Space travel. Though the Muggles seem to be dragging their feet on the one project which might have let us escape this planet before they blow it up.', 290, 900, { anchor: 'tc', w: 400, fixed: true }),
   say('Harry', 'I\'m a big fan of the space programme too. At least we have that much in common.', 276, 1520, { anchor: 'tc', w: 400, fixed: true })]);
ep.panel(1000, QC({ expr: { base: 'calm', eyes: { soft: true } }, pose: 'wand' }, 520, 300, 300, 964),
  [cap('Something flickered in the professor\'s eyes.', 48, 34, { w: 560, fixed: true }),
   say('Quirrell', 'I will have your word, your promise, and your oath never to speak of what follows. I will now cast a rare and powerful spell. Not on you: on the classroom around us. Stand still. Look only. And try not to fall over.', 400, 940, { anchor: 'bc', w: 510, fixed: true })], { mood: 'candle' });

// ---------------------------------------------------------------- the stars
ep.setBg('#020206');
const HX = 1380;   // Harry stands at the centre of the marble disc
const SPACE = (o = {}) => () => CS.deepSpace({ discX: HX, discR: 150, ...o });
const QS = (o = {}) => ({ def: quirrell, id: 'quirrell', x: 1000, y: 780, turn: 0.2, pose: 'stand', expr: { base: 'calm', eyes: { soft: true } }, ...o });
const HS = (o = {}) => ({ def: harryRaven, id: 'harry', x: HX, y: 900, s: 1.1, turn: -0.2, pose: 'stand', expr: 'awe', ...o });
const SPC = { bg: 'rgba(8,8,16,0.8)', color: '#e9e4f0', border: '#6a6a8a' };   // captions in space
const SPB = { bg: '#f3f0f8' };
ep.bleed(1200, { cam: { x: 1190, y: 500, w: 1100 }, bg: SPACE({ k: 1.3 }), actors: [QS({ pose: 'wandUp', expr: { base: 'calm', eyes: { lookX: 0.4 } } }), HS({ expr: { base: 'awe', eyes: { lookY: -0.5 } } })] },
  [cap('Professor Quirrell raised his wand and said something that Harry\'s ears and mind couldn\'t grasp at all. The marble in a short circle around Harry\'s feet stayed. All the rest of the floor vanished. The walls vanished. The ceiling vanished.', 48, 50, { w: 600, fixed: true, ...SPC })],
  { fadeTop: false, fadeBottom: false, alt: 'Harry stands on a small circle of white marble in the middle of an endless field of stars. The Milky Way arcs across everything. Quirrell floats, unsupported, nearby.' });
ep.bleed(1300, { cam: { x: 1150, y: 320, w: 1500 }, bg: SPACE({ k: 1.3, disc: false }) },
  [capC('There was no Earth. No Moon. No Sun that Harry recognised. The Milky Way was a great wash of light, and it grew brighter as his eyes adjusted to the dark.', 400, 1220, { anchor: 'bc', w: 560, fixed: true, ...SPC })],
  { fadeTop: false, fadeBottom: false, alt: 'Only stars. Countless points of perfect light against perfect black.' });
const HSA = HS({ expr: { base: 'teary', eyes: { sparkle: true, lookY: -0.4 } } });
ep.bleed(1000, { cam: BAT(HSA, 480, 400, 470, 1000), bg: SPACE({ k: 0.8 }), actors: [HSA, QS()] },
  [say('Harry', 'Are we… in space…?', 400, 150, { anchor: 'tc', w: 280, fixed: true }),
   say('Quirrell', 'No. But it is a true image.', 190, 800, { w: 260, fixed: true, tail: [0, 760], ...SPB })],
  { fadeTop: false, fadeBottom: false, alt: 'Harry, eyes full of tears and starlight.' });
ep.bleed(1200, { cam: BAT(HS({ pose: 'facepalm' }), 470, 400, 560, 1200), bg: SPACE({ k: 0.6 }), actors: [HS({ expr: 'cry', pose: 'facepalm' })] },
  [capC('Tears came into Harry\'s eyes. He wiped them away frantically. He would not miss this for some stupid water blurring his vision.', 400, 60, { anchor: 'tc', w: 560, fixed: true, ...SPC }),
   capC('In space, the stars looked terribly, terribly, terribly far away.', 400, 1140, { anchor: 'bc', w: 520, fixed: true, ...SPC })],
  { fadeTop: false, fadeBottom: false });
const QSL = QS({ turn: 0.1, expr: { base: 'sad', eyes: { lookY: -0.5, soft: true } } });
ep.bleed(1160, { cam: BAT(QSL, 400, 400, 560, 1160), bg: SPACE({ k: 0.9, disc: false }), actors: [QSL] },
  [whisper('Quirrell', 'Sometimes, when this flawed world seems unusually hateful, I wonder whether there might be some other place, far away, where I should have been.', 400, 70, { anchor: 'tc', w: 500, fixed: true, ...SPB }),
   whisper('Quirrell', 'I cannot seem to imagine what that place might be. And if I can\'t even imagine it, then how can I believe it exists? And yet the universe is so very, very wide. And perhaps it might exist anyway?', 400, 1110, { anchor: 'bc', w: 520, fixed: true, ...SPB })],
  { fadeTop: false, fadeBottom: false, alt: 'Quirrell, floating unsupported among the stars, his voice so quiet it almost isn\'t there.' });
ep.bleed(1000, { cam: { x: 1040, y: 330, w: 1300 }, bg: SPACE({ k: 1.1, disc: false }), actors: [QS({ turn: -0.3, expr: { base: 'sad', eyes: { lookY: -0.6, soft: true } } })] },
  [whisper('Quirrell', 'But the stars are so very, very far away. It would take a long, long time to get there, even if I knew the way. And I wonder what I would dream about, if I slept for a long, long time…', 400, 60, { anchor: 'tc', w: 520, fixed: true, ...SPB })],
  { fadeTop: false, fadeBottom: false, alt: 'Quirrell, a small dark figure adrift among the stars.' });
const HSS = HS({ expr: { base: 'teary', eyes: { soft: true, lookY: -0.3 } } });
ep.bleed(860, { cam: BAT(HSS, 440, 400, 520, 860), bg: SPACE({ k: 0.8 }), actors: [HSS] },
  [whisper('Harry', 'Please let me stay here awhile.', 400, 120, { anchor: 'tc', w: 340, fixed: true, ...SPB })],
  { fadeTop: false, fadeBottom: false });
ep.bleed(2200, { cam: { x: 1190, y: 330, w: 1500 }, bg: SPACE({ k: 1.2 }), actors: [QS({ x: 960, y: 820 }), HS({ pose: 'stand', expr: { base: 'calm', eyes: { soft: true, lookY: -0.6 } } })] },
  [capC('It was easy to forget the small circle of marble on which you stood, and your own body, and become a point of awareness that might have been still, or might have been moving. With all distances incalculable, there was no way to tell.', 400, 80, { anchor: 'tc', w: 560, fixed: true, ...SPC }),
   capC('There was a time of no time.', 400, 2120, { anchor: 'bc', w: 360, fixed: true, ...SPC })],
  { fadeTop: false, fadeBottom: false, alt: 'A very tall, silent panel: two small figures among the stars.' });
ep.setBg(C.paper);
ep.tile({ h: 160, panels: [], bubbles: [], bg: { top: '#020206', bottom: C.paper } });

// ---------------------------------------------------------------- the doors
// the classroom's great double doors, on the back wall to the right (DX = centre of the doorway)
const DX = 2020;
const doorway = () => path(`M${DX - 250},560 L${DX - 250},-140 Q${DX},-380 ${DX + 250},-140 L${DX + 250},560Z`, { fill: '#6e6a74', stroke: '#2a2630', 'stroke-width': 4 })
  + path(`M${DX - 210},552 L${DX - 210},-120 Q${DX},-330 ${DX + 210},-120 L${DX + 210},552Z`, { fill: '#f1dfae', stroke: '#2a2630', 'stroke-width': 3 })
  + path(`M${DX - 210},552 L${DX - 210},-120 Q${DX},-330 ${DX + 210},-120 L${DX + 210},552Z`, { fill: '#fff6d8', opacity: 0.6, filter: 'url(#blur3)' })
  + [DX - 212, DX + 200].map((x) => rect(x, 0, 12, 30, { fill: '#2a2226' }) + rect(x, 400, 12, 30, { fill: '#2a2226' })).join('');
const ST2 = () => CS.defenceStage({}) + doorway();
// a heavy oak door leaf, blown loose: planks, iron straps, a torn hinge
const leaf = (x, y, rot, s = 1) => g({ transform: `translate(${x},${y}) rotate(${rot}) scale(${s})` },
  rect(-105, -235, 210, 470, { fill: '#4a3020', stroke: '#1e140e', 'stroke-width': 5, rx: 6 }),
  ...[-52, 0, 52].map((u) => line(u, -230, u, 230, { stroke: '#2e1e14', 'stroke-width': 3 })),
  ...[-150, 150].map((v) => rect(-105, v - 14, 210, 28, { fill: '#3a3438', stroke: '#1a1618', 'stroke-width': 3 })),
  ...[-150, 150].map((v) => circle(-80, v, 7, { fill: '#8a8290' }) + circle(80, v, 7, { fill: '#8a8290' })));
const splinters = () => { const R = rng(41); let o = ''; for (let i = 0; i < 16; i++) { const x = DX + R.range(-420, 380), y = R.range(200, 900); o += rect(x, y, R.range(16, 40), R.range(5, 10), { fill: '#5a3a26', stroke: '#1e140e', 'stroke-width': 2, transform: `rotate(${R.range(0, 180)} ${x} ${y})` }); } return o; };
const smoke = () => { const R = rng(43); let o = ''; for (let i = 0; i < 14; i++) o += circle(DX + R.range(-330, 330), R.range(380, 640), R.range(50, 110), { fill: '#ddd6cc', opacity: R.range(0.25, 0.5), filter: 'url(#blur3)' }); return o; };
const DB = (o = {}) => ({ def: dumbledore, id: 'dumbledore', x: 1700, y: 900, turn: -0.4, pose: 'stand', expr: 'angry', ...o });
const THREE = (d = {}, q = {}, h = {}) => [Q(q), QD, H(h), DB(d)];
const Hd = (o = {}) => H({ turn: 0.4, ...o });                                    // Harry, facing the Headmaster
// closes on Dumbledore and on Harry facing him (seen from the dais side: back wall behind)
const DC = (d, w, px, py, ph, o = {}) => ({ cam: AT(DB(d), w, px, py, ph, o.pw), bg: ST2, blur: o.blur ?? 2, actors: [DB(d)], ...(o.over ? { over: o.over } : {}) });
const HDC = (h, w, px, py, ph, o = {}) => ({ cam: AT(Hd(h), w, px, py, ph, o.pw), bg: ST2, blur: o.blur ?? 2, actors: [Hd(h)], ...(o.over ? { over: o.over } : {}) });
const THC = (d = {}, q = {}, h = {}, cam = { x: 1350, y: 400, w: 1000 }) => ({ cam, bg: ST2, actors: THREE(d, q, h) });

ep.panel(900, { cam: { x: 1190, y: 380, w: 860 }, bg: ST, actors: TWO({ expr: 'calm', turn: 0.5 }, { expr: 'teary', turn: -0.2 }) },
  [say('Quirrell', 'I\'m sorry. But we\'re about to have company.', 220, 70, { anchor: 'tc', w: 300, fixed: true }),
   whisper('Harry', 'It\'s fine. It was enough.', 560, 360, { w: 260, fixed: true })], { mood: 'candle', alt: 'The classroom returns.' });
ep.bleed(1200, { cam: { x: 1960, y: 400, w: 1100 }, bg: () => CS.defenceStage({}) + doorway() + smoke(), actors: [DB({ x: DX, y: 640, turn: -0.2, pose: 'point', expr: 'angry' }), () => leaf(1560, 820, -38, 1.25) + leaf(2440, 760, 52, 1.15) + splinters()], behind: (e) => FX.burst(e.w, e.h, e.w * 0.55, e.h * 0.4, { n: 34, op: 0.22 }) },
  [sfx('BOOM', 230, 170, { size: 130, rot: -8 }),
   shout('Dumbledore', '*QUIRINUS! HOW DARE YOU!*', 400, 1140, { anchor: 'bc', w: 380, fixed: true })], { alt: 'The heavy oak doors blast off their hinges. Like a vast thundercloud, Dumbledore blows into the room, incandescent with rage.' });
ep.panel(1000, HDC({ turn: 0.6, expr: 'cold' }, 460, 400, 620, 964, { over: (e) => FX.frost(e.w, e.h, 0.45, 181) }),
  [cap('*None* of Harry\'s facets were happy about having their star-gazing interrupted.', 48, 34, { w: 600, fixed: true }),
   cold('Harry', 'Headmaster Albus Percival…', 400, 950, { anchor: 'bc', w: 340, fixed: true })], { mood: 'cold' });
const SLAM = { armB: { sh: 28, el: -35, hand: 'fist' }, armF: { sh: -8, el: 10 }, legF: { hip: -4 }, legB: { hip: 4 }, lean: 6 };
ep.bleed(1120, { cam: AT(Q({ pose: SLAM }), 560, 400, 560, 1120, 800), bg: () => CS.defenceStage({ desk: false }), actors: [Q({ pose: SLAM, expr: 'stern', turn: 0.3 }), () => CS.defenceDesk(1000, 660)], behind: (e) => FX.burst(e.w, e.h, 519, 880, { n: 26, op: 0.2 }) },
  [sfx('WHAM', 640, 960, { size: 90, rot: 6 }),
   shout('Quirrell', '*Mr Potter!* This is the *Headmaster of Hogwarts*, and you are a mere student! You will address him appropriately!', 400, 120, { anchor: 'tc', w: 400, fixed: true })], { fadeBottom: false, alt: 'Quirrell\'s hand slams down on his desk.' });
ep.panel(760, { cam: { x: 1190, y: 380, w: 860 }, bg: ST, actors: TWO({ expr: 'stern' }, { expr: 'neutral', turn: -0.3 }) },
  [cap('Harry looked at Professor Quirrell. Professor Quirrell gave him a stern glare. Neither of them smiled.', 48, 34, { w: 600, fixed: true })], { mood: 'candle' });
ep.multi(1840, [
  P(18, 560, THC({ expr: 'angry', pose: 'point' }, { expr: 'stern' }, { expr: 'calm' }, { x: 1380, y: 300, w: 1000 })),
  P(596, 800, DC({ expr: 'yell', pose: 'point' }, 480, 560, 640, 800)),
  P(1414, 408, HDC({ expr: 'calm' }, 460, 604, 230, 408)),
], [say('Harry', 'I\'m sorry. Headmaster, thank you for wanting to protect me. But Professor Quirrell did the right thing.', 470, 60, { anchor: 'tc', w: 420, fixed: true }),
   shout('Dumbledore', 'I heard students saying that this man had you abused by older Slytherins! That he forbade you to defend yourself!', 400, 700, { anchor: 'tc', w: 440, fixed: true }),
   say('Harry', 'He knew exactly what was wrong with me, and he showed me how to fix it.', 272, 1460, { anchor: 'tc', w: 360, fixed: true })], { alt: 'Dumbledore, towering; Harry between the two professors.' });
ep.multi(1450, [
  P(18, 420, QC({ expr: 'smile', pose: 'relaxed', turn: 0.4 }, 440, 590, 240, 420)),
  P(456, 520, DC({ expr: { base: 'worried', eyes: { lookX: -0.4 } } }, 460, 580, 320, 520)),
  P(994, 438, HDC({ expr: 'deadpan' }, 460, 612, 260, 438)),
], [say('Quirrell', 'I was teaching him how to lose. It\'s an important life skill.', 290, 70, { anchor: 'tc', w: 360, fixed: true }),
   say('Dumbledore', 'Harry… if there is any threat the Defence Professor has offered you, to prevent you from complaining…', 290, 500, { anchor: 'tc', w: 380, fixed: true }),
   say('Harry', 'Headmaster, what\'s wrong with me isn\'t that I keep quiet about abusive professors.', 282, 1040, { anchor: 'tc', w: 380, fixed: true })]);
ep.multi(1560, [
  P(18, 900, QC({ expr: 'smile', pose: 'lecture' }, 460, 400, 700, 900)),
  P(936, 606, DC({ expr: { base: 'stern', eyes: { lookX: -0.5 } }, pose: 'crossArms' }, 460, 590, 380, 606)),
], [say('Quirrell', 'Not perfect, Mr Potter, but good enough for your first day. Headmaster, did you stay long enough to hear about the *fifty-one points to Ravenclaw*, or did you storm out after the first part?', 400, 90, { anchor: 'tc', w: 480, fixed: true }),
   say('Quirrell', 'I wonder how on Earth Mr Potter gained the upper hand over both Snape and you, and then Professor McGonagall gained the upper hand over him.', 300, 980, { anchor: 'tc', w: 400, fixed: true, tail: [M, 1300] })]);
ep.panel(1000, { cam: { x: 1560, y: 470, w: 700 }, bg: ST2, actors: [Hd({ expr: 'confused' }), DB({ pose: 'chin', expr: 'think' })] },
  [say('Dumbledore', 'Your colour looks a little off, Harry. What did you have for lunch today?', 560, 60, { anchor: 'tc', w: 300, fixed: true }),
   say('Harry', 'What?', 150, 460, { w: 120, fixed: true }),
   say('Dumbledore', 'Never mind, then. I think you\'re fine.', 590, 780, { w: 260, fixed: true })], { mood: 'candle', alt: 'Harry\'s mind wobbles: deep-fried lamb and thin-sliced broccoli?' });
ep.panel(1100, THC({ expr: 'stern' }, { expr: 'coldSmile', pose: 'stand' }, { expr: 'confused', turn: 0 }, { x: 1350, y: 250, w: 1000 }), 
  [say('Quirrell', '*Ahem.* If you don\'t tell him, I will. Even if you fire me for it.', 250, 60, { anchor: 'tc', w: 300, fixed: true }),
   say('Dumbledore', 'I apologise for invading your mental privacy, Mr Potter. I had no purpose except to see whether Professor Quirrell had done the same.', 500, 290, { anchor: 'tc', w: 380, fixed: true })], { mood: 'candle', alt: 'Dumbledore and Quirrell lock eyes. Something passes between them.' });
ep.bleed(900, { cam: BAT(Hd(), 420, 400, 480, 900), bg: ST2, blur: 2, actors: [Hd({ expr: 'yell' })], over: (e) => FX.frost(e.w, e.h, 0.4, 185), behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.53, { n: 20, op: 0.2 }) },
  [shout('Harry', '*YOU…!*', 400, 90, { anchor: 'tc', w: 200, fixed: true }),
   shout('Harry', '*You should have asked first!*', 400, 830, { anchor: 'bc', w: 360, fixed: true })], { alt: 'The confusion lasts exactly as long as it takes Harry to understand what just happened.' });
ep.panel(1060, DC({ expr: 'calm' }, 460, 400, 700, 1024),
  [say('Dumbledore', 'Legilimency is sometimes mistaken for common sense. But it leaves traces which another skilful Legilimens can detect. That was all I looked for, Mr Potter. I asked you an irrelevant question, so you wouldn\'t think of anything important while I looked.', 400, 90, { anchor: 'tc', w: 480, fixed: true }),
   cap('(*Common sense is often mistaken for Legilimency,* he had said, that very morning.)', 48, 930, { w: 600, fixed: true })], { mood: 'candle' });
ep.multi(1900, [
  P(18, 820, QC({ expr: 'stern', pose: 'point', turn: 0.5 }, 480, 330, 640, 820)),
  P(856, 300, DC({ expr: 'cold' }, 460, 560, 190, 300)),
  P(1174, 708, QC({ expr: 'cold', pose: 'relaxed', turn: 0.4 }, 480, 652, 570, 708)),
], [say('Quirrell', 'I am rather more concerned, Headmaster, that you saw no need to tell him afterwards! There are too many Legilimens in this school. I insist that Mr Potter receive instruction in Occlumency. Will you permit me to be his tutor?', 400, 90, { anchor: 'tc', w: 480, fixed: true }),
   say('Dumbledore', 'Absolutely not.', 290, 1000, { w: 280, fixed: true }),
   say('Quirrell', 'I did not think so. Then *you* will pay for a licensed Occlumency instructor. One recommended by his account manager at Gringotts. Neutral. Bound by an Unbreakable Vow to reveal nothing, and Obliviated after each session.', 332, 1236, { anchor: 'tc', w: 440, fixed: true, tail: [616, 1690] })]);
ep.multi(1500, [
  P(18, 560, DC({ expr: 'suspicious', pose: 'crossArms' }, 460, 590, 360, 560)),
  P(596, 420, HDC({ expr: 'hopeful', pose: { ...POSES.raiseHand, armB: { sh: 140, el: 20, hand: 'palm' } } }, 600, 590, 290, 420)),
  P(1034, 448, DC({ expr: { base: 'deadpan', eyes: { open: 0.7 } } }, 440, 590, 290, 448)),
], [say('Dumbledore', 'Such services are *extremely* expensive, as you well know, and I cannot help but wonder why *you* deem them necessary.', 290, 60, { anchor: 'tc', w: 380, fixed: true }),
   say('Harry', 'If it\'s money that\'s the problem, I have some ideas for making large amounts of money quickly…', 290, 640, { anchor: 'tc', w: 380, fixed: true }),
   say('Dumbledore', 'Thank you, Quirinus, your wisdom is now quite evident, and I am sorry for disputing it.', 290, 1080, { anchor: 'tc', w: 380, fixed: true })]);
ep.multi(1120, [
  P(18, 680, QC({ expr: { base: 'calm', eyes: { style: 'cold', open: 0.8 } }, pose: 'stand' }, 400, 400, 470, 680, { over: (e) => FX.doom(e.w, e.h, 187) })),
  P(716, 386, HDC({ expr: 'determined', turn: -0.3 }, 460, 580, 230, 386)),
], [say('Quirrell', 'You\'re welcome. I hope you will not object if I go on making him a particular focus of my attentions.', 400, 70, { anchor: 'tc', w: 460, fixed: true }),
   say('Harry', 'It is my own wish also.', 280, 850, { w: 280, fixed: true })], { alt: 'Quirrell\'s face now very serious, and very still.' });
ep.bleed(1200, { cam: BAT(DB(), 440, 400, 520, 1200), bg: ST2, blur: 2, actors: [DB({ turn: -0.3, expr: 'sad' })] },
  [say('Dumbledore', 'So that\'s how it is to be…', 400, 110, { anchor: 'tc', w: 300, fixed: true }),
   say('Dumbledore', 'Harry. You must realise that if you choose this man as your teacher and your friend, your first mentor, then one way or another you will lose him. And the manner in which you lose him may or may not allow you to ever get him back.', 400, 1150, { anchor: 'bc', w: 500, fixed: true })], { alt: 'Something strange passes across the old wizard\'s face.' });
ep.multi(1100, [
  P(18, 560, QC({ expr: { base: 'calm', eyes: { soft: true } } }, 400, 560, 330, 560, { blur: 3 })),
  P(596, 486, DC({ expr: { base: 'smile', eyes: { soft: true } } }, 460, 590, 320, 486)),
], [say('Quirrell', 'Probably. But he will have the full use of me while I last.', 280, 70, { anchor: 'tc', w: 360, fixed: true }),
   say('Dumbledore', 'I suppose it is economical, at least, since as the Defence Professor you\'re *already* doomed in some unknown fashion.', 290, 640, { anchor: 'tc', w: 380, fixed: true })]);
ep.bleed(820, { cam: { x: 1500, y: 420, w: 1400 }, bg: ST2, actors: [Q({ expr: 'calm' }), QD, H({ expr: 'think', turn: 0.4 }), DB({ x: 1950, y: 620, s: 0.95, turn: 0.6, pose: 'walk', expr: 'sad' })] },
  [cap('Dumbledore nodded to them both, and departed. Walking a bit slowly.', 48, 40, { w: 560, fixed: true })], { alt: 'Dumbledore walks out through the ruined doorway.' });

// ---------------------------------------------------------------- Pioneer
ep.multi(1632, [
  P(18, 380, HC({ expr: 'hopeful' }, 460, 580, 220, 380)),
  P(416, 580, QC({ expr: 'sad', pose: 'relaxed', turn: 0.3 }, 440, 580, 380, 580)),
  P(1014, 600, { cam: { x: 1190, y: 400, w: 860 }, bg: ST2, actors: TWO({ expr: { base: 'sad', eyes: { open: 0.6 } }, pose: 'slump' }, { expr: { base: 'sad', eyes: { open: 0.6 } }, pose: 'slump' }) }),
], [say('Harry', 'Can you cast the spell again?', 290, 150, { w: 300, fixed: true }),
   say('Quirrell', 'Not today, and not tomorrow either, I\'m afraid. It takes a lot out of me to cast. This time I cast it on impulse. Had I thought…', 290, 450, { anchor: 'tc', w: 380, fixed: true }),
   cap('Dumbledore was now Harry\'s least favourite person in the entire world. They both sighed.', 320, 1040, { w: 380, fixed: true })]);
ep.multi(1500, [
  P(18, 420, HC({ expr: { base: 'smile', eyes: { soft: true } } }, 460, 606, 250, 420)),
  P(456, 1026, HC({ expr: { base: 'smile', eyes: { soft: true } }, pose: 'gesture' }, 560, 470, 830, 1026, { fg: { px: 30, py: 780, s: 2.3, expr: { base: 'calm', eyes: { soft: true } } } })),
], [say('Harry', 'Even if I only ever see it once, I will never stop being grateful to you.', 290, 60, { anchor: 'tc', w: 380, fixed: true }),
   say('Harry', 'Have you heard of the Pioneer programme? Probes that flew past the planets, taking pictures. Two of them would end up leaving the Solar System forever. So they put a golden plaque on each one, with a picture of a man, and a woman, and a map showing where to find our Sun.', 400, 530, { anchor: 'tc', w: 480, fixed: true, tail: [476, 1112] })]);
ep.multi(1880, [
  P(18, 580, QC({ expr: 'scheme', pose: 'gesture' }, 440, 580, 400, 580)),
  P(616, 580, QC({ expr: 'smug', pose: 'relaxed', turn: 0.4 }, 560, 230, 450, 580, { fg: { px: 670, py: 550, expr: 'awe' } })),
  P(1214, 648, QC({ expr: { base: 'bigGrin', eyes: { sparkle: true } }, pose: 'gesture' }, 400, 400, 490, 648)),
], [say('Quirrell', 'I am going to violate rule two, which was simply "don\'t brag", and tell you about something I have done. Your oath never to speak of it.', 290, 60, { anchor: 'tc', w: 380, fixed: true }),
   say('Quirrell', 'I subscribe to a Muggle bulletin on space travel. When I discovered that Pioneer 11 would be leaving the Solar System forever…', 490, 650, { anchor: 'tc', w: 420, fixed: true, tail: [290, 1000] }),
   say('Quirrell', 'I sneaked into NASA, I did. And I cast a lovely little spell on that lovely golden plaque, which will make it last a lot longer than it otherwise would.', 400, 1300, { anchor: 'tc', w: 480, fixed: true, tail: [424, 1620] })], { alt: 'Quirrell, grinning the widest grin Harry has yet seen from him.' });
// Harry, speechless: the same face, three times, closer each time
ep.multi(700, [0, 1, 2].map((k) => ({ x: M + k * 254, y: 18, w: 244, h: 664, mood: 'candle', art: { cam: AT(HR2(), [200, 140, 90][k], 122, [300, 330, 360][k], 664, 244), bg: REV, blur: 3, actors: [HR2({ expr: { base: 'awe', eyes: { open: 1 + k * 0.12, sparkle: true } } })] } })),
  [cap('…', 60, 34, { w: 60, fixed: true }), cap('…', 314, 34, { w: 60, fixed: true }), cap('…', 568, 34, { w: 60, fixed: true })], { alt: 'Harry, speechless, in three panels.' });
ep.multi(1500, [
  P(18, 900, TWOC({ expr: 'smug', pose: 'relaxed' }, { expr: { base: 'awe', mouth: { type: 'o' } } }, 300)),
  P(936, 546, QC({ expr: 'smug', pose: 'relaxed', turn: 0.4 }, 620, 280, 330, 546, { fg: { px: 660, py: 500, expr: { base: 'awe', mouth: { type: 'o' } } } })),
], [say('Quirrell', 'Yes, I thought that was how you might react. Mr Potter?', 230, 60, { anchor: 'tc', w: 320, fixed: true }),
   say('Harry', '…I can\'t think of anything to say.', 560, 340, { anchor: 'tc', w: 280, fixed: true }),
   say('Quirrell', '"You win" seems appropriate.', 440, 970, { anchor: 'tc', w: 300, fixed: true, tail: [340, 1180] }),
   say('Harry', 'You win.', 520, 1200, { w: 180, fixed: true, tail: [610, 1340] })], { alt: 'Professor Quirrell, who now seems to be standing about fifty feet taller.' });
ep.bleed(1000, { cam: { x: 1190, y: 330, w: 900 }, bg: ST2, actors: TWO({ expr: 'laugh', pose: 'relaxed' }, { expr: 'laugh', pose: 'armsUp' }) },
  [say('Quirrell', 'See? We can only imagine what giant heap of trouble you would have landed in if you had been unable to say that.', 290, 60, { anchor: 'tc', w: 400, fixed: true }),
   capC('They both laughed.', 400, 950, { anchor: 'bc', w: 280, fixed: true })], { alt: 'The two of them, laughing together on the empty stage.' });
ep.multi(1620, [
  P(18, 900, HC({ expr: 'scheme', pose: 'point' }, 480, 400, 720, 900)),
  P(936, 666, QC({ expr: { base: 'calm', eyes: { style: 'cold', open: 0.8 } } }, 440, 616, 540, 666)),
], [say('Harry', 'You didn\'t add any extra information to the plaque, did you? A holographic message? Or… a portrait seems to store a whole human mind… or you found a volunteer who was dying, and made sure their *ghost* ended up in the plaque…', 400, 80, { anchor: 'tc', w: 520, fixed: true }),
   say('Quirrell', 'Mr Potter. A spell requiring a human death would certainly be classified by the Ministry as Dark Arts, regardless of circumstances. Students should not be heard talking about such things.', 320, 1000, { anchor: 'tc', w: 440, shape: 'box', fixed: true })]);
ep.multi(1260, [
  P(18, 860, QC({ expr: { base: 'calm', eyes: { style: 'cold', open: 0.8 } } }, 290, 400, 560, 860, { blur: 3, over: (e) => FX.doom(e.w, e.h, 189) })),
  P(896, 346, HC({ expr: 'determined' }, 460, 590, 210, 346)),
], [cap('And the amazing thing about the way Professor Quirrell said it was how perfectly it kept its plausible deniability. Harry honestly *didn\'t know* whether he was just waiting to talk about it until Harry had learned to protect his mind.', 48, 34, { w: 600, fixed: true }),
   say('Harry', 'Got it. I won\'t talk with anyone else about that idea.', 290, 1060, { w: 380, fixed: true })]);
ep.multi(1460, [
  P(18, 900, TWOC({ expr: 'calm', pose: 'slump' }, { expr: 'smile', pose: 'gesture' }, 300)),
  P(936, 506, QC({ expr: { base: 'pained', eyes: { open: 0.6 } }, pose: 'slump' }, 420, 590, 330, 506)),
], [say('Quirrell', 'Please be discreet about the whole matter. I prefer to go through my life without attracting public notice.', 240, 60, { anchor: 'tc', w: 360, fixed: true }),
   say('Harry', 'So just how much awesome stuff *have* you done that no-one else knows about?', 560, 350, { anchor: 'tc', w: 280, fixed: true }),
   say('Quirrell', 'Oh, some. But I think that\'s quite enough for today, Mr Potter. I confess I am feeling a bit tired…', 290, 980, { anchor: 'tc', w: 380, fixed: true })]);
ep.panel(900, { cam: { x: 1400, y: 440, w: 1150 }, bg: ST2, actors: TWO({ expr: 'pained', pose: 'slump' }, { x: 1720, y: 860, turn: 0.6, pose: 'walk', expr: { base: 'smile', eyes: { soft: true } } }) },
  [say('Harry', 'I understand. And *thank you.* For *everything.*', 560, 150, { anchor: 'tc', w: 300, fixed: true }),
   cap('Professor Quirrell nodded. But he was leaning harder on his desk. Harry quickly took his leave.', 48, 760, { w: 600, fixed: true })], { mood: 'candle', alt: 'Quirrell, leaning heavily on his desk, watching Harry go.' });

// ---------------------------------------------------------------- epilogue: Pioneer 11
ep.setBg('#020206');
ep.tile({ h: 200, panels: [], bubbles: [], bg: { top: C.paper, bottom: '#020206' } });
// the probe: tiny, in a dark patch below the Milky Way, with a faint halo so the eye can find it
const PX = 1560, PY = 900;
ep.bleed(1800, { cam: { x: 1100, y: 500, w: 2200 }, bg: () => CS.deepSpace({ disc: false, seed: 311, k: 1.4 }), actors: [() => K.glow(PX, PY, 90, '#cfe0ff', 0.22) + g({ transform: `translate(${PX},${PY}) rotate(-16)` }, P2.pioneer(0.32))] },
  [capC('Pioneer 11. Launched 1973. Leaving the Solar System, forever.', 400, 1720, { anchor: 'bc', w: 520, fixed: true, ...SPC })],
  { fadeTop: false, fadeBottom: false, alt: 'Silence. Deep space. A tiny probe, drifting outward among the stars.' });
ep.bleed(1000, { cam: { x: PX + 10, y: PY + 50, w: 600 }, bg: () => CS.deepSpace({ disc: false, seed: 311, k: 0.7 }), actors: [() => g({ transform: `translate(${PX},${PY}) rotate(-16)` }, P2.pioneer(0.9, { glint: true }))] },
  [], { fadeTop: false, fadeBottom: false, alt: 'Closer: the golden plaque on the probe, catching starlight. For a moment, a faint colour-split shimmer, like something slightly wrong, passes over it.' });
ep.setBg(C.paper);
ep.tile({ h: 200, panels: [], bubbles: [], bg: { top: '#020206', bottom: C.paper } });
ep.beat(460, [plain('End of Book Two', 400, 150, { font: "'IM Fell English SC', serif", size: 40, color: '#3a2a20' }), plain('*The story continues…*', 400, 230, { font: "'IM Fell English', serif", size: 28, color: '#5a4032' })],
  { over: () => g({ transform: 'translate(400,340)' }, K.candle(0, 20, 1.6, true)) });
export default ep;
