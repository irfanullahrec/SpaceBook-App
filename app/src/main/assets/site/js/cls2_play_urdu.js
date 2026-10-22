/* Class 2 Urdu — play layer rules (toolkit: window.C1P from js/cls1_eng_play.js). Rows of a question are played one by one.
 *   options after a colon  "اوپر کا متضاد ہے: سامنے / نیچے / برابر"  → tap the right one         ✓ / ✗ statements
 *   خالی جگہ with the words printed in the instruction → tap the word into the gap
 *   واحد → جمع, متضاد, ordinal words (single word answers) → choose among the other answers of the exercise
 *   punctuation / negative sentences → edit the sentence with ۔ ، ؟ buttons        verbs inside a sentence → tap the verb
 *   الف بائی ترتیب → tap the word cards in alphabetical order       column matching rows → tap-tap pairs (shared hook)
 *   questions and writing tasks → type or speak, hear the model answer */
(function () {
  'use strict';
  const P = window.C1P; if (!P || !P.register) return;
  const {norm, stripParen, hasBlank, solAnswer, qText, sameGroup, shuffle, instrOf, bankFromText} = P;
  const MARKS = [['۔ ختمہ', '۔'], ['، سکتہ', '،'], ['؟ سوالیہ', '؟']];
  const UD = {'۰': 0, '۱': 1, '۲': 2, '۳': 3, '۴': 4, '۵': 5, '۶': 6, '۷': 7, '۸': 8, '۹': 9};
  const clean = s => String(s || '').replace(/\s*✓\s*$/, '').replace(/[۔.]\s*$/, '').replace(/\s*\([^)]*\)\s*$/, '').trim();
  const GEN = ['اللہ تعالیٰ', 'پانی', 'کتاب', 'گھر', 'اچھا', 'بڑا', 'سورج', 'درخت'];

  function pool(item, f) { const out = []; sameGroup(item).forEach(x => { const s = solAnswer(x); if (s != null && (!f || f(s))) out.push(clean(s)); }); return out; }
  function opts4(cor, others) { const bad = new Set([norm(cor)]); const out = [cor]; shuffle(others.slice()).concat(shuffle(GEN.slice())).forEach(w => { const k = norm(w); if (k && !bad.has(k) && out.length < 4) { bad.add(k); out.push(w); } }); return shuffle(out); }

  function classify(item) {
    const t = qText(item); if (!t) return null;
    const a = solAnswer(item); if (a == null) return null;
    const isPart = item.classList.contains('m6-part');
    const instr = instrOf(item);
    const ans = clean(a);
    let m;

    /* مثلاً … / زبانی سرگرمی → speaking or writing with a model */
    if (/^(مثلاً|مثال|زبانی|عملی|اہم نکات|پڑھنے کی مشق)/.test(a.trim())) {
      if (/^پڑھنے کی مشق/.test(a.trim())) return {kind: 'done', t};
      return {kind: 'open', t, a, mode: /(لکھیں|لکھیے|جملے)/.test(t) ? 'write' : 'say'};
    }
    /* درست / غلط */
    if (/^(درست|غلط)$/.test(a.trim())) return {kind: 'choice', prompt: t, opts: ['✓ درست', '✗ غلط'], correct: a.trim() === 'درست' ? '✓ درست' : '✗ غلط', title: '✅ True or false?'};
    /* کلمہ / مہمل */
    m = /^کلمہ:\s*(\S+)\s*[—–-]\s*مہمل:\s*(\S+)/.exec(a.trim());
    if (m) return {kind: 'choice', prompt: t.replace(/\*\*/g, '') + ' — کون سا لفظ کلمہ (بامعنی) ہے؟', opts: [m[1], m[2]], correct: m[1], title: '🎯 Choose the right answer'};
    /* ارکان: کُت ۔ تا */
    if (/\s۔\s/.test(a) && isPart && !/\(/.test(a)) { const syl = a.trim().split(/\s*۔\s*/); if (syl.length >= 2) return {kind: 'order', chips: syl, target: a.trim(), sequence: syl, exact: true, title: '🧩 ارکان بنائیں', help: '«' + t + '» کو ارکان میں توڑیں: ٹکڑے ترتیب سے ٹیپ کریں۔'}; }
    /* statements: ✓ / ✗ */
    if (/^[✓✗]$/.test(a.trim())) return {kind: 'choice', prompt: t, opts: ['✓ درست', '✗ غلط'], correct: a.trim() === '✓' ? '✓ درست' : '✗ غلط', title: '✅ True or false?'};
    /* options after a colon */
    m = /^(.*?[:：])\s*(.+?\s\/\s.+)$/.exec(t);
    if (m) { const its = m[2].split(/\s+\/\s+/).map(x => x.trim()).filter(Boolean); const cor = its.find(x => norm(x) === norm(clean(a))); if (cor && its.length >= 2) return {kind: 'choice', prompt: m[1].replace(/[:：]\s*$/, ''), opts: its, correct: cor, title: '🎯 Choose the right answer'}; }
    /* blank with a bank in the instruction (رب، رستہ، جاں، درود) */
    if (hasBlank(t) && ans.split(/\s+/).length <= 3) {
      const bank = bankFromText(instr);
      const paren = /\(([^()]+)\)\s*[۔.]?\s*$/.exec(t);
      if (paren && paren[1].split(/\s*[،,/]\s*/).length >= 2) { const its = paren[1].split(/\s*[،,/]\s*/).map(x => x.trim()); if (its.some(x => norm(x) === norm(ans))) return {kind: 'choice', stem: t.replace(/\s*\([^()]+\)\s*[۔.]?\s*$/, ''), opts: its, correct: ans}; }
      if (bank && bank.some(x => norm(x) === norm(ans))) return {kind: 'choice', stem: t, opts: bank.length > 5 ? opts4(ans, bank) : bank, correct: ans};
      const others = pool(item, s => !/[✓✗]/.test(s) && clean(s).split(/\s+/).length <= 3);
      return {kind: 'choice', stem: t, opts: opts4(ans, others), correct: ans};
    }
    /* واحد → جمع lists with arrows */
    if (/→/.test(a) && !isPart) { const prs = a.split(/\s*،\s*/).map(x => x.split(/\s*→\s*/).map(y => y.trim())).filter(x => x.length === 2); if (prs.length >= 3) return {kind: 'pairs', pairs: prs}; }
    /* alphabetical order */
    if (/الف بائی|حروفِ تہجی کی ترتیب/.test(t + instr)) {
      const lm = /\(([^()]+)\)/.exec(t + ' ' + instr); const seq = [...a.matchAll(/[۱-۹]+۔\s*([^\s۱-۹]+)/g)].map(x => x[1]);
      if (lm && seq.length >= 3) { const chips = lm[1].split(/\s*[،,]\s*/).map(x => x.trim()).filter(Boolean); if (chips.length === seq.length) return {kind: 'order', chips, target: seq.join('، '), sequence: seq, exact: true, title: '🔤 الف بائی ترتیب', help: 'لفظوں کو الف بائی ترتیب سے ٹیپ کریں۔'}; }
    }
    /* sentences to edit: punctuation or نہی */
    if (/[۔؟]\s*$/.test(a) || /(ختمہ|سکتہ|نہی|تبدیل)/.test(instr)) {
      const wt = norm(t).split(' '), wa = norm(a).split(' ');
      if (wt.length >= 2 && Math.abs(wt.length - wa.length) <= 2 && wt.filter(x => wa.includes(x)).length >= Math.min(wt.length, wa.length) - 1 && norm(t) !== norm(a) + '_x')
        return {kind: 'fix', t: t.trim(), a: a.trim(), marks: MARKS, title: '✏️ Fix the sentence'};
    }
    /* verbs / words inside the sentence */
    if (!hasBlank(t) && t.split(/\s+/).length >= 3 && ans.split(/\s+/).length <= 2) {
      const sw = (t.match(/[؀-ۿ]+/g) || []); const aw = ans.match(/[؀-ۿ]+/g) || [];
      if (aw.length && aw.every(w => sw.includes(w))) return {kind: 'tapword', sentence: t.replace(/\*\*/g, ''), answer: aw.join(' ')};
    }
    /* word -> word (plural, opposite, ordinal): choose among the answers of the other rows */
    if (isPart && t.split(/\s+/).length <= 2 && ans.split(/\s+/).length <= 3) {
      const others = pool(item, s => !/[✓✗]/.test(s) && clean(s).split(/\s+/).length <= 3);
      if (others.length >= 2) return {kind: 'choice', prompt: '«' + t.replace(/[۰-۹.\s]+$/, '') + '» ←', opts: opts4(ans, others), correct: ans, title: '🎯 Choose the right answer'};
    }
    /* questions and writing tasks */
    if (/[؟?]\s*$/.test(t) || /(لکھیں|لکھیے|بتائیں|بتائیے|بولیں|سنائیں)/.test(t + ' ' + instr)) return {kind: 'open', t, a, mode: /(لکھیں|لکھیے|جملے)/.test(t + ' ' + instr) && !isPart ? 'write' : 'say'};
    return {kind: 'done', t};
  }
  P.register('urdu', classify);
  if (P.scan) P.scan();
})();
