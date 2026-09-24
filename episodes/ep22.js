// EPISODE 22 — How to Lose  (source: HPMOR ch. 19)
// Harry learns to lose, in public, and wins the school's respect. The turn toward the climax.
import { Episode, say, shout, whisper, inner, cold, cap, plain, title, M } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, text } from '../engine/core/svg.js';
import * as CS from '../engine/bg/castle.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { quirrell, darkLord, student, mcgonagall } from '../engine/chars/cast.js';
import { harryRaven, dracoSly, crabbe, goyle, zabini, terry, padma, anthony, derrick, slyTeen, master, dojoStudent, youngQuirrell } from '../engine/chars/cast2.js';
import { wand, pouch } from '../engine/props/props.js';
import * as P2 from '../engine/props/props2.js';
import { dayBeat, header } from './b2.js';

const ep = new Episode({ id: 'ep22', number: 22, title: 'How to Lose' });
ep.setBg(C.paper);
header(ep, 'TWENTY-TWO', 'How to Lose');
dayBeat(ep, 'Friday.', 'If you wanted to be specific, 2:25 on Friday afternoon. The last class of the week.');

// ---------------------------------------------------------------- Draco: "Talk."
const TI = () => CS.defenceTiers();
const rowY = (k) => CS.FLOOR - k * CS.ROW + 60;
const HS = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1450, y: rowY(4), s: 1.1, turn: -0.3, pose: 'sit', seat: 70, expr: 'neutral', ...o });
const DR = (o = {}) => ({ def: dracoSly, id: 'draco', x: 1180, y: rowY(4), s: 1.1, turn: 0.4, pose: 'stand', expr: 'stern', ...o });
const MIN = (o = {}) => [{ def: goyle, id: 'goyle', x: 820, y: rowY(4), s: 1.15, turn: 0.4, pose: 'crossArms', expr: 'menace', ...o.go }, { def: crabbe, id: 'crabbe', x: 980, y: rowY(4), s: 1.2, turn: 0.4, pose: 'fists', expr: 'menace', ...o.cr }];
const FRONT = () => CS.tierFront(4, { screens: [] });
// Draco and his minions stand in the aisle; Harry sits behind his desk.
const FRONTH = () => g({ transform: 'translate(0,70)' }, CS.tierFront(4, { x0: 1300, screens: [] }));
ep.panel(1000, { cam: { x: 1120, y: -100, w: 900 }, bg: TI, actors: [...MIN({ go: { x: 770, turn: 0.2, pose: 'handsHips' }, cr: { x: 990, turn: 0.2 } }), DR(), HS({ expr: 'deadpan' }), FRONTH] },
  [cap('Draco had a stern expression, and his green-trimmed robes somehow looked far more formal than the same exact robes on the two boys behind him.', 44, 30, { w: 620, fixed: true }),
   say('Draco', 'Talk.', 540, 205, { anchor: 'tc', w: 140, fixed: true }),
   say('Crabbe', 'Yeah! Talk!', 340, 262, { anchor: 'tc', w: 180, fixed: true }),
   say('Goyle', 'You heard da boss! Talk!', 175, 345, { anchor: 'tc', w: 200, fixed: true }),
   say('Draco', 'You two, on the other hand, *shut up.*', 470, 945, { anchor: 'bc', w: 420, fixed: true })], { mood: 'candle' });
// a panel inside a multi-panel tile (candlelit by default)
const P = (y, h, art, o = {}) => ({ x: M, y, w: 752, h, mood: 'candle', art, ...o });
// the two-shot: Draco standing in the aisle, Harry seated behind his desk
const TWO = (y, w = 640) => ({ x: 1315, y, w });
// Harry on his feet, orating straight at the reader (a cut-out: no frame, no classroom)
ep.multi(1120, [
  { ...P(18, 720, { cam: { head: 'harry', hw: 0.25, hx: 0.75, hy: 0.23 }, actors: [HS({ expr: 'smug', pose: 'lecture', turn: -0.15 })] }), cutout: true, border: 'none' },
  P(766, 336, { cam: { head: 'draco', hw: 0.24, hx: 0.8, hy: 0.52 }, bg: TI, blur: 3, actors: [DR({ expr: 'yell', pose: 'fists' })] }),
], [say('Harry', 'You ask, what is our aim? I can answer in one word. It is victory. Victory at all costs—Victory in spite of all terrors—Victory, however long and hard the road may be, for without victory there is no—', 42, 236, { anchor: 'tl', w: 334, fixed: true, shape: 'box' }),
   shout('Draco', '*Talk about SNAPE. What did you do?*', 262, 934, { w: 280, fixed: true })]);
ep.panel(1000, { cam: TWO(-60), bg: TI, actors: [DR({ expr: 'exasperated', pose: 'fists' }), HS({ expr: 'deadpan' }), FRONTH] },
  [say('Harry', 'You saw it. Everyone saw it. I snapped my fingers.', 560, 40, { anchor: 'tc', w: 320, fixed: true }),
   shout('Draco', '*Harry!* Stop teasing me!', 250, 250, { anchor: 'tc', w: 300, fixed: true }),
   inner('Harry', '*So he\'d been promoted to "Harry" now. Interesting.*', 400, 950, { anchor: 'bc', w: 520, fixed: true })], { mood: 'candle' });
ep.multi(1672, [
  P(18, 520, { cam: { head: 'harry', w: 460, hy: 0.5, dx: -149, dy: -10 }, bg: TI, blur: 2, actors: [HS({ expr: 'neutral', turn: -0.4 }), FRONTH] }),
  P(556, 480, { cam: { x: 1120, y: -185, w: 900 }, bg: TI, actors: [...MIN({ go: { x: 770, turn: 0.2, pose: 'handsHips', expr: 'wince' }, cr: { x: 990, turn: 0.2, expr: 'sad' } }), DR({ expr: 'angry', pose: 'point', turn: -0.4 }), HS({ expr: 'neutral' }), FRONTH] }),
  P(1054, 600, { cam: TWO(-165), bg: TI, actors: [DR({ expr: 'hurt', turn: 0.4 }), HS({ expr: 'sad' }), FRONTH] }),
], [say('Harry', 'Draco, I\'m going to be one hundred percent honest, and say I\'m not *entirely* sure they wouldn\'t just report what I said to Lucius.', 260, 60, { anchor: 'tc', w: 320, fixed: true }),
   shout('Draco', 'Father wouldn\'t *do* that! They\'re *mine!*', 370, 614, { anchor: 'tc', w: 400, fixed: true }),
   say('Harry', 'I\'m sorry, Draco. I\'m just not sure I can believe everything you believe about your father. Imagine it was your secret, and me telling you *my* father wouldn\'t do that.', 400, 1082, { anchor: 'tc', w: 580, fixed: true, tail: 'harry@2' })]);
ep.multi(1000, [
  P(18, 600, { cam: { head: 'draco', w: 480, hy: 0.5, dy: -40 }, bg: TI, blur: 2, actors: [DR({ expr: 'calm', turn: 0.2 })] }),
  P(636, 346, { cam: { x: 830, y: -95, w: 900 }, bg: TI, actors: [...MIN({ go: { x: 640, turn: -0.5, pose: 'walk', expr: 'sad' }, cr: { x: 900, turn: -0.5, pose: 'walk2', expr: 'hurt' } })] }),
], [say('Draco', 'You\'re right. *I\'m* sorry, Harry. It was wrong of me to ask it of you. Go!', 400, 44, { anchor: 'tc', w: 460, fixed: true }),
   cap('The minions left, looking *very* unhappy.', 44, 654, { w: 480, fixed: true })]);
ep.multi(1300, [
  P(18, 640, { cam: { head: 'harry', w: 520, hy: 0.5, dx: 29, dy: -80 }, bg: TI, blur: 2, actors: [HS({ expr: 'focus', turn: -0.2 }), FRONTH] }),
  P(676, 606, { cam: TWO(-150, 700), bg: TI, actors: [DR({ expr: { base: 'focus', eyes: { lookX: 0.5 } }, turn: 0.4 }), HS({ expr: 'calm' }), FRONTH] }),
], [say('Harry', 'Trade. I tell you a fact that isn\'t on the grapevine and does *not* go on the grapevine, and in *particular* does not go to your father. And you tell me what Slytherin thinks.', 400, 44, { anchor: 'tc', w: 540, fixed: true }),
   say('Harry', 'What I said was true. I did discover one of Severus\'s secrets, and I did do some blackmail. But Severus wasn\'t the only person involved.', 400, 700, { anchor: 'tc', w: 520, fixed: true, tail: 'harry@1' })]);
ep.multi(960, [
  // Draco's discovery explodes the frame
  P(18, 520, { cam: { head: 'draco', w: 440, hy: 0.5, dy: -30 }, bg: TI, blur: 3, behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.55, { n: 40, op: 0.5, col: '#f3e6c4', inner: 190 }), actors: [DR({ expr: { base: 'bigGrin', eyes: { sparkle: true } }, pose: 'fists' })] }, { shape: 'burst', points: 20, seed: 4 }),
  P(556, 386, { cam: { head: 'harry', w: 480, hy: 0.5, dx: -109, dy: 20 }, bg: TI, blur: 3, actors: [HS({ expr: 'worried', turn: -0.4 }), FRONTH] }),
], [shout('Draco', '*I KNEW IT!*', 400, 66, { anchor: 'tc', w: 260, fixed: true }),
   cap('Harry\'s stomach sank. He had apparently said something very significant, and he didn\'t know why.', 44, 580, { w: 300, fixed: true })]);
ep.multi(1500, [
  P(18, 740, { cam: { head: 'draco', w: 480, hy: 0.5, dx: 55, dy: -80 }, bg: TI, blur: 2, actors: [DR({ expr: 'scheme', pose: 'lecture' })] }),
  P(776, 706, { cam: { head: 'draco', w: 460, hy: 0.5, dx: 33, dy: -95 }, bg: TI, blur: 3, actors: [DR({ expr: { base: 'scheme', eyes: { sparkle: true } }, pose: 'point', turn: 0.3 })] }),
], [say('Draco', 'So here\'s what the reaction was like in Slytherin. First, all the idiots were like, "We hate Harry Potter! Let\'s go beat him up!" Then the second wave of idiots said, "Looks like Harry Potter was just another do-gooder after all."', 400, 56, { anchor: 'tc', w: 520, fixed: true }),
   say('Draco', 'And then the *really* smart people had a little discussion. If you could break Snape\'s hold over Dumbledore, you\'d just do it. So Snape\'s hold was some secret of Dumbledore\'s, and *you\'ve got the secret!* Father\'s been trying to get Snape to tell him for *years!*', 400, 800, { anchor: 'tc', w: 520, fixed: true, shape: 'box', tail: 'draco@1' })]);
// In his father's voice, Draco becomes a Malfoy portrait: a gilt oval on a dark green ground
ep.panel(1100, { cam: { head: 'draco', hw: 0.47, hx: 0.5, hy: 0.43 }, bg: () => rect(-3000, -3000, 8000, 8000, { fill: '#2a3a2e' }), actors: [DR({ expr: { base: 'stern', eyes: { open: 0.7 } }, pose: 'stand', turn: 0.1 })] },
  [cap('(In a different, more formal cadence. His father\'s.)', 44, 30, { w: 560, fixed: true }),
   say('Draco', 'I\'ll get an owl tonight. *My beloved son: as you have already realised, Harry Potter\'s importance has now become greater and more urgent. If you see any possible avenue of friendship or point of pressure, pursue it. The full resources of Malfoy are at your disposal.*', 400, 128, { anchor: 'tc', w: 620, fixed: true, shape: 'box', tail: [400, 590] })], { mood: 'candle', shape: 'oval', frame: 'gilt', x: 175, w: 450, y: 528, ph: 548 });
ep.multi(1520, [
  P(18, 640, { cam: { head: 'draco', w: 400, hy: 0.5, dx: -19, dy: -60 }, bg: TI, blur: 3, actors: [DR({ expr: 'worried', turn: 0.3 })] }),
  P(676, 826, { cam: { head: 'draco', w: 480, hy: 0.5, dx: 11, dy: -172 }, bg: TI, blur: 2, actors: [DR({ expr: 'yell', pose: 'panic', turn: 0.2 })] }),
], [whisper('Draco', 'Harry. Has it occurred to you that if you know something Dumbledore doesn\'t want known, Dumbledore might simply have you killed? It would turn the Boy-Who-Lived into a valuable martyr, too.', 400, 50, { anchor: 'tc', w: 540, fixed: true }),
   shout('Draco', 'You\'ve obviously got *incredible* talent, but you\'ve got no training and no mentors and you do stupid things sometimes and *you really need an advisor who knows how to do this or you\'re going to get hurt!*', 400, 794, { anchor: 'tc', w: 430, size: 32, fixed: true })]);
