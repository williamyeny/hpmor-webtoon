// usage: node work/tilesfor.mjs epXX pose1,pose2 [--props]  — tile numbers that draw a character in one of these poses
// (or holding a prop with --props). Uses the rig's draw hook; no browser needed.
import { composeTile } from '../engine/core/layout.js';
import { hooks } from '../engine/chars/rig.js';
const [ep, poses, flag] = process.argv.slice(2);
const want = new Set((poses || '').split(',').filter(Boolean));
const mod = await import(`../episodes/${ep}.js`);
const e = mod.default; const tiles = typeof e.tiles === 'function' ? e.tiles() : e.tiles;
const hits = [];
let log; hooks.onDraw = (def, o) => log.push({ pose: typeof o.pose === 'string' ? o.pose : 'custom', prop: !!(o.armF?.prop || o.armB?.prop) });
tiles.forEach((t, i) => { log = []; try { composeTile(t); } catch {} if (log.some((x) => want.has(x.pose) || (flag === '--props' && x.prop))) hits.push(i + 1); });
console.log(hits.join(' '));
