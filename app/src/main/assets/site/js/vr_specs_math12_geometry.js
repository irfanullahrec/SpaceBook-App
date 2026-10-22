/* Visual-reasoning specs with graphs: Class 12 Mathematics
 *  - Unit 3, Exercise 3.2: tangent line to a curve at a point (a)-(d): the curve, the point, the slope as the slope of the curve, the line.
 *  - Unit 8/9 Conics: parabolas y^2 = 8x, x^2 = 2y, y^2 = -3(x+1), (y-3)^2 = x: vertex, focus, directrix, axis, latus rectum.
 * Values are the ones in the verified solutions (js/math_12_data.js); the tangent's slope on the board is computed from the curve and
 * is checked against the book's m when the spec is built (a spec that does not agree is not registered). */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.register || !NS.compile) return;
  const W = t => ({ o: 'wait', t }), WR = r => ({ o: 'write', r }), LY = (r, i, f) => ({ o: 'layer', r, i, f });

  /* ---------- tangent line ---------- */
  function tangent(id, q, p) {
    const f = NS.compile(p.fn); if (!f) return;
    const h = 1e-5, num = (f({ x: p.a + h }) - f({ x: p.a - h })) / (2 * h);
    if (Math.abs(num - p.m) > 1e-3 || Math.abs(f({ x: p.a }) - p.y0) > 1e-9) { if (root.console) console.warn('vr: tangent spec ' + id + ' disagrees with the book'); return; }
    const gcfg = Object.assign({ kind: 'graph', w: 400, h: 240, alt: 'Graph of f(x) = ' + p.label + ' with its tangent line at ' + p.plabel, layers: [
      { at: 0, type: 'plot', fn: p.fn, color: 'blue', label: 'f' },
      { at: 1, type: 'point', x: p.a, y: p.y0, label: p.plabel, color: 'orange', dx: 8, dy: -9 },
      { at: 2, type: 'tangent', fn: p.fn, x0: p.a, color: 'orange', label: 'slope', xfrom: p.xfrom }
    ] }, p.win);
    const rows = [
      { id: 'f', first: 0, tex: { 0: 'f(x)=' + p.tex }, note: 'the curve' },
      { id: 'g', first: 0, viz: gcfg, tex: { 0: '' }, note: '' },
      { id: 'fa', first: 1, tex: { 1: p.fa }, note: 'the point on the curve' },
      { id: 'der', first: 2, tex: { 2: p.der }, note: 'the slope rule' },
      { id: 'sl', first: 2, tex: { 2: p.sl }, note: 'the slope at the point' },
      { id: 'pt', first: 3, tex: { 3: p.pt }, note: 'point-slope form' },
      { id: 'fin', first: 3, final: 1, tex: { 3: p.fin }, note: 'the tangent line' }
    ];
    if (p.dom) rows.push({ id: 'dom', first: 3, tex: { 3: p.dom }, note: p.domNote });
    const steps = [
      { dot: 'Curve', title: 'Step 1 · The curve', html: 'Draw the curve <b>f(x) = ' + p.html + '</b>. A tangent line touches the curve at one chosen point and has the same slope there.',
        ops: [W(0.2), WR('f'), W(0.4), WR('g'), W(0.3), LY('g', 0)] },
      { dot: 'Point', title: 'Step 2 · The point', html: 'Find the point of tangency: <b>' + p.plabel + '</b>. It is on the curve.',
        ops: [W(0.2), WR('fa'), W(0.6), LY('g', 1)] },
      { dot: 'Slope', title: 'Step 3 · The slope', html: 'The slope of the tangent is the derivative at the point: <b class="o">m = f′(' + p.aText + ') = ' + p.mText + '</b>. Watch the point slide along the curve: at the point of tangency the line has exactly that slope.',
        ops: [W(0.2), WR('der'), W(0.7), WR('sl'), W(0.5), LY('g', 2, 1.6)] },
      { dot: 'Line', title: 'Step 4 · The tangent line', html: 'Use <b>y − y₁ = m(x − x₁)</b> with the point and the slope: ' + p.finHtml + (p.domHtml || ''),
        ops: [W(0.2), WR('pt'), W(0.8), WR('fin')].concat(p.dom ? [W(0.5), WR('dom')] : []) }
    ];
    NS.register({ id, q, given: 'f(x)=' + p.tex + '\\ \\Rightarrow\\ \\text{tangent at }' + p.plabelTex, rows, steps });
  }
  tangent('tan32a', 'Q (a)', { fn: '3*x-7', tex: '3x-7', label: '3x − 7', html: '3x − 7', a: 3, y0: 2, m: 3, aText: '3', mText: '3', plabel: '(3, 2)', plabelTex: '(3,2)',
    fa: 'f(3)=3(3)-7=2', der: "f'(x)=3", sl: "m=f'(3)=3", pt: 'y-2=3(x-3)', fin: 'y=3x-7', finHtml: 'y − 2 = 3(x − 3), so <b class="g">y = 3x − 7</b> (the line is its own tangent).',
    win: { xmin: -1, xmax: 6, ymin: -8, ymax: 8 } });
  tangent('tan32b', 'Q (b)', { fn: 'x^3', tex: 'x^3', label: 'x³', html: 'x³', a: -0.5, y0: -0.125, m: 0.75, aText: '−1/2', mText: '3/4', plabel: '(−1/2, −1/8)', plabelTex: '\\left(-\\frac12,-\\frac18\\right)',
    fa: 'f\\left(-\\frac12\\right)=\\left(-\\frac12\\right)^3=-\\frac18', der: "f'(x)=3x^2", sl: "m=3\\left(-\\frac12\\right)^2=\\frac34", pt: 'y+\\frac18=\\frac34\\left(x+\\frac12\\right)', fin: 'y=\\frac{3x}{4}+\\frac14',
    finHtml: 'y + 1/8 = (3/4)(x + 1/2), so <b class="g">y = 3x/4 + 1/4</b>, or 3x − 4y + 1 = 0.', win: { xmin: -2, xmax: 2, ymin: -3, ymax: 3 } });
  tangent('tan32c', 'Q (c)', { fn: '1/(x+3)', tex: '\\frac{1}{x+3}', label: '1/(x+3)', html: '1/(x + 3)', a: 2, y0: 0.2, m: -0.04, aText: '2', mText: '−1/25', plabel: '(2, 1/5)', plabelTex: '\\left(2,\\frac15\\right)',
    fa: 'f(2)=\\frac{1}{2+3}=\\frac15', der: "f'(x)=-\\frac{1}{(x+3)^2}", sl: "m=f'(2)=-\\frac{1}{25}", pt: 'y-\\frac15=-\\frac{1}{25}(x-2)', fin: 'x+25y-7=0',
    finHtml: 'y − 1/5 = −(x − 2)/25, so <b class="g">x + 25y − 7 = 0</b>.', dom: 'x\\neq -3', domNote: 'f is not defined at x = −3', domHtml: ' The curve is not defined at <b class="r">x = −3</b>.',
    win: { xmin: -2.5, xmax: 6, ymin: -1, ymax: 3 } });
  tangent('tan32d', 'Q (d)', { fn: 'x/(x-2)', tex: '\\frac{x}{x-2}', label: 'x/(x−2)', html: 'x/(x − 2)', a: 3, y0: 3, m: -2, aText: '3', mText: '−2', plabel: '(3, 3)', plabelTex: '(3,3)',
    fa: 'f(3)=\\frac{3}{3-2}=3', der: "f'(x)=\\frac{(x-2)-x}{(x-2)^2}=\\frac{-2}{(x-2)^2}", sl: "m=f'(3)=-2", pt: 'y-3=-2(x-3)', fin: 'y=-2x+9',
    finHtml: 'y − 3 = −2(x − 3), so <b class="g">y = −2x + 9</b>.', dom: 'x\\neq 2', domNote: 'f is not defined at x = 2', domHtml: ' The curve is not defined at <b class="r">x = 2</b>.',
    win: { xmin: 0, xmax: 6, ymin: -4, ymax: 10 }, xfrom: 2.4 });

  /* ---------- parabola ---------- */
  const tx = v => { const n = Math.abs(v), s = v < 0 ? '-' : ''; if (Math.abs(n - Math.round(n)) < 1e-9) return s + Math.round(n); for (let d = 2; d <= 16; d++) { const a = Math.round(n * d); if (Math.abs(a / d - n) < 1e-9) return s + '\\frac{' + a + '}{' + d + '}'; } return String(v); };
  const tt = v => { const n = Math.abs(v), s = v < 0 ? '−' : ''; if (Math.abs(n - Math.round(n)) < 1e-9) return s + Math.round(n); for (let d = 2; d <= 16; d++) { const a = Math.round(n * d); if (Math.abs(a / d - n) < 1e-9) return s + a + '/' + d; } return String(v); };
  function parabola(id, q, c) {
    const { h, k, p, hor } = c, P2 = 2 * Math.abs(p);
    const V = [h, k], F = hor ? [h + p, k] : [h, k + p], D = hor ? h - p : k - p;
    const E1 = hor ? [h + p, k + P2] : [h + P2, k + p], E2 = hor ? [h + p, k - P2] : [h - P2, k + p];
    const xs = [V[0], F[0], E1[0], E2[0]].concat(hor ? [D] : []), ys = [V[1], F[1], E1[1], E2[1]].concat(hor ? [] : [D]);
    let xmin = Math.min.apply(null, xs), xmax = Math.max.apply(null, xs), ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);
    const span = Math.max(xmax - xmin, ymax - ymin, 3) * 0.55; xmin -= span; xmax += span; ymin -= span * 0.8; ymax += span * 0.8;
    const T = Math.max(Math.abs(hor ? ymax - k : xmax - h), Math.abs(hor ? ymin - k : xmin - h)) + 1;
    const lab = pt => '(' + tt(pt[0]) + ', ' + tt(pt[1]) + ')', texpt = pt => '(' + tx(pt[0]) + ',\\,' + tx(pt[1]) + ')';
    const layers = [
      hor ? { at: 1, type: 'param', fx: `${h}+(t-${k})^2/${4 * p}`.replace(/\+\(/, '+('), fy: 't', t0: k - T, t1: k + T, color: 'blue', label: c.curveLabel }
        : { at: 1, type: 'param', fx: 't', fy: `${k}+(t-${h})^2/${4 * p}`, t0: h - T, t1: h + T, color: 'blue', label: c.curveLabel },
      { at: 2, type: 'point', x: V[0], y: V[1], label: 'V ' + lab(V), color: 'orange', dx: 8, dy: hor ? 16 : 16 },
      { at: 2, type: 'point', x: F[0], y: F[1], label: 'F ' + lab(F), color: 'green', dx: 8, dy: -9 },
      hor ? { at: 3, type: 'seg', x1: D, y1: ymin, x2: D, y2: ymax, color: 'purple', dash: 1, label: 'directrix' } : { at: 3, type: 'seg', x1: xmin, y1: D, x2: xmax, y2: D, color: 'purple', dash: 1, label: 'directrix' },
      hor ? { at: 3, type: 'seg', x1: xmin, y1: k, x2: xmax, y2: k, color: 'grey', dash: 1, label: 'axis' } : { at: 3, type: 'seg', x1: h, y1: ymin, x2: h, y2: ymax, color: 'grey', dash: 1, label: 'axis' },
      { at: 4, type: 'point', x: E1[0], y: E1[1], label: lab(E1), color: 'red', dx: 7, dy: -7 },
      { at: 4, type: 'point', x: E2[0], y: E2[1], label: lab(E2), color: 'red', dx: 7, dy: 14 },
      { at: 4, type: 'seg', x1: E1[0], y1: E1[1], x2: E2[0], y2: E2[1], color: 'red' }
    ];
    // the curve must pass through the points the book states
    const fx = NS.compile(layers[0].fx), fy = NS.compile(layers[0].fy);
    const onCurve = pt => { for (let t = layers[0].t0; t <= layers[0].t1; t += (layers[0].t1 - layers[0].t0) / 4000) { if (Math.hypot(fx({ t }) - pt[0], fy({ t }) - pt[1]) < 0.02) return true; } return false; };
    if (![V, E1, E2].every(onCurve)) { if (root.console) console.warn('vr: parabola spec ' + id + ' is inconsistent'); return; }
    const gcfg = { kind: 'graph', w: 400, h: 260, xmin, xmax, ymin, ymax, alt: 'Parabola ' + c.plain + ' with vertex, focus, directrix, axis and latus rectum', layers };
    const rows = [
      { id: 'eq', first: 0, tex: { 0: c.eq }, note: 'the parabola' },
      { id: 'cmp', first: 0, tex: { 0: c.cmp }, note: 'compare with the standard form' },
      { id: 'g', first: 1, viz: gcfg, tex: { 1: '' }, note: '' },
      { id: 'op', first: 1, tex: { 1: c.open }, note: 'direction of opening' },
      { id: 'v', first: 2, tex: { 2: '\\text{vertex }' + texpt(V) }, note: 'the turning point' },
      { id: 'fo', first: 2, tex: { 2: '\\text{focus }' + texpt(F) }, note: p > 0 ? 'inside the curve' : 'inside the curve' },
      { id: 'dr', first: 3, tex: { 3: '\\text{directrix }' + c.dir }, note: 'a line outside the curve' },
      { id: 'ax', first: 3, tex: { 3: '\\text{axis }' + c.axis }, note: 'the line of symmetry' },
      { id: 'l1', first: 4, tex: { 4: '\\text{latus rectum ends }' + texpt(E1) + ',\\ ' + texpt(E2) }, note: 'the chord through the focus, perpendicular to the axis' },
      { id: 'l2', first: 4, final: 1, tex: { 4: '\\text{length }=' + tx(2 * P2) }, note: '|4p|' }
    ];
    const steps = [
      { dot: 'Form', title: 'Step 1 · Standard form', html: c.formHtml, ops: [W(0.2), WR('eq'), W(0.6), WR('cmp')] },
      { dot: 'Open', title: 'Step 2 · Which way does it open?', html: c.openHtml, ops: [W(0.2), WR('op'), W(0.5), WR('g'), W(0.3), LY('g', 0, 1.6)] },
      { dot: 'V and F', title: 'Step 3 · Vertex and focus', html: 'The vertex is <b class="o">' + lab(V) + '</b>. The focus lies a distance |p| = ' + tt(Math.abs(p)) + ' from it, inside the curve: <b class="g">' + lab(F) + '</b>.', ops: [W(0.2), WR('v'), W(0.3), LY('g', 1), W(0.3), WR('fo'), W(0.3), LY('g', 2)] },
      { dot: 'Directrix', title: 'Step 4 · Directrix and axis', html: 'The directrix is the line ' + c.dirHtml + ', the same distance |p| from the vertex on the other side. The axis ' + c.axisHtml + ' is the line of symmetry.', ops: [W(0.2), WR('dr'), W(0.3), LY('g', 3), W(0.3), WR('ax'), W(0.3), LY('g', 4)] },
      { dot: 'Latus', title: 'Step 5 · Latus rectum', html: 'The latus rectum is the chord through the focus perpendicular to the axis. Its endpoints are ' + lab(E1) + ' and ' + lab(E2) + ', so its length is |4p| = ' + tt(2 * P2) + '.', ops: [W(0.2), WR('l1'), W(0.3), LY('g', 5), LY('g', 6), W(0.2), LY('g', 7), W(0.3), WR('l2')] }
    ];
    NS.register({ id, q, given: c.eq, rows, steps });
  }
  parabola('par_y2_8x', 'Graph y² − 8x = 0', { h: 0, k: 0, p: 2, hor: true, plain: 'y² = 8x', curveLabel: 'y²=8x',
    eq: 'y^2-8x=0\\ \\Rightarrow\\ y^2=8x', cmp: 'y^2=4px\\ \\Rightarrow\\ 4p=8,\\ p=2', open: 'p>0\\ \\Rightarrow\\ \\text{opens right}', dir: 'x=-2', axis: 'y=0',
    formHtml: 'Rewrite as <b>y² = 8x</b> and compare with the standard form <b>y² = 4px</b>: 4p = 8, so p = 2.', openHtml: 'p = 2 &gt; 0, so the parabola <b>opens to the right</b> (y² = 4px opens towards positive x when p &gt; 0).', dirHtml: '<b>x = −2</b>', axisHtml: '<b>y = 0</b>' });
  parabola('par_x2_2y', 'Sketch x² = 2y', { h: 0, k: 0, p: 0.5, hor: false, plain: 'x² = 2y', curveLabel: 'x²=2y',
    eq: 'x^2=2y', cmp: 'x^2=4py\\ \\Rightarrow\\ h=k=0,\\ 4p=2,\\ p=\\frac12', open: 'p>0\\ \\Rightarrow\\ \\text{opens upward}', dir: 'y=-\\frac12', axis: 'x=0',
    formHtml: 'Compare <b>x² = 2y</b> with (x − h)² = 4p(y − k): h = k = 0 and 4p = 2, so p = 1/2.', openHtml: 'p = 1/2 &gt; 0, so the parabola <b>opens upward</b> (vertical axis).', dirHtml: '<b>y = −1/2</b>', axisHtml: '<b>x = 0</b>' });
  parabola('par_y2_m3', 'Sketch y² = −3(x + 1)', { h: -1, k: 0, p: -0.75, hor: true, plain: 'y² = −3(x+1)', curveLabel: 'y²=−3(x+1)',
    eq: 'y^2=-3(x+1)', cmp: '(y-0)^2=4p(x+1)\\ \\Rightarrow\\ h=-1,\\ k=0,\\ 4p=-3,\\ p=-\\frac34', open: 'p<0\\ \\Rightarrow\\ \\text{opens left}', dir: 'x=-\\frac14', axis: 'y=0',
    formHtml: 'Compare <b>y² = −3(x + 1)</b> with (y − k)² = 4p(x − h): h = −1, k = 0 and 4p = −3, so p = −3/4.', openHtml: 'p = −3/4 &lt; 0, so the parabola <b>opens to the left</b>.', dirHtml: '<b>x = −1/4</b>', axisHtml: '<b>y = 0</b>' });
  parabola('par_y3_x', 'Sketch (y − 3)² = x', { h: 0, k: 3, p: 0.25, hor: true, plain: '(y−3)² = x', curveLabel: '(y−3)²=x',
    eq: '(y-3)^2=x', cmp: '(y-3)^2=4p(x-0)\\ \\Rightarrow\\ h=0,\\ k=3,\\ 4p=1,\\ p=\\frac14', open: 'p>0\\ \\Rightarrow\\ \\text{opens right}', dir: 'x=-\\frac14', axis: 'y=3',
    formHtml: 'Compare <b>(y − 3)² = x</b> with (y − k)² = 4p(x − h): h = 0, k = 3 and 4p = 1, so p = 1/4.', openHtml: 'p = 1/4 &gt; 0, so the parabola <b>opens to the right</b>.', dirHtml: '<b>x = −1/4</b>', axisHtml: '<b>y = 3</b>' });

  /* which book questions show these boards (matched on the question text; no change to the data files) */
  NS.rules = (NS.rules || []).concat([
    { test: /equation of a tangent line to the graph of the function at the particular point/i, vr: [{ label: '(a)', id: 'tan32a' }, { label: '(b)', id: 'tan32b' }, { label: '(c)', id: 'tan32c' }, { label: '(d)', id: 'tan32d' }] },
    { test: /^Graph y²−8x = 0 and identify vertex, focus, directrix/, vr: 'par_y2_8x' },
    { test: /^Use definite integral to find out the area between the curve f\(x\) and the x-axis/, vr: [{ label: '(a)', id: 'area61a' }, { label: '(b)', id: 'area61b' }, { label: '(c)', id: 'area61c' }, { label: '(d)', id: 'area61d' }] },
    { test: /sketch the parabola, indicate vertex, focus, latus-rectum endpoints and axis: \(a\) x²=2y/, vr: [{ label: '(a)', id: 'par_x2_2y' }, { label: '(b)', id: 'par_y2_m3' }, { label: '(c)', id: 'par_y3_x' }] }
  ]);
})(window);
