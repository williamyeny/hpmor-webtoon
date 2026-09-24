#!/bin/sh
# Re-render every episode and the homepage cover, then rebuild the site (after an engine change).
# Prints only lettering warnings. `git status site/` afterwards shows exactly which tiles changed.
cd "$(dirname "$0")/.."
for f in episodes/ep[0-9]*.js; do node engine/render.mjs "$(basename "$f" .js)" 2>&1 | grep LETTERING; done
node engine/render.mjs --file episodes/cover.js --cover > /dev/null
node engine/build-site.mjs
