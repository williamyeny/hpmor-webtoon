// The cast. Each entry is a character *design*: proportions, palette, face, hair, outfit.
// Outfit variants (e.g. Harry at home vs. in robes) are separate entries built with `variant()`.
import { C } from '../core/palette.js';
import { path, ellipse, circle, line, g, smoothD, shade, lerp, rng, taperD } from '../core/svg.js';
import * as H from './hair.js';

// ---------- body templates
export const KID = { headRx: 60, headRy: 58, neck: 9, neckW: 20, torsoH: 92, shoulderW: 74, shoulderDrop: 12, waistW: 60, hipW: 64, armU: 42, armL: 40, armW: 21, handR: 10.5, legU: 54, legL: 52, legW: 24, foot: 30, hemDrop: 10 };
export const KID_SMALL = { ...KID, torsoH: 86, legU: 50, legL: 48, shoulderW: 70 };
export const ADULT_M = { headRx: 52, headRy: 58, neck: 16, neckW: 26, torsoH: 168, shoulderW: 118, shoulderDrop: 14, waistW: 100, hipW: 96, armU: 78, armL: 72, armW: 27, handR: 13, legU: 112, legL: 106, legW: 32, foot: 40, hemDrop: 16, headAttach: 0.88 };
export const ADULT_F = { headRx: 48, headRy: 55, neck: 17, neckW: 21, torsoH: 150, shoulderW: 96, shoulderDrop: 13, waistW: 74, hipW: 92, armU: 70, armL: 64, armW: 22, handR: 11.5, legU: 108, legL: 104, legW: 27, foot: 34, hemDrop: 14, headAttach: 0.88 };
export const TEEN = { headRx: 54, headRy: 56, neck: 13, neckW: 22, torsoH: 128, shoulderW: 96, shoulderDrop: 13, waistW: 76, hipW: 80, armU: 62, armL: 58, armW: 22, handR: 12, legU: 86, legL: 82, legW: 26, foot: 35, hemDrop: 12, headAttach: 0.9 };

const kidFace = ({ eye, brow, ...o } = {}) => ({
  eyeY: 12, eyeSpacing: 25, noseY: 34, mouthY: 44, nose: 'button',
  eye: { w: 24, h: 28, iris: 10.5, color: '#3d7a45', lash: 1.7, ...eye },
  brow: { len: 22, w: 5.5, gap: 9, ...brow },
  mouth: { w: 20 },
  ...o,
});
const adultFace = ({ eye, brow, ...o } = {}) => ({
  eyeY: 4, eyeSpacing: 21, noseY: 26, mouthY: 42, nose: 'long', noseLen: 20,
  eye: { w: 19, h: 17, iris: 7, color: '#5b4632', lash: 1.5, shape: 'almond', ...eye },
  brow: { len: 22, w: 4.2, gap: 6, ...brow },
  mouth: { w: 22 },
  ...o,
});

// ---------- Harry
const harryBase = {
  name: 'harry', body: KID, skin: C.skinFair, skinShade: C.skinFairShade,
  head: { jaw: 0.6, chin: 1.0 },
  face: kidFace({ eye: { color: '#2f8a4c', iris: 11 }, brow: { color: '#211a20' }, rosy: true }),
  hair: { color: C.hairBlack, ...H.keyed({
    front: {
      F: [[-58, 10], [-66, -8], [-78, -20], [-66, -34], [-80, -52], [-58, -62], [-60, -84], [-36, -74], [-26, -96], [-6, -78], [10, -98], [20, -78], [42, -90], [48, -68], [72, -70], [66, -48], [82, -36], [66, -24], [74, -6], [58, 8],
          [56, -12], [44, -20], [38, -2], [26, -22], [14, 0], [4, -24], [-8, 2], [-20, -36], [-34, -6], [-44, -22], [-54, -8], [-56, -18]],
      S: [[-40, 12], [-58, -4], [-82, -14], [-72, -32], [-86, -50], [-62, -62], [-58, -86], [-32, -76], [-16, -98], [2, -80], [20, -98], [28, -78], [50, -88], [54, -66], [74, -66], [66, -46], [78, -34], [62, -26], [66, -10], [56, 0],
          [54, -14], [50, -22], [48, -4], [36, -24], [28, 0], [18, -26], [8, 2], [-6, -36], [-18, -6], [-26, -22], [-34, -6], [-38, -16]],
    },
    back: {
      F: [[-66, 26], [-76, -10], [-66, -50], [0, -70], [66, -50], [76, -10], [66, 26], [0, 12]],
      S: [[-70, 34], [-88, -6], [-78, -50], [-4, -72], [58, -50], [60, -10], [52, 18], [-12, 16]],
    },
    strandColor: '#0e0b10',
  }) },
  browsOverHair: true,
  glasses: { r: 17.5, shape: 'round', frame: 0.85, color: '#2b2226' },
  scar: true,
};
export const harry = { ...harryBase, outfit: { top: '#c9922e', legs: '#4b4a55', shoes: '#4a2a1a', ribbed: true, collar: '#f2ecde',
  torsoDetail: ({ T, sw, B, lw }) => { // cable-knit hints
    let d = ''; for (const x of [-0.35, 0.35]) { const a = T(sw * x, -B.torsoH * 0.8), b = T(sw * x, -B.torsoH * 0.1); d += `M${a[0]},${a[1]} Q${a[0] + 5},${(a[1] + b[1]) / 2} ${b[0]},${b[1]} `; }
    return path(d, { fill: 'none', stroke: '#9a6b1d', 'stroke-width': lw * 0.8, 'stroke-dasharray': '6 5', opacity: 0.8 });
  } } };
