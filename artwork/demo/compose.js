'use strict';
/* Builds a demo video in one language from the recorded phone scenes.
 *   node artwork/demo/compose.js --lang=en        -> SpaceBook-Library-Demo-English.mp4
 *   node artwork/demo/compose.js --lang=ur        -> SpaceBook-Library-Demo-Urdu.mp4
 *   add --audio-only to rebuild just the soundtrack (timeline + mix) and stop.
 * Needs: scenes.json + scenes/*.mp4 (record.js), voice_<lang>/*.wav (make_voice_edge.py), lang.json, narration_<lang>.json.
 *
 * Every recorded event (a screen action) becomes a segment. The voice line of an event starts with its segment; if the line is longer
 * than the recorded action, the segment is played up to 1.35 times slower and then holds its last picture, so the voice is never cut
 * and never overlaps the next line. Steps: timeline -> soundtrack (mix_audio.py) -> phone track (one clip per segment, joined)
 * -> frames from compose.html (Edge) piped into ffmpeg with the phone track and the sound. */
const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawn, execFileSync } = require('child_process');
const { chromium } = require('D:/SpaceBook/SpaceBook Web/node_modules/playwright-core');

const HERE = __dirname, FPS = 30;
const arg = (k, d) => { const a = process.argv.find(x => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const LANG = arg('lang', 'en');
const AUDIO_ONLY = process.argv.includes('--audio-only');
const NAME = { en: 'English', ur: 'Urdu' }[LANG];
const FF = process.env.FFMPEG || execFileSync('python', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();
const rj = f => JSON.parse(fs.readFileSync(f, 'utf8').replace(/^\uFEFF/, ''));   // PowerShell writes a BOM
const narr = rj(path.join(HERE, `narration_${LANG}.json`)).lines;
const voiceDir = path.join(HERE, `voice_${LANG}`);
const dur = rj(path.join(voiceDir, 'durations.json'));
const L10N = rj(path.join(HERE, 'lang.json'))[LANG];
const catalog = rj(path.join(HERE, '..', '..', 'app', 'src', 'main', 'assets', 'app_catalog.json'));
const scenes = rj(path.join(HERE, 'scenes.json')).scenes;
const run = (args, opts = {}) => execFileSync(FF, ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit', ...opts });

// ---------------------------------------------------------------- segments: one per recorded event
const sayOfText = {};                                                  // an event without a line carries the panel of the line still being read
scenes.forEach(sc => sc.events.forEach(e => { if (e.say && e.panel) sayOfText[e.panel.text] = e.say; }));
const segs = [];
for (const sc of scenes) {
  sc.events.forEach((e, i) => {
    const a = i === 0 ? 0 : e.t, b = i + 1 < sc.events.length ? sc.events[i + 1].t : sc.duration;
    segs.push({ scene: sc, ev: e, a, b, orig: b - a, say: e.say || null, panelSay: e.say || sayOfText[e.panel && e.panel.text] || null, taps: e.taps || [], panel: e.panel });
  });
}

// ---------------------------------------------------------------- timeline for this language
const GAP = 0.35, MAXSTRETCH = 1.35;
const INTRO = dur.intro + 1.0, OUTRO = dur.outro + 2.4;
let cursor = INTRO, busy = 0;
const voice = [{ say: 'intro', at: .35 }], sfx = [];
segs.forEach((s, i) => {
  s.start = cursor;
  if (s.say) { s.voiceAt = s.start + .12; busy = s.voiceAt + dur[s.say] + GAP; voice.push({ say: s.say, at: s.voiceAt }); }
  const next = segs[i + 1];
  const passOn = next && !next.say && next.scene !== s.scene;           // the line may run on into the next clip's opening seconds
  s.len = Math.max(s.orig, passOn ? 0 : Math.max(0, busy - s.start));
  s.k = s.len > s.orig ? Math.min(MAXSTRETCH, s.len / s.orig) : 1;
  s.pad = s.len - s.orig * s.k;
  cursor += s.len;
});
const outroStart = cursor, TOTAL = cursor + OUTRO;
voice.push({ say: 'outro', at: outroStart + .5 });
// sound effects: a swish when a new caption comes in, a whoosh between clips, a click for every tap, and a few celebrations
const g = (s, t) => s.start + (t - s.a) * s.k;
segs.forEach((s, i) => {
  if (s.say) sfx.push({ kind: i === 0 || segs[i - 1].scene !== s.scene ? 'whoosh' : 'swish', at: s.start - 0.02 });
  s.taps.forEach((t, j) => {
    const at = g(s, t);
    sfx.push({ kind: 'tap', at });
    if (s.say === 's2_sentence' && j === 0) sfx.push({ kind: 'pop', at: at + .08 });
    if (s.say === 's2_word' && j === 1) sfx.push({ kind: 'pop', at: at + .55 });
    if (s.say === 's2_match' && (j === 2 || j === 4)) sfx.push({ kind: 'success', at: at + .1, gain: .8 });
    if (s.say === 's2_p2' && j === 0) sfx.push({ kind: 'wrong', at: at + .08 });
    if (s.say === 's2_p2' && j === 1) sfx.push({ kind: 'success', at: at + .1 });
    if (s.say === 's3_end' && j === s.taps.length - 1) sfx.push({ kind: 'fanfare', at: at + .1 });
    if (s.say === 's3_ans' && j === 0) sfx.push({ kind: 'pop', at: at + .15 });
  });
});
const tlPath = path.join(HERE, `timeline_${LANG}.json`);
fs.writeFileSync(tlPath, JSON.stringify({ lang: LANG, total: TOTAL, intro: INTRO, outro_start: outroStart, voice, sfx, segs: segs.map(s => ({ say: s.say, start: +s.start.toFixed(2), len: +s.len.toFixed(2), orig: +s.orig.toFixed(2), k: +s.k.toFixed(2), pad: +s.pad.toFixed(2) })) }, null, 1));
console.log(`[${NAME}] intro ${INTRO.toFixed(1)} s, ${segs.length} segments, outro ${OUTRO.toFixed(1)} s, total ${TOTAL.toFixed(1)} s`);

const audioWav = path.join(HERE, `demo-audio_${LANG}.wav`);
execFileSync('python', [path.join(HERE, 'mix_audio.py'), tlPath, audioWav, voiceDir], { stdio: 'inherit' });
if (AUDIO_ONLY) process.exit(0);

// ---------------------------------------------------------------- the phone track: a clip per segment (slowed / held as planned), then joined
const PW = 440, PH = 980;
const maskPng = path.join(HERE, 'mask.png');
execFileSync('python', ['-c', `from PIL import Image, ImageDraw
im = Image.new('L', (${PW * 4}, ${PH * 4}), 0); ImageDraw.Draw(im).rounded_rectangle((0, 0, ${PW * 4 - 1}, ${PH * 4 - 1}), radius=${48 * 4}, fill=255)
im.resize((${PW}, ${PH}), Image.LANCZOS).save(r'${maskPng}')`]);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `demo_${LANG}_`));
const enc = ['-c:v', 'libx264', '-preset', 'veryfast', '-crf', '14', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-g', String(FPS * 2), '-an'];
const parts = [];
const black = (name, secs) => { const f = path.join(tmp, name + '.mp4'); run(['-f', 'lavfi', '-i', `color=c=black:s=${PW}x${PH}:r=${FPS}:d=${secs.toFixed(3)}`, ...enc, f]); parts.push(f); };
black('intro', INTRO);
segs.forEach((s, i) => {
  const f = path.join(tmp, `seg_${String(i).padStart(2, '0')}.mp4`);
  const clip = path.join(HERE, s.scene.video);
  const A = (s.scene.offset + s.a).toFixed(3);
  run(['-i', clip, '-vf',
    `fps=${FPS},tpad=stop_mode=clone:stop_duration=12,trim=start=${A}:duration=${s.orig.toFixed(3)},setpts=(PTS-STARTPTS)*${s.k.toFixed(4)},fps=${FPS},tpad=stop_mode=clone:stop_duration=${(s.pad + 1).toFixed(3)},scale=${PW}:${PH}:flags=lanczos,format=yuv420p`,
    '-t', s.len.toFixed(3), ...enc, f]);
  parts.push(f);
  process.stdout.write(`\rphone clips ${i + 1}/${segs.length}`);
});
process.stdout.write('\n');
black('outro', OUTRO);
const listFile = path.join(tmp, 'list.txt');
fs.writeFileSync(listFile, parts.map(f => `file '${f.replace(/\\/g, '/')}'`).join('\n'));
const phoneCat = path.join(tmp, 'phone_cat.mp4');
run(['-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', phoneCat]);

// ---------------------------------------------------------------- frames -> ffmpeg
const out = path.join(HERE, `SpaceBook-Library-Demo-${NAME}.mp4`);
const X = 190 + 14, Y = 40 + 14;
const filter = `[1:v]format=rgba[ph];[2:v]format=gray[m];[ph][m]alphamerge[pm];[0:v]format=yuv420p[bg];[bg][pm]overlay=${X}:${Y}:enable='between(t,${INTRO.toFixed(3)},${(outroStart - 1 / FPS).toFixed(3)})'[o];` +
  `[o]fade=t=in:st=0:d=0.5,fade=t=out:st=${(TOTAL - 0.7).toFixed(2)}:d=0.7,format=yuv420p[v];[3:a]loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000[a]`;
const args = ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', phoneCat, '-loop', '1', '-i', maskPng,
  '-i', audioWav, '-filter_complex', filter, '-map', '[v]', '-map', '[a]',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-color_range', 'tv', '-r', String(FPS), '-c:a', 'aac', '-ar', '48000', '-ac', '2', '-b:a', '192k',
  '-t', TOTAL.toFixed(2), '-movflags', '+faststart', out];

const localized = s => {
  const p = { ...s.panel };
  const id = s.panelSay;
  if (id && narr[id]) p.text = narr[id];
  if (L10N.badges && p.badge && L10N.badges[p.badge]) p.badge = L10N.badges[p.badge];
  return p;
};

(async () => {
  const ff = spawn(FF, args, { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => { ff.on('exit', c => (c === 0 ? res() : rej(new Error('ffmpeg exit ' + c)))); ff.on('error', rej); });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.log('page error:', e.message));
  await page.goto('file:///' + path.join(HERE, 'compose.html').replace(/\\/g, '/'));
  await page.waitForFunction('window.__ready === true');
  await page.evaluate(() => document.fonts.ready);
  const frames = Math.round(TOTAL * FPS), started = Date.now();
  const panels = segs.map(localized);
  let lastKey = null, lastJpg = null, si = 0;
  for (let i = 0; i < frames; i++) {
    const T = i / FPS;
    let state, segIndex = -1;
    if (T < INTRO) state = { mode: 'intro', t: T };
    else if (T >= outroStart) state = { mode: 'outro', t: T - outroStart };
    else {
      while (si < segs.length - 1 && T >= segs[si].start + segs[si].len) si++;
      segIndex = si;
      state = { mode: 'panel', t: T, dt: Math.max(0, T - segs[si].start), panel: panels[si] };
    }
    state.lang = LANG; state.l10n = L10N;
    // an animation lasts about two seconds; after that the layer is the same until the next segment, so the last picture is reused
    const steady = state.mode === 'panel' ? state.dt > 2.0 : state.t > 2.2;
    const key = state.mode + '|' + segIndex + '|' + (state.mode === 'panel' ? JSON.stringify(state.panel) : '');
    let jpg;
    if (steady && key === lastKey && lastJpg) jpg = lastJpg;
    else {
      await page.evaluate(([s, c]) => window.setFrame(s, c), [state, catalog]);
      jpg = await page.screenshot({ type: 'jpeg', quality: 94 });
    }
    lastKey = steady ? key : null; lastJpg = steady ? jpg : null;
    if (!ff.stdin.write(jpg)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 120 === 0) console.log(`[${NAME}] frame ${i}/${frames}  ${((Date.now() - started) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end();
  await done;
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log('wrote', out, (fs.statSync(out).size / 1e6).toFixed(1) + ' MB');
})().catch(e => { console.error(e); process.exit(1); });
