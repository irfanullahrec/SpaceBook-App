/* Class 9 Mathematics, Units 10, 12, 13, 14, 17 (geometry proofs and one construction): the stored proofs are re-written as step-by-step solutions with a diagram built from coordinates.
 * The figures of the book are not in the data, so each diagram is a faithful schematic of the situation described by the question (the labelled points satisfy the given conditions exactly). */
(function (root) {
  'use strict';
  const NS = root.SBVR, G = root.SBSOL_GEO; if (!NS || !NS.sol || !G) return;
  const warn = m => { if (root.console) console.warn('sol_m9_geo: ' + m); };
  const QS = ["In the given figure, AC ≅ CE and ∠B ≅ ∠D. Prove that BC ≅ CD.","Given: C is the midpoint of BE, and ∠B ≅ ∠E. Prove: △ABC ≅ △DEC.","Select the correct answer for each of the following: (i) Which of the following is not a sufficient condition for the congruency of two triangles? a) A.S.A ≅ A.S.A b) H.S ≅ H.S c) S.A.A ≅ S.A.A d) A.A.A ≅ A.A.A (ii) The diagonal of a ______ does not divide it into two congruent triangles: a) rectangle b) square c) parallelogram d) trapezium (iii) In a given correspondence of two triangles, if △ABC ≅ △DEF, then which of the following is not correct? a) ∠B ≅ ∠E b) CA ≅ FD c) ∠CBA ≅ ∠FED d) ∠ABC ≅ ∠EFD (iv) In △ABC, if ∠A ≅ ∠B, then the bisector of ______ divides △ABC into two congruent triangles: a) ∠A b) ∠B c) ∠C d) any one of its angles (v) Which of the following is a legitimate reason for declaring two triangles to be congruent? a) SSA ≅ SSA b) SAS ≅ SAS c) AAA ≅ AAA d) all of these","In the given figure, AB = AD and BC = DC. Prove that AC ⊥ BD and BE = DE (where E is the intersection of AC and BD).","D is a point inside △ABC. Prove that m(DA) + m(DB) + m(DC) > (1/2) [m(AB) + m(BC) + m(CA)].","In the given figure, show that △QRS and △TUS are similar (given QR ∥ TU).","Diagonals of a trapezoid ABCD intersect each other at O. If △AOB ~ △COD, then prove that AB ∥ CD.","Draw △PQR such that PQ = 5.6 cm, QR = 4.5 cm and RP = 3.4 cm. Construct a triangle SPQ equivalent in area to △PQR."];
  const tx = (text, m) => ({ text, m });
  const A = (n, steps, board) => { NS.sol.add({ q: QS[n], steps, board: board ? board.cfg() : undefined }); };
  const dist = G.dist, mid = G.mid;
  const ok = (label, got, exp, tol) => { if (Math.abs(got - exp) > (tol === undefined ? 1e-9 : tol)) { warn(label + ': computed ' + got + ' but expected ' + exp); return false; } return true; };
  const area = (P, Q, R) => Math.abs((Q[0] - P[0]) * (R[1] - P[1]) - (R[0] - P[0]) * (Q[1] - P[1])) / 2;
  const L = (b, at, a, c, o) => b.seg(a, c, at, o);

  /* 10.1 Q2: AC = CE and angle B = angle D, prove BC = CD */
  (function () {
    const C = [0, 0], Aa = [-3, 2], E = [3, -2], B = [-3, -1], D = [3, 1];
    if (!ok('10.1 Q2', dist(Aa, C), dist(C, E)) || !ok('10.1 Q2', dist(B, C), dist(C, D))) return;
    const b = G.board({ A: Aa, B, C, D, E }, { alt: 'Segments AE and BD crossing at C with triangles ABC and EDC' });
    b.seg('A', 'E', 0).seg('B', 'D', 0).pts(['A', 'B', 'C', 'D', 'E'], 0, { A: { dx: -14, dy: -6 }, B: { dx: -14, dy: 14 }, C: { dx: 6, dy: -8 }, D: { dx: 6, dy: -6 }, E: { dx: 6, dy: 14 } });
    b.seg('A', 'B', 1, { color: 'orange' }).seg('E', 'D', 1, { color: 'orange' }).seg('A', 'C', 2, { color: 'green', label: '=' }).seg('C', 'E', 2, { color: 'green', label: '=' }).seg('B', 'C', 4, { color: 'purple' }).seg('C', 'D', 4, { color: 'purple' });
    A(0, ['Given: AC ≅ CE and ∠B ≅ ∠D; the segments AE and BD cross at C. To prove: BC ≅ CD.', 'Look at the two triangles △ABC and △EDC (the figure shows AB and ED drawn).',
      'Angle: ∠B ≅ ∠D (given). Side: AC ≅ CE (given). Angle: ∠ACB ≅ ∠ECD, because they are vertically opposite angles.', tx('By S.A.A ≅ S.A.A (two angles and a non-included side), the triangles are congruent:', '\\triangle ABC\\cong\\triangle EDC'),
      'Corresponding parts of congruent triangles are congruent. BC in △ABC corresponds to DC in △EDC, so BC ≅ CD. Hence proved.'], b);
  })();

  /* 10.1 Q3: C midpoint of BE and angle B = angle E, prove triangle ABC congruent to DEC */
  (function () {
    const Bp = [-3, 0], E = [3, 0], C = [0, 0], Aa = [-1.5, 2], D = [1.5, -2];
    if (!ok('10.1 Q3', dist(Bp, C), dist(C, E))) return;
    const b = G.board({ A: Aa, B: Bp, C, D, E }, { alt: 'C is the midpoint of BE; A, C, D are on one line' });
    b.seg('B', 'E', 0).seg('A', 'D', 0).pts(['A', 'B', 'C', 'D', 'E'], 0, { A: { dx: -14, dy: -6 }, B: { dx: -14, dy: 14 }, C: { dx: 6, dy: -8 }, D: { dx: 6, dy: 14 }, E: { dx: 6, dy: -6 } });
    b.seg('A', 'B', 1, { color: 'orange' }).seg('D', 'E', 1, { color: 'orange' }).seg('B', 'C', 2, { color: 'green', label: '=' }).seg('C', 'E', 2, { color: 'green', label: '=' });
    A(1, ['Given: C is the midpoint of BE, so BC ≅ CE, and ∠B ≅ ∠E; the lines AD and BE cross at C. To prove: △ABC ≅ △DEC.', 'Compare △ABC and △DEC.',
      'Angle: ∠B ≅ ∠E (given). Side: BC ≅ CE (C is the midpoint of BE). Angle: ∠BCA ≅ ∠ECD (vertically opposite angles).', tx('Two angles and the included side of one triangle equal those of the other: by A.S.A ≅ A.S.A,', '\\triangle ABC\\cong\\triangle DEC'), 'Hence proved.'], b);
  })();

  A(2, ['(i) A triangle can be proved congruent by A.S.A, H.S (right triangles) or S.A.A. A.A.A only gives equal angles, so the triangles have the same shape but may differ in size. The condition that is not sufficient is d) A.A.A ≅ A.A.A.',
    '(ii) The diagonal of a rectangle, square or parallelogram divides it into two congruent triangles (opposite sides are equal). In a trapezium the opposite sides are not both equal in general, so a diagonal does not give congruent triangles: d) trapezium.',
    '(iii) In △ABC ≅ △DEF the vertices correspond in order A↔D, B↔E, C↔F. So ∠B ≅ ∠E, CA ≅ FD and ∠CBA ≅ ∠FED are all correct. ∠ABC corresponds to ∠DEF, not to ∠EFD, so d) ∠ABC ≅ ∠EFD is not correct.',
    '(iv) ∠A ≅ ∠B makes the triangle isosceles with AC = BC. The bisector of ∠C meets AB at its midpoint, and the two triangles have the equal sides AC = BC, the common bisector and equal angles at C (S.A.S), so they are congruent: c) ∠C.',
    '(v) S.A.S is an accepted rule of congruence. S.S.A (the angle not between the sides) and A.A.A are not valid reasons in general: b) SAS ≅ SAS.']);

  /* Review 12 Q2: kite ABCD */
  (function () {
    const Aa = [0, 3], C = [0, -2], Bp = [-2, 0], D = [2, 0], E = [0, 0];
    if (!ok('R12 Q2', dist(Aa, Bp), dist(Aa, D)) || !ok('R12 Q2', dist(C, Bp), dist(C, D))) return;
    const b = G.board({ A: Aa, B: Bp, C, D, E }, { alt: 'Kite ABCD with AB = AD and CB = CD, diagonals meeting at E' });
    ['AB', 'BC', 'CD', 'DA'].forEach(s => b.seg(s[0], s[1], 0)); b.pts(['A', 'B', 'C', 'D'], 0, { A: { dy: -8 }, B: { dx: -14 }, C: { dy: 14 }, D: { dx: 6 } });
    b.seg('B', 'D', 1, { color: 'orange' }).pt('E', 1, { dx: 6, dy: -8 }).seg('A', 'C', 3, { color: 'green' }).right('E', 'A', 'D', 3);
    A(3, ['Given: AB = AD and CB = CD; E is where AC and BD meet. To prove: AC ⊥ BD and BE = DE.',
      'AB = AD: the point A is the same distance from B and from D, so by Theorem 12.2 (a point equidistant from the ends of a segment lies on its right bisector) A is on the right bisector of BD.', 'CB = CD: in the same way C is on the right bisector of BD.',
      'Two different points A and C determine exactly one line, so the line AC is the right bisector of BD.', 'The right bisector of BD is perpendicular to BD and passes through its midpoint, so AC ⊥ BD and BE = DE. Hence proved.'], b);
  })();

  /* Review 13 Q5 */
  (function () {
    const Aa = [0, 0], Bp = [6, 0], C = [2.5, 4], D = [2.6, 1.4];
    const sum = dist(D, Aa) + dist(D, Bp) + dist(D, C), half = (dist(Aa, Bp) + dist(Bp, C) + dist(C, Aa)) / 2; if (!(sum > half)) return;
    const b = G.board({ A: Aa, B: Bp, C, D }, { alt: 'Triangle ABC with an interior point D' });
    b.seg('A', 'B', 0).seg('B', 'C', 0).seg('C', 'A', 0).pts(['A', 'B', 'C', 'D'], 0, { A: { dx: -14, dy: 14 }, B: { dx: 6, dy: 14 }, C: { dy: -8 }, D: { dx: 6, dy: -4 } }); b.seg('D', 'A', 1, { color: 'orange' }).seg('D', 'B', 1, { color: 'purple' }).seg('D', 'C', 1, { color: 'green' });
    A(4, ['Given: D is a point inside △ABC. Join DA, DB and DC. To prove: DA + DB + DC > ½(AB + BC + CA).', 'The triangle inequality: in any triangle the sum of two sides is greater than the third side.',
      tx('In △DAB:', 'DA+DB>AB\\quad\\text{(1)}'), tx('In △DBC:', 'DB+DC>BC\\quad\\text{(2)}'), tx('In △DCA:', 'DC+DA>CA\\quad\\text{(3)}'),
      tx('Add (1), (2) and (3); each of DA, DB, DC appears twice on the left:', '2(DA+DB+DC)>AB+BC+CA'), tx('Divide by 2:', 'DA+DB+DC>\\tfrac{1}{2}(AB+BC+CA)'),
      'Check with the diagram: DA + DB + DC ≈ ' + sum.toFixed(2) + ' and ½(AB + BC + CA) ≈ ' + half.toFixed(2) + '. Hence proved.'], b);
  })();

  /* 14.1 Q3 */
  (function () {
    const S = [0, 0], Q = [-2, 1.5], T = [2, -1.5], R = [2, 1.5], U = [-2, -1.5];
    const b = G.board({ Q, R, S, T, U }, { alt: 'QR parallel to TU with QT and RU meeting at S' });
    b.seg('Q', 'T', 0).seg('R', 'U', 0).seg('Q', 'R', 0, { color: 'orange' }).seg('T', 'U', 0, { color: 'orange' }).pts(['Q', 'R', 'S', 'T', 'U'], 0, { Q: { dx: -14, dy: -6 }, R: { dx: 6, dy: -6 }, S: { dx: 6, dy: -8 }, T: { dx: 6, dy: 14 }, U: { dx: -14, dy: 14 } });
    A(5, ['Given: QR ∥ TU, and the transversals QT and RU cross at S. To show: △QRS ~ △TUS.', 'In △QRS and △TUS, compare the angles.',
      'At S: ∠QSR ≅ ∠TSU (vertically opposite angles).', 'QR ∥ TU with the transversal QT: ∠SQR ≅ ∠STU (alternate interior angles).', 'QR ∥ TU with the transversal RU: ∠SRQ ≅ ∠SUT (alternate interior angles).',
      tx('Two angles equal are enough (the third follows from the angle sum). By the A.A similarity criterion:', '\\triangle QRS\\sim\\triangle TUS'), 'Hence proved.'], b);
  })();

  /* 14.1 Q13 */
  (function () {
    const Aa = [0, 0], Bp = [4, 0], C = [3, 2], D = [1, 2], O = [2, 4 / 3];
    const cross = (P, Q, R, S) => { const d = (Q[0] - P[0]) * (S[1] - R[1]) - (Q[1] - P[1]) * (S[0] - R[0]); const t = ((R[0] - P[0]) * (S[1] - R[1]) - (R[1] - P[1]) * (S[0] - R[0])) / d; return [P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])]; };
    const X = cross(Aa, C, Bp, D); if (!ok('14.1 Q13', X[0], O[0], 1e-9) || !ok('14.1 Q13', X[1], O[1], 1e-9)) return;
    const b = G.board({ A: Aa, B: Bp, C, D, O }, { alt: 'Trapezoid ABCD with diagonals meeting at O' });
    ['AB', 'BC', 'CD', 'DA'].forEach(s => b.seg(s[0], s[1], 0)); b.pts(['A', 'B', 'C', 'D'], 0, { A: { dx: -14, dy: 14 }, B: { dx: 6, dy: 14 }, C: { dx: 6, dy: -8 }, D: { dx: -14, dy: -8 } });
    b.seg('A', 'C', 1, { color: 'orange' }).seg('B', 'D', 1, { color: 'purple' }).pt('O', 1, { dx: 6, dy: 14 }).seg('A', 'B', 3, { color: 'green' }).seg('C', 'D', 3, { color: 'green' });
    A(6, ['Given: the diagonals AC and BD of ABCD meet at O and △AOB ~ △COD. To prove: AB ∥ CD.', 'Because the triangles are similar, their corresponding angles are equal: the vertex A corresponds to C and B corresponds to D, so ∠OAB ≅ ∠OCD (and ∠OBA ≅ ∠ODC).',
      'The lines AB and CD are cut by the transversal AC. The angles ∠OAB (that is ∠CAB) and ∠OCD (that is ∠ACD) lie on opposite sides of AC between the two lines: they are alternate interior angles.', 'Alternate interior angles are equal, so the lines are parallel: AB ∥ CD. Hence ABCD is a trapezoid.'], b);
  })();

  /* 17.3 Q8: a triangle on the same base PQ with equal area */
  (function () {
    const PQ = 5.6, QR = 4.5, RP = 3.4, xr = (RP * RP + PQ * PQ - QR * QR) / (2 * PQ), yr = Math.sqrt(RP * RP - xr * xr), P = [0, 0], Q = [PQ, 0], R = [xr, yr], S = [4.5, yr];
    if (!ok('17.3 Q8', dist(Q, R), QR, 1e-9) || !ok('17.3 Q8', area(S, P, Q), area(R, P, Q), 1e-9)) return;
    const b = G.board({ P, Q, R, S }, { alt: 'Triangles PQR and SPQ on the same base PQ between the same parallels' });
    b.seg('P', 'Q', 0, { label: '5.6' }).pts(['P', 'Q'], 0, { P: { dx: -14, dy: 14 }, Q: { dx: 6, dy: 14 } }); b.seg('P', 'R', 1, { label: '3.4' }).seg('Q', 'R', 1, { label: '4.5' }).pt('R', 1, { dy: -8 });
    b.seg([-1, yr], [7, yr], 2, { color: 'orange', dash: true }); b.pt('S', 3, { dy: -8 }).seg('S', 'P', 4, { color: 'green' }).seg('S', 'Q', 4, { color: 'green' });
    A(7, ['Construct △PQR by S.S.S: draw PQ = 5.6 cm; with centre P and radius 3.4 cm draw an arc, with centre Q and radius 4.5 cm draw another arc; the arcs meet at R. Join PR and QR.',
      'Through R draw the line parallel to PQ (copy an angle at R equal to ∠RPQ with the compass, or use the set square on PQ).', 'Take any point S on this parallel line.', 'Join S to P and S to Q. △SPQ is the required triangle.',
      tx('Why the areas are equal: △SPQ and △PQR stand on the same base PQ, and their third vertices S and R lie on a line parallel to PQ, so they have the same height h = ' + yr.toFixed(3) + ' cm:', '\\text{Area}=\\tfrac{1}{2}\\times PQ\\times h=\\tfrac{1}{2}(5.6)(' + yr.toFixed(3) + ')\\approx ' + area(R, P, Q).toFixed(3) + '\\text{ cm}^{2}\\text{ for both}')], b);
  })();
})(typeof window !== 'undefined' ? window : globalThis);
