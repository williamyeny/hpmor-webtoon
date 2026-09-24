import { shot } from '../../engine/core/scene.js';
import * as O from '../../engine/bg/oxford.js';
import * as K from '../../engine/chars/cast.js';
import { bookHeld } from '../../engine/props/props.js';
export default { title:'bg1', tiles: [
 { h: 620, panels: [{ x: 20, y: 20, w: 760, h: 580, mood:'warm', art: shot({ cam:{x:1000,y:620,w:2000}, bg: () => O.livingRoom(),
   actors: [ {def:K.dad, id:'dad', x:820, y:990, s:1, turn:0.4, expr:'unimpressed', pose:'gesture'}, {def:K.mum, id:'mum', x:1180, y:990, s:1, turn:-0.4, expr:'worried', pose:'hold'},
     O.armchairBack(1500, 1010, 1.3), {def:K.harry, id:'harry', x:1500, y:960, s:1.05, turn:-0.3, expr:'focus', pose:'sitRead', armF:{prop: bookHeld('#274060',{rot:180})}}, O.armchairFront(1500,1010,1.3) ] }) }],
   bubbles:[{type:'speech', who:'Mum', text:'My sister was a witch.', x:560, y:90, w:300}] },
 { h: 620, panels: [{ x: 20, y: 20, w: 760, h: 580, mood:'dusk', art: shot({ cam:{x:900,y:500,w:1800}, bg: () => O.garden(),
   actors: [ {def:K.harry, id:'harry', x:800, y:1000, s:1.1, turn:0.2, expr:'determined', pose:'holdUp'} ] }) }] },
 { h: 620, panels: [{ x: 20, y: 20, w: 760, h: 580, mood:'rainy', art: shot({ cam:{x:800,y:600,w:1600}, bg: () => O.houseExterior() }) }] },
 { h: 620, panels: [{ x: 20, y: 20, w: 760, h: 580, mood:'candle', art: shot({ cam:{x:700,y:600,w:1400}, bg: () => O.bedroom(),
   actors: [ {def:K.harry, id:'harry', x:560, y:960, s:1.1, turn:0.3, expr:'think', pose:'scribble'} ] }) }] },
]};
