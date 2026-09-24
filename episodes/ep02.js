// EPISODE 2 — Everything I Believe Is False  (source: HPMOR ch. 2)
import { Episode, say, shout, whisper, think, inner, cold, cap, capC, dark, note, title, plain, M } from '../engine/core/dsl.js';
import { shot } from '../engine/core/scene.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text } from '../engine/core/svg.js';
import * as O from '../engine/bg/oxford.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harry, dad, mum, mcgonagall, makeExtra } from '../engine/chars/cast.js';
import { envelope, sheet, seal, bookHeld, cat, wand, teacup } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep02', number: 2, title: 'Everything I Believe Is False' });
ep.setBg(C.paper);

// draw a panel-space effect inside the camera group (in front of the background, behind actors)
const SCREEN = (fn) => (e) => g({ transform: `translate(${e.cam.x - e.w / 2 / e.z},${e.cam.y - e.h / 2 / e.z}) scale(${1 / e.z})` }, fn(e));
const LR = (o = {}) => () => O.livingRoom({ letter: false, ...o });
const WAND = g({ transform: 'translate(0,26) rotate(180)' }, wand(120, '#4a2e1b'));
const MCG = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 1010, y: 1010, turn: -0.35, expr: 'calm', ...o });
const DAD = (o = {}) => ({ def: dad, id: 'dad', x: 730, y: 1000, turn: 0.4, ...o });
const MUM = (o = {}) => ({ def: mum, id: 'mum', x: 1300, y: 990, turn: -0.4, ...o });
const HAR = (o = {}) => ({ def: harry, id: 'harry', x: 1470, y: 1030, s: 1.12, turn: -0.4, ...o });

// =============================================================== the silent dinner
ep.beat(260, [plain('CHAPTER TWO', 400, 90, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('Everything I Believe Is False', 400, 170, { size: 46 })]);
const tableFg = () => O.dinnerTable() + path('M222,928 L1178,928 L1170,1060 L230,1060Z', { fill: '#e6dcc4', stroke: C.ink, 'stroke-width': 1.8 }) + path('M222,928 L1178,928 L1176,940 L224,940Z', { fill: '#000', opacity: 0.08 });
ep.panel(660, { cam: { x: 700, y: 700, w: 900 }, bg: () => O.kitchen(), fg: tableFg,
  actors: [{ def: dad, id: 'dad', x: 380, y: 1020, turn: 0.45, pose: 'sit', expr: 'deadpan' }, { def: mum, id: 'mum', x: 1020, y: 1010, turn: -0.45, pose: 'sit', expr: 'sad' }, { def: harry, id: 'harry', x: 700, y: 950, s: 1.1, turn: 0, pose: 'sit', expr: 'unimpressed' }] },
  [cap('That evening. Dinner.', 44, 34, { w: 300 }), note('clink', 170, 560, { rot: -8, size: 34 }), note('scrape', 640, 570, { rot: 6, size: 34 })], { mood: 'candle', alt: 'Three people eat dinner in total silence.' });
ep.panel(420, { cam: { on: ['harry'], fr: 'close' }, bg: () => O.kitchen(), blur: 2, actors: [{ def: harry, id: 'harry', x: 700, y: 1000, s: 1.1, turn: 0, pose: 'sit', expr: { base: 'deadpan', eyes: { lookX: -0.8 } } }] },
  [inner('Harry', 'A jiffy or two, she\'d said. That was four hours ago.', 230, 75, { w: 380 })], { mood: 'candle' });
ep.beat(420, [], { over: (t) => FX.sfxText(400, 260, 'DING-DONG', { size: 110, rot: -4 }) });

// =============================================================== the doorstep
const DS = () => O.doorstep();
// the view out through the open front door: the terrace across the wet street, the doorstep lit from behind us
const STREET = () => rect(0, -200, 2000, 1600, { fill: '#1d2640' }) + g({ transform: 'translate(720,490) scale(0.35)' }, O.houseExterior())
  + rect(0, 870, 2000, 400, { fill: '#2b2f3c' }) + K.rainOverlay(2000, 1300, 9, 0.6, 0.45) + rect(700, 1030, 600, 60, { fill: '#8a8272', ...K.bl(2) }) + path('M760,1030 L1240,1030 L1330,1300 L670,1300Z', { fill: '#f0c878', opacity: 0.16 })
  + K.glow(1000, 820, 360, C.candle, 0.18);
const rainStops = (x0) => (e) => { const R = [[x0 - 50, 520], [x0 + 80, 470], [x0 + 10, 430], [x0 + 120, 560], [x0 - 100, 480]]; return R.map(([x, y]) => line(x, y - 30, x - 4, y + 10, { stroke: '#dfeaf4', 'stroke-width': 2.4, opacity: 0.9 }) + circle(x - 4, y + 12, 3, { fill: '#e9f3fa' })).join(''); };
// the front door, swung open towards us (drawn on the page, hinged on the doorway's left edge)
const DOORLEAF = path('M350,26 L292,8 L292,934 L350,914Z', { fill: '#2f4a33', ...K.bl(2) }) + path('M344,90 L300,74 L300,440 L344,450Z M344,510 L300,506 L300,880 L344,860Z', { fill: '#294230', ...K.bl(1.4) }) + circle(306, 676, 6, { fill: '#c9a24a', ...K.bl(1) });
// Harry stands on the page (our side of the door); the panel is the open doorway, with the witch in the rain beyond it
ep.multi(940, [
  { x: 0, y: 0, w: 380, h: 940, cutout: true, border: 'none', art: { cam: { x: 190, y: 470, w: 380 }, actors: [DOORLEAF, { def: harry, id: 'harry', x: 150, y: 900, s: 1.25, turn: 0.45, pose: 'stand', expr: 'shock', armB: { sh: 62, el: 25, hand: 'open' } }] } },
  { x: 350, y: 24, w: 420, h: 892, frame: 'wood', mood: 'night', art: { cam: { x: 1000, y: 640, w: 470 }, bg: STREET, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1000, y: 1060, turn: -0.3, pose: 'stand', expr: 'calm' }], fg: rainStops(1000) } },
], [cap('Harry opened the door.', 30, 40, { w: 175 }),
   say('McGonagall', 'Good evening. I understand someone in this house has been asking for an owl.', 560, 170, { w: 300 })]);
