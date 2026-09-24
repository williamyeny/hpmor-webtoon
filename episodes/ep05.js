// EPISODE 5 — Six Minutes  (source: HPMOR ch. 5, second half)
import { Episode, say, shout, whisper, think, inner, cold, cap, capC, dark, note, title, plain, M } from '../engine/core/dsl.js';
import { shot } from '../engine/core/scene.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as L from '../engine/bg/london.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harry, mcgonagall, draco, dracoFitting, lucius, malkin, asst1, asst2 } from '../engine/chars/cast.js';
import { seal, wand, cane } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep05', number: 5, title: 'Six Minutes' });
ep.setBg(C.paper);
ep.beat(260, [plain('CHAPTER FIVE', 400, 90, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('Six Minutes', 400, 170, { size: 54 })]);
const WAND = g({ transform: 'translate(0,9) rotate(-20) translate(0,-4)' }, wand(120, '#4a2e1b'));
const MX = L.shopAt('Madam Malkin', { seed: 7 });
const DA = () => L.diagonAlley({ seed: 7 });

// =============================================================== outside
ep.panel(900, { cam: { on: ['mcgonagall', 'harry'], fr: 'knees' }, bg: DA, actors: [{ def: mcgonagall, id: 'mcgonagall', x: MX - 160, y: 1080, turn: 0.4, pose: 'stand', expr: 'calm' }, { def: harry, id: 'harry', x: MX + 80, y: 1080, s: 1.1, turn: -0.4, pose: 'stand', expr: 'unimpressed' }] },
  [say('McGonagall', 'I\'m going to go off for a few minutes while you get fitted. Will you be all right with that, Mr Potter?', 540, 110, { w: 370 }),
   cap('Harry nodded. He hated clothes shopping with a fiery passion, and couldn\'t blame the older witch for feeling the same way.', 30, 740, { w: 370 })], { mood: 'day' });
ep.panel(900, { cam: { on: ['mcgonagall', 'harry'], fr: 'knees' }, bg: DA, actors: [{ def: mcgonagall, id: 'mcgonagall', x: MX - 160, y: 1080, turn: 0.4, pose: 'wand', expr: 'calm', armB: { sh: 118, el: 0, hand: 'hold', prop: g({ transform: 'translate(0,9) rotate(60) translate(0,-4)' }, wand(120, '#4a2e1b')) } }, { def: harry, id: 'harry', x: MX + 80, y: 1080, s: 1.1, turn: -0.4, pose: 'stand', expr: 'worried' }] },
  [say('McGonagall', 'You\'ll need to be clear to Madam Malkin\'s senses, so I am removing the disguise.', 615, 40, { w: 300, anchor: 'tc', shape: 'box' })], { mood: 'day' });
ep.panel(640, { cam: { on: ['mcgonagall'], fr: 'bust', dx: 0.8 }, bg: DA, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: MX - 160, y: 1080, turn: 0.4, pose: 'stand', expr: 'calm' }] },
  [say('McGonagall', 'I went to school with her. Even then, she was the most *composed* person I knew. She wouldn\'t turn a hair if You-Know-Who himself walked into her shop.', 540, 70, { w: 400, size: 30 })], { mood: 'day' });
ep.panel(580, { cam: { on: ['harry'], fr: 'close' }, bg: DA, blur: 3, actors: [{ def: harry, id: 'harry', x: MX + 80, y: 1080, s: 1.1, turn: -0.3, expr: 'suspicious' }] },
  [say('Harry', 'Where *are* you going? Just in case, you know, something *does* happen.', 400, 100, { w: 420 })], { mood: 'day' });
ep.panel(960, { cam: { x: 800, y: 560, w: 900 }, bg: () => L.kegPub(), actors: [{ def: mcgonagall, id: 'mcgonagall', x: 420, y: 1400, s: 1.9, turn: 0.5, pose: 'point', expr: 'stern', armB: { sh: 125, el: 4, hand: 'point' } }] },
  [say('McGonagall', 'I am going *there*, and buying a drink, which I desperately need.', 285, 105, { w: 360 }),
   say('McGonagall', '*You* are to get fitted for your robes, *nothing else.* I will come back *shortly*, and I *expect* to find Madam Malkin\'s shop still standing and not in any way on fire.', 548, 705, { w: 320, size: 30 })], { mood: 'day', alt: 'McGonagall points across the street at a pub with a wooden keg for a sign.' });

