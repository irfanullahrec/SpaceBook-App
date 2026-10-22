/* Hand-written solutions with Venn boards: Class 10 Mathematics, Unit 5 "Sets and Functions" (Exercises 5.1-5.3 and Review).
 * Every set operation is COMPUTED here from the sets in the question (so the written steps cannot contain an arithmetic slip) and the
 * result is compared with the book's printed answer: a part that disagrees is reported with console.warn and is not used.
 * Usage: SBSOL_SETS.pack({ q, sets, U, intro, parts:[{ lab, expr, expect }], verify:[...] , outro }) */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.sol) return;
  const warn = m => { if (root.console) console.warn('sol_sets: ' + m); };

  /* ---------- tiny set-expression parser:  A∪B  A∩(B∪C)  A\B  A′  (A∪B)′  ∅  U ---------- */
  function parse(src) {
    const t = []; for (const ch of String(src).replace(/\s+/g, '')) t.push(ch);
    let i = 0;
    const peek = () => t[i];
    const atom = () => {
      const c = t[i++];
      if (c === '(') { const e = expr(); if (t[i++] !== ')') throw new Error('paren'); return e; }
      if (c === '∅') return { k: 'empty' };
      if (/[A-Z]/.test(c)) return { k: 'name', n: c };
      throw new Error('atom ' + c);
    };
    const factor = () => { let a = atom(); while (peek() === '′' || peek() === "'") { i++; a = { k: 'not', a }; } return a; };
    const term = () => { let l = factor(); while (peek() === '∩') { i++; l = { k: 'and', l, r: factor() }; } return l; };
    const expr = () => { let l = term(); while (peek() === '∪' || peek() === '\\') { const o = t[i++]; l = { k: o === '∪' ? 'or' : 'diff', l, r: term() }; } return l; };
    const e = expr(); if (i < t.length) throw new Error('rest'); return e;
  }
  const show = ast => {
    switch (ast.k) {
      case 'name': return ast.n; case 'empty': return '∅';
      case 'not': return (ast.a.k === 'name' || ast.a.k === 'empty' ? show(ast.a) : '(' + show(ast.a) + ')') + '′';
      case 'and': return sub(ast.l, 'and') + '∩' + sub(ast.r, 'and');
      case 'or': return show(ast.l) + '∪' + sub(ast.r, 'or');
      case 'diff': return show(ast.l) + '\\' + sub(ast.r, 'diff');
    }
  };
  const sub = (a, parent) => (a.k === 'name' || a.k === 'empty' || a.k === 'not' || (parent === 'or' && a.k === 'and') ? show(a) : '(' + show(a) + ')');

  function makeEnv(sets, U) {
    const order = (U || []).slice();
    Object.keys(sets).forEach(k => sets[k].forEach(x => { if (order.indexOf(x) < 0) order.push(x); }));
    const allNum = order.every(x => /^-?\d+(\.\d+)?$/.test(String(x)));
    if (allNum) order.sort((a, b) => a - b);
    const idx = x => order.indexOf(x);
    const sorted = arr => arr.slice().sort((a, b) => idx(a) - idx(b));
    return { sets, U, order, sorted };
  }
  function evalSet(ast, env) {
    const { sets, U } = env;
    switch (ast.k) {
      case 'empty': return [];
      case 'name': if (ast.n === 'U' && U) return U.slice(); if (!sets[ast.n]) throw new Error('unknown ' + ast.n); return sets[ast.n].slice();
      case 'not': { if (!U) throw new Error('no universe'); const a = evalSet(ast.a, env); return U.filter(x => a.indexOf(x) < 0); }
      case 'and': { const l = evalSet(ast.l, env), r = evalSet(ast.r, env); return l.filter(x => r.indexOf(x) >= 0); }
      case 'or': { const l = evalSet(ast.l, env), r = evalSet(ast.r, env); return l.concat(r.filter(x => l.indexOf(x) < 0)); }
      case 'diff': { const l = evalSet(ast.l, env), r = evalSet(ast.r, env); return l.filter(x => r.indexOf(x) < 0); }
    }
  }
  function evalMem(ast, mem) {                     // membership of one element, given which sets it is in
    switch (ast.k) {
      case 'empty': return false; case 'name': return ast.n === 'U' ? true : !!mem[ast.n];
      case 'not': return !evalMem(ast.a, mem); case 'and': return evalMem(ast.l, mem) && evalMem(ast.r, mem);
      case 'or': return evalMem(ast.l, mem) || evalMem(ast.r, mem); case 'diff': return evalMem(ast.l, mem) && !evalMem(ast.r, mem);
    }
  }
  const lit = (env, arr) => arr.length ? '{' + env.sorted(arr).join(',') + '}' : '∅';
  const sameSet = (a, b) => a.length === b.length && a.every(x => b.indexOf(x) >= 0);

  /* the written clauses for one expression, bottom-up: complements first, then the operation with its operands written out */
  function clauses(ast, env) {
    const out = [];
    const walk = a => {
      if (a.k === 'name' || a.k === 'empty') return;
      if (a.k === 'not') { walk(a.a); const inner = evalSet(a.a, env), v = evalSet(a, env); out.push(show(a) + ' = U∖' + (a.a.k === 'name' ? a.a.n : '(' + show(a.a) + ')') + ' = ' + (env.U.length <= 12 ? '{' + env.sorted(env.U).join(',') + '}∖' + lit(env, inner) + ' = ' : '') + lit(env, v)); return; }
      walk(a.l); walk(a.r);
      const l = evalSet(a.l, env), r = evalSet(a.r, env), v = evalSet(a, env), op = a.k === 'and' ? '∩' : a.k === 'or' ? '∪' : '\\';
      out.push(show(a) + ' = ' + lit(env, l) + ' ' + op + ' ' + lit(env, r) + ' = ' + lit(env, v));
    };
    walk(ast); return out;
  }
  const parseExpect = (s, env) => { s = String(s).trim(); if (s[0] === '{') return s.slice(1, -1).split(',').map(x => x.trim()).filter(Boolean); if (s === '∅') return []; return evalSet(parse(s), env); };

  /* region signatures (over the drawn sets) where the expression is true, e.g. ['10','11'] */
  function sigsOf(ast, names) {
    const out = []; const n = names.length;
    for (let m = 0; m < (1 << n); m++) { const mem = {}; let sg = ''; names.forEach((nm, i) => { const on = !!(m & (1 << (n - 1 - i))); mem[nm] = on; sg += on ? '1' : '0'; }); if (evalMem(ast, mem)) out.push(sg); }
    return out;
  }

  /* ---------- the pack builder ---------- */
  function group(d, steps, boards, qLabel) {
    d.sets = d.sets || {};
    const names = Object.keys(d.sets);
    const env = makeEnv(d.sets, d.U || null);
    const drawable = names.length >= 1 && names.length <= 3 && Object.values(d.sets).every(a => a.length <= 14) && !d.noBoard && (!d.U || d.U.length <= 24);
    const layers = []; const from = steps.length;
    if (d.intro) steps.push(d.intro);
    const addPart = p => {
      let ast; try { ast = parse(p.expr); } catch (e) { warn('cannot parse ' + p.expr); return false; }
      let res; try { res = evalSet(ast, env); } catch (e) { warn('cannot evaluate ' + p.expr + ' (' + e.message + ')'); return false; }
      if (p.expect !== undefined) { let ex; try { ex = parseExpect(p.expect, env); } catch (e) { ex = null; } if (!ex || !sameSet(ex, res)) { warn(qLabel + ' ' + (p.lab || '') + ' ' + p.expr + ': computed ' + lit(env, res) + ' but the book prints ' + p.expect); return false; } }
      steps.push((p.lab ? p.lab + ' ' : '') + clauses(ast, env).join('; ') + '.' + (p.note ? ' ' + p.note : ''));
      if (drawable) layers.push({ at: steps.length - 1, type: 'region', sigs: sigsOf(ast, names), color: p.color || 'green', label: show(ast) + ' = ' + lit(env, res), items: res });
      return true;
    };
    for (const p of d.parts || []) if (!addPart(p)) return false;
    for (const v of d.verify || []) {              // both sides of a law, then the comparison
      let l, r; try { l = parse(v.l); r = parse(v.r); } catch (e) { warn('cannot parse law ' + v.l); return false; }
      const a = evalSet(l, env), b = evalSet(r, env);
      if (!sameSet(a, b)) { warn(qLabel + ' ' + (v.lab || '') + ': the two sides differ (' + lit(env, a) + ' vs ' + lit(env, b) + ')'); return false; }
      if (v.expect !== undefined) { const ex = parseExpect(v.expect, env); if (!sameSet(ex, a)) { warn(qLabel + ' ' + (v.lab || '') + ': computed ' + lit(env, a) + ' but the book prints ' + v.expect); return false; } }
      const lc = clauses(l, env), rc = clauses(r, env), lab = v.lab ? v.lab + ' ' : '';
      steps.push(lab + 'Left side: ' + lc.join('; ') + '.');
      if (drawable) layers.push({ at: steps.length - 1, type: 'region', sigs: sigsOf(l, names), color: 'blue', label: show(l) + ' = ' + lit(env, a), items: a });
      steps.push(lab + 'Right side: ' + rc.join('; ') + '.');
      if (drawable) layers.push({ at: steps.length - 1, type: 'region', sigs: sigsOf(r, names), color: 'orange', label: show(r) + ' = ' + lit(env, b), items: b });
      steps.push(lab + 'Both sides are ' + lit(env, a) + ', so ' + show(l) + ' = ' + show(r) + ' is verified.');
    }
    (d.text || []).forEach(t => steps.push(t));
    if (d.outro) steps.push(d.outro);
    if (drawable) boards.push({ kind: 'venn', alt: 'Venn diagram of ' + names.join(', '), universe: d.U || null, sets: names.map(n => ({ name: n, items: d.sets[n] })), layers, from, to: steps.length - 1 });
    return true;
  }
  function pack(d) {
    const steps = [], boards = [];
    if (d.pre) steps.push(d.pre);
    const gs = d.groups || [d];
    for (const g of gs) { if (!group(g, steps, boards, d.q.slice(0, 40) + (g.lab ? ' ' + g.lab : ''))) return null; }
    if (d.post) steps.push(d.post);
    return { q: d.q, steps, board: boards.length ? (boards.length === 1 ? boards[0] : boards) : null };
  }
  function add(d) { const p = pack(d); if (p) NS.sol.add(p); else warn('not registered: ' + d.q.slice(0, 50)); }
  root.SBSOL_SETS = { pack, add, parse, evalSet, makeEnv, lit, show, sigsOf, clauses, sameSet };
})(typeof window !== 'undefined' ? window : globalThis);
