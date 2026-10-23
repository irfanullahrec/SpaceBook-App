/* SBConsent: asks a signed-in student, once, whether the progress, study plans and practice that were saved on this
 * device while nobody was signed in may be added to their account. On a shared computer (a school lab) that data may
 * belong to someone else, so it is never moved silently.
 *
 *   await SBConsent.guestData(userId)   -> true: add it   |   false: leave it on this device
 *
 * One question per student however many modules ask at the same time (rewards, study plans, Tests Preps share it).
 * A "yes" is not remembered (the data is moved and removed, so there is nothing left to ask about); a "no" is remembered
 * for 7 days so the question does not come back on every page load. The question is a plain confirm() for now;
 * pass {ask} to replace it with a nicer dialog. Node tests: tests/sync/unit.js. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SBConsent = factory().create();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const NO_FOR_MS = 7 * 24 * 3600 * 1000;
  const MESSAGE = 'Progress, study plans, practice, bookmarks or notes were saved on this device while nobody was signed in.\n\nAdd them to your account?\n\n' +
    'OK = add them to my account      Cancel = leave them on this device only';

  function create(opts) {
    opts = opts || {};
    const g = typeof self !== 'undefined' ? self : {};
    const now = opts.now || (() => Date.now());
    const ask = opts.ask || (msg => Promise.resolve(typeof g.confirm === 'function' ? !!g.confirm(msg) : true));
    let ls = null;
    try { ls = opts.storage !== undefined ? opts.storage : g.localStorage; } catch (e) { ls = null; }
    const key = uid => 'sbConsent:no:' + uid;
    const asking = {};
    function declinedRecently(uid) {
      try { const t = ls && Number(ls.getItem(key(uid))); return !!t && now() - t < NO_FOR_MS; } catch (e) { return false; }
    }
    function guestData(uid) {
      uid = String(uid);
      if (declinedRecently(uid)) return Promise.resolve(false);
      if (asking[uid]) return asking[uid];
      asking[uid] = Promise.resolve(ask(MESSAGE)).then(ok => {
        delete asking[uid];
        if (!ok) { try { ls && ls.setItem(key(uid), String(now())); } catch (e) { /* fine */ } }
        return !!ok;
      }, () => { delete asking[uid]; return false; });
      return asking[uid];
    }
    function reset(uid) { try { ls && ls.removeItem(key(String(uid))); } catch (e) { /* fine */ } }
    return { guestData, reset, MESSAGE };
  }
  return { create };
});