export const harryRobes = { ...harryBase, outfit: { top: '#23202a', robe: true, robeColor: '#23202a', robeLen: 0.95, wideSleeves: true, cuffW: 1.7, legs: '#3b3a45', shoes: '#3a2418', collar: '#f2ecde', neckline: true, robeTrim: '#3a3744' } };
export const harryRaven = { ...harryRobes, outfit: { ...harryRobes.outfit, robeTrim: '#2f4f86', cuff: '#2f4f86', tie: '#2f4f86' } };
// the Mr Bronze disguise: scarf wrapped over the face
export const harryScarf = { ...harryRobes, extraFront: 'scarf' };

// ---------- McGonagall
export const mcgonagall = {
  name: 'mcgonagall', body: { ...ADULT_F, torsoH: 160, legU: 118, legL: 112, shoulderW: 92, waistW: 70, hipW: 84, headRx: 45, headRy: 57, armU: 68, armL: 62 },
  skin: '#efd2bb', skinShade: '#cfa98f',
  hatTop: 0.75,
  head: { jaw: 0.44, chin: 1.08, cheek: 0.8 },
  face: adultFace({ eyeY: 2, eye: { color: '#3f6b4f', w: 22, h: 19, iris: 7.6, lash: 1.9 }, brow: { color: '#3a3136', len: 21, w: 3.2, gap: 8 }, nose: 'point', noseLen: 21, noseY: 22, mouthY: 40, mouth: { w: 17 }, lips: '#b0585c', wrinkles: true }),
  hair: { color: '#2e2a2e', ...H.keyed({ base: 45,
    front: { F: [[-47, 6], [-50, -20], [-46, -44], [-20, -52], [0, -48], [20, -52], [46, -44], [50, -20], [47, 6], [41, -4], [35, -26], [14, -37], [0, -35], [-14, -37], [-35, -26], [-41, -4]],
             S: [[-42, 10], [-52, -18], [-48, -44], [-16, -52], [6, -49], [26, -51], [46, -42], [46, -20], [42, 2], [38, -6], [34, -26], [20, -38], [6, -36], [-8, -38], [-26, -28], [-34, -2]] },
    strands: { F: [[[0, -46], [-22, -34], [-40, -10]], [[0, -46], [22, -34], [40, -10]]], S: [[[6, -47], [-14, -35], [-34, -8]], [[6, -47], [26, -34], [38, -8]]] },
    strandColor: '#9d9aa0',
    backFn: (ctx) => { const { rx, ry, s, lw } = ctx; const bx = -s * rx * 1.25, by = -ry * 0.05; return ellipse(bx, by, rx * 0.36, rx * 0.34, { fill: '#27232a', stroke: C.ink, 'stroke-width': lw }) + path(`M${bx - rx * 0.2},${by - 3} q${rx * 0.2},-8 ${rx * 0.4},0`, { fill: 'none', stroke: '#8f8a92', 'stroke-width': lw * 0.7 }); },
  }) },
  glasses: { r: 13.5, shape: 'square', frame: 0.8, color: '#2b2226' },
  outfit: { top: '#1f4a35', robe: true, robeColor: '#1f4a35', robeLen: 1.0, flare: 1.25, wideSleeves: true, cuffW: 2.2, cuff: '#7b2433', legs: '#1b1b1b', shoes: '#211612', neckline: true, robeTrim: '#7b2433',
    torsoDetail: ({ T, sw, B, lw }) => { // high collar, burgundy lapels, tartan-edged, gold brooch at the throat
      const l = T(-sw * 0.42, -B.torsoH + 2), r = T(sw * 0.36, -B.torsoH + 2), m = T(-sw * 0.02, -B.torsoH * 0.62);
      const lap = `M${l[0]},${l[1]} L${m[0]},${m[1]} L${r[0]},${r[1]}`;
      const br = T(-sw * 0.03, -B.torsoH + 16);
      return path(lap, { fill: 'none', stroke: '#7b2433', 'stroke-width': lw * 3.2, 'stroke-linejoin': 'round' }) +
        path(lap, { fill: 'none', stroke: '#d6a33a', 'stroke-width': lw * 0.45, 'stroke-dasharray': '5 4' }) +
        circle(br[0], br[1], 6.5, { fill: '#d9b35c', stroke: C.ink, 'stroke-width': lw * 0.6 }) + circle(br[0], br[1], 2.5, { fill: '#2f5a40' });
    } },
  hat: ({ rx, ry, s, lw }) => {
    const brimY = -ry * 0.72, tilt = s * 8;
    const brim = `M${-rx * 1.85},${brimY + 8} Q${0},${brimY + 26} ${rx * 1.85},${brimY + 4} Q${rx * 1.2},${brimY - 16} ${0},${brimY - 18} Q${-rx * 1.2},${brimY - 14} ${-rx * 1.85},${brimY + 8}Z`;
    const cone = `M${-rx * 0.82},${brimY - 8} Q${-rx * 0.55 + tilt},${-ry * 1.8} ${rx * 0.2 + tilt * 3},${-ry * 2.55} Q${rx * 0.5 + tilt * 3},${-ry * 2.45} ${rx * 0.55 + tilt * 2},${-ry * 2.3} Q${rx * 0.45 + tilt},${-ry * 1.7} ${rx * 0.84},${brimY - 10}Z`;
    return path(brim, { fill: '#1d1a20', stroke: C.ink, 'stroke-width': lw }) + path(cone, { fill: '#221e25', stroke: C.ink, 'stroke-width': lw }) +
      path(`M${-rx * 0.8},${brimY - 12} Q${0},${brimY - 4} ${rx * 0.83},${brimY - 14}`, { fill: 'none', stroke: '#1f4a35', 'stroke-width': lw * 3.2 }) +
      path(`M${-rx * 0.4 + tilt},${-ry * 1.5} Q${-rx * 0.2 + tilt * 2},${-ry * 2.0} ${rx * 0.1 + tilt * 3},${-ry * 2.4}`, { fill: 'none', stroke: '#4a4452', 'stroke-width': lw * 1.2, opacity: 0.7 });
  },
};

