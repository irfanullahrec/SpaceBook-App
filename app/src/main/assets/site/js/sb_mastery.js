/* sb_mastery.js — "Learn it, then prove it": the check at the end of a Study Plan task.
 *
 * When a student has read a lesson (or done a set of questions) the plan does not take their word for it: it asks questions from the book about that
 * very part (the Create Test question bank, content/testbank/). Every question that is answered wrongly comes back, and only those, round after round,
 * until a whole round is right. Only then is the task marked as learnt, and the record of how it went (rounds, mistakes fixed) is kept on the task.
 *
 *   MCQs and true/false mark themselves. Written questions (fill in, short, long, calculations ...) show the book's model answer and the student says
 *   whether they had it right - the same honest self-marking as Create Test. Nothing is invented: every question is a question of the books.
 *
 * Parts:  engine  (createRun: rounds, mistakes only, record - plain JavaScript, no page needed, tested in Node)
 *         picker  (pick: which questions belong to "lesson parts 3-5" or "SQs 6-10" of a chapter)
 *         overlay (open / checkTask: the full-screen check, on the website and in the app's WebView alike)
 * Public: window.SBMastery  (and module.exports in Node). Used by js/sb_study_plan.js. */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.SBMastery = api;
})(typeof window !== 'undefined' ? window : null, function (win) {
  'use strict';
  const BASE = 'content/testbank/';
  const AUTO = {mcq: true, tf: true};                    // marked by the page itself; every other kind is marked by the student against the model answer
  // which kinds of the bank answer which kind of plan work
  const KINDS = {
    read: ['mcq', 'tf', 'fill', 'short', 'num', 'lang'], slo: ['mcq', 'tf', 'short'],
    mcq: ['mcq'], tf: ['tf'], blank: ['fill'], match: ['task', 'lang'], sq: ['short'], lq: ['long'], num: ['num'], ex: ['lang', 'task', 'num', 'short', 'fill']
  };
  const FAMILY = ['mcq', 'tf', 'fill', 'short', 'long', 'num', 'lang', 'task'];
  const MAX_Q = 24, READ_MIN = 4, READ_MAX = 10, FALLBACK_Q = 8, MIN_Q = 2;
  const LETTER = ['A', 'B', 'C', 'D', 'E', 'F'];

  // ---------------------------------------------------------------- helpers
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const ARABIC = /[؀-ۿ]/g, LATIN = /[A-Za-z]/g;
  const dirOf = t => { const s = String(t || '').replace(/\$[^$]*\$/g, ' '); return (s.match(ARABIC) || []).length > (s.match(LATIN) || []).length ? 'rtl' : 'ltr'; };
  const fmt = t => { try { return win && win.MATH6_READER ? win.MATH6_READER.inline(String(t == null ? '' : t), false) : esc(t); } catch (e) { return esc(t); } };
  const ansFmt = t => { const s = String(t == null ? '' : t); if (!/(^|\s)•\s/.test(s)) return fmt(s); return s.split(/\s*•\s+/).map((x, k) => !x.trim() ? '' : (k === 0 ? '' : '• ') + fmt(x)).filter(Boolean).join('<br>'); };
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  function shuffle(list, rnd) { const a = list.slice(), r = rnd || Math.random; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  // k items spread evenly over a list (keeps the order)
  const evenly = (list, k) => { if (list.length <= k) return list.slice(); const out = []; for (let i = 0; i < k; i++) out.push(list[Math.floor(i * list.length / k)]); return out; };

  // a question the page can ask and, where it is not an MCQ / true-false, check against the book's own answer
  function usable(it) {
    if (!it || it.q == null || !String(it.q).trim()) return false;
    if (it.y === 'mcq') return Array.isArray(it.o) && it.o.length >= 2 && Number.isInteger(it.a) && it.a >= 0 && it.a < it.o.length;
    if (it.y === 'tf') return it.a === 0 || it.a === 1;
    return it.a !== undefined && it.a !== null && String(it.a).trim() !== '';
  }
  // an MCQ with its options in another order (the key moves with them), unless an option points at the others ("all of the above")
  function shuffleOptions(it, rnd) {
    if (it.y !== 'mcq' || it.o.some(o => /above|none of|all of|both|neither|\b[a-d]\s*(and|&)\s*[a-d]\b|مذکورہ|درج بالا|تمام|کوئی نہیں/i.test(o))) return Object.assign({}, it);
    const perm = shuffle(it.o.map((_, i) => i), rnd);
    return Object.assign({}, it, {o: perm.map(i => it.o[i]), a: perm.indexOf(it.a)});
  }

  // ---------------------------------------------------------------- engine
  /* A run of a check. items: [{id, y, q, o?, a, e?, ...}]. Round 1 asks everything in a new order; after each round the ones answered wrongly are
   * asked again, and only those, until a round has no mistake. phase: 'ask' | 'roundEnd' | 'passed'. */
  function createRun(items, o) {
    o = o || {};
    const rnd = o.rng || Math.random;
    const byId = {}, log = {};
    items.forEach(it => { byId[it.id] = it; log[it.id] = {tries: 0, wrong: 0}; });
    const R = {round: 1, pos: 0, queue: shuffle(items.map(it => it.id), rnd), wrongNow: [], lastWrong: [], rounds: [], phase: items.length ? 'ask' : 'passed', answered: false, startedAt: Date.now()};
    return {
      get phase() { return R.phase; },
      get round() { return R.round; },
      get total() { return R.queue.length; },
      get position() { return R.pos; },
      get answered() { return R.answered; },
      current() { return R.phase === 'ask' ? byId[R.queue[R.pos]] : null; },
      // the answer to the question on screen was right (true) or wrong (false)
      answer(correct) {
        if (R.phase !== 'ask' || R.answered) return false;
        const l = log[R.queue[R.pos]]; l.tries++;
        if (!correct) { l.wrong++; R.wrongNow.push(R.queue[R.pos]); }
        R.answered = true; return true;
      },
      next() {
        if (R.phase !== 'ask' || !R.answered) return R.phase;
        R.answered = false; R.pos++;
        if (R.pos >= R.queue.length) {
          R.rounds.push({n: R.round, asked: R.queue.length, wrong: R.wrongNow.length});
          R.lastWrong = R.wrongNow.slice();
          R.phase = R.wrongNow.length ? 'roundEnd' : 'passed';
        }
        return R.phase;
      },
      mistakes() { return R.lastWrong.map(id => byId[id]); },
      lastRound() { return R.rounds[R.rounds.length - 1] || null; },
      // after a round with mistakes: a new round with those questions only
      retry() { if (R.phase !== 'roundEnd') return false; R.round++; R.queue = shuffle(R.lastWrong, rnd); R.pos = 0; R.wrongNow = []; R.answered = false; R.phase = 'ask'; return true; },
      // what is kept on the task once it is passed
      record() {
        const asked = items.length, first = items.filter(it => log[it.id].wrong === 0).length, auto = items.filter(it => AUTO[it.y]).length;
        return {at: Date.now(), mode: 'check', rounds: R.rounds.length, asked, first, fixed: asked - first, wrong: items.reduce((a, it) => a + log[it.id].wrong, 0),
          auto, self: asked - auto, missed: items.filter(it => log[it.id].wrong > 0).map(it => it.id), secs: Math.round((Date.now() - R.startedAt) / 1000)};
      }
    };
  }

  // ---------------------------------------------------------------- picker
  /* The questions that belong to one task of a plan.
   *   shard   a class file of the bank ({subjects, items});  counts  the plan index's counts of that chapter ({read, mcq, sq ...});
   *   task    {s: subject id, ch: chapter number, cat, a, b, n}  (items a..b of the chapter's `n` ... as the plan numbers them)
   * "Lesson parts a-b" are mapped on the chapter's topics in proportion; the other kinds take the matching share of the chapter's questions of that kind.
   * If the books hold nothing of that kind for the chapter the check falls back to the chapter's other questions and says so (fallback: true). */
  function pick(shard, counts, task, rnd) {
    const subj = shard && shard.subjects && shard.subjects[task.s];
    const topics = subj && subj.topics && subj.topics[task.ch] ? subj.topics[task.ch] : [];
    const all = (shard && shard.items ? shard.items : []).filter(it => it.s === task.s && it.u === task.ch && usable(it));
    const cat = KINDS[task.cat] ? task.cat : 'ex';
    const a = Math.max(1, task.a || 1), b = Math.max(a, task.b || (a + (task.n || 1) - 1)), n = b - a + 1;
    const view = it => Object.assign({}, it, {id: it.s + ':' + (it.i || all.indexOf(it)), topic: it.p >= 0 && topics[it.p] ? String(topics[it.p]) : ''});
    const done = (list, extra) => { const items = evenly(list, MAX_Q).map(view); return Object.assign({items, have: all.length, fallback: false, scope: 'part'}, extra || {}); };
    if (!all.length) return {items: [], have: 0, fallback: false, scope: 'none'};

    if (cat === 'read') {
      const R = Math.max(1, (counts && counts.read) || 1), T = topics.length;
      const t0 = T ? clamp(Math.floor((a - 1) * T / R), 0, T - 1) : 0, t1 = T ? clamp(Math.max(t0, Math.ceil(b * T / R) - 1), t0, T - 1) : -1;
      const inRange = T ? all.filter(it => it.p >= t0 && it.p <= t1) : [];
      const want = clamp(2 * n, READ_MIN, READ_MAX);
      const spread = list => {                                      // one question from each topic in turn
        const groups = new Map(); list.forEach(it => { if (!groups.has(it.p)) groups.set(it.p, []); groups.get(it.p).push(it); });
        const out = []; for (let r = 0; out.length < want; r++) { let any = false; groups.forEach(g => { if (g[r] && out.length < want) { out.push(g[r]); any = true; } }); if (!any) break; }
        return out;
      };
      const autoIn = inRange.filter(it => AUTO[it.y]), selfIn = inRange.filter(it => !AUTO[it.y]);
      let chosen = autoIn.length >= 3 ? spread(autoIn) : autoIn.concat(spread(selfIn).slice(0, Math.max(0, want - autoIn.length)));
      let scope = 'part';
      if (chosen.length < 3) {                                      // too little about these parts: the chapter's own questions, auto-marked ones first
        const rest = all.filter(it => chosen.indexOf(it) < 0);
        chosen = chosen.concat(rest.filter(it => AUTO[it.y]), rest.filter(it => !AUTO[it.y])).slice(0, want); scope = 'chapter';
      }
      const r = done(chosen); r.scope = scope; r.fallback = scope === 'chapter'; return r;
    }

    const kinds = KINDS[cat];
    const list = all.filter(it => kinds.indexOf(it.y) >= 0);
    if (list.length) {
      // the plan counted `total` items of this kind in the chapter, the book holds list.length of them: the tasks 1-5, 6-10 ... share the list in the
      // same proportion, with one rounding for both ends so neighbouring tasks meet exactly (nothing asked twice, nothing left out)
      const total = Math.max(1, (counts && counts[cat]) || list.length);
      const bound = x => Math.round(x * list.length / total);
      const s0 = clamp(bound(a - 1), 0, list.length), s1 = clamp(bound(Math.min(b, total)), 0, list.length);
      let part = list.slice(s0, s1 > s0 ? s1 : s0 + 1);
      if (!part.length) part = list.slice(-Math.min(n, list.length));
      return done(part);
    }
    // the books hold no question of this kind for the chapter: ask about the chapter instead (auto-marked ones first)
    const pool = all.filter(it => FAMILY.indexOf(it.y) >= 0);
    const auto = pool.filter(it => AUTO[it.y]), self = pool.filter(it => !AUTO[it.y]);
    const items = (auto.length >= 3 ? auto : auto.concat(self)).slice(0, clamp(n, MIN_Q, FALLBACK_Q));
    return Object.assign(done(items), {fallback: true, scope: 'chapter'});
  }

  // ---------------------------------------------------------------- the bank
  let INDEX = null;
  const SHARDS = {};
  const getJson = url => fetch(url).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  function loadShard(n) {
    if (SHARDS[n]) return SHARDS[n];
    const p = (INDEX ? Promise.resolve(INDEX) : getJson(BASE + 'index.json').then(j => (INDEX = j)))
      .then(ix => { const c = ix.classes[n]; if (!c) throw new Error('There are no questions for class ' + n + ' yet.'); return getJson(BASE + c.file + '?v=' + c.h); });
    SHARDS[n] = p; p.catch(() => { if (SHARDS[n] === p) delete SHARDS[n]; });
    return p;
  }
  // spec: {classNum, task, counts}  ->  Promise of pick()'s result
  const forTask = spec => loadShard(spec.classNum).then(shard => pick(shard, spec.counts || {}, spec.task));

  // ---------------------------------------------------------------- the overlay
  const CSS = `
#sbm{position:fixed;inset:0;z-index:10060;background:rgba(15,23,42,.62);display:flex;align-items:flex-end;justify-content:center;font-family:inherit;color:#0f172a;-webkit-tap-highlight-color:transparent}
#sbm *{box-sizing:border-box}
.sbm-card{background:#fff;width:min(680px,100%);max-height:96%;border-radius:22px 22px 0 0;display:flex;flex-direction:column;box-shadow:0 -12px 40px -10px rgba(15,23,42,.45);outline:0}
@media (min-width:700px){#sbm{align-items:center}.sbm-card{border-radius:22px;max-height:90%}}
.sbm-head{display:flex;align-items:center;gap:.6rem;padding:.8rem .9rem .5rem 1.1rem}
.sbm-ttl{flex:1;min-width:0}.sbm-ttl b{display:block;font-size:1.02rem;line-height:1.25}.sbm-ttl span{display:block;font-size:.8rem;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sbm-x{border:0;background:#f1f5f9;border-radius:50%;width:36px;height:36px;font-size:1.3rem;line-height:1;cursor:pointer;color:#334155;flex:none}
.sbm-prog{padding:0 1.1rem .5rem}.sbm-prog small{display:flex;justify-content:space-between;font-size:.8rem;color:#475569;margin-bottom:.3rem}
.sbm-bar{height:7px;border-radius:99px;background:#e2e8f0;overflow:hidden}.sbm-bar i{display:block;height:100%;background:linear-gradient(90deg,#0284c7,#22c55e);border-radius:99px;transition:width .25s}
.sbm-body{padding:.4rem 1.1rem 1.1rem;overflow:auto;-webkit-overflow-scrolling:touch}
.sbm-topic{margin:.2rem 0 .1rem;font-size:.78rem;color:#0369a1;font-weight:700}
.sbm-instr{margin:.2rem 0 .3rem;font-size:.9rem;color:#475569}
.sbm-q{font-size:1.1rem;line-height:1.65;font-weight:650;margin:.35rem 0 .8rem;overflow-wrap:anywhere}
.sbm-opts{display:grid;gap:.5rem}
.sbm-opt{display:flex;gap:.6rem;align-items:flex-start;text-align:start;width:100%;font:inherit;font-size:1rem;line-height:1.5;padding:.7rem .8rem;border:2px solid #cbd5e1;border-radius:14px;background:#f8fafc;color:#0f172a;cursor:pointer;min-height:48px}
.sbm-opt b{flex:none;width:1.7rem;height:1.7rem;border-radius:50%;background:#e0f2fe;color:#075985;display:inline-flex;align-items:center;justify-content:center;font-size:.85rem}
.sbm-opt:hover:not([disabled]){border-color:#0284c7;background:#f0f9ff}.sbm-opt[disabled]{cursor:default}
.sbm-opt.right{border-color:#15803d;background:#dcfce7}.sbm-opt.right b{background:#15803d;color:#fff}.sbm-opt.wrong{border-color:#b91c1c;background:#fee2e2}.sbm-opt.wrong b{background:#b91c1c;color:#fff}
.sbm-tf{grid-template-columns:1fr 1fr}
.sbm-fb{margin:.8rem 0 .2rem;padding:.75rem .9rem;border-radius:14px;line-height:1.6;font-size:.98rem}
.sbm-fb.ok{background:#dcfce7;color:#14532d}.sbm-fb.no{background:#fee2e2;color:#7f1d1d}.sbm-fb small{display:block;margin-top:.3rem;color:inherit;opacity:.85}
.sbm-ans{margin:.6rem 0;padding:.75rem .9rem;border-radius:14px;background:#f1f5f9;line-height:1.7;overflow-wrap:anywhere}.sbm-ans b{color:#075985}
.sbm-note{font-size:.85rem;color:#64748b;line-height:1.5;margin:.4rem 0}
.sbm-ta{width:100%;min-height:76px;font:inherit;padding:.6rem .7rem;border:2px solid #cbd5e1;border-radius:12px;resize:vertical;margin:.2rem 0 .5rem}
.sbm-row{display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.9rem}
.sbm-btn{font:inherit;font-weight:800;font-size:1rem;padding:.75rem 1.1rem;border-radius:14px;border:2px solid #0284c7;background:#0284c7;color:#fff;cursor:pointer;min-height:48px;flex:1 1 auto}
.sbm-btn.alt{background:#fff;color:#0369a1}.sbm-btn.good{background:#15803d;border-color:#15803d}.sbm-btn.bad{background:#fff;color:#b91c1c;border-color:#b91c1c}
.sbm-link{background:none;border:0;font:inherit;font-size:.88rem;color:#475569;text-decoration:underline;cursor:pointer;padding:.5rem .2rem;min-height:40px}
.sbm-big{font-size:2.4rem;text-align:center;margin:.4rem 0}.sbm-h{font-size:1.25rem;font-weight:800;text-align:center;margin:.1rem 0 .3rem}.sbm-sub{text-align:center;color:#475569;line-height:1.6;margin:.2rem 0 .6rem}
.sbm-mis{margin:.7rem 0;display:grid;gap:.5rem}.sbm-mis div{padding:.6rem .8rem;border-radius:12px;background:#fff7ed;border:1px solid #fed7aa;line-height:1.55;overflow-wrap:anywhere}.sbm-mis small{display:block;color:#9a3412;margin-top:.2rem}
.sbm-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin:.7rem 0}.sbm-stats div{background:#f0f9ff;border-radius:12px;padding:.55rem .3rem;text-align:center}.sbm-stats b{display:block;font-size:1.3rem;color:#0369a1}.sbm-stats span{font-size:.75rem;color:#475569}
body.sbm-lock{overflow:hidden}
@media print{#sbm{display:none}}`;
  function addCss() { if (typeof document === 'undefined' || document.getElementById('sbm-css')) return; const s = document.createElement('style'); s.id = 'sbm-css'; s.textContent = CSS; document.head.appendChild(s); }

  const S = {el: null, run: null, o: null, resolve: null, view: '', picked: null, finished: false, chosen: null, revealed: false, items: [], done: false, error: ''};

  function qHtml(it) {
    let h = '';
    if (it.topic) h += '<p class="sbm-topic">' + esc(it.topic) + '</p>';
    if (it.h && it.y !== 'mcq') h += '<p class="sbm-instr" dir="' + dirOf(it.h) + '">' + fmt(it.h) + '</p>';
    return h + '<div class="sbm-q" dir="' + dirOf(it.q) + '">' + fmt(it.q) + '</div>';
  }
  const answerOf = it => it.y === 'mcq' ? LETTER[it.a] + '. ' + it.o[it.a] : it.y === 'tf' ? (it.a === 0 ? 'True' : 'False') : String(it.a);
  const shortQ = t => { const s = String(t || '').replace(/\$[^$]*\$/g, '…').replace(/\s+/g, ' ').trim(); return s.length > 120 ? s.slice(0, 117) + '…' : s; };

  function bodyHtml() {
    const o = S.o, run = S.run;
    if (S.view === 'loading') return '<div class="sbm-big" aria-hidden="true">📚</div><p class="sbm-sub" role="status">Getting your questions from the book…</p>';
    if (S.view === 'error') return '<div class="sbm-big" aria-hidden="true">📡</div><p class="sbm-h">The questions did not load</p><p class="sbm-sub">' + esc(S.error) + '</p><div class="sbm-row"><button type="button" class="sbm-btn" data-a="retryload" data-focus>Try again</button><button type="button" class="sbm-btn alt" data-a="self">I have learnt it — mark it myself</button></div><div class="sbm-row"><button type="button" class="sbm-link" data-a="close">Close</button></div>';
    if (S.view === 'none') return '<div class="sbm-big" aria-hidden="true">📖</div><p class="sbm-h">No test questions for this part yet</p><p class="sbm-sub">The books have no question that can check this task. Read it carefully, and mark it as learnt yourself when you are sure.</p><div class="sbm-row"><button type="button" class="sbm-btn good" data-a="self" data-focus>✔ I have learnt it</button><button type="button" class="sbm-btn alt" data-a="close">Not yet</button></div>';
    if (S.view === 'intro') {
      const p = S.picked, auto = p.items.filter(it => AUTO[it.y]).length, self = p.items.length - auto;
      return '<div class="sbm-big" aria-hidden="true">🧠</div><p class="sbm-h">Show that you have learnt it</p><p class="sbm-sub"><b>' + p.items.length + ' question' + (p.items.length > 1 ? 's' : '') + '</b> from your book. Answer them; the ones you miss come back — only those — until you get every one right. Then this is marked as learnt.</p>' +
        (p.fallback ? '<p class="sbm-note">The books have no questions for exactly this part, so you are asked about the chapter.</p>' : '') +
        (self ? '<p class="sbm-note">' + (auto ? auto + ' mark themselves. ' : '') + self + ' ' + (self > 1 ? 'are written: you see the book\'s answer and tell us if you had it right.' : 'is written: you see the book\'s answer and tell us if you had it right.') + '</p>' : '') +
        '<div class="sbm-row"><button type="button" class="sbm-btn" data-a="start" data-focus>Start ▶</button></div><div class="sbm-row"><button type="button" class="sbm-link" data-a="self">Skip the questions — I will mark it myself</button></div>';
    }
    if (run.phase === 'roundEnd') {
      const r = run.lastRound(), mis = run.mistakes();
      return '<div class="sbm-big" aria-hidden="true">' + (mis.length === r.asked ? '🔁' : '💪') + '</div><p class="sbm-h">' + (r.asked - r.wrong) + ' of ' + r.asked + ' right</p><p class="sbm-sub">' + (mis.length > 1 ? 'These ' + mis.length + ' need another try.' : 'This one needs another try.') + ' Only these come back.</p>' +
        '<div class="sbm-mis">' + mis.map(it => '<div><span dir="' + dirOf(it.q) + '">' + esc(shortQ(it.q)) + '</span><small>Answer: ' + esc(shortQ(answerOf(it))) + '</small></div>').join('') + '</div>' +
        '<div class="sbm-row"><button type="button" class="sbm-btn" data-a="retry" data-focus>Try ' + (mis.length > 1 ? 'these ' + mis.length : 'it') + ' again ▶</button></div>';
    }
    if (run.phase === 'passed') {
      const rec = S.record;
      return '<div class="sbm-big" aria-hidden="true">🎉</div><p class="sbm-h">You have learnt it!</p><p class="sbm-sub">Every question is right' + (rec.rounds > 1 ? ' after ' + rec.rounds + ' rounds' : ' at the first try') + '. This is marked as learnt, and the record is kept.</p>' +
        '<div class="sbm-stats"><div><b>' + rec.asked + '</b><span>questions</span></div><div><b>' + rec.first + '</b><span>right first time</span></div><div><b>' + rec.fixed + '</b><span>mistakes put right</span></div></div>' +
        '<div class="sbm-row"><button type="button" class="sbm-btn good" data-a="close" data-focus>Done</button>' + (S.o.planLabel ? '<button type="button" class="sbm-btn alt" data-a="plan">' + esc(S.o.planLabel) + '</button>' : '') + '</div>';
    }
    // a question
    const it = run.current(); if (!it) return '';
    let h = qHtml(it);
    const showKey = run.answered;
    if (it.y === 'mcq') {
      h += '<div class="sbm-opts" role="group" aria-label="Choose the answer">' + it.o.map((t, k) => {
        const cls = showKey ? (k === it.a ? ' right' : (k === S.chosen ? ' wrong' : '')) : '';
        return '<button type="button" class="sbm-opt' + cls + '" data-a="pick" data-v="' + k + '"' + (showKey ? ' disabled' : '') + ' dir="' + dirOf(t) + '"' + (k === 0 && !showKey ? ' data-focus' : '') + '><b>' + LETTER[k] + '</b><span>' + fmt(t) + '</span></button>';
      }).join('') + '</div>';
    } else if (it.y === 'tf') {
      h += '<div class="sbm-opts sbm-tf" role="group" aria-label="True or false">' + ['True', 'False'].map((t, k) => {
        const cls = showKey ? (k === it.a ? ' right' : (k === S.chosen ? ' wrong' : '')) : '';
        return '<button type="button" class="sbm-opt' + cls + '" data-a="pick" data-v="' + k + '"' + (showKey ? ' disabled' : '') + (k === 0 && !showKey ? ' data-focus' : '') + '><span>' + t + '</span></button>';
      }).join('') + '</div>';
    } else if (!S.revealed) {
      h += '<textarea class="sbm-ta" dir="auto" aria-label="Your answer" placeholder="Write your answer here, or on paper — then look at the book\'s answer"></textarea><div class="sbm-row"><button type="button" class="sbm-btn" data-a="reveal" data-focus>Show the book\'s answer</button></div>';
    } else {
      h += '<div class="sbm-ans" dir="' + dirOf(String(it.a)) + '"><b>The book\'s answer:</b> ' + ansFmt(it.a) + (it.e ? '<div class="sbm-note">' + fmt(it.e) + '</div>' : '') + '</div><p class="sbm-note">Be honest: did you have it right?</p><div class="sbm-row"><button type="button" class="sbm-btn good" data-a="self-right" data-focus>✅ I had it right</button><button type="button" class="sbm-btn bad" data-a="self-wrong">❌ Not yet</button></div>';
    }
    if (showKey && (it.y === 'mcq' || it.y === 'tf')) {
      const ok = S.chosen === it.a;
      h += '<div class="sbm-fb ' + (ok ? 'ok' : 'no') + '" role="status"><b>' + (ok ? '✅ Right!' : '✖ Not quite.') + '</b>' + (ok ? '' : ' The answer is <b dir="' + dirOf(answerOf(it)) + '">' + fmt(answerOf(it)) + '</b>.') + (it.e ? '<small>' + fmt(it.e) + '</small>' : '') + (ok ? '' : '<small>It comes back in the next round.</small>') + '</div>' +
        '<div class="sbm-row"><button type="button" class="sbm-btn" data-a="next" data-focus>' + (run.position + 1 >= run.total ? 'See the result ▶' : 'Next ▶') + '</button></div>';
    }
    return h;
  }

  function paint() {
    if (!S.el) return;
    const run = S.run, card = S.el.querySelector('.sbm-card');
    const prog = S.el.querySelector('.sbm-prog');
    if (run && S.view === 'run' && run.phase === 'ask') {
      prog.hidden = false;
      prog.innerHTML = '<small><span>Round ' + run.round + (run.round > 1 ? ' · only what you missed' : '') + '</span><span>Question ' + (run.position + 1) + ' of ' + run.total + '</span></small><div class="sbm-bar" aria-hidden="true"><i style="width:' + Math.round(100 * (run.position + (run.answered ? 1 : 0)) / run.total) + '%"></i></div>';
    } else prog.hidden = true;
    S.el.querySelector('.sbm-body').innerHTML = bodyHtml();
    // the buttons and headings of the sheet are not words to look up; the question, its options and the answers are (the word-meaning cards stay there)
    S.el.querySelectorAll('.sbm-head, .sbm-prog, .sbm-row, .sbm-h, .sbm-sub, .sbm-big, .sbm-stats, .sbm-note').forEach(e => e.setAttribute('data-no-translate', ''));
    const f = S.el.querySelector('[data-focus]'); if (f) { try { f.focus({preventScroll: true}); } catch (e) { /* hidden */ } } else card.focus();
    S.el.querySelector('.sbm-body').scrollTop = 0;
  }

  function finish(status, extra) {
    if (S.done) return; S.done = true;
    if (typeof document !== 'undefined') { document.body.classList.remove('sbm-lock'); document.removeEventListener('keydown', onKey, true); if (S.el) S.el.remove(); }
    const res = Object.assign({status: status, record: status === 'passed' ? S.record : status === 'self' ? {at: Date.now(), mode: 'self'} : null}, extra || {});
    S.el = null; const r = S.resolve; S.resolve = null; if (r) r(res);
  }
  function leave() {
    if (S.view === 'run' && S.run && S.run.phase !== 'passed' && !confirm('Leave the check? The task is only marked as learnt when you pass it.')) return;
    finish(S.record ? 'passed' : 'cancel');
  }
  function onKey(e) {
    if (!S.el) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); leave(); return; }
    if (e.key === 'Tab') {                                          // keep the focus inside the sheet
      const f = [...S.el.querySelectorAll('button:not([disabled]),textarea')].filter(x => x.offsetParent !== null); if (!f.length) return;
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && (i === f.length - 1)) { e.preventDefault(); f[0].focus(); }
      return;
    }
    if (S.view !== 'run' || !S.run || S.run.phase !== 'ask' || e.target.tagName === 'TEXTAREA') return;
    const it = S.run.current(); if (!it) return;
    if (!S.run.answered && (it.y === 'mcq' || it.y === 'tf')) { const k = '1234567'.indexOf(e.key), k2 = 'abcdef'.indexOf(String(e.key).toLowerCase()); const v = k >= 0 ? k : k2; if (v >= 0 && v < (it.y === 'tf' ? 2 : it.o.length)) { e.preventDefault(); choose(v); } }
    else if (S.run.answered && (e.key === 'Enter' || e.key === 'ArrowRight')) { e.preventDefault(); advance(); }
  }
  // Question 51 of the Study Plan needs a Student plan for the class: the server counts the free 50 (api/lib/billing.php; js/sb_access.js)
  function spend(it, go) {
    const A = typeof window !== 'undefined' && window.SBAccess;
    if (!A) return go();
    const ctx = {cls: (S.o && S.o.cls) || ''};
    if (A.unlimited('plan_q', ctx)) return go();
    if (S.gating) return;
    S.gating = true;
    const run = S.run;
    A.useQuestion('plan_q', String(it.id != null ? it.id : it.q).slice(0, 80), ctx).then(r => {
      S.gating = false;
      if (S.run !== run || S.done) return;
      if (r.allowed) go(); else A.paywall('plan_q', ctx);
    });
  }
  function choose(v) {
    const run = S.run, it = run && run.current(); if (!it || run.answered) return;
    spend(it, () => { S.chosen = v; run.answer(v === it.a); paint(); });
  }
  function advance() {
    const run = S.run; if (!run) return;
    const before = run.phase; run.next(); S.chosen = null; S.revealed = false;
    if (before === 'ask' && run.phase === 'passed') { S.record = run.record(); if (S.o.onPass) { try { S.o.onPass(S.record); } catch (e) { /* the plan page keeps working */ } } }
    paint();
  }
  function begin() {
    S.run = createRun(S.picked.items.map(it => shuffleOptions(it)));
    S.view = 'run'; S.chosen = null; S.revealed = false; S.record = null; paint();
  }
  function onClick(e) {
    const b = e.target.closest('[data-a]'); if (!b) return;
    const a = b.dataset.a;
    if (a === 'pick') choose(+b.dataset.v);
    else if (a === 'next') advance();
    else if (a === 'reveal') { S.revealed = true; paint(); }
    else if (a === 'self-right' || a === 'self-wrong') { const it = S.run.current(); if (S.run.answered) advance(); else spend(it, () => { S.run.answer(a === 'self-right'); advance(); }); }
    else if (a === 'retry') { S.run.retry(); S.chosen = null; S.revealed = false; paint(); }
    else if (a === 'start') begin();
    else if (a === 'retryload') load();
    else if (a === 'self') { if (S.o.onSelf) { try { S.o.onSelf(); } catch (er) { /* fine */ } } finish('self'); }
    else if (a === 'plan') finish('passed', {goPlan: true});
    else if (a === 'close') { if (S.view === 'run' && S.run && S.run.phase === 'passed') finish('passed'); else leave(); }
  }
  function load() {
    S.view = 'loading'; S.error = ''; paint();
    Promise.resolve().then(() => S.o.getItems()).then(p => {
      if (S.done) return;
      S.picked = p;
      if (!p || p.items.length < MIN_Q) { S.view = 'none'; paint(); return; }
      S.view = 'intro'; paint();
    }).catch(err => { if (S.done) return; S.view = 'error'; S.error = (err && err.message) || 'No connection.'; paint(); });
  }

  /* Opens the check. o: {title, sub, getItems: () => Promise of pick()'s result, onPass(record), onSelf(), planLabel}.
   * Resolves {status: 'passed' | 'self' | 'cancel', record, goPlan?} when the sheet closes. */
  function open(o) {
    addCss();
    document.querySelectorAll('.ut-root.ut-show').forEach(c => c.classList.remove('ut-show'));     // a word-meaning card left open by the page under the sheet
    if (S.el && !S.done) finish('cancel');
    Object.assign(S, {o: o, run: null, view: '', picked: null, done: false, chosen: null, revealed: false, record: null, error: ''});
    const el = document.createElement('div'); el.id = 'sbm'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'sbm-t');
    el.innerHTML = '<div class="sbm-card" tabindex="-1"><div class="sbm-head"><div class="sbm-ttl"><b id="sbm-t">🧠 ' + esc(o.title || 'Check') + '</b><span>' + esc(o.sub || '') + '</span></div><button type="button" class="sbm-x" data-a="close" aria-label="Close">×</button></div><div class="sbm-prog" hidden></div><div class="sbm-body" aria-live="polite"></div></div>';
    el.addEventListener('click', e => { if (e.target === el) leave(); else onClick(e); });
    document.body.appendChild(el); document.body.classList.add('sbm-lock'); document.addEventListener('keydown', onKey, true);
    S.el = el;
    const done = new Promise(res => { S.resolve = res; });
    load();
    return done;
  }

  /* The check of one plan task. spec: {classNum, task, counts, title, sub, onPass, onSelf, planLabel}. */
  function checkTask(spec) {
    return open({title: spec.title, sub: spec.sub, planLabel: spec.planLabel, cls: spec.classNum ? 'cls' + spec.classNum : '', onPass: spec.onPass, onSelf: spec.onSelf, getItems: () => forTask(spec)});
  }

  return {
    engine: {createRun, shuffleOptions, shuffle, usable, evenly},
    pick, forTask, loadShard, open, checkTask,
    state: S,
    config: {MAX_Q, READ_MIN, READ_MAX, FALLBACK_Q, MIN_Q, KINDS, AUTO}
  };
});
