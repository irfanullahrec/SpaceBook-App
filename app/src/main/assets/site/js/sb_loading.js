/* sb_loading.js — a loading overlay with a progress bar and a percent while something slow is opening.
 * Opening a chapter, a tab, a subject, a test track or the paper maker renders a lot of HTML in one go and the page looks frozen for a moment.
 * A click on such a button first paints a full-screen overlay (the bar, a percent, five moving bars), then lets the original handler run, then
 * removes the overlay again. The bar is a CSS transform animation, so it keeps moving on the graphics thread while the page's own thread is busy.
 * Percent: the page cannot count how far its own rendering is, so the number is an estimate that climbs quickly, slows down near the end and
 * stops at 94 until the work is really done; work that CAN be counted (a download) calls SBLoading.set(percent) with the real number.
 * It also works in full-screen mode (the overlay joins the full-screen element).
 *     SBLoading.show(label) / hide() / set(percent)         SBLoading.track(promise, label) shows it for as long as a promise runs */
(function () {
  'use strict';
  const CALL = /^\s*(select\w*Chapter|switch\w*Tab|openSubject|openCompetitiveTestModal|onPaper(?:Class|Subject)Select|jumpToCategoryStep)\s*\(/;
  const CSS = `
.sb-loading{position:fixed;inset:0;z-index:2147483646;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.9rem;
  background:rgba(15,23,42,.45);backdrop-filter:blur(2px);opacity:0;animation:sbl-in .2s ease .12s forwards;cursor:progress}
.sb-loading-card{display:flex;flex-direction:column;align-items:center;gap:.7rem;padding:1.3rem 1.8rem;border-radius:16px;background:#fff;color:#0f172a;box-shadow:0 18px 50px rgba(0,0,0,.3);font:600 1rem system-ui,sans-serif;min-width:min(78vw,300px)}
.sb-loading-bars{display:flex;align-items:flex-end;gap:6px;height:38px}
.sb-loading-bars i{width:9px;height:100%;border-radius:4px;background:#027cba;transform-origin:bottom;animation:sbl-bar 1s ease-in-out infinite}
.sb-loading-bars i:nth-child(2){animation-delay:.12s;background:#0ea5e9}
.sb-loading-bars i:nth-child(3){animation-delay:.24s;background:#16a34a}
.sb-loading-bars i:nth-child(4){animation-delay:.36s;background:#f59e0b}
.sb-loading-bars i:nth-child(5){animation-delay:.48s;background:#7c3aed}
.sb-loading-track{align-self:stretch;height:8px;border-radius:999px;background:#e2e8f0;overflow:hidden}
.sb-loading-fill{display:block;height:100%;width:100%;border-radius:999px;background:linear-gradient(90deg,#027cba,#16a34a);transform-origin:left;transform:scaleX(0);animation:sbl-fill 14s cubic-bezier(.05,.75,.2,1) forwards}
.sb-loading-fill.real{animation:none;transition:transform .2s ease}
.sb-loading-pct{font:800 .95rem system-ui,sans-serif;color:#0369a1;font-variant-numeric:tabular-nums}
@keyframes sbl-bar{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}
@keyframes sbl-fill{to{transform:scaleX(.94)}}
@keyframes sbl-in{to{opacity:1}}
@media (prefers-reduced-motion:reduce){.sb-loading-bars i{animation-duration:2.4s}}`;
  let box = null, depth = 0, label = null, pctEl = null, fill = null, t0 = 0, timer = 0, real = false;
  function style() {
    if (document.getElementById('sb-loading-css')) return;
    const s = document.createElement('style'); s.id = 'sb-loading-css'; s.textContent = CSS; document.head.appendChild(s);
  }
  const estimate = ms => Math.min(94, Math.round(94 * (1 - Math.exp(-ms / 2200))));
  function paint(p) { if (pctEl) pctEl.textContent = p + '%'; if (box) box.setAttribute('aria-valuenow', String(p)); }
  function show(text) {
    style(); depth++;
    if (box) return;
    real = false; t0 = Date.now();
    box = document.createElement('div');
    box.className = 'sb-loading'; box.setAttribute('role', 'progressbar'); box.setAttribute('aria-live', 'polite'); box.setAttribute('aria-valuemin', '0'); box.setAttribute('aria-valuemax', '100'); box.setAttribute('aria-valuenow', '0');
    box.innerHTML = '<div class="sb-loading-card"><div class="sb-loading-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><span class="sb-loading-label"></span>' +
      '<div class="sb-loading-track" aria-hidden="true"><i class="sb-loading-fill"></i></div><span class="sb-loading-pct">0%</span></div>';
    label = box.querySelector('.sb-loading-label'); pctEl = box.querySelector('.sb-loading-pct'); fill = box.querySelector('.sb-loading-fill');
    label.textContent = text || 'Loading…';
    (document.fullscreenElement || document.body).appendChild(box);   // inside the full-screen element, or it would stay hidden behind it
    timer = setInterval(() => { if (!real) paint(estimate(Date.now() - t0)); }, 120);
  }
  // real progress (a download): 0..100
  function set(p) {
    if (!box) return;
    p = Math.max(0, Math.min(100, Math.round(p))); real = true;
    fill.classList.add('real'); fill.style.transform = 'scaleX(' + (p / 100) + ')'; paint(p);
  }
  function hide() {
    if (--depth > 0) return;
    depth = 0; clearInterval(timer); timer = 0;
    if (box) { box.remove(); box = null; label = pctEl = fill = null; }
  }
  function track(promise, text) {
    show(text);
    const done = () => hide();
    Promise.resolve(promise).then(done, done);
    return promise;
  }
  window.SBLoading = { show, hide, set, track };

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
