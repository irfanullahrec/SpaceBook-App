/* Original pages of the Munawar (Kanz) books: the page exactly as the publisher printed it (diagrams, pictures and all), with SpaceBook's tools
 * around it. The pictures are the ones inside the publisher's PDFs, unchanged (content/munawar_pages/<subject>/pNNN.jpg, made by
 * docs/source-verification/private/munawar/tools/extract_page_images.py); the credit stays under every page, as the licence of 15 October 2026 asks.
 *
 * A "Original pages" button appears on the page of a Munawar book. It opens a full-screen viewer: previous / next page, page number box,
 * zoom, a thumbnail rail, keys (arrows, +, -, 0, Esc) and a swipe on touch screens. Pages follow the same rule as the lessons: the first two
 * units of a book (and the cover, preface and contents before them) are open for everyone, later pages need a plan (SBAccess.canRead / paywall).
 * Dev-only reference: tests/private/browser.js opens it. */
(function () {
  'use strict';
  if (window.SBMunPages) return;
  const BASE = 'content/munawar_pages/';
  const FREE_UNITS = 2, FREE_PAGES_NO_UNITS = 12;     // a book without a unit list shows its first 12 pages free
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  let index = null, loading = null, subject = '', open = null;

  const css = `
  .sbmp-btn{position:fixed;left:14px;bottom:14px;z-index:60;display:none;align-items:center;gap:.45rem;padding:.6rem 1rem;border:0;border-radius:999px;background:linear-gradient(180deg,#1e3a8a,#172554);color:#fff;font:700 .92rem system-ui,sans-serif;box-shadow:0 6px 18px rgba(15,23,42,.35);cursor:pointer}
  .sbmp-btn.on{display:inline-flex}
  .sbmp-btn:focus-visible,.sbmp button:focus-visible,.sbmp input:focus-visible{outline:3px solid #fbbf24;outline-offset:2px}
  body.sbmp-open .rt-size,body.sbmp-open .bk-nav,body.sbmp-open .sb-fs-btn{display:none!important}
  .sbmp{position:fixed;inset:0;z-index:2000;display:flex;flex-direction:column;background:#0b1220;color:#e5e7eb;font-family:system-ui,'Segoe UI',sans-serif}
  .sbmp-top{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem .9rem;padding:.55rem .9rem;background:linear-gradient(180deg,#1e3a8a,#172554);color:#fff}
  .sbmp-top b{font-size:1rem}.sbmp-top .u{font-family:'Noto Nastaliq Urdu','Jameel Noori Nastaleeq',serif;font-size:1.05rem;opacity:.9}
  .sbmp-grow{flex:1}
  .sbmp button{min-width:2.4rem;height:2.4rem;padding:0 .7rem;border:0;border-radius:8px;background:rgba(255,255,255,.14);color:#fff;font:700 .95rem system-ui,sans-serif;cursor:pointer}
  .sbmp button:hover:not(:disabled){background:rgba(255,255,255,.26)}.sbmp button:disabled{opacity:.4;cursor:default}
  .sbmp input{width:4.2rem;height:2.4rem;border:0;border-radius:8px;padding:0 .4rem;text-align:center;font:700 .95rem system-ui,sans-serif}
  .sbmp-body{flex:1;display:flex;min-height:0}
  .sbmp-rail{width:92px;flex:none;overflow-y:auto;padding:.5rem;background:#0f1a30;border-right:1px solid #1e293b}
  .sbmp .sbmp-th{display:block;width:100%;margin:0 0 .5rem;padding:0;border:2px solid transparent;border-radius:4px;background:#1e293b;color:#94a3b8;font-size:.72rem;cursor:pointer;text-align:center;min-height:0;height:auto}
  .sbmp .sbmp-th.cur{border-color:#fbbf24}.sbmp .sbmp-th img{display:block;width:100%;height:auto;border-radius:2px;background:#fff}
  .sbmp .sbmp-th .lk{display:flex;align-items:center;justify-content:center;aspect-ratio:437/547;font-size:1.4rem}
  .sbmp-stage{flex:1;min-width:0;overflow:auto;display:flex;align-items:flex-start;padding:1rem;-webkit-overflow-scrolling:touch}
  .sbmp-page{background:#fff;box-shadow:0 10px 34px rgba(0,0,0,.55);max-width:none;height:auto;flex:none;margin:0 auto}
  .sbmp-lock{margin:auto;max-width:26rem;padding:1.6rem;border-radius:12px;background:#fff;color:#0f172a;text-align:center;box-shadow:0 10px 34px rgba(0,0,0,.45)}
  .sbmp-lock .i{font-size:2.4rem}.sbmp-lock p{margin:.5rem 0 1rem;line-height:1.5}
  .sbmp-lock button{background:#1e3a8a;height:2.6rem}
  .sbmp-foot{padding:.4rem .9rem;background:#0f1a30;color:#94a3b8;font-size:.78rem;text-align:center}
  @media (max-width:760px){.sbmp-rail{display:none}.sbmp-stage{padding:.4rem}.sbmp-top .u{display:none}}`;
  function addCss() {
    if (document.getElementById('sbmp-css')) return;
    const st = document.createElement('style'); st.id = 'sbmp-css'; st.textContent = css; document.head.appendChild(st);
  }

  const load = () => index ? Promise.resolve(index) : (loading = loading || fetch(BASE + 'index.json').then(r => r.json()).then(j => (index = j)).catch(() => (index = {})));
  const isMun = id => /^cls[1-4]-mun-[a-z]+$/.test(String(id || ''));
  const D = () => (typeof DATA !== 'undefined' ? DATA : {});       // DATA is a top-level const of app.js, not a property of window
  const subj = () => { const c = (D().subjects || {})[subject.slice(0, 4)] || []; return c.find(s => s.id === subject) || {}; };

  // which unit a page belongs to: -1 = cover, preface, contents (before the first unit)
  function unitOf(meta, idx) {
    const starts = meta.units || [], printed = idx + 1;
    if (!starts.length) return idx < FREE_PAGES_NO_UNITS ? -1 : FREE_UNITS;
    let u = -1; starts.forEach((p, k) => { if (printed >= p) u = k; });
    return u;
  }
  function canSee(meta, idx) {
    const u = unitOf(meta, idx);
    if (u < FREE_UNITS) return true;
    const A = window.SBAccess, cls = subject.slice(0, 4), key = subject.slice(subject.indexOf('-') + 1);
    return !!(A && A.canRead && A.canRead(cls, key, u));
  }
  const src = (meta, idx) => BASE + subject + '/p' + String(idx).padStart(3, '0') + '.' + (meta.ext || 'jpg');

  function close() {
    if (!open) return;
    document.removeEventListener('keydown', open.key, true);
    document.body.classList.remove('sbmp-open');
    open.el.remove(); open.back && open.back.focus && open.back.focus(); open = null;
  }

  function show(meta) {
    addCss();
    const s = subj(), total = meta.count;
    const prevFocus = document.activeElement;
    const el = document.createElement('div');
    el.className = 'sbmp'; el.setAttribute('data-no-translate', ''); el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Original pages of ' + (s.name || 'the book'));
    el.innerHTML = `<div class="sbmp-top"><b>${esc(s.name || 'Book')}</b><span class="u" dir="rtl">${esc(s.nameUrdu || '')}</span><span class="sbmp-grow"></span>` +
      `<button type="button" data-a="prev" aria-label="Previous page">◀</button><label>Page <input type="number" min="1" max="${total}" aria-label="Page number"></label><span>of ${total}</span>` +
      `<button type="button" data-a="next" aria-label="Next page">▶</button><button type="button" data-a="out" aria-label="Smaller">−</button><button type="button" data-a="fit" aria-label="Fit to screen">Fit</button>` +
      `<button type="button" data-a="in" aria-label="Larger">+</button><button type="button" data-a="close" aria-label="Close">✕ Close</button></div>` +
      `<div class="sbmp-body"><nav class="sbmp-rail" aria-label="Pages"></nav><main class="sbmp-stage" tabindex="0"></main></div>` +
      `<div class="sbmp-foot">Pages © Munawar Publisher (${esc((D().series && D().series.munawar && D().series.munawar.line) || 'Kanz Series')}), shown as published under licence. SpaceBook adds the tools around the page.</div>`;
    document.body.appendChild(el); document.body.classList.add('sbmp-open');
    const rail = el.querySelector('.sbmp-rail'), stage = el.querySelector('.sbmp-stage'), num = el.querySelector('input');
    let cur = 0, zoom = 0;                                                   // zoom 0 = fit the screen
    rail.innerHTML = Array.from({length: total}, (_, i) => `<button type="button" class="sbmp-th" data-i="${i}" aria-label="Page ${i + 1}">` +
      (canSee(meta, i) ? `<img loading="lazy" decoding="async" alt="" src="${src(meta, i)}">` : '<div class="lk">🔒</div>') + `${i + 1}</button>`).join('');
    function draw() {
      num.value = cur + 1;
      el.querySelector('[data-a=prev]').disabled = cur <= 0; el.querySelector('[data-a=next]').disabled = cur >= total - 1;
      rail.querySelectorAll('.sbmp-th').forEach(b => { const on = +b.dataset.i === cur; b.classList.toggle('cur', on); if (on) b.scrollIntoView({block: 'nearest'}); });
      if (!canSee(meta, cur)) {
        stage.innerHTML = '<div class="sbmp-lock" role="region" aria-label="Locked page"><div class="i" aria-hidden="true">🔒</div><p><b>This chapter needs a plan.</b><br>The first two units of every book are free.</p><button type="button" data-a="plan">See plans</button></div>';
        return;
      }
      const h = Math.max(300, stage.clientHeight - 32), ratio = meta.w / meta.h;
      const style = zoom ? `width:${Math.round(meta.w * zoom)}px;height:auto` : `width:${Math.round(Math.max(120, Math.min(stage.clientWidth - 32, h * ratio)))}px;height:auto`;      // each picture keeps its own proportions (they differ by a few pixels inside a book)
      stage.innerHTML = `<img class="sbmp-page" alt="Page ${cur + 1} of ${esc(s.name || 'the book')} as printed" style="${style}" src="${src(meta, cur)}">`;
      stage.scrollTop = 0;
      [cur + 1, cur - 1].forEach(i => { if (i >= 0 && i < total && canSee(meta, i)) { const p = new Image(); p.src = src(meta, i); } });   // the next page is ready
    }
    const go = i => { cur = Math.max(0, Math.min(total - 1, i)); draw(); };
    const act = a => {
      if (a === 'prev') go(cur - 1); else if (a === 'next') go(cur + 1); else if (a === 'close') close();
      else if (a === 'in') { zoom = Math.min(3, (zoom || (stage.clientHeight - 32) / meta.h) * 1.25); draw(); }
      else if (a === 'out') { zoom = Math.max(.4, (zoom || (stage.clientHeight - 32) / meta.h) / 1.25); draw(); }
      else if (a === 'fit') { zoom = 0; draw(); }
      else if (a === 'plan') { if (window.SBAccess && SBAccess.paywall) SBAccess.paywall('chapter', {cls: subject.slice(0, 4), subject: subject.slice(subject.indexOf('-') + 1)}); }
    };
    el.addEventListener('click', e => { const b = e.target.closest('[data-a],[data-i]'); if (!b) return; if (b.dataset.i != null) go(+b.dataset.i); else act(b.dataset.a); });
    num.addEventListener('change', () => go((parseInt(num.value, 10) || 1) - 1));
    const key = e => {
      if (e.target === num && e.key !== 'Escape') return;
      const k = e.key;
      if (k === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
      else if (k === 'ArrowRight' || k === 'PageDown') { e.preventDefault(); go(cur + 1); }
      else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); go(cur - 1); }
      else if (k === '+' || k === '=') act('in'); else if (k === '-') act('out'); else if (k === '0') act('fit');
    };
    document.addEventListener('keydown', key, true);
    let x0 = null;                                                           // swipe
    stage.addEventListener('touchstart', e => { x0 = e.touches.length === 1 ? e.touches[0].clientX : null; }, {passive: true});
    stage.addEventListener('touchend', e => { if (x0 == null) return; const d = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(d) > 70 && !zoom) go(cur + (d < 0 ? 1 : -1)); }, {passive: true});
    window.addEventListener('resize', () => { if (open && !zoom) draw(); });
    open = {el, key, back: prevFocus};
    go(0);
    el.querySelector('[data-a=close]').focus();
  }

  function openFor(startIdx) {
    if (!isMun(subject)) return;
    load().then(ix => { const m = ix[subject]; if (m && m.count) { show(m); if (startIdx) { /* reserved */ } } });
  }

  // the button: shown while a Munawar book is the open subject
  function track() {
    const o = window.openSubject;
    if (typeof o === 'function' && !o.__sbmp) {
      const w = function (cls, id) { subject = isMun(id) ? id : ''; return o.apply(this, arguments); };
      w.__sbmp = true; window.openSubject = w;
    }
  }
  function mount() {
    addCss();
    const b = document.createElement('button'); b.type = 'button'; b.className = 'sbmp-btn'; b.setAttribute('data-no-translate', ''); b.setAttribute('aria-label', 'Open the original pages of this book');
    b.innerHTML = '<span aria-hidden="true">📄</span> Original pages'; b.addEventListener('click', () => openFor(0));
    document.body.appendChild(b);
    track();                                       // from the start, so a book opened before the first tick of the poll is noticed too
    setInterval(() => {
      track();
      let detail = true;
      try { detail = typeof state !== 'undefined' ? state.activeView === 'subject-detail' : true; } catch (e) { detail = true; }
      b.classList.toggle('on', !!subject && detail && !open);
    }, 600);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
  window.SBMunPages = { open: openFor, close, unitOf, canSee: (id, idx) => load().then(ix => { subject = id; return canSee(ix[id], idx); }) };
})();
