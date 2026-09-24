// EPISODE 4 — The Efficient Market Hypothesis  (source: HPMOR ch. 4 + first half of ch. 5)
import { Episode, say, shout, whisper, think, inner, cold, cap, capC, dark, note, title, plain, M } from '../engine/core/dsl.js';
import { shot } from '../engine/core/scene.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as L from '../engine/bg/london.js';
import * as B from '../engine/bg/bank.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harry, mcgonagall, griphook, goblin, oldMan, mokeKeeper, makeExtra } from '../engine/chars/cast.js';
import { seal, galleon, cane, pouch, coinBag } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep04', number: 4, title: 'The Efficient Market Hypothesis' });
ep.setBg(C.paper);
ep.beat(260, [plain('CHAPTER FOUR', 400, 90, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('The Efficient Market Hypothesis', 400, 170, { size: 44 })]);

// =============================================================== the banking hall
const clerks = [goblin('g1'), { ...goblin('g2', { coat: '#2f4a33' }), glasses: { r: 13, shape: 'half', frame: 0.8 } }, goblin('g3'), goblin('g4', { coat: '#243352' })];
ep.panel(800, { cam: { x: 1080, y: 590, w: 1300 }, bg: () => B.bankHall(),
  actors: [...clerks.map((d, i) => ({ def: d, id: 'c' + i, x: 300 + i * 520, y: 620, s: 1.0, turn: i % 2 ? -0.3 : 0.3, pose: 'scribble', expr: i === 1 ? 'suspicious' : 'focus' })), B.bankCounter(),
    { def: mcgonagall, id: 'mcgonagall', x: 1000, y: 1120, turn: 0.2, pose: 'stand', expr: 'calm' }, { def: harry, id: 'harry', x: 1180, y: 1130, s: 1.1, turn: -0.1, pose: 'stand', expr: 'awe' }] },
  [cap('Inside, it was marble and gold and hush, and the clerks were not human.', 44, 34, { w: 460 })], { mood: 'day', alt: 'The great marble banking hall of Gringotts, lit by tall windows and candle chandeliers. Goblin clerks scribble at a long high counter.' });
ep.panel(660, { cam: { on: ['c1'], fr: 'bust' }, bg: () => B.bankHall(), blur: 2, actors: [{ def: clerks[1], id: 'c1', x: 820, y: 600, turn: -0.2, pose: 'crossArms', expr: { base: 'suspicious', eyes: { lookX: -0.6, lookY: 0.4 } } }, B.bankCounter()] },
  [cap('One of them looked down at Harry over his spectacles as if pricing him.', 44, 34, { w: 450 })], { mood: 'day' });

// =============================================================== the cart
ep.bleed(900, { cam: { x: 830, y: 700, w: 1050 }, bg: () => B.tunnel({ dragon: true }),
  actors: [{ def: griphook, id: 'griphook', x: 650, y: 890, s: 1.1, turn: 0.4, pose: 'stand', expr: 'bigGrin' }, { def: harry, id: 'harry', x: 800, y: 900, s: 1.1, turn: 0.4, pose: 'armsUp', expr: 'delight' }, { def: mcgonagall, id: 'mcgonagall', x: 990, y: 930, turn: 0.4, pose: 'cower', expr: 'wince' }, B.mineCart(820, 1000, 1.25)],
  over: (e) => FX.speedLines(e.w, e.h, { n: 60, col: '#f3e6c0', angle: -12 }) },
  [shout('Harry', 'IS THIS A *ROLLER COASTER?!*', 330, 130, { w: 380, size: 34, fixed: true, tail: 'harry' }), note('clatter clatter clatter', 540, 850, { size: 36, color: '#f3e6c0', w: 500 })], { alt: 'A mine cart hurtles through dark caverns. Harry has both arms up, thrilled. McGonagall grips her hat. Somewhere in the dark, something large with an orange eye watches.' });

// =============================================================== the vault
ep.bleed(1000, { cam: { x: 900, y: 690, w: 1200 }, bg: () => B.vault(), actors: [{ def: harry, id: 'harry', x: 900, y: 1300, s: 1.6, turn: 0, pose: 'stand', expr: 'awe' }] },
  [capC('Heaps of gold Galleons. Stacks of silver Sickles. Piles of bronze Knuts.', 400, 70, { w: 560 })], { mood: 'candle', alt: 'The Potter vault: mountains of gold coins glittering in torchlight, and Harry, very small, staring.' });
ep.panel(800, { cam: { on: ['mcgonagall'], fr: 'waist', dx: -0.6 }, bg: () => B.vaultDoor(true), actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1150, y: 1070, turn: -0.4, pose: 'crossArms', expr: { base: 'calm', eyes: { lookX: -0.4, lookY: 0.3 } } }] },
  [cap('From the doorway, Professor McGonagall watched him. She was leaning casually against the wall, but with her eyes intent.', 44, 34, { w: 330 }),
   cap('Being plopped in front of a giant heap of gold coins was a test of character so pure it was archetypal.', 44, 612, { w: 440 })], { mood: 'candle' });
const VA = () => B.vault();
const GH = (o = {}) => ({ def: griphook, id: 'griphook', x: 1250, y: 1110, s: 1.1, turn: -0.4, pose: 'stand', expr: 'neutral', ...o });
const HV = (o = {}) => ({ def: harry, id: 'harry', x: 900, y: 1110, s: 1.1, turn: 0.4, pose: 'stand', ...o });
ep.panel(700, { cam: { on: ['harry', 'griphook'], fr: 'waist' }, bg: VA, actors: [HV({ expr: 'think', pose: 'chin' }), GH()] },
  [say('Harry', 'Are these coins the pure metal?', 250, 90, { w: 260 })], { mood: 'candle' });
ep.panel(700, { cam: { on: ['griphook'], fr: 'close', dy: -0.2 }, bg: VA, blur: 2, actors: [GH({ expr: 'angry' })], over: (e) => FX.emanata(e.w * 0.5, e.h * 0.5, 190, { n: 5, a0: -160, a1: -20 }) },
  [shout('Griphook', 'Are you questioning the integrity of Gringotts, Mr Potter-Evans-Verres?', 400, 120, { w: 480, size: 30, fixed: true })], { mood: 'candle' });
