/* Shared "Ans" panel + medium (RTL) handling for every book reader (math5/6/7/8/11 and the books they render).
 *  - Each reader renders an "Ans" button after a question; SBSolve.toggle opens the explanation panel for it.
 *  - Step text is picked by script, not by slot name: Urdu-medium data keeps the Urdu original in the "en"
 *    slot and English in "ur", so a tab shows the slot whose script matches it (book.langs breaks ties).
 *  - The answer card is labelled in the book's medium (Answer / جواب / ځواب / الجواب) and shows the
 *    original answer and each translation on its own line.
 *  - SBSolve.decorate(root) (called by sb_book_skin) lays out Urdu / Pashto / Arabic medium books right to
 *    left, fixes translation-line labels, and moves each Ans button next to its 🔊 button. */
(function () {
  'use strict';
  const LANG = {
    en: {name: 'English', dir: 'ltr', voice: 'en', label: 'Answer', btn: 'Ans', explain: 'Explanation'},
    ur: {name: 'اردو', dir: 'rtl', voice: 'ur', label: 'جواب', btn: 'جواب', explain: 'وضاحت'},
    ps: {name: 'پښتو', dir: 'rtl', voice: 'ps', label: 'ځواب', btn: 'ځواب', explain: 'تشریح'},
    ar: {name: 'العربية', dir: 'rtl', voice: 'ar', label: 'الجواب', btn: 'الجواب', explain: 'الشرح'}
  };
  const SLOTS = ['en', 'ur', 'ps'];
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c]);

  // ---- script detection ----
  // Pashto-only and Urdu-only letters; Arabic-script text with neither (short phrases, Quranic Arabic) is 'ra'
  const ARS = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/g, LAT = /[A-Za-z]/g, PS = /[ښږځڅټډړېۍګ]/g, UR = /[ٹڈڑےۓںھ]/g;
  const count = (t, re) => (t.match(re) || []).length;
  const stripMath = t => String(t || '').replace(/\$\$[^$]*\$\$|\$[^$]*\$/g, ' ');
  function kind(text) {
    const t = stripMath(text), a = count(t, ARS), l = count(t, LAT);
    if (!a && !l) return t.trim() ? 'x' : '';
    if (l > a) return 'en';
    const p = count(t, PS), u = count(t, UR);
    return p > u ? 'ps' : u > p ? 'ur' : 'ra';
  }
  const isRtl = k => k === 'ur' || k === 'ps' || k === 'ra';
  // Which slot of a step record holds each language. `declared` is book.langs (slot order) when the reader knows it.
  function slots(step, declared) {
    if (step._sbs) return step._sbs;
    const decl = {};
    (declared || SLOTS).forEach((l, i) => { decl[l] = SLOTS[i]; });
    const keys = SLOTS.filter(k => typeof step[k] === 'string' && step[k].trim());
    const kinds = {}, out = {}, used = new Set();
    keys.forEach(k => { kinds[k] = kind(step[k]); });
    const take = (l, k) => { out[l] = k; used.add(k); };
    // script-certain slots first
    ['en', 'ps', 'ur'].forEach(l => {
      const hits = keys.filter(k => kinds[k] === l && !used.has(k));
      if (hits.length) take(l, hits.includes(decl[l]) ? decl[l] : hits[0]);
    });
    // ambiguous Arabic script: the language its slot is declared for, else any free Urdu/Pashto
    const declOf = k => Object.keys(decl).find(l => decl[l] === k);
    keys.forEach(k => {
      if (used.has(k) || kinds[k] !== 'ra') return;
      const pref = declOf(k);
      const l = (pref === 'ur' || pref === 'ps') && !out[pref] ? pref : ['ur', 'ps'].find(x => !out[x]);
      if (l) take(l, k);
    });
    keys.forEach(k => { if (!used.has(k) && kinds[k] === 'x') { const free = SLOTS.find(l => !out[l]); if (free) take(free, k); } });
    return (step._sbs = out);
  }

  // ---- book medium ----
  // {text: language of the book's own text, label: language for the Answer label / Ans button}
  function medium(root) {
    if (!root) return {text: 'en', label: 'en'};
    if (root._sbMedium) return root._sbMedium;
    const c = root.cloneNode(true);
    c.querySelectorAll('[class*="-tr"],[class*="-hsub"],[class*="-solve"],[class*="-ans"],.sb-solve,button,svg,figure,.katex,[class*="-page"],[class*="-help"],[class*="-tools"]').forEach(n => n.remove());
    const t = c.textContent, a = count(t, ARS), l = count(t, LAT);
    let text = 'en';
    if (a > l) text = count(t, PS) > a * 0.01 ? 'ps' : 'ur';
    const subj = typeof state !== 'undefined' ? state.activeSubject : '';
    const m = {text, label: subj === 'arabic' && text !== 'en' ? 'ar' : text};
    root._sbMedium = m;
    root.dataset.sbMedium = m.label;
    return m;
  }
  const rootOf = el => el && el.closest('[class*="-root"]');

  // ---- what a solution record holds ----
  // Answer-only records keep a source note in the original slot ("نمونے کا جواب", "Agent answer from page 11",
  // "سبق", "آیت 37" …) and the answer's translations in the other slots, optionally "answer ## note".
  const NOTE = /^[\s(“"«]*(?:نمونے کا جواب|agent answer|spacebook|د spacebook|اسپیس بک|دَ اسپیس بُک|model (?:sentence|answer)|answers? may vary|answer from|from (?:page|pages|the|unit|lesson)|see page|pages? [\d۰-۹]|lesson|section|textbook|guidance|verse|سبق|صفحہ|ص [\d۰-۹]|ترجمہ|آیت|جواب \(ایجنٹ\)|زبانی|عملی|د سبق|د نظم|د قیصې|د کتاب|نظم|الدرس|[\d۰-۹]+\s*مخ|مخ\s*[\d۰-۹]|.{0,30}مخ وګورئ)/i;
  const isNote = t => { t = String(t || '').trim(); return t.length <= 90 && NOTE.test(t); };
  // Credit words say nothing the panel footer does not already say; what follows them ("from page 11",
  // "with 'was' the action is in the past") is kept.
  const CREDIT = /^[\s(]*(?:(?:د|دَ)\s*)?(?:spacebook|اسپیس بک|اسپیس بُک|agent|model|نمونے کا|نمونه)\s*(?:answer|note|sentence|جواب|نوٹ|ځواب|یادونه|نمونه)?\s*(?:\((?:agent|ایجنٹ)\)|\(ایجنٹ کا جواب\))?\s*[:：.۔،,-]?\s*|^\s*جواب\s*\(ایجنٹ\)\s*[:.۔]?\s*/i;
  const cleanNote = t => { const c = String(t || '').replace(CREDIT, '').trim(); return /[\p{L}\p{N}]/u.test(c) ? c : ''; };
  const hasText = s => SLOTS.some(k => typeof s[k] === 'string' && s[k].trim()) || s.m || s.svg;
  function analyse(sol, med, declared) {
    const lines = {}, note = {};
    const put = (l, v) => { v = String(v || '').trim(); if (v && l && LANG[l] && !lines[l]) lines[l] = v; };
    // the answer's own language: script-detected, but Urdu/Pashto text and bare numbers belong to the book's medium
    // In an Urdu/Pashto book any Urdu/Pashto letters make it the medium's line (answers mix in code and English
    // words); in an English book any Latin letters make it English.
    const own = t => {
      const k = kind(t);
      if (med.text !== 'en') return count(stripMath(t), ARS) || k !== 'en' ? med.text : 'en';
      return count(stripMath(t), LAT) || !isRtl(k) ? 'en' : k === 'ra' ? 'ur' : k;
    };
    const a = String(sol.answer || '').trim();
    if (a.includes('||')) {
      a.split('||').map(x => x.trim()).filter(Boolean).forEach((p, i) => {
        const k = kind(p);
        put(i === 0 ? own(p) : k === 'ra' ? ['ur', 'ps'].find(x => !lines[x]) : (k === 'x' || !k ? null : k), p);
      });
    } else {
      const m = a.match(/^([\s\S]*?\S)\s*\(([^()]*[A-Za-z][^()]*)\)\s*[.۔]?$/);
      if (m && kind(m[1]) !== 'en' && kind(m[1]) !== '') { put(own(m[1]), m[1]); put('en', m[2]); }
      else put(own(a), a);
    }
    put('ur', sol.answerUr); put('ps', sol.answerPs);
    let steps = (sol.steps || []).filter(hasText);
    const s0 = steps[0];
    const orig = s0 ? String(s0.en || '').trim() : '';
    if (steps.length === 0 || (steps.length === 1 && !s0.m && !s0.svg && (!orig || isNote(orig)))) {
      if (s0) {
        const sl = slots(s0, declared);
        if (orig) note[kind(orig) === 'en' ? 'en' : med.text] = orig;
        ['ur', 'ps'].forEach(k => {
          const t = String(s0[k] || '').trim();
          if (!t) return;
          let l = SLOTS.find(x => sl[x] === k);
          if (!l) { const kk = kind(t); l = kk === 'ra' ? ['ur', 'ps'].find(x => !lines[x]) : kk; }
          const [ans, n] = t.split(/\s*##\s*/);
          if (n !== undefined) { put(l, ans); if (n && LANG[l]) note[l] = n; }
          else if (isNote(t)) { if (LANG[l]) note[l] = t; }
          else put(l, t);
        });
      }
      steps = [];
    }
    return {steps, lines, note};
  }

  // ---- styles ----
  const css = `
  .sb-ans{display:inline-flex;align-items:center;justify-content:center;gap:.2em;height:1.6em;min-width:2.4em;margin-inline-start:.35em;padding:0 .55em;border:none;border-radius:999px;background:#16a34a;color:#fff;font:inherit;font-size:.72em;font-weight:800;letter-spacing:.02em;line-height:1;vertical-align:middle;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.2)}
  .sb-ans::before{content:"✓";font-size:.95em}
  .sb-ans:hover,.sb-ans:focus-visible{background:#15803d;outline:2px solid #86efac;outline-offset:1px}
  .sb-ans[aria-expanded="true"]{background:#0f766e}
  .sb-ans[aria-expanded="true"]::before{content:"✕"}
  .sb-solve{margin:.5rem 0 .9rem;border:1px solid #cbd5e1;border-radius:14px;background:#fff;overflow:hidden;box-shadow:0 2px 10px rgba(15,23,42,.07);font-size:.98rem;line-height:1.75;color:#1e293b}
  .sbs-top{display:flex;flex-wrap:nowrap;align-items:center;gap:.3rem;padding:.3rem .45rem;background:linear-gradient(90deg,#0f766e,#14b8a6);color:#fff;direction:ltr}
  .sbs-title{font-size:1.05rem;line-height:1;flex:none}
  .sbs-langs{display:inline-flex;flex-wrap:nowrap;gap:.2rem;margin-inline-start:.1rem;min-width:0}
  .sbs-langs button{font:inherit;font-size:.72rem;font-weight:800;letter-spacing:.02em;border:1px solid rgba(255,255,255,.6);background:transparent;color:#fff;border-radius:999px;min-width:2rem;height:1.7rem;padding:0 .4rem;cursor:pointer}
  .sbs-langs button[aria-pressed="true"]{background:#fff;color:#0f766e;border-color:#fff}
  .sbs-tools{display:inline-flex;flex-wrap:nowrap;align-items:center;gap:.2rem;margin-inline-start:auto}
  .sbs-tools button{display:inline-flex;align-items:center;justify-content:center;width:1.9rem;height:1.9rem;padding:0;font:inherit;font-size:1rem;line-height:1;border:1px solid rgba(255,255,255,.6);background:transparent;color:#fff;border-radius:50%;cursor:pointer}
  .sbs-tools button[aria-pressed="true"],.sbs-tools button[aria-selected="true"]{background:#fff;color:#0f766e;border-color:#fff}
  .sbs-ico{width:1.1rem;height:1.1rem;fill:currentColor;pointer-events:none}
  .sbs-fs-lock,.sbs-fs-lock body{overflow:hidden!important}
  .sb-solve.sbs-fs{position:fixed;inset:0;z-index:2147482000;margin:0;border:0;border-radius:0;overflow:auto;background:#fff;font-size:1.1rem;box-shadow:none;max-width:none;width:auto;padding-bottom:env(safe-area-inset-bottom,0)}
  .sb-solve.sbs-fs .sbs-top{position:sticky;top:0;z-index:4;padding-top:calc(.3rem + env(safe-area-inset-top,0))}
  .sb-solve.sbs-fs .sbs-body{padding:.6rem .9rem 2rem}
  .sbs-body{padding:.4rem .7rem .7rem}
  .sbs-steps{list-style:none;margin:0;padding:0;counter-reset:sbs}
  .sbs-step{position:relative;margin:.4rem 0;padding-block:.4rem;padding-inline:2.3rem .5rem;border-radius:8px;transition:background .3s}
  .sbs-step.cur{background:#f0fdfa;box-shadow:0 0 0 1px #99f6e4}
  .sbs-step::before{counter-increment:sbs;content:counter(sbs);position:absolute;inset-inline-start:.45rem;top:.5rem;width:1.4rem;height:1.4rem;border-radius:50%;background:#14b8a6;color:#fff;font-size:.75rem;font-weight:700;display:flex;align-items:center;justify-content:center}
  .sbs-teacher{position:absolute;inset-inline-start:.4rem;top:2.05rem;font-size:.95rem;opacity:0;transition:opacity .3s}
  .sbs-step.cur .sbs-teacher{opacity:1;animation:sbsbob 1s ease-in-out infinite}
  .sbs-say{min-height:1.4em}
  @media (min-width:760px){.sbs-step.sbs-hasm{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);column-gap:1.1rem;align-items:start}.sbs-step.sbs-hasm .sbs-show{grid-column:1;grid-row:1;margin:0}.sbs-step.sbs-hasm .sbs-say{grid-column:2;grid-row:1;align-self:center;padding-inline-start:.9rem;border-inline-start:3px solid #99f6e4;color:#334155}}
  .sbs-say[dir="rtl"],.sbs-line[dir="rtl"]{font-size:1.1rem;line-height:2.05}
  .sbs-show{margin:.3rem 0;overflow-x:auto;direction:ltr}
  .sbs-show svg{max-width:100%;height:auto}
  .sbs-final{margin-top:.5rem;border:1px solid #86efac;border-radius:12px;background:#f0fdf4;overflow:hidden}
  .sbs-final-h{padding:.25rem .7rem;background:#dcfce7;color:#14532d;font-weight:800;font-size:.92rem}
  .sbs-line{margin:0;padding:.35rem .7rem;border-top:1px solid #dcfce7;color:#14532d}
  .sbs-line:first-of-type{border-top:none}
  .sbs-line.sel{background:#fff;font-weight:650}
  .sbs-chip{display:inline-block;margin-inline-end:.5rem;padding:0 .45rem;border-radius:999px;background:#bbf7d0;color:#166534;font-size:.68rem;font-weight:800;vertical-align:middle;font-family:system-ui,sans-serif;line-height:1.6}
  .sbs-note{margin:.5rem 0 0;font-size:.72rem;color:#64748b}
  .sbs-src{margin:.1rem 0 .45rem;font-size:.85rem;color:#475569}
  .sbs-help{margin:.6rem .7rem;font-size:.85rem;color:#64748b}
  /* answers in place: the word in the dash, or a small box right under the question */
  .sbs-fill{display:inline;padding:0 .3em;margin:0 .1em;border-radius:5px;background:#dcfce7;color:#14532d;font-weight:800;border-bottom:2px solid #16a34a;box-decoration-break:clone;-webkit-box-decoration-break:clone}
  .sb-solve.sbs-inline{margin:.45rem 0 .8rem;border:1px solid #bbf7d0;border-radius:12px;background:#f7fef9;box-shadow:none;font-size:.95rem}
  .sb-solve.sbs-inline .sbs-final{margin:0;border:0;border-radius:0;background:transparent}
  .sbs-exp{margin:0;padding:.4rem .8rem;border-top:1px dashed #bbf7d0;color:#475569;font-size:.9rem;line-height:1.9}
  .sbs-exp:first-child{border-top:0}
  .sb-solve.sbs-inline .sbs-note{margin:0;padding:.2rem .8rem .4rem}
  .sbs-enter{animation:sbsin .45s ease-out}
  .sbs-pop{animation:sbspop .5s ease-out}
  @keyframes sbsin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  @keyframes sbspop{0%{opacity:0;transform:scale(.94)}70%{opacity:1;transform:scale(1.02)}100%{transform:none}}
  @keyframes sbsbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
  @media (prefers-reduced-motion: reduce){.sbs-enter,.sbs-pop,.sbs-step.cur .sbs-teacher{animation:none}}
  /* Urdu / Pashto / Arabic medium books read right to left */
  .sb-rtl{direction:rtl}
  .sb-rtl svg,.sb-rtl .katex,.sb-rtl .katex-display{direction:ltr}
  .sb-rtl [class*="-parts"],.sb-rtl [class*="-ans"]:not(.sb-ans){margin-left:0;margin-inline-start:1.6rem}
  .sb-rtl [class$="-m"]{margin-left:0;margin-inline-start:1rem}
  .sb-rtl [class*="-tr"]{border-radius:6px 0 0 6px}
  .sb-rtl [class*="-tr"] p[dir="ltr"],.sb-rtl p[dir="ltr"],.sb-rtl span[dir="ltr"]{text-align:left}
  .sb-rtl [class*="-q"],.sb-rtl [class*="-part"],.sb-rtl li{text-align:right}
  `;
  function addCss() {
    if (document.getElementById('sb-solve-css')) return;
    const s = document.createElement('style'); s.id = 'sb-solve-css'; s.textContent = css; document.head.appendChild(s);
  }

  // ---- panel ----
  const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const defaultPlain = text => String(text || '').replace(/\*\*/g, '').replace(/\$([^$]*)\$/g, (_, m) => m.replace(/\\times/g, '×').replace(/\\div/g, '÷').replace(/\^\{([^}]*)\}/g, '^$1').replace(/\\text\{([^}]*)\}/g, '$1').replace(/[{}\\]/g, ''));
  function panelFor(btn) {
    if (!btn._panel) btn._panel = btn.nextElementSibling;
    return btn._panel;
  }
  const stepText = (panel, i) => String(rawStepText(panel, i) || '').replace(/\s*##\s*/g, ' — ');
  function rawStepText(panel, i) {
    const s = panel._steps[i], l = panel._lang, sl = slots(s, panel._declared);
    if (l === 'ar' && (s.ar || s._ar)) return s.ar || s._ar;
    if (sl[l]) return s[sl[l]];
    const own = sl[panel._med.text];
    return own ? s[own] : s[sl.en || sl.ur || sl.ps] || '';
  }
  function prepareArabic(panel) {
    const T = window.SBTranslate;
    if (!T || !T.translate) return Promise.resolve();
    const tr = text => Promise.all(String(text).split(/(\$\$[^$]*\$\$|\$[^$]*\$)/).map(part => {
      if (/^\$/.test(part) || !/[A-Za-z]/.test(part)) return part;
      const lead = part.match(/^\s*/)[0], tail = part.match(/\s*$/)[0];
      return T.translate(part.trim(), 'en', 'ar', true).then(r => r && r.text ? lead + r.text + tail : part, () => part);
    })).then(out => out.join(''));
    const jobs = panel._steps.map(s => {
      if (s.ar || s._ar) return null;
      const k = slots(s, panel._declared).en;
      if (!k) return null;
      return s._arP || (s._arP = tr(s[k]).then(t => { s._ar = t; }));
    });
    const lines = panel._lines;
    if (!lines.ar && lines.en) jobs.push(panel._sol._arAnsP || (panel._sol._arAnsP = tr(lines.en).then(t => { panel._sol._arAns = t; })));
    return Promise.all(jobs);
  }
  // the source note of an answer-only record (📖 page / lesson reference) in the selected language
  function showNote(panel) {
    const el = panel.querySelector('.sbs-src'), n = panel._note || {};
    const l = n[panel._lang] ? panel._lang : n[panel._med.text] ? panel._med.text : Object.keys(n)[0];
    const t = l ? cleanNote(n[l]) : '';
    el.hidden = !t;
    if (el.hidden) return;
    el.dir = LANG[l].dir; el.lang = l;
    el.innerHTML = '📖 ' + panel._inline(t, false);
  }
  function finalHtml(panel) {
    const lines = Object.assign({}, panel._lines);
    if (!lines.ar && panel._sol._arAns && panel._lang === 'ar') lines.ar = panel._sol._arAns;
    const order = [panel._med.text, 'en', 'ur', 'ps', 'ar'].filter((l, i, a) => a.indexOf(l) === i && lines[l]);
    const multi = order.length > 1;
    return `<div class="sbs-final-h" dir="${LANG[panel._med.label].dir}">✅ ${LANG[panel._med.label].label}</div>` + order.map(l =>
      `<p class="sbs-line${multi && l === panel._lang ? ' sel' : ''}" lang="${l}" dir="${LANG[l].dir}">${multi ? `<span class="sbs-chip">${LANG[l].name}</span>` : ''}${panel._inline(lines[l], false)}</p>`).join('');
  }

  // the panel's buttons are icons (the title and aria-label say what they do): the answer box takes as little of the page as it can
  const SICON = {
    voice: 'M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
    fs: 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z',
    fsx: 'M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z',
  };
  const sicon = n => '<svg class="sbs-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + SICON[n] + '"/></svg>';
  // full screen: the panel becomes a fixed layer over the page (no browser full-screen API: a phone's WebView may not offer it)
  function setFs(panel, on) {
    panel.classList.toggle('sbs-fs', on);
    document.documentElement.classList.toggle('sbs-fs-lock', on);
    const b = panel.querySelector('[data-a="fs"]');
    if (b) { b.setAttribute('aria-pressed', String(on)); b.innerHTML = sicon(on ? 'fsx' : 'fs'); b.title = on ? 'Leave full screen' : 'Full screen'; b.setAttribute('aria-label', b.title); }
    if (panel._fsKey) { document.removeEventListener('keydown', panel._fsKey); panel._fsKey = null; }
    if (on) { panel._fsKey = e => { if (e.key === 'Escape') setFs(panel, false); }; document.addEventListener('keydown', panel._fsKey); }
    if (!on) panel.scrollTop = 0;
  }

  // ---- where an answer shows ----
  // A solution worked in maths (steps with equations) opens the big answer window. Any other answer (a word, a sentence, an option, a
  // paragraph) shows IN PLACE, on the page it belongs to: in the dash of a fill-in-the-blank question, otherwise in a small box right under
  // the question. IN_PLACE lists the books that work this way ("class:subject" of the open book, or '*' for every book; a book left out
  // keeps the answer window for every answer).
  const IN_PLACE = ['*'];
  const inPlaceBook = () => typeof state !== 'undefined' && !!state && (IN_PLACE.includes('*') || IN_PLACE.includes(state.selectedClass + ':' + state.activeSubject));
  const hasMaths = sol => (sol.steps || []).some(s => s.m || s.svg || SLOTS.some(k => typeof s[k] === 'string' && s[k].includes('$')));
  const BLANK_G = /_{3,}|\.{4,}|…+|-{3,}|[—–]{2,}/g;                // a run of underscores, dots or dashes that stands for the missing word
  const SENT_RX = /(?:^|\s)[a-z]+\d*-s(?:\s|$)/, TR_RX = /(?:^|\s)[a-z]+\d*-tr(?:\s|$)/;
  const classOf = e => (typeof e.className === 'string' ? e.className : '');
  // the sentence an Ans button belongs to (each book family names its sentence class with its own prefix: m6-s, c1-s ...)
  function sentenceOf(btn) {
    for (let e = btn.parentElement; e && e.nodeType === 1; e = e.parentElement) {
      if (e.classList.contains('sb-solve')) return null;
      if (e.classList.contains('lesson-sentence') || (SENT_RX.test(classOf(e)) && e.hasAttribute('onclick'))) return e;
    }
    return null;
  }
  // the text of a question that is part of the question itself (not the buttons, the translations, the answer box, equations)
  function ownTextNode(n, root) {
    for (let e = n.parentElement; e && e !== root.parentElement; e = e.parentElement) {
      if (e.matches('button,script,style,.katex,.sb-solve,.sbs-fill,.sb-tri-drawer,[id^="sent-trans-"]') || TR_RX.test(classOf(e))) return false;
      if (e === root) break;
      if (e.matches('li,[class*="-parts"],[class~="m6-part"],[class$="-part"]')) return false;      // the text of another part of the question
    }
    return true;
  }
  function blanksOf(root, keep) {
    const out = [], w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) {
      if (!keep(n)) continue;
      BLANK_G.lastIndex = 0;
      for (let m; (m = BLANK_G.exec(n.data));) out.push({node: n, at: m.index, len: m[0].length});
    }
    return out;
  }
  // put one value in each blank (values.length === blanks.length); returns the filled spans so they can be taken out again
  function fillBlanks(blanks, values, html) {
    const spans = [], byNode = new Map();
    blanks.forEach((b, i) => { if (!byNode.has(b.node)) byNode.set(b.node, []); byNode.get(b.node).push([b, values[i]]); });
    byNode.forEach((list, node) => {
      const frag = document.createDocumentFragment(); let pos = 0;
      list.forEach(([b, v]) => {
        if (b.at > pos) frag.appendChild(document.createTextNode(node.data.slice(pos, b.at)));
        const sp = document.createElement('span');
        sp.className = 'sbs-fill sbs-enter'; sp.dataset.blank = node.data.substr(b.at, b.len); sp.innerHTML = html(v);
        frag.appendChild(sp); spans.push(sp); pos = b.at + b.len;
      });
      if (pos < node.data.length) frag.appendChild(document.createTextNode(node.data.slice(pos)));
      node.replaceWith(frag);
    });
    return spans;
  }
  function unfill(btn) {
    (btn._fills || []).forEach(sp => { const p = sp.parentNode; if (!p) return; sp.replaceWith(document.createTextNode(sp.dataset.blank)); p.normalize(); });
    btn._fills = null;
  }
  // one answer for several dashes: "a, b" / "a ; b" / "a … b" / "a اور b" for two dashes
  const splitAnswer = (text, n) => (n === 1 ? [text] : String(text).split(/\s*(?:[،,;؛…]|\.{3}|\s+(?:اور|and|و)\s+)\s*/).filter(Boolean));
  function fillQuestion(btn, panel, info) {
    const se = sentenceOf(btn), host = se || btn.parentElement; if (!host) return false;
    const med = panel._med, lines = info.lines;
    const main = blanksOf(host, n => ownTextNode(n, host));
    if (!main.length) return false;
    const mainLang = ((se && se.getAttribute('lang')) || '').slice(0, 2) || med.text;
    const line = lines[mainLang] || lines[med.text] || lines.en || Object.values(lines)[0];
    if (!line || line.length > 90) return false;                           // a paragraph does not go into a dash: it shows under the question
    const vals = splitAnswer(line, main.length);
    if (vals.length !== main.length) return false;
    btn._fills = fillBlanks(main, vals, v => panel._inline(v, false));
    // the translation lines of the same sentence carry the same dash: fill each with the answer in its own language
    const tr = se && [se.nextElementSibling].concat([...(se.parentElement ? se.parentElement.children : [])]).find(e => e && TR_RX.test(classOf(e)));
    if (tr) [...tr.querySelectorAll('p[lang]')].forEach(p => {
      const l = p.getAttribute('lang'), v = lines[l]; if (!v) return;
      const bl = blanksOf(p, n => !n.parentElement.closest('[class*="-lang"]'));
      const vs = splitAnswer(v, bl.length);
      if (bl.length && vs.length === bl.length) btn._fills = btn._fills.concat(fillBlanks(bl, vs, x => panel._inline(x, false)));
    });
    return true;
  }
  // the explanation of a plain answer, in the language of the book, under the answer
  function explainHtml(panel) {
    return panel._steps.map((s, i) => {
      const t = stepText(panel, i); if (!t) return '';
      return `<p class="sbs-exp" dir="${dirOf(t, panel)}">📖 ${panel._inline(t, false)}</p>`;
    }).join('');
  }
  function toggleInPlace(btn, sol, cfg) {
    const panel = panelFor(btn);
    const closing = btn.getAttribute('aria-expanded') === 'true';
    if (closing) { unfill(btn); panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); return; }
    const med = medium(rootOf(btn));
    const declared = cfg && cfg.langs ? String(cfg.langs).split(',') : (btn.dataset.langs ? btn.dataset.langs.split(',') : null);
    const info = analyse(sol, med, declared);
    panel.classList.add('sb-solve', 'sbs-inline');
    Object.assign(panel, {_sol: sol, _med: med, _declared: declared, _inline: (cfg && cfg.inline) || esc, _plain: (cfg && cfg.plain) || defaultPlain,
      _lang: med.text, _steps: info.steps, _lines: info.lines, _note: info.note});
    const filled = fillQuestion(btn, panel, info);
    const src = (() => { const n = info.note, l = n[med.text] ? med.text : Object.keys(n)[0], t = l ? cleanNote(n[l]) : ''; return t ? `<p class="sbs-exp" dir="${LANG[l].dir}">📖 ${panel._inline(t, false)}</p>` : ''; })();
    const foot = `<p class="sbs-note" dir="ltr">${sol.src === 'book' ? 'Printed answer from the textbook' : `SpaceBook ${info.steps.length ? 'explanation' : 'answer'} · not printed in the textbook`}</p>`;
    panel.innerHTML = (filled ? '' : `<div class="sbs-final">${finalHtml(panel)}</div>`) + explainHtml(panel) + src + foot;
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
  }

  // Open or close the panel that belongs to an Ans button. cfg: {inline, plain, langs}
  function toggle(btn, sol, cfg) {
    addCss();
    if (sol && !hasMaths(sol) && inPlaceBook()) return toggleInPlace(btn, sol, cfg);
    const panel = panelFor(btn);
    const open = panel.hidden || !panel._sol;
    if (!open) { if (panel.classList.contains('sbs-fs')) setFs(panel, false); panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); stop(panel); return; }
    panel.classList.remove('sbs-inline');                          // a maths solution opens the answer window (sb_book_spread.js)
    panel._btn = btn;                                              // the window gives the button back its closed look when it closes
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    panel.classList.add('sb-solve');
    if (!sol) { panel.innerHTML = '<p class="sbs-help">Answer not available.</p>'; return; }
    const med = medium(rootOf(btn));
    const declared = cfg && cfg.langs ? String(cfg.langs).split(',') : (btn.dataset.langs ? btn.dataset.langs.split(',') : null);
    const info = analyse(sol, med, declared);
    Object.assign(panel, {_sol: sol, _med: med, _declared: declared, _inline: (cfg && cfg.inline) || esc, _plain: (cfg && cfg.plain) || defaultPlain,
      _lang: med.text, _i: -1, _playing: true, _voice: false});
    panel._steps = info.steps;
    panel._lines = info.lines;
    panel._note = info.note;
    const hasSteps = panel._steps.length > 0;
    const inl = panel._inline;
    panel.innerHTML = `<div class="sbs-top"><span class="sbs-title" title="${esc(hasSteps ? LANG[med.label].explain : LANG[med.label].label)}" aria-hidden="true">🧑‍🏫</span>
      <span class="sbs-langs" role="group" aria-label="Language">${Object.keys(LANG).map(k => `<button type="button" data-l="${k}" lang="${k}" title="${LANG[k].name}" aria-label="${LANG[k].name}" aria-pressed="${k === med.text}">${k.toUpperCase()}</button>`).join('')}</span>
      <span class="sbs-tools" role="group" aria-label="Tools">${hasSteps ? `<button type="button" data-a="voice" aria-pressed="false" title="Read aloud" aria-label="Read aloud">${sicon('voice')}</button>` : ''}<button type="button" data-a="fs" aria-pressed="false" title="Full screen" aria-label="Full screen">${sicon('fs')}</button></span></div>
      <div class="sbs-body" dir="${LANG[med.text].dir}">
      ${hasSteps ? `<ol class="sbs-steps">${panel._steps.map(s => `<li class="sbs-step${s.m ? ' sbs-hasm' : ''}" hidden><span class="sbs-teacher" aria-hidden="true">🧑‍🏫</span><div class="sbs-say" aria-live="polite"></div>${s.m ? `<div class="sbs-show" hidden>${inl('$$' + s.m + '$$', false)}</div>` : ''}${s.svg ? `<div class="sbs-show" hidden>${s.svg}</div>` : ''}</li>`).join('')}</ol>` : ''}
      <p class="sbs-src"></p>
      <div class="sbs-final"${hasSteps ? ' hidden' : ''}>${finalHtml(panel)}</div>
      <p class="sbs-note" dir="ltr">${sol.src === 'book' ? 'Printed answer from the textbook' : `SpaceBook ${hasSteps ? 'explanation' : 'answer'} · not printed in the textbook`}</p></div>`;
    // Visual reasoning (additive): when the English steps hold equations, offer the animated board next to the language buttons
    if (hasSteps && window.SBVR && window.SBVR.autoFromSolve) { try { window.SBVR.autoFromSolve(panel, panel._steps, declared, slots); } catch (e) { /* never break the panel */ } }
    const playBtn = panel.querySelector('[data-a="play"]');
    const pause = () => { panel._playing = false; if (playBtn) playBtn.textContent = '▶ Play'; };
    const setLang = l => {
      panel._lang = l;
      panel.querySelector('.sbs-body').dir = LANG[l].dir;
      panel.querySelectorAll('.sbs-langs [data-l]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.l === l)));
      panel.querySelectorAll('.sbs-step').forEach((li, i) => { if (!li.hidden) setSay(panel, li, i); });
      panel.querySelector('.sbs-final').innerHTML = finalHtml(panel);
      showNote(panel);
    };
    panel.querySelector('.sbs-langs').onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      setLang(b.dataset.l);
      if (b.dataset.l === 'ar') prepareArabic(panel).then(() => { if (panel._lang === 'ar') setLang('ar'); });
    };
    const ctl = panel.querySelector('.sbs-tools');
    if (ctl) ctl.onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      const a = b.dataset.a, n = panel._steps.length;
      if (a === 'fs') return setFs(panel, !panel.classList.contains('sbs-fs'));
      if (a === 'play') { panel._playing = !panel._playing; playBtn.textContent = panel._playing ? '⏸ Pause' : '▶ Play'; if (panel._playing && !panel._busy) advance(panel); }
      if (a === 'next') { pause(); finish(panel); advance(panel); }
      if (a === 'all') { stop(panel); pause(); finish(panel); while (panel._i < n - 1) reveal(panel, ++panel._i, true); advance(panel); }
      if (a === 'restart') { stop(panel); panel.querySelectorAll('.sbs-step').forEach(x => { x.hidden = true; x.classList.remove('cur'); }); panel.querySelector('.sbs-final').hidden = true; panel._i = -1; panel._playing = true; playBtn.textContent = '⏸ Pause'; advance(panel); }
      if (a === 'voice') { panel._voice = !panel._voice; b.setAttribute('aria-pressed', String(panel._voice)); if (!panel._voice && window.speechSynthesis) speechSynthesis.cancel(); else if (panel._voice && window.speechSynthesis) { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(panel._steps.map((_, k) => panel._plain(stepText(panel, k))).join('. ')); const v = speechSynthesis.getVoices().find(x => x.lang.toLowerCase().startsWith(LANG[panel._lang].voice)); if (v) { u.voice = v; u.lang = v.lang; } u.rate = .9; speechSynthesis.speak(u); } }
    };
    showNote(panel);
    // the whole written solution shows at once (no word-by-word typing); the animated board is a separate tab
    if (hasSteps) {
      panel._playing = false;
      panel._steps.forEach((_, k) => { panel._i = k; reveal(panel, k, true); });
      panel.querySelectorAll('.sbs-step').forEach(x => x.classList.remove('cur'));
      panel.querySelector('.sbs-final').hidden = false;
    }
  }
  // Urdu/Pashto text reads right to left; English and bare numbers follow the selected tab
  const dirOf = (text, panel) => { const k = kind(text); return isRtl(k) ? 'rtl' : k === 'en' ? 'ltr' : LANG[panel._lang].dir; };
  function stop(panel) { clearTimeout(panel._t); clearInterval(panel._type); panel._busy = false; if (window.speechSynthesis) speechSynthesis.cancel(); }
  function setSay(panel, li, i) {
    const say = li.querySelector('.sbs-say');
    say.dir = dirOf(stepText(panel, i), panel);
    say.innerHTML = panel._inline(stepText(panel, i), false);
  }
  function finish(panel) {
    clearInterval(panel._type); clearTimeout(panel._t); panel._busy = false;
    const li = panel.querySelectorAll('.sbs-step')[panel._i];
    if (!li) return;
    setSay(panel, li, panel._i);
    li.querySelectorAll('.sbs-show').forEach(x => { x.hidden = false; });
  }
  function reveal(panel, i, instant) {
    const items = panel.querySelectorAll('.sbs-step');
    items.forEach(x => x.classList.remove('cur'));
    const li = items[i];
    li.hidden = false; li.classList.add('cur', 'sbs-enter');
    if (instant || reduced()) { setSay(panel, li, i); li.querySelectorAll('.sbs-show').forEach(x => { x.hidden = false; }); if (!instant) after(panel, li); return; }
    li.scrollIntoView({block: 'nearest', behavior: 'smooth'});
    const say = li.querySelector('.sbs-say');
    const p = panel._plain(stepText(panel, i));
    say.dir = dirOf(p, panel);
    let k = 0;
    panel._busy = true;
    say.textContent = '';
    panel._type = setInterval(() => {
      k += 2;
      say.textContent = p.slice(0, k);
      if (k < p.length) return;
      clearInterval(panel._type);
      setSay(panel, li, i);
      li.querySelectorAll('.sbs-show').forEach(x => { x.hidden = false; x.classList.add('sbs-pop'); });
      after(panel, li);
    }, 28);
  }
  function after(panel, li) {
    const done = () => { panel._busy = false; if (panel._playing) panel._t = setTimeout(() => advance(panel), li.querySelector('.sbs-show') ? 1600 : 900); };
    if (panel._voice && window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(panel._plain(stepText(panel, panel._i)));
      const v = speechSynthesis.getVoices().find(x => x.lang.toLowerCase().startsWith(LANG[panel._lang].voice));
      if (v) { u.voice = v; u.lang = v.lang; }
      u.rate = .9; u.onend = done; u.onerror = done;
      speechSynthesis.speak(u);
    } else done();
  }
  function advance(panel) {
    if (panel.hidden) return;
    if (panel._i >= panel._steps.length - 1) {
      const fin = panel.querySelector('.sbs-final');
      fin.hidden = false; fin.classList.add('sbs-pop');
      panel.querySelectorAll('.sbs-step').forEach(x => x.classList.remove('cur'));
      return;
    }
    reveal(panel, ++panel._i, false);
  }
  // A reader shows this while its solutions file loads.
  function loading(btn, text) {
    addCss();
    const panel = panelFor(btn);
    panel.classList.add('sb-solve', 'sbs-inline');                 // no answer window yet: toggle() decides when the solution is in
    panel.hidden = false;
    panel.innerHTML = `<p class="sbs-help">${esc(text)}</p>`;
    return panel;
  }

  // ---- page decoration (called by sb_book_skin after it adds 🔊 buttons) ----
  function decorate(root) {
    if (!root || root.dataset.sbDecorated === '1') return;
    root.dataset.sbDecorated = '1';
    addCss();
    const med = medium(root);
    if (LANG[med.text].dir === 'rtl') { root.classList.add('sb-rtl'); root.dir = 'rtl'; }
    // translation lines: label and direction by the script actually written
    root.querySelectorAll('[class*="-tr"] > p').forEach(p => {
      const tag = p.querySelector('[class*="-lang"]');
      const c = p.cloneNode(true); c.querySelectorAll('[class*="-lang"],.c1-say').forEach(n => n.remove());
      const k = kind(c.textContent), dir = k === 'en' ? 'ltr' : isRtl(k) ? 'rtl' : '';
      if (!dir) return;
      p.dir = dir; p.style.textAlign = dir === 'ltr' ? 'left' : 'right'; p.style.direction = dir;
      if (LANG[k]) { p.lang = k; if (tag) tag.textContent = LANG[k].name; }
    });
    // Ans buttons: medium label, placed right after the 🔊 of the sentence they answer
    root.querySelectorAll('.sb-ans').forEach(b => {
      b.textContent = LANG[med.label].btn;
      panelFor(b);
      let prev = b.previousElementSibling;
      while (prev && /-tr\b/.test(prev.className)) prev = prev.previousElementSibling;
      if (!prev) return;
      const says = prev.matches('.c1-say') ? [prev] : prev.querySelectorAll('.c1-say');
      const say = says[says.length - 1];
      if (say) say.after(b);
    });
  }

  window.SBSolve = {toggle, loading, panelFor, decorate, medium, kind, slots, analyse, LANG, IN_PLACE, hasMaths};
})();
