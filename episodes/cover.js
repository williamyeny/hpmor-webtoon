// Cover illustration for the contents page (rendered to site/cover.webp by `node engine/render.mjs cover --cover`).
import { shot } from '../engine/core/scene.js';
import { C } from '../engine/core/palette.js';
import { g, rect } from '../engine/core/svg.js';
import * as O from '../engine/bg/oxford.js';
import * as K from '../engine/bg/kit.js';
import * as FX from '../engine/fx/fx.js';
import { harry } from '../engine/chars/cast.js';
import { envelope, owl } from '../engine/props/props.js';
export default { id: 'cover', title: 'cover', tiles: [
  { h: 1000, bg: C.paper, gutterGrain: false, panels: [{ x: 0, y: 0, w: 800, h: 1000, border: 'none', mood: 'candle', light: 0.7,
    art: shot({ cam: { x: 640, y: 560, w: 760 }, bg: () => O.bedroom({ candle: true }),
      actors: [
        g({ transform: 'translate(760,300) scale(0.9)' }, owl({ col: '#9a7a52' })),
        { def: harry, id: 'harry', x: 560, y: 1150, s: 1.9, turn: 0.35, expr: { base: 'awe', eyes: { lookY: 0.7, lookX: 0.3, sparkle: true } }, pose: 'hold', armF: { sh: 18, el: 62, hand: 'hold', prop: g({ transform: 'translate(10,46) scale(0.6) rotate(-4)' }, envelope({ back: true, sealText: 'H' })) }, armB: { sh: 22, el: 60, hand: 'hold' } },
      ],
      fg: () => K.glow(700, 760, 380, C.candle, 0.45) }) }] },
] };