ep.panel(860, { cam: { on: ['harry'], fr: 'bust', dx: 0.55, dy: -0.55 }, bg: VA, blur: 2, actors: [HV({ expr: 'embarrassed', pose: 'shrug' })] },
  [say('Harry', 'No! Not at all. Sorry if that came out wrong, sir. I just have no idea how your financial system works.', 400, 125, { w: 520, fixed: true }),
   say('Harry', 'Can anyone coin Galleons? Or are they issued by a monopoly that thereby collects seigniorage?', 590, 560, { w: 260, fixed: true, tail: 'harry' })], { mood: 'candle' });
ep.multi(500, [
  { x: M, y: 18, w: 368, h: 464, mood: 'candle', art: { cam: { on: ['mcgonagall'], fr: 'close', dy: -0.3 }, bg: () => B.vaultDoor(true), blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1150, y: 1070, turn: -0.3, expr: 'confused' }] } },
  { x: 408, y: 18, w: 368, h: 464, mood: 'candle', art: { cam: { on: ['griphook'], fr: 'close', dy: -0.5 }, bg: VA, blur: 2, actors: [GH({ expr: 'bigGrin' })] } },
], [say('McGonagall', 'What?', 120, 70, { w: 130 }), say('Griphook', 'Only a fool would trust any but goblin coin!', 592, 108, { w: 300, fixed: true, tail: 'griphook@1' })]);
ep.panel(940, { cam: { on: ['harry', 'griphook'], fr: 'waist', dy: -2.3 }, bg: VA, actors: [HV({ expr: 'scheme', pose: 'gesture' }), GH({ expr: 'suspicious' })] },
  [say('Harry', 'Suppose I came in here with a ton of silver. Could I get a ton of Sickles made from it?', 250, 150, { w: 340, fixed: true }),
   say('Griphook', 'For a fee, Mr Potter-Evans-Verres. For a certain *fee.* Where would you find a ton of silver, I wonder?', 522, 412, { w: 390, fixed: true })], { mood: 'candle' });
ep.panel(880, { cam: { on: ['harry', 'griphook'], fr: 'waist', dy: -2.2 }, bg: VA, actors: [HV({ expr: 'smug', pose: 'stand' }), GH({ expr: 'focus' })] },
  [say('Harry', 'I was speaking hypothetically. Give me a wild guess. What fraction would you charge?', 250, 150, { w: 340, fixed: true }),
   say('Griphook', 'A twentieth part of the metal would well pay for the coining.', 575, 410, { w: 300, fixed: true })], { mood: 'candle' });
// the arbitrage diagram
const arbitrage = (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  for (let y = 40; y < h; y += 34) out += line(0, y, w, y, { stroke: '#b9c9d8', 'stroke-width': 1 });
  const Y1 = 250, Y2 = h - 90; // top row sits below the caption
  const nodes = [[w * 0.25, Y1, 'a ton of silver'], [w * 0.75, Y1, 'Sickles'], [w * 0.75, Y2, 'Galleons (17 Sickles each)'], [w * 0.25, Y2, 'gold → Muggle London']];
  const T = (x, y, s, fs = 34) => text(x, y, s, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, 'text-anchor': 'middle', fill: '#2d2a4a' });
  nodes.forEach(([x, y, s]) => { out += ellipse(x, y, 150, 50, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 2.5 }) + T(x, y + 10, s, 28); });
  const arr = (a, b, lab) => { const [x1, y1] = a, [x2, y2] = b; return path(`M${x1},${y1} Q${(x1 + x2) / 2 + (y2 - y1) * 0.15},${(y1 + y2) / 2 - (x2 - x1) * 0.15} ${x2},${y2}`, { fill: 'none', stroke: '#c43a32', 'stroke-width': 3 }) + T((x1 + x2) / 2, (y1 + y2) / 2 - 14, lab, 26); };
  out += arr([w * 0.25 + 150, Y1], [w * 0.75 - 150, Y1], '-5% fee') + arr([w * 0.75, Y1 + 50], [w * 0.75, Y2 - 50], 'change') + arr([w * 0.75 - 150, Y2], [w * 0.25 + 150, Y2], 'sell gold') + arr([w * 0.25, Y2 - 50], [w * 0.25, Y1 + 50], '≈ 50 : 1 !!');
  out += T(w / 2, (Y1 + Y2) / 2 + 12, 'repeat forever', 38);
  return out;
};
ep.panel(800, arbitrage, [cap('*So not only is the wizarding economy almost completely decoupled from the Muggle economy. No-one here has ever heard of arbitrage!*', 44, 30, { w: 560 })],
  { alt: 'Harry\'s pencil diagram: silver → Sickles → Galleons → gold sold in Muggle London → more silver than you started with. Repeat forever.' });

ep.beat(300, [capC('One competent hedge fund manager could probably own the whole wizarding world within a week. Harry filed the notion away, in case he ever ran out of money, or had a week free.', 400, 150, { w: 600 })]);
// Fermi estimate
ep.panel(860, { cam: { on: ['harry'], fr: 'waist', dx: 0.75, dy: 0.1 }, bg: VA, actors: [HV({ expr: 'focus', pose: 'hold', armF: { sh: 30, el: 70, hand: 'hold', prop: g({}, galleon(10), g({ transform: 'translate(8,-6)' }, galleon(10))) } })] },
  [say('McGonagall', 'I think that will be more than enough to pay for your school supplies, Mr Potter.', 562, 136, { w: 330, fixed: true, tail: [770, 310] }),
   say('Harry', 'Hm? Hold on, I\'m doing a Fermi calculation.', 590, 520, { w: 280, fixed: true, tail: 'harry' })], { mood: 'candle' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: () => B.vaultDoor(true), blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1150, y: 1070, turn: -0.2, expr: 'shock' }] },
  [say('McGonagall', 'A *what?*', 560, 90, { w: 170 })], { mood: 'candle' });
