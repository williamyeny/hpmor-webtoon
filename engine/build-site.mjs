#!/usr/bin/env node
// Builds the static reader: site/index.html (contents) and site/epXX/index.html (one per rendered episode).
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { SERIES, EPISODES } from '../episodes/catalog.js';
import { FONT_DIR } from './core/fonts.js';

const ROOT = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'site');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// fonts used by the UI
fs.mkdirSync(path.join(SITE, 'assets', 'fonts'), { recursive: true });
for (const f of ['im-fell-english-latin-400-normal', 'im-fell-english-latin-400-italic', 'im-fell-english-sc-latin-400-normal', 'alegreya-latin-400-normal', 'alegreya-latin-400-italic']) {
  fs.copyFileSync(path.join(FONT_DIR, f + '.woff2'), path.join(SITE, 'assets', 'fonts', f + '.woff2'));
}

const CSS = `
@font-face{font-family:'IM Fell English';src:url(fonts/im-fell-english-latin-400-normal.woff2) format('woff2');font-display:swap}
@font-face{font-family:'IM Fell English';font-style:italic;src:url(fonts/im-fell-english-latin-400-italic.woff2) format('woff2');font-display:swap}
@font-face{font-family:'IM Fell English SC';src:url(fonts/im-fell-english-sc-latin-400-normal.woff2) format('woff2');font-display:swap}
@font-face{font-family:'Alegreya';src:url(fonts/alegreya-latin-400-normal.woff2) format('woff2');font-display:swap}
@font-face{font-family:'Alegreya';font-style:italic;src:url(fonts/alegreya-latin-400-italic.woff2) format('woff2');font-display:swap}
:root{--paper:#f1e6cc;--paper2:#e6d6b2;--ink:#2a1b14;--ink2:#5a4032;--wax:#9c1f25;--wood:#241812;--gold:#c9a24a;--col:600px}
*{box-sizing:border-box}
html{background:var(--wood);-webkit-text-size-adjust:100%}
body{margin:0;color:var(--ink);font-family:'Alegreya',Georgia,serif;
  background:radial-gradient(ellipse at 50% 0%,#3a2619 0%,#241812 55%,#170f0b 100%) fixed;min-height:100vh}
a{color:inherit}
.col{max-width:var(--col);margin:0 auto;background:var(--paper)}
/* ---------- reader */
.bar{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:.6rem;padding:.55rem .9rem;
  background:rgba(36,24,18,.94);color:#efe2c4;font-family:'IM Fell English',serif;font-size:1rem;
  backdrop-filter:blur(4px);transition:transform .25s ease;max-width:var(--col);margin:0 auto}
.bar.hide{transform:translateY(-110%)}
.bar a{text-decoration:none;display:flex;align-items:center;gap:.35rem;white-space:nowrap}
.bar .t{flex:1;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;opacity:.85;font-style:italic}
.seal{display:inline-grid;place-items:center;width:1.7em;height:1.7em;border-radius:50%;background:radial-gradient(circle at 35% 30%,#c23a3f,#8a151b 70%);
  color:#f3d7c0;font-family:'IM Fell English SC',serif;font-size:.8em;box-shadow:0 1px 2px rgba(0,0,0,.4) inset,0 1px 3px rgba(0,0,0,.4)}
.strip{max-width:var(--col);margin:0 auto;background:var(--paper);line-height:0}
.strip img{display:block;width:100%;height:auto;-webkit-user-select:none;user-select:none}
.end{max-width:var(--col);margin:0 auto;background:var(--paper);padding:2.2rem 1.2rem 3rem;text-align:center;line-height:1.4}
.card{display:block;text-decoration:none;border:1px solid #bda981;background:var(--paper2);padding:1.1rem 1rem;margin:1rem auto;max-width:26rem;
  box-shadow:0 2px 0 #cdb88d, 0 6px 16px rgba(60,35,20,.18);border-radius:3px}
.card .k{font-family:'IM Fell English SC',serif;font-size:.95rem;color:var(--ink2)}
.card .h{font-family:'IM Fell English',serif;font-size:1.45rem;margin:.2rem 0}
.card .b{font-style:italic;color:var(--ink2);font-size:1rem}
.muted{color:var(--ink2);font-size:.95rem}
/* ---------- contents */
.cover{position:relative;line-height:0}
.cover img{width:100%;display:block}
.cover .fade{position:absolute;inset:auto 0 0 0;height:30%;background:linear-gradient(transparent,var(--paper))}
.head{padding:0 1.3rem 1rem;text-align:center;line-height:1.25}
.head h1{font-family:'IM Fell English',serif;font-weight:400;font-size:2.1rem;margin:.2rem 0 .4rem;letter-spacing:.3px}
.head h1 small{display:block;font-size:1.05rem;font-style:italic;color:var(--ink2)}
.head p{font-style:italic;color:var(--ink2);margin:.4rem auto 1rem;max-width:30rem;font-size:1.05rem}
.btn{display:inline-block;text-decoration:none;font-family:'IM Fell English SC',serif;font-size:1.15rem;background:var(--wax);color:#f7e6cf;
  padding:.65rem 1.4rem;border-radius:999px;box-shadow:0 2px 0 #5d0f13,0 5px 14px rgba(90,20,20,.35)}
.arc{font-family:'IM Fell English SC',serif;text-align:center;color:var(--ink2);margin:1.6rem 0 .4rem;font-size:1rem;letter-spacing:.5px}
.arc:before,.arc:after{content:'';display:inline-block;width:3rem;height:1px;background:#bda981;vertical-align:middle;margin:0 .7rem}
ol.eps{list-style:none;margin:0;padding:0 1rem 2rem}
ol.eps li{border-bottom:1px dashed #cdb88d}
ol.eps a,ol.eps .soon{display:flex;gap:.9rem;align-items:center;padding:.85rem .3rem;text-decoration:none}
ol.eps .n{flex:none;width:2.4rem;height:2.4rem;font-size:1rem}
ol.eps .tt{font-family:'IM Fell English',serif;font-size:1.2rem;line-height:1.2}
ol.eps .bb{font-style:italic;color:var(--ink2);font-size:.95rem;line-height:1.3;margin-top:.15rem}
ol.eps .soon{opacity:.45}
ol.eps .soon .n{background:#9b8b6e}
.foot{font-size:.85rem;color:#b9a888;text-align:center;padding:1.5rem 1rem 3rem;max-width:var(--col);margin:0 auto;line-height:1.5}
.foot a{color:#d8c7a2}
`;
fs.writeFileSync(path.join(SITE, 'assets', 'style.css'), CSS);

