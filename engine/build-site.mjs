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
for (const f of ['pinyon-script-latin-400-normal', 'im-fell-english-latin-400-normal', 'im-fell-english-latin-400-italic', 'im-fell-english-sc-latin-400-normal', 'alegreya-latin-400-normal', 'alegreya-latin-400-italic']) {
  fs.copyFileSync(path.join(FONT_DIR, f + '.woff2'), path.join(SITE, 'assets', 'fonts', f + '.woff2'));
}

const CSS = `
@font-face{font-family:'IM Fell English';src:url(fonts/im-fell-english-latin-400-normal.woff2) format('woff2');font-display:swap}
@font-face{font-family:'IM Fell English';font-style:italic;src:url(fonts/im-fell-english-latin-400-italic.woff2) format('woff2');font-display:swap}
@font-face{font-family:'IM Fell English SC';src:url(fonts/im-fell-english-sc-latin-400-normal.woff2) format('woff2');font-display:swap}
@font-face{font-family:'Pinyon Script';src:url(fonts/pinyon-script-latin-400-normal.woff2) format('woff2');font-display:swap}
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
.bar .chev{font-size:2.1em;line-height:.6;margin-top:-.12em}
.bar .t{flex:1;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;opacity:.85;font-style:italic}
.seal{display:inline-flex;align-items:center;justify-content:center;line-height:1;width:1.7em;height:1.7em;border-radius:50%;background:radial-gradient(circle at 35% 30%,#c23a3f,#8a151b 70%);
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
/* ---------- the book (main call to action): a leather volume with a ribbon bookmark tucked between the pages */
.book{position:relative;display:block;width:12.5rem;height:16rem;margin:1.6rem auto 4.2rem;text-decoration:none;perspective:900px;-webkit-tap-highlight-color:transparent}
.book:before{content:'';position:absolute;inset:-18% -30%;background:radial-gradient(ellipse at 50% 50%,rgba(255,207,117,.42),rgba(255,207,117,0) 62%);z-index:-1;animation:candle 4s ease-in-out infinite}
@keyframes candle{0%,100%{opacity:.75}50%{opacity:1}}
.book .pages{position:absolute;left:6px;right:-7px;top:5px;bottom:-4px;border-radius:2px 5px 5px 2px;
  background:repeating-linear-gradient(90deg,#f4ead2 0 2px,#e2d4b2 2px 3px);box-shadow:0 8px 16px rgba(60,30,10,.35),0 2px 3px rgba(60,30,10,.3)}
.book .cover{position:absolute;inset:0;border-radius:3px 7px 7px 3px;transform-origin:0 50%;transition:transform .45s cubic-bezier(.2,.8,.3,1);
  background:radial-gradient(ellipse at 30% 20%,#9a3040,#6e1a26 55%,#4a0f19);box-shadow:inset 0 0 0 1px #3a0a12,inset 0 0 18px rgba(0,0,0,.45)}
.book .cover:before{content:'';position:absolute;inset:10px 10px 10px 22px;border:1.5px solid #c9a24a;outline:1px solid rgba(201,162,74,.55);outline-offset:3px;border-radius:2px}
.book .spine{position:absolute;left:0;top:0;bottom:0;width:14px;border-radius:3px 0 0 3px;background:linear-gradient(90deg,#3a0a12,#5e1420 60%,#3a0a12);
  box-shadow:inset 0 14px 0 -10px #c9a24a,inset 0 -14px 0 -10px #c9a24a}
.book .face{position:absolute;inset:26px 20px 22px 32px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#e7c46a;
  text-shadow:0 1px 0 rgba(0,0,0,.45),0 -1px 0 rgba(255,235,170,.2)}
.book .ep{font-family:'IM Fell English SC',serif;font-size:.85rem;letter-spacing:2px;opacity:.9}
.book .orn{position:relative;display:block;width:4.5rem;height:1px;background:#c9a24a;margin:.7rem 0 .75rem;opacity:.9}
.book .orn:after{content:'';position:absolute;left:50%;top:50%;width:7px;height:7px;background:#c9a24a;transform:translate(-50%,-50%) rotate(45deg)}
.book .ttl{font-family:'IM Fell English',serif;font-size:1.45rem;line-height:1.12}
.book .ribbon{position:absolute;right:30px;bottom:-42px;width:24px;height:90px;transform-origin:50% 0;animation:sway 5s ease-in-out infinite;
  background:linear-gradient(90deg,#a8871f,#e2bf5a 45%,#b8952c);clip-path:polygon(0 0,100% 0,100% 100%,50% 82%,0 100%);filter:drop-shadow(0 2px 2px rgba(0,0,0,.3))}
@keyframes sway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(3deg)}}
.book .lbl{position:absolute;left:0;right:0;bottom:-3.9rem;text-align:center;font-family:'IM Fell English SC',serif;font-size:1rem;letter-spacing:1px;color:#6b1a1f}
.book:hover .cover,.book:focus-visible .cover{transform:rotateY(-16deg)}
.book:active .cover{transform:rotateY(-24deg)}
.book:focus-visible{outline:none}
@media (prefers-reduced-motion:reduce){.book:before,.book .ribbon{animation:none}}
/* ---------- contents */
.cover{position:relative;line-height:0}
.cover img{width:100%;height:auto;display:block}
.cover .fade{position:absolute;inset:auto 0 0 0;height:30%;background:linear-gradient(transparent,var(--paper))}
.head{padding:0 1.3rem 1rem;text-align:center;line-height:1.25}
.head h1{font-family:'IM Fell English',serif;font-weight:400;font-size:2.1rem;margin:.2rem 0 .4rem;letter-spacing:.3px}
.head h1 small{display:block;font-size:1.05rem;font-style:italic;color:var(--ink2)}
.head p{font-style:italic;color:var(--ink2);margin:.4rem auto 1rem;max-width:30rem;font-size:1.05rem}
.btn{display:inline-block;text-decoration:none;font-family:'IM Fell English SC',serif;font-size:1.15rem;color:#f7e6cf;
  background:radial-gradient(ellipse 120% 160% at 35% 20%,#c23a3f,#8a151b 70%);
  padding:.65rem 1.4rem;border-radius:999px;box-shadow:0 1px 2px rgba(0,0,0,.4) inset,0 2px 0 #5d0f13,0 5px 14px rgba(90,20,20,.35)}
.arc{font-family:'IM Fell English SC',serif;text-align:center;color:var(--ink2);margin:1.6rem 0 .4rem;font-size:1rem;letter-spacing:.5px}
.arc:before,.arc:after{content:'';display:inline-block;width:3rem;height:1px;background:#bda981;vertical-align:middle;margin:0 .7rem}
ol.eps{list-style:none;margin:0;padding:0 1rem 2rem}
ol.eps li{border-bottom:1px dashed #cdb88d}
ol.eps a,ol.eps .soon{display:flex;gap:.9rem;align-items:center;padding:.85rem .3rem;text-decoration:none}
ol.eps .n{flex:none;width:2.4rem;height:2.4rem;font-size:1rem}
ol.eps .tt{font-family:'IM Fell English',serif;font-size:1.2rem;line-height:1.2}
ol.eps .bb{font-style:italic;color:var(--ink2);font-size:.95rem;line-height:1.3;margin-top:.15rem}
ol.eps .soon{opacity:.45}
ol.eps li.read .n{background:radial-gradient(circle at 35% 30%,#a08868,#6b5840 70%);color:#f1e6cc}
ol.eps li.read .tt,ol.eps li.read .bb{opacity:.6}
ol.eps li.reading .n{box-shadow:0 0 0 3px var(--paper),0 0 0 5px var(--gold),0 1px 3px rgba(0,0,0,.4)}
ol.eps li.reading{background:linear-gradient(90deg,rgba(201,162,74,.16),transparent)}
ol.eps .bar2{position:relative;height:18px;margin-top:.9rem}
ol.eps .bar2:before{content:'';position:absolute;left:0;right:0;top:11px;border-top:2px dotted #c9b48a}
ol.eps .bar2 i{position:absolute;left:0;top:9px;height:5px;border-radius:3px;background:#2a1b14;box-shadow:0 0 0 .5px #2a1b14;clip-path:polygon(0 30%,100% 0,100% 100%,0 70%)}
ol.eps .bar2 b{position:absolute;top:-17px;margin-left:-6px;width:34px;height:34px;background:url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2040%2040%22%3E%3Cpath%20d%3D%22M6%2036%20Q10%2022%2022%2012%20Q30%205%2038%202%20Q34%2010%2028%2017%20Q20%2027%208%2034Z%22%20fill%3D%22%23f4ecd6%22%20stroke%3D%22%235a4032%22%20stroke-width%3D%221.6%22/%3E%3Cpath%20d%3D%22M6%2036%20L26%2013%22%20stroke%3D%22%238a7458%22%20stroke-width%3D%221.2%22/%3E%3Cpath%20d%3D%22M4%2038%20L8%2033%22%20stroke%3D%22%232a1b14%22%20stroke-width%3D%222.4%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E") no-repeat center/contain;transform-origin:10% 95%;animation:scribe 1.6s ease-in-out infinite}
@keyframes scribe{0%,100%{transform:rotate(0)}50%{transform:rotate(-9deg)}}
@media (prefers-reduced-motion:reduce){ol.eps .bar2 b{animation:none}}
ol.eps .soon .n{background:#9b8b6e}
.foot{font-size:.85rem;color:#b9a888;text-align:center;padding:1.5rem 1rem 3rem;max-width:var(--col);margin:0 auto;line-height:1.5}
.foot a{color:#d8c7a2}
`;
fs.writeFileSync(path.join(SITE, 'assets', 'style.css'), CSS);

