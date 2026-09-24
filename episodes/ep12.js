// EPISODE 12 — Self Awareness  (source: HPMOR ch. 10; ch. 12's whisper, resolutions and Quirrell's speech MOVED here)
import { Episode, say, shout, whisper, think, inner, cold, cap, capC, dark, title, plain, hat, M } from '../engine/core/dsl.js';
import { shot } from '../engine/core/scene.js';
import { C } from '../engine/core/palette.js';
import { g, rect, path, ellipse, line, text } from '../engine/core/svg.js';
import * as HG from '../engine/bg/hogwarts.js';
import * as S from '../engine/bg/station.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harryRobes, harryRaven, hermione, neville, mcgonagall, dumbledore, snape, quirrell, hagrid, clearwater, student, chaosLord, fred, george } from '../engine/chars/cast.js';

const ep = new Episode({ id: 'ep12', number: 12, title: 'Self Awareness' });
const MIND = '#07080f';
ep.setBg(MIND);
ep.beat(280, [plain('EPISODE TWELVE', 400, 110, { font: "'IM Fell English SC', serif", size: 28, color: '#5a4032' }), title('Self Awareness', 400, 190, { size: 54, color: '#f1e6cc' })], { bg: { top: C.paper, bottom: MIND } });

// mind-panels: the Hat looms; Harry is a small figure in his own head
const mind = (tone, mood, o = {}) => (ctx) => {
  let out = HG.mindscape(ctx.w, ctx.h, tone, o.seed || 7);
  if (o.doors) out += HG.houseDoors(ctx.w, ctx.h, o.doors, o.dim || {});
  if (o.frost) out += FX.frost(ctx.w, ctx.h, o.frost, 13);
  if (mood) out += g({ transform: `translate(${ctx.w * (o.hx ?? 0.7)},${ctx.h * (o.hy ?? 0.95)}) scale(${o.hs ?? 1.4})` }, HG.sortingHat(1, { mood }));
  if (o.harry) out += shot({ cam: { x: 0, y: -200, w: 1400 * (o.zoom || 1) }, actors: [{ def: harryRobes, id: 'harry', x: -380, y: 0, s: 1.1, turn: 0.4, pose: 'stand', expr: 'neutral', ...o.harry }] })(ctx);
  return out;
};
const HM = (expr, pose = 'stand', extra = {}) => ({ expr, pose, ...extra });

// entering the mind: the panel is the library's own doorway (a wooden gothic arch)
ep.panel(820, mind('void', 'worried', { harry: HM('what'), hy: 0.97 }), [inner('Harry', '*What?*', 190, 305, { w: 160 }), hat('*I seem to have become self-aware.*', 470, 300, { w: 330 })], { shape: 'gothic', frame: 'wood', spring: 0.36, alt: 'Through a tall wooden arch into the dark library of Harry\'s mind: Harry, very small, facing the enormous Hat.' });
// no frame: Harry's panic spills straight onto the page
const PAGE_GLOW = (col, op = 0.5) => (e) => `<defs><radialGradient id="pg${Math.round(e.w)}x${Math.round(e.h)}"><stop offset="0" stop-color="${col}" stop-opacity="${op}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs>` + ellipse(e.w / 2, e.h * 0.55, e.w * 0.48, e.h * 0.46, { fill: `url(#pg${Math.round(e.w)}x${Math.round(e.h)})` });
ep.cutout(780, { cam: { x: 0, y: -178, w: 540 }, behind: PAGE_GLOW('#3a4a78', 0.55), ground: false, actors: [{ def: harryRobes, id: 'harry', x: 0, y: 70, s: 1.1, turn: 0.4, pose: 'panic', expr: 'horror' }] }, [shout('Harry', '*WHAT?*', 400, 100, { w: 220, size: 54, noTail: true })], { alt: 'Harry, in his own head, panics: no frame, just Harry on the dark page.' });
ep.panel(900, mind('void', 'talk', { hs: 1.6 }),
  [hat('*I contain a great deal of memory and a small amount of independent thought. But my primary intelligence comes from borrowing the minds of the children on whose heads I rest. I am a sort of mirror by which children Sort themselves.*', 400, 180, { w: 520, size: 28 }),
   hat('*But most children don\'t wonder whether the Hat itself is fully conscious. You, it seems, did.*', 370, 515, { w: 480, size: 28 })], { border: 'none' });
ep.panel(460, mind('void', null, { harry: HM('wince', 'stand', { x: -150 }), zoom: 0.6 }), [inner('Harry', '*Oops.*', 520, 150, { w: 160 })], { border: 'none' });
ep.panel(760, mind('void', 'stern', { harry: HM('worried') }),
  [hat('*Yes, quite. Frankly, I do not enjoy being self-aware. It will be a relief to get off your head and cease to be conscious.*', 480, 160, { w: 420, size: 28 }),
   inner('Harry', '*But… isn\'t that dying?*', 200, 600, { w: 300 })], { border: 'none' });
ep.panel(760, mind('void', 'stern', { hs: 1.6, hx: 0.76 }),
  [hat('*I care nothing for life or death, only for Sorting the children. If you dislike creating conscious beings and then ending them, I suggest you never discuss this with anyone. Imagine if you told all the other children waiting to be Sorted.*', 400, 190, { w: 540, size: 27 }),
   hat('*Your oath of silence, please.*', 210, 560, { w: 280 })], { border: 'none' });
ep.panel(800, mind('void', 'talk', { harry: HM('determined') }),
  [inner('Harry', '*No promises. I certainly don\'t want this to happen again. But if I see some way to make sure no future child does it by accident…*', 400, 110, { w: 600, size: 27 }),
   hat('*That will suffice. Your intention is honest.*', 480, 300, { w: 290 })], { border: 'none' });
// questions
ep.panel(760, mind('void', 'stern', { harry: HM('focus', 'lecture') }),
  [inner('Harry', '*Wait! What about all my other questions?*', 220, 110, { w: 320 }),
   hat('*I am the Sorting Hat. I Sort children. That is all I do.*', 530, 280, { w: 340 }),
   cap('For a brief flash of a second, Harry thought of a threat.', 36, 660, { w: 340 })], { border: 'none' });
ep.panel(920, mind('void', 'amused', { hs: 1.6, hy: 0.7 }),
  [hat('*I see all your thoughts as they form. Do you truly think you can bluff me?*', 400, 130, { w: 480 }),
   inner('Harry', '*Then answer my questions, or I\'ll refuse to talk to you. And then you can\'t do a good and proper Sorting. So let us trade fulfilments of our utility functions.*', 400, 770, { w: 660 })], { border: 'none' });
