// EPISODE 21 — Phoenix Song  (source: HPMOR ch. 18, second half)
// Harry beats Snape and Dumbledore, and loses the Time-Turner and McGonagall's approval. The low point.
import { Episode, say, shout, whisper, inner, cold, cap, capC, plain, title, sfx, M } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as CS from '../engine/bg/castle.js';
import * as HG from '../engine/bg/hogwarts.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { snape, mcgonagall, dumbledore, fred, george, sprout, student } from '../engine/chars/cast.js';
import { harryRaven, hermioneRaven, terry, padma, anthony, michael } from '../engine/chars/cast2.js';
import * as P2 from '../engine/props/props2.js';
import { place } from '../engine/chars/rig.js';
import { dayBeat, header } from './b2.js';

const ep = new Episode({ id: 'ep21', number: 21, title: 'Phoenix Song' });
ep.setBg(C.paper);
header(ep, 'TWENTY-ONE', 'Phoenix Song');
dayBeat(ep, 'Friday.', 'If you wanted to be specific, 10:40 on Friday morning. The Headmaster\'s office.');

// Dumbledore in four layers of formal lavender robes
const dumbLav = { ...dumbledore, outfit: { ...dumbledore.outfit, top: '#9a86c8', robeColor: '#9a86c8', robeTrim: '#d9cdea', cuff: '#7a64a8' } };
const OF = (o = {}) => () => CS.dumbledoreOffice({ bird: 'phoenix', rack: true, ...o });
const DB = (o = {}) => ({ def: dumbLav, id: 'dumbledore', x: 1000, y: 880, turn: 0.1, pose: 'sit', seat: 200, expr: 'stern', ...o });
const MG = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 520, y: 1040, turn: 0.4, pose: 'sit', seat: 170, expr: 'worried', ...o });
const SN = (o = {}) => ({ def: snape, id: 'snape', x: 1520, y: 1040, turn: -0.4, pose: 'sit', seat: 170, expr: 'smug', ...o });
const HP = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1000, y: 1180, s: 1.1, turn: 0, pose: 'sit', seat: 150, expr: 'cold', ...o });
// high-backed wooden chairs for McGonagall and Snape (x = chair centre, y = floor under the feet)
const CHAIR = (x, y = 1040) => () => g({}, path(`M${x - 88},${y - 150} L${x - 84},${y - 470} Q${x},${y - 540} ${x + 84},${y - 470} L${x + 88},${y - 150}Z`, { fill: '#3a2418', ...K.bl(2.2) }),
  path(`M${x - 60},${y - 200} L${x - 58},${y - 440} Q${x},${y - 490} ${x + 58},${y - 440} L${x + 60},${y - 200}Z`, { fill: '#6a2a3a', ...K.bl(1.4) }),
  rect(x - 104, y - 200, 208, 34, { fill: '#4a2e1b', ...K.bl(2), rx: 4 }), line(x - 90, y - 166, x - 94, y, { stroke: '#2a1a10', 'stroke-width': 14 }), line(x + 90, y - 166, x + 94, y, { stroke: '#2a1a10', 'stroke-width': 14 }));
const THRONE = () => CS.dumbledoreThrone(1000), DESK = () => CS.blackDesk(1000, 960), STOOL = () => CS.stoolFront(1000, 1200);
const ROOM = (o = {}) => [THRONE, DB(o.d), DESK, CHAIR(520), MG(o.m), CHAIR(1520), SN(o.s), ...(o.h === false ? [STOOL] : [HP(o.h)])];
// camera centred on an actor's head (world units): ON(actorSpec, width, dx, dy)
const HEAD = (a) => place(a.def, a).anchors.head;
const ON = (a, w, dx = 0, dy = 0) => { const [x, y] = HEAD(a); return { x: x + dx, y: y + dy, w }; };

ep.bleed(1000, { cam: { x: 1010, y: 655, w: 1240 }, bg: OF({}), actors: [...ROOM({ h: false }).filter((a) => a !== STOOL), () => g({ transform: 'translate(1010,1340) scale(1.3)' }, CS.stoolFront(0, 0))] },
  [cap('Minerva McGonagall waited in the Headmaster\'s office. Dumbledore behind his desk, in four layers of formal lavender robes. Severus in a chair opposite her. And facing the three of them, an empty wooden stool.', 44, 40, { w: 640, fixed: true }),
   cap('They were waiting for Harry Potter.', 330, 960, { anchor: 'bl', w: 440, fixed: true })], { alt: 'Dumbledore behind his desk; McGonagall and Snape in chairs either side; an empty stool facing them all.' });
ep.multi(1180, [
  { x: M, y: 18, w: 752, h: 470, mood: 'candle', art: { cam: ON(MG(), 660, 80, 40), bg: OF({}), blur: 2, actors: ROOM({ h: false, m: { expr: 'pained' } }) } },
  { x: M, y: 506, w: 752, h: 656, mood: 'sepia', art: { cam: ON(HP({ pose: 'fists', seat: undefined, y: 1160 }), 640, 0, 100), bg: OF({}), blur: 4, actors: [HP({ pose: 'fists', seat: undefined, y: 1160, expr: 'rant', turn: 0.15 })], over: (e) => FX.memoryEdge(e.w, e.h) } },
], [inner('McGonagall', '*Harry, you promised you wouldn\'t bite any teachers!*', 620, 170, { w: 250, fixed: true }),
   cap('And in her mind she could see, very clearly, his angry face and outraged reply:', 44, 524, { w: 560, fixed: true }),
   shout('Harry', '*I said I wouldn\'t bite anyone who didn\'t bite me FIRST!*', 400, 1112, { anchor: 'bc', size: 33, w: 440, fixed: true })]);
ep.panel(920, { cam: { x: 2130, y: 610, w: 820 }, bg: OF({ doorOpen: 0.7 }), actors: [SN(), { def: harryRaven, id: 'harry', x: 2330, y: 1000, s: 1.1, turn: -0.5, pose: 'walk', expr: 'cold' }], over: (e) => FX.frost(e.w, e.h, 0.3, 121) },
  [cap('The door swept open, and Harry Potter entered. Minerva almost gasped out loud. The boy looked cool, collected, and utterly in control of himself.', 44, 30, { w: 620, fixed: true }),
   cold('Harry', 'Good mor…', 390, 470, { anchor: 'bc', w: 220, fixed: true })], { mood: 'candle' });
// Fawkes on the golden perch, wings half-spread (the office draws no bird; we draw him bigger here)
const FAWKES = (k = 1.15) => () => g({ transform: `translate(700,372) scale(${k})` }, P2.phoenix(1, { fly: true }));
const EMBERS = (e, n = 16, seed = 5) => { const R = rng(seed); let o = ''; for (let i = 0; i < n; i++) { const x = R() * e.w, y = R() * e.h; o += circle(x, y, R.range(2, 5), { fill: '#ffd774', opacity: R.range(0.35, 0.8) }) + K.glow(x, y, 16, '#ffb24a', 0.35); } return o; };
ep.bleed(1000, { cam: { x: 700, y: 400, w: 800 }, bg: OF({ bird: 'none' }), actors: [() => K.glow(700, 330, 560, '#ffb24a', 0.55) + FX.burst(900, 900, 700, 330, { n: 30, inner: 230, col: '#ffcf75', op: 0.2 }), FAWKES(1.3)], over: (e) => EMBERS(e, 22) },
  [cap('Harry was staring at Fawkes. The phœnix fluttered his bright red-golden wings like the flickering of a flame, and dipped his head in a measured nod to the boy.', 44, 40, { w: 640, fixed: true })], { alt: 'On the golden perch where the chicken burned: a magnificent crimson-and-gold phoenix.' });
const HX = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1700, y: 1000, s: 1.1, turn: -0.3, expr: 'shock', ...o });
const DBW = DB({ expr: { base: 'smile', eyeR: { style: 'happy' }, brows: { raise: 0.6 } } });
ep.multi(1000, [
  { x: M, y: 18, w: 368, h: 440, mood: 'candle', art: { cam: ON(HX(), 330, 0, -30), bg: OF({}), blur: 3, actors: [HX()] } },
  { x: 408, y: 18, w: 368, h: 440, mood: 'candle', art: { cam: ON(DBW, 230, 0, -15), bg: OF({}), blur: 3, actors: [THRONE, DBW, DESK] } },
  { x: M, y: 476, w: 240, h: 506, mood: 'candle', art: { cam: ON(HX({ expr: 'horror' }), 210, 0, -20), bg: OF({}), blur: 3, actors: [HX({ expr: 'horror' })] } },
  { x: 280, y: 476, w: 240, h: 506, mood: 'candle', art: { cam: ON(HX({ expr: 'angry' }), 210, 0, -20), bg: OF({}), blur: 3, actors: [HX({ expr: 'angry' })] } },
  { x: 536, y: 476, w: 240, h: 506, mood: 'cold', art: { cam: ON(HX({ expr: 'cold' }), 210, 0, -20), bg: OF({}), blur: 3, actors: [HX({ expr: 'cold' })], over: (e) => FX.frost(e.w, e.h, 0.5, 123) } },
], [cap('Harry turned to stare at Dumbledore.', 44, 34, { w: 250, fixed: true }), cap('Dumbledore winked at him.', 428, 34, { w: 200, fixed: true }),
   cap('Fear.', 44, 492, { w: 100, fixed: true }), cap('Anger.', 300, 492, { w: 100, fixed: true }), cap('Then calm again.', 556, 492, { w: 170, fixed: true })],
  { alt: 'Harry stares. Dumbledore winks. Harry\'s face goes from fear, to anger, to cold calm.' });
