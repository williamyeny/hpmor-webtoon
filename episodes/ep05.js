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
const WAND = g({ transform: 'translate(0,26) rotate(180)' }, wand(120, '#4a2e1b'));
const MX = L.shopAt('Madam Malkin', { seed: 7 });
const DA = () => L.diagonAlley({ seed: 7 });

// =============================================================== outside
ep.panel(760, { cam: { on: ['mcgonagall', 'harry'], fr: 'waist' }, bg: DA, actors: [{ def: mcgonagall, id: 'mcgonagall', x: MX - 160, y: 1080, turn: 0.4, pose: 'stand', expr: 'calm' }, { def: harry, id: 'harry', x: MX + 80, y: 1080, s: 1.1, turn: -0.4, pose: 'stand', expr: 'unimpressed' }] },
  [say('McGonagall', 'I\'m going to go off for a few minutes while you get fitted. Will you be all right with that, Mr Potter?', 250, 100, { w: 370 }),
   cap('Harry nodded. He hated clothes shopping with a fiery passion, and couldn\'t blame the older witch for feeling the same way.', 330, 620, { w: 420 })], { mood: 'day' });
ep.panel(700, { cam: { on: ['mcgonagall', 'harry'], fr: 'waist' }, bg: DA, actors: [{ def: mcgonagall, id: 'mcgonagall', x: MX - 160, y: 1080, turn: 0.4, pose: 'wand', expr: 'calm', armB: { sh: 120, el: 30, hand: 'hold', prop: WAND } }, { def: harry, id: 'harry', x: MX + 80, y: 1080, s: 1.1, turn: -0.4, pose: 'stand', expr: 'worried' }] },
  [say('McGonagall', 'You\'ll need to be clear to Madam Malkin\'s senses, so I am removing the disguise.', 250, 100, { w: 360 }),
   say('McGonagall', 'I went to school with her. Even then, she was the most *composed* person I knew. She wouldn\'t turn a hair if You-Know-Who himself walked into her shop.', 330, 560, { w: 440, size: 28 })], { mood: 'day' });
ep.panel(580, { cam: { on: ['harry'], fr: 'close' }, bg: DA, blur: 3, actors: [{ def: harry, id: 'harry', x: MX + 80, y: 1080, s: 1.1, turn: -0.3, expr: 'suspicious' }] },
  [say('Harry', 'Where *are* you going? Just in case, you know, something *does* happen.', 400, 100, { w: 420 })], { mood: 'day' });
ep.panel(820, { cam: { x: 760, y: 560, w: 1300 }, bg: () => L.kegPub(), actors: [{ def: mcgonagall, id: 'mcgonagall', x: 520, y: 1080, turn: 0.5, pose: 'point', expr: 'stern' }] },
  [say('McGonagall', 'I am going *there*, and buying a drink, which I desperately need.', 400, 90, { w: 360 }),
   say('McGonagall', '*You* are to get fitted for your robes, *nothing else.* I will come back *shortly*, and I *expect* to find Madam Malkin\'s shop still standing and not in any way on fire.', 250, 600, { w: 440, size: 28 })], { mood: 'day', alt: 'McGonagall points across the street at a pub with a wooden keg for a sign.' });

