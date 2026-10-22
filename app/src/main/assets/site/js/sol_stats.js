/* Builders for statistics solutions (frequency tables, averages, dispersion, histograms, polygons, ogives).
 * All numbers in a written step are computed here from the data in the question, then compared with the book's printed result
 * (SBSOL_STATS.check). A mismatch is reported with console.warn and the pack is not used.
 * Boards are graph boards (vr_viz.js) made of 'bars' and 'poly' layers. */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.sol) return;
  const warn = m => { if (root.console) console.warn('sol_stats: ' + m); };
  const sum = a => a.reduce((s, x) => s + x, 0);
  const mean = a => sum(a) / a.length;
  const sorted = a => a.slice().sort((x, y) => x - y);
  const median = a => { const s = sorted(a), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
  const modes = a => { const c = {}; a.forEach(x => { c[x] = (c[x] || 0) + 1; }); const m = Math.max.apply(null, Object.values(c)); return Object.keys(c).filter(k => c[k] === m).map(Number).sort((x, y) => x - y); };
  const gm = a => Math.exp(sum(a.map(Math.log)) / a.length);
  const hm = a => a.length / sum(a.map(x => 1 / x));
  const varPop = a => { const m = mean(a); return sum(a.map(x => (x - m) * (x - m))) / a.length; };
  const f = (x, d) => String(+Number(x).toFixed(d === undefined ? 2 : d));     // 37.8, 65.84, 7.7208 (no trailing zeros)
  const list = a => a.join(', ');
  const cnt = (data, lo, hi) => data.filter(x => x >= lo && x <= hi);
  const close = (a, b, tol) => Math.abs(a - b) <= (tol === undefined ? 0.006 : tol);
  /* check(label, got, expected, tol): false (with a warning) when the computed value differs from the book */
  const check = (q, label, got, exp, tol) => { if (Array.isArray(exp)) { if (got.length !== exp.length || got.some((g, i) => !close(g, exp[i], tol))) { warn(q + ' ' + label + ': computed ' + list(got) + ' but the book prints ' + list(exp)); return false; } return true; } if (!close(got, exp, tol)) { warn(q + ' ' + label + ': computed ' + got + ' but the book prints ' + exp); return false; } return true; };

  /* ---------- boards ---------- */
  const box = (xmin, xmax, ymax, extra) => Object.assign({ kind: 'graph', w: 400, h: 240, xmin, xmax, ymin: -ymax * 0.12, ymax: ymax * 1.18 }, extra || {});
  /* histogram of classes with boundaries [[lo,hi],...] and frequencies; layer 0 = bars at step `at` */
  function histogram(bounds, freqs, at, opt) {
    opt = opt || {}; const ymax = Math.max.apply(null, freqs);
    const lo = bounds[0][0], hi = bounds[bounds.length - 1][1], pad = (hi - lo) * 0.08;
    const cfg = box(lo - pad, hi + pad, ymax, { xticks: bounds.map(b => b[0]).concat([hi]), alt: opt.alt || 'Histogram', layers: [] });
    cfg.layers.push({ at, type: 'bars', color: 'blue', bars: bounds.map((b, i) => ({ x1: b[0], x2: b[1], y: freqs[i], label: String(freqs[i]) })) });
    return cfg;
  }
  /* frequency polygon over a histogram: class marks joined, closed on the x-axis one class either side */
  function polygonLayer(marks, freqs, w, at) {
    const pts = [[marks[0] - w, 0]].concat(marks.map((m, i) => [m, freqs[i]]), [[marks[marks.length - 1] + w, 0]]);
    return { at, type: 'poly', color: 'orange', points: pts };
  }
  function ogive(points, at, opt) {
    opt = opt || {}; const xs = points.map(p => p[0]), ys = points.map(p => p[1]); const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), ym = Math.max.apply(null, ys), pad = (x1 - x0) * 0.08;
    const cfg = box(x0 - pad, x1 + pad, ym, { alt: opt.alt || 'Cumulative frequency polygon (ogive)', layers: [] });
    cfg.layers.push({ at, type: 'poly', color: opt.color || 'green', points, labels: opt.labels });
    return cfg;
  }
  function barChart(labels, values, at, opt) {
    opt = opt || {}; const n = labels.length, ymax = Math.max.apply(null, values);
    const cfg = box(0, n + 1, ymax, { xticks: labels.map((l, i) => i + 1), alt: opt.alt || 'Bar chart', layers: [] });
    cfg.layers.push({ at, type: 'bars', color: 'blue', gap: 8, bars: labels.map((l, i) => ({ x1: i + 0.55, x2: i + 1.45, y: values[i], label: String(values[i]) })) });
    cfg.xlabels = labels; return cfg;
  }
  /* steps that are lists or tables of values (tallies, class marks) are prose: never guessed into equation rows */
  const isList = s => typeof s === 'string' && (s.split(';').length > 3 || /^Class (marks?|boundaries)/.test(s));
  function add(q, steps, board) { NS.sol.add({ q, steps: steps.map(s => isList(s) ? { text: s, prose: true } : s), board }); }
  root.SBSOL_STATS = { sum, mean, median, modes, gm, hm, varPop, f, list, cnt, close, check, histogram, polygonLayer, ogive, barChart, add, sorted };
})(typeof window !== 'undefined' ? window : globalThis);
