# Harry Potter and the Methods of Rationality — a webtoon

A vertical-scroll webtoon adaptation of Eliezer Yudkowsky's *Harry Potter and the Methods of
Rationality* (itself a fan work of J.K. Rowling's *Harry Potter*). Unofficial and
non-commercial. **Every image is drawn by code** — no image assets, no AI image models; SVG
composed in Node and rasterised in headless Chromium.

**Read it:** https://will-ye.com/hpmor-webtoon/

Part One (12 episodes) covers HPMOR chapters 1–10 plus parts of 12: from the letter to the
Sorting.

## Docs (start here to continue the project)
- `docs/STORY_DESIGN.md` — the story method run on this arc: premise, theme, cast, ending, plants.
- `docs/ADAPTATION.md` — every change from HPMOR, episode by episode, and why.
- `docs/LOOSE_ENDS.md` — plants and payoffs, including ones that pay off far later in HPMOR.
- `docs/ART_BIBLE.md` — look, palette, motifs, character designs, lettering.
- `docs/ENGINE.md` — how the drawing engine works and how to make an episode.

## Build
```sh
npm install && npx playwright install chromium
node engine/render.mjs ep01 --png && node engine/contact.mjs ep01   # preview
node engine/render.mjs ep01 && node engine/build-site.mjs            # publish to site/
```
`site/` is deployed to GitHub Pages by `.github/workflows/pages.yml`. The HPMOR source
(`hpmor/`, a clone of rrthomas/hpmor) is not committed.
