/* Class 10 Mathematics, Unit 5, Exercises 5.1, 5.2, 5.3 and Review Exercise 5 (set questions): hand-written worked solutions.
 * Each step is generated from the sets in the question by SBSOL_SETS and checked against the printed answer. */
(function (root) {
  'use strict';
  const S = root.SBSOL_SETS; if (!S) return;
  const R = (a, b, skip) => { const o = []; for (let i = a; i <= b; i++) if (!(skip || []).includes(i)) o.push(String(i)); return o; };
  const L = arr => '{' + arr.join(',') + '}';
  const ch = (a, b) => { const o = []; for (let c = a.charCodeAt(0); c <= b.charCodeAt(0); c++) o.push(String.fromCharCode(c)); return o; };
  const UNION = 'Union (∪) collects every element that is in either set, written once. Intersection (∩) keeps only the elements that are in both sets.';
  const DIFF = 'A∖B means the elements of A that are not in B. Reverse the roles for B∖A.';
  const COMP = 'The complement A′ is every element of the universal set U that is not in A.';
  const DM = 'De Morgan’s laws: (A∪B)′ = A′∩B′ and (A∩B)′ = A′∪B′.';

  /* ---------- Exercise 5.1 ---------- */
  S.add({ q: 'If A={1,2,3}, B={0,1} and C={1,3,4}, find (i) A∪B, (ii) A∩B', intro: UNION,
    sets: { A: ['1', '2', '3'], B: ['0', '1'], C: ['1', '3', '4'] },
    parts: [{ lab: '(i)', expr: 'A∪B', expect: '{0,1,2,3}' }, { lab: '(ii)', expr: 'A∩B', expect: '{1}' }, { lab: '(iii)', expr: 'A∪C', expect: '{1,2,3,4}' },
      { lab: '(iv)', expr: 'A∩C', expect: '{1,3}' }, { lab: '(v)', expr: 'B∪C', expect: '{0,1,3,4}' }, { lab: '(vi)', expr: 'A∩A', expect: '{1,2,3}', note: 'A set shares all its elements with itself, and an element is written only once.' }] });

  S.add({ q: 'Find A\\B and B\\A for (i) A={1,3,5,7}', pre: DIFF,
    groups: [
      { lab: '(i)', sets: { A: ['1', '3', '5', '7'], B: ['3', '4', '5', '6', '7', '8'] }, parts: [{ lab: '(i)', expr: 'A\\B', expect: '{1}' }, { lab: '', expr: 'B\\A', expect: '{4,6,8}' }] },
      { lab: '(ii)', sets: { A: ['0', '1', '-1', '2', '-2', '3', '-3'], B: ['-1', '-2', '-3'] }, parts: [{ lab: '(ii)', expr: 'A\\B', expect: '{0,1,2,3}' }, { lab: '', expr: 'B\\A', expect: '∅', note: 'Every element of B is also in A, so nothing is left.' }] }
    ],
    post: '(iii) A = {1,2,3,…} and B = {1,3,5,7,…}. A∖B = {1,2,3,…} ∖ {1,3,5,7,…} = {2,4,6,8,…}; B∖A = {1,3,5,7,…} ∖ {1,2,3,…} = ∅, because every odd number is already in A.' });

  S.add({ q: 'If U={1,2,…,20}, A={2,4,…,20}, B={1,3,…,19}, C=∅, find', intro: COMP + ' Here A is the even numbers and B the odd numbers up to 20, so together they make up U and share nothing.',
    U: R(1, 20), sets: { A: R(1, 20).filter(x => x % 2 === 0), B: R(1, 20).filter(x => x % 2 === 1), C: [] },
    parts: [{ lab: '(i)', expr: 'A′', expect: 'B' }, { lab: '(ii)', expr: 'B′', expect: 'A' }, { lab: '(iii)', expr: 'C′', expect: 'U' }, { lab: '(iv)', expr: 'A′∪B′', expect: 'U' }, { lab: '(v)', expr: 'A′∩B′', expect: '∅' },
      { lab: '(vi)', expr: 'A′∩B', expect: 'B' }, { lab: '(vii)', expr: 'A′∪C′', expect: 'U' }, { lab: '(viii)', expr: 'A∩C′', expect: 'A' }, { lab: '(ix)', expr: 'C′∩C', expect: '∅' }, { lab: '(x)', expr: 'B′∪C′', expect: 'U' }] });

  S.add({ q: 'Let U be the natural numbers up to 15, A the even numbers up to 15, and B the odd numbers up to 15.', intro: COMP + ' A (evens) and B (odds) together fill U and have nothing in common.',
    U: R(1, 15), sets: { A: R(1, 15).filter(x => x % 2 === 0), B: R(1, 15).filter(x => x % 2 === 1) },
    parts: [{ lab: '(i)', expr: 'A′∪B′', expect: 'U' }, { lab: '(ii)', expr: 'A′∩B′', expect: '∅' }, { lab: '(iii)', expr: 'U′', expect: '∅' }, { lab: '(iv)', expr: '∅′', expect: 'U' },
      { lab: '(v)', expr: 'B∩A′', expect: 'B' }, { lab: '(vi)', expr: 'B∪B′', expect: 'U' }, { lab: '(vii)', expr: 'A∩A′', expect: '∅' }, { lab: '(viii)', expr: 'A∪B′', expect: 'A' }] });

  /* ---------- Exercise 5.2 ---------- */
  S.add({ q: 'Verify the commutative properties for (i) A={1,2,…,12}', pre: 'Commutative properties: A∪B = B∪A and A∩B = B∩A (the order of the two sets does not matter).',
    groups: [
      { lab: '(i)', sets: { A: R(1, 12), B: ['2', '4', '5', '8', '10', '12'] }, verify: [{ lab: '(i)', l: 'A∪B', r: 'B∪A', expect: L(R(1, 12)) }, { lab: '(i)', l: 'A∩B', r: 'B∩A', expect: '{2,4,5,8,10,12}' }] },
      { lab: '(ii)', sets: {}, text: ['(ii) A = N = {1,2,3,…} and B = {2,4,6,…}. Every even number is a natural number, so B ⊂ A. Then A∪B = N = B∪A, and A∩B = B = B∩A.'] },
      { lab: '(iii)', sets: { A: ['2', '3', '5', '7', '11', '13', '17', '19', '23', '29'], B: ['4', '6', '8', '9', '10', '12', '14', '15', '16', '18'] },
        verify: [{ lab: '(iii)', l: 'A∪B', r: 'B∪A', expect: '{2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,23,29}' }, { lab: '(iii)', l: 'A∩B', r: 'B∩A', expect: '∅' }], text: [] }
    ] });

  S.add({ q: 'Verify associativity for (i) A={a,…,z}', pre: 'Associative properties: A∪(B∪C) = (A∪B)∪C and A∩(B∩C) = (A∩B)∩C (evaluate the bracket first).',
    groups: [
      { lab: '(i)', sets: { A: ch('a', 'z'), B: ['a', 'e', 'i', 'o', 'u'], C: ['a', 'd', 'i', 'l', 'm', 'n', 'o'] }, verify: [{ lab: '(i)', l: 'A∪(B∪C)', r: '(A∪B)∪C', expect: 'A' }, { lab: '(i)', l: 'A∩(B∩C)', r: '(A∩B)∩C', expect: '{a,i,o}' }] },
      { lab: '(ii)', sets: {}, text: ['(ii) A = {1,2,…,100}, B = the even numbers, C = the odd numbers. B∪C = A (every number from 1 to 100 is even or odd), so A∪(B∪C) = A∪A = A, and (A∪B)∪C = A∪C = A. No number is both even and odd, so B∩C = ∅: A∩(B∩C) = A∩∅ = ∅, and (A∩B)∩C = B∩C = ∅. Both sides agree in each case.'] }
    ] });

  S.add({ q: 'Verify both distributive properties for (i) A={0,1,2}', pre: 'Distributive properties: A∪(B∩C) = (A∪B)∩(A∪C) and A∩(B∪C) = (A∩B)∪(A∩C).',
    groups: [
      { lab: '(i)', sets: { A: ['0', '1', '2'], B: ['0'], C: [] }, verify: [{ lab: '(i)', l: 'A∪(B∩C)', r: '(A∪B)∩(A∪C)', expect: 'A' }, { lab: '(i)', l: 'A∩(B∪C)', r: '(A∩B)∪(A∩C)', expect: '{0}' }] },
      { lab: '(ii)', sets: { A: ['0', '1', '-1', '2', '-2', '3', '-3', '4', '-4', '5', '-5'], B: ['-1', '-2', '-3', '-4', '-5'], C: ['-1', '-2', '3', '4'] },
        verify: [{ lab: '(ii)', l: 'A∪(B∩C)', r: '(A∪B)∩(A∪C)', expect: 'A' }, { lab: '(ii)', l: 'A∩(B∪C)', r: '(A∩B)∪(A∩C)', expect: '{-1,-2,-3,-4,-5,3,4}' }] }
    ] });

  S.add({ q: 'Verify De Morgan’s laws for (i) U={1,…,20}', pre: DM,
    groups: [
      { lab: '(i)', U: R(1, 20), sets: { A: ['2', '3', '5', '7', '11', '12', '13', '17'], B: ['1', '4', '6', '8', '10', '14', '17', '18'] },
        verify: [{ lab: '(i)', l: '(A∪B)′', r: 'A′∩B′', expect: '{9,15,16,19,20}' }, { lab: '(i)', l: '(A∩B)′', r: 'A′∪B′', expect: L(R(1, 20, [17])) }] },
      { lab: '(ii)', U: R(1, 10), sets: { A: ['2', '4', '6', '8', '10'], B: ['1', '3', '5', '7', '9'] },
        verify: [{ lab: '(ii)', l: '(A∪B)′', r: 'A′∩B′', expect: '∅' }, { lab: '(ii)', l: '(A∩B)′', r: 'A′∪B′', expect: 'U' }] }
    ] });

  /* ---------- Exercise 5.3 (Venn diagrams) ---------- */
  S.add({ q: 'Let A={1,2,3,4,5}, B={2,3,6,7}. Draw Venn diagrams for A∪B and A∩B.', intro: 'Put each element in its region: only in A, in both A and B (the overlap), or only in B. Then shade the region asked for.',
    sets: { A: R(1, 5), B: ['2', '3', '6', '7'] }, parts: [{ lab: 'A∪B', expr: 'A∪B', expect: L(R(1, 7)) }, { lab: 'A∩B', expr: 'A∩B', expect: '{2,3}' }] });

  S.add({ q: 'For A={1,2,3,4,5,6}, B={3,4,5,6,7,8}, C={5,6,9,10}, verify with Venn diagrams', intro: 'Shade the left side of each law, then the right side, and compare the shaded regions.',
    sets: { A: R(1, 6), B: R(3, 8), C: ['5', '6', '9', '10'] },
    verify: [{ lab: '(i)', l: 'A∪(B∪C)', r: '(A∪B)∪C', expect: L(R(1, 10)) }, { lab: '(ii)', l: 'A∩(B∩C)', r: '(A∩B)∩C', expect: '{5,6}' },
      { lab: '(iii)', l: 'A∪(B∩C)', r: '(A∪B)∩(A∪C)', expect: L(R(1, 6)) }, { lab: '(iv)', l: 'A∩(B∪C)', r: '(A∩B)∪(A∩C)', expect: '{3,4,5,6}' }] });

  S.add({ q: 'For U={1,…,7}, A={1,2,3,4}, B={3,4,5}, draw A′, B′, A′∪B′, A′∩B′ and verify both De Morgan laws.', intro: COMP,
    U: R(1, 7), sets: { A: R(1, 4), B: ['3', '4', '5'] },
    parts: [{ lab: 'A′', expr: 'A′', expect: '{5,6,7}' }, { lab: 'B′', expr: 'B′', expect: '{1,2,6,7}' }], verify: [{ lab: 'First law', l: '(A∪B)′', r: 'A′∩B′', expect: '{6,7}' }, { lab: 'Second law', l: '(A∩B)′', r: 'A′∪B′', expect: '{1,2,5,6,7}' }] });

  S.add({ q: 'For U={a,b,c,1,2,3,4}, A={c,3}, B={a,3,4}, draw A′, B′, A\\B and B\\A.', intro: COMP + ' ' + DIFF,
    U: ['a', 'b', 'c', '1', '2', '3', '4'], sets: { A: ['c', '3'], B: ['a', '3', '4'] },
    parts: [{ lab: 'A′', expr: 'A′', expect: '{a,b,1,2,4}' }, { lab: 'B′', expr: 'B′', expect: '{b,c,1,2}' }, { lab: 'A∖B', expr: 'A\\B', expect: '{c}' }, { lab: 'B∖A', expr: 'B\\A', expect: '{a,4}' }] });

  S.add({ q: 'For U={a,b,c,d,e,f,g}, A={a,b,c}, B={c,d,e}, verify both De Morgan laws using Venn diagrams.', intro: DM,
    U: ch('a', 'g'), sets: { A: ['a', 'b', 'c'], B: ['c', 'd', 'e'] },
    verify: [{ lab: 'First law', l: '(A∪B)′', r: 'A′∩B′', expect: '{f,g}' }, { lab: 'Second law', l: '(A∩B)′', r: 'A′∪B′', expect: '{a,b,d,e,f,g}' }] });

  /* ---------- Review Exercise 5 ---------- */
  S.add({ q: 'Let U={1,…,100}, A={2,4,…,100}, B={1,3,…,99}. Find A′∪B′', pre: 'A is the even numbers and B the odd numbers up to 100. Every number from 1 to 100 is either even or odd, never both, so A∪B = U and A∩B = ∅. Hence A′ = B and B′ = A.',
    groups: [{ lab: '', sets: {}, text: ['A′∪B′ = B∪A = U. A′∩B′ = B∩A = ∅. A∩B′ = A∩A = A. A′∩B = B∩B = B.'] }] });

  S.add({ q: 'For A={1,2,3,5,7}, B={2,4,6}, C={2,5,9}, verify', intro: 'Evaluate each side separately and compare.',
    sets: { A: ['1', '2', '3', '5', '7'], B: ['2', '4', '6'], C: ['2', '5', '9'] },
    verify: [{ lab: '(i)', l: 'A∪(B∪C)', r: '(A∪B)∪C', expect: '{1,2,3,4,5,6,7,9}' }, { lab: '(ii)', l: 'A∩(B∩C)', r: '(A∩B)∩C', expect: '{2}' }, { lab: '(iii)', l: 'A∪(B∩C)', r: '(A∪B)∩(A∪C)', expect: '{1,2,3,5,7}' },
      { lab: '(iv)', l: 'A∩(B∪C)', r: '(A∩B)∪(A∩C)', expect: '{2,5}' }],
    outro: 'Note: part (iv) is printed as “distributive property of union over union”. That wording looks like a printing slip; the companion law, intersection over union, is verified above.' });

  S.add({ q: 'Verify De Morgan’s laws for U={1,…,40}, A={1,6,11,16,21,26,31}', intro: DM + ' The diagram would be too crowded for 40 elements, so the sets are worked out directly.',
    U: R(1, 40), sets: { A: ['1', '6', '11', '16', '21', '26', '31'], B: ['2', '5', '8', '11', '14', '17', '20', '23', '26', '29', '32'] }, noBoard: true,
    verify: [{ lab: 'First law', l: '(A∪B)′', r: 'A′∩B′' }, { lab: 'Second law', l: '(A∩B)′', r: 'A′∪B′' }] });

  S.add({ q: 'For U={1,2,3,5,6,7}, A={2,5,6}, B={1,2,3}, verify De Morgan’s laws with Venn diagrams.', intro: DM,
    U: ['1', '2', '3', '5', '6', '7'], sets: { A: ['2', '5', '6'], B: ['1', '2', '3'] },
    verify: [{ lab: 'First law', l: '(A∪B)′', r: 'A′∩B′', expect: '{7}' }, { lab: 'Second law', l: '(A∩B)′', r: 'A′∪B′', expect: '{1,3,5,6,7}' }] });

  S.add({ q: 'For U={1,…,10}, A={1,2,3,4}, B={3,4,5,6}, C={3,4,7,8}, verify both distributive laws with Venn diagrams.', intro: 'Shade each side of a law in turn and compare.',
    U: R(1, 10), sets: { A: R(1, 4), B: R(3, 6), C: ['3', '4', '7', '8'] },
    verify: [{ lab: 'Union over intersection:', l: 'A∪(B∩C)', r: '(A∪B)∩(A∪C)', expect: '{1,2,3,4}' }, { lab: 'Intersection over union:', l: 'A∩(B∪C)', r: '(A∩B)∪(A∩C)', expect: '{3,4}' }] });
})(typeof window !== 'undefined' ? window : globalThis);
