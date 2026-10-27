/* sb_arcade.js — page games: fifteen small arcade games made from ONE page of a book.
 *
 * The student opens "Games" on a page (the 🎮 tab on the page's bar, or the Games button of the Android app) and plays snake, a lane
 * runner, fruit slicing, a penalty shoot-out ... The game is the arcade part; the learning is the page: every question comes from the
 * page's own text (a sentence with one important word taken out, or a sum the page already prints), every answer a game can collect,
 * shoot, slice or steer through is a word or number of that page, and a page with nothing to make a question from says so.
 *
 *   SBArcade.open(unit | {text, title, key})     the overlay for one page unit (a card / printed page element) or plain text
 *   SBArcade.extract(text)                       the questions of a text: {items, ...}      (also under node: require('./sb_arcade.js'))
 *   SBArcade.register(game)                      sb_arcade_games*.js add the games: {id, name, emoji, teach, make(env)}
 *
 * Coins: every NEW right answer is a step of the activity "this game on this page" through SBRewards (+1 coin per new step, +5 for
 * finishing, decided by the same rules as the other games; guests keep them on the device). Nothing here talks to the server.
 * Works offline: the page is the only source. */
(function (root) {
  'use strict';

  /* =====================================================================================================
   * 1. Content: a page's text -> questions. Pure functions, no DOM (the tests run them under node).
   * ===================================================================================================== */
  const norm = s => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
  const STOP = new Set((
    'the and for are was were with this that these those from have has had not but you your they them their there then than will would should could can may might must also into over under about what when where which who whom why how all any each some such only very more most other another because while after before between during through its his her our out off too just both few many much own same if or as at by in is it of on to up an be do did does been being i we he she me my us ' +
    'في من على إلى عن أن إن كان كانت هذا هذه ذلك التي الذي ثم او أو لا ما هو هي ' +
    'کے کی کا کو میں سے پر اور یہ وہ ہے ہیں تھا تھی تھے ہو ہوتا ہوتی ہوتے کہ بھی نے کر کرنا کیا جو جس ایک اس ان لیے لئے ساتھ بعد پہلے ' +
    'د په او چې کې له سره هم یو دا ده دي وي شي نه ته هغه دغه څخه لپاره وروسته مخکې کله').split(/\s+/));
  const ARABIC = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;
  const MARKS = /[\p{M}ـ]/gu;                                   // vowel signs and tatweel: not part of a word's identity
  const key = w => w.toLowerCase().replace(MARKS, '');
  const WORD = /[\p{L}\p{M}][\p{L}\p{M}'’-]*[\p{L}\p{M}]|[\p{L}\p{M}]/gu;

  function hashStr(s) { let h = 2166136261; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function shuffle(a, r) { r = r || Math.random; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  const pick = (a, r) => a[Math.floor((r || Math.random)() * a.length)];

  function tokens(text) {
    const out = []; let m; WORD.lastIndex = 0;
    while ((m = WORD.exec(text))) { const w = m[0].replace(/^['’-]+|['’-]+$/g, ''); if (w) out.push({ w, k: key(w), i: m.index, ar: ARABIC.test(w) }); }
    return out;
  }
  function sentencesOf(text) {
    return String(text).split(/(?<=[.!?؟۔])\s+|\n+/).map(norm).filter(s => {
      const n = tokens(s).length;
      return n >= 5 && n <= 32 && s.length <= 260 && !/https?:|www\./.test(s);
    });
  }

  // numbers: the neighbours a careless student would pick (same number of decimals, never the answer itself)
  function numDecoys(a, r) {
    const s = String(a), clean = s.replace(/,/g, ''), v = parseFloat(clean);
    if (!isFinite(v)) return [];
    const dec = (clean.split('.')[1] || '').length, comma = /,/.test(s) && !dec;
    const fmt = x => { if (!isFinite(x) || x < 0 && v >= 0) return null; const t = dec ? x.toFixed(dec) : String(Math.round(x)); return comma ? t.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : t; };
    const step = dec ? Math.pow(10, -dec) : 1, mag = Math.pow(10, Math.max(0, String(Math.abs(Math.round(v))).length - 1));
    const raw = [v + step, v - step, v + 2 * step, v - 2 * step, v + 10 * step, v - 10 * step, v * 2, v / 2, v + mag, v - mag, v + 5 * step, v - 5 * step];
    if (/^\d{2,}$/.test(clean)) { const d = clean.split(''); const sw = d.slice(); [sw[0], sw[sw.length - 1]] = [sw[sw.length - 1], sw[0]]; raw.push(parseFloat(sw.join(''))); }
    const seen = new Set([s]), out = [];
    shuffle(raw.slice(), r).forEach(x => { const t = fmt(x); if (t != null && !seen.has(t) && t !== clean) { seen.add(t); out.push(t); } });
    return out.slice(0, 8);
  }
  const restyle = (w, like) => /^\p{Lu}/u.test(like) ? w.charAt(0).toUpperCase() + w.slice(1) : (/^\p{Lu}/u.test(w) && !/^\p{Lu}{2,}$/u.test(w) ? w.charAt(0).toLowerCase() + w.slice(1) : w);

  /* text -> {items: [{id, kind, q, a, d: [decoys], s: sentence}], words, sentences}. Deterministic for one text (seeded by it). */
  function extract(text, opt) {
    opt = opt || {};
    text = String(text || '');
    const r = rng(hashStr(text.slice(0, 4000)) ^ text.length);
    const all = tokens(text), freq = new Map(), surface = new Map();
    all.forEach(t => { freq.set(t.k, (freq.get(t.k) || 0) + 1); if (!surface.has(t.k)) surface.set(t.k, t.w); });
    const poolOK = t => !STOP.has(t.k) && t.k.length >= (t.ar ? 3 : 4) && t.k.length <= 14 && !/\d/.test(t.w);
    const pool = []; const seenK = new Set();
    all.forEach(t => { if (poolOK(t) && !seenK.has(t.k)) { seenK.add(t.k); pool.push(surface.get(t.k)); } });
    const sents = sentencesOf(text);
    const items = [], used = new Set();
    const add = it => { if (it.d.length >= 2 && !used.has(it.q)) { used.add(it.q); it.id = items.length; items.push(it); } };

    // 1. sums the page already prints: "12 + 7 = 19" -> "12 + 7 = ?"
    const EQ = /(?<![\d.])(\d{1,6}(?:\.\d{1,3})?)\s*([+\-−–×÷*\/]|(?<=\d\s)x(?=\s\d))\s*(\d{1,6}(?:\.\d{1,3})?)\s*=\s*(\d{1,7}(?:\.\d{1,3})?)(?![\d.])/g;
    let m, eqn = 0; const seenEq = new Set();
    while ((m = EQ.exec(text)) && eqn < 14) {
      const a = parseFloat(m[1]), b = parseFloat(m[3]), c = parseFloat(m[4]), op = m[2];
      const v = op === '+' ? a + b : (op === '-' || op === '−' || op === '–') ? a - b : (op === '×' || op === 'x' || op === '*') ? a * b : b !== 0 ? a / b : NaN;
      if (!isFinite(v) || Math.abs(v - c) > 1e-6 || seenEq.has(m[0])) continue;       // a misprint in the book is never asked
      seenEq.add(m[0]);
      add({ kind: 'eq', q: m[1] + ' ' + op + ' ' + m[3] + ' = _____', a: m[4], d: numDecoys(m[4], r), s: m[0] }); eqn++;
    }
    // 2. a sentence with its most important word (or number) taken out
    shuffle(sents.slice(), r).slice(0, 80).forEach(s => {
      const tk = tokens(s), cnt = new Map(); tk.forEach(t => cnt.set(t.k, (cnt.get(t.k) || 0) + 1));
      const cands = [];
      tk.forEach((t, idx) => {
        if (cnt.get(t.k) !== 1 || !poolOK(t)) return;
        let sc = 1 + ((freq.get(t.k) || 1) > 1 ? 2 : 0) + (t.k.length >= 6 ? 1 : 0);
        if (!t.ar && idx > 0 && /^\p{Lu}\p{Ll}/u.test(t.w)) sc += 2;
        cands.push({ t, sc: sc + r() });
      });
      const nums = []; let nm; const NUM = /(?<![\w.])\d[\d,]*(?:\.\d+)?(?![\w.])/g;
      while ((nm = NUM.exec(s))) { const v = nm[0].replace(/,/g, ''); if ((v.length >= 2 || /\./.test(v)) && s.split(nm[0]).length === 2) nums.push(nm); }
      if (nums.length && (!cands.length || r() < 0.45)) {
        const n0 = pick(nums, r), d = numDecoys(n0[0], r);
        add({ kind: 'num', q: s.slice(0, n0.index) + '_____' + s.slice(n0.index + n0[0].length), a: n0[0], d, s });
        return;
      }
      if (!cands.length) return;
      cands.sort((x, y) => y.sc - x.sc);
      const c = pick(cands.slice(0, 3), r).t;
      const near = pool.filter(w => { const k = key(w); return k !== c.k && !cnt.has(k) && Math.abs(k.length - c.k.length) <= 3 && (ARABIC.test(w) === c.ar); });
      const d = shuffle(near, r).slice(0, 8).map(w => restyle(w, c.w));
      add({ kind: 'cloze', q: s.slice(0, c.i) + '_____' + s.slice(c.i + c.w.length), a: c.w, d, s });
    });
    return { items: items.slice(0, 60), words: pool.length, sentences: sents.length, usable: items.length >= 3 };
  }

  /* an endless, shuffled stream of questions (never the same one twice in a row), each with its options */
  function makeFeed(pack, r) {
    r = r || Math.random;
    let order = [], last = -1;
    return {
      size: pack.items.length,
      next(nOpts) {
        if (!order.length) { order = shuffle(pack.items.map((_, i) => i), r); if (order.length > 1 && order[order.length - 1] === last) order.reverse(); }
        const i = order.pop(); last = i; const it = pack.items[i];
        const n = Math.max(2, Math.min(nOpts || 4, it.d.length + 1));
        const options = shuffle([it.a].concat(shuffle(it.d.slice(), r).slice(0, n - 1)), r);
        return { id: it.id, q: it.q, a: it.a, options, s: it.s, kind: it.kind };
      },
    };
  }

  const API = { extract, makeFeed, numDecoys, rng, shuffle, hashStr, pick, tokens, sentencesOf, norm };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  if (typeof window === 'undefined' || !root.document) return;

  /* =====================================================================================================
   * 2. The overlay: hub, the frame every game shares (lives, score, question bar, pause), coins, sounds
   * ===================================================================================================== */
  const LANG = {
    en: { games: 'Games', play: 'Play', again: 'Play again', hub: 'All games', close: 'Close', none: 'There are no games on this page', noneWhy: 'Games are made from the words and numbers of a page. This page has too little text to make questions from. Open a page with a lesson, a paragraph or sums and try again.', made: n => n + ' questions from this page', best: 'Best', won: 'Level complete!', lost: 'Game over', coins: 'coins', score: 'Score', pause: 'Paused', resume: 'Resume', how: 'How to play', sound: 'Sound', correct: 'Right answer', paused: 'Paused', speed: 'Game speed', sp_slow: 'Slow', sp_easy: 'Easy', sp_normal: 'Normal' },
    ur: { games: 'کھیل', play: 'کھیلیں', again: 'دوبارہ کھیلیں', hub: 'تمام کھیل', close: 'بند کریں', none: 'اس صفحے پر کوئی کھیل نہیں', noneWhy: 'کھیل صفحے کے الفاظ اور اعداد سے بنتے ہیں۔ اس صفحے میں سوال بنانے کے لیے متن کافی نہیں۔ کوئی سبق یا حساب والا صفحہ کھولیں۔', made: n => 'اس صفحے سے ' + n + ' سوال', best: 'بہترین', won: 'درجہ مکمل!', lost: 'کھیل ختم', coins: 'سکے', score: 'سکور', pause: 'رکا ہوا', resume: 'جاری رکھیں', how: 'کیسے کھیلیں', sound: 'آواز', correct: 'صحیح جواب', paused: 'رکا ہوا', speed: 'کھیل کی رفتار', sp_slow: 'آہستہ', sp_easy: 'آسان', sp_normal: 'عام' },
    ps: { games: 'لوبې', play: 'لوبه وکړئ', again: 'بیا لوبه', hub: 'ټولې لوبې', close: 'بندول', none: 'پدې مخ کې لوبه نشته', noneWhy: 'لوبې د مخ له کلمو او شمېرو جوړېږي. پدې مخ کې د پوښتنو جوړولو لپاره کافي متن نشته. یو درس یا حساب لرونکی مخ پرانیزئ.', made: n => 'له دې مخ ' + n + ' پوښتنې', best: 'غوره', won: 'کچه بشپړه شوه!', lost: 'لوبه پای ته ورسېده', coins: 'سکې', score: 'نمرې', pause: 'ودرېده', resume: 'دوام', how: 'څنګه لوبه کوئ', sound: 'غږ', correct: 'سم ځواب', paused: 'ودرېده', speed: 'د لوبې چټکتیا', sp_slow: 'ورو', sp_easy: 'اسانه', sp_normal: 'نورمال' },
    ar: { games: 'ألعاب', play: 'العب', again: 'العب مرة أخرى', hub: 'كل الألعاب', close: 'إغلاق', none: 'لا توجد ألعاب في هذه الصفحة', noneWhy: 'تُصنع الألعاب من كلمات وأرقام الصفحة. هذه الصفحة تحتوي نصًا قليلًا لصنع أسئلة. افتح صفحة فيها درس أو فقرة أو مسائل.', made: n => n + ' سؤالًا من هذه الصفحة', best: 'الأفضل', won: 'اكتمل المستوى!', lost: 'انتهت اللعبة', coins: 'عملات', score: 'النقاط', pause: 'متوقف', resume: 'متابعة', how: 'كيف تلعب', sound: 'الصوت', correct: 'إجابة صحيحة', paused: 'متوقف', speed: 'سرعة اللعبة', sp_slow: 'بطيء', sp_easy: 'سهل', sp_normal: 'عادي' },
  };
  const FONT = '"Segoe UI",system-ui,-apple-system,Roboto,"Noto Sans","Noto Naskh Arabic","Jameel Noori Nastaleeq",sans-serif';
  const GAMES = [];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const ICON = {
    close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    pause: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z', play: 'M8 5v14l11-7z', back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
    vol: 'M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
    mute: 'M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z',
  };
  const ico = n => '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="' + ICON[n] + '"/></svg>';

  const CSS = `
.sba{position:fixed;inset:0;z-index:2147482500;display:flex;flex-direction:column;background:#0b1220;color:#fff;font:500 15px/1.35 system-ui,"Segoe UI",sans-serif;padding-top:env(safe-area-inset-top,0);-webkit-user-select:none;user-select:none;touch-action:none;overscroll-behavior:contain}
.sba *{box-sizing:border-box}
.sba [hidden]{display:none!important}
.sba-top{display:flex;align-items:center;gap:.35rem;padding:.3rem .45rem;background:#111b30;border-bottom:1px solid #22304d;flex:none}
.sba-ib{display:inline-flex;align-items:center;justify-content:center;width:2.15rem;height:2.15rem;padding:0;border:1px solid #334a73;background:#16233f;color:#fff;border-radius:50%;cursor:pointer;flex:none}
.sba-ib:active{background:#22355d}
.sba-title{font-weight:800;font-size:.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;flex:1 1 auto}
.sba-stats{display:flex;align-items:center;gap:.5rem;font-weight:800;font-size:.9rem;white-space:nowrap;flex:none}
.sba-q{flex:none;padding:.4rem .7rem;background:#0f1a30;border-bottom:1px solid #22304d;font-size:1rem;font-weight:700;line-height:1.5;max-height:6.3rem;overflow:auto;text-align:start;min-height:2.2rem}
.sba-q b{color:#fde047;border-bottom:2px dashed #fde047;padding:0 .25rem}
.sba-bar{flex:none;height:5px;background:#1b2945}.sba-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#22c55e,#a3e635);transition:width .3s}
.sba-stage{position:relative;flex:1 1 auto;min-height:0;overflow:hidden}
.sba-stage canvas{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none}
.sba-layer{position:absolute;inset:0;overflow:auto;padding:.7rem;display:flex;flex-direction:column;align-items:center;background:rgba(7,12,24,.94);-webkit-overflow-scrolling:touch;touch-action:pan-y}
.sba-layer.clear{background:transparent;pointer-events:none}
.sba-layer[hidden]{display:none}
.sba-hub{width:100%;max-width:640px}
.sba-hub h2{margin:.2rem 0 .1rem;font-size:1.15rem}
.sba-hub p{margin:.1rem 0 .6rem;color:#9fb3d9;font-size:.85rem}
.sba-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.5rem;width:100%}
.sba-speed{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.4rem;margin:.7rem 0 0;color:#e2e8f0;font:600 .9rem system-ui,sans-serif}
.sba-speed button{min-height:44px;min-width:44px;padding:.3rem .9rem;border-radius:999px;border:2px solid #94a3b8;background:transparent;color:inherit;font:inherit;cursor:pointer}
.sba-speed button.on{background:#fff;color:#0f172a;border-color:#fff}
.sba-speed button:focus-visible{outline:3px solid #fde047;outline-offset:2px}
@media (min-width:560px){.sba-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
.sba-card{display:flex;flex-direction:column;align-items:flex-start;gap:.15rem;text-align:start;padding:.55rem .6rem;border:1px solid #2b3f68;background:linear-gradient(160deg,#16233f,#0f1a30);color:#fff;border-radius:14px;font:inherit;cursor:pointer;min-height:5.4rem}
.sba-card:active{transform:scale(.98)}
.sba-card b{font-size:.95rem}.sba-card span{font-size:.75rem;color:#9fb3d9;line-height:1.3}.sba-card em{font-style:normal;font-size:1.5rem;line-height:1}.sba-card small{margin-top:auto;font-size:.7rem;color:#fde047}
.sba-msg{margin:auto;max-width:420px;text-align:center}
.sba-msg h2{margin:.3rem 0;font-size:1.25rem}.sba-msg p{color:#b7c6e6;margin:.3rem 0 .8rem}
.sba-msg .big{font-size:3rem;line-height:1.1}
.sba-row{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin-top:.6rem}
.sba-btn{border:0;border-radius:999px;padding:.6rem 1.2rem;font:800 .95rem system-ui,sans-serif;background:#22c55e;color:#04210f;cursor:pointer;min-height:2.6rem}
.sba-btn.alt{background:#1d2c4d;color:#fff;border:1px solid #334a73}
.sba-ask{position:absolute;left:0;right:0;bottom:0;display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;padding:.5rem;background:linear-gradient(0deg,rgba(7,12,24,.97),rgba(7,12,24,.8));z-index:3}
.sba-opt{flex:1 1 40%;min-width:7rem;border:2px solid #3a5388;background:#16233f;color:#fff;border-radius:12px;padding:.65rem .5rem;font:700 1rem system-ui,sans-serif;cursor:pointer;min-height:3rem;touch-action:manipulation}
.sba-opt.ok{background:#15803d;border-color:#4ade80}.sba-opt.no{background:#991b1b;border-color:#f87171}
.sba-toast{position:absolute;left:50%;top:.6rem;transform:translateX(-50%);background:#22c55e;color:#04210f;font-weight:800;padding:.25rem .8rem;border-radius:999px;z-index:4;pointer-events:none;animation:sbaT 1.2s ease-out forwards}
.sba-toast.bad{background:#ef4444;color:#fff}
@keyframes sbaT{0%{opacity:0;transform:translate(-50%,6px)}12%{opacity:1;transform:translate(-50%,0)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-14px)}}
html.sba-lock,html.sba-lock body{overflow:hidden!important}
@media (prefers-reduced-motion:reduce){.sba-toast{animation-duration:.01s}}
`;

  // ---- sound (WebAudio, only after the first touch) and settings kept on the device ----
  const store = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked: nothing is kept */ } } };
  // How fast the games run: Easy is the default (a child who is still reading the question is not run over); the choice is kept. Only the live loop is scaled
  // (frame()), the step() the tests call by hand is not.
  const SPEEDS = { slow: 0.55, easy: 0.75, normal: 1 };
  const speedPref = () => { const v = store.get('sb_arcade_speed', 'easy'); return SPEEDS[v] ? v : 'easy'; };
  let actx = null;
  function beep(freq, dur, type, vol) {
    if (store.get('sb_arcade_mute', false)) return;
    try {
      actx = actx || new (root.AudioContext || root.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
      o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t); o.frequency.exponentialRampToValueAtTime(Math.max(40, freq * (type === 'sawtooth' ? 0.5 : 1.5)), t + dur);
      g.gain.setValueAtTime(vol || 0.08, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + dur + 0.02);
    } catch (e) { /* no audio on this device */ }
  }
  const SND = { right() { beep(660, 0.12); setTimeout(() => beep(880, 0.14), 90); }, wrong() { beep(180, 0.3, 'sawtooth', 0.09); }, win() { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, 0.18), i * 110)); }, lose() { [330, 262, 196].forEach((f, i) => setTimeout(() => beep(f, 0.25, 'triangle'), i * 160)); }, tick() { beep(440, 0.05, 'square', 0.04); } };

  function addCss() { if (document.getElementById('sba-css')) return; const s = document.createElement('style'); s.id = 'sba-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* what page is this? A stable id (for the reward keys and the best scores) and the page's title */
  function identify(unit, opt) {
    let cls = '', subj = '', idx = 0, tab = '', ord = 0, title = '';
    try {
      const cur = root.SBPageTabs && root.SBPageTabs.chapterNow ? root.SBPageTabs.chapterNow() : {};
      cls = String(cur.cls || ''); subj = String(cur.subj || ''); idx = cur.idx == null ? 0 : cur.idx;
      const b = document.querySelector('.math-nav-tabs .active, .math-top-tab.active');
      tab = b ? (b.textContent || '').replace(/[^A-Za-z0-9 _-]/g, '').trim().slice(0, 30) : '';
      if (unit && unit.parentElement) {
        const sibs = Array.from(document.querySelectorAll('.sb-pgcard, .bk-page:not(.bk-blank), .math-topic-card, .para-card')).filter(x => !x.parentElement.closest('.sb-pgcard, .bk-page, .math-topic-card, .para-card'));
        ord = Math.max(0, sibs.indexOf(unit));
      }
      const h = unit && unit.querySelector && unit.querySelector('.math-acc-header h3, .para-card-header span:last-child, .m6-h3, h3, h4');
      title = norm(h ? h.textContent : '').slice(0, 80);
      const ch = cur.ch; if (!title && ch) title = norm(ch.title || ch.name || ch.titleEn || '').slice(0, 80);
    } catch (e) { /* the page text alone still makes games */ }
    const num = (/^cls(\d+)$/.exec(cls) || [])[1] || '0';
    const pid = [cls, subj, idx, tab, ord].join(':');
    return { cls: num, subj: subj.replace(/[^A-Za-z0-9_.:-]/g, '').slice(0, 20) || 'x', idx, pid: opt && opt.key || pid, title: (opt && opt.title) || title || 'this page' };
  }

  function unitText(el) {
    if (typeof el === 'string') return el;
    const c = el.cloneNode(true);
    c.querySelectorAll('.sb-pt, .sb-tp, button, script, style, svg, canvas, .m6-tools, .katex-mathml, .sb-tri-drawer, [id^="sent-trans-"], [class$="-tr"], [class*="-tr "], .bk-foot, .sbapp-hint, .sb-solve, .sb-ans, .sbl-tools, input, select, textarea, .c1-say, .sb-topic-tools, .math-acc-icon, .sba').forEach(x => x.remove());
    c.querySelectorAll('p,li,div,h1,h2,h3,h4,h5,h6,td,th,tr,section,article,figcaption,dt,dd').forEach(e => e.insertAdjacentText('beforeend', '\n'));
    c.querySelectorAll('br').forEach(e => e.replaceWith('\n'));
    return (c.textContent || '').replace(/[ \t ]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{2,}/g, '\n').trim();
  }
  function langOf(text) { const a = (text.match(/[؀-ۿ]/g) || []).length, l = (text.match(/[A-Za-z]/g) || []).length; return a > l ? 'ar' : 'en'; }
  function uiLang() { try { const m = root.SBMedium && root.SBMedium.mediumNow && root.SBMedium.mediumNow(); return LANG[m] ? m : 'en'; } catch (e) { return 'en'; } }

  /* ---------------------------------------------------------------------------------------------------
   * One open overlay
   * --------------------------------------------------------------------------------------------------- */
  let current = null;

  function open(src, opt) {
    opt = opt || {};
    if (current) current.destroy();
    addCss();
    const text = typeof src === 'string' ? src : (src && src.text != null && !src.nodeType ? src.text : unitText(src));
    const meta = identify(src && src.nodeType ? src : null, typeof src === 'object' && !src.nodeType ? src : opt);
    const L = LANG[opt.lang || uiLang()] || LANG.en;
    const pack = extract(text);
    const rtlPage = langOf(text) === 'ar';
    const seed = opt.seed != null ? opt.seed : (Date.now() & 0xffffffff);
    const R = rng(seed);

    const el = document.createElement('div');
    el.className = 'sba no-swipe'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', L.games);
    el.innerHTML = `<div class="sba-top"><button type="button" class="sba-ib" data-a="back" aria-label="${L.close}" title="${L.close}">${ico('close')}</button><div class="sba-title">🎮 ${esc(L.games)}</div><div class="sba-stats" aria-live="polite"></div><button type="button" class="sba-ib" data-a="pause" aria-label="${L.pause}" title="${L.pause}" hidden>${ico('pause')}</button><button type="button" class="sba-ib" data-a="mute" aria-label="${L.sound}" title="${L.sound}">${ico(store.get('sb_arcade_mute', false) ? 'mute' : 'vol')}</button></div>
      <div class="sba-q" dir="auto" hidden></div><div class="sba-bar" hidden><i></i></div>
      <div class="sba-stage"><canvas></canvas><div class="sba-layer"></div></div>`;
    (document.fullscreenElement || document.body).appendChild(el);
    document.documentElement.classList.add('sba-lock');

    const $ = q => el.querySelector(q);
    const stage = $('.sba-stage'), cv = $('canvas'), layer = $('.sba-layer'), qEl = $('.sba-q'), barEl = $('.sba-bar'), statsEl = $('.sba-stats'), titleEl = $('.sba-title'), pauseBtn = $('[data-a="pause"]');
    const g = cv.getContext('2d');
    let W = 300, H = 400, dpr = 1;
    const E = {
      el, stage, g, R, seed, meta, L, pack, rtlPage, auto: opt.auto || null, manual: !!opt.manual,
      get W() { return W; }, get H() { return H; }, rnd: R, t: 0, FONT, speed: SPEEDS[speedPref()],
      lives: 3, score: 0, streak: 0, right: 0, goal: 8, state: 'hub', game: null, inst: null, paused: false, q: null, steps: 0, coinsEarned: 0, wrongs: 0,
    };
    const feed = makeFeed(pack, R);
    E.feed = feed;
    E.rand = (a, b) => a + R() * (b - a);
    E.ri = (a, b) => Math.floor(a + R() * (b - a + 1));
    E.pick = a => a[Math.floor(R() * a.length)];
    E.shuffle = a => shuffle(a, R);
    E.clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    // ---- size ----
    function resize() {
      const r = stage.getBoundingClientRect();
      W = Math.max(120, Math.round(r.width)); H = Math.max(120, Math.round(r.height));
      dpr = Math.min(2, root.devicePixelRatio || 1);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (E.inst && E.inst.resize) E.inst.resize(W, H);
      if (E.inst) draw();                                   // a resized canvas is blank until it is drawn again
    }
    let ro = null;
    try { ro = new ResizeObserver(() => resize()); ro.observe(stage); } catch (e) { root.addEventListener('resize', resize); }
    resize();

    // ---- the frame: stats, question, progress ----
    function paintStats() {
      const lives = '❤️'.repeat(Math.max(0, E.lives)) + '🖤'.repeat(Math.max(0, 3 - E.lives));
      statsEl.innerHTML = E.state === 'play' || E.state === 'paused' ? `<span aria-label="${E.lives}">${lives}</span><span>⭐${E.score}</span>${E.streak > 1 ? `<span>🔥${E.streak}</span>` : ''}` : '';
      barEl.firstElementChild.style.width = Math.min(100, Math.round(E.right / E.goal * 100)) + '%';
    }
    E.setQuestion = q => {
      E.q = q;
      qEl.hidden = !q;
      if (q) qEl.innerHTML = esc(q.q).replace('_____', '<b>＿＿＿</b>');
    };
    E.newQuestion = n => { const q = feed.next(n); E.setQuestion(q); return q; };
    E.toast = (txt, bad) => { const t = document.createElement('div'); t.className = 'sba-toast' + (bad ? ' bad' : ''); t.textContent = txt; stage.appendChild(t); setTimeout(() => t.remove(), 1300); };

    // a timer that runs with the game's own clock (so a paused game, a test that steps by hand and a real frame loop all agree)
    const timers = [];
    E.later = (sec, fn) => { timers.push({ t: sec, fn }); };

    // ---- effects (particles, floating text, screen shake) ----
    const fx = [];
    E.burst = (x, y, color, n) => { for (let i = 0; i < (n || 14); i++) { const a = R() * 6.283, s = 60 + R() * 220; fx.push({ k: 'p', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 60, life: 0.7 + R() * 0.4, t: 0, c: color || '#fde047', r: 2 + R() * 3 }); } };
    E.float = (x, y, s, color) => fx.push({ k: 't', x, y, vx: 0, vy: -50, life: 1.0, t: 0, s, c: color || '#fff' });
    E.shake = d => { E.shakeT = d || 0.3; };
    function stepFx(dt) { for (let i = fx.length - 1; i >= 0; i--) { const f = fx[i]; f.t += dt; f.x += f.vx * dt; f.y += f.vy * dt; if (f.k === 'p') f.vy += 520 * dt; if (f.t >= f.life) fx.splice(i, 1); } if (E.shakeT > 0) E.shakeT -= dt; }
    function drawFx() {
      fx.forEach(f => {
        const a = 1 - f.t / f.life; g.globalAlpha = Math.max(0, a);
        if (f.k === 'p') { g.fillStyle = f.c; g.beginPath(); g.arc(f.x, f.y, f.r, 0, 6.283); g.fill(); }
        else { g.font = '800 20px ' + FONT; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 4; g.strokeStyle = 'rgba(0,0,0,.6)'; g.strokeText(f.s, f.x, f.y); g.fillStyle = f.c; g.fillText(f.s, f.x, f.y); }
      });
      g.globalAlpha = 1;
    }

    // ---- drawing helpers the games share ----
    E.rr = (x, y, w, h, r) => { r = Math.min(r, w / 2, h / 2); g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
    E.fit = (str, maxW, size, min, weight) => { size = size || 18; min = min || 9; let s = size; g.font = (weight || 800) + ' ' + s + 'px ' + FONT; while (s > min && g.measureText(str).width > maxW) { s -= 1; g.font = (weight || 800) + ' ' + s + 'px ' + FONT; } return s; };
    // text in a box: shrinks to fit, wraps onto a second line when it still does not
    E.label = (str, cx, cy, maxW, size, color, stroke) => {
      str = String(str); let s = E.fit(str, maxW, size, Math.max(9, size * 0.62));
      g.textAlign = 'center'; g.textBaseline = 'middle'; g.direction = 'inherit';
      if (g.measureText(str).width > maxW && /\s/.test(str)) {
        const words = str.split(/\s+/), half = Math.ceil(words.length / 2), a = words.slice(0, half).join(' '), b = words.slice(half).join(' ');
        s = Math.min(s, E.fit(a.length > b.length ? a : b, maxW, size, 8)); g.font = '800 ' + s + 'px ' + FONT;
        [[a, -s * 0.55], [b, s * 0.55]].forEach(([t, dy]) => { if (stroke) { g.lineWidth = 3; g.strokeStyle = stroke; g.strokeText(t, cx, cy + dy); } g.fillStyle = color || '#fff'; g.fillText(t, cx, cy + dy); });
        return;
      }
      if (stroke) { g.lineWidth = 3; g.strokeStyle = stroke; g.strokeText(str, cx, cy); }
      g.fillStyle = color || '#fff'; g.fillText(str, cx, cy);
    };
    E.emoji = (ch, x, y, size, rot) => { g.save(); g.translate(x, y); if (rot) g.rotate(rot); g.font = size + 'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(ch, 0, 0); g.restore(); };
    E.sky = (c1, c2) => { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, c1); gr.addColorStop(1, c2); g.fillStyle = gr; g.fillRect(0, 0, W, H); };

    // ---- DOM option buttons (for the games whose decision is not a place on the canvas) ----
    let askEl = null;
    E.ask = (q, cb, o) => {
      E.clearAsk();
      askEl = document.createElement('div'); askEl.className = 'sba-ask'; askEl.setAttribute('role', 'group');
      q.options.forEach(opt => { const b = document.createElement('button'); b.type = 'button'; b.className = 'sba-opt'; b.textContent = opt; b.dir = 'auto'; b.dataset.v = opt; askEl.appendChild(b); });
      askEl.addEventListener('click', e => {
        const b = e.target.closest('.sba-opt'); if (!b || b.disabled) return;
        const ok = b.dataset.v === q.a; b.classList.add(ok ? 'ok' : 'no');
        if (!ok) { askEl.querySelectorAll('.sba-opt').forEach(x => { if (x.dataset.v === q.a) x.classList.add('ok'); }); }
        askEl.querySelectorAll('.sba-opt').forEach(x => { x.disabled = true; });
        E.later(ok ? 0.35 : 0.9, () => { E.clearAsk(); cb(ok, b.dataset.v); });
      });
      stage.appendChild(askEl);
      E.askQ = q;
      return askEl;
    };
    E.clearAsk = () => { if (askEl) { askEl.remove(); askEl = null; } E.askQ = null; };
    E.askPick = ok => { if (!askEl) return; const v = ok ? E.askQ.a : E.askQ.options.find(o => o !== E.askQ.a); const b = Array.from(askEl.querySelectorAll('.sba-opt')).find(x => x.dataset.v === v); if (b) b.click(); };

    // ---- rules shared by every game ----
    const best = () => store.get('sb_arcade_best_v1', {});
    function rewardKey(game) {
      const total = E.goal, h = hashStr(meta.pid + '|' + game.id).toString(36).slice(0, 8);
      return meta.cls ? 'cls' + meta.cls + '|g-pg-' + game.id + '-' + meta.subj + '|u' + String(meta.idx).replace(/[^A-Za-z0-9]/g, '').slice(0, 6) + '|count|' + h + '|' + total : '';
    }
    E.rightAnswer = (x, y) => {
      if (E.state !== 'play') return;
      E.right++; E.streak++; const pts = 10 + Math.min(10, E.streak - 1) * 2; E.score += pts;
      E.burst(x == null ? W / 2 : x, y == null ? H / 2 : y, '#86efac', 18); E.float(x == null ? W / 2 : x, (y == null ? H / 2 : y) - 10, '+' + pts, '#bbf7d0');
      SND.right(); E.toast('✔ ' + L.correct);
      const i = E.right - 1;
      if (E.right <= E.goal && root.SBRewards && E.key) {
        try { root.SBRewards.step(E.key, ('🎮 ' + E.game.name + ' · ' + meta.title).slice(0, 180), E.goal, i, undefined, undefined); } catch (e) { /* coins are a bonus: the game goes on */ }
      }
      paintStats();
      if (E.right >= E.goal) { E.state = 'ending'; E.later(0.45, () => finish(true)); }
      return pts;
    };
    E.wrongAnswer = (x, y) => {
      if (E.state !== 'play') return;
      E.lives--; E.streak = 0; E.wrongs++;
      E.burst(x == null ? W / 2 : x, y == null ? H / 2 : y, '#fca5a5', 14); E.shake(0.35);
      SND.wrong(); try { navigator.vibrate && navigator.vibrate(40); } catch (e) { /* no vibration */ }
      const q = E.q; E.toast('✘ ' + (q ? q.a : ''), true);
      paintStats();
      if (E.lives <= 0) { E.state = 'ending'; E.later(0.5, () => finish(false)); }
    };

    function stars() { return E.lives >= 3 ? 3 : E.lives === 2 ? 2 : 1; }
    function finish(won) {
      if (E.state !== 'ending') return;
      E.state = won ? 'won' : 'lost'; E.clearAsk(); setQ(false);
      pauseBtn.hidden = true;
      const b = best(), kk = meta.pid + '|' + E.game.id;
      if (won && (!b[kk] || b[kk].score < E.score)) { b[kk] = { score: E.score, stars: stars() }; store.set('sb_arcade_best_v1', b); }
      let again = null;
      if (won && root.SBRewards && E.key) { try { const a = root.SBRewards.get(E.key); if (a && a.times > 0) again = root.SBRewards.again(E.key); } catch (e) { /* ignore */ } }
      (won ? SND.win : SND.lose)();
      showResult(won);
    }
    const setQ = on => { qEl.hidden = !on || !E.q; barEl.hidden = !on; };

    // ---- screens ----
    function show(html, clear) { layer.hidden = false; layer.classList.toggle('clear', !!clear); layer.innerHTML = html; layer.scrollTop = 0; }
    function hideLayer() { layer.hidden = true; layer.innerHTML = ''; }
    const speedHtml = () => `<div class="sba-speed" role="radiogroup" aria-label="${esc(L.speed)}"><span>${esc(L.speed)}</span>${['slow', 'easy', 'normal'].map(k => `<button type="button" role="radio" aria-checked="${speedPref() === k}" class="${speedPref() === k ? 'on' : ''}" data-sp="${k}">${esc(L['sp_' + k])}</button>`).join('')}</div>`;
    function showHub() {
      E.state = 'hub'; E.paused = false; timers.length = 0; if (E.inst && E.inst.destroy) { try { E.inst.destroy(); } catch (e) { /* closing */ } } E.inst = null; E.game = null; E.clearAsk(); E.setQuestion(null); setQ(false);
      pauseBtn.hidden = true; titleEl.textContent = '🎮 ' + L.games; paintStats(); g.clearRect(0, 0, W, H);
      if (!pack.usable || !GAMES.length) {
        show(`<div class="sba-msg"><div class="big">🎮</div><h2 dir="auto">${esc(L.none)}</h2><p dir="auto">${esc(L.noneWhy)}</p><div class="sba-row"><button type="button" class="sba-btn" data-a="back">${esc(L.close)}</button></div></div>`);
        return;
      }
      const b = best();
      show(`<div class="sba-hub"><h2 dir="auto">${esc(meta.title)}</h2><p dir="auto">${esc(L.made(pack.items.length))}</p><div class="sba-grid">${GAMES.map(gm => {
        const bb = b[meta.pid + '|' + gm.id];
        return `<button type="button" class="sba-card" data-g="${gm.id}"><em aria-hidden="true">${gm.emoji}</em><b>${esc(gm.name)}</b><span>${esc(gm.teach)}</span>${bb ? `<small>${'⭐'.repeat(bb.stars)} ${esc(L.best)} ${bb.score}</small>` : ''}</button>`;
      }).join('')}</div>${speedHtml()}</div>`);
    }
    function showResult(won) {
      const earned = E.right;
      const b = best()[meta.pid + '|' + E.game.id];
      show(`<div class="sba-msg"><div class="big">${won ? '🏆' : '💥'}</div><h2 dir="auto">${esc(won ? L.won : L.lost)}</h2>${won ? `<div style="font-size:1.6rem">${'⭐'.repeat(stars())}</div>` : ''}<p>${esc(L.score)}: <b>${E.score}</b> · ✔ ${earned}/${E.goal}${b ? ' · ' + esc(L.best) + ' ' + b.score : ''}</p>
        <div class="sba-row"><button type="button" class="sba-btn" data-g="${E.game.id}">${esc(L.again)}</button><button type="button" class="sba-btn alt" data-a="hub">${esc(L.hub)}</button></div></div>`);
    }
    function showHow(gm) {
      show(`<div class="sba-msg"><div class="big">${gm.emoji}</div><h2>${esc(gm.name)}</h2><p dir="auto">${esc(gm.how || gm.teach)}</p><div class="sba-row"><button type="button" class="sba-btn" data-a="go">${esc(L.play)}</button><button type="button" class="sba-btn alt" data-a="hub">${esc(L.hub)}</button></div>${speedHtml()}</div>`);
      E.pendingGame = gm;
    }

    function start(gm) {
      if (E.inst && E.inst.destroy) { try { E.inst.destroy(); } catch (e) { /* replaced */ } }
      fx.length = 0; timers.length = 0; E.clearAsk();
      Object.assign(E, { game: gm, lives: 3, score: 0, streak: 0, right: 0, wrongs: 0, t: 0, state: 'play', paused: false, q: null, goal: Math.max(3, Math.min(gm.goal || 8, pack.items.length)) });
      E.key = rewardKey(gm);
      titleEl.textContent = gm.emoji + ' ' + gm.name;
      hideLayer(); pauseBtn.hidden = false; pauseBtn.innerHTML = ico('pause'); setQ(true); paintStats();
      E.inst = gm.make(E);
      if (E.inst && E.inst.resize) E.inst.resize(W, H);
      if (!E.manual) schedule();
    }

    // ---- the loop ----
    let raf = 0, lastT = 0;
    function schedule() { if (!raf) { lastT = 0; raf = requestAnimationFrame(frame); } }
    function frame(ts) {
      raf = 0;
      if (!current || current !== api) return;
      const dt = lastT ? Math.min(0.05, (ts - lastT) / 1000) : 0.016; lastT = ts;
      step(dt * E.speed);
      raf = requestAnimationFrame(frame);
    }
    function step(dt) {
      if (E.state === 'play' && !E.paused && E.inst) { E.t += dt; try { E.inst.update(dt); } catch (e) { console.error('arcade', e); } }
      if (!E.paused) for (let i = timers.length - 1; i >= 0; i--) { timers[i].t -= dt; if (timers[i].t <= 0) { const f = timers.splice(i, 1)[0].fn; try { f(); } catch (e) { console.error('arcade', e); } } }
      stepFx(dt); draw();
    }
    function draw() {
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, W, H);
      if (!E.inst || E.state === 'hub') return;
      g.save();
      if (E.shakeT > 0) g.translate((R() - 0.5) * 8, (R() - 0.5) * 8);
      try { E.inst.draw(g); } catch (e) { console.error('arcade', e); }
      drawFx();
      g.restore();
    }

    // ---- input: one stream of down / move / up / swipe for every game ----
    let ptr = null;
    const xy = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    cv.addEventListener('pointerdown', e => {
      if (E.state !== 'play' || E.paused || !E.inst) return;
      try { cv.setPointerCapture(e.pointerId); } catch (er) { /* no capture */ }
      const [x, y] = xy(e); ptr = { id: e.pointerId, x0: x, y0: y, x, y, t0: performance.now(), trail: [[x, y]] };
      if (actx && actx.state === 'suspended') actx.resume(); else if (!actx) beep(1, 0.01);
      if (E.inst.down) E.inst.down(x, y, e);
    });
    cv.addEventListener('pointermove', e => {
      if (!ptr || e.pointerId !== ptr.id) return;
      const [x, y] = xy(e); ptr.x = x; ptr.y = y; ptr.trail.push([x, y]); if (ptr.trail.length > 12) ptr.trail.shift();
      if (E.state === 'play' && !E.paused && E.inst && E.inst.move) E.inst.move(x, y, e);
    });
    const up = e => {
      if (!ptr || e.pointerId !== ptr.id) return;
      const [x, y] = xy(e), dx = x - ptr.x0, dy = y - ptr.y0, dt = performance.now() - ptr.t0, p = ptr; ptr = null;
      if (E.state !== 'play' || E.paused || !E.inst) return;
      if (E.inst.up) E.inst.up(x, y, e);
      if (E.inst.swipe && Math.hypot(dx, dy) > 28 && dt < 700) E.inst.swipe(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'), dx, dy, p);
      else if (E.inst.tap && Math.hypot(dx, dy) < 14 && dt < 600) E.inst.tap(x, y, e);
    };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    E.pointer = () => ptr;
    const keys = e => {
      if (!current || current !== api) return;
      if (e.key === 'Escape') { e.stopPropagation(); if (E.state === 'play') togglePause(); else close(); return; }
      if (E.state !== 'play' || E.paused || !E.inst) return;
      const m = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down', a: 'left', d: 'right', w: 'up', s: 'down', ' ': 'action' }[e.key];
      if (m && E.inst.key) { e.preventDefault(); E.inst.key(m); }
    };
    document.addEventListener('keydown', keys, true);

    function togglePause() {
      if (E.state !== 'play' && E.state !== 'paused') return;
      E.paused = !E.paused; E.state = E.paused ? 'paused' : 'play';
      pauseBtn.innerHTML = ico(E.paused ? 'play' : 'pause');
      if (E.paused) show(`<div class="sba-msg"><div class="big">⏸</div><h2>${esc(L.paused)}</h2><div class="sba-row"><button type="button" class="sba-btn" data-a="resume">${esc(L.resume)}</button><button type="button" class="sba-btn alt" data-a="hub">${esc(L.hub)}</button></div></div>`);
      else hideLayer();
      paintStats();
    }
    function close() { api.destroy(); try { root.SBHost && root.SBHost.onAction && root.SBHost.onAction('gamesClosed', ''); } catch (e) { /* not in the app */ } }

    el.addEventListener('click', e => {
      const sp = e.target.closest('[data-sp]');
      if (sp) { store.set('sb_arcade_speed', sp.dataset.sp); E.speed = SPEEDS[sp.dataset.sp] || SPEEDS.easy; el.querySelectorAll('[data-sp]').forEach(b => { const on = b.dataset.sp === sp.dataset.sp; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); }); return; }
      const c = e.target.closest('[data-g]'), a = e.target.closest('[data-a]');
      if (c) { const gm = GAMES.find(x => x.id === c.dataset.g); if (gm) { if (c.classList.contains('sba-card') && !store.get('sb_arcade_seen_' + gm.id, false)) { store.set('sb_arcade_seen_' + gm.id, true); showHow(gm); } else start(gm); } return; }
      if (!a) return;
      const act = a.dataset.a;
      if (act === 'back') { if (E.state === 'play' || E.state === 'paused' || E.state === 'won' || E.state === 'lost') showHub(); else close(); }
      else if (act === 'hub') showHub();
      else if (act === 'go') start(E.pendingGame);
      else if (act === 'pause' || act === 'resume') togglePause();
      else if (act === 'mute') { const m = !store.get('sb_arcade_mute', false); store.set('sb_arcade_mute', m); a.innerHTML = ico(m ? 'mute' : 'vol'); }
    });

    const back = () => { if (E.state === 'play' || E.state === 'paused' || E.state === 'ending' || E.state === 'won' || E.state === 'lost') showHub(); else close(); };
    const api = {
      el, E, pack, meta, feed, step, draw, back, start: id => { const gm = GAMES.find(x => x.id === id); if (gm) start(gm); }, hub: showHub, close,
      destroy() {
        if (raf) cancelAnimationFrame(raf); raf = 0;
        try { E.inst && E.inst.destroy && E.inst.destroy(); } catch (e) { /* closing */ }
        document.removeEventListener('keydown', keys, true); try { ro && ro.disconnect(); } catch (e) { /* ok */ } root.removeEventListener('resize', resize);
        el.remove(); document.documentElement.classList.remove('sba-lock'); if (current === api) current = null;
      },
    };
    current = api;
    if (opt.game) { const gm = GAMES.find(x => x.id === opt.game); if (gm) start(gm); else showHub(); } else showHub();
    return api;
  }

  /* register a game: {id, name, emoji, teach, how, make(env) -> {update(dt), draw(g), down/move/up/tap/swipe/key, resize, destroy}} */
  function register(game) { if (!GAMES.some(x => x.id === game.id)) GAMES.push(game); }

  const PUB = Object.assign({}, API, { open, register, games: GAMES, unitText, identify, close() { if (current) current.destroy(); }, back() { if (current) current.back(); }, SND, beep, store, ico });
  Object.defineProperty(PUB, 'current', { get() { return current; }, enumerable: true });      // a getter inside Object.assign would be copied as the value it had
  root.SBArcade = PUB;
})(typeof window !== 'undefined' ? window : globalThis);
