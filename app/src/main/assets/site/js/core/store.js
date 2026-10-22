/* SBStore: small durable key-value storage for the sync outbox and cached state.
 *
 * Stores: 'outbox' (events waiting to be sent), 'meta' (device id, tokens, cursors), 'state' (pulled snapshots).
 * Backends, best first: IndexedDB -> localStorage -> memory (a private window may block the first two; the page
 * still works, nothing survives a reload). Every call returns a Promise. Values are JSON-serialisable.
 *
 *   const s = SBStore.create();                 // browser: window.SBStore is already created
 *   await s.put('meta', 'k', {a: 1});  await s.get('meta', 'k');
 *   await s.all('outbox');                       // [[key, value], ...] sorted by key
 *   await s.del('outbox', key);  await s.delMany('outbox', keys);  await s.count('outbox');
 *   s.kind                                       // 'idb' | 'localStorage' | 'memory' (after `await s.ready`)
 *
 * The outbox is never cleared by this module. In Node tests pass {indexedDB: require('fake-indexeddb').indexedDB}. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SBStore = factory().create();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const STORES = ['outbox', 'meta', 'state'];
  const DB_NAME = 'spacebook';

  function idbBackend(idb) {
    const open = new Promise((resolve, reject) => {
      const req = idb.open(DB_NAME, 1);
      req.onupgradeneeded = () => { STORES.forEach(n => { if (!req.result.objectStoreNames.contains(n)) req.result.createObjectStore(n); }); };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error('indexedDB open failed'));
      req.onblocked = () => reject(new Error('indexedDB blocked'));
    });
    const run = (store, mode, fn) => open.then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(store, mode);
      let out;
      tx.oncomplete = () => resolve(out);
      tx.onerror = tx.onabort = () => reject(tx.error || new Error('indexedDB transaction failed'));
      out = fn(tx.objectStore(store));
    }));
    const req2 = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
    return {
      kind: 'idb', open,
      get: (s, k) => open.then(db => req2(db.transaction(s).objectStore(s).get(k))),
      put: (s, k, v) => run(s, 'readwrite', st => { st.put(v, k); }),
      del: (s, k) => run(s, 'readwrite', st => { st.delete(k); }),
      delMany: (s, ks) => run(s, 'readwrite', st => { ks.forEach(k => st.delete(k)); }),
      all: s => open.then(db => new Promise((resolve, reject) => {
        const out = [], c = db.transaction(s).objectStore(s).openCursor();
        c.onsuccess = () => { const cur = c.result; if (cur) { out.push([cur.key, cur.value]); cur.continue(); } else resolve(out); };
        c.onerror = () => reject(c.error);
      })),
      count: s => open.then(db => req2(db.transaction(s).objectStore(s).count())),
    };
  }

  // localStorage-like object ({getItem,setItem,removeItem,key,length}) or an in-memory map
  function kvBackend(storage, kind) {
    const mem = {};
    const st = storage || { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; },
      key: i => Object.keys(mem)[i] || null, get length() { return Object.keys(mem).length; } };
    const pre = s => 'sbcore:' + s + ':';
    const keys = s => { const out = []; for (let i = 0; i < st.length; i++) { const k = st.key(i); if (k && k.indexOf(pre(s)) === 0) out.push(k.slice(pre(s).length)); } return out.sort(); };
    return {
      kind: storage ? kind : 'memory',
      get: (s, k) => { const v = st.getItem(pre(s) + k); return Promise.resolve(v == null ? undefined : JSON.parse(v)); },
      put: (s, k, v) => { st.setItem(pre(s) + k, JSON.stringify(v)); return Promise.resolve(); },
      del: (s, k) => { st.removeItem(pre(s) + k); return Promise.resolve(); },
      delMany: (s, ks) => { ks.forEach(k => st.removeItem(pre(s) + k)); return Promise.resolve(); },
      all: s => Promise.resolve(keys(s).map(k => [k, JSON.parse(st.getItem(pre(s) + k))])),
      count: s => Promise.resolve(keys(s).length),
    };
  }

  function create(opts) {
    opts = opts || {};
    const g = typeof self !== 'undefined' ? self : {};
    const idb = opts.indexedDB !== undefined ? opts.indexedDB : g.indexedDB;
    let ls = null;
    try { ls = opts.localStorage !== undefined ? opts.localStorage : g.localStorage; if (ls) { ls.setItem('sbcore:probe', '1'); ls.removeItem('sbcore:probe'); } } catch (e) { ls = null; }
    let backend = null;
    const self2 = { kind: 'pending' };
    self2.ready = (async () => {
      if (idb) { try { const b = idbBackend(idb); await b.open; backend = b; } catch (e) { backend = null; } }
      if (!backend) backend = kvBackend(ls, 'localStorage');
      self2.kind = backend.kind;
      return backend.kind;
    })();
    ['get', 'put', 'del', 'delMany', 'all', 'count'].forEach(m => { self2[m] = (...a) => self2.ready.then(() => backend[m](...a)); });
    return self2;
  }

  return { create: create, STORES: STORES };
});
