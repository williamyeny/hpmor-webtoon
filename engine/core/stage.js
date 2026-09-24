// The in-browser half of the renderer: CSS for lettering + a script that measures each bubble's text
// and draws its balloon shape and tail into #bsvg. Exported as strings, injected into the stage page.
import { C } from './palette.js';

export const DIALOGUE_FONT = "'Andika', 'Alegreya Sans', sans-serif";

export const STAGE_CSS = `
html,body{margin:0;padding:0;background:#000}
#root{width:800px}
.bub{position:absolute;left:0;top:0;visibility:hidden}
.bub .bt{font-family:${DIALOGUE_FONT};font-size:31px;line-height:1.2;color:${C.ink};text-align:center;letter-spacing:0.1px;
  font-weight:400; -webkit-font-smoothing:antialiased;}
.bub .bt b{font-weight:700}
.bub .bt i{font-style:italic}
.t-shout .bt{font-weight:700;font-size:38px;line-height:1.08;letter-spacing:0.3px}
.t-whisper .bt{font-size:26px;color:#5b463a;font-style:italic}
.t-small .bt{font-size:25px}
.t-thought .bt{font-style:italic;color:#3d2c22}
.t-inner .bt{font-family:'Alegreya',serif;font-style:italic;font-size:30px;color:#3a2a20;text-align:left}
.t-caption .bt{font-family:'Alegreya',serif;font-style:italic;font-size:29px;color:${C.ink};text-align:left;line-height:1.25}
.t-captionC .bt{font-family:'Alegreya',serif;font-style:italic;font-size:29px;color:${C.ink};text-align:center;line-height:1.25}
.t-dark .bt{font-family:'Alegreya',serif;font-style:italic;font-size:30px;color:#efe4cc;text-align:center;line-height:1.3}
.t-cold .bt{font-family:'Alegreya SC','Alegreya',serif;font-size:29px;color:#1d2f45;letter-spacing:0.6px;line-height:1.2}
.t-hat .bt{font-family:'IM Fell English',serif;font-size:33px;color:#f3e6c9;line-height:1.2}
.t-hatBig .bt{font-family:'IM Fell English SC',serif;font-size:64px;color:#f6e7c4;line-height:1.05;letter-spacing:2px}
.t-mind .bt{font-family:${DIALOGUE_FONT};font-style:italic;font-size:30px;color:#e9f0f6}
.t-note .bt{font-family:'Caveat',cursive;font-size:36px;color:#4a3a2e;line-height:1;font-weight:700}
.t-letter .bt{font-family:'IM Fell DW Pica',serif;font-size:27px;color:#2c1f18;text-align:left;line-height:1.3}
.t-script .bt{font-family:'Pinyon Script',cursive;font-size:40px;color:#1f4b33;line-height:1.1}
.t-title .bt{font-family:'IM Fell English SC',serif;font-size:56px;color:${C.ink};line-height:1.05;letter-spacing:1px}
.t-plain .bt{}
.t-sfx .bt{font-family:'Grenze Gotisch',serif;font-weight:900;font-size:80px;line-height:0.9;color:#f4e3bd;
  -webkit-text-stroke:3px ${C.ink};paint-order:stroke fill;letter-spacing:2px}
.t-hiss .bt{font-family:'IM Fell English',serif;font-style:italic;font-size:32px;color:#9fd79a;letter-spacing:3px;
  text-shadow:0 0 8px rgba(80,200,90,.6),0 0 2px #0a2a0c}
`;

