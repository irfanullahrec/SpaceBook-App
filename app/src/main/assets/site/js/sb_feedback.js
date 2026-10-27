/* ======================================================================
 *  sb_feedback.js — suggestions, bug reports, textbook mistakes and wrong answers / meanings, from anywhere in the website and the app
 *
 *  What a student sees: a 💬 button in the header, a link in the menu and the footer, and "Wrong answer? Tell us" under every answer. They open one
 *  dialog: what is it about (a suggestion, something broken, a mistake in a textbook page, a wrong meaning or translation, a wrong answer), the words,
 *  an optional picture, and where they were (class, subject, book, chapter, page, screen, version) which they can switch off. Before anything is sent
 *  a review page shows EXACTLY what will leave the device. Nothing is sent without the Send button.
 *
 *  Reports are kept on the device first (IndexedDB, with the picture) and sent when there is a connection: waiting -> sending -> received (and later
 *  seen / fixed / not changed, a word the server gives back for the report's own id; never text). The same report is never sent twice: its id (a UUID
 *  made here) is the server's key. A failed report stays in "My reports" with Try again / Delete; nothing is thrown away silently.
 *
 *  Sent to api/feedback.php (api/lib/feedback.php has the rules). Not sent: name, number, e-mail, user agent, address, other pages, other apps.
 *  Signed-in students are NOT linked by default: ticking "Link it to my account" sends the session cookie too.
 *  Inside the Android app the same dialog opens in the page (SBFeedback.open); the picture comes from the phone's picker.
 * ====================================================================== */
