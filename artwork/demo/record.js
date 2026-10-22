'use strict';
/* Records the phone scenes of the demo video and writes artwork/demo/scenes/<id>.json next to each clip.
 *   node artwork/demo/record.js library | class1 | class6a | class6b | all
 * Every scene is paced by the narration: an event begins when the previous voice line is over, and its actions are timed from
 * the moment its line starts. The clip is discarded if SpaceBook is not the app in front at any moment.
 * (class6a ends right after the chapter is tapped and class6b starts once it has loaded, so the loading screen is cut out.) */
const fs = require('fs');
const path = require('path');
const P = require('./phone');

const HERE = __dirname;
const rj = f => JSON.parse(fs.readFileSync(f, 'utf8').replace(/^﻿/, ''));
const NARR = rj(path.join(HERE, 'narration.json')).lines;
const DUR = rj(path.join(HERE, 'voice', 'durations.json'));
const OUT = path.join(HERE, 'scenes');
fs.mkdirSync(OUT, { recursive: true });
const sleep = P.sleep;
const L = 0.35;                       // screenrecord's first frame arrives about this long after it is started (see calibrate.js)

// ------------------------------------------------------------------ the phone, outside the recording
function statusBar() {
  const demo = (...a) => P.sh('am', 'broadcast', '-a', 'com.android.systemui.demo', ...a);
  P.sh('settings', 'put', 'global', 'sysui_demo_allowed', '1');
  demo('-e', 'command', 'enter');
  demo('-e', 'command', 'clock', '-e', 'hhmm', '1000');
  demo('-e', 'command', 'battery', '-e', 'level', '100', '-e', 'plugged', 'false');
  demo('-e', 'command', 'notifications', '-e', 'visible', 'false');
  demo('-e', 'command', 'network', '-e', 'wifi', 'show', '-e', 'level', '4');
  demo('-e', 'command', 'network', '-e', 'mobile', 'show', '-e', 'datatype', 'none', '-e', 'level', '4');
}
const chipsOf = ns => ns.filter(n => /^Class \d+$/.test(n.desc)).map(n => ({ k: +n.desc.slice(6), l: n.l, r: n.r, w: Math.min(n.r, 720) - Math.max(n.l, 0), cx: (Math.max(n.l, 0) + Math.min(n.r, 720)) / 2 }));
const hasText = (ns, re) => ns.some(n => re.test(n.text) || re.test(n.desc));

async function toLibrary() {
  for (let i = 0; i < 8; i++) {
    const ns = P.dump();
    if (chipsOf(ns).length) return ns;
    const nav = ns.find(n => n.text === 'Library' && n.t > 1400);       // the bottom bar is showing
    if (nav) { P.tap(nav.cx, nav.cy); await sleep(1500); continue; }
    P.key('KEYCODE_BACK'); await sleep(1400);
  }
  throw new Error('could not reach the Library');
}
async function gridTop() { for (let i = 0; i < 2; i++) { P.swipe(360, 450, 360, 1350, 300); await sleep(500); } }
async function pickClass(k) {
  await toLibrary(); await gridTop();
  for (let i = 0; i < 10; i++) {
    const cs = chipsOf(P.dump());
    const c = cs.find(c => c.k === k && c.w > 60);
    if (c) { P.tap(c.cx, 250); await sleep(1500); return; }
    const first = cs.length ? cs[0].k : 1;
    if (first > k) P.swipe(120, 250, 640, 250, 900); else P.swipe(640, 250, 120, 250, 900);
    await sleep(900);
  }
  throw new Error('class ' + k + ' chip not found');
}

