/* SpaceBook Visual Reasoning: expression evaluator, graph and unit-circle boards, answer equivalence.
 * No eval and no network: a small recursive-descent parser. Boards are SVG; every layer can be drawn instantly (settled view)
 * or animated (draw the curve, morph one curve into another, move a point, sweep an angle, slide a tangent).
 * A board only ever draws what the solution states: the curve is the author's own function, points are the author's points. */
(function (root) {
  'use strict';
  const NS = root.SBVR = root.SBVR || {};
  const SVGNS = 'http://www.w3.org/2000/svg';
  const FN = { sin: Math.sin, cos: Math.cos, tan: Math.tan, cot: x => 1 / Math.tan(x), sec: x => 1 / Math.cos(x), csc: x => 1 / Math.sin(x), ln: Math.log, log: Math.log10, exp: Math.exp, sqrt: Math.sqrt, abs: Math.abs, asin: Math.asin, acos: Math.acos, atan: Math.atan };
  const FNAMES = Object.keys(FN).sort((a, b) => b.length - a.length);

  /* ---------- expression parser: text or TeX -> function(env) ---------- */
  function normalise(src) {
    let t = String(src).replace(/\\htmlClass\{[^{}]*\}/g, '').replace(/([0-9.]+)\s*(?:\^\s*\{?\s*\\circ\s*\}?|°)/g, '($1*pi/180)');
    for (let i = 0; i < 6; i++) t = t.replace(/\\d?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '(($1)/($2))').replace(/\\sqrt\s*\{([^{}]*)\}/g, 'sqrt($1)');
    t = t.replace(/\\left|\\right|\\,|\\;|\\!|\\ |\\quad|\\displaystyle/g, '').replace(/\\(sin|cos|tan|cot|sec|csc|ln|log|exp)\b/g, '$1').replace(/\\pi\b/g, 'pi').replace(/\\(cdot|times)\b/g, '*').replace(/\\div\b/g, '/').replace(/\\circ/g, '*pi/180')
      .replace(/\^\{([^{}]*)\}/g, '^($1)').replace(/_\{[^{}]*\}/g, '').replace(/[{}]/g, '').replace(/\\/g, '')
      .replace(/[−–]/g, '-').replace(/[×·]/g, '*').replace(/÷/g, '/').replace(/√/g, 'sqrt').replace(/π/g, 'pi').replace(/°/g, '*pi/180').replace(/θ/g, 'theta')
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, m => '^(' + m.split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).join('') + ')').replace(/\s+/g, ' ').trim();
    let open = true; t = t.replace(/\|/g, () => { const r = open ? 'abs(' : ')'; open = !open; return r; });
    if (!open) throw new Error('bars');
    return t;
  }
  function tokenize(s) {
    const out = []; let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (c === ' ') { i++; continue; }
      if (/[0-9.]/.test(c)) { let j = i; while (/[0-9.]/.test(s[j] || '')) j++; out.push({ t: 'n', v: parseFloat(s.slice(i, j)) }); i = j; continue; }
      if (/[a-zA-Z]/.test(c)) {
        const rest = s.slice(i); const f = FNAMES.find(n => rest.startsWith(n));
        if (f) { out.push({ t: 'f', v: f }); i += f.length; continue; }
        if (rest.startsWith('pi')) { out.push({ t: 'n', v: Math.PI }); i += 2; continue; }
        if (rest.startsWith('theta')) { out.push({ t: 'v', v: 'theta' }); i += 5; continue; }
        out.push({ t: 'v', v: c }); i++; continue;
      }
      if ('+-*/^(),'.includes(c)) { out.push({ t: c }); i++; continue; }
      throw new Error('char ' + c);
    }
    // implicit multiplication
    const res = [];
    out.forEach((tk, k) => {
      const prev = out[k - 1];
      if (prev && (prev.t === 'n' || prev.t === 'v' || prev.t === ')') && (tk.t === 'n' || tk.t === 'v' || tk.t === 'f' || tk.t === '(')) res.push({ t: '*' });
      res.push(tk);
    });
    return res;
  }
  function compile(src) {
    const toks = tokenize(normalise(src)); let p = 0; const vars = new Set();
    const peek = () => toks[p], eat = t => { if (toks[p] && toks[p].t === t) return toks[p++]; throw new Error('expected ' + t); };
    const expr = () => { let l = term(); while (peek() && (peek().t === '+' || peek().t === '-')) { const op = toks[p++].t, r = term(), a = l; l = op === '+' ? e => a(e) + r(e) : e => a(e) - r(e); } return l; };
    const term = () => { let l = unary(); while (peek() && (peek().t === '*' || peek().t === '/')) { const op = toks[p++].t, r = unary(), a = l; l = op === '*' ? e => a(e) * r(e) : e => a(e) / r(e); } return l; };
    const unary = () => { if (peek() && peek().t === '-') { p++; const u = unary(); return e => -u(e); } if (peek() && peek().t === '+') { p++; return unary(); } return power(); };
    const power = () => { const b = atom(); if (peek() && peek().t === '^') { p++; const ex = unary(); return e => Math.pow(b(e), ex(e)); } return b; };
    const arg = () => {                       // function argument without brackets: adjacent atoms, e.g. sin 2x
      let l = power(); while (peek() && (peek().t === '*' && toks[p + 1] && (toks[p + 1].t === 'n' || toks[p + 1].t === 'v')) && toks[p - 1] && toks[p - 1].t !== '/') { p++; const r = power(), a = l; l = e => a(e) * r(e); } return l;
    };
    const atom = () => {
      const tk = peek(); if (!tk) throw new Error('end');
      if (tk.t === 'n') { p++; const v = tk.v; return () => v; }
      if (tk.t === 'v') { p++; vars.add(tk.v); const nm = tk.v; return e => { const v = e[nm]; if (v === undefined) throw new Error('var ' + nm); return v; }; }
      if (tk.t === '(') { p++; const x = expr(); eat(')'); return x; }
      if (tk.t === 'f') {
        p++; const f = FN[tk.v]; let pw = null;
        if (peek() && peek().t === '^') { p++; pw = unary(); }
        if (pw && peek() && peek().t === '*') p++;
        let a;
        if (peek() && peek().t === '(') { p++; a = expr(); eat(')'); } else a = arg();
        return pw ? e => Math.pow(f(a(e)), pw(e)) : e => f(a(e));
      }
      throw new Error('token ' + tk.t);
    };
    const f = expr(); if (p < toks.length) throw new Error('rest');
    f.vars = Array.from(vars); return f;
  }
  const tryCompile = s => { try { return compile(s); } catch (e) { return null; } };

  /* ---------- answer equivalence (Practice Mode): same value at many points, or same equation up to a factor ---------- */
  function equiv(a, b) {
    const clean = s => String(s).replace(/^\s*=\s*/, '').replace(/[.;,]+\s*$/, '');
    a = clean(a); b = clean(b);
    const sides = s => s.split('=').map(x => x.trim());
    const sa = sides(a), sb = sides(b);
    if (sa.length !== sb.length || sa.length > 2) return false;
    const mk = s => s.length === 1 ? compile(s[0]) : (() => { const l = compile(s[0]), r = compile(s[1]); const f = e => l(e) - r(e); f.vars = Array.from(new Set(l.vars.concat(r.vars))); return f; })();
    let fa, fb; try { fa = mk(sa); fb = mk(sb); } catch (e) { return false; }
    const names = Array.from(new Set(fa.vars.concat(fb.vars))); let ok = 0, ratio = null;
    for (let k = 0; k < 14 && ok < 6; k++) {
      const env = { theta: 0 }; names.forEach((n, i) => { env[n] = 0.6 + ((k * 7 + i * 3 + 1) % 17) * 0.19; });
      let x, y; try { x = fa(env); y = fb(env); } catch (e) { return false; }
      if (!isFinite(x) || !isFinite(y)) continue;
      if (sa.length === 1) { if (Math.abs(x - y) > 1e-7 * Math.max(1, Math.abs(x), Math.abs(y))) return false; }
      else { if (Math.abs(y) < 1e-9) { if (Math.abs(x) > 1e-7) return false; } else { const r = x / y; if (ratio === null) ratio = r; else if (Math.abs(r - ratio) > 1e-6 * Math.max(1, Math.abs(ratio))) return false; } }
      ok++;
    }
    return ok >= 3;
  }

  /* ---------- helpers ---------- */
  const el = (n, a, p) => { const e = document.createElementNS(SVGNS, n); Object.keys(a || {}).forEach(k => e.setAttribute(k, a[k])); if (p) p.appendChild(e); return e; };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  async function run(ctl, ms, step) {          // eased frames from 0 to 1; instant when reduced / quick
    if (ctl.red) { step(1); return; }
    const n = Math.max(6, Math.round(ms / 30));
    for (let k = 1; k <= n; k++) { if (!ctl.alive()) throw ctl.cancel; const u = k / n; step(u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2); await sleep(ms / n); }
  }
  const COL = { blue: '#2563eb', orange: '#ea580c', purple: '#7c3aed', green: '#16a34a', red: '#dc2626', grey: '#94a3b8' };
  const niceStep = span => { const raw = span / 8, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p; return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p; };
  const fmt = v => { const r = Math.round(v * 1000) / 1000; return String(Object.is(r, -0) ? 0 : r); };

  /* ---------- graph board ---------- */
  function graphBoard(host, cfg, opt) {
    const W = cfg.w || 380, H = cfg.h || 230, pad = 26;
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'sbt-vsvg', role: 'img', 'aria-label': cfg.alt || 'Graph', preserveAspectRatio: 'xMidYMid meet' }, null);
    host.appendChild(svg);
    const X = x => pad + (x - cfg.xmin) / (cfg.xmax - cfg.xmin) * (W - 2 * pad), Y = y => H - pad - (y - cfg.ymin) / (cfg.ymax - cfg.ymin) * (H - 2 * pad);
    const gx = niceStep(cfg.xmax - cfg.xmin), gy = niceStep(cfg.ymax - cfg.ymin);
    for (let x = Math.ceil(cfg.xmin / gx) * gx; x <= cfg.xmax + 1e-9; x += gx) { el('line', { x1: X(x), y1: pad / 2, x2: X(x), y2: H - pad / 2, class: 'vg' }, svg); if (Math.abs(x) > 1e-9 && !cfg.xticks) { const t = el('text', { x: X(x), y: Y(Math.max(cfg.ymin, Math.min(0, cfg.ymax))) + 11, class: 'vt', 'text-anchor': 'middle' }, svg); t.textContent = fmt(x); } }
    (cfg.xticks || []).forEach((v, ti) => { el('line', { x1: X(v), y1: Y(0) - 3, x2: X(v), y2: Y(0) + 3, class: 'vax' }, svg); const t = el('text', { x: X(v), y: Y(0) + 12, class: 'vt', 'text-anchor': 'middle' }, svg); t.textContent = cfg.xlabels ? cfg.xlabels[ti] : fmt(v); });
    for (let y = Math.ceil(cfg.ymin / gy) * gy; y <= cfg.ymax + 1e-9; y += gy) { el('line', { x1: pad / 2, y1: Y(y), x2: W - pad / 2, y2: Y(y), class: 'vg' }, svg); if (Math.abs(y) > 1e-9) { const t = el('text', { x: X(Math.max(cfg.xmin, Math.min(0, cfg.xmax))) - 4, y: Y(y) + 3, class: 'vt', 'text-anchor': 'end' }, svg); t.textContent = fmt(y); } }
    if (cfg.xmin <= 0 && cfg.xmax >= 0) el('line', { x1: X(0), y1: pad / 2, x2: X(0), y2: H - pad / 2, class: 'vax' }, svg);
    if (cfg.ymin <= 0 && cfg.ymax >= 0) el('line', { x1: pad / 2, y1: Y(0), x2: W - pad / 2, y2: Y(0), class: 'vax' }, svg);
    if (cfg.plain) while (svg.firstChild) svg.removeChild(svg.firstChild);          // geometry diagrams: no grid, no axes
    const N = 220, xs = []; for (let i = 0; i <= N; i++) xs.push(cfg.xmin + (cfg.xmax - cfg.xmin) * i / N);
    const sample = (f, from, to) => xs.map(x => { if (from !== undefined && x < from - 1e-9) return NaN; if (to !== undefined && x > to + 1e-9) return NaN; try { return f({ x }); } catch (e) { return NaN; } });
    const pathOf = ys => {
      let d = '', pen = false; const lim = (cfg.ymax - cfg.ymin) * 3;
      ys.forEach((y, i) => { if (!isFinite(y) || Math.abs(y) > lim * 4 || (i && isFinite(ys[i - 1]) && Math.abs(y - ys[i - 1]) > lim)) { pen = false; return; } d += (pen ? 'L' : 'M') + X(xs[i]).toFixed(1) + ' ' + Y(y).toFixed(1); pen = true; });
      return d;
    };
    const fnOf = L => { const f = L._f || (L._f = compile(L.fn)); return f; };
    const layerEls = [];
    function draw(L, i, mode, ctl) {                 // mode 'now' draws instantly; 'anim' returns a promise
      const g = el('g', { class: 'vl' }, svg); layerEls[i] = g;
      const color = COL[L.color] || L.color || COL.blue;
      if (L.type === 'plot' || L.type === 'morph') {
        const to = sample(fnOf(L), L.from, L.to), from = L.type === 'morph' ? sample(compile(L.morphFrom), L.from, L.to) : null;
        if (from) el('path', { d: pathOf(from), class: 'vcurve ghost', stroke: COL.grey, fill: 'none' }, g);
        const p = el('path', { d: pathOf(L.type === 'morph' ? from : to), class: 'vcurve' + (L.faint ? ' ghost' : ''), stroke: L.faint ? COL.grey : color, fill: 'none', pathLength: 1 }, g);
        if (L.label) { const yv = to.filter(isFinite); const k = to.findIndex((v, ix) => ix > N * 0.8 && isFinite(v)); if (k > 0) { const t = el('text', { x: X(xs[k]) - 2, y: Y(to[k]) - 6, class: 'vlab', fill: color, 'text-anchor': 'end' }, g); t.textContent = L.label; } }
        if (mode === 'now') { p.setAttribute('d', pathOf(to)); return; }
        if (L.type === 'morph') return run(ctl, ctl.dur, u => { p.setAttribute('d', pathOf(to.map((y, ix) => from[ix] + (y - from[ix]) * u))); });
        p.style.strokeDasharray = '1'; p.style.strokeDashoffset = '1';
        return run(ctl, ctl.dur, u => { p.style.strokeDashoffset = String(1 - u); }).then(() => { p.style.strokeDasharray = ''; });
      }
      if (L.type === 'param') {                      // a curve given as (x(t), y(t)): parabolas, circles, ellipses
        const fx = compile(L.fx), fy = compile(L.fy), pts = []; const n = 200;
        for (let k = 0; k <= n; k++) { const t = L.t0 + (L.t1 - L.t0) * k / n; try { pts.push([fx({ t }), fy({ t })]); } catch (e) { pts.push([NaN, NaN]); } }
        let d = '', pen = false; pts.forEach(([x, y]) => { if (!isFinite(x) || !isFinite(y) || Math.abs(x) > 1e4 || Math.abs(y) > 1e4) { pen = false; return; } d += (pen ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Y(y).toFixed(1); pen = true; });
        const p = el('path', { d, class: 'vcurve', stroke: color, fill: 'none', pathLength: 1 }, g);
        if (L.label) { const lp = pts[Math.round(n * 0.92)]; if (lp && isFinite(lp[0])) { const t = el('text', { x: X(lp[0]) + 6, y: Y(lp[1]) - 4, class: 'vlab', fill: color }, g); t.textContent = L.label; } }
        if (mode === 'now') return;
        p.style.strokeDasharray = '1'; p.style.strokeDashoffset = '1';
        return run(ctl, ctl.dur, u => { p.style.strokeDashoffset = String(1 - u); }).then(() => { p.style.strokeDasharray = ''; });
      }
      if (L.type === 'bars') {                       // histogram / bar chart: bars grow one after another
        const y0 = Y(0), els = L.bars.map(b => {
          const x1 = X(b.x1), x2 = X(b.x2), y1 = Y(b.y);
          const r = el('rect', { x: x1, y: y1, width: Math.max(1, x2 - x1 - (L.gap || 0)), height: y0 - y1, fill: color, opacity: .42, stroke: color, 'stroke-width': 1.5 }, g);
          const t = b.label === undefined ? null : el('text', { x: (x1 + x2) / 2, y: y1 - 3, class: 'vlab', fill: color, 'text-anchor': 'middle' }, g); if (t) t.textContent = b.label;
          return { r, t, y1, h: y0 - y1 };
        });
        if (mode === 'now') return;
        els.forEach(e => { e.r.setAttribute('y', y0); e.r.setAttribute('height', 0); if (e.t) e.t.style.opacity = 0; });
        return run(ctl, Math.min(ctl.dur * 1.4, 1800), u => { const n = els.length; els.forEach((e, k) => { const v = Math.max(0, Math.min(1, u * n - k)); e.r.setAttribute('y', y0 - e.h * v); e.r.setAttribute('height', e.h * v); if (e.t) e.t.style.opacity = v; }); });
      }
      if (L.type === 'poly') {                       // a polyline through points (frequency polygon, ogive) with its dots
        let d = ''; L.points.forEach((p, k) => { d += (k ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); });
        const p = el('path', { d, class: 'vcurve', stroke: color, fill: 'none', pathLength: 1 }, g);
        const dots = L.nodots ? [] : L.points.map(pt => el('circle', { cx: X(pt[0]), cy: Y(pt[1]), r: 3.6, fill: color }, g));
        const labs = L.labels ? L.points.map((pt, k) => { const t = el('text', { x: X(pt[0]) + 4, y: Y(pt[1]) - 6, class: 'vlab', fill: color }, g); t.textContent = L.labels[k] === undefined ? '' : L.labels[k]; return t; }) : [];
        if (mode === 'now') return;
        p.style.strokeDasharray = '1'; p.style.strokeDashoffset = '1'; dots.forEach(c => { c.style.opacity = 0; }); labs.forEach(t => { t.style.opacity = 0; });
        return run(ctl, ctl.dur * 1.2, u => { p.style.strokeDashoffset = String(1 - u); const n = dots.length; dots.forEach((c, k) => { const v = Math.max(0, Math.min(1, u * n - k + 1)); c.style.opacity = v; if (labs[k]) labs[k].style.opacity = v; }); }).then(() => { p.style.strokeDasharray = ''; });
      }
      if (L.type === 'point') {
        const c = el('circle', { cx: X(L.x), cy: Y(L.y), r: 4.5, fill: color, class: 'vpt' }, g);
        const t = el('text', { x: X(L.x) + (L.dx === undefined ? 7 : L.dx), y: Y(L.y) + (L.dy === undefined ? -7 : L.dy), class: 'vlab', fill: color }, g); t.textContent = L.label || '';
        if (mode === 'now') return;
        c.setAttribute('r', 0); t.style.opacity = 0;
        return run(ctl, Math.min(ctl.dur, 700), u => { c.setAttribute('r', 4.5 * u + 3 * Math.sin(Math.PI * u)); t.style.opacity = u; });
      }
      if (L.type === 'seg') {
        const l = el('line', { x1: X(L.x1), y1: Y(L.y1), x2: X(L.x2), y2: Y(L.y2), class: 'vseg' + (L.dash ? ' dash' : ''), stroke: color }, g);
        if (L.label) { const t = el('text', { x: X((L.x1 + L.x2) / 2) + 6, y: Y((L.y1 + L.y2) / 2) - 6, class: 'vlab', fill: color }, g); t.textContent = L.label; }
        if (mode === 'now') return;
        return run(ctl, Math.min(ctl.dur, 800), u => { l.setAttribute('x2', X(L.x1 + (L.x2 - L.x1) * u)); l.setAttribute('y2', Y(L.y1 + (L.y2 - L.y1) * u)); });
      }
      if (L.type === 'shade') {
        const f = fnOf(L); let d = `M${X(L.a)} ${Y(0)}`; for (let k = 0; k <= 80; k++) { const x = L.a + (L.b - L.a) * k / 80; let y = 0; try { y = f({ x }); } catch (e) { y = 0; } d += `L${X(x).toFixed(1)} ${Y(isFinite(y) ? y : 0).toFixed(1)}`; } d += `L${X(L.b)} ${Y(0)}Z`;
        const p = el('path', { d, fill: color, class: 'vshade' }, g);
        if (mode === 'now') return; p.style.opacity = 0; return run(ctl, Math.min(ctl.dur, 900), u => { p.style.opacity = u * .28; });
      }
      if (L.type === 'tangent') {                    // a point slides along the curve to x0, then the tangent (numerical slope) appears
        const f = fnOf(L), x0 = L.x0, h = 1e-5, m = (f({ x: x0 + h }) - f({ x: x0 - h })) / (2 * h), y0 = f({ x: x0 });
        const span = (cfg.xmax - cfg.xmin) * 0.28, tl = el('line', { x1: X(x0 - span), y1: Y(y0 - m * span), x2: X(x0 + span), y2: Y(y0 + m * span), class: 'vseg', stroke: color }, g);
        const dot = el('circle', { cx: X(x0), cy: Y(y0), r: 5, fill: color }, g);
        const t = el('text', { x: X(x0) + 10, y: Y(y0) + 22, class: 'vlab', fill: color }, g); t.textContent = (L.label || 'slope') + ' = ' + fmt(m);
        if (mode === 'now') return; tl.style.opacity = 0; t.style.opacity = 0; const xa = L.xfrom === undefined ? cfg.xmin + (cfg.xmax - cfg.xmin) * .1 : L.xfrom;
        return run(ctl, ctl.dur, u => { const x = xa + (x0 - xa) * u; let y = 0; try { y = f({ x }); } catch (e) { y = 0; } dot.setAttribute('cx', X(x)); dot.setAttribute('cy', Y(y)); if (u > .8) { tl.style.opacity = (u - .8) * 5; t.style.opacity = (u - .8) * 5; } });
      }
      if (L.type === 'text') { const t = el('text', { x: X(L.x), y: Y(L.y), class: 'vlab', fill: color }, g); t.textContent = L.text; if (mode === 'now') return; t.style.opacity = 0; return run(ctl, 500, u => { t.style.opacity = u; }); }
    }
    cfg.layers.forEach((L, i) => { if (L.at < opt.step) draw(L, i, 'now'); });
    return { animate: (i, ctl) => draw(cfg.layers[i], i, 'anim', ctl) || Promise.resolve(), svg, alt: cfg.alt };
  }

  /* ---------- unit circle board ---------- */
  const EXACT = { 0: ['0', '1', '0'], 30: ['1/2', '√3/2', '1/√3'], 45: ['√2/2', '√2/2', '1'], 60: ['√3/2', '1/2', '√3'], 90: ['1', '0', 'undefined'], 120: ['√3/2', '−1/2', '−√3'], 135: ['√2/2', '−√2/2', '−1'], 150: ['1/2', '−√3/2', '−1/√3'], 180: ['0', '−1', '0'], 210: ['−1/2', '−√3/2', '1/√3'], 225: ['−√2/2', '−√2/2', '1'], 240: ['−√3/2', '−1/2', '√3'], 270: ['−1', '0', 'undefined'], 300: ['−√3/2', '1/2', '−√3'], 315: ['−√2/2', '√2/2', '−1'], 330: ['−1/2', '√3/2', '−1/√3'], 360: ['0', '1', '0'] };
  function circleBoard(host, cfg, opt) {
    const W = cfg.w || 400, H = cfg.h || 230, R = 82, cx = cfg.wave ? 100 : 110, cy = H / 2;
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'sbt-vsvg', role: 'img', 'aria-label': cfg.alt || 'Unit circle', preserveAspectRatio: 'xMidYMid meet' }, null);
    host.appendChild(svg);
    el('line', { x1: cx - R - 14, y1: cy, x2: cx + R + 14, y2: cy, class: 'vax' }, svg); el('line', { x1: cx, y1: cy - R - 14, x2: cx, y2: cy + R + 14, class: 'vax' }, svg);
    el('circle', { cx, cy, r: R, class: 'vcirc', fill: 'none' }, svg);
    [['1', cx + R + 3, cy + 12], ['−1', cx - R - 18, cy + 12], ['1', cx + 4, cy - R - 3], ['−1', cx + 4, cy + R + 12]].forEach(([t, x, y]) => { const e = el('text', { x, y, class: 'vt' }, svg); e.textContent = t; });
    const g = el('g', {}, svg); const WX = 215, WW = W - WX - 10;
    if (cfg.wave) { el('line', { x1: WX, y1: cy, x2: WX + WW, y2: cy, class: 'vax' }, svg); el('line', { x1: WX, y1: cy - R, x2: WX, y2: cy + R, class: 'vax' }, svg); const t = el('text', { x: WX + WW - 4, y: cy + 12, class: 'vt', 'text-anchor': 'end' }, svg); t.textContent = 'angle'; }
    const info = el('text', { x: 8, y: 14, class: 'vlab' }, svg);
    let curRatio = null;
    function paint(deg, ctl, full) {
      g.innerHTML = '';
      const dn = ((deg % 360) + 360) % 360;
      if (cfg.quadrants && dn % 90 !== 0) {            // shade the quadrant the angle is in and name it
        const q = Math.floor(dn / 90) + 1, ext = R + 14, qx = (q === 1 || q === 4) ? cx : cx - ext, qy = (q === 1 || q === 2) ? cy - ext : cy;
        el('rect', { x: qx, y: qy, width: ext, height: ext, fill: COL.grey, opacity: .16 }, g);
        const lt = el('text', { x: (q === 1 || q === 4) ? cx + ext - 16 : cx - ext + 6, y: (q === 1 || q === 2) ? cy - ext + 14 : cy + ext - 6, class: 'vlab', fill: COL.purple }, g); lt.textContent = ['I', 'II', 'III', 'IV'][q - 1];
      }
      const a = deg * Math.PI / 180, px = cx + R * Math.cos(a), py = cy - R * Math.sin(a), col = COL[cfg.color] || COL.blue;
      if (deg !== 0) { const large = deg > 180 ? 1 : 0; el('path', { d: `M${cx + 22} ${cy} A22 22 0 ${large} 0 ${cx + 22 * Math.cos(a)} ${cy - 22 * Math.sin(a)}`, fill: 'none', stroke: COL.orange, 'stroke-width': 2.5 }, g); }
      el('line', { x1: cx, y1: cy, x2: px, y2: py, stroke: col, 'stroke-width': 2.5 }, g);
      el('line', { x1: px, y1: py, x2: px, y2: cy, stroke: COL.green, 'stroke-width': 2.5, 'stroke-dasharray': '4 3' }, g);
      el('line', { x1: px, y1: py, x2: cx, y2: py, stroke: COL.purple, 'stroke-width': 2.5, 'stroke-dasharray': '4 3' }, g);
      el('circle', { cx: px, cy: py, r: 4.5, fill: col }, g);
      if (cfg.wave) { let d = ''; for (let k = 0; k <= deg; k += 3) { d += (k ? 'L' : 'M') + (WX + WW * k / 360).toFixed(1) + ' ' + (cy - R * Math.sin(k * Math.PI / 180)).toFixed(1); } el('path', { d, fill: 'none', stroke: COL.green, 'stroke-width': 2.5 }, g); el('circle', { cx: WX + WW * deg / 360, cy: py, r: 4, fill: COL.green }, g); el('line', { x1: px, y1: py, x2: WX + WW * deg / 360, y2: py, stroke: COL.grey, 'stroke-dasharray': '2 3' }, g); }
      const rd = Math.round(deg), ex = EXACT[rd]; const c = Math.cos(a), s = Math.sin(a), t = Math.abs(c) < 1e-9 ? 'undefined' : fmt(s / c);
      if (curRatio) {                                  // one ratio and its sign
        const vv = { sin: s, cos: c, tan: s / c, cot: c / s, sec: 1 / c, csc: 1 / s }[curRatio];
        const pos = vv > 1e-9, neg = vv < -1e-9;
        info.textContent = `θ = ${fmt(deg)}°   ${curRatio} θ = ${isFinite(vv) && Math.abs(vv) < 1e6 ? fmt(vv) : 'undefined'}   (${pos ? 'positive +' : neg ? 'negative −' : 'zero'})`;
        info.setAttribute('fill', pos ? COL.green : neg ? COL.red : COL.grey);
        return;
      }
      info.textContent = `θ = ${rd}°    cos θ = ${ex && Math.abs(deg - rd) < 1e-6 ? ex[1] : fmt(c)}    sin θ = ${ex && Math.abs(deg - rd) < 1e-6 ? ex[0] : fmt(s)}    tan θ = ${ex && Math.abs(deg - rd) < 1e-6 ? ex[2] : t}`;
    }
    let last = 0; cfg.layers.forEach(L => { if (L.at < opt.step && L.type === 'sweep') { last = L.deg; curRatio = L.ratio || null; } });
    paint(last, null, true);
    const g2 = el('g', {}, svg);
    function xyr(L, anim, ctl) {                      // the right triangle (x, y, r) of a point, scaled onto the unit circle
      const r = Math.hypot(L.x, L.y), pxu = cx + R * L.x / r, pyu = cy - R * L.y / r, col = COL.purple;
      const leg1 = el('line', { x1: cx, y1: cy, x2: pxu, y2: cy, stroke: COL.orange, 'stroke-width': 3 }, g2), leg2 = el('line', { x1: pxu, y1: cy, x2: pxu, y2: pyu, stroke: COL.green, 'stroke-width': 3 }, g2);
      const t1 = el('text', { x: (cx + pxu) / 2, y: cy + (L.y >= 0 ? 14 : -6), class: 'vlab', fill: COL.orange, 'text-anchor': 'middle' }, g2); t1.textContent = 'x = ' + L.xText;
      const t2 = el('text', { x: pxu + (L.x >= 0 ? 6 : -6), y: (cy + pyu) / 2, class: 'vlab', fill: COL.green, 'text-anchor': L.x >= 0 ? 'start' : 'end' }, g2); t2.textContent = 'y = ' + L.yText;
      const t3 = el('text', { x: (cx + pxu) / 2 + (L.x >= 0 ? -4 : 4), y: (cy + pyu) / 2 - 8, class: 'vlab', fill: col, 'text-anchor': L.x >= 0 ? 'end' : 'start' }, g2); t3.textContent = 'r = ' + L.rText;
      if (!anim) return;
      [leg1, leg2, t1, t2, t3].forEach(e => { e.style.opacity = 0; });
      return run(ctl, ctl.dur * 1.2, u => { leg1.style.opacity = t1.style.opacity = Math.min(1, u * 3); leg2.style.opacity = t2.style.opacity = Math.max(0, Math.min(1, u * 3 - 1)); t3.style.opacity = Math.max(0, Math.min(1, u * 3 - 2)); });
    }
    cfg.layers.forEach(L => { if (L.at < opt.step && L.type === 'xyr') xyr(L, false); });
    return {
      alt: cfg.alt, svg,
      animate: async (i, ctl) => {
        const L = cfg.layers[i];
        if (L.type === 'xyr') return xyr(L, true, ctl);
        if (L.type !== 'sweep') return;
        curRatio = L.ratio || null; const from = L.from === undefined ? last : L.from;
        await run(ctl, ctl.dur * 1.4, u => paint(from + (L.deg - from) * u, ctl)); paint(L.deg, ctl); last = L.deg;
      }
    };
  }

  /* ---------- Venn board: sets with their elements placed in the region they belong to ---------- */
  function vennBoard(host, cfg, opt) {
    const W = cfg.w || 400, H = cfg.h || 250, n = cfg.sets.length;
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'sbt-vsvg', role: 'img', 'aria-label': cfg.alt || 'Venn diagram', preserveAspectRatio: 'xMidYMid meet' }, null);
    host.appendChild(svg);
    const uid = 'vn' + Math.floor(Math.random() * 1e9);
    const cir = n === 1 ? [[200, 122, 82]] : n === 2 ? [[152, 122, 76], [248, 122, 76]] : [[158, 100, 62], [242, 100, 62], [200, 160, 62]];
    const colors = [COL.blue, COL.orange, COL.green];
    const showU = cfg.universe !== undefined && cfg.universe !== null;
    const rect = { x: 8, y: 8, w: W - 16, h: H - 16 };
    // membership signature of a point
    const sig = (x, y) => cir.map(c => (Math.hypot(x - c[0], y - c[1]) < c[2] ? '1' : '0')).join('');
    // items -> signature
    const inSet = (s, it) => s.items.indexOf(it) >= 0;
    const all = [], seen = {};
    cfg.sets.forEach(s => s.items.forEach(it => { if (!seen[it]) { seen[it] = 1; all.push(it); } }));
    (cfg.universe || []).forEach(it => { if (!seen[it]) { seen[it] = 1; all.push(it); } });
    const bySig = {}; all.forEach(it => { const k = cfg.sets.map(s => inSet(s, it) ? '1' : '0').join(''); (bySig[k] = bySig[k] || []).push(it); });
    // sample points of each region, then spread the items with farthest-point sampling
    const pts = {}; for (let x = rect.x + 6; x < rect.x + rect.w - 6; x += 5) for (let y = rect.y + 14; y < rect.y + rect.h - 6; y += 5) { const k = sig(x, y); if (k === '0'.repeat(n) && !showU) continue; (pts[k] = pts[k] || []).push([x, y]); }
    const pos = {};
    Object.keys(bySig).forEach(k => {
      const P = pts[k] || []; const items = bySig[k]; if (!P.length) return;
      const cx = P.reduce((s, p) => s + p[0], 0) / P.length, cy = P.reduce((s, p) => s + p[1], 0) / P.length;
      let first = P[0], best = 1e9; P.forEach(p => { const d = Math.hypot(p[0] - cx, p[1] - cy); if (d < best) { best = d; first = p; } });
      const chosen = [first];
      while (chosen.length < items.length) {
        let far = null, fd = -1; P.forEach(p => { const d = Math.min.apply(null, chosen.map(c => Math.hypot(p[0] - c[0], p[1] - c[1]))); if (d > fd) { fd = d; far = p; } });
        if (!far) break; chosen.push(far);
      }
      items.forEach((it, i) => { pos[it] = chosen[i] || first; });
    });
    if (showU) { el('rect', { x: rect.x, y: rect.y, width: rect.w, height: rect.h, class: 'vcirc', fill: 'none', rx: 6 }, svg); const t = el('text', { x: rect.x + 8, y: rect.y + 14, class: 'vlab' }, svg); t.textContent = 'U'; }
    cir.forEach((c, i) => { el('circle', { cx: c[0], cy: c[1], r: c[2], fill: 'none', stroke: colors[i], 'stroke-width': 2.4 }, svg); const nx = [c[0] + (i === 1 ? 40 : i === 0 ? -40 : 0), c[1] - c[2] - 4 + (i === 2 ? 2 * c[2] + 14 : 0)]; const t = el('text', { x: i === 0 ? c[0] - c[2] * 0.9 : i === 1 ? c[0] + c[2] * 0.9 : c[0], y: i === 2 ? c[1] + c[2] + 12 : c[1] - c[2] + 4, class: 'vlab', fill: colors[i], 'text-anchor': 'middle' }, svg); t.textContent = cfg.sets[i].name; });
    // clip helpers: intersection of "inside" and "outside" constraints by nesting groups
    const clips = [];
    cir.forEach((c, i) => {
      const a = el('clipPath', { id: `${uid}in${i}` }, svg); el('circle', { cx: c[0], cy: c[1], r: c[2] }, a);
      const b = el('clipPath', { id: `${uid}out${i}`, 'clip-rule': 'evenodd' }, svg);
      el('path', { d: `M${rect.x} ${rect.y}H${rect.x + rect.w}V${rect.y + rect.h}H${rect.x}Z M${c[0] - c[2]} ${c[1]}a${c[2]} ${c[2]} 0 1 0 ${2 * c[2]} 0a${c[2]} ${c[2]} 0 1 0 ${-2 * c[2]} 0Z`, 'clip-rule': 'evenodd' }, b);
    });
    const itemEls = {};
    all.forEach(it => { if (!pos[it]) return; const t = el('text', { x: pos[it][0], y: pos[it][1] + 4, class: 'vitem', 'text-anchor': 'middle' }, svg); t.textContent = it; itemEls[it] = t; });
    function region(sigs, color, parent, op) {
      const outer = el('g', {}, parent);
      sigs.forEach(sg => {
        let g = el('g', {}, outer), cur = g;
        sg.split('').forEach((ch, i) => { const nest = el('g', { 'clip-path': `url(#${uid}${ch === '1' ? 'in' : 'out'}${i})` }, cur); cur = nest; });
        el('rect', { x: rect.x, y: rect.y, width: rect.w, height: rect.h, fill: color, opacity: op }, cur);
      });
      return outer;
    }
    const drawn = [];
    function draw(L, i, mode, ctl) {
      if (L.type === 'region' || L.type === 'note') drawn.forEach((gg, k) => { if (gg) { gg.remove(); drawn[k] = null; } });   // one shaded result at a time
      const g = el('g', {}, svg); drawn[i] = g;
      const color = COL[L.color] || L.color || COL.green;
      if (L.type === 'region') {
        const r = region(L.sigs, color, g, 0.32);
        if (L.label) { const t = el('text', { x: 14, y: 22, class: 'vlab', fill: color }, g); t.textContent = L.label; t.style.fontSize = '13px'; }
        (L.items || []).forEach(it => { if (itemEls[it]) itemEls[it].setAttribute('class', 'vitem hot'); });
        if (mode === 'now') return; g.style.opacity = 0;
        return run(ctl, Math.min(ctl.dur, 900), u => { g.style.opacity = u; });
      }
      if (L.type === 'note') { const t = el('text', { x: 14, y: 22, class: 'vlab', fill: color }, g); t.textContent = L.text; if (mode === 'now') return; g.style.opacity = 0; return run(ctl, 500, u => { g.style.opacity = u; }); }
    }
    let lastRes = -1; cfg.layers.forEach((L, i) => { if (L.at < opt.step && (L.type === 'region' || L.type === 'note')) lastRes = i; });
    cfg.layers.forEach((L, i) => { if (L.at < opt.step && (i === lastRes || (L.type !== 'region' && L.type !== 'note'))) draw(L, i, 'now'); });
    return { animate: (i, ctl) => { svg.querySelectorAll('.vitem.hot').forEach(e => e.setAttribute('class', 'vitem')); return draw(cfg.layers[i], i, 'anim', ctl) || Promise.resolve(); }, svg, alt: cfg.alt };
  }

  /* ---------- mapping board: arrows from a domain to a codomain (functions, relations) ---------- */
  function mappingBoard(host, cfg, opt) {
    const W = cfg.w || 400, rows = Math.max(cfg.domain.length, cfg.codomain.length), H = cfg.h || Math.max(170, 54 + rows * 30);
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'sbt-vsvg', role: 'img', 'aria-label': cfg.alt || 'Mapping diagram', preserveAspectRatio: 'xMidYMid meet' }, null);
    host.appendChild(svg);
    const lx = 110, rx = W - 110, oy = 36, step = (H - 60) / Math.max(rows, 1);
    const yOf = (n, i) => oy + (H - 60) / 2 - (n - 1) * step / 2 + i * step + 8;
    [[lx, cfg.domainName || 'A'], [rx, cfg.codomainName || 'B']].forEach(([x, name]) => { el('ellipse', { cx: x, cy: H / 2 + 10, rx: 46, ry: H / 2 - 24, fill: 'none', stroke: 'currentColor', opacity: .55, 'stroke-width': 1.6 }, svg); const t = el('text', { x, y: 20, class: 'vlab', 'text-anchor': 'middle' }, svg); t.textContent = name; });
    const P = (side, list, it) => { const i = list.indexOf(it); return [side === 'l' ? lx : rx, yOf(list.length, i)]; };
    const dEl = {}, cEl = {};
    cfg.domain.forEach((it, i) => { const t = el('text', { x: lx, y: yOf(cfg.domain.length, i) + 4, class: 'vitem', 'text-anchor': 'middle' }, svg); t.textContent = it; dEl[it] = t; });
    cfg.codomain.forEach((it, i) => { const t = el('text', { x: rx, y: yOf(cfg.codomain.length, i) + 4, class: 'vitem', 'text-anchor': 'middle' }, svg); t.textContent = it; cEl[it] = t; });
    const mk = `${'mp' + Math.floor(Math.random() * 1e9)}`;
    const defs = el('defs', {}, svg), ah = el('marker', { id: mk, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto' }, defs); el('path', { d: 'M0 0L10 5L0 10z', fill: 'context-stroke' }, ah);
    function draw(L, i, mode, ctl) {
      const g = el('g', {}, svg); const color = COL[L.color] || L.color || COL.blue;
      if (L.type === 'arrows') {
        L.pairs.forEach(([a, b]) => {
          if (!dEl[a] || !cEl[b]) return; const p = P('l', cfg.domain, a), q = P('r', cfg.codomain, b);
          el('line', { x1: p[0] + 16, y1: p[1], x2: q[0] - 18, y2: q[1], stroke: color, 'stroke-width': 2.2, 'marker-end': `url(#${mk})` }, g);
        });
        (L.mark || []).forEach(([side, it, c2]) => { const t = side === 'l' ? dEl[it] : cEl[it]; if (t) t.setAttribute('fill', COL[c2] || c2); });
        if (L.label) { const t = el('text', { x: W / 2, y: H - 6, class: 'vlab', fill: color, 'text-anchor': 'middle' }, g); t.textContent = L.label; }
        if (mode === 'now') return; g.style.opacity = 0; return run(ctl, Math.min(ctl.dur, 1000), u => { g.style.opacity = u; });
      }
    }
    cfg.layers.forEach((L, i) => { if (L.at < opt.step) draw(L, i, 'now'); });
    return { animate: (i, ctl) => draw(cfg.layers[i], i, 'anim', ctl) || Promise.resolve(), svg, alt: cfg.alt };
  }

  NS.viz = { graph: graphBoard, circle: circleBoard, venn: vennBoard, mapping: mappingBoard };
  NS.compile = tryCompile; NS.equiv = (a, b) => { try { return equiv(a, b); } catch (e) { return false; } };
  NS.vizCss = `.sbt-viz{display:block;max-width:440px}.sbt-vsvg{width:100%;height:auto;display:block;color:inherit}
.sbt-vsvg .vg{stroke:currentColor;opacity:.12;stroke-width:1}.sbt-vsvg .vax{stroke:currentColor;opacity:.6;stroke-width:1.5}.sbt-vsvg .vt{fill:currentColor;opacity:.6;font-size:9px}
.sbt-vsvg .vlab{font-size:11px;font-weight:700}.sbt-vsvg .vcurve{stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}.sbt-vsvg .vcurve.ghost{opacity:.45;stroke-width:1.8;stroke-dasharray:5 4}
.sbt-vsvg .vitem{fill:currentColor;font-size:12px;font-weight:600}.sbt-vsvg .vitem.hot{fill:#16a34a;font-size:14px;font-weight:800}
.sbt-vsvg .vseg{stroke-width:2.4;stroke-linecap:round}.sbt-vsvg .vseg.dash{stroke-dasharray:4 3}.sbt-vsvg .vcirc{stroke:currentColor;opacity:.7;stroke-width:1.8}`;
  if (typeof module !== 'undefined' && module.exports) module.exports = { compile: tryCompile, equiv: NS.equiv, normalise };
})(typeof window !== 'undefined' ? window : globalThis);