ep.multi(1712, [
  P(18, 380, { cam: { head: 'harry', w: 440, hy: 0.5, dx: -149 }, bg: TI, blur: 3, actors: [HS({ expr: { base: 'suspicious', brows: { raise: 0.5 } }, turn: -0.4 }), FRONTH] }),
  P(416, 720, { cam: { head: 'draco', w: 520, hy: 0.5, dx: 21, dy: -130 }, bg: TI, blur: 2, actors: [DR({ expr: { base: 'yell', brows: { raise: 0.6 } }, pose: 'fists', turn: 0.3 })] }),
  P(1154, 540, { cam: TWO(-150), bg: TI, actors: [DR({ expr: 'smile', pose: 'gesture', turn: 0.4 }), HS({ expr: 'shock' }), FRONTH] }),
], [say('Harry', 'Ah. An advisor like Lucius?', 250, 150, { anchor: 'tc', w: 300, fixed: true }),
   shout('Draco', 'Like *me!* I\'ll keep your secrets from Father, from *everyone!* I\'ll just help you figure out whatever you want to do!', 400, 522, { anchor: 'tc', w: 420, size: 34, fixed: true }),
   say('Draco', 'You shouldn\'t trust me. It\'s too soon. See? I\'ll give you good advice, even if it hurts me. But we should maybe *hurry up* and become closer friends.', 400, 1182, { anchor: 'tc', w: 520, fixed: true, tail: 'draco@2' })]);
ep.multi(1474, [
  P(18, 700, { cam: { head: 'draco', w: 520, hy: 0.5, dx: -132, dy: -110 }, bg: TI, blur: 2, actors: [DR({ expr: 'scheme', pose: 'lecture', turn: -0.2 })] }),
  P(736, 720, { cam: { head: 'harry', w: 520, hy: 0.5, dx: -1, dy: -85 }, bg: TI, blur: 2, actors: [HS({ expr: 'rant', pose: 'fists', turn: -0.2 })] }),
], [say('Draco', 'Another bit of advice: if you\'re courting Slytherin, which I think you are, do something that signals friendship. *Soon.* Push your mudblood rival Granger into a wall or something, everyone in Slytherin will know what that means—', 280, 60, { anchor: 'tc', w: 380, fixed: true, shape: 'box' }),
   shout('Harry', 'That is *not* how it works in Ravenclaw, Draco! If you have to push someone into a wall, it means your brain is too *weak* to beat them the right way!', 410, 834, { anchor: 'tc', w: 440, size: 31, fixed: true })]);

// ---------------------------------------------------------------- Quirrell: how to lose
const ST = () => CS.defenceStage({});
const Q = (o = {}) => ({ def: quirrell, id: 'quirrell', x: 1000, y: 700, turn: 0.05, pose: 'stand', expr: 'calm', ...o });
const QDESK = () => CS.defenceDesk(1000, 700);
// Draco in the second row of the tiers; Harry at the back (row 4)
const DS = (o = {}) => ({ def: dracoSly, id: 'draco', x: 1000, y: rowY(1), s: 1.1, turn: 0.2, pose: 'sit', seat: 140, expr: 'smug', ...o });
const FRONT1 = () => CS.tierFront(1, { screens: [] });
const HT = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1450, y: rowY(4), s: 1.1, turn: -0.1, pose: 'sit', seat: 140, expr: 'neutral', ...o });
ep.multi(1150, [
  P(18, 560, { cam: { x: 1000, y: 215, w: 900 }, bg: ST, actors: [QDESK, Q({ pose: 'present', expr: 'coldSmile' })] }),
  P(596, 536, { cam: { head: 'quirrell', w: 520, hy: 0.5, dx: -153, dy: 20 }, bg: ST, blur: 2, actors: [QDESK, Q({ pose: 'point', expr: 'coldSmile', turn: 0.3 })] }),
], [say('Quirrell', 'Today I had planned to teach you your first defensive spell. But I have changed today\'s lesson plan in the light of recent events.', 400, 44, { anchor: 'tc', w: 520, fixed: true, tail: 'quirrell@0' }),
   say('Quirrell', 'Draco, of the Noble and Most Ancient House of Malfoy. Is it your ambition to become the next Dark Lord?', 240, 640, { anchor: 'tc', w: 300, fixed: true, tail: 'quirrell@1' })]);
ep.multi(1060, [
  P(18, 400, { cam: { head: 'draco', w: 500, hy: 0.5, dx: -147, dy: 20 }, bg: TI, blur: 2, actors: [DS({ turn: -0.3, expr: { base: 'smug', brows: { raise: 0.5 } } }), FRONT1] }),
  P(436, 606, { cam: { head: 'quirrell', w: 520, hy: 0.5, dx: -165, dy: -20 }, bg: ST, blur: 2, actors: [QDESK, Q({ pose: 'lecture', expr: 'smile', turn: 0.3 })] }),
], [say('Draco', 'That\'s an odd question, Professor. I mean, who\'d be dumb enough to admit it?', 268, 90, { anchor: 'tc', w: 380, fixed: true }),
   say('Quirrell', 'Indeed. So it would not surprise me in the slightest if there were a student or two in my classes who harboured ambitions of being the next Dark Lord. After all, *I* wanted to be the next Dark Lord, when *I* was a young Slytherin.', 270, 476, { anchor: 'tc', w: 380, fixed: true, shape: 'box' })], { alt: 'Widespread laughter.' });
ep.multi(1250, [
  P(18, 500, { cam: { head: 'quirrell', w: 600, hy: 0.5, dx: 149, dy: -60 }, bg: ST, blur: 2, actors: [QDESK, Q({ pose: 'gesture', expr: 'smile', turn: 0.2 })] }),
  P(536, 300, { cam: { head: 'harry', w: 420, hy: 0.5, dx: -149, dy: 10 }, bg: TI, blur: 3, actors: [HT({ expr: 'laugh', turn: -0.2 }), FRONT] }),
  P(854, 378, { cam: { head: 'quirrell', w: 440, hy: 0.5, dx: 122, dy: -10 }, bg: ST, blur: 3, actors: [Q({ expr: 'coldSmile', turn: -0.2 })] }),
], [say('Quirrell', 'When I was thirteen, I read the lives and fates of past Dark Lords, and made a list of all the mistakes that *I* would never make when *I* was a Dark Lord—', 560, 50, { anchor: 'tc', w: 340, fixed: true, shape: 'box', tail: 'quirrell@0' }),
   cap('Harry giggled before he could stop himself.', 44, 556, { w: 300, fixed: true }),
   say('Quirrell', 'Yes, Mr Potter, very amusing. So, Mr Potter: can you guess the very first item on that list?', 540, 880, { anchor: 'tc', w: 300, fixed: true, tail: 'quirrell@2' })]);
ep.multi(1110, [
  P(18, 400, { cam: { head: 'harry', w: 480, hy: 0.5, dx: -164, dy: -27 }, bg: TI, blur: 2, actors: [HT({ expr: 'wince', pose: 'raiseHand', turn: -0.3 }), FRONT] }),
  P(436, 340, { cam: { head: 'quirrell', w: 440, hy: 0.5, dx: 141, dy: -10 }, bg: ST, blur: 3, actors: [Q({ expr: 'unimpressed', turn: -0.1 })] }),
  P(794, 298, { cam: { head: 'harry', w: 460, hy: 0.5, dx: -139 }, bg: TI, blur: 3, actors: [HT({ expr: 'embarrassed', turn: -0.3 }), FRONT] }),
], [say('Harry', 'Um… never use a complicated way of dealing with an enemy when you can just Abracadabra them?', 250, 80, { anchor: 'tc', w: 360, shape: 'box', fixed: true }),
   say('Quirrell', 'The *term*, Mr Potter, is *Avada Kedavra*, and no. Guess again.', 540, 490, { anchor: 'tc', w: 300, fixed: true }),
   say('Harry', 'Ah… never brag to anyone about your evil master plan?', 250, 860, { anchor: 'tc', w: 300, fixed: true, tail: 'harry@2' })]);
ep.multi(1290, [
  P(18, 440, { cam: { head: 'quirrell', w: 480, hy: 0.5, dx: 141, dy: -30 }, bg: ST, blur: 2, actors: [QDESK, Q({ pose: 'present', expr: { base: 'smile', brows: { raise: 0.6 } }, turn: -0.1 })] }),
  P(476, 796, { cam: { head: 'quirrell', w: 440, hy: 0.5, dy: -85 }, bg: ST, blur: 3, actors: [QDESK, Q({ pose: 'stand', expr: { base: 'calm', eyes: { style: 'cold', open: 0.7 } }, turn: 0.05 })], over: (e) => FX.doom(e.w, e.h, 141) }),
], [say('Quirrell', 'Ah, now *that* was number two. My, Mr Potter, have we been reading the same books?', 540, 90, { anchor: 'tc', w: 300, fixed: true, tail: 'quirrell@0' }),
   say('Quirrell', 'But no. The first item was: *I will not go around provoking strong, vicious enemies.* Now *if*, Mr Potter, by some chance you harbour an ambition similar to mine as a young Slytherin, I hope it is not your ambition to become a *stupid* Dark Lord.', 400, 520, { anchor: 'tc', w: 520, fixed: true, shape: 'box', tail: 'quirrell@1' })]);
ep.multi(1370, [
  P(18, 740, { cam: { head: 'harry', w: 520, hy: 0.5, dx: 1, dy: -140 }, bg: TI, blur: 2, actors: [HT({ expr: 'angry', pose: 'fists', turn: -0.2 }), FRONT] }),
  P(776, 576, { cam: { head: 'quirrell', w: 520, hy: 0.5, dy: -75 }, bg: ST, blur: 2, actors: [QDESK, Q({ pose: 'stand', expr: { base: 'calm', eyes: { open: 0.6 } }, turn: 0.1 })] }),
], [shout('Harry', 'Professor Quirrell, I am a *Ravenclaw*, and it is not my ambition to be stupid, *period.* I know what I did today was dumb. But it wasn\'t *Dark!* I was *not* the one who threw the first punch in that fight!', 400, 136, { anchor: 'tc', w: 460, size: 31, fixed: true }),
   say('Quirrell', 'You, Mr Potter, are an idiot. But then so was I at your age. Thus I anticipated your answer, and altered today\'s lesson plan accordingly. Mr Gregory Goyle, if you would come forward, please?', 400, 808, { anchor: 'tc', w: 520, fixed: true, shape: 'box' })]);
// Goyle
const GY = (o = {}) => ({ def: goyle, id: 'goyle', x: 1250, y: 900, s: 1.2, turn: -0.5, pose: 'fists', expr: 'determined', ...o });
const QF = (o = {}) => Q({ x: 900, y: 900, pose: 'fists', expr: 'focus', turn: 0.4, ...o });
ep.multi(1492, [
  P(18, 700, { cam: { x: 1075, y: 300, w: 860 }, bg: ST, actors: [Q({ x: 900, y: 900, pose: 'lecture', expr: 'calm', turn: 0.4 }), GY({ expr: 'worried', pose: 'stand' })] }),
  P(736, 300, { cam: { head: 'goyle', w: 440, hy: 0.5, dx: 125 }, bg: ST, blur: 3, actors: [GY({ expr: 'worried', pose: 'stand', turn: 0.3 })] }),
  P(1054, 420, { cam: { head: 'quirrell', w: 620, hy: 0.5, dx: -150, dy: -10 }, bg: ST, blur: 2, actors: [QF()] }),
], [say('Quirrell', 'Most wizards do not bother much with what a Muggle would call martial arts. Is not a wand stronger than a fist? This attitude is stupid. Wands are held in fists. Mr Goyle, I will ask you to attack me.', 400, 56, { anchor: 'tc', w: 520, fixed: true, tail: 'quirrell@0' }),
   say('Goyle', 'Professor Quirrell, can I ask what level—', 520, 820, { anchor: 'tc', w: 280, fixed: true, tail: 'goyle@1' }),
   say('Quirrell', 'Sixth *dan.* You will not be hurt, and neither will I. And if you see an opening, please take it.', 250, 1110, { anchor: 'tc', w: 320, fixed: true, tail: 'quirrell@2' })]);
// the fight: a diagonal seam between the charge and the throw
ep.multi(1276, [
  P(230, 430, { cam: { x: 1060, y: 540, w: 760 }, bg: ST, behind: (e) => FX.speedLines(e.w, e.h, { n: 30, seed: 5 }) + FX.burst(e.w, e.h, e.w * 0.52, e.h * 0.45, { n: 26, op: 0.2 }), actors: [QF({ x: 950 }), GY({ x: 1180, pose: 'run', expr: 'yell' })] }, { mood: undefined, shape: 'cut', cutBottom: 70 }),
  P(608, 650, { cam: { x: 920, y: 610, w: 1000 }, bg: ST, behind: (e) => FX.speedLines(e.w, e.h, { n: 34, seed: 9, angle: -12 }), actors: [GY({ x: 1200, y: 930, pose: 'fallBack', expr: 'yell', turn: -0.5 }), Q({ x: 1040, y: 470, pose: 'panic', expr: 'focus', turn: 0.3, rot: -80 })] }, { mood: undefined, shape: 'cut', cutTop: 70 }),
], [cap('The boy blurred forward, fists flying. The Professor blocked every blow. It was all happening too fast to follow, and then Goyle was on his back with his legs pushing, and Quirrell was actually *flying through the air…*', 44, 26, { w: 640, fixed: true })], { alt: 'A blur of fists and feet; Quirrell sails through the air.' });
ep.panel(920, { cam: { x: 1040, y: 690, w: 760 }, bg: ST, actors: [Q({ x: 820, y: 930, pose: 'fallBack', expr: 'shock', turn: 0.4 }), GY({ x: 1270, pose: 'run', expr: 'shock' })] },
  [shout('Quirrell', 'Stop! You *win!*', 200, 196, { anchor: 'tc', w: 280, fixed: true }),
   cap('Mr Goyle pulled up so sharply he staggered. His face showed utter shock. There was a silence in the classroom, a silence born of total confusion.', 44, 728, { w: 620, fixed: true })], { mood: 'candle' });
