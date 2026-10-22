'use strict';
/* Measures how long screenrecord takes to deliver its first frame: records a still screen, scrolls the page at a known moment, and
 * finds the first changed frame in the clip (by frame differences only; nothing is viewed). Prints L = spawn -> first frame, seconds. */
const { spawnSync } = require('child_process');
const P = require('./phone');
const FF = spawnSync('python', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'], { encoding: 'utf8' }).stdout.trim();
(async () => {
  P.cdpAttach();
  const results = [];
  for (let k = 0; k < 1; k++) {
    P.requireApp('calibrate');
    await P.web(`window.scrollTo(0, 0)`); await P.sleep(800);
    const S = Date.now();
    P.startRecording('cal');
    await P.sleep(3000);
    const at = (Date.now() - S) / 1000;
    await P.web(`window.scrollTo({top: 400, behavior: 'smooth'})`);
    await P.sleep(1800);
    const bad = !P.inApp();
    const f = await P.stopRecording('C:/tmp');
    if (bad) { console.log('focus lost during the run; discarded'); continue; }
    const r = spawnSync(FF, ['-hide_banner', '-i', f, '-vf', "select='gt(scene,0.003)',showinfo", '-f', 'null', '-'], { encoding: 'utf8' });
    const out = (r.stderr || '') + (r.stdout || '');
    const times = [...out.matchAll(/pts_time:([\d.]+)/g)].map(m => +m[1]);
    const d = out.match(/Duration: (\d+):(\d+):([\d.]+)/);
    console.log(`run ${k}: scroll issued at ${at.toFixed(2)} s after spawn; changed frames at [${times.slice(0, 5).join(', ')}]; duration ${d ? d.slice(1).join(':') : '?'}`);
    if (times.length) results.push(at - times[0]);
  }
  console.log('L estimates (s):', results.map(x => x.toFixed(2)).join(', '));
})().catch(e => { console.error(e.message); process.exit(1); });