// =============================================================== inside
const MI = () => L.malkinInterior();
const H0 = { x: 780, y: 925 }, D0 = { x: 1080, y: 925 };
const HAR = (o = {}) => ({ def: harry, id: 'harry', ...H0, s: 1.1, turn: 0.45, pose: 'stand', expr: 'neutral', ...o });
const DRA = (o = {}) => ({ def: dracoFitting, id: 'draco', ...D0, s: 1.1, turn: -0.45, pose: 'stand', expr: 'smug', ...o });
const MAL = (o = {}) => ({ def: malkin, id: 'malkin', x: 560, y: 1010, turn: 0.4, pose: 'hold', expr: 'calm', ...o });
const AS1 = (o = {}) => ({ def: asst1, id: 'asst1', x: 1270, y: 1010, turn: -0.4, pose: 'wand', expr: 'focus', armB: { sh: 45, el: 10, hand: 'hold', prop: WAND }, ...o });
const AS2 = (o = {}) => ({ def: asst2, id: 'asst2', x: 400, y: 1020, turn: 0.4, pose: 'holdOne', expr: 'neutral', ...o });
const tapes = (e) => L.tapeMeasures(790, 790, 0.8, 3);
ep.panel(960, { cam: { x: 840, y: 630, w: 1100 }, bg: MI, actors: [AS2(), MAL({ pose: 'present' }), HAR({ expr: 'deadpan' }), DRA(), AS1()], fg: tapes },
  [cap('Madam Malkin didn\'t say a word about the scar on his forehead, and she shot a sharp look at an assistant who seemed about to.', 44, 34, { w: 460 }),
   cap('Next to Harry, a pale boy with a pointed face and *awesomecool* white-blond hair was going through the final stages of a similar process.', 330, 790, { w: 445 })], { mood: 'warm', alt: 'Inside Madam Malkin\'s: racks of black robes, tall mirrors, bolts of cloth. Harry stands on a footstool while enchanted tape measures writhe around him. On the next footstool, a pale blond boy in a chequered fitting robe.' });
ep.panel(640, { cam: { on: ['draco'], fr: 'bust' }, bg: MI, blur: 2, actors: [DRA({ expr: 'neutral', turn: -0.3 })] },
  [say('Draco', 'Hello. Hogwarts, too?', 300, 90, { w: 380 })], { mood: 'warm' });
ep.panel(720, { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: { base: 'scheme' } })], over: (e) => FX.frost(e.w, e.h, 0.15, 4) },
  [inner('Harry', 'Harry could predict exactly where this conversation was about to go.', 400, 90, { w: 460 }),
   inner('Harry', 'And he decided, in a split second of frustration, that enough was enough.', 400, 650, { w: 540 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [HAR({ expr: 'awe', pose: 'reach', turn: 0.5 })], behind: (e) => FX.sparkles([[100, 200, 20], [700, 160, 16], [120, 600, 12], [680, 560, 18]], { col: '#fff3b0' }) },
  [whisper('Harry', 'Good heavens. It couldn\'t be.', 400, 90, { w: 320 }),
   whisper('Harry', 'Your… *name*, sir?', 170, 620, { w: 240 })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['draco'], fr: 'close' }, bg: MI, blur: 3, actors: [DRA({ expr: 'confused' })] },
  [say('Draco', 'Draco Malfoy.', 190, 100, { w: 260 }), cap('said Draco Malfoy, looking slightly puzzled.', 440, 48, { w: 300 })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [HAR({ expr: { base: 'pleading', tearDrop: true }, pose: 'hold' })], behind: (e) => FX.sparkles([[100, 200, 20], [700, 160, 16], [120, 600, 12], [680, 560, 18]], { col: '#fff3b0' }) },
  [say('Harry', 'It *is* you! Draco Malfoy. I—I never thought I\'d be so honoured, sir.', 400, 90, { w: 440 }),
   cap('Harry wished he could make tears come out of his eyes. The others usually started crying at around this point.', 280, 640, { w: 460 })], { mood: 'warm' });
ep.panel(880, { cam: { head: 'draco', hw: 0.42, hx: 0.52, hy: 0.3 }, bg: MI, blur: 2, actors: [DRA({ expr: 'smug', pose: 'crossArms' })] },
  [say('Draco', 'Oh.', 190, 90, { w: 110 }),
   say('Draco', 'It\'s good to meet someone who knows his place.', 400, 792, { w: 460, fixed: true })], { mood: 'warm' });
ep.panel(460, { cam: { on: ['asst1'], fr: 'close' }, bg: MI, blur: 3, actors: [AS1({ expr: { base: 'wince', mouth: { type: 'grit' } } })] },
  [cap('One of the assistants made a muffled choking sound.', 44, 30, { w: 360 })], { mood: 'warm' });
