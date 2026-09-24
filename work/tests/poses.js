import { rect, g, text } from '../../engine/core/svg.js';
import { place, POSES } from '../../engine/chars/rig.js';
import * as K from '../../engine/chars/cast.js';
const names = Object.keys(POSES);
const cells = (def, s, y0, ch) => names.map((n,i)=>{ const x=70+(i%7)*110, y=y0+Math.floor(i/7)*ch; return place(def,{x,y,s,turn:0.4,pose:n,expr:'neutral'}).svg + text(x, y+18, n, {'font-size':13,'text-anchor':'middle','font-family':'Andika'}); }).join('');
const rows = Math.ceil(names.length/7);
export default { title:'poses', tiles: [
 { h: rows*170+40, bg:'#efe3c8', panels: [{ x: 0, y: 0, w: 800, h: rows*170+40, border:'none', grain:false, art: () => cells(K.harry, 0.42, 160, 170) }]},
 { h: rows*170+40, bg:'#efe3c8', panels: [{ x: 0, y: 0, w: 800, h: rows*170+40, border:'none', grain:false, art: () => cells(K.mcgonagall, 0.25, 160, 170) }]},
]};