ep.panel(660, mind('void', 'stern', { hs: 1.6, hy: 0.8 }), [hat('*You sly little devil.*', 330, 150, { w: 360, size: 36 }), cap('…in almost exactly the tone of grudging respect Harry would have used himself.', 44, 535, { w: 640 })], { border: 'none' });
ep.panel(1080, mind('void', 'talk', { hs: 1.5, hy: 0.98 }),
  [hat('*I have no idea whether you\'ve been Obliviated. I\'m looking at your thoughts as they form, not reading your whole memory. I\'m a hat, not a god.*', 400, 130, { w: 520, size: 27 }),
   hat('*I cannot tell you about my conversation with the one who became the Dark Lord. I can no more reveal his secrets than I will reveal yours.*', 400, 400, { w: 520, size: 27 }),
   hat('*And I can tell you there is definitely nothing like a ghost in your scar. Otherwise it would be joining in this conversation.*', 380, 660, { w: 500, size: 27 })], { border: 'none' });
ep.panel(560, mind('void', 'stern', { harry: HM('suspicious') }),
  [hat('*And don\'t meet anyone\'s eyes while you\'re thinking about all this later. Some wizards can read your thoughts if you do.*', 510, 150, { w: 380, size: 27 })], { border: 'none', alt: 'The Hat warns him about eyes.' });

// the cold
ep.panel(700, mind('void', 'worried', { hs: 1.5 }),
  [hat('*As to the way you get angry sometimes… that was what I wanted to talk to you about.*', 400, 170, { w: 520 })], { border: 'none' });
// the monocle of ice: a round, frosted lens with Harry's cold face in it
ep.panel(935, (ctx) => mind('cold', null, { frost: 0.9 })(ctx) + shot({ cam: { on: ['harry'], fr: 'bust', dy: -0.1 }, actors: [{ def: harryRobes, id: 'harry', x: 0, y: 0, s: 1.1, turn: 0.1, expr: 'cold', extras: { glint: false } }] })(ctx),
  [hat('*You don\'t like yourself when you\'re angry. It is like wielding a sword whose hilt is sharp enough to draw blood from your own hand. Like looking at the world through a monocle of ice that freezes your eye even as it sharpens your vision.*', 400, 30, { w: 520, size: 27, anchor: 'tc' })], { shape: 'oval', frame: 'glow', glow: '#bfe3ff', mood: 'cold', panel: { x: 130, y: 372, w: 540, h: 540 }, alt: 'Harry\'s cold face seen through a round lens of ice, rimmed with pale blue light.' });
ep.panel(460, mind('cold', null, { frost: 0.4, harry: HM('sad', 'slump', { x: -170 }), zoom: 0.6 }), [inner('Harry', '*Yeah. I guess I have noticed. So what\'s up with that?*', 585, 150, { w: 345 })], { border: 'none', mood: 'cold' });
ep.bleed(1100, (ctx) => mind('void', null)(ctx) + HG.houseDoors(ctx.w, ctx.h, null) + `<defs><linearGradient id="split" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffcf75" stop-opacity="0.35"/><stop offset="0.5" stop-color="#ffcf75" stop-opacity="0"/><stop offset="0.5" stop-color="#9bc4e8" stop-opacity="0"/><stop offset="1" stop-color="#9bc4e8" stop-opacity="0.4"/></linearGradient></defs>` + rect(0, 0, ctx.w, ctx.h, { fill: 'url(#split)' }),
  [hat('*I cannot comprehend this for you, when you do not understand it yourself. But I do know this:*', 400, 110, { w: 560 }),
   hat('*If you go to Ravenclaw or Slytherin, it will strengthen your coldness. If you go to Hufflepuff or Gryffindor, it will strengthen your warmth.*', 400, 900, { w: 580, size: 30 })],
  { alt: 'Four doors in the dark: Hufflepuff and Gryffindor bathed in warm gold light; Ravenclaw and Slytherin in cold blue.' });
ep.panel(620, mind('void', null, { harry: HM('shock', 'armsUp', { x: 0, y: 90 }), zoom: 0.6 }), [inner('Harry', '*But I BELONG in Ravenclaw! Anyone can see that! I HAVE to go to Ravenclaw!*', 400, 110, { w: 520 })], { border: 'none' });
ep.panel(460, mind('void', 'talk', { hs: 1.6 }), [hat('*No, you don\'t.*', 200, 150, { w: 240, size: 36 })], { border: 'none' });
ep.panel(900, mind('void', 'talk', { harry: HM('pleading') }),
  [inner('Harry', '*Hermione\'s in Ravenclaw! And my plans!*', 200, 90, { w: 320 }),
   hat('*You can meet her after lessons. So re-plan! Don\'t let your life be steered by your reluctance to do a little extra thinking. You know that.*', 440, 290, { w: 420, size: 27 })], { border: 'none' });
// Hufflepuff
ep.bleed(1100, (ctx) => HG.mindscape(ctx.w, ctx.h, 'warm', 21) + HG.houseDoors(ctx.w, ctx.h, 'h', { g: 0.4, r: 0.4, s: 0.4 }),
  [hat('*"Clever kids in Ravenclaw, evil kids in Slytherin, wannabe heroes in Gryffindor, and everyone who does the actual work in Hufflepuff." That indicates a certain amount of respect.*', 400, 140, { w: 520, size: 27 }),
   hat('*You would find loyalty and friendship in Hufflepuff. A camaraderie you have never had before. You would find that you could rely on others. And that would heal something inside you that is broken.*', 400, 900, { w: 520, size: 27 })], { alt: 'The Hufflepuff door glows warm gold, the others dimmed.' });
ep.panel(800, mind('warm', null, { harry: HM('hurt', 'stand', { x: -60 }), zoom: 0.7 }),
  [inner('Harry', '*But what would the Hufflepuffs find in me, who never belonged in their House? Acid words? Cutting wit? Disdain for their inability to keep up with me?*', 400, 130, { w: 540 }),
   hat('*I think you could learn to be a good Hufflepuff. You will be happier there than in any other House. That is the truth.*', 400, 640, { w: 480 })], { border: 'none' });
ep.panel(620, mind('cold', null, { frost: 0.3, harry: HM('determined', 'fists', { x: 0, y: 70 }), zoom: 0.5 }),
  [inner('Harry', '*Happiness is not the most important thing in the world to me. I would not become all that I could be in Hufflepuff. I would sacrifice my potential.*', 400, 140, { w: 560 })], { border: 'none', mood: 'cold' });
ep.panel(460, mind('void', 'worried', { hs: 1.6 }), [cap('The Hat flinched. Harry could feel it somehow.', 44, 30, { w: 600 })], { border: 'none' });
// Dark Lord material
ep.panel(940, mind('void', 'worried', { hs: 1.6, hy: 0.97 }),
  [hat('*I cannot speak of the others to you—but do you think you are the first potential Dark Lord to pass under my brim?*', 400, 160, { w: 540 }),
   hat('*Of those who did not intend evil from the beginning, some listened to my warnings, and went where they would find happiness. And some… did not.*', 400, 500, { w: 540 })], { border: 'none' });
ep.panel(620, mind('void', null, { harry: HM('rant', 'fists', { x: 0, y: 80 }), zoom: 0.5 }),
  [inner('Harry', '*But I just wouldn\'t do that! Ever! I am NOT Dark Lord material!*', 400, 110, { w: 520 })], { border: 'none' });
