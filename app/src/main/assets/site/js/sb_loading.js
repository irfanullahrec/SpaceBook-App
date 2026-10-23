/* sb_loading.js — a loading overlay while a chapter (or tab) is opening.
 * Opening a chapter renders a lot of HTML in one go and the page looks frozen for a moment. A click on a chapter / tab button
 * first paints a full-screen overlay (five moving bars), then lets the original handler run, then removes the overlay again.
 * It also works in full-screen mode (the overlay joins the full-screen element). Nothing else in the app is changed. */
(function () {
  'use strict';
  const CALL = /^\s*(select\w*Chapter|switch\w*Tab)\s*\(/;
  const CSS = `
.sb-loading{position:fixed;inset:0;z-index:2147483646;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.9rem;
  background:rgba(15,23,42,.45);backdrop-filter:blur(2px);opacity:0;animation:sbl-in .2s ease .12s forwards;cursor:progress}
.sb-loading-card{display:flex;flex-direction:column;align-items:center;gap:.8rem;padding:1.4rem 2.2rem;border-radius:16px;background:#fff;color:#0f172a;box-shadow:0 18px 50px rgba(0,0,0,.3);font:600 1rem system-ui,sans-serif}
.sb-loading-bars{display:flex;align-items:flex-end;gap:6px;height:44px}
.sb-loading-bars i{width:9px;height:100%;border-radius:4px;background:#027cba;transform-origin:bottom;animation:sbl-bar 1s ease-in-out infinite}
.sb-loading-bars i:nth-child(2){animation-delay:.12s;background:#0ea5e9}
.sb-loading-bars i:nth-child(3){animation-delay:.24s;background:#16a34a}
.sb-loading-bars i:nth-child(4){animation-delay:.36s;background:#f59e0b}
.sb-loading-bars i:nth-child(5){animation-delay:.48s;background:#7c3aed}
@keyframes sbl-bar{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}
@keyframes sbl-in{to{opacity:1}}
@media (prefers-reduced-motion:reduce){.sb-loading-bars i{animation-duration:2.4s}}`;
  let box = null, depth = 0;
  function style() {
    if (document.getElementById('sb-loading-css')) return;
    const s = document.createElement('style'); s.id = 'sb-loading-css'; s.textContent = CSS; document.head.appendChild(s);
  }
  function show(label) {
    style(); depth++;
    if (box) return;
    box = document.createElement('div');
    box.className = 'sb-loading'; box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite');
    box.innerHTML = '<div class="sb-loading-card"><div class="sb-loading-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><span>' + (label || 'Loading…') + '</span></div>';
    (document.fullscreenElement || document.body).appendChild(box);   // inside the full-screen element, or it would stay hidden behind it
  }
  function hide() {
    if (--depth > 0) return;
    depth = 0;
    if (box) { box.remove(); box = null; }
  }
  window.SBLoading = { show, hide };

  // next painted frame; plain timer as a fallback when the page is not being painted (hidden window)
  function after(fn) { let done = false; const go = () => { if (!done) { done = true; fn(); } }; requestAnimationFrame(() => setTimeout(go, 20)); setTimeout(go, 90); }

  document.addEventListener('click', e => {
    const el = e.target.closest && e.target.closest('[onclick]');
    if (!el || el.__sbGo || !CALL.test(el.getAttribute('onclick') || '')) return;
    if (el.closest('.sb-loading')) return;
    e.preventDefault(); e.stopImmediatePropagation();
    show('Opening…');
    // let the overlay paint first, then run the original click (the handler blocks the page while it renders)
    after(() => {
      el.__sbGo = true;
      try { el.click(); } finally { el.__sbGo = false; }
      after(hide);
    });
  }, true);

  // safety net: never leave the overlay up
  setInterval(() => { if (box && !document.hidden && Date.now() - (box._t = box._t || Date.now()) > 20000) { depth = 1; hide(); } }, 5000);
})();