// =============================================================== inside
const MI = () => L.malkinInterior();
const H0 = { x: 780, y: 925 }, D0 = { x: 1080, y: 925 };
const HAR = (o = {}) => ({ def: harry, id: 'harry', ...H0, s: 1.1, turn: 0.45, pose: 'stand', expr: 'neutral', ...o });
const DRA = (o = {}) => ({ def: dracoFitting, id: 'draco', ...D0, s: 1.1, turn: -0.45, pose: 'stand', expr: 'smug', ...o });
const MAL = (o = {}) => ({ def: malkin, id: 'malkin', x: 560, y: 1010, turn: 0.4, pose: 'hold', expr: 'calm', ...o });
const AS1 = (o = {}) => ({ def: asst1, id: 'asst1', x: 1270, y: 1010, turn: -0.4, pose: 'wand', expr: 'focus', armB: { sh: 80, el: 10, hand: 'hold', prop: WAND }, ...o });
const AS2 = (o = {}) => ({ def: asst2, id: 'asst2', x: 400, y: 1020, turn: 0.4, pose: 'holdOne', expr: 'neutral', ...o });
const tapes = (e) => L.tapeMeasures(780, 560, 1, 3);
ep.panel(820, { cam: { x: 900, y: 600, w: 1500 }, bg: MI, actors: [AS2(), MAL({ pose: 'present' }), HAR({ expr: 'deadpan' }), DRA(), AS1()], fg: tapes },
  [cap('Madam Malkin didn\'t say a word about the scar on his forehead—and she shot a sharp look at an assistant who seemed about to.', 44, 34, { w: 460 }),
   cap('Next to Harry, a pale boy with a pointed face and *awesomecool* white-blond hair was going through the final stages of a similar process.', 330, 640, { w: 420 })], { mood: 'warm', alt: 'Inside Madam Malkin\'s: racks of black robes, tall mirrors, bolts of cloth. Harry stands on a footstool while enchanted tape measures writhe around him. On the next footstool, a pale blond boy in a chequered fitting robe.' });
ep.panel(640, { cam: { on: ['draco'], fr: 'bust' }, bg: MI, blur: 2, actors: [DRA({ expr: 'neutral', turn: -0.3 })] },
  [say('Draco', 'Hello. Hogwarts, too?', 260, 100, { w: 240 })], { mood: 'warm' });
