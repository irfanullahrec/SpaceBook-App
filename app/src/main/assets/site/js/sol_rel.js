/* Builders for relation / function questions with mapping diagrams (arrows from a domain to a codomain).
 * Everything stated in a worked step is COMPUTED from the pairs: is it a function, one-one, onto, what is the range.
 * The classification the book prints is compared with the computed one; a disagreement is reported and the pack is not used.
 *   SBSOL_REL.pack({ q, domain, codomain, pre, items:[{ lab, name, pairs:[[x,y],...], expect:{ fn, one, onto } }], post })
 */
(function (root) {
  'use strict';
  const NS = root.SBVR; if (!NS || !NS.sol) return;
  const warn = m => { if (root.console) console.warn('sol_rel: ' + m); };
  const lit = a => a.length ? '{' + a.join(',') + '}' : '∅';
  const pairLit = ps => '{' + ps.map(p => '(' + p[0] + ',' + p[1] + ')').join(',') + '}';
  const uniq = a => a.filter((x, i) => a.indexOf(x) === i);

  function analyse(domain, codomain, pairs) {
    const imgs = {}; domain.forEach(x => { imgs[x] = []; });
    const outside = [];
    pairs.forEach(([x, y]) => { if (!imgs[x]) outside.push(x); else imgs[x].push(y); });
    const missing = domain.filter(x => imgs[x].length === 0), many = domain.filter(x => imgs[x].length > 1);
    const fn = missing.length === 0 && many.length === 0 && outside.length === 0;
    const range = uniq(pairs.map(p => p[1])).filter(y => codomain.indexOf(y) >= 0);
    const inv = {}; pairs.forEach(([x, y]) => { (inv[y] = inv[y] || []).push(x); });
    const repeated = Object.keys(inv).filter(y => inv[y].length > 1).map(y => ({ y, xs: inv[y] }));
    const one = fn && repeated.length === 0;
    const unreached = codomain.filter(y => range.indexOf(y) < 0);
    const onto = fn && unreached.length === 0;
    return { fn, one, onto, missing, many, repeated, range, unreached, imgs };
  }
  const label = a => !a.fn ? 'not a function' : a.one && a.onto ? 'one-one onto (a bijection)' : a.one ? 'one-one into' : a.onto ? 'many-one onto' : 'many-one into';

  function lines(domain, codomain, a, name) {
    const out = [];
    if (a.fn) out.push('Every element of ' + lit(domain) + ' has exactly one image: ' + domain.map(x => x + '→' + a.imgs[x][0]).join(', ') + ', so ' + name + ' is a function.');
    else {
      const why = [];
      if (a.missing.length) why.push(a.missing.join(', ') + (a.missing.length > 1 ? ' have' : ' has') + ' no image');
      a.many.forEach(x => why.push(x + ' has two images (' + a.imgs[x].join(' and ') + ')'));
      out.push('Check each element of the domain: ' + why.join('; ') + ', so ' + name + ' is not a function.');
      return out;
    }
    out.push(a.one ? 'No image is used twice, so ' + name + ' is one-one.' : 'The image ' + a.repeated.map(r => r.y + ' (from ' + r.xs.join(' and ') + ')').join(' and ') + ' is used more than once, so ' + name + ' is many-one.');
    out.push('Range = ' + lit(a.range) + (a.onto ? ' = ' + lit(codomain) + ', so ' + name + ' is onto.' : '; ' + a.unreached.join(', ') + (a.unreached.length > 1 ? ' are' : ' is') + ' not reached, so ' + name + ' is into (not onto).'));
    return out;
  }

  function pack(d) {
    const steps = [], boards = []; if (d.pre) steps.push(d.pre);
    for (const it of d.items) {
      const dom = it.domain || d.domain, cod = it.codomain || d.codomain;
      const a = analyse(dom, cod, it.pairs);
      const ex = it.expect || {};
      if (!it.discrepancy && ((ex.fn !== undefined && ex.fn !== a.fn) || (a.fn && ex.one !== undefined && ex.one !== a.one) || (a.fn && ex.onto !== undefined && ex.onto !== a.onto))) { warn(d.q.slice(0, 40) + ' ' + (it.lab || '') + ': computed ' + label(a) + ' but the book says ' + JSON.stringify(ex)); return null; }
      const from = steps.length, nm = it.name || 'the relation';
      steps.push((it.lab ? it.lab + ' ' : '') + (it.name ? it.name + ' = ' : 'R = ') + pairLit(it.pairs) + '.');
      const layerAt = steps.length - 1;
      lines(dom, cod, a, nm).forEach(l => steps.push(l));
      steps.push('Conclusion: ' + nm + ' is ' + label(a) + '.' + (it.discrepancy ? ' Note: the printed answer says “' + it.printed + '”; checking the images against the codomain gives “' + label(a) + '”, so the printed wording does not match the question as printed.' : ''));
      const mark = [];
      a.unreached.forEach(y => mark.push(['r', y, 'red'])); a.repeated.forEach(r => mark.push(['r', r.y, 'orange'])); a.missing.forEach(x => mark.push(['l', x, 'red']));
      boards.push({ kind: 'mapping', alt: 'Mapping diagram for ' + nm, domain: dom, codomain: cod, domainName: it.domainName || d.domainName || 'A', codomainName: it.codomainName || d.codomainName || 'B', from, to: steps.length - 1,
        layers: [{ at: layerAt, type: 'arrows', pairs: it.pairs, color: 'blue', mark, label: label(a) }] });
    }
    if (d.post) steps.push(d.post);
    return { q: d.q, steps, board: boards.length === 1 ? boards[0] : boards };
  }
  function add(d) { const p = pack(d); if (p) NS.sol.add(p); else warn('not registered: ' + d.q.slice(0, 50)); }
  root.SBSOL_REL = { pack, add, analyse, label, lit, pairLit };
})(typeof window !== 'undefined' ? window : globalThis);
