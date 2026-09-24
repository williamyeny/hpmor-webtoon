import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await p.goto('file://' + process.cwd() + '/site/index.html'); await p.waitForTimeout(500);
await p.screenshot({ path: 'scratch/site-index.png', fullPage: false });
await p.goto('file://' + process.cwd() + '/site/ep01/index.html'); await p.waitForTimeout(800);
await p.evaluate(() => scrollTo(0, 3000)); await p.waitForTimeout(500); await p.evaluate(() => scrollTo(0, 2950)); await p.waitForTimeout(400);
await p.screenshot({ path: 'scratch/site-ep.png' });
await b.close();
