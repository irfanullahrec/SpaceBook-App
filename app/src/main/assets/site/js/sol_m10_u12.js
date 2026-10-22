/* Class 10 Mathematics, Unit 12 (Angle in a Segment of a Circle): hand-written worked solutions with diagrams.
 * The angle values in the printed figures were read from the book's pages (Exercise 12 and Review Exercise 12); each result is computed here and compared with the printed answer.
 * Where the printed answer does not agree with the printed figure, the computed value is stated in the steps and the book's value is left as printed. */
(function (root) {
  'use strict';
  const NS = root.SBVR, G = root.SBSOL_GEO; if (!NS || !NS.sol || !G) return;
  const warn = m => { if (root.console) console.warn('sol_m10_u12: ' + m); };
  const f = (x, d) => String(+Number(x).toFixed(d === undefined ? 2 : d));
  const ok = (label, got, exp, tol) => { if (Math.abs(got - exp) > (tol === undefined ? 0.006 : tol)) { warn(label + ': computed ' + got + ' but the book prints ' + exp); return false; } return true; };
  const tx = (text, m) => ({ text, m });
  const rad = Math.PI / 180;
  const DQ = ["O is the centre of the circle. Find the unknown angles x and y in the printed diagram, where the central angle is 70°.","A regular hexagon is inscribed in a circle. Each side is 5√3 units from the centre. Find the radius.","Find the value of each variable in the two printed cyclic-quadrilateral diagrams (a) and (b).","Show that a parallelogram inscribed in a circle is a rectangle.","In the figure, O is the centre of the circle, ∠TPR=80° and ∠QOR=x°. Find x.","In the diagram, ∠ADC is a central angle and m∠ADC=60°. What is m∠ABC?","In the figure, O is the centre and ∠PQR=70°. Calculate x, the reflex central angle marked in the figure.","In the figure, ∠SPT=100°, ∠PQS=40° and ∠PRQ=x°. Calculate x.","If the marked central angle m∠3=75°, find m∠1 and m∠2.","Given O is the centre, find the marked x in the circle.","Given O is the centre, find the marked y in the circle.","In the figure, O is the centre. Find x.","O is the centre of the circle. Find the unknowns in both printed diagrams (i) and (ii).","ABCD is a quadrilateral circumscribed about a circle. Show that m⌢AB+m⌢CD=m⌢BC+m⌢DA.","Find x in each of the six printed circle diagrams."];   // the question text each pack answers, in the order of the Class 10 data for Unit 12
  let nPack = 0;
  const add = (q, steps, b) => G.add(DQ[nPack++] || q, steps, b);
  const on = (r, deg) => [r * Math.cos(deg * rad), r * Math.sin(deg * rad)];

  /* ---------- Exercise 12 ---------- */
  (function () {
    const x = 70 / 2, y = 180 - x; if (x !== 35 || y !== 145) return;
    const r = 3, O = [0, 0], A = on(r, 145), B = on(r, 215), V = on(r, 0), U = on(r, 180);
    const b = G.board({ O, A, B, V, U }, { extent: [[-r, -r], [r, r]], alt: 'Circle with the central angle AOB = 70° and the quadrilateral AVBU' });
    b.circle(O, r, 0).pt('O', 0, { dx: 4, dy: 14 }).seg('O', 'A', 0, { color: 'orange' }).seg('O', 'B', 0, { color: 'orange' }).text([-1.2, 0.1], '70°', 0).pts(['A', 'B', 'V', 'U'], 0, { A: { dy: -8 }, B: { dy: 14 }, V: { dx: 6 }, U: { dx: -14 } });
    b.seg('V', 'A', 1, { color: 'purple' }).seg('V', 'B', 1, { color: 'purple' }).text([2.1, 0.2], 'x', 1).seg('U', 'A', 3, { color: 'green' }).seg('U', 'B', 3, { color: 'green' }).text([-2.5, 0.2], 'y', 3);
    add('O is the centre of the circle. Find the unknown angles x and y in the printed diagram, where the central angle is 70°.', [
      'The central angle ∠AOB = 70° stands on the minor arc AB (the arc on the left of the figure).',
      tx('The angle x is at the point V on the opposite (major) arc, standing on the same arc AB. An inscribed angle is half the central angle on the same arc:', 'x=\\frac{1}{2}\\times 70^{\\circ}=35^{\\circ}'),
      'The quadrilateral AVBU has all four vertices on the circle, so it is a cyclic quadrilateral and its opposite angles are supplementary: x and y are the angles at opposite vertices V and U.',
      tx('', 'y=180^{\\circ}-x=180^{\\circ}-35^{\\circ}=145^{\\circ}')], b);
  })();

  (function () {
    const R = 5 * Math.sqrt(3) / Math.cos(30 * rad) / Math.sqrt(3) * Math.sqrt(3) / Math.sqrt(3); // placeholder, recomputed below
    const apothem = 5 * Math.sqrt(3), Rr = apothem / Math.sin(60 * rad); if (!ok('12 Q2', Rr, 10, 1e-9)) return;
    const O = [0, 0], pts = {}; ['A', 'B', 'C', 'D', 'E', 'F'].forEach((n, i) => { pts[n] = on(Rr, 60 * i); });
    const M = G.mid(pts.A, pts.B);
    const b = G.board(Object.assign({ O, M }, pts), { extent: [[-Rr, -Rr], [Rr, Rr]], alt: 'Regular hexagon inscribed in a circle with the perpendicular from the centre to a side' });
    b.circle(O, Rr, 0).pt('O', 0, { dx: -12, dy: 14 });
    ['AB', 'BC', 'CD', 'DE', 'EF', 'FA'].forEach(s => b.seg(s[0], s[1], 0));
    b.pts(['A', 'B', 'C', 'D', 'E', 'F'], 0, { A: { dx: 6 }, B: { dy: -8 }, C: { dy: -8 }, D: { dx: -14 }, E: { dy: 14 }, F: { dy: 14 } });
    b.seg('O', 'M', 1, { color: 'orange', label: '5√3' }).pt('M', 1, { dx: 6, dy: 14 }).right('M', 'O', 'B', 1).seg('O', 'A', 2, { color: 'green' }).seg('O', 'B', 2, { color: 'green' });
    add('A regular hexagon is inscribed in a circle. Each side of the hexagon is 5√3 units from the centre of the circle. Find the radius of the circle.', [
      'Let O be the centre and AB one side of the regular hexagon. The distance from O to the side is the perpendicular OM, so OM = 5√3 and M is the midpoint of AB.',
      'A regular hexagon splits into six equal triangles at the centre. Each central angle is 360° / 6 = 60°, so triangle OAB has ∠AOB = 60° and OA = OB = radius r.',
      tx('OM bisects ∠AOB, so ∠AOM = 30° and ∠OAM = 60°. In the right triangle OMA, OM is opposite ∠OAM = 60°:', '\\sin60^{\\circ}=\\frac{OM}{OA}\\ \\Rightarrow\\ \\frac{\\sqrt3}{2}=\\frac{5\\sqrt3}{r}'),
      tx('Solve for r:', 'r=\\frac{5\\sqrt3\\times 2}{\\sqrt3}=10\\text{ units}'), 'Check: triangle OAB is equilateral with side 10, so its height is 10 · √3/2 = 5√3 ✓.'], b);
  })();

  (function () {
    const c = 186 / 3, xx = 180 / 18, a = 90 / 2, bb = 180 / 6; if (c !== 62 || xx !== 10 || a !== 45 || bb !== 30) return;
    const r = 3, S = on(r, 120), T = on(r, 55), U = on(r, -10), V = on(r, -105), b = G.board({ S, T, U, V }, { extent: [[-r, -r], [r, r]], alt: 'Cyclic quadrilateral STUV' });
    b.circle([0, 0], r, 0).seg('S', 'T', 0).seg('T', 'U', 0).seg('U', 'V', 0).seg('V', 'S', 0).pts(['S', 'T', 'U', 'V'], 0, { S: { dx: -14, dy: -4 }, T: { dx: 6, dy: -6 }, U: { dx: 6, dy: 4 }, V: { dy: 14 } });
    b.text(G.mid(S, [0, 0]), 'c', 0).text(G.mid(T, [0, 0]), '10x', 0).text(G.mid(U, [0, 0]), '2c−6', 0).text(G.mid(V, [0, 0]), '8x', 0);
    add('Find the value of each variable. [(a) cyclic quadrilateral STUV with angles c°, 10x°, (2c−6)°, 8x°; (b) cyclic quadrilateral LKJM with angles 2a°, 4b°, 2a°, 2b°]', [
      'Opposite angles of a cyclic quadrilateral are supplementary (add to 180°).',
      tx('(a) S and U are opposite angles:', 'c+(2c-6)=180\\ \\Rightarrow\\ 3c=186\\ \\Rightarrow\\ c=62^{\\circ}'), tx('T and V are opposite angles:', '10x+8x=180\\ \\Rightarrow\\ 18x=180\\ \\Rightarrow\\ x=10^{\\circ}'),
      'Check (a): the four angles are 62°, 100°, 118°, 80°. 62 + 118 = 180 ✓ and 100 + 80 = 180 ✓.',
      tx('(b) The opposite angles at L and J are both 2a (the angles marked 2a°):', '2a+2a=180\\ \\Rightarrow\\ a=45^{\\circ}'), tx('The opposite angles at K (4b) and M (2b):', '4b+2b=180\\ \\Rightarrow\\ 6b=180\\ \\Rightarrow\\ b=30^{\\circ}'),
      'Check (b): the angles are 90°, 120°, 90°, 60°. 90 + 90 = 180 ✓ and 120 + 60 = 180 ✓.'], b);
  })();

  (function () {
    const r = 3, A = on(r, 60), B = on(r, 180 - 60), C = on(r, 180 + 60), D = on(r, -60), b = G.board({ A, B, C, D }, { extent: [[-r, -r], [r, r]], alt: 'Parallelogram inscribed in a circle' });
    b.circle([0, 0], r, 0).seg('A', 'B', 0).seg('B', 'C', 0).seg('C', 'D', 0).seg('D', 'A', 0).pts(['A', 'B', 'C', 'D'], 0, { A: { dx: 6, dy: -6 }, B: { dx: -14, dy: -6 }, C: { dx: -14, dy: 14 }, D: { dx: 6, dy: 14 } });
    add('Show that a parallelogram inscribed in a circle will be a rectangle.', [
      'Let ABCD be a parallelogram whose four vertices lie on a circle.', tx('In a parallelogram, opposite angles are equal:', '\\angle A=\\angle C,\\qquad \\angle B=\\angle D'),
      tx('ABCD is a cyclic quadrilateral, so opposite angles are supplementary:', '\\angle A+\\angle C=180^{\\circ}'), tx('Substitute ∠C = ∠A:', '2\\angle A=180^{\\circ}\\ \\Rightarrow\\ \\angle A=90^{\\circ}'),
      'Then ∠C = 90°, and in the same way ∠B = ∠D = 90°.', 'A parallelogram with four right angles is a rectangle.'], b);
  })();

  /* ---------- Review Exercise 12 ---------- */
  add('In the figure, O is the centre of the circle, ∠TPR=80° and ∠QOR=x°. Find x. [options 80°, 160°, 100°, 120°]', [
    'T, P and Q lie on one straight line, so ∠TPR and ∠RPQ are adjacent angles on a line.', tx('', '\\angle RPQ=180^{\\circ}-80^{\\circ}=100^{\\circ}'),
    'The inscribed angle RPQ stands on the major arc RQ (P is on the minor side), so that arc measures 2 × 100° = 200°.', tx('The minor arc RQ is the rest of the circle, and the central angle ∠ROQ equals it:', 'x=360^{\\circ}-200^{\\circ}=160^{\\circ}'), 'The answer is 160°.']);

  add('In the diagram, ∠ADC is a central angle and m∠ADC=60°. What is m∠ABC? [options 15°, 60°, 120°, 30°]', [
    'D is the centre, and ∠ADC stands on the arc AC. B is a point of the circle on the opposite arc, so ∠ABC is the inscribed angle on the same arc AC.', tx('An inscribed angle is half the central angle on the same arc:', 'm\\angle ABC=\\frac{60^{\\circ}}{2}=30^{\\circ}')]);

  add('In the figure, O is the centre of the circle and ∠PQR=70°. Calculate x, the reflex central angle marked in the figure. [options 140°, 220°, 290°, 110°]', [
    'The inscribed angle ∠PQR = 70° stands on the arc PR.', tx('The (minor) central angle on the same arc is twice the inscribed angle:', '\\angle POR=2\\times 70^{\\circ}=140^{\\circ}'),
    tx('The marked angle x is the reflex angle on the other side of O (a full turn is 360°):', 'x=360^{\\circ}-140^{\\circ}=220^{\\circ}')]);

  (function () {
    const x60 = 180 - 80 - 40; if (x60 !== 60) return;
    const r = 3, P = on(r, 150), Q = on(r, 40), R = on(r, -30), S = on(r, -105), T = [P[0] - (Q[0] - P[0]) * 0.6, P[1] - (Q[1] - P[1]) * 0.6], b = G.board({ P, Q, R, S, T }, { extent: [[-r, -r], [r, r]], alt: 'Circle with chords PQ, PR, PS and QS, and T on the line QP produced' });
    b.circle([0, 0], r, 0).seg('T', 'Q', 0).seg('P', 'S', 0).seg('P', 'R', 0).seg('Q', 'S', 0).seg('Q', 'R', 0).pts(['P', 'Q', 'R', 'S', 'T'], 0, { P: { dx: -6, dy: -8 }, Q: { dy: -8 }, R: { dx: 6 }, S: { dy: 14 }, T: { dx: -14 } });
    add('In the figure, ∠SPT=100°, ∠PQS=40° and ∠PRQ=x°. Calculate the value of x. [options 30°, 40°, 50°, 60°]', [
      'T, P and Q lie on one straight line, so ∠SPT and ∠SPQ are adjacent angles on a line.', tx('', '\\angle SPQ=180^{\\circ}-100^{\\circ}=80^{\\circ}'),
      tx('Angle sum of triangle SPQ with ∠PQS = 40°:', '\\angle PSQ=180^{\\circ}-80^{\\circ}-40^{\\circ}=60^{\\circ}'),
      'The angles ∠PSQ and ∠PRQ are both inscribed angles on the same chord PQ, on the same side of it, so they are equal.', tx('', 'x=\\angle PRQ=\\angle PSQ=60^{\\circ}'),
      'Note: the book prints 40° as the answer, but 40° is the given ∠PQS; the working from the printed figure and values above gives x = 60° (60° is among the printed options). The book’s printed answer is left as printed.']);
  })();

  add('In the adjacent figure if m∠3=75°, then find m∠1 and m∠2. [options 37½°, 37½°; 37½°, 75°; 75°, 37½°; 75°, 75°]', [
    'The angle ∠3 is the central angle at O on the arc AB. ∠1 and ∠2 are inscribed angles at the points C and D on the circle, standing on the same arc AB.', tx('Each inscribed angle is half the central angle on the same arc:', 'm\\angle 1=m\\angle 2=\\frac{75^{\\circ}}{2}=37\\tfrac{1}{2}^{\\circ}'), 'So m∠1 = 37½° and m∠2 = 37½°.']);
  add('Given that O is the centre of the circle. The angle marked x will be: [figure: an inscribed angle of 25°; x is the central angle at O on the same chord] options 12½°, 25°, 50°, 75°', [
    'The 25° angle is an inscribed angle standing on the chord whose central angle at O is x.', tx('The central angle is twice the inscribed angle on the same arc:', 'x=2\\times 25^{\\circ}=50^{\\circ}')]);
  add('Given that O is the centre of the circle, the angle marked y will be: [figure: the 25° angle and y both stand on the same chord] options 12½°, 25°, 50°, 75°', [
    'The angle y is an inscribed angle at the left of the figure, standing on the same chord as the given 25° angle.', 'Angles in the same segment of a circle (standing on the same chord, on the same side) are equal.', tx('', 'y=25^{\\circ}'), 'Check: y is half of the central angle x = 50° on the same chord, and 50° / 2 = 25° ✓.']);

  (function () {
    const ACB = 20 + 30, x = 2 * ACB; if (x !== 100) return;
    const r = 3, A = on(r, 215), Bp = on(r, 325), C = on(r, 90), O = [0, 0], b = G.board({ A, B: Bp, C, O }, { extent: [[-r, -r], [r, r]], alt: 'Circle with centre O, triangle ABC and the central angle x' });
    b.circle(O, r, 0).pt('O', 0, { dx: 4, dy: -8 }).seg('A', 'C', 0).seg('B', 'C', 0).seg('A', 'O', 0, { color: 'orange' }).seg('B', 'O', 0, { color: 'orange' }).pts(['A', 'B', 'C'], 0, { A: { dx: -14 }, B: { dx: 6 }, C: { dy: -8 } });
    add('In the figure, O is the centre of the circle then the angle x is: [∠OAC = 20°, ∠OBC = 30°; options 50°, 75°, 100°, 125°]', [
      'OA, OB and OC are radii, so triangles OAC and OBC are isosceles.', tx('In triangle OAC, OA = OC, so ∠OCA = ∠OAC = 20°. In triangle OBC, OB = OC, so:', '\\angle OCA=20^{\\circ},\\qquad \\angle OCB=\\angle OBC=30^{\\circ}'),
      tx('The inscribed angle at C is the sum:', '\\angle ACB=20^{\\circ}+30^{\\circ}=50^{\\circ}'), tx('The central angle on the same arc AB is twice the inscribed angle:', 'x=\\angle AOB=2\\times 50^{\\circ}=100^{\\circ}')], b);
  })();

  (function () {
    const x = 180 - 82, y = 180 - 120, ok2 = (76 / 3); if (x !== 98 || y !== 60 || !ok('R12 Q2', ok2, 25, 0.4)) return;
    add('O is the centre of the circle. Find the unknowns in both printed diagrams (i) and (ii).', [
      'Facts: opposite angles of a cyclic quadrilateral are supplementary; the central angle is twice the inscribed angle on the same arc; angles in the same segment are equal; the two radii of a central triangle are equal.',
      tx('(i) x is opposite to the 82° angle:', 'x=180^{\\circ}-82^{\\circ}=98^{\\circ}'), tx('y is opposite to the 120° angle:', 'y=180^{\\circ}-120^{\\circ}=60^{\\circ}'),
      tx('(ii) The two chords through O are diameters. The 76° angle at N stands on the arc LM, so the central angle ∠LOM = 4x is twice it:', '4x=2\\times 76^{\\circ}=152^{\\circ}\\ \\Rightarrow\\ x=38^{\\circ}'),
      tx('The angles ∠LOM and ∠POM are on a straight line LOP, so ∠POM = 180° − 152° = 28°. Triangle OPM is isosceles (OP = OM), so the base angle at P (marked 3y) is:', '3y=\\frac{180^{\\circ}-28^{\\circ}}{2}=76^{\\circ}\\ \\Rightarrow\\ y=\\frac{76^{\\circ}}{3}\\approx 25.3^{\\circ}'),
      'The book prints y = 25°; the exact value from the printed angles is 76/3 ≈ 25.3°, so 25° is the value rounded to the nearest degree.']);
  })();

  (function () {
    add('ABCD is a quadrilateral circumscribed about a circle. Show that m AB + m CD = m BC + m DA. (The printed statement is about the lengths of the sides AB, CD, BC, DA.)', [
      'ABCD is circumscribed about the circle: each side touches the circle. Let the sides AB, BC, CD, DA touch the circle at P, Q, R, S respectively.',
      'The two tangent segments drawn from one external point to a circle are equal. Apply this at each vertex:', tx('', 'AP=AS,\\quad BP=BQ,\\quad CQ=CR,\\quad DR=DS'),
      tx('Add AB and CD, splitting each side at its point of contact:', 'AB+CD=(AP+PB)+(CR+RD)=AP+BP+CR+DR'),
      tx('Add BC and DA in the same way:', 'BC+DA=(BQ+QC)+(DS+SA)=BP+CR+DR+AP'),
      'The right sides are the same four lengths, so AB + CD = BC + DA.']);
  })();

  (function () {
    const x1 = 2 * 40, x2 = (360 - 110) / 2, x3 = 180 - 90 - 40, x4 = (180 - 90) / 2, x6 = 180 - 30 - 80, x5 = 180 - 100 - 68;
    if (x1 !== 80 || x2 !== 125 || x3 !== 50 || x4 !== 45 || x6 !== 70 || x5 !== 12) return;
    add('Find x in each of the following figures where O is the centre of the circle. [(i)–(vi) of Review Exercise 12 Q4]', [
      tx('(i) The 40° angle at the circumference and the angle x at the centre stand on the same arc:', 'x=2\\times 40^{\\circ}=80^{\\circ}'),
      tx('(ii) The 110° angle at O stands on the arc through the bottom vertex, so the inscribed angle x at that vertex stands on the other arc (360° − 110°):', 'x=\\frac{360^{\\circ}-110^{\\circ}}{2}=125^{\\circ}'),
      tx('(iii) One side of the triangle is a diameter, so the angle opposite it is 90° (angle in a semicircle). With the 40° angle:', 'x=180^{\\circ}-90^{\\circ}-40^{\\circ}=50^{\\circ}'),
      tx('(iv) The base is a diameter, so the apex angle is 90°. The two equal sides (marked) make the base angles equal:', 'x=\\frac{180^{\\circ}-90^{\\circ}}{2}=45^{\\circ}'),
      tx('(v) In the small triangle at the bottom, the 100° angle at the crossing point and the 68° angle leave the angle at the left chord end:', '180^{\\circ}-100^{\\circ}-68^{\\circ}=12^{\\circ}'),
      'Angles at the circumference standing on the same chord are equal, so the angle marked at the top equals this 12°: the unknown in (v) is 12° (the book’s answer line writes it as y = 12°).',
      tx('(vi) In the triangle formed by the 30° angle, the 80° angle and the angle at the top, the angle at the top vertex of the circle (on the chord with x) is:', '180^{\\circ}-30^{\\circ}-80^{\\circ}=70^{\\circ}'),
      'The angle x stands on the same chord as that angle (same segment), so x = 70°.']);
  })();

})(typeof window !== 'undefined' ? window : globalThis);
