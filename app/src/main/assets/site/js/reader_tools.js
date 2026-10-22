/* ======================================================================
 *  reader_tools.js — small study aids added to every book reader
 *
 *  Every reader in the app renders the same shell:
 *    .math-unified-view > .math-ch-sidebar (.math-ch-list of lessons)
 *                       + .math-topic-area (the lesson)
 *  so these tools work in all classes and subjects without touching them:
 *    • ✓ ticks on lessons already opened (data from continue_learning.js)
 *    • "Find a lesson" filter above long lesson lists
 *    • Aa text-size control for the lesson area (remembered per browser)
 *  Loaded after app.js, the readers and continue_learning.js.
 * ====================================================================== */
(function () {
  'use strict';

  const SIZES = [0.9, 1, 1.15, 1.3, 1.5];
  const FILTER_MIN = 10;

  const store = {
    get(k, d) { try { const v = localStorage.getItem('sbRT:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('sbRT:' + k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };

  // ── lesson index from a list button's onclick ───────────────────────────
  // selectSubjectChapter('urdu', 3, 'cls6') · selectMathChapter(3) · openGenericChapterDetails('cls3','x','Urdu',4)
  function lessonIndex(btn) {
    const oc = btn.getAttribute('onclick') || '';
    let m = oc.match(/openGenericChapterDetails\((?:\s*'[^']*'\s*,){3}\s*(\d+)/);
    if (m) return +m[1];
    m = oc.match(/Chapter\(\s*(?:'[^']*'\s*,\s*)?(\d+)/);
    return m ? +m[1] : null;
  }

  // ── ✓ progress ticks ────────────────────────────────────────────────────
  function applyTicks(list) {
    const api = window.SBContinue;
    const cur = api && api.current && api.current();
    const entry = cur && api.entry(cur.classId, cur.subjId);
    const done = new Set(entry && Array.isArray(entry.done) ? entry.done : []);
    list.querySelectorAll('[onclick*="Chapter("]').forEach(btn => {
      const i = lessonIndex(btn);
      const on = i != null && done.has(i);
      btn.classList.toggle('rt-done', on);
      if (on) btn.setAttribute('data-rt-done', 'Opened before');
      else btn.removeAttribute('data-rt-done');
    });
  }

  // ── "Find a lesson" filter ──────────────────────────────────────────────
  const fold = s => String(s || '').toLowerCase().replace(/[ً-ْٰ]/g, '').replace(/\s+/g, ' ');
  function applyFilter(list) {
    const items = list.querySelectorAll('[onclick*="Chapter("]');
    let box = list.previousElementSibling && list.previousElementSibling.classList.contains('rt-filter') ? list.previousElementSibling : null;
    if (items.length < FILTER_MIN) { if (box) box.remove(); return; }
    if (box) return;
    box = document.createElement('div');
    box.className = 'rt-filter';
    box.innerHTML = '<input type="search" class="rt-filter-input" placeholder="Find a lesson…  سبق تلاش کریں" aria-label="Find a lesson">' +
      '<div class="rt-filter-empty" hidden>No lesson matches</div>';
    list.parentElement.insertBefore(box, list);
    const input = box.querySelector('input'), empty = box.querySelector('.rt-filter-empty');
    input.addEventListener('input', () => {
      const q = fold(input.value.trim());
      let shown = 0;
      list.querySelectorAll('[onclick*="Chapter("]').forEach(btn => {
        const hit = !q || fold(btn.textContent).includes(q);
        btn.style.display = hit ? '' : 'none';
        if (hit) shown++;
      });
      empty.hidden = shown > 0;
    });
  }

  // ── Aa text size ────────────────────────────────────────────────────────
  let sizeBtn = null, sizePanel = null;
  function level() { const v = store.get('size', 1); return SIZES.includes(v) ? v : 1; }
  function applySize() {
    const v = level();
    document.querySelectorAll('.math-unified-view .math-topic-area').forEach(a => { a.style.zoom = v === 1 ? '' : String(v); });
    if (sizePanel) sizePanel.querySelector('.rt-size-val').textContent = Math.round(v * 100) + '%';
  }
  function step(d) {
    const i = SIZES.indexOf(level());
    const n = SIZES[Math.max(0, Math.min(SIZES.length - 1, (i < 0 ? 1 : i) + d))];
    store.set('size', n);
    applySize();
  }
  function ensureSizeControl(show) {
    if (!sizeBtn) {
      sizeBtn = document.createElement('div');
      sizeBtn.className = 'rt-size';
      sizeBtn.innerHTML =
        '<div class="rt-size-panel" role="group" aria-label="Text size" hidden>' +
          '<button type="button" data-d="-1" aria-label="Smaller text">A−</button>' +
          '<span class="rt-size-val">100%</span>' +
          '<button type="button" data-d="1" aria-label="Larger text">A+</button>' +
        '</div>' +
        '<button type="button" class="rt-size-toggle" aria-label="Text size" title="Text size">Aa</button>';
      document.body.appendChild(sizeBtn);
      sizePanel = sizeBtn.querySelector('.rt-size-panel');
      sizeBtn.addEventListener('click', e => {
        e.stopPropagation();
        const b = e.target.closest('button');
        if (!b) return;
        if (b.classList.contains('rt-size-toggle')) sizePanel.hidden = !sizePanel.hidden;
        else step(+b.dataset.d);
      });
      document.addEventListener('mousedown', e => { if (sizePanel && !sizePanel.hidden && !e.target.closest('.rt-size')) sizePanel.hidden = true; }, true);
    }
    sizeBtn.classList.toggle('rt-show', !!show);
    if (!show && sizePanel) sizePanel.hidden = true;
  }

  // ── keep everything applied as readers re-render ────────────────────────
  function decorate() {
    const view = document.querySelector('.math-unified-view');
    ensureSizeControl(!!view);
    if (!view) return;
    const list = view.querySelector('.math-ch-list');
    if (list) { applyTicks(list); applyFilter(list); }
    applySize();
  }

  let t = 0;
  function schedule() { clearTimeout(t); t = setTimeout(decorate, 150); }
  function start() {
    const host = document.getElementById('dashboard-body') || document.body;
    new MutationObserver(schedule).observe(host, { childList: true, subtree: true });
    schedule();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  window.SBReaderTools = { refresh: decorate };
})();