ep.tiles.at(-1).alt = 'Through the open front door: a very tall witch in a pointed hat stands on the rainy doorstep. The rain stops just short of her, as if it had been told not to.';
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: DS, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1200, y: 1060, turn: -0.3, pose: 'stand', expr: 'smile' }] },
  [say('McGonagall', 'I\'m afraid you\'ll have to make do with me. Minerva McGonagall, Deputy Headmistress.', 250, 110, { w: 360 })], { mood: 'night' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: DS, blur: 2, actors: [{ def: harry, id: 'harry', x: 800, y: 990, s: 1.12, turn: 0.3, expr: { base: 'awe', eyes: { lookY: -0.6 } } }] },
  [whisper('Harry', 'The rain isn\'t touching you.', 560, 110, { w: 250 })], { mood: 'night' });
ep.panel(460, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DS, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1200, y: 1060, turn: -0.2, expr: { base: 'calm', eyes: { lookY: -0.8 } } }] },
  [say('McGonagall', 'Hm? Oh. Force of habit.', 270, 100, { w: 260 })], { mood: 'night' });

// =============================================================== ground rules
ep.panel(780, { cam: { x: 1110, y: 600, w: 1120 }, bg: LR(),
  actors: [DAD({ pose: 'crossArms', armF: { sh: 20, el: 100 }, armB: { sh: 20, el: -95, front: true }, expr: 'unimpressed' }), MCG({ pose: 'stand', expr: 'calm', turn: -0.2 }), MUM({ pose: 'stand', expr: 'worried', x: 1540 }), HAR({ pose: 'lecture', expr: 'focus', x: 1270, turn: -0.45 })] },
  [say('Harry', 'Now, just to be clear. If the Professor levitates you, Dad, and you know you haven\'t been attached to any wires, that\'s sufficient evidence.', 458, 130, { w: 470, tail: 'harry' })], { mood: 'warm', alt: 'The living room: Dad, arms crossed; the tall witch; Mum; and Harry, lecturing.' });
ep.panel(800, { cam: { on: ['harry'], fr: 'bust', dx: -0.5, dy: -0.55 }, bg: LR(), actors: [HAR({ pose: 'gesture', expr: 'focus', x: 1460, turn: -0.45 })] },
  [say('Harry', 'No turning round afterwards and saying it was a magician\'s trick. If you feel that way, say so *now,* and we\'ll design a different experiment.', 298, 184, { w: 380, fixed: true })], { mood: 'warm' });
ep.panel(600, { cam: { on: ['dad'], fr: 'close', dx: -0.45 }, bg: LR(), blur: 2, actors: [DAD({ expr: { base: 'exasperated' } })] },
  [say('Dad', 'Yes, Harry.', 590, 90, { w: 180 }), cap('The Professor rolled his eyes.', 46, 380, { w: 190 })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['harry', 'mum'], fr: 'waist', dy: -0.8 }, bg: LR(), actors: [MUM({ expr: 'worried', pose: 'stand', x: 1180, turn: 0.4 }), HAR({ pose: 'point', expr: 'focus', x: 1480, turn: -0.5 })] },
  [say('Harry', 'And Mum, if it *doesn\'t* happen, you admit you were mistaken. No saying magic doesn\'t work when people are sceptical.', 440, 110, { w: 520, tail: [640, 470] })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'waist', dx: -0.6, dy: -0.3 }, bg: LR(), blur: 1, actors: [MCG({ expr: { base: 'smile', mouth: { type: 'smirk' } }, pose: 'wand', armB: { sh: 80, el: 15, hand: 'hold', under: g({ transform: 'translate(0,10)' }, wand(115, '#4a2e1b')) } })] },
  [say('McGonagall', 'Is that sufficient, Mr Potter? Shall I go ahead and demonstrate?', 540, 110, { w: 330 })], { mood: 'warm', alt: 'McGonagall, deeply amused, draws her wand.' });
ep.panel(700, { cam: { on: ['harry'], fr: 'bust', dx: -0.8, dy: -0.2 }, bg: LR(), blur: 2, actors: [HAR({ expr: 'think', pose: 'think' })] },
  [say('Harry', '*Sufficient?* Probably not. But it will *help.*', 400, 90, { w: 420 }),
   say('Harry', 'Go ahead, Deputy Headmistress.', 232, 500, { w: 290, fixed: true })], { mood: 'warm' });
ep.panel(520, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: LR(), blur: 2, actors: [MCG({ expr: 'smile' })] },
  [say('McGonagall', 'Just "Professor" will do.', 540, 110, { w: 250 })], { mood: 'warm' });

