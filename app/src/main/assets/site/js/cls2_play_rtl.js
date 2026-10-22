/* Class 2 Islamyat, Pashto and Nazira — extra rules for the play layer (toolkit: window.C1P).
 * Islamyat: (الف) (ب) (ج) options, ✓/✗ statements, blanks, questions (Class 1 rules do the rest)
 * Pashto:   gaps with the options in brackets + ✓, scrambled sentences, letters → word
 * Nazira:   every figure with Arabic letters / words becomes "tap to hear" (these pages have no printed questions). */
(function () {
  'use strict';
  const P = window.C1P, C = window.C1A; if (!P || !P.registerExtra) return;
  const {norm, stripParen, hasBlank, solAnswer, qText, shuffle, instrOf} = P;
  const AL = '(?:الف|ب|ج|د)';
  const clean = s => String(s || '').replace(/\s*✓\s*$/, '').replace(/[۔.]\s*$/, '').replace(/\s*\([A-Za-z][^()]*\)\s*$/, '').trim();

  function mcqUrdu(item) {
    const t = qText(item); const a = solAnswer(item); if (a == null) return null;
    const re = new RegExp('\\((' + AL + ')\\)\\s*(.+?)(?=\\s*\\(' + AL + '\\)|\\s*$)', 'g'); const opts = []; let m;
    while ((m = re.exec(t))) opts.push({l: m[1], t: m[2].trim()});
    const cl = new RegExp('^\\((' + AL + ')\\)').exec(a.trim());
    if (opts.length >= 2 && cl) { const cor = opts.find(o => o.l === cl[1]); if (cor) return {kind: 'choice', stem: t.slice(0, t.indexOf('(' + opts[0].l + ')')).trim(), prompt: t.indexOf('(' + opts[0].l + ')') < 2 ? 'درست جواب چنیں۔' : null, opts: opts.map(o => o.t), correct: cor.t, title: '🎯 درست جواب چنیں'}; }
    return null;
  }
  P.registerExtra('isl', (item, cls) => {
    if (cls !== 'cls2') return null;
    const m = mcqUrdu(item); if (m) return m;
    const a = solAnswer(item); const t = qText(item);
    if (a != null && /^[✓✗]$/.test(a.trim())) return {kind: 'choice', prompt: t, opts: ['✓ درست', '✗ غلط'], correct: a.trim() === '✓' ? '✓ درست' : '✗ غلط', title: '✅ True or false?'};
    if (a != null && /^(عملی سرگرمی|مثلاً|رنگ بھریں|یہ سب)/.test(a.trim())) return {kind: 'open', t, a, mode: 'say'};
    return null;
  });

  P.registerExtra('pashto', (item, cls) => {
    if (cls !== 'cls2') return null;
    const t = qText(item); const a = solAnswer(item); if (a == null) return null;
    const ans = clean(a);
    /* gaps with options in brackets, answer marked ✓ */
    const pl = /\(([^()]+)\)\s*[.۔]?\s*$/.exec(t);
    if (hasBlank(t) && pl) { const its = pl[1].split(/\s*[،,]\s*/).map(x => x.trim()).filter(Boolean); const cor = its.find(x => norm(x) === norm(ans)); if (cor && its.length >= 2) return {kind: 'choice', stem: t.replace(/\s*\([^()]+\)\s*[.۔]?\s*$/, ''), opts: its, correct: cor, title: '🎯 سمه کلمه وټاکئ'}; }
    /* scrambled sentence */
    const wt = norm(t).split(' '), wa = norm(a).split(' ');
    if (wt.length >= 3 && wt.slice().sort().join(' ') === wa.slice().sort().join(' ') && norm(t) !== norm(a)) { const chips = t.replace(/[۔؟.?]\s*$/, '').trim().split(/\s+/); const seq = a.replace(/[۔؟.?]\s*$/, '').trim().split(/\s+/); return {kind: 'order', chips, target: a.trim(), sequence: seq, exact: true, title: '🧩 جمله جوړه کړئ', help: 'کلمې په سمه ترتیب ټیپ کړئ.'}; }
    /* letters joined with + */
    if (/^(\S\s*\+\s*)+\S$/.test(t.trim())) { const letters = t.split('+').map(x => x.trim()); return {kind: 'order', chips: letters, target: ans, sequence: letters, exact: true, title: '🧩 توري سره جوړ کړئ', help: 'توري په ترتیب ټیپ کړئ چې کلمه جوړه شي.'}; }
    if (/^(\S\s*[،,]\s*)+\S$/.test(t.trim()) && ans.split(/\s+/).length === 1) { const letters = t.split(/\s*[،,]\s*/).map(x => x.trim()); const seq = [...ans.replace(/[ً-ٰٟ]/g, '')]; if (seq.length === letters.length) return {kind: 'order', chips: letters, target: ans, sequence: seq, exact: true, title: '🧩 توري سره جوړ کړئ', help: 'توري په ترتیب ټیپ کړئ چې کلمه جوړه شي.'}; }
    if (/^(عملي|زباني|بېلګه|د پښتو)/.test(a.trim())) return {kind: 'open', t, a, mode: 'say'};
    return null;
  });

  /* ---------------- Nazira class 2: figures with Arabic text */
  const AR = /[؀-ۿ]/;
  function chipsOf(fig) {
    const out = [];
    fig.querySelectorAll('svg text').forEach(tx => { const s = tx.textContent.trim(); if (!s || !AR.test(s) || /^\+\d+$/.test(s)) return; if (/\s/.test(s) && /ـ/.test(s)) return; if (out.indexOf(s) < 0) out.push(s); });
    return out.slice(0, 80);
  }
  function scanNazira() {
    document.querySelectorAll('.m6-root.c1-nazira figure.m6-fig:not([data-c2n])').forEach(fig => {
      if (P.clsOf(fig) !== 'cls2') return;
      fig.dataset.c2n = '1';
      const chips = chipsOf(fig); if (chips.length < 2) return;
      let w; try { w = P.BUILD.arabic({chips, t: '', a: null}); } catch (e) { return; }
      w.dataset.c1p = 'arabic'; P.loc(w, P.LANGS.ur);
      fig.after(w);
    });
  }
  const obs = new MutationObserver(() => { clearTimeout(scanNazira.t); scanNazira.t = setTimeout(scanNazira, 100); });
  obs.observe(document.body, {childList: true, subtree: true});
  scanNazira();
  if (P.scan) P.scan();
})();