ep.panel(640, { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: { base: 'scheme' } })], over: (e) => FX.frost(e.w, e.h, 0.15, 4) },
  [inner('Harry', 'Harry could predict exactly where this conversation was about to go.', 400, 90, { w: 540 }),
   inner('Harry', 'And he decided, in a split second of frustration, that enough was enough.', 400, 560, { w: 540 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [HAR({ expr: 'awe', pose: 'reach', turn: 0.5 })], under: (e) => FX.sparkles([[100, 200, 20], [700, 160, 16], [120, 600, 12], [680, 560, 18]], { col: '#fff3b0' }) },
  [whisper('Harry', 'Good heavens. It couldn\'t be.', 400, 90, { w: 320 }),
   whisper('Harry', 'Your… *name*, sir?', 560, 600, { w: 240 })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['draco'], fr: 'close' }, bg: MI, blur: 3, actors: [DRA({ expr: 'confused' })] },
  [say('Draco', 'Draco Malfoy.', 260, 100, { w: 200 }), cap('said Draco Malfoy, looking slightly puzzled.', 380, 460, { w: 330 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [HAR({ expr: { base: 'pleading', tearDrop: true }, pose: 'hold' })], under: (e) => FX.sparkles([[100, 200, 20], [700, 160, 16], [120, 600, 12], [680, 560, 18]], { col: '#fff3b0' }) },
  [say('Harry', 'It *is* you! Draco Malfoy. I—I never thought I\'d be so honoured, sir.', 400, 90, { w: 440 }),
   cap('Harry wished he could make tears come out of his eyes. The others usually started crying at around this point.', 300, 600, { w: 420 })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['draco'], fr: 'bust' }, bg: MI, blur: 2, actors: [DRA({ expr: 'smug', pose: 'crossArms' })] },
  [say('Draco', 'Oh.', 260, 90, { w: 110 }),
   say('Draco', 'It\'s good to meet someone who knows his place.', 270, 560, { w: 300 })], { mood: 'warm' });
ep.panel(460, { cam: { on: ['asst1'], fr: 'close' }, bg: MI, blur: 3, actors: [AS1({ expr: { base: 'wince', mouth: { type: 'grit' } } })] },
  [cap('One of the assistants made a muffled choking sound.', 44, 30, { w: 360 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [HAR({ expr: 'delight', pose: 'hug' })] },
  [say('Harry', 'I\'m delighted to meet you, Mr Malfoy. Just *unutterably* delighted.', 400, 90, { w: 420 }),
   say('Harry', 'And to be attending Hogwarts in your very year! It makes my heart swoon.', 300, 580, { w: 360 }),
   note('…oops', 650, 700, { size: 38 })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['draco'], fr: 'bust' }, bg: MI, blur: 2, actors: [DRA({ expr: { base: 'smug', eyes: { open: 0.4 } }, pose: 'present' })] },
  [say('Draco', 'And *I* am pleased to learn that I shall be treated with the respect due to the family of Malfoy.', 290, 110, { w: 400 }),
   cap('…with a smile such as the highest of kings might bestow upon the least of his subjects.', 330, 590, { w: 400 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [HAR({ expr: 'pleading', pose: 'bowGrand', lean: -18 })] },
  [say('Harry', 'When my clothes are fitted, sir, might you deign to shake my hand? I should wish nothing more to put the capper upon this day, nay, this month, indeed, my whole lifetime.', 400, 110, { w: 520 })], { mood: 'warm' });
ep.panel(640, { cam: { on: ['draco'], fr: 'bust' }, bg: MI, blur: 2, actors: [DRA({ expr: 'cross', pose: 'crossArms' })] },
  [say('Draco', 'And what have *you* done for the Malfoys that entitles you to such a favour?', 280, 100, { w: 380 })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: { base: 'delight', eyes: { style: 'happy' } } })] },
  [inner('Harry', '*Oh, I am SO trying this routine on the next person who wants to shake my hand.*', 400, 450, { w: 540 })], { mood: 'warm' });
ep.panel(640, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [HAR({ expr: 'sad', pose: 'bow' })] },
  [say('Harry', 'No, no, sir, I understand. I\'m sorry for asking.', 280, 90, { w: 320 }),
   say('Harry', 'I should be honoured to clean your boots, rather.', 520, 540, { w: 300 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['draco'], fr: 'bust' }, bg: MI, blur: 2, actors: [DRA({ expr: 'smug', pose: 'handsHips' })] },
  [say('Draco', 'Indeed.', 260, 90, { w: 140 }),
   say('Draco', 'Tell me, what House do you think you\'ll be sorted into? I\'m bound for Slytherin, of course, like my father Lucius before me.', 290, 280, { w: 400, size: 28 }),
   say('Draco', 'And for you, I\'d guess Hufflepuff. Or possibly House Elf.', 290, 620, { w: 330 })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['harry'], fr: 'waist' }, bg: MI, actors: [HAR({ expr: 'embarrassed', pose: 'shrug' })] },
  [say('Harry', 'Professor McGonagall says I\'m the most Ravenclaw person she\'s ever seen or heard tell of in legend—so much so that Rowena herself would tell me to get out more, whatever *that* means—and that I\'ll undoubtedly end up in Ravenclaw if the hat isn\'t screaming too loudly for the rest of us to make out any words. End quote.', 400, 150, { w: 600, size: 27 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['draco'], fr: 'bust' }, bg: MI, blur: 2, actors: [DRA({ expr: { base: 'warm', eyes: { lookY: 0.4 } }, pose: 'stand' })] },
  [say('Draco', 'Wow. Your flattery was great, or I thought so, anyway. You\'d do well in Slytherin too.', 290, 100, { w: 380 }),
   say('Draco', 'Usually it\'s only my father who gets that sort of grovelling. I\'m *hoping* the other Slytherins will suck up to me now I\'m at Hogwarts…', 290, 560, { w: 400, size: 28 })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: 'embarrassed' })] },
  [say('Harry', 'Actually, sorry—I\'ve got no idea who you are, really.', 400, 100, { w: 400 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['draco'], fr: 'bust' }, bg: MI, blur: 2, actors: [DRA({ expr: 'yell', pose: 'armsUp' })], under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { col: '#e8b4a0', op: 0.5 }) },
  [shout('Draco', '*Oh come on!* Why\'d you go and do that, then?!', 400, 100, { w: 440, size: 34 })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['draco'], fr: 'close' }, bg: MI, blur: 3, actors: [DRA({ expr: 'suspicious' })] },
  [say('Draco', 'And how do you *not* know about the Malfoys? And what are those *clothes* you\'re wearing?', 280, 100, { w: 380 }),
   say('Draco', 'Are your parents *Muggles?*', 280, 580, { w: 280 })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [HAR({ expr: 'pained', pose: 'slump' })] },
  [say('Harry', 'Two of my parents are dead.', 520, 90, { w: 280 }),
   say('Harry', 'My other two parents are Muggles, and they\'re the ones who raised me.', 520, 580, { w: 340 })], { mood: 'warm' });
