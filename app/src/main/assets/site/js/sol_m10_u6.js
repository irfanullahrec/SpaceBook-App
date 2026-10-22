/* Class 10 Mathematics, Unit 6 "Basic Statistics": hand-written worked solutions (Exercises 6.1-6.4 and Review Exercise 6).
 * Every number is computed from the data in the question and compared with the book's printed answer (SBSOL_STATS.check). */
(function (root) {
  'use strict';
  const S = root.SBSOL_STATS; if (!S) return;
  const { sum, mean, median, modes, gm, hm, varPop, f, list, cnt, check, histogram, polygonLayer, ogive, barChart, add, sorted } = S;
  const sd = a => Math.sqrt(varPop(a));
  const lim = (lo, hi) => lo + '–' + hi;
  /* grouped table from integer class limits: returns { rows:[{lo,hi,f,vals,lb,ub,mark}], total } */
  function table(data, classes) {
    const rows = classes.map(c => { const vals = sorted(cnt(data, c[0], c[1])); return { lo: c[0], hi: c[1], f: vals.length, vals, lb: c[0] - 0.5, ub: c[1] + 0.5, mark: (c[0] + c[1]) / 2 }; });
    return { rows, total: sum(rows.map(r => r.f)) };
  }
  const series = (a, b, step) => { const o = []; for (let x = a; x <= b; x += step) o.push([x, x + step - 1]); return o; };
  const cfOf = fr => { let c = 0; return fr.map(x => (c += x)); };
  const tallyStep = t => 'Tally each value into its class. ' + t.rows.map(r => lim(r.lo, r.hi) + ': ' + (r.vals.length ? list(r.vals) : 'none') + ', so f = ' + r.f).join('; ') + '.';
  const bounds = t => t.rows.map(r => [r.lb, r.ub]);

  /* ---------- Exercise 6.1 ---------- */
  (function () {
    const q = 'Marks of 30 students: 40,60,65,70,35,50,56,74,72,49,85,76,82,83,68,90,67,66,58,46,74,88,76,69,57,63,66,47,82,90.';
    const data = [40, 60, 65, 70, 35, 50, 56, 74, 72, 49, 85, 76, 82, 83, 68, 90, 67, 66, 58, 46, 74, 88, 76, 69, 57, 63, 66, 47, 82, 90];
    const t = table(data, series(30, 90, 10));
    if (!check('6.1 Q1', 'f', t.rows.map(r => r.f), [1, 4, 4, 8, 6, 5, 2]) || t.total !== 30) return;
    add(q, [
      'The marks go from ' + Math.min.apply(null, data) + ' to ' + Math.max.apply(null, data) + '. With class interval 10, start at 30 and use the classes ' + t.rows.map(r => lim(r.lo, r.hi)).join(', ') + '.',
      tallyStep(t),
      'Class boundaries lie half a unit outside the limits: lower boundary = lower limit − 0.5 and upper boundary = upper limit + 0.5. ' + t.rows.map(r => lim(r.lo, r.hi) + ' → ' + r.lb + '–' + r.ub).join('; ') + '.',
      'Class mark x = (lower limit + upper limit)/2. ' + t.rows.map(r => 'x = (' + r.lo + '+' + r.hi + ')/2 = ' + r.mark).join('; ') + '.',
      'Check: Σf = ' + t.rows.map(r => r.f).join('+') + ' = ' + t.total + ', the number of students.',
      'The histogram on the board shows these frequencies as adjacent bars on the class boundaries.'], histogram(bounds(t), t.rows.map(r => r.f), 5, { alt: 'Histogram of the marks' }));
  })();

  (function () {
    const q = 'Essay mistakes: 4,7,12,9,21,16,3,19,17,24,14,15,8,13,11,16,15,6,5,8,11,20,18,22,6.';
    const data = [4, 7, 12, 9, 21, 16, 3, 19, 17, 24, 14, 15, 8, 13, 11, 16, 15, 6, 5, 8, 11, 20, 18, 22, 6];
    const t = table(data, series(0, 20, 5));
    if (!check('6.1 Q2', 'f', t.rows.map(r => r.f), [2, 7, 5, 7, 4]) || t.total !== 25) return;
    add('Essay mistakes: 4,7,12,9,21,16,3,19,17,24,14,15,8,13,11,16,15,6,5,8,11,20,18,22,6. Make a suitable frequency table', [
      'There are ' + data.length + ' values from ' + Math.min.apply(null, data) + ' to ' + Math.max.apply(null, data) + '. Range = ' + Math.max.apply(null, data) + ' − ' + Math.min.apply(null, data) + ' = ' + (Math.max.apply(null, data) - Math.min.apply(null, data)) + '. A class width of 5 gives a convenient number of classes.',
      'Number of classes = range / width ≈ 21/5, so use 5 classes: ' + t.rows.map(r => lim(r.lo, r.hi)).join(', ') + '.',
      tallyStep(t), 'Check: Σf = ' + t.rows.map(r => r.f).join('+') + ' = ' + t.total + '. The table has 5 classes.'], histogram(bounds(t), t.rows.map(r => r.f), 2, { alt: 'Histogram of essay mistakes' }));
  })();

  (function () {
    const cls = series(20, 50, 5).slice(0, 7), fr = [1, 3, 4, 5, 4, 2, 1], b = cls.map(c => [c[0] - 0.5, c[1] + 0.5]);
    add('Draw a histogram: classes 20–24,25–29,30–34,35–39,40–44,45–49,50–54; frequencies 1,3,4,5,4,2,1.', [
      'A histogram has no gaps: use the class boundaries. ' + cls.map((c, i) => lim(c[0], c[1]) + ' → ' + b[i][0] + '–' + b[i][1]).join('; ') + '.',
      'Draw the x-axis for the boundaries 19.5 to 54.5 and the y-axis for frequencies 0 to 5.',
      'Draw a bar over each class with the height of its frequency: ' + cls.map((c, i) => lim(c[0], c[1]) + ': height ' + fr[i]).join('; ') + '.'], histogram(b, fr, 2, { alt: 'Histogram' }));
  })();

  (function () {
    const data = [25, 30, 32, 29, 24, 40, 36, 37, 28, 27, 41, 42, 35, 39, 31, 32, 34, 42, 40, 43, 36, 26, 22, 23, 42, 39, 35, 41, 39, 29];
    const t = table(data, series(20, 40, 5));
    if (!check('6.1 Q4', 'f', t.rows.map(r => r.f), [3, 6, 5, 8, 8]) || t.total !== 30) return;
    const cfg = histogram(bounds(t), t.rows.map(r => r.f), 3, { alt: 'Histogram and frequency polygon of the weights' });
    cfg.layers.push(polygonLayer(t.rows.map(r => r.mark), t.rows.map(r => r.f), 5, 4));
    cfg.xmin = 12; cfg.xmax = 50;
    add('Weights (kg): 25,30,32,29,24,40,36,37,28,27,41,42,35,39,31,32,34,42,40,43,36,26,22,23,42,39,35,41,39,29.', [
      'The weights run from 22 to 43. Class width 5 gives the classes ' + t.rows.map(r => lim(r.lo, r.hi)).join(', ') + '.',
      tallyStep(t),
      'Class marks: ' + t.rows.map(r => 'x = (' + r.lo + '+' + r.hi + ')/2 = ' + r.mark).join('; ') + '. Check: Σf = ' + t.rows.map(r => r.f).join('+') + ' = ' + t.total + '.',
      'Histogram: draw a bar on each class boundary pair (' + t.rows.map(r => r.lb + '–' + r.ub).join(', ') + ') with the height f.',
      'Frequency polygon: plot (class mark, frequency) = ' + t.rows.map(r => '(' + r.mark + ',' + r.f + ')').join(', ') + ', join the points with straight lines, and close the polygon on the x-axis at 17 and 47 (one class mark beyond each end).'], cfg);
  })();

  (function () {
    const data = [4, 4, 6, 3, 1, 2, 2, 3, 1, 4, 1, 2, 5, 3, 4, 5, 2, 2, 3, 1, 3, 1, 2, 2, 3, 1, 4, 2, 6, 2];
    const vals = [1, 2, 3, 4, 5, 6], fr = vals.map(v => data.filter(x => x === v).length);
    if (!check('6.1 Q5', 'f', fr, [6, 9, 6, 5, 2, 2]) || sum(fr) !== 30) return;
    add('Homework hours: 4,4,6,3,1,2,2,3,1,4,1,2,5,3,4,5,2,2,3,1,3,1,2,2,3,1,4,2,6,2. Make a frequency table and histogram.', [
      'The data are whole numbers from 1 to 6, so each hour value is its own class. Count how many times each occurs.',
      vals.map((v, i) => v + ' hour' + (v > 1 ? 's' : '') + ': tally ' + data.filter(x => x === v).length + ', so f = ' + fr[i]).join('; ') + '.',
      'Check: Σf = ' + fr.join('+') + ' = ' + sum(fr) + ', the number of students.',
      'Histogram: the class for 1 hour has boundaries 0.5–1.5, for 2 hours 1.5–2.5, and so on. Draw a bar of height f over each.'], histogram(vals.map(v => [v - 0.5, v + 0.5]), fr, 3, { alt: 'Histogram of homework hours' }));
  })();

  (function () {
    add('Survey classmates on how many minutes they take to get ready for school', [
      'This activity uses your own survey, so your numbers will differ. The method is always the same.',
      'Step 1: ask about 20 classmates and write the minutes down, for example 15, 20, 25, 30, 20, 35 and so on.',
      'Step 2: find the range = largest − smallest, then choose a class width (for example 5) so that you get about 5 to 8 classes.',
      'Step 3: write the classes, tally every response, and count the frequency f of each class.',
      'Step 4: check that Σf equals the number of classmates you asked, then add the class boundaries and class marks if needed.']);
  })();

  /* ---------- Exercise 6.2 (cumulative frequency) ---------- */
  (function () {
    const data = [60, 75, 80, 85, 90, 84, 70, 73, 76, 84, 95, 100, 150, 66, 58, 90, 98, 120, 77, 90];
    const t = table(data, series(50, 150, 10)), fr = t.rows.map(r => r.f), cf = cfOf(fr);
    if (!check('6.2 Q1', 'f', fr, [1, 2, 5, 4, 5, 1, 0, 1, 0, 0, 1]) || !check('6.2 Q1', 'c.f.', cf, [1, 3, 8, 12, 17, 18, 18, 19, 19, 19, 20])) return;
    const pts = [[49.5, 0]].concat(t.rows.map((r, i) => [r.ub, cf[i]]));
    add('Wages (Rs.): 60,75,80,85,90,84,70,73,76,84,95,100,150,66,58,90,98,120,77,90. Use class interval 10; make a cumulative table and polygon.', [
      'Use class interval 10 from 50: ' + t.rows.map(r => lim(r.lo, r.hi)).join(', ') + '.',
      'Tally the wages: ' + t.rows.map(r => lim(r.lo, r.hi) + ' f = ' + r.f).join('; ') + '.',
      'Cumulative frequency = running total of f: ' + fr.map((x, i) => (i ? cf[i - 1] + ' + ' + x + ' = ' : '') + cf[i]).join('; ') + '. The last value is ' + cf[cf.length - 1] + ', the number of wages.',
      'Ogive: plot (upper class boundary, c.f.) = ' + pts.slice(1).map(p => '(' + p[0] + ',' + p[1] + ')').join(', ') + ', starting from (49.5, 0), and join the points.'], ogive(pts, 3, { alt: 'Cumulative frequency polygon of the wages' }));
  })();

  (function () {
    const cls = ['20–24', '25–29', '30–39', '40–44', '45–49', '50–54', '55–59'], fr = [1, 2, 26, 22, 20, 15, 14], cf = cfOf(fr);
    if (!check('6.2 Q2', 'c.f.', cf, [1, 3, 29, 51, 71, 86, 100])) return;
    add('Age classes 20–24,25–29,30–39,40–44,45–49,50–54,55–59 have frequencies 1,2,26,22,20,15,14.', [
      'Add each frequency to the running total of the classes before it.',
      cls.map((c, i) => c + ': ' + (i ? cf[i - 1] + ' + ' + fr[i] + ' = ' : 'c.f. = ') + cf[i]).join('; ') + '.',
      'The last cumulative frequency is ' + cf[cf.length - 1] + ' = Σf = ' + fr.join('+') + ', so the table is complete. (The class 30–39 is printed with width 10 in the book; it is used as printed.)']);
  })();

  (function () {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], r = [70, 40, 30, 35, 50, 55, 80], cf = cfOf(r);
    if (!check('6.2 Q3', 'c.f.', cf, [70, 110, 140, 175, 225, 280, 360])) return;
    add('Rainfall (mm): Sun 70, Mon 40, Tue 30, Wed 35, Thu 50, Fri 55, Sat 80. Draw a cumulative frequency graph.', [
      'Cumulative rainfall is the running total of the daily values: ' + days.map((d, i) => d + ': ' + (i ? cf[i - 1] + ' + ' + r[i] + ' = ' : '') + cf[i]).join('; ') + '.',
      'Plot the points (day number, cumulative rainfall) = ' + cf.map((c, i) => '(' + (i + 1) + ',' + c + ')').join(', ') + ' and join them with straight lines. The graph never goes down because rainfall cannot be negative.'],
      ogive(cf.map((c, i) => [i + 1, c]), 1, { alt: 'Cumulative rainfall graph' }));
  })();

  (function () {
    const fr = [1, 2, 3, 4, 5, 6], lt = cfOf(fr), mt = []; let tot = sum(fr); fr.forEach(x => { mt.push(tot); tot -= x; }); mt.push(0);
    if (!check('6.2 Q4', 'less-than', lt, [1, 3, 6, 10, 15, 21]) || !check('6.2 Q4', 'more-than', mt, [21, 20, 18, 15, 11, 6, 0])) return;
    const lb = [39.5, 49.5, 59.5, 69.5, 79.5, 89.5, 99.5];
    const cfg = ogive([[39.5, 0]].concat(lt.map((c, i) => [lb[i + 1], c])), 3, { alt: 'Less-than and more-than ogives', color: 'green' });
    cfg.layers.push({ at: 4, type: 'poly', color: 'orange', points: mt.map((c, i) => [lb[i], c]) });
    cfg.xmin = 30; cfg.xmax = 110;
    add('For marks classes 40–49,50–59,60–69,70–79,80–89,90–99 with frequencies 1,2,3,4,5,6, draw less-than and more-than cumulative polygons.', [
      'Class boundaries: 39.5, 49.5, 59.5, 69.5, 79.5, 89.5, 99.5.',
      'Less-than cumulative frequency (marks below each upper boundary): ' + lt.map((c, i) => 'below ' + lb[i + 1] + ': ' + c).join('; ') + '.',
      'More-than cumulative frequency (marks above each lower boundary): ' + mt.map((c, i) => 'above ' + lb[i] + ': ' + c).join('; ') + '.',
      'Plot the less-than points (upper boundary, c.f.) and join them: this is the rising ogive.',
      'Plot the more-than points (lower boundary, c.f.) and join them: this is the falling ogive. The two curves cross near the median.'], cfg);
  })();

  (function () {
    const lt = [0, 1, 3, 6, 10, 15, 21];
    if (lt[6] - lt[1] !== 20 || lt[3] !== 6 || lt[3] - lt[1] !== 5) return;
    add('Using Q4, find students scoring more than 50, less than 70, between 50 and 70; class interval; lower boundary of class 5.', [
      'From Q4: frequencies 1,2,3,4,5,6 for the classes 40–49, 50–59, 60–69, 70–79, 80–89, 90–99 (total 21).',
      'More than 50: the classes 50–59 up to 90–99 hold 21 − 1 = 20 students (the book counts every student from the class 50–59 upward).',
      'Less than 70: the classes 40–49, 50–59 and 60–69 hold 1 + 2 + 3 = 6 students.',
      'Between 50 and 70: the classes 50–59 and 60–69 hold 2 + 3 = 5 students.',
      'Class interval = difference between the upper boundaries of consecutive classes = 59.5 − 49.5 = 10.',
      'The fifth class is 80–89, so its lower boundary is 80 − 0.5 = 79.5.',
      'Note: “more than 50” cuts through the class 50–59, so an exact count is not available from grouped data; 20 is the book’s intended reading.']);
  })();

  (function () {
    const fr = [3, 5, 12, 9, 5, 4, 2], cf = cfOf(fr), ub = [5000.5, 6000.5, 7000.5, 8000.5, 9000.5, 10000.5, 11000.5];
    if (!check('6.2 Q6', 'c.f.', cf, [3, 8, 20, 29, 34, 38, 40])) return;
    const pts = [[3999.5, 0]].concat(cf.map((c, i) => [ub[i], c]));
    add('Salary classes Rs.4000–5000,5001–6000,6001–7000,7001–8000,8001–9000,9001–10000,10001–11000 have frequencies 3,5,12,9,5,4,2. Construct an ogive.', [
      'The classes touch at their boundaries 3999.5, 5000.5, 6000.5, …, 11000.5 (the limits are written 4000–5000, 5001–6000, and so on).',
      'Cumulative frequency: ' + fr.map((x, i) => (i ? cf[i - 1] + ' + ' + x + ' = ' : '') + cf[i]).join('; ') + '. The last value is ' + cf[6] + ', the total number of workers.',
      'Plot (upper boundary, c.f.) = ' + pts.map(p => '(' + p[0] + ',' + p[1] + ')').join(', ') + ' and join the points with straight lines: this is the ogive.'], ogive(pts, 2, { alt: 'Salary ogive' }));
  })();

  /* ---------- Exercise 6.3 (averages) ---------- */
  (function () {
    const d = [45, 30, 25, 36, 42, 27, 31, 43, 49, 50], s = sum(d), m = s / d.length;
    if (!check('6.3 Q1', 'mean', m, 37.8)) return;
    add('Weights (kg) 45,30,25,36,42,27,31,43,49,50. Find the mean.', ['Mean = (sum of the values) / (number of values).', 'Σx = ' + d.join(' + ') + ' = ' + s + '; n = ' + d.length + '.', 'Mean = Σx / n = ' + s + ' / ' + d.length + ' = ' + f(m, 1) + ' kg.']);
  })();

  (function () {
    const d = [45, 30, 25, 36, 42, 27, 31, 43, 49, 50], a = 36, dd = d.map(x => x - a), sd0 = sum(dd);
    if (sd0 !== 18 || !check('6.3 Q2', 'mean', a + sd0 / d.length, 37.8)) return;
    add('Find the mean in Q1 by the short-cut method.', ['Short-cut (assumed mean) method: choose an assumed mean a, find the deviations d = x − a, then Mean = a + Σd / n. Take a = 36.',
      'd = x − 36: ' + d.map((x, i) => x + '−36 = ' + dd[i]).join('; ') + '.', 'Σd = ' + dd.join(' + ') + ' = ' + sd0 + '.', 'Mean = a + Σd / n = 36 + ' + sd0 + ' / ' + d.length + ' = 36 + ' + f(sd0 / d.length, 1) + ' = ' + f(a + sd0 / d.length, 1) + ' kg, the same as in Q1.']);
  })();

  (function () {
    const d = [1242, 1248, 1252, 1244, 1249], a = 1248, dd = d.map(x => x - a), s0 = sum(dd);
    if (s0 !== -5 || !check('6.3 Q3', 'mean', a + s0 / d.length, 1247)) return;
    add('Using an assumed mean, find the mean of 1242,1248,1252,1244,1249.', ['Take the assumed mean a = 1248 (a value near the middle of the data). Then d = x − a.', 'd = ' + d.map((x, i) => x + '−1248 = ' + dd[i]).join('; ') + '.',
      'Σd = ' + dd.join(' + ') + ' = ' + s0 + '.', 'Mean = a + Σd / n = 1248 + (' + s0 + ') / ' + d.length + ' = 1248 − 1 = ' + (a + s0 / d.length) + '.']);
  })();

  (function () {
    const cls = ['0–15', '16–31', '32–47', '48–63', '64–75'], x = [7.5, 23.5, 39.5, 55.5, 69.5], fr = [0, 10, 40, 70, 45], fx = fr.map((v, i) => v * x[i]), N = sum(fr), m = sum(fx) / N;
    if (!check('6.3 Q4', 'Σfx', sum(fx), 8827.5) || N !== 165 || !check('6.3 Q4', 'mean', m, 53.5)) return;
    add('Scores (out of 75): classes 0–15,16–31,32–47,48–63,64–75; f=0,10,40,70,45. Find the mean.', ['For a grouped table use the class mark x of each class: x = (lower + upper)/2. ' + cls.map((c, i) => c + ': x = ' + x[i]).join('; ') + '.',
      'Multiply each frequency by its class mark: ' + cls.map((c, i) => 'f·x = ' + fr[i] + '×' + x[i] + ' = ' + f(fx[i], 1)).join('; ') + '.',
      'Σf = ' + fr.join(' + ') + ' = ' + N + '; Σ(f·x) = ' + fx.map(v => f(v, 1)).join(' + ') + ' = ' + f(sum(fx), 1) + '.', 'Mean = Σ(f·x) / Σf = ' + f(sum(fx), 1) + ' / ' + N + ' = ' + f(m, 1) + '.']);
  })();

  (function () {
    const h = [64, 65, 65, 66, 66, 67];
    if (median(h) !== 65.5) return;
    add('Find the median of heights 64,65,65,66,66,67 inches.', ['The median is the middle value of the ordered data. The values are already in order and n = 6 (even), so the median is the mean of the 3rd and 4th values.', 'Median = (65 + 66) / 2 = ' + median(h) + ' inches.']);
  })();

  (function () {
    const s = [7000, 6600, 8000, 4500, 7500, 11000, 9000, 7500], o = sorted(s);
    if (median(s) !== 7500) return;
    add('Find the median of salaries Rs.7000,6600,8000,4500,7500,11000,9000,7500.', ['Arrange the values in order: ' + o.join(', ') + '. There are ' + s.length + ' values (the book says 9 workers but lists 8; the listed data are used).',
      'n = 8 is even, so the median is the mean of the 4th and 5th values: (' + o[3] + ' + ' + o[4] + ') / 2 = ' + median(s) + '.', 'Median salary = Rs.' + median(s) + '.']);
  })();

  (function () {
    const d = [58, 59, 60, 62, 64, 64, 65, 67, 67, 68, 70, 71, 71, 71, 73], n = d.length, am = mean(d), g = gm(d);
    if (!check('6.3 Q6', 'A.M.', am, 66) || !check('6.3 Q6', 'G.M.', g, 65.84) || median(d) !== 67 || modes(d)[0] !== 71) return;
    add('For 58,59,60,62,64,64,65,67,67,68,70,71,71,71,73, find A.M., G.M., median and mode.', [
      'Arithmetic mean: Σx = ' + sum(d) + ' and n = ' + n + ', so A.M. = ' + sum(d) + ' / ' + n + ' = ' + am + '.',
      'Geometric mean: G.M. = (x₁·x₂·…·x₁₅)^(1/15). With logarithms: log G.M. = Σ(log x) / n = ' + f(sum(d.map(Math.log10)), 4) + ' / ' + n + ' = ' + f(sum(d.map(Math.log10)) / n, 4) + ', so G.M. = ' + f(g, 2) + '.',
      'Median: n = 15 is odd, so the median is the 8th value of the ordered data = ' + median(d) + '.', 'Mode: the most frequent value is 71 (it occurs 3 times).']);
  })();

  (function () {
    const d = [148, 145, 160, 157, 156, 160], m = mean(d), md = median(d), mo = modes(d)[0];
    if (!check('6.3 Q7', 'mean', m, 154.33) || md !== 156.5 || mo !== 160) return;
    add('For 148,145,160,157,156,160, show Mode>Median>Mean.', ['Mean = Σx / n = ' + sum(d) + ' / ' + d.length + ' = ' + f(m, 2) + '.', 'Median: ordered data ' + sorted(d).join(', ') + '; n = 6, so median = (156 + 157) / 2 = ' + md + '.',
      'Mode: 160 occurs twice, more than any other value, so mode = ' + mo + '.', 'Compare: ' + mo + ' > ' + md + ' > ' + f(m, 2) + ', so Mode > Median > Mean.']);
  })();

  (function () {
    const cls = ['112–116', '117–121', '122–126', '127–131', '132–136'], x = [114, 119, 124, 129, 134], fr = [3, 20, 11, 4, 5], n = sum(fr), cf = cfOf(fr);
    const med = 116.5 + (n / 2 - cf[0]) / fr[1] * 5, mode = 116.5 + (fr[1] - fr[0]) / (2 * fr[1] - fr[0] - fr[2]) * 5;
    const H = n / sum(fr.map((v, i) => v / x[i])), G = Math.exp(sum(fr.map((v, i) => v * Math.log(x[i]))) / n);
    if (!check('6.3 Q8', 'median', med, 121.13) || !check('6.3 Q8', 'mode', mode, 119.77) || !check('6.3 Q8', 'H.M.', H, 122.36) || !check('6.3 Q8', 'G.M.', G, 122.48)) return;
    add('Wage classes 112–116,117–121,122–126,127–131,132–136 have f=3,20,11,4,5. Construct a table, find class boundaries, median, mode, H.M. and G.M.', [
      'Class boundaries (limits ∓ 0.5): ' + cls.map((c, i) => c + ' → ' + (112 + 5 * i - 0.5) + '–' + (116 + 5 * i + 0.5)).join('; ') + '. Class marks x = ' + x.join(', ') + '. Σf = n = ' + n + '.',
      'Cumulative frequencies: ' + cf.join(', ') + '. n/2 = ' + n + '/2 = ' + n / 2 + ', so the median class is 117–121 (c.f. reaches 21.5 there).',
      'Median = l + (n/2 − c.f.) / f × h = 116.5 + (' + n / 2 + ' − ' + cf[0] + ') / ' + fr[1] + ' × 5 = 116.5 + ' + f((n / 2 - cf[0]) / fr[1] * 5, 3) + ' = ' + f(med, 2) + '.',
      'Mode: the modal class is 117–121 (largest f = 20). Mode = l + (f₁ − f₀) / (2f₁ − f₀ − f₂) × h = 116.5 + (20 − 3) / (40 − 3 − 11) × 5 = 116.5 + ' + f(17 / 26 * 5, 3) + ' = ' + f(mode, 2) + '.',
      'H.M. = n / Σ(f/x) = ' + n + ' / ' + f(sum(fr.map((v, i) => v / x[i])), 5) + ' = ' + f(H, 2) + '.', 'G.M.: log G.M. = Σ(f·log x) / n = ' + f(sum(fr.map((v, i) => v * Math.log10(x[i]))), 4) + ' / ' + n + ' = ' + f(sum(fr.map((v, i) => v * Math.log10(x[i]))) / n, 4) + ', so G.M. = ' + f(G, 2) + '.']);
  })();

  (function () {
    const fr = [1, 3, 7, 12, 2], n = sum(fr), cf = cfOf(fr), ub = [14.5, 19.5, 24.5, 29.5, 34.5];
    const interp = (target) => { let k = cf.findIndex(c => c >= target); const lo = k ? cf[k - 1] : 0, l = ub[k] - 5; return l + (target - lo) / fr[k] * 5; };
    const med = interp(n / 2), q1 = interp(n / 4), q3 = interp(3 * n / 4), mode = 24.5 + (12 - 7) / (24 - 7 - 2) * 5;
    if (!check('6.3 Q9', 'median', med, 25.13) || !check('6.3 Q9', 'Q1', q1, 21.11) || !check('6.3 Q9', 'Q3', q3, 27.73) || !check('6.3 Q9', 'mode', mode, 26.17)) return;
    const cfg = ogive([[9.5, 0]].concat(cf.map((c, i) => [ub[i], c])), 2, { alt: 'Ogive with the median and quartiles' });
    cfg.layers.push({ at: 3, type: 'point', x: med, y: n / 2, label: 'median ' + f(med, 2), color: 'orange', dx: 8, dy: 14 }, { at: 3, type: 'point', x: q1, y: n / 4, label: 'Q₁ ' + f(q1, 2), color: 'purple', dx: 8, dy: 14 }, { at: 3, type: 'point', x: q3, y: 3 * n / 4, label: 'Q₃ ' + f(q3, 2), color: 'purple', dx: -70, dy: -6 });
    add('Classes 10–14,15–19,20–24,25–29,30–34 have frequencies 1,3,7,12,2. Estimate median, Q₁, Q₃ and mode graphically.', [
      'Class boundaries 9.5, 14.5, 19.5, 24.5, 29.5, 34.5; n = Σf = ' + n + '. Cumulative frequencies (at the upper boundaries 14.5 to 34.5): ' + cf.join(', ') + '.',
      'Draw the ogive through (9.5, 0) and (upper boundary, c.f.). Read the median at c.f. = n/2 = ' + n / 2 + ', Q₁ at n/4 = ' + n / 4 + ' and Q₃ at 3n/4 = ' + 3 * n / 4 + '.',
      'Median: 12.5 lies between c.f. 11 (at 24.5) and 23 (at 29.5): 24.5 + (12.5 − 11) / 12 × 5 = ' + f(med, 2) + '. Q₁: 6.25 lies between 4 (at 19.5) and 11 (at 24.5): 19.5 + (6.25 − 4) / 7 × 5 = ' + f(q1, 2) + '. Q₃: 18.75 lies between 11 and 23: 24.5 + (18.75 − 11) / 12 × 5 = ' + f(q3, 2) + '.',
      'The values read off the ogive are marked on the board. Mode: the highest bar is 25–29 (f = 12). Mode = 24.5 + (12 − 7) / (2·12 − 7 − 2) × 5 = 24.5 + ' + f(5 / 15 * 5, 3) + ' = ' + f(mode, 2) + '.'], cfg);
  })();

  /* ---------- Exercise 6.4 (dispersion) ---------- */
  add('Find the range of 11,13,15,21,19,23.', ['Range = largest value − smallest value.', 'Largest = 23 and smallest = 11.', 'Range = 23 − 11 = 12.']);

  (function () {
    const d = [5.90, 9.66, 5.79, 8.02, 8.73, 8.01, 10.49, 8.35, 6.68, 5.64, 5.47, 9.91], m = mean(d), md = median(d), s = sd(d), n = d.length;
    if (!check('6.4 Q2', 'mean', m, 7.7208, 0.0001) || !check('6.4 Q2', 'median', md, 8.015, 0.0001) || !check('6.4 Q2', 'S.D.', s, 1.7159, 0.0001)) return;
    add('Waiting times: 5.90,9.66,5.79,8.02,8.73,8.01,10.49,8.35,6.68,5.64,5.47,9.91. Find mean, median and S.D.', [
      'Mean = Σx / n = ' + f(sum(d), 2) + ' / ' + n + ' = ' + f(m, 4) + '.', 'Median: ordered data ' + sorted(d).join(', ') + '. n = 12 is even, so median = (8.01 + 8.02) / 2 = ' + f(md, 3) + '.',
      'Standard deviation (population): S.D. = √[Σ(x − mean)² / n]. Σ(x − mean)² = ' + f(sum(d.map(x => (x - m) * (x - m))), 4) + '.', 'Variance = ' + f(sum(d.map(x => (x - m) * (x - m))), 4) + ' / ' + n + ' = ' + f(varPop(d), 4) + ', so S.D. = √' + f(varPop(d), 4) + ' = ' + f(s, 4) + '.']);
  })();

  (function () {
    const x = [5, 10, 11, 13, 15], fr = [2, 3, 4, 1, 5], N = sum(fr), m = sum(fr.map((v, i) => v * x[i])) / N, v = sum(fr.map((w, i) => w * (x[i] - m) * (x[i] - m))) / N;
    if (!check('6.4 Q3', 'mean', m, 11.4667, 0.0001) || !check('6.4 Q3', 'variance', v, 10.3822, 0.0001) || !check('6.4 Q3', 'S.D.', Math.sqrt(v), 3.2221, 0.0001)) return;
    add('For x=5,10,11,13,15 and f=2,3,4,1,5, find range, variance and S.D.', [
      'Range = largest − smallest = 15 − 5 = 10.', 'Σf = ' + fr.join(' + ') + ' = ' + N + '; Σ(f·x) = ' + fr.map((w, i) => w + '×' + x[i]).join(' + ') + ' = ' + sum(fr.map((w, i) => w * x[i])) + '. Mean = ' + sum(fr.map((w, i) => w * x[i])) + ' / ' + N + ' = ' + f(m, 4) + '.',
      'Σf(x − mean)² = ' + fr.map((w, i) => w + '×(' + x[i] + '−' + f(m, 4) + ')²').join(' + ') + ' = ' + f(v * N, 4) + '.', 'Variance = Σf(x − mean)² / Σf = ' + f(v * N, 4) + ' / ' + N + ' = ' + f(v, 4) + '.', 'S.D. = √variance = √' + f(v, 4) + ' = ' + f(Math.sqrt(v), 4) + '.']);
  })();

  (function () {
    const A = [7, 9, 6, 9, 4, 7, 5, 8, 8, 7], B = [6, 10, 6, 4, 2, 8, 10, 6, 9, 9];
    if (mean(A) !== 7 || !check('6.4 Q4', 'var A', varPop(A), 2.4) || mean(B) !== 7 || !check('6.4 Q4', 'var B', varPop(B), 6.4)) return;
    add('Section A marks 7,9,6,9,4,7,5,8,8,7; Section B 6,10,6,4,2,8,10,6,9,9. Find each mean and variance.', [
      'Section A: Σx = ' + sum(A) + ', n = 10, mean = ' + sum(A) + ' / 10 = ' + mean(A) + '. Deviations x − 7: ' + A.map(x => x - 7).join(', ') + '. Σ(x − 7)² = ' + sum(A.map(x => (x - 7) * (x - 7))) + ', so variance = ' + sum(A.map(x => (x - 7) * (x - 7))) + ' / 10 = ' + f(varPop(A), 1) + '.',
      'Section B: Σx = ' + sum(B) + ', n = 10, mean = ' + sum(B) + ' / 10 = ' + mean(B) + '. Deviations x − 7: ' + B.map(x => x - 7).join(', ') + '. Σ(x − 7)² = ' + sum(B.map(x => (x - 7) * (x - 7))) + ', so variance = ' + sum(B.map(x => (x - 7) * (x - 7))) + ' / 10 = ' + f(varPop(B), 1) + '.',
      'Both sections have mean 7, but B has the larger variance (6.4 > 2.4): its marks are more spread out. (The book uses the population variance, dividing by n.)']);
  })();

  (function () {
    const M = [54, 63, 59, 45, 52, 35, 61, 68], P = [52, 55, 57, 51, 56, 58, 50, 59];
    if (!check('6.4 Q5', 'S.D. maths', sd(M), 9.96) || !check('6.4 Q5', 'S.D. physics', sd(P), 3.15)) return;
    add('Eight students’ Maths marks 54,63,59,45,52,35,61,68; Physics marks 52,55,57,51,56,58,50,59. Compare S.D. and consistency.', [
      'Maths: mean = ' + sum(M) + ' / 8 = ' + mean(M) + '. Σ(x − mean)² = ' + f(sum(M.map(x => (x - mean(M)) * (x - mean(M)))), 2) + ', variance = ' + f(varPop(M), 3) + ', S.D. = √' + f(varPop(M), 3) + ' = ' + f(sd(M), 2) + '.',
      'Physics: mean = ' + sum(P) + ' / 8 = ' + mean(P) + '. Σ(x − mean)² = ' + f(sum(P.map(x => (x - mean(P)) * (x - mean(P)))), 2) + ', variance = ' + f(varPop(P), 3) + ', S.D. = √' + f(varPop(P), 3) + ' = ' + f(sd(P), 2) + '.',
      'The smaller the standard deviation, the more consistent the marks. ' + f(sd(P), 2) + ' < ' + f(sd(M), 2) + ', so the Physics marks are more consistent.']);
  })();

  (function () {
    const x = [1, 3, 5, 7, 9], fr = [1, 3, 15, 10, 2], N = sum(fr), m = sum(fr.map((v, i) => v * x[i])) / N, v = sum(fr.map((w, i) => w * x[i] * x[i])) / N - m * m;
    if (N !== 31 || !check('6.4 Q6', 'mean', m, 5.58) || !check('6.4 Q6', 'variance', v, 2.89) || !check('6.4 Q6', 'S.D.', Math.sqrt(v), 1.70, 0.01)) return;
    add('Defective-bulb classes 0–2,2–4,4–6,6–8,8–10 have frequencies 1,3,15,10,2. Find variance and S.D.', [
      'Class marks x = (lower + upper)/2 = ' + x.join(', ') + '. Σf = ' + fr.join(' + ') + ' = ' + N + ' (the page says 30 packs but its printed frequencies total 31; the table is followed).',
      'Σ(f·x) = ' + fr.map((w, i) => w + '×' + x[i]).join(' + ') + ' = ' + sum(fr.map((w, i) => w * x[i])) + '; mean = ' + sum(fr.map((w, i) => w * x[i])) + ' / ' + N + ' = ' + f(m, 2) + '.',
      'Σ(f·x²) = ' + fr.map((w, i) => w + '×' + x[i] * x[i]).join(' + ') + ' = ' + sum(fr.map((w, i) => w * x[i] * x[i])) + '.', 'Variance = Σ(f·x²) / Σf − mean² = ' + sum(fr.map((w, i) => w * x[i] * x[i])) + ' / ' + N + ' − ' + f(m, 2) + '² = ' + f(v, 2) + '.', 'S.D. = √' + f(v, 2) + ' = ' + f(Math.sqrt(v), 2) + '.']);
  })();

  /* ---------- Review Exercise 6 ---------- */
  (function () {
    const A = [2, -1, 7, -4, 11, 3], B = [12, 5, -3, 4, 7, -7], cmp = [[1, 2, 3, 3, 2, 1, 2], [1, 3, 3, 3, 2, 3, 1], [1, 2, 3, 1, 2, 3, 1], [2, 2, 1, 2, 3, 2, 3]];
    const equal = s => { const m = mean(s), md = median(s), mo = modes(s), rg = Math.max.apply(null, s) - Math.min.apply(null, s); return mo.length === 1 && Math.abs(m - md) < 1e-9 && md === mo[0] && mo[0] === rg; };
    if (!equal(cmp[0]) || equal(cmp[1]) || equal(cmp[2]) || equal(cmp[3]) || mean(B) - median(A) !== 0.5 || modes([3, 2, 1, 1, 1, 5, 3, 1, 2, 1, 2])[0] !== 1 || median([63, 65, 66, 67, 69]) !== 66 || median([41, 43, 47, 51, 57, 52, 59]) !== 51 || modes([5, 7, 7, 5, 3, 7, 2, 8, 2])[0] !== 7) return warn_('Review Q1');
    add('Choose one for each: (i) difference between upper limits of consecutive classes', [
      '(i) The difference between the upper limits of two consecutive classes is the class interval (width of a class).', '(ii) A cumulative-frequency polygon is called an ogive.', '(iii) The number of times a value occurs is its frequency.',
      '(iv) Values 3,2,1,1,1,5,3,1,2,1,2: 1 occurs 5 times, 2 occurs 3 times, 3 occurs 2 times, 5 once, so the mode = 1.',
      '(v) First set {1,2,3,3,2,1,2}: Σx = 14, n = 7, mean = 14 / 7 = 2; ordered 1,1,2,2,2,3,3 so median = 2; mode = 2; range = 3 − 1 = 2. All four equal 2. The other three sets do not have four equal measures, so the answer is the first set.',
      '(vi) The nth root of the product of n values is the geometric mean.', '(vii) 63,65,66,67,69 (n = 5, odd): the 3rd value is the median = 66.',
      '(viii) Ordered 41,43,47,51,52,57,59 (n = 7): the 4th value is the median = 51.', '(ix) 5,7,7,5,3,7,2,8,2: 7 occurs 3 times (most often), so the mode = 7.', '(x) Seven 5s: every value equals the mean 5, so every deviation is 0 and S.D. = 0.',
      '(xi) Total = number × average = 30 × 20 = Rs.600.', '(xii) Mean = total / number = 1500 / 30 = 50.', '(xiii) The largest value minus the smallest value is the range.', '(xiv) Σx / n is the arithmetic mean.',
      '(xv) A = {2,−1,7,−4,11,3}: ordered −4,−1,2,3,7,11 so median(A) = (2 + 3) / 2 = 2.5. B = {12,5,−3,4,7,−7}: Σx = 18, mean(B) = 18 / 6 = 3. mean(B) − median(A) = 3 − 2.5 = 0.5.',
      '(xvi) Σf(x − x̄)² / Σf is the variance.', '(xvii) The most frequent value is the mode.']);
  })();

  (function () {
    const ages = [17, 17, 16, 16, 17, 16, 16, 17, 18, 18, 15, 17, 19, 18, 18, 17, 16, 15, 16, 17, 15, 19, 19, 15, 15, 16, 18], vals = [15, 16, 17, 18, 19], fr = vals.map(v => ages.filter(x => x === v).length);
    if (!check('Review 6 Q2', 'f', fr, [5, 7, 7, 5, 3]) || sum(fr) !== 27) return;
    add('Ages of 27 students: 17,17,16,16,17,16,16,17,18,18,15,17,19,18,18,17,16,15,16,17,15,19,19,15,15,16,18. Make a suitable frequency table.', [
      'The ages are whole numbers from 15 to 19, so each age is its own class.', vals.map((v, i) => 'Age ' + v + ': tally ' + fr[i] + ', so f = ' + fr[i]).join('; ') + '.', 'Check: Σf = ' + fr.join('+') + ' = ' + sum(fr) + ', the number of students.'], barChart(vals.map(String), fr, 1, { alt: 'Frequency of each age' }));
  })();

  (function () {
    const br = ['A', 'B', 'C', 'D', 'E'], v = [100, 120, 110, 72, 169];
    add('Car brands A,B,C,D,E sold 100,120,110,72,169 in a month. Prepare the graph requested in the book.', [
      'The brands are categories, not numerical classes, so the correct display is a bar chart (the book calls it a histogram). Bars are separated by gaps.', 'Total sold = ' + v.join(' + ') + ' = ' + sum(v) + '.',
      'Draw one bar per brand with heights ' + br.map((b, i) => b + ': ' + v[i]).join('; ') + '.'], barChart(br, v, 2, { alt: 'Cars sold by brand' }));
  })();

  (function () {
    const cls = [[0, 10], [11, 21], [22, 32], [33, 43], [44, 50]], fr = [2, 7, 25, 11, 5], x = cls.map(c => (c[0] + c[1]) / 2);
    if (x.join() !== '5,16,27,38,47' || sum(fr) !== 50) return;
    const cfg = { kind: 'graph', w: 400, h: 240, xmin: -12, xmax: 62, ymin: -3, ymax: 30, alt: 'Frequency polygon', layers: [polygonLayer(x, fr, 11, 2)] };
    cfg.layers[0].points[cfg.layers[0].points.length - 1] = [54, 0]; cfg.layers[0].points[0] = [-6, 0];
    add('Draw a frequency polygon for score classes 0–10,11–21,22–32,33–43,44–50 with frequencies 2,7,25,11,5.', [
      'Class marks: ' + cls.map(c => 'x = (' + c[0] + '+' + c[1] + ')/2 = ' + (c[0] + c[1]) / 2).join('; ') + '.', 'Plot (class mark, frequency) = ' + x.map((m, i) => '(' + m + ',' + fr[i] + ')').join(', ') + '.',
      'Close the polygon by joining the first point to the x-axis one class mark earlier (−6) and the last to the x-axis one class later (54). Then join all the points in order with straight lines.'], cfg);
  })();

  (function () {
    const cls = [[44.0, 47.9], [48.0, 51.9], [52.0, 55.9], [56.0, 59.9], [60.0, 63.9], [64.0, 67.9], [68.0, 71.9]], fr = [13, 17, 50, 81, 57, 23, 9], cf = cfOf(fr);
    if (!check('Review 6 Q5', 'c.f.', cf, [13, 30, 80, 161, 218, 241, 250]) || sum(fr) !== 250) return;
    const ub = cls.map(c => c[1] + 0.05), pts = [[43.95, 0]].concat(cf.map((c, i) => [ub[i], c]));
    add('For 250 boys, weights 44.0–47.9,48.0–51.9,52.0–55.9,56.0–59.9,60.0–63.9,64.0–67.9,68.0–71.9 kg have frequencies 13,17,50,81,57,23,9. Draw a cumulative frequency polygon.', [
      'The classes are written to one decimal place, so the boundaries are 0.05 outside the limits: 43.95, 47.95, 51.95, …, 71.95. (The scan shows the first frequency faintly; 13 makes the stated total 250.)',
      'Cumulative frequency: ' + fr.map((x, i) => (i ? cf[i - 1] + ' + ' + x + ' = ' : '') + cf[i]).join('; ') + '. The last value is ' + cf[6] + ' = the number of boys.', 'Plot (upper boundary, c.f.) = ' + pts.slice(1).map(p => '(' + p[0] + ',' + p[1] + ')').join(', ') + ' starting from (43.95, 0), and join the points.'], ogive(pts, 2, { alt: 'Cumulative frequency polygon of the weights' }));
  })();

  (function () {
    const fr = [2, 1, 4, 2, 5, 3, 5, 2, 8, 3, 3, 4, 2, 4, 4, 1], cf = cfOf(fr), N = sum(fr), lo = fr.map((_, i) => 24.5 + 2 * i), x = lo.map(l => l + 1);
    const m = sum(fr.map((v, i) => v * x[i])) / N, vr = sum(fr.map((v, i) => v * x[i] * x[i])) / N - m * m;
    if (N !== 53 || !check('Project', 'c.f.', cf, [2, 3, 7, 9, 14, 17, 22, 24, 32, 35, 38, 42, 44, 48, 52, 53]) || !check('Project', 'grouped mean', m, 40.83, 0.02)) return;
    const b = lo.map(l => [l, l + 2]), cfg = histogram(b, fr, 2, { alt: 'Histogram and frequency polygon of the test scores' });
    cfg.layers.push(polygonLayer(x, fr, 2, 3));
    add('For the 53 scores on a 60-item test, the book asks for width-2 intervals beginning with printed 24.5–25.5, a frequency table, histogram, frequency polygon, cumulative frequencies and ogive, range, mean, S.D. and variance.', [
      'The instruction says class interval 2, so successive width-2 classes are used: ' + b.map(c => c[0] + '–' + c[1]).slice(0, 4).join(', ') + ', … , 54.5–56.5. (The printed first interval 24.5–25.5 has width 1; width 2 is followed.)',
      'The frequency table gives f = ' + fr.join(', ') + ', with Σf = ' + N + ' scores. Class marks x = 25.5, 27.5, … , 55.5.',
      'The histogram uses the boundaries 24.5, 26.5, … , 56.5; the frequency polygon joins (class mark, f) and closes on the x-axis one class either side.',
      'Cumulative frequencies: ' + cf.join(', ') + '. The last value is ' + cf[cf.length - 1] + ', the total. Plot (upper boundary, c.f.) to draw the ogive.',
      'Range = largest − smallest = 55 − 25 = 30 (from the raw scores).',
      'The raw scores are not shown here, so the grouped data give mean ≈ ' + f(m, 2) + ', variance ≈ ' + f(vr, 2) + ', S.D. ≈ ' + f(Math.sqrt(vr), 2) + '. The book computes from the raw scores: mean ≈ 40.83, variance ≈ 66.29, S.D. ≈ 8.14; the small difference is the grouping error.'], cfg);
  })();

  function warn_(m) { if (root.console) console.warn('sol_m10_u6: ' + m); }
})(typeof window !== 'undefined' ? window : globalThis);
