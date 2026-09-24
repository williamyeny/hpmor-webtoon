import { rect } from '../../engine/core/svg.js';
import { place } from '../../engine/chars/rig.js';
import * as K from '../../engine/chars/cast.js';
export default { title:'face', tiles: [
 { h: 700, panels: [{ x: 0, y: 0, w: 800, h: 700, border:'none', art: () => rect(0,0,800,700,{fill:'#e9dcc0'}) +
   place(K.harry,{x:220,y:1100,s:3.2,turn:0.3,expr:'neutral'}).svg + place(K.mcgonagall,{x:600,y:1500,s:2.4,turn:-0.3,expr:'neutral'}).svg
 }]},
]};