const fermi = (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  for (let y = 40; y < h; y += 34) out += line(0, y, w, y, { stroke: '#b9c9d8', 'stroke-width': 1 });
  const T = (x, y, s, fs = 32, a = 'start') => text(x, y, s, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, 'text-anchor': a, fill: '#2d2a4a' });
  out += path(`M${w * 0.62},${h * 0.8} L${w * 0.78},${h * 0.3} L${w * 0.94},${h * 0.8}Z`, { fill: '#f7dc8c', stroke: '#2d2a4a', 'stroke-width': 3 });
  out += T(w * 0.78, h * 0.25, '60 coins high', 34, 'middle') + T(w * 0.78, h * 0.9, '20 × 20 wide', 34, 'middle') + T(w * 0.78, h * 0.66, '÷ 3', 34, 'middle');
  const lines = ['20 Galleons ≈ 0.1 kg', 'gold ≈ £10,000 / kg', '→ 1 Galleon ≈ £50', '', 'one mound ≈', '     8,000 Galleons', '× 5 mounds ≈ 40,000', '≈ £2,000,000'];
  lines.forEach((s, i) => { out += T(40, 76 + i * 60, s, i === 7 ? 54 : 40); });
  out += path(`M34,${76 + 7 * 60 + 16} l360,0`, { stroke: '#c43a32', 'stroke-width': 4 }) + path(`M34,${76 + 7 * 60 + 24} l360,0`, { stroke: '#c43a32', 'stroke-width': 4 });
  return out;
};
ep.panel(700, fermi, [], { alt: 'Harry\'s Fermi estimate in pencil: twenty Galleons weigh about a tenth of a kilo, so a Galleon is about fifty pounds; five pyramid-shaped mounds come to about two million pounds.' });
ep.panel(700, { cam: { on: ['harry'], fr: 'close', dy: 0.12 }, bg: VA, blur: 2, actors: [HV({ expr: { base: 'smug', mouth: { type: 'grin', open: 0.3 } } })] },
  [inner('Harry', 'Not bad.', 120, 64, { w: 200, fixed: true }),
   inner('Harry', 'That\'s the last time I ever mow a lawn for one lousy pound.', 400, 612, { w: 470, fixed: true })], { mood: 'candle' });

// where did it come from?
ep.panel(800, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist', dy: -0.25 }, bg: VA, actors: [HV({ expr: 'think', pose: 'gesture' }), { def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1120, turn: -0.4, pose: 'stand', expr: 'calm' }] },
  [say('Harry', 'Pardon me for asking, Professor, but is this a *usual* amount of money for a young couple to have?', 300, 125, { w: 440, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'bust', dx: 0.6, dy: -0.3 }, bg: VA, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1120, turn: -0.4, pose: 'stand', expr: 'calm' }] },
  [say('McGonagall', 'Your father was the last heir of an old family. And… some of it may be from bounties placed on You-Know-Who.', 400, 125, { w: 520, fixed: true }),
   say('McGonagall', 'Payable to whoever might defeat him.', 590, 560, { w: 240, fixed: true, tail: 'mcgonagall' })], { mood: 'candle' });
ep.panel(960, { cam: { on: ['harry'], fr: 'bust', dx: -0.55, dy: -0.25 }, bg: VA, blur: 2, actors: [HV({ expr: 'scheme', pose: 'present' })] },
  [say('Harry', 'Interesting… So some of this really is, in a sense, *mine.* Earned by me. Sort of. Possibly.', 400, 125, { w: 520, fixed: true }),
   say('Harry', 'That makes me feel less guilty about spending a *very tiny fraction of it!*', 215, 450, { w: 260, fixed: true, tail: 'harry' }),
   shout('Harry', 'DON\'T PANIC, PROFESSOR McGONAGALL!', 400, 812, { w: 300, size: 30, fixed: true, tail: 'harry' })], { mood: 'candle' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust', dy: -0.2 }, bg: VA, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1120, turn: -0.3, pose: 'point', expr: 'angry' }] },
  [shout('McGonagall', 'Mr Potter! You are a *minor!* You will only be allowed to make *reasonable* withdrawals!', 400, 145, { w: 460, size: 30, fixed: true })], { mood: 'candle' });
ep.panel(820, { cam: { on: ['harry'], fr: 'bust', dx: 0.95, dy: -0.25 }, bg: VA, blur: 2, actors: [HV({ expr: 'delight', pose: 'handsHips' })] },
  [say('Harry', 'I am *all about* reasonable! I am *totally* on board with fiscal prudence and impulse control!', 400, 120, { w: 520, fixed: true }),
   say('Harry', 'But I *did* see some things on the way here which would constitute *sensible, grown-up* purchases…', 546, 520, { w: 345, fixed: true, tail: 'harry' })], { mood: 'candle' });
// staring contest
ep.multi(360, [
  { x: M, y: 18, w: 368, h: 324, mood: 'candle', art: { cam: { on: ['harry'], fr: 'eyes' }, bg: VA, blur: 3, actors: [HV({ expr: 'determined' })] } },
  { x: 408, y: 18, w: 368, h: 324, mood: 'candle', art: { cam: { on: ['mcgonagall'], fr: 'eyes' }, bg: VA, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1120, turn: -0.2, expr: 'stern' }] } },
], [note('…', 64, 290, { size: 60, color: '#fff3d0' }), note('…', 736, 290, { size: 60, color: '#fff3d0' })], { over: (t) => FX.sfxText(400, 318, 'VS', { size: 70, rot: -6 }) });
ep.panel(420, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: VA, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1120, turn: -0.2, expr: 'unimpressed' }] },
  [say('McGonagall', 'Like what?', 560, 90, { w: 170 })], { mood: 'candle' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust', dx: 0.8, dy: -0.2 }, bg: VA, blur: 2, actors: [HV({ expr: 'pleading', pose: 'gesture2' })] },
  [say('Harry', 'Trunks whose insides hold more than their outsides?', 330, 110, { w: 420, fixed: true }),
   say('Harry', 'When I\'m an adult I\'ll want one anyway. And I *can* afford one. It\'s the same money either way, right?', 570, 470, { w: 290, fixed: true, tail: 'harry' })], { mood: 'candle' });
