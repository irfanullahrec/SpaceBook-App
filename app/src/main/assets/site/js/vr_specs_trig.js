/* Visual-reasoning specs with the unit circle: Class 10 Mathematics, Introduction to Trigonometry.
 *  - signs of trigonometric ratios and their quadrants (sin 105 deg, tan(-5pi/6), sec 1030 deg, cot 710 deg)
 *  - the other ratios from one ratio and the quadrant: tan = 1 (I), tan = -2/3 (II), cos = 4/5 (IV)
 * Every statement the book makes (signs, ratios) is checked numerically against the angle when the spec is built;
 * a spec whose numbers do not agree with the unit circle is not registered. */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.register || !NS.compile) return;
  const W = t => ({ o: 'wait', t }), WR = r => ({ o: 'write', r }), LY = (r, i, f) => ({ o: 'layer', r, i, f });
  const RAD = Math.PI / 180, TR = { sin: Math.sin, cos: Math.cos, tan: Math.tan, cot: x => 1 / Math.tan(x), sec: x => 1 / Math.cos(x), csc: x => 1 / Math.sin(x) };
  const warn = id => { if (root.console) console.warn('vr: trig spec ' + id + ' disagrees with the unit circle'); };

  /* ---------- signs and quadrants ---------- */
  (function () {
    const parts = [
      { ratio: 'sin', deg: 105, sign: 1, quad: 'II', cot: null, row: '\\sin105^\\circ>0', html: '105° is in quadrant II (between 90° and 180°): <b class="g">sin 105° is positive</b>.' },
      { ratio: 'tan', deg: 210, sign: 1, quad: 'III', cot: '-\\frac{5\\pi}{6}+2\\pi=\\frac{7\\pi}{6}=210^\\circ', row: '\\tan\\left(-\\frac{5\\pi}{6}\\right)>0', html: '−5π/6 is coterminal with 7π/6 (add a full turn): that is 210°, in quadrant III. <b class="g">Tangent is positive</b> there.' },
      { ratio: 'sec', deg: 310, sign: 1, quad: 'IV', cot: '1030^\\circ-2(360^\\circ)=310^\\circ', row: '\\sec1030^\\circ>0', html: '1030° is coterminal with 310° (subtract two full turns), in quadrant IV: <b class="g">secant is positive</b>.' },
      { ratio: 'cot', deg: 350, sign: -1, quad: 'IV', cot: '710^\\circ-360^\\circ=350^\\circ', row: '\\cot710^\\circ<0', html: '710° is coterminal with 350° (subtract one full turn), in quadrant IV: <b class="r">cotangent is negative</b>.' }
    ];
    for (const p of parts) { const v = TR[p.ratio](p.deg * RAD); if ((v > 0 ? 1 : -1) !== p.sign) return warn('trig_signs'); }
    const layers = parts.map((p, k) => ({ at: k, type: 'sweep', deg: p.deg, ratio: p.ratio, from: k ? parts[k - 1].deg : 0 }));
    const rows = [{ id: 'c', first: 0, viz: { kind: 'circle', quadrants: true, w: 400, h: 230, alt: 'Unit circle showing the quadrant of each angle', layers }, tex: { 0: '' }, note: '' }];
    const steps = parts.map((p, k) => {
      rows.push({ id: 'k' + k, first: k, hideAt: k + 2, tex: { [k]: p.cot || ('105^\\circ\\ \\text{is in quadrant II}') }, note: p.cot ? 'the same position on the circle' : 'between 90° and 180°' });
      rows.push({ id: 's' + k, first: k, final: 1, tex: { [k]: p.row + '\\ \\ (\\text{' + p.quad + '})' }, note: p.sign > 0 ? 'positive' : 'negative' });
      return { dot: ['(i)', '(ii)', '(iii)', '(iv)'][k], title: 'Part ' + ['(i)', '(ii)', '(iii)', '(iv)'][k], html: p.html,
        ops: [W(0.2)].concat(k === 0 ? [WR('c'), W(0.3)] : [], [WR('k' + k), W(0.6), LY('c', k), W(0.4), WR('s' + k)]) };
    });
    NS.register({ id: 'trig_signs', q: 'Q', given: '\\text{signs of the ratios and their quadrants}', rows, steps });
  })();

  /* ---------- the other ratios from one ratio and the quadrant ---------- */
  function ratios(id, p) {
    const th = ((Math.atan2(p.y, p.x) / RAD) + 360) % 360;
    for (const k of Object.keys(p.expect)) { const book = NS.compile(p.expect[k]); if (!book || Math.abs(book({}) - TR[k](th * RAD)) > 1e-9) return warn(id); }
    const layers = [{ at: 0, type: 'xyr', x: p.x, y: p.y, xText: p.xText, yText: p.yText, rText: p.rText }, { at: 1, type: 'sweep', deg: th, from: 0 }];
    const rows = [
      { id: 'c', first: 0, viz: { kind: 'circle', quadrants: true, w: 400, h: 230, alt: 'Unit circle with the point and its right triangle', layers }, tex: { 0: '' }, note: '' },
      { id: 'gv', first: 0, hideAt: 2, tex: { 0: p.given }, note: 'what we know' },
      { id: 'rr', first: 0, hideAt: 2, tex: { 0: p.rrow }, note: p.rnote },
      ...p.s1.map((t, i) => ({ id: 'a' + i, first: 1, tex: { 1: t }, note: i === 0 ? 'ratios from x, y and r' : '' })),
      ...p.s2.map((t, i) => ({ id: 'b' + i, first: 2, final: i === p.s2.length - 1 ? 1 : 0, tex: { 2: t }, note: i === 0 ? 'the reciprocal ratios' : '' }))
    ];
    const steps = [
      { dot: 'Given', title: 'Step 1 · The point and its triangle', html: p.h0, ops: [W(0.2), WR('c'), W(0.3), WR('gv'), W(0.5), LY('c', 0), W(0.5), WR('rr')] },
      { dot: 'Ratios', title: 'Step 2 · ' + p.t1, html: p.h1, ops: [W(0.2)].concat(p.s1.reduce((o, t, i) => o.concat([WR('a' + i), W(0.5)]), []), [LY('c', 1)]) },
      { dot: 'Reciprocals', title: 'Step 3 · The reciprocal ratios', html: p.h2, ops: [W(0.2)].concat(p.s2.reduce((o, t, i) => o.concat([WR('b' + i), W(0.5)]), [])) }
    ];
    NS.register({ id, q: 'Q', given: p.given, rows, steps });
  }
  ratios('trig_tan1', { x: 1, y: 1, xText: '1', yText: '1', rText: '√2', expect: { sin: '1/sqrt(2)', cos: '1/sqrt(2)', cot: '1', csc: 'sqrt(2)', sec: 'sqrt(2)' },
    given: '\\tan\\theta=1,\\ \\text{quadrant I}\\ \\Rightarrow\\ x=1,\\ y=1', rrow: 'r=\\sqrt{1^2+1^2}=\\sqrt{2}', rnote: 'the hypotenuse',
    s1: ['\\sin\\theta=\\frac{y}{r}=\\frac{1}{\\sqrt{2}}', '\\cos\\theta=\\frac{x}{r}=\\frac{1}{\\sqrt{2}}', '\\cot\\theta=\\frac{x}{y}=1'], s2: ['\\csc\\theta=\\frac{r}{y}=\\sqrt{2}', '\\sec\\theta=\\frac{r}{x}=\\sqrt{2}'],
    h0: 'tan θ = y/x = 1/1, so take <b>x = 1, y = 1</b> in quadrant I. The right triangle with legs x and y has hypotenuse <b>r = √(1² + 1²) = √2</b>.',
    t1: 'Sine, cosine and cotangent', h1: 'sin θ = y/r, cos θ = x/r and cot θ = x/y. The point on the unit circle is the same triangle scaled to r = 1 (θ = 45°).', h2: 'The reciprocals: cosec θ = r/y and sec θ = r/x.' });
  ratios('trig_tan23', { x: -3, y: 2, xText: '−3', yText: '2', rText: '√13', expect: { sin: '2/sqrt(13)', cos: '-3/sqrt(13)', cot: '-3/2', csc: 'sqrt(13)/2', sec: '-sqrt(13)/3' },
    given: '\\tan\\theta=-\\frac{2}{3},\\ \\text{quadrant II}\\ \\Rightarrow\\ y=2,\\ x=-3', rrow: 'r=\\sqrt{9+4}=\\sqrt{13}', rnote: 'the hypotenuse',
    s1: ['\\sin\\theta=\\frac{y}{r}=\\frac{2}{\\sqrt{13}}', '\\cos\\theta=\\frac{x}{r}=-\\frac{3}{\\sqrt{13}}', '\\cot\\theta=\\frac{x}{y}=-\\frac{3}{2}'], s2: ['\\csc\\theta=\\frac{r}{y}=\\frac{\\sqrt{13}}{2}', '\\sec\\theta=\\frac{r}{x}=-\\frac{\\sqrt{13}}{3}'],
    h0: 'tan θ = y/x = −2/3 and θ is in quadrant II, where x is negative and y positive: <b>y = 2, x = −3</b>. Then <b>r = √(9 + 4) = √13</b>.',
    t1: 'Sine, cosine and cotangent', h1: 'sin θ = y/r = 2/√13 (positive), cos θ = x/r = −3/√13 (negative), cot θ = x/y = −3/2. The signs match quadrant II.', h2: 'The reciprocals: cosec θ = r/y = √13/2 and sec θ = r/x = −√13/3.' });
  ratios('trig_cos45', { x: 4, y: -3, xText: '4', yText: '−3', rText: '5', expect: { sin: '-3/5', tan: '-3/4', cot: '-4/3', sec: '5/4', csc: '-5/3' },
    given: '\\cos\\theta=\\frac{4}{5},\\ \\text{quadrant IV}\\ \\Rightarrow\\ x=4,\\ r=5', rrow: 'y^2=25-16=9\\ \\Rightarrow\\ y=-3', rnote: 'y is negative in quadrant IV',
    s1: ['\\sin\\theta=\\frac{y}{r}=-\\frac{3}{5}', '\\tan\\theta=\\frac{y}{x}=-\\frac{3}{4}', '\\cot\\theta=\\frac{x}{y}=-\\frac{4}{3}'], s2: ['\\sec\\theta=\\frac{r}{x}=\\frac{5}{4}', '\\csc\\theta=\\frac{r}{y}=-\\frac{5}{3}'],
    h0: 'cos θ = x/r = 4/5, so <b>x = 4 and r = 5</b>. Then y² = 25 − 16 = 9, so y = ±3; in quadrant IV y is negative: <b>y = −3</b>.',
    t1: 'Sine, tangent and cotangent', h1: 'sin θ = y/r = −3/5, tan θ = y/x = −3/4 and cot θ = x/y = −4/3.', h2: 'The reciprocals: sec θ = r/x = 5/4 and cosec θ = r/y = −5/3.' });

  NS.rules = (NS.rules || []).concat([
    { test: /^Find the signs of the following ratios and state their quadrants/, vr: 'trig_signs' },
    { test: /^If tanθ=1 and θ is in quadrant I, find the other trigonometric ratios/, vr: 'trig_tan1' },
    { test: /^Given tanθ=−2\/3 and θ in quadrant II, find the other trigonometric ratios/, vr: 'trig_tan23' },
    { test: /^If cosθ=4\/5 and θ is in quadrant IV, find the other trigonometric ratios/, vr: 'trig_cos45' }
  ]);
})(window);
