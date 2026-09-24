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
/* ---------- the letter (main call to action) */
.letter{position:relative;display:block;width:min(22rem,90%);aspect-ratio:34/22;margin:1.4rem auto .6rem;text-decoration:none;color:var(--ink);
  -webkit-tap-highlight-color:transparent;filter:drop-shadow(0 6px 10px rgba(60,30,10,.28)) drop-shadow(0 1px 1px rgba(60,30,10,.3));transition:transform .25s ease}
.letter:before{content:'';position:absolute;inset:-22% -12%;background:radial-gradient(ellipse at 50% 55%,rgba(255,207,117,.45),rgba(255,207,117,0) 62%);z-index:-1;animation:candle 4s ease-in-out infinite}
@keyframes candle{0%,100%{opacity:.8}50%{opacity:1}}
.letter svg.env{position:absolute;inset:0;width:100%;height:100%}
.letter .wax{position:absolute;left:50%;top:50.5%;width:23%;aspect-ratio:1;transform:translate(-50%,-50%) rotate(-6deg);transition:transform .2s ease}
.letter .txt{position:absolute;left:5%;right:5%;bottom:6%;text-align:center;line-height:1.1}
.letter .lbl{display:block;font-family:'IM Fell English SC',serif;font-size:.95rem;letter-spacing:1.5px;color:#6b1a1f}
.letter .ttl{display:block;font-family:'Pinyon Script',cursive;font-size:1.6rem;color:#1d5a3a;margin-top:.1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.letter .to{position:absolute;left:0;right:0;top:12%;text-align:center;font-family:'Pinyon Script',cursive;font-size:1.2rem;color:#1d5a3a;opacity:.85}
.letter:hover{transform:translateY(-2px) rotate(-.5deg)}
.letter:hover .wax{transform:translate(-50%,-50%) rotate(-6deg) scale(1.05)}
.letter:active .wax{transform:translate(-50%,-50%) rotate(-6deg) scale(.94)}
@media (prefers-reduced-motion:reduce){.letter:before{animation:none}}
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
ol.eps .st{display:block;width:fit-content;font-family:'IM Fell English SC',serif;font-size:.78rem;letter-spacing:.3px;margin:0 0 .2rem;padding:.02rem .5rem;border-radius:999px}
ol.eps .st:empty{display:none}
ol.eps li.read .n{background:radial-gradient(circle at 35% 30%,#a08868,#6b5840 70%);color:#f1e6cc}
ol.eps li.read .tt,ol.eps li.read .bb{opacity:.6}
ol.eps li.read .st{background:#d9ccae;color:#5a4a36}
ol.eps li.reading .n{box-shadow:0 0 0 3px var(--paper),0 0 0 5px var(--gold),0 1px 3px rgba(0,0,0,.4)}
ol.eps li.reading .st{background:var(--gold);color:#2a1b14}
ol.eps li.reading{background:linear-gradient(90deg,rgba(201,162,74,.16),transparent)}
ol.eps .bar2{height:3px;background:#dccfae;border-radius:2px;margin-top:.35rem;overflow:hidden}
ol.eps .bar2 i{display:block;height:100%;background:var(--gold)}
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
    list.forEach(function(li){var id=li.dataset.id,e=E[id],tag=li.querySelector('.st');
      if(e&&e.done){li.classList.add('read');tag.textContent='\u2713 Read';}
      else if(id===cur){li.classList.add('reading');tag.textContent='Reading';var b=li.querySelector('.bar2');if(b){b.hidden=false;b.firstChild.style.width=Math.round((e.p||0)*100)+'%';}}
    });
    var btn=document.getElementById('continue');
    if(btn){var target=cur,label='Continue';
      if(!target){var ids=[].map.call(list,function(li){return li.dataset.id;});var anyRead=ids.some(function(i){return E[i]&&E[i].done;});
        target=ids.filter(function(i){return !(E[i]&&E[i].done);})[0];label=anyRead?'Next':'Begin reading';
        if(!target){target=ids[0];label='Read again';}}
      if(target){var li=document.querySelector('ol.eps li[data-id="'+target+'"]');var t=li?li.querySelector('.tt').textContent:'';
        btn.href=target+'/'+(label==='Continue'?'#continue':'');
        btn.querySelector('.lbl').textContent=(label==='Begin reading'?'Break the seal':label)+' \\u00b7 Episode '+Number(target.slice(2));
        btn.querySelector('.ttl').textContent=t;
        var tt=btn.querySelector('.ttl'),fs=25.6;tt.style.fontSize='';while(tt.scrollWidth>tt.clientWidth+1&&fs>15){fs-=1;tt.style.fontSize=fs+'px';}
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
  const inner2 = `${seal(e.number)}<span><span class="st"></span><div class="tt">${esc(e.title)}</div><div class="bb">${esc(e.blurb)}</div><div class="bar2" hidden><i></i></div></span>`;
  return ok ? `<li data-id="${e.id}"><a href="${e.id}/">${inner2}</a></li>` : `<li><span class="soon">${inner}</span></li>`;
}).join('\n');
const index = `${head(SERIES.title, '', '<link rel="preload" as="image" href="cover.webp">')}
<body>
<div class="col">
${hasCover ? '<div class="cover"><img src="cover.webp" width="1000" height="1250" alt="Harry, by candlelight, holds a letter sealed with red wax. An owl waits at the rain-streaked window."><div class="fade"></div></div>' : ''}
<header class="head">
<h1><small>Harry Potter and the</small>Methods of Rationality</h1>
<p>${esc(SERIES.tagline)}</p>
${ready.length ? `<a class="letter" id="continue" href="${ready[0].id}/" aria-label="Begin reading: Episode 1">
<svg class="env" viewBox="0 0 340 220" aria-hidden="true"><defs>
<linearGradient id="pp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e6c2"/><stop offset="1" stop-color="#e2cf9f"/></linearGradient>
<linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ead9ac"/><stop offset="1" stop-color="#d9c38e"/></linearGradient>
<filter id="rough"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .35 0 0 0 0 .25 0 0 0 0 .12 0 0 0 -1.6 1.05"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>
<path d="M4,6 Q170,0 336,5 L335,214 Q170,219 5,215Z" fill="url(#pp)" stroke="#a88a55" stroke-width="1.5"/>
<path d="M4,6 Q170,0 336,5 L335,214 Q170,219 5,215Z" filter="url(#rough)" opacity=".35"/>
<path d="M8,10 L166,86 Q170,88 174,86 L332,9" fill="none" stroke="#c9b07a" stroke-width="1"/>
<path d="M4,6 L336,5 L180,110 Q170,116 160,110Z" fill="url(#fl)" stroke="#a88a55" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M22,14 L318,13" stroke="#fff6dc" stroke-width="2" opacity=".6"/>
</svg>
<svg class="wax" viewBox="-60 -60 120 120" aria-hidden="true"><defs><radialGradient id="wx" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#d4454a"/><stop offset=".55" stop-color="#9c1f25"/><stop offset="1" stop-color="#6a0f14"/></radialGradient></defs>
<path d="M0,-54 C18,-58 30,-46 42,-40 C56,-30 50,-14 55,0 C58,16 48,28 40,40 C28,52 14,55 0,55 C-16,58 -30,50 -42,40 C-54,28 -56,14 -54,0 C-58,-16 -50,-30 -40,-42 C-28,-52 -14,-56 0,-54Z" fill="url(#wx)"/>
<circle r="37" fill="none" stroke="#6a0f14" stroke-width="3" opacity=".7"/><circle r="31" fill="none" stroke="#e0686c" stroke-width="1.2" opacity=".5"/>
<text y="17" text-anchor="middle" font-family="IM Fell English SC,serif" font-size="50" fill="#5e0c10">H</text>
<text y="15" x="-1.5" text-anchor="middle" font-family="IM Fell English SC,serif" font-size="50" fill="#e97a7e" opacity=".35">H</text>
<ellipse cx="-18" cy="-24" rx="12" ry="6" fill="#fff" opacity=".28" transform="rotate(-30 -18 -24)"/></svg>
<span class="to">To the Reader,</span>
<span class="txt"><span class="lbl">Break the seal · Episode 1</span><span class="ttl">${esc(ready[0].title)}</span></span>
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
