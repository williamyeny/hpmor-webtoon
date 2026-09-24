// EPISODE 13 — The Game  (source: HPMOR ch. 12, the notices Book One skipped; ch. 13, first half)
// Book Two opens. Sunday night: Dumbledore knows things. Monday morning: a note in Harry's own handwriting.
import { Episode, say, shout, whisper, inner, cold, cap, title, sfx, M } from '../engine/core/dsl.js';
import { place } from '../engine/chars/rig.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text, rng } from '../engine/core/svg.js';
import * as HG from '../engine/bg/hogwarts.js';
import * as CS from '../engine/bg/castle.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { dumbledore, student, youngHarry } from '../engine/chars/cast.js';
import { harryRaven, harryPJ, hermioneRaven, terry, anthony, michael, padma, nevilleHuff, ernie, derrick, slyTeen, conscience, oldLady, flubberwalt } from '../engine/chars/cast2.js';
import { comedCan, pouch } from '../engine/props/props.js';
import * as P2 from '../engine/props/props2.js';
import { dayBeat, header, note, RT } from './b2.js';

const ep = new Episode({ id: 'ep13', number: 13, title: 'The Game' });
ep.setBg(C.paper);
header(ep, 'THIRTEEN', 'The Game');

// ---------------------------------------------------------------- Sunday night: the notices
dayBeat(ep, 'Sunday.', 'If you wanted to be specific, 9:48 on Sunday night.');
const STAFF = () => HG.dais();
const DUMB = (o = {}) => ({ def: dumbledore, id: 'dumbledore', x: 600, y: 900, turn: 0.15, pose: 'stand', expr: 'smile', ...o });
const LECTERN = () => path('M560,900 L640,900 L620,640 L580,640Z', { fill: '#6b4429', ...K.bl(2) }) + path('M520,650 L680,650 L650,596 L550,596Z', { fill: '#8a5d38', ...K.bl(2) });
const TABLE = (o = {}) => [
  { def: student(1241, 'r'), id: 'r1', x: 300, y: 1050, s: 1.05, turn: 0.4, expr: 'smile' },
  { def: hermioneRaven, id: 'hermione', x: 560, y: 1050, s: 1.1, turn: 0.3, expr: 'smile', ...(o.he || {}) },
  { def: harryRaven, id: 'harry', x: 800, y: 1050, s: 1.1, turn: -0.1, expr: 'neutral', ...(o.h || {}) },
  { def: terry, id: 'terry', x: 1040, y: 1050, s: 1.05, turn: -0.4, expr: 'neutral', ...(o.t || {}) },
  { def: padma, id: 'padma', x: 1290, y: 1050, s: 1.05, turn: -0.4, expr: 'neutral', ...(o.p || {}) },
  () => HG.tableFront(),
];

// the way in: the reader stands in the Great Hall's doorway, looking up the tables to the staff
ep.panel(1060, { cam: { x: 800, y: 520, w: 1240 }, bg: () => HG.greatHallWide() },
  [cap('The feast was over. The Sorting was over. The new Defence Professor had said his few words, and gone back to looking as though he might faint.', 44, 26, { w: 620, fixed: true }),
   say('Dumbledore', 'Just a few more notices!', 515, 440, { w: 280, fixed: true, tail: [412, 572] })],
  { shape: 'gothic', frame: 'stone', spring: 0.4, x: 70, w: 660, y: 190, ph: 850, alt: 'The Great Hall at night: four long tables under the starry ceiling and floating candles; at the far end, Dumbledore rises at the podium.' });
ep.panel(820, { cam: { on: ['dumbledore'], fr: 'waist', dy: -0.45, dx: 0.9, zoom: 0.8 }, bg: STAFF, actors: [DUMB({ pose: 'present', expr: { base: 'smile', eyes: { sparkle: true } } }), LECTERN] },
  [say('Dumbledore', 'First-years should note that the forest on the grounds is forbidden to all pupils. That is why it is called the Forbidden Forest.', 400, 40, { anchor: 'tc',  w: 520, fixed: true }),
   say('Dumbledore', 'If it were permitted, it would be called the Permitted Forest.', 572, 560, { w: 300, fixed: true })], { mood: 'candle' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: RT, blur: 3, actors: TABLE({ h: { expr: 'deadpan' } }) },
  [inner('Harry', '*Note to self: the Forbidden Forest is forbidden.*', 400, 64, { anchor: 'tc',  w: 520, fixed: true })], { mood: 'candle' });

// the urge
ep.panel(620, { cam: { x: 800, y: 830, w: 440 }, bg: RT, blur: 2, actors: TABLE({ h: { pose: 'stand', turn: 0.15, expr: { base: 'neutral', eyes: { lookX: 0.4, lookY: 0.4 } }, armF: { sh: 15, el: 75, hr: 88, hand: 'hold', prop: g({ transform: 'translate(0,24)' }, comedCan(1.6)) } } }) },
  [cap('And for no reason at all, Harry felt a sudden, strong urge to drink a can of Comed-Tea.', 44, 480, { w: 620, fixed: true })], { mood: 'candle', alt: 'Under the table, Harry\'s hand has drifted to his pouch and come up holding a green can.' });
ep.panel(900, { cam: { on: ['harry'], fr: 'bust', dy: 0.05, zoom: 0.85 }, bg: RT, blur: 3, actors: TABLE({ h: { expr: { base: 'suspicious', eyes: { lookX: 0.3, lookY: 0.35 } }, pose: 'stand', turn: 0.15, armF: { sh: 15, el: 80, hr: 93, hand: 'hold', prop: g({ transform: 'translate(0,24)' }, comedCan(1.6)) } } }) },
  [inner('Harry', '*Hey. I bet you\'re the same part of my brain that pushed through the prank on Neville Longbottom.*', 400, 40, { anchor: 'tc',  w: 620, fixed: true }),
   inner('Harry', '*Er. Maybe?*', 600, 600, { w: 200, fixed: true }),
   inner('Harry', '*And is it not overwhelmingly obvious that if I do this, I shall regret it one second after it is too late?*', 400, 808, { w: 580, fixed: true })], { mood: 'candle' });
ep.panel(480, { cam: { on: ['harry'], fr: 'close', dx: 0.6 }, bg: RT, blur: 3, actors: TABLE({ h: { expr: 'determined' } }) },
  [inner('Harry', '*Yeah. So, no.*', 560, 240, { w: 260, fixed: true })], { mood: 'candle', alt: 'He puts the can away, very firmly.' });

// the Quidditch line
ep.panel(760, { cam: { on: ['dumbledore'], fr: 'waist', dy: -0.5 }, bg: STAFF, actors: [DUMB({ pose: 'relaxed' }), LECTERN] },
  [say('Dumbledore', 'Quidditch trials will be held in the second week of term. Anyone interested in playing for their House teams should contact Madam Hooch.', 400, 64, { anchor: 'tc',  w: 540, fixed: true })], { mood: 'candle' });
ep.panel(640, { cam: { on: ['dumbledore'], fr: 'close', dy: 0.1 }, bg: STAFF, blur: 3, actors: [DUMB({ turn: 0.02, expr: { base: 'warm', eyes: { sparkle: true } } }), LECTERN] },
  [say('Dumbledore', 'And anyone interested in reformulating the *entire game* of Quidditch should contact Harry Potter.', 400, 64, { anchor: 'tc',  w: 560, fixed: true })], { mood: 'candle' });