const READER_JS = `
(function(){
  var bar=document.querySelector('.bar'),last=0,ep=document.body.dataset.ep;
  addEventListener('scroll',function(){var y=scrollY;if(bar){if(y>last&&y>80)bar.classList.add('hide');else bar.classList.remove('hide');}last=y;
    if(ep){try{var h=document.documentElement.scrollHeight-innerHeight;localStorage.setItem('hpmor-progress',JSON.stringify({ep:ep,y:y,p:h>0?y/h:0,t:Date.now()}));}catch(e){}}
  },{passive:true});
  if(ep){try{var s=JSON.parse(localStorage.getItem('hpmor-progress')||'null');if(s&&s.ep===ep&&location.hash==='#continue'){addEventListener('load',function(){scrollTo(0,s.y)});}}catch(e){}}
  var cont=document.getElementById('continue');
  if(cont){try{var s2=JSON.parse(localStorage.getItem('hpmor-progress')||'null');if(s2&&s2.ep){var a=document.querySelector('[data-id="'+s2.ep+'"]');if(a){cont.href=s2.ep+'/#continue';cont.textContent='Continue · Episode '+Number(s2.ep.slice(2));}}}catch(e){}}
})();`;
fs.writeFileSync(path.join(SITE, 'assets', 'reader.js'), READER_JS);

