/* Visual-reasoning specs: Class 12 Mathematics, Unit 6, Exercise 6.1, Q3 "area between the curve f(x) and the x-axis over [a, b]".
 * The curve, interval, sign changes, primitives and areas are the ones in the verified solution; the area of every piece is recomputed
 * numerically (Simpson) when the spec is built and a spec that does not agree with the book's total is not registered. */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.register || !NS.compile) return;
  const W = t => ({ o: 'wait', t }), WR = r => ({ o: 'write', r }), LY = (r, i, f) => ({ o: 'layer', r, i, f });
  const tx = v => { const n = Math.abs(v), s = v < 0 ? '-' : ''; if (Math.abs(n - Math.round(n)) < 1e-9) return s + Math.round(n); for (let d = 2; d <= 16; d++) { const a = Math.round(n * d); if (Math.abs(a / d - n) < 1e-9) return s + '\\frac{' + a + '}{' + d + '}'; } return String(v); };
  const tt = v => { const n = Math.abs(v), s = v < 0 ? '−' : ''; if (Math.abs(n - Math.round(n)) < 1e-9) return s + Math.round(n); for (let d = 2; d <= 16; d++) { const a = Math.round(n * d); if (Math.abs(a / d - n) < 1e-9) return s + a + '/' + d; } return String(v); };

  function area(id, p) {
    const f = NS.compile(p.fn); if (!f) return;
    const simpson = (a, b) => { const n = 400, h = (b - a) / n; let I = 0; for (let k = 0; k <= n; k++) I += (k === 0 || k === n ? 1 : k % 2 ? 4 : 2) * Math.abs(f({ x: a + k * h })); return I * h / 3; };
    const bounds = [p.a].concat(p.roots, [p.b]), pieces = [];
    for (let i = 0; i + 1 < bounds.length; i++) { const lo = bounds[i], hi = bounds[i + 1], mid = f({ x: (lo + hi) / 2 }); pieces.push({ lo, hi, v: simpson(lo, hi), pos: mid >= 0 }); }
    const total = pieces.reduce((s, q) => s + q.v, 0);
    if (Math.abs(total - p.total) > 1e-6 || p.roots.some(r => Math.abs(f({ x: r })) > 1e-9)) { if (root.console) console.warn('vr: area spec ' + id + ' disagrees with the book'); return; }
    const span = p.b - p.a, xmin = p.a - span * 0.35, xmax = p.b + span * 0.35;
    const ys = []; for (let k = 0; k <= 80; k++) ys.push(f({ x: xmin + (xmax - xmin) * k / 80 }));
    const lo = Math.min(0, ...ys), hi = Math.max(0, ...ys), pad = (hi - lo) * 0.18;
    const layers = [
      { at: 0, type: 'plot', fn: p.fn, color: 'blue', label: 'f' },
      { at: 0, type: 'seg', x1: p.a, y1: 0, x2: p.a, y2: f({ x: p.a }), color: 'grey', dash: 1, label: 'x = ' + tt(p.a) },
      { at: 0, type: 'seg', x1: p.b, y1: 0, x2: p.b, y2: f({ x: p.b }), color: 'grey', dash: 1, label: 'x = ' + tt(p.b) }
    ];
    p.roots.forEach(r => layers.push({ at: 1, type: 'point', x: r, y: 0, label: 'x = ' + tt(r), color: 'orange', dx: 6, dy: 16 }));
    pieces.forEach(q => layers.push({ at: 2, type: 'shade', fn: p.fn, a: q.lo, b: q.hi, color: q.pos ? 'green' : 'orange' }));
    const gcfg = { kind: 'graph', w: 400, h: 240, xmin, xmax, ymin: lo - pad, ymax: hi + pad, alt: 'Area between ' + p.label + ' and the x-axis from ' + tt(p.a) + ' to ' + tt(p.b), layers };
    const rows = [
      { id: 'f', first: 0, tex: { 0: 'f(x)=' + p.tex + ',\\quad [' + tx(p.a) + ',\\,' + tx(p.b) + ']' }, note: 'the curve and the interval' },
      { id: 'g', first: 0, viz: gcfg, tex: { 0: '' }, note: '' },
      { id: 'aa', first: 0, tex: { 0: '\\text{Area}=\\int_{' + tx(p.a) + '}^{' + tx(p.b) + '}|f(x)|\\,dx' }, note: 'geometric area is never negative' }
    ];
    if (p.roots.length) rows.push({ id: 'rt', first: 1, tex: { 1: p.rootTex }, note: 'the curve crosses the x-axis' });
    rows.push({ id: 'F', first: 1, tex: { 1: 'F(x)=' + p.F }, note: 'a primitive of f' });
    pieces.forEach((q, k) => rows.push({ id: 'q' + k, first: 2, tex: { 2: (q.pos ? '' : '-') + '\\left[F(' + tx(q.hi) + ')-F(' + tx(q.lo) + ')\\right]=' + tx(q.v) }, note: (q.pos ? 'above' : 'below') + ' the x-axis on [' + tt(q.lo) + ', ' + tt(q.hi) + ']' }));
    rows.push({ id: 'tt', first: 3, final: 1, tex: { 3: '\\text{Area}=' + pieces.map(q => tx(q.v)).join('+') + '=' + tx(total) + '\\ \\text{square units}' }, note: 'the total area' });
    const steps = [
      { dot: 'Curve', title: 'Step 1 · The curve and the interval', html: 'Area between the curve and the x-axis over [' + tt(p.a) + ', ' + tt(p.b) + ']. Geometric area is the integral of |f(x)|, so any part of the curve <b>below</b> the x-axis counts as positive area.',
        ops: [W(0.2), WR('f'), W(0.4), WR('g'), W(0.3), LY('g', 0), LY('g', 1), LY('g', 2), W(0.4), WR('aa')] },
      { dot: 'Roots', title: 'Step 2 · Where does it cross the x-axis?', html: p.rootHtml + ' A primitive is <b>F(x) = ' + p.Fplain + '</b>.',
        ops: [W(0.2)].concat(p.roots.length ? [WR('rt'), W(0.4)].concat(p.roots.map((r, k) => LY('g', 3 + k))) : [], [W(0.3), WR('F')]) },
      { dot: 'Pieces', title: 'Step 3 · The area of each piece', html: 'Green pieces lie above the x-axis (area = F(hi) − F(lo)); orange pieces lie below it (area = −[F(hi) − F(lo)]).',
        ops: [W(0.2)].concat(pieces.reduce((o, q, k) => o.concat([WR('q' + k), W(0.3), LY('g', 3 + p.roots.length + k, 1.2), W(0.4)]), [])) },
      { dot: 'Total', title: 'Step 4 · Add the pieces', html: 'Total area = ' + pieces.map(q => tt(q.v)).join(' + ') + ' = <b class="g">' + tt(total) + ' square units</b>.', ops: [W(0.2), WR('tt')] }
    ];
    NS.register({ id, q: 'Q', given: 'f(x)=' + p.tex + '\\ \\text{on }[' + tx(p.a) + ',' + tx(p.b) + ']', rows, steps });
  }
  area('area61a', { fn: '4-x^2', tex: '4-x^2', label: '4 − x²', a: 0, b: 3, roots: [2], total: 23 / 3, F: '4x-\\frac{x^3}{3}', Fplain: '4x − x³/3', rootTex: '4-x^2=0\\ \\Rightarrow\\ x=2', rootHtml: '4 − x² changes sign at x = 2 (inside [0, 3]), so split there.' });
  area('area61b', { fn: 'x^2-5*x+6', tex: 'x^2-5x+6', label: 'x² − 5x + 6', a: 0, b: 3, roots: [2], total: 29 / 6, F: '\\frac{x^3}{3}-\\frac{5x^2}{2}+6x', Fplain: 'x³/3 − 5x²/2 + 6x', rootTex: 'x^2-5x+6=(x-2)(x-3)\\ \\Rightarrow\\ x=2', rootHtml: 'x² − 5x + 6 = (x − 2)(x − 3): positive on [0, 2] and negative on [2, 3], so split at x = 2.' });
  area('area61c', { fn: 'x^2-6*x+8', tex: 'x^2-6x+8', label: 'x² − 6x + 8', a: 0, b: 4, roots: [2], total: 8, F: '\\frac{x^3}{3}-3x^2+8x', Fplain: 'x³/3 − 3x² + 8x', rootTex: 'x^2-6x+8=(x-2)(x-4)\\ \\Rightarrow\\ x=2', rootHtml: 'x² − 6x + 8 = (x − 2)(x − 4): positive on [0, 2], negative on [2, 4], so split at x = 2.' });
  area('area61d', { fn: '5*x-x^2', tex: '5x-x^2', label: '5x − x²', a: 1, b: 3, roots: [], total: 34 / 3, F: '\\frac{5x^2}{2}-\\frac{x^3}{3}', Fplain: '5x²/2 − x³/3', rootTex: '', rootHtml: '5x − x² = x(5 − x) is positive on [1, 3]: there is no sign change inside the interval, so no split.' });
})(window);
