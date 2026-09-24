# Engine Guide — how to make more episodes

Everything is drawn by code: SVG composed in Node, rasterised in headless Chromium (Playwright), encoded to WebP with sharp. No image assets are downloaded; fonts are SIL-OFL (via @fontsource).

## Commands

```sh
npm install && npx playwright install chromium
node engine/render.mjs ep03 --png            # preview every tile of an episode → scratch/ep03-NNN.png
node engine/render.mjs ep03 --png 4-9,12     # preview a subset
node engine/contact.mjs ep03 440 2600        # stack previews into scratch/sheet-ep03-NN.png for review
node engine/render.mjs ep03                  # final render → site/ep03/NNN.webp + manifest.json
node engine/render.mjs cover --cover         # site/cover.webp
node engine/build-site.mjs                   # regenerate all site HTML from episodes/catalog.js
```

Improving the rig or a background re-renders everywhere: just re-run the episode renders.

## Layout

| Path | What |
|---|---|
| `engine/core/svg.js` | string-SVG helpers, splines, tapered strokes, seeded RNG, colour utils |
| `engine/core/palette.js` | the world palette + panel "moods" (warm, candle, rainy, night, cold, dusk, sepia) |
| `engine/core/filters.js` | shared SVG filters: hand-drawn wobble, paper grain, mottle, glows, blurs |
| `engine/core/layout.js` | composes a *tile* (strip of the scroll): gutter, panels (clip, mood, grain, border), lettering |
| `engine/core/stage.js` | in-browser lettering: measures text, balances lines, draws balloons & tails |
| `engine/core/scene.js` | `shot()`: camera onto a world; auto-framing (`cam: {on:[ids], fr:'close'…}`) |
| `engine/core/dsl.js` | `Episode` builder + lettering helpers (`say`, `shout`, `cap`, `inner`, `cold`, …) |
| `engine/chars/rig.js` | the puppet: skeleton, POSES, limbs, robes, hands, head, glasses |
| `engine/chars/face.js` | eyes, brows, mouths, blush, sweat, tears, veins |
| `engine/chars/expressions.js` | named expressions (see list) |
| `engine/chars/hair.js` | hairstyles; `keyed()` = hand-authored front/¾ keyframes (Harry, McGonagall, Mum) |
| `engine/chars/cast.js` | character designs; `makeExtra(seed, opts)` for crowds |
| `engine/chars/cast2.js` | Book Two cast: House-robed first-years, older Slytherins, Hooch, Binns, Dumbledore in pyjamas, portraits, the dojo |
| `engine/bg/kit.js` | furniture/architecture: bookcases (procedural books), windows w/ rain, fireplace, walls… |
| `engine/bg/oxford.js` | Verres-Evans house locations |
| `engine/bg/castle.js` | Book Two: Hogwarts from the inside (dorm, corridors, offices, classrooms, Defence hall, dojo, deep space) |
| `engine/props/props.js` | envelope, wax seal, letters, books, wand, quill, cat, owl, teacup, galleon |
| `engine/props/props2.js` | Book Two props: Time-Turner, pies, the Cloak, Remembrall, the rock, Fawkes, Pioneer 11… |
| `engine/core/frames.js` | panel shapes (arch, keyhole, torn, burst…) and frame styles (stone, gilt, wood, glow) |
| `episodes/b2.js` | shared Book Two staging: `dayBeat`, `header`, `note`, standard sets |
| `engine/fx/fx.js` | burst lines, frost (the cold), doom (Quirrell), sparkles, physics drain, zebras… |

## Conventions

