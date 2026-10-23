/* sb_create_test.js — "Create Test": make a test from the textbooks, take it, or print it.
 *
 * The scope is a whole class, some subjects, some chapters, one chapter or one topic. The questions are the books' own (content/testbank/, made by
 * tools/tests/build_test_bank.js): MCQs, true or false, fill in the blanks, calculations, grammar and vocabulary exercises, short questions, long
 * questions and activities, each with its model answer where the project has one. The student picks how many of each and the marks, sees the test, can
 * swap or remove a question, and then
 *   ▶ takes it here (MCQs and true or false mark themselves; the other answers are written, compared with the model answer and marked by the student),
 *   🖨 prints it as a paper (with or without the answer key; the phone's own print dialog also saves a PDF), or
 *   💾 saves it to take again later.
 * Results and saved tests stay on this device (localStorage "sbct:v1"). The question files are fetched on first use and kept for offline use.
 * Public: window.renderCreateTest() (the "Create Test" tab), window.SBCreateTest.open(). */
(function () {
  'use strict';
  const BASE = 'content/testbank/';
  const KINDS = [
    ['mcq', 'Multiple choice (MCQs)', 'Choose the correct option'],
    ['tf', 'True or false', 'Write True or False'],
    ['fill', 'Fill in the blanks', 'Fill in the blanks'],
    ['lang', 'Grammar and vocabulary', 'Do as asked'],
    ['num', 'Calculations (solve)', 'Solve the following'],
    ['short', 'Short questions', 'Answer the following questions briefly'],
    ['long', 'Long questions', 'Answer the following questions in detail'],
    ['task', 'Activities (written work)', 'Do the following activities']
  ];
  const KNAME = Object.fromEntries(KINDS.map(k => [k[0], k[1]]));
  const KHEAD = Object.fromEntries(KINDS.map(k => [k[0], k[2]]));
  const PRESETS = [
    ['Quick quiz', 'ten MCQs', {mcq: 10}],
    ['Class test', '10 MCQs, 5 short, 2 long', {mcq: 10, short: 5, long: 2}],
    ['Revision test', 'MCQs, true or false, fill in the blanks, short', {mcq: 10, tf: 5, fill: 5, short: 5}],
    ['Full paper', '15 MCQs, 9 short, 3 long', {mcq: 15, short: 9, long: 3}]
  ];
  const LS = 'sbct:v1';
  const S = {view: 'setup', cls: 0, sel: {}, chapters: {}, topics: {}, general: null, counts: {}, marks: {}, title: '', minutes: 0, shuffleQ: true, shuffleO: true, onlyAnswered: false, bilingual: false, key: true, seed: 1, test: null, run: null};
  let INDEX = null, loading = null;
  const SHARDS = {};
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const host = () => document.getElementById('dashboard-body');
  const ARABIC = /[؀-ۿ]/g, LATIN = /[A-Za-z]/g;
  const dirOf = t => { const s = String(t || '').replace(/\$[^$]*\$/g, ' '); const a = (s.match(ARABIC) || []).length, l = (s.match(LATIN) || []).length; return a > l ? 'rtl' : 'ltr'; };
  const fmt = t => { try { return window.MATH6_READER ? window.MATH6_READER.inline(String(t == null ? '' : t), false) : esc(t); } catch (e) { return esc(t); } };
  const ansFmt = t => { const s = String(t == null ? '' : t); if (!/(^|\s)•\s/.test(s)) return fmt(s); const parts = s.split(/\s*•\s+/); return parts.map((x, k) => !x.trim() ? '' : (k === 0 ? '' : '• ') + fmt(x)).filter(Boolean).join('<br>'); };
  const store = {
    read() { try { return Object.assign({saved: [], history: [], prefs: {}}, JSON.parse(localStorage.getItem(LS) || '{}')); } catch (e) { return {saved: [], history: [], prefs: {}}; } },
    write(o) { try { localStorage.setItem(LS, JSON.stringify(o)); } catch (e) { /* storage full or blocked: the test still works */ } }
  };
  const rng = seed => { let a = seed | 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const shuffle = (list, r) => { const a = list.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // ---------- data ----------
  async function getJson(url) { const r = await fetch(url); if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }
  function loadIndex() { return INDEX ? Promise.resolve(INDEX) : getJson(BASE + 'index.json').then(j => (INDEX = j)); }
  function loadClass(n) {
    if (SHARDS[n]) return Promise.resolve(SHARDS[n]);
    return loadIndex().then(ix => { const c = ix.classes[n]; if (!c) throw new Error('no questions for class ' + n); return getJson(BASE + c.file + '?v=' + c.h); }).then(j => (SHARDS[n] = j));
  }

  // ---------- scope ----------
  const sh = () => SHARDS[S.cls];
  const subjIds = () => sh() ? Object.keys(sh().subjects) : [];
  function inScope(it) {
    if (!S.sel[it.s]) return false;
    const ch = S.chapters[it.s];
    if (ch && Object.keys(ch).length) {
      if (it.u < 0) return !!general();
      if (!ch[it.u]) return false;
      const tp = S.topics[it.s + '|' + it.u];
      return !tp || !Object.keys(tp).length || (it.p >= 0 && !!tp[it.p]);
    }
    return it.u >= 0 || general();
  }
  const anyChapterPicked = () => Object.keys(S.sel).some(s => S.sel[s] && S.chapters[s] && Object.keys(S.chapters[s]).length);
  const general = () => S.general == null ? !anyChapterPicked() : S.general;
  const pool = kind => (sh() ? sh().items : []).filter(it => it.y === kind && inScope(it) && (!S.onlyAnswered || it.y === 'mcq' || it.y === 'tf' || it.a !== undefined));
  function available() { const a = {}; KINDS.forEach(k => { a[k[0]] = 0; }); (sh() ? sh().items : []).forEach(it => { if (inScope(it) && (!S.onlyAnswered || it.y === 'mcq' || it.y === 'tf' || it.a !== undefined)) a[it.y]++; }); return a; }
  function scopeText() {
    const ids = subjIds().filter(s => S.sel[s]);
    if (!ids.length) return '';
    if (ids.length === subjIds().length && !anyChapterPicked()) return 'Class ' + S.cls + ', all subjects';
    return 'Class ' + S.cls + ': ' + ids.map(s => {
      const nm = sh().subjects[s].name, ch = S.chapters[s] ? Object.keys(S.chapters[s]).filter(u => S.chapters[s][u]) : [];
      if (!ch.length) return nm;
      const tp = ch.length === 1 && S.topics[s + '|' + ch[0]] ? Object.keys(S.topics[s + '|' + ch[0]]).filter(p => S.topics[s + '|' + ch[0]][p]) : [];
      return nm + (ch.length === 1 ? ' (' + chapterName(s, +ch[0]) + (tp.length === 1 ? ', ' + sh().subjects[s].topics[+ch[0]][+tp[0]] : '') + ')' : ' (' + ch.length + ' chapters)');
    }).join('; ');
  }
  const chapterName = (s, u) => String((sh().subjects[s].chapters[u] || 'Chapter ' + (u + 1))).replace(/\s+/g, ' ').slice(0, 70);

  // ---------- building a test ----------
  function build() {
    const r = rng(S.seed * 7919 + 13), picked = [];
    KINDS.forEach(([k]) => {
      const n = S.counts[k] | 0; if (!n) return;
      const list = shuffle(pool(k), r), groups = new Map();
      list.forEach(it => { const g = it.s + '|' + it.u; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(it); });
      const order = shuffle([...groups.keys()], r), seen = new Set(), got = [];
      for (let round = 0; got.length < n && round < 400; round++) {
        let any = false;
        for (const g of order) {
          const l = groups.get(g); if (!l.length || got.length >= n) continue;
          const it = l.pop(); any = true;
          const key = it.q.toLowerCase().replace(/\W+/g, '');
          if (seen.has(key)) continue; seen.add(key); got.push(it);
        }
        if (!any) break;
      }
      picked.push(...(S.shuffleQ ? shuffle(got, r) : got.sort((a, b) => a.s < b.s ? -1 : a.s > b.s ? 1 : a.u - b.u)));
    });
    const marks = Object.assign({}, INDEX.marks, S.marks);
    return {
      id: 't' + Date.now().toString(36), title: S.title || 'Test', cls: S.cls, scope: scopeText(), minutes: S.minutes, bilingual: S.bilingual, key: S.key, created: new Date().toISOString().slice(0, 10),
      seed: S.seed, items: picked.map(it => withOrder(it, r)), marks
    };
  }
  function withOrder(it, r) {      // an MCQ with its options in another order (the key moves with them) unless an option points at the others
    if (it.y !== 'mcq' || !S.shuffleO || it.o.some(o => /above|none of|all of|both|neither|\b[a-d]\s*(and|&)\s*[a-d]\b|مذکورہ|درج بالا|تمام|کوئی نہیں/i.test(o))) return Object.assign({}, it);
    const perm = shuffle(it.o.map((_, i) => i), r);
    return Object.assign({}, it, {o: perm.map(i => it.o[i]), a: perm.indexOf(it.a)});
  }
  const marksOf = (t, it) => (t.marks[it.y] == null ? 1 : +t.marks[it.y]) || 0;
  const totalMarks = t => t.items.reduce((a, it) => a + marksOf(t, it), 0);
  const defaultMinutes = t => Math.max(5, Math.round(t.items.reduce((a, it) => a + ({mcq: 1, tf: 0.7, fill: 1, lang: 1.2, num: 3, short: 3, long: 8, task: 4}[it.y] || 2), 0) / 5) * 5);

  // ---------- paper layout (shared by the preview and the print) ----------
  function sections(t) {
    const out = [];
    KINDS.forEach(([k]) => { const list = t.items.map((it, i) => ({it, i})).filter(x => x.it.y === k); if (list.length) out.push({k, list}); });
    return out;
  }
  const LETTER = ['A', 'B', 'C', 'D', 'E'];
  function qHtml(t, it, no, opt) {
    opt = opt || {};
    const dir = dirOf(it.q), alt = t.bilingual ? [it.q2, it.q3].filter(Boolean) : [];
    let h = '<div class="sbct-qtext" dir="' + dir + '"><span class="sbct-no">' + no + '.</span> ' + fmt(it.q) + '</div>';
    alt.forEach(a => { h += '<div class="sbct-alt" dir="' + dirOf(a) + '">' + fmt(a) + '</div>'; });
    if (it.y === 'mcq') {
      h += '<ol class="sbct-opts" type="A">' + it.o.map((o, i) => '<li' + (opt.mark && it.a === i ? ' class="sbct-right"' : '') + ' dir="' + dirOf(o) + '">' + fmt(o) + '</li>').join('') + '</ol>';
    } else if (it.y === 'tf') h += '<div class="sbct-tf">True &nbsp;/&nbsp; False</div>';
    return h;
  }
  function answerText(it) {
    if (it.y === 'mcq') return LETTER[it.a] + '. ' + it.o[it.a];
    if (it.y === 'tf') return it.a === 0 ? 'True' : 'False';
    return it.a === undefined ? '' : it.a;
  }
  function printHtml(t, withKey) {
    const secs = sections(t), letters = 'ABCDEFGH';
    let h = '<div class="sbct-paper"><h1>' + esc(t.title) + '</h1><div class="sbct-paperhead"><span>Class ' + t.cls + ' · ' + esc(t.scope.replace(/^Class \d+:? ?/, '') || 'all subjects') + '</span><span>Time: ' + (t.minutes || defaultMinutes(t)) + ' minutes</span><span>Total marks: ' + totalMarks(t) + '</span></div>' +
      '<div class="sbct-paperhead"><span>Name: ______________________</span><span>Roll no: __________</span><span>Date: __________</span></div>';
    let no = 0;
    secs.forEach((sec, si) => {
      const mk = t.marks[sec.k] == null ? 1 : t.marks[sec.k];
      h += '<section class="sbct-sec"><h2>Section ' + letters[si] + ': ' + esc(KNAME[sec.k]) + ' <small>(' + sec.list.length + ' × ' + mk + ' = ' + sec.list.length * mk + ' marks)</small></h2><p class="sbct-instr">' + esc(KHEAD[sec.k]) + '.</p>';
      let lastH = '';
      sec.list.forEach(({it}) => {
        no++;
        if (it.h && it.h !== lastH && sec.k !== 'mcq') { h += '<p class="sbct-instr2" dir="' + dirOf(it.h) + '">' + fmt(it.h) + '</p>'; }
        lastH = it.h || '';
        h += '<div class="sbct-q">' + qHtml(t, it, no) + (sec.k === 'short' ? '<div class="sbct-lines" style="height:3.4em"></div>' : sec.k === 'long' ? '<div class="sbct-lines" style="height:9em"></div>' : sec.k === 'num' ? '<div class="sbct-lines" style="height:5em"></div>' : sec.k === 'lang' || sec.k === 'task' ? '<div class="sbct-lines" style="height:2.6em"></div>' : '') + '</div>';
      });
      h += '</section>';
    });
    if (withKey) {
      h += '<section class="sbct-sec sbct-keysec"><h2>Answer key</h2>';
      let n = 0;
      secs.forEach(sec => sec.list.forEach(({it}) => { n++; const a = answerText(it); h += '<div class="sbct-keyrow" dir="' + dirOf(String(a) || it.q) + '"><b>' + n + '.</b> ' + (a === '' ? '<i>No answer written in the books for this one.</i>' : ansFmt(a)) + '</div>'; }));
      h += '</section>';
    }
    return h + '<p class="sbct-foot">Made with SpaceBook · Create Test · every question is from the textbooks</p></div>';
  }
  function printNow(withKey) {
    let box = document.getElementById('sbct-print');
    if (!box) { box = document.createElement('div'); box.id = 'sbct-print'; document.body.appendChild(box); }
    box.innerHTML = printHtml(S.test, withKey);
    document.body.classList.add('sbct-printing');
    const done = () => { document.body.classList.remove('sbct-printing'); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    setTimeout(done, 9000);
    try { window.print(); } catch (e) { done(); }
  }

  // ---------- screens ----------
  const CSS = `
  .sbct{max-width:1000px;margin:0 auto;padding:.4rem .2rem 3rem;color:#0f172a}
  .sbct h2{margin:.2rem 0 .5rem;font-size:1.25rem}
  .sbct-hero{background:linear-gradient(135deg,#1e3a8a,#6d28d9);color:#fff;border-radius:16px;padding:1rem 1.2rem;margin-bottom:1rem}
  .sbct-hero h2{color:#fff;margin:0 0 .25rem}.sbct-hero p{margin:0;opacity:.95;font-size:.92rem}
  .sbct-card{background:#fff;border:1px solid #cbd5e1;border-radius:14px;padding:.9rem 1rem;margin:.8rem 0}
  .sbct-card>h3{margin:0 0 .5rem;font-size:1rem}
  .sbct-card>h3 b{display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%;background:#6d28d9;color:#fff;font-size:.8rem;margin-inline-end:.4rem}
  .sbct-pills{display:flex;flex-wrap:wrap;gap:.4rem}
  .sbct-pill{min-width:2.6rem;padding:.4rem .7rem;border:1px solid #94a3b8;border-radius:999px;background:#fff;color:#0f172a;font:700 .9rem system-ui,sans-serif;cursor:pointer}
  .sbct-pill[aria-pressed="true"]{background:#1d4ed8;border-color:#1d4ed8;color:#fff}
  .sbct-btn{display:inline-flex;align-items:center;gap:.35rem;padding:.55rem 1rem;border:none;border-radius:10px;background:#1d4ed8;color:#fff;font:700 .92rem system-ui,sans-serif;cursor:pointer}
  .sbct-btn:hover,.sbct-btn:focus-visible{background:#1e40af;outline:2px solid #93c5fd;outline-offset:2px}
  .sbct-btn.alt{background:#fff;color:#1e3a8a;border:1px solid #1d4ed8}
  .sbct-btn.go{background:#15803d}.sbct-btn.go:hover{background:#166534}
  .sbct-btn[disabled]{opacity:.5;cursor:not-allowed}
  .sbct-mini{padding:.2rem .6rem;border:1px solid #94a3b8;border-radius:8px;background:#fff;color:#0f172a;font:600 .8rem system-ui,sans-serif;cursor:pointer}
  .sbct-subj{border:1px solid #e2e8f0;border-radius:10px;margin:.4rem 0;background:#f8fafc}
  .sbct-subj>summary{list-style:none;display:flex;align-items:center;gap:.5rem;padding:.5rem .7rem;cursor:pointer;font-weight:700}
  .sbct-subj>summary::-webkit-details-marker{display:none}
  .sbct-subj>summary .sbct-n{margin-inline-start:auto;font-weight:500;font-size:.8rem;color:#475569}
  .sbct-subj>summary::after{content:"▸";color:#475569}.sbct-subj[open]>summary::after{content:"▾"}
  .sbct-chs{padding:.2rem .8rem .6rem 1.8rem;display:grid;gap:.2rem}
  .sbct-chs label{display:flex;gap:.45rem;align-items:flex-start;font-size:.9rem;cursor:pointer}
  .sbct-chs .sbct-c{margin-inline-start:auto;font-size:.75rem;color:#475569;white-space:nowrap}
  .sbct-tps{margin:.1rem 0 .3rem 1.6rem;padding:.3rem .6rem;border-inline-start:3px solid #c4b5fd;display:grid;gap:.15rem;font-size:.85rem}
  .sbct-kinds{display:grid;gap:.4rem}
  .sbct-krow{display:grid;grid-template-columns:minmax(10rem,1fr) 5.5rem 4.5rem 4.5rem;gap:.5rem;align-items:center;padding:.3rem .2rem;border-bottom:1px solid #f1f5f9}
  .sbct-krow.head{font-size:.75rem;color:#475569;font-weight:700;border-bottom:1px solid #cbd5e1}
  .sbct-krow input[type=number]{width:100%;padding:.3rem;border:1px solid #94a3b8;border-radius:8px;font:inherit}
  .sbct-avail{font-size:.85rem;color:#334155}
  .sbct-row{display:flex;flex-wrap:wrap;gap:.7rem;align-items:center;margin:.4rem 0}
  .sbct-row label{display:inline-flex;gap:.4rem;align-items:center;font-size:.9rem}
  .sbct-row input[type=text],.sbct-row input[type=number]{padding:.4rem .6rem;border:1px solid #94a3b8;border-radius:8px;font:inherit;min-width:0}
  .sbct-presets{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:.4rem}
  .sbct-chip{padding:.15rem .6rem;border-radius:999px;background:#ede9fe;color:#4c1d95;font-size:.8rem;font-weight:700}
  .sbct-sum{display:flex;flex-wrap:wrap;gap:.4rem;margin:.4rem 0}
  .sbct-list{margin:.4rem 0}
  .sbct-sech{margin:1rem 0 .3rem;padding:.35rem .7rem;background:#1e3a8a;color:#fff;border-radius:8px;font-size:.95rem}
  .sbct-sech small{font-weight:500;opacity:.9}
  .sbct-instr2{margin:.5rem 0 .1rem;font-weight:700;color:#334155;font-size:.9rem}
  .sbct-item{border:1px solid #e2e8f0;border-radius:10px;padding:.5rem .7rem;margin:.35rem 0;background:#fff;position:relative}
  .sbct-qtext{font-size:1rem;line-height:1.7}
  .sbct-no{font-weight:800;color:#1e3a8a;margin-inline-end:.2rem}
  .sbct-alt{font-size:.9rem;color:#475569;margin-inline-start:1.4rem}
  .sbct-opts{margin:.3rem 0 .1rem;padding-inline-start:2rem;display:grid;gap:.15rem}
  .sbct-opts li.sbct-right{color:#14532d;font-weight:700}
  .sbct-meta{display:flex;flex-wrap:wrap;gap:.4rem;align-items:center;margin-top:.35rem;font-size:.75rem;color:#475569}
  .sbct-meta .sbct-mini{margin-inline-start:auto}
  .sbct-ans{margin-top:.4rem;padding:.4rem .6rem;border-inline-start:4px solid #16a34a;background:#f0fdf4;border-radius:6px;font-size:.92rem}
  .sbct-ans.none{border-color:#d97706;background:#fffbeb}
  .sbct-take label.sbct-o{display:flex;gap:.5rem;align-items:flex-start;padding:.35rem .5rem;border:1px solid #cbd5e1;border-radius:8px;margin:.2rem 0;cursor:pointer;background:#fff}
  .sbct-take label.sbct-o.ok{background:#dcfce7;border-color:#16a34a}.sbct-take label.sbct-o.bad{background:#fee2e2;border-color:#dc2626}
  .sbct-take textarea{width:100%;min-height:4.5rem;margin-top:.4rem;padding:.4rem;border:1px solid #94a3b8;border-radius:8px;font:inherit}
  .sbct-self{display:flex;gap:.4rem;margin-top:.4rem;flex-wrap:wrap}
  .sbct-self button[aria-pressed="true"]{background:#0f766e;color:#fff;border-color:#0f766e}
  .sbct-timer{position:sticky;top:60px;z-index:5;display:flex;justify-content:space-between;align-items:center;gap:.6rem;background:#0f172a;color:#fff;padding:.4rem .8rem;border-radius:10px;margin-bottom:.6rem;font-weight:700}
  .sbct-score{font-size:2rem;font-weight:800;color:#1e3a8a}
  .sbct-bar{height:.6rem;border-radius:999px;background:#e2e8f0;overflow:hidden}.sbct-bar i{display:block;height:100%;background:#16a34a}
  .sbct-table{width:100%;border-collapse:collapse;font-size:.88rem}.sbct-table th,.sbct-table td{border:1px solid #cbd5e1;padding:.3rem .5rem;text-align:start}.sbct-table th{background:#e0f2fe}
  .sbct-msg{padding:.6rem .8rem;border-radius:10px;background:#fef3c7;color:#451a03;margin:.5rem 0;font-size:.9rem}
  #sbct-print{display:none}
  .sbct-paper{font:12pt/1.45 Georgia,'Times New Roman',serif;color:#000}
  .sbct-paper h1{text-align:center;font-size:18pt;margin:0 0 .3rem}.sbct-paper h2{font-size:13pt;margin:1rem 0 .2rem;border-bottom:1.5px solid #000}
  .sbct-paper h2 small{font-weight:400;font-size:10pt}
  .sbct-paperhead{display:flex;justify-content:space-between;gap:1rem;font-size:11pt;margin:.2rem 0}
  .sbct-paper .sbct-q{margin:.5rem 0;break-inside:avoid}.sbct-paper .sbct-opts{display:grid;grid-template-columns:1fr 1fr;gap:.1rem 1.5rem}
  .sbct-paper .sbct-lines{border-bottom:1px dotted #555;background:repeating-linear-gradient(transparent,transparent calc(1.5em - 1px),#888 calc(1.5em - 1px),#888 1.5em)}
  .sbct-paper .sbct-instr{font-style:italic;margin:.1rem 0 .3rem}.sbct-paper .sbct-instr2{font-weight:700;color:#000}
  .sbct-keysec{break-before:page}.sbct-keyrow{margin:.15rem 0}.sbct-foot{text-align:center;font-size:9pt;margin-top:1rem;color:#444}
  @media (max-width:640px){.sbct-krow{grid-template-columns:1fr 4.5rem 4rem}.sbct-krow .sbct-avail{grid-column:1/-1}.sbct-krow.head span:nth-child(2){display:none}}
  @media print{
    body.sbct-printing>*:not(#sbct-print){display:none!important}
    body.sbct-printing #sbct-print,body.sbct-printing #sbct-print *{visibility:visible!important}
    body.sbct-printing #sbct-print{display:block!important;position:absolute!important;left:0;top:0;width:100%}
    body.sbct-printing{background:#fff!important}
    @page{size:A4;margin:14mm}
  }`;
  function addCss() { if (document.getElementById('sbct-css')) return; const s = document.createElement('style'); s.id = 'sbct-css'; s.textContent = CSS; document.head.appendChild(s); }

  function paint() {
    const h = host(); if (!h) return;
    h.innerHTML = '<div class="sbct">' + (S.view === 'setup' ? setupHtml() : S.view === 'preview' ? previewHtml() : S.view === 'take' ? takeHtml() : resultHtml()) + '</div>';
    wire(h.querySelector('.sbct'));
    if (S.view === 'take') tick();
  }

  function setupHtml() {
    const st = store.read();
    const pills = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => '<button type="button" class="sbct-pill" data-act="cls" data-n="' + n + '" aria-pressed="' + (n === S.cls) + '">' + n + '</button>').join('');
    let h = '<section class="sbct-hero"><h2>📝 Create Test</h2><p>Make a test from the textbooks: a whole class, some subjects, some chapters, one chapter or one topic. Take it here, or print it as a paper.</p></section>';
    h += '<section class="sbct-card"><h3><b>1</b> Class</h3><div class="sbct-pills" role="group" aria-label="Class">' + pills + '</div></section>';
    if (loading) h += '<div class="sbct-msg" role="status">Loading the questions of class ' + S.cls + '…</div>';
    else if (S.cls && sh()) h += scopeHtml() + kindsHtml() + detailsHtml();
    else if (S.error) h += '<div class="sbct-msg" role="alert">' + esc(S.error) + '</div>';
    else h += '<div class="sbct-msg">Pick your class to start.</div>';
    h += mineHtml(st);
    return h;
  }
  function scopeHtml() {
    const ids = subjIds(), all = ids.length && ids.every(s => S.sel[s]);
    const cnt = s => { const n = INDEX.subjects[s] ? Object.values(INDEX.subjects[s].n).reduce((a, b) => a + b, 0) : 0; return n; };
    let h = '<section class="sbct-card"><h3><b>2</b> Subjects, chapters and topics</h3><div class="sbct-row"><button type="button" class="sbct-mini" data-act="all">' + (all ? 'Clear all' : 'Whole class (all subjects)') + '</button><span class="sbct-avail">Tick a subject for all of it, or open it and tick chapters; with one chapter ticked you can tick topics.</span></div>';
    ids.forEach(s => {
      const sj = sh().subjects[s], chosen = !!S.sel[s], chs = S.chapters[s] || {};
      const rows = sj.chapters.map((t, u) => {
        const c = INDEX.subjects[s].chapters[u]; const n = c ? Object.values(c).reduce((a, b) => a + b, 0) : 0;
        if (!n) return '';
        let r = '<label><input type="checkbox" data-act="ch" data-s="' + s + '" data-u="' + u + '"' + (chs[u] ? ' checked' : '') + '> <span>' + esc(chapterName(s, u)) + '</span><span class="sbct-c">' + n + ' questions</span></label>';
        const picked = Object.keys(chs).filter(x => chs[x]);
        if (chs[u] && picked.length === 1 && (sj.topics[u] || []).length > 1) {
          const tp = S.topics[s + '|' + u] || {};
          r += '<div class="sbct-tps"><b>Topics of this chapter</b>' + sj.topics[u].map((t2, p) => '<label><input type="checkbox" data-act="tp" data-s="' + s + '" data-u="' + u + '" data-p="' + p + '"' + (tp[p] ? ' checked' : '') + '> <span>' + esc(String(t2).replace(/\s+/g, ' ').slice(0, 80)) + '</span></label>').join('') + '<span class="sbct-avail">No topic ticked = the whole chapter. A question is tied to a topic when it shares enough words with that part of the chapter.</span></div>';
        }
        return r;
      }).join('');
      const whole = INDEX.subjects[s].whole ? Object.values(INDEX.subjects[s].whole).reduce((a, b) => a + b, 0) : 0;
      h += '<details class="sbct-subj"' + (Object.keys(chs).length ? ' open data-keep-open' : '') + '><summary><input type="checkbox" data-act="subj" data-s="' + s + '"' + (chosen ? ' checked' : '') + ' aria-label="' + esc(sj.name) + '"> <span>' + esc(sj.name) + '</span><span class="sbct-n">' + cnt(s) + ' questions</span></summary><div class="sbct-chs">' + (rows || '<span class="sbct-avail">No chapter-wise questions yet.</span>') + (whole ? '<span class="sbct-avail">Another ' + whole + ' questions belong to the subject as a whole (not to one chapter).</span>' : '') + '</div></details>';
    });
    return h + '</section>';
  }
  function kindsHtml() {
    const av = available(), total = Object.values(av).reduce((a, b) => a + b, 0);
    const marks = Object.assign({}, INDEX.marks, S.marks);
    let h = '<section class="sbct-card"><h3><b>3</b> Questions to include</h3><div class="sbct-presets">' + PRESETS.map((p, i) => '<button type="button" class="sbct-mini" data-act="preset" data-i="' + i + '" title="' + esc(p[1]) + '">' + esc(p[0]) + '</button>').join('') + '<button type="button" class="sbct-mini" data-act="zero">Clear</button></div>';
    if (!subjIds().some(s => S.sel[s])) return h + '<div class="sbct-msg">Tick at least one subject above.</div></section>';
    h += '<div class="sbct-kinds"><div class="sbct-krow head"><span>Kind</span><span>How many</span><span>Marks each</span><span>Available</span></div>';
    KINDS.forEach(([k, name]) => {
      h += '<div class="sbct-krow"><span>' + esc(name) + '</span><input type="number" min="0" max="' + av[k] + '" value="' + (S.counts[k] || 0) + '" data-act="count" data-k="' + k + '" aria-label="How many ' + esc(name) + '"' + (av[k] ? '' : ' disabled') + '><input type="number" min="0" max="50" step="0.5" value="' + marks[k] + '" data-act="marks" data-k="' + k + '" aria-label="Marks for each ' + esc(name) + '"><span class="sbct-avail">' + av[k] + '</span></div>';
    });
    return h + '</div><div class="sbct-row"><label><input type="checkbox" data-act="onlyans"' + (S.onlyAnswered ? ' checked' : '') + '> Only questions that have a written answer</label><span class="sbct-avail">' + total + ' questions in this scope</span></div></section>';
  }
  function detailsHtml() {
    const n = Object.values(S.counts).reduce((a, b) => a + (b | 0), 0);
    return '<section class="sbct-card"><h3><b>4</b> Test details</h3><div class="sbct-row"><label>Name <input type="text" data-act="title" value="' + esc(S.title) + '" placeholder="e.g. Chapter 1 test" size="26"></label><label>Time (minutes) <input type="number" min="0" max="300" data-act="minutes" value="' + (S.minutes || '') + '" placeholder="auto" style="width:5.5rem"></label></div>' +
      '<div class="sbct-row"><label><input type="checkbox" data-act="shq"' + (S.shuffleQ ? ' checked' : '') + '> Mix the order of questions</label><label><input type="checkbox" data-act="sho"' + (S.shuffleO ? ' checked' : '') + '> Mix the options of MCQs</label><label><input type="checkbox" data-act="bi"' + (S.bilingual ? ' checked' : '') + '> Show the Urdu and Pashto lines under each question (where the book has them)</label><label><input type="checkbox" data-act="key"' + (S.key ? ' checked' : '') + '> Answer key page in the print-out</label></div>' +
      '<div class="sbct-row"><button type="button" class="sbct-btn go" data-act="create"' + (n ? '' : ' disabled') + '>Create the test</button>' + (n ? '' : '<span class="sbct-avail">Choose how many questions of at least one kind.</span>') + '</div></section>';
  }
  function mineHtml(st) {
    let h = '';
    if (st.saved.length) h += '<section class="sbct-card"><h3>💾 My saved tests</h3>' + st.saved.map(t => '<div class="sbct-row"><b>' + esc(t.title) + '</b><span class="sbct-avail">' + esc(t.scope) + ' · ' + t.items.length + ' questions · ' + totalMarks(t) + ' marks · ' + esc(t.created) + '</span><button type="button" class="sbct-mini" data-act="open" data-id="' + t.id + '">Open</button><button type="button" class="sbct-mini" data-act="del" data-id="' + t.id + '">Delete</button></div>').join('') + '</section>';
    if (st.history.length) h += '<section class="sbct-card"><h3>📊 My results</h3><table class="sbct-table"><tr><th>Test</th><th>Date</th><th>Score</th></tr>' + st.history.slice(0, 12).map(r => '<tr><td>' + esc(r.title) + '</td><td>' + esc(r.date) + '</td><td>' + r.got + ' / ' + r.total + ' (' + Math.round(100 * r.got / (r.total || 1)) + '%)</td></tr>').join('') + '</table></section>';
    return h;
  }

  function itemHtml(t, it, no, sec, opt) {
    const m = marksOf(t, it), sj = sh() && sh().subjects[it.s];
    const where = (sj ? sj.name : it.s) + (it.u >= 0 && sj ? ' · ' + chapterName(it.s, it.u).slice(0, 40) : '');
    return '<div class="sbct-item" data-i="' + opt.i + '">' + qHtml(t, it, no, {mark: opt.showKey}) +
      (opt.showKey ? '<div class="sbct-ans' + (it.y !== 'mcq' && it.y !== 'tf' && it.a === undefined ? ' none' : '') + '" dir="' + dirOf(String(answerText(it)) || it.q) + '"><b>Answer:</b> ' + (answerText(it) === '' ? '<i>not written in the books for this question' + (it.pg ? ' (see textbook page ' + esc(it.pg) + ')' : '') + '</i>' : ansFmt(answerText(it))) + (it.e && it.y !== 'tf' ? '<div class="sbct-alt">' + fmt(it.e) + '</div>' : '') + '</div>' : '') +
      '<div class="sbct-meta"><span class="sbct-chip">' + m + (m === 1 ? ' mark' : ' marks') + '</span><span>' + esc(where) + (it.pg ? ' · p. ' + esc(it.pg) : '') + '</span>' + (opt.edit ? '<button type="button" class="sbct-mini" data-act="swap" data-i="' + opt.i + '">⟳ Swap</button><button type="button" class="sbct-mini" data-act="drop" data-i="' + opt.i + '" style="margin-inline-start:.3rem">✕ Remove</button>' : '') + '</div></div>';
  }
  function previewHtml() {
    const t = S.test, secs = sections(t);
    let no = 0;
    let h = '<section class="sbct-hero"><h2>' + esc(t.title) + '</h2><p>' + esc(t.scope) + '</p></section>' +
      '<div class="sbct-sum"><span class="sbct-chip">' + t.items.length + ' questions</span><span class="sbct-chip">' + totalMarks(t) + ' marks</span><span class="sbct-chip">' + (t.minutes || defaultMinutes(t)) + ' minutes</span></div>' +
      '<div class="sbct-row"><button type="button" class="sbct-btn go" data-act="take">▶ Take the test now</button><button type="button" class="sbct-btn" data-act="print">🖨 Print / save as PDF</button><button type="button" class="sbct-btn alt" data-act="printkey">🖨 With the answer key</button><button type="button" class="sbct-btn alt" data-act="save">💾 Save</button><button type="button" class="sbct-btn alt" data-act="redo">🔁 New questions</button><button type="button" class="sbct-btn alt" data-act="back">✎ Change settings</button></div>' +
      (S.msg ? '<div class="sbct-msg" role="status">' + esc(S.msg) + '</div>' : '') +
      '<div class="sbct-row"><label><input type="checkbox" data-act="showkey"' + (S.showKey ? ' checked' : '') + '> Show the answers</label></div><div class="sbct-list">';
    secs.forEach(sec => {
      const mk = t.marks[sec.k] == null ? 1 : t.marks[sec.k];
      h += '<h3 class="sbct-sech">' + esc(KNAME[sec.k]) + ' <small>· ' + sec.list.length + ' × ' + mk + ' marks</small></h3>';
      let last = '';
      sec.list.forEach(({it, i}) => { no++; if (it.h && it.h !== last && sec.k !== 'mcq') h += '<p class="sbct-instr2" dir="' + dirOf(it.h) + '">' + fmt(it.h) + '</p>'; last = it.h || ''; h += itemHtml(t, it, no, sec, {i, showKey: S.showKey, edit: true}); });
    });
    return h + '</div>';
  }

  // ---------- taking the test ----------
  function startRun() {
    S.run = {answers: {}, self: {}, revealed: {}, started: Date.now(), left: (S.test.minutes || defaultMinutes(S.test)) * 60, done: false, timer: null};
    S.view = 'take'; paint(); window.scrollTo(0, 0);
  }
  function tick() {
    const R = S.run; if (!R || R.done) return;
    clearInterval(R.timer);
    const upd = () => { const el = document.getElementById('sbct-time'); if (!el) { clearInterval(R.timer); return; } const m = Math.floor(R.left / 60), s = R.left % 60; el.textContent = m + ':' + String(s).padStart(2, '0'); if (R.left <= 0) { clearInterval(R.timer); finish(true); } R.left--; };
    upd(); R.timer = setInterval(upd, 1000);
  }
  function takeHtml() {
    const t = S.test, R = S.run, secs = sections(t);
    let no = 0;
    let h = '<div class="sbct-timer"><span>' + esc(t.title) + '</span><span>⏱ <span id="sbct-time">–</span></span><button type="button" class="sbct-btn go" data-act="finish">Finish</button></div><div class="sbct-take">';
    secs.forEach(sec => {
      h += '<h3 class="sbct-sech">' + esc(KNAME[sec.k]) + '</h3>';
      let last = '';
      sec.list.forEach(({it, i}) => {
        no++;
        if (it.h && it.h !== last && sec.k !== 'mcq') h += '<p class="sbct-instr2" dir="' + dirOf(it.h) + '">' + fmt(it.h) + '</p>'; last = it.h || '';
        h += '<div class="sbct-item" data-i="' + i + '"><div class="sbct-qtext" dir="' + dirOf(it.q) + '"><span class="sbct-no">' + no + '.</span> ' + fmt(it.q) + '</div>';
        if (t.bilingual) [it.q2, it.q3].filter(Boolean).forEach(a => { h += '<div class="sbct-alt" dir="' + dirOf(a) + '">' + fmt(a) + '</div>'; });
        if (it.y === 'mcq') h += it.o.map((o, k) => '<label class="sbct-o" dir="' + dirOf(o) + '"><input type="radio" name="q' + i + '" data-act="pick" data-i="' + i + '" data-v="' + k + '"' + (R.answers[i] === k ? ' checked' : '') + '> <span><b>' + LETTER[k] + '.</b> ' + fmt(o) + '</span></label>').join('');
        else if (it.y === 'tf') h += ['True', 'False'].map((o, k) => '<label class="sbct-o"><input type="radio" name="q' + i + '" data-act="pick" data-i="' + i + '" data-v="' + k + '"' + (R.answers[i] === k ? ' checked' : '') + '> <span>' + o + '</span></label>').join('');
        else {
          h += '<textarea data-act="text" data-i="' + i + '" aria-label="Your answer" dir="auto" placeholder="Write your answer here (or on paper)">' + esc(R.answers[i] || '') + '</textarea>';
          h += '<div class="sbct-self"><button type="button" class="sbct-mini" data-act="reveal" data-i="' + i + '">Show the model answer</button></div><div data-reveal="' + i + '"></div>';
        }
        h += '</div>';
      });
    });
    return h + '</div><div class="sbct-row"><button type="button" class="sbct-btn go" data-act="finish">Finish and see my result</button></div>';
  }
  function reveal(i) {
    const t = S.test, it = t.items[i], R = S.run, box = document.querySelector('[data-reveal="' + i + '"]'); if (!box) return;
    const a = answerText(it);
    const m = marksOf(t, it);
    const self = [['full', 'I got it right (' + m + ')', m], ['half', 'Partly (' + m / 2 + ')', m / 2], ['none', 'Not right (0)', 0]];
    box.innerHTML = '<div class="sbct-ans' + (a === '' ? ' none' : '') + '" dir="' + dirOf(String(a) || it.q) + '"><b>Model answer:</b> ' + (a === '' ? '<i>the books do not give a written answer for this question' + (it.pg ? '; see textbook page ' + esc(it.pg) : '') + '. Mark yourself with your teacher or the book.</i>' : ansFmt(a)) + (it.e ? '<div class="sbct-alt">' + fmt(it.e) + '</div>' : '') + '</div><div class="sbct-self" role="group" aria-label="Mark yourself">' + self.map(x => '<button type="button" class="sbct-mini" data-act="self" data-i="' + i + '" data-v="' + x[2] + '" aria-pressed="' + (R.self[i] === x[2]) + '">' + x[1] + '</button>').join('') + '</div>';
    R.revealed[i] = true;
  }
  function score() {
    const t = S.test, R = S.run, by = {};
    let got = 0, total = 0, unmarked = 0;
    t.items.forEach((it, i) => {
      const m = marksOf(t, it); total += m;
      let g = 0, marked = true;
      if (it.y === 'mcq' || it.y === 'tf') g = R.answers[i] === it.a ? m : 0;
      else if (R.self[i] != null) g = R.self[i]; else { marked = false; unmarked++; }
      got += g;
      const sj = sh() && sh().subjects[it.s], key = (sj ? sj.name : it.s) + (it.u >= 0 && sj ? ' · ' + chapterName(it.s, it.u).slice(0, 36) : '');
      const b = by[key] = by[key] || {got: 0, total: 0, wrong: 0}; b.got += g; b.total += m; if (marked && g < m) b.wrong++;
    });
    return {got, total, unmarked, by};
  }
  function finish(timeUp) {
    const R = S.run; if (!R || R.done) return;
    const sc = score();
    if (!timeUp && sc.unmarked && !confirm(sc.unmarked + ' written question' + (sc.unmarked > 1 ? 's are' : ' is') + ' not marked yet; they count as 0. Finish anyway?')) return;
    R.done = true; clearInterval(R.timer);
    const st = store.read();
    st.history.unshift({id: S.test.id, title: S.test.title, date: new Date().toISOString().slice(0, 10), got: sc.got, total: sc.total, scope: S.test.scope});
    st.history = st.history.slice(0, 60); store.write(st);
    try { if (window.SBRewards && SBRewards.track) SBRewards.track('createTest', {got: sc.got, total: sc.total}); } catch (e) { /* rewards not loaded */ }
    S.view = 'result'; paint(); window.scrollTo(0, 0);
  }
  function resultHtml() {
    const t = S.test, R = S.run, sc = score(), pct = Math.round(100 * sc.got / (sc.total || 1));
    let h = '<section class="sbct-hero"><h2>Result: ' + esc(t.title) + '</h2><p>' + esc(t.scope) + '</p></section><div class="sbct-card"><div class="sbct-score">' + sc.got + ' / ' + sc.total + ' <small>(' + pct + '%)</small></div><div class="sbct-bar" aria-hidden="true"><i style="width:' + pct + '%"></i></div>' + (sc.unmarked ? '<p class="sbct-avail">' + sc.unmarked + ' written question(s) were not marked and count as 0.</p>' : '') + '</div>';
    h += '<div class="sbct-card"><h3>By subject and chapter</h3><table class="sbct-table"><tr><th>Where</th><th>Marks</th><th>Wrong</th></tr>' + Object.entries(sc.by).map(([k, v]) => '<tr><td>' + esc(k) + '</td><td>' + v.got + ' / ' + v.total + '</td><td>' + v.wrong + '</td></tr>').join('') + '</table></div>';
    const wrong = t.items.map((it, i) => ({it, i})).filter(({it, i}) => (it.y === 'mcq' || it.y === 'tf') ? R.answers[i] !== it.a : R.self[i] != null && R.self[i] < marksOf(t, it));
    h += '<div class="sbct-row"><button type="button" class="sbct-btn go" data-act="retry"' + (wrong.length ? '' : ' disabled') + '>Practise the ' + wrong.length + ' I got wrong</button><button type="button" class="sbct-btn alt" data-act="again">Take it again</button><button type="button" class="sbct-btn alt" data-act="back2">Back to the test</button><button type="button" class="sbct-btn alt" data-act="back">New test</button></div>';
    h += '<div class="sbct-card"><h3>Review</h3>';
    let no = 0;
    sections(t).forEach(sec => sec.list.forEach(({it, i}) => {
      no++;
      const mine = R.answers[i], isObj = it.y === 'mcq' || it.y === 'tf';
      h += '<div class="sbct-item">' + qHtml(t, it, no, {mark: true}) + (isObj ? '<div class="sbct-meta">' + (mine === undefined ? '<span class="sbct-chip" style="background:#fef3c7;color:#451a03">not answered</span>' : mine === it.a ? '<span class="sbct-chip" style="background:#dcfce7;color:#14532d">✓ right</span>' : '<span class="sbct-chip" style="background:#fee2e2;color:#7f1d1d">✕ your answer: ' + esc(it.y === 'mcq' ? LETTER[mine] : mine === 0 ? 'True' : 'False') + '</span>') + '</div>' : '') +
        '<div class="sbct-ans' + (answerText(it) === '' ? ' none' : '') + '" dir="' + dirOf(String(answerText(it)) || it.q) + '"><b>Answer:</b> ' + (answerText(it) === '' ? '<i>not written in the books' + (it.pg ? ' (see textbook page ' + esc(it.pg) + ')' : '') + '</i>' : ansFmt(answerText(it))) + (it.e ? '<div class="sbct-alt">' + fmt(it.e) + '</div>' : '') + '</div></div>';
    }));
    return h + '</div>';
  }

  // ---------- events ----------
  function wire(root) {
    if (!root) return;
    root.addEventListener('click', onClick);
    root.addEventListener('change', onChange);
    root.addEventListener('input', onInput);
  }
  function setClass(n) {
    S.cls = n; S.sel = {}; S.chapters = {}; S.topics = {}; S.general = null; S.counts = {}; S.error = '';
    loading = loadClass(n).then(() => { loading = null; }).catch(e => { loading = null; S.error = 'The questions of class ' + n + ' could not be loaded (' + e.message + '). Check the connection and try again.'; });
    paint();
    loading && loading.then(() => { try { if (S.view === 'setup') paint(); } catch (e) { /* page left */ } });
  }
  function applyPreset(p) { S.counts = {}; const av = available(); Object.keys(p).forEach(k => { S.counts[k] = Math.min(p[k], av[k] || 0); }); }
  function onClick(e) {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act, i = +b.dataset.i;
    if (act === 'cls') setClass(+b.dataset.n);
    else if (act === 'all') { const ids = subjIds(), all = ids.every(s => S.sel[s]); ids.forEach(s => { S.sel[s] = !all; }); S.chapters = {}; S.topics = {}; paint(); }
    else if (act === 'preset') { applyPreset(PRESETS[+b.dataset.i][2]); paint(); }
    else if (act === 'zero') { S.counts = {}; paint(); }
    else if (act === 'create') create();
    else if (act === 'take') startRun();
    else if (act === 'print') printNow(false);
    else if (act === 'printkey') printNow(true);
    else if (act === 'save') { const st = store.read(); st.saved = st.saved.filter(x => x.id !== S.test.id); st.saved.unshift(S.test); st.saved = st.saved.slice(0, 30); store.write(st); S.msg = 'Saved. It is under "My saved tests" on the first page.'; paint(); }
    else if (act === 'redo') { S.seed++; S.test = build(); S.msg = ''; paint(); }
    else if (act === 'back') { S.view = 'setup'; S.msg = ''; paint(); }
    else if (act === 'back2') { S.view = 'preview'; paint(); }
    else if (act === 'swap') swap(i);
    else if (act === 'drop') { S.test.items.splice(i, 1); paint(); }
    else if (act === 'open') { const t = store.read().saved.find(x => x.id === b.dataset.id); if (t) { S.test = t; S.cls = t.cls; S.msg = ''; S.view = 'preview'; loadClass(t.cls).then(paint).catch(paint); } }
    else if (act === 'del') { const st = store.read(); st.saved = st.saved.filter(x => x.id !== b.dataset.id); store.write(st); paint(); }
    else if (act === 'reveal') reveal(i);
    else if (act === 'self') { S.run.self[i] = +b.dataset.v; reveal(i); }
    else if (act === 'finish') finish(false);
    else if (act === 'again') startRun();
    else if (act === 'retry') { const R = S.run, t = S.test; const keep = t.items.filter((it, k) => (it.y === 'mcq' || it.y === 'tf') ? R.answers[k] !== it.a : R.self[k] != null && R.self[k] < marksOf(t, it)); S.test = Object.assign({}, t, {id: 't' + Date.now().toString(36), title: t.title + ' (mistakes)', items: keep}); startRun(); }
  }
  function onChange(e) {
    const el = e.target, act = el.dataset.act; if (!act) return;
    const s = el.dataset.s, u = el.dataset.u, p = el.dataset.p;
    if (act === 'subj') { S.sel[s] = el.checked; if (!el.checked) { delete S.chapters[s]; } paint(); }
    else if (act === 'ch') { S.chapters[s] = S.chapters[s] || {}; if (el.checked) { S.chapters[s][u] = true; S.sel[s] = true; } else { delete S.chapters[s][u]; delete S.topics[s + '|' + u]; } paint(); }
    else if (act === 'tp') { const k = s + '|' + u; S.topics[k] = S.topics[k] || {}; if (el.checked) S.topics[k][p] = true; else delete S.topics[k][p]; paint(); }
    else if (act === 'onlyans') { S.onlyAnswered = el.checked; paint(); }
    else if (act === 'shq') S.shuffleQ = el.checked; else if (act === 'sho') S.shuffleO = el.checked; else if (act === 'bi') S.bilingual = el.checked; else if (act === 'key') S.key = el.checked;
    else if (act === 'showkey') { S.showKey = el.checked; paint(); }
    else if (act === 'count') { const av = available(); S.counts[el.dataset.k] = Math.max(0, Math.min(+el.value || 0, av[el.dataset.k])); paint(); }
    else if (act === 'marks') { S.marks[el.dataset.k] = Math.max(0, +el.value || 0); }
    else if (act === 'pick') { S.run.answers[+el.dataset.i] = +el.dataset.v; }
  }
  function onInput(e) {
    const el = e.target, act = el.dataset.act;
    if (act === 'title') S.title = el.value; else if (act === 'minutes') S.minutes = Math.max(0, +el.value || 0); else if (act === 'text') S.run.answers[+el.dataset.i] = el.value;
  }
  function create() {
    const n = Object.values(S.counts).reduce((a, b) => a + (b | 0), 0); if (!n) return;
    if (!S.title) S.title = 'Class ' + S.cls + ' test';
    S.seed = (S.seed || 1) + 1; S.test = build(); S.msg = ''; S.showKey = false; S.view = 'preview'; paint(); window.scrollTo(0, 0);
    const short = Object.keys(S.counts).filter(k => (S.counts[k] | 0) > S.test.items.filter(it => it.y === k).length);
    if (short.length) { S.msg = 'Fewer questions than asked for were found for: ' + short.map(k => KNAME[k]).join(', ') + '.'; paint(); }
  }
  function swap(i) {        // another question of the same kind from the same scope, not already in the test
    const t = S.test, it = t.items[i], have = new Set(t.items.map(x => x.i));
    const r = rng(Date.now() & 0xffffff);
    const cands = shuffle(pool(it.y).filter(x => !have.has(x.i)), r);
    if (!cands.length) { S.msg = 'There is no other ' + KNAME[it.y].toLowerCase() + ' question in this scope.'; paint(); return; }
    t.items[i] = withOrder(cands[0], r); S.msg = ''; paint();
  }

  // ---------- page ----------
  function render() {
    try {
      state.page = 'create-test'; state.activeView = 'create-test';
      setActiveNav('create-test');
      setDashHeader('📝 Create Test', 'A test from the textbooks: a class, subjects, chapters or one topic');
      setBreadcrumb([{label: 'Home', onclick: () => { setActiveNav('home'); renderHome(); }}, {label: 'Create Test', active: true, onclick: () => { S.view = 'setup'; paint(); }}]);
    } catch (e) { /* app helpers missing: the page still draws */ }
    addCss();
    if (S.view === 'take' || S.view === 'result') S.view = S.test ? 'preview' : 'setup';
    paint();
    if (S.pending) { const o = S.pending; S.pending = null; S.title = ''; setClass(o.cls); loading && loading.then(() => { if (!sh() || !sh().subjects[o.s]) return; S.sel = {[o.s]: true}; S.chapters = o.u != null && o.u >= 0 ? {[o.s]: {[o.u]: true}} : {}; S.topics = {}; S.general = null; applyPreset({mcq: 5, short: 3, fill: 2}); paint(); }); window.scrollTo(0, 0); return; }
    loadIndex().then(() => { if (!S.cls) { let c = 0; try { const m = /^cls(\d+)$/.exec(state.selectedClass || ''); c = m ? +m[1] : 0; } catch (e) { c = 0; } if (c >= 1 && c <= 12 && INDEX.classes[c]) setClass(c); } else paint(); }).catch(e => { S.error = 'The question files could not be loaded (' + e.message + ').'; paint(); });
    window.scrollTo(0, 0);
  }
  // "Make a test on this chapter" (from the tutor): this class, this subject and chapter ticked, a short test ready to create
  function openWith(o) {
    S.pending = o; S.view = 'setup'; S.cls = 0;
    try { setActiveNav('create-test'); } catch (e) { /* no nav */ }
    render();
  }
  window.renderCreateTest = render;
  window.SBCreateTest = {open: render, openWith, state: S, build, score, paint};
})();
