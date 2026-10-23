/* ======================================================================
 *  continue_learning.js — "Continue where you left off"
 *
 *  Remembers the last lesson a student opened in every subject (this
 *  browser only) and offers to jump straight back:
 *    • a "Continue learning" strip on Home, the Classes page and each
 *      class's subject page (most recent lessons first)
 *    • a small resume pill when a subject is reopened at its first lesson
 *
 *  Works by wrapping app.js navigation functions (openSubject and the
 *  chapter openers), so no reader needs to change. Loaded after app.js.
 * ====================================================================== */
(function () {
  'use strict';

  const KEY = 'sbContinue:v1';
  const MAX_RECENT = 60;
  // when a select* opener calls a render* one, the outer call is recorded last and wins
  const CHAPTER_FNS = ['selectSubjectChapter', 'selectMathChapter', 'selectEngChapter', 'selectUrduChapter', 'selectIslChapter',
    'selectPhysChapter', 'selectChemChapter', 'selectBioChapter', 'selectPakStudyChapter', 'renderMathChapter', 'renderBioChapter', 'renderChemChapter',
    'renderPhysChapter', 'renderUrduChapter', 'renderIslChapter', 'renderPakStudyChapter', 'openGenericChapterDetails'];

  // ── storage (per-viewer convenience; must never break the page) ─────────
  function load() {
    try { const v = JSON.parse(localStorage.getItem(KEY) || '{}'); return v && typeof v === 'object' ? v : {}; } catch (e) { return {}; }
  }
  function save(db) { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { /* private mode */ } }

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const appState = () => { try { return state; } catch (e) { return {}; } }; // app.js top-level `let state`

  function subjectInfo(classId, subjId) {
    try {
      const cls = (DATA.classes || []).find(c => c.id === classId) || {};
      const sub = ((DATA.subjects || {})[classId] || []).find(s => s.id === subjId) || {};
      return { className: cls.name || classId, subjName: sub.name || subjId, subjUrdu: sub.nameUrdu || '', emoji: sub.emoji || '📘' };
    } catch (e) { return { className: classId, subjName: subjId, subjUrdu: '', emoji: '📘' }; }
  }

  // ── tracking ────────────────────────────────────────────────────────────
  let current = null;        // { classId, subjId } of the subject on screen
  let openedAt = 0;          // when that subject was opened
  let opening = false;       // openSubject() is running (its own auto-open of lesson 1 is not progress)
  let resuming = false;      // we are replaying a saved lesson

  function activeChapterTitle(index) {
    const sel = '.bio-ch-btn.active, .math-ch-btn.active, .chapter-btn.active, .ch-btn.active, [class*="ch-btn"].active, [class*="chapter"].active';
    let el = document.querySelector(sel);
    if (!el) {
      const list = [...document.querySelectorAll('[onclick*="selectSubjectChapter"], [onclick*="Chapter("]')].filter(e => e.offsetParent);
      el = list[index] || null;
    }
    if (!el) return '';
    return el.textContent.replace(/\s+/g, ' ').trim().slice(0, 90);
  }

  function record(fn, args) {
    if (!current || resuming) return;
    const index = typeof args[1] === 'number' ? args[1] : (typeof args[0] === 'number' ? args[0] : (fn === 'openGenericChapterDetails' ? args[3] : null));
    // the reader opening its first lesson automatically is not "progress"
    if (opening || (index === 0 && Date.now() - openedAt < 600)) return;
    const db = load();
    const key = current.classId + '|' + current.subjId;
    const prev = db[key] || {};
    setTimeout(() => {
      const title = activeChapterTitle(typeof index === 'number' ? index : 0) || prev.title || '';
      const d = load();
      const old = d[key] || prev;
      // every lesson ever opened in this subject, for progress ticks
      const done = Array.isArray(old.done) ? old.done.slice() : [];
      if (typeof index === 'number' && !done.includes(index)) done.push(index);
      const total = document.querySelectorAll('.math-ch-list [onclick*="Chapter("]').length || old.total || 0;
      d[key] = { classId: current ? current.classId : prev.classId, subjId: current ? current.subjId : prev.subjId, fn, args, index, title, ts: Date.now(), done, total };
      // keep only the most recent subjects
      const keys = Object.keys(d).sort((a, b) => d[b].ts - d[a].ts);
      keys.slice(MAX_RECENT).forEach(k => delete d[k]);
      save(d);
      document.dispatchEvent(new CustomEvent('sbcontinue:record', { detail: { entry: d[key] } }));       // js/sb_library.js sends the place to the account
    }, 60);
  }

  function wrap(name, after) {
    if (typeof window[name] !== 'function') return;
    SBHooks.use(name, function (orig) {
      return function () {
        const out = orig.apply(this, arguments);
        try { after(Array.prototype.slice.call(arguments)); } catch (e) { /* never break navigation */ }
        return out;
      };
    });
  }

  // openSubject: remember which subject is open, then offer to resume
  (function () {
    if (typeof window.openSubject !== 'function') return;
    SBHooks.use('openSubject', function (orig) { return function (classId, subjId) {
      hidePill(); // a pill from the previous subject must never linger
      current = { classId, subjId };
      openedAt = Date.now();
      opening = true;
      let out;
      try { out = orig.apply(this, arguments); } finally { opening = false; }
      if (!resuming) setTimeout(() => offerResume(classId, subjId), 350);
      return out;
    }; });
  })();

  CHAPTER_FNS.forEach(fn => wrap(fn, args => record(fn, args)));

  // ── resuming ────────────────────────────────────────────────────────────
  function resume(entry) {
    if (!entry) return;
    hidePill();
    resuming = true;
    try {
      window.openSubject(entry.classId, entry.subjId);
    } catch (e) { resuming = false; return; }
    setTimeout(() => {
      try {
        const f = window[entry.fn];
        if (typeof f === 'function') f.apply(window, entry.args || []);
        const area = document.getElementById('subjectTopicArea');
        if (area && area.scrollIntoView) area.scrollIntoView({ block: 'start' });
        else window.scrollTo(0, 0);
      } catch (e) { /* lesson may no longer exist */ }
      resuming = false;
      // refresh timestamp so it stays at the front of the list
      const db = load(); const k = entry.classId + '|' + entry.subjId;
      if (db[k]) { db[k].ts = Date.now(); save(db); }
      document.dispatchEvent(new CustomEvent('sbcontinue:resumed', { detail: { entry } }));            // the tab and page of a place saved on another device
    }, 120);
  }

  function lessonLabel(e) {
    // unit lists start with a short badge ("4", "R1", "1-ج") — separate it from the title
    if (e.title) return e.title.replace(/^(\S{1,4})\s+(?=\S)/, '$1 · ');
    return typeof e.index === 'number' ? 'Lesson ' + (e.index + 1) : 'Last lesson';
  }

  // ── resume pill (shown when a subject reopens at its first lesson) ──────
  let pill = null, pillTimer = 0;
  function hidePill() { if (pill) pill.classList.remove('cl-show'); clearTimeout(pillTimer); }
  function offerResume(classId, subjId) {
    const e = load()[classId + '|' + subjId];
    if (!e || !current || current.subjId !== subjId) return;
    if (typeof e.index === 'number' && e.index === (appState().selectedSubjChapter || 0) && e.fn === 'selectSubjectChapter') return;
    if (!pill) {
      pill = document.createElement('div');
      pill.className = 'cl-pill';
      pill.setAttribute('role', 'status');
      document.body.appendChild(pill);
      pill.addEventListener('click', ev => {
        const b = ev.target.closest('button');
        if (!b) return;
        ev.stopPropagation();
        if (b.dataset.act === 'go') resume(pill._entry);
        else hidePill();
      });
    }
    pill._entry = e;
    pill.innerHTML =
      '<span class="cl-pill-icon" aria-hidden="true">↩</span>' +
      '<span class="cl-pill-text"><small>Continue where you left off</small><b>' + esc(lessonLabel(e)) + '</b></span>' +
      '<button type="button" class="cl-pill-go" data-act="go">Continue</button>' +
      '<button type="button" class="cl-pill-x" data-act="close" aria-label="Dismiss">✕</button>';
    pill.classList.add('cl-show');
    clearTimeout(pillTimer);
    pillTimer = setTimeout(hidePill, 9000);
  }

  // ── "Continue learning" strip ───────────────────────────────────────────
  function ago(ts) {
    const m = Math.round((Date.now() - ts) / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return m + ' min ago';
    const h = Math.round(m / 60);
    if (h < 24) return h + ' h ago';
    const d = Math.round(h / 24);
    return d === 1 ? 'yesterday' : d + ' days ago';
  }

  function stripHtml(entries, heading) {
    return '<section class="cl-strip" aria-label="Continue learning">' +
      '<div class="cl-row">' + entries.map((e, i) => {
        const s = subjectInfo(e.classId, e.subjId);
        return '<button type="button" class="cl-card" data-i="' + i + '">' +
          '<span class="cl-emoji" aria-hidden="true">' + esc(s.emoji) + '</span>' +
          '<span class="cl-body">' +
            '<span class="cl-meta">' + esc(s.className) + ' · ' + esc(s.subjName) + '</span>' +
            '<span class="cl-title">' + esc(lessonLabel(e)) + '</span>' +
            '<span class="cl-time">' + esc(ago(e.ts)) +
              (e.total && e.done ? ' · ' + Math.min(e.done.length, e.total) + ' of ' + e.total + ' lessons opened' : '') + '</span>' +
            (e.total && e.done ? '<span class="cl-bar"><i style="width:' + Math.round(100 * Math.min(1, e.done.length / e.total)) + '%"></i></span>' : '') +
          '</span>' +
          '<span class="cl-go" aria-hidden="true">›</span>' +
        '</button>';
      }).join('') + '</div></section>';
  }

  function injectStrip(classFilter) {
    hidePill();
    current = null;
    const host = document.getElementById('dashboard-body');
    if (!host) return;
    const old = host.querySelector(':scope > .cl-strip');
    if (old) old.remove();
    return; // the "Continue learning" history cards above the classes are switched off; tracking stays for the reader ticks
    let entries = Object.values(load()).filter(e => e && e.classId && e.subjId).sort((a, b) => b.ts - a.ts);
    if (classFilter) entries = entries.filter(e => e.classId === classFilter);
    entries = entries.slice(0, classFilter ? 3 : 4);
    if (!entries.length) return;
    const wrapEl = document.createElement('div');
    wrapEl.innerHTML = stripHtml(entries, classFilter ? 'Continue in ' + subjectInfo(classFilter, '').className : 'Continue learning');
    const strip = wrapEl.firstChild;
    strip.addEventListener('click', ev => {
      const b = ev.target.closest('button');
      if (!b) return;
      ev.stopPropagation();
      if (b.dataset.act === 'clear') { save({}); strip.remove(); return; }
      resume(entries[+b.dataset.i]);
    });
    host.insertBefore(strip, host.firstChild);
  }

  wrap('renderHome', () => injectStrip(null));
  wrap('renderClasses', () => injectStrip(null));
  wrap('goToSubjects', args => {
    const st = appState();
    if (st.activeView !== 'subject-detail') injectStrip(args[0]);
  });

  // the first screen was rendered before this file loaded
  function initial() {
    const st = appState();
    if (st.activeView === 'home' || st.activeView === 'classes') injectStrip(null);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(initial, 50));
  else setTimeout(initial, 50);

  window.SBContinue = {
    list: () => Object.values(load()).sort((a, b) => b.ts - a.ts),
    resume,
    clear: () => save({}),
    current: () => current,
    entry: (classId, subjId) => load()[classId + '|' + subjId] || null,
    // a place saved on another device (js/sb_library.js): kept when it is newer than what this browser knows
    adopt: e => {
      const db = load(), k = e.classId + '|' + e.subjId, old = db[k];
      if (old && old.ts >= e.ts) return false;
      db[k] = Object.assign({}, old || {}, e);
      save(db);
      return true;
    }
  };
})();
