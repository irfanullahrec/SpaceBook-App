/* Rights notice and reader copy guard, Classes 1-12. The website and the Android app show this same page, so both get it from here.
 *
 * 1. THE NOTICE. Shown ONCE per book (class + subject) on a device, the first time the book is opened (SBHooks 'openSubject'). The words are the owner's,
 *    verbatim (docs/launch/CONTENT_RIGHTS.md). Changing them means changing VERSION, so that everybody sees the new words once. It says what SpaceBook does and does
 *    not own; it does NOT say that the Government, a textbook board or anybody else has given permission or endorses SpaceBook.
 * 2. THE GUARD. In the reader, ordinary copying (Ctrl+C, the browser's Copy menu, cut) and dragging selected text or a picture out of the book are switched off.
 *    The text stays selectable on purpose: word meanings, sentence translation, read aloud, screen readers and the selection tools all use the selection, and
 *    nothing here changes the page for them. Typing fields (notes, search, the report form) are not touched.
 *    HONEST LIMITS: this is a courtesy and a deterrent, not protection. Screenshots, a photo of the screen, retyping, OCR, "view source", saving the page,
 *    printing, a browser with scripts switched off, developer tools and other software on the device are not stopped, and cannot be stopped by a web page.
 *    The Android app adds the same for the system's selection menu (SbWebView.kt: no Copy, Cut, Share or "process text" entries). Nothing here blocks screenshots.
 * Automated tests (navigator.webdriver) skip the notice so they can click; a test of the notice itself sets window.SB_RIGHTS_TEST. */
