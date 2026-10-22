/* Class 10 Mathematics, Unit 7 (continued): identities 7.5 (last three), applications 7.6 and Review Exercise 7. Numbers are computed and checked against the printed answers. */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.sol) return;
  const warn = m => { if (root.console) console.warn('sol_m10_u7b: ' + m); };
  const f = (x, d) => String(+Number(x).toFixed(d === undefined ? 2 : d));
  const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI;
  const ok = (label, got, exp, tol) => { if (Math.abs(got - exp) > (tol === undefined ? 0.006 : tol)) { warn(label + ': computed ' + got + ' but the book prints ' + exp); return false; } return true; };
  const tx = (text, m) => ({ text, m });
  const add = (q, steps) => NS.sol.add({ q, steps });
  const S = Math.sin, C = Math.cos, T = Math.tan;

  /* ---------- 7.5 (remaining) ---------- */
  (function () {
    const g = y => [(S(y) + C(y)) / S(y) + (C(y) - S(y)) / C(y), 1 / (C(y) * S(y))];
    const a = g(rad(30));
    if (Math.abs(a[0] - a[1]) < 0.01) return warn('7.5 siny+cosy identity unexpectedly true');
    add('Prove (siny+cosy)/siny+(cosy−siny)/cosy=secy cosecy.', [
      'Write the left side over the common denominator sin y cos y.',
      tx('', '\\frac{\\sin y+\\cos y}{\\sin y}+\\frac{\\cos y-\\sin y}{\\cos y}=\\frac{(\\sin y+\\cos y)\\cos y+(\\cos y-\\sin y)\\sin y}{\\sin y\\cos y}'),
      tx('Expand the numerator:', '=\\frac{\\sin y\\cos y+\\cos^{2}y+\\sin y\\cos y-\\sin^{2}y}{\\sin y\\cos y}=\\frac{2\\sin y\\cos y+\\cos^{2}y-\\sin^{2}y}{\\sin y\\cos y}'),
      'Test the claim with y = 30°: sin 30° = 0.5 and cos 30° = 0.8660. The left side is (0.5 + 0.866)/0.5 + (0.866 − 0.5)/0.866 = ' + f(a[0], 3) + '.',
      'The right side is sec 30° · cosec 30° = 1/(0.866 × 0.5) = ' + f(a[1], 3) + '.',
      'The two sides differ (' + f(a[0], 3) + ' ≠ ' + f(a[1], 3) + '), so the statement is not an identity as printed in the book. The nearby true identity is (sin y)/(cos y) + (cos y)/(sin y) = sec y cosec y, which follows from putting both terms over sin y cos y and using sin²y + cos²y = 1.']);
  })();

  add('Prove (secx−tanx)²=(1−sinx)/(1+sinx).', [
    'Write secx − tanx in sines and cosines.', tx('', '\\sec x-\\tan x=\\frac{1}{\\cos x}-\\frac{\\sin x}{\\cos x}=\\frac{1-\\sin x}{\\cos x}'),
    tx('Square it:', '(\\sec x-\\tan x)^{2}=\\frac{(1-\\sin x)^{2}}{\\cos^{2}x}'), tx('Use cos²x = 1 − sin²x = (1 − sinx)(1 + sinx):', '=\\frac{(1-\\sin x)^{2}}{(1-\\sin x)(1+\\sin x)}=\\frac{1-\\sin x}{1+\\sin x}'), 'This is the right side, so the identity is proved.']);

  add('Prove sinx tanx+cosx=secx.', ['Write tanx as sinx / cosx.', tx('', '\\sin x\\tan x+\\cos x=\\frac{\\sin^{2}x}{\\cos x}+\\cos x=\\frac{\\sin^{2}x+\\cos^{2}x}{\\cos x}=\\frac{1}{\\cos x}=\\sec x'), 'This is the right side, so the identity is proved.']);

  /* ---------- 7.6 applications ---------- */
  (function () {
    const a = deg(Math.atan(21 / 25)); if (!ok('7.6 Q1', a, 40, 0.1)) return;
    add('A building 21 m tall casts a shadow 25 m long. Find the sun’s angle of elevation to the nearest degree.', ['Draw a right triangle: the building (21 m) is opposite the angle of elevation θ and the shadow (25 m) is adjacent to it.', tx('Use tan θ = opposite / adjacent:', '\\tan\\theta=\\frac{21}{25}=0.84'), tx('Take the inverse tangent:', '\\theta=\\tan^{-1}(0.84)\\approx ' + f(a, 2) + '^\\circ\\approx 40^\\circ')]);
  })();

  (function () {
    const d = 150 / Math.sqrt(3); if (!ok('7.6 Q2', d, 86.6, 0.05)) return;
    add('A lighthouse is 150 m above sea level. The angle of depression of a boat is 60°. Find the horizontal distance from the boat to the lighthouse.', ['The angle of depression from the lighthouse equals the angle of elevation of the lighthouse top from the boat (alternate angles), so the boat is at 60° from the horizontal in the right triangle: height 150 m is opposite, distance d is adjacent.', tx('tan 60° = opposite / adjacent:', '\\tan60^\\circ=\\frac{150}{d}'), tx('Solve for d (tan 60° = √3):', 'd=\\frac{150}{\\sqrt3}=\\frac{150\\sqrt3}{3}=50\\sqrt3\\approx ' + f(d, 1) + '\\text{ m}')]);
  })();

  (function () {
    const a = deg(Math.atan(0.5)); if (!ok('7.6 Q3', a, 26.6, 0.05)) return;
    add('A 50 m tree is observed from a point on the ground 100 m from its foot. Find the angle of elevation of its top.', ['The tree (50 m) is opposite the angle of elevation θ and the distance on the ground (100 m) is adjacent.', tx('tan θ = opposite / adjacent:', '\\tan\\theta=\\frac{50}{100}=0.5'), tx('', '\\theta=\\tan^{-1}(0.5)\\approx ' + f(a, 1) + '^\\circ')]);
  })();

  (function () {
    const d = 240 / Math.sqrt(3), rise = d * T(rad(30)), h = 240 - rise; if (!ok('7.6 Q4', h, 160, 1e-6)) return;
    add('From the top of a 240 m hill, the angles of depression of the top and bottom of a minaret are 30° and 60°. Find the minaret’s height.', [
      'The angle of depression to the bottom of the minaret is 60°. In the right triangle with the hill height 240 m opposite 60°, the horizontal distance d to the minaret is adjacent.', tx('', '\\tan60^\\circ=\\frac{240}{d}\\ \\Rightarrow\\ d=\\frac{240}{\\sqrt3}=80\\sqrt3\\approx ' + f(d, 2) + '\\text{ m}'),
      'The angle of depression to the top of the minaret is 30°. The drop from the hilltop to the minaret top is the side opposite 30° over the same horizontal distance d.', tx('', 'x=d\\tan30^\\circ=80\\sqrt3\\times\\frac{1}{\\sqrt3}=80\\text{ m}'),
      tx('The minaret is the hill height minus this drop:', 'h=240-80=160\\text{ m}')]);
  })();

  (function () {
    const d = 800 / T(rad(72)); if (!ok('7.6 Q5', d, 260, 0.5)) return;
    add('A police helicopter flies 800 ft above the ground. A car is sighted at an angle of depression of 72°. Find the horizontal distance from the car to the point directly below the helicopter, to the nearest foot.', ['The angle of depression equals the angle of elevation of the helicopter from the car, so the height 800 ft is opposite 72° and the horizontal distance d is adjacent.', tx('', '\\tan72^\\circ=\\frac{800}{d}'), tx('Solve for d:', 'd=\\frac{800}{\\tan72^\\circ}=\\frac{800}{' + f(T(rad(72)), 4) + '}\\approx ' + f(d, 0) + '\\text{ ft}')]);
  })();

  (function () {
    const x1 = 300 * Math.sqrt(3), x2 = 300, tot = x1 + x2; if (!ok('7.6 Q6', tot, 819.6, 0.05)) return;
    add('A lighthouse is 300 m above sea level. Two boats lie on opposite sides of its foot, with depression angles 30° and 45°. Find the distance between the boats.', ['Each boat forms a right triangle with the lighthouse: height 300 m is opposite the depression angle and the horizontal distance is adjacent.', tx('Boat with 30°:', '\\tan30^\\circ=\\frac{300}{x_1}\\ \\Rightarrow\\ x_1=300\\sqrt3\\approx ' + f(x1, 1) + '\\text{ m}'), tx('Boat with 45°:', '\\tan45^\\circ=\\frac{300}{x_2}\\ \\Rightarrow\\ x_2=300\\text{ m}'), tx('The boats are on opposite sides, so the distances add:', 'x_1+x_2=300\\sqrt3+300=300(\\sqrt3+1)\\approx ' + f(tot, 1) + '\\text{ m}')]);
  })();

  (function () {
    const h = 105 * (Math.sqrt(3) + 1); if (!ok('7.6 Q7', h, 286.9, 0.05)) return;
    add('The angle of elevation of the top of a cliff is 30°. After walking 210 m toward it, the angle is 45°. Find the cliff’s height.', [
      'Let h be the cliff height and x the horizontal distance from the nearer point to the foot.', tx('From the nearer point (45°):', '\\tan45^\\circ=\\frac{h}{x}\\ \\Rightarrow\\ x=h'), tx('From the farther point, which is x + 210 away (30°):', '\\tan30^\\circ=\\frac{h}{x+210}\\ \\Rightarrow\\ \\frac{1}{\\sqrt3}=\\frac{h}{h+210}'),
      tx('Cross-multiply and collect h:', 'h+210=\\sqrt3\\,h\\ \\Rightarrow\\ h(\\sqrt3-1)=210'), tx('Solve and rationalise:', 'h=\\frac{210}{\\sqrt3-1}=\\frac{210(\\sqrt3+1)}{2}=105(\\sqrt3+1)\\approx ' + f(h, 1) + '\\text{ m}')]);
  })();

  /* ---------- Review Exercise 7 ---------- */
  add('If an object is above the observer, the angle formed by the horizontal and the observer’s line of sight is called', ['An object above the observer is looked at along an upward line of sight.', 'The angle between the horizontal and an upward line of sight is the angle of elevation. (A downward line of sight would make the angle of depression.)']);
  add('cotθ = _____.', ['In a right triangle cot θ = adjacent / opposite.', tx('Since sin θ = opposite / hypotenuse and cos θ = adjacent / hypotenuse:', '\\cot\\theta=\\frac{\\text{adjacent}}{\\text{opposite}}=\\frac{\\cos\\theta}{\\sin\\theta}')]);
  add('1+tan²θ = _____.', ['Start from the basic identity sin²θ + cos²θ = 1 and divide every term by cos²θ.', tx('', '\\frac{\\sin^{2}\\theta}{\\cos^{2}\\theta}+\\frac{\\cos^{2}\\theta}{\\cos^{2}\\theta}=\\frac{1}{\\cos^{2}\\theta}\\ \\Rightarrow\\ \\tan^{2}\\theta+1=\\sec^{2}\\theta')]);
  add('If tanθ=1 and θ is in quadrant III, then sinθ=_____.', ['tan θ = 1 gives a reference angle of 45°.', 'In quadrant III the angle is 180° + 45° = 225°, and sine is negative there.', tx('', '\\sin225^\\circ=-\\sin45^\\circ=-\\frac{1}{\\sqrt2}')]);
  add('sin(−350°) lies in which quadrant?', ['Add one full turn to find a coterminal angle.', tx('', '-350^\\circ+360^\\circ=10^\\circ'), 'The angle 10° is between 0° and 90°, so it lies in quadrant I.']);
  add('45° equals how many radians?', ['Multiply by π/180.', tx('', '45^\\circ\\times\\frac{\\pi}{180}=\\frac{\\pi}{4}\\text{ radians}')]);

  (function () {
    const a = 5 * C(rad(58)); if (!ok('R7 adj', a, 2.6496, 0.0001)) return;
    add('A right triangle has hypotenuse 5 ft and ∠B=58°. Find the leg adjacent to ∠B.', ['The leg adjacent to ∠B and the hypotenuse are related by the cosine.', tx('cos B = adjacent / hypotenuse:', '\\cos58^\\circ=\\frac{a}{5}'), tx('Solve for a:', 'a=5\\cos58^\\circ=5\\times ' + f(C(rad(58)), 5) + '\\approx ' + f(a, 4) + '\\text{ ft}')]);
  })();

  add('In the printed right triangle, MN=8 cm, NP=21 cm and ∠P=20°. Find tanP to the nearest tenth.', ['The side opposite ∠P is MN = 8 and the side adjacent to ∠P is NP = 21.', tx('tan P = opposite / adjacent:', '\\tan P=\\frac{8}{21}=' + f(8 / 21, 4) + '\\approx 0.4'), 'Check: tan 20° = ' + f(T(rad(20)), 4) + ', which also rounds to 0.4.']);

  (function () {
    const rt = Math.sqrt(16 - 4); if (!ok('R7 RT', rt, 2 * Math.sqrt(3), 1e-9)) return;
    add('In right triangle RQS, RT is perpendicular to QS, QT=2, RQ=4, and RT=TS. Find RS.', ['RT is perpendicular to QS, so triangle RQT is a right triangle with hypotenuse RQ = 4.', tx('Pythagoras in triangle RQT:', 'RT^{2}=RQ^{2}-QT^{2}=16-4=12\\ \\Rightarrow\\ RT=2\\sqrt3'), 'Since RT = TS, we also have TS = 2√3.', tx('Pythagoras in triangle RTS (hypotenuse RS):', 'RS=\\sqrt{RT^{2}+TS^{2}}=\\sqrt{12+12}=\\sqrt{24}=2\\sqrt6')]);
  })();

  add('In the same diagram, RT is perpendicular to QS and RT=TS. Find ∠S.', ['Triangle RTS has a right angle at T and two equal legs RT = TS, so it is an isosceles right triangle.', 'Its two acute angles are equal and add up to 90°.', tx('', '\\angle S=\\frac{90^\\circ}{2}=45^\\circ')]);

  (function () {
    const d = 45 + 35 / 60 + 30 / 3600; if (!ok('R7 dec', d, 45.5917, 0.0001)) return;
    add('Convert 45°35′30″ to decimal form.', ['D° M′ S″ = D + M/60 + S/3600.', tx('', '45+\\frac{35}{60}+\\frac{30}{3600}=45+0.5833+0.0083=' + f(d, 4) + '^\\circ')]);
  })();

  add('Convert 216.67° to D°M′S″ form.', ['Keep 216°. Multiply the decimal part by 60 to get minutes.', tx('', '0.67\\times 60=40.2\\ \\Rightarrow\\ 40\\text{ minutes}'), 'Multiply the remaining 0.2′ by 60 to get seconds.', tx('', '0.2\\times 60=12\\text{ seconds}\\ \\Rightarrow\\ 216.67^\\circ=216^\\circ 40^\\prime 12^{\\prime\\prime}')]);
  add('Through how many radians does a minute hand turn in (i) 45 minutes; (ii) one hour?', ['The minute hand makes a full turn, 2π radians, in 60 minutes.', tx('(i) 45 minutes is 45/60 of a turn:', '\\frac{45}{60}\\times 2\\pi=\\frac{3}{4}\\times 2\\pi=\\frac{3\\pi}{2}\\text{ radians}'), tx('(ii) One hour is a full turn:', '2\\pi\\text{ radians}'), 'The hand turns clockwise, so the angles are really negative: −3π/2 and −2π. The book gives the sizes.']);
  add('Find coterminal angles for 190° and −250°.', ['Add and subtract 360° to get coterminal angles.', tx('190°:', '190^\\circ+360^\\circ=550^\\circ,\\quad 190^\\circ-360^\\circ=-170^\\circ'), tx('−250°:', '-250^\\circ+360^\\circ=110^\\circ,\\quad -250^\\circ-360^\\circ=-610^\\circ')]);

  add('Find the six trigonometric ratios of (i) 390°; (ii) −240°.', [
    tx('(i) 390° is one full turn plus 30°:', '390^\\circ-360^\\circ=30^\\circ'), tx('So the ratios are those of 30°, all positive (quadrant I):', '\\sin=\\frac{1}{2},\\ \\cos=\\frac{\\sqrt3}{2},\\ \\tan=\\frac{1}{\\sqrt3},\\ \\csc=2,\\ \\sec=\\frac{2}{\\sqrt3},\\ \\cot=\\sqrt3'),
    tx('(ii) −240° is coterminal with 120°, in quadrant II (reference angle 60°):', '-240^\\circ+360^\\circ=120^\\circ'), tx('Sin and cosec are positive in II; the others are negative:', '\\sin=\\frac{\\sqrt3}{2},\\ \\cos=-\\frac{1}{2},\\ \\tan=-\\sqrt3,\\ \\csc=\\frac{2}{\\sqrt3},\\ \\sec=-2,\\ \\cot=-\\frac{1}{\\sqrt3}')]);

  add('Prove: (i) √((1−sinθ)/(1+sinθ))=secθ−tanθ; (ii) 2cosθ secθ−tanθ cotθ=1.', [
    'Part (i): multiply the top and bottom of the fraction under the root by (1 − sinθ).', tx('', '\\sqrt{\\frac{1-\\sin\\theta}{1+\\sin\\theta}}=\\sqrt{\\frac{(1-\\sin\\theta)^{2}}{(1+\\sin\\theta)(1-\\sin\\theta)}}=\\sqrt{\\frac{(1-\\sin\\theta)^{2}}{\\cos^{2}\\theta}}=\\frac{1-\\sin\\theta}{\\cos\\theta}'),
    tx('Split the fraction:', '=\\frac{1}{\\cos\\theta}-\\frac{\\sin\\theta}{\\cos\\theta}=\\sec\\theta-\\tan\\theta'), 'The root is positive for an acute angle, so part (i) is proved.',
    'Part (ii): cos θ sec θ = 1 and tan θ cot θ = 1.', tx('', '2\\cos\\theta\\sec\\theta-\\tan\\theta\\cot\\theta=2\\times 1-1=1'), 'This is the right side, so part (ii) is proved.']);

  add('If secθ=2 and θ is not in quadrant I, find the remaining trigonometric ratios.', [
    tx('Since secθ = 2 is positive, cosθ is positive:', '\\cos\\theta=\\frac{1}{2}'), 'Cosine is positive in quadrants I and IV. θ is not in quadrant I, so θ is in quadrant IV.', tx('Find sin θ:', '\\sin^{2}\\theta=1-\\frac{1}{4}=\\frac{3}{4}\\ \\Rightarrow\\ \\sin\\theta=-\\frac{\\sqrt3}{2}\\ (\\text{negative in IV})'),
    tx('', '\\tan\\theta=\\frac{-\\sqrt3/2}{1/2}=-\\sqrt3,\\quad \\cot\\theta=-\\frac{1}{\\sqrt3},\\quad \\csc\\theta=-\\frac{2}{\\sqrt3}')]);

  (function () {
    const h = 85 * T(rad(26.5)) + 1.6; if (!ok('R7 bldg', h, 44.0, 0.05)) return;
    add('From a point 85 m from a building, the angle of elevation to its top is 26.5°. The observer’s eye is 1.6 m above the ground. Find the building’s height.', ['The right triangle starts at the observer’s eye. The horizontal distance 85 m is adjacent to the angle and the height x above eye level is opposite.', tx('tan 26.5° = x / 85:', 'x=85\\tan26.5^\\circ=85\\times ' + f(T(rad(26.5)), 5) + '\\approx ' + f(85 * T(rad(26.5)), 2) + '\\text{ m}'), tx('Add the eye height to get the building height:', 'h=x+1.6\\approx ' + f(h, 1) + '\\text{ m}')]);
  })();

  (function () {
    const h = 125 * T(rad(57.2)); if (!ok('R7 tower', h, 194, 0.5)) return;
    add('From level ground 125 ft from a tower, the angle of elevation is 57.2°. Approximate the tower’s height to the nearest foot.', ['The tower height h is opposite the 57.2° angle and the ground distance 125 ft is adjacent.', tx('tan 57.2° = h / 125:', 'h=125\\tan57.2^\\circ=125\\times ' + f(T(rad(57.2)), 4) + '\\approx ' + f(h, 0) + '\\text{ ft}')]);
  })();
})(typeof window !== 'undefined' ? window : globalThis);
