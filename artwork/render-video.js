'use strict';
/* Renders artwork/opening-video.html frame by frame (Edge) and encodes it with ffmpeg together with opening-audio.wav.
 *   python artwork/make_audio.py        (once)
 *   node artwork/render-video.js
 * Output: artwork/SpaceBook-Library-Grand-Opening.mp4  (1920x1080, 30 fps, 12 s, H.264 + AAC)
 * ffmpeg: set FFMPEG, or `pip install imageio-ffmpeg` (its bundled binary is found automatically). */
const path = require('path');
const fs = require('fs');
const { spawn, execFileSync } = require('child_process');
const { chromium } = require('D:/SpaceBook/SpaceBook Web/node_modules/playwright-core');

const FPS = 30, SECONDS = 12;
const ffmpegPath = process.env.FFMPEG || (() => {
  try { return execFileSync('python', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim(); } catch (e) { return 'ffmpeg'; }
})();
const out = path.join(__dirname, 'SpaceBook-Library-Grand-Opening.mp4');
const audio = path.join(__dirname, 'opening-audio.wav');

(async () => {
  const args = ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-'];
  if (fs.existsSync(audio)) args.push('-i', audio);
  args.push('-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(FPS));
  if (fs.existsSync(audio)) args.push('-c:a', 'aac', '-b:a', '192k', '-shortest');
  args.push('-movflags', '+faststart', out);
  const ff = spawn(ffmpegPath, args, { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => { ff.on('exit', c => (c === 0 ? res() : rej(new Error('ffmpeg exit ' + c)))); ff.on('error', rej); });

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.log('page error:', e.message));
  await page.goto('file:///' + path.join(__dirname, 'opening-video.html').replace(/\\/g, '/'));
  await page.waitForFunction('window.__ready === true');

  const frames = FPS * SECONDS, started = Date.now();
  for (let i = 0; i < frames; i++) {
    await page.evaluate(t => window.setTime(t), i / FPS);
    const jpg = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(jpg)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 30 === 0) console.log(`frame ${i}/${frames}  ${((Date.now() - started) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end();
  await done;
  await browser.close();
  console.log('wrote', out, (fs.statSync(out).size / 1e6).toFixed(1) + ' MB');
})().catch(e => { console.error(e); process.exit(1); });
