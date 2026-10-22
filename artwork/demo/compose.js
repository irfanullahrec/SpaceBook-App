'use strict';
/* Builds the demo video from recorded phone scenes.
 *   node artwork/demo/compose.js              uses artwork/demo/scenes.json (written by record.js) and scenes/*.mp4
 *   node artwork/demo/compose.js --dummy      builds a test video from still screenshots, to check the layout and the sound
 * Steps: timeline.json (absolute times) -> demo-audio.wav (mix_audio.py) -> phone_cat.mp4 (the phone clips in order, trimmed, rounded)
 *        -> frames from compose.html (Edge) piped into ffmpeg together with the phone clip and the audio.
 * Output: artwork/demo/SpaceBook-Library-Demo.mp4 (1920x1080, 30 fps, H.264 + AAC). */
const path = require('path');
const fs = require('fs');
const { spawn, execFileSync } = require('child_process');
const { chromium } = require('D:/SpaceBook/SpaceBook Web/node_modules/playwright-core');

const HERE = __dirname, FPS = 30;
const DUMMY = process.argv.includes('--dummy');
const FF = process.env.FFMPEG || execFileSync('python', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();
const rj = f => JSON.parse(fs.readFileSync(f, 'utf8').replace(/^﻿/, ''));   // PowerShell writes a BOM
const narration = rj(path.join(HERE, 'narration.json')).lines;
const dur = rj(path.join(HERE, 'voice', 'durations.json'));
const catalog = rj(path.join(HERE, '..', '..', 'app', 'src', 'main', 'assets', 'app_catalog.json'));
const run = (args, opts = {}) => execFileSync(FF, ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit', ...opts });

// ---------------------------------------------------------------- the scenes (recorded, or dummy)
function dummyScenes() {
  const dir = path.join(HERE, 'scenes'); fs.mkdirSync(dir, { recursive: true });
  const pics = ['p1', 'p8', 'p13', 'p11'].map(n => `C:/tmp/${n}.png`).filter(f => fs.existsSync(f));
  const mk = (name, seconds, pic) => { const out = path.join(dir, name + '.mp4'); run(['-loop', '1', '-framerate', '30', '-t', String(seconds), '-i', pic, '-vf', 'scale=720:1604,format=yuv420p', '-c:v', 'libx264', '-crf', '20', out]); return out; };
  const ev = (t, say, panel, taps) => ({ t, say, panel, taps });
  return [
    { id: 'library', video: mk('dummy_library', 14, pics[0] || pics[1]), offset: 0.2, duration: 13,
      events: [ev(0.3, 'lib_open', { type: 'caption', badge: 'Library', text: narration.lib_open }, [0.3]), ev(5.5, 'c1', { type: 'class', n: 1, text: narration.c1 }, [5.5]), ev(10, 'c2', { type: 'class', n: 2, text: narration.c2 }, [10])] },
    { id: 'class1', video: mk('dummy_class1', 9, pics[1] || pics[0]), offset: 0.2, duration: 8,
      events: [ev(0.3, 's2_open', { type: 'caption', badge: 'Class 1 \u00b7 English', text: narration.s2_open }, [0.3]), ev(3.5, 's2_sentence', { type: 'caption', badge: 'Tap a sentence', text: narration.s2_sentence }, [3.5])] },
    { id: 'class6', video: mk('dummy_class6', 12, pics[2] || pics[0]), offset: 0.2, duration: 11,
      events: [ev(0.3, 's3_ex', { type: 'math', badge: 'Exercise 3.7 \u00b7 Question 1 (e)', lines: [{ html: '725 \u2212 [ 20 \u00d7 { 10 + 7 + ( 7 \u00d7 <b>(5 \u2212 3)</b> ) } ]' }], text: narration.s3_ex }, [0.3]),
        ev(5, 's3_anim', { type: 'math', badge: 'Animate', lines: [{ html: '725 \u2212 [ 20 \u00d7 { 10 + 7 + ( 7 \u00d7 <b>2</b> ) } ]' }, { text: '5 \u2212 3 = 2' }], text: narration.s3_anim }, [5]),
        ev(9, 's3_end', { type: 'math', badge: 'Answer', lines: [{ text: '725 \u2212 620' }, { text: '= 105', big: true }], text: narration.s3_end }, [9])] },
  ];
}
const scenes = DUMMY ? dummyScenes() : rj(path.join(HERE, 'scenes.json')).scenes;

// ---------------------------------------------------------------- absolute timeline
const INTRO = dur.intro + 1.0, OUTRO = dur.outro + 2.4;
let cursor = INTRO;
const segs = scenes.map(s => { const seg = { ...s, start: cursor, end: cursor + s.duration }; cursor = seg.end; return seg; });
const outroStart = cursor, TOTAL = cursor + OUTRO;
const audio = [{ say: 'intro', at: .35 }, { say: 'outro', at: outroStart + .5 }];
segs.forEach(s => s.events.forEach(e => { if (e.say || (e.taps && e.taps.length)) audio.push({ say: e.say, at: s.start + e.t + .12, taps: (e.taps || []).map(x => s.start + x) }); }));   // an event without a line only carries taps
fs.writeFileSync(path.join(HERE, 'timeline.json'), JSON.stringify({ total: TOTAL, intro: INTRO, outro_start: outroStart, scenes: segs.map(s => ({ id: s.id, start: s.start, end: s.end })), audio }, null, 1));
console.log(`timeline: intro ${INTRO.toFixed(1)} s, ${segs.length} scenes, outro ${OUTRO.toFixed(1)} s, total ${TOTAL.toFixed(1)} s`);

execFileSync('python', [path.join(HERE, 'mix_audio.py'), path.join(HERE, 'timeline.json')], { stdio: 'inherit' });

// ---------------------------------------------------------------- the phone track: clips in order, trimmed, with black while intro/outro show
const PW = 440, PH = 980;
const maskPng = path.join(HERE, 'mask.png');
execFileSync('python', ['-c', `from PIL import Image, ImageDraw
im = Image.new('L', (${PW * 4}, ${PH * 4}), 0); ImageDraw.Draw(im).rounded_rectangle((0, 0, ${PW * 4 - 1}, ${PH * 4 - 1}), radius=${48 * 4}, fill=255)
im.resize((${PW}, ${PH}), Image.LANCZOS).save(r'${maskPng}')`]);
const phoneCat = path.join(HERE, 'phone_cat.mp4');
{
  const inputs = [], parts = [], labels = [];
  segs.forEach((s, i) => {
    inputs.push('-i', path.isAbsolute(s.video) ? s.video : path.join(HERE, s.video));
    // screenrecord writes no frames while the screen is still, so a clip can end early: hold its last frame
    parts.push(`[${i}:v]fps=${FPS},tpad=stop_mode=clone:stop_duration=8,trim=start=${s.offset}:duration=${s.duration},setpts=PTS-STARTPTS,scale=${PW}:${PH}:flags=lanczos,format=yuv420p[v${i}]`);
  });
  parts.push(`color=c=black:s=${PW}x${PH}:d=${INTRO}:r=${FPS},format=yuv420p[f0]`, `color=c=black:s=${PW}x${PH}:d=${OUTRO}:r=${FPS},format=yuv420p[f1]`);
  labels.push('[f0]', ...segs.map((_, i) => `[v${i}]`), '[f1]');
  parts.push(`${labels.join('')}concat=n=${labels.length}:v=1:a=0[out]`);
  run([...inputs, '-filter_complex', parts.join(';'), '-map', '[out]', '-c:v', 'libx264', '-crf', '12', '-preset', 'fast', '-r', String(FPS), phoneCat]);
}

// ---------------------------------------------------------------- frames -> ffmpeg
const out = path.join(HERE, DUMMY ? 'SpaceBook-Library-Demo-TEST.mp4' : 'SpaceBook-Library-Demo.mp4');
const enable = segs.map(s => `between(t,${s.start.toFixed(3)},${(s.end - 1 / FPS).toFixed(3)})`).join('+');
const X = 190 + 14, Y = 40 + 14;
const filter = `[1:v]format=rgba[ph];[2:v]format=gray[m];[ph][m]alphamerge[pm];[0:v][pm]overlay=${X}:${Y}:enable='${enable}'[o];` +
  `[o]fade=t=in:st=0:d=0.5,fade=t=out:st=${(TOTAL - 0.7).toFixed(2)}:d=0.7[v]`;
const args = ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', phoneCat, '-loop', '1', '-i', maskPng,
  '-i', path.join(HERE, 'demo-audio.wav'), '-filter_complex', filter, '-map', '[v]', '-map', '3:a',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-c:a', 'aac', '-b:a', '192k', '-t', TOTAL.toFixed(2), '-movflags', '+faststart', out];

(async () => {
  const ff = spawn(FF, args, { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => { ff.on('exit', c => (c === 0 ? res() : rej(new Error('ffmpeg exit ' + c)))); ff.on('error', rej); });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.log('page error:', e.message));
  await page.goto('file:///' + path.join(HERE, 'compose.html').replace(/\\/g, '/'));
  await page.waitForFunction('window.__ready === true');
  const frames = Math.round(TOTAL * FPS), started = Date.now();
  let lastKey = null, lastJpg = null;
  for (let i = 0; i < frames; i++) {
    const T = i / FPS;
    let state;
    if (T < INTRO) state = { mode: 'intro', t: T };
    else if (T >= outroStart) state = { mode: 'outro', t: T - outroStart };
    else {
      const s = segs.find(x => T >= x.start && T < x.end), ls = T - s.start;
      let ev = s.events[0]; for (const e of s.events) if (e.t <= ls) ev = e;
      state = { mode: 'panel', t: T, dt: Math.max(0, ls - ev.t), panel: ev.panel };
    }
    // an animation lasts about two seconds; after that the layer is the same until the next event, so the last picture is reused
    const steady = state.mode === 'panel' ? state.dt > 2.0 : state.t > 2.2;
    const key = state.mode + '|' + (state.mode === 'panel' ? segs.indexOf(segs.find(x => T >= x.start && T < x.end)) + '|' + (state.panel && JSON.stringify(state.panel)) : '');
    let jpg;
    if (steady && key === lastKey && lastJpg) jpg = lastJpg;
    else {
      await page.evaluate(([s, c]) => window.setFrame(s, c), [state, catalog]);
      jpg = await page.screenshot({ type: 'jpeg', quality: 94 });
    }
    lastKey = steady ? key : null; lastJpg = steady ? jpg : null;
    if (!ff.stdin.write(jpg)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 60 === 0) console.log(`frame ${i}/${frames}  ${((Date.now() - started) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end();
  await done;
  await browser.close();
  console.log('wrote', out, (fs.statSync(out).size / 1e6).toFixed(1) + ' MB');
})().catch(e => { console.error(e); process.exit(1); });
