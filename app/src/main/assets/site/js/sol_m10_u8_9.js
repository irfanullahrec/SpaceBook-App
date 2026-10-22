/* Class 10 Mathematics, Units 8 (Theorems about Triangles) and 9 (Chords of a Circle): hand-written worked solutions with diagrams drawn to scale.
 * Every length is computed from the numbers in the question and compared with the book's printed answer. */
(function (root) {
  'use strict';
  const NS = root.SBVR, G = root.SBSOL_GEO; if (!NS || !NS.sol || !G) return;
  const warn = m => { if (root.console) console.warn('sol_m10_u8_9: ' + m); };
  const f = (x, d) => String(+Number(x).toFixed(d === undefined ? 2 : d));
  const ok = (label, got, exp, tol) => { if (Math.abs(got - exp) > (tol === undefined ? 0.006 : tol)) { warn(label + ': computed ' + got + ' but the book prints ' + exp); return false; } return true; };
  const tx = (text, m) => ({ text, m });
  const add = G.add, sq = Math.sqrt, dist = G.dist, mid = G.mid;

  /* ---------- Unit 8 ---------- */
  (function () {
    const p = 5, AC = sq(36 + 100 + 2 * 6 * p); if (!ok('8.1 Q1', AC, 14)) return;
    const B = [6, 0], C = [B[0] + 10 * Math.cos(Math.PI / 3), 10 * Math.sin(Math.PI / 3)], D = [C[0], 0];
    const b = G.board({ A: [0, 0], B, C, D }, { alt: 'Triangle ABC with angle B = 120° and the projection of BC on AB' });
    b.seg('A', 'B', 0, { label: '6' }).seg('B', 'C', 0, { label: '10' }).pts(['A', 'B', 'C'], 0, { A: { dx: -10, dy: 14 }, B: { dy: 14 } });
    b.seg('B', 'D', 1, { color: 'orange', label: '5' }).seg('C', 'D', 1, { dash: true, color: 'orange' }).pt('D', 1, { dy: 14 }).right('D', 'B', 'C', 1);
    b.seg('A', 'C', 3, { color: 'green', label: '14' });
    add('In ΔABC, AB=6 cm, BC=10 cm and ∠B=120°. The projection of BC on AB is 5 cm. Find AC.', [
      'Since ∠B = 120° is obtuse, use the theorem for an obtuse angle (Theorem 8.1): AC² = AB² + BC² + 2·AB·p, where p is the projection of BC on AB produced.',
      'Drop the perpendicular from C to AB produced at D. The projection of BC on AB is BD = p = 5 cm.',
      tx('Substitute AB = 6, BC = 10 and p = 5:', 'AC^{2}=AB^{2}+BC^{2}+2(AB)(p)=6^{2}+10^{2}+2(6)(5)=36+100+60=196'),
      tx('Take the positive square root:', 'AC=\\sqrt{196}=14\\text{ cm}')], b);
  })();

  (function () {
    const p = (49 - 9 - 25) / 6; if (!ok('8.1 Q2', p, 2.5)) return;
    const T = G.tri(5, 7, 3), D = [T.C[0], 0];
    const b = G.board({ A: T.A, B: T.B, C: T.C, D }, { alt: 'Triangle with sides 3, 5, 7' });
    b.seg('A', 'B', 0, { label: '3' }).seg('B', 'C', 0, { label: '5' }).seg('A', 'C', 0, { label: '7' }).pts(['A', 'B', 'C'], 0, { A: { dx: -10, dy: 14 }, B: { dy: 14 } });
    b.seg('B', 'D', 2, { color: 'orange', label: 'p' }).seg('C', 'D', 2, { dash: true, color: 'orange' }).pt('D', 2, { dy: 14 }).right('D', 'B', 'C', 2);
    add('In ΔABC, AB=3 cm, BC=5 cm and AC=7 cm. Find the projection of BC on AB.', [
      tx('Compare the longest side with the others: AC² = 49 is bigger than AB² + BC² = 9 + 25 = 34, so ∠B is obtuse.', '49>34'),
      'For an obtuse angle B, Theorem 8.1 gives AC² = AB² + BC² + 2·AB·p, where p is the projection of BC on AB.',
      tx('Substitute:', '49=9+25+2(3)p=34+6p'), tx('Solve for p:', '6p=15\\ \\Rightarrow\\ p=\\frac{15}{6}=2.5\\text{ cm}')], b);
  })();

  (function () {
    const p = (121 + 64 - 49) / 16; if (!ok('8.1 Q3', p, 8.5)) return;
    const T = G.tri(7, 11, 8), D = [T.C[0], 0];
    const b = G.board({ A: T.A, B: T.B, C: T.C, D }, { alt: 'Triangle with a = 7, b = 11, c = 8' });
    b.seg('A', 'B', 0, { label: 'c = 8' }).seg('B', 'C', 0, { label: 'a = 7' }).seg('A', 'C', 0, { label: 'b = 11' }).pts(['A', 'B', 'C'], 0, { A: { dx: -10, dy: 14 }, B: { dy: 14 } });
    b.seg('A', 'D', 2, { color: 'orange', label: 'p' }).seg('C', 'D', 2, { dash: true, color: 'orange' }).pt('D', 2, { dy: 14 }).right('D', 'A', 'C', 2);
    add('In ΔABC, a=7, b=11 and c=8. Calculate the projection of AC on AB.', [
      'In the book a = BC, b = AC and c = AB. The projection of AC on AB is p = b cos A.',
      tx('The cosine rule gives cos A = (b² + c² − a²) / (2bc), so:', 'p=b\\cos A=\\frac{b^{2}+c^{2}-a^{2}}{2c}'),
      tx('Substitute a = 7, b = 11, c = 8:', 'p=\\frac{11^{2}+8^{2}-7^{2}}{2(8)}=\\frac{121+64-49}{16}=\\frac{136}{16}=8.5\\text{ units}')], b);
  })();

  (function () {
    const cosB = (16 + 25 - 49) / 40; if (!ok('8.1 Q4', cosB, -0.2)) return;
    const T = G.tri(5, 7, 4), A = T.A, B = T.B, C = T.C, D = [A[0] + C[0] - B[0], A[1] + C[1] - B[1]];
    const b = G.board({ A, B, C, D }, { alt: 'Parallelogram ABCD with diagonal AC' });
    b.seg('A', 'B', 0, { label: '4' }).seg('B', 'C', 0, { label: '5' }).seg('C', 'D', 0).seg('D', 'A', 0, { label: '5' }).pts(['A', 'B', 'C', 'D'], 0, { A: { dx: -10, dy: 14 }, B: { dy: 14 } });
    b.seg('A', 'C', 1, { color: 'orange', label: '7' });
    add('In a parallelogram ABCD, AB=4 cm, AC=7 cm and AD=5 cm. Find which angles of the parallelogram are obtuse.', [
      'Opposite sides of a parallelogram are equal, so BC = AD = 5 cm. Triangle ABC has sides AB = 4, BC = 5 and AC = 7.',
      tx('Test ∠B with the cosine rule (the longest side AC is opposite ∠B):', '\\cos B=\\frac{AB^{2}+BC^{2}-AC^{2}}{2\\cdot AB\\cdot BC}=\\frac{16+25-49}{2(4)(5)}=\\frac{-8}{40}=-\\frac{1}{5}'),
      'cos B is negative, so ∠B is obtuse (about ' + f(Math.acos(cosB) * 180 / Math.PI, 1) + '°).',
      'Opposite angles of a parallelogram are equal, so ∠D = ∠B is obtuse too. ∠A and ∠C are each 180° − ∠B ≈ ' + f(180 - Math.acos(cosB) * 180 / Math.PI, 1) + '°, which is acute.'], b);
  })();

  (function () {
    const m = (a, b, c) => sq((2 * b * b + 2 * c * c - a * a) / 4);
    if (!ok('8.2 Q1', m(10, 12, 16), 5 * sq(7)) || !ok('8.2 Q1', m(12, 10, 16), sq(142)) || !ok('8.2 Q1', m(16, 10, 12), sq(58))) return;
    const T = G.tri(10, 12, 16), A = T.A, B = T.B, C = T.C;       // c = AB = 16, a = BC = 10, b = CA = 12
    const b = G.board({ A, B, C }, { alt: 'Triangle with the three medians' });
    b.seg('A', 'B', 0, { label: '16' }).seg('B', 'C', 0, { label: '10' }).seg('A', 'C', 0, { label: '12' }).pts(['A', 'B', 'C'], 0, { A: { dx: -10, dy: 14 }, B: { dy: 14 } });
    b.seg('A', mid(B, C), 2, { color: 'orange' }).pt(mid(B, C), 2, { label: '' }).seg('B', mid(A, C), 3, { color: 'purple' }).pt(mid(A, C), 3, { label: '' }).seg('C', mid(A, B), 4, { color: 'green' }).pt(mid(A, B), 4, { label: '' });
    add('Using Apollonius theorem, find the lengths of the medians of a triangle having sides 10 cm, 12 cm and 16 cm respectively.', [
      'Apollonius theorem: the median to a side a has length m² = (2b² + 2c² − a²) / 4, where b and c are the other two sides.',
      'Call the sides a = 10, b = 12 and c = 16, and find the three medians one by one.',
      tx('Median to the side 10:', 'm_{a}^{2}=\\frac{2(12^{2})+2(16^{2})-10^{2}}{4}=\\frac{288+512-100}{4}=175\\ \\Rightarrow\\ m_{a}=5\\sqrt7\\text{ cm}'),
      tx('Median to the side 12:', 'm_{b}^{2}=\\frac{2(10^{2})+2(16^{2})-12^{2}}{4}=\\frac{200+512-144}{4}=142\\ \\Rightarrow\\ m_{b}=\\sqrt{142}\\text{ cm}'),
      tx('Median to the side 16:', 'm_{c}^{2}=\\frac{2(10^{2})+2(12^{2})-16^{2}}{4}=\\frac{200+288-256}{4}=58\\ \\Rightarrow\\ m_{c}=\\sqrt{58}\\text{ cm}')], b);
  })();

  (function () {
    const m2 = (2 * 16 + 2 * 36 - 25) / 4; if (!ok('8.2 Q2', m2, 79 / 4)) return;
    const T = G.tri(5, 6, 4), A = T.A, B = T.B, C = T.C, D = mid(B, C);
    const b = G.board({ A, B, C, D }, { alt: 'Triangle ABC with median AD' });
    b.seg('A', 'B', 0, { label: '4' }).seg('B', 'C', 0, { label: '5' }).seg('A', 'C', 0, { label: '6' }).pts(['A', 'B', 'C'], 0, { A: { dx: -10, dy: 14 }, B: { dy: 14 } });
    b.pt('D', 1, { dy: 14 }).seg('A', 'D', 2, { color: 'green' });
    add('In ΔABC, D is the midpoint of BC. Find the length of the median if AB=4 cm, BC=5 cm and AC=6 cm.', [
      'D is the midpoint of BC, so AD is the median from A.', 'Apollonius theorem: AB² + AC² = 2(AD² + BD²), which gives AD² = (2AB² + 2AC² − BC²) / 4.',
      tx('Substitute AB = 4, AC = 6 and BC = 5:', 'AD^{2}=\\frac{2(16)+2(36)-25}{4}=\\frac{32+72-25}{4}=\\frac{79}{4}'), tx('Take the square root:', 'AD=\\frac{\\sqrt{79}}{2}\\approx ' + f(sq(79) / 2, 3) + '\\text{ cm}')], b);
  })();

  (function () {
    const C = [0, 0], Bp = [4, 0], A = [12 * Math.cos(Math.PI * 2 / 3), 12 * Math.sin(Math.PI * 2 / 3)], D = [A[0], 0], E = [2, 0];
    const AB2 = dist(A, Bp) ** 2, AE2 = dist(A, E) ** 2; if (!ok('8.2 Q3', AB2, 208, 1e-6) || !ok('8.2 Q3', AE2, 172, 1e-6)) return;
    const b = G.board({ A, B: Bp, C, D, E }, { alt: 'Triangle ABC with angle C = 120° and the altitude AD' });
    b.seg('C', 'B', 0, { label: '4' }).seg('C', 'A', 0, { label: '12' }).pts(['C', 'B', 'A'], 0, { C: { dx: 6, dy: 14 }, B: { dy: 14 }, A: { dy: -8 } });
    b.seg('D', 'C', 1, { color: 'orange', label: 'CD' }).seg('A', 'D', 2, { dash: true, color: 'orange', label: 'AD' }).pt('D', 1, { dy: 14 }).right('D', 'C', 'A', 2);
    b.seg('A', 'B', 3, { color: 'green' }).seg('A', 'E', 4, { color: 'purple' }).pt('E', 4, { dy: 14 });
    add('ΔABC is given with BC=4 cm, AC=12 cm and ∠C=120°. Find CD, AD, AB and then verify Apollonius theorem.', [
      'Since ∠C = 120° is obtuse, drop the perpendicular AD to BC produced. The triangle ACD has ∠ACD = 180° − 120° = 60°.',
      tx('CD and AD in the right triangle ACD (hypotenuse AC = 12):', 'CD=12\\cos60^{\\circ}=6\\text{ cm},\\qquad AD=12\\sin60^{\\circ}=6\\sqrt3\\text{ cm}'),
      tx('Now BD = BC + CD = 4 + 6 = 10. Pythagoras in the right triangle ABD:', 'AB^{2}=BD^{2}+AD^{2}=100+108=208\\ \\Rightarrow\\ AB=4\\sqrt{13}\\text{ cm}'),
      'Verify Apollonius theorem for the median AE, where E is the midpoint of BC (BE = EC = 2). E is 8 cm from D, so AE² = AD² + DE² = 108 + 64 = 172.',
      tx('Apollonius theorem says AB² + AC² = 2(AE² + BE²):', '208+144=352\\quad\\text{and}\\quad 2(172+2^{2})=2(176)=352')], b);
  })();

  (function () {
    const AC = sq(61), AD = 36 / AC, CD = 25 / AC; if (!ok('8.2 Q4', AD + CD, AC, 1e-9) || !ok('8.2 Q4', 36 - AD * AD, 25 - CD * CD, 1e-9)) return;
    const B = [0, 0], A = [0, 6], C = [5, 0], D = G.foot(B, A, C);
    const b = G.board({ A, B, C, D }, { alt: 'Right triangle ABC with the altitude BD' });
    b.seg('A', 'B', 0, { label: '6' }).seg('B', 'C', 0, { label: '5' }).seg('A', 'C', 1).pts(['A', 'B', 'C'], 0, { A: { dy: -8 }, B: { dx: -12, dy: 14 }, C: { dy: 14 } }).right('B', 'A', 'C', 0);
    b.seg('B', 'D', 2, { dash: true, color: 'orange' }).pt('D', 2, { dx: 6, dy: -8 }).right('D', 'A', 'B', 2);
    add('ΔABC is a right triangle with ∠B=90° and BD⊥AC. If AB=6 cm and BC=5 cm, find AD and CD. Verify your answer with Pythagorean theorem.', [
      tx('First find the hypotenuse:', 'AC=\\sqrt{AB^{2}+BC^{2}}=\\sqrt{36+25}=\\sqrt{61}\\text{ cm}'),
      'The altitude BD from the right angle splits the triangle into two triangles similar to ABC. In a right triangle each leg is the mean proportional between the hypotenuse and its projection: AB² = AD·AC and BC² = CD·AC.',
      tx('', 'AD=\\frac{AB^{2}}{AC}=\\frac{36}{\\sqrt{61}}\\approx ' + f(AD, 3) + '\\text{ cm},\\qquad CD=\\frac{BC^{2}}{AC}=\\frac{25}{\\sqrt{61}}\\approx ' + f(CD, 3) + '\\text{ cm}'),
      tx('Check: the two parts add up to the hypotenuse:', 'AD+CD=\\frac{36+25}{\\sqrt{61}}=\\frac{61}{\\sqrt{61}}=\\sqrt{61}=AC'),
      tx('Pythagoras check on BD² from both small triangles:', 'BD^{2}=AB^{2}-AD^{2}=36-\\frac{1296}{61}=\\frac{900}{61}\\quad\\text{and}\\quad BC^{2}-CD^{2}=25-\\frac{625}{61}=\\frac{900}{61}')], b);
  })();

  /* Review Exercise 8 */
  add('Pythagoras was a/an _____.', ['Pythagoras (about 570–495 BC) was an ancient Greek mathematician and philosopher, remembered for the theorem that bears his name.', 'The blank is completed with: Greek.']);
  add('Apollonius was born in _____.', ['Apollonius was an ancient Greek geometer, known as Apollonius of Perga.', 'He was born in Perga, a city in Pamphylia (today in southern Turkey). The blank is completed with: Perga.']);
  add('Apollonius is the name of a _____.', ['Apollonius of Perga was a Greek mathematician (and astronomer) who wrote the Conics, and the median theorem of this unit is named after him.', 'The blank is completed with: mathematician.']);

  (function () {
    const p = (100 + 289 - 441) / 34; if (!ok('R8 Q4', Math.abs(p), 26 / 17, 1e-9)) return;
    const T = G.tri(10, 21, 17), D = [T.C[0], 0];
    const b = G.board({ A: T.A, B: T.B, C: T.C, D }, { alt: 'Triangle with sides 10, 17 and 21' });
    b.seg('A', 'B', 0, { label: '17' }).seg('B', 'C', 0, { label: '10' }).seg('A', 'C', 0, { label: '21' }).pts(['A', 'B', 'C'], 0, { A: { dx: -10, dy: 14 }, B: { dy: 14 } });
    b.seg('B', 'D', 2, { color: 'orange', label: 'p' }).seg('C', 'D', 2, { dash: true, color: 'orange' }).pt('D', 2, { dy: 14 }).right('D', 'B', 'C', 2);
    add('Find the projection of the side of length 10 units onto the side of length 17 units in a triangle with sides 10, 17 and 21 units.', [
      tx('The longest side 21 is opposite the angle between the sides 10 and 17. Compare squares:', '21^{2}=441>10^{2}+17^{2}=389'),
      'So that angle is obtuse and the projection falls on the extension of the 17-unit side. By Theorem 8.1: 21² = 10² + 17² + 2(17)p.',
      tx('Solve for p:', '441=100+289+34p\\ \\Rightarrow\\ 34p=52\\ \\Rightarrow\\ p=\\frac{52}{34}=\\frac{26}{17}\\approx ' + f(26 / 17, 2) + '\\text{ units}')], b);
  })();

  (function () {
    const BC = sq(89), AD = 40 / BC, BD = 25 / BC; if (!ok('R8 Q5', AD * AD + BD * BD, 25, 1e-9)) return;
    const A = [0, 0], B = [0, 5], C = [8, 0], D = G.foot(A, B, C);
    const b = G.board({ A, B, C, D }, { alt: 'Right triangle ABC, right angle at A, with altitude AD' });
    b.seg('A', 'B', 0, { label: '5' }).seg('A', 'C', 0, { label: '8' }).seg('B', 'C', 1).pts(['A', 'B', 'C'], 0, { A: { dx: -12, dy: 14 }, B: { dy: -8 }, C: { dy: 14 } }).right('A', 'B', 'C', 0);
    b.seg('A', 'D', 2, { dash: true, color: 'orange' }).pt('D', 2, { dx: 6, dy: -8 }).right('D', 'A', 'B', 2);
    add('ΔABC is right-angled at A. From A, AD is perpendicular to BC. If AB=5 cm and AC=8 cm, find BC, AD and BD.', [
      tx('The hypotenuse:', 'BC=\\sqrt{AB^{2}+AC^{2}}=\\sqrt{25+64}=\\sqrt{89}\\text{ cm}'),
      tx('Area of the triangle two ways (legs, or base BC with height AD):', '\\frac{1}{2}(AB)(AC)=\\frac{1}{2}(BC)(AD)\\ \\Rightarrow\\ AD=\\frac{5\\times 8}{\\sqrt{89}}=\\frac{40}{\\sqrt{89}}\\approx ' + f(AD, 3) + '\\text{ cm}'),
      tx('In a right triangle AB² = BD·BC, so:', 'BD=\\frac{AB^{2}}{BC}=\\frac{25}{\\sqrt{89}}\\approx ' + f(BD, 3) + '\\text{ cm}')], b);
  })();

  (function () {
    const BE = sq(41); if (!ok('R8 Q6', sq((2 * 25 + 2 * 89 - 64) / 4), BE, 1e-9) || !ok('R8 Q6', sq(25 + 16), BE, 1e-9)) return;
    const A = [0, 0], B = [0, 5], C = [8, 0], E = mid(A, C);
    const b = G.board({ A, B, C, E }, { alt: 'Right triangle ABC with the median BE' });
    b.seg('A', 'B', 0, { label: '5' }).seg('A', 'C', 0, { label: '8' }).seg('B', 'C', 0).pts(['A', 'B', 'C'], 0, { A: { dx: -12, dy: 14 }, B: { dy: -8 }, C: { dy: 14 } }).right('A', 'B', 'C', 0);
    b.pt('E', 1, { dy: 14 }).seg('B', 'E', 2, { color: 'green' });
    add('In the previous question, BE is a median. Find BE using (a) Pythagoras theorem and (b) Apollonius theorem.', [
      'BE is the median from B to the midpoint E of AC. AC = 8, so AE = 4.',
      tx('(a) Pythagoras in the right triangle ABE (right angle at A):', 'BE^{2}=AB^{2}+AE^{2}=25+16=41\\ \\Rightarrow\\ BE=\\sqrt{41}\\text{ cm}'),
      tx('(b) Apollonius: BE² = (2AB² + 2BC² − AC²) / 4 with AB = 5, BC = √89, AC = 8:', 'BE^{2}=\\frac{2(25)+2(89)-64}{4}=\\frac{164}{4}=41\\ \\Rightarrow\\ BE=\\sqrt{41}\\text{ cm}'), 'Both methods agree.'], b);
  })();

  (function () {
    const x = (100 + 361 - 289) / 38, y = 19 - x, h = sq(100 - x * x); if (!ok('R8 Q7', x, 4.53) || !ok('R8 Q7', y, 14.47) || !ok('R8 Q7', h, 8.92)) return;
    const B = [0, 0], C = [19, 0], A = [x, h], D = [x, 0];
    const b = G.board({ A, B, C, D }, { alt: 'Triangle with sides 10, 17, 19 and its altitude' });
    b.seg('B', 'C', 0, { label: '19' }).seg('A', 'B', 0, { label: '10' }).seg('A', 'C', 0, { label: '17' }).pts(['A', 'B', 'C'], 0, { B: { dx: -12, dy: 14 }, C: { dy: 14 } });
    b.seg('A', 'D', 1, { dash: true, color: 'orange', label: 'h' }).pt('D', 1, { dy: 14 }).right('D', 'C', 'A', 1);
    add('Find x and y in the printed triangle with sides 10, 17 and 19 and altitude h to the 19-unit base.', [
      'The altitude h meets the 19-unit base at D. Let BD = x be the projection of the side 10 and DC = y the projection of the side 17, so x + y = 19.',
      tx('Projection formula (all angles are acute):', 'x=\\frac{10^{2}+19^{2}-17^{2}}{2(19)}=\\frac{100+361-289}{38}=\\frac{172}{38}=\\frac{86}{19}\\approx ' + f(x, 2)),
      tx('', 'y=19-x=19-\\frac{86}{19}=\\frac{275}{19}\\approx ' + f(y, 2)), tx('Pythagoras in the right triangle ABD:', 'h=\\sqrt{10^{2}-x^{2}}=\\sqrt{100-' + f(x * x, 2) + '}\\approx ' + f(h, 2))], b);
  })();

  /* ---------- Unit 9 ---------- */
  /* circle with a chord at distance d from the centre; steps: 0 circle, 1 the chord and perpendicular, 2 radius to a chord end */
  function chordBoard(r, d, o) {
    o = o || {}; const half = sq(r * r - d * d), P = { O: [0, 0], M: [0, d], A: [-half, d], B: [half, d] };
    const b = G.board(P, { extent: [[-r, -r], [r, r]], alt: o.alt || 'Circle with a chord and the perpendicular from the centre' });
    b.circle([0, 0], r, 0, { color: 'blue' }).pt('O', 0, { dy: 14, dx: 6 });
    b.seg('A', 'B', 1, { label: o.len }).seg('O', 'M', 1, { dash: true, color: 'orange', label: o.dist }).pt('M', 1, { dy: -8, dx: 6 }).right('M', 'O', 'B', 1).pts(['A', 'B'], 1, { A: { dx: -14 }, B: { dx: 6 } });
    b.seg('O', 'A', 2, { color: 'green', label: o.rad });
    return b;
  }
  const L = x => f(x, 2);

  (function () {
    const half = sq(900 - 100); if (!ok('9.1 Q1', 2 * half, 40 * sq(2), 1e-9)) return;
    add('A circle has radius 30 cm. Find the length of a chord 10 cm from the centre.', [
      'A circle of radius 30 cm. A chord AB lies 10 cm from the centre O.', 'Draw OM perpendicular to the chord. The perpendicular from the centre bisects the chord, so AM = MB.',
      'Join OA. In the right triangle OMA, OA = r = 30 and OM = 10.', tx('Pythagoras:', 'AM=\\sqrt{OA^{2}-OM^{2}}=\\sqrt{900-100}=\\sqrt{800}=20\\sqrt2'),
      tx('The chord is twice AM:', 'AB=2\\times 20\\sqrt2=40\\sqrt2\\text{ cm}\\approx ' + L(2 * half) + '\\text{ cm}')], chordBoard(30, 10, { rad: '30', dist: '10', len: '?' }));
  })();

  (function () {
    const r = sq(24 * 24 + 18 * 18); if (!ok('9.1 Q2', r, 30)) return;
    add('A chord is 48 cm long and 18 cm from the centre. Find the diameter.', [
      'A chord AB of length 48 cm lies 18 cm from the centre O.', 'The perpendicular OM from the centre bisects the chord: AM = 48 / 2 = 24 cm.', 'In the right triangle OMA, OM = 18 and AM = 24, and OA is the radius.',
      tx('Pythagoras:', 'r=OA=\\sqrt{OM^{2}+AM^{2}}=\\sqrt{18^{2}+24^{2}}=\\sqrt{324+576}=\\sqrt{900}=30\\text{ cm}'), tx('The diameter is twice the radius:', 'd=2\\times 30=60\\text{ cm}')], chordBoard(30, 18, { rad: '?', dist: '18', len: '48' }));
  })();

  (function () {
    const d = sq(6.25 - 4); if (!ok('9.1 Q3', d, 1.5, 1e-9)) return;
    add('The diameter of a circle is 5 units. How far from the centre is a chord 4 units long?', [
      'The diameter is 5, so the radius is r = 5 / 2 = 2.5 units.', 'The perpendicular from the centre bisects the chord, so half the chord is 4 / 2 = 2 units.',
      'In the right triangle formed by the radius, the half-chord and the perpendicular distance d: r² = d² + 2².', tx('Solve for d:', 'd=\\sqrt{2.5^{2}-2^{2}}=\\sqrt{6.25-4}=\\sqrt{2.25}=1.5\\text{ units}')], chordBoard(2.5, 1.5, { rad: '2.5', dist: '?', len: '4' }));
  })();

  (function () {
    add('A chord 8 cm long is 5 cm from the centre. Find the radius.', ['Half the chord is 8 / 2 = 4 cm, because the perpendicular from the centre bisects the chord.', 'The radius, the half-chord and the distance 5 cm form a right triangle.', tx('Pythagoras:', 'r=\\sqrt{5^{2}+4^{2}}=\\sqrt{25+16}=\\sqrt{41}\\text{ cm}\\approx ' + L(sq(41)) + '\\text{ cm}')], chordBoard(sq(41), 5, { rad: '?', dist: '5', len: '8' }));
  })();

  (function () {
    add('Find the length of a chord 5 cm from the centre of a circle of radius 8 cm.', ['The perpendicular from the centre bisects the chord. In the right triangle: radius 8 is the hypotenuse and the distance 5 is one leg.', tx('Half the chord:', '\\sqrt{8^{2}-5^{2}}=\\sqrt{64-25}=\\sqrt{39}'), tx('The whole chord is twice that:', '2\\sqrt{39}\\text{ cm}\\approx ' + L(2 * sq(39)) + '\\text{ cm}')], chordBoard(8, 5, { rad: '8', dist: '5', len: '?' }));
  })();

  (function () {
    const r = sq(25 + 144); if (!ok('9.1 Q6', r, 13, 1e-9)) return;
    const Q = [0, 0], Y = [-12, -5], Z = [12, -5], T = [0, -5], ux = Y[0] / r, uy = Y[1] / r;        // reflect Z in the line through Q and Y
    const dot = Z[0] * ux + Z[1] * uy, X = [2 * dot * ux - Z[0], 2 * dot * uy - Z[1]], W = mid(X, Y);
    const b = G.board({ Q, X, Y, Z, T, W }, { extent: [[-r, -r], [r, r]], alt: 'Circle Q with equal perpendiculars QW and QT' });
    b.circle(Q, r, 0).pt('Q', 0, { dy: -8, dx: 6 }).seg('Y', 'Z', 1, { label: '' }).seg('Q', 'T', 1, { dash: true, color: 'orange', label: '5' }).pt('T', 1, { dy: 14 }).pts(['Y', 'Z'], 1, { Y: { dx: -14 }, Z: { dx: 6 } }).right('T', 'Q', 'Z', 1);
    b.seg('X', 'Y', 2, { label: '' }).seg('Q', 'W', 2, { dash: true, color: 'orange', label: '5' }).pt('W', 2, { dx: -14 }).pt('X', 2, { dx: 6, dy: -8 });
    b.seg('X', 'Y', 4, { color: 'green', label: '24' });
    add('In circle Q, QW⊥XY and QT⊥YZ. If QW=QT=5 and YT=12, find XY.', [
      'QT is perpendicular to the chord YZ from the centre, so it bisects YZ: YZ = 2 × 12 = 24.', 'QW is perpendicular to the chord XY and is also 5 from the centre.',
      'Chords that are the same distance from the centre of a circle are equal in length, so XY = YZ.', tx('', 'XY=YZ=2\\times YT=2\\times 12=24\\text{ units}'),
      tx('Check with the radius: QY² = 5² + 12² = 169, so r = 13. For XY: half-chord = √(13² − 5²) = 12, so XY = 24.', '\\sqrt{13^{2}-5^{2}}=12\\ \\Rightarrow\\ XY=24')], b);
  })();

  /* 9.2 */
  (function () {
    const d1 = sq(25 - 16), d2 = sq(25 - 9); if (!ok('9.2 Q1', d1, 3, 1e-9) || !ok('9.2 Q1', d2, 4, 1e-9)) return;
    const b = G.board({ O: [0, 0] }, { extent: [[-5, -5], [5, 5]], alt: 'Circle radius 5 with chords 8 and 6' });
    b.circle([0, 0], 5, 0).pt('O', 0, { dx: 6, dy: 14 });
    b.seg([-4, 3], [4, 3], 1, { label: '8' }).seg([0, 0], [0, 3], 1, { dash: true, color: 'orange', label: '3' });
    b.seg([-3, 4], [3, 4], 2, { label: '6', color: 'purple' }).seg([0, 0], [0, 4], 2, { dash: true, color: 'orange', label: '4' });
    b.seg([-3, -4], [3, -4], 4, { label: '6', color: 'green' }).seg([0, 0], [0, -4], 4, { dash: true, color: 'orange', label: '4' });
    add('In a circle of radius 5 cm, two parallel chords have lengths 8 cm and 6 cm. Find the distance between them.', [
      'The perpendicular from the centre bisects a chord, so each chord with its distance from O and the radius forms a right triangle.', tx('Chord 8 cm (half = 4):', 'd_{1}=\\sqrt{5^{2}-4^{2}}=\\sqrt{9}=3\\text{ cm}'),
      tx('Chord 6 cm (half = 3):', 'd_{2}=\\sqrt{5^{2}-3^{2}}=\\sqrt{16}=4\\text{ cm}'), tx('If both chords are on the same side of the centre, the distance between them is:', '4-3=1\\text{ cm}'),
      'If they lie on opposite sides of the centre (the second diagram), the distance is the sum:', tx('', '3+4=7\\text{ cm}'), 'So the distance is 1 cm (same side) or 7 cm (opposite sides).'], b);
  })();

  (function () {
    const d = (49 - 9 - 12.25) / 6 * 1; const dd = 27.75 / 6, r = sq(dd * dd + 49); if (!ok('9.2 Q2', r, 8.39, 0.006) || !ok('9.2 Q2', (dd + 3) ** 2 + 12.25, r * r, 1e-9)) return;
    const b = G.board({ O: [0, 0] }, { extent: [[-r, -r], [r, r]], alt: 'Circle with parallel chords PQ and MN on the same side of the centre' });
    b.circle([0, 0], r, 0).pt('O', 0, { dx: 6, dy: 14 });
    b.seg([-7, dd], [7, dd], 1, { label: 'MN = 14' }).seg([0, 0], [0, dd], 1, { dash: true, color: 'orange', label: 'd' });
    b.seg([-3.5, dd + 3], [3.5, dd + 3], 2, { label: 'PQ = 7', color: 'purple' }).seg([0, dd], [0, dd + 3], 2, { dash: true, color: 'orange', label: '3' });
    b.seg([0, 0], [7, dd], 3, { color: 'green', label: 'r' });
    add('Two parallel chords PQ and MN are 3 cm apart on the same side of a circle. PQ=7 cm and MN=14 cm. Find the radius.', [
      'Let d be the distance from the centre O to the longer chord MN. The shorter chord PQ is farther from the centre, at distance d + 3. Half-chords: MN/2 = 7 and PQ/2 = 3.5.',
      tx('Radius from the right triangle with MN:', 'r^{2}=d^{2}+7^{2}'), tx('Radius from the right triangle with PQ:', 'r^{2}=(d+3)^{2}+3.5^{2}'),
      tx('Put the two expressions equal:', 'd^{2}+49=d^{2}+6d+9+12.25\\ \\Rightarrow\\ 6d=27.75\\ \\Rightarrow\\ d=' + f(dd, 3)),
      tx('Substitute back:', 'r^{2}=' + f(dd, 3) + '^{2}+49=' + f(dd * dd + 49, 2) + '\\ \\Rightarrow\\ r=\\sqrt{' + f(dd * dd + 49, 2) + '}\\approx ' + L(r) + '\\text{ cm}')], b);
  })();

  (function () {
    const hq = sq(75), hp = 6; if (!ok('9.2 Q3', hq, 8.66, 0.005)) return;
    const b = G.board({ C: [0, 0] }, { extent: [[-10, -10], [10, 10]], alt: 'Circle radius 10 with chords QT and PR' });
    b.circle([0, 0], 10, 0).pt('C', 0, { dx: 6, dy: 14 });
    b.seg([-hq, 5], [hq, 5], 1, { label: 'QT', color: 'purple' }).seg([0, 0], [0, 5], 1, { dash: true, color: 'orange', label: '5' });
    b.seg([-hp, -8], [hp, -8], 2, { label: 'PR', color: 'green' }).seg([0, 0], [0, -8], 2, { dash: true, color: 'orange', label: '8' });
    add('A circle with centre C has radius 10. Chord QT is 5 units from C and chord PR is 8 units from C. (a) Compare PR and QT. (b) Compare their distances from C.', [
      tx('QT: half-chord = √(10² − 5²) = √75, so', 'QT=2\\sqrt{75}=10\\sqrt3\\approx ' + L(2 * hq)), tx('PR: half-chord = √(10² − 8²) = √36 = 6, so', 'PR=2\\times 6=12'),
      '(a) 17.32 > 12, so QT is longer than PR.', '(b) PR is 8 from C and QT is 5 from C, so PR is farther from the centre.', 'In general: in the same circle, the longer chord is nearer the centre.'], b);
  })();

  /* Review Exercise 9 */
  add('In a circle, two chords equally distant from the centre are _____.', ['Each chord, its distance from the centre and the radius make a right triangle with the same hypotenuse (the radius) and the same leg (the distance).', 'So the half-chords are equal, and therefore the chords are equal in length (congruent). The blank is completed with: congruent.']);
  add('In the same circle AB<CD. Which chord is closer to O?', ['The distance of a chord from the centre is d = √(r² − (half-chord)²).', 'A longer chord has a longer half-chord, so d is smaller: the longer chord is closer to the centre.', 'CD is longer than AB, so CD is closer to O.']);
  add('A chord is 5 cm from the centre of a circle of radius 13 cm. Find its length.', ['The perpendicular from the centre bisects the chord, so half the chord is a leg of a right triangle with hypotenuse 13 and other leg 5.', tx('', '\\text{half-chord}=\\sqrt{13^{2}-5^{2}}=\\sqrt{169-25}=\\sqrt{144}=12'), tx('The chord is twice that:', '2\\times 12=24\\text{ cm}')].slice(0, 3).concat([]), chordBoard(13, 5, { rad: '13', dist: '5', len: '?' }));
  add('A chord 40 units long lies in a circle of radius 25. Find its distance from the centre.', ['Half the chord is 40 / 2 = 20 units.', tx('The distance d satisfies r² = d² + 20²:', 'd=\\sqrt{25^{2}-20^{2}}=\\sqrt{625-400}=\\sqrt{225}=15\\text{ units}')], chordBoard(25, 15, { rad: '25', dist: '?', len: '40' }));
  add('A chord 8√3 units long is 4 units from the centre. Find the radius.', ['Half the chord is 4√3 units.', tx('Pythagoras with the distance 4:', 'r=\\sqrt{(4\\sqrt3)^{2}+4^{2}}=\\sqrt{48+16}=\\sqrt{64}=8\\text{ units}')], chordBoard(8, 4, { rad: '?', dist: '4', len: '8√3' }));
  add('A circle has radius 5 cm and a chord is 4 cm from O. Find the chord length.', ['The perpendicular from O bisects the chord. Half-chord = √(r² − d²).', tx('', '\\sqrt{5^{2}-4^{2}}=\\sqrt{9}=3\\ \\Rightarrow\\ \\text{chord}=2\\times 3=6\\text{ cm}')], chordBoard(5, 4, { rad: '5', dist: '4', len: '?' }));

  (function () {
    const b = G.board({ O: [0, 0] }, { extent: [[-5, -5], [5, 5]], alt: 'Circle radius 5, diameter AC perpendicular to chord BD at E' });
    b.circle([0, 0], 5, 0).pt('O', 0, { dx: -12, dy: 14 }).seg([-5, 0], [5, 0], 0, { color: 'orange' }).pt([-5, 0], 0, { label: 'A', dx: -14 }).pt([5, 0], 0, { label: 'C', dx: 6 });
    b.pt([3, 0], 1, { label: 'E', dy: 14 }).seg([3, -4], [3, 4], 1, { label: 'BD' }).pt([3, 4], 1, { label: 'B', dy: -8 }).pt([3, -4], 1, { label: 'D', dy: 14 }).right([3, 0], [5, 0], [3, 4], 1);
    b.seg([0, 0], [3, 4], 2, { color: 'green', label: '5' }).seg([0, 0], [3, 0], 2, { dash: true, color: 'orange', label: '3' });
    add('Radius 5, CE=2, and diameter AC is perpendicular to chord BD at E. Find BD.', [
      'The diameter AC passes through the centre O, and CE = 2, so OE = OC − CE = 5 − 2 = 3.', 'A diameter perpendicular to a chord bisects it, so BE = ED.',
      tx('In the right triangle OEB with hypotenuse OB = 5:', 'BE=\\sqrt{OB^{2}-OE^{2}}=\\sqrt{25-9}=4'), tx('', 'BD=2\\times BE=8')], b);
  })();

  (function () {
    const o = [['(i)', 13, 5, 12, 24], ['(iii)', 17, 8, 15, 30]]; if (sq(169 - 25) !== 12 || sq(289 - 64) !== 15 || sq(100 + 36) * 0 !== 0 || sq(10 * 10) !== 10) return;
    if (!ok('R9 Q8', 2 * sq(625 - 49), 48, 1e-9) || !ok('R9 Q8', sq(25 + 25), 5 * sq(2), 1e-9)) return;
    add('In circle O, OA is a radius and AB⊥OC. Find: (i) AC and AB if AO=13 m and OC=5 m; (ii) radius and diameter if AB=16 cm and its distance from O is 6 cm; (iii) the distance from O to a 30 cm chord when the diameter is 34 cm; (iv) AB if r=25 and its distance from O is 7; (v) OA if AB=10 m and its distance from O is 5 m.', [
      'In every part OC is perpendicular to the chord AB, so C is the midpoint of AB and OAC is a right triangle: OA² = OC² + AC², with AB = 2·AC.',
      tx('(i) AO = 13, OC = 5:', 'AC=\\sqrt{13^{2}-5^{2}}=12\\text{ m},\\qquad AB=2\\times 12=24\\text{ m}'), tx('(ii) AB = 16 so AC = 8, OC = 6:', 'r=OA=\\sqrt{8^{2}+6^{2}}=10\\text{ cm},\\qquad \\text{diameter}=20\\text{ cm}'),
      tx('(iii) Diameter 34 gives r = 17, AC = 15:', 'OC=\\sqrt{17^{2}-15^{2}}=\\sqrt{64}=8\\text{ cm}'), tx('(iv) r = 25, OC = 7:', 'AC=\\sqrt{25^{2}-7^{2}}=\\sqrt{576}=24\\ \\Rightarrow\\ AB=48\\text{ units}'),
      tx('(v) AB = 10 so AC = 5, OC = 5:', 'OA=\\sqrt{5^{2}+5^{2}}=\\sqrt{50}=5\\sqrt2\\text{ m}')], chordBoard(13, 5, { rad: '13', dist: '5', len: '?' }));
  })();

  (function () {
    const r = 17, d = 15; if (!ok('R9 Q9', r * r, d * d + 64, 1e-9) || !ok('R9 Q9', (d + 2) ** 2, r * r, 1e-9)) return;
    const O = [0, -15], X = [-8, 0], Y = [8, 0], N = [0, 0], P = [0, 2];
    const b = G.board({ O, X, Y, N, P }, { extent: [[-17, -32], [17, 2]], alt: 'Circle with chord XY and its perpendicular bisector through N and P' });
    b.circle(O, r, 0).pt('O', 0, { dx: 6, dy: 14 }).seg('X', 'Y', 1, { label: '16' }).pts(['X', 'Y', 'N'], 1, { X: { dx: -14 }, Y: { dx: 6 }, N: { dy: 14, dx: 6 } }).seg('N', 'P', 1, { color: 'orange', label: '2' }).pt('P', 1, { dy: -8 });
    b.seg('O', 'N', 2, { dash: true, color: 'purple', label: 'd' }).seg('O', 'P', 3, { color: 'green', label: 'r' });
    add('The perpendicular bisector of chord XY meets XY at N and the circle at P. If XY=16 cm and NP=2 cm, calculate the radius.', [
      'The perpendicular bisector of a chord passes through the centre O, so O lies on the line PN extended.', 'Since N bisects XY: XN = 16 / 2 = 8.',
      'Let ON = d. Then the radius OP = d + 2 (O is d below N and P is 2 above N). Also OX = r = d + 2.', tx('Pythagoras in the right triangle OXN:', '(d+2)^{2}=d^{2}+8^{2}'),
      tx('Expand and solve:', 'd^{2}+4d+4=d^{2}+64\\ \\Rightarrow\\ 4d=60\\ \\Rightarrow\\ d=15'), tx('So the radius is:', 'r=d+2=15+2=17\\text{ cm}')], b);
  })();
})(typeof window !== 'undefined' ? window : globalThis);
