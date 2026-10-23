/* sb_games_content.js - what the Games are made of (no screen code; js/sb_games.js draws it, tests/games/games.js checks it).
 *
 * Six games, ten levels each, for Classes 1-12:
 *   quiz    Quiz Quest      textbook MCQs (js/test_prep_bank.js), easy -> hard, per subject
 *   tf      True or False   the same questions turned into statements, against the clock
 *   spell   Word Builder    spell the answer of a textbook question (Classes 1-3: spell the picture)
 *   memory  Memory Match    flip cards: question <-> answer (Classes 1-3: picture <-> word)
 *   math    Math Sprint     made-up sums on a ladder of skills for every class (always correct by construction)
 *   learn   Little Learners Classes 1-3: counting, colours, shapes, letters, picture words
 *
 * A level has `total` steps (one per question / word / pair). The screen reports a step when that question was answered
 * right (without help), through SBRewards.step with the key from levelKey(): the server then pays +1 per new step and +5
 * when every step of the level has been done (api/lib/rewards.php; same 'count' key shape as the Android app's games).
 * Nothing here is textbook text except what comes out of the MCQ bank; the picture words (js/games_vocab.js) are hand-made.
 *
 * An item for the "choice" screen: {p: html prompt, c: [html choices], a: index of the right one, x: html shown after the
 * answer, dir: 'rtl' for Urdu / Pashto, say: text a device voice can read, tr: {ur, ps}, big: choices are pictures}.
 * "tiles":  {p, ans: 'WORD', x}.   "flip": {pairs: [{q: html, a: html}]}. */
