/* Exercise tabs for every Mathematics book (Classes 1-12).
 * The Exercises tab of a Mathematics unit has one small tab per printed exercise (Ex 3.1 · Ex 3.2 · … · Review), pinned under
 * the Exercises tab exactly like the Class 9 and 10 books (.math-sub-tabs); only the chosen exercise is on screen.
 *  - Normal view: the readers of Classes 1-8 and 11 draw one collapsed card per exercise. This file puts those cards under a tab bar
 *    and shows the chosen one open. Classes 9, 10 and 12 already draw their own bar (renderMathExercises) and are left alone.
 *  - Full screen: the Exercises tab is the open book (sb_book_spread.js). The same bar sits above the spreads; a tab scrolls to the
 *    spread that holds its exercise and the bar follows the scrolling.
 * Loaded after sb_book_spread.js and sb_global_ui.js. It only post-processes what the readers drew; no book data is touched. */
(function () {
  'use strict';
  const fsOn = () => !!(document.fullscreenElement || document.webkitFullscreenElement || document.querySelector('.sb-fs-fallback'));
  const box = () => document.getElementById('subjTabContent') || document.getElementById('mathTabContent');
  const onExercises = () => document.getElementById('subjTabContent') ? state.activeSubjTab === 'exercise' : state.activeMathTab === 'exercises' || state.activeMathTab === 'exercise';
  const clean = s => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const chosen = new Map();            // unit -> exercise last chosen, so coming back to the tab keeps it
  const unitKey = () => [state.selectedClass, state.activeSubject, document.getElementById('subjTabContent') ? state.selectedSubjChapter : state.selectedMathChapter].join('|');

  const css = `
  .sb-extabs>.math-accordion-card.sb-extab-card{display:none}
  .sb-extabs>.math-accordion-card.sb-extab-card.sb-on{display:block}
  .sb-extabs>.sb-extab-card>.math-accordion-body{display:block!important}
  .sb-extabs>.sb-extab-card>.math-acc-header{cursor:default;pointer-events:none}
  .sb-extabs>.sb-extab-card .math-acc-icon{display:none!important}
  .sb-fx-bar{margin-top:0!important}
  `;
  function addCss() { if (document.getElementById('sb-exercise-tabs-css')) return; const s = document.createElement('style'); s.id = 'sb-exercise-tabs-css'; s.textContent = css; document.head.appendChild(s); }

  // ---------- tab names ----------
  // badge / title as the readers print them: "Exercise 3.1" + "Textbook page 42", "Exercise" + "Exercise 3 (continued) (p. 15)",
  // "Review Exercise 3", "Exercise" + "Count the objects and write (Page 6) (p. 6)"
  const shorten = s => clean(s).replace(/\bcontinued\b/i, 'cont.');
  const pageIn = t => { const m = /\(p\.\s*(\d+)[^)]*\)\s*$|Textbook page\s+(\d+)|\(Pages?\s+(\d+)/i.exec(clean(t)); return m ? (m[1] || m[2] || m[3]) : ''; };
  function labelOf(badge, title, page) {
    badge = clean(badge); title = clean(title);
    const name = (!badge || /^Exercise$/i.test(badge) ? title : badge).replace(/\s*\(p\.\s*[\d–-]+\)\s*$/, '').replace(/\s*\(Pages?\s+[\d–-]+\)/i, '').trim();
    let m = /^R(\d+)$/.exec(name);                                       // Class 9-10 books code the review exercise R1, R2 …
    if (m) return '🌟 Review ' + m[1];
    m = /^Review(?:\s+Exercise)?\s*(.*)$/i.exec(name);
    if (m) { const rest = m[1], par = /^\((.+)\)$/.exec(rest); return '🌟 Review' + (par ? ' (' + shorten(par[1]) + ')' : rest ? ' ' + rest : ''); }
    m = /^Exercise\s+([\w.]+)\s*(?:\((.+)\))?$/i.exec(name);
    if (m) return 'Ex ' + m[1] + (m[2] ? ' (' + shorten(m[2]) + ')' : '');
    return page ? 'Page ' + page : name;                                  // an unnumbered exercise (Class 1) is named by its printed page
  }
  // two tabs with one name (continued pages, two 8.9s) are told apart by their page
  function uniqueLabels(items) {
    const count = {};
    items.forEach(it => { count[it.label] = (count[it.label] || 0) + 1; });
    items.forEach(it => { if (count[it.label] > 1 && it.page && it.label !== 'Page ' + it.page) it.label += ' · p.' + it.page; });
    const again = {};
    items.forEach(it => { again[it.label] = (again[it.label] || 0) + 1; if (again[it.label] > 1) it.label += ' #' + again[it.label]; });
    return items;
  }
  const barHtml = items => `<div class="math-sub-tabs sb-fx-bar" role="tablist" aria-label="Exercises">${items.map((it, i) => `<button type="button" class="math-sub-tab-btn" role="tab" data-sbx="${i}" title="${esc(it.title || it.label)}">${esc(it.label)}</button>`).join('')}</div>`;

  function mark(bar, i) {
    bar.querySelectorAll('.math-sub-tab-btn').forEach((b, k) => { b.classList.toggle('active', k === i); b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    const b = bar.querySelector('.math-sub-tab-btn.active');
    if (b && bar.scrollWidth > bar.clientWidth) bar.scrollLeft = Math.max(0, b.offsetLeft - (bar.clientWidth - b.offsetWidth) / 2);
  }

  // ---------- normal view: one open card at a time ----------
  function mountCards(container) {
    if (container.querySelector(':scope > .math-sub-tabs, :scope > .sb-extabs')) return true;
    const cards = [...container.children].filter(c => c.classList.contains('math-accordion-card') && c.querySelector(':scope > .math-accordion-body'));
    if (!cards.length) return false;
    const items = uniqueLabels(cards.map(c => {
      const badge = (c.querySelector('.math-badge') || {}).textContent, title = (c.querySelector('.math-acc-header h3') || {}).textContent;
      const page = pageIn(title);
      return {label: labelOf(badge, title, page), title: clean(badge) === 'Exercise' ? clean(title) : clean(badge) + ' · ' + clean(title), page};
    }));
    addCss();
    const wrap = document.createElement('div');
    wrap.className = 'sb-extabs';
    wrap.innerHTML = barHtml(items);
    cards[0].before(wrap);
    cards.forEach(c => { c.classList.add('sb-extab-card'); wrap.appendChild(c); });
    const saved = chosen.get(unitKey());
    show(wrap, Math.max(0, cards.findIndex(c => c.id === saved)), true);
    return true;
  }
  function show(wrap, i, quiet) {
    const cards = [...wrap.querySelectorAll(':scope > .sb-extab-card')];
    if (!cards[i]) return;
    cards.forEach((c, k) => {
      const on = k === i;
      c.classList.toggle('sb-on', on);
      c.classList.toggle('open', on);
      if (!on) return;
      const body = c.querySelector(':scope > .math-accordion-body');
      if (body && body.hasAttribute('data-sb-lazy') && window.SBLazyCards) { try { window.SBLazyCards.fill(body); } catch (e) { /* the card still shows */ } }
      if (body) body.style.display = 'block';
    });
    mark(wrap.querySelector('.math-sub-tabs'), i);
    chosen.set(unitKey(), cards[i].id);
    const sc = wrap.closest('#subjTabContent, #mathTabContent');
    if (sc && !quiet) sc.scrollTop = 0;
  }

  // ---------- full screen: the open book gets the same bar ----------
  function mountSpreads(container) {
    if (!container.querySelector('.bk-wrap')) return false;
    if (container.querySelector(':scope > .math-sub-tabs')) return true;
    const spreads = [...container.querySelectorAll('.bk-wrap')], items = [];
    spreads.forEach((w, k) => {
      const b = w.querySelector('.bk-head b');
      if (!b) return;
      const page = (/\d+/.exec(w.dataset.label || '') || [''])[0];
      b.textContent.split(' · ').map(clean).filter(Boolean).forEach(id => items.push({label: labelOf('', id, page), title: id, page, spread: k}));
    });
    if (!items.length) return false;
    addCss();
    uniqueLabels(items);
    container.insertAdjacentHTML('afterbegin', barHtml(items));
    const bar = container.firstElementChild;
    let active = 0;
    const cur = () => {
      const top = container.getBoundingClientRect().top + bar.offsetHeight + 40;
      let c = 0;
      spreads.forEach((w, k) => { if (w.getBoundingClientRect().top <= top) c = k; });
      return c;
    };
    const follow = () => {
      const c = cur();
      if (items[active] && items[active].spread === c) return;
      let a = 0;
      items.forEach((it, k) => { if (it.spread <= c) a = k; });
      if (a !== active) { active = a; mark(bar, a); }
    };
    bar.addEventListener('click', e => {
      const b = e.target.closest('.math-sub-tab-btn');
      if (!b) return;
      active = +b.dataset.sbx;
      mark(bar, active);
      const w = spreads[items[active].spread];
      container.scrollTo({top: container.scrollTop + w.getBoundingClientRect().top - container.getBoundingClientRect().top - bar.offsetHeight - 12, behavior: 'auto'});
    });
    let tick = 0;
    container.addEventListener('scroll', () => { if (!tick) tick = requestAnimationFrame(() => { tick = 0; follow(); }); }, {passive: true});
    mark(bar, 0);
    follow();
    return true;
  }

  // ---------- when ----------
  let timer = 0;
  function mount() {
    const c = box();
    if (!c || !onExercises()) return true;
    return fsOn() ? mountSpreads(c) : mountCards(c);
  }
  // the readers draw the tab at once; the open book (and anything that rewrites a tab a moment later) may need a few more tries
  function schedule() {
    clearTimeout(timer);
    let n = 0;
    const tick = () => { if (mount() || ++n > 30 || !onExercises()) return; timer = setTimeout(tick, 150); };
    if (!mount()) timer = setTimeout(tick, 150);
  }

  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('.sb-extabs > .math-sub-tabs .math-sub-tab-btn');
    if (!b) return;
    const wrap = b.closest('.sb-extabs');
    show(wrap, +b.dataset.sbx);
  });

  if (window.SBHooks) {
    if (typeof window.switchSubjectTab === 'function') {
      SBHooks.use('switchSubjectTab', function (original) { return function (subjKey, tabId) {
        const r = original.apply(this, arguments);
        try { if (subjKey === 'math' && tabId === 'exercise') schedule(); } catch (e) { console.error('exercise tabs', e); }
        return r;
      }; });
    }
    if (typeof window.switchMathTab === 'function') {
      SBHooks.use('switchMathTab', function (original) { return function (tab) {
        const r = original.apply(this, arguments);
        try { if (tab === 'exercises' || tab === 'exercise') schedule(); } catch (e) { console.error('exercise tabs', e); }
        return r;
      }; });
    }
  }
})();
