// EPISODE 10 — Positive Bias  (source: HPMOR ch. 8)
import { Episode, say, shout, whisper, think, inner, cold, cap, capC, dark, note, title, plain, M } from '../engine/core/dsl.js';
import { shot, atAnchor } from '../engine/core/scene.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, circle, ellipse, line, text } from '../engine/core/svg.js';
import * as S from '../engine/bg/station.js';
import * as L from '../engine/bg/london.js';
import * as K from '../engine/bg/kit.js';
import * as CS from '../engine/bg/castle.js';
import * as FX from '../engine/fx/fx.js';
import { harryRobes, hermione, neville, makeExtra } from '../engine/chars/cast.js';
import { bookHeld, comedCan, spray, foldedNote, sheet, toad, pouch } from '../engine/props/props.js';

const ep = new Episode({ id: 'ep10', number: 10, title: 'Positive Bias' });
ep.setBg(C.paper);
ep.beat(260, [plain('CHAPTER TEN', 400, 90, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('Positive Bias', 400, 170, { size: 54 })]);

const CP = (o = {}) => () => S.compartment(o);
const BOOK = { sh: 28, el: 85, hand: 'hold', prop: bookHeld('#2f4f86', { rot: 180, w: 56, h: 74 }) };
const BOOKB = { sh: 8, el: -100, hand: 'hold' }; // far hand tucked behind the book (the pose's own far arm now pokes out past the book)
const HER = (o = {}) => ({ def: hermione, id: 'hermione', x: 310, y: 900, s: 1.1, turn: 0.4, pose: 'sit', seat: 150, expr: 'neutral', ...o });
const HAR = (o = {}) => ({ def: harryRobes, id: 'harry', x: 1290, y: 900, s: 1.1, turn: -0.4, pose: 'sit', seat: 150, expr: 'smile', ...o });
const SNAP = { sh: 105, el: 40, hand: 'palm' }; // snapping hand held up beside the head, clear of it (the pose's own raised hand hides behind his hair)
const TRUNKS = () => L.trunk(760, 900, 0.45, '#7a4e2e', true) + L.trunk(860, 905, 0.32, '#5a4a3a', false);

// =============================================================== Hermione alone
ep.panel(820, { cam: { x: 520, y: 690, w: 780 }, bg: CP(), actors: [HER({ pose: 'sitRead', expr: 'focus', armF: BOOK, armB: BOOKB })] },
  [cap('No-one had asked for help. That was the problem.', 40, 30, { w: 620, fixed: true }),
   cap('Aside from helping people with their homework, or anything else they needed, she really didn\'t know how to meet people.', 215, 650, { w: 470, size: 26, fixed: true })], { mood: 'day', alt: 'A train compartment. A girl with an enormous cloud of bushy brown hair sits alone, reading a thick book.' });
// her daydream: another girl at the door, drawn in a thought-cloud under her face
const CORR = () => { let o = rect(-300, -300, 2200, 1600, { fill: '#6b4429' }); o += K.wallpaper(-300, -300, 2200, 1000, '#7b3a3a', { stripes: true, c2: '#6e3232' }); for (let i = 0; i < 4; i++) o += rect(i * 480, 150, 360, 420, { fill: '#5a3a22', stroke: '#3e2a1f', 'stroke-width': 3 }) + rect(i * 480 + 40, 190, 280, 200, { fill: '#c9b48a', opacity: 0.7 }); return o + rect(-300, 900, 2200, 400, { fill: '#4a3222' }); };
ep.multi(1260, [
  { x: M, y: 18, w: 752, h: 820, mood: 'day', art: { cam: { on: ['hermione'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: CP(), blur: 2, actors: [HER({ pose: 'sitRead', expr: { base: 'think', eyes: { lookX: 0.4 } }, armF: BOOK, armB: BOOKB })] } },
  { x: 190, y: 800, w: 580, h: 440, shape: 'cloud', seed: 6, shadow: true, art: { cam: { head: 'girl', hw: 0.25, hx: 0.5, hy: 0.4 }, bg: CORR, blur: 2, actors: [{ def: makeExtra(41, { kid: true, female: true, hairStyle: 'pony' }), id: 'girl', x: 900, y: 1000, s: 1.1, turn: 0.25, pose: 'wave', armB: { sh: 120, el: 30, hand: 'palm' }, expr: 'happy' }], over: (e) => rect(0, 0, e.w, e.h, { fill: '#fff4dc', opacity: 0.35 }) } },
], [inner('Hermione', 'Why did *she* have to take all the responsibility, when there were two people involved? Why didn\'t adults ever *help?*', 400, 100, { w: 560, fixed: true }),
   inner('Hermione', 'She wished some other girl would just walk up to her and say, "Hermione, the teacher told me to be friends with you."', 400, 700, { w: 580, fixed: true })], { over: () => circle(150, 858, 9, { fill: '#fff', stroke: '#2b2226', 'stroke-width': 3 }) + circle(188, 892, 15, { fill: '#fff', stroke: '#2b2226', 'stroke-width': 3 }), alt: 'Hermione, thinking. Below her, a daydream: another girl in the doorway, waving hello.' });
// the open door: the reader stands in the doorway she left open
const DOOR = (w, h) => { const r = 34; return `M0,${h} L0,${r} Q0,0 ${r},0 L${w - r},0 Q${w},0 ${w},${r} L${w},${h}Z`; };
const slidDoor = (e) => rect(e.w - 70, -20, 120, e.h + 40, { fill: '#5a3a22', stroke: '#2b2226', 'stroke-width': 4 }) + rect(e.w - 52, 60, 70, 200, { fill: '#c9b48a', opacity: 0.75, stroke: '#3e2a1f', 'stroke-width': 3 }) + rect(e.w - 60, e.h * 0.52, 12, 60, { fill: '#b08d45', rx: 5 });
ep.panel(1060, { cam: { head: 'hermione', hw: 0.5, hx: 0.44, hy: 0.36 }, bg: CP(), actors: [HER({ pose: 'sitRead', expr: 'smile', armF: BOOK, armB: BOOKB })], over: slidDoor },
  [cap('Hermione Granger was sitting alone on the first day of school, in the last carriage of the train, with the door left open just in case anyone wanted to talk to her.', 40, 20, { w: 640, size: 26, fixed: true }),
   cap('But let it be quite clear: she was *not* sad, lonely, gloomy, depressed, or despairing. She was rereading *Hogwarts: A History* for the third time, and quite enjoying it.', 40, 900, { w: 640, size: 26, fixed: true })], { mood: 'day', x: 160, w: 480, y: 180, ph: 690, shape: DOOR, frame: 'wood', alt: 'Through the open compartment door: Hermione reading happily, alone.' });

// =============================================================== the scarfed boy
ep.panel(760, { cam: { x: 930, y: 730, w: 660 }, bg: CORR, actors: [{ def: harryRobes, id: 'harry', x: 1000, y: 1000, s: 1.1, turn: 0.6, pose: 'gesture', expr: 'neutral', mask: 'scarf' }, () => L.trunk(820, 1010, 0.32, '#7a4e2e', true)] },
  [say('Harry', 'Excuse me, does anyone here know the six quarks, or where I can find a first-year girl named Hermione Granger?', 420, 140, { w: 460, fixed: true })], { mood: 'day', alt: 'In the corridor, a boy in robes with a scarf wrapped round his face knocks on a compartment door, his trunk scuttling behind him.' });
ep.panel(620, { cam: { on: ['hermione'], fr: 'close', zoom: 0.8, dy: 0.15 }, bg: CP(), blur: 3, actors: [HER({ expr: { base: 'focus', eyes: { lookX: -1 } } })] }, [inner('Hermione', '…*unless she\'d somehow misheard?*', 400, 70, { w: 560, fixed: true })], { mood: 'day' });
ep.panel(820, { cam: { x: 875, y: 690, w: 760 }, bg: CORR, actors: [{ def: hermione, id: 'hermione', x: 700, y: 1000, s: 1.1, turn: 0.6, pose: 'stand', expr: 'neutral', lean: 12 }, { def: harryRobes, id: 'harry', x: 1050, y: 1000, s: 1.1, turn: -0.5, pose: 'stand', expr: 'neutral', mask: 'scarf' }] },
  [say('Hermione', 'Can I help you with something?', 190, 128, { w: 240, fixed: true }),
   say('Harry', 'Not unless you can name the six quarks, or tell me where to find Hermione Granger.', 565, 194, { w: 300, fixed: true })], { mood: 'day' });
ep.panel(620, { cam: { on: ['hermione'], fr: 'bust' }, bg: CORR, blur: 2, actors: [{ def: hermione, id: 'hermione', x: 700, y: 1000, s: 1.1, turn: 0.4, pose: 'handsHips', expr: 'smug' }] },
  [say('Hermione', 'Up, down, strange, charm, truth, beauty. And why are you looking for her?', 400, 130, { w: 480 })], { mood: 'day' });
ep.panel(900, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: CORR, blur: 2, actors: [{ def: harryRobes, id: 'harry', x: 1050, y: 1000, s: 1.1, turn: -0.3, pose: 'present', expr: 'bigGrin', mask: 'scarf' }] },
  [say('Harry', 'Ah, so *you\'re* a first-year girl named Hermione Granger. On the train to Hogwarts, no less.', 400, 130, { w: 480, fixed: true }),
   say('Harry', 'Presumably I\'m meant to invite you to join my party, or get a key magical item from you. PC or NPC, that is the question?', 400, 752, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(460, { cam: { on: ['hermione'], fr: 'close' }, bg: CORR, blur: 3, actors: [{ def: hermione, id: 'hermione', x: 700, y: 1000, s: 1.1, turn: 0.3, expr: 'what' }] }, [cap('She couldn\'t think of any *possible* reply to… whatever that was.', 44, 30, { w: 420 })], { mood: 'day' });
ep.panel(920, { cam: { x: 925, y: 680, w: 930 }, bg: CP(), mid: TRUNKS, actors: [HER({ pose: 'stand', x: 560, expr: 'confused', turn: 0.5 }), HAR({ expr: 'grin', mask: 'scarf' })] },
  [cap('He sat down across from her. His trunk scurried in after him, grew to three times its size, and snuggled up next to hers in an oddly disturbing fashion.', 40, 30, { w: 620, size: 26, fixed: true }),
   say('Harry', 'Please, have a seat. And close the door, if you would. Don\'t worry, I don\'t bite anyone who doesn\'t bite me first.', 450, 772, { w: 440, size: 27, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(560, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#5a3a22' }) + FX.sfxText(ctx.w / 2, ctx.h * 0.64, 'SLAM', { size: 210, rot: -6 }) + FX.speedLines(ctx.w, ctx.h, { n: 30, col: '#f1e6cc' }), [cap('The imputation that this boy thought she was *scared* of him made her slam the door into the wall with unnecessary force.', 40, 28, { w: 540, size: 26, fixed: true })], { shape: 'jag', jag: 16, alt: 'SLAM.' });
ep.panel(700, { cam: { on: ['hermione'], fr: 'bust' }, bg: CP(), blur: 2, actors: [HER({ pose: 'fists', x: 560, expr: 'angry', turn: 0.4 })] },
  [shout('Hermione', 'I didn\'t *say* I was Hermione Granger!', 400, 110, { w: 440, size: 32 })], { mood: 'day' });
ep.panel(1030, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.05 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'grin', mask: 'scarfDown' })] },
  [say('Harry', '*I* didn\'t say you *said* you were Hermione Granger. I just said you *were.* If you\'re asking how I know, it\'s because I know everything.', 400, 140, { w: 540, size: 28, fixed: true }),
   say('Harry', 'Good evening, ladies and gentlemen. My name is Harry James Potter‑Evans‑Verres, or Harry Potter for short. I know that probably doesn\'t mean anything to *you*, for a change—', 400, 852, { w: 540, size: 27, fixed: true })], { mood: 'day' });
// the reveal: the boy from inside the books steps out onto the page
ep.cutout(1100, { cam: { head: 'harry', hw: 0.36, hx: 0.5, hy: 0.33 }, actors: [HAR({ expr: 'grin', pose: 'present', x: 1150, turn: -0.15 })], over: (e) => {
    // the rig's scar sits under Harry's fringe here, so letter a visible one in the gap of forehead above his left lens
    const h = e.anchors?.harry?.head; if (!h) return ''; const r = e.anchors.harry.hr, x = h[0] - r * 0.22, y = h[1] - r * 0.175, k = r / 95;
    return K.glow(x, y, 80, '#ff6a4a', 0.45) + path(`M${x - 5 * k},${y - 14 * k} l${10 * k},${9 * k} l${-9 * k},${3 * k} l${10 * k},${10 * k}`, { fill: 'none', stroke: '#a3322e', 'stroke-width': 3.2 * k, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  } },
  [cap('Bright, laughing green eyes. And an angry red-dark scar in the shape of a lightning bolt.', 40, 28, { w: 640, fixed: true })], { alt: 'Harry, unmasked, standing with a showman\'s flourish: messy black hair, round glasses, green eyes, and the lightning-bolt scar.' });
ep.panel(980, { cam: { on: ['hermione'], fr: 'bust', zoom: 0.9, dy: -0.4 }, bg: CP(), blur: 2, actors: [HER({ pose: 'present', expr: 'shock' })] },
  [shout('Hermione', '*Harry Potter!* You\'re in *Modern Magical History* and *The Rise and Fall of the Dark Arts* and *Great Wizarding Events of the Twentieth Century!*', 400, 232, { w: 420, size: 27, fixed: true }),
   cap('It was the very first time in her whole life that she\'d *met* someone from inside a *book.* It was rather an odd feeling.', 40, 850, { w: 640, size: 26, fixed: true })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close', zoom: 0.85, dy: 0.15 }, bg: CP(), blur: 3, actors: [HAR({ expr: 'blank' })] }, [say('Harry', 'I\'m in *books?* Wait. Of course I\'m in books… What a strange thought.', 400, 126, { w: 520, fixed: true })], { mood: 'day' });
ep.panel(560, { cam: { on: ['hermione'], fr: 'bust' }, bg: CP(), blur: 2, actors: [HER({ expr: 'unimpressed' })] },
  [say('Hermione', 'Goodness, didn\'t you know? I\'d have found out everything I could, if it was me.', 400, 136, { w: 460, fixed: true })], { mood: 'day' });
ep.panel(910, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'deadpan' })] },
  [say('Harry', 'Miss Granger, it has been less than seventy-two hours since I discovered my claim to fame. *Believe me*, I intend to find out everything I can.', 400, 184, { w: 540, fixed: true }),
   say('Harry', 'What *do* the books say about me?', 470, 800, { w: 460, fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { on: ['hermione'], fr: 'waist', zoom: 0.9, dy: -0.75 }, bg: CP(), actors: [HER({ expr: { base: 'focus', eyes: { lookY: -0.8, lookX: 0.4 } }, pose: 'lecture' })], under: (e) => rect(0, 0, e.w, e.h, { fill: '#f6e3b0', opacity: 0.2 }) },
  [say('Hermione', 'You\'re the only one who\'s ever survived the Killing Curse, so you\'re called the Boy-Who-Lived. Born the thirty-first of July, 1980. On the thirty-first of October 1981, He‑Who‑Must‑Not‑Be‑Named (though I don\'t know why not) attacked your home.', 400, 240, { w: 510, size: 26, fixed: true })], { mood: 'day', alt: 'Hermione recites, rapid-fire, eyes rolled up as if reading from memory.' });
ep.panel(900, { cam: { on: ['hermione'], fr: 'close', zoom: 0.8, dy: 0.4 }, bg: CP(), blur: 2, actors: [HER({ expr: { base: 'focus', eyes: { lookY: -0.8, lookX: -0.4 } }, pose: 'lecture' })], under: (e) => rect(0, 0, e.w, e.h, { fill: '#f6e3b0', opacity: 0.2 }) },
  [say('Hermione', '*The Rise and Fall of the Dark Arts* claims you survived because of your mother\'s love, that your scar contains all of the Dark Lord\'s magical power, and that the centaurs fear you. But *Modern Magical History* warns that there are lots of crackpot theories about you.', 400, 682, { w: 560, size: 26, fixed: true })], { mood: 'day' });
ep.panel(760, { cam: { on: ['harry'], fr: 'close', zoom: 0.8, dy: 0.1 }, bg: CP(), blur: 3, actors: [HAR({ expr: 'shock' })] }, [say('Harry', 'Were you told to wait for Harry Potter on the train, or something like that?', 400, 110, { w: 460, fixed: true }), say('Hermione', 'No. Who told you about *me?*', 250, 665, { w: 360, tail: [20, 700], fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'think', pose: 'think' })] },
  [say('Harry', 'Professor McGonagall. And I believe I see why. Do you have an eidetic memory, Hermione?', 400, 115, { w: 480, fixed: true }),
   say('Hermione', 'It\'s not photographic. I\'ve always wished it was. I had to read my schoolbooks *five times* to memorise them all.', 420, 770, { w: 540, tail: [20, 820], fixed: true })], { mood: 'day' });
ep.panel(900, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'scheme', pose: 'hold', armF: { sh: 42, el: 58, hand: 'palm' }, armB: { sh: 8, el: -6 } })], over: atAnchor('harry', 'handF', pouch(0.8, { open: true }), { space: 'panel', dy: -30 }) },
  [say('Harry', 'Really. I hope you don\'t mind if I test that. As the saying goes: trust, but verify.', 400, 115, { w: 480, fixed: true }),
   say('Harry', '*Magical Drafts and Potions*, by Arsenius Jigger.', 555, 790, { w: 360, fixed: true, tail: [455, 560] })], { mood: 'day' });
