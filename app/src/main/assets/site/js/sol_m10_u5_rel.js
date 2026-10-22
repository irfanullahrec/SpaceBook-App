/* Class 10 Mathematics, Unit 5, Exercises 5.4, 5.5 and Review Exercise 5 (relations and functions): hand-written worked solutions with
 * mapping diagrams. Every classification is computed from the pairs (SBSOL_REL) and compared with the book's printed answer. */
(function (root) {
  'use strict';
  const NS = root.SBVR, REL = root.SBSOL_REL; if (!NS || !NS.sol || !REL) return;
  const pr = s => { const o = []; String(s).replace(/\(([^,()]+),([^,()]+)\)/g, (m, a, b) => { o.push([a.trim(), b.trim()]); return m; }); return o; };
  const lit = REL.lit, pl = REL.pairLit;
  const prod = (A, B) => { const o = []; A.forEach(x => B.forEach(y => o.push([x, y]))); return o; };
  const subset = (R, A, B) => R.every(p => A.indexOf(p[0]) >= 0 && B.indexOf(p[1]) >= 0);
  const warn = m => { if (root.console) console.warn('sol_m10_u5_rel: ' + m); };
  const FN = 'A function gives every element of the domain exactly one image. One-one: no image is used twice. Onto: the range is the whole codomain.';

  /* ---------- Exercise 5.4 ---------- */
  (function () {
    const A = ['1', '2', '3'], B = ['4', '5'], AB = prod(A, B), BA = prod(B, A), AA = prod(A, A), BB = prod(B, B);
    const ex = { i: ['', '(1,4)', '(1,4),(2,5)'].map(pr), ii: ['', '(4,1)', '(4,1),(5,2)'].map(pr).concat([BA]), iii: ['', '(1,1)', '(1,2),(2,1)', '(1,1),(2,2),(3,3)'].map(pr), iv: ['', '(4,5)'].map(pr) };
    const ok = subset(ex.i[2], A, B) && ex.i.every(r => subset(r, A, B)) && ex.ii.every(r => subset(r, B, A)) && ex.iii.every(r => subset(r, A, A)) && ex.iv.every(r => subset(r, B, B));
    if (!ok) return warn('Ex 5.4 Q1 examples are not subsets of the products');
    const L = r => r.length ? pl(r) : '∅';
    NS.sol.add({ q: 'If A={1,2,3} and B={4,5}, write (i) three relations from A to B', steps: [
      'A relation from one set to another is any subset of their Cartesian product. A×B has 3×2 = 6 ordered pairs: A×B = ' + pl(AB) + '.',
      '(i) Three relations from A to B: R₁ = ' + L(ex.i[0]) + '; R₂ = ' + L(ex.i[1]) + '; R₃ = ' + L(ex.i[2]) + '. Each is a subset of A×B.',
      '(ii) For relations from B to A use B×A = ' + pl(BA) + '. Four of them: S₁ = ' + L(ex.ii[0]) + '; S₂ = ' + L(ex.ii[1]) + '; S₃ = ' + L(ex.ii[2]) + '; S₄ = B×A.',
      '(iii) Relations on A are subsets of A×A. Four of them: T₁ = ' + L(ex.iii[0]) + '; T₂ = ' + L(ex.iii[1]) + '; T₃ = ' + L(ex.iii[2]) + '; T₄ = ' + L(ex.iii[3]) + '.',
      '(iv) Relations on B are subsets of B×B = ' + pl(BB) + '. Two of them: U₁ = ' + L(ex.iv[0]) + '; U₂ = ' + L(ex.iv[1]) + '.'] });
  })();

  (function () {
    const A = ['1', '2', '3', '4'], B = ['1', '3', '5'], R = []; const rows = [];
    A.forEach(x => { const ys = B.filter(y => +y < +x); ys.forEach(y => R.push([x, y])); rows.push('x = ' + x + ': y < ' + x + ' gives ' + (ys.length ? 'y = ' + ys.join(' and ') : 'no value of y in B')); });
    if (pl(R) !== '{(2,1),(3,1),(4,1),(4,3)}') return warn('Ex 5.4 Q2 computed ' + pl(R));
    NS.sol.add({ q: 'Let A={1,2,3,4}, B={1,3,5}, R={(x,y)|y<x} from A to B. Find R.', steps: [
      'R is the set of pairs (x, y) with x in A, y in B and y < x. Test every x in A against the members of B = {1,3,5}.', rows.join('. ') + '.',
      'R = ' + pl(R) + '.'],
      board: { kind: 'mapping', alt: 'Arrows for the relation y < x from A to B', domain: A, codomain: B, domainName: 'A', codomainName: 'B', from: 1, to: 2, layers: [{ at: 2, type: 'arrows', pairs: R, color: 'blue', label: 'R: y < x' }] } });
  })();

  (function () {
    const D = [0, 4, 8], Y = D.map(x => 2 * x);
    if (Y.join() !== '0,8,16') return warn('Ex 5.4 Q3');
    NS.sol.add({ q: 'Find the range of R={(x,y)|y=2x} when the domain is {0,4,8}.', steps: [
      'The range is the set of all values y = 2x for x in the domain. Substitute each domain value.',
      'x = 0: y = 2(0) = 0.', 'x = 4: y = 2(4) = 8.', 'x = 8: y = 2(8) = 16.', 'Range = {0,8,16}.'],
      board: { kind: 'mapping', alt: 'Arrows from the domain to the range for y = 2x', domain: ['0', '4', '8'], codomain: ['0', '8', '16'], domainName: 'Domain', codomainName: 'Range', from: 1, to: 4, layers: [{ at: 1, type: 'arrows', pairs: [['0', '0']], color: 'blue' }, { at: 2, type: 'arrows', pairs: [['4', '8']], color: 'blue' }, { at: 3, type: 'arrows', pairs: [['8', '16']], color: 'blue' }] } });
  })();

  (function () {
    const ys = [1, 2, 3, 4, 5].map(x => 2 * x * x - 1);
    if (ys.join() !== '1,7,17,31,49') return warn('Ex 5.4 Q4');
    NS.sol.add({ q: 'The relation R={(x,y)|y+1=2x²} has domain N. Find its range.', steps: [
      'Solve for y: y + 1 = 2x², so y = 2x² − 1. The domain N = {1,2,3,…} (the book uses the positive natural numbers).',
      'x = 1: y = 2(1)² − 1 = 1.', 'x = 2: y = 2(2)² − 1 = 7.', 'x = 3: y = 2(3)² − 1 = 17.', 'x = 4: y = 2(4)² − 1 = 31.', 'x = 5: y = 2(5)² − 1 = 49.',
      'Range = {1,7,17,31,49,…}, the numbers of the form 2x² − 1.'] });
  })();

  /* ---------- Exercise 5.5 ---------- */
  REL.add({ q: 'Let A={1,2,3,4}, B={6,7}. Classify R₁={(1,6),(2,7),(3,6)}', pre: FN, domain: ['1', '2', '3', '4'], codomain: ['6', '7'], items: [
    { lab: '', name: 'R₁', pairs: pr('(1,6),(2,7),(3,6)'), expect: { fn: false } }, { lab: '', name: 'R₂', pairs: pr('(1,6),(2,6),(3,7),(4,7)'), expect: { fn: true, one: false, onto: true } },
    { lab: '', name: 'R₃', pairs: pr('(1,6),(2,6),(3,6),(4,6)'), expect: { fn: true, one: false, onto: false } }] });

  REL.add({ q: 'For the relations on {a,b,c,d}, state which are functions and classify them', pre: FN, domain: ['a', 'b', 'c', 'd'], codomain: ['a', 'b', 'c', 'd'], items: [
    { lab: '(i)', name: 'R', pairs: pr('(a,b),(c,d),(b,d),(d,b)'), expect: { fn: true, one: false, onto: false } },
    { lab: '(ii)', name: 'R', pairs: pr('(b,a),(c,b),(a,b),(d,d)'), expect: { fn: true, one: false, onto: false } },
    { lab: '(iii)', name: 'R', pairs: pr('(d,c),(c,b),(a,b),(d,d)'), expect: { fn: false } },
    { lab: '(iv)', name: 'R', pairs: pr('(a,b),(b,c),(c,b),(d,a)'), expect: { fn: true, one: false, onto: false }, discrepancy: true, printed: 'function, many-one onto' }] });

  REL.add({ q: 'A={0,1,2,3}, B={x,y,z,p}. Decide whether each relation is a one-one correspondence', pre: 'A one-one correspondence uses every element of A exactly once and reaches every element of B exactly once (one-one and onto).', domain: ['0', '1', '2', '3'], codomain: ['x', 'y', 'z', 'p'], items: [
    { lab: '(i)', name: 'R', pairs: pr('(0,x),(2,z),(3,y),(1,p)'), expect: { fn: true, one: true, onto: true } }, { lab: '(ii)', name: 'R', pairs: pr('(0,x),(1,z),(2,y),(3,z)'), expect: { fn: true, one: false, onto: false } }] });

  REL.add({ q: 'A={a,b,c}, B={2,3,4,5}. Classify (i)', pre: FN, domain: ['a', 'b', 'c'], codomain: ['2', '3', '4', '5'], items: [
    { lab: '(i)', name: 'R', pairs: pr('(a,2),(b,3),(c,4)'), expect: { fn: true, one: true, onto: false } }, { lab: '(ii)', name: 'R', pairs: pr('(a,3),(b,4),(c,3)'), expect: { fn: true, one: false, onto: false } }],
    post: 'Neither relation is a one-one correspondence: B has four elements but A has only three, so no function from A to B can be onto.' });

  REL.add({ q: 'For X={1,2,3,4} and Y={5,6,7,8}, give examples of', pre: 'Each example below is checked against the definition.', domain: ['1', '2', '3', '4'], codomain: ['5', '6', '7', '8'], domainName: 'X', codomainName: 'Y', items: [
    { lab: '(i) A function X→Y:', name: 'f₁', pairs: pr('(1,5),(2,5),(3,5),(4,5)'), expect: { fn: true } },
    { lab: '(ii) A one-one function X→Y:', name: 'f₂', pairs: pr('(1,5),(2,6),(3,7),(4,8)'), expect: { fn: true, one: true } },
    { lab: '(iii) A one-one correspondence X→Y:', name: 'f₃', pairs: pr('(1,5),(2,6),(3,7),(4,8)'), expect: { fn: true, one: true, onto: true } },
    { lab: '(iv) An onto function Y→X:', name: 'g₁', domain: ['5', '6', '7', '8'], codomain: ['1', '2', '3', '4'], domainName: 'Y', codomainName: 'X', pairs: pr('(5,1),(6,2),(7,3),(8,4)'), expect: { fn: true, onto: true } },
    { lab: '(v) A bijection Y→X:', name: 'g₂', domain: ['5', '6', '7', '8'], codomain: ['1', '2', '3', '4'], domainName: 'Y', codomainName: 'X', pairs: pr('(5,1),(6,2),(7,3),(8,4)'), expect: { fn: true, one: true, onto: true } },
    { lab: '(vi) A function X→Y that is neither one-one nor onto:', name: 'f₄', pairs: pr('(1,5),(2,5),(3,6),(4,6)'), expect: { fn: true, one: false, onto: false } }] });

  REL.add({ q: 'For A={1,2,3,4,5}, classify each relation as a function, give its range', pre: FN, domain: ['1', '2', '3', '4', '5'], codomain: ['1', '2', '3', '4', '5'], domainName: 'A', codomainName: 'A', items: [
    { lab: '(i)', name: 'R', pairs: pr('(1,5),(2,3),(3,3),(4,2),(5,1)'), expect: { fn: true, onto: false } }, { lab: '(ii)', name: 'R', pairs: pr('(1,1),(2,4),(3,2),(4,1),(5,3)'), expect: { fn: true, onto: false } },
    { lab: '(iii)', name: 'R', pairs: pr('(1,2),(2,1),(3,1),(4,4),(5,5)'), expect: { fn: true, onto: false } }] });

  /* ---------- Review Exercise 5 ---------- */
  REL.add({ q: 'A={1,2,3}, B={4,5}, R={(1,4),(2,5),(3,4)}. Choose the correct description.', pre: FN, domain: ['1', '2', '3'], codomain: ['4', '5'], items: [
    { lab: '', name: 'R', pairs: pr('(1,4),(2,5),(3,4)'), expect: { fn: true, one: false, onto: true } }], post: 'So the correct description is: an onto function from A to B (and not one-one).' });

  NS.sol.add({ q: 'If n(A)=2 and n(B)=3, how many binary relations are there from A to B?', steps: [
    'A binary relation from A to B is any subset of A×B.', 'n(A×B) = n(A) × n(B) = 2 × 3 = 6.',
    'A set with 6 elements has 2⁶ subsets, so the number of relations = 2⁶ = 64.'] });

  (function () {
    const sets = { a: [['0', '1', '2', '3'], ['3', '2', '1', '0']], b: [['0', '3', '6', '9'], ['9', '16', '25', '36']], c: [['0', '2', '4', '6'], ['2', '4', '6', '8']], d: [['0', '4', '8', '12'], ['6', '10', '14', '18']] };
    const common = k => sets[k][0].filter(x => sets[k][1].indexOf(x) >= 0);
    if (!(common('a').length && common('b').length && common('c').length && !common('d').length)) return warn('Review Q1(iii)');
    NS.sol.add({ q: 'Which pair of sets is disjoint? (a)', steps: [
      'Two sets are disjoint when they have no element in common (their intersection is empty). Find the common elements of each pair.',
      '(a) {0,1,2,3} ∩ {3,2,1,0} = {0,1,2,3}, not empty.', '(b) {0,3,6,9} ∩ {9,16,25,36} = {9}, not empty.', '(c) {0,2,4,6} ∩ {2,4,6,8} = {2,4,6}, not empty.',
      '(d) {0,4,8,12} ∩ {6,10,14,18} = ∅, so the pair in (d) is disjoint. Answer: (d).'] });
  })();

  (function () {
    const U = []; for (let i = 1; i < 30; i += 2) U.push(i); const Rr = [1, 5, 7], Ss = [1, 3, 7, 11, 13], I = Rr.filter(x => Ss.indexOf(x) >= 0);
    if (U.length !== 15 || I.join() !== '1,7' || U.length - I.length !== 13) return warn('Review Q1(iv)');
    NS.sol.add({ q: 'U is the positive odd integers less than 30, R={1,5,7}, S={1,3,7,11,13}. Find n((R∩S)′).', steps: [
      'U = {1,3,5,…,29}: the odd numbers from 1 to 29 are 15 in all, so n(U) = 15.', 'R∩S = {1,5,7} ∩ {1,3,7,11,13} = {1,7}, so n(R∩S) = 2.',
      'The complement holds the elements of U that are not in R∩S: n((R∩S)′) = n(U) − n(R∩S) = 15 − 2 = 13.'] });
  })();

  NS.sol.add({ q: 'For f:A→B, what condition makes f onto?', steps: [
    'A function f: A→B is onto when every element of the codomain B is the image of at least one element of A.',
    'In symbols: Ran(f) = B, where Ran(f) = {f(x) | x in A} is the range of f. (If the range is smaller than B, some element of B is never reached and f is into.)'] });

  (function () {
    const R = pr('(0,0),(8,2),(10,3),(14,12)'), dom = R.map(p => p[0]);
    if (dom.join() !== '0,8,10,14') return warn('Review Q1(vi)');
    NS.sol.add({ q: 'Find Dom(R) for R={(0,0),(8,2),(10,3),(14,12)}.', steps: [
      'The domain of a relation is the set of all first coordinates of its ordered pairs.', 'The first coordinates are 0, 8, 10 and 14.', 'Dom(R) = {0,8,10,14}.'] });
  })();

  REL.add({ q: 'For A={−2,−1,0,1,2}, B={a,b,c,d,e}, classify the relations', pre: FN, domain: ['-2', '-1', '0', '1', '2'], codomain: ['a', 'b', 'c', 'd', 'e'], items: [
    { lab: '(i)', name: 'R', pairs: pr('(-2,a),(-1,a),(0,b),(1,c),(2,d)'), expect: { fn: true, one: false, onto: false } }, { lab: '(ii)', name: 'R', pairs: pr('(-1,a),(1,e),(-2,d),(0,c),(2,b)'), expect: { fn: true, one: true, onto: true } },
    { lab: '(iii)', name: 'R', pairs: pr('(2,d),(0,a),(-2,b),(-1,c),(1,e)'), expect: { fn: true, one: true, onto: true } }, { lab: '(iv)', name: 'R', pairs: pr('(-2,b),(-1,b),(0,a),(1,d),(-2,e)'), expect: { fn: false } }] });

  REL.add({ q: 'For A={1,2,3,4,5}, classify the relations: (i)', pre: FN, domain: ['1', '2', '3', '4', '5'], codomain: ['1', '2', '3', '4', '5'], domainName: 'A', codomainName: 'A', items: [
    { lab: '(i)', name: 'R', pairs: pr('(1,5),(2,3),(3,3),(4,2),(5,1)'), expect: { fn: true, onto: false } }, { lab: '(ii)', name: 'R', pairs: pr('(1,1),(2,4),(3,2),(4,1),(5,3)'), expect: { fn: true, onto: false } },
    { lab: '(iii)', name: 'R', pairs: pr('(1,2),(2,1),(3,1),(4,4),(5,5)'), expect: { fn: true, onto: false } }, { lab: '(iv)', name: 'R', pairs: pr('(1,2),(2,3),(1,4),(3,5)'), expect: { fn: false } }] });

  REL.add({ q: 'Let X={−6,−5,−4,−3}, Y={1,2,3,4}. Give examples of', pre: 'X and Y both have four elements, so a function X→Y that is one-one is also onto, and an onto function is also one-one.', domain: ['-6', '-5', '-4', '-3'], codomain: ['1', '2', '3', '4'], domainName: 'X', codomainName: 'Y', items: [
    { lab: '(i) A one-one function:', name: 'f₁', pairs: pr('(-6,1),(-5,2),(-4,3),(-3,4)'), expect: { fn: true, one: true } }, { lab: '(ii) An onto function:', name: 'f₂', pairs: pr('(-6,2),(-5,1),(-4,4),(-3,3)'), expect: { fn: true, onto: true } },
    { lab: '(iii) A bijection:', name: 'f₃', pairs: pr('(-6,4),(-5,3),(-4,2),(-3,1)'), expect: { fn: true, one: true, onto: true } }, { lab: '(iv) Neither one-one nor onto:', name: 'f₄', pairs: pr('(-6,1),(-5,1),(-4,2),(-3,2)'), expect: { fn: true, one: false, onto: false } }] });

  REL.add({ q: 'The printed project asks whether switching the x- and y-values in a relation preserves function status.', pre: 'Switching the coordinates of every pair gives the inverse relation. Take R = {(-2,1),(-1,2),(0,3),(2,4)}.', domain: ['-2', '-1', '0', '2'], codomain: ['1', '2', '3', '4'], domainName: 'Dom R', codomainName: 'Ran R', items: [
    { lab: '', name: 'R', pairs: pr('(-2,1),(-1,2),(0,3),(2,4)'), expect: { fn: true, one: true, onto: true } },
    { lab: 'Switch each pair:', name: 'R⁻¹', domain: ['1', '2', '3', '4'], codomain: ['-2', '-1', '0', '2'], domainName: 'Dom R⁻¹', codomainName: 'Ran R⁻¹', pairs: pr('(1,-2),(2,-1),(3,0),(4,2)'), expect: { fn: true, one: true, onto: true } }],
    post: 'R is one-one, so no output is repeated; after switching, the outputs become inputs and each input still has exactly one image. The inverse of a one-one function is again a function.' });
})(typeof window !== 'undefined' ? window : globalThis);