// =============================================================== Wingardium Leviosa
// the spell: her wand arm and its trail of sparks rise out over the top of the frame
const sparkUp = (e) => { const a = e.wa?.mcgonagall?.handB; if (!a) return ''; const [x, y] = a; return FX.sparkles([[x - 95, y - 118, 9], [x - 45, y - 160, 12], [x + 30, y - 146, 8], [x - 112, y - 150, 6]], { col: '#fff3b0' }) + path(`M${x - 72},${y - 112} Q${x - 50},${y - 172} ${x + 22},${y - 145}`, { fill: 'none', stroke: '#fff0a8', 'stroke-width': 3, opacity: 0.85, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round' }); };
ep.panel(800, { cam: { head: 'mcgonagall', hw: 0.17, hx: 0.62, hy: 0.3 }, bg: LR(), actors: [MCG({ expr: 'focus', pose: 'wandUp', armB: { sh: 160, el: -8, hand: 'hold', under: g({ transform: 'translate(0,10)' }, wand(125, '#4a2e1b')) } }), sparkUp] },
  [shout('McGonagall', '*Wingardium Leviosa.*', 316, 580, { w: 380, size: 34, weight: 400, fixed: true })], { mood: 'warm', breakout: 'top', ph: 662, panel: { y: 120 } });
ep.bleed(1300, { cam: { x: 860, y: 560, w: 760 }, bg: LR(),
  actors: [{ def: dad, id: 'dad', x: 760, y: 600, turn: 0.2, pose: 'panic', expr: 'blank', armF: { sh: -60, el: -20, hand: 'open', prop: g({ transform: 'translate(0,30) rotate(160)' }, bookHeld('#43302a', { w: 60, h: 76 })) } }],
  under: (e) => '', over: (e) => FX.sparkles([[e.w * 0.3, e.h * 0.62, 14], [e.w * 0.7, e.h * 0.66, 10], [e.w * 0.55, e.h * 0.72, 12], [e.w * 0.4, e.h * 0.78, 8]], { col: '#fff3b0' }) },
  [cap('Professor Michael Verres-Evans rose gently into the air, until his head was level with the top shelf of *Physical Chemistry.*', 44, 1120, { w: 470 })], { mood: 'warm', alt: 'Dad floats up among his own bookshelves, still holding his book, perfectly blank-faced.' });
ep.multi(560, [
  { x: M, y: 18, w: 368, h: 524, mood: 'warm', art: { cam: { on: ['harry'], fr: 'close' }, bg: LR(), blur: 2, actors: [HAR({ expr: 'deadpan', turn: -0.1 })] } },
  { x: 408, y: 18, w: 368, h: 524, mood: 'warm', art: { cam: { on: ['dad'], fr: 'close' }, bg: LR(), blur: 2, actors: [{ def: dad, id: 'dad', x: 760, y: 720, turn: 0.1, expr: 'deadpan' }] } },
], [say('Harry', 'Huh.', 200, 90, { w: 120 }), say('Dad', 'Huh.', 600, 90, { w: 120 })]);
ep.panel(560, { cam: { on: ['dad'], fr: 'bust' }, bg: LR(), actors: [{ def: dad, id: 'dad', x: 760, y: 720, turn: 0.5, pose: 'gesture2', expr: 'unimpressed' }] },
  [say('Dad', 'All right. You can put me down now.', 560, 100, { w: 280 })], { mood: 'warm' });

ep.panel(820, { cam: { on: ['harry'], fr: 'waist', dy: -0.6 }, bg: LR(), actors: [HAR({ expr: 'think', pose: 'think', turn: -0.3 })] },
  [say('Harry', 'That\'s a bit of an anticlimax. You\'d think there\'d be some more dramatic mental event associated with updating on an observation of infinitesimal probability—', 400, 130, { w: 560 })], { mood: 'warm' });
ep.panel(680, { cam: { on: ['dad', 'mcgonagall', 'mum'], fr: 'bust', padX: 1.05, dy: -0.55 }, bg: LR(), actors: [DAD({ expr: 'deadpan', x: 800 }), MCG({ expr: 'deadpan', turn: 0.3 }), MUM({ expr: 'deadpan', x: 1220 })] },
  [cap('Mum, the witch, and even Dad were giving him *that look* again.', 44, 30, { w: 500 })], { mood: 'warm' });
ep.panel(480, { cam: { on: ['harry'], fr: 'close', dx: 0.5 }, bg: LR(), blur: 2, actors: [HAR({ expr: 'embarrassed', turn: -0.2 })] },
  [say('Harry', 'I mean, with finding out that everything I believe is false.', 600, 125, { w: 320 })], { mood: 'warm' });

ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: LR(), actors: [MCG({ expr: 'warm' })] },
  [say('McGonagall', 'Would you like a further demonstration, Mr Potter?', 522, 110, { w: 380 })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['harry'], fr: 'bust' }, bg: LR(), actors: [HAR({ expr: 'think', pose: 'think', turn: -0.3 })] },
  [say('Harry', 'You don\'t have to. We\'ve performed a definitive experiment.', 260, 100, { w: 330 }),
   say('Harry', 'But…', 660, 470, { w: 120 })], { mood: 'warm' });
ep.panel(600, { cam: { on: ['harry'], fr: 'close' }, bg: LR(), blur: 2, actors: [HAR({ expr: 'delight', turn: -0.1 })], mid: SCREEN((e) => FX.burst(e.w, e.h, e.w / 2, e.h / 2, { col: '#f0c878', op: 0.5 })) },
  [say('Harry', 'What else *can* you do?', 400, 90, { w: 300 })], { mood: 'warm' });

