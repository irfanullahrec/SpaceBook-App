/* sb_page_tabs.js — every textbook page that comes before the chapter's exercise carries two tabs fixed at its top:
 *   🎯 Board SLOs   : the learning outcomes (SLOs) of that page and the Board-style MCQs, short and long questions for it;
 *   ✍️ Exercise     : the chapter's own exercise questions that belong to that page.
 * Both tabs have the sub-tabs MCQs · SQs · LQs. The bar is `position: sticky`, so it stays at the top of the page while the
 * page is scrolled; the question panel opens under it and scrolls on its own. Pages from the first exercise page on get no bar.
 * Works on the page cards of the Lessons tab (Classes 1-12) and on the pages of the open-book full-screen view.
 *
 * Nothing is invented. A question is placed on a page only when its key words are found on that page's text (words shared with
 * only a few other pages count most). Board SLO lists come from the chapter data and, for Classes 9-12, from the Board's own
 * tables (js/bise_swat_data.js, loaded on demand); an SLO is shown as an SLO-based practice prompt - short or long by its
 * Bloom level / command verb - and is labelled as such, never as a past-paper question. MCQs only check answers when the
 * book data has an answer key. Labels follow the subject's medium. Works offline. */
(function () {
  'use strict';
  const TP = () => window.SBTopicPractice;
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const BISE_SRC = 'js/bise_swat_data.js?v=20261020_b1';   // same URL sb_bise.js loads, so the browser reuses its copy

  const LBL = {
    en: {slo: '🎯 Board SLOs', ex: '✍️ Exercise', game: '🎮 Games', mcq: 'MCQs', sq: 'SQs', lq: 'LQs',
      full: {mcq: 'Multiple Choice Questions', sq: 'Short Questions', lq: 'Long Questions'},
      covers: 'SLOs covered on this page', frompage: 'From this page', none: {mcq: 'No Board-style MCQ for this page in the book’s data.', sq: 'No short question for this page in the book’s data.', lq: 'No long question for this page in the book’s data.'},
      noex: 'The chapter’s exercise has no question for this page.', slochip: 'SLO-based practice', lvl: 'Level', board: 'Board paper', sec: {mcq: 'Section A', sq: 'Section B', lq: 'Section C'}, marks: 'marks', each: 'each', attempt: 'attempt', of: 'of', mcqs: 'MCQs', short: 'short questions', long: 'long questions', chap: 'This chapter', hint: 'Answer it from this page.', close: 'Close'},
    ur: {slo: '🎯 بورڈ SLOs', ex: '✍️ مشق', game: '🎮 کھیل', mcq: 'MCQs', sq: 'SQs', lq: 'LQs',
      full: {mcq: 'کثیر الانتخابی سوالات', sq: 'مختصر سوالات', lq: 'تفصیلی سوالات'},
      covers: 'اس صفحے کے SLOs', frompage: 'اسی صفحے سے', none: {mcq: 'اس صفحے کے لیے کتاب میں کوئی MCQ نہیں ملا۔', sq: 'اس صفحے کے لیے کتاب میں کوئی مختصر سوال نہیں ملا۔', lq: 'اس صفحے کے لیے کتاب میں کوئی تفصیلی سوال نہیں ملا۔'},
      noex: 'باب کی مشق میں اس صفحے کا کوئی سوال نہیں۔', slochip: 'SLO پر مبنی مشق', lvl: 'سطح', board: 'بورڈ پیپر', sec: {mcq: 'حصہ الف', sq: 'حصہ ب', lq: 'حصہ ج'}, marks: 'نمبر', each: 'ہر ایک', attempt: 'حل کریں', of: 'میں سے', mcqs: 'MCQs', short: 'مختصر سوالات', long: 'تفصیلی سوالات', chap: 'یہ باب', hint: 'اسے اسی صفحے سے حل کریں۔', close: 'بند کریں'},
    ps: {slo: '🎯 د بورډ SLOs', ex: '✍️ تمرین', game: '🎮 لوبې', mcq: 'MCQs', sq: 'SQs', lq: 'LQs',
      full: {mcq: 'څو ځوابه پوښتنې', sq: 'لنډې پوښتنې', lq: 'اوږدې پوښتنې'},
      covers: 'د دې پاڼې SLOs', frompage: 'له دې پاڼې څخه', none: {mcq: 'د دې پاڼې لپاره په کتاب کې MCQ نشته.', sq: 'د دې پاڼې لپاره په کتاب کې لنډه پوښتنه نشته.', lq: 'د دې پاڼې لپاره په کتاب کې اوږده پوښتنه نشته.'},
      noex: 'د فصل په تمرین کې د دې پاڼې پوښتنه نشته.', slochip: 'د SLO پر بنسټ تمرین', lvl: 'کچه', board: 'د بورډ پرچه', sec: {mcq: 'الف برخه', sq: 'ب برخه', lq: 'ج برخه'}, marks: 'نمرې', each: 'هر یو', attempt: 'حل کړئ', of: 'له', mcqs: 'MCQs', short: 'لنډې پوښتنې', long: 'اوږدې پوښتنې', chap: 'دا فصل', hint: 'له دې پاڼې یې حل کړئ.', close: 'بندول'},
    ar: {slo: '🎯 أهداف المجلس', ex: '✍️ التمارين', game: '🎮 ألعاب', mcq: 'MCQs', sq: 'SQs', lq: 'LQs',
      full: {mcq: 'اختيار من متعدد', sq: 'أسئلة قصيرة', lq: 'أسئلة طويلة'},
      covers: 'نواتج التعلم في هذه الصفحة', frompage: 'من هذه الصفحة', none: {mcq: 'لا يوجد سؤال اختيار من متعدد لهذه الصفحة.', sq: 'لا يوجد سؤال قصير لهذه الصفحة.', lq: 'لا يوجد سؤال طويل لهذه الصفحة.'},
      noex: 'لا يوجد سؤال من تمارين الفصل لهذه الصفحة.', slochip: 'تدريب مبني على الهدف', lvl: 'المستوى', board: 'ورقة المجلس', sec: {mcq: 'القسم أ', sq: 'القسم ب', lq: 'القسم ج'}, marks: 'درجات', each: 'لكل سؤال', attempt: 'أجب عن', of: 'من', mcqs: 'MCQs', short: 'أسئلة قصيرة', long: 'أسئلة طويلة', chap: 'هذا الفصل', hint: 'أجب من هذه الصفحة.', close: 'إغلاق'}
  };
  const KINDS = ['mcq', 'sq', 'lq'];

  // ---------- which page units are on screen ----------
  const LESSON_TABS = /^(lesson|lessons)$/;
  const box = () => document.getElementById('subjTabContent') || document.getElementById('mathTabContent');
  function lessonTabOn(container) {
    const b = document.querySelector('.math-top-tab.active, .math-tab-btn.active');
    const id = b && (b.dataset.tab || ((/'(lesson|lessons|exercise|exercises)'/.exec(b.getAttribute('onclick') || '') || [])[1]));
    if (!id || !LESSON_TABS.test(id)) return false;
    // English / Urdu / Pashto: the Lessons tab has sub-tabs; only the paragraphs (the book's text) are pages
    try { const s = state; if (container.id === 'subjTabContent' && /^(eng|urdu|pashto)$/.test(s.activeSubject) && s.activeSubjLessonSubTab && !/^(paragraphs|pages)$/.test(s.activeSubjLessonSubTab)) return false; } catch (e) { /* no state */ }
    return true;
  }
  function unitsIn(container) {
    let list = [...container.querySelectorAll('.sb-pgcard, .bk-page:not(.bk-blank)')]
      .filter(u => (u.matches('.sb-pgcard') || !u.querySelector('.sb-pgcard')) && !u.closest('.bk-modal, .sb-tp, .sb-pt'));
    if (!list.length) {
      // books whose data is cut into topics, not pages: every topic card is one unit
      list = [...container.querySelectorAll('.math-topic-card, .para-card')]
        .filter(c => !c.querySelector('.math-topic-card, .para-card') && !c.closest('.topic-ex-item, .slo-accordion-card, .slo-question-accordion, .sb-tp, .sb-pt, .sb-pgcard, .bk-modal, [id^="m11-bank"]') && (c.textContent || '').trim().length > 40);
    }
    return list;
  }
  const EXHEAD = /^\s*(?:(?:review|unit)\s+)?(?:exercise|exercises|assessment|مشق|مشقیں|تمرین|مشغولتیا|مشغولتیاوې|تمارين)\b/i;
  function headOf(u) {
    const h = u.querySelector(':scope > .math-acc-header h3, :scope > .para-card-header, :scope .m6-h3, :scope .m6-h4, :scope h3, :scope h4');
    return h ? (h.textContent || '').replace(/\s+/g, ' ').trim() : '';
  }
  function startsExercise(u) {
    if (u.querySelector('.m6-exercise, .c1-exercise, .topic-ex-item')) return true;
    return EXHEAD.test(headOf(u).replace(/^(?:Page|Scan|صفحہ|پاڼه)\s*\d+\s*/i, ''));
  }

  const textCache = new WeakMap();
  function unitText(u) {
    if (textCache.has(u)) return textCache.get(u);
    const c = u.cloneNode(true);
    c.querySelectorAll('.sb-pt, .sb-tp, button, script, style, svg, .m6-tools, .m6-help, .katex-mathml, .sb-tri-drawer, [id^="sent-trans-"], .bk-foot').forEach(x => x.remove());
    const t = (c.textContent || '').replace(/\s+/g, ' ').trim();
    if (t.length > 30) textCache.set(u, t);
    return t;
  }

  // ---------- the chapter, its questions, its SLOs ----------
  const IDX = {bio: 'selectedBioChapter', chem: 'selectedChemChapter', phys: 'selectedPhysChapter', eng: 'selectedEngChapter', urdu: 'selectedUrduChapter', isl: 'selectedIslChapter', pakstudy: 'selectedPakStudyChapter', math: 'selectedMathChapter'};
  function chapterNow() {
    let ch = null, idx = -1, subj = null, cls = null;
    try {
      const s = state; subj = s.activeSubject; cls = s.selectedClass;
      const isMath = container_is_math();
      const list = isMath && typeof window.getMathChapterList === 'function' ? window.getMathChapterList() : (typeof window.getSubjectChapterList === 'function' ? window.getSubjectChapterList(subj, cls) : []);
      // the chapter button the student sees highlighted is the authority; the state fields are the fallback
      const btns = [...document.querySelectorAll('.math-ch-list .math-ch-btn, .math-ch-sidebar .math-ch-btn')];
      const shown = btns.findIndex(b => b.classList.contains('active'));
      const cand = [shown >= 0 && btns.length === (list || []).length ? shown : null, isMath ? s.selectedMathChapter : s.selectedSubjChapter, s[IDX[subj]], 0].filter(Number.isInteger);
      if (list && list.length) { idx = cand.find(i => list[i]); ch = idx != null ? list[idx] : null; if (idx == null) idx = -1; }
    } catch (e) { /* state not ready */ }
    return {ch, idx, subj, cls};
  }
  const container_is_math = () => !!document.getElementById('mathTabContent') && !document.getElementById('subjTabContent');

  // Board data (Classes 9-12): SLO list with Bloom level, weightage and the paper pattern, found by subject and chapter number
  let biseLoading = false;
  function bise() {
    if (window.SB_BISE) return window.SB_BISE;
    if (!biseLoading) {
      biseLoading = true;
      const s = document.createElement('script'); s.src = BISE_SRC; s.async = true;
      s.onload = () => { setTimeout(() => refresh(true), 50); };
      s.onerror = () => { /* offline without the file: the chapter's own SLOs are used */ };
      document.head.appendChild(s);
    }
    return null;
  }
  const BKEY = {phys: ['phy'], comp: ['comp', 'cs'], islc: ['isl'], pakstudy: ['pakstudy', 'pak'], islopt: ['islopt'], quran: ['quran', 'mq']};
  function boardOf(subj, cls, ch, idx) {
    const m = /^cls(\d+)$/.exec(cls || ''); if (!m || +m[1] < 9) return null;
    const D = bise(); if (!D) return null;
    const keys = (BKEY[subj] || [subj]).map(k => 'cls' + m[1] + '-' + k);
    const s = keys.map(k => D.subjects[k]).find(Boolean);
    if (!s || !s.chapters) return null;
    const no = ch && (ch.number != null ? ch.number : ch.num);
    const want = [no, idx + 1].filter(v => v != null && v !== '').map(String);
    const c = s.chapters.find(x => x.app != null && want.includes(String(x.app))) || null;
    return c ? {s, c} : null;
  }

  const LONGV = /^(?:explain|describe|discuss|derive|prove|compare|illustrate|elaborate|justify|analy[sz]e|evaluate|design|construct|solve|calculate|determine|predict|summari[sz]e|write\s+(?:an?\s+)?(?:essay|note|paragraph|summary|story|letter|application)|with\s+the\s+help\s+of)\b/i;
  const looksLong = q => { const t = TP().norm(q); return t.split(' ').length >= 30 || (TP().lang(t) === 'en' && LONGV.test(t) && t.split(' ').length >= 9); };
  // options printed inline as "(i. … ii. … iii. … iv. …)" under a fill-in or short question: the book's own multiple choice
  const ROMAN = /^(.*?)[\s(]i[.)]\s+(.+?)\s+ii[.)]\s+(.+?)\s+iii[.)]\s+(.+?)\s+iv[.)]\s+(.+?)\s*\)?\s*[.?]?\s*$/s;
  function asMcq(it) {
    if (it.kind !== 'q' && it.kind !== 'bl') return it;
    const m = ROMAN.exec(it.q);
    if (!m) return it;
    const opts = [m[2], m[3], m[4], m[5]].map(x => TP().norm(x).replace(/[;,.]$/, ''));
    return Object.assign({}, it, {kind: 'mcq', q: TP().norm(m[1]) || it.q, opts, a: -1});
  }
  const bucket = it => it.kind === 'mcq' ? 'mcq' : it.kind === 'lq' ? 'lq' : it.kind === 'q' ? (looksLong(it.q) ? 'lq' : 'sq') : 'sq';
  const sloBucket = s => /^(?:Applying|Analy[sz]ing|Evaluating|Creating|A|E|C)$/i.test(s.l || '') ? 'lq' : /^(?:Remembering|Understanding|R|U)$/i.test(s.l || '') ? 'sq' : (looksLong(s.t) ? 'lq' : 'sq');

  // ---------- placing questions on pages ----------
  function plan(units, ch, board, med) {
    const T = TP();
    const stems = txt => new Set(T.content(txt, 3).map(T.stem));
    const pages = units.map(u => stems(unitText(u)));
    const N = pages.length, df = new Map();
    pages.forEach(p => p.forEach(w => df.set(w, (df.get(w) || 0) + 1)));
    const idf = w => Math.log(1 + N / df.get(w));
    const place = (txt) => {
      const q = stems(txt);
      if (!q.size) return [];
      const sc = pages.map(p => { let s = 0, n = 0, one = false; q.forEach(w => { if (p.has(w)) { s += idf(w); n++; if (df.get(w) === 1) one = true; } }); return {s, n, ok: n >= 2 || (n === 1 && one && q.size <= 6)}; });
      let best = -1; sc.forEach((x, i) => { if (x.ok && (best < 0 || x.s > sc[best].s + 1e-9)) best = i; });
      if (best < 0) return [];
      const out = [best];
      sc.forEach((x, i) => { if (i !== best && x.ok && x.s >= 0.92 * sc[best].s && out.length < 2) out.push(i); });
      return out;
    };
    const mk = () => ({slo: {mcq: [], sq: [], lq: []}, ex: {mcq: [], sq: [], lq: []}, slos: []});
    const sets = units.map(mk);
    const items = ch ? T.collect(ch, med).map(asMcq) : [];
    items.forEach(it => place(it.q + ' ' + (it.opts || []).join(' ')).forEach(i => sets[i][it.ex ? 'ex' : 'slo'][bucket(it)].push(it)));
    // SLO statements: the Board's table (with Bloom level) when it has the chapter, else the chapter's own list
    const outs = [];
    const seen = new Set();
    const add = (t, l) => { const k = T.norm(t).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ''); if (!k || seen.has(k)) return; seen.add(k); outs.push({t: T.norm(t), l}); };
    if (board && board.c.slos && board.c.slos.length) board.c.slos.forEach(s => add(s.t, s.l));
    else if (ch) T.slosOf(ch, med).forEach(t => add(t, ''));
    sloKeys = new Set(outs.map(o => keyOf(o.t)));
    outs.forEach(s => place(s.t).forEach(i => { sets[i].slos.push(s); sets[i].slo[sloBucket(s)].push({kind: 'slo', q: s.t, l: s.l, k: sloBucket(s)}); }));
    return sets;
  }

  // ---------- the bar ----------
  function policy(board, kind, T) {
    if (!board || !board.s.pattern) return '';
    const p = board.s.pattern, c = board.c, sec = p[kind === 'mcq' ? 'A' : kind === 'sq' ? 'B' : 'C'];
    if (!sec || !sec.n) return '';
    const bits = [`${esc(T.board)} · ${esc(T.sec[kind])}: ${sec.n} ${esc(T[kind === 'mcq' ? 'mcqs' : kind === 'sq' ? 'short' : 'long'])}`];
    if (kind === 'mcq') bits.push(`${sec.marks} ${esc(T.marks)}`);
    else if (sec.each) bits.push(`${esc(T.attempt)} ${sec.attempt || sec.n} · ${sec.each} ${esc(T.marks)} ${esc(T.each)}`);
    const n = kind === 'mcq' ? c.m : kind === 'sq' ? c.r : c.e;
    if (n != null) bits.push(`${esc(T.chap)}: ${n}${c.w != null ? ` (${c.w}%)` : ''}`);
    return `<div class="sb-pt-pol">${bits.join(' · ')}</div>`;
  }
  // Best answer from the page itself: the page's own sentences that share the most key words with the question
  // (one or two for a short question, up to five in page order for a long one). Taken word for word, never rewritten.
  let sloKeys = new Set();
  const keyOf = t => String(t).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
  const sentCache = new WeakMap();
  function sentencesOf(unit) {
    if (sentCache.has(unit)) return sentCache.get(unit);
    // block elements become line breaks, so a heading never runs into the next paragraph or the translation lines
    const c = unit.cloneNode(true);
    c.querySelectorAll('.sb-pt, .sb-tp, button, script, style, svg, .m6-tools, .m6-help, .katex-mathml, .sb-tri-drawer, [id^="sent-trans-"], .bk-foot, .m6-tr, .m6-hsub, .math-badge').forEach(x => x.remove());
    c.querySelectorAll('p, div, li, h1, h2, h3, h4, h5, h6, tr, section, article, figcaption, br, dt, dd').forEach(x => x.after(document.createTextNode('\n')));
    const out = (c.textContent || '').split(/\n+|(?<=[.!?؟۔])\s+/).map(x => x.replace(/\s+/g, ' ').trim()).filter(x => {
      const w = x.split(/\s+/).length;
      return (w >= 7 || (w >= 5 && /[.!?؟۔]$/.test(x))) && x.length <= 420 && !/^(?:Page|Scan|Textbook page|PDF page)\b/i.test(x) && (x.match(/\p{L}/gu) || []).length > x.length * 0.45;
    });
    const t = TP(), st = out.map(x => new Set(t.content(x, 3).map(t.stem))), df = new Map();
    st.forEach(z => z.forEach(w => df.set(w, (df.get(w) || 0) + 1)));
    const r = {list: out, st, df};
    sentCache.set(unit, r);
    return r;
  }
  function pageAnswer(unit, q, kind) {
    const t = TP(), S = sentencesOf(unit);
    if (!S.list.length) return '';
    const lg = t.lang(q), qs = new Set(t.content(q, 3).map(t.stem));
    if (!qs.size) return '';
    const N = S.list.length;
    const sc = S.list.map((x, i) => {
      // never answer with the outcome list itself, or with a sentence that only repeats the question
      if (t.lang(x) !== lg || sloKeys.has(keyOf(x)) || keyOf(q).includes(keyOf(x).slice(0, 60)) || keyOf(x).includes(keyOf(q).slice(0, 60))) return {i, s: 0, n: 0};
      let s = 0, n = 0; qs.forEach(w => { if (S.st[i].has(w)) { s += Math.log(1 + N / S.df.get(w)); n++; } });
      return {i, s: s / Math.sqrt(S.list[i].split(/\s+/).length + 8), n};
    }).filter(x => x.n >= 2).sort((a, b) => b.s - a.s);
    if (!sc.length) return '';
    const seenS = new Set();
    const take = sc.filter(x => { const k = keyOf(S.list[x.i]); if (seenS.has(k)) return false; seenS.add(k); return true; }).slice(0, kind === 'lq' ? 5 : 2).filter((x, k) => k === 0 || x.s >= 0.4 * sc[0].s).sort((a, b) => a.i - b.i);
    return take.map(x => S.list[x.i]).join(' ');
  }
  function itemHtml(it, T, TT, unit) {
    if (it.kind === 'slo') { const a = pageAnswer(unit, it.q, it.k); return `<div class="sb-tp-q sb-pt-slo"><div class="sb-tp-qt" dir="auto">${esc(it.q)}</div>${a ? `<button type="button" class="sb-tp-show">${esc(T.show)}</button><div class="sb-tp-ans" dir="auto" hidden><b>${esc(TT.frompage)}:</b> ${esc(a)}</div>` : ''}<div class="sb-pt-meta"><span class="sb-pt-chip">${esc(TT.slochip)}</span>${it.l ? `<span class="sb-pt-chip alt">${esc(TT.lvl)}: ${esc(it.l)}</span>` : ''}<span class="sb-pt-hint">${esc(TT.hint)}</span></div></div>`; }
    if (!it.ans && it.kind !== 'mcq' && it.kind !== 'tf') { const a = pageAnswer(unit, it.q, bucket(it)); if (a) it = Object.assign({}, it, {ans: TT.frompage + ': ' + a}); }
    return TP().itemHtml(it, T);
  }
  function panelHtml(st, which, kind, TT, T, board, med, unit) {
    const set = st[which], list = set[kind];
    let html = '';
    if (which === 'slo' && st.slos.length) html += `<details class="sb-pt-cov"><summary>${esc(TT.covers)} (${st.slos.length})</summary><ul>${st.slos.map(s => `<li dir="auto">${esc(s.t)}${s.l ? ` <em>${esc(s.l)}</em>` : ''}</li>`).join('')}</ul></details>`;
    if (which === 'slo') html += policy(board, kind, TT);
    html += list.length ? list.map(it => itemHtml(it, T, TT, unit)).join('') : `<div class="sb-pt-empty">${esc(which === 'ex' ? TT.noex + ' ' : '')}${esc(TT.none[kind])}</div>`;
    return html;
  }
  const total = set => KINDS.reduce((n, k) => n + set[k].length, 0);

  function mount(unit, st, med, board) {
    const TT = LBL[med] || LBL.en, T = TP().L[med] || TP().L.en;
    const host = document.createElement('div');
    host.className = 'sb-pt'; host.setAttribute('dir', med === 'en' ? 'ltr' : 'rtl');
    let which = null, kind = 'mcq';
    host.innerHTML = `<div class="sb-pt-bar">
        <span style="display:contents" role="tablist" aria-label="${esc(TT.slo)} / ${esc(TT.ex)}">
        <button type="button" class="sb-pt-tab" role="tab" data-w="slo" aria-selected="false">${TT.slo} <i>${total(st.slo)}</i></button>
        <button type="button" class="sb-pt-tab" role="tab" data-w="ex" aria-selected="false">${TT.ex} <i>${total(st.ex)}</i></button>
        </span>
        <button type="button" class="sb-pt-tab sb-pt-game" data-game="1" aria-haspopup="dialog">${TT.game}</button>
      </div>
      <div class="sb-pt-drawer" hidden>
        <div class="sb-pt-sub" role="tablist">${KINDS.map(k => `<button type="button" class="sb-pt-subtab" role="tab" data-k="${k}" title="${esc(TT.full[k])}"><span lang="en">${TT[k]}</span> <i></i></button>`).join('')}</div>
        <div class="sb-pt-panel"></div>
      </div>`;
    const drawer = host.querySelector('.sb-pt-drawer'), panel = host.querySelector('.sb-pt-panel');
    const paint = () => {
      host.querySelectorAll('.sb-pt-tab:not(.sb-pt-game)').forEach(b => { const on = b.dataset.w === which; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
      drawer.hidden = !which;
      if (!which) return;
      host.querySelectorAll('.sb-pt-subtab').forEach(b => { const k = b.dataset.k; b.classList.toggle('on', k === kind); b.setAttribute('aria-selected', k === kind); b.querySelector('i').textContent = st[which][k].length; b.classList.toggle('zero', !st[which][k].length); });
      panel.innerHTML = panelHtml(st, which, kind, TT, T, board, med, unit);
      panel.scrollTop = 0;
    };
    host.addEventListener('click', e => {
      e.stopPropagation();
      const tab = e.target.closest('.sb-pt-tab');
      if (tab && tab.dataset.game) { if (window.SBArcade) window.SBArcade.open(unit); return; }     // the arcade: games made from this page (js/sb_arcade.js)
      if (tab) {
        if (which === tab.dataset.w) which = null;
        else { which = tab.dataset.w; if (!st[which][kind].length) kind = KINDS.find(k => st[which][k].length) || kind; }
        paint(); return;
      }
      const sub = e.target.closest('.sb-pt-subtab');
      if (sub) { kind = sub.dataset.k; paint(); return; }
      TP().itemClick(e, T);
    });
    host.addEventListener('keydown', e => { if (e.key === 'Escape' && which) { which = null; paint(); e.stopPropagation(); } });
    // keep clicks inside the bar from toggling the page card (the card's header is a sibling, but the body may be a click target)
    // topic cards that were wrapped into a page card after they got a bar: the page card carries the bar now
    unit.querySelectorAll('.sb-pt').forEach(x => x.remove());
    unit.querySelectorAll('[data-sb-pt], [data-sb-pt-no]').forEach(x => { x.removeAttribute('data-sb-pt'); x.removeAttribute('data-sb-pt-no'); });
    unit.dataset.sbPt = '1';
    const target = unit.matches('.sb-pgcard') ? (unit.querySelector(':scope > .math-accordion-body') || unit) : unit;
    target.insertBefore(host, target.firstChild);
    return host;
  }

  // ---------- scanning ----------
  let timer = 0, busy = false;
  function scan(force) {
    if (busy) return; busy = true;
    try {
      const c = box();
      if (!c || !TP() || !lessonTabOn(c)) return;
      const units = unitsIn(c);
      if (!units.length) return;
      if (!force && units.every(u => u.dataset.sbPt || u.dataset.sbPtNo)) return;
      if (force) { c.querySelectorAll('.sb-pt').forEach(x => x.remove()); c.querySelectorAll('[data-sb-pt], [data-sb-pt-no]').forEach(u => { u.removeAttribute('data-sb-pt'); u.removeAttribute('data-sb-pt-no'); }); }
      // exercise pages carry no bar; neither do the pages after the last exercise (summary, glossary). Lesson pages between
      // two exercises (a book that sets an exercise after each section) still do.
      const flags = units.map(startsExercise), last = flags.lastIndexOf(true);
      const pre = units.filter((u, i) => !flags[i] && (last < 0 || i < last));
      units.forEach(u => { if (!pre.includes(u)) u.dataset.sbPtNo = '1'; });
      if (!pre.length) return;
      let med = 'en'; try { med = (window.SBMedium && window.SBMedium.mediumNow()) || 'en'; } catch (e) { /* default */ }
      if (!LBL[med]) med = 'en';
      const cur = chapterNow();
      const board = cur.ch ? boardOf(cur.subj, cur.cls, cur.ch, cur.idx) : null;
      const sets = plan(pre, cur.ch, board, med);
      pre.forEach((u, i) => { if (!u.dataset.sbPt) mount(u, sets[i], med, board); });
    } catch (e) { console.error('page tabs', e); } finally { busy = false; }
  }
  // a throttle, not a debounce: the full-screen book keeps touching the page every 300 ms
  function refresh(force) {
    if (timer) { if (!force) return; clearTimeout(timer); }
    timer = setTimeout(() => { timer = 0; scan(force); }, force ? 10 : 350);
  }

  function start() {
    const s = document.createElement('style'); s.id = 'sb-pt-css';
    s.textContent = `
    .sb-pt{position:sticky;top:0;z-index:60;margin:0 0 .7rem;background:#fff;border:1px solid #cbd5e1;border-radius:12px;box-shadow:0 4px 14px -6px rgba(15,23,42,.35);font:500 .9rem system-ui,sans-serif;color:#0f172a;text-align:start}
    .sb-pt-bar{display:flex;gap:.4rem;padding:.35rem .4rem;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none}.sb-pt-bar::-webkit-scrollbar,.sb-pt-sub::-webkit-scrollbar{display:none}
    .sb-pt-tab,.sb-pt-subtab{display:inline-flex;align-items:center;gap:.4rem;border:1px solid #cbd5e1;background:#f8fafc;color:#0f172a;border-radius:999px;padding:.32rem .95rem;font:700 .85rem system-ui,sans-serif;cursor:pointer;white-space:nowrap}
    .sb-pt-tab i,.sb-pt-subtab i{font-style:normal;font-weight:700;font-size:.74rem;min-width:1.3rem;text-align:center;padding:.02rem .4rem;border-radius:999px;background:#e2e8f0;color:#334155}
    .sb-pt-tab:hover,.sb-pt-subtab:hover{background:#eef2ff}
    .sb-pt-tab.on{background:var(--c1f,#0369a1);border-color:var(--c1f,#0369a1);color:#fff}.sb-pt-tab.on i{background:rgba(255,255,255,.25);color:#fff}
    .sb-pt-subtab.on{background:#dcfce7;border-color:#16a34a;color:#166534}.sb-pt-subtab.zero:not(.on){opacity:.6}
    .sb-pt-drawer{border-top:1px solid #e2e8f0;padding:.4rem .5rem .5rem}
    .sb-pt-sub{display:flex;gap:.4rem;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin-bottom:.45rem}
    .sb-pt-panel{max-height:min(44vh,420px);overflow:auto;padding-inline-end:.2rem;scrollbar-width:thin}
    .sb-pt-pol{font-size:.78rem;font-weight:600;color:#1e3a8a;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:.3rem .6rem;margin-bottom:.5rem}
    .sb-pt-cov{background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:.3rem .6rem;margin-bottom:.5rem;font-size:.84rem}
    .sb-pt-cov summary{cursor:pointer;font-weight:700;color:#075985}.sb-pt-cov ul{margin:.3rem 0 .1rem;padding-inline-start:1.2rem;line-height:1.6}.sb-pt-cov em{color:#64748b;font-size:.75rem}
    .sb-pt-empty{color:#64748b;font-size:.85rem;padding:.4rem .2rem}
    .sb-pt-meta{display:flex;gap:.4rem;flex-wrap:wrap;align-items:center;margin-top:.4rem}
    .sb-pt-chip{font:700 .7rem system-ui,sans-serif;background:#ede9fe;color:#5b21b6;border-radius:999px;padding:.1rem .55rem}.sb-pt-chip.alt{background:#fef3c7;color:#92400e}
    .sb-pt-hint{font-size:.75rem;color:#64748b}
    .sb-pt .sb-tp-q{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:.6rem .8rem;margin:.4rem 0}
    .sb-pt .sb-tp-qt{font-weight:600;line-height:1.7}
    .sb-pt .sb-tp-opts{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.5rem}
    .sb-pt .sb-tp-opt,.sb-pt .sb-tp-tf,.sb-pt .sb-tp-show{border:1px solid #cbd5e1;background:#fff;border-radius:8px;padding:.3rem .7rem;cursor:pointer;font:500 .88rem system-ui,sans-serif}
    .sb-pt .sb-tp-plain{cursor:default}
    .sb-pt .sb-tp-opt.ok,.sb-pt .sb-tp-tf.ok{background:#dcfce7;border-color:#16a34a}.sb-pt .sb-tp-opt.bad,.sb-pt .sb-tp-tf.bad{background:#fee2e2;border-color:#dc2626}
    .sb-pt .sb-tp-fb{margin-top:.4rem;font-weight:600;font-size:.85rem}
    .sb-pt .sb-tp-ans{margin-top:.5rem;background:#f0fdf4;border-inline-start:3px solid #16a34a;padding:.45rem .7rem;border-radius:6px;line-height:1.75}
    .sb-pt .sb-tp-show{margin-top:.5rem}
    .bk-page>.sb-pt{margin-bottom:.8rem;margin-right:5.6rem}   /* the page's Bookmark / Notes buttons sit in the top corner, beside the bar */
    .bk-page>.sb-pt .sb-pt-tab{padding:.28rem .7rem;font-size:.8rem}
    .math-accordion-body>.sb-pt{margin-top:-.2rem}
    @media (max-width:560px){.sb-pt-tab,.sb-pt-subtab{padding:.26rem .55rem;font-size:.76rem;gap:.25rem}.sb-pt-tab{flex:1 1 0;justify-content:center}.sb-pt-panel{max-height:38vh}}
    `;
    document.head.appendChild(s);
    new MutationObserver(recs => {
      if (recs.some(r => [...r.addedNodes].some(n => n.nodeType === 1 && !(n.matches && n.matches('.sb-pt, .bk-nav, .bk-modal')) && !(n.closest && n.closest('.sb-pt, .bk-nav, .bk-modal'))))) refresh(false);
    }).observe(document.body, {childList: true, subtree: true});
    document.addEventListener('sb-fs-change', () => refresh(true));
    refresh(false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.SBPageTabs = {scan: () => scan(true), plan, unitsIn, startsExercise, unitText, chapterNow, boardOf, bucket, sloBucket};
})();
