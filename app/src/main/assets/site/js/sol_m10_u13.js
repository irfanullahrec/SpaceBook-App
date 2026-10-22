/* Class 10 Mathematics, Unit 13 (Practical Geometry: Circle): every construction is worked out in coordinates and replayed stroke by stroke
 * (ruler lines, compass arcs, points) on a drawing board, with the measured results checked against the book's printed answers. */
(function (root) {
  'use strict';
  const NS = root.SBVR, G = root.SBSOL_GEO, K = root.SBSOL_CONS; if (!NS || !NS.sol || !G || !K) return;
  const warn = m => { if (root.console) console.warn('sol_m10_u13: ' + m); };
  const f = (x, d) => String(+Number(x).toFixed(d === undefined ? 2 : d));
  const ok = (label, got, exp, tol) => { if (Math.abs(got - exp) > (tol === undefined ? 0.01 : tol)) { warn(label + ': computed ' + got + ' but the book prints ' + exp); return false; } return true; };
  const DQ = ["Construct a triangle with sides 2 cm, 2.5 cm and 3 cm. Also draw its circumcircle.","Construct ΔABC with AB=3 cm, AC=4 cm and ∠A=60°. Draw its circumcircle.","Construct a triangle with side lengths 3 cm, 4 cm and 6 cm. Draw its inscribed circle.","Construct ΔABC with AB=5 cm, BC=6 cm and CA=8 cm. Draw perpendicular bisectors of its sides and then its circumcircle.","Construct a triangle ABC with ∠A=60° and ∠B=45°. Draw the three angle bisectors and then its incircle.","An equilateral triangle is inscribed in a circle. Find the altitude if the radius is (i) 3, (ii) 4, (iii) 6 and (iv) 12 units. Deduce a result.","An equilateral triangle is circumscribed about a circle. Find its altitude if the radius is (i) 2, (ii) 5 and (iii) 10 units. Deduce a result.","Circumscribe an equilateral triangle about circles of radii 2, 3 and 1 inches.","Construct a triangle with sides 2.5 cm, 3.5 cm and 4.5 cm. Draw an escribed circle touching the longest side.","For the triangle in Q9, draw an escribed circle touching the smallest side.","Circumscribe a square about a circle of radius 5 cm.","Inscribe a square in a circle of radius 6 cm.","Draw a square of side 6 cm. Circumscribe a circle about it and inscribe a circle in the same square. Measure the radii of these two circles.","Draw a circle of suitable radius so that a square circumscribed about it has side length 8 units.","Inscribe a square of side 10 cm in a circle. What is the radius?","Inscribe a regular hexagon in a circle of radius 4 cm.","Construct a circle of radius 4 cm and draw a regular hexagon about the circle.","Draw a circle of radius 8 cm. Circumscribe and inscribe regular hexagons; find their areas and compare.","Draw two regular hexagons with perimeters 6 cm and 30 cm. Find their centres and draw a perpendicular from each centre to one side. What is the relation between the perpendiculars?","Can you construct a square whose area equals the area of a given circle? Discuss in detail.","Draw an arc of length 7 cm. Without using its centre, construct a tangent through P when P is (i) the middle of the arc, (ii) an endpoint, and (iii) outside the arc.","Draw a circle through point D and tangent to line BC at D.","Describe a circle of radius 4 cm through point C and tangent to straight line AB.","A circle has radius 2.5 cm. Point Q is 5 cm from its centre. Draw a tangent from Q to the circle.","Two circles have radii 2 cm and 3 cm and their centres are 8 cm apart. Draw direct common tangents.","Two congruent circles of radius 4 cm have centres 10 cm apart. Draw transverse common tangents.","Two circles have radii 2 cm and 2.5 cm; their centres are 5.5 cm apart. Draw transverse common tangents.","Draw ΔABC with ∠B=60°. Construct a circle of radius 2.5 cm tangent to both arms of the angle.","The measure of an exterior angle of a regular hexagon is _____.","Tangents drawn at the endpoints of a diameter are _____.","How many tangents can be drawn from a point outside a circle?","If the distance between the centres of two circles equals the sum of their radii, the circles _____.","Practically find the centre of arc ABC.","Escribe a circle opposite vertex A of ΔABC with AB=5 cm, BC=4 cm and CA=3 cm. Find its radius also.","Circumscribe a circle about an equilateral triangle ABC with side 5 cm.","Circumscribe a regular hexagon about a circle of radius 4 cm.","Construct a circle of radius 3 cm and draw two tangents making an angle of 60° with each other.","Draw two equal circles of radius 3.5 cm whose centres are 7 cm apart. Draw their transverse common tangents.","Draw two common tangents to two intersecting circles of radii 2.5 cm and 3.5 cm.","Draw two common tangents to two externally touching circles of radii 3 cm and 4 cm."];   // the question text each pack answers, in the order of the Class 10 data for Unit 13
  let nPack = 0;
  const key = q => DQ[nPack++] || q;
  const sq = Math.sqrt, rad = Math.PI / 180, { add2, sub, mul, len, dist, mid, unit, perp, on, angleOf, circInt, circumcentre, incentre, excentre, foot } = K;
  const pack = (q, o) => { const p = K.pack(key(q), o); return p; };
  const GRN = { color: 'green' }, ORG = { color: 'orange' }, PUR = { color: 'purple' }, DSH = { dash: true, color: 'orange' };
  const ext = pts => pts.concat([]);
  const circleExt = (c, r) => [[c[0] - r, c[1] - r], [c[0] + r, c[1] + r]];
  const lab = (b, P, names, off) => Object.keys(names).forEach(k => b.pt(P[k], names[k] === true ? k : names[k], off && off[k]));

  /* ---- a triangle, drawn from its sides / two sides and the angle / two angles and a side ---- */
  function drawSSS(p, T, a, bq, c) {   // AB = c, BC = a, CA = bq
    p.step('Draw the base AB = ' + f(c, 1) + ' cm.', b => { b.seg(T.A, T.B, { label: f(c, 1) }); lab(b, T, { A: true, B: true }, { A: { dx: -14, dy: 14 }, B: { dx: 6, dy: 14 } }); });
    p.step('With A as centre and radius ' + f(bq, 1) + ' cm draw an arc; with B as centre and radius ' + f(a, 1) + ' cm draw another arc. The arcs meet at C.', b => { b.mark(T.A, T.C, { w: 16 }).mark(T.B, T.C, { w: 16 }); b.pt(T.C, 'C', { dy: -8 }); });
    p.step('Join AC and BC. ABC is the required triangle (AB = ' + f(c, 1) + ', BC = ' + f(a, 1) + ', CA = ' + f(bq, 1) + ' cm).', b => { b.seg(T.A, T.C, { label: f(bq, 1) }).seg(T.B, T.C, { label: f(a, 1) }); });
  }
  function drawSAS(p, T, c, bq, A) {
    p.step('Draw AB = ' + f(c, 1) + ' cm.', b => { b.seg(T.A, T.B, { label: f(c, 1) }); lab(b, T, { A: true, B: true }, { A: { dx: -14, dy: 14 }, B: { dx: 6, dy: 14 } }); });
    p.step('At A construct ∠BAC = ' + A + '° (a 60° angle is made with the compass: an arc from A cuts AB, then an arc of the same radius from that point cuts the first arc).', b => { b.arc(T.A, c * 0.5, 0, A, { color: 'grey' }); b.seg(T.A, add2(T.A, mul(unit(sub(T.C, T.A)), bq * 1.15)), { dash: true, color: 'grey' }); });
    p.step('On the new ray mark AC = ' + f(bq, 1) + ' cm and join BC.', b => { b.seg(T.A, T.C, { label: f(bq, 1) }).seg(T.B, T.C).pt(T.C, 'C', { dy: -8 }); });
  }
  function drawASA(p, T, c, A, B) {
    p.step('Draw AB = ' + c + ' cm (a convenient side; any length gives a similar triangle).', b => { b.seg(T.A, T.B, { label: String(c) }); lab(b, T, { A: true, B: true }, { A: { dx: -14, dy: 14 }, B: { dx: 6, dy: 14 } }); });
    p.step('At A construct ∠A = ' + A + ' and at B construct ∠B = ' + B + '°. The two rays meet at C.', b => { b.arc(T.A, c * 0.35, 0, A, { color: 'grey' }); b.arc(T.B, c * 0.3, 180 - B, 180, { color: 'grey' }); b.pt(T.C, 'C', { dy: -8 }); });
    p.step('Join the rays to complete the triangle ABC (∠C = ' + (180 - A - B) + '°).', b => { b.seg(T.A, T.C).seg(T.B, T.C); });
  }
  const R_of = (A, B, C) => { const a = dist(B, C), bb = dist(A, C), c = dist(A, B), k = K.area(A, B, C); return a * bb * c / (4 * k); };
  function circumcircle(p, T) {
    const O = circumcentre(T.A, T.B, T.C), R = dist(O, T.A);
    p.step('Draw the perpendicular bisector of AB: with A and B as centres and the same radius (more than half of AB) draw arcs above and below AB, and join their intersection points.', b => { const X = K.bisectorMarks(b, T.A, T.B); b.line(X[0], X[1], ORG); });
    p.step('Draw the perpendicular bisector of BC in the same way.', b => { const X = K.bisectorMarks(b, T.B, T.C); b.line(X[0], X[1], PUR); });
    p.step('The two bisectors meet at O, the circumcentre (it is equidistant from A, B and C).', b => { b.pt(O, 'O', { dx: 6, dy: 14 }); });
    p.step('With O as centre and radius OA = ' + f(R, 2) + ' cm draw the circle. It passes through A, B and C: this is the circumcircle.', b => { b.circle(O, R, GRN); b.seg(O, T.A, DSH); });
    return { O, R };
  }
  function incircle(p, T) {
    const I = incentre(T.A, T.B, T.C), r = dist(I, foot(I, T.A, T.B)), rho = 0.4 * Math.min(dist(T.A, T.B), dist(T.A, T.C), dist(T.B, T.C)), F = foot(I, T.A, T.B);
    p.step('Bisect ∠A: draw an arc from A cutting both sides, then equal arcs from those two points meeting at a point, and draw the ray from A through it.', b => { const W = K.angleBisectorMarks(b, T.A, T.B, T.C, rho); b.line(T.A, add2(T.A, W.dir), ORG); });
    p.step('Bisect ∠B in the same way.', b => { const W = K.angleBisectorMarks(b, T.B, T.A, T.C, rho); b.line(T.B, add2(T.B, W.dir), PUR); });
    p.step('The two bisectors meet at I, the incentre (it is equidistant from all three sides).', b => { b.pt(I, 'I', { dx: 6, dy: 14 }); });
    p.step('Draw the perpendicular from I to the side AB, meeting it at F. IF = ' + f(r, 2) + ' cm is the radius.', b => { b.seg(I, F, ORG).pt(F, 'F', { dy: 14 }).right(F, T.B, I); });
    p.step('With I as centre and radius IF draw the circle. It touches all three sides: this is the incircle (inscribed circle).', b => { b.circle(I, r, GRN); });
    return { I, r };
  }
  /* escribed circle opposite vertex V (touching the side opposite V) */
  function excircle(p, T, nm) {
    // nm = { v: vertex the circle is opposite, p, q: the other two vertices }; T maps A,B,C to (v,p,q)
    const A = T.A, B = T.B, C = T.C, J = excentre(A, B, C), F = foot(J, B, C), rr = dist(J, F), v = nm.v, pp = nm.p, qq = nm.q;
    const rho = 0.35 * Math.min(dist(A, B), dist(A, C), dist(B, C));
    p.step('Extend the sides ' + v + pp + ' and ' + v + qq + ' beyond ' + pp + ' and ' + qq + ' (the two sides that meet at the vertex ' + v + ').', b => { b.seg(B, add2(B, mul(unit(sub(B, A)), 1.6)), { dash: true, color: 'grey' }).seg(C, add2(C, mul(unit(sub(C, A)), 1.6)), { dash: true, color: 'grey' }); });
    p.step('Bisect the exterior angle at ' + pp + ' (between ' + pp + qq + ' and the extension of ' + v + pp + '): an arc from ' + pp + ' cuts both arms, then equal arcs from the cutting points meet.', b => { const W = K.angleBisectorMarks(b, B, C, add2(B, sub(B, A)), rho); b.line(B, add2(B, W.dir), ORG); });
    p.step('Bisect the exterior angle at ' + qq + ' (between ' + qq + pp + ' and the extension of ' + v + qq + ') in the same way.', b => { const W = K.angleBisectorMarks(b, C, B, add2(C, sub(C, A)), rho); b.line(C, add2(C, W.dir), PUR); });
    p.step('The two exterior bisectors meet at J, the excentre opposite ' + v + ' (it is equidistant from ' + pp + qq + ' and from the two extended sides).', b => { b.pt(J, 'J', { dx: 6, dy: 14 }); });
    p.step('Draw the perpendicular from J to ' + pp + qq + ', meeting it at F. JF = ' + f(rr, 2) + ' cm is the radius of the escribed circle.', b => { b.seg(J, F, ORG).pt(F, 'F', { dx: 6 }).right(F, B, J); });
    p.step('With J as centre and radius JF draw the circle. It touches ' + pp + qq + ' and the extensions of ' + v + pp + ' and ' + v + qq + ': this is the escribed circle opposite ' + v + '.', b => { b.circle(J, rr, GRN); });
    return { J, r: rr };
  }
  const triBoard = (T, extra) => ext([T.A, T.B, T.C].concat(extra || []));

  /* ===== Exercise 13.1 ===== */
  (function () {
    const T = K.tri(2.5, 2, 3), R = R_of(T.A, T.B, T.C), O = circumcentre(T.A, T.B, T.C); if (Math.abs(dist(O, T.A) - dist(O, T.C)) > 1e-9) return;
    const p = pack('Construct a triangle with sides 2 cm, 2.5 cm and 3 cm. Also draw its circumcircle.', { extent: ext([T.A, T.B, T.C].concat(circleExt(O, R))), alt: 'Triangle with sides 2, 2.5, 3 cm and its circumcircle' });
    drawSSS(p, T, 2.5, 2, 3); circumcircle(p, T);
    p.step('Check: OA = OB = OC = ' + f(R, 2) + ' cm (the circumradius, R = abc / 4K = (2 × 2.5 × 3) / (4 × ' + f(K.area(T.A, T.B, T.C), 3) + ')).').add();
  })();

  (function () {
    const T = K.triSAS(3, 4, 60), R = R_of(T.A, T.B, T.C), O = circumcentre(T.A, T.B, T.C);
    const p = pack('Construct ΔABC with AB=3 cm, AC=4 cm and ∠A=60°. Draw its circumcircle.', { extent: ext([T.A, T.B, T.C].concat(circleExt(O, R))), alt: 'Triangle ABC with AB = 3, AC = 4, angle A = 60° and its circumcircle' });
    drawSAS(p, T, 3, 4, 60); circumcircle(p, T);
    p.step('Check: BC² = 3² + 4² − 2(3)(4)cos60° = ' + f(25 - 12, 0) + ', so BC = ' + f(dist(T.B, T.C), 2) + ' cm and R = BC / (2 sin 60°) = ' + f(R, 2) + ' cm.').add();
  })();

  (function () {
    const T = K.tri(4, 6, 3), r = incircle({ step() { return this; } }, T).r, I = incentre(T.A, T.B, T.C);   // sides AB=3, BC=4, CA=6
    const p = pack('Construct a triangle with side lengths 3 cm, 4 cm and 6 cm. Draw its inscribed circle.', { extent: ext([T.A, T.B, T.C].concat(circleExt(I, r))), alt: 'Triangle 3, 4, 6 cm with its inscribed circle' });
    drawSSS(p, T, 4, 6, 3); const res = incircle(p, T);
    p.step('Check: the inradius is r = Area / s = ' + f(K.area(T.A, T.B, T.C), 3) + ' / 6.5 = ' + f(res.r, 3) + ' cm.').add();
  })();

  (function () {
    const T = K.tri(6, 8, 5), R = R_of(T.A, T.B, T.C), O = circumcentre(T.A, T.B, T.C);    // AB=5, BC=6, CA=8
    const p = pack('Construct ΔABC with AB=5 cm, BC=6 cm and CA=8 cm. Draw perpendicular bisectors of its sides and then its circumcircle.', { extent: ext([T.A, T.B, T.C].concat(circleExt(O, R))), alt: 'Triangle 5, 6, 8 with the three perpendicular bisectors and the circumcircle' });
    drawSSS(p, T, 6, 8, 5);
    p.step('Draw the perpendicular bisector of AB (equal arcs from A and B, then join the intersection points).', b => { const X = K.bisectorMarks(b, T.A, T.B); b.line(X[0], X[1], ORG); });
    p.step('Draw the perpendicular bisector of BC.', b => { const X = K.bisectorMarks(b, T.B, T.C); b.line(X[0], X[1], PUR); });
    p.step('Draw the perpendicular bisector of CA. The three bisectors meet at one point O, the circumcentre.', b => { const X = K.bisectorMarks(b, T.C, T.A); b.line(X[0], X[1], GRN); b.pt(O, 'O', { dx: 6, dy: 14 }); });
    p.step('With O as centre and radius OA = ' + f(R, 2) + ' cm draw the circle through A, B and C: the circumcircle.', b => { b.circle(O, R, GRN); });
    p.step('Check: the angle opposite the longest side CA = 8 is obtuse (8² = 64 > 5² + 6² = 61), so O lies outside the triangle, as in the diagram.').add();
  })();

  (function () {
    const T = K.triASA(6, 60, 45), I = incentre(T.A, T.B, T.C), r = dist(I, foot(I, T.A, T.B));
    const p = pack('Construct a triangle ABC with ∠A=60° and ∠B=45°. Draw the three angle bisectors and then its incircle.', { extent: ext([T.A, T.B, T.C].concat(circleExt(I, r))), alt: 'Triangle with angles 60° and 45° and its incircle' });
    drawASA(p, T, 6, 60, 45);
    const rho = 1.4;
    p.step('Bisect ∠A: an arc from A cuts both sides, then equal arcs from the two cutting points meet; draw the ray from A through the meeting point.', b => { const W = K.angleBisectorMarks(b, T.A, T.B, T.C, rho); b.line(T.A, add2(T.A, W.dir), ORG); });
    p.step('Bisect ∠B in the same way.', b => { const W = K.angleBisectorMarks(b, T.B, T.A, T.C, rho); b.line(T.B, add2(T.B, W.dir), PUR); });
    p.step('Bisect ∠C. The three bisectors meet at the incentre I.', b => { const W = K.angleBisectorMarks(b, T.C, T.A, T.B, rho); b.line(T.C, add2(T.C, W.dir), GRN); b.pt(I, 'I', { dx: 6, dy: 14 }); });
    p.step('Draw the perpendicular IF from I to AB (IF = ' + f(r, 2) + ' cm).', b => { const F = foot(I, T.A, T.B); b.seg(I, F, ORG).pt(F, 'F', { dy: 14 }).right(F, T.B, I); });
    p.step('With centre I and radius IF draw the incircle; it touches all three sides.', b => { b.circle(I, r, GRN); }).add();
  })();

  (function () {
    const h = R => 1.5 * R; if (h(3) !== 4.5 || h(4) !== 6 || h(6) !== 9 || h(12) !== 18) return;
    const R = 3, O = [0, 0], A = on(O, R, 90), B = on(O, R, 210), C = on(O, R, 330), D = G.mid(B, C);
    const b = G.board({ O, A, B, C, D }, { extent: circleExt(O, R), alt: 'Equilateral triangle inscribed in a circle of radius 3' });
    b.circle(O, R, 0).pt('O', 0, { dx: 6, dy: -6 }).seg('A', 'B', 0).seg('B', 'C', 0).seg('C', 'A', 0).pts(['A', 'B', 'C'], 0, { A: { dy: -8 }, B: { dx: -14, dy: 14 }, C: { dx: 6, dy: 14 } }).seg('A', 'D', 1, { color: 'orange' }).pt('D', 1, { dy: 14 }).seg('O', 'D', 2, { color: 'green' });
    NS.sol.add({ q: key('An equilateral triangle is inscribed in a circle. Find the altitude if the radius is (i) 3, (ii) 4, (iii) 6 and (iv) 12 units. Deduce a result.'), board: b.cfg(), steps: [
      'In an equilateral triangle the centre of the circumscribed circle is also its centroid, so it lies on every altitude.',
      'The centroid divides each altitude in the ratio 2 : 1, so the circumradius R is 2/3 of the altitude h (OA = R = 2h/3) and the part OD is h/3.',
      { text: 'Solve for the altitude:', m: 'R=\\frac{2}{3}h\\ \\Rightarrow\\ h=\\frac{3}{2}R' },
      { text: '(i) R = 3:', m: 'h=\\frac{3}{2}\\times 3=4.5\\text{ units}' }, { text: '(ii) R = 4:', m: 'h=\\frac{3}{2}\\times 4=6\\text{ units}' }, { text: '(iii) R = 6:', m: 'h=\\frac{3}{2}\\times 6=9\\text{ units}' }, { text: '(iv) R = 12:', m: 'h=\\frac{3}{2}\\times 12=18\\text{ units}' },
      'Result: the altitude of an equilateral triangle inscribed in a circle is 3/2 times the radius of the circle, h = 3r/2.'] });
  })();

  (function () {
    if (3 * 2 !== 6 || 3 * 5 !== 15 || 3 * 10 !== 30) return;
    const r = 2, O = [0, 0], T = { A: on(O, 2 * r, 90), B: on(O, 2 * r, 210), C: on(O, 2 * r, 330) };
    const b = G.board({ O, A: T.A, B: T.B, C: T.C }, { extent: [[-2 * r * 0.95, -r * 1.4], [2 * r * 0.95, 2 * r * 1.1]], alt: 'Equilateral triangle circumscribed about a circle of radius 2' });
    b.circle(O, r, 0).pt('O', 0, { dx: 6, dy: -6 }).seg('A', 'B', 1).seg('B', 'C', 1).seg('C', 'A', 1).pts(['A', 'B', 'C'], 1, { A: { dy: -8 }, B: { dx: -14, dy: 14 }, C: { dx: 6, dy: 14 } }).seg('O', 'A', 2, { color: 'orange', dash: true }).seg([0, -r], [0, 2 * r], 3, { color: 'green' });
    NS.sol.add({ q: key('An equilateral triangle is circumscribed about a circle. Find its altitude if the radius is (i) 2, (ii) 5 and (iii) 10 units. Deduce a result.'), board: b.cfg(), steps: [
      'The circle touches all three sides, so it is the incircle and its centre is the centroid of the equilateral triangle.',
      'The centroid is 1/3 of the way up each altitude, so the inradius r is one third of the altitude h.', { text: 'The altitude in terms of the radius:', m: 'r=\\frac{h}{3}\\ \\Rightarrow\\ h=3r' },
      { text: '(i) r = 2:', m: 'h=3\\times 2=6\\text{ units}' }, { text: '(ii) r = 5:', m: 'h=3\\times 5=15\\text{ units}' }, { text: '(iii) r = 10:', m: 'h=3\\times 10=30\\text{ units}' },
      'Result: the altitude of an equilateral triangle circumscribed about a circle is three times the radius, h = 3r.'] });
  })();

  /* circumscribe an equilateral triangle about a circle by tangents at three points 120° apart */
  function eqAbout(p, r, O) {
    const Ps = [on(O, r, 90), on(O, r, 210), on(O, r, 330)], V = [on(O, 2 * r, 270), on(O, 2 * r, 30), on(O, 2 * r, 150)];
    p.step('Draw the given circle with centre O and radius ' + r + ' and draw any radius OP₁.', b => { b.circle(O, r, { color: 'blue' }); b.pt(O, 'O', { dx: 6, dy: -6 }); b.seg(O, Ps[0], DSH); b.pt(Ps[0], 'P₁', { dy: -8 }); });
    p.step('At O construct angles of 120° on both sides of OP₁, to obtain the radii OP₂ and OP₃ (the three radii are 120° apart).', b => { b.arc(O, r * 0.45, 90, 210, { color: 'grey' }).arc(O, r * 0.45, 210, 330, { color: 'grey' }).seg(O, Ps[1], DSH).seg(O, Ps[2], DSH).pt(Ps[1], 'P₂', { dx: -18, dy: 14 }).pt(Ps[2], 'P₃', { dx: 6, dy: 14 }); });
    p.step('At each of P₁, P₂, P₃ draw the perpendicular to the radius (the tangent to the circle).', b => { b.line(Ps[0], add2(Ps[0], [1, 0]), ORG).line(Ps[1], add2(Ps[1], perp(sub(Ps[1], O))), ORG).line(Ps[2], add2(Ps[2], perp(sub(Ps[2], O))), ORG); });
    p.step('The three tangents meet at A, B, C. ABC is an equilateral triangle circumscribed about the circle: each side is 2r√3 = ' + f(2 * r * sq(3), 2) + ' units long and each altitude is 3r = ' + f(3 * r, 1) + '.', b => { b.pt(V[0], 'B', { dy: 14 }).pt(V[1], 'C', { dx: 6, dy: -8 }).pt(V[2], 'A', { dx: -14, dy: -8 }).seg(V[0], V[1], GRN).seg(V[1], V[2], GRN).seg(V[2], V[0], GRN); });
  }
  (function () {
    const O = [0, 0], r = 2, p = pack('Circumscribe an equilateral triangle about circles of radii 2, 3 and 1 inches.', { extent: [[-2 * r * 1.8, -2 * r * 1.05], [2 * r * 1.8, 2 * r * 1.15]], alt: 'Equilateral triangle circumscribed about a circle' });
    eqAbout(p, r, O);
    p.step('The same steps are repeated for the radii 3 inches and 1 inch: the triangles then have sides ' + f(2 * 3 * sq(3), 2) + ' and ' + f(2 * sq(3), 2) + ' inches. (Shown here for r = 2 in.)').add();
  })();

  (function () {
    const T = K.tri(3.5, 4.5, 2.5), J = excentre(T.C, T.A, T.B), rr = dist(J, foot(J, T.A, T.B));
    // AB = 2.5 (smallest), BC = 3.5, CA = 4.5 (longest). Vertex opposite the longest side CA is B.
    const Jb = excentre(T.B, T.C, T.A), rb = dist(Jb, foot(Jb, T.C, T.A));
    const p = pack('Construct a triangle with sides 2.5 cm, 3.5 cm and 4.5 cm. Draw an escribed circle touching the longest side.', { extent: ext([T.A, T.B, T.C].concat(circleExt(Jb, rb))), alt: 'Triangle 2.5, 3.5, 4.5 and the escribed circle touching the longest side' });
    drawSSS(p, T, 3.5, 4.5, 2.5);
    p.step('The longest side is CA = 4.5 cm, so the required escribed circle lies opposite the vertex B. We use the sides BA and BC that meet at B.');
    const r = excircle(p, { A: T.B, B: T.C, C: T.A }, { v: 'B', p: 'C', q: 'A' });
    p.step('Radius check: r_b = Area / (s − b) = ' + f(K.area(T.A, T.B, T.C), 3) + ' / (5.25 − 4.5) = ' + f(r.r, 3) + ' cm.').add();
  })();

  (function () {
    const T = K.tri(3.5, 4.5, 2.5), Jc = excentre(T.C, T.A, T.B);   // opposite C touches AB (smallest side)
    const rc = dist(Jc, foot(Jc, T.A, T.B));
    const p = pack('For the triangle in Q9, draw an escribed circle touching the smallest side.', { extent: ext([T.A, T.B, T.C].concat(circleExt(Jc, rc))), alt: 'The same triangle and the escribed circle touching the smallest side' });
    drawSSS(p, T, 3.5, 4.5, 2.5);
    p.step('The smallest side is AB = 2.5 cm, so the escribed circle lies opposite the vertex C (the sides CA and CB are extended).');
    const r = excircle(p, { A: T.C, B: T.A, C: T.B }, { v: 'C', p: 'A', q: 'B' });
    p.step('Radius check: r_c = Area / (s − c) = ' + f(K.area(T.A, T.B, T.C), 3) + ' / (5.25 − 2.5) = ' + f(r.r, 3) + ' cm.').add();
  })();

  /* ===== Exercise 13.2 ===== */
  const cross = (p, O, r, col) => { p.step('Draw the circle with centre O and radius ' + r + ' cm, and a diameter AC through O.', b => { b.circle(O, r, { color: 'blue' }); b.pt(O, 'O', { dx: 6, dy: 14 }); b.seg(on(O, r, 180), on(O, r, 0), DSH); b.pt(on(O, r, 180), 'A', { dx: -14 }).pt(on(O, r, 0), 'C', { dx: 6 }); }); p.step('Construct the perpendicular bisector of AC (arcs from A and C with the same radius, then a line through their intersections). It meets the circle at B and D: BD is a second diameter, perpendicular to AC.', b => { const X = K.bisectorMarks(b, on(O, r, 180), on(O, r, 0)); b.line(X[0], X[1], PUR); b.pt(on(O, r, 90), 'B', { dy: -8 }).pt(on(O, r, 270), 'D', { dy: 14 }); }); };

  (function () {
    const O = [0, 0], r = 5, p = pack('Circumscribe a square about a circle of radius 5 cm.', { extent: ext([[-r * 1.3, -r * 1.3], [r * 1.3, r * 1.3]]), alt: 'Square circumscribed about a circle of radius 5' });
    cross(p, O, r);
    p.step('At A, B, C and D draw the perpendiculars to the diameters (the tangents to the circle). They are parallel in opposite pairs and meet at right angles.', b => { [0, 90, 180, 270].forEach((d, i) => { const Pn = on(O, r, d); b.line(Pn, add2(Pn, perp(sub(Pn, O))), ORG); }); });
    p.step('The four tangents form the square PQRS circumscribed about the circle. Its side equals the diameter, ' + 2 * r + ' cm.', b => { const V = [[r, r], [-r, r], [-r, -r], [r, -r]]; V.forEach((v, i) => b.seg(v, V[(i + 1) % 4], GRN)); }).add();
  })();

  (function () {
    const O = [0, 0], r = 6, p = pack('Inscribe a square in a circle of radius 6 cm.', { extent: [[-r * 1.2, -r * 1.2], [r * 1.2, r * 1.2]], alt: 'Square inscribed in a circle of radius 6' });
    cross(p, O, r);
    p.step('Join A, B, C, D in order. ABCD is the inscribed square: its diagonals AC and BD are diameters and meet at right angles.', b => { [90, 180, 270, 0].forEach((d, i) => b.seg(on(O, r, d), on(O, r, [180, 270, 0, 90][i]), GRN)); });
    p.step('Check: the side of the square is r√2 = ' + f(r * sq(2), 2) + ' cm (the diagonal is the diameter 12 cm).').add();
  })();

  (function () {
    const s = 6, A = [0, 0], B = [s, 0], C = [s, s], D = [0, s], O = [s / 2, s / 2], R = s * sq(2) / 2;
    if (!ok('13.2 Q3', R, 3 * sq(2), 1e-9)) return;
    const p = pack('Draw a square of side 6 cm. Circumscribe a circle about it and inscribe a circle in the same square. Measure the radii of these two circles.', { extent: [[O[0] - R * 1.1, O[1] - R * 1.1], [O[0] + R * 1.1, O[1] + R * 1.1]], alt: 'Square of side 6 with its circumcircle and incircle' });
    p.step('Draw the square ABCD of side 6 cm.', b => { b.seg(A, B, { label: '6' }).seg(B, C).seg(C, D).seg(D, A); b.pt(A, 'A', { dx: -14, dy: 14 }).pt(B, 'B', { dx: 6, dy: 14 }).pt(C, 'C', { dx: 6, dy: -6 }).pt(D, 'D', { dx: -14, dy: -6 }); });
    p.step('Draw the diagonals AC and BD. They meet at O, the centre of the square, and OA = OB = OC = OD.', b => { b.seg(A, C, DSH).seg(B, D, DSH).pt(O, 'O', { dx: 6, dy: 14 }); });
    p.step('Circumscribed circle: with centre O and radius OA = half the diagonal = ' + f(R, 2) + ' cm draw the circle through the four vertices.', b => { b.circle(O, R, { color: 'blue' }); });
    p.step('Inscribed circle: draw the perpendicular from O to a side (it meets AB at its midpoint M, OM = 3 cm). With centre O and radius OM draw the circle that touches all four sides.', b => { b.seg(O, [s / 2, 0], ORG).pt([s / 2, 0], 'M', { dy: 14 }).circle(O, s / 2, GRN); });
    p.step('Measured radii: circumradius = 3√2 = ' + f(R, 2) + ' cm and inradius = 3 cm.').add();
  })();

  (function () {
    const O = [0, 0], r = 4, p = pack('Draw a circle of suitable radius so that a square circumscribed about it has side length 8 units.', { extent: [[-r * 1.3, -r * 1.3], [r * 1.3, r * 1.3]], alt: 'Square of side 8 with its inscribed circle' });
    p.step('Draw the square of side 8 units.', b => { [[-4, -4], [4, -4], [4, 4], [-4, 4]].forEach((v, i, V) => b.seg(v, V[(i + 1) % 4])); });
    p.step('The circle that the square is circumscribed about touches all four sides, so its diameter equals the side of the square: 2r = 8, r = 4. Find the centre O where the diagonals meet.', b => { b.seg([-4, -4], [4, 4], DSH).seg([4, -4], [-4, 4], DSH).pt(O, 'O', { dx: 6, dy: 14 }); });
    p.step('With centre O and radius 4 units draw the circle: it touches the four sides at their midpoints.', b => { b.circle(O, r, GRN); }).add();
  })();

  (function () {
    const s = 10, r = s * sq(2) / 2; if (!ok('13.2 Q5', r, 5 * sq(2), 1e-9)) return;
    const O = [0, 0], V = [[-5, -5], [5, -5], [5, 5], [-5, 5]], p = pack('Inscribe a square of side 10 cm in a circle. What is the radius?', { extent: circleExt(O, r * 1.1), alt: 'Square of side 10 inscribed in a circle' });
    p.step('Draw the square of side 10 cm.', b => { V.forEach((v, i) => b.seg(v, V[(i + 1) % 4])); });
    p.step('Draw its two diagonals; they meet at O.', b => { b.seg(V[0], V[2], DSH).seg(V[1], V[3], DSH).pt(O, 'O', { dx: 6, dy: 14 }); });
    p.step({ text: 'Each diagonal is the hypotenuse of a right triangle with legs 10 and 10:', m: 'd=\\sqrt{10^{2}+10^{2}}=10\\sqrt2\\approx ' + f(2 * r, 2) + '\\text{ cm}' });
    p.step('The circle through the four vertices has the diagonal as its diameter: with centre O and radius OA = ' + f(r, 2) + ' cm draw it.', b => { b.circle(O, r, GRN); });
    p.step({ text: 'So the radius is', m: 'r=\\frac{10\\sqrt2}{2}=5\\sqrt2\\approx ' + f(r, 2) + '\\text{ cm}' }).add();
  })();

  (function () {
    const O = [0, 0], r = 4, V = [0, 1, 2, 3, 4, 5].map(i => on(O, r, 60 * i)), p = pack('Inscribe a regular hexagon in a circle of radius 4 cm.', { extent: circleExt(O, r * 1.1), alt: 'Regular hexagon inscribed in a circle of radius 4' });
    p.step('Draw a circle of radius 4 cm and mark a point A on it.', b => { b.circle(O, r, { color: 'blue' }); b.pt(O, 'O', { dx: 6, dy: 14 }); b.pt(V[0], 'A', { dx: 6 }); });
    p.step('With the compass at A and the same radius 4 cm, cut the circle at B. Then from B cut C, from C cut D, and so on round the circle (the chord equals the radius).', b => { V.slice(1).forEach((v, i) => b.mark(V[i], v, { w: 9 })); ['B', 'C', 'D', 'E', 'F'].forEach((n, i) => b.pt(V[i + 1], n, { dy: i < 2 ? -8 : 14, dx: i >= 1 && i <= 3 ? -14 : 6 })); });
    p.step('Join the six points in order. ABCDEF is the regular hexagon, and each side = 4 cm.', b => { V.forEach((v, i) => b.seg(v, V[(i + 1) % 6], GRN)); }).add();
  })();

  (function () {
    const O = [0, 0], r = 4, side = 2 * r / sq(3), V = [0, 1, 2, 3, 4, 5].map(i => on(O, 2 * r / sq(3), 60 * i + 30)), P = [0, 1, 2, 3, 4, 5].map(i => on(O, r, 60 * i));
    const p = pack('Construct a circle of radius 4 cm and draw a regular hexagon about the circle.', { extent: circleExt(O, 2 * r / sq(3) * 1.05), alt: 'Regular hexagon circumscribed about a circle of radius 4' });
    p.step('Draw the circle with centre O and radius 4 cm.', b => { b.circle(O, r, { color: 'blue' }); b.pt(O, 'O', { dx: 6, dy: 14 }); });
    p.step('Mark six points on the circle 60° apart: pick P₁, then with the compass set to 4 cm step round the circle.', b => { P.forEach((q, i) => { if (i) b.mark(P[i - 1], q, { w: 8 }); b.pt(q, 'P' + (i + 1), { dx: i == 0 ? 6 : i < 3 ? 6 : -22, dy: i < 2 ? -6 : 14 }); }); });
    p.step('Join each point to O and draw the perpendicular to every radius at its end (the tangent at each point).', b => { P.forEach(q => { b.seg(O, q, { dash: true, color: 'orange' }); b.line(q, add2(q, perp(sub(q, O))), ORG); }); });
    p.step('The six tangents meet at the vertices of the regular hexagon. Each side is 2r / √3 = ' + f(side, 2) + ' cm.', b => { V.forEach((v, i) => b.seg(v, V[(i + 1) % 6], GRN)); }).add();
  })();

  (function () {
    const r = 8, A1 = 3 * sq(3) / 2 * r * r, A2 = 2 * sq(3) * r * r; if (!ok('13.2 Q8', A1, 96 * sq(3), 1e-9) || !ok('13.2 Q8', A2, 128 * sq(3), 1e-9)) return;
    const O = [0, 0], Vin = [0, 1, 2, 3, 4, 5].map(i => on(O, r, 60 * i)), Vout = [0, 1, 2, 3, 4, 5].map(i => on(O, 2 * r / sq(3), 60 * i + 30));
    const p = pack('Draw a circle of radius 8 cm. Circumscribe and inscribe regular hexagons; find their areas and compare.', { extent: circleExt(O, 2 * r / sq(3) * 1.05), alt: 'Circle of radius 8 with an inscribed hexagon and a circumscribed hexagon' });
    p.step('Draw the circle with centre O and radius 8 cm.', b => { b.circle(O, r, { color: 'blue' }); b.pt(O, 'O', { dx: 6, dy: 14 }); });
    p.step('Inscribed hexagon: step the radius 8 cm round the circle six times and join the points. Each side is 8 cm.', b => { Vin.forEach((v, i) => b.seg(v, Vin[(i + 1) % 6], GRN)); });
    p.step({ text: 'Area of the inscribed hexagon = six equilateral triangles of side r:', m: 'A_{1}=6\\times\\frac{\\sqrt3}{4}r^{2}=\\frac{3\\sqrt3}{2}\\times 64=96\\sqrt3\\approx ' + f(A1, 1) + '\\text{ cm}^{2}' });
    p.step('Circumscribed hexagon: draw the tangents at the same six points (the perpendiculars to the radii) and mark where neighbouring tangents meet.', b => { Vout.forEach((v, i) => b.seg(v, Vout[(i + 1) % 6], ORG)); });
    p.step({ text: 'The circle is now the incircle of this hexagon, so its apothem is 8 and each side is 2r/√3. Area = ½ × perimeter × apothem:', m: 'A_{2}=\\frac{1}{2}\\times 6\\times\\frac{16}{\\sqrt3}\\times 8=\\frac{384}{\\sqrt3}=128\\sqrt3\\approx ' + f(A2, 1) + '\\text{ cm}^{2}' });
    p.step({ text: 'Compare the two areas:', m: '\\frac{A_{2}}{A_{1}}=\\frac{128\\sqrt3}{96\\sqrt3}=\\frac{4}{3}' }).add();
  })();

  (function () {
    const s1 = 1, s2 = 5, a1 = sq(3) / 2 * s1, a2 = sq(3) / 2 * s2; if (!ok('13.2 Q9', a2 / a1, 5, 1e-9)) return;
    const mk = (s, ox) => { const V = [0, 1, 2, 3, 4, 5].map(i => on([ox, 0], s, 60 * i)); return V; };
    const V1 = mk(1, -3.5), V2 = mk(5, 4.5), p = pack('Draw two regular hexagons with perimeters 6 cm and 30 cm. Find their centres and draw a perpendicular from each centre to one side. What is the relation between the perpendiculars?', { extent: [[-5, -5.5], [10, 5.5]], alt: 'Two regular hexagons with sides 1 cm and 5 cm and the perpendiculars from their centres' });
    p.step({ text: 'A regular hexagon has six equal sides, so each side is the perimeter divided by 6:', m: 's_{1}=\\frac{6}{6}=1\\text{ cm},\\qquad s_{2}=\\frac{30}{6}=5\\text{ cm}' });
    p.step('Draw the two hexagons (a regular hexagon of side s is made of six equilateral triangles of side s, so it can be drawn by stepping the radius s round a circle of radius s).', b => { V1.forEach((v, i) => b.seg(v, V1[(i + 1) % 6])); V2.forEach((v, i) => b.seg(v, V2[(i + 1) % 6])); });
    p.step('The centre of each hexagon is where the long diagonals meet. Mark O₁ and O₂.', b => { b.pt([-3.5, 0], 'O₁', { dy: 14 }).pt([4.5, 0], 'O₂', { dy: 14 }); [[0, 3], [0, 3]].forEach(() => 0); b.seg(V1[0], V1[3], DSH).seg(V2[0], V2[3], DSH); });
    p.step('Draw the perpendicular from each centre to the bottom side. It meets the side at its midpoint.', b => { const m1 = G.mid(V1[4], V1[5]), m2 = G.mid(V2[4], V2[5]); b.seg([-3.5, 0], m1, ORG).seg([4.5, 0], m2, ORG); });
    p.step({ text: 'Each perpendicular is the apothem of its hexagon, a = (√3/2) s:', m: 'a_{1}=\\frac{\\sqrt3}{2}\\times 1\\approx ' + f(a1, 3) + '\\text{ cm},\\qquad a_{2}=\\frac{\\sqrt3}{2}\\times 5\\approx ' + f(a2, 3) + '\\text{ cm}' });
    p.step({ text: 'The ratio of the perpendiculars equals the ratio of the sides:', m: 'a_{1}:a_{2}=1:5' }).add();
  })();

  NS.sol.add({ q: key('Can you construct a square whose area equals the area of a given circle? Discuss in detail.'), steps: [
    'Take a circle of radius r. Its area is πr². A square with the same area would need a side s with s² = πr², that is s = r√π.',
    { text: 'The required side in terms of the radius:', m: 's^{2}=\\pi r^{2}\\ \\Rightarrow\\ s=r\\sqrt{\\pi}' },
    'With a ruler (unmarked straightedge) and compass one can only construct lengths obtained from the given lengths by addition, subtraction, multiplication, division and square roots, so the constructible lengths are algebraic numbers.',
    'The number π is transcendental (it is not the root of any polynomial with integer coefficients), so √π is not constructible. Hence an exact square of equal area cannot be constructed with ruler and compass only. This is the famous problem “squaring the circle”, proved impossible by Lindemann in 1882.',
    'An approximation is possible: for a circle of radius 1 the side √π ≈ 1.7725, and a segment of that length can be marked with a ruler and the square drawn on it. This gives a very close square, but it is not an exact ruler-and-compass construction.'] });

  /* ===== Exercise 13.3 ===== */
  (function () {
    const r = 6, th = 7 / r / rad, c = [0, 0], A = on(c, r, 90 - th / 2), B = on(c, r, 90 + th / 2), P = on(c, r, 90), M = G.mid(A, B), tdir = [1, 0];
    if (!ok('13.3 Q1', r * th * rad, 7, 1e-9)) return;
    const p = pack('Draw an arc of length 7 cm. Without using its centre, construct a tangent through P when P is (i) the middle of the arc, (ii) an endpoint, and (iii) outside the arc.', { extent: [[-2.5, 2], [2.5, 6.6]], alt: 'An arc of length 7 cm with the tangent at its middle point' });
    p.step('Draw the arc AB of length 7 cm (for example of radius 6 cm, subtending ' + f(th, 1) + '° at the centre, which is not used afterwards).', b => { b.arc(c, r, 90 - th / 2, 90 + th / 2, { color: 'blue' }); b.pt(A, 'A', { dx: 6, dy: 8 }).pt(B, 'B', { dx: -14, dy: 8 }); });
    p.step('(i) P is the middle of the arc. Join the chord AB and draw its perpendicular bisector (equal arcs from A and B); it cuts the arc at P, the midpoint of the arc.', b => { b.seg(A, B, ORG); const X = K.bisectorMarks(b, A, B); b.line(X[0], X[1], PUR); b.pt(P, 'P', { dy: -8 }); });
    p.step('Through P draw the line parallel to AB (copy the angle between the bisector and AB at P, or draw equal arcs from P and from the foot on AB). This line is the tangent at P: it is perpendicular to the bisector, which passes through the centre.', b => { b.line(P, add2(P, tdir), GRN); });
    p.step('(ii) P is an endpoint, say A. Take a point C on the arc and join AC and CB. By the alternate-segment theorem the angle between the tangent at A and the chord AB equals ∠ACB. At A construct on the side away from C an angle equal to ∠ACB with AB: the arm of that angle is the tangent at A.');
    p.step('(iii) P is outside the arc. Draw any secant from P cutting the arc at X and Y. Construct the mean proportional PT = √(PX · PY) (semicircle on a line with segments PX and PY). With P as centre and radius PT cut the arc at T. PT is the tangent, because PT² = PX · PY (tangent–secant theorem).').add();
  })();

  (function () {
    const B = [0, 0], C = [6, 0], D = [3, 0], O = [3, 2], r = 2, p = pack('Draw a circle through point D and tangent to line BC at D.', { extent: [[-0.5, -2.5], [6.5, 4.8]], alt: 'Circle through D tangent to BC at D' });
    p.step('Draw the line BC and mark the point D on it.', b => { b.seg([-0.4, 0], [6.4, 0], { color: 'blue' }); b.pt(B, 'B', { dy: 14 }).pt(C, 'C', { dy: 14 }).pt(D, 'D', { dy: 14, dx: 4 }); });
    p.step('At D construct the perpendicular to BC: with D as centre cut BC at two points E and F on either side; with E and F as centres and equal radii draw arcs above BC and join their meeting point to D.', b => { b.mark(D, [2.2, 0], { w: 40 }).mark(D, [3.8, 0], { w: 40 }); b.seg(D, [3, 4.2], { dash: true, color: 'orange' }); b.right(D, B, [3, 4]); });
    p.step('Choose any point O on this perpendicular as the centre (here OD = 2 cm). The radius OD is perpendicular to BC.', b => { b.pt(O, 'O', { dx: 6 }); });
    p.step('With centre O and radius OD draw the circle. It passes through D, and since OD ⟂ BC the line BC is the tangent at D. (Any other centre on the perpendicular gives another such circle.)', b => { b.circle(O, r, GRN); }).add();
  })();

  (function () {
    const C = [3, 3], r = 4, h = sq(r * r - (r - 3) * (r - 3)), O1 = [3 - h, r], O2 = [3 + h, r];
    if (!ok('13.3 Q3', dist(O1, C), 4, 1e-9)) return;
    const p = pack('Describe a circle of radius 4 cm through point C and tangent to straight line AB.', { extent: [[-3.5, -0.5], [9.5, 8.5]], alt: 'Circles of radius 4 through C tangent to AB' });
    p.step('Draw the line AB and the point C (here 3 cm above AB).', b => { b.seg([-3.5, 0], [9.5, 0], { color: 'blue', label: '' }); b.pt(C, 'C', { dy: -8 }); b.pt([-3, 0], 'A', { dy: 14 }).pt([9, 0], 'B', { dy: 14 }); });
    p.step('A circle of radius 4 touching AB has its centre 4 cm from AB. Draw the line parallel to AB at distance 4 cm (perpendiculars of 4 cm at two points of AB, joined).', b => { b.seg([0, 0], [0, 4], DSH).seg([6, 0], [6, 4], DSH).line([0, 4], [6, 4], ORG); });
    p.step('The centre is also 4 cm from C. With centre C and radius 4 cm draw an arc cutting the parallel line at O₁ and O₂.', b => { b.circle(C, 4, { color: 'grey' }); b.pt(O1, 'O₁', { dx: -22, dy: -6 }).pt(O2, 'O₂', { dx: 6, dy: -6 }); });
    p.step('With centre O₁ (and O₂) and radius 4 cm draw the circles. Each passes through C and, being 4 cm from AB, touches AB. There are two solutions.', b => { b.circle(O1, 4, GRN).circle(O2, 4, PUR); });
    p.step('Check: the distance from O to C is 4 cm (the radius), and the horizontal offset of the centres from C is √(4² − 1²) = ' + f(h, 3) + ' cm.').add();
  })();

  (function () {
    const O = [0, 0], r = 2.5, Q = [5, 0], M = [2.5, 0], X = circInt(O, r, M, 2.5), t = sq(25 - 6.25); if (!ok('13.3 Q4', t, 4.33, 0.005) || !ok('13.3 Q4', dist(X[0], Q), t, 1e-9)) return;
    const p = pack('A circle has radius 2.5 cm. Point Q is 5 cm from its centre. Draw a tangent from Q to the circle.', { extent: [[-3, -3], [6, 3]], alt: 'Two tangents from Q to a circle of radius 2.5 cm' });
    p.step('Draw the circle with centre O and radius 2.5 cm, and mark Q with OQ = 5 cm. Join OQ.', b => { b.circle(O, r, { color: 'blue' }); b.pt(O, 'O', { dx: -12, dy: 14 }).pt(Q, 'Q', { dx: 6, dy: 14 }); b.seg(O, Q, DSH); });
    p.step('Find the midpoint M of OQ by constructing its perpendicular bisector.', b => { const Y = K.bisectorMarks(b, O, Q, 0.66); b.line(Y[0], Y[1], PUR); b.pt(M, 'M', { dy: 14 }); });
    p.step('With centre M and radius MO = MQ = 2.5 cm draw a circle. It cuts the given circle at A and B.', b => { b.circle(M, 2.5, { color: 'grey' }); b.pt(X[0], 'A', { dy: -8 }).pt(X[1], 'B', { dy: 14 }); });
    p.step('Join QA and QB. These are the two tangents from Q (∠OAQ is an angle in the semicircle on OQ, so it is 90°).', b => { b.seg(Q, X[0], GRN).seg(Q, X[1], GRN).right(X[0], O, Q); });
    p.step({ text: 'Check: the tangent length from the right triangle OAQ:', m: 'QA=\\sqrt{OQ^{2}-OA^{2}}=\\sqrt{25-6.25}=\\sqrt{18.75}\\approx ' + f(t, 2) + '\\text{ cm}' }).add();
  })();

  /* common tangents of two circles, drawn from the angle φ between the line of centres and the normal of the tangent */
  function commonTangent(question, r1, r2, d, kind, alt, extra) {
    const O1 = [0, 0], O2 = [d, 0], big = r1 >= r2, sgn = kind === 'direct' ? 1 : -1, cphi = kind === 'direct' ? (r1 - r2) / d : (r1 + r2) / d, sphi = sq(1 - cphi * cphi);
    const n = [cphi, sphi], n2 = [cphi, -sphi], aux = kind === 'direct' ? r1 - r2 : r1 + r2, tl = sq(d * d - aux * aux);
    const T1 = add2(O1, mul(n, r1)), T2 = kind === 'direct' ? add2(O2, mul(n, r2)) : sub(O2, mul(n, r2)), T1b = add2(O1, mul(n2, r1)), T2b = kind === 'direct' ? add2(O2, mul(n2, r2)) : sub(O2, mul(n2, r2));
    const Kp = mul(n, aux), Kq = mul(n2, aux);
    const p = pack(question, { extent: [[-r1 - 0.5, -Math.max(r1, r2) - 1], [d + r2 + 0.5, Math.max(r1, r2) + 1]], alt });
    p.step('Draw the two circles with centres O₁ and O₂, radii ' + r1 + ' cm and ' + r2 + ' cm, and O₁O₂ = ' + d + ' cm.', b => { b.circle(O1, r1, { color: 'blue' }).circle(O2, r2, { color: 'purple' }); b.pt(O1, 'O₁', { dx: -4, dy: 14 }).pt(O2, 'O₂', { dx: -4, dy: 14 }); b.seg(O1, O2, DSH); });
    p.step('With centre O₁ draw the auxiliary circle of radius ' + (kind === 'direct' ? 'r₁ − r₂ = ' + f(r1 - r2, 1) : 'r₁ + r₂ = ' + f(r1 + r2, 1)) + ' cm.', b => { b.circle(O1, aux, { color: 'grey' }); });
    p.step('Find the midpoint of O₁O₂ and draw the circle on O₁O₂ as diameter (bisect O₁O₂, then circle with radius ½ O₁O₂). It cuts the auxiliary circle at K and K′. (Joining O₂ to K gives the tangent from O₂ to the auxiliary circle.)', b => { const Y = K.bisectorMarks(b, O1, O2, 0.66); b.line(Y[0], Y[1], PUR); b.circle(mid(O1, O2), d / 2, { color: 'grey' }); b.pt(Kp, 'K', { dy: -8 }).pt(Kq, 'K′', { dy: 14 }); b.seg(O2, Kp, DSH).seg(O2, Kq, DSH); });
    p.step('Draw the ray from O₁ through K and K′, cutting the circle of centre O₁ at T₁ and T₁′. Then draw ' + (kind === 'direct' ? 'O₂T₂ parallel to O₁T₁' : 'O₂T₂ parallel to O₁T₁ but in the opposite direction') + ' to meet the other circle at T₂ and T₂′.', b => { b.seg(O1, T1, DSH).seg(O1, T1b, DSH).seg(O2, T2, DSH).seg(O2, T2b, DSH); b.pt(T1, 'T₁', { dy: -8 }).pt(T1b, 'T₁′', { dy: 14 }).pt(T2, 'T₂', { dy: -8 }).pt(T2b, 'T₂′', { dy: 14 }); });
    p.step('Join T₁T₂ and T₁′T₂′. These are the two ' + (kind === 'direct' ? 'direct (external)' : 'transverse (internal)') + ' common tangents, because each is perpendicular to the radii O₁T₁ and O₂T₂.', b => { b.line(T1, T2, GRN).line(T1b, T2b, GRN); });
    p.step({ text: 'Check: the length of each common tangent between the points of contact is', m: 'T_{1}T_{2}=\\sqrt{d^{2}-(' + (kind === 'direct' ? 'r_{1}-r_{2}' : 'r_{1}+r_{2}') + ')^{2}}=\\sqrt{' + d + '^{2}-' + f(aux, 1) + '^{2}}=' + f(tl, 3) + '\\text{ cm}' });
    if (extra) p.step(extra);
    return { p, tl };
  }
  (function () { const o = commonTangent('Two circles have radii 2 cm and 3 cm and their centres are 8 cm apart. Draw direct common tangents.', 3, 2, 8, 'direct', 'Direct common tangents of circles of radii 3 and 2 with centres 8 apart'); if (!ok('13.3 Q5', o.tl, sq(63), 1e-9)) return; o.p.add(); })();
  (function () { const o = commonTangent('Two congruent circles of radius 4 cm have centres 10 cm apart. Draw transverse common tangents.', 4, 4, 10, 'transverse', 'Transverse common tangents of two circles of radius 4, centres 10 apart'); if (!ok('13.3 Q6', o.tl, 6, 1e-9)) return; o.p.add(); })();
  (function () { const o = commonTangent('Two circles have radii 2 cm and 2.5 cm; their centres are 5.5 cm apart. Draw transverse common tangents.', 2.5, 2, 5.5, 'transverse', 'Transverse common tangents of circles of radii 2 and 2.5, centres 5.5 apart'); if (!ok('13.3 Q7', o.tl, sq(10), 1e-9)) return; o.p.add(); })();

  (function () {
    const B = [0, 0], r = 2.5, h = 30, c = r / Math.sin(h * rad), I = on(B, c, h), Ft = foot(I, B, on(B, 8, 0)), Fu = foot(I, B, on(B, 8, 60));
    if (!ok('13.3 Q8', c, 5, 1e-9)) return;
    const p = pack('Draw ΔABC with ∠B=60°. Construct a circle of radius 2.5 cm tangent to both arms of the angle.', { extent: [[-0.5, -0.8], [9.2, 7.6]], alt: 'Circle of radius 2.5 cm inside an angle of 60°' });
    p.step('Draw the angle ∠ABC = 60° with the arm BC along the base and BA at 60° to it.', b => { b.seg(B, on(B, 8, 0), { label: '' }).seg(B, on(B, 8, 60)); b.arc(B, 1.3, 0, 60, { color: 'grey' }); b.pt(B, 'B', { dx: -14, dy: 14 }).pt(on(B, 8, 0), 'C', { dy: 14 }).pt(on(B, 8, 60), 'A', { dy: -8 }); });
    p.step('Bisect ∠B: an arc from B cuts both arms, then equal arcs from the two cutting points meet; draw the bisector.', b => { const W = K.angleBisectorMarks(b, B, on(B, 8, 0), on(B, 8, 60), 1.6); b.line(B, add2(B, W.dir), ORG); });
    p.step('The centre is 2.5 cm from each arm. Draw a perpendicular of length 2.5 cm to BC (at any point of BC) and the line parallel to BC through its end; it meets the bisector at I.', b => { b.seg([6, 0], [6, 2.5], DSH).line([0, 2.5], [8, 2.5], PUR); b.pt(I, 'I', { dx: -14, dy: -6 }); });
    p.step({ text: 'Check by trigonometry: I lies on the bisector at distance BI from B, with sin 30° = 2.5 / BI:', m: 'BI=\\frac{2.5}{\\sin30^{\\circ}}=5\\text{ cm}' });
    p.step('With centre I and radius 2.5 cm draw the circle. It touches BC and BA at the feet of the perpendiculars.', b => { b.circle(I, r, GRN); b.seg(I, Ft, DSH).seg(I, Fu, DSH); }).add();
  })();

  /* ===== Review Exercise 13 ===== */
  NS.sol.add({ q: key('The measure of an exterior angle of a regular hexagon is _____.'), steps: ['The exterior angles of any convex polygon add up to 360°, and in a regular polygon they are all equal.', { text: 'A regular hexagon has 6 equal exterior angles:', m: '\\frac{360^{\\circ}}{6}=60^{\\circ}=\\frac{\\pi}{3}\\text{ radians}' }, 'The answer is π/3 (that is 60°).'] });
  NS.sol.add({ q: key('Tangents drawn at the endpoints of a diameter are _____.'), steps: ['A tangent is perpendicular to the radius at its point of contact.', 'The two end points of a diameter have radii along the same line, so both tangents are perpendicular to that line.', 'Two lines perpendicular to the same line are parallel. The answer is: parallel.'] });
  NS.sol.add({ q: key('How many tangents can be drawn from a point outside a circle?'), steps: ['A tangent from an outside point P touches the circle at a point T with OT ⟂ PT.', 'The right angle at T means T lies on the circle whose diameter is OP. That circle meets the given circle in exactly two points.', 'So there are 2 tangents, and they are equal in length.'] });
  NS.sol.add({ q: key('If the distance between the centres of two circles equals the sum of their radii, the circles _____.'), steps: ['Let the radii be R and r and the distance between the centres d = R + r.', 'The point on the line of centres at distance R from the first centre is also at distance r from the second, so the circles meet there; any other point is on at most one circle.', 'The circles touch externally.'] });
  (function () {
    const c = [0, 0], r = 5, A = on(c, r, 120), B = on(c, r, 60), C = on(c, r, 15), M1 = mid(A, B), M2 = mid(B, C);
    const p = pack('Practically find the centre of arc ABC.', { extent: [[-4, 0], [5, 6]], alt: 'Finding the centre of an arc' });
    p.step('Take the three points A, B and C on the arc and join AB and BC (chords).', b => { b.arc(c, r, 15, 120, { color: 'blue' }); b.seg(A, B, ORG).seg(B, C, ORG); b.pt(A, 'A', { dx: -14 }).pt(B, 'B', { dy: -8 }).pt(C, 'C', { dx: 6 }); });
    p.step('Draw the perpendicular bisector of the chord AB (equal arcs from A and B, then join their intersections).', b => { const X = K.bisectorMarks(b, A, B); b.line(X[0], X[1], PUR); });
    p.step('Draw the perpendicular bisector of the chord BC in the same way.', b => { const X = K.bisectorMarks(b, B, C); b.line(X[0], X[1], GRN); });
    p.step('The two bisectors meet at O. Every perpendicular bisector of a chord passes through the centre, so O is the centre of the arc (OA = OB = OC).', b => { b.pt(c, 'O', { dx: 6, dy: 14 }); b.seg(c, B, DSH); }).add();
  })();
  (function () {
    // triangle with AB=5, BC=4, CA=3: right angle at C; exradius opposite A
    const T = { A: [0, 0], B: [0, 0], C: [0, 0] }; const C = [0, 0], Bq = [4, 0], Aq = [0, 3];   // right angle at C: CB = 4, CA = 3, AB = 5
    const Tt = { A: Aq, B: Bq, C }, area = 6, s = 6, ra = area / (s - 4), J = excentre(Aq, Bq, C); if (!ok('R13 Q6', ra, 3, 1e-9) || !ok('R13 Q6', dist(J, foot(J, Bq, C)), 3, 1e-9)) return;
    const p = pack('Escribe a circle opposite vertex A of ΔABC with AB=5 cm, BC=4 cm and CA=3 cm. Find its radius also.', { extent: [[-3.5, -3.5], [8.5, 6.5]], alt: 'Right triangle ABC and its escribed circle opposite A' });
    p.step('Construct the triangle: draw BC = 4 cm, then arcs of radius 5 cm from B and 3 cm from C meet at A (the triangle is right-angled at C because 3² + 4² = 5²).', b => { b.seg(C, Bq, { label: '4' }).seg(C, Aq, { label: '3' }).seg(Aq, Bq, { label: '5' }); b.pt(C, 'C', { dx: -14, dy: 14 }).pt(Bq, 'B', { dx: 6, dy: 14 }).pt(Aq, 'A', { dy: -8 }); b.right(C, Bq, Aq); });
    p.step('Extend AB beyond B and AC beyond C.', b => { b.seg(Bq, add2(Bq, mul(unit(sub(Bq, Aq)), 3.5)), { dash: true, color: 'grey' }).seg(C, add2(C, mul(unit(sub(C, Aq)), 3.5)), { dash: true, color: 'grey' }); });
    p.step('Bisect the exterior angle at B and the exterior angle at C. The bisectors meet at J, the excentre opposite A.', b => { b.line(Bq, J, ORG).line(C, J, PUR); b.pt(J, 'J', { dx: 6, dy: 14 }); });
    p.step('Draw the perpendicular from J to BC, meeting it at F. With centre J and radius JF draw the escribed circle.', b => { const F = foot(J, Bq, C); b.seg(J, F, ORG).pt(F, 'F', { dy: -8 }).circle(J, ra, GRN); });
    p.step({ text: 'Radius: the exradius opposite A is Area / (s − a), with s = (3 + 4 + 5)/2 = 6, a = BC = 4 and Area = ½ × 3 × 4 = 6:', m: 'r_{a}=\\frac{6}{6-4}=3\\text{ cm}' }).add();
  })();
  (function () {
    const a = 5, R = a / sq(3), T = { A: [0, 0], B: [a, 0], C: [a / 2, a * sq(3) / 2] }, O = circumcentre(T.A, T.B, T.C); if (!ok('R13 Q7', dist(O, T.A), R, 1e-9)) return;
    const p = pack('Circumscribe a circle about an equilateral triangle ABC with side 5 cm.', { extent: ext([T.A, T.B, T.C].concat(circleExt(O, R))), alt: 'Equilateral triangle of side 5 with its circumcircle' });
    drawSSS(p, T, 5, 5, 5); const r = circumcircle(p, T);
    p.step({ text: 'Radius: in an equilateral triangle the circumradius is R = a / √3:', m: 'R=\\frac{5}{\\sqrt3}\\approx ' + f(R, 3) + '\\text{ cm}' }).add();
  })();
  (function () {
    const O = [0, 0], r = 4, side = 2 * r / sq(3), V = [0, 1, 2, 3, 4, 5].map(i => on(O, side, 60 * i + 30)), P = [0, 1, 2, 3, 4, 5].map(i => on(O, r, 60 * i));
    const p = pack('Circumscribe a regular hexagon about a circle of radius 4 cm.', { extent: circleExt(O, side * 1.05), alt: 'Regular hexagon circumscribed about a circle of radius 4' });
    p.step('Draw the circle of radius 4 cm with centre O, and mark a point P₁ on it.', b => { b.circle(O, r, { color: 'blue' }); b.pt(O, 'O', { dx: 6, dy: 14 }).pt(P[0], 'P₁', { dx: 6 }); });
    p.step('Step the radius 4 cm round the circle to mark the six points P₁ … P₆ (60° apart).', b => { P.slice(1).forEach((q, i) => b.mark(P[i], q, { w: 8 })); });
    p.step('At each point draw the tangent (perpendicular to the radius). Neighbouring tangents meet at the vertices.', b => { P.forEach(q => { b.seg(O, q, DSH); b.line(q, add2(q, perp(sub(q, O))), ORG); }); });
    p.step('The six vertices form the regular hexagon about the circle; each side is 2r / √3 = ' + f(side, 2) + ' cm.', b => { V.forEach((v, i) => b.seg(v, V[(i + 1) % 6], GRN)); }).add();
  })();
  (function () {
    const O = [0, 0], r = 3, OP = r / Math.sin(30 * rad), P = [OP, 0], X = circInt(O, r, mid(O, P), OP / 2); if (!ok('R13 Q9', OP, 6, 1e-9)) return;
    const p = pack('Construct a circle of radius 3 cm and draw two tangents making an angle of 60° with each other.', { extent: [[-3.4, -3.4], [7.2, 3.4]], alt: 'Two tangents inclined at 60° to a circle of radius 3' });
    p.step('Draw the circle with centre O and radius 3 cm.', b => { b.circle(O, r, { color: 'blue' }); b.pt(O, 'O', { dx: -12, dy: 14 }); });
    p.step({ text: 'Where must the two tangents meet? The line OP bisects the 60° angle, so each half is 30°, and the radius to a point of contact is perpendicular to the tangent:', m: 'OP=\\frac{r}{\\sin30^{\\circ}}=\\frac{3}{1/2}=6\\text{ cm}' });
    p.step('Draw a ray from O and mark P on it with OP = 6 cm.', b => { b.seg(O, P, DSH); b.pt(P, 'P', { dx: 6, dy: 14 }); });
    p.step('Find the midpoint of OP (perpendicular bisector) and draw the circle on OP as diameter. It cuts the given circle at A and B.', b => { const Y = K.bisectorMarks(b, O, P, 0.66); b.line(Y[0], Y[1], PUR); b.circle(mid(O, P), OP / 2, { color: 'grey' }); b.pt(X[0], 'A', { dy: -8 }).pt(X[1], 'B', { dy: 14 }); });
    p.step('Join PA and PB. They are tangents to the circle and the angle between them is ∠APB = 2 × 30° = 60°.', b => { b.seg(P, X[0], GRN).seg(P, X[1], GRN).right(X[0], O, P); }).add();
  })();
  (function () {
    const r = 3.5, d = 7, O1 = [0, 0], O2 = [d, 0], Mp = [r, 0];
    const p = pack('Draw two equal circles of radius 3.5 cm whose centres are 7 cm apart. Draw their transverse common tangents.', { extent: [[-r - 0.5, -r - 1], [d + r + 0.5, r + 1]], alt: 'Two touching circles of radius 3.5 and their common tangent at the point of contact' });
    p.step('Draw the circles with centres O₁ and O₂, O₁O₂ = 7 cm and each radius 3.5 cm.', b => { b.circle(O1, r, { color: 'blue' }).circle(O2, r, { color: 'purple' }); b.pt(O1, 'O₁', { dx: -4, dy: 14 }).pt(O2, 'O₂', { dx: -4, dy: 14 }); });
    p.step('Because 3.5 + 3.5 = 7 = O₁O₂, the circles touch externally at the midpoint M of O₁O₂. The auxiliary circle of radius r₁ + r₂ = 7 cm about O₁ passes through O₂, so the transverse tangents coincide.', b => { b.circle(O1, 7, { color: 'grey' }); b.pt(Mp, 'M', { dx: -4, dy: -8 }); });
    p.step('Draw the perpendicular to O₁O₂ at M (bisect O₁O₂ and join the arc intersections). This single common tangent at the point of contact is the transverse common tangent.', b => { const Y = K.bisectorMarks(b, O1, O2, 0.66); b.line(Y[0], Y[1], GRN); b.right(Mp, O1, [r, 1]); });
    p.step('The two circles also have two direct common tangents (parallel to O₁O₂ at distance 3.5 cm), but the question asks only for the transverse tangent.').add();
  })();
  (function () {
    const r1 = 3.5, r2 = 2.5, d = 5, O1 = [0, 0], O2 = [d, 0], cphi = (r1 - r2) / d, sphi = sq(1 - cphi * cphi), n = [cphi, sphi], n2 = [cphi, -sphi];
    if (!(Math.abs(r1 - r2) < d && d < r1 + r2)) return;
    const T1 = add2(O1, mul(n, r1)), T2 = add2(O2, mul(n, r2)), T1b = add2(O1, mul(n2, r1)), T2b = add2(O2, mul(n2, r2)), tl = sq(d * d - (r1 - r2) * (r1 - r2));
    const p = pack('Draw two common tangents to two intersecting circles of radii 2.5 cm and 3.5 cm.', { extent: [[-r1 - 0.5, -r1 - 1], [d + r2 + 0.5, r1 + 1]], alt: 'Two intersecting circles of radii 3.5 and 2.5 with their two common tangents' });
    p.step('Draw the circles of radii 3.5 cm and 2.5 cm so that they intersect (the book gives no distance; here O₁O₂ = 5 cm, which is between r₁ − r₂ = 1 and r₁ + r₂ = 6).', b => { b.circle(O1, r1, { color: 'blue' }).circle(O2, r2, { color: 'purple' }); b.pt(O1, 'O₁', { dx: -4, dy: 14 }).pt(O2, 'O₂', { dx: -4, dy: 14 }); b.seg(O1, O2, DSH); });
    p.step('Direct common tangents: draw the auxiliary circle of radius r₁ − r₂ = 1 cm about O₁, then the tangent from O₂ to it (using the circle on O₁O₂ as diameter).', b => { b.circle(O1, 1, { color: 'grey' }); b.circle(mid(O1, O2), d / 2, { color: 'grey' }); });
    p.step('Draw the radii O₁T₁ and O₂T₂ in the direction of the tangent point of the auxiliary circle (parallel), and join T₁T₂. Repeat on the other side to get T₁′T₂′.', b => { b.seg(O1, T1, DSH).seg(O2, T2, DSH).seg(O1, T1b, DSH).seg(O2, T2b, DSH); });
    p.step('Draw the lines T₁T₂ and T₁′T₂′ — the two common tangents (for intersecting circles only the two direct tangents exist).', b => { b.line(T1, T2, GRN).line(T1b, T2b, GRN); });
    p.step({ text: 'Check: the length of the common tangent between the points of contact is', m: 'T_{1}T_{2}=\\sqrt{5^{2}-(3.5-2.5)^{2}}=\\sqrt{24}\\approx ' + f(tl, 3) + '\\text{ cm}' }).add();
  })();
  (function () {
    const r1 = 4, r2 = 3, d = 7, O1 = [0, 0], O2 = [d, 0], cphi = (r1 - r2) / d, sphi = sq(1 - cphi * cphi), n = [cphi, sphi], n2 = [cphi, -sphi], tl = sq(d * d - (r1 - r2) * (r1 - r2));
    const Mp = [r1, 0], T1 = add2(O1, mul(n, r1)), T2 = add2(O2, mul(n, r2)), T1b = add2(O1, mul(n2, r1)), T2b = add2(O2, mul(n2, r2));
    const p = pack('Draw two common tangents to two externally touching circles of radii 3 cm and 4 cm.', { extent: [[-r1 - 0.5, -r1 - 1], [d + r2 + 0.5, r1 + 1]], alt: 'Two circles of radii 4 and 3 touching externally with their common tangents' });
    p.step('Draw the circles with O₁O₂ = 4 + 3 = 7 cm; they touch externally at M on O₁O₂ (O₁M = 4 cm).', b => { b.circle(O1, r1, { color: 'blue' }).circle(O2, r2, { color: 'purple' }); b.pt(O1, 'O₁', { dx: -4, dy: 14 }).pt(O2, 'O₂', { dx: -4, dy: 14 }).pt(Mp, 'M', { dx: -4, dy: -8 }); });
    p.step('Common tangent 1 (transverse): at the point of contact M draw the perpendicular to O₁O₂ (bisect an arc around M, then draw the line).', b => { b.line(Mp, add2(Mp, [0, 1]), GRN); b.right(Mp, O1, [4, 1]); });
    p.step('Common tangent 2 (direct): with centre O₁ draw the auxiliary circle of radius 4 − 3 = 1 cm, then the circle on O₁O₂ as diameter; the tangent from O₂ to the auxiliary circle gives the direction of the radii.', b => { b.circle(O1, 1, { color: 'grey' }); b.circle(mid(O1, O2), d / 2, { color: 'grey' }); b.seg(O1, T1, DSH).seg(O2, T2, DSH).seg(O1, T1b, DSH).seg(O2, T2b, DSH); });
    p.step('Join T₁T₂ and T₁′T₂′: these are the two direct common tangents. Together with the tangent at M there are three common tangents in all.', b => { b.line(T1, T2, ORG).line(T1b, T2b, ORG); });
    p.step({ text: 'Check: the direct tangent length is', m: 'T_{1}T_{2}=\\sqrt{7^{2}-1^{2}}=\\sqrt{48}\\approx ' + f(tl, 3) + '\\text{ cm}' }).add();
  })();
})(typeof window !== 'undefined' ? window : globalThis);
