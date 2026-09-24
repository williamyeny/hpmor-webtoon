// @font-face rules for the render stage (and the site). All fonts are SIL OFL (Google Fonts via @fontsource).
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const DIR = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '..', 'fonts');

const FACES = [
  ['Alegreya', 'alegreya-latin-400-normal', 400, 'normal'],
  ['Alegreya', 'alegreya-latin-400-italic', 400, 'italic'],
  ['Alegreya', 'alegreya-latin-700-normal', 700, 'normal'],
  ['Alegreya', 'alegreya-latin-700-italic', 700, 'italic'],
  ['Alegreya', 'alegreya-latin-800-normal', 800, 'normal'],
  ['Alegreya Sans', 'alegreya-sans-latin-400-normal', 400, 'normal'],
  ['Alegreya Sans', 'alegreya-sans-latin-500-normal', 500, 'normal'],
  ['Alegreya Sans', 'alegreya-sans-latin-700-normal', 700, 'normal'],
  ['Alegreya Sans', 'alegreya-sans-latin-800-normal', 800, 'normal'],
  ['Alegreya Sans', 'alegreya-sans-latin-900-normal', 900, 'normal'],
  ['Alegreya Sans', 'alegreya-sans-latin-400-italic', 400, 'italic'],
  ['Alegreya Sans', 'alegreya-sans-latin-500-italic', 500, 'italic'],
  ['Alegreya Sans', 'alegreya-sans-latin-700-italic', 700, 'italic'],
  ['Alegreya SC', 'alegreya-sc-latin-400-normal', 400, 'normal'],
  ['Alegreya SC', 'alegreya-sc-latin-700-normal', 700, 'normal'],
  ['Andika', 'andika-latin-400-normal', 400, 'normal'],
  ['Andika', 'andika-latin-700-normal', 700, 'normal'],
  ['Andika', 'andika-latin-400-italic', 400, 'italic'],
  ['Andika', 'andika-latin-700-italic', 700, 'italic'],
  ['Caveat', 'caveat-latin-400-normal', 400, 'normal'],
  ['Caveat', 'caveat-latin-700-normal', 700, 'normal'],
  ['IM Fell English', 'im-fell-english-latin-400-normal', 400, 'normal'],
  ['IM Fell English', 'im-fell-english-latin-400-italic', 400, 'italic'],
  ['IM Fell English SC', 'im-fell-english-sc-latin-400-normal', 400, 'normal'],
  ['IM Fell DW Pica', 'im-fell-dw-pica-latin-400-normal', 400, 'normal'],
  ['IM Fell DW Pica', 'im-fell-dw-pica-latin-400-italic', 400, 'italic'],
  ['Pinyon Script', 'pinyon-script-latin-400-normal', 400, 'normal'],
  ['Patrick Hand', 'patrick-hand-latin-400-normal', 400, 'normal'],
  ['Grenze Gotisch', 'grenze-gotisch-latin-400-normal', 400, 'normal'],
  ['Grenze Gotisch', 'grenze-gotisch-latin-700-normal', 700, 'normal'],
  ['Grenze Gotisch', 'grenze-gotisch-latin-900-normal', 900, 'normal'],
  ['UnifrakturMaguntia', 'unifrakturmaguntia-latin-400-normal', 400, 'normal'],
];

export function fontCSS(mode = 'file', base = '') {
  return FACES.map(([fam, file, w, st]) => {
    const p = path.join(DIR, file + '.woff2');
    const src = mode === 'file' ? url.pathToFileURL(p).href
      : mode === 'data' ? 'data:font/woff2;base64,' + fs.readFileSync(p).toString('base64')
      : base + file + '.woff2';
    return `@font-face{font-family:'${fam}';src:url('${src}') format('woff2');font-weight:${w};font-style:${st};font-display:block}`;
  }).join('\n');
}
export const FONT_DIR = DIR;