// =============================================================== the cat
ep.beat(300, [capC('Professor McGonagall turned into a cat.', 400, 150, { w: 480 })]);
ep.panel(760, { cam: { x: 1245, y: 830, w: 640, roll: -5 }, bg: LR(),
  actors: [g({ transform: 'translate(1040,1012) scale(0.95)' }, cat({ col: '#9b7a52', spectacles: true })),
    { def: harry, id: 'harry', x: 1380, y: 1050, s: 1.12, turn: -0.6, pose: 'fallBack', expr: 'horror' },
    g({ transform: 'translate(1390,700) rotate(30)' }, bookHeld('#274060', { w: 60, h: 80 })), g({ transform: 'translate(1300,800) rotate(-40)' }, bookHeld('#7b2433', { w: 50, h: 70 })), g({ transform: 'translate(1560,960) rotate(80)' }, bookHeld('#2f5a40', { w: 50, h: 66 }))],
  over: (e) => FX.sfxText(e.w * 0.66, e.h * 0.2, 'THWACK', { size: 84, rot: 8 }) },
  [], { mood: 'warm', shape: 'slant', slant: -70, alt: 'Where McGonagall stood sits a small tabby cat with spectacle-shaped markings round its eyes. Harry has scrambled backwards over a stack of books and landed hard.' });
ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust', dx: -0.55 }, bg: LR(), actors: [MCG({ expr: { base: 'smile', mouth: { type: 'smirk' } } })] },
  [say('McGonagall', 'I\'m sorry, Mr Potter. I should have warned you.', 440, 100, { w: 470 }),
   cap('Though the corners of her lips were twitching upwards.', 44, 560, { w: 360 })], { mood: 'warm' });
ep.panel(720, { cam: { on: ['harry'], fr: 'bust', dy: -0.15 }, bg: LR(), actors: [{ def: harry, id: 'harry', x: 1380, y: 1050, s: 1.12, turn: -0.4, pose: 'sitFloor', expr: 'yell' }] },
  [shout('Harry', 'YOU CAN\'T *DO* THAT!', 400, 56, { w: 380, size: 44, anchor: 'tc' })], { mood: 'warm' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'close', dx: -0.5, dy: -0.05 }, bg: LR(), blur: 2, actors: [MCG({ expr: 'calm' })] },
  [say('McGonagall', 'It\'s only a Transfiguration. An Animagus transformation, to be exact.', 250, 100, { w: 400 })], { mood: 'warm' });

// the meltdown
// no frame: Harry's meltdown spills straight onto the page, the burst lines fading out into the paper
const pageBurst = (cx, cy, r, o = {}) => (e) => { const id = 'pb' + Math.round(cx + cy + r); return `<defs><radialGradient id="${id}g" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0.35" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><mask id="${id}m" maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="5000" height="5000"><rect x="-2000" y="-2000" width="5000" height="5000" fill="url(#${id}g)"/></mask></defs>` + g({ mask: `url(#${id}m)` }, FX.burst(e.w, e.h, cx, cy, { col: '#c9922e', op: 0.55, n: 110, ...o })); };
ep.cutout(1640, { cam: { on: ['harry'], fr: 'full' },
  actors: [{ def: harry, id: 'harry', x: 1380, y: 1050, s: 1.12, turn: -0.1, pose: 'panic', expr: 'rant' }],
  behind: (e) => pageBurst(e.anchors.harry.head[0], e.anchors.harry.head[1], 660)(e) },
  [shout('Harry', 'You turned into a cat! A *SMALL* cat! You violated Conservation of Energy!', 400, 168, { w: 430, size: 34 }),
   say('Harry', 'That\'s not just an arbitrary rule, it\'s implied by the form of the quantum Hamiltonian! Rejecting it destroys unitarity and then you get faster-than-light signalling!', 300, 1140, { w: 500, size: 26, shape: 'box', anchor: 'tc', tail: null }),
   say('Harry', 'And cats are *complicated!* What about the *neurology?* How can you go on *thinking* using a cat-sized brain?!', 500, 1362, { w: 460, size: 26, shape: 'box', anchor: 'tc', tail: null })], { ph: 800, panel: { y: 290 }, alt: 'Harry, arms flailing, has a complete meltdown.' });
ep.panel(560, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: LR(), blur: 2, actors: [MCG({ expr: { base: 'calm', mouth: { type: 'line', curve: 0.5 } } })] },
  [say('McGonagall', 'Magic.', 540, 120, { w: 150 })], { mood: 'warm' });
ep.panel(720, { cam: { on: ['harry'], fr: 'waist', zoom: 0.72, dy: -0.3 }, bg: LR(), actors: [{ def: harry, id: 'harry', x: 1380, y: 1050, s: 1.12, turn: -0.3, pose: 'fists', expr: 'yell' }] },
  [shout('Harry', 'Magic *isn\'t enough* to do that! You\'d have to be a *god!*', 380, 140, { w: 440, size: 34 })], { mood: 'warm' });
ep.panel(600, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: LR(), blur: 2, actors: [MCG({ expr: { base: 'gasp', eyes: { style: 'normal', open: 1 } } })] },
  [say('McGonagall', 'That\'s the first time I\'ve ever been called *that.*', 520, 110, { w: 300 })], { mood: 'warm' });

