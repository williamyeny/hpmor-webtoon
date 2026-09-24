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
function spikyD(cx,cy,rx,ry,seed){const R=rng(seed);
  // spike depth is set by the balloon's short side (capped), so long shouts don't grow huge spikes that cross panel frames
  const m=Math.min(Math.sqrt(rx*ry),170),n=Math.max(18,Math.min(34,Math.round((rx+ry)/15)));const pts=[];
  for(let i=0;i<n*2;i++){const a=i/(n*2)*Math.PI*2+0.05;const out=i%2===0;
    const c=Math.cos(a),s=Math.sin(a);const ex=Math.sign(c)*Math.pow(Math.abs(c),2/3),ey=Math.sign(s)*Math.pow(Math.abs(s),2/3);
    const bx=rx*ex,by=ry*ey,L=Math.hypot(bx,by)||1,d=out?m*(0.16+R()*0.14):-m*0.03;
    pts.push([cx+bx+bx/L*d,cy+by+by/L*d]);}
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
// Standard tail: identical size on every balloon (fixed base width, fixed visible length);
// only its attachment point on the rim and its angle change, pointing from the centre toward (tx,ty).
const TAIL_BASE=30, TAIL_LEN=38, TAIL_IN=12;
function rimR(rx,ry,n,th){const c=Math.abs(Math.cos(th))/rx,s=Math.abs(Math.sin(th))/ry;return 1/Math.pow(Math.pow(c,n)+Math.pow(s,n),1/n);}
function stdTail(cx,cy,rx,ry,n,tx,ty,k){
  k=k||1;const th=Math.atan2(ty-cy,tx-cx);const ux=Math.cos(th),uy=Math.sin(th);const px=-uy,py=ux;
  const r=rimR(rx,ry,n,th);const ex=cx+ux*r,ey=cy+uy*r;           // rim point
  const bx=ex-ux*TAIL_IN,by=ey-uy*TAIL_IN;                           // base centre, a little inside
  // fixed length, except when the speaker is far: then reach part of the way (a stub would point at whoever is in between)
  const gap=Math.hypot(tx-ex,ty-ey);const L=(gap>170?Math.min(gap*0.6,150):TAIL_LEN)*k,B=TAIL_BASE*k/2*(L>TAIL_LEN*k?1.15:1);
  const tipx=ex+ux*L+px*L*0.18,tipy=ey+uy*L+py*L*0.18;               // gentle consistent lean
  const a=[bx+px*B,by+py*B],b=[bx-px*B,by-py*B];
  const ca=[ex+ux*L*0.45+px*B*0.55,ey+uy*L*0.45+py*B*0.55],cb=[ex+ux*L*0.5-px*B*0.2,ey+uy*L*0.5-py*B*0.2];
  const f=v=>v.toFixed(1);
  const outer='M'+f(a[0])+','+f(a[1])+' Q'+f(ca[0])+','+f(ca[1])+' '+f(tipx)+','+f(tipy)+' Q'+f(cb[0])+','+f(cb[1])+' '+f(b[0])+','+f(b[1])+'Z';
  // seam patch: same base, stops just outside the rim, no stroke
  const pa=[bx+px*(B-3),by+py*(B-3)],pb=[bx-px*(B-3),by-py*(B-3)],pt=[ex+ux*5,ey+uy*5];
  const patch='M'+f(pa[0])+','+f(pa[1])+' L'+f(pt[0]+px*(B*0.45),)+','+f(pt[1]+py*(B*0.45))+' L'+f(pt[0]-px*(B*0.35))+','+f(pt[1]-py*(B*0.35))+' L'+f(pb[0])+','+f(pb[1])+'Z';
  return {outer,patch,th,ex,ey,ux,uy};
}

const TEXT_SCALE=36/31, TEXT_MIN=34; // dialogue 31→36px on the 800px canvas = 18px on a 400px-wide phone; nothing below 17px
window.layoutBubbles=async function(){
  await document.fonts.ready;
  const svg=document.getElementById('bsvg');
  const bubs=[...document.querySelectorAll('.bub')];
  const tile=document.getElementById('tile');
  const HEADS=JSON.parse(tile.dataset.heads||'[]'), PLACED=[], PANELS=JSON.parse(tile.dataset.panels||'[]').filter(p=>p[4]);
  const panelOf=(x,y)=>PANELS.find(p=>x>=p[0]&&x<=p[0]+p[2]&&y>=p[1]&&y<=p[1]+p[3]);
  const TW=tile.offsetWidth, TH=tile.offsetHeight;
  let seed=11;
  for(const b of bubs){
    const d=JSON.parse(b.dataset.b);seed+=7;
    const t=b.querySelector('.bt');
    if(d.size)t.style.fontSize=d.size+'px';
    // global lettering scale + minimum size (readability on phones: 800px tile → ~390px screen)
    const SCALABLE=!['sfx','plain','title','hatBig','hiss'].includes(d.type);
    if(SCALABLE){const base=parseFloat(getComputedStyle(t).fontSize);const fs=Math.max(TEXT_MIN,base*TEXT_SCALE);t.style.fontSize=fs+'px';}
    if(d.font)t.style.fontFamily=d.font;
    if(d.color)t.style.color=d.color;
    if(d.align)t.style.textAlign=d.align;
    if(d.weight)t.style.fontWeight=d.weight;
    const wScale=SCALABLE?1.12:1; t.style.maxWidth=Math.min(d.w*wScale, 740)+'px';
    t.style.display='inline-block';
    // hyphenated words stay on one line, unless one is wider than the balloon can be (He-Who-Must-Not-Be-Named in a big font)
    t.querySelectorAll('span[style*="nowrap"]').forEach((sp)=>{if(sp.getBoundingClientRect().width>parseFloat(t.style.maxWidth))sp.style.whiteSpace='normal';});
    // balance lines: shrink width while line count stays the same
    let r=t.getBoundingClientRect();
    const lh=parseFloat(getComputedStyle(t).lineHeight)||36;
    const lines=Math.round(r.height/lh);
    if(lines>1 && !['caption','letter','inner','note'].includes(d.type)){
      let lo=r.width*0.45,hi=r.width;
      for(let k=0;k<12;k++){const mid=(lo+hi)/2;t.style.maxWidth=mid+'px';const rr=t.getBoundingClientRect();
        if(Math.round(rr.height/lh)>lines||t.scrollWidth>t.clientWidth+1)lo=mid;else hi=mid;}
      t.style.maxWidth=Math.ceil(hi+2)+'px';
    }
    r=t.getBoundingClientRect();
    const W=r.width,H=r.height;
    const padX=d.pad!=null?d.pad:({speech:30,shout:46,whisper:26,thought:34,caption:22,captionC:22,cold:22,hat:30,mind:18,letter:26,dark:18}[d.type]??18);
    const padY=({speech:18,shout:30,whisper:16,thought:22,caption:16,captionC:16,cold:16,hat:20,mind:12,letter:22,dark:14}[d.type]??10);
    let left,top;
    if(d.anchor==='tc'){left=d.x-W/2;top=d.y;}else if(d.anchor==='bc'){left=d.x-W/2;top=d.y-H;}else if(d.anchor==='tl'){left=d.x;top=d.y;}else if(d.anchor==='tr'){left=d.x-W;top=d.y;}else if(d.anchor==='bl'){left=d.x;top=d.y-H;}else if(d.anchor==='br'){left=d.x-W;top=d.y-H;}
    else {left=d.x-W/2;top=d.y-H/2;}
    // collision avoidance with real sizes: faces, other balloons, tile edges
    if(!['sfx','plain','title','note','hatBig'].includes(d.type) && !d.fixed){
      const isB=['speech','whisper','shout','thought','cold','hat'].includes(d.type); const bx0=d.shape==='box'; const PX=isB?(bx0?W*0.02+padX*0.95:W*0.08+padX*0.55)+6:padX+6, PY=isB?(bx0?H*0.03+padY*1.15:H*0.1+padY*0.7)+6:padY+6;
      const R0=(l,t)=>({x:l-PX,y:t-PY,w:W+PX*2,h:H+PY*2});
      const hitC=(r,c)=>{const cx=Math.max(r.x,Math.min(c[0],r.x+r.w)),cy=Math.max(r.y,Math.min(c[1],r.y+r.h));return Math.hypot(cx-c[0],cy-c[1])<c[2];};
      const hitR=(a,b)=>a.x<b.x+b.w&&b.x<a.x+a.w&&a.y<b.y+b.h&&b.y<a.y+a.h;
      const home=panelOf(left+W/2,top+H/2);
      const out=(r)=>r.x<4||r.y<4||r.x+r.w>TW-4||r.y+r.h>TH-4||(home&&(r.x<home[0]+6||r.y<home[1]+6||r.x+r.w>home[0]+home[2]-6||r.y+r.h>home[1]+home[3]-6));
      const LAST=PLACED[PLACED.length-1]; const order=(r)=>LAST&&r.y<LAST.y-8&&r.x<LAST.x+LAST.w&&LAST.x<r.x+r.w; const bad=(l,t)=>{const r=R0(l,t);return out(r)?2:(HEADS.some(c=>hitC(r,c))||PLACED.some(p=>hitR(r,p))||order(r))?1:0;};
      if(bad(left,top)){
        let found=null;
        // grid search over the whole tile for the nearest acceptable spot; moving up costs more (reading order)
        const cost=(l,t)=>{const dx=l-left,dy=t-top;return Math.hypot(dx,dy<0?dy*2.2:dy);};
        const search=(test,maxD)=>{let best=null,bc=maxD||1e9;for(let t=-TH;t<=TH;t+=16){for(let l=-TW;l<=TW;l+=16){const L=left+l,Tt=top+t;const c=cost(L,Tt);if(c>=bc)continue;if(!test(L,Tt)){best=[L,Tt];bc=c;}}}return best;};
        const bad2=(l,t)=>{const r=R0(l,t);return out(r)||PLACED.some(p=>hitR(r,p))||order(r);};
        found=search(bad,280)||search(bad2,220)||search(bad)||search(bad2);
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
      // shape 'box' (speech/whisper): a rounder rectangle that hugs long text instead of an ellipse ~50px wider each side
      const box=d.shape==='box'&&['speech','whisper'].includes(d.type);
      const rx=box?W/2*1.04+padX*0.95:W/2*1.2+padX*0.55, ry=box?H/2*1.06+padY*1.15:H/2*1.2+padY*0.7;
      // tall speech balloons (5+ lines) get squarer corners so the first and last lines keep their margin; same size, so nothing moves
      const tall=!box&&H/lh>=4.5&&['speech','whisper'].includes(d.type);
      let shape;
      if(d.type==='shout')shape=spikyD(cx,cy,rx,ry,seed);
      else if(d.type==='thought')shape=cloudD(cx,cy,rx,ry,seed);
      else if(d.type==='cold')shape=angularD(cx-rx,cy-ry,rx*2,ry*2,18);
      else shape=superD(cx,cy,rx,ry,box?5.5:tall?3.8:d.type==='hat'?3.4:3.1,0.03,seed);
      const sw=d.type==='whisper'?2.2:(d.type==='cold'?2:2.8);
      const dash=d.type==='whisper'?'7 6':'';
      if(d.type==='hat'){g.appendChild(el('path',{d:superD(cx+4,cy+6,rx,ry,3.2,0.03,seed),fill:'rgba(0,0,0,0.35)'}));}
      // tails (stroked), then body (stroked), then an unstroked patch to merge tail into body
      const rimN=box?5.5:tall?3.8:d.type==='cold'?6:d.type==='shout'?3:d.type==='thought'?2.2:(d.type==='hat'?3.4:3.1);
      const rimK=d.type==='shout'?1.12:d.type==='thought'?1.08:1;
      const T=tails.map(tp=>stdTail(cx,cy,rx*rimK,ry*rimK,rimN,tp[0],tp[1],d.type==='whisper'?0.9:1));
      tails.forEach((tp,i)=>{
        if(d.type==='thought'){const t=T[i];[[14,9],[32,6.5],[46,4.5]].forEach(([dd,rad])=>g.appendChild(el('ellipse',{cx:t.ex+t.ux*dd,cy:t.ey+t.uy*dd,rx:rad*1.3,ry:rad,fill:fill,stroke:stroke,'stroke-width':2.4})));return;}
        g.appendChild(el('path',{d:T[i].outer,fill:fill,stroke:stroke,'stroke-width':sw,'stroke-linejoin':'round','stroke-dasharray':dash}));
      });
      g.appendChild(el('path',{d:shape,fill:fill,stroke:stroke,'stroke-width':sw,'stroke-linejoin':'round','stroke-dasharray':dash}));
      tails.forEach((tp,i)=>{ if(d.type==='thought')return; g.appendChild(el('path',{d:T[i].patch,fill:fill,stroke:'none'})); });
      if(d.type==='hat'){g.appendChild(el('path',{d:superD(cx,cy,rx-8,ry-8,3.2,0.02,seed+1),fill:'none',stroke:'#c9a878','stroke-width':1.6,'stroke-dasharray':'6 5',opacity:0.8}));}
      if(d.type==='cold'){g.appendChild(el('path',{d:angularD(cx-rx+5,cy-ry+5,rx*2-10,ry*2-10,14),fill:'none',stroke:'#fff',opacity:0.6,'stroke-width':1.5}));}
    } else if(['caption','captionC','letter'].includes(d.type)){
      const x=left-padX,y=top-padY,w=W+padX*2,h=H+padY*2;
      if(d.bg!=='transparent')g.appendChild(el('path',{d:rectD(x+5,y+6,w,h,3,seed),fill:'rgba(40,20,10,0.25)'})); // no drop shadow under a see-through caption
      g.appendChild(el('path',{d:rectD(x,y,w,h,4,seed),fill:fill,stroke:stroke,'stroke-width':2.2,'stroke-linejoin':'round'}));
      if(d.type!=='letter'&&d.border!=='transparent')g.appendChild(el('path',{d:rectD(x+5,y+5,w-10,h-10,2,seed+3),fill:'none',stroke:stroke,'stroke-width':0.9,opacity:0.5}));
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
  // overflow report: balloons past the tile edge or overlapping each other
  const warn=[];const rs=bubs.map(b=>b.getBoundingClientRect());const T=tile.getBoundingClientRect();
  const gs=[...svg.children];
  bubs.forEach((b,i)=>{const d=JSON.parse(b.dataset.b);if(['sfx','plain','title','note','hatBig'].includes(d.type)||!gs[i])return;
    let bb;try{bb=gs[i].getBBox();}catch(e){return;}const tr=rs[i];const cx=tr.left-T.left+tr.width/2,cy=tr.top-T.top+tr.height/2;
    if(bb.x<0||bb.y<0||bb.x+bb.width>TW||bb.y+bb.height>TH)warn.push('outline-edge:'+i);
    // text sitting on a face (heads are [x, y, r] face circles); tails are allowed to approach
    const tx0=tr.left-T.left,ty0=tr.top-T.top;if(HEADS.some(c=>{if(!(c[0]>0&&c[0]<TW&&c[1]>0&&c[1]<TH))return false;const qx=Math.max(tx0,Math.min(c[0],tx0+tr.width)),qy=Math.max(ty0,Math.min(c[1],ty0+tr.height));if(Math.hypot(qx-c[0],qy-c[1])>=c[2]*0.8)return false;/* only where the face can actually be seen: inside its own panel */return c.length<7||(qx>=c[3]&&qx<=c[3]+c[5]&&qy>=c[4]&&qy<=c[4]+c[6]);}))warn.push('face:'+i);
    const p=panelOf(cx,cy);if(p&&(bb.x<p[0]-12||bb.y<p[1]-12||bb.x+bb.width>p[0]+p[2]+12||bb.y+bb.height>p[1]+p[3]+12))warn.push('border:'+i);});
  rs.forEach((r,i)=>{if(r.left<T.left+2||r.right>T.right-2||r.top<T.top+2||r.bottom>T.bottom-2)warn.push('edge:'+i);
    rs.forEach((q,j)=>{if(j>i&&r.left<q.right-6&&q.left<r.right-6&&r.top<q.bottom-6&&q.top<r.bottom-6)warn.push('overlap:'+i+'/'+j);});});
  window.__warn=warn;
  return true;
};
})();
`;
