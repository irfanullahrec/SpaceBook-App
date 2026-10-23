'use strict';
/* Renders a few frames of the opening hook to PNG files, to look at the design without rendering a whole video.
 *   node artwork/demo/hook_preview.js en|ur */
const path = require('path');
const fs = require('fs');
const { chromium } = require('D:/SpaceBook/SpaceBook Web/node_modules/playwright-core');
const HERE = __dirname;
const LANG = process.argv[2] || 'en';
const L10N = JSON.parse(fs.readFileSync(path.join(HERE, 'lang.json'), 'utf8').replace(/^\uFEFF/, ''))[LANG];
const COVER_DIR = path.join(HERE, '..', '..', 'app', 'src', 'main', 'assets', 'covers');
const names = fs.readdirSync(COVER_DIR).filter(f => /^cls\d+-.+\.webp$/.test(f)).sort();
let seed = 20261023; const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
for (let i = names.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [names[i], names[j]] = [names[j], names[i]]; }
const covers = names.map(n => 'file:///' + path.join(COVER_DIR, n).replace(/\\/g, '/').replace(/ /g, '%20'));
const HOOK = { words: [0.5, 1.35, 2.2, 3.05], logoAt: 4.0 };
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.log('page error:', e.message));
  await page.goto('file:///' + path.join(HERE, 'compose.html').replace(/\\/g, '/'));
  await page.waitForFunction('window.__ready === true');
  await page.evaluate(() => document.fonts.ready);
  const catalog = {};
  const frame = t => ({ mode: 'intro', t, hook: HOOK, covers, lang: LANG, l10n: L10N });
  await page.evaluate(([s, c]) => window.setFrame(s, c), [frame(0.1), catalog]);
  await page.evaluate(() => Promise.all([...document.images].map(i => i.decode().catch(() => 0))));
  fs.mkdirSync('C:/tmp/hook', { recursive: true });
  for (const t of [0.3, 0.62, 1.5, 2.3, 3.2, 4.02, 4.2, 5.2]) {
    await page.evaluate(([s, c]) => window.setFrame(s, c), [frame(t), catalog]);
    await page.screenshot({ path: `C:/tmp/hook/${LANG}_${t}.png`, type: 'png' });
  }
  await browser.close();
  console.log('done');
})().catch(e => { console.error(e); process.exit(1); });
