/* SpaceBook Visual Reasoning: automatic specs from existing worked steps (strings).
 * SAFE BY CONSTRUCTION: it never invents or rewrites mathematics. It finds the equations the author already wrote
 * ("A = B = C"), shows them row by row exactly as written, and highlights only what differs between two neighbouring
 * rows of the same chain (what changed, where it goes). Anything it cannot parse with certainty is left alone:
 * autoSpec() returns null and the caller keeps the normal presentation. Pure functions: also runs under node (audit).
 */
(function (root) {
  'use strict';
  const FUNCS = ['sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'log', 'ln', 'lim', 'det', 'exp'];
  const SYM = { 'Φ': '\\Phi ', 'ϕ': '\\phi ', 'Ω': '\\Omega ', '−': '-', '–': '-', '×': '\\times ', '÷': '\\div ', '·': '\\cdot ', 'π': '\\pi ', 'θ': '\\theta ', 'α': '\\alpha ', 'β': '\\beta ', 'γ': '\\gamma ', 'Δ': '\\Delta ', 'λ': '\\lambda ', 'μ': '\\mu ', 'σ': '\\sigma ', 'ω': '\\omega ', 'φ': '\\varphi ', 'ε': '\\varepsilon ', 'ρ': '\\rho ', 'δ': '\\delta ', 'ℝ': '\\mathbb{R}', '≠': '\\neq ', '≈': '\\approx ', '≤': '\\le ', '≥': '\\ge ', '±': '\\pm ', '∞': '\\infty ', '°': '^{\\circ}', '∈': '\\in ', '→': '\\to ', '∪': '\\cup ', '∩': '\\cap ', '%': '\\%', '∴': '\\therefore ', '′': "'", '∠': '\\angle ', '∪': '\\cup ', '∩': '\\cap ', '∖': '\\setminus ', '∅': '\\emptyset ', '∈': '\\in ', '∉': '\\notin ', '⊂': '\\subset ', '⊆': '\\subseteq ', '…': '\\ldots ', '\\': '\\setminus ', '{': '\\{', '}': '\\}', '⊥': '\\perp ', '∥': '\\parallel ', '△': '\\triangle ', '≅': '\\cong ', '∼': '\\sim ', '→': '\\to ', '⇒': '\\Rightarrow ', '∑': '\\sum ', 'Σ': '\\sum ', 'σ': '\\sigma ', 'μ': '\\mu ', 'x̄': '\\bar{x}', '√': '\\sqrt', '∫': '\\int ', '∞': '\\infty ' };
  const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', 'ⁿ': 'n', '⁺': '+', '⁻': '-' };
  const SUB = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* multi-letter unit symbols are read as units only straight after a number or another unit ("12.8 kg", "3 m s⁻¹") */
  const UNITN = new Set(['kg', 'cm', 'mm', 'km', 'Hz', 'Pa', 'eV', 'keV', 'MeV', 'mol', 'rad', 'kW', 'MW', 'kJ', 'kN', 'ms', 'ns', 'dm', 'mg', 'mL', 'kPa', 'Wb', 'kHz', 'MHz', 'GHz', 'nm', 'dB']);
  const unitTok = tk => { const t = tk.replace(/^[(]+|[).,;:]+$/g, ''); const m = /^([A-Za-z]+)[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]*$/.exec(t); return !!m && UNITN.has(m[1]); };
  let PROD = new Set();   // two-letter products written between two equals signs ("V = IR = ...", "F = ma = ...") read as variables
  const numEnd = tk => /[0-9)]$/.test(tk.replace(/[.,;:]+$/, ''));
  /* ---------- plain unicode math -> TeX (null when anything is not understood) ---------- */
  function toTex(src) {
    let s = String(src).replace(/\s+/g, ' ').trim();
    if (!s || s.length > 140) return null;
    let out = '', i = 0;
    const supRun = tbl => { let r = ''; while (i < s.length && tbl[s[i]] !== undefined) { r += tbl[s[i]]; i++; } return r; };
    while (i < s.length) {
      const ch = s[i];
      if (ch === '_' && out && /[A-Za-z0-9}]$/.test(out)) {
        const sm = /^_([a-z][a-z0-9]*|[A-Z0-9])/.exec(s.slice(i));
        if (!sm || s[i + sm[0].length] === '_') return null;   // "m_ev_e" could be m_e v_e or m_ev e: leave it to the normal presentation
        out += '_{' + (sm[1].length > 1 && /^[a-z]/.test(sm[1]) ? '\\mathrm{' + sm[1] + '}' : sm[1]) + '}'; i += sm[0].length; continue;
      }
      if (SUP[ch] !== undefined) { out += '^{' + supRun(SUP) + '}'; continue; }
      if (SUB[ch] !== undefined) { out += '_{' + supRun(SUB) + '}'; continue; }
      if (ch === '√') {
        i++;
        if (s[i] === '(') { let d = 0, j = i; for (; j < s.length; j++) { if (s[j] === '(') d++; else if (s[j] === ')' && --d === 0) break; } if (j >= s.length) return null; const inner = toTex(s.slice(i + 1, j)); if (inner === null) return null; out += '\\sqrt{' + inner + '}'; i = j + 1; continue; }
        const m = /^[A-Za-z0-9.]+/.exec(s.slice(i)); if (!m) return null; out += '\\sqrt{' + m[0] + '}'; i += m[0].length; continue;
      }
      if (/[A-Za-z]/.test(ch)) {
        const m = /^[A-Za-z]+/.exec(s.slice(i))[0];
        const f = FUNCS.find(x => m.startsWith(x) && m.length >= x.length);
        if (m.length > 1 && f && m.length > f.length) { out += '\\' + f + ' ' + m.slice(f.length); i += m.length; continue; }
        if (FUNCS.includes(m)) { i += m.length; out += '\\' + m + (SUP[s[i]] !== undefined || SUB[s[i]] !== undefined ? '' : ' '); continue; }
        if (OPS.includes(m)) { out += '\\operatorname{' + m + '}'; i += m.length; continue; }
        if (UNITN.has(m) && /[0-9)}]\s*$|mathrm\{[A-Za-z]+\}\s*$/.test(out)) { out += (/\s$/.test(out) ? '' : ' ') + '\\,\\mathrm{' + m + '}'; i += m.length; continue; }
        if (m.length === 1 && 'VAWJCNmsgKTFH'.includes(m) && s[i - 1] === ' ' && /[0-9)]\s*$/.test(out)) { out += '\\,\\mathrm{' + m + '}'; i++; continue; }
        if (PROD.has(m)) { out += m.split('').join(' '); i += m.length; continue; }
        if (m.length > 1) return null;             // a real word, not maths
        out += ch; i++; continue;
      }
      if (/[0-9.,+\-*/=()<>|:!' ]/.test(ch)) { out += ch === '*' ? '\\cdot ' : ch; i++; continue; }
      if (SYM[ch] !== undefined) { out += SYM[ch]; i++; continue; }
      if (ch === '[' || ch === ']') { out += ch; i++; continue; }
      return null;
    }
    return out.replace(/\s+/g, ' ').trim();
  }

  /* ---------- find chains in a sentence ---------- */
  const OPS = ['Dom', 'Ran', 'Range', 'gcd', 'lcm', 'HCF', 'LCM', 'max', 'min', 'adj', 'mod', 'deg', 'rank', 'Im', 'Re', 'arg', 'sgn'];
  const isWord = tok => {
    // each run of letters on its own: "n(A×B)" is maths (n, A, B), "Dom(R)" is a known operator, "gives" is a word
    const runs = tok.replace(/_(?:[a-z][a-z0-9]*|[A-Z0-9])/g, '').match(/[A-Za-z]+/g) || [];   // I_rms, V_s, X_L: the subscript is part of the symbol
    return runs.some(run => {
      if (OPS.includes(run)) return false;
      let r = run.toLowerCase(); FUNCS.forEach(f => { r = r.split(f).join(''); });
      return /[a-z]{2,}/.test(r);
    });
  };
  function topSplitEq(tex) {
    const parts = []; let d = 0, cur = '';
    for (let i = 0; i < tex.length; i++) {
      const c = tex[i];
      if ('({['.includes(c)) d++; else if (')}]'.includes(c)) d--;
      if (c === '=' && d === 0 && tex[i - 1] !== '<' && tex[i - 1] !== '>' && tex[i - 1] !== '!') { parts.push(cur); cur = ''; } else cur += c;
    }
    parts.push(cur);
    return parts.map(p => p.trim());
  }
  const sane = t => {
    let d = 0; for (const c of t) { if (c === '(') d++; else if (c === ')' && --d < 0) return false; }
    if (d !== 0) return false;
    const u = t.replace(/\s/g, '');
    if (/[+\-*/]$/.test(u) || /^[*/+]/.test(u) || /[+*/]{2}|-[+*/]/.test(u)) return false;
    return true;
  };
  /* -> [{src, tex, sides:[tex...]}] for the maths runs of one step that contain "=" */
  function chainsOf(step) {
    const obj = step && typeof step === 'object' ? step : { text: String(step) };
    const texChains = [];
    const texSeg = t => {
      t = String(t || '').replace(/\\displaystyle\s*/g, '').trim();
      // matrices written as bmatrix / pmatrix / vmatrix are plain operands: hide them from the safety test (their & and \\ are fine), keep the rest strict
      const noMat = t.replace(/\\begin\{([bpvVB]?matrix)\}[\s\S]*?\\end\{\1\}/g, 'M');
      if (!t || noMat.length > 160 || t.length > 600 || /\\begin|&|\\\\|\\tag|\\cases/.test(noMat)) return;
      const sides = topSplitEq(t);
      if (sides.length >= 2 && sides.every(x => x && sane(x))) texChains.push({ src: t, tex: t, sides });
    };
    if (obj.m) texSeg(obj.m);
    let plainText = String(obj.text || '').replace(/\$\$([^$]+)\$\$|\$([^$]+)\$|\\\(([\s\S]+?)\\\)|\\\[([\s\S]+?)\\\]/g, (all, a, b, c, d) => { if (!obj.m) texSeg(a || b || c || d); return ' '; });
    if (obj.prose || texChains.length || /\$|\\\(|\\\[/.test(String(obj.text || ''))) return texChains;   // tex given: never guess from the prose around it
    const text = plainText.replace(/^\s*\((?:[a-z]|[ivx]{1,4}|\d{1,2})\)\s*/i, '');
    const toks = text.split(/\s+/).filter(Boolean);
    const runs = []; let cur = [];
    const flush = () => { if (cur.length) runs.push(cur.join(' ')); cur = []; };
    let prevTk = '';
    PROD = new Set(toks.filter((tk, k) => k > 0 && toks[k - 1] === '=' && /^[A-Za-z]{2}[.,;]?$/.test(tk) && (toks[k + 1] === '=' || (k + 1 === toks.length - 0 && false))).map(tk => tk.replace(/[.,;]+$/, '')));
    toks.forEach((tk, k) => { if (!PROD.has(tk) && isWord(tk) && !(unitTok(tk) && cur.length && (numEnd(prevTk) || unitTok(prevTk)))) flush(); else { cur.push(tk); if (k < toks.length - 1 && /[A-Za-z0-9Ω²³⁰¹⁴-⁹)]\.$/.test(tk) && !/^(?:[A-Z]\.)+$/.test(tk) && /^[A-Z(0-9]/.test(toks[k + 1]) && toks[k + 1] !== '=') flush(); } prevTk = tk; });
    flush();
    const out = [];
    const splitDepth0 = (str, sep) => { const parts = []; let d = 0, cur = ''; for (const c of str) { if ('([{'.includes(c)) d++; else if (')]}'.includes(c)) d--; if (c === sep && d === 0) { parts.push(cur); cur = ''; } else cur += c; } parts.push(cur); return parts; };
    runs.forEach(r => {
      let pieces = splitDepth0(r, ';');
      pieces = pieces.flatMap(pc => { const cs = splitDepth0(pc, ','); return cs.filter(x => x.includes('=')).length >= 2 && cs.every(x => x.includes('=')) ? cs : [pc]; });
      pieces.forEach(pc => {
        let src = pc.replace(/[.,;:]+$/, '').trim();
        const ci = src.lastIndexOf(':'); if (ci >= 0) src = src.slice(ci + 1).trim();
        if (!src.includes('=')) return;
        const tex = toTex(src);
        if (tex === null) return;
        const sides = topSplitEq(tex);
        if (sides.length < 2 || sides.some(x => !x || !sane(x))) return;
        out.push({ src, tex, sides });
      });
    });
    return out;
  }

  /* ---------- atoms + prefix/suffix diff (no string surgery inside a command or group) ---------- */
  const ARGN = { frac: 2, dfrac: 2, tfrac: 2, binom: 2, dbinom: 2, tbinom: 2, overset: 2, underset: 2, stackrel: 2, pmod: 1, xrightarrow: 1, mathop: 1, textrm: 1, mathsf: 1, mbox: 1, sqrt: 1, overline: 1, underline: 1, bar: 1, hat: 1, widehat: 1, vec: 1, tilde: 1, dot: 1, ddot: 1, text: 1, mathbb: 1, mathbf: 1, mathrm: 1, mathit: 1, operatorname: 1, boldsymbol: 1, cancel: 1, overrightarrow: 1, mathcal: 1, textbf: 1 };
  function atoms(t) {
    const out = []; let i = 0;
    const group = j => { let d = 0; for (let k = j; k < t.length; k++) { if (t[k] === '{') d++; else if (t[k] === '}' && --d === 0) return k + 1; } return -1; };
    while (i < t.length) {
      let j = i;
      if (t[i] === '\\') {
        const m = /^\\([A-Za-z]+|.)/.exec(t.slice(i)); j = i + m[0].length;
        const nargs = ARGN[m[0].slice(1)];
        const env = m[0] === '\\begin' ? /^\{([A-Za-z*]+)\}/.exec(t.slice(j)) : null;      // a whole matrix (\begin{bmatrix} ... \end{bmatrix}) is one atom
        if (env) { const endTag = '\\end{' + env[1] + '}', e = t.indexOf(endTag, j); if (e < 0) return null; j = e + endTag.length; }
        else if (m[0] === '\\left' || m[0] === '\\right') { while (t[j] === ' ') j++; if (t[j] === '\\') { const mm = /^\\([A-Za-z]+|.)/.exec(t.slice(j)); j += mm[0].length; } else j++; }
        else if (nargs) {
          if (m[0] === '\\sqrt' && t[j] === '[') { const e = t.indexOf(']', j); if (e < 0) return null; j = e + 1; }
          for (let a = 0; a < nargs; a++) {
            while (t[j] === ' ') j++;
            if (t[j] === '{') { const e = group(j); if (e < 0) return null; j = e; }
            else if (t[j] === '\\') { const mm = /^\\([A-Za-z]+|.)/.exec(t.slice(j)); j += mm[0].length; }
            else if (j < t.length) j++;
            else return null;
          }
        }
      } else if (/[0-9.]/.test(t[i])) { while (j < t.length && /[0-9.]/.test(t[j])) j++; } else if (t[i] === '{') { const e = group(i); if (e < 0) return null; j = e; } else j = i + 1;
      { let q = j; while (t[q] === ' ') q++; if (q > j && (t[q] === '^' || t[q] === '_')) j = q; }
      // attach scripts to their base
      while (t[j] === '^' || t[j] === '_') { j++; if (t[j] === '{') { const e = group(j); if (e < 0) return null; j = e; } else if (t[j] === '\\') { const m = /^\\([A-Za-z]+|.)/.exec(t.slice(j)); j += m[0].length; } else j++; }
      out.push(t.slice(i, j)); i = j;
      while (t[i] === ' ') { out[out.length - 1] += ' '; i++; }
    }
    return out;
  }
  const norm = a => a.trim();
  function diff(a, b) {
    const A = atoms(a), B = atoms(b); if (!A || !B) return null;
    let p = 0; while (p < A.length && p < B.length && norm(A[p]) === norm(B[p])) p++;
    let s = 0; while (s < A.length - p && s < B.length - p && norm(A[A.length - 1 - s]) === norm(B[B.length - 1 - s])) s++;
    const oa = A.slice(p, A.length - s), nb = B.slice(p, B.length - s);
    const bal = r => { const j = r.join(''); return (j.match(/\\left/g) || []).length === (j.match(/\\right/g) || []).length; };
    if (!oa.length && !nb.length) return null;
    if (!bal(oa) || !bal(nb)) return null;
    const tag = (arr, pre, mid, suf, cls) => pre.join('') + (mid.length ? '\\htmlClass{' + cls + '}{' + mid.join('').replace(/(^|[^\\])\s+$/, '$1') + '} ' : '') + suf.join('');
    return {
      a: tag(A, A.slice(0, p), oa, A.slice(A.length - s), 'k-o'), b: tag(B, B.slice(0, p), nb, B.slice(B.length - s), 'k-n'),
      hasOld: oa.length > 0, hasNew: nb.length > 0, o: oa.join('').trim(), n: nb.join('').trim(),
      whole: (oa.length / Math.max(A.length, 1) > 0.85 && nb.length / Math.max(B.length, 1) > 0.85),
      label: nb.join('').replace(/\\([A-Za-z]+) ?/g, (m, c) => ({ times: '×', cdot: '·', pi: 'π', theta: 'θ', pm: '±' }[c] || '')).replace(/[{}]/g, '').replace(/\^(\w)/g, '^$1').trim().slice(0, 10)
    };
  }

  /* ---------- chemistry: atom counts of a written reaction (verification only: coefficients and subscripts are never changed) ---------- */
  const ARROW = /\\rightleftharpoons|\\rightarrow|\\longrightarrow|\\leftrightarrow|\\to(?![a-zA-Z])|→|⇌/;
  function plainFormula(t) {
    return String(t).replace(/\\(uparrow|downarrow)/g, '').replace(/\\,|\\ |~/g, '')
      .replace(/_\{(\d*)\((?:s|l|g|aq)\)\}/g, '$1').replace(/_\{(\d+)\}/g, '$1').replace(/_(\d)/g, '$1')
      .replace(/\((?:s|l|g|aq)\)/g, '').replace(/\^\{[^}]*\}|\^\S/g, '').replace(/[{}]/g, '');
  }
  function atomsOf(f) {
    let i = 0;
    const num = () => { let n = ''; while (/\d/.test(f[i] || '')) n += f[i++]; return n ? +n : 1; };
    const group = close => {
      const out = {};
      while (i < f.length && f[i] !== close) {
        const c = f[i];
        if (c === '(' || c === '[') { i++; const g = group(c === '(' ? ')' : ']'); if (f[i] !== (c === '(' ? ')' : ']')) throw new Error('paren'); i++; const m = num(); Object.keys(g).forEach(k => { out[k] = (out[k] || 0) + g[k] * m; }); }
        else if (/[A-Z]/.test(c)) { let el = c; i++; if (/[a-z]/.test(f[i] || '')) el += f[i++]; const m = num(); out[el] = (out[el] || 0) + m; }
        else throw new Error('char ' + c);
      }
      return out;
    };
    const r = group(null); if (i < f.length) throw new Error('rest'); return r;
  }
  /* -> {texTagged, sides:[[{coef,piece,atoms}]], left, right, elements:[...], balanced} or null */
  function reactionOf(tex) {
    const m = ARROW.exec(tex); if (!m || tex.length > 220) return null;
    const sides = [tex.slice(0, m.index), tex.slice(m.index + m[0].length)];
    const parse = s => {
      const parts = []; let d = 0, cur = '';
      for (const ch of s) { if (ch === '{') d++; else if (ch === '}') d--; if (ch === '+' && d === 0) { parts.push(cur); cur = ''; } else cur += ch; }
      parts.push(cur);
      return parts.map(p => {
        p = p.trim(); const mm = /^(\d+)?\s*(.+)$/.exec(p); if (!mm) throw new Error('empty');
        const coef = mm[1] ? +mm[1] : 1, piece = mm[2].trim(); const a = atomsOf(plainFormula(piece));
        return { coef, coefText: mm[1] || '', piece, atoms: a };
      });
    };
    try {
      const L = parse(sides[0]), R = parse(sides[1]);
      if (L.length + R.length < 2 || L.length + R.length > 8) return null;
      const tot = side => { const t = {}; side.forEach(c => Object.keys(c.atoms).forEach(k => { t[k] = (t[k] || 0) + c.atoms[k] * c.coef; })); return t; };
      const lt = tot(L), rt = tot(R), els = Array.from(new Set(Object.keys(lt).concat(Object.keys(rt))));
      if (els.length > 6) return null;
      let idx = 0; const tag = c => `\\htmlClass{k-c${idx++}}{${c.coefText}${c.piece}}`;
      const tl = L.map(tag).join(' + '), tr = R.map(tag).join(' + ');
      const arrow = /rightleftharpoons|⇌|leftrightarrow/.test(m[0]) ? '\\rightleftharpoons' : '\\rightarrow';
      return { texTagged: tl + ' ' + arrow + ' ' + tr, texPlain: sides[0].trim() + ' ' + arrow + ' ' + sides[1].trim(), L, R, lt, rt, els, nL: L.length, balanced: els.every(e => (lt[e] || 0) === (rt[e] || 0)) };
    } catch (e) { return null; }
  }
  function chemOf(step) {
    const obj = step && typeof step === 'object' ? step : { text: String(step) };
    const out = []; const segs = [];
    String(obj.m || '').split(/;/).forEach(x => segs.push(x));
    String(obj.text || '').replace(/\$\$([^$]+)\$\$|\$([^$]+)\$/g, (all, a, b) => { segs.push(a || b); return ' '; });
    segs.forEach(sg => { const r = ARROW.test(sg) ? reactionOf(sg.replace(/\\displaystyle\s*/g, '')) : null; if (r) out.push(r); });
    return out.slice(0, 3);
  }

  /* sin/cos/tan of an angle written in degrees or as pi/k: -> {deg} when the side is exactly that (0-360) */
  function trigAngle(side) {
    const t = String(side).replace(/\s+/g, ''); const degs = []; let m;
    const add = d => { if (!isFinite(d)) return; d = Math.round((((d % 360) + 360) % 360) * 1000) / 1000; if (!degs.includes(d) && degs.length < 2) degs.push(d); };
    const re1 = /\\(?:sin|cos|tan)\(?(-?[0-9.]+)\^\{?\\circ/g; while ((m = re1.exec(t))) add(parseFloat(m[1]));
    const re2 = /\\(?:sin|cos|tan)\(?\\frac\{\\pi\}\{([0-9]+)\}/g; while ((m = re2.exec(t))) add(180 / parseFloat(m[1]));
    const re3 = /\\(?:sin|cos|tan)\(?([0-9]*)\\pi\/([0-9]+)/g; while ((m = re3.exec(t))) add(180 * (m[1] ? parseFloat(m[1]) : 1) / parseFloat(m[2]));
    return degs.length ? { degs } : null;
  }
  /* does the question text contain "y = <expr>" or "f(x) = <expr>" with the same values as f? */
  function sameFnInQuestion(f, question, compile) {
    const q = String(question || '').replace(/\\\(|\\\)|\\\[|\\\]|\$/g, ' ');
    const re = /(?:\by|\bf\s*\(\s*x\s*\))\s*=\s*([^,;\n]+?)(?=\s*(?:,|;|\n|\.\s|\band\b|\bfor\b|$))/g; let m;
    while ((m = re.exec(q))) {
      const g = compile(m[1].replace(/[.\s]+$/, '')); if (!g || g.vars.some(v => v !== 'x')) continue;
      let same = true, n = 0;
      for (let x = -3.3; x <= 3.3; x += 1.1) { let a, b; try { a = f({ x }); b = g({ x }); } catch (e) { continue; } if (!isFinite(a) || !isFinite(b)) continue; n++; if (Math.abs(a - b) > 1e-6 * Math.max(1, Math.abs(a))) { same = false; break; } }
      if (same && n >= 3) return true;
    }
    return false;
  }
  /* a window for y = f(x): x in [-6, 6], y from the middle 90% of the finite values, always showing the axes */
  function graphWindow(f) {
    const ys = []; for (let i = 0; i <= 120; i++) { const x = -6 + 12 * i / 120; try { const y = f({ x }); if (isFinite(y)) ys.push(y); } catch (e) { /* undefined here */ } }
    if (ys.length < 30) return null;
    ys.sort((a, b) => a - b);
    let lo = Math.min(0, ys[Math.floor(ys.length * 0.05)]), hi = Math.max(0, ys[Math.ceil(ys.length * 0.95) - 1]);
    if (hi - lo < 1e-6) { lo -= 1; hi += 1; }
    const pad = (hi - lo) * 0.15;
    return { xmin: -6, xmax: 6, ymin: lo - pad, ymax: hi + pad };
  }

  /* ---------- the fine-grained equation board (spec.acc) ----------
     A chain "A = B = C" becomes: write A; then for every "=": first the part of the line above that changes is picked out (with the book's sentence),
     then it is replaced and the new line is written. A book step with no equation is a step of its own (its sentence), so the board never has fewer
     steps than the book's list. Every line stays on the board. Nothing is rewritten: the rows are the author's own. */
  function fineSpec(steps, o) {
    if (steps.some(st => chemOf(st).length)) return null;                   // atom counts keep their own choreography
    const chainsPer = steps.map(chainsOf);
    if (!chainsPer.some(c => c.length)) return null;
    const texts = steps.map(st => (st && typeof st === 'object' ? String(st.text || '') : String(st)));
    const rows = [], out = [], T = (c, t) => '\\htmlClass{' + c + '}{' + t + '}';
    const add = (html, ops, ask) => { out.push(Object.assign({ dot: '', title: '', html, ops }, ask ? { ask: 1 } : {})); return out.length - 1; };   // ask: Practice mode asks the learner for the line this step writes
    steps.forEach((st, oi) => {
      const chains = chainsPer[oi];
      if (!chains.length) { add(esc(texts[oi]), [{ o: 'wait', t: 0.3 }]); return; }
      chains.forEach((c, ci) => {
        let prev = null;
        c.sides.forEach((side, k) => {
          const id = 'r' + oi + '_' + ci + '_' + k, grp = 'g' + oi + '_' + ci, tex = k === 0 ? side : '=' + side;
          if (k === 0) {
            const at = add(ci === 0 ? esc(texts[oi]) : 'The next equation.', [{ o: 'wait', t: 0.2 }, { o: 'write', r: id }, { o: 'wait', t: 0.5 }]);
            rows.push({ id, first: at, grp, tex: { [at]: tex }, note: '' }); prev = { id, side, k }; return;
          }
          const pre = prev.k === 0 ? '' : '=', small = prev.side.length < 150 && side.length < 150;
          const d = small ? diff(prev.side, side) : null, good = !!d && !d.whole && d.hasOld && d.hasNew;
          const oldT = pre + (good ? d.a : T('k-o', prev.side)), newT = '=' + (good ? d.b : T('k-n', side));
          add(good ? 'Look at the part that changes.' : 'Look at the line above: the next line comes from it.', [{ o: 'wait', t: 0.2 }, { o: 'tex', r: prev.id, t: oldT }, { o: 'cls', at: prev.id + '.k-o', c: 'hl-orange ul-orange zoom' }, { o: 'wait', t: 0.9 }]);
          const say = good && d.o.length <= 60 && d.n.length <= 60 ? 'Replace $' + d.o + '$ with $' + d.n + '$ and write the new line.' : 'Write the next line.';
          const aid = 'f' + oi + '_' + ci + '_' + k;
          const at = add(say, [{ o: 'wait', t: 0.2 }, { o: 'tex', r: prev.id, t: oldT }, { o: 'tex', r: id, t: newT }, { o: 'write', r: id }, { o: 'wait', t: 0.3 },
            { o: 'cls', at: prev.id + '.k-o', c: 'hl-orange ul-orange zoom' }, { o: 'wait', t: 0.5 },
            { o: 'arrow', id: aid, from: prev.id + '.k-o', to: id + '.k-n', color: 'purple', opt: { from: 'bottom', to: 'top', side: 'right', bend: 50 } }, { o: 'wait', t: 0.3 },
            { o: 'fly', path: aid, label: good && d.label ? d.label : '↓', color: 'purple' }, { o: 'clear' }, { o: 'cls', at: id + '.k-n', c: 'hl-green zoom' }, { o: 'wait', t: 0.35 }], true);
          rows.push({ id, first: at, grp, tex: { [at]: tex }, note: '' }); prev = { id, side, k };
        });
      });
    });
    rows[rows.length - 1].final = 1;
    const N = out.length; out.forEach((s, i) => { s.dot = String(i + 1); s.title = 'Step ' + (i + 1) + ' of ' + N; });
    return { id: '', q: o.q || '', givenText: o.given || '', auto: true, acc: true, rows, steps: out };
  }

  /* ---------- spec ---------- */
  let seq = 0;
  function autoSpec(steps, o) {
    o = o || {};
    if (!Array.isArray(steps) || steps.length < 1 || steps.length > (o.maxSteps || 14)) return { spec: null, why: 'steps' };
    const rows = [], stepsOut = []; let nChains = 0, nRows = 0, graphDone = false, uidInt = false;
    // a step with no equation has nothing to write on the board: its words join the next step that has one
    const groups = []; let pend = [], pendIdx = []; const origToGroup = [];
    steps.forEach((st, oi) => {
      const text = st && typeof st === 'object' ? String(st.text || '') : String(st);
      const chains = chainsOf(st), chem = chemOf(st);
      if (chains.length || chem.length) { groups.push({ texts: pend.concat(text), chains, chem }); pendIdx.forEach(pi => { origToGroup[pi] = groups.length - 1; }); origToGroup[oi] = groups.length - 1; pend = []; pendIdx = []; } else { pend.push(text); pendIdx.push(oi); }
    });
    if (pend.length && groups.length) { groups[groups.length - 1].texts = groups[groups.length - 1].texts.concat(pend); pendIdx.forEach(pi => { origToGroup[pi] = groups.length - 1; }); }
    // a hand-written pack with a board but no equations at all: every step is its own group so the board still animates
    if (!groups.length && o.maxSteps) steps.forEach((st, oi) => { groups.push({ texts: [st && typeof st === 'object' ? String(st.text || '') : String(st)], chains: [], chem: [] }); origToGroup[oi] = oi; });
    // a hand-chosen board (Venn, mapping, graph...) shown above the written rows; its layers are tied to original step numbers
    let boardLayersAt = null; const boardRows = [];
    if (o.board && groups.length) {
      const last = groups.length - 1, gOf = oi => (origToGroup[oi] === undefined ? last : origToGroup[oi]);
      boardLayersAt = groups.map(() => []);
      [].concat(o.board).forEach((b, bi) => {
        const from = b.from === undefined ? 0 : gOf(b.from), to = b.to === undefined ? last : gOf(b.to);
        const cfg = Object.assign({}, b, { layers: b.layers.map(L => Object.assign({}, L, { at: gOf(L.at) })) });
        const id = 'bd' + bi; rows.unshift({ id, first: from, hideAt: to + 1 > last ? undefined : to + 1, viz: cfg, tex: { [from]: '' }, note: '' }); nRows++;
        boardRows.push({ id, from });
        cfg.layers.forEach((L, k) => boardLayersAt[L.at].push([id, k]));
      });
      boardRows.reverse();
    }
    groups.forEach((gr, si) => {
      const chains = gr.chains;
      const ops = []; const stepRows = [];
      chains.forEach((c, ci) => {
        nChains++;
        c.sides.forEach((side, k) => {
          const id = 'r' + si + '_' + ci + '_' + k;
          const tex = k === 0 ? side : '=' + side;
          rows.push({ id, first: si, hideAt: si + 2, tex: { [si]: tex }, note: '' });
          stepRows.push({ id, k, side, ci });
          nRows++;
        });
      });
      // choreography: write rows in order; a chain's neighbouring sides get a what-changed highlight
      ops.push({ o: 'wait', t: 0.2 });
      // written reactions: show the equation, then count each atom on both sides (verification, never a rewrite)
      (gr.chem || []).forEach((rx, xi) => {
        const rid = 'x' + si + '_' + xi;
        rows.push({ id: rid, first: si, hideAt: si + 2, tex: { [si]: rx.texTagged }, note: '' }); nRows++;
        ops.push({ o: 'write', r: rid }, { o: 'wait', t: 0.7 });
        rx.els.forEach((el, ej) => {
          const eid = rid + '_' + ej, l = rx.lt[el] || 0, r = rx.rt[el] || 0, ok = l === r;
          rows.push({ id: eid, first: si, hideAt: si + 2, final: ok && ej === rx.els.length - 1 && rx.balanced ? 1 : 0, tex: { [si]: '\\text{' + el + '}:\\ ' + (ok ? l + ' = ' + r + '\\ \\checkmark' : '\\htmlClass{k-bad}{' + l + ' \\neq ' + r + '}') }, note: ok ? 'same on both sides' : 'different: not balanced' }); nRows++;
          const lc = [], rc = [];
          rx.L.forEach((c, ci) => { if (c.atoms[el]) lc.push(rid + '.k-c' + ci); });
          rx.R.forEach((c, ci) => { if (c.atoms[el]) rc.push(rid + '.k-c' + (rx.nL + ci)); });
          ops.push({ o: 'tex', r: rid, t: rx.texTagged });
          if (lc.length) ops.push({ o: 'cls', at: lc, c: 'hl-orange zoom' });
          if (rc.length) ops.push({ o: 'cls', at: rc, c: 'hl-blue zoom' });
          ops.push({ o: 'wait', t: 0.7 }, { o: 'write', r: eid }, { o: 'wait', t: 0.3 });
          if (!ok) ops.push({ o: 'cls', at: eid + '.k-bad', c: 'hl-red zoom' });
        });
        ops.push({ o: 'tex', r: rid, t: rx.texTagged }, { o: 'wait', t: 0.2 });
      });
      stepRows.forEach((r, ri) => {
        const prev = stepRows[ri - 1];
        if (r.k > 0 && prev && prev.ci === r.ci) {
          const d = diff(prev.side, r.side);
          if (d && !d.whole && d.hasOld && d.hasNew) {
            ops.push({ o: 'tex', r: prev.id, t: (prev.k === 0 ? '' : '=') + d.a });
            ops.push({ o: 'tex', r: r.id, t: '=' + d.b });
            ops.push({ o: 'write', r: r.id }, { o: 'wait', t: 0.5 });
            ops.push({ o: 'cls', at: prev.id + '.k-o', c: 'hl-orange ul-orange zoom' }, { o: 'wait', t: 0.8 });
            ops.push({ o: 'arrow', id: 'd' + ri, from: prev.id + '.k-o', to: r.id + '.k-n', color: 'purple', opt: { from: 'bottom', to: 'top', side: 'right', bend: 60 } }, { o: 'wait', t: 0.4 });
            ops.push({ o: 'fly', path: 'd' + ri, label: d.label || '·', color: 'purple' }, { o: 'clear' });
            ops.push({ o: 'cls', at: r.id + '.k-n', c: 'hl-green zoom' }, { o: 'wait', t: 0.5 });
            return;
          }
        }
        if (r.k > 0 && prev && prev.ci === r.ci && prev.side.length < 150 && r.side.length < 150) {
          // the next line is a bigger rewrite: still show where it comes from (previous line underlined and zoomed, a curved arrow, a chip travelling along it, the new line lighting up green)
          const pre = prev.k === 0 ? '' : '=';
          ops.push({ o: 'tex', r: prev.id, t: pre + '\\htmlClass{k-o}{' + prev.side + '}' }, { o: 'tex', r: r.id, t: '=\\htmlClass{k-n}{' + r.side + '}' });
          ops.push({ o: 'write', r: r.id }, { o: 'wait', t: 0.35 });
          ops.push({ o: 'cls', at: prev.id + '.k-o', c: 'hl-orange ul-orange zoom' }, { o: 'wait', t: 0.6 });
          ops.push({ o: 'arrow', id: 'w' + ri, from: prev.id + '.k-o', to: r.id + '.k-n', color: 'purple', opt: { from: 'bottom', to: 'top', side: 'right', bend: 50 } }, { o: 'wait', t: 0.3 });
          ops.push({ o: 'fly', path: 'w' + ri, label: '↓', color: 'purple' }, { o: 'clear' });
          ops.push({ o: 'cls', at: r.id + '.k-n', c: 'hl-green zoom' }, { o: 'wait', t: 0.45 });
          return;
        }
        ops.push({ o: 'write', r: r.id }, { o: 'wait', t: 0.6 });
      });
      // trigonometry: a special-angle statement the book wrote (sin 30° = 1/2 ...) is checked numerically, then shown on the unit circle
      const compile = (root.SBVR && root.SBVR.compile) || (typeof require === 'function' ? (() => { try { return require('./vr_viz.js').compile; } catch (e) { return null; } })() : null);
      if (compile) {
        for (const c of chains) {
          const t = trigAngle(c.sides[0]); if (!t) continue;
          const lhs = compile(c.sides[0]), rhs = compile(c.sides[c.sides.length - 1]);
          if (!lhs || !rhs) continue;
          let a, b; try { a = lhs({}); b = rhs({}); } catch (e) { continue; }
          if (!isFinite(a) || !isFinite(b) || Math.abs(a - b) > 1e-6) continue;       // a statement that does not check out is never animated
          const uid = 'u' + si;
          rows.push({ id: uid, first: si, hideAt: si + 2, viz: { kind: 'circle', alt: 'Unit circle at ' + t.degs.join(' and ') + ' degrees', color: 'blue', layers: t.degs.map((d, k) => ({ at: si, type: 'sweep', deg: d, from: k ? t.degs[k - 1] : 0 })) }, tex: { [si]: '' }, note: '' }); nRows++;
          ops.push({ o: 'wait', t: 0.3 }, { o: 'write', r: uid }); t.degs.forEach((d, k) => ops.push({ o: 'layer', r: uid, i: k, f: 1.4 }, { o: 'wait', t: 0.6 }));
          break;
        }
        // a definite integral the book evaluated: the area under the curve, checked against the book's value (Simpson's rule)
        if (!uidInt) for (const c of chains) {
          const m = /^\\int_\{?(-?[0-9.]+)\}?\^\{?(-?[0-9.]+)\}?(.*?)(?:\\,)?dx$/.exec(c.sides[0].replace(/\s+/g, '').replace(/\\displaystyle/g, ''));
          if (!m || c.sides.length < 2) continue;
          const a0 = parseFloat(m[1]), b0 = parseFloat(m[2]), f = compile(m[3]); if (!f || (f.vars.length && (f.vars.length > 1 || f.vars[0] !== 'x')) || !(b0 > a0)) continue;
          const rhs = compile(c.sides[c.sides.length - 1]); if (!rhs) continue;
          let val, I = 0; try { val = rhs({}); const n = 400, h = (b0 - a0) / n; for (let k = 0; k <= n; k++) { const w = k === 0 || k === n ? 1 : k % 2 ? 4 : 2; I += w * f({ x: a0 + k * h }); } I *= h / 3; } catch (e) { continue; }
          if (!isFinite(I) || !isFinite(val) || Math.abs(I - val) > 1e-4 * Math.max(1, Math.abs(I))) continue;      // not checked, not shown
          const win = graphWindow(Object.assign(x => f({ x: a0 + (b0 - a0) * ((x + 6) / 12) }), { vars: ['x'] })); if (!win) continue;
          const span = b0 - a0, xmin = a0 - span * 0.6, xmax = b0 + span * 0.6;
          const ys = []; for (let k = 0; k <= 60; k++) { try { const y = f({ x: a0 + span * k / 60 }); if (isFinite(y)) ys.push(y); } catch (e) { /* skip */ } }
          const lo = Math.min(0, ...ys), hi = Math.max(0, ...ys), pad = (hi - lo || 1) * 0.25;
          const iid = 'i' + si; uidInt = true;
          rows.push({ id: iid, first: si, hideAt: si + 2, viz: { kind: 'graph', alt: 'Area under the curve from ' + a0 + ' to ' + b0 + ' (' + (Math.round(I * 1e4) / 1e4) + ')', xmin, xmax, ymin: lo - pad, ymax: hi + pad * 1.4,
            layers: [{ at: si, type: 'plot', fn: m[3], color: 'blue', from: xmin, to: xmax }, { at: si, type: 'shade', fn: m[3], a: a0, b: b0, color: 'green' }, { at: si, type: 'text', x: (a0 + b0) / 2 - span * 0.35, y: hi + pad * 0.9, text: 'area = ' + (Math.round(I * 1e4) / 1e4), color: 'green' }] }, tex: { [si]: '' }, note: '' }); nRows++;
          ops.push({ o: 'wait', t: 0.3 }, { o: 'write', r: iid }, { o: 'layer', r: iid, i: 0 }, { o: 'layer', r: iid, i: 1 }, { o: 'layer', r: iid, i: 2 });
          break;
        }
        // a function to draw: the author's own "y = ..." for a question that asks for a graph
        if (!graphDone && o.question && /\b(graph|sketch|plot|draw)\b/i.test(o.question)) {
          for (const c of chains) {
            if (c.sides.length < 2 || !/^(y|f\(x\))$/.test(c.sides[0].trim())) continue;
            const fnSrc = c.sides[1]; const f = compile(fnSrc); if (!f || (f.vars.length && (f.vars.length > 1 || f.vars[0] !== 'x'))) continue;
            if (!f.vars.length || !sameFnInQuestion(f, o.question, compile)) continue;     // only the function the question itself asks to graph
            const win = graphWindow(f); if (!win) continue;
            const gid = 'g' + si; graphDone = true;
            rows.push({ id: gid, first: si, hideAt: si + 2, viz: Object.assign({ kind: 'graph', alt: 'Graph of y = ' + c.src.replace(/^[^=]*=\s*/, ''), layers: [{ at: si, type: 'plot', fn: fnSrc, color: 'blue' }] }, win), tex: { [si]: '' }, note: '' }); nRows++;
            ops.push({ o: 'wait', t: 0.3 }, { o: 'write', r: gid }, { o: 'layer', r: gid, i: 0 });
            break;
          }
        }
      }
      if (boardLayersAt) {
        const starts = boardRows.filter(br => br.from === si);
        if (starts.length) ops.splice(1, 0, ...starts.flatMap(br => [{ o: 'write', r: br.id }, { o: 'wait', t: 0.3 }]));
        boardLayersAt[si].forEach(([rid, k]) => ops.push({ o: 'wait', t: 0.2 }, { o: 'layer', r: rid, i: k, f: 1 }));
      }
      stepsOut.push({ dot: String(si + 1), title: 'Step ' + (si + 1) + ' of ' + groups.length, html: gr.texts.map(esc).join('<br>'), ops });
    });
    if (nRows < 2 && !boardRows.length && !o.maxSteps) return { spec: null, why: 'no-chain' };
    for (let q = rows.length - 1; q >= 0; q--) { if (/^r\d+_/.test(rows[q].id) && rows[q].tex && Object.keys(rows[q].tex).length) { if (!(o.board && o.maxSteps && false)) rows[q].final = 1; break; } }
    // an equation board with no diagram keeps every line (the engine fills the board's height, then continues at the top of the next column, up to three)
    // instead of erasing a line two steps after it was written; boards with a diagram or a hand-chosen figure keep the older behaviour
    const acc = !boardRows.length && !rows.some(r => r.viz);
    if (acc) rows.forEach(r => { delete r.hideAt; r.grp = 'g' + r.first; });
    if (acc && o.fine !== false) { const fs = fineSpec(steps, o); if (fs) { fs.id = 'auto' + (++seq); return { spec: fs, stats: { chains: nChains, rows: fs.rows.length } }; } }
    const id = 'auto' + (++seq);
    return { spec: Object.assign({ id, q: o.q || '', givenText: o.given || '', auto: true, rows, steps: stepsOut }, acc ? { acc: true } : {}), stats: { chains: nChains, rows: nRows } };
  }

  /* html for a worked item: the animated tutor + the plain list of steps behind "All steps". '' when the item cannot be animated safely. */
  const cache = new Map();
  function autoHtml(item, o) {
    if (!item || /^partial/.test(item.solutionStatus || '')) return '';
    // a hand-written solution for this exact question (SBSOL pack): its steps and board replace the short text in the data
    const pack = NS.sol && NS.sol.find(item.question || item.problem || '');
    if (pack) {
      const key = 'pack:' + pack.q; let pid = cache.get(key);
      if (pid === undefined) {
        const qt = String(item.question || item.problem || '').replace(/\s+/g, ' ').trim();
        const r = autoSpec(pack.steps, { q: item.qNo || item.num || '', given: qt.length > 90 ? qt.slice(0, 88) + '…' : qt, question: qt, board: pack.board, maxSteps: 80 });
        pid = r.spec ? r.spec.id : ''; if (r.spec) { NS.specs = NS.specs || {}; NS.specs[pid] = r.spec; } cache.set(key, pid);
      }
      if (pid) return '<div data-sbt-host data-vr="' + pid + '" style="font-weight:400;white-space:normal;"></div>' +
        '<div data-sbt-full data-disp="block" style="display:none;margin-top:.4rem;"><ol style="margin:0;padding-left:1.25rem;line-height:1.8;">' + pack.steps.map(x => '<li style="margin-bottom:.35rem;white-space:pre-line;">' + esc(x) + '</li>').join('') + '</ol></div>';
    }
    let list = Array.isArray(item.steps) && item.steps.length ? item.steps : null;
    if (!list && typeof item.solution === 'string' && item.solution.includes('\n')) list = item.solution.split(/\n+/).map(x => x.trim()).filter(Boolean);   // a worked solution written as lines
    // hand-authored boards attached to the item by id ("vr": "spec-id" or [{label, id}, ...]) or by a rule on its question text (SBVR.rules)
    let vr = item.vr;
    if (!vr && NS.rules) { const qt = String(item.question || item.problem || item.title || ''); const rule = NS.rules.find(x => x.test.test(qt)); if (rule) vr = rule.vr; }
    if (vr) {
      const parts = [].concat(vr).map(v => typeof v === 'string' ? { id: v } : v).filter(v => NS.specs && NS.specs[v.id]);
      if (parts.length) {
        const hostOf = id => '<div data-sbt-host data-vr="' + id + '" style="font-weight:400;white-space:normal;"></div>';
        return (parts.length > 1
          ? parts.map((v, k) => '<details class="sbvr-part"' + (k === 0 ? ' open' : '') + ' style="margin:.3rem 0;"><summary style="font-weight:700;cursor:pointer;">Part ' + esc(v.label || (k + 1)) + '</summary>' + hostOf(v.id) + '</details>').join('')
          : parts.map(v => (v.label ? '<div style="font-weight:700;margin:.5rem 0 .15rem;">' + esc(v.label) + '</div>' : '') + hostOf(v.id)).join('')) +
          (list && list.every(x => typeof x === 'string') ? '<div data-sbt-full data-disp="block" style="display:none;margin-top:.4rem;"><ol style="margin:0;padding-left:1.25rem;line-height:1.8;">' + list.map(x => '<li style="margin-bottom:.35rem;white-space:pre-line;">' + esc(x) + '</li>').join('') + '</ol></div>' : '');
      }
    }
    if (!list || list.length < 1 || list.some(x => typeof x !== 'string')) return '';
    item = { steps: list, question: item.question || item.problem || '', qNo: item.qNo, solutionStatus: item.solutionStatus };
    const key = item.steps.join('\n');
    let id = cache.get(key);
    if (id === undefined) {
      const q = String(item.question || '').split('\n')[0].replace(/\s+/g, ' ').trim();
      const r = autoSpec(item.steps, { q: (item.qNo || o && o.q || ''), given: q.length > 90 ? q.slice(0, 88) + '…' : q, question: String(item.question || '') });
      id = r.spec ? r.spec.id : '';
      if (r.spec) NS.specs = NS.specs || {}, NS.specs[id] = r.spec;
      cache.set(key, id);
    }
    if (!id) return '';
    return '<div data-sbt-host data-vr="' + id + '" style="font-weight:400;white-space:normal;"></div>' +
      '<div data-sbt-full data-disp="block" style="display:none;margin-top:.4rem;"><ol style="margin:0;padding-left:1.25rem;line-height:1.8;">' +
      item.steps.map(x => '<li style="margin-bottom:.35rem;white-space:pre-line;">' + esc(x) + '</li>').join('') + '</ol></div>';
  }

  /* the books' trilingual answer panel (sb_solve.js): add "Animate" when the English steps hold equation chains */
  function autoFromSolve(panel, steps, declared, slotsFn) {
    const texts = steps.map(s => {
      const sl = slotsFn(s, declared) || {};
      const en = sl.en ? s[sl.en] : (typeof s.en === 'string' ? s.en : '');
      return { text: String(en || ''), m: s.m ? String(s.m) : '' };
    });
    // fraction / BODMAS questions: the arithmetic narrator re-does every operation in small verified steps (js/vr_arith.js); null = not its kind of question
    let spec = null;
    try { spec = (NS.arithSpec && NS.arithSpec(texts, { q: '', given: '' })) || (NS.bookRowsSpec && NS.bookRowsSpec(texts, { q: '', given: '' })) || null; } catch (e) { spec = null; }
    if (!spec) { const r = autoSpec(texts, { q: '', given: '' }); spec = r.spec; }
    if (!spec) return;
    const r = { spec };
    NS.specs = NS.specs || {}; NS.specs[r.spec.id] = r.spec;
    const top = panel.querySelector('.sbs-top'); if (!top) return;
    const body = panel.querySelector('.sbs-body'); if (!body) return;
    // two icon tabs in the panel's tool row: the written solution and the animated board (the board is built the first time its tab opens)
    const tools = panel.querySelector('.sbs-tools'); if (!tools) return;
    const mk = (id, glyph, label) => { const t = document.createElement('button'); t.type = 'button'; t.setAttribute('role', 'tab'); t.dataset.tab = id; t.textContent = glyph; t.title = label; t.setAttribute('aria-label', label); return t; };
    const tSol = mk('solution', '📝', 'Written solution'), tAni = mk('animated', '🎬', 'Animated solution');
    tools.prepend(tAni); tools.prepend(tSol);
    const show = which => {
      const ani = which === 'animated';
      let host = panel.querySelector('[data-sbt-host]');
      if (ani && !host) {
        host = document.createElement('div'); host.setAttribute('data-sbt-host', ''); host.dataset.vr = r.spec.id; host.dir = 'ltr'; host.style.cssText = 'margin:.3rem .3rem;white-space:normal;';
        top.after(host); host.dispatchEvent(new Event('scroll', { bubbles: true })); window.dispatchEvent(new Event('scroll'));
      }
      if (host) host.hidden = !ani;
      body.hidden = ani;
      [[tSol, !ani], [tAni, ani]].forEach(([t, on]) => { t.setAttribute('aria-selected', String(on)); });
    };
    tSol.onclick = () => show('solution'); tAni.onclick = () => show('animated');
    show('solution');
  }

  const NS = root.SBVR = root.SBVR || {};
  /* hand-written solutions: SBSOL.add({ q: 'the question text (or its first 40+ characters)', steps: [...], board: {...} }) */
  const PACKS = [];
  NS.sol = { add: p => { PACKS.push(p); }, all: () => PACKS, find: q => { const t = String(q || '').replace(/\s+/g, ' ').trim(); if (!t) return null; return PACKS.find(p => p.re ? p.re.test(t) : (t === p.q || (p.q.length >= 30 && t.startsWith(p.q)))) || null; } };   // a pack may carry `re` (a RegExp on the question) and a label in q
  NS.autoHtml = autoHtml; NS.autoFromSolve = autoFromSolve;
  NS.autoSpec = autoSpec; NS.toTex = toTex; NS.chainsOf = chainsOf; NS.diff = diff;
  if (typeof module !== 'undefined' && module.exports) module.exports = { autoSpec, toTex, chainsOf, diff, atoms, chemOf, reactionOf };
})(typeof window !== 'undefined' ? window : globalThis);
