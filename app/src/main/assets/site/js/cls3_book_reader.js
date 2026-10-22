/* Class 3 textbook reader (KPTBB). Class 3 books are re-transcribed page by page from the scans
 * (docs/source-verification/class-3) and built by build_book3.py into js/<name>_3_data.js, which registers
 * window.CLS3_BOOKS[subjKey] = {units, book, words}. Subjects not yet rebuilt keep their legacy Class 3 readers. This file shows those books in the generic subject
 * workspace with the shared Class 6 renderer (window.MATH6_READER): original text, click-to-open
 * translations, word meanings, KaTeX maths, coded SVG figures and answer buttons.
 * Only active while Class 3 is selected; every other class keeps its own readers. */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;
  const books = () => window.CLS3_BOOKS || {};
  const isCls3 = classId => classId === 'cls3' || (!classId && typeof state !== 'undefined' && state.selectedClass === 'cls3');
  const book = (subjKey, classId) => (isCls3(classId) ? books()[subjKey] : null);

  // Chapter list for the sidebar comes from the reviewed dataset.
  if (typeof window.getSubjectChapterList === 'function') {
    SBHooks.use('getSubjectChapterList', function (originalList) { return function (subjKey, classId) {
      const B = book(subjKey, classId || (typeof state !== 'undefined' ? state.selectedClass : ''));
      return B && B.units && B.units.length ? B.units : originalList.apply(this, arguments);
    }; });
  }

  // Rebuilt Class 3 subjects open in the generic subject workspace.
  if (typeof window.openSubject === 'function') {
    SBHooks.use('openSubject', function (originalOpen) { return function (classId, subjId) {
      if (classId === 'cls3' && books()[String(subjId).replace('cls3-', '')] && typeof window.openSubjectWorkspace === 'function') {
        const subs = (typeof DATA !== 'undefined' && DATA.subjects && DATA.subjects.cls3) || [];
        const subj = subs.find(s => s.id === subjId) || {id: subjId, name: 'Subject'};
        state.activeView = 'subject-detail';
        state.selectedClass = classId;
        state.selectedSubjChapter = 0;
        state.activeSubjTab = 'lesson';
        state.activeSubject = subjId.replace('cls3-', '');
        window.openSubjectWorkspace(classId, state.activeSubject, subj);
        return;
      }
      return originalOpen.apply(this, arguments);
    }; });
  }

  const R = window.MATH6_READER;
  if (!R || typeof window.switchSubjectTab !== 'function') return;
  const {blocks, card, root, withBook, esc, sentence} = R;

  function walk(list, fn) { (list || []).forEach(b => { fn(b); if (b.blocks) walk(b.blocks, fn); if (b.items) walk(b.items, fn); }); }
  const note = text => `<div class="math-topic-card" style="padding:1.25rem;color:#475569;">${text}</div>`;
  function pending(B, ch) {
    return note(`${esc(B.book.name)} unit ${esc(ch.number)} is awaiting page-by-page source review. ${esc(B.book.reviewedPdfPages)} of ${esc(B.book.totalPdfPages)} source pages reviewed so far.`);
  }
  const badge = sec => /^\d+(\.\d+)*$/.test(sec.id) ? `Part ${sec.id}` : (sec.tabs && sec.tabs[0] ? sec.tabs[0][0].toUpperCase() + sec.tabs[0].slice(1) : 'Lesson');
  const title = sec => sec.title + (sec.titleUrdu ? ` · ${sec.titleUrdu}` : '');

  function lesson(B, ch, i) {
    let html = '';
    if (i === 0 && B.book.frontMatter.length) html += card('c3-front', 'Book', 'Cover, credits and contents', root(blocks(B.book.frontMatter)), false);
    if (!ch.sections.length) return html + pending(B, ch);
    html += R.pageCards(ch.sections, {id: sec => `c3-${i}-${sec.id}`, badge, title, root, blocks, card});
    if (B.book.backMatter.length && i === B.units.length - 1) html += card('c3-back', 'Book', 'Answers, glossary and end pages', root(blocks(B.book.backMatter)), false);
    return html;
  }
  function exercises(B, ch, i) {
    if (!ch.sections.length) return pending(B, ch);
    if (!ch.exercises.length) return note('This unit has no separate exercise in the textbook; its activities are in the Lesson tab.');
    return ch.exercises.map((ex, k) => card(`c3-ex-${i}-${k}`, 'Exercise', (ex.id || 'Exercise') + (ex.printed != null ? ` (p. ${ex.printed})` : ''), root(blocks([ex], {showAnswers: true, noPages: true})), k === 0)).join('');
  }
  function slos(B, ch) {
    if (!ch.sections.length) return pending(B, ch);
    if (!ch.slos.length) return note('The textbook does not list learning outcomes for this unit.');
    return root(`<div class="m6-h3">Student Learning Outcomes</div><p class="m6-help">As printed in the textbook.</p><ul class="m6-ul">${ch.slos.map(x => `<li class="lv${x.lv || 1}">${sentence(x, 'span')}</li>`).join('')}</ul>`);
  }
  function words(B, ch) {
    if (!ch.sections.length) return pending(B, ch);
    const text = [];
    ch.sections.forEach(s => walk(s.blocks, b => { if (b.en) text.push(b.en); if (b.rows) b.rows.forEach(r => text.push(r.join(' '))); }));
    const seen = new Set((text.join(' ').toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []));
    const list = Object.keys(B.words).filter(w => seen.has(w)).sort();
    if (!list.length) return note('No word meanings recorded for this unit yet.');
    return root(`<div class="m6-h3">Word meanings in this unit</div><div class="m6-table"><table><thead><tr><th>Word</th><th>اردو</th><th>پښتو</th></tr></thead><tbody>${list.map(w => `<tr><td>${esc(w)}</td><td lang="ur" dir="rtl">${esc(B.words[w][0])}</td><td lang="ps" dir="rtl">${esc(B.words[w][1])}</td></tr>`).join('')}</tbody></table></div>`);
  }
  function tagged(B, ch, i, tab) {
    if (!ch.sections.length) return pending(B, ch);
    const secs = ch.sections.filter(s => (s.tabs || []).includes(tab));
    if (!secs.length) return note(`The textbook has no separate “${esc(tab)}” part in this unit. All of the unit's pages are in the Lesson tab.`);
    return secs.map((sec, k) => card(`c3-${tab}-${i}-${sec.id}`, badge(sec), title(sec), root(blocks(sec.blocks, {showAnswers: true})), true)).join('');
  }
  function render(B, ch, i, tab) {
    if (tab === 'lesson') return lesson(B, ch, i);
    if (tab === 'exercise') return exercises(B, ch, i);
    if (tab === 'slos') return slos(B, ch);
    if (tab === 'concepts' && !ch.sections.some(s => (s.tabs || []).includes('concepts'))) {
      if (!ch.sections.length) return pending(B, ch);
      if (!ch.workedExamples.length) return tagged(B, ch, i, tab);
      return ch.workedExamples.map((ex, k) => card(`c3-act-${i}-${k}`, /^\d/.test(ex.no) ? 'Example' : 'Activity', (ex.title ? ex.title.en : ex.no) + (ex.printed != null ? ` (p. ${ex.printed})` : ''), root(blocks([ex], {noPages: true, showAnswers: true})), k === 0)).join('');
    }
    if (tab === 'formulas') return tagged(B, ch, i, 'summary');
    if (tab === 'glossary' || tab === 'vocabulary' || tab === 'words') {
      const t = tagged(B, ch, i, tab);
      return ch.sections.some(s => (s.tabs || []).includes(tab)) ? t + words(B, ch) : words(B, ch);
    }
    return tagged(B, ch, i, tab);
  }

  SBHooks.use('switchSubjectTab', function (originalSwitch) { return function (subjKey, tabId, chIdx, classId) {
    const B = book(subjKey, classId);
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
  }; });
})();