ep.multi(420, [
  { x: M, y: 18, w: 368, h: 384, mood: 'warm', art: { cam: { on: ['draco'], fr: 'close' }, bg: MI, blur: 3, actors: [DRA({ expr: 'confused' })] } },
  { x: 408, y: 18, w: 368, h: 384, mood: 'warm', art: { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: 'smile2' })] } },
], [say('Draco', '*What?* Who *are* you?', 200, 70, { w: 250 }), say('Harry', 'Harry Potter, pleased to meet you.', 600, 70, { w: 280 })]);
ep.panel(700, { cam: { on: ['draco'], fr: 'bust' }, bg: MI, blur: 2, actors: [DRA({ expr: 'shock', pose: 'panic' })] },
  [shout('Draco', '*Harry Potter?* *The* Harry—', 280, 110, { w: 360, size: 34 })], { mood: 'warm' });
ep.beat(320, [capC('There was a brief silence.', 400, 160, { w: 360 })]);
ep.panel(860, { cam: { on: ['draco'], fr: 'waist' }, bg: MI, actors: [DRA({ expr: 'delight', pose: 'hug' })], under: (e) => FX.sparkles([[100, 200, 20], [700, 160, 16], [120, 600, 12], [680, 560, 18], [400, 80, 14]], { col: '#fff3b0' }) },
  [say('Draco', 'Harry Potter? *The* Harry Potter? Gosh, I\'ve *always* wanted to meet you!', 400, 110, { w: 460 })], { mood: 'warm', alt: 'Draco, with sudden bright enthusiasm, clasps his hands like a fan.' });
ep.panel(460, { cam: { on: ['asst1'], fr: 'close' }, bg: MI, blur: 3, actors: [AS1({ expr: 'wince' })] },
  [cap('Draco\'s attendant emitted a sound like she was strangling, but kept on with her work.', 44, 30, { w: 440 })], { mood: 'warm' });
// the rapid-fire exchange
ep.multi(900, [
  { x: M, y: 18, w: 368, h: 280, mood: 'warm', art: { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: 'deadpan' })] } },
  { x: 408, y: 18, w: 368, h: 280, mood: 'warm', art: { cam: { on: ['draco'], fr: 'close' }, bg: MI, blur: 3, actors: [DRA({ expr: 'bigGrin' })] } },
  { x: M, y: 312, w: 368, h: 280, mood: 'warm', art: { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: 'cross' })] } },
  { x: 408, y: 312, w: 368, h: 280, mood: 'warm', art: { cam: { on: ['draco'], fr: 'close' }, bg: MI, blur: 3, actors: [DRA({ expr: 'delight' })] } },
  { x: M, y: 606, w: 368, h: 276, mood: 'warm', art: { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: 'angry' })] } },
  { x: 408, y: 606, w: 368, h: 276, mood: 'warm', art: { cam: { on: ['draco'], fr: 'close' }, bg: MI, blur: 3, actors: [DRA({ expr: 'happy' })] } },
], [say('Harry', 'Shut up.', 120, 50, { w: 140, size: 26 }), say('Draco', 'Can I have your autograph? No, wait, a picture first!', 620, 60, { w: 260, size: 24 }),
    say('Harry', 'Shut *up* shut *up* shut *up*.', 190, 350, { w: 250, size: 25 }), say('Draco', 'I\'m just so *delighted* to meet you!', 620, 350, { w: 260, size: 25 }),
    say('Harry', 'Burst into flames and die.', 190, 650, { w: 250, size: 25 }), say('Draco', 'Everyone\'s hero! I\'ve always wanted to be just like you when I grow up, so I can—', 610, 660, { w: 280, size: 23 })]);

