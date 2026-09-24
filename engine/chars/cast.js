// The cast. Each entry is a character *design*: proportions, palette, face, hair, outfit.
// Outfit variants (e.g. Harry at home vs. in robes) are separate entries built with `variant()`.
import { C } from '../core/palette.js';
import { path, ellipse, circle, g, smoothD, shade, lerp, rng, taperD } from '../core/svg.js';
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
  head: { jaw: 0.5, chin: 1.05, cheek: 0.82 },
  face: adultFace({ eyeY: 2, eye: { color: '#3f6b4f', w: 21, h: 18, iris: 7.2 }, brow: { color: '#3a3136', len: 22, w: 3.8, gap: 7 }, nose: 'point', noseLen: 24, noseY: 22, mouthY: 40, mouth: { w: 18 }, cheekLines: true, lips: '#a45f5f', wrinkles: true }),
  hair: { color: '#2e2a2e', ...H.keyed({ base: 45,
    front: { F: [[-47, 6], [-50, -20], [-46, -44], [-20, -52], [0, -48], [20, -52], [46, -44], [50, -20], [47, 6], [41, -4], [35, -26], [14, -37], [0, -35], [-14, -37], [-35, -26], [-41, -4]],
             S: [[-42, 10], [-52, -18], [-48, -44], [-16, -52], [6, -49], [26, -51], [46, -42], [46, -20], [42, 2], [38, -6], [34, -26], [20, -38], [6, -36], [-8, -38], [-26, -28], [-34, -2]] },
    strands: { F: [[[0, -46], [-22, -34], [-40, -10]], [[0, -46], [22, -34], [40, -10]]], S: [[[6, -47], [-14, -35], [-34, -8]], [[6, -47], [26, -34], [38, -8]]] },
    strandColor: '#9d9aa0',
    backFn: (ctx) => { const { rx, ry, s, lw } = ctx; const bx = -s * rx * 1.25, by = -ry * 0.05; return ellipse(bx, by, rx * 0.36, rx * 0.34, { fill: '#27232a', stroke: C.ink, 'stroke-width': lw }) + path(`M${bx - rx * 0.2},${by - 3} q${rx * 0.2},-8 ${rx * 0.4},0`, { fill: 'none', stroke: '#8f8a92', 'stroke-width': lw * 0.7 }); },
  }) },
  glasses: { r: 13.5, shape: 'square', frame: 0.8, color: '#2b2226' },
  outfit: { top: '#1f4a35', robe: true, robeColor: '#1f4a35', robeLen: 1.0, flare: 1.25, wideSleeves: true, cuffW: 2.2, cuff: '#7b2433', legs: '#1b1b1b', shoes: '#211612', neckline: true, robeTrim: '#7b2433',
    torsoDetail: ({ T, sw, B, lw }) => { // tartan hint at the collar
      const a = T(-sw * 0.5, -B.torsoH + 4), b = T(sw * 0.4, -B.torsoH + 4);
      return path(`M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${a[1] + 34} ${b[0]},${b[1]}`, { fill: 'none', stroke: '#7b2433', 'stroke-width': lw * 3.4 }) +
        path(`M${a[0]},${a[1] + 3} Q${(a[0] + b[0]) / 2},${a[1] + 37} ${b[0]},${b[1] + 3}`, { fill: 'none', stroke: '#d6a33a', 'stroke-width': lw * 0.5, 'stroke-dasharray': '4 4' });
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
