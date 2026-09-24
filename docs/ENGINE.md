# Engine Guide — how to make more episodes

Everything is drawn by code: SVG composed in Node, rasterised in headless Chromium (Playwright),
encoded to WebP with sharp. No image assets are downloaded; fonts are SIL-OFL (via @fontsource).

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
| `engine/bg/kit.js` | furniture/architecture: bookcases (procedural books), windows w/ rain, fireplace, walls… |
| `engine/bg/oxford.js` | Verres-Evans house locations |
| `engine/props/props.js` | envelope, wax seal, letters, books, wand, quill, cat, owl, teacup, galleon |
| `engine/fx/fx.js` | burst lines, frost (the cold), doom (Quirrell), sparkles, physics drain, zebras… |

## Conventions

- **World units:** an adult ≈ 560 tall, kids are drawn at `s: 1.1` so they read at ~400.
  Interior floors sit at y = 900; actors' feet at y ≈ 990–1050 (in front of the wall line).
- **Facing:** characters face screen-right at `turn > 0`, left at `turn < 0`. "F" limbs are
  near-side (screen-left shoulder when facing right), "B" limbs far-side. To raise or point an
  arm *away from the face*, use the **B** arm with a positive angle (see `point`, `wave`,
  `wandUp`). Angles are degrees from straight down, positive toward the facing direction.
- **Actor ids = lower-cased speaker names** (`harry`, `mcgonagall`, `dad`, `mum`). Then
  `say('Harry', text, x, y)` gets an automatic tail to Harry's head. Tails are dropped
  automatically when the balloon is far below the speaker's head.
- **Lettering sizes:** dialogue 31px at 800-wide tiles (≈15px on a phone). Don't go below 25px.
- **Moods:** `warm` (lamplit interiors), `candle` (night interiors), `rainy`, `night`, `dusk`,
  `cold` (Harry's dark side — pair with `FX.frost`), `sepia` (memories — pair with `FX.memoryEdge`).
- **The cold motif:** expression `cold` (flat lids, pinprick pupils), mood `cold`, frost overlay,
  and `cold()` balloons (angular, pale blue, small caps). Use only when Harry's anger turns to
  calculation. See ART_BIBLE.md.