// physics goes down the drain
// the panel is the drain itself: a round hole in the page that everything swirls down
ep.panel(1330, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#1a2238' }) + FX.physicsDrain(ctx.w, ctx.h, ctx.w * 0.5, ctx.h * 0.5, { n: 22 }),
  [dark('A blur came over Harry\'s vision as his brain began to comprehend what had just broken.', 400, 110, { w: 560 }),
   dark('Three thousand years of discovering that the music of the planets was the same tune as a falling apple. That the true laws were universal, with no exceptions anywhere. That the mind was the brain, and the brain was made of neurons.', 400, 1162, { w: 600 })],
  { bg: C.paper, shape: 'oval', ph: 752, panel: { y: 214, x: 24, w: 752 }, overlay: (ctx) => `<defs><radialGradient id="drainrim"><stop offset="0.7" stop-color="#05070e" stop-opacity="0"/><stop offset="1" stop-color="#05070e" stop-opacity="0.75"/></radialGradient></defs>` + rect(0, 0, ctx.w, ctx.h, { fill: 'url(#drainrim)' }), alt: 'Planets, a falling apple, atoms, a brain and a storm of equations swirl down into a dark drain.' });
ep.beat(380, [capC('And then a woman turned into a cat. So much for all that.', 400, 190, { w: 520 })]);

ep.panel(760, { cam: { on: ['harry'], fr: 'bust', zoom: 0.8, dy: -0.3, dx: -0.5 }, bg: LR(), actors: [{ def: harry, id: 'harry', x: 1380, y: 1050, s: 1.12, turn: -0.35, pose: 'gesture', expr: 'suspicious' }] },
  [say('Harry', 'And… and what kind of incantation is *Wingardium Leviosa?* Who invents the words to these spells, nursery schoolers?', 410, 120, { w: 480 })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'bust', dx: 0.95, dy: -0.2 }, bg: LR(), actors: [MCG({ expr: 'stern' })] },
  [say('McGonagall', 'That will do, Mr Potter.', 250, 90, { w: 260 }),
   say('McGonagall', 'If you wish to learn about magic, I suggest that we finalise the paperwork so that you can go to Hogwarts.', 568, 470, { w: 310, fixed: true })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['harry'], fr: 'close', dx: 0.4, dy: -0.25 }, bg: LR(), blur: 2, actors: [{ def: harry, id: 'harry', x: 1380, y: 1050, s: 1.12, turn: -0.2, expr: 'determined' }] },
  [inner('Harry', 'Right. The March of Reason would just have to start over, that was all. They still had the experimental method. That was the important thing.', 400, 110, { w: 620 }),
   say('Harry', 'How do I get to Hogwarts, then?', 610, 560, { w: 290 })], { mood: 'warm' });
ep.panel(600, { cam: { head: 'mcgonagall', hw: 0.4, hx: 0.5, hy: 0.52 }, bg: LR(), blur: 2, actors: [MCG({ expr: 'laugh' })] },
  [cap('A choked laugh escaped Professor McGonagall, as if extracted from her by tweezers.', 44, 30, { w: 620 })], { mood: 'warm' });

// a shout-shaped panel: a jagged burst on a squarish (superellipse) outline, so the top stays wide enough for the shout
const squareBurst = (n = 22, seed = 4, k = 3.2) => (w, h) => { let r = seed; const R = () => ((r = (r * 9301 + 49297) % 233280) / 233280); const pts = []; for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2, c = Math.cos(a), s = Math.sin(a), e = Math.pow(Math.pow(Math.abs(c), k) + Math.pow(Math.abs(s), k), -1 / k), m = i % 2 === 0 ? 1 : 0.86 + R() * 0.04; pts.push([w / 2 + c * e * (w / 2) * m, h / 2 + s * e * (h / 2) * m]); } return 'M' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L') + 'Z'; };
// =============================================================== his condition
ep.panel(760, { cam: { on: ['dad', 'mcgonagall'], fr: 'bust', dy: -1.1 }, bg: LR(), actors: [DAD({ expr: 'worried', pose: 'gesture' }), MCG({ expr: 'suspicious', turn: -0.5 })] },
  [say('Dad', 'Hold on a moment, Harry. Remember why you haven\'t been going to school? What about your *condition?*', 290, 110, { w: 460 }),
   say('McGonagall', 'His condition? What\'s this?', 590, 330, { w: 260 })], { mood: 'warm' });