const head = (title, rel, extra = '') => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title><meta name="theme-color" content="#241812">
<meta name="description" content="${esc(SERIES.tagline)}">
<link rel="stylesheet" href="${rel}assets/style.css">${extra}</head>`;

const ready = EPISODES.filter((e) => fs.existsSync(path.join(SITE, e.id, 'manifest.json')));
const seal = (n) => `<span class="seal n">${n}</span>`;

// ---------- episode pages
for (let i = 0; i < ready.length; i++) {
  const e = ready[i];
  const m = JSON.parse(fs.readFileSync(path.join(SITE, e.id, 'manifest.json'), 'utf8'));
  const next = ready[i + 1];
  const upcoming = !next ? EPISODES[EPISODES.findIndex((x) => x.id === e.id) + 1] : null;
  const imgs = m.tiles.map((t, k) => `<img src="${t.file}" width="1000" height="${Math.round(t.h * 1.25)}" alt="${esc(t.alt || '')}"${k > 2 ? ' loading="lazy"' : ''} decoding="async">`).join('\n');
  const html = `${head(`${e.number}. ${e.title} — ${SERIES.short}`, '../')}
<body data-ep="${e.id}">
<nav class="bar"><a href="../">${seal('✦')} Contents</a><span class="t">Ep. ${e.number} · ${esc(e.title)}</span></nav>
<main class="strip">
${imgs}
</main>
<section class="end">
${next ? `<a class="card" href="../${next.id}/"><div class="k">Next · Episode ${next.number}</div><div class="h">${esc(next.title)}</div><div class="b">${esc(next.blurb)}</div></a>`
    : upcoming ? `<div class="card"><div class="k">Coming next · Episode ${upcoming.number}</div><div class="h">${esc(upcoming.title)}</div><div class="b">${esc(upcoming.blurb)}</div></div>` : '<p class="muted">End of Book One.</p>'}
<p><a class="muted" href="../">Back to contents</a></p>
</section>
<script src="../assets/reader.js"></script>
</body></html>`;
  fs.writeFileSync(path.join(SITE, e.id, 'index.html'), html);
}

// ---------- contents / cover
const hasCover = fs.existsSync(path.join(SITE, 'cover.webp'));
const list = EPISODES.map((e) => {
  const ok = ready.find((r) => r.id === e.id);
  const inner = `${seal(e.number)}<span><div class="tt">${esc(e.title)}</div><div class="bb">${esc(e.blurb)}</div></span>`;
  return `<li>${ok ? `<a href="${e.id}/" data-id="${e.id}">${inner}</a>` : `<span class="soon">${inner}</span>`}</li>`;
}).join('\n');
const index = `${head(SERIES.title, '', '<link rel="preload" as="image" href="cover.webp">')}
<body>
<div class="col">
${hasCover ? '<div class="cover"><img src="cover.webp" width="1000" height="1250" alt="Harry, by candlelight, holds a letter sealed with red wax. An owl waits at the rain-streaked window."><div class="fade"></div></div>' : ''}
<header class="head">
<h1><small>Harry Potter and the</small>Methods of Rationality</h1>
<p>${esc(SERIES.tagline)}</p>
${ready.length ? `<a class="btn" id="continue" href="${ready[0].id}/">Begin reading</a>` : ''}
</header>
<div class="arc">${esc(SERIES.arc)}</div>
<ol class="eps">
${list}
</ol>
</div>
<p class="foot">An unofficial, non-commercial webtoon adaptation of <a href="https://hpmor.com">Harry Potter and the Methods of Rationality</a> by Eliezer Yudkowsky, itself a fan work of J.K. Rowling's Harry Potter. Every image is drawn by code.</p>
<script src="assets/reader.js"></script>
</body></html>`;
fs.writeFileSync(path.join(SITE, 'index.html'), index);
console.log(`site built: ${ready.length} episode(s)`);