// Runs in the page. window.layoutBubbles() → Promise resolved when done.
export const STAGE_JS = `
(function(){
const INK='${C.ink}';
const NS='http://www.w3.org/2000/svg';
function rng(s){s=(s>>>0)||1;return function(){s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;}}
function superD(cx,cy,rx,ry,n,wob,seed,steps){
  const R=rng(seed);steps=steps||48;const pts=[];
  for(let i=0;i<steps;i++){const a=i/steps*Math.PI*2;const c=Math.cos(a),s=Math.sin(a);
    const k=1+(R()-.5)*wob;
    pts.push([cx+rx*k*Math.sign(c)*Math.pow(Math.abs(c),2/n), cy+ry*k*Math.sign(s)*Math.pow(Math.abs(s),2/n)]);}
  return smooth(pts,true);
}
function smooth(p,closed){const n=p.length;let d='M'+p[0][0].toFixed(1)+','+p[0][1].toFixed(1);
  const get=i=>closed?p[(i+n)%n]:p[Math.max(0,Math.min(n-1,i))];const segs=closed?n:n-1;
  for(let i=0;i<segs;i++){const p0=get(i-1),p1=get(i),p2=get(i+1),p3=get(i+2);
    const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
    d+=' C'+c1[0].toFixed(1)+','+c1[1].toFixed(1)+' '+c2[0].toFixed(1)+','+c2[1].toFixed(1)+' '+p2[0].toFixed(1)+','+p2[1].toFixed(1);}
  return d+(closed?'Z':'');}
function spikyD(cx,cy,rx,ry,seed){const R=rng(seed);const n=26;const pts=[];
  for(let i=0;i<n*2;i++){const a=i/(n*2)*Math.PI*2+0.05;const out=i%2===0;const k=out?1.16+R()*0.14:0.97;
    const c=Math.cos(a),s=Math.sin(a);pts.push([cx+rx*k*Math.sign(c)*Math.pow(Math.abs(c),2/2.4),cy+ry*k*Math.sign(s)*Math.pow(Math.abs(s),2/2.4)]);}
  return 'M'+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' L')+'Z';}
function cloudD(cx,cy,rx,ry,seed){const R=rng(seed);const n=Math.max(9,Math.round((rx+ry)/22));let d='';const pts=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2;pts.push([cx+Math.cos(a)*rx,cy+Math.sin(a)*ry]);}
  d='M'+pts[0][0].toFixed(1)+','+pts[0][1].toFixed(1);
  for(let i=0;i<n;i++){const a=pts[i],b=pts[(i+1)%n];const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
    const dx=mx-cx,dy=my-cy;const l=Math.hypot(dx,dy)||1;const bulge=(14+R()*8);
    d+=' Q'+(mx+dx/l*bulge).toFixed(1)+','+(my+dy/l*bulge).toFixed(1)+' '+b[0].toFixed(1)+','+b[1].toFixed(1);}
  return d+'Z';}
function rectD(x,y,w,h,j,seed){const R=rng(seed);const q=()=>(R()-.5)*j;
  return 'M'+(x+q())+','+(y+q())+' L'+(x+w+q())+','+(y+q())+' L'+(x+w+q())+','+(y+h+q())+' L'+(x+q())+','+(y+h+q())+'Z';}
function angularD(x,y,w,h,c){return 'M'+(x+c)+','+y+' L'+(x+w-c*0.3)+','+y+' L'+(x+w)+','+(y+c)+' L'+(x+w)+','+(y+h-c*0.3)+' L'+(x+w-c)+','+(y+h)+' L'+(x+c*0.3)+','+(y+h)+' L'+x+','+(y+h-c)+' L'+x+','+(y+c*0.3)+'Z';}
function el(tag,a){const e=document.createElementNS(NS,tag);for(const k in a)e.setAttribute(k,a[k]);return e;}
function tailD(cx,cy,rx,ry,tx,ty,wid,n){ // wedge from ellipse edge to tip, slightly curved
  const ang=Math.atan2((ty-cy)/ry,(tx-cx)/rx);const w=wid||0.2;
  const pOn=a=>{const c=Math.cos(a),s=Math.sin(a);return [cx+rx*Math.sign(c)*Math.pow(Math.abs(c),2/(n||2.6))*0.94,cy+ry*Math.sign(s)*Math.pow(Math.abs(s),2/(n||2.6))*0.94];};
  const a1=pOn(ang-w),a2=pOn(ang+w);
  const mx=(a1[0]+a2[0])/2,my=(a1[1]+a2[1])/2;const bend=0.18;
  const ctrl=[mx+(tx-mx)*0.55+(ty-my)*bend,my+(ty-my)*0.55-(tx-mx)*bend];
  return 'M'+a1[0].toFixed(1)+','+a1[1].toFixed(1)+' Q'+ctrl[0].toFixed(1)+','+ctrl[1].toFixed(1)+' '+tx+','+ty+' Q'+(ctrl[0]*0.9+mx*0.1).toFixed(1)+','+(ctrl[1]*0.9+my*0.1).toFixed(1)+' '+a2[0].toFixed(1)+','+a2[1].toFixed(1)+'Z';}

window.layoutBubbles=async function(){
  await document.fonts.ready;
  const svg=document.getElementById('bsvg');
  const bubs=[...document.querySelectorAll('.bub')];
  const tile=document.getElementById('tile');
  const HEADS=JSON.parse(tile.dataset.heads||'[]'), PLACED=[];
  const TW=tile.offsetWidth, TH=tile.offsetHeight;
  let seed=11;
  for(const b of bubs){
    const d=JSON.parse(b.dataset.b);seed+=7;
    const t=b.querySelector('.bt');
    if(d.size)t.style.fontSize=d.size+'px';
    if(d.font)t.style.fontFamily=d.font;
    if(d.color)t.style.color=d.color;
    if(d.align)t.style.textAlign=d.align;
    if(d.weight)t.style.fontWeight=d.weight;
    t.style.maxWidth=d.w+'px';
    t.style.display='inline-block';
    // balance lines: shrink width while line count stays the same
    let r=t.getBoundingClientRect();
    const lh=parseFloat(getComputedStyle(t).lineHeight)||36;
    const lines=Math.round(r.height/lh);
    if(lines>1 && !['caption','letter','inner','note'].includes(d.type)){
      let lo=r.width*0.45,hi=r.width;
      for(let k=0;k<12;k++){const mid=(lo+hi)/2;t.style.maxWidth=mid+'px';const rr=t.getBoundingClientRect();
        if(Math.round(rr.height/lh)>lines)lo=mid;else hi=mid;}
      t.style.maxWidth=Math.ceil(hi+2)+'px';
    }
    r=t.getBoundingClientRect();
    const W=r.width,H=r.height;
    const padX=d.pad!=null?d.pad:({speech:30,shout:40,whisper:26,thought:34,caption:22,captionC:22,cold:22,hat:30,mind:18,letter:26,dark:18}[d.type]??18);
    const padY=({speech:18,shout:26,whisper:16,thought:22,caption:16,captionC:16,cold:16,hat:20,mind:12,letter:22,dark:14}[d.type]??10);
    let left,top;
    if(d.anchor==='tl'){left=d.x;top=d.y;}else if(d.anchor==='tr'){left=d.x-W;top=d.y;}else if(d.anchor==='bl'){left=d.x;top=d.y-H;}else if(d.anchor==='br'){left=d.x-W;top=d.y-H;}
    else {left=d.x-W/2;top=d.y-H/2;}
    // collision avoidance with real sizes: faces, other balloons, tile edges
    if(!['sfx','plain','title','note','hatBig'].includes(d.type) && !d.fixed){
      const PX=padX+6, PY=padY+6;
      const R0=(l,t)=>({x:l-PX,y:t-PY,w:W+PX*2,h:H+PY*2});
      const hitC=(r,c)=>{const cx=Math.max(r.x,Math.min(c[0],r.x+r.w)),cy=Math.max(r.y,Math.min(c[1],r.y+r.h));return Math.hypot(cx-c[0],cy-c[1])<c[2];};
      const hitR=(a,b)=>a.x<b.x+b.w&&b.x<a.x+a.w&&a.y<b.y+b.h&&b.y<a.y+a.h;
      const out=(r)=>r.x<4||r.y<4||r.x+r.w>TW-4||r.y+r.h>TH-4;
      const bad=(l,t)=>{const r=R0(l,t);return out(r)?2:(HEADS.some(c=>hitC(r,c))||PLACED.some(p=>hitR(r,p)))?1:0;};
      if(bad(left,top)){
        let found=null;
        const steps=[];for(let k=20;k<=420;k+=20)steps.push([k,0],[-k,0],[0,-k],[0,k],[k,-k*0.6],[-k,-k*0.6],[k,k*0.6],[-k,k*0.6]);
        // first try: fully clean; else: just inside the tile
        for(const [dx,dy] of steps){if(!bad(left+dx,top+dy)){found=[left+dx,top+dy];break;}}
        if(!found){const bad2=(l,t)=>{const r=R0(l,t);return out(r)||PLACED.some(p=>hitR(r,p));};for(const [dx,dy] of steps){if(!bad2(left+dx,top+dy)){found=[left+dx,top+dy];break;}}}
        if(!found){let r=R0(left,top);let l2=left,t2=top;if(r.x<4)l2+=4-r.x;if(r.x+r.w>TW-4)l2-=r.x+r.w-(TW-4);if(r.y<4)t2+=4-r.y;if(r.y+r.h>TH-4)t2-=r.y+r.h-(TH-4);found=[l2,t2];}
        left=found[0];top=found[1];
      }
      PLACED.push(R0(left,top));
    }
    b.style.left=left+'px';b.style.top=top+'px';b.style.visibility='visible';
    if(d.rot)b.style.transform='rotate('+d.rot+'deg)';
    const cx=left+W/2,cy=top+H/2;
    const g=el('g',{});svg.appendChild(g);
    const fill=d.bg||({speech:'#fbf4e2',shout:'#fff6e0',whisper:'#f6efe0',thought:'#f4eee2',caption:'#efe0bd',captionC:'#efe0bd',cold:'#dfeaf2',hat:'#5a3b26',letter:'#f3e7c8',dark:'rgba(20,12,8,0.82)'}[d.type]);
    const stroke=d.border||({cold:'#314c68',hat:'#2a170c',dark:'#000'}[d.type]||INK);
    const tails=d.tails||(d.tail?[d.tail]:[]);
    if(['speech','whisper','shout','thought','cold','hat'].includes(d.type)){
      const rx=W/2+padX, ry=H/2+padY;
      let shape;
      if(d.type==='shout')shape=spikyD(cx,cy,rx,ry,seed);
      else if(d.type==='thought')shape=cloudD(cx,cy,rx,ry,seed);
      else if(d.type==='cold')shape=angularD(cx-rx,cy-ry,rx*2,ry*2,18);
      else shape=superD(cx,cy,rx,ry,d.type==='hat'?3.2:2.7,0.035,seed);
      const sw=d.type==='whisper'?2.2:(d.type==='cold'?2:2.8);
      const dash=d.type==='whisper'?'7 6':'';
      if(d.type==='hat'){g.appendChild(el('path',{d:superD(cx+4,cy+6,rx,ry,3.2,0.03,seed),fill:'rgba(0,0,0,0.35)'}));}
      // tails (stroked), then body (stroked), then body fill again to hide tail seams
      for(const tp of tails){
        if(d.type==='thought'){const n=3;for(let i=1;i<=n;i++){const f=0.45+i*0.17;const x=cx+(tp[0]-cx)*f,y=cy+(tp[1]-cy)*f;
          const rad=11-i*2.5; g.appendChild(el('ellipse',{cx:x,cy:y,rx:rad*1.3,ry:rad,fill:fill,stroke:stroke,'stroke-width':2.4}));}continue;}
        g.appendChild(el('path',{d:tailD(cx,cy,rx,ry,tp[0],tp[1],d.type==='shout'?0.14:0.17),fill:fill,stroke:stroke,'stroke-width':sw,'stroke-linejoin':'round','stroke-dasharray':dash}));
      }
      g.appendChild(el('path',{d:shape,fill:fill,stroke:stroke,'stroke-width':sw,'stroke-linejoin':'round','stroke-dasharray':dash}));
      for(const tp of tails){ if(d.type==='thought')continue;
        g.appendChild(el('path',{d:tailD(cx,cy,rx,ry,tp[0],tp[1],(d.type==='shout'?0.14:0.17)*0.8).replace(/Q[^Q]*$/,'Z'),fill:fill,stroke:'none'}));
        const inner=tailD(cx,cy,rx*0.93,ry*0.9,cx+(tp[0]-cx)*0.8,cy+(tp[1]-cy)*0.8,0.12);
        g.appendChild(el('path',{d:inner,fill:fill,stroke:'none'}));
      }
      if(d.type==='hat'){g.appendChild(el('path',{d:superD(cx,cy,rx-8,ry-8,3.2,0.02,seed+1),fill:'none',stroke:'#c9a878','stroke-width':1.6,'stroke-dasharray':'6 5',opacity:0.8}));}
      if(d.type==='cold'){g.appendChild(el('path',{d:angularD(cx-rx+5,cy-ry+5,rx*2-10,ry*2-10,14),fill:'none',stroke:'#fff',opacity:0.6,'stroke-width':1.5}));}
    } else if(['caption','captionC','letter'].includes(d.type)){
      const x=left-padX,y=top-padY,w=W+padX*2,h=H+padY*2;
      g.appendChild(el('path',{d:rectD(x+5,y+6,w,h,3,seed),fill:'rgba(40,20,10,0.25)'}));
      g.appendChild(el('path',{d:rectD(x,y,w,h,4,seed),fill:fill,stroke:stroke,'stroke-width':2.2,'stroke-linejoin':'round'}));
      if(d.type!=='letter')g.appendChild(el('path',{d:rectD(x+5,y+5,w-10,h-10,2,seed+3),fill:'none',stroke:stroke,'stroke-width':0.9,opacity:0.5}));
    } else if(d.type==='dark'){
      const x=left-padX,y=top-padY,w=W+padX*2,h=H+padY*2;
      g.appendChild(el('path',{d:rectD(x,y,w,h,3,seed),fill:fill}));
    } else if(d.type==='mind'){
      const x=left-padX,y=top-padY,w=W+padX*2,h=H+padY*2;
      g.appendChild(el('path',{d:rectD(x,y,w,h,2,seed),fill:'rgba(14,26,48,0.72)',stroke:'#a9c4de','stroke-width':1.5}));
    } else if(d.type==='inner'){
      const x=left-padX,y=top-padY,w=W+padX*2,h=H+padY*2;
      g.appendChild(el('path',{d:rectD(x,y,w,h,5,seed),fill:'rgba(248,240,220,0.9)',stroke:INK,'stroke-width':1.6,'stroke-dasharray':'2 5','stroke-linecap':'round'}));
    }
    if(d.rot)g.setAttribute('transform','rotate('+d.rot+' '+cx+' '+cy+')');
  }
  return true;
};
})();
`;
