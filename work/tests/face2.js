import { rect, g } from '../../engine/core/svg.js';
import { drawHead } from '../../engine/chars/rig.js';
import * as K from '../../engine/chars/cast.js';
const H = (def, x, y, s, t, ex) => g({transform:`translate(${x},${y}) scale(${s})`}, drawHead(def,{turn:t,expr:ex,lw:3,extras:{}}).main);
export default { title:'face2', tiles: [
 { h: 500, bg:'#fff', panels: [{ x: 0, y: 0, w: 800, h: 500, border:'none', wobble:false, grain:false, art: () =>
   H(K.harry, 200, 250, 2.5, 0.3, {eyes:{open:1},brows:{},mouth:{type:'line'}}) + H({...K.harry, glasses:null, hair:null}, 600, 250, 2.5, 0.3, {eyes:{open:1},brows:{},mouth:{type:'line'}})
 }]},
]};
