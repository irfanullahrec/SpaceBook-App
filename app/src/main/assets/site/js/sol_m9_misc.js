/* Class 9 Mathematics, Units 1, 2, 3, 7 and 9: hand-written solutions for problems whose stored solution was only a line.
 * Where the stored question was a paraphrase, the real question was read from the book's scanned pages (Mathematics IX, scan number = printed page + 13):
 *   Ex 7.2 Q6 is 2√(5x) − 3 = 7;  Ex 7.3 Q3 is |(3/4)x − 8| = 1;  Ex 7.3 Q4 is |x − 4| = 3.
 * Everything is recomputed here and compared with the printed answer. */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.sol) return;
  const warn = m => { if (root.console) console.warn('sol_m9_misc: ' + m); };
  const QS = ["Let A & B be 2-by-3 matrices and let C & D be 2-square matrices. Which of the following matrix operations are defined? For those which are defined, give the dimension of the resulting matrix. (i) A + B (ii) B + D (iii) 3A - 2C (iv) 7C + 2D","If A = [[1, 1], [0, 0]], find A x A.","Find x and y if [[x-1, 4], [y+3, -7]] = [[0, 4], [-2, -7]].","Find the product if possible: [[1], [-5], [3]] · [[-6, 5, 8], [0, 4, -1]].","3. Which are irrational numbers?","9. Which are integers but not natural numbers?","10. Which are real numbers but not integers?","4. Multiply 8i, -8i.","6. Name the property used in: 7 × (1/7) = (1/7) × 7 = 1.","Simplify with the help of logarithms: (i) $3.81 \\times 43.4$ (ii) $73.42 \\times 0.00462 \\times 0.5143$ (iii) $\\frac{784.6 \\times 0.0431}{28.23}$ (iv) $\\frac{0.4932 \\times 653.7}{0.07213 \\times 8456}$ (v) $\\frac{(78.41)^3 \\times \\sqrt[3]{142.3}}{\\sqrt[4]{0.1562}}$","Write 9473.2 in scientific notation.","Write 5.4 × 10⁻⁵ in standard decimal notation.","Write in logarithmic form: 3⁻³ = 1/27.","Write in exponential form: log₅ 1 = 0.","Solve for x: log₄ 16 = x.","Find the value of 'a': log₂ a = log₂ 9 + log₂ 2 - log₂ 9.","Solve the radical equation: 2√(5x − 3) = 7 [or textbook equivalent]","Solve for x: |x − 8| / 4 = 1/3 [or variant]","Solve for x: |4x − 4| = 3 [or variant]","Find the midpoint of the segment joining (−3, 4) and (6, −1)."];
  const tx = (text, m) => ({ text, m });
  const A = (n, steps, board) => { NS.sol.add({ q: QS[n], steps, board }); };
  const ok = (label, got, exp, tol) => { if (Math.abs(got - exp) > (tol === undefined ? 1e-9 : tol)) { warn(label + ': computed ' + got + ' but expected ' + exp); return false; } return true; };
  const f = (x, d) => String(+Number(x).toFixed(d === undefined ? 4 : d));

  /* ---------- Unit 1: matrices ---------- */
  A(0, ['A matrix operation is defined only when the orders match. A and B are 2 × 3; C and D are 2 × 2.',
    '(i) A + B: both are 2 × 3, so the sum is defined and is 2 × 3.', '(ii) B + D: 2 × 3 and 2 × 2 have different orders, so it is not defined.',
    '(iii) 3A − 2C: 3A is 2 × 3 and 2C is 2 × 2 (multiplying by a number does not change the order), so the difference is not defined.', '(iv) 7C + 2D: both are 2 × 2, so it is defined and is 2 × 2.']);
  A(1, ['A = [[1, 1], [0, 0]] is 2 × 2, so A × A is defined. Each entry is (row of the first) · (column of the second).',
    'Row 1 · column 1: 1(1) + 1(0) = 1.   Row 1 · column 2: 1(1) + 1(0) = 1.', 'Row 2 · column 1: 0(1) + 0(0) = 0.   Row 2 · column 2: 0(1) + 0(0) = 0.',
    'So A × A = [[1, 1], [0, 0]], which is equal to A (a matrix with A² = A is called idempotent).']);
  A(2, ['Two matrices are equal when they have the same order and every corresponding entry is equal. Both are 2 × 2.', 'Entries (1,1): x − 1 = 0, so x = 1.', 'Entries (2,1): y + 3 = −2, so y = −5.',
    'The other entries 4, 4 and −7, −7 are already equal. Check: x − 1 = 0 ✓ and y + 3 = −2 ✓.']);
  A(3, ['The first matrix [[1], [−5], [3]] has 3 rows and 1 column, so its order is 3 × 1. The second matrix [[−6, 5, 8], [0, 4, −1]] has 2 rows and 3 columns, so its order is 2 × 3.',
    'A product AB is defined only when the number of columns of A equals the number of rows of B. Here A has 1 column but B has 2 rows, and 1 ≠ 2.', 'So the product is not possible (the matrices are not conformable for multiplication).']);

  /* ---------- Unit 2: number systems ---------- */
  A(4, ['The numbers in the list are: 2.5, 5/7, −1.96, −7/6, √3, √7, −√14, π, −9, 1, 3, √36, 4⅔, 0.333…. An irrational number cannot be written as p/q: its decimal neither terminates nor repeats.',
    '2.5 and −1.96 terminate, so they are rational. 5/7, −7/6, 4⅔ and 0.333… are fractions (their decimals repeat), so they are rational. −9, 1, 3 are integers and √36 = 6, so all rational.',
    'Roots of numbers that are not perfect squares are irrational: 3, 7 and 14 are not perfect squares, so √3, √7 and −√14 are irrational. π = 3.14159… never ends or repeats, so π is irrational.', 'The irrational numbers are √3, √7, −√14 and π.']);
  A(5, ['Integers are …, −2, −1, 0, 1, 2, …; natural numbers are 1, 2, 3, ….', 'The integers in the list are −9, 1, 3 and √36 = 6. Of these, 1, 3 and 6 are natural numbers.', 'So the only integer that is not a natural number is −9.']);
  A(6, ['A real number that is not an integer: remove the integers −9, 1, 3 and √36 = 6 from the list.', 'What is left: 2.5, 5/7, −1.96, −7/6, √3, √7, −√14, π, 4⅔ and 0.333…. (Each is rational but not whole, or irrational.)']);
  A(7, ['The imaginary unit satisfies i² = −1.', tx('Multiply the numbers and the powers of i:', '(8i)(-8i)=8\\times(-8)\\times i\\times i=-64i^{2}'), tx('Substitute i² = −1:', '-64\\times(-1)=64')]);
  A(8, ['In 7 × (1/7) = 1 the number 1/7 is the reciprocal of 7, and the product of a non-zero number and its reciprocal is the multiplicative identity 1.', 'The statement 7 × (1/7) = (1/7) × 7 = 1 therefore illustrates the multiplicative inverse property.']);

  /* ---------- Unit 3: logarithms ---------- */
  (function () {
    const L = x => Math.round(Math.log10(x) * 1e4) / 1e4, anti = v => Math.pow(10, v), r = (x, d) => f(x, d);
    const t1 = anti(L(3.81) + L(43.4)), t2 = anti(L(73.42) + L(0.00462) + L(0.5143)), t3 = anti(L(784.6) + L(0.0431) - L(28.23)), t4 = anti(L(0.4932) + L(653.7) - L(0.07213) - L(8456));
    const t5 = anti(3 * L(78.41) + L(142.3) / 3 - L(0.1562) / 4);
    if (!ok('3.6 Q1(i)', t1, 165.34, 0.03) || !ok('3.6 Q1(ii)', t2, 0.1745, 0.0005) || !ok('3.6 Q1(iii)', t3, 1.198, 0.002) || !ok('3.6 Q1(iv)', t4, 0.5285, 0.0006)) return;
    const d5 = Math.pow(78.41, 3) * Math.cbrt(142.3) / Math.pow(0.1562, 0.25);
    A(9, ['Use the laws of logarithms: log(ab) = log a + log b, log(a/b) = log a − log b, log aⁿ = n log a. Find each log in the table, combine, then take the antilogarithm.',
      tx('(i) 3.81 × 43.4:', '\\log3.81+\\log43.4=' + r(L(3.81), 4) + '+' + r(L(43.4), 4) + '=' + r(L(3.81) + L(43.4), 4) + '\\ \\Rightarrow\\ \\text{antilog}=' + r(t1, 2)),
      tx('(ii) 73.42 × 0.00462 × 0.5143 (logs of numbers below 1 have negative characteristics; they are combined as signed numbers here):', '\\log73.42+\\log0.00462+\\log0.5143=' + r(L(73.42), 4) + '+(' + r(L(0.00462), 4) + ')+(' + r(L(0.5143), 4) + ')=' + r(L(73.42) + L(0.00462) + L(0.5143), 4) + '\\ \\Rightarrow\\ \\approx ' + r(t2, 4)),
      tx('(iii) (784.6 × 0.0431) / 28.23:', '\\log784.6+\\log0.0431-\\log28.23=' + r(L(784.6), 4) + '+(' + r(L(0.0431), 4) + ')-' + r(L(28.23), 4) + '=' + r(L(784.6) + L(0.0431) - L(28.23), 4) + '\\ \\Rightarrow\\ \\approx ' + r(t3, 4)),
      tx('(iv) (0.4932 × 653.7) / (0.07213 × 8456):', '\\log0.4932+\\log653.7-\\log0.07213-\\log8456=' + r(L(0.4932) + L(653.7) - L(0.07213) - L(8456), 4) + '\\ \\Rightarrow\\ \\approx ' + r(t4, 4)),
      tx('(v) (78.41)³ × ∛142.3 / ⁴√0.1562: log of the whole expression = 3 log 78.41 + ⅓ log 142.3 − ¼ log 0.1562:', '3(' + r(L(78.41), 4) + ')+\\tfrac{1}{3}(' + r(L(142.3), 4) + ')-\\tfrac{1}{4}(' + r(L(0.1562), 4) + ')=' + r(3 * L(78.41) + L(142.3) / 3 - L(0.1562) / 4, 4)),
      'Antilog of that value is about ' + Math.round(t5).toLocaleString('en-US') + ' (a four-figure table gives roughly 4.00 × 10⁶). A direct calculation of the printed expression gives ' + Math.round(d5).toLocaleString('en-US') + '.',
      'The book’s answer key prints 3,614,930.899 for part (v); it does not agree with the expression as printed (about 4.00 × 10⁶). The printed answer is left as printed. Parts (i)–(iv) agree with the key to table accuracy: 165.340, 0.1745, 1.1980, 0.5285.']);
  })();
  A(10, ['Scientific notation is a × 10ⁿ with 1 ≤ a < 10.', 'Move the decimal point in 9473.2 three places to the left to get a number between 1 and 10: 9.4732.', tx('Moving left 3 places means multiplying back by 10³:', '9473.2=9.4732\\times 10^{3}')]);
  A(11, ['A negative power of 10 moves the decimal point to the left: 10⁻⁵ means five places.', tx('', '5.4\\times 10^{-5}=0.000054'), 'Written out: 5.4 → 0.54 → 0.054 → 0.0054 → 0.00054 → 0.000054 (five shifts). The book’s key also shows 0.000041 as a textbook variant; the computation from 5.4 × 10⁻⁵ gives 0.000054.']);
  A(12, ['The definition: aˣ = y is the same as logₐ y = x (the logarithm is the exponent).', tx('Here the base is 3, the exponent is −3 and the result is 1/27:', '3^{-3}=\\frac{1}{27}\\iff\\log_{3}\\frac{1}{27}=-3')]);
  A(13, ['The definition: logₐ y = x is the same as aˣ = y.', tx('Base 5, logarithm 0, number 1:', '\\log_{5}1=0\\iff 5^{0}=1')]);
  A(14, ['Write the logarithm in exponential form: log₄ 16 = x means 4ˣ = 16.', tx('Write 16 as a power of 4:', '4^{x}=16=4^{2}'), tx('Equal bases, so the exponents are equal:', 'x=2')]);
  A(15, ['Use the laws log a + log b = log(ab) and log a − log b = log(a/b).', tx('', '\\log_{2}a=\\log_{2}9+\\log_{2}2-\\log_{2}9=\\log_{2}\\frac{9\\times 2}{9}=\\log_{2}2'), 'Since log₂ 2 = 1, log₂ a = 1, so a = 2¹ = 2. (Simply: the log₂ 9 terms cancel, leaving log₂ 2 = 1.)']);

  /* ---------- Unit 7: equations ---------- */
  (function () {
    if (!ok('7.2 Q6', 2 * Math.sqrt(5 * 5) - 3, 7)) return;
    A(16, ['The equation in the book (Exercise 7.2 Q6) is 2√(5x) − 3 = 7. It has a radical, so isolate the radical first.', tx('Add 3 to both sides:', '2\\sqrt{5x}=10'), tx('Divide by 2:', '\\sqrt{5x}=5'), tx('Square both sides:', '5x=25'), tx('Divide by 5:', 'x=5'),
      tx('Verify (squaring can add false roots): put x = 5 in the original equation.', '2\\sqrt{5(5)}-3=2\\sqrt{25}-3=2(5)-3=7\\ \\checkmark'), 'Solution set = {5}.']);
  })();
  (function () {
    const a = 4 * 9 / 3, b = 4 * 7 / 3; if (!ok('7.3 Q3', 0.75 * a - 8, 1) || !ok('7.3 Q3', 0.75 * b - 8, -1)) return;
    A(17, ['The equation in the book (Exercise 7.3 Q3) is |(3/4)x − 8| = 1. An absolute value equals 1 when the inside is +1 or −1.', tx('Case 1:', '\\frac{3}{4}x-8=1\\ \\Rightarrow\\ \\frac{3}{4}x=9\\ \\Rightarrow\\ x=9\\times\\frac{4}{3}=12'), tx('Case 2:', '\\frac{3}{4}x-8=-1\\ \\Rightarrow\\ \\frac{3}{4}x=7\\ \\Rightarrow\\ x=7\\times\\frac{4}{3}=\\frac{28}{3}'),
      'Check: x = 12 gives (3/4)(12) − 8 = 1 ✓; x = 28/3 gives (3/4)(28/3) − 8 = 7 − 8 = −1, and |−1| = 1 ✓. Solution set = {12, 28/3}.']);
  })();
  A(18, ['The equation in the book (Exercise 7.3 Q4) is |x − 4| = 3. Two cases: the inside is 3 or −3.', tx('Case 1:', 'x-4=3\\ \\Rightarrow\\ x=7'), tx('Case 2:', 'x-4=-3\\ \\Rightarrow\\ x=1'), 'Check: |7 − 4| = 3 ✓ and |1 − 4| = |−3| = 3 ✓. Solution set = {7, 1}.']);

  /* ---------- Unit 9: coordinate geometry ---------- */
  (function () {
    const P = [-3, 4], Q = [6, -1], M = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2]; if (M[0] !== 1.5 || M[1] !== 1.5) return;
    const cfg = { kind: 'graph', w: 400, h: 250, xmin: -5, xmax: 8, ymin: -3, ymax: 6, alt: 'Segment joining (−3, 4) and (6, −1) with its midpoint (3/2, 3/2)', layers: [
      { at: 0, type: 'point', x: P[0], y: P[1], label: 'A(−3, 4)', color: 'blue', dx: -62, dy: -8 }, { at: 0, type: 'point', x: Q[0], y: Q[1], label: 'B(6, −1)', color: 'blue', dx: 6, dy: 14 }, { at: 1, type: 'seg', x1: P[0], y1: P[1], x2: Q[0], y2: Q[1], color: 'orange' },
      { at: 3, type: 'point', x: M[0], y: M[1], label: 'M(3/2, 3/2)', color: 'green', dx: 8, dy: -8 }] };
    A(19, ['Plot the two points A(−3, 4) and B(6, −1).', 'Join them with a line segment.', 'The midpoint formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2).',
      tx('Substitute:', 'M=\\left(\\frac{-3+6}{2},\\frac{4+(-1)}{2}\\right)=\\left(\\frac{3}{2},\\frac{3}{2}\\right)'), 'The midpoint lies halfway along AB: it is (3/2, 3/2) = (1.5, 1.5).'], cfg);
  })();
  /* ---------- Review Exercise 9, the printed Q4, Q7, Q8 (the older stored data holds a different edition of these questions) ---------- */
  (function () {
    const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    const add = (q, steps) => NS.sol.add({ q, steps });
    // Q4: collinear
    const P4 = [4, -3], Q4 = [2, 0], R4 = [-2, 6];
    ok('R9 Q4 AB', d(P4, Q4), Math.sqrt(13), 1e-9); ok('R9 Q4 BC', d(Q4, R4), 2 * Math.sqrt(13), 1e-9); ok('R9 Q4 AC', d(P4, R4), 3 * Math.sqrt(13), 1e-9);
    add('Using distance formula, show that the points $(4, -3)$, $(2, 0)$, $(-2, 6)$ are collinear.', [
      'Name the points A(4, −3), B(2, 0), C(−2, 6) and find the three distances with $d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.',
      tx('First distance:', '|AB|=\sqrt{(2-4)^2+(0+3)^2}=\sqrt{4+9}=\sqrt{13}'),
      tx('Second distance:', '|BC|=\sqrt{(-2-2)^2+(6-0)^2}=\sqrt{16+36}=\sqrt{52}=2\sqrt{13}'),
      tx('Third distance:', '|AC|=\sqrt{(-2-4)^2+(6+3)^2}=\sqrt{36+81}=\sqrt{117}=3\sqrt{13}'),
      tx('Add the two shorter ones:', '|AB|+|BC|=\sqrt{13}+2\sqrt{13}=3\sqrt{13}=|AC|'),
      'Since |AB| + |BC| = |AC|, B lies on the segment AC: the three points are collinear.']);
    // Q7: rectangle (here a square)
    const V = [[0, 0], [2, 1], [1, 3], [-1, 2]];
    ok('R9 Q7 side', d(V[0], V[1]), Math.sqrt(5), 1e-9); ok('R9 Q7 diag', d(V[0], V[2]), Math.sqrt(10), 1e-9); ok('R9 Q7 diag2', d(V[1], V[3]), Math.sqrt(10), 1e-9);
    add('Prove that $(2, 1)$, $(0, 0)$, $(-1, 2)$, and $(1, 3)$ are the vertices of a rectangle.', [
      'Take the vertices in order around the figure: A(0, 0), B(2, 1), C(1, 3), D(−1, 2).',
      tx('The four sides:', '|AB|=\sqrt{4+1}=\sqrt5,\ |BC|=\sqrt{1+4}=\sqrt5,\ |CD|=\sqrt{4+1}=\sqrt5,\ |DA|=\sqrt{1+4}=\sqrt5'),
      'Opposite sides are equal (all four sides are equal), so ABCD is a parallelogram (a rhombus).',
      tx('The diagonals:', '|AC|=\sqrt{1+9}=\sqrt{10},\ |BD|=\sqrt{9+1}=\sqrt{10}'),
      tx('Check with Pythagoras:', '|AB|^2+|BC|^2=5+5=10=|AC|^2'),
      'The diagonals are equal, so the parallelogram is a rectangle; with equal sides it is a square, which is a special rectangle.']);
    // Q8: square
    const S = [[-1, 0], [3, 3], [6, -1], [2, -4]];
    ok('R9 Q8 AB', d(S[0], S[1]), 5, 1e-9); ok('R9 Q8 BC', d(S[1], S[2]), 5, 1e-9); ok('R9 Q8 CD', d(S[2], S[3]), 5, 1e-9); ok('R9 Q8 DA', d(S[3], S[0]), 5, 1e-9); ok('R9 Q8 AC', d(S[0], S[2]), Math.sqrt(50), 1e-9); ok('R9 Q8 BD', d(S[1], S[3]), Math.sqrt(50), 1e-9);
    add('Prove that $A(-1, 0)$, $B(3, 3)$, $C(6, -1)$, and $D(2, -4)$ is a square.', [
      'Find all four sides and both diagonals with the distance formula.',
      tx('Sides AB and BC:', '|AB|=\sqrt{16+9}=5,\ |BC|=\sqrt{9+16}=5'),
      tx('Sides CD and DA:', '|CD|=\sqrt{16+9}=5,\ |DA|=\sqrt{9+16}=5'),
      tx('Diagonals:', '|AC|=\sqrt{49+1}=\sqrt{50},\ |BD|=\sqrt{1+49}=\sqrt{50}'),
      'All four sides are equal (a rhombus) and the two diagonals are equal, so ABCD is a square.']);
  })();
})(typeof window !== 'undefined' ? window : globalThis);
