/* sb_structure.js — every chapter follows the order of the book, and nothing is shown twice.
 *
 *  A learner opens a chapter and finds, in this order:
 *    📖 Lessons     – the topics in book order (with their examples, activities and figures)
 *    💡 Concepts    – only when it adds something the lesson does not already show
 *    📋 Summary     – the chapter's key points / summary
 *    ✍️ Exercise    – the chapter exercise in printed order
 *    🎯 Board practice, glossary, grammar … – only when they have content of their own
 *
 *  How: when a chapter opens, every tab is rendered once (synchronously, nothing is painted) and compared.
 *   • Lesson cards that are really the chapter exercise ("Doing / Exercise / مشق / … Questions"), the key
 *     points ("Key points / Summary / اہم نکات") or SLO practice are taken out of Lessons. If the matching tab
 *     already contains them they are simply dropped; otherwise they are moved into that tab.
 *   • A tab that is empty, or whose text is already in an earlier tab, is hidden.
 *   • The lesson's own "Exercise (Solved)" and "SLOs" sub-tabs (copies of the main tabs) are removed.
 *   • Maths topic cards lose their "Topic Exercise / Topic SLOs" and language sub-tabs (sentence click
 *     gives the translation; the Exercises tab holds the exercises).
 * Loaded after app.js and the class 11/12 view adapters, which it wraps. */