ep.panel(620, { cam: ON(MG(), 520, 0, -40), bg: OF({}), blur: 3, actors: ROOM({ h: false, m: { expr: 'worried' } }) },
  [cap('Minerva felt she was missing something. A chill went down her spine. Something was not right here.', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
// Harry over-the-shoulder (foreground right, facing the desk) and Harry singles (the door wall behind him)
const HO = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1340, y: 1820, s: 2.6, turn: -0.7, pose: 'sit', seat: 150, expr: 'cold', ...o });
const OTS = (o = {}) => [THRONE, DB(o.d), DESK, CHAIR(520), MG(o.m), HO(o.h)];
const H1 = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1900, y: 1100, s: 1.1, turn: -0.25, pose: 'sit', seat: 150, expr: 'cold', ...o });
const SOLO = (o = {}) => [() => CS.stoolFront(1900, 1120), H1(o)];
ep.panel(1100, { cam: { x: 930, y: 640, w: 1000 }, bg: OF({}), actors: OTS({ h: { expr: 'cold' } }) },
  [say('Dumbledore', 'Please sit down. So, Harry. I\'ve heard one report of this morning from Professor Snape. Would you care to tell me what happened, in your own words?', 400, 44, { anchor: 'tc', w: 520, fixed: true })], { mood: 'candle', alt: 'Harry sits on the stool, facing the three of them.' });
ep.panel(1100, { cam: ON(H1(), 460, 0, 50), bg: OF({}), blur: 2, actors: SOLO({ expr: 'coldSmile' }), over: (e) => FX.frost(e.w, e.h, 0.35, 125) },
  [cold('Harry', 'It\'s not complicated. He tried bullying me the way he\'s been bullying every non-Slytherin in the school since the day Lucius foisted him off on you.', 400, 40, { anchor: 'tc', w: 520, fixed: true }),
   cold('Harry', 'As for the other details, I request a private conversation. A student reporting abuse from a professor can hardly be expected to speak frankly in front of that same professor, after all.', 400, 1018, { anchor: 'bc', w: 520, fixed: true })], { mood: 'cold' });
ep.multi(620, [
  { x: M, y: 150, w: 368, h: 452, mood: 'candle', art: { cam: ON(MG(), 330, 0, 30), bg: OF({}), blur: 3, actors: [CHAIR(520), MG({ expr: 'gasp' })] } },
  { x: 408, y: 150, w: 368, h: 452, mood: 'candle', art: { cam: ON(SN(), 330, 0, 30), bg: OF({}), blur: 3, actors: [CHAIR(1520), SN({ expr: 'laugh' })] } },
], [cap('This time Minerva couldn\'t stop herself from gasping out loud. Severus simply laughed.', 44, 30, { w: 620, fixed: true })]);
const D1 = (o = {}) => [THRONE, DB(o), DESK];
const HST = (o = {}) => H1({ pose: 'stand', seat: undefined, ...o });
ep.panel(1260, { cam: ON(DB(), 520, 0, -20), bg: OF({}), blur: 2, actors: D1({ expr: 'cold' }) },
  [say('Dumbledore', 'Mr Potter, one does not speak of a Hogwarts professor in such terms. You labour under a terrible misapprehension. Professor Severus Snape has my fullest confidence, and serves Hogwarts at my own behest. Not Lucius Malfoy\'s.', 400, 58, { anchor: 'tc', w: 530, fixed: true }),
   say('Dumbledore', 'The purpose of this meeting is to discuss how to discipline *you.*', 400, 1210, { anchor: 'bc', w: 460, fixed: true })], { mood: 'candle' });
ep.panel(900, { cam: ON(HST(), 480, 0, 10), bg: OF({}), blur: 2, actors: SOLO({ pose: 'stand', seat: undefined, expr: 'cold' }), over: (e) => FX.frost(e.w, e.h, 0.3, 127) },
  [cold('Harry', 'This man has terrorised your school for years. I spoke to students, and collected stories, to make sure there would be enough for a newspaper campaign to rally the parents against him.', 400, 58, { anchor: 'tc', w: 500, fixed: true })], { mood: 'cold' });
ep.panel(1100, { cam: ON(HST(), 420, 0, -100), bg: OF({}), blur: 3, actors: SOLO({ pose: 'fists', seat: undefined, expr: { base: 'angry', mouth: { type: 'scream', open: 0.6 } } }), over: (e) => FX.frost(e.w, e.h, 0.45, 128) },
  [shout('Harry', 'Some of the younger students cried while they told me. *I almost cried* when I heard them! *You allowed this abuser to run free? You did this to your students? Why?*', 400, 124, { anchor: 'tc', w: 400, size: 34, pad: 56, fixed: true })], { mood: 'cold' });