const sleepClock = (ctx) => {
  const cx = ctx.w / 2, cy = ctx.h * 0.575, r = Math.min(ctx.w, ctx.h) * 0.32;
  // a sheet of ruled notepaper (the panel is torn from Harry's notebook)
  let out = rect(0, 0, ctx.w, ctx.h, { fill: '#fbf6e8' });
  for (let y = 70; y < ctx.h; y += 46) out += line(0, y, ctx.w, y, { stroke: '#9fb4cc', 'stroke-width': 1.4, opacity: 0.55 });
  out += line(64, 0, 64, ctx.h, { stroke: '#d98b8b', 'stroke-width': 1.6, opacity: 0.6 });
  out += circle(cx, cy, r, { fill: '#fdfaf1', stroke: C.ink, 'stroke-width': 4 });
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2 - Math.PI / 2; out += text(cx + Math.cos(a) * r * 0.82, cy + Math.sin(a) * r * 0.82 + 10, String(i === 0 ? 12 : i), { 'font-family': 'IM Fell English', 'font-size': 30, 'text-anchor': 'middle', fill: C.ink }); }
  const marks = [10, 12, 2, 4, 6];
  marks.forEach((h, i) => { const a = ((h % 12) / 12) * Math.PI * 2 - Math.PI / 2; const x = cx + Math.cos(a) * r * 0.55, y = cy + Math.sin(a) * r * 0.55; out += circle(x, y, 34, { fill: '#2f4f86', opacity: 0.2 + i * 0.15 }) + text(x, y + 11, ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i], { 'font-family': 'Caveat', 'font-size': 32, 'text-anchor': 'middle', fill: '#2d2a4a', 'font-weight': 700 }); });
  out += path(`M${cx + r * 0.95},${cy - r * 0.3} A${r * 1.05},${r * 1.05} 0 0 1 ${cx - r * 0.3},${cy + r * 1.0}`, { fill: 'none', stroke: '#c43a32', 'stroke-width': 4, 'marker-end': '' }) + path(`M${cx - r * 0.3},${cy + r * 1.0} l18,-4 l-8,16Z`, { fill: '#c43a32' });
  return out;
};
ep.panel(840, sleepClock,
  [say('Harry', 'I don\'t sleep right. My sleep cycle is twenty-six hours long. I go to sleep two hours later, every day.', 400, 90, { w: 520, who: 'Harry', tail: null }),
   note('10, 12, 2, 4… all the way round the clock', 400, 775, { w: 600, size: 34 })], { shape: 'torn', frame: 'paper', seed: 11, tear: 12, rotate: -1.2, shadow: true, alt: 'A clock diagram: Harry\'s bedtime creeps two hours later every day, all the way round the dial.' });
ep.panel(860, { cam: { on: ['harry', 'mum'], fr: 'bust', dy: -1.0 }, bg: LR(), actors: [MUM({ expr: 'smile', x: 1250 }), HAR({ expr: 'unimpressed', x: 1480 })] },
  [say('Harry', 'That\'s why I haven\'t been going to a normal school.', 560, 90, { w: 300, tail: [555, 480] }),
   say('Mum', '*One* of the reasons.', 170, 215, { w: 220, tail: 'mum' })], { mood: 'warm' });
ep.panel(760, { cam: { on: ['mcgonagall'], fr: 'bust', dx: 0.8 }, bg: LR(), actors: [MCG({ expr: 'think', pose: 'think' })],
  over: (e) => g({ transform: `translate(${e.w * 0.9},${e.h * 0.86}) scale(1.5)`, opacity: 0.85 }, path('M-14,-24 L14,-24 L2,0 L14,24 L-14,24 L-2,0Z', { fill: '#f1e6cc', stroke: '#b08d45', 'stroke-width': 3 }), path('M-6,-14 L6,-14 L0,-4Z M-8,20 L8,20 L0,10Z', { fill: '#d9b35c' })) },
  [say('McGonagall', 'Hmmmm. I can\'t recall hearing of such a condition. I\'ll ask Madam Pomfrey…', 530, 110, { w: 360 }),
   say('McGonagall', 'No. I\'m sure this won\'t be a problem—I\'ll find a solution *in time.*', 530, 440, { w: 340 })], { mood: 'warm' });
ep.panel(600, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: LR(), blur: 2, actors: [MCG({ expr: 'suspicious' })] },
  [say('McGonagall', 'Now. What are these *other* reasons?', 540, 110, { w: 280 })], { mood: 'warm' });
// no frame: Harry plants himself on the page, hands on hips, to make his declaration
ep.cutout(940, { cam: { head: 'harry', hw: 0.56, hx: 0.52, hy: 0.25 }, actors: [HAR({ expr: 'determined', pose: 'handsHips', turn: -0.3 })] },
  [say('Harry', 'I am a conscientious objector to child conscription,', 250, 110, { w: 360, fixed: true }),
   say('Harry', 'on grounds that I should not have to suffer for a disintegrating school system\'s failure to provide teachers or study materials of even minimally adequate quality.', 246, 630, { w: 320, fixed: true, shape: 'box' })], { ph: 900, panel: { x: 380, w: 420, y: 20 } });
ep.panel(700, { cam: { on: ['dad', 'mum'], fr: 'bust', padX: 1.1, dy: -0.6 }, bg: LR(), actors: [DAD({ expr: 'laugh', x: 900 }), MUM({ expr: 'laugh', x: 1150 })] },
  [say('Dad', 'Oh! Is *that* why you bit a maths teacher in third year?', 250, 90, { w: 330 })], { mood: 'warm' });
ep.panel(780, { cam: { on: ['harry'], fr: 'close', dy: -0.3, zoom: 0.85 }, bg: LR(), blur: 2, actors: [HAR({ expr: 'rant', turn: -0.1 })], mid: SCREEN((e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.6, { col: '#e8b4a0', op: 0.5 })) },
  [shout('Harry', 'SHE DIDN\'T KNOW WHAT A LOGARITHM WAS!', 400, 128, { w: 380, size: 38, anchor: 'tc', fixed: true })], { mood: 'warm', shape: squareBurst(22, 4) });