ep.panel(580, { cam: { on: ['mcgonagall'], fr: 'bust', dx: -0.45 }, bg: VA, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1120, turn: -0.3, pose: 'crossArms', expr: 'suspicious' }] },
  [say('McGonagall', 'And just what would you *keep* in a trunk like that, Mr Potter?', 250, 130, { w: 330 })], { mood: 'candle' });
ep.multi(360, [
  { x: M, y: 18, w: 368, h: 324, mood: 'candle', art: { cam: { on: ['harry'], fr: 'close' }, bg: VA, blur: 3, actors: [HV({ expr: 'bigGrin' })] } },
  { x: 408, y: 18, w: 368, h: 324, mood: 'candle', art: { cam: { on: ['mcgonagall'], fr: 'close' }, bg: VA, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1120, turn: -0.2, expr: 'exasperated' }] } },
], [say('Harry', 'Books.', 150, 60, { w: 120 }), say('McGonagall', 'Of course.', 640, 60, { w: 170 })]);
ep.panel(820, { cam: { on: ['harry'], fr: 'bust', dy: -0.55 }, bg: VA, blur: 2, actors: [HV({ expr: 'delight', pose: 'lecture' })] },
  [say('Harry', 'And I\'ll make the deal sweeter! Hogwarts can keep some of the books I bring, for the library. It\'s okay to bribe people with *books*, right? That\'s a—', 400, 158, { w: 560, fixed: true })], { mood: 'candle' });
ep.multi(420, [
  { x: M, y: 18, w: 368, h: 384, mood: 'candle', art: { cam: { on: ['mcgonagall'], fr: 'close', dy: -0.3 }, bg: VA, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1120, turn: -0.2, expr: 'deadpan' }] } },
  { x: 408, y: 18, w: 368, h: 384, mood: 'candle', art: { cam: { on: ['harry'], fr: 'close', dy: -0.45 }, bg: VA, blur: 3, actors: [HV({ expr: 'happy' })] } },
], [say('McGonagall', 'Family tradition.', 208, 72, { w: 300, fixed: true, tail: 'mcgonagall@0' }), say('Harry', 'Yes, exactly!', 592, 72, { w: 280, fixed: true, tail: 'harry@1' })]);
ep.panel(800, { cam: { on: ['mcgonagall'], fr: 'waist', dx: -0.75, dy: -0.2 }, bg: VA, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1120, turn: -0.3, pose: 'slump', expr: 'exasperated' }] },
  [say('McGonagall', 'I cannot deny the sense of your words, though I much wish I could. I will allow you an additional hundred Galleons.', 290, 160, { w: 400, fixed: true }),
   say('McGonagall', 'I *know* that I shall regret this, and I am doing it anyway.', 225, 540, { w: 280, fixed: true, tail: 'mcgonagall' })], { mood: 'candle' });
ep.panel(1040, { cam: { on: ['harry'], fr: 'waist', dy: 0.1 }, bg: VA, actors: [HV({ expr: 'bigGrin', pose: 'armsUp' })], under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { col: '#f0c878', op: 0.4 }) },
  [say('Harry', 'That\'s the spirit! And does a "mokeskin pouch" do what I think it does?', 400, 110, { w: 520, fixed: true }),
   say('Harry', 'It would be like Batman\'s utility belt of holding! I could have the top three books I\'m reading on me at all times! It\'s for the sake of children\'s reading, the best of all possible causes!', 400, 860, { w: 560, fixed: true, tail: 'harry' })], { mood: 'candle' });
ep.multi(560, [
  { x: M, y: 18, w: 368, h: 404, mood: 'candle', art: { cam: { on: ['mcgonagall'], fr: 'close', dy: -0.45 }, bg: VA, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1120, turn: -0.2, expr: 'pained' }] } },
  { x: 408, y: 18, w: 368, h: 404, mood: 'candle', art: { cam: { on: ['griphook'], fr: 'close' }, bg: VA, blur: 3, actors: [GH({ expr: { base: 'awe', eyes: { sparkle: false } } })] } },
], [say('McGonagall', '…I suppose you may add another ten Galleons.', 208, 112, { w: 300, fixed: true, tail: 'mcgonagall@0' }), capC('Griphook was favouring Harry with a gaze of frank respect.', 400, 482, { w: 640, fixed: true })]);
ep.panel(780, { cam: { on: ['harry'], fr: 'bust', dx: 0.3, dy: -0.2 }, bg: VA, blur: 2, actors: [HV({ expr: 'smug', pose: 'gesture' })] },
  [say('Harry', 'And a little spending money, like you mentioned earlier. I think I remember seeing one or two other things…', 420, 130, { w: 500, fixed: true, tail: 'harry' })], { mood: 'candle' });
ep.panel(520, { cam: { on: ['mcgonagall'], fr: 'eyes', dy: 0.15 }, bg: VA, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1120, turn: -0.2, expr: 'menace' }] },
  [cold('McGonagall', 'Don\'t push it, Mr Potter.', 400, 440, { w: 520, fixed: true, noTail: true })], { mood: 'candle' });
ep.panel(820, { cam: { on: ['harry'], fr: 'waist', dy: -0.5 }, bg: VA, actors: [HV({ expr: 'delight', pose: 'bowGrand' })] },
  [say('Harry', 'But oh, Professor McGonagall, why rain on my parade? Surely this is a *happy* day, when I discover all things wizarding for the first time!', 400, 150, { w: 480, fixed: true })], { mood: 'candle' });
ep.panel(980, { cam: { on: ['harry'], fr: 'bust', dy: -0.75 }, bg: VA, blur: 2, actors: [HV({ expr: 'delight', pose: 'gesture' })] },
  [say('Harry', 'Why not smile and remember your own innocent childhood, watching the delight upon my young face as I buy a few toys using an insignificant fraction of the wealth I earned by defeating the most terrible wizard Britain has ever known? Not that I\'m accusing you of being ungrateful or anything!', 400, 290, { w: 540, fixed: true, tail: 'harry' })], { mood: 'candle' });