// ------------------------------------------------------------------ a recorded scene
class Scene {
  constructor(id, overflow = 0, carryPanel = null) { this.id = id; this.events = []; this.voiceFree = overflow; this.cur = null; this.carryPanel = carryPanel; }
  now() { return (Date.now() - this.S) / 1000 - L; }          // seconds of the clip
  rel() { return this.now() - this.offset; }                  // seconds of the scene
  async begin() {
    P.requireApp('record');
    statusBar();
    this.S = Date.now(); P.startRecording(this.id);
    await sleep(1400);
    this.offset = +this.now().toFixed(2);
    // a voice line that began in the previous clip is still being read: keep its panel (and give its taps somewhere to go)
    if (this.carryPanel) { this.cur = { t: 0, panel: this.carryPanel, taps: [] }; this.events.push(this.cur); }
  }
  async until(rel) { const w = rel - this.rel(); if (w > 0) await sleep(w * 1000); }
  async event(say, panel, fn) {
    await this.until(this.voiceFree);
    const ev = { t: +this.rel().toFixed(2), say, panel: { text: NARR[say], ...panel }, taps: [] };
    this.events.push(ev); this.cur = ev;
    this.voiceFree = ev.t + 0.12 + DUR[say] + 0.3;
    await fn(ev);
  }
  at(d) { return this.until(this.cur.t + d); }
  tap(x, y) { const t = this.rel(); P.tap(x, y); this.cur.taps.push(+(t + 0.1).toFixed(2)); }
  async hold(x, y, ms) { const t = this.rel(); P.hold(x, y, ms); this.cur.taps.push(+(t + 0.1).toFixed(2)); }
  async finish(hold = 0.6, waitVoice = true) {
    await this.until(Math.max(waitVoice ? this.voiceFree : 0, this.cur ? this.cur.t + 0.5 : 0) + hold);
    const end = +this.rel().toFixed(2);
    const stillIn = P.inApp();
    const file = await P.stopRecording(OUT);
    if (!stillIn) { fs.unlinkSync(file); throw new Error('SpaceBook left the front during ' + this.id + '; clip deleted unseen'); }
    const json = { id: this.id, video: 'scenes/' + this.id + '.mp4', offset: this.offset, duration: end, overflow: +Math.max(0, this.voiceFree - end).toFixed(2), events: this.events };
    fs.writeFileSync(path.join(OUT, this.id + '.json'), JSON.stringify(json, null, 1));
    console.log(`${this.id}: ${end.toFixed(1)} s, ${this.events.length} events, overflow ${json.overflow} s`);
    return json;
  }
}
async function guard(scene, fn) {
  try { await fn(); }
  catch (e) { try { await P.stopRecording(OUT); fs.unlinkSync(path.join(OUT, scene.id + '.mp4')); } catch (x) { /* nothing recorded */ } console.error('FAILED', scene.id, '-', e.message); throw e; }
}

// ------------------------------------------------------------------ the page inside the WebView
const wv = {
  async until(expr, ms = 20000) { const t0 = Date.now(); for (;;) { try { const r = await P.web(expr); if (r.value) return r.value; } catch (e) { /* page changing */ } if (Date.now() - t0 > ms) throw new Error('timed out waiting for ' + expr.slice(0, 60)); await sleep(300); } },
  tabPoint: re => P.webPoint(`return [...document.querySelectorAll('button,[role=tab],a,div')].find(e=>e.getClientRects().length&&e.children.length<4&&${re}.test(e.textContent.trim())&&e.getBoundingClientRect().top<150)`),
  async stepInfo() { return (await P.web(`(()=>{const s=[...document.querySelectorAll('*')].find(e=>e.children.length===0&&/^Step \\d+ of 24/.test(e.textContent.trim()));return s? s.parentElement.innerText.replace(/\\n+/g,' / ').slice(0,80):'?'})()`)).value; },
  // the Next Step button on the phone's screen, and the step the board is on, in one call
  async nextState() {
    const r = await P.web(`(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.getClientRects().length&&/Next Step/.test(b.textContent)); if(!b) return null; const r=b.getBoundingClientRect(); const s=[...document.querySelectorAll('*')].find(e=>e.children.length===0&&/^Step \\d+ of 24/.test(e.textContent.trim())); return JSON.stringify({x:r.left+r.width/2,y:r.top+r.height/2,vh:innerHeight,dpr:devicePixelRatio,step:s?s.parentElement.innerText.replace(/\\n+/g,' / ').slice(0,60):'?'})})()`);
    if (!r.value) return null;
    const v = JSON.parse(r.value);
    return { x: v.x * v.dpr, y: r.screenY + v.y * v.dpr, bottom: r.screenY + v.vh * v.dpr, step: v.step };
  },
};
const CHAPTER_READY = `!!document.querySelector('.sb-ans, .m6-s, [class*="-sent"]')`;

