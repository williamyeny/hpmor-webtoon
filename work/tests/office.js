import { shot } from '../../engine/core/scene.js';
import * as CS from '../../engine/bg/castle.js';
export default { title: 'office', tiles: [
 { h: 700, panels: [{ x: 18, y: 18, w: 764, h: 664, art: shot({ cam: { x: 1000, y: -300, w: 2600 }, bg: () => CS.dumbledoreOffice({}) }) }] },
 { h: 500, panels: [{ x: 18, y: 18, w: 764, h: 464, art: shot({ cam: { x: 1000, y: 800, w: 900 }, bg: () => CS.dojo({ empty: true }) }) }] },
]};
