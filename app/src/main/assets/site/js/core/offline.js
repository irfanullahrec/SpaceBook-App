/* SBOffline (Phase 4): installable app, books on the device, offline status.
 *
 *   SBOffline.register()                  register sw.js; when a new version is waiting, offer "Update available" (never switches by itself)
 *   SBOffline.loadMap()                   content/offline_map.json: per subject, the book files and images it needs (tools/build/make_offline.js)
 *   SBOffline.estimate(ids)               { files, assets, bytes } still to fetch for these subjects (already stored files are not counted)
 *   SBOffline.download(ids, {onProgress, signal})   fetch, verify (sha256) and store; resolves { ok, bytes, files }; rejects with .code 'quota' | 'integrity' | 'network' | 'aborted'
 *   SBOffline.remove(ids)                 forget the subjects and delete only files no other downloaded subject needs
 *   SBOffline.downloaded()                { subjectId: { at, bytes } } (kept in SBStore 'meta', else localStorage)
 *   SBOffline.openPanel()                 the "Offline books" dialog (also reachable from the header button)
 *   SBOffline.usage()                     { usage, quota, persisted } from the Storage API
 *
 * Book files are stored in the same cache the service worker serves from (sb-content-v1), under the same hash URL lazy.js requests, so
 * a downloaded subject opens with no network. The sync outbox is a separate IndexedDB store and is never touched here.
 * Browsers without a service worker or Cache API simply do not get the feature: the button is not shown. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory;
  else root.SBOffline = factory(root);
})(typeof self !== 'undefined' ? self : this, function (win) {
  'use strict';
  const MAP_URL = 'content/offline_map.json';
  const CONTENT = 'sb-content-v1', ASSETS = 'sb-assets-v1';
  const KEY = 'offline.downloaded';
  const doc = win.document;
  const nav = win.navigator || {};
  let mapPromise = null;

  // The feature runs on the lazy page (its book files are what gets downloaded) or when switched on with localStorage sb_offline = 'on'.
  const flagOn = () => { try { return win.localStorage.getItem('sb_offline') === 'on'; } catch (e) { return false; } };
  const active = () => supported() && (!!win.SBLazy || flagOn());
  const hasCaches = () => typeof win.caches !== 'undefined' && win.caches && typeof win.caches.open === 'function';
  const supported = () => hasCaches() && !!nav.serviceWorker;
  const mb = n => (n / 1e6 >= 10 ? Math.round(n / 1e6) : Math.round(n / 1e5) / 10) + ' MB';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fileUrl = (src, v) => src + '?v=' + v;
  const err = (code, message) => Object.assign(new Error(message || code), { code });

  // ---- what is on the device (which subjects the student downloaded)
  async function readDownloaded() {
    try {
      if (win.SBStore) { const v = await win.SBStore.get('meta', KEY); if (v) return v; }
    } catch (e) { /* fall through to localStorage */ }
    try { return JSON.parse(win.localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; }
  }
  async function writeDownloaded(v) {
    try { if (win.SBStore) { await win.SBStore.put('meta', KEY, v); return; } } catch (e) { /* fall through */ }
    try { win.localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* nothing more to try */ }
  }

  function loadMap() {
    if (!mapPromise) mapPromise = win.fetch(MAP_URL).then(r => { if (!r.ok) throw err('network', 'offline map ' + r.status); return r.json(); }).catch(e => { mapPromise = null; throw e; });
    return mapPromise;
  }

  async function isStored(cacheName, url) { return !!(await (await win.caches.open(cacheName)).match(url)); }

  // the files and images of these subjects that are not on the device yet
  async function missing(ids) {
    const map = await loadMap();
    const files = new Map(), assets = new Map();
    for (const id of ids) {
      const s = map.subjects[id];
      if (!s) continue;
      s.files.forEach(src => files.set(src, map.files[src]));
      s.assets.forEach(a => assets.set(a, map.assets[a]));
    }
    const todoFiles = [], todoAssets = [];
    for (const [src, f] of files) if (!(await isStored(CONTENT, fileUrl(src, f.v)))) todoFiles.push([src, f]);
    for (const [a, info] of assets) if (!(await isStored(ASSETS, a))) todoAssets.push([a, info]);
    return { files: todoFiles, assets: todoAssets, bytes: todoFiles.reduce((n, [, f]) => n + f.bytes, 0) + todoAssets.reduce((n, [, a]) => n + a.bytes, 0) };
  }

  async function estimate(ids) {
    const m = await missing(ids);
    return { files: m.files.length, assets: m.assets.length, bytes: m.bytes };
  }

  async function usage() {
    const out = { usage: null, quota: null, persisted: null };
    try { if (nav.storage && nav.storage.estimate) { const e = await nav.storage.estimate(); out.usage = e.usage; out.quota = e.quota; } } catch (e) { /* unknown */ }
    try { if (nav.storage && nav.storage.persisted) out.persisted = await nav.storage.persisted(); } catch (e) { /* unknown */ }
    return out;
  }

  const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  async function sha256Matches(bytes, expected, isText) {
    const subtle = win.crypto && win.crypto.subtle;
    if (!subtle) return true;                                    // no Web Crypto (very old browser or insecure origin): nothing to verify with
    if (hex(await subtle.digest('SHA-256', bytes)) === expected) return true;
    if (!isText) return false;
    // the committed hash is of the LF form; a host that serves CRLF (a manual upload from Windows) has the same text
    const text = new TextDecoder().decode(bytes).replace(/\r\n/g, '\n');
    return hex(await subtle.digest('SHA-256', new TextEncoder().encode(text))) === expected;
  }

  async function download(ids, opts = {}) {
    if (!supported()) throw err('network', 'offline storage is not available in this browser');
    const signal = opts.signal;
    const todo = await missing(ids);
    try { if (nav.storage && nav.storage.persist) nav.storage.persist(); } catch (e) { /* only a request */ }
    const u = await usage();
    if (u.quota != null && u.usage != null && todo.bytes * 1.1 > u.quota - u.usage) throw err('quota', 'not enough space: need ' + mb(todo.bytes) + ', free ' + mb(Math.max(0, u.quota - u.usage)));
    const total = todo.bytes, count = todo.files.length + todo.assets.length;
    let done = 0, doneFiles = 0;
    const tick = name => { if (opts.onProgress) opts.onProgress({ doneBytes: done, totalBytes: total, doneFiles, totalFiles: count, current: name }); };
    tick('');
    const content = await win.caches.open(CONTENT), assets = await win.caches.open(ASSETS);
    const put = async (cache, url, res) => {
      try { await cache.put(url, res); } catch (e) { throw err(e && e.name === 'QuotaExceededError' ? 'quota' : 'network', e && e.message); }
    };
    for (const [src, f] of todo.files) {
      if (signal && signal.aborted) throw err('aborted');
      const url = fileUrl(src, f.v);
      let res;
      try { res = await win.fetch(url, { signal }); } catch (e) { throw err(e && e.name === 'AbortError' ? 'aborted' : 'network', e && e.message); }
      if (!res.ok) throw err('network', url + ' ' + res.status);
      const bytes = await res.clone().arrayBuffer();
      if (!(await sha256Matches(bytes, f.sha256, /\.(js|json|css)$/.test(src)))) throw err('integrity', src + ' does not match the published version');
      await put(content, url, res);
      done += f.bytes; doneFiles++; tick(src);
    }
    for (const [a, info] of todo.assets) {
      if (signal && signal.aborted) throw err('aborted');
      let res;
      try { res = await win.fetch(a, { signal }); } catch (e) { throw err(e && e.name === 'AbortError' ? 'aborted' : 'network', e && e.message); }
      if (!res.ok) throw err('network', a + ' ' + res.status);
      await put(assets, a, res);
      done += info.bytes; doneFiles++; tick(a);
    }
    const map = await loadMap();
    const have = await readDownloaded();
    for (const id of ids) if (map.subjects[id]) have[id] = { at: new Date().toISOString(), bytes: map.subjects[id].bytes };
    await writeDownloaded(have);
    return { ok: true, bytes: total, files: count };
  }

  // forget the subjects; delete only what no remaining downloaded subject needs
  async function remove(ids) {
    const map = await loadMap();
    const have = await readDownloaded();
    ids.forEach(id => { delete have[id]; });
    const keepFiles = new Set(), keepAssets = new Set();
    for (const id of Object.keys(have)) { const s = map.subjects[id]; if (s) { s.files.forEach(f => keepFiles.add(f)); s.assets.forEach(a => keepAssets.add(a)); } }
    const content = await win.caches.open(CONTENT), assets = await win.caches.open(ASSETS);
    let freed = 0;
    for (const id of ids) {
      const s = map.subjects[id];
      if (!s) continue;
      for (const src of s.files) if (!keepFiles.has(src) && await content.delete(fileUrl(src, map.files[src].v))) freed += map.files[src].bytes;
      for (const a of s.assets) if (!keepAssets.has(a) && await assets.delete(a)) freed += map.assets[a].bytes;
    }
    await writeDownloaded(have);
    return { ok: true, freed };
  }

  const downloaded = readDownloaded;

  // ---- service worker registration and the update offer
  function register(opts = {}) {
    if (!nav.serviceWorker) return Promise.resolve(null);
    const url = opts.url || 'sw.js';
    return nav.serviceWorker.register(url, { scope: opts.scope || './' }).then(reg => {
      const offer = worker => showUpdateBanner(() => { worker.postMessage({ type: 'SKIP_WAITING' }); });
      if (reg.waiting && nav.serviceWorker.controller) offer(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const w = reg.installing;
        if (!w) return;
        w.addEventListener('statechange', () => { if (w.state === 'installed' && nav.serviceWorker.controller) offer(w); });
      });
      let reloaded = false;
      nav.serviceWorker.addEventListener('controllerchange', () => { if (reloaded || !opts.reloadOnUpdate) return; reloaded = true; win.location.reload(); });
      return reg;
    }).catch(e => { if (win.console) win.console.warn('service worker not registered:', e && e.message); return null; });
  }

  function showUpdateBanner(onAccept) {
    if (!doc || doc.getElementById('sbOffUpdate')) return;
    const b = doc.createElement('div');
    b.id = 'sbOffUpdate'; b.className = 'sb-off-banner'; b.setAttribute('role', 'status');
    b.innerHTML = '<span>A new version of the app is ready.</span> <button type="button" data-act="update">Update now</button> <button type="button" data-act="later" aria-label="Later">Later</button>';
    b.querySelector('[data-act="update"]').addEventListener('click', () => { b.remove(); onAccept(); setTimeout(() => win.location.reload(), 600); });
    b.querySelector('[data-act="later"]').addEventListener('click', () => b.remove());
    doc.body.appendChild(b);
  }

  // ---- header button, offline badge, dialog
  let panel = null;
  function badge() {
    if (!doc) return;
    let el = doc.getElementById('sbOffBadge');
    if (!el) { el = doc.createElement('div'); el.id = 'sbOffBadge'; el.className = 'sb-off-badge'; el.setAttribute('role', 'status'); el.hidden = true; doc.body.appendChild(el); }
    el.textContent = 'Offline: downloaded subjects still work';
    el.hidden = nav.onLine !== false;
  }

  function addButton() {
    if (!doc || !active() || doc.getElementById('sbOffBtn')) return;
    const host = doc.querySelector('.header-right-group');
    if (!host) return;
    const btn = doc.createElement('button');
    btn.id = 'sbOffBtn'; btn.type = 'button'; btn.className = 'sb-off-btn';
    btn.title = 'Offline books'; btn.setAttribute('aria-label', 'Offline books');
    btn.innerHTML = '<span aria-hidden="true">⬇</span>';
    btn.addEventListener('click', () => openPanel());
    host.insertBefore(btn, host.querySelector('.header-user-avatar') || null);
  }

  async function openPanel() {
    if (!doc || panel) return;
    const overlay = doc.createElement('div');
    overlay.className = 'sb-off-overlay'; overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-modal', 'true'); overlay.setAttribute('aria-labelledby', 'sbOffTitle');
    overlay.innerHTML = '<div class="sb-off-box"><div class="sb-off-head"><h2 id="sbOffTitle">Offline books</h2><button type="button" class="sb-off-close" aria-label="Close">✕</button></div>' +
      '<p class="sb-off-note">Download a subject while you are online. It then opens with no connection. Your progress is kept on this device and sent when you are back online.</p>' +
      '<div class="sb-off-meter" aria-live="polite"></div><div class="sb-off-list">Loading…</div>' +
      '<div class="sb-off-actions"><button type="button" data-act="download" disabled>Download</button><button type="button" data-act="remove" disabled>Remove from this device</button></div>' +
      '<div class="sb-off-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" hidden><div class="sb-off-bar"></div></div><p class="sb-off-msg" role="status"></p></div>';
    doc.body.appendChild(overlay);
    panel = overlay;
    const q = s => overlay.querySelector(s);
    let release = null;                              // SBA11y.trap: Tab stays in the panel, Escape closes it, the focus goes back to the button that opened it
    const close = () => { if (ctl) ctl.abort(); overlay.remove(); panel = null; doc.removeEventListener('keydown', onKey); if (release) { release(); release = null; } };
    const onKey = e => { if (e.key === 'Escape') close(); };
    if (win.SBA11y) release = win.SBA11y.trap(overlay, { onClose: close }); else doc.addEventListener('keydown', onKey);
    q('.sb-off-close').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    let ctl = null, map;
    const msg = (t, bad) => { const m = q('.sb-off-msg'); m.textContent = t; m.className = 'sb-off-msg' + (bad ? ' sb-off-bad' : ''); };

    try { map = await loadMap(); } catch (e) { q('.sb-off-list').textContent = 'The list of books could not be loaded. Connect to the internet once and try again.'; return; }
    const have = await readDownloaded();
    const classNames = {};
    try { (win.DATA && win.DATA.classes || []).forEach(c => { classNames[c.id] = c.name; }); } catch (e) { /* names only */ }
    const byClass = {};
    Object.keys(map.subjects).forEach(id => { (byClass[map.subjects[id].classId] = byClass[map.subjects[id].classId] || []).push(id); });
    const order = Object.keys(byClass).sort((a, b) => (parseInt(a.replace(/\D/g, '') || 0, 10) || 0) - (parseInt(b.replace(/\D/g, '') || 0, 10) || 0));
    q('.sb-off-list').innerHTML = order.map(cid => {
      const rows = byClass[cid].map(id => {
        const s = map.subjects[id], isHave = !!have[id], none = !s.files.length && !s.assets.length;
        return '<label class="sb-off-row"><input type="checkbox" data-id="' + esc(id) + '"' + (none ? ' disabled' : '') + '> <span class="sb-off-name">' + esc(s.name) + '</span> <small>' +
          (none ? 'always available' : mb(s.bytes) + (isHave ? ' · on this device' : '')) + '</small></label>';
      }).join('');
      const n = byClass[cid].filter(id => have[id]).length;
      return '<details' + (cid === 'meanings' ? ' open' : '') + '><summary>' + esc(classNames[cid] || (cid === 'meanings' ? 'Meanings for hover and sentence click' : cid)) + (n ? ' <small>(' + n + ' on this device)</small>' : '') + '</summary>' + rows + '</details>';
    }).join('');

    const selected = () => [...overlay.querySelectorAll('input[data-id]:checked')].map(i => i.getAttribute('data-id'));
    const refreshMeter = async () => {
      const u = await usage();
      q('.sb-off-meter').textContent = u.usage != null ? 'Stored by this app: ' + mb(u.usage) + (u.quota ? ' of about ' + mb(u.quota) + ' allowed' : '') + (u.persisted ? ' · protected from automatic clean-up' : '') : '';
    };
    const refreshButtons = async () => {
      const ids = selected();
      const dl = q('[data-act="download"]'), rm = q('[data-act="remove"]');
      rm.disabled = !ids.some(id => have[id]);
      if (!ids.length) { dl.disabled = true; dl.textContent = 'Download'; return; }
      const e = await estimate(ids);
      dl.disabled = e.bytes === 0 && ids.every(id => have[id]);
      dl.textContent = e.bytes ? 'Download (' + mb(e.bytes) + ')' : 'Already on this device';
    };
    overlay.addEventListener('change', refreshButtons);
    await refreshMeter();

    q('[data-act="download"]').addEventListener('click', async () => {
      const ids = selected();
      if (!ids.length) return;
      const bar = q('.sb-off-progress'), fill = q('.sb-off-bar');
      bar.hidden = false; ctl = typeof win.AbortController === 'function' ? new win.AbortController() : null;
      overlay.classList.add('sb-off-busy'); msg('Downloading…');
      try {
        const r = await download(ids, { signal: ctl && ctl.signal, onProgress: p => { const pc = p.totalBytes ? Math.round(100 * p.doneBytes / p.totalBytes) : 100; fill.style.width = pc + '%'; bar.setAttribute('aria-valuenow', String(pc)); msg('Downloading… ' + pc + '% (' + p.doneFiles + ' of ' + p.totalFiles + ' files)'); } });
        msg('Done: ' + ids.length + ' subject' + (ids.length > 1 ? 's' : '') + ' ready offline (' + mb(r.bytes) + ' downloaded).');
        Object.assign(have, await readDownloaded());
      } catch (e) {
        msg(e.code === 'quota' ? 'Not enough space on this device. Remove something and try again. (' + e.message + ')' :
          e.code === 'aborted' ? 'Stopped.' :
          e.code === 'integrity' ? 'A file did not match the published version and was not saved. Try again later.' :
          'The download stopped (no connection?). What was fetched is kept; press Download again to continue.', true);
      } finally { overlay.classList.remove('sb-off-busy'); bar.hidden = true; fill.style.width = '0'; await refreshMeter(); await refreshButtons(); }
    });
    q('[data-act="remove"]').addEventListener('click', async () => {
      const ids = selected().filter(id => have[id]);
      if (!ids.length) return;
      const r = await remove(ids);
      ids.forEach(id => { delete have[id]; });
      msg('Removed. ' + mb(r.freed) + ' freed.');
      await refreshMeter(); await refreshButtons();
    });
  }

  function init() {
    if (!doc) return;
    addButton();
    badge();
    if (win.addEventListener) { win.addEventListener('online', badge); win.addEventListener('offline', badge); }
    // lazy.js could not fetch a book (offline and not downloaded): say why instead of leaving a blank screen
    if (win.addEventListener) win.addEventListener('sb:lazy-error', () => {
      const m = doc.getElementById('sbOffBadge'); if (!m) return;
      m.textContent = 'This subject is not on the device. Open the ⬇ button while online to download it.'; m.hidden = false;
      setTimeout(badge, 8000);
    });
  }

  return { register, loadMap, estimate, download, remove, downloaded, usage, openPanel, init, supported, active, _fileUrl: fileUrl };
});

// browser start-up: the button and the badge always (when the feature is active), the service worker only on a secure origin
(function () {
  if (typeof window === 'undefined' || !window.SBOffline) return;
  const O = window.SBOffline;
  const secure = location.protocol === 'https:' || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  O.init();
  if (secure && O.active()) O.register({ reloadOnUpdate: true });
})();