async function waitFor(fn, ms = 6000) {
  const t0 = Date.now();
  for (;;) { const v = await fn(); if (v) return v; if (Date.now() - t0 > ms) throw new Error('timed out waiting for the element'); await sleep(200); }
}

// ================================================================== scene 1: the Library, class by class
// The class strip is pinned above the covers. Each event taps its class chip, then slides the strip so the next chip is in the second
// slot (one dump of the screen tells where the chips are; it runs while the narrator is talking).
async function library() {
  await pickClass(6);
  const s = new Scene('library');
  await s.begin();
  await guard(s, async () => {
    await s.event('lib_open', { type: 'caption', badge: 'The Library' }, async () => {
      await s.at(0.3); P.swipe(360, 1250, 360, 450, 800);                 // look down the shelf of covers
      await s.at(1.7); P.swipe(360, 450, 360, 1350, 350); P.swipe(360, 450, 360, 1350, 350);
      await s.at(2.9); for (let i = 0; i < 3; i++) P.swipe(100, 250, 620, 250, 450);   // the strip back to class 1 (it stops at the start)
    });
    let cx = 20 + 109;                                                     // class 1 chip while the strip is at its start
    for (let k = 1; k <= 12; k++) {
      await s.event('c' + k, { type: 'class', n: k }, async () => {
        const d = DUR['c' + k];
        await s.at(0.15); s.tap(Math.min(Math.max(cx, 40), 680), 250);
        if (k === 6) { await s.at(0.5); P.swipe(360, 1250, 360, 450, 800); await s.at(2.3); P.swipe(360, 450, 360, 1350, 350); P.swipe(360, 450, 360, 1350, 350); }
        if (k < 12) {
          await sleep(250);
          const nx = chipsOf(P.dump()).find(c => c.k === k + 1);
          const dx = nx ? Math.min(nx.l - 255, 560) : 235;
          cx = nx ? nx.cx - Math.max(dx, 0) : 255 + 109;
          if (dx > 40) { await s.at(Math.max(1.9, d - 1.7)); P.swipe(640, 250, 640 - dx, 250, Math.max(600, Math.round(dx * 4))); }
          if (k === 11) { await sleep(600); const c12 = chipsOf(P.dump()).find(c => c.k === 12); if (c12) cx = c12.cx; }   // the strip stops at its end: look where chip 12 is
        } else {
          await s.at(1.2); P.swipe(360, 1250, 360, 450, 900);
        }
      });
    }
    await s.finish(0.8);
  });
}

// ================================================================== scene 2a: Class 1 English, up to tapping the unit
async function class1a() {
  P.cdpAttach();
  await pickClass(1);
  const s = new Scene('class1a');
  await s.begin();
  await guard(s, async () => {
    await s.event('s2_open', { type: 'caption', badge: 'Class 1 · English' }, async () => {
      await s.at(0.5); s.tap(127, 510);                                    // the English cover
    });
    await s.event('s2_unit', { type: 'caption', badge: 'Unit → Exercise' }, async () => {
      await s.at(0.3); s.tap(300, 858);                                    // unit 2, "My Family and I"
      await sleep(1000);
    });
    await s.finish(0, false);
  });
}

