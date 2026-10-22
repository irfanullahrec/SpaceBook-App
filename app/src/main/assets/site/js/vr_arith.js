/* SpaceBook Visual Reasoning: the arithmetic narrator.
 *
 * The books' worked solutions of "order of operations" questions (Classes 5-8) list ONE row per operation. The animated board should teach
 * MORE than that list, so this module re-does each operation the way it is taught, in small steps:
 *     a mixed number becomes an improper fraction, unlike denominators get their LCD, a division flips the second fraction,
 *     numerators and denominators are multiplied, the result is reduced, and only then is it written back into the expression.
 *     Negative numbers: the sign is dealt with first ("different signs: subtract and keep the sign of the larger"), then the plain numbers.
 *     Decimals: both numbers get the same number of decimal places, or the decimal points are removed, multiplied, and put back.
 *     Powers: written out as repeated multiplication.
 *
 * SAFE BY CONSTRUCTION. Nothing here is taken on trust:
 *   - the question and EVERY row of the book's solution are parsed; each must have the same value (exact rational arithmetic);
 *   - every step is computed with exact fractions, never typed in;
 *   - every line of work is parsed back and must have the value of the operation it belongs to; the final value must equal the book's last row;
 *   - anything it cannot parse or verify (words in the maths, roots, letters, non-terminating decimals) returns null, and the caller keeps the
 *     plain presentation. The book's own sentence for an operation is shown beside the step it belongs to only when the book's next row is the same line.
 * Pure functions: also run under node (tools/vr/validate_arith.js, tools/vr/fuzz_arith.js).
 */