// ---------- Michael Verres-Evans (Dad): Oxford biochemist, tweed, beard, book always in hand
export const dad = {
  name: 'dad', body: { ...ADULT_M, waistW: 112, hipW: 104, headRx: 53 },
  skin: '#ecc8a8', skinShade: '#cf9f80',
  head: { jaw: 0.66, chin: 1.0, cheek: 0.95 },
  face: adultFace({ eye: { color: '#4c5f74', w: 20, h: 17, iris: 7 }, brow: { color: '#6a4a33', len: 24, w: 5 }, nose: 'long', noseLen: 22, mouthY: 44, wrinkles: true }),
  hair: { color: '#6a4a33', ...H.curlyShort('dad', { recede: 0.6 }) },
  glasses: { r: 15, shape: 'square', frame: 0.9 },
  facialHair: ({ rx, ry, s, lw, F, mz }) => {
    const col = '#7a5639', m = mz.x;
    const d = smoothD([[-rx * 0.9 + s * rx * 0.25, ry * 0.2], [-rx * 0.78 + s * rx * 0.35, ry * 0.78], [m, ry * 1.2], [rx * 0.78 + s * rx * 0.35, ry * 0.78], [rx * 0.9 + s * rx * 0.25, ry * 0.2], [rx * 0.55 + s * rx * 0.3, ry * 0.5], [m + 16, F.mouthY + 8], [m - 16, F.mouthY + 8], [-rx * 0.55 + s * rx * 0.3, ry * 0.5]], true, 0.4);
    return path(d, { fill: col, stroke: C.ink, 'stroke-width': lw * 0.9 }) +
      path(`M${m - 17},${F.mouthY - 3} Q${m - 8},${F.mouthY - 12} ${m},${F.mouthY - 8} Q${m + 8},${F.mouthY - 12} ${m + 17},${F.mouthY - 3} Q${m},${F.mouthY - 3} ${m - 17},${F.mouthY - 3}Z`, { fill: col, stroke: C.ink, 'stroke-width': lw * 0.7 });
  },
  outfit: { top: '#f0e8d6', legs: '#5c4b3c', shoes: '#3c2518', sleeve: '#8a6a45', cuff: '#8a6a45', collar: '#f6f0e2', tie: '#7b2433', hem: false,
    over: ({ T, sw, hw, B, lw, S, bt }) => {
      // open tweed jacket panels + elbow-patch colour
      const col = '#8a6a45';
      const L = [T(-sw * 0.98, -B.torsoH + 16), T(-sw * 0.25, -B.torsoH + 2), T(-sw * 0.05, -B.torsoH * 0.45), T(-hw * 0.2, 14), T(-hw * 1.02, 14), T(-hw * 1.0, -B.torsoH * 0.4)];
      const Rr = [T(sw * (1 - 0.35 * bt), -B.torsoH + 16), T(sw * 0.3, -B.torsoH + 2), T(sw * 0.12, -B.torsoH * 0.45), T(hw * 0.25, 14), T(hw * (1 - 0.3 * bt), 14), T(hw * (1 - 0.3 * bt), -B.torsoH * 0.4)];
      let tweed = '';
      const R = rng('tweed');
      for (let i = 0; i < 40; i++) { const p = T((R() - 0.5) * sw * 2, -R() * B.torsoH); tweed += `M${p[0]},${p[1]} l3,2 `; }
      return path(smoothD(L, true, 0.2), S(col)) + path(smoothD(Rr, true, 0.2), S(col)) + path(tweed, { stroke: '#5e4630', 'stroke-width': lw * 0.5, opacity: 0.5 }) +
        path(`M${T(-sw * 0.25, -B.torsoH + 2)[0]},${T(0, -B.torsoH + 2)[1]} L${T(-sw * 0.05, -B.torsoH * 0.62)[0]},${T(0, -B.torsoH * 0.62)[1]} L${T(-sw * 0.3, -B.torsoH * 0.7)[0]},${T(0, -B.torsoH * 0.7)[1]}`, { fill: 'none', stroke: C.ink, 'stroke-width': lw * 0.8 });
    } },
};