// ================================================================== scene 2b: the Exercise tab, two pages with some interaction
async function class1b(overflow, carry) {
  P.cdpAttach();
  const s = new Scene('class1b', overflow, carry);
  await wv.until(CHAPTER_READY, 60000);
  await sleep(600);
  await s.begin();
  await guard(s, async () => {
    let tab;
    for (let i = 0; i < 20 && !tab; i++) { tab = await wv.tabPoint('/^✍️?\\s*Exercises?$/'); if (!tab) await sleep(300); }
    await s.at(0.5); s.tap(tab.x, tab.y);
    await sleep(900);
    const plus = await P.webPoint(`return [...document.querySelectorAll('.math-acc-icon')].find(b=>b.getClientRects().length&&b.getBoundingClientRect().top<400)`);
    if (plus) s.tap(plus.x, plus.y);
    await s.event('s2_sentence', { type: 'caption', badge: 'Tap a sentence' }, async () => {
      await P.smoothScroll(430);
      const pt = await P.sentPoint('Match the pictures with the');
      await s.at(1.3); s.tap(pt.x, pt.y);
    });
    await s.event('s2_speak', { type: 'caption', badge: 'Read aloud' }, async () => {
      await s.at(0.4); s.tap(640, 1219);                                   // the speaker beside the English line
    });
    await s.event('s2_word', { type: 'caption', badge: 'Hold a word' }, async () => {
      await s.at(0.1); s.tap(360, 450); await sleep(600);                  // close the sheet
      const w = await P.webPoint(`return [...document.querySelectorAll('span.m6-s span[data-w="letter"]')][0]`);
      await s.at(0.8); await s.hold(w.x, w.y, 850);
    });
    await s.event('s2_match', { type: 'caption', badge: 'Page 1 · Match' }, async () => {
      await s.at(0.15); s.tap(360, 450); await sleep(400);
      const y = await P.docY(`return [...document.querySelectorAll('*')].find(e=>e.children.length<3&&e.textContent.trim()==='🔗 Match them')`);
      await P.web(`window.scrollTo({top:${Math.round(y - 40)},behavior:'smooth'})`); await sleep(750);
      const btn = (side, text) => P.webPoint(`return [...document.querySelectorAll('button.c1a-wopt')].filter(e=>e.getClientRects().length&&e.textContent.trim()===${JSON.stringify(text)}&&(${JSON.stringify(side)}==='L'?e.getBoundingClientRect().left<innerWidth/2:e.getBoundingClientRect().left>=innerWidth/2))[0]`);
      for (const [a, b] of [['elephant', 'e'], ['soap', 's']]) {
        let p = await btn('L', a); s.tap(p.x, p.y); await sleep(450);
        p = await btn('R', b); s.tap(p.x, p.y); await sleep(750);
      }
    });
    await s.event('s2_p2', { type: 'caption', badge: 'Page 2 · Choose the word' }, async () => {
      const y = await P.docY(`return [...document.querySelectorAll('*')].find(e=>e.children.length<3&&e.textContent.trim()==='🎯 Choose the right word')`);
      await s.at(0.2); await P.smoothScroll(y - 330);
      // the options are shuffled on every load: the wrong try is whichever other word sits beside "orange"
      const opt = wrong => P.webPoint(`const all=[...document.querySelectorAll('button.c1a-wopt')].filter(e=>e.getClientRects().length&&e.getBoundingClientRect().top>0&&e.getBoundingClientRect().top<innerHeight); const right=all.find(e=>e.textContent.trim()==='orange'); if(!right) return null; return ${wrong ? `all.filter(e=>e.parentElement===right.parentElement).find(e=>e.textContent.trim()!=='orange')` : 'right'}`);
      await s.at(1.8); let p = await waitFor(() => opt(true)); s.tap(p.x, p.y);
      await s.at(3.0); p = await waitFor(() => opt(false)); s.tap(p.x, p.y);
      await sleep(2200);                                                    // the confetti
    });
    await s.finish(0.4);
  });
}

// ================================================================== scene 3a: Class 6 Mathematics, up to tapping chapter 3
async function class6a() {
  await pickClass(6);
  const s = new Scene('class6a');
  await s.begin();
  await guard(s, async () => {
    await s.event('s3_open', { type: 'caption', badge: 'Class 6 · Mathematics' }, async () => {
      await s.at(0.5); s.tap(127, 510);
    });
    await s.event('s3_chapter', { type: 'caption', badge: 'Chapter 3' }, async () => {
      await s.at(0.7); s.tap(400, 999);                                    // chapter 3 in the list
      await sleep(1300);
    });
    await s.finish(0, false);
  });
}