// flashback gag
const teacher = makeExtra(7, { female: true, muggle: true, old: false, hairStyle: 'bun' });
const classroom = () => rect(-500, -500, 3000, 3000, { fill: '#cdb68a' }) + rect(250, 250, 800, 380, { fill: '#2f4a3a', stroke: '#4a2e1b', 'stroke-width': 18 }) + text(420, 420, 'log₁₀ 100 = ?', { 'font-family': 'Caveat', 'font-size': 60, fill: '#efe6cf' }) + rect(-500, 900, 3000, 600, { fill: '#9a7a52' });
// the memory has no frame: it fades in and out of the page
ep.bleed(820, { cam: { x: 700, y: 650, w: 860 }, bg: classroom,
  actors: [{ def: teacher, id: 'teacher', x: 820, y: 1010, turn: 0.2, pose: 'armsUp', expr: 'horror' }, { def: harry, id: 'kid', x: 900, y: 1040, s: 0.62, turn: -0.6, pose: 'hug', expr: 'angry', lean: 20 }] },
  [cap('Age seven.', 44, 60, { w: 180 }), note('chomp', 670, 640, { size: 50, rot: -10 })], { mood: 'sepia', overlay: (ctx) => FX.memoryEdge(ctx.w, ctx.h), alt: 'Memory: a tiny seven-year-old Harry clamped onto a teacher\'s ankle beneath a blackboard.' });
ep.panel(900, { cam: { x: 1025, y: 395, w: 590 }, bg: LR(), actors: [DAD({ expr: 'smug', x: 900 }), MUM({ expr: 'smile', x: 1150 })] },
  [say('Mum', 'Of course. Biting her was a very mature response to that.', 600, 100, { w: 300 }),
   say('Dad', 'A well-considered policy for addressing the problem of teachers who don\'t understand logarithms.', 225, 325, { w: 370 })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['harry'], fr: 'bust', dy: -0.25 }, bg: LR(), actors: [HAR({ expr: 'yell', pose: 'armsUp' })] },
  [shout('Harry', 'I was *seven years old!* How long are you going to keep bringing that up?', 400, 160, { w: 400, size: 32 })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['mum'], fr: 'close', dy: -0.1 }, bg: LR(), blur: 2, actors: [MUM({ expr: 'warm' })] },
  [say('Mum', 'I know. You bite *one* maths teacher, and they never let you forget it, do they?', 270, 100, { w: 380 })], { mood: 'warm' });
ep.panel(700, { cam: { on: ['harry', 'mcgonagall'], fr: 'bust', dy: 0.35 }, bg: LR(), actors: [MCG({ expr: 'twitch', x: 1150, turn: 0.3 }), HAR({ expr: 'cross', pose: 'point', x: 1420, turn: -0.5 })] },
  [say('Harry', 'There! You see what I have to deal with?', 560, 90, { w: 280 })], { mood: 'warm' });
// Mum bolts so fast she runs right out of the panel
ep.panel(620, { cam: { on: ['mum'], fr: 'full', dx: -2.7 }, bg: GDX(), actors: [{ def: mum, id: 'mum', x: 360, y: 1000, turn: 0.6, pose: 'run', expr: 'laugh' }] },
  [say('Mum', 'Excuse me!', 330, 90, { w: 200, fixed: true, tail: 'mum' })], { breakout: 'right', w: 600, panel: { grain: false }, alt: 'Mum flees out of the back door, so fast she runs out of the panel.' });
function GDX() { return () => O.garden(); }
ep.beat(360, [], { over: (t) => FX.sfxText(330, 170, 'HAHAHAHA', { size: 90, rot: -6, fill: '#f6e3b0' }) + FX.sfxText(520, 290, 'HAHAHA', { size: 60, rot: 4, fill: '#f6e3b0' }) });

ep.panel(700, { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: LR(), actors: [MCG({ expr: { base: 'stern', mouth: { type: 'wobble' } } })] },
  [say('McGonagall', 'There… ah… there is to be no biting of teachers at Hogwarts. Is that quite clear, Mr Potter?', 505, 110, { w: 360 })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: LR(), blur: 2, actors: [HAR({ expr: 'unimpressed', turn: -0.2 })] },
  [say('Harry', 'Fine. I won\'t bite anyone who doesn\'t bite me first.', 280, 100, { w: 320 })], { mood: 'warm' });
ep.beat(300, [capC('Professor Michael Verres-Evans also had to leave the room briefly upon hearing that.', 400, 150, { w: 560 })]);

// =============================================================== flaming zebras
ep.panel(780, { cam: { on: ['mcgonagall'], fr: 'bust', zoom: 0.85, dy: -0.25 }, bg: LR(), actors: [MCG({ expr: 'exasperated' })] },
  [say('McGonagall', 'Well. I think, under the circumstances, I should avoid taking you to buy your school things until a day or two before term begins.', 420, 120, { w: 520 })], { mood: 'warm' });
