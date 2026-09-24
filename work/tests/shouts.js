import { shout, say } from '../../engine/core/dsl.js';
const S = (t, w) => t;
export default { title: 'shouts', tiles: [
 { h: 1300, panels: [{ x: 18, y: 18, w: 764, h: 1264, art: () => '' }], bubbles: [
   shout('x', 'Those fool Muggles will kill us all some day! They will end it! End *all* of it! Nuclear weapons! Even He-Who-Must-Not-Be-Named never used those! They never should have been made!', 400, 110, { anchor: 'tc', w: 560, fixed: true }),
   shout('x', 'Oh, for crying out *loud.*', 400, 640, { anchor: 'tc', w: 340, fixed: true }),
   shout('x', '*WRESTLING!*', 200, 820, { w: 300, fixed: true }),
   shout('x', 'I shall achieve my objectives through the power… of *Science!*', 480, 1080, { w: 420, fixed: true }),
 ] },
]};
