/* SpaceBook vertical solutions.
 * A worked solution such as  A = B = C = D  is shown the way a teacher writes it on the board:
 *     A
 *       = B
 *       = C
 *       = D
 * Every top-level "=" starts a new line, the "=" signs line up, and statements separated by ";" or
 * \quad are given their own rows. Hooks katex.renderToString / katex.render (all classes, Maths and
 * Physics) and re-renders long inline chains inside solution / answer panels.
 */
(function (root) {
  'use strict';
  if (!root.katex || root.katex.__sbVertical) return;
  const SEP_CMDS = ['\\Rightarrow', '\\Leftrightarrow', '\\implies', '\\therefore', '\\because', '\\qquad', '\\quad'];
  const OPEN = '{([', CLOSE = '})]';
  const START_ROW = new Set(['\\Rightarrow', '\\Leftrightarrow', '\\implies', '\\therefore', '\\because']);

  // Split tex at depth-0 positions. Returns list of rows: {lead, parts[]} where parts are separated by "=".
  function verticalize(tex) {
    if (!tex || tex.length < 14 || /\\begin|\\\\|&|\\tag|\\cases|\\substack/.test(tex)) return null;
    const rows = [];
    let cur = {lead: '', parts: ['']};
    let depth = 0, i = 0, leftDepth = 0;
    const push = () => { if (cur.parts.some(p => p.trim()) || cur.lead) rows.push(cur); };
    while (i < tex.length) {
      const ch = tex[i];
      if (ch === '\\') {
        const m = /^\\[A-Za-z]+|^\\./.exec(tex.slice(i));
        const cmd = m[0];
        if (cmd === '\\left') leftDepth++;
        else if (cmd === '\\right') leftDepth = Math.max(0, leftDepth - 1);
        if (depth === 0 && leftDepth === 0 && SEP_CMDS.includes(cmd)) {
          i += cmd.length;
          if (START_ROW.has(cmd)) { push(); cur = {lead: cmd + '\\ ', parts: ['']}; }
          else { // \quad, \qquad: only a row break when the row already holds an "="
            if (cur.parts.length > 1) { push(); cur = {lead: '', parts: ['']}; }
            else cur.parts[cur.parts.length - 1] += cmd;
          }
          continue;
        }
        cur.parts[cur.parts.length - 1] += cmd; i += cmd.length; continue;
      }
      if (OPEN.includes(ch)) depth++;
      else if (CLOSE.includes(ch)) depth = Math.max(0, depth - 1);
      if (depth === 0 && leftDepth === 0) {
        if (ch === ';' ) { push(); cur = {lead: '', parts: ['']}; i++; continue; }
        if (ch === '=' && tex[i - 1] !== '<' && tex[i - 1] !== '>' && tex[i - 1] !== '!') { cur.parts.push(''); i++; continue; }
      }
      cur.parts[cur.parts.length - 1] += ch; i++;
    }
    push();
    const eqs = rows.reduce((n, r) => n + (r.parts.length - 1), 0);
    if (eqs < 2 && !(eqs === 1 && rows.length > 1)) return null;
    if (eqs < 2 && tex.length < 40) return null;
    return rows;
  }

  function toAligned(tex) {
    const rows = verticalize(tex);
    if (!rows) return tex;
    const lines = [];
    rows.forEach((r, k) => {
      const first = (r.lead + r.parts[0]).trim();
      if (r.parts.length === 1) { lines.push(`{}&${first}`); return; }
      lines.push(`${first||'{}'}&=${r.parts[1].trim()}`);
      for (let j = 2; j < r.parts.length; j++) lines.push(`{}&=${r.parts[j].trim()}`);
      if (k < rows.length - 1) lines[lines.length - 1] += '\\\\[0.35em]';
    });
    // keep the explicit row gaps only between statements; plain rows break normally
    let out = '';
    lines.forEach((l, k) => { out += l; if (k < lines.length - 1 && !l.endsWith(']')) out += '\\\\'; });
    return `\\begin{aligned}${out}\\end{aligned}`;
  }

  const k = root.katex;
  const rts = k.renderToString.bind(k);
  k.renderToString = function (tex, opts) {
    opts = opts || {};
    let html;
    if (opts.displayMode && !opts.sbNoVertical) {
      const v = toAligned(tex);
      if (v !== tex) { try { html = rts(v, opts); return `<span class="sb-vert">${html}</span>`; } catch (e) { /* fall back */ } }
    }
    return rts(tex, opts);
  };
  const rd = k.render.bind(k);
  k.render = function (tex, el, opts) {
    opts = opts || {};
    if (opts.displayMode && !opts.sbNoVertical) { const v = toAligned(tex); if (v !== tex) { try { rd(v, el, opts); el.classList && el.classList.add('sb-vert'); return; } catch (e) { /* fall back */ } } }
    return rd(tex, el, opts);
  };
  k.__sbVertical = true;
  root.SBVertical = {toAligned, verticalize};

  const css = `.sb-vert{display:block;text-align:left}
  .sb-vert .katex-display{text-align:left;margin:.45em 0}
  .sb-vert .katex-display>.katex{text-align:left;display:inline-block}
  .sb-vert .katex .mord.mtight{}
  .sb-vert .katex .base{padding-block:.05em}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // inline chains inside solution / answer panels -> display, vertical
  const PANEL = '.sb-solve,.sbs-final,.sbs-step,[class*="-ans"],[class*="answer"],[class*="solution"],[class*="-solve"]';
  function upgrade(node) {
    if (!node || node.nodeType !== 1) return;
    const list = node.matches && node.matches('.katex') ? [node] : node.querySelectorAll ? node.querySelectorAll('.katex') : [];
    list.forEach(kx => {
      if (kx.closest('.katex-display') || kx.dataset.sbv) return;
      kx.dataset.sbv = '1';
      if (!kx.closest(PANEL)) return;
      const ann = kx.querySelector('annotation[encoding="application/x-tex"]');
      if (!ann) return;
      const tex = ann.textContent;
      if (tex.length < 38 || !verticalize(tex)) return;
      try {
        const span = document.createElement('span');
        span.innerHTML = k.renderToString(tex, {displayMode: true, throwOnError: false, strict: 'ignore', output: 'htmlAndMathml'});
        kx.replaceWith(span.firstElementChild || span);
      } catch (e) { /* keep original */ }
    });
  }
  let queued = false;
  new MutationObserver(muts => {
    if (queued) return; queued = true;
    requestAnimationFrame(() => { queued = false; muts.forEach(m => m.addedNodes.forEach(upgrade)); });
  }).observe(document.documentElement, {childList: true, subtree: true});
})(window);
