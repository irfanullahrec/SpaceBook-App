/* Class 11 study views use the same tabs, topic cards, sub-tabs and click
 * behaviour as Class 9/10. The Class 11 page-by-page source records are
 * adapted (not copied or rewritten) into the shape the shared Class 9
 * renderers already draw: paragraphs go through the interactive sentence
 * reader, while figures, equations and tables keep each book's own renderer. */
(function () {
  // view key (shared renderer) -> Class 11 source
  const SOURCES = {
    civics:  {book: 'civics',   prefix: 'civics11'},
    hpe:     {book: 'hpe',      prefix: 'hpe11'},
    islopt:  {book: 'ikhtiari', prefix: 'ikhtiari11'},
    islhist: {book: 'ishist',   prefix: 'ishist11'},
    islc:    {book: 'isl',      prefix: 'isl11'},   // not 'isl': that key opens the Class 9 ayah/hadith reader
    quran:   {book: 'mq',       prefix: 'mq11'},
    urdu:    {book: 'urdu',     prefix: 'urdu11'},
    comp:    {book: 'cs',       prefix: 'cs11'},
    chem:    {global: 'CHEM_11_DATA', prefix: 'chem11'},
    bio:     {global: 'BIO_11_DATA',  prefix: 'bio11'},
    stat:    {global: 'STAT_11_DATA', prefix: 'stat11'},
    eng:     {global: 'ENG_11_DATA',  prefix: 'eng11'}
  };
  const BOOK_TO_VIEW = Object.fromEntries(Object.entries(SOURCES).filter(([, s]) => s.book).map(([view, s]) => [s.book, view]));
  const VIEW_CLASS = 'cls11v'; // internal alias: keeps the Class 11 book reader out of the shared renderer
  if (typeof SUBJECT_THEMES !== 'undefined' && !SUBJECT_THEMES.islc) SUBJECT_THEMES.islc = SUBJECT_THEMES.isl;

  const isClass11 = classId => classId === 'cls11' || classId === VIEW_CLASS;
  const rawData = view => {
    const src = SOURCES[view];
    if (!src) return null;
    if (src.book) { const book = (window.CLASS11_BOOKS || {})[src.book]; return book ? book.data : null; }
    try { return window[src.global] || eval(src.global); } catch (e) { return null; }
  };
  const fn = name => { try { return window[name] || eval(name); } catch (e) { return null; } };

  // inline maths tokens become plain notation that the chapter typesetter formats
  const inline = (text, p) => (p.inlineMath || []).reduce((out, m) => out.split(m.token).join(
    m.denominator ? `(${m.numerator})/(${m.denominator})` : `${m.base}_${m.subscript}`), String(text ?? ''));

  function toPara(p, urduSource) {
    const original = inline(p.original ?? p.text ?? '', p);
    if (urduSource) {
      const english = inline(p.english || p.urdu || '', p);
      return {text: original, urdu: original, pashto: inline(p.pashto || '', p), sourceLanguage: 'ur', english};
    }
    return {text: original, urdu: inline(p.urdu || '', p), pashto: inline(p.pashto || '', p)};
  }

  function equationHtml(prefix, eq) {
    let html = '';
    try { html = fn(prefix + 'RenderEquation')(eq); } catch (e) { return ''; } // a block this book cannot draw is left out rather than guessed
    // Class 9 equations carry no per-equation language switch
    return String(html || '').replace(/<details><summary>English \/ اردو \/ پښتو<\/summary>[\s\S]*?<\/details>/g, '');
  }

  // captions read like any other sentence: original text, translation on click
  const captionPara = (item, urduSource) => {
    const en = item.caption || '', ur = item.captionUrdu || '', ps = item.captionPashto || '';
    if (!(en || ur)) return null;
    return urduSource ? {text: ur || en, urdu: ur || en, pashto: ps, sourceLanguage: 'ur', english: en} : {text: en || ur, urdu: ur, pashto: ps};
  };

  // Class 11 tables keep all three languages in every cell; the shared table shows
  // the book's language and lists Urdu / Pashto as translations, as in Class 9.
  function sharedTable(table, id, urduSource, blocks) {
    const primary = urduSource ? 'ur' : 'en';
    const cell = (c, lang) => {
      if (c && typeof c === 'object' && c.svg) {
        const blockId = `${id}-cell-${blocks.length}`;
        blocks.push({id: blockId, svg: c.svg, svgUrdu: c.svg, svgPashto: c.svg});
        return {blockId};
      }
      return c && typeof c === 'object' ? String(c[lang] || c[primary] || c.en || '') : String(c ?? '');
    };
    const headers = lang => (table.headers || []).map(h => cell(h, lang));
    const rows = lang => (table.rows || []).map(row => row.map(c => cell(c, lang)));
    return {
      id, noHeader: !(table.headers || []).length, headers: headers(primary), rows: rows(primary),
      translations: [{language: 'اردو', headers: headers('ur'), rows: rows('ur')}, {language: 'پښتو', headers: headers('ps'), rows: rows('ps')}]
    };
  }

  function adaptSection(sec, prefix) {
    const urduSource = sec.sourceLanguage === 'ur';
    const paras = [], layout = [], blocks = [];
    const byId = new Map((sec.paras || []).map(p => [p.id, p]));
    const flow = sec.flow || [{type: 'paragraphs', ids: (sec.paras || []).map(p => p.id)},
      ...(sec.table ? [{type: 'table'}] : []), ...(sec.equations || []).map((e, index) => ({type: 'equation', index})),
      ...(sec.figures || []).map((f, index) => ({type: 'figure', index}))];
    const addVisual = html => {
      if (!html) return;
      const id = `${sec.id}-block-${blocks.length}`;
      blocks.push({id, svg: html, svgUrdu: html, svgPashto: html});
      layout.push({type: 'visual', blockId: id});
    };
    const addCaption = item => {
      const para = captionPara(item, urduSource);
      if (para) layout.push({type: 'heading', indices: [paras.push(para) - 1]});
    };
    for (const block of flow) {
      if (block.type === 'equation') { addVisual(equationHtml(prefix, sec.equations?.[block.index])); continue; }
      if (block.type === 'figure') {
        const figure = sec.figures?.[block.index];
        if (figure) { addVisual(figure.svg || ''); addCaption(figure); }
        continue;
      }
      if (block.type === 'table') {
        const table = block.index !== undefined ? sec.tables?.[block.index] : sec.table;
        if (table) {
          addCaption(table);
          const id = `${sec.id}-table-${blocks.length}`;
          blocks.push(sharedTable(table, id, urduSource, blocks));
          layout.push({type: 'sourceDataTable', tableId: id});
        }
        continue;
      }
      if (block.type !== 'paragraphs') continue;
      let list = null;
      for (const id of block.ids || []) {
        const p = byId.get(id);
        if (!p) continue;
        const index = paras.push(toPara(p, urduSource)) - 1;
        if (p.listGroup) {
          if (list && list.group === p.listGroup) list.block.indices.push(index);
          else { list = {group: p.listGroup, block: {type: p.listType === 'ordered' ? 'numberedList' : 'list', indices: [index]}}; layout.push(list.block); }
        } else {
          list = null;
          layout.push({type: p.kind === 'heading' ? 'heading' : 'paragraph', indices: [index]});
        }
        if (p.mathBlocks && p.mathBlocks.length) {
          list = null;
          p.mathBlocks.forEach(eq => addVisual(equationHtml(prefix, eq)));
        }
      }
    }
    const page = sec.source || {};
    return {
      // an Urdu-medium book names its topics in Urdu (the English title stays in heading)
      id: sec.id, title: urduSource && sec.headingUrdu ? sec.headingUrdu : sec.title, heading: sec.title, headingUrdu: sec.headingUrdu, headingPashto: sec.headingPashto,
      sourceLanguage: sec.sourceLanguage || 'en', sourceClass12Source: true, class11Source: true,
      sourceLayout: layout, sourceBlocks: blocks, paras,
      sourcePageLabel: page.printedPage ? `Page ${page.printedPage}` : `Scan ${page.pdfPage ?? ''}`.trim(),
      source: page, auditStatus: sec.auditStatus, sourceNote: sec.sourceNote
    };
  }

  // Questions printed in the book (role question / option / solution) become
  // Class 9 question cards. Answers that the source does not give stay pending.
  // the card already shows "MCQ 1" and "A." — drop the numbers and letters printed in the text
  const QNUM = /^\s*(?:Q\.?\s*)?(?:[0-9۰-۹٠-٩]+|[ivx]{1,4})\s*[.)۔:-]\s*/i;
  const OPT = /^\s*(?:\(\s*[a-dA-D]\s*\)|[a-dA-D]\s*[.)]|\(\s*(?:الف|ب|ج|د)\s*\)|(?:الف|ب|ج|د)\s*[۔.)-])\s*/;
  const bare = (value, pattern) => String(value ?? '').replace(pattern, '');

  function questionBank(chapter, urduSource) {
    const bank = {mcqs: [], objective: [], shortQuestions: [], longQuestions: [], numericals: [], activities: []};
    let current = null;
    const close = () => {
      if (!current) return;
      const target = current.options.length >= 2 ? bank.mcqs : bank.shortQuestions;
      const q = field => bare(current.q[field], QNUM), o = field => current.options.map(x => bare(x[field], OPT));
      const item = {
        q: sanitize(q('text')), qNo: target.length + 1, lang: urduSource ? 'ur' : 'en',
        origin: 'Textbook question', answerOrigin: current.steps.length ? 'Printed in the textbook' : '',
        options: o('text').map(sanitize), steps: current.steps
      };
      if (urduSource) { item.qEnglish = q('english'); item.qPashto = q('pashto'); item.optionsEnglish = o('english'); item.optionsPashto = o('pashto'); }
      else { item.qUrdu = q('urdu'); item.qPashto = q('pashto'); item.optionsUrdu = o('urdu'); item.optionsPashto = o('pashto'); }
      if (!item.options.length) delete item.options;
      target.push(item);
      current = null;
    };
    for (const sec of [...(chapter.sections || [])].sort((a, b) => (a.source?.pdfPage || 0) - (b.source?.pdfPage || 0)))
      for (const p of sec.paras || []) {
        const para = toPara(p, urduSource);
        if (p.role === 'question') { close(); current = {q: para, options: [], steps: []}; }
        else if (p.role === 'option' && current) current.options.push(para);
        else if (/solution|sourceAnswer|source-answer|answer/.test(p.role || '') && current) current.steps.push(para.text);
      }
    close();
    return bank;
  }

  const cache = {};
  function adapted(view) {
    if (cache[view]) return cache[view];
    const data = rawData(view), src = SOURCES[view];
    if (!Array.isArray(data)) return null;
    cache[view] = data.map(ch => {
      const urduSource = (ch.sections || []).some(sec => sec.sourceLanguage === 'ur');
      const sections = [...(ch.sections || [])].sort((a, b) => (a.source?.pdfPage || 0) - (b.source?.pdfPage || 0)).map(sec => adaptSection(sec, src.prefix));
      return {...ch, sections, class11Adapted: true, class12Exercise: questionBank(ch, urduSource)};
    });
    return cache[view];
  }
  window.getClass11AdaptedChapters = adapted;

  // Class 12 Urdu-medium books store {text: English, urdu: original}; like Class 9
  // Pak Studies (and Class 11 above) the lesson shows the Urdu original and a click
  // on a sentence gives its English and Pashto translation.
  const urduOriginal12 = new WeakMap();
  // only paragraphs whose `text` really is the English translation (Arabic verses etc. stay as they are)
  const latin = value => { const s = String(value || ''); return (s.match(/[A-Za-z]/g) || []).length > (s.match(/[؀-ۿ]/g) || []).length; };
  const remap = p => p && typeof p === 'object' && p.urdu && !p.sourceLanguage && latin(p.text) && !latin(p.urdu);
  function urduMedium12(list) {
    if (!Array.isArray(list)) return list;
    if (urduOriginal12.has(list)) return urduOriginal12.get(list);
    let changed = false;
    const out = list.map(ch => {
      if (!ch || !Array.isArray(ch.sections)) return ch;
      let touched = false;
      const sections = ch.sections.map(sec => {
        if (!(sec && sec.sourceLanguage === 'ur' && sec.sourceLayout && Array.isArray(sec.paras) && sec.paras.some(remap))) return sec;
        touched = true;
        return {...sec, paras: sec.paras.map(p => remap(p) ? {...p, text: p.urdu, english: p.text, sourceLanguage: 'ur'} : p)};
      });
      if (!touched) return ch;
      changed = true;
      return {...ch, sections};
    });
    const result = changed ? out : list;
    urduOriginal12.set(list, result);
    return result;
  }

  // ── routing into the shared Class 9 renderer ───────────────────────────
  SBHooks.use('getSubjectChapterList', function (originalList) { return function (key, classId) {
    const cur = classId || state.selectedClass; // the class asked for wins over the selected one (ARCH-02)
    if (isClass11(cur) && SOURCES[key]) {
      const list = adapted(key);
      if (list) return list;
    }
    // the internal view id must read the same Class 11 chapter list as the sidebar (Physics: front matter first)
    const list = classId === VIEW_CLASS ? originalList.call(this, key, 'cls11') : originalList.apply(this, arguments);
    // the Urdu language book already reads its Urdu field; its Translations view needs English as English
    return cur === 'cls12' && key !== 'math' && key !== 'urdu' ? urduMedium12(list) : list;
  }; });

  SBHooks.use('openSubjectWorkspace', function (originalWorkspace) { return function (classId, key, subject) {
    const view = classId === 'cls11' && BOOK_TO_VIEW[key] ? BOOK_TO_VIEW[key] : key;
    const book = classId === 'cls11' ? class11BookByKey(key) : null;
    const result = originalWorkspace.call(this, classId, view, subject);
    if (classId === 'cls11' && book && book.pdf) {
      const link = document.querySelector('.math-sidebar-footer .math-pdf-btn');
      if (link && sbPdf(book.pdf)) link.href = book.pdf;       // only a packaged, licensed PDF gets a link (see sbPdf in app.js)
    }
    if (classId === 'cls11' && SOURCES[view]) {
      const count = document.querySelector('.math-unified-view .math-sidebar-sub');
      if (count) count.textContent = getSubjectChapterList(view, classId).length + ' textbook units';
    }
    return result;
  }; });

  SBHooks.use('renderSubjectChapterView', function (originalChapterView) { return function (key, index, classId, subject) {
    if (classId === 'cls11' && (SOURCES[key] || key === 'phys')) return originalChapterView.call(this, key, index, VIEW_CLASS, subject);
    return originalChapterView.apply(this, arguments);
  }; });

  // ── Class 11 Physics keeps its own source renderer inside the Class 9 lesson sub-tabs ──
  SBHooks.use('switchSubjectTab', function (originalSwitch) { return function (key, tabId, index, classId) {
    if (!(classId === VIEW_CLASS && key === 'phys')) return originalSwitch.apply(this, arguments);
    state.activeSubjTab = tabId;
    document.querySelectorAll('.math-top-tab, .math-tab-btn').forEach(button => button.classList.toggle('active', button.dataset.tab === tabId));
    const chapters = typeof PHYS_11_DATA !== 'undefined' ? PHYS_11_DATA : [];
    const ch = chapters[index] || chapters[0], container = document.getElementById('subjTabContent'), bar = document.getElementById('subjSubTabsBar');
    if (!ch || !container) return;
    if (tabId !== 'lesson') {
      if (bar) { bar.style.display = 'none'; bar.innerHTML = ''; }
      container.innerHTML = renderPhysics11Tab(ch, tabId);
      if (container.textContent.trim().length < 20) container.innerHTML = '<p class="class12-study-note">This unit has no separate material for this tab. Its lesson and textbook exercises remain available in the adjoining tabs.</p>';
    } else {
      const sub = state.activeScienceLessonSubTab || 'translations';
      if (bar) {
        bar.style.display = 'flex';
        bar.innerHTML = [['translations', '🌐 Translations (Eng, Ur, Ps)'], ['videos', '🎥 Videos'], ['exercise', '✍️ Exercise (Solved)'], ['slos', '🎯 SLOs']]
          .map(([id, label]) => `<button class="topic-sub-tab-btn ${sub === id ? 'active' : ''}" onclick="switchScienceLessonSubTab('phys', '${id}')">${label}</button>`).join('');
      }
      container.innerHTML = physics11LessonSub(ch, sub);
    }
    container.scrollTop = 0;
    if (typeof typesetChapterMath === 'function') typesetChapterMath(container);
  }; });
  function physics11LessonSub(ch, sub) {
    if (sub === 'exercise') return renderPhysics11Tab(ch, 'exercise');
    if (sub === 'slos') return renderPhysics11Tab(ch, 'slos');
    if (sub === 'videos') return typeof renderScienceLessonSubContent === 'function' ? renderScienceLessonSubContent('phys', ch, 'videos') : '';
    return `<div class="science-lesson-cards-list">${(ch.sections || []).map((sec, i) => `
      <div class="para-card math-topic-card" style="margin-bottom:1.5rem;padding:1.25rem;border:1px solid #e2e8f0;border-radius:10px;background:#fff;">
        <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.85rem;border-bottom:1px solid #f1f5f9;padding-bottom:.65rem;">
          <span class="math-badge" style="background:#e0f2fe;color:#0369a1;">Topic ${i + 1}</span>
          <h4 style="color:#0f172a;font-size:1.05rem;font-weight:700;margin:0;">${sanitize(sec.title || '')}${sec.headingUrdu ? ` <span style="font-family:'Jameel Noori Nastaleeq',serif;color:#15803d;font-size:1.15rem;font-weight:600;">(${sanitize(sec.headingUrdu)})</span>` : ''}</h4>
        </div>
        <div class="para-text-box">${renderPhysics11Source({sections: [sec]})}</div>
      </div>`).join('')}</div>`;
  }
  SBHooks.use('switchScienceLessonSubTab', function (originalScienceSub) { return function (key, sub) {
    if (!(key === 'phys' && state.selectedClass === 'cls11')) return originalScienceSub.apply(this, arguments);
    state.activeScienceLessonSubTab = sub;
    switchSubjectTab('phys', 'lesson', state.selectedSubjChapter || 0, VIEW_CLASS);
  }; });
})();
