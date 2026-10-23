'use strict';
/* Tries the Animate Solution controls on the phone: Class 6 Mathematics, chapter 3, Exercise 3.7 (e) -> Animate, then
 * Play / Pause, the speed button, Voice on/off and the English / Urdu choice. Prints what the page and the app did.
 *   node artwork/demo/anim_test.js */
const P = require('./phone');
const sleep = P.sleep;
const chipsOf = ns => ns.filter(n => /^Class \d+$/.test(n.desc)).map(n => ({ k: +n.desc.slice(6), cx: (Math.max(n.l, 0) + Math.min(n.r, 720)) / 2, w: Math.min(n.r, 720) - Math.max(n.l, 0) }));
const step = async () => (await P.web(`(()=>{const s=[...document.querySelectorAll('*')].find(e=>e.children.length===0&&/^Step \\d+ of \\d+/.test(e.textContent.trim()));return s?s.textContent.trim():'?'})()`)).value;
const info = async () => (await P.web(`JSON.stringify({play:(document.querySelector('[data-act=play]')||{}).textContent, spd:(document.querySelector('.sbt-spv')||{}).textContent, voice:(document.querySelector('[data-act=voice]')||{}).textContent, vlang:(document.querySelector('[data-act=vlang]')||{}).value, speaking:window.speechSynthesis&&window.speechSynthesis.speaking, shim:!!(window.speechSynthesis&&window.speechSynthesis.__sb)})`)).value;
const ctl = sel => P.webPoint(`return document.querySelector(${JSON.stringify(sel)})`);
async function tapCtl(sel, name) {
  let p = await ctl(sel);
  if (p && (p.y > p.bottom - 80 || p.y < p.top + 20)) { await P.web(`document.querySelector(${JSON.stringify(sel)}).scrollIntoView({block:'center'})`); await sleep(600); p = await ctl(sel); }
  if (!p) throw new Error('control not found: ' + name);
  P.tap(p.x, p.y); await sleep(700);
}

(async () => {
  P.cdpAttach();
  // to the Library, class 6
  for (let i = 0; i < 8; i++) { const ns = P.dump(); if (chipsOf(ns).length) break; const nav = ns.find(n => n.text === 'Library' && n.t > 1400); if (nav) { P.tap(nav.cx, nav.cy); await sleep(1500); continue; } P.key('KEYCODE_BACK'); await sleep(1300); }
  for (let i = 0; i < 10; i++) {
    const c = chipsOf(P.dump()).find(c => c.k === 6 && c.w > 60);
    if (c) { P.tap(c.cx, 250); await sleep(1500); break; }
    P.swipe(640, 250, 140, 250, 900); await sleep(900);
  }
  P.tap(127, 510); await sleep(2000);                 // Mathematics
  P.tap(400, 999); await sleep(1500);                 // chapter 3
  const t0 = Date.now();
  for (;;) { try { if ((await P.web(`!!document.querySelector('.sb-ans, .m6-s')`)).value) break; } catch (e) { /* loading */ } if (Date.now() - t0 > 90000) throw new Error('book did not open'); await sleep(500); }
  await sleep(800);
  P.swipe(620, 365, 120, 365, 500); await sleep(600);
  const tab = await P.webPoint(`return [...document.querySelectorAll('button,[role=tab],a,div')].find(e=>e.getClientRects().length&&e.children.length<4&&/^\u270d\ufe0f?\\s*Exercises$/.test(e.textContent.trim())&&e.getBoundingClientRect().top<150)`);
  P.tap(tab.x, tab.y); await sleep(1200);
  for (let i = 0; i < 6; i++) { P.tap(669, 1509); await sleep(450); }
  await sleep(800);
  const ans = await P.webPoint(`return [...document.querySelectorAll('button.sb-ans')].filter(b=>b.getClientRects().length)[4]`);
  P.tap(ans.x, ans.y); await sleep(1500);
  console.log('controls before Animate:', await info());
  console.log('buttons now:', (await P.web(`JSON.stringify([...document.querySelectorAll('button,[role=tab]')].filter(b=>b.getClientRects().length&&b.getBoundingClientRect().top>-50&&b.getBoundingClientRect().top<innerHeight).map(b=>(b.className||'')+'|'+(b.dataset.act||'')+'|'+b.textContent.trim().slice(0,24)))`)).value);
  // the web side's new tabs / Animate button
  const hasAnimate = (await P.web(`!!document.querySelector('.sbs-tabs button[data-tab=animated]')`)).value;
  console.log('Animate button present:', hasAnimate);
  await tapCtl('.sbs-tabs button[data-tab=animated]', 'Animated tab');
  await sleep(2500);
  console.log('after Animate:', await info(), await step());
  P.shot('C:/tmp/anim_1.png');

  // Play: steps should advance by themselves
  await tapCtl('[data-act=play]', 'Play');
  const s1 = await step(); await sleep(7000); const s2 = await step();
  console.log('Play: ', s1, '->', s2, await info());
  P.shot('C:/tmp/anim_2.png');
  await tapCtl('[data-act=play]', 'Pause');
  const p1 = await step(); await sleep(4000); const p2 = await step();
  console.log('Pause: ', p1, '->', p2, '(must be equal)');

  // Speed: click it three times and read the label
  const labels = [];
  for (let i = 0; i < 4; i++) { await tapCtl('[data-act=spd]', 'Speed'); labels.push((await P.web(`document.querySelector('.sbt-spv').textContent`)).value); }
  console.log('Speed labels after 4 taps:', labels.join(' '));

  // Voice in English, then Urdu
  await P.web(`window.__spoken=[]; const s=window.speechSynthesis; const o=s.speak.bind(s); s.speak=function(u){window.__spoken.push((u.lang||'')+' | '+String(u.text).slice(0,70)); return o(u)};`);
  await tapCtl('[data-act=voice]', 'Voice');
  await sleep(3500);
  console.log('Voice on:', await info(), JSON.stringify((await P.web('window.__spoken')).value));
  P.shot('C:/tmp/anim_3.png');
  await P.web(`const v=document.querySelector('[data-act=vlang]'); v.value='ur'; v.dispatchEvent(new Event('change',{bubbles:true}))`);
  await sleep(5000);
  console.log('Urdu voice:', await info(), JSON.stringify((await P.web('window.__spoken')).value));
  await tapCtl('[data-act=voice]', 'Voice off');
  await sleep(800);
  console.log('Voice off:', await info());
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
