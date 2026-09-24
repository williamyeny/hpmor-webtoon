---
name: change-script
description: Apply the user's script feedback on the webtoon — anything from one line of wording up to rewriting, cutting, adding, or reordering whole scenes — and carry it all the way through to the published site and every related file (episode scripts, callbacks in other episodes, catalog blurbs, docs, loose ends), then re-render, re-check layout, and deploy.
---

The reviewer reads the comic on their phone and disagrees with something: a word, a line, a caption, a joke, a beat, a whole scene, or how an episode is structured. Your job is to make the change **completely**: the end result on the live site, and every file that depends on it.

## 1. Pin down exactly what they mean

The user may give a quote, a paraphrase, a screenshot, an episode + rough position, or just a description ("the bit where Dad floats"). Find it. Note that lines may be stored with `\'` escapes and `*italic*` markup.

If the request is ambiguous in a way that changes what you'd do (which of two similar lines? cut the scene or shorten it?), ask one short question. Otherwise act.

## 2. Classify the scope, then make the change

**Wording** (a line, a caption, a name, tone). Edit the text in the episode file. Keep the character's voice (see `docs/STORY_DESIGN.md` → cast table, and neighbouring lines) unless the requested edit is verbatim.

**Beat or scene** (rewrite, cut, add, reorder, change what happens). Before editing, write down for yourself: what the scene is for (its turn, and what it plants or pays off), and what the change does to that. Then:
- Edit or rebuild the panels using the existing vocabulary: `say/shout/whisper/cap/capC/inner/cold/hat/note`, `ep.panel/bleed/multi/beat`, `shot({ cam, bg, actors })`. See `docs/ENGINE.md`.
- New character, prop, location or effect → add it to `engine/chars/cast.js`, `engine/props/`, `engine/bg/`, `engine/fx/` in the existing style (`docs/ART_BIBLE.md`). Remember: engine changes affect **every** episode, so re-render all episodes that use what you touched.
- Consider the panel frame as part of the storytelling (`docs/ART_BIBLE.md` → "Panel frames"): a new or rebuilt beat may deserve a shaped frame, a cut-out or a breakout, if it deepens immersion.
- Keep the art-direction motifs intact (warm vs. **cold** for Harry's dark side, Quirrell's "wrongness", sepia for memories) unless the change is *about* them.

## 3. Follow the change everywhere else

A line or scene is rarely isolated. Check and update all of these:

1. **Callbacks and payoffs in other episodes.** Grep all episodes for the key words, names and ideas you changed (e.g. changing the pet-rock joke → it's echoed in Ep 12; changing Harry's ledger → "+1" appears in Ep 7 and Ep 12; changing the Neville prank → the Hat cites it in Ep 12 and Hermione hears about it in Ep 10). Keep them consistent.
2. **`docs/LOOSE_ENDS.md`** — if a plant or payoff was added, removed, moved or altered, update its row (status column + note). Never silently drop a plant that pays off later in HPMOR; if you must, mark it CUT with the reason and what future arcs should do instead.
3. **`docs/ADAPTATION.md`** — add or edit the row for that episode explaining what changed and why (include "changed at the user's request" where relevant).
4. **`docs/STORY_DESIGN.md`** — only if the change affects arc-level structure (theme, a character's arc, the ending, the opening/ending mirror).
5. **`episodes/catalog.js`** — episode title or blurb, if the change makes them wrong.
6. **Alt text** (`alt:` on panels) — keep it describing what is actually drawn.

## 4. Re-render, re-check, publish

1. Re-render every affected episode **in full** (`node engine/render.mjs epXX`) — tile numbers shift when panels are added or removed, and the manifest must match. Fix any `LETTERING WARNINGS`.
2. Run the **relayout** skill on every tile you added or changed, plus one tile either side (look at the actual `site/epXX/*.webp` images, 3 at a time, re-render until they're right).
3. Read the changed stretch as a stranger: does it still flow into the tiles before and after? Does the scene still turn? Is anything now confusing or redundant?
4. `node engine/build-site.mjs`
5. Commit with a message saying what changed and why, then push (the Pages workflow deploys `site/`). If other work is in progress in the tree, stage only the files this change touched.

## 5. Report back

Tell the user in plain words: what you changed, where (episode + roughly where in the episode), any knock-on edits elsewhere (other episodes, docs), and anything you deliberately left alone and why. Keep it short.
