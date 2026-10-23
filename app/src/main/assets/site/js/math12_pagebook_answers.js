/* Class 12 Maths page book: attach the worked solutions and answers of the exercise bank (MATH_12_DATA, problems[].steps/answer)
 * to the matching page-book questions, so "Show answers & solutions" has something to show.
 * Page-book exercise "3.1" <-> bank "Exercise 3.1"; "Review 3" <-> bank "Review Exercise 3"; questions match by number. */
(function () {
  'use strict';
  const PB = window.CLS12_BOOKS && window.CLS12_BOOKS.math, BANK = window.MATH_12_DATA;
  if (!PB || !PB.units || !Array.isArray(BANK)) return;
  const SOL = window.CLS6_SOLUTIONS = window.CLS6_SOLUTIONS || {};
  // the bank writes maths as \( .. \); the book reader typesets $ .. $
  const tex = s => String(s == null ? '' : s).replace(/\\\((.+?)\\\)/g, '$$$1$$');
  const exKey = t => { const m = /^(?:Review Exercise|Review)\s+(\d+)$/i.exec(t) || /^Exercise\s+(\d+(?:\.\d+)?)$/i.exec(t); return m ? (/^Review/i.test(t) ? 'R' : '') + m[1] : null; };
  const bankFor = new Map();
  BANK.forEach(ch => (ch.exercises || []).forEach(ex => { const k = exKey(String(ex.title || ex.exercise || '').trim()); if (k) bankFor.set(k, ex); }));
  // "(a) .. (b) .." bank steps/answers -> one solution per part; steps before the first marker are shared by all parts,
  // unmarked steps after a marker continue that part. Returns null unless every part is found.
  const LET = /^\(?([a-z])\)\s*/i;
  const splitParts = (q, steps, answer) => {
    const parts = q.parts || [];
    if (parts.length < 2) return null;
    const key = pt => String(pt.no || '').replace(/[.)\s]/g, '').toLowerCase();
    const keys = parts.map(key);
    if (keys.some(k => !/^[a-z]$/.test(k))) return null;
    const shared = [], by = {};
    let cur = null;
    // a step may carry several parts: "(c) ... (d) ..." -> one piece each
    const pieces = [];
    steps.forEach(s => s.split(/\s+(?=\([a-z]\)\s)/i).forEach(x => pieces.push(x)));
    pieces.forEach(s => {
      const m = LET.exec(s);
      if (m && keys.indexOf(m[1].toLowerCase()) >= 0) { cur = m[1].toLowerCase(); (by[cur] = by[cur] || []).push(s.replace(LET, '')); }
      else if (cur) by[cur].push(s);
      else shared.push(s);
    });
    const ans = {};
    answer.split(/(?:^|[;,.]\s+)(?=\(?[a-z]\)\s)/i).forEach(seg => { const m = LET.exec(seg.trim()); if (m) ans[m[1].toLowerCase()] = seg.trim().replace(LET, '').replace(/[;\s]+$/, ''); });
    if (keys.some(k => !by[k] || !by[k].length)) return null;
    return keys.map(k => ({steps: shared.concat(by[k]).map(s => ({en: s})), answer: ans[k] || by[k][by[k].length - 1]}));
  };
  let n = 0;
  const walk = (list, fn) => (list || []).forEach(b => { fn(b); if (b.blocks) walk(b.blocks, fn); });
  PB.units.forEach(u => (u.sections || []).forEach(sec => walk(sec.blocks, ex => {
    if (ex.t !== 'exercise') return;
    const k = exKey(/^\d/.test(String(ex.id)) ? 'Exercise ' + ex.id : String(ex.id).replace(/^Review\s*/i, 'Review Exercise '));
    const bank = k && bankFor.get(k);
    if (!bank) return;
    const byNo = new Map((bank.problems || []).map(p => [String(p.qNo).replace(/\.$/, ''), p]));
    walk(ex.blocks, q => {
      if (q.t !== 'q' || q.solId) return;
      const p = byNo.get(String(q.no).replace(/\.$/, ''));
      if (!p || !(p.steps && p.steps.length || p.answer)) return;
      const steps = (p.steps || []).map(tex), answer = tex(p.answer || '');
      const sid = 'c12math-bank-' + p.id;
      const own = splitParts(q, steps, answer);
      if (own) {   // every part (a, b, c ...) gets its own step-by-step answer
        q.parts.forEach((pt, i) => { const id = sid + '-' + i; SOL[id] = own[i]; pt.solId = id; n++; });
        return;
      }
      SOL[sid] = {steps: steps.map(s => ({en: s})), answer};
      q.solId = sid;
      n++;
    });
  })));
  window.MATH12_PAGEBOOK_ANSWERS = n;
})();