ep.panel(620, { cam: ON(MG(), 440, 0, -45), bg: OF({}), blur: 3, actors: [CHAIR(520), MG({ expr: 'teary' })] },
  [cap('Minerva swallowed a lump in her throat. She\'d thought that, sometimes. But somehow she\'d never quite…', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
ep.panel(1100, { cam: { x: 930, y: 640, w: 1000 }, bg: OF({}), actors: OTS({ d: { expr: 'stern', pose: 'lecture' }, h: { expr: 'cold' } }), over: (e) => FX.frost(e.w, e.h, 0.25, 129) },
  [say('Dumbledore', 'Mr Potter, this meeting is not about Professor Snape. Professor Snape has suggested, and I have agreed, that three full months of detention will be appropriate…', 400, 44, { anchor: 'tc', w: 520, fixed: true }),
   cold('Harry', 'Declined.', 610, 600, { anchor: 'bc', w: 180, fixed: true }),
   cap('Minerva was speechless.', 44, 1060, { anchor: 'bl', w: 300, fixed: true })], { mood: 'candle' });
ep.multi(1240, [
  { x: M, y: 18, w: 752, h: 542, mood: 'candle', art: { cam: ON(DB(), 400, 0, -30), bg: OF({}), blur: 3, actors: D1({ expr: 'angry' }), over: (e) => K.glow(e.w / 2, e.h * 0.6, 420, '#9bc4e8', 0.22) } },
  { x: M, y: 578, w: 752, h: 644, mood: 'cold', art: { cam: ON(H1(), 520, 0, -80), bg: OF({}), blur: 3, actors: SOLO({ expr: 'cold' }), over: (e) => FX.frost(e.w, e.h, 0.55, 130) } },
], [say('Dumbledore', 'This is not a request, Mr Potter. This is your punishme…', 400, 40, { anchor: 'tc', w: 460, fixed: true }),
   cold('Harry', 'You will explain to me why you allowed this man to hurt the children placed in your care. And if your explanation is not sufficient, then I will begin my newspaper campaign with *you* as the target.', 400, 614, { anchor: 'tc', w: 500, fixed: true })],
  { alt: 'The full, entire force of the old wizard\'s gaze, turned on the boy.' });
ep.panel(800, { cam: { x: 1020, y: 590, w: 1260 }, bg: OF({}), actors: ROOM({ h: false, m: { expr: 'horror', lean: -9 }, s: { expr: 'shock' } }).filter((a) => a !== STOOL) },
  [cap('Minerva\'s body swayed with the force of that blow, with the sheer raw *lèse-majesté.* Even Severus looked shocked.', 44, 764, { anchor: 'bl', w: 620, fixed: true })], { mood: 'candle' });
// reverse over-the-shoulder: Harry foreground left, facing Dumbledore and Snape
const OTS2 = (o = {}) => [THRONE, DB(o.d), DESK, CHAIR(1520), SN(o.s), HO({ x: 660, turn: 0.7, ...(o.h || {}) })];
ep.multi(1320, [
  { x: M, y: 18, w: 752, h: 740, mood: 'candle', art: { cam: ON(DB(), 440, 0, -150), bg: OF({}), blur: 2, actors: D1({ expr: 'cold' }) } },
  { x: M, y: 776, w: 752, h: 526, mood: 'candle', art: { cam: { x: 1060, y: 700, w: 1080 }, bg: OF({}), actors: OTS2({ s: { expr: 'smug' }, h: { expr: 'cold', y: 1720 } }), over: (e) => FX.frost(e.w, e.h, 0.3, 131) } },
], [say('Dumbledore', 'That, Harry, would be most extremely unwise. I am the primary piece opposing Lucius on the game board. For you to do such a thing would strengthen him greatly, and I did not think that was your chosen side.', 400, 56, { anchor: 'tc', w: 530, fixed: true }),
   cold('Harry', 'This conversation grows private. Send him away.', 250, 1040, { anchor: 'bc', w: 340, fixed: true })]);
ep.panel(1200, { cam: ON(HST(), 440, 0, 125), bg: OF({}), blur: 2, actors: SOLO({ pose: 'fists', seat: undefined, expr: { base: 'angry', mouth: { type: 'scream', open: 0.7 } } }) },
  [say('Dumbledore', 'Harry, did I not tell you that Severus Snape has my fullest confidence?', 400, 40, { anchor: 'tc', w: 460, fixed: true, noTail: true }),
   shout('Harry', 'This man\'s bullying makes you *vulnerable!* I am not the only one who could start a newspaper campaign against you! This is insane! Why are you doing this?', 400, 1100, { anchor: 'bc', w: 420, size: 34, pad: 56, fixed: true })], { mood: 'candle' });
ep.multi(1180, [
  { x: M, y: 18, w: 752, h: 460, mood: 'candle', art: { cam: ON(DB(), 400, 0, -10), bg: OF({}), blur: 2, actors: D1({ expr: 'sad' }) } },
  { x: M, y: 496, w: 752, h: 666, mood: 'cold', art: { cam: ON(H1(), 500, 0, -120), bg: OF({}), blur: 3, actors: SOLO({ expr: 'cold' }), over: (e) => FX.frost(e.w, e.h, 0.4, 132) } },
], [say('Dumbledore', 'I\'m sorry, Harry. It has to do with things that you are not, at this time, ready to hear.', 400, 40, { anchor: 'tc', w: 440, fixed: true }),
   cold('Harry', 'It *is* insanity. You haven\'t reined him in because you think he\'s *part of the pattern.* That Hogwarts needs an evil Potions Master to be a proper magical school. Just as it needs a ghost to teach History.', 400, 520, { anchor: 'tc', w: 500, fixed: true })]);
ep.panel(700, { cam: ON(DB(), 380, 0, -55), bg: OF({}), blur: 3, actors: D1({ expr: { base: 'warm', brows: { raise: 0.7 } } }) },
  [say('Dumbledore', 'That does sound like the sort of thing I would do, doesn\'t it?', 400, 40, { anchor: 'tc', w: 440, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: ON(HST(), 500, 0, -20), bg: OF({}), blur: 2, actors: SOLO({ pose: 'stand', seat: undefined, expr: 'cold' }), over: (e) => FX.frost(e.w, e.h, 0.4, 133) },
  [cold('Harry', 'Unacceptable. I will not tolerate bullying or abuse. I had considered many possible ways of dealing with this problem. But I will make it simple.', 400, 40, { anchor: 'tc', w: 520, fixed: true })], { mood: 'cold' });
ep.bleed(900, { cam: ON(HST(), 250, 0, 40), bg: OF({}), blur: 4, actors: SOLO({ pose: 'stand', seat: undefined, expr: { base: 'cold', eyes: { open: 0.5 } } }), over: (e) => FX.frost(e.w, e.h, 0.8, 134) },
  [cold('Harry', 'Either this man goes, or I do.', 400, 850, { anchor: 'bc', w: 420, size: 40, fixed: true })], { mood: 'cold', alt: 'Harry, ice-cold, levels his ultimatum.' });
ep.panel(460, { cam: ON(SN(), 250, 0, 20), bg: OF({}), blur: 3, actors: [CHAIR(1520), SN({ expr: { base: 'neutral', eyes: { open: 1.05, lookX: 0.5 }, brows: { raise: 0.35 } } })], over: (e) => K.glow(e.w * 0.5, e.h * 0.55, 160, '#e9e2c0', 0.18) },
  [cap('Something strange flickered in Severus\'s eyes.', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
ep.panel(1100, { cam: ON(DB(), 460, 0, -120), bg: OF({}), blur: 2, actors: D1({ expr: 'cold' }) },
  [say('Dumbledore', 'Expulsion, Mr Potter, is the final threat which may be used against a student. It is not customarily used as a threat by students against the Headmaster. This is the best magical school in the entire world. Are you under the impression that Hogwarts cannot get along without you?', 400, 66, { anchor: 'tc', w: 520, fixed: true })], { mood: 'candle' });
ep.panel(1000, { cam: ON(H1(), 460, 0, 30), bg: OF({}), blur: 2, actors: SOLO({ expr: 'coldSmile' }), over: (e) => FX.frost(e.w, e.h, 0.4, 133) },
  [cap('Harry sat there, smiling thinly. Sudden horror dawned on Minerva. Surely he wouldn\'t…', 44, 30, { w: 620, fixed: true }),
   cold('Harry', 'You forget that you\'re not the only one who can see patterns. *This grows private. Now send him…*', 400, 950, { anchor: 'bc', w: 500, fixed: true })], { mood: 'cold' });
ep.panel(560, { cam: ON(H1(), 250, 0, 20), bg: OF({}), blur: 3, actors: SOLO({ expr: { base: 'shock', mouth: { type: 'line', curve: 0, w: 0.6 } } }) },
  [cap('Minerva could see it on his face: the moment when he remembered. She\'d told him, after all.', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
ep.multi(1200, [
  { x: M, y: 18, w: 752, h: 440, mood: 'candle', art: { cam: ON(DB(), 380, 0, -20), bg: OF({}), blur: 2, actors: D1({ expr: 'stern' }) } },
  { x: M, y: 476, w: 752, h: 706, mood: 'cold', art: { cam: ON(H1(), 280, 0, -40), bg: OF({}), blur: 4, actors: SOLO({ expr: { base: 'cold', eyes: { lookY: 0.2 } } }), over: (e) => FX.frost(e.w, e.h, 0.5, 135) } },
], [say('Dumbledore', 'Mr Potter. Once again, Severus Snape has my fullest confidence.', 400, 36, { anchor: 'tc', w: 460, fixed: true }),
   whisper('Harry', 'You told him. You utter fool.', 400, 520, { anchor: 'tc', w: 400, size: 30, fixed: true })]);
ep.panel(760, { cam: { x: 1060, y: 700, w: 1080 }, bg: OF({}), actors: OTS2({ s: { expr: 'stern' }, h: { expr: 'cold', y: 1720 } }), over: (e) => FX.frost(e.w, e.h, 0.35, 136) },
  [cold('Harry', 'That the Dark Lord is alive.', 230, 420, { anchor: 'bc', w: 300, fixed: true })], { mood: 'candle', alt: 'Harry turns his cold gaze on Snape.' });
const SNU = (o = {}) => SN({ pose: 'stand', seat: undefined, ...o });
ep.panel(980, { cam: ON(SNU(), 420, 0, 60), bg: OF({}), blur: 2, actors: [CHAIR(1520), SNU({ pose: 'fists', expr: { base: 'angry', mouth: { type: 'scream', open: 0.7 }, eyes: { open: 1.1 } } })] },
  [shout('Snape', '*What in Merlin\'s name are you on about, Potter?*', 400, 82, { anchor: 'tc', w: 440, size: 35, fixed: true }),
   cold('Harry', 'Oh, so we *are* a Slytherin, then. I was starting to wonder.', 400, 930, { anchor: 'bc', w: 400, fixed: true, noTail: true })], { mood: 'candle', alt: 'Snape, in tones of sheer astonishment and outrage.' });
ep.panel(640, { cam: { x: 1000, y: 700, w: 1500 }, bg: OF({}), actors: ROOM({ d: { expr: 'stern' }, m: { expr: 'sad' }, s: { expr: 'cold' }, h: false }).filter((a) => a !== STOOL).concat([HO({ expr: 'cold', y: 1700 })]) },
  [cap('And then there was silence.', 44, 30, { w: 360, fixed: true })], { mood: 'candle', alt: 'The four of them, very still.' });
ep.panel(660, { cam: ON(MG(), 380, 20, -10), bg: OF({}), blur: 3, actors: [CHAIR(520), MG({ expr: { base: 'sad', eyes: { lookY: 0.7, open: 0.5 } }, headTilt: 10 })] },
  [whisper('McGonagall', 'I\'m sorry, Albus.', 560, 90, { anchor: 'tc', w: 260, size: 30, fixed: true })], { mood: 'candle' });
ep.panel(940, { cam: ON(H1(), 460, 0, 60), bg: OF({}), blur: 2, actors: SOLO({ expr: 'neutral', pose: 'gesture', turn: -0.4 }) },
  [say('Harry', 'Professor McGonagall didn\'t tell me. I guessed. She controlled her reaction, just as Severus did, but her control fell a shade short of perfection.', 400, 56, { anchor: 'tc', w: 490, fixed: true })], { mood: 'candle' });
ep.multi(620, [
  { x: M, y: 18, w: 368, h: 584, mood: 'candle', art: { cam: ON(MG(), 270, 0, -60), bg: OF({}), blur: 3, actors: [CHAIR(520), MG({ expr: { base: 'stern', eyes: { lookX: 0.6 } }, headTilt: -6 })] } },
  { x: 408, y: 18, w: 368, h: 584, mood: 'candle', art: { cam: ON(SN(), 270, 0, -60), bg: OF({}), blur: 3, actors: [CHAIR(1520), SN({ expr: { base: 'cross', eyes: { lookX: -0.8, open: 0.55 } }, turn: -0.6 })] } },
], [say('McGonagall', 'And I told him that you, and I, and Severus were the only ones who knew.', 208, 52, { anchor: 'tc', w: 270, fixed: true })],
  { alt: 'Severus gives her a look of utter contempt. Minerva raises her chin and bears it.' });
ep.panel(1000, { cam: { x: 930, y: 640, w: 1000 }, bg: OF({}), actors: OTS({ d: { expr: 'calm' }, m: { expr: 'sad' }, h: { expr: 'calm' } }) },
  [say('Harry', 'Which she did to stop me going around asking questions. Threat\'s still on the table, and I do expect to be briefed *fully* at some point.', 500, 60, { anchor: 'tc', w: 420, fixed: true })], { mood: 'candle' });
ep.multi(1340, [
  { x: M, y: 18, w: 752, h: 500, mood: 'candle', art: { cam: ON(DB(), 400, 0, -45), bg: OF({}), blur: 2, actors: D1({ expr: { base: 'cold', cold: false } }), over: (e) => K.glow(e.w / 2, e.h * 0.55, 380, '#9bc4e8', 0.25) } },
  { x: M, y: 536, w: 752, h: 786, mood: 'cold', art: { cam: ON(HST(), 420, 0, -130), bg: OF({}), blur: 2, actors: SOLO({ pose: 'stand', seat: undefined, expr: 'cold' }), over: (e) => FX.frost(e.w, e.h, 0.4, 137) } },
], [say('Dumbledore', 'And you threaten to abandon us to Voldemort if we do not comply with your wishes.', 400, 40, { anchor: 'tc', w: 460, fixed: true }),
   cold('Harry', 'I regret to inform you that you are not the centre of the universe. I\'m not threatening to walk out on magical Britain. I\'m threatening to walk out on *you.* I am not a meek little Frodo. This is *my* quest, and if you want in, you will play by *my* rules.', 400, 572, { anchor: 'tc', w: 500, fixed: true })],
  { alt: 'Dumbledore\'s eyes, as cold as they have been since the day his brother died.' });
ep.panel(560, { cam: ON(DB(), 360, 0, -25), bg: OF({}), blur: 2, actors: D1({ expr: 'cold' }) },
  [say('Dumbledore', 'I am beginning to doubt your suitability as the hero, Mr Potter.', 400, 36, { anchor: 'tc', w: 460, fixed: true })], { mood: 'candle' });
ep.panel(1200, { cam: ON(HST(), 380, 0, 30), bg: OF({}), blur: 3, actors: SOLO({ pose: 'stand', seat: undefined, expr: 'coldSmile' }), over: (e) => FX.frost(e.w, e.h, 0.55, 138) },
  [cold('Harry', 'I am beginning to doubt your suitability as my Gandalf, *Mr* Dumbledore. Boromir was at least a plausible mistake.', 400, 44, { anchor: 'tc', w: 480, fixed: true }),
   cold('Harry', 'What is this *Nazgûl* doing in my Fellowship?', 400, 1150, { anchor: 'bc', w: 420, size: 38, fixed: true })], { mood: 'cold' });
ep.panel(780, { cam: ON(SN({ turn: 0.5 }), 300, 0, -35), bg: OF({}), blur: 3, actors: [CHAIR(1520), SN({ expr: { base: 'smile', eyes: { lookX: 0.6 } }, turn: 0.5 })] },
  [cap('Minerva was completely lost. She looked at Severus, to see if he was following this. Severus had turned his face away from Harry\'s field of vision. And he was smiling.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'Snape, face turned away from Harry, smiling.' });
ep.panel(980, { cam: ON(DB(), 440, 0, -130), bg: OF({}), blur: 2, actors: D1({ expr: 'calm' }) },
  [say('Dumbledore', 'I suppose that from your perspective it is a reasonable question. So, Mr Potter: if Professor Snape is to leave you alone henceforth, will that be the last time this issue arises?', 400, 58, { anchor: 'tc', w: 520, fixed: true })], { mood: 'candle' });
const HURT = { base: 'angry', eyes: { teary: true, open: 1 }, mouth: { type: 'scream', open: 0.7 } };
ep.panel(760, { cam: ON(HST(), 440, 0, -70), bg: OF({}), blur: 2, actors: SOLO({ pose: 'fists', seat: undefined, expr: { base: 'angry', mouth: { type: 'scream', open: 0.6 } } }) },
  [shout('Harry', 'Leave *me* alone? I am not his only victim, and certainly not the most vulnerable!', 400, 80, { anchor: 'tc', w: 420, size: 34, pad: 50, fixed: true })], { mood: 'candle' });
ep.panel(1240, { cam: ON(HST(), 400, 0, 20), bg: OF({}), blur: 3, actors: SOLO({ pose: 'fists', seat: undefined, expr: HURT }) },
  [shout('Harry', '*Have you forgotten how defenceless children are? How much they hurt?*', 400, 80, { anchor: 'tc', w: 420, size: 36, pad: 50, fixed: true }),
   shout('Harry', 'Henceforth Severus will treat *every* student with professional courtesy, or you will find another Potions Master, or another hero!', 400, 1160, { anchor: 'bc', w: 420, size: 32, pad: 50, fixed: true })], { mood: 'candle' });
const DLAUGH = (o = {}) => DB({ expr: 'laugh', headTilt: -8, ...o });
ep.multi(1140, [
  { x: 0, y: 0, w: 800, h: 720, border: 'bleed', art: { cam: ON(DLAUGH(), 480, 40, 20), bg: OF({}), actors: [THRONE, DLAUGH(), DESK], over: (e) => K.glow(e.w / 2, e.h * 0.5, 380, '#ffcf75', 0.3) + FX.emanata(e.w / 2, e.h * 0.5, 230, { n: 10 }) } },
  { x: M, y: 740, w: 752, h: 382, mood: 'cold', art: { cam: ON(H1(), 440, 146, 20), bg: OF({}), blur: 3, actors: SOLO({ expr: 'cold' }), over: (e) => FX.frost(e.w, e.h, 0.4, 139) } },
], [cap('Dumbledore started laughing. Full-throated, warm, humorous laughter, as if Harry had just performed a comic dance.', 44, 40, { w: 620, fixed: true }),
   cold('Harry', 'You mistake me, Headmaster, if you think that this is a joke. This is not a request. This is your *punishment.*', 540, 776, { anchor: 'tc', w: 330, fixed: true })],
  { alt: 'Dumbledore, laughing.' });
ep.panel(1260, { cam: ON(DB(), 560, 0, -190), bg: OF({}), blur: 2, actors: D1({ expr: 'laugh', headTilt: -6, armF: { sh: 20, el: 70, hand: 'fist' } }), over: (e) => FX.emanata(e.w * 0.46, e.h * 0.8, 90, { n: 7 }) },
  [shout('Dumbledore', 'Oh, indeed, in very deed, this is my punishment if ever there was one!', 330, 96, { anchor: 'tc', w: 330, size: 32, pad: 50, fixed: true, noTail: true }),
   shout('Dumbledore', 'Of *course* you\'re in here blackmailing me to save your fellow students, not to save yourself! I can\'t imagine why I would have thought otherwise!', 420, 380, { anchor: 'tc', w: 420, size: 30, pad: 56, fixed: true }),
   cap('He pounded his fist on the desk three times.', 44, 1210, { anchor: 'bl', w: 480, fixed: true })], { mood: 'candle' });
ep.multi(1000, [
  { x: M, y: 18, w: 752, h: 460, mood: 'candle', art: { cam: ON(H1({ turn: -0.7 }), 400, 90, -30), bg: OF({}), blur: 3, actors: SOLO({ expr: 'confused', turn: -0.7 }) } },
  { x: M, y: 496, w: 752, h: 486, mood: 'candle', art: { cam: ON(DB(), 440, -110, -60), bg: OF({}), blur: 3, actors: D1({ expr: 'happy' }) } },
], [say('Harry', 'Excuse me. Does he need to take his medication or something?', 520, 70, { anchor: 'tc', w: 300, fixed: true }),
   say('Dumbledore', 'Well. Pardon me. I\'m sorry for the interruption. *Please* continue with the blackmail.', 260, 560, { anchor: 'tc', w: 320, fixed: true })]);
ep.panel(1000, { cam: { x: 870, y: 640, w: 1000 }, bg: OF({}), actors: OTS({ d: { expr: 'happy' }, m: { expr: 'blank' }, h: { x: 1250, expr: 'neutral' } }) },
  [say('Harry', 'Ah… he\'s also to stop reading students\' minds.', 500, 40, { anchor: 'tc', w: 380, fixed: true })], { mood: 'candle' });
ep.multi(1020, [
  { x: M, y: 18, w: 752, h: 440, mood: 'candle', art: { cam: ON(SNU(), 480, 60, -40), bg: OF({}), blur: 2, actors: [CHAIR(1520), SNU({ pose: 'point', turn: -0.6, expr: 'angry' })] } },
  { x: M, y: 476, w: 752, h: 526, mood: 'candle', art: { cam: ON(H1(), 420, -60, -50), bg: OF({}), blur: 2, actors: SOLO({ expr: 'neutral' }) } },
], [say('Snape', 'Minerva, you…', 250, 60, { anchor: 'tc', w: 260, fixed: true }),
   say('Harry', 'Sorting Hat warned me. Can\'t say anything else. Anyway, I think that\'s it. I\'m done.', 250, 510, { anchor: 'tc', w: 300, fixed: true })]);
ep.multi(1480, [
  { x: M, y: 18, w: 752, h: 320, mood: 'candle', art: { cam: ON(MG(), 330, -90, -10), bg: OF({}), blur: 3, actors: [CHAIR(520), MG({ expr: 'worried' })] } },
  { x: M, y: 356, w: 752, h: 620, mood: 'candle', art: { cam: ON(DB(), 380, 0, -70), bg: OF({}), blur: 3, actors: D1({ expr: { base: 'bigGrin' } }), over: (e) => K.glow(e.w / 2, e.h * 0.6, 360, '#ffcf75', 0.3) } },
  { x: M, y: 994, w: 752, h: 466, mood: 'candle', art: { cam: { x: 1000, y: 820, w: 1450 }, bg: OF({}), actors: ROOM({ d: { expr: 'bigGrin' }, m: { expr: 'shock' }, s: { expr: 'shock' }, h: false }).filter((a) => a !== STOOL).concat([HO({ expr: 'shock', y: 1700 })]) } },
], [say('McGonagall', 'Now what?', 180, 70, { anchor: 'tc', w: 200, fixed: true }),
   say('Dumbledore', 'Now what? Why, now the hero wins, of course.', 400, 380, { anchor: 'tc', w: 400, fixed: true }),
   shout('All three', '*What?*', 620, 1016, { anchor: 'tc', w: 200, fixed: true, noTail: true })]);
ep.panel(1340, { cam: ON(DB(), 520, 0, -30), bg: OF({}), blur: 2, actors: D1({ expr: 'happy', pose: 'present' }) },
  [say('Dumbledore', 'He certainly seems to have backed us into a corner. But Hogwarts *does* need an evil Potions Master, or it just wouldn\'t be a proper magical school. So how about if Professor Snape is only awful to students in their *fifth year and higher?*', 400, 64, { anchor: 'tc', w: 520, fixed: true }),
   say('Dumbledore', 'To the others he will be scary, but not abusive. He will read minds only when a student\'s safety requires it. Hogwarts will have its evil Potions Master, and the most vulnerable victims, as you put it, will be safe.', 400, 1270, { anchor: 'bc', w: 520, fixed: true })], { mood: 'candle' });
ep.multi(960, [
  { x: M, y: 18, w: 368, h: 420, mood: 'candle', art: { cam: ON(H1(), 300, 0, -70), bg: OF({}), blur: 3, actors: SOLO({ expr: 'confused' }) } },
  { x: 408, y: 18, w: 368, h: 420, mood: 'candle', art: { cam: ON(SN(), 300, 0, -70), bg: OF({}), blur: 3, actors: [CHAIR(1520), SN({ expr: 'blank' })] } },
  { x: M, y: 456, w: 368, h: 486, mood: 'candle', art: { cam: ON(SNU(), 340, 0, -45), bg: OF({}), blur: 3, actors: [CHAIR(1520), SNU({ pose: 'fists', expr: { base: 'angry', mouth: { type: 'scream', open: 0.8 } } })] } },
  { x: 408, y: 456, w: 368, h: 486, mood: 'candle', art: { cam: ON(DLAUGH(), 380, 0, -35), bg: OF({}), blur: 3, actors: [THRONE, DLAUGH({ headTilt: -10 }), DESK], over: (e) => FX.emanata(e.w / 2, e.h * 0.62, 150, { n: 8 }) } },
], [say('Harry', 'I suppose that is acceptable.', 208, 40, { anchor: 'tc', w: 230, fixed: true }),
   say('Snape', 'You can\'t be serious.', 592, 40, { anchor: 'tc', w: 230, fixed: true }),
   shout('Snape', 'This is *insanity!*', 208, 490, { anchor: 'tc', w: 200, size: 34, fixed: true }),
   shout('Dumbledore', 'Bwah ha ha!', 592, 490, { anchor: 'tc', w: 200, size: 34, fixed: true })]);
ep.multi(1000, [
  { x: M, y: 18, w: 752, h: 340, mood: 'candle', art: { cam: ON(H1(), 380, 110, -10), bg: OF({}), blur: 3, actors: SOLO({ expr: 'neutral' }) } },
  { x: M, y: 376, w: 752, h: 606, mood: 'candle', art: { cam: ON(MG(), 460, 120, -40), bg: OF({}), blur: 2, actors: [CHAIR(520), MG({ expr: 'stern', pose: 'lecture' })] } },
], [say('Harry', 'And the points he took from Ravenclaw?', 540, 80, { anchor: 'tc', w: 300, fixed: true }),
   say('McGonagall', 'They must not be given back. I\'m sorry, Mr Potter. There *must* be some consequences for your misbehaviour, or this school will fall to pieces.', 530, 418, { anchor: 'tc', w: 340, fixed: true })]);
ep.panel(940, { cam: ON(H1(), 460, 0, -120), bg: OF({}), blur: 2, actors: SOLO({ expr: 'neutral' }) },
  [say('Harry', 'Acceptable. But Severus will not strike at my House by taking points from me, nor waste my time with detentions. If my behaviour requires correction, he may communicate his concerns to Professor McGonagall.', 400, 60, { anchor: 'tc', w: 520, fixed: true })], { mood: 'candle' });
ep.multi(1260, [
  { x: M, y: 18, w: 752, h: 460, mood: 'candle', art: { cam: ON(MG(), 420, 120, -40), bg: OF({}), blur: 2, actors: [CHAIR(520), MG({ expr: 'stern' })] } },
  { x: M, y: 496, w: 752, h: 746, mood: 'candle', art: { cam: ON(H1(), 440, 0, 100), bg: OF({}), blur: 2, actors: SOLO({ expr: { base: 'calm', eyes: { soft: true } } }), over: (e) => K.glow(e.w * 0.5, e.h * 0.4, 200, '#ffcf75', 0.18) } },
], [say('McGonagall', 'Harry. Will you continue to submit to school discipline? Or are you to be above the law now, as Severus was?', 530, 50, { anchor: 'tc', w: 340, fixed: true }),
   cap('Something warm touched his gaze, briefly, before it was quashed.', 44, 514, { w: 560, fixed: true }),
   say('Harry', 'I will continue to be an ordinary student to every member of staff who is not insane or evil. Leave Minerva alone, and I\'ll be a regular Hogwarts student in her presence. No special privileges.', 400, 1196, { anchor: 'bc', w: 500, fixed: true })]);
ep.multi(1300, [
  { x: M, y: 18, w: 752, h: 460, mood: 'candle', art: { cam: ON(MG(), 420, 120, -40), bg: OF({}), blur: 2, actors: [CHAIR(520), MG({ expr: 'stern', pose: 'gesture' })] } },
  { x: M, y: 496, w: 752, h: 786, mood: 'candle', art: { cam: ON(H1(), 440, 0, -120), bg: OF({}), blur: 2, actors: SOLO({ expr: 'suspicious' }) } },
], [say('McGonagall', 'And Mr Potter must publicly apologise for his actions today. The discipline of the school has been gravely injured, and it must be restored.', 530, 56, { anchor: 'tc', w: 340, fixed: true }),
   say('Harry', 'The first and last resort is the truth. The truth is that I shouldn\'t have got angry, and I set a bad example. The truth is *also* that Severus Snape behaved in a fashion unbecoming a Hogwarts professor. The two of us could both get up and speak the truth. I could live with that.', 400, 552, { anchor: 'tc', w: 520, fixed: true })]);
ep.multi(1060, [
  { x: M, y: 18, w: 368, h: 500, mood: 'candle', art: { cam: ON(SNU(), 290, 0, -60), bg: OF({}), blur: 3, actors: [CHAIR(1520), SNU({ pose: 'fists', expr: { base: 'angry', mouth: { type: 'scream', open: 0.6 } } })] } },
  { x: 408, y: 18, w: 368, h: 500, mood: 'candle', art: { cam: ON(DB(), 340, 0, -110), bg: OF({}), blur: 3, actors: D1({ expr: 'smile' }) } },
  { x: M, y: 536, w: 368, h: 506, mood: 'candle', art: { cam: ON(H1(), 270, 0, -80), bg: OF({}), blur: 3, actors: SOLO({ expr: 'shock' }) } },
  { x: 408, y: 536, w: 368, h: 506, mood: 'candle', art: { cam: ON(DB(), 340, 0, -110), bg: OF({}), blur: 3, actors: D1({ expr: { base: 'smile', eyes: { lookX: 0.4 } } }) } },
], [shout('Snape', 'In your *dreams*, Potter!', 208, 66, { anchor: 'tc', w: 200, size: 33, fixed: true }),
   say('Dumbledore', 'Minerva is thinking that you\'re righter than you have any right to be.', 592, 54, { anchor: 'tc', w: 230, fixed: true }),
   shout('Harry', 'Are *you* reading *her* mind?', 208, 584, { anchor: 'tc', w: 200, size: 33, fixed: true }),
   say('Dumbledore', 'Common sense is often mistaken for Legilimency.', 592, 566, { anchor: 'tc', w: 230, fixed: true })]);
ep.panel(1200, { cam: { x: 870, y: 340, w: 800 }, bg: OF({ bird: 'none' }), blur: 2, actors: [THRONE, DB({ expr: 'calm', pose: 'present' }), DESK, () => g({ transform: 'translate(700,340) scale(0.8)' }, P2.phoenix(1, { fly: true }))] },
  [say('Dumbledore', 'I shall talk this over with Severus. No apology will be required from you unless he apologises as well. Although, Harry, Minerva wishes to speak with you about an additional matter. That is not the result of any pressure on my part. Fawkes, accompany her, please.', 400, 58, { anchor: 'tc', w: 530, fixed: true })], { mood: 'candle', alt: 'Fawkes spreads his wings on the perch.' });

// ---------------------------------------------------------------- the stairs
// the spiral stair: a round stone shaft, a helix of steps climbing away behind them, a central newel
const STAIR = () => {
  let o = K.stoneWall(-600, -700, 3200, 2200, '#6e6270', 263, { bh: 58 }) + rect(-600, -700, 3200, 2200, { fill: '#1a1024', opacity: 0.3 });
  // steps spiralling up and away behind them (each: tread + darker riser)
  for (let k = 8; k >= 1; k--) { const x = 1250 - k * 120, y = 1000 - k * 95; o += path(`M${x - 190},${y} L${x + 150},${y} L${x + 130},${y + 30} L${x - 170},${y + 30}Z`, { fill: '#9a8a76', ...K.bl(2) }) + path(`M${x - 170},${y + 30} L${x + 130},${y + 30} L${x + 130},${y + 95} L${x - 170},${y + 95}Z`, { fill: '#5e5046', ...K.bl(2) }); }
  // the central newel
  o += rect(430, -700, 150, 2200, { fill: '#5a5060', ...K.bl(2.2) }) + rect(460, -700, 30, 2200, { fill: '#7a7080', opacity: 0.6 });
  o += path('M560,1000 L1500,1000 L1470,1040 L590,1040Z', { fill: '#9a8a76', ...K.bl(2.2) }) + rect(590, 1040, 880, 400, { fill: '#4a3e38', ...K.bl(2) });
  return o + K.glow(900, 520, 800, '#ffb24a', 0.28);
};
const HSTEP = (x = 1080, y = 930) => () => path(`M${x - 130},${y} L${x + 170},${y} L${x + 160},${y + 26} L${x - 120},${y + 26}Z`, { fill: '#9a8a76', ...K.bl(2) }) + rect(x - 120, y + 26, 280, 44, { fill: '#5e5046', ...K.bl(2) });
const PHOENIX_ON = (id, k = 0.5) => (e) => { const a = e.wa[id]; return a ? g({ transform: `translate(${a.head[0] + a.hr * 1.25},${a.head[1] + a.hr * 1.2}) scale(${k})` }, P2.phoenix(1, { glow: true })) : ''; };
const NOTES = (n = 18, seed = 3) => (e) => { const R = rng(seed); let o = ''; for (let i = 0; i < n; i++) { const x = R() * e.w, y = R() * e.h; o += K.glow(x, y - 10, 34, '#ffcf75', 0.45) + text(x, y, R.pick(['♪', '♫', '♩']), { 'font-size': R.range(26, 46), fill: '#ffd774', opacity: R.range(0.5, 0.9) }); } return o; };
const MGS = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 900, y: 1000, turn: 0.3, pose: 'stand', expr: 'calm', ...o });
const HGS = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1080, y: 930, s: 1.1, turn: -0.2, pose: 'stand', expr: 'blank', ...o });
ep.bleed(1160, { cam: { x: 1000, y: 610, w: 820 }, bg: STAIR, actors: [HSTEP(), HGS(), MGS({ expr: { base: 'calm', eyes: { soft: true } } }), PHOENIX_ON('mcgonagall', 0.6)], over: NOTES(10, 4) },
  [cap('They stood on the rotating stairs, descending in silence. Minerva didn\'t know what to say. She didn\'t know this person who stood beside her.', 44, 40, { w: 640, fixed: true }),
   capC('And Fawkes began to croon.', 400, 1090, { anchor: 'bc', w: 360, fixed: true })], { alt: 'McGonagall and Harry ride the spiral stairs down. The phoenix on her shoulder begins to sing: warm, firelit light.' });
ep.multi(1360, [
  { x: M, y: 18, w: 752, h: 600, mood: 'candle', art: { cam: ON(MGS(), 460, 120, -10), bg: STAIR, blur: 2, actors: [MGS({ expr: { base: 'calm', eyes: { soft: true, lookX: 0.6 } } }), PHOENIX_ON('mcgonagall', 0.75)], over: (e) => K.glow(e.w * 0.62, e.h * 0.55, 330, '#ffb24a', 0.45) + NOTES(16, 5)(e) } },
  { x: M, y: 636, w: 752, h: 706, mood: 'candle', art: { cam: ON(HGS(), 380, 0, 50), bg: STAIR, blur: 3, actors: [HSTEP(), HGS({ expr: { base: 'teary', eyes: { lookX: -0.6, lookY: -0.3 } }, turn: -0.3 })], over: NOTES(10, 6) } },
], [cap('It was tender, and soft, like a fireplace would sound if it had melody. It washed over the mind, easing, soothing, gentling what it touched.', 44, 34, { w: 620, fixed: true }),
   whisper('Harry', '*What* is *that?*', 560, 680, { anchor: 'tc', w: 240, fixed: true }),
   say('McGonagall', 'The song of the phœnix. It, too, heals.', 400, 1322, { anchor: 'bc', w: 360, fixed: true, noTail: true })],
  { alt: 'Fawkes, glowing, sings on McGonagall\'s shoulder.' });
ep.panel(940, { cam: { x: 990, y: 700, w: 540 }, bg: STAIR, actors: [HSTEP(), HGS({ expr: 'cry', turn: 0.8, armF: { sh: -70, el: 0, hand: 'open' } }), MGS({ expr: { base: 'sad', eyes: { lookX: 0.7 } }, armB: { sh: 10, el: 5, hand: 'hold' } }), PHOENIX_ON('mcgonagall')], over: NOTES(8, 7) },
  [cap('Harry turned his face away from her, but she caught a glimpse of something agonised. By the time they stepped out, she was holding his hand firmly in hers.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'Harry, face turned away, crying; her hand holds his.' });
const GAR = () => CS.gargoyleCorridor({});
const MGC = (o = {}) => MGS({ x: 760, y: 1000, turn: 0.4, ...o });
const HGC = (o = {}) => HGS({ x: 1020, y: 1000, turn: 0.5, ...o });
const FLY = (x = 1330, y = 600, k = 0.8) => () => K.glow(x, y - 40, 300, '#ffb24a', 0.5) + g({ transform: `translate(${x},${y}) scale(${k})` }, P2.phoenix(1, { fly: true }));
ep.bleed(1000, { cam: { x: 1190, y: 720, w: 620 }, bg: GAR, actors: [MGC({ expr: 'sad' }), HGC({ expr: { base: 'teary', eyes: { lookX: 0.6, lookY: -0.2 } } }), FLY(1350, 620, 0.9)], over: EMBERS },
  [whisper('Harry', 'What am I to do, Fawkes? I couldn\'t have protected them if I hadn\'t been angry.', 400, 960, { anchor: 'bc', w: 460, size: 29, fixed: true })], { alt: 'Fawkes hovers in front of Harry, wings beating. Harry stares at him like someone hypnotised by firelight.' });
ep.panel(900, { cam: { x: 1190, y: 660, w: 620 }, bg: GAR, actors: [MGC({ expr: 'shock' }), HGC({ expr: 'shock' })], over: (e) => { const [x, y] = e.toPanel([1350, 600]); return K.glow(x, y, 320, '#ffcf75', 0.9) + K.glow(x, y, 120, '#fff6d8', 0.9) + FX.burst(e.w, e.h, x, y, { n: 28, inner: 90, col: '#ffcf75', op: 0.4 }); } },
  [cap('There was no sound but the beating of the wings. Then a flash, like a fire flaring up and going out. And Fawkes was gone.', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
ep.panel(1240, { cam: { x: 900, y: 380, w: 700 }, bg: GAR, actors: [MGC({ x: 780, turn: 0.4, expr: 'teary' }), HGC({ x: 1030, turn: -0.3, expr: { base: 'hopeful' } })] },
  [say('Harry', 'Are phœnixes people? Could I talk with Fawkes, if I knew how?', 560, 40, { anchor: 'tc', w: 300, fixed: true }),
   say('McGonagall', 'No. Phœnixes are creatures of powerful magic. That magic gives them a weight of meaning no simple animal could possess. They are fire, light, healing, rebirth. But in the end, no.', 250, 236, { anchor: 'tc', w: 340, fixed: true }),
   say('Harry', 'Where can I get one?', 600, 1210, { anchor: 'bc', w: 240, fixed: true })], { mood: 'candle' });
// the hug: she kneels; her near arm is drawn again over Harry so it reads as around him
const MGK = (o = {}) => MGS({ x: 950, y: 1000, turn: 0.55, pose: 'kneel', headTilt: 10, expr: 'cry', armF: { sh: 38, el: 45, hand: 'open' }, armB: { sh: 50, el: 40, hand: 'open' }, ...o });
const HUGARM = (m) => () => '<defs><clipPath id="hugclip21"><rect x="1022" y="772" width="140" height="62"/></clipPath></defs>' + g({ 'clip-path': 'url(#hugclip21)' }, place(m.def, m).svg);
ep.panel(1000, { cam: { x: 1010, y: 720, w: 460 }, bg: GAR, blur: 2, actors: [MGK(), HGC({ x: 1070, turn: -0.1, expr: { base: 'shock', mouth: { type: 'o', open: 0.3 } } }), HUGARM(MGK())] },
  [cap('Minerva leaned down and hugged him. She hadn\'t meant to. She didn\'t seem to have much choice in the matter.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'McGonagall kneels and hugs Harry.' });
ep.panel(1060, { cam: { x: 990, y: 700, w: 560 }, bg: GAR, blur: 2, actors: [MGS({ x: 900, y: 1000, turn: 0.5, pose: 'kneel', expr: 'teary' }), HGC({ x: 1080, turn: -0.3, expr: { base: 'sad', eyes: { lookY: 0.3 } } })] },
  [say('McGonagall', 'What happened today, Harry?', 220, 40, { anchor: 'tc', w: 280, fixed: true }),
   say('Harry', 'I don\'t know the answers to any of the important questions either. Aside from that, I\'d really rather not think about it for a while.', 496, 1000, { anchor: 'bc', w: 380, fixed: true })], { mood: 'candle' });

// ---------------------------------------------------------------- the Time-Turner
const MO = () => CS.mcgonagallOffice();
const MC = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 1000, y: 900, turn: 0.25, pose: 'sit', seat: 190, expr: 'sad', ...o });
const MDESK = () => CS.mcgDesk(1000, 960);
const HM = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1450, y: 1040, s: 1.1, turn: -0.4, pose: 'sit', seat: 150, expr: 'calm', ...o });
const HCH = () => CHAIR(1450, 1040);
const MCS = (o = {}) => [MC(o), MDESK];
const HMS = (o = {}) => [HCH, HM(o)];
ep.panel(1000, { cam: { x: 1220, y: 600, w: 820 }, bg: MO, actors: [MC(), MDESK, HCH, HM()] },
  [whisper('McGonagall', 'So. There is a matter of school discipline. From which you are not exempt.', 250, 40, { anchor: 'tc', w: 360, fixed: true }),
   say('Harry', 'Namely?', 610, 330, { anchor: 'tc', w: 160, fixed: true }),
   cap('He didn\'t know. He hadn\'t figured it out yet. She felt her throat tighten. But there was work to be done, and she would not shirk it.', 44, 960, { anchor: 'bl', w: 620, fixed: true })], { mood: 'warm', alt: 'Her office. She would have given almost anything not to do this.' });
ep.panel(760, { cam: ON(MC(), 420, 0, -70), bg: MO, blur: 2, actors: MCS({ expr: 'stern' }) },
  [say('McGonagall', 'Mr Potter. I need to see your Time-Turner, please.', 400, 40, { anchor: 'tc', w: 440, fixed: true })], { mood: 'warm' });
ep.panel(1040, { cam: ON(HM(), 440, 0, 90), bg: MO, blur: 2, actors: HMS({ expr: 'horror', pose: 'cower' }) },
  [cap('All the peace of the phœnix vanished from his face in an instant. Minerva felt as though she had just stabbed him.', 44, 30, { w: 580, fixed: true }),
   shout('Harry', '*No!* I need it, I won\'t be able to attend Hogwarts, I won\'t be able to *sleep!*', 400, 966, { anchor: 'bc', w: 400, size: 33, pad: 50, fixed: true })], { mood: 'warm' });
ep.panel(1240, { cam: ON(MC(), 500, 0, -10), bg: MO, blur: 2, actors: MCS({ expr: 'sad', pose: 'present' }) },
  [say('McGonagall', 'You\'ll be able to sleep. The Ministry has delivered the protective shell for your Time-Turner. Your own suggestion. I will enchant it to open only between the hours of nine and midnight.', 400, 56, { anchor: 'tc', w: 520, fixed: true }),
   say('McGonagall', 'Mr Potter, how many times have you used it since Monday? How many hours?', 400, 1200, { anchor: 'bc', w: 460, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: ON(HM(), 420, -60, -30), bg: MO, blur: 2, actors: HMS({ expr: { base: 'think', eyes: { lookY: 0.7, lookX: 0.3 } }, armF: { sh: 20, el: 110, hand: 'fist' }, headTilt: 8 }) },
  [say('Harry', 'I… hold on, let me add it up…', 560, 40, { anchor: 'tc', w: 320, fixed: true }),
   cap('He glanced down at his watch.', 44, 722, { anchor: 'bl', w: 340, fixed: true })], { mood: 'warm' });
ep.panel(1400, { cam: ON(MC(), 480, 0, 0), bg: MO, blur: 2, actors: MCS({ expr: 'sad' }) },
  [say('McGonagall', 'It wasn\'t just two per day, then. I suspect your dorm-mates would say you\'ve been struggling to stay up late enough, and waking up earlier and earlier. There are students who become addicted to them. They end up using the Time-Turner for more than just their classes.', 400, 60, { anchor: 'tc', w: 520, fixed: true }),
   say('McGonagall', 'You have taken to using it as your solution to everything, often very foolishly. You used it to get back a Remembrall. You vanished from a cupboard in front of the whole class, instead of going back afterwards and fetching me to open the door.', 400, 1336, { anchor: 'bc', w: 520, fixed: true })], { mood: 'warm' });
ep.panel(1200, { cam: ON(MC(), 380, 0, 10), bg: MO, blur: 3, actors: MCS({ expr: 'stern' }) },
  [say('McGonagall', 'And more importantly, you should have simply sat in Professor Snape\'s class. And *watched.* And left at the end. As you would have done if you had not possessed a Time-Turner.', 400, 56, { anchor: 'tc', w: 500, fixed: true }),
   say('McGonagall', 'There are some students who cannot be entrusted with Time-Turners, Mr Potter. You are one of them. I am sorry.', 400, 1160, { anchor: 'bc', w: 480, fixed: true })], { mood: 'warm' });
ep.multi(1160, [
  { x: M, y: 18, w: 752, h: 620, mood: 'warm', art: { cam: ON(HM(), 400, 0, -20), bg: MO, blur: 2, actors: HMS({ expr: 'pleading', pose: 'gesture' }) } },
  { x: M, y: 656, w: 752, h: 486, mood: 'warm', art: { cam: ON(MC(), 440, -110, -60), bg: MO, blur: 2, actors: MCS({ expr: 'stern' }) } },
], [shout('Harry', 'But I *need* it! What if there are Slytherins threatening me and I have to escape? It keeps me *safe…*', 400, 86, { anchor: 'tc', w: 420, size: 33, fixed: true }),
   say('McGonagall', 'Every other student in this castle runs the same risk, and I assure you that they survive. You will hand over your Time-Turner, and do so now.', 272, 700, { anchor: 'tc', w: 300, fixed: true })]);
ep.panel(1000, { cam: { x: 1225, y: 600, w: 760 }, bg: MO, actors: [MC({ expr: 'focus', pose: 'wand', armB: { hand: 'hold', prop: g({ transform: 'translate(0,20)' }, rect(-3, -50, 6, 90, { fill: '#6b4429' })) } }), MDESK, HCH, HM({ expr: 'cry', pose: 'hold' }), () => g({ transform: 'translate(1160,600) scale(0.75)' }, P2.timeTurner(1, { shell: true, lock: true, chain: false }))], over: (e) => { const [x, y] = e.toPanel([1160, 575]); return FX.sparkles([[x, y]], { r: 40 }); } },
  [cap('Harry\'s face twisted in agony, but he drew out the Time-Turner and gave it to her. She snapped the cover into place around the hourglass, and laid her wand on it to complete the enchantment.', 44, 30, { w: 620, fixed: true })], { mood: 'warm', alt: 'The hourglass disappears inside a gold shell engraved IX–XII.' });
const HMU = (o = {}) => HM({ pose: 'stand', seat: undefined, y: 1060, ...o });
ep.panel(1060, { cam: ON(HMU(), 440, 0, -80), bg: MO, blur: 2, actors: [HCH, HMU({ pose: 'fists', expr: { base: 'angry', eyes: { teary: true }, mouth: { type: 'scream', open: 0.9 } } })] },
  [shout('Harry', '*This isn\'t fair!* I saved half of Hogwarts from Professor Snape today, is it right that I be punished for it? I saw the look on your face! You *hated* what he was doing!', 400, 120, { anchor: 'tc', w: 410, size: 32, pad: 54, fixed: true })], { mood: 'warm', alt: 'Harry shrieking.' });
const MCU = (o = {}) => MC({ pose: 'stand', seat: undefined, y: 960, ...o });
ep.multi(1700, [
  { x: M, y: 18, w: 752, h: 820, mood: 'warm', art: { cam: ON(MCU(), 520, 0, 68), bg: MO, blur: 2, actors: [MCU({ expr: 'angry', pose: 'point', turn: 0.4 })] } },
  { x: M, y: 856, w: 752, h: 826, mood: 'warm', art: { cam: ON(MCU(), 380, 0, -100), bg: MO, blur: 3, actors: [MCU({ expr: { base: 'angry', mouth: { type: 'shout', open: 0.7 } }, pose: 'point', turn: 0.4 })] } },
], [cap('Maybe it was the wrong thing to do. And then again, maybe it was the right thing. There was an obstinate child in front of her, and that *didn\'t* mean the universe was broken.', 44, 30, { w: 620, fixed: true }),
   shout('McGonagall', '*Fair,* Mr Potter? I have had to file *two reports* with the Ministry on public use of a Time-Turner in *two successive days!*', 400, 772, { anchor: 'bc', w: 390, size: 31, pad: 54, fixed: true }),
   shout('McGonagall', 'Be *extremely* grateful you were allowed to keep it at all! The Headmaster made a Floo call to plead with them personally, and if you were not the Boy-Who-Lived, even that would not have sufficed!', 384, 950, { anchor: 'tc', w: 430, size: 31, pad: 56, fixed: true })]);
ep.panel(560, { cam: ON(HMU(), 220, 0, 10), bg: MO, blur: 3, actors: [HMU({ expr: 'shock' })] },
  [cap('Harry gaped at her. She knew that he was seeing the angry face of Professor McGonagall.', 44, 30, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(520, { cam: ON(HMU(), 240, 0, 10), bg: MO, blur: 3, actors: [HMU({ expr: { base: 'hurt', eyes: { teary: true } } })] },
  [cap('Harry\'s eyes filled up with tears.', 44, 30, { w: 400, fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: ON(HMU(), 320, 0, 60), bg: MO, blur: 4, actors: [HMU({ expr: { base: 'hurt', eyes: { lookY: 0.5, open: 0.6 }, tears: 'stream', mouth: { type: 'wobble', w: 1 } }, headTilt: 8 })], over: (e) => K.glow(e.w / 2, e.h * 0.4, 360, '#1a1008', 0.25) },
  [whisper('Harry', 'I\'m, sorry, to have, disappointed you…', 400, 840, { anchor: 'bc', w: 420, size: 30, fixed: true })], { mood: 'warm' });
ep.multi(1060, [
  { x: M, y: 18, w: 752, h: 560, mood: 'warm', art: { cam: ON(MC(), 420, 0, -60), bg: MO, blur: 2, actors: MCS({ expr: { base: 'stern', eyes: { teary: true } } }) } },
  { x: M, y: 596, w: 752, h: 446, mood: 'warm', art: { cam: { x: 1520, y: 690, w: 900 }, bg: MO, actors: [MC({ expr: 'sad' }), MDESK, { def: harryRaven, id: 'harry', x: 1760, y: 1040, s: 1.1, turn: 0.7, pose: 'run', expr: 'sob' }], over: (e) => g({ opacity: 0.35 }, FX.speedLines(e.w, e.h, { n: 24 })) } },
], [say('McGonagall', 'I\'m sorry too, Mr Potter.', 230, 44, { anchor: 'tc', w: 280, fixed: true }),
   say('McGonagall', 'You may go.', 590, 260, { anchor: 'tc', w: 200, fixed: true }),
   cap('Harry turned and fled from her office, sobbing. She heard his feet pattering away down the hall. Then the sound cut off, as the door swung closed.', 44, 612, { w: 620, fixed: true })]);
ep.bleed(1100, { cam: { x: 1120, y: 560, w: 1200 }, bg: MO, actors: [MC({ expr: 'cry', headTilt: 16, lean: 10 }), MDESK], over: (e) => K.glow(e.w * 0.36, e.h * 0.45, 360, '#ffcf75', 0.12) },
  [whisper('McGonagall', 'I\'m sorry too, Harry.', 400, 250, { anchor: 'tc', w: 340, size: 28, fixed: true }),
   capC('*I\'m sorry too.*', 400, 1030, { anchor: 'bc', w: 300, fixed: true })], { alt: 'McGonagall alone in her tidy office, head bowed.' });

// ---------------------------------------------------------------- lunch
dayBeat(ep, 'Friday.', 'If you wanted to be specific, fifteen minutes into lunch hour.', { h: 260 });
const LT = () => HG.hallTable('r', { day: true });
const RAVT = (o = {}) => [
  { def: padma, id: 'padma', x: 380, y: 1050, s: 1.05, turn: 0.4, expr: 'worried', ...((o.who || {}).padma || {}) },
  { def: hermioneRaven, id: 'hermione', x: 560, y: 1050, s: 1.1, turn: 0.3, expr: 'worried', ...(o.he || {}) },
  { def: harryRaven, id: 'harry', x: 830, y: 1050, s: 1.1, turn: 0, expr: 'blank', ...(o.h || {}) },
  { def: terry, id: 'terry', x: 1100, y: 1050, s: 1.05, turn: -0.4, expr: 'cross', ...((o.who || {}).terry || {}) },
  { def: anthony, id: 'anthony', x: 1270, y: 1050, s: 1.05, turn: -0.4, expr: 'awe', ...((o.who || {}).anthony || {}) },
  () => HG.tableFront(),
];
ep.panel(900, { cam: { x: 820, y: 720, w: 1000 }, bg: LT, actors: RAVT() },
  [cap('No-one was speaking to Harry. Some of the Ravenclaws shot him angry looks. Others sympathetic ones. A few of the youngest, admiring. Even Hermione hadn\'t tried to come over.', 44, 30, { w: 620, fixed: true }),
   cap('It was probably the utterly expressionless look on his face.', 44, 860, { anchor: 'bl', w: 540, fixed: true })], { mood: 'day' });
ep.panel(1100, { cam: { on: ['harry'], fr: 'close', dy: 0.15 }, bg: LT, blur: 3, actors: RAVT({ h: { expr: { base: 'blank', mouth: { type: 'wobble' } } } }) },
  [cap('Harry was trying not to smile. Because if he smiled, he would start laughing. And if he started laughing, he wouldn\'t stop until the nice people in white jackets came to haul him away.', 44, 30, { w: 620, fixed: true }),
   cap('It was too much. His dark side had done things that seemed insane, won an impossible victory, and protected his friends. And the Time-Turner was gone, like a hole in his existence.', 44, 860, { w: 620, fixed: true })], { mood: 'day' });
const DAIS = () => HG.dais();
const DUM = (o = {}) => ({ def: dumbledore, id: 'dumbledore', x: 900, y: 900, turn: 0.1, pose: 'stand', expr: 'smile', ...o });
ep.panel(900, { cam: ON(DUM(), 520, 0, 40), bg: DAIS, actors: [DUM({ pose: 'present', armB: { sh: 60, el: 60, hand: 'hold' } }), () => HG.goblet(1010, 690, 1)] },
  [cap('*Tink tink tink.* The tapping of a spoon rang through the Great Hall.', 44, 30, { w: 620, fixed: true }),
   say('Dumbledore', 'If I may have your attention, please. Harry Potter has something he would like to share with us.', 400, 860, { anchor: 'bc', w: 500, fixed: true })], { mood: 'day' });
const HS = (o = {}) => ({ def: harryRaven, id: 'harry', x: 600, y: 900, s: 1.1, turn: 0.1, pose: 'stand', expr: 'blank', ...o });
ep.bleed(1300, { cam: { on: ['harry'], fr: 'waist', dy: -0.4 }, bg: DAIS, actors: [HS()] },
  [say('Harry', 'The truth is sacred. One of my most treasured possessions is a button which reads "Speak the truth, even if your voice trembles". This, then, is the truth. I am not saying it because I am being forced to. I am saying it because it is true.', 400, 64, { anchor: 'tc', w: 600, fixed: true }),
   say('Harry', 'What I did in Professor Snape\'s class was foolish, stupid, childish, and an inexcusable violation of the rules of Hogwarts. All because I failed to control my temper. I hope that not a single one of you will ever follow my example.', 400, 1240, { anchor: 'bc', w: 600, fixed: true })], { alt: 'Harry, expressionless, at the Head Table, speaking his memorised speech.' });
// the four without Harry, closed up so there is no gap where he sat
const RAV4 = (ex) => RAVT({ he: { x: 720, expr: ex.he }, who: { padma: { x: 500, expr: ex.padma }, terry: { x: 940, expr: ex.terry }, anthony: { x: 1160, expr: ex.anthony } } }).filter((a) => typeof a === 'function' || a.id !== 'harry');
ep.panel(740, { cam: { x: 830, y: 740, w: 820 }, bg: LT, actors: RAV4({ he: 'sad', padma: 'sad', terry: 'sad', anthony: 'sad' }) },
  [cap('Many of the students now had solemn, unhappy looks, such as one might see at a ceremony marking the loss of a fallen champion.', 44, 30, { w: 620, fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { x: 650, y: 680, w: 400 }, bg: DAIS, actors: [HS({ expr: 'blank', armB: { sh: 25, el: 95, hand: 'fist' } })], over: (e) => { const [x, y] = e.toPanel([700, 700]); return K.glow(x, y, 60, '#fff3c9', 0.5) + FX.emanata(x, y, 46, { n: 6 }); } },
  [cap('Until Harry raised his hand. Not high. He simply raised it to chest level, and softly snapped his fingers. A gesture seen more than heard.', 44, 30, { w: 620, fixed: true }),
   sfx('snap', 600, 410, { size: 56, font: "'Caveat', cursive" })], { mood: 'day', alt: 'A tiny snap of the fingers, at chest height.' });
ep.multi(1020, [
  { x: M, y: 18, w: 752, h: 640, mood: 'day', art: { cam: { x: 830, y: 750, w: 820 }, bg: LT, actors: RAV4({ he: 'shock', padma: 'grin', terry: 'shock', anthony: 'bigGrin' }) } },
  { x: M, y: 676, w: 752, h: 326, mood: 'day', art: { cam: ON(HS(), 460, 110, 20), bg: DAIS, blur: 2, actors: [HS({ expr: 'blank' })] } },
], [cap('This seeming gesture of defiance won sudden smiles from the younger students and the Gryffindors, coldly superior sneers from Slytherin, and worried looks from everyone else.', 44, 34, { w: 620, fixed: true }),
   say('Harry', 'Thank you. That\'s all.', 560, 750, { anchor: 'tc', w: 260, fixed: true })]);
const SNS = (o = {}) => ({ def: snape, id: 'snape', x: 1300, y: 900, turn: -0.1, pose: 'stand', expr: 'cold', ...o });
ep.bleed(1300, { cam: { on: ['snape'], fr: 'waist', dy: -0.3 }, bg: DAIS, actors: [SNS(), () => HG.staffTable()] },
  [say('Dumbledore', 'Thank you, Mr Potter. And now Professor Snape has something to share with us as well.', 400, 64, { anchor: 'tc', w: 520, fixed: true, noTail: true }),
   say('Snape', 'It has been brought to my attention that my own actions played a part in provoking the admittedly inexcusable anger of Mr Potter. In the ensuing discussion, I realised that I had forgotten how easily injured are the feelings of the young and immature…', 400, 1240, { anchor: 'bc', w: 600, fixed: true })], { alt: 'Snape rises smoothly at the Head Table.' });
ep.panel(720, { cam: { x: 830, y: 740, w: 1040 }, bg: LT, actors: RAVT({ he: { expr: 'gasp' }, h: { expr: 'blank' }, who: { padma: { expr: 'horror' }, terry: { expr: 'laugh' }, anthony: { expr: 'shock' } } }) },
  [cap('There was the sound of many people making muffled chokes at the same time.', 44, 30, { w: 620, fixed: true })], { mood: 'day' });
const SNQ = SNS({ expr: 'angry', pose: 'wand', turn: -0.3, armB: { hand: 'hold', prop: g({ transform: 'translate(0,20)' }, rect(-3, -50, 6, 90, { fill: '#8a5d38' })) } });
ep.panel(1040, { cam: ON(SNS(), 540, 0, -60), bg: DAIS, blur: 2, actors: [SNS({ expr: 'menace' }), () => HG.staffTable()] },
  [say('Snape', 'The Potions classroom is a dangerous place, and I still feel that strict discipline is necessary. But henceforth I will be more aware of the… *emotional fragility…* of students in their fourth year and younger. My deduction of points from Ravenclaw still stands. But I will revoke Mr Potter\'s detention.', 400, 70, { anchor: 'tc', w: 560, fixed: true })], { mood: 'day' });
ep.panel(820, { cam: ON(SNS(), 560, -120, 60), bg: DAIS, blur: 2, actors: [SNQ], over: (e) => { const [x, y] = e.toPanel(place(SNQ.def, SNQ).anchors.handB); return K.glow(x - 40, y, 70, '#dfe9f0', 0.7) + FX.emanata(x - 40, y, 40, { n: 7 }); } },
  [cap('A single clap came from the direction of Gryffindor. Faster than lightning, Snape\'s wand was in his hand. "*Quietus!*"', 44, 30, { w: 620, fixed: true })], { mood: 'day' });
ep.multi(1060, [
  { x: M, y: 18, w: 752, h: 700, mood: 'day', art: { cam: ON(SNS(), 330, 0, -20), bg: DAIS, blur: 3, actors: [SNS({ expr: 'cold' })] } },
  { x: M, y: 736, w: 752, h: 306, mood: 'day', art: { cam: ON(DUM(), 440, -120, 20), bg: DAIS, blur: 2, actors: [DUM({ expr: 'happy' })] } },
], [say('Snape', 'I will still demand discipline and respect in *all* my classes. And anyone who trifles with me will regret it.', 400, 40, { anchor: 'tc', w: 480, fixed: true }),
   say('Dumbledore', 'Thank you too! Carry on!', 250, 790, { anchor: 'tc', w: 280, fixed: true })]);
const HUBBUB = (e) => { const R = rng(14); let o = ''; for (let i = 0; i < 12; i++) { const x = 20 + ((i * 0.37 + R() * 0.25) % 1) * (e.w - 300), y = e.h * 0.42 + (i / 12) * e.h * 0.5 + R() * 20; o += text(x, y, R.pick(['What…', 'What just happened…', 'Scourgify!', 'WHAT', 'Scourgify!']), { 'font-family': R.pick(['Caveat', 'Alegreya', 'Grenze Gotisch']), 'font-size': R.range(28, 42), fill: '#fbf7ec', stroke: '#2a1b14', 'stroke-width': 1.4, 'paint-order': 'stroke', transform: `rotate(${R.range(-10, 10)} ${x} ${y})` }); } return o; };
const SPR = { def: sprout, id: 'sprout', x: 900, y: 900, turn: 0.2, pose: 'stand', expr: 'cry' };
const STU = { def: student(2101, 'h'), id: 's1', x: 800, y: 1050, s: 1.05, turn: 0.2, expr: 'cry' };
ep.multi(1600, [
  { x: 0, y: 0, w: 800, h: 1080, border: 'bleed', art: { cam: { x: 800, y: 560, w: 1400 }, bg: () => HG.greatHallWide(), over: HUBBUB } },
  { x: M, y: 1098, w: 368, h: 484, mood: 'day', art: { cam: ON(STU, 300, 0, -60), bg: () => HG.hallTable('h', { day: true }), blur: 2, actors: [STU, () => HG.tableFront()] } },
  { x: 408, y: 1098, w: 368, h: 484, mood: 'day', art: { cam: ON(SPR, 300, 0, -60), bg: DAIS, blur: 2, actors: [SPR, () => HG.staffTable()] } },
], [cap('There was an explosion of conversation. Two words were clearly identifiable. The first was "What…", beginning many different sentences. The second was "*Scourgify!*", as students cleaned dropped food and spat-out drinks from themselves, the tablecloth, and each other.', 44, 40, { w: 640, fixed: true }),
   cap('Some students were weeping openly. So was Professor Sprout.', 400, 1116, { anchor: 'tc', w: 600, fixed: true })]);
const GT = () => HG.hallTable('g', { day: true });
ep.panel(1100, { cam: { x: 800, y: 800, w: 640 }, bg: GT, actors: [{ def: fred, id: 'fred', x: 620, y: 1050, turn: 0.4, lean: 8, expr: 'awe' }, { def: george, id: 'george', x: 980, y: 1050, turn: -0.4, lean: 8, expr: 'awe' }, () => HG.tableFront(), () => g({ transform: 'translate(800,960) scale(1.15)' }, P2.cake(1, 51))] },
  [cap('At the Gryffindor table, where a cake waited with fifty-one unlit candles:', 44, 30, { w: 620, fixed: true }),
   whisper('Fred', 'I think we may be out of our league here, George.', 340, 1062, { anchor: 'bc', w: 400, fixed: true })], { mood: 'day', alt: 'Fred and George, awed, over a cake crowded with fifty-one unlit candles.' });
ep.panel(760, { cam: { on: ['harry'], fr: 'close', dy: 0.1 }, bg: LT, blur: 3, actors: RAVT({ h: { expr: { base: 'blank', eyes: { lookX: 0.3 } } } }) },
  [capC('And from that day onward, no matter what Hermione tried to tell anyone, it was an accepted legend of Hogwarts that Harry Potter could make absolutely anything happen by snapping his fingers.', 400, 64, { anchor: 'tc', w: 600, fixed: true })], { mood: 'day' });
ep.end();
export default ep;
