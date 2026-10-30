/* sb_tutor.js — "Ask SpaceBook": an offline tutor that answers from the project's own books, Classes 1 to 12.
 *
 * It is a search of the books that reads like an answer, not a language model: nothing leaves the page and no network is needed once the files are on the
 * device. For a question it
 *   1. finds the passages of the books that best fit the words of the question (BM25 over content/assistant/<class>.json, the heading counting double),
 *   2. finds the books' own exercise questions that ask the same thing and gives their written answers (content/testbank/<class>.json),
 *   3. for a "what is …" question picks the sentence that defines it; for a word, gives its meaning in English, Urdu, Pashto and Arabic (the offline lexicon),
 *   4. for Class 11 and the older Class 9 to 12 subjects whose text is not in those files, points to the chapters whose text has the words (content/search/),
 *   and shows the answer with where it comes from (class, subject, chapter, page) and a button that opens that chapter. A question in Urdu, Pashto or Arabic is
 *   matched in its own script, and its words are also looked up in the lexicon so the English books can answer it. When nothing fits well it says so.
 * Public: window.renderTutor() (the "Ask" tab), window.SBTutor { ask(q, scope), state }. */
(function () {
  'use strict';
  const S = {cls: 0, subject: '', log: [], busy: false};
  const SHARD = {};            // class -> {assist, bank, idx}  (loaded files and the word index built from them)
  const MAX_CACHED = 3;
  let AIDX = null, BIDX = null, SIDX = null;
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const host = () => document.getElementById('dashboard-body');
  const getJson = u => fetch(u).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  const ARABIC = /[؀-ۿ]/g, LATIN = /[A-Za-z]/g;
  const dirOf = t => { const s = String(t || ''); return (s.match(ARABIC) || []).length > (s.match(LATIN) || []).length ? 'rtl' : 'ltr'; };
  const fmt = t => { try { return window.MATH6_READER ? window.MATH6_READER.inline(String(t == null ? '' : t), false) : esc(t); } catch (e) { return esc(t); } };
  const tick = () => new Promise(r => setTimeout(r, 0));
  const LS = 'sbtutor:v1';
  const readLog = () => { try { return JSON.parse(localStorage.getItem(LS) || '[]'); } catch (e) { return []; } };
  const saveLog = l => { try { localStorage.setItem(LS, JSON.stringify(l.slice(0, 25))); } catch (e) { /* storage blocked */ } };

  // ---------- words ----------
  const STOP = new Set('the and for with are was were been that this these those its not can may will shall has have had does did their they them you your our his her than then there such from which what who whom how why when where also into out all any each one two is it be of in on to a an as at by or if do so me my we i us tell about give explain define meaning mean means describe difference between example examples please kindly know say said called name'.split(' '));
  // function words of Urdu, Pashto and Arabic questions ("what is", "in", "of" ...), folded like the index folds words
  ('کیا ہے ہیں تھا تھی تھے کی کا کے کو میں سے پر نے اور یا یہ وہ اس ان جو کہ بھی تو ہی ایک ہوتا ہوتی ہوتے ہوتی کسے کہتے کون کب کہاں کیوں کیسے کتنے کتنی کتنا مطلب معنی بتائیں بتاؤ تعریف وضاحت بیان کریں لکھیں ' +
   'څه دی دي ده د په له ته کې او یا چې هغه دا یو ډول وایي څنګه ولې څوک چیرته کله مطلب معنی تعریف ' +
   'ما هو هي هذا هذه في من على إلى الى عن و ال').split(' ').forEach(w => STOP.add(w));
  const tokensOf = text => { const S2 = window.SBSearch; const base = S2 && S2.tokens ? S2.tokens(text) : String(text).toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(w => w.length > 1); return base; };
  let STOPN = null;
  const stopSet = () => { if (!STOPN) { STOPN = new Set(); STOP.forEach(w => { STOPN.add(w); tokensOf(w).forEach(t => STOPN.add(t)); }); } return STOPN; };
  const contentTokens = text => { const st = stopSet(); return tokensOf(text).filter(w => !st.has(w) && !/^\d$/.test(w)); };

  // ---------- the lexicon: word meanings and a way from Urdu / Pashto / Arabic words to English ones ----------
  let LEX = null;
  function lexicon() {
    if (LEX) return LEX;
    const rows = (window.SB_LEXICON_V1 && window.SB_LEXICON_V1.rows) || [];
    const en = new Map(), foreign = new Map();
    const norm = window.SBSearch && window.SBSearch.normalize ? window.SBSearch.normalize : (s => String(s).toLowerCase());
    rows.forEach(r => {
      const w = String(r[0] || '').toLowerCase().trim(); if (!w) return;
      if (!en.has(w)) en.set(w, r);
      for (let c = 1; c <= 3; c++) {
        String(r[c] || '').split(/[،,;؛()\/]|\s{2,}/).forEach(v => {
          const k = norm(v).replace(/[^\p{L}\p{N} ]+/gu, '').trim();
          if (k.length >= 2 && k.length <= 24) { let a = foreign.get(k); if (!a) foreign.set(k, a = new Set()); if (a.size < 4) a.add(w); }
        });
      }
    });
    LEX = {en, foreign, norm};
    return LEX;
  }
  function meaningOf(word) {
    const L = lexicon(), w = String(word || '').toLowerCase().trim();
    if (L.en.has(w)) return L.en.get(w);
    const st = window.SBSearch ? window.SBSearch.stem(w) : w;
    for (const [k, v] of L.en) if (k === st) return v;
    const k = L.norm(w).replace(/[^\p{L}\p{N} ]+/gu, '').trim();
    const f = L.foreign.get(k);
    if (f) { const first = [...f][0]; return L.en.get(first) || null; }
    return null;
  }
  // an Urdu / Pashto / Arabic question: also the English words its words mean
  function englishFor(tokens) {
    const L = lexicon(), out = new Set();
    tokens.forEach(t => { if (/[؀-ۿ]/.test(t)) { const f = L.foreign.get(t); if (f) f.forEach(w => { if (!STOP.has(w) && /^[a-z]+$/.test(w)) out.add(window.SBSearch.stem(w)); }); } });
    return [...out];
  }

  // ---------- a class: passages and questions, with a word index ----------
  async function buildIndex(items, textOf, headOf) {
    const post = new Map(), len = [];
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      const toks = tokensOf(textOf(items[i]));
      const head = headOf ? tokensOf(headOf(items[i])) : [];
      const counts = new Map();
      toks.forEach(t => counts.set(t, (counts.get(t) || 0) + 1));
      head.forEach(t => counts.set(t, (counts.get(t) || 0) + 2));
      len.push(toks.length + head.length * 2); total += len[i];
      counts.forEach((c, t) => { let a = post.get(t); if (!a) post.set(t, a = []); a.push(i, c); });
      if (i % 3000 === 2999) await tick();
    }
    return {post, len, avg: total / Math.max(1, items.length), n: items.length};
  }
  function bm25(idx, qTokens, weightOf, allow) {
    const scores = new Map(), k1 = 1.2, b = 0.75;
    qTokens.forEach(t => {
      const p = idx.post.get(t); if (!p) return;
      const df = p.length / 2, idf = Math.log(1 + (idx.n - df + 0.5) / (df + 0.5)), w = weightOf ? weightOf(t) : 1;
      for (let k = 0; k < p.length; k += 2) {
        const i = p[k]; if (allow && !allow(i)) continue;
        const tf = p[k + 1], norm = tf * (k1 + 1) / (tf + k1 * (1 - b + b * idx.len[i] / idx.avg));
        scores.set(i, (scores.get(i) || 0) + idf * norm * w);
      }
    });
    return scores;
  }
  async function loadClass(n, progress) {
    if (SHARD[n] && SHARD[n].idx) { SHARD[n].t = Date.now(); return SHARD[n]; }
    if (!AIDX) AIDX = await getJson('content/assistant/index.json');
    if (!BIDX) BIDX = await getJson('content/testbank/index.json');
    const rec = SHARD[n] = SHARD[n] || {};
    const a = AIDX.classes[n], b = BIDX.classes[n];
    if (a) { if (progress) progress('Loading the books of class ' + n + '…'); rec.assist = await getJson('content/assistant/' + a.file + '?v=' + a.h); }
    if (b) { if (progress) progress('Loading the questions of class ' + n + '…'); rec.bank = await getJson('content/testbank/' + b.file + '?v=' + b.h); }
    if (progress) progress('Preparing class ' + n + '…');
    rec.pIdx = rec.assist ? await buildIndex(rec.assist.p, p => p[3], p => p[2]) : null;
    rec.qItems = rec.bank ? rec.bank.items.filter(it => it.a !== undefined && it.y !== 'task') : [];
    rec.qIdx = rec.qItems.length ? await buildIndex(rec.qItems, it => it.q + ' ' + (it.y === 'mcq' ? it.o.join(' ') : ''), null) : null;
    rec.idx = true; rec.t = Date.now();
    // keep only the most recent few classes in memory
    const live = Object.keys(SHARD).filter(k => SHARD[k].idx).sort((x, y) => SHARD[y].t - SHARD[x].t);
    live.slice(MAX_CACHED).forEach(k => { SHARD[k] = {}; });
    return rec;
  }

  // ---------- one question ----------
  const DEF_Q = /^\s*(what\s+(is|are|was|were)|what's|define|definition of|meaning of|what do you mean by|what does .* mean|explain|describe|tell me about)\b/i;
  const DEF_UR = /(کیا ہے|کیا ہوتا ہے|کیا ہیں|کسے کہتے ہیں|تعریف|مطلب|معنی|وضاحت)/;
  const DEF_PS = /(څه دی|څه ته وایي|تعریف|مطلب|معنی)/;
  function sentencesOf(text) { return String(text).split(/(?<=[.!?؟۔])\s+|\s+•\s+/).map(s => s.trim()).filter(s => s.length > 12); }
  function bestSentences(passages, qTokens, n) {
    const set = new Set(qTokens), out = [];
    passages.forEach(p => sentencesOf(p.text).forEach(s => {
      const toks = new Set(tokensOf(s)); let hit = 0; set.forEach(t => { if (toks.has(t)) hit++; });
      if (hit) out.push({s, p, sc: hit / Math.sqrt(toks.size + 4) + hit * 0.2});
    }));
    return out.sort((a, b) => b.sc - a.sc).slice(0, n);
  }
  // a sentence that defines the term: it starts with it (within its first few words) and goes on "is a / is the / is called / means / refers to / :"
  function definition(passages, term) {
    const t = term.trim().replace(/^(?:the|an?)\s+/i, ''); if (t.length < 2) return null;
    const esc2 = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rx = new RegExp('^(?:\\S+\\s+){0,5}?' + esc2 + '(?:s|es)?\\b[^.!?:]{0,50}?(?:\\s(?:is|are)\\s+(?:the|a|an|called|defined|known|said|one|when|where|that|any|any of|made|formed|process|what)\\b|\\s(?:means|refers to|can be defined as|is defined as)\\b|\\s*:\\s)', 'i');
    for (const p of passages) for (const s of sentencesOf(p.text)) if (rx.test(s) && s.length < 380 && !/\b(given below|shown (below|in)|as follows)\b/i.test(s)) return {s, p};
    return null;
  }

  async function answer(q, progress) {
    const text = String(q || '').trim(); if (!text) return null;
    const foreign = dirOf(text) === 'rtl';
    let toks = contentTokens(text);
    const extra = foreign ? englishFor(toks) : [];
    const weight = t => extra.includes(t) ? 0.8 : 1;
    const qTokens = [...new Set(toks.concat(extra))];
    const result = {q: text, foreign, passages: [], questions: [], chapters: [], meaning: null, definition: null, direct: null, scope: S.cls ? 'Class ' + S.cls : 'all classes'};
    if (!qTokens.length) return result;
    // the scope: a class, or all of them one after the other
    if (!AIDX) AIDX = await getJson('content/assistant/index.json');
    if (!BIDX) BIDX = await getJson('content/testbank/index.json');
    const classes = S.cls ? [S.cls] : Object.keys(AIDX.classes).map(Number).sort((a, b) => a - b);
    result.scope = S.cls ? 'Class ' + S.cls + (S.subject ? ', ' + S.subject : '') : 'all classes';
    const pBest = [], qBest = [];
    let done = 0;
    for (const n of classes) {
      if (progress && classes.length > 1) progress('Looking in class ' + n + ' (' + (++done) + ' of ' + classes.length + ')…');
      let rec;
      try { rec = await loadClass(n, progress); } catch (e) { continue; }
      if (rec.pIdx) {
        const allow = S.subject ? (i => rec.assist.s[rec.assist.p[i][0]] === S.subject) : null;
        const sc = bm25(rec.pIdx, qTokens, weight, allow);
        [...sc.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).forEach(([i, s]) => {
          const p = rec.assist.p[i], sid = rec.assist.s[p[0]], sj = rec.assist.subjects[sid];
          pBest.push({score: s, text: p[3], head: p[2], sid, subject: sj.name, cls: n, u: p[1], chapter: (sj.chapters[p[1]] || {}).t || '', call: (sj.chapters[p[1]] || {}).o || ''});
        });
      }
      if (rec.qIdx) {
        const allow = S.subject ? (i => rec.qItems[i].s === S.subject) : null;
        const sc = bm25(rec.qIdx, qTokens, weight, allow);
        [...sc.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([i, s]) => { const it = rec.qItems[i]; const sj = rec.bank.subjects[it.s]; qBest.push({score: s, it, cls: n, subject: sj ? sj.name : it.s, chapter: it.u >= 0 && sj ? String(sj.chapters[it.u] || '').slice(0, 70) : ''}); });
      }
      await tick();
    }
    const ranked = pBest.sort((a, b) => b.score - a.score);
    result.passages = ranked.slice(0, 6);
    // the books' own questions that ask the same thing: most of the question's words are in the asked words and the other way round
    const qSim = x => {
      const stem = new Set(contentTokens(x.it.q)); if (!stem.size) return 0;
      const both = toks.filter(t => stem.has(t)).length;
      return both / Math.max(stem.size, toks.length);
    };
    result.questions = qBest.map(x => Object.assign(x, {sim: qSim(x)})).filter(x => x.sim >= 0.5).sort((a, b) => b.sim - a.sim || b.score - a.score).slice(0, 3);
    // chapters: the books' passages gathered by chapter, best first
    const byCh = new Map();
    result.passages.forEach(p => { const k = p.sid + '|' + p.u; const c = byCh.get(k) || {sid: p.sid, cls: p.cls, subject: p.subject, chapter: p.chapter, call: p.call, score: 0}; c.score += p.score; byCh.set(k, c); });
    result.chapters = [...byCh.values()].sort((a, b) => b.score - a.score).slice(0, 3);
    // Class 11 and the subjects whose text is not in the passage files: chapters from the search index
    if (!S.cls || S.cls === 11) {
      try { const more = await searchChapters(qTokens, S.cls === 11 ? 11 : 0); more.forEach(m => result.chapters.push(m)); } catch (e) { /* the index is not there: the other answers stand */ }
    }
    // what kind of question: "what is X" (a definition), a word (its meaning), anything else
    const asDef = DEF_Q.test(text) || (foreign && (DEF_UR.test(text) || DEF_PS.test(text)));
    let term = text.replace(DEF_Q, '').replace(/[?؟.!]+$/g, '').replace(/^(the|an?)\s+/i, '').trim();
    if (foreign) term = term.replace(DEF_UR, '').replace(DEF_PS, '').replace(/[؟?]/g, '').trim();
    const asMeaning0 = (toks.length === 1 && !asDef) || /^(what is the )?meaning of\s/i.test(text) || /^what does \S+ mean/i.test(text);
    if (asDef && term && !foreign && !asMeaning0) {
      const pool = ranked.slice(0, 40).map(p => ({text: p.text, p}));
      const d = definition(pool, term) || definition(pool, term.split(/\s+/).slice(-2).join(' '));
      if (d) result.definition = {s: d.s, p: d.p.p};
    }
    // a single word (or "meaning of X") gets the lexicon's meaning; for "what is X" the meaning card comes with the definition
    const showMeaning = toks.length === 1 || /^(what is the )?meaning of\s/i.test(text) || /^what does \S+ mean/i.test(text) || (foreign && toks.length <= 2);
    if (showMeaning) { const w = foreign ? toks[0] : (toks[toks.length - 1] || ''); const m = meaningOf(w); if (m) { result.meaning = m; result.asMeaning = asMeaning0; } }
    // the direct answer: a defining sentence; else the written answer of a book question that asks the same (not a multiple-choice one unless it is the same); else the best sentences
    const qa = result.questions.find(x => x.it.y !== 'mcq' && x.sim >= 0.6) || result.questions.find(x => x.sim >= 0.8);
    if (result.definition) result.direct = {kind: 'definition', d: result.definition};
    else if (qa && qa.it.a !== undefined) result.direct = {kind: 'question', qa};
    else if (result.meaning && result.asMeaning) result.direct = null;
    else if (result.passages.length && toks.length > 1) { const sents = bestSentences(result.passages, qTokens, 2); if (sents.length && result.passages[0].score >= 2.5) result.direct = {kind: 'sentences', sents}; }
    return result;
  }

  // chapter-level search over the search index files (every word of the question counts, a chapter with more of them ranks higher)
  async function searchChapters(qTokens, onlyClass) {
    if (!SIDX) SIDX = await getJson('content/search/index.json');
    const ids = Object.keys(SIDX.subjects).filter(id => { const s = SIDX.subjects[id]; const n = +String(s.classId).replace('cls', ''); return onlyClass ? n === onlyClass : n === 11 || !AIDX.subjects[id]; });
    const out = [];
    for (const id of ids) {
      const meta = SIDX.subjects[id];
      let shard; try { shard = await getJson('content/search/' + id + '.json?v=' + meta.h); } catch (e) { continue; }
      const per = new Map();
      const matched = new Map();
      qTokens.forEach(t => { const p = shard.x[t]; if (!p) return; const idf = Math.log(1 + meta.n / (p.length / 2)); for (let k = 0; k < p.length; k += 2) { per.set(p[k], (per.get(p[k]) || 0) + idf * Math.log2(1 + p[k + 1])); matched.set(p[k], (matched.get(p[k]) || 0) + 1); } });
      const need = Math.max(1, Math.ceil(qTokens.length * 0.7));
      [...per.entries()].filter(([ch]) => matched.get(ch) >= need).sort((a, b) => b[1] - a[1]).slice(0, 2).forEach(([ch, sc]) => { const c = meta.c[ch]; if (c && sc > 2) out.push({sid: id, cls: +String(meta.classId).replace('cls', ''), subject: meta.name, chapter: String(c.t || '').slice(0, 90), call: c.o, score: sc, fromIndex: true}); });
      await tick();
    }
    return out.sort((a, b) => b.score - a.score).slice(0, 3);
  }

  // ---------- an exercise asked by number ("maths 11 exercise 3.5 question 3"): looked up in the Class 11 Maths book, with its written answer and steps ----------
  let M11 = null;
  const loadScript = src => new Promise((res, rej) => { const e = document.createElement('script'); e.src = src; e.onload = res; e.onerror = () => rej(new Error('load ' + src)); document.head.appendChild(e); });
  async function math11() {
    if (M11) return M11;
    if (typeof MATH_11_DATA === 'undefined') await loadScript('js/math_11_data.js');
    if (!window.MATH_11_SOLUTIONS && !window.SBHost && !document.documentElement.classList.contains('sbapp')) { try { await loadScript('js/math_11_solutions.js'); } catch (e) { /* the book's own answers still show */ } }
    M11 = MATH_11_DATA; return M11;
  }
  // the numbers in a question; typos in the words around them do not matter ("exersice", "qustion", "mathes")
  function exerciseRef(text) {
    const t = String(text || '').toLowerCase();
    const ex = /\b(?:ex\w*|exc\w*|review)\.?\s*(?:no\.?\s*)?(\d{1,2}(?:\.\d{1,2})?)/.exec(t);
    if (!ex) return null;
    const q = /\b(?:q\w*|no|number|sawal|sawaal)\.?\s*(?:no\.?\s*)?(\d{1,2})\b/.exec(t.replace(ex[0], ' '));
    const cls = /\b(?:class|grade|cls)\s*(\d{1,2})\b/.exec(t) || /\bmath\w*\s*(\d{1,2})\b/.exec(t) || /\b(\d{1,2})(?:th|st|nd|rd)?\s*(?:class|grade)?\s*math\w*/.exec(t);
    const part = /\b(?:option|part|item|sub\s?part)\s*\(?([a-h]|iv|vi{0,3}|i{1,3})\)?(?![a-z])/.exec(t);
    return {exercise: /review/.test(ex[0]) ? 'Review ' + ex[1] : ex[1], q: q ? q[1] : '', part: part ? part[1] : '', cls: cls ? +cls[1] : 0, maths: /math|ریاضی|حساب/.test(t)};
  }
  // an exercise of Classes 1-10 and 12: its questions are in the question bank (content/testbank) with the exercise number, so "class 6 maths exercise 3.7 question 6 option e" is a lookup
  const PARTS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'];
  async function lookupBank(ref, n) {
    let rec; try { rec = await loadClass(n); } catch (e) { return null; }
    if (!rec || !rec.bank) return null;
    const subs = rec.bank.subjects, want = ref.exercise.toLowerCase();
    const inScope = it => (!S.subject || it.s === S.subject) && (!ref.maths || /math/i.test((subs[it.s] || {}).name || ''));
    const all = rec.bank.items.filter(it => String(it.x || '').toLowerCase() === want && inScope(it));
    if (!all.length) return {missing: true, ref, cls: n, none: true};
    const bySub = all[0].s, rows = all.filter(it => it.s === bySub);
    const sj = subs[bySub] || {}, chapter = String(((sj.chapters || [])[rows[0].u]) || '').replace(/[؀-ۿ].*$/, '').trim();
    const groups = new Map(); rows.forEach(it => { const k = it.p; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(it); });
    const ans = it => it.y === 'mcq' ? 'ABCDE'[it.a] + '. ' + (it.o || [])[it.a] : it.y === 'tf' ? (it.a === 0 ? 'True' : 'False') : String(it.a == null ? '' : it.a);
    const shape = (it, label, k) => ({no: label, en: (it.h && it.h !== it.q ? it.h + ' ' : '') + (it.y === 'mcq' ? it.q + ' ' + (it.o || []).map((o, i) => 'ABCDE'[i] + '. ' + o).join('  ') : it.q), answer: ans(it), sol: it.e ? {steps: [{en: it.e}]} : null, parts: [], pg: it.pg});
    let items, whole = false;
    const letter = ref.part ? ref.part.toLowerCase() : '';
    const pi = letter ? (PARTS.indexOf(letter) >= 0 && letter.length === 1 ? PARTS.indexOf(letter) : ROMAN.indexOf(letter)) : -1;
    if (ref.q && groups.has(+ref.q)) {
      const g = groups.get(+ref.q);
      if (pi >= 0 && g[pi]) items = [shape(g[pi], ref.q + ' (' + letter + ')')];
      else if (pi >= 0) return {missing: true, ref, cls: n, count: g.length, partMissing: true};
      else items = g.length === 1 ? [shape(g[0], ref.q)] : g.map((it, i) => shape(it, ref.q + ' (' + PARTS[i] + ')'));
    } else if (ref.q) {
      return {missing: true, ref, cls: n, count: groups.size, keys: [...groups.keys()].filter(k => k > 0).sort((a, b) => a - b)};
    } else if (pi >= 0) {
      items = []; [...groups.entries()].sort((a, b) => a[0] - b[0]).forEach(([k, g]) => { if (g.length > 1 && g[pi]) items.push(shape(g[pi], k + ' (' + letter + ')')); });
      if (!items.length) return {missing: true, ref, cls: n, count: groups.size, partMissing: true};
    } else { whole = true; items = []; [...groups.entries()].sort((a, b) => a[0] - b[0]).slice(0, 8).forEach(([k, g]) => g.slice(0, 3).forEach((it, i) => items.push(shape(it, k + (g.length > 1 ? ' (' + PARTS[i] + ')' : ''))))); }
    return {ref, cls: n, title: 'Class ' + n + ' ' + (sj.name || ''), unit: chapter, items, whole, count: groups.size, pg: rows[0].pg};
  }
  async function lookupExercise(ref) {
    if (!ref || !ref.exercise) return null;
    const cn = ref.cls || S.cls || 0;
    if (cn !== 11 || !ref.maths) return cn ? await lookupBank(ref, cn) : null;
    const data = await math11();
    const found = [];
    const walk = (bs, u) => bs.forEach(b => { if (b && b.t === 'exercise' && String(b.id).toLowerCase() === ref.exercise.toLowerCase()) found.push({b, u}); if (b && Array.isArray(b.blocks)) walk(b.blocks, u); });
    data.forEach(u => (u.sections || []).forEach(sec => walk(sec.blocks || [], u)));
    if (!found.length) return {missing: true, ref};
    const qs = []; found.forEach(f => (f.b.blocks || []).forEach(q => { if (q && q.t === 'q') qs.push({q, u: f.u}); }));
    const pick = ref.q ? qs.filter(x => String(x.q.no) === ref.q) : [];
    if (ref.q && !pick.length) return {missing: true, ref, count: qs.length};
    const sol = id => (window.MATH_11_SOLUTIONS && id && window.MATH_11_SOLUTIONS[id]) || null;
    const shape = x => ({no: x.q.no, en: x.q.en || '', answer: x.q.authoredAnswer ? x.q.authoredAnswer.en : '', sol: sol(x.q.solId),
      parts: (x.q.parts || []).map(p => ({no: p.no, en: p.en || '', answer: p.authoredAnswer ? p.authoredAnswer.en : '', sol: sol(p.solId)}))});
    return {ref, unit: found[0].u.title, items: (pick.length ? pick : qs.slice(0, 12)).map(shape), whole: !pick.length, count: qs.length};
  }
  const stepsText = sol => sol && sol.steps ? sol.steps.map((st, i) => (i + 1) + '. ' + (st.en || '')).join(' ') : '';
  const exerciseSources = ex => !ex || ex.missing ? [] : ex.items.map(it => ({w: (ex.title || 'Class 11 Mathematics') + ', Exercise ' + ex.ref.exercise + ', question ' + it.no + ' (' + ex.unit + ')',
    t: ('Question: ' + it.en + (it.parts.length ? ' ' + it.parts.map(p => p.no + ' ' + p.en).join(' ') : '') + ' | Answer: ' + (it.answer || it.parts.map(p => p.no + ' ' + p.answer).join('; ')) + (it.sol ? ' | Steps: ' + stepsText(it.sol) : '') + it.parts.map(p => p.sol ? ' | ' + p.no + ' steps: ' + stepsText(p.sol) : '').join('')).slice(0, 1400)}));
  // the AI reads what was typed, mends the spelling and says which exercise and question it means (api/ask.php?action=understand)
  async function understand(text) {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return null;
    const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null, timer = ctl ? setTimeout(() => ctl.abort(), 9000) : null;
    try {
      const res = await fetch('api/ask.php?action=understand', {method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'}, signal: ctl ? ctl.signal : undefined, body: JSON.stringify({q: text})});
      const j = await res.json();
      return j && j.ok ? j : null;
    } catch (e) { return null; } finally { if (timer) clearTimeout(timer); }
  }

  // ---------- the AI answer: the best passages found on the device go to api/ask.php, which asks the model to answer only from them ----------
  const sourcesOf = r => {
    const out = [];
    const add = (t, w) => { t = String(t == null ? '' : t).trim(); if (t) out.push({t: t.slice(0, 1400), w}); };
    exerciseSources(r.exercise).forEach(x => add(x.t, x.w));
    if (r.definition) add(r.definition.s, where0(r.definition.p));
    (r.questions || []).forEach(x => { const it = x.it; if (it.a === undefined) return; const ans = it.y === 'mcq' ? 'ABCDE'[it.a] + '. ' + it.o[it.a] : it.y === 'tf' ? (it.a === 0 ? 'True' : 'False') : it.a; add('Textbook question: ' + it.q + ' | Written answer: ' + ans, where0(x)); });
    (r.passages || []).slice(0, 5).forEach(p => add(p.text, where0(p) + (p.head ? ' · ' + p.head : '')));
    return out;
  };
  const where0 = o => 'Class ' + o.cls + ', ' + o.subject + (o.chapter ? ', ' + o.chapter : '');
  async function askAI(entry, hist) {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return null;
    let src = sourcesOf(entry.r);
    if (entry.r.followup) { const prev = [...S.log].reverse().find(e => e !== entry && e.r && e.r.src && e.r.src.length); if (prev) src = prev.r.src; }
    entry.r.src = src;
    const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null, timer = ctl ? setTimeout(() => ctl.abort(), 30000) : null;
    try {
      const res = await fetch('api/ask.php', {method: 'POST', credentials: 'same-origin', headers: {'Content-Type': 'application/json'}, signal: ctl ? ctl.signal : undefined,
        body: JSON.stringify({q: entry.r.fixed || entry.q, sources: src, history: hist})});
      const j = await res.json();
      return j && j.ok && j.answer ? String(j.answer) : null;
    } catch (e) { return null; } finally { if (timer) clearTimeout(timer); }
  }

  // ---------- the page ----------
  const CSS = `
  .sbtu{max-width:900px;margin:0 auto;padding:.4rem .2rem 6rem;color:#0f172a}
  .sbtu-hero{background:linear-gradient(135deg,#7c2d12,#be185d);color:#fff;border-radius:16px;padding:1rem 1.2rem;margin-bottom:.8rem}
  .sbtu-hero h2{margin:0 0 .25rem;color:#fff;font-size:1.25rem}.sbtu-hero p{margin:0;font-size:.92rem;opacity:.96}
  .sbtu-bar{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin:.4rem 0}
  .sbtu-bar select{padding:.4rem .6rem;border:1px solid #94a3b8;border-radius:8px;font:inherit;background:#fff;color:#0f172a;max-width:100%}
  .sbtu-chips{display:flex;flex-wrap:wrap;gap:.4rem;margin:.4rem 0}
  .sbtu-chip{padding:.3rem .75rem;border:1px solid #be185d;border-radius:999px;background:#fdf2f8;color:#831843;font:600 .85rem system-ui,sans-serif;cursor:pointer}
  .sbtu-chip:hover,.sbtu-chip:focus-visible{background:#fce7f3;outline:2px solid #f9a8d4;outline-offset:1px}
  .sbtu-log{display:grid;gap:.8rem;margin:.8rem 0}
  .sbtu-q{justify-self:end;max-width:92%;background:#1e3a8a;color:#fff;border-radius:14px 14px 4px 14px;padding:.5rem .9rem}
  .sbtu-a{background:#fff;border:1px solid #cbd5e1;border-radius:14px 14px 14px 4px;padding:.7rem .9rem}
  .sbtu-a h4{margin:.6rem 0 .25rem;font-size:.85rem;text-transform:uppercase;letter-spacing:.04em;color:#9d174d}
  .sbtu-direct{padding:.6rem .8rem;border-inline-start:5px solid #16a34a;background:#f0fdf4;border-radius:8px;font-size:1.02rem;line-height:1.7}
  .sbtu-src{font-size:.78rem;color:#475569;margin-top:.25rem}
  .sbtu-p{border-top:1px solid #f1f5f9;padding:.45rem 0;font-size:.93rem;line-height:1.65}
  .sbtu-p mark{background:#fde68a;color:#451a03;border-radius:3px;padding:0 .1em}
  .sbtu-btn{margin-inline-start:.4rem;padding:.15rem .65rem;border:1px solid #059669;border-radius:999px;background:#ecfdf5;color:#065f46;font:700 .75rem system-ui,sans-serif;cursor:pointer}
  .sbtu-btn.alt{border-color:#1d4ed8;background:#eff6ff;color:#1e3a8a}
  .sbtu-mean{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.4rem}.sbtu-mean div{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:.35rem .6rem}.sbtu-mean b{display:block;font-size:.72rem;color:#64748b;text-transform:uppercase}
  .sbtu-warn{padding:.5rem .8rem;border-radius:10px;background:#fef3c7;color:#451a03;font-size:.92rem}
  .sbtu-input{position:sticky;bottom:0;display:flex;gap:.5rem;padding:.6rem 0;background:linear-gradient(transparent,#f8fafc 30%)}
  .sbtu-input textarea{flex:1;min-height:2.6rem;max-height:7rem;padding:.5rem .7rem;border:2px solid #94a3b8;border-radius:12px;font:inherit;resize:vertical}
  .sbtu-input button{padding:.5rem 1.1rem;border:none;border-radius:12px;background:#be185d;color:#fff;font:800 .95rem system-ui,sans-serif;cursor:pointer}
  .sbtu-input button:disabled{opacity:.5}
  .sbtu-opt{display:flex;gap:.45rem;padding:.25rem .5rem;border:1px solid #cbd5e1;border-radius:8px;margin:.15rem 0;cursor:pointer}.sbtu-opt.ok{background:#dcfce7;border-color:#16a34a}.sbtu-opt.bad{background:#fee2e2;border-color:#dc2626}
  .sbtu-prog{font-size:.85rem;color:#475569;font-style:italic}
  .sbtu{max-width:900px;margin:0 auto;display:flex;flex-direction:column;min-height:calc(100vh - 220px);padding:0 .2rem 5.5rem}
  .sbtu-top{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;padding:.6rem .2rem;border-bottom:1px solid #e2e8f0}
  .sbtu-av{width:2.4rem;height:2.4rem;border-radius:12px;background:linear-gradient(135deg,#1d4ed8,#7c3aed);display:grid;place-items:center;font-size:1.3rem}
  .sbtu-tt{display:grid;line-height:1.15;margin-inline-end:auto}.sbtu-tt b{letter-spacing:.04em;color:#0f172a}.sbtu-tt small{color:#64748b}
  .sbtu-live{font:800 .68rem system-ui,sans-serif;padding:.15rem .5rem;border-radius:999px;background:#e2e8f0;color:#475569}.sbtu-live.on{background:#dcfce7;color:#166534}.sbtu-live.off{background:#fef3c7;color:#92400e}
  .sbtu-sel{display:flex;align-items:center;gap:.3rem;font-size:.85rem;color:#475569}.sbtu-sel select,.sbtu-sel2{padding:.3rem .5rem;border:1px solid #cbd5e1;border-radius:8px;font:inherit;background:#fff;color:#0f172a;max-width:100%}
  .sbtu-welcome{text-align:center;padding:1.6rem .6rem 1rem}.sbtu.has-log .sbtu-welcome{display:none}
  .sbtu-spark{width:5rem;height:5rem;margin:0 auto .6rem;border-radius:20px;background:linear-gradient(135deg,#2563eb,#06b6d4);color:#fff;display:grid;place-items:center;font-size:2.4rem;box-shadow:0 10px 24px rgba(37,99,235,.3)}
  .sbtu-welcome h2{margin:.2rem 0;font-size:1.6rem;color:#0f172a}.sbtu-welcome p{margin:.3rem auto 1rem;max-width:620px;color:#475569;line-height:1.6}
  .sbtu-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:.6rem;text-align:start}
  .sbtu-card{padding:.9rem 1rem;border:1px solid #cbd5e1;border-radius:12px;background:#fff;color:#0f172a;font:600 .95rem system-ui,sans-serif;cursor:pointer;text-align:center}
  .sbtu-card:hover,.sbtu-card:focus-visible{border-color:#2563eb;background:#eff6ff;outline:none}
  .sbtu-log{display:grid;gap:.8rem;margin:.8rem 0;flex:1}
  .sbtu-q{justify-self:end;max-width:92%;background:#2563eb;color:#fff;border-radius:16px 16px 4px 16px;padding:.55rem .95rem}
  .sbtu-a{background:#fff;border:1px solid #cbd5e1;border-radius:16px 16px 16px 4px;padding:.75rem .95rem;box-shadow:0 1px 3px rgba(15,23,42,.06)}
  .sbtu-ai{font-size:1.02rem;line-height:1.75}.sbtu-ai div{margin:.2rem 0}
  .sbtu-dots i{display:inline-block;width:.45rem;height:.45rem;margin-inline-end:.2rem;border-radius:50%;background:#2563eb;animation:sbtud 1s infinite ease-in-out}.sbtu-dots i:nth-child(2){animation-delay:.15s}.sbtu-dots i:nth-child(3){animation-delay:.3s}
  @keyframes sbtud{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}
  .sbtu-input{position:sticky;bottom:0;display:flex;align-items:flex-end;gap:.5rem;padding:.6rem 0 .2rem;background:linear-gradient(transparent,#f8fafc 28%)}
  .sbtu-input textarea{flex:1;min-height:2.8rem;max-height:7rem;padding:.65rem .9rem;border:2px solid #94a3b8;border-radius:16px;font:inherit;resize:none;background:#fff;color:#0f172a}.sbtu-input textarea:focus{border-color:#2563eb;outline:none}
  .sbtu-mic,.sbtu-send{width:2.9rem;height:2.9rem;border-radius:50%;border:1px solid #cbd5e1;background:#fff;font-size:1.15rem;cursor:pointer}.sbtu-send{border:none;background:#2563eb;color:#fff}.sbtu-mic.rec{background:#fee2e2;border-color:#dc2626;animation:sbtud 1s infinite}
  .sbtu-foot{text-align:center;font-size:.75rem;color:#64748b}
`;
  function addCss() { if (document.getElementById('sbtu-css')) return; const s = document.createElement('style'); s.id = 'sbtu-css'; s.textContent = CSS; document.head.appendChild(s); }

  const highlight = (text, tokens) => {
    const safe = esc(text);
    if (!tokens.length) return safe;
    const set = new Set(tokens);
    return safe.replace(/[\p{L}\p{N}]+/gu, w => set.has(tokensOf(w)[0]) ? '<mark>' + w + '</mark>' : w);
  };
  // the AI's text: lines, **bold**, and formulas in $...$ drawn like the books' own (\[..\] and \(..\) are turned into $..$ first)
  const aiHtml = t => String(t).replace(/\\\[([\s\S]*?)\\\]/g, (m, x) => '$' + x.trim() + '$').replace(/\\\(([\s\S]*?)\\\)/g, (m, x) => '$' + x.trim() + '$')
    .replace(/\$[^$]*\$/g, m => m.replace(/\s*\n\s*/g, ' ')).split(/\n+/).filter(l => l.trim()).map(l => '<div>' + fmt(l.replace(/^#+\s*/, '')).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>') + '</div>').join('');
  const where = o => 'Class ' + o.cls + ' · ' + esc(o.subject) + (o.chapter ? ' · ' + esc(o.chapter) : '');
  function answerHtml(r, idx) {
    const toks = contentTokens(r.q);
    let h = '';
    if (r.ai) h += '<h4>🤖 SpaceBook AI</h4><div class="sbtu-direct sbtu-ai" dir="' + dirOf(r.ai) + '">' + aiHtml(r.ai) + '</div>';
    if (r.exercise) {
      const ex = r.exercise;
      if (ex.missing) h += '<div class="sbtu-warn">I could not find ' + (ex.partMissing ? 'that part of question ' + esc(ex.ref.q) + ' in ' : ex.count && ex.ref.q ? 'question ' + esc(ex.ref.q) + ' in ' : '') + 'Exercise ' + esc(ex.ref.exercise) + ' of ' + (ex.cls ? 'Class ' + ex.cls : 'Class 11 Mathematics') + (ex.none ? ' in the books I have' : '') + (ex.keys && ex.keys.length ? ' (its questions are ' + ex.keys.join(', ') + ')' : ex.count && !ex.keys ? ' (it has ' + ex.count + (ex.partMissing ? ' parts' : ' questions') + ')' : '') + '.</div>';
      else {
        h += '<h4>' + esc(ex.title || 'Class 11 Mathematics') + ' · Exercise ' + esc(ex.ref.exercise) + ' · ' + esc(ex.unit) + '</h4>';
        h += ex.items.map(it => '<div class="sbtu-p"><b>Question ' + esc(it.no) + '.</b> ' + fmt(it.en) +
          (it.parts.length ? '<div>' + it.parts.map(p => '<div><b>' + esc(p.no) + '</b> ' + fmt(p.en) + (p.answer ? ' <span class="sbtu-direct" style="padding:.1rem .4rem">→ ' + fmt(p.answer) + '</span>' : '') + '</div>').join('') + '</div>' : '') +
          (it.answer ? '<div class="sbtu-direct" style="margin:.35rem 0">Answer: ' + fmt(it.answer) + '</div>' : '') +
          (it.sol && it.sol.steps ? '<details><summary>Step by step</summary><ol>' + it.sol.steps.map(st => '<li>' + fmt(st.en || '') + '</li>').join('') + '</ol></details>' : '') + '</div>').join('');
        if (ex.whole) h += '<div class="sbtu-src">The whole exercise (' + ex.count + ' questions) is shown; ask for one, e.g. “Exercise ' + esc(ex.ref.exercise) + ' question 3”.</div>';
      }
    }
    if (!r.ai && r.chat) return '<div class="sbtu-warn">I need the internet to chat. Ask me a question from the books and I can still answer it from this device.</div>';
    if (!r.ai && !r.exercise && !r.direct && !r.meaning && !r.passages.length && !r.chapters.length) {
      return '<div class="sbtu-warn">I could not find that in the books of ' + esc(r.scope) + '. Try other words from the lesson' + (S.cls ? ', or choose <b>All classes</b> above' : '') + '. I answer only from the textbooks in this project.</div>';
    }
    const exOk = !!(r.exercise && !r.exercise.missing);
    const aiGaveUp = r.ai && /do not answer this/i.test(r.ai);
    if (r.direct && !(aiGaveUp && r.direct.kind === 'sentences') && !(r.ai && r.exercise && !r.exercise.missing)) {
      h += '<h4>Answer</h4>';
      if (r.direct.kind === 'question') {
        const qa = r.direct.qa, it = qa.it;
        const ans = it.y === 'mcq' ? 'ABCDE'[it.a] + '. ' + it.o[it.a] : it.y === 'tf' ? (it.a === 0 ? 'True' : 'False') : it.a;
        h += '<div class="sbtu-direct" dir="' + dirOf(String(ans)) + '">' + fmt(ans) + '<div class="sbtu-src">The textbook asks: “' + esc(it.q.slice(0, 160)) + '” · ' + where(qa) + (it.pg ? ' · p. ' + esc(it.pg) : '') + '</div></div>';
      } else if (r.direct.kind === 'definition') {
        const d = r.direct.d;
        h += '<div class="sbtu-direct" dir="' + dirOf(d.s) + '">' + fmt(d.s) + '<div class="sbtu-src">' + where(d.p) + (d.p.head ? ' · under “' + esc(d.p.head) + '”' : '') + '</div></div>';
      } else {
        h += r.direct.sents.map(x => '<div class="sbtu-direct" style="margin:.3rem 0" dir="' + dirOf(x.s) + '">' + highlight(x.s, toks) + '<div class="sbtu-src">' + where(x.p) + '</div></div>').join('');
      }
    }
    if (r.meaning) {
      const m = r.meaning;
      h += '<h4>Word meaning</h4><div class="sbtu-mean"><div><b>English</b>' + esc(m[0]) + '</div><div dir="rtl"><b>اردو</b>' + esc(m[1] || '') + '</div><div dir="rtl"><b>پښتو</b>' + esc(m[2] || '') + '</div><div dir="rtl"><b>العربية</b>' + esc(m[3] || '') + '</div></div>';
    }
    if (!exOk && r.passages.length) {
      h += '<h4>From the books</h4>' + r.passages.slice(0, 3).map(p => '<div class="sbtu-p" dir="' + dirOf(p.text) + '">' + highlight(p.text, toks) + '<div class="sbtu-src">' + where(p) + (p.head ? ' · ' + esc(p.head) : '') + (p.call ? '<button type="button" class="sbtu-btn" data-act="open" data-s="' + esc(p.sid) + '" data-call="' + esc(p.call) + '">Open the chapter</button>' : '') + '</div></div>').join('');
    }
    if (!exOk && r.questions.length) {
      h += '<h4>Questions of the books on this</h4>' + r.questions.map((x, k) => {
        const it = x.it;
        const body = it.y === 'mcq' ? it.o.map((o, i) => '<label class="sbtu-opt" dir="' + dirOf(o) + '"><input type="radio" name="tq' + idx + '_' + k + '" data-act="pick" data-a="' + idx + '" data-k="' + k + '" data-v="' + i + '"> <span><b>' + 'ABCDE'[i] + '.</b> ' + fmt(o) + '</span></label>').join('') : '<button type="button" class="sbtu-btn alt" data-act="show" data-a="' + idx + '" data-k="' + k + '" style="margin:.3rem 0">Show the answer</button><div data-ans="' + idx + '_' + k + '"></div>';
        return '<div class="sbtu-p"><div dir="' + dirOf(it.q) + '">' + fmt(it.q) + '</div>' + body + '<div class="sbtu-src">' + where(x) + '</div></div>';
      }).join('');
    }
    if (!exOk && r.chapters.length) {
      h += '<h4>Read more</h4>' + r.chapters.map(c => '<div class="sbtu-p">' + where(c) + (c.fromIndex ? ' <span class="sbtu-src">(the chapter\'s text has these words)</span>' : '') + (c.call ? '<button type="button" class="sbtu-btn" data-act="open" data-s="' + esc(c.sid) + '" data-call="' + esc(c.call) + '">Open the chapter</button>' : '') + '<button type="button" class="sbtu-btn alt" data-act="test" data-s="' + esc(c.sid) + '" data-cls="' + c.cls + '" data-call="' + esc(c.call) + '">Make a test on it</button></div>').join('');
    }
    return h;
  }
  function logHtml() {
    return S.log.map((e, i) => '<div class="sbtu-q" dir="' + dirOf(e.q) + '">' + esc(e.q) + '</div><div class="sbtu-a" data-i="' + i + '">' + (e.r ? answerHtml(e.r, i) : '<span class="sbtu-dots"><i></i><i></i><i></i></span> <span class="sbtu-prog">' + esc(e.progress || 'Looking in the books…') + '</span>') + '</div>').join('');
  }
  function paint() {
    const h = host(); if (!h) return;
    const root = h.querySelector('.sbtu');
    if (!root) { build(); return; }
    root.classList.toggle('has-log', S.log.length > 0);
    root.querySelector('.sbtu-log').innerHTML = logHtml();
    const last = root.querySelector('.sbtu-a:last-of-type'); if (last && last.scrollIntoView) { try { last.scrollIntoView({block: 'nearest', behavior: 'smooth'}); } catch (e) { /* old webview */ } }
  }
  function suggestions() {
    const base = S.cls && AIDX && AIDX.subjects ? Object.keys(AIDX.subjects).filter(id => AIDX.subjects[id].cls === S.cls) : [];
    const chips = ['What is photosynthesis?', 'Maths 11 exercise 3.5 question 3', 'Difference between a cell and a tissue', 'نمک کیا ہے؟'];
    return chips;
  }
  function build() {
    const h = host(); if (!h) return;
    const opts = ['<option value="0"' + (!S.cls ? ' selected' : '') + '>All classes</option>'].concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => '<option value="' + n + '"' + (S.cls === n ? ' selected' : '') + '>Class ' + n + '</option>')).join('');
    const hour = new Date().getHours(), greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    h.innerHTML = '<div class="sbtu' + (S.log.length ? ' has-log' : '') + '">' +
      '<header class="sbtu-top"><span class="sbtu-av" aria-hidden="true">🤖</span><div class="sbtu-tt"><b>SPACEBOOK AI</b><small>Study assistant · Classes 1 to 12</small></div><span class="sbtu-live" data-live>CHECKING</span>' +
      '<label class="sbtu-sel">Look in <select data-act="cls" aria-label="Class to look in">' + opts + '</select></label><select class="sbtu-sel2" data-act="subject" aria-label="Subject" ' + (S.cls ? '' : 'disabled') + '><option value="">All subjects</option></select>' +
      '<button type="button" class="sbtu-chip" data-act="clear">New chat</button>' + (window.SBApp ? '' : '<button type="button" class="sbtu-chip" data-act="save" title="Keep the files of the books on this device so Ask, Create Test and Grammar Stats work without internet">⬇ Offline</button>') + '<span class="sbtu-prog" data-save role="status"></span></header>' +
      '<section class="sbtu-welcome"><div class="sbtu-spark" aria-hidden="true">✦</div><h2>' + greet + '!</h2><p>I am your study copilot. Ask me anything from the textbooks, in English, Urdu, Pashto or Arabic: a lesson, a word, or a question like “Maths 11 exercise 3.5 question 3”. Spelling mistakes are fine. I keep answering from the books even without internet.</p>' +
      '<div class="sbtu-cards" role="group" aria-label="Examples">' + suggestions().map(c => '<button type="button" class="sbtu-card" data-act="try" data-q="' + esc(c) + '">' + esc(c) + '</button>').join('') + '</div></section>' +
      '<div class="sbtu-log" aria-live="polite">' + logHtml() + '</div>' +
      '<div class="sbtu-input"><button type="button" class="sbtu-mic" data-act="mic" title="Speak your question" aria-label="Speak your question">🎤</button><textarea rows="1" data-act="input" placeholder="Ask SpaceBook AI (e.g. \'What is photosynthesis?\', \'Maths 11 exercise 3.5 question 3\')" aria-label="Your question" dir="auto"></textarea><button type="button" class="sbtu-send" data-act="ask" aria-label="Send">➤</button></div>' +
      '<div class="sbtu-foot">Press Enter to send, Shift+Enter for a new line · Answers come from the textbooks, explained by AI</div></div>';
    const root = h.querySelector('.sbtu');
    root.addEventListener('click', onClick); root.addEventListener('change', onChange);
    root.querySelector('textarea').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } });
    fillSubjects(); checkLive();
  }
  // the badge: LIVE AI when the server answers (and has a key), OFFLINE when only the books on the device can
  async function checkLive() {
    const el = document.querySelector('[data-live]'); if (!el) return;
    let ok = false;
    if (typeof navigator === 'undefined' || navigator.onLine !== false) { try { const r = await fetch('api/ask.php?action=ping', {credentials: 'same-origin'}); const j = await r.json(); ok = !!(j && j.ok && j.ai); } catch (e) { ok = false; } }
    el.textContent = ok ? 'LIVE AI' : 'OFFLINE'; el.className = 'sbtu-live ' + (ok ? 'on' : 'off');
    el.title = ok ? 'The AI explains the books for you' : 'Answering from the books on this device';
  }
  function fillSubjects() {
    const sel = document.querySelector('.sbtu select[data-act="subject"]'); if (!sel) return;
    sel.disabled = !S.cls;
    const keep = S.subject;
    sel.innerHTML = '<option value="">All subjects</option>';
    if (!S.cls) return;
    (AIDX ? Promise.resolve(AIDX) : getJson('content/assistant/index.json').then(j => (AIDX = j))).then(ix => {
      Object.keys(ix.subjects).filter(id => ix.subjects[id].cls === S.cls).forEach(id => { const o = document.createElement('option'); o.value = id; o.textContent = ix.subjects[id].name; if (id === keep) o.selected = true; sel.appendChild(o); });
    }).catch(() => { /* the subject list is only a convenience */ });
  }
  function submit(q) {
    const ta = document.querySelector('.sbtu textarea');
    const text = String(q != null ? q : (ta ? ta.value : '')).trim(); if (!text || S.busy) return;
    if (ta) ta.value = '';
    const entry = {q: text, r: null, progress: ''};
    S.log.push(entry); S.busy = true; paint();
    const say = msg => { entry.progress = msg; const el = document.querySelector('.sbtu-a:last-of-type .sbtu-prog'); if (el) el.textContent = msg; };
    (async () => {
      say('Reading your question…');
      const u = await understand(text);
      const kind = u && u.kind ? u.kind : 'study';                       // mends spelling and finds the exercise asked for (needs the server)
      const fixed = u && u.fixed ? String(u.fixed) : text;
      let ref = exerciseRef(text) || exerciseRef(fixed);
      if (u && u.exercise && !ref) ref = {exercise: String(u.exercise), q: /^\d{1,2}$/.test(String(u.q || '')) ? String(u.q) : '', cls: +u.cls || 0, maths: /math/i.test(u.subject || '')};
      else if (u && ref) { if (!ref.q && /^\d{1,2}$/.test(String(u.q || ''))) ref.q = String(u.q); if (!ref.cls && +u.cls) ref.cls = +u.cls; }
      let ex = null; try { if (kind !== 'chat') ex = await lookupExercise(ref); } catch (e) { /* the book data is not here: the search below still answers */ }
      // talk: a greeting, thanks or a remark needs no search of the books; a follow-up reuses what the last answer was built from
      const r = kind === 'chat' || (kind === 'followup' && !ref) ? {q: fixed, passages: [], questions: [], chapters: [], scope: '', chat: kind === 'chat', followup: kind === 'followup'} : await answer(fixed, say);
      r.fixed = fixed !== text ? fixed : ''; r.exercise = ex;
      entry.r = r;
      say('Thinking…');
      const hist = S.log.slice(-7, -1).filter(e => e.r && e.r.ai).map(e => ({q: e.q, a: e.r.ai}));
      const a = await askAI(entry, hist);
      if (a) r.ai = a;
    })()
      .catch(e => { entry.r = {q: text, passages: [], questions: [], chapters: [], scope: 'the books', error: e.message}; })
      .then(() => { S.busy = false; paint(); const st = readLog(); st.unshift(text); saveLog([...new Set(st)]); });
  }
  function onClick(e) {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const a = b.dataset.act;
    if (a === 'ask') submit();
    else if (a === 'try') submit(b.dataset.q);
    else if (a === 'clear') { S.log = []; paint(); }
    else if (a === 'save') savePack(b);
    else if (a === 'mic') listen(b);
    else if (a === 'open') { if (window.SBOpenChapter) window.SBOpenChapter(b.dataset.s, b.dataset.call); }
    else if (a === 'test') { if (window.SBCreateTest && window.SBCreateTest.openWith) { const m = /selectSubjectChapter\('\w+',\s*(\d+),/.exec(b.dataset.call) || /selectMathChapter\((\d+)/.exec(b.dataset.call); window.SBCreateTest.openWith({cls: +b.dataset.cls, s: b.dataset.s, u: m ? +m[1] : null}); } }
    else if (a === 'show') { const r = S.log[+b.dataset.a].r, x = r.questions[+b.dataset.k], it = x.it, box = document.querySelector('[data-ans="' + b.dataset.a + '_' + b.dataset.k + '"]'); if (box) box.innerHTML = '<div class="sbtu-direct" dir="' + dirOf(String(it.a)) + '">' + (it.y === 'tf' ? (it.a === 0 ? 'True' : 'False') : fmt(it.a)) + '</div>'; }
    else if (a === 'pick') { const r = S.log[+b.dataset.a].r, it = r.questions[+b.dataset.k].it, v = +b.dataset.v, box = b.closest('.sbtu-p'); box.querySelectorAll('.sbtu-opt').forEach((o, i) => { o.classList.toggle('ok', i === it.a); o.classList.toggle('bad', i === v && v !== it.a); }); }
  }
  function listen(btn) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition, ta = document.querySelector('.sbtu textarea');
    if (!SR || !ta) { btn.title = 'Speaking is not available in this browser'; return; }
    try {
      const rec = new SR(); rec.lang = /[؀-ۿ]/.test(ta.value) ? 'ur-PK' : 'en-US'; rec.interimResults = false;
      btn.classList.add('rec');
      rec.onresult = ev => { ta.value = (ta.value + ' ' + ev.results[0][0].transcript).trim(); };
      rec.onend = () => { btn.classList.remove('rec'); if (ta.value.trim()) submit(); };
      rec.onerror = () => btn.classList.remove('rec');
      rec.start();
    } catch (e) { btn.classList.remove('rec'); }
  }
  function onChange(e) {
    const el = e.target;
    if (el.dataset.act === 'cls') { S.cls = +el.value; S.subject = ''; fillSubjects(); }
    else if (el.dataset.act === 'subject') S.subject = el.value;
  }
  function render() {
    try {
      state.page = 'assistant'; state.activeView = 'assistant';
      setActiveNav('assistant');
      setDashHeader('🤖 Ask SpaceBook', 'Your AI study assistant for Classes 1 to 12');
      setBreadcrumb([{label: 'Home', onclick: () => { setActiveNav('home'); renderHome(); }}, {label: 'Ask SpaceBook', active: true, onclick: () => {}}]);
    } catch (e) { /* app helpers missing: the page still draws */ }
    addCss();
    if (!S.cls) { try { const m = /^cls(\d+)$/.exec(state.selectedClass || ''); if (m && +m[1] >= 1 && +m[1] <= 12) S.cls = +m[1]; } catch (e) { /* no class chosen yet */ } }
    build(); window.scrollTo(0, 0);
  }
  window.renderTutor = render;
  // keep the files of Ask, Create Test and Grammar Stats on the device: each is fetched once (the service worker keeps what is asked for by its hash URL)
  async function savePack(btn) {
    const out = document.querySelector('[data-save]'); if (btn) btn.disabled = true;
    const say = t => { if (out) out.textContent = t; };
    try {
      const A = await getJson('content/assistant/index.json'), B = await getJson('content/testbank/index.json'), G = await getJson('content/grammar/index.json'), X = await getJson('content/search/index.json');
      const urls = [];
      Object.values(A.classes).forEach(c => urls.push(['content/assistant/' + c.file + '?v=' + c.h, c.bytes]));
      Object.values(B.classes).forEach(c => urls.push(['content/testbank/' + c.file + '?v=' + c.h, c.bytes]));
      Object.values(G.langs).forEach(c => urls.push(['content/grammar/' + c.file + '?v=' + c.h, c.bytes]));
      Object.keys(X.subjects).filter(id => X.subjects[id].classId === 'cls11').forEach(id => urls.push(['content/search/' + id + '.json?v=' + X.subjects[id].h, X.subjects[id].bytes]));
      const total = urls.reduce((a, u) => a + u[1], 0); let done = 0, failed = 0;
      for (const [u, n] of urls) {
        say('Saving ' + Math.round(100 * done / total) + '% of ' + (total / 1048576).toFixed(0) + ' MB…');
        try { const r = await fetch(u); if (!r.ok) throw new Error(); await r.arrayBuffer(); } catch (e) { failed++; }
        done += n;
      }
      say(failed ? 'Saved, but ' + failed + ' file(s) could not be fetched: try again online.' : 'Saved: Ask, Create Test and Grammar Stats now work offline.');
    } catch (e) { say('Could not save now: ' + e.message + '. Try again when online.'); }
    if (btn) btn.disabled = false;
  }
  window.SBTutor = {savePack, ask: (q, scope) => { if (scope) { S.cls = +scope.cls || 0; S.subject = scope.subject || ''; } return answer(q); }, state: S, submit};
})();