// ---------- Petunia Evans-Verres (Mum): lovely, anxious, warm
export const mum = {
  name: 'mum', body: { ...ADULT_F, headRx: 47, headRy: 54 },
  skin: '#f3d4bb', skinShade: '#d9ab91',
  head: { jaw: 0.55, chin: 1.03, cheek: 0.9 },
  face: adultFace({ eye: { color: '#5d7fa3', w: 23, h: 20, iris: 8.4, lash: 2.0 }, brow: { color: '#a0763f', len: 20, w: 3.4 }, nose: 'button', noseY: 28, mouthY: 42, lips: '#c96a6f', mouth: { w: 18 }, rosy: true }),
  hair: { color: '#d7b36a', ...H.keyed({ base: 47,
    front: { F: [[-54, 36], [-60, 6], [-58, -26], [-44, -52], [-18, -62], [12, -60], [40, -50], [58, -26], [60, 6], [54, 36], [46, 30], [48, 4], [44, -14], [30, -22], [10, -26], [-6, -34], [-16, -44], [-22, -34], [-38, -22], [-46, 0], [-46, 28]],
             S: [[-50, 40], [-64, 8], [-64, -26], [-48, -52], [-18, -63], [14, -60], [40, -48], [54, -24], [54, 4], [48, 30], [42, 26], [44, 2], [42, -14], [30, -24], [12, -28], [-2, -36], [-10, -46], [-16, -36], [-30, -24], [-36, 0], [-38, 30]] },
    strands: { F: [[[-16, -46], [10, -42], [40, -24]], [[-18, -46], [-36, -30], [-50, 0]], [[50, -10], [53, 12], [51, 30]]], S: [[[-10, -48], [14, -42], [40, -24]], [[-12, -48], [-30, -32], [-44, 0]], [[48, -8], [50, 12], [47, 28]]] },
    strandColor: '#a8823f',
    backFn: (ctx) => { const { rx, ry, s, lw } = ctx; const bx = -s * rx * 1.0, by = -ry * 0.45; return ellipse(bx, by, rx * 0.5, rx * 0.44, { fill: '#c79f55', stroke: C.ink, 'stroke-width': lw }) + path(smoothD([[-rx * 1.12, ry * 0.55], [-rx * 1.22, -ry * 0.2], [0, -ry * 1.12], [rx * 1.2, -ry * 0.2], [rx * 1.1, ry * 0.55], [0, ry * 0.4]], true, 0.5), { fill: '#c79f55', stroke: C.ink, 'stroke-width': lw }); },
  }) },
  outfit: { top: '#2f4a73', skirt: '#2f4a73', skirtLen: 0.88, bareLegs: true, legs: '#f3d4bb', shoes: '#5a2a26', sleeve: '#efe3c7', cuff: '#efe3c7', neckline: true,
    over: ({ T, sw, hw, B, lw, S, bt }) => {
      const col = '#efe3c7';
      const L = [T(-sw * 0.98, -B.torsoH + 15), T(-sw * 0.3, -B.torsoH + 1), T(-sw * 0.18, -B.torsoH * 0.35), T(-hw * 0.35, 6), T(-hw * 0.98, 6)];
      const Rr = [T(sw * (1 - 0.35 * bt), -B.torsoH + 15), T(sw * 0.3, -B.torsoH + 1), T(sw * 0.2, -B.torsoH * 0.35), T(hw * 0.35, 6), T(hw * (1 - 0.3 * bt), 6)];
      const p = T(-sw * 0.08, -B.torsoH * 0.7);
      return path(smoothD(L, true, 0.2), S(col)) + path(smoothD(Rr, true, 0.2), S(col)) + circle(p[0], p[1], 3, { fill: '#caa66a', stroke: C.ink, 'stroke-width': lw * 0.5 }) + circle(p[0], p[1] + 22, 3, { fill: '#caa66a', stroke: C.ink, 'stroke-width': lw * 0.5 });
    } },
  earrings: true,
};

export const CAST = { harry, harryRobes, harryRaven, mcgonagall, dad, mum };

// ---------- Mrs Figg: the occasional babysitter, grey hair escaping a hairnet
export const figg = {
  name: 'figg', body: { ...ADULT_F, torsoH: 136, legU: 92, legL: 90, headRx: 50, headRy: 54, shoulderW: 92, waistW: 90, hipW: 100 },
  skin: '#ecc9ae', skinShade: '#c99f86',
  head: { jaw: 0.66, chin: 0.98, cheek: 0.96 },
  face: adultFace({ eye: { color: '#6a6a4a', w: 17, h: 14, iris: 6 }, brow: { color: '#9d978f', len: 20, w: 3.6 }, nose: 'long', noseLen: 20, wrinkles: true, cheekLines: true, lips: '#b77a7a', rosy: true }),
  hair: { color: '#a8a39a', ...H.curlyShort('figg', { recede: 0 }), },
  hat: ({ rx, ry, s, lw }) => { // hairnet
    let d = '';
    for (let i = -4; i <= 4; i++) d += `M${i * rx * 0.24 + s * 8},${-ry * 1.12} Q${i * rx * 0.3 + s * 8},${-ry * 0.7} ${i * rx * 0.28 + s * 8},${-ry * 0.3} `;
    for (let j = 0; j < 4; j++) d += `M${-rx * 1.0},${-ry * (0.4 + j * 0.2)} Q${s * 10},${-ry * (0.55 + j * 0.2) - 6} ${rx * 1.0},${-ry * (0.4 + j * 0.2)} `;
    return path(d, { fill: 'none', stroke: '#6b5a70', 'stroke-width': lw * 0.45, opacity: 0.7 });
  },
  outfit: { top: '#6b4a6e', skirt: '#5a4a3a', skirtLen: 0.9, bareLegs: true, socks: '#8a7f73', shoes: '#3a2a22', sleeve: '#6b4a6e', neckline: true, collar: '#efe6d2' },
};

// ---------- Flashback: young Lily Evans and young Petunia Evans (sepia memory panels)
export const lilyTeen = {
  name: 'lilyTeen', body: { ...TEEN }, skin: '#f4d6be', skinShade: '#d9ae95',
  head: { jaw: 0.56, chin: 1.02, cheek: 0.9 },
  face: kidFace({ eyeY: 8, eyeSpacing: 23, eye: { color: '#2f8a4c', w: 22, h: 24, iris: 9.5, lash: 2.1 }, brow: { color: '#8a3319', len: 19, w: 3.8 }, lips: '#c96a6f', rosy: true, mouthY: 42 }),
  hair: { color: '#b3421f', ...H.long('lily', { len: 1.9, part: 0.1 }) },
  outfit: { top: '#23202a', robe: true, robeColor: '#23202a', robeLen: 0.9, wideSleeves: true, cuffW: 1.7, legs: '#3b3a45', shoes: '#3a2418', collar: '#f2ecde', robeTrim: '#7b2433', tie: '#7b2433' },
};
export const petuniaTeen = {
  name: 'petuniaTeen', body: { ...TEEN, neck: 22, headRx: 50, headRy: 60 }, skin: '#ecd3bd', skinShade: '#cfb09a',
  head: { jaw: 0.58, chin: 1.08, cheek: 0.86 },
  face: kidFace({ eyeY: 8, eyeSpacing: 20, eye: { color: '#6a7a8a', w: 16, h: 17, iris: 6.5, lash: 1.4 }, brow: { color: '#7a5a3a', len: 17, w: 3.2 }, nose: 'long', noseLen: 20, noseY: 26, mouthY: 44, freckles: true }),
  hair: { color: '#8a6a44', ...H.ponytail('pet') },
  outfit: { top: '#8a8f7a', skirt: '#5a5f55', skirtLen: 0.85, bareLegs: true, socks: '#efe6d2', shoes: '#3a2a22', sleeve: '#8a8f7a', collar: '#efe6d2' },
};
Object.assign(CAST, { figg, lilyTeen, petuniaTeen });

