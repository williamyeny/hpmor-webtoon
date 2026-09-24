// usage: node work/tilesfor.mjs epXX pose1,pose2 [--props]  — tile numbers that draw a character in one of these poses
// (or holding a prop with --props). Uses a logging hook in rig.js drawCharacter; no browser needed.
import { composeTile } from '../engine/core/layout.js';
const [ep, poses, flag] = process.argv.slice(2);
const want = new Set((poses || '').split(',').filter(Boolean));
const mod = await import(`../episodes/${ep}.js`);
const e = mod.default; const tiles = typeof e.tiles === 'function' ? e.tiles() : e.tiles;
const hits = [];
tiles.forEach((t, i) => { globalThis.__poseLog = []; try { composeTile(t); } catch {} if (globalThis.__poseLog.some((x) => want.has(x.pose) || (flag === '--props' && x.prop))) hits.push(i + 1); });
console.log(hits.join(' '));