(function () {
  'use strict';
  const doc = document;
  const API = 'api/feedback.php';
  const MAX_MSG = 2000, MIN_MSG = 5, MAX_BYTES = 1500000, MAX_SIDE = 1600;
  const KINDS = [
    { id: 'suggestion', ico: '💡', en: 'A suggestion', ur: 'تجویز', hint: 'An idea to make SpaceBook better' },
    { id: 'bug', ico: '🐞', en: 'Something is broken', ur: 'کوئی چیز کام نہیں کر رہی', hint: 'A button, a page or a game that does not work' },
    { id: 'content', ico: '📚', en: 'A mistake in a textbook page', ur: 'کتاب کے صفحے میں غلطی', hint: 'A word, a question, a table or a picture that is not like the printed book' },
    { id: 'translation', ico: '🔤', en: 'A wrong meaning or translation', ur: 'غلط مطلب یا ترجمہ', hint: 'A word meaning or a sentence translation that is wrong' },
    { id: 'answer', ico: '✅', en: 'A wrong answer', ur: 'غلط جواب', hint: 'An answer or a worked solution that is wrong or not clear' },
  ];
  const kindOf = id => KINDS.find(k => k.id === id) || KINDS[0];
  const STATUS = {
    waiting: ['⏳', 'Waiting to be sent'], sending: ['📤', 'Sending…'], received: ['✅', 'Received. Thank you'], seen: ['👀', 'Seen by the team'],
    fixed: ['🛠️', 'Fixed'], wontfix: ['💬', 'Looked at, not changed'], duplicate: ['🔁', 'Already reported by someone else'], failed: ['⚠️', 'Could not be sent'],
  };
  const TERMINAL = ['fixed', 'wontfix', 'duplicate'];
  const $ = (q, r) => (r || doc).querySelector(q);
  const $$ = (q, r) => Array.prototype.slice.call((r || doc).querySelectorAll(q));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const inApp = () => doc.documentElement.classList.contains('sbapp');
  const uuid = () => (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });
  const kb = n => n < 1024 ? n + ' bytes' : n < 1048576 ? Math.round(n / 1024) + ' KB' : (n / 1048576).toFixed(1) + ' MB';
  const when = ms => { try { return new Date(ms).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } };
  const store = (fn, d) => { try { return fn(); } catch (e) { return d; } };

  // ── the reports on this device ───────────────────────────────────────────────────────────────
  // IndexedDB (a picture is a Blob); where it is not available (a private window) the reports live in memory until the page closes and the list says so.
  const mem = new Map();
  let dbP = null, memOnly = false;
  function openDb() {
    return new Promise((res, rej) => {
      if (!window.indexedDB) return rej(new Error('no indexedDB'));
      const r = indexedDB.open('sb_feedback', 1);
      r.onupgradeneeded = () => { r.result.createObjectStore('reports', { keyPath: 'id' }); };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error || new Error('open failed'));
      r.onblocked = () => rej(new Error('blocked'));
    });
  }
  const db = () => dbP || (dbP = openDb().catch(() => { memOnly = true; return null; }));
  const tx = (d, mode, fn) => new Promise((res, rej) => { const t = d.transaction('reports', mode); const r = fn(t.objectStore('reports')); t.oncomplete = () => res(r && r.result); t.onerror = () => rej(t.error); t.onabort = () => rej(t.error); });
  async function all() { const d = await db(); if (!d) return Array.from(mem.values()); try { return (await tx(d, 'readonly', s => s.getAll())) || []; } catch (e) { return Array.from(mem.values()); } }
  async function put(rec) { const d = await db(); mem.set(rec.id, rec); if (!d) return; try { await tx(d, 'readwrite', s => s.put(rec)); } catch (e) { memOnly = true; } }
  async function del(id) { mem.delete(id); const d = await db(); if (!d) return; try { await tx(d, 'readwrite', s => s.delete(id)); } catch (e) { /* kept in memory only */ } }

  // ── where the student is ─────────────────────────────────────────────────────────────────────
  const buildId = () => store(() => { const s = $$('script[src*="js/app.js"]')[0]; const m = s && /[?&]v=([0-9a-z_]+)/i.exec(s.getAttribute('src')); return m ? m[1] : ''; }, '');
  const appVersion = () => store(() => { const m = /SpaceBookApp\/([0-9A-Za-z.\-]+)/.exec(navigator.userAgent || ''); return m ? m[1] : ''; }, '');
  function pageLabel(units, p) {
    const el = units && units[p];
    if (!el) return '';
    const a = el.getAttribute && el.getAttribute('aria-label'), m = a && /(?:Textbook page|page)\s+(.+)/i.exec(a);
    if (m) return m[1].trim().slice(0, 20);
    if (el.dataset && (el.dataset.printed || el.dataset.page)) return String(el.dataset.printed || el.dataset.page).slice(0, 20);
    return '#' + (p + 1);
  }
  function bookInfo(subjectId) {
    const m = /^cls(\d+)-(.+)$/.exec(subjectId || '');
    if (!m) return {};
    const map = { phy: 'phys', pak: 'pakstudy', ishist: 'islhist', ikhtiari: 'islopt', mq: 'quran', cs: 'comp' };
    const keys = [m[2], map[m[2]]].filter(Boolean);
    for (const k of keys) {
      const b = store(() => { const L = window['CLS' + m[1] + '_BOOKS']; return L && L[k] && L[k].book; }, null);
      if (b && b.title) return { book: String(b.title).slice(0, 80), edition: String(b.edition || b.source || '').slice(0, 60) };
    }
    return {};
  }
  async function where() {
    const ctx = { platform: inApp() ? 'app' : 'web', online: navigator.onLine !== false };
    const v = buildId(), a = appVersion();
    if (v) ctx.version = v;
    if (a) ctx.app = a;
    ctx.lang = String(navigator.language || '').slice(0, 8);
    const st = store(() => state, null);
    if (st && (st.activeView || st.page)) ctx.screen = '#' + (st.activeView || st.page);
    const L = window.SBLibrary;
    let here = null;
    try { here = L && L.here ? await L.here() : null; } catch (e) { here = null; }
    if (here) {
      ctx.cls = String(here.c || '').replace(/^cls/, '');
      ctx.subject = here.s; ctx.subjectName = here.subjName;
      ctx.chapter = String(here.ch + 1); ctx.chapterTitle = here.t; ctx.tab = here.tb;
      const units = store(() => L.collect().units, []);
      const pg = pageLabel(units, here.p);
      if (pg) ctx.page = pg;
      Object.assign(ctx, bookInfo(here.s));
    }
    return ctx;
  }
  function whereText(c) {
    const parts = [];
    if (c.cls) parts.push('Class ' + c.cls);
    if (c.subjectName || c.subject) parts.push(c.subjectName || c.subject);
    if (c.book) parts.push(c.book);
    if (c.chapter) parts.push('chapter ' + c.chapter + (c.chapterTitle ? ' (' + c.chapterTitle + ')' : ''));
    if (c.tab) parts.push(c.tab);
    if (c.page) parts.push('page ' + c.page);
    if (!parts.length && c.screen) parts.push('screen ' + c.screen);
    return parts.join(' · ');
  }

  // ── a picture: only a picture, small ─────────────────────────────────────────────────────────
  // The browser decodes it and draws it again as a JPEG of at most 1600 pixels: location data and anything hidden in the file do not survive.
  async function shrink(file) {
    if (!/^image\/(jpeg|png|webp)$/i.test(file.type || '')) throw new Error('Only JPEG, PNG or WebP pictures can be sent.');
    let bmp;
    try {
      if (window.createImageBitmap) bmp = await createImageBitmap(file);
      else bmp = await new Promise((res, rej) => { const u = URL.createObjectURL(file), i = new Image(); i.onload = () => { URL.revokeObjectURL(u); res(i); }; i.onerror = () => { URL.revokeObjectURL(u); rej(new Error('x')); }; i.src = u; });
    } catch (e) { throw new Error('This picture could not be opened. Try another one.'); }
    const w = bmp.width || bmp.naturalWidth, h = bmp.height || bmp.naturalHeight;
    if (!w || !h) throw new Error('This picture could not be opened. Try another one.');
    const scale = Math.min(1, MAX_SIDE / Math.max(w, h));
    const c = doc.createElement('canvas');
    c.width = Math.max(1, Math.round(w * scale)); c.height = Math.max(1, Math.round(h * scale));
    const g = c.getContext('2d');
    g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height);
    g.drawImage(bmp, 0, 0, c.width, c.height);
    if (bmp.close) bmp.close();
    for (const q of [0.85, 0.7, 0.55, 0.4, 0.3]) {
      const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', q));
      if (blob && blob.size <= MAX_BYTES) return blob;
    }
    throw new Error('This picture is too big. Try a smaller one.');
  }

  // ── sending ──────────────────────────────────────────────────────────────────────────────────
  const BACKOFF = [60e3, 5 * 60e3, 15 * 60e3, 3600e3, 6 * 3600e3];
  let flushing = false, timer = null;
  const stateOf = r => r.state === 'sent' ? (r.status || 'received') : (r.state === 'failed' ? 'failed' : (r.state === 'sending' ? 'sending' : 'waiting'));
  async function post(rec) {
    const fd = new FormData();
    fd.append('client_id', rec.id); fd.append('kind', rec.kind); fd.append('message', rec.message);
    fd.append('context', JSON.stringify(rec.context || {})); fd.append('platform', (rec.context && rec.context.platform) || 'web');
    if (rec.image) fd.append('image', rec.image, 'picture.jpg');
    const res = await fetch(API + '?action=submit', { method: 'POST', body: fd, credentials: rec.link ? 'same-origin' : 'omit' });
    let j = null; try { j = await res.json(); } catch (e) { j = null; }
    return { code: res.status, json: j, retry: +res.headers.get('Retry-After') || 0 };
  }
  const inflight = new Set();       // a report being sent right now is not sent a second time by a flush that starts meanwhile
  async function sendOne(rec) {
    if (inflight.has(rec.id)) return rec;
    inflight.add(rec.id);
    try { return await sendOneNow(rec); } finally { inflight.delete(rec.id); }
  }
  async function sendOneNow(rec) {
    rec.state = 'sending'; rec.attempts = (rec.attempts || 0) + 1; await put(rec); changed();
    let r;
    try { r = await post(rec); } catch (e) { r = { code: 0, json: null, retry: 0 }; }
    if (r.code === 200 || r.code === 201) { rec.state = 'sent'; rec.serverId = r.json && r.json.id; rec.sentAt = Date.now(); rec.status = 'received'; rec.error = ''; delete rec.image; }
    else if (r.code === 400 || r.code === 413) { rec.state = 'failed'; rec.permanent = true; rec.error = (r.json && r.json.error) || 'The server did not accept this report.'; }
    else {
      rec.error = r.code === 429 ? ((r.json && r.json.error) || 'Too many reports. Trying again later.') : r.code === 404 ? 'The server cannot take reports yet (the website has not been updated). It will be sent after the update.' : (r.code ? 'The server is busy. Trying again later.' : 'No connection. It will be sent when you are online.');
      if (rec.attempts >= 20) { rec.state = 'failed'; rec.error = 'Could not be sent after many tries.'; }
      else { rec.state = 'pending'; rec.nextAt = Date.now() + Math.max(r.retry * 1000, BACKOFF[Math.min(rec.attempts - 1, BACKOFF.length - 1)]); }
    }
    await put(rec); changed();
    return rec;
  }
  async function flush(force) {
    if (flushing) return;
    flushing = true;
    try {
      const list = (await all()).filter(r => r.state === 'pending' || r.state === 'sending' || (force && r.state === 'failed' && !r.permanent)).sort((a, b) => a.createdAt - b.createdAt);
      for (const r of list) {
        if (navigator.onLine === false) break;
        if (!force && r.state === 'pending' && r.nextAt && r.nextAt > Date.now()) continue;
        if (inflight.has(r.id)) continue;
        if (r.state === 'failed') { r.state = 'pending'; r.attempts = 0; }
        await sendOne(r);
      }
      await refreshStatus();
    } finally { flushing = false; schedule(); }
  }
  async function refreshStatus() {
    if (navigator.onLine === false) return;
    const open = (await all()).filter(r => r.state === 'sent' && !TERMINAL.includes(r.status) && Date.now() - (r.sentAt || 0) < 60 * 864e5 && Date.now() - (r.checkedAt || 0) > 60e3);
    if (!open.length) return;
    try {
      const res = await fetch(API + '?action=status&ids=' + open.slice(0, 30).map(r => r.id).join(','), { credentials: 'omit' });
      const j = await res.json();
      if (!j || !j.ok) return;
      for (const r of open) { r.checkedAt = Date.now(); if (j.status[r.id] && j.status[r.id] !== r.status) r.status = j.status[r.id]; await put(r); }
      changed();
    } catch (e) { /* later */ }
  }
  async function schedule() {
    clearTimeout(timer);
    const list = (await all()).filter(r => r.state === 'pending');
    if (!list.length) return;
    const next = Math.min.apply(null, list.map(r => r.nextAt || 0));
    timer = setTimeout(() => flush(false), Math.max(5000, Math.min(next - Date.now(), 30 * 60e3)));
  }
  const listeners = [];
  function changed() { badge(); listeners.slice().forEach(f => { try { f(); } catch (e) { /* a screen that is gone */ } }); }
  async function badge() {
    const n = (await all()).filter(r => r.state === 'pending' || r.state === 'sending' || r.state === 'failed').length;
    $$('[data-sbfb-badge]').forEach(b => { b.textContent = n ? String(n) : ''; b.hidden = !n; });
    $$('#sbFeedbackBtn').forEach(b => b.setAttribute('aria-label', 'Suggest or report a problem' + (n ? ' (' + n + ' not sent yet)' : '')));
  }

  // ── the dialog ───────────────────────────────────────────────────────────────────────────────
  let overlay = null, dlg = null, step = 'form', draft = null, opener = null, previewUrl = null;
  const fresh = (o) => ({ kind: (o && o.kind) || '', message: (o && o.message) || '', useCtx: true, ctx: null, ctxOverride: (o && o.context) || null, image: null, imageName: '', link: false, error: '', busy: false });
  function ensure() {
    if (overlay) return;
    overlay = doc.createElement('div');
    overlay.className = 'sbfb-overlay'; overlay.hidden = true;
    overlay.innerHTML = '<div class="sbfb-dialog" role="dialog" aria-modal="true" aria-labelledby="sbfb-title" tabindex="-1"></div>';
    doc.body.appendChild(overlay);
    dlg = overlay.firstChild;
    overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });
    dlg.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.stopPropagation(); close(); return; }
      if (e.key !== 'Tab') return;
      const f = $$('button:not([disabled]),input:not([disabled]),textarea,a[href],[tabindex="0"]', dlg).filter(x => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    dlg.addEventListener('click', onClick);
    dlg.addEventListener('input', onInput);
    dlg.addEventListener('change', onChange);
  }
  async function open(o) {
    o = o || {};
    ensure();
    opener = doc.activeElement;
    draft = fresh(o);
    if (o.list) step = 'list'; else step = 'form';
    overlay.hidden = false;
    doc.documentElement.classList.add('sbfb-lock');
    draft.ctx = draft.ctxOverride ? Object.assign(await where(), draft.ctxOverride) : await where();
    const saved = !draft.message && !o.message ? store(() => localStorage.getItem('sbfb_draft'), null) : null;
    if (saved) { try { const d = JSON.parse(saved); if (d && d.message) { draft.message = String(d.message).slice(0, MAX_MSG); draft.kind = draft.kind || d.kind || ''; } } catch (e) { /* no draft */ } }
    render();
  }
  function close() {
    if (!overlay || overlay.hidden) return;
    if (step === 'form' && draft && draft.message.trim()) store(() => localStorage.setItem('sbfb_draft', JSON.stringify({ kind: draft.kind, message: draft.message })));
    overlay.hidden = true;
    doc.documentElement.classList.remove('sbfb-lock');
    if (previewUrl) { URL.revokeObjectURL(previewUrl); previewUrl = null; }
    const o = opener; opener = null;
    if (o && o.focus && doc.contains(o)) o.focus();
  }
  const focusFirst = sel => { const e = $(sel, dlg); if (e) e.focus(); };
  function head(title, ur) {
    return `<div class="sbfb-head"><h2 id="sbfb-title">${esc(title)} <span class="sbfb-ur" lang="ur" dir="rtl">${esc(ur)}</span></h2><button type="button" class="sbfb-x" data-act="close" aria-label="Close">✕</button></div>`;
  }
  async function render() {
    const mine = await all();
    const waiting = mine.filter(r => r.state === 'pending' || r.state === 'sending' || r.state === 'failed').length;
    if (step === 'form') {
      const d = draft;
      dlg.innerHTML = head('Suggest or report a problem', 'تجویز یا مسئلہ بھیجیں') +
        `<p class="sbfb-intro">Tell us what is wrong or what would help. You do not need to sign in.</p>
        <fieldset class="sbfb-kinds"><legend>What is it about?</legend>${KINDS.map(k => `<label class="sbfb-kind"><input type="radio" name="sbfb-kind" value="${k.id}"${d.kind === k.id ? ' checked' : ''}><span class="sbfb-ico" aria-hidden="true">${k.ico}</span><span class="sbfb-kt">${esc(k.en)}<small lang="ur" dir="rtl">${esc(k.ur)}</small></span></label>`).join('')}</fieldset>
        <label class="sbfb-lab" for="sbfb-msg">What happened, or what is your idea? <small>(<span id="sbfb-count">${d.message.length}</span>/${MAX_MSG})</small></label>
        <textarea id="sbfb-msg" dir="auto" maxlength="${MAX_MSG}" rows="5" aria-describedby="sbfb-privacy sbfb-err" placeholder="${esc(d.kind ? kindOf(d.kind).hint : 'Write a few words')}">${esc(d.message)}</textarea>
        <p id="sbfb-privacy" class="sbfb-hint">Please do not write your phone number, password or other private details.</p>
        ${whereText(d.ctx) ? `<label class="sbfb-check"><input type="checkbox" id="sbfb-ctx"${d.useCtx ? ' checked' : ''}> Include where I am: <b>${esc(whereText(d.ctx))}</b></label>` : ''}
        <div class="sbfb-pic">${d.image ? `<img src="${previewUrl || ''}" alt="The picture that will be sent"><span>${esc(d.imageName)} · ${kb(d.image.size)}</span><button type="button" data-act="nopic">Remove picture</button>`
          : `<label class="sbfb-filebtn"><input type="file" id="sbfb-file" accept="image/jpeg,image/png,image/webp">📎 Add a picture <small>(optional: a photo or a screenshot)</small></label>`}</div>
        <p id="sbfb-err" class="sbfb-err" role="alert">${esc(d.error)}</p>
        <div class="sbfb-actions"><button type="button" class="sbfb-primary" data-act="review">Review what will be sent</button><button type="button" data-act="list">My reports${waiting ? ` <span class="sbfb-badge">${waiting}</span>` : ''}</button></div>`;
      focusFirst(d.kind ? '#sbfb-msg' : '.sbfb-kind input');
    } else if (step === 'review') {
      const d = draft, k = kindOf(d.kind);
      const c = d.useCtx ? d.ctx : { platform: d.ctx.platform, version: d.ctx.version, app: d.ctx.app, lang: d.ctx.lang, online: d.ctx.online };
      dlg.innerHTML = head('Check what will be sent', 'بھیجنے سے پہلے دیکھ لیں') +
        `<p class="sbfb-intro">This is exactly what leaves your device. Nothing else is sent: not your name, phone number, e-mail, password or any other page.</p>
        <dl class="sbfb-review"><dt>About</dt><dd>${k.ico} ${esc(k.en)}</dd><dt>Your words</dt><dd class="sbfb-msgbox" dir="auto">${esc(d.message).replace(/\n/g, '<br>')}</dd>
        <dt>Where you were</dt><dd>${d.useCtx && whereText(c) ? esc(whereText(c)) : '<i>not included</i>'}</dd>
        <dt>Technical details</dt><dd><ul class="sbfb-tech">${Object.keys(c).map(k => `<li><code>${esc(k)}</code> ${esc(typeof c[k] === 'boolean' ? (c[k] ? 'yes' : 'no') : c[k])}</li>`).join('')}</ul></dd>
        <dt>Picture</dt><dd>${d.image ? `<img src="${previewUrl || ''}" alt="The picture that will be sent" class="sbfb-thumb"> ${kb(d.image.size)}` : '<i>none</i>'}</dd></dl>
        <label class="sbfb-check"><input type="checkbox" id="sbfb-link"${d.link ? ' checked' : ''}> Link this report to my account (only if I am signed in). Left off, it is sent without my name.</label>
        <p id="sbfb-err" class="sbfb-err" role="alert">${esc(d.error)}</p>
        <div class="sbfb-actions"><button type="button" data-act="back">Back</button><button type="button" class="sbfb-primary" data-act="send"${d.busy ? ' disabled' : ''}>${navigator.onLine === false ? 'Save to send later' : 'Send'}</button></div>`;
      focusFirst('[data-act="send"]');
    } else if (step === 'done') {
      const r = draft.sent, st = r ? stateOf(r) : 'waiting';
      dlg.innerHTML = head('Thank you', 'شکریہ') +
        `<p class="sbfb-done" role="status">${st === 'received' ? '✅ Your report was received. ' + (r.serverId ? 'Its number is <b>#' + esc(r.serverId) + '</b>.' : '') : '⏳ Your report is saved on this device. It will be sent when there is a connection; you can see where it is under “My reports”.'}</p>
        <div class="sbfb-actions"><button type="button" class="sbfb-primary" data-act="close">Close</button><button type="button" data-act="again">Write another</button><button type="button" data-act="list">My reports</button></div>`;
      focusFirst('.sbfb-primary');
    } else {
      const rows = mine.sort((a, b) => b.createdAt - a.createdAt);
      dlg.innerHTML = head('My reports', 'میری رپورٹیں') +
        (memOnly ? '<p class="sbfb-hint">This browser does not keep data between visits (a private window?): these reports are lost when the page closes.</p>' : '') +
        (rows.length ? `<ul class="sbfb-list">${rows.map(r => { const s = STATUS[stateOf(r)] || STATUS.waiting, k = kindOf(r.kind); return `<li data-id="${esc(r.id)}"><span class="sbfb-ico" aria-hidden="true">${k.ico}</span><div><b>${esc(k.en)}</b> <small>${esc(when(r.createdAt))}</small><div class="sbfb-snip">${esc(r.message.slice(0, 140))}${r.message.length > 140 ? '…' : ''}</div><div class="sbfb-state sbfb-s-${stateOf(r)}">${s[0]} ${esc(s[1])}${r.state !== 'sent' && r.error ? ' — ' + esc(r.error) : ''}</div></div>
          <div class="sbfb-rowact">${r.state === 'failed' && !r.permanent || r.state === 'pending' ? '<button type="button" data-act="retry">Send now</button>' : ''}${r.state !== 'sent' ? '<button type="button" data-act="delete">Delete</button>' : ''}</div></li>`; }).join('')}</ul>`
          : '<p class="sbfb-hint">You have not sent a report from this device yet.</p>') +
        `<div class="sbfb-actions"><button type="button" class="sbfb-primary" data-act="new">New report</button><button type="button" data-act="close">Close</button></div>`;
      focusFirst('.sbfb-primary');
    }
  }
  function onInput(e) {
    if (e.target.id === 'sbfb-msg') { draft.message = e.target.value; const c = $('#sbfb-count', dlg); if (c) c.textContent = String(draft.message.length); }
  }
  async function onChange(e) {
    const t = e.target;
    if (t.name === 'sbfb-kind') { draft.kind = t.value; const m = $('#sbfb-msg', dlg); if (m) m.placeholder = kindOf(draft.kind).hint; }
    else if (t.id === 'sbfb-ctx') draft.useCtx = t.checked;
    else if (t.id === 'sbfb-link') draft.link = t.checked;
    else if (t.id === 'sbfb-file' && t.files && t.files[0]) {
      const f = t.files[0];
      try {
        const blob = await shrink(f);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        previewUrl = URL.createObjectURL(blob);
        draft.image = blob; draft.imageName = (f.name || 'picture').slice(0, 40); draft.error = '';
      } catch (err) { draft.error = err.message || 'This picture cannot be used.'; draft.image = null; }
      render();
    }
  }
  const fail = (msg, focus) => { draft.error = msg; const e = $('#sbfb-err', dlg); if (e) e.textContent = msg; if (focus) focusFirst(focus); };
  async function onClick(e) {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    if (act === 'close') return close();
    if (act === 'nopic') { draft.image = null; draft.imageName = ''; if (previewUrl) { URL.revokeObjectURL(previewUrl); previewUrl = null; } return render(); }
    if (act === 'review') {
      const m = ($('#sbfb-msg', dlg) || {}).value || draft.message;
      draft.message = m.trim();
      if (!draft.kind) return fail('Choose what it is about.', '.sbfb-kind input');
      if (draft.message.length < MIN_MSG) return fail('Please write a few words about it.', '#sbfb-msg');
      draft.error = ''; step = 'review'; return render();
    }
    if (act === 'back') { step = 'form'; return render(); }
    if (act === 'list') { step = 'list'; await refreshStatus(); return render(); }
    if (act === 'new' || act === 'again') { draft = fresh(); draft.ctx = await where(); step = 'form'; return render(); }
    if (act === 'send') {
      draft.busy = true; b.disabled = true;
      const rec = { id: uuid(), kind: draft.kind, message: draft.message.slice(0, MAX_MSG), context: draft.useCtx ? draft.ctx : { platform: draft.ctx.platform, version: draft.ctx.version, app: draft.ctx.app, lang: draft.ctx.lang, online: draft.ctx.online },
        image: draft.image || null, link: !!draft.link, state: 'pending', attempts: 0, createdAt: Date.now() };
      await put(rec);
      store(() => localStorage.removeItem('sbfb_draft'));
      draft.sent = rec; draft.busy = false; step = 'done';
      changed();
      if (navigator.onLine !== false) await sendOne(rec); else schedule();
      return render();
    }
    const li = b.closest('li[data-id]');
    if (li && act === 'delete') { await del(li.dataset.id); changed(); return render(); }
    if (li && act === 'retry') { const r = (await all()).find(x => x.id === li.dataset.id); if (r) { r.nextAt = 0; r.state = 'pending'; await put(r); await flush(true); } return render(); }
  }

  // ── entry points ─────────────────────────────────────────────────────────────────────────────
  // anything with data-sbfb opens the dialog; the value (optional) preselects the kind. "Wrong answer? Tell us" under an answer says which question it is.
  doc.addEventListener('click', e => {
    const t = e.target.closest && e.target.closest('[data-sbfb]');
    if (!t) return;
    e.preventDefault(); e.stopPropagation();
    const o = { kind: KINDS.some(k => k.id === t.dataset.sbfb) ? t.dataset.sbfb : '' };
    const panel = t.closest('.sb-solve');
    if (panel) {
      const q = panel.previousElementSibling && panel.previousElementSibling.textContent || (panel.parentElement && panel.parentElement.textContent) || '';
      const text = q.replace(/\s+/g, ' ').trim().slice(0, 160);
      o.kind = 'answer';
      o.message = text ? 'Question: ' + text + '\nWhat is wrong with the answer: ' : '';
      o.context = text ? { question: text.slice(0, 40) } : null;
    }
    open(o);
  }, true);
  doc.addEventListener('spacebook:feedback-open', e => open(e.detail || {}));
  window.addEventListener('online', () => flush(false));
  doc.addEventListener('visibilitychange', () => { if (doc.visibilityState === 'visible') flush(false); });
  setTimeout(() => { badge(); flush(false); }, 3000);

  window.SBFeedback = {
    open, close, flush: () => flush(true), pending: async () => (await all()).filter(r => r.state !== 'sent').length, list: all,
    onChange: f => { listeners.push(f); }, kinds: KINDS, whereText,
    _test: { post, shrink, where, put, del, stateOf, schedule, memOnly: () => memOnly },
  };
})();