// =============================================================== Lucius
ep.panel(560, { cam: { on: ['draco'], fr: 'close' }, bg: MI, blur: 3, actors: [DRA({ expr: 'horror' })] }, [], { mood: 'warm', alt: 'Draco freezes in absolute horror mid-sentence.' });
ep.bleed(1250, { cam: { on: ['lucius'], fr: 'full', dy: 0.2 }, bg: MI, blur: 1, actors: [{ def: lucius, id: 'lucius', x: 1800, y: 1000, turn: -0.3, pose: 'stand', expr: 'menace', armB: { sh: 20, el: 25, hand: 'hold', prop: g({ transform: 'translate(0,6)' }, cane(330), circle(0, -4, 14, { fill: '#c9ced4', stroke: '#2a1b14', 'stroke-width': 3 })) } }],
  over: (e) => K.glow(e.w * 0.5, e.h * 0.2, 500, '#fff2c8', 0.35) },
  [cap('Tall. White-haired. Coldly elegant in black robes of the finest quality. One hand gripping a silver-handled cane which took on the character of a deadly weapon just by being in that hand.', 44, 40, { w: 480 }),
   cap('His eyes regarded the room with the dispassionate quality of an executioner.', 300, 1080, { w: 440 })], { mood: 'night', alt: 'Lucius Malfoy in the doorway, backlit: tall, platinum-haired, a silver-headed cane in his hand.' });
ep.panel(620, { cam: { on: ['lucius'], fr: 'close' }, bg: MI, blur: 3, actors: [{ def: lucius, id: 'lucius', x: 1800, y: 1000, turn: -0.3, expr: 'menace' }] },
  [cold('Lucius', 'Draco. *What* are you *saying?*', 280, 110, { w: 340 })], { mood: 'cold' });
ep.panel(560, { cam: { on: ['harry'], fr: 'eyes' }, bg: MI, blur: 3, actors: [HAR({ expr: { base: 'shock', eyes: { lookX: 1 } } })], over: (e) => FX.speedLines(e.w, e.h, { n: 20, col: '#fff', angle: 0 }) },
  [inner('Harry', 'In one split second of sympathetic panic, Harry formulated a rescue plan.', 400, 420, { w: 560 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [HAR({ expr: 'delight', pose: 'reach', turn: 0.6 })], under: (e) => FX.sparkles([[100, 200, 20], [700, 160, 16], [120, 600, 12], [680, 560, 18]], { col: '#fff3b0' }) },
  [shout('Harry', 'Lucius Malfoy! *The* Lucius Malfoy?', 400, 110, { w: 440, size: 38 })], { mood: 'warm' });
ep.panel(460, { cam: { on: ['asst1'], fr: 'bust' }, bg: MI, blur: 3, actors: [AS1({ turn: 0.8, pose: 'facepalm', expr: 'wince' })] },
  [cap('One of Malkin\'s assistants had to turn away and face the wall.', 44, 30, { w: 400 })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['lucius'], fr: 'eyes' }, bg: MI, blur: 3, actors: [{ def: lucius, id: 'lucius', x: 1800, y: 1000, turn: -0.3, expr: 'menace' }] },
  [cold('Lucius', 'Harry Potter.', 400, 440, { w: 220 })], { mood: 'cold' });
ep.panel(760, { cam: { on: ['harry'], fr: 'waist' }, bg: MI, actors: [HAR({ expr: 'bigGrin', pose: 'bowGrand', lean: -20 })], under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { col: '#f0c878', op: 0.4 }) },
  [say('Harry', 'I am so, *so* honoured to meet you!', 400, 90, { w: 360 }),
   say('Harry', 'Your son has been telling me *all* about you! But of course I knew about you before then—everyone knows about you, the great Lucius Malfoy!', 400, 600, { w: 520, size: 28 })], { mood: 'warm' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: 'delight' })], under: (e) => FX.sparkles([[100, 200, 20], [700, 160, 16], [120, 500, 12], [680, 460, 18]], { col: '#fff3b0' }) },
  [say('Harry', 'The most honoured laureate of all the House of Slytherin! I\'ve been thinking about trying to get into Slytherin myself, just because I heard you were in it as a child—', 400, 110, { w: 580, size: 27 })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['lucius'], fr: 'close' }, bg: MI, blur: 3, actors: [{ def: lucius, id: 'lucius', x: 1800, y: 1000, turn: -0.3, expr: { base: 'shock', eyes: { style: 'normal', open: 1 } } }] },
  [cap('The dark eyes widened, shocked surprise replacing deadly threat.', 44, 30, { w: 420 })], { mood: 'warm' });

