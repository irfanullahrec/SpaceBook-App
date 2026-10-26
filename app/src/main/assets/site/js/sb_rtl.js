/* sb_rtl.js — Urdu / Arabic / Pashto medium subjects read right to left everywhere.
 * A reading area whose own text is mostly Arabic-script (Urdu, Pashto, Arabic, Islamiat, Qur'an, Islamic History,
 * Nazira ...) gets dir="rtl" and right alignment: paragraphs, headings, lists, cards, tables, question lists and the
 * rows inside cards run from the right. Maths, figures and the English / ltr translation lines keep their own direction.
 * Decided from the text itself, so it works for every class without a list of subjects. */
(function () {
  'use strict';
  const AREAS = '.math-topic-area, #subjTabContent, .math-tab-content-scroll, .m5-root, .m6-root, .m7-root, .m8-root, .m11-root, .urdu-reader, .isl-reader, #lessonContent, [id$="TabContent"], [id$="MainContent"], [id$="SloTabContent"]';
  const AR = /[ء-يٱ-ۓݐ-ݿﭐ-﷿ﹰ-ﻼ]/g, LA = /[A-Za-z]/g;
  const SKIP = '.katex, .katex-display, svg, code, pre, .sb-tri-drawer, .ut-root, script, style, [dir="ltr"]';

  function sample(el) {
    // own text only: skip maths, figures and ltr translation boxes; cap the work
    let n = 0, ar = 0, la = 0;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: t => (t.parentElement && t.parentElement.closest(SKIP)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    while (n < 400 && walker.nextNode()) {
      const s = walker.currentNode.data; n++;
      ar += (s.match(AR) || []).length; la += (s.match(LA) || []).length;
    }
    return {ar, la};
  }
  function mark(el, medium) {
    if (el.closest('[data-sb-fixed-dir]')) return;                       // the Study Plan's lesson sheet: not part of the subject that is open behind it
    // never nest: an area inside an already-marked area follows it
    const inner = el.parentElement && el.parentElement.closest('.sb-rtl-medium');
    const {ar, la} = sample(el);
    // an English-medium subject stays left to right even where its Urdu / Pashto translations come first
    const english = medium === 'en' && el.closest('.math-unified-view, #subjTabContent, #mathTabContent');
    const rtl = !english && ar + la > 20 && ar > la * 1.2;
    if (rtl) {
      if (!el.classList.contains('sb-rtl-medium')) { el.classList.add('sb-rtl-medium'); el.setAttribute('dir', 'rtl'); }
      // the language of the book (screen-reader voice, hyphenation, font choice): known from the subject's medium, never guessed from the script
      if ((medium === 'ur' || medium === 'ps' || medium === 'ar') && (!el.hasAttribute('lang') || el.hasAttribute('data-sb-lang'))) { el.setAttribute('lang', medium); el.setAttribute('data-sb-lang', ''); }
    } else if (el.classList.contains('sb-rtl-medium') && !inner) {
      el.classList.remove('sb-rtl-medium'); if (el.getAttribute('dir') === 'rtl') el.removeAttribute('dir');
      if (el.hasAttribute('data-sb-lang')) { el.removeAttribute('lang'); el.removeAttribute('data-sb-lang'); }
    }
  }
  function scan() {
    let medium = null;
    try { medium = window.SBMedium && document.querySelector('#subjTabContent, #mathTabContent') ?SBMedium.mediumNow() : null; } catch (e) { medium = null; }
    document.querySelectorAll(AREAS).forEach(el => mark(el, medium));
  }

  let timer = 0;
  const later = () => { if (!timer) timer = setTimeout(() => { timer = 0; scan(); }, 300); };
  function start() {
    const s = document.createElement('style'); s.id = 'sb-rtl-css';
    s.textContent = `
    .sb-rtl-medium{direction:rtl;text-align:right}
    .sb-rtl-medium :where(p,li,h1,h2,h3,h4,h5,h6,td,th,div,span,label,summary,figcaption,blockquote,dd,dt){text-align:inherit}
    .sb-rtl-medium [style*="text-align:left"],.sb-rtl-medium [style*="text-align: left"]{text-align:right!important}
    .sb-rtl-medium ul,.sb-rtl-medium ol{padding-left:0;padding-right:1.4rem}
    .sb-rtl-medium [style*="border-left"]{border-left:0!important;border-right:4px solid #94a3b8}
    .sb-rtl-medium .katex,.sb-rtl-medium .katex-display,.sb-rtl-medium svg,.sb-rtl-medium code,.sb-rtl-medium pre,.sb-rtl-medium [dir="ltr"]{direction:ltr;unicode-bidi:isolate}
    .sb-rtl-medium .katex-display{text-align:center}
    .sb-rtl-medium .sb-tri-line[dir="ltr"],.sb-rtl-medium .sb-tri-line[lang="en"]{direction:ltr;text-align:left}
    `;
    document.head.appendChild(s);
    new MutationObserver(later).observe(document.body, {childList: true, subtree: true});
    scan();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.SBRtl = {scan};
})();
