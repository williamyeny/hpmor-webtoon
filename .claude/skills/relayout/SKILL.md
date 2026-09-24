---
name: relayout
description: review the layout of the specified panel(s) and fix them as needed.
---

Your job is to make sure the layout of the panel(s) looks perfect. Don't forget: this is a medium for phones, which demands extra clarity.

## Where things are

- **Episode scripts:** `episodes/epXX.js` (Book Two helpers in `episodes/b2.js`). Each `ep.panel` / `ep.bleed` / `ep.multi` / `ep.beat` / `ep.cutout` / `ep.tile` call makes one tile, numbered in order from 1.
- **Rendered tiles:** `site/epXX/NNN.webp`, listed in `site/epXX/manifest.json`. Each tile's `alt` there includes its balloon text, so searching the manifest for a line finds its tile number.
- **Reference:** `docs/ENGINE.md` (all options: cameras, poses, balloons, frames, warnings) and `docs/ART_BIBLE.md` (look, lettering, page rhythm, panel frames).
- **Engine code, if a fix belongs there:**
  - `engine/core/layout.js`: tile composition, balloon placement and tails.
  - `engine/core/stage.js`: in-browser lettering, balloon shapes and the warnings.
  - `engine/core/scene.js`: cameras.
  - `engine/core/frames.js`: panel shapes and frame styles.
  - `engine/chars/rig.js`: characters and `POSES`.

## How to check

Look directly at the .webp images themselves.
- Whole episode at a glance: `node engine/contact.mjs epXX 300 2600` writes overview sheets to `scratch/sheet-epXX-NN.png`.
- Quick previews while iterating: `node engine/render.mjs epXX --png 5-9` (or `--png 3,7,12`) writes `scratch/epXX-NNN.png` without touching `site/`.
- Several tiles side by side: `node work/stack.mjs scratch/out.png a.png b.png c.png --w 700`. To zoom in on a detail, crop with sharp (e.g. `sharp(f).extract({left, top, width, height}).resize({width: 500})`).
- Every render prints `LETTERING WARNINGS epXX: 12:face:0,border:1 | …` (tile number, then warning:balloon index):
  - `face`: text covers a visible face.
  - `border`: an outline crosses its panel frame by more than 12px.
  - `outline-edge`: an outline runs past the tile edge.
  - `overlap`: two balloons overlap.
  - `edge`: text is within 2px of the tile edge.
- Tiles that use a given pose or hold a prop: `node work/tilesfor.mjs epXX crossArms,facepalm --props`.

## What to check
 
**Overlaps**
- Balloons and captions don't cover anything important, like other balloons or captions, faces (hair is ok, but a 100% opacity element on the face itself is a no-go), or key action.
- Characters don't overlap themselves wrongly, like an arm awkwardly twisted behind their back.
- Nothing else overlaps in a way that looks wrong.
**Text**
- Stays inside its balloon or caption.
- Has comfortable space around it inside the balloon. Balloons also need space from everything else: even if nothing technically overlaps, things shouldn't nearly touch. At the same time, there shouldn't be an awkwardly large amount of visual padding in a container, e.g., on the right side of a left-justified text container (this could be fixed by tweaking the container size and repositioning the container as needed).
- Text is easy to read, with good contrast. No awkward line breaks, e.g., no single word alone on a paragraph's last line (this could be fixed by the container size tweak above). Text is appropriately left-justified or center-justified. 
**Clipping**
- Balloons and captions aren't cut off by the edge of the panel.
**Empty space**
- Screen real estate is at a premium. Avoid dead space; the visual weight should be roughly equal across a panel. Narrowing the shot may help.
**Details**
- Make sure details are easy to see, not just text! Again, narrowing the shot may help.
**Frames**
- Could this panel's frame pull the reader deeper into the scene? About 1 in 5 panels should be non-standard: shaped by the scene (an archway the characters walk through, a keyhole, a portrait's gilt oval), shaped by the feeling (a slant for a lurch, a burst for a shock), a frameless cut-out of a character or object on the bare page, or a character breaking out over the frame edge. See `docs/ART_BIBLE.md` → "Panel frames" and `docs/ENGINE.md` → "Panel frames".
- Never at the cost of readability, flow or immersion: a plain rectangle is right for most dialogue. Don't repeat the same trick back to back.
- For special frames already there: balloons stay inside the visible shape (arches and ovals are narrower at the top), and thick frames (stone, gilt, wood) don't cover faces or text.
**Also**
- Balloon tails point at the right speaker.
- Balloons read in a sensible order (left to right, top to bottom).

