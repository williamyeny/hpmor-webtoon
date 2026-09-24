// EPISODE 19 — Your Father's Rock  (source: HPMOR ch. 17, second half)
// Harry meets the most powerful wizard alive, and cannot tell whether he is mad or wise.
import { Episode, say, shout, whisper, inner, cold, cap, capC, plain, title, sfx, M } from '../engine/core/dsl.js';
import { C } from '../engine/core/palette.js';
import { shot } from '../engine/core/scene.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as CS from '../engine/bg/castle.js';
import * as HG from '../engine/bg/hogwarts.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { mcgonagall, flitwick } from '../engine/chars/cast.js';
import { harryRaven, dumbledorePJ, HOUSE } from '../engine/chars/cast2.js';
import { pouch, wand } from '../engine/props/props.js';
import * as P2 from '../engine/props/props2.js';
import { dayBeat, header } from './b2.js';

const ep = new Episode({ id: 'ep19', number: 19, title: 'Your Father\'s Rock' });
ep.setBg(C.paper);
header(ep, 'NINETEEN', 'Your Father\'s Rock');
dayBeat(ep, 'Thursday.', 'There must have been something about Thursdays. 5:32 p.m.');

// ---------------------------------------------------------------- the gargoyle
const GC = (o = {}) => () => CS.gargoyleCorridor(o);
const FW = (o = {}) => ({ def: flitwick, id: 'flitwick', x: 700, y: 900, turn: 0.4, pose: 'present', expr: 'happy', ...o });
const HG1 = (o = {}) => ({ def: harryRaven, id: 'harry', x: 520, y: 900, s: 1.1, turn: 0.4, pose: 'stand', expr: 'worried', ...o });
// the open stairwell: a dark archway down to the floor, with a spiral of steps turning inside it
const helixSteps = (cx, top, bot, R, rise = 46, da = 0.62) => { const st = []; for (let k = 0, y = bot; y > top; k++, y -= rise) st.push({ a: k * da, y });
  const one = ({ a, y }) => { const p = (t) => [cx + R * Math.sin(t), y + R * 0.42 * Math.cos(t)]; const [x1, y1] = p(a), [x2, y2] = p(a + da); const front = Math.cos(a + da / 2) > 0;
    return path(`M${cx},${y} L${x1},${y1} L${x2},${y2}Z`, { fill: front ? '#b0a08a' : '#6a5a4a', stroke: '#2a1b14', 'stroke-width': 2.4 }) + (front ? path(`M${x1},${y1} L${x2},${y2} L${x2},${y2 + 16} L${x1},${y1 + 16}Z`, { fill: '#5a4a3a', stroke: '#2a1b14', 'stroke-width': 2 }) : ''); };
  return st.filter((q) => Math.cos(q.a + da / 2) <= 0).map(one).join('') + rect(cx - 12, top - 200, 24, bot - top + 220, { fill: '#6a5a4a', stroke: '#2a1b14', 'stroke-width': 2.4 }) + st.filter((q) => Math.cos(q.a + da / 2) > 0).map(one).join(''); };
const stairDoor = () => rect(856, -90, 288, 990, { fill: '#1c1722' }) + helixSteps(1000, -60, 860, 132, 64, 0.7) +
  [0, 1].map((i) => path(`M${880},${260 + i * 330} Q1000,${220 + i * 330} ${1120},${260 + i * 330}`, { fill: 'none', stroke: '#f3e6c9', 'stroke-width': 4, opacity: 0.35, 'stroke-dasharray': '22 14' })).join('') +
  path('M860,900 L860,-90 M1140,-90 L1140,900', { fill: 'none', stroke: '#4a4038', 'stroke-width': 12 });
ep.panel(800, { cam: { x: 700, y: 585, w: 760 }, bg: GC(), actors: [HG1({ x: 600, pose: 'walk' }), FW({ x: 770, pose: 'walk', expr: 'smile' })] },
  [cap('Dumbledore wanted to speak to him. Apparently the Headmaster had said that Harry was far too young to invoke the words of power and madness.', 44, 30, { w: 620, fixed: true }),
   inner('Harry', '*Happy happy boom boom swamp swamp swamp?*', 60, 212, { anchor: 'tl', w: 300, fixed: true })], { mood: 'candle', alt: 'Tiny Professor Flitwick escorts Harry down a torchlit corridor toward a great stone gargoyle.' });
