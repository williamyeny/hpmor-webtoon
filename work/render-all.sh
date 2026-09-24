#!/bin/sh
# re-render every finished episode + cover, rebuild site
cd "$(dirname "$0")/.."
for e in "$@"; do node engine/render.mjs $e 2>&1 | tail -1; done
node engine/build-site.mjs
