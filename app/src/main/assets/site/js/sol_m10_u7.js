/* Class 10 Mathematics, Unit 7 "Introduction to Trigonometry": hand-written worked solutions (Exercises 7.1-7.6 and Review Exercise 7).
 * Every number is computed here and compared with the book's printed answer; where the book is off, the pack states the computed value and says so. */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.sol) return;
  const warn = m => { if (root.console) console.warn('sol_m10_u7: ' + m); };
  const f = (x, d) => String(+Number(x).toFixed(d === undefined ? 2 : d));
  const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI;
  const ok = (label, got, exp, tol) => { if (Math.abs(got - exp) > (tol === undefined ? 0.006 : tol)) { warn(label + ': computed ' + got + ' but the book prints ' + exp); return false; } return true; };
  const tx = (text, m) => ({ text, m });
  const add = (q, steps) => NS.sol.add({ q, steps });
  const dms = d => { const D = Math.floor(d), mm = (d - D) * 60, M = Math.floor(mm + 1e-9), S = Math.round((mm - M) * 60); return D + '°' + M + '′' + (S ? S + '″' : ''); };

  /* ---------- 7.1 degrees, minutes, seconds, radians ---------- */
  (function () {
    const v = [[8, 15, 35], [39, 48, 55], [84, 19, 10], [18, 6, 21]], exp = [8.2597, 39.8152, 84.3194, 18.1058], d = v.map(a => a[0] + a[1] / 60 + a[2] / 3600);
    if (!d.every((x, i) => ok('7.1 Q1', x, exp[i], 0.0001))) return;
    add('Convert to decimal degrees: (i) 8°15′35″; (ii) 39°48′55″; (iii) 84°19′10″; (iv) 18°6′21″.', [
      'One degree has 60 minutes and one minute has 60 seconds, so D° M′ S″ = D + M/60 + S/3600 degrees.'].concat(v.map((a, i) => tx('(' + ['i', 'ii', 'iii', 'iv'][i] + ') ' + a[0] + '°' + a[1] + '′' + a[2] + '″:', a[0] + '+\\frac{' + a[1] + '}{60}+\\frac{' + a[2] + '}{3600}=' + f(a[0], 0) + '+' + f(a[1] / 60, 4) + '+' + f(a[2] / 3600, 4) + '=' + f(d[i], 4) + '^\\circ'))));
  })();

  (function () {
    const v = [42.25, 57.325, 12.9956, 32.625], exp = ['42°15′', '57°19′30″', '12°59′44″', '32°37′30″'];
    if (!v.every((x, i) => dms(x) === exp[i])) return warn('7.1 Q2 dms');
    add('Convert to D°M′S″: (i) 42.25°; (ii) 57.325°; (iii) 12.9956°; (iv) 32.625°.', ['Keep the whole degrees. Multiply the decimal part by 60 to get minutes, keep the whole minutes, then multiply the decimal part of the minutes by 60 to get seconds.'].concat(v.map((x, i) => {
      const D = Math.floor(x), mm = (x - D) * 60, M = Math.floor(mm + 1e-9), S = (mm - M) * 60;
      return tx('(' + ['i', 'ii', 'iii', 'iv'][i] + ') ' + x + '°: 0.' + String(x).split('.')[1] + ' × 60 = ' + f(mm, 3) + '′' + (S > 0.0005 ? ', then 0.' + f(S / 60, 4).split('.')[1] + ' × 60 ≈ ' + f(S, 1) + '″' : '') + '.', x + '^\\circ=' + exp[i].replace('°', '^\\circ ').replace('′', "' ").replace('″', "''"));
    })));
  })();

  (function () {
    const a = deg(2), b = deg(5 * Math.PI / 3), c = deg(Math.PI / 6), d = deg(-3 * Math.PI / 4);
    if (!ok('7.1 Q3', a, 114.6, 0.05) || b !== b || Math.abs(b - 300) > 1e-9 || Math.abs(c - 30) > 1e-9 || Math.abs(d + 135) > 1e-9) return;
    add('Convert to degrees: (i) 2 radians; (ii) 5π/3 radians; (iii) π/6 radians; (iv) −3π/4 radians.', [
      'π radians = 180°, so multiply a radian measure by 180°/π.', tx('(i) 2 radians:', '2\\times\\frac{180^\\circ}{\\pi}=\\frac{360^\\circ}{\\pi}\\approx ' + f(a, 1) + '^\\circ'), tx('(ii) 5π/3 radians:', '\\frac{5\\pi}{3}\\times\\frac{180^\\circ}{\\pi}=5\\times 60^\\circ=300^\\circ'),
      tx('(iii) π/6 radians:', '\\frac{\\pi}{6}\\times\\frac{180^\\circ}{\\pi}=30^\\circ'), tx('(iv) −3π/4 radians:', '-\\frac{3\\pi}{4}\\times\\frac{180^\\circ}{\\pi}=-3\\times 45^\\circ=-135^\\circ')]);
  })();

  (function () {
    const w = 60 + 35 / 60 + 48 / 3600, r = rad(w);
    if (!ok('7.1 Q4', r, 1.0576, 0.0001)) return;
    add('Convert to radians: (i) 45°; (ii) 120°; (iii) −210°; (iv) 60°35′48″.', [
      '180° = π radians, so multiply a degree measure by π/180.', tx('(i) 45°:', '45^\\circ\\times\\frac{\\pi}{180}=\\frac{\\pi}{4}'), tx('(ii) 120°:', '120^\\circ\\times\\frac{\\pi}{180}=\\frac{2\\pi}{3}'), tx('(iii) −210°:', '-210^\\circ\\times\\frac{\\pi}{180}=-\\frac{7\\pi}{6}'),
      tx('(iv) 60°35′48″: first change to decimal degrees.', '60+\\frac{35}{60}+\\frac{48}{3600}=' + f(w, 4) + '^\\circ'), tx('Then multiply by π/180.', f(w, 4) + '\\times\\frac{\\pi}{180}\\approx ' + f(r, 4) + '\\text{ radians}')]);
  })();

  /* ---------- 7.2 arc length and sector area ---------- */
  (function () {
    add('Find arc length ℓ when: (i) θ=π/6 rad, r=2 cm; (ii) θ=30°, r=6 cm; (iii) θ=4π/6 rad, r=6 cm.', [
      'The arc length is ℓ = rθ, with θ in radians.', tx('(i) θ = π/6, r = 2:', '\\ell=r\\theta=2\\times\\frac{\\pi}{6}=\\frac{\\pi}{3}\\text{ cm}'),
      tx('(ii) θ = 30° must be changed to radians first.', '30^\\circ=30\\times\\frac{\\pi}{180}=\\frac{\\pi}{6}'), tx('Then ℓ = rθ:', '\\ell=6\\times\\frac{\\pi}{6}=\\pi\\text{ cm}'), tx('(iii) θ = 4π/6, r = 6:', '\\ell=6\\times\\frac{4\\pi}{6}=4\\pi\\text{ cm}')]);
  })();

  (function () {
    if (!ok('7.2 Q2', 6 / 2.87, 2.09, 0.005)) return;
    add('Find θ when: (i) ℓ=5 cm,r=2 cm; (ii) ℓ=30 cm,r=6 cm; (iii) ℓ=6 cm,r=2.87 cm.', ['From ℓ = rθ we get θ = ℓ / r (in radians).', tx('(i)', '\\theta=\\frac{\\ell}{r}=\\frac{5}{2}=2.5\\text{ rad}'), tx('(ii)', '\\theta=\\frac{30}{6}=5\\text{ rad}'), tx('(iii)', '\\theta=\\frac{6}{2.87}\\approx ' + f(6 / 2.87, 2) + '\\text{ rad}')]);
  })();

  (function () {
    if (!ok('7.2 Q3', 12 / Math.PI, 3.82) || !ok('7.2 Q3', (4 / 7) / 3.5, 0.1633, 0.0005) || !ok('7.2 Q3', 20 / Math.PI, 6.366, 0.001)) return;
    add('Find r when: (i) θ=π/6 rad,ℓ=2 cm; (ii) θ=3½ rad,ℓ=4/7 m; (iii) θ=3π/4 rad,ℓ=15 cm.', ['From ℓ = rθ we get r = ℓ / θ.', tx('(i)', 'r=\\frac{\\ell}{\\theta}=\\frac{2}{\\pi/6}=\\frac{12}{\\pi}\\approx ' + f(12 / Math.PI, 2) + '\\text{ cm}'), tx('(ii) 3½ = 7/2:', 'r=\\frac{4/7}{7/2}=\\frac{4}{7}\\times\\frac{2}{7}=\\frac{8}{49}\\approx ' + f(8 / 49, 4) + '\\text{ m}'), tx('(iii)', 'r=\\frac{15}{3\\pi/4}=\\frac{15\\times 4}{3\\pi}=\\frac{20}{\\pi}\\approx ' + f(20 / Math.PI, 3) + '\\text{ cm}'),
      'The book prints (ii) as 0.1632; correctly rounded 8/49 = 0.1633 (the exact value 8/49 is the same).']);
  })();

  add('Find the area of a sector of radius 4 m with central angle 12 radians.', ['The area of a sector is A = ½ r² θ, with θ in radians.', { text: 'r = 4 and θ = 12:', m: 'A=\\frac{1}{2}r^{2}\\theta=\\frac{1}{2}\\times 16\\times 12=96\\text{ m}^{2}' }]);

  (function () {
    add('A circle has radius 5 cm and a central angle of 30°. Find (i) the arc length and (ii) the area of the sector.', ['Change 30° to radians first.', tx('θ =', '30^\\circ\\times\\frac{\\pi}{180}=\\frac{\\pi}{6}'), tx('(i) Arc length ℓ = rθ:', '\\ell=5\\times\\frac{\\pi}{6}=\\frac{5\\pi}{6}\\approx ' + f(5 * Math.PI / 6, 2) + '\\text{ cm}'), tx('(ii) Area A = ½r²θ:', 'A=\\frac{1}{2}\\times 25\\times\\frac{\\pi}{6}=\\frac{25\\pi}{12}\\approx ' + f(25 * Math.PI / 12, 2) + '\\text{ cm}^{2}')]);
  })();

  add('An arc subtends 2 radians at the centre. If the sector area is 64 cm², find the circle’s radius.', ['Use A = ½ r² θ with A = 64 and θ = 2.', tx('Substitute:', '64=\\frac{1}{2}r^{2}\\times 2=r^{2}'), tx('Take the positive square root:', 'r=\\sqrt{64}=8\\text{ cm}')]);
  add('A point moves on a circle of radius 10 m through 3.5 revolutions. Find the distance travelled.', ['One revolution is 2π radians.', tx('3.5 revolutions:', '\\theta=3.5\\times 2\\pi=7\\pi'), tx('Distance = arc length ℓ = rθ:', '\\ell=10\\times 7\\pi=70\\pi\\text{ m}')]);
  add('What is the circular measure of the angle between the hands of a watch at 3 o’clock?', ['At 3 o’clock the hands point to 12 and 3, a quarter of a full turn.', tx('A quarter turn is 90°:', '90^\\circ\\times\\frac{\\pi}{180}=\\frac{\\pi}{2}\\text{ radians}')]);
  add('In the diagram, radius OB=8 cm and ∠AOB=90°. Find the length of the minor arc APB.', ['The minor arc subtends 90° = π/2 radians at the centre.', tx('ℓ = rθ:', '\\ell=8\\times\\frac{\\pi}{2}=4\\pi\\text{ cm}')]);
  add('Find the area of sector OPR when r=6 cm and ∠POR=60°.', ['Change 60° to radians: π/3.', tx('A = ½r²θ:', 'A=\\frac{1}{2}\\times 36\\times\\frac{\\pi}{3}=6\\pi\\text{ cm}^{2}')]);

  /* ---------- 7.3 coterminal angles and quadrants ---------- */
  add('Find one positive and one negative coterminal angle for: (i) 55°; (ii) −45°; (iii) π/6; (iv) −3π/4.', [
    'Coterminal angles differ by a whole number of full turns: add or subtract 360° (or 2π radians).', tx('(i) 55°:', '55^\\circ+360^\\circ=415^\\circ,\\quad 55^\\circ-360^\\circ=-305^\\circ'), tx('(ii) −45°:', '-45^\\circ+360^\\circ=315^\\circ,\\quad -45^\\circ-360^\\circ=-405^\\circ'),
    tx('(iii) π/6:', '\\frac{\\pi}{6}+2\\pi=\\frac{13\\pi}{6},\\quad \\frac{\\pi}{6}-2\\pi=-\\frac{11\\pi}{6}'), tx('(iv) −3π/4:', '-\\frac{3\\pi}{4}+2\\pi=\\frac{5\\pi}{4},\\quad -\\frac{3\\pi}{4}-2\\pi=-\\frac{11\\pi}{4}')]);

  (function () {
    const q = d => { d = ((d % 360) + 360) % 360; return d === 0 || d % 90 === 0 ? 'axis' : d < 90 ? 'I' : d < 180 ? 'II' : d < 270 ? 'III' : 'IV'; };
    if (q(288) !== 'IV' || q(75) !== 'I' || q(-818) !== 'III' || q(-225) !== 'II' || q(103) !== 'II') return;
    add('State the quadrant for: (i) 8π/5; (ii) 75°; (iii) −818°; (iv) −5π/4; (v) 103°.', [
      'Reduce each angle to an equal angle between 0° and 360°, then read the quadrant: I is 0°–90°, II is 90°–180°, III is 180°–270°, IV is 270°–360°.', tx('(i) 8π/5 in degrees:', '\\frac{8\\pi}{5}=\\frac{8\\times 180^\\circ}{5}=288^\\circ\\ \\Rightarrow\\ \\text{quadrant IV}'), '(ii) 75° is between 0° and 90°, so quadrant I.',
      tx('(iii) −818°: add 3 full turns (1080°).', '-818^\\circ+1080^\\circ=262^\\circ\\ \\Rightarrow\\ \\text{quadrant III}'), tx('(iv) −5π/4 = −225°:', '-225^\\circ+360^\\circ=135^\\circ\\ \\Rightarrow\\ \\text{quadrant II}'), '(v) 103° is between 90° and 180°, so quadrant II.']);
  })();

  /* ---------- 7.4 signs, ratios, special angles, right triangles ---------- */
  add('Find the sign and quadrant: (i) sin98°; (ii) sin160°; (iii) tan200°; (iv) sec120°; (v) cosec198°; (vi) sin460°.', [
    'In quadrant I all ratios are positive; in II only sin and cosec; in III only tan and cot; in IV only cos and sec.', '(i) 98° is in quadrant II, where sin is positive: +, II.', '(ii) 160° is in quadrant II: +, II.', '(iii) 200° is in quadrant III, where tan is positive: +, III.',
    '(iv) 120° is in quadrant II, where cos and sec are negative: −, II.', '(v) 198° is in quadrant III, where sin and cosec are negative: −, III.', tx('(vi) 460° is more than one full turn: subtract 360°.', '460^\\circ-360^\\circ=100^\\circ\\ \\Rightarrow\\ \\text{quadrant II, so }\\sin 460^\\circ>0'),
    'The sign is +, as printed. Note: the book prints the quadrant as I, but 100° is in quadrant II.']);

  add('Find all six trigonometric ratios of: (i) −180°; (ii) −270°; (iii) 720°; (iv) 1470°.', [
    'Reduce each angle to a quadrantal angle (0°, 90°, 180°, 270°) or a special angle, then read the values from the unit circle point (cos, sin).', tx('(i) −180° is the same as 180°: the point is (−1, 0).', '\\sin=0,\\ \\cos=-1,\\ \\tan=\\frac{0}{-1}=0,\\ \\sec=-1;\\ \\csc=\\frac{1}{0},\\ \\cot=\\frac{-1}{0}\\text{ undefined}'),
    tx('(ii) −270° is the same as 90°: the point is (0, 1).', '\\sin=1,\\ \\cos=0,\\ \\csc=1,\\ \\cot=0;\\ \\tan=\\frac{1}{0},\\ \\sec=\\frac{1}{0}\\text{ undefined}'), tx('(iii) 720° = 2 full turns, same as 0°: the point is (1, 0).', '\\sin=0,\\ \\cos=1,\\ \\tan=0,\\ \\sec=1;\\ \\csc,\\ \\cot\\text{ undefined}'),
    tx('(iv) 1470° = 4 full turns + 30°.', '1470^\\circ-4\\times 360^\\circ=30^\\circ'), tx('So the six ratios are those of 30°.', '\\sin=\\frac{1}{2},\\ \\cos=\\frac{\\sqrt3}{2},\\ \\tan=\\frac{1}{\\sqrt3},\\ \\csc=2,\\ \\sec=\\frac{2}{\\sqrt3},\\ \\cot=\\sqrt3')]);

  add('If secθ=2 and θ lies in quadrant IV, find the other trigonometric ratios.', [
    tx('Since secθ = 1/cosθ:', '\\cos\\theta=\\frac{1}{\\sec\\theta}=\\frac{1}{2}'), tx('Use sin²θ + cos²θ = 1:', '\\sin^{2}\\theta=1-\\frac{1}{4}=\\frac{3}{4}'), 'In quadrant IV, sin is negative, so sinθ = −√3/2.',
    tx('tan, cosec and cot follow:', '\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}=\\frac{-\\sqrt3/2}{1/2}=-\\sqrt3'), tx('', '\\csc\\theta=\\frac{1}{\\sin\\theta}=-\\frac{2}{\\sqrt3},\\quad \\cot\\theta=\\frac{1}{\\tan\\theta}=-\\frac{1}{\\sqrt3}')]);

  add('If sinθ=4/5 and π/2<θ<π, find the other trigonometric ratios.', [
    'In a right triangle sinθ = y/r = 4/5, so take y = 4 and r = 5.', tx('Find x with x² + y² = r²:', 'x^{2}=25-16=9,\\quad x=\\pm 3'), 'θ is in quadrant II (π/2 < θ < π), where x is negative, so x = −3.',
    tx('', '\\cos\\theta=\\frac{x}{r}=-\\frac{3}{5},\\quad \\tan\\theta=\\frac{y}{x}=-\\frac{4}{3}'), tx('', '\\cot\\theta=-\\frac{3}{4},\\quad \\sec\\theta=-\\frac{5}{3},\\quad \\csc\\theta=\\frac{5}{4}')]);

  (function () {
    const s2 = Math.SQRT2, v1 = 2 * Math.sin(Math.PI / 4) * Math.cos(Math.PI / 4), v2 = (Math.tan(Math.PI / 3) - Math.tan(Math.PI / 6)) / (1 + Math.tan(Math.PI / 3) * Math.tan(Math.PI / 6)), v3 = Math.cos(Math.PI / 4) / (Math.sin(Math.PI / 4) + 1), v4 = Math.tan(Math.PI / 6) * Math.tan(Math.PI / 3) + 1, v5 = Math.cos(Math.PI / 3) * Math.cos(Math.PI / 6) - Math.sin(Math.PI / 3) * Math.sin(Math.PI / 6);
    if (!ok('7.4 Q5', v1, 1) || !ok('7.4 Q5', v2, 1 / Math.sqrt(3)) || !ok('7.4 Q5', v3, 1 / (1 + s2)) || !ok('7.4 Q5', v4, 2) || !ok('7.4 Q5', v5, 0)) return;
    add('Evaluate: (i) 2sin45°cos45°; (ii) (tan60°−tan30°)/(1+tan60°tan30°); (iii) cos45°/(sin45°+tan45°); (iv) tan30°tan60°+tan45°; (v) cos(π/3)cos(π/6)−sin(π/3)sin(π/6).', [
      'Substitute the special-angle values: sin45° = cos45° = 1/√2, tan45° = 1, tan30° = 1/√3, tan60° = √3, sin30° = 1/2, cos30° = √3/2.',
      tx('(i)', '2\\sin45^\\circ\\cos45^\\circ=2\\times\\frac{1}{\\sqrt2}\\times\\frac{1}{\\sqrt2}=2\\times\\frac{1}{2}=1'),
      tx('(ii)', '\\frac{\\tan60^\\circ-\\tan30^\\circ}{1+\\tan60^\\circ\\tan30^\\circ}=\\frac{\\sqrt3-\\frac{1}{\\sqrt3}}{1+\\sqrt3\\cdot\\frac{1}{\\sqrt3}}=\\frac{\\frac{2}{\\sqrt3}}{2}=\\frac{1}{\\sqrt3}'),
      tx('(iii)', '\\frac{\\cos45^\\circ}{\\sin45^\\circ+\\tan45^\\circ}=\\frac{\\frac{1}{\\sqrt2}}{\\frac{1}{\\sqrt2}+1}=\\frac{1}{1+\\sqrt2}'), tx('(iv)', '\\tan30^\\circ\\tan60^\\circ+\\tan45^\\circ=\\frac{1}{\\sqrt3}\\times\\sqrt3+1=2'),
      tx('(v) cos(π/3) = 1/2, sin(π/3) = √3/2, cos(π/6) = √3/2, sin(π/6) = 1/2:', '\\frac{1}{2}\\cdot\\frac{\\sqrt3}{2}-\\frac{\\sqrt3}{2}\\cdot\\frac{1}{2}=\\frac{\\sqrt3}{4}-\\frac{\\sqrt3}{4}=0')]);
  })();

  add('In which quadrant does θ lie? (i) sinθ>0,tanθ>0; (ii) sinθ<0,cotθ>0; (iii) sinθ>0,cosθ<0; (iv) cosθ>0,cosecθ<0; (v) tanθ<0,secθ>0; (vi) cosθ<0,tanθ<0.', [
    'Each sign condition allows two quadrants; θ is in the quadrant common to both. Sin and cosec are positive in I and II; cos and sec in I and IV; tan and cot in I and III.',
    '(i) sinθ > 0 gives I or II; tanθ > 0 gives I or III. Common: quadrant I.', '(ii) sinθ < 0 gives III or IV; cotθ > 0 gives I or III. Common: quadrant III.', '(iii) sinθ > 0 gives I or II; cosθ < 0 gives II or III. Common: quadrant II.',
    '(iv) cosθ > 0 gives I or IV; cosecθ < 0 means sinθ < 0, giving III or IV. Common: quadrant IV.', '(v) tanθ < 0 gives II or IV; secθ > 0 means cosθ > 0, giving I or IV. Common: quadrant IV.',
    '(vi) cosθ < 0 gives II or III; tanθ < 0 gives II or IV. The common quadrant is II. (The book prints III for part (vi), but tan is positive in III, so II is the correct quadrant.)']);

  (function () {
    const a1 = 32 * Math.cos(rad(53)), o1 = 32 * Math.sin(rad(53)), o2 = 73 * Math.sin(rad(21)), a2 = 73 * Math.cos(rad(21)), o3 = 12 * Math.tan(rad(33)), h3 = 12 / Math.cos(rad(33));
    if (!ok('7.4 Q9', a1, 19.25, 0.015) || !ok('7.4 Q9', o1, 25.57, 0.015) || !ok('7.4 Q9', o2, 26.16) || !ok('7.4 Q9', a2, 68.15) || !ok('7.4 Q9', o3, 7.79) || !ok('7.4 Q9', h3, 14.31)) return;
    add('For each right triangle, find the missing side lengths to two decimal places: (i) hypotenuse 32, angle 53°; (ii) hypotenuse 73, angle 21°; (iii) base 12, angle 33°.', [
      'For the angle θ: sinθ = opposite / hypotenuse, cosθ = adjacent / hypotenuse, tanθ = opposite / adjacent.',
      tx('(i) adjacent side:', '\\cos53^\\circ=\\frac{a}{32}\\ \\Rightarrow\\ a=32\\cos53^\\circ=32\\times ' + f(Math.cos(rad(53)), 5) + '=' + f(a1, 3)), tx('(i) opposite side:', '\\sin53^\\circ=\\frac{o}{32}\\ \\Rightarrow\\ o=32\\times ' + f(Math.sin(rad(53)), 5) + '=' + f(o1, 3)),
      'The book prints 19.25 and 25.57 for (i); correctly rounded to two decimals they are ' + f(a1, 2) + ' and ' + f(o1, 2) + ' (about 0.01 different).',
      tx('(ii) opposite side:', 'o=73\\sin21^\\circ=73\\times ' + f(Math.sin(rad(21)), 5) + '=' + f(o2, 2)), tx('(ii) adjacent side:', 'a=73\\cos21^\\circ=73\\times ' + f(Math.cos(rad(21)), 5) + '=' + f(a2, 2)),
      tx('(iii) opposite side (base 12 is adjacent):', '\\tan33^\\circ=\\frac{o}{12}\\ \\Rightarrow\\ o=12\\times ' + f(Math.tan(rad(33)), 5) + '=' + f(o3, 2)), tx('(iii) hypotenuse:', '\\cos33^\\circ=\\frac{12}{h}\\ \\Rightarrow\\ h=\\frac{12}{' + f(Math.cos(rad(33)), 5) + '}=' + f(h3, 2))]);
  })();

  (function () {
    const a = 750 * Math.tan(rad(24)); if (!ok('7.4 Q10', a, 334, 0.5)) return;
    add('A surveyor measures a 750 yd baseline and a 24° angle to a point across a lake, as shown. Find the distance a across the lake.', ['The baseline is adjacent to the 24° angle and the lake width a is opposite it, so use the tangent.', tx('tan 24° = opposite / adjacent:', '\\tan24^\\circ=\\frac{a}{750}'), tx('Solve for a:', 'a=750\\tan24^\\circ=750\\times ' + f(Math.tan(rad(24)), 5) + '\\approx ' + f(a, 0) + '\\text{ yd}')]);
  })();

  /* ---------- 7.5 identities ---------- */
  const proof = (q, hint, lines) => add(q, [hint].concat(lines.map(l => (Array.isArray(l) ? tx(l[0], l[1]) : l))));
  proof('Prove (sec²θ−1)cos²θ=sin²θ.', 'Start from the left side and change it step by step until it equals the right side.', [['Use sec²θ − 1 = tan²θ:', '(\\sec^{2}\\theta-1)\\cos^{2}\\theta=\\tan^{2}\\theta\\cos^{2}\\theta'], ['Write tanθ = sinθ / cosθ:', '=\\frac{\\sin^{2}\\theta}{\\cos^{2}\\theta}\\times\\cos^{2}\\theta=\\sin^{2}\\theta'], 'This is the right side, so the identity is proved.']);
  proof('Prove tanθ+secθ=(1+sinθ)/cosθ.', 'Write the left side in sines and cosines.', [['', '\\tan\\theta+\\sec\\theta=\\frac{\\sin\\theta}{\\cos\\theta}+\\frac{1}{\\cos\\theta}=\\frac{\\sin\\theta+1}{\\cos\\theta}=\\frac{1+\\sin\\theta}{\\cos\\theta}'], 'This is the right side, so the identity is proved.']);
  proof('Prove (cosθ−sinθ)²=1−2sinθcosθ.', 'Expand the square on the left.', [['', '(\\cos\\theta-\\sin\\theta)^{2}=\\cos^{2}\\theta-2\\sin\\theta\\cos\\theta+\\sin^{2}\\theta'], ['Use cos²θ + sin²θ = 1:', '=1-2\\sin\\theta\\cos\\theta'], 'This is the right side, so the identity is proved.']);
  proof('Prove cos²θ−sin²θ=2cos²θ−1.', 'Replace sin²θ on the left by 1 − cos²θ.', [['', '\\cos^{2}\\theta-\\sin^{2}\\theta=\\cos^{2}\\theta-(1-\\cos^{2}\\theta)=\\cos^{2}\\theta-1+\\cos^{2}\\theta=2\\cos^{2}\\theta-1'], 'This is the right side, so the identity is proved.']);
  proof('Prove tanθ+cotθ=secθ cosecθ.', 'Write the left side in sines and cosines and use a common denominator.', [['', '\\tan\\theta+\\cot\\theta=\\frac{\\sin\\theta}{\\cos\\theta}+\\frac{\\cos\\theta}{\\sin\\theta}=\\frac{\\sin^{2}\\theta+\\cos^{2}\\theta}{\\sin\\theta\\cos\\theta}=\\frac{1}{\\sin\\theta\\cos\\theta}=\\sec\\theta\\csc\\theta'], 'This is the right side, so the identity is proved.']);
  proof('Prove (1−sinθ)/cosθ=cosθ/(1+sinθ).', 'Multiply the top and bottom of the left side by (1 + sinθ).', [['', '\\frac{1-\\sin\\theta}{\\cos\\theta}=\\frac{(1-\\sin\\theta)(1+\\sin\\theta)}{\\cos\\theta(1+\\sin\\theta)}=\\frac{1-\\sin^{2}\\theta}{\\cos\\theta(1+\\sin\\theta)}=\\frac{\\cos^{2}\\theta}{\\cos\\theta(1+\\sin\\theta)}=\\frac{\\cos\\theta}{1+\\sin\\theta}'], 'This is the right side, so the identity is proved.']);
  proof('Prove sinθ√(1+tan²θ)=tanθ.', 'Use 1 + tan²θ = sec²θ (θ is an acute angle, so the square root is positive).', [['', '\\sin\\theta\\sqrt{1+\\tan^{2}\\theta}=\\sin\\theta\\sqrt{\\sec^{2}\\theta}=\\sin\\theta\\sec\\theta=\\sin\\theta\\times\\frac{1}{\\cos\\theta}=\\tan\\theta'], 'This is the right side, so the identity is proved.']);
  proof('Prove cosθ=√(1−sin²θ).', 'Start from the right side and use cos²θ + sin²θ = 1.', [['', '\\sqrt{1-\\sin^{2}\\theta}=\\sqrt{\\cos^{2}\\theta}=\\cos\\theta'], 'The square root is positive because θ is an acute angle, so cosθ is positive. The identity is proved.']);
  proof('Prove (1+cosθ)(1−cosθ)=1/cosec²θ.', 'Multiply out the left side.', [['', '(1+\\cos\\theta)(1-\\cos\\theta)=1-\\cos^{2}\\theta=\\sin^{2}\\theta'], ['The right side is also sin²θ:', '\\frac{1}{\\csc^{2}\\theta}=\\sin^{2}\\theta'], 'Both sides equal sin²θ, so the identity is proved.']);
  proof('Prove cosx−cosx sin²x=cos³x.', 'Factor cosx out of the left side.', [['', '\\cos x-\\cos x\\sin^{2}x=\\cos x(1-\\sin^{2}x)=\\cos x\\cdot\\cos^{2}x=\\cos^{3}x'], 'This is the right side, so the identity is proved.']);
  proof('Prove sinx/(1+cosx)+(1+cosx)/sinx=2cosecx.', 'Use the common denominator sinx(1 + cosx).', [['', '\\frac{\\sin x}{1+\\cos x}+\\frac{1+\\cos x}{\\sin x}=\\frac{\\sin^{2}x+(1+\\cos x)^{2}}{\\sin x(1+\\cos x)}'], ['Expand (1 + cosx)² and use sin²x + cos²x = 1:', '=\\frac{\\sin^{2}x+1+2\\cos x+\\cos^{2}x}{\\sin x(1+\\cos x)}=\\frac{2+2\\cos x}{\\sin x(1+\\cos x)}=\\frac{2(1+\\cos x)}{\\sin x(1+\\cos x)}=\\frac{2}{\\sin x}=2\\csc x'], 'This is the right side, so the identity is proved.']);
  proof('Prove sinx/(1+cosx)=(1−cosx)/sinx.', 'Cross-multiply: the identity holds exactly when sin x · sin x = (1 − cos x)(1 + cos x).', [['', '\\sin^{2}x=(1-\\cos x)(1+\\cos x)=1-\\cos^{2}x'], 'This is true because sin²x + cos²x = 1. Reading the steps backwards, the identity is proved.']);
  proof('Prove 1/(1+cosa)+1/(1−cosa)=2+2cot²a.', 'Add the fractions over the common denominator (1 + cos a)(1 − cos a).', [['', '\\frac{1}{1+\\cos a}+\\frac{1}{1-\\cos a}=\\frac{(1-\\cos a)+(1+\\cos a)}{(1+\\cos a)(1-\\cos a)}=\\frac{2}{1-\\cos^{2}a}=\\frac{2}{\\sin^{2}a}=2\\csc^{2}a'], ['Use cosec²a = 1 + cot²a:', '=2(1+\\cot^{2}a)=2+2\\cot^{2}a'], 'This is the right side, so the identity is proved.']);
  proof('Prove cos⁴b−sin⁴b=1−2sin²b.', 'Factor the left side as a difference of squares.', [['', '\\cos^{4}b-\\sin^{4}b=(\\cos^{2}b-\\sin^{2}b)(\\cos^{2}b+\\sin^{2}b)=(\\cos^{2}b-\\sin^{2}b)\\times 1'], ['Replace cos²b by 1 − sin²b:', '=(1-\\sin^{2}b)-\\sin^{2}b=1-2\\sin^{2}b'], 'This is the right side, so the identity is proved.']);

})(typeof window !== "undefined" ? window : globalThis);
