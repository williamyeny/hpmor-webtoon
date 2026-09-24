import { rect, g } from '../../engine/core/svg.js';
import { C } from '../../engine/core/palette.js';
import { place } from '../../engine/chars/rig.js';
import * as K from '../../engine/chars/cast.js';
const row = (def, list, y, s=1) => list.map((o,i)=> place(def,{x:90+i*155,y,s,...o}).svg).join('');
export default { title:'turnaround', tiles: [
 { h: 1500, panels: [{ x: 0, y: 0, w: 800, h: 1500, border:'none', art: () => rect(0,0,800,1500,{fill:'#e9dcc0'}) +
   row(K.harry, [{turn:-1},{turn:-0.5},{turn:0},{turn:0.5},{turn:1}], 380, 1) +
   row(K.harry, [{turn:0.4,expr:'grin',pose:'handsHips'},{turn:0.4,expr:'shock',pose:'armsUp'},{turn:0.3,expr:'angry',pose:'point'},{turn:0.4,expr:'cold',pose:'crossArms'},{turn:0.4,expr:'cry',pose:'slump'}], 760, 1) +
   row(K.mcgonagall, [{turn:0.4,expr:'stern'},{turn:-0.4,expr:'smile',pose:'wand'}], 1440, 1) +
   place(K.dad,{x:520,y:1440,s:1,turn:0.3,expr:'smug'}).svg + place(K.mum,{x:700,y:1440,s:1,turn:-0.4,expr:'worried'}).svg
 }]},
]};