ep.panel(840, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [HAR({ expr: 'delight', pose: 'hold', armF: { sh: 22, el: 70, hand: 'open' }, armB: { sh: 30, el: 60, hand: 'open' } })] },
  [say('Harry', 'I\'m delighted to meet you, Mr Malfoy. Just *unutterably* delighted.', 400, 90, { w: 420 }),
   say('Harry', 'And to be attending Hogwarts in your very year! It makes my heart swoon.', 400, 718, { w: 520, fixed: true }),
   note('…oops', 680, 560, { size: 40, color: '#fff3b0' })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['draco'], fr: 'bust', dx: -0.75, zoom: 0.9 }, bg: MI, blur: 2, actors: [DRA({ expr: { base: 'smug', eyes: { open: 0.4 } }, pose: 'present', turn: -0.2 })] },
  [say('Draco', 'And *I* am pleased to learn that I shall be treated with the respect due to the family of Malfoy.', 210, 170, { w: 320 }),
   cap('…with a smile such as the highest of kings might bestow upon the least of his subjects.', 44, 580, { w: 360 })], { mood: 'warm' });
ep.panel(900, { cam: { on: ['harry'], fr: 'waist', zoom: 0.75, dy: -0.6 }, bg: MI, blur: 2, actors: [HAR({ expr: 'pleading', pose: 'bowGrand', lean: -18 })] },
  [say('Harry', 'When my clothes are fitted, sir, might you deign to shake my hand? I should wish nothing more to put the capper upon this day, nay, this month, indeed, my whole lifetime.', 400, 170, { w: 520 })], { mood: 'warm' });
ep.panel(780, { cam: { head: 'draco', hw: 0.46, hx: 0.58, hy: 0.45 }, bg: MI, blur: 2, actors: [DRA({ expr: 'cross', pose: 'crossArms' })] },
  [say('Draco', 'And what have *you* done for the Malfoys that entitles you to such a favour?', 280, 100, { w: 380 })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['harry'], fr: 'close', dy: -0.25, zoom: 0.9 }, bg: MI, blur: 3, actors: [HAR({ expr: { base: 'delight', eyes: { style: 'happy' } } })] },
  [inner('Harry', '*Oh, I am SO trying this routine on the next person who wants to shake my hand.*', 400, 80, { w: 540 })], { mood: 'warm' });
ep.panel(780, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [HAR({ expr: 'sad', pose: 'bow' })] },
  [say('Harry', 'No, no, sir, I understand. I\'m sorry for asking.', 250, 100, { w: 320 }),
   say('Harry', 'I should be honoured to clean your boots, rather.', 420, 680, { w: 480, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['draco'], fr: 'bust', dx: -0.75, dy: 0.5, zoom: 0.85 }, bg: MI, blur: 2, actors: [DRA({ expr: 'smug', pose: 'handsHips', turn: -0.2 })] },
  [say('Draco', 'Indeed.', 300, 110, { w: 140, fixed: true }),
   say('Draco', 'Tell me, what House do you think you\'ll be sorted into? I\'m bound for Slytherin, of course, like my father Lucius before me.', 262, 580, { w: 340, fixed: true })], { mood: 'warm' });
ep.panel(720, { cam: { on: ['draco'], fr: 'close' }, bg: MI, blur: 3, actors: [DRA({ expr: { base: 'smug', eyes: { open: 0.4 } }, turn: -0.3 })] },
  [say('Draco', 'And for you, I\'d guess Hufflepuff. Or possibly House Elf.', 400, 630, { w: 520, fixed: true })], { mood: 'warm' });
ep.panel(1120, { cam: { x: 780, y: 535, w: 350 }, bg: MI, blur: 1, actors: [HAR({ expr: 'embarrassed', pose: 'shrug' })] },
  [say('Harry', 'Professor McGonagall says I\'m the most Ravenclaw person she\'s ever seen or heard tell of in legend. So much so that Rowena herself would tell me to get out more, whatever *that* means. And that I\'ll undoubtedly end up in Ravenclaw, if the hat isn\'t screaming too loudly for the rest of us to make out any words. End quote.', 410, 300, { w: 525, fixed: true })], { mood: 'warm' });