// =============================================================== McGonagall bursts in
ep.bleed(1000, { cam: { on: ['mcgonagall'], fr: 'full' }, bg: MI, blur: 1, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1780, y: 1010, turn: -0.2, pose: 'panic', expr: 'yell', armB: { sh: 125, el: 45, hand: 'hold', prop: g({ transform: 'translate(0,20)' }, path('M-12,-20 L12,-20 L8,20 L-8,20Z', { fill: '#e9f0f2', stroke: '#2a1b14', 'stroke-width': 2, opacity: 0.8 }), path('M-10,-10 L10,-10 L8,18 L-8,18Z', { fill: '#8a1a2a' })) } }],
  under: (e) => FX.speedLines(e.w, e.h, { n: 50, angle: 90 }) },
  [shout('McGonagall', 'WHAT ARE YOU *SAYING*, MR POTTER?!', 400, 120, { w: 480, size: 40 })], { mood: 'warm', alt: 'McGonagall bursts in through the door, still holding a glass of red wine, in pure horror.' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: { base: 'shock', mouth: { type: 'o', open: 0.4 } } })] },
  [cap('Harry\'s mouth opened automatically, and then blocked on nothing-to-say.', 44, 30, { w: 400 })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['draco'], fr: 'waist' }, bg: MI, actors: [DRA({ expr: 'delight', pose: 'reach', turn: 0.4 })], under: (e) => FX.sparkles([[100, 200, 20], [700, 160, 16], [120, 600, 12]], { col: '#fff3b0' }) },
  [shout('Draco', 'Professor McGonagall! Is it really you? I\'ve heard *so much* about you from my father—', 400, 100, { w: 480, size: 30 }),
   say('Draco', 'I\'ve been thinking of trying to get Sorted into *Gryffindor* so I can—', 400, 700, { w: 440 })], { mood: 'warm' });
ep.bleed(900, { cam: { on: ['lucius', 'mcgonagall'], fr: 'bust' }, bg: MI, blur: 2, actors: [{ def: lucius, id: 'lucius', x: 1650, y: 1000, turn: -0.2, pose: 'armsUp', expr: 'yell' }, { def: mcgonagall, id: 'mcgonagall', x: 1860, y: 1010, turn: -0.2, pose: 'armsUp', expr: 'yell' }],
  under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { bg: '#f6e0b0', col: '#c9922e', op: 0.6 }) },
  [shout('both', '*WHAT?*', 400, 90, { w: 220, size: 60, tails: ['lucius', 'mcgonagall'] })], { mood: 'warm', alt: 'Lucius Malfoy and Professor McGonagall bellow "WHAT?" in perfect unison, side by side.' });
ep.multi(440, [
  { x: M, y: 18, w: 368, h: 404, mood: 'warm', art: { cam: { on: ['lucius', 'mcgonagall'], fr: 'close' }, bg: MI, blur: 3, actors: [{ def: lucius, id: 'lucius', x: 1650, y: 1000, turn: 0.6, expr: 'shock' }, { def: mcgonagall, id: 'mcgonagall', x: 1860, y: 1010, turn: -0.6, expr: 'shock' }] } },
  { x: 408, y: 18, w: 368, h: 404, mood: 'warm', art: { cam: { on: ['lucius', 'mcgonagall'], fr: 'close', padX: 2 }, bg: MI, blur: 3, actors: [{ def: lucius, id: 'lucius', x: 1560, y: 1000, turn: -0.5, lean: -12, expr: 'horror' }, { def: mcgonagall, id: 'mcgonagall', x: 1960, y: 1010, turn: 0.5, lean: 12, expr: 'horror' }] } },
], [cap('Their heads swivelled to look at each other in duplicate motions—', 40, 30, { w: 300, size: 24 }), cap('—and then they recoiled from one another as though performing a synchronised dance.', 420, 300, { w: 330, size: 24 })]);
ep.panel(760, { cam: { x: 1500, y: 640, w: 1100 }, bg: MI, actors: [{ def: draco, id: 'draco', x: 1640, y: 1000, s: 1.1, turn: 0.6, pose: 'run', expr: 'shock', lean: -10 }, { def: lucius, id: 'lucius', x: 1800, y: 1000, turn: 0.6, pose: 'walk', expr: 'angry', armF: { sh: -40, el: 20, hand: 'fist' } }],
  over: (e) => FX.speedLines(e.w, e.h, { n: 40 }) },
  [cap('There was a sudden flurry of action as Lucius seized Draco and dragged him out of the shop.', 44, 30, { w: 440 })], { mood: 'warm' });
