import { rect, g } from '../../engine/core/svg.js';
import { drawHead } from '../../engine/chars/rig.js';
import { resolveExpr } from '../../engine/chars/expressions.js';
import * as K from '../../engine/chars/cast.js';
const H = (def, x, y, s, t, ex) => { const o={turn:t,expr:resolveExpr(ex),lw:3/Math.sqrt(s),extras:{}}; const h=drawHead(def,o); return g({transform:`translate(${x},${y}) scale(${s})`}, h.back, h.main); };
export default { title:'faces2', tiles: [
 { h: 900, bg:'#efe3c8', panels: [{ x: 0, y: 0, w: 800, h: 900, border:'none', art: () =>
   H(K.mcgonagall, 150, 300, 2.3, 0.0, 'neutral') + H(K.mcgonagall, 400, 300, 2.3, 0.5, 'stern') + H(K.mcgonagall, 650, 300, 2.3, 1, 'smile') +
   H(K.mum, 150, 720, 2.3, 0, 'neutral') + H(K.mum, 400, 720, 2.3, 0.5, 'warm') + H(K.mum, 650, 720, 2.3, 1, 'worried')
 }]},
]};
