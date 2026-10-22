/* SBA11y (Phase 12, first part): keyboard and screen-reader basics that every view shares, without scanning the page.
 *
 *   Tab bars   any group of buttons whose class contains "tab-btn" or "top-tab" (the chapter tabs, the Maths tabs, the sub-tab bars) becomes
 *              role=tablist / role=tab with aria-selected following the "active" class and a roving tabindex (only the active tab is in the
 *              Tab order); the arrow keys (mirrored in right-to-left pages), Home and End move between tabs and open the one reached.
 *              Applied after the render functions that draw the bars (through SBHooks) and re-synced after every click; no observer.
 *   Dialogs    SBA11y.trap(dialog, {onClose}) keeps Tab inside the dialog, Escape calls onClose, and focus returns to what had it before;
 *              it returns a release() function.
 *   SBA11y.enhance(scope) applies the tab roles inside scope (default: the document). */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory;
  else root.SBA11y = factory(root);
})(typeof self !== 'undefined' ? self : this, function (win) {
  'use strict';
  const doc = win.document;
  const TAB = 'button[class*="tab-btn"], button[class*="top-tab"], .auth-tabs > button';
  const FOCUSABLE = 'a[href], summary, button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  // a tab that opens a dialog instead of a panel (the Word Stats button) is in the bar but not in the arrow-key cycle
  const isAction = t => t.classList.contains('ws-subj-tab');
  const visible = t => !t.hidden && t.style.display !== 'none';
  const tabsOf = group => [...group.children].filter(c => c.matches && c.matches(TAB) && visible(c) && !isAction(c));
  function sync(group) {
    const all = [...group.children].filter(c => c.matches && c.matches(TAB));
    const tabs = all.filter(t => visible(t) && !isAction(t));
    if (tabs.length < 2) return;
    group.setAttribute('role', 'tablist');
    const active = tabs.find(t => t.classList.contains('active')) || tabs[0];
    all.forEach(t => {
      t.setAttribute('role', 'tab');
      if (isAction(t)) { t.setAttribute('aria-selected', 'false'); t.tabIndex = 0; return; }
      const on = t === active;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      if (visible(t)) t.tabIndex = on ? 0 : -1;
    });
  }
  // ---- things that are clicked but are not buttons (subject cards, accordion headers, the brand): reachable and operable by keyboard
  const OWN_ROLE = 'button, a[href], input, select, textarea, summary, label, [role], [tabindex]';
  const SENTENCE = '.lesson-sentence:not([role])';  // 100+ per chapter: one tab stop for the whole text, arrow keys inside (below); the Quran verses carry their own role and tab stop
  const NESTED = 'button, a[href], input, select, textarea, summary, [onclick]';
  // Headers that open and close a card (accordion questions, topic cards). Controls may not be nested inside a button, and these headers hold
  // their own (full screen, language tabs): so the header itself is a button only when it holds none; otherwise its title (the first part
  // with text and no control in it) is the button and a click on it is a click on the header.
  const HEADERS = '.math-acc-header, .slo-accordion-header, .sb-topic-head';
  const CONTROLS = 'button, a[href], input, select, textarea, summary, [tabindex]:not([tabindex="-1"]), [role="button"], [role="tab"], [role="link"]';
  function expandedOf(h) {
    const card = h.parentElement;
    if (!card) return null;
    if (h.classList.contains('sb-topic-head')) return !card.classList.contains('sb-topic-closed');
    const body = [...card.children].find(c => c.matches('.math-accordion-body, .slo-accordion-body'));
    return body ? (body.style.display === 'block' || (body.style.display !== 'none' && card.classList.contains('open'))) : null;
  }
  const unbutton = el => { ['role', 'tabindex', 'aria-expanded', 'data-sb-self', 'data-sb-proxy'].forEach(a => el.removeAttribute(a)); };
  // run again after anything is added to a header: a control that arrives later (full screen) turns the header into a title button
  function enhanceHeader(h) {
    const proxy = h.querySelector(':scope > [data-sb-proxy]');
    const held = [...h.querySelectorAll(CONTROLS)].some(c => c !== proxy && !c.hasAttribute('data-sb-proxy') && c !== h);
    let btn;
    if (!held) {
      if (proxy) unbutton(proxy);
      btn = h; h.setAttribute('data-sb-self', '');
    } else {
      if (h.hasAttribute('data-sb-self') || h.getAttribute('role') === 'button') unbutton(h);        // a script gave the whole header a role before its controls were added
      btn = proxy || [...h.children].find(c => c.textContent.trim() && !c.matches(CONTROLS) && !c.querySelector(CONTROLS));
      if (!btn) return;
      btn.setAttribute('data-sb-proxy', '');
    }
    btn.setAttribute('role', 'button'); btn.tabIndex = 0;
    const ex = expandedOf(h);
    if (ex !== null) btn.setAttribute('aria-expanded', ex ? 'true' : 'false'); else btn.removeAttribute('aria-expanded');
  }
  const groupOf = s => s.closest('.math-tab-content-scroll, .tab-content, main, body') || doc.body;
  function clickables(scope) {
    const root = scope || doc;
    root.querySelectorAll('[onclick]').forEach(el => {
      if (el.matches(HEADERS) || el.matches(OWN_ROLE) || el.matches(SENTENCE) || el.querySelector(NESTED)) return;   // a card holding its own buttons: those are the targets
      el.setAttribute('role', 'button'); el.tabIndex = 0;
    });
    root.querySelectorAll(HEADERS).forEach(enhanceHeader);
    // sentences: the first (or the last one used) is the tab stop of its text, the others are reached with the arrow keys
    const groups = new Map();
    root.querySelectorAll(SENTENCE).forEach(s => {
      const g = groupOf(s);
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g).push(s);
    });
    groups.forEach(list => {
      const stop = list.find(s => s.getAttribute('tabindex') === '0') || list[0];
      list.forEach(s => { s.tabIndex = s === stop ? 0 : -1; });                   // no role: a screen reader keeps reading the text as text
    });
  }
  function enhance(scope) {
    if (!doc) return;
    const seen = new Set();
    (scope || doc).querySelectorAll(TAB).forEach(b => { const g = b.parentElement; if (g && !seen.has(g)) { seen.add(g); sync(g); } });
    clickables(scope);
  }

  // Enter / Space on a clickable non-button; arrow keys between the sentences of a text
  function onClickableKey(e) {
    const el = e.target;
    if (!el || !el.matches || el.matches('button, a[href], input, select, textarea, summary')) return false;
    const isSentence = el.matches(SENTENCE);
    const stands = el.hasAttribute('data-sb-proxy') ? el.closest(HEADERS) : null;       // the title of a header is its button
    if (!isSentence && !stands && !(el.getAttribute('role') === 'button' && (el.hasAttribute('onclick') || el.matches(HEADERS)))) return false;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (stands || el).click(); return true; }
    if (!isSentence) return false;
    const list = [...groupOf(el).querySelectorAll(SENTENCE)];
    const rtl = win.getComputedStyle && win.getComputedStyle(el).direction === 'rtl';
    const i = list.indexOf(el);
    let to = -1;
    if (e.key === 'ArrowDown') to = i + 1;
    else if (e.key === 'ArrowUp') to = i - 1;
    else if (e.key === 'ArrowRight') to = rtl ? i - 1 : i + 1;
    else if (e.key === 'ArrowLeft') to = rtl ? i + 1 : i - 1;
    else if (e.key === 'Home') to = 0;
    else if (e.key === 'End') to = list.length - 1;
    else return false;
    if (i < 0 || to < 0 || to >= list.length) return false;
    e.preventDefault();
    list.forEach(s => { s.tabIndex = -1; });
    list[to].tabIndex = 0; list[to].focus();
    if (list[to].scrollIntoView) list[to].scrollIntoView({ block: 'nearest' });
    return true;
  }

  function onKey(e) {
    if (e.key === 'Tab') { try { enhance(); } catch (err) { /* never block the keyboard */ } return; }   // whatever was drawn since the last time becomes reachable before the browser moves the focus
    if (onClickableKey(e)) return;
    const t = e.target && e.target.closest ? e.target.closest(TAB) : null;
    if (!t || !t.parentElement) return;
    sync(t.parentElement);
    const tabs = tabsOf(t.parentElement);
    if (tabs.length < 2 || !tabs.includes(t)) return;
    const rtl = win.getComputedStyle && win.getComputedStyle(t.parentElement).direction === 'rtl';
    const i = tabs.indexOf(t);
    let to = -1;
    if (e.key === 'ArrowRight') to = rtl ? i - 1 : i + 1;
    else if (e.key === 'ArrowLeft') to = rtl ? i + 1 : i - 1;
    else if (e.key === 'Home') to = 0;
    else if (e.key === 'End') to = tabs.length - 1;
    else return;
    e.preventDefault();
    to = (to + tabs.length) % tabs.length;
    const target = tabs[to], key = target.getAttribute('data-tab'), parent = t.parentElement;
    const parentSel = parent.classList.length ? '.' + [...parent.classList].join('.') : '';
    target.focus();
    target.click();                                 // automatic activation: the tab reached opens
    // opening a tab often redraws or reorders the bar (a button that is moved or replaced loses the focus to the page): put the focus back
    // on the same tab, whether the old button is still there or the new bar has a fresh one. Only when the focus fell to the page: a handler
    // that moved it on purpose (a dialog, a field) keeps it.
    const refocus = () => {
      const el = doc.contains(target) ? target : (key && parentSel ? doc.querySelector(parentSel + ' [data-tab="' + key + '"]') : null);
      const a = doc.activeElement;
      if (el && a !== el && (!a || a === doc.body)) el.focus();
      const bar = el && el.parentElement ? el.parentElement : (doc.contains(parent) ? parent : null);
      if (bar) sync(bar);
    };
    refocus();
    win.setTimeout(refocus, 0);                     // a redraw that a handler schedules for the next tick
  }
  function onClick(e) {
    const t = e.target && e.target.closest ? e.target.closest(TAB) : null;
    if (t && t.parentElement) win.setTimeout(() => sync(t.parentElement), 0);     // after the click handler has moved the "active" class
    const h = e.target && e.target.closest ? e.target.closest(HEADERS) : null;
    if (h) win.setTimeout(() => enhanceHeader(h), 0);
    const s = e.target && e.target.closest ? e.target.closest(SENTENCE) : null;     // a clicked sentence is the text's tab stop
    if (s) groupOf(s).querySelectorAll(SENTENCE).forEach(x => { x.tabIndex = x === s ? 0 : -1; });
  }

  function onFocusIn(e) {
    const t = e.target && e.target.closest ? e.target.closest(TAB) : null;
    if (t && t.parentElement && t.getAttribute('role') !== 'tab') sync(t.parentElement);
  }

  // ---- dialogs
  // a control the keyboard can reach: not inside a hidden / aria-hidden / inert branch, and not inside a closed <details> (its summary stays reachable)
  function reachable(el, root) {
    for (let n = el; n && n !== root.parentNode; n = n.parentElement) {
      if (n.hidden || n.inert || n.getAttribute('aria-hidden') === 'true') return false;
      if (n.tagName === 'DETAILS' && !n.open) {
        const s = [...n.children].find(c => c.tagName === 'SUMMARY');
        if (!(s && s.contains(el))) return false;
      }
    }
    return true;
  }
  function trap(dialog, opts = {}) {
    const before = doc.activeElement;
    const focusables = () => [...dialog.querySelectorAll(FOCUSABLE)].filter(el => reachable(el, dialog));
    const onKeydown = e => {
      if (e.key === 'Escape' && opts.onClose) { e.preventDefault(); opts.onClose(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) { e.preventDefault(); return; }
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (doc.activeElement === first || !dialog.contains(doc.activeElement))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (doc.activeElement === last || !dialog.contains(doc.activeElement))) { e.preventDefault(); first.focus(); }
    };
    doc.addEventListener('keydown', onKeydown, true);
    const f = focusables();
    if (f.length && !dialog.contains(doc.activeElement)) f[0].focus();
    return function release() {
      doc.removeEventListener('keydown', onKeydown, true);
      if (before && before.focus && doc.contains(before)) before.focus();
    };
  }

  // after the functions that draw tab bars (extend through SBHooks: js/core/hooks.js)
  const DRAWS = ['switchSubjectTab', 'switchMathTab', 'openSubjectWorkspace', 'openMathView', 'selectMathChapter', 'selectSubjectChapter', 'switchScienceLessonSubTab',
    'switchLangLessonSubTab', 'switchMathTopicSubTab', 'switchChemTab', 'switchBioTab', 'switchPhysTab', 'switchEngTab', 'switchUrduTab', 'switchIslTab'];
  // the question / practice window (index.html #modalOverlay)
  let modalRelease = null;
  function hookModal() {
    ['openModal'].forEach(name => {
      if (typeof win[name] !== 'function') return;
      win.SBHooks.use(name, next => function () {
        const r = next.apply(this, arguments);
        try {
          const ov = doc.getElementById('modalOverlay');
          if (ov && ov.classList.contains('visible')) { if (modalRelease) modalRelease(); modalRelease = trap(ov, { onClose: () => { if (typeof win.closeModal === 'function') win.closeModal(); } }); }
        } catch (e) { /* never break the window itself */ }
        return r;
      }, { id: 'a11y.js' });
    });
    if (typeof win.closeModal === 'function') {
      win.SBHooks.use('closeModal', next => function () { const r = next.apply(this, arguments); if (modalRelease) { const f = modalRelease; modalRelease = null; f(); } return r; }, { id: 'a11y.js' });
    }
  }
  function hook() {
    if (!win.SBHooks) return;
    hookModal();
    DRAWS.forEach(name => {
      if (typeof win[name] !== 'function') return;
      win.SBHooks.use(name, next => function () { const r = next.apply(this, arguments); try { enhance(); } catch (e) { /* never break navigation */ } return r; }, { id: 'a11y.js' });
    });
  }

  function init() {
    if (!doc) return;
    doc.addEventListener('keydown', onKey);
    doc.addEventListener('click', onClick, true);             // capture: a sentence's own handler stops the event before it reaches the document
    doc.addEventListener('focusin', onFocusIn);
    hook();
    enhance();
  }
  if (win === (typeof self !== 'undefined' ? self : null) && doc) init();
  return { enhance, trap, init, hook };
});