// eyes-only: the wanting
ep.panel(630, { cam: { head: 'hermione', hw: 1.0, hx: 0.45, hy: 0.24 }, bg: CP(), blur: 3, actors: [HER({ expr: { base: 'awe', eyes: { sparkle: true } } })] }, [cap('Instantly, Hermione wanted one of those pouches more than she\'d ever wanted anything.', 40, 506, { w: 640, fixed: true })], { mood: 'day', y: 14, ph: 470, shape: 'eye', alt: 'Hermione\'s eyes, sparkling with want.' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.2 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'focus', pose: 'sitRead', armF: { ...BOOK, prop: bookHeld('#5a3a22', { rot: 180, w: 56, h: 74 }) }, armB: BOOKB })] },
  [say('Harry', 'If you were brewing a *potion of spider climbing*, what would be the next ingredient after the Acromantula silk?', 400, 130, { w: 500, size: 28, fixed: true })], { mood: 'day' });
ep.panel(910, { cam: { on: ['hermione'], fr: 'bust', zoom: 0.85, dy: -0.55 }, bg: CP(), blur: 2, actors: [HER({ expr: 'smug' })] },
  [say('Hermione', 'Wait until the potion turns exactly the shade of the cloudless dawn sky, eight degrees from the horizon, eight minutes before sunrise. Stir eight times widdershins and once deasil, and then add eight drams of unicorn bogies.', 400, 205, { w: 530, size: 26, fixed: true })], { mood: 'day' });