ep.panel(800, { cam: { on: ['harry'], fr: 'bust', dy: -0.45 }, bg: LR(), actors: [HAR({ expr: 'shock', pose: 'shrug' })] },
  [shout('Harry', 'What? Why? The other children already know magic! I have to start catching up *right away!*', 400, 92, { w: 420, size: 30, anchor: 'tc', fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['mcgonagall'], fr: 'bust', dx: 0.7, dy: 0.25 }, bg: LR(), blur: 2, actors: [MCG({ expr: { base: 'calm', eyes: { open: 0.6 } } })] },
  [say('McGonagall', 'Rest assured, Mr Potter, Hogwarts is quite capable of teaching the basics.', 530, 110, { w: 420 }),
   say('McGonagall', 'And I suspect that if I leave you alone for two months with your schoolbooks, even without a wand, I will return to this house to find…', 570, 520, { w: 290, fixed: true })], { mood: 'warm' });
// what McGonagall imagines, in a cloud of (purple) smoke
ep.panel(1000, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = `<defs><linearGradient id="zsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2a5a"/><stop offset="0.55" stop-color="#e8773a"/><stop offset="1" stop-color="#f3c66f"/></linearGradient></defs>` + rect(0, 0, w, h, { fill: 'url(#zsky)' });
  for (let i = 0; i < 9; i++) out += rect(i * 95 - 10, h * 0.3 - (i % 3) * 40, 70, 220 + (i % 3) * 40, { fill: '#3a2a3a', opacity: 0.7 });
  out += rect(0, h * 0.54, w, h * 0.5, { fill: '#6b4a3a' });
  // the purple smoke billows up and fills the sky
  out += [[0.5, 0.36, 110], [0.4, 0.25, 120], [0.58, 0.16, 140], [0.44, 0.07, 150], [0.66, 0.3, 90]].map(([x, y, r], i) => circle(w * x, h * y, r, { fill: '#8a5fb0', opacity: 0.5 - i * 0.05, filter: 'url(#blur3)' })).join('');
  out += g({ transform: `translate(${w * 0.5},${h * 0.52})` }, FX.crater(440));
  out += g({ transform: `translate(${w * 0.27},${h * 0.76}) scale(0.95)` }, FX.zebra()) + g({ transform: `translate(${w * 0.78},${h * 0.68}) scale(0.72)` }, FX.zebra({ flip: true })) + g({ transform: `translate(${w * 0.7},${h * 0.9}) scale(1.05)` }, FX.zebra({ flip: true }));
  return out;
}, [dark('…a crater billowing purple smoke, a depopulated city surrounding it, and a plague of flaming zebras terrorising what remains of England.', 400, 96, { w: 600 })],
  { shape: 'cloud', seed: 6, ph: 810, panel: { y: 176 }, alt: 'Imagined, in a cloud of smoke: a smoking purple crater, a ruined skyline, and a stampede of zebras on fire.' });
ep.panel(660, { cam: { on: ['dad', 'mum'], fr: 'bust', padX: 1.1, zoom: 0.85, dx: 0.5, dy: -0.5 }, bg: LR(), actors: [DAD({ expr: 'calm', x: 900, turn: 0.2 }), MUM({ expr: 'calm', x: 1150, turn: -0.2 })],
  over: (e) => FX.sfxText(e.anchors.dad.head[0] + e.anchors.dad.hr * 1.65, e.anchors.dad.head[1] + e.anchors.dad.hr * 0.5, 'nod', { size: 46, rot: -8 }) + FX.sfxText(e.anchors.mum.head[0] + e.anchors.mum.hr * 1.65, e.anchors.mum.head[1] + e.anchors.mum.hr * 0.5, 'nod', { size: 46, rot: 8 }) },
  [cap('Harry\'s mother and father nodded in perfect unison.', 44, 30, { w: 320 })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: LR(), blur: 2, actors: [HAR({ expr: 'rant', turn: 0 })], mid: SCREEN((e) => FX.burst(e.w, e.h, e.w / 2, e.h / 2, { col: '#e8b4a0', op: 0.5 })) },
  [shout('Harry', 'MUM! DAD!', 400, 110, { w: 360, size: 50 })], { mood: 'warm' });

// =============================================================== goodbye at the door (ADDED beat: the thank-you)
ep.panel(880, { cam: { on: ['harry', 'mcgonagall'], fr: 'waist', dy: -1.1 }, bg: DS,
  actors: [{ def: harry, id: 'harry', x: 800, y: 990, s: 1.12, turn: 0.45, pose: 'stand', expr: 'hopeful' }, { def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1060, turn: -0.45, pose: 'stand', expr: 'calm' }] },
  [say('Harry', 'Professor?', 120, 80, { w: 180 }),
   say('Harry', 'Thank you. For coming. For *showing* us, instead of just telling us.', 500, 230, { w: 440 })], { mood: 'night' });
ep.panel(620, { cam: { on: ['mcgonagall'], fr: 'close' }, bg: DS, blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 1180, y: 1060, turn: -0.3, expr: 'warm' }] },
  [cap('Something in her face softened, just for a moment.', 44, 34, { w: 360 }),
   say('McGonagall', 'Goodnight, Mr Potter.', 610, 500, { w: 220 })], { mood: 'night' });
ep.panel(700, { cam: { x: 1230, y: 950, w: 480 }, bg: DS,
  actors: [g({ transform: 'translate(1320,1030) scale(0.8)' }, cat({ col: '#9b7a52', spectacles: true, flip: true }))] },
  [cap('She stepped out into the rain.', 44, 34, { w: 440 }), cap('And by the bottom step, there was only a tabby cat, trotting briskly away down the wet street.', 44, 555, { w: 600 })], { mood: 'night', alt: 'A tabby cat trots off into the rain.' });
ep.panel(900, { cam: { on: ['harry'], fr: 'knees', dy: 0.1 }, bg: () => O.bedroom(), actors: [{ def: harry, id: 'harry', x: 560, y: 960, s: 1.1, turn: 0.2, pose: 'hold', expr: 'awe', armF: { sh: 18, el: 62, hand: 'hold', prop: g({ transform: 'translate(10,40) rotate(72) scale(0.5)' }, envelope({})) }, armB: { sh: 22, el: 60, hand: 'hold' } }] },
  [inner('Harry', 'Magic is real.', 400, 70, { w: 300 }),
   inner('Harry', 'Which means I\'m going to need a *lot* more books.', 400, 815, { w: 380, fixed: true })], { mood: 'candle', alt: 'That night, Harry holds the letter by candlelight, wide awake.' });
ep.end();

export default ep;