(function (root) {
  'use strict';

  const LEVELS = 10;
  const SIZES = {
    quiz: [5, 5, 6, 6, 7, 8, 8, 9, 10, 12],
    tf: [6, 6, 7, 7, 8, 8, 9, 10, 10, 12],
    math: [6, 6, 7, 7, 8, 8, 9, 9, 10, 12],
    learn: [5, 5, 6, 6, 6, 7, 7, 8, 8, 10],
    spell: [4, 4, 5, 5, 6, 6, 7, 7, 8, 10],
    memory: [3, 3, 4, 4, 5, 5, 6, 6, 7, 8]
  };
  const PASS = 0.6;                       // a level is passed when 60 % of its steps have been done

  // ---------- small helpers ----------
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const makeRng = seed => mulberry32(seed == null ? (Date.now() ^ (Math.random() * 1e9)) : seed);
  const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
  function shuffle(r, arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function sample(r, arr, n) { return shuffle(r, arr).slice(0, n); }
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; };
  const lcm = (a, b) => a / gcd(a, b) * b;
  function until(gen, ok, tries) { let v = gen(); for (let i = 0; i < (tries || 60) && !ok(v); i++) v = gen(); return v; }
  const sgn = v => (v < 0 ? '−' + Math.abs(v) : String(v));      // minus sign, not hyphen
  const hash36 = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
  const isRtl = s => { const t = String(s || ''); const a = (t.match(/[؀-ۿ]/g) || []).length; return a > 0 && a >= (t.match(/[A-Za-z]/g) || []).length; };

  // text with $...$ maths (KaTeX when present) and <sup>/<sub>: the same rule as the Tests Preps page
  function rich(s) {
    const str = String(s == null ? '' : s);
    return str.split(/(\$\$[^$]+\$\$|\$[^$\n]+\$|\\\([\s\S]+?\\\))/g).map((p, i) => {
      if (i % 2 === 1) {
        const tex = p.startsWith('$$') ? p.slice(2, -2) : p.startsWith('$') ? p.slice(1, -1) : p.slice(2, -2);
        try { if (root.katex) return root.katex.renderToString(tex, {throwOnError: false}); } catch (e) { /* plain text below */ }
        return esc(tex);
      }
      return esc(p).replace(/&lt;(\/?)(sup|sub)&gt;/g, '<$1$2>');
    }).join('');
  }
  const plain = s => String(s == null ? '' : s).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
  const sup = (b, e) => b + '<sup>' + e + '</sup>';
  const fr = (n, d) => '<span class="g-fr"><i>' + n + '</i><b>' + d + '</b></span>';
  const frv = (n, d) => (d === 1 ? String(n) : fr(n, d));

  // ---------- answer choices ----------
  // numeric answer with three believable wrong ones (near the right one, plus the given likely mistakes)
  function mkNum(r, ans, p, o) {
    o = o || {};
    const dp = o.dp || 0, step = o.step || Math.pow(10, -dp), min = o.min === undefined ? (o.neg ? -Infinity : 0) : o.min;
    const norm = v => +(+v).toFixed(6);
    ans = norm(ans);
    const f = o.fmt || (v => (dp ? v.toFixed(dp) : String(v)).replace('-', '−'));
    const seen = new Set([ans]), wr = [];
    const add = v => { v = norm(v); if (isFinite(v) && v >= min && !seen.has(v) && wr.length < 3) { seen.add(v); wr.push(v); } };
    (o.wrong || []).slice(0, 2).forEach(add);
    shuffle(r, [1, -1, 2, -2, 3, -3]).forEach(d => add(ans + d * step));
    [10, -10, 4, -4, 5, -5, 6, -6, 7, 8, 9, 11, 12, 13, 14, 15].forEach(d => add(ans + d * step));
    const all = [ans].concat(wr).map(v => ({v, s: f(v)})).sort((x, y) => x.v - y.v);
    const out = {p, c: all.map(x => x.s), a: all.findIndex(x => x.v === ans)};
    if (o.x) out.x = o.x;
    return out;
  }
  // text / html answer: right one + wrong ones (distinct), shuffled
  function mkTxt(r, p, ans, wrongs, o) {
    o = o || {};
    const list = [ans], seen = new Set([plain(ans)]);
    wrongs.forEach(w => { if (w != null && !seen.has(plain(w)) && list.length < 4) { seen.add(plain(w)); list.push(w); } });
    const sh = o.keep ? list : shuffle(r, list);
    const out = {p, c: sh, a: sh.indexOf(ans)};
    if (o.x) out.x = o.x;
    return out;
  }
  // fractions: wrong ones must differ in VALUE from the right one and from each other
  function mkFrac(r, p, n, d, wrongs, o) {
    const g = gcd(n, d); n /= g; d /= g;
    const seen = new Set([n + '/' + d]), list = [{n, d}];
    const add = (a, b) => { if (!b || a < 0) return; const k = gcd(a, b) || 1; const x = a / k, y = b / k; if (!seen.has(x + '/' + y) && list.length < 4) { seen.add(x + '/' + y); list.push({n: x, d: y}); } };
    (wrongs || []).forEach(w => add(w[0], w[1]));
    [[n + 1, d], [Math.max(1, n - 1), d], [n, d + 1], [n + 2, d], [n, d + 2], [n + 1, d + 1]].forEach(w => add(w[0], w[1]));
    const sh = shuffle(r, list);
    return {p, c: sh.map(x => frv(x.n, x.d)), a: sh.findIndex(x => x.n === n && x.d === d)};
  }
  const poly = (a, b, c) => {          // ax^2 + bx + c, written the way a book does
    const t = (k, s, first) => (k === 0 ? '' : (first ? (k < 0 ? '−' : '') : (k < 0 ? ' − ' : ' + ')) + (Math.abs(k) === 1 && s ? '' : Math.abs(k)) + s);
    const out = t(a, 'x<sup>2</sup>', true) + t(b, 'x', !a) + t(c, '', !a && !b);
    return out || '0';
  };
  const lin = (a, b) => (Math.abs(a) === 1 ? (a < 0 ? '−' : '') : a) + 'x' + (b === 0 ? '' : (b < 0 ? ' − ' : ' + ') + Math.abs(b));
  const xpow = (c, e) => (e === 0 ? String(c) : (c === 1 ? '' : c === -1 ? '−' : sgn(c)) + 'x' + (e === 1 ? '' : '<sup>' + e + '</sup>'));

  // ---------- Math Sprint: the skills ----------
  const hasCarry = (a, b) => { let c = 0; while (a > 0 || b > 0) { if ((a % 10) + (b % 10) + c >= 10) return true; a = (a / 10) | 0; b = (b / 10) | 0; } return false; };
  const hasBorrow = (a, b) => { while (a > 0 || b > 0) { if ((b % 10) > (a % 10)) return true; a = (a / 10) | 0; b = (b / 10) | 0; } return false; };
  const THINGS = ['apples', 'mangoes', 'pencils', 'books', 'stickers', 'marbles', 'balloons', 'oranges'];
  const names = () => (root.SB_GAMES_VOCAB && root.SB_GAMES_VOCAB.names) || ['Ali', 'Sara', 'Hamza', 'Ayesha'];

  const M = {};
  M.add = (a0, a1, b0, b1, o) => r => {
    o = o || {};
    const ab = until(() => [ri(r, a0, a1), ri(r, b0, b1)], v => (o.max === undefined || v[0] + v[1] <= o.max) && (o.carry === undefined || hasCarry(v[0], v[1]) === o.carry));
    return mkNum(r, ab[0] + ab[1], ab[0] + ' + ' + ab[1] + ' = ?', {wrong: [ab[0] + ab[1] + 10, ab[0] + ab[1] - 10]});
  };
  M.sub = (a0, a1, b0, b1, o) => r => {
    o = o || {};
    const ab = until(() => { let a = ri(r, a0, a1), b = ri(r, b0, b1); if (b > a) { const t = a; a = b; b = t; } return [a, b]; }, v => o.borrow === undefined || hasBorrow(v[0], v[1]) === o.borrow);
    return mkNum(r, ab[0] - ab[1], ab[0] + ' − ' + ab[1] + ' = ?', {wrong: [ab[0] - ab[1] + 10, ab[0] - ab[1] - 10]});
  };
  M.mul = (a0, a1, b0, b1) => r => { const a = ri(r, a0, a1), b = ri(r, b0, b1); return mkNum(r, a * b, a + ' × ' + b + ' = ?', {wrong: [a * b + a, a * b - b]}); };
  M.table = (list, max) => r => { const a = pick(r, list), b = ri(r, 2, max || 10); return r() < 0.5 ? mkNum(r, a * b, a + ' × ' + b + ' = ?', {wrong: [a * b + a, a * b - a]}) : mkNum(r, a * b, b + ' × ' + a + ' = ?', {wrong: [a * b + b, a * b - b]}); };
  M.div = (d0, d1, q0, q1) => r => { const d = ri(r, d0, d1), q = ri(r, q0, q1); return mkNum(r, q, d * q + ' ÷ ' + d + ' = ?', {min: 1}); };
  M.missing = (kind, max) => r => {
    const k = kind === 'mix' ? pick(r, ['add', 'sub']) : kind;
    if (k === 'add') { const s = ri(r, 3, max), a = ri(r, 1, s - 1); return mkNum(r, s - a, a + ' + □ = ' + s, {min: 0}); }
    const s = ri(r, 3, max), d = ri(r, 1, s - 1); return mkNum(r, s - d, s + ' − □ = ' + d, {min: 0});
  };
  M.compare = max => r => {
    const a = ri(r, 1, max), b = r() < 0.12 ? a : ri(r, 1, max);
    const signs = ['&gt;', '&lt;', '='], right = a > b ? '&gt;' : a < b ? '&lt;' : '=';
    return {p: 'Which sign fits?<br><b>' + a + ' &nbsp;◯&nbsp; ' + b + '</b>', c: signs, a: signs.indexOf(right)};
  };
  M.near = (kinds, max) => r => {
    const k = pick(r, kinds), n = ri(r, 2, max - 2);
    if (k === 'after') return mkNum(r, n + 1, 'What comes after ' + n + '?', {min: 0});
    if (k === 'before') return mkNum(r, n - 1, 'What comes before ' + n + '?', {min: 0});
    return mkNum(r, n, 'What comes between ' + (n - 1) + ' and ' + (n + 1) + '?', {min: 0});
  };
  M.skip = steps => r => { const st = pick(r, steps), s = st * ri(r, 0, 5); return mkNum(r, s + 4 * st, [0, 1, 2, 3].map(i => s + i * st).join(', ') + ', … ?', {step: st < 3 ? 1 : st, min: 0}); };
  M.place = nd => r => {
    const digs = shuffle(r, [1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, nd), pos = ri(r, 0, nd - 1);
    const n = digs.reduce((t, d) => t * 10 + d, 0), d = digs[pos], k = nd - 1 - pos, ans = d * Math.pow(10, k);
    const w = [d, d * 10, d * 100, d * 1000].filter(v => v !== ans);
    return mkTxt(r, 'In <b>' + n + '</b>, what is the value of the digit <b>' + d + '</b>?', String(ans), w.map(String));
  };
  M.oddEven = () => r => {
    const even = r() < 0.5, mk = e => { let v = ri(r, 1, 99); if ((v % 2 === 0) !== e) v++; return v; };
    const right = mk(even), set = new Set([right]);
    while (set.size < 4) set.add(mk(!even));
    const l = shuffle(r, [...set]);
    return {p: 'Which of these is an <b>' + (even ? 'even' : 'odd') + '</b> number?', c: l.map(String), a: l.indexOf(right)};
  };
  M.round = (to, max) => r => {
    const n = until(() => ri(r, to + 1, max), v => v % to !== 0 && v % to !== to / 2), lo = Math.floor(n / to) * to, ans = Math.round(n / to) * to;
    return mkTxt(r, 'Round <b>' + n + '</b> to the nearest ' + to + '.', String(ans), [lo, lo + to, lo - to, lo + 2 * to].map(String).filter(x => +x >= 0));
  };
  M.story = (kinds, lo, hi) => r => {
    const k = pick(r, kinds), nm = shuffle(r, names()), th = pick(r, THINGS);
    if (k === 'add') { const a = ri(r, lo, hi), b = ri(r, lo, hi); return mkNum(r, a + b, nm[0] + ' has ' + a + ' ' + th + '. ' + nm[1] + ' gives ' + nm[0] + ' ' + b + ' more. How many ' + th + ' does ' + nm[0] + ' have now?'); }
    if (k === 'sub') { let a = ri(r, lo, hi), b = ri(r, lo, hi); if (b >= a) { const t = a; a = b + 1; b = t; } return mkNum(r, a - b, nm[0] + ' had ' + a + ' ' + th + ' and gave ' + b + ' to ' + nm[1] + '. How many ' + th + ' are left?'); }
    if (k === 'mul') { const a = ri(r, 2, 9), b = ri(r, 2, Math.max(3, Math.min(12, hi))); return mkNum(r, a * b, 'There are ' + a + ' baskets with ' + b + ' ' + th + ' in each. How many ' + th + ' are there in all?'); }
    const a = ri(r, 2, 9), b = ri(r, 2, 12); return mkNum(r, b, a * b + ' ' + th + ' are shared equally among ' + a + ' children. How many does each child get?', {min: 1});
  };
  M.rect = kind => r => {
    const k = kind === 'mix' ? pick(r, ['p', 'a', 'sq']) : kind;
    if (k === 'sq') { const s = ri(r, 2, 15); return mkNum(r, 4 * s, 'The side of a square is ' + s + ' cm. What is its perimeter?', {fmt: v => v + ' cm', wrong: [s * s, 2 * s]}); }
    const l = ri(r, 4, 20), w = ri(r, 2, l - 1);
    if (k === 'p') return mkNum(r, 2 * (l + w), 'A rectangle is ' + l + ' cm long and ' + w + ' cm wide. What is its <b>perimeter</b>?', {fmt: v => v + ' cm', wrong: [l * w, l + w]});
    return mkNum(r, l * w, 'A rectangle is ' + l + ' cm long and ' + w + ' cm wide. What is its <b>area</b>?', {fmt: v => v + ' cm²', wrong: [2 * (l + w), l + w]});
  };
  M.factor = () => r => {
    if (r() < 0.6) {
      const n = pick(r, [12, 18, 20, 24, 30, 36, 40, 42, 48, 60]), divs = []; for (let d = 2; d < n; d++) if (n % d === 0) divs.push(d);
      const f = pick(r, divs), non = []; for (let d = 2; d < n; d++) if (n % d !== 0) non.push(d);
      return mkTxt(r, 'Which number is a <b>factor</b> of ' + n + '?', String(f), sample(r, non, 3).map(String));
    }
    const k = ri(r, 3, 9), m = k * ri(r, 2, 12), non = []; for (let d = 10; d < 100; d++) if (d % k !== 0) non.push(d);
    return mkTxt(r, 'Which number is a <b>multiple</b> of ' + k + '?', String(m), sample(r, non, 3).map(String));
  };
  M.fracSame = () => r => { const d = ri(r, 5, 12), a = ri(r, 1, d - 2), b = ri(r, 1, d - 1 - a); return mkFracKeep(r, fr(a, d) + ' + ' + fr(b, d) + ' = ?', a + b, d, [[a + b, 2 * d], [a + b + 1, d], [Math.max(1, a + b - 1), d]]); };
  function mkFracKeep(r, p, n, d, wrongs) {       // unreduced answer kept as printed
    const list = [{n, d}], seen = new Set([n + '/' + d]);
    wrongs.concat([[n + 2, d], [n, d + 1]]).forEach(w => { const k = w[0] + '/' + w[1]; if (!seen.has(k) && w[0] * d !== n * w[1] && list.length < 4) { seen.add(k); list.push({n: w[0], d: w[1]}); } });
    const sh = shuffle(r, list);
    return {p, c: sh.map(x => fr(x.n, x.d)), a: sh.findIndex(x => x.n === n && x.d === d)};
  }
  M.fracEquiv = () => r => { const b = ri(r, 2, 6), a = ri(r, 1, b - 1), k = ri(r, 2, 6); return mkNum(r, a * k, fr(a, b) + ' = ' + fr('□', b * k), {min: 1}); };
  M.fracUnlike = () => r => {
    const ds = pick(r, [[2, 3], [2, 4], [3, 6], [2, 6], [4, 6], [3, 4], [2, 5], [5, 10]]), b = ds[0], d = ds[1];
    const a = ri(r, 1, b - 1), c = ri(r, 1, d - 1), n = a * d + c * b, den = b * d;
    return mkFrac(r, fr(a, b) + ' + ' + fr(c, d) + ' = ?', n, den, [[a + c, b + d], [a + c, Math.max(b, d)]]);
  };
  M.fracOf = () => r => { const b = ri(r, 2, 6), a = ri(r, 1, b - 1), k = ri(r, 2, 9); return mkNum(r, a * k, fr(a, b) + ' of ' + b * k + ' = ?', {min: 0, wrong: [k, b * k - a * k]}); };
  M.fracMul = () => r => { const b = ri(r, 2, 7), a = ri(r, 1, b - 1), d = ri(r, 2, 7), c = ri(r, 1, d - 1); return mkFrac(r, fr(a, b) + ' × ' + fr(c, d) + ' = ?', a * c, b * d, [[a + c, b + d], [a * c, b + d], [a + c, b * d]]); };
  M.decAdd = dp => r => { const s = Math.pow(10, dp), a = ri(r, 11, 99 * s / 10 | 0) / s, b = ri(r, 11, 99 * s / 10 | 0) / s; return r() < 0.6 ? mkNum(r, a + b, a.toFixed(dp) + ' + ' + b.toFixed(dp) + ' = ?', {dp}) : mkNum(r, Math.abs(a - b), Math.max(a, b).toFixed(dp) + ' − ' + Math.min(a, b).toFixed(dp) + ' = ?', {dp}); };
  M.decMul = () => r => { const x = ri(r, 2, 9), y = ri(r, 2, 9); return mkNum(r, x * y / 100, (x / 10).toFixed(1) + ' × ' + (y / 10).toFixed(1) + ' = ?', {dp: 2, wrong: [x * y / 10, x * y / 1000]}); };
  M.pct = pcts => r => { const p = pick(r, pcts), base = 100 / gcd(100, p), n = base * ri(r, 1, Math.max(1, Math.floor(400 / base / 2))); return mkNum(r, n * p / 100, p + '% of ' + n + ' = ?', {min: 0}); };
  M.avg = () => r => { const m = ri(r, 3, 25), v = []; for (let i = 0; i < 3; i++) v.push(ri(r, Math.max(1, m - 6), m + 6)); const last = 4 * m - v[0] - v[1] - v[2]; if (last < 1) return M.avg()(r); v.push(last); return mkNum(r, m, 'Find the <b>mean</b> of ' + shuffle(r, v).join(', ') + '.', {min: 0}); };
  M.median = () => r => { const set = new Set(); while (set.size < 5) set.add(ri(r, 2, 40)); const v = shuffle(r, [...set]), s = v.slice().sort((a, b) => a - b); return mkNum(r, s[2], 'Find the <b>median</b> of ' + v.join(', ') + '.', {min: 0, wrong: [s[1], s[3]]}); };
  M.lcm = () => r => { const a = ri(r, 2, 12), b = until(() => ri(r, 2, 12), v => v !== a); return mkNum(r, lcm(a, b), 'LCM of ' + a + ' and ' + b + ' = ?', {min: 1, wrong: [a * b, gcd(a, b)]}); };
  M.hcf = () => r => { const g = ri(r, 2, 9), x = ri(r, 2, 6), y = until(() => ri(r, 2, 7), v => v !== x && gcd(v, x) === 1); return mkNum(r, g, 'HCF of ' + g * x + ' and ' + g * y + ' = ?', {min: 1, wrong: [g * x * y, g * 2]}); };
  M.intAdd = () => r => {
    const a = until(() => ri(r, -12, 12), v => v !== 0), b = until(() => ri(r, -12, 12), v => v !== 0), plus = r() < 0.5;
    const t = v => (v < 0 ? '(−' + (-v) + ')' : String(v));
    return mkNum(r, plus ? a + b : a - b, t(a) + (plus ? ' + ' : ' − ') + t(b) + ' = ?', {neg: true});
  };
  M.intMul = () => r => {
    const a = until(() => ri(r, -9, 9), v => v !== 0), b = until(() => ri(r, -9, 9), v => v !== 0), t = v => (v < 0 ? '(−' + (-v) + ')' : String(v));
    if (r() < 0.5) return mkNum(r, a * b, t(a) + ' × ' + t(b) + ' = ?', {neg: true});
    return mkNum(r, b, t(a * b) + ' ÷ ' + t(a) + ' = ?', {neg: true});
  };
  M.bodmas = () => r => {
    const a = ri(r, 2, 12), b = ri(r, 2, 9), c = ri(r, 2, 9);
    const k = ri(r, 0, 3);
    if (k === 0) return mkNum(r, a + b * c, a + ' + ' + b + ' × ' + c + ' = ?', {wrong: [(a + b) * c]});
    if (k === 1) return mkNum(r, (a + b) * c, '(' + a + ' + ' + b + ') × ' + c + ' = ?', {wrong: [a + b * c]});
    if (k === 2) return mkNum(r, a * b - c, a + ' × ' + b + ' − ' + c + ' = ?', {min: 0, wrong: [a * (b - c)]});
    return mkNum(r, a * b / b + c, a * b + ' ÷ ' + b + ' + ' + c + ' = ?', {wrong: [a * b / (b + c)]});
  };
  M.pow = kinds => r => {
    const k = pick(r, kinds);
    if (k === 'sq') { const n = ri(r, 2, 15); return mkNum(r, n * n, sup(n, 2) + ' = ?', {wrong: [n * 2, n * 3]}); }
    if (k === 'cube') { const n = ri(r, 2, 8); return mkNum(r, n * n * n, sup(n, 3) + ' = ?', {wrong: [n * 3, n * n]}); }
    const n = ri(r, 2, 15); return mkNum(r, n, '√' + n * n + ' = ?', {min: 1, wrong: [n * n / 2 | 0]});
  };
  M.ratio = () => r => {
    const x = ri(r, 1, 8), y = until(() => ri(r, 1, 9), v => v !== x && gcd(v, x) === 1), g = ri(r, 2, 6);
    return mkTxt(r, 'Simplify the ratio <b>' + x * g + ' : ' + y * g + '</b>', x + ' : ' + y, [y + ' : ' + x, (x + 1) + ' : ' + y, x + ' : ' + (y + 1), (x * 2) + ' : ' + y]);
  };
  M.prop = () => r => { const a = ri(r, 1, 6), b = ri(r, a + 1, 9), k = ri(r, 2, 6); return mkNum(r, b * k, a + ' : ' + b + ' = ' + a * k + ' : ?', {min: 1, wrong: [b + a * k]}); };
  M.lin1 = () => r => {
    const k = ri(r, 0, 2);
    if (k === 0) { const a = ri(r, 2, 20), b = ri(r, a + 1, 40); return mkNum(r, b - a, 'Solve: x + ' + a + ' = ' + b, {min: 0, wrong: [b + a]}); }
    if (k === 1) { const a = ri(r, 2, 20), b = ri(r, 2, 30); return mkNum(r, b + a, 'Solve: x − ' + a + ' = ' + b, {min: 0, wrong: [b - a]}); }
    const a = ri(r, 2, 9), x = ri(r, 2, 12); return mkNum(r, x, 'Solve: ' + a + 'x = ' + a * x, {min: 1, wrong: [a * x - a]});
  };
  M.lin2 = neg => r => {
    const a = ri(r, 2, 9), x = neg && r() < 0.4 ? -ri(r, 1, 9) : ri(r, 1, 12), b = ri(r, -15, 20) || 5, c = a * x + b;
    return mkNum(r, x, 'Solve: ' + lin(a, b) + ' = ' + sgn(c), {neg: true, wrong: [(c + b) / a, (c - b) / a * -1]});
  };
  M.lin3 = () => r => {
    const c = ri(r, 1, 4), a = c + ri(r, 1, 5), x = ri(r, -6, 10), b = ri(r, -10, 12), d = a * x + b - c * x;
    return mkNum(r, x, 'Solve: ' + lin(a, b) + ' = ' + lin(c, d), {neg: true});
  };
  M.simult = () => r => {
    const y = ri(r, 1, 9), x = y + ri(r, 1, 9), wantX = r() < 0.5;
    return mkNum(r, wantX ? x : y, 'If x + y = ' + (x + y) + ' and x − y = ' + (x - y) + ', find <b>' + (wantX ? 'x' : 'y') + '</b>.', {min: 0});
  };
  M.profit = () => r => {
    if (r() < 0.5) { const cp = ri(r, 4, 40) * 50, ch = ri(r, 1, 6) * 10, loss = r() < 0.4; const sp = loss ? cp - ch * 5 : cp + ch * 5; return mkNum(r, ch * 5, 'An article costs Rs. ' + cp + ' and is sold for Rs. ' + sp + '. What is the ' + (loss ? '<b>loss</b>' : '<b>profit</b>') + '?', {fmt: v => 'Rs. ' + v, step: 10, min: 0}); }
    const m = ri(r, 5, 25), p = pick(r, [10, 20, 25, 50]), cp = 20 * m * 5; return mkNum(r, p, 'An article bought for Rs. ' + cp + ' is sold for Rs. ' + (cp + cp * p / 100) + '. Find the <b>profit percent</b>.', {fmt: v => v + '%', step: 5, min: 0});
  };
  M.discount = () => r => { const mp = 20 * ri(r, 5, 50), d = pick(r, [10, 20, 25, 50]); return mkNum(r, mp - mp * d / 100, 'A shirt is marked at Rs. ' + mp + ' with ' + d + '% discount. What is the sale price?', {fmt: v => 'Rs. ' + v, step: 10, min: 0, wrong: [mp * d / 100]}); };
  M.si = () => r => { const p = ri(r, 2, 40) * 500, rt = ri(r, 4, 10), t = ri(r, 1, 5); return mkNum(r, p * rt * t / 100, 'Find the <b>simple interest</b> on Rs. ' + p + ' at ' + rt + '% per year for ' + t + ' year' + (t > 1 ? 's' : '') + '.', {fmt: v => 'Rs. ' + v, step: 50, min: 0, wrong: [p * rt * t / 1000]}); };
  M.angles = () => r => {
    const k = ri(r, 0, 2);
    if (k === 0) { const a = ri(r, 3, 12) * 5, b = ri(r, 3, 12) * 5; return mkNum(r, 180 - a - b, 'Two angles of a triangle are ' + a + '° and ' + b + '°. Find the third angle.', {fmt: v => v + '°', step: 5, min: 1}); }
    if (k === 1) { const a = ri(r, 2, 17) * 10; return mkNum(r, 180 - a, 'Find the <b>supplement</b> of ' + a + '°.', {fmt: v => v + '°', step: 10, min: 1, wrong: [90 - a > 0 ? 90 - a : a]}); }
    const a = ri(r, 1, 8) * 10; return mkNum(r, 90 - a, 'Find the <b>complement</b> of ' + a + '°.', {fmt: v => v + '°', step: 10, min: 1, wrong: [180 - a]});
  };
  M.pyth = () => r => {
    const t = pick(r, [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29]]);
    if (r() < 0.55) return mkNum(r, t[2], 'The two shorter sides of a right triangle are ' + t[0] + ' cm and ' + t[1] + ' cm. Find the <b>hypotenuse</b>.', {fmt: v => v + ' cm', wrong: [t[0] + t[1]], min: 1});
    return mkNum(r, t[1], 'In a right triangle the hypotenuse is ' + t[2] + ' cm and one side is ' + t[0] + ' cm. Find the <b>other side</b>.', {fmt: v => v + ' cm', wrong: [t[2] - t[0]], min: 1});
  };
  M.circle = () => r => {
    const rad = pick(r, [7, 14, 21]);
    if (r() < 0.5) return mkNum(r, 22 / 7 * rad * rad, 'Area of a circle of radius ' + rad + ' cm (π = 22/7).', {fmt: v => v + ' cm²', step: 22, wrong: [2 * 22 / 7 * rad], min: 1});
    return mkNum(r, 44 * rad / 7, 'Circumference of a circle of radius ' + rad + ' cm (π = 22/7).', {fmt: v => v + ' cm', step: 22, wrong: [22 / 7 * rad * rad], min: 1});
  };
  M.triArea = () => r => { const b = ri(r, 3, 20), h = until(() => ri(r, 3, 20), v => (b * v) % 2 === 0); return mkNum(r, b * h / 2, 'A triangle has base ' + b + ' cm and height ' + h + ' cm. Find its area.', {fmt: v => v + ' cm²', wrong: [b * h], min: 1}); };
  M.evalExpr = neg => r => {
    const x = neg ? ri(r, -5, 6) : ri(r, 1, 9), k = ri(r, 0, 2);
    if (k === 0) { const a = ri(r, 2, 9), b = ri(r, 1, 15); return mkNum(r, a * x + b, 'If x = ' + sgn(x) + ', find the value of ' + a + 'x + ' + b, {neg: true}); }
    if (k === 1) { const a = ri(r, 2, 6), b = ri(r, 1, 12); return mkNum(r, a * x * x - b, 'If x = ' + sgn(x) + ', find the value of ' + a + 'x<sup>2</sup> − ' + b, {neg: true}); }
    const a = ri(r, 2, 6), b = ri(r, 1, 8); return mkNum(r, a * (x + b), 'If x = ' + sgn(x) + ', find the value of ' + a + '(x + ' + b + ')', {neg: true});
  };
  M.expandMid = () => r => { const a = ri(r, 2, 9), minus = r() < 0.4; return mkNum(r, minus ? -2 * a : 2 * a, '(x ' + (minus ? '−' : '+') + ' ' + a + ')<sup>2</sup> = x<sup>2</sup> + (□)x + ' + a * a, {neg: true, step: 2}); };
  M.diffSq = () => r => { const a = ri(r, 2, 12); return mkNum(r, a, 'x<sup>2</sup> − ' + a * a + ' = (x − ' + a + ')(x + □)', {min: 1, wrong: [a * a]}); };
  M.trinomial = () => r => { const p = ri(r, 1, 8), q = until(() => ri(r, 1, 9), v => v !== p); return mkNum(r, q, poly(1, p + q, p * q) + ' = (x + ' + p + ')(x + □)', {min: 1, wrong: [p + q]}); };
  M.indices = () => r => {
    const a = ri(r, 2, 6), m = ri(r, 3, 9), n = ri(r, 2, m - 1), k = ri(r, 0, 3);
    if (k === 0) return mkNum(r, m + n, sup(a, m) + ' × ' + sup(a, n) + ' = ' + a + '<sup>□</sup>', {min: 0, wrong: [m * n]});
    if (k === 1) return mkNum(r, m - n, sup(a, m) + ' ÷ ' + sup(a, n) + ' = ' + a + '<sup>□</sup>', {min: 0, wrong: [m / n | 0]});
    if (k === 2) return mkNum(r, m * n, '(' + sup(a, m) + ')<sup>' + n + '</sup> = ' + a + '<sup>□</sup>', {min: 0, wrong: [m + n]});
    return mkNum(r, 1, sup(a, 0) + ' = ?', {min: 0, wrong: [0, a]});
  };
  M.sets = () => r => { const p = ri(r, 5, 25), q = ri(r, 5, 25), k = ri(r, 1, Math.min(p, q) - 1); return mkNum(r, p + q - k, 'If n(A) = ' + p + ', n(B) = ' + q + ' and n(A ∩ B) = ' + k + ', find n(A ∪ B).', {min: 1, wrong: [p + q]}); };
  M.quadRoots = () => r => {
    const p = until(() => ri(r, -9, 9), v => v !== 0), q = until(() => ri(r, -9, 9), v => v !== 0 && Math.abs(v) !== Math.abs(p));
    const show = (a, b) => { const l = [a, b].sort((x, y) => x - y); return sgn(l[0]) + ' and ' + sgn(l[1]); };
    return mkTxt(r, 'Roots of <b>' + poly(1, -(p + q), p * q) + ' = 0</b>', show(p, q), [show(-p, -q), show(-p, q), show(p, -q)]);
  };
  M.disc = () => r => { const a = ri(r, 1, 4), b = ri(r, -9, 9), c = until(() => ri(r, -6, 6), v => v !== 0); return mkNum(r, b * b - 4 * a * c, 'Find the discriminant of <b>' + poly(a, b, c) + ' = 0</b>', {neg: true, wrong: [b * b + 4 * a * c, b * b - a * c]}); };
  M.sumProd = () => r => {
    const p = ri(r, -6, 8), q = ri(r, -6, 8), a = pick(r, [1, 1, 2, 3]), sum = r() < 0.5;
    const eq = poly(a, -a * (p + q), a * p * q);
    return mkNum(r, sum ? p + q : p * q, 'For <b>' + eq + ' = 0</b>, find the ' + (sum ? 'sum' : 'product') + ' of the roots.', {neg: true, wrong: [sum ? -(p + q) : -(p * q), sum ? a * (p + q) : a * p * q]});
  };
  M.log = () => r => {
    const b = pick(r, [2, 3, 4, 5, 10]), k = ri(r, 1, b === 10 ? 4 : b === 2 ? 6 : 3);
    return mkNum(r, k, 'log<sub>' + b + '</sub> ' + Math.pow(b, k) + ' = ?', {min: 0, wrong: [Math.pow(b, k) / b | 0]});
  };
  M.logLaw = () => r => {
    const k = ri(r, 0, 2);
    if (k === 0) { const a = ri(r, 2, 9), b = ri(r, 2, 9); return mkNum(r, a * b, 'log ' + a + ' + log ' + b + ' = log □', {min: 1, wrong: [a + b]}); }
    if (k === 1) { const b = ri(r, 2, 6), q = ri(r, 2, 9); return mkNum(r, q, 'log ' + b * q + ' − log ' + b + ' = log □', {min: 1, wrong: [b * q - b]}); }
    const a = ri(r, 2, 4), n = ri(r, 2, 4); return mkNum(r, Math.pow(a, n), n + ' log ' + a + ' = log □', {min: 1, wrong: [a * n]});
  };
  M.dist = () => r => { const t = pick(r, [[3, 4, 5], [5, 12, 13], [6, 8, 10]]), x1 = ri(r, -4, 4), y1 = ri(r, -4, 4), sx = r() < 0.5 ? 1 : -1, sy = r() < 0.5 ? 1 : -1; return mkNum(r, t[2], 'Distance between (' + sgn(x1) + ', ' + sgn(y1) + ') and (' + sgn(x1 + sx * t[0]) + ', ' + sgn(y1 + sy * t[1]) + ')', {min: 1, wrong: [t[0] + t[1]]}); };
  M.slope = () => r => { const m = until(() => ri(r, -5, 5), v => v !== 0), dx = ri(r, 1, 4), x1 = ri(r, -3, 3), y1 = ri(r, -3, 3); return mkNum(r, m, 'Slope of the line through (' + sgn(x1) + ', ' + sgn(y1) + ') and (' + sgn(x1 + dx) + ', ' + sgn(y1 + m * dx) + ')', {neg: true, wrong: [-m, dx]}); };
  const TRIG = {sin: {0: ['0'], 30: [fr(1, 2)], 45: [fr(1, '√2')], 60: [fr('√3', 2)], 90: ['1']}, cos: {0: ['1'], 30: [fr('√3', 2)], 45: [fr(1, '√2')], 60: [fr(1, 2)], 90: ['0']}, tan: {0: ['0'], 30: [fr(1, '√3')], 45: ['1'], 60: ['√3']}};
  M.trig = () => r => {
    const f = pick(r, ['sin', 'cos', 'tan']), ang = pick(r, Object.keys(TRIG[f]).map(Number)), ans = TRIG[f][ang][0];
    const pool = ['0', fr(1, 2), fr(1, '√2'), fr('√3', 2), '1', fr(1, '√3'), '√3'];
    return mkTxt(r, f + ' ' + ang + '° = ?', ans, shuffle(r, pool.filter(x => x !== ans)).slice(0, 3));
  };
  M.vary = () => r => {
    if (r() < 0.5) { const k = ri(r, 2, 6), x0 = ri(r, 2, 6), x1 = until(() => ri(r, 2, 12), v => v !== x0); return mkNum(r, k * x1, 'y varies directly as x. If y = ' + k * x0 + ' when x = ' + x0 + ', find y when x = ' + x1 + '.', {min: 1, wrong: [k * x0 + x1 - x0]}); }
    const x0 = pick(r, [2, 3, 4, 6]), x1 = until(() => pick(r, [1, 2, 3, 4, 6, 12]), v => v !== x0), P = lcm(x0, x1) * ri(r, 1, 3);
    return mkNum(r, P / x1, 'y varies inversely as x. If y = ' + P / x0 + ' when x = ' + x0 + ', find y when x = ' + x1 + '.', {min: 1, wrong: [P / x0 * x1 / x0 | 0 || 1]});
  };
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  M.comb = () => r => {
    const n = ri(r, 4, 9), k = ri(r, 2, 3), nCr = fact(n) / (fact(k) * fact(n - k)), nPr = fact(n) / fact(n - k);
    return r() < 0.55 ? mkNum(r, nCr, 'C(' + n + ', ' + k + ') = ?', {min: 1, wrong: [nPr]}) : mkNum(r, nPr, 'P(' + n + ', ' + k + ') = ?', {min: 1, wrong: [nCr]});
  };
  M.ap = () => r => {
    const a = ri(r, 1, 12), d = ri(r, 2, 7), n = ri(r, 3, 12);
    if (r() < 0.5) return mkNum(r, a + (n - 1) * d, 'Arithmetic progression: a = ' + a + ', d = ' + d + '. Find the ' + n + 'th term.', {min: 1, wrong: [a + n * d]});
    const m = n % 2 ? n + 1 : n; return mkNum(r, m * (2 * a + (m - 1) * d) / 2, 'Arithmetic progression: a = ' + a + ', d = ' + d + '. Find the sum of the first ' + m + ' terms.', {min: 1, step: d, wrong: [m * (a + (m - 1) * d)]});
  };
  M.gp = () => r => { const a = ri(r, 1, 5), q = ri(r, 2, 3), n = ri(r, 3, 6); return mkNum(r, a * Math.pow(q, n - 1), 'Geometric progression: a = ' + a + ', r = ' + q + '. Find the ' + n + 'th term.', {min: 1, wrong: [a * Math.pow(q, n)]}); };
  M.complex = () => r => {
    const n = ri(r, 2, 14), v = ['1', 'i', '−1', '−i'][n % 4];
    return {p: 'i<sup>' + n + '</sup> = ?', c: ['1', '−1', 'i', '−i'], a: ['1', '−1', 'i', '−i'].indexOf(v)};
  };
  M.func = () => r => { const a = ri(r, 1, 4), b = ri(r, -6, 6), c = ri(r, -9, 9), k = ri(r, -3, 4); return mkNum(r, a * k * k + b * k + c, 'If f(x) = ' + poly(a, b, c) + ', find f(' + sgn(k) + ').', {neg: true, wrong: [a * k + b + c]}); };
  M.deriv = () => r => {
    const a = ri(r, 1, 6), n = ri(r, 2, 6), ans = xpow(a * n, n - 1);
    return mkTxt(r, 'd/dx (' + xpow(a, n) + ') = ?', ans, [xpow(a, n - 1), xpow(a * n, n), xpow(a * (n - 1), n - 1), xpow(a * n, Math.max(0, n - 2))]);
  };
  M.derivAt = () => r => { const a = ri(r, 1, 5), b = ri(r, -6, 8), k = ri(r, -3, 4); return mkNum(r, 2 * a * k + b, 'If f(x) = ' + poly(a, b, 0) + ', find f ′(' + sgn(k) + ').', {neg: true, wrong: [a * k * k + b * k, 2 * a * k]}); };
  M.limit = () => r => {
    if (r() < 0.6) { const a = ri(r, 1, 9); return mkNum(r, 2 * a, 'lim<sub>x→' + a + '</sub> (x<sup>2</sup> − ' + a * a + ') / (x − ' + a + ')', {min: 1, wrong: [a * a, a]}); }
    const a = ri(r, 2, 6), b = ri(r, -6, 8), k = ri(r, 1, 5); return mkNum(r, a * k + b, 'lim<sub>x→' + k + '</sub> (' + lin(a, b) + ')', {neg: true});
  };
  M.integ = () => r => {
    const n = ri(r, 1, 4), m = ri(r, 1, 5), c = (n + 1) * m;
    return mkTxt(r, '∫ ' + xpow(c, n) + ' dx = ?', xpow(m, n + 1) + ' + C', [xpow(c, n + 1) + ' + C', xpow(m, n) + ' + C', xpow(c * (n + 1), n + 1) + ' + C']);
  };
  const DER = [['sin x', 'cos x'], ['cos x', '−sin x'], ['e<sup>x</sup>', 'e<sup>x</sup>'], ['ln x', fr(1, 'x')], ['tan x', 'sec<sup>2</sup>x'], ['x', '1']];
  M.derivFn = () => r => { const t = pick(r, DER); return mkTxt(r, 'd/dx (' + t[0] + ') = ?', t[1], shuffle(r, DER.map(x => x[1]).concat(['−cos x'])).filter(x => x !== t[1]).slice(0, 3)); };
  M.dot = () => r => { const a = ri(r, -5, 5), b = ri(r, -5, 5), c = ri(r, -5, 5), d = ri(r, -5, 5); return mkNum(r, a * c + b * d, 'If u = (' + sgn(a) + ', ' + sgn(b) + ') and v = (' + sgn(c) + ', ' + sgn(d) + '), find u · v.', {neg: true, wrong: [a * d + b * c]}); };
  M.defInt = () => r => {
    const k = ri(r, 1, 4), m = ri(r, 1, 4);
    if (r() < 0.5) return mkNum(r, m * k * k, '∫<sub>0</sub><sup>' + k + '</sup> ' + 2 * m + 'x dx', {min: 0, wrong: [2 * m * k]});
    return mkNum(r, m * k * k * k, '∫<sub>0</sub><sup>' + k + '</sup> ' + 3 * m + 'x<sup>2</sup> dx', {min: 0, wrong: [3 * m * k * k]});
  };
  M.mix = list => r => pick(r, list)(r);

  // the ladders: nine skills, then a boss that mixes them
  function ladder(rows) { const fns = rows.map(x => x[1]); return rows.concat([['Boss: all mixed', M.mix(fns)]]); }
  const MATH_LADDER = {
    1: ladder([['Add to 5', M.add(0, 5, 0, 5, {max: 5})], ['Take away to 5', M.sub(0, 5, 0, 5)], ['Add to 10', M.add(0, 10, 0, 10, {max: 10})], ['Take away to 10', M.sub(0, 10, 0, 10)],
      ['Missing number', M.missing('add', 10)], ['Bigger, smaller, same', M.compare(50)], ['Add to 20', M.add(1, 19, 1, 19, {max: 20})], ['Take away to 20', M.sub(5, 20, 1, 12)], ['Before, after, between', M.near(['after', 'before', 'between'], 100)]]),
    2: ladder([['Add tens and ones', M.add(10, 60, 1, 9, {max: 99})], ['Add without carrying', M.add(11, 55, 11, 44, {carry: false, max: 99})], ['Add with carrying', M.add(15, 70, 15, 70, {carry: true, max: 99})], ['Take away', M.sub(20, 99, 5, 50)],
      ['Place value', M.place(3)], ['Tables of 2, 5, 10', M.table([2, 5, 10], 10)], ['Tables of 3 and 4', M.table([3, 4], 10)], ['Odd and even', M.oddEven()], ['Skip counting', M.skip([2, 5, 10])]]),
    3: ladder([['Add 3-digit numbers', M.add(100, 600, 100, 350)], ['Take away 3-digit numbers', M.sub(300, 999, 100, 299)], ['Tables 2 to 5', M.table([2, 3, 4, 5], 10)], ['Tables 6 to 10', M.table([6, 7, 8, 9, 10], 10)],
      ['Division facts', M.div(2, 9, 2, 9)], ['Round to 10', M.round(10, 99)], ['Story sums', M.story(['add', 'sub', 'mul', 'div'], 5, 40)], ['Perimeter of a rectangle', M.rect('p')], ['2-digit times 1-digit', M.mul(11, 40, 2, 9)]]),
    4: ladder([['Add 4-digit numbers', M.add(1000, 6000, 1000, 3000)], ['Take away 4-digit numbers', M.sub(3000, 9999, 1000, 2999, {borrow: true})], ['2-digit times 1-digit', M.mul(12, 99, 2, 9)], ['3-digit times 1-digit', M.mul(101, 300, 2, 5)],
      ['Divide a 3-digit number', M.div(2, 9, 20, 99)], ['Factors and multiples', M.factor()], ['Add fractions', M.fracSame()], ['Equal fractions', M.fracEquiv()], ['Area and perimeter', M.rect('mix')]]),
    5: ladder([['2-digit times 2-digit', M.mul(12, 60, 11, 30)], ['Long division', M.div(11, 25, 12, 40)], ['LCM', M.lcm()], ['HCF', M.hcf()], ['Add unlike fractions', M.fracUnlike()],
      ['Fraction of a number', M.fracOf()], ['Decimals', M.decAdd(1)], ['Percent of a number', M.pct([10, 20, 25, 50])], ['Average', M.avg()]]),
    6: ladder([['Integers', M.intAdd()], ['BODMAS', M.bodmas()], ['Squares, cubes, roots', M.pow(['sq', 'cube', 'root'])], ['Multiply fractions', M.fracMul()], ['Multiply decimals', M.decMul()],
      ['Percent', M.pct([5, 10, 15, 20, 25, 40, 75])], ['Ratio', M.ratio()], ['Simple equations', M.lin1()], ['Circles', M.circle()]]),
    7: ladder([['Multiply integers', M.intMul()], ['Laws of indices', M.indices()], ['Two-step equations', M.lin2(false)], ['Proportion', M.prop()], ['Profit and loss', M.profit()],
      ['Simple interest', M.si()], ['Angles', M.angles()], ['Pythagoras', M.pyth()], ['Squares and roots', M.pow(['sq', 'root'])]]),
    8: ladder([['Value of an expression', M.evalExpr(false)], ['Expand (x + a)²', M.expandMid()], ['Factorise', M.diffSq()], ['Both sides', M.lin3()], ['Discount', M.discount()],
      ['Laws of indices', M.indices()], ['Median', M.median()], ['Area of a triangle', M.triArea()], ['Two equations', M.simult()]]),
    9: ladder([['Laws of indices', M.indices()], ['Sets', M.sets()], ['Expressions with negatives', M.evalExpr(true)], ['Linear equations', M.lin2(true)], ['Factorise x² + bx + c', M.trinomial()],
      ['Roots of a quadratic', M.quadRoots()], ['Logarithms', M.log()], ['Distance between points', M.dist()], ['Trig table', M.trig()]]),
    10: ladder([['Discriminant', M.disc()], ['Roots of a quadratic', M.quadRoots()], ['Sum and product of roots', M.sumProd()], ['Trig table', M.trig()], ['Variation', M.vary()],
      ['Mean and median', M.mix([M.avg(), M.median()])], ['Distance and slope', M.mix([M.dist(), M.slope()])], ['Log laws', M.logLaw()], ['Simultaneous equations', M.simult()]]),
    11: ladder([['Functions', M.func()], ['Log laws', M.logLaw()], ['Permutations and combinations', M.comb()], ['Trig table', M.trig()], ['Arithmetic progression', M.ap()],
      ['Geometric progression', M.gp()], ['Powers of i', M.complex()], ['Slope of a line', M.slope()], ['Quadratics', M.mix([M.disc(), M.sumProd()])]]),
    12: ladder([['Differentiate', M.deriv()], ['Gradient at a point', M.derivAt()], ['Limits', M.limit()], ['Integrate', M.integ()], ['Derivatives of functions', M.derivFn()],
      ['Dot product', M.dot()], ['Definite integrals', M.defInt()], ['Distance between points', M.dist()], ['Slope of a line', M.slope()]])
  };

  // ---------- Little Learners ----------
  const VOC = () => root.SB_GAMES_VOCAB || {words: [], colors: [], numbers: [], shapes: [], names: []};
  const flash = w => '<b>' + esc(w.w) + '</b>' + (w.ur ? ' · <span dir="rtl" lang="ur">' + esc(w.ur) + '</span>' : '') + (w.ps ? ' · <span dir="rtl" lang="ps">' + esc(w.ps) + '</span>' : '');
  const pics = (e, n) => '<span class="g-pics">' + new Array(n + 1).join('<i>' + e + '</i>') + '</span>';
  const GROUP = {animal: 'animals', fruit: 'fruits', veg: 'vegetables', food: 'food', nature: 'things in nature', body: 'parts of the body', thing: 'things we use', place: 'places', vehicle: 'vehicles'};
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const L = {};
  L.picWord = hard => r => {
    const W = VOC().words, w = pick(r, W), same = W.filter(x => x !== w && x.g === w.g), other = W.filter(x => x !== w && x.g !== w.g);
    const wr = (hard ? sample(r, same, 2).concat(sample(r, other, 1)) : sample(r, other, 3));
    const it = mkTxt(r, '<span class="g-emo">' + w.e + '</span><span class="g-q">What is this?</span>', w.w, wr.map(x => x.w));
    it.x = flash(w); it.say = w.w; return it;
  };
  L.wordPic = () => r => {
    const W = VOC().words, w = pick(r, W), wr = sample(r, W.filter(x => x !== w && x.g !== w.g), 3);
    const it = mkTxt(r, '<span class="g-q">Find the <b>' + esc(w.w) + '</b></span>', w.e, wr.map(x => x.e));
    it.big = true; it.x = flash(w); it.say = w.w; return it;
  };
  L.firstLetter = () => r => {
    const w = pick(r, VOC().words), first = w.w[0].toUpperCase();
    const it = mkTxt(r, '<span class="g-emo">' + w.e + '</span><span class="g-q">Which letter does it start with?</span>', first, sample(r, LETTERS.filter(l => l !== first), 3));
    it.x = flash(w) + ' — starts with <b>' + first + '</b>'; it.say = w.w; return it;
  };
  L.wordFill = () => r => {
    const w = pick(r, VOC().words.filter(x => x.w.length >= 3 && x.w.length <= 7)), i = ri(r, 1, w.w.length - 1), ans = w.w[i];
    const shown = w.w.split('').map((ch, j) => (j === i ? '<u>  </u>' : esc(ch))).join(' ');
    const it = mkTxt(r, '<span class="g-emo">' + w.e + '</span><span class="g-q g-word">' + shown + '</span>', ans.toUpperCase(), sample(r, LETTERS.filter(l => l.toLowerCase() !== ans), 3));
    it.x = flash(w); it.say = w.w; return it;
  };
  L.letterCase = () => r => {
    const l = pick(r, LETTERS), up = r() < 0.5, ans = up ? l.toLowerCase() : l;
    const it = mkTxt(r, '<span class="g-q">Find the ' + (up ? '<b>small</b>' : '<b>capital</b>') + ' letter for</span><span class="g-big">' + (up ? l : l.toLowerCase()) + '</span>', ans, sample(r, LETTERS.filter(x => x !== l), 3).map(x => (up ? x.toLowerCase() : x)));
    it.say = ''; return it;
  };
  L.count = maxN => r => {
    const w = pick(r, VOC().words.filter(x => x.g === 'fruit' || x.g === 'animal' || x.g === 'thing')), n = ri(r, 1, maxN);
    const it = mkNum(r, n, pics(w.e, n) + '<span class="g-q">How many?</span>', {min: 1}); it.x = n + ' ' + esc(w.w) + (n > 1 ? 's' : ''); return it;
  };
  L.numNear = (kinds, max) => r => M.near(kinds, max)(r);
  L.bigger = max => r => {
    const set = new Set(); while (set.size < 3) set.add(ri(r, 1, max));
    const v = [...set], big = r() < 0.5, ans = big ? Math.max.apply(null, v) : Math.min.apply(null, v), sh = shuffle(r, v);
    return {p: '<span class="g-q">Which number is the <b>' + (big ? 'biggest' : 'smallest') + '</b>?</span>', c: sh.map(String), a: sh.indexOf(ans)};
  };
  L.oddOne = () => r => {
    const W = VOC().words, groups = [...new Set(W.map(w => w.g))].filter(g => W.filter(w => w.g === g).length >= 3);
    const g1 = pick(r, groups), g2 = pick(r, groups.filter(g => g !== g1)), three = sample(r, W.filter(w => w.g === g1), 3), odd = pick(r, W.filter(w => w.g === g2));
    const all = shuffle(r, three.concat([odd]));
    return {p: '<span class="g-q">Which one is <b>different</b>?</span>', c: all.map(w => w.e), a: all.indexOf(odd), big: true,
      x: three.map(w => esc(w.w)).join(', ') + ' are ' + GROUP[g1] + '. <b>' + esc(odd.w) + '</b> is not.'};
  };
  L.shape = () => r => {
    const S = VOC().shapes, s = pick(r, S), it = mkTxt(r, '<span class="g-emo">' + s.e + '</span><span class="g-q">What shape is this?</span>', s.w, S.filter(x => x !== s).map(x => x.w).slice(0, 3));
    it.x = flash(s); it.say = s.w; return it;
  };
  L.color = () => r => {
    const C = VOC().colors, c = pick(r, C), it = mkTxt(r, '<span class="g-emo">' + c.e + '</span><span class="g-q">What colour is this?</span>', c.w, sample(r, C.filter(x => x !== c), 3).map(x => x.w));
    it.x = flash(c); it.say = c.w; return it;
  };
  L.pattern = () => r => {
    // A B A B A -> B   and   A A B A A -> B
    const two = sample(r, VOC().words, 4), A = two[0].e, B = two[1].e;
    const seq = r() < 0.5 ? [A, B, A, B, A] : [A, A, B, A, A];
    const it = mkTxt(r, '<span class="g-pics">' + seq.map(e => '<i>' + e + '</i>').join('') + '<i>❓</i></span><span class="g-q">What comes next?</span>', B, [A, two[2].e, two[3].e]);
    it.big = true; it.x = 'The pattern keeps repeating.'; return it;
  };
  L.addPics = max => r => {
    const w = pick(r, VOC().words.filter(x => x.g === 'fruit' || x.g === 'animal')), a = ri(r, 1, max - 1), b = ri(r, 1, Math.min(max - a, max));
    return mkNum(r, a + b, pics(w.e, a) + '<span class="g-op">+</span>' + pics(w.e, b) + '<span class="g-q">How many in all?</span>', {min: 1});
  };
  L.numWord = () => r => {
    const N = VOC().numbers, i = ri(r, 0, 9), w = N[i];
    const it = r() < 0.5
      ? mkTxt(r, '<span class="g-big">' + (i + 1) + '</span><span class="g-q">Which word is this number?</span>', w.w, sample(r, N.filter((x, j) => j !== i), 3).map(x => x.w))
      : mkTxt(r, '<span class="g-big">' + w.w + '</span><span class="g-q">Which number is this?</span>', String(i + 1), sample(r, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(x => x !== i + 1), 3).map(String));
    it.x = '<b>' + (i + 1) + '</b> = <b>' + w.w + '</b>' + ' · <span dir="rtl" lang="ur">' + w.ur + '</span> · <span dir="rtl" lang="ps">' + w.ps + '</span>'; it.say = w.w; return it;
  };
  function learnLadder(rows) { return rows.concat([['Boss: all mixed', M.mix(rows.map(x => x[1]))]]); }
  const LEARN_LADDER = {
    1: learnLadder([['Count to 5', L.count(5)], ['Name the picture', L.picWord(false)], ['Before and after', L.numNear(['after', 'before'], 10)], ['Colours', L.color()], ['Shapes', L.shape()],
      ['Big and small letters', L.letterCase()], ['First letters', L.firstLetter()], ['Count to 10', L.count(10)], ['Add with pictures', L.addPics(5)]]),
    2: learnLadder([['Count to 10', L.count(10)], ['Name the picture', L.picWord(true)], ['Between numbers', L.numNear(['between'], 20)], ['Biggest and smallest', L.bigger(100)], ['Fill the letter', L.wordFill()],
      ['First letters', L.firstLetter()], ['Add with pictures', L.addPics(10)], ['Number words', L.numWord()], ['Odd one out', L.oddOne()]]),
    3: learnLadder([['Fill the letter', L.wordFill()], ['Find the picture', L.wordPic()], ['Odd one out', L.oddOne()], ['Number words', L.numWord()], ['Biggest and smallest', L.bigger(1000)],
      ['Before and after', L.numNear(['after', 'before', 'between'], 100)], ['Patterns', L.pattern()], ['Name the picture', L.picWord(true)], ['Count to 20', L.count(20)]])
  };

  // ---------- textbook questions -> games ----------
  const slug = s => String(s).replace(/^cls\d+-/, '');
  const prepared = new WeakMap();
  function bankByClass(B, cls) {
    let m = prepared.get(B); if (!m) { m = {}; prepared.set(B, m); }
    if (m[cls]) return m[cls];
    const out = [];
    for (let i = 0; i < B.mcqs.length; i++) {
      const q = B.mcqs[i], sub = B.subjects[q.s];
      if (!sub || sub.cls !== cls || !q.o || q.a == null || q.a < 0 || q.a >= q.o.length || !q.q) continue;
      out.push({id: q.i, s: slug(q.s), q: q.q, o: q.o, a: q.a, e: q.e || '', qu: q.qu || '', qp: q.qp || '', tf: !!q.tf});
    }
    return (m[cls] = out);
  }
  const subjectName = (B, cls, s) => ((B.subjects['cls' + cls + '-' + s] || {}).name) || s;
  const difficulty = m => m.q.length + m.o.reduce((t, x) => t + x.length, 0) / 2;
  const NEG = /\b(not|except|false|incorrect|odd one)\b/i;

  const ELIGIBLE = {
    quiz: m => m.o.length >= 2 && m.o.length <= 4 && m.q.length <= 300 && m.o.every(x => x.length <= 140) && new Set(m.o.map(x => x.trim().toLowerCase())).size === m.o.length,
    tf: m => m.tf ? m.o.length === 2 && m.q.length <= 260 : (m.o.length >= 3 && m.q.length <= 200 && m.o[m.a].length <= 80 && !/following/i.test(m.q)),
    spell: m => !m.tf && m.o.length >= 3 && /^[A-Za-z]{4,14}$/.test(m.o[m.a]) && m.q.length <= 140 && !/following|\([a-d]\)/i.test(m.q) && !NEG.test(m.q),
    memory: m => !m.tf && m.o.length >= 3 && m.q.length <= 72 && m.o[m.a].length <= 24 && !/following|which of|\bwhich\b.*\?$/i.test(m.q) && !NEG.test(m.q)
  };
  // picture-word pools (Classes 1-3)
  function vocabPool(game) {
    const W = VOC().words.slice();
    if (game === 'spell') return W.filter(w => /^[a-z]{3,9}$/.test(w.w)).sort((a, b) => a.w.length - b.w.length || (a.w < b.w ? -1 : 1)).map(w => ({vocab: w, key: w.w}));
    return W.sort((a, b) => a.w.length - b.w.length || (a.w < b.w ? -1 : 1)).map(w => ({vocab: w, key: w.w}));
  }
  const poolCache = new Map();
  function poolFor(game, ctx) {
    if (ctx.scope === 'pics') { const k = 'pics|' + game; if (!poolCache.has(k)) poolCache.set(k, vocabPool(game)); return poolCache.get(k); }
    if (!ctx.bank || !ELIGIBLE[game]) return [];
    const k = [game, ctx.cls, ctx.scope, ctx.bank.generated || '', ctx.bank.mcqs.length].join('|');
    if (poolCache.has(k)) return poolCache.get(k);
    let list = bankByClass(ctx.bank, ctx.cls).filter(m => (ctx.scope === 'all' || m.s === ctx.scope) && ELIGIBLE[game](m));
    if (game === 'spell' || game === 'memory') {        // one card / word per answer
      const seen = new Set(); list = list.filter(m => { const a = m.o[m.a].toLowerCase(); if (seen.has(a)) return false; seen.add(a); return true; });
    }
    list = list.map(m => ({m, key: m.id})).sort((x, y) => difficulty(x.m) - difficulty(y.m) || (x.key < y.key ? -1 : 1));
    poolCache.set(k, list);
    return list;
  }
  // how many levels, how many steps in each and which slice of the sorted pool it draws from
  function planPool(N, sizes) {
    if (N < 8) return null;
    const n = Math.max(1, Math.min(LEVELS, Math.floor(N / 6))), out = [];
    for (let k = 0; k < n; k++) {
      const si = n === 1 ? 0 : Math.round(k * (LEVELS - 1) / (n - 1)), total = Math.max(2, Math.min(sizes[si], Math.floor(N / 2)));
      const win = Math.min(N, Math.max(total * 2, Math.ceil(N / n))), start = n === 1 ? 0 : Math.round(k * (N - win) / (n - 1));
      out.push({level: k + 1, total, start, win});
    }
    return out;
  }
  const dirOf = (...t) => (t.some(isRtl) ? 'rtl' : undefined);

  function quizItem(r, m) {
    const idx = m.o.map((x, i) => i), perm = m.tf || m.o.length === 2 ? idx : shuffle(r, idx);
    const it = {p: '<div class="g-qt">' + rich(m.q) + '</div>', c: perm.map(i => rich(m.o[i])), a: perm.indexOf(m.a), kind: 'quiz'};
    const x = (m.e ? esc(m.e) : '');
    it.x = '<b>' + rich(m.o[m.a]) + '</b>' + (x ? ' — ' + x : '');
    it.dir = dirOf(m.q, m.o[0]); if (m.qu || m.qp) it.tr = {ur: m.qu, ps: m.qp};
    return it;
  }
  function tfItem(r, m) {
    if (m.tf) {
      const truth = m.a === 0;
      return {p: '<div class="g-qt">' + rich(m.q) + '</div>', c: ['✔ True', '✘ False'], a: truth ? 0 : 1, kind: 'tf', dir: dirOf(m.q), x: (truth ? 'True. ' : 'False. ') + (m.e ? esc(m.e) : ''), tr: (m.qu || m.qp) ? {ur: m.qu, ps: m.qp} : undefined};
    }
    const truth = r() < 0.5, right = m.o[m.a], wrong = pick(r, m.o.filter((x, i) => i !== m.a)), shown = truth ? right : wrong;
    const blank = /_{2,}/.test(m.q);
    const p = blank ? '<div class="g-qt">' + rich(m.q.replace(/_{2,}/g, shown)) + '</div>' : '<div class="g-qt">' + rich(m.q) + '</div><div class="g-tfa">➜ <b>' + rich(shown) + '</b></div>';
    return {p, c: ['✔ Right', '✘ Wrong'], a: truth ? 0 : 1, kind: 'tf', dir: dirOf(m.q, shown), x: truth ? 'Right: <b>' + rich(right) + '</b>.' : 'Wrong. The answer is <b>' + rich(right) + '</b>.' + (m.e ? ' ' + esc(m.e) : ''), tr: (m.qu || m.qp) ? {ur: m.qu, ps: m.qp} : undefined};
  }
  function spellItem(r, p) {
    if (p.vocab) { const w = p.vocab; return {p: '<span class="g-emo">' + w.e + '</span><span class="g-q">Spell the word</span>', ans: w.w.toUpperCase(), x: flash(w), say: w.w, kind: 'spell'}; }
    const m = p.m, ans = m.o[m.a].toUpperCase();
    return {p: '<div class="g-qt">' + rich(m.q.replace(/_{2,}/g, '<u>    </u>')) + '</div><span class="g-q">Spell the answer</span>', ans, x: m.e ? esc(m.e) : '', kind: 'spell', say: ''};
  }
  function memoryPair(p) {
    if (p.vocab) return {q: '<span class="g-emo-s">' + p.vocab.e + '</span>', a: '<b>' + esc(p.vocab.w) + '</b>', kind: 'pic'};
    const m = p.m; return {q: rich(m.q), a: rich(m.o[m.a]), kind: 'qa', dir: dirOf(m.q, m.o[m.a])};
  }

  // ---------- the six games ----------
  const SEC = {math: [20, 20, 18, 18, 16, 16, 14, 14, 12, 12], tf: [14, 13, 12, 12, 11, 10, 10, 9, 9, 8]};
  const GAMES = {
    quiz: {id: 'quiz', title: 'Quiz Quest', emoji: '📚', color: '#4f46e5', runner: 'choice', bank: true, blurb: 'Questions from your textbooks, easy first. Three lives. Pick the right answer.'},
    math: {id: 'math', title: 'Math Sprint', emoji: '➕', color: '#0e7490', runner: 'choice', bank: false, blurb: 'Quick sums that grow with your class: one new skill at every level, against the clock.'},
    learn: {id: 'learn', title: 'Little Learners', emoji: '🧸', color: '#be185d', runner: 'choice', bank: false, blurb: 'Pictures, counting, colours, shapes and letters for Classes 1 to 3.'},
    spell: {id: 'spell', title: 'Word Builder', emoji: '🔤', color: '#15803d', runner: 'tiles', bank: true, blurb: 'Put the letters in order to spell the answer. Pictures first, then textbook words.'},
    tf: {id: 'tf', title: 'True or False', emoji: '⚡', color: '#c2410c', runner: 'choice', bank: true, blurb: 'Fast: is the statement right? Beat the clock and keep your streak.'},
    memory: {id: 'memory', title: 'Memory Match', emoji: '🃏', color: '#7e22ce', runner: 'flip', bank: true, blurb: 'Flip the cards and match each question with its answer.'}
  };
  const ORDER = ['quiz', 'math', 'learn', 'spell', 'tf', 'memory'];

  // scopes (what the game draws from) for a class: [{id, name, n}] with enough material to play
  function scopesFor(game, ctx) {
    const g = GAMES[game], out = [];
    if (game === 'math') return MATH_LADDER[ctx.cls] ? [{id: 'all', name: 'Class ' + ctx.cls + ' skills', n: 0}] : [];
    if (game === 'learn') return LEARN_LADDER[ctx.cls] ? [{id: 'all', name: 'Picture lessons', n: 0}] : [];
    if ((game === 'spell' || game === 'memory') && ctx.cls <= 3) out.push({id: 'pics', name: 'Picture words', n: vocabPool(game).length});
    if (ctx.bank) {
      const all = poolFor(game, Object.assign({}, ctx, {scope: 'all'}));
      if (all.length >= 8) out.push({id: 'all', name: 'All subjects', n: all.length});
      const subs = [...new Set(bankByClass(ctx.bank, ctx.cls).map(m => m.s))];
      subs.forEach(s => { const n = poolFor(game, Object.assign({}, ctx, {scope: s})).length; if (n >= 8 && subs.length > 1) out.push({id: s, name: subjectName(ctx.bank, ctx.cls, s), n}); });
      if (subs.length === 1 && all.length >= 8 && out.length && out[out.length - 1].id === 'all') out[out.length - 1].name = subjectName(ctx.bank, ctx.cls, subs[0]);
    }
    return out;
  }
  const mathLabel = (cls, i) => (MATH_LADDER[cls] || [])[i] ? MATH_LADDER[cls][i][0] : '';
  // the levels of a game: {levels:[{level, total, label}]} or {why: 'reason'} when it cannot be played
  function planFor(game, ctx) {
    if (game === 'math') { const lad = MATH_LADDER[ctx.cls]; if (!lad) return {why: 'No sums for this class yet.'}; return {levels: lad.map((row, i) => ({level: i + 1, total: SIZES.math[i], label: row[0]}))}; }
    if (game === 'learn') { const lad = LEARN_LADDER[ctx.cls]; if (!lad) return {why: 'Little Learners is for Classes 1 to 3.'}; return {levels: lad.map((row, i) => ({level: i + 1, total: SIZES.learn[i], label: row[0]}))}; }
    if ((game === 'spell' || game === 'memory') && ctx.scope === 'pics') { const pl = planPool(poolFor(game, ctx).length, SIZES[game]); return {levels: pl.map(x => ({level: x.level, total: x.total, label: (game === 'spell' ? 'Spell the pictures' : 'Match pictures') + ' ' + x.level}))}; }
    if (!ctx.bank) return {why: 'Loading the textbook questions…', loading: true};
    const pool = poolFor(game, ctx), pl = planPool(pool.length, SIZES[game]);
    if (!pl) return {why: 'Not enough textbook questions for this class yet.'};
    return {levels: pl.map(x => ({level: x.level, total: x.total, label: 'Level ' + x.level}))};
  }
  // one run of a level
  function buildLevel(game, ctx, level, r) {
    r = r || makeRng();
    const plan = planFor(game, ctx);
    if (!plan.levels || !plan.levels[level - 1]) return null;
    const total = plan.levels[level - 1].total;
    if (game === 'math') { const fn = MATH_LADDER[ctx.cls][level - 1][1]; const items = []; const seen = new Set(); for (let i = 0; i < total; i++) { let it = fn(r), t = 0; while (seen.has(plain(it.p)) && t++ < 12) it = fn(r); seen.add(plain(it.p)); it.kind = 'math'; items.push(it); } const secs = SEC.math[level - 1] * (ctx.cls <= 3 ? 1.6 : ctx.cls <= 5 ? 1.2 : 1); return {runner: 'choice', items, secs: Math.round(secs)}; }
    if (game === 'learn') { const fn = LEARN_LADDER[ctx.cls][level - 1][1]; const items = []; const seen = new Set(); for (let i = 0; i < total; i++) { let it = fn(r), t = 0; while (seen.has(plain(it.p)) && t++ < 12) it = fn(r); seen.add(plain(it.p)); it.kind = 'learn'; items.push(it); } return {runner: 'choice', items}; }
    const pool = poolFor(game, ctx), pl = planPool(pool.length, SIZES[game])[level - 1], win = pool.slice(pl.start, pl.start + pl.win), chosen = sample(r, win, pl.total);
    if (game === 'quiz') return {runner: 'choice', items: chosen.map(p => quizItem(r, p.m))};
    if (game === 'tf') return {runner: 'choice', items: chosen.map(p => tfItem(r, p.m)), secs: Math.round(SEC.tf[level - 1] * (ctx.cls <= 5 ? 1.4 : 1)), two: true};
    if (game === 'spell') return {runner: 'tiles', items: chosen.map(p => spellItem(r, p))};
    return {runner: 'flip', items: chosen.map(p => memoryPair(p))};
  }
  const levelKey = (game, cls, scope, level, total) => 'cls' + cls + '|g-' + game + '-' + String(scope).replace(/[^A-Za-z0-9_.:-]/g, '').slice(0, 24) + '|u' + level + '|count|' + hash36(game + '|' + cls + '|' + scope + '|' + level).slice(0, 8) + '|' + total;
  const stepsNeeded = total => Math.ceil(total * PASS);

  root.SBGamesContent = {LEVELS, PASS, SIZES, GAMES, ORDER, MATH_LADDER, LEARN_LADDER, scopesFor, planFor, buildLevel, levelKey, stepsNeeded, planPool,
    makeRng, mulberry32, esc, rich, plain, isRtl, shuffle, pick, ri, mathLabel, subjectName, bankByClass, poolFor, M, L};
  if (typeof module !== 'undefined' && module.exports) module.exports = root.SBGamesContent;
})(typeof window !== 'undefined' ? window : globalThis);