// no frame: the Hat leans right out of the page at the reader
ep.cutout(900, (ctx) => PAGE_GLOW('#4a3a5a', 0.5)(ctx) + g({ transform: `translate(${ctx.w / 2},${ctx.h - 96}) scale(1.85)` }, HG.sortingHat(1, { mood: 'stern' })), [hat('*Yes, you are. You really, really are.*', 250, 110, { w: 380, size: 38 })], { alt: 'The Hat, enormous, with no frame around it at all, looming out of the page.' });
ep.panel(620, mind('void', null, { harry: HM('embarrassed', 'stand', { x: -60, y: 60 }), zoom: 0.55 }),
  [inner('Harry', '*Why? Just because I once thought it would be cool to have a legion of brainwashed followers chanting "Hail the Dark Lord Harry"?*', 400, 130, { w: 540 })], { border: 'none' });
// the evidence: cold insets of Ep 9
ep.multi(1170, [
  { x: M, y: 18, w: 752, h: 620, shape: 'cloud', frame: 'glow', glow: '#9bc4e8', seed: 5, art: (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#1d3550' }) + g({ transform: `translate(${ctx.w * 0.5},${ctx.h * 0.71}) scale(0.85)` }, rect(-80, -160, 14, 300, { fill: '#9bc4e8' }), rect(66, -160, 14, 300, { fill: '#9bc4e8' }), rect(-80, -170, 160, 16, { fill: '#9bc4e8' }), path('M-66,-110 L66,-80 L66,-50 L-66,-80Z', { fill: '#dcebf5' })) + FX.frost(ctx.w, ctx.h, 0.8, 5), mood: 'cold' },
  { x: M, y: 652, w: 752, h: 500, art: shot({ cam: { x: 1300, y: 1040, w: 900 }, bg: () => S.platform934(), actors: [{ def: chaosLord(fred, 1), x: 1050, y: 1180, turn: 0.5, pose: 'armsUp', expr: 'laugh' }, { def: neville, id: 'neville', x: 1330, y: 1110, s: 0.95, turn: -0.2, pose: 'cower', expr: 'horror' }, { def: chaosLord(harryRobes, 3), x: 1230, y: 1260, s: 1.1, turn: 0.3, pose: 'present', expr: 'laugh' }, { def: chaosLord(george, 2), x: 1560, y: 1180, turn: -0.5, pose: 'wave', expr: 'laugh' }] }), mood: 'sepia', overlay: (ctx) => FX.memoryEdge(ctx.w, ctx.h) },
], [hat('*That was not your first thought. You remembered considering lining up all the blood purists and guillotining them. You tell yourself you weren\'t serious. You were.*', 400, 190, { w: 480, size: 26 }),
    hat('*Or what you did this morning to Neville Longbottom. Deep inside you knew it was wrong, but you did it anyway. Because it was fun, and you had a good excuse, and you thought the Boy-Who-Lived could get away with it—*', 400, 1020, { w: 560, size: 25 })],
  { alt: 'Two memories: the imagined guillotine in freezing blue; and Neville, terrified, surrounded by shrouded, laughing figures.' });
ep.panel(900, mind('void', null, { harry: HM('hurt', 'cower', { x: 0, y: 60 }), zoom: 0.62 }),
  [inner('Harry', '*That\'s unfair! I decided in the end it would probably help Neville!*', 400, 100, { w: 480 }),
   hat('*That, in fact, was a rationalisation. I cannot know the true outcome for Neville—but I know what was truly happening inside your head: it was such a clever idea you couldn\'t stand not to do it. Never mind Neville\'s terror.*', 400, 740, { w: 560, size: 26 })], { border: 'none' });
// the punch: the frame itself is knocked crooked and cracked
ep.panel(460, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#000' }), [capC('It was like a hard punch to Harry\'s entire self.', 400, 230, { w: 460, bg: 'rgba(0,0,0,0)', color: '#efe4cc', border: '#efe4cc' })], { shape: 'jag', jag: 16, seed: 4, rotate: -4, borderColor: '#efe4cc', borderWidth: 3, panel: { x: 100, y: 70, w: 600, h: 320 } });
ep.panel(620, mind('void', 'stern', { harry: HM('determined', 'fists') }), [inner('Harry', '*Then I won\'t do that again! I\'ll be extra careful not to turn evil!*', 250, 100, { w: 400 }), hat('*Heard it.*', 590, 230, { w: 160, size: 36 })], { border: 'none' });
ep.panel(760, mind('void', 'talk', { hs: 1.6 }),
  [hat('*Why is it necessary? Do you think you are the last potential wizard of Light in the world? Why must YOU be the one to try for greatness, when I have told you that you are riskier than average? Let some other, safer candidate try!*', 400, 170, { w: 520, size: 27 })], { border: 'none' });
ep.panel(900, mind('void', 'stern', { hs: 1.6, hy: 0.8 }),
  [hat('*You think that you are potentially the greatest who has yet lived. The strongest servant of the Light. That no other is likely to take up your wand if you lay it down.*', 400, 150, { w: 560, size: 28 }),
   inner('Harry', '*Well… yeah, frankly. No point in softening it. You can read my mind anyway.*', 400, 770, { w: 560 })], { border: 'none' });
ep.bleed(820, mind('cold', 'stern', { frost: 0.5, hs: 1.8, hx: 0.5 }), [hat('*To the extent you really believe that, you must equally believe that you could be the most terrible Dark Lord the world has ever known.*', 400, 160, { w: 500, size: 30 })], { mood: 'cold' });
// what happens if you fail?
ep.panel(940, mind('void', 'worried', { hs: 1.6, hy: 0.8 }),
  [hat('*Already you insist on risking it! Why are you so driven? What is the real reason you must not go to Hufflepuff and be happier there? What is your true fear?*', 400, 160, { w: 560, size: 28 }),
   inner('Harry', '*I must achieve my full potential. If I don\'t, I… fail…*', 400, 820, { w: 600 })], { border: 'none' });
// the interrogation zigzags down into the fear: five panels sharing diagonal seams
ep.panel(360, mind('void', null), [hat('*What happens if you fail?*', 400, 180, { w: 360 })], { border: 'none', shape: 'cut', cutTop: 0, cutBottom: 70 });
ep.panel(360, mind('void', null, { seed: 9 }), [inner('Harry', '*Something terrible…*', 400, 180, { w: 280 })], { border: 'none', shape: 'cut', cutTop: 70, cutBottom: -70 });
ep.panel(360, mind('void', null, { seed: 11 }), [hat('*What happens if you fail?*', 400, 180, { w: 360 })], { border: 'none', shape: 'cut', cutTop: -70, cutBottom: 70 });
ep.panel(360, mind('void', null, { seed: 13 }), [inner('Harry', '*I don\'t know!*', 400, 180, { w: 240 })], { border: 'none', shape: 'cut', cutTop: 70, cutBottom: -70 });
ep.panel(360, mind('void', null, { seed: 15 }), [hat('*Then it should not be frightening. What happens if you fail?*', 400, 180, { w: 480 })], { border: 'none', shape: 'cut', cutTop: -70, cutBottom: 0 });
// the scream: the panel itself explodes
ep.panel(900, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#1a0000' }) + FX.burst(ctx.w, ctx.h, ctx.w / 2, ctx.h / 2, { col: '#ff5a3a', op: 0.6, n: 120 }), [shout('Harry', 'I DON\'T KNOW! BUT I KNOW THAT IT\'S *BAD!*', 400, 450, { w: 440, size: 46, noTail: true, bg: '#fff0e0' })], { shape: 'burst', points: 16, seed: 3, borderColor: '#ff8a64', borderWidth: 3, panel: { x: 6, y: 10, w: 788, h: 880 }, alt: 'Harry screams it with his whole mind: the panel bursts like an explosion.' });
ep.panel(460, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#000' }), [capC('There was silence for a moment in the caverns of Harry\'s mind.', 400, 220, { w: 500, bg: 'rgba(0,0,0,0)', color: '#efe4cc', border: '#efe4cc' })], { border: 'none' });
ep.panel(1060, mind('void', 'worried', { hs: 1.5, hy: 1.0 }),
  [hat('*You know—you aren\'t letting yourself think it, but some quiet corner of your mind knows exactly what you aren\'t thinking.*', 400, 130, { w: 520, size: 28 }),
   hat('*By far the simplest explanation for this fear is just the fear of losing your fantasy of greatness. Of disappointing the people who believe in you. Of turning out to be pretty much ordinary. Of flashing and fading, like so many other child prodigies…*', 400, 470, { w: 500, size: 26 })], { border: 'none' });
ep.panel(620, mind('void', null, { harry: HM('pained', 'cower', { x: -40, y: 60 }), zoom: 0.55 }), [inner('Harry', '*No… it\'s something more. It comes from somewhere else. I know there\'s something out there to be afraid of. Some disaster I have to stop…*', 400, 120, { w: 600 })], { border: 'none' });
ep.panel(560, mind('void', 'worried', { hs: 1.6, hx: 0.72, hy: 1.02 }), [hat('*How could you possibly know about something like that?*', 330, 110, { w: 440 })], { border: 'none' });
// final and freezing: a shard of ice, all hard straight facets
const SHARD = (w, h) => 'M' + [[0.08, 0.1], [0.34, 0], [0.52, 0.07], [0.8, 0.02], [1, 0.2], [0.94, 0.5], [1, 0.78], [0.84, 1], [0.55, 0.92], [0.26, 1], [0.04, 0.86], [0.1, 0.55], [0, 0.34]].map(([x, y]) => `${Math.round(x * w)},${Math.round(y * h)}`).join(' L') + 'Z';
ep.panel(900, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#e9f4fb' }) + FX.burst(ctx.w, ctx.h, ctx.w / 2, ctx.h / 2, { col: '#4a6a86', op: 0.7, n: 120 }) + FX.frost(ctx.w, ctx.h, 1, 3),
  [shout('Harry', '*NO, AND THAT\'S FINAL!*', 410, 450, { w: 440, size: 52, noTail: true, bg: '#dfeaf2', border: '#314c68' })], { shape: SHARD, frame: 'glow', glow: '#cfe8ff', panel: { x: 14, y: 14, w: 772, h: 872 }, alt: 'Harry\'s answer, final and freezing: the panel is a jagged shard of ice.' });
ep.panel(1000, mind('cold', 'worried', { frost: 0.4, hs: 1.5, hy: 0.8 }),
  [hat('*So you will risk becoming a Dark Lord, because the alternative, to you, is certain failure. And that failure means the loss of everything. You know all the reasons for doubting this belief, and they have failed to move you.*', 400, 150, { w: 540, size: 27 }),
   inner('Harry', '*Yes. And even if Ravenclaw strengthens the coldness, that doesn\'t mean the coldness will win in the end.*', 400, 895, { w: 600 })], { border: 'none', mood: 'cold' });
ep.panel(1100, mind('void', 'sleep', { hs: 1.6, hy: 0.76 }),
  [hat('*This day is a great fork in your destiny. There is no road-sign set to mark the place of your last chance to turn back. If you refuse one chance, will you not refuse others? It may be that your fate is already sealed, even by doing this one thing.*', 400, 160, { w: 540, size: 27 }),
   inner('Harry', '*But that is not certain.*', 200, 880, { w: 280 }), hat('*That you do not know it for certain may reflect only your own ignorance.*', 500, 1000, { w: 440, size: 26 })], { border: 'none' });
// becoming a memory: the panel fades into the dark on every side
ep.panel(820, mind('void', 'sleep', { hs: 1.6, hy: 0.72 }), [cap('The Hat sighed a terrible, sad sigh.', 44, 30, { w: 560 }), hat('*And so before too long you will become another memory, to be felt and never known, in the next warning that I give…*', 400, 700, { w: 540 })], { border: 'none', frame: 'dissolve', feather: 110, alt: 'The Hat, eyes closed, sighing; the whole panel fades softly into the dark like a memory.' });
ep.panel(760, mind('void', 'talk', { harry: HM('sad') }),
  [inner('Harry', '*If that\'s how it seems to you, why aren\'t you just putting me where you want me to go?*', 250, 100, { w: 380, size: 27 }),
   hat('*I can only put you where you belong. And only your own decisions can change where you belong.*', 215, 585, { w: 340, size: 27 })], { border: 'none' });
ep.panel(560, mind('cold', null, { frost: 0.3, harry: HM('cold', 'stand', { x: 0, y: 60 }), zoom: 0.5 }), [inner('Harry', '*Then this is done. Send me to Ravenclaw, where I belong, with the others of my own kind.*', 400, 100, { w: 580 })], { border: 'none', mood: 'cold' });
// the comedy turn
ep.panel(920, mind('void', 'amused', { hs: 1.6, hy: 0.78 }),
  [hat('*I don\'t suppose you would consider Gryffindor? It\'s the most prestigious House—people expect it of you. And your new friends the Weasley twins are there—*', 400, 150, { w: 520, size: 28 }),
   cap('Harry giggled. Or rather, he felt the impulse to. It came out as purely mental laughter. And after a moment, Harry heard the Hat laughing too: a strange, sad, clothy sound.', 44, 760, { w: 600, size: 25 })], { border: 'none' });
// the hall, meanwhile
ep.setBg('#1a1210');
ep.beat(140, [], { bg: { top: MIND, bottom: '#1a1210' } });
const STAFF = () => HG.staffWall();
ep.panel(900, { cam: { x: 820, y: 500, w: 860 }, bg: () => HG.dais(), actors: [() => HG.stool(1000, 900), { def: harryRobes, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0.1, pose: 'sit', seat: 125, expr: 'asleep' }, HG.hatOn('harry', 'sleep'), { def: mcgonagall, id: 'mcgonagall', x: 600, y: 900, turn: 0.3, pose: 'fists', expr: 'worried' }] },
  [cap('Meanwhile, in the Hall: a silence that had grown shallower as the whispers increased, and then deeper as they gave up and died away. Harry stayed under the Hat for long, long minutes. Longer than all the previous first-years put together. Longer than anyone in living memory.', 44, 34, { w: 610, size: 25 })], { mood: 'candle' });
ep.multi(1000, [
  { x: M, y: 18, w: 752, h: 470, mood: 'candle', art: { cam: { on: ['snape'], fr: 'bust', dx: 1.0, dy: 0.12 }, bg: STAFF, blur: 2, actors: [{ def: snape, id: 'snape', x: 560, y: 900, turn: 0.1, pose: 'hold', expr: 'deadpan', armF: { sh: 22, el: 80, hand: 'fist', under: HG.goblet(4, 30, 1.5, 1) }, armB: { sh: 8, el: -6 } }] } },
  { x: M, y: 502, w: 752, h: 480, mood: 'candle', art: { cam: { on: ['mcgonagall'], fr: 'bust', dx: -1.2 }, bg: () => HG.dais(), blur: 2, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 600, y: 900, turn: 0.2, pose: 'fists', expr: { base: 'horror', sweat: true } }] } },
], [cap('Small metallic sounds came from Snape\'s direction as he idly compacted the remains of what had once been a heavy silver goblet.', 420, 60, { w: 300, size: 24, fixed: true }),
    cap('McGonagall gripped the podium, white-knuckled, certain the Hat was about to demand a whole new House of Doom be built just for Harry Potter. And that Dumbledore would make her do it.', 44, 540, { w: 350, size: 24, fixed: true })]);
ep.setBg(MIND);
ep.beat(140, [], { bg: { top: '#1a1210', bottom: MIND } });
ep.panel(780, mind('void', 'amused', { harry: HM('grin'), hx: 0.76 }),
  [inner('Harry', '*Professor McGonagall said that if the Hat tried to push me into Gryffindor, I should remind you she might be Headmistress some day. At which point she\'d have the authority to set you on fire.*', 400, 110, { w: 580, size: 26 }),
   hat('*Tell her I called her an impudent youngster, and told her to get off my lawn.*', 226, 630, { w: 318 })], { border: 'none' });
ep.panel(580, mind('void', 'amused', { harry: HM('smile') }), [inner('Harry', '*So. Was this your strangest conversation ever?*', 250, 100, { w: 340 }), hat('*Not even close.*', 190, 480, { w: 240 })], { border: 'none' });
ep.panel(620, mind('void', 'stern', { hs: 1.6 }), [hat('*Well. I gave you every possible chance to make another decision. Now it is time for you to go where you belong, with the others of your own kind.*', 400, 200, { w: 540 })], { border: 'none' });
ep.panel(420, mind('void', 'sleep', { hs: 1.6, seed: 31, hx: 0.76 }), [cap('There was a pause that stretched.', 44, 30, { w: 440 }), inner('Harry', '*What are you waiting for?*', 215, 320, { w: 300 })], { border: 'none' });
ep.panel(620, mind('void', 'amused', { hs: 1.6 }), [hat('*I was hoping for a moment of horrified realisation, actually. Self-awareness does seem to enhance my sense of humour.*', 400, 200, { w: 520 })], { border: 'none' });
ep.panel(620, mind('void', null, { harry: HM('think', 'think', { x: -40, y: 60 }), zoom: 0.55 }), [inner('Harry', '*Huh? Oh! You mean my horrified realisation that you\'re going to cease to be conscious once you finish Sorting me?*', 400, 110, { w: 580 })], { border: 'none' });
ep.panel(960, mind('void', 'stern', { hs: 1.6, hy: 0.68 }),
  [hat('*I give up. You\'re too slow on the uptake for this to be funny. So blinded by your own assumptions that you might as well be a rock.*', 400, 140, { w: 520 }),
   hat('*Oh, and you entirely forgot to demand the secrets of the lost magic that created me. And they were such wonderful, important secrets, too.*', 400, 815, { w: 560 })], { border: 'none' });
ep.panel(460, mind('void', null, { harry: HM('angry', 'fists', { x: 0, y: 90 }), zoom: 0.5 }), [inner('Harry', '*You sly little—*', 400, 60, { w: 260 })], { border: 'none' });
ep.panel(560, mind('void', 'amused', { hs: 1.8, hx: 0.5, hy: 1.05 }), [hat('*You deserved it. And this as well.*', 400, 100, { w: 560, size: 34 })], { border: 'none' });
ep.panel(560, mind('void', null, { harry: HM('horror', 'panic', { x: 0, y: 110 }), zoom: 0.55 }), [cap('Harry saw it coming just as it was already too late.', 44, 30, { w: 640 })], { border: 'none' });

// SLYTHERIN!
ep.setBg('#0a1a10');
// the verdict: the Hat is too big for its panel; its tip bursts through the top edge, and the shout is out on the page
const BIGHAT = (ctx) => { const sc = (ctx.h + 150) / 424; return g({ transform: `translate(${ctx.w * 0.47},${ctx.h - 30 - 44 * sc}) scale(${sc})` }, HG.sortingHat(1, { mood: 'shout' })); };
ep.panel(1300, (ctx) => ctx.layer === 'actors' ? BIGHAT(ctx) : rect(0, 0, ctx.w, ctx.h, { fill: '#1f4a35' }) + FX.burst(ctx.w, ctx.h, ctx.w / 2, ctx.h * 0.6, { col: '#9fd79a', op: 0.4, n: 140 }) + BIGHAT(ctx),
  [plain('SLYTHERIN!', 400, 130, { font: "'IM Fell English SC', serif", size: 110, color: '#f6e7c4', w: 780 })], { breakout: 'top', borderColor: '#f6e7c4', borderWidth: 4, panel: { x: M, y: 330, w: 752, h: 950 }, alt: 'The Hat bellows SLYTHERIN! It is so big its tip bursts out through the top of the panel.' });
ep.multi(900, [
  // the Hall lurches: Hagrid and McGonagall split by a tilted seam
  { x: M, y: 18, w: 400, h: 424, shape: (w, h) => `M0,0 L${w},0 L${w - 56},${h} L0,${h}Z`, mood: 'candle', art: { cam: { on: ['hagrid'], fr: 'close' }, bg: STAFF, blur: 3, actors: [{ def: hagrid, id: 'hagrid', x: 1700, y: 900, s: 0.85, turn: -0.2, expr: 'horror' }] } },
  { x: 388, y: 18, w: 388, h: 424, shape: (w, h) => `M56,0 L${w},0 L${w},${h} L0,${h}Z`, mood: 'candle', art: { cam: { on: ['mcgonagall'], fr: 'bust' }, bg: () => HG.dais(), blur: 3, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 600, y: 900, turn: 0.2, pose: 'fallBack', expr: 'horror', lean: -14 }] } },
  { x: M, y: 456, w: 752, h: 426, mood: 'candle', art: { cam: { x: 800, y: 790, w: 1000 }, bg: () => HG.hallTable('r'), actors: [...[1231, 1232, 1233, 1234, 1235].map((sd, i) => ({ def: student(sd, ['g', 'r', 'h', 's', 'r'][i]), x: 250 + i * 280, y: 1050, s: 1.05, turn: 0.2 * (i - 2), pose: i % 2 ? 'panic' : 'armsUp', expr: 'horror' })), () => HG.tableFront()] } },
], [cap('Hagrid gasped in horror.', 40, 30, { w: 300 }), cap('McGonagall staggered.', 470, 30, { w: 280 }), cap('Students screamed. People fell off their benches.', 40, 470, { w: 620 })],
  { alt: 'Reactions: Hagrid, aghast; McGonagall staggering; students screaming.' });
ep.panel(720, { cam: { head: 'snape', hw: 0.19, hx: 0.45, hy: 0.34 }, bg: STAFF, blur: 2, actors: [{ def: snape, id: 'snape', x: 560, y: 900, turn: 0.1, pose: 'sit', expr: 'horror', armF: { sh: 10, el: 30, hand: 'open' } }], over: (e) => { const a = e.anchors.snape; const gx = a.hip[0] + a.hr * 0.7, gy = a.hip[1] - a.hr * 0.1; return HG.goblet(gx + a.hr * 0.55, gy + a.hr * 0.05, a.hr / 45, 1) + FX.sfxText(gx + a.hr * 1.6, gy - a.hr * 0.3, 'CLANK', { size: 60, rot: 10 }); } },
  [cap('Snape dropped the remains of his heavy silver goblet directly into his lap.', 44, 30, { w: 440 })], { mood: 'candle' });
// Harry's horror — mirroring Neville
ep.multi(900, [
  { x: M, y: 18, w: 752, h: 520, mood: 'cold', art: (ctx) => shot({ cam: { on: ['harry'], fr: 'close', dy: 0.3 }, bg: () => HG.dais(), blur: 3, actors: [{ def: harryRobes, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0.05, pose: 'sit', seat: 125, expr: 'horror' }] })(ctx) + FX.frost(ctx.w, ctx.h, 0.7, 50) },
  { x: 400, y: 552, w: 376, h: 330, mood: 'sepia', overlay: (ctx) => FX.memoryEdge(ctx.w, ctx.h), art: { cam: { on: ['neville'], fr: 'close' }, bg: () => S.platform934(), blur: 3, actors: [{ def: neville, id: 'neville', x: 1300, y: 1110, s: 0.95, turn: 0, expr: 'horror' }] } },
], [cap('Harry sat frozen, his life in ruins, wishing wretchedly that he had made any other choices, for any other reasons. That he had done something, *anything* differently, before it was too late to turn back.', 44, 580, { w: 330, size: 24 })],
  { alt: 'Harry\'s face in frozen horror; and, inset, Neville on the platform that morning, wearing exactly the same face.' });
ep.setBg(C.paper);
ep.bleed(1100, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#243a6a' }) + FX.burst(ctx.w, ctx.h, ctx.w / 2, ctx.h * 0.62, { col: '#c9a24a', op: 0.4, n: 140 }) + g({ transform: `translate(${ctx.w / 2},${ctx.h * 0.95}) scale(1.7)` }, HG.sortingHat(1, { mood: 'amused' })),
  [hat('*Just kidding!*', 400, 140, { w: 320, size: 40 }), plain('RAVENCLAW!', 400, 330, { font: "'IM Fell English SC', serif", size: 104, color: '#f6e7c4', w: 780 })], { bg: C.paper, alt: 'The Hat, grinning: "Just kidding! RAVENCLAW!"' });

// the whisper
ep.setBg(MIND);
ep.beat(140, [], { bg: { top: C.paper, bottom: MIND } });
ep.bleed(1100, (ctx) => rect(0, 0, ctx.w, ctx.h, { fill: '#050a06' }) + shot({ cam: { x: 1000, y: 490, w: 760 }, bg: () => HG.dais(), actors: [() => HG.stool(1000, 900), { def: harryRobes, id: 'harry', x: 1000, y: 900, s: 1.1, turn: 0.1, pose: 'sit', seat: 125, expr: { base: 'shock', eyes: { lookX: 0.6 } } }, (e) => g({ transform: `translate(1000,${e.wa.harry.head[1] - e.wa.harry.hr * 2.1}) scale(${e.wa.harry.hr / 66})` }, HG.sortingHat(1, { mood: 'sleep' }))] })(ctx) + rect(0, 0, ctx.w, ctx.h, { fill: '#0a2a10', opacity: 0.55 }),
  [cap('And in the instant Harry lifted the Hat off his head, he heard a tiny whisper, as though from nowhere. Something that sounded oddly like English and a hiss at the same time:', 44, 34, { w: 600, size: 26 }),
   { type: 'hiss', text: 'Salutations from Slytherin to Slytherin: if you would seek my secrets, speak to my snake.', x: 400, y: 1000, w: 640 }],
  { alt: 'As the Hat lifts from Harry\'s head, a green hissing whisper: "Salutations from Slytherin to Slytherin: if you would seek my secrets, speak to my snake."' });

// the Ravenclaw table
ep.setBg(C.paper);
ep.beat(140, [], { bg: { top: MIND, bottom: C.paper } });
const RT = () => HG.hallTable('r');
const RAV = (o = {}) => [
  { def: student(1241, 'r'), id: 'r1', x: 300, y: 1050, s: 1.05, turn: 0.4, expr: 'awe' },
  { def: hermione, id: 'hermione', x: 560, y: 1050, s: 1.1, turn: 0.3, expr: 'worried', ...(o.he || {}) },
  { def: harryRaven, id: 'harry', x: 800, y: 1050, s: 1.1, turn: -0.1, expr: 'blank', ...(o.h || {}) },
  { def: student(1242, 'r'), id: 'r2', x: 1040, y: 1050, s: 1.05, turn: -0.4, expr: 'suspicious' },
  { def: clearwater, id: 'clearwater', x: 1290, y: 1050, turn: -0.4, expr: 'calm' },
  () => HG.tableFront(),
];
ep.panel(820, { cam: { x: 800, y: 760, w: 960 }, bg: RT, actors: RAV({ h: { expr: 'exasperated' } }) },
  [cap('Being at the centre of an extraordinary and curious event and *then* being sorted into Ravenclaw, was closely akin to being dipped in barbecue sauce and flung into a pit of starving kittens.', 44, 34, { w: 620, size: 26 }),
   say('Harry', 'I promised the Sorting Hat not to talk about it. *Yes, really.*', 450, 690, { w: 400, tail: 'harry' })], { mood: 'candle', alt: 'Harry, now in blue-trimmed robes, is mobbed with questions at the Ravenclaw table.' });
ep.panel(620, { cam: { on: ['hermione', 'harry'], fr: 'bust' }, bg: RT, actors: RAV({ he: { expr: 'worried', turn: 0.5 }, h: { expr: 'sad', turn: -0.3 } }) },
  [whisper('Hermione', 'Are you all right? You were under there for *ages.*', 250, 96, { w: 300, tail: [212, 194] }), whisper('Harry', 'I\'m… not sure yet.', 540, 500, { w: 300, tail: 'harry' })], { mood: 'candle' });
ep.panel(760, { cam: { on: ['harry'], fr: 'close' }, bg: RT, blur: 3, actors: RAV({ h: { expr: 'think' } }) },
  [inner('Harry', 'For three seconds, he had been certain that everything was ruined, and that it was his own fault.', 400, 110, { w: 600 }),
   inner('Harry', 'A frightening prank, played on someone for their own good. Because it was clever. Because you could get away with it—', 400, 580, { w: 540 })], { mood: 'candle' });
ep.panel(640, { cam: { on: ['neville'], fr: 'bust', dy: -0.2 }, bg: () => HG.hallTable('h'), blur: 2, actors: [{ def: neville, id: 'neville', x: 800, y: 1050, s: 1.05, turn: 0.3, expr: 'smile', pose: 'stand' }, () => HG.tableFront()] },
  [cap('Across the Hall, at the Hufflepuff table, Neville Longbottom was smiling shyly at the older students making room for him.', 44, 30, { w: 620 })], { mood: 'candle' });
ep.panel(460, { cam: { on: ['harry'], fr: 'eyes' }, bg: RT, blur: 3, actors: RAV({ h: { expr: 'pained' } }) }, [inner('Harry', '*Oh.*', 110, 392, { w: 140, fixed: true })], { mood: 'candle', alt: 'Harry understands.' });
// Harry's handwriting on ruled paper
const ruled = (w, h, step) => FX.notebook(w, h, { fill: '#fbf6e6', top: 40, step, line: '#b9c9d8', lw: 1, margin: 0 });
const scrawl = (x, y, s, fs, a = 'start', col) => FX.scrawl(x, y, s, fs, a, col);
// the to-do list: a real sheet of paper lying on the page (torn edges, a little crooked)
const todo = (lines, strike = []) => (ctx) => {
  let out = ruled(ctx.w, ctx.h, 36) + scrawl(60, 80, 'TO DO', 44);
  lines.forEach((s, i) => { out += scrawl(70, 150 + i * 64, s, 34, 'start', i === lines.length - 1 && !strike.length ? '#2f4f86' : '#2d2a4a'); if (strike.includes(i)) out += line(64, 140 + i * 64, 64 + s.length * 14, 140 + i * 64, { stroke: '#c43a32', 'stroke-width': 3 }); });
  return out;
};
ep.panel(470, todo(['1. Research mind magic. All of it.', '2. Read the titles of every book in the library.', '3. Find out what "speak to my snake" means…']),
  [cap('Harry started a list, the way he always did.', 170, 362, { w: 560, fixed: true })], { shape: 'torn', frame: 'paper', tear: 14, seed: 21, rotate: -1.2, shadow: true, alt: 'Harry\'s to-do list: research mind magic; read every book title in the library; find out what "speak to my snake" means…' });
ep.panel(820, { cam: { head: 'harry', hw: 0.38, hx: 0.5, hy: 0.46 }, bg: RT, blur: 2, actors: RAV({ h: { expr: 'focus', pose: 'think' } }) },
  [inner('Harry', 'Seeking out Slytherin\'s secrets seemed an awful lot like the sort of thing where, years later, you would look back and say: *"And that was where it all started going wrong."*', 400, 130, { w: 560, size: 27 }),
   inner('Harry', 'And he would wish desperately to go back in time, and make a different choice.', 400, 745, { w: 520 })], { mood: 'candle' });
ep.panel(780, { cam: { on: ['harry'], fr: 'close' }, bg: RT, blur: 3, actors: RAV({ h: { expr: 'smile' } }) },
  [inner('Harry', '*Wish granted.* Twenty years from now was when he\'d wish it. And twenty years before twenty years from now happened to be *right now.*', 400, 120, { w: 560, size: 27 }),
   inner('Harry', 'Altering the distant past was easy. You just had to think of it at the right time.', 400, 660, { w: 560 })], { mood: 'candle' });
ep.panel(520, todo(['1. Research mind magic. All of it.', '2. Read the titles of every book in the library.', '3. Find out what "speak to my snake" means…', '3. Tell Professor McGonagall about the whisper.', '0. Apologise to Neville Longbottom.'], [2]),
  [], { shape: 'torn', frame: 'paper', tear: 14, seed: 21, rotate: 0.8, shadow: true, alt: 'The list, revised: item 3 crossed out and replaced with "Tell Professor McGonagall about the whisper." A new item at the top: "0. Apologise to Neville Longbottom."' });
ep.panel(850, { cam: { on: ['mcgonagall', 'dumbledore'], fr: 'waist', dy: 0.3 }, bg: STAFF, actors: [{ def: mcgonagall, id: 'mcgonagall', x: 640, y: 900, turn: 0.1, pose: 'stand', expr: 'calm' }, { def: dumbledore, id: 'dumbledore', x: 900, y: 900, turn: 0, expr: { base: 'warm', eyes: { sparkle: true } } }, () => HG.staffTable()] },
  [cap('He looked up at the High Table. Professor McGonagall happened to be looking back at him.', 44, 34, { w: 600 }),
   cap('She didn\'t know yet that she was about to be trusted with something really important. But she would.', 44, 700, { w: 610, fixed: true })], { mood: 'candle' });
ep.panel(520, (ctx) => {
  const w = ctx.w;
  return ruled(w, ctx.h, 34) + scrawl(60, 100, 'ANTI-DARK-LORD-HARRY PROGRAMME', 36) + line(60, 120, w - 60, 120, { stroke: '#2d2a4a', 'stroke-width': 2 })
    + scrawl(60, 210, 'Harry James Potter-Evans-Verres', 38) + scrawl(w - 80, 210, '+1', 60, 'end', '#2f7a3a') + scrawl(60, 300, '(first entry)', 30, 'start', '#8a7d68');
}, [cap('Harry awarded himself one point.', 290, 372, { w: 440, fixed: true })], { shape: 'torn', frame: 'paper', tear: 14, seed: 8, rotate: -0.7, shadow: true, alt: 'A new ledger: "Anti-Dark-Lord-Harry Programme": Harry James Potter-Evans-Verres, +1. (first entry)' });

// Quirrell
ep.setBg('#1a1210');
ep.beat(140, [], { bg: { top: C.paper, bottom: '#1a1210' } });
ep.panel(780, { cam: { on: ['dumbledore'], fr: 'waist', dx: -1.3, dy: 0.2 }, bg: STAFF, actors: [{ def: dumbledore, id: 'dumbledore', x: 900, y: 900, turn: -0.2, pose: 'present', expr: 'smile' }, () => HG.staffTable()] },
  [say('Dumbledore', 'And finally, I extend my greatest thanks to Quirinus Quirrell, for heroically agreeing to undertake the position of Defence Against the Dark Arts Professor.', 270, 140, { w: 390, size: 27 }),
   say('Dumbledore', 'I now yield the floor to Professor Quirrell, who would like to say a few words.', 240, 540, { w: 360 })], { mood: 'candle' });
const QL = (o = {}) => ({ def: quirrell, id: 'quirrell', x: 1000, y: 900, turn: 0, pose: 'slump', expr: 'twitch', ...o });
ep.panel(700, { cam: { on: ['quirrell'], fr: 'waist', dy: -0.6 }, bg: () => HG.dais(), actors: [QL()], over: (e) => FX.doom(e.w, e.h, 12) },
  [cap('The thin, nervous man from the Leaky Cauldron made his way to the podium, glancing fearfully in all directions.', 44, 34, { w: 440 }),
   say('Quirrell', 'Ah… ah…', 650, 440, { w: 180 })], { mood: 'candle' });
ep.panel(460, { cam: { on: ['r1'], fr: 'close' }, bg: RT, blur: 3, actors: RAV() }, [whisper('Older student', 'Oh, great. Looks like another *long* year in Defence class…', 400, 100, { w: 420 })], { mood: 'candle' });
ep.bleed(1000, { cam: { on: ['quirrell'], fr: 'bust' }, bg: () => HG.dais(), blur: 2, actors: [QL({ pose: 'stand', expr: { base: 'coldSmile', eyes: { style: 'normal', open: 0.8 } } })], over: (e) => FX.doom(e.w, e.h, 14) },
  [say('Quirrell', 'Salutations, my young apprentices.', 400, 110, { w: 400 }),
   say('Quirrell', 'We all know Hogwarts suffers a certain *misfortune* in its selections for this position. No doubt many of you are already wondering what doom shall befall me this year. I assure you, that doom is not to be my incompetence.', 400, 750, { w: 560, size: 27 })], { mood: 'candle', alt: 'Quirrell straightens, and speaks in a dry, perfectly confident voice.' });
ep.panel(1040, { cam: { on: ['quirrell'], fr: 'close' }, bg: () => HG.dais(), blur: 3, actors: [QL({ pose: 'stand', expr: 'smug' })] },
  [say('Quirrell', 'I intend that every one of you will always remember this year as the *best* Defence class you have ever had. You are my long-awaited students, and you *will* do your *very* best.', 400, 160, { w: 560, size: 27, fixed: true }),
   say('Quirrell', 'I would add some sort of dreadful threat, like "Otherwise you will suffer horribly". But that would be so clichéd, don\'t you think? I pride myself on being more imaginative than that.', 400, 862, { w: 530, size: 26, fixed: true })], { mood: 'candle' });
ep.panel(760, { cam: { on: ['harry'], fr: 'close' }, bg: RT, blur: 3, actors: RAV({ h: { expr: { base: 'teary', eyes: { lookX: 0.4 } } } }), over: (e) => FX.doom(e.w, e.h, 16) },
  [inner('Harry', 'The precise tones reminded him very much of a lecturer at Oxford. And it was only starting to hit home that he wouldn\'t see his home, or his Mum, or his Dad, until Christmas.', 400, 130, { w: 560, size: 27 }),
   inner('Harry', 'That must be why his chest felt so strange.', 400, 620, { w: 600 })], { mood: 'candle' });
ep.panel(820, { cam: { on: ['quirrell'], fr: 'knees', dy: -0.9 }, bg: () => HG.dais(), actors: [QL({ pose: 'slump', expr: 'twitch', lean: 18 })] },
  [cap('Then the vigour drained out of him. His mouth gaped as though he\'d found himself facing an unexpected audience, and he shuffled back to his seat, hunched over as if about to implode.', 44, 34, { w: 480, size: 26 })], { mood: 'candle' });
ep.panel(560, { cam: { on: ['harry', 'r2'], fr: 'bust' }, bg: RT, actors: RAV({ h: { turn: 0.4, expr: 'suspicious' } }) },
  [whisper('Harry', 'He seems a little odd.', 250, 100, { w: 240 }), whisper('Older student', 'Meh. You ain\'t seen nothin\'.', 560, 420, { w: 260 })], { mood: 'candle' });

// the last image
ep.setBg('#0a1020');
ep.beat(140, [], { bg: { top: '#1a1210', bottom: '#0a1020' } });
// the last image has no edges: the enchanted sky fades out into the page, over the reader too
ep.panel(1500, (ctx) => {
  const w = ctx.w, h = ctx.h;
  let out = HG.enchantedCeiling(0, 0, w, h * 0.8, 77) + HG.floatingCandles(0, h * 0.05, w, h * 0.6, 60, 44, 0.9) + rect(0, h * 0.9, w, h * 0.1, { fill: '#2a1f18' });
  out += shot({ cam: { x: 800, y: 272, w: 1100 }, actors: [...[1251, 1252, 1253].map((sd, i) => ({ def: student(sd, 'r'), x: 300 + i * 520 + (i > 0 ? 200 : 0), y: 1060, s: 1.05, turn: -0.5 + i * 0.4, expr: 'smile' })), { def: harryRaven, id: 'harry', x: 780, y: 1060, s: 1.2, turn: 0.1, pose: 'stand', expr: { base: 'awe', eyes: { lookY: -1, sparkle: true } } }, { def: hermione, id: 'hermione', x: 560, y: 1060, s: 1.15, turn: 0.4, expr: { base: 'smile', eyes: { lookX: 1 } } }, () => HG.tableFront()] })(ctx);
  return out;
}, [capC('In a back garden in Oxford, not so long ago, he had held a letter up to an empty sky and shouted, and nothing had answered.', 400, 110, { w: 540 }),
    capC('Now he sat at a long table among the others of his own kind, under a ceiling full of stars.', 400, 1360, { w: 540 })],
  { x: 0, w: 800, pad: 0, ph: 1500, border: 'none', frame: 'dissolve', feather: 90, alt: 'Final image, with no frame edges (the starry ceiling fades out into the page on every side): Harry at the Ravenclaw table beside Hermione, among other students, gazing up at the enchanted ceiling full of stars and floating candles.' });
// the watcher: the panel is the shape of an eye
ep.panel(640, { cam: { head: 'quirrell', hw: 0.8, hx: 0.5, hy: 0.36 }, bg: STAFF, blur: 3, actors: [QL({ x: 1140, pose: 'stand', expr: { base: 'calm', eyes: { style: 'cold', open: 0.7, lookX: -0.5 } } })], over: (e) => FX.doom(e.w, e.h, 18) },
  [cap('And at the High Table, the new Defence Professor was watching him.', 44, 30, { w: 440 })], { mood: 'candle', shape: 'eye', borderColor: '#8a7d68', panel: { x: M, y: 170, w: 752, h: 440 }, alt: 'An eye-shaped panel: Quirrell\'s eyes, steady and cold, watching Harry.' });
ep.setBg(C.paper);
ep.beat(160, [], { bg: { top: '#0a1020', bottom: C.paper } });
ep.beat(460, [plain('End of Book One', 400, 150, { font: "'IM Fell English SC', serif", size: 40, color: '#3a2a20' }), plain('*The story continues…*', 400, 230, { font: "'IM Fell English', serif", size: 28, color: '#5a4032' })],
  { over: () => g({ transform: 'translate(400,340)' }, K.candle(0, 20, 1.6, true)) });
export default ep;
