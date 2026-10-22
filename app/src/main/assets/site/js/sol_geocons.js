/* Builders for ruler-and-compass construction solutions (Unit 13): every construction is computed from the given lengths, then drawn on a plain
 * graph board stroke by stroke (compass arcs, ruler lines, points). Distances in the diagram are in centimetres (or the unit of the question).
 *   const p = SBSOL_CONS.pack(question, { extent:[[x,y],...], alt });
 *   p.step('Draw AB = 6 cm.', b => { b.seg(A, B, { label:'6' }); b.pt(A, 'A'); });
 *   p.add();
 * Inside a step b.seg / b.arc / b.circle / b.pt / b.text / b.right are drawn with that step's number, so the board and the written steps always agree. */
(function (root) {
  'use strict';
  const NS = root.SBVR, G = root.SBSOL_GEO; if (!NS || !NS.sol || !G) return;
  const rad = Math.PI / 180, sq = Math.sqrt;
  const add2 = (p, q) => [p[0] + q[0], p[1] + q[1]], sub = (p, q) => [p[0] - q[0], p[1] - q[1]], mul = (p, k) => [p[0] * k, p[1] * k];
  const len = p => Math.hypot(p[0], p[1]), dist = (p, q) => len(sub(p, q)), mid = (p, q) => mul(add2(p, q), 0.5), unit = p => mul(p, 1 / len(p));
  const on = (c, r, deg) => [c[0] + r * Math.cos(deg * rad), c[1] + r * Math.sin(deg * rad)];
  const angleOf = (c, p) => Math.atan2(p[1] - c[1], p[0] - c[0]) / rad;
  const n4 = x => String(+x.toFixed(4));
  const perp = v => [-v[1], v[0]];
  /* intersections of two circles (centre, radius): [] when they do not meet */
  function circInt(c1, r1, c2, r2) {
    const d = dist(c1, c2); if (d > r1 + r2 + 1e-9 || d < Math.abs(r1 - r2) - 1e-9 || d === 0) return [];
    const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = sq(Math.max(0, r1 * r1 - a * a)), u = unit(sub(c2, c1)), m = add2(c1, mul(u, a)), n = perp(u);
    return [add2(m, mul(n, h)), sub(m, mul(n, h))];
  }
  function circumcentre(A, B, C) {
    const d = 2 * (A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1])), a2 = A[0] * A[0] + A[1] * A[1], b2 = B[0] * B[0] + B[1] * B[1], c2 = C[0] * C[0] + C[1] * C[1];
    return [(a2 * (B[1] - C[1]) + b2 * (C[1] - A[1]) + c2 * (A[1] - B[1])) / d, (a2 * (C[0] - B[0]) + b2 * (A[0] - C[0]) + c2 * (B[0] - A[0])) / d];
  }
  function incentre(A, B, C) { const a = dist(B, C), b = dist(A, C), c = dist(A, B), s = a + b + c; return [(a * A[0] + b * B[0] + c * C[0]) / s, (a * A[1] + b * B[1] + c * C[1]) / s]; }
  /* excentre opposite A (touches side BC): (-aA + bB + cC) / (-a + b + c) */
  function excentre(A, B, C) { const a = dist(B, C), b = dist(A, C), c = dist(A, B), s = -a + b + c; return [(-a * A[0] + b * B[0] + c * C[0]) / s, (-a * A[1] + b * B[1] + c * C[1]) / s]; }
  const foot = G.foot, area = (A, B, C) => Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1])) / 2;
  /* triangle from three side lengths a=BC, b=CA, c=AB with A at the origin and B on the x-axis */
  const tri = G.tri;
  /* triangle from two sides and the included angle: AB = c, AC = b, angle A in degrees */
  const triSAS = (c, b, A) => ({ A: [0, 0], B: [c, 0], C: [b * Math.cos(A * rad), b * Math.sin(A * rad)] });
  /* triangle from two angles and the side AB */
  function triASA(c, A, B) { const C = 180 - A - B, b = c * Math.sin(B * rad) / Math.sin(C * rad); return { A: [0, 0], B: [c, 0], C: [b * Math.cos(A * rad), b * Math.sin(A * rad)] }; }

  function pack(question, opt) {
    opt = opt || {}; const ext = opt.extent || [], bd = G.board({}, { extent: ext, alt: opt.alt || 'Construction', padL: 0 }), steps = []; let cur = -1;
    const b = {
      seg(P, Q, o) { bd.seg(P, Q, cur, o); return b; },
      /* the whole line through P and Q, clipped to the drawing area */
      line(P, Q, o) { const u = unit(sub(Q, P)), cfg = bd.cfg(), span = Math.max(cfg.xmax - cfg.xmin, cfg.ymax - cfg.ymin), c = mid(P, Q); bd.seg(add2(c, mul(u, -span)), add2(c, mul(u, span)), cur, o); return b; },
      arc(C, r, a0, a1, o) { bd.cfg().layers.push({ at: cur, type: 'param', fx: n4(C[0]) + '+' + n4(r) + '*cos(t)', fy: n4(C[1]) + '+' + n4(r) + '*sin(t)', t0: a0 * rad, t1: a1 * rad, color: (o && o.color) || 'grey' }); return b; },
      /* a short compass arc through the point X, centred at C (as when marking an intersection) */
      mark(C, X, o) { const r = dist(C, X), a = angleOf(C, X), w = (o && o.w) || 14; return b.arc(C, r, a - w, a + w, o); },
      circle(C, r, o) { bd.circle(C, r, cur, o); return b; },
      pt(P, label, o) { bd.pt(P, cur, Object.assign({ label: label === undefined ? '' : label }, o || {})); return b; },
      text(P, t, o) { bd.text(P, t, cur, o); return b; },
      right(V, A, B, o) { bd.right(V, A, B, cur, o); return b; }
    };
    const api = {
      b,
      step(text, draw, tex) { cur = steps.length; steps.push(tex ? { text, m: tex } : text); if (draw) draw(b); return api; },
      add() { NS.sol.add({ q: question, steps, board: bd.cfg() }); return api; },
      board: bd
    };
    return api;
  }
  /* compass work for the perpendicular bisector of PQ: four short arcs and the bisector through them; returns the two arc intersections */
  function bisectorMarks(b, P, Q, k) {
    const d = dist(P, Q), r = d * (k || 0.62), X = circInt(P, r, Q, r); if (X.length < 2) return X;
    b.mark(P, X[0], { w: 9 }).mark(P, X[1], { w: 9 }).mark(Q, X[0], { w: 9 }).mark(Q, X[1], { w: 9 }); return X;
  }
  /* compass work for the bisector of the angle at V between the rays through A and B: returns {I, dir} (a point of the bisector and its direction) */
  function angleBisectorMarks(b, V, A, B, rho) {
    const ua = unit(sub(A, V)), ub = unit(sub(B, V)), Pa = add2(V, mul(ua, rho)), Pb = add2(V, mul(ub, rho)), a0 = angleOf(V, Pa), a1 = angleOf(V, Pb);
    let d = a1 - a0; while (d > 180) d -= 360; while (d < -180) d += 360;
    const lo = Math.min(a0, a0 + d) - 4, hi = Math.max(a0, a0 + d) + 4; b.arc(V, rho, lo, hi, { color: 'grey' });
    const r2 = dist(Pa, Pb) * 0.8, X = circInt(Pa, r2, Pb, r2), W = X.length ? (dist(X[0], V) > dist(X[1], V) ? X[0] : X[1]) : mul(add2(Pa, Pb), 0.5);
    b.mark(Pa, W, { w: 10 }).mark(Pb, W, { w: 10 }); return { W, dir: unit(sub(W, V)) };
  }
  root.SBSOL_CONS = { pack, circInt, circumcentre, incentre, excentre, foot, area, tri, triSAS, triASA, bisectorMarks, angleBisectorMarks, on, angleOf, add2, sub, mul, len, dist, mid, unit, perp, rad };
})(typeof window !== 'undefined' ? window : globalThis);
