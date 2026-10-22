/* Class 2 Mathematics — extra rules for the play layer (rows of a question are played one by one; see js/cls2_play_eng.js).
 * Adds to the Class 1 maths rules: number words ↔ digits, hundreds/tens/ones, greatest/smallest of three numbers,
 * units (m / cm, g / kg, ℓ / mℓ), sums with units, word problems whose answer is written as an equation,
 * and "count on / count back" rows. Everything else falls through to js/cls1_play_math.js. */
(function () {
  'use strict';
  const P = window.C1P; if (!P || !P.registerExtra) return;
  const {norm, stripParen, solAnswer, qText, instrOf, shuffle} = P;
  const isInt = s => /^\d+$/.test(String(s).trim());

  function numOpts(n) {
    n = +n; const set = new Set([n]);
    const cand = n < 10 ? [n + 1, n - 1, n + 2, n - 2, n + 3] : n < 100 ? [n + 1, n - 1, n + 10, n - 10, n + 2, (n % 10) * 10 + Math.floor(n / 10)] : [n + 1, n - 1, n + 10, n - 10, n + 100, n - 100];
    shuffle(cand.slice()).forEach(c => { if (c >= 0 && c !== n && set.size < 4) set.add(c); });
    let k = 1; while (set.size < 3) set.add(n + 3 + k++);
    return shuffle([...set]).map(String);
  }
  const lastEq = a => { const m = /=\s*(\d+)\b[^=]*$/.exec(a); return m ? m[1] : null; };

  function classify(item, cls) {
    if (cls !== 'cls2') return null;
    const t0 = qText(item).replace(/^[ivx]+\.\s*/i, '').trim(); if (!t0) return null;
    const a = solAnswer(item); if (a == null) return null;
    const af = a.replace(/\.\s*$/, '').trim();
    const instr = instrOf(item).toLowerCase();
    let m;

    /* number words -> digits, digits -> words */
    if (/^[A-Za-z -]+(?:\sand\s[A-Za-z -]+)*$/.test(t0) && isInt(af) && /(hundred|ty\b|teen|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)/i.test(t0))
      return {kind: 'choice', prompt: 'Write “' + t0 + '” in numbers.', opts: numOpts(af), correct: af, title: '🔢 Words to numbers'};
    if (/^\d{1,3}$/.test(t0) && /^[A-Za-z -]+(?:\sand\s[A-Za-z -]+)*$/.test(af)) return {kind: 'type', prompt: t0 + ' in words →', answer: af, label: 'Write the number in words'};

    /* hundreds, tens, ones */
    m = /(\d+)\s*hundreds?,\s*(\d+)\s*tens?,\s*(\d+)\s*ones?/i.exec(af);
    if (m && /^\d{3}$/.test(t0)) return {kind: 'typelist', cues: ['Hundreds', 'Tens', 'Ones'], answers: [m[1], m[2], m[3]], title: 'Hundreds, tens and ones'};

    /* greater / smaller of 2-3 numbers */
    if (/^\d+(?:,\s*\d+){1,3}$/.test(t0) && isInt(af) && t0.split(/\s*,\s*/).includes(af) && !/order/.test(instr)) {
      const adj = /greatest|greater|larger|biggest/.test(instr) ? 'greater' : /smallest|smaller|lesser/.test(instr) ? 'smaller' : null;
      if (adj) return {kind: 'choice', prompt: 'Tap the ' + (/greatest/.test(instr) ? 'greatest' : /smallest/.test(instr) ? 'smallest' : adj) + ' number.', opts: t0.split(/\s*,\s*/), correct: af, title: '⚖️ Compare the numbers'};
    }

    /* units */
    if (/^(m|cm|g|kg|ℓ|mℓ|ml|l)$/i.test(af)) {
      const un = [...new Set([...instr.matchAll(/\(([a-zℓ]{1,3})\)/g)].map(x => x[1]))];
      if (un.length >= 2 && un.some(u => u.toLowerCase() === af.toLowerCase())) return {kind: 'choice', prompt: t0.replace(/\.$/, '') + ' — which unit?', opts: un, correct: un.find(u => u.toLowerCase() === af.toLowerCase()), title: '📏 Choose the unit'};
    }
    /* sums with units: 10 m + 8 m = 18 m */
    m = /^(\d+)\s*([A-Za-zℓ]+)\s*([+−-])\s*(\d+)\s*([A-Za-zℓ]+)$/.exec(t0);
    if (m) { const am = /^(\d+)\s*([A-Za-zℓ]+)$/.exec(af); if (am) return {kind: 'choice', stem: t0 + ' = ___ ' + am[2], opts: numOpts(am[1]), correct: am[1], title: '➕ Solve it', help: 'Add or subtract the numbers. The unit stays the same. Tap the answer!'}; }

    /* which of two things: a bottle and a glass -> the bottle ✓ */
    m = /^(?:a |an |the )?([A-Za-z ]+?) and (?:a |an |the )?([A-Za-z ]+)$/.exec(t0);
    if (m && /✓/.test(af)) { const o = [m[1], m[2]]; const cor = o.find(x => norm(af).includes(norm(x))); if (cor) return {kind: 'choice', prompt: instr.replace(/\.$/, '') ? 'Which has more?' : 'Which one?', opts: o, correct: cor, title: '🖼️ Look and choose'}; }

    /* word problems / sums whose answer is an equation */
    const le = lastEq(af);
    if (le && /[?]$/.test(t0)) return {kind: 'choice', prompt: t0, opts: numOpts(le), correct: le, title: '🔢 Solve it', help: 'Think about which operation to use. Tap the answer!'};
    if (le && /^\d+\s*[×÷+−-]\s*\d+$/.test(t0)) return {kind: 'choice', stem: t0 + ' = ___', opts: numOpts(le), correct: le, title: '➕ Solve it'};

    /* "30 + 10 =" rows */
    m = /^(\d+\s*[+−×÷-]\s*\d+)\s*=\s*$/.exec(t0);
    if (m && isInt(af)) return {kind: 'choice', stem: m[1] + ' = ___', opts: numOpts(af), correct: af, title: '➕ Solve it'};
    /* letter positions: G -> 7th */
    m = /^(\d+)(st|nd|rd|th)$/.exec(af);
    if (m && /^[A-Z]$/.test(t0)) { const n = +m[1]; const suf = k => (k % 100 >= 11 && k % 100 <= 13) ? 'th' : ({1: 'st', 2: 'nd', 3: 'rd'}[k % 10] || 'th'); const set = new Set([n]); shuffle([n + 1, n - 1, n + 2, n - 2, n + 3]).forEach(k => { if (k > 0 && set.size < 4) set.add(k); }); return {kind: 'choice', prompt: 'What is the position of “' + t0 + '” in the English alphabet?', opts: shuffle([...set]).map(k => k + suf(k)), correct: af, title: '🔤 Alphabet position'}; }
    /* place value written out: 3 tens, 5 hundreds, 4 ones -> 534 */
    if (/hundreds?/i.test(t0) && /tens?/i.test(t0) && isInt(af)) return {kind: 'choice', prompt: t0.replace(/\s*\(.*$/, '') + ' → which number?', opts: numOpts(af), correct: af, title: '🔢 Build the number'};
    /* increasing / decreasing order of the numbers printed in the instruction */
    if (/(increasing|decreasing|ascending|descending)/i.test(t0 + ' ' + instr) && /^\d+(?:,\s*\d+){2,}$/.test(af)) {
      const lm = /(\d+(?:,\s*\d+){2,})\s*$/.exec(instrOf(item)); const seq = af.split(/\s*,\s*/);
      if (lm) return {kind: 'order', chips: lm[1].split(/\s*,\s*/), target: seq.join(', '), sequence: seq, exact: true, title: /decreasing|descending/i.test(t0) ? '🔢 Biggest to smallest' : '🔢 Smallest to biggest'};
    }
    /* word problems with a hint in brackets, or with a sentence before the boxes */
    if (/\?/.test(t0) || /☐/.test(t0)) {
      const lead = /^(?:Rs\.?\s*)?(\d+)\b/.exec(af); const ans = le || (lead ? lead[1] : null);
      if (ans) { const prompt = t0.split(/\s*\(|☐/)[0].trim() || t0; return {kind: 'choice', prompt: /\?$/.test(prompt) ? prompt : prompt + ' — what is the answer?', opts: numOpts(ans), correct: ans, title: '🔢 Solve it', help: 'Think about which operation to use. Tap the answer!'}; }
    }
    /* count on / count back rows */
    if (/^\d+$/.test(t0)) { const lst = af.split(/\s*,\s*/); if (lst.length >= 4 && lst.length <= 10 && lst.every(isInt)) return {kind: 'typelist', cues: lst.map((_, i) => String(i + 1) + '.'), answers: lst, title: 'Write the next numbers'}; }
    return null;
  }
  P.registerExtra('math', classify);
  if (P.scan) P.scan();
})();
