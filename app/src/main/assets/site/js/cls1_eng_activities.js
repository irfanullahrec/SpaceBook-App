/* Class 1 English — Unit 1 ("Time to Recall") hands-on activities.
 *
 * Turns the printed worksheets into things a six-year-old can DO. The book data (english_1_book.js) is
 * untouched: this file watches the rendered Class 1 English lessons and, next to the static picture, adds
 *   Getting Started  "Name any five objects"      type or tap five objects, get praised, sample answer
 *   Q5  Trace and copy the capital and small letters   tap a letter's blinking start dot: a hand holding a
 *                                                      pencil draws it over the dotted letter
 *   Q6  Write capital letters in alphabetical order    press + hold the blinking dot, drag to the next dot
 *                                                      as it appears, A to Z
 *   Q7-10 letters before / after                       three choices, praise / gentle "try again"
 *   Q11 Dictation                                      hear a sound, pick the letter, it flies into the star
 *   Q12 Trace and copy the given words                 drag along the dotted letters; they turn solid
 * Everything is vanilla JS + inline SVG, offline, speech via the Web Speech API when available.
 * Only runs inside Class 1 English, unit 1 (cards whose id is c1-0-… / c1-ex-0-…). */
(function () {
  'use strict';
  if (typeof window === 'undefined' || window.__c1ActInit) return;
  window.__c1ActInit = true;

  const NS = 'http://www.w3.org/2000/svg';
  const rnd = n => Math.floor(Math.random() * n);
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in (attrs || {})) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function h(tag, cls, html, parent) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
  }

  /* ---------- single-line "school" glyphs: x 0-100, ascender y=20, x-height y=55, baseline y=120, tail y≈165 ---------- */
  const G = {
    A: ['M15 120 L50 20 L85 120', 'M29 82 L71 82'],
    B: ['M20 20 V120', 'M20 20 H50 C88 20 88 68 50 68 H20', 'M20 68 H55 C94 68 94 120 55 120 H20'],
    C: ['M82 38 C70 12 18 14 18 70 C18 126 70 128 82 102'],
    D: ['M20 20 V120', 'M20 20 H45 C98 20 98 120 45 120 H20'],
    E: ['M20 20 V120', 'M20 20 H80', 'M20 70 H70', 'M20 120 H80'],
    F: ['M20 20 V120', 'M20 20 H80', 'M20 70 H68'],
    G: ['M82 38 C70 12 18 14 18 70 C18 126 70 128 82 102 V74 H55'],
    H: ['M20 20 V120', 'M80 20 V120', 'M20 70 H80'],
    I: ['M32 20 H68', 'M50 20 V120', 'M32 120 H68'],
    J: ['M66 20 V92 C66 128 24 128 20 94'],
    K: ['M22 20 V120', 'M80 20 L22 76', 'M42 58 L82 120'],
    L: ['M25 20 V120 H78'],
    M: ['M15 120 V20 L50 86 L85 20 V120'],
    N: ['M20 120 V20 L80 120 V20'],
    O: ['M50 20 C6 20 6 120 50 120 C94 120 94 20 50 20'],
    P: ['M20 20 V120', 'M20 20 H50 C88 20 88 72 50 72 H20'],
    Q: ['M50 20 C6 20 6 120 50 120 C94 120 94 20 50 20', 'M58 90 L86 126'],
    R: ['M20 20 V120', 'M20 20 H50 C88 20 88 72 50 72 H20', 'M48 72 L82 120'],
    S: ['M80 38 C70 14 22 18 25 46 C28 72 78 62 78 96 C78 130 28 128 18 100'],
    T: ['M15 20 H85', 'M50 20 V120'],
    U: ['M20 20 V84 C20 132 80 132 80 84 V20'],
    V: ['M15 20 L50 120 L85 20'],
    W: ['M10 20 L30 120 L50 50 L70 120 L90 20'],
    X: ['M18 20 L82 120', 'M82 20 L18 120'],
    Y: ['M15 20 L50 70 L85 20', 'M50 70 V120'],
    Z: ['M18 20 H82 L18 120 H82'],
    a: ['M70 88 C70 56 22 56 22 90 C22 124 70 124 70 90', 'M70 58 V120'],
    b: ['M25 20 V120', 'M25 74 C58 42 80 72 78 92 C74 126 34 132 25 106'],
    c: ['M76 70 C56 46 20 58 20 90 C20 126 56 130 76 108'],
    d: ['M72 90 C72 56 22 56 22 90 C22 124 72 124 72 90', 'M72 20 V120'],
    e: ['M22 90 H78 C78 54 22 54 22 90 C22 126 60 130 78 108'],
    f: ['M72 28 C50 8 38 24 38 52 V120', 'M20 60 H62'],
    g: ['M72 90 C72 56 22 56 22 90 C22 124 72 124 72 90', 'M72 58 V135 C72 166 36 162 25 146'],
    h: ['M25 20 V120', 'M25 82 C30 54 75 54 75 86 V120'],
    i: ['M50 58 V120', 'M50 34 L50 38'],
    j: ['M50 58 V140 C50 166 26 162 20 150', 'M50 34 L50 38'],
    k: ['M25 20 V120', 'M72 58 L25 96', 'M42 85 L76 120'],
    l: ['M50 20 V120'],
    m: ['M15 58 V120', 'M15 82 C20 54 50 54 50 86 V120', 'M50 82 C55 54 85 54 85 86 V120'],
    n: ['M25 58 V120', 'M25 82 C30 54 75 54 75 86 V120'],
    o: ['M50 58 C8 58 8 120 50 120 C92 120 92 58 50 58'],
    p: ['M25 58 V162', 'M25 80 C30 54 78 54 78 90 C78 126 34 130 25 106'],
    q: ['M75 58 V162', 'M75 90 C75 56 22 56 22 90 C22 124 75 124 75 90'],
    r: ['M28 58 V120', 'M28 86 C32 62 55 55 72 62'],
    s: ['M72 68 C62 50 28 54 30 78 C32 98 70 90 70 108 C70 130 35 128 25 108'],
    t: ['M45 30 V104 C45 120 60 122 72 115', 'M25 58 H68'],
    u: ['M25 58 V94 C25 132 75 132 75 94', 'M75 58 V120'],
    v: ['M20 58 L50 120 L80 58'],
    w: ['M10 58 L30 120 L50 76 L70 120 L90 58'],
    x: ['M22 58 L78 120', 'M78 58 L22 120'],
    y: ['M22 58 L50 120', 'M78 58 L45 136 C38 150 28 156 20 150'],
    z: ['M22 58 H78 L22 120 H78'],
    '.': ['M50 114 L50 118'],
    ',': ['M50 114 C54 124 48 132 42 136'],
    '?': ['M30 42 C28 12 78 10 72 44 C68 62 50 62 50 84', 'M50 112 L50 116'],
    '!': ['M50 20 V86', 'M50 112 L50 116'],
    "'": ['M50 20 V44'],
    '/': ['M70 20 L30 120'],
    '-': ['M28 72 H72']
  };
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  /* ---------- sounds, speech, praise ---------- */
  const SOUND = {a: 'ah', b: 'buh', c: 'kuh', d: 'duh', e: 'eh', f: 'ffff', g: 'guh', h: 'huh', i: 'ih', j: 'juh', k: 'kuh', l: 'llll', m: 'mmmm',
    n: 'nnnn', o: 'aw', p: 'puh', q: 'kwuh', r: 'rrrr', s: 'ssss', t: 'tuh', u: 'uh', v: 'vvvv', w: 'wuh', x: 'ks', y: 'yuh', z: 'zzzz'};
  const WORD = {a: 'apple', b: 'ball', c: 'cat', d: 'dog', e: 'egg', f: 'fan', g: 'goat', h: 'hat', i: 'ink', j: 'jug', k: 'kite', l: 'leg', m: 'moon',
    n: 'net', o: 'orange', p: 'pen', q: 'queen', r: 'rat', s: 'sun', t: 'top', u: 'umbrella', v: 'van', w: 'watch', x: 'x-ray', y: 'yo-yo', z: 'zip'};
  const PRAISE = ['Excellent! ⭐', 'Well done! 🌟', 'Great job! 🎉', 'Super! You got it! 👏', 'Fantastic! 🌈', 'Perfect! ✨'];
  const TRYAGAIN = ['Oops, that is not it. Try again, you can do it! 💪', 'Nice try! Have another go. 🙂', 'Not this one. Look again and try once more! 🔍', 'Good try! You are learning. Try again! 🌱'];
  const pick = a => a[rnd(a.length)];
  function speak(text, rate) {
    try {
      if (!('speechSynthesis' in window)) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = rate || 0.85; u.pitch = 1.15;
      speechSynthesis.speak(u);
    } catch (e) { /* speech is optional */ }
  }
  let actx = null;
  function tone(freqs, dur) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      let t = actx.currentTime;
      freqs.forEach(f => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.18, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + dur + 0.02); t += dur * 0.8;
      });
    } catch (e) { /* audio is optional */ }
  }
  const sndOk = () => tone([660, 880, 1175], 0.16);
  const sndNo = () => tone([330, 262], 0.2);
  const sndPop = () => tone([990], 0.08);

  function say(box, text, kind) {
    if (!box) return;
    box.textContent = text;
    box.className = 'c1a-msg' + (kind ? ' ' + kind : '');
  }
  function confetti(host) {
    const f = ['⭐', '🎉', '✨', '🌟', '🎈', '🌈'];
    for (let i = 0; i < 16; i++) {
      const s = h('span', 'c1a-conf', f[rnd(f.length)], host);
      s.style.left = (10 + rnd(80)) + '%';
      s.style.setProperty('--dx', (rnd(120) - 60) + 'px');
      s.style.animationDelay = (rnd(250)) + 'ms';
      setTimeout(() => s.remove(), 1700);
    }
  }
  function flyTo(fromEl, toEl, text, cb) {
    const a = fromEl.getBoundingClientRect(), b = toEl.getBoundingClientRect();
    const ax = a.left + a.width / 2, ay = a.top + a.height / 2;
    const dx = (b.left + b.width / 2) - ax, dy = (b.top + b.height / 2) - ay;
    const fl = h('div', 'c1a-fly', text, document.body);
    fl.style.left = ax + 'px'; fl.style.top = ay + 'px';
    requestAnimationFrame(() => requestAnimationFrame(() => { fl.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.85)`; }));
    setTimeout(() => { fl.remove(); if (cb) cb(); }, 700);
  }

  /* ---------- styles ---------- */
  function addCss() {
    if (document.getElementById('c1a-css')) return;
    const s = document.createElement('style'); s.id = 'c1a-css';
    s.textContent = `
.c1a-card{position:relative;margin:.9rem 0;padding:.9rem 1rem 1rem;border:3px dashed #38bdf8;border-radius:20px;background:linear-gradient(180deg,#f0f9ff,#fffdf5);font-family:"Comic Sans MS","Segoe UI",system-ui,sans-serif;overflow:hidden}
.c1a-h{font-weight:900;font-size:1.05rem;color:#0c4a6e;margin-bottom:.15rem}
.c1a-help{margin:.1rem 0 .6rem;color:#475569;font-size:.92rem;line-height:1.5}
.c1a-msg{min-height:1.9rem;margin:.55rem 0 .1rem;font-weight:800;font-size:1.02rem;color:#334155}
.c1a-msg.ok{color:#15803d;animation:c1a-pop .4s}
.c1a-msg.no{color:#b45309}
.c1a-tools{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:.4rem}
.c1a-btn{border:2px solid #0ea5e9;background:#fff;color:#0369a1;border-radius:999px;padding:.38rem .85rem;font:inherit;font-weight:800;font-size:.9rem;cursor:pointer}
.c1a-btn:hover{background:#e0f2fe}
.c1a-svg{display:block;width:100%;height:auto;max-width:900px;margin:0 auto;background:#fffef7;border-radius:14px;border:2px solid #fde68a;touch-action:none;user-select:none;-webkit-user-select:none}
.c1a-dot{fill:#22c55e;stroke:#fff;stroke-width:3;animation:c1a-blink 0.9s ease-in-out infinite;transform-box:fill-box;transform-origin:center;cursor:pointer}
.c1a-dot.next{fill:#f97316}
@keyframes c1a-blink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(1.5)}}
@keyframes c1a-pop{0%{transform:scale(.7)}60%{transform:scale(1.15)}100%{transform:scale(1)}}
@keyframes c1a-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-7px)}40%{transform:translateX(7px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
.c1a-cellbg{fill:#fff;stroke:#e2e8f0;stroke-width:1.5}
.c1a-cellbg.active{fill:#fef9c3;stroke:#facc15;stroke-width:3}
.c1a-guide{fill:none;stroke:#94a3b8;stroke-linecap:round;stroke-linejoin:round;stroke-width:5;stroke-dasharray:.1 11}
.c1a-ink{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:8;transition:stroke-dashoffset .09s linear}
.c1a-pencil{pointer-events:none;filter:drop-shadow(0 3px 2px rgba(0,0,0,.25))}
.c1a-ok-tick{font-size:30px}
.c1a-five{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:.5rem;margin:.4rem 0}
.c1a-five label{display:flex;align-items:center;gap:.35rem;background:#fff;border:2px solid #cbd5e1;border-radius:14px;padding:.25rem .5rem;font-weight:900;color:#0369a1}
.c1a-five label.ok{border-color:#22c55e;background:#f0fdf4}
.c1a-five input{flex:1;min-width:0;border:0;outline:0;font:inherit;font-size:1.05rem;font-weight:700;color:#0f172a;background:transparent}
.c1a-chips{display:flex;flex-wrap:wrap;gap:.4rem;margin:.4rem 0}
.c1a-chip{border:2px solid #bae6fd;background:#fff;border-radius:999px;padding:.25rem .7rem;font:inherit;font-weight:800;color:#0369a1;cursor:pointer}
.c1a-chip.used{opacity:.4;pointer-events:none}
.c1a-row{display:flex;align-items:center;justify-content:center;gap:.8rem;margin:.3rem 0 .8rem;font-weight:900}
.c1a-fixed,.c1a-box{width:4.6rem;height:4.6rem;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:2.8rem;font-weight:900}
.c1a-fixed{background:#e0f2fe;color:#0369a1;border:3px solid #7dd3fc}
.c1a-box{background:#fff;border:3px dashed #f472b6;color:#be185d}
.c1a-box.full{border-style:solid;border-color:#22c55e;background:#f0fdf4;color:#15803d;animation:c1a-pop .5s}
.c1a-opts{display:flex;justify-content:center;gap:.9rem;flex-wrap:wrap}
.c1a-opt{width:4.4rem;height:4.4rem;border-radius:50%;border:4px solid #fbbf24;background:#fffbeb;color:#92400e;font:inherit;font-size:2.2rem;font-weight:900;cursor:pointer;transition:transform .12s}
.c1a-opt:hover{transform:scale(1.1)}
.c1a-opt.wrong{animation:c1a-shake .45s;border-color:#f87171;background:#fee2e2;color:#b91c1c;opacity:.55;pointer-events:none}
.c1a-opt.right{border-color:#22c55e;background:#dcfce7;color:#15803d}
.c1a-opt:disabled{cursor:default}
.c1a-fly{position:fixed;z-index:99999;transform:translate(-50%,-50%);transition:transform .65s cubic-bezier(.2,.9,.25,1);font:900 2.6rem "Comic Sans MS",system-ui,sans-serif;color:#15803d;pointer-events:none;text-shadow:0 2px 6px rgba(0,0,0,.25)}
.c1a-conf{position:absolute;top:60%;font-size:1.5rem;pointer-events:none;animation:c1a-up 1.4s ease-out forwards}
@keyframes c1a-up{0%{transform:translate(0,0) scale(.6);opacity:1}100%{transform:translate(var(--dx),-170px) scale(1.3) rotate(25deg);opacity:0}}
.c1a-stars{display:flex;justify-content:center;flex-wrap:wrap;gap:.45rem;margin:.4rem 0 .6rem}
.c1a-star{width:78px;height:78px;overflow:visible}
.c1a-star polygon{fill:#fff;stroke:#f59e0b;stroke-width:4;stroke-linejoin:round;stroke-dasharray:8 6}
.c1a-star.cur polygon{animation:c1a-pulse 1s ease-in-out infinite}
.c1a-star.done polygon{fill:#fde047;stroke-dasharray:none}
.c1a-star text{font:900 38px "Comic Sans MS",system-ui,sans-serif;fill:#78350f;text-anchor:middle}
@keyframes c1a-pulse{50%{stroke:#ec4899;stroke-width:7}}
.c1a-listen{font-size:1.1rem;padding:.6rem 1.3rem;background:#fde68a;border-color:#f59e0b;color:#78350f}
.c1a-center{text-align:center}
.c1a-rtl{direction:rtl;text-align:right}
`;
    document.head.appendChild(s);
  }

  /* ---------- tracer engine: press the blinking dot, hold, drag through the dots that appear ---------- */
  const STEP = 12;            // glyph units between dots
  function startOf(d) { const m = /^M\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/.exec(d); return {x: +m[1], y: +m[2]}; }

  function Tracer(svg, items, o) {
    this.svg = svg; this.items = items; this.o = o || {};
    this.i = 0; this.s = 0; this.w = 0; this.pressing = false; this.ready = false; this.finished = false;
    this.marker = null;
    const self = this;
    svg.addEventListener('pointerdown', e => self.down(e));
    svg.addEventListener('pointermove', e => self.move(e));
    ['pointerup', 'pointercancel'].forEach(t => svg.addEventListener(t, e => self.up(e)));
  }
  Tracer.prototype.prep = function () {
    if (this.ready) return;
    this.items.forEach(it => it.strokes.forEach(st => {
      st.len = st.guide.getTotalLength();
      st.n = Math.max(2, Math.ceil(st.len / (this.o.step || STEP)));
      st.pts = [];
      for (let k = 0; k <= st.n; k++) { const p = st.guide.getPointAtLength(st.len * k / st.n); st.pts.push({x: p.x, y: p.y}); }
      st.ink.style.strokeDasharray = st.len + ' ' + (st.len + 2);
      st.ink.style.strokeDashoffset = st.len + 1;
    }));
    this.ready = true;
  };
  Tracer.prototype.cur = function () { const it = this.items[this.i]; return it ? {it: it, st: it.strokes[this.s]} : null; };
  Tracer.prototype.showMarker = function () {
    if (this.marker) { this.marker.remove(); this.marker = null; }
    if (this.finished) return;
    this.prep();
    const c = this.cur(); if (!c) return;
    const p = c.st.pts[this.pressing ? Math.min(this.w + 1, c.st.n) : 0];
    this.marker = el('circle', {cx: p.x, cy: p.y, r: this.o.markR || 8, class: 'c1a-dot' + (this.pressing ? ' next' : '')}, c.it.mg || c.it.g);
    this.marker.style.pointerEvents = 'none';
  };
  Tracer.prototype.local = function (e, g) {
    const m = g.getScreenCTM(); if (!m) return null;
    const pt = this.svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(m.inverse());
  };
  Tracer.prototype.down = function (e) {
    if (this.finished) return;
    this.prep();
    const c = this.cur(); if (!c) return;
    const p = this.local(e, c.it.g); if (!p) return;
    const s0 = c.st.pts[0];
    if (Math.hypot(p.x - s0.x, p.y - s0.y) > (this.o.start || 30)) { if (this.o.onMiss) this.o.onMiss('start'); return; }
    e.preventDefault();
    this.pressing = true; this.w = 0;
    try { this.svg.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ }
    sndPop(); this.showMarker();
    if (this.o.onPress) this.o.onPress(c.it);
  };
  Tracer.prototype.move = function (e) {
    if (!this.pressing) return;
    const c = this.cur(); if (!c) return;
    const p = this.local(e, c.it.g); if (!p) return;
    let adv = this.w;
    for (let k = Math.min(c.st.n, this.w + 3); k > this.w; k--) {
      const q = c.st.pts[k];
      if (Math.hypot(p.x - q.x, p.y - q.y) < (this.o.hit || 21)) { adv = k; break; }
    }
    if (adv === this.w) return;
    this.w = adv;
    c.st.ink.style.strokeDashoffset = (c.st.len * (1 - this.w / c.st.n)) + 1;
    if (this.w >= c.st.n) { this.pressing = false; this.strokeDone(); } else this.showMarker();
  };
  Tracer.prototype.up = function () {
    if (!this.pressing) return;
    this.pressing = false;
    const c = this.cur();
    if (c) { c.st.ink.style.strokeDashoffset = c.st.len + 1; }
    this.w = 0; this.showMarker();
    if (this.o.onLift) this.o.onLift();
  };
  Tracer.prototype.strokeDone = function () {
    const c = this.cur();
    c.st.ink.style.strokeDashoffset = 0; sndPop();
    this.s++; this.w = 0;
    if (this.s >= c.it.strokes.length) {
      this.s = 0;
      if (c.it.cell) c.it.cell.classList.remove('active');
      c.it.done = true;
      this.i++;
      if (this.o.onItem) this.o.onItem(c.it, this.i >= this.items.length);
      if (this.i >= this.items.length) { this.finished = true; if (this.marker) { this.marker.remove(); this.marker = null; } if (this.o.onAll) this.o.onAll(); return; }
      const nx = this.items[this.i]; if (nx.cell) nx.cell.classList.add('active');
    }
    this.showMarker();
  };
  Tracer.prototype.reset = function () {
    this.i = 0; this.s = 0; this.w = 0; this.pressing = false; this.finished = false;
    this.items.forEach(it => { it.done = false; if (it.cell) it.cell.classList.remove('active'); it.strokes.forEach(st => { if (st.len) st.ink.style.strokeDashoffset = st.len + 1; }); });
    if (this.items[0] && this.items[0].cell) this.items[0].cell.classList.add('active');
    this.showMarker();
  };

  /* builds the <g> for one glyph inside parent; returns {g, strokes[]} */
  function buildGlyph(parent, ch, x, y, sc, opt) {
    const g = el('g', {transform: `translate(${x},${y}) scale(${sc})`}, parent);
    const strokes = (G[ch] || []).map(d => {
      const guide = el('path', {d: d, class: opt && opt.guide ? 'c1a-guide' : ''}, g);
      if (!(opt && opt.guide)) { guide.setAttribute('fill', 'none'); guide.setAttribute('stroke', 'none'); }
      const ink = el('path', {d: d, class: 'c1a-ink', stroke: (opt && opt.colour) || '#ec4899'}, g);
      ink.style.strokeDasharray = '0 100000';   // nothing drawn until traced
      return {d: d, guide: guide, ink: ink};
    });
    return {g: g, strokes: strokes, ch: ch};
  }
  function ruledLines(svg, x1, x2, y, sc) {
    [[20, '#bfdbfe', '5 5'], [55, '#bfdbfe', '5 5'], [120, '#fca5a5', ''], [160, '#bfdbfe', '5 5']].forEach(l => {
      el('line', {x1: x1, x2: x2, y1: y + l[0] * sc, y2: y + l[0] * sc, stroke: l[1], 'stroke-width': 1.4, 'stroke-dasharray': l[2]}, svg);
    });
  }
  function newSvg(w, hgt, label) {
    const svg = el('svg', {viewBox: `0 0 ${w} ${hgt}`, class: 'c1a-svg', role: 'img', 'aria-label': label});
    svg.dataset.c1 = '1'; svg.dataset.sbt = '1';   // keep the generic figure skins off our widget
    return svg;
  }
  function bookToggle(card, fig) {
    if (!fig) return;
    const b = h('button', 'c1a-btn', '📖 Book picture', null);
    b.type = 'button';
    b.addEventListener('click', () => { const hid = fig.style.display === 'none'; fig.style.display = hid ? '' : 'none'; b.textContent = hid ? '🙈 Hide book picture' : '📖 Book picture'; });
    card.querySelector('.c1a-tools').appendChild(b);
  }
  function shell(title, help) {
    const card = h('div', 'c1a-card');
    card.dataset.c1a = 'w';
    h('div', 'c1a-h', title, card);
    h('p', 'c1a-help', help, card);
    return card;
  }

  /* ---------- pencil held by fingers (tip at 0,0) ---------- */
  function makePencil() {
    const g = el('g', {class: 'c1a-pencil'});
    const i = el('g', {transform: 'scale(1.35) rotate(28)'}, g);
    el('path', {d: 'M0 0 L-5 -15 L5 -15 Z', fill: '#f3d9b1'}, i);
    el('path', {d: 'M0 0 L-1.7 -4.8 L1.7 -4.8 Z', fill: '#334155'}, i);
    el('rect', {x: -5, y: -62, width: 10, height: 47, fill: '#fbbf24'}, i);
    el('rect', {x: -5, y: -62, width: 3, height: 47, fill: '#f59e0b'}, i);
    el('rect', {x: -5, y: -68, width: 10, height: 6, fill: '#94a3b8'}, i);
    el('rect', {x: -5, y: -76, width: 10, height: 8, rx: 3, fill: '#f472b6'}, i);
    el('ellipse', {cx: 3, cy: -56, rx: 13, ry: 11, fill: '#f7c59f', stroke: '#d89b6c', 'stroke-width': .8}, i);
    el('ellipse', {cx: -6, cy: -27, rx: 5.5, ry: 12, transform: 'rotate(18 -6 -27)', fill: '#f7c59f', stroke: '#d89b6c', 'stroke-width': .8}, i);
    el('ellipse', {cx: 6.5, cy: -36, rx: 5.5, ry: 14, transform: 'rotate(-18 6.5 -36)', fill: '#fbd3b0', stroke: '#d89b6c', 'stroke-width': .8}, i);
    return g;
  }

  /* ===================== Q5: a pencil in fingers draws the letter ===================== */
  function buildQ5(fig) {
    const card = shell('✏️ Watch and trace', 'Tap the blinking dot of a letter. A hand with a pencil will write it over the dots. Tap again to watch it once more.');
    const S = 0.8, CW = 100 * S, CH = 172 * S, PAIRS = 5, GAP = 16;
    const rows = [['A', 'B', 'C', 'D', 'E'], ['F', 'G', 'H', 'I', 'J'], ['K', 'L', 'M', 'N', 'O'], ['P', 'Q', 'R', 'S', 'T'], ['U', 'V', 'W', 'X', 'Y'], ['Z']];
    const W = PAIRS * (2 * CW + GAP) + 10, H = rows.length * (CH + 8) + 8;
    const svg = newSvg(W, H, 'Tap a letter to watch it being written'); card.appendChild(svg);
    svg.setAttribute('viewBox', `0 -62 ${W} ${H + 62}`);   // head-room so the hand is never cut off at the top row
    svg.style.overflow = 'visible';
    const msg = h('div', 'c1a-msg', '👆 Tap the blinking dot to begin.', card);
    h('div', 'c1a-tools', '', card);
    const infos = []; let doneCount = 0;
    rows.forEach((row, ri) => {
      const y0 = 4 + ri * (CH + 8);
      ruledLines(svg, 4, W - 4, y0, S);
      row.forEach((up, ci) => {
        [up, up.toLowerCase()].forEach((ch, k) => {
          const x0 = 8 + ci * (2 * CW + GAP) + k * CW;
          const info = buildGlyph(svg, ch, x0, y0, S, {guide: true, colour: k ? '#0ea5e9' : '#ec4899'});
          info.done = false;
          const st = startOf(info.strokes[0].d);
          const dot = el('circle', {cx: st.x, cy: st.y, r: 8, class: 'c1a-dot'}, info.g);
          const hit = el('rect', {x: 0, y: 0, width: 100, height: 172, fill: 'transparent', style: 'cursor:pointer'}, info.g);
          hit.addEventListener('click', () => play(info, dot));
          infos.push(info);
        });
      });
    });
    function play(info, dot) {
      if (info.anim) return;
      info.strokes.forEach(s => { s.len = s.len || s.guide.getTotalLength(); s.ink.style.transition = 'none'; s.ink.style.strokeDasharray = s.len + ' ' + (s.len + 2); s.ink.style.strokeDashoffset = s.len + 1; });
      dot.style.display = 'none';
      const pen = makePencil(); info.g.appendChild(pen);
      speak(info.ch);
      let si = 0, covered = 0, last = null, pause = 0;
      info.anim = true;
      function frame(ts) {
        if (!svg.isConnected) { info.anim = false; return; }
        if (last == null) last = ts;
        const dt = Math.min(0.05, (ts - last) / 1000); last = ts;
        const st = info.strokes[si];
        if (pause > 0) { pause -= dt; requestAnimationFrame(frame); return; }
        covered = Math.min(st.len, covered + 150 * dt);
        st.ink.style.strokeDashoffset = (st.len - covered) + 1;
        const p = st.guide.getPointAtLength(covered);
        pen.setAttribute('transform', `translate(${p.x},${p.y})`);
        if (covered >= st.len) {
          si++; covered = 0; pause = 0.22;
          if (si >= info.strokes.length) {
            pen.remove(); info.anim = false;
            if (!info.done) { info.done = true; doneCount++; }
            const mk = el('text', {x: 88, y: 24, 'text-anchor': 'middle', class: 'c1a-ok-tick'}, info.g); mk.textContent = '✔️'; mk.setAttribute('font-size', '26');
            sndOk(); say(msg, `${pick(PRAISE)}  That was “${info.ch}”.`, 'ok');
            if (doneCount >= infos.length) { say(msg, '🏆 You watched all 52 letters! Brilliant!', 'ok'); confetti(card); }
            return;
          }
        }
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    return {card: card, extra: fig};
  }

  /* ===================== Q6: hold + drag from dot to dot, A to Z ===================== */
  function buildQ6(fig) {
    const card = shell('🖱️ Write A to Z, dot by dot', 'Press the blinking dot and keep holding the mouse (or your finger). The next dot will appear. Drag to it, and so on. Let go and the letter starts again.');
    const S = 0.85, CW = 100 * S, CH = 142 * S, PER = 7;
    const W = PER * CW + 20, H = 4 * (CH + 10) + 14;
    const svg = newSvg(W, H, 'Write the capital letters A to Z by following the dots'); card.appendChild(svg);
    const msg = h('div', 'c1a-msg', '', card);
    const tools = h('div', 'c1a-tools', '', card);
    const items = [];
    LETTERS.forEach((ch, n) => {
      const x0 = 10 + (n % PER) * CW, y0 = 8 + Math.floor(n / PER) * (CH + 10);
      const bg = el('rect', {x: x0 + 3, y: y0, width: CW - 6, height: CH, rx: 10, class: 'c1a-cellbg'}, svg);
      el('line', {x1: x0 + 6, x2: x0 + CW - 6, y1: y0 + 20 * S, y2: y0 + 20 * S, stroke: '#bfdbfe', 'stroke-dasharray': '4 4'}, svg);
      el('line', {x1: x0 + 6, x2: x0 + CW - 6, y1: y0 + 120 * S, y2: y0 + 120 * S, stroke: '#fca5a5'}, svg);
      const info = buildGlyph(svg, ch, x0, y0, S, {guide: false, colour: '#7c3aed'});
      info.cell = bg; info.hint = null;
      items.push(info);
    });
    let showHint = false;
    const hintBtn = h('button', 'c1a-btn', '💡 Show dotted letters', tools); hintBtn.type = 'button';
    hintBtn.addEventListener('click', () => {
      showHint = !showHint; hintBtn.textContent = showHint ? '🙈 Hide dotted letters' : '💡 Show dotted letters';
      items.forEach(it => it.strokes.forEach(s => { if (showHint) s.guide.setAttribute('class', 'c1a-guide'); else s.guide.removeAttribute('class'); }));
    });
    const again = h('button', 'c1a-btn', '🔄 Start again', tools); again.type = 'button';
    const tr = new Tracer(svg, items, {
      onMiss: () => say(msg, '👉 Press on the blinking dot first, then drag.', 'no'),
      onPress: () => say(msg, 'Keep holding… drag to the next dot! 🟠'),
      onLift: () => say(msg, 'You let go too early. Press the blinking dot and try again. 🙂', 'no'),
      onItem: (it, last) => { if (!last) { sndOk(); say(msg, `${pick(PRAISE)}  “${it.ch}” done. Now write “${LETTERS[LETTERS.indexOf(it.ch) + 1]}”.`, 'ok'); speak(it.ch); } },
      onAll: () => { sndOk(); say(msg, '🏆 You wrote all 26 capital letters from A to Z!', 'ok'); speak('You wrote all the capital letters. Well done!'); confetti(card); }
    });
    again.addEventListener('click', () => { tr.reset(); say(msg, 'Write “A”. Press the blinking dot at the bottom-left and hold.'); });
    say(msg, 'Write “A”. Press the blinking dot at the bottom-left and hold.');
    items[0].cell.classList.add('active');
    // the blinking start dot needs rendered geometry: show it as soon as the widget is visible
    const iv = setInterval(() => {
      if (!svg.isConnected) { clearInterval(iv); return; }
      if (svg.getBoundingClientRect().width > 0) { clearInterval(iv); try { tr.showMarker(); } catch (e) { /* retry on first press */ } }
    }, 250);
    return {card: card, extra: fig};
  }

  /* ===================== Q12: drag along dotted words, dots turn solid ===================== */
  function buildQ12(fig) {
    const card = shell('✍️ Trace the words', 'Press the blinking dot at the start of the first letter and drag along the dots. As you go, the dotted letter becomes a solid one!');
    const WORDS = ['sun', 'ant', 'pan', 'rat', 'jug', 'hen'];
    const S = 0.8, GW = 92 * S, CH = 172 * S, COLW = 3 * GW + 60;
    const W = 2 * COLW + 20, H = 3 * (CH + 8) + 12;
    const svg = newSvg(W, H, 'Trace the words sun, ant, pan, rat, jug, hen'); card.appendChild(svg);
    const msg = h('div', 'c1a-msg', '', card);
    const tools = h('div', 'c1a-tools', '', card);
    const items = [], wordEnd = {};
    WORDS.forEach((wd, n) => {
      const col = n % 2, row = Math.floor(n / 2), y0 = 6 + row * (CH + 8);
      if (col === 0) ruledLines(svg, 6, W - 6, y0, S);
      wd.split('').forEach((ch, k) => {
        const it = buildGlyph(svg, ch, 14 + col * COLW + 16 + k * GW, y0, S, {guide: true, colour: '#ec4899'});
        it.word = wd; items.push(it);
        if (k === wd.length - 1) wordEnd[items.length - 1] = wd;
      });
    });
    const again = h('button', 'c1a-btn', '🔄 Start again', tools); again.type = 'button';
    const tr = new Tracer(svg, items, {
      onMiss: () => say(msg, '👉 Press on the blinking dot first, then drag along the dots.', 'no'),
      onPress: () => say(msg, 'Good! Keep holding and follow the dots. 🟠'),
      onLift: () => say(msg, 'Oops, you let go. Press the blinking dot and try this letter again. 🙂', 'no'),
      onItem: (it, last) => {
        const idx = items.indexOf(it);
        if (wordEnd[idx] && !last) { sndOk(); say(msg, `${pick(PRAISE)}  You traced “${wordEnd[idx]}”!`, 'ok'); speak(wordEnd[idx]); }
        else if (!last) { sndPop(); }
      },
      onAll: () => { sndOk(); say(msg, '🏆 All six words traced! Great writing!', 'ok'); speak('All six words traced. Great writing!'); confetti(card); }
    });
    again.addEventListener('click', () => { tr.reset(); say(msg, 'Start with “s” of “sun”.'); });
    say(msg, 'Start with the “s” of “sun”. Press its blinking dot and hold.');
    const iv = setInterval(() => {
      if (!svg.isConnected) { clearInterval(iv); return; }
      if (svg.getBoundingClientRect().width > 0) { clearInterval(iv); try { tr.showMarker(); } catch (e) { /* retry on first press */ } }
    }, 250);
    return {card: card, extra: fig};
  }

  /* ===================== Q7-10: before / after, three choices ===================== */
  function buildBA(fig, before, ch) {
    const code = ch.charCodeAt(0), ans = String.fromCharCode(before ? code - 1 : code + 1);
    const card = shell(before ? '🔤 Which letter comes BEFORE ' + ch + '?' : '🔤 Which letter comes AFTER ' + ch + '?', 'Tap the correct letter. It will jump into the empty box!');
    const row = h('div', 'c1a-row', '', card);
    const box = h('div', 'c1a-box', '?', null), fixed = h('div', 'c1a-fixed', ch, null);
    if (before) { row.appendChild(box); row.appendChild(fixed); } else { row.appendChild(fixed); row.appendChild(box); }
    const opts = h('div', 'c1a-opts', '', card);
    const msg = h('div', 'c1a-msg c1a-center', 'Pick one of the three letters.', card);
    const tools = h('div', 'c1a-tools', '', card);
    let solved = false;
    function deal() {
      solved = false; box.textContent = '?'; box.className = 'c1a-box'; opts.innerHTML = '';
      const pool = LETTERS.filter(l => l !== ans && l !== ch);
      const set = shuffle([ans, shuffle(pool)[0], shuffle(pool)[1]]);
      set.forEach(l => {
        const b = h('button', 'c1a-opt', l, opts); b.type = 'button';
        b.addEventListener('click', () => {
          if (solved) return;
          if (l === ans) {
            solved = true;
            Array.from(opts.children).forEach(x => { if (x !== b) x.disabled = true; });
            b.classList.add('right'); sndOk();
            flyTo(b, box, l, () => { box.textContent = l; box.classList.add('full'); confetti(card); });
            const sentence = before ? `${l} comes before ${ch}.` : `${l} comes after ${ch}.`;
            say(msg, `${pick(PRAISE)}  ${sentence}`, 'ok'); speak('Well done! ' + sentence);
            again.style.display = '';
          } else {
            b.classList.add('wrong'); sndNo();
            say(msg, pick(TRYAGAIN), 'no'); speak('Oops. Try again.');
          }
        });
      });
    }
    const again = h('button', 'c1a-btn', '🔄 Play again', tools); again.type = 'button'; again.style.display = 'none';
    again.addEventListener('click', () => { again.style.display = 'none'; say(msg, 'Pick one of the three letters.'); deal(); });
    deal();
    return {card: card, extra: null};
  }

  /* ===================== Q11: hear the sound, choose the letter, it flies into the star ===================== */
  function buildQ11(fig) {
    const card = shell('🔊 Listen and write the letter', 'Press the big button to hear a sound. Tap the letter that makes that sound. It will fly into the star!');
    const stars = h('div', 'c1a-stars', '', card);
    const listen = h('div', 'c1a-center', '', card);
    const lb = h('button', 'c1a-btn c1a-listen', '🔊 Listen to the sound', listen); lb.type = 'button';
    const hintBtn = h('button', 'c1a-btn', '💡 Hint', listen); hintBtn.type = 'button'; hintBtn.style.marginLeft = '.5rem';
    const opts = h('div', 'c1a-opts', '', card); opts.style.marginTop = '.8rem';
    const msg = h('div', 'c1a-msg c1a-center', '', card);
    const tools = h('div', 'c1a-tools', '', card);
    const again = h('button', 'c1a-btn', '🔄 New sounds', tools); again.type = 'button';
    const POLY = '50,6 62,36 94,38 69,58 78,90 50,72 22,90 31,58 6,38 38,36';
    let seq = [], idx = 0, wrongs = 0, starEls = [];
    function sound() { return seq[idx]; }
    function playSound() { const l = sound(); if (l) speak(SOUND[l] + '. ' + SOUND[l], 0.7); }
    function newGame() {
      seq = shuffle('abcdefghijklmnopqrstuvwxyz'.split('')).slice(0, 6); idx = 0; wrongs = 0;
      stars.innerHTML = ''; starEls = [];
      for (let k = 0; k < 6; k++) {
        const s = el('svg', {viewBox: '0 0 100 100', class: 'c1a-star'}); s.dataset.c1 = '1'; s.dataset.sbt = '1';
        el('polygon', {points: POLY}, s); const t = el('text', {x: 50, y: 64}, s);
        stars.appendChild(s); starEls.push({s: s, t: t});
      }
      round();
    }
    function round() {
      wrongs = 0; opts.innerHTML = '';
      starEls.forEach((x, k) => x.s.classList.toggle('cur', k === idx));
      if (idx >= 6) {
        say(msg, '🏆 You wrote all six letters! Wonderful listening!', 'ok'); speak('You wrote all six letters. Wonderful listening!'); confetti(card); return;
      }
      const l = sound();
      const pool = shuffle('abcdefghijklmnopqrstuvwxyz'.split('').filter(x => x !== l));
      shuffle([l, pool[0], pool[1], pool[2]]).forEach(c => {
        const b = h('button', 'c1a-opt', c, opts); b.type = 'button';
        b.addEventListener('click', () => {
          if (c === l) {
            Array.from(opts.children).forEach(x => { if (x !== b) x.disabled = true; });
            b.classList.add('right'); sndOk();
            const star = starEls[idx];
            flyTo(b, star.s, c, () => { star.t.textContent = c; star.s.classList.remove('cur'); star.s.classList.add('done'); });
            say(msg, `${pick(PRAISE)}  “${c}” says ${SOUND[c]}, as in ${WORD[c]}.`, 'ok'); speak(`Well done! ${c}, as in ${WORD[c]}.`);
            idx++; setTimeout(() => { round(); if (idx < 6) setTimeout(playSound, 700); }, 1900);
          } else {
            b.classList.add('wrong'); sndNo(); wrongs++;
            say(msg, pick(TRYAGAIN) + (wrongs >= 2 ? `  Hint: it starts “${WORD[l]}”.` : ''), 'no');
            setTimeout(playSound, 700);
          }
        });
      });
      say(msg, 'Which letter makes this sound?');
    }
    lb.addEventListener('click', playSound);
    hintBtn.addEventListener('click', () => { if (sound()) { say(msg, `💡 Hint: it is the first sound of “${WORD[sound()]}”.`); speak(WORD[sound()]); } });
    again.addEventListener('click', () => { newGame(); setTimeout(playSound, 400); });
    newGame();
    return {card: card, extra: fig};
  }

  /* ===================== Getting Started: name five objects ===================== */
  function buildFive() {
    const card = shell('🖐️ Name five objects around you', 'Look around the room. Type the name of one object in each box, or tap an idea below. You need five different objects.');
    const grid = h('div', 'c1a-five', '', card);
    const inputs = [];
    for (let k = 1; k <= 5; k++) {
      const lab = h('label', '', '<span>' + k + '.</span>', grid);
      const inp = h('input', '', null, lab); inp.type = 'text'; inp.maxLength = 20; inp.placeholder = 'object ' + k; inp.autocomplete = 'off';
      inp.setAttribute('aria-label', 'Object ' + k);
      inputs.push(inp);
    }
    const chips = h('div', 'c1a-chips', '', card);
    const msg = h('div', 'c1a-msg', 'Type or tap to name five objects. 0 of 5 so far.', card);
    const tools = h('div', 'c1a-tools', '', card);
    const valid = v => /^[A-Za-z][A-Za-z ]{1,19}$/.test(v.trim());
    let lastWords = [];
    function check(spoken) {
      const words = inputs.map(i => i.value.trim().toLowerCase());
      let n = 0; const seen = {}; let dup = false;
      inputs.forEach((inp, k) => {
        const w = words[k]; const ok = valid(w) && !seen[w];
        if (valid(w) && seen[w]) dup = true;
        if (valid(w)) seen[w] = true;
        inp.parentNode.classList.toggle('ok', ok); if (ok) n++;
      });
      Array.from(chips.children).forEach(c => c.classList.toggle('used', !!seen[c.dataset.w]));
      if (n >= 5) {
        if (lastWords.join() !== words.join()) { sndOk(); confetti(card); speak('Great job! You named five objects.'); }
        say(msg, '🎉 Great job! You named five objects: ' + words.join(', ') + '.', 'ok');
      } else say(msg, dup ? 'You wrote that one already. Try a different object! 🙂' : `${n} of 5 objects named.` + (n ? ' Keep going! 💪' : ''), dup ? 'no' : '');
      lastWords = words;
      if (spoken && valid(spoken)) speak(spoken);
    }
    inputs.forEach(i => { i.addEventListener('change', () => check(i.value)); i.addEventListener('input', () => check(null)); });
    ['book', 'pen', 'bag', 'desk', 'chair', 'door', 'window', 'clock', 'board', 'fan', 'cup', 'shoe'].forEach(w => {
      const c = h('button', 'c1a-chip', w, chips); c.type = 'button'; c.dataset.w = w;
      c.addEventListener('click', () => { const free = inputs.find(i => !i.value.trim()); if (!free) return; free.value = w; sndPop(); check(w); });
    });
    const ans = h('button', 'c1a-btn', '👀 Show an example answer', tools); ans.type = 'button';
    ans.addEventListener('click', () => { say(msg, 'Example answer: book, pen, bag, desk, chair. (Any five things you can see are right!)'); });
    const clr = h('button', 'c1a-btn', '🔄 Clear', tools); clr.type = 'button';
    clr.addEventListener('click', () => { inputs.forEach(i => { i.value = ''; }); lastWords = []; check(null); });
    return {card: card, extra: null};
  }

  /* ---------- finding the right places in the rendered book ---------- */
  const clean = node => { const c = node.cloneNode(true); c.querySelectorAll('button,.m6-tr,.c1-say,.sb-ans').forEach(n => n.remove()); return c.textContent.replace(/\s+/g, ' ').trim(); };
  const inUnit1 = node => {
    if (!node.closest('.c1-eng')) return false;
    const card = node.closest('.math-accordion-card');
    return !card || /^math-topic-c1-(?:[a-z]+-)?0-/.test(card.id);
  };
  function mount(res, anchor, hideFig) {
    anchor.after(res.card);
    if (hideFig) { hideFig.style.display = 'none'; bookToggle(res.card, hideFig); }
  }
  function scan() {
    addCss();
    document.querySelectorAll('.c1-eng .m6-q:not([data-c1a])').forEach(q => {
      if (!inUnit1(q)) return;
      const s = q.querySelector('.m6-s'); if (!s) return;
      const t = clean(s);
      let fig = q.nextElementSibling; if (fig && !fig.classList.contains('m6-fig')) fig = null;
      q.dataset.c1a = '1';
      const cap = fig && fig.querySelector('figcaption .m6-s') ? clean(fig.querySelector('figcaption .m6-s')) : '';
      let m;
      if (/^Trace and copy the capital and small letters/i.test(t) && fig) mount(buildQ5(fig), fig, fig);
      else if (/^Write capital letters in alphabetical order/i.test(t) && fig) mount(buildQ6(fig), fig, fig);
      else if (/^Trace and copy the given words/i.test(t) && fig) mount(buildQ12(fig), fig, fig);
      else if (/^Write the letters of the pronounced sounds/i.test(t) && fig) mount(buildQ11(fig), fig, fig);
      else if (fig && (m = /^_+\s+([A-Z])$/.exec(cap))) mount(buildBA(fig, true, m[1]), fig, fig);
      else if (fig && (m = /^([A-Z])\s+_+$/.exec(cap))) mount(buildBA(fig, false, m[1]), fig, fig);
      else q.removeAttribute('data-c1a');
    });
    document.querySelectorAll('.c1-eng .m6-s:not([data-c1a])').forEach(s => {
      if (s.closest('.m6-q') || s.closest('[data-c1a="w"]')) return;
      if (!/^Name any five objects in your surroundings/i.test(clean(s))) return;
      if (!inUnit1(s)) return;
      s.dataset.c1a = '1';
      const host = s.closest('.m6-box') || s.closest('.m6-ul') || s.parentElement;
      host.after(buildFive().card);
    });
  }
  const obs = new MutationObserver(() => { clearTimeout(scan.t); scan.t = setTimeout(scan, 60); });
  const start = () => { obs.observe(document.body, {childList: true, subtree: true}); scan(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.C1_ENG_ACTIVITIES = {scan: scan};
  // shared toolkit for js/cls1_eng_play.js (the rest of the English book)
  window.C1A = {G, LETTERS, SOUND, WORD, PRAISE, TRYAGAIN, pick, rnd, shuffle, el, h, speak, tone, sndOk, sndNo, sndPop, say, confetti, flyTo,
    addCss, Tracer, buildGlyph, ruledLines, newSvg, makePencil, shell, clean, startOf};
})();
