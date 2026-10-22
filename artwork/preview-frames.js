'use strict';
/* Renders a few frames of the opening video as PNGs, to check the animation before the full render.
 *   node artwork/preview-frames.js 0.6 2.4 4.6 7.0 8.3 9.0 10.4 11.9 */
const path = require('path');
const { chromium } = require('D:/SpaceBook/SpaceBook Web/node_modules/playwright-core');

(async () => {
  const times = process.argv.slice(2).map(Number);
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 0.5 });
  page.on('pageerror', e => console.log('page error:', e.message));
  await page.goto('file:///' + path.join(__dirname, 'opening-video.html').replace(/\\/g, '/'));
  await page.waitForFunction('window.__ready === true');
  for (const t of times) {
    await page.evaluate(t => window.setTime(t), t);
    await page.screenshot({ path: path.join('C:/tmp', `vf_${String(t).replace('.', '_')}.png`) });
    console.log('frame', t);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
