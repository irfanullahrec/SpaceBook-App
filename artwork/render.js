'use strict';
/* Renders the two posters to 4K PNGs with the Edge browser that comes with Windows.
 *   node artwork/render.js
 * Output: artwork/SpaceBook-Library-Grand-Opening.png, artwork/SpaceBook-Coming-Soon.png (3840 x 2160) */
const path = require('path');
const { chromium } = require('D:/SpaceBook/SpaceBook Web/node_modules/playwright-core');

const jobs = [
  ['opening-ceremony.html', 'SpaceBook-Library-Grand-Opening.png'],
  ['coming-soon.html', 'SpaceBook-Coming-Soon.png'],
];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  for (const [html, png] of jobs) {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
    await page.goto('file:///' + path.join(__dirname, html).replace(/\\/g, '/'));
    await page.waitForTimeout(600);
    const size = await page.evaluate(() => window.__nameSize || window.__size);
    await page.screenshot({ path: path.join(__dirname, png), type: 'png' });
    console.log(png, '(big text font-size ' + size + 'px)');
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
