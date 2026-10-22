/* Class 9 Mathematics: hand-written worked solutions for problems whose data had no real solution (Review Exercise 4 and others).
 * The questions were read from the book's scanned pages (Mathematics IX, printed page = scan number - 13) because the data kept only a short paraphrase;
 * every result is computed here (numerically cross-checked) and compared with the printed answer. A disagreement is stated in the steps and the printed answer is left untouched. */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.sol) return;
  const warn = m => { if (root.console) console.warn('sol_m9_alg: ' + m); };
  const tx = (text, m) => ({ text, m });
  const add = (q, steps) => NS.sol.add({ q, steps });
  const ok = (label, got, exp, tol) => { if (Math.abs(got - exp) > (tol === undefined ? 1e-9 : tol)) { warn(label + ': computed ' + got + ' but expected ' + exp); return false; } return true; };

  /* ---------- Review Exercise 4 (book page 124) ---------- */
  (function () {
    const f = (a, x, y, b) => (12 * x ** 4 * y ** 5) / (25 * a ** 3 * b ** 4) * (15 * a ** 5 * b ** 4) / (16 * x ** 7 * y ** 2), g = (a, x, y) => 9 * a * a * y ** 3 / (20 * x ** 3);
    if (!ok('R4 Q2', f(2, 3, 5, 7), g(2, 3, 5), 1e-9)) return;
    add('Simplify the rational expression to lowest terms:', [
      'The question in the book (Review Exercise 4, Q2): simplify  (12x⁴y⁵ / 25a³b⁴) · (15a⁵b⁴ / 16x⁷y²).',
      tx('Multiply the numerators and the denominators:', '\\frac{12x^{4}y^{5}}{25a^{3}b^{4}}\\cdot\\frac{15a^{5}b^{4}}{16x^{7}y^{2}}=\\frac{(12)(15)\\,x^{4}y^{5}a^{5}b^{4}}{(25)(16)\\,a^{3}b^{4}x^{7}y^{2}}'),
      tx('Divide the numbers by their common factor 20 (180 / 400 = 9 / 20) and subtract exponents of equal letters (a⁵/a³ = a², b⁴/b⁴ = 1, y⁵/y² = y³, x⁴/x⁷ = 1/x³):', '=\\frac{180}{400}\\cdot\\frac{a^{5-3}\\,b^{4-4}\\,y^{5-2}}{x^{7-4}}=\\frac{9a^{2}y^{3}}{20x^{3}}')]);
  })();

  (function () {
    if (!ok('R4 Q3', (2 * 2 - 3) / (4 - 2 + 1), 1 / 3)) return;
    add('Evaluate the algebraic fraction at given values:', [
      'The question in the book (Review Exercise 4, Q3): evaluate (2x − 3) / (x² − x + 1) for x = 2.',
      'First check that the denominator is not zero at x = 2: 2² − 2 + 1 = 3 ≠ 0, so the fraction is defined.',
      tx('Substitute x = 2 in the numerator and the denominator:', '\\frac{2x-3}{x^{2}-x+1}=\\frac{2(2)-3}{2^{2}-2+1}=\\frac{4-3}{4-2+1}=\\frac{1}{3}')]);
  })();

  add('If a + b = 7 and a − b = 3, find a² + b² and ab.', [
    'Use the formulas (a + b)² + (a − b)² = 2(a² + b²) and (a + b)² − (a − b)² = 4ab.',
    tx('Sum of the squares:', '2(a^{2}+b^{2})=7^{2}+3^{2}=49+9=58\\ \\Rightarrow\\ a^{2}+b^{2}=29'), tx('The product:', '4ab=7^{2}-3^{2}=49-9=40\\ \\Rightarrow\\ ab=10'),
    'Check: a = (7 + 3)/2 = 5 and b = (7 − 3)/2 = 2, so a² + b² = 25 + 4 = 29 and ab = 10 ✓.']);

  add('Find the value of the unknown expression taking square roots:', [
    'The question in the book (Review Exercise 4, Q5): find the value of a + b + c when a² + b² + c² = 43 and ab + bc + ca = 3.',
    tx('Use the formula (a + b + c)² = a² + b² + c² + 2(ab + bc + ca):', '(a+b+c)^{2}=43+2(3)=49'), tx('Take square roots (both signs):', 'a+b+c=\\pm\\sqrt{49}=\\pm 7')]);

  add('Find the value of ab + bc + ca from trinomial square formula:', [
    'The question in the book (Review Exercise 4, Q6): if a + b + c = 6 and a² + b² + c² = 24, find ab + bc + ca.',
    tx('From (a + b + c)² = a² + b² + c² + 2(ab + bc + ca):', '36=24+2(ab+bc+ca)'), tx('Solve:', '2(ab+bc+ca)=12\\ \\Rightarrow\\ ab+bc+ca=6')]);

  (function () {
    const d = 8, xy = 2, v = d ** 3 + 18 * xy * d;      // 8x³ − 27y³ = (2x − 3y)³ + 18xy(2x − 3y)
    // numeric cross-check with real numbers: choose y from 2x − 3y = 8, xy = 2 -> 2x² - 8x - 6 = 0 ... x = 2 + sqrt(7)
    const x = 2 + Math.sqrt(7), y = (2 * x - 8) / 3; if (!ok('R4 Q7 xy', x * y, 2, 1e-9)) return;
    if (!ok('R4 Q7', 8 * x ** 3 - 27 * y ** 3, v, 1e-6)) return;
    add('Evaluate cube formula expression:', [
      'The question in the book (Review Exercise 4, Q7): if 2x − 3y = 8 and xy = 2, find the value of 8x³ − 27y³.',
      'Write the cubes as 8x³ = (2x)³ and 27y³ = (3y)³ and use a³ − b³ = (a − b)³ + 3ab(a − b) with a = 2x and b = 3y. Then ab = 6xy = 12.',
      tx('Substitute a − b = 8 and ab = 12:', '8x^{3}-27y^{3}=(2x-3y)^{3}+3(6xy)(2x-3y)=8^{3}+3(12)(8)=512+288=800'),
      'Check with actual numbers: the system 2x − 3y = 8, xy = 2 has the solution x = 2 + √7 ≈ ' + x.toFixed(4) + ', y = ' + y.toFixed(4) + ', and 8x³ − 27y³ = ' + (8 * x ** 3 - 27 * y ** 3).toFixed(4) + ' ✓.',
      'Note: the book’s answer key prints 1360 here; the computation above, confirmed by the numerical check, gives 800. The printed answer is left as printed.']);
  })();

  (function () {
    if (!ok('R4 Q8', 8 ** 3 - 3 * 8, 488)) return;
    add('Find the value of x³ − y³:', [
      'The question in the book (Review Exercise 4, Q8): if x + 1/x = 8, find the value of x³ + 1/x³.',
      tx('Cube both sides of x + 1/x = 8 using (a + b)³ = a³ + b³ + 3ab(a + b) with a = x, b = 1/x (so ab = 1):', '\\left(x+\\frac{1}{x}\\right)^{3}=x^{3}+\\frac{1}{x^{3}}+3\\left(x+\\frac{1}{x}\\right)'),
      tx('Substitute x + 1/x = 8:', '512=x^{3}+\\frac{1}{x^{3}}+3(8)\\ \\Rightarrow\\ x^{3}+\\frac{1}{x^{3}}=512-24=488')]);
  })();

  (function () {
    const x = 1.7, a = 4 * x / 5, b = 5 / (4 * x), lhs = (a - b) * (a * a + 25 / (16 * x * x) + 1), rhs = 64 * x ** 3 / 125 - 125 / (64 * x ** 3);
    if (!ok('R4 Q9', lhs, rhs, 1e-9)) return;
    add('Expand using sum of cubes formula:', [
      'The question in the book (Review Exercise 4, Q9): find the product (4x/5 − 5/(4x)) (16x²/25 + 25/(16x²) + 1).',
      'Put a = 4x/5 and b = 5/(4x). Then ab = 1, a² = 16x²/25 and b² = 25/(16x²), so the second bracket is a² + ab + b² = a² + b² + 1.',
      tx('The product is (a − b)(a² + ab + b²) = a³ − b³ (difference of cubes):', '\\left(\\frac{4x}{5}-\\frac{5}{4x}\\right)\\left(\\frac{16x^{2}}{25}+\\frac{25}{16x^{2}}+1\\right)=\\left(\\frac{4x}{5}\\right)^{3}-\\left(\\frac{5}{4x}\\right)^{3}'),
      tx('Cube each term:', '=\\frac{64x^{3}}{125}-\\frac{125}{64x^{3}}'),
      'Check at x = 1.7: the product equals ' + lhs.toFixed(6) + ' and 64x³/125 − 125/(64x³) = ' + rhs.toFixed(6) + ' ✓. Note: the book’s answer key prints a plus sign between the two terms, but the factor (a − b) makes it a minus; the printed answer is left as printed.']);
  })();

  (function () {
    const x = 3, v = 2 * x * x / (x ** 4 - 16) - x / (x * x - 4) + 1 / (x + 2), r = -8 / (x ** 4 - 16); if (!ok('R4 Q10', v, r, 1e-12)) return;
    add('Simplify the difference of rational expressions:', [
      'The question in the book (Review Exercise 4, Q10): simplify 2x²/(x⁴ − 16) − x/(x² − 4) + 1/(x + 2).',
      tx('Factorize the denominators: x⁴ − 16 = (x² + 4)(x² − 4) = (x² + 4)(x − 2)(x + 2). The common denominator is x⁴ − 16:', 'x^{4}-16=(x^{2}+4)(x-2)(x+2)'),
      tx('Write each fraction over x⁴ − 16 (multiply the 2nd by x² + 4 and the 3rd by (x² + 4)(x − 2)):', '\\frac{2x^{2}-x(x^{2}+4)+(x^{2}+4)(x-2)}{x^{4}-16}'),
      tx('Expand the numerator:', '2x^{2}-x^{3}-4x+x^{3}-2x^{2}+4x-8=-8'), tx('So the sum is', '\\frac{-8}{x^{4}-16}=-\\frac{8}{x^{4}-16}'),
      'Check at x = 3: 18/65 − 3/5 + 1/5 = −0.1231 and −8/65 = −0.1231 ✓. Note: the book’s answer key prints 8/(x² − 16); that does not agree with the question (at x = 3 it gives −1.143). The printed answer is left as printed.']);
  })();
})(typeof window !== 'undefined' ? window : globalThis);