ep.panel(1040, { cam: { x: 1080, y: 700, w: 360 }, bg: MI, blur: 2, actors: [DRA({ expr: { base: 'warm', eyes: { lookY: 0.4 } }, pose: 'stand' })] },
  [say('Draco', 'Wow. Your flattery was great, or I thought so, anyway—you\'d do well in Slytherin too.', 400, 130, { w: 460, fixed: true }),
   say('Draco', 'Usually it\'s only my father who gets that sort of grovelling. I\'m *hoping* the other Slytherins will suck up to me now I\'m at Hogwarts…', 400, 860, { w: 520, fixed: true })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: 'embarrassed' })] },
  [say('Harry', 'Actually, sorry. I\'ve got no idea who you are, really.', 400, 90, { w: 500 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['draco'], fr: 'bust' }, bg: MI, blur: 2, actors: [DRA({ expr: 'yell', pose: 'armsUp' })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { col: '#e8b4a0', op: 0.5 }) },
  [shout('Draco', '*Oh come on!* Why\'d you go and do that, then?!', 400, 118, { w: 440, size: 34 })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['draco'], fr: 'close' }, bg: MI, blur: 3, actors: [DRA({ expr: 'suspicious' })] },
  [say('Draco', 'And how do you *not* know about the Malfoys? And what are those *clothes* you\'re wearing?', 300, 100, { w: 380 }),
   say('Draco', 'Are your parents *Muggles?*', 400, 735, { w: 480, fixed: true })], { mood: 'warm' });
ep.panel(840, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [HAR({ expr: 'pained', pose: 'slump' })] },
  [say('Harry', 'Two of my parents are dead.', 520, 90, { w: 280 }),
   say('Harry', 'My other two parents are Muggles, and they\'re the ones who raised me.', 400, 730, { w: 520, fixed: true })], { mood: 'warm' });
ep.multi(560, [
  { x: M, y: 18, w: 368, h: 524, mood: 'warm', art: { cam: { on: ['draco'], fr: 'close', dy: -0.6 }, bg: MI, blur: 3, actors: [DRA({ expr: 'confused' })] } },
  { x: 408, y: 18, w: 368, h: 524, mood: 'warm', art: { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: 'smile2' })] } },
], [say('Draco', '*What?* Who *are* you?', 208, 100, { w: 240, fixed: true }), say('Harry', 'Harry Potter, pleased to meet you.', 592, 432, { w: 260, fixed: true })]);
ep.panel(700, { cam: { on: ['draco'], fr: 'bust' }, bg: MI, blur: 2, actors: [DRA({ expr: 'shock', pose: 'panic' })] },
  [shout('Draco', '*Harry Potter?* *The* Harry…', 280, 110, { w: 360, size: 34 })], { mood: 'warm' });
ep.beat(320, [capC('There was a brief silence.', 400, 160, { w: 360 })]);
ep.panel(860, { cam: { on: ['draco'], fr: 'waist' }, bg: MI, actors: [DRA({ expr: 'delight', pose: 'hold', armF: { sh: 40, el: 92, hand: 'fist' }, armB: { sh: -10, el: 158, hand: 'fist', front: true } })], behind: (e) => FX.sparkles([[100, 200, 20], [700, 160, 16], [120, 600, 12], [680, 560, 18], [400, 80, 14]], { col: '#fff3b0' }) },
  [say('Draco', 'Harry Potter? *The* Harry Potter? Gosh, I\'ve *always* wanted to meet you!', 400, 110, { w: 460 })], { mood: 'warm', alt: 'Draco, with sudden bright enthusiasm, clasps his hands like a fan.' });
ep.panel(460, { cam: { on: ['asst1'], fr: 'close' }, bg: MI, blur: 3, actors: [AS1({ expr: 'wince' })] },
  [cap('Draco\'s attendant emitted a sound like she was strangling, but kept on with her work.', 44, 30, { w: 440 })], { mood: 'warm' });
// the rapid-fire exchange
const RF = (H, hExpr, dExpr, hTxt, dTxt, dY, dDy) => ep.multi(H, [
  { x: M, y: 18, w: 368, h: H - 36, mood: 'warm', art: { cam: { on: ['harry'], fr: 'close', dy: -0.75 }, bg: MI, blur: 3, actors: [HAR({ expr: hExpr })] } },
  { x: 408, y: 18, w: 368, h: H - 36, mood: 'warm', art: { cam: { on: ['draco'], fr: 'close', dy: dDy }, bg: MI, blur: 3, actors: [DRA({ expr: dExpr })] } },
], [say('Harry', hTxt, 208, 95, { w: 250, fixed: true }), say('Draco', dTxt, 592, dY, { w: 282, fixed: true })]);
RF(500, 'deadpan', 'bigGrin', 'Shut up.', 'Can I have your autograph? No, wait, a picture first!', 140, -0.62);
RF(500, 'cross', 'delight', 'Shut *up* shut *up* shut *up*.', 'I\'m just so *delighted* to meet you!', 125, -0.5);
RF(620, 'angry', 'happy', 'Burst into flames and die.', 'Everyone\'s hero! I\'ve always wanted to be just like you when I grow up, so I can—', 190, -1.15);

