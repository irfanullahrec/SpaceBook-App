/* Class 2 General Knowledge (English, social studies + science) — play layer rules (toolkit: window.C1P).
 *   (i) (ii) (iii) multiple choice rows · ✓ / ✗ statements · "Tick the …" lists (tap only the right ones)
 *   column matching rows (shared hook) · "name the festival / profession" rows (tap among the other answers)
 *   questions → type or speak, hear the model answer · activities and projects → "I did it ⭐" with the model idea */
(function () {
  'use strict';
  const P = window.C1P; if (!P || !P.register) return;
  const {norm, stripParen, hasBlank, solAnswer, qText, sameGroup, shuffle, instrOf, bankFromText, distractors} = P;
  const clean = s => String(s || '').replace(/\s*✓\s*$/, '').replace(/\.\s*$/, '').replace(/\s*\([^)]*\)\s*$/, '').trim();
  const ROM = '(?:i{1,3}|iv|v|vi)';

  function classify(item) {
    const t = qText(item); if (!t) return null;
    const a = solAnswer(item); if (a == null) return null;
    const isPart = item.classList.contains('m6-part');
    const instr = instrOf(item);
    const af = a.replace(/\.\s*$/, '').trim();
    let m;

    /* practical / group / oral activities */
    if (/^(practical|group activity|oral activity|role play|class activity|project|expected result|answers? (will )?vary|the answer depends|for example)/i.test(a)) return {kind: 'open', t, a, mode: /^(write|name|list|make a list)/i.test(t) ? 'write' : 'say'};
    /* (i) (ii) options */
    const re = new RegExp('\\((' + ROM + ')\\)\\s*(.+?)(?=\\s*\\(' + ROM + '\\)|$)', 'g'); const opts = [];
    while ((m = re.exec(t))) opts.push({l: m[1], t: m[2].trim()});
    if (opts.length >= 2) {
      const cl = new RegExp('^\\((' + ROM + ')\\)\\s*(.*?)\\s*✓?$').exec(af); const cor = cl && opts.find(o => o.l === cl[1]);
      const cut = t.search(new RegExp('\\(' + ROM + '\\)'));
      if (cor) return {kind: 'choice', stem: t.slice(0, cut).trim(), prompt: cut < 2 ? 'Choose the right answer.' : null, opts: opts.map(o => o.t), correct: cor.t};
    }
    /* true / false */
    if (/^[✓✗]$/.test(af)) return {kind: 'choice', prompt: t, opts: ['✓ True', '✗ False'], correct: af === '✓' ? '✓ True' : '✗ False', title: '✅ True or false?'};
    /* tick the right ones from a list in brackets: Carrot ✓, Turnip ✓ */
    const lst = bankFromText(t);
    if (/tick|encircle|circle|colour/i.test(t) && lst && lst.length >= 3) {
      const good = lst.filter(w => new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b\\s*✓|living things to colour:.*\\b' + w + '\\b', 'i').test(a));
      if (good.length && good.length < lst.length) return {kind: 'pick', list: lst, correct: good, verb: /colour/i.test(t) ? 'colour' : 'tick'};
    }
    /* row text -> short answer, choose among the answers of the other rows */
    if (isPart && clean(a).split(/\s+/).length <= 3 && !hasBlank(t)) {
      const others = []; sameGroup(item).forEach(x => { const s = solAnswer(x); if (s) others.push(clean(s)); });
      if (new Set(others.map(norm)).size >= 2) return {kind: 'choice', prompt: t.replace(/\s*\([^)]*\)\s*$/, '') + ' →', opts: [clean(a)].concat(distractors(clean(a), others, 3)), correct: clean(a), title: '🎯 Choose the right answer'};
    }
    /* blanks */
    if (hasBlank(t) && clean(a).split(/\s+/).length <= 3) {
      const bank = bankFromText(instr) || bankFromText(t);
      if (bank && bank.some(x => norm(x) === norm(clean(a)))) return {kind: 'choice', stem: t.replace(/\s*\([^()]*\)\s*$/, ''), opts: bank, correct: clean(a)};
    }
    /* questions */
    if (/\?\s*$/.test(t) || /^(write|name|list|make|give|tell|describe|differentiate|which|why|how|what)/i.test(t)) return {kind: 'open', t, a, mode: /^(write|list|make a|differentiate)/i.test(t) ? 'write' : 'say'};
    if (isPart && a.length > 6) return {kind: 'open', t, a, mode: 'write'};
    return {kind: 'done', t};
  }
  P.register('gk', classify);
  if (P.scan) P.scan();
})();
