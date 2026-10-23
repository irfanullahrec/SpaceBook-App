#!/usr/bin/env node
/* Packs the website's MCQ bank (SpaceBook Web/js/test_prep_bank.js, built from the books by tools/test_prep/build_mcq_bank.js)
 * into one small asset the app can use offline for Quick Quiz and Swipe & Learn:
 *     app/src/main/assets/mcq_bank.json
 *   { "v": 1,
 *     "sub": [ [subjectId, name, classNumber, category], ... ],
 *     "q":   [ [subjectIndex, question, [options], answerIndex, explanation|"", urduQuestion|"", rtl(0|1)], ... ] }
 * Questions with markup, with a missing or invalid key, or that are too long to read on a phone are left out.
 *   node tools/pack_mcq_bank.js [path to test_prep_bank.js] */
'use strict';
const fs = require('fs');
const path = require('path');

const SRC = process.argv[2] || path.join('D:/SpaceBook/SpaceBook Web/js/test_prep_bank.js');
const OUT = path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'mcq_bank.json');
const raw = fs.readFileSync(SRC, 'utf8');
const bank = JSON.parse(raw.slice(raw.indexOf('window.SB_MCQ_BANK =') + 'window.SB_MCQ_BANK ='.length).trim().replace(/;\s*$/, ''));

