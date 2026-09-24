// EPISODE 15 — The Time-Turner  (source: HPMOR ch. 14)
// Harry gets a time machine, and finds out who has been playing the Game.
import { Episode, say, shout, whisper, inner, cold, cap, capC, plain, title, M } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text } from '../engine/core/svg.js';
import * as HG from '../engine/bg/hogwarts.js';
import * as CS from '../engine/bg/castle.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { mcgonagall, sprout, student, clearwater } from '../engine/chars/cast.js';
import { harryRaven, harryPJ, hermioneRaven, terry, anthony, nevilleHuff, ernie, derrick, slyTeen, conscience, aristocrat } from '../engine/chars/cast2.js';
import { pouch, quill, wand } from '../engine/props/props.js';
import * as P2 from '../engine/props/props2.js';
import { header, note } from './b2.js';

const ep = new Episode({ id: 'ep15', number: 15, title: 'The Time-Turner' });
ep.setBg(C.paper);
header(ep, 'FIFTEEN', 'The Time-Turner');

// ---------------------------------------------------------------- McGonagall's office
const MO = () => CS.mcgonagallOffice();
const MCG = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 1000, y: 900, turn: 0.25, pose: 'sit', seat: 190, expr: 'stern', ...o });
// standing, away from the desk
const MCGS = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 1000, y: 1000, turn: 0.3, pose: 'stand', expr: 'stern', ...o });
const DESK = () => CS.mcgDesk(1000, 960);
const HP = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1500, y: 1040, s: 1.1, turn: -0.4, pose: 'stand', expr: 'neutral', ...o });
const ROOM = (m = {}, h = {}) => [MCG(m), DESK, HP(h)];
// office two-shot: McGonagall (desk, x≈1000) left, Harry (x≈1500) right, cut at Harry's thighs; the balloons stack above their heads
const TWO = (H, bottom = 990) => ({ x: 1250, y: bottom - (H - 36) / 2, w: 760 });
// standing two-shot (no desk): McGonagall x≈1000, Harry x≈1400
const STAND2 = (H, bottom = 960) => ({ x: 1200, y: bottom - (H - 36) / 2 * (720 / 752), w: 720 });
const PENCIL = (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#f3ead3' }) + [...Array(Math.ceil(ctx.h / 34)).keys()].map((k) => line(0, 20 + k * 34, ctx.w, 20 + k * 34, { stroke: '#b9c8d8', 'stroke-width': 1.4 })).join('') + line(70, 0, 70, ctx.h, { stroke: '#e2a0a0', 'stroke-width': 2 });
const PT = (x, y, s, fs = 36, col = '#2d2a4a', a = 'middle', o = {}) => text(x, y, s, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, fill: col, 'text-anchor': a, ...o });

