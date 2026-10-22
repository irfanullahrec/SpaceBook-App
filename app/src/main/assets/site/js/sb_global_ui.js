/* Site-wide reading UI (every class, every subject):
 *  1. Collapsible cards start CLOSED. Accordion cards (.math-accordion-card, SLO / answer accordions, <details>)
 *     are closed as they are rendered. A card the reader opens stays open if the view re-renders.
 *  2. A ⛶ Full screen button sits in the Unit header (opposite the title); Esc or the button exits.
 *  3. In the shared book readers a heading's translation opens when the heading is clicked
 *     (sentences already open their translation just below them).
 * Loaded last in index.html; it only post-processes rendered HTML. */
(function () {
  'use strict';
  const opened = new Set();                 // cards the reader opened this session
  const keyOf = card => card.id || (card.querySelector('.math-acc-header, .slo-accordion-header, summary') || card).textContent.trim().slice(0, 120);

  function closeCard(card) {
    if (opened.has(keyOf(card))) return;
    if (card.tagName === 'DETAILS') { card.removeAttribute('open'); return; }
    card.classList.remove('open');
    const body = card.querySelector(':scope > .math-accordion-body, :scope > .slo-accordion-body, .math-accordion-body, .slo-accordion-body');
    if (body) body.style.display = 'none';
    const icon = card.querySelector('.math-acc-icon');
    if (icon) icon.textContent = '+';
    const sic = card.querySelector('.slo-acc-icon');
    if (sic && /▲/.test(sic.textContent)) sic.textContent = '▼';
    const badge = card.querySelector('.slo-acc-toggle');
    if (badge && /چھپائیں|Hide/i.test(badge.textContent)) badge.textContent = badge.textContent.replace('− جواب چھپائیں', '+ جواب دیکھیں').replace(/Hide/i, 'Show');
  }
  const CARD_SEL = '.math-accordion-card, .slo-accordion-card, .slo-question-accordion, details';
  function collapseIn(node) {
    if (!(node instanceof Element)) return;
    if (node.matches(CARD_SEL)) closeCard(node);
    node.querySelectorAll(CARD_SEL).forEach(closeCard);
  }
  // remember what the reader opens / closes
  document.addEventListener('click', e => {
    const h = e.target.closest && e.target.closest('.math-acc-header, .slo-accordion-header, summary');
    if (!h) return;
    const card = h.closest(CARD_SEL); if (!card) return;
    // stand-alone SLO cards (glossary, vocabulary…) have no toggle of their own in app.js, so open/close them here
    if (card.classList.contains('slo-accordion-card') && !h.closest('.slo-question-accordion')) {
      const body = card.querySelector('.slo-accordion-body');
      if (body) { const show = body.style.display === 'none'; body.style.display = show ? '' : 'none'; card.classList.toggle('open', show); const ic = card.querySelector('.slo-acc-icon'); if (ic) ic.textContent = show ? '▲' : '▼'; }
    }
    setTimeout(() => {
      const body = card.querySelector('.math-accordion-body, .slo-accordion-body');
      const isOpen = card.tagName === 'DETAILS' ? card.open : body ? body.style.display !== 'none' : card.classList.contains('open');
      const k = keyOf(card); if (isOpen) opened.add(k); else opened.delete(k);
    }, 0);
  }, true);
  // "Expand all" buttons keep working: anything they open is remembered
  window.addEventListener('load', () => {
    if (typeof window.expandAllMathCards === 'function') {
      const orig = window.expandAllMathCards;
      window.expandAllMathCards = function (id) { const r = orig.apply(this, arguments); document.querySelectorAll('.math-accordion-card.open').forEach(c => opened.add(keyOf(c))); return r; };
    }
  });

  // ---------- full screen ----------
  const css = `
  .sb-fs-btn{position:absolute;top:.45rem;right:.55rem;z-index:30;display:inline-flex;align-items:center;gap:.3rem;border:1px solid #cbd5e1;background:#fff;color:#0f172a;border-radius:10px;padding:.32rem .6rem;font:600 .82rem system-ui,sans-serif;cursor:pointer;box-shadow:0 2px 6px rgba(15,23,42,.12)}
  .sb-fs-btn:hover{background:#0369a1;color:#fff;border-color:#0369a1}
  .sb-fs-btn{direction:ltr}
  .sb-fs-btn.sb-fs-rtl{right:auto;left:.55rem}
  .sb-fs-host{position:relative}
  .sb-fs-host:fullscreen{background:#fff;overflow:auto;padding:1rem;width:100vw;height:100vh;box-sizing:border-box}
  .sb-fs-host:fullscreen .math-ch-sidebar{max-height:calc(100vh - 2rem)}
  .sb-fs-host:fullscreen .math-topic-area{max-height:calc(100vh - 2rem);overflow:auto}
  .sb-fs-host.sb-fs-fallback{position:fixed!important;inset:0;z-index:9000;background:#fff;overflow:auto;padding:1rem}
  .math-compact-header-bar>.sb-fs-btn{position:static!important;flex:0 0 auto;margin-inline-start:auto;min-height:40px;box-sizing:border-box}
  .math-compact-header-bar{flex-shrink:0;isolation:isolate}
  .math-compact-header-bar>.mch-left{width:auto!important;min-width:0;overflow:hidden}
  .sb-fs-host.math-unified-view{height:var(--sb-reader-height)!important;max-height:var(--sb-reader-height)!important;min-height:0!important}
  .sb-fs-host.math-unified-view .math-topic-area{overflow:hidden!important;min-height:0;max-height:100%!important}
  .sb-fs-host .math-tab-content-scroll{flex:1 1 0;min-height:0;overflow:auto;overscroll-behavior:contain}
  .sb-fs-host.math-unified-view:is(:fullscreen,.sb-fs-fallback){height:100dvh!important;max-height:100dvh!important;overflow:hidden!important}
  @media(max-width:760px){.math-compact-header-bar{gap:.35rem;padding-inline:.5rem}.math-compact-header-bar>.sb-fs-btn{font-size:.72rem;padding:.3rem .4rem}.sb-fs-host.math-unified-view:is(:fullscreen,.sb-fs-fallback){grid-template-columns:minmax(0,1fr)!important;grid-template-rows:minmax(90px,20dvh) minmax(0,1fr)}}
  `;
  function addCss() { if (document.getElementById('sb-global-ui-css')) return; const s = document.createElement('style'); s.id = 'sb-global-ui-css'; s.textContent = css; document.head.appendChild(s); }
  const isFs = () => !!(document.fullscreenElement || document.webkitFullscreenElement || document.querySelector('.sb-fs-fallback'));
  const fsChanged = () => { document.querySelectorAll('.sb-fs-btn').forEach(label); document.dispatchEvent(new CustomEvent('sb-fs-change')); };
  function label(btn) { btn.innerHTML = isFs() ? '🗗 Exit full screen' : '⛶ Full screen'; btn.title = isFs() ? 'Exit full screen (Esc)' : 'Show this page in full screen'; }
  function toggleFs(host) {
    const fb = document.querySelector('.sb-fs-fallback');
    if (fb) { fb.classList.remove('sb-fs-fallback'); fsChanged(); return; }
    if (document.fullscreenElement || document.webkitFullscreenElement) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
    const req = host.requestFullscreen || host.webkitRequestFullscreen;
    if (req) Promise.resolve(req.call(host)).catch(() => { host.classList.add('sb-fs-fallback'); fsChanged(); }); else host.classList.add('sb-fs-fallback');
    setTimeout(fsChanged, 120);
  }
  document.addEventListener('fullscreenchange', fsChanged);
  document.addEventListener('webkitfullscreenchange', fsChanged);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { const fb = document.querySelector('.sb-fs-fallback'); if (fb) { fb.classList.remove('sb-fs-fallback'); fsChanged(); } } });
  const HOST_SEL = '.math-unified-view, .bio-view, .drawing-workspace';
  function addFsButtons() {
    document.querySelectorAll(HOST_SEL).forEach(host => {
      if (host.parentElement && host.parentElement.closest(HOST_SEL)) return;   // only the outermost workspace
      const area = host.querySelector('.math-topic-area, #subjectTopicArea, .drawing-topic-area') || host;
      const header = area.querySelector(':scope > .math-compact-header-bar');
      const destination = header || area;
      const rtl = getComputedStyle(area).direction === 'rtl' || !!area.querySelector('.m6-rtl,.m5-rtl,.m7-rtl,.m8-rtl,[dir="rtl"].m6-root');
      if (header) header.dir = rtl ? 'rtl' : 'ltr';
      const old = area.querySelector('.sb-fs-btn');
      // right-to-left books start their title on the right, so the button goes to the left
      if (old) { old.classList.toggle('sb-fs-rtl', rtl); if (old.parentElement !== destination) destination.appendChild(old); return; }
      host.classList.add('sb-fs-host');
      if (getComputedStyle(area).position === 'static') area.style.position = 'relative';
      const b = document.createElement('button'); b.type = 'button'; b.className = 'sb-fs-btn'; label(b);
      b.classList.toggle('sb-fs-rtl', rtl);
      b.addEventListener('click', e => { e.stopPropagation(); toggleFs(host); });
      if (header) header.appendChild(b); else area.prepend(b);
    });
    const floating = document.getElementById('bk-fs-float');
    if (floating && document.querySelector('.sb-fs-host .sb-fs-btn')) floating.remove();
    fitReaders();
  }

  // The header is a non-scrolling flex sibling of the lesson. Size the workspace
  // from its actual viewport position, including navigation and mobile browser chrome.
  function fitReaders() {
    const nav = document.getElementById('top-header');
    if (nav) document.documentElement.style.setProperty('--top-total-h', Math.ceil(nav.getBoundingClientRect().bottom) + 'px');
    document.querySelectorAll('.math-unified-view.sb-fs-host').forEach(host => {
      if (host.matches(':fullscreen,.sb-fs-fallback')) return;
      if (window.scrollY) window.scrollTo(0, 0);
      const height = Math.max(0, (window.visualViewport ? window.visualViewport.height : window.innerHeight) - host.getBoundingClientRect().top - 8);
      const value = height + 'px';
      if (host.style.getPropertyValue('--sb-reader-height') !== value) host.style.setProperty('--sb-reader-height', value);
    });
  }
  window.addEventListener('resize', fitReaders);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', fitReaders);
  document.addEventListener('sb-fs-change', () => requestAnimationFrame(fitReaders));
  window.addEventListener('load', () => { const nav = document.getElementById('top-header'); if (nav && window.ResizeObserver) new ResizeObserver(fitReaders).observe(nav); });

  // ---------- heading translations open on click ----------
  document.addEventListener('click', e => {
    const h = e.target.closest && e.target.closest('.m5-h3,.m5-h4,.m6-h3,.m6-h4,.m7-h3,.m7-h4,.m8-h3,.m8-h4');
    if (!h || e.target.closest('.c1-say, .m6-w, .m5-w, .m7-w, .m8-w, button, a')) return;
    h.classList.toggle('sb-hopen');
  });

  const obs = new MutationObserver(muts => {
    muts.forEach(m => m.addedNodes.forEach(collapseIn));
    if (!obs.t) obs.t = setTimeout(() => { obs.t = 0; addFsButtons(); }, 40);   // throttle: pages that never stop changing still get the button
  });
  const start = () => { addCss(); collapseIn(document.body); addFsButtons(); obs.observe(document.body, {childList: true, subtree: true}); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
