# Art Bible

## The look in one sentence
A worn, candlelit storybook: flat gouache-like shapes with warm brown ink lines, paper grain,
a slight hand-drawn tremor, and light that always comes from something (a lamp, a fire, a
candle, a window) — never a comic-book look (no halftone, no black gutters, no speed-line
excess except for gags).

## Palette (see `engine/core/palette.js`)
Burgundy · forest green · navy · mustard gold · wood & leather browns · parchment. Skin tones
and hair colours are from a fixed list. Night scenes lean navy; memories lean sepia.

**The two light motifs**
- **Warm** (lamplight, candle, fire, gold): home, friendship, McGonagall, Hufflepuff's door.
- **Cold** (ice blue, frost creeping from the panel edges, desaturation, pinprick pupils,
  angular pale balloons in small caps): Harry's dark side. Used sparingly and only when his
  anger turns into calculation. Appears: Ep 1 (flicker), 3 ("Voldemort"), 7 (blackmail),
  9 (Draco, the guillotine), 10 (the prefect), 12 (the Hat).
- **Wrongness** (red/cyan interference bands + a hum): Quirrell only.

## Characters (design notes)
- **Harry** — big messy black mop (hand-keyed hair), round glasses, green eyes, red scar;
  mustard cable-knit jumper at home; black robes (Ravenclaw blue trim after the Sorting).
  Disguises: sweatband (Muggle London), red-and-gold striped scarf (the platform).
- **McGonagall** — tall and thin, square spectacles, bun under a tall black hat with a green
  band; forest-green robes with burgundy tartan-edged lapels and a gold brooch.
- **Dad** — tweed jacket, burgundy tie, trimmed beard, rectangular glasses, receding curls.
- **Mum** — honey-blonde soft updo, navy dress, cream cardigan.
- **Draco** — platinum slicked hair, pointed chin, grey eyes, smug half-lidded default.
- **Hermione** — tremendous bushy brown cloud, brown eyes, small front teeth, brand-new robes.
- **Neville** — round face, small, green jumper, perpetual worry.
- **The Sorting Hat** — tall, slumped, patched brown hat; eye-creases and a ripped mouth; its
  balloons are leather-brown with a stitched border and IM Fell italic lettering.

## Lettering
Dialogue: Andika (humanist, very legible on phones), 31px on an 800px tile. Captions:
Alegreya italic on parchment boxes. Thoughts: dotted "inner" boxes. Harry's cold voice:
Alegreya SC in angular pale-blue balloons. Handwriting/diagrams: Caveat. Titles: IM Fell
English SC. Parseltongue: green glowing IM Fell italic with no balloon.

**Balloon tails** are all the same size (fixed base width and visible length); only their
attachment point and angle vary. Balloons auto-avoid faces and each other and keep reading
order (a later balloon never moves above an earlier one it overlaps).

## Page rhythm
Tiles are 800 css px wide (rendered at 1000 px). A normal beat is 460–760 px tall; a big beat
is a full-bleed 1000–1400 px panel faded into the gutter. Gutter colour changes with the scene
(parchment for day, near-black navy for night and the mind), with gradient transition tiles.

## Panel frames (the user's direction, 2026-09-24)
A frame is part of the storytelling, not a box around it. Special frames exist to pull the reader
**into** the scene. Two examples the user liked:
- **The frame belongs to the scene.** Ep 3's huge archway: the characters walk through an archway,
  and the panel itself is shaped like the archway, so the reader walks through it with them.
- **No frame at all.** A character or object stands straight on the page (a cut-out), as if it
  has stepped out of the comic into the reader's own world.

What they share: the frame makes the reader feel physically present. Aim for roughly **1 in 5
panels** being non-standard, but never force one. A plain rectangle is the right choice whenever a
special frame would hurt readability, break the flow, or pull the reader out of the moment. If a
special frame needs explaining, it's the wrong frame.

Vocabulary (see `docs/ENGINE.md` → "Panel frames" for how):
- **Shaped by the scene.** Doorways and arches (`arch`, `gothic` with a `stone` or `wood` frame);
  windows; a keyhole when someone peeks or eavesdrops; an oval `gilt` frame for portraits and
  mirrors; a `screen` for Quirrell's face on every desk; `torn` paper for notes and letters;
  `cloud` for daydreams and imagined scenes; `eye` for an eyes-only close-up.
- **Shaped by the feeling.** `slant` or a diagonal `cut` for a lurch, a fall, a chase; a `burst`
  panel for a shock or a spell hitting; a `glow` frame for magic (the stars, the Time-Turner).
- **Cut-outs** (`ep.cutout`): a character or object on the bare page, no background. Best for a
  beat that should feel close to the reader: a character turning to us, a triumphant pose, a key
  object (the letter, the Time-Turner, the rock). Use them for moments, not for conversations.
- **Breakouts** (`breakout: 'top'` etc.): part of a character crosses the frame edge (a hat, a
  pointing arm, a leap), so the action spills onto the page. Good for energy and entrances.
- **Layout tricks.** An inset close-up overlapping a big panel; panels with a shared diagonal seam;
  a borderless bleed that dissolves into the gutter; one tall panel beside a stack of small ones.

Keep: reading order obvious (top to bottom, left to right); balloons inside or clearly attached to
their panel; the frame's colour and style consistent with the scene's mood (stone and wood for the
castle, gilt for the Headmaster, glow for magic, paper for notes). Don't repeat the same trick
back to back; save the boldest frames for the biggest beats.