- **World units:** an adult ≈ 560 tall, kids are drawn at `s: 1.1` so they read at ~400. Interior floors sit at y = 900; actors' feet at y ≈ 990–1050 (in front of the wall line).
- **Facing:** characters face screen-right at `turn > 0`, left at `turn < 0`. "F" limbs are near-side (screen-left shoulder when facing right), "B" limbs far-side. To raise or point an arm *away from the face*, use the **B** arm with a positive angle (see `point`, `wave`, `wandUp`). Angles are degrees from straight down, positive toward the facing direction.
- **Actor ids = lower-cased speaker names** (`harry`, `mcgonagall`, `dad`, `mum`). Then `say('Harry', text, x, y)` gets an automatic tail to Harry's head. Automatic tails are dropped when the speaker is in a different panel (see Lettering rules below).
- **Lettering sizes:** scripts write dialogue at 31px on the 800-wide tile. At render the stage scales balloon and caption text by 36/31 with a 34px floor (about 18px on a phone); sfx, titles and `plain` text keep the size they are given.
- **Moods:** `warm` (lamplit interiors), `candle` (night interiors), `rainy`, `night`, `dusk`, `cold` (Harry's dark side — pair with `FX.frost`), `sepia` (memories — pair with `FX.memoryEdge`).
- **The cold motif:** expression `cold` (flat lids, pinprick pupils), mood `cold`, frost overlay, and `cold()` balloons (angular, pale blue, small caps). Use only when Harry's anger turns to calculation. See ART_BIBLE.md.

## Lettering rules (`engine/core/layout.js`, `engine/core/stage.js`)

- **Anchors.** A balloon's `x, y` is its centre by default (`anchor: 'c'`). Other anchors: `'tc'` (top centre) and `'bc'` (bottom centre), plus the corners `'tl'`, `'tr'`, `'bl'`, `'br'`. `cap()` defaults to `'tl'`. Use `'tc'` for a balloon hanging from the top of a panel and `'bc'` for one sitting on the bottom, so it grows away from the edge as the text wraps.
- **Balloons stay in their panel.** A balloon that isn't `fixed` is kept inside the bordered panel that contains its centre (6px margin) while the stage nudges it off faces and other balloons. Bleed and borderless panels don't count as frames. `fixed: true` balloons are never moved.
- **Tails.** An automatic tail (speaker named, no `tail` given) is dropped when the balloon sits in a different panel from the speaker's head. A balloon in the gutter keeps its tail only if it is within 2.6 head-radii below the head. Give `tail: [x, y]` or `noTail: true` to override.
- **Hyphenated words don't break.** Words like Boy-Who-Lived or Nine-and-Three-Quarters are wrapped in no-wrap spans, so a line never ends on a hyphen, unless the word alone is wider than the balloon may be (He-Who-Must-Not-Be-Named in a shout); then it may break at its hyphens.
- **Speaker names are loose.** `say('Professor Quirrell', …)` finds actor id `quirrell`, `'Mrs Figg'` finds `figg` (titles like Mr/Mrs/Professor/Madam are dropped). If the same id appears in two panels of one tile, the first panel wins: use `tail: 'snape@1'` to pick panel 1.
- **Far tails.** Tails are a fixed short length, except when the speaker's head is far from the balloon: then the tail reaches part of the way (up to 150px) instead of stubbing at a bystander.
- **Shapes.** Shouts have a boxier spiky outline whose spike depth doesn't grow with width. `shape: 'box'` on a `say`/`whisper` gives a rounder rectangle that hugs long text (use it for long speeches in narrow panels; an ellipse is ~50px wider each side than its text). Speech balloons of 5+ lines automatically get squarer corners (same size) so their first and last lines keep a margin. A caption with `bg: 'transparent'` draws no shadow or inner rule.
- **Warnings.** `render.mjs` prints lettering warnings per tile as `tile:warning,…`, where `i` is the balloon's index in the tile:
  - `border:i`: balloon *i*'s outline (tail included) crosses the frame of the panel holding its centre by more than 12px.
  - `outline-edge:i`: balloon *i*'s outline goes past the edge of the tile itself.
  - `edge:i`: the text box is within 2px of the tile edge.
  - `overlap:i/j`: two balloons overlap by more than 6px.
  - `face:i`: balloon *i*'s text covers a face visible in its panel. Almost always a real problem. `border` and `outline-edge` skip sfx, `plain`, `title`, `note` and big-Hat lettering.

## Panel frames (`engine/core/frames.js`)

Why and when: `docs/ART_BIBLE.md` → "Panel frames" (about 1 in 5 panels, only where it deepens immersion).

- **Shape:** `shape` on any panel. In `ep.panel`/`ep.bleed` pass it in the panel options (4th argument): `ep.panel(900, shot, bubbles, { shape: 'arch', frame: 'stone' })`. In `ep.multi` put it on the panel object. Shapes: `arch` (round top; `spring` = where the curve starts, 0-1 of h), `gothic` (pointed arch), `oval`, `circle`, `eye` (almond), `keyhole`, `diamond`, `slant` (`slant` px, + leans right), `cut` (diagonal top/bottom: `cutTop`, `cutBottom` px), `torn` (`seed`, `tear`), `burst` (`points`, `seed`), `jag` (jagged rectangle: `jag` tooth depth, `seed`), `cloud`, `screen`, plus the older `poly` (`pts` as 0-1 fractions) and a function `(w, h, p) => pathD`.
- **Frame style:** `frame`: `ink` (default), `gilt`, `stone`, `wood`, `glow` (`glow` colour), `paper`, `double`, `none`, `dissolve` (no line; every edge fades softly into the page, `feather` px). `borderColor` / `borderWidth` tune the ink line. Thick styles (stone, gilt, wood) eat ~10px inside the edge: keep balloons clear of it.
- **Cut-out:** `ep.cutout(h, shot, bubbles, opts)`: no frame, no background (the shot's `bg` is skipped), a soft shadow at each actor's feet (`ground: false` on the shot to drop it). `fg`, `mid`, `behind` and `over` still draw. Frame the camera so the whole figure (or the part you want) fits: nothing is clipped, so anything outside the panel box spills onto the page. Balloons are free-floating (no panel frame to stay inside).
- **Breakout:** `breakout: 'top' | 'bottom' | 'left' | 'right'` (or an array) redraws the actors, unclipped, beyond that edge, so a hat, an arm or a leaping figure crosses the frame line. Only the characters break out, not the background. `breakoutOnly: ['harry']` limits it to the named actors. Aim the camera so the part that should cross actually extends past the edge.
- **Inset / overlap:** in `ep.multi`, later panels draw on top of earlier ones; give an inset `shadow: true`.
- Lettering treats shaped panels by their bounding box (the `border:i` warning), so keep balloons well inside the visible shape of arches, ovals and keyholes by eye.

## Camera, poses and effects (engine pass, after Book Two)

- **Aim at a head:** `cam: { head: 'harry', hw: 0.34, hx: 0.5, hy: 0.42 }` puts Harry's head centre at (hx, hy) as fractions of the panel, with the head hw × the panel width across. Use it instead of `fr: 'close'/'bust'` in narrow or very tall panels, and to leave a set amount of room for a balloon. (Allow for tall hats yourself: Dumbledore's hat rises well above his head centre.)
- **Tilt:** any cam may add `roll` in degrees for a Dutch angle, e.g. `{ on: ['snape'], fr: 'bust', roll: -8 }`. The picture zooms just enough to hide empty corners; anchors and tails follow the tilt.
- **Rotation:** an actor's `rot` turns the whole figure about its feet, and now its anchors (head, mouth, hands) turn too, so tails and cameras aim correctly. Pose `'lie'` lies a character down (head left; `rot: 90` for head right).
- **Arms:** `armB: { front: true }` draws the far arm in front of the body (reaching across the chest, a wand held in front). Anchors `handF` / `handB` give the hands' positions for aiming bolts or placing props. In wide sleeves the hand now comes out past the cuff (`outfit.handOut` tunes it). Dark sleeves get a faint light rim (only on arms drawn in front of the body) so arms read against dark robes. Folded arms (elbow bent ~90-125°) keep the hand at the cuff. `armX.prop` is drawn on top of the sleeve, at the drawn hand. Stock poses `crossArms`, `think` and `chin` fold the far arm across the body (drawn in front); `facepalm` puts the palm on the face.
- **Faces:** `glasses: false` (or `noGlasses: true`) on an actor hides their glasses. Mouth `'grimace'` = `'grit'`. The blue "cold" skin tint only applies to Harry (his dark side); set `coldTint: true` on another character's def to allow it. A deep bow no longer turns the face sideways.
- **Effects behind characters:** `behind: (e) => FX.burst(e.w, e.h, …)` on a shot draws panel-space effects over the background but behind the actors (speed lines and bursts no longer cross faces). `under` is beneath the whole background and `over` is on top of everything, as before.
- **Which tiles use a pose:** `node work/tilesfor.mjs ep04 crossArms,facepalm --props` lists the tile numbers that draw a character in those poses (or holding a prop). `python3 work/wordcheck.py ep04` checks an episode's lettering against git HEAD.
- **Previews:** `render.mjs --file work/tests/foo.js --png` writes `scratch/foo-NNN.png`. Each render uses its own stage file, so several renders can run at once.

## Book Two modules

### `engine/bg/castle.js`

World coordinates as everywhere: floor at `FLOOR` (900), usable width about -200 to 2600. Also exports `HOUSE` colours.

- **Shared bits:** `archWindow(x, y, w, h, {sky})` (`'day' | 'dusk' | 'night' | 'high'` (clouds below) `| 'rain'`), `torch`, `portraitFrame` (a frame with painted scenery inside), `invisible(x, y, s)` (Harry under the Cloak: a faint boy-shaped shimmer).
- **Ravenclaw dorm:** `ravenclawDorm({time: 'night' | 'morning' | 'late', empty, harryNote, quiet, clock, binClue, …})`, Harry's bed at x = 1100 with `dormBlanket()` as the foreground blanket; pieces `fourPoster`, `bedBlanket`, `quieter(level)`, `nightstand`, `alarmClock(t = [h, m])`, `trunkBox`, `cabinet`, `bin(clue)`. `trunkCavern()` is the trunk's cavern level.
- **Corridors:** `corridor({portraits, rubble, dim, windows, torches})`, `staircases({swing, flights})`, `gargoyleCorridor({open})`, `greenStudy()`.
- **Offices:** `mcgonagallOffice()` with `mcgDesk`, `tartan`; `dumbledoreOffice({bird: 'chicken' | 'fire' | 'ash' | 'egg' | 'phoenix' | 'none', rack, door, doorOpen, sky})` with `dumbledoreThrone`, `blackDesk`, `stoolFront`.
- **Classrooms:** `classroom({windows, board, shelves, wall, sky})`, `blackboard(x, y, w, h, {lines})`, `deskRow`, `waterGlass(state: 'warm' | 'cool' | 'ice')`, `charmsRoom`, `transfigRoom` with `teacherDesk`, `greenhouse`, `potionsRoom({cupboard: 'open' | 'closed'})` with `cauldronRow` and `snapeDesk`, `historyRoom`, `flyingField({brooms, sunX})` with `broomUnder(id)` for a seated rider.
- **Portraits as people:** paint `portraitCanvas(x, y, w, h)` in the background, put the painted person as a normal rigged actor at the same spot, then put `wallWithHole(BG, x, y, w, h)` in `actors` *between* the painted actor and the living ones: `actors: [LADY, CS.wallWithHole(BG, x, y, w, h), HARRY]`. It redraws the background with a hole over the canvas plus the gilt frame (`portraitFrameOnly`), so the painted person is framed and still gets anchors and tails.
- **The Defence hall:** `defenceStage({desk, banner, mat, spheres})` is the view from the seats (the white marble stage, the dais, desk at x = 1000, the third door at the back); `defenceDesk`. `defenceTiers({rows})` is the view from the stage up at the seats. Row *k*'s floor is at `FLOOR - k * ROW` (`ROW` = 190); seat actors there with pose `'sit'`, then draw `tierFront(k, {screens, lit, x0, x1})` after that row's actors and before the rows in front. `screens` lists x positions of desk screens; `lit` shows `quirrellIcon` on them.
- **Ep 22–23:** `dojo({empty})` (the sepia flashback; `empty` adds the fallen practice sword), `restRoom()` (the room behind the third door), `deepSpace({seed, k, disc, discX, discR})`: the star field and Milky Way. `k` scales star size (above 1 for wide shots); `disc: false` hides the small marble circle, `discX`/`discR` place and size it. (The comment mentions `o.room` for fading the classroom in; it isn't implemented.)

### `engine/chars/cast2.js`

Book Two designs, built from `cast.js` body types. House robes via `HOUSE` colours.

- Regulars in House robes: `harryRaven`, `harryPJ` (pyjamas for the Game morning), `hermioneRaven`, `nevilleHuff`, `dracoSly`.
- First-years: `ernie`, `terry`, `anthony`, `padma`, `michael`, `dean`, `zabini`, `crabbe` (muscle), `goyle` (balanced stance).
- Older Slytherins: `derrick`, `slyTeen(seed)`, `conscience` (the one who says "Stop"; missing in Ep 22).
- Staff: `hooch`, `binns` (render with low opacity), `dumbledorePJ` (three layers of pink pyjamas, squashed-mushroom hat).
- Portraits: `oldLady`, `flubberwalt` (the fish hat), `aristocrat`.
- Dojo flashback: `master`, `dojoStudent(seed)`, `youngQuirrell`.
- Fred, George, Snape, Flitwick, Sprout and Quirrell are in `cast.js`.

### `engine/props/props2.js`

Drawn centred at (0, 0), scaled by transform, like `props.js`.

- Time: `timeTurner(s, {shell, glow})`.
- The Game: `pie(s, 'cherry' | 'blueberry')`, `splat`, `slip` (a blank note), `cerealBox`, `cerealBar`, `tinyChocolate`, `giftBox`, `cloak(w, h)`.
- Classes: `match(s, silver)`, `needle`, `pig`, `textbookPage('dementor' | 'victim' | 'dead')`, `deskScreen`, `targetSphere`, `bolt(x1, y1, x2, y2)` (the red Simple Strike Hex), `broom`, `remembrall(s, {red})`.
- Dumbledore's office: `rock`, `potionsBook`, `chicken`, `egg`, `phoenix(s, {fly})`, `instrument('blorple' | 'dial8' | 'wibblers')`.
- Friday: `cake(s, n)` (n unlit candles), `sign(lines)`, `marker`, `ring`, `mat`, `bokken`.
- `pioneer(s, {glint})`: Pioneer 11 with its golden plaque; `glint` adds the wrongness shimmer.

### `episodes/b2.js`

- `dayBeat(ep, day, specific, {h, color, sub, bg})`: the ch. 17-style opener ("Thursday." then the small italic "If you wanted to be specific…"). Every Book Two episode starts with one.
- `header(ep, chapterWord, title, {book, h})`: book line, "CHAPTER …", and title.
- `note(text, x, y, {kind: 'hand' | 'quill', w, size, align, rot})`: a Game note lettered on paper. `'hand'` is Harry's pencil (Caveat, left-aligned); the default is the Quotes Quill's regular print (centred). Always `fixed`.
- `RT()` draws the Ravenclaw table in the Great Hall; `DORM(opts)` gives a `bg` function for the Ravenclaw dorm (`CS.ravenclawDorm(opts)`).

