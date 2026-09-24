---
name: relayout
description: review the layout of the specified panel(s) and fix them as needed.
---

Your job is to make sure the layout of the panel(s) looks perfect. Don't forget: this is a medium for phones, which demands extra clarity.

## Where things are

- **Episode scripts:** `episodes/epXX.js`. Each call that adds a tile (`ep.panel`, `ep.bleed`, `ep.multi`, `ep.beat`, …) makes one tile, numbered in order from 1.
- **Rendered tiles:** `site/epXX/NNN.webp`, listed in `site/epXX/manifest.json`. Each tile's `alt` in the manifest includes its balloon text, so searching it for a line finds the tile number.
- **Reference:** `docs/ENGINE.md` (every option and the engine's file map) and `docs/ART_BIBLE.md` (the look, lettering, page rhythm and panel frames).

## How to check

Look directly at the .webp images themselves.
- Whole episode at a glance: `node engine/contact.mjs epXX 300 2600` writes overview sheets to `scratch/sheet-epXX-NN.png`.
- Quick previews while iterating: `node engine/render.mjs epXX --png 5-9` (or `--png 3,7,12`) writes `scratch/epXX-NNN.png` without touching `site/`.
- Several tiles side by side: `node work/stack.mjs scratch/out.png a.png b.png c.png --w 700`. To zoom in on a detail, crop with sharp (e.g. `sharp(f).extract({left, top, width, height}).resize({width: 500})`).
- Every render prints `LETTERING WARNINGS` per tile (what each means: `docs/ENGINE.md`). A `face` warning is always a real problem; the others are usually worth a look.
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

Everything is set in the episode file; `docs/ENGINE.md` lists the options (balloons, cameras, actors, poses, panels, frames, layers). A few that solve most problems:
- Aiming the camera at a head (`cam: { head, hw, hx, hy }`) is the most reliable framing in tall or narrow panels.
- `fixed: true` keeps a balloon exactly where you put it.
- Split a long line into two balloons only at a sentence break, and never change the words. Keep `alt:` describing what's actually drawn.

Do not be afraid to **majorly** redo a panel from scratch, especially if it would flow better. This includes but is not limited to: repositioning the characters, resizing the entire panel (increasing the height is a good technique to get around difficult overlaps or otherwise too crowded panels), completely changing shot size/framing, splitting a panel into multiple panels, deleting/adding elements.

In the case that it's an engine bug, definitely feel free to fix it. However, be mindful of how the change affects other panels -- you may need to relayout them. Re-render every episode after an engine change (`for f in episodes/ep[0-9]*.js; do node engine/render.mjs $(basename $f .js); done`) and the homepage cover (`node engine/render.mjs --file episodes/cover.js --cover`), and look at what moved; `node work/tilesfor.mjs` helps find the tiles a pose change affects.

## Final verification

Re-render the panel to verify that it looks perfect. If not, adjust and try again.

When the episode is done:
1. `node engine/render.mjs epXX` (a full render; it writes `site/epXX/` and the manifest, and tile numbers shift if panels were added or removed).
2. Make sure it prints no `face` warnings, and only `border`/`outline-edge` warnings you've looked at and judged deliberate.
3. `python3 work/wordcheck.py epXX` must say SAME WORDS IN ORDER (it compares every balloon's text with git HEAD).
4. `node engine/build-site.mjs` refreshes the episode pages and contents.

## Batching

It could be helpful to look at multiple panels at once to make the render -> check -> re-render loop more efficient. However, you risk not placing enough emphasis on a single panel, so limit this to 3 panels at a time. 