ep.panel(740, { cam: { on: ['harry'], fr: 'close', zoom: 0.8, dy: 0.1 }, bg: CP(), blur: 3, actors: [HAR({ expr: 'delight' })] }, [say('Harry', 'Well well well *well* well well.', 400, 100, { w: 440, fixed: true }), say('Harry', 'I should like to make you a proposition, Miss Granger.', 400, 650, { w: 480, fixed: true })], { mood: 'day' });
ep.panel(600, { cam: { on: ['hermione'], fr: 'close', zoom: 0.85, dy: 0.05 }, bg: CP(), blur: 3, actors: [HER({ expr: 'suspicious' })] }, [say('Hermione', 'A *proposition?*', 400, 90, { w: 300, fixed: true }), cap('Girls weren\'t supposed to listen to those.', 40, 520, { w: 640, fixed: true })], { mood: 'day' });

// the Comed-Tea & "take over the universe"
// the offered can reaches out over the frame
ep.panel(660, { cam: { head: 'harry', hw: 0.42, hx: 0.34, hy: 0.52 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'scheme', pose: 'present', armB: { sh: 80, el: 35, hand: 'palm' } }), atAnchor('harry', 'handB', comedCan(1.2), { dx: -16, dy: -20 })] },
  [say('Harry', 'Can I offer you something to drink?', 560, 100, { w: 360, fixed: true })], { mood: 'day', x: 150, w: 626, breakout: 'left' });
ep.panel(820, { cam: { on: ['hermione'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: CP(), blur: 2, actors: [HER({ expr: 'smile', pose: 'holdOne', armF: { sh: 60, el: 95, hand: 'hold' } })], over: atAnchor('hermione', 'handF', g({ transform: 'rotate(-30)' }, comedCan(1)), { space: 'panel', dx: 14, dy: 22 }) },
  [cap('Hermione politely accepted the fizzy drink. As she started to drink, the boy said:', 40, 28, { w: 640, size: 26, fixed: true }),
   say('Harry', 'I\'d like you to help me take over the universe.', 488, 715, { w: 380, tail: [790, 745], fixed: true })], { mood: 'day' });
ep.panel(760, { cam: { on: ['hermione'], fr: 'bust', zoom: 0.8, dy: -0.05 }, bg: CP(), blur: 2, actors: [HER({ expr: 'calm', pose: 'holdOne', armF: { sh: 34, el: 76, hand: 'hold' } })], over: atAnchor('hermione', 'handF', comedCan(1), { space: 'panel', dy: 10 }) },
  [cap('Hermione finished her drink and lowered the can.', 40, 28, { w: 640, fixed: true }), say('Hermione', 'No thank you. I\'m not evil.', 400, 675, { w: 460, fixed: true })], { mood: 'day' });
ep.panel(920, { cam: { on: ['harry'], fr: 'waist', zoom: 0.8, dy: -0.9 }, bg: CP(), actors: [HAR({ expr: 'delight', pose: 'armsUp' })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { col: '#f0c878', op: 0.4 }) },
  [say('Harry', 'I meant it in the sense of the Baconian project: "the effecting of all things possible." Experimental studies of spells. The underlying laws. Bring magic into science, merge the wizarding and Muggle worlds, raise the whole planet\'s standard of living.', 400, 212, { w: 560, size: 26, fixed: true })], { mood: 'day' });
// the dream: the compartment falls away and it's the stars
const saturn = (e) => g({ transform: `translate(${e.w * 0.82},${e.h * 0.2}) rotate(-18) scale(0.7)` }, ellipse(0, 0, 150, 34, { fill: 'none', stroke: '#e8d6a8', 'stroke-width': 10, opacity: 0.8 }), circle(0, 0, 70, { fill: '#d9b77a' }), path('M-68,-12 Q0,-4 68,-12', { stroke: '#b8925a', 'stroke-width': 8, fill: 'none' }), path('M-150,0 A150,34 0 0 0 150,0', { fill: 'none', stroke: '#e8d6a8', 'stroke-width': 10 }));
ep.panel(800, { cam: { head: 'harry', hw: 0.3, hx: 0.5, hy: 0.3 }, behind: (e) => g({ transform: `translate(${e.w / 2},${e.h / 2}) scale(0.32) translate(-1000,-120)` }, CS.deepSpace({ seed: 81, k: 2.2 })) + saturn(e), actors: [HAR({ expr: { base: 'delight', glint: true }, pose: 'armsUp' })] },
  [say('Harry', 'Discover the secret of immortality, colonise the Solar System, explore the galaxy. And most importantly, *figure out what the heck is really going on here*, because all of this is blatantly impossible.', 400, 598, { w: 540, size: 26, fixed: true })], { frame: 'glow', glow: '#ffe6a8', alt: 'Harry, arms flung wide, and around him the compartment has become stars, a ringed planet, the galaxy.' });
ep.panel(460, { cam: { on: ['hermione'], fr: 'close' }, bg: CP(), blur: 3, actors: [HER({ expr: 'unimpressed' })] }, [say('Hermione', 'And?', 400, 100, { w: 120 })], { mood: 'day' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: CP(), blur: 3, actors: [HAR({ expr: 'shock' })] }, [shout('Harry', '*And?* That\'s not *enough?*', 400, 110, { w: 340, size: 32 })], { mood: 'day' });
ep.panel(720, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.25 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'warm', pose: 'gesture' })] },
  [say('Harry', 'With your encyclopaedic memory added to my intelligence and rationality, we\'ll have it finished in no time. Where by "no time" I mean at least thirty-five years.', 400, 157, { w: 540, size: 27, fixed: true })], { mood: 'day' });