const READER_JS = `
(function(){
  // progress model: localStorage 'hpmor-state' = {last:'ep03', eps:{ep01:{p:1,done:true}, ep03:{p:0.42,y:1234}}}
  var KEY='hpmor-state';
  function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch(e){return {};}}
  function save(s){try{localStorage.setItem(KEY,JSON.stringify(s));}catch(e){}}
  var bar=document.querySelector('.bar'),last=0,ep=document.body.dataset.ep;
  if(ep){
    var st=load();st.eps=st.eps||{};
    var t=0;
    addEventListener('scroll',function(){var y=scrollY;if(bar){if(y>last&&y>80)bar.classList.add('hide');else bar.classList.remove('hide');}last=y;
      if(t)return;t=setTimeout(function(){t=0;var h=document.documentElement.scrollHeight-innerHeight,p=h>0?Math.min(1,y/h):0;
        var e=st.eps[ep]||{};e.y=y;e.p=Math.max(e.p||0,p);if(p>0.97)e.done=true;st.eps[ep]=e;st.last=ep;save(st);},250);
    },{passive:true});
    if(location.hash==='#continue'){var e0=st.eps[ep];if(e0&&e0.y&&!e0.done)addEventListener('load',function(){scrollTo(0,e0.y)});}
    var end=document.querySelector('.end');
    if(end&&'IntersectionObserver' in window)new IntersectionObserver(function(en){if(en[0].isIntersecting){var e=st.eps[ep]||{};e.done=true;e.p=1;st.eps[ep]=e;save(st);}}).observe(end);
  }
  var list=document.querySelectorAll('ol.eps li[data-id]');
  if(list.length){
    var s2=load(),E=s2.eps||{},cur=null;
    // "currently reading" = the last episode opened, if unfinished; otherwise the first unread after it
    if(s2.last&&E[s2.last]&&!E[s2.last].done)cur=s2.last;
    list.forEach(function(li){var id=li.dataset.id,e=E[id];
      if(e&&e.done){li.classList.add('read');}
      else if(id===cur){li.classList.add('reading');var b=li.querySelector('.bar2');if(b){b.hidden=false;var pc=Math.max(4,Math.round((e.p||0)*100))+'%';b.querySelector('i').style.width=pc;b.querySelector('b').style.left=pc;}}
    });
    var btn=document.getElementById('continue');
    if(btn){var target=cur,label='Continue';
      if(!target){var ids=[].map.call(list,function(li){return li.dataset.id;});var anyRead=ids.some(function(i){return E[i]&&E[i].done;});
        target=ids.filter(function(i){return !(E[i]&&E[i].done);})[0];label=anyRead?'Next':'Begin reading';
        if(!target){target=ids[0];label='Read again';}}
      if(target){var li=document.querySelector('ol.eps li[data-id="'+target+'"]');var t=li?li.querySelector('.tt').textContent:'';
        btn.href=target+'/'+(label==='Continue'?'#continue':'');
        btn.querySelector('.lbl').textContent={'Continue':'Continue reading','Next':'Read next','Read again':'Read again'}[label]||'Begin reading';
        btn.querySelector('.ep').textContent='Episode '+Number(target.slice(2));
        btn.querySelector('.ttl').textContent=t;
        btn.setAttribute('aria-label',label+': Episode '+Number(target.slice(2))+', '+t);}
    }
  }
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
<nav class="bar"><a href="../" aria-label="All episodes"><span class="chev">‹</span> All episodes</a><span class="t">Ep. ${e.number} · ${esc(e.title)}</span></nav>
<main class="strip">
${imgs}
</main>
<section class="end">
${next ? `<a class="card" href="../${next.id}/"><div class="k">Next · Episode ${next.number}</div><div class="h">${esc(next.title)}</div><div class="b">${esc(next.blurb)}</div></a>`
    : upcoming ? `<div class="card"><div class="k">Coming next · Episode ${upcoming.number}</div><div class="h">${esc(upcoming.title)}</div><div class="b">${esc(upcoming.blurb)}</div></div>` : '<p class="muted">End of Book One.</p>'}
<p><a class="muted" href="../">All episodes</a></p>
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
  const inner2 = `${seal(e.number)}<span><div class="tt">${esc(e.title)}</div><div class="bb">${esc(e.blurb)}</div><div class="bar2" hidden><i></i><b></b></div></span>`;
  return ok ? `<li data-id="${e.id}"><a href="${e.id}/">${inner2}</a></li>` : `<li><span class="soon">${inner}</span></li>`;
}).join('\n');
const index = `${head(SERIES.title, '', '<link rel="preload" as="image" href="cover.webp">')}
<body>
<div class="col">
${hasCover ? '<div class="cover"><img src="cover.webp" width="1000" height="1250" alt="Harry, by candlelight, holds a letter sealed with red wax. An owl waits at the rain-streaked window."><div class="fade"></div></div>' : ''}
<header class="head">
<h1><small>Harry Potter and the</small>Methods of Rationality</h1>
<p>${esc(SERIES.tagline)}</p>
${ready.length ? `<a class="book" id="continue" href="${ready[0].id}/" aria-label="Begin reading: Episode 1, ${esc(ready[0].title)}">
<span class="pages"></span><span class="ribbon"></span><span class="cover"><span class="spine"></span><span class="face"><span class="ep">Episode 1</span><span class="orn"></span><span class="ttl">${esc(ready[0].title)}</span></span></span>
<span class="lbl">Begin reading</span>
</a>` : ''}
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