// =============================================================== Lucius
ep.panel(560, { cam: { on: ['draco'], fr: 'close' }, bg: MI, blur: 3, actors: [DRA({ expr: 'horror' })] }, [], { mood: 'warm', alt: 'Draco freezes in absolute horror mid-sentence.' });
ep.bleed(1250, { cam: { x: 1800, y: 642, w: 548 }, bg: MI, blur: 1, actors: [{ def: lucius, id: 'lucius', x: 1800, y: 1000, turn: -0.3, pose: 'stand', expr: 'menace', armB: { sh: 20, el: 25, hand: 'hold', prop: g({ transform: 'translate(0,10) rotate(45)' }, path('M0,12 L0,215', { stroke: '#2a1b14', 'stroke-width': 14, 'stroke-linecap': 'round' }), path('M0,12 L0,215', { stroke: '#6b4429', 'stroke-width': 9, 'stroke-linecap': 'round' }), circle(0, -19, 13, { fill: '#c9ced4', stroke: '#2a1b14', 'stroke-width': 3 })) } }],
  over: (e) => K.glow(e.w * 0.5, e.h * 0.2, 500, '#fff2c8', 0.35) },
  [cap('Tall. White-haired. Coldly elegant in black robes of the finest quality. One hand gripping a silver-handled cane which took on the character of a deadly weapon just by being in that hand.', 44, 40, { w: 480 }),
   cap('His eyes regarded the room with the dispassionate quality of an executioner.', 300, 1080, { w: 440 })], { mood: 'night', alt: 'Lucius Malfoy in the doorway, backlit: tall, platinum-haired, a silver-headed cane in his hand.' });
ep.panel(620, { cam: { on: ['lucius'], fr: 'close' }, bg: MI, blur: 3, actors: [{ def: lucius, id: 'lucius', x: 1800, y: 1000, turn: -0.3, expr: 'menace' }] },
  [cold('Lucius', 'Draco. *What* are you *saying?*', 280, 110, { w: 340 })], { mood: 'cold' });
ep.panel(600, { cam: { head: 'harry', hw: 0.85, hx: 0.5, hy: 0.5 }, bg: MI, blur: 3, actors: [HAR({ expr: { base: 'shock', eyes: { lookX: 1 } } })], over: (e) => FX.speedLines(e.w, e.h, { n: 20, col: '#fff', angle: 0 }) },
  [inner('Harry', 'In one split second of sympathetic panic, Harry formulated a rescue plan.', 400, 84, { w: 560 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [HAR({ expr: 'delight', pose: 'reach', turn: 0.6 })], behind: (e) => FX.sparkles([[100, 200, 20], [700, 160, 16], [120, 600, 12], [680, 560, 18]], { col: '#fff3b0' }) },
  [shout('Harry', 'Lucius Malfoy! *The* Lucius Malfoy?', 400, 110, { w: 440, size: 38 })], { mood: 'warm' });
ep.panel(500, { cam: { on: ['asst1'], fr: 'bust', dy: -0.3 }, bg: MI, blur: 3, actors: [AS1({ turn: 0.5, pose: 'facepalm', expr: 'wince', armB: undefined, armF: { sh: 30, el: 150, hand: 'palm', hr: 0 } })] },
  [cap('One of Malkin\'s assistants had to turn away and face the wall.', 44, 30, { w: 400 })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['lucius'], fr: 'eyes' }, bg: MI, blur: 3, actors: [{ def: lucius, id: 'lucius', x: 1800, y: 1000, turn: -0.3, expr: 'menace' }] },
  [cold('Lucius', 'Harry Potter.', 400, 62, { w: 260, fixed: true })], { mood: 'cold' });
ep.panel(960, { cam: { on: ['harry'], fr: 'waist', dy: 0.35 }, bg: MI, actors: [HAR({ expr: 'bigGrin', pose: 'bowGrand', lean: -20 })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { col: '#f0c878', op: 0.4 }) },
  [say('Harry', 'I am so, *so* honoured to meet you!', 400, 90, { w: 360 }),
   say('Harry', 'Your son has been telling me *all* about you! But of course I knew about you before then. Everyone knows about you, the great Lucius Malfoy!', 400, 792, { w: 560, fixed: true, tail: [392, 590] })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['harry'], fr: 'close', dy: -0.12 }, bg: MI, blur: 3, actors: [HAR({ expr: 'delight' })], behind: (e) => FX.sparkles([[100, 200, 20], [700, 160, 16], [120, 500, 12], [680, 460, 18]], { col: '#fff3b0' }) },
  [say('Harry', 'The most honoured laureate of all the House of Slytherin! I\'ve been thinking about trying to get into Slytherin myself, just because I heard you were in it as a child—', 400, 178, { w: 560, size: 28, fixed: true })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['lucius'], fr: 'close' }, bg: MI, blur: 3, actors: [{ def: lucius, id: 'lucius', x: 1800, y: 1000, turn: -0.3, expr: { base: 'shock', eyes: { style: 'normal', open: 1 } } }] },
  [cap('The dark eyes widened, shocked surprise replacing deadly threat.', 44, 30, { w: 420 })], { mood: 'warm' });

