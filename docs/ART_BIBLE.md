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
