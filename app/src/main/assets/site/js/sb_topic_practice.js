/* sb_topic_practice.js — under a topic card: the book's own questions that belong to that topic.
 *   🎯 SLOs     : the chapter's learning outcomes and SLO / board question banks that match the topic;
 *   ✍️ Exercise : the textbook's exercise questions that match the topic.
 * Nothing is generated. A question is placed under a topic only when the match is clear (the topic's title words
 * appear in it, or it shares many key words with that topic and clearly fewer with any other). A question already
 * listed in the exercise is not repeated in the SLO bank. Sub-tabs and the two main tabs appear only when they have
 * items, and a topic with no matching book question gets no panel at all. MCQs only check answers when the book
 * data has an answer key. Labels follow the subject's medium (SBMedium). Works offline. */
(function () {
  'use strict';
  const norm = s => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const AR = /[ء-يٱ-ۓݐ-ݿﭐ-﷿ﹰ-ﻼ]/g, LA = /[A-Za-z]/g;
  const lang = t => { const a = (t.match(AR) || []).length, l = (t.match(LA) || []).length; if (a > l) return /[ټځڅډړږښګڼۍې]/.test(t) ? 'ps' : 'ur'; return 'en'; };
  const WORD = /[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N}'’-]*/gu;
  const words = t => (String(t).match(WORD) || []);
  const STOP = new Set(('the a an and or but if then than that this these those of in on at to from by for with as is are was were be been being it its into over under about between during before after also can could may might must shall should will would not no nor so such each any all some more most other another their there they them he she his her we our you your i have has had do does did which who whom whose what when where why how one two three because while through within without upon up down out off very only same both either neither per via using used use called known following given find write show draw state explain define describe discuss answer question questions exercise unit chapter topic lesson page figure table example').split(' '));
  const STOP_UR = new Set('کا کی کے میں سے ہے ہیں اور کو پر کہ یہ وہ کر تھا تھی تھے گیا گئی گئے ہو ہوتا ہوتی ہوتے جو جس جن اس ان ایک بھی نے تک لیے لئے ساتھ بعد پہلے کیا کیں کرتا کرتی کرتے والا والی والے جاتا جاتی جاتے سکتا سکتی سکتے ہوئے ہوئی ہوں یا تو ہی نہ نہیں بہت کسی کوئی ہر دو ذریعے دوران طرح صورت عمل دیگر مختلف مثال اہم بنیادی سوال سوالات جواب سبق باب بیان کریں لکھیں ضرورت اہمیت مفہوم مراد وضاحت تفصیل روشنی ڈالیں نوٹ کون کیوں کیسے کب'.split(' '));
  const STOP_PS = new Set('د په له او چې دی دي ده یو هم نو خو چي کې ته لکه نه ډېر هر دا هغه دغه یې به ورته شي شو وي وو پوښتنه ځواب'.split(' '));
  const key = w => { const l = lang(w); let k = l === 'en' ? w.toLowerCase().replace(/[’']s$/, '') : w; if (l === 'en' && k.length > 4) k = k.replace(/(?:ies)$/, 'y').replace(/(?:es|s)$/, ''); return k; };
  const isStop = w => { const l = lang(w); return l === 'en' ? STOP.has(w.toLowerCase()) : STOP_UR.has(w) || STOP_PS.has(w); };
  const content = (t, min) => words(t).filter(w => !/^\d/.test(w) && !isStop(w) && w.length >= (lang(w) === 'en' ? (min || 4) : 3)).map(key);

  const L = {
    en: {letters: ['a', 'b', 'c', 'd', 'e', 'f'], slo: '🎯 SLOs', ex: '✍️ Exercise Questions', outcomes: 'Learning outcomes for this topic', mcq: 'MCQs', sq: 'Short Questions', lq: 'Long Questions', q: 'Questions', tf: 'True / False', bl: 'Fill in the Blanks',
      show: 'Show answer', hide: 'Hide answer', t: 'True', f: 'False', right: '✔ Correct', wrong: '✘ Not quite — correct answer: '},
    ur: {letters: ['الف', 'ب', 'ج', 'د', 'ہ', 'و'], slo: '🎯 تعلیمی نتائج', ex: '✍️ مشقی سوالات', outcomes: 'اس عنوان کے تعلیمی نتائج', mcq: 'کثیر الانتخابی سوالات', sq: 'مختصر سوالات', lq: 'تفصیلی سوالات', q: 'سوالات', tf: 'درست / غلط', bl: 'خالی جگہ پُر کریں',
      show: 'جواب دیکھیں', hide: 'جواب چھپائیں', t: 'درست', f: 'غلط', right: '✔ درست', wrong: '✘ درست جواب: '},
    ps: {letters: ['الف', 'ب', 'ج', 'د', 'ه', 'و'], slo: '🎯 د زده‌کړې پایلې', ex: '✍️ د تمرین پوښتنې', outcomes: 'د دې سرلیک د زده‌کړې پایلې', mcq: 'څو ځوابه پوښتنې', sq: 'لنډې پوښتنې', lq: 'اوږدې پوښتنې', q: 'پوښتنې', tf: 'سم / ناسم', bl: 'تش ځایونه ډک کړئ',
      show: 'ځواب وګورئ', hide: 'ځواب پټ کړئ', t: 'سم', f: 'ناسم', right: '✔ سم', wrong: '✘ سم ځواب: '},
    ar: {letters: ['أ', 'ب', 'ج', 'د', 'هـ', 'و'], slo: '🎯 نواتج التعلم', ex: '✍️ أسئلة التمارين', outcomes: 'نواتج التعلم لهذا الموضوع', mcq: 'اختيار من متعدد', sq: 'أسئلة قصيرة', lq: 'أسئلة طويلة', q: 'أسئلة', tf: 'صح / خطأ', bl: 'املأ الفراغ',
      show: 'اعرض الجواب', hide: 'أخفِ الجواب', t: 'صح', f: 'خطأ', right: '✔ صحيح', wrong: '✘ الجواب الصحيح: '}
  };

  // ---------- the book's own questions, from the chapter data ----------
  const QKEYS = ['q', 'question', 'questionText', 'stem', 'statement', 'text', 'en'];
  // containers that hold source scaffolding, worked examples or lesson text — never questions to list here
  const SKIP = /^(sourceContextBlocks|sourceQuestionBlocks|sourceBlocks|sourceReferences|sourcePages|sourcePdfPages|sourceSummary\w*|diagram|labels|figures?|workedExamples|examples|example|sections|theory|rules|steps|progressiveSolution|solution|answer|options|translations?|formulaSheet|summary|vocab\w*|glossary|words|paragraphs|pages|reviewStatus)$/i;
  const EXP = /exercise|problems|review|assessment/i;
  const BANK = /slo|studyBank|mcq|shortQ|longQ|question|trueFalse|truefalse|blank|fill|tf$|sq$|lq$/i;
  // template wording from the old generator, and placeholder answers: never shown
  const JUNK_Q = /^(Write a short note on “|Explain “[^”]*” in detail|Discuss the main points about “|Choose the correct word to complete the sentence|Say whether the statement is true or false)/;
  const JUNK_A = /^(درست نصابی جواب|Curriculum standard definition|agent answer|نمونے کا جواب|—|-|N\/A)\.?$/i;
  let MED = 'en';
  // the question in the subject's own medium (Class 1–8 parts carry en / ur / ps; Urdu books keep Urdu in "en")
  const qText = o => {
    if (MED !== 'en' && typeof o[MED] === 'string' && norm(o[MED]).length >= 6 && !(typeof o.en === 'string' && lang(o.en) === MED)) return o[MED];
    for (const k of QKEYS) if (typeof o[k] === 'string' && norm(o[k]).length >= 6) return o[k];
    return '';
  };
  const txt = v => typeof v === 'string' ? v : v && typeof v === 'object' ? (v.en || v.text || v.ur || '') : (v == null ? '' : String(v));
  const optText = x => norm(typeof x === 'string' ? x : x && (x.text || x.en || x.label || x.ur) || '');
  const dedupeKey = q => norm(q).toLowerCase().replace(/^(?:q\.?\s*)?(?:\(?[0-9ivx]+[.)]|\([a-z]\))\s*/i, '').replace(/[^\p{L}\p{N}]+/gu, '').slice(0, 160);
  // Class 1–8 answers live in CLS6_SOLUTIONS by solId; "-auto-" ids are machine-made, not the book's
  const solOf = o => { const id = o && o.solId; if (!id || /-auto-/.test(id)) return null; const S = window.CLS6_SOLUTIONS; return S && S[id] || null; };
  const stepsText = sol => (sol && Array.isArray(sol.steps) ? sol.steps : []).map(st => typeof st === 'string' ? st : MED !== 'en' && st && st[MED] && !(st.en && lang(st.en) === MED) ? st[MED] : st && st.en || '')
    .map(norm).filter(t => t && !JUNK_A.test(t) && !/^p\. ?\d+\.?$/i.test(t)).join('\n');

  function mcqKey(o, opts) {
    const raw = ['correct', 'correctIndex', 'ans', 'answer', 'key', 'correctAnswer'].map(k => o[k]).find(v => v != null && v !== '');
    if (raw == null) return -1;
    if (typeof raw === 'number') return raw >= 0 && raw < opts.length ? raw : -1;
    const s = norm(txt(raw)); if (!s) return -1;
    if (window.SBMcq && window.SBMcq.resolve) { const r = window.SBMcq.resolve(s, opts, o.no); if (r >= 0) return r; }
    const m = s.match(/^\(?([a-dA-D])[).]?$/) || s.match(/^\(?([a-dA-D])\)\s/) || s.match(/^(?:option|choice)\s*\(?([a-dA-D])\)?(?![a-z])/i); if (m) return 'abcd'.indexOf(m[1].toLowerCase());
    if (/^\d$/.test(s)) { const n = +s; return n >= 1 && n <= opts.length ? n - 1 : -1; }
    const i = opts.findIndex(x => norm(x).toLowerCase() === s.toLowerCase()); return i;
  }
  function tfKey(o) {
    const v = ['answer', 'ans', 'correct', 'key'].map(k => o[k]).find(x => x != null && x !== '');
    if (typeof v === 'boolean') return v;
    const s = norm(txt(v)).toLowerCase();
    if (/^(true|t|درست|صحیح|سم|صح)$/.test(s)) return true;
    if (/^(false|f|غلط|ناسم|خطأ)$/.test(s)) return false;
    return null;
  }

  function collect(ch, med) {
    MED = med || 'en';
    const items = [], seen = new Set(), dup = new Set();
    (function walk(o, path, depth) {
      if (!o || typeof o !== 'object' || depth > 9 || seen.has(o)) return; seen.add(o);
      if (Array.isArray(o)) { o.forEach(x => walk(x, path, depth + 1)); return; }
      const last = path.split('.').pop();
      // a question block with numbered parts: the parts are the questions, the block text is only the instruction
      const q = Array.isArray(o.parts) && o.parts.length ? '' : qText(o);
      const rawOpts = o.options || o.choices || o.opts;
      let opts = Array.isArray(rawOpts) ? rawOpts.map(optText).filter(Boolean) : null;
      // options printed as a lettered list under the question: (a) … (b) … (c) … (d) …
      if (!opts && Array.isArray(o.sourceQuestionBlocks)) {
        const li = o.sourceQuestionBlocks.find(b => b && Array.isArray(b.items) && b.items.length >= 2 && b.items.every((x, i) => { const m = norm(txt(x)).match(/^\(?([a-f])\)/i); return m && m[1].toLowerCase() === 'abcdef'[i]; }));
        if (li) opts = li.items.map(x => norm(txt(x)).replace(/^\(?[a-f]\)\s*/i, ''));
      }
      const inEx = EXP.test(path), inBank = BANK.test(path);
      // SLO statements are outcomes, not questions (slosOf lists them)
      const isOutcome = /^(slos|outcomes|objectives)$/i.test(last) && !opts && !/[?؟]\s*$/.test(norm(q));
      if (q && (inEx || inBank) && !SKIP.test(last) && !isOutcome) {
        const qq = norm(q.replace(/\\n/g, '\n'));
        let stem = null;
        // options printed inline after the question: "… is: a. … b. … c. … d. …"
        if (!opts && window.SBMcq && window.SBMcq.splitInline) { const sp = window.SBMcq.splitInline(qq); if (sp) { stem = sp.stem; opts = sp.opts; } }
        const k = dedupeKey(stem || qq);
        if (!JUNK_Q.test(qq) && (words(qq).length >= 3) && k && !dup.has(k)) {
          dup.add(k);
          let kind;
          if (opts && opts.length >= 2) kind = 'mcq';
          else if (/true|false|tf$/i.test(path)) kind = 'tf';
          else if (/blank|fill/i.test(path)) kind = 'bl';
          else if (/long|lq$/i.test(path)) kind = 'lq';
          else if (/short|sq$/i.test(path)) kind = 'sq';
          else kind = 'q';
          const sol = solOf(o);
          const it = {kind, q: stem || String(q).replace(/\\n/g, '\n').trim(), ex: inEx};
          if (kind === 'mcq') {
            it.opts = opts; it.a = mcqKey(sol ? Object.assign({}, o, {answer: sol.answer}) : o, opts);
            if (it.a < 0) { const c = norm(txt(o.solution) || txt(o.sol)).match(/(?:Choose|Answer|Correct (?:option|answer)(?: is)?)[:\s]*\(([a-d])\)/i); if (c) it.a = 'abcd'.indexOf(c[1].toLowerCase()); }
            it.why = stepsText(sol) || txt(o.solution) || txt(o.sol) || txt(o.exp) || txt(o.explanation);
          } else if (kind === 'tf') it.a = tfKey(sol ? {answer: sol.answer} : o);
          else {
            const a = stepsText(sol) || (sol && norm(txt(sol.answer))) || txt(o.solution) || txt(o.sol) || txt(o.answer) || txt(o.ans) || txt(o.key) || txt(o.model);
            it.ans = norm(a) && !JUNK_A.test(norm(a)) ? a : '';
          }
          items.push(it);
        }
        return;
      }
      // exercise containers first so a question that is both in the exercise and a bank counts as exercise
      const ks = Object.keys(o).filter(k => o[k] && typeof o[k] === 'object' && !SKIP.test(k));
      ks.sort((a, b) => (EXP.test(b) ? 1 : 0) - (EXP.test(a) ? 1 : 0));
      ks.forEach(k => walk(o[k], path + '.' + k, depth + 1));
    })(ch, '', 0);
    return items;
  }
  function slosOf(ch, med) {
    const s = ch && ch.slos; if (!s) return [];
    const list = Array.isArray(s) ? s : Array.isArray(s.outcomes) ? s.outcomes : Array.isArray(s.statements) ? s.statements : [];
    const m = med || 'en';
    return list.map(x => norm(typeof x === 'string' ? x : (x && ((m !== 'en' && x[m] && !(x.en && lang(x.en) === m) ? x[m] : '') || x.text || x.en || x.slo || x.statement)) || ''))
      .filter(x => words(x).length >= 3 && !/[?؟]$/.test(x));
  }
  // the subject views keep their own chapter index (selectedBioChapter, selectedChemChapter …)
  const IDX = {bio: 'selectedBioChapter', chem: 'selectedChemChapter', phys: 'selectedPhysChapter', phy: 'selectedPhysChapter', physics: 'selectedPhysChapter', eng: 'selectedEngChapter', urdu: 'selectedUrduChapter', isl: 'selectedIslChapter', pakstudy: 'selectedPakStudyChapter', pak: 'selectedPakStudyChapter', math: 'selectedMathChapter'};
  function chapterOf() {
    try {
      // app.js keeps its state in a top-level const, which is not a window property
      const s = (typeof state !== 'undefined' && state) || window.state; if (!s) return null;
      const cls = s.selectedClass, subj = s.activeSubject;
      let list = null;
      if (subj === 'math' || (!subj && typeof window.getMathChapterList === 'function')) list = window.getMathChapterList();
      else if (typeof window.getSubjectChapterList === 'function' && subj) list = window.getSubjectChapterList(subj, cls);
      if (!Array.isArray(list) || !list.length) return null;
      const idx = [...new Set([s[IDX[subj]], s.selectedSubjChapter].filter(v => Number.isInteger(v)))];
      // trust a chapter only if its title is on screen (guards against reading another class's book);
      // a title in a heading beats one that is only in the lesson list
      const heads = norm([...document.querySelectorAll('h1, h2, h3')].map(h => h.textContent).join(' | ')).toLowerCase();
      const page = norm(document.body.textContent).toLowerCase();
      const ok = idx.map(i => list[i]).filter(ch => ch && norm(txt(ch.title)));
      const t = ch => norm(txt(ch.title)).toLowerCase().slice(0, 40);
      return ok.find(ch => heads.includes(t(ch))) || (ok.length === 1 && page.includes(t(ok[0])) ? ok[0] : null);
    } catch (e) { return null; }
  }

  // ---------- matching questions to topics ----------
  // word stems: "continuous" / "continuity" and "composite" / "composition" meet on their first six letters
  const stem = w => (lang(w) === 'en' && w.length > 6 ? w.slice(0, 6) : w);
  function profile(info) {
    const tt = [...new Set(content(info.title.replace(/^\s*[\d.]+\s*/, ''), 3).map(stem))];
    const freq = new Map(); content(info.text).map(stem).forEach(w => freq.set(w, (freq.get(w) || 0) + 1));
    const top = new Set([...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40).map(e => e[0]));
    return {tt, top};
  }
  // a title word shared by several topics ("function" in Composite / Inverse / Limit of Function) says nothing about
  // which topic a question belongs to; only a word that names one topic counts as a title match
  // a title word that most of the chapter's questions use anyway ("reaction" in Chemistry) does not point to one topic either
  function distinct(profs, questions) {
    const df = new Map(); profs.forEach(p => p.tt.forEach(w => df.set(w, (df.get(w) || 0) + 1)));
    const qs = (questions || []).map(q => new Set(content(q, 3).map(stem)));
    const common = w => qs.length >= 8 && qs.filter(q => q.has(w)).length > qs.length / 4;
    profs.forEach(p => { p.own = p.tt.filter(w => df.get(w) === 1 && !common(w)); });
  }
  function place(q, profs) {
    if (profs.some(p => !p.own)) distinct(profs);
    const qw = new Set(content(q, 3).map(stem));
    const sc = profs.map(p => {
      const hits = p.own.filter(w => qw.has(w)).length;
      const title = hits ? hits + hits / p.own.length : 0;
      let text = 0; qw.forEach(w => { if (p.top.has(w)) text++; });
      return {title, text, s: 4 * title + Math.min(text, 6)};
    });
    const order = sc.map((x, i) => i).sort((a, b) => sc[b].s - sc[a].s);
    const b = sc[order[0]], r = order.length > 1 ? sc[order[1]] : {s: 0, title: 0};
    if (!b) return -1;
    if (b.title > 0 && b.s - r.s >= 2) return order[0];
    if (b.title === 0 && r.title === 0 && b.text >= 4 && b.s >= 2 * r.s) return order[0];
    return -1;
  }

  // ---------- UI ----------
  function fmt(s) {
    const str = String(s == null ? '' : s);
    const K = window.katex;
    const re = /\\\(([\s\S]+?)\\\)|\\\[([\s\S]+?)\\\]/g;
    let out = '', i = 0, m;
    while ((m = re.exec(str))) {
      out += esc(str.slice(i, m.index));
      const tex = m[1] != null ? m[1] : m[2];
      try { out += K ? K.renderToString(tex, {throwOnError: false, displayMode: m[2] != null}) : esc(m[0]); } catch (e) { out += esc(m[0]); }
      i = re.lastIndex;
    }
    return (out + esc(str.slice(i))).replace(/\n/g, '<br>');
  }
  function itemHtml(it, T) {
    if (it.kind === 'mcq') {
      const keyed = it.a >= 0;
      return `<div class="sb-tp-q"${keyed ? ` data-a="${it.a}"` : ''}><div class="sb-tp-qt">${fmt(it.q)}</div><div class="sb-tp-opts">${it.opts.map((o, i) => keyed ? `<button type="button" class="sb-tp-opt" data-i="${i}">${T.letters[i] || i + 1}) ${fmt(o)}</button>` : `<span class="sb-tp-opt sb-tp-plain">${T.letters[i] || i + 1}) ${fmt(o)}</span>`).join('')}</div><div class="sb-tp-fb"></div>${keyed && it.why ? `<div class="sb-tp-ans sb-tp-why" hidden>${fmt(it.why)}</div>` : ''}</div>`;
    }
    if (it.kind === 'tf') {
      const keyed = it.a === true || it.a === false;
      return `<div class="sb-tp-q"${keyed ? ` data-a="${it.a ? 1 : 0}"` : ''}><div class="sb-tp-qt">${fmt(it.q)}</div>${keyed ? `<div class="sb-tp-opts"><button type="button" class="sb-tp-tf" data-v="1">${T.t}</button><button type="button" class="sb-tp-tf" data-v="0">${T.f}</button></div><div class="sb-tp-fb"></div>` : ''}</div>`;
    }
    return `<div class="sb-tp-q"><div class="sb-tp-qt">${fmt(it.q)}</div>${it.ans ? `<button type="button" class="sb-tp-show">${T.show}</button><div class="sb-tp-ans" hidden>${fmt(it.ans)}</div>` : ''}</div>`;
  }
  const KINDS = ['mcq', 'q', 'sq', 'lq', 'tf', 'bl'];

  function mount(med, set) {
    const T = L[med] || L.en;
    const tabs = [['slo', T.slo, set.slo, set.outcomes], ['ex', T.ex, set.ex, []]].filter(t => t[2].length || t[3].length);
    if (!tabs.length) return null;
    const host = document.createElement('div');
    host.className = 'sb-tp'; host.setAttribute('dir', med === 'en' ? 'ltr' : 'rtl');
    host.innerHTML = `<div class="sb-tp-top">${tabs.map(t => `<button type="button" class="sb-tp-tab" data-t="${t[0]}">${t[1]} (${t[2].length + t[3].length})</button>`).join('')}</div><div class="sb-tp-body" hidden></div>`;
    const body = host.querySelector('.sb-tp-body');
    function show(k) {
      const t = tabs.find(x => x[0] === k); const list = t[2], outs = t[3];
      const kinds = KINDS.filter(x => list.some(i => i.kind === x));
      body.hidden = false;
      body.innerHTML = (outs.length ? `<div class="sb-tp-out"><div class="sb-tp-out-h">${esc(T.outcomes)}</div><ul>${outs.map(o => `<li>${esc(o)}</li>`).join('')}</ul></div>` : '') +
        (kinds.length > 1 ? `<div class="sb-tp-sub">${kinds.map((x, i) => `<button type="button" class="sb-tp-subtab${i ? '' : ' on'}" data-k="${x}">${T[x]} (${list.filter(it => it.kind === x).length})</button>`).join('')}</div>` : (kinds.length ? `<div class="sb-tp-sub"><span class="sb-tp-subtab on">${T[kinds[0]]} (${list.length})</span></div>` : '')) +
        `<div class="sb-tp-list"></div>`;
      const box = body.querySelector('.sb-tp-list');
      const open = x => { box.innerHTML = list.filter(it => it.kind === x).map(it => itemHtml(it, T)).join(''); body.querySelectorAll('button.sb-tp-subtab').forEach(b => b.classList.toggle('on', b.dataset.k === x)); };
      if (kinds.length) open(kinds[0]);
      body.querySelectorAll('button.sb-tp-subtab').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); open(b.dataset.k); }));
      host.querySelectorAll('.sb-tp-tab').forEach(b => b.classList.toggle('on', b.dataset.t === k));
    }
    host.addEventListener('click', e => {
      e.stopPropagation();
      const tab = e.target.closest('.sb-tp-tab');
      if (tab) { if (tab.classList.contains('on')) { body.hidden = true; tab.classList.remove('on'); } else show(tab.dataset.t); return; }
      itemClick(e, T);
    });
    return host;
  }
  // answering an MCQ / true-false, showing a model answer: shared with the per-page tabs (sb_page_tabs.js)
  function itemClick(e, T) {
    {
      const opt = e.target.closest('button.sb-tp-opt');
      if (opt) { const q = opt.closest('[data-a]'); if (!q) return; const a = +q.dataset.a, i = +opt.dataset.i; const btns = q.querySelectorAll('button.sb-tp-opt');
        btns.forEach((b, j) => { b.disabled = true; b.classList.toggle('ok', j === a); b.classList.toggle('bad', j === i && i !== a); });
        q.querySelector('.sb-tp-fb').textContent = i === a ? T.right : T.wrong + btns[a].textContent; const why = q.querySelector('.sb-tp-why'); if (why) why.hidden = false; return; }
      const tf = e.target.closest('.sb-tp-tf');
      if (tf) { const q = tf.closest('[data-a]'); const ok = tf.dataset.v === q.dataset.a;
        q.querySelectorAll('.sb-tp-tf').forEach(b => { b.disabled = true; b.classList.toggle('ok', b.dataset.v === q.dataset.a); b.classList.toggle('bad', b === tf && !ok); });
        q.querySelector('.sb-tp-fb').textContent = ok ? T.right : T.wrong + (q.dataset.a === '1' ? T.t : T.f); return; }
      const sh = e.target.closest('.sb-tp-show');
      if (sh) { const a = sh.parentElement.querySelector('.sb-tp-ans'); a.hidden = !a.hidden; sh.textContent = a.hidden ? T.show : T.hide; }
    }
  }

  // ---------- finding topics ----------
  const CARD = '.math-topic-card, .para-card';
  const owned = c => !!(c.closest && c.closest('[data-sb-pt]'));
  const NOT = '.topic-ex-item, .slo-accordion-card, .slo-question-accordion, .sb-tp, [id^="m11-bank"], .m11-q, .sb-tp-q';
  function topicText(card) {
    const c = card.cloneNode(true);
    c.querySelectorAll('.sb-topic-head, .math-acc-header, .para-card-header, .sb-topic-tools, .sb-tri-drawer, .sb-tp, button, script, style, .katex, svg, details, figcaption, [id^="sent-trans-"], .para-qa-box, .m11-box-t').forEach(x => x.remove());
    return norm(c.textContent);
  }
  // a unit-overview card repeats the chapter title; a real first topic with the same title carries a number badge
  const badgeOf = card => { const h = card.querySelector(':scope > .sb-topic-head, :scope > .math-acc-header, :scope > .para-card-header, .math-acc-header, .para-card-header'); return h ? norm(h.textContent) : ''; };
  function titleOf(card) {
    const h = card.querySelector('.math-acc-header h3, .para-card-header span:last-child, h3, h4, .m11-h3'); return norm(h ? h.textContent : '');
  }
  // the topic's own text from the chapter data (cards are collapsed, so the page shows little of it)
  function dataText(ch, title) {
    const want = norm(title.replace(/🔊/g, '')).toLowerCase(); if (!want) return '';
    let hit = null; const seen = new Set();
    (function find(o, depth) {
      if (hit || !o || typeof o !== 'object' || depth > 6 || seen.has(o)) return; seen.add(o);
      if (Array.isArray(o)) { o.forEach(x => find(x, depth + 1)); return; }
      const t = norm(txt(o.title || o.heading || o.name || '')).toLowerCase();
      if (t && (t === want || t.replace(/^[\d.]+\s*/, '') === want.replace(/^[\d.]+\s*/, ''))) { hit = o; return; }
      Object.keys(o).forEach(k => { if (!EXP.test(k) && !/slo|studyBank|mcq|question/i.test(k)) find(o[k], depth + 1); });
    })(ch, 0);
    if (!hit) return '';
    const parts = []; let n = 0;
    (function grab(o, depth) {
      if (n > 20000 || depth > 6 || o == null) return;
      if (typeof o === 'string') { parts.push(o); n += o.length; return; }
      if (typeof o !== 'object') return;
      (Array.isArray(o) ? o : Object.keys(o).filter(k => !/^(id|src|image|img|url|href|svg|style|class)$/i.test(k)).map(k => o[k])).forEach(x => grab(x, depth + 1));
    })(hit, 0);
    return norm(parts.join(' ').replace(/<[^>]+>/g, ' '));
  }
  // cards that frame a unit rather than teach a topic
  const NOT_TOPIC = /^(unit\s*\d*\s*(opening|introduction|assessment|review)|cover|front matter|contents|student learning outcomes|learning outcomes|unit assessment|glossary|index|سرورق|ابتدائی صفحات|فہرست|تعلیمی نتائج|طلبہ کے حاصلاتِ تعلم)/i;
  let timer = 0;
  function scan() {
    const cards = [...document.querySelectorAll(CARD)].filter(c => !c.dataset.sbTp && !owned(c) && !c.closest('.sb-tp') && !c.matches(NOT) && !c.querySelector(':scope .math-topic-card') && !c.closest('.topic-ex-item, .slo-accordion-card, .slo-question-accordion'));
    if (!cards.length) return;
    cards.forEach(c => { c.dataset.sbTp = '1'; });
    const ch = chapterOf();
    if (!ch) return;
    let med = null; try { med = window.SBMedium && window.SBMedium.mediumNow(); } catch (e) { /* fall back to the text */ }
    const items = collect(ch, med || 'en'), slos = slosOf(ch, med || 'en');
    if (!items.length && !slos.length) return;
    const groups = new Map();
    cards.forEach(c => { const g = c.parentElement; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(c); });
    groups.forEach(list => {
      // "Unit 2 · Functions and Limits", "باب 1: پاکستان کی نظریاتی اساس" — the unit header card, not a topic
      const bare = t => norm(String(t).replace(/🔊/g, '').replace(/^(?:unit|chapter|lesson|باب|سبق|یونٹ)\s*[\d۰-۹]*\s*[:：.\-–—·]?\s*/i, '')).toLowerCase();
      const chTitle = bare(txt(ch.title));
      const infos = list.map(c => { const title = titleOf(c); return {card: c, title, text: dataText(ch, title) || topicText(c)}; })
        .filter(i => i.title && !NOT_TOPIC.test(i.title) && (bare(i.title) !== chTitle || /\d+\.\d+/.test(badgeOf(i.card))));
      if (new Set(infos.map(i => i.title)).size < 2) return;
      const profs = infos.map(profile);
      distinct(profs, items.map(it => it.q));
      const sets = infos.map(() => ({slo: [], ex: [], outcomes: []}));
      items.forEach(it => { const k = place(it.q + ' ' + (it.opts || []).join(' '), profs); if (k >= 0) sets[k][it.ex ? 'ex' : 'slo'].push(it); });
      slos.forEach(s => { const k = place(s, profs); if (k >= 0) sets[k].outcomes.push(s); });
      infos.forEach((inf, k) => {
        const host = mount(med || lang(inf.text), sets[k]);
        if (!host) return;
        (inf.card.querySelector(':scope > .math-accordion-body') || inf.card).appendChild(host);
      });
    });
  }
  const later = () => { if (!timer) timer = setTimeout(() => { timer = 0; try { scan(); } catch (e) { /* never break the page */ } }, 400); };
  function start() {
    const s = document.createElement('style'); s.id = 'sb-tp-css';
    s.textContent = `
    .sb-tp{margin:1rem 0 .3rem;padding-top:.7rem;border-top:1px dashed #cbd5e1;font-size:.95rem;text-align:start}
    .sb-tp-top,.sb-tp-sub{display:flex;gap:.45rem;flex-wrap:wrap;margin-bottom:.6rem}
    .sb-tp-tab,.sb-tp-subtab{border:1px solid #cbd5e1;background:#fff;color:#0f172a;border-radius:999px;padding:.3rem .85rem;font:600 .82rem system-ui,sans-serif;cursor:pointer}
    span.sb-tp-subtab{cursor:default}
    .sb-tp-tab.on{background:#0369a1;border-color:#0369a1;color:#fff}.sb-tp-subtab.on{background:#dcfce7;border-color:#16a34a;color:#166534}
    .sb-tp-q{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:.7rem .9rem;margin:.5rem 0}
    .sb-tp-qt{font-weight:600;line-height:1.7}
    .sb-tp-opts{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.5rem}
    .sb-tp-opt,.sb-tp-tf,.sb-tp-show{border:1px solid #cbd5e1;background:#fff;border-radius:8px;padding:.3rem .7rem;cursor:pointer;font:500 .88rem system-ui,sans-serif}
    .sb-tp-plain{cursor:default}
    .sb-tp-opt.ok,.sb-tp-tf.ok{background:#dcfce7;border-color:#16a34a}.sb-tp-opt.bad,.sb-tp-tf.bad{background:#fee2e2;border-color:#dc2626}
    .sb-tp-fb{margin-top:.4rem;font-weight:600;font-size:.85rem}.sb-tp-ans{margin-top:.5rem;background:#f0fdf4;border-inline-start:3px solid #16a34a;padding:.45rem .7rem;border-radius:6px;line-height:1.75}
    .sb-tp-out{background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:.5rem .8rem;margin-bottom:.6rem}.sb-tp-out-h{font-weight:700;font-size:.85rem;color:#1e3a8a;margin-bottom:.2rem}.sb-tp-out ul{margin:0;padding-inline-start:1.2rem;line-height:1.7}
    .sb-tp-show{margin-top:.5rem}
    `;
    document.head.appendChild(s);
    new MutationObserver(later).observe(document.body, {childList: true, subtree: true});
    later();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.SBTopicPractice = {collect, place, profile, distinct, slosOf, scan, chapterOf, topicText, titleOf, dataText, content, stem, lang, norm, itemHtml, itemClick, fmt, L};
})();
