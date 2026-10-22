/* Class 12 Mathematics (calculus): hand-written, numerically checked worked solutions for items whose stored solution is a single line.
 * Each derivative / integral / identity is re-checked here (finite differences, Simpson's rule) at sample points when the file loads;
 * a pack whose numbers do not agree is not registered. The answers are the ones already printed in js/math_12_data.js. */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.sol) return;
  const warn = m => { if (root.console) console.warn('sol_m12_calc: ' + m); };
  const tx = (text, m) => ({ text, m });
  const near = (a, b, tol) => Math.abs(a - b) <= (tol === undefined ? 1e-6 : tol);
  const D = (g, x) => (g(x + 1e-6) - g(x - 1e-6)) / 2e-6;
  const simpson = (g, a, b, n) => { n = n || 2000; const h = (b - a) / n; let s = g(a) + g(b); for (let i = 1; i < n; i++) s += g(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; };
  const add = (label, ok, q, steps) => { if (!ok) return warn(label + ' disagrees with its numeric check'); NS.sol.add({ q, steps }); };

  add('asin integral', near(D(x => Math.asin(x / 3), 1), 1 / Math.sqrt(9 - 1)), 'Evaluate ∫dx/√(a²−x²).', [
    'Recall the derivative of the inverse sine: d/dx sin⁻¹(u) = u′/√(1 − u²).',
    tx('Take u = x/a, so u′ = 1/a (a > 0):', '\\frac{d}{dx}\\sin^{-1}\\frac{x}{a}=\\frac{1/a}{\\sqrt{1-x^{2}/a^{2}}}=\\frac{1}{\\sqrt{a^{2}-x^{2}}}'),
    'The derivative is the integrand, so sin⁻¹(x/a) is an antiderivative.',
    tx('Therefore (for a > 0 and |x| < a):', '\\int\\frac{dx}{\\sqrt{a^{2}-x^{2}}}=\\sin^{-1}\\frac{x}{a}+C')]);

  add('ln integral', near(D(x => Math.log(Math.abs(x + Math.sqrt(x * x - 36))), 10), 1 / Math.sqrt(100 - 36)), 'Evaluate ∫dx/√(x²−36).', [
    'Use the standard form ∫dx/√(x² − a²) with a² = 36, so a = 6.',
    tx('Check by differentiating ln|x + √(x² − 36)|; the inner derivative is 1 + x/√(x² − 36):', '\\frac{d}{dx}\\ln\\left|x+\\sqrt{x^{2}-36}\\right|=\\frac{1+\\frac{x}{\\sqrt{x^{2}-36}}}{x+\\sqrt{x^{2}-36}}=\\frac{1}{\\sqrt{x^{2}-36}}'),
    tx('So, for |x| > 6:', '\\int\\frac{dx}{\\sqrt{x^{2}-36}}=\\ln\\left|x+\\sqrt{x^{2}-36}\\right|+C')]);

  add('polynomial integral', near(D(x => x ** 3 / 3 - 4 * x, 2.5), 2.5 * 2.5 - 4), 'Evaluate ∫(x²−4)dx.', [
    'Integrate term by term with the power rule ∫xⁿ dx = xⁿ⁺¹/(n + 1) and ∫k dx = kx.',
    tx('Each term:', '\\int x^{2}\\,dx=\\frac{x^{3}}{3},\\qquad \\int 4\\,dx=4x'),
    tx('Put them together and add one constant:', '\\int(x^{2}-4)\\,dx=\\frac{x^{3}}{3}-4x+C'),
    tx('Check by differentiating the result:', '\\frac{d}{dx}\\left(\\frac{x^{3}}{3}-4x\\right)=x^{2}-4')]);

  add('rational integral', near(D(x => Math.log(Math.abs(x - 8)), 3), 1 / (3 - 8)) && near((3 + 8) / (9 - 64), 1 / (3 - 8)), 'Evaluate ∫(x+8)/(x²−64) dx.', [
    tx('Factor the denominator (difference of squares):', 'x^{2}-64=(x-8)(x+8)'),
    tx('Cancel the common factor x + 8 (for x ≠ −8):', '\\frac{x+8}{x^{2}-64}=\\frac{x+8}{(x-8)(x+8)}=\\frac{1}{x-8}'),
    tx('Integrate the simpler fraction:', '\\int\\frac{x+8}{x^{2}-64}\\,dx=\\int\\frac{dx}{x-8}=\\ln|x-8|+C')]);

  add('exp definite integral', near(simpson(x => Math.exp(2 * x), 0, 1), (Math.exp(2) - 1) / 2, 1e-7), 'Evaluate ∫₀¹e^{2x}dx.', [
    tx('An antiderivative of e²ˣ is e²ˣ/2 (the chain rule gives back e²ˣ):', '\\int e^{2x}\\,dx=\\frac{e^{2x}}{2}'),
    tx('Apply the fundamental theorem, antiderivative at 1 minus at 0:', '\\int_{0}^{1}e^{2x}\\,dx=\\left[\\frac{e^{2x}}{2}\\right]_{0}^{1}=\\frac{e^{2}}{2}-\\frac{e^{0}}{2}=\\frac{e^{2}-1}{2}')]);

  add('coth', near(1 / Math.tanh(0.7), (Math.exp(0.7) + Math.exp(-0.7)) / (Math.exp(0.7) - Math.exp(-0.7))), 'Write coth x in exponential form.', [
    tx('By definition coth x = cosh x / sinh x, with:', '\\cosh x=\\frac{e^{x}+e^{-x}}{2},\\qquad \\sinh x=\\frac{e^{x}-e^{-x}}{2}'),
    tx('Divide; the common factor 1/2 cancels (x ≠ 0):', '\\coth x=\\frac{\\cosh x}{\\sinh x}=\\frac{(e^{x}+e^{-x})/2}{(e^{x}-e^{-x})/2}=\\frac{e^{x}+e^{-x}}{e^{x}-e^{-x}}')]);

  (function () {
    const C = 1.7, y = x => C * Math.exp(Math.exp(-x)), x0 = 0.4;
    add('separable e^x', near(Math.exp(x0) * D(y, x0) + y(x0), 0, 1e-5), 'Find the general solution of e^x(dy/dx)+y=0.', [
      tx('Move y to the right-hand side and divide by eˣ·y (y ≠ 0):', 'e^{x}\\frac{dy}{dx}=-y\\ \\Rightarrow\\ \\frac{1}{y}\\frac{dy}{dx}=-e^{-x}'),
      tx('Integrate both sides with respect to x (∫−e⁻ˣ dx = e⁻ˣ):', '\\int\\frac{dy}{y}=\\int-e^{-x}\\,dx\\ \\Rightarrow\\ \\ln|y|=e^{-x}+C_{1}'),
      tx('Exponentiate; the constant e^{C₁} becomes C:', 'y=Ce^{e^{-x}}')]);
  })();

  (function () {
    const C = 0.3, y = x => Math.sin(Math.asin(x) + C), x0 = 0.35;
    add('separable arcsin', near(Math.sqrt(1 - x0 * x0) * D(y, x0), Math.sqrt(1 - y(x0) ** 2), 1e-5), 'Solve √(1−x²)dy=√(1−y²)dx.', [
      tx('Separate the variables: divide by √(1 − x²)·√(1 − y²):', '\\frac{dy}{\\sqrt{1-y^{2}}}=\\frac{dx}{\\sqrt{1-x^{2}}}'),
      tx('Integrate both sides (each is a standard inverse sine):', '\\int\\frac{dy}{\\sqrt{1-y^{2}}}=\\int\\frac{dx}{\\sqrt{1-x^{2}}}\\ \\Rightarrow\\ \\sin^{-1}y=\\sin^{-1}x+C')]);
  })();

  (function () {
    const a = 2, b = 3, v = 1.2, u = a * Math.sqrt(1 - v * v / (b * b));
    const U = vv => a * Math.sqrt(1 - vv * vv / (b * b));
    add('ellipse implicit', near(D(U, v), -a * a * v / (b * b * u), 1e-5), 'Let \\(\\frac{u^2}{a^2}+\\frac{v^2}{b^2}=1\\), where a and b are nonzero constants.', [
      'a and b are fixed nonzero constants; the curve is an ellipse in the (v, u) coordinates.',
      tx('(a) Treat u as a function of v and differentiate both sides with respect to v:', '\\frac{2u}{a^{2}}\\frac{du}{dv}+\\frac{2v}{b^{2}}=0'),
      tx('Solve for du/dv (where u ≠ 0):', '\\frac{du}{dv}=-\\frac{2v/b^{2}}{2u/a^{2}}=-\\frac{a^{2}v}{b^{2}u}'),
      tx('(b) Now treat v as a function of u; the same steps with the roles swapped give:', '\\frac{2u}{a^{2}}+\\frac{2v}{b^{2}}\\frac{dv}{du}=0\\ \\Rightarrow\\ \\frac{dv}{du}=-\\frac{b^{2}u}{a^{2}v}\\quad(v\\neq0)')]);
  })();

  (function () {
    const f = x => x ** 3 - 3 * x * x - 9 * x + 1, fp = x => 3 * x * x - 6 * x - 9;
    const ok = [-3, -0.5, 0, 2, 4].every(x => near(fp(x), 3 * (x + 1) * (x - 3), 1e-9) && near(D(f, x), fp(x), 1e-4)) && fp(-2) > 0 && fp(0) < 0 && fp(5) > 0;
    add('cubic sign chart', ok, 'Draw f(x) = x³ − 3x² − 9x + 1 and f′(x) = 3x² − 6x − 9.', [
      tx('Differentiate term by term (power rule):', 'f\'(x)=3x^{2}-6x-9'),
      tx('Factor to find where f′ is zero:', '3x^{2}-6x-9=3(x^{2}-2x-3)=3(x+1)(x-3)'),
      'The zeros are x = −1 and x = 3; they split the number line into three intervals.',
      'For x < −1 or x > 3 both factors have the same sign, so f′(x) > 0: the graph of f′ lies above the x-axis and f is increasing.',
      'For −1 < x < 3 the factors have opposite signs, so f′(x) < 0: the graph of f′ lies below the x-axis and f is decreasing.',
      tx('Turning points of f (where f′ changes sign):', 'f(-1)=-1-3+9+1=6\\ (\\text{maximum}),\\qquad f(3)=27-27-27+1=-26\\ (\\text{minimum})')]);
  })();

  /* ---------- integration by parts (Ex 6.2 Q3) ---------- */
  (function () {
    const chk = [[x => Math.exp(2 * x) * (x * x / 2 - x / 2 + 1 / 4), x => x * x * Math.exp(2 * x)], [x => x * Math.sin(x) + Math.cos(x), x => x * Math.cos(x)],
      [x => Math.exp(2 * x) * (2 * Math.sin(x) - Math.cos(x)) / 5, x => Math.exp(2 * x) * Math.sin(x)], [x => Math.exp(x) * (Math.sin(x) + Math.cos(x)) / 2, x => Math.exp(x) * Math.cos(x)],
      [x => x * Math.asin(x) + Math.sqrt(1 - x * x), x => Math.asin(x)], [t => -Math.cos(Math.exp(3 * t)) / 3, t => Math.exp(3 * t) * Math.sin(Math.exp(3 * t))]];
    const ok = chk.every(([F, f], k) => [0.2, 0.5].every(x => near(D(F, x), f(x), 1e-4)));
    add('integration by parts', ok, 'Evaluate using integration by parts: (a)', [
      'Integration by parts: ∫u dv = uv − ∫v du. Choose u so that du is simpler, and dv so that v is easy to find.',
      tx('(a) u = x², dv = e²ˣdx, so du = 2x dx and v = e²ˣ/2:', '\\int x^{2}e^{2x}\\,dx=\\frac{x^{2}e^{2x}}{2}-\\int xe^{2x}\\,dx'),
      tx('Parts again on ∫xe²ˣdx (u = x, v = e²ˣ/2):', '\\int xe^{2x}\\,dx=\\frac{xe^{2x}}{2}-\\frac{e^{2x}}{4}'),
      tx('Put the two results together:', '\\int x^{2}e^{2x}\\,dx=e^{2x}\\left(\\frac{x^{2}}{2}-\\frac{x}{2}+\\frac14\\right)+C'),
      tx('(b) u = x, dv = cos x dx, so du = dx and v = sin x:', '\\int x\\cos x\\,dx=x\\sin x-\\int\\sin x\\,dx=x\\sin x+\\cos x+C'),
      tx('(c) Let I = ∫e²ˣsin x dx and J = ∫e²ˣcos x dx. Parts on each gives two equations:', 'I=-e^{2x}\\cos x+2J,\\qquad J=e^{2x}\\sin x-2I'),
      tx('Substitute J into the first equation and collect I:', 'I=-e^{2x}\\cos x+2e^{2x}\\sin x-4I\\ \\Rightarrow\\ 5I=e^{2x}(2\\sin x-\\cos x)'),
      tx('So:', '\\int e^{2x}\\sin x\\,dx=\\frac{e^{2x}(2\\sin x-\\cos x)}{5}+C'),
      tx('(d) The same two-step trick with exponent 1:', '\\int e^{x}\\cos x\\,dx=\\frac{e^{x}(\\sin x+\\cos x)}{2}+C'),
      tx('(e) u = sin⁻¹x, dv = dx, so du = dx/√(1 − x²) and v = x; then ∫x/√(1 − x²)dx = −√(1 − x²):', '\\int\\sin^{-1}x\\,dx=x\\sin^{-1}x-\\int\\frac{x}{\\sqrt{1-x^{2}}}\\,dx=x\\sin^{-1}x+\\sqrt{1-x^{2}}+C'),
      tx('(f) Substitution is more direct: w = e³ᵗ, dw = 3e³ᵗdt:', '\\int e^{3t}\\sin(e^{3t})\\,dt=\\frac13\\int\\sin w\\,dw=-\\frac{\\cos(e^{3t})}{3}+C'),
      tx('Check (f) by differentiating:', '\\frac{d}{dt}\\left(-\\frac{\\cos(e^{3t})}{3}\\right)=-\\frac13\\left(-\\sin(e^{3t})\\right)3e^{3t}=e^{3t}\\sin(e^{3t})')]);
  })();

  /* ---------- partial derivatives (Ex 11.1, Ex 11 review, worked example 11.2) ---------- */
  (function () {
    const fx = (f, x, y) => (f(x + 1e-6, y) - f(x - 1e-6, y)) / 2e-6, fy = (f, x, y) => (f(x, y + 1e-6) - f(x, y - 1e-6)) / 2e-6;
    const P = [[0.9, 1.3], [1.7, 0.6]];
    const chk = (f, gx, gy) => P.every(([x, y]) => near(fx(f, x, y), gx(x, y), 1e-4) && near(fy(f, x, y), gy(x, y), 1e-4));
    add('we-11-2', chk((x, y) => x ** 3 * y + x * y * y, (x, y) => 3 * x * x * y + y * y, (x, y) => x ** 3 + 2 * x * y), 'Find fₓ and fᵧ for f(x,y)=x³y+xy².', [
      tx('For fₓ keep y constant and differentiate each term with respect to x:', 'f_{x}=\\frac{\\partial}{\\partial x}(x^{3}y)+\\frac{\\partial}{\\partial x}(xy^{2})=3x^{2}y+y^{2}'),
      tx('For fᵧ keep x constant and differentiate each term with respect to y:', 'f_{y}=\\frac{\\partial}{\\partial y}(x^{3}y)+\\frac{\\partial}{\\partial y}(xy^{2})=x^{3}+2xy')]);
    add('us production', chk((x, y) => x ** 0.7 * y ** 0.3, (x, y) => 0.7 * x ** -0.3 * y ** 0.3, (x, y) => 0.3 * x ** 0.7 * y ** -0.7), 'The United States production function was estimated as z=x^0.7 y^0.3', [
      'Work on the positive-input domain x > 0, y > 0.',
      tx('Hold y constant and use the power rule in x (marginal productivity of labour):', 'z_{x}=\\frac{\\partial}{\\partial x}\\left(x^{0.7}y^{0.3}\\right)=0.7x^{-0.3}y^{0.3}'),
      tx('Hold x constant and use the power rule in y (marginal productivity of capital):', 'z_{y}=0.3x^{0.7}y^{-0.7}'),
      tx('Check: the exponents add to 1, so Euler’s relation gives back z:', 'xz_{x}+yz_{y}=(0.7+0.3)x^{0.7}y^{0.3}=z')]);
    add('canada production', chk((x, y) => x ** 0.4 * y ** 0.6, (x, y) => 0.4 * x ** -0.6 * y ** 0.6, (x, y) => 0.6 * x ** 0.4 * y ** -0.4), 'The Canadian production function is z=x^0.4 y^0.6', [
      'Work on the positive-input domain x > 0, y > 0.',
      tx('Treat y⁰·⁶ as a constant factor:', 'z_{x}=0.4x^{-0.6}y^{0.6}'),
      tx('Treat x⁰·⁴ as a constant factor:', 'z_{y}=0.6x^{0.4}y^{-0.4}'),
      tx('Check: the exponents add to 1, so', 'xz_{x}+yz_{y}=(0.4+0.6)x^{0.4}y^{0.6}=z')]);
    add('review q3', chk((x, y) => x * x + y * y, (x, y) => 2 * x, (x, y) => 2 * y), 'If f(x,y)=x²+y², find ∂f/∂x.', [
      'Treat y as a constant, so y² is a constant and its derivative is 0.',
      tx('Differentiate the x² term only:', '\\frac{\\partial f}{\\partial x}=\\frac{\\partial}{\\partial x}(x^{2})+\\frac{\\partial}{\\partial x}(y^{2})=2x+0=2x')]);
    add('review q4', near((1 / (1.3 + 0.6 + 1e-6) - 1 / (1.3 + 0.6 - 1e-6)) / 2e-6, -1 / (1.9 ** 2), 1e-4), 'Find ∂/∂x [1/(x+y)].', [
      tx('Write the fraction as a power:', '\\frac{1}{x+y}=(x+y)^{-1}'),
      tx('Chain rule with y constant (the inner derivative of x + y in x is 1):', '\\frac{\\partial}{\\partial x}(x+y)^{-1}=-(x+y)^{-2}\\cdot1=-\\frac{1}{(x+y)^{2}}')]);
    add('review q8', chk((x, y) => Math.cos(y) * Math.exp(x), (x, y) => Math.cos(y) * Math.exp(x), (x, y) => -Math.exp(x) * Math.sin(y)), 'If f(x,y)=cos y·e^x, find f_y.', [
      'Treat eˣ as a constant factor; only cos y depends on y.',
      tx('Differentiate cos y with respect to y:', 'f_{y}=e^{x}\\frac{\\partial}{\\partial y}(\\cos y)=-e^{x}\\sin y')]);
    add('review q9', chk((x, y) => 3 * x * y * y + x * x * y * y, (x, y) => 3 * y * y + 2 * x * y * y, (x, y) => 6 * x * y + 2 * x * x * y), 'If f(x,y)=3xy²+x²y², find f_x.', [
      'Treat y as a constant and differentiate each term with respect to x.',
      tx('Power rule on x in each term (3y² and y² are constant coefficients):', 'f_{x}=3y^{2}\\cdot1+y^{2}\\cdot2x=3y^{2}+2xy^{2}')]);
  })();
  /* ---------- coordinate geometry one-liners (Ex 7.1 Q1, Ex 7.2 Q1, Q9) ---------- */
  (function () {
    const d = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
    const A = [-1, 3], B = [2, 1], C = [5, -1];
    add('collinear distances', near(d(A, B), Math.sqrt(13)) && near(d(B, C), Math.sqrt(13)) && near(d(A, C), 2 * Math.sqrt(13)), 'For A(−1,3), B(2,1), and C(5,−1), show that |AB|+|BC|=|AC|.', [
      'Use the distance formula |PQ| = √((x₂ − x₁)² + (y₂ − y₁)²) for each side.',
      tx('Side AB:', '|AB|=\\sqrt{(2+1)^{2}+(1-3)^{2}}=\\sqrt{9+4}=\\sqrt{13}'),
      tx('Side BC:', '|BC|=\\sqrt{(5-2)^{2}+(-1-1)^{2}}=\\sqrt{9+4}=\\sqrt{13}'),
      tx('Side AC:', '|AC|=\\sqrt{(5+1)^{2}+(-1-3)^{2}}=\\sqrt{36+16}=\\sqrt{52}=2\\sqrt{13}'),
      tx('Add the two short sides; the sum equals the long side, so A, B, C lie on one line with B between A and C:', '|AB|+|BC|=\\sqrt{13}+\\sqrt{13}=2\\sqrt{13}=|AC|')]);
    add('distance PQ', near(d([3, -2], [-1, -5]), 5), 'Find the distance between P(3,−2) and Q(−1,−5).', [
      'Use the distance formula with P = (3, −2) and Q = (−1, −5).',
      tx('Substitute and simplify:', 'd=\\sqrt{(-1-3)^{2}+(-5+2)^{2}}=\\sqrt{16+9}=\\sqrt{25}=5')]);
    const area = near(0.5 * Math.abs(0 * (0 - 3) + 4 * (3 - 0) + 1 * (0 - 0)), 6);
    add('triangle area', area, 'Find the area of the triangle with vertices (0,0), (4,0), and (1,3).', [
      'Two vertices (0,0) and (4,0) lie on the x-axis, so the base is the segment between them and the height is the y-coordinate of the third vertex (1,3).',
      tx('Base and height:', 'b=4-0=4,\\qquad h=3'),
      tx('Area of a triangle:', 'A=\\frac12bh=\\frac12(4)(3)=6\\text{ square units}')]);
  })();

  /* ---------- Maclaurin series of e^x and partial derivatives from the definition ---------- */
  (function () {
    const N = 12, ser = x => { let s = 0, t = 1; for (let k = 0; k < N; k++) { s += t; t *= x / (k + 1); } return s; };
    add('maclaurin e^x', near(ser(0.8), Math.exp(0.8), 1e-8) && near(ser(-1.1), Math.exp(-1.1), 1e-6), 'Use Maclaurin’s series for f(x) = eˣ about 0.', [
      tx('The Maclaurin series is f(x) = Σ f⁽ⁿ⁾(0) xⁿ / n!. Every derivative of eˣ is eˣ, so at x = 0:', 'f^{(n)}(x)=e^{x}\\ \\Rightarrow\\ f^{(n)}(0)=e^{0}=1'),
      tx('Put the coefficients 1/n! in front of xⁿ:', 'e^{x}=1+x+\\frac{x^{2}}{2!}+\\frac{x^{3}}{3!}+\\cdots+\\frac{x^{n}}{n!}+\\cdots'),
      tx('The ratio of consecutive terms is |x|/(n + 1), which tends to 0 for every x, so the series converges for all real x:', '\\left|\\frac{x^{n+1}/(n+1)!}{x^{n}/n!}\\right|=\\frac{|x|}{n+1}\\to0')]);
    const f = (x, y) => x * x * y + x * y * y, h = 1e-6, x0 = 1.3, y0 = 0.7;
    add('partials by definition', near((f(x0 + h, y0) - f(x0, y0)) / h, 2 * x0 * y0 + y0 * y0, 1e-4) && near((f(x0, y0 + h) - f(x0, y0)) / h, x0 * x0 + 2 * x0 * y0, 1e-4), 'For f(x,y)=x²y+xy², find fₓ,fᵧ using the definition of partial derivatives.', [
      tx('For fₓ keep y fixed; form the difference quotient with h ≠ 0:', 'f_{x}=\\lim_{h\\to0}\\frac{f(x+h,y)-f(x,y)}{h}'),
      tx('Expand the numerator and divide by h:', '\\frac{[(x+h)^{2}-x^{2}]y+hy^{2}}{h}=\\frac{(2xh+h^{2})y+hy^{2}}{h}=2xy+hy+y^{2}'),
      tx('Let h → 0:', 'f_{x}=2xy+y^{2}'),
      tx('For fᵧ keep x fixed and use the increment k in y:', '\\frac{x^{2}k+x[(y+k)^{2}-y^{2}]}{k}=x^{2}+2xy+xk\\ \\to\\ f_{y}=x^{2}+2xy')]);
  })();
  /* ---------- differential equations: order and degree (Ex 10 review Q1, Q2) ---------- */
  add('order', true, 'Find the order of 3(dy/dx)+2y=5.', [
    'The order of a differential equation is the order of the highest derivative in it.',
    tx('The only derivative present is the first one:', '3\\frac{dy}{dx}+2y=5\\ \\Rightarrow\\ \\text{highest derivative: }\\frac{dy}{dx}'),
    tx('So:', '\\text{order}=1')]);
  add('degree', true, 'Find the degree of (d²y/dx²)²−dy/dx+y=0.', [
    'The degree is the power of the highest-order derivative once the equation is a polynomial in its derivatives.',
    tx('The highest-order derivative is y″ = d²y/dx², and it appears squared:', '\\left(\\frac{d^{2}y}{dx^{2}}\\right)^{2}-\\frac{dy}{dx}+y=0'),
    tx('So (the order is 2 and the degree is the exponent 2):', '\\text{degree}=2')]);

  /* ---------- Euler's theorem (Ex 11.2 Q2) and partial-derivative MCQs ---------- */
  (function () {
    const f1 = (x, y) => 2 * x * x + 3 * x * y + 5 * y * y, f2 = (x, y) => 1 / (x * x + x * y + y * y);
    const d = (f, x, y) => [(f(x + 1e-6, y) - f(x - 1e-6, y)) / 2e-6, (f(x, y + 1e-6) - f(x, y - 1e-6)) / 2e-6];
    const eul = (f, n) => [[1.1, 0.7], [2.3, -0.4]].every(([x, y]) => { const g = d(f, x, y); return near(x * g[0] + y * g[1], n * f(x, y), 1e-4); });
    add('euler', eul(f1, 2) && eul(f2, -2), 'Verify Euler’s theorem: (a) z=ax²+2hxy+by²; (b) z=(x²+xy+y²)^(−1).', [
      'Euler’s theorem: if z is homogeneous of degree n, then x·zₓ + y·zᵧ = n·z.',
      tx('(a) Hold a, h, b constant and differentiate:', 'z_{x}=2ax+2hy,\\qquad z_{y}=2hx+2by'),
      tx('Multiply by x and y and add:', 'xz_{x}+yz_{y}=2ax^{2}+2hxy+2hxy+2by^{2}=2(ax^{2}+2hxy+by^{2})=2z'),
      'So z is homogeneous of degree 2 and the theorem holds.',
      tx('(b) Put Q = x² + xy + y² (positive away from the origin), so z = Q⁻¹ and Q is homogeneous of degree 2:', 'z_{x}=-\\frac{2x+y}{Q^{2}},\\qquad z_{y}=-\\frac{x+2y}{Q^{2}}'),
      tx('Multiply by x and y and add:', 'xz_{x}+yz_{y}=-\\frac{2x^{2}+xy+xy+2y^{2}}{Q^{2}}=-\\frac{2Q}{Q^{2}}=-2z'),
      'So z has degree −2 and the theorem holds on the plane without the origin.']);
  })();
  (function () {
    const P = [[0.9, 1.3], [1.7, 0.6]];
    const fx = (f, x, y) => (f(x + 1e-6, y) - f(x - 1e-6, y)) / 2e-6, fy = (f, x, y) => (f(x, y + 1e-6) - f(x, y - 1e-6)) / 2e-6;
    add('review-11-iii', P.every(([x, y]) => near(fx((a, b) => a * a + b * b, x, y), 2 * x, 1e-4)), 'If f(x,y)=x²+y², then fₓ is: (a) 2y;', [
      'For fₓ treat y as a constant.',
      tx('Differentiate each term with respect to x:', 'f_{x}=\\frac{\\partial}{\\partial x}(x^{2})+\\frac{\\partial}{\\partial x}(y^{2})=2x+0=2x'),
      'Option (b) is correct.']);
    add('review-11-viii', P.every(([x, y]) => near(fx((a, b) => Math.cos(b) * Math.exp(3 * a), x, y), 3 * Math.cos(y) * Math.exp(3 * x), 1e-4)), 'If f(x,y)=cos y·e^(3x), then fₓ is:', [
      'For fₓ the factor cos y is a constant.',
      tx('Differentiate e^(3x) with the chain rule (inner derivative 3):', 'f_{x}=\\cos y\\cdot\\frac{\\partial}{\\partial x}e^{3x}=\\cos y\\cdot3e^{3x}=3\\cos y\\,e^{3x}'),
      'Options (b) and (c) are the same expression in a different order, so the printed question has two correct choices.']);
    add('review-11-ix', P.every(([x, y]) => near(fy((a, b) => 3 * a * Math.exp(b) + a ** 3 * b * b, x, y), 3 * x * Math.exp(y) + 2 * x ** 3 * y, 1e-4)), 'If f(x,y)=3xe^y+x³y², then fᵧ is:', [
      'For fᵧ treat x as a constant.',
      tx('Differentiate each term with respect to y:', 'f_{y}=3x\\frac{\\partial}{\\partial y}e^{y}+x^{3}\\frac{\\partial}{\\partial y}y^{2}=3xe^{y}+2x^{3}y'),
      'Option (a) is correct.']);
  })();

  /* ---------- vector function MCQs (Ex 5 review) ---------- */
  (function () {
    const D1 = (g, t) => (g(t + 1e-6) - g(t - 1e-6)) / 2e-6;
    add('vec vi', near(D1(t => t ** 3, -2), 12, 1e-4) && near(D1(t => -(3 + t * t), -2), 4, 1e-4), 'If \\(F⃗=t^3î-(3+t^2)k̂\\), then F⃗′(−2) is:', [
      'Differentiate each component with respect to t; the unit vectors are constants.',
      tx('Component derivatives:', '\\frac{d}{dt}t^{3}=3t^{2},\\qquad \\frac{d}{dt}\\left[-(3+t^{2})\\right]=-2t'),
      tx('Substitute t = −2:', '3(-2)^{2}=12,\\qquad -2(-2)=4'),
      tx('So:', '\\vec F\'(-2)=12\\hat\\imath+4\\hat k'),
      'Option (c) is correct.']);
    add('vec viii', near(D1(t => 5 * t * t, 1.3), 13, 1e-4) && near(D1(t => 3 * t, 1.3), 3, 1e-6), 'If r⃗ = 5t²î+3tĵ+k̂, then the velocity vector is:', [
      'Velocity is the derivative of the position vector.',
      tx('Differentiate each component:', '\\frac{d}{dt}(5t^{2})=10t,\\qquad \\frac{d}{dt}(3t)=3,\\qquad \\frac{d}{dt}(1)=0'),
      tx('So:', '\\vec v=10t\\hat\\imath+3\\hat\\jmath'),
      'Option (a) is correct.']);
    add('vec ix', near(D1(Math.sin, 0.8), Math.cos(0.8), 1e-6) && near(D1(t => -2 * Math.cos(t), 0.8), 2 * Math.sin(0.8), 1e-6), 'If velocity v⃗ = sin(t)î−2cos(t)ĵ+4k̂, then acceleration a⃗ =', [
      'Acceleration is the derivative of velocity.',
      tx('Differentiate each component:', '\\frac{d}{dt}\\sin t=\\cos t,\\qquad \\frac{d}{dt}(-2\\cos t)=2\\sin t,\\qquad \\frac{d}{dt}(4)=0'),
      tx('So:', '\\vec a=\\cos t\\,\\hat\\imath+2\\sin t\\,\\hat\\jmath'),
      'No printed option has both signs right (option (d) has −2 sin t), so the question as printed has no correct choice.']);
  })();

  /* ---------- triangles from coordinates: area, angles, inscribed angle ---------- */
  (function () {
    const area = (A, B, C) => 0.5 * Math.abs(A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1]));
    add('areas (7.4 q5)', near(area([-3, 6], [3, 2], [6, 0]), 0) && near(area([-2, 4], [3, -6], [1, -2]), 0), 'Find the areas bounded by the vertices: (a) A(−3,6), B(3,2), C(6,0);', [
      tx('Area from the vertices:', '\\text{Area}=\\frac12\\left|x_{1}(y_{2}-y_{3})+x_{2}(y_{3}-y_{1})+x_{3}(y_{1}-y_{2})\\right|'),
      tx('(a) A(−3,6), B(3,2), C(6,0):', '\\frac12\\left|-3(2-0)+3(0-6)+6(6-2)\\right|=\\frac12\\left|-6-18+24\\right|=0'),
      tx('(b) A(−2,4), B(3,−6), C(1,−2):', '\\frac12\\left|-2(-6+2)+3(-2-4)+1(4+6)\\right|=\\frac12\\left|8-18+10\\right|=0'),
      'The area is 0 in both cases, so each set of three points lies on one straight line (collinear).']);
    const ang = (P, Q, R) => { const u = [P[0] - Q[0], P[1] - Q[1]], v = [R[0] - Q[0], R[1] - Q[1]]; return { dot: u[0] * v[0] + u[1] * v[1], cr: Math.abs(u[0] * v[1] - u[1] * v[0]), deg: Math.atan2(Math.abs(u[0] * v[1] - u[1] * v[0]), u[0] * v[0] + u[1] * v[1]) * 180 / Math.PI }; };
    const row = (nm, P, Q, R, u, v) => { const a = ang(P, Q, R); return tx('At ' + nm + ' the rays are ' + u + ' and ' + v + ': dot product ' + a.dot + ', cross magnitude ' + a.cr + '.', nm + '=\\operatorname{atan2}(' + a.cr + ',' + a.dot + ')\\approx ' + a.deg.toFixed(6) + '^{\\circ}'); };
    const A = [-2, -3], B = [4, -1], C = [2, 3];
    const a1 = ang(B, A, C), b1 = ang(A, B, C), c1 = ang(A, C, B);
    add('angles WE 7.24', near(a1.deg, 37.874984, 1e-5) && near(b1.deg, 81.869898, 1e-5) && near(c1.deg, 60.255119, 1e-5) && near(a1.deg + b1.deg + c1.deg, 180, 1e-9), 'Find the interior angles of A(−2,−3), B(4,−1), C(2,3).', [
      'At each vertex take the two rays to the other vertices; the interior angle is atan2(|cross|, dot), which avoids sign and supplement mistakes.',
      row('A', B, A, C, 'AB=(6,2)', 'AC=(4,6)'), row('B', A, B, C, 'BA=(−6,−2)', 'BC=(−2,4)'), row('C', A, C, B, 'CA=(−4,−6)', 'CB=(2,−4)'),
      tx('Check: the three angles add up to a straight angle:', '37.874984^{\\circ}+81.869898^{\\circ}+60.255119^{\\circ}=180^{\\circ}')]);
    const T = [[[1, 2], [4, 2], [-2, 3], [161.565051, 9.462322, 8.972627]], [[3, -4], [1, 5], [2, -4], [77.471192, 6.188616, 96.340192]]];
    const okT = T.every(([P, Q, R, st]) => { const g = [ang(Q, P, R), ang(P, Q, R), ang(P, R, Q)]; return g.every((x, i) => near(x.deg, st[i], 1e-5)) && near(g[0].deg + g[1].deg + g[2].deg, 180, 1e-9); });
    const R7 = (nm, P, Q, R, u, v) => row(nm, P, Q, R, u, v);
    add('angles 7.3 q7', okT, 'In each case, find the angles of the triangle ABC whose vertices are the following: (a) A(1,2), B(4,2) and C(−2,3);', [
      'The interior angle at a vertex is atan2(|cross|, dot) of the two rays leaving it; a negative dot product gives an obtuse angle.',
      tx('(a) A(1,2), B(4,2), C(−2,3).', '\\text{(a)}'), R7('A', [4, 2], [1, 2], [-2, 3], 'AB=(3,0)', 'AC=(−3,1)'), R7('B', [1, 2], [4, 2], [-2, 3], 'BA=(−3,0)', 'BC=(−6,1)'), R7('C', [1, 2], [-2, 3], [4, 2], 'CA=(3,−1)', 'CB=(6,−1)'),
      tx('Sum check for (a):', '161.565051^{\\circ}+9.462322^{\\circ}+8.972627^{\\circ}=180^{\\circ}'),
      tx('(b) A(3,−4), B(1,5), C(2,−4).', '\\text{(b)}'), R7('A', [1, 5], [3, -4], [2, -4], 'AB=(−2,9)', 'AC=(−1,0)'), R7('B', [3, -4], [1, 5], [2, -4], 'BA=(2,−9)', 'BC=(1,−9)'), R7('C', [3, -4], [2, -4], [1, 5], 'CA=(1,0)', 'CB=(−1,9)'),
      tx('Sum check for (b):', '77.471192^{\\circ}+6.188616^{\\circ}+96.340192^{\\circ}=180^{\\circ}')]);
    const insc = (r, A, S) => { const O = [0, 0]; return [ang(A.A, S, A.B).deg, ang(A.A, O, A.B).deg]; };
    const s5 = Math.sqrt(5), s3 = Math.sqrt(3);
    const ia = insc(3, { A: [2, s5], B: [2, -s5] }, [-3, 0]), ib = insc(2, { A: [1, s3], B: [1, -s3] }, [-2, 0]);
    add('inscribed angle', near(ia[1], 2 * ia[0], 1e-9) && near(ia[0], 48.189685, 1e-5) && near(ib[0], 60, 1e-9) && near(ib[1], 120, 1e-9), 'Show the central angle subtended by minor arc AB is twice the inscribed angle on the major arc:', [
      'Pick a point S on the major arc. The inscribed angle is ∠ASB and the central angle is ∠AOB (O is the centre). Use rays and atan2(|cross|, dot).',
      tx('(a) S(−3,0): rays SA=(5,√5), SB=(5,−√5); dot 20, cross 10√5:', '\\angle ASB=\\operatorname{atan2}(10\\sqrt5,20)=\\tan^{-1}\\frac{\\sqrt5}{2}\\approx48.189685^{\\circ}'),
      tx('Centre O(0,0): rays OA=(2,√5), OB=(2,−√5); dot −1, cross 4√5:', '\\angle AOB=\\operatorname{atan2}(4\\sqrt5,-1)\\approx96.379370^{\\circ}=2(48.189685^{\\circ})'),
      tx('(b) S(−2,0): rays SA=(3,√3), SB=(3,−√3); dot 6, cross 6√3:', '\\angle ASB=\\operatorname{atan2}(6\\sqrt3,6)=60^{\\circ}'),
      tx('Centre: OA=(1,√3), OB=(1,−√3); dot −2, cross 2√3:', '\\angle AOB=\\operatorname{atan2}(2\\sqrt3,-2)=120^{\\circ}=2(60^{\\circ})')]);
    add('incenter JO', near(Math.sqrt(13 * 13 - 12 * 12), 5), 'Find JO in the source triangle LMN, with incenter O, LO = 13 and LH = 12.', [
      'O is the incenter (meeting point of the angle bisectors), so its perpendicular distances to the three sides are equal: OH = OI = OJ.',
      tx('Triangle LHO has a right angle at H (hypotenuse LO = 13, leg LH = 12):', 'LO^{2}=LH^{2}+HO^{2}'),
      tx('Solve for HO:', 'HO^{2}=13^{2}-12^{2}=169-144=25\\ \\Rightarrow\\ HO=5'),
      tx('Since JO = HO:', 'JO=5\\text{ units}')]);
  })();

  /* ---------- bisection iterates (Ex 12.1 Q2) ---------- */
  (function () {
    const parts = [
      { nm: 'a', f: x => Math.exp(x) - 2 - x, t: 'e^{x}-2-x', a: 1, b: 1.8, res: [0.65519997, 0.12011692, -0.09583398, 0.00819291], fin: [1.1, 1.15] },
      { nm: 'b', f: x => Math.cos(x) + 1 - x, t: '\\cos x+1-x', a: 0.8, b: 1.6, res: [0.16235775, -0.23003286, -0.03250117, 0.06532236], fin: [1.25, 1.3] },
      { nm: 'c', f: x => Math.log(x) - 5 + x, t: '\\ln x-5+x', a: 3.2, b: 4, res: [-0.11906615, 0.13500107, 0.00833282, -0.05527283], fin: [3.65, 3.7] },
      { nm: 'd', f: x => x * x - 10 * x + 23, t: 'x^{2}-10x+23', a: 3.2, b: 4, res: [-0.04, 0.56, 0.25, 0.1025], fin: [3.55, 3.6] }];
    let ok = true; const steps = ['Bisection: c = (a + b)/2, evaluate f(c), and keep the half-interval where f changes sign. Intermediate values are not rounded.'];
    parts.forEach(p => {
      let a = p.a, b = p.b; steps.push(tx('(' + p.nm + ') f(x) = ' + p.t + ' on [' + a + ', ' + b + ']', 'f(x)=' + p.t));
      for (let k = 0; k < 4; k++) {
        const c = (a + b) / 2, fc = p.f(c);
        if (!near(fc, p.res[k], 1e-7)) ok = false;
        const fmt = v => String(+v.toFixed(6));
        steps.push(tx('Iterate ' + (k + 1) + ': midpoint and residual.', 'c_{' + (k + 1) + '}=\\frac{' + fmt(a) + '+' + fmt(b) + '}{2}=' + fmt(c) + ',\\quad f(c_{' + (k + 1) + '})\\approx ' + (fc >= 0 ? '+' : '') + fc.toFixed(8)));
        if (p.f(a) * fc < 0) b = c; else a = c;
      }
      if (!near(a, p.fin[0], 1e-9) || !near(b, p.fin[1], 1e-9)) ok = false;
      steps.push(tx('After four updates the bracket is [' + +a.toFixed(6) + ', ' + +b.toFixed(6) + '] (width 0.05).', '[a,b]=[' + +a.toFixed(6) + ',\\,' + +b.toFixed(6) + ']'));
    });
    add('bisection', ok, 'Compute four bisection iterates: (a) e^x−2−x on [1,1.8];', steps);
  })();

  /* ---------- vector operations (Ex 5.1 Q2) ---------- */
  (function () {
    const t0 = 1.7, F = t => [2 * t, -5, t * t], G = t => [1 - t, 0, 1 / t], H = t => [Math.sin(t), Math.exp(t), 0];
    const sub = (u, v, a, b) => u.map((x, i) => a * x - b * v[i]), cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
    const A = sub(F(t0), G(t0), 2, 3), B = F(t0).map((x, i) => 3 * x + 4 * G(t0)[i]), Cr = cross(F(t0), H(t0));
    const ok = near(A[0], 7 * t0 - 3) && near(A[2], 2 * t0 * t0 - 3 / t0) && near(B[0], 2 * t0 + 4) && near(B[2], 3 * t0 * t0 + 4 / t0) && near(dot(G(t0), H(t0)), (1 - t0) * Math.sin(t0)) &&
      near(Cr[0], -t0 * t0 * Math.exp(t0)) && near(Cr[1], t0 * t0 * Math.sin(t0)) && near(Cr[2], 2 * t0 * Math.exp(t0) + 5 * Math.sin(t0));
    add('vector operations', ok, 'Perform the operations with \\(F⃗(t)=2tî-5ĵ+t^2k̂\\)', [
      tx('Components: F = (2t, −5, t²), G = (1−t, 0, 1/t), H = (sin t, eᵗ, 0).', '\\vec F=(2t,-5,t^{2}),\\ \\vec G=(1-t,0,\\tfrac1t),\\ \\vec H=(\\sin t,e^{t},0)'),
      tx('(a) Scale first, then subtract component by component:', '2\\vec F-3\\vec G=(4t-3+3t,\\,-10-0,\\,2t^{2}-\\tfrac3t)=(7t-3,\\,-10,\\,2t^{2}-\\tfrac3t)'),
      tx('(b) Scale first, then add:', '3\\vec F+4\\vec G=(6t+4-4t,\\,-15,\\,3t^{2}+\\tfrac4t)=(2t+4,\\,-15,\\,3t^{2}+\\tfrac4t)'),
      tx('(c) The dot product is a scalar:', '\\vec G\\cdot\\vec H=(1-t)\\sin t+0\\cdot e^{t}+\\tfrac1t\\cdot0=(1-t)\\sin t'),
      tx('(d) Cross product, components (F₂H₃−F₃H₂, F₃H₁−F₁H₃, F₁H₂−F₂H₁):', '\\vec F\\times\\vec H=(-t^{2}e^{t},\\ t^{2}\\sin t,\\ 2te^{t}+5\\sin t)'),
      'Reversing the order in (d) would change every sign. (a)–(c) need t ≠ 0 because G is undefined at 0.']);
  })();

  /* ---------- integration by parts formula and the fundamental theorem (Ex 6 review) ---------- */
  add('parts rule vi', true, '\\(\\int f(x)g′(x)\\,dx\\) = (a)', [
    tx('Start from the product rule:', '(fg)\'=f\'g+fg\''),
    tx('Solve for the term we want:', 'fg\'=(fg)\'-f\'g'),
    tx('Integrate both sides (the integral of (fg)′ is fg):', '\\int f g\'\\,dx=fg-\\int f\'g\\,dx'),
    'This is option (b); its second integrand contains f′.']);
  add('parts rule q6', true, 'If d/dx[f(x)g(x)] is expanded, what is the corresponding antiderivative product relation?', [
    tx('Product rule:', '\\frac{d}{dx}[f(x)g(x)]=f\'(x)g(x)+f(x)g\'(x)'),
    tx('Integrate both sides and rearrange:', '\\int f(x)g\'(x)\\,dx=f(x)g(x)-\\int f\'(x)g(x)\\,dx+C')]);
  add('equal limits', true, 'Show ∫ₐᵃf(x)dx = 0 using the fundamental theorem.', [
    'Assume f has an antiderivative F on the interval.',
    tx('Fundamental theorem (upper limit minus lower limit):', '\\int_{a}^{a}f(x)\\,dx=F(a)-F(a)'),
    tx('Both values are the same number, so the difference is zero (the constant of integration cancels as well):', '=0')]);
  add('ln derivative mcq', near((Math.log(2.5 + 1e-6) - Math.log(2.5 - 1e-6)) / 2e-6, 1 / 2.5, 1e-6), 'If f(x) = ln x, then f′(x) =', [
    'The real natural logarithm needs x > 0.',
    tx('Its derivative is the reciprocal of the input x (not of ln x):', '\\frac{d}{dx}\\ln x=\\frac1x,\\quad x>0'),
    'Option (d) is correct.']);
  (function () {
    const f = Math.exp, x0 = 0.3, x = 0.9, p = n => { let s = 0, fa = 1; for (let k = 0; k <= n; k++) { s += f(x0) * (x - x0) ** k / fa; fa *= (k + 1); } return s; };
    add('taylor mcq', Math.abs(p(8) - f(x)) < 1e-6, 'If f(x) and its derivatives at x = x₀ are f′(x₀), f″(x₀), … fⁿ(x), then the nth order polynomial', [
      tx('The nth Taylor polynomial of f about x₀ uses every derivative evaluated at x₀:', 'p_{n}(x)=f(x_{0})+f\'(x_{0})(x-x_{0})+\\frac{f\'\'(x_{0})}{2!}(x-x_{0})^{2}+\\cdots+\\frac{f^{(n)}(x_{0})}{n!}(x-x_{0})^{n}'),
      'Option (b) has the right shape, but its linear coefficient is printed as f′(x) instead of f′(x₀), and the last one as fⁿ(x₀) correctly. No option is exactly right as printed.',
      'Equality with f(x) holds only after adding a remainder term (or in special cases); the polynomial approximates f near x₀.']);
  })();
  /* ---------- worked examples and review items keyed by a pattern of their question text ---------- */
  const addRe = (label, ok, re, steps) => { if (!ok) return warn(label + ' disagrees with its numeric check'); NS.sol.add({ q: label, re, steps }); };
  (function () {
    const D1 = (g, t) => (g(t + 1e-6) - g(t - 1e-6)) / 2e-6;
    const dv = (f, t) => f(0).map((_, k) => D1(tt => f(tt)[k], t));
    const close = (u, v, tol) => u.every((x, k) => near(x, v[k], tol === undefined ? 1e-4 : tol));
    const cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];

    addRe('vector continuity domain', [0.4, 2, 5].every(t => Number.isFinite(Math.sin(t) + 1 / (1 - t) + Math.log(t))) && !Number.isFinite(1 / (1 - 1)) && Number.isNaN(Math.log(-1)), /For what t is .*\(sint,\(1/, [
      'A vector function is continuous exactly where all its components are continuous, so intersect the three domains.',
      tx('sin t is continuous for every real t.', '\\sin t:\\ t\\in\\mathbb{R}'),
      tx('(1 − t)⁻¹ = 1/(1 − t) needs 1 − t ≠ 0:', '(1-t)^{-1}:\\ t\\neq1'),
      tx('The real logarithm needs t > 0:', '\\ln t:\\ t>0'),
      tx('Intersect:', '\\mathbb{R}\\cap(\\mathbb{R}\\setminus\\{1\\})\\cap(0,\\infty)=(0,1)\\cup(1,\\infty)'),
      'The vector is continuous on (0, 1) and on (1, ∞). At t = 0 the logarithm diverges and at t = 1 the reciprocal diverges; neither point has a finite continuous extension.']);

    addRe('derivative of F with e^t, sin t, t^3+5t', close(dv(t => [Math.exp(t), Math.sin(t), t ** 3 + 5 * t], 0.7), [Math.exp(0.7), Math.cos(0.7), 3 * 0.49 + 5]), /^Differentiate .+sin t.+5t\)/, [
      'Differentiate each component with respect to t; the unit vectors do not depend on t.',
      tx('First component:', '\\frac{d}{dt}e^{t}=e^{t}'),
      tx('Second component (radians):', '\\frac{d}{dt}\\sin t=\\cos t'),
      tx('Third component (power and sum rules):', '\\frac{d}{dt}(t^{3}+5t)=3t^{2}+5'),
      tx('Put the derivatives back on their unit vectors (all real t):', '\\vec F\'(t)=e^{t}\\hat\\imath+\\cos t\\,\\hat\\jmath+(3t^{2}+5)\\hat k')]);

    (function () {
      const F = t => [1, t, t * t], G = t => [t, Math.exp(t), 3], t0 = 0.8;
      const lhs = dv(t => cross(F(t), G(t)), t0);
      const rhs = (() => { const a = cross(dv(F, t0), G(t0)), b = cross(F(t0), dv(G, t0)); return a.map((x, k) => x + b[k]); })();
      const formula = [3 - 2 * t0 * Math.exp(t0) - t0 * t0 * Math.exp(t0), 3 * t0 * t0, Math.exp(t0) - 2 * t0];
      addRe('product rule for cross product', close(lhs, rhs, 1e-4) && close(lhs, formula, 1e-4), /^Verify \(F.{0,2}×G/, [
        tx('Cross product of F = (1, t, t²) and G = (t, eᵗ, 3):', '\\vec F\\times\\vec G=(3t-t^{2}e^{t},\\ t^{3}-3,\\ e^{t}-t^{2})'),
        tx('Differentiate each component to get the left-hand side (F×G)′:', '(\\vec F\\times\\vec G)\'=(3-2te^{t}-t^{2}e^{t},\\ 3t^{2},\\ e^{t}-2t)'),
        tx('Right-hand side: F′ = (0, 1, 2t) and G′ = (1, eᵗ, 0). First product:', '\\vec F\'\\times\\vec G=(3-2te^{t},\\ 2t^{2},\\ -t)'),
        tx('Second product:', '\\vec F\\times\\vec G\'=(-t^{2}e^{t},\\ t^{2},\\ e^{t}-t)'),
        tx('Add them, component by component:', '\\vec F\'\\times\\vec G+\\vec F\\times\\vec G\'=(3-2te^{t}-t^{2}e^{t},\\ 3t^{2},\\ e^{t}-2t)'),
        'Both sides are the same vector for every real t, so the rule is verified. The order of the factors matters: reversing a cross product changes its sign.']);
    })();

    (function () {
      const F = t => [1, Math.exp(t), t * t], G = t => [3 * t * t, Math.exp(-t), -2 * t], t0 = 0.9;
      const a = dv(t => F(t).map((x, k) => 2 * x + t ** 3 * G(t)[k]), t0);
      const af = [15 * t0 ** 4, 2 * Math.exp(t0) + t0 * t0 * Math.exp(-t0) * (3 - t0), 4 * t0 * (1 - 2 * t0 * t0)];
      const bd = D1(t => dot(F(t), G(t)), t0);
      addRe('derivatives of two vector functions', close(a, af, 1e-4) && near(bd, 6 * t0 - 6 * t0 * t0, 1e-4), /^For .+, differentiate \(a\) 2F/, [
        tx('(a) Expand first: the î, ĵ, k̂ coefficients of 2F + t³G are', '2\\vec F+t^{3}\\vec G=(2+3t^{5})\\hat\\imath+(2e^{t}+t^{3}e^{-t})\\hat\\jmath+(2t^{2}-2t^{4})\\hat k'),
        tx('Differentiate î: power rule. Differentiate ĵ with the product rule (t³e⁻ᵗ)′ = 3t²e⁻ᵗ − t³e⁻ᵗ. Differentiate k̂: power rule.', '\\frac{d}{dt}(2+3t^{5})=15t^{4},\\quad \\frac{d}{dt}(2e^{t}+t^{3}e^{-t})=2e^{t}+t^{2}e^{-t}(3-t),\\quad \\frac{d}{dt}(2t^{2}-2t^{4})=4t-8t^{3}'),
        tx('So:', '(2\\vec F+t^{3}\\vec G)\'=15t^{4}\\hat\\imath+[2e^{t}+t^{2}e^{-t}(3-t)]\\hat\\jmath+4t(1-2t^{2})\\hat k'),
        tx('(b) Multiply corresponding components and add (eᵗe⁻ᵗ = 1):', '\\vec F\\cdot\\vec G=1\\cdot3t^{2}+e^{t}e^{-t}+t^{2}(-2t)=3t^{2}+1-2t^{3}'),
        tx('Differentiate the scalar:', '\\frac{d}{dt}(\\vec F\\cdot\\vec G)=6t-6t^{2}')]);
    })();

    addRe('velocity', close(dv(t => [5 * t, 4 * t, -Math.cos(t)], 1.1), [5, 4, Math.sin(1.1)]), /^Find velocity for/, [
      'Velocity is the derivative of the position vector.',
      tx('Differentiate each component (the derivative of −cos t is + sin t in radians):', '\\frac{d}{dt}(5t)=5,\\quad \\frac{d}{dt}(4t)=4,\\quad \\frac{d}{dt}(-\\cos t)=\\sin t'),
      tx('So:', '\\vec v(t)=5\\hat\\imath+4\\hat\\jmath+\\sin t\\,\\hat k'),
      tx('Its speed, if asked:', '|\\vec v|=\\sqrt{25+16+\\sin^{2}t}=\\sqrt{41+\\sin^{2}t}')]);

    addRe('acceleration', close(dv(t => dv(tt => [3 * tt * tt + 5, -(4 * tt * tt + 2 * tt - 1), Math.sin(tt)], t), 0.6), [6, -8, -Math.sin(0.6)], 1e-3), /^Find acceleration for/, [
      'Acceleration is the second derivative of position: differentiate twice.',
      tx('First derivative (velocity):', '\\vec v=(6t)\\hat\\imath-(8t+2)\\hat\\jmath+\\cos t\\,\\hat k'),
      tx('Second derivative:', '\\frac{d}{dt}(6t)=6,\\quad \\frac{d}{dt}[-(8t+2)]=-8,\\quad \\frac{d}{dt}\\cos t=-\\sin t'),
      tx('So:', '\\vec a(t)=6\\hat\\imath-8\\hat\\jmath-\\sin t\\,\\hat k')]);

    addRe('unit vector derivative', (() => {
      const F = t => [t, t * t, Math.sin(t)], n = v => Math.hypot(v[0], v[1], v[2]), t0 = 1.3;
      const left = dv(t => F(t).map(x => x / n(F(t))), t0), Fp = dv(F, t0), q = n(F(t0));
      const right = Fp.map((x, k) => x / q - dot(F(t0), Fp) * F(t0)[k] / q ** 3);
      return close(left, right, 1e-4);
    })(), /differentiable vector function and F\(t\) .{1,3} 0, show/, [
      tx('Put q(t) = |F(t)|. It is positive because F(t) ≠ 0, and q² = F·F:', 'q^{2}=\\vec F\\cdot\\vec F'),
      tx('Differentiate with the dot-product rule:', '2qq\'=\\vec F\'\\cdot\\vec F+\\vec F\\cdot\\vec F\'=2\\,\\vec F\\cdot\\vec F\'\\ \\Rightarrow\\ q\'=\\frac{\\vec F\\cdot\\vec F\'}{q}'),
      tx('Differentiate the normalized vector with the scalar quotient rule:', '\\frac{d}{dt}\\frac{\\vec F}{q}=\\frac{\\vec F\'q-\\vec Fq\'}{q^{2}}=\\frac{\\vec F\'}{q}-\\frac{\\vec F\\,q\'}{q^{2}}'),
      tx('Substitute q′:', '=\\frac{\\vec F\'}{q}-\\frac{(\\vec F\\cdot\\vec F\')\\,\\vec F}{q^{3}}=\\frac{\\vec F\'(t)}{|\\vec F(t)|}-\\frac{[\\vec F(t)\\cdot\\vec F\'(t)]\\vec F(t)}{|\\vec F(t)|^{3}}')]);

    addRe('vector limit review v', true, /\\lim_\{t\\to5\}/, [
      'The printed argument is −2, a constant, so the limit as t → 5 is just the value F(−2) (nothing depends on t any more).',
      tx('Substitute t = −2 in each component:', '\\vec F(-2)=(-2+3)\\hat\\imath+2(-2)^{2}\\hat\\jmath-(1-(-2))\\hat k=\\hat\\imath+8\\hat\\jmath-3\\hat k'),
      'None of the four printed options equals î + 8ĵ − 3k̂, so as printed the question has no correct choice. If lim(t→5) F(t) was intended, continuity gives 8î + 50ĵ + 4k̂.']);
    addRe('vector limit review x', true, /\\lim_\{t\\to t_0\}\(C/, [
      'For a constant C, the limit of C·F(t) is C times the limit of F(t), if that limit exists.',
      tx('If F is continuous at t₀ the limit is the value at t₀:', '\\lim_{t\\to t_{0}}\\left(C\\cdot\\vec F(t)\\right)=C\\cdot\\lim_{t\\to t_{0}}\\vec F(t)=C\\cdot\\vec F(t_{0})'),
      'Option (b).']);
  })();

  (function () {
    const quad = x => x * x + 3 * x + 8;
    addRe('plot x^2+3x+8', near(quad(-1.5), 23 / 4) && near(quad(0), 8), /^Plot the graph of .*x\^\{2\}\+3x\+8/, [
      tx('The graph is a parabola opening upward (a = 1 > 0). Vertex at x = −b/(2a):', 'x_{v}=-\\frac{3}{2(1)}=-\\frac32'),
      tx('Vertex height:', 'y_{v}=\\left(-\\frac32\\right)^{2}+3\\left(-\\frac32\\right)+8=\\frac94-\\frac92+8=\\frac{23}{4}'),
      tx('y-intercept (x = 0); there is no x-intercept because the discriminant 9 − 32 is negative:', 'y(0)=8,\\qquad b^{2}-4ac=9-32=-23<0'),
      tx('Maple command:', '\\texttt{plot(x\\^{}2+3*x+8);}')]);
    addRe('plot x^2+2', [-3, -2, -1, 0, 1, 2, 3].every(x => near(x * x + 2, [11, 6, 3, 2, 3, 6, 11][x + 3])), /^Plot the graph of .*x\^\{2\}\+2.*for/, [
      tx('Table of values on −3 ≤ x ≤ 3 (y = x² + 2):', 'x=-3,-2,-1,0,1,2,3\\ \\Rightarrow\\ y=11,6,3,2,3,6,11'),
      'The vertex is (0, 2) and the graph is symmetric about the y-axis because (−x)² = x².',
      tx('Maple command:', '\\texttt{plot(x\\^{}2+2, x=-3..3);}')]);
  })();

  (function () {
    const A = [3, -5], B = [-7, 4], C = [10, -2];
    addRe('centroid', near((A[0] + B[0] + C[0]) / 3, 2) && near((A[1] + B[1] + C[1]) / 3, -1), /^Find the centroid of the triangle ABC, whose vertices are A\(3,-5\)/, [
      tx('The centroid is the average of the vertex coordinates:', 'G\\left(\\frac{x_{1}+x_{2}+x_{3}}{3},\\frac{y_{1}+y_{2}+y_{3}}{3}\\right)'),
      tx('x-coordinate:', 'x=\\frac{3+(-7)+10}{3}=\\frac{6}{3}=2'),
      tx('y-coordinate:', 'y=\\frac{-5+4+(-2)}{3}=\\frac{-3}{3}=-1'),
      tx('So:', 'G(2,-1)')]);
    addRe('distance P Q (WE 7.6)', near(Math.hypot(-1 - 3, -5 + 2), 5), /^Find the distance between the two points P\(3,-2\)/, [
      'Use the distance formula with P = (3, −2) and Q = (−1, −5).',
      tx('Substitute:', 'd=\\sqrt{(-1-3)^{2}+(-5+2)^{2}}=\\sqrt{16+9}=\\sqrt{25}=5')]);
    const cc = [6, 1 / 3], dd = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
    addRe('right bisectors concurrent', near(dd(cc, [0, 0]), dd(cc, [8, 6]), 1e-9) && near(dd(cc, [0, 0]), dd(cc, [12, 0]), 1e-9), /^Let ABC be a triangle with vertices 4\(0,0\), B\(8,6\)/, [
      'The right (perpendicular) bisector of a side passes through its midpoint at right angles to it. A = (0,0), B = (8,6), C = (12,0).',
      tx('Side AC lies on the x-axis, so its bisector is vertical through the midpoint (6, 0):', 'x=6'),
      tx('Side AB: midpoint (4, 3), slope 6/8 = 3/4, so the bisector has slope −4/3:', 'y-3=-\\frac43(x-4)\\ \\Rightarrow\\ \\text{at }x=6:\\ y=3-\\frac83=\\frac13'),
      tx('Side BC: midpoint (10, 3), slope (0 − 6)/(12 − 8) = −3/2, so the bisector has slope 2/3:', 'y-3=\\frac23(x-10)\\ \\Rightarrow\\ \\text{at }x=6:\\ y=3-\\frac83=\\frac13'),
      tx('All three bisectors pass through the same point, the circumcentre:', 'G=\\left(6,\\frac13\\right)'),
      tx('Check: it is equally far from A, B and C:', 'GA^{2}=36+\\frac19,\\quad GB^{2}=4+\\left(\\frac{17}{3}\\right)^{2}=36+\\frac19,\\quad GC^{2}=36+\\frac19')]);
  })();

  (function () {
    const f = x => x * x - 2; let x = 1; for (let i = 0; i < 6; i++) x = x - f(x) / (2 * x);
    const ivt = f(1) * f(2) < 0 && f(1.4) * f(1.5) < 0;
    NS.sol.add({ q: 'If f(a) and f(c) have opposite signs, where does the root lie?', steps: [
      'Intermediate value theorem: if f is continuous on [a, c] and f(a), f(c) have opposite signs, the graph must cross the x-axis between a and c.',
      tx('Opposite signs means the product is negative; then there is a root inside the interval:', 'f(a)\\,f(c)<0\\ \\Rightarrow\\ \\exists\\,r\\in(a,c):\\ f(r)=0'),
      'The bisection method uses this: it halves [a, c] and keeps the half whose end values still have opposite signs.'] });
    if (!ivt || !near(x, Math.SQRT2, 1e-9)) warn('newton / bisection numeric check');
    NS.sol.add({ q: 'Newton-Raphson is also known as:', steps: [
      'Newton-Raphson takes the tangent to the curve at the current estimate xᵢ (slope f′(xᵢ)) and moves to the point where that tangent meets the x-axis.',
      tx('The tangent line y − f(xᵢ) = f′(xᵢ)(x − xᵢ) meets y = 0 at:', 'x_{i+1}=x_{i}-\\frac{f(x_{i})}{f\'(x_{i})}'),
      'So the method is also called the tangent method: option (a). (Regula-falsi, not Newton-Raphson, uses a chord.)'] });
    NS.sol.add({ q: 'The Newton–Raphson method is also called which method?', re: /Newton.Raphson method is also called/, steps: [
      tx('Each new estimate is where the tangent at the current estimate meets the x-axis:', 'x_{i+1}=x_{i}-\\frac{f(x_{i})}{f\'(x_{i})}'),
      'It is the tangent method.'] });
  })();
  // two packs whose printed question has a prime sign: match them by pattern
  NS.sol.all().forEach(p => { if (p.q.indexOf('int f(x)g') >= 0) p.re = /^.{3}int f\(x\)g.{1,2}\(x\).{1,3}dx.{2} = \(a\)/; if (p.q.indexOf('ln x, then f') >= 0) p.re = /^If f\(x\) = ln x, then f.{1,2}\(x\) =/; });
})(typeof window !== 'undefined' ? window : globalThis);