// ---------- Vernon Dursley (a memory, and a lucky escape): large, moustached
export const vernon = {
  name: 'vernon', body: { ...ADULT_M, headRx: 60, headRy: 58, neck: 6, neckW: 40, shoulderW: 150, waistW: 190, hipW: 170, torsoH: 180, armW: 34, legW: 40 },
  skin: '#eab89c', skinShade: '#c98f74',
  head: { jaw: 0.8, chin: 1.0, cheek: 1.0 },
  face: adultFace({ eye: { color: '#4a4a5a', w: 13, h: 11, iris: 5 }, brow: { color: '#5a3a24', len: 20, w: 5 }, nose: 'button', mouthY: 44, rosy: true }),
  hair: { color: '#5a3a24', ...H.neat('vern', { part: 0.3 }) },
  facialHair: ({ rx, ry, s, lw, F, mz }) => path(`M${mz.x - 30},${F.mouthY - 2} Q${mz.x - 14},${F.mouthY - 20} ${mz.x},${F.mouthY - 12} Q${mz.x + 14},${F.mouthY - 20} ${mz.x + 30},${F.mouthY - 2} Q${mz.x},${F.mouthY - 6} ${mz.x - 30},${F.mouthY - 2}Z`, { fill: '#5a3a24', stroke: C.ink, 'stroke-width': lw * 0.8 }),
  outfit: { top: '#6b5a48', legs: '#4a4038', shoes: '#2a1a12', collar: '#f2ecde', tie: '#3b4a6b', hem: false },
};
CAST.vernon = vernon;

// ---------- extras: deterministic random bystanders (adults & children), for crowds and walk-ons
const SKINS = [['#f3d2b5', '#dca88a'], ['#eec4a1', '#d49c7b'], ['#d7a57d', '#b77f5b'], ['#c48a61', '#9f6644'], ['#8e5a3b', '#6b3f27'], ['#f0d6c2', '#d2b19a']];
const HAIRC = [C.hairBlack, C.hairBrown, C.hairChestnut, C.hairAuburn, C.hairGinger, C.hairBlonde, C.hairSandy, C.hairGrey, C.hairWhite];
const ROBES = ['#3b3444', '#5b3553', '#2f4a33', '#243352', '#6b4429', '#7b2433', '#4a4a3a', '#6b5a70', '#35505a', '#8a6a45'];
export function makeExtra(seed, o = {}) {
  const R = rng('x' + seed);
  const kid = o.kid ?? false;
  const female = o.female ?? R.chance(0.5);
  const old = !kid && (o.old ?? R.chance(0.25));
  const [skin, skinShade] = R.pick(SKINS);
  const hc = old ? R.pick([C.hairGrey, C.hairWhite, '#b9b4ab']) : R.pick(HAIRC);
  const styles = female ? ['long', 'bun', 'pony', 'bushy', 'neat'] : (old ? ['bald', 'curly', 'neat'] : ['neat', 'curly', 'messy', 'neat']);
  const st = o.hairStyle || R.pick(styles);
  const hair = st === 'long' ? H.long('e' + seed, { len: 1.4 + R() * 0.6 }) : st === 'bun' ? H.bun('e' + seed, { bunR: 0.4 }) : st === 'pony' ? H.ponytail('e' + seed) :
    st === 'bushy' ? H.bushy('e' + seed) : st === 'bald' ? H.bald({ fringe: true }) : st === 'curly' ? H.curlyShort('e' + seed, { recede: old ? 0.5 : 0 }) : st === 'messy' ? H.messy('e' + seed) : H.neat('e' + seed, { part: R.range(-0.4, 0.4) });
  const robe = o.robe ?? R.pick(ROBES);
  const body = kid ? { ...KID, torsoH: KID.torsoH * R.range(0.95, 1.05), legU: KID.legU * R.range(0.95, 1.08) } : { ...(female ? ADULT_F : ADULT_M), waistW: (female ? ADULT_F : ADULT_M).waistW * R.range(0.95, 1.3) };
  const face = kid ? kidFace({ eye: { color: R.pick(['#5b4632', '#3d6a8a', '#3f6b4f', '#6a4a2a']) }, brow: { color: hc }, rosy: true, freckles: R.chance(0.2) })
    : adultFace({ eye: { color: R.pick(['#5b4632', '#3d6a8a', '#3f6b4f', '#6a4a2a']), w: 19, h: 16, iris: 7 }, brow: { color: hc }, nose: R.pick(['long', 'button', 'long']), wrinkles: old, cheekLines: old, lips: female ? '#b8676b' : undefined, rosy: R.chance(0.4) });
  return {
    name: 'extra' + seed, body, skin, skinShade, head: { jaw: R.range(0.5, 0.7), chin: R.range(0.98, 1.06), cheek: R.range(0.86, 0.96) }, face,
    hair: { color: hc, ...hair }, glasses: R.chance(0.15) ? { r: kid ? 16 : 13, shape: R.pick(['round', 'square']), frame: 0.8 } : undefined,
    outfit: o.outfit || (o.muggle
      ? { top: R.pick(['#8a4a3a', '#4a6a8a', '#6a7a4a', '#9a8a6a', '#5a4a6a']), legs: R.pick(['#3a3a4a', '#5a4a3a']), shoes: '#2a1a12', collar: R.chance(0.5) ? '#efe6d2' : undefined, ...(female && R.chance(0.6) ? { skirt: '#4a4a5a', skirtLen: 0.8, bareLegs: true } : {}) }
      : { top: robe, robe: true, robeColor: robe, robeLen: 0.97, wideSleeves: true, cuffW: 1.8, legs: '#2a2630', shoes: '#2a1a12', robeTrim: shade(robe, -0.25) }),
    hat: o.witchHat ? ({ rx, ry, s, lw }) => path(`M${-rx * 1.4},${-ry * 0.7} Q0,${-ry * 0.5} ${rx * 1.4},${-ry * 0.75} Q${rx * 0.7},${-ry * 0.95} ${rx * 0.5},${-ry * 0.95} Q${rx * 0.2 + s * 30},${-ry * 2.2} ${-rx * 0.1 + s * 40},${-ry * 2.4} Q${-rx * 0.3},${-ry * 1.6} ${-rx * 0.6},${-ry * 0.95} Q${-rx * 0.9},${-ry * 0.9} ${-rx * 1.4},${-ry * 0.7}Z`, { fill: shade(robe, -0.3), stroke: C.ink, 'stroke-width': lw }) : undefined,
  };
}

