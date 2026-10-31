/* sb_study_sheet.js — "Go" on a Study Plan task of lesson parts: the lesson itself, one part at a time, in a sheet over the plan.
 *
 * "Read lesson parts 1-4 (4)" used to take the student to the chapter page and leave them to find the place. Now the sheet shows part 1 as it is
 * printed in the book (the book's own renderer, with its translations, word meanings, figures and worked examples), and a button at the bottom:
 * "Read & next" shows part 2, and so on; each press counts the part as read on the task ("done 1 / 4"). The last part offers
 * "I've finished — test me", which opens the check of questions (js/sb_mastery.js). A student who comes back later starts at the first part not read yet.
 *
 * Where the parts come from: the chapter of the plan is the unit of the book (CLSn_BOOKS[key].units[chapter], or MATH_n_DATA[chapter] for the Maths of
 * Classes 5, 6, 7, 8 and 11); its lesson parts are the sections that are not SLOs, questions, exercises or reviews — the very rule that
 * tools/study_plan/extract_in_page.js counted them with, so "part 3" of a task is the third such section (tests/plan/study_sheet_data.js checks this
 * for every chapter of every subject against js/study_plan_index.js). A subject whose book is not in that form has no sheet: partsFor() says null
 * and the plan takes the student to the chapter page, as before.
 *
 *   SBStudySheet.partsFor(classId, subjectId, chapter, from, to) -> [{no, title, html()}] | null
 *   SBStudySheet.open({title, sub, parts, start, onRead(n), onFinish(), onOpenBook(), onClose()})
 * Public: window.SBStudySheet (and module.exports in Node). Used by js/sb_study_plan.js. */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.SBStudySheet = api;
})(typeof window !== 'undefined' ? window : null, function (win) {
  'use strict';
  // the book key of a subject where it is not the end of the subject id (js/app.js openSubject: cls9-phy is CLS9_BOOKS.phys, cls11-cs is comp ...)
  const KEY = {'cls9-phy': 'phys', 'cls10-phy': 'phys', 'cls11-phy': 'phys', 'cls12-phy': 'phys', 'cls11-ishist': 'islhist', 'cls11-cs': 'comp',
    'cls11-ikhtiari': 'islopt', 'cls11-mq': 'quran', 'cls11-isl': 'islc', 'cls12-pak': 'pakstudy'};
  const MATH_READER = {5: ['MATH5_READER', 'm5'], 6: ['MATH6_READER', 'm6'], 7: ['MATH7_READER', 'm7'], 8: ['MATH8_READER', 'm8'], 11: ['MATH11_READER', 'm11']};

  // ---------------------------------------------------------------- which sections are lesson parts (the same rule as tools/study_plan/extract_in_page.js)
  const CAT = [
    /true\s*(\/|or|and|-)?\s*false|truefalse|\btf\b|درست.{0,8}غلط|صحیح.{0,8}غلط|سم.{0,8}ناسم/i,
    /blank|fill in|fill the|خالی/i,
    /match|column|ملاپ|ملائیں|جوڑ/i,
    /\bmcqs?\b|multiple.?choice|choose the (correct|right|best)|correct (option|answer)|encircle|tick|کثیر الانتخاب|درست جواب|صحیح جواب|څو ځوابه|سم ځواب/i,
    /comprehensive|\blong\b|detail|descriptive|essay|extensive|\blqs?\b|تفصیلی|طویل|اوږد/i,
    /conceptual|\bshort\b|brief|\bsqs?\b|مختصر|لنډ/i,
    /numerical|problems?\b|calculat|عددی/i,
    /\bslos?\b|learning outcome|objectives?\b|حاصلات|تدریسی مقاصد/i
  ];
  const classified = s => { s = String(s || ''); return CAT.some(rx => rx.test(s)); };
  const isLesson = s => !classified((s && (s.title || s.heading || s.kind || s.status)) || '') && !/exercise|assessment|review|مشق|تمرین/i.test(String(s && (s.title || s.heading || s.status) || ''));

  // ---------------------------------------------------------------- the book of a plan subject
  function bookOf(classId, subjId) {
    const n = parseInt(String(classId).replace(/\D/g, ''), 10) || 0;
    const key = KEY[subjId] || String(subjId).replace(/^cls\d+-/, '');
    let b = null;
    try { const B = win['CLS' + n + '_BOOKS']; b = B && B[key]; } catch (e) { b = null; }           // reading the key loads the book's file (js/core/lazy.js)
    if (b && Array.isArray(b.units) && b.units.length) return {n, key, units: b.units, words: b.words, book: b.book, cls: true};
    if (key === 'math' && MATH_READER[n]) {                                                          // MATH_n_DATA is a top-level const: not a property of window
      try {
        const d = (0, eval)('typeof MATH_' + n + '_DATA !== "undefined" ? MATH_' + n + '_DATA : null');
        if (d && d.length) return {n, key, units: d, words: null, book: (0, eval)('typeof MATH_' + n + '_BOOK !== "undefined" ? MATH_' + n + '_BOOK : null'), cls: false};
      } catch (e) { /* no such book */ }
    }
    return null;
  }

  // ---------------------------------------------------------------- one part as the book prints it
  function renderPart(bk, section) {
    // the exercise that follows a lesson in the same section has tasks of its own in the plan
    const list = (section.blocks || []).filter(b => !(b && b.t === 'exercise'));
    if (!list.length) return '';
    const ctx = {noPages: true, showAnswers: false};
    // the page's own skins (js/sb_book_skin.js) and right-to-left rule (js/sb_rtl.js) decide from the subject that is open behind the sheet: here they must leave the text
    // as its reader draws it (data-c1 is the skin's "done" mark; data-sb-fixed-dir is read by sb_rtl.js)
    const plain = h => h.replace(/^<div class="/, '<div data-c1="0" class="');
    if (bk.cls) {
      const R = win.MATH6_READER; if (!R) return '';
      return plain(R.withBook(bk.words, bk.book, () => R.root(R.blocks(list, ctx))));
    }
    const [name, px] = MATH_READER[bk.n], R = win[name]; if (!R) return '';
    if (R.root) return plain(R.root(R.blocks(list, ctx)));
    return '<div data-c1="0" class="' + px + '-root" data-sbmode="' + (win.SB_LANG_MODE || 0) + '">' + R.blocks(list, ctx) + '</div>';
  }

  /* The lesson parts from..to (1-based, as the plan numbers them) of a chapter, or null where the book is not in this form or has fewer parts.
   * total: how many parts the plan counted for the chapter (js/study_plan_index.js "read"); the same as the book's lesson sections in nearly every chapter
   * (then part n is section n); where the book has more sections, the sections are shared out over the plan's parts in order, so nothing of the chapter is left out. */
  function partsFor(classId, subjId, chapter, from, to, total) {
    const bk = bookOf(classId, subjId); if (!bk) return null;
    const unit = bk.units[chapter]; if (!unit || !Array.isArray(unit.sections)) return null;
    const lessons = unit.sections.filter(isLesson), L = lessons.length;
    const R = Math.max(1, total | 0) || L, a = Math.max(1, from | 0), b = Math.max(a, to | 0);
    if (!L || b > R || R > L) return null;
    const out = [];
    for (let i = a; i <= b; i++) {
      const lo = Math.floor((i - 1) * L / R), hi = Math.floor(i * L / R), secs = lessons.slice(lo, hi);
      const title = ss => String(ss.title || ss.heading || '').trim();
      out.push({no: i, sections: secs.map((x, k) => lo + k + 1), title: title(secs[0]), titleUr: String(secs[0].titleUrdu || '').trim(),
        html: () => secs.map((x, k) => (secs.length > 1 && k > 0 && title(x) ? '<h3 class="sbss-st">' + esc(title(x)) + '</h3>' : '') + renderPart(bk, x)).join('')});
    }
    return out;
  }
  const lessonCount = (classId, subjId, chapter) => {
    const bk = bookOf(classId, subjId), u = bk && bk.units[chapter];
    return u && Array.isArray(u.sections) ? u.sections.filter(isLesson).length : null;
  };

  // ---------------------------------------------------------------- the sheet
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const CSS = `
#sbss{position:fixed;inset:0;z-index:10050;background:rgba(15,23,42,.62);display:flex;align-items:flex-end;justify-content:center;color:#0f172a;-webkit-tap-highlight-color:transparent}
#sbss *{box-sizing:border-box}
.sbss-card{background:#fff;width:min(940px,100%);height:100%;max-height:100%;display:flex;flex-direction:column;outline:0;box-shadow:0 -12px 40px -10px rgba(15,23,42,.45)}
@media (min-width:760px){#sbss{align-items:center;padding:2vh 0}.sbss-card{height:96%;border-radius:22px;overflow:hidden}}
.sbss-head{display:flex;align-items:center;gap:.6rem;padding:.75rem .9rem .5rem 1.1rem;background:linear-gradient(135deg,#0369a1,#0ea5e9);color:#fff}
.sbss-ttl{flex:1;min-width:0}.sbss-ttl b{display:block;font-size:1.02rem;line-height:1.3}.sbss-ttl span{display:block;font-size:.8rem;opacity:.9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sbss-x{border:0;background:rgba(255,255,255,.2);color:#fff;border-radius:50%;width:38px;height:38px;font-size:1.4rem;line-height:1;cursor:pointer;flex:none}
.sbss-prog{padding:.55rem 1.1rem .45rem;background:#f0f9ff;border-bottom:1px solid #e0f2fe}.sbss-prog small{display:flex;justify-content:space-between;gap:.8rem;font-size:.82rem;color:#0c4a6e;margin-bottom:.3rem;font-weight:700}
.sbss-prog small span:last-child{font-weight:600;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.sbss-bar{display:flex;gap:3px;height:7px}.sbss-bar i{flex:1;border-radius:99px;background:#bae6fd}.sbss-bar i.done{background:#0284c7}.sbss-bar i.now{background:#22c55e}
.sbss-body{flex:1;min-height:0;overflow:auto;-webkit-overflow-scrolling:touch;padding:1rem 1.1rem 1.4rem}
.sbss-pt{margin:0 0 .6rem;font-size:1.15rem;font-weight:800;color:#0f172a}.sbss-pt small{display:block;font-weight:600;color:#475569;font-size:.9rem}
.sbss-st{margin:1.2rem 0 .5rem;font-size:1.02rem;font-weight:800;color:#075985;border-top:1px dashed #cbd5e1;padding-top:.8rem}
.sbss-empty{padding:1.5rem 1rem;text-align:center;color:#475569;background:#f8fafc;border-radius:14px}
.sbss-foot{display:flex;gap:.6rem;padding:.7rem 1rem calc(.7rem + env(safe-area-inset-bottom,0px));border-top:1px solid #e2e8f0;background:#fff}
.sbss-btn{font:inherit;font-weight:800;font-size:1.02rem;padding:.8rem 1.2rem;border-radius:14px;border:2px solid #0284c7;background:#0284c7;color:#fff;cursor:pointer;min-height:50px}
.sbss-btn.main{flex:1}.sbss-btn.alt{background:#fff;color:#0369a1}.sbss-btn.fin{background:#15803d;border-color:#15803d}
.sbss-link{background:none;border:0;font:inherit;font-size:.82rem;color:#475569;text-decoration:underline;cursor:pointer;padding:.2rem 0 0;display:block;margin:.2rem auto 0}
body.sbss-lock{overflow:hidden}
@media print{#sbss{display:none}}`;
  const addCss = () => { if (typeof document === 'undefined' || document.getElementById('sbss-css')) return; const s = document.createElement('style'); s.id = 'sbss-css'; s.textContent = CSS; document.head.appendChild(s); };

  const S = {el: null, o: null, i: 0};
  function paint() {
    const o = S.o, n = o.parts.length, i = S.i, p = o.parts[i], last = i === n - 1;
    let html = '';
    try { html = p.html(); } catch (e) { html = ''; }
    const bar = o.parts.map((x, k) => '<i class="' + (k < i ? 'done' : k === i ? 'now' : '') + '"></i>').join('');
    S.el.querySelector('.sbss-prog').innerHTML = '<small><span>Part ' + (i + 1) + ' of ' + n + '</span><span>' + esc(p.title) + '</span></small><div class="sbss-bar" aria-hidden="true">' + (n <= 40 ? bar : '') + '</div>';
    S.el.querySelector('.sbss-body').innerHTML = '<div data-sb-fixed-dir>' + (p.title ? '<h2 class="sbss-pt">' + esc(p.title) + (p.titleUr ? '<small lang="ur" dir="rtl">' + esc(p.titleUr) + '</small>' : '') + '</h2>' : '') +
      (html || '<div class="sbss-empty">This part has no text of its own — its questions are in the tasks that follow.</div>') + '</div>';
    S.el.querySelector('.sbss-foot').innerHTML = (i > 0 ? '<button type="button" class="sbss-btn alt" data-a="back" data-no-translate>◀ Back</button>' : '') +
      (last ? '<button type="button" class="sbss-btn main fin" data-a="finish" data-no-translate data-focus>🧠 I\'ve finished — test me</button>'
        : '<button type="button" class="sbss-btn main" data-a="next" data-no-translate data-focus>✔ Read &amp; next ▶</button>');
    S.el.querySelectorAll('.sbss-head, .sbss-prog').forEach(e => e.setAttribute('data-no-translate', ''));
    S.el.querySelector('.sbss-body').scrollTop = 0;
    const f = S.el.querySelector('[data-focus]'); if (f) { try { f.focus({preventScroll: true}); } catch (e) { /* hidden */ } }
  }
  function close() {
    if (!S.el) return;
    document.removeEventListener('keydown', onKey, true); document.body.classList.remove('sbss-lock');
    S.el.remove(); S.el = null;
    const o = S.o; S.o = null;
    if (o && o.onClose) { try { o.onClose(); } catch (e) { /* the plan keeps working */ } }
  }
  function onKey(e) {
    if (!S.el) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (e.key === 'Tab') {
      const f = [...S.el.querySelectorAll('button:not([disabled])')].filter(x => x.offsetParent !== null); if (!f.length) return;
      const k = f.indexOf(document.activeElement);
      if (e.shiftKey && k <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && k === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  }
  function onClick(e) {
    const b = e.target.closest('[data-a]'); if (!b || !S.o) return;
    const a = b.dataset.a, o = S.o;
    if (a === 'close') close();
    else if (a === 'back') { S.i = Math.max(0, S.i - 1); paint(); }
    else if (a === 'next') {
      if (o.onRead) { try { o.onRead(S.i + 1); } catch (er) { /* fine */ } }                       // the part just read
      S.i = Math.min(o.parts.length - 1, S.i + 1); paint();
    }
    else if (a === 'finish') { if (o.onFinish) { try { o.onFinish(); } catch (er) { /* fine */ } } }
    else if (a === 'book') { const f = o.onOpenBook; close(); if (f) f(); }
  }

  /* Opens the sheet. o: {title, sub, parts: [{title, titleUr, html()}], start (index of the first part to show), onRead(n) (n parts are read),
   * onFinish() (the student pressed "I've finished — test me"; the page decides whether the sheet closes: close()), onOpenBook(), onClose()}. */
  function open(o) {
    addCss();
    if (S.el) close();
    if (!o || !o.parts || !o.parts.length) return false;
    S.o = o; S.i = Math.max(0, Math.min(o.parts.length - 1, o.start | 0));
    const el = document.createElement('div'); el.id = 'sbss'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'sbss-t');
    el.innerHTML = '<div class="sbss-card" tabindex="-1"><div class="sbss-head"><div class="sbss-ttl"><b id="sbss-t">📖 ' + esc(o.title || 'Lesson') + '</b><span>' + esc(o.sub || '') + '</span></div>' +
      (o.onOpenBook ? '<button type="button" class="sbss-x" style="width:auto;border-radius:99px;padding:0 .8rem;font-size:.8rem;font-weight:700" data-a="book" data-no-translate title="Open this chapter in the book">Book ↗</button>' : '') +
      '<button type="button" class="sbss-x" data-a="close" aria-label="Close" data-no-translate>×</button></div><div class="sbss-prog"></div><div class="sbss-body"></div><div class="sbss-foot"></div></div>';
    el.addEventListener('click', e => { if (e.target === el) close(); else onClick(e); });
    document.body.appendChild(el); document.body.classList.add('sbss-lock'); document.addEventListener('keydown', onKey, true);
    S.el = el;
    paint();
    return true;
  }

  return {partsFor, lessonCount, bookOf, isLesson, open, close, state: S, isOpen: () => !!S.el};
});
