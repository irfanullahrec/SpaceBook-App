/* Class 10 Mathematics, Units 10 (Tangents to a Circle) and 11 (Chords and Arcs): hand-written worked solutions with diagrams.
 * The numbers in the printed figures were read from the book's pages (Exercise 10.1 Q4, Q6-Q9, Review 10, Exercise 11) and every result is computed here and compared with the printed answer. */
(function (root) {
  'use strict';
  const NS = root.SBVR, G = root.SBSOL_GEO; if (!NS || !NS.sol || !G) return;
  const warn = m => { if (root.console) console.warn('sol_m10_u10_11: ' + m); };
  const f = (x, d) => String(+Number(x).toFixed(d === undefined ? 2 : d));
  const ok = (label, got, exp, tol) => { if (Math.abs(got - exp) > (tol === undefined ? 0.006 : tol)) { warn(label + ': computed ' + got + ' but the book prints ' + exp); return false; } return true; };
  const tx = (text, m) => ({ text, m });
  const DQ = ["Find the tangent length from a point 10 cm from the centre of a circle of radius 6 cm.", "A tangent from an external point is 8 cm long; the point is 9 cm from the centre. Find the radius.", "A chord AC is extended through C. From external point P, tangent PB is drawn. Prove ∠PBC=∠BAP.", "In each of the three printed figures, AB intersects the circle. Find the marked x using the tangent-radius perpendicular relation and Pythagoras.", "The radius is 8 cm. Two tangents from an external point P make an angle of 60° with each other. Find OP.", "PA and PB are tangents to a circle with centre O. Find x and y in each of the four printed figures.", "In the figure below, VA and VB are tangents to P, the radius of the circle is 3 cm and VA=6 cm. Find (i) VB, (ii) AP, (iii) PV and (iv) XY.", "In circle N, verify that line l is a tangent.", "Verify that AB is tangent to the circle at B.", "If AD, DE and BE are tangents to the circle as shown, prove AD+BE=DE.", "Two circles have radii 8 cm and 3 cm and touch externally. Find the distance between their centres.", "The centres of two internally touching circles are 5 cm apart. If the larger radius is 17 cm, find the smaller radius.", "In a circle, a 10 cm long chord is 12 cm from the centre. What is the length of a chord at a distance of 5 cm from the centre?", "A chord 18 cm long is in a circle of radius 15 cm. Find the distance from the centre to the chord midpoint.", "Find the length of a chord 6 cm from the centre of a circle of radius 10 cm.", "A chord is 8 cm long and 3 cm from the centre. Find the circle’s diameter.", "A circle has radius 8 cm and a chord 12 cm long. Find the chord’s distance from the centre.", "A chord 9 cm long is in a circle of radius 7.5 cm. Find its distance from the centre.", "In the figure, ACB is called _____.", "If OT is a radius to the point of contact and PQ is tangent, then _____.", "Two tangents drawn from the same external point are ____ in length.", "If two circles touch externally, the distance between their centres is _____.", "In the diagram, B is a point of tangency. Find the radius r of circle C.", "In the figure, BP is tangent to the circle with centre O. Given ∠APO=33°, find ∠PBA.", "O is the centre of the circle through A and B. TA is tangent at A and TB is a secant. Given ∠AOT=64°, find (i) ∠ATB and (ii) ∠TAB.", "Given PA and PB are tangents to the circles with centre O, find the values of the unknowns in (a) and (b).", "Given that O is the centre of each of the six circles, find x and y in each printed diagram (i)–(vi).", "In ⊙Q, KL=LM. If CK=2x+3 and CM=4x, find x.", "OP has radius 3 and chord AB subtends a 90° central angle. What is the length of AB?", "In the accompanying diagram of circle O, AB=CD. Which statement is true?", "In a circle, two perpendicular diameters are drawn. Show that joining their endpoints in order forms a square.", "In a circle with centre O, AC is a diameter and ∠AOB=130°. Find ∠ADB, ∠BDC and m⌢BC.", "Chords AB and CD meet at E outside the circle. Prove (a) ∠A=∠C, (b) ∠1=∠2 and (c) ΔADE and ΔCBE are equiangular."];   // the question text each pack answers, in the order of the Class 10 data (Units 10 then 11)
  let nPack = 0;
  const add = (q, steps, b) => G.add(DQ[nPack++] || q, steps, b);
  const sq = Math.sqrt, rad = Math.PI / 180, deg = x => x / rad, mid = G.mid;
  const L = x => f(x, 2);
  const SA = { A: { dx: -14, dy: 14 }, B: { dx: 6, dy: 14 } };

  /* circle O at the origin, external point P=(d,0), tangent points A (above) and B (below) */
  function tanBoard(r, d, o) {
    o = o || {}; const a = r * r / d, h = r * sq(d * d - r * r) / d, P = { O: [0, 0], P: [d, 0], A: [a, h], B: [a, -h] };
    const b = G.board(P, { extent: [[-r, -r], [r, r]], alt: o.alt || 'Circle with two tangents from P' });
    b.circle([0, 0], r, 0).pt('O', 0, { dx: -12, dy: 14 }).pt('P', 0, { dx: 6, dy: 14 });
    b.seg('P', 'A', 1, { label: o.t }).seg('P', 'B', 1, { label: o.t2 }).pts(['A', 'B'], 1, { A: { dy: -8 }, B: { dy: 14 } });
    b.seg('O', 'A', 2, { color: 'orange', label: o.r }).seg('O', 'B', 2, { color: 'orange' }).right('A', 'O', 'P', 2).right('B', 'O', 'P', 2);
    b.seg('O', 'P', 3, { dash: true, color: 'green', label: o.d });
    return b;
  }
  function chordBoard(r, d, o) {
    o = o || {}; const half = sq(r * r - d * d), P = { O: [0, 0], M: [0, d], A: [-half, d], B: [half, d] };
    const b = G.board(P, { extent: [[-r, -r], [r, r]], alt: o.alt || 'Circle with a chord and the perpendicular from the centre' });
    b.circle([0, 0], r, 0).pt('O', 0, { dy: 14, dx: 6 });
    b.seg('A', 'B', 1, { label: o.len }).seg('O', 'M', 1, { dash: true, color: 'orange', label: o.dist }).pt('M', 1, { dy: -8, dx: 6 }).right('M', 'O', 'B', 1).pts(['A', 'B'], 1, { A: { dx: -14 }, B: { dx: 6 } });
    b.seg('O', 'A', 2, { color: 'green', label: o.rad });
    return b;
  }

  /* ---------- Exercise 10.1 ---------- */
  (function () {
    const t = sq(100 - 36); if (!ok('10.1 Q1', t, 8, 1e-9)) return;
    add('Find the length of a tangent drawn to a circle of radius 6 cm from a point at a distance of 10 cm from the centre of the circle.', [
      'Let P be the point, O the centre and T the point of contact. The radius OT is perpendicular to the tangent PT (a radius is perpendicular to a tangent at the point of contact).',
      'So OTP is a right triangle with the right angle at T: OT = 6 (radius) and OP = 10 (hypotenuse).', tx('Pythagoras:', 'PT=\\sqrt{OP^{2}-OT^{2}}=\\sqrt{100-36}=\\sqrt{64}=8\\text{ cm}')], tanBoard(6, 10, { r: '6', d: '10', t: '?' }));
  })();

  (function () {
    const r = sq(81 - 64); if (!ok('10.1 Q2', r, sq(17), 1e-9)) return;
    add('Find the radius of a circle if the length of the tangent drawn is 8 cm and distance from the centre of the circle to the point outside the circle is 9 cm.', [
      'The radius to the point of contact is perpendicular to the tangent, so the radius, the tangent and the line from the centre to the outside point form a right triangle with hypotenuse 9.',
      tx('Pythagoras: r² + 8² = 9²', 'r=\\sqrt{9^{2}-8^{2}}=\\sqrt{81-64}=\\sqrt{17}\\text{ cm}\\approx ' + L(r) + '\\text{ cm}')], tanBoard(sq(17), 9, { r: '?', d: '9', t: '8' }));
  })();

  (function () {
    const O = [0, 0], r = 3, ang = (d) => [r * Math.cos(d * rad), r * Math.sin(d * rad)], A = ang(200), C = ang(75), B = ang(120), Pt = [A[0] + (C[0] - A[0]) * 2.6, A[1] + (C[1] - A[1]) * 2.6];
    const tb = (() => { const k = ((Pt[0]) * 0 + 0); return k; })();
    // tangent point B must satisfy PB tangent: use the tangent point on the circle with |PB|^2 = PC*PA
    const d = Math.hypot(Pt[0], Pt[1]), Bt = (() => { const a = r * r / d, h = r * sq(d * d - r * r) / d, ux = Pt[0] / d, uy = Pt[1] / d; return [a * ux - h * uy, a * uy + h * ux]; })();
    const b = G.board({ A, C, P: Pt, B: Bt, O }, { extent: [[-r, -r], [r, r]], alt: 'Circle with chord AC produced to P and tangent PB' });
    b.circle(O, r, 0).seg('A', 'P', 0).pts(['A', 'C', 'P'], 0, { A: { dx: -14 }, C: { dy: -8 }, P: { dx: 6 } }).seg('P', 'B', 0, { color: 'orange' }).pt('B', 0, { dy: -8 });
    b.seg('B', 'C', 1, { color: 'green' }).seg('B', 'A', 2, { color: 'purple' });
    add('A chord AC of a circle is produced to P. From P a tangent PB to the circle is drawn. Prove that m∠PBC = m∠BAP.', [
      'Draw the chords BC and BA. PB is a tangent at B and BC is a chord drawn from the point of contact.',
      'Alternate segment theorem: the angle between a tangent and a chord through the point of contact equals the angle in the alternate segment. So ∠PBC (between tangent PB and chord BC) equals ∠BAC, the angle at A on the other side of the chord BC.',
      tx('Since C lies between A and P on the line AP, ∠BAC and ∠BAP are the same angle:', 'm\\angle PBC=m\\angle BAC=m\\angle BAP'), 'Hence m∠PBC = m∠BAP.',
      tx('Check with similar triangles: triangles PBC and PAB share ∠P and, by the tangent–secant theorem, PB² = PC · PA, so PB / PC = PA / PB.', '\\triangle PBC\\sim\\triangle PAB\\ \\Rightarrow\\ \\angle PBC=\\angle PAB')], b);
  })();

  (function () {
    const a1 = 5 - 3, aa = 407 / 26, a3 = sq(36 + 64); if (!ok('10.1 Q4', a1, 2) || !ok('10.1 Q4', aa, 15.65) || !ok('10.1 Q4', a3, 10)) return;
    const b = G.board({ O: [0, 0], A: [0, -3], B: [-4, -3] }, { extent: [[-5, -3], [5, 3]], alt: 'Tangent AB at A with OA = 3, AB = 4, C where OB meets the circle' });
    b.circle([0, 0], 3, 0).pt('O', 0, { dy: -8, dx: 6 }).seg([-6, -3], [4, -3], 0, { color: 'grey' }).seg('O', 'A', 0, { label: '3', color: 'orange' }).pts(['A', 'B'], 0, { A: { dy: 14 }, B: { dx: -14, dy: 14 } }).right('A', 'O', 'B', 0);
    b.seg('A', 'B', 1, { label: '4' }).seg('O', 'B', 2, { dash: true, color: 'green', label: '5' }).pt([-2.4, -1.8], 3, { label: 'C', dx: 6, dy: -6 }).seg([-2.4, -1.8], 'B', 3, { color: 'purple', label: 'a' });
    add('In the following figures AB intersects the circle, find a. [(i), (ii) and (iii) of Exercise 10.1 Q4]', [
      'Figure (i): the line through A and B is a tangent at A, with the radius OA = 3 perpendicular to it and AB = 4. C is the point where OB meets the circle, so OC = 3 and a = BC.',
      tx('Pythagoras in the right triangle OAB:', 'OB=\\sqrt{3^{2}+4^{2}}=5'), tx('', 'a=BC=OB-OC=5-3=2\\text{ cm}'),
      'Figure (ii): the radius OA = a is perpendicular to the tangent AB = 24. The line OB passes through the circle at a distance a from O and the remaining part is 13, so OB = a + 13.',
      tx('Pythagoras in the right triangle OAB:', '(a+13)^{2}=a^{2}+24^{2}\\ \\Rightarrow\\ a^{2}+26a+169=a^{2}+576'), tx('Solve for a:', '26a=407\\ \\Rightarrow\\ a=\\frac{407}{26}\\approx ' + L(aa)),
      'Figure (iii): the circle has radius 4 (DO = 4) and passes through D and the foot A on BC, so AD = 2 × 4 = 8. With BA = 6 in the right triangle ABD, a = DC = DB.', tx('', 'a=DB=\\sqrt{AB^{2}+AD^{2}}=\\sqrt{6^{2}+8^{2}}=\\sqrt{100}=10')], b);
  })();

  (function () {
    const OP = 8 / Math.sin(30 * rad); if (!ok('10.1 Q5', OP, 16, 1e-9)) return;
    add('If the radius of a circle is 8 cm. Tangents drawn from an external point P make an angle of 60°. Find the distance between the centre of the circle and the point P.', [
      'The line OP bisects the angle between the two tangents, so ∠OPA = 60° / 2 = 30°.', 'The radius OA is perpendicular to the tangent PA, so triangle OAP has a right angle at A, with OA = 8 and ∠OPA = 30°.',
      tx('sin 30° = opposite / hypotenuse:', '\\sin30^{\\circ}=\\frac{OA}{OP}=\\frac{8}{OP}\\ \\Rightarrow\\ OP=\\frac{8}{1/2}=16\\text{ cm}')], tanBoard(8, 16, { r: '8', d: '?', alt: 'Tangents from P at 60° to each other' }));
  })();

  (function () {
    const y3 = 10 * Math.tan(56 * rad); if (!ok('10.1 Q6', y3, 14.8, 0.05)) return;
    add('Given that PA and PB are tangents to the circle, with centre O, find the values of x and y in each of the following figures.', [
      'Facts used: the two tangent segments from P are equal (PA = PB), OP bisects ∠AOB and ∠APB, and a radius is perpendicular to the tangent (∠OAP = ∠OBP = 90°).',
      tx('(i) ∠BOP = 49° is marked. OP bisects ∠AOB, so x = ∠AOP = 49°. PA = PB gives:', 'x=49^{\\circ},\\qquad y=PB=PA=14\\text{ cm}'),
      tx('(ii) ∠OPB = 32° and the right angle at B give ∠BOP = 90° − 32° = 58°. OP bisects ∠AOB, so x = ∠AOP = 58°. Equal tangents:', 'x=58^{\\circ},\\qquad y=PA=PB=15\\text{ cm}'),
      tx('(iii) ∠AOB = 112° is marked, so ∠BOP = 112° / 2 = 56°. In the right triangle OBP (OB = 10) the angle x at P is:', 'x=90^{\\circ}-56^{\\circ}=34^{\\circ}'), tx('and y = BP is opposite ∠BOP:', 'y=BP=OB\\tan56^{\\circ}=10\\times ' + f(Math.tan(56 * rad), 4) + '\\approx ' + f(y3, 1) + '\\text{ cm}'),
      tx('(iv) ∠APO = 35° is marked, so ∠APB = 70°. PA = PB makes triangle PAB isosceles, so the base angles are equal:', 'y=\\angle PAB=\\frac{180^{\\circ}-70^{\\circ}}{2}=55^{\\circ}'),
      tx('and x = ∠OBA is the part of the right angle ∠OBP not used by ∠PBA:', 'x=90^{\\circ}-55^{\\circ}=35^{\\circ}')], tanBoard(10, 10 / Math.cos(56 * rad) * Math.cos(56 * rad) * 0 + 10 / Math.sin(34 * rad), { r: '10', alt: 'Figure (iii): circle with tangents PA and PB' }));
  })();

  (function () {
    const PV = sq(36 + 9), XV = PV - 3; if (!ok('10.1 Q7', XV, 3 * (sq(5) - 1), 1e-9)) return;
    const P = [0, 0], V = [PV, 0], a = 9 / PV, h = 3 * sq(PV * PV - 9) / PV, A = [a, h], B = [a, -h], X = [3, 0];
    const b = G.board({ P, V, A, B, X }, { extent: [[-3, -3], [3, 3]], alt: 'Circle with centre P, tangents VA and VB, and X where PV meets the circle' });
    b.circle(P, 3, 0).pt('P', 0, { dx: -12, dy: 14 }).pt('V', 0, { dx: 6, dy: 14 }).seg('V', 'A', 1, { label: '6' }).seg('V', 'B', 1).pts(['A', 'B'], 1, { A: { dy: -8 }, B: { dy: 14 } });
    b.seg('P', 'A', 3, { color: 'orange', label: '3' }).right('A', 'P', 'V', 3).seg('P', 'V', 4, { color: 'green', dash: true }).pt('X', 5, { dy: 14 });
    add('In the figure below, VA and VB are tangent to P, the radius of P is 3 cm, and VA = 6 cm. Find the following. (i) VB (ii) AP (iii) PV (iv) XV', [
      'Tangents drawn from the same external point are equal in length.', tx('(i)', 'VB=VA=6\\text{ cm}'), tx('(ii) AP is a radius:', 'AP=3\\text{ cm}'),
      'The radius PA is perpendicular to the tangent VA, so triangle PAV has a right angle at A.', tx('(iii) Pythagoras:', 'PV=\\sqrt{PA^{2}+VA^{2}}=\\sqrt{9+36}=\\sqrt{45}=3\\sqrt5\\text{ cm}\\approx ' + L(PV) + '\\text{ cm}'),
      tx('(iv) X lies on PV and on the circle, so PX = 3 and XV is what is left of PV:', 'XV=PV-PX=3\\sqrt5-3=3(\\sqrt5-1)\\text{ cm}\\approx ' + L(XV) + '\\text{ cm}')], b);
  })();

  (function () {
    const rs = sq(9 + 16); if (!ok('10.1 Q8', rs, 3 + 2)) return;
    const b = G.board({ N: [0, 0], T: [0, 3], S: [4, 3], C: [2.4, 1.8] }, { extent: [[-3, -3], [6, 3]], alt: 'Circle N, line l and the numbers 3, 4 and 2' });
    b.circle([0, 0], 3, 0).pt('N', 0, { dy: 14, dx: 6 }).seg([-4, 3], [6, 3], 0, { color: 'grey', label: 'l' }).seg('N', 'T', 1, { color: 'orange', label: '3' }).pt('T', 1, { dy: -8, dx: -8 }).seg('T', 'S', 1, { label: '4' }).pt('S', 1, { dy: -8 });
    b.seg('N', 'C', 2, { color: 'purple' }).seg('C', 'S', 2, { color: 'green', label: '2' }).right('T', 'N', 'S', 3);
    add('In circle N, verify that line ℓ is a tangent. [Figure: the segments 3 and 4 from N to ℓ, and 2 beyond the circle on the slanted line]', [
      'Read the figure: N is the centre; NT = 3 meets ℓ at T, TS = 4 lies along ℓ, and the slanted segment from N to S leaves the circle after the radius and then has 2 more units to S.',
      tx('Distance NS from the Pythagoras relation for the sides 3 and 4:', 'NS=\\sqrt{3^{2}+4^{2}}=5'),
      tx('The slanted segment is also radius + 2, so the radius is:', 'r=5-2=3'), 'So NT = 3 equals the radius: T is on the circle. Also 3² + 4² = 5², so by the converse of Pythagoras the angle at T is a right angle, NT ⟂ ℓ.',
      'A line that meets the circle at T and is perpendicular to the radius NT at T is a tangent. So ℓ is a tangent to the circle.'], b);
  })();

  (function () {
    if (6 * 6 + 8 * 8 !== 10 * 10) return;
    const b = G.board({ C: [0, 0], B: [0, -8], A: [-6, -8] }, { extent: [[-8, -8], [8, 8]], alt: 'Circle C, radius CB = 8, with AB = 6 and CA = 10' });
    b.circle([0, 0], 8, 0).pt('C', 0, { dy: -8, dx: 6 }).seg([-9, -8], [5, -8], 0, { color: 'grey' }).pt('B', 0, { dy: 14 }).pt('A', 0, { dx: -14, dy: 14 }).seg('C', 'B', 1, { color: 'orange', label: '8' }).seg('A', 'B', 1, { label: '6' }).seg('C', 'A', 2, { color: 'green', label: '10' }).right('B', 'C', 'A', 3);
    add('Verify that AB is tangent to C at B. [Figure: CB = 8, AB = 6, CA = 10]', [
      'CB = 8 is the radius to B, so B is on the circle.', tx('Test whether the triangle CBA has a right angle at B (converse of Pythagoras):', '6^{2}+8^{2}=36+64=100=10^{2}'),
      'The equality holds, so ∠CBA = 90° and the radius CB is perpendicular to AB at B.', 'A line through a point of the circle perpendicular to the radius at that point is a tangent. So AB is tangent to the circle at B.'], b);
  })();

  (function () {
    const O = [0, 0], r = 3, C = [0, 3], D = [-5, 3], E = [5, 3];
    const refl = (Pn, Q) => { const l = Math.hypot(Q[0], Q[1]), ux = Q[0] / l, uy = Q[1] / l, dot = Pn[0] * ux + Pn[1] * uy; return [2 * dot * ux - Pn[0], 2 * dot * uy - Pn[1]]; };
    const A = refl(C, D), B = refl(C, E);
    const b = G.board({ O, C, D, E, A, B }, { extent: [[-r, -r], [r, r]], alt: 'Circle with tangents DA, DE and EB' });
    b.circle(O, r, 0).seg('D', 'E', 0).seg('D', 'A', 0).seg('E', 'B', 0).pts(['D', 'E', 'C', 'A', 'B'], 0, { D: { dx: -14 }, E: { dx: 6 }, C: { dy: -8 }, A: { dx: -14, dy: 14 }, B: { dx: 6, dy: 14 } });
    b.seg('D', 'C', 1, { color: 'orange' }).seg('D', 'A', 1, { color: 'orange' }).seg('E', 'C', 2, { color: 'purple' }).seg('E', 'B', 2, { color: 'purple' });
    add('If AD, DE and BE are tangents to a circle as shown prove that AD + BE = DE.', [
      'DE touches the circle at C, so C divides DE into DC and CE: DE = DC + CE.', 'From the external point D the two tangent segments DA and DC are equal.', tx('', 'DA=DC'),
      'From the external point E the two tangent segments EB and EC are equal.', tx('', 'EB=EC'), tx('Add the two equations and use DE = DC + CE:', 'AD+BE=DC+CE=DE')], b);
  })();

  /* ---------- Exercise 10.2 ---------- */
  function twoCircles(R, r, d, alt) {
    const P = { O: [0, 0], Q: [d, 0] }, b = G.board(P, { extent: [[-R, -R], [d + r, R]], alt });
    b.circle([0, 0], R, 0, { color: 'blue' }).circle([d, 0], r, 0, { color: 'purple' }).pt('O', 0, { dy: 14, dx: -4 }).pt('Q', 0, { label: "O′", dy: 14, dx: -4 }).seg('O', 'Q', 1, { color: 'green', label: String(d) });
    return b;
  }
  (function () {
    add('If two circles with radii 8 cm and 3 cm respectively touch each other externally, then what is the distance between their centres?', ['When two circles touch externally, the point of contact lies on the line of centres, between them.', 'So the distance between the centres is the sum of the radii.', tx('', 'OO^{\\prime}=R+r=8+3=11\\text{ cm}')], twoCircles(8, 3, 11, 'Two circles touching externally'));
  })();
  (function () {
    const r = 17 - 5; if (r !== 12) return;
    const P = { O: [0, 0], Q: [5, 0] }, b = G.board(P, { extent: [[-17, -17], [17, 17]], alt: 'Two circles touching internally' });
    b.circle([0, 0], 17, 0).circle([5, 0], 12, 0, { color: 'purple' }).pt('O', 0, { dx: -12, dy: 14 }).pt('Q', 0, { label: "O′", dx: 4, dy: 14 }).seg('O', 'Q', 1, { color: 'green', label: '5' });
    add('The distance between the centres of two circles touching internally is 5 cm. The radius of the bigger circle is 17 cm. What is the radius of the smaller circle?', ['When two circles touch internally, the distance between the centres is the difference of the radii: OO′ = R − r.', tx('Substitute OO′ = 5 and R = 17:', '5=17-r\\ \\Rightarrow\\ r=17-5=12\\text{ cm}')], b);
  })();
  (function () {
    const r = sq(144 + 25), h = sq(r * r - 25); if (!ok('10.2 Q3', r, 13, 1e-9) || !ok('10.2 Q3', 2 * h, 24, 1e-9)) return;
    add('In a circle a 10 cm long chord is at a distance of 12 cm from the centre. What is the length of a chord at a distance of 5 cm from the centre?', ['First find the radius from the given chord: its half-length is 10 / 2 = 5 and its distance from the centre is 12.', tx('', 'r=\\sqrt{12^{2}+5^{2}}=\\sqrt{169}=13\\text{ cm}'),
      'Now the second chord is at distance 5 from the centre of the same circle (radius 13).', tx('Half-chord:', '\\sqrt{13^{2}-5^{2}}=\\sqrt{144}=12'), tx('The chord is twice the half-chord:', '2\\times 12=24\\text{ cm}')], chordBoard(13, 5, { rad: '13', dist: '5', len: '?' }));
  })();
  (function () {
    const d = sq(225 - 81); if (!ok('10.2 Q4', d, 12, 1e-9)) return;
    add('A chord is 18 cm long. The radius of the circle is 15 cm. What is the distance of the midpoint of the chord from the centre of the circle?', ['The perpendicular from the centre to a chord meets it at its midpoint, so the required distance is the perpendicular distance d.', 'Half the chord is 18 / 2 = 9 cm.', tx('Right triangle with hypotenuse 15 and legs 9 and d:', 'd=\\sqrt{15^{2}-9^{2}}=\\sqrt{225-81}=\\sqrt{144}=12\\text{ cm}')], chordBoard(15, 12, { rad: '15', dist: '?', len: '18' }));
  })();
  add('What is the length of a chord at distance of 6 cm from the centre of a circle of radius 10 cm?', ['Half the chord is the leg of a right triangle with hypotenuse 10 (radius) and other leg 6 (distance).', tx('', '\\text{half-chord}=\\sqrt{10^{2}-6^{2}}=\\sqrt{64}=8'), tx('The chord is twice that:', '2\\times 8=16\\text{ cm}')], chordBoard(10, 6, { rad: '10', dist: '6', len: '?' }));
  add('The distance of a chord from the centre of a circle is 3 cm, and the length of the chord is 8 cm. What is the diameter?', ['Half the chord is 8 / 2 = 4 cm.', tx('Radius from the right triangle with legs 3 and 4:', 'r=\\sqrt{3^{2}+4^{2}}=5\\text{ cm}'), tx('The diameter is twice the radius:', 'd=2\\times 5=10\\text{ cm}')], chordBoard(5, 3, { rad: '?', dist: '3', len: '8' }));
  (function () {
    const d = sq(64 - 36); if (!ok('10.2 Q7', d, 2 * sq(7), 1e-9)) return;
    add('The radius of a circle is 8 cm and one of the chords is of 12 cm. What is the distance of the chord from the centre?', ['Half the chord is 12 / 2 = 6 cm.', tx('Right triangle with hypotenuse 8 (radius) and legs 6 and d:', 'd=\\sqrt{8^{2}-6^{2}}=\\sqrt{28}=2\\sqrt7\\text{ cm}\\approx ' + L(d) + '\\text{ cm}')], chordBoard(8, d, { rad: '8', dist: '?', len: '12' }));
  })();
  (function () {
    const d = sq(56.25 - 20.25); if (!ok('10.2 Q8', d, 6, 1e-9)) return;
    add('The length of a chord of a circle of radius 7.5 cm is 9 cm. What is its distance from the centre of the circle?', ['Half the chord is 9 / 2 = 4.5 cm.', tx('Right triangle with hypotenuse 7.5 and legs 4.5 and d:', 'd=\\sqrt{7.5^{2}-4.5^{2}}=\\sqrt{56.25-20.25}=\\sqrt{36}=6\\text{ cm}')], chordBoard(7.5, 6, { rad: '7.5', dist: '?', len: '9' }));
  })();

  /* ---------- Review Exercise 10 ---------- */
  add('In the figure, ACB is called _____. [options: an arc, a chord, a secant, a diameter]', ['In the figure, A and B are two points on the circle and C is a point on the curve between them.', 'ACB names the curved part of the circle from A to B through C, which is an arc. (The straight segment AB would be a chord.)', 'The answer is: an arc.']);
  add('In a circle with centre O, if OT is the radial segment and PTQ is the tangent line, then _____.', ['The radial segment OT joins the centre to the point of contact T.', 'Theorem 10.2: a tangent is perpendicular to the radius drawn to the point of contact.', 'So OT ⟂ PQ. The answer is: OT ⊥ PQ.']);
  add('Two tangents drawn to a circle from a point outside it are of _____ in length.', ['Take tangents PA and PB from an external point P. The radii OA and OB are equal and perpendicular to the tangents, and OP is common to the right triangles OAP and OBP.', tx('By the hypotenuse–side rule the triangles are congruent, so:', 'PA=PB'), 'The tangents are equal in length. The answer is: equal.']);

  add('If two circles touch externally, the distance between their centres is _____.', ['When two circles touch externally, they meet at one point on the line of centres, with the circles on opposite sides of that point.', 'The distance between the centres is the radius of one plus the radius of the other.', tx('', 'OO^{\prime}=R+r'), 'The answer is: the sum of their radii.'], twoCircles(5, 3, 8, 'Two circles touching externally'));

  (function () {
    const r = (6400 - 2500) / 100; if (!ok('R10 Q4', r, 39, 1e-9)) return;
    const B = [0, 0], C = [0, 39], A = [80, 0], X = [39 / 89 * 80, 39 - 39 * 39 / 89];
    const b = G.board({ A, B, C, X }, { extent: [[-39, -10], [39, 78]], alt: 'Circle C with tangent AB: AB = 80 ft, the part of AC outside the circle is 50 ft' });
    b.circle(C, 39, 0).pt('C', 0, { dx: 8, dy: 14 }).pt('B', 0, { dx: -6, dy: 14 }).pt('A', 0, { dy: 14 }).seg('A', 'B', 0, { label: '80 ft', color: 'orange' }).seg('C', 'B', 1, { color: 'green', label: 'r' }).right('B', 'C', 'A', 1);
    b.seg('C', 'A', 2, { dash: true }).pt([39 * 80 / 89, 39 - 39 * 39 / 89], 2, { label: '', dy: -8 });
    add('In the diagram, B is a point of tangency. Find the radius r of ⊙C. [Figure: AB = 80 ft; the part of AC outside the circle is 50 ft]', [
      'AB is a tangent and CB is the radius to the point of contact, so ∠CBA = 90°.', 'The line AC goes from A through the circle to the centre C. The part outside the circle is 50 ft and the part inside is a radius r, so AC = 50 + r.',
      tx('Pythagoras in the right triangle CBA:', '(50+r)^{2}=r^{2}+80^{2}'), tx('Expand and cancel r²:', '2500+100r+r^{2}=r^{2}+6400\\ \\Rightarrow\\ 100r=3900'), tx('', 'r=39\\text{ ft}'), tx('Check:', 'AC=50+39=89,\\quad 80^{2}+39^{2}=6400+1521=7921=89^{2}')], b);
  })();

  (function () {
    const x = 33 * 2; if (90 - x !== 24) return;
    const r = 5, O = [0, 0], A = [-r, 0], P = [r * Math.cos(66 * rad), r * Math.sin(66 * rad)], B = [r / Math.cos(66 * rad), 0];
    const b = G.board({ O, A, P, B }, { extent: [[-r, -r], [r, r]], alt: 'Circle O with AOB a straight line and tangent BP' });
    b.circle(O, r, 0).pt('O', 0, { dy: 14, dx: -4 }).seg('A', 'B', 0).seg('A', 'P', 0).seg('B', 'P', 0, { color: 'orange' }).pts(['A', 'B', 'P'], 0, { A: { dx: -14 }, B: { dx: 6 }, P: { dy: -8 } }).seg('O', 'P', 1, { color: 'green' });
    add('In the figure, BP is a tangent to the circle with centre O. Given that ∠APO = 33°, find ∠PBA.', [
      'OA and OP are radii, so triangle OAP is isosceles and the base angles are equal.', tx('', '\\angle OAP=\\angle APO=33^{\\circ}'),
      tx('The exterior angle POB of triangle OAP equals the sum of the two opposite interior angles:', '\\angle POB=33^{\\circ}+33^{\\circ}=66^{\\circ}'), 'BP is a tangent and OP is the radius to P, so ∠OPB = 90°.',
      tx('Angle sum of the right triangle OPB:', '\\angle PBA=\\angle PBO=180^{\\circ}-90^{\\circ}-66^{\\circ}=24^{\\circ}')], b);
  })();

  (function () {
    const ang = 180 - 90 - 64, ob = 116, oab = (180 - ob) / 2; if (ang !== 26 || 90 + oab !== 122) return;
    const r = 3, O = [0, 0], A = [-r * Math.cos(64 * rad), r * Math.sin(64 * rad)], Bp = [r, 0], T = [-r / Math.cos(64 * rad), 0];
    const b = G.board({ O, A, B: Bp, T }, { extent: [[-r, -r], [r, r]], padL: 0, alt: 'Circle O, tangent TA and the line TOB' });
    b.circle(O, r, 0).pt('O', 0, { dy: 14, dx: -4 }).pts(['A', 'B', 'T'], 0, { A: { dy: -8 }, B: { dx: 6 }, T: { dx: -12, dy: 14 } }).seg('T', 'B', 0).seg('T', 'A', 0, { color: 'orange' }).seg('O', 'A', 1, { color: 'green' }).right('A', 'O', 'T', 1).seg('A', 'B', 3, { color: 'purple' });
    add('In the figure, O is the centre of the circle passing through the points A and B. TA is a tangent to the circle at A and TOB is a straight line. Given that ∠AOT = 64°, find (i) ∠ATB, (ii) ∠TAB.', [
      'TA is a tangent at A and OA is the radius to A, so ∠OAT = 90°.', tx('(i) Angle sum of triangle AOT (∠ATB is the angle at T):', '\\angle ATB=180^{\\circ}-90^{\\circ}-64^{\\circ}=26^{\\circ}'),
      tx('(ii) T, O, B are in a straight line, so ∠AOB = 180° − 64°:', '\\angle AOB=116^{\\circ}'), tx('Triangle OAB is isosceles (OA = OB), so:', '\\angle OAB=\\frac{180^{\\circ}-116^{\\circ}}{2}=32^{\\circ}'),
      tx('Since O lies inside ∠TAB (it is on TB):', '\\angle TAB=\\angle TAO+\\angle OAB=90^{\\circ}+32^{\\circ}=122^{\\circ}')], b);
  })();

  (function () {
    const i = sq(25 + 144) - 5, j = Math.acos(5 / 13) / rad, k = 176 / 14, l = Math.acos(k / (k + 7)) / rad;
    if (!ok('R10 Q7', i, 8, 1e-9) || !ok('R10 Q7', j, 67.4, 0.05) || !ok('R10 Q7', k, 88 / 7, 1e-9) || !ok('R10 Q7', l, 50, 0.05)) return;
    add('Given that PA and PB are tangents to each of the following circles with centre O, find the values of the unknowns. [(a): OB = 5 m, BP = 12 m; (b): BP = 15 cm, the part of OP outside the circle is 7 cm]', [
      'In both figures OB is the radius to the point of contact B, so ∠OBP = 90° and OBP is a right triangle.', tx('(a) OP is the hypotenuse of the triangle with OB = 5 and BP = 12:', 'OP=\\sqrt{5^{2}+12^{2}}=13\\text{ m}'),
      tx('The unknown i is the part of OP outside the circle (OP minus the radius 5):', 'i=13-5=8\\text{ m}'), tx('The angle j at O:', '\\cos j=\\frac{OB}{OP}=\\frac{5}{13}\\ \\Rightarrow\\ j=\\cos^{-1}\\frac{5}{13}\\approx ' + f(j, 1) + '^{\\circ}'),
      'In (b), OB = k (the radius), the part of OP outside the circle is 7, so OP = k + 7, and BP = 15.', tx('Pythagoras:', '(k+7)^{2}=k^{2}+15^{2}\\ \\Rightarrow\\ 14k+49=225\\ \\Rightarrow\\ k=\\frac{176}{14}=\\frac{88}{7}\\approx ' + f(k, 1) + '\\text{ cm}'),
      tx('The angle l at O:', '\\cos l=\\frac{k}{k+7}=\\frac{88/7}{137/7}=\\frac{88}{137}\\ \\Rightarrow\\ l\\approx ' + f(l, 1) + '^{\\circ}')], tanBoard(5, 13, { r: '5', t: '12', d: '13', alt: 'Figure (a): OB = 5, BP = 12' }));
  })();

  /* ---------- Unit 11: Exercise 11 and Review 11 ---------- */
  (function () {
    const x3 = sq(169 - 25), y3 = Math.acos(5 / 13) / rad, x4 = sq(289 - 169), y4 = Math.acos(8 / 17) / rad, x5 = sq(400 - 144), y5 = Math.acos(12 / 20) / rad, R6 = sq(25 + 36), x6 = sq(R6 * R6 - 25), y6 = Math.acos(5 / R6) / rad;
    if (!ok('11 Q1', x3, 12, 1e-9) || !ok('11 Q1', y3, 67.4, 0.05) || !ok('11 Q1', x4, 11, 0.06) || !ok('11 Q1', y4, 61.9, 0.05) || !ok('11 Q1', x5, 16, 1e-9) || !ok('11 Q1', y5, 53.1, 0.05) || !ok('11 Q1', x6, 6, 1e-9) || !ok('11 Q1', y6, 50.2, 0.05)) return;
    add('Given that O is the centre of each of the following circles, find the value of x and y in the following cases. [(i)–(vi) of Exercise 11 Q1]', [
      'Facts used: the perpendicular from the centre to a chord bisects the chord; equal chords are equidistant from the centre; and the radius, the half-chord and the distance form a right triangle.',
      tx('(i) The two chords are marked equal, so x = 12 (the second chord has the same length as the 12 chord). The angle y is marked as a right angle (perpendicular from the centre):', 'x=12,\\qquad y=90^{\\circ}'),
      tx('(ii) The chord 22 and the other chord carry equal marks, so they are equal. The perpendicular from the centre bisects the chord, so x (half of the second chord) is half of 22; y is the marked right angle:', 'x=\\frac{22}{2}=11,\\qquad y=90^{\\circ}'),
      tx('(iii) Right triangle with hypotenuse (radius) 13 and leg 5 (distance from O). The half-chord x is the other leg:', 'x=\\sqrt{13^{2}-5^{2}}=12'), tx('and the angle y at O between the leg 5 and the radius 13:', '\\cos y=\\frac{5}{13}\\ \\Rightarrow\\ y\\approx ' + f(y3, 1) + '^{\\circ}'),
      tx('(iv) The top chord 26 has half-chord 13; the radius is 17 (the line from O to the lower end of the chord 16). The distance x from O to the chord 26:', 'x=\\sqrt{17^{2}-13^{2}}=\\sqrt{120}\\approx ' + f(x4, 2) + '\\approx 11'),
      tx('The angle y between the radius 17 and the chord 16 (half = 8):', '\\cos y=\\frac{8}{17}\\ \\Rightarrow\\ y\\approx ' + f(y4, 1) + '^{\\circ}'),
      tx('(v) The chord 20 is the hypotenuse of the right triangle at O with one leg 12 (as printed). The other leg x:', 'x=\\sqrt{20^{2}-12^{2}}=\\sqrt{256}=16'), tx('and the angle y between the chord and the leg 12:', '\\cos y=\\frac{12}{20}=0.6\\ \\Rightarrow\\ y\\approx ' + f(y5, 1) + '^{\\circ}'),
      'Note: in (v) the two legs 12 and 16 are both drawn from O to the circle; if O were the centre they would be equal radii. The book’s answers (x = 16, y ≈ 53.1°) treat the figure as this right triangle, and that is followed here.',
      tx('(vi) The bottom chord 12 is 5 from O: half-chord 6, so the radius is', 'R=\\sqrt{5^{2}+6^{2}}=\\sqrt{61}'), tx('The top chord 10 has half-chord 5, so its distance from O is:', 'x=\\sqrt{61-25}=6'), tx('The angle y at the end of the top chord between the chord and the radius:', '\\cos y=\\frac{5}{\\sqrt{61}}\\ \\Rightarrow\\ y\\approx ' + f(y6, 1) + '^{\\circ}')], chordBoard(13, 5, { rad: '13', dist: '5', len: '2x', alt: 'Figure (iii) style: radius 13, distance 5' }));
  })();

  add('In ⊙Q, KL = LM (arcs). If CK = 2x + 3 and CM = 4x, find x. [Figure: QL ⟂ chord KM at C]', [
    'The arcs KL and LM are equal, so the chords KL and LM are equal, and the radius QL through the arcs’ common point L is perpendicular to the chord KM.', 'A perpendicular from the centre to a chord bisects it, so C is the midpoint of KM: CK = CM.',
    tx('', '2x+3=4x\\ \\Rightarrow\\ 3=2x\\ \\Rightarrow\\ x=1.5'), tx('Check: CK = 2(1.5) + 3 = 6 and CM = 4(1.5) = 6.', '6=6')]);

  (function () {
    const AB = 3 * sq(2); if (!ok('R11 Q1i', sq(9 + 9), AB, 1e-9)) return;
    const P = [0, 0], A = [0, 3], B = [3, 0], b = G.board({ P, A, B }, { extent: [[-3, -3], [3, 3]], alt: 'Circle P with a 90° central angle AB' });
    b.circle(P, 3, 0).pt('P', 0, { dx: -12, dy: 14 }).seg('P', 'A', 0, { label: '3' }).seg('P', 'B', 0, { label: '3' }).pts(['A', 'B'], 0, { A: { dy: -8 }, B: { dx: 6 } }).right('P', 'A', 'B', 1).seg('A', 'B', 2, { color: 'green' });
    add('⊙P has a radius of 3 and AB has a measure of 90°. What is the length of AB? [options 3√2, 3√3, 6, 9]', ['The arc AB measures 90°, so the central angle ∠APB = 90°. The chord AB is the hypotenuse of the isosceles right triangle APB with legs PA = PB = 3.', tx('Pythagoras:', 'AB=\\sqrt{3^{2}+3^{2}}=\\sqrt{18}=3\\sqrt2'), 'The answer is 3√2. (The length of the arc itself would be (90/360)·2π·3 ≈ 4.71, which is not an option, so the chord is meant.)'], b);
  })();

  add('In the accompanying diagram of circle O, AB ≅ CD (arcs). Which statement is true? [options: chord AB ≅ chord CD, arc AB ∥ arc CD, chord AC ≅ chord BD, ∠ABC ≅ ∠BCD]', [
    'In the same circle, equal arcs have equal chords (Theorem 11.2).', 'Arc AB ≅ arc CD, so the chords AB and CD are equal.', 'The other statements are not forced by the given information: nothing says the chords are parallel, and AC, BD or the angles ABC, BCD are not tied to the equal arcs in general.', 'The true statement is: chord AB ≅ chord CD.']);

  (function () {
    const O = [0, 0], r = 3, pts = { A: [r, 0], B: [0, r], C: [-r, 0], D: [0, -r], O };
    const b = G.board(pts, { extent: [[-r, -r], [r, r]], alt: 'Circle with two perpendicular diameters AC and BD joined to form the square ABCD' });
    b.circle(O, r, 0).seg('A', 'C', 0, { color: 'orange' }).seg('B', 'D', 0, { color: 'orange' }).pt('O', 0, { dx: 6, dy: 14 }).pts(['A', 'B', 'C', 'D'], 0, { A: { dx: 6 }, B: { dy: -8 }, C: { dx: -14 }, D: { dy: 14 } }).right('O', 'A', 'B', 0);
    b.seg('A', 'B', 2, { color: 'green' }).seg('B', 'C', 2, { color: 'green' }).seg('C', 'D', 2, { color: 'green' }).seg('D', 'A', 2, { color: 'green' });
    add('In a circle if any pair of diameters are perpendicular to each other then the lines joining its ends in order, form a square.', [
      'Let AC and BD be two perpendicular diameters meeting at the centre O. Then OA = OB = OC = OD (radii) and all four angles at O are 90°.',
      'Triangles OAB, OBC, OCD and ODA each have two equal sides (radii) with a 90° angle between them, so they are congruent (S.A.S.). Hence AB = BC = CD = DA: all four sides are equal.',
      'The diagonals AC and BD are diameters, so they are equal, and AB, BC, CD, DA are equal chords subtending equal angles. Each angle of ABCD is an angle in a semicircle: ∠DAB is the angle on the diameter BD, so it is 90° (and likewise ∠ABC, ∠BCD, ∠CDA).',
      tx('A quadrilateral with four equal sides and four right angles is a square:', 'AB=BC=CD=DA,\\ \\ \\angle A=\\angle B=\\angle C=\\angle D=90^{\\circ}')], b);
  })();


  (function () {
    if (180 - 130 !== 50 || 130 / 2 !== 65 || 50 / 2 !== 25) return;
    const r = 3, O = [0, 0], A = [r, 0], C = [-r, 0], B = [r * Math.cos(130 * rad), r * Math.sin(130 * rad)], D = [r * Math.cos(250 * rad), r * Math.sin(250 * rad)];
    const b = G.board({ O, A, B, C, D }, { extent: [[-r, -r], [r, r]], alt: 'Circle with diameter AOC and angle AOB = 130°' });
    b.circle(O, r, 0).seg('A', 'C', 0, { color: 'orange' }).seg('O', 'B', 0).pt('O', 0, { dy: 14, dx: 6 }).pts(['A', 'B', 'C', 'D'], 0, { A: { dx: 6 }, B: { dy: -8 }, C: { dx: -14 }, D: { dy: 14 } }).text([0.6, 0.5], '130°', 0);
    b.seg('A', 'D', 1, { color: 'purple' }).seg('D', 'B', 1, { color: 'purple' }).seg('D', 'C', 3, { color: 'green' });
    add('In a circle with centre O, AOC is diameter. ∠AOB = 130°, find ∠ADB, ∠BDC and m BC.', [
      'AOC is a diameter, so A, O and C are in a straight line and ∠AOB and ∠BOC are supplementary.', tx('∠BOC is the central angle of the arc BC, so:', '\\angle BOC=180^{\\circ}-130^{\\circ}=50^{\\circ}\\ \\Rightarrow\\ m\\overset{\\frown}{BC}=50^{\\circ}'),
      tx('∠ADB is an inscribed angle on the arc AB, whose central angle is ∠AOB = 130°. An inscribed angle is half the central angle on the same arc:', '\\angle ADB=\\frac{130^{\\circ}}{2}=65^{\\circ}'),
      tx('∠BDC is the inscribed angle on the arc BC (central angle 50°):', '\\angle BDC=\\frac{50^{\\circ}}{2}=25^{\\circ}'), 'So ∠ADB = 65°, ∠BDC = 25° and the arc BC measures 50°.'], b);
  })();

  (function () {
    const r = 4, E = [7, 0], hit = (phi) => { const u = [Math.cos(phi * rad), Math.sin(phi * rad)], eu = E[0] * u[0] + E[1] * u[1], disc = sq(eu * eu - 49 + r * r), t1 = -eu - disc, t2 = -eu + disc; return [[E[0] + t1 * u[0], E[1] + t1 * u[1]], [E[0] + t2 * u[0], E[1] + t2 * u[1]]]; };
    const l1 = hit(170), l2 = hit(205), Bp = l1[0], A = l1[1], D = l2[0], C = l2[1];
    const b = G.board({ A, B: Bp, C, D, E, O: [0, 0] }, { extent: [[-r, -r], [r, r]], alt: 'Circle with chords AB and CD meeting at E outside the circle' });
    b.circle([0, 0], r, 0).seg('A', 'E', 0).seg('C', 'E', 0).pts(['A', 'B', 'C', 'D', 'E'], 0, { A: { dx: -14 }, B: { dy: -8 }, C: { dx: -14, dy: 14 }, D: { dy: 14 }, E: { dx: 6 } });
    b.seg('A', 'D', 1, { color: 'orange' }).seg('C', 'B', 1, { color: 'purple' });
    add('Chords AB and CD of a circle meet at the point E outside the circle. Prove that (a) ∠A = ∠C (b) ∠1 = ∠2 (c) ΔADE and ΔCBE are equiangular.', [
      'Draw the chords AD and CB as in the figure. A, B, E are in a line and C, D, E are in a line, with B between A and E and D between C and E.',
      tx('(a) ∠A = ∠BAD and ∠C = ∠BCD are inscribed angles on the same arc BD, standing on the same side of the chord BD, so they are equal:', 'm\\angle A=m\\angle C'),
      tx('(c) In triangles ADE and CBE: ∠E is common, and ∠DAE = ∠BAD = ∠BCD = ∠BCE by (a). Two angles are equal, so the third angles are equal too (angle sum 180°):', '\\angle E=\\angle E,\\quad \\angle A=\\angle C\\ \\Rightarrow\\ \\angle ADE=\\angle CBE'),
      'So the three angles of ΔADE equal the three angles of ΔCBE: the triangles are equiangular (hence similar).',
      tx('(b) ∠1 is the angle at B and ∠2 the angle at D as marked in the figure: ∠1 = ∠CBE and ∠2 = ∠ADE, which are the corresponding third angles found in (c):', 'm\\angle 1=m\\angle 2')], b);
  })();
})(typeof window !== 'undefined' ? window : globalThis);
