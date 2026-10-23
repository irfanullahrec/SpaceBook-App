/* SBOfflineQueue: what a signed-in student does while the connection is down is kept on the device and sent when it is back.
 *
 * The older server calls (coins and steps api/progress.php, study plans api/study_plans.php, tests api/test_prep.php) used to be lost when the phone
 * had no signal at the moment of the call. They now go through send(): a call that cannot reach the server (no network, 5xx, 429) is written to a
 * small queue in localStorage and answered {ok:false, queued:true}, and the queue is sent, oldest first, when the browser says it is online, when
 * the page is shown again, a few seconds after the page loads and every minute. A call the server answered, even with an error, is never queued:
 * it is the server's decision. The v2 sync (js/core/sync.js) has its own, larger outbox; this is for the calls that never moved to it.
 *
 *   send(url, body, {dedupe})   POST json; resolves the server's answer, or {ok:false, queued:true}. `dedupe`: a newer call with the same key
 *                               replaces an older one that is still waiting (a plan saved ten times offline is sent once).
 *   flush()                     send what waits; resolves {sent, left}.       pending()   how many wait (for the signed-in student)
 * Items carry the id of the student who made them: a shared phone never sends one student's work under another's session.
 * node: require('./offline_queue.js') gives {create}; the tests pass a fake fetch, storage and clock. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.SBOfflineQueue = factory().create({ root }); root.SBOfflineQueue.start(); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const KEY = 'sb_oq_v1', MAX = 400, TICK = 60000;

  function create(o) {
    o = o || {};
    const root = o.root || {};
    const storage = o.storage || (() => { try { return root.localStorage; } catch (e) { return null; } })();
    const doFetch = o.fetch || ((u, x) => root.fetch(u, x));
    const now = o.now || (() => Date.now());
    const uid = o.user || (() => { try { const u = root.SpaceBookAuth && root.SpaceBookAuth.user; return u && u.id ? String(u.id) : ''; } catch (e) { return ''; } });
    let flushing = null, timer = 0;

    const load = () => { try { const v = JSON.parse(storage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } };
    const save = q => { try { storage.setItem(KEY, JSON.stringify(q.slice(-MAX))); } catch (e) { /* storage full or blocked: the call is simply not kept */ } };
    const post = (url, body) => doFetch(url, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    // can the server not be reached right now? (a thrown fetch = no network; 5xx and 429 = try again later)
    const busy = r => r.status >= 500 || r.status === 429;

    function enqueue(item) {
      const q = load();
      if (item.dedupe) for (let i = q.length - 1; i >= 0; i--) if (q[i].dedupe === item.dedupe && q[i].uid === item.uid) q.splice(i, 1);
      q.push(item); save(q);
    }

    async function send(url, body, opt) {
      const who = uid();
      try {
        const r = await post(url, body);
        if (busy(r)) throw new Error('server busy');
        return await r.json();
      } catch (e) {
        if (!who) return { ok: false };                       // nobody is signed in: there is no account to keep it for
        enqueue({ id: String(now()) + Math.random().toString(36).slice(2, 8), url, body, uid: who, at: now(), dedupe: opt && opt.dedupe || '' });
        return { ok: false, queued: true };
      }
    }

    async function flushOnce() {
      const who = uid(); let sent = 0;
      if (!who) return { sent, left: load().length };
      for (;;) {
        const q = load(), i = q.findIndex(x => x.uid === who);
        if (i < 0) break;
        let r;
        try { r = await post(q[i].url, q[i].body); } catch (e) { break; }          // still offline: keep everything, try again later
        if (busy(r)) break;
        const cur = load(), j = cur.findIndex(x => x.id === q[i].id);
        if (j >= 0) { cur.splice(j, 1); save(cur); }                                // answered (even a refusal): the server has decided
        sent++;
      }
      return { sent, left: load().length };
    }
    function flush() { if (!flushing) flushing = flushOnce().finally(() => { flushing = null; }); return flushing; }
    const pending = () => load().filter(x => x.uid === uid()).length;

    function start() {
      if (!root.addEventListener) return;
      root.addEventListener('online', () => { flush(); });
      if (root.document) root.document.addEventListener('visibilitychange', () => { if (!root.document.hidden) flush(); });
      setTimeout(() => flush(), 4000);
      timer = setInterval(() => { if (load().length) flush(); }, TICK);
    }
    return { send, flush, pending, start, _load: load, _stop: () => clearInterval(timer) };
  }
  return { create };
});