ep.panel(820, { cam: { on: ['harry'], fr: 'bust', zoom: 0.62, dy: 0.2 }, bg: RT, actors: TABLE({ h: { expr: 'yell', pose: 'panic' }, he: { expr: 'shock', turn: 0.5 }, t: { expr: 'shock', turn: -0.6 }, p: { expr: 'gasp' } }), behind: (e) => { const a = e.anchors.harry; return a ? FX.burst(e.w, e.h, a.mouth[0], a.mouth[1], { n: 26, col: '#f8f0dc', op: 0.35 }) : ''; }, over: (e) => { const a = e.anchors.harry; return a ? g({ transform: `translate(${a.mouth[0] + 20},${a.mouth[1] + 4})` }, P2.splat(0.25, 'cherry', 4).replace(/#b81f2e/g, '#e8f0f4').replace(/#e8b86a/g, '#ffffff')) : ''; } },
  [sfx('KHHK!', 250, 170, { size: 90, rot: -8 }),
   cap('Harry inhaled his own saliva.', 290, 700, { w: 480, fixed: true })], { shape: 'jag', jag: 16, seed: 5, mood: 'candle', alt: 'Harry chokes on nothing at all, spraying, as every head at the Ravenclaw table turns to stare.' });
ep.panel(700, { cam: { on: ['harry'], fr: 'close', dy: -0.05 }, bg: RT, blur: 3, actors: TABLE({ h: { expr: { base: 'horror', mouth: { type: 'o' } } } }) },
  [inner('Harry', '*How* on *Earth?* He hadn\'t met Dumbledore\'s eyes at any point. He hadn\'t been *thinking* about Quidditch. He hadn\'t told anyone but Ron Weasley…', 400, 64, { anchor: 'tc',  w: 600, fixed: true })], { mood: 'candle' });
ep.panel(600, { cam: { on: ['dumbledore'], fr: 'eyes', zoom: 1.2 }, bg: STAFF, blur: 3, actors: [DUMB({ turn: 0, expr: { base: 'warm', eyes: { sparkle: true, lookX: 0.3 } } })], over: (e) => { const a = e.anchors.dumbledore; return a ? FX.sparkles([[a.head[0] + a.hr * 0.3, a.head[1] - a.hr * 0.1]], { r: 22 }) : ''; } },
  [cap('Dumbledore was looking straight at him.', 44, 20, { w: 560, fixed: true })], { shape: 'eye', y: 100, ph: 480, mood: 'candle', alt: 'Dumbledore\'s eyes over his half-moon spectacles, twinkling, fixed on Harry.' });

ep.panel(780, { cam: { on: ['dumbledore'], fr: 'waist', dy: -0.45 }, bg: STAFF, actors: [DUMB({ pose: 'relaxed', expr: 'calm' }), LECTERN] },
  [say('Dumbledore', 'Additionally, this year, the third-floor corridor on the right-hand side is out of bounds to everyone who does not wish to die a very painful death.', 400, 64, { anchor: 'tc',  w: 560, fixed: true })], { mood: 'candle' });
ep.panel(480, { cam: { on: ['harry'], fr: 'close' }, bg: RT, blur: 3, actors: TABLE({ h: { expr: 'blank' } }) },
  [cap('Harry was numb at this point.', 44, 30, { w: 400, fixed: true })], { mood: 'candle' });
// the Defence Professor notice (ch. 12): McGonagall cites it in Ep 18
ep.panel(1000, { cam: { on: ['dumbledore'], fr: 'waist', dy: -0.9 }, bg: STAFF, actors: [DUMB({ pose: 'gesture', expr: { base: 'calm', eyes: { lookX: 0.3 } } }), LECTERN] },
  [say('Dumbledore', 'I hope all students will extend Professor Quirrell the utmost courtesy and *tolerance* due his extraordinary service to this school, and that you *will not pester us* with any *niggling complaints* about him, unless *you* want to try doing his job.', 400, 70, { anchor: 'tc', w: 540, fixed: true })], { mood: 'candle', alt: 'Dumbledore\'s gaze moves searchingly across the students.' });
ep.panel(420, { cam: { on: ['harry'], fr: 'close' }, bg: RT, blur: 3, actors: TABLE({ h: { expr: 'suspicious' } }) },
  [inner('Harry', '*What was* that *about?*', 400, 40, { anchor: 'tc', w: 360, fixed: true })], { mood: 'candle' });
ep.panel(960, { cam: { on: ['dumbledore'], fr: 'waist', dy: -1.05, zoom: 0.85 }, bg: STAFF, actors: [DUMB({ pose: 'armsUp', expr: 'laugh' }), LECTERN] },
  [shout('Dumbledore', 'And now, before we go to bed, let us sing the school song! Everyone pick their favourite tune and favourite words, and off we go!', 400, 130, { anchor: 'tc',  w: 430, fixed: true })], { mood: 'candle' });
// the school song: every tune at once
ep.bleed(1000, { cam: { x: 800, y: 560, w: 1500 }, bg: () => HG.greatHallWide(), over: (e) => {
    const R = rng(13); let o = '';
    const bits = ['♪ Hogwarts, Hogwarts ♪', '♫ Hoggy Warty Hogwarts ♫', '♪ teach us something please ♪', '♫ whether we be old and bald ♫', '♪ or young with scabby knees ♪', '♫ HOGWARTS ♫', '♪ …dead flies and bits of fluff ♪', '♫ Hoggy WARTY ♫'];
    const fonts = ['Grenze Gotisch', 'Caveat', 'IM Fell English', 'Pinyon Script', 'Alegreya SC'];
    for (let i = 0; i < 14; i++) { const x = e.w / 2 + (i % 2 ? 1 : -1) * R.range(40, 150), y = 90 + i * (e.h - 150) / 13; o += text(x, y, bits[i % bits.length], { 'font-family': fonts[i % fonts.length], 'font-size': R.range(28, 40), 'text-anchor': 'middle', fill: R.pick(['#f6e7c4', '#ffd774', '#dcebf5', '#f1c0c8']), transform: `rotate(${R.range(-8, 8)} ${x} ${y})`, opacity: 0.95, stroke: '#2a1b14', 'stroke-width': 3, 'paint-order': 'stroke' }); }
    return o; } },
  [], { alt: 'The whole Hall sings the school song, every student to a different tune; words in every style fly through the air.' });
// his send-off (ch. 12's banquet opener): Harry borrows it in Ep 18
// the send-off steps out of the comic: Dumbledore alone on the page, arms up
ep.cutout(1180, { cam: { on: ['dumbledore'], fr: 'full', zoom: 0.74, dy: -0.75 }, actors: [DUMB({ pose: 'armsUp', expr: 'bigGrin' })] },
  [shout('Dumbledore', 'Happy happy boom boom swamp swamp swamp! Thank you, and good night!', 400, 76, { anchor: 'tc', w: 460, fixed: true })], { alt: 'Dumbledore, arms flung up, beaming, standing on the bare page.' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: RT, blur: 3, actors: TABLE({ h: { expr: 'exasperated' } }) },
  [inner('Harry', '*Note to self: do not mess with Dumbledore.*', 400, 64, { anchor: 'tc',  w: 540, fixed: true })], { mood: 'candle' });

// ---------------------------------------------------------------- the dorm, 1 a.m.
const DORM = (o = {}) => () => CS.ravenclawDorm(o);
const BOYS = (o = {}) => [
  { def: terry, id: 'terry', x: 690, y: 960, s: 1.05, turn: 0.4, pose: 'gesture', expr: 'rant' },
  { def: anthony, id: 'anthony', x: 880, y: 960, s: 1.05, turn: -0.4, pose: 'point', expr: 'yell' },
  { def: michael, id: 'michael', x: 1420, y: 960, s: 1.05, turn: -0.3, pose: 'crossArms', expr: 'smug' },
  { def: student(1331, 'r'), id: 'r3', x: 1610, y: 960, s: 1.05, turn: -0.4, pose: 'lecture', expr: 'rant' },
];
ep.panel(820, { cam: { x: 1150, y: 640, w: 1120 }, bg: DORM({ time: 'night' }), actors: [...BOYS(), { def: harryPJ, id: 'harry', x: 1100, y: 900, s: 1.1, turn: 0.1, pose: 'sit', seat: 250, expr: 'unimpressed' }], fg: () => CS.dormBlanket({ lift: 30 }) },
  [say('Anthony', 'It is NOT a theory if you can\'t test it!', 300, 50, { anchor: 'tc',  w: 300, fixed: true }),
   say('Michael', 'Name one test!', 610, 250, { w: 200, fixed: true }),
   cap('There was a Quietus Charm on every headboard, with a little slider. It was the only reason it was ever possible for anyone to get to sleep in Ravenclaw.', 44, 660, { w: 620, fixed: true })],
  { mood: 'candle', alt: 'The Ravenclaw first-years\' dorm at night: five four-poster beds in blue and bronze. Boys argue in their pyjamas. Harry sits up in bed in the middle.' });
ep.panel(620, { cam: { x: 1180, y: 520, w: 560 }, bg: DORM({ time: 'night', quiet: 0.95 }), actors: [{ def: harryPJ, id: 'harry', x: 1060, y: 850, s: 1.1, turn: 0.4, pose: 'stand', expr: 'calm', armB: { sh: 118, el: 5, hand: 'point' } }] },
  [cap('*Click.*', 560, 40, { w: 140, fixed: true }), cap('Silence.', 44, 520, { w: 180, fixed: true })], { mood: 'candle', alt: 'Harry slides the brass slider on his headboard all the way up. The noise stops.' });
ep.panel(760, { cam: { x: 1330, y: 700, w: 420 }, bg: DORM({ time: 'night', quiet: 0.95, clock: [1, 2] }) },
  [cap('Harry had tried to shift his twenty-six-hour day to fit Hogwarts. It was two minutes past one in the morning.', 44, 30, { w: 620, fixed: true }),
   cap('He set the alarm for seven. He\'d have to ask Professor McGonagall about his sleep. Tomorrow.', 280, 560, { w: 400, fixed: true })], { mood: 'candle', alt: 'The alarm clock on the nightstand: one o\'clock, and the alarm hand set to seven.' });
ep.panel(520, { cam: { on: ['harry'], fr: 'close' }, bg: DORM({ time: 'night', quiet: 0.95 }), actors: [{ def: { ...harryPJ, glasses: null }, id: 'harry', x: 1100, y: 900, s: 1.1, turn: 0.1, pose: 'sit', seat: 250, expr: 'asleep' }] },
  [], { mood: 'night', frame: 'dissolve', feather: 70, overlay: () => rect(0, 0, 800, 600, { fill: '#050814', opacity: 0.45 }), alt: 'Harry asleep. The candle out; the picture fades into the page.' });

// ---------------------------------------------------------------- Monday
ep.setBg('#f4ecd8');
dayBeat(ep, 'Monday.', 'If you wanted to be specific, 9:52 on Monday morning.');
const MORN = (o = {}) => DORM({ time: 'late', empty: true, quiet: 1, ...o });
const HPJ = (o = {}) => ({ def: harryPJ, id: 'harry', x: 1100, y: 900, s: 1.1, turn: 0.1, pose: 'sit', seat: 250, expr: 'neutral', ...o });
ep.panel(480, { cam: { on: ['harry'], fr: 'eyes' }, bg: MORN(), blur: 3, actors: [HPJ({ expr: { base: 'neutral', eyes: { open: 0.3 }, mouth: { type: 'line', curve: 0, w: 0.5 } } })] },
  [cap('It was quiet.', 44, 30, { w: 260, fixed: true })], { mood: 'warm', alt: 'Harry\'s eyes, just opening.' });
ep.panel(480, { cam: { on: ['harry'], fr: 'eyes' }, bg: MORN(), blur: 3, actors: [HPJ({ expr: 'suspicious' })] },
  [cap('*Too* quiet.', 496, 30, { w: 220, fixed: true })], { mood: 'warm' });
// five small panels
ep.multi(1180, [
  { x: M, y: 18, w: 752, h: 360, mood: 'warm', art: { cam: { x: 1100, y: 420, w: 2400 }, bg: MORN() } },
  { x: M, y: 396, w: 368, h: 360, mood: 'warm', art: { cam: { x: 560, y: 660, w: 480 }, bg: MORN() } },
  { x: 408, y: 396, w: 368, h: 360, mood: 'warm', art: { cam: { x: 1180, y: 20, w: 560 }, bg: MORN() } },
  { x: M, y: 774, w: 368, h: 388, mood: 'warm', art: { cam: { x: 1201, y: 530, w: 260 }, bg: MORN() } },
  { x: 408, y: 830, w: 368, h: 332, shape: 'oval', mood: 'warm', art: { cam: { x: 1348, y: 690, w: 190 }, bg: MORN({ clock: [9, 52] }) } },
], [cap('The dorm: empty.', 44, 34, { w: 240, fixed: true }), cap('The beds: unmade.', 44, 412, { w: 250, fixed: true }), cap('The sun: rather high.', 426, 412, { w: 290, fixed: true }),
  cap('His Quieter: turned all the way up.', 40, 790, { w: 220, fixed: true }), cap('His alarm: switched off.', 424, 790, { w: 270, fixed: true })],
  { alt: 'Five views: the empty dorm; rumpled beds; sunlight slanting in high; the Quieter slider at maximum; the alarm clock at 9:52.' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust', dy: -0.3 }, bg: MORN(), blur: 2, actors: [HPJ({ expr: 'shock', pose: 'sit' })] },
  [cap('He\'d missed breakfast. And his very first class at Hogwarts, Herbology, had started one hour and twenty-two minutes ago.', 44, 30, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['harry'], fr: 'close', dy: -0.05 }, bg: MORN(), blur: 3, actors: [HPJ({ expr: 'cold' })], over: (e) => FX.frost(e.w, e.h, 0.3, 21) },
  [cold('Harry', 'Oh, what a nice little prank. Turn off his alarm. Turn up the Quieter. Let Mr Bigshot Harry Potter miss his first class.', 400, 44, { anchor: 'tc',  w: 560, fixed: true }),
   inner('Harry', '*When Harry found out who\'d done this…*', 400, 700, { w: 460, fixed: true })], { mood: 'cold', alt: 'Frost creeps in at the edges as Harry\'s face goes flat and cold.' });
ep.panel(900, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: MORN(), blur: 2, actors: [HPJ({ expr: 'hurt' })] },
  [inner('Harry', '*No. This could only have been done by all twelve of the other boys. All of them would have seen him asleep. All of them had let him sleep through breakfast.*', 400, 40, { anchor: 'tc',  w: 610, fixed: true }),
   inner('Harry', '*They\'d* liked *him. He\'d thought.*', 340, 836, { w: 360, fixed: true })], { mood: 'warm', alt: 'The anger drains out of him, leaving a wounded look.' });

// the note on the headboard
ep.panel(1000, { cam: { x: 1070, y: 520, w: 380 }, bg: MORN({ harryNote: true }) },
  [note('My fellow Ravenclaws,\n\nIt\'s been an extra long day. Please let me sleep in and don\'t worry about my missing breakfast. **I haven\'t forgotten** about my first class.\n\nHarry Potter', 400, 480, { kind: 'hand', w: 600, rot: -2 })],
  { mood: 'warm', alt: 'A note pinned to his headboard, in pencil.' });
ep.panel(820, { cam: { on: ['harry'], fr: 'close', dy: 0.15 }, bg: MORN(), blur: 3, actors: [HPJ({ expr: { base: 'horror', mouth: { type: 'o' } } })], over: (e) => FX.frost(e.w, e.h, 0.45, 23) },
  [cap('It was in his own handwriting. In his own mechanical pencil.', 44, 30, { w: 360, fixed: true }),
   cap('And he didn\'t remember writing it.', 440, 680, { w: 270, fixed: true })], { mood: 'cold', alt: 'Ice water in his veins.' });
ep.panel(880, { cam: { on: ['harry'], fr: 'bust', dy: -0.25 }, bg: MORN(), blur: 2, actors: [HPJ({ expr: 'think', pose: 'think', turn: 0.25 })] },
  [inner('Harry', '*Had he been Obliviated? Had he stayed up late, done something, and then… but he didn\'t* know *the spell… had someone else…*', 400, 64, { anchor: 'tc',  w: 580, fixed: true }),
   inner('Harry', '*Wait. If he* had *known he was going to be Obliviated…*', 400, 760, { w: 380, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['harry'], fr: 'waist', dy: -0.2 }, bg: MORN(), actors: [{ def: harryPJ, id: 'harry', x: 1100, y: 1010, s: 1.1, turn: 0.3, pose: 'crouch', expr: 'determined', armF: { sh: 20, el: 50, hand: 'open' }, armB: { sh: 60, el: 40, hand: 'hold', prop: g({ transform: 'translate(0,20)' }, pouch(0.8)) } }], fg: () => CS.trunkBox(1250, 1030, 1.1, '#7a4e2e') },
  [say('Harry', 'Note to myself.', 250, 64, { anchor: 'tc',  w: 260, fixed: true })], { mood: 'warm', alt: 'Still in his pyjamas, Harry has thumbed open his trunk and has his hand in the mokeskin pouch.' });
ep.panel(700, { cam: { x: 400, y: 350, w: 800 }, bg: () => rect(-100, -100, 1000, 1200, { fill: '#6b5540' }) + K.floorboards(-100, -100, 1000, 1200, '#7a6048', 9) },
  [note('Dear Me,\n\nPlease play the game. You can only play the game once in a lifetime. This is an unrepeatable opportunity.\n\nRecognition code 927, I am a potato.\n\nYou.', 400, 350, { kind: 'hand', w: 560, rot: 1.5 })],
  { mood: 'warm', alt: 'The note from the pouch, in his own handwriting.' });
ep.panel(900, { cam: { x: 1160, y: 730, w: 640 }, bg: () => rect(-500, -500, 3000, 2000, { fill: '#b9a27a' }) + rect(-500, 1000, 3000, 600, { fill: '#6e5536' }) + path('M-500,1000 L2500,1000', { stroke: C.ink, 'stroke-width': 3 }) + ellipse(1020, 1040, 230, 40, { fill: '#7a4e3a', opacity: 0.7 }) + g({ transform: 'translate(1350,640)' }, rect(-160, -130, 320, 250, { fill: '#3a3a3a', stroke: C.ink, 'stroke-width': 4, rx: 30 }), rect(-130, -104, 260, 196, { fill: '#9bc4e8', rx: 20 }), rect(-40, 120, 80, 250, { fill: '#6b4429', stroke: C.ink, 'stroke-width': 3 })), actors: [{ def: youngHarry, id: 'kid', x: 1000, y: 1000, s: 1.1, turn: 0.5, pose: 'sitFloor', expr: 'focus', armF: { sh: 55, el: 70, hand: 'hold', prop: g({ transform: 'rotate(40)' }, rect(-3, -34, 6, 60, { fill: '#e7bb4f', stroke: C.ink, 'stroke-width': 1.4 })) } }], over: (e) => FX.memoryEdge(e.w, e.h) },
  [cap('"Recognition code 927, I am a potato" was a message he\'d worked out years ago, in front of the television, that only he would ever know. In case he ever had to identify a duplicate of himself. Just in case.', 44, 30, { w: 620, fixed: true }),
   cap('*Be Prepared.*', 516, 620, { w: 200, fixed: true })], { mood: 'sepia', frame: 'dissolve', feather: 60, alt: 'Memory: eight-year-old Harry on the floor in front of the television, pencil in hand, very serious.' });
// the rules of the Game, alone on the page: the note in the reader's own hands
ep.cutout(900, { cam: { x: 400, y: 450, w: 800 } },
  [note('Instructions for The Game\n\nyou do not know the rules of the game\n\nyou do not know the stakes of the game\n\nyou do not know the objective of the game\n\nyou do not know who controls the game\n\nyou do not know how to end the game\n\nYou start with 100 points.\n\n**Begin.**', 400, 450, { w: 560, rot: -1 })],
  { mood: 'warm', alt: 'On the back of the note, in perfectly regular writing: the instructions for The Game.' });
ep.panel(480, { cam: { on: ['harry'], fr: 'close' }, bg: MORN(), blur: 3, actors: [{ def: harryPJ, id: 'harry', x: 1100, y: 1010, s: 1.1, turn: 0.1, pose: 'crouch', expr: 'blank' }] },
  [cap('He had *absolutely no clue* what was going on.', 44, 30, { w: 580, fixed: true })], { mood: 'warm' });

// the notes
const HC = (o = {}) => ({ def: harryPJ, id: 'harry', x: 1100, y: 1010, s: 1.1, turn: 0.3, pose: 'stand', expr: 'neutral', ...o });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust', dy: 0.05, dx: 0.45, zoom: 0.9 }, bg: MORN(), blur: 2, actors: [HC({ expr: 'hopeful', armF: { sh: 15, el: 85, hr: 100, hand: 'hold', prop: g({ transform: 'translate(0,14)' }, pouch(0.9, { open: true })) } })] },
  [cap('Well. Step one: eat. Luckily he\'d visualised missing breakfast, and Prepared for it.', 44, 30, { w: 620, fixed: true }), say('Harry', 'Snack bars.', 600, 390, { w: 200, fixed: true })], { mood: 'warm' });
ep.panel(860, { cam: { on: ['harry'], fr: 'bust', dy: -0.05, zoom: 0.9 }, bg: MORN(), blur: 3, actors: [HC({ expr: { base: 'confused', eyes: { lookX: 0.3, lookY: 0.4 } }, pose: 'stand', armF: { sh: 15, el: 85, hr: 100, hand: 'hold', prop: g({ transform: 'translate(0,-4)' }, P2.tinyChocolate(1.1) + g({ transform: 'translate(22,10) rotate(12)' }, P2.tinyChocolate(1.1))) } })] },
  [note('Attempt failed: −1 point\nCurrent points: 99\nPhysical state: Still hungry\nMental state: Confused', 400, 130, { w: 460, rot: 2 })], { mood: 'warm', alt: 'Out of the pouch: two tiny chocolate bars, not nearly a meal, and a note.' });
ep.panel(520, { cam: { on: ['harry'], fr: 'close' }, bg: MORN(), blur: 3, actors: [HC({ expr: { base: 'blank', mouth: { type: 'o' } } })] },
  [say('Harry', 'Gleehhhhh.', 560, 64, { anchor: 'tc',  w: 200, fixed: true })], { mood: 'warm', alt: 'His mouth makes a noise without consulting him.' });
ep.panel(820, { cam: { x: 1100, y: 650, w: 740 }, bg: MORN(), actors: [HC({ turn: -0.2, expr: 'wince', pose: 'shrug' })] },
  [say('Harry', 'Ah… I don\'t suppose I could spend a point and get my box of cereal bars back?', 400, 64, { anchor: 'tc',  w: 520, fixed: true }),
   cap('There was only silence.', 44, 700, { w: 320, fixed: true })], { mood: 'warm', alt: 'Harry, in pyjamas, alone in the sunny dorm, asks the empty air.' });
ep.panel(820, { cam: { on: ['harry'], fr: 'bust', dy: 0.3, zoom: 0.9 }, bg: MORN(), blur: 3, actors: [HC({ expr: { base: 'unimpressed', eyes: { lookX: 0.4, lookY: 0.3 } }, pose: 'stand', armF: { sh: 5, el: 45, hr: 50, hand: 'hold', prop: g({ transform: 'translate(22,-8) rotate(-6)' }, P2.cerealBox(0.6, { open: true })) } })] },
  [note('Points spent: 1\nCurrent points: 98\nYou have gained: A box of Cereal Bars', 400, 120, { w: 460, rot: -2 })], { mood: 'warm', alt: 'A box of cereal bars pops up: open, and completely empty.' });
ep.panel(780, { cam: { on: ['harry'], fr: 'bust', dy: 0.2 }, bg: MORN(), blur: 2, actors: [HC({ expr: 'exasperated' })] },
  [say('Harry', 'I\'d like to spend one point and get the *actual cereal bars* back.', 400, 64, { anchor: 'tc',  w: 480, fixed: true }),
   cap('Nothing came out of the pouch. So he went to his cabinet to get dressed…', 44, 660, { w: 520, fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: { x: 1560, y: 640, w: 640 }, bg: MORN(), fg: () => g({ transform: 'translate(1560,850)' }, ...[-60, -30, 0, 30, 60, 90].map((x, i) => g({ transform: `translate(${x - 20},${(i % 2) * 8}) rotate(${i * 7 - 18})` }, P2.cerealBar(0.9)))) },
  [note('Points spent: 1\nCurrent points: 97\nYou have gained: 6 cereal bars\nYou are still wearing: Pyjamas\n\nDo not eat while you are wearing your pyjamas\n**You will get a Pyjama Penalty**', 400, 230, { w: 600, rot: 1 })], { mood: 'warm', alt: 'On the floor of the cabinet, under his robes: six cereal bars and another note.' });
ep.panel(540, { cam: { on: ['harry'], fr: 'close' }, bg: MORN(), blur: 3, actors: [HC({ expr: 'deadpan' })] },
  [inner('Harry', '*And now I know that whoever controls the game is insane.*', 400, 50, { anchor: 'tc',  w: 400, fixed: true })], { mood: 'warm' });
// the big deduction, struck like a pose on the bare page (it is wrong)
ep.cutout(960, { cam: { head: 'harry', hw: 0.3, hx: 0.67, hy: 0.37 }, actors: [HC({ pose: 'stand', expr: 'smug', turn: 0.3, armB: { sh: 115, el: 45, hand: 'point' } })] },
  [say('Harry', 'My guess is that the game is controlled by Dumbledore.', 300, 40, { anchor: 'tc',  w: 400, fixed: true }),
   cap('Maybe *this* time he could set a new land speed record for being quick on the uptake.', 26, 736, { w: 350, fixed: true })], { alt: 'Harry, in pyjamas, strikes a pose on the bare page, one finger raised.' });
ep.panel(680, { cam: { on: ['harry'], fr: 'full', dx: 0.35, zoom: 1.1 }, bg: MORN(), actors: [{ def: harryPJ, id: 'harry', x: 1100, y: 1060, s: 1.1, turn: 0.5, pose: 'crouch', expr: 'suspicious', armF: { sh: 35, el: 10, hand: 'open' }, armB: { sh: 60, el: 15, hand: 'open' } }] },
  [cap('But he was starting to see the pattern: the note would be in the next place he looked. So he looked under his bed.', 44, 30, { w: 620, fixed: true })], { mood: 'warm' });
ep.bleed(1180, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#2a1c14' }) + K.floorboards(0, 0, ctx.w, ctx.h, '#3a2a1e', 5),
  [note('**Ha! Ha ha ha ha ha!**\n**Ha ha ha ha ha ha!**\n**Ha! Ha! Ha! Ha! Ha! Ha!**\n\nDumbledore does not control the game\n\nBad guess\n\nVery bad guess\n\n−20 points\n\nAnd you are still wearing pyjamas\nit is your fourth move\nand you are still wearing pyjamas\n\nPyjama penalty: −2 points\nCurrent points: 75', 400, 590, { w: 560, rot: -1.5 })],
  { alt: 'Under the bed, a long note: laughter, "Dumbledore does not control the game", and a Pyjama Penalty.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: MORN(), blur: 3, actors: [HC({ expr: 'exasperated' })] },
  [inner('Harry', '*Welp. Once you ruled out Dumbledore, he didn\'t know the name of anyone else here who was this crazy.*', 400, 50, { anchor: 'tc',  w: 530, fixed: true })], { mood: 'warm' });

// dressed; the drawer
const HR = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1450, y: 1010, s: 1.1, turn: 0.3, pose: 'stand', expr: 'neutral', ...o });
ep.panel(860, { cam: { on: ['harry'], fr: 'waist', dy: 0.1, dx: 0.35 }, bg: MORN(), actors: [HR({ pose: 'reach', expr: 'suspicious', armB: { sh: 70, el: 10, hand: 'hold' } })] },
  [cap('Dressed at last, Harry paused before opening the drawer for his pyjamas. If the pattern held…', 44, 30, { w: 620, fixed: true }),
   say('Harry', 'How can I earn more points?', 598, 280, { w: 260, fixed: true })], { mood: 'warm' });
// looking down into the open drawer: the panel's wooden frame is the drawer itself
const BRIEFS = (x, y, w, h, col, dot, rot = 0) => g({ transform: `translate(${x},${y}) rotate(${rot})` },
  path(`M0,0 L${w},0 L${w},${h * 0.42} Q${w * 0.64},${h * 0.5} ${w * 0.6},${h} L${w * 0.4},${h} Q${w * 0.36},${h * 0.5} 0,${h * 0.42}Z`, { fill: col, ...K.bl(2.4) }),
  rect(0, 0, w, h * 0.13, { fill: '#f4f1ea', ...K.bl(2) }),
  ...[[0.2, 0.3], [0.5, 0.26], [0.8, 0.32], [0.34, 0.5], [0.66, 0.5], [0.5, 0.75]].map(([u, v]) => circle(w * u, h * v, 7, { fill: dot, opacity: 0.9 })));
const FOLD = (x, y, w, h, col, rot = 0) => g({ transform: `translate(${x},${y}) rotate(${rot})` },
  rect(0, 0, w, h, { fill: col, rx: 14, ...K.bl(2.4) }), line(10, h * 0.5, w - 10, h * 0.5, K.bl(1.4, { opacity: 0.45 })), line(0, 16, w, 16, { stroke: '#f4f1ea', 'stroke-width': 4, opacity: 0.8 }));
const DRAWER = () => rect(-100, -100, 1000, 1000, { fill: '#3e2716' }) + K.floorboards(-100, -100, 1000, 1000, '#5b3b24', 4)
  + FOLD(40, 40, 330, 190, '#8fb3d9', -3) + BRIEFS(470, 50, 250, 170, '#e9edf5', '#e0a93a', 4)
  + BRIEFS(70, 560, 260, 176, '#c9e2c4', '#d9534f', -5) + FOLD(420, 580, 340, 180, '#7fa3cb', 2)
  + g({}, circle(380, 700, 36, { fill: '#b8c6d8', ...K.bl(2) }), circle(372, 694, 16, { fill: 'none', ...K.bl(1.2, { opacity: 0.5 }) }))
  // the drawer's inner walls, seen from above
  + path('M-100,-100 L900,-100 L900,-100 L770,24 L30,24Z', { fill: '#6b4429', ...K.bl(2) }) + path('M-100,-100 L30,24 L30,760 L-100,900Z', { fill: '#5a3a22', ...K.bl(2) })
  + path('M900,-100 L770,24 L770,760 L900,900Z', { fill: '#4a2e1a', ...K.bl(2) }) + path('M-100,900 L30,760 L770,760 L900,900Z', { fill: '#7a5030', ...K.bl(2) });
ep.panel(780, { cam: { x: 400, y: 390, w: 800 }, bg: DRAWER },
  [note('Opportunities to do good are everywhere\nbut darkness is where the light needs to be\n\nCost of question: 1 point\nCurrent points: 74\n\nNice underwear\n*Did your mother pick them out?*', 400, 390, { w: 540, rot: -1.5 })], { mood: 'warm', frame: 'wood', alt: 'Looking down into the open drawer: folded pyjamas, patterned underpants, and the next note lying on top.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close' }, bg: MORN(), blur: 3, actors: [HR({ expr: { base: 'embarrassed', blush: 1 }, pose: 'fists' })] },
  [cap('Harry crushed the note, face flaming scarlet. At this point he knew better than to say anything out loud. He\'d probably get a Profanity Penalty.', 44, 30, { w: 620, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { x: 900, y: 740, w: 600 }, bg: MORN(), actors: [HR({ x: 1030, turn: -0.3, pose: 'holdOne', expr: 'think' })] },
  [cap('He threw a wrapper in the bin (on top of a half-eaten Chocolate Frog, a crumpled envelope, and some red-and-green wrapping paper), and took one last look around for clues.', 44, 30, { w: 620, fixed: true })], { mood: 'warm', alt: 'Harry by the rubbish bin. In it, some red-and-green wrapping paper and a crumpled envelope.' });
ep.panel(620, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: () => CS.corridor({ seed: 7 }), actors: [HR({ x: 900, pose: 'walk', expr: 'determined', armF: { hand: 'hold', prop: P2.cerealBar(0.7) } })] },
  [inner('Harry', '*"Darkness is where the light needs to be."* Down, then. The Slytherin dungeons.', 400, 50, { anchor: 'tc',  w: 480, fixed: true })], { mood: 'warm' });

// ---------------------------------------------------------------- lost
// the stairs lurch, and so does the panel
ep.panel(1170, { cam: { x: 800, y: 580, w: 920, roll: -7 }, bg: () => CS.staircases({ swing: [620, 640, 1.2, -14, 1], landX: 280, landW: 560 }), actors: [{ def: harryRaven, id: 'harry', x: 620, y: 900, s: 1.1, turn: 0.2, pose: 'panic', expr: 'shock' }] },
  [cap('Trying to navigate Hogwarts was like wandering around inside an Escher painting. Except that in an Escher painting, at least the stairs didn\'t move while you were still on them.', 44, 22, { w: 640, fixed: true })],
  { shape: 'slant', slant: -80, y: 226, ph: 926, alt: 'The great stairwell: flights of stairs criss-crossing in every direction; the one Harry is on swings away beneath him.' });
ep.panel(900, { cam: { x: 1170, y: 470, w: 700 }, bg: () => CS.corridor({ windows: [], torches: [700] }) + CS.archWindow(1180, 170, 240, 430, { sky: 'high' }), actors: [{ def: harryRaven, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0.5, pose: 'stand', expr: { base: 'horror', eyes: { lookX: 0.5, lookY: -0.4 }, mouth: { type: 'o' } } }] },
  [cap('After climbing down no fewer than twelve flights of stairs, Harry had concluded that he was somehow *higher* in the castle than when he\'d started.', 44, 30, { w: 620, fixed: true }),
   inner('Harry', '*If I look out of the next window and see two moons, I will not even be surprised.*', 400, 790, { w: 540, fixed: true })], { mood: 'warm', alt: 'Out of the window, the clouds are below the castle.' });

// the old lady
const LADY_WALL = () => CS.corridor({ seed: 9, portraits: [], windows: [100, 2100], torches: [600, 1500] });
const LADY_BG = (o = {}) => () => LADY_WALL() + CS.portraitCanvas(880, 110, 400, 480, { cols: ['#5a5a48', '#2a2a22'], drape: '#6b2433' });
const LADY = (o = {}) => ({ def: oldLady, id: 'lady', x: 1080, y: 930, s: 1.5, turn: -0.25, pose: 'stand', expr: 'calm', ...o });
const LADYFG = () => '';
const HOLE = CS.wallWithHole(LADY_WALL, 880, 110, 400, 480);
const HL = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1420, y: 900, s: 1.1, turn: -0.5, pose: 'stand', expr: 'neutral', ...o });
ep.panel(740, { cam: { x: 1250, y: 480, w: 900 }, bg: LADY_BG(), actors: [LADY(), HOLE, HL({ expr: 'embarrassed', pose: 'shrug' })], fg: LADYFG },
  [say('Harry', 'I\'m lost. Can, um, the spirit of the Hogwarts castle help me or something?', 575, 58, { anchor: 'tc',  w: 300, fixed: true })], { mood: 'warm', alt: 'An empty corridor; a portrait of a wizened old lady in a lace cap.' });
ep.panel(640, { cam: { on: ['lady'], fr: 'bust', dy: -0.2 }, bg: LADY_BG(), actors: [LADY({ expr: 'amused' }), HOLE], fg: LADYFG },
  [say('Lady', 'I don\'t think this castle has a spirit. Life, perhaps. But not spirit.', 400, 64, { anchor: 'tc',  w: 440, fixed: true })], { mood: 'warm' });
ep.multi(640, [
  { x: M, y: 18, w: 272, h: 604, mood: 'warm', art: { cam: { x: 1350, y: 610, w: 300 }, bg: LADY_BG(), actors: [HL({ pose: 'reach', expr: 'smile', turn: -0.6, armF: { sh: 80, el: 10, hand: 'open' } })] } },
  { x: 314, y: 18, w: 172, h: 604, mood: 'warm', art: { cam: { on: ['lady'], fr: 'close', bias: 'center', zoom: 1.5, dy: 0.3 }, bg: LADY_BG(), actors: [LADY({ expr: { base: 'suspicious', brows: { raise: 0.8 } } }), HOLE], fg: LADYFG } },
  { x: 504, y: 18, w: 272, h: 604, mood: 'warm', art: { cam: { x: 1420, y: 610, w: 300 }, bg: LADY_BG(), actors: [HL({ pose: 'stand', expr: 'embarrassed', turn: -0.6 })] } },
], [say('Harry', 'I\'m Harry Potter.', 160, 56, { anchor: 'tc',  w: 170, fixed: true, tail: null }), say('Harry', 'Sorry. I\'m sort of new here.', 640, 56, { anchor: 'tc',  w: 170, fixed: true, tail: null })],
  { alt: 'Harry holds out his hand to the painting. The painting looks at it, eyebrows raised. The hand slowly drops.' });
ep.panel(820, { cam: { x: 1230, y: 430, w: 880 }, bg: LADY_BG(), actors: [LADY({ expr: 'calm' }), HOLE, HL({ expr: 'think' })], fg: LADYFG },
  [say('Lady', 'So I perceive, young raven. Where are you trying to go?', 250, 64, { anchor: 'tc',  w: 360, fixed: true }),
   say('Harry', 'I\'m not really sure.', 560, 330, { w: 240, fixed: true }),
   say('Lady', 'Then perhaps you are already there.', 260, 650, { w: 300, fixed: true, tail: [250, 520] })], { mood: 'warm' });
ep.panel(1120, { cam: { on: ['harry'], fr: 'bust', dy: -1.3 }, bg: LADY_BG(), blur: 2, actors: [HL({ expr: 'flustered', pose: 'gesture' })] },
  [say('Harry', 'Well, wherever I *am* trying to go, I don\'t think *this* is it… Okay, third try. I\'m playing a game, I don\'t know the rules, I\'m looking for opportunities to do good so I can score points, and all I have is this cryptic hint about how darkness is where the light needs to be, so I was trying to go *down* but I keep going *up*…', 400, 96, { anchor: 'tc', w: 530, fixed: true })], { mood: 'warm' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: LADY_BG(), blur: 3, actors: [HL({ expr: 'deadpan' })] },
  [say('Harry', 'My life tends to get a bit peculiar.', 400, 64, { anchor: 'tc',  w: 400, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { x: 1230, y: 380, w: 880 }, bg: LADY_BG(), actors: [LADY({ expr: 'think' }), HOLE, HL({ expr: 'neutral' })], fg: LADYFG },
  [say('Lady', 'Would it be fair to say that you don\'t know where you\'re going, or why you\'re trying to get there?', 290, 56, { anchor: 'tc',  w: 360, fixed: true }),
   say('Harry', '*Entirely* fair.', 590, 500, { w: 220, fixed: true }),
   say('Lady', 'I\'m not sure that being lost is your most important problem, young man.', 270, 830, { w: 380, fixed: true, tail: [262, 700] })], { mood: 'warm' });
ep.panel(940, { cam: { on: ['harry'], fr: 'bust', dy: -1.0 }, bg: LADY_BG(), blur: 2, actors: [HL({ expr: 'awe', pose: 'think' })] },
  [say('Harry', 'True, but unlike the more important problems, it\'s a problem I can understand how to solve, and *wow* is this conversation turning into a metaphor for human existence, I didn\'t even realise that was happening until just now.', 400, 64, { anchor: 'tc',  w: 580, fixed: true })], { mood: 'warm' });
ep.panel(820, { cam: { on: ['lady'], fr: 'bust', dy: -0.55 }, bg: LADY_BG(), actors: [LADY({ expr: 'smile' }), HOLE], fg: LADYFG },
  [say('Lady', 'You *are* a fine young raven, aren\'t you? Well then. As a general rule, if you keep on turning left, you\'re bound to keep going down.', 400, 64, { anchor: 'tc',  w: 520, fixed: true })], { mood: 'warm' });
ep.panel(860, { cam: { x: 1230, y: 430, w: 880 }, bg: LADY_BG(), actors: [LADY({ expr: 'amused' }), HOLE, HL({ expr: 'hopeful', pose: 'gesture' })], fg: LADYFG },
  [say('Harry', 'Um… have you heard of a mysterious game where you can only play once, and they won\'t tell you the rules?', 528, 56, { anchor: 'tc',  w: 370, fixed: true }),
   say('Lady', 'Life. That\'s one of the most obvious riddles I\'ve ever heard.', 232, 650, { w: 320, fixed: true })], { mood: 'warm' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -1.2 }, bg: LADY_BG(), blur: 2, actors: [HL({ expr: 'exasperated', pose: 'gesture' })] },
  [say('Harry', 'No. I mean an *actual* note, and somebody leaving me slips of paper about how many points I\'ve lost, like a minus-two-point penalty for wearing pyjamas! Do you know anyone crazy enough and powerful enough to do that? Besides Dumbledore?', 400, 90, { anchor: 'tc', w: 530, fixed: true })], { mood: 'warm' });
ep.panel(1150, { cam: { on: ['lady'], fr: 'bust', dy: -0.4 }, bg: () => CS.portraitCanvas(840, -300, 700, 1500, { cols: ['#5a5a48', '#2a2a22'], drape: '#6b2433' }), actors: [LADY({ expr: 'warm' })] },
  [say('Lady', 'I\'m only a picture, young man. I remember Hogwarts as it was—not Hogwarts as it is.', 400, 64, { anchor: 'tc',  w: 520, fixed: true }),
   say('Lady', 'All I can tell you is that if this were a riddle, the answer would be that the game is life. And that while we do not make all the rules ourselves, the one who awards or takes points is always *you.*', 400, 930, { w: 500, fixed: true })], { mood: 'warm', frame: 'gilt', x: 34, w: 732, alt: '"I\'m only a picture": the panel is her portrait, gilt frame and all.' });
ep.panel(1150, { cam: { x: 1250, y: 520, w: 880 }, bg: LADY_BG(), actors: [LADY({ expr: 'smile', pose: 'bow', lean: -24, headTilt: -4 }), HOLE, HL({ x: 1530, expr: 'calm', pose: 'bowGrand' })], fg: LADYFG },
  [say('Harry', 'Thank you, milady.', 640, 360, { anchor: 'tc',  w: 240, fixed: true }),
   say('Lady', 'I wish I could say I\'ll remember you with fondness. But I probably won\'t remember you at all. Farewell, Harry Potter.', 238, 900, { w: 340, fixed: true, tail: [240, 690] })], { mood: 'warm', alt: 'Harry bows low to the painting; the painted lady curtseys back.' });

// Flubberwalt
const FLUB_WALL = () => CS.corridor({ seed: 11, rubble: true, windows: [2300], torches: [400, 1200] });
const FLUB_BG = () => FLUB_WALL() + CS.portraitCanvas(500, 130, 380, 460, { cols: ['#5a4a5a', '#2a2230'] });
const FHOLE = CS.wallWithHole(FLUB_WALL, 500, 130, 380, 460);
const FLUB = (o = {}) => ({ def: flubberwalt, id: 'flubberwalt', x: 690, y: 950, s: 1.5, turn: 0.3, pose: 'armsUp', expr: 'bigGrin', ...o });
const FLUBFG = () => '';
const HF = (o = {}) => ({ def: harryRaven, id: 'harry', x: 1200, y: 900, s: 1.1, turn: -0.2, pose: 'stand', expr: 'neutral', ...o });
ep.panel(800, { cam: { x: 1070, y: 450, w: 1150 }, bg: FLUB_BG, actors: [FLUB({ expr: 'neutral', pose: 'stand' }), FHOLE, HF({ x: 1240, turn: 0.4, pose: 'armsUp', expr: 'exasperated' })], fg: FLUBFG },
  [cap('Four left turns later, the corridor ended abruptly in a tumbled mound of rocks.', 44, 30, { w: 620, fixed: true }),
   say('Harry', 'All right, I give up! I\'m asking for another hint!', 560, 200, { anchor: 'tc', w: 340, fixed: true })], { mood: 'warm', alt: 'A dead-end corridor, blocked by a cave-in. On the wall, a portrait of a man in dazzling pink.' });
// the panel is his portrait (gilt); the fish is real, so it pokes out past the frame
const FLUB_CANVAS = () => CS.portraitCanvas(200, -400, 1000, 1800, { cols: ['#5a4a5a', '#2a2230'] });
ep.panel(960, { cam: { head: 'flubberwalt', hw: 0.22, hx: 0.4, hy: 0.1 }, bg: FLUB_CANVAS, actors: [FLUB()] },
  [shout('Flubberwalt', 'A hint!\nA hint, you say?', 598, 540, { w: 280, fixed: true, tail: [470, 390] }),
   cap('The portrait wore the loudest pink robes that Harry had ever seen or even imagined, and a droopy pointed hat with a fish on it. Not a drawing of a fish. A fish.', 60, 770, { w: 600, fixed: true })], { mood: 'warm', frame: 'gilt', breakout: 'top', x: 34, w: 732, y: 150, ph: 792 });
ep.panel(1200, { cam: { x: 900, y: 290, w: 900 }, bg: FLUB_BG, actors: [FLUB({ expr: 'laugh' }), FHOLE, HF({ x: 1180, expr: 'grin', pose: 'point' })], fg: FLUBFG },
  [
   say('Flubberwalt', 'You\'re Harry Potter, aren\'t you? I\'m Cornelion Flubberwalt! It was a message for *me* to give to *you!* No-one\'s cared about me in, I don\'t know how long, maybe ever! A hint! It will only cost you three points! Do you want it?', 400, 64, { anchor: 'tc', w: 560, fixed: true }),
   say('Harry', 'Yes! I want it!', 600, 730, { w: 220, fixed: true })], { mood: 'warm' });
ep.panel(1400, { cam: { on: ['flubberwalt'], fr: 'bust', dy: -0.35, zoom: 0.85 }, bg: FLUB_BG, actors: [FLUB({ pose: 'point', expr: 'yell' }), FHOLE], fg: FLUBFG },
  [shout('Flubberwalt', 'The darkness can be found between the green study rooms and McGonagall\'s Transfiguration class!', 400, 110, { anchor: 'tc', w: 400, fixed: true }),
   shout('Flubberwalt', 'And get a move on, you\'re slower than a sack of snails! Minus ten points for being slow! Now you have 61 points!', 400, 1300, { anchor: 'bc', w: 420, fixed: true })], { mood: 'warm' });
ep.panel(900, { cam: { x: 900, y: 440, w: 900 }, bg: FLUB_BG, actors: [FLUB({ expr: 'shock', pose: 'armsUp' }), FHOLE, HF({ x: 1180, expr: 'think' })], fg: FLUBFG },
  [say('Harry', 'Um… I don\'t suppose you know where the message *originally* came from?', 578, 56, { anchor: 'tc',  w: 290, fixed: true }),
   say('Flubberwalt', 'It was spoken by a hollow voice that belled forth from a gap within the air itself, a gap that opened upon a fiery abyss! That\'s what they told me!', 300, 560, { w: 460, fixed: true })], { mood: 'warm' });
ep.panel(1060, { cam: { on: ['harry'], fr: 'bust', dy: -0.4 }, bg: FLUB_BG, blur: 2, actors: [HF({ expr: 'focus', pose: 'hold', armF: { hand: 'hold', prop: g({ transform: 'translate(0,20)' }, pouch(0.8)) } })] },
  [say('Harry', 'Pencil and mechanical paper. Er, cancel that. Paper and mechanical pencil.', 400, 64, { anchor: 'tc',  w: 480, fixed: true }),
   say('Flubberwalt', 'Spin round and go left, right, down, down, right, left, right, up, and left again! At least, that\'s how it was in *my* day. This *is* a Monday on an odd-numbered year, isn\'t it?', 400, 990, { anchor: 'bc', w: 580, fixed: true, tail: null })], { mood: 'warm' });

// the green study room
// the reader steps through the green study's doorway with him
ep.panel(1200, { cam: { x: 1900, y: 460, w: 1000 }, bg: () => CS.greenStudy(), actors: [{ def: harryRaven, id: 'harry', x: 2195, y: 900, s: 1.1, turn: 0.8, pose: 'stand', expr: 'focus' }] },
  [cap('The green study room had comfortable chairs, and dragons in the stained glass, and sunlight coming through in green. Harry couldn\'t *actually* walk straight through it.', 44, 20, { w: 640, fixed: true }),
   cap('There were *bookshelves.* He had to read at least some of the titles, or lose his claim to the Verres family name.', 62, 1000, { w: 436, fixed: true })], { shape: 'arch', frame: 'wood', spring: 0.32, x: 50, w: 700, y: 236, ph: 946, alt: 'A lovely room lit green by stained-glass dragons. Harry has stopped dead at the bookshelf.' });

// ---------------------------------------------------------------- the cry
const COR = () => CS.corridor({ seed: 13, windows: [300, 2200], torches: [1200] });
ep.panel(600, { cam: { on: ['harry'], fr: 'bust', dy: -0.2 }, bg: COR, blur: 2, actors: [{ def: harryRaven, id: 'harry', x: 700, y: 900, s: 1.1, turn: 0.6, pose: 'walk', expr: 'shock' }] },
  [whisper('Voice', 'Please! Give them b-back!', 560, 64, { anchor: 'tc',  w: 300, fixed: true, noTail: true })], { mood: 'warm', alt: 'A young boy\'s cry, from round the corner.' });
// the sprint: the panel leans forward with him
ep.panel(640, { cam: { on: ['harry'], fr: 'full', dx: -0.3 }, bg: COR, actors: [{ def: harryRaven, id: 'harry', x: 900, y: 900, s: 1.1, turn: 0.8, pose: 'run', expr: 'determined' }], behind: (e) => FX.speedLines(e.w, e.h, { n: 44, col: '#fff6e0' }) },
  [], { mood: 'warm', shape: 'slant', slant: 70, alt: 'Harry sprints; the panel leans forward with him.' });
const SCENE = (o = {}) => [
  ...[0, 1, 2, 3, 4, 5].map((i) => ({ def: i === 0 ? ernie : student(1340 + i, 'h'), id: i === 0 ? 'ernie' : 'h' + i, x: 200 + i * 95, y: 960 + (i % 2) * 30, s: 1.0, turn: 0.5, expr: i % 2 ? 'worried' : 'horror', pose: i === 2 ? 'cower' : 'stand' })),
  { def: derrick, id: 'derrick', x: 1250, y: 940, s: 1.4, turn: -0.3, expr: 'smug', pose: 'crossArms', ...(o.d || {}) },
  { def: slyTeen(1), id: 's1', x: 1010, y: 930, s: 1.3, turn: 0.2, expr: 'laugh', pose: 'handsHips' },
  { def: slyTeen(2), id: 's2', x: 1500, y: 930, s: 1.3, turn: -0.4, expr: 'smug', pose: 'stand' },
  { def: slyTeen(3), id: 's3', x: 1140, y: 880, s: 1.3, turn: 0.1, expr: 'grin', pose: 'point' },
  { def: conscience, id: 'conscience', x: 1680, y: 910, s: 1.28, turn: -0.5, expr: 'worried', pose: 'stand' },
  ...(o.nev !== false ? [{ def: nevilleHuff, id: 'neville', x: 1300, y: 990, s: 1.05, turn: 0.4, expr: 'cry', pose: 'cower', ...(o.n || {}) }] : []),
  ...(o.h ? [{ def: harryRaven, id: 'harry', x: 2000, y: 980, s: 1.1, turn: -0.6, pose: 'stand', expr: 'cold', ...o.h }] : []),
  () => g({}, ...[[1180, 1010, -20], [1330, 1030, 12], [1420, 1000, 40]].map(([x, y, r]) => g({ transform: `translate(${x},${y}) rotate(${r})` }, rect(-40, -10, 80, 20, { fill: '#6b2433', stroke: C.ink, 'stroke-width': 2 })))),
];
ep.bleed(660, { cam: { x: 940, y: 580, w: 1720 }, bg: COR, actors: SCENE() },
  [cap('Six first-year Hufflepuffs, huddled together, looking as if they desperately wanted to do something. Five older Slytherins, in a ring around another boy.', 44, 40, { w: 640, fixed: true })],
  { alt: 'A corridor: frightened Hufflepuffs on the left; five big Slytherin teenagers in a ring around a small boy whose books are scattered on the floor.' });
ep.panel(780, { cam: { on: ['harry'], fr: 'bust', dy: -0.3 }, bg: COR, blur: 2, actors: SCENE({ h: { expr: 'yell', pose: 'fists' } }), over: (e) => FX.frost(e.w, e.h, 0.2, 31) },
  [shout('Harry', '*EXCUSE ME!*', 400, 110, { anchor: 'tc',  w: 420, size: 56, fixed: true })], { mood: 'warm', shape: 'burst', points: 20, seed: 9, alt: 'Harry yells, and the panel itself bursts.' });
ep.panel(900, { cam: { x: 1330, y: 520, w: 1000 }, bg: COR, actors: SCENE({ n: { expr: 'worried' } }) },
  [cap('It might not have been necessary. People were already looking at him. But it certainly served to stop all the action cold.', 44, 30, { w: 620, fixed: true })], { mood: 'warm', alt: 'Five older Slytherins turn to look down at him: anger, amusement, delight.' });
ep.panel(1000, { cam: { on: ['harry'], fr: 'bust', dy: -0.3 }, bg: COR, blur: 3, actors: SCENE({ h: { expr: 'determined' } }) },
  [inner('Harry', '*Part of Harry\'s brain was screaming in panic that these were much older and bigger boys who could stomp him flat.*', 400, 64, { anchor: 'tc',  w: 580, fixed: true }),
   inner('Harry', '*Another part said, dryly, that nobody would seriously stomp the Boy-Who-Lived with seven Hufflepuffs watching. Their only real weapon was his own fear. If he allowed it.*', 400, 820, { w: 580, fixed: true })], { mood: 'warm' });
ep.panel(620, { cam: { on: ['neville'], fr: 'bust', zoom: 0.75, dy: 0.3 }, bg: COR, blur: 1, actors: SCENE() },
  [cap('Then Harry saw who the boy was.', 44, 30, { w: 400, fixed: true })], { mood: 'warm', alt: 'Neville Longbottom, tear-streaked, among the Slytherins\' legs.' });
ep.panel(760, { cam: { on: ['harry'], fr: 'close', dy: 0.2 }, bg: COR, blur: 3, actors: SCENE({ h: { expr: 'cold' } }), over: (e) => FX.frost(e.w, e.h, 0.35, 33) },
  [inner('Harry', '*Of course.*', 180, 64, { anchor: 'tc',  w: 200, fixed: true }),
   cold('Harry', 'He had decided to apologise to Neville. That meant Neville was *his.* How *dare* they?', 420, 650, { w: 520, fixed: true })], { mood: 'cold' });
ep.panel(900, { cam: { x: 1420, y: 560, w: 1000 }, bg: COR, actors: SCENE({ nev: false, h: { x: 1330, turn: 0.3, pose: 'stand', expr: 'cold', armB: { sh: 75, el: 5, hand: 'fist' } } }).concat([{ def: nevilleHuff, id: 'neville', x: 1560, y: 990, s: 1.05, turn: 0.6, expr: 'shock', pose: 'fallBack' }]), behind: (e) => FX.speedLines(e.w, e.h, { n: 28, col: '#fff6e0' }) },
  [cap('Harry grabbed Neville by the wrist and *yanked* him out, and in nearly the same motion pushed his own way into the gap.', 44, 30, { w: 620, fixed: true })], { mood: 'warm', alt: 'Harry hauls Neville out of the ring so hard that Neville stumbles.' });
// the finale: the Slytherins are too big for the panel and loom out over its top edge; Harry, small, stays inside
// (only the two boys in the middle cross the edge: the ones at the sides stay inside the frame)
const INSIDE = (a) => (env) => env.layer === 'actors' ? '' : place(a.def, { light: env.light, ...a }).svg;
ep.panel(1180, { cam: { head: 'harry', hw: 0.28, hx: 0.5, hy: 0.47 }, bg: COR, actors: SCENE({ nev: false, h: { x: 1250, y: 990, turn: 0, expr: 'cold', pose: 'stand' } }).map((a) => a && (a.id === 's1' || a.id === 's2') ? INSIDE(a) : a) },
  [say('Harry', 'Hello.', 610, 600, { w: 180, fixed: true }),
   say('Harry', 'I\'m the Boy-Who-Lived.', 400, 1030, { w: 360, fixed: true, tail: [405, 950] })],
  { breakout: 'top', y: 200, ph: 962, panel: { grain: false }, alt: 'Harry, small, stands in the middle of the ring of much bigger Slytherins, looking up at them. Their heads loom out over the top of the panel.' });
ep.end();
export default ep;