There are exceptions to the rule, especially for stylistic reasons. Use your judgement for the final call.

If there is an issue that you've noticed and isn't in the above section, feel free to update this skill by adding it to the list (it should be its own commit).

## How to fix

Move the elements around, resize them, etc. Change the virtual camera -- "pan" up/down/left/right, "zoom" in/out.

The main levers (all in the episode file; details in `docs/ENGINE.md`):
- **Balloons:** `say/shout/whisper/cap/capC/inner/cold('Who', 'text', x, y, { w, anchor, fixed, tail, noTail, shape, size })`.
  - Tile coordinates are 800 wide, and y runs down from the tile top.
  - `anchor`: `'tc'` hangs a balloon from its top-centre, `'bc'` sits it on its bottom-centre; `'tl'` and the other corners work too.
  - `fixed: true` stops the auto-placer moving it.
  - `tail`: `[x, y]`, `'harry'`, or `'harry@1'` to aim at Harry in panel 1 of the tile.
  - `shape: 'box'` gives a rounder rectangle for long speech in narrow panels.
  - Split a long line into two balloons only at a sentence break, and never change the words.
- **Camera** (the `cam` of a shot):
  - `{ x, y, w }` in world units.
  - `{ on: ['harry'], fr: 'close'|'bust'|'waist'|'knees'|'full', dx, dy, zoom }` frames automatically.
  - `{ head: 'harry', hw, hx, hy }` puts a head at an exact spot and size in the panel; the most reliable choice in tall or narrow panels.
  - `roll` tilts the camera.
- **Actors:**
  - Position: `x, y` (feet), `s` (scale), `turn` (-1 to 1).
  - Body: `pose` (see `POSES` in `engine/chars/rig.js`), `armF`/`armB` overrides (e.g. `{ sh, el, hand, front: true }`), `rot`, `lean`.
  - Face: `expr`, `glasses: false`.
- **Panels:**
  - `ep.panel(h, shot, bubbles, { ph, pad, x, w, mood, alt, shape, frame, breakout })`.
  - `ep.bleed` (edge to edge; `fadeTop`/`fadeBottom`).
  - `ep.multi(h, [panels])` (several panels in one tile; later panels draw on top).
  - `ep.cutout` (no frame, no background).
  - A taller panel (`h`) is often the easiest fix for crowding.
- **Layers in a shot:**
  - `bg`: the set.
  - `mid`: between the set and the actors.
  - `actors`: functions in the list draw in order, e.g. a desk in front of someone.
  - `fg`: in front of the actors.
  - `behind`: effects behind the actors, in panel coordinates.
  - `over`: on top of everything.
  - `under`: beneath the set.
- Keep the `alt:` text describing what's actually drawn if you change the picture.

Do not be afraid to **majorly** redo a panel from scratch, especially if it would flow better. This includes but is not limited to: repositioning the characters, resizing the entire panel (increasing the height is a good technique to get around difficult overlaps or otherwise too crowded panels), completely changing shot size/framing, splitting a panel into multiple panels, deleting/adding elements.

In the case that it's an engine bug, definitely feel free to fix it. However, be mindful of how the change affects other panels -- you may need to relayout them. Re-render every episode after an engine change (`for e in $(seq -w 1 23); do node engine/render.mjs ep$e; done`) and look at what moved; `node work/tilesfor.mjs` helps find the tiles a pose change affects.

## Final verification

Re-render the panel to verify that it looks perfect. If not, adjust and try again.

When the episode is done:
1. `node engine/render.mjs epXX` (a full render; it writes `site/epXX/` and the manifest, and tile numbers shift if panels were added or removed).
2. Make sure it prints no `face` warnings, and only `border`/`outline-edge` warnings you've looked at and judged deliberate.
3. `python3 work/wordcheck.py epXX` must say SAME WORDS IN ORDER (it compares every balloon's text with git HEAD).
4. `node engine/build-site.mjs` refreshes the episode pages and contents.

## Batching

It could be helpful to look at multiple panels at once to make the render -> check -> re-render loop more efficient. However, you risk not placing enough emphasis on a single panel, so limit this to 3 panels at a time. 