// ---------- Leaky Cauldron & Diagon Alley walk-ons
export const tom = {
  name: 'tom', body: { ...ADULT_M, waistW: 120, hipW: 110, headRx: 54, headRy: 56 }, skin: '#ecc3a3', skinShade: '#cc987a',
  head: { jaw: 0.7, chin: 0.98, cheek: 0.98 },
  face: adultFace({ eye: { color: '#5b4632', w: 16, h: 13, iris: 6 }, brow: { color: '#b9b4ab', len: 22, w: 5 }, nose: 'button', wrinkles: true, cheekLines: true, rosy: true }),
  hair: { color: '#c9c4bb', ...H.bald({ fringe: true, wisps: true }) },
  outfit: { top: '#6a5a44', legs: '#3a302a', shoes: '#2a1a12', sleeve: '#efe6d2', collar: '#efe6d2', hem: false,
    over: ({ T, sw, hw, B, lw, S }) => { const a = T(-sw * 0.55, -B.torsoH * 0.62), b = T(sw * 0.5, -B.torsoH * 0.62), c = T(hw * 0.7, 30), d = T(-hw * 0.75, 30); return path(`M${a[0]},${a[1]} L${b[0]},${b[1]} L${c[0]},${c[1]} L${d[0]},${d[1]}Z`, S('#e8dcc2')); } },
};
export const doris = {
  name: 'doris', body: { ...ADULT_F, torsoH: 130, legU: 90, legL: 86, headRx: 48, headRy: 52, waistW: 84, hipW: 96 }, skin: '#efcfb8', skinShade: '#cfa98f',
  head: { jaw: 0.62, chin: 1.0, cheek: 0.92 },
  face: adultFace({ eye: { color: '#5d7fa3', w: 17, h: 14, iris: 6.5 }, brow: { color: '#d8d4cc', len: 18, w: 3.2 }, nose: 'button', wrinkles: true, cheekLines: true, lips: '#b8676b', rosy: true }),
  hair: { color: '#dcd7ce', ...H.curlyShort('doris') },
  outfit: { top: '#6b4a6e', robe: true, robeColor: '#6b4a6e', robeLen: 0.98, wideSleeves: true, cuffW: 1.6, legs: '#2a2630', shoes: '#2a1a12', robeTrim: '#4a2e4c' },
  hat: ({ rx, ry, s, lw }) => path(`M${-rx * 1.4},${-ry * 0.62} Q0,${-ry * 0.4} ${rx * 1.4},${-ry * 0.66} Q${rx * 0.6},${-ry * 0.92} ${rx * 0.5},${-ry * 0.92} Q${rx * 0.3 + s * 20},${-ry * 1.7} ${-rx * 0.4 + s * 30},${-ry * 1.9} Q${-rx * 0.3},${-ry * 1.3} ${-rx * 0.6},${-ry * 0.92} Q${-rx},${-ry * 0.88} ${-rx * 1.4},${-ry * 0.62}Z`, { fill: '#4a2e4c', stroke: C.ink, 'stroke-width': lw }) + path(`M${-rx * 0.55},${-ry * 0.92} Q0,${-ry * 0.8} ${rx * 0.5},${-ry * 0.94}`, { fill: 'none', stroke: '#c9a24a', 'stroke-width': lw * 2 }),
  hatTop: 0.6,
};
// Professor Quirinus Quirrell: young, pale, prematurely balding, twitching. (Keep him slightly *off*.)
export const quirrell = {
  name: 'quirrell', body: { ...ADULT_M, shoulderW: 104, waistW: 82, hipW: 86, headRx: 47, headRy: 58, armW: 23, legW: 27 }, skin: '#ecdfd2', skinShade: '#c8b6a6',
  head: { jaw: 0.5, chin: 1.06, cheek: 0.84 },
  face: adultFace({ eye: { color: '#7d8fa3', w: 20, h: 17, iris: 6.5, lash: 1.3 }, brow: { color: '#6b5a48', len: 20, w: 3 }, nose: 'long', noseLen: 23, mouth: { w: 18 }, cheekLines: true }),
  hair: { color: '#6b5a48', ...H.bald({ fringe: true, wisps: true }) },
  outfit: { top: '#3b3242', robe: true, robeColor: '#3b3242', robeLen: 1.0, wideSleeves: true, cuffW: 1.9, legs: '#221d26', shoes: '#1d1410', robeTrim: '#56455e', neckline: true },
};
// Young James Potter (memory / silhouette): Harry's hair, taller.
export const james = {
  name: 'james', body: { ...ADULT_M, waistW: 92, hipW: 90, headRx: 50, headRy: 56 }, skin: '#efcfb3', skinShade: '#d2a98c',
  head: { jaw: 0.58, chin: 1.0 }, face: adultFace({ eye: { color: '#6a4a2a', w: 20, h: 17, iris: 7.5 }, brow: { color: '#1f1a1f' }, nose: 'long', noseLen: 18 }),
  hair: { color: C.hairBlack, ...H.messy('james') }, glasses: { r: 15, shape: 'round', frame: 0.9 },
  outfit: { top: '#5a2a2a', robe: true, robeColor: '#3a2a2a', robeLen: 0.96, wideSleeves: true, legs: '#2a2630', shoes: '#2a1a12' },
};
export const lilyAdult = { ...lilyTeen, name: 'lily', body: { ...ADULT_F, headRx: 47, headRy: 54 }, face: adultFace({ eye: { color: '#2f8a4c', w: 23, h: 20, iris: 8.4, lash: 2.0 }, brow: { color: '#8a3319', len: 19, w: 3.4 }, nose: 'button', lips: '#c96a6f', rosy: true }) };
// The Dark Lord, as he appears in stories: a hooded shape. Only ever drawn as a silhouette in Book One.
export const darkLord = {
  name: 'darkLord', body: { ...ADULT_M, torsoH: 190, legU: 130, legL: 124, shoulderW: 110, waistW: 80, hipW: 90, headRx: 46, headRy: 60 }, skin: '#d8d4cc', skinShade: '#aaa49a',
  head: { jaw: 0.42, chin: 1.1, cheek: 0.8 }, face: adultFace({ eye: { color: '#c41e1e', w: 18, h: 9, iris: 5 }, brow: { color: '#000' }, nose: 'button' }),
  hair: { color: '#111', ...H.bald() },
  outfit: { top: '#0b0a0d', robe: true, robeColor: '#0b0a0d', robeLen: 1.05, flare: 1.6, wideSleeves: true, cuffW: 2.4, legs: '#000', shoes: '#000' },
  hat: ({ rx, ry, s, lw }) => path(`M${-rx * 1.3},${ry * 0.9} Q${-rx * 1.6},${-ry * 1.1} ${s * 20},${-ry * 1.55} Q${rx * 1.6},${-ry * 1.1} ${rx * 1.3},${ry * 0.9} Q${rx * 0.9},${ry * 0.2} ${rx * 0.95},${-ry * 0.4} Q0,${-ry * 1.05} ${-rx * 0.95},${-ry * 0.4} Q${-rx * 0.9},${ry * 0.2} ${-rx * 1.3},${ry * 0.9}Z`, { fill: '#0b0a0d', stroke: '#000', 'stroke-width': lw }),
};
Object.assign(CAST, { tom, doris, quirrell, james, lilyAdult, darkLord });