const QS2 = (o = {}) => Q({ x: 900, y: 900, turn: 0.3, ...o });
ep.multi(1372, [
  P(18, 360, { cam: { head: 'quirrell', w: 460, hy: 0.5, dx: -137, dy: 10 }, bg: ST, blur: 2, actors: [QS2({ expr: 'calm', turn: -0.1 })] }),
  P(396, 300, { cam: { head: 'goyle', w: 440, hy: 0.5, dx: 125 }, bg: ST, blur: 3, actors: [GY({ expr: 'confused', pose: 'stand', turn: 0.3 })] }),
  P(714, 640, { cam: { head: 'quirrell', w: 560, hy: 0.5, dx: 1, dy: -115 }, bg: ST, blur: 2, actors: [QS2({ expr: { base: 'calm', brows: { raise: 0.3 } }, pose: 'present', turn: 0.1 })] }),
], [say('Quirrell', 'Mr Goyle, what vitally important technique did I just demonstrate?', 250, 90, { anchor: 'tc', w: 300, fixed: true, tail: 'quirrell@0' }),
   say('Goyle', 'How to fall correctly when someone throws you?', 530, 470, { anchor: 'tc', w: 320, fixed: true }),
   say('Quirrell', 'That too. But the vitally important technique which I demonstrated was *how to lose.* You do not teach students to throw until you have taught them to fall. And I must not teach you to fight, if you do not understand how to lose.', 400, 770, { anchor: 'tc', w: 540, fixed: true, shape: 'box', tail: 'quirrell@2' })]);
// the dojo
ep.setBg('#3a2e22');
ep.beat(200, [plain('*Quirrell\'s story*', 400, 100, { font: "'IM Fell English', serif", size: 30, color: '#e9dcc0' })]);
const DJ = () => CS.dojo({});
const MS = (o = {}) => ({ def: master, id: 'master', x: 1000, y: 900, turn: 0, pose: 'stand', expr: 'calm', ...o });
const DST = (i, o = {}) => ({ def: dojoStudent(i), id: 'd' + i, y: 960, turn: 0, pose: 'stand', expr: 'calm', ...o });
const BOW = { pose: 'bow', armF: { sh: -32, el: 4 }, armB: { sh: -28, el: 4 } };
const YQ = (o = {}) => ({ def: youngQuirrell, id: 'quirrell', x: 1000, y: 1000, turn: 0, pose: 'stand', expr: 'calm', ...o });
const MEM = (e) => FX.memoryEdge(e.w, e.h);
// the Dark Lord's eyes, drawn over the sepia so the red survives (panel overlay, full colour)
const RED = (id, k = 1) => (ctx) => { const a = ctx.anchors && ctx.anchors[id]; if (!a) return ''; const u = a.hr / 60; let o = ''; for (const sx of [-1, 1]) { const x = a.head[0] + sx * 21 * u, y = a.head[1] + 4 * u; o += K.glow(x, y, 26 * u * k, '#ff2a1a', 0.85) + ellipse(x, y, 8 * u, 5 * u, { fill: '#ff3a24' }) + circle(x, y, 2.6 * u, { fill: '#ffe0a0' }); } return o; };
// Quirrell's narration sits on the dark ground between the sepia panels (no tails: he is telling it now)
const NAR = (text, y0, o = {}) => say('Quirrell', text, 400, Math.max(y0, 50), { anchor: 'tc', w: 540, fixed: true, noTail: true, ...o });
const SEPP = (y, h, art) => P(y, h, { over: MEM, ...art, bg: DJ }, { mood: 'sepia' });
ep.multi(1000, [
  // the memory opens: its edges dissolve into the dark page
  { ...SEPP(330, 652, { cam: { x: 1030, y: 420, w: 1400 }, actors: [MS({ x: 860, turn: 0.2 }), ...[0, 1, 2, 3, 4, 5].map((i) => DST(i, { x: [240, 430, 620, 1420, 1610, 1800][i], turn: i > 2 ? -0.3 : 0.3 })), YQ({ ...BOW, turn: -0.4, x: 1170, y: 1000 })] }), frame: 'dissolve', feather: 40 },
], [NAR('I learned how to lose in a *dojo* in Asia, which, as any Muggle knows, is where all the good martial artists live. Its Master was that style\'s greatest living teacher. He had no idea that magic existed, of course.', 34)],
  { alt: 'Sepia: a mountain dojo, polished wooden floor, paper screens, snowy peaks beyond. An old Master; students in white; a young Quirrell bowing.' });
ep.multi(1790, [
  // he loses control: the panel lurches
  { ...SEPP(450, 520, { cam: { x: 935, y: 610, w: 1000 }, actors: [MS({ x: 640, turn: 0.3, expr: 'stern' }), DST(0, { x: 1230, y: 990, pose: 'fallBack', expr: 'hurt', turn: -0.4 }), YQ({ x: 960, pose: 'run', expr: 'angry', turn: 0.5 })], over: (e) => MEM(e) + FX.burst(e.w, e.h, e.w * 0.66, e.h * 0.62, { n: 22, op: 0.18 }) }), shape: 'slant', slant: 60 },
  SEPP(1252, 520, { cam: { x: 1250, y: 700, w: 900 }, actors: [DST(2, { x: 1420, turn: -0.3, pose: 'crossArms', expr: 'stern' }), DST(3, { x: 1590, turn: -0.3, pose: 'crossArms', expr: 'stern' }), DST(4, { x: 1760, turn: -0.3, pose: 'stand', expr: 'stern' }), DST(1, { x: 1200, turn: -0.4, pose: 'reach', expr: 'stern' }), YQ({ x: 1000, pose: 'fallBack', expr: 'hurt', turn: 0.3 })] }),
], [NAR('During one of my first fights, after I had been beaten in a particularly humiliating fashion, I lost control and attacked my sparring partner. The Master told me there was a flaw in my temperament. And then he said that I would learn how to lose.', 40),
   NAR('One by one, the students approached me. I was *not* to defend myself. They pushed me to the ground. And to each one, I had to say, "I lose."', 1010)]);
ep.multi(1150, [
  SEPP(486, 646, { cam: { x: 980, y: 610, w: 720 }, actors: [MS({ x: 800, turn: 0.3, expr: { base: 'calm', eyes: { soft: true } } }), YQ({ x: 1160, y: 900, ...BOW, turn: -0.4 })] }),
], [NAR('I was a prodigy of Battle Magic even then. With wandless magic alone, I could have killed everyone in that dojo. I did not. I learned to lose. When I left, the Master told me he hoped I understood why it had been necessary. I told him it was one of the most valuable lessons I had ever learned. Which was, and is, true.', 66, { shape: 'box' })],
  { alt: 'Young Quirrell bows to the Master in farewell.' });
const DL = (o = {}) => ({ def: darkLord, id: 'darklord', x: 1450, y: 960, turn: 0, pose: 'stand', expr: 'cold', ...o });
ep.multi(1754, [
  { ...SEPP(400, 620, { cam: { x: 1060, y: 520, w: 1100 }, actors: [MS({ x: 640, turn: 0.3, expr: 'stern' }), DST(3, { x: 950, turn: 0.4, pose: 'fists', expr: 'horror' }), DST(4, { x: 1110, turn: 0.4, pose: 'fists', expr: 'horror' }), DL()] }), overlay: RED('darklord', 1.2) },
  // the Dark Lord's eyes, in an eye-shaped panel
  { ...SEPP(1038, 280, { cam: { on: ['darklord'], fr: 'eyes' }, actors: [DL()], over: (e) => MEM(e) + rect(0, 0, e.w, e.h, { fill: '#140a06', opacity: 0.35 }) }), overlay: RED('darklord', 0.9), shape: 'eye' },
  SEPP(1336, 400, { cam: { head: 'master', w: 440, hy: 0.5, dx: -130, dy: 10 }, blur: 3, actors: [MS({ x: 640, turn: 0.3, expr: 'stern' })] }),
], [NAR('Not long afterwards, another would-be student came to that hidden place. *He-Who-Must-Not-Be-Named.* He came openly, glowing red eyes and all. And he demanded—not asked but *demanded*—to be taught.', 34),
   say('Quirrell', 'The Master refused. The Dark Lord asked why he could not be a student. The Master told him: *he had no patience.*', 260, 1372, { anchor: 'tc', w: 320, fixed: true, noTail: true })],
  { alt: 'A dark figure with glowing red eyes stands in the open side of the dojo. The Master faces him.' });
const BOKKEN = () => g({ transform: 'translate(980,1010) rotate(-8)' }, P2.bokken(1.6));
// all that is left: the practice sword, alone on the dark page (a cut-out)
const BOKKEN0 = () => g({ style: 'filter: sepia(0.75) brightness(0.9)' }, ellipse(985, 1030, 240, 12, { fill: '#000', opacity: 0.4, filter: 'url(#blur3)' }), BOKKEN());
ep.multi(1150, [
  { ...SEPP(450, 190, { cam: { x: 990, y: 1010, w: 700 }, actors: [BOKKEN0], over: () => '' }), cutout: true, border: 'none' },
  SEPP(678, 454, { cam: { x: 1233, y: 700, w: 1100 }, actors: [DST(5, { id: 'survivor', x: 1560, y: 980, pose: 'kneel', turn: 0.2, expr: 'blank', filter: 'brightness(0.12)' })], over: (e) => MEM(e) + rect(0, 0, e.w, e.h, { fill: '#1a1210', opacity: 0.3 }) }),
], [NAR('You can guess what happened next. The students tried to rush him, and fell, stunned where they stood. And then, one by one, the Dark Lord hurt the Master\'s students until they went mad, and then he killed them, while the Master was forced to watch. And then the Master.', 36),
   say('Quirrell', 'I learned this from the single surviving student, whom the Dark Lord left alive to tell the tale. He had been a friend of mine.', 240, 718, { anchor: 'tc', w: 340, fixed: true, noTail: true, shape: 'box' })],
  { alt: 'The dojo, empty. A wooden practice sword lies on the floor. Later, one figure kneels alone in silhouette.' });
ep.setBg(C.paper);
ep.multi(1080, [
  P(18, 380, { cam: { head: 'quirrell', hw: 0.2, hx: 0.75, hy: 0.6 }, bg: ST, blur: 2, actors: [QDESK, Q({ turn: 0.85, expr: 'sad' })] }),
  P(416, 646, { cam: { head: 'quirrell', w: 500, hy: 0.5, dy: -85 }, bg: ST, blur: 2, actors: [QDESK, Q({ turn: 0.1, expr: { base: 'calm', eyes: { open: 0.7 } } })] }),
], [cap('Professor Quirrell turned away. When he turned back a moment later, he once again seemed calm and composed.', 44, 36, { w: 400, fixed: true }),
   say('Quirrell', 'Dark Wizards cannot keep their tempers. It is a nearly universal flaw of the species. Understand that the Dark Lord did *not* win that day. His goal was to learn martial arts, and he left without a single lesson.', 400, 464, { anchor: 'tc', w: 540, fixed: true, shape: 'box', tail: 'quirrell@1' })]);
ep.multi(800, [
  P(18, 460, { cam: { head: 'quirrell', hw: 0.24, hx: 0.72, hy: 0.52 }, bg: ST, blur: 2, actors: [QDESK, Q({ expr: { base: 'calm', eyes: { style: 'cold', open: 0.75 } }, pose: 'point', turn: 0.3 })], over: (e) => FX.doom(e.w, e.h, 143) }),
  P(496, 286, { cam: { head: 'harry', hw: 0.3, hx: 0.27, hy: 0.56 }, bg: TI, blur: 3, actors: [HT({ expr: 'sad', turn: -0.3 }), FRONT] }),
], [say('Quirrell', 'Harry Potter. What *precisely* did you do wrong today?', 240, 110, { anchor: 'tc', w: 300, fixed: true }),
   say('Harry', 'I lost my temper.', 560, 580, { anchor: 'tc', w: 240, fixed: true })]);
