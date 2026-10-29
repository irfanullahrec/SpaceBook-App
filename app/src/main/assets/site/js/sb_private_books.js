/* sb_private_books.js - Government and Private books, and the series of the Private books (Munawar).
 *
 * Clicking Class 1-8 asks which books: a modal with two statistical cards, "Government Books" (the KPK Textbook Board books, as before)
 * and "Private Books". Private opens a second modal that asks for the series; "Munawar" (the Kanz books, Classes 1-4) opens the class's
 * subject grid with that series' books. The books of a series are subjects of the class flagged `series: 'munawar'` (js/munawar_registry.js),
 * read by the class's own reader exactly like a Government book, so the tabs, page view, word and sentence meanings and answers are the same.
 *
 *   SBPrivate.entry(classId)       what a click on a class does (Classes 1-8 ask; the others go straight to their subjects)
 *   SBPrivate.setSeries(cls, id)   '' = Government, 'munawar' = that series; undefined keeps the choice made for this class
 *   SBPrivate.subjectsFor(cls)     the subjects goToSubjects() lists for the class's current choice
 *   SBPrivate.bar(cls)             the slim bar above a series' covers ('' for Government)
 *   SBPrivate.isEmpty(cls) / emptyHtml(cls)   a series without books for this class (Class 5-8 Munawar)
 * "Back to Subjects" buttons inside a book call goToSubjects(classId) with no series, so they return to the series the book came from.
 */