// ---------- Griphook and the goblins of Gringotts
export const goblin = (seed = 'griphook', o = {}) => {
  const R = rng(seed);
  return {
    name: seed, body: { ...KID, torsoH: 84, legU: 40, legL: 38, headRx: 56, headRy: 54, shoulderW: 70, waistW: 66, hipW: 62, armW: 17, legW: 20, foot: 34 },
    skin: o.skin || R.pick(['#b9b58a', '#a9ad86', '#c2b590']), skinShade: '#8f8a62',
    head: { jaw: 0.72, chin: 0.92, cheek: 0.98 }, ears: { pointy: true, y: 0, r: 14 },
    face: adultFace({ eyeY: 0, eyeSpacing: 22, eye: { color: '#2a2418', w: 16, h: 12, iris: 5.5, lash: 1.4 }, brow: { color: '#d8d4c8', len: 22, w: 6, gap: 4 }, nose: 'goblin', noseY: 20, mouthY: 44, mouth: { w: 28 }, wrinkles: true, cheekLines: true }),
    hair: { color: '#d8d4c8', ...H.bald({ fringe: true, wisps: R.chance(0.5) }) },
    outfit: { top: o.coat || '#7b2433', legs: '#1d1a20', shoes: '#1d1410', collar: '#efe6d2', hem: false,
      torsoDetail: ({ T, B, lw }) => [0.2, 0.45, 0.7].map((k) => { const p = T(0, -B.torsoH * k); return circle(p[0], p[1], 3.5, { fill: '#e7bb4f', stroke: C.ink, 'stroke-width': lw * 0.4 }); }).join('') },
  };
};
export const griphook = goblin('griphook');
export const oldMan = { ...makeExtra(301, { old: true, female: false, hairStyle: 'bald', robe: '#4a4a3a' }), name: 'oldMan' };
export const mokeKeeper = { ...makeExtra(302, { female: true, old: false, hairStyle: 'bun', robe: '#d9c36a' }), name: 'mokeKeeper' };
Object.assign(CAST, { griphook, oldMan, mokeKeeper });