ep.panel(900, { cam: { x: 710, y: 599, w: 440 }, bg: GC(), actors: [HG1({ x: 620, turn: 0.3 }), FW({ x: 800, turn: -0.4, pose: 'gesture', expr: 'happy' })] },
  [say('Flitwick', 'Please don\'t worry too much, Mr Potter! The Headmaster may seem a little odd, or a lot odd, or even extremely odd, but he has never hurt a student in the slightest. Just keep that in mind at all times and you\'ll be sure not to panic!', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: GC(), blur: 3, actors: [HG1({ expr: 'deadpan' })] },
  [cap('This was not helping.', 44, 30, { w: 280, fixed: true })], { mood: 'candle' });
ep.panel(1000, { cam: { x: 930, y: 520, w: 820 }, bg: GC({ open: true }), actors: [stairDoor, HG1({ x: 650, expr: 'horror', pose: 'stand' }), FW({ x: 790, turn: 0.6, pose: 'wave' })] },
  [cap('The stone gargoyle walked aside, with a very natural movement that Harry found rather shocking, since it still looked like solid stone the whole time. Behind it, a set of slowly revolving spiral stairs.', 44, 30, { w: 620, fixed: true }),
   say('Flitwick', 'Up you go!', 330, 420, { w: 200, fixed: true })], { mood: 'candle', alt: 'The gargoyle steps aside, revealing a spiral staircase turning in the dark.' });
// inside the spiral: a helix of wedge steps around a central post
const spiral = () => { let o = rect(-500, -500, 3000, 2400, { fill: '#241e2a' }) + K.glow(1000, 200, 700, '#f0b060', 0.25); const steps = [];
  for (let k = -4; k < 22; k++) { const a = k * 0.62, y = 1180 - k * 70, x = Math.sin(a) * 300, z = Math.cos(a); steps.push({ k, a, y, x, z }); }
  const draw = (st) => { const x1 = 1000 + st.x, sh = st.z > 0 ? 0.9 : 0.55; const col = ['#9a8a78', '#8a7a68', '#b0a08a'][((st.k % 3) + 3) % 3];
    return path(`M1000,${st.y - 8} L${x1 + 60 * st.z},${st.y - 30} L${x1 - 60 * st.z},${st.y + 20} L1000,${st.y + 22}Z`, { fill: col, stroke: '#2a1b14', 'stroke-width': 3, opacity: sh }) + path(`M${x1 + 60 * st.z},${st.y - 30} L${x1 + 60 * st.z},${st.y - 6} L${x1 - 60 * st.z},${st.y + 44} L${x1 - 60 * st.z},${st.y + 20}Z`, { fill: '#5a4a3a', stroke: '#2a1b14', 'stroke-width': 2, opacity: sh }); };
  o += steps.filter((s) => s.z <= 0).map(draw).join('') + rect(970, -500, 60, 2400, { fill: '#6a5a4a', stroke: '#2a1b14', 'stroke-width': 3 }) + steps.filter((s) => s.z > 0).map(draw).join('');
  o += [0, 1, 2].map((i) => path(`M${700 + i * 40},${300 + i * 260} Q1000,${230 + i * 260} ${1300 - i * 40},${300 + i * 260}`, { fill: 'none', stroke: '#f3e6c9', 'stroke-width': 5, opacity: 0.35, 'stroke-linecap': 'round', 'stroke-dasharray': '30 18' })).join('');
  return o; };
ep.panel(1000, { cam: { x: 1000, y: 560, w: 800 }, bg: spiral, actors: [() => path('M1000,990 L1290,972 L1300,1004 L1000,1022Z', { fill: '#b0a08a', stroke: '#2a1b14', 'stroke-width': 3 }) + path('M1000,1022 L1300,1004 L1300,1030 L1000,1048Z', { fill: '#5a4a3a', stroke: '#2a1b14', 'stroke-width': 2 }), { def: harryRaven, id: 'harry', x: 1150, y: 1000, s: 1.1, turn: -0.2, pose: 'stand', expr: { base: 'worried', eyes: { lookY: -0.5 } } }] },
  [cap('Revolving the spiral ought not to take you anywhere. Harry found himself, for some reason his brain couldn\'t visualise, moving upwards.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'Harry rides the turning spiral staircase upward.' });

// ---------------------------------------------------------------- the office
const OF = (o = {}) => () => CS.dumbledoreOffice(o);
const DB = (o = {}) => ({ def: dumbledorePJ, id: 'dumbledore', x: 1000, y: 880, turn: 0.1, pose: 'sit', seat: 200, expr: { base: 'smile', eyes: { sparkle: true } }, ...o });
const HD = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1380, y: 1060, s: 1.1, turn: -0.4, pose: 'stand', expr: 'worried', ...o });
const SET = (d = {}, h = {}, desk = {}, of = {}) => [() => CS.dumbledoreThrone(1000), DB(d), () => CS.blackDesk(1000, 960, desk), HD(h)];
// a side table crowded with whirring instruments and bubbling flasks
const flask = (x, y, col, s = 1) => g({ transform: `translate(${x},${y}) scale(${s})` }, path('M-8,-60 L-8,-30 L-30,0 L30,0 L8,-30 L8,-60Z', { fill: col, opacity: 0.8, stroke: C.ink, 'stroke-width': 2.4 }), circle(-6, -14, 4, { fill: '#fff', opacity: 0.6 }), circle(6, -70, 5, { fill: col, opacity: 0.6 }), circle(-2, -86, 3.5, { fill: col, opacity: 0.45 }));
const sideTable = (x, y = 900) => rect(x - 150, y - 250, 300, 22, { fill: '#5a3a2a', stroke: C.ink, 'stroke-width': 2.4 }) + line(x - 120, y - 228, x - 130, y, { stroke: '#4a2e1b', 'stroke-width': 12 }) + line(x + 120, y - 228, x + 130, y, { stroke: '#4a2e1b', 'stroke-width': 12 }) +
  g({ transform: `translate(${x - 90},${y - 330})` }, P2.instrument('dial8')) + g({ transform: `translate(${x - 10},${y - 290})` }, P2.instrument('blorple')) + flask(x + 50, y - 250, '#8ad0a0') + flask(x + 105, y - 250, '#d08ab0', 0.8) + g({ transform: `translate(${x + 10},${y - 400}) scale(0.7)` }, P2.instrument('wibblers'));
// the office's portrait frames draw empty (their contents are placed at the origin), so paint the sleepers in here
const sleepers = () => [...Array(7).keys()].map((i) => { const x = -420 + i * 430, y = -760 + (i % 2) * 70, R = rng(40 + i);
  const bgc = ['#4a5a4a', '#5a4a3a', '#3a4a5a'][i % 3], robe = [C.burgundy, C.navy, C.forest, C.plum][i % 4], skin = ['#e0c8a8', '#d8b894', '#e8d0b8'][i % 3];
  const tilt = (i % 2 ? 1 : -1) * 10;
  return rect(x, y, 170, 210, { fill: bgc }) + path(`M${x + 20},${y + 210} Q${x + 85},${y + 120} ${x + 150},${y + 210}Z`, { fill: robe, stroke: C.ink, 'stroke-width': 2 }) +
    g({ transform: `rotate(${tilt} ${x + 85} ${y + 110})` }, circle(x + 85, y + 100, 36, { fill: skin, stroke: C.ink, 'stroke-width': 2 }), path(`M${x + 64},${y + 98} q8,6 16,0 M${x + 90},${y + 98} q8,6 16,0`, { stroke: C.ink, 'stroke-width': 2.4, fill: 'none' }), ellipse(x + 85, y + 118, 5, 4, { fill: '#8a4a3a' }),
      i % 3 === 0 ? path(`M${x + 50},${y + 90} Q${x + 60},${y + 40} ${x + 110},${y + 30} Q${x + 125},${y + 60} ${x + 120},${y + 90}Z`, { fill: '#eee', stroke: C.ink, 'stroke-width': 2 }) : path(`M${x + 50},${y + 92} Q${x + 85},${y + 50} ${x + 120},${y + 92}`, { fill: '#6a6a6a', stroke: C.ink, 'stroke-width': 2 }),
      i % 3 === 1 ? path(`M${x + 70},${y + 124} Q${x + 85},${y + 175} ${x + 100},${y + 124}Z`, { fill: '#ddd', stroke: C.ink, 'stroke-width': 1.6 }) : '') +
    text(x + 128, y + 58, 'z', { 'font-family': 'Caveat', 'font-size': 30, fill: '#f3e6c9' }) + text(x + 144, y + 36, 'z', { 'font-family': 'Caveat', 'font-size': 22, fill: '#f3e6c9' }); }).join('');
// clocks with many hands
const manyClock = (x, y, r, n, seed) => { const R = rng(seed); let h = ''; for (let k = 0; k < n; k++) { const a = R() * 6.28, L = r * R.range(0.4, 0.85); h += line(x, y, x + Math.sin(a) * L, y - Math.cos(a) * L, { stroke: C.ink, 'stroke-width': 2.4, 'stroke-linecap': 'round' }); }
  return circle(x, y, r + 10, { fill: '#b08d45', stroke: C.ink, 'stroke-width': 2.4 }) + circle(x, y, r, { fill: '#f3ead3', stroke: C.ink, 'stroke-width': 2 }) + [...Array(12).keys()].map((k) => { const a = k * Math.PI / 6; return line(x + Math.sin(a) * r * 0.85, y - Math.cos(a) * r * 0.85, x + Math.sin(a) * r * 0.97, y - Math.cos(a) * r * 0.97, { stroke: C.ink, 'stroke-width': 2 }); }).join('') + h + circle(x, y, 5, { fill: C.ink }); };
const CLOCKS = () => manyClock(260, -300, 56, 7, 3) + manyClock(560, -200, 40, 5, 4) + manyClock(1470, -310, 60, 9, 5) + manyClock(1740, -190, 42, 6, 6) + manyClock(-60, -230, 48, 8, 7) + manyClock(2020, -300, 50, 11, 8);
const umbrella = (x, y, col) => path(`M${x},${y} q-22,0 -22,22`, { fill: 'none', stroke: '#3a2418', 'stroke-width': 7, 'stroke-linecap': 'round' }) + path(`M${x},${y + 10} Q${x - 30},${y + 140} ${x - 8},${y + 290} L${x + 8},${y + 290} Q${x + 30},${y + 140} ${x},${y + 10}Z`, { fill: col, stroke: C.ink, 'stroke-width': 2.4 }) + line(x, y + 290, x, y + 320, { stroke: '#3a2418', 'stroke-width': 5 });
const wallShelf = (x, y, kinds) => rect(x, y, 90 + kinds.length * 100, 16, { fill: '#5a3a2a', stroke: C.ink, 'stroke-width': 2 }) + kinds.map((k, i) => k === 'flask' ? flask(x + 70 + i * 100, y, ['#8ab0e0', '#e0c06a', '#d08ab0'][i % 3], 0.9) : g({ transform: `translate(${x + 70 + i * 100},${y - (k === 'dial8' ? 80 : 44)}) scale(0.8)` }, P2.instrument(k))).join('');
const DECOR = () => sleepers() + CLOCKS() + wallShelf(160, -40, ['blorple', 'flask', 'dial8', 'flask']) + wallShelf(1640, -60, ['flask', 'wibblers', 'blorple']) + umbrella(1440, 210, '#2e4a3a') + umbrella(1562, 210, '#8a2433') + sideTable(330) + sideTable(1700, 900);
ep.bleed(1080, { cam: { x: 1000, y: 53, w: 1560 }, bg: OF({}), actors: [DECOR, ...SET({}, { x: 1360, turn: -0.3, expr: 'awe' })] },
  [cap('And Harry saw the most interesting room he\'d ever seen in his life.', 44, 24, { w: 620, fixed: true })],
  { alt: 'Dumbledore\'s office: shelves of whirring silver instruments, portraits asleep in their frames, a hat rack with the Sorting Hat, a bird on a golden perch, and behind a clean black desk, a cushioned throne.' });
ep.multi(990, [
  { x: M, y: 310, w: 368, h: 290, mood: 'candle', art: { cam: { x: 1700, y: 560, w: 400 }, bg: OF({}), actors: [DECOR] } },
  { x: M, y: 616, w: 368, h: 356, mood: 'candle', art: { cam: { x: 330, y: -470, w: 640 }, bg: OF({}), actors: [DECOR] } },
  { x: 408, y: 310, w: 368, h: 662, mood: 'candle', art: { cam: { x: 1500, y: 400, w: 520 }, bg: OF({}), actors: [DECOR] } },
], [cap('Tiny metal mechanisms that whirred or ticked or slowly changed shape. Dozens of mysterious fluids, bubbling and changing colour. Clocks with many hands. A wall of pictures of people sleeping. The Sorting Hat, on a hat rack with two umbrellas and three red slippers for left feet. A bird on a golden perch.', 44, 24, { w: 620, fixed: true })]);
ep.panel(900, { cam: { x: 1050, y: 440, w: 560 }, bg: OF({}), actors: [DECOR, ...SET({ expr: { base: 'smile', eyes: { sparkle: true } } })] },
  [cap('And behind the desk: Albus Percival Wulfric Brian Dumbledore, adorned with a long silver beard, a hat like a squashed giant mushroom, and what looked to Muggle eyes like three layers of bright pink pyjamas.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'Dumbledore on his throne, in three layers of bright pink pyjamas and a squashed-mushroom hat.' });
ep.panel(520, { cam: { head: 'dumbledore', hw: 0.5, hx: 0.5, hy: 0.4 }, bg: OF({}), blur: 3, actors: SET({ expr: { base: 'smile', eyes: { sparkle: true, open: 1 } } }), over: (e) => { const h = e.toPanel(e.wa.dumbledore.head); return FX.sparkles([[h[0] - 250, h[1] - 90, 30], [h[0] + 260, h[1] - 110, 24], [h[0] + 300, h[1] + 10, 16], [h[0] - 300, h[1] + 20, 14]]); } },
  [cap('His eyes twinkled with a mad intensity.', 400, 482, { anchor: 'bc', w: 560, fixed: true })], { mood: 'candle' });
// camera helper: put world point (wx, wy) at tile point (tx, ty) in a standard panel of tile height h, camera width w
const at = (h, w, wx, wy, tx, ty, bleed = false) => { const pw = bleed ? 800 : 752; return { x: wx - (tx - 400) * w / pw, y: wy - (ty - h / 2) * w / pw, w }; };
const DBH = [1000, 427], HH = [1382, 774]; // Dumbledore's head on the throne; Harry's head in front of the desk
const sweets = g({ transform: 'translate(0,6)' }, ellipse(0, 0, 40, 12, { fill: '#c9ced4', stroke: C.ink, 'stroke-width': 2 }), ...[-18, 0, 18, -9, 9].map((x, i) => ellipse(x, -8 - (i > 2 ? 10 : 0), 10, 7, { fill: '#f2d64a', stroke: C.ink, 'stroke-width': 1.6 })));
ep.panel(760, { cam: at(760, 720, ...DBH, 200, 250), bg: OF({}), actors: [DECOR, ...SET({}, { expr: 'neutral' })] },
  [say('Dumbledore', 'Hello, Harry.', 450, 60, { anchor: 'tc', w: 220, fixed: true }),
   say('Harry', 'Hello, Headmaster.', 555, 370, { w: 330, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: at(760, 520, ...DBH, 400, 480), bg: OF({}), blur: 2, actors: SET({ pose: 'gesture', expr: { base: 'happy', eyes: { sparkle: true } } }) },
  [say('Dumbledore', 'Please, Harry! Headmaster sounds so formal. Just call me *Heh* for short.', 400, 60, { anchor: 'tc', w: 520, fixed: true })], { mood: 'candle' });
ep.panel(520, { cam: at(520, 380, ...HH, 500, 300), bg: OF({}), blur: 3, actors: SET({}, { expr: 'smug' }) },
  [say('Harry', 'I\'ll be sure to, Heh.', 262, 100, { w: 290, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: at(760, 440, ...DBH, 400, 540), bg: OF({}), blur: 2, actors: SET({ expr: 'shock' }) },
  [cap('There was a slight pause.', 44, 30, { w: 360, fixed: true }),
   say('Dumbledore', 'Do you know, you\'re the first person who\'s ever taken me up on that?', 430, 110, { anchor: 'tc', w: 460, fixed: true })], { mood: 'candle' });
ep.panel(640, { cam: at(640, 420, ...HH, 560, 400), bg: OF({}), blur: 2, actors: SET({}, { expr: 'horror' }) },
  [say('Harry', 'Ah… I\'m sorry, I, ah, Headmaster, you told me to do it, so I did…', 400, 60, { anchor: 'tc', w: 520, fixed: true })], { mood: 'candle' });
ep.panel(820, { cam: at(820, 520, ...DBH, 400, 560), bg: OF({}), blur: 2, actors: SET({ pose: 'gesture', expr: 'warm' }) },
  [say('Dumbledore', '*Heh*, please! And there\'s no call to be so worried. I won\'t launch you out of a window just because you make one mistake. I\'ll give you plenty of warnings first!', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
ep.panel(900, { cam: at(900, 760, ...DBH, 230, 330), bg: OF({}), actors: [DECOR, ...SET({ pose: 'present', expr: 'smile' }, { expr: 'suspicious' }), (e) => { const h = e.wa.dumbledore.handB; return g({ transform: `translate(${h[0] + 10},${h[1] - 22}) scale(1.3)` }, sweets); }] },
  [say('Dumbledore', 'Sherbet lemon?', 250, 60, { anchor: 'tc', w: 240, fixed: true }),
   inner('Harry', '*Never accept sweets from a madman.*', 776 - 24, 470, { anchor: 'tr', w: 260, fixed: true })], { mood: 'candle' });
ep.panel(660, { cam: at(660, 460, ...HH, 600, 440), bg: OF({}), blur: 2, actors: SET({}, { expr: 'deadpan', pose: 'gesture' }) },
  [say('Harry', 'Er, no thank you, Heh. You said something about my being too young to invoke the words of power and madness?', 350, 60, { anchor: 'tc', w: 460, fixed: true })], { mood: 'candle' });
// shot helpers: Dumbledore on the throne / Harry in front of the desk / both
const dbS = (h, w, ty, d, balloons, o = {}) => ep.panel(h, { cam: at(h, w, ...DBH, o.tx ?? 400, ty), bg: OF(o.of || {}), blur: o.blur ?? 2, actors: [...SET(d, o.h || {}, o.desk || {}), ...(o.extra || [])], over: o.over }, balloons, { mood: 'candle', alt: o.alt });
const hS = (h, w, tx, ty, hh, balloons, o = {}) => ep.panel(h, { cam: at(h, w, ...HH, tx, ty), bg: OF({ rack: false, ...(o.of || {}) }), blur: o.blur ?? 2, actors: [...SET(o.d || {}, hh, o.desk || {}), ...(o.extra || [])], over: o.over }, balloons, { mood: 'candle', alt: o.alt });
const two = (h, w, tx, ty, d, hh, balloons, o = {}) => ep.panel(h, { cam: at(h, w, ...DBH, tx, ty), bg: OF(o.of || {}), actors: [DECOR, ...SET(d, hh, o.desk || {}), ...(o.extra || [])], over: o.over }, balloons, { mood: 'candle', alt: o.alt });
const twoW = (h, w, wx, wy, tx, ty, d, hh, balloons, o = {}) => ep.panel(h, { cam: at(h, w, wx, wy, tx, ty), bg: OF(o.of || {}), actors: [DECOR, ...SET(d, hh, o.desk || {}), ...(o.extra || [])], over: o.over }, balloons, { mood: 'candle', alt: o.alt });
// the Cloak, draped between two hands (or hanging from one)
let ckN = 0;
const drapeD = (l, r, len) => `M${l[0]},${l[1]} Q${(l[0] + r[0]) / 2},${(l[1] + r[1]) / 2 + 50} ${r[0]},${r[1]} Q${r[0] + 30},${r[1] + len * 0.5} ${r[0] + 14},${r[1] + len} Q${(l[0] + r[0]) / 2 + 20},${Math.max(l[1], r[1]) + len + 40} ${(l[0] + r[0]) / 2},${Math.max(l[1], r[1]) + len - 10} Q${(l[0] + r[0]) / 2 - 30},${Math.max(l[1], r[1]) + len + 30} ${l[0] - 14},${l[1] + len} Q${l[0] - 30},${l[1] + len * 0.5} ${l[0]},${l[1]}Z`;
const cloakFill = (d, l, r, len) => { const id = 'ck19_' + (ckN++); const R = rng(ckN * 7);
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b1a24"/><stop offset="0.45" stop-color="#4a4e62"/><stop offset="0.55" stop-color="#9aa2b8"/><stop offset="0.65" stop-color="#3a3c4e"/><stop offset="1" stop-color="#15141c"/></linearGradient></defs>` +
    path(d, { fill: `url(#${id})`, stroke: '#0e0d14', 'stroke-width': 2.4 }) + [...Array(5).keys()].map((i) => { const x = l[0] + (r[0] - l[0]) * (i + 0.5) / 5; return path(`M${x},${(l[1] + r[1]) / 2 + 30} q${R.range(-16, 16)},${len * 0.5} ${R.range(-10, 10)},${len * 0.9}`, { fill: 'none', stroke: '#b9c3d8', 'stroke-width': 2, opacity: 0.4 }); }).join('') +
    [...Array(26).keys()].map(() => circle(R.range(Math.min(l[0], r[0]), Math.max(l[0], r[0])), R.range(Math.min(l[1], r[1]) + 20, Math.max(l[1], r[1]) + len), R.range(1, 2.6), { fill: '#eef2ff', opacity: R.range(0.3, 0.9) })).join(''); };
const drape = (id, len = 240) => (e) => { const a = e.wa[id]; if (!a) return ''; let l = a.handF, r = a.handB; if (l[0] > r[0]) [l, r] = [r, l]; return cloakFill(drapeD(l, r, len), l, r, len); };
const hang = (id, hand = 'handB', len = 220, w = 90) => (e) => { const a = e.wa[id]; if (!a) return ''; const h = a[hand], l = [h[0] - w / 2, h[1]], r = [h[0] + w / 2, h[1]]; return cloakFill(drapeD(l, r, len), l, r, len); };
const DBstand = (o = {}) => ({ seat: undefined, y: 930, ...o });
const DBS = [1000, 435]; // Dumbledore's head when he stands behind the desk
const holdOut = { armF: { sh: -40, el: -50, hand: 'hold' }, armB: { sh: 45, el: 50, hand: 'hold' } };
dbS(900, 520, 670, { pose: 'gesture', expr: 'happy' },
  [say('Dumbledore', 'That you most certainly are! Thankfully the Words of Power and Madness were lost seven centuries ago, and no-one has the slightest idea what they are any more. It was just a little remark.', 400, 60, { anchor: 'tc', w: 500, fixed: true })]);
hS(460, 380, 560, 290, { expr: 'suspicious' },
  [say('Harry', 'Why did you call me here, then?', 262, 110, { w: 300, fixed: true })]);
dbS(780, 420, 540, { pose: 'gesture', expr: { base: 'grin', eyes: { sparkle: true } } },
  [say('Dumbledore', '*Why?* Ah, Harry, if I went around all day asking *why* I do things, I\'d never have time to get a single thing done!', 400, 60, { anchor: 'tc', w: 500, fixed: true })]);
hS(1100, 440, 420, 870, { expr: 'smug' },
  [cap('Once it had become clear that Dumbledore was deliberately messing with him, something within Harry *absolutely refused* to sit and take it.', 44, 30, { w: 620, fixed: true }),
   say('Harry', 'Yes, it was a very impressive list. Headmaster, Chief Warlock, Supreme Mugwump. Sorry to ask, but is it possible to get more than six hours if you use more than one Time-Turner? Because it\'s pretty impressive if you\'re doing all that on just thirty hours a day.', 400, 232, { anchor: 'tc', w: 500, fixed: true })]);
dbS(800, 480, 580, { expr: 'calm' },
  [say('Dumbledore', 'I\'m afraid Time doesn\'t like being stretched out too much. And yet we ourselves seem a little too large for it. So it\'s a constant struggle to fit our lives into Time.', 400, 60, { anchor: 'tc', w: 500, fixed: true })]);
hS(480, 380, 560, 300, { expr: 'smug' },
  [say('Harry', 'Indeed. That\'s why it\'s best to come to our points quickly.', 262, 150, { w: 320, fixed: true })]);
dbS(960, 520, 710, { pose: 'gesture', expr: 'laugh' },
  [cap('For a moment Harry wondered if he\'d gone too far. Then Dumbledore chuckled.', 44, 30, { w: 620, fixed: true }),
   say('Dumbledore', 'Straight to the point it shall be. Harry, this Monday you did something that should have been impossible, even with a Time-Turner. Where did those two pies come from, I wonder?', 400, 180, { anchor: 'tc', w: 500, fixed: true })]);
dbS(900, 520, 650, { pose: 'gesture', expr: { base: 'smile', eyes: { sparkle: true } } },
  [say('Dumbledore', 'If no-one could see the thrower, it would be easy enough to throw the pies. One might suspect that since you had a Time-Turner, you were the invisible one. And since Disillusionment is far beyond you, you had an invisibility cloak.', 400, 60, { anchor: 'tc', w: 500, shape: 'box', fixed: true })]);
two(1060, 700, 230, 580, { pose: 'reach', expr: { base: 'smile', eyes: { sparkle: true } } }, { expr: 'worried' },
  [say('Dumbledore', 'And such cloaks are not for sale in Diagon Alley. But there is *one* which might find its own way to a destined wearer. *The* Cloak of Invisibility, one of the three Deathly Hallows. May I see it, Harry?', 400, 60, { anchor: 'tc', w: 500, fixed: true })]);
ep.panel(900, { cam: { on: ['harry'], fr: 'close', dy: 0.1 }, bg: OF({ rack: false }), blur: 3, actors: SET({}, { expr: 'horror' }), over: (e) => FX.memoryEdge(e.w, e.h) },
  [capC('*If Dumbledore saw a chance to possess one of the Deathly Hallows, he would never let it escape his grasp until the day he died.*', 400, 64, { anchor: 'tc', w: 500, fixed: true }),
   cap('This was the most powerful wizard in the world. There was no way he could make it out of the door.', 44, 770, { w: 620, fixed: true })], { mood: 'candle', alt: 'Harry, frozen, remembering the anonymous note.' });
dbS(840, 460, 590, { pose: 'sit', expr: 'sad' },
  [cap('Slowly, Dumbledore leaned back into his chair. The bright light had gone out of his eyes.', 44, 30, { w: 620, fixed: true }),
   say('Dumbledore', 'Harry. If you don\'t want to, you can just say no.', 420, 160, { anchor: 'tc', w: 480, fixed: true })], { alt: 'Dumbledore sinks back into his throne, the twinkle gone.' });
hS(480, 400, 540, 290, { expr: 'shock' },
  [say('Harry', 'I can?', 250, 130, { w: 160, fixed: true })]);
dbS(800, 500, 580, { expr: 'worried' },
  [say('Dumbledore', 'It seems that you\'re afraid of me, Harry. Surely you realise that I do not *need* your permission. I am powerful enough to draw it out myself, mokeskin pouch or no.', 400, 60, { anchor: 'tc', w: 500, fixed: true })]);
dbS(860, 420, 640, { expr: 'calm' },
  [say('Dumbledore', 'But this I will not do. The Cloak is yours. I will not seize it from you. Not even to look at for a moment, unless you decide to show it to me. That is a promise and an oath.', 400, 60, { anchor: 'tc', w: 500, fixed: true })]);
hS(920, 560, 540, 400, { pose: 'present', expr: 'wince', armB: { sh: 80, el: 10, hand: 'hold', prop: g({ transform: 'translate(0,20)' }, pouch(0.8)) } },
  [say('Harry', 'If you really *don\'t* need my permission… then you have it.', 400, 60, { anchor: 'tc', w: 500, fixed: true }),
   cap('He bit down hard on his lip, sending that signal to himself in case he was Obliviated afterwards.', 44, 790, { w: 620, fixed: true })], { alt: 'Harry holds out his pouch, biting his lip.', blur: 1 });
ep.bleed(1040, { cam: at(1040, 460, ...DBS, 400, 600, true), bg: OF({}), actors: [() => CS.dumbledoreThrone(1000), DB(DBstand({ pose: 'hold', armF: { sh: -50, el: -55, hand: 'hold' }, armB: { sh: 55, el: 55, hand: 'hold' }, expr: { base: 'awe', eyes: { soft: true } } })), () => CS.blackDesk(1000, 960, {}), drape('dumbledore', 320)] },
  [say('Dumbledore', 'Centuries old, and still as perfect as the day it was made. I can feel the power of it like an echo in my mind. Like a song, forever being sung, without anyone to hear it…', 400, 60, { anchor: 'tc', w: 500, fixed: true })],
  { alt: 'Dumbledore holds the shimmering Cloak across his hands, wistful.' });
ep.panel(920, { cam: at(920, 760, ...DBS, 240, 500), bg: OF({}), actors: [DECOR, () => CS.dumbledoreThrone(1000), DB(DBstand({ pose: 'hold', ...holdOut, expr: 'stern' })), () => CS.blackDesk(1000, 960, {}), drape('dumbledore', 220), HD({ expr: 'worried' })] },
  [say('Dumbledore', 'Do not sell it. Think twice before you show it to anyone, and ponder three times again before you reveal it is a Deathly Hallow. This is indeed a Thing of Power.', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
ep.panel(820, { cam: at(820, 760, ...DBS, 240, 330), bg: OF({}), actors: [DECOR, () => CS.dumbledoreThrone(1000), DB(DBstand({ pose: 'present', expr: { base: 'sad', eyes: { soft: true } } })), () => CS.blackDesk(1000, 960, {}), hang('dumbledore', 'handB', 250), HD({ expr: 'shock', pose: 'reach' })] },
  [cap('For a moment Dumbledore\'s face grew wistful. And then he handed the Cloak back.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'Dumbledore holds the Cloak out across the desk to Harry.' });
hS(700, 460, 580, 470, { expr: 'embarrassed' },
  [say('Harry', 'There was a note with the Cloak. It said you would try to take it from me, if you knew. I don\'t know who left it, I really don\'t.', 360, 60, { anchor: 'tc', w: 460, fixed: true })]);
dbS(1020, 500, 740, { expr: { base: 'sad', eyes: { soft: true } } },
  [say('Dumbledore', 'I won\'t impugn the motives of whoever left you that note. They did give you the Cloak, after all. You and I are both game pieces of the same colour, I think. I will only ask that you think twice, and ponder three times again, the next time someone tells you to distrust me.', 400, 60, { anchor: 'tc', w: 500, fixed: true })]);
// Draco: Dumbledore wanders over to the instrument table by the window; Harry turns to follow him
const DBW = (o = {}) => ({ def: dumbledorePJ, id: 'dumbledore', x: 1900, y: 960, turn: -0.5, pose: 'stand', expr: 'calm', ...o });
const DBWH = [1900, 465];
const HW = (o = {}) => HD({ turn: 0.4, ...o });
const ROOM = (d = {}, h = {}, desk = {}) => [DECOR, () => CS.dumbledoreThrone(1000), () => CS.blackDesk(1000, 960, desk), DBW(d), HW(h)];
const away = { x: 1900, y: 960, seat: undefined, turn: -0.5, pose: 'stand' }; // for Harry close-ups while Dumbledore is over by the table
ep.panel(1000, { cam: at(1000, 640, ...DBWH, 470, 650), bg: OF({}), actors: ROOM({ expr: { base: 'worried', eyes: { lookX: -0.6, lookY: 0.4 } } }) },
  [say('Dumbledore', 'In truth, there are some at Hogwarts you would do well not to trust. Perhaps even some you call friends. He probably seems to you quite charming. Polite, to you at least. Always ready with a helping hand, a favour, a word of advice…', 400, 60, { anchor: 'tc', w: 500, shape: 'box', fixed: true })], { mood: 'candle', alt: 'Dumbledore stands by a table of instruments, gazing at a dial with eight hands.' });
hS(780, 460, 560, 480, { turn: 0.4, pose: 'gesture', expr: 'happy' },
  [say('Harry', 'Oh, *Draco Malfoy!* Oh no, no no no, you\'ve got it all wrong. He\'s not turning me. *I\'m* turning *him.*', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { d: away });
ep.panel(460, { cam: at(460, 400, ...DBWH, 540, 300), bg: OF({}), blur: 2, actors: ROOM({ expr: 'shock', turn: -0.3 }) },
  [say('Dumbledore', 'You\'re *what?*', 200, 150, { w: 220, fixed: true })], { mood: 'candle' });
hS(880, 440, 560, 620, { turn: 0.4, pose: 'lecture', expr: 'determined' },
  [say('Harry', 'I\'m going to turn Draco Malfoy from the Dark Side. Make him a good guy. I selected him for redemption *specifically* because he\'s the heir to House Malfoy. If you had to pick one person to redeem, it would obviously be him.', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { d: away });
hS(660, 420, 560, 430, { turn: 0.4, pose: 'fists', expr: 'determined' },
  [say('Harry', 'Not just for *me!* For all of magical Britain! *And* he\'ll have a happier and mentally healthier life himself!', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { d: away });
ep.bleed(1000, { cam: at(1000, 520, ...DBWH, 520, 580, true), bg: OF({}), actors: ROOM({ pose: 'bow', expr: 'laugh', turn: -0.2 }), over: (e) => { const h = e.toPanel(e.wa.dumbledore.head); return FX.emanata(h[0], h[1], 150, { n: 9, a0: -170, a1: -10 }); } },
  [cap('Dumbledore started laughing. A lot harder than Harry would have expected. Almost howling. It seemed positively *undignified.*', 44, 40, { w: 620, fixed: true }),
   say('Dumbledore', 'Ah, me. Ah, me. *Oft evil will shall evil mar indeed.*', 400, 950, { anchor: 'bc', w: 480, fixed: true })], { alt: 'Dumbledore, doubled over, laughing until he has to wipe his eyes.' });
ep.panel(900, { cam: at(900, 800, ...DBWH, 590, 430), bg: OF({}), actors: ROOM({ expr: 'happy', turn: -0.4 }, { x: 1650, expr: 'shock', pose: 'point', armB: { sh: 112, el: 0, hand: 'point' } }) },
  [say('Harry', 'Hey, that\'s a *Tolkien* quote! *Gandalf* says that!', 262, 60, { anchor: 'tc', w: 320, fixed: true }),
   say('Dumbledore', 'Théoden, actually.', 560, 250, { w: 320, fixed: true })], { mood: 'candle', alt: 'Harry points, astonished.' });
hS(440, 380, 560, 280, { turn: 0.4, expr: 'shock' },
  [say('Harry', 'You\'re *Muggle-born?*', 262, 120, { w: 340, fixed: true })], { d: away });
ep.panel(800, { cam: at(800, 500, ...DBWH, 400, 560), bg: OF({}), blur: 2, actors: ROOM({ expr: { base: 'smile', eyes: { sparkle: true } }, pose: 'gesture', turn: -0.3 }) },
  [say('Dumbledore', 'I\'m afraid not. But my Muggle-born students tend to think alike in certain ways. I have no fewer than twenty copies of *The Lord of the Rings.*', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
ep.panel(1000, { cam: at(1000, 620, ...DBWH, 440, 560), bg: OF({}), actors: ROOM({ pose: 'wandUp', expr: 'determined', turn: -0.35, armB: { sh: 160, el: -12, hand: 'hold', prop: wand(240) }, armF: { sh: -70, el: -25, hand: 'splay' }, legF: { hip: -16 }, legB: { hip: 16 } }), behind: (e) => { const h = e.toPanel(e.wa.dumbledore.handB); return FX.burst(e.w, e.h, h[0], h[1] - 120, { n: 24, op: 0.15 }); }, over: (e) => { const h = e.toPanel(e.wa.dumbledore.handB); return K.glow(h[0] - 140, h[1] - 230, 80, '#fff3c9', 0.9); } },
  [shout('Dumbledore', '*You cannot pass!* How does that look?', 400, 80, { anchor: 'tc', w: 420, fixed: true })], { mood: 'candle', alt: 'Dumbledore strikes a pose, wand aloft, in pink pyjamas.' });
hS(460, 380, 560, 290, { turn: 0.4, expr: 'deadpan' },
  [say('Harry', 'Ah… I think you\'re missing a Balrog.', 262, 130, { w: 320, fixed: true })], { d: away });
ep.panel(900, { cam: at(900, 480, ...DBWH, 420, 620), bg: OF({}), blur: 2, actors: ROOM({ pose: 'slump', expr: 'sad', turn: -0.3 }) },
  [say('Dumbledore', 'I fear there have been precious few Balrogs in my life of late. Nowadays it\'s all meetings of the Wizengamot, where I must try desperately to prevent any work from getting done.', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: at(760, 400, ...DBWH, 400, 540), bg: OF({}), blur: 3, actors: ROOM({ expr: { base: 'smug', eyes: { lookX: 0.5 } }, turn: -0.2 }) },
  [say('Dumbledore', 'And being mysterious at people. Knowing things I have no way of knowing. Making cryptic statements which can only be understood in hindsight.', 400, 60, { anchor: 'tc', w: 480, fixed: true })], { mood: 'candle' });
ep.panel(820, { cam: at(820, 800, ...DBWH, 590, 400), bg: OF({}), actors: ROOM({ pose: 'present', expr: { base: 'smile', eyes: { sparkle: true } }, turn: -0.4 }, { expr: 'hopeful' }) },
  [say('Dumbledore', 'Speaking of which, Harry, I have a certain something to give you. Something which belonged to your father.', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
ep.panel(900, { cam: at(900, 820, ...DBS, 300, 360), bg: OF({}), actors: [DECOR, () => CS.dumbledoreThrone(1000), DB(DBstand({ x: 1060, pose: 'reach', armF: { sh: 0, el: 18, hand: 'open' }, armB: { sh: 30, el: 20, hand: 'open' }, expr: 'focus', turn: -0.35 })), () => CS.blackDesk(1000, 960, { rock: true }), HD({ expr: 'deadpan' })], over: (e) => { const r = e.toPanel([940, 640]); return FX.emanata(r[0], r[1], 125, { n: 3, a0: -200, a1: -165 }) + FX.emanata(r[0], r[1], 125, { n: 3, a0: -15, a1: 20 }); } },
  [say('Dumbledore', 'This was your father\'s rock.', 250, 60, { anchor: 'tc', w: 320, fixed: true }),
   sfx('THUNK', 280, 600, { size: 90, rot: -4 })], { mood: 'candle', alt: 'With some effort, Dumbledore heaves a large, grey, ordinary rock onto the desk.' });
const RK = { rock: true };
hS(460, 380, 560, 290, { expr: 'deadpan' },
  [say('Harry', 'This is a joke, right?', 262, 120, { w: 280, fixed: true })], { desk: RK });
dbS(860, 500, 640, { expr: 'stern' },
  [say('Dumbledore', 'It is not. I took this from the ruins of James and Lily\'s home in Godric\'s Hollow, where also I found you. I have kept it from then until now, against the day I could give it to you.', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { desk: RK });
twoW(660, 760, 1130, 600, 400, 330, { expr: 'stern' }, { expr: { base: 'suspicious', eyes: { lookX: -0.8, lookY: 0.3 } }, pose: 'point', turn: -0.5, armB: { sh: 128, el: 0, hand: 'point' } },
  [say('Harry', 'Um. Is it a *magical* rock?', 560, 60, { anchor: 'tc', w: 300, fixed: true })], { desk: RK, alt: 'Harry peers at the rock: large, grey and entirely ordinary.' });
dbS(780, 500, 560, { expr: 'stern', pose: 'lecture' },
  [say('Dumbledore', 'Not so far as I know. But I advise you with the greatest possible stringency to keep it close about your person at all times.', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { desk: RK });
hS(520, 400, 580, 330, { expr: 'what' },
  [say('Harry', 'You think I should just carry a big rock everywhere I go?', 262, 60, { anchor: 'tc', w: 300, fixed: true })], { desk: RK });
dbS(780, 420, 540, { expr: { base: 'grin', eyes: { sparkle: true } }, pose: 'gesture' },
  [say('Dumbledore', 'That might prove wise. Tell them I ordered you to do it. No-one will question that, since they all think I\'m insane.', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { desk: RK });
dbS(900, 560, 710, { expr: 'calm', pose: 'present' },
  [say('Dumbledore', 'Ah, Harry. When we are young, we believe that if we see no explanation for something, then no explanation exists. When we are older, we realise that the whole universe works by a rhythm and a reason, even if we ourselves do not know it.', 400, 60, { anchor: 'tc', w: 520, shape: 'box', fixed: true })], { desk: RK, blur: 1 });
dbS(560, 380, 330, { expr: { base: 'calm', eyes: { soft: true } } },
  [say('Dumbledore', 'It is only our own ignorance which appears to us as insanity.', 60, 50, { anchor: 'tl', w: 300, fixed: true, tail: 'dumbledore' })], { desk: RK, tx: 560, blur: 3 });
hS(500, 400, 560, 310, { expr: 'think' },
  [say('Harry', 'Reality is always lawful, even if we don\'t know the law.', 262, 60, { anchor: 'tc', w: 300, fixed: true })], { desk: RK });
dbS(640, 480, 440, { expr: 'happy' },
  [say('Dumbledore', 'Precisely, Harry. To understand this is the essence of wisdom.', 400, 60, { anchor: 'tc', w: 440, fixed: true })], { desk: RK });
twoW(660, 760, 1130, 600, 400, 330, { expr: 'calm' }, { expr: 'suspicious', pose: 'point', turn: -0.5, armB: { sh: 128, el: 0, hand: 'point' } },
  [say('Harry', 'So… *why* do I have to carry this rock, exactly?', 560, 60, { anchor: 'tc', w: 320, fixed: true })], { desk: RK });
dbS(620, 400, 410, { expr: { base: 'grin', eyes: { sparkle: true } } },
  [say('Dumbledore', 'I can\'t think of a reason, actually.', 400, 60, { anchor: 'tc', w: 440, fixed: true })], { desk: RK });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: OF({ rack: false }), blur: 3, actors: SET({}, { expr: 'deadpan' }, RK) },
  [say('Harry', '…you can\'t.', 400, 64, { anchor: 'tc', w: 200, fixed: true }),
   cap('The instruments ticked on.', 44, 548, { w: 320, fixed: true })], { mood: 'candle' });
// Harry's argument, sketched: a million boxes and the work of finding the one; poor Mortimer Snodgrass
hS(700, 400, 540, 470, { expr: 'rant', pose: 'lecture' },
  [say('Harry', 'Okay, that is simply not the correct way to deal with our admitted ignorance of the universe.', 330, 60, { anchor: 'tc', w: 420, fixed: true })], { desk: RK });
const PT = (x, y, str, fs = 32, col = '#2d2a4a', anchor = 'middle') => text(x, y, str, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, fill: col, 'text-anchor': anchor });
const sketchPaper = (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#f3ead3' }) + [...Array(Math.ceil(ctx.h / 44)).keys()].map((k) => line(0, 30 + k * 44, ctx.w, 30 + k * 44, { stroke: '#b9c7d8', 'stroke-width': 1.2, opacity: 0.6 })).join('');
ep.panel(780, (ctx) => { let o = sketchPaper(ctx); const R = rng(4); const x0 = 60, y0 = 290, cw = 42, ch = 40, HC = 10, HR = 4;
  for (let i = 0; i < 16 * 9; i++) { const c = i % 16, r = Math.floor(i / 16), x = x0 + c * cw + R.range(-2, 2), y = y0 + r * ch + R.range(-2, 2); const hit = c === HC && r === HR;
    o += rect(x, y, 30, 28, { fill: hit ? '#f7dc8c' : '#e8dbb6', stroke: '#2d2a4a', 'stroke-width': 1.8 }); if (hit) o += path(`M${x + 15},${y + 3} l11,11 l-11,12 l-11,-12Z`, { fill: '#9bc4e8', stroke: '#2d2a4a', 'stroke-width': 1.6 }); }
  const hx = x0 + HC * cw + 15, hy = y0 + HR * ch + 14;
  o += circle(hx, hy, 58, { fill: '#fff6d8', opacity: 0.35, stroke: '#2d2a4a', 'stroke-width': 6 }) + line(hx + 42, hy + 42, hx + 110, hy + 110, { stroke: '#6b4429', 'stroke-width': 14, 'stroke-linecap': 'round' });
  o += PT(400, y0 + 9 * ch + 50, 'a million boxes... and ONE diamond', 36);
  return o; },
  [say('Harry', 'If there are a million possibilities, most of the evidence you need goes into just *locating* the right one: bringing it to your attention at all.', 400, 60, { anchor: 'tc', w: 520, fixed: true, noTail: true })], { alt: 'Harry\'s pencil sketch: a grid of boxes, one with a diamond, and a magnifying glass homing in on it.' });
const stickMan = (x, y, s = 1, o = {}) => g({ transform: `translate(${x},${y}) scale(${s})` }, circle(0, -110, 26, { fill: o.fill || '#e8dbb6', stroke: '#2d2a4a', 'stroke-width': 3 }), path('M0,-84 L0,-20 M0,-70 L-30,-40 M0,-70 L30,-40 M0,-20 L-22,30 M0,-20 L22,30', { stroke: '#2d2a4a', 'stroke-width': 3.4, fill: 'none', 'stroke-linecap': 'round' }), o.face || path('M-10,-114 l0,2 M10,-114 l0,2 M-8,-100 q8,4 16,0', { stroke: '#2d2a4a', 'stroke-width': 3, fill: 'none' }));
ep.panel(860, (ctx) => { let o = sketchPaper(ctx); const R = rng(9);
  for (let i = 0; i < 9; i++) { const x = 360 + (i % 5) * 84 + (i > 4 ? 42 : 0), y = 600 + (i > 4 ? 120 : 0) + R.range(-6, 6); o += stickMan(x, y, 0.72, i === 2 ? { fill: '#f7dc8c', face: path('M-10,-116 q4,-4 8,0 M4,-116 q4,-4 8,0 M-8,-96 q8,-6 16,0', { stroke: '#2d2a4a', 'stroke-width': 3, fill: 'none' }) } : {}); }
  o += g({ transform: 'translate(150,720)' }, stickMan(0, 0, 1.05), path('M-30,-132 Q-30,-172 0,-172 Q30,-172 30,-132 L44,-128 L-44,-128Z', { fill: '#a0784a', stroke: '#2d2a4a', 'stroke-width': 3 }), path('M-30,-150 L30,-150', { stroke: '#2d2a4a', 'stroke-width': 2 }));
  o += path('M182,648 L490,548', { stroke: '#2d2a4a', 'stroke-width': 3.4, 'stroke-linecap': 'round' }) + path('M490,548 l-18,-2 M490,548 l-8,16', { stroke: '#2d2a4a', 'stroke-width': 3, 'stroke-linecap': 'round' });
  o += PT(528, 420, 'Mortimer Snodgrass', 30) + path('M528,430 L528,485', { stroke: '#2d2a4a', 'stroke-width': 3 }) + path('M518,474 L528,490 L538,474', { stroke: '#2d2a4a', 'stroke-width': 3, fill: 'none' }) + PT(650, 420, '?!', 40, '#9a2a2a') + PT(170, 792, 'no evidence at all', 28, '#1f3a8a');
  return o; },
  [say('Harry', 'You can\'t just pluck one possibility out of thin air and promote it. Like a detective with no evidence saying, "Have we considered the possibility that Mortimer Snodgrass did it?"', 400, 60, { anchor: 'tc', w: 520, fixed: true, noTail: true })], { alt: 'Harry\'s sketch: a detective in a deerstalker points at random at one bewildered stick figure in a crowd: Mortimer Snodgrass.' });
twoW(760, 760, 1130, 600, 400, 380, { expr: 'calm' }, { expr: 'rant', pose: 'point', turn: -0.5, armB: { sh: 128, el: 0, hand: 'point' } },
  [say('Harry', 'There are a million other things I could do besides carry around my father\'s rock!', 560, 60, { anchor: 'tc', w: 340, fixed: true })], { desk: RK });
dbS(1000, 500, 740, { expr: 'think', pose: 'crossArms' },
  [say('Dumbledore', 'An interesting argument. But doesn\'t it break down when you compare a million murderers, only one of whom did it, with a million courses of action, many of which may all be wise? I do not say carrying your father\'s rock is the one best course. Only that it is wiser to do than not.', 400, 60, { anchor: 'tc', w: 520, fixed: true })], { desk: RK });
hS(580, 400, 440, 270, { expr: { base: 'shock', mouth: { type: 'o' } } },
  [cap('Harry opened his mouth, and found he had no reply ready.', 44, 450, { w: 440, fixed: true })], { desk: RK });
dbS(920, 500, 680, { expr: { base: 'smile', eyes: { sparkle: true } }, pose: 'gesture' },
  [say('Dumbledore', 'Being Sorted into Ravenclaw means that you are driven by your desire to *know* things. That is not at all the same quality as being intelligent. Nonetheless, you *do* seem rather intelligent. I shall be daring, and offer you a certain *other* heirloom.', 400, 60, { anchor: 'tc', w: 520, fixed: true })], { desk: RK });
hS(520, 400, 560, 320, { expr: 'awe' },
  [say('Harry', 'You don\'t mean… my father… *owned another rock?*', 262, 60, { anchor: 'tc', w: 300, fixed: true })], { desk: RK });
dbS(780, 460, 570, { expr: 'cross', pose: 'lecture' },
  [say('Dumbledore', 'Excuse me, I *am* still older and more mysterious than you, and if there are any revelations to be made then *I* will do the revealing, thank you…', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { desk: RK });
// the drawer eats him: only his pink-pyjama legs stick out
const eatenLegs = () => { const P = '#e58aa8', S2 = '#c9607f', SL = '#b8262e';
  const box = path('M650,760 L930,760 L960,736 L680,736Z', { fill: '#3a2c30', stroke: C.ink, 'stroke-width': 3 }) + rect(650, 760, 280, 110, { fill: '#2e2226', stroke: C.ink, 'stroke-width': 3 }) + path('M930,760 L960,736 L960,846 L930,870Z', { fill: '#221a1c', stroke: C.ink, 'stroke-width': 3 }) + circle(790, 815, 8, { fill: '#b08d45', stroke: C.ink, 'stroke-width': 2 });
  const rump = path('M700,748 Q690,650 800,640 Q910,650 900,748Z', { fill: P, stroke: C.ink, 'stroke-width': 3 }) + path('M720,700 Q800,680 880,700', { fill: 'none', stroke: S2, 'stroke-width': 4, 'stroke-dasharray': '10 7' });
  const legL = path('M740,660 Q700,560 650,470 L690,452 Q740,540 790,650Z', { fill: P, stroke: C.ink, 'stroke-width': 3 }) + path('M650,470 q-40,-10 -44,-40 q30,-18 70,14 l14,8Z', { fill: SL, stroke: C.ink, 'stroke-width': 3 });
  const legR = path('M820,650 Q870,560 910,460 L950,476 Q910,570 862,662Z', { fill: P, stroke: C.ink, 'stroke-width': 3 }) + path('M910,460 q6,-36 40,-40 q18,28 0,56Z', { fill: SL, stroke: C.ink, 'stroke-width': 3 });
  const kick = path('M600,430 l-30,-20 M596,460 l-36,0 M960,410 l24,-26 M990,440 l30,-6 M620,400 l-14,-30', { stroke: C.ink, 'stroke-width': 3.4, 'stroke-linecap': 'round' });
  return box + legL + legR + rump + kick; };
ep.panel(920, { cam: at(920, 700, 880, 700, 400, 600), bg: OF({}), actors: [DECOR, () => CS.dumbledoreThrone(1000), () => CS.blackDesk(1000, 960, { rock: true }), eatenLegs, HD({ expr: 'deadpan' })] },
  [cap('Dumbledore\'s head and shoulders and whole torso disappeared into the desk drawer, until only his legs were sticking out, as though the drawer were eating him.', 44, 30, { w: 630, fixed: true }),
   say('Dumbledore', 'oh, where *is* that thing!', 190, 640, { w: 260, fixed: true, tail: [300, 700] })], { mood: 'candle', alt: 'Only Dumbledore\'s pink-pyjama\'d legs stick up out of the desk drawer, kicking.' });
const BOOKH = (e) => { const a = e.wa.dumbledore; if (!a) return ''; const h = a.handB; return g({ transform: `translate(${h[0] + 6},${h[1] - 70}) rotate(-8) scale(0.62)` }, P2.potionsBook(1)); };
dbS(900, 500, 680, { expr: 'stern', pose: 'holdUp', armB: { sh: 120, el: 20, hand: 'hold' } },
  [say('Dumbledore', 'This was your mother\'s fifth-year Potions textbook. *Which holds a terrible secret.* A secret so disastrous that I must ask you to swear never to tell anyone. And I do require you to swear it seriously.', 400, 60, { anchor: 'tc', w: 520, fixed: true })], { desk: RK, extra: [BOOKH] });
hS(700, 440, 580, 470, { expr: 'suspicious' },
  [say('Harry', 'I\'m feeling thirsty. And that is not at all a good sign.', 250, 60, { anchor: 'tc', w: 340, fixed: true }),
   cap('(The Comed-Tea urge. Something funny was about to happen.)', 44, 580, { w: 380, fixed: true })], { desk: RK });
hS(720, 440, 580, 520, { expr: 'determined' },
  [cap('That was the trouble with being a Ravenclaw. You couldn\'t refuse an offer like that, or your curiosity would eat you alive, and everyone knew it.', 44, 30, { w: 620, fixed: true }),
   say('Harry', 'Yes. I swear.', 330, 228, { w: 200, fixed: true })], { desk: RK });
dbS(640, 460, 420, { expr: 'stern' },
  [say('Dumbledore', 'And I swear, in turn, that what I am about to tell you is the truth.', 400, 60, { anchor: 'tc', w: 460, fixed: true })], { desk: RK });
// the textbook, close: Lily's note and, beneath it, a reply in different handwriting
ep.panel(1180, (ctx) => { let o = rect(0, 0, ctx.w, ctx.h, { fill: '#221a1c' }) + K.glow(ctx.w / 2, ctx.h / 2, 520, '#f0b060', 0.25); const cx = ctx.w / 2, top = 285, W2 = 340, H2 = 380;
  o += path(`M${cx},${top} Q${cx - W2 / 2},${top - 26} ${cx - W2 - 10},${top} L${cx - W2 - 10},${top + H2} Q${cx - W2 / 2},${top + H2 - 24} ${cx},${top + H2}Z`, { fill: '#efe3c4', stroke: C.ink, 'stroke-width': 3 }) + path(`M${cx},${top} Q${cx + W2 / 2},${top - 26} ${cx + W2 + 10},${top} L${cx + W2 + 10},${top + H2} Q${cx + W2 / 2},${top + H2 - 24} ${cx},${top + H2}Z`, { fill: '#efe3c4', stroke: C.ink, 'stroke-width': 3 });
  for (let k = 0; k < 4; k++) { o += line(cx - W2 + 30, top + 40 + k * 26, cx - 40, top + 38 + k * 26, { stroke: '#8a7a6a', 'stroke-width': 4, opacity: 0.45 }); o += line(cx + 40, top + 38 + k * 26, cx + W2 - 30, top + 40 + k * 26, { stroke: '#8a7a6a', 'stroke-width': 4, opacity: 0.45 }); }
  o += PT(cx - W2 + 24, top + 170, 'I wonder what would happen if', 27, '#1f3a8a', 'start') + PT(cx - W2 + 24, top + 202, 'you used Thestral blood here', 27, '#1f3a8a', 'start') + PT(cx - W2 + 24, top + 234, 'instead of blueberries?', 27, '#1f3a8a', 'start');
  o += text(cx + 30, top + 200, 'You\'d get sick for weeks', { 'font-family': 'Pinyon Script', 'font-size': 30, fill: '#2f6a3a' }) + text(cx + 30, top + 240, 'and maybe die.', { 'font-family': 'Pinyon Script', 'font-size': 30, fill: '#2f6a3a' });
  o += path(`M${cx - 30},${top + 222} Q${cx},${top + 196} ${cx + 22},${top + 190}`, { fill: 'none', stroke: '#2f6a3a', 'stroke-width': 2.4 });
  return o; },
  [say('Dumbledore', 'Do you see these notes, written in the margins? The ones in *this* handwriting were written by your mother.', 400, 60, { anchor: 'tc', w: 520, fixed: true, noTail: true }),
   say('Dumbledore', 'And the ones in *this* handwriting were written by me. I would turn myself invisible and sneak into the library while she was studying, and scribble in her book. Lily thought one of her friends was writing them. They had the most *amazing* fights.', 400, 1115, { anchor: 'bc', w: 540, fixed: true, noTail: true })], { alt: 'The open textbook: "I wonder what would happen if you used Thestral blood here instead of blueberries?" and beneath, in different handwriting: "You\'d get sick for weeks and maybe die."' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: OF({ rack: false }), blur: 3, actors: SET({}, { expr: { base: 'blank', eyes: { open: 1.1 } } }, RK) },
  [cap('That was the exact point at which Harry realised that the Headmaster of Hogwarts *was,* in fact, crazy.', 44, 30, { w: 620, fixed: true })], { mood: 'candle' });
dbS(640, 480, 420, { expr: 'stern' },
  [say('Dumbledore', 'Do you understand the implications of what I have just told you, Harry?', 400, 60, { anchor: 'tc', w: 460, fixed: true })], { desk: RK });
hS(480, 400, 560, 300, { expr: { base: 'grin', sweat: true } },
  [say('Harry', 'Ehhh… sorry… not really…', 262, 120, { w: 260, fixed: true })], { desk: RK });
// he heads for the door
ep.panel(820, { cam: at(820, 800, 2100, 640, 400, 440), bg: OF({}), actors: [DECOR, HD({ x: 1950, y: 1000, turn: 0.6, pose: 'walk', expr: { base: 'grin', sweat: true } })] },
  [say('Harry', 'Of course. You know it\'s actually getting rather late in the day and I\'m a bit hungry, so I should be going down to dinner, really…', 290, 60, { anchor: 'tc', w: 400, fixed: true })], { mood: 'candle', alt: 'Harry, wearing a fixed smile, makes a beeline for the door.' });
const HDR = (o = {}) => HD({ x: 2300, y: 950, turn: 0.5, ...o });
ep.panel(640, { cam: at(640, 520, 2330, 640, 380, 380), bg: OF({}), actors: [HDR({ x: 2270, y: 845, pose: 'stand', expr: 'horror', armB: { sh: 122, el: -5, hand: 'hold' } })] },
  [cap('The doorknob entirely failed to turn.', 44, 30, { w: 440, fixed: true })], { mood: 'candle', alt: 'Harry yanks at the doorknob. It will not turn.' });
const DBD = (o = {}) => ({ def: dumbledorePJ, id: 'dumbledore', x: 2040, y: 960, turn: 0.4, pose: 'stand', expr: 'sad', ...o });
ep.panel(760, { cam: at(760, 440, 2040, 465, 380, 520), bg: OF({}), blur: 2, actors: [DBD({ pose: 'slump' }), HDR({ turn: -0.5, expr: 'horror' })] },
  [say('Dumbledore', 'You wound me, Harry. Do you not at least realise that what I have told you is a sign of trust?', 400, 60, { anchor: 'tc', w: 480, fixed: true })], { mood: 'candle', alt: 'Dumbledore\'s quiet voice comes from right behind him. He looks saddened and weary.' });
ep.panel(760, { cam: at(760, 400, 2040, 465, 400, 540), bg: OF({}), blur: 3, actors: [DBD({ expr: { base: 'sad', eyes: { soft: true } } })] },
  [say('Dumbledore', 'You try anything new, instead of following the same pattern for a hundred and ten years, and people all start running away.', 400, 60, { anchor: 'tc', w: 480, fixed: true })], { mood: 'candle' });
ep.panel(800, { cam: at(800, 700, 2040, 465, 250, 400), bg: OF({}), actors: [DECOR, DBD({ expr: { base: 'sad', eyes: { soft: true } }, pose: 'shrug' }), HDR({ turn: -0.5, expr: 'worried' })] },
  [say('Dumbledore', 'I\'d heard that your friends also think you mad. I know they are mistaken. Will you not believe the same of me?', 330, 60, { anchor: 'tc', w: 460, fixed: true })], { mood: 'candle' });
ep.panel(560, { cam: at(560, 380, 2290, 694, 520, 330), bg: OF({}), blur: 2, actors: [HDR({ turn: -0.5, expr: 'determined' })] },
  [say('Harry', 'Please open the door. If you ever want me to trust you again, open the door.', 250, 60, { anchor: 'tc', w: 360, fixed: true })], { mood: 'candle' });
ep.panel(300, { cam: at(300, 300, 2400, 596, 400, 150), bg: OF({}) },
  [sfx('click', 560, 150, { size: 60, font: "'Caveat', cursive" })], { mood: 'candle', alt: 'The doorknob clicks.' });
ep.panel(900, { cam: at(900, 820, 2040, 465, 250, 420), bg: OF({ doorOpen: 0.8 }), actors: [DECOR, DBD({ pose: 'stand', expr: 'calm' }), HDR({ turn: -0.3, expr: 'worried' })] },
  [say('Dumbledore', 'There were more things I planned to say to you. And if you leave now, you will not know what they were.', 330, 60, { anchor: 'tc', w: 460, fixed: true }),
   cap('Sometimes Harry absolutely *hated* being a Ravenclaw.', 44, 820, { w: 620, fixed: true })], { mood: 'candle', alt: 'The door stands open. Harry hesitates on the threshold.' });
// the Government of Harry: four tiny Harrys in House trim and scarves, arguing inside his head
const SCARF = { g: ['#9a2a2a', '#e7bb4f'], h: ['#d6a33a', '#2a2a2a'], s: ['#2f5a40', '#c9ced4'], r: ['#2f4f86', '#b0713b'] };
const MINI = (house, expr, x, pose, turn) => ({ def: { ...harryRaven, outfit: { ...harryRaven.outfit, robeTrim: HOUSE[house], cuff: HOUSE[house], tie: HOUSE[house] } }, id: 'm' + house, x, y: 900, s: 1.1, turn, pose, expr });
const scarf = (house) => (e) => { const a = e.wa['m' + house]; if (!a) return ''; const [c1, c2] = SCARF[house]; const [x, y] = a.neck;
  const band = path(`M${x - 48},${y - 6} Q${x},${y + 22} ${x + 48},${y - 6} L${x + 46},${y + 14} Q${x},${y + 42} ${x - 46},${y + 14}Z`, { fill: c1, stroke: C.ink, 'stroke-width': 2.4 });
  const tail = path(`M${x + 14},${y + 20} L${x + 36},${y + 118} L${x + 6},${y + 124} L${x - 6},${y + 26}Z`, { fill: c1, stroke: C.ink, 'stroke-width': 2.4 }) + [0, 1, 2].map((k) => path(`M${x + 2 + k * 6},${y + 46 + k * 26} L${x + 26 + k * 3},${y + 42 + k * 26} L${x + 29 + k * 3},${y + 54 + k * 26} L${x + 4 + k * 6},${y + 58 + k * 26}Z`, { fill: c2 })).join('');
  return tail + band + [0, 1, 2].map((k) => path(`M${x - 30 + k * 26},${y + 2 + (k === 1 ? 10 : 4)} l10,2 l0,12 l-10,-2Z`, { fill: c2 })).join(''); };
const GOV_Z = 0.84, GOV_CAM = { x: 705, y: 685, w: 800 / GOV_Z }; // tile x = (wx - 705) * 0.84 + 400; heads at tile y ≈ 540
const govX = (tx) => 705 + (tx - 400) / GOV_Z;
ep.panel(1200, (ctx) => HG.mindscape(ctx.w, ctx.h, 'warm', 5) + K.glow(400, 700, 520, '#ffcf75', 0.25) + shot({ cam: GOV_CAM, actors: [MINI('g', 'determined', govX(105), 'handsHips', 0.3), scarf('g'), MINI('h', 'worried', govX(300), 'cower', 0.25), scarf('h'), MINI('s', 'scheme', govX(500), 'chin', -0.25), scarf('s'), MINI('r', 'exasperated', govX(695), 'facepalm', -0.3), scarf('r')] })(ctx),
  [say('mg', '*He\'s never hurt a student. You\'re not going to run away just because things are getting interesting, are you?*', 232, 62, { anchor: 'tc', w: 312, fixed: true, tail: [120, 452] }),
   say('mh', '*You can\'t just walk out on the Headmaster! What if he starts deducting House points?*', 614, 96, { anchor: 'tc', w: 280, fixed: true, tail: [320, 460] }),
   say('ms', '*Poor fellow, he looks like he needs someone to talk to. And I bet he\'s got a reaallly interesting book collection.*', 290, 846, { anchor: 'tc', w: 340, fixed: true, tail: [490, 806] }),
   say('mr', '*You\'re all a bunch of lunatics.*', 650, 916, { anchor: 'tc', w: 230, fixed: true, tail: [690, 806] })],
  { x: 0, w: 800, pad: 0, ph: 1200, border: 'bleed', panel: { fadeTop: false, fadeBottom: false }, alt: 'Inside Harry\'s head, four tiny Harrys in four House colours argue: Gryffindor, Hufflepuff, Slytherin, Ravenclaw. Ravenclaw is outvoted.' });
ep.panel(900, { cam: at(900, 820, 2150, 600, 400, 520), bg: OF({}), actors: [DECOR, DBD({ pose: 'stand', expr: { base: 'smile', eyes: { sparkle: true } } }), HDR({ x: 2270, y: 845, turn: 0.5, pose: 'stand', expr: 'determined', armB: { sh: 110, el: -5, hand: 'palm' } })], over: (e) => { const d = e.toPanel([2330, 600]); return FX.emanata(d[0] + 40, d[1], 70, { n: 5, a0: -60, a1: 60 }); } },
  [cap('Harry turned, took a step toward the open door, reached out, and deliberately closed it again. (A costless sacrifice, since he was staying anyway. But maybe it would impress Dumbledore.)', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'Harry pushes the door shut himself. Dumbledore looks pleased.' });
ep.panel(520, { cam: at(520, 380, 2290, 694, 540, 300), bg: OF({}), blur: 2, actors: [HDR({ turn: -0.5, expr: 'stern' })] },
  [say('Harry', 'Please don\'t do that again. I don\'t like being trapped.', 250, 60, { anchor: 'tc', w: 340, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: at(760, 440, 2040, 465, 420, 540), bg: OF({}), blur: 2, actors: [DBD({ expr: 'warm', pose: 'present' })] },
  [say('Dumbledore', 'I *am* sorry about that, Harry. But it would have been terribly unwise to let you leave without your father\'s rock.', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
hS(760, 520, 580, 450, { expr: 'deadpan', pose: 'holdOne', armF: { sh: 40, el: 75, hand: 'hold' } },
  [say('Harry', 'Of course. It wasn\'t reasonable of me to expect the door to open before I put the quest items in my inventory.', 300, 60, { anchor: 'tc', w: 460, fixed: true })], { desk: RK, extra: [(e) => { const h = e.wa.harry.handF; return g({ transform: `translate(${h[0]},${h[1] + 30})` }, pouch(1.1)); }] });
// insert: the rock goes into the pouch
ep.panel(560, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#2a1e20' }) + K.glow(ctx.w / 2, ctx.h * 0.6, 360, '#f0b060', 0.25) +
  g({ transform: `translate(${ctx.w / 2 + 40},${ctx.h * 0.62}) scale(3.2)` }, pouch(1, { open: true })) + g({ transform: `translate(${ctx.w / 2 + 40},${ctx.h * 0.62 - 50}) scale(0.9) rotate(12)` }, P2.rock(1)) +
  g({ transform: `translate(${ctx.w / 2 + 40},${ctx.h * 0.62 + 40}) scale(3.2)` }, path('M-34,-10 Q-44,40 0,48 Q44,40 34,-10 Q0,4 -34,-10Z', { fill: '#8a6a4a', stroke: C.ink, 'stroke-width': 2.2 }), path('M-30,-6 Q-38,30 0,38', { fill: 'none', stroke: '#a9885f', 'stroke-width': 3, 'stroke-dasharray': '2 5' }), path('M-34,-10 Q-20,0 -8,-3 M8,-3 Q20,0 34,-10 M-8,-3 q-6,14 -2,22 M8,-3 q6,14 2,22', { fill: 'none', stroke: '#c9a24a', 'stroke-width': 2.4 })) +
  FX.emanata(ctx.w / 2 + 40, ctx.h * 0.62, 190, { n: 7, a0: -20, a1: 60 }),
  [cap('The rock went into the pouch. The burp that followed had a distinctly complaining sound to it.', 44, 30, { w: 420, fixed: true })], { mood: 'candle', alt: 'The rock slides into the mokeskin pouch, which burps.' });
// the tour
hS(460, 400, 560, 290, { expr: 'hopeful' },
  [say('Harry', 'As long as I\'m here, I don\'t suppose you\'d give me a bit of a tour?', 262, 60, { anchor: 'tc', w: 340, fixed: true })]);
ep.panel(1300, { cam: at(1300, 1000, 1200, 84, 400, 650), bg: OF({}), actors: [DECOR, () => CS.dumbledoreThrone(1000), () => CS.blackDesk(1000, 960, {}), DBW({ x: 1250, pose: 'present', expr: 'smile', turn: -0.4 }), HW({ x: 1560, turn: -0.4, expr: 'awe' })] },
  [say('Dumbledore', 'I\'m flattered, but there isn\'t much to say. These are portraits of past Headmasters. This is my desk. This is my chair.', 400, 440, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle', alt: 'Dumbledore gestures vaguely at the sleeping portraits, the desk, the throne.' });
ep.panel(560, { cam: at(560, 460, 1560, 774, 300, 360), bg: OF({}), blur: 2, actors: [HW({ x: 1560, turn: 0.4, pose: 'point', expr: 'awe', armB: { sh: 110, el: 0, hand: 'point' } })] },
  [say('Harry', 'Actually I was wondering about *those.*', 560, 60, { anchor: 'tc', w: 300, fixed: true })], { mood: 'candle' });
const DBT = (o = {}) => ({ def: dumbledorePJ, id: 'dumbledore', x: 1960, y: 960, turn: -0.4, pose: 'point', expr: 'happy', ...o });
ep.panel(1000, { cam: at(1000, 640, 1760, 560, 400, 700), bg: OF({}), actors: [DECOR, DBT({ armB: { sh: 60, el: 10, hand: 'point' } })], over: (e) => { const c = e.toPanel([1690, 610]); return text(c[0] - 20, c[1] + 70, 'blorple…', { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': 40, fill: '#dfe7f2', 'text-anchor': 'middle', transform: `rotate(-8 ${c[0]} ${c[1] + 70})` }); } },
  [say('Dumbledore', 'The little fiddly things? They came with the office, and I have absolutely no idea what most of them do. Although *this* dial with the eight hands counts the number of, let\'s call them sneezes, by left-handed witches within the borders of France.', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle', alt: 'A table of instruments: a cube whispering "blorple… blorple…", an eight-handed dial, a golden thing with wibblers.' });
ep.panel(820, { cam: at(820, 560, 1750, 440, 330, 560), bg: OF({}), actors: [DECOR, DBT({ pose: 'present', expr: { base: 'grin', eyes: { sparkle: true } } })], over: (e) => { const c = e.toPanel([1710, 470]); return FX.sparkles([[c[0] - 70, c[1] - 60, 16], [c[0] + 60, c[1] - 30, 12], [c[0] - 40, c[1] + 50, 10]]); } },
  [say('Dumbledore', 'And *this* one with the golden wibblers is my own invention, and Minerva is never, ever going to figure out what it\'s doing.', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
const DBH2 = (o = {}) => ({ def: dumbledorePJ, id: 'dumbledore', x: 1320, y: 960, turn: 0.4, pose: 'present', expr: 'smile', ...o });
ep.panel(1000, { cam: at(1000, 700, 1450, 300, 400, 680), bg: OF({}), actors: [DECOR, DBH2()] },
  [say('Dumbledore', 'Here of course we have the Sorting Hat. It told me it was never again to be placed on your head under any circumstances. You\'re only the fourteenth student in history it\'s said that about. Baba Yaga was another.', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle', alt: 'The Sorting Hat, asleep on its hat rack.' });
ep.panel(780, { cam: at(780, 600, 1480, 380, 400, 470), bg: OF({}), actors: [DECOR, DBH2({ pose: 'point', armB: { sh: 125, el: 0, hand: 'point' }, expr: { base: 'smile', eyes: { sparkle: true } } })] },
  [say('Dumbledore', 'This is an umbrella. This is another umbrella.', 400, 60, { anchor: 'tc', w: 460, fixed: true })], { mood: 'candle', alt: 'Two umbrellas and three red left slippers.' });
// the chicken, on its golden perch (perch at x 700)
const DBP = (o = {}) => ({ def: dumbledorePJ, id: 'dumbledore', x: 960, y: 960, turn: -0.4, pose: 'present', expr: 'smile', ...o });
const HP = (o = {}) => HD({ x: 470, y: 1000, turn: 0.4, ...o });
ep.panel(940, { cam: at(940, 780, 730, 420, 400, 500), bg: OF({}), actors: [DECOR, DBP(), HP({ expr: 'confused' })] },
  [say('Dumbledore', 'And of course, most people who come to my office want to see *Fawkes.* Fawkes is a phœnix. Very rare, very powerful magical creatures.', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle', alt: 'On the golden perch sits an ordinary brown chicken.' });
ep.panel(700, { cam: at(700, 280, 740, 300, 440, 390), bg: OF({}) },
  [cap('Harry stared into the tiny, beady black eyes, which showed not the slightest sign of power or intelligence. He was pretty sure he recognised the shape of the bird. It was pretty hard to miss.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'Close on the bird: an ordinary brown chicken with tiny, beady black eyes.' });
ep.panel(1000, { cam: at(1000, 360, 472, 714, 400, 560), bg: OF({}), blur: 3, actors: [HP({ expr: 'pained' })] },
  [inner('Harry', '*Say something intelligent!*', 60, 40, { anchor: 'tl', w: 300, fixed: true }),
   inner('Harry', '*Well what the heck am I supposed to say?*', 740, 170, { anchor: 'tr', w: 300, fixed: true }),
   inner('Harry', '*Anything!*', 60, 310, { anchor: 'tl', w: 180, fixed: true }),
   inner('Harry', '*You mean, anything besides "Fawkes is a chicken"?*', 740, 740, { anchor: 'tr', w: 340, fixed: true }),
   inner('Harry', '*YES! ANYTHING BUT THAT!*', 400, 950, { anchor: 'bc', w: 600, fixed: true, size: 40 })], { mood: 'candle', alt: 'Harry, pained, argues with himself.' });
ep.panel(800, { cam: at(800, 620, 600, 560, 400, 400), bg: OF({}), actors: [DECOR, HP({ expr: { base: 'grin', sweat: true }, pose: 'gesture' })] },
  [say('Harry', 'So, ah, what sort of magic do phœnixes do, then?', 230, 60, { anchor: 'tc', w: 300, fixed: true })], { mood: 'candle' });
ep.panel(800, { cam: at(800, 480, 960, 465, 400, 560), bg: OF({}), blur: 2, actors: [DBP({ pose: 'lecture', expr: 'calm', turn: -0.2 })] },
  [say('Dumbledore', 'Their tears have the power to heal. They are creatures of fire. Whenever their bodies fail them, they immolate themselves in a burst of fire, and leave behind a hatchling, or sometimes an egg.', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
ep.panel(620, { cam: at(620, 560, 830, 400, 400, 330), bg: OF({}), actors: [DBP({ expr: { base: 'calm', eyes: { lookX: -0.8, lookY: 0.2 } }, pose: 'stand' })] },
  [say('Dumbledore', 'Hm… looking a little peaky there, I\'d say.', 560, 60, { anchor: 'tc', w: 300, fixed: true })], { mood: 'candle', alt: 'Dumbledore peers at the chicken.' });
const BLAZE = () => g({ transform: 'translate(700,382)' }, K.glow(0, -80, 320, '#ff9a3a', 0.6), path('M-110,0 Q-150,-120 -70,-220 Q-60,-140 -20,-290 Q10,-170 40,-240 Q60,-150 100,-210 Q150,-110 110,0Z', { fill: '#ff8a2a', stroke: '#b9501a', 'stroke-width': 3 }), path('M-70,0 Q-90,-80 -30,-150 Q-20,-90 10,-190 Q30,-110 60,-150 Q90,-70 70,0Z', { fill: '#ffd060' }), path('M-30,0 Q-40,-40 0,-90 Q30,-40 30,0Z', { fill: '#fff3c0' }), g({ transform: 'translate(0,-4) scale(1.1)', opacity: 0.9 }, P2.chicken(1)), path('M-70,0 Q-60,-50 -40,-30 Q-30,-70 -10,-40 Q0,-80 20,-40 Q40,-70 50,-30 Q70,-50 70,0Z', { fill: '#ffb040', opacity: 0.9 }), path('M-60,-60 q-10,-30 6,-50 M60,-70 q14,-30 -2,-54', { stroke: '#ffd060', 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' }));
ep.bleed(1000, { cam: at(1000, 800, 720, 470, 400, 520, true), bg: OF({ bird: 'fire' }), actors: [DECOR, DBP({ pose: 'stand', expr: 'calm' }), BLAZE, HP({ expr: 'horror', pose: 'panic' })], behind: (e) => { const c = e.toPanel([700, 280]); return FX.burst(e.w, e.h, c[0], c[1], { n: 26, op: 0.18 }); } },
  [cap('By the time this statement registered fully in Harry\'s mind, the chicken was already on fire.', 44, 50, { w: 620, fixed: true })], { alt: 'The chicken bursts into flame.' });
ep.panel(760, { cam: at(760, 420, 720, 330, 400, 470), bg: OF({ bird: 'ash' }), actors: [() => g({ opacity: 0.5 }, path('M690,300 q-20,-40 10,-80 q10,40 30,20 q-10,-40 20,-60', { fill: 'none', stroke: '#9a9590', 'stroke-width': 5, 'stroke-linecap': 'round' }))] },
  [cap('The blaze was brief, intense, and entirely self-contained. And then it died down, leaving a tiny, pathetic heap of ashes on the golden perch.', 44, 30, { w: 620, fixed: true })], { mood: 'candle', alt: 'A tiny, pathetic heap of ashes on the golden perch.' });
ep.panel(840, { cam: at(840, 700, 720, 560, 400, 510), bg: OF({ bird: 'ash' }), actors: [DECOR, DBP({ expr: 'happy' }), HP({ expr: 'horror' })] },
  [say('Dumbledore', 'Don\'t look so horrified, Harry! Fawkes hasn\'t been hurt.', 470, 50, { anchor: 'tc', w: 420, fixed: true })], { mood: 'candle' });
const EGGH = (e) => { const a = e.wa.dumbledore; if (!a) return ''; const h = a.handB; return g({ transform: `translate(${h[0] + 4},${h[1] - 30}) scale(2)` }, P2.egg(1)); };
ep.panel(900, { cam: at(900, 560, 830, 420, 400, 560), bg: OF({ bird: 'ash' }), actors: [DBP({ x: 930, pose: 'holdUp', expr: { base: 'happy', eyes: { sparkle: true } }, armB: { sh: 125, el: 25, hand: 'hold' } }), EGGH], over: (e) => { const a = e.anchors.dumbledore; if (!a) return ''; const h = a.handB; return FX.sparkles([[h[0] - 40, h[1] - 90, 16], [h[0] + 50, h[1] - 70, 12]]); } },
  [cap('Dumbledore\'s hand dipped into a pocket, and then the same hand sifted through the ashes and turned up a small yellowish egg.', 44, 30, { w: 620, fixed: true }),
   say('Dumbledore', 'Look, here\'s an egg!', 600, 250, { anchor: 'tc', w: 260, fixed: true })], { mood: 'candle', alt: 'Dumbledore holds up a small yellowish egg.' });
ep.panel(480, { cam: at(480, 380, 472, 714, 540, 280), bg: OF({}), blur: 2, actors: [HP({ expr: { base: 'blank', mouth: { type: 'line' } } })] },
  [say('Harry', 'Oh… wow… amazing.', 230, 110, { w: 260, fixed: true })], { mood: 'candle' });
// the apology: back at the desk
const EG = { bird: 'egg' };
dbS(840, 480, 620, { expr: 'sad' },
  [say('Dumbledore', 'I fear I have a confession to make, Harry. A confession, and an apology. I\'m afraid that I\'ve been manipulating you your entire life. It was I who consigned you to the care of your *wicked* step-parents…', 400, 60, { anchor: 'tc', w: 520, fixed: true })], { of: EG });
hS(680, 440, 590, 480, { expr: 'yell', pose: 'fists' },
  [shout('Harry', 'My step-parents aren\'t wicked! My *parents*, I mean!', 340, 80, { anchor: 'tc', w: 400, fixed: true })], { of: EG });
dbS(640, 440, 440, { expr: 'confused' },
  [say('Dumbledore', 'They aren\'t? Not even a *little* wicked? That doesn\'t fit the pattern…', 400, 60, { anchor: 'tc', w: 460, fixed: true })], { of: EG });
ep.panel(820, (ctx) => HG.mindscape(ctx.w, ctx.h, 'warm', 6) + shot({ cam: at(820, 600, 1000, 614, 400, 480), actors: [MINI('s', 'yell', 1000, 'panic', 0.1), scarf('s')] })(ctx),
  [shout('ms', '*SHUT UP YOU IDIOT HE\'LL TAKE YOU AWAY FROM THEM!*', 400, 100, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle', alt: 'Harry\'s inner Slytherin screams at the top of its mental lungs.' });
hS(840, 460, 580, 600, { expr: { base: 'grin', sweat: true }, pose: 'shrug' },
  [say('Harry', 'No, no, I was just trying to spare your feelings. They\'re actually very wicked. They, ah, I have to do dishes and wash problems and they don\'t let me read a lot of books and…', 360, 60, { anchor: 'tc', w: 500, fixed: true })], { of: EG });
dbS(900, 500, 680, { expr: { base: 'warm', eyes: { soft: true } } },
  [say('Dumbledore', 'Ah, good, that\'s good to hear. I apologise for *that*, then. I\'m sorry to say, Harry, that I am responsible for virtually everything bad that has ever happened to you. I know that this will probably make you very angry.', 400, 60, { anchor: 'tc', w: 520, shape: 'box', fixed: true })], { of: EG });
hS(900, 580, 400, 380, { expr: 'angry', pose: 'fists' },
  [say('Harry', 'Yes, I\'m very angry! Grrr!', 400, 60, { anchor: 'tc', w: 400, fixed: true }),
   cap('Harry\'s Internal Critic promptly awarded him the All-Time Award for the Worst Acting in the History of Ever.', 44, 680, { w: 440, fixed: true })], { of: EG });
dbS(820, 460, 600, { expr: { base: 'teary', eyes: { lookY: 0.3 } } },
  [say('Dumbledore', 'And I just wanted you to know, as early as possible, in case something happens to one of us later…', 400, 60, { anchor: 'tc', w: 500, fixed: true })], { of: EG, blur: 3 });
ep.panel(860, { cam: at(860, 300, 1000, 440, 400, 330), bg: OF(EG), blur: 3, actors: SET({ expr: { base: 'teary', tearDrop: true, mouth: { type: 'line', curve: -0.2, w: 0.7 } } }, {}, {}) },
  [say('Dumbledore', 'that I am truly, truly sorry. For everything that has already happened, and everything that will.', 400, 805, { anchor: 'bc', w: 500, fixed: true })], { mood: 'candle', alt: 'Moisture glistens in the old wizard\'s eyes.' });
hS(640, 440, 580, 440, { expr: 'angry' },
  [say('Harry', 'And I\'m very angry! So angry that I want to leave right now, unless you\'ve got anything else to say!', 300, 60, { anchor: 'tc', w: 440, fixed: true })], { of: EG });
dbS(900, 500, 680, { expr: { base: 'calm', eyes: { sparkle: true } }, pose: 'lecture' },
  [say('Dumbledore', 'One last thing, then. You are *not* to attempt the forbidden door on the third-floor corridor. I doubt you could so much as open the first door, since it\'s locked, and you don\'t know the spell *Alohomora…*', 400, 60, { anchor: 'tc', w: 520, fixed: true })], { of: EG });
// he flees
ep.bleed(860, { cam: at(860, 720, 820, 640, 400, 520, true), bg: GC({ open: true }), actors: [stairDoor, { def: harryRaven, id: 'harry', x: 700, y: 960, s: 1.1, turn: -0.8, pose: 'run', expr: 'horror' }], behind: (e) => FX.speedLines(e.w, e.h, { n: 40 }), over: (e) => FX.emanata(e.toPanel(e.wa.harry.head)[0] + 90, e.toPanel(e.wa.harry.head)[1] + 60, 120, { n: 5, a0: -40, a1: 40 }) },
  [cap('Harry spun around and bolted for the exit at top speed. The doorknob turned agreeably. He raced down the spiral stairs even as they turned, and fired out of the stairwell like a cannonball…', 44, 50, { w: 620, fixed: true })], { alt: 'Harry shoots out of the stairwell at full speed.' });
// McGonagall
const papers = () => [[-190, 20, -40], [-40, -70, 20], [120, 10, 50], [260, -40, -20], [40, 60, 80], [330, 50, 10]].map(([dx, dy, r]) => g({ transform: `translate(${1070 + dx},${940 + dy}) rotate(${r})` }, rect(-40, -28, 80, 56, { fill: '#efe3c4', stroke: C.ink, 'stroke-width': 2 }), line(-28, -12, 24, -12, { stroke: '#8a7a6a', 'stroke-width': 2 }), line(-28, 0, 20, 0, { stroke: '#8a7a6a', 'stroke-width': 2 }))).join('');
const MGF = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 1250, y: 1000, turn: -0.3, pose: 'fallBack', expr: 'shock', ...o });
const HGF = (o = {}) => ({ def: harryRaven, id: 'harry', x: 900, y: 1010, s: 1.1, turn: 0.3, pose: 'fallBack', expr: 'horror', ...o });
ep.bleed(820, { cam: at(820, 900, 1080, 700, 400, 470, true), bg: GC({ open: true }), actors: [MGF(), HGF(), papers], behind: (e) => { const c = e.toPanel([1080, 800]); return FX.burst(e.w, e.h, c[0], c[1], { n: 26, op: 0.2 }); } },
  [cap('…directly into Minerva McGonagall, as she was turning the corner on her way to the Headmaster\'s office.', 44, 50, { w: 620, fixed: true })], { alt: 'Harry and Professor McGonagall collide and go down; her parchments scatter everywhere.' });
ep.panel(920, { cam: at(920, 760, 1080, 780, 400, 630), bg: GC({ open: true }), actors: [papers, MGF({ pose: 'sitFloor', expr: 'yell' }), HGF({ pose: 'sitFloor', expr: 'horror' })] },
  [shout('McGonagall', 'Harry Potter! *What were you doing in the Headmaster\'s office?*', 440, 96, { anchor: 'tc', w: 380, fixed: true }),
   say('Harry', 'Nothing!', 130, 440, { w: 160, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: at(760, 420, 1290, 752, 400, 565), bg: GC({ open: true }), blur: 2, actors: [MGF({ pose: 'sitFloor', expr: { base: 'yell', brows: { raise: -0.6, inner: -0.8 } } })] },
  [shout('McGonagall', '*Were you talking about the Defence Professor?*', 400, 84, { anchor: 'tc', w: 380, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: at(760, 420, 872, 819, 440, 520), bg: GC({ open: true }), blur: 2, actors: [HGF({ pose: 'sitFloor', expr: 'pleading' })] },
  [say('Harry', 'No! Dumbledore called me up there and gave me this big rock, and said it was my father\'s, and I should carry it everywhere!', 400, 50, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
const MG = (o = {}) => ({ def: mcgonagall, id: 'mcgonagall', x: 1200, y: 960, turn: -0.3, pose: 'stand', expr: 'calm', ...o });
const HM = (o = {}) => ({ def: harryRaven, id: 'harry', x: 880, y: 980, s: 1.1, turn: 0.3, pose: 'stand', expr: 'worried', ...o });
ep.panel(900, { cam: at(900, 640, 1040, 640, 400, 560), bg: GC({}), actors: [MG({ expr: 'worried' }), HM({ expr: 'sad' })] },
  [cap('There was another terrible pause.', 44, 30, { w: 420, fixed: true }),
   say('McGonagall', 'I see. My sympathies, Mr Potter. And I apologise for doubting you.', 400, 110, { anchor: 'tc', w: 440, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: at(760, 420, 882, 694, 520, 560), bg: GC({}), blur: 2, actors: [HM({ expr: { base: 'teary', eyes: { lookY: -0.6, lookX: 0.4 } } })] },
  [say('Harry', 'Professor McGonagall… do you think I should? Carry my father\'s rock everywhere?', 400, 50, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle', alt: 'He looks up at her trustworthy, sane face.' });
ep.panel(820, { cam: at(820, 440, 1202, 503, 400, 580), bg: GC({}), blur: 2, actors: [MG({ expr: 'stern', turn: -0.2 })] },
  [say('McGonagall', 'That is between you and the Headmaster, I\'m afraid. I will say that ignoring him completely is almost never wise.', 400, 50, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
ep.panel(780, { cam: at(780, 440, 882, 694, 520, 560), bg: GC({}), blur: 2, actors: [HM({ expr: 'hopeful', pose: 'gesture' })] },
  [say('Harry', 'I was thinking that once I know how, I could Transfigure the rock into a ring, and wear it on my finger…', 400, 50, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
ep.panel(1080, { cam: at(1080, 380, 1202, 503, 450, 790), bg: GC({}), actors: [MG({ expr: { base: 'stern', eyes: { lookX: -0.4 } }, pose: 'lecture', turn: -0.2 }), (e) => { const h = e.wa.mcgonagall.handB; return K.glow(h[0], h[1] - 40, 70, '#f7dc8c', 0.5) + g({ transform: `translate(${h[0]},${h[1] - 44}) scale(1.4)` }, P2.ring(1)); }] },
  [say('McGonagall', 'It is good that you asked me first. If you lost control, the reversal would cut off your finger. But I can have a ring forged for you, with a setting for a *small* jewel. Keep a safe Transfiguration going for a full month, even in your sleep, and I will allow you to Transfigure, ah, your father\'s rock…', 400, 80, { anchor: 'tc', w: 560, shape: 'box', fixed: true })], { mood: 'candle' });
ep.panel(640, { cam: at(640, 380, 1202, 503, 400, 420), bg: GC({}), blur: 3, actors: [MG({ expr: 'confused', turn: -0.1 })] },
  [say('McGonagall', 'Did the Headmaster *really…*', 400, 40, { anchor: 'tc', w: 400, fixed: true })], { mood: 'candle' });
ep.panel(820, { cam: at(820, 800, 1060, 600, 400, 520), bg: GC({ open: true }), actors: [stairDoor, MG({ x: 1080, expr: { base: 'stern', eyes: { soft: true } }, turn: -0.4 }), HM({ x: 760, expr: 'worried' })] },
  [say('McGonagall', 'That\'s a bit strange even for him. I\'m sorry about this, Mr Potter. But now it\'s my own turn to see the Headmaster.', 400, 40, { anchor: 'tc', w: 500, fixed: true })], { mood: 'candle' });
ep.panel(1030, { cam: at(1030, 900, 960, 520, 400, 560), bg: GC({ open: true }), actors: [stairDoor, MG({ x: 1000, y: 260, turn: 0.1 }), HM({ x: 640, turn: 0.4, pose: 'point', expr: 'yell', armB: { sh: 110, el: 0, hand: 'point' } })] },
  [cap('Professor McGonagall stepped onto the revolving stairs and began to rise out of sight. The gargoyle started back…', 44, 30, { w: 620, fixed: true }),
   shout('Harry', '*Professor McGonagall, the Headmaster set fire to a chicken!*', 345, 400, { anchor: 'tc', w: 380, fixed: true })], { mood: 'candle', alt: 'McGonagall rising up the turning stair; Harry points and yells after her.' });
ep.panel(620, { cam: at(620, 700, 1000, 560, 400, 400), bg: GC({}), over: (e) => { const c = e.toPanel([1000, 700]); return FX.emanata(c[0] - 190, c[1] - 10, 60, { n: 3, a0: 160, a1: 200 }) + FX.emanata(c[0] + 190, c[1] - 10, 60, { n: 3, a0: -20, a1: 20 }); } },
  [say('McGonagall', 'He *wha—*', 400, 40, { anchor: 'tc', w: 220, fixed: true, tail: [400, 200] })], { mood: 'candle', alt: 'The gargoyle thuds back into place, cutting her off.' });
ep.end();
export default ep;