ep.bleed(820, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: VA, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1120, turn: -0.1, pose: 'fists', expr: { base: 'menace', glint: true, gloom: true } }],
  under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { bg: '#2a0808', col: '#7a1a1a', op: 0.9, n: 120 }),
  over: (e) => { const h = e.anchors?.mcgonagall?.head; return h ? K.glow(h[0], h[1], 260, '#ff3a2a', 0.25) : ''; } },
  [shout('McGonagall', '*You.*', 400, 110, { w: 200, size: 60, bg: '#1a0808', border: '#ff5a3a', color: '#ffd9c0' })], { mood: 'dread', alt: 'McGonagall\'s face, backlit in red, is fearsome and terrible.' });
ep.panel(760, { cam: { x: 1110, y: 900, w: 820 }, bg: VA, actors: [{ def: harry, id: 'harry', x: 900, y: 1130, s: 1.1, turn: 0.3, pose: 'fallBack', expr: 'horror' }, { def: griphook, id: 'griphook', x: 1300, y: 1120, s: 1.1, turn: -0.3, pose: 'facepalm', armF: { sh: -4, el: 8 }, armB: { sh: 30, el: 150, hand: 'palm', hr: 160 }, expr: 'exasperated' }],
  over: (e) => FX.sfxText(e.w * 0.5, e.h * 0.86, 'JINGLE-CRASH', { size: 76, rot: -5 }) },
  [cap('Harry squeaked, stepped back, and sprawled backwards into a heap of money. Griphook put a palm over his face.', 44, 34, { w: 560 })], { mood: 'candle' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: VA, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1120, turn: -0.3, pose: 'handsHips', expr: 'stern' }] },
  [say('McGonagall', 'I would be doing a great service to wizarding Britain, Mr Potter, if I locked you in this vault and left you here.', 290, 110, { w: 400 })], { mood: 'candle' });
ep.beat(300, [capC('And they left without any more trouble.', 400, 140, { w: 460 })]);
ep.panel(560, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#4b4a55' }) + path(`M${w * 0.1},0 L${w * 0.1},${h} M${w * 0.9},0 L${w * 0.9},${h}`, { stroke: '#3a3944', 'stroke-width': 3 });
  out += path(`M${w * 0.35},${h * 0.25} Q${w * 0.3},${h * 0.7} ${w * 0.48},${h * 0.78} Q${w * 0.66},${h * 0.72} ${w * 0.62},${h * 0.25}Z`, { fill: '#3e3d48', stroke: C.ink, 'stroke-width': 3 });
  out += [0, 1, 2, 3].map((i) => g({ transform: `translate(${w * (0.42 + i * 0.04)},${h * (0.5 + (i % 2) * 0.06)})` }, galleon(16))).join('');
  out += path(`M${w * 0.35},${h * 0.25} L${w * 0.62},${h * 0.25}`, { stroke: C.ink, 'stroke-width': 4 });
  return out;
}, [note('clink', 610, 210, { size: 48, rot: 8, color: '#f6e3b0' }), cap('Not *quite* without any more trouble.', 44, 30, { w: 520 })], { mood: 'candle', alt: 'Close on Harry\'s trouser pocket, bulging with gold coins he scooped up when he fell.' });

