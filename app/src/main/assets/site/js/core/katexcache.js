/* katexcache.js: the same formula is typeset once.
 *
 * A chapter is drawn more than once: the reader draws the tab, the open-book view (js/sb_book_spread.js) draws it again as facing pages, the structure planner
 * (js/sb_structure.js) draws every tab once to plan the chapter, and every return to a chapter draws it again. Each time KaTeX turned the same TeX text into the
 * same HTML (1.8 s of a 6 s chapter open on a desktop; a Class 11 Maths lesson has 6,000 formulas). katex.renderToString is a pure function of its text and its
 * plain options, so its answer is kept (at most 5,000 answers, the oldest dropped first, about 10 MB at most). A call with an option that is not a plain value
 * (macros, a trust function ...) is never cached. Loaded after js/sb_vertical.js, which also wraps renderToString: this is the outermost layer. */
(function () {
  'use strict';
  const k = window.katex;
  if (!k || typeof k.renderToString !== 'function' || k.__sbCache) return;
  const orig = k.renderToString.bind(k);
  const memo = new Map(), MAX = 5000;
  const PLAIN = { displayMode: 1, throwOnError: 1, strict: 1, output: 1, trust: 1, errorColor: 1, fleqn: 1, leqno: 1 };
  k.renderToString = function (tex, opts) {
    if (typeof tex !== 'string' || tex.length > 4000) return orig(tex, opts);
    let key = '';
    if (opts) {
      for (const n in opts) {
        const v = opts[n];
        if (!PLAIN[n] || typeof v === 'function' || (v !== null && typeof v === 'object')) return orig(tex, opts);
        key += n + '=' + v + ';';
      }
    }
    key += '\u0001' + tex;
    let out = memo.get(key);
    if (out !== undefined) return out;
    out = orig(tex, opts);
    if (memo.size >= MAX) memo.delete(memo.keys().next().value);
    memo.set(key, out);
    return out;
  };
  k.__sbCache = { size: () => memo.size, clear: () => memo.clear() };
})();
