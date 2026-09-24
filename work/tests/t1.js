import { rect, circle, g } from '../../engine/core/svg.js';
import { C } from '../../engine/core/palette.js';
export default { title: 'test', tiles: [
 { h: 1100, panels: [ { x: 30, y: 30, w: 740, h: 560, mood: 'candle', art: ({w,h}) => rect(0,0,w,h,{fill:C.burgundy}) + circle(370,300,120,{fill:C.mustard, stroke:C.ink,'stroke-width':4}) } ],
   bubbles: [
     { type:'speech', x: 250, y: 120, w: 330, text: "My sister was a witch. Her husband was a *wizard*.", tail:[330,300] },
     { type:'shout', x: 560, y: 450, w: 330, text: "YOU TURNED INTO A CAT!", tail:[450,560] },
     { type:'caption', x: 60, y: 640, w: 640, anchor:'tl', text: "Oxford, England. The wettest July in living memory." },
     { type:'whisper', x: 200, y: 800, w: 300, text: "It wasn't bending spoons—", tail:[120,900] },
     { type:'cold', x: 560, y: 800, w: 340, text: "It sounds like I have something you want." },
     { type:'thought', x: 250, y: 990, w: 300, text: "Where do you come from, strange little prediction?", tail:[100,1080] },
     { type:'note', x: 600, y: 990, w: 300, text: "≈ 2 million £", rot:-6 },
   ] },
 { h: 500, bg: C.navyDark, bubbles: [
   { type:'hat', x: 400, y: 120, w: 500, text: "Oh, dear. This has never happened before…", tail:[400,300] },
   { type:'hatBig', x: 400, y: 330, w: 700, text: "SLYTHERIN!" },
   { type:'sfx', x: 400, y: 440, w: 700, text: "THWACK", rot:-8 },
 ]},
]};