// ================================================================== scene 3b: the book is open; Exercise 3.7 question 1 (e)
async function class6b(overflow, carry) {
  const s = new Scene('class6b', overflow, carry);
  P.cdpAttach();
  await wv.until(CHAPTER_READY, 60000);
  await sleep(600);
  await s.begin();
  await guard(s, async () => {
    const log = [];
    await s.event('s3_ex', { type: 'math', badge: 'Exercise 3.7 · Question 1 (e)', lines: [{ html: '725 − [ 20 × { 10 + 7 + ( 7 × <b>(5 − 3)</b> ) } ]' }] }, async () => {
      await s.at(0.2); P.swipe(620, 365, 120, 365, 500); await sleep(500);
      const tab = await wv.tabPoint('/^✍️?\\s*Exercises$/');
      s.tap(tab.x, tab.y); await sleep(1100);
      for (let i = 0; i < 6; i++) { s.tap(669, 1509); await sleep(220); }
      await sleep(600);
    });
    await s.event('s3_ans', { type: 'caption', badge: 'Ans · whole solution' }, async () => {
      const ans = await P.webPoint(`return [...document.querySelectorAll('button.sb-ans')].filter(b=>b.getClientRects().length)[4]`);
      await s.at(0.5); s.tap(ans.x, ans.y);
      await s.at(1.6); await P.smoothScroll(((await P.web('scrollY')).value) + 480);
      await s.at(2.8); await P.smoothScroll(((await P.web('scrollY')).value) + 480);
    });
    const taps = async (n, gap) => {
      for (let i = 0; i < n; i++) {
        let p = await wv.nextState();
        if (p.y > p.bottom - 90) { await P.web(`window.scrollTo({top: scrollY + 460, behavior: 'smooth'})`); await sleep(650); p = await wv.nextState(); }
        log.push(p.step);
        s.tap(p.x, p.y); await sleep(gap);
      }
    };
    await s.event('s3_anim', { type: 'math', badge: 'Animate', lines: [{ html: '725 − [ 20 × { 10 + 7 + ( 7 × <b>2</b> ) } ]' }, { text: '5 − 3 = 2' }] }, async () => {
      await P.smoothScroll(220);
      const an = await P.webPoint(`return [...document.querySelectorAll('button.sbs-animate')].filter(b=>b.getClientRects().length)[0]`);
      await s.at(0.7); s.tap(an.x, an.y);
      await s.at(1.8); await sleep(600); await P.smoothScroll(700);
      await s.at(3.3); await taps(1, 300);
      await s.at(4.2); await taps(1, 300);
      await s.at(5.0); await taps(1, 300);
    });
    await P.web(`(()=>{const s=[...document.querySelectorAll('select')].find(s=>[...s.options].some(o=>o.value==='fast')); s.value='fast'; s.dispatchEvent(new Event('change',{bubbles:true}));})()`);
    await s.event('s3_next1', { type: 'math', badge: 'Next step', lines: [{ html: '725 − [ 20 × { 10 + 7 + ( <b>7 × 2</b> ) } ]' }, { text: '7 × 2 = 14' }] }, async () => {
      await s.at(0.1); await taps(4, 280);
    });
    await s.event('s3_next2', { type: 'math', badge: 'Next step', lines: [{ html: '725 − [ 20 × { <b>10 + 7 + 14</b> } ]' }, { text: '10 + 7 + 14 = 31' }] }, async () => {
      await s.at(0.1); await taps(7, 250);
    });
    await s.event('s3_next3', { type: 'math', badge: 'Next step', lines: [{ html: '725 − [ <b>20 × 31</b> ]' }, { text: '20 × 31 = 620' }] }, async () => {
      await s.at(0.1); await taps(4, 380);
    });
    await s.event('s3_end', { type: 'math', badge: 'Answer', lines: [{ text: '725 − 620' }, { text: '= 105', big: true }] }, async () => {
      await s.at(0.1); await taps(5, 420);
    });
    console.log(log.join('\n'));
    await s.finish(1.8);
  });
}

(async () => {
  const which = process.argv[2] || 'all';
  const ok = n => which === 'all' || which === n;
  const prev = id => rj(path.join(OUT, id + '.json'));
  const lastPanel = a => a.events[a.events.length - 1].panel;
  if (ok('library')) await library();
  if (ok('class1a')) await class1a();
  if (ok('class1b')) { const a = prev('class1a'); await class1b(a.overflow, lastPanel(a)); }
  if (ok('class6a')) await class6a();
  if (ok('class6b')) { const a = prev('class6a'); await class6b(a.overflow, lastPanel(a)); }
  // the order of the scenes in the video
  const ids = ['library', 'class1a', 'class1b', 'class6a', 'class6b'].filter(id => fs.existsSync(path.join(OUT, id + '.json')));
  fs.writeFileSync(path.join(HERE, 'scenes.json'), JSON.stringify({ scenes: ids.map(id => prev(id)) }, null, 1));
  console.log('scenes.json:', ids.join(', '));
})().catch(e => { console.error(e.stack || e.message); process.exit(1); });
