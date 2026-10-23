/* SBItems: the student's own marks that follow them from one device to another: bookmarks, notes and highlights, where they stopped
 * reading, marked words, best game runs, the chosen class, ticked Board SLOs. The kinds, their keys and the merge rules are the
 * server's (api/lib/items.php); the Android app keeps the same items in its own database and sends the same events.
 *
 *   SBItems.put(kind, key, value[, {at}])   write here at once, then queue an item.put for the account (signed in)
 *   SBItems.del(kind, key)                  the same for a delete (a tombstone, so an older save cannot bring it back)
 *   SBItems.get(kind, key) / list(kind)     what is stored here: {key, value, at}; deleted items are not listed
 *   SBItems.on('change', fn)                fn({kind, key, value|null, origin: 'local' | 'remote'}) after every change
 *   SBItems.syncNow()                       send what is waiting and pull what the other devices changed
 *
 * Local first: nothing waits for the network. A guest's items live under sbItems:v1:guest; when somebody signs in they are offered to
 * the account (SBConsent, never merged silently) and stay on the device if the answer is no. Like every other use of api/v2/sync.php
 * this follows the owner's one switch (SBSync.isEnabled(), published by the server as flags.syncV2, api/lib/flags.php): with it off
 * nothing is sent and no request is made, the items simply stay on this device; when it is turned on everything not yet sent is queued.
 * Merge rule, the same as the server's: the later `at` wins; equal times: the server's copy; best game runs (gbest) only go up.
 * Node tests: tests/sync/items.js.  */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.SBItems = factory().create({}); root.SBItems.start(); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  function create(opts) {
    opts = opts || {};
    const g = typeof self !== 'undefined' ? self : {};
    const syncOf = () => opts.sync || g.SBSync || null;
    const consentOf = () => opts.consent || g.SBConsent || null;
    const enabled = () => { const S = syncOf(); return !!(S && S.isEnabled && S.isEnabled()); };
    const nowMs = opts.now || (() => Date.now());
    let ls = null;
    try { ls = opts.storage !== undefined ? opts.storage : g.localStorage; } catch (e) { ls = null; }
    const mem = {};
    let evUser;                                     // who the last 'spacebook:auth' said is signed in (undefined until the first one)
    const userId = opts.userId || (() => {
      if (evUser !== undefined) return evUser;
      try { const u = g.SpaceBookAuth && g.SpaceBookAuth.user; return u && u.id != null ? String(u.id) : null; } catch (e) { return null; }
    });
    const keyOf = uid => 'sbItems:v1:' + (uid || 'guest');
    const listeners = {};
    const on = (name, fn) => { (listeners[name] = listeners[name] || []).push(fn); };
    const fire = (name, arg) => (listeners[name] || []).forEach(fn => { try { fn(arg); } catch (e) { /* a listener must not break the others */ } });

    let lastAt = 0;
    const tick = () => (lastAt = Math.max(nowMs(), lastAt + 1));

    // ---- local store: { kind: { key: {v, at, s, d} } }   s = 1 once the event is in the sync outbox, d = 1 for a tombstone
    function read(uid) {
      try { const raw = ls ? ls.getItem(keyOf(uid)) : mem[keyOf(uid)]; const o = raw ? JSON.parse(raw) : {}; return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; }
    }
    function write(uid, data) {
      const raw = JSON.stringify(data);
      try { if (ls) ls.setItem(keyOf(uid), raw); else mem[keyOf(uid)] = raw; } catch (e) { mem[keyOf(uid)] = raw; /* storage full or blocked: kept for this page only */ }
    }
    let cache = null, cacheUid = '';
    function db() {
      const uid = userId() || '';
      if (cache && cacheUid === uid) return cache;
      cacheUid = uid; cache = read(uid || null);
      return cache;
    }
    const save = () => write(cacheUid || null, cache);
    const slot = (d, kind) => (d[kind] = d[kind] || {});

    function get(kind, key) {
      const it = (db()[kind] || {})[key];
      return it && !it.d ? it.v : null;
    }
    function list(kind) {
      const m = db()[kind] || {};
      return Object.keys(m).filter(k => !m[k].d).map(k => ({ key: k, value: m[k].v, at: m[k].at })).sort((a, b) => b.at - a.at);
    }

    // ---- sending
    async function queue(kind, key) {
      const uid = userId(), S = syncOf();
      if (!uid || !S || !enabled()) return;
      const it = (db()[kind] || {})[key];
      if (!it || it.s) return;
      try {
        await S.setUser({ id: uid });
        if (it.d) await S.emit('item.del', { kind, key, at: it.at });
        else await S.emit('item.put', { kind, key, value: it.v, at: it.at });
        it.s = 1; save();
        S.flush().catch(() => {});
      } catch (e) { /* stays unsent: the next sign-in or sync queues it again */ }
    }
    async function put(kind, key, value, o) {
      const at = o && o.at ? o.at : tick();
      const d = db();
      slot(d, kind)[key] = { v: value, at, s: 0 };
      save();
      fire('change', { kind, key, value, at, origin: 'local' });
      await queue(kind, key);
    }
    async function del(kind, key) {
      const d = db();
      const old = (d[kind] || {})[key];
      if (old && old.d) return;
      slot(d, kind)[key] = { d: 1, at: tick(), s: 0 };
      save();
      fire('change', { kind, key, value: null, at: 0, origin: 'local' });
      await queue(kind, key);
    }
    // state a module already had before this feature (marked words, ticked SLOs): queued with its own time, once
    async function adopt(kind, entries) {
      const d = db();
      let n = 0;
      for (const e of entries) {
        const m = slot(d, kind);
        if (m[e.key]) continue;
        m[e.key] = { v: e.value, at: e.at || tick(), s: 0 }; n++;
      }
      if (n) { save(); await backfill(); }
      return n;
    }
    async function backfill() {
      const uid = userId();
      if (!uid || !enabled()) return 0;
      let n = 0;
      const d = db();
      for (const kind of Object.keys(d)) for (const key of Object.keys(d[kind])) if (!d[kind][key].s) { await queue(kind, key); n++; }
      return n;
    }

    // ---- receiving (a pulled snapshot, see SBSync.applyPull)
    function merge(snap) {
      if (!userId() || !snap) return 0;
      const d = db();
      let changed = 0;
      const items = snap.items || {}, gone = snap.itemsGone || {};
      Object.keys(items).forEach(kind => Object.keys(items[kind]).forEach(key => {
        const r = items[kind][key], l = (d[kind] || {})[key];
        if (!l) { slot(d, kind)[key] = { v: r.v, at: r.at, s: 1 }; changed++; fire('change', { kind, key, value: r.v, at: r.at, origin: 'remote' }); return; }
        if (kind === 'gbest') {
          if (l.d || !l.v || r.v.b > l.v.b) { slot(d, kind)[key] = { v: r.v, at: r.at, s: 1 }; changed++; fire('change', { kind, key, value: r.v, at: r.at, origin: 'remote' }); }
          return;
        }
        if (r.at > l.at || (r.at === l.at && !l.d && JSON.stringify(l.v) !== JSON.stringify(r.v) && l.s)) {
          slot(d, kind)[key] = { v: r.v, at: r.at, s: 1 }; changed++; fire('change', { kind, key, value: r.v, at: r.at, origin: 'remote' });
        } else if (r.at === l.at && l.d) { slot(d, kind)[key] = { v: r.v, at: r.at, s: 1 }; changed++; fire('change', { kind, key, value: r.v, at: r.at, origin: 'remote' }); }
      }));
      Object.keys(gone).forEach(kind => Object.keys(gone[kind]).forEach(key => {
        const at = gone[kind][key], l = (d[kind] || {})[key];
        if (l && l.d) { if (at > l.at) { l.at = at; l.s = 1; } return; }
        if (l && l.at > at) return;                                   // our save is newer than that delete
        slot(d, kind)[key] = { d: 1, at, s: 1 };
        if (l) { changed++; fire('change', { kind, key, value: null, at, origin: 'remote' }); }
      }));
      if (changed) save();
      return changed;
    }

    // ---- the account: guest items offered, then send and pull
    let syncing = null;
    function syncNow() {
      if (!syncing) syncing = (async () => {
        const S = syncOf(), uid = userId();
        if (!S || !uid) return { status: 'no-user' };
        if (!enabled()) return { status: 'sync-off' };
        try { await S.setUser({ id: uid }); } catch (e) { /* fine */ }
        await backfill();
        let r = { status: 'offline' };
        try { r = await S.sync(); } catch (e) { /* offline: the outbox keeps everything */ }
        try { merge(await S.snapshot()); } catch (e) { /* no snapshot yet */ }
        return r;
      })().finally(() => { syncing = null; });
      return syncing;
    }
    async function onAuth(user) {
      evUser = user && user.id != null ? String(user.id) : null;
      cache = null;
      if (!user || user.id == null || !enabled()) return;
      const uid = String(user.id);
      const guest = read(null);
      const n = Object.keys(guest).reduce((s, k) => s + Object.keys(guest[k]).length, 0);
      if (n) {
        const C = consentOf();
        const yes = C && C.guestData ? await C.guestData(uid) : false;
        if (yes) {
          const mine = read(uid);
          Object.keys(guest).forEach(kind => Object.keys(guest[kind]).forEach(key => {
            const l = (mine[kind] || {})[key], r = guest[kind][key];
            if (!l || r.at > l.at) (mine[kind] = mine[kind] || {})[key] = { v: r.v, at: r.at, s: 0, d: r.d };
          }));
          write(uid, mine);
          write(null, {});
          cache = null;
          fire('adopted', { count: n });
        }
      }
      await syncNow();
      fire('account', { user });
    }

    function start(env) {
      env = env || {};
      const w = env.window || (typeof window !== 'undefined' ? window : null);
      const dd = env.document || (typeof document !== 'undefined' ? document : null);
      if (dd && dd.addEventListener) {
        dd.addEventListener('spacebook:auth', e => { onAuth(e.detail && e.detail.user).catch(() => {}); });
        dd.addEventListener('visibilitychange', () => { if (dd.visibilityState === 'visible' && userId() && enabled()) syncNow().catch(() => {}); });
      }
      if (w && w.addEventListener) w.addEventListener('online', () => { if (userId() && enabled()) syncNow().catch(() => {}); });
      const S = syncOf();
      if (S && S.on) S.on('pulled', e => { try { merge(e && e.snapshot); } catch (err) { /* a bad snapshot must not stop the page */ } });
    }

    return { put, del, get, list, adopt, on, start, syncNow, onAuth, merge, backfill, userId, _db: db };
  }

  return { create };
});