// =============================================================== the Moke Shop
const MK = () => B.mokeShop();
const KEEP = (o = {}) => ({ def: mokeKeeper, id: 'keeper', x: 800, y: 1000, turn: -0.4, pose: 'present', expr: 'worried', ...o });
ep.panel(980, { cam: { x: 770, y: 543, w: 1000 }, bg: MK, actors: [KEEP(), B.mokeCounter(), { def: harry, id: 'harry', x: 460, y: 1110, s: 1.1, turn: 0.5, pose: 'hold', expr: 'awe', armF: { sh: 30, el: 70, hand: 'hold', prop: g({ transform: 'translate(0,34)' }, pouch(1)) } }, { def: mcgonagall, id: 'mcgonagall', x: 1080, y: 1120, turn: -0.4, pose: 'crossArms', expr: 'calm' }] },
  [cap('The Moke Shop was a quaint little shop behind a vegetable stall behind a glove shop, down an alleyway off a side street of Diagon Alley.', 44, 34, { w: 590 }),
   say('Keeper', 'The Moke Super Pouch QX31! Widening Lip *and* an Undetectable Extension Charm.', 400, 302, { w: 560, fixed: true, tail: 'keeper' })], { mood: 'warm', alt: 'A tiny shop crammed with hanging pouches. A nervous young witch in faded yellow robes shows Harry a furry pouch.' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust', dx: -0.6 }, bg: MK, blur: 2, actors: [{ def: harry, id: 'harry', x: 460, y: 1110, s: 1.1, turn: 0.3, pose: 'hold', expr: { base: 'hopeful', eyes: { irisScale: 1.2, sparkle: true } }, armF: { sh: 30, el: 70, hand: 'hold', prop: g({ transform: 'translate(0,34)' }, pouch(1)) } }] },
  [say('Harry', 'Can I try this for a bit? To make sure it works, um, *reliably?*', 220, 170, { w: 290, fixed: true, tail: 'harry' }), cap('He widened his eyes in an expression of boyish, playful innocence.', 44, 520, { w: 270 })], { mood: 'warm' });
// the heist, in four beats
const hands = (phase) => (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#6b4429' }) + K.glow(w * 0.5, h * 0.3, 400, C.candle, 0.3);
  out += g({ transform: `translate(${w * 0.5},${h * 0.62})` }, pouch(2.2, { open: true }));
  const handL = (x, y, holding) => g({ transform: `translate(${x},${y})` }, path('M-60,40 L-20,-10 L20,10 L-20,60Z', { fill: '#c9922e', stroke: C.ink, 'stroke-width': 3 }), ellipse(0, 0, 26, 22, { fill: '#f3d2b5', stroke: C.ink, 'stroke-width': 3 }), holding ? g({ transform: 'translate(10,-20)' }, coinBag(1.4)) : '');
  const handR = (x, y, coins) => g({ transform: `translate(${x},${y})` }, path('M60,40 L20,-10 L-20,10 L20,60Z', { fill: '#c9922e', stroke: C.ink, 'stroke-width': 3 }), ellipse(0, 0, 26, 22, { fill: '#f3d2b5', stroke: C.ink, 'stroke-width': 3 }), coins ? g({ transform: 'translate(-6,-14)' }, galleon(9), g({ transform: 'translate(10,4)' }, galleon(9)), g({ transform: 'translate(-12,8)' }, galleon(9))) : '');
  if (phase === 0) out += handL(w * 0.36, h * 0.38, true) + handR(w * 0.78, h * 0.8, false);
  if (phase === 1) out += handL(w * 0.2, h * 0.7, false) + handR(w * 0.6, h * 0.4, true);
  if (phase === 2) out += handL(w * 0.2, h * 0.7, false) + handR(w * 0.56, h * 0.44, false) + g({ transform: `translate(${w * 0.5},${h * 0.5})` }, galleon(9));
  return out;
};
ep.multi(930, [
  { x: M, y: 18, w: 240, h: 360, art: hands(0), mood: 'warm' }, { x: 280, y: 18, w: 240, h: 360, art: hands(1), mood: 'warm' }, { x: 536, y: 18, w: 240, h: 360, art: hands(2), mood: 'warm' },
  { x: M, y: 540, w: 752, h: 372, mood: 'warm', art: { cam: { on: ['mcgonagall', 'keeper'], fr: 'bust' }, bg: MK, blur: 1, actors: [KEEP({ x: 900, expr: { base: 'neutral', eyes: { lookX: 1 } }, turn: 0.4, pose: 'stand' }), { def: mcgonagall, id: 'mcgonagall', x: 1120, y: 1120, turn: 0.5, pose: 'stand', expr: { base: 'calm', eyes: { lookX: 1 } } }] } },
], [note('"bag of gold"', 144, 342, { size: 36, color: '#f6e3b0' }), note('"bag of gold"', 400, 342, { size: 36, color: '#f6e3b0' }), note('"bag of gold"', 656, 342, { size: 36, color: '#f6e3b0' }),
  capC('After ten repetitions, Professor McGonagall wandered off to examine the other items in the shop, and the shopkeeper turned to watch her.', 400, 459, { w: 680, fixed: true })],
  { alt: 'Close on Harry\'s hands: left hand dips the bag of gold into the pouch; right hand, fist full of loose coins from his pocket, sneaks in behind it. McGonagall and the shopkeeper are looking the other way.' });
ep.panel(760, { cam: { on: ['harry'], fr: 'close', dy: 0.05 }, bg: MK, blur: 3, actors: [{ def: harry, id: 'harry', x: 460, y: 1110, s: 1.1, turn: 0.3, expr: 'wince' }] },
  [inner('Harry', 'The golden coins were his. But they were still stolen. Self-stolen? *Auto-thieved?*', 400, 78, { w: 600, fixed: true }),
   inner('Harry', 'About thirty Galleons, he guessed.', 400, 684, { w: 520, fixed: true })], { mood: 'warm' });
const wavingDoor = (e) => {
  const x0 = e.w * 0.72, y0 = e.h * 0.3, dw = 150, dh = e.h - y0;
  const W = '#6b4429', D = '#4e2f1a';
  return g({},
    rect(x0, y0, dw, dh, { fill: W, stroke: C.ink, 'stroke-width': 4 }),
    rect(x0 + 18, y0 + 20, dw - 36, dh * 0.36, { fill: 'none', stroke: D, 'stroke-width': 3 }), rect(x0 + 18, y0 + dh * 0.46, dw - 36, dh * 0.44, { fill: 'none', stroke: D, 'stroke-width': 3 }),
    circle(x0 + dw - 26, y0 + dh * 0.44, 7, { fill: '#c9a24a', stroke: C.ink, 'stroke-width': 2 }),
    // a wooden arm grows out of the door and waves
    path(`M${x0 + 10},${y0 + dh * 0.5} Q${x0 - 60},${y0 + dh * 0.45} ${x0 - 80},${y0 + dh * 0.12}`, { fill: 'none', stroke: C.ink, 'stroke-width': 30, 'stroke-linecap': 'round' }),
    path(`M${x0 + 10},${y0 + dh * 0.5} Q${x0 - 60},${y0 + dh * 0.45} ${x0 - 80},${y0 + dh * 0.12}`, { fill: 'none', stroke: W, 'stroke-width': 22, 'stroke-linecap': 'round' }),
    g({ transform: `translate(${x0 - 82},${y0 + dh * 0.08}) rotate(-12)` },
      path('M-26,10 L-30,-34 Q-30,-42 -22,-42 Q-15,-42 -15,-34 L-13,-14 L-12,-50 Q-12,-58 -4,-58 Q4,-58 4,-50 L4,-16 L8,-52 Q8,-60 16,-60 Q24,-59 23,-51 L20,-14 L27,-40 Q30,-47 37,-44 Q43,-41 40,-34 L30,6 Q26,30 0,32 Q-24,32 -26,10Z', { fill: W, stroke: C.ink, 'stroke-width': 3.5, 'stroke-linejoin': 'round' })),
    path(`M${x0 - 150},${y0 - 10} q-14,30 0,60 M${x0 - 172},${y0 - 22} q-20,42 0,84 M${x0 - 20},${y0 - 30} q20,24 10,56`, { fill: 'none', stroke: C.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round' }));
};
ep.panel(640, { cam: { x: 640, y: 600, w: 1000 }, bg: () => L.diagonAlley({ seed: 12 }),
  actors: [{ def: mcgonagall, id: 'mcgonagall', x: 480, y: 1060, turn: 0.4, pose: 'walk', expr: 'calm' }, { def: harry, id: 'harry', x: 680, y: 1060, s: 1.1, turn: -0.3, pose: 'walk2', expr: 'worried' }],
  over: wavingDoor },
  [cap('The door formed a hand and waved goodbye to them, which made Harry feel a bit queasy.', 44, 30, { w: 440 })], { mood: 'day', alt: 'As they leave, the shop door grows a wooden hand and waves.' });

// =============================================================== the old man
const SA = () => B.sideAlley();
const OM = (o = {}) => ({ def: oldMan, id: 'oldman', x: 1080, y: 1080, turn: -0.4, pose: 'stand', expr: 'teary', armB: { sh: 20, el: 20, hand: 'hold', prop: g({ transform: 'translate(0,10)' }, cane(260)) }, ...o });
ep.panel(760, { cam: { on: ['oldman'], fr: 'bust' }, bg: () => L.diagonAlley({ seed: 12 }), blur: 2, actors: [OM({ x: 900, y: 1060 })] },
  [whisper('Old man', 'Are you *really* Harry Potter? You wouldn\'t lie about that, would you?', 290, 90, { w: 350, tail: 'oldman' }),
   whisper('Old man', 'Only I\'d heard rumours that you didn\'t *really* survive, and that\'s why no-one ever heard from you again.', 290, 580, { w: 360, tail: 'oldman' })], { mood: 'day', alt: 'An old man with a cane, one huge tear on his cheek.' });
ep.panel(820, { cam: { on: ['harry', 'mcgonagall', 'oldman'], fr: 'waist', dy: -1.1 }, bg: SA, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 560, y: 1080, turn: 0.4, pose: 'crossArms', expr: 'stern' }, { def: harry, id: 'harry', x: 800, y: 1080, s: 1.1, turn: 0.4, pose: 'think', expr: 'think' }, OM({ x: 1120, armB: { sh: -8, el: 6, hand: 'hold', prop: g({ transform: 'translate(0,10)' }, cane(260)) } })] },
  [cap('Professor McGonagall yanked Harry into the nearest alleyway.', 44, 34, { w: 470 }),
   say('Harry', 'I only know what other people have told me. It\'s not like I remember being born.', 440, 240, { w: 460, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(800, { cam: { on: ['harry'], fr: 'bust', dy: -0.4 }, bg: SA, blur: 2, actors: [{ def: harry, id: 'harry', x: 800, y: 1080, s: 1.1, turn: 0.3, pose: 'lecture', expr: 'focus' }] },
  [say('Harry', 'If there\'s already sufficient cause to postulate a conspiracy, there\'s no reason they wouldn\'t just find another orphan and raise him to believe *he* was Harry Potter.', 400, 150, { w: 580, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'bust', dx: 0.8 }, bg: SA, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 560, y: 1080, turn: 0.4, pose: 'facepalm', expr: 'exasperated' }] },
  [say('McGonagall', 'You look just about exactly like your father, the year he first came to Hogwarts.', 548, 160, { w: 300, fixed: true, tail: 'mcgonagall' }),
   say('McGonagall', 'And I can attest on the basis of *personality alone* that you are related to the Scourge of Gryffindor.', 538, 545, { w: 340, fixed: true, tail: [300, 560] })], { mood: 'day' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: SA, blur: 3, actors: [{ def: harry, id: 'harry', x: 800, y: 1080, s: 1.1, turn: 0.2, expr: 'suspicious' }] },
  [say('Harry', '*She* could be in on it too.', 560, 100, { w: 240 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['oldman'], fr: 'close', dx: 0.3 }, bg: SA, blur: 3, actors: [OM({ expr: 'warm' })] },
  [whisper('Old man', 'No. She\'s right. You have your mother\'s eyes.', 596, 125, { w: 280, fixed: true, tail: 'oldman' })], { mood: 'day' });
ep.multi(500, [
  { x: M, y: 18, w: 368, h: 464, mood: 'day', art: { cam: { on: ['harry'], fr: 'close', dy: -0.6 }, bg: SA, blur: 3, actors: [{ def: harry, id: 'harry', x: 800, y: 1080, s: 1.1, turn: 0.4, expr: 'suspicious' }] } },
  { x: 408, y: 18, w: 368, h: 464, mood: 'day', art: { cam: { on: ['mcgonagall'], fr: 'close', dy: -0.3 }, bg: SA, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 560, y: 1080, turn: 0.2, expr: 'angry' }] } },
], [say('Harry', 'Hmm. I suppose *you* could be in on it too…', 208, 102, { w: 262, fixed: true, tail: 'harry@0' }), say('McGonagall', 'Enough, Mr Potter.', 592, 80, { w: 280, fixed: true, tail: 'mcgonagall@1' })]);
ep.panel(700, { cam: { on: ['oldman'], fr: 'bust', dx: 0.7 }, bg: SA, actors: [OM({ pose: 'stand', expr: 'warm', turn: -0.2 })] },
  [whisper('Old man', 'I\'m just glad that you\'re alive. Thank you, Harry Potter. Thank you for what you did.', 580, 150, { w: 300, fixed: true, tail: 'oldman' }),
   whisper('Old man', 'I\'ll leave you alone now.', 590, 470, { w: 240, fixed: true, tail: 'oldman' })], { mood: 'day' });
ep.panel(520, { cam: { x: 820, y: 860, w: 900 }, bg: SA, actors: [OM({ x: 950, turn: 0.7, pose: 'walk', expr: 'calm', s: 0.8 })] },
  [note('tap…', 260, 300, { size: 44, color: '#f6e3b0', rot: -6 }), note('tap…', 400, 360, { size: 44, color: '#f6e3b0', rot: 4 }), note('tap…', 250, 420, { size: 44, color: '#f6e3b0', rot: -3 })], { mood: 'day', alt: 'The old man taps slowly away out of the alley.' });

// =============================================================== the fundamental attribution error
ep.panel(860, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist', dy: -0.55 }, bg: SA, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 620, y: 1080, turn: 0.4, pose: 'stand', expr: 'stern' }, { def: harry, id: 'harry', x: 860, y: 1080, s: 1.1, turn: -0.4, pose: 'slump', expr: 'sad' }] },
  [say('McGonagall', 'That was not well done. I know you\'re not used to this, Mr Potter, but people do care about you. Please be kind to them.', 400, 132, { w: 600, fixed: true, tail: 'mcgonagall' }),
   say('Harry', 'They shouldn\'t. Care about me, I mean.', 600, 470, { w: 280, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: SA, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 620, y: 1080, turn: 0.3, expr: 'confused' }] },
  [say('McGonagall', 'You saved them from You-Know-Who. How should they not care?', 545, 95, { w: 370 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close', dy: -0.18 }, bg: SA, blur: 3, actors: [{ def: harry, id: 'harry', x: 860, y: 1080, s: 1.1, turn: -0.3, expr: 'unimpressed' }] },
  [say('Harry', 'I suppose there\'s no chance that if I said "fundamental attribution error" you\'d have any idea what that meant.', 400, 128, { w: 540, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'close', dx: 0.6 }, bg: SA, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 620, y: 1080, turn: 0.3, expr: 'calm' }] },
  [say('McGonagall', 'No. But please explain, Mr Potter, if you would be so kind.', 590, 180, { w: 280, fixed: true, tail: 'mcgonagall' })], { mood: 'day' });
const fae = (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  const T = (x, y, s, fs = 30, a = 'middle', col = '#2d2a4a') => text(x, y, s, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, 'text-anchor': a, fill: col });
  const stick = (x, y, kick) => g({ transform: `translate(${x},${y}) scale(1.45) translate(${-x},${-y})` }, path(`M${x},${y - 90} m-18,0 a18,18 0 1 0 36,0 a18,18 0 1 0 -36,0 M${x},${y - 72} L${x},${y - 20} M${x},${y - 60} L${x - 26},${y - 40} M${x},${y - 60} L${x + 26},${y - 44} M${x},${y - 20} L${x - 18},${y + 20} M${x},${y - 20} ${kick ? `L${x + 40},${y - 6}` : `L${x + 16},${y + 20}`}`, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 3.5, 'stroke-linecap': 'round' }));
  out += line(w / 2, 20, w / 2, h - 20, { stroke: '#b9ad92', 'stroke-width': 2, 'stroke-dasharray': '6 6' });
  out += T(w * 0.25, 60, 'what YOU see', 44) + T(w * 0.75, 60, 'what HE lived', 44);
  out += stick(w * 0.17, h * 0.6, true) + rect(w * 0.25, h * 0.45, 100, 80, { fill: 'none', stroke: '#2d2a4a', 'stroke-width': 3.5 }) + T(w * 0.25, h * 0.8, '"what an', 38, 'middle', '#c43a32') + T(w * 0.25, h * 0.8 + 42, 'angry person!"', 38, 'middle', '#c43a32');
  out += stick(w * 0.6, h * 0.6, false) + rect(w * 0.68, h * 0.26, 22, h * 0.4, { fill: '#b9ad92' }) + T(w * 0.8, h * 0.31, 'SHOVE!', 38) + stick(w * 0.88, h * 0.6, false) + T(w * 0.75, h * 0.8, 'bumped into a wall,', 34) + T(w * 0.75, h * 0.8 + 40, 'then shouted at', 34);
  return out;
};
ep.beat(260, [capC('"When we look at other people, we see personality traits. When we look at ourselves, we see circumstances."', 400, 130, { w: 600 })]);
ep.panel(620, fae, [], { alt: 'Pencil diagram: on the left a stick figure kicking a desk, labelled "what an angry person!"; on the right, the same man being shoved into a wall on his way to work.' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'full', dx: 0.45, dy: -0.1 }, bg: SA, actors: [{ def: harry, id: 'harry', x: 860, y: 1080, s: 1.1, turn: -0.3, pose: 'fists', expr: 'angry', legF: { hip: 40, knee: -10 } }],
  over: (e) => FX.sfxText(e.w * 0.62, e.h * 0.86, 'THUD', { size: 64, rot: -10 }) },
  [say('Harry', 'People think I saved them from You-Know-Who because I have some kind of permanent, enduring *destroy-the-Dark-Lord* trait.', 400, 138, { w: 580, fixed: true, tail: 'harry' }),
   say('Harry', 'I was fifteen months old! They don\'t care about *me.* They want to shake hands with a *bad explanation.*', 582, 590, { w: 290, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: SA, blur: 3, actors: [{ def: harry, id: 'harry', x: 860, y: 1080, s: 1.1, turn: -0.2, expr: 'hopeful' }] },
  [say('Harry', 'Do *you* know what really happened?', 400, 100, { w: 320 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: SA, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 620, y: 1080, turn: 0.4, pose: 'crossArms', expr: 'smug' }] },
  [say('McGonagall', 'I *have* formed an idea… After meeting you, that is.', 540, 100, { w: 300 }), say('Harry', 'Yes?', 700, 460, { w: 110, tail: [790, 540] })], { mood: 'day' });
ep.panel(740, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: SA, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 620, y: 1080, turn: 0.2, expr: { base: 'smug', eyes: { open: 0.6 } } }] },
  [say('McGonagall', 'You triumphed over the Dark Lord by being more awful than *he* was, and survived the Killing Curse by being more terrible than Death.', 400, 110, { w: 560 })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'waist' }, bg: SA, actors: [{ def: harry, id: 'harry', x: 860, y: 1080, s: 1.1, turn: -0.4, pose: 'stand', expr: 'deadpan', legB: { hip: -40, knee: 10 } }],
  over: (e) => FX.sfxText(e.w * 0.75, e.h * 0.85, 'thud', { size: 44, rot: 8 }) },
  [say('Harry', 'Ha. Ha. Ha.', 250, 110, { w: 200 })], { mood: 'day' });
ep.panel(820, { cam: { on: ['mcgonagall', 'harry'], fr: 'waist', dy: -0.4 }, bg: SA, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 620, y: 1080, turn: 0.4, pose: 'gesture', expr: 'laugh' }, { def: harry, id: 'harry', x: 860, y: 1080, s: 1.1, turn: -0.4, pose: 'stand', expr: 'unimpressed' }] },
  [say('McGonagall', 'Let\'s get you to Madam Malkin\'s next. I fear your Muggle clothing may be attracting attention.', 400, 115, { w: 560, fixed: true, tail: 'mcgonagall' })], { mood: 'day' });
ep.panel(820, { cam: { x: L.shopAt('Madam Malkin', { seed: 7 }), y: 560, w: 760 }, bg: () => L.diagonAlley({ seed: 7 }) },
  [cap('Madam Malkin\'s Robes for All Occasions. A genuinely boring shop front: red brick, plain black robes in the window, and the door propped wide open as if to advertise that there was nothing to hide.', 44, 34, { w: 620 })], { mood: 'day', alt: 'Madam Malkin\'s robe shop, plain and respectable.' });
ep.end();

export default ep;