// =============================================================== McGonagall bursts in
ep.bleed(1000, { cam: { on: ['mcgonagall'], fr: 'knees' }, bg: MI, blur: 1, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1780, y: 1010, turn: -0.2, pose: 'panic', expr: 'yell', armB: { sh: 125, el: 45, hand: 'hold', prop: g({ transform: 'translate(0,27) scale(1,-1)' }, path('M-12,-20 L12,-20 L8,20 L-8,20Z', { fill: '#e9f0f2', stroke: '#2a1b14', 'stroke-width': 2, opacity: 0.8 }), path('M-10,-10 L10,-10 L8,18 L-8,18Z', { fill: '#8a1a2a' })) } }],
  behind: (e) => FX.speedLines(e.w, e.h, { n: 50, angle: 90 }) },
  [shout('McGonagall', 'WHAT ARE YOU *SAYING*, MR POTTER?!', 400, 150, { w: 420, size: 40 })], { mood: 'warm', alt: 'McGonagall bursts in through the door, still holding a glass of red wine, in pure horror.' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: { base: 'shock', mouth: { type: 'o', open: 0.4 } } })] },
  [cap('Harry\'s mouth opened automatically, and then blocked on nothing-to-say.', 44, 30, { w: 400 })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['draco'], fr: 'bust', dy: -0.3, dx: 0.59 }, bg: MI, actors: [DRA({ expr: 'delight', pose: 'reach', turn: 0.4 })], behind: (e) => FX.sparkles([[100, 200, 20], [700, 160, 16], [120, 600, 12]], { col: '#fff3b0' }) },
  [shout('Draco', 'Professor McGonagall! Is it really you?', 390, 130, { w: 500 }), say('Draco', 'I\'ve heard *so much* about you from my father!', 606, 445, { w: 250, fixed: true })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['draco'], fr: 'close', dy: 0.4 }, bg: MI, blur: 3, actors: [DRA({ expr: 'happy', turn: 0.3 })] },
  [say('Draco', 'I\'ve been thinking of trying to get Sorted into *Gryffindor* so I can—', 400, 610, { w: 540, fixed: true })], { mood: 'warm' });
ep.bleed(900, { cam: { on: ['lucius', 'mcgonagall'], fr: 'bust' }, bg: MI, blur: 2, actors: [{ def: lucius, id: 'lucius', x: 1650, y: 1000, turn: -0.2, pose: 'armsUp', expr: 'yell' }, { def: mcgonagall, id: 'mcgonagall', x: 1860, y: 1010, turn: -0.2, pose: 'armsUp', expr: 'yell' }],
  behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { bg: '#f6e0b0', col: '#c9922e', op: 0.6 }) },
  [shout('both', '*WHAT?*', 400, 90, { w: 220, size: 60, tails: ['lucius', 'mcgonagall'] })], { mood: 'warm', alt: 'Lucius Malfoy and Professor McGonagall bellow "WHAT?" in perfect unison, side by side.' });
