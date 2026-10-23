/* SBEntitlements: what the student may use, from api/v2/entitlements.php: the one server-side place (sb_entitlements()) that decides the payment
 * plan, read by the website (here) and by the Android app (data/repo EntitlementsRepository). Today everything is unlocked ("free for everyone");
 * when a plan limits something, the server changes and both platforms follow with no release.
 *
 *   SBEntitlements.allows('testPrep')   true unless the server said false for that feature (or locked everything)
 *   SBEntitlements.plan()               'free' | ...        SBEntitlements.get()  the last answer
 *   SBEntitlements.load()               ask the server now (done on start and at every sign-in); a failed request keeps the last answer
 *
 * Nothing is gated by it yet, as in the app. The last answer is kept in localStorage 'sb_entitlements' so a page with no network still knows
 * the plan; with no answer ever, everything is allowed. Node tests: tests/sync/entitlements.js. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.SBEntitlements = factory().create({}); root.SBEntitlements.start(); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const KEY = 'sb_entitlements';

  function create(opts) {
    opts = opts || {};
    const g = typeof self !== 'undefined' ? self : {};
    const doFetch = opts.fetch || ((u, o) => g.fetch(u, o));
    let ls = null;
    try { ls = opts.storage !== undefined ? opts.storage : g.localStorage; } catch (e) { ls = null; }
    const listeners = [];
    const DEFAULT = { ok: true, plan: 'free', signedIn: false, unlocked: true, classes: 'all', features: {}, flags: {}, version: 1 };
    let current = DEFAULT;
    try { const raw = ls && ls.getItem(KEY); const v = raw && JSON.parse(raw); if (v && typeof v === 'object' && v.ok) current = Object.assign({}, DEFAULT, v); } catch (e) { /* unreadable: everything stays allowed */ }

    function headers() { try { return (opts.headers || (() => (g.SBSync && g.SBSync.bearerHeaders ? g.SBSync.bearerHeaders() : {})))(); } catch (e) { return {}; } }
    async function load() {
      try {
        const res = await doFetch(opts.endpoint || 'api/v2/entitlements.php', { credentials: 'same-origin', headers: headers() });
        const j = await res.json();
        if (!res.ok && res.status !== undefined && res.status >= 400) return current;
        if (j && j.ok) {
          current = Object.assign({}, DEFAULT, j);
          try { ls && ls.setItem(KEY, JSON.stringify(current)); } catch (e) { /* storage full or blocked */ }
          listeners.forEach(fn => { try { fn(current); } catch (e) { /* a listener must not break the others */ } });
        }
      } catch (e) { /* offline or not JSON: keep the last answer */ }
      return current;
    }
    const allows = feature => current.unlocked !== false || (current.features || {})[feature] !== false;
    function start(env) {
      env = env || {};
      const d = env.document || (typeof document !== 'undefined' ? document : null);
      if (d && d.addEventListener) d.addEventListener('spacebook:auth', () => { load(); });
      if (!opts.noAutoload && typeof g.fetch === 'function') load();
    }
    return { load, allows, plan: () => current.plan, get: () => current, on: fn => { listeners.push(fn); }, start };
  }
  return { create };
});