ep.beat(320, [capC('And then there was silence.', 400, 160, { w: 380 })]);
ep.panel(620, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#6e4a2c' }) + K.floorboards(0, h * 0.55, w, h * 0.5, '#6e4a2c', 3);
  out += g({ transform: `translate(${w * 0.55},${h * 0.35}) rotate(35)` }, path('M-60,-120 L60,-120 L50,120 L-50,120Z', { fill: '#e9f0f2', stroke: C.ink, 'stroke-width': 4, opacity: 0.85 }), path('M-54,20 L54,20 L50,118 L-50,118Z', { fill: '#8a1a2a' }));
  out += g({ transform: `translate(${w * 0.52},${h * 0.35})` }, path('M-120,-80 q60,-40 110,20 L-40,60Z', { fill: '#1f4a35', stroke: C.ink, 'stroke-width': 4 }), ellipse(-10, 30, 40, 26, { fill: '#efd2bb', stroke: C.ink, 'stroke-width': 4 }));
  out += path(`M${w * 0.62},${h * 0.52} q-4,30 0,60`, { stroke: '#8a1a2a', 'stroke-width': 8, 'stroke-linecap': 'round' }) + ellipse(w * 0.6, h * 0.86, 110, 22, { fill: '#8a1a2a', opacity: 0.85 });
  return out;
}, [note('drip', 640, 300, { size: 44 }), note('drip', 520, 420, { size: 34 })], { mood: 'warm', alt: 'Close on McGonagall\'s hand: the forgotten wine glass tilts, dripping red wine into a small puddle on the floor.' });
ep.panel(700, { cam: { on: ['mcgonagall', 'malkin'], fr: 'bust' }, bg: MI, actors: [MAL({ x: 1300, turn: 0.4, expr: 'calm', pose: 'stand' }), { def: mcgonagall, id: 'mcgonagall', x: 1560, y: 1010, turn: -0.4, pose: 'stand', expr: 'calm' }] },
  [say('McGonagall', 'Madam Malkin. What has been happening here?', 560, 90, { w: 300 })], { mood: 'warm' });
ep.multi(360, [0, 1, 2, 3].map((i) => ({ x: M + i * 190, y: 18, w: 176, h: 324, mood: 'warm', art: { cam: { on: ['malkin'], fr: 'close' }, bg: MI, blur: 3, actors: [MAL({ x: 1300, turn: 0.2, expr: i < 3 ? 'calm' : { base: 'calm', mouth: { type: 'wobble' } } })] } })),
  [note('one', 110, 330, { size: 28 }), note('two', 300, 330, { size: 28 }), note('three', 490, 330, { size: 28 }), note('four', 680, 330, { size: 28 })]);