ep.multi(600, [
  { x: M, y: 18, w: 368, h: 564, mood: 'warm', art: { cam: { x: 1755, y: 565, w: 390 }, bg: MI, blur: 3, actors: [{ def: lucius, id: 'lucius', x: 1650, y: 1000, turn: 0.6, expr: 'shock' }, { def: mcgonagall, id: 'mcgonagall', x: 1860, y: 1010, turn: -0.6, expr: 'shock' }] } },
  { x: 408, y: 18, w: 368, h: 564, mood: 'warm', art: { cam: { x: 1775, y: 610, w: 670 }, bg: MI, blur: 3, actors: [{ def: lucius, id: 'lucius', x: 1560, y: 1000, turn: -0.5, lean: -12, expr: 'horror' }, { def: mcgonagall, id: 'mcgonagall', x: 1960, y: 1010, turn: 0.5, lean: 12, expr: 'horror' }] } },
], [cap('Their heads swivelled to look at each other in perfect unison.', 40, 34, { w: 290, fixed: true }), cap('Then they recoiled from one another as if performing a synchronised dance.', 420, 34, { w: 303, fixed: true })]);
ep.panel(860, { cam: { x: 1620, y: 650, w: 820 }, bg: MI, actors: [{ def: draco, id: 'draco', x: 1480, y: 1000, s: 1.1, turn: 0.6, pose: 'run', expr: 'shock', lean: -18 }, { def: lucius, id: 'lucius', x: 1720, y: 1000, turn: 0.6, pose: 'walk', expr: 'angry', armF: { sh: -65, el: 10, hand: 'fist' } }],
  behind: (e) => FX.speedLines(e.w, e.h, { n: 40 }) },
  [cap('There was a sudden flurry of action as Lucius seized Draco and dragged him out of the shop.', 44, 30, { w: 440 })], { mood: 'warm' });
ep.beat(320, [capC('And then there was silence.', 400, 160, { w: 380 })]);
ep.panel(620, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#6e4a2c' }) + K.floorboards(0, h * 0.55, w, h * 0.5, '#6e4a2c', 3);
  out += g({ transform: `translate(${w * 0.55},${h * 0.35}) rotate(35)` }, path('M-60,-120 L60,-120 L50,120 L-50,120Z', { fill: '#e9f0f2', stroke: C.ink, 'stroke-width': 4, opacity: 0.85 }), path('M-54,20 L54,20 L50,118 L-50,118Z', { fill: '#8a1a2a' }));
  out += g({ transform: `translate(${w * 0.52},${h * 0.35})` }, path('M-120,-80 q60,-40 110,20 L-40,60Z', { fill: '#1f4a35', stroke: C.ink, 'stroke-width': 4 }), ellipse(-10, 30, 40, 26, { fill: '#efd2bb', stroke: C.ink, 'stroke-width': 4 }));
  out += path(`M${w * 0.62},${h * 0.52} q-4,30 0,60`, { stroke: '#8a1a2a', 'stroke-width': 8, 'stroke-linecap': 'round' }) + ellipse(w * 0.6, h * 0.86, 110, 22, { fill: '#8a1a2a', opacity: 0.85 });
  return out;
}, [note('drip', 640, 300, { size: 48, color: '#f6e7cf' }), note('drip', 540, 420, { size: 40, color: '#f6e7cf' })], { mood: 'warm', alt: 'Close on McGonagall\'s hand: the forgotten wine glass tilts, dripping red wine into a small puddle on the floor.' });
ep.panel(700, { cam: { on: ['mcgonagall', 'malkin'], fr: 'bust' }, bg: MI, actors: [MAL({ x: 1300, turn: 0.4, expr: 'calm', pose: 'stand' }), { def: mcgonagall, id: 'mcgonagall', x: 1560, y: 1010, turn: -0.4, pose: 'stand', expr: 'calm' }] },
  [say('McGonagall', 'Madam Malkin. What has been happening here?', 560, 90, { w: 300 })], { mood: 'warm' });
ep.multi(360, [0, 1, 2, 3].map((i) => ({ x: M + i * 190, y: 18, w: 176, h: 324, mood: 'warm', art: { cam: { on: ['malkin'], fr: 'close' }, bg: MI, blur: 3, actors: [MAL({ x: 1300, turn: 0.2, expr: i < 3 ? 'calm' : { base: 'calm', mouth: { type: 'wobble' } } })] } })),
  [note('one', 112, 300, { size: 40, color: '#fff3dc' }), note('two', 302, 300, { size: 40, color: '#fff3dc' }), note('three', 492, 300, { size: 40, color: '#fff3dc' }), note('four', 682, 300, { size: 40, color: '#fff3dc' })]);
ep.bleed(900, { cam: { x: 810, y: 700, w: 940 }, bg: MI,
  actors: [MAL({ x: 600, turn: 0.2, pose: 'slump', expr: 'laugh', lean: -20 }), AS2({ x: 410, pose: 'crouch', expr: 'laugh' }), AS1({ x: 1195, pose: 'kneel', expr: 'laugh', turn: -0.2, armB: { sh: 12, el: 20, hand: 'hold', prop: WAND } }), { def: harry, id: 'harry', x: 900, y: 925, s: 1.1, turn: 0.4, pose: 'stand', expr: 'confused' }],
  behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.5, { bg: '#f6e3b0', col: '#e0b060', op: 0.5 }), fg: (e) => L.tapeMeasures(900, 790, 0.55, 9),
  over: (e) => FX.sfxText(e.w * 0.3, e.h * 0.2, 'BWAHAHA', { size: 70, rot: -8 }) + FX.sfxText(e.w * 0.75, e.h * 0.3, 'HAHAHA', { size: 54, rot: 6 }) },
  [cap('Madam Malkin looked back silently for four seconds, and then cracked up. That set off both of her assistants, one of whom fell to her hands and knees, giggling hysterically.', 30, 880, { w: 530, anchor: 'bl' })], { mood: 'warm', alt: 'Madam Malkin and both assistants collapse in hysterical laughter. Harry stands on his footstool, tape measures still draped over him.' });