// the reader steps into her office through its doorway (wood arch)
ep.panel(1120, { cam: { x: 1180, y: 470, w: 1400 }, bg: MO, actors: ROOM({ expr: 'worried' }, { expr: 'blank' }) },
  [cap('Professor McGonagall\'s office was clean and well organised. A wall of cubbyholes, each with its scrolls, each meaning something to her and no-one else. A single parchment on the desk. Behind it, a door barred with several locks.', 44, 24, { w: 620, fixed: true }),
   say('McGonagall', 'Mr Potter? What is this about?', 480, 610, { w: 300, fixed: true })], { mood: 'warm', y: 252, ph: 850, shape: 'arch', spring: 0.34, frame: 'wood', alt: 'Through the doorway of McGonagall\'s office. She sits on a backless stool behind a tidy desk, looking at Harry with slight apprehension.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: MO, blur: 3, actors: ROOM({}, { expr: 'blank' }) },
  [cap('Harry\'s mind went blank. The Game had sent him here. He\'d been expecting *her* to have something in mind…', 44, 30, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry'], fr: 'waist', dy: 0.1 }, bg: MO, blur: 2, actors: ROOM({}, { expr: 'think', pose: 'raiseHand', armB: { sh: 128, el: 45, hand: 'palm' } }) },
  [cap('Thankfully, his panicking brain remembered that he *did* have something important to tell her.', 44, 30, { w: 620, fixed: true }),
   say('Harry', 'Um… if there are any spells you can cast to make sure no-one\'s listening to us…', 400, 722, { anchor: 'bc', w: 500, fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: { on: ['mcgonagall'], fr: 'waist', dy: 0.35, zoom: 0.85 }, bg: MO, actors: [MCGS({ pose: 'wandUp', expr: 'focus', y: 920, turn: 0.1 }), DESK], over: (e) => FX.sparkles([[e.w * 0.62, e.h * 0.2], [e.w * 0.3, e.h * 0.28], [e.w * 0.72, e.h * 0.4]], { r: 24 }) },
  [cap('She stood, firmly closed the outer door, and began casting spells.', 44, 30, { w: 520, fixed: true }),
   inner('Harry', '*It was at this point that Harry realised he had a priceless opportunity to offer Professor McGonagall a Comed-Tea, and he told that part of himself to* shut up.', 400, 862, { anchor: 'bc', w: 580, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['mcgonagall'], fr: 'bust', dy: 0.45 }, bg: MO, blur: 2, actors: ROOM({ expr: { base: 'stern', mouth: { type: 'flat' } } }) },
  [say('McGonagall', 'All right. No-one\'s listening.', 400, 64, { anchor: 'tc', w: 360, fixed: true }),
   inner('Harry', '*Oh, right. She\'s expecting me to blackmail her about the prophecy.*', 400, 780, { anchor: 'bc', w: 540, fixed: true })], { mood: 'warm', alt: 'Her face is rather tight.' });

// the whisper
ep.panel(1200, { cam: { on: ['harry'], fr: 'bust', dy: -0.35 }, bg: MO, actors: ROOM({}, { expr: 'focus', pose: 'gesture' }) },
  [say('Harry', 'It\'s about the Incident with the Sorting Hat. I think there\'s an extra spell on it. Something the Hat itself doesn\'t know about, that triggers when it says *Slytherin.*', 400, 64, { anchor: 'tc', w: 560, fixed: true }),
   say('Harry', 'The moment it came off my head, I heard something like a hiss and like English at the same time. It said: *Salutations from Slytherin to Slytherin. If you would seek my secrets, speak to my snake.*', 400, 1140, { anchor: 'bc', w: 580, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: MO, blur: 3, actors: ROOM({ expr: { base: 'shock', mouth: { type: 'o' } } }) },
  [cap('Professor McGonagall sat there with her mouth open, staring as though he\'d grown another two heads.', 44, 30, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: TWO(1000), bg: MO, actors: ROOM({ expr: 'shock' }, { expr: 'neutral', pose: 'shrug' }) },
  [say('McGonagall', 'So… you decided to come to me right away, and tell me about it.', 275, 60, { anchor: 'tc', w: 380, fixed: true }),
   say('Harry', 'Well, yes, of course. As opposed to, say, trying to research it myself, or telling any of the other children.', 540, 290, { anchor: 'tc', w: 360, fixed: true }),
   cap('There was no need to admit how long it had taken him to think of that.', 44, 870, { w: 480, fixed: true })], { mood: 'warm' });
ep.panel(860, { cam: { on: ['mcgonagall'], fr: 'bust', dy: 0.12 }, bg: MO, blur: 2, actors: ROOM({ expr: 'suspicious' }) },
  [say('McGonagall', 'And if, perhaps, you were to discover the entrance to Salazar Slytherin\'s legendary Chamber of Secrets, an entrance that you and you alone could open…', 400, 60, { anchor: 'tc', w: 560, fixed: true })], { mood: 'warm' });
ep.panel(1100, { cam: { on: ['harry'], fr: 'waist', dy: -0.9 }, bg: MO, blur: 2, actors: ROOM({}, { expr: 'determined', pose: 'lecture' }) },
  [say('Harry', 'I would close the entrance and report to you at once, so that a team of experienced magical archæologists could be assembled. They would go in very carefully, and I would go in *afterwards*, once they had photographs of how everything looked before people started tramping around their priceless historical site.', 400, 80, { anchor: 'tc', w: 550, fixed: true })], { mood: 'warm' });
ep.panel(660, { cam: { on: ['mcgonagall'], fr: 'close', zoom: 1.2, dy: -0.05 }, bg: MO, blur: 3, actors: ROOM({ expr: { base: 'shock', mouth: { type: 'o' } } }) },
  [cap('She stared at him like he\'d just turned into a cat.', 44, 30, { w: 460, fixed: true })], { mood: 'warm' });
ep.panel(1100, { cam: TWO(1100), bg: MO, actors: ROOM({ expr: 'stern' }, { expr: 'smug' }) },
  [say('Harry', 'It\'s obvious if you\'re not a Gryffindor.', 550, 50, { anchor: 'tc', w: 330, fixed: true }),
   say('McGonagall', 'I think that you *far* underestimate the rarity of common sense, Mr Potter.', 265, 220, { anchor: 'tc', w: 360, fixed: true }),
   say('Harry', 'A Hufflepuff would\'ve said the same thing.', 545, 520, { anchor: 'tc', w: 330, fixed: true })], { mood: 'warm' });
ep.panel(960, { cam: TWO(960), bg: MO, actors: ROOM({ expr: 'shock' }, { expr: 'neutral' }) },
  [say('McGonagall', '*That\'s* true.', 200, 60, { anchor: 'tc', w: 220, fixed: true }),
   say('Harry', 'Sorting Hat offered me Hufflepuff.', 560, 140, { anchor: 'tc', w: 320, fixed: true }),
   say('McGonagall', 'Did it *really?*', 365, 262, { anchor: 'tc', w: 240, fixed: true })], { mood: 'warm' });
ep.panel(1060, { cam: { on: ['mcgonagall'], fr: 'bust', dy: 0.2 }, bg: MO, blur: 2, actors: ROOM({ expr: 'worried' }) },
  [say('McGonagall', 'Mr Potter. Five decades ago was the last time a student died within the walls of Hogwarts.', 400, 64, { anchor: 'tc', w: 520, fixed: true }),
   say('McGonagall', 'And I am now certain that five decades ago was the last time someone heard that message.', 400, 1010, { anchor: 'bc', w: 520, fixed: true })], { mood: 'warm' });
ep.panel(1150, { cam: { on: ['harry'], fr: 'waist', dy: -0.2 }, bg: MO, actors: ROOM({}, { expr: 'determined', pose: 'lecture' }) },
  [say('Harry', 'Then I will be *very* sure to take no action whatsoever on this matter without consulting you.', 400, 64, { anchor: 'tc', w: 520, fixed: true }),
   say('Harry', 'And may I suggest you get the best people you can, and see if that extra spell can be taken off the Hat? And if not, add a Quietus that triggers as the Hat comes off a student\'s head. There. No more dead students.', 400, 1095, { anchor: 'bc', w: 520, fixed: true })], { mood: 'warm' });
// the points
ep.panel(820, { cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.1 }, bg: MO, blur: 2, actors: ROOM({ expr: 'awe' }) },
  [say('McGonagall', 'I cannot *possibly* award you enough points for this without giving the House Cup to Ravenclaw outright.', 400, 64, { anchor: 'tc', w: 520, fixed: true })], { mood: 'warm' });
ep.panel(1180, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: MO, blur: 2, actors: ROOM({}, { expr: 'worried' }) },
  [say('Harry', 'Um. I\'d rather not earn *that* many House points.', 400, 64, { anchor: 'tc', w: 420, fixed: true }),
   say('Harry', 'It would be too sad. Like when I was at Muggle school, and there was a group project, and I\'d do the whole thing myself because the others would only slow me down. If I win the House Cup by myself, then I\'m carrying Ravenclaw on my back. That\'s too sad.', 400, 1125, { anchor: 'bc', w: 540, fixed: true })], { mood: 'warm' });
ep.panel(1150, { cam: TWO(1150), bg: MO, actors: ROOM({ expr: 'think' }, { expr: 'neutral', pose: 'shrug' }) },
  [say('McGonagall', 'Suppose I only awarded you fifty points, then?', 285, 50, { anchor: 'tc', w: 400, fixed: true }),
   say('Harry', 'It\'s not fair to the other children, if I earn lots of points for grown-up things they can\'t be part of. How is Terry Boot supposed to earn fifty points for reporting a whisper from the Sorting Hat?', 515, 230, { anchor: 'tc', w: 400, shape: 'box', fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: { on: ['mcgonagall'], fr: 'close', dy: 0.1 }, bg: MO, blur: 3, actors: ROOM({ expr: { base: 'warm', eyes: { soft: true } } }) },
  [say('McGonagall', 'I see why the Sorting Hat offered you Hufflepuff.', 400, 64, { anchor: 'tc', w: 440, fixed: true }),
   cap('She was eyeing him with a strange respect.', 44, 800, { w: 600, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry'], fr: 'close', dy: -0.05 }, bg: MO, blur: 3, actors: ROOM({}, { expr: 'teary' }) },
  [cap('That made Harry choke up a bit. He\'d honestly thought he wasn\'t worthy of Hufflepuff. That the Hat had just been trying to shove him anywhere but Ravenclaw, into a House whose virtues he didn\'t have…', 44, 30, { w: 620, fixed: true })], { mood: 'warm', frame: 'dissolve', feather: 60 });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust', dy: 0.1 }, bg: MO, blur: 2, actors: ROOM({ expr: 'smile' }) },
  [say('McGonagall', 'And if I tried to give you *ten* points…?', 400, 50, { anchor: 'tc', w: 480, fixed: true })], { mood: 'warm' });
ep.panel(1150, { cam: { on: ['harry'], fr: 'waist', dy: -1.0 }, bg: MO, blur: 2, actors: ROOM({}, { expr: 'smile', pose: 'lecture' }) },
  [say('Harry', 'Are you going to explain where they came from, if anyone asks? There might be a lot of Slytherins, and I don\'t mean the children, who would be really *really* angry about that spell coming off the Hat. Absolute secrecy is the better part of valour. No need to thank me, ma\'am. Virtue is its own reward.', 400, 60, { anchor: 'tc', w: 560, fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: { on: ['mcgonagall'], fr: 'bust', dy: 0.35 }, bg: MO, blur: 2, actors: ROOM({ expr: 'warm' }) },
  [say('McGonagall', 'So it is. But I do have a very special something else to give you. I see that I have greatly wronged you in my thoughts, Mr Potter.', 400, 64, { anchor: 'tc', w: 540, fixed: true }),
   say('McGonagall', 'Please wait here.', 400, 860, { anchor: 'bc', w: 320, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { x: 1430, y: 590, w: 900 }, bg: MO, actors: [DESK, HP({ x: 1150, turn: 0.4, expr: 'awe' }), (e) => { const x = 1650, y = 60; return g({ opacity: 0.85, filter: 'url(#blur3)' }, rect(x - 150, y, 300, 860, { fill: '#c9c0b0' }), ellipse(x, y + 420, 170, 440, { fill: '#e9e0d0', opacity: 0.8 })); }] },
  [cap('She went to the locked back door, waved her wand, and a blurry curtain sprang up around her. Harry could neither see nor hear what was going on.', 44, 30, { w: 620, fixed: true })], { mood: 'warm', alt: 'A blur, like a frosted-glass curtain, hides McGonagall at the locked door.' });

// the necklace
// the key object, out of the frame and on the page itself
ep.cutout(800, (ctx) => K.glow(ctx.w / 2, 500, 340, '#ffd76a', 0.45) + g({ transform: `translate(${ctx.w / 2},500)` }, P2.timeTurner(2.4, { rot: 0 })),
  [cap('In one hand, she held a necklace: a thin golden chain bearing a silver circle, and within the circle, the device of an hourglass.', 44, 30, { w: 620, fixed: true })], { alt: 'The Time-Turner, alone on the page: a silver ring with a tiny hourglass inside, on a fine gold chain.' });
ep.panel(820, { cam: { x: 1230, y: 607, w: 620 }, bg: MO, actors: [MCGS({ x: 1060, pose: 'present', turn: 0.4, armB: { sh: 80, el: 10, hand: 'hold', prop: g({ transform: 'translate(0,46) scale(0.45)' }, P2.timeTurner(1)) } }), HP({ x: 1400, expr: 'bigGrin', pose: 'reach', armB: { sh: 118, el: 12, hand: 'open' }, armF: { sh: 25, el: 35, hand: 'open' } })] },
  [inner('Harry', '*Wow! A neat magical item as a quest reward! So refusing money until you got a magic item actually worked in real life, not just in computer games.*', 400, 50, { anchor: 'tc', w: 580, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.25 }, bg: MO, blur: 2, actors: [MCGS({ x: 1060, pose: 'lecture' })] },
  [say('McGonagall', 'Mr Potter, this item is ordinarily lent only to children who have already shown themselves to be highly responsible. Its true nature is *secret.* You must *not* tell any of the other students about it, or let them see you using it.', 400, 56, { anchor: 'tc', w: 560, fixed: true })], { mood: 'warm' });
ep.panel(1180, { cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.12 }, bg: MO, blur: 2, actors: [MCGS({ x: 1060, pose: 'lecture' })] },
  [say('McGonagall', 'So far as the other students are concerned, it is a *Spimster wicket*, used to treat a rare, non-contagious magical ailment called *Spontaneous Duplication.*', 400, 64, { anchor: 'tc', w: 560, fixed: true }),
   say('McGonagall', 'You have no reason to show it to anyone. But no reason to treat it as an awful secret, either. Spimster wickets are not interesting.', 400, 1135, { anchor: 'bc', w: 540, fixed: true })], { mood: 'warm' });
ep.panel(840, { cam: { on: ['harry'], fr: 'bust', dy: 0.05 }, bg: MO, blur: 2, actors: [HP({ x: 1400, expr: 'scheme', pose: 'hold', armB: { sh: 5, el: 8 }, armF: { sh: 30, el: 80, hand: 'hold', prop: g({ transform: 'translate(0,24) scale(0.3)' }, P2.timeTurner(1, { chain: false })) } })] },
  [inner('Harry', '*He sensed the work of a* competent *Slytherin.*', 400, 50, { anchor: 'tc', w: 340, fixed: true }),
   say('Harry', 'And what does it *really* do?', 520, 800, { anchor: 'bc', w: 300, fixed: true })], { mood: 'warm' });
ep.panel(1150, { cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.2 }, bg: MO, blur: 2, actors: [MCGS({ x: 1060, expr: 'calm' })] },
  [say('McGonagall', 'It\'s a Time-Turner. Each spin of the hourglass sends you one hour back in time.', 400, 64, { anchor: 'tc', w: 480, fixed: true }),
   say('McGonagall', 'So if you use it to go back two hours every day, you should always be able to get to sleep at the same time.', 400, 1105, { anchor: 'bc', w: 520, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { x: 400, y: 370, w: 800 }, bg: () => rect(-100, -100, 1000, 1000, { fill: '#e9dcc0' }) + g({ transform: 'translate(400,380)' }, circle(0, 0, 220, { fill: '#f6efdc', stroke: C.ink, 'stroke-width': 4 }), ...[...Array(26).keys()].map((k) => { const a = k / 26 * Math.PI * 2; return line(Math.sin(a) * 200, -Math.cos(a) * 200, Math.sin(a) * 180, -Math.cos(a) * 180, { stroke: C.ink, 'stroke-width': 3 }); }), line(0, 0, 0, -150, { stroke: C.ink, 'stroke-width': 6 }), line(0, 0, 110, 60, { stroke: C.ink, 'stroke-width': 5 }), g({ transform: 'translate(170,-170) scale(0.5)' }, P2.timeTurner(1, { chain: false }))) },
  [cap('*(Back at his parents\' house, she had promised him a solution "in time".)*', 44, 24, { w: 420, fixed: true })], { mood: 'sepia', y: 124, ph: 680, shape: 'cloud', seed: 4, alt: 'Memory: the 26-hour clock diagram from his first day, and the tiny hourglass beside it.' });
// the meltdown: he holds the Time-Turner away from himself like a live bomb
const HOLD_TT = { pose: 'holdUp', armB: { sh: 110, el: 0, hand: 'hold', prop: g({ transform: 'translate(0,40) scale(0.3)' }, P2.timeTurner(1)) } };
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: MO, blur: 3, actors: [HP({ x: 1400, expr: 'blank' })] },
  [inner('Harry', '*You\'re giving me a time machine to treat my sleep disorder.*', 400, 64, { anchor: 'tc', w: 520, fixed: true })], { mood: 'warm' });
ep.panel(680, { cam: { head: 'harry', hw: 0.74, hx: 0.5, hy: 0.6 }, bg: MO, blur: 3, actors: [HP({ x: 1400, expr: { base: 'blank', eyes: { open: 1.2 } } })] },
  [inner('Harry', '*You\'re giving me a time machine to treat my sleep disorder.*', 400, 64, { anchor: 'tc', w: 520, size: 36, fixed: true })], { mood: 'warm' });
ep.panel(860, { cam: { head: 'harry', hw: 1.1, hx: 0.5, hy: 0.58 }, bg: MO, blur: 3, actors: [HP({ x: 1400, expr: { base: 'horror', eyes: { open: 1.3 } } })], over: (e) => FX.burst(e.w, e.h, e.w / 2, e.h / 2, { n: 30, op: 0.2 }) },
  [shout('Harry', '*YOU\'RE GIVING ME A TIME MACHINE TO TREAT MY SLEEP DISORDER.*', 400, 96, { anchor: 'tc', w: 470, fixed: true, noTail: true })], { mood: 'warm', alt: 'Harry\'s eyes, getting wider and wider.' });
ep.panel(1000, { cam: { head: 'harry', hw: 0.4, hx: 0.47, hy: 0.3 }, bg: MO, actors: [HP({ x: 1400, expr: { base: 'laugh', eyes: { open: 1.2 } }, ...HOLD_TT })] },
  [say('Harry', 'Ehehehehhheheh…', 560, 60, { anchor: 'tc', w: 300, fixed: true }),
   cap('He was now holding the necklace away from himself as though it were a live bomb. No: that didn\'t begin to describe it. He was holding it away from himself as though it were a *time machine.*', 170, 704, { w: 500, fixed: true })], { mood: 'warm', x: 140, w: 642, breakout: 'left' });
ep.panel(1050, (ctx) => PENCIL(ctx) + g({ transform: 'translate(260,560)' },
    path('M-60,-340 L-10,-380 L40,-330 L20,-270 L70,-230 L40,-160 L90,-110 L60,-40 L110,20 L80,120 L30,150 L-20,100 L-60,160 L-100,120 L-80,40 L-120,-20 L-70,-80 L-110,-160 L-60,-220 L-90,-280Z', { fill: '#dcd2b6', stroke: '#2d2a4a', 'stroke-width': 3 }),
    circle(-10, -250, 110, { fill: '#5a4a3a', stroke: '#2d2a4a', 'stroke-width': 3 }), circle(-10, -250, 70, { fill: '#2a1b14' }),
    ...[0, 1, 2, 3].map((k) => path(`M${-40 + k * 25},-330 q-20,-60 10,-120 q30,-40 0,-90`, { fill: 'none', stroke: '#8a8a8a', 'stroke-width': 6, opacity: 0.7 }))) +
    PT(385, 300, '← where Scotland', 40, '#9a1f1f', 'start') + PT(425, 345, 'used to be', 40, '#9a1f1f', 'start') + PT(560, 480, 'time-reversed matter', 34) + PT(560, 522, '= ANTIMATTER', 44, '#9a1f1f') + PT(560, 610, 'me: 41 kg', 36) + PT(560, 680, '41 kg + 41 kg', 34) + PT(560, 725, '→ ~43 megatons of TNT', 34),
  [inner('Harry', '*Say, Professor McGonagall, did you know that time-reversed ordinary matter looks just like antimatter?*', 400, 1000, { anchor: 'bc', w: 560, fixed: true })], { shape: 'torn', frame: 'paper', seed: 8, tear: 12, alt: 'Harry\'s pencil sketch, on a torn-out page: Britain, with a giant smoking crater where Scotland used to be.' });
ep.panel(820, { cam: { on: ['harry'], fr: 'bust', dy: -0.25, dx: -0.45, zoom: 0.9 }, bg: MO, blur: 2, actors: [HP({ x: 1400, expr: 'yell', ...HOLD_TT })] },
  [shout('Harry', 'Excuse me, but this sounds really really *really REALLY DANGEROUS!*', 400, 84, { anchor: 'tc', w: 480, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.1 }, bg: MO, blur: 2, actors: [MCGS({ x: 1060, expr: 'warm' })] },
  [say('McGonagall', 'I\'m glad you\'re taking this seriously, Mr Potter. But Time-Turners aren\'t *that* dangerous. We wouldn\'t give them to children if they were.', 400, 64, { anchor: 'tc', w: 540, fixed: true })], { mood: 'warm' });
ep.panel(1250, { cam: { on: ['harry'], fr: 'bust', dy: -0.2, dx: -0.5 }, bg: MO, blur: 2, actors: [HP({ x: 1400, expr: 'laugh', ...HOLD_TT })] },
  [say('Harry', 'Really. Ahahahaha. Of course you wouldn\'t give time machines to children if they were dangerous, what *was* I thinking?', 400, 64, { anchor: 'tc', w: 520, fixed: true }),
   say('Harry', 'So just to be clear: sneezing on this device will *not* send me into the Middle Ages, where I will run over Gutenberg with a horse cart and prevent the Enlightenment? Because I hate it when that happens to me.', 400, 1195, { anchor: 'bc', w: 540, fixed: true })], { mood: 'warm' });
ep.panel(1180, { cam: STAND2(1180), bg: MO, actors: [MCGS({ turn: 0.4, expr: 'smile' }), HP({ x: 1400, expr: 'rant', ...HOLD_TT })] },
  [say('McGonagall', 'That can\'t possibly happen, Mr Potter. The Time-Turner cannot be used to go more than six hours back. And it can\'t be used more than six times in any day.', 300, 80, { anchor: 'tc', w: 380, fixed: true }),
   say('Harry', 'Oh, good, very good, that. And if someone bumps into me, it will *not* break and trap the whole castle of Hogwarts in an endlessly repeating loop of Thursdays?', 530, 470, { anchor: 'tc', w: 380, shape: 'box', fixed: true })], { mood: 'warm' });
ep.panel(1100, { cam: STAND2(1100), bg: MO, actors: [MCGS({ pose: 'shrug', turn: 0.4, expr: 'think' }), HP({ x: 1400, expr: 'deadpan', pose: 'crossArms' })] },
  [say('McGonagall', 'Well, they *can* be fragile… and I do think I\'ve heard about strange things happening if they\'re broken. But nothing like *that!*', 300, 80, { anchor: 'tc', w: 380, fixed: true }),
   say('Harry', 'Perhaps you ought to give your time machines some sort of *protective shell*, rather than *leaving the glass exposed.*', 505, 420, { anchor: 'tc', w: 380, fixed: true })], { mood: 'warm' });
ep.panel(880, { cam: { on: ['mcgonagall'], fr: 'bust', dy: 0.3 }, bg: MO, blur: 2, actors: [MCGS({ expr: 'awe' })] },
  [say('McGonagall', 'That\'s an excellent idea, Mr Potter. I shall inform the Ministry of it.', 400, 64, { anchor: 'tc', w: 460, fixed: true }),
   inner('Harry', '*That\'s it. It\'s official now. They\'ve ratified it in Parliament. Everyone in the wizarding world is completely stupid.*', 400, 840, { anchor: 'bc', w: 560, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.55 }, bg: MO, blur: 2, actors: [HP({ x: 1400, expr: 'yell', pose: 'gesture' })] },
  [say('Harry', 'And while I hate to get *philosophical*, has anyone thought about the *implications* of going back six hours and changing something, which would pretty much *delete everyone affected* and *replace them with different versions—*', 400, 70, { anchor: 'tc', w: 540, fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.05 }, bg: MO, blur: 2, actors: [MCGS({ pose: 'lecture' })] },
  [say('McGonagall', 'Oh, you can\'t *change* time! Good heavens, do you think these would be allowed students if *that* were possible? What if someone tried to change their test scores?', 400, 70, { anchor: 'tc', w: 540, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.42 }, bg: MO, blur: 2, actors: [HP({ x: 1400, expr: 'think', pose: 'chin' })] },
  [say('Harry', 'So… people just find that the universe *happens* to be self-consistent, somehow, even though it has time travel in it. If I meet my future self, he\'s already acting in full knowledge of things that, for me, haven\'t happened yet…', 400, 76, { anchor: 'tc', w: 530, fixed: true }),
   cap('His voice trailed off into the inadequacy of English.', 44, 840, { w: 380, fixed: true })], { mood: 'warm' });
ep.panel(1350, { cam: STAND2(1350), bg: MO, actors: [MCGS({ turn: 0.4, expr: 'calm' }), HP({ x: 1400, expr: 'rant', pose: 'armsUp' })] },
  [say('McGonagall', 'Wizards *are* advised to avoid being seen by their past selves. The first version of you should step aside and close his eyes at a known time. It\'s all in the pamphlet.', 300, 76, { anchor: 'tc', w: 380, fixed: true, tail: [150, 470] }),
   say('Harry', 'And it doesn\'t, say, create a paradox that destroys the universe.', 575, 445, { anchor: 'tc', w: 330, fixed: true }),
   say('McGonagall', 'Mr Potter, I think I\'d remember hearing if *that* had ever happened.', 232, 612, { anchor: 'tc', w: 300, fixed: true })], { mood: 'warm' });
// out of the frame entirely: at full volume, at the reader
ep.cutout(1420, { cam: { head: 'harry', hw: 0.27, hx: 0.5, hy: 0.655 }, actors: [HP({ x: 1400, expr: 'yell', pose: 'panic' })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.66, { n: 34, op: 0.3 }) },
  [shout('Harry', '*THAT IS NOT REASSURING! HAVEN\'T YOU PEOPLE EVER HEARD OF THE ANTHROPIC PRINCIPLE? AND WHAT IDIOT EVER BUILT ONE OF THESE THINGS FOR THE FIRST TIME?*', 400, 150, { anchor: 'tc', w: 440, size: 36, fixed: true })], { alt: 'Harry, arms flailing, at full volume.' });
ep.panel(1150, { cam: { on: ['mcgonagall'], fr: 'bust', dy: 0.25 }, bg: MO, blur: 2, actors: [MCGS({ expr: 'laugh' })] },
  [cap('Professor McGonagall actually laughed. It was a pleasant, glad sound that seemed surprisingly out of place on that stern face.', 44, 30, { w: 620, fixed: true }),
   say('McGonagall', 'You\'re having another "you turned into a cat" moment, aren\'t you, Mr Potter? You probably don\'t want to hear this, but it\'s quite endearingly cute.', 400, 1100, { anchor: 'bc', w: 540, fixed: true })], { mood: 'warm' });
ep.panel(1100, { cam: { on: ['harry'], fr: 'bust', dy: -0.78 }, bg: MO, blur: 2, actors: [HP({ x: 1400, expr: 'rant', pose: 'gesture' })] },
  [say('Harry', 'Turning into a cat doesn\'t even *begin* to compare to this! A Turing machine could simulate going back to a moment and computing a different future. But what you\'re saying is that reality somehow computes itself in one sweep, using information that hasn\'t… happened… *yet…*', 400, 76, { anchor: 'tc', w: 540, fixed: true })], { mood: 'warm' });
// realisation 1
// the first pile-driver: the panel itself bursts
ep.panel(940, { cam: { on: ['harry'], fr: 'close', zoom: 0.9 }, bg: MO, actors: [HP({ x: 1400, expr: { base: 'shock', eyes: { open: 1.3 } } })], behind: (e) => K.glow(e.w / 2, e.h * 0.42, 500, '#ffe9a8', 0.4) + FX.burst(e.w, e.h, e.w / 2, e.h * 0.42, { n: 40, col: '#fff3c9', op: 0.35 }) },
  [cap('Realisation struck Harry a pile-driver blow.', 44, 24, { w: 380, fixed: true })], { mood: 'warm', y: 96, ph: 830, shape: 'burst', points: 26, seed: 4, frame: 'glow', glow: '#f2b63c', alt: 'Light bursts behind Harry\'s wide eyes; the panel itself bursts.' });
ep.panel(1380, (ctx) => PENCIL(ctx) +
    g({ transform: 'translate(0,525)' }, rect(90, 120, 260, 110, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 4, rx: 14 }), PT(220, 165, 'drink the', 34), PT(220, 205, 'Comed-Tea', 38),
      rect(450, 120, 260, 110, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 4, rx: 14 }), PT(580, 165, 'something', 34), PT(580, 205, 'funny happens', 34),
      path('M355,175 L440,175 M425,160 L442,175 L425,190', { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 5 }), path('M350,140 L450,210 M450,140 L350,210', { stroke: '#9a1f1f', 'stroke-width': 6 }), PT(400, 280, 'NO!', 44, '#9a1f1f'),
      rect(90, 420, 260, 110, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 4, rx: 14 }), PT(220, 465, 'sudden urge', 34), PT(220, 505, 'to drink', 34),
      rect(450, 420, 260, 110, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 4, rx: 14 }), PT(580, 465, 'something funny', 34), PT(580, 505, '(about to happen)', 30),
      path('M580,540 Q580,680 400,690 Q220,680 220,545 M205,562 L220,540 L238,562', { fill: 'none', stroke: '#1f3a8a', 'stroke-width': 6 }), PT(400, 740, 'causal arrow pointing', 36, '#1f3a8a'), PT(400, 782, 'BACKWARDS IN TIME', 44, '#1f3a8a')),
  [shout('Harry', '*So THAT\'S how the Comed-Tea works!* The spell doesn\'t *make* funny things happen. It makes you feel an urge to drink right *before* something funny is going to happen *anyway!*', 400, 150, { anchor: 'tc', w: 420, size: 34, fixed: true, noTail: true })], { shape: 'torn', frame: 'paper', seed: 3, tear: 12, alt: 'Harry\'s diagram: "drink Comed-Tea → funny thing" crossed out; instead "funny thing (about to happen)" with an arrow pointing backwards in time to "sudden urge to drink".' });
ep.panel(900, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: MO, blur: 2, actors: [HP({ x: 1400, expr: 'rant', pose: 'raiseHand', armB: { sh: 112, el: 40, hand: 'palm' } })] },
  [say('Harry', 'I\'m such a fool! Last night I felt the urge to drink, *didn\'t*, and choked on my own spit anyway! The comedy causes the drinking! It all makes sense once you draw the causal arrows going *backwards in time!*', 400, 64, { anchor: 'tc', w: 580, fixed: true })], { mood: 'warm' });
// realisation 2
ep.panel(850, { cam: { head: 'harry', hw: 0.8, hx: 0.55, hy: 0.42 }, bg: MO, blur: 3, actors: [HP({ x: 1400, expr: { base: 'horror', eyes: { open: 1.2 }, mouth: { type: 'wobble' } } })] },
  [cap('Realisation struck Harry the *second* pile-driver.', 44, 24, { w: 460, fixed: true }),
   cap('This one he managed to keep quiet, making only a small strangled sound, like a dying kitten, as he realised who had put the note on his bed this morning.', 44, 664, { w: 620, fixed: true })], { mood: 'warm', y: 118, ph: 530, shape: 'eye' });
ep.panel(1100, { cam: STAND2(1100), bg: MO, actors: [MCGS({ pose: 'present', turn: 0.4, expr: 'delight' }), HP({ x: 1400, expr: 'blank', pose: 'slump' })] },
  [say('McGonagall', 'After you graduate, or possibly even before, you really *must* teach some of these Muggle theories at Hogwarts, Mr Potter. They sound quite fascinating, even if they\'re all wrong.', 330, 76, { anchor: 'tc', w: 440, fixed: true }),
   say('Harry', 'Glehhahhh…', 580, 650, { anchor: 'tc', w: 220, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { x: 1560, y: 600, w: 720 }, bg: () => CS.corridor({ seed: 23, windows: [2300], torches: [1200] }) + K.door(1540, 400, 260, 500, '#4a2e1b'), actors: [{ def: harryRaven, id: 'harry', x: 1400, y: 910, s: 1.1, turn: 0.2, pose: 'slump', expr: 'blank' }] },
  [cap('Somehow Harry found himself standing outside her office, with the door closed firmly behind him.', 44, 30, { w: 620, fixed: true }),
   say('Harry', 'Gaahhhrrrraa…', 560, 520, { w: 260, fixed: true }),
   cap('Why yes, his mind *was* blown.', 44, 740, { w: 360, fixed: true })], { mood: 'warm' });
// the blank map lies on the page itself: no frame around the unknown
ep.cutout(1000, (ctx) => g({ transform: `translate(${ctx.w / 2},${ctx.h * 0.52})` }, path('M-300,-240 L300,-240 L320,240 L-280,250Z', { fill: '#f3ead3', stroke: C.ink, 'stroke-width': 3 }), path('M-300,-240 q-30,20 0,40 M300,-240 q30,20 0,40', { fill: '#e2d3ae', stroke: C.ink, 'stroke-width': 2 }), PT(0, 10, '?', 200, '#c9b48a')),
  [cap('He had always believed that if you were ignorant about something, that was a fact about *you,* not about the thing. A blank map did not mean a blank territory. There were mysterious questions, but never mysterious answers.', 44, 30, { w: 620, fixed: true }),
   cap('Now, for the first time, he faced a mystery that might be *permanent.* His brain was made of neurons that only ran forwards in time. There might be nothing it could ever do to understand this.', 44, 800, { w: 620, fixed: true })], { alt: 'An empty map, alone on the page, with a single faint question mark.' });

// ---------------------------------------------------------------- five hours earlier
ep.setBg('#1c2233');
ep.beat(420, [title('Five hours earlier.', 400, 200, { size: 54, color: '#f1e6cc' })], { over: () => g({ transform: 'translate(400,320) scale(0.6)' }, P2.timeTurner(1, { chain: false, rot: 30, glow: true })) });
ep.setBg(C.paper);
const DAWN = (o = {}) => () => CS.ravenclawDorm({ time: 'morning', quiet: 1, ...o });
const H1 = (o = {}) => ({ def: harryPJ, id: 'harry1', x: 1100, y: 900, s: 1.1, turn: 0.1, pose: 'sit', seat: 250, expr: 'asleep', glasses: false, ...o });
const SLEEPERS = () => [560, 1640].map((x, i) => ({ def: [terry, anthony][i], id: 'sl' + i, x, y: 900, s: 1.05, turn: 0.1, pose: 'sit', seat: 250, expr: 'asleep' }));
ep.panel(1000, { cam: { x: 1100, y: 520, w: 1500 }, bg: DAWN(), actors: [...SLEEPERS(), H1(), () => CS.dormBlanket({ lift: 40 }), { def: harryRaven, id: 'harry', x: 1450, y: 1010, s: 1.1, turn: -0.3, pose: 'tiptoe', expr: 'focus' }, (e) => { const a = e.wa.harry; return a ? path(`M${a.head[0] - 90},${a.head[1] + 40} Q${a.head[0] - 60},${a.head[1] - 120} ${a.head[0] + 10},${a.head[1] - 110} Q${a.head[0] + 90},${a.head[1] - 100} ${a.head[0] + 100},${a.head[1] + 50}`, { fill: '#1f1d24', stroke: C.ink, 'stroke-width': 3 }) : ''; }, () => g({ transform: 'translate(1270,1000)' }, P2.giftBox(0.8))] },
  [cap('Five hours earlier, Harry was sneaking into his dorm with his robes pulled up over his head, in case someone saw him at the same time as Harry lying in bed. He didn\'t want to explain about his little medical problem with Spontaneous Duplication.', 44, 30, { w: 620, fixed: true }),
   cap('Everyone was still asleep. And there was a box by his bed, in red and green paper with a golden ribbon.', 44, 800, { w: 620, fixed: true })], { mood: 'warm', alt: 'Dawn in the dorm. Harry (in bed, asleep) and Harry (dressed, robe over his head) creeping in. By the bed, a Christmas-wrapped present.' });
ep.bleed(1260, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#3a2a22' }) + K.glow(ctx.w / 2, ctx.h / 2, 600, '#ffe9a8', 0.25),
  [{ type: 'letter', text: 'This is the Cloak of Invisibility of Ignotus Peverell, passed down through his descendants the Potters. Unlike lesser cloaks and spells, it has the power to keep you *hidden,* not merely invisible. Your father lent it to me to study shortly before he died.\n\nIt is time the Cloak was returned to you, its heir. I had thought to make this a Christmas present, but it wished to come back to your hand before then. It seems to expect you to have need of it. Use it well.\n\nNo doubt you are already thinking of all manner of wonderful pranks, as your father committed in his day. I shall not try to stop history from repeating. But be *most* careful not to reveal yourself. If Dumbledore saw a chance to possess one of the Deathly Hallows, he would never let it escape his grasp until the day he died.\n\nA Very Merry Christmas to you.', x: 400, y: 610, w: 620, fixed: true, font: "'IM Fell DW Pica', serif", size: 25, align: 'left' },
   cap('The note was unsigned.', 440, 1160, { w: 280, fixed: true })], { alt: 'The letter that came with the present.' });
ep.panel(1000, { cam: { x: 820, y: 470, w: 900 }, bg: DAWN(), actors: [{ def: terry, id: 'terry', x: 500, y: 960, s: 1.05, turn: 0.4, pose: 'crossArms', expr: 'suspicious' }, { def: anthony, id: 'anthony', x: 680, y: 960, s: 1.05, turn: 0.4, expr: 'neutral' }, { def: harryRaven, id: 'harry', x: 1120, y: 1000, s: 1.1, turn: -0.5, pose: 'raiseHand', expr: 'calm', armB: { sh: 140, el: 20, hand: 'palm' } }] },
  [say('Harry', 'Hold on. There\'s something else I\'ve got to do with my trunk. I\'ll be along to breakfast in a couple of minutes.', 520, 70, { anchor: 'tc', w: 400, fixed: true }),
   say('Terry', 'You\'d better not be planning to go through any of our things.', 250, 330, { anchor: 'tc', w: 320, fixed: true })], { mood: 'warm', alt: 'Morning. The other boys, dressed, on their way out; Harry hanging back.' });
ep.panel(1150, { cam: { on: ['harry'], fr: 'waist', dy: -0.95 }, bg: DAWN(), actors: [{ def: harryRaven, id: 'harry', x: 1250, y: 1000, s: 1.1, turn: -0.5, pose: 'raiseHand', expr: 'calm', armB: { sh: 140, el: 20, hand: 'palm' } }] },
  [say('Harry', 'I swear that I intend to do nothing of the sort to any of your things, that I only intend to access objects that I myself own, that I have no pranking or otherwise questionable intentions towards any of you, and that I do not anticipate those intentions changing before I get to breakfast in the Great Hall.', 400, 76, { anchor: 'tc', w: 560, fixed: true })], { mood: 'warm' });
ep.panel(920, { cam: { x: 600, y: 500, w: 1100 }, bg: DAWN(), actors: [{ def: terry, id: 'terry', x: 500, y: 960, s: 1.05, turn: 0.4, pose: 'point', expr: 'suspicious' }, { def: clearwater, id: 'penelope', x: 260, y: 960, turn: 0.4, pose: 'crossArms', expr: 'smile' }, { def: harryRaven, id: 'harry', x: 1050, y: 1000, s: 1.1, turn: -0.5, pose: 'stand', expr: 'neutral' }] },
  [say('Terry', 'Wait, is that…', 500, 40, { anchor: 'tc', w: 240, fixed: true, tail: [425, 335] }),
   say('Penelope', 'Don\'t worry. There were no loopholes. Well-worded, Potter. You should be a lawyer.', 212, 170, { anchor: 'tc', w: 310, shape: 'box', fixed: true }),
   say('Harry', 'Thank you. I think.', 640, 390, { anchor: 'tc', w: 240, fixed: true })], { mood: 'warm' });
ep.panel(1150, { cam: { on: ['penelope'], fr: 'bust', dy: -0.63 }, bg: DAWN(), blur: 2, actors: [{ def: clearwater, id: 'penelope', x: 800, y: 960, turn: 0.3, pose: 'lecture', expr: 'stern' }] },
  [say('Penelope', 'When you try to find the Great Hall, you *will* get lost. Ask a portrait the *instant* you suspect you might be lost. If you are higher than the whole castle ought to be, *stop* and wait for search parties.', 400, 64, { anchor: 'tc', w: 560, fixed: true }),
   say('Penelope', 'Otherwise we shall see you again four months later, and you will be five months older, and dressed in a loincloth, and covered in snow. And *that\'s if you stay inside the castle.*', 400, 1085, { anchor: 'bc', w: 560, fixed: true })], { mood: 'warm' });
ep.panel(950, { cam: { x: 720, y: 455, w: 1000 }, bg: DAWN(), actors: [{ def: clearwater, id: 'penelope', x: 360, y: 960, turn: 0.6, pose: 'walk', expr: 'calm' }, { def: harryRaven, id: 'harry', x: 1050, y: 1000, s: 1.1, turn: -0.5, pose: 'stand', expr: 'worried' }] },
  [say('Harry', 'Understood. Um, shouldn\'t you tell students all that sort of stuff right away?', 530, 60, { anchor: 'tc', w: 380, fixed: true }),
   say('Penelope', 'What, *all* of it? That would take weeks. You\'ll pick it up as you go along.', 260, 270, { anchor: 'tc', w: 340, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { x: 1180, y: 600, w: 900 }, bg: DAWN({ harryNote: true }), actors: [H1(), () => CS.dormBlanket({ lift: 40 }), { def: harryRaven, id: 'harry', x: 1380, y: 1010, s: 1.1, turn: -0.5, pose: 'reach', expr: 'scheme', armB: { sh: 76, el: 5, hand: 'hold' }, armF: { sh: 60, el: 30, hand: 'hold' } }], over: (e) => { const a = e.anchors.harry1, h = e.anchors.harry; if (!a || !h) return ''; const p = h.handB, q = [a.head[0] + 30, a.head[1] + 105]; const L = Math.hypot(p[0] - q[0], p[1] - q[1]); return g({ transform: `translate(${(p[0] + q[0]) / 2},${(p[1] + q[1]) / 2}) rotate(${Math.atan2(p[1] - q[1], p[0] - q[0]) * 180 / Math.PI})` }, P2.cloak(L - 10, 90, { fade: 0.9 })); } },
  [cap('He attached the note to his bed—he\'d already written it, and all the others, down in his trunk before anyone woke. Then he reached inside the Quietus field and pulled the Cloak of Invisibility off the still-sleeping Harry.', 44, 30, { w: 620, fixed: true }),
   cap('And, just for the sake of mischief, he put the Cloak into that Harry\'s pouch. Knowing it would thereby already be in his own.', 44, 820, { w: 620, fixed: true })], { mood: 'warm', alt: 'Harry, dressed, peels a shimmering cloak off the sleeping Harry in the bed.' });

// the montage of the set-up
const AR_WALL = () => CS.corridor({ seed: 29, windows: [], torches: [1300] });
ep.multi(1500, [
  { x: M, y: 18, w: 300, h: 800, mood: 'candle', art: { cam: { head: 'harry', hw: 0.6, hx: 0.45, hy: 0.4 }, bg: () => CS.trunkCavern(), actors: [{ def: harryRaven, id: 'harry', x: 900, y: 900, s: 1.1, turn: 0.4, pose: 'scribble', expr: 'scheme', armF: { sh: 30, el: 60, hand: 'hold', prop: g({ transform: 'rotate(-50)' }, quill(80)) } }, (e) => { const a = e.wa.harry; return a?.handF ? g({ transform: `translate(${a.handF[0] + 10},${a.handF[1] + 40}) rotate(-6)` }, rect(-80, -14, 160, 100, { fill: '#efe3c4', stroke: C.ink, 'stroke-width': 3 }), ...[0, 1, 2, 3].map((k) => line(-60, 6 + k * 18, 50 - (k % 2) * 30, 6 + k * 18, { stroke: '#5a4a6a', 'stroke-width': 2.4 }))) : ''; }] } },
  { x: 340, y: 18, w: 436, h: 800, mood: 'warm', art: { cam: { x: 800, y: 620, w: 620 }, bg: () => AR_WALL() + CS.portraitCanvas(500, 130, 380, 460, { cols: ['#4a5a6a', '#20283a'] }), actors: [{ def: aristocrat, id: 'aristocrat', x: 690, y: 950, s: 1.5, turn: 0.3, pose: 'stand', expr: 'suspicious' }, CS.wallWithHole(AR_WALL, 500, 130, 380, 460), { def: harryRaven, id: 'harry', x: 985, y: 900, s: 1.1, turn: -0.4, pose: 'shrug', expr: 'smile' }] } },
  { x: M, y: 836, w: 368, h: 646, mood: 'warm', art: { cam: { on: ['hermione', 'harry'], fr: 'bust', zoom: 1.35, dy: -1.6, dx: 0.1 }, bg: () => HG.hallTable('r', { day: true }), actors: [{ def: hermioneRaven, id: 'hermione', x: 560, y: 1050, s: 1.1, turn: 0.4, pose: 'point', expr: 'cross' }, { def: harryRaven, id: 'harry', x: 800, y: 1050, s: 1.1, turn: -0.2, pose: 'holdOne', expr: 'grin', armF: { hand: 'hold', prop: g({ transform: 'translate(0,20) scale(0.4)' }, P2.pie(1)) } }, () => HG.tableFront()] } },
  { x: 408, y: 836, w: 368, h: 646, mood: 'warm', art: { cam: { on: ['sprout', 'harry'], fr: 'bust', zoom: 1.2, dy: -1.6 }, bg: () => CS.greenhouse(), actors: [{ def: sprout, id: 'sprout', x: 700, y: 900, turn: 0.4, pose: 'crossArms', expr: 'suspicious' }, { def: harryRaven, id: 'harry', x: 1000, y: 960, s: 1.1, turn: -0.4, pose: 'gesture', expr: 'focus' }] } },
], [cap('Writing notes.', 44, 34, { w: 200, fixed: true }),
  say('Harry', 'I was told it was spoken by a hollow voice that belled forth from a gap within the air itself…', 556, 590, { anchor: 'tc', w: 315, size: 28, fixed: true, tail: 'harry@1' }),
  say('Hermione', 'That\'s *everyone\'s* dessert!', 208, 870, { anchor: 'tc', w: 280, fixed: true }),
  say('Sprout', 'And how do *you* know what the Slytherins are planning?', 592, 870, { anchor: 'tc', w: 300, fixed: true })],
  { alt: 'The set-up, in four pictures: Harry writing notes in his trunk; Harry giving a portrait the message; Harry pocketing two pies at breakfast, to Hermione\'s outrage; Harry talking to Professor Sprout among the greenhouse plants.' });
ep.panel(1150, { cam: { on: ['harry'], fr: 'waist', dy: -0.2 }, bg: () => CS.greenhouse(), actors: [{ def: harryRaven, id: 'harry', x: 1000, y: 960, s: 1.1, turn: -0.4, pose: 'gesture', expr: 'focus' }] },
  [say('Harry', 'I can\'t name my source. In fact, I have to ask you to pretend this conversation never happened. Just act like you came across them naturally.', 400, 64, { anchor: 'tc', w: 560, fixed: true }),
   say('Harry', 'I\'ll distract them until you get there. I don\'t think they\'ll dare seriously hurt the Boy-Who-Lived. But I\'d appreciate it if you didn\'t dawdle.', 400, 1095, { anchor: 'bc', w: 500, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['sprout'], fr: 'bust', dy: -0.2 }, bg: () => CS.greenhouse(), blur: 2, actors: [{ def: sprout, id: 'sprout', x: 700, y: 900, turn: 0.4, pose: 'stand', expr: { base: 'warm', eyes: { soft: true } } }] },
  [cap('Professor Sprout looked at him for a long moment. Then her face softened.', 44, 30, { w: 540, fixed: true }),
   say('Sprout', 'Please be careful with yourself, Harry Potter. And… thank you.', 400, 780, { anchor: 'bc', w: 460, fixed: true })], { mood: 'warm', frame: 'dissolve', feather: 60 });

// under the Cloak
const COR = () => CS.corridor({ seed: 13, windows: [300, 2200], torches: [1200] });
ep.panel(880, { cam: { x: 1320, y: 530, w: 950 }, bg: COR, actors: [{ def: derrick, id: 'derrick', x: 1250, y: 940, s: 1.4, turn: -0.3, pose: 'wand', expr: 'menace', armB: { sh: 92, el: -8, hand: 'hold', prop: wand(90) } }, { def: harryRaven, id: 'harry1', x: 1000, y: 990, s: 1.1, turn: 0.4, pose: 'stand', expr: 'smug' }, () => CS.invisible(1650, 980, 1.1), (e) => path('M1610,690 Q1520,390 1400,430', { fill: 'none', stroke: '#6a5a4a', 'stroke-width': 5, 'stroke-dasharray': '12 10' }) + g({ transform: 'translate(1375,440) rotate(-30)' }, P2.pie(0.75, 'blueberry'))] },
  [cap('Where had the pies come from? From a boy nobody could see.', 44, 30, { w: 560, fixed: true })], { mood: 'warm', alt: 'A faint shimmer in the corridor, in the shape of a boy, hurls a blueberry pie at the Slytherin\'s head.' });
ep.panel(820, { cam: { x: 1060, y: 650, w: 1000 }, bg: COR, actors: [
    ...[0, 1, 2].map((i) => ({ def: student(1340 + i, 'h'), id: 'h' + i, x: 600 + i * 95, y: 970, s: 1.0, turn: 0.5, expr: 'horror' })),
    { def: slyTeen(1), id: 's1', x: 1010, y: 930, s: 1.3, turn: 0.2, expr: 'laugh' }, { def: derrick, id: 'derrick', x: 1400, y: 940, s: 1.4, turn: -0.3, expr: 'smug', pose: 'crossArms' },
    { def: nevilleHuff, id: 'neville', x: 1050, y: 1000, s: 1.05, turn: 0.4, expr: 'shock', pose: 'fallBack' }, { def: harryRaven, id: 'harry1', x: 1250, y: 990, s: 1.1, turn: -0.2, pose: 'reach', expr: 'cold', armB: { sh: 100, el: 20, hand: 'fist' } },
    () => CS.invisible(1800, 1000, 1.1)], over: (e) => FX.speedLines(e.w, e.h, { n: 14 }) },
  [cap('It was horrible, watching himself yank Neville out of the circle of Slytherins. Neville had been right. He\'d used too much force. *Way* too much force.', 44, 30, { w: 620, fixed: true })], { mood: 'warm', shape: 'slant', slant: -90, alt: 'From the invisible Harry\'s point of view: the other Harry yanking Neville out of the ring, much too hard.' });
ep.bleed(960, { cam: { x: 1070, y: 800, w: 1480 }, bg: COR, actors: [
    ...[0, 1, 2, 3, 4, 5].map((i) => ({ def: i === 0 ? ernie : student(1340 + i, 'h'), id: 'h' + i, x: 420 + i * 92, y: 960 + (i % 2) * 20, s: 1.0, turn: 0.5, expr: 'worried' })),
    { def: nevilleHuff, id: 'neville', x: 900, y: 980, s: 1.05, turn: 0.4, expr: 'cry' },
    { def: harryRaven, id: 'harry1', x: 1250, y: 990, s: 1.1, turn: 0.05, pose: 'stand', expr: 'cold' },
    { def: slyTeen(1), id: 's1', x: 1010, y: 930, s: 1.3, turn: 0.2, expr: 'laugh' }, { def: slyTeen(3), id: 's3', x: 1140, y: 880, s: 1.3, turn: 0.1, expr: 'grin' }, { def: derrick, id: 'derrick', x: 1420, y: 940, s: 1.4, turn: -0.3, expr: 'smug' }, { def: slyTeen(2), id: 's2', x: 1560, y: 930, s: 1.3, turn: -0.4 }, { def: conscience, id: 'conscience', x: 1720, y: 910, s: 1.28, turn: -0.5, expr: 'worried' },
    () => CS.invisible(2100, 1000, 1.1)], over: (e) => FX.frost(e.w, e.h, 0.18, 61) },
  [cold('Harry', 'Hello. I\'m the Boy-Who-Lived.', 545, 650, { w: 300, fixed: true, tail: 'harry1' }),
   cap('Eight first-year boys, all about the same height. One of them had a scar on his forehead, and he wasn\'t acting like the others.', 44, 790, { w: 620, fixed: true })], { alt: 'The whole scene from outside: seven frightened first-years, and one small cold boy in the middle of the Slytherins.' });
ep.setBg('#141018');
ep.beat(700, [
  capC('*O wad some Power the giftie gie us*\n*To see oursels as ithers see us!*\n*It wad frae mony a blunder free us,*\n*An\' foolish notion.*', 400, 260, { w: 560, bg: 'transparent', border: 'transparent', color: '#e9dcc0' }),
  plain('Robert Burns', 400, 470, { font: "'IM Fell English SC', serif", size: 24, color: '#9a8a70' }),
]);
// after Burns: the others' view of him, framed like a looking-glass
ep.panel(990, { cam: { on: ['harry1'], fr: 'close', zoom: 0.9 }, bg: COR, actors: [{ def: harryRaven, id: 'harry1', x: 1250, y: 990, s: 1.1, turn: 0.05, pose: 'stand', expr: 'cold' }], over: (e) => rect(0, 0, e.w, e.h, { fill: '#0c1428', opacity: 0.35 }) + FX.frost(e.w, e.h, 0.5, 63) },
  [cap('Professor McGonagall was right. The Sorting Hat was right. It was clear, once you saw it from the outside.', 44, 24, { w: 620, fixed: true }),
   capC('There was something wrong with Harry Potter.', 400, 920, { w: 560, fixed: true })], { mood: 'cold', x: 90, w: 620, y: 156, ph: 700, shape: 'oval', borderColor: '#aab8c8', borderWidth: 7, alt: 'Harry\'s cold face in an oval like a looking-glass, seen as the others see it.' });
ep.setBg(C.paper);
ep.end();
export default ep;