ep.panel(700, { cam: { on: ['hermione'], fr: 'bust', zoom: 0.85, dy: -0.2 }, bg: CP(), blur: 2, actors: [HER({ expr: 'smug', pose: 'crossArms' })] },
  [say('Hermione', 'I haven\'t seen you do anything intelligent. Maybe I\'ll let *you* help *me* with *my* research.', 400, 120, { w: 500, fixed: true })], { mood: 'day' });
ep.beat(300, [capC('There was a certain silence in the compartment.', 400, 150, { w: 460 })]);
ep.panel(900, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: CP(), blur: 2, actors: [HAR({ expr: { base: 'scheme', glint: true } })] },
  [say('Harry', 'So you\'re asking me to demonstrate my intelligence, then.', 400, 110, { w: 480, fixed: true }),
   say('Harry', 'I warn you: challenging my ingenuity is a dangerous project. It tends to make your life a lot more surreal.', 400, 775, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(680, { cam: { on: ['hermione'], fr: 'bust', zoom: 0.85, dy: 0.05 }, bg: CP(), blur: 3, actors: [HER({ expr: 'smug', pose: 'holdOne', armF: { sh: 60, el: 95, hand: 'hold' } })], over: atAnchor('hermione', 'handF', g({ transform: 'rotate(-30)' }, comedCan(1)), { space: 'panel', dx: 14, dy: 22 }) }, [say('Hermione', 'I\'m not impressed yet.', 400, 100, { w: 440, fixed: true }), cap('Unnoticed, the green drink once again rose to her lips.', 40, 605, { w: 640, fixed: true })], { mood: 'day' });
ep.panel(850, { cam: { on: ['harry'], fr: 'close', zoom: 0.82, dy: 0.05 }, bg: CP(), blur: 3, actors: [HAR({ expr: 'scheme' })] },
  [say('Harry', 'Well, maybe *this* will impress you. I\'ve found out I don\'t need the wand. I can make anything I want happen, just by snapping my fingers.', 400, 160, { w: 540, fixed: true })], { mood: 'day' });
// the shock: the whole panel bursts
ep.panel(1040, { cam: { head: 'hermione', hw: 0.3, hx: 0.5, hy: 0.36 }, bg: CP(), blur: 3, actors: [HER({ expr: 'horror', pose: 'panic', x: 560 })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { bg: '#e8ffd8', col: '#6ad05a', op: 0.6 }), over: (e) => spray(e.w * 0.5, e.h * 0.74, 1, 2) + spray(e.w * 0.5, e.h * 0.74, -1, 1.6) },
  [cap('Onto her brand-new, never-before-worn robes. On the very first day of school.', 40, 30, { w: 640, fixed: true }),
   shout('Hermione', '*EEK! MY CLOTHES!*', 400, 890, { w: 560, size: 42, fixed: true })], { mood: 'day', x: -40, y: 60, w: 880, ph: 970, shape: 'burst', points: 16, seed: 4, alt: 'Hermione sprays green pop all over her new robes. The panel bursts.' });
ep.panel(720, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.2 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'grin', pose: 'wave', armB: SNAP })], over: (e) => { const h = e.anchors?.harry?.handB; return h ? FX.sfxText(h[0] - 20, h[1] + 95, 'snap!', { size: 70, rot: -8 }) : ''; } },
  [say('Harry', 'Don\'t panic! I can fix it for you. Just watch!', 470, 115, { w: 440, fixed: true })], { mood: 'day' });
ep.panel(560, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#1f1d24' }) + [0.18, 0.5, 0.82].map((f) => path(`M${ctx.w * f - 40},170 Q${ctx.w * f - 20},${ctx.h * 0.6} ${ctx.w * f - 60},${ctx.h}`, { stroke: '#34303c', 'stroke-width': 6, fill: 'none' })).join('') + [0, 1, 2].map((i) => g({ transform: `translate(${ctx.w * (0.2 + i * 0.3)},${ctx.h * 0.62}) scale(1.4)`, opacity: 1 - i * 0.45 }, path('M-60,-30 Q-20,-70 20,-40 Q70,-50 60,0 Q80,40 20,40 Q-20,70 -50,30 Q-90,10 -60,-30Z', { fill: '#8aff6a', stroke: '#2a8a2a', 'stroke-width': 3 }))).join(''),
  [cap('The green fluid was still there. But even as she watched, it faded, and within a few moments it was as if she\'d never spilled anything at all.', 40, 28, { w: 640, size: 26, fixed: true })], { alt: 'The green stain on her robes fades away in three steps.' });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: CP(), blur: 3, actors: [HAR({ expr: 'smug' })] }, [cap('The boy was wearing a rather smug sort of smile.', 40, 28, { w: 640, fixed: true })], { mood: 'day' });
ep.panel(860, { cam: { on: ['hermione'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: CP(), blur: 2, actors: [HER({ expr: 'horror', pose: 'cower', x: 560 })], over: (e) => FX.frost(e.w, e.h, 0.25, 30) },
  [inner('Hermione', '*Wordless, wandless magic! At HIS age? When he only got his schoolbooks three days ago?*', 400, 85, { w: 560, fixed: true }),
   inner('Hermione', '*ALL THE DARK LORD\'S MAGICAL POWER! IN HIS SCAR!*', 400, 784, { w: 430, fixed: true })], { mood: 'day' });
ep.panel(640, { cam: { x: 470, y: 640, w: 640 }, bg: CP(), actors: [HER({ expr: 'flustered', pose: 'run', x: 360, turn: -0.6 })] },
  [say('Hermione', 'I, I, I need to go to the toilet, wait here, all right—', 500, 110, { w: 380, fixed: true, tail: 'hermione' })], { mood: 'day', shape: 'slant', slant: -70 });
ep.panel(560, { cam: { on: ['harry'], fr: 'close' }, bg: CP(), blur: 3, actors: [HAR({ expr: 'worried' })] }, [say('Harry', 'It was just a trick, Hermione. I\'m sorry. I didn\'t mean to scare you.', 400, 132, { w: 460, fixed: true })], { mood: 'day' });
ep.panel(520, { cam: { on: ['hermione'], fr: 'close', zoom: 0.9 }, bg: CP(), blur: 2, actors: [HER({ expr: 'confused', pose: 'stand', x: 360, turn: 0.5 })] },
  [say('Hermione', 'A *trick?*', 250, 90, { w: 260, fixed: true })], { mood: 'day' });
ep.panel(760, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.15 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'warm', pose: 'gesture' })] },
  [say('Harry', 'You asked me to demonstrate my intelligence. So I did something apparently impossible. I can\'t *really* do anything by snapping my fingers. At least, I\'ve never actually tested it.', 400, 145, { w: 540, size: 26, fixed: true })], { mood: 'day' });
