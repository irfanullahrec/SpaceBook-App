/* Builders for geometry solutions: a drawn-to-scale diagram on a plain graph board (vr_viz.js, cfg.plain) that is built up step by step.
 * All coordinates are computed from the lengths in the question, so a diagram is always consistent with the numbers in the written steps.
 *   const b = SBSOL_GEO.board({A:[0,0], B:[6,0], C:[3,4]}, { alt:'Triangle ABC' });
 *   b.seg('A','B', 0, { label:'6 cm' }); b.pts(['A','B','C'], 0); b.circle([0,0], 5, 1); b.right('B','A','C', 2);
 *   SBSOL_GEO.add(question, steps, b);        // board = b.cfg() */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.sol) return;
  const W = 400, H = 240, PADX = 174, PADY = 94;
  const rad = d => d * Math.PI / 180;
  /* triangle with sides a=BC, b=CA, c=AB placed on the x-axis: A=(0,0), B=(c,0) */
  function tri(a, b, c) { const x = (b * b + c * c - a * a) / (2 * c), y2 = b * b - x * x; return { A: [0, 0], B: [c, 0], C: [x, Math.sqrt(Math.max(0, y2))] }; }
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  /* foot of the perpendicular from P to line QR */
  function foot(P, Q, R) { const dx = R[0] - Q[0], dy = R[1] - Q[1], t = ((P[0] - Q[0]) * dx + (P[1] - Q[1]) * dy) / (dx * dx + dy * dy); return [Q[0] + t * dx, Q[1] + t * dy]; }

  function board(P, opt) {
    opt = opt || {}; const names = Object.keys(P), pts = names.map(k => P[k]).concat(opt.extent || []);
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); let x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    const dx = Math.max(x1 - x0, 1e-6) * 1.18, dy = Math.max(y1 - y0, 1e-6) * 1.28, s = Math.min(2 * PADX / dx, 2 * PADY / dy), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    const cfg = { kind: 'graph', plain: true, w: W, h: H, xmin: cx - PADX / s - (opt.padL || 0), xmax: cx + PADX / s, ymin: cy - PADY / s, ymax: cy + PADY / s, alt: opt.alt || 'Diagram', layers: [] };
    const color = c => c;
    const api = {
      P,
      seg(a, b, at, o) { o = o || {}; const p = typeof a === 'string' ? P[a] : a, q = typeof b === 'string' ? P[b] : b; cfg.layers.push({ at, type: 'seg', x1: p[0], y1: p[1], x2: q[0], y2: q[1], color: o.color || 'blue', dash: o.dash, label: o.label }); return api; },
      pt(name, at, o) { o = o || {}; const p = typeof name === 'string' ? P[name] : name; cfg.layers.push({ at, type: 'point', x: p[0], y: p[1], label: o.label === undefined ? (typeof name === 'string' ? name : '') : o.label, color: o.color || 'purple', dx: o.dx, dy: o.dy }); return api; },
      pts(list, at, o) { list.forEach(n => api.pt(n, at, o && o[n])); return api; },
      text(p, t, at, o) { o = o || {}; cfg.layers.push({ at, type: 'text', x: p[0], y: p[1], text: t, color: o.color || 'orange' }); return api; },
      circle(c, r, at, o) { o = o || {}; cfg.layers.push({ at, type: 'param', fx: +c[0].toFixed(4) + '+' + +r.toFixed(4) + '*cos(t)', fy: +c[1].toFixed(4) + '+' + +r.toFixed(4) + '*sin(t)', t0: 0, t1: 2 * Math.PI, color: o.color || 'blue', label: o.label }); return api; },
      /* right-angle mark at vertex V between rays towards A and B */
      right(V, A, B, at, o) {
        const v = typeof V === 'string' ? P[V] : V, a = typeof A === 'string' ? P[A] : A, b = typeof B === 'string' ? P[B] : B, k = (1 / s) * 12, la = dist(v, a), lb = dist(v, b);
        const ua = [(a[0] - v[0]) / la, (a[1] - v[1]) / la], ub = [(b[0] - v[0]) / lb, (b[1] - v[1]) / lb];
        const p1 = [v[0] + ua[0] * k, v[1] + ua[1] * k], p2 = [p1[0] + ub[0] * k, p1[1] + ub[1] * k], p3 = [v[0] + ub[0] * k, v[1] + ub[1] * k];
        cfg.layers.push({ at, type: 'poly', color: (o && o.color) || 'green', points: [p1, p2, p3], nodots: true }); return api;
      },
      cfg() { return cfg; }
    };
    return api;
  }
  /* a step-numbered board for a triangle given its three corner points: draws the sides one by one with optional labels */
  function add(q, steps, b) { NS.sol.add({ q, steps, board: b ? (b.cfg ? b.cfg() : b) : undefined }); }
  root.SBSOL_GEO = { board, tri, mid, dist, foot, add, rad };
})(typeof window !== 'undefined' ? window : globalThis);
