import { rect, g } from '../../engine/core/svg.js';
import { drawHead } from '../../engine/chars/rig.js';
import { resolveExpr } from '../../engine/chars/expressions.js';
import * as K from '../../engine/chars/cast.js';
const H = (def, x, y, s, t, ex) => g({transform:`translate(${x},${y}) scale(${s})`}, drawHead(def,{turn:t,expr:resolveExpr(ex),lw:3/Math.sqrt(s),extras:{}}).back, drawHead(def,{turn:t,expr:resolveExpr(ex),lw:3/Math.sqrt(s),extras:{}}).main);
const rowE = (def, y, s, list) => list.map(([t,e],i)=>H(def, 90+i*155, y, s, t, e)).join('');
const EX1 = [[0.4,'neutral'],[0.4,'smile'],[0.4,'grin'],[0.4,'smug'],[0.4,'shock']];
const EX2 = [[0.4,'angry'],[0.4,'cold'],[0.4,'sad'],[0.4,'cry'],[0.4,'embarrassed']];
const EX3 = [[0.4,'scheme'],[0.4,'horror'],[0.4,'awe'],[0.4,'deadpan'],[0.4,'rant']];
export default { title:'faces', tiles: [
 { h: 1400, bg:'#efe3c8', panels: [{ x: 0, y: 0, w: 800, h: 1400, border:'none', art: () =>
   rowE(K.harry, 110, 1.05, EX1) + rowE(K.harry, 290, 1.05, EX2) + rowE(K.harry, 470, 1.05, EX3) +
   rowE(K.mcgonagall, 720, 1.05, [[0.4,'neutral'],[0.4,'stern'],[0.4,'smile'],[0.4,'exasperated'],[0.4,'shock']]) +
   rowE(K.dad, 970, 1.05, [[0.4,'neutral'],[0.4,'smile'],[0.4,'unimpressed'],[0.4,'laugh'],[0.4,'shock']]) +
   rowE(K.mum, 1220, 1.05, [[0.4,'neutral'],[0.4,'warm'],[0.4,'worried'],[0.4,'teary'],[0.4,'laugh']])
 }]},
]};
