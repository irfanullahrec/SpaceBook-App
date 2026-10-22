'use strict';
/* Helpers to drive the SpaceBook app on the phone for the demo recording (adb + the WebView's debugger).
 * Safety: nothing reads the screen unless SpaceBook is the app in front (focus() is checked first). */
const fs = require('fs');
const { execFileSync, spawn } = require('child_process');

const ADB = 'C:/Users/Shehroz Khan/AppData/Local/Android/Sdk/platform-tools/adb.exe';
const PKG = 'pk.wantuch.spacebook';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const adb = (...a) => execFileSync(ADB, a, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const sh = (...a) => adb('shell', ...a);

const focus = () => (sh('dumpsys', 'window').match(/mCurrentFocus=.*/) || [''])[0];
const inApp = () => focus().includes(PKG);
let lastOk = 0;
function requireApp(what) {
  if (Date.now() - lastOk < 900) return;     // checked a moment ago
  const f = focus();
  if (!f.includes(PKG)) throw new Error('SpaceBook is not in front (' + f.slice(0, 90) + ') - refusing to ' + what);
  lastOk = Date.now();
}

// ---- touches
const tap = (x, y) => { requireApp('tap'); sh('input', 'tap', String(Math.round(x)), String(Math.round(y))); };
const swipe = (x1, y1, x2, y2, ms = 600) => { requireApp('swipe'); sh('input', 'swipe', ...[x1, y1, x2, y2].map(v => String(Math.round(v))), String(ms)); };
const hold = (x, y, ms = 800) => swipe(x, y, x, y, ms);
const key = code => sh('input', 'keyevent', code);

// ---- the app's own screens: the phone's accessibility tree (content descriptions and text)
function dump() {
  requireApp('read the screen');
  sh('uiautomator', 'dump', '/sdcard/sb_ui.xml');
  const xml = adb('exec-out', 'cat', '/sdcard/sb_ui.xml');
  sh('rm', '-f', '/sdcard/sb_ui.xml');
  const nodes = [];
  for (const m of xml.matchAll(/<node [^>]*>/g)) {
    const n = m[0], g = k => (n.match(new RegExp(' ' + k + '="([^"]*)"')) || [])[1] || '';
    const b = g('bounds').match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
    if (!b) continue;
    nodes.push({ text: g('text'), desc: g('content-desc'), cls: g('class'), clickable: g('clickable') === 'true', l: +b[1], t: +b[2], r: +b[3], b: +b[4],
      cx: (+b[1] + +b[3]) / 2, cy: (+b[2] + +b[4]) / 2 });
  }
  return nodes;
}
const find = (nodes, pred) => nodes.find(pred);

// ---- the page inside the WebView (Chrome DevTools protocol over adb)
let cdpPort = 9222;
function cdpAttach() {
  const pid = sh('pidof', PKG).trim().split(/\s+/)[0];
  adb('forward', '--remove-all');
  adb('forward', 'tcp:' + cdpPort, 'localabstract:webview_devtools_remote_' + pid);
}
async function pages() { return (await (await fetch(`http://localhost:${cdpPort}/json`)).json()).filter(p => p.type === 'page'); }
async function web(expr) {
  const list = await pages();
  if (!list.length) throw new Error('no WebView page');
  const page = list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  const info = JSON.parse(page.description || '{}');
  let timer;
  try {
    const val = await new Promise((res, rej) => {
      ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id === 1) { d.result && d.result.exceptionDetails ? rej(new Error(JSON.stringify(d.result.exceptionDetails).slice(0, 300))) : res(d.result && d.result.result ? d.result.result.value : undefined); } };
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { expression: expr, awaitPromise: true, returnByValue: true } }));
      timer = setTimeout(() => rej(new Error('web timeout')), 15000);
    });
    return { value: val, screenX: info.screenX || 0, screenY: info.screenY || 0 };
  } finally { clearTimeout(timer); ws.close(); }
}
// the centre of a page element on the phone's screen (physical pixels), or null. `fn` is a JS function body returning the element.
async function webPoint(fnBody) {
  const r = await web(`(function(){ const el = (function(){ ${fnBody} })(); if (!el) return null; const b = el.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2, w: b.width, h: b.height, dpr: window.devicePixelRatio, vh: innerHeight }; })()`);
  const v = r.value; if (!v) return null;
  return { x: r.screenX + v.x * v.dpr, y: r.screenY + v.y * v.dpr, w: v.w * v.dpr, h: v.h * v.dpr, vh: v.vh * v.dpr, top: r.screenY, bottom: r.screenY + v.vh * v.dpr };
}

// a book sentence (or a word inside it) by its text, tapped on its first line / at its first letters
const SENT = `[...document.querySelectorAll('span')].filter(e=>/(^|\\s)[a-z]+\\d*-s(\\s|$)/.test(e.className.toString())`;
const sentPoint = text => webPoint(`const e=${SENT}&&e.textContent.trim().startsWith(${JSON.stringify(text)}))[0]; if(!e) return null; const r=e.getClientRects()[0]; return {getBoundingClientRect:()=>({left:r.left+Math.min(r.width/2,60)-30,top:r.top,width:60,height:r.height})}`);
const smoothScroll = async y => { await web(`window.scrollTo({top:${Math.round(y)},behavior:'smooth'})`); await sleep(1100); };
const docY = async fnBody => (await web(`(function(){ const el=(function(){${fnBody}})(); return el? el.getBoundingClientRect().top + scrollY : null })()`)).value;

// ---- recording
let rec = null;
function startRecording(name) {
  sh('rm', '-f', `/sdcard/sb_${name}.mp4`);
  const p = spawn(ADB, ['shell', 'screenrecord', '--size', '720x1604', '--bit-rate', '12000000', '--time-limit', '170', `/sdcard/sb_${name}.mp4`], { stdio: 'ignore' });
  rec = { name, p, spawned: Date.now() };
}
async function stopRecording(destDir) {
  try { sh('kill -2 $(pidof screenrecord)'); } catch (e) { /* already ended */ }
  await sleep(2500);
  fs.mkdirSync(destDir, { recursive: true });
  const dest = `${destDir}/${rec.name}.mp4`;
  adb('pull', `/sdcard/sb_${rec.name}.mp4`, dest);
  sh('rm', '-f', `/sdcard/sb_${rec.name}.mp4`);
  rec = null;
  return dest;
}
function shot(path) { fs.writeFileSync(path, execFileSync(ADB, ['exec-out', 'screencap', '-p'], { maxBuffer: 64 * 1024 * 1024 })); }

module.exports = { ADB, PKG, sleep, adb, sh, focus, inApp, requireApp, tap, swipe, hold, key, dump, find, cdpAttach, web, webPoint, sentPoint, smoothScroll, docY, startRecording, stopRecording, shot };