(function () {
  'use strict';
  const VERSION = 1;
  const TEXT = 'SpaceBook provides an interactive learning environment designed to make education easier and more accessible. ' +
    'Rights in the original textbooks, text, illustrations, and other source materials remain with their respective owners. ' +
    'SpaceBook does not claim ownership of those materials. ' +
    'Subscription charges support the platform’s development, hosting, interactive features, and maintenance; they do not transfer ownership of textbook content or grant reproduction rights. ' +
    'Users may use content only as permitted by applicable law and the relevant licence. ' +
    'Unauthorized copying, redistribution, republication, or commercial reuse is prohibited. ' +
    'For attribution concerns, permission requests, or removal requests, please contact SpaceBook through its support channel.';
  const TITLE = 'About the books in SpaceBook';
  const KEY = 'sb.rights.notice.v' + VERSION;
  const doc = document;
  let mem = {}, openEl = null, inert = [], lastFocus = null;

  // ---------- which books have shown the notice on this device
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return mem; } };
  const save = o => { mem = o; try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* kept for this visit only */ } };
  const bookId = (classId, subjId) => String(classId) + ':' + String(subjId);
  const seen = id => !!(load()[id] || mem[id]);
  const mark = id => { const o = load(); o[id] = Date.now(); save(o); };
  const automated = () => { try { return !!navigator.webdriver && !window.SB_RIGHTS_TEST; } catch (e) { return false; } };

  function el(tag, attrs, text) {
    const e = doc.createElement(tag);
    Object.keys(attrs || {}).forEach(k => e.setAttribute(k, attrs[k]));
    if (text != null) e.textContent = text;
    return e;
  }

  // ---------- the notice
  function finish(id, support) {
    if (!openEl) return;
    mark(id);
    doc.removeEventListener('keydown', onKey, true);
    openEl.remove(); openEl = null;
    inert.forEach(c => { c.removeAttribute('inert'); c.removeAttribute('data-sbrt'); });
    inert = [];
    if (support && window.SBFeedback && typeof window.SBFeedback.open === 'function') { try { window.SBFeedback.open({}); return; } catch (e) { /* fall through to the focus below */ } }
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) { /* the element is gone */ } }
  }
  function onKey(ev) {
    if (!openEl) return;
    const id = openEl.getAttribute('data-book');
    if (ev.key === 'Escape') { ev.preventDefault(); finish(id, false); return; }
    if (ev.key !== 'Tab') return;
    const f = Array.prototype.slice.call(openEl.querySelectorAll('button')).filter(b => !b.disabled);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1], a = doc.activeElement, inside = openEl.contains(a);
    if (ev.shiftKey && (a === first || !inside || a.classList.contains('sbrt-dialog'))) { ev.preventDefault(); last.focus(); }
    else if (!ev.shiftKey && (a === last || !inside)) { ev.preventDefault(); first.focus(); }
  }
  function show(id) {
    lastFocus = doc.activeElement;
    const overlay = el('div', { 'class': 'sbrt-overlay', id: 'sbRightsNotice', 'data-book': id });
    const dlg = el('div', { 'class': 'sbrt-dialog', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'sbrtTitle', 'aria-describedby': 'sbrtText', tabindex: '-1' });
    dlg.appendChild(el('h2', { id: 'sbrtTitle' }, TITLE));
    dlg.appendChild(el('p', { id: 'sbrtText' }, TEXT));
    const actions = el('div', { 'class': 'sbrt-actions' });
    const ok = el('button', { type: 'button', 'class': 'sbrt-ok' }, 'I understand');
    const help = el('button', { type: 'button', 'class': 'sbrt-help' }, 'Contact support');
    ok.addEventListener('click', () => finish(id, false));
    help.addEventListener('click', () => finish(id, true));
    actions.appendChild(ok); actions.appendChild(help); dlg.appendChild(actions); overlay.appendChild(dlg);
    // the page behind the notice is inert (keyboard and screen readers stay inside it), like the lock screen
    Array.prototype.slice.call(doc.body.children).forEach(c => { if (!c.hasAttribute('inert')) { c.setAttribute('inert', ''); c.setAttribute('data-sbrt', '1'); inert.push(c); } });
    doc.body.appendChild(overlay); openEl = overlay;
    doc.addEventListener('keydown', onKey, true);
    dlg.focus();
  }
  function maybeShow(classId, subjId) {
    if (window.SB_BACKGROUND_READ || automated() || openEl || doc.querySelector('.sblic')) return false;   // the app's hidden reminder page, a test run, a notice already open, the trial lock
    const id = bookId(classId, subjId);
    if (seen(id)) return false;
    show(id);
    return true;
  }

  // ---------- the guard
  const BOOK = '#subjTabContent, #mathTabContent, .bk-wrap, .math-unified-view';
  const TYPING = 'input, textarea, select, [contenteditable=""], [contenteditable="true"]';
  const elOf = n => (n && n.nodeType === 1 ? n : n && n.parentElement) || null;
  const inBook = n => { const e = elOf(n); return !!(e && e.closest && e.closest(BOOK) && !e.closest(TYPING) && !e.closest('[data-sb-copy-ok]')); };
  function selectionTouchesBook() {
    const sel = window.getSelection && window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return false;
    if (inBook(sel.getRangeAt(0).commonAncestorContainer)) return true;
    // Select All gives a common ancestor above the book: look at the book's own containers
    const boxes = doc.querySelectorAll(BOOK);
    for (let i = 0; i < boxes.length; i++) { try { if (sel.containsNode(boxes[i], true)) return true; } catch (e) { /* not selectable */ } }
    return false;
  }
  let toastEl = null, toastAt = 0;
  function toast() {
    const now = Date.now();
    if (now - toastAt < 6000) return;
    toastAt = now;
    if (!toastEl) { toastEl = el('div', { 'class': 'sbrt-toast', role: 'status', 'aria-live': 'polite' }); doc.body.appendChild(toastEl); }
    toastEl.textContent = 'Copying book text is turned off. Tap a word or a sentence to see its meaning.';
    toastEl.classList.add('sbrt-on');
    setTimeout(() => { if (toastEl) toastEl.classList.remove('sbrt-on'); }, 3800);
  }
  function onCopyOrCut(ev) {
    const t = elOf(ev.target);
    if (t && t.closest && t.closest(TYPING)) return;                  // typing fields keep copy and cut
    if (selectionTouchesBook() || inBook(t)) { ev.preventDefault(); toast(); }
  }
  function onDragStart(ev) {
    const e = elOf(ev.target);
    if (!e || !e.closest || e.closest(TYPING) || e.closest('[draggable="true"]')) return;   // exercises that are dragged on purpose keep working
    if (inBook(e)) ev.preventDefault();
  }
  // The browser's own right-click menu over selected text offers Copy, "Ask Gemini", "Search Google" and "Translate selection": ways to carry the text out of the reader.
  // It is not opened over book text for a mouse or the menu key. A long press on a touch screen is left alone: word meanings and the phone's selection handles use it.
  function onContextMenu(ev) {
    if (ev.pointerType === 'touch' || (ev.sourceCapabilities && ev.sourceCapabilities.firesTouchEvents)) return;
    const e = elOf(ev.target);
    if (!e || !e.closest || e.closest(TYPING) || !inBook(e)) return;
    ev.preventDefault(); toast();
  }
  doc.addEventListener('copy', onCopyOrCut, true);
  doc.addEventListener('cut', onCopyOrCut, true);
  doc.addEventListener('dragstart', onDragStart, true);
  doc.addEventListener('contextmenu', onContextMenu, true);

  // ---------- the notice follows every book that is opened
  if (window.SBHooks && typeof window.openSubject === 'function') {
    SBHooks.use('openSubject', function (next) { return function (classId, subjId) {
      const r = next.apply(this, arguments);
      try { maybeShow(classId, subjId); } catch (e) { console.error('rights notice', e); }
      return r;
    }; });
  }

  window.SBRights = { version: VERSION, text: TEXT, title: TITLE, seen, bookId, maybeShow, reset() { mem = {}; try { localStorage.removeItem(KEY); } catch (e) { /* nothing stored */ } }, inBook };
})();
