/* Book skin + interactivity for every class (was cls1_interactive.js).
 * Runs on every page rendered by the shared book readers (.m5/.m6/.m7/.m8-root, Classes 1-10) and gives
 * other subject views (Classes 11-12) a lighter version. After a lesson renders it:
 *  - groups each textbook page into a framed "sheet" coloured like the printed book (per subject theme),
 *    styles unit titles, section banners, instruction bars, Learning Outcomes and Let's Talk boxes;
 *  - makes pictures talk: tapping a picture says the nearest label (plus an animal sound word), with a bounce;
 *  - adds a 🔊 button to every sentence and heading (Web Speech API, Urdu/Pashto/Arabic voices when available);
 *  - adds a ✏️ Draw / Colour layer to every figure (pen colours, sizes, eraser, clear) for tracing,
 *    joining dots and colouring. Nothing in the book data changes. */
(function () {
  'use strict';
  const LIBS = {cls1: 'CLS1_BOOKS', cls2: 'CLS2_BOOKS', cls3: 'CLS3_BOOKS', cls4: 'CLS4_BOOKS', cls5: 'CLS5_BOOKS', cls6: 'CLS6_BOOKS', cls7: 'CLS7_BOOKS', cls8: 'CLS8_BOOKS', cls9: 'CLS9_BOOKS', cls10: 'CLS10_BOOKS', cls11: 'CLASS11_BOOKS', cls12: 'CLS12_BOOKS'};
  const bookUnits = () => { try { const lib = window[LIBS[state.selectedClass]] || {}; const B = lib[state.activeSubject]; return B && B.units; } catch (e) { return null; } };
  const PALETTE = [['#29a3d6', '#1d8cc7', '#f6c04f', '#e8457f', '#f2fbff'], ['#f08a24', '#e36b12', '#ffe08a', '#d6336c', '#fff8ef'], ['#1f9d6b', '#178257', '#d9f2c4', '#c2185b', '#f3fbf6'], ['#7c3aed', '#6d28d9', '#ede9fe', '#db2777', '#faf7ff'], ['#0891b2', '#0e7490', '#cffafe', '#e11d48', '#f0fdff'], ['#dc2626', '#b91c1c', '#fee2e2', '#9333ea', '#fff7f7']];
  const themeFor = subj => { if (THEMES[subj]) return THEMES[subj]; let h = 0; for (const ch of String(subj)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; const p = PALETTE[h % PALETTE.length]; return {frame: p[0], band: p[1], bar: p[2], pink: p[3], bg: p[4]}; };

  const THEMES = {
    eng: {frame: '#29a3d6', band: '#1d8cc7', bar: '#f6c04f', pink: '#e8457f', bg: '#f2fbff'},
    math: {frame: '#f08a24', band: '#e36b12', bar: '#ffe08a', pink: '#d6336c', bg: '#fff8ef'},
    isl: {frame: '#1f9d6b', band: '#178257', bar: '#d9f2c4', pink: '#c2185b', bg: '#f3fbf6'},
    nazira: {frame: '#e11d74', band: '#be185d', bar: '#fde2ea', pink: '#9d174d', bg: '#fff6fa'},
    pashto: {frame: '#5aa832', band: '#e0393e', bar: '#e7f6d5', pink: '#e0393e', bg: '#f8fdf2'},
    drawing: {frame: '#ec4899', band: '#db2777', bar: '#fce7f3', pink: '#be185d', bg: '#fff7fb'},
    sci: {frame: '#16a34a', band: '#15803d', bar: '#dcfce7', pink: '#db2777', bg: '#f4fdf6'},
    phys: {frame: '#2563eb', band: '#1d4ed8', bar: '#dbeafe', pink: '#db2777', bg: '#f5f8ff'},
    chem: {frame: '#9333ea', band: '#7e22ce', bar: '#f3e8ff', pink: '#db2777', bg: '#fbf7ff'},
    bio: {frame: '#059669', band: '#047857', bar: '#d1fae5', pink: '#be185d', bg: '#f2fdf8'},
    comp: {frame: '#0891b2', band: '#0e7490', bar: '#cffafe', pink: '#e11d48', bg: '#f0fdff'},
    urdu: {frame: '#0f766e', band: '#0f766e', bar: '#ccfbf1', pink: '#be185d', bg: '#f0fdfa'},
    gk: {frame: '#2563eb', band: '#1d4ed8', bar: '#dbeafe', pink: '#be185d', bg: '#f5f8ff'}
  };
  const SOUNDS = {cat: 'meow meow', kitten: 'meow', dog: 'woof woof', puppy: 'woof', hen: 'cluck cluck', chicken: 'cluck cluck', rooster: 'cock-a-doodle-doo', cow: 'moo', goat: 'baa', sheep: 'baa', lamb: 'baa', duck: 'quack quack', horse: 'neigh', donkey: 'hee-haw', bee: 'buzz buzz', lion: 'roar', tiger: 'roar', frog: 'ribbit', owl: 'hoot hoot', bird: 'tweet tweet', parrot: 'squawk', crow: 'caw caw', snake: 'hiss', mouse: 'squeak', camel: 'grunt', fish: 'blub blub', clock: 'tick tock', bell: 'ding dong', drum: 'boom boom', car: 'beep beep', bus: 'beep beep', train: 'choo choo', phone: 'ring ring'};

  const css = `
  .c1-skin{--c1f:#29a3d6;--c1b:#1d8cc7;--c1y:#f6c04f;--c1p:#e8457f;--c1bg:#f2fbff;font-family:'Segoe UI','Arial Rounded MT Bold',Arial,sans-serif;font-size:1.06rem}
  .c1-sheet{position:relative;margin:.6rem 0 1.6rem;padding:1.1rem 1.2rem 2.4rem;border:10px solid var(--c1f);border-radius:22px;background:var(--c1bg);box-shadow:0 4px 0 rgba(0,0,0,.06),inset 0 0 0 3px #fff}
  .c1-skin .m6-page{margin:.2rem 0 .4rem;color:var(--c1b);font-size:.68rem}
  .sb-pagesheet>.para-card,.sb-pagesheet>.math-topic-card,.sb-pagesheet>.sb-pg-card{border:0!important;box-shadow:none!important;background:none!important;margin:0 0 .8rem!important;padding:0!important}
  .sb-pagesheet .math-badge{display:none!important}
  .sb-pagesheet .math-accordion-body{display:block!important;border-top:0!important;margin-top:.3rem!important;padding-top:0!important}
  .sb-pagesheet .math-acc-icon{display:none!important}
  .sb-pagesheet .math-acc-header{pointer-events:none;cursor:default}
  .sb-pgcard .math-accordion-body{padding-bottom:1.8rem}.sb-pgcard.open>.math-accordion-body{animation:sbpgslide .28s ease}@keyframes sbpgslide{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
  .sb-pagehead{font:800 .72rem system-ui,sans-serif;letter-spacing:.05em;text-transform:uppercase;color:#64748b;margin:0 0 .7rem;padding-bottom:.4rem;border-bottom:1px dashed #cbd5e1}
  .c1-pno{position:absolute;left:50%;bottom:-18px;transform:translateX(-50%);min-width:38px;height:38px;padding:0 .4rem;border-radius:50%;background:#fff;border:3px solid var(--c1f);display:flex;align-items:center;justify-content:center;font-weight:800;color:#1e293b}
  .c1-unit{display:flex;align-items:center;gap:.9rem;margin:.2rem 0 .9rem}
  .c1-unit-badge{background:linear-gradient(180deg,#7dd3fc,var(--c1f));color:#0f172a;border-radius:12px;padding:.35rem .8rem;font-weight:900;font-size:1.05rem;line-height:1.05;text-align:center;box-shadow:0 2px 0 rgba(0,0,0,.15)}
  .c1-skin .c1-banner{background:linear-gradient(90deg,var(--c1b),var(--c1f));color:#fff!important;border-radius:12px;padding:.45rem .9rem;font-size:1.25rem;font-weight:800;margin:.7rem 0 .55rem;box-shadow:0 3px 0 rgba(0,0,0,.12)}
  .c1-skin .c1-banner .m6-hsub{color:#e0f2fe!important}
  .c1-skin .c1-instr{background:var(--c1y);border-radius:6px;padding:.3rem .8rem;font-weight:650;color:#1e293b;margin:.3rem 0 .8rem}
  .c1-lo{position:relative;background:#fff;border-radius:16px;padding:1.6rem 1rem .8rem;margin:1.6rem 0 1rem;box-shadow:0 2px 8px rgba(15,23,42,.08);border-bottom:8px solid var(--c1p)}
  .c1-skin .c1-lo-tab{position:absolute;top:-1.05rem;left:1rem;background:var(--c1p);color:#fff!important;font-style:italic;font-weight:800;font-size:1.05rem;border-radius:10px 10px 10px 0;padding:.25rem .9rem;margin:0;transform:skewX(-6deg)}
  .c1-skin .c1-lo-tab .m6-hsub{color:#ffe4ef!important}
  .c1-skin .m6-ul li::marker{color:var(--c1p)}
  .c1-skin .m6-box{position:relative;border:2px dashed var(--c1p);background:#fff;border-radius:16px;padding:1.4rem 1rem .7rem;margin:1.6rem 0 1rem}
  .c1-skin .m6-box-t{position:absolute;top:-.95rem;left:50%;transform:translateX(-50%);background:var(--c1p);color:#fff;font-style:italic;border-radius:999px;padding:.15rem 1.1rem;font-size:.98rem;white-space:nowrap;box-shadow:0 2px 0 rgba(0,0,0,.12)}
  .c1-skin .m6-box-t .m6-s{color:#fff}
  .c1-skin .m6-exercise{border:3px solid var(--c1f);border-radius:16px;background:#fff}
  .c1-skin .m6-exercise-t{display:inline-block;background:var(--c1b);color:#fff;border-radius:999px;padding:.15rem .9rem}
  .c1-skin .m6-fig{position:relative;background:#fff;border-radius:16px;padding:.8rem;margin:.8rem auto;box-shadow:0 1px 6px rgba(15,23,42,.08)}
  .c1-skin .m6-fig svg{cursor:pointer;min-width:min(100%,620px);max-width:100%;height:auto}
  .c1-skin.m6-rtl .c1-lo-tab{left:auto;right:1rem;transform:skewX(6deg);border-radius:10px 10px 0 10px}
  .sb-generic .para-card,.sb-generic .math-topic-card,.sb-generic .urdu-section-card{border:1px solid #e2e8f0!important;border-inline-start:4px solid var(--c1f)!important;border-radius:14px!important;background:#fff!important}
  .sb-generic .urdu-section-header,.sb-generic .math-acc-header{background:transparent!important;color:#0f172a!important;border-radius:10px}
  .sb-generic .math-acc-header h3,.sb-generic .math-acc-header strong,.sb-generic .urdu-sec-title{color:#0f172a!important}
  .sb-generic h2:not(.math-acc-header *){color:var(--c1b)}
  .sb-generic .para-card-header,.sb-generic .para-card h3{color:var(--c1b)}
  .sb-generic .para-text-box{font-size:1.04rem;line-height:1.85}
  .c1-say{display:inline-flex;align-items:center;justify-content:center;width:1.6em;height:1.6em;margin-inline-start:.3em;border:none;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:pointer;font-size:.8em;vertical-align:middle;opacity:.55}
  .c1-say:hover,.c1-say:focus-visible{opacity:1;outline:2px solid var(--c1f)}
  .c1-bounce{animation:c1b .6s ease}
  @keyframes c1b{0%{transform:scale(1)}30%{transform:scale(1.18)}60%{transform:scale(.94)}100%{transform:scale(1)}}
  .c1-bubble{position:fixed;z-index:9999;pointer-events:none;background:#fff;border:3px solid var(--c1p,#e8457f);border-radius:18px;padding:.3rem .9rem;font-weight:800;font-size:1.3rem;color:#0f172a;box-shadow:0 6px 18px rgba(0,0,0,.18);animation:c1up 1.4s ease forwards}
  @keyframes c1up{0%{opacity:0;transform:translateY(8px) scale(.8)}15%{opacity:1;transform:translateY(0) scale(1)}80%{opacity:1}100%{opacity:0;transform:translateY(-14px)}}
  .c1-drawbtn{position:absolute;top:.4rem;right:.4rem;z-index:3;border:2px solid var(--c1f);background:#fff;color:#0f172a;border-radius:999px;padding:.15rem .7rem;font-weight:700;font-size:.85rem;cursor:pointer}
  .c1-canvas{position:absolute;inset:0;z-index:2;touch-action:none;cursor:crosshair;border-radius:16px}
  .c1-tools{position:absolute;left:.4rem;top:.4rem;z-index:3;display:flex;flex-wrap:wrap;gap:.3rem;background:#fff;border-radius:999px;padding:.25rem .45rem;box-shadow:0 2px 8px rgba(0,0,0,.18)}
  .c1-tools button{width:1.7rem;height:1.7rem;border-radius:50%;border:2px solid #fff;cursor:pointer;font-size:.8rem;padding:0;background:#f1f5f9}
  .c1-tools button[aria-pressed="true"]{outline:3px solid #0f172a}
  `;
  function addCss() {
    if (document.getElementById('c1-skin-css')) return;
    const s = document.createElement('style'); s.id = 'c1-skin-css'; s.textContent = css; document.head.appendChild(s);
  }

  // ---------- sound ----------
  let actx = null;
  function pop(freq) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(freq || 660, actx.currentTime); o.frequency.exponentialRampToValueAtTime((freq || 660) * 1.6, actx.currentTime + .08);
      g.gain.setValueAtTime(.18, actx.currentTime); g.gain.exponentialRampToValueAtTime(.001, actx.currentTime + .18);
      o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + .2);
    } catch (e) { /* audio not available */ }
  }
  const SCRIPT = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;
  function langFor(text) {
    if (!SCRIPT.test(text)) return 'en-GB';
    const subj = typeof state !== 'undefined' ? state.activeSubject : '';
    if (/[ً-ْٰ]/.test(text) && (subj === 'nazira' || subj === 'isl')) return 'ar-SA';
    if (subj === 'pashto' || /[ښږځڅډړټۍې]/.test(text)) return 'ps-AF';
    return 'ur-PK';
  }
  function speak(text, extra) {
    text = String(text || '').replace(/\s+/g, ' ').trim();
    if (!text || !window.speechSynthesis) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langFor(text); u.rate = .85; u.pitch = 1.1;
    const v = speechSynthesis.getVoices().find(x => x.lang && x.lang.toLowerCase().startsWith(u.lang.slice(0, 2)));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
    if (extra) { const e = new SpeechSynthesisUtterance(extra); e.lang = 'en-GB'; e.rate = .95; e.pitch = 1.4; speechSynthesis.speak(e); }
  }
  function bubble(text, x, y) {
    const b = document.createElement('div'); b.className = 'c1-bubble'; b.textContent = text;
    b.style.left = Math.max(8, x - 30) + 'px'; b.style.top = Math.max(8, y - 60) + 'px';
    const root = document.querySelector('.c1-skin'); if (root) b.style.setProperty('--c1p', getComputedStyle(root).getPropertyValue('--c1p'));
    document.body.appendChild(b); setTimeout(() => b.remove(), 1500);
  }
  const esc = v => String(v == null ? '' : v).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]);
  const ownText = el => {
    const c = el.cloneNode(true);
    c.querySelectorAll('.m6-hsub,.m6-tr,.c1-say,.sb-ans,.katex-mathml').forEach(n => n.remove());
    return c.textContent;
  };

  // ---------- figures ----------
  function figClick(ev) {
    const svg = ev.currentTarget;
    if (svg.closest('.c1-drawing')) return;
    const texts = [...svg.querySelectorAll('text')].filter(t => t.textContent.trim() && !/^\d{1,2}$/.test(t.textContent.trim()) || false);
    let pick = null, best = Infinity;
    const allTexts = texts.length ? texts : [...svg.querySelectorAll('text')];
    allTexts.forEach(t => {
      const r = t.getBoundingClientRect(); if (!r.width) return;
      const d = Math.hypot(ev.clientX - (r.left + r.width / 2), ev.clientY - (r.top + r.height / 2));
      if (d < best) { best = d; pick = t; }
    });
    let label = pick ? pick.textContent.trim() : '';
    if (!label || best > 260) {
      const cap = svg.closest('.m6-fig') && svg.closest('.m6-fig').querySelector('figcaption');
      label = cap ? ownText(cap).replace(/^Pictures?:\s*/i, '') : (svg.getAttribute('aria-label') || '');
    }
    const target = ev.target.closest('g,use,circle,rect,path,ellipse,polygon,text') || svg;
    target.style.transformBox = 'fill-box'; target.style.transformOrigin = 'center';
    target.classList.remove('c1-bounce'); void target.getBoundingClientRect(); target.classList.add('c1-bounce');
    pop(720);
    const key = label.toLowerCase().replace(/[^a-z]/g, '');
    const animal = SOUNDS[key] || SOUNDS[key.replace(/s$/, '')];
    if (label.length <= 40) bubble(label + (animal ? ' — ' + animal + '!' : ''), ev.clientX, ev.clientY);
    speak(label, animal ? animal + '!' : '');
  }

  // ---------- drawing layer ----------
  const COLOURS = ['#0f172a', '#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#a16207'];
  function addDraw(fig) {
    if (fig.querySelector('.c1-drawbtn')) return;
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'c1-drawbtn'; btn.textContent = '✏️ Draw / Colour';
    fig.appendChild(btn);
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (fig.classList.contains('c1-drawing')) { fig.classList.remove('c1-drawing'); fig.querySelector('.c1-tools').style.display = 'none'; fig.querySelector('.c1-canvas').style.pointerEvents = 'none'; btn.textContent = '✏️ Draw / Colour'; return; }
      fig.classList.add('c1-drawing'); btn.textContent = '✔ Done';
      let cv = fig.querySelector('.c1-canvas'), tools = fig.querySelector('.c1-tools');
      if (!cv) {
        cv = document.createElement('canvas'); cv.className = 'c1-canvas'; fig.appendChild(cv);
        const ratio = window.devicePixelRatio || 1, rect = fig.getBoundingClientRect();
        cv.width = rect.width * ratio; cv.height = rect.height * ratio; cv.style.width = rect.width + 'px'; cv.style.height = rect.height + 'px';
        const ctx = cv.getContext('2d'); ctx.scale(ratio, ratio); ctx.lineCap = ctx.lineJoin = 'round';
        let colour = COLOURS[1], size = 6, erase = false, down = false, last = null;
        tools = document.createElement('div'); tools.className = 'c1-tools';
        tools.innerHTML = COLOURS.map((c, i) => `<button type="button" data-c="${c}" style="background:${c}" aria-label="colour ${i + 1}" aria-pressed="${i === 1}"></button>`).join('')
          + '<button type="button" data-s="4" title="thin">•</button><button type="button" data-s="14" title="thick">⬤</button><button type="button" data-e="1" title="eraser">🧽</button><button type="button" data-x="1" title="clear">🗑</button>';
        fig.appendChild(tools);
        tools.addEventListener('click', e2 => {
          const b = e2.target.closest('button'); if (!b) return; e2.stopPropagation(); pop(520);
          if (b.dataset.c) { colour = b.dataset.c; erase = false; tools.querySelectorAll('[data-c],[data-e]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); }
          if (b.dataset.s) size = +b.dataset.s;
          if (b.dataset.e) { erase = true; tools.querySelectorAll('[data-c],[data-e]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); }
          if (b.dataset.x) ctx.clearRect(0, 0, cv.width, cv.height);
        });
        const pos = e3 => { const r = cv.getBoundingClientRect(); return [e3.clientX - r.left, e3.clientY - r.top]; };
        cv.addEventListener('pointerdown', e3 => { down = true; last = pos(e3); cv.setPointerCapture(e3.pointerId); e3.preventDefault(); });
        cv.addEventListener('pointermove', e3 => {
          if (!down) return; const p = pos(e3);
          ctx.globalCompositeOperation = erase ? 'destination-out' : 'source-over';
          ctx.strokeStyle = colour; ctx.lineWidth = erase ? 22 : size;
          ctx.beginPath(); ctx.moveTo(last[0], last[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); last = p;
        });
        const up = () => { down = false; };
        cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
      }
      tools.style.display = ''; cv.style.pointerEvents = 'auto';
    });
  }

  // ---------- page skin ----------
  const LO = /Learning Outcomes|حاصلاتِ? تعلّ?م|زده کړې|Learning outcomes/i;
  function skin(root) {
    if (root.dataset.c1 === '1') return;
    root.dataset.c1 = '1';
    const subj = state.activeSubject, T = themeFor(subj);
    // the four book readers share one class set; alias m5/m7/m8 classes to m6 so one skin serves them all
    const P = (root.className.match(/(m[5-8])-root/) || [])[1] || 'm6';
    if (P !== 'm6') { const re = new RegExp('^' + P + '-'); [root, ...root.querySelectorAll('[class*="' + P + '-"]')].forEach(el => { [...el.classList].forEach(c => { if (re.test(c) && c !== P + '-root') el.classList.add(c.replace(re, 'm6-')); }); }); }
    root.classList.add('c1-skin', 'c1-' + subj);
    root.style.setProperty('--c1f', T.frame); root.style.setProperty('--c1b', T.band); root.style.setProperty('--c1y', T.bar); root.style.setProperty('--c1p', T.pink); root.style.setProperty('--c1bg', T.bg);
    // group top-level content into page sheets
    const kids = [...root.children];
    let sheet = null;
    kids.forEach(k => {
      if (k.classList.contains('m6-page')) {
        sheet = document.createElement('div'); sheet.className = 'c1-sheet';
        k.before(sheet); sheet.appendChild(k);
        const m = k.textContent.match(/Textbook page (\d+)/i);
        if (m) { const n = document.createElement('div'); n.className = 'c1-pno'; n.textContent = m[1]; sheet.appendChild(n); }
        return;
      }
      if (sheet && !k.classList.contains('m6-tools') && !k.classList.contains('m6-help')) sheet.insertBefore(k, sheet.querySelector('.c1-pno'));
    });
    // headings: unit title, Learning Outcomes panels, coloured banners, instruction bars
    root.querySelectorAll('.m6-h3,.m6-h4').forEach(h => {
      if (h.closest('.m6-box') || h.closest('.m6-exercise-t')) return;
      if (LO.test(ownText(h))) {
        const box = document.createElement('div'); box.className = 'c1-lo';
        h.before(box); box.appendChild(h); h.classList.add('c1-lo-tab');
        let n = box.nextElementSibling;
        while (n && !n.matches('.m6-h3,.m6-h4,.m6-page,.c1-pno,.m6-box,.m6-exercise,.m6-fig')) { const nx = n.nextElementSibling; box.appendChild(n); n = nx; }
        return;
      }
      h.classList.add('c1-banner');
      let n = h.nextElementSibling;
      while (n && n.classList.contains('m6-tr')) n = n.nextElementSibling;
      if (n && n.tagName === 'P' && ownText(n).length < 140) n.classList.add('c1-instr');
    });
    // unit badge + title at the top of a unit opener page (the sheet that holds the Learning Outcomes panel)
    const lo = root.querySelector('.c1-sheet .c1-lo');
    const UU = bookUnits(); const U = UU && UU[state.selectedSubjChapter || 0];
    if (lo && U && !root.querySelector('.c1-unit')) {
      const word = {eng: 'Unit', math: 'Unit', isl: 'باب', urdu: 'سبق', gk: 'Unit', nazira: 'سبق', pashto: 'لوست', drawing: 'Activity'}[subj] || (root.classList.contains('m6-rtl') ? 'باب' : 'Unit');
      const rtl = root.classList.contains('m6-rtl');
      const sheet = lo.closest('.c1-sheet');
      const fb = sheet && sheet.querySelector('.c1-banner');
      const printed = fb && (fb.compareDocumentPosition(lo) & Node.DOCUMENT_POSITION_FOLLOWING) && /^#|باب|Chapter|Unit|سبق|لوست/.test(ownText(fb).trim()) ? fb : null;
      const wrap = document.createElement('div'); wrap.className = 'c1-unit'; if (rtl) wrap.dir = 'rtl';
      wrap.innerHTML = `<div class="c1-unit-badge">${word}<br>${esc(U.label || U.number)}</div><div class="c1-unit-t" style="font-size:1.8rem;font-weight:900;color:#1e3a5f;line-height:1.3"></div>`;
      if (printed) {
        printed.before(wrap); printed.classList.remove('c1-banner'); printed.style.cssText = 'margin:0;font-size:1.6rem;font-weight:900;color:#1e3a5f';
        wrap.replaceChild(printed, wrap.querySelector('.c1-unit-t'));
      } else {
        wrap.querySelector('.c1-unit-t').textContent = subj === 'pashto' ? (U.titlePashto || U.title) : rtl ? (U.titleUrdu || U.title) : U.title;
        (sheet.querySelector('.m6-page') || lo).after(wrap);
      }
    }
    // speaker buttons on every sentence / heading
    root.querySelectorAll('.m6-s,.m6-h3,.m6-h4,.m6-ul li > span:not(.m6-s)').forEach(el => {
      if (el.querySelector(':scope > .c1-say')) return;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'c1-say'; b.textContent = '🔊'; b.title = 'Listen';
      b.addEventListener('click', e => { e.stopPropagation(); pop(880); speak(ownText(el)); });
      el.appendChild(b);
    });
    // talking pictures + draw layer
    root.querySelectorAll('.m6-fig').forEach(fig => {
      const svg = fig.querySelector('svg'); if (!svg || svg.dataset.c1) return;
      svg.dataset.c1 = '1'; svg.addEventListener('click', figClick); addDraw(fig);
    });
    // answers: a happy chime when an answer is opened
    root.querySelectorAll('details, .sb-ans, .m6-ans button').forEach(el => el.addEventListener('click', () => pop(990), {once: false}));
    // right-to-left layout for Urdu / Pashto / Arabic medium books; Ans buttons beside their 🔊 (js/sb_solve.js)
    if (window.SBSolve) SBSolve.decorate(root);
  }

  // Lighter skin for subject views that do not use the shared book readers: themed cards, banner headings,
  // 🔊 on headings, talking + drawable figures.
  function generic(area) {
    const T = themeFor(state.activeSubject);
    area.classList.add('sb-generic');
    ['frame', 'band', 'bar', 'pink', 'bg'].forEach((k, i) => area.style.setProperty(['--c1f', '--c1b', '--c1y', '--c1p', '--c1bg'][i], T[k]));
    area.querySelectorAll('h2, h3, .urdu-sec-title, .section-title').forEach(h => {
      if (h.dataset.sbg || h.closest('.math-acc-header, button, .ut-root')) return;
      h.dataset.sbg = '1';
      const b = document.createElement('button'); b.type = 'button'; b.className = 'c1-say'; b.textContent = '🔊'; b.title = 'Listen';
      b.addEventListener('click', e => { e.stopPropagation(); pop(880); speak(ownText(h)); });
      h.appendChild(b);
    });
    area.querySelectorAll('svg').forEach(svg => {
      if (svg.dataset.c1 || svg.closest('button, .math-acc-header, .c1-tools, .ut-root')) return;
      const r = svg.getBoundingClientRect(); if (r.width < 140 || r.height < 80) return;
      svg.dataset.c1 = '1';
      const host = svg.parentElement;
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      host.classList.add('m6-fig');
      svg.addEventListener('click', figClick); addDraw(host);
    });
  }

  // ---------- page-wise grouping for the legacy topic renderers (Classes 9-12 sciences) ----------
  // Their data is cut into topics, several of which can share one printed page. After a lesson list renders,
  // consecutive topic cards that start on the same scan page are gathered into one page sheet headed by the
  // printed page number(s); each topic keeps its own title as a sub-heading inside the page.
  function pageInfo(t) {
    const refs = (t.sourceReferences && t.sourceReferences.length) ? t.sourceReferences : (t.source ? [t.source] : []);
    const r = refs[0] || {};
    let pdf = r.pdfPage != null ? r.pdfPage : (t.sourcePdfPages && t.sourcePdfPages[0]);
    if (pdf == null) return null;
    let pr = [];
    refs.forEach(x => { if (x.printedPage != null) pr.push(x.printedPage); (x.printedPages || []).forEach(n => pr.push(n)); });
    (t.sourcePrintedPages || []).forEach(n => pr.push(n));
    return {pdf, pr: pr.filter(n => typeof n === 'number' || /^\d+$/.test(String(n))).map(Number)};
  }
  function pageGroup() {
    if (typeof getSubjectChapterList !== 'function' || typeof state === 'undefined') return;
    document.querySelectorAll('.science-lesson-cards-list,#scienceLessonsList,#langParasGrid').forEach(list => {
      if (list.dataset.sbpg) return;
      let ch = null;
      try { ch = (getSubjectChapterList(state.activeSubject, state.selectedClass) || [])[state.selectedSubjChapter || 0]; } catch (e) { ch = null; }
      list.dataset.sbpg = '1';
      if (!ch) return;
      const kids = [...list.children].filter(k => k.matches('.para-card,.math-topic-card'));
      if (!kids.length || [...list.children].length !== kids.length) return;
      // pair each card with its section: same count = by position, otherwise by title in order
      const key = t => String(t || '').replace(/[^A-Za-z0-9؀-ۿ]+/g, '').toLowerCase().slice(0, 28);
      const cardTitle = c => { const h = c.querySelector('h3,h4,.para-card-header span:last-child'); return h ? key(ownText(h)) : ''; };
      const pool = [ch.sections, ch.topics, ch.urduSections].filter(a => Array.isArray(a) && a.length);
      let arr = pool.find(a => a.length === kids.length) || null, secOf = null;
      if (arr) secOf = i => arr[i];
      else {
        const a = pool[0]; if (!a) return;
        const map = []; let j = 0;
        kids.forEach((c, i) => {
          const ct = cardTitle(c); map[i] = null; if (!ct) return;
          for (let k = j; k < a.length; k++) {
            const st = key(a[k].title || a[k].name || a[k].heading || a[k].headingUrdu);
            if (st && (st === ct || st.startsWith(ct) || ct.startsWith(st))) { map[i] = a[k]; j = k + 1; break; }
          }
        });
        secOf = i => map[i];
      }
      const groups = []; let cur = null;
      kids.forEach((card, i) => {
        const p = pageInfo(secOf(i) || {});
        if (p && cur && cur.pdf === p.pdf) { cur.cards.push(card); cur.pr.push(...p.pr); }
        else { cur = {pdf: p ? p.pdf : null, cards: [card], pr: p ? p.pr.slice() : []}; groups.push(cur); }
      });
      if (!groups.some(g => g.pdf != null)) return;
      const T = themeFor(state.activeSubject);
      ['--c1f', '--c1bg'].forEach((k, i) => list.style.setProperty(k, i ? T.bg : T.frame));
      groups.forEach(g => {
        if (g.pdf == null) return;
        const sheet = document.createElement('section'); sheet.className = 'c1-sheet sb-pagesheet';
        const nums = [...new Set(g.pr)].sort((a, b) => a - b);
        const label = nums.length ? (nums.length > 1 ? nums[0] + '–' + nums[nums.length - 1] : String(nums[0])) : '';
        const titles = g.cards.map(c => { const h = c.querySelector('h3,h4,.para-card-header span:last-child'); return h ? ownText(h).replace(/\s+/g, ' ').trim() : ''; }).filter(Boolean);
        // a collapsed page card: tab = page number + topic title(s); click slides the page sheet open
        const card = document.createElement('div'); card.className = 'math-topic-card math-accordion-card sb-pgcard'; card.dataset.sbTp = '1';
        const head = document.createElement('div'); head.className = 'math-acc-header'; head.setAttribute('onclick', 'toggleMathAccordion(this)');
        head.innerHTML = '<div style="display:flex;align-items:center;gap:.75rem;min-width:0;"><span class="math-badge" style="background:#e0f2fe;color:#0369a1;"></span><h3 style="color:#0f172a;font-size:1.05rem;font-weight:700;margin:0;"></h3></div><span class="math-acc-icon">+</span>';
        head.querySelector('.math-badge').textContent = label ? 'Page ' + label : 'Scan ' + g.pdf;
        head.querySelector('h3').textContent = titles.slice(0, 2).join(' · ') + (titles.length > 2 ? ' …' : '');
        const body = document.createElement('div'); body.className = 'math-accordion-body'; body.style.cssText = 'display:none;margin-top:1rem;border-top:1px solid #e2e8f0;padding-top:1rem;';
        g.cards[0].before(card); card.append(head, body); body.appendChild(sheet);
        g.cards.forEach(c => sheet.appendChild(c));
        if (label) { const n = document.createElement('div'); n.className = 'c1-pno'; n.textContent = label; sheet.appendChild(n); }
      });
    });
  }

  function scan() {
    if (typeof state === 'undefined') return;
    addCss();
    document.querySelectorAll('.m5-root:not([data-c1]),.m6-root:not([data-c1]),.m7-root:not([data-c1]),.m8-root:not([data-c1])').forEach(skin);
    const area = document.getElementById('subjectTopicArea') || document.querySelector('.math-topic-area');
    if (area && !area.querySelector('[data-c1]')) generic(area);
    try { pageGroup(); } catch (e) { /* never break the page */ }
  }
  const obs = new MutationObserver(() => { clearTimeout(scan.t); scan.t = setTimeout(scan, 30); });
  const start = () => { obs.observe(document.body, {childList: true, subtree: true}); scan(); document.addEventListener('click', () => setTimeout(() => { const area = document.getElementById('subjectTopicArea'); if (area && area.classList.contains('sb-generic')) generic(area); }, 60)); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  if (window.speechSynthesis) speechSynthesis.getVoices();
  window.C1_INTERACTIVE = window.SB_BOOK_SKIN = {speak, skin};
})();
