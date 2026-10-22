/* Visual-reasoning specs with graphs: Class 12 Mathematics, Unit 2, Exercise 2.1, Q2 "Draw the graphs of the following functions"
 * (a) 2|x-3|  (b) 4|x-3|+3  (c) 5|3x+7|-2  (d) 2|4x+3|+1.  The vertex, branch slopes, plotted points and ranges are the ones in the
 * verified solution (js/math_12_data.js); the board only draws them. */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.register) return;
  const W = t => ({ o: 'wait', t }), WR = r => ({ o: 'write', r }), LY = (r, i, f) => ({ o: 'layer', r, i, f }), CL = (at, c) => ({ o: 'cls', at, c });

  function absGraph(id, q, p) {
    const layers = [
      { at: 0, type: 'plot', fn: 'abs(x)', faint: true, label: 'y = |x|', color: 'grey' },
      { at: 1, type: 'morph', morphFrom: 'abs(x)', fn: p.fn, color: 'blue', label: p.label },
      { at: 2, type: 'plot', fn: p.fn, to: p.vx, color: 'orange' },
      { at: 2, type: 'plot', fn: p.fn, from: p.vx, color: 'blue' },
      { at: 2, type: 'point', x: p.vx, y: p.vy, label: p.vlabel, color: 'orange', dx: p.vdx || 8, dy: p.vdy || 16 }
    ];
    p.pts.forEach(pt => layers.push({ at: 3, type: 'point', x: pt[0], y: pt[1], label: '(' + pt[2] + ', ' + pt[1] + ')', color: 'green', dx: pt[3] === undefined ? 7 : pt[3] }));
    const gcfg = Object.assign({ kind: 'graph', w: 400, h: 240, alt: 'Graph of y = ' + p.label + ' with its vertex and plotted points', layers }, p.win);
    const rows = [
      { id: 'f', first: 0, tex: { 0: 'y=' + p.tex }, note: 'the function to draw' },
      { id: 'g', first: 0, viz: gcfg, tex: { 0: '' }, note: '' },
      { id: 'v', first: 1, tex: { 1: p.vrow }, note: 'where the V turns' },
      { id: 'vt', first: 2, tex: { 2: '\\text{vertex }' + p.vtex }, note: 'the lowest point' },
      { id: 'sl', first: 2, tex: { 2: '\\text{slopes: }\\mathord{}' + p.slopes }, note: 'left branch down, right branch up' },
      ...p.ptrows.map((t, k) => ({ id: 'p' + k, first: 3, tex: { 3: t }, note: k === 1 ? 'the vertex again' : 'a point on the graph' })),
      { id: 'd', first: 4, tex: { 4: '\\text{Domain: }\\mathbb{R}' }, note: 'every real x can be used' },
      { id: 'r', first: 4, final: 1, tex: { 4: '\\text{Range: }' + p.range }, note: 'the graph never goes below the vertex' }
    ];
    const steps = [
      { dot: 'Start', title: 'Step 1 · Start from y = |x|',
        html: 'The simplest V-shaped graph is <b>y = |x|</b> (dashed). The function ' + p.html + ' is built from it by shifting and stretching.',
        ops: [W(0.2), WR('f'), W(0.5), WR('g'), W(0.3), LY('g', 0)] },
      { dot: 'Shift', title: 'Step 2 · Shift and stretch',
        html: p.shiftHtml,
        ops: [W(0.2), WR('v'), W(0.6), LY('g', 1, 1.6)] },
      { dot: 'Vertex', title: 'Step 3 · Vertex and branches',
        html: 'The vertex is <b class="o">' + p.vplain + '</b>. The left branch has slope <b class="o">' + p.sl[0] + '</b> and the right branch slope <b class="b">' + p.sl[1] + '</b>.',
        ops: [W(0.2), WR('vt'), W(0.4), LY('g', 2), LY('g', 3), W(0.3), LY('g', 4), W(0.3), WR('sl')] },
      { dot: 'Points', title: 'Step 4 · Plot points',
        html: 'Substitute chosen x values to find points: ' + p.pointsHtml,
        ops: [W(0.2)].concat(p.ptrows.reduce((o, t, k) => o.concat([WR('p' + k), W(0.3), LY('g', 5 + k), W(0.4)]), [])) },
      { dot: 'Range', title: 'Step 5 · Domain and range',
        html: 'The graph is defined for every real x, and it opens upward from the vertex, so its y-values start at <b class="g">' + p.rangeHtml + '</b>.',
        ops: [W(0.2), WR('d'), W(0.6), WR('r')] }
    ];
    NS.register({ id, q, given: 'y=' + p.tex + '\\ \\text{(graph)}', rows, steps });
  }

  absGraph('graph21a', 'Q2 (a)', {
    tex: '2|x-3|', fn: '2*abs(x-3)', label: '2|x−3|', html: '<b>2|x − 3|</b>', vx: 3, vy: 0, vlabel: '(3, 0)', vtex: '(3,\\,0)', vplain: '(3, 0)',
    vrow: 'x-3=0\\ \\Rightarrow\\ x=3', slopes: '-2\\ \\text{and}\\ 2', sl: ['−2', '2'],
    shiftHtml: 'x − 3 = 0 gives x = 3, so the V moves <b>3 to the right</b>. The factor <b>2</b> makes both branches twice as steep.',
    pts: [[0, 6, '0'], [3, 0, '3'], [6, 6, '6']], ptrows: ['x=0:\\ y=2|0-3|=6', 'x=3:\\ y=2|3-3|=0', 'x=6:\\ y=2|6-3|=6'], pointsHtml: '(0, 6), (3, 0), (6, 6).',
    range: '[0,\\infty)', rangeHtml: '[0, ∞)', win: { xmin: -2, xmax: 8, ymin: -2, ymax: 10 }
  });
  absGraph('graph21b', 'Q2 (b)', {
    tex: '4|x-3|+3', fn: '4*abs(x-3)+3', label: '4|x−3|+3', html: '<b>4|x − 3| + 3</b>', vx: 3, vy: 3, vlabel: '(3, 3)', vtex: '(3,\\,3)', vplain: '(3, 3)',
    vrow: 'x-3=0\\ \\Rightarrow\\ x=3', slopes: '-4\\ \\text{and}\\ 4', sl: ['−4', '4'], vdx: 8, vdy: 18,
    shiftHtml: 'x − 3 = 0 gives x = 3 (<b>3 to the right</b>); the factor <b>4</b> makes the branches steeper; the <b>+3</b> lifts the whole graph up by 3.',
    pts: [[0, 15, '0'], [3, 3, '3'], [6, 15, '6']], ptrows: ['x=0:\\ y=4|0-3|+3=15', 'x=3:\\ y=4|0|+3=3', 'x=6:\\ y=4|6-3|+3=15'], pointsHtml: '(0, 15), (3, 3), (6, 15).',
    range: '[3,\\infty)', rangeHtml: '[3, ∞)', win: { xmin: -2, xmax: 8, ymin: -2, ymax: 18 }
  });
  absGraph('graph21c', 'Q2 (c)', {
    tex: '5|3x+7|-2', fn: '5*abs(3*x+7)-2', label: '5|3x+7|−2', html: '<b>5|3x + 7| − 2</b>', vx: -7 / 3, vy: -2, vlabel: '(−7/3, −2)', vtex: '\\left(-\\frac{7}{3},\\,-2\\right)', vplain: '(−7/3, −2)',
    vrow: '3x+7=0\\ \\Rightarrow\\ x=-\\frac{7}{3}', slopes: '-15\\ \\text{and}\\ 15', sl: ['−15', '15'], vdx: 8, vdy: 16,
    shiftHtml: '3x + 7 = 0 gives x = −7/3, where the V turns. The branches have slope ±5·3 = ±15 and the <b>−2</b> moves the graph down by 2.',
    pts: [[-3, 8, '−3', -8], [-7 / 3, -2, '−7/3'], [-2, 3, '−2']], ptrows: ['x=-3:\\ y=5|3(-3)+7|-2=8', 'x=-\\frac{7}{3}:\\ y=5|0|-2=-2', 'x=-2:\\ y=5|3(-2)+7|-2=3'], pointsHtml: '(−3, 8), (−7/3, −2), (−2, 3).',
    range: '[-2,\\infty)', rangeHtml: '[−2, ∞)', win: { xmin: -5, xmax: 2, ymin: -4, ymax: 12 }
  });
  absGraph('graph21d', 'Q2 (d)', {
    tex: '2|4x+3|+1', fn: '2*abs(4*x+3)+1', label: '2|4x+3|+1', html: '<b>2|4x + 3| + 1</b>', vx: -3 / 4, vy: 1, vlabel: '(−3/4, 1)', vtex: '\\left(-\\frac{3}{4},\\,1\\right)', vplain: '(−3/4, 1)',
    vrow: '4x+3=0\\ \\Rightarrow\\ x=-\\frac{3}{4}', slopes: '-8\\ \\text{and}\\ 8', sl: ['−8', '8'], vdx: 8, vdy: 18,
    shiftHtml: '4x + 3 = 0 gives x = −3/4, where the V turns. The branches have slope ±2·4 = ±8 and the <b>+1</b> lifts the graph up by 1.',
    pts: [[-1, 3, '−1', -8], [-3 / 4, 1, '−3/4'], [0, 7, '0']], ptrows: ['x=-1:\\ y=2|4(-1)+3|+1=3', 'x=-\\frac{3}{4}:\\ y=2|0|+1=1', 'x=0:\\ y=2|4(0)+3|+1=7'], pointsHtml: '(−1, 3), (−3/4, 1), (0, 7).',
    range: '[1,\\infty)', rangeHtml: '[1, ∞)', win: { xmin: -3, xmax: 2, ymin: -2, ymax: 9 }
  });
})(window);