ep.bleed(900, { cam: { x: 1100, y: 700, w: 1400 }, bg: MI,
  actors: [MAL({ x: 900, turn: 0.2, pose: 'slump', expr: 'laugh', lean: -20 }), AS2({ x: 700, pose: 'crouch', expr: 'laugh' }), AS1({ x: 1250, pose: 'kneel', expr: 'laugh', turn: -0.2 }), { def: harry, id: 'harry', ...H0, s: 1.1, turn: 0.4, pose: 'stand', expr: 'confused' }],
  under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.5, { bg: '#f6e3b0', col: '#e0b060', op: 0.5 }),
  over: (e) => FX.sfxText(e.w * 0.3, e.h * 0.2, 'BWAHAHA', { size: 70, rot: -8 }) + FX.sfxText(e.w * 0.75, e.h * 0.3, 'HAHAHA', { size: 54, rot: 6 }) },
  [cap('Madam Malkin looked back silently for four seconds, and then cracked up. That set off both of her assistants, one of whom fell to her hands and knees, giggling hysterically.', 44, 690, { w: 480 })], { mood: 'warm', alt: 'Madam Malkin and both assistants collapse in hysterical laughter. Harry stands on his footstool, tape measures still draped over him.' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: MI, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1560, y: 1010, turn: -0.3, pose: 'handsHips', expr: 'stern' }], over: (e) => FX.frost(e.w, e.h, 0.3, 11) },
  [say('McGonagall', 'I leave you alone for six minutes.', 280, 100, { w: 320 }),
   say('McGonagall', 'Six minutes, Mr Potter, *by the very clock.*', 280, 580, { w: 320 })], { mood: 'warm' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: 'embarrassed' })] },
  [say('Harry', 'I was only joking around—', 400, 90, { w: 320 })], { mood: 'warm' });
ep.bleed(1000, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: MI, blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1560, y: 1010, turn: -0.2, pose: 'armsUp', expr: 'rant' }],
  under: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.45, { bg: '#f6e0b0', col: '#c9922e', op: 0.6, n: 110 }) },
  [shout('McGonagall', '*Draco Malfoy said in front of his father that he wanted to be sorted into Gryffindor!*', 400, 130, { w: 560, size: 32 }),
   shout('McGonagall', 'Joking around *isn\'t enough* to *do* that! What part of "get fitted for robes" sounded to you like *please cast a Confundus Charm on the entire universe?!*', 400, 820, { w: 580, size: 28 })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: MI, blur: 3, actors: [HAR({ expr: 'think' })] },
  [say('Harry', 'He was in a situational context where those actions made internal sense—', 400, 100, { w: 440 })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: MI, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1560, y: 1010, turn: -0.3, pose: 'facepalm', expr: 'exasperated' }] },
  [say('McGonagall', 'No. Don\'t explain. I don\'t want to know what happened in here, *ever.*', 280, 100, { w: 360 }),
   say('McGonagall', 'Whatever dark power inhabits you, it is *contagious*, and I don\'t want to end up like poor Draco Malfoy, poor Madam Malkin, and her two poor assistants.', 300, 600, { w: 440 })], { mood: 'warm' });
ep.panel(760, { cam: { x: 900, y: 700, w: 1300 }, bg: MI, actors: [MAL({ x: 560, turn: 0.2, pose: 'slump', expr: 'laugh', lean: -24 }), AS2({ x: 380, pose: 'sitFloor', expr: 'laugh' }), AS1({ x: 1250, pose: 'kneel', expr: 'laugh', turn: -0.2 }), { def: harry, id: 'harry', ...H0, s: 1.1, turn: 0.5, pose: 'stand', expr: { base: 'calm', eyes: { lookX: -0.8 } } }], fg: (e) => L.tapeMeasures(780, 600, 0.8, 9) },
  [cap('Harry looked at Madam Malkin, still wheezing against the wall; at her two assistants, now *both* on their knees; and finally down at his own tape-measure-draped body.', 44, 34, { w: 480 })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['harry'], fr: 'bust' }, bg: MI, blur: 2, actors: [{ def: harry, id: 'harry', ...H0, s: 1.1, turn: 0.6, pose: 'gesture', expr: 'warm' }], fg: (e) => L.tapeMeasures(780, 620, 0.8, 9) },
  [say('Harry', 'I\'m not quite done being fitted,', 280, 90, { w: 300 }),
   cap('Harry said kindly.', 520, 300, { w: 220 }),
   say('Harry', 'Why don\'t you go back and have another drink?', 300, 560, { w: 320 })], { mood: 'warm' });
ep.end();

export default ep;
