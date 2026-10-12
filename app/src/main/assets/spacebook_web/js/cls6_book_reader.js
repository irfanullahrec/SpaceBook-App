/* Class 6 and Class 7 textbook reader for every source-reviewed book except Mathematics (which has math6_reader.js).
 * Each book file registers window.CLS6_BOOKS[subjKey] = {units, book, words}; this file renders it in the
 * generic subject workspace with the same paragraph-translation and word-meaning UI as Class 6 Mathematics.
 * Class 7 books register window.CLS7_BOOKS and Class 8 books window.CLS8_BOOKS the same way. Only active when Class 6 or 7 is selected and the book has a reviewed dataset. */
(function () {
  'use strict';
  const R = window.MATH6_READER;
  if (!R || typeof window.switchSubjectTab !== 'function') return;
  const {blocks, card, root, withBook, esc, sentence} = R;
  const books = () => window.CLS6_BOOKS || {};

  function walk(list, fn) { (list || []).forEach(b => { fn(b); if (b.blocks) walk(b.blocks, fn); if (b.items) walk(b.items, fn); }); }
  function pending(B, ch) {
    return `<div class="math-topic-card" style="padding:1.5rem;text-align:center;color:#475569;">${esc(B.book.name)} unit ${esc(ch.number)} is awaiting page-by-page source review. ${esc(B.book.reviewedPdfPages)} of ${esc(B.book.totalPdfPages)} source pages reviewed so far.</div>`;
  }
  const badge = sec => /^\d+(\.\d+)*$/.test(sec.id) ? `Part ${sec.id}` : (sec.tabs && sec.tabs[0] ? sec.tabs[0][0].toUpperCase() + sec.tabs[0].slice(1) : 'Lesson');
  const title = sec => sec.title + (sec.titleUrdu ? ` · ${sec.titleUrdu}` : '');

  function lesson(B, ch, i) {
    let html = '';
    if (i === 0 && B.book.frontMatter.length) html += card('c6-front', 'Book', 'Cover, credits and contents', root(blocks(B.book.frontMatter)), false);
    if (!ch.sections.length) return html + pending(B, ch);
    html += ch.sections.map((sec, k) => card(`c6-${ch.number}-${sec.id}`, badge(sec), title(sec), root(blocks(sec.blocks, {showAnswers: true})), k === 0)).join('');
    if (B.book.backMatter.length && i === B.units.length - 1) html += card('c6-back', 'Book', 'Glossary and end pages', root(blocks(B.book.backMatter)), false);
    return html;
  }
  function exercises(B, ch) {
    if (!ch.sections.length) return pending(B, ch);
    if (!ch.exercises.length) return `<div class="math-topic-card" style="padding:1.25rem;color:#475569;">This unit has no separate exercise in the textbook; its activities are in the Lesson tab.</div>`;
    return ch.exercises.map((ex, k) => card('c6-ex-' + ch.number + '-' + k, 'Exercise', (ex.id || 'Exercise') + ` (p. ${ex.printed})`, root(blocks([ex], {showAnswers: true, noPages: true})), k === 0)).join('');
  }
  function slos(B, ch) {
    if (!ch.sections.length) return pending(B, ch);
    if (!ch.slos.length) return `<div class="math-topic-card" style="padding:1.25rem;color:#475569;">The textbook does not list learning outcomes for this unit.</div>`;
    return root(`<div class="m6-h3">Student Learning Outcomes</div><p class="m6-help">As printed in the textbook.</p><ul class="m6-ul">${ch.slos.map(i => `<li class="lv${i.lv || 1}">${sentence(i, 'span')}</li>`).join('')}</ul>`);
  }
  function words(B, ch) {
    if (!ch.sections.length) return pending(B, ch);
    const text = [];
    ch.sections.forEach(s => walk(s.blocks, b => { if (b.en) text.push(b.en); if (b.rows) b.rows.forEach(r => text.push(r.join(' '))); }));
    const seen = new Set((text.join(' ').toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []));
    const list = Object.keys(B.words).filter(w => seen.has(w)).sort();
    if (!list.length) return `<div class="math-topic-card" style="padding:1.25rem;color:#475569;">No word meanings recorded for this unit yet.</div>`;
    return root(`<div class="m6-h3">Word meanings in this unit</div><div class="m6-table"><table><thead><tr><th>Word</th><th>اردو</th><th>پښتو</th></tr></thead><tbody>${list.map(w => `<tr><td>${esc(w)}</td><td lang="ur" dir="rtl">${esc(B.words[w][0])}</td><td lang="ps" dir="rtl">${esc(B.words[w][1])}</td></tr>`).join('')}</tbody></table></div>`);
  }
  function tagged(B, ch, tab) {
    if (!ch.sections.length) return pending(B, ch);
    const secs = ch.sections.filter(s => (s.tabs || []).includes(tab));
    if (!secs.length) return `<div class="math-topic-card" style="padding:1.25rem;color:#475569;">The textbook has no separate “${esc(tab)}” part in this unit. All of the unit's pages are in the Lesson tab.</div>`;
    return secs.map((sec, k) => card(`c6-${tab}-${ch.number}-${sec.id}`, badge(sec), title(sec), root(blocks(sec.blocks, {showAnswers: true})), k === 0)).join('');
  }
  function render(B, ch, i, tab) {
    if (tab === 'lesson') return lesson(B, ch, i);
    if (tab === 'exercise') return exercises(B, ch);
    if (tab === 'slos') return slos(B, ch);
    if (tab === 'concepts' && !ch.sections.some(s => (s.tabs || []).includes('concepts'))) {
      if (!ch.sections.length) return pending(B, ch);
      if (!ch.workedExamples.length) return tagged(B, ch, tab);
      return ch.workedExamples.map((ex, k) => card(`c6-act-${ch.number}-${k}`, 'Activity', (ex.title ? ex.title.en : ex.no) + ` (p. ${ex.printed})`, root(blocks([ex], {noPages: true, showAnswers: true})), k === 0)).join('');
    }
    if (tab === 'formulas') return tagged(B, ch, 'summary');
    if (tab === 'glossary' || tab === 'vocabulary' || tab === 'words') {
      const t = tagged(B, ch, tab);
      return ch.sections.some(s => (s.tabs || []).includes(tab)) ? t + words(B, ch) : words(B, ch);
    }
    return tagged(B, ch, tab);
  }

  const originalSwitch = window.switchSubjectTab;
  window.switchSubjectTab = function (subjKey, tabId, chIdx, classId) {
    const B = subjKey !== 'math' ? (classId === 'cls6' ? books() : classId === 'cls7' ? (window.CLS7_BOOKS || {}) : classId === 'cls8' ? (window.CLS8_BOOKS || {}) : {})[subjKey] : null;
    if (!B || !B.units || !B.units.length) return originalSwitch.apply(this, arguments);
    const ch = B.units[chIdx] || B.units[0];
    state.activeSubjTab = tabId;
    document.querySelectorAll('.math-top-tab, .math-tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
    const container = document.getElementById('subjTabContent');
    const subBar = document.getElementById('subjSubTabsBar');
    if (subBar) { subBar.style.display = 'none'; subBar.innerHTML = ''; }
    if (!container) return;
    container.innerHTML = withBook(B.words, B.book, () => render(B, ch, B.units.indexOf(ch), tabId));
    container.scrollTop = 0;
  };
})();
