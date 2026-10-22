/* Class 9 Mathematics, Unit 8 (Linear Graphs and their Applications): hand-written solutions with the graph drawn step by step on a coordinate board.
 * The questions were checked against the book's scanned pages (scan = printed page + 13); where the stored question differs from the book, both are solved and the difference is stated.
 * Every point, intersection and conversion value is computed here and checked. */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.sol) return;
  const warn = m => { if (root.console) console.warn('sol_m9_graph: ' + m); };
  const QS = ["Write the coordinates of the points A, B, C, and D shown in the graph.","Draw a line segment by joining the points (5, 7) and (−7, 9).","Draw a triangle ABC by joining the points A(5, 7), B(8, −3), and C(9, 4).","Draw a parallelogram OABC by joining the points O(0, 0), A(3, −4), B(1, −7), and C(−2, −3).","Join the points O(0, 0), A(5, 0), B(5, 5), C(0, 5) to draw a square.","Draw the graph from the table: (0, 4), (−1, 3), (5, 6), (7, 8), (−4, −5).","Draw the conversion graph for Miles and Kilometers (1 Mile = 1.60 Km).","Draw the conversion graph for Hectares and Acres (1 Hectare = 2.5 Acres).","Draw the conversion graph for Celsius to Fahrenheit using F = (9/5)C + 32.","Draw the conversion graph of US Dollars to Pakistani Rupees ($1 = Rs. 60).","Draw currency conversion graphs for USD to PKR and GBP to PKR.","Plot triangle ABC: A(−2, 3), B(4, 2), C(1, −3).","Plot parallelogram OABC: O(0, 0), A(1, 4), B(4, 2), C(3, −2).","Plot square OABC: O(0, 0), A(5, 0), B(5, 5), C(0, 5).","Plot rectangle vertices and join them.","Graph the equation x + y = 4.","Graph the equation y = x.","Plot given points on the Cartesian plane.","Solve the system graphically: x + y = 1 and x − y = 4."];
  const tx = (text, m) => ({ text, m });
  const f = (x, d) => String(+Number(x).toFixed(d === undefined ? 3 : d));
  const A = (n, steps, board) => { NS.sol.add({ q: QS[n], steps, board }); };
  const ok = (label, got, exp, tol) => { if (Math.abs(got - exp) > (tol === undefined ? 1e-9 : tol)) { warn(label + ': computed ' + got + ' but expected ' + exp); return false; } return true; };
  const fmt = v => (v < 0 ? '−' : '') + Math.abs(v);
  const pt = (p) => '(' + fmt(p[0]) + ', ' + fmt(p[1]) + ')';
  /* a coordinate board with every layer tied to a step number */
  function board(xmin, xmax, ymin, ymax, alt) {
    const cfg = { kind: 'graph', w: 420, h: 300, xmin, xmax, ymin, ymax, alt, layers: [] };
    const api = {
      cfg,
      pt(at, p, label, o) { o = o || {}; cfg.layers.push({ at, type: 'point', x: p[0], y: p[1], label: label === undefined ? pt(p) : label, color: o.color || 'blue', dx: o.dx, dy: o.dy }); return api; },
      seg(at, p, q, o) { o = o || {}; cfg.layers.push({ at, type: 'seg', x1: p[0], y1: p[1], x2: q[0], y2: q[1], color: o.color || 'orange', dash: o.dash, label: o.label }); return api; },
      fn(at, expr, o) { o = o || {}; cfg.layers.push({ at, type: 'plot', fn: expr, color: o.color || 'orange', from: o.from, to: o.to }); return api; },
      text(at, p, t, o) { cfg.layers.push({ at, type: 'text', x: p[0], y: p[1], text: t, color: (o && o.color) || 'green' }); return api; }
    };
    return api;
  }
  const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  const polygon = (b, at, V, o) => V.forEach((v, i) => b.seg(at, v, V[(i + 1) % V.length], o));
  const labels = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };

  /* ---------- Exercise 8.1 ---------- */
  (function () {
    const P = { A: [3, 2], B: [4, -2], C: [0, -3], D: [-3, 4] }, b = board(-6, 6, -6, 6, 'The points A, B, C, D read from the graph');
    Object.keys(P).forEach(k => b.pt(2, P[k], k + pt(P[k]), { dx: 6, dy: -6 }));
    A(0, ['The coordinates of a point are (x, y): x is the distance read along the horizontal axis (right is positive) and y the distance along the vertical axis (up is positive).',
      'For each point, read the x-value by going straight down or up to the x-axis, then the y-value by going straight across to the y-axis.',
      'A is 3 units right and 2 up: A(3, 2).  B is 4 right and 2 down: B(4, −2).  C is on the y-axis, 3 below the origin: C(0, −3).  D is 3 left and 4 up: D(−3, 4).',
      'These readings are the book’s printed answer for the figure of Exercise 8.1 Q5.'], b.cfg);
  })();

  (function () {
    const p = [5, 7], q = [-7, 9], b = board(-9, 8, -1, 11, 'Line segment joining (5, 7) and (−7, 9)'); b.pt(1, p, 'A' + pt(p), { dy: -8, dx: 4 }).pt(1, q, 'B' + pt(q), { dx: -30, dy: -8 }).seg(2, p, q).text(3, [-1, 8.9], 'length ≈ ' + f(dist(p, q), 2) + ' units', { color: 'green' });
    A(1, ['Draw the x-axis and y-axis. For A(5, 7): move 5 units right of the origin and 7 units up.', 'For B(−7, 9): move 7 units left and 9 units up.', 'Place the ruler on the two points and draw the straight segment AB.',
      tx('The length of the segment (distance formula):', 'AB=\\sqrt{(5-(-7))^{2}+(7-9)^{2}}=\\sqrt{144+4}=\\sqrt{148}\\approx ' + f(dist(p, q), 2))], b.cfg);
  })();

  (function () {
    const V = [[5, 7], [8, -3], [9, 4]], b = board(-1, 11, -5, 9, 'Triangle ABC'); V.forEach((v, i) => b.pt(1, v, labels[i] + pt(v), { dx: 4, dy: -8 })); polygon(b, 2, V);
    A(2, ['Draw the axes with a scale of 1 square = 1 unit.', 'Plot A(5, 7), B(8, −3) and C(9, 4): 5 right 7 up; 8 right 3 down; 9 right 4 up.', 'Join A to B, B to C and C to A with a ruler. The three segments enclose the triangle ABC.',
      tx('The sides (distance formula):', 'AB=\\sqrt{3^{2}+10^{2}}=\\sqrt{109},\\ BC=\\sqrt{1^{2}+7^{2}}=\\sqrt{50},\\ CA=\\sqrt{4^{2}+3^{2}}=5')], b.cfg);
  })();

  (function () {
    const V = [[0, 0], [3, -4], [1, -7], [-2, -3]], nm = ['O', 'A', 'B', 'C']; if (V[0][0] + V[2][0] !== V[1][0] + V[3][0] || V[0][1] + V[2][1] !== V[1][1] + V[3][1]) return;
    const b = board(-4, 5, -9, 2, 'Parallelogram OABC'); V.forEach((v, i) => b.pt(1, v, nm[i] + pt(v), { dx: 4, dy: i === 0 ? -8 : 12 })); polygon(b, 2, V); b.seg(3, V[0], V[2], { dash: true, color: 'green' }).seg(3, V[1], V[3], { dash: true, color: 'green' });
    A(3, ['Plot O(0, 0), A(3, −4), B(1, −7) and C(−2, −3).', 'Join O to A, A to B, B to C and C to O.',
      'Check that OABC is a parallelogram: its diagonals OB and AC must have the same midpoint.', tx('', '\\text{midpoint of }OB=\\left(\\frac{0+1}{2},\\frac{0-7}{2}\\right)=\\left(\\frac12,-\\frac72\\right),\\qquad \\text{midpoint of }AC=\\left(\\frac{3-2}{2},\\frac{-4-3}{2}\\right)=\\left(\\frac12,-\\frac72\\right)'),
      'The diagonals bisect each other, so OABC is a parallelogram (OA = CB = 5 and OC = AB = √13).'], b.cfg);
  })();

  (function () {
    const V = [[0, 0], [5, 0], [5, 5], [0, 5]], nm = ['O', 'A', 'B', 'C'], b = board(-1, 7, -1, 7, 'Square OABC of side 5'); V.forEach((v, i) => b.pt(1, v, nm[i] + pt(v), { dx: 4, dy: i < 2 ? 14 : -6 })); polygon(b, 2, V);
    A(4, ['Plot O(0, 0), A(5, 0), B(5, 5) and C(0, 5).', 'Join O → A → B → C → O.', tx('Each side has length 5 (for example OA = 5 along the x-axis and AB = 5 parallel to the y-axis):', 'OA=\\sqrt{5^{2}+0^{2}}=5,\\quad AB=5,\\quad BC=5,\\quad CO=5'),
      'All four sides are equal and the sides meet at right angles (OA lies on the x-axis, OC on the y-axis), so OABC is a square of side 5 units. Its diagonals are each 5√2.'], b.cfg);
  })();

  (function () {
    const V = [[0, 4], [-1, 3], [5, 6], [7, 8], [-4, -5]], b = board(-6, 9, -7, 10, 'The points from the table'); V.forEach((v, i) => b.pt(1, v, pt(v), { dx: 4, dy: -6 }));
    A(5, ['Write the pairs as a table of (x, y) values: (0, 4), (−1, 3), (5, 6), (7, 8) and (−4, −5).', 'Choose a scale of 1 square = 1 unit on both axes (the x-values run from −4 to 7 and the y-values from −5 to 8).', 'Plot each point: go along the x-axis by the first number, then up (or down) by the second number.',
      'The points are shown on the board. (No line is asked for: these are plotted points of a table.)'], b.cfg);
  })();

  /* ---------- Exercise 8.3: conversion graphs (values from the book's exercise) ---------- */
  (function () {
    const miles = [1, 3, 4, 5], km = miles.map(m => m * 1.6); if (!ok('8.3 Q1', km[1], 4.8) || !ok('8.3 Q1', km[3], 8)) return;
    const b = board(-1, 6.5, -1, 9.5, 'Conversion graph of miles to kilometres'); miles.forEach((m, i) => b.pt(1, [m, km[i]], '(' + m + ', ' + f(km[i], 1) + ')', { dx: 4, dy: -8 })); b.fn(2, '1.6*x', { from: 0, to: 6 });
    A(6, ['The conversion rule is 1 mile = 1.6 km, so kilometres = 1.6 × miles. The book asks for the distances 1, 3, 4 and 5 miles (Exercise 8.3 Q1).', tx('Table of values (miles, km):', 'y=1.6x:\\quad 1\\to1.6,\\ 3\\to4.8,\\ 4\\to6.4,\\ 5\\to8.0'),
      'Scale: 1 square = 1 mile along the x-axis and 1 square = 1 km along the y-axis. Plot (1, 1.6), (3, 4.8), (4, 6.4) and (5, 8).', 'The points lie on a straight line through the origin (0 miles = 0 km): join them with a ruler. Because y = 1.6x, the graph shows direct proportion.'], b.cfg);
  })();

  (function () {
    const H = [2, 4, 8], ac = H.map(h => h * 2.5); if (ac[2] !== 20) return;
    const b = board(-1, 9.5, -2, 23, 'Conversion graph of hectares to acres'); H.forEach((h, i) => b.pt(1, [h, ac[i]], '(' + h + ', ' + ac[i] + ')', { dx: 4, dy: -8 })); b.fn(2, '2.5*x', { from: 0, to: 9 });
    A(7, ['The conversion rule is 1 hectare = 2.5 acres, so acres = 2.5 × hectares. The book asks for 2, 4 and 8 hectares (Exercise 8.3 Q3).', tx('Table of values (hectares, acres):', 'y=2.5x:\\quad 2\\to5,\\ 4\\to10,\\ 8\\to20'),
      'Scale: 1 square = 1 hectare along the x-axis and 2 squares = 5 acres along the y-axis. Plot (2, 5), (4, 10) and (8, 20).', 'Join the points with a straight line through the origin: 0 hectares = 0 acres.'], b.cfg);
  })();

  (function () {
    const C = [0, 2, 3], F = C.map(c => 9 / 5 * c + 32); if (!ok('8.3 Q4', F[1], 35.6) || !ok('8.3 Q4', F[2], 37.4)) return;
    const b = board(-1, 5, 28, 40, 'Conversion graph of Celsius to Fahrenheit'); C.forEach((c, i) => b.pt(1, [c, F[i]], '(' + c + ', ' + f(F[i], 1) + ')', { dx: 4, dy: -8 })); b.fn(2, '1.8*x+32', { from: 0, to: 4.5 });
    A(8, ['The conversion formula is F = (9/5)C + 32. The book asks for C = 0, 2 and 3 (Exercise 8.3 Q4).', tx('C = 0:', 'F=\\frac{9}{5}(0)+32=32'), tx('C = 2:', 'F=\\frac{9}{5}(2)+32=3.6+32=35.6'), tx('C = 3:', 'F=\\frac{9}{5}(3)+32=5.4+32=37.4'),
      'Plot (0, 32), (2, 35.6) and (3, 37.4) with C on the x-axis and F on the y-axis (the y-axis starts at 28 to keep the scale readable).', 'Join the points with a straight line. It does not pass through the origin: the line cuts the F-axis at 32 (the y-intercept), and its slope is 9/5 = 1.8.'], b.cfg);
  })();

  (function () {
    const usd = [1, 3, 5], pkr = usd.map(u => u * 60); if (pkr[2] !== 300) return;
    const b = board(-0.5, 6.5, -30, 340, 'Conversion graph of US dollars to Pakistani rupees'); usd.forEach((u, i) => b.pt(1, [u, pkr[i]], '(' + u + ', ' + pkr[i] + ')', { dx: 4, dy: -8 })); b.fn(2, '60*x', { from: 0, to: 6 });
    A(9, ['The exchange rate is US $1 = Rs.60, so rupees = 60 × dollars. The book asks for $1, $3 and $5 (Exercise 8.3 Q5 (i)).', tx('Table (dollars, rupees):', 'y=60x:\\quad 1\\to60,\\ 3\\to180,\\ 5\\to300'), 'Plot (1, 60), (3, 180) and (5, 300). Scale: 1 square = $1 along the x-axis and Rs.60 along the y-axis.', 'Join the points: a straight line through the origin (direct proportion, slope 60).'], b.cfg);
  })();

  (function () {
    const g = [1, 2, 3], pk = g.map(x => x * 100), us = [1, 3, 5];
    const b = board(-0.5, 6.5, -30, 340, 'Conversion graphs PKR–US $ and PKR–GB £');
    us.forEach(u => b.pt(1, [u, u * 60], '$' + u + ', Rs.' + u * 60, { dx: 4, dy: 12, color: 'blue' })); b.fn(2, '60*x', { from: 0, to: 6, color: 'blue' });
    g.forEach((x, i) => b.pt(3, [x, pk[i]], '£' + x + ', Rs.' + pk[i], { dx: -64, dy: -6, color: 'green' })); b.fn(4, '100*x', { from: 0, to: 3.4, color: 'green' });
    A(10, ['Use the rates given in the exercise: US $1 = Rs.60 and GB £1 = Rs.100 (Exercise 8.3 Q5). Both graphs are drawn on the same axes (x = number of dollars or pounds, y = rupees).',
      tx('(i) Dollars $1, $3, $5:', 'y=60x:\\quad (1,60),\\ (3,180),\\ (5,300)'), 'Plot those three points and join them with a straight line through the origin.',
      tx('(ii) Pounds £1, £2, £3:', 'y=100x:\\quad (1,100),\\ (2,200),\\ (3,300)'), 'Plot those three points and join them. This line is steeper than the dollar line because £1 buys more rupees than $1.'], b.cfg);
  })();

  /* ---------- Review Exercise 8 ---------- */
  (function () {
    const V = [[-2, 3], [4, 2], [1, -3]], b = board(-4, 6, -5, 5, 'Triangle ABC'); V.forEach((v, i) => b.pt(1, v, labels[i] + pt(v), { dx: 4, dy: -8 })); polygon(b, 2, V);
    A(11, ['Plot A(−2, 3): 2 left, 3 up. B(4, 2): 4 right, 2 up. C(1, −3): 1 right, 3 down.', 'Join AB, BC and CA with a ruler.', tx('Side lengths:', 'AB=\\sqrt{6^{2}+1^{2}}=\\sqrt{37},\\ BC=\\sqrt{3^{2}+5^{2}}=\\sqrt{34},\\ CA=\\sqrt{3^{2}+6^{2}}=\\sqrt{45}'), 'All three sides are different, so ABC is a scalene triangle.'], b.cfg);
  })();

  (function () {
    const V = [[0, 0], [1, 4], [4, 2], [3, -2]], nm = ['O', 'A', 'B', 'C']; if (V[0][0] + V[2][0] !== V[1][0] + V[3][0] || V[0][1] + V[2][1] !== V[1][1] + V[3][1]) return;
    const b = board(-2, 6, -4, 6, 'Parallelogram OABC'); V.forEach((v, i) => b.pt(1, v, nm[i] + pt(v), { dx: 4, dy: -8 })); polygon(b, 2, V); b.seg(3, V[0], V[2], { dash: true, color: 'green' }).seg(3, V[1], V[3], { dash: true, color: 'green' });
    A(12, ['Plot O(0, 0), A(1, 4), B(4, 2) and C(3, −2), then join O → A → B → C → O.', tx('Opposite sides are parallel: the slope of OA is 4/1 = 4 and of CB is (2 − (−2))/(4 − 3) = 4; the slope of OC is −2/3 and of AB is (2 − 4)/(4 − 1) = −2/3.', '\\text{slope }OA=\\text{slope }CB=4,\\qquad \\text{slope }OC=\\text{slope }AB=-\\tfrac{2}{3}'),
      'Both pairs of opposite sides are parallel, so OABC is a parallelogram. (Its diagonals OB and AC meet at (2, 1), the midpoint of both.)'], b.cfg);
  })();

  (function () {
    const V = [[0, 0], [5, 0], [5, 5], [0, 5]], nm = ['O', 'A', 'B', 'C'], b = board(-1, 7, -1, 7, 'Square OABC of side 5');
    V.forEach((v, i) => b.pt(1, v, nm[i] + pt(v), { dx: 4, dy: i < 2 ? 14 : -6 })); polygon(b, 2, V);
    const S = [[1, 7], [4, 2], [-1, -1], [-4, 4]]; if (!ok('R8 Q5 sq', dist(S[0], S[1]), dist(S[1], S[2])) || !ok('R8 Q5 sq', dist(S[2], S[3]), dist(S[3], S[0])) || !ok('R8 Q5 sq', dist(S[0], S[2]), dist(S[1], S[3]))) return;
    A(13, ['Plot O(0, 0), A(5, 0), B(5, 5) and C(0, 5) and join them in order.', 'OA lies on the x-axis and OC on the y-axis, so ∠O = 90°, and each side measures 5 units: OA = AB = BC = CO = 5. Four equal sides with a right angle make a square.',
      tx('The diagonals are equal too:', 'OB=\\sqrt{5^{2}+5^{2}}=5\\sqrt2=AC'),
      'The printed Review Exercise 8 Q5 in the book uses the points A(1, 7), B(4, 2), C(−1, −1) and D(−4, 4): all four sides are √34 (AB = √(9 + 25), BC = √(25 + 9), CD = √(9 + 25), DA = √(25 + 9)) and both diagonals are √68, so those points also form a square.'], b.cfg);
  })();

  (function () {
    const P = [[-6, 5], [5, -5], [5, 8], [-6, -8]], nm = ['A', 'B', 'C', 'D'], b = board(-8, 7, -10, 10, 'The four printed points A, B, C, D');
    P.forEach((v, i) => b.pt(1, v, nm[i] + pt(v), { dx: 4, dy: i === 1 || i === 3 ? 14 : -8 }));
    const order = [0, 3, 1, 2], Q = order.map(i => P[i]); polygon(b, 2, Q);
    const par = Q[0][0] + Q[2][0] === Q[1][0] + Q[3][0] && Q[0][1] + Q[2][1] === Q[1][1] + Q[3][1], dot = (Q[1][0] - Q[0][0]) * (Q[2][0] - Q[1][0]) + (Q[1][1] - Q[0][1]) * (Q[2][1] - Q[1][1]); if (!par || dot === 0) return;
    A(14, ['The book’s exercise (Review 8 Q6) gives the vertices A(−6, 5), B(5, −5), C(5, 8) and D(−6, −8). Plot them: A and D are on the vertical line x = −6; B and C are on the vertical line x = 5.',
      'Join the points so that AD and BC are the vertical sides: A → D → B → C → A. Then AD = 5 − (−8) = 13 and BC = 8 − (−5) = 13, so these two sides are equal and parallel.',
      tx('The other two sides: AC goes from (−6, 5) to (5, 8) and DB goes from (−6, −8) to (5, −5); both have change (11, 3).', 'AC=DB=\\sqrt{11^{2}+3^{2}}=\\sqrt{130}'),
      'So the figure has two pairs of equal and parallel opposite sides: it is a parallelogram. For a rectangle the adjacent sides must also be perpendicular: AD is vertical but DB has slope 3/11, which is not horizontal, so the angle at D is not 90°.',
      'Note: the answer key says “rectangle”, but the printed points form a parallelogram, not a rectangle (the y-coordinates of B and C, −5 and 8, do not match those of D and A, −8 and 5, as they would for a rectangle with vertical sides). The printed answer is left as printed.'], b.cfg);
  })();

  (function () {
    const b = board(-2, 7, -2, 7, 'The line x + y = 4'); b.pt(1, [0, 4], '(0, 4)', { dx: 4, dy: -8 }).pt(1, [4, 0], '(4, 0)', { dx: 4, dy: -8 }).pt(1, [2, 2], '(2, 2)', { dx: 4, dy: -8 }).fn(2, '4-x', { from: -1.5, to: 6 });
    A(15, ['Write y in terms of x: from x + y = 4 we get y = 4 − x.', 'Make a table of values: x = 0 gives y = 4; x = 2 gives y = 2; x = 4 gives y = 0.', tx('Check each pair in the equation:', '0+4=4,\\quad 2+2=4,\\quad 4+0=4'), 'Plot (0, 4), (2, 2) and (4, 0). They lie on a straight line: draw it through the points and extend it. The line cuts both axes at 4 (its intercepts) and slopes downward (slope −1).'], b.cfg);
  })();

  (function () {
    const b = board(-5, 5, -5, 5, 'The line y = x'); b.pt(1, [-2, -2], '(−2, −2)', { dx: 4, dy: 14 }).pt(1, [0, 0], '(0, 0)', { dx: 6, dy: 14 }).pt(1, [2, 2], '(2, 2)', { dx: 4, dy: -8 }).fn(2, 'x', { from: -4.5, to: 4.5 });
    const b2 = board(-5, 5, -2, 6, 'The line y = 3'); b2.pt(1, [-2, 3], '(−2, 3)', { dx: 4, dy: -8 }).pt(1, [0, 3], '(0, 3)', { dx: 4, dy: -8 }).pt(1, [3, 3], '(3, 3)', { dx: 4, dy: -8 }).fn(2, '3', { from: -4.5, to: 4.5 });
    A(16, ['The equation is y = x: the y-value always equals the x-value. Take x = −2, 0, 2: the points are (−2, −2), (0, 0) and (2, 2).', 'Plot them and draw the straight line through them: it passes through the origin and bisects the angle between the positive x-axis and the positive y-axis (slope 1).',
      'The printed Review Exercise 8 Q8 in the book is the graph of y = 3. For y = 3 every point has y-coordinate 3 whatever x is: (−2, 3), (0, 3), (3, 3); the graph is a horizontal line 3 units above the x-axis, parallel to the x-axis.'], b.cfg);
  })();

  (function () {
    const P = [[-3, 5], [4, 3], [3, 4], [-4, -2], [3, -4], [0, 4], [-3, 0], [0, 0]], b = board(-6, 6, -6, 7, 'The points from the table');
    P.forEach((v, i) => b.pt(1, v, pt(v), { dx: 4, dy: -6 }));
    A(17, ['The book’s exercise (Review 8 Q9) gives a table of x and y values: x = −3, 4, 3, −4, 3, 0, −3, 0 and y = 5, 3, 4, −2, −4, 4, 0, 0. Read the columns as pairs (x, y).',
      'The points are (−3, 5), (4, 3), (3, 4), (−4, −2), (3, −4), (0, 4), (−3, 0) and (0, 0).', 'Choose a suitable scale: the x-values run from −4 to 4 and the y-values from −4 to 5, so 1 square = 1 unit on both axes is suitable.', 'Plot each point by going along the x-axis by the first number and up or down by the second number. The points are shown on the board.'], b.cfg);
  })();

  (function () {
    const s1 = [2.5, -1.5], s2 = [3, -1]; if (!ok('R8 Q10', s1[0] + s1[1], 1) || !ok('R8 Q10', s1[0] - s1[1], 4) || !ok('R8 Q10', s2[0] + s2[1], 2) || !ok('R8 Q10', s2[0] - s2[1], 4)) return;
    const b = board(-3, 7, -6, 4, 'x + y = 1 and x − y = 4, and the book’s system x + y = 2 and x − y = 4');
    b.fn(1, '1-x', { from: -2, to: 6, color: 'orange' }).fn(2, 'x-4', { from: -1, to: 7, color: 'purple' }).pt(3, s1, '(2.5, −1.5)', { color: 'green', dx: 6, dy: -8 }).fn(4, '2-x', { from: -2, to: 6, color: 'blue' }).pt(5, s2, '(3, −1)', { color: 'green', dx: 6, dy: 14 });
    A(18, ['Draw both lines on the same axes; the point where they cross satisfies both equations.', tx('Line 1, x + y = 1, i.e. y = 1 − x: (0, 1), (1, 0), (4, −3).', 'y=1-x'), tx('Line 2, x − y = 4, i.e. y = x − 4: (4, 0), (0, −4), (2, −2).', 'y=x-4'),
      tx('The lines cross at (2.5, −1.5). Check in both equations:', '2.5+(-1.5)=1,\\qquad 2.5-(-1.5)=4'),
      tx('The printed Review Exercise 8 Q10 in the book is x + y = 2 and x − y = 4. Line y = 2 − x passes through (0, 2), (2, 0), (4, −2); it crosses y = x − 4 at (3, −1):', '3+(-1)=2,\\qquad 3-(-1)=4'),
      'So the solution set is {(2.5, −1.5)} for the system as stored, and {(3, −1)} for the system as printed in the book.'], b.cfg);
  })();
})(typeof window !== 'undefined' ? window : globalThis);
