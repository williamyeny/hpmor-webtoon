import { chromium } from 'playwright';
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }); const p = await ctx.newPage();
await p.goto('file://' + process.cwd() + '/site/index.html');
await p.evaluate(() => localStorage.setItem('hpmor-state', JSON.stringify({ last: 'ep03', eps: { ep01: { done: true, p: 1 }, ep02: { done: true, p: 1 }, ep03: { p: 0.42, y: 5000 } } })));
await p.reload(); await p.waitForTimeout(400); await p.evaluate(() => scrollTo(0, 560)); await p.waitForTimeout(200);
await p.screenshot({ path: 'scratch/site-index.png' }); await b.close();
