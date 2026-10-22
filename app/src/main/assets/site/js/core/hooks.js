/* SBHooks (Phase 5): one registry for "this function is extended by other modules", in place of every module reassigning a global.
 *
 * Before: each reader did   const original = window.switchSubjectTab;  window.switchSubjectTab = function (...) { ...original.apply(this, arguments)... };
 * so the behaviour of one call depended on which scripts happened to load in which order, and nothing listed who had wrapped what.
 * Now:    SBHooks.use('switchSubjectTab', next => function (subjKey, tabId, chIdx, classId) { ...next.apply(this, arguments)... });
 *
 *   SBHooks.use(name, factory, {id})   factory(next) returns the function that replaces `next`. Registration order is composition order: the
 *                                      first registered wraps the original, the last registered is outermost (exactly the old wrapper chain).
 *   SBHooks.replace(name, fn, {id})    an override that never calls the original: use(name, () => fn)
 *   SBHooks.list()                     { name: [ids in order] }: who extends what (also read by tests/hooks and tools/validate.js)
 *   SBHooks.base(name)                 the original function
 *   SBHooks.reset()                    tests only
 *
 * The global (window[name]) is replaced once, by a stable dispatcher; the composed chain is built on the first call after a change. Callers
 * (onclick attributes, other modules) keep calling the global by its name. A module must not assign window[name] itself any more:
 * tools/validate.js fails when a script other than this one does it for a name listed in SB_HOOKED_FUNCTIONS (tools/validate.js). */
(function (root) {
  'use strict';
  const reg = {};

  function build(e) {
    return e.entries.reduce((next, ent) => ent.factory(next), e.base);
  }

  const shortName = s => (s ? String(s).replace(/[?#].*$/, '').replace(/^.*\//, '') : '?');     // the script that registered: for list()

  function use(name, factory, opts) {
    if (typeof factory !== 'function') throw new TypeError('SBHooks.use(' + name + '): factory must be a function');
    let e = reg[name];
    if (!e) {
      if (typeof root[name] !== 'function') throw new Error('SBHooks.use: window.' + name + ' is not a function (is it defined before this script?)');
      e = reg[name] = { base: root[name], entries: [], chain: null };
      e.dispatch = function () { return (e.chain || (e.chain = build(e))).apply(this, arguments); };
      Object.defineProperty(e.dispatch, 'name', { value: name, configurable: true });
      e.dispatch.__sbHooked = true;                                   // tools/wrappers_audit.js tells hook dispatchers from hand-made wrappers
      root[name] = e.dispatch;
    }
    const src = (opts && opts.id) || shortName((root.document && root.document.currentScript && root.document.currentScript.src) || root.__sbCurrentSrc);
    e.entries.push({ factory, id: src });
    e.chain = null;
    return e.dispatch;
  }

  function list() {
    const out = {};
    Object.keys(reg).forEach(n => { out[n] = reg[n].entries.map(x => x.id); });
    return out;
  }

  // an override that does not call the original (a newer renderer for the same function)
  const replace = (name, fn, opts) => use(name, () => fn, opts);

  root.SBHooks = { use, replace, list, base: n => reg[n] && reg[n].base, reset() { Object.keys(reg).forEach(n => { root[n] = reg[n].base; delete reg[n]; }); } };
})(typeof window !== 'undefined' ? window : globalThis);
