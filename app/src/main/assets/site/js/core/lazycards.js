/* SBLazyCards (Phase 11): a closed Maths accordion card costs nothing until it is opened.
 *
 * Problem (docs/PERFORMANCE.md): a Class 11 Maths lesson is 10.8 MB of HTML, 269,000 elements, and 99 % of it sits inside the bodies of cards that are
 * closed when the tab is drawn. The browser must build all of those elements before it can show the first card.
 *
 * What this does, ONLY when the owner flag `lazyCards` is on (window.SB_FLAGS.lazyCards or localStorage sb_flag_lazyCards = 'on'; off by default,
 * because it has been tested in a simulated DOM and not yet in a real browser): while switchMathTab / switchSubjectTab draws a tab into the page, the body of every
 * closed card (display:none, 4 KB or more) is kept as a string and the card gets an empty body marked data-sb-lazy. When the card is opened
 * (toggleMathAccordion, "expand all", the full-screen button, which clicks the header) the string is put into the body and formulas are typeset,
 * exactly as if it had been there from the start. Anything another module added to the empty body meanwhile is kept (the string goes in front).
 * Nothing else changes: the readers are not touched, and the renderer functions called from anywhere else (printing, comparing tabs) still return the whole HTML.
 *
 * node: require('./lazycards.js') gives { defer } for the tests. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(null);
  else root.SBLazyCards = factory(root);
})(typeof self !== 'undefined' ? self : this, function (win) {
  'use strict';
  const BODY = 'class="math-accordion-body"';
  const MIN_PAGE = 200000, MIN_BODY = 4000;                       // a small tab or a small body is not worth the trouble
  // sb_structure.js reads the inside of every lesson card while it plans a chapter and moves exercise, key-point and SLO blocks out of the lesson
  // into their own tabs. A body that holds such a block must be there when it plans, so it is never deferred (the test compares the result).
  const TOUCHED = /(?:class="[^"]*\b(?:m\d+|m11)-exercise\b)|(?:<(?:h[2-5]|div|p|span|strong)[^>]*>\s*(?:(?:lesson|topic|part)\s+[\w.\-]+\s*)?(?:doing\b|(?:review\s+|end[- ]of[- ](?:unit|chapter)\s+)?exercises?\b|key\s+points?|summary|chapter\s+summary|unit\s+summary|points\s+to\s+remember|slo[- ]based))/i;
  const store = new Map();
  let seq = 0, drawing = false;

  // html -> html with the big closed bodies emptied; each emptied body is kept in `keep` (id -> inner html)
  function defer(html, keep) {
    if (typeof html !== 'string' || html.length < MIN_PAGE) return html;
    let out = '', pos = 0, at;
    while ((at = html.indexOf(BODY, pos)) >= 0) {
      const open = html.lastIndexOf('<div', at), end = html.indexOf('>', at) + 1;
      const tag = html.slice(open, end);
      let close = -1;
      if (open >= pos && /display:\s*none/.test(tag) && tag.indexOf('data-sb-lazy') < 0) {
        let depth = 1, j = end;
        while (depth > 0) {
          const a = html.indexOf('<div', j), b = html.indexOf('</div>', j);
          if (b < 0) break;
          if (a >= 0 && a < b) { depth++; j = a + 4; } else { depth--; j = b + 6; }
        }
        if (depth === 0) close = j;
      }
      if (close < 0 || close - 6 - end < MIN_BODY || TOUCHED.test(html.slice(end, close - 6))) { out += html.slice(pos, end); pos = end; continue; }
      const id = ++seq;
      keep.set(id, html.slice(end, close - 6));
      out += html.slice(pos, open) + tag.replace('<div', '<div data-sb-lazy="' + id + '"') + '</div>';
      pos = close;
    }
    return out + html.slice(pos);
  }

  const api = { defer, _store: store };
  if (!win || !win.document) return api;

  const flag = () => { try { return typeof win.sbFlag === 'function' && !!win.sbFlag('lazyCards'); } catch (e) { return false; } };
  function fill(body) {
    const id = +body.getAttribute('data-sb-lazy');
    if (!id) return false;
    const html = store.get(id);
    body.removeAttribute('data-sb-lazy');
    if (html === undefined) return false;
    store.delete(id);
    body.insertAdjacentHTML('afterbegin', html);
    if (typeof win.typesetChapterMath === 'function') { try { win.typesetChapterMath(body); } catch (e) { /* the text is there; only the drawing of formulas failed */ } }
    if (win.SBA11y) { try { win.SBA11y.enhance(body); } catch (e) { /* roles for the keyboard: the card still works */ } }      // tab bars, buttons and headers that came with the body
    return true;
  }
  const fillAll = scope => { const list = (scope || win.document).querySelectorAll('[data-sb-lazy]'); list.forEach(fill); return list.length; };

  // The two places a tab is drawn into (#mathTabContent, #subjTabContent) get their own innerHTML setter on the element itself: while a tab is being
  // switched, what the readers assign is passed through defer(); at any other time it is assigned as it is. No reader needs to know.
  function install(el) {
    if (!el || el.__sbLazyCards) return;
    const native = Object.getOwnPropertyDescriptor(win.Element.prototype, 'innerHTML');
    Object.defineProperty(el, 'innerHTML', { configurable: true, enumerable: true, get() { return native.get.call(this); }, set(v) { native.set.call(this, drawing ? defer(v, store) : v); } });
    el.__sbLazyCards = true;
  }

  function init() {
    if (!win.SBHooks) return;
    const H = win.SBHooks, id = { id: 'lazycards.js' };
    ['switchMathTab', 'switchSubjectTab'].forEach(name => {
      if (typeof win[name] !== 'function') return;
      H.use(name, next => function () {
        store.clear();                                               // the previous tab is replaced: its kept bodies go with it
        if (!flag()) return next.apply(this, arguments);
        install(win.document.getElementById('mathTabContent')); install(win.document.getElementById('subjTabContent'));
        drawing = true;
        try { return next.apply(this, arguments); } finally { drawing = false; }
      }, id);
    });
    if (typeof win.toggleMathAccordion === 'function') {
      H.use('toggleMathAccordion', next => function (headerEl) {
        try { const card = headerEl && headerEl.closest && headerEl.closest('.math-accordion-card'); const body = card && card.querySelector('.math-accordion-body'); if (body && body.hasAttribute('data-sb-lazy')) fill(body); } catch (e) { /* the card still opens */ }
        return next.apply(this, arguments);
      }, id);
    }
    if (typeof win.expandAllMathCards === 'function') {
      H.use('expandAllMathCards', next => function (containerId) {
        try { fillAll(win.document.getElementById(containerId) || win.document.getElementById('mathTabContent')); } catch (e) { /* the cards still open */ }
        return next.apply(this, arguments);
      }, id);
    }
  }
  api.init = init; api.fill = fill; api.fillAll = fillAll;
  if (win === (typeof self !== 'undefined' ? self : null)) init();
  return api;
});
