/* ======================================================================
 *  sb_library.js — bookmarks, notes and highlights, the Saved page, "continue where you left off" across devices, "my class"
 *
 *  The same functions the Android app has natively, with the same stored data (js/core/items.js, api/lib/items.php):
 *    • a 🔖 and a 📝 on every page of a book (the printed page of a page-by-page book, otherwise a topic card)
 *    • select some words on a page: 🖍 Highlight or 📝 Note, and the words stay marked when the page is drawn again
 *    • a Saved page in the menu: bookmarks, notes and highlights; one click opens the page where they were made
 *    • the place where the student stopped in each book is saved (kind pos) and offered on any device
 *    • a ⭐ on a class page chooses "my class" (kind pref/class)
 *  Where a page is, is the same on both platforms: class id, subject id, chapter number in content/app_catalog.json,
 *  the tab (Lessons, Exercise ...) and the page number inside that tab (SBLocator.units below = reader_bridge.js collect()).
 *  Inside the Android app (html.sbapp) this file draws nothing: the app has its own controls and writes the same items.
 * ====================================================================== */
(function () {
  'use strict';
  const doc = document;
  const inApp = () => doc.documentElement.classList.contains('sbapp');
  const $ = (q, r) => (r || doc).querySelector(q);
  const $$ = (q, r) => Array.prototype.slice.call((r || doc).querySelectorAll(q));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const I = () => window.SBItems || null;
  const uuid = () => (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });

  // ── where the readable content is, and its pages (the same rule as assets/reader_bridge.js in the app) ──────────────
  function root() {
    const cands = ['#subjTabContent', '#mathTabContent', '#page-content'].map(q => $(q)).filter(Boolean);
    return cands.find(c => c.querySelector('.bk-page')) || cands[0] || null;
  }
  function collect() {
    const r = root();
    if (!r) return { mode: '', units: [] };
    const pages = $$('.bk-page', r);
    if (pages.length) return { mode: 'book', units: pages };
    let cards = Array.prototype.filter.call(r.children, c => c.nodeType === 1 && (c.offsetParent !== null || c.classList.contains('sbapp-hide')));
    cards = cards.filter(c => !/^(SCRIPT|STYLE)$/.test(c.tagName) && (c.textContent || '').trim().length > 0);
    return { mode: cards.length > 1 ? 'cards' : '', units: cards.length > 1 ? cards : [] };
  }
  function activeTab() {
    const b = $('.math-nav-tabs .active, .math-nav-tabs button.active, .topic-sub-tabs-bar .active');
    return b ? (b.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 30) : '';
  }
  const cleanTab = t => String(t || '').replace(/[^A-Za-z0-9 _-]/g, '').trim().slice(0, 30);

  // ── the catalog: chapter numbers and the call that opens each chapter ─────────────────────────────────────────────
  let catP = null;
  function catalog() {
    if (catP) return catP;
    catP = (async () => {
      let cat = null;
      try { const r = await fetch('content/app_catalog.json'); if (r.ok) cat = await r.json(); } catch (e) { cat = null; }
      if (cat && window.SBStore) { try { await window.SBStore.put('state', 'catalog', cat); } catch (e) { /* fine */ } }
      if (!cat && window.SBStore) { try { cat = await window.SBStore.get('state', 'catalog'); } catch (e) { cat = null; } }
      return cat;
    })();
    catP.then(c => { if (!c) catP = null; });
    return catP;
  }
  const subjectOf = (cat, id) => { for (const c of (cat && cat.classes) || []) for (const s of c.subjects) if (s.id === id) return { cls: c, subj: s }; return null; };
  const callOf = (fn, args) => fn + '(' + (args || []).map(a => (typeof a === 'number' ? String(a) : "'" + a + "'")).join(', ') + ')';
  // the two forms in the catalog; nothing else is ever run
  const CALL_RX = /^(selectSubjectChapter\('([a-z0-9_-]{1,30})', (\d{1,4}), '([a-z0-9_-]{1,24})'\)|selectMathChapter\((\d{1,4})\))$/;
  function parseCall(o) {
    const m = CALL_RX.exec(String(o || ''));
    if (!m) return null;
    return m[2] ? { fn: 'selectSubjectChapter', args: [m[2], +m[3], m[4]] } : { fn: 'selectMathChapter', args: [+m[5]] };
  }

  // ── where the student is now ──────────────────────────────────────────────────────────────────────────────────────
  // {c, s, ch, tb, p, t, n, subjName, emoji} or null when no book page is open
  async function here() {
    const C = window.SBContinue, cur = C && C.current && C.current();
    if (!cur) return null;
    // only while a book is on screen: the Saved page, a class page or Home keep the last subject in SBContinue but are not a place to save
    const st = (function () { try { return state; } catch (e) { return {}; } })();
    if (st.activeView && st.activeView !== 'subject-detail') return null;
    const e = C.entry(cur.classId, cur.subjId);
    if (!e) return null;
    const cat = await catalog(), found = subjectOf(cat, cur.subjId);
    let ch = typeof e.index === 'number' ? e.index : 0, title = e.title || '';
    if (found) {
      const o = callOf(e.fn, e.args), i = found.subj.chapters.findIndex(x => x.o === o);
      if (i >= 0) { ch = i; title = found.subj.chapters[i].t; }
      else if (found.subj.chapters[ch]) title = found.subj.chapters[ch].t;
    }
    const u = collect();
    let p = 0;
    if (u.units.length) {
      const y = innerHeight * 0.3;
      u.units.forEach((el, i) => { const r = el.getBoundingClientRect(); if (r.top <= y) p = i; });
    }
    return { c: cur.classId, s: cur.subjId, ch, tb: cleanTab(activeTab()), p, t: String(title).replace(/\s+/g, ' ').slice(0, 160), n: u.units.length,
      subjName: found ? found.subj.name : cur.subjId, emoji: found ? found.subj.emoji : '📘' };
  }
  const bmKey = l => l.s + '|' + l.ch + '|' + l.tb + '|' + l.p;
  const loc = l => ({ c: l.c, s: l.s, ch: l.ch, p: l.p, tb: l.tb, t: l.t });

  // ── opening a place ───────────────────────────────────────────────────────────────────────────────────────────────
  const wait = ms => new Promise(r => setTimeout(r, ms));
  async function until(fn, ms) { const end = Date.now() + (ms || 6000); for (;;) { const v = fn(); if (v) return v; if (Date.now() > end) return null; await wait(80); } }
  async function open(place) {
    const cat = await catalog(), found = subjectOf(cat, place.s);
    if (typeof window.openSubject !== 'function') return false;
    window.openSubject(place.c || (found && found.cls.id), place.s);
    const ch = found && found.subj.chapters[place.ch];
    const call = ch && parseCall(ch.o);
    if (call && typeof window[call.fn] === 'function') {
      await wait(150);
      try { window[call.fn].apply(window, call.args); } catch (e) { /* the subject stays on its first chapter */ }
    }
    if (place.tb) {
      const btn = await until(() => $$('.math-nav-tabs button, .topic-sub-tabs-bar button').find(b => cleanTab(b.textContent) === place.tb), 3000);
      if (btn) btn.click();
    }
    const unit = await until(() => { const u = collect().units; return u.length > place.p ? u[place.p] : null; }, 5000);
    if (unit) { unit.scrollIntoView({ block: 'start' }); flash(unit); }
    else window.scrollTo(0, 0);
    return true;
  }
  function flash(el) { el.classList.add('sbl-flash'); setTimeout(() => el.classList.remove('sbl-flash'), 2200); }

  // ── stored items (all through SBItems) ────────────────────────────────────────────────────────────────────────────
  const bookmarkAt = l => (I() ? I().get('bm', bmKey(l)) : null);
  const notesAt = l => (I() ? I().list('note').filter(x => x.value.s === l.s && x.value.ch === l.ch && x.value.p === l.p && (x.value.tb || '') === l.tb) : []);
  async function toggleBookmark(l) {
    if (!I()) return false;
    if (bookmarkAt(l)) { await I().del('bm', bmKey(l)); return false; }
    await I().put('bm', bmKey(l), loc(l));
    return true;
  }
  async function saveNote(l, text, quote, kind, id) {
    id = id || uuid();
    const v = Object.assign(loc(l), { x: String(text || '').slice(0, 2000), q: String(quote || '').slice(0, 500), k: kind === 'hl' ? 'hl' : 'note' });
    await I().put('note', id, v);
    return id;
  }

  // ── the controls on every page ────────────────────────────────────────────────────────────────────────────────────
  let pending = null;
  function decorate() {
    pending = null;
    if (inApp() || !I()) return;
    const r = root();
    if (!r) return;
    const u = collect();
    u.units.forEach((el, i) => {
      el.dataset.sblIdx = String(i);
      let bar = el.querySelector('.sbl-tools');
      if (!bar) {
        bar = doc.createElement('div');
        bar.className = 'sbl-tools';
        bar.setAttribute('role', 'group');
        bar.setAttribute('aria-label', 'Save this page');
        bar.innerHTML = '<button type="button" class="sbl-btn" data-sbl="bm" aria-pressed="false" title="Bookmark this page">🔖<span class="sbl-sr"> Bookmark</span></button>' +
          '<button type="button" class="sbl-btn" data-sbl="note" title="Notes on this page">📝<span class="sbl-sr"> Notes</span><b class="sbl-n" hidden></b></button>';
        if (u.mode === 'cards') { const h = el.querySelector('.math-acc-header'); (h || el).appendChild(bar); } else el.insertBefore(bar, el.firstChild);
        if (u.mode === 'book' && getComputedStyle(el).position === 'static') el.style.position = 'relative';
      }
    });
    if (u.mode === 'cards' && window.SBA11y) u.units.forEach(el => { try { window.SBA11y.enhance(el); } catch (e) { /* never break the page */ } });   // a header that now holds buttons is no longer a button itself
    if (obs) obs.takeRecords();
    refreshTools();
    applyMarks();
  }
  function schedule() { if (!pending) pending = setTimeout(decorate, 220); }
  async function refreshTools() {
    const l = await here();
    if (!l) return;
    const units = collect().units;
    units.forEach((el, i) => {
      const bar = el.querySelector('.sbl-tools');
      if (!bar) return;
      const at = Object.assign({}, l, { p: i });
      const on = !!bookmarkAt(at), n = notesAt(at).length;
      const b = bar.querySelector('[data-sbl="bm"]'), nb = bar.querySelector('[data-sbl="note"]'), cnt = bar.querySelector('.sbl-n');
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
      nb.classList.toggle('on', n > 0); cnt.hidden = !n; cnt.textContent = String(n);
    });
  }
  doc.addEventListener('click', async ev => {
    const btn = ev.target.closest && ev.target.closest('.sbl-tools [data-sbl]');
    if (!btn || inApp()) return;
    ev.preventDefault(); ev.stopPropagation();
    const unit = btn.closest('[data-sbl-idx]');
    const l = await here();
    if (!unit || !l) return;
    l.p = +unit.dataset.sblIdx;
    if (btn.dataset.sbl === 'bm') { await toggleBookmark(l); refreshTools(); }
    else openEditor(l, '', 'note');
  }, true);

  // ── the note editor ───────────────────────────────────────────────────────────────────────────────────────────────
  let modal = null;
  function closeEditor() { if (modal) { modal.remove(); modal = null; } }
  function openEditor(l, quote, kind, editId) {
    closeEditor();
    modal = doc.createElement('div');
    modal.className = 'sbl-modal';
    modal.innerHTML = '<div class="sbl-card" role="dialog" aria-modal="true" aria-label="Notes on this page"><button type="button" class="sbl-x" aria-label="Close">✕</button>' +
      '<h3>' + esc(l.subjName) + ' · page ' + (l.p + 1) + '</h3><p class="sbl-sub">' + esc(l.t) + '</p><div class="sbl-list"></div>' +
      (quote ? '<blockquote class="sbl-quote">' + esc(quote) + '</blockquote>' : '') +
      '<textarea class="sbl-text" rows="4" maxlength="2000" placeholder="Write a note…" aria-label="Note"></textarea>' +
      '<div class="sbl-row"><button type="button" class="sbl-save">Save note</button>' + (quote ? '<button type="button" class="sbl-hl-only">Just highlight</button>' : '') + '</div></div>';
    doc.body.appendChild(modal);
    const list = $('.sbl-list', modal), ta = $('.sbl-text', modal);
    const draw = () => {
      list.innerHTML = notesAt(l).map(n => '<div class="sbl-item" data-id="' + esc(n.key) + '">' + (n.value.q ? '<q>' + esc(n.value.q) + '</q>' : '') +
        (n.value.x ? '<div>' + esc(n.value.x) + '</div>' : '') + '<button type="button" class="sbl-del" aria-label="Delete this note">🗑</button></div>').join('');
    };
    draw();
    if (editId) { const n = I().get('note', editId); if (n) ta.value = n.x || ''; }
    modal.addEventListener('click', async ev => {
      if (ev.target === modal || ev.target.closest('.sbl-x')) { closeEditor(); return; }
      const del = ev.target.closest('.sbl-del');
      if (del) { await I().del('note', del.closest('.sbl-item').dataset.id); draw(); refreshTools(); applyMarks(); return; }
      if (ev.target.closest('.sbl-save')) {
        const text = ta.value.trim();
        if (!text && !quote) return;
        await saveNote(l, text, quote, text ? 'note' : 'hl', editId);
        closeEditor(); refreshTools(); applyMarks();
      } else if (ev.target.closest('.sbl-hl-only')) {
        await saveNote(l, '', quote, 'hl'); closeEditor(); refreshTools(); applyMarks();
      }
    });
    modal.addEventListener('keydown', ev => { if (ev.key === 'Escape') closeEditor(); });
    ta.focus();
  }

  // ── selected words: Highlight / Note ──────────────────────────────────────────────────────────────────────────────
  let pop = null;
  function hidePop() { if (pop) { pop.remove(); pop = null; } }
  function selectionInfo() {
    const sel = window.getSelection && window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return null;
    const text = String(sel).replace(/\s+/g, ' ').trim();
    if (text.length < 3 || text.length > 500) return null;
    const range = sel.getRangeAt(0);
    const node = range.commonAncestorContainer.nodeType === 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
    const unit = node && node.closest && node.closest('[data-sbl-idx]');
    if (!unit || node.closest('.sbl-tools, .sbl-modal, textarea, input')) return null;
    return { text, unit, rect: range.getBoundingClientRect() };
  }
  function showPop() {
    if (inApp() || !I()) return;
    const s = selectionInfo();
    if (!s) { hidePop(); return; }
    hidePop();
    pop = doc.createElement('div');
    pop.className = 'sbl-pop';
    pop.innerHTML = '<button type="button" data-a="hl">🖍 Highlight</button><button type="button" data-a="note">📝 Note</button>';
    pop.style.left = Math.max(8, Math.min(innerWidth - 190, s.rect.left + scrollX)) + 'px';
    pop.style.top = (s.rect.bottom + scrollY + 6) + 'px';
    doc.body.appendChild(pop);
    pop.addEventListener('mousedown', e => e.preventDefault());       // keep the selection while the button is pressed
    pop.addEventListener('click', async e => {
      const b = e.target.closest('button');
      if (!b) return;
      const l = await here();
      hidePop();
      if (!l) return;
      l.p = +s.unit.dataset.sblIdx;
      try { window.getSelection().removeAllRanges(); } catch (err) { /* fine */ }
      if (b.dataset.a === 'hl') { await saveNote(l, '', s.text, 'hl'); refreshTools(); applyMarks(); }
      else openEditor(l, s.text, 'note');
    });
  }
  let selTimer = 0;
  doc.addEventListener('selectionchange', () => { clearTimeout(selTimer); selTimer = setTimeout(showPop, 350); });
  doc.addEventListener('mousedown', e => { if (pop && !e.target.closest('.sbl-pop')) hidePop(); }, true);

  // marks: the words of a highlight or note, wrapped in <mark> when they sit in one text node
  async function applyMarks() {
    if (inApp() || !I()) return;
    const l = await here();
    if (!l) return;
    $$('mark.sbl-mark').forEach(m => { const t = m.parentNode; m.replaceWith(doc.createTextNode(m.textContent)); if (t) t.normalize(); });
    const units = collect().units;
    I().list('note').forEach(n => {
      const v = n.value;
      if (!v.q || v.s !== l.s || v.ch !== l.ch || (v.tb || '') !== l.tb || !units[v.p]) return;
      const walker = doc.createTreeWalker(units[v.p], NodeFilter.SHOW_TEXT, { acceptNode: t => (t.parentElement && t.parentElement.closest('.sbl-tools, script, style, mark.sbl-mark, textarea')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
      // the quote as it was selected has its white space collapsed; the page may have line breaks or double spaces in the same place
      const rx = new RegExp(v.q.trim().split(/\s+/).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+'));
      for (let t = walker.nextNode(); t; t = walker.nextNode()) {
        const m = rx.exec(t.nodeValue);
        if (m) { wrapMark(t, m.index, m[0].length, n); break; }
      }
    });
    if (obs) obs.takeRecords();                                  // our own marks are not a reason to draw the page tools again
  }
  function wrapMark(textNode, at, len, n) {
    const r = doc.createRange();
    r.setStart(textNode, at); r.setEnd(textNode, at + len);
    const m = doc.createElement('mark');
    m.className = 'sbl-mark' + (n.value.k === 'note' && n.value.x ? ' has-note' : '');
    m.dataset.id = n.key;
    if (n.value.x) m.title = n.value.x;
    try { r.surroundContents(m); } catch (e) { /* the words cross an element: kept in the Saved list only */ }
  }
  doc.addEventListener('click', async ev => {
    const m = ev.target.closest && ev.target.closest('mark.sbl-mark');
    if (!m || inApp() || !I()) return;
    const l = await here();
    const n = l && I().get('note', m.dataset.id);
    if (!l || !n) return;
    ev.stopPropagation();
    const unit = m.closest('[data-sbl-idx]');
    if (unit) l.p = +unit.dataset.sblIdx;
    openEditor(l, n.q || '', n.k, m.dataset.id);
  }, true);

  // ── reading position: saved as the student reads, offered on the other device ────────────────────────────────────
  let posTimer = 0, lastPos = '';
  function savePosition() {
    clearTimeout(posTimer);
    posTimer = setTimeout(async () => {
      if (inApp() || !I()) return;
      const l = await here();
      if (!l) return;
      const v = { c: l.c, ch: l.ch, p: l.p, tb: l.tb, n: l.n, t: l.t };
      const sig = l.s + JSON.stringify(v);
      if (sig === lastPos) return;
      lastPos = sig;
      I().put('pos', l.s, v);
    }, 2500);
  }
  doc.addEventListener('sbcontinue:record', savePosition);
  window.addEventListener('scroll', () => { if (!inApp()) savePosition(); }, { passive: true });

  // a stop made on another device becomes this browser's "continue" entry for the subject
  async function adoptPosition(subject, v, at) {
    const C = window.SBContinue;
    if (!C || !C.adopt) return;
    const cat = await catalog(), found = subjectOf(cat, subject);
    if (!found) return;
    const ch = found.subj.chapters[v.ch];
    const call = ch && parseCall(ch.o);
    if (!call) return;
    C.adopt({ classId: v.c || found.cls.id, subjId: subject, fn: call.fn, args: call.args, index: v.ch, title: ch.t, ts: at, page: v.p, tab: v.tb || '' });
  }
  if (I()) I().on('change', e => {
    if (e.origin === 'remote' && e.kind === 'pos' && e.value) adoptPosition(e.key, e.value, e.at || Date.now());
    if (e.kind === 'bm' || e.kind === 'note') { refreshTools(); applyMarks(); if (onSaved()) renderSaved(); }
    if (e.origin === 'remote' && e.kind === 'pref' && e.key === 'class') paintMyClass();
  });
  doc.addEventListener('sbcontinue:resumed', async ev => {
    const e = ev.detail && ev.detail.entry;
    if (!e || inApp() || (typeof e.page !== 'number' && !e.tab)) return;
    const unit = await until(() => { const u = collect().units; return u.length > (e.page || 0) ? u[e.page || 0] : null; }, 5000);
    if (e.tab) { const btn = $$('.math-nav-tabs button, .topic-sub-tabs-bar button').find(b => cleanTab(b.textContent) === cleanTab(e.tab)); if (btn) { btn.click(); await wait(250); } }
    const u2 = collect().units[e.page || 0] || unit;
    if (u2) { u2.scrollIntoView({ block: 'start' }); flash(u2); }
  });

  // ── my class ──────────────────────────────────────────────────────────────────────────────────────────────────────
  const myClass = () => { const c = I() && I().get('pref', 'class'); return c ? c.id : ''; };
  async function setMyClass(id) { if (I()) { await I().put('pref', 'class', { id }); paintMyClass(); } }
  function paintMyClass() {
    if (inApp()) return;
    const mine = myClass();
    $$('.class-jewel-card').forEach(b => {
      const m = /goToSubjects\('([^']+)'\)/.exec(b.getAttribute('onclick') || '');
      b.classList.toggle('sbl-mine', !!m && m[1] === mine);
      let tag = b.querySelector('.sbl-mine-tag');
      if (m && m[1] === mine && !tag) { tag = doc.createElement('span'); tag.className = 'sbl-mine-tag'; tag.textContent = '⭐ My class'; b.appendChild(tag); }
      else if (tag && !(m && m[1] === mine)) tag.remove();
    });
    const star = $('.sbl-class-star');
    if (star) {
      const id = star.dataset.cls;
      star.classList.toggle('on', id === mine);
      star.setAttribute('aria-pressed', id === mine ? 'true' : 'false');
      star.textContent = id === mine ? '⭐ My class' : '☆ Make this my class';
    }
  }
  function addClassStar() {
    if (inApp() || !I() || $('.sbl-class-star')) return;
    const st = (function () { try { return state; } catch (e) { return {}; } })();
    if (!st.selectedClass || st.activeView !== 'subjects') return;
    const host = $('#dashboard-body') || $('#page-content');
    if (!host) return;
    const b = doc.createElement('button');
    b.type = 'button'; b.className = 'sbl-class-star'; b.dataset.cls = st.selectedClass;
    b.addEventListener('click', () => setMyClass(b.dataset.cls === myClass() ? '' : b.dataset.cls).catch(() => {}));
    host.insertBefore(b, host.firstChild);
    paintMyClass();
  }
  if (window.SBHooks) {
    ['goToSubjects', 'renderClasses'].forEach(fn => {
      if (typeof window[fn] !== 'function') return;
      SBHooks.use(fn, next => function () {
        const out = next.apply(this, arguments);
        setTimeout(() => { addClassStar(); paintMyClass(); }, 30);
        return out;
      });
    });
  }

  // ── the Saved page ────────────────────────────────────────────────────────────────────────────────────────────────
  const onSaved = () => { try { return state.activeView === 'saved'; } catch (e) { return false; } };
  async function renderSaved() {
    const host = $('#dashboard-body') || $('#page-content');
    if (!host || !I()) return;
    try { state.activeView = 'saved'; state.page = 'saved'; } catch (e) { /* app state optional */ }
    ['subpage-nav-bar', 'dash-header'].forEach(id => { const el = doc.getElementById(id); if (el) el.style.display = 'none'; });
    const cat = await catalog();
    const nameOf = x => { const f = subjectOf(cat, x.s); return { subj: f ? f.subj.name : x.s, emoji: f ? f.subj.emoji : '📘', chapter: f && f.subj.chapters[x.ch] ? f.subj.chapters[x.ch].t : (x.t || '') }; };
    const marks = I().list('bm'), notes = I().list('note');
    const hl = notes.filter(m => m.value.q), nt = notes.filter(m => !m.value.q);
    const tint = ['blue', 'yellow', 'green', 'pink'];
    const row = (kind, key, v, body, i) => {
      const n = nameOf(v);
      return '<div class="sbl-row-item sbl2-item" data-kind="' + kind + '" data-key="' + esc(key) + '"><button type="button" class="sbl-open sbl2-sel"><span class="sbl2-cover">' + esc(n.emoji) + '</span><span class="sbl-body"><b>' + esc(n.chapter.replace(/\s+/g, ' ').slice(0, 120)) + '</b>' +
        '<small>' + esc(n.subj) + ' · ' + (v.tb ? esc(v.tb) + ' · ' : '') + 'Page ' + (v.p + 1) + '</small>' + (body ? '<span class="sbl2-quote sbl2-' + tint[(i || 0) % 4] + '">' + body + '</span>' : '') + '</span></button><button type="button" class="sbl-del" aria-label="Remove">🗑</button></div>';
    };
    const lists = {
      bm: marks.map((m, i) => row('bm', m.key, m.value, '', i)).join('') || '<p class="sbl-empty">Tap the bookmark on a page of a book and it shows up here.</p>',
      note: nt.map((m, i) => row('note', m.key, m.value, esc(m.value.x || ''), i)).join('') || '<p class="sbl-empty">Select some words on a page and choose Note.</p>',
      hl: hl.map((m, i) => row('note', m.key, m.value, esc(m.value.q), i)).join('') || '<p class="sbl-empty">Select some words on a page and choose Highlight.</p>'
    };
    host.innerHTML = '<section class="sbl-page sbl2"><div class="sbl2-head"><span class="sbl2-ic"><svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M6 3h12v18l-6-4-6 4z"/></svg></span><div><h2>My Saved Library</h2>' +
      '<p>' + (I().userId() ? 'Your bookmarks, notes and highlights from all your books, in one place.' : 'Sign in to keep them on every device. Until then they stay on this one.') + '</p></div>' +
      (I().userId() ? '<span class="sbl2-sync"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#12a05c" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/></svg><span><b>All changes saved</b><small>Follows your account</small></span></span>' : '') + '</div>' +
      '<div class="sbl2-cols"><div class="sbl2-left"><div class="sbl2-tabs" role="tablist"><button type="button" role="tab" class="on" data-tab="bm">Bookmarks <i>' + marks.length + '</i></button><button type="button" role="tab" data-tab="note">Notes <i>' + nt.length + '</i></button><button type="button" role="tab" data-tab="hl">Highlights <i>' + hl.length + '</i></button></div>' +
      '<label class="sbl2-find"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#4a5f8a" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/></svg><input type="search" placeholder="Search your saved items..." aria-label="Search saved items"></label>' +
      '<div class="sbl2-list" data-list="bm">' + lists.bm + '</div><div class="sbl2-list" data-list="note" hidden>' + lists.note + '</div><div class="sbl2-list" data-list="hl" hidden>' + lists.hl + '</div></div>' +
      '<aside class="sbl2-detail" id="sbl2Detail"><p class="sbl-empty">Choose a saved item to see it here.</p></aside></div></section>';
    const page = host.querySelector('.sbl-page');
    const detail = page.querySelector('#sbl2Detail');
    const showDetail = r => {
      page.querySelectorAll('.sbl2-item').forEach(x => x.classList.toggle('on', x === r));
      const kind = r.dataset.kind, v = I().get(kind, r.dataset.key); if (!v) return;
      const n = nameOf(v);
      detail.innerHTML = '<div class="sbl2-dh"><span class="sbl2-cover big">' + esc(n.emoji) + '</span><div><h3>' + esc(n.chapter.replace(/\s+/g, ' ').slice(0, 120)) + '</h3><small>' + esc(n.subj) + (v.tb ? ' · ' + esc(v.tb) : '') + '</small><p>Page ' + (v.p + 1) + '</p></div></div>' +
        (v.q ? '<blockquote>' + esc(v.q) + '</blockquote>' : '') + (v.x ? '<h4>My Note</h4><div class="sbl2-note">' + esc(v.x) + '</div>' : '') +
        '<div class="sbl2-acts"><button type="button" class="sbl2-a" data-go>Open Book</button><button type="button" class="sbl2-a red" data-rm>Remove</button></div>';
      detail.querySelector('[data-go]').onclick = () => { setActiveNavSafe('subjects'); open(v); };
      detail.querySelector('[data-rm]').onclick = async () => { await I().del(kind, r.dataset.key); };
    };
    page.querySelectorAll('.sbl2-tabs button').forEach(t => t.addEventListener('click', () => {
      page.querySelectorAll('.sbl2-tabs button').forEach(x => x.classList.toggle('on', x === t));
      page.querySelectorAll('.sbl2-list').forEach(l => { l.hidden = l.dataset.list !== t.dataset.tab; });
    }));
    page.querySelector('.sbl2-find input').addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      page.querySelectorAll('.sbl2-item').forEach(x => { x.hidden = !!q && x.textContent.toLowerCase().indexOf(q) < 0; });
    });
    page.addEventListener('click', async ev => {
      const r = ev.target.closest('.sbl-row-item');
      if (!r) return;
      const kind = r.dataset.kind, key = r.dataset.key;
      if (ev.target.closest('.sbl-del')) { await I().del(kind, key); return; }
      showDetail(r);
    });
    const first = page.querySelector('.sbl2-list:not([hidden]) .sbl2-item'); if (first) showDetail(first);
  }
  function setActiveNavSafe(p) { try { if (typeof setActiveNav === 'function') setActiveNav(p); } catch (e) { /* nav optional */ } }
  if (window.SBHooks && typeof window.renderPage === 'function') {
    SBHooks.use('renderPage', next => function (page) {
      if (page === 'saved') return renderSaved();
      return next.apply(this, arguments);
    });
  }

  // ── start ─────────────────────────────────────────────────────────────────────────────────────────────────────────
  let obs = null;
  function start() {
    const host = $('#dashboard-body') || doc.body;
    const ours = n => n.classList.contains('sbl-tools') || n.classList.contains('sbl-pop') || n.classList.contains('sbl-modal') || n.classList.contains('sbl-class-star') || n.classList.contains('sbl-mine-tag') || n.classList.contains('sbl-mark');
    obs = new MutationObserver(muts => { if (muts.some(m => m.type === 'childList' && [...m.addedNodes].some(n => n.nodeType === 1 && !ours(n)))) schedule(); });
    obs.observe(host, { childList: true, subtree: true });
    schedule(); paintMyClass();
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', start); else start();

  window.SBLibrary = { here, open, collect, catalog, toggleBookmark, bookmarkAt, notesAt, saveNote, renderSaved, myClass, setMyClass, parseCall, callOf, cleanTab, bmKey };
})();