// ---- the books write formulas as LaTeX ( \(10^{-19}\text{ A}\) ); a quiz card shows plain text, so they are turned into Unicode
const SUP = { 0: '\u2070', 1: '\u00B9', 2: '\u00B2', 3: '\u00B3', 4: '\u2074', 5: '\u2075', 6: '\u2076', 7: '\u2077', 8: '\u2078', 9: '\u2079', '+': '\u207A', '-': '\u207B', '\u2212': '\u207B', '=': '\u207C', '(': '\u207D', ')': '\u207E', n: '\u207F', i: '\u2071' };
const SUB = { 0: '\u2080', 1: '\u2081', 2: '\u2082', 3: '\u2083', 4: '\u2084', 5: '\u2085', 6: '\u2086', 7: '\u2087', 8: '\u2088', 9: '\u2089', '+': '\u208A', '-': '\u208B', '\u2212': '\u208B', '=': '\u208C', '(': '\u208D', ')': '\u208E', a: '\u2090', e: '\u2091', o: '\u2092', x: '\u2093', i: '\u1D62', n: '\u2099' };
const SYM = {
  times: '\u00D7', cdot: '\u00B7', div: '\u00F7', pm: '\u00B1', mp: '\u2213', circ: '\u00B0', leq: '\u2264', le: '\u2264', geq: '\u2265', ge: '\u2265', neq: '\u2260', ne: '\u2260', approx: '\u2248', infty: '\u221E',
  rightarrow: '\u2192', to: '\u2192', Rightarrow: '\u21D2', leftrightarrow: '\u2194', propto: '\u221D', degree: '\u00B0', ldots: '\u2026', dots: '\u2026', angle: '\u2220', perp: '\u22A5', parallel: '\u2225', triangle: '\u25B3', therefore: '\u2234',
  alpha: '\u03B1', beta: '\u03B2', gamma: '\u03B3', delta: '\u03B4', Delta: '\u0394', epsilon: '\u03B5', varepsilon: '\u03B5', theta: '\u03B8', lambda: '\u03BB', mu: '\u03BC', pi: '\u03C0', rho: '\u03C1', sigma: '\u03C3', Sigma: '\u03A3',
  tau: '\u03C4', phi: '\u03C6', varphi: '\u03C6', omega: '\u03C9', Omega: '\u03A9', eta: '\u03B7', nu: '\u03BD', kappa: '\u03BA', xi: '\u03BE', psi: '\u03C8', chi: '\u03C7', ',': ' ', ';': ' ', '!': '', ' ': ' ', quad: ' ', qquad: ' ', '%': '%',
};
function tex(s) {
  let t = String(s).replace(/\\[()\[\]]/g, '').replace(/\$/g, '');
  const arg = (body, map, mark) => { const c = [...body]; return c.every(ch => map[ch] != null) ? c.map(ch => map[ch]).join('') : mark + '(' + body + ')'; };
  for (let i = 0; i < 6; i++) {                                                          // innermost groups first
    t = t.replace(/\\(?:text|mathrm|mathbf|textbf|mathit|operatorname)\{([^{}]*)\}/g, '$1')
      .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (m, a, b) => (/^[\w.]+$/.test(a) ? a : '(' + a + ')') + '/' + (/^[\w.]+$/.test(b) ? b : '(' + b + ')'))
      .replace(/\\sqrt\{([^{}]*)\}/g, (m, a) => '\u221A' + (/^[\w.]+$/.test(a) ? a : '(' + a + ')'))
      .replace(/\^\{([^{}]*)\}/g, (m, a) => arg(a, SUP, '^')).replace(/_\{([^{}]*)\}/g, (m, a) => arg(a, SUB, '_'))
      .replace(/\^([0-9a-zA-Z+\-\u2212])/g, (m, a) => (SUP[a] != null ? SUP[a] : '^' + a)).replace(/_([0-9a-zA-Z])/g, (m, a) => (SUB[a] != null ? SUB[a] : '_' + a));
  }
  t = t.replace(/\\(left|right|displaystyle)\b\s*/g, '').replace(/\\([A-Za-z]+|[,;! %])/g, (m, n) => (SYM[n] != null ? SYM[n] : m));
  return t.replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
}
const RTL = /[\u0600-\u06FF]/;
const subIndex = new Map(), sub = [], q = [];
let dropped = 0;
for (const src of bank.mcqs) {
  const m = { ...src, q: tex(src.q), o: Array.isArray(src.o) ? src.o.map(tex) : src.o, e: src.e ? tex(src.e) : src.e, qu: src.qu ? tex(src.qu) : src.qu };
  const s = bank.subjects[m.s];
  const okText = t => typeof t === 'string' && t.trim().length > 0 && !/[<&]/.test(t);
  if ([m.q, ...(m.o || []), m.e || '', m.qu || ''].some(t => t.includes(String.fromCharCode(92)))) { dropped++; continue; }
  if (!s || !okText(m.q) || !Array.isArray(m.o) || m.o.length < 2 || m.o.length > 4 || !m.o.every(okText)) { dropped++; continue; }
  if (!Number.isInteger(m.a) || m.a < 0 || m.a >= m.o.length) { dropped++; continue; }
  if (m.q.length > 170 || m.o.some(o => o.length > 80) || new Set(m.o.map(o => o.trim().toLowerCase())).size !== m.o.length) { dropped++; continue; }
  if (!subIndex.has(m.s)) { subIndex.set(m.s, sub.length); sub.push([m.s, s.name, s.cls, s.cat]); }
  const exp = okText(m.e) && m.e.length <= 160 ? m.e.trim() : '';
  const ur = okText(m.qu) && m.qu.length <= 170 && !RTL.test(m.q) ? m.qu.trim() : '';      // an Urdu line only under an English question
  q.push([subIndex.get(m.s), m.q.trim(), m.o.map(o => o.trim()), m.a, exp, ur, RTL.test(m.q) ? 1 : 0]);
}
fs.writeFileSync(OUT, JSON.stringify({ v: 1, sub, q }));
const perClass = {};
q.forEach(r => { const c = sub[r[0]][2]; perClass[c] = (perClass[c] || 0) + 1; });
console.log(`kept ${q.length} of ${bank.mcqs.length} (dropped ${dropped}) -> ${OUT} (${(fs.statSync(OUT).size / 1e6).toFixed(2)} MB)`);
console.log('per class', JSON.stringify(perClass));