// The dominance contest, drawn like a page from a naturalist's sketchbook: two stags with locked antlers, two cats with claws in.
const INK = { stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
const limb = (d, col, w = 15) => path(d, { fill: 'none', stroke: C.ink, 'stroke-width': w + 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }) + path(d, { fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
function stag(col, dark) {
  const antler = 'M196,-226 Q214,-282 262,-286 Q300,-286 318,-252 M226,-270 Q222,-306 236,-322 M252,-285 Q262,-318 284,-330 M284,-282 Q306,-296 322,-292 M306,-266 Q326,-262 336,-240';
  return g({},
    limb('M-86,-170 Q-118,-90 -150,-8', dark), limb('M72,-164 Q86,-90 110,-6', dark),
    path('M-150,-8 l-14,8 l22,0Z M110,-6 l0,8 l24,-2Z', { fill: C.ink }),
    path('M-138,-196 Q-150,-266 -64,-270 L78,-264 Q146,-260 150,-206 Q146,-150 84,-148 L-84,-150 Q-140,-150 -138,-196Z', { fill: col, ...INK }),
    path('M-86,-154 Q0,-138 84,-152 Q2,-176 -86,-154Z', { fill: '#efe0c2' }),
    path('M-138,-236 q-22,-6 -18,16 q10,10 20,2Z', { fill: '#f6efe0', ...INK }),
    limb('M-104,-176 Q-140,-96 -176,-10', col), limb('M96,-166 Q116,-92 142,-8', col),
    path('M-176,-10 l-14,10 l24,0Z M142,-8 l2,10 l24,-4Z', { fill: C.ink }),
    path('M92,-262 Q154,-256 192,-226 L184,-184 Q142,-178 108,-158Z', { fill: col, ...INK }),
    g({ transform: 'translate(206,-200) rotate(38)' }, ellipse(0, 0, 40, 23, { fill: col, ...INK }), ellipse(30, 2, 9, 7, { fill: C.ink })),
    path('M182,-230 q-26,-20 -30,-6 q10,14 30,14Z', { fill: col, ...INK }),
    circle(200, -212, 4.5, { fill: C.ink }), path('M193,-219 q7,-4 13,0', { fill: 'none', stroke: C.ink, 'stroke-width': 2 }),
    path(antler, { fill: 'none', stroke: C.ink, 'stroke-width': 13, 'stroke-linecap': 'round' }) + path(antler, { fill: 'none', stroke: '#eadcbc', 'stroke-width': 7, 'stroke-linecap': 'round' }));
}
function cat(col, stripe, px = 118, py = -176) {
  const paw = `M40,-120 Q${(40 + px) / 2 + 10},${(-120 + py) / 2 - 16} ${px},${py}`;
  const tail = 'M-66,-10 q-60,10 -64,-40 q0,-26 20,-30';
  return g({},
    path(tail, { fill: 'none', stroke: C.ink, 'stroke-width': 17, 'stroke-linecap': 'round' }) + path(tail, { fill: 'none', stroke: col, 'stroke-width': 11, 'stroke-linecap': 'round' }),
    path('M-70,0 Q-96,-90 -40,-140 Q10,-170 44,-120 Q70,-60 40,0Z', { fill: col, ...INK }),
    path('M-40,-100 q20,-8 40,0 M-50,-70 q26,-8 52,0', { fill: 'none', stroke: stripe, 'stroke-width': 6, 'stroke-linecap': 'round' }),
    limb(paw, col, 16), circle(px + 4, py - 3, 14, { fill: col, ...INK }), path(`M${px - 2},${py - 12} l4,8 M${px + 6},${py - 14} l2,9`, { stroke: C.ink, 'stroke-width': 1.6 }),
    circle(10, -176, 46, { fill: col, ...INK }),
    path('M-26,-204 L-34,-246 L-2,-218Z M22,-218 L48,-244 L50,-200Z', { fill: col, ...INK }),
    path('M-22,-212 L-28,-234 L-10,-218Z M28,-216 L44,-234 L44,-206Z', { fill: '#e9a9a0' }),
    path('M-10,-188 l13,5 M36,-188 l-13,5', { fill: 'none', stroke: C.ink, 'stroke-width': 3.4, 'stroke-linecap': 'round' }),
    path('M12,-166 l-5,-5 l10,0Z', { fill: '#c9706a' }), path('M12,-166 q-6,8 -12,4 M12,-166 q6,8 12,4', { fill: 'none', stroke: C.ink, 'stroke-width': 2 }),
    path('M-18,-166 l-30,-4 M-18,-160 l-28,4 M42,-166 l30,-6 M42,-160 l28,2', { stroke: C.ink, 'stroke-width': 1.4, opacity: 0.7 }));
}
const SKETCH = (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#efe3c6' }) + rect(0, ctx.h * 0.8, ctx.w, ctx.h * 0.2, { fill: '#e4d3ae' });
const STAGS = (ctx) => { const cx = ctx.w / 2, gy = ctx.h * 0.9; return SKETCH(ctx) + path(`M20,${gy} Q${cx},${gy - 14} ${ctx.w - 20},${gy}`, { fill: 'none', stroke: '#a88a5a', 'stroke-width': 3 }) +
  g({ transform: `translate(${cx - 190},${gy}) scale(0.82)` }, stag('#9a6a42', '#7a5234')) + g({ transform: `translate(${cx + 190},${gy}) scale(-0.82,0.82)` }, stag('#86603e', '#684a30')) +
  g({ opacity: 0.5 }, path(`M${cx - 20},${gy - 300} l-10,-26 M${cx + 6},${gy - 306} l0,-30 M${cx + 30},${gy - 300} l12,-24`, { stroke: C.ink, 'stroke-width': 3, 'stroke-linecap': 'round' })); };
const CATS = (ctx) => { const cx = ctx.w / 2, gy = ctx.h * 0.92; return SKETCH(ctx) + g({ transform: `translate(${cx - 150},${gy}) scale(0.9) rotate(4)` }, cat('#e3a25a', '#b8742e', 150, -214)) + g({ transform: `translate(${cx + 150},${gy}) scale(-0.9,0.9)` }, cat('#8a8a90', '#5e5e66', 104, -138))
  + path(`M${cx - 30},${gy - 250} q30,-14 52,6 M${cx - 34},${gy - 228} q24,-8 40,4`, { fill: 'none', stroke: C.ink, 'stroke-width': 2.4, 'stroke-linecap': 'round', opacity: 0.6 }); };
ep.multi(1560, [
  // two torn-out pages of a naturalist's sketchbook, laid on the page
  { x: 40, y: 566, w: 720, h: 484, art: STAGS, shape: 'torn', seed: 8, tear: 12, frame: 'paper', rotate: -1.5, shadow: true },
  { x: 40, y: 1086, w: 720, h: 456, art: CATS, shape: 'torn', seed: 13, tear: 12, frame: 'paper', rotate: 1.2, shadow: true },
], [say('Quirrell', 'That is *not* precise. Many animals have dominance contests. They rush at each other with horns—trying to knock each other down, not gore each other. They fight with their claws *sheathed.* Surely with claws out they would stand a better chance? But then their enemy might unsheathe *theirs*, and both might be badly hurt.', 400, 72, { anchor: 'tc', w: 540, fixed: true, noTail: true }),
   cap('Stags lock horns to push, not to kill. Cats fight with their claws in.', 64, 1114, { w: 420, fixed: true })], { alt: 'A naturalist\'s sketch: two stags with antlers locked, pushing; below, two cats swatting at each other with soft, clawless paws.' });
// the whole year in the tiers (reverse shot from the stage). o.a(k, i, x) → overrides; o.skip(k, i, x); o.extra[k] → more actors in row k
const CLASS = (o = {}) => {
  const out = [];
  for (let k = 4; k >= 1; k--) {
    for (let i = 0; i < 6; i++) {
      const x = 250 + i * 300 + (k % 2) * 150;
      if (o.skip && o.skip(k, i, x)) continue;
      out.push({ def: student(2500 + k * 10 + i, ['r', 'g', 'h', 's'][(i + k) % 4]), id: `c${k}${i}`, x, y: rowY(k), s: 1.05, turn: 0, pose: 'sit', seat: 140, expr: 'neutral', ...(o.a ? o.a(k, i, x) : {}) });
    }
    out.push(...(o.extra?.[k] ?? []));
    out.push(() => CS.tierFront(k, { screens: [] }));
  }
  return out;
};
const NEAR = (k, i, x) => (k === 4 && Math.abs(x - 1450) < 160) || (k === 1 && Math.abs(x - 1000) < 160);
const QL = (o = {}) => Q({ pose: 'lecture', expr: 'stern', turn: 0.15, ...o });
ep.multi(1414, [
  P(18, 680, { cam: { head: 'quirrell', w: 560, hy: 0.5, dx: 60, dy: -135 }, bg: ST, blur: 2, actors: [QDESK, QL()] }),
  P(716, 680, { cam: { head: 'quirrell', w: 440, hy: 0.5, dy: -125 }, bg: ST, blur: 3, actors: [Q({ turn: 0.05, expr: { base: 'stern', eyes: { style: 'cold', open: 0.7 } } })], over: (e) => FX.doom(e.w, e.h, 144) }),
], [say('Quirrell', 'What you demonstrated today, Mr Potter, is that you do not know how to *lose* a dominance contest. When a *Hogwarts professor* challenged you, you did not back down. When it looked like you might lose, you unsheathed your claws, heedless of the danger.', 400, 62, { anchor: 'tc', w: 540, fixed: true, tail: 'quirrell@0' }),
   say('Quirrell', 'You *escalated*, and then you escalated *again.* It started with a slap, and soon you were talking about leaving Hogwarts. The fact that you escalated even further in some unknown direction, and somehow won at the end, does not change the fact that you are an idiot.', 400, 760, { anchor: 'tc', w: 540, fixed: true, shape: 'box', tail: 'quirrell@1' })]);
ep.multi(1320, [
  P(18, 540, { cam: { head: 'harry', w: 440, hy: 0.5, dy: -60 }, bg: TI, blur: 3, actors: [HT({ expr: 'horror', pose: 'stand' }), FRONT] }),
  P(576, 726, { cam: { x: 1150, y: -50, w: 1300 }, bg: TI, actors: CLASS({ skip: NEAR, a: (k) => ({ turn: k === 4 ? -0.2 : 0.3, expr: 'worried' }), extra: { 4: [HT({ expr: 'horror', pose: 'stand' })], 1: [DS({ x: 1000, turn: 0.4, expr: 'worried' })] } }) }),
], [cap('That *had* been precise. *Frighteningly* precise. When someone\'s model of you was that good, you had to wonder whether they were right about other things too. Like your intent to kill.', 44, 36, { w: 620, fixed: true }),
   say('Quirrell', 'The *next* time you choose to escalate rather than lose, you may lose *all* the stakes on the table. I cannot guess what they were today. I can guess that they were far, far too high for ten House points.', 400, 598, { anchor: 'tc', w: 620, fixed: true, noTail: true, shape: 'box' })],
  { alt: 'Like the fate of magical Britain. That was what he had bet.' });
ep.multi(1200, [
  P(18, 380, { cam: { head: 'quirrell', w: 460, hy: 0.5, dx: -153 }, bg: ST, blur: 2, actors: [QDESK, Q({ pose: 'point', expr: 'stern', turn: 0.3 })] }),
  P(416, 766, { cam: { head: 'harry', w: 520, hy: 0.5, dx: 1, dy: -130 }, bg: TI, blur: 2, actors: [HT({ expr: { base: 'sad', eyes: { lookY: 0.3 } }, pose: 'stand', turn: -0.2 }), FRONT] }),
], [say('Quirrell', 'You will protest that you were trying to help all of Hogwarts. That is a *lie.* If you had been—', 240, 90, { anchor: 'tc', w: 300, fixed: true, tail: 'quirrell@0' }),
   say('Harry', 'I would have taken the slap, waited, and picked the best possible time to make my move. But that would have meant *losing.* Letting him be dominant over me. It was what the Dark Lord couldn\'t do, with the Master he wanted to learn from.', 400, 470, { anchor: 'tc', w: 540, fixed: true })]);
ep.multi(1420, [
  P(18, 420, { cam: { head: 'quirrell', w: 500, hy: 0.5, dx: -152, dy: -10 }, bg: ST, blur: 2, actors: [QDESK, Q({ pose: 'present', expr: 'calm', turn: 0.3 })] }),
  P(456, 290, { cam: { head: 'harry', w: 420, hy: 0.5, dx: 131, dy: 10 }, bg: TI, blur: 3, actors: [HT({ expr: 'pleading', pose: 'stand', turn: -0.3 }), FRONT] }),
  P(764, 638, { cam: { head: 'quirrell', w: 540, hy: 0.5, dy: -120 }, bg: ST, blur: 2, actors: [QDESK, Q({ pose: 'raiseHand', expr: 'stern', turn: 0.1 })] }),
], [say('Quirrell', 'I see that you have understood perfectly. And so, Mr Potter, today you are going to learn how to lose.', 240, 80, { anchor: 'tc', w: 300, fixed: true, tail: 'quirrell@0' }),
   say('Harry', 'Professor Quirrell… can we do this some other time?', 540, 520, { anchor: 'tc', w: 300, fixed: true }),
   say('Quirrell', 'No. You are five days into your Hogwarts education, and already this has happened. Today is Friday. Our next class is Wednesday. Saturday, Sunday, Monday, Tuesday, Wednesday… No, we do *not* have time to wait.', 400, 804, { anchor: 'tc', w: 540, fixed: true, tail: 'quirrell@2' })]);
ep.multi(1200, [
  P(18, 420, { cam: { head: 'quirrell', w: 480, hy: 0.5, dx: 142, dy: -10 }, bg: ST, blur: 2, actors: [QDESK, Q({ pose: 'gesture', expr: 'coldSmile', turn: -0.2 })] }),
  P(456, 726, { cam: { x: 1160, y: 150, w: 900 }, bg: ST, actors: [QDESK, Q({ pose: 'point', expr: 'calm', turn: 0.5 }), GY({ x: 1380, y: 730, pose: 'stand', expr: 'worried', turn: -0.4 })] }),
], [say('Quirrell', 'Unfortunately, I am told that your fingers are already powerful weapons. Do not snap them at any time during this lesson.', 556, 60, { anchor: 'tc', w: 330, fixed: true, shape: 'box', tail: 'quirrell@0' }),
   say('Quirrell', 'The point is *not* to avoid getting angry. Anger is natural. You need to learn how to lose even when you are angry. Or at least *pretend* to lose, so that you can *plan* your vengeance. As I did with Mr Goyle today…', 400, 500, { anchor: 'tc', w: 540, fixed: true, tail: 'quirrell@1' })]);
// Goyle's panic jumps off the page at us (a cut-out)
ep.cutout(1000, { cam: { head: 'goyle', hw: 0.25, hx: 0.5, hy: 0.52 }, actors: [GY({ x: 1300, pose: 'panic', expr: 'horror', turn: -0.2 })], over: (e) => { const a = e.anchors.goyle; return a ? FX.emanata(a.head[0], a.head[1], a.hr * 2.2, { n: 3, a0: -200, a1: -150 }) + FX.emanata(a.head[0], a.head[1], a.hr * 2.2, { n: 3, a0: -30, a1: 20 }) : ''; } },
  [shout('Goyle', 'I\'m not better than you! I know you didn\'t really lose! Please don\'t plan any vengeances!', 400, 92, { anchor: 'tc', w: 500, fixed: true })]);
ep.multi(1000, [
  P(18, 400, { cam: { head: 'harry', w: 460, hy: 0.5, dx: -139 }, bg: TI, blur: 2, actors: [HT({ expr: 'worried', pose: 'stand', turn: -0.3 }), FRONT] }),
  P(436, 250, { cam: { head: 'quirrell', w: 380, hy: 0.5, dx: 111 }, bg: ST, blur: 3, actors: [Q({ turn: -0.1, expr: { base: 'calm', eyes: { open: 0.8 } } })] }),
  P(704, 278, { cam: { head: 'harry', w: 420, hy: 0.5, dx: -129 }, bg: TI, blur: 3, actors: [HT({ expr: 'determined', pose: 'stand', turn: -0.3 }), FRONT] }),
], [say('Harry', 'Professor Quirrell, do you really believe that if I don\'t do this, I might hurt someone?', 250, 90, { anchor: 'tc', w: 330, fixed: true }),
   say('Quirrell', 'Yes.', 560, 520, { anchor: 'tc', w: 120, fixed: true }),
   say('Harry', 'Then I\'ll do it.', 250, 800, { anchor: 'tc', w: 240, fixed: true })]);
const FIVE = (k, i) => (k === 2 && i >= 1 && i <= 4) || (k === 1 && i === 4);
const FIVEID = (k, i) => (k === 2 && i === 3 ? 'zabini' : `c${k}${i}`);
const FIVEDEF = (k, i) => (k === 2 && i === 3 ? zabini : student(2500 + k * 10 + i, 's'));
// a hand held high over a seated student's head (world coords from the placed actor)
const HANDUP = (id, skin = '#e9c8aa') => (e) => { const a = e.wa[id]; if (!a) return ''; const r = a.hr, x0 = a.head[0] + r * 0.95, y0 = a.head[1] + r * 1.5, x1 = a.head[0] + r * 1.25, y1 = a.head[1] - r * 1.7;
  return path(`M${x0},${y0} Q${x0 + r * 0.5},${(y0 + y1) / 2} ${x1},${y1}`, { fill: 'none', stroke: C.ink, 'stroke-width': r * 0.52, 'stroke-linecap': 'round' }) + path(`M${x0},${y0} Q${x0 + r * 0.5},${(y0 + y1) / 2} ${x1},${y1}`, { fill: 'none', stroke: '#1f1d24', 'stroke-width': r * 0.4, 'stroke-linecap': 'round' })
    + ellipse(x1, y1 - r * 0.28, r * 0.24, r * 0.32, { fill: skin, stroke: C.ink, 'stroke-width': r * 0.06 }); };
const HANDS = (k) => [0, 1, 2, 3, 4, 5].filter((i) => FIVE(k, i)).map((i) => HANDUP(FIVEID(k, i), FIVEDEF(k, i).skin));
ep.panel(930, { cam: { x: 1150, y: 40, w: 1400 }, bg: TI, actors: CLASS({ skip: NEAR, a: (k, i) => FIVE(k, i) ? { def: FIVEDEF(k, i), id: FIVEID(k, i), expr: 'grin', turn: 0.1 } : { expr: 'neutral' }, extra: { 4: [HT({ expr: 'deadpan', pose: 'stand' })], 2: HANDS(2), 1: [DS({ x: 1000, expr: 'neutral' }), ...HANDS(1)] } }) },
  [say('Quirrell', 'So, with the full approval of your teacher, and in such a fashion that Snape cannot be blamed: do any of you wish to show your dominance over the Boy-Who-Lived?', 400, 50, { anchor: 'tc', w: 540, fixed: true, noTail: true }),
   cap('Five hands went up.', 44, 834, { w: 300, fixed: true })], { mood: 'candle' });
ep.multi(1478, [
  P(18, 640, { cam: { head: 'quirrell', w: 600, hy: 0.5, dx: 38, dy: -172 }, bg: ST, blur: 2, actors: [QDESK, Q({ pose: 'point', expr: 'exasperated', turn: 0.3 })] }),
  P(676, 380, { cam: { head: 'quirrell', w: 440, hy: 0.5, dx: -140 }, bg: ST, blur: 3, actors: [Q({ turn: 0.1, expr: { base: 'stern', eyes: { style: 'cold', open: 0.7 } } })], over: (e) => FX.doom(e.w, e.h, 145) }),
  P(1074, 386, { cam: { x: 1150, y: 440, w: 1100 }, bg: TI, actors: CLASS({ skip: NEAR, a: (k, i) => FIVE(k, i) ? { def: FIVEDEF(k, i), id: FIVEID(k, i), expr: 'embarrassed', turn: 0.1 } : { expr: 'neutral' }, extra: { 1: [DS({ x: 1000, expr: 'smug' })] } }) }),
], [shout('Quirrell', 'Everyone with your hand raised, you are an absolute idiot. What part of *pretending* to lose did you not understand?', 400, 110, { anchor: 'tc', w: 380, size: 32, fixed: true, tail: 'quirrell@0' }),
   say('Quirrell', 'If Harry Potter does become the next Dark Lord, he will hunt you down and kill you after he graduates.', 240, 720, { anchor: 'tc', w: 300, fixed: true, tail: 'quirrell@1' }),
   cap('The five hands dropped abruptly.', 44, 1092, { w: 420, fixed: true })]);
ep.multi(1190, [
  P(18, 460, { cam: { head: 'harry', w: 460, hy: 0.5, dx: -139, dy: -20 }, bg: TI, blur: 2, actors: [HT({ expr: 'exasperated', pose: 'stand', turn: -0.3 }), FRONT] }),
  P(496, 340, { cam: { head: 'quirrell', w: 440, hy: 0.5, dx: 141 }, bg: ST, blur: 3, actors: [Q({ turn: -0.1, expr: 'calm' })] }),
  P(854, 318, { cam: { head: 'harry', w: 440, hy: 0.5, dx: -139 }, bg: TI, blur: 3, actors: [HT({ expr: 'smug', pose: 'stand', turn: -0.3 }), FRONT] }),
], [say('Harry', 'I won\'t. I swear never to take vengeance upon those who help me learn to lose. Professor Quirrell, would you *please* stop that?', 262, 80, { anchor: 'tc', w: 380, fixed: true, shape: 'box' }),
   say('Quirrell', 'I *am* sorry, Mr Potter. Would it be acceptable if I awarded you a Quirrell point in apology?', 530, 516, { anchor: 'tc', w: 400, fixed: true, shape: 'box' }),
   say('Harry', 'Make it two. And after I graduate, I\'m going to hunt you down and *tickle* you.', 250, 890, { anchor: 'tc', w: 320, fixed: true })],
  { alt: 'Laughter, defusing some of the tension. Quirrell doesn\'t smile.' });
// Draco
ep.multi(1460, [
  P(18, 420, { cam: { head: 'draco', w: 480, hy: 0.5, dx: -148, dy: -20 }, bg: TI, blur: 2, actors: [DS({ x: 1000, pose: 'stand', expr: 'determined', turn: -0.2 }), FRONT1] }),
  P(456, 460, { cam: { x: 1150, y: 150, w: 1300 }, bg: TI, actors: CLASS({ skip: NEAR, a: (k, i) => ({ expr: (i + k) % 3 ? 'shock' : 'gasp', turn: 0.2 }), extra: { 4: [HT({ expr: 'shock', pose: 'stand' })], 1: [DS({ x: 1000, pose: 'stand', expr: 'determined' })] } }) }),
  P(934, 508, { cam: { head: 'draco', w: 480, hy: 0.5, dx: 2, dy: -60 }, bg: TI, blur: 3, actors: [DS({ x: 1000, pose: 'stand', expr: { base: 'determined', brows: { raise: -0.2 } }, turn: -0.1 }), FRONT1] }),
], [say('Draco', 'Professor. It is also not *my* ambition to become a stupid Dark Lord.', 250, 90, { anchor: 'tc', w: 320, fixed: true, tail: 'draco@0' }),
   cap('There was a shocked silence in the classroom.', 44, 474, { w: 520, fixed: true }),
   say('Draco', 'When it comes to talking, maybe my father taught me. Not when it comes to being shoved around. I want to be *fully as strong as you*, Professor Quirrell.', 400, 966, { anchor: 'tc', w: 520, fixed: true, tail: 'draco@2' })]);
ep.panel(430, { cam: { head: 'harry', w: 460, hy: 0.5, dx: -149, dy: 10 }, bg: TI, blur: 3, actors: [HT({ expr: 'awe', pose: 'stand', turn: -0.3 }), FRONT] },
  [inner('Harry', '*You don\'t have to do this!* If Draco had intended to impress him, it was working perfectly.', 44, 110, { anchor: 'tl', w: 330, fixed: true })], { mood: 'candle' });
ep.multi(1274, [
  P(18, 620, { cam: { head: 'quirrell', w: 540, hy: 0.5, dx: -1, dy: -100 }, bg: ST, blur: 2, actors: [QDESK, Q({ pose: 'stand', expr: { base: 'calm', brows: { raise: 0.7 } }, turn: 0.2 })] }),
  P(656, 600, { cam: { x: 1240, y: 140, w: 1300 }, bg: TI, actors: CLASS({ skip: (k, i, x) => NEAR(k, i, x) || (k === 1 && i === 1), a: (k, i) => ({ expr: (i + k) % 2 ? 'worried' : 'blank', turn: 0.1 }), extra: { 4: [HT({ expr: 'neutral', pose: 'sit' })], 1: [DS({ x: 1000, expr: 'calm' })] } }) }),
], [say('Quirrell', 'It is my professional opinion that you are already very strong, Mr Malfoy. Draco Malfoy will be one of the generals of your year\'s armies, should he deign to engage in that activity.', 400, 50, { anchor: 'tc', w: 540, fixed: true, tail: 'quirrell@0' }),
   say('Quirrell', 'Does anyone else wish to become strong?', 400, 676, { anchor: 'tc', w: 420, fixed: true, noTail: true }),
   cap('No-one spoke.', 44, 1180, { w: 220, fixed: true })], { mood: 'candle' });

// ---------------------------------------------------------------- the mat
const MAT = () => CS.defenceStage({ mat: 1100 });
const H = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1100, y: 900, s: 1.1, turn: 0.2, pose: 'stand', expr: 'worried', ...o });
const DK = (o = {}) => ({ def: derrick, id: 'derrick', x: 1330, y: 900, s: 1.4, turn: -0.4, pose: 'stand', expr: 'grin', ...o });
// on hands and knees, facing right
const ALLFOURS = { hipY: 'kneel', lean: 55, legF: { hip: -5, knee: -90 }, legB: { hip: 5, knee: -90 }, armF: { sh: -40, el: 0, hand: 'palm' }, armB: { sh: -30, el: 0, hand: 'palm' }, headTilt: -20 };
// the thirteen: a back arc behind the mat, two at the sides, and two huge in the foreground (Derrick is the thirteenth)
const RING = (o = {}) => {
  const e = o.expr || 'grin', sk = o.skip || [];
  const spots = [[700, 810], [830, 800], [960, 795], [1240, 795], [1370, 800], [1500, 810], [1090, 790], [590, 880], [1620, 880], [1730, 870]];
  const out = spots.map(([x, y], i) => ({ def: slyTeen(i + 4), id: 'ring' + i, x, y, s: 1.28, turn: x > 1100 ? -0.35 : 0.35, pose: ['crossArms', 'handsHips', 'crossArms', 'fists', 'crossArms', 'handsHips'][i % 6], expr: e })).filter((a, i) => !sk.includes(i));
  if (!o.noFront) out.push({ def: slyTeen(15), id: 'ringF1', x: 560, y: 1160, s: 1.55, turn: 0.5, pose: 'crossArms', expr: e }, { def: slyTeen(16), id: 'ringF2', x: 1660, y: 1170, s: 1.55, turn: -0.5, pose: 'handsHips', expr: e });
  return out;
};
const WANDPOUCH = () => g({}, g({ transform: 'translate(900,533) rotate(-86)' }, wand(120)), g({ transform: 'translate(1080,530) scale(0.9)' }, pouch(1)));
ep.multi(1030, [
  P(18, 640, { cam: { x: 1040, y: 560, w: 900 }, bg: MAT, actors: [WANDPOUCH, H({ expr: 'focus', turn: 0.1 })] }),
  // the wand and pouch he gave up, set down on the page itself (a cut-out)
  { ...P(824, 190, { cam: { x: 995, y: 527, w: 380 }, actors: [() => ellipse(990, 545, 190, 12, { fill: '#3a2a1a', opacity: 0.25, filter: 'url(#blur3)' }), WANDPOUCH] }), cutout: true, border: 'none' },
], [cap('Harry stood on a soft blue mat, such as might be found in a Muggle *dojo.* His wand lay on Professor Quirrell\'s desk, because otherwise he might try to jam it through someone\'s eye socket. His pouch lay there too.', 44, 36, { w: 620, fixed: true }),
   cap('He had pleaded with Professor Quirrell to Transfigure boxing gloves onto his hands. Professor Quirrell had given him a look of silent understanding, and refused.', 44, 694, { w: 620, fixed: true })]);
ep.panel(520, { cam: { head: 'harry', w: 440, hy: 0.5, dx: -148, dy: 10 }, bg: MAT, blur: 3, actors: [H({ expr: 'pained', turn: -0.2 })] },
  [inner('Harry', '*I will not go for their eyes, I will not go for their eyes, I will not go for their eyes. It would be the end of my life in Hogwarts.*', 44, 70, { anchor: 'tl', w: 370, fixed: true })], { mood: 'candle' });
ep.bleed(1250, { cam: { x: 1100, y: 640, w: 1500 }, bg: MAT, actors: [...RING().slice(0, 10), DK({ pose: 'handsHips', x: 1340, y: 905 }), H({ turn: 0.1 }), ...RING().slice(10).map((a) => a.id === 'ringF1' ? { ...a, x: 470 } : a), Q({ x: 720, y: 1140, s: 1.45, turn: 0.4, pose: 'lecture', expr: 'stern' })] },
  [cap('Professor Quirrell returned, escorting thirteen older Slytherins. Harry recognised one of them as the one he\'d hit with a pie. Two others from that confrontation were there too. The one who\'d said to stop, that they really shouldn\'t do this, was missing.', 44, 40, { w: 640, fixed: true }),
   say('Quirrell', 'Potter is *not* to be really hurt. Any and all *accidents* will be treated as deliberate. Then please feel free to take the Boy-Who-Lived down a few pegs.', 364, 1192, { anchor: 'bc', w: 500, fixed: true, tail: [200, 830] })], { alt: 'Harry, small, in the middle of a ring of big grinning Slytherin teenagers.' });
// Derrick is too tall for the panel: his head breaks out over the top edge
ep.panel(1010, { cam: { x: 1210, y: 765, w: 720 }, bg: MAT, actors: [H({ expr: 'horror', turn: 0.4 }), DK({ pose: 'handsHips', expr: 'grin', x: 1360 })] },
  [say('Quirrell', 'Potter, meet Mr Peregrine Derrick. He is better than you, and he is about to show you that.', 56, 40, { anchor: 'tl', w: 356, fixed: true, noTail: true }),
   cap('A teenage boy fully half a metre taller than Harry, with defined muscles, facial hair, and a grin of terrible anticipation.', 44, 850, { w: 620, fixed: true })], { mood: 'candle', breakout: 'top', ph: 812, panel: { y: 180 } });
ep.multi(1240, [
  P(18, 400, { cam: { head: 'quirrell', w: 480, hy: 0.5, dx: -153 }, bg: MAT, blur: 2, actors: [Q({ x: 500, y: 900, turn: 0.4, expr: 'calm' })] }),
  P(436, 460, { cam: { x: 1200, y: 540, w: 720 }, bg: MAT, actors: [H({ expr: { base: 'angry', mouth: { type: 'grit' } }, pose: 'cower', turn: 0.4 }), DK({ expr: 'smug', x: 1360 })] }),
  P(914, 308, { cam: { head: 'quirrell', w: 460, hy: 0.5, dx: 150 }, bg: MAT, blur: 3, actors: [Q({ x: 500, y: 900, turn: 0.1, expr: { base: 'unimpressed', brows: { raise: 0.6 } } })] }),
], [say('Quirrell', 'Ask him not to hurt you. Perhaps if he sees that you\'re pathetic enough, he\'ll decide you\'re boring and go away.', 240, 70, { anchor: 'tc', w: 340, fixed: true, tail: 'quirrell@0' }),
   say('Harry', 'Please, don\'t, hurt, me…', 200, 480, { anchor: 'tc', w: 240, fixed: true }),
   say('Quirrell', 'That didn\'t sound very sincere. How in Merlin\'s name did you manage to make that sound like an *insult*, Potter?', 522, 932, { anchor: 'tc', w: 400, fixed: true, shape: 'box', tail: 'quirrell@2' })]);
ep.multi(1220, [
  P(18, 560, { cam: { x: 1180, y: 600, w: 900 }, bg: MAT, actors: [H({ x: 1080, expr: 'shock', pose: 'fallBack', turn: 0.3 }), DK({ x: 1300, pose: 'reach', expr: 'grin', armB: { sh: 80, el: 10, hand: 'open' } })] }),
  P(596, 300, { cam: { head: 'harry', w: 440, hy: 0.5, dx: 130 }, bg: MAT, blur: 3, actors: [H({ x: 1080, expr: 'cold', pose: 'fallBack', turn: 0.3 })], over: (e) => FX.frost(e.w, e.h, 0.35, 151) }, { mood: 'cold' }),
  P(914, 288, { cam: { head: 'derrick', w: 520, hy: 0.5, dx: 109, dy: 10 }, bg: MAT, blur: 3, actors: [DK({ expr: 'smug', turn: -0.3 })] }),
], [say('Derrick', 'You bumped into me, Potter. Apologise.', 200, 50, { anchor: 'tc', w: 280, fixed: true }),
   cold('Harry', 'I\'m sorry!', 560, 710, { anchor: 'tc', w: 200, fixed: true }),
   say('Derrick', 'You don\'t *sound* sorry.', 560, 990, { anchor: 'tc', w: 280, fixed: true })]);
ep.bleed(900, { cam: { x: 1150, y: 560, w: 900 }, bg: MAT, actors: [...RING({ expr: 'laugh', noFront: true, skip: [2, 3, 6] }), DK({ x: 1400, y: 930, pose: 'reach', expr: 'laugh', turn: -0.5 }), H({ x: 1000, y: 925, pose: ALLFOURS, expr: 'hurt', turn: -0.3 })], behind: (e) => { const a = e.anchors.harry; return a ? FX.burst(e.w, e.h, a.head[0] + 40, a.head[1] + 30, { n: 18, op: 0.18, inner: 120 }) : ''; } },
  [cap('Derrick pushed him, hard, and Harry fell to the mat on his hands and knees.', 44, 40, { w: 620, fixed: true }),
   say('Derrick', 'This is *fun.*', 340, 196, { anchor: 'tc', w: 200, fixed: true })], { alt: 'Harry, knocked to his hands and knees on the blue mat.' });
// on his back, head to screen-left
const LIE = { hipY: 'floor', lean: -80, armF: { sh: -150, el: -20, hand: 'splay' }, armB: { sh: 100, el: 20, hand: 'splay' }, legF: { hip: 95, knee: -10 }, legB: { hip: 90, knee: -20 }, headTilt: -10 };
const HA = (o = {}) => H({ x: 1000, y: 930, pose: ALLFOURS, turn: -0.3, expr: 'cold', ...o });
const HL = (o = {}) => H({ x: 1000, y: 930, pose: LIE, turn: 0.3, expr: 'cold', ...o });
const COLD = (a, seed) => (e) => FX.frost(e.w, e.h, a, seed);
// Derrick's leg coming in from the upper right, his shoe planted on Harry's chest
const FOOTDOWN = (e) => { const a = e.wa.harry; if (!a) return ''; const cx = (a.neck[0] + a.hip[0]) / 2 + 86, cy = (a.neck[1] + a.hip[1]) / 2 - 18;
  const leg = `M${cx + 20},${cy - 10} Q${cx + 70},${cy - 200} ${cx + 250},${cy - 420}`;
  return path(leg, { fill: 'none', stroke: C.ink, 'stroke-width': 70, 'stroke-linecap': 'round' }) + path(leg, { fill: 'none', stroke: '#1f1d24', 'stroke-width': 62, 'stroke-linecap': 'round' })
    + path(`M${cx - 46},${cy + 6} Q${cx - 50},${cy - 34} ${cx - 6},${cy - 40} L${cx + 50},${cy - 34} Q${cx + 66},${cy - 10} ${cx + 52},${cy + 10}Z`, { fill: '#241a14', stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' })
    + path(`M${cx - 48},${cy + 8} L${cx + 54},${cy + 12}`, { stroke: '#4a3a2e', 'stroke-width': 6, 'stroke-linecap': 'round' }); };
ep.multi(1090, [
  P(18, 620, { cam: { head: 'harry', w: 600, hy: 0.5, dx: 20, dy: -80 }, bg: MAT, blur: 2, actors: [HA()], over: COLD(0.5, 153) }, { mood: 'cold' }),
  // the image of McGonagall flashes up and fades: no hard edges
  P(656, 416, { cam: { x: 870, y: 420, w: 520 }, bg: () => rect(-500, -500, 3000, 2000, { fill: '#efe6d6' }), actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1000, y: 900, turn: 0.1, pose: 'stand', expr: { base: 'sad', eyes: { soft: true } } }], over: (e) => rect(0, 0, e.w, e.h, { fill: '#fff', opacity: 0.12 }) }, { mood: 'sepia', frame: 'dissolve', feather: 50 }),
], [cold('Harry', 'All he had to do was say it was over. And report the whole thing to the Headmaster. That would be the end of this *Defence Professor*…', 400, 50, { anchor: 'tc', w: 500, fixed: true, noTail: true }),
   cap('(An image of Professor McGonagall\'s face flashed before his eyes. She didn\'t look angry. Just sad.)', 44, 674, { w: 300, fixed: true })]);
ep.multi(1330, [
  P(18, 300, { cam: { head: 'quirrell', w: 460, hy: 0.5, dx: -143 }, bg: MAT, blur: 3, actors: [Q({ x: 500, y: 900, turn: 0.4, expr: 'calm' })] }),
  // Derrick's shove comes down on a diagonal: the seam between the panels tilts with the leg
  P(336, 440, { cam: { head: 'harry', w: 480, hy: 0.5, dx: -120, dy: -10 }, bg: MAT, blur: 2, actors: [HA({ turn: 0.3 })], over: COLD(0.55, 155) }, { mood: 'cold', shape: 'cut', cutBottom: -60 }),
  P(734, 578, { cam: { x: 1010, y: 800, w: 640 }, bg: MAT, actors: [HL({ expr: { base: 'cold', mouth: { type: 'grit' } } }), FOOTDOWN], over: COLD(0.5, 156) }, { mood: 'cold', shape: 'cut', cutTop: -60 }),
], [say('Quirrell', 'Now tell him that he\'s better than you, Potter.', 240, 80, { anchor: 'tc', w: 300, fixed: true, tail: 'quirrell@0' }),
   cold('Harry', 'You\'re, better, than, me.', 560, 400, { anchor: 'tc', w: 260, fixed: true }),
   cap('Harry started to raise himself, and Derrick put a foot on his chest and shoved him back down.', 44, 812, { w: 420, fixed: true })]);
// Harry's cold eyes get the same eye-shaped panel as the Dark Lord's
ep.panel(880, { cam: { on: ['harry'], fr: 'eyes', zoom: 0.8, dy: 0.02 }, bg: MAT, actors: [HA({ turn: 0.1 })], over: (e) => FX.frost(e.w, e.h, 0.85, 157) + rect(0, 0, e.w, e.h, { fill: '#0c1428', opacity: 0.25 }) },
  [cold('Harry', 'The world was becoming transparent as crystal. Lines of action and their consequences stretched out in utter clarity. The fool wouldn\'t be expecting him to strike back. A quick hit would stun him long enough for…', 400, 58, { anchor: 'tc', w: 600, fixed: true, noTail: true })], { mood: 'cold', shape: 'eye', x: 0, w: 800, y: 340, ph: 520, alt: 'Ice-cold eyes. Crystal clarity.' });
ep.multi(1150, [
  P(18, 330, { cam: { head: 'quirrell', w: 460, hy: 0.5, dx: -103 }, bg: MAT, blur: 3, actors: [Q({ x: 500, y: 900, turn: 0.4, expr: 'calm' })] }),
  P(366, 766, { cam: { x: 820, y: 560, w: 900 }, bg: MAT, behind: (e) => FX.speedLines(e.w, e.h, { n: 26, seed: 21 }), actors: [Q({ x: 560, y: 860, turn: 0.4, pose: 'stand', expr: 'calm' }), H({ x: 1120, y: 1130, s: 1.75, pose: 'fists', turn: -0.6, expr: { base: 'cold', brows: { raise: -0.6 } } })], over: COLD(0.7, 159) }, { mood: 'cold' }),
], [say('Quirrell', 'Try again.', 300, 120, { anchor: 'tc', w: 200, fixed: true, tail: 'quirrell@0' }),
   cap('And with a sudden sharp motion Harry rolled, and sprang to his feet, and whirled on where stood his *real* enemy. The Defence Professor.', 44, 384, { w: 620, fixed: true })]);
ep.bleed(720, { cam: { head: 'quirrell', w: 330, hy: 0.5, dy: -50 }, bg: MAT, blur: 3, actors: [Q({ x: 600, y: 900, turn: 0.05, expr: { base: 'calm', eyes: { style: 'cold', open: 0.7 } } })], over: (e) => FX.doom(e.w, e.h, 161) },
  [say('Quirrell', 'You have no patience.', 400, 50, { anchor: 'tc', w: 360, size: 40, fixed: true })], { alt: 'Quirrell, quiet, looking straight at him. The same words the Master said.' });
// the old Master, an image in Harry's mind: no hard edges
ep.panel(760, { cam: { head: 'master', w: 440, hy: 0.5, dy: 10 }, bg: DJ, blur: 3, actors: [MS({ expr: 'sad' })], over: (e) => rect(0, 0, e.w, e.h, { fill: '#2a1a14', opacity: 0.45 }) },
  [cap('Harry faltered. His mind, well-honed in pessimism, drew him a picture of an old man, and what had been done to him.', 44, 20, { w: 620, fixed: true })], { mood: 'sepia', frame: 'dissolve', feather: 60, y: 140, ph: 610 });
ep.bleed(1080, { cam: { x: 1000, y: 570, w: 800 }, bg: MAT, actors: [...RING({ expr: 'laugh', noFront: true, skip: [2, 3, 6] }), HL({ expr: 'cry', turn: 0.3 }), DK({ x: 1060, y: 930, pose: 'sit', seat: 70, expr: 'laugh', turn: 0.4 })] },
  [cap('A moment later, Derrick pushed him to the mat again, and then sat down on him, and the breath went whooshing out of him.', 44, 40, { w: 620, fixed: true }),
   shout('Harry', 'Stop! Please stop!', 270, 916, { anchor: 'tc', w: 320, fixed: true })], { alt: 'Derrick sits on Harry.' });
ep.panel(700, { cam: { head: 'harry', w: 460, hy: 0.5, dx: 40, dy: 40 }, bg: MAT, blur: 3, actors: [HL({ expr: 'cry' })] },
  [say('Quirrell', 'Better. That even sounded sincere.', 400, 50, { anchor: 'tc', w: 380, fixed: true, noTail: true }),
   cap('It *had* been. That was the horrible thing, the sickening thing. It *had* been sincere.', 44, 560, { w: 620, fixed: true })], { mood: 'candle' });
ep.multi(900, [
  P(18, 380, { cam: { head: 'quirrell', w: 400, hy: 0.5, dx: -122 }, bg: MAT, blur: 3, actors: [Q({ x: 600, y: 900, turn: 0.3, expr: { base: 'calm', eyes: { open: 0.75 } } })] }),
  P(416, 466, { cam: { head: 'harry', w: 420, hy: 0.5, dx: 110, dy: 20 }, bg: MAT, blur: 3, actors: [HL({ expr: 'sob' })] }),
], [say('Quirrell', 'Lose.', 300, 150, { anchor: 'tc', w: 140, size: 40, fixed: true, tail: 'quirrell@0' }),
   whisper('Harry', 'I, lose.', 560, 520, { anchor: 'tc', w: 180, fixed: true })]);
ep.multi(1330, [
  // shoved from hand to hand: the panel itself is knocked askew
  { ...P(18, 700, { cam: { x: 1100, y: 500, w: 1250 }, bg: MAT, behind: (e) => FX.speedLines(e.w, e.h, { n: 22, seed: 31, angle: -8 }), actors: [
    ...RING({ expr: 'laugh', noFront: true }).map((a, i) => (i === 1 || i === 4 || i === 7 || i === 8 ? { ...a, pose: 'reach', turn: a.x > 1100 ? -0.4 : 0.4, y: a.y + 40, x: a.x + (a.x > 1100 ? -60 : 60) } : a)),
    DK({ x: 1420, pose: 'point', expr: 'laugh' }), H({ x: 1060, y: 900, pose: 'panic', expr: 'sob', rot: -12, turn: -0.3 })] }), shape: 'slant', slant: -56 },
  P(736, 576, { cam: { head: 'harry', w: 520, hy: 0.5, dy: 38 }, bg: MAT, blur: 2, actors: [H({ x: 1060, y: 900, pose: 'panic', expr: 'sob', rot: 8, turn: 0.3 })] }),
], [cap('Hands shoved Harry, sending him stumbling across the circle to another set of hands that shoved him again. He had long since passed the point of trying not to cry. He was just trying not to fall down.', 44, 36, { w: 620, fixed: true }),
   say('Derrick', 'I like it. Lose some more.', 560, 570, { anchor: 'tc', w: 260, fixed: true, tail: 'derrick@0' }),
   say('Derrick', 'What are you, Potter?', 560, 760, { anchor: 'tc', w: 260, fixed: true, noTail: true }),
   whisper('Harry', 'A, l-loser, I lose, I give up, you win, you\'re b-better, than me, please stop—', 400, 1290, { anchor: 'bc', w: 460, fixed: true })],
  { alt: 'Harry shoved from hand to hand around the ring, crying.' });
ep.panel(860, { cam: { x: 1060, y: 590, w: 840 }, bg: MAT, actors: [...RING({ expr: 'laugh', noFront: true, skip: [2, 3, 6] }), H({ x: 1080, y: 930, pose: LIE, expr: 'hurt', rot: -6, turn: 0.3 })] },
  [cap('Harry tripped over a foot, and went crashing to the ground, hands not quite able to catch himself.', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
const QM = (o = {}) => Q({ x: 850, y: 900, turn: 0.4, pose: 'stand', ...o });
const HM = (o = {}) => H({ x: 1100, y: 900, turn: -0.4, pose: 'stand', ...o });
// ENOUGH: the shout bursts the frame
ep.panel(800, { cam: { head: 'quirrell', w: 560, hy: 0.5, dx: 57, dy: 60 }, bg: MAT, actors: [Q({ x: 800, y: 900, pose: 'point', expr: { base: 'yell', brows: { raise: -0.7, inner: -0.6 } }, turn: 0.4 })], behind: (e) => { const a = e.anchors.quirrell; return FX.burst(e.w, e.h, a ? a.head[0] : e.w / 2, a ? a.head[1] : e.h / 2, { n: 30, op: 0.25, inner: 150 }); } },
  [shout('Quirrell', '*ENOUGH!* Step away from Mr Potter!', 400, 56, { anchor: 'tc', w: 460, fixed: true })], { shape: 'burst', points: 18, seed: 12, y: 116, ph: 670, alt: 'A voice sharp enough to cut iron.' });
ep.multi(1480, [
  P(18, 800, { cam: { x: 1030, y: 385, w: 1120 }, bg: MAT, actors: [...RING({ expr: 'horror', noFront: true }).map((a) => ({ ...a, x: a.x + (a.x > 1100 ? 90 : a.x < 1000 ? -60 : 0), y: a.y - 30 })), DK({ x: 1560, y: 880, expr: 'horror', turn: -0.2 }), Q({ x: 520, y: 900, pose: 'lecture', expr: 'cold', turn: 0.4 }), H({ x: 1060, y: 930, pose: LIE, expr: 'blank', turn: 0.3 })] }),
  P(836, 300, { cam: { head: 'draco', hw: 0.24, hx: 0.3, hy: 0.52 }, bg: TI, blur: 3, actors: [DS({ x: 1000, pose: 'point', expr: 'cold', turn: 0.3 })] }),
  P(1154, 308, { cam: { head: 'harry', w: 420, hy: 0.5, dx: 110, dy: 20 }, bg: MAT, blur: 3, actors: [HL({ expr: { base: 'blank', eyes: { lookX: -0.5, lookY: -0.4 } } })] }),
], [cap('Professor Quirrell talked. There were gasps from the older Slytherins. Then Draco\'s voice, in his father\'s cadence: *could have put Slytherin House in jeopardy… total lack of awareness, never mind cunning… dull thugs, useful for nothing but lackeys…*', 44, 36, { w: 620, fixed: true }),
   cap('And something in Harry\'s hindbrain, despite everything he knew, designated Draco as an ally.', 360, 1180, { w: 340, fixed: true })]);
ep.multi(1150, [
  P(18, 560, { cam: { head: 'harry', w: 460, hy: 0.5, dx: 34, dy: -50 }, bg: MAT, blur: 2, actors: [HM({ pose: 'raiseHand', expr: 'sad', rot: -3, turn: -0.2 })] }),
  P(596, 536, { cam: { head: 'quirrell', w: 480, hy: 0.5, dx: -149, dy: -40 }, bg: MAT, blur: 2, actors: [QM({ turn: 0.3, pose: 'stand', expr: 'stern' })] }),
], [say('Harry', 'Wait. There\'s something, I want, to say, to them—', 400, 50, { anchor: 'tc', w: 420, fixed: true }),
   say('Quirrell', 'Stop. If that\'s what I think it is, please wait until after they\'re gone. They\'ll hear about it later. We all have our lessons to learn, Mr Potter. You. *Go.*', 260, 628, { anchor: 'tc', w: 370, fixed: true, shape: 'box', tail: 'quirrell@1' })]);
ep.panel(900, { cam: { head: 'harry', w: 520, hy: 0.5, dx: -13, dy: -115 }, bg: MAT, blur: 2, actors: [HM({ expr: { base: 'calm', eyes: { lookX: -0.6, lookY: 0.3 } }, rot: 2, turn: 0.1 })] },
  [say('Harry', 'No-one\'s to take any revenge on them. That\'s a request to anyone who considers themselves my friend. I had my lesson to learn, they helped me learn it, they had their lesson to learn too, and it\'s over. If you tell this story, make sure you tell that part too.', 400, 44, { anchor: 'tc', w: 600, fixed: true, shape: 'box' })], { mood: 'candle', alt: 'Harry, swaying, careful not to look at his classmates.' });
ep.multi(1470, [
  P(18, 560, { cam: { x: 975, y: 520, w: 700 }, bg: MAT, actors: [QM({ expr: { base: 'calm', eyes: { soft: true } } }), HM({ expr: 'teary' })] }),
  P(596, 500, { cam: { head: 'quirrell', w: 460, hy: 0.5, dx: 130, dy: -50 }, bg: MAT, blur: 3, actors: [QM({ turn: 0.3, expr: { base: 'calm', eyes: { soft: true, open: 0.8 } } })] }),
  P(1114, 338, { cam: { head: 'harry', w: 440, hy: 0.5, dx: -118, dy: 9 }, bg: MAT, blur: 3, actors: [HM({ turn: -0.3, expr: { base: 'teary', eyes: { lookY: 0.3 } }, headTilt: 12 })] }),
], [say('Quirrell', 'You lost.', 200, 60, { anchor: 'tc', w: 160, fixed: true, tail: 'quirrell@0' }),
   cap('His voice was gentle, for the first time. It sounded strange coming from him, like his voice shouldn\'t even be able to do that.', 44, 614, { w: 620, fixed: true }),
   say('Quirrell', 'And are you yet alive?', 560, 830, { anchor: 'tc', w: 260, fixed: true, tail: 'quirrell@1' }),
   cap('Harry managed to nod.', 44, 1250, { w: 320, fixed: true })]);
ep.multi(1600, [
  P(18, 640, { cam: { head: 'quirrell', w: 500, hy: 0.5, dy: -120 }, bg: MAT, blur: 2, actors: [QM({ turn: 0.2, pose: 'gesture', expr: 'calm' })] }),
  P(676, 290, { cam: { head: 'harry', w: 440, hy: 0.5, dx: -130 }, bg: MAT, blur: 3, actors: [HM({ turn: -0.3, expr: 'teary' })] }),
  P(984, 290, { cam: { head: 'quirrell', w: 440, hy: 0.5, dx: 130 }, bg: MAT, blur: 3, actors: [QM({ turn: 0.3, expr: { base: 'calm', brows: { raise: 0.4 } } })] }),
  P(1292, 290, { cam: { head: 'harry', w: 440, hy: 0.5, dx: -130 }, bg: MAT, blur: 3, actors: [HM({ turn: -0.3, expr: { base: 'worried', eyes: { lookY: 0.4 } } })] }),
], [say('Quirrell', 'Not all losing is like this. There are compromises, and negotiated surrenders. There is a whole art to manipulating others by letting them be dominant over you. But first, losing must be *thinkable.* Will you remember how you lost?', 400, 44, { anchor: 'tc', w: 600, fixed: true, shape: 'box', tail: 'quirrell@0' }),
   say('Harry', 'Yes.', 360, 790, { anchor: 'tc', w: 120, fixed: true }),
   say('Quirrell', 'Will you be able to lose?', 540, 1090, { anchor: 'tc', w: 280, fixed: true }),
   say('Harry', 'I… think so…', 300, 1405, { anchor: 'tc', w: 220, fixed: true })]);
ep.multi(1030, [
  P(18, 360, { cam: { head: 'quirrell', w: 460, hy: 0.5, dx: -139 }, bg: MAT, blur: 3, actors: [QM({ turn: 0.3, expr: 'smile' })] }),
  // the bow: the two of them alone on the bare page, nothing else in the world (a cut-out)
  { ...P(396, 610, { cam: { x: 950, y: 690, w: 600 }, bg: MAT, actors: [QM({ x: 730, pose: 'bowGrand', lean: 10, headTilt: 7, expr: { base: 'smile', eyes: { open: 0.5 } } }), HM({ x: 1150, expr: 'shock' })] }), cutout: true, border: 'none' },
], [say('Quirrell', 'I think so too.', 250, 140, { anchor: 'tc', w: 230, fixed: true, tail: 'quirrell@0' }),
   say('Quirrell', 'Congratulations, Harry Potter. *You win.*', 372, 392, { anchor: 'tl', w: 300, shape: 'box', fixed: true, tail: 'quirrell@1' })],
  { alt: 'Quirrell bows so low his thin hair almost touches the floor.' });
// the whole year on its feet; some of Gryffindor up on their desks (drawn with the row below so the desk front doesn't hide them)
const HOUSE = (k, i) => ['r', 'g', 'h', 's'][(i + k) % 4];
const ONDESK = (k, i) => HOUSE(k, i) === 'g' && k >= 2;
const CHEER = (o = {}) => CLASS({ skip: (k, i, x) => (k === 1 && Math.abs(x - 1000) < 160) || ONDESK(k, i), a: (k, i) => ({ pose: (i + k) % 3 ? 'armsUp' : 'wave', expr: (i + k) % 2 ? 'bigGrin' : 'laugh', turn: 0 }),
  extra: { ...Object.fromEntries([1, 2, 3].map((k) => [k, [...[0, 1, 2, 3, 4, 5].filter((i) => ONDESK(k + 1, i)).map((i) => ({ def: student(2500 + (k + 1) * 10 + i, 'g'), id: `d${k}${i}`, x: 250 + i * 300 + ((k + 1) % 2) * 150, y: rowY(k + 1) - 90, s: 1.05, turn: 0, pose: 'armsUp', expr: 'laugh' })), ...(k === 1 ? [DS({ x: 1000, pose: 'armsUp', expr: 'smile' })] : [])]])) } });
ep.multi(1394, [
  // the applause hits like a thunderclap: the frame jolts
  P(18, 580, { cam: { x: 1150, y: 115, w: 1500 }, bg: TI, actors: CHEER(), over: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.55, { n: 30, op: 0.12, inner: 330 }) }, { shape: 'jag', jag: 14, seed: 5 }),
  P(616, 760, { cam: { x: 1080, y: 40, w: 1100 }, bg: TI, actors: CHEER() }),
], [cap('There was no single source, no first mover. The applause started all at once, like a massive thunderclap.', 44, 36, { w: 620, fixed: true }),
   cap('From Ravenclaw and Gryffindor and Hufflepuff and even Slytherin, probably because Draco Malfoy was applauding too. Half of Gryffindor was standing on their desks.', 44, 634, { w: 620, fixed: true })],
  { alt: 'The whole year on its feet, applauding.' });
ep.panel(820, { cam: { head: 'harry', w: 440, hy: 0.5, dx: -10, dy: -60 }, bg: MAT, blur: 2, actors: [HM({ turn: 0, rot: 2, expr: { base: 'teary', eyes: { sparkle: true } } })] },
  [cap('Harry risked a glance at his classmates. He saw their faces showing not pity, but awe. So he stood there, swaying, letting their respect wash over him, feeling stronger. Maybe even a little healed.', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
ep.multi(1350, [
  P(18, 750, { cam: { head: 'quirrell', w: 540, hy: 0.5, dy: -165 }, bg: MAT, blur: 2, actors: [QM({ turn: 0.2, pose: 'present', expr: 'smile' })] }),
  P(786, 546, { cam: { head: 'quirrell', hw: 0.15, hx: 0.72, hy: 0.56 }, bg: MAT, blur: 2, actors: [QM({ turn: 0.3, pose: 'raiseHand', expr: { base: 'smile', eyes: { open: 0.8 } } })] }),
], [say('Quirrell', 'Surprised, Mr Potter? You have just found out that the real world does not *always* work like your worst nightmares. They saw you confront your fear, and keep confronting it, even though you could have walked away at any time. Did you think less of *me*, when I told you I had been pushed to the ground?', 400, 84, { anchor: 'tc', w: 560, fixed: true, tail: 'quirrell@0' }),
   say('Quirrell', 'Your *extraordinary* achievement deserves an extraordinary reward. Remember that there are Slytherins, and then there are Slytherins. *Fifty-one points to Ravenclaw.*', 262, 826, { anchor: 'tc', w: 380, fixed: true, shape: 'box', tail: 'quirrell@1' })]);
const RAVEN = [padma, anthony, terry];
// the cheering spills over the top of the frame
ep.panel(700, { cam: { x: 1100, y: 450, w: 1250 }, bg: TI, actors: CLASS({ skip: (k, i, x) => (k === 4 && (Math.abs(x - 1450) < 160 || x > 1700)) || (k === 1 && Math.abs(x - 1000) < 160), a: (k, i) => ({ def: k === 2 && i < 3 ? RAVEN[i] : student(2600 + k * 10 + i, 'r'), pose: (i + k) % 2 ? 'armsUp' : 'wave', expr: (i + k) % 3 ? 'laugh' : 'bigGrin' }) }) },
  [cap('Pandemonium broke out among the Ravenclaws: howling, whistling, cheering.', 44, 566, { w: 620, fixed: true })], { mood: 'candle', breakout: 'top', ph: 612, panel: { y: 70 } });
ep.panel(900, { cam: { on: ['harry'], fr: 'close', dy: 0.1 }, bg: MAT, blur: 3, actors: [H({ x: 1100, y: 900, expr: 'worried' })] },
  [cap('(And in the same moment, Harry felt something *wrong* about that. Professor McGonagall had been right. There *should* have been consequences, a cost, a price. You couldn\'t just put everything back the way it was.)', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
// Draco's small, quick thumbs-up: a fist at his chest with the thumb drawn on top
const DTH = (o = {}) => DS({ x: 1000, pose: 'stand', armB: { sh: 40, el: 110, hand: 'fist' }, expr: { base: 'smile', eyes: { wink: 'r' } }, turn: 0.2, ...o });
const THUMB = (e) => { const a = e.wa.draco; if (!a) return ''; const [x, y] = a.handB, r = a.hr * 0.2; return path(`M${x - r * 0.5},${y - r * 0.6} Q${x - r * 0.7},${y - r * 2.4} ${x},${y - r * 2.5} Q${x + r * 0.6},${y - r * 2.3} ${x + r * 0.5},${y - r * 0.6}Z`, { fill: dracoSly.skin, stroke: C.ink, 'stroke-width': r * 0.28, 'stroke-linejoin': 'round' }); };
// Draco's thumbs-up, small and quick: an inset tucked into the corner of Harry's panel
ep.multi(900, [
  P(18, 824, { cam: { head: 'harry', w: 480, hy: 0.5, dx: 105, dy: -150 }, bg: MAT, actors: [HM({ pose: 'armsUp', expr: 'smile', turn: 0 })] }),
  P(560, 314, { cam: { head: 'draco', w: 250, hy: 0.5, dx: -20, dy: 45 }, bg: TI, blur: 3, actors: [DTH(), THUMB, FRONT1] }, { x: 486, w: 280, shadow: true }),
], [say('Harry', 'Professor Quirrell, you are everything a member of your House should be. I think you must be just what Salazar Slytherin had in mind when he helped found Hogwarts. I thank you and your House. And I think this calls for three cheers for Slytherin. *Huzzah! Huzzah! HUZZAH!*', 400, 44, { anchor: 'tc', w: 600, fixed: true, shape: 'box' }),
   cap('Draco\'s hand moved in a small, quick thumbs-up.', 414, 448, { w: 282, fixed: true })]);
ep.panel(800, { cam: { on: ['zabini'], fr: 'bust' }, bg: TI, blur: 2, actors: [{ def: zabini, id: 'zabini', x: 1000, y: rowY(1), s: 1.1, turn: 0.1, pose: 'sit', seat: 140, expr: { base: 'suspicious', mouth: { type: 'smirk' } } }, FRONT1] },
  [cap('Most of the Slytherins looked shocked. A few stared at Professor Quirrell in wonder. And Blaise Zabini was looking at Harry with a calculating, intrigued expression.', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
ep.multi(1400, [
  P(18, 560, { cam: { head: 'quirrell', w: 480, hy: 0.5, dy: -95 }, bg: MAT, blur: 2, actors: [QM({ turn: 0.3, pose: 'present', expr: 'smile' })] }),
  P(596, 260, { cam: { head: 'harry', w: 420, hy: 0.5, dx: -120 }, bg: MAT, blur: 3, actors: [HM({ turn: -0.3, expr: 'hopeful', pose: 'raiseHand' })] }),
  P(874, 508, { cam: { head: 'quirrell', hw: 0.2, hx: 0.19, hy: 0.7 }, bg: MAT, blur: 2, actors: [QM({ turn: 0.3, pose: 'point', expr: { base: 'smile', eyes: { open: 0.7 } } })] }),
], [say('Quirrell', 'Now, believe it or not, we still have half an hour, which is enough to introduce the Simple Shield. Mr Potter, of course, is going off to take a well-earned rest.', 400, 44, { anchor: 'tc', w: 600, fixed: true, shape: 'box', tail: 'quirrell@0' }),
   say('Harry', 'I can…', 250, 690, { anchor: 'tc', w: 140, fixed: true }),
   say('Quirrell', '*Idiot.* Third door from the left, at the back of the stage. You will find a bed, some exceptionally tasty snacks, and some extremely light reading. You may not take your textbooks. Now go.', 498, 896, { anchor: 'tc', w: 460, fixed: true, shape: 'box', tail: 'quirrell@2' })],
  { alt: 'He says "idiot" fondly. The class is already laughing.' });
// the last panel: we are already inside the quiet room behind the third door (bed, snacks, light reading),
// and the door itself is a panel, with Harry coming through it
ep.multi(610, [
  P(110, 482, { cam: { x: 1010, y: 553, w: 1450 }, bg: () => CS.restRoom(), actors: [] }),
  P(166, 370, { cam: { x: 1150, y: 790, w: 330 }, bg: () => TI() + FRONT1() + rect(-800, 780, 4000, 1000, { fill: '#d8d2c4' }), blur: 3, actors: [H({ x: 1150, y: 1010, turn: 0.1, pose: 'walk', expr: 'teary' })] }, { x: 54, w: 184, frame: 'wood', mood: undefined }),
], [cap('Harry went.', 44, 30, { w: 200, fixed: true })], { alt: 'Inside the quiet room behind the third door: a bed, snacks, a few books. Harry comes in through the doorway.' });
ep.end();
export default ep;
