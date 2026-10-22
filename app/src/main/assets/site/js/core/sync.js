/* SBSync: local-first synchronisation client for api/v2/sync.php.
 *
 *   emit(type, payload)   write an event to the outbox FIRST (IndexedDB), then try to send. Never lost on a failed
 *                         request, a reload or a signed-out session; only the server's accepted/rejected answer
 *                         removes an event.
 *   flush()               send waiting events in batches (oldest first). Errors never change who the user is:
 *                         network/5xx/429/403 -> exponential back-off with jitter (Retry-After honoured),
 *                         401 -> 'authlost' (events stay), 413/422 -> the batch is halved until the poison event is found.
 *   pull()                fetch changes since the stored cursor and merge them into a snapshot (see applyPull).
 *   sync()                flush, then pull.      start()  run on load, 'online', tab visible, every minute.
 *
 * Feature flag: the automatic triggers (sign-in, online, tab visible, every minute, debounce after emit) run only when
 * localStorage 'sb_sync_v2' is 'on' or window.SB_FLAGS.syncV2 is true, so the page behaves exactly as before until the
 * feature modules use this core. flush()/pull() called directly always work.
 *
 * Events recorded while nobody is signed in belong to 'guest'. When someone signs in, pendingGuest() tells how many
 * there are; adoptGuest() moves them to the account (the page asks the student first), otherwise they stay on the device.
 * Event shapes and server rules: api/v2/sync.php.   Node tests: tests/sync/. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.SBSync = factory().create({ store: root.SBStore }); root.SBSync.start(); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const BATCH = 200, BASE_DELAY = 2000, MAX_DELAY = 300000, MAX_BATCHES_PER_FLUSH = 100, FLUSH_DEBOUNCE = 1500, TICK = 60000;
  const REJECTED_KEEP = 50;

  // ---- merge a pull answer into a snapshot (pure; used by pull() and by tests) ----
  function emptySnapshot() {
    return { progress: {}, plans: {}, plansDeleted: {}, tp: { q: {}, days: {}, sessions: {}, run: null, runClearedAt: 0 }, coins: 0 };
  }
  function applyPull(snap, d) {
    Object.keys(d.progress || {}).forEach(k => { snap.progress[k] = d.progress[k]; });
    (d.plans || []).forEach(p => { snap.plans[p.id] = p; delete snap.plansDeleted[p.id]; });
    (d.plansDeleted || []).forEach(id => { delete snap.plans[id]; snap.plansDeleted[id] = true; });
    const tp = d.tp || {};
    Object.keys(tp.q || {}).forEach(k => { snap.tp.q[k] = tp.q[k]; });
    Object.keys(tp.days || {}).forEach(t => {
      snap.tp.days[t] = snap.tp.days[t] || {};
      Object.keys(tp.days[t]).forEach(day => { snap.tp.days[t][day] = tp.days[t][day]; });
    });
    (tp.sessions || []).forEach(s => { if (s && s.id) snap.tp.sessions[s.id] = s; });
    if ('run' in tp) { snap.tp.run = tp.run || null; snap.tp.runClearedAt = tp.runClearedAt || 0; }
    if (typeof d.coins === 'number') snap.coins = d.coins;
    return snap;
  }

  function pad(n, w) { return String(n).padStart(w, '0'); }

  function create(opts) {
    opts = opts || {};
    const store = opts.store;
    const endpoint = opts.endpoint || 'api/v2/sync.php';
    const doFetch = opts.fetch || ((u, o) => fetch(u, o));
    const nowMs = opts.now || (() => Date.now());
    const rand = opts.random || Math.random;
    const T = opts.timers || { setTimeout: (f, ms) => setTimeout(f, ms), clearTimeout: id => clearTimeout(id), setInterval: (f, ms) => setInterval(f, ms) };
    const enabled = opts.enabled || (() => {
      try { if (typeof window !== 'undefined' && window.SB_FLAGS && window.SB_FLAGS.syncV2) return true; return typeof localStorage !== 'undefined' && localStorage.getItem('sb_sync_v2') === 'on'; } catch (e) { return false; }
    });
    const isOnline = opts.isOnline || (() => (typeof navigator === 'undefined' || navigator.onLine !== false));
    const uuid = opts.uuid || (() => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
      const h = n => Array.from({ length: n }, () => Math.floor(rand() * 16).toString(16)).join('');
      return h(8) + '-' + h(4) + '-4' + h(3) + '-' + '89ab'[Math.floor(rand() * 4)] + h(3) + '-' + h(12);
    });

    const listeners = {};
    const on = (name, fn) => { (listeners[name] = listeners[name] || []).push(fn); };
    const fire = (name, arg) => (listeners[name] || []).forEach(fn => { try { fn(arg); } catch (e) { /* a listener must not break sync */ } });

    let user = null;              // signed-in user id (string) or null
    let device = null;            // {id, token} for the signed-in user, or null (then the session cookie is used)
    let deviceId = null;          // this browser, stable
    let authLost = false;
    let failures = 0, nextAttemptAt = 0, retryTimer = null, debounceTimer = null;
    let flushing = null, again = false, pulling = null, lastTs = 0, lastError = null;
    let inflight = new Set();     // outbox keys of the batch being sent right now
    let batchSize = BATCH;

    const ready = (async () => {
      await store.ready;
      deviceId = await store.get('meta', 'deviceId');
      if (!deviceId) { deviceId = uuid(); await store.put('meta', 'deviceId', deviceId); }
    })();

    // ---- identity ----
    async function setDevice(userId, dev) {          // after login/register returned a device token
      await ready;
      await store.put('meta', 'device:' + userId, dev);
      if (String(userId) === user) { device = dev; authLost = false; }
    }
    async function clearDevice(userId) {             // after logout: forget the token, keep the events
      await ready;
      await store.del('meta', 'device:' + userId);
      if (String(userId) === user) device = null;
    }
    async function setUser(u) {                      // u: {id} | null   (called on every 'spacebook:auth')
      await ready;
      const id = u && u.id != null ? String(u.id) : null;
      if (id === user) return;
      user = id; device = null; authLost = false; failures = 0; nextAttemptAt = 0; batchSize = BATCH;
      if (id) {
        device = (await store.get('meta', 'device:' + id)) || null;
        const g = await pendingGuest();
        if (g > 0) fire('guestevents', g);
        schedule(0);
      }
      fire('user', id);
    }
    const credentials = () => (user || '') + '|' + ((device && device.token) || '');
    function bearerHeaders() { return device && device.token ? { Authorization: 'Bearer ' + device.token } : {}; }

    // ---- outbox ----
    async function emit(type, payload) {
      await ready;
      lastTs = Math.max(nowMs(), lastTs + 1);
      const ev = { eventId: uuid(), type, payload, clientTs: nowMs(), schema: 1 };
      const key = pad(lastTs, 15) + '-' + ev.eventId;      // sortable: oldest first, even across tabs
      await store.put('outbox', key, { uid: user || 'guest', ev });
      schedule(FLUSH_DEBOUNCE);
      return ev;
    }
    // For state that is "the latest copy wins" (the unfinished test): replaces the waiting events of this type with a new
    // one so the outbox does not fill with copies. An event that is being sent right now is left alone.
    let latestChain = Promise.resolve();       // emitLatest calls run one after another, else they all read the outbox before any writes
    function emitLatest(type, payload) {
      const job = latestChain.then(async () => {
        await ready;
        for (const [k, v] of await rows(user || 'guest')) if (v.ev.type === type && !inflight.has(k)) await store.del('outbox', k);
        return emit(type, payload);
      });
      latestChain = job.catch(() => {});
      return job;
    }
    async function rows(uid) {
      await ready;
      return (await store.all('outbox')).filter(r => r[1].uid === uid);
    }
    async function pending() { return user ? (await rows(user)).length : 0; }
    async function pendingGuest() { return (await rows('guest')).length; }
    // events of the signed-in user that the server has not confirmed yet, oldest first (modules replay them on top of the pulled snapshot)
    async function pendingEvents() { return user ? (await rows(user)).map(r => r[1].ev) : []; }
    async function adoptGuest() {                   // the student said yes: guest events now belong to the account
      if (!user) return 0;
      const g = await rows('guest');
      for (const [k, v] of g) await store.put('outbox', k, { uid: user, ev: v.ev });
      if (g.length) schedule(0);
      return g.length;
    }

    // ---- sending ----
    function backoff(retryAfterSec) {
      failures++;
      const exp = Math.min(MAX_DELAY, BASE_DELAY * Math.pow(2, failures - 1));
      const wait = retryAfterSec > 0 ? Math.max(retryAfterSec * 1000, BASE_DELAY) : Math.round(exp * (0.5 + rand() * 0.5));
      nextAttemptAt = nowMs() + wait;
      schedule(wait + 50);
      return wait;
    }
    function schedule(ms) {
      if (!user || !enabled()) return;
      if (retryTimer) T.clearTimeout(retryTimer);
      retryTimer = T.setTimeout(() => { retryTimer = null; sync(); }, ms);
    }
    async function request(method, url, body) {
      const headers = Object.assign({}, bearerHeaders());
      const o = { method, credentials: 'same-origin', headers };
      if (body !== undefined) { headers['Content-Type'] = 'application/json'; o.body = JSON.stringify(body); }
      let res;
      try { res = await doFetch(url, o); } catch (e) { return { kind: 'network', error: String(e && e.message || e) }; }
      let json = null;
      try { json = await res.json(); } catch (e) { /* not JSON (proxy error page) */ }
      return { kind: 'http', status: res.status, json, retryAfter: parseInt(res.headers && res.headers.get && res.headers.get('Retry-After'), 10) || 0 };
    }
    async function recordRejected(list) {
      if (!list.length) return;
      const old = (await store.get('meta', 'rejected')) || [];
      await store.put('meta', 'rejected', old.concat(list).slice(-REJECTED_KEEP));
    }

    // Returns {status, sent, accepted, rejected}
    async function flushNow() {
      await ready;
      const res = { status: 'ok', sent: 0, accepted: 0, rejected: 0 };
      if (!user) { res.status = 'no-user'; return res; }
      if (authLost) { res.status = 'auth-lost'; return res; }
      if (!isOnline()) { res.status = 'offline'; return res; }
      if (nowMs() < nextAttemptAt) { res.status = 'backoff'; schedule(nextAttemptAt - nowMs() + 50); return res; }   // keep the retry armed
      for (let n = 0; n < MAX_BATCHES_PER_FLUSH; n++) {
        const batch = (await rows(user)).slice(0, batchSize);
        if (!batch.length) break;
        const keyOf = {};
        batch.forEach(([k, v]) => { keyOf[v.ev.eventId] = k; });
        inflight = new Set(batch.map(b => b[0]));
        const sentWith = credentials();
        const r = await request('POST', endpoint, { events: batch.map(b => b[1].ev) });
        inflight = new Set();
        if (r.kind === 'http' && r.status === 200 && r.json && r.json.ok) {
          const acc = (r.json.accepted || []).map(id => keyOf[String(id).toLowerCase()]).filter(Boolean);
          const rej = (r.json.rejected || []).filter(x => keyOf[String(x.eventId).toLowerCase()]);
          await store.delMany('outbox', acc.concat(rej.map(x => keyOf[String(x.eventId).toLowerCase()])));
          await recordRejected(rej.map(x => ({ eventId: x.eventId, code: x.code, at: nowMs() })));
          res.sent += batch.length; res.accepted += acc.length; res.rejected += rej.length;
          failures = 0; nextAttemptAt = 0; lastError = null; batchSize = Math.min(BATCH, batchSize * 2);
          if (typeof r.json.coins === 'number') fire('coins', r.json.coins);
          // events the server named neither way stay and are retried next round
          if (acc.length + rej.length === 0) { res.status = 'stalled'; backoff(0); break; }
          continue;
        }
        if (r.kind === 'http' && r.status === 401) {
          // a 401 only counts if the credentials are still the ones the request was sent with; if the token or the user
          // changed meanwhile (sign-in finishing), the answer is stale and the events are simply sent again
          if (credentials() !== sentWith) { res.status = 'retry'; schedule(0); break; }
          authLost = true; lastError = 'auth-lost'; res.status = 'auth-lost'; fire('authlost'); break;
        }
        if (r.kind === 'http' && (r.status === 413 || r.status === 422)) {
          if (batch.length > 1) { batchSize = Math.max(1, Math.floor(batch.length / 2)); continue; }   // find the poison event
          await store.del('outbox', batch[0][0]);                 // a single event the server can never accept
          await recordRejected([{ eventId: batch[0][1].ev.eventId, code: 'server_' + r.status, at: nowMs() }]);
          res.rejected++; continue;
        }
        lastError = r.kind === 'network' ? 'network' : 'http ' + r.status;
        res.status = r.kind === 'network' ? 'network-error' : 'http-' + r.status;
        res.waitMs = backoff(r.retryAfter || 0);
        break;
      }
      return res;
    }
    function flush() {
      if (flushing) { again = true; return flushing; }
      flushing = flushNow().finally(() => {
        flushing = null;
        if (again) { again = false; flush(); }
      });
      return flushing;
    }

    // ---- pulling ----
    async function snapshot(uid) { return (await store.get('state', 'snap:' + uid)) || emptySnapshot(); }
    async function pullNow() {
      await ready;
      if (!user) return { status: 'no-user' };
      if (authLost) return { status: 'auth-lost' };
      if (!isOnline()) return { status: 'offline' };
      if (nowMs() < nextAttemptAt) { schedule(nextAttemptAt - nowMs() + 50); return { status: 'backoff' }; }
      const uid = user;
      let cursor = (await store.get('meta', 'cursor:' + uid)) || 0;
      let snap = await snapshot(uid), pages = 0;
      for (let n = 0; n < 50; n++) {
        const sentWith = credentials();
        const r = await request('GET', endpoint + '?since=' + cursor);
        if (r.kind === 'http' && r.status === 200 && r.json && r.json.ok) {
          applyPull(snap, r.json);
          cursor = r.json.cursor;
          await store.put('state', 'snap:' + uid, snap);       // snapshot first, then the cursor: a crash between them re-delivers, never skips
          await store.put('meta', 'cursor:' + uid, cursor);
          pages++; failures = 0; nextAttemptAt = 0; lastError = null;
          fire('pulled', { delta: r.json, snapshot: snap });
          if (!r.json.more) return { status: 'ok', pages, cursor };
          continue;
        }
        if (r.kind === 'http' && r.status === 401) {
          if (credentials() !== sentWith) { schedule(0); return { status: 'retry' }; }      // stale answer, see flushNow
          authLost = true; fire('authlost'); return { status: 'auth-lost' };
        }
        lastError = r.kind === 'network' ? 'network' : 'http ' + r.status;
        backoff(r.retryAfter || 0);
        return { status: r.kind === 'network' ? 'network-error' : 'http-' + r.status, pages };
      }
      return { status: 'ok', pages, cursor };
    }
    function pull() { return pulling || (pulling = pullNow().finally(() => { pulling = null; })); }

    async function sync() {
      const f = await flush();
      const p = f.status === 'ok' || f.status === 'no-user' ? await pull() : { status: 'skipped' };
      return { flush: f, pull: p };
    }

    // ---- lifecycle ----
    function start(env) {
      env = env || {};
      const w = env.window || (typeof window !== 'undefined' ? window : null);
      const d = env.document || (typeof document !== 'undefined' ? document : null);
      if (w && w.addEventListener) w.addEventListener('online', () => { if (!enabled()) return; nextAttemptAt = 0; sync(); });
      if (d && d.addEventListener) {
        d.addEventListener('visibilitychange', () => { if (enabled() && d.visibilityState === 'visible') sync(); });
        d.addEventListener('spacebook:auth', e => { setUser(e.detail && e.detail.user); });
      }
      T.setInterval(() => { if (user && enabled()) sync(); }, TICK);
    }

    return {
      ready, on, emit, emitLatest, flush, pull, sync, start, setUser, setDevice, clearDevice, bearerHeaders,
      pending, pendingGuest, pendingEvents, adoptGuest, isEnabled: () => !!enabled(), snapshot: () => (user ? snapshot(user) : Promise.resolve(emptySnapshot())),
      rejected: async () => (await store.get('meta', 'rejected')) || [],
      status: async () => ({ user, signedIn: !!user, hasDeviceToken: !!(device && device.token), pending: await pending(), pendingGuest: await pendingGuest(),
        authLost, failures, nextAttemptAt, lastError, deviceId }),
      get deviceId() { return deviceId; },
    };
  }

  return { create, applyPull, emptySnapshot };
});