// ---------- Draco Malfoy: pointed, pale, platinum, smug — and trained
export const draco = {
  name: 'draco', body: { ...KID, headRx: 57, headRy: 58, shoulderW: 72 }, skin: '#f4e1d2', skinShade: '#d8bfae',
  head: { jaw: 0.46, chin: 1.12, cheek: 0.9 },
  face: kidFace({ eyeY: 12, eyeSpacing: 24, eye: { color: '#7d8a99', w: 23, h: 24, iris: 9.5, lash: 1.8 }, brow: { color: '#d9cba0', len: 21, w: 4.4 }, rosy: false, mouth: { w: 18 } }),
  hair: { color: '#efe3bd', ...H.keyed({
    front: { F: [[-61, -14], [-66, -36], [-54, -62], [-24, -78], [6, -82], [34, -78], [58, -62], [66, -36], [61, -14], [54, -26], [44, -44], [26, -52], [8, -54], [-10, -52], [-30, -48], [-48, -40], [-55, -28]],
             S: [[-60, -8], [-70, -34], [-62, -62], [-30, -80], [4, -84], [34, -78], [56, -60], [58, -36], [54, -18], [48, -30], [40, -44], [24, -54], [8, -56], [-10, -54], [-30, -48], [-46, -38], [-54, -22]] },
    back: { F: [[-64, 20], [-70, -20], [-50, -62], [0, -76], [50, -62], [70, -20], [64, 20], [0, 10]], S: [[-70, 26], [-78, -16], [-60, -62], [-6, -78], [44, -62], [56, -20], [50, 16], [-10, 12]] },
    strands: { F: [[[-40, -40], [-20, -64], [10, -74]], [[-10, -46], [10, -66], [34, -70]], [[20, -46], [36, -60], [52, -56]]], S: [[[-34, -42], [-14, -66], [16, -76]], [[-4, -48], [16, -68], [38, -70]], [[24, -48], [38, -60], [50, -54]]] },
    strandColor: '#c9b98a',
  }) },
  outfit: { top: '#1d1b22', robe: true, robeColor: '#1d1b22', robeLen: 0.95, wideSleeves: true, cuffW: 1.6, legs: '#2a2630', shoes: '#151012', robeTrim: '#8a9aa8', collar: '#f2ecde' },
};
export const dracoFitting = { ...draco, outfit: { ...draco.outfit, top: '#2a2830', robeColor: '#2a2830', pattern: 'checker', robeTrim: '#2a2830' } };

// ---------- Lucius Malfoy: tall, cold, elegant, a silver-handled cane that looks like a weapon
export const lucius = {
  name: 'lucius', body: { ...ADULT_M, torsoH: 180, legU: 122, legL: 116, shoulderW: 116, waistW: 88, hipW: 90, headRx: 48, headRy: 60 }, skin: '#f0dccb', skinShade: '#cdb4a2',
  head: { jaw: 0.46, chin: 1.1, cheek: 0.84 },
  face: adultFace({ eye: { color: '#8a97a6', w: 19, h: 14, iris: 6.3, lash: 1.4 }, brow: { color: '#d9cba0', len: 22, w: 3.6 }, nose: 'long', noseLen: 24, mouth: { w: 18 }, cheekLines: true }),
  hair: { color: '#efe3bd', ...H.long('lucius', { len: 2.4, part: 0 }) },
  outfit: { top: '#111015', robe: true, robeColor: '#111015', robeLen: 1.02, flare: 1.35, wideSleeves: true, cuffW: 1.9, cuff: '#8a9aa8', legs: '#000', shoes: '#0a0808', robeTrim: '#a9b4c0',
    torsoDetail: ({ T, B, lw }) => { const p = T(0, -B.torsoH + 18); return circle(p[0], p[1], 8, { fill: '#c9ced4', stroke: C.ink, 'stroke-width': lw * 0.6 }) + path(`M${p[0] - 4},${p[1] + 2} q4,-8 8,0`, { fill: 'none', stroke: '#4a5a4a', 'stroke-width': lw * 0.6 }); } },
};
export const malkin = {
  name: 'malkin', body: { ...ADULT_F, torsoH: 140, legU: 96, legL: 92, headRx: 49, headRy: 52, waistW: 100, hipW: 112 }, skin: '#efcfb6', skinShade: '#cfa98f',
  head: { jaw: 0.66, chin: 0.98, cheek: 0.96 },
  face: adultFace({ eye: { color: '#6a5a4a', w: 17, h: 14, iris: 6.4 }, brow: { color: '#9d978f', len: 20, w: 3.4 }, nose: 'button', wrinkles: true, lips: '#b8676b', rosy: true }),
  hair: { color: '#b9b4ab', ...H.bun('malkin', { soft: true, bunR: 0.44, bunY: 0.8, hairline: 0.55 }) },
  glasses: { r: 12, shape: 'half', frame: 0.8, color: '#6b4a2a' },
  outfit: { top: '#8a5a7a', robe: true, robeColor: '#8a5a7a', robeLen: 0.98, wideSleeves: true, cuffW: 1.6, legs: '#2a2630', shoes: '#2a1a12', robeTrim: '#6a3a5a',
    torsoDetail: ({ T, B, lw }) => { const p = T(-10, -B.torsoH * 0.55); return circle(p[0], p[1], 10, { fill: '#c43a32', stroke: C.ink, 'stroke-width': lw * 0.6 }) + [0, 1, 2, 3].map((k) => line(p[0] - 6 + k * 4, p[1] - 12, p[0] - 4 + k * 4, p[1] - 4, { stroke: '#c9ced4', 'stroke-width': 1.5 })).join(''); } },
};
export const asst1 = { ...makeExtra(501, { female: true, old: false, hairStyle: 'pony', robe: '#6b5a70' }), name: 'asst1' };
export const asst2 = { ...makeExtra(502, { female: true, old: false, hairStyle: 'long', robe: '#5a6a70' }), name: 'asst2' };
Object.assign(CAST, { draco, dracoFitting, lucius, malkin, asst1, asst2 });
