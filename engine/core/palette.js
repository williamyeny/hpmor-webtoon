// The world palette. Warm, deep, worn: burgundy, forest, navy, mustard gold, wood & leather browns.
// Keep every new colour close to these families; see docs/ART_BIBLE.md.
export const C = {
  ink: '#2a1b14',          // line art: warm near-black
  inkSoft: '#5a4032',
  paper: '#f1e6cc',        // parchment
  paperLight: '#f8f0dc',
  paperDark: '#dcc9a2',
  paperShade: '#c4ad82',

  burgundy: '#7b2433', burgundyDark: '#521522', burgundyLight: '#a4404d',
  forest: '#2f5a40', forestDark: '#1d3a29', forestLight: '#4f7d5c',
  navy: '#243352', navyDark: '#141d33', navyLight: '#3d5078',
  mustard: '#d6a33a', mustardDark: '#a97a22', mustardLight: '#ecc466',
  gold: '#e7bb4f', goldDark: '#b0842a', goldLight: '#f7dc8c',
  bronze: '#b0713b',
  brown: '#6b4429', brownDark: '#43291a', brownLight: '#9a6a42',
  wood: '#7a4e2e', woodDark: '#4a2e1b', woodLight: '#a8784c',
  leather: '#8b4a2b', leatherDark: '#5e2f1b',
  stone: '#8e897c', stoneDark: '#5f5b52', stoneLight: '#b5ae9d',
  plum: '#5b3553', plumDark: '#3a2036',
  teal: '#2f5f63',
  cream: '#f4ead2',
  white: '#fbf7ec',
  black: '#1b1310',

  candle: '#ffcf75', candleCore: '#fff3c9', ember: '#e8772e',
  night: '#101a30', nightDeep: '#0a1020', moon: '#e9eed8',
  rain: '#9fb1c4',
  cold: '#9bb7cf', coldDark: '#4a6a86', frost: '#dcebf5',

  // skin tones
  skinFair: '#f3d2b5', skinFairShade: '#dca88a',
  skinLight: '#eec4a1', skinLightShade: '#d49c7b',
  skinOlive: '#d7a57d', skinOliveShade: '#b77f5b',
  skinTan: '#c48a61', skinTanShade: '#9f6644',
  skinBrown: '#8e5a3b', skinBrownShade: '#6b3f27',
  skinDeep: '#5e3a28', skinDeepShade: '#442818',
  skinPale: '#efd9c6', skinPaleShade: '#cfb09a',
  skinGoblin: '#b9b58a', skinGoblinShade: '#8f8a62',

  blush: '#e27d74',
  // hair
  hairBlack: '#1f1a1f', hairBrown: '#5a3722', hairChestnut: '#7a4424', hairAuburn: '#9b3f22', hairGinger: '#c65a24',
  hairBlonde: '#e1c07a', hairPlatinum: '#eee3c2', hairGrey: '#9d978f', hairWhite: '#ecebe4', hairSandy: '#b98c52',
};

// Light "moods" used by panels: overlay tint + vignette
export const MOODS = {
  warm:   { tint: '#ffb85c', tintOp: 0.10, vig: '#3a1e0e', vigOp: 0.35 },
  candle: { tint: '#ff9f40', tintOp: 0.16, vig: '#2a1308', vigOp: 0.55 },
  day:    { tint: '#fff2cf', tintOp: 0.06, vig: '#3b2a1a', vigOp: 0.18 },
  rainy:  { tint: '#7f98b5', tintOp: 0.12, vig: '#1c2433', vigOp: 0.35 },
  night:  { tint: '#2d4677', tintOp: 0.22, vig: '#050a18', vigOp: 0.6 },
  cold:   { tint: '#7fa6c9', tintOp: 0.28, vig: '#0b1624', vigOp: 0.55, desat: 0.55 },
  dusk:   { tint: '#ff8a5c', tintOp: 0.14, vig: '#2a1224', vigOp: 0.4 },
  sepia:  { tint: '#b98a4f', tintOp: 0.2, vig: '#2b1a0e', vigOp: 0.45, desat: 0.8 },
  none:   { tint: '#000', tintOp: 0, vig: '#000', vigOp: 0 },
};
