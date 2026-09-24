import { shot } from '../../engine/core/scene.js';
import { g } from '../../engine/core/svg.js';
import * as HG from '../../engine/bg/hogwarts.js';
import * as K from '../../engine/chars/cast.js';
export default { title:'hog', tiles: [
 { h: 900, panels: [{ x: 0, y: 0, w: 800, h: 900, border:'none', mood:'night', art: shot({ cam:{x:800,y:400,w:1400}, bg: () => HG.lakeNight() }) }] },
 { h: 900, panels: [{ x: 0, y: 0, w: 800, h: 900, border:'none', mood:'candle', art: shot({ cam:{x:800,y:500,w:1600}, bg: () => HG.greatHallWide() }) }] },
 { h: 700, panels: [{ x: 20, y: 20, w: 760, h: 660, mood:'candle', art: shot({ cam:{x:1100,y:560,w:1600}, bg: () => HG.staffWall(), actors:[
   {def:K.snape,id:'snape',x:700,y:900,turn:0.2,expr:'menace'},{def:K.dumbledore,id:'dumb',x:1000,y:900,turn:0,expr:'warm'},{def:K.quirrell,id:'q',x:1300,y:900,turn:-0.2,expr:'twitch'},{def:K.flitwick,id:'f',x:1550,y:780,turn:-0.3,expr:'smile'},{def:K.sprout,id:'sp',x:450,y:900,turn:0.3,expr:'stern'}, () => HG.staffTable()] }) }] },
 { h: 700, panels: [{ x: 20, y: 20, w: 760, h: 660, mood:'candle', art: shot({ cam:{on:['harry'],fr:'waist'}, bg: () => HG.dais(), actors:[ () => HG.stool(1000,900), {def:K.harryRobes,id:'harry',x:1000,y:900,s:1.1,turn:0.1,pose:'sit',seat:125,expr:'shock'}, HG.hatOn('harry','worried')] }) }] },
 { h: 700, panels: [{ x: 20, y: 20, w: 760, h: 660, art: (ctx) => HG.mindscape(ctx.w, ctx.h, 'warm') + HG.houseDoors(ctx.w, ctx.h, 'h') }] },
 { h: 700, panels: [{ x: 20, y: 20, w: 760, h: 660, art: (ctx) => HG.mindscape(ctx.w, ctx.h, 'cold') }] },
]};