ep.panel(780, { cam: { on: ['mcgonagall'], fr: 'bust', dy: 0.3 }, bg: MI, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1560, y: 1010, turn: -0.3, pose: 'handsHips', expr: 'stern' }], over: (e) => FX.frost(e.w, e.h, 0.3, 11) },
  [say('McGonagall', 'I leave you alone for six minutes.', 190, 180, { w: 300 }),
   say('McGonagall', 'Six minutes, Mr Potter, *by the very clock.*', 400, 680, { w: 520, fixed: true })], { mood: 'warm' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: 'embarrassed' })] },
  [say('Harry', 'I was only joking around!', 400, 90, { w: 320 })], { mood: 'warm' });
ep.bleed(1440, { cam: { on: ['mcgonagall'], fr: 'bust', dy: 0.15 }, bg: MI, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1560, y: 1010, turn: -0.2, pose: 'armsUp', expr: 'rant' }],
  behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.45, { bg: '#f6e0b0', col: '#c9922e', op: 0.6, n: 110 }) },
  [shout('McGonagall', '*Draco Malfoy said in front of his father that he wanted to be sorted into Gryffindor!*', 400, 180, { w: 460, fixed: true }),
   shout('McGonagall', 'Joking around *isn\'t enough* to *do* that! What part of "get fitted for robes" sounded to you like *please cast a Confundus Charm on the entire universe?!*', 400, 1150, { w: 520, fixed: true })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: 'think' })] },
  [say('Harry', 'He was in a situational context where those actions made internal sense—', 400, 100, { w: 440 })], { mood: 'warm' });
ep.panel(1060, { cam: { on: ['mcgonagall'], fr: 'bust', dy: 0.2 }, bg: MI, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1560, y: 1010, turn: -0.3, pose: 'facepalm', expr: 'exasperated', armF: { sh: 60, el: 130, hand: 'palm', hr: 0 } }] },
  [say('McGonagall', 'No. Don\'t explain. I don\'t want to know what happened in here, *ever.*', 400, 110, { w: 500, fixed: true }),
   say('McGonagall', 'Whatever dark power inhabits you, it is *contagious*, and I don\'t want to end up like poor Draco Malfoy, poor Madam Malkin, and her two poor assistants.', 400, 880, { w: 540, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { x: 815, y: 690, w: 960 }, bg: MI, actors: [MAL({ x: 560, turn: 0.2, pose: 'slump', expr: 'laugh', lean: -24 }), AS2({ x: 430, pose: 'sitFloor', expr: 'laugh' }), AS1({ x: 1230, pose: 'kneel', expr: 'laugh', turn: -0.2, armB: { sh: 12, el: 20, hand: 'hold', prop: WAND } }), { def: harry, id: 'harry', ...H0, s: 1.1, turn: 0.5, pose: 'stand', expr: { base: 'calm', eyes: { lookX: -0.8 } } }], fg: (e) => L.tapeMeasures(780, 790, 0.55, 9) },
  [cap('Harry looked at Madam Malkin, still wheezing against the wall; at her two assistants, now *both* on their knees; and finally down at his own tape-measure-draped body.', 44, 34, { w: 540 })], { mood: 'warm' });
ep.panel(860, { cam: { on: ['harry'], fr: 'bust', dy: 0.3 }, bg: MI, blur: 2, actors: [{ def: harry, id: 'harry', ...H0, s: 1.1, turn: 0.6, pose: 'gesture', expr: 'warm' }], fg: (e) => L.tapeMeasures(790, 800, 0.6, 9) },
  [say('Harry', 'I\'m not quite done being fitted,', 230, 100, { w: 300 }),
   cap('Harry said kindly.', 500, 40, { w: 240, fixed: true }),
   say('Harry', 'Why don\'t you go back and have another drink?', 400, 748, { w: 520, fixed: true })], { mood: 'warm' });
ep.end();

export default ep;
