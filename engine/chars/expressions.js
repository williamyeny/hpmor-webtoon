// Expression presets. Each is a partial face-state; scripts can pass a name, a list of names to merge,
// or an object ({...preset, eyes:{lookX:1}}). See docs/ART_BIBLE.md for when to use which.
export const EXPR = {
  neutral:    { eyes: { open: 1 }, brows: { raise: 0, inner: 0, outer: 0 }, mouth: { type: 'line', curve: 0.1 } },
  calm:       { eyes: { open: 0.8 }, brows: { raise: 0 }, mouth: { type: 'line', curve: 0.25 } },
  smile:      { eyes: { open: 0.9, squint: 0.25 }, brows: { raise: 0.3, inner: 0.1 }, mouth: { type: 'line', curve: 0.9, w: 1.05 } },
  warm:       { eyes: { open: 0.75, squint: 0.35 }, brows: { raise: 0.4, inner: 0.35 }, mouth: { type: 'line', curve: 0.7 } },
  happy:      { eyes: { style: 'happy' }, brows: { raise: 0.6, inner: 0.2 }, mouth: { type: 'smile', open: 0.6, curve: 0.5 } },
  grin:       { eyes: { open: 0.95, squint: 0.3 }, brows: { raise: 0.5 }, mouth: { type: 'grin', open: 0.6, w: 1.25, curve: 0.8 } },
  bigGrin:    { eyes: { style: 'happy' }, brows: { raise: 0.8 }, mouth: { type: 'grin', open: 0.9, w: 1.45, curve: 1 } },
  laugh:      { eyes: { style: 'shut' }, brows: { raise: 0.7, inner: 0.4 }, mouth: { type: 'laugh', open: 0.9, w: 1.3 } },
  smug:       { eyes: { open: 0.55, lookX: 0.3 }, brows: { raise: 0.4, inner: -0.2, outer: 0.5 }, mouth: { type: 'smirk', w: 1 } },
  scheme:     { eyes: { open: 0.5 }, brows: { raise: -0.2, inner: -0.6 }, mouth: { type: 'grin', open: 0.35, w: 1.3, curve: 1 }, glint: true },
  shock:      { eyes: { style: 'wide', open: 1.1 }, brows: { raise: 1.6, inner: 0.3 }, mouth: { type: 'o', open: 0.6 } },
  gasp:       { eyes: { style: 'wide' }, brows: { raise: 1.3, inner: 0.5 }, mouth: { type: 'o', open: 0.3, w: 0.8 } },
  horror:     { eyes: { style: 'blank' }, brows: { raise: 1.7, inner: 0.9 }, mouth: { type: 'scream', open: 0.9 }, sweat: true, pale: true },
  yell:       { eyes: { open: 1, style: 'wide' }, brows: { raise: 0.9, inner: -0.4 }, mouth: { type: 'shout', open: 1 } },
  rant:       { eyes: { style: 'shut' }, brows: { raise: 0.5, inner: -0.8 }, mouth: { type: 'shout', open: 1.1 }, vein: true },
  angry:      { eyes: { open: 0.85, lidTilt: -0.55 }, brows: { raise: -0.4, inner: -1.4, outer: 0.2 }, mouth: { type: 'grit' } },
  cross:      { eyes: { open: 0.75, lidTilt: -0.35 }, brows: { raise: -0.3, inner: -1.0 }, mouth: { type: 'line', curve: -0.6, w: 0.8 } },
  stern:      { eyes: { open: 0.8, lidTilt: -0.2 }, brows: { raise: -0.1, inner: -0.8 }, mouth: { type: 'line', curve: -0.25, w: 0.85 } },
  cold:       { eyes: { open: 0.55, style: 'cold', lidTilt: -0.15 }, brows: { raise: -0.25, inner: -0.5 }, mouth: { type: 'line', curve: 0, w: 0.75 }, cold: true },
  coldSmile:  { eyes: { open: 0.5, style: 'cold' }, brows: { raise: -0.2, inner: -0.4 }, mouth: { type: 'smirk', w: 0.9 }, cold: true },
  sad:        { eyes: { open: 0.7, lidTilt: 0.5, lookY: 0.4 }, brows: { raise: 0.2, inner: 1.1, outer: -0.4 }, mouth: { type: 'line', curve: -0.6, w: 0.8 } },
  hurt:       { eyes: { open: 0.85, lidTilt: 0.45, teary: true }, brows: { raise: 0.5, inner: 1.3, outer: -0.3 }, mouth: { type: 'wobble', w: 0.9 } },
  cry:        { eyes: { style: 'shut' }, brows: { raise: 0.6, inner: 1.5, outer: -0.4 }, mouth: { type: 'frown-open', open: 0.8 }, tears: 'stream' },
  sob:        { eyes: { style: 'shut' }, brows: { raise: 0.8, inner: 1.7 }, mouth: { type: 'scream', open: 0.7, w: 1.1 }, tears: 'stream' },
  teary:      { eyes: { open: 0.95, teary: true, lidTilt: 0.3 }, brows: { raise: 0.5, inner: 1.2, outer: -0.3 }, mouth: { type: 'wobble', w: 0.8 } },
  embarrassed:{ eyes: { open: 0.8, lookX: -0.8, lookY: 0.3 }, brows: { raise: 0.3, inner: 0.8 }, mouth: { type: 'wobble', w: 0.9 }, blush: true, sweat: true },
  flustered:  { eyes: { style: 'wide' }, brows: { raise: 1.1, inner: 0.9 }, mouth: { type: 'wobble', w: 1.1 }, blush: 'strong', sweat: true },
  deadpan:    { eyes: { open: 0.5, noShine: true }, brows: { raise: 0 }, mouth: { type: 'flat', w: 0.75 } },
  unimpressed:{ eyes: { open: 0.45, lookX: 0.3 }, brows: { raise: 0.2, inner: -0.2, outer: 0.3 }, mouth: { type: 'line', curve: -0.3, w: 0.7, asym: -0.4 } },
  exasperated:{ eyes: { style: 'closed' }, brows: { raise: 0.2, inner: 1, outer: -0.2 }, mouth: { type: 'line', curve: -0.5, w: 0.9 } },
  suspicious: { eyes: { open: 0.45, lookX: 0.6, lidTilt: -0.2 }, brows: { raise: 0, inner: -0.6, outer: 0.3 }, mouth: { type: 'line', curve: -0.2, asym: 0.5, w: 0.7 } },
  think:      { eyes: { open: 0.85, lookX: 0.5, lookY: -0.7 }, brows: { raise: 0.4, inner: -0.3, outer: 0.4 }, mouth: { type: 'line', curve: -0.1, asym: 0.4, w: 0.6 } },
  focus:      { eyes: { open: 0.8, lookY: 0.2 }, brows: { raise: -0.1, inner: -0.6 }, mouth: { type: 'line', curve: -0.05, w: 0.6 } },
  determined: { eyes: { open: 0.95, lidTilt: -0.15 }, brows: { raise: 0, inner: -0.9, outer: 0.2 }, mouth: { type: 'line', curve: -0.35, w: 0.9 } },
  confused:   { eyes: { open: 1, lookX: -0.3 }, brows: { raise: 0.8, inner: 0.7, outer: -0.2 }, mouth: { type: 'wobble', w: 0.7 }, sweat: true },
  awe:        { eyes: { open: 1.05, sparkle: true, irisScale: 1.1, lookY: -0.4 }, brows: { raise: 1.2, inner: 0.3 }, mouth: { type: 'o', open: 0.25, w: 0.8 } },
  delight:    { eyes: { open: 1, sparkle: true, irisScale: 1.1 }, brows: { raise: 1, inner: 0.2 }, mouth: { type: 'grin', open: 0.8, w: 1.3, curve: 1 } },
  hopeful:    { eyes: { open: 1, irisScale: 1.05, lookY: -0.2 }, brows: { raise: 0.7, inner: 0.6 }, mouth: { type: 'line', curve: 0.4, w: 0.7 } },
  worried:    { eyes: { open: 0.95, lookX: 0.2 }, brows: { raise: 0.5, inner: 1.2, outer: -0.3 }, mouth: { type: 'line', curve: -0.4, w: 0.7 } },
  pleading:   { eyes: { open: 1.05, irisScale: 1.15, teary: true }, brows: { raise: 0.7, inner: 1.5 }, mouth: { type: 'wobble', w: 0.7 } },
  wince:      { eyes: { style: 'shut' }, brows: { raise: -0.2, inner: 1 }, mouth: { type: 'grit', w: 1 }, sweat: true },
  asleep:     { eyes: { style: 'closed' }, brows: { raise: 0 }, mouth: { type: 'line', curve: 0.1, w: 0.5 } },
  blank:      { eyes: { style: 'blank' }, brows: { raise: 0.6 }, mouth: { type: 'flat', w: 0.6 } },
  what:       { eyes: { style: 'blank', open: 1 }, brows: { raise: 0.2 }, mouth: { type: 'flat', w: 0.35 } },
  twitch:     { eyes: { open: 0.9, lookX: -0.6 }, eyeR: { open: 0.55 }, brows: { raise: 0.6, inner: 0.9 }, mouth: { type: 'wobble', w: 0.8 }, sweat: true },
  menace:     { eyes: { open: 0.6, lidTilt: -0.35, style: 'cold' }, brows: { raise: -0.5, inner: -1.2 }, mouth: { type: 'line', curve: -0.1, w: 0.8 } },
  smile2:     { eyes: { open: 0.85 }, brows: { raise: 0.3 }, mouth: { type: 'smile', open: 0.3, curve: 0.6 } },
  pained:     { eyes: { open: 0.6, lidTilt: 0.5 }, brows: { raise: 0.3, inner: 1.3 }, mouth: { type: 'line', curve: -0.5, w: 0.7, asym: 0.3 } },
};

export function resolveExpr(e) {
  if (!e) return EXPR.neutral;
  if (typeof e === 'string') return EXPR[e] || EXPR.neutral;
  if (Array.isArray(e)) return e.map(resolveExpr).reduce((a, b) => deepMerge(a, b), {});
  if (e.base) return deepMerge(resolveExpr(e.base), { ...e, base: undefined });
  return e;
}
export function deepMerge(a, b) {
  const out = { ...a };
  for (const k in b) {
    if (b[k] === undefined) continue;
    out[k] = b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object' ? deepMerge(a[k], b[k]) : b[k];
  }
  return out;
}
