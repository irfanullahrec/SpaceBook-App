/* Visual-reasoning specs: Class 12 Mathematics, Unit 2, Exercise 2.1, Q3 (a)-(d) composite functions and Q4 (a)-(d) inverses.
 * Each spec only presents the verified worked solution in js/math_12_data.js (same results); see vr_engine.js for the ops. */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS) return;
  const C = NS.C, BL = NS.BLANK;
  const W = t => ({ o: 'wait', t }), WR = r => ({ o: 'write', r }), CL = (at, c) => ({ o: 'cls', at, c }),
    AR = (id, from, to, color, opt) => ({ o: 'arrow', id, from, to, color, opt }), FL = (path, label, color) => ({ o: 'fly', path, label, color }),
    CLR = { o: 'clear' }, TX = (r, t) => ({ o: 'tex', r, t }), PAR = ops => ({ o: 'par', ops });
  const given = (id, name, rule, note) => ({ id, first: 0, tex: { '-1': `${C('k-nm', name)}=${C('k-rule', rule)}` }, note });
  const hide = (rows, n) => rows.forEach(r => { if (r.hideAt == null) r.hideAt = n; });

  /* OUT(IN(x)): write, bring the inner value into OUT( ), bring the rule of OUT, replace x. Returns 4 steps + 3 rows. */
  function comp(P, s0, o) {
    const r1 = P + '1', r2 = P + '2', r3 = P + '3', O = o.out, I = o.in, rbs = o.rb || ['k-rb'];
    const rows = [
      { id: r1, first: s0, tex: { [s0]: `${O}(${C('k-gg', I + '(x)')})=\\,?` }, note: `${I}(x) goes inside ${O}` },
      { id: r2, first: s0 + 1, pre: `=${O}(${BL('')})`, tex: { [s0 + 1]: `=${O}(${C('k-in', o.inVal)})` }, note: `the input of ${O} is now ${o.valPlain}` },
      { id: r3, first: s0 + 2, final: !!o.final, arcsFrom: o.arcsFrom, pre: `=${BL('2')}`, tex: { [s0 + 2]: `=${o.ruleX}`, [s0 + 3]: `=${o.replaced}` }, note: o.note3 || `${O} applied to ${o.valPlain}` }
    ];
    const g = o.inRow, f = o.outRow;
    const after = o.after ? o.after(r3) : [CL(r3 + '.k-br', 'hl-blue zoom')];
    const steps = [
      { dot: 'Write', title: `Step ${s0 + 1} · Write what we need`,
        html: `We want <b>${O}(${I}(x))</b>. The part inside the bracket, <b class="b">${I}(x)</b>, is the inner function: it is worked out first and then fed into ${O}.`,
        ops: [W(0.25), WR(r1), W(0.7), CL(r1 + '.k-gg', 'hl-blue ul-blue zoom')] },
      { dot: 'Bring in', title: `Step ${s0 + 2} · Bring ${I}(x) into ${O}( )`,
        html: `${O}( ) needs an input. ${I}(x) equals <b class="b">${o.valPlain}</b> (see the given line), so <b class="b">${o.valPlain}</b> travels from ${I}(x) into the bracket of ${O}, giving <b>${O}(${o.valPlain})</b>.`,
        ops: [CL(r1 + '.k-gg', 'hl-blue ul-blue'), W(0.25), WR(r2), W(0.6),
          AR('a1', r1 + '.k-gg', r2 + '.k-slot', 'orange', { from: 'bottom', to: 'top', side: 'right', bend: 50 }), W(0.8),
          AR('a2', r1 + '.k-gg', g + '.k-rule', 'purple', { from: 'top', to: 'bottom', side: 'right', bend: 60 }), W(0.8),
          CL(g + '.k-rule', 'hl-blue ul-blue zoom'), W(0.9),
          AR('a3', g + '.k-rule', r2 + '.k-slot', 'blue', { from: 'bottom', to: 'top', side: 'right', bend: 110 }), W(0.5),
          FL('a3', o.valPlain, 'blue'), CLR, TX(r2, { k: s0 + 1 }), CL(r2 + '.k-in', 'hl-blue ul-blue zoom')] },
      { dot: 'Bring rule', title: `Step ${s0 + 3} · Bring the rule of ${O}`,
        html: `Next, ${O}( ) must be replaced by its rule. The rule is ${O}(x) = <b class="o">${o.rulePlain}</b>, so <b class="o">${o.rulePlain}</b> travels from the given line into the empty place.`,
        ops: [W(0.25), WR(r3), W(0.6),
          AR('b1', f + '.k-nm', f + '.k-rule', 'purple', { from: 'top', to: 'top', bend: -60 }), W(0.8),
          CL(f + '.k-rule', 'hl-orange ul-orange zoom'), W(0.9),
          AR('b2', f + '.k-rule', r3 + '.k-slot2', 'orange', { from: 'bottom', to: 'top', side: 'right', bend: 150 }), W(0.5),
          FL('b2', o.rulePlain, 'orange'), CLR, TX(r3, { k: s0 + 2 }), CL(rbs.map(t => r3 + '.' + t), 'hl-orange zoom')] },
      { dot: 'Replace x', title: `Step ${s0 + 4} · Replace x by ${o.valPlain}`,
        html: `Wherever ${O} has <b class="o">x</b>, put the input <b class="b">${o.valPlain}</b>. ${o.h3 || ''}`,
        ops: [CL(r2 + '.k-in', 'hl-blue ul-blue zoom'), CL(rbs.map(t => r3 + '.' + t), 'hl-orange pulse'), W(0.9)]
          .concat(rbs.map((t, i) => AR('m' + i, r2 + '.k-in', r3 + '.' + t, 'blue', { from: 'bottom', to: 'top', side: 'right', bend: 70 + i * 40 })))
          .concat([W(0.5), PAR(rbs.map((t, i) => FL('m' + i, o.valPlain, 'blue'))), CLR, TX(r3, { k: s0 + 3 })], after, [W(0.5)]) }
    ];
    return { rows, steps, r1, r2, r3 };
  }

  const FG = 'f(x)=x^2+1,\\ g(x)=2x';

  /* ---------- Q3 (a) f(x)=x^2+1, g(x)=2x ---------- */
  (function () {
    const A = comp('a', 0, {
      out: 'f', in: 'g', outRow: 'f', inRow: 'g', inVal: '2x', valPlain: '2x', rulePlain: 'x² + 1',
      ruleX: `${C('k-rb', 'x')}^2+1`,
      replaced: `${C('k-br', `(${C('k-fa', '2')}${C('k-fb', 'x')})`)}^{${C('k-ex', '2')}}+1`,
      arcsFrom: 4, note3: 'f squares its input, then adds 1',
      h3: 'Because the x was squared, the whole bracket <b>(2x)</b> is squared: f(2x) = <b>(2x)² + 1</b>.',
      after: r3 => [{ o: 'hide', at: r3 + '.k-ex' }, CL(r3 + '.k-br', 'hl-blue zoom'), W(0.9), { o: 'show', at: r3 + '.k-ex' }, CL(r3 + '.k-ex', 'hl-purple zoom')]
    });
    const B = comp('b', 6, {
      out: 'g', in: 'f', outRow: 'g', inRow: 'f', inVal: 'x^2+1', valPlain: 'x² + 1', rulePlain: '2x',
      ruleX: `2${C('k-rb', 'x')}`, replaced: `${C('k-two', '2')}${C('k-br', '(x^2+1)')}`,
      note3: 'g doubles its input', h3: 'g doubles its input, so the whole bracket <b>(x² + 1)</b> is doubled: g(f(x)) = <b>2(x² + 1)</b>.'
    });
    hide(A.rows, 5);
    const rows = [
      given('f', 'f(x)', 'x^2+1', 'f: the outer function'), given('g', 'g(x)', '2x', 'g: the inner function'),
      ...A.rows,
      { id: 'A4', first: 4, hideAt: 5, tex: { 4: `=${C('k-p1', '2^2')}\\times ${C('k-p2', 'x^2')}+1` }, note: '(ab)ⁿ = aⁿ · bⁿ' },
      { id: 'A5', first: 4, final: 1, hideAt: 6, tex: { 4: `=${C('k-four', '4')}x^2+1` }, view: { 5: `f(g(x))=4${C('k-sx', 'x')}^2+1` }, note: '2² = 4' },
      { id: 'x3', first: 5, hideAt: 6, tex: { 5: `x=${C('k-three', '3')}` }, note: 'now put x = 3' },
      { id: 's1', first: 5, hideAt: 6, tex: { 5: `=4(${C('k-t1', '3')})^{${C('k-e1', '2')}}+1` }, note: '3 replaces x' },
      { id: 's2', first: 5, hideAt: 6, tex: { 5: `=${C('k-m1', '4\\times 9')}+1` }, note: '3² = 9' },
      { id: 's3', first: 5, hideAt: 6, tex: { 5: `=${C('k-m2', '36')}+1` }, note: '4 × 9 = 36' },
      { id: 's4', first: 5, hideAt: 6, final: 1, tex: { 5: `=${C('k-r', '37')}` }, note: '36 + 1 = 37' },
      { id: 'chk', first: 5, hideAt: 6, tex: { 5: 'f(g(3))=f(6)=6^2+1=37' }, note: 'check: the same value ✓' },
      { id: 'sum1', first: 6, tex: { 6: 'f(g(x))=4x^2+1' }, note: 'f(g(x)) is done' },
      ...B.rows.map(r => Object.assign(r, { hideAt: 11 })),
      { id: 'B4', first: 10, hideAt: 11, tex: { 10: `=${C('k-d1', '2\\times x^2')}+${C('k-d2', '2\\times 1')}` }, note: 'the 2 multiplies each term' },
      { id: 'B5', first: 10, final: 1, tex: { 10: `=2x^2+2` }, note: 'g(f(x)) = 2x² + 2' },
      { id: 'k1', first: 11, tex: { 11: 'f(3)=3^2+1=10' }, note: 'f first' },
      { id: 'k2', first: 11, tex: { 11: `g(10)=2\\times 10=${C('k-v1', '20')}` }, note: 'then g' },
      { id: 'k3', first: 11, tex: { 11: `2(3)^2+2=18+2=${C('k-v2', '20')}` }, note: 'the simplified form gives 20 too ✓' },
      { id: 'dom', first: 11, tex: { 11: '\\text{Domain of both: }\\mathbb{R}' }, note: 'no excluded values' }
    ];
    const steps = [
      ...A.steps,
      { dot: 'Simplify', title: 'Step 5 · Distribute the square, then simplify',
        html: 'The power <b class="p">2</b> belongs to the whole bracket, so it applies to <b>both factors</b>: (ab)<sup>n</sup> = a<sup>n</sup>b<sup>n</sup>. Then <b class="p">2² = 4</b> and x² stays.',
        ops: [W(0.2), CL('a3.k-ex', 'hl-purple pulse'), W(0.4),
          AR('e1', 'a3.k-ex', 'a3.k-fa', 'purple', { bend: -70, from: 'top', to: 'top' }), AR('e2', 'a3.k-ex', 'a3.k-fb', 'purple', { bend: -46, from: 'top', to: 'top' }),
          CL(['a3.k-fa', 'a3.k-fb'], 'hl-orange pulse'), W(0.9), CLR, WR('A4'), W(0.7),
          CL('A4.k-p1', 'hl-orange ul-orange zoom'), W(0.9), AR('p', 'A4.k-p1', 'A5.k-four', 'purple', { bend: 60 }), W(0.4), FL('p', '4', 'purple'),
          WR('A5'), CL('A5.k-four', 'hl-green zoom'), CLR] },
      { dot: 'x = 3', title: 'Step 6 · Put x = 3 and calculate',
        html: 'Now <b class="b">3</b> replaces x: <b>4(3)² + 1</b>. Square first (3² = 9), then multiply (4 × 9 = 36), then add 1: the value is <b class="g">37</b>. Checking f(g(3)) = f(6) = 6² + 1 gives the same 37.',
        ops: [W(0.25), WR('x3'), CL('x3.k-three', 'hl-blue ul-blue zoom'), CL('A5.k-sx', 'hl-orange pulse'), W(0.9),
          AR('t', 'x3.k-three', 'A5.k-sx', 'blue', { from: 'top', to: 'bottom', side: 'right', bend: 60 }), W(0.5), FL('t', '3', 'blue'), CLR,
          WR('s1'), CL('s1.k-t1', 'hl-blue zoom'), W(0.9), CL('s1.k-e1', 'hl-purple zoom'), W(0.8),
          WR('s2'), CL('s2.k-m1', 'hl-purple zoom'), W(1), WR('s3'), CL('s3.k-m2', 'hl-purple zoom'), W(1),
          WR('s4'), CL('s4.k-r', 'hl-green zoom'), W(0.8), WR('chk')] },
      ...B.steps,
      { dot: 'Expand', title: 'Step 11 · Multiply out the bracket',
        html: 'The <b class="p">2</b> multiplies <b>every term</b> inside the bracket: 2 × x² and 2 × 1. So g(f(x)) = 2x² + 2.',
        ops: [W(0.2), CL('b3.k-two', 'hl-purple ul-orange zoom'), W(0.9), WR('B4'), W(0.4),
          AR('d1', 'b3.k-two', 'B4.k-d1', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 60 }),
          AR('d2', 'b3.k-two', 'B4.k-d2', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 100 }), W(0.9),
          CL(['B4.k-d1', 'B4.k-d2'], 'hl-purple zoom'), W(0.9), CLR, WR('B5')] },
      { dot: 'Verify', title: 'Step 12 · Verify with x = 3, and the domain',
        html: 'f(3) = 10, then g(10) = 20. The simplified form 2(3)² + 2 also gives <b class="g">20</b>. Both compositions are polynomials, so every real x is allowed.',
        ops: [W(0.25), WR('k1'), W(0.9), WR('k2'), CL('k2.k-v1', 'hl-green zoom'), W(1), WR('k3'), CL('k3.k-v2', 'hl-green zoom'), W(0.9), WR('dom')] }
    ];
    NS.register({ id: 'comp3a', q: 'Q3 (a)', given: FG + '\\ \\Rightarrow\\ f(g(x)),\\ g(f(x))', rows, steps });
  })();

  /* ---------- Q3 (b) f(x)=sin x, g(x)=1-x^2 ---------- */
  (function () {
    const A = comp('a', 0, {
      out: 'f', in: 'g', outRow: 'f', inRow: 'g', inVal: '1-x^2', valPlain: '1 − x²', rulePlain: 'sin x',
      ruleX: `\\sin ${C('k-rb', 'x')}`, replaced: `\\sin${C('k-br', '(1-x^2)')}`, final: 1, note3: 'sine takes the whole bracket',
      h3: 'The sine acts on the <b>whole</b> input, so the bracket stays: f(g(x)) = <b>sin(1 − x²)</b>.'
    });
    const B = comp('b', 4, {
      out: 'g', in: 'f', outRow: 'g', inRow: 'f', inVal: '\\sin x', valPlain: 'sin x', rulePlain: '1 − x²',
      ruleX: `1-${C('k-rb', 'x')}^2`, replaced: `1-${C('k-br', '(\\sin x)')}^2`, note3: 'g squares its input, then subtracts from 1',
      h3: 'The x was squared, so the whole input is squared: g(f(x)) = <b>1 − (sin x)²</b>.'
    });
    hide(A.rows, 4);
    const rows = [
      given('f', 'f(x)', '\\sin x', 'f: the outer function'), given('g', 'g(x)', '1-x^2', 'g: the inner function'),
      ...A.rows, { id: 'sum1', first: 4, tex: { 4: 'f(g(x))=\\sin(1-x^2)' }, note: 'f(g(x)) is done' },
      ...B.rows.map(r => Object.assign(r, { hideAt: 9 })),
      { id: 'B4', first: 8, tex: { 8: `=1-${C('k-ss', '\\sin^2 x')}` }, note: '(sin x)² is written sin²x' },
      { id: 'ID', first: 9, tex: { 9: `\\sin^2 x+${C('k-ic', '\\cos^2 x')}=1` }, note: 'identity: sin²x + cos²x = 1' },
      { id: 'B5', first: 9, final: 1, tex: { 9: `=${C('k-cc', '\\cos^2 x')}` }, note: '1 − sin²x = cos²x' },
      { id: 'dom', first: 9, tex: { 9: '\\text{Domain of both: }\\mathbb{R}' }, note: 'sine and polynomials: no excluded values' }
    ];
    const steps = [
      ...A.steps,
      ...B.steps,
      { dot: 'Square', title: 'Step 9 · Write the square on sin x',
        html: 'The bracket (sin x) is squared. By convention, <b>(sin x)²</b> is written <b class="p">sin²x</b>.',
        ops: [W(0.2), CL('b3.k-br', 'hl-blue zoom'), W(0.9), WR('B4'), W(0.4), AR('q', 'b3.k-br', 'B4.k-ss', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 70 }), W(0.5), FL('q', 'sin²x', 'purple'), CLR, CL('B4.k-ss', 'hl-purple zoom')] },
      { dot: 'Identity', title: 'Step 10 · Use sin²x + cos²x = 1',
        html: 'From <b>sin²x + cos²x = 1</b> we get <b class="g">1 − sin²x = cos²x</b>. So g(f(x)) = cos²x. Both domains are all real numbers.',
        ops: [W(0.2), CL('B4.k-ss', 'hl-purple ul-orange zoom'), WR('ID'), W(0.9), CL('ID.k-ic', 'hl-green zoom'), W(0.9),
          AR('i', 'ID.k-ic', 'B5.k-cc', 'green', { from: 'bottom', to: 'top', side: 'right', bend: 70 }), W(0.5), FL('i', 'cos²x', 'green'), CLR, WR('B5'), CL('B5.k-cc', 'hl-green zoom'), W(0.8), WR('dom')] }
    ];
    NS.register({ id: 'comp3b', q: 'Q3 (b)', given: 'f(x)=\\sin x,\\ g(x)=1-x^2\\ \\Rightarrow\\ f(g(x)),\\ g(f(x))', rows, steps });
  })();

  /* ---------- Q3 (c) f(x)=(x-1)/(x+1), g(x)=(x+1)/(1-x) ---------- */
  (function () {
    const A = comp('a', 0, {
      out: 'f', in: 'g', outRow: 'f', inRow: 'g', inVal: '\\frac{x+1}{1-x}', valPlain: '(x + 1)/(1 − x)', rulePlain: '(x − 1)/(x + 1)',
      rb: ['k-rb', 'k-rb2'], ruleX: `\\frac{${C('k-rb', 'x')}-1}{${C('k-rb2', 'x')}+1}`,
      replaced: `\\frac{${C('k-n', '\\frac{x+1}{1-x}-1')}}{${C('k-d', '\\frac{x+1}{1-x}+1')}}`, note3: 'both x are replaced',
      h3: 'There are <b>two</b> x in f, so the value travels to both places.',
      after: r3 => [CL([r3 + '.k-n', r3 + '.k-d'], 'hl-blue zoom')]
    });
    const B = comp('b', 6, {
      out: 'g', in: 'f', outRow: 'g', inRow: 'f', inVal: '\\frac{x-1}{x+1}', valPlain: '(x − 1)/(x + 1)', rulePlain: '(x + 1)/(1 − x)',
      rb: ['k-rb', 'k-rb2'], ruleX: `\\frac{${C('k-rb', 'x')}+1}{1-${C('k-rb2', 'x')}}`,
      replaced: `\\frac{${C('k-n', '\\frac{x-1}{x+1}+1')}}{${C('k-d', '1-\\frac{x-1}{x+1}')}}`, note3: 'both x are replaced',
      h3: 'There are <b>two</b> x in g, so the value travels to both places.',
      after: r3 => [CL([r3 + '.k-n', r3 + '.k-d'], 'hl-blue zoom')]
    });
    hide(A.rows, 6);
    const rows = [
      given('f', 'f(x)', '\\frac{x-1}{x+1}', 'f: the outer function'), given('g', 'g(x)', '\\frac{x+1}{1-x}', 'g: the inner function'),
      ...A.rows,
      { id: 'C4', first: 4, hideAt: 6, tex: { 4: `=\\frac{${C('k-cn', '\\frac{(x+1)-(1-x)}{1-x}')}}{${C('k-cd', '\\frac{(x+1)+(1-x)}{1-x}')}}` }, note: 'write −1 and +1 over the denominator 1 − x' },
      { id: 'C5', first: 5, hideAt: 6, tex: { 5: `=\\frac{\\frac{${C('k-t1', '2x')}}{${C('k-e1', '1-x')}}}{\\frac{${C('k-t2', '2')}}{${C('k-e2', '1-x')}}}` }, note: 'combine the tops' },
      { id: 'C6', first: 5, hideAt: 6, final: 1, tex: { 5: `=x,\\quad ${C('k-ne', 'x\\neq 1')}` }, note: 'cancel (1 − x), keep the restriction' },
      { id: 'D1', first: 5, hideAt: 6, tex: { 5: '\\text{Domain: }\\mathbb{R}\\setminus\\{1\\}' }, note: 'g needs x ≠ 1; g(x) never equals −1' },
      { id: 'sum1', first: 6, tex: { 6: 'f(g(x))=x,\\ x\\neq 1' }, note: 'f(g(x)) is done' },
      ...B.rows.map(r => Object.assign(r, { hideAt: 11 })),
      { id: 'E4', first: 10, tex: { 10: `=\\frac{${C('k-cn', '\\frac{(x-1)+(x+1)}{x+1}')}}{${C('k-cd', '\\frac{(x+1)-(x-1)}{x+1}')}}` }, note: 'write +1 and 1 − … over the denominator x + 1' },
      { id: 'E5', first: 11, tex: { 11: `=\\frac{\\frac{${C('k-t1', '2x')}}{${C('k-e1', 'x+1')}}}{\\frac{${C('k-t2', '2')}}{${C('k-e2', 'x+1')}}}` }, note: 'combine the tops' },
      { id: 'E6', first: 11, final: 1, tex: { 11: `=x,\\quad ${C('k-ne', 'x\\neq -1')}` }, note: 'cancel (x + 1), keep the restriction' },
      { id: 'D2', first: 11, tex: { 11: '\\text{Domain: }\\mathbb{R}\\setminus\\{-1\\}' }, note: 'f needs x ≠ −1; f(x) never equals 1' }
    ];
    const simp = (cP, c4, c5, c6, d, ex, hint1, hint2) => [
      { dot: 'Denominator', title: hint1.title,
        html: hint1.html,
        ops: [CL([cP + '.k-n', cP + '.k-d'], 'hl-purple pulse'), W(0.9), WR(c4), W(0.7), CL([c4 + '.k-cn', c4 + '.k-cd'], 'hl-purple zoom')] },
      { dot: 'Cancel', title: hint2.title,
        html: hint2.html,
        ops: [W(0.2), CL([c4 + '.k-cn', c4 + '.k-cd'], 'hl-purple pulse'), W(0.6), WR(c5), W(0.5),
          AR('u1', c4 + '.k-cn', c5 + '.k-t1', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 60 }),
          AR('u2', c4 + '.k-cd', c5 + '.k-t2', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 100 }), W(0.5),
          PAR([FL('u1', ex[0], 'purple'), FL('u2', ex[1], 'purple')]), CLR,
          CL([c5 + '.k-e1', c5 + '.k-e2'], 'hl-orange zoom'), W(1), CL([c5 + '.k-e1', c5 + '.k-e2'], 'strike'), W(0.7),
          WR(c6), CL(c6 + '.k-ne', 'hl-red zoom'), W(0.9), WR(d)] }
    ];
    const s1 = simp('a3', 'C4', 'C5', 'C6', 'D1', ['2x', '2'], {
      title: 'Step 5 · Put −1 and +1 over the same denominator',
      html: 'Write <b>1</b> as <b class="p">(1 − x)/(1 − x)</b> so every term has the denominator <b>1 − x</b>: the top becomes (x + 1) − (1 − x) and the bottom (x + 1) + (1 − x).'
    }, {
      title: 'Step 6 · Combine, cancel, keep the restriction',
      html: 'Top: (x + 1) − (1 − x) = <b class="p">2x</b>. Bottom: (x + 1) + (1 − x) = <b class="p">2</b>. The common factor <b class="o">(1 − x)</b> cancels, leaving <b class="g">x</b>, but only for <b class="r">x ≠ 1</b>.'
    });
    const s2 = simp('b3', 'E4', 'E5', 'E6', 'D2', ['2x', '2'], {
      title: 'Step 11 · Put +1 and 1 − … over the same denominator',
      html: 'Write <b>1</b> as <b class="p">(x + 1)/(x + 1)</b>: the top becomes (x − 1) + (x + 1) and the bottom (x + 1) − (x − 1).'
    }, {
      title: 'Step 12 · Combine, cancel, keep the restriction',
      html: 'Top: (x − 1) + (x + 1) = <b class="p">2x</b>. Bottom: (x + 1) − (x − 1) = <b class="p">2</b>. The common factor <b class="o">(x + 1)</b> cancels, leaving <b class="g">x</b>, but only for <b class="r">x ≠ −1</b>.'
    });
    NS.register({ id: 'comp3c', q: 'Q3 (c)', given: 'f(x)=\\frac{x-1}{x+1},\\ g(x)=\\frac{x+1}{1-x}\\ \\Rightarrow\\ f(g(x)),\\ g(f(x))', rows, steps: [...A.steps, ...s1, ...B.steps, ...s2] });
  })();

  /* ---------- Q3 (d) f(x)=sin x, g(x)=2x+3 ---------- */
  (function () {
    const A = comp('a', 0, {
      out: 'f', in: 'g', outRow: 'f', inRow: 'g', inVal: '2x+3', valPlain: '2x + 3', rulePlain: 'sin x',
      ruleX: `\\sin ${C('k-rb', 'x')}`, replaced: `\\sin${C('k-br', '(2x+3)')}`, final: 1, note3: 'sine takes the whole bracket',
      h3: 'The sine acts on the <b>whole</b> input, so the bracket stays: f(g(x)) = <b>sin(2x + 3)</b>.'
    });
    const B = comp('b', 4, {
      out: 'g', in: 'f', outRow: 'g', inRow: 'f', inVal: '\\sin x', valPlain: 'sin x', rulePlain: '2x + 3',
      ruleX: `2${C('k-rb', 'x')}+3`, replaced: `2${C('k-br', '\\sin x')}+3`, final: 1, note3: 'g doubles its input, then adds 3',
      h3: 'Here sin x is simply multiplied by 2 and 3 is added: g(f(x)) = <b>2 sin x + 3</b>.'
    });
    hide(A.rows, 4);
    const rows = [
      given('f', 'f(x)', '\\sin x', 'f: the outer function'), given('g', 'g(x)', '2x+3', 'g: the inner function'),
      ...A.rows, { id: 'sum1', first: 4, tex: { 4: 'f(g(x))=\\sin(2x+3)' }, note: 'f(g(x)) is done' },
      ...B.rows, { id: 'dom', first: 7, tex: { 7: '\\text{Domain of both: }\\mathbb{R}' }, note: 'no excluded values' }
    ];
    const steps = [...A.steps, ...B.steps];
    steps[steps.length - 1] = Object.assign({}, steps[steps.length - 1], { ops: steps[steps.length - 1].ops.concat([WR('dom')]) });
    NS.register({ id: 'comp3d', q: 'Q3 (d)', given: 'f(x)=\\sin x,\\ g(x)=2x+3\\ \\Rightarrow\\ f(g(x)),\\ g(f(x))', rows, steps });
  })();

  /* ---------- Q4: inverse of f(g(x)) and g(f(x)) ---------- */
  const SUM = (id, first, t, note) => ({ id, first, tex: { [first]: t }, note });

  /* inverse of a linear result in 2 steps: balance (subtract/add on both sides), then solve and rename */
  function inv(P, s, o) {
    const I = n => P + n;
    const rows = [
      { id: I(1), first: s, hideAt: s + 1, tex: { [s]: o.r1 }, note: o.n1 },
      { id: I(2), first: s, hideAt: s + 1, tex: { [s]: o.r2 }, note: o.n2 },
      { id: I(3), first: s, hideAt: o.hideAt, tex: { [s]: o.r3 }, note: o.n3 },
      { id: I(4), first: s + 1, hideAt: o.hideAt, tex: { [s + 1]: o.r4 }, note: o.n4 },
      { id: I(5), first: s + 1, final: 1, tex: { [s + 1]: o.r5 }, note: o.n5 }
    ];
    const step1 = { dot: 'Balance', title: o.t1, html: o.h1,
      ops: [W(0.2), WR(I(1)), W(0.7), CL(I(1) + '.k-c', 'hl-orange ul-orange zoom'), W(0.9), WR(I(2)), W(0.5),
        AR('i1', I(1) + '.k-c', I(2) + '.k-s1', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 60 }),
        AR('i2', I(1) + '.k-c', I(2) + '.k-s2', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 100 }), W(0.5),
        PAR([FL('i1', o.chip, 'purple'), FL('i2', o.chip, 'purple')]), CLR, CL([I(2) + '.k-s1', I(2) + '.k-s2'], 'hl-purple zoom'), W(0.9),
        CL([I(2) + '.k-s2b', I(2) + '.k-s2'], 'strike'), W(0.8), WR(I(3))] };
    const solveOps = o.divide
      ? [CL(I(3) + '.k-ax', 'hl-orange ul-orange zoom'), W(0.8), WR(I(4)), W(0.4), AR('v', I(3) + '.k-ax', I(4) + '.k-dv', 'orange', { from: 'bottom', to: 'top', side: 'right', bend: 70 }), W(0.5), FL('v', o.divChip, 'orange'), CLR, CL(I(4) + '.k-dv', 'hl-orange zoom')]
      : [CL(I(3) + '.k-xr', 'hl-orange ul-orange zoom'), W(0.8), WR(I(4)), W(0.4), AR('v', I(3) + '.k-xr', I(4) + '.k-xl', 'orange', { from: 'bottom', to: 'top', side: 'right', bend: 60 }), W(0.5), FL('v', 'x', 'orange'), CLR, CL(I(4) + '.k-xl', 'hl-orange zoom')];
    const step2 = { dot: 'Solve', title: o.t2, html: o.h2, ops: [W(0.2)].concat(solveOps, [W(0.9), WR(I(5)), CL(I(5) + '.k-res', 'hl-green zoom')]) };
    return { rows, steps: [step1, step2] };
  }

  const ih = (plus, lin) => ({
    t1: 'Inverse · undo the constant on both sides',
    h1: `Write <b>y</b> for the result. To get x alone, <b class="p">${plus}</b> on <b>both</b> sides: the balance is kept, and on the right the constant cancels.`,
    t2: lin ? 'Inverse · divide, then rename y as x' : 'Inverse · swap sides, then rename y as x',
    h2: lin ? 'Divide both sides by the number that multiplies x, then read the result as a function of x: that is the inverse.' : 'Now x is alone. Rename y as x to write the inverse function.'
  });
  const invRows = (P, s, hideAt, k, o) => inv(P, s, Object.assign({ hideAt, divide: false, n1: 'put y for the result', n3: 'the constants cancel', n4: 'x alone', n5: 'rename y as x' }, ih(o.act, o.divide), o, { divide: !!o.divide }));

  /* Q4 (a): f=x+5, g=x-4 */
  (function () {
    const A = comp('a', 0, { out: 'f', in: 'g', outRow: 'f', inRow: 'g', inVal: 'x-4', valPlain: 'x − 4', rulePlain: 'x + 5',
      ruleX: `${C('k-rb', 'x')}+5`, replaced: `${C('k-br', `(x${C('k-m4', '-4')})`)}+${C('k-p5', '5')}`, note3: 'f adds 5 to its input',
      h3: 'f adds 5 to its input: f(g(x)) = <b>(x − 4) + 5</b>.' });
    const B = comp('b', 5, { out: 'g', in: 'f', outRow: 'g', inRow: 'f', inVal: 'x+5', valPlain: 'x + 5', rulePlain: 'x − 4',
      ruleX: `${C('k-rb', 'x')}-4`, replaced: `${C('k-br', `(x${C('k-m5', '+5')})`)}${C('k-m4', '-4')}`, note3: 'g subtracts 4 from its input',
      h3: 'g subtracts 4 from its input: g(f(x)) = <b>(x + 5) − 4</b>.' });
    hide(A.rows, 5); hide(B.rows, 10);
    const I = invRows('i', 10, undefined, 0, { act: 'subtract 1', divide: false, chip: '−1',
      r1: `y=x+${C('k-c', '1')}`, r2: `y${C('k-s1', '-1')}=x${C('k-s2b', '+1')}${C('k-s2', '-1')}`, r3: `y-1=${C('k-xr', 'x')}`, r4: `${C('k-xl', 'x')}=y-1`,
      r5: `(f\\circ g)^{-1}(x)=${C('k-res', 'x-1')}`, n2: 'subtract 1 from both sides' });
    const rows = [given('f', 'f(x)', 'x+5', 'f: the outer function'), given('g', 'g(x)', 'x-4', 'g: the inner function'), ...A.rows,
      { id: 'E1', first: 4, hideAt: 5, final: 1, tex: { 4: `=x+${C('k-one', '1')}` }, note: '−4 + 5 = +1' }, SUM('sum1', 5, 'f(g(x))=x+1', 'f(g(x)) is done'), ...B.rows,
      { id: 'E2', first: 9, hideAt: 10, final: 1, tex: { 9: `=x+${C('k-one', '1')}` }, note: '+5 − 4 = +1' }, SUM('sum2', 10, 'g(f(x))=x+1', 'g(f(x)) is done: the same function'), ...I.rows];
    const comb = (n, cP, E, a, b, la, lb) => ({ dot: 'Combine', title: `Step ${n} · Combine the numbers`,
      html: `The numbers <b class="p">${la}</b> and <b class="p">${lb}</b> are combined: they add up to <b class="g">+1</b>.`,
      ops: [W(0.2), CL([cP + '.' + a, cP + '.' + b], 'hl-purple zoom'), W(0.9), WR(E),
        AR('c1', cP + '.' + a, E + '.k-one', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 60 }),
        AR('c2', cP + '.' + b, E + '.k-one', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 100 }), W(0.5),
        PAR([FL('c1', la, 'purple'), FL('c2', lb, 'purple')]), CLR, CL(E + '.k-one', 'hl-green zoom')] });
    const steps = [...A.steps, comb(5, 'a3', 'E1', 'k-m4', 'k-p5', '−4', '+5'), ...B.steps, comb(10, 'b3', 'E2', 'k-m5', 'k-m4', '+5', '−4'), ...I.steps];
    NS.register({ id: 'inv4a', q: 'Q4 (a)', given: 'f(x)=x+5,\\ g(x)=x-4\\ \\Rightarrow\\ (f\\circ g)^{-1},\\ (g\\circ f)^{-1}', rows, steps });
  })();

  /* Q4 (b): f=2x+7, g=2x */
  (function () {
    const A = comp('a', 0, { out: 'f', in: 'g', outRow: 'f', inRow: 'g', inVal: '2x', valPlain: '2x', rulePlain: '2x + 7',
      ruleX: `2${C('k-rb', 'x')}+7`, replaced: `${C('k-m1', '2')}${C('k-br', '(2x)')}+7`, note3: 'f doubles its input, then adds 7',
      h3: 'f doubles its input and adds 7: f(g(x)) = <b>2(2x) + 7</b>.' });
    const B = comp('b', 5, { out: 'g', in: 'f', outRow: 'g', inRow: 'f', inVal: '2x+7', valPlain: '2x + 7', rulePlain: '2x',
      ruleX: `2${C('k-rb', 'x')}`, replaced: `${C('k-m1', '2')}${C('k-br', '(2x+7)')}`, note3: 'g doubles its input',
      h3: 'g doubles its input, so the whole bracket is doubled: g(f(x)) = <b>2(2x + 7)</b>.' });
    hide(A.rows, 5); hide(B.rows, 10);
    const I1 = invRows('i', 10, 12, 0, { act: 'subtract 7', divide: true, chip: '−7', divChip: '÷ 4',
      r1: `y=4x+${C('k-c', '7')}`, r2: `y${C('k-s1', '-7')}=4x${C('k-s2b', '+7')}${C('k-s2', '-7')}`, r3: `y-7=${C('k-ax', '4x')}`,
      r4: `x=\\frac{y-7}{${C('k-dv', '4')}}`, r5: `(f\\circ g)^{-1}(x)=${C('k-res', '\\frac{x-7}{4}')}`, n1: 'put y for f(g(x))', n2: 'subtract 7 from both sides', n4: 'divide both sides by 4' });
    const I2 = invRows('j', 12, undefined, 0, { act: 'subtract 14', divide: true, chip: '−14', divChip: '÷ 4',
      r1: `y=4x+${C('k-c', '14')}`, r2: `y${C('k-s1', '-14')}=4x${C('k-s2b', '+14')}${C('k-s2', '-14')}`, r3: `y-14=${C('k-ax', '4x')}`,
      r4: `x=\\frac{y-14}{${C('k-dv', '4')}}`, r5: `(g\\circ f)^{-1}(x)=${C('k-res', '\\frac{x-14}{4}')}`, n1: 'put y for g(f(x))', n2: 'subtract 14 from both sides', n4: 'divide both sides by 4' });
    const rows = [given('f', 'f(x)', '2x+7', 'f: the outer function'), given('g', 'g(x)', '2x', 'g: the inner function'), ...A.rows,
      { id: 'E1', first: 4, hideAt: 5, final: 1, tex: { 4: `=${C('k-r', '4x')}+7` }, note: '2 × 2x = 4x' }, SUM('sum1', 5, 'f(g(x))=4x+7', 'f(g(x)) is done'), ...B.rows,
      { id: 'E2', first: 9, hideAt: 10, final: 1, tex: { 9: `=${C('k-d1', '4x')}+${C('k-d2', '14')}` }, note: '2 × 2x = 4x and 2 × 7 = 14' }, SUM('sum2', 10, 'g(f(x))=4x+14', 'g(f(x)) is done'), ...I1.rows, ...I2.rows];
    rows.find(r => r.id === 'sum1').hideAt = 12;
    const steps = [...A.steps,
      { dot: 'Multiply', title: 'Step 5 · Multiply the numbers',
        html: 'The <b class="p">2</b> multiplies the <b class="p">2x</b> inside the bracket: 2 × 2x = <b class="g">4x</b>. The +7 stays.',
        ops: [W(0.2), CL(['a3.k-m1', 'a3.k-br'], 'hl-purple zoom'), W(0.9), WR('E1'),
          AR('c1', 'a3.k-m1', 'E1.k-r', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 60 }), AR('c2', 'a3.k-br', 'E1.k-r', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 100 }), W(0.5),
          PAR([FL('c1', '2', 'purple'), FL('c2', '2x', 'purple')]), CLR, CL('E1.k-r', 'hl-green zoom')] },
      ...B.steps,
      { dot: 'Expand', title: 'Step 10 · Multiply out the bracket',
        html: 'The <b class="p">2</b> multiplies <b>every term</b> inside the bracket: 2 × 2x = <b class="g">4x</b> and 2 × 7 = <b class="g">14</b>.',
        ops: [W(0.2), CL('b3.k-m1', 'hl-purple zoom'), W(0.9), WR('E2'),
          AR('d1', 'b3.k-m1', 'E2.k-d1', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 60 }), AR('d2', 'b3.k-m1', 'E2.k-d2', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 100 }), W(0.9),
          CL(['E2.k-d1', 'E2.k-d2'], 'hl-green zoom')] },
      ...I1.steps, ...I2.steps];
    NS.register({ id: 'inv4b', q: 'Q4 (b)', given: 'f(x)=2x+7,\\ g(x)=2x\\ \\Rightarrow\\ (f\\circ g)^{-1},\\ (g\\circ f)^{-1}', rows, steps });
  })();

  /* Q4 (c): f=2(x-4), g=(x+5)/2 */
  (function () {
    const A = comp('a', 0, { out: 'f', in: 'g', outRow: 'f', inRow: 'g', inVal: '\\frac{x+5}{2}', valPlain: '(x + 5)/2', rulePlain: '2(x − 4)',
      ruleX: `2(${C('k-rb', 'x')}-4)`, replaced: `${C('k-m1', '2')}\\left(${C('k-br', '\\frac{x+5}{2}')}-4\\right)`, note3: 'f takes 4 away, then doubles',
      h3: 'f subtracts 4 and then doubles: f(g(x)) = <b>2((x + 5)/2 − 4)</b>.' });
    const B = comp('b', 6, { out: 'g', in: 'f', outRow: 'g', inRow: 'f', inVal: '2(x-4)', valPlain: '2(x − 4)', rulePlain: '(x + 5)/2',
      ruleX: `\\frac{${C('k-rb', 'x')}+5}{2}`, replaced: `\\frac{${C('k-br', '2(x-4)')}+5}{2}`, note3: 'g adds 5, then halves',
      h3: 'g adds 5 and halves: g(f(x)) = <b>(2(x − 4) + 5)/2</b>.' });
    hide(A.rows, 6); hide(B.rows, 12);
    const I1 = invRows('i', 12, 14, 0, { act: 'add 3', divide: false, chip: '+3',
      r1: `y=x${C('k-c', '-3')}`, r2: `y${C('k-s1', '+3')}=x${C('k-s2b', '-3')}${C('k-s2', '+3')}`, r3: `y+3=${C('k-xr', 'x')}`, r4: `${C('k-xl', 'x')}=y+3`,
      r5: `(f\\circ g)^{-1}(x)=${C('k-res', 'x+3')}`, n1: 'put y for f(g(x))', n2: 'add 3 to both sides' });
    const I2 = invRows('j', 14, undefined, 0, { act: 'add 3/2', divide: false, chip: '+3/2',
      r1: `y=x${C('k-c', '-\\frac{3}{2}')}`, r2: `y${C('k-s1', '+\\frac{3}{2}')}=x${C('k-s2b', '-\\frac{3}{2}')}${C('k-s2', '+\\frac{3}{2}')}`, r3: `y+\\frac{3}{2}=${C('k-xr', 'x')}`, r4: `${C('k-xl', 'x')}=y+\\frac{3}{2}`,
      r5: `(g\\circ f)^{-1}(x)=${C('k-res', 'x+\\frac{3}{2}')}`, n1: 'put y for g(f(x))', n2: 'add 3/2 to both sides' });
    const rows = [given('f', 'f(x)', '2(x-4)', 'f: the outer function'), given('g', 'g(x)', '\\frac{x+5}{2}', 'g: the inner function'), ...A.rows,
      { id: 'E1', first: 4, hideAt: 6, tex: { 4: `=${C('k-d1', `${C('k-two', '2')}\\cdot\\frac{x+5}{${C('k-den', '2')}}`)}-${C('k-d2', '2\\cdot 4')}` }, note: 'the 2 multiplies both terms' },
      { id: 'E2', first: 5, hideAt: 6, tex: { 5: `=${C('k-xp', 'x+5')}-${C('k-e8', '8')}` }, note: 'the 2s cancel' },
      { id: 'E3', first: 5, hideAt: 6, final: 1, tex: { 5: `=x${C('k-m3', '-3')}` }, note: '5 − 8 = −3' }, SUM('sum1', 6, 'f(g(x))=x-3', 'f(g(x)) is done'), ...B.rows,
      { id: 'F1', first: 10, hideAt: 12, tex: { 10: `=\\frac{2x${C('k-m8', '-8')}${C('k-p5', '+5')}}{2}` }, note: '2(x − 4) = 2x − 8' },
      { id: 'F2', first: 11, hideAt: 12, tex: { 11: `=\\frac{2x${C('k-m3', '-3')}}{2}` }, note: '−8 + 5 = −3' },
      { id: 'F3', first: 11, hideAt: 12, tex: { 11: `=\\frac{${C('k-n3', '2')}x}{${C('k-d3', '2')}}-\\frac{3}{2}` }, note: 'split the fraction' },
      { id: 'F4', first: 11, hideAt: 12, final: 1, tex: { 11: `=x-\\frac{3}{2}` }, note: '2x/2 = x' }, SUM('sum2', 12, 'g(f(x))=x-\\frac{3}{2}', 'g(f(x)) is done'), ...I1.rows, ...I2.rows];
    rows.find(r => r.id === 'sum1').hideAt = 14;
    const steps = [...A.steps,
      { dot: 'Distribute', title: 'Step 5 · Multiply the 2 through the bracket',
        html: 'The <b class="p">2</b> multiplies <b>both</b> terms in the bracket: 2 × (x + 5)/2 and 2 × 4.',
        ops: [W(0.2), CL('a3.k-m1', 'hl-purple ul-orange zoom'), W(0.9), WR('E1'), W(0.4),
          AR('d1', 'a3.k-m1', 'E1.k-d1', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 60 }), AR('d2', 'a3.k-m1', 'E1.k-d2', 'purple', { from: 'bottom', to: 'top', side: 'right', bend: 100 }), W(0.9),
          CL(['E1.k-d1', 'E1.k-d2'], 'hl-purple zoom')] },
      { dot: 'Cancel', title: 'Step 6 · Cancel the 2s and combine',
        html: 'In 2 × (x + 5)/2 the multiplier <b class="o">2</b> and the denominator <b class="o">2</b> cancel, leaving x + 5. Then 5 − 8 = <b class="g">−3</b>: f(g(x)) = x − 3.',
        ops: [W(0.2), CL(['E1.k-two', 'E1.k-den'], 'hl-orange zoom'), W(1), CL(['E1.k-two', 'E1.k-den'], 'strike'), W(0.7), WR('E2'), W(0.7),
          CL(['E2.k-xp', 'E2.k-e8'], 'hl-purple zoom'), W(0.9), WR('E3'), CL('E3.k-m3', 'hl-green zoom')] },
      ...B.steps,
      { dot: 'Expand', title: 'Step 11 · Expand the top',
        html: 'In the top, 2(x − 4) = <b class="p">2x − 8</b>. Then the top is 2x − 8 + 5.',
        ops: [W(0.2), CL('b3.k-br', 'hl-purple zoom'), W(0.9), WR('F1'), CL(['F1.k-m8', 'F1.k-p5'], 'hl-purple zoom')] },
      { dot: 'Simplify', title: 'Step 12 · Combine, split and cancel',
        html: '−8 + 5 = <b class="g">−3</b>, so the top is 2x − 3. Split into 2x/2 − 3/2; the <b class="o">2</b>s in 2x/2 cancel: g(f(x)) = x − 3/2.',
        ops: [W(0.2), CL(['F1.k-m8', 'F1.k-p5'], 'hl-purple pulse'), W(0.6), WR('F2'), W(0.9), WR('F3'), W(0.8), CL(['F3.k-n3', 'F3.k-d3'], 'hl-orange zoom'), W(1), CL(['F3.k-n3', 'F3.k-d3'], 'strike'), W(0.7), WR('F4')] },
      ...I1.steps, ...I2.steps];
    NS.register({ id: 'inv4c', q: 'Q4 (c)', given: 'f(x)=2(x-4),\\ g(x)=\\frac{x+5}{2}\\ \\Rightarrow\\ (f\\circ g)^{-1},\\ (g\\circ f)^{-1}', rows, steps });
  })();

  /* Q4 (d): f=(x+4)/2, g=2x-4 */
  (function () {
    const A = comp('a', 0, { out: 'f', in: 'g', outRow: 'f', inRow: 'g', inVal: '2x-4', valPlain: '2x − 4', rulePlain: '(x + 4)/2',
      ruleX: `\\frac{${C('k-rb', 'x')}+4}{2}`, replaced: `\\frac{${C('k-br', '(2x-4)')}+4}{2}`, note3: 'f adds 4, then halves',
      h3: 'f adds 4 and halves: f(g(x)) = <b>((2x − 4) + 4)/2</b>.' });
    const B = comp('b', 6, { out: 'g', in: 'f', outRow: 'g', inRow: 'f', inVal: '\\frac{x+4}{2}', valPlain: '(x + 4)/2', rulePlain: '2x − 4',
      ruleX: `2${C('k-rb', 'x')}-4`, replaced: `${C('k-m1', '2')}${C('k-br', '\\left(\\frac{x+4}{2}\\right)')}-4`, note3: 'g doubles, then subtracts 4',
      h3: 'g doubles its input and subtracts 4: g(f(x)) = <b>2((x + 4)/2) − 4</b>.' });
    hide(A.rows, 6); hide(B.rows, 12);
    const rows = [given('f', 'f(x)', '\\frac{x+4}{2}', 'f: the outer function'), given('g', 'g(x)', '2x-4', 'g: the inner function'), ...A.rows,
      { id: 'E1', first: 4, hideAt: 6, tex: { 4: `=\\frac{2x${C('k-m4', '-4')}${C('k-p4', '+4')}}{2}` }, note: 'remove the brackets' },
      { id: 'E2', first: 4, hideAt: 6, tex: { 4: `=\\frac{${C('k-n2', '2')}x}{${C('k-d2', '2')}}` }, note: '−4 + 4 = 0' },
      { id: 'E3', first: 5, hideAt: 6, final: 1, tex: { 5: '=x' }, note: 'the 2s cancel' }, SUM('sum1', 6, 'f(g(x))=x', 'f(g(x)) is done'), ...B.rows,
      { id: 'F1', first: 10, hideAt: 12, tex: { 10: `=\\frac{${C('k-n2', '2')}(x+4)}{${C('k-d2', '2')}}-4` }, note: '2 times a fraction over 2' },
      { id: 'F2', first: 10, hideAt: 12, tex: { 10: `=x${C('k-p4', '+4')}${C('k-m4', '-4')}` }, note: 'the 2s cancel' },
      { id: 'F3', first: 11, hideAt: 12, final: 1, tex: { 11: '=x' }, note: '+4 − 4 = 0' }, SUM('sum2', 12, 'g(f(x))=x', 'g(f(x)) is done'),
      { id: 'i1', first: 12, tex: { 12: 'y=x' }, note: 'put y for the result' },
      { id: 'i2', first: 12, tex: { 12: 'x=y' }, note: 'swap the sides' },
      { id: 'i3', first: 12, final: 1, tex: { 12: `(f\\circ g)^{-1}(x)=(g\\circ f)^{-1}(x)=${C('k-res', 'x')}` }, note: 'rename y as x' }];
    const steps = [...A.steps,
      { dot: 'Brackets', title: 'Step 5 · Remove the brackets, cancel −4 + 4',
        html: 'Remove the brackets: 2x − 4 + 4. The <b class="p">−4</b> and <b class="p">+4</b> cancel (their sum is 0), leaving 2x over 2.',
        ops: [W(0.2), CL('a3.k-br', 'hl-purple zoom'), W(0.9), WR('E1'), W(0.9), CL(['E1.k-m4', 'E1.k-p4'], 'hl-purple zoom'), W(0.9), CL(['E1.k-m4', 'E1.k-p4'], 'strike'), W(0.7), WR('E2')] },
      { dot: 'Cancel', title: 'Step 6 · Cancel the 2s',
        html: 'The <b class="o">2</b> in 2x and the denominator <b class="o">2</b> cancel (a common factor of the top and the bottom): f(g(x)) = <b class="g">x</b>.',
        ops: [W(0.2), CL(['E2.k-n2', 'E2.k-d2'], 'hl-orange zoom'), W(1), CL(['E2.k-n2', 'E2.k-d2'], 'strike'), W(0.7), WR('E3')] },
      ...B.steps,
      { dot: 'Cancel', title: 'Step 11 · Cancel the 2s',
        html: 'In 2 × (x + 4)/2 the multiplier <b class="o">2</b> and the denominator <b class="o">2</b> cancel, leaving x + 4. So g(f(x)) = x + 4 − 4.',
        ops: [W(0.2), WR('F1'), W(0.7), CL(['F1.k-n2', 'F1.k-d2'], 'hl-orange zoom'), W(1), CL(['F1.k-n2', 'F1.k-d2'], 'strike'), W(0.7), WR('F2')] },
      { dot: 'Combine', title: 'Step 12 · Cancel +4 − 4',
        html: '+4 and −4 add to 0, so g(f(x)) = <b class="g">x</b>.',
        ops: [W(0.2), CL(['F2.k-p4', 'F2.k-m4'], 'hl-purple zoom'), W(0.9), CL(['F2.k-p4', 'F2.k-m4'], 'strike'), W(0.7), WR('F3')] },
      { dot: 'Inverse', title: 'Inverse · both compositions are the identity',
        html: 'Both f(g(x)) and g(f(x)) equal <b>x</b>. Put y = x; swapping the sides gives x = y; renaming gives <b class="g">x</b>. So both inverses are the identity function x.',
        ops: [W(0.2), WR('i1'), W(0.9), WR('i2'), W(0.9), WR('i3'), CL('i3.k-res', 'hl-green zoom')] }];
    NS.register({ id: 'inv4d', q: 'Q4 (d)', given: 'f(x)=\\frac{x+4}{2},\\ g(x)=2x-4\\ \\Rightarrow\\ (f\\circ g)^{-1},\\ (g\\circ f)^{-1}', rows, steps });
  })();
})(window);