(function () {
  'use strict';
  if (window.SBPrivate) return;

  const BOARD_CLASSES = ['cls1', 'cls2', 'cls3', 'cls4', 'cls5', 'cls6', 'cls7', 'cls8'];
  const chosen = {};        // classId -> series id ('' = Government)
  let overlay = null;
  let lastFocus = null;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = n => Number(n || 0).toLocaleString('en-US');
  const data = () => (typeof DATA !== 'undefined' ? DATA : { subjects: {}, classes: [], series: {} });
  const className = cls => { const c = (data().classes || []).find(x => x.id === cls); return c ? c.name : 'Class ' + String(cls).replace('cls', ''); };
  const seriesInfo = id => (data().series || {})[id] || { id, name: id };
  const allSeries = () => Object.keys(data().series || {});
  const inClass = cls => (data().subjects || {})[cls] || [];
  const gov = cls => inClass(cls).filter(s => !s.series);
  const ofSeries = (cls, id) => inClass(cls).filter(s => s.series === id);
  const sum = (list, key) => list.reduce((t, s) => t + (Number(s[key]) || 0), 0);
  const shortName = s => String(s.name || '').replace(/^Kanz\s+/, '');
  const plural = (n, one, many) => (n === 1 ? one : many || one + 's');

  const ICON_GOV = '🏛️';
  const ICON_PRIV = '🏫';
  // Munawar's mark: a rounded tile with a stylised M (own drawing; the publisher's logo is not used)
  const MARK = '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="3" y="3" width="42" height="42" rx="12" fill="#fff" fill-opacity=".92"/>' +
    '<path d="M12 35V14l12 13 12-13v21" fill="none" stroke="#be185d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function setSeries(cls, id) { if (typeof id === 'string') chosen[cls] = id; }
  function current(cls) { return chosen[cls] || ''; }
  function subjectsFor(cls) { const id = current(cls); return id ? ofSeries(cls, id) : gov(cls); }
  function isEmpty(cls) { return !!current(cls) && ofSeries(cls, current(cls)).length === 0; }

  // ---------------------------------------------------------------- the dialog
  function close() {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.removeEventListener('keydown', onKey, true);
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) { /* element gone */ } }
    lastFocus = null;
  }

  function onKey(e) {
    if (!overlay) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = Array.from(overlay.querySelectorAll('button:not([disabled])'));
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function show(html, focusSel) {
    if (!overlay) {
      lastFocus = document.activeElement;
      overlay = document.createElement('div');
      overlay.className = 'sbp-overlay';
      overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
      document.body.appendChild(overlay);
      document.addEventListener('keydown', onKey, true);
    }
    overlay.innerHTML = html;
    const x = overlay.querySelector('.sbp-close');
    if (x) x.addEventListener('click', close);
    overlay.querySelectorAll('[data-sbp]').forEach(el => el.addEventListener('click', () => act(el.getAttribute('data-sbp'), el.getAttribute('data-cls'), el.getAttribute('data-id'))));
    const f = overlay.querySelector(focusSel || '.sbp-card') || x;
    if (f && f.focus) f.focus();
  }

  function act(what, cls, id) {
    if (what === 'gov') { close(); if (typeof goToSubjects === 'function') goToSubjects(cls, ''); }
    else if (what === 'priv') seriesDialog(cls);
    else if (what === 'boards') boardDialog(cls);
    else if (what === 'series') { close(); if (typeof goToSubjects === 'function') goToSubjects(cls, id); }
  }

  // ---------------------------------------------------------------- the two cards
  function boardDialog(cls) {
    const g = gov(cls);
    const ids = allSeries();
    const priv = ids.reduce((all, id) => all.concat(ofSeries(cls, id)), []);
    const name = className(cls);
    show(
      '<div class="sbp-dialog" role="dialog" aria-modal="true" aria-labelledby="sbpTitle">' +
      '<button type="button" class="sbp-close" aria-label="Close">✕</button>' +
      '<div class="sbp-eyebrow">' + esc(name) + '</div>' +
      '<h2 class="sbp-title" id="sbpTitle">Which books do you want to open?</h2>' +
      '<p class="sbp-lead">Pick the board books or the books of a private publisher. Inside, every book works the same way.</p>' +
      '<div class="sbp-cards">' +
      '<button type="button" class="sbp-card sbp-gov" data-sbp="gov" data-cls="' + esc(cls) + '" aria-label="Government Books, ' + g.length + ' books">' +
        '<span class="sbp-card-head"><span class="sbp-icon" aria-hidden="true">' + ICON_GOV + '</span><span><span class="sbp-card-name">Government Books</span>' +
        '<span class="sbp-card-sub" style="display:block">Khyber Pakhtunkhwa Textbook Board</span></span></span>' +
        '<span class="sbp-stats">' +
          '<span class="sbp-stat"><b>' + num(g.length) + '</b><span>' + plural(g.length, 'book') + '</span></span>' +
          '<span class="sbp-stat"><b>' + num(sum(g, 'chapters')) + '</b><span>chapters</span></span>' +
          '<span class="sbp-stat"><b>3</b><span>languages</span></span>' +
        '</span>' +
        '<span class="sbp-go"><span>Open the board books</span><span aria-hidden="true">→</span></span>' +
      '</button>' +
      '<button type="button" class="sbp-card sbp-priv" data-sbp="priv" data-cls="' + esc(cls) + '" aria-label="Private Books, ' + priv.length + ' books">' +
        '<span class="sbp-card-head"><span class="sbp-icon" aria-hidden="true">' + ICON_PRIV + '</span><span><span class="sbp-card-name">Private Books</span>' +
        '<span class="sbp-card-sub" style="display:block">Books of private publishers</span></span></span>' +
        '<span class="sbp-stats">' +
          '<span class="sbp-stat"><b>' + num(ids.length) + '</b><span>' + plural(ids.length, 'series', 'series') + '</span></span>' +
          '<span class="sbp-stat"><b>' + num(priv.length) + '</b><span>' + plural(priv.length, 'book') + ' in ' + esc(name) + '</span></span>' +
          '<span class="sbp-stat"><b>' + num(sum(priv, 'pdfPages')) + '</b><span>pages</span></span>' +
        '</span>' +
        '<span class="sbp-go"><span>Choose a series</span><span aria-hidden="true">→</span></span>' +
      '</button>' +
      '</div></div>');
  }

  function seriesDialog(cls) {
    const ids = allSeries();
    const name = className(cls);
    const cards = ids.map(id => {
      const info = seriesInfo(id);
      const list = ofSeries(cls, id);
      const pages = sum(list, 'pdfPages');
      const label = info.name + (list.length ? ', ' + list.length + ' books' : ', no books for ' + name + ' yet');
      return '<button type="button" class="sbp-card sbp-munawar" data-sbp="series" data-cls="' + esc(cls) + '" data-id="' + esc(id) + '" aria-label="' + esc(label) + '">' +
        '<span class="sbp-card-head"><span class="sbp-icon" aria-hidden="true">' + MARK + '</span><span><span class="sbp-card-name">' + esc(info.name) + '</span>' +
        (info.nameUrdu ? '<span class="sbp-card-ur" lang="ur" style="display:block">' + esc(info.nameUrdu) + '</span>' : '') +
        '<span class="sbp-card-sub" style="display:block">' + esc([info.line, info.publisher].filter(Boolean).join(' · ')) + '</span></span></span>' +
        '<span class="sbp-stats">' +
          '<span class="sbp-stat"><b>' + num(list.length) + '</b><span>' + plural(list.length, 'book') + '</span></span>' +
          '<span class="sbp-stat"><b>' + num(sum(list, 'chapters')) + '</b><span>chapters</span></span>' +
          '<span class="sbp-stat"><b>' + num(pages) + '</b><span>pages</span></span>' +
        '</span>' +
        (list.length ? '<span class="sbp-chips">' + list.map(s => '<span class="sbp-chip">' + esc(s.emoji || '') + ' ' + esc(shortName(s)) + '</span>').join('') + '</span>'
                     : '<span class="sbp-chips"><span class="sbp-chip">Classes ' + esc((info.classes || []).join(', ')) + ' only for now</span></span>') +
        '<span class="sbp-go"><span>' + (list.length ? 'Open ' + esc(info.name) + ' books' : 'See what is coming') + '</span><span aria-hidden="true">→</span></span>' +
      '</button>';
    }).join('');
    show(
      '<div class="sbp-dialog" role="dialog" aria-modal="true" aria-labelledby="sbpTitle">' +
      '<button type="button" class="sbp-close" aria-label="Close">✕</button>' +
      '<button type="button" class="sbp-back" data-sbp="boards" data-cls="' + esc(cls) + '">← Government or Private</button>' +
      '<div class="sbp-eyebrow">' + esc(name) + ' · Private Books</div>' +
      '<h2 class="sbp-title" id="sbpTitle">Choose a series</h2>' +
      '<p class="sbp-lead">A series is one publisher\'s set of books for the class.</p>' +
      '<div class="sbp-cards">' + cards + '</div></div>', '.sbp-card');
  }

  function entry(cls) {
    if (BOARD_CLASSES.indexOf(cls) < 0) { if (typeof goToSubjects === 'function') goToSubjects(cls, ''); return; }
    boardDialog(cls);
  }

  // ---------------------------------------------------------------- inside the subject view
  function bar(cls) {
    const id = current(cls);
    if (!id) return '';
    const info = seriesInfo(id);
    const list = ofSeries(cls, id);
    return '<div class="sbp-bar"><button type="button" class="sbp-bar-back" onclick="SBPrivate.entry(\'' + esc(cls) + '\')">← Government or Private</button>' +
      '<span class="sbp-bar-crumbs">' + esc(className(cls)) + ' › Private › <b>' + esc(info.name) + '</b>' + (info.line ? ' · ' + esc(info.line) : '') + '</span>' +
      '<span class="sbp-bar-note">' + list.length + ' ' + plural(list.length, 'book') + '</span></div>';
  }

  function emptyHtml(cls) {
    const info = seriesInfo(current(cls));
    return '<div class="sbp-empty"><div style="font-size:2.2rem" aria-hidden="true">⏳</div>' +
      '<h2>' + esc(info.name) + ' books for ' + esc(className(cls)) + ' are coming</h2>' +
      '<p>The ' + esc(info.name) + ' series has books for ' + esc((info.classes || []).map(n => 'Class ' + n).join(', ')) + ' so far.</p>' +
      '<button type="button" onclick="SBPrivate.entry(\'' + esc(cls) + '\')">← Government or Private</button></div>';
  }

  // a book opened from anywhere (search, Continue learning, a bookmark) makes "Back to Subjects" return to its own series
  if (window.SBHooks && typeof window.openSubject === 'function') {
    SBHooks.use('openSubject', function (next) {
      return function (classId, subjId) {
        const s = inClass(classId).find(x => x.id === subjId);
        if (s) chosen[classId] = s.series || '';
        return next.apply(this, arguments);
      };
    }, { id: 'sb_private_books.js' });
  }

  window.SBPrivate = { entry, setSeries, current, subjectsFor, isEmpty, bar, emptyHtml, close, series: allSeries };
})();