ep.panel(600, { cam: { on: ['harry'], fr: 'close', zoom: 0.8, dy: 0.1 }, bg: CP(), blur: 3, actors: [HAR({ expr: 'deadpan', pose: 'wave', armB: SNAP })], over: (e) => { const h = e.anchors?.harry?.handB; return h ? FX.sfxText(h[0] - 10, h[1] + 80, 'snap', { size: 54, rot: -8 }) : ''; } }, [say('Harry', 'Nope. No banana.', 450, 90, { w: 360, fixed: true })], { mood: 'day' });
ep.panel(920, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.08 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'focus', pose: 'gesture' })] },
  [say('Harry', 'I did *warn* you that challenging my ingenuity makes your life surreal. Remember that, the next time I warn you about something.', 400, 141, { w: 540, fixed: true }),
   say('Harry', 'You think you have what it takes to be a scientist in your own right? Then let\'s see how *you* investigate a confusing phenomenon.', 400, 790, { w: 540, fixed: true })], { mood: 'day' });
// the science-fair method
const scrawl = (x, y, s, fs = 44, a = 'start', col = '#2d2a4a') => text(x, y, s, { 'font-family': 'Caveat', 'font-weight': 700, 'font-size': fs, 'text-anchor': a, fill: col });
const poster = (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  ['Step 1: Form a hypothesis.', 'Step 2: Do an experiment to test it.', 'Step 3: Measure the results.', 'Step 4: Make a cardboard poster.'].forEach((s, i) => { out += scrawl(70, 240 + i * 80, s); });
  out += path('M60,505 L540,505', { stroke: '#c43a32', 'stroke-width': 3 });
  return out;
};
ep.panel(580, poster, [cap('Hermione\'s mind skipped gears, ground against itself, and spat back the instructions for a school science project:', 40, 34, { w: 640, size: 26, fixed: true })], { shape: 'torn', frame: 'paper', seed: 12, tear: 12, shadow: true, alt: 'Step 1: Form a hypothesis. Step 2: Do an experiment. Step 3: Measure the results. Step 4: Make a cardboard poster.' });
ep.panel(990, { cam: { on: ['hermione'], fr: 'bust', zoom: 0.85, dy: -0.05 }, bg: CP(), blur: 2, actors: [HER({ expr: 'think', pose: 'think' })] },
  [say('Hermione', 'My hypothesis is that the robes come from the shop with a Charm on them to keep them clean. You found that out by spilling something on *yourself* earlier.', 400, 163, { w: 560, fixed: true }),
   say('Hermione', 'And now I do Step Two: an experiment. I\'ll pour some on *your* robes, and I predict the stain will disappear.', 400, 860, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(620, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#1f1d24' }) + [0.18, 0.5, 0.82].map((f) => path(`M${ctx.w * f - 40},0 Q${ctx.w * f - 20},${ctx.h * 0.6} ${ctx.w * f - 60},${ctx.h}`, { stroke: '#34303c', 'stroke-width': 6, fill: 'none' })).join('') + path(`M500,232 Q470,${ctx.h * 0.5} 468,${ctx.h * 0.8}`, { stroke: '#8aff6a', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' }) + ellipse(468, ctx.h * 0.82, 70, 18, { fill: '#8aff6a', stroke: '#2a8a2a', 'stroke-width': 2, opacity: 0.8 }) + g({ transform: `translate(${ctx.w * 0.5},${ctx.h * 0.3}) rotate(120)` }, comedCan(3)),
  [note('…and it vanished.', 560, 560, { size: 38, color: '#e8e0d0' })], { alt: 'Hermione pours a little pop on the corner of Harry\'s robes. It vanishes.' });
ep.panel(600, { cam: { on: ['hermione'], fr: 'close', zoom: 0.85, dy: 0.12 }, bg: CP(), blur: 3, actors: [HER({ expr: 'smug' })] }, [say('Hermione', 'My answer is that the robes are Charmed to keep themselves clean.', 400, 95, { w: 560, fixed: true })], { mood: 'day' });
ep.panel(460, { cam: { on: ['harry'], fr: 'close' }, bg: CP(), blur: 3, actors: [HAR({ expr: 'calm' })] }, [say('Harry', 'Not quite.', 400, 100, { w: 160 })], { mood: 'day' });
ep.panel(840, { cam: { on: ['hermione'], fr: 'close', zoom: 0.8, dy: 0.05 }, bg: CP(), blur: 3, actors: [HER({ expr: 'hurt' })] },
  [cap('A stab of disappointment. He wasn\'t a teacher. But it was still a test, and getting a question wrong always felt like a little punch in the stomach.', 40, 28, { w: 640, size: 26, fixed: true }),
   cap('(It said almost everything you needed to know about Hermione Granger that she had never once let that stop her.)', 40, 674, { w: 570, size: 25, fixed: true })], { mood: 'day' });

// the 2-4-6 game
ep.panel(1030, { cam: { on: ['harry'], fr: 'bust', zoom: 0.8, dy: -0.15 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'focus', pose: 'present', armB: { sh: 62, el: 30, hand: 'palm' } })], over: atAnchor('harry', 'handB', foldedNote(1.2), { space: 'panel', dx: -12, dy: -14 }) },
  [say('Harry', 'This is a game based on a famous experiment. I have a *rule* that fits some triplets of numbers, but not others. I\'ve written it down and folded it up, so you know it\'s fixed.', 400, 172, { w: 560, size: 27, fixed: true }),
   say('Harry', '2-4-6 fits the rule. You give me triplets, and I\'ll say "Yes" or "No". *I am Nature, the rule is one of my laws, and you are investigating me.*', 400, 872, { w: 560, size: 27, fixed: true })], { mood: 'day' });
const triplets = (rows) => (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = rect(0, 0, w, h, { fill: '#f4ecd6' });
  for (let y = 40; y < h; y += 36) out += line(0, y, w, y, { stroke: '#b9c9d8', 'stroke-width': 1 });
  rows.forEach(([q, a], i) => { out += scrawl(120, 90 + i * 70, q) + scrawl(w - 150, 90 + i * 70, a, 44, 'middle', a === 'YES' ? '#2f7a3a' : '#c43a32'); });
  return out;
};
ep.panel(480, triplets([['2 - 4 - 6', 'YES'], ['4 - 6 - 8', 'YES'], ['10 - 12 - 14', 'YES'], ['1 - 3 - 5', 'YES'], ['-3, -1, +1', 'YES']]), [], { alt: 'Hermione\'s guesses: 4-6-8, 10-12-14, 1-3-5, -3/-1/+1. All YES.' });
ep.panel(600, { cam: { on: ['hermione'], fr: 'close', zoom: 0.85, dy: 0.12 }, bg: CP(), blur: 3, actors: [HER({ expr: 'smug' })] }, [say('Hermione', 'The rule is that the numbers have to go up by two each time.', 400, 115, { w: 560, fixed: true })], { mood: 'day' });
ep.panel(720, { cam: { on: ['harry'], fr: 'close', zoom: 0.85, dy: -0.05 }, bg: CP(), blur: 3, actors: [HAR({ expr: 'scheme' })] }, [say('Harry', 'Now suppose I tell you this test is harder than it looks, and only twenty percent of grown-ups get it right.', 400, 141, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(460, triplets([['2 - 5 - 8', 'YES'], ['10 - 20 - 30', 'YES']]), [say('Hermione', 'The numbers have to go up by the *same* amount each time! It doesn\'t have to be two!', 400, 330, { w: 520, tail: null })]);
ep.panel(620, { cam: { on: ['harry'], fr: 'close', zoom: 0.85, dy: 0.12 }, bg: CP(), blur: 3, actors: [HAR({ expr: 'calm' })] }, [say('Harry', 'Very well. Take the paper out and see how you did.', 400, 100, { w: 560, fixed: true })], { mood: 'day' });
// the unfolded rule, lying on the reader's own page
ep.cutout(590, (ctx) => g({ transform: `translate(${ctx.w / 2 + 8},${ctx.h * 0.57 + 14}) rotate(-3)` }, rect(-350, -180, 700, 360, { fill: '#3a2a1a', opacity: 0.28, filter: 'url(#blur3)' })) + g({ transform: `translate(${ctx.w / 2},${ctx.h * 0.57}) rotate(-3)` }, sheet({ w: 700, h: 360, ruled: true, top: 150, size: 64, lh: 1.15, align: 'center', lines: ['Three real numbers', 'in increasing order.'] })),
  [cap('Hermione\'s jaw dropped.', 40, 40, { w: 400, fixed: true })], { alt: 'The note reads: "Three real numbers in increasing order, lowest to highest."' });
ep.panel(720, { cam: { on: ['hermione'], fr: 'close', zoom: 0.85, dy: -0.3 }, bg: CP(), blur: 3, actors: [HER({ expr: 'shock' })] },
  [inner('Hermione', 'She had the distinct feeling that something terribly unfair had been done to her, that the boy was a dirty rotten cheating liar. But when she cast her mind back, she couldn\'t think of a single wrong answer he\'d given.', 400, 125, { w: 620, size: 27, fixed: true })], { mood: 'day' });
ep.panel(860, { cam: { on: ['harry'], fr: 'waist', zoom: 0.9, dy: -0.45 }, bg: CP(), actors: [HAR({ expr: 'warm', pose: 'lecture' })] },
  [say('Harry', 'What you\'ve just discovered is called *positive bias.* You had a rule in your mind, and you kept thinking of triplets that should make it say "Yes". You never tested any that should make it say "No".', 400, 190, { w: 540, size: 27, fixed: true })], { mood: 'day' });
ep.panel(820, { cam: { on: ['harry'], fr: 'close', zoom: 0.8, dy: 0.05 }, bg: CP(), blur: 3, actors: [HAR({ expr: { base: 'focus', eyes: { lookX: -0.3 } } })] },
  [say('Harry', 'You have to learn to look on the negative side of things. Stare into the darkness.', 400, 115, { w: 540, fixed: true }),
   say('Harry', 'Now. Do you want another shot at the original problem?', 400, 715, { w: 520, fixed: true })], { mood: 'day' });
ep.panel(790, { cam: { on: ['hermione'], fr: 'close', zoom: 0.8, dy: 0.05 }, bg: CP(), blur: 3, actors: [HER({ expr: { base: 'focus', sweat: true } })] },
  [cap('She had an odd feeling that this was the hardest she\'d ever been asked to think on a test. Or maybe the *first* time she\'d ever been asked to think on a test.', 40, 28, { w: 640, size: 26, fixed: true }),
   inner('Hermione', 'So… on my hypothesis… when should the pop *not* vanish?', 400, 705, { w: 470, fixed: true })], { mood: 'day' });
ep.panel(700, { cam: { on: ['hermione'], fr: 'bust', zoom: 0.85, dy: -0.1 }, bg: CP(), blur: 2, actors: [HER({ expr: 'determined', pose: 'holdOne', armF: { sh: 70, el: 20, hand: 'hold', prop: g({ transform: 'translate(0,10) rotate(130)' }, comedCan(1)) } })] },
  [say('Hermione', 'I want to pour some pop on the *floor*, and see if it *doesn\'t* vanish.', 400, 115, { w: 480, fixed: true })], { mood: 'day' });
ep.panel(460, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#4a3222' }) + ellipse(ctx.w * 0.5, ctx.h * 0.6, 120, 26, { fill: '#8aff6a', stroke: '#2a8a2a', 'stroke-width': 2, opacity: 0.35, 'stroke-dasharray': '6 6' }), [note('…it vanished.', 400, 200, { size: 44, color: '#e8e0d0' })], { alt: 'The puddle on the floor fades away too.' });
// eureka: her pointing hand jabs out over the frame at him
ep.panel(870, { cam: { head: 'hermione', hw: 0.44, hx: 0.635, hy: 0.57 }, bg: CP(), blur: 3, actors: [HER({ expr: 'delight', pose: 'point' })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.4, { col: '#f0c878', op: 0.5 }) },
  [shout('Hermione', 'Of course! *You* gave me that can! It\'s not the robe that\'s enchanted. It was the *pop* all along!', 338, 200, { w: 390, size: 32, fixed: true })], { mood: 'day', w: 620, breakout: 'right', alt: 'Hermione, delighted, points straight at Harry: her hand jabs out past the frame.' });
ep.panel(820, { cam: { on: ['harry'], fr: 'waist', zoom: 0.72, dy: -0.3 }, bg: CP(), actors: [HAR({ expr: 'bigGrin', pose: 'bowGrand', x: 1150 })] },
  [cap('The boy stood up and bowed to her, solemnly. He was grinning widely now.', 40, 28, { w: 640, fixed: true }),
   say('Harry', 'Then… may I help you with your research, Hermione Granger?', 400, 704, { w: 560, fixed: true })], { mood: 'day' });
ep.panel(540, { cam: { on: ['hermione'], fr: 'close', zoom: 0.9, dy: 0.1 }, bg: CP(), blur: 3, actors: [HER({ expr: 'flustered' })] }, [say('Hermione', 'I, ah…', 400, 80, { w: 200, fixed: true })], { mood: 'day' });

// =============================================================== Neville
// the door again, shut this time: a small shape behind the frosted glass
const knockDoor = (ctx) => { const w = ctx.w, h = ctx.h; return rect(0, 0, w, h, { fill: '#5a3a22' }) + [0.3, 0.7].map((f) => line(w * f, 0, w * f, h, { stroke: '#4a2e1b', 'stroke-width': 3, opacity: 0.5 })).join('') + rect(50, 60, w - 100, 250, { fill: '#e6dcc0', stroke: '#3e2a1f', 'stroke-width': 5 }) + g({ filter: 'url(#blur3)', opacity: 0.45 }, circle(w / 2 - 10, 205, 50, { fill: '#5a4a3a' }), path(`M${w / 2 - 95},320 Q${w / 2 - 90},250 ${w / 2 - 10},248 Q${w / 2 + 70},250 ${w / 2 + 75},320Z`, { fill: '#5a4a3a' })) + rect(50, 60, w - 100, 250, { fill: '#fff', opacity: 0.18 }) + rect(w - 46, h * 0.58, 14, 60, { fill: '#b08d45', rx: 6 }); };
ep.panel(560, knockDoor, [cap('A weak, tentative, faint, rather *reluctant* knocking.', 40, 18, { w: 640, fixed: true }), note('tap… tap…', 400, 470, { size: 56, color: '#f1e6cc' })], { x: 190, w: 420, y: 96, ph: 450, shape: DOOR, frame: 'wood', alt: 'The compartment door, shut. A small, round shadow waits behind the frosted glass. A timid knock.' });
const NEV = (o = {}) => ({ def: neville, id: 'neville', x: 300, y: 900, s: 1.05, turn: 0.5, pose: 'cower', expr: 'teary', ...o });
ep.panel(820, { cam: { x: 440, y: 640, w: 600 }, bg: CP(), actors: [NEV(), HER({ pose: 'stand', x: 540, turn: -0.5, expr: 'warm' })] },
  [cap('Neville looked exactly like he knocked.', 40, 28, { w: 640, fixed: true }),
   whisper('Neville', 'I\'m Neville Longbottom. I\'m looking for my pet toad… have you seen my toad?', 400, 205, { w: 480, fixed: true, tail: 'neville' })], { mood: 'day', alt: 'A small, round, frightened boy at the door.' });
ep.panel(720, { cam: { on: ['hermione'], fr: 'bust', zoom: 0.85, dy: -0.25 }, bg: CP(), blur: 2, actors: [HER({ pose: 'handsHips', x: 540, turn: -0.4, expr: 'determined' })] },
  [say('Hermione', 'Then we\'ll just have to check all the other carriages! I\'ll help you. My name is Hermione Granger, by the way.', 400, 141, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(940, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.05 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'think', pose: 'gesture' })] },
  [say('Harry', 'Hold on. I\'m not sure that\'s the best way. It\'ll take ages to check the whole train by hand, and you might miss it anyway.', 400, 125, { w: 540, fixed: true }),
   say('Harry', 'It makes more sense to go to the front carriage and ask a prefect. They might have spells that make it much easier to find a toad.', 400, 800, { w: 540, fixed: true })], { mood: 'day' });
ep.panel(820, { cam: { on: ['neville'], fr: 'bust', zoom: 0.9, dy: -0.2 }, bg: CP(), blur: 2, actors: [NEV({ expr: 'horror', pose: 'panic', turn: 0.4 })] },
  [shout('Neville', 'I remember that voice! You\'re one of the Lords of Chaos! *You\'re the one who gave me chocolate!*', 400, 166, { w: 440, size: 30, fixed: true })], { mood: 'day' });
ep.panel(560, { cam: { on: ['hermione'], fr: 'close', zoom: 0.85, dy: 0.18 }, bg: CP(), blur: 3, actors: [HER({ seat: undefined, x: 540, turn: 0.2, expr: 'what' })] }, [inner('Hermione', '*What? What what WHAT?*', 400, 60, { w: 500, fixed: true })], { mood: 'day' });
ep.panel(800, { cam: { on: ['harry'], fr: 'waist', zoom: 0.9, dy: -0.35 }, bg: CP(), actors: [HAR({ expr: 'rant', pose: 'handsHips', x: 1150 })] },
  [shout('Harry', 'I *never!* Do I *look* like the sort of villain who would give sweets to a child?', 400, 156, { w: 440, size: 32, fixed: true })], { mood: 'day' });
ep.panel(620, { cam: { on: ['neville'], fr: 'close', zoom: 0.9, dy: 0.1 }, bg: CP(), blur: 3, actors: [NEV({ expr: 'shock' })] }, [say('Neville', '*You\'re* Harry Potter? *The* Harry Potter? *You?*', 400, 100, { w: 420, fixed: true })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close', zoom: 0.85, dy: 0.15 }, bg: CP(), blur: 3, actors: [HAR({ expr: 'deadpan' })] }, [say('Harry', 'No, just *a* Harry Potter. There are three of me on this train—', 400, 100, { w: 560, fixed: true })], { mood: 'day' });
// he bolts straight out of the panel
ep.panel(600, { cam: { x: 250, y: 700, w: 560 }, bg: CP(), actors: [NEV({ x: 0, pose: 'run', turn: -0.7, expr: 'horror' })], behind: (e) => FX.speedLines(e.w, e.h, { n: 30 }) },
  [cap('Neville gave a small shriek and ran.', 190, 28, { w: 560, fixed: true }), note('eeeek!', 540, 230, { size: 64, rot: -8, color: '#fff6e0' })], { mood: 'day', x: 170, w: 606, breakout: 'left', alt: 'Neville shrieks and bolts, running right out of the panel.' });
ep.panel(800, { cam: { on: ['hermione'], fr: 'bust', zoom: 0.85, dy: -0.15 }, bg: CP(), blur: 2, actors: [HER({ expr: 'confused', pose: 'slump' })] },
  [say('Hermione', 'Can you *please* explain to me what\'s going on?', 400, 105, { w: 480, fixed: true }),
   cap('She wondered if hanging around Harry Potter meant always being this confused.', 40, 680, { w: 600, fixed: true })], { mood: 'day' });
ep.panel(920, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.45 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'grin', pose: 'gesture' })] },
  [say('Harry', 'Oh, we saw him on the platform, looking terrified. The fear is often worse than the thing itself, so we let him see his worst nightmare come true. And it wasn\'t so bad. We gave him sweets. That\'s *desensitisation therapy.*', 400, 208, { w: 520, size: 27, fixed: true })], { mood: 'day' });
ep.panel(760, { cam: { on: ['hermione'], fr: 'bust' }, bg: CP(), blur: 2, actors: [HER({ expr: 'rant', pose: 'fists' })], behind: (e) => FX.burst(e.w, e.h, e.w / 2, e.h * 0.45, { col: '#e8b4a0', op: 0.5 }) },
  [shout('Hermione', 'That\'s *awful!* *You\'re* awful! That poor boy! What you did was *mean!*', 400, 142, { w: 440, size: 32, fixed: true })], { mood: 'day' });
ep.panel(940, { cam: { on: ['harry'], fr: 'bust', zoom: 0.85, dy: -0.8 }, bg: CP(), blur: 2, actors: [HAR({ expr: 'unimpressed', pose: 'raiseHand', armB: { sh: 118, el: 40, hand: 'palm' } })] },
  [say('Harry', 'I think the word you\'re looking for is *enjoyable.* And you\'re asking the wrong question. The question is: did it do more good than harm? It\'s called *consequentialism.* Whether an act is right isn\'t about whether it *looks* bad.', 400, 206, { w: 530, size: 27, fixed: true })], { mood: 'day' });
ep.panel(760, { cam: { on: ['hermione'], fr: 'close', zoom: 0.8, dy: -0.05 }, bg: CP(), blur: 3, actors: [HER({ expr: 'cross' })] }, [cap('Hermione opened her mouth to say something utterly *searing*. Unfortunately, she seemed to have skipped the part where she thought of it first.', 40, 28, { w: 640, size: 26, fixed: true }), say('Hermione', 'What if he has *nightmares?*', 400, 670, { w: 480, fixed: true })], { mood: 'day' });
ep.panel(720, { cam: { on: ['harry'], fr: 'close', zoom: 0.85, dy: -0.1 }, bg: CP(), blur: 3, actors: [HAR({ expr: 'smug' })] }, [say('Harry', 'Then they\'ll be nightmares about horrible monsters who give you chocolate. Which was sort of the whole *point.*', 400, 141, { w: 560, fixed: true })], { mood: 'day' });
ep.panel(520, { cam: { on: ['hermione'], fr: 'close', zoom: 0.9, dx: -0.6, dy: 0.1 }, bg: CP(), blur: 3, actors: [HER({ expr: 'exasperated' })] },
  [say('Hermione', 'Is your life always this peculiar?', 225, 118, { w: 300, fixed: true })], { mood: 'day' });
ep.panel(620, { cam: { on: ['harry'], fr: 'close', zoom: 0.9, dx: 0.55, dy: 0.05 }, bg: CP(), blur: 3, actors: [HAR({ expr: 'bigGrin' })] },
  [say('Harry', 'I *make* it that peculiar. You\'re looking at the product of a lot of hard work and elbow grease.', 575, 330, { w: 330, fixed: true, tail: 'harry' })], { mood: 'day' });
// quiz montage
ep.multi(920, [
  // quiz and counter-quiz: two panels squared off across one diagonal seam
  { x: M, y: 18, w: 436, h: 884, shape: 'poly', pts: [[0, 0], [1, 0], [316 / 436, 1], [0, 1]], mood: 'day', art: { cam: { head: 'harry', hw: 0.6, hx: 0.4, hy: 0.63 }, bg: CP(), blur: 3, actors: [HAR({ expr: 'focus' })] } },
  { x: 356, y: 18, w: 420, h: 884, shape: 'poly', pts: [[120 / 420, 0], [1, 0], [1, 1], [0, 1]], mood: 'day', art: { cam: { head: 'hermione', hw: 0.66, hx: 0.6, hy: 0.4 }, bg: CP(), blur: 3, actors: [HER({ expr: 'determined' })] } },
], [say('Harry', 'I can do calculus, and I know Bayesian probability theory, and decision theory, and I\'ve read *The Feynman Lectures*…', 232, 250, { w: 270, size: 24, pad: 20, fixed: true, tail: 'harry' }), say('Hermione', '…and I can name the twelve uses of dragon\'s blood…', 590, 715, { w: 280, size: 24, pad: 12, fixed: true, tail: 'hermione' })],
  { alt: 'The quiz and counter-quiz went on for several minutes.' });

// the prefect
ep.panel(860, { cam: { x: 440, y: 620, w: 600 }, bg: CP(), actors: [NEV({ expr: 'cry' }), HER({ pose: 'stand', x: 540, turn: -0.5, expr: 'worried' })] },
  [cap('Another timid knock. Neville *was* crying now.', 40, 28, { w: 640, fixed: true }),
   whisper('Neville', 'I found a p-prefect, but he t-told me prefects weren\'t to be bothered over little things like m-missing toads.', 400, 225, { w: 560, fixed: true, tail: 'neville' })], { mood: 'day' });
// the turn: the whole panel tips as his voice goes cold
ep.panel(760, { cam: { head: 'harry', hw: 0.84, hx: 0.5, hy: 0.37, roll: -5 }, bg: CP(), blur: 3, actors: [HAR({ expr: 'cold' })], over: (e) => FX.frost(e.w, e.h, 0.6, 40) },
  [cold('Harry', 'What were his colours? Green and silver?', 400, 646, { w: 460, fixed: true })], { mood: 'cold', x: 56, w: 688, y: 30, ph: 700, rotate: -3, borderColor: '#9cc3d9', borderWidth: 6, alt: 'Harry\'s face changes. His voice goes cold.' });
ep.panel(540, { cam: { on: ['neville'], fr: 'close', zoom: 0.9, dy: 0.12 }, bg: CP(), blur: 3, actors: [NEV({ expr: 'teary' })] }, [whisper('Neville', 'N-no… his badge was r-red and gold.', 400, 90, { w: 460, fixed: true })], { mood: 'day' });
ep.panel(560, { cam: { on: ['hermione'], fr: 'close' }, bg: CP(), blur: 3, actors: [HER({ seat: undefined, x: 560, expr: 'shock' })] }, [shout('Hermione', '*Red and gold!* But those are *Gryffindor\'s* colours!', 400, 110, { w: 440, size: 30 })], { mood: 'day' });
ep.bleed(840, { cam: { on: ['harry'], fr: 'bust', dy: 0.25 }, bg: CP(), blur: 3, actors: [HAR({ expr: 'menace', x: 1150, pose: 'fists' })], under: (e) => rect(0, 0, e.w, e.h, { fill: '#0e1a28' }), over: (e) => FX.frost(e.w, e.h, 0.8, 41) + FX.sfxText(e.w * 0.78, e.h * 0.13, 'hsssss', { size: 70, fill: '#9fd79a', rot: -4, font: 'IM Fell English', weight: 400 }) },
  [cold('Harry', 'I *suppose* finding some first-year\'s toad isn\'t *heroic* enough to be worthy of a *Gryffindor* prefect.', 400, 690, { w: 560, fixed: true })], { mood: 'cold', alt: 'Harry hisses, a frightening sound that could have come from a live snake. Hermione and Neville both flinch.' });
ep.panel(840, { cam: { on: ['harry', 'neville'], fr: 'waist', dy: -0.8 }, bg: CP(), actors: [NEV({ x: 700, turn: 0.4, expr: 'shock', pose: 'stand' }), HAR({ expr: 'determined', x: 900, pose: 'gesture', turn: -0.4 })] },
  [say('Harry', 'Come on, Neville. *I\'ll* come with you this time. We\'ll see if the Boy‑Who‑Lived gets more attention.', 400, 136, { w: 500, fixed: true, tail: 'harry' }),
   say('Harry', 'And if we have to, we\'ll take apart the whole train screw by screw.', 400, 745, { w: 540, fixed: true, tail: 'harry' })], { mood: 'day' });
ep.panel(560, { cam: { x: 820, y: 672, w: 700 }, bg: CP(), mid: TRUNKS, actors: [HAR({ expr: 'cross', x: 1000, pose: 'point', turn: -0.4, armB: { sh: 64, el: 4, hand: 'point' } })] }, [shout('Harry', '*Stay!*', 350, 140, { w: 160, size: 40 }), cap('(He said it to his trunk.)', 36, 286, { w: 280 })], { mood: 'day' });
ep.panel(860, { cam: { x: 570, y: 590, w: 820 }, bg: CP({ view: 'dusk' }), actors: [HER({ expr: 'sad', turn: 0.8 })] },
  [cap('She probably should have gone with them. But for a moment Harry Potter had turned so scary that she was actually rather glad she hadn\'t thought of it.', 40, 28, { w: 640, size: 26, fixed: true }),
   cap('She felt as if she\'d just been run over by a steamroller and turned into a pancake.', 40, 740, { w: 640, size: 26, fixed: true })], { mood: 'dusk', alt: 'Hermione alone again, staring out of the window at the fields going gold with evening.' });
// last look: from outside the train, through her window, with the sunset sliding across the glass
const glass = (e) => { const w = e.w, h = e.h; const id = 'gl' + Math.round(w + h); return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6c07a" stop-opacity="0.34"/><stop offset="0.55" stop-color="#e8905a" stop-opacity="0.16"/><stop offset="1" stop-color="#3a2a1a" stop-opacity="0.28"/></linearGradient></defs>` + rect(0, 0, w, h, { fill: `url(#${id})` }) + path(`M0,${h * 0.8} Q${w * 0.25},${h * 0.7} ${w * 0.5},${h * 0.78} Q${w * 0.75},${h * 0.85} ${w},${h * 0.74} L${w},${h} L0,${h}Z`, { fill: '#3a2a1a', opacity: 0.3 }) + [[0.62, 0.12], [0.8, 0.05]].map(([a, b]) => path(`M${w * a},0 L${w * (a + b)},0 L${w * (a + b - 0.3)},${h} L${w * (a - 0.3)},${h}Z`, { fill: '#fff', opacity: 0.14 })).join('') + [0.3, 0.55, 0.8].map((f) => line(0, h * f, w, h * f - 20, { stroke: '#fff', 'stroke-width': 1.5, opacity: 0.12 })).join(''); };
ep.panel(820, { cam: { head: 'hermione', hw: 0.5, hx: 0.5, hy: 0.46 }, bg: CP({ view: 'dusk' }), blur: 3, actors: [HER({ expr: { base: 'sad', eyes: { lookX: 0.45, lookY: 0.1 } }, turn: 0.35 })], over: glass },
  [cap('Well. She did at least know why she was feeling a little sad inside.', 70, 50, { w: 470, fixed: true }),
   inner('Hermione', 'Maybe Gryffindor wasn\'t as wonderful as she had thought.', 400, 700, { w: 500, fixed: true })], { mood: 'dusk', shape: 'screen', borderColor: '#7e1d1d', borderWidth: 16, alt: 'From outside the moving train: Hermione\'s sad face behind the compartment window, the sunset sliding across the glass.' });
ep.end();
export default ep;