(function (root) {
  'use strict';
  const LIM = 1e9;                                   // numbers beyond this are not taught on a board: give up
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; };
  const lcm = (a, b) => a / gcd(a, b) * b;
  const R = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
  const ok = r => !!r && Math.abs(r.n) < LIM && r.d < LIM;
  const rop = (op, a, b) => {
    let r = null;
    if (op === '+') r = R(a.n * b.d + b.n * a.d, a.d * b.d);
    else if (op === '-') r = R(a.n * b.d - b.n * a.d, a.d * b.d);
    else if (op === '*') r = R(a.n * b.n, a.d * b.d);
    else if (op === '/') r = b.n === 0 ? null : R(a.n * b.d, a.d * b.n);
    return ok(r) ? r : null;
  };
  const req = (a, b) => !!a && !!b && a.n === b.n && a.d === b.d;
  const cmp = (a, b) => { const l = a.n * b.d, r = b.n * a.d; return l < r ? -1 : l > r ? 1 : 0; };
  const negR = r => ({ n: -r.n, d: r.d });
  const pow10 = k => Math.pow(10, k);

  /* a rational that terminates as a decimal -> '-2.615' (null when it does not terminate or is too long) */
  function fmt(r) {
    let d = r.d, a = 0, b = 0;
    while (d % 2 === 0) { d /= 2; a++; }
    while (d % 5 === 0) { d /= 5; b++; }
    if (d !== 1) return null;
    const k = Math.max(a, b); if (k > 9) return null;
    const scaled = Math.abs(r.n) * (pow10(k) / r.d); if (!(scaled < 9e15)) return null;
    let s = String(Math.round(scaled));
    if (k) { s = s.padStart(k + 1, '0'); s = s.slice(0, -k) + '.' + s.slice(-k); }
    return (r.n < 0 ? '-' : '') + s;
  }

  /* ---------- parsing: the TeX the books use -> a tree of groups, numbers, decimals, fractions, mixed numbers, powers ---------- */
  const isAtom = x => x.k === 'int' || x.k === 'dec' || x.k === 'frac' || x.k === 'mixed';
  const decs = x => (x.k === 'dec' ? x.s.length - x.s.indexOf('.') - 1 : 0);
  function parse(src, loose) {                          // loose: fractions may hold sums and products, a bracket may carry a minus: the book's half-done rows, for checking only
    const s = String(src || '').replace(/\\left|\\right|\\displaystyle|\\,|\\;|\\!|~/g, ' ').replace(/\\ /g, ' ').replace(/\\dfrac|\\tfrac/g, '\\frac')
      .replace(/[−–]/g, '-').replace(/×/g, '\\times').replace(/÷/g, '\\div').replace(/\\cdot/g, '\\times').replace(/\s+/g, ' ').trim();
    if (!s || s.length > 240 || /[=<>$%_]|\\text|\\sqrt|\\pm|\\le|\\ge|\\begin/.test(s)) return null;
    const run = str => {
      const n = str.length; let i = 0;
      const ws = () => { while (i < n && str[i] === ' ') i++; };
      const at = t => str.startsWith(t, i);
      const brace = j => { let d = 0; for (let k = j; k < n; k++) { if (str[k] === '\\') { k++; continue; } if (str[k] === '{') d++; else if (str[k] === '}' && --d === 0) return k + 1; } return -1; };
      const fracTok = () => {
        i += 5; ws(); if (str[i] !== '{') return null; let e = brace(i); if (e < 0) return null;
        const a = str.slice(i + 1, e - 1).trim(); i = e; ws(); if (str[i] !== '{') return null; e = brace(i); if (e < 0) return null;
        const b = str.slice(i + 1, e - 1).trim(); i = e;
        if (/^\d+$/.test(a) && /^\d+$/.test(b)) return +b > 0 && +a < LIM && +b < LIM ? { n: +a, d: +b } : null;
        if (!loose) return null;
        const pa = parse(a, true), pb = parse(b, true), va = pa && val(pa), vb = pb && val(pb);
        const v = va && vb && vb.n !== 0 ? rop('/', va, vb) : null;
        return v ? { v, a, b } : null;
      };
      const items = close => {
        const out = [];
        for (;;) {
          const o = operand(); if (!o) return null; out.push(o); ws();
          if (close) { if (at(close)) { i += close.length; return out; } } else if (i >= n) return out;
          let op = null;
          if (at('+')) { op = '+'; i += 1; } else if (at('-')) { op = '-'; i += 1; } else if (at('\\times')) { op = '*'; i += 6; } else if (at('\\div')) { op = '/'; i += 4; }
          if (!op) return null; out.push(op);
        }
      };
      const base = () => {
        if (at('\\frac')) { const f = fracTok(); return f && (f.v ? { k: 'efrac', v: f.v, a: f.a, b: f.b } : { k: 'frac', n: f.n, d: f.d }); }
        if (at('\\overline')) {
          i += 9; ws(); if (str[i] !== '{') return null; const e = brace(i); if (e < 0) return null;
          const inner = run(str.slice(i + 1, e - 1)); i = e; return inner && { k: 'grp', br: 'bar', items: inner };
        }
        if (str[i] === '(') { i++; const it = items(')'); if (!it) return null; return it.length === 1 && isAtom(it[0]) && it[0].neg ? it[0] : { k: 'grp', br: '(', items: it }; }   // (-5) is just the number -5
        if (str[i] === '[') { i++; const it = items(']'); return it && { k: 'grp', br: '[', items: it }; }
        if (at('\\{')) { i += 2; const it = items('\\}'); return it && { k: 'grp', br: '{', items: it }; }
        if (/\d/.test(str[i])) {
          let j = i; while (j < n && /\d/.test(str[j])) j++;
          if (str[j] === '.' && /\d/.test(str[j + 1] || '')) {
            j++; while (j < n && /\d/.test(str[j])) j++;
            const t = str.slice(i, j); if (t.replace('.', '').length > 9) return null;
            i = j; return { k: 'dec', s: t };
          }
          const v = +str.slice(i, j); if (!(v < LIM)) return null; i = j; ws();
          if (at('\\frac')) { const f = fracTok(); return f && !f.v ? { k: 'mixed', w: v, n: f.n, d: f.d } : null; }
          return { k: 'int', v };
        }
        return null;
      };
      const operand = () => {
        ws(); if (i >= n) return null;
        let neg = false;
        if (str[i] === '-') { neg = true; i++; ws(); if (i >= n) return null; } else if (str[i] === '+') { i++; ws(); if (i >= n) return null; }   // +40 is 40
        let o = base(); if (!o) return null;
        ws();
        if (str[i] === '^') {                                           // a power of a whole number or a decimal: 3^2, (5)^2, (-5)^{2}
          if (o.k === 'grp' && o.br === '(' && o.items.length === 1 && (o.items[0].k === 'int' || o.items[0].k === 'dec')) o = o.items[0];
          i++; ws(); let e;
          if (str[i] === '{') { const en = brace(i); if (en < 0) return null; e = str.slice(i + 1, en - 1).trim(); i = en; } else { e = str[i] || ''; i++; }
          if (!/^[2-6]$/.test(e) || !(o.k === 'int' || o.k === 'dec') || neg) return null;
          o = { k: 'pow', base: o, e: +e };
        } else if (neg) {
          if (o.k === 'grp') { if (!loose) return null; o.neg = true; }
          else if (o.k === 'efrac') { if (!loose) return null; o = { k: 'efrac', v: negR(o.v), a: o.a, b: o.b, neg: true }; }
          else o.neg = true;
        }
        return o;
      };
      return items(null);
    };
    const it = run(s);
    return it && it.length ? { k: 'grp', br: '', items: it } : null;
  }

  /* ---------- value ---------- */
  const sgn = x => (x.neg ? -1 : 1);
  const nf = x => {                                                    // the number as an improper fraction, signed, NOT reduced
    if (x.k === 'int') return { n: sgn(x) * x.v, d: 1 };
    if (x.k === 'dec') return { n: sgn(x) * parseInt(x.s.replace('.', ''), 10), d: pow10(decs(x)) };
    if (x.k === 'frac') return { n: sgn(x) * x.n, d: x.d };
    return { n: sgn(x) * (x.w * x.d + x.n), d: x.d };
  };
  const val = x => {
    if (x.k === 'efrac') return x.v;
    if (x.k === 'pow') { const b = val(x.base); if (!b) return null; const r = R(Math.pow(b.n, x.e), Math.pow(b.d, x.e)); return ok(r) ? r : null; }
    if (isAtom(x)) { const f = nf(x); return R(f.n, f.d); }
    const v = evalItems(x.items); return v && x.neg ? negR(v) : v;
  };
  function pick(items) {                              // BODMAS inside one bracket: divide, then multiply, then + and - from the left
    for (const o of ['/', '*']) { const k = items.findIndex((x, j) => j % 2 && x === o); if (k > 0) return k; }
    return items.findIndex((x, j) => j % 2 && (x === '+' || x === '-'));
  }
  function evalItems(items) {
    const a = items.slice();
    while (a.length > 1) {
      const k = pick(a); if (k < 0) return null;
      const l = a[k - 1], r = a[k + 1];
      const lv = typeof l === 'object' && l.k ? val(l) : l, rv = typeof r === 'object' && r.k ? val(r) : r;
      if (!lv || !rv) return null;
      const res = rop(a[k], lv, rv); if (!res) return null;
      a.splice(k - 1, 3, { k: 'frac', n: res.n, d: res.d });                                // only its value is used from here on
    }
    const x = a[0]; return typeof x === 'object' && x.k ? val(x) : null;
  }

  /* ---------- writing it back as TeX (optionally marking parts with \htmlClass) ---------- */
  const OPS = { '+': ' + ', '-': ' - ', '*': ' \\times ', '/': ' \\div ' };
  const tf = (n, d) => (d === 1 ? String(n) : '\\frac{' + n + '}{' + d + '}');
  const tag = (cls, t) => '\\htmlClass{' + cls + '}{' + t + '}';
  const atomTex = x => (x.k === 'int' ? String(x.v) : x.k === 'dec' ? x.s : x.k === 'frac' ? '\\frac{' + x.n + '}{' + x.d + '}' : x.k === 'mixed' ? x.w + '\\frac{' + x.n + '}{' + x.d + '}' : '\\frac{' + x.a + '}{' + x.b + '}');
  function ser(x, ctx, wrap) {                         // wrap: a negative number after an operator is written in brackets, as the books do: 7 + (-3)
    ctx = ctx || {};
    let t;
    if (x.k === 'pow') t = ser(x.base, ctx, true) + '^{' + x.e + '}';
    else if (x.k === 'grp') {
      const inner = serItems(x, ctx);
      t = x.br === '(' ? '\\left( ' + inner + ' \\right)' : x.br === '[' ? '\\left[ ' + inner + ' \\right]' : x.br === '{' ? '\\left\\{ ' + inner + ' \\right\\}' : x.br === 'bar' ? '\\overline{' + inner + '}' : inner;
      if (x.neg) t = '-' + t;
    } else {
      t = (x.neg ? '-' : '') + atomTex(x);
      if (x.neg && wrap) t = '\\left( ' + t + ' \\right)';
    }
    const c = ctx.hl && ctx.hl.get(x);
    return c ? tag(c, t) : t;
  }
  function serItems(g, ctx) {
    const sp = ctx.span && ctx.span.g === g ? ctx.span : null; let out = '';
    g.items.forEach((x, j) => {
      if (sp && j === sp.from) out += '\\htmlClass{' + sp.cls + '}{';
      out += j % 2 ? OPS[x] : ser(x, ctx, j > 0 || (g.items.length > 1 && (g.items[1] === '*' || g.items[1] === '/')));
      if (sp && j === sp.to) out += '}';
    });
    return out;
  }
  const clone = x => (x.k === 'grp' ? Object.assign({}, x, { items: x.items.map(y => (typeof y === 'string' ? y : clone(y))) }) : x.k === 'pow' ? Object.assign({}, x, { base: Object.assign({}, x.base) }) : Object.assign({}, x));
  const abs = x => Object.assign({}, x, { neg: false });
  function mkNode(r, mode) {                           // a rational -> a number node in this mode (null when it cannot be written: a non-terminating decimal)
    const neg = r.n < 0, m = Math.abs(r.n);
    if (r.d === 1) return neg ? { k: 'int', v: m, neg: true } : { k: 'int', v: m };
    if (mode === 'dec') { const f = fmt({ n: m, d: r.d }); if (f === null) return null; return neg ? { k: 'dec', s: f, neg: true } : { k: 'dec', s: f }; }
    return neg ? { k: 'frac', n: m, d: r.d, neg: true } : { k: 'frac', n: m, d: r.d };
  }

  /* ---------- what to do next (innermost bracket first, then powers, then BODMAS inside it) ---------- */
  const reduced = g => g.items.length === 1 && (isAtom(g.items[0]) || (g.items[0].k === 'grp' && reduced(g.items[0])));
  function find(g) {
    for (let j = 0; j < g.items.length; j += 2) {
      const c = g.items[j];
      if (c.k !== 'grp') continue;
      if (reduced(c)) return { type: 'unwrap', parent: g, idx: j };
      const a = find(c); if (a) return a;
    }
    for (let j = 0; j < g.items.length; j += 2) if (g.items[j].k === 'pow') return { type: 'pow', group: g, idx: j };
    if (g.items.length === 1) return null;
    const k = pick(g.items);
    return k < 0 ? null : { type: 'op', group: g, idx: k };
  }
  function collapse(g) {                               // ( -5 ) is just the number -5: no step for dropping those brackets, they come back when written
    g.items.forEach((c, j) => {
      if (j % 2 || c.k !== 'grp') return;
      collapse(c);
      if (c.br === '(' && !c.neg && c.items.length === 1 && isAtom(c.items[0]) && c.items[0].neg) g.items[j] = c.items[0];
    });
  }
  const WHERE = { '(': 'In the parentheses', '{': 'In the curly brackets', '[': 'In the square brackets', bar: 'In the vinculum (bar)', '': 'Now' };
  const BRNAME = { '(': 'the parentheses', '{': 'the curly brackets', '[': 'the square brackets', bar: 'the bar' };
  const VERB = { '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide' };
  const T = x => '$' + x + '$';
  const MINUS = '\u2212';

  /* ---------- the small steps of ONE operation on two numbers ----------
     lines: [{ parts:[tex...], old:[indices of the previous line that this one rewrites], neu:[indices that are new], say, neg }]
     neg: the whole line is written as -( ... ): the sign is settled first, then the plain numbers are worked out */
  const wrapN = (t, neg) => (neg ? '\\left( ' + t + ' \\right)' : t);
  const compose = ln => { const body = ln.parts.join(' '); return ln.neg ? (ln.parts.length > 1 ? '-\\left( ' + body + ' \\right)' : '-' + body) : body; };
  function lowest(push, n, d) {
    const g = gcd(n, d);
    if (g > 1 && d > 1) push([tf(n / g, d / g)], [0], [0], 'Divide the top and the bottom by ' + g + ' to get the lowest terms: ' + T('\\frac{' + n + '}{' + d + '} = ' + tf(n / g, d / g)) + '.');
    return R(n, d);
  }
  const f = v => { const s = fmt(v); return s === null ? '?' : s.replace('-', MINUS); };           // a number inside a sentence
  const nm = x => (x.k === 'frac' || x.k === 'mixed' ? T(ser(abs(x))) : f(val(x)));

  function planMag(push, P, o, Q) {                    // P o Q with P, Q >= 0 as fractions / whole numbers; -> the value (rational) or null
    const sym = OPS[o].trim(), symT = o === '-' ? MINUS : sym, a = nf(P), b = nf(Q);
    let x = { n: a.n, d: a.d }, y = { n: b.n, d: b.d };
    const parts = [ser(P, {}, true), sym, ser(Q, {}, true)];
    const mixedSay = (M, g) => 'Write the mixed number ' + T(ser(M)) + ' as an improper fraction: ' + M.w + ' \u00d7 ' + M.d + ' + ' + M.n + ' = ' + (M.w * M.d + M.n) + ', so it is ' + T(tf(g.n, g.d)) + '.';
    if (P.k === 'mixed') { parts[0] = tf(x.n, x.d); push(parts.slice(), [0], [0], mixedSay(P, x)); }
    if (Q.k === 'mixed') { parts[2] = tf(y.n, y.d); push(parts.slice(), [2], [2], mixedSay(Q, y)); }
    if (o === '+' || o === '-') {
      let L = x.d;
      if (x.d !== y.d) {
        L = lcm(x.d, y.d); const kx = L / x.d, ky = L / y.d;
        if (x.d === 1 || y.d === 1) {                                   // a whole number: write it over the other denominator
          const w = x.d === 1 ? 0 : 2, W = w === 0 ? x : y, k = w === 0 ? kx : ky;
          parts[w] = tf(W.n * k, L); push(parts.slice(), [w], [w], 'Write ' + T(String(W.n)) + ' as a fraction with denominator ' + L + ': ' + W.n + ' \u00d7 ' + L + ' = ' + (W.n * k) + ', so it is ' + T(tf(W.n * k, L)) + '.');
          if (w === 0) x = { n: x.n * kx, d: L }; else y = { n: y.n * ky, d: L };
        } else {
          const ch = [];
          const p0 = kx > 1 ? '\\dfrac{' + x.n + ' \\times ' + kx + '}{' + x.d + ' \\times ' + kx + '}' : parts[0], p2 = ky > 1 ? '\\dfrac{' + y.n + ' \\times ' + ky + '}{' + y.d + ' \\times ' + ky + '}' : parts[2];
          if (kx > 1) ch.push(0); if (ky > 1) ch.push(2);
          parts[0] = p0; parts[2] = p2;
          push(parts.slice(), ch, ch, 'The denominators ' + x.d + ' and ' + y.d + ' are different. Their LCD (lowest common denominator) is ' + L + '. ' +
            (kx > 1 ? 'Multiply the top and the bottom of ' + T(tf(x.n, x.d)) + ' by ' + kx + '. ' : '') + (ky > 1 ? 'Multiply the top and the bottom of ' + T(tf(y.n, y.d)) + ' by ' + ky + '.' : ''));
          x = { n: x.n * kx, d: L }; y = { n: y.n * ky, d: L };
          parts[0] = tf(x.n, L); parts[2] = tf(y.n, L);
          push(parts.slice(), ch, ch, 'Multiply out: ' + (kx > 1 ? x.n / kx + ' \u00d7 ' + kx + ' = ' + x.n : '') + (kx > 1 && ky > 1 ? ' and ' : '') + (ky > 1 ? y.n / ky + ' \u00d7 ' + ky + ' = ' + y.n : '') + '. Both fractions now have the denominator ' + L + '.');
        }
      }
      const num = o === '+' ? x.n + y.n : x.n - y.n;
      if (num < 0 || !(Math.abs(num) < LIM)) return null;
      if (L === 1) { push([String(num)], [0, 1, 2], [0], x.n + ' ' + symT + ' ' + y.n + ' = ' + num + '.'); return R(num, 1); }
      push(['\\dfrac{' + x.n + ' ' + sym + ' ' + y.n + '}{' + L + '}'], [0, 1, 2], [0], 'The denominators are the same: keep ' + L + ' and ' + VERB[o] + ' the numerators.');
      push([tf(num, L)], [0], [0], x.n + ' ' + symT + ' ' + y.n + ' = ' + num + ', so the result is ' + T(tf(num, L)) + '.');
      return lowest(push, num, L);
    }
    if (o === '/') {
      if (y.n === 0) return null;
      if (x.d === 1 && y.d === 1) {
        if (x.n === 0) { push(['0'], [0, 1, 2], [0], '0 divided by any number that is not zero is 0.'); return R(0, 1); }
        push([tf(x.n, y.n)], [0, 1, 2], [0], T(String(x.n)) + ' divided by ' + T(String(y.n)) + ' is the fraction ' + T(tf(x.n, y.n)) + '.');
        return lowest(push, x.n, y.n);
      }
      parts[1] = '\\times'; parts[2] = tf(y.d, y.n);
      push(parts.slice(), [1, 2], [1, 2], 'To divide, multiply by the reciprocal of the second number: flip ' + T(tf(y.n, y.d)) + ' upside down to get ' + T(tf(y.d, y.n)) + ', and change \u00f7 to \u00d7.');
      y = { n: y.d, d: y.n };
    }
    const top = x.n + ' \\times ' + y.n, bot = x.d === 1 ? String(y.d) : y.d === 1 ? String(x.d) : x.d + ' \\times ' + y.d;
    const p = x.n * y.n, q = x.d * y.d;
    if (!(p < LIM && q < LIM)) return null;
    if (x.d === 1 && y.d === 1) { push([String(p)], [0, 1, 2], [0], x.n + ' \u00d7 ' + y.n + ' = ' + p + '.'); return R(p, 1); }
    push(['\\dfrac{' + top + '}{' + bot + '}'], [0, 1, 2], [0], 'Multiply the numerators (' + x.n + ' \u00d7 ' + y.n + ') and multiply the denominators (' + (x.d === 1 ? y.d : y.d === 1 ? x.d : x.d + ' \u00d7 ' + y.d) + ').');
    push([tf(p, q)], [0], [0], x.n + ' \u00d7 ' + y.n + ' = ' + p + (q === 1 ? '' : ' and the denominator is ' + q) + ', so the result is ' + T(tf(p, q)) + '.');
    return lowest(push, p, q);
  }

  function planDec(push, P, o, Q) {                    // decimals and whole numbers, P o Q with P, Q >= 0 -> the value or null
    const X = val(P), Y = val(Q), kx = decs(P), ky = decs(Q), sym = OPS[o].trim(), symT = o === '-' ? MINUS : sym;
    const r = rop(o, X, Y); if (!r || fmt(r) === null) return null;
    if (o === '+' || o === '-') {
      const k = Math.max(kx, ky);
      if (kx !== ky) {
        const padTo = (x, have) => { const s = x.k === 'dec' ? x.s : String(x.v); return have >= k ? s : (have ? s : s + '.') + '0'.repeat(k - have); };
        const ch = []; if (kx < k) ch.push(0); if (ky < k) ch.push(2);
        push([padTo(P, kx), sym, padTo(Q, ky)], ch, ch, 'Write both numbers with the same number of decimal places (' + k + '), by adding zeros at the end: this does not change their value.');
      }
      push([fmt(r)], [0, 1, 2], [0], 'Line up the decimal points and ' + VERB[o] + ' as if they were whole numbers: ' + f(X) + ' ' + symT + ' ' + f(Y) + ' = ' + f(r) + '.');
      return r;
    }
    if (o === '*') {
      if (!kx && !ky) { push([fmt(r)], [0, 1, 2], [0], f(X) + ' \u00d7 ' + f(Y) + ' = ' + f(r) + '.'); return r; }
      const nx = nf(P), ny = nf(Q), p = nx.n * ny.n, q = nx.d * ny.d;
      if (!(p < 1e12 && q < 1e12)) return null;
      const top = (kx ? nx.n : P.v) + ' \\times ' + (ky ? ny.n : Q.v), bot = [kx ? nx.d : 0, ky ? ny.d : 0].filter(Boolean).join(' \\times ');
      const bits = []; if (kx) bits.push(T(f(X)) + ' is ' + T('\\frac{' + nx.n + '}{' + nx.d + '}')); if (ky) bits.push(T(f(Y)) + ' is ' + T('\\frac{' + ny.n + '}{' + ny.d + '}'));
      push(['\\dfrac{' + top + '}{' + bot + '}'], [0, 1, 2], [0], 'Take the decimal points out: ' + bits.join(' and ') + '. Multiply the whole numbers on the top, and the powers of 10 below.');
      push(['\\frac{' + p + '}{' + q + '}'], [0], [0], 'Multiply: ' + (kx ? nx.n : P.v) + ' \u00d7 ' + (ky ? ny.n : Q.v) + ' = ' + p + (kx && ky ? ' and ' + bot.replace(/\\times/g, '\u00d7') + ' = ' + q : '') + '. The bottom is ' + q + '.');
      push([fmt(r)], [0], [0], 'Divide by ' + q + ': the decimal point moves ' + (kx + ky) + ' place' + (kx + ky > 1 ? 's' : '') + ' to the left, so ' + T('\\frac{' + p + '}{' + q + '}') + ' = ' + f(r) + '.');
      return r;
    }
    if (Y.n === 0) return null;                                          // division
    if (ky > 0) {
      const sx = rop('*', X, { n: pow10(ky), d: 1 }), sy = rop('*', Y, { n: pow10(ky), d: 1 });
      if (!sx || !sy || fmt(sx) === null || sy.d !== 1) return null;
      push([fmt(sx), '\\div', fmt(sy)], [0, 2], [0, 2], 'The divisor ' + f(Y) + ' is a decimal. Multiply both numbers by ' + pow10(ky) + ' (move each decimal point ' + ky + ' place' + (ky > 1 ? 's' : '') + ' to the right) so that the divisor becomes the whole number ' + f(sy) + ': the answer does not change.');
      push([fmt(r)], [0, 1, 2], [0], f(sx) + ' \u00f7 ' + f(sy) + ' = ' + f(r) + '.');
    } else push([fmt(r)], [0, 1, 2], [0], f(X) + ' \u00f7 ' + f(Y) + ' = ' + f(r) + '.');
    return r;
  }

  function planOp(A, op, B, mode) {
    const lines = [], sym = o => OPS[o].trim();
    const three = (a, o2, b) => [ser(a, {}, true), sym(o2), ser(b, {}, true)];
    lines.push({ parts: three(A, op, B), old: [], neu: [0, 1, 2], say: null, neg: false });
    let P = A, Q = B, o = op, neg = false;
    const push = (ps, old, neu, say) => lines.push({ parts: ps, old, neu, say, neg });
    const isZero = x => val(x).n === 0;
    if (isZero(P) && P.neg) P = abs(P);
    if (isZero(Q) && Q.neg) Q = abs(Q);
    if (op === '+' || op === '-') {
      if (op === '-' && Q.neg) { Q = abs(Q); o = '+'; push(three(P, o, Q), [1, 2], [1, 2], 'Subtracting a negative number is the same as adding the positive number.'); }
      else if (op === '+' && Q.neg) { Q = abs(Q); o = '-'; push(three(P, o, Q), [1, 2], [1, 2], 'Adding a negative number is the same as subtracting the positive number.'); }
      const xa = abs(P), xv = val(xa), yv = val(Q);
      if (o === '+' && P.neg) {                                            // (-a) + b
        if (cmp(yv, xv) >= 0) {
          P = Q; Q = xa; o = '-';
          push(three(P, o, Q), [0, 1, 2], [0, 1, 2], 'The signs are different, so subtract the smaller number from the larger one: ' + nm(P) + ' ' + MINUS + ' ' + nm(Q) + '. The larger number (' + nm(P) + ') is positive, so the answer is positive.');
        } else {
          P = xa; o = '-'; neg = true;
          push(three(P, o, Q), [0, 1, 2], [0, 1, 2], 'The signs are different, so subtract the smaller number from the larger one: ' + nm(P) + ' ' + MINUS + ' ' + nm(Q) + '. The larger number (' + nm(P) + ') is negative, so the answer is negative: put a minus sign in front.');
        }
      } else if (o === '-' && !P.neg) {
        if (cmp(xv, yv) < 0) {
          const t = P; P = Q; Q = t; neg = true;
          push(three(P, o, Q), [0, 1, 2], [0, 1, 2], nm(Q) + ' is smaller than ' + nm(P) + ', so subtract the other way round (' + nm(P) + ' ' + MINUS + ' ' + nm(Q) + ') and put a minus sign in front: the answer is below zero.');
        }
      } else if (o === '-' && P.neg) {                                     // (-a) - b = -(a + b)
        P = xa; o = '+'; neg = true;
        push(three(P, o, Q), [0, 1, 2], [0, 1, 2], 'Subtracting from a negative number goes further below zero: add ' + nm(P) + ' + ' + nm(Q) + ' and keep the minus sign.');
      }
    } else if (P.neg || Q.neg) {
      const sNeg = !!P.neg !== !!Q.neg && !isZero(P) && !isZero(Q);
      P = abs(P); Q = abs(Q); neg = sNeg;
      push(three(P, o, Q), [0, 1, 2], [0, 1, 2], (sNeg ? 'The signs are different, so the answer is negative.' : 'Two negative signs give a positive answer.') + ' Work with the numbers without their signs' + (sNeg ? ', then put a minus sign in front.' : '.'));
    }
    const wholeBoth = P.k === 'int' && Q.k === 'int';
    const mag = mode === 'dec' && !(wholeBoth && o !== '/') ? planDec(push, P, o, Q) : planMag(push, P, o, Q);
    if (!mag) return null;
    const res = neg ? negR(mag) : mag;
    return ok(res) ? { lines, res } : null;
  }

  function planPow(pw) {                               // a whole number or decimal to a small power: repeated multiplication
    const b = pw.base, e = pw.e, r = val(pw); if (!r || fmt(r) === null) return null;
    const bt = ser(b, {}, true), lines = [];
    lines.push({ parts: [ser(pw)], old: [], neu: [0], say: null, neg: false });
    lines.push({ parts: [Array(e).fill(bt).join(' \\times ')], old: [0], neu: [0], say: 'A power means repeated multiplication: the base ' + T(bt) + ' is written ' + e + ' times and multiplied.', neg: false });
    const bs = f(val(b)), word = e === 2 ? 'squared' : e === 3 ? 'cubed' : 'to the power ' + e;
    let say;
    if (b.neg) say = 'There are ' + e + ' negative factors. An even number of negative signs gives a positive answer, an odd number gives a negative answer. So ' + bs + ' ' + word + ' is ' + f(r) + '.';
    else say = Array(e).fill(bs).join(' \u00d7 ') + ' = ' + f(r) + '.';
    lines.push({ parts: [fmt(r)], old: [0], neu: [0], say, neg: false });
    return { lines, res: r };
  }

  /* improper fraction -> mixed number (the book's last row may ask for it) */
  function planMixed(n, d) {
    const w = Math.floor(n / d), r = n % d, lines = [];
    lines.push({ parts: [n + ' = ' + d + ' \\times ' + w + ' + ' + r], old: [], neu: [0], say: 'Divide ' + n + ' by ' + d + ': it goes ' + w + ' times (' + d + ' \u00d7 ' + w + ' = ' + (d * w) + '), and ' + r + ' is left over.', neg: false });
    lines.push({ parts: ['\\frac{' + n + '}{' + d + '} = ' + w + '\\frac{' + r + '}{' + d + '}'], old: [0], neu: [0], say: 'The quotient ' + w + ' is the whole number and the remainder ' + r + ' goes over ' + d + ': ' + T(w + '\\frac{' + r + '}{' + d + '}') + '.', neg: false });
    return lines;
  }

  /* every line of work must be worth exactly what the operation is worth (lines holding "=" are sentences about a conversion and are skipped) */
  function linesOk(lines, target) {
    return lines.every(ln => {
      if (ln.parts.some(p => p.indexOf('=') >= 0)) return true;
      const p = parse(compose(ln), true), v = p && val(p);
      return !!v && req(v, target);
    });
  }

  /* ---------- the whole derivation ---------- */
  function modeOf(g) {
    let dec = false, frac = false;
    (function walk(x) {
      if (x.k === 'grp') x.items.forEach(y => { if (typeof y === 'object') walk(y); });
      else if (x.k === 'pow') walk(x.base);
      else if (x.k === 'dec') dec = true;
      else if (x.k === 'frac' || x.k === 'mixed' || x.k === 'efrac') frac = true;
    })(g);
    return dec && frac ? null : dec ? 'dec' : 'frac';
  }
  function derive(rootNode) {
    const mode = modeOf(rootNode); if (!mode) return null;
    const V = val(rootNode); if (!V) return null;
    const cur = clone(rootNode), events = [];
    collapse(cur);
    for (let guard = 0; guard < 80; guard++) {
      const act = find(cur);
      if (!act) break;
      if (act.type === 'unwrap') {
        const names = []; let c = act.parent.items[act.idx];
        while (c.k === 'grp') { names.push(BRNAME[c.br]); c = c.items[0]; }
        const target = act.parent.items[act.idx];
        const before = ser(cur, { hl: new Map([[target, 'k-o']]) }), plain = ser(cur);
        act.parent.items[act.idx] = c; collapse(cur);
        events.push({ type: 'unwrap', names, before, plainBefore: plain, after: ser(cur, { hl: new Map([[c, 'k-n']]) }), plainAfter: ser(cur), value: val(cur) });
      } else if (act.type === 'pow') {
        const g = act.group, k = act.idx, pw = g.items[k];
        const pl = planPow(pw); if (!pl || !req(pl.res, val(pw)) || !linesOk(pl.lines, pl.res)) return null;
        const rn = mkNode(pl.res, mode); if (!rn) return null;
        const before = ser(cur, { hl: new Map([[pw, 'k-o']]) }), plain = ser(cur);
        g.items[k] = rn; collapse(cur);
        events.push({ type: 'pow', where: WHERE[g.br], A: ser(pw), lines: pl.lines, result: pl.res, resTex: ser(rn), before, plainBefore: plain, after: ser(cur, { hl: new Map([[rn, 'k-n']]) }), plainAfter: ser(cur), value: val(cur) });
      } else {
        const g = act.group, k = act.idx, A = g.items[k - 1], op = g.items[k], B = g.items[k + 1];
        if (!isAtom(A) || !isAtom(B)) return null;
        const tv = rop(op, val(A), val(B)); if (!tv) return null;
        const pl = planOp(A, op, B, mode); if (!pl || !req(pl.res, tv) || !linesOk(pl.lines, tv)) return null;
        const rn = mkNode(pl.res, mode); if (!rn) return null;
        const before = ser(cur, { span: { g, from: k - 1, to: k + 1, cls: 'k-o' } }), plain = ser(cur);
        g.items.splice(k - 1, 3, rn); collapse(cur);
        events.push({ type: 'op', where: WHERE[g.br], A: ser(A, {}, true), op, B: ser(B, {}, true), lines: pl.lines, result: pl.res, resTex: ser(rn), before, plainBefore: plain, after: ser(cur, { hl: new Map([[rn, 'k-n']]) }), plainAfter: ser(cur), value: val(cur) });
      }
      if (!req(events[events.length - 1].value, V)) return null;           // a step that changes the value is a bug here, never shown
    }
    const fin = val(cur);
    return { events, cur, fin, mode };
  }

  /* ---------- the spec for the engine (js/vr_engine.js) ---------- */
  let seq = 0;
  // a curved arrow from the highlighted old part (.k-o of a row) to the new part (.k-n of another row), a chip travelling along it, the new part lighting up
  const flowOps = (fromRow, toRow, id) => [
    { o: 'arrow', id, from: fromRow + '.k-o', to: toRow + '.k-n', color: 'purple', opt: { from: 'bottom', to: 'top', side: 'right', bend: 50 } }, { o: 'wait', t: 0.3 },
    { o: 'fly', path: id, label: '\u2193', color: 'purple' }, { o: 'clear' }, { o: 'cls', at: toRow + '.k-n', c: 'hl-green zoom' }, { o: 'wait', t: 0.35 }];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function innermost(g) {                             // the first bracket the learner should look inside (leftmost, deepest)
    for (let j = 0; j < g.items.length; j += 2) { const c = g.items[j]; if (c.k === 'grp') return innermost(c); }
    return g;
  }
  function arithSpec(steps, o) {
    o = o || {};
    if (!Array.isArray(steps) || steps.length < 1 || steps.length > 14) return null;
    const rowsM = steps.map(s => String((s && s.m) || '').trim());
    if (rowsM.some(x => !x)) return null;
    // 1) the question and every row of the book: same value (a row may be a whole chain "A = B = C"; its first side of the first row is the question)
    const sidesOf = r => r.replace(/^=\s*/, '').split('=').map(x => x.trim());
    const first = sidesOf(rowsM[0]);
    const rootNode = parse(first[0]); if (!rootNode) return null;
    const V0 = val(rootNode); if (!V0) return null;
    let bookEnd = null;
    const checkSide = sd => { const p = parse(sd, true); const v = p && val(p); if (!v || !req(v, V0)) return null; return p; };
    for (let j = 0; j < rowsM.length; j++) {
      const sides = j === 0 ? first.slice(1) : sidesOf(rowsM[j]);
      for (const sd of sides) { const p = checkSide(sd); if (!p) return null; bookEnd = p; }
    }
    if (!bookEnd) return null;
    // 2) our own derivation must land on the book's answer
    const dv = derive(rootNode); if (!dv || !dv.events.some(e => e.type !== 'unwrap')) return null;
    const fin = dv.fin; if (!req(fin, V0)) return null;
    const endMixed = bookEnd.items.length === 1 && bookEnd.items[0].k === 'mixed';
    const needMixed = dv.mode === 'frac' && endMixed && fin.d > 1 && fin.n > fin.d;
    // the book's sentence for an operation is shown only when the book's own row after it is exactly the line we reach (compared as written)
    const bookText = steps.map(s => String((s && s.text) || '').trim());
    const norm = t => String(t).replace(/\\left|\\right|\s+/g, '').replace(/\\frac\{-(\d+)\}\{(\d+)\}/g, '-\\frac{$1}{$2}');
    const opEvents = dv.events.filter(e => e.type !== 'unwrap');
    const ops = opEvents.length + (needMixed ? 1 : 0);
    const bookFor = opEvents.map((ev, k) => {
      const row = rowsM[k + 1]; if (!row || !bookText[k + 1] || !/^=/.test(row) || row.indexOf('=', 1) >= 0) return '';
      const p = parse(row.replace(/^=\s*/, ''), true); return p && norm(ser(p)) === norm(ev.plainAfter) ? bookText[k + 1] : '';
    });
    const lastBook = needMixed && rowsM.length === ops + 1 && bookText[ops] ? bookText[ops] : '';

    const rows = [], out = []; let prev = 's0';
    const wrapIdx = (parts, idx, cls) => parts.map((p, i) => (idx.indexOf(i) >= 0 ? tag(cls, p) : p));
    const lineTex = (ln, j, tagged) => (j === 0 ? '' : '= ') + compose(tagged ? Object.assign({}, ln, { parts: wrapIdx(ln.parts, tagged.idx, tagged.cls) }) : ln);
    const addStep = (html, opsL, ask) => { out.push(Object.assign({ dot: '', title: '', html, ops: opsL }, ask ? { ask: 1 } : {})); return out.length - 1; };   // ask: Practice mode asks the learner for the line this step writes
    const P = '.k-', arrowTo = flowOps;

    // step 0: the question as the book writes it
    rows.push({ id: 's0', first: 0, grp: 'g0', tex: { 0: ser(rootNode) }, note: '' });
    addStep(bookText[0] ? esc(bookText[0]) : 'The question.', [{ o: 'wait', t: 0.2 }, { o: 'write', r: 's0' }, { o: 'wait', t: 0.4 }]);
    // step 1: which bracket comes first
    const hasBrackets = (function has(g) { return g.items.some(x => typeof x === 'object' && x.k === 'grp'); })(rootNode);
    if (hasBrackets) {
      const inner = innermost(rootNode);
      const tg = ser(rootNode, { hl: new Map([[inner, 'k-o']]) });
      addStep('<b>Brackets first.</b> Work from the innermost bracket outwards: the bar (vinculum), then ( ), then { }, then [ ]. Start inside ' + (BRNAME[inner.br] || 'the first bracket') + '.',
        [{ o: 'wait', t: 0.2 }, { o: 'tex', r: 's0', t: tg }, { o: 'cls', at: 's0' + P + 'o', c: 'hl-purple zoom' }, { o: 'wait', t: 1.0 }]);
    }
    let opNo = 0;
    dv.events.forEach((ev, k) => {
      const gid = 'g' + (k + 1), sid = 's' + (k + 1);
      if (ev.type === 'unwrap') {
        const at = out.length;
        rows.push({ id: sid, first: at, grp: gid, tex: { [at]: '= ' + ev.plainAfter }, note: '' });
        const onlyBar = ev.names.every(x => x === 'the bar');
        addStep('There is now just one number inside ' + ev.names.join(' and ') + ', so ' + (onlyBar ? 'the bar is' : 'the brackets are') + ' not needed: remove ' + (onlyBar ? 'it' : 'them') + '.',
          [{ o: 'wait', t: 0.2 }, { o: 'tex', r: prev, t: (prev === 's0' ? '' : '= ') + ev.before }, { o: 'tex', r: sid, t: '= ' + ev.after }, { o: 'write', r: sid }, { o: 'wait', t: 0.3 },
            { o: 'cls', at: prev + P + 'o', c: 'hl-orange ul-orange zoom' }, { o: 'wait', t: 0.5 }].concat(arrowTo(prev, sid, 'u' + k)));
        prev = sid; return;
      }
      // an operation: pick it, work it out on the side in small steps, write the result back
      const ws = ev.lines.map((ln, j) => ({ ln, j, id: 'w' + (k + 1) + '_' + j }));
      const opText = ev.type === 'pow'
        ? ev.where + ', work out the power ' + T(ev.A) + '. Powers (orders) come before multiplication, division, addition and subtraction.'
        : ev.where + ', ' + VERB[ev.op] + ' ' + T(ev.A + OPS[ev.op] + ev.B) + '.';
      ws.forEach(({ ln, j, id }) => {
        const at = out.length + j;
        rows.push({ id, first: at, grp: gid, work: true, tex: { [at]: lineTex(ln, j) }, note: '' });
      });
      // select + copy
      addStep(opText, [{ o: 'wait', t: 0.2 }, { o: 'tex', r: prev, t: (prev === 's0' ? '' : '= ') + ev.before }, { o: 'tex', r: ws[0].id, t: tag('k-n', lineTex(ws[0].ln, 0)) },
        { o: 'write', r: ws[0].id }, { o: 'wait', t: 0.3 }, { o: 'cls', at: prev + P + 'o', c: 'hl-orange ul-orange zoom' }, { o: 'wait', t: 0.5 }].concat(arrowTo(prev, ws[0].id, 'p' + k)));
      ws.slice(1).forEach(({ ln, j, id }) => {
        const pl = ws[j - 1];
        addStep(ln.say || '', [{ o: 'wait', t: 0.2 }, { o: 'tex', r: pl.id, t: lineTex(pl.ln, j - 1, { idx: ln.old, cls: 'k-o' }) }, { o: 'tex', r: id, t: lineTex(ln, j, { idx: ln.neu, cls: 'k-n' }) },
          { o: 'write', r: id }, { o: 'wait', t: 0.3 }, { o: 'cls', at: pl.id + P + 'o', c: 'hl-orange ul-orange zoom' }, { o: 'wait', t: 0.5 }].concat(arrowTo(pl.id, id, 'x' + k + '_' + j)));
      });
      // the result goes back into the expression
      const last = ws[ws.length - 1], at2 = out.length;
      rows.push({ id: sid, first: at2, grp: gid, tex: { [at2]: '= ' + ev.plainAfter }, note: '' });
      const book = bookFor[opNo] || '';
      addStep('Write the result ' + T(ev.resTex) + ' back where ' + (ev.type === 'pow' ? 'the power' : 'the operation') + ' was.' + (book ? '<br><span class="sbt-book">Textbook: ' + esc(book) + '</span>' : ''),
        [{ o: 'wait', t: 0.2 }, { o: 'tex', r: last.id, t: lineTex(last.ln, last.j, { idx: last.ln.neu, cls: 'k-o' }) }, { o: 'tex', r: sid, t: '= ' + ev.after }, { o: 'write', r: sid }, { o: 'wait', t: 0.3 },
          { o: 'cls', at: last.id + P + 'o', c: 'hl-orange ul-orange zoom' }, { o: 'wait', t: 0.5 }].concat(arrowTo(last.id, sid, 'b' + k)), true);
      prev = sid; opNo++;
    });
    // the book's answer is a mixed number: show how the improper fraction becomes one
    if (needMixed) {
      const k = dv.events.length, sid = 's' + (k + 1), gid = 'g' + (k + 1), lines = planMixed(fin.n, fin.d);
      const ws = lines.map((ln, j) => ({ ln, j, id: 'w' + (k + 1) + '_' + j }));
      const finalPlain = String(bookEnd.items[0].w) + '\\frac{' + bookEnd.items[0].n + '}{' + bookEnd.items[0].d + '}';
      const curPlain = ser(dv.cur);
      ws.forEach(({ ln, j, id }) => { const at = out.length + j; rows.push({ id, first: at, grp: gid, work: true, tex: { [at]: lineTex(ln, j) }, note: '' }); });
      addStep('The answer is an improper fraction (the top is bigger than the bottom). Change it to a mixed number.',
        [{ o: 'wait', t: 0.2 }, { o: 'tex', r: prev, t: '= ' + tag('k-o', curPlain) }, { o: 'tex', r: ws[0].id, t: tag('k-n', lineTex(ws[0].ln, 0)) }, { o: 'write', r: ws[0].id }, { o: 'wait', t: 0.3 },
          { o: 'cls', at: prev + P + 'o', c: 'hl-orange ul-orange zoom' }, { o: 'wait', t: 0.5 }].concat(arrowTo(prev, ws[0].id, 'm0')));
      const w1 = ws[1], w0 = ws[0];
      addStep(w1.ln.say, [{ o: 'wait', t: 0.2 }, { o: 'tex', r: w0.id, t: lineTex(w0.ln, 0, { idx: [0], cls: 'k-o' }) }, { o: 'tex', r: w1.id, t: '= ' + tag('k-n', w1.ln.parts[0]) }, { o: 'write', r: w1.id }, { o: 'wait', t: 0.3 },
        { o: 'cls', at: w0.id + P + 'o', c: 'hl-orange ul-orange zoom' }, { o: 'wait', t: 0.5 }].concat(arrowTo(w0.id, w1.id, 'm1')));
      const at2 = out.length;
      rows.push({ id: sid, first: at2, grp: gid, tex: { [at2]: '= ' + finalPlain }, note: '' });
      addStep('Write the answer: ' + T(finalPlain) + '.' + (lastBook ? '<br><span class="sbt-book">Textbook: ' + esc(lastBook) + '</span>' : ''),
        [{ o: 'wait', t: 0.2 }, { o: 'tex', r: w1.id, t: '= ' + tag('k-o', w1.ln.parts[0]) }, { o: 'tex', r: sid, t: '= ' + tag('k-n', finalPlain) }, { o: 'write', r: sid }, { o: 'wait', t: 0.3 },
          { o: 'cls', at: w1.id + P + 'o', c: 'hl-orange ul-orange zoom' }, { o: 'wait', t: 0.5 }].concat(arrowTo(w1.id, sid, 'm2')), true);
      prev = sid;
    }
    const lastState = rows.filter(r => /^s\d+$/.test(r.id)).pop(); lastState.final = 1;
    const N = out.length;
    out.forEach((s, i) => { s.dot = String(i + 1); s.title = 'Step ' + (i + 1) + ' of ' + N; });
    const id = 'arith' + (++seq);
    return { id, q: o.q || '', givenText: o.given || '', auto: true, acc: true, arith: true, rows, steps: out, stats: { steps: N, bookSteps: steps.length } };
  }

  /* ---------- the book's own rows on the accumulating board (any solution whose every row carries TeX and continues the line above with "=") ----------
     Nothing is rewritten: each row is shown exactly as written. A row takes TWO steps: first the part of the line above that changes is picked out
     (with the book's own sentence), then it is replaced and the new line is written. */
  function lastSideOf(m) {                                 // -> { pre: 'text up to and including the last top-level =', last }
    let d = 0, cut = -1;
    for (let i = 0; i < m.length; i++) {
      const c = m[i];
      if (c === '\\') { i++; continue; }
      if ('({['.includes(c)) d++; else if (')}]'.includes(c)) d--;
      else if (c === '=' && d === 0 && i > 0 && m[i - 1] !== '<' && m[i - 1] !== '>' && m[i - 1] !== '!') cut = i;
    }
    return cut < 0 ? { pre: /^=/.test(m) ? '= ' : '', last: m.replace(/^=\s*/, '') } : { pre: m.slice(0, cut + 1) + ' ', last: m.slice(cut + 1).trim() };
  }
  function rowsSpec(steps, o) {
    o = o || {};
    if (!Array.isArray(steps) || steps.length < 2 || steps.length > 16) return null;
    const ms = steps.map(s => String((s && s.m) || '').replace(/\\displaystyle\s*/g, '').trim());
    if (ms.some(x => !x || x.length > 200 || /\\begin|&|\\\\|\\tag|\\cases/.test(x))) return null;
    const cont = ms.map((m, j) => j > 0 && /^=/.test(m));
    if (cont.filter(Boolean).length < Math.ceil((ms.length - 1) * 0.6)) return null;                 // unrelated lines are not a derivation: leave them to the plain presentation
    if (ms.some((m, j) => j < ms.length - 1 && lastSideOf(m).pre.replace(/^=\s*/, '') !== '')) return null;   // a chain inside a row: the chain splitter shows it better
    const txt = steps.map(s => String((s && s.text) || '').trim());
    const diffFn = root.SBVR && root.SBVR.diff;
    const rows = ms.map((m, j) => ({ id: 'b' + j, first: 0, grp: 'g' + j, tex: {}, note: '' })), out = [];
    const add = (html, opsL, j, tex, ask) => { out.push(Object.assign({ dot: '', title: '', html, ops: opsL }, ask ? { ask: 1 } : {})); const at = out.length - 1; if (j != null) { rows[j].first = at; rows[j].tex[at] = tex; } return at; };
    add(esc(txt[0] || 'The question.'), [{ o: 'wait', t: 0.2 }, { o: 'write', r: 'b0' }, { o: 'wait', t: 0.4 }], 0, ms[0]);
    for (let j = 1; j < ms.length; j++) {
      const prev = 'b' + (j - 1), cur = 'b' + j, sentence = txt[j] ? esc(txt[j]) : '';
      if (!cont[j]) { add(sentence || 'The next line.', [{ o: 'wait', t: 0.2 }, { o: 'write', r: cur }, { o: 'wait', t: 0.4 }], j, ms[j]); continue; }
      const L = lastSideOf(ms[j - 1]), body = ms[j].replace(/^=\s*/, '');
      const d = diffFn && L.last.length < 160 && body.length < 160 ? diffFn(L.last, body) : null;
      const good = d && !d.whole && d.hasOld && d.hasNew;
      const oldTagged = L.pre + (good ? d.a : tag('k-o', L.last)), newTagged = '= ' + (good ? d.b : tag('k-n', body));
      add(sentence || 'Look at the part that changes.', [{ o: 'wait', t: 0.2 }, { o: 'tex', r: prev, t: oldTagged }, { o: 'cls', at: prev + '.k-o', c: 'hl-orange ul-orange zoom' }, { o: 'wait', t: 0.9 }]);
      const say = good && d.o.length <= 60 && d.n.length <= 60 ? 'Replace ' + T(d.o) + ' with ' + T(d.n) + ' and write the new line.' : 'Write the next line.';
      add(say, [{ o: 'wait', t: 0.2 }, { o: 'tex', r: prev, t: oldTagged }, { o: 'tex', r: cur, t: newTagged }, { o: 'write', r: cur }, { o: 'wait', t: 0.3 }, { o: 'cls', at: prev + '.k-o', c: 'hl-orange ul-orange zoom' }, { o: 'wait', t: 0.5 }].concat(flowOps(prev, cur, 'r' + j)), j, ms[j], true);
    }
    rows[rows.length - 1].final = 1;
    const N = out.length; out.forEach((s, i) => { s.dot = String(i + 1); s.title = 'Step ' + (i + 1) + ' of ' + N; });
    return { id: 'rows' + (++seq), q: o.q || '', givenText: o.given || '', auto: true, acc: true, rows, steps: out, stats: { steps: N, bookSteps: steps.length } };
  }

  const NS = root.SBVR = root.SBVR || {};
  NS.arithSpec = arithSpec; NS.bookRowsSpec = rowsSpec;
  if (typeof module !== 'undefined' && module.exports) module.exports = { parse, val, ser, derive, planOp, planPow, planMixed, arithSpec, rowsSpec, rop, R, fmt, compose, linesOk };
})(typeof window !== 'undefined' ? window : globalThis);