(function () {
  'use strict';
  if (typeof window.switchSubjectTab !== 'function') return;

  const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
  const strip = s => norm(s).replace(/[⛶▸▾+−🔊]/g, ' ').replace(/\s+/g, ' ').trim();
  const keyOf = s => s.toLowerCase().replace(/[^a-z0-9؀-ۿ ]/g, '').replace(/\s+/g, ' ').trim();
  function sentences(text) {
    const out = new Set();
    norm(text).split(/(?<=[.?!۔؟:])\s+/).forEach(s => { const k = keyOf(s); if (k.length > 30) out.add(k.slice(0, 120)); });
    return out;
  }
  const NOISE = '.sb-tri-drawer, .sh-sdrawer, [id^="sent-trans-"], .sb-topic-tools, .para-lang-tabs-bar, button, script, style, .m6-tr';
  function textOf(el) {
    const c = el.cloneNode(true);
    c.querySelectorAll(NOISE).forEach(x => x.remove());
    return c.textContent || '';
  }
  // word level: short Urdu options and Qur'anic lines are rarely 30-character "sentences", so a textbook
  // exercise page can repeat the structured bank without sharing one sentence key. Diacritics are ignored.
  const words = text => String(text || '').replace(/[ً-ٰٟۖ-ۭـ]/g, '')
    .replace(/[^\p{L}\p{N} ]+/gu, ' ').toLowerCase().split(/\s+/).filter(w => w.length > 1);
  function wordOverlap(text, ref) {
    const w = words(text);
    if (w.length < 12 || !ref || !ref.size) return 0;
    return w.filter(x => ref.has(x)).length / w.length;
  }
  // when the target tab already holds a structured question bank (cards, MCQ widgets) a raw copy of the
  // printed exercise only needs to share half its words with it: the bank shows one question type at a time
  const repeats = (own, text, target, wset, bank) => overlap(own, target) >= 0.5 || wordOverlap(text, wset) >= (bank ? 0.5 : 0.7);
  const BANK_ITEM = '.class12-question, .math12-study-question, .tb-mcq-card, .interactive-mcq-card, .slo-accordion-card, .sbq, .math-mcq-opt, .universal-mcq-opt-btn, .tb-qa-card, .c2-mcq-box';
  // text for word overlap keeps option buttons (textOf drops every button)
  const fullText = el => { const c = el.cloneNode(true); c.querySelectorAll('.sb-tri-drawer, .sh-sdrawer, [id^="sent-trans-"], script, style, template, .sb-topic-tools').forEach(x => x.remove()); return c.textContent || ''; };
  function overlap(set, ref) {
    if (!set.size) return 0;
    let n = 0; set.forEach(k => { if (ref.has(k)) n++; });
    return n / set.size;
  }

  // ---------- what a heading means ----------
  const LEAD = /^(?:(?:lesson|topic|part|paragraph|book|page)\s+(?:\d[\w.\-]*\s*)?)/i;
  const EX_HEAD = /^(?:doing\b|(?:review\s+|end[- ]of[- ](?:unit|chapter)\s+)?exercises?\b|unit\s+\d+\s+exercise|(?:multiple[- ]choice|conceptual|comprehensive|numerical|short(?:[- ]answer)?|long(?:[- ]answer)?|review|self[- ]assessment|test\s+yourself)\s+(?:questions?|problems?)|questions?\s+for\s+(?:review|practice)|مشق(?:ی|یں)?(?=\s|$|[·—:\-(])|مشقی\s+سوالات|سوالات(?=\s|$|[·—:\-(])|تمرین|مشغولتیا)/i;
  const SUM_HEAD = /^(?:key\s+points?|summary|chapter\s+summary|unit\s+summary|points\s+to\s+remember|اہم\s+نکات|خلاصہ|لنډیز)/i;
  const SLO_HEAD = /^(?:slo[- ]based\s+practice|slo\s+پر\s+مبنی)/i;
  function kindOfHeader(raw) {
    const t = strip(raw);
    if (/^doing\b/i.test(t)) return 'exercise';
    const h = t.replace(LEAD, '');
    if (SLO_HEAD.test(h)) return 'slos';
    if (SUM_HEAD.test(h)) return 'summary';
    if (EX_HEAD.test(h)) return 'exercise';
    return '';
  }
  const TARGET = {exercise: 'exercise', summary: 'formulas', slos: 'slos'};

  // ---------- lesson cards ----------
  const CARD = '.math-topic-card, .para-card, .urdu-section-card';
  function topCards(root) {
    return [...root.querySelectorAll(CARD)].filter(c => !c.parentElement.closest(CARD));
  }
  function cardHeader(card) {
    const h = card.querySelector(':scope > .math-acc-header, :scope > .para-card-header, :scope > .sb-topic-head, :scope > div:first-child');
    return h ? textOf(h) : '';
  }
  // inner blocks: an exercise heading inside a lesson card, up to the next ordinary heading
  const INNER_HEAD = 'h2, h3, h4, h5, .m6-h2, .m6-h3, .math-book-subheading, .c1-banner';
  const EX_SECTION = '.m5-exercise, .m6-exercise, .m7-exercise, .m8-exercise, .m11-exercise';
  function innerBlocks(card) {
    const out = [], taken = new Set();
    // the book readers wrap each exercise in its own section
    card.querySelectorAll(EX_SECTION).forEach(sec => {
      if (taken.has(sec) || sec.parentElement.closest(EX_SECTION)) return;
      out.push({kind: 'exercise', nodes: [sec]}); taken.add(sec); sec.querySelectorAll(INNER_HEAD).forEach(x => taken.add(x));
    });
    card.querySelectorAll(INNER_HEAD).forEach(h => {
      if (taken.has(h) || h.closest('.math-acc-header, .para-card-header, .sb-topic-head')) return;
      const ht = strip(textOf(h));
      // numbered Urdu/Pashto practice inside a topic ("مشق 1.5", "مشقی مسئلہ 7.1", "تمرین 2.3") is the book's in-text
      // assignment, not the chapter exercise: it stays in the lesson
      if (/^[؀-ۿ]/.test(ht) && /\d+\.\d+/.test(ht.slice(0, 40))) return;
      const kind = kindOfHeader(ht);
      if (!kind) return;
      const nodes = [h];
      for (let n = h.nextElementSibling; n; n = n.nextElementSibling) {
        if (n.matches(INNER_HEAD) && !kindOfHeader(textOf(n))) break;
        nodes.push(n); taken.add(n); n.querySelectorAll && n.querySelectorAll(INNER_HEAD).forEach(x => taken.add(x));
      }
      out.push({kind, nodes});
    });
    return out;
  }

  // ---------- the per-chapter plan ----------
  const plans = new Map();
  let planning = false;
  let original = null;          // the chain below this wrapper: set when SBHooks builds it (makePlan below also calls it directly)
  const tabButtons = () => [...document.querySelectorAll('.math-nav-tabs .math-tab-btn[data-tab]')];
  // book order: the text (and its glossary), what it teaches, its key points, then the exercise and its parts,
  // and last the board practice that is not in the book
  const ORDER = ['lesson', 'glossary', 'concepts', 'formulas', 'exercise', 'vocabulary', 'language', 'grammar', 'writing', 'words', 'slos', 'booktext'];
  const KEEP = new Set(['lesson', 'exercise']);

  function makePlan(subjKey, chIdx, classId) {
    const container = document.getElementById('subjTabContent');
    const ids = tabButtons().map(b => b.dataset.tab).filter(id => ORDER.includes(id));
    if (!container || ids.length < 2) return null;
    const saved = {
      tab: state.activeSubjTab, sci: state.activeScienceLessonSubTab, lang: state.activeSubjLessonSubTab,
      scroll: container.scrollTop
    };
    state.activeScienceLessonSubTab = 'translations'; state.activeSubjLessonSubTab = 'paragraphs';
    const sets = {}, html = {}, wsets = {}, banks = {};
    planning = true;
    try {
      for (const id of ids) {
        try { original(subjKey, id, chIdx, classId); } catch (e) { continue; }
        html[id] = container.innerHTML;
        sets[id] = sentences(textOf(container));
        wsets[id] = new Set(words(fullText(container)));
        banks[id] = container.querySelectorAll(BANK_ITEM).length >= 3;
        sets[id].len = strip(textOf(container)).length;
        sets[id].head = strip(textOf(container)).slice(0, 600);
      }
      // a tab that shows the same text in the next (or previous) chapter is a generic template, not this chapter's content
      const n = (getSubjectChapterList(subjKey, classId) || []).length;
      const other = chIdx + 1 < n ? chIdx + 1 : chIdx - 1;
      if (other >= 0 && other !== chIdx) {
        for (const id of ids) {
          if (KEEP.has(id) || !sets[id] || id === 'slos') continue;
          try { original(subjKey, id, other, classId); } catch (e) { continue; }
          const o = sentences(textOf(container)), s = sets[id];
          sets[id].template = s.size >= 2 && o.size >= 2 && overlap(s, o) >= 0.8 && overlap(o, s) >= 0.8;
        }
      }
    } finally { planning = false; }
    state.activeScienceLessonSubTab = saved.sci; state.activeSubjLessonSubTab = saved.lang; state.activeSubjTab = saved.tab;

    const plan = {cards: [], inner: [], moved: {exercise: [], formulas: [], slos: []}, hidden: new Set()};
    // 1. lesson cards and inner blocks
    if (html.lesson != null) {
      const box = document.createElement('div'); box.innerHTML = html.lesson;
      const cards = topCards(box);
      const keptLesson = new Set();
      let inExercise = false;
      cards.forEach((card, i) => {
        const kind = kindOfHeader(cardHeader(card));
        const own = sentences(textOf(card));
        const target = TARGET[kind];
        if (kind === 'exercise') inExercise = true;
        if (kind && target && ids.includes(target)) {
          plan.cards[i] = repeats(own, textOf(card), sets[target], wsets[target], banks[target]) || !own.size && words(textOf(card)).length < 12 ? 'drop' : 'move:' + target;
          if (plan.cards[i].startsWith('move')) plan.moved[target].push(card.outerHTML);
          return;
        }
        if (kind === 'exercise' && !ids.includes('exercise')) { own.forEach(k => keptLesson.add(k)); return; }
        // a continuation page of the exercise: most of it is already in the Exercise tab
        // (only once the chapter's exercise has begun: earlier pages hold in-text assignments the bank also lists)
        if (inExercise && ids.includes('exercise') && own.size >= 4 && overlap(own, sets.exercise) >= 0.75) { plan.cards[i] = 'drop'; return; }
        const chosen = [];
        innerBlocks(card).forEach((blk, j) => {
          const target2 = TARGET[blk.kind];
          if (!target2 || !ids.includes(target2)) return;
          const s = new Set(); blk.nodes.forEach(n => sentences(textOf(n)).forEach(k => s.add(k)));
          const blkText = blk.nodes.map(n => textOf(n)).join(' ');
          const act = repeats(s, blkText, sets[target2], wsets[target2], banks[target2]) || !s.size && words(blkText).length < 12 ? 'drop' : 'move:' + target2;
          plan.inner.push({card: i, block: j, act});
          if (act.startsWith('move')) plan.moved[target2].push('<div class="sb-moved-block">' + blk.nodes.map(n => n.outerHTML).join('') + '</div>');
          chosen.push(blk);
        });
        chosen.forEach(blk => blk.nodes.forEach(n => n.remove()));
        sentences(textOf(card)).forEach(k => keptLesson.add(k));
      });
      sets.lesson = keptLesson; sets.lesson.len = 1e9;
    }
    // 2. tabs: empty or already shown earlier
    const seen = new Set(sets.lesson || []);
    const sorted = ids.slice().sort((a, b) => (ORDER.indexOf(a) + 99) % 99 - (ORDER.indexOf(b) + 99) % 99);
    for (const id of sorted) {
      const s = sets[id]; if (!s) continue;
      const extra = (plan.moved[id] || []).length;
      if (id !== 'lesson' && !extra) {
        const empty = s.len < (id === 'exercise' ? 160 : 300) || s.size === 0 && s.len < 400 || /(^|\D)0\s+(?:glossary\s+)?terms\b/i.test(s.head || '') && s.size < 3;
        const dup = !KEEP.has(id) && s.size >= 3 && overlap(s, seen) >= 0.85;
        (plan.why = plan.why || {})[id] = {size: s.size, len: s.len, seen: Math.round(100 * overlap(s, seen)), template: !!s.template};
        if (empty || dup || (!KEEP.has(id) && s.template)) { plan.hidden.add(id); continue; }
      }
      s.forEach(k => seen.add(k));
    }
    plan.order = sorted;
    plan.lens = {}; ids.forEach(id => { if (sets[id]) plan.lens[id] = sets[id].len; });
    return plan;
  }

  // ---------- applying the plan ----------
  function applyTabs(plan) {
    const bar = document.querySelector('.math-nav-tabs');
    if (!bar) return;
    const btns = tabButtons();
    btns.forEach(b => { b.hidden = plan.hidden.has(b.dataset.tab); b.style.display = b.hidden ? 'none' : ''; });
    // book order: lesson, concepts, summary, exercise, practice, extras (Word Stats and others stay last)
    const ordered = plan.order.map(id => btns.find(x => x.dataset.tab === id)).filter(Boolean);
    const final = [...bar.children].filter(b => b.dataset.tab && !ordered.includes(b)).concat(ordered, [...bar.children].filter(b => !b.dataset.tab));
    // Moving a button drops the keyboard focus to the page, and this runs after every redraw of the bar: move only when the order is wrong,
    // and give the focus back to the button that had it (arrow keys through the tabs, js/core/a11y.js)
    if (final.length === bar.children.length && final.every((b, i) => b === bar.children[i])) return;
    const focused = document.activeElement;
    final.forEach(b => bar.appendChild(b));
    if (focused && focused !== document.activeElement && bar.contains(focused) && (!document.activeElement || document.activeElement === document.body)) focused.focus();
  }
  function cleanLessonSubTabs() {
    const bar = document.getElementById('subjSubTabsBar'); if (!bar) return;
    bar.querySelectorAll('button').forEach(b => {
      const on = b.getAttribute('onclick') || '';
      if (/'(exercise|slos)'\)/.test(on)) b.remove();
      else if (/switchLangLessonSubTab\([^)]*'translations'\)/.test(on) && bar.querySelector('[onclick*="paragraphs"]')) b.remove();
      else if (/'translations'\)/.test(on) && /Translation|ترجم|ژباړ/.test(b.textContent)) b.innerHTML = /ترجم/.test(b.textContent) ? '📖 سبق' : /ژباړ/.test(b.textContent) ? '📖 لوست' : '📖 Lesson text';
    });
  }
  function applyLesson(plan, container) {
    const cards = topCards(container);
    cards.forEach((card, i) => { if (plan.cards[i]) card.remove(); });
    // inner blocks: same deterministic order as when planning
    const byCard = {};
    plan.inner.forEach(x => { (byCard[x.card] = byCard[x.card] || []).push(x); });
    Object.keys(byCard).forEach(ci => {
      const card = cards[ci]; if (!card || !card.isConnected) return;
      const want = new Set(byCard[ci].map(x => x.block));
      innerBlocks(card).forEach((blk, j) => { if (want.has(j)) blk.nodes.forEach(n => n.remove()); });
    });
  }
  const TITLE = {exercise: '✍️ From the textbook', formulas: '📋 Key points from the textbook', slos: '🎯 Practice from the textbook'};
  function applyMoved(plan, tab, container) {
    const list = plan.moved[tab]; if (!list || !list.length) return;
    const wrap = document.createElement('section'); wrap.className = 'sb-moved';
    wrap.innerHTML = `<h3 class="sb-moved-title">${TITLE[tab]}</h3>` + list.join('');
    container.prepend(wrap);
  }

  SBHooks.use('switchSubjectTab', function (next) { original = next; return function (subjKey, tabId, chIdx, classId) {
    if (planning) return original.apply(this, arguments);
    if (tabId === 'lesson') {
      if (state.activeScienceLessonSubTab === 'exercise' || state.activeScienceLessonSubTab === 'slos') state.activeScienceLessonSubTab = 'translations';
      if (state.activeSubjLessonSubTab === 'exercise' || state.activeSubjLessonSubTab === 'slos') state.activeSubjLessonSubTab = 'paragraphs';
    }
    const key = [classId, subjKey, chIdx].join('|');
    let plan = plans.get(key);
    if (plan === undefined) {
      try { plan = makePlan(subjKey, chIdx, classId); } catch (e) { plan = null; if (window.console) console.warn('sb_structure', e); }
      plans.set(key, plan);
    }
    if (plan && plan.hidden.has(tabId)) tabId = 'lesson';
    let r = original.call(this, subjKey, tabId, chIdx, classId);
    if (!plan) return r;
    let container = document.getElementById('subjTabContent');
    // Some banks load after the chapter opens (Class 11/12 question banks): a plan made before they arrived
    // saw an empty tab. When a tab now shows clearly more (or less) text than when planned, plan again once.
    if (container && !plan.rechecked && plan.lens && plan.lens[tabId] != null) {
      const was = plan.lens[tabId], now = strip(textOf(container)).length;
      if (Math.abs(now - was) > Math.max(400, was * 0.3)) {
        let fresh = null;
        try { fresh = makePlan(subjKey, chIdx, classId); } catch (e) { fresh = null; }
        if (fresh) {
          fresh.rechecked = true; plans.set(key, fresh); plan = fresh;
          if (plan.hidden.has(tabId)) tabId = 'lesson';
          r = original.call(this, subjKey, tabId, chIdx, classId);
          container = document.getElementById('subjTabContent');
        } else plan.rechecked = true;
      }
    }
    applyTabs(plan);
    if (tabId === 'lesson') { cleanLessonSubTabs(); if (container) applyLesson(plan, container); }
    else if (container) applyMoved(plan, tabId, container);
    return r;
  }; });
  // The chapter view is sometimes drawn again without switchSubjectTab (saving progress, the sidebar tick,
  // full screen, a resize): the fresh tab bar would show every tab again. Re-apply the plan to any new bar.
  function currentRef() {
    const b = document.querySelector('.math-nav-tabs .math-tab-btn[onclick*="switchSubjectTab"]');
    const m = b && (b.getAttribute('onclick') || '').match(/switchSubjectTab\('([^']+)'\s*,\s*'[^']*'\s*,\s*(\d+)\s*,\s*'([^']+)'/);
    return m ? {subjKey: m[1], chIdx: +m[2], classId: m[3]} : null;
  }
  let guard = 0;
  new MutationObserver(() => {
    if (guard || planning) return;
    guard = setTimeout(() => {
      guard = 0;
      const bar = document.querySelector('.math-nav-tabs');
      if (!bar || planning) return;
      const ref = currentRef(); if (!ref) return;
      const plan = plans.get([ref.classId, ref.subjKey, ref.chIdx].join('|'));
      if (!plan) return;
      const stale = tabButtons().some(b => plan.hidden.has(b.dataset.tab) && b.style.display !== 'none');
      if (!stale) return;
      applyTabs(plan);
      // the tab on show was one the plan hides: open the lesson instead
      const active = bar.querySelector('.math-tab-btn.active[data-tab]');
      if (active && plan.hidden.has(active.dataset.tab)) window.switchSubjectTab(ref.subjKey, 'lesson', ref.chIdx, ref.classId);
    }, 40);
  }).observe(document.body, {childList: true, subtree: true});

  // lesson sub-tab switches re-render the lesson body: keep it clean
  ['switchScienceLessonSubTab', 'switchLangLessonSubTab'].forEach(name => {
    if (typeof window[name] !== 'function') return;
    SBHooks.use(name, function (fn) { return function (subjKey, sub) {
      if (sub === 'exercise' || sub === 'slos') sub = name === 'switchLangLessonSubTab' ? 'paragraphs' : 'translations';
      const r = fn.call(this, subjKey, sub);
      cleanLessonSubTabs();
      const plan = plans.get([state.selectedClass, subjKey, state.selectedSubjChapter].join('|'));
      const container = document.getElementById('subjTabContent');
      if (plan && container && (sub === 'translations' || sub === 'paragraphs')) applyLesson(plan, container);
      return r;
    }; });
  });

  // ---------- Maths view (switchMathTab): exercises live in Exercises; examples stay where the book puts them ----------
  const mathPlans = new Map();
  function renderTo(fn, ch) { const d = document.createElement('div'); try { d.innerHTML = fn(ch) || ''; } catch (e) { return null; } return d; }
  function mathPlan() {
    const key = state.selectedClass + '|' + state.selectedMathChapter;
    if (mathPlans.has(key)) return mathPlans.get(key);
    let plan = null;
    try {
      const ch = (getMathChapterList() || [])[state.selectedMathChapter];
      const L = ch && renderTo(renderMathLesson, ch), X = ch && renderTo(renderMathExercises, ch), E = ch && renderTo(renderMathExamples, ch);
      if (L && X) {
        const xs = sentences(textOf(X));
        const blocks = [...L.querySelectorAll(EX_SECTION)].filter(s => !s.parentElement.closest(EX_SECTION));
        plan = {drop: [], moved: [], hideExamples: false};
        blocks.forEach((b, i) => {
          const own = sentences(textOf(b));
          if (!own.size || overlap(own, xs) >= 0.5) plan.drop.push(i); else { plan.drop.push(i); plan.moved.push(b.outerHTML); }
        });
        blocks.forEach(b => b.remove());
        // examples already read inside the lesson (in book order) need no tab of their own
        if (E) { const es = sentences(textOf(E)); plan.hideExamples = es.size >= 3 && overlap(es, sentences(textOf(L))) >= 0.7; }
      }
    } catch (e) { plan = null; }
    mathPlans.set(key, plan);
    return plan;
  }
  function applyMathTabs(plan) {
    const btns = [...document.querySelectorAll('.math-nav-tabs .math-tab-btn[data-tab]')];
    let n = 0;
    btns.forEach(b => {
      const hide = plan && plan.hideExamples && b.dataset.tab === 'examples';
      b.hidden = hide; b.style.display = hide ? 'none' : '';
      if (!hide) { n++; const lab = b.innerHTML.replace(/(^|>)(\s*[^<\d]*?)\d+\.\s/, (m, a, pre) => a + pre + n + '. '); if (lab !== b.innerHTML) b.innerHTML = lab; }
    });
  }
  if (typeof window.switchMathTab === 'function') {
    SBHooks.use('switchMathTab', function (origMath) { return function (tabName, skipScroll) {
      const plan = mathPlan();
      if (plan && plan.hideExamples && tabName === 'examples') tabName = 'lesson';
      const r = origMath.call(this, tabName, skipScroll);
      const box = document.getElementById('mathTabContent');
      if (plan && box) {
        if (tabName === 'lesson') [...box.querySelectorAll(EX_SECTION)].filter(s => !s.parentElement.closest(EX_SECTION)).forEach(s => s.remove());
        if (tabName === 'exercises' && plan.moved.length) {
          const wrap = document.createElement('section'); wrap.className = 'sb-moved';
          wrap.innerHTML = `<h3 class="sb-moved-title">${TITLE.exercise}</h3>` + plan.moved.join('');
          box.prepend(wrap);
          if (typeof typesetChapterMath === 'function') typesetChapterMath(wrap);
        }
      }
      applyMathTabs(plan);
      return r;
    }; });
  }

  // ---------- Maths topic cards ----------
  function cleanMathTopicTabs(root) {
    (root || document).querySelectorAll('.topic-sub-tabs-bar[data-topic]').forEach(bar => {
      bar.querySelectorAll('.topic-sub-tab-btn[data-subtab]').forEach(b => {
        const t = b.dataset.subtab;
        if (t === 'exercise' || t === 'slos' || t === 'urdu' || t === 'pashto') b.remove();
        else if (t === 'english' && /English/.test(b.textContent)) b.innerHTML = '📖 Lesson';
      });
      if (bar.querySelectorAll('.topic-sub-tab-btn').length < 2) bar.classList.add('sb-single-subtab');
    });
  }
  let t = 0;
  new MutationObserver(() => { if (!t) t = setTimeout(() => { t = 0; cleanMathTopicTabs(); }, 50); })
    .observe(document.body, {childList: true, subtree: true});

  const css = document.createElement('style');
  css.textContent = `
  .sb-moved{margin:0 0 1.25rem;padding:.9rem 1rem;border:1px solid #e2e8f0;border-radius:14px;background:#fff}
  .sb-moved-title{margin:0 0 .6rem;font-size:1rem;font-weight:800;color:#0f172a}
  .sb-moved .math-topic-card,.sb-moved .para-card{margin-bottom:.75rem}
  .topic-sub-tabs-bar.sb-single-subtab{display:none!important}`;
  document.head.appendChild(css);

  window.SBStructure = {plans, kindOfHeader};
})();
