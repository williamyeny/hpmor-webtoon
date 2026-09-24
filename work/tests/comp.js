import { shot } from '../../engine/core/scene.js';
import * as S from '../../engine/bg/station.js';
import * as K from '../../engine/chars/cast.js';
import { bookHeld } from '../../engine/props/props.js';
export default { title:'comp', tiles: [
 { h: 700, panels: [{ x: 20, y: 20, w: 760, h: 660, mood:'day', art: shot({ cam:{x:800,y:600,w:1600}, bg: () => S.compartment(),
   actors: [ {def:K.hermione, id:'hermione', x:310, y:900, s:1.1, turn:0.4, pose:'sitRead', seat:150, expr:'focus', armF:{prop: bookHeld('#2f4f86',{rot:180})}}, {def:K.harryRobes, id:'harry', x:1290, y:900, s:1.1, turn:-0.4, pose:'sit', seat:150, expr:'smile'} ] }) }] },
 { h: 700, panels: [{ x: 20, y: 20, w: 760, h: 660, mood:'day', art: shot({ cam:{on:['hermione'],fr:'bust'}, bg: () => S.compartment(),
   actors: [ {def:K.hermione, id:'hermione', x:310, y:900, s:1.1, turn:0.3, pose:'sit', seat:150, expr:'smile'} ] }) }] },
]};
