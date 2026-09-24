#!/usr/bin/env node
// Render an episode's tiles to WebP (site) or PNG (preview).
//   node engine/render.mjs ep01                 → site/ep01/*.webp + manifest
//   node engine/render.mjs ep01 --png 3,4       → scratch/ep01-003.png ... (for review)
//   node engine/render.mjs ep01 --only 3-9      → re-render a subset into site/
//   node engine/render.mjs --file work/tests/foo.js --png   (any module exporting `tiles`)
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { composeTile, TILE_W } from './core/layout.js';
import { fontCSS } from './core/fonts.js';
import { STAGE_CSS, STAGE_JS } from './core/stage.js';
import { resetUid } from './core/svg.js';

const ROOT = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const SCALE = 1.25; // 800 css px → 1000 px images

function parseRange(s) {
  if (!s) return null;
  const out = new Set();
  for (const part of s.split(',')) {
    const [a, b] = part.split('-').map(Number);
    for (let i = a; i <= (b || a); i++) out.add(i);
  }
  return out;
}

export async function openStage() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: TILE_W, height: 1200 }, deviceScaleFactor: SCALE });
  const stageFile = path.join(ROOT, 'scratch', 'stage.html');
  fs.mkdirSync(path.dirname(stageFile), { recursive: true });
  fs.writeFileSync(stageFile, `<!doctype html><html><head><meta charset="utf-8"><style>${fontCSS('file')}\n${STAGE_CSS}</style></head><body><div id="root"></div><script>${STAGE_JS}</script>
<div style="position:absolute;left:-9999px;font-family:Andika">.<b>.</b><i>.</i></div><div style="position:absolute;left:-9999px;">${['Alegreya', 'Alegreya Sans', 'Alegreya SC', 'Caveat', 'IM Fell English', 'IM Fell English SC', 'IM Fell DW Pica', 'Pinyon Script', 'Grenze Gotisch', 'Patrick Hand', 'UnifrakturMaguntia'].map((f) => `<span style="font-family:'${f}'">a<i>a</i><b>a</b></span>`).join('')}</div></body></html>`);
  await page.goto(url.pathToFileURL(stageFile).href);
  await page.evaluate(() => document.fonts.ready);
  return { browser, page };
}

export async function renderTile(page, tile) {
  resetUid();
  const { html, H } = composeTile(tile);
  await page.setViewportSize({ width: TILE_W, height: Math.max(100, Math.ceil(H)) });
  await page.evaluate((h) => { document.getElementById('root').innerHTML = h; }, html);
  await page.evaluate(() => window.layoutBubbles());
  const buf = await page.locator('#tile').screenshot({ type: 'png', animations: 'disabled' });
  return { buf, H };
}

function altText(tile) {
  const parts = [];
  if (tile.alt) parts.push(tile.alt);
  for (const b of tile.bubbles || []) {
    if (!b.text) continue;
    const who = b.who ? `${b.who}: ` : '';
    parts.push(who + b.text.replace(/\*+/g, '').replace(/\n/g, ' '));
  }
  return parts.join(' / ');
}

async function main() {
  const args = process.argv.slice(2);
  const fileIdx = args.indexOf('--file');
  const png = args.includes('--png');
  const pngIdx = args.indexOf('--png');
  const onlyIdx = args.indexOf('--only');
  let modPath, epId;
  if (fileIdx >= 0) { modPath = path.resolve(args[fileIdx + 1]); epId = path.basename(modPath, '.js'); }
  else { epId = args[0]; modPath = path.join(ROOT, 'episodes', `${epId}.js`); }
  const mod = await import(url.pathToFileURL(modPath).href + `?t=${Date.now()}`);
  const ep = mod.default || mod;
  const tiles = typeof ep.tiles === 'function' ? ep.tiles() : ep.tiles;
  let pick = null;
  if (png && args[pngIdx + 1] && !args[pngIdx + 1].startsWith('--')) pick = parseRange(args[pngIdx + 1]);
  if (onlyIdx >= 0) pick = parseRange(args[onlyIdx + 1]);

  const { browser, page } = await openStage();
  const outDir = png ? path.join(ROOT, 'scratch') : path.join(ROOT, 'site', epId);
  fs.mkdirSync(outDir, { recursive: true });
  const manifestPath = path.join(ROOT, 'site', epId, 'manifest.json');
  let manifest = { id: epId, title: ep.title, number: ep.number, subtitle: ep.subtitle || '', tiles: [] };
  if (!png && pick && fs.existsSync(manifestPath)) manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const t0 = Date.now();
  for (let i = 0; i < tiles.length; i++) {
    const n = i + 1;
    if (pick && !pick.has(n)) continue;
    const tile = tiles[i];
    const { buf, H } = await renderTile(page, tile);
    const name = `${String(n).padStart(3, '0')}`;
    if (png) {
      fs.writeFileSync(path.join(outDir, `${epId}-${name}.png`), buf);
    } else {
      const file = `${name}.webp`;
      await sharp(buf).webp({ quality: 80, effort: 5 }).toFile(path.join(outDir, file));
      manifest.tiles[i] = { file, w: TILE_W, h: Math.round(H), alt: altText(tile) };
    }
    process.stdout.write(`\r${epId} tile ${n}/${tiles.length}   `);
  }
  if (!png) {
    manifest.title = ep.title; manifest.number = ep.number; manifest.subtitle = ep.subtitle || '';
    manifest.tiles = manifest.tiles.slice(0, tiles.length);
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
  }
  console.log(`\ndone in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  await browser.close();
}

if (import.meta.url === url.pathToFileURL(process.argv[1]).href) main().catch((e) => { console.error(e); process.exit(1); });
