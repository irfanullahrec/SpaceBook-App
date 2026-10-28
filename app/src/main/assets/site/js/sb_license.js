/* The free-trial lock (docs/TRIAL_LOCK.md): one month from the first start on this browser, then only a lock screen that asks the person to
 * contact the developer on WhatsApp, or to type an unlock code. The Android app has the same rule in expiry/TrialGate.kt (and keeps this
 * script out of its web pages: SBHost exists there), and the same codes work on both.
 *
 *   - The first start is remembered in localStorage (start, latest time seen, a random device ID, the unlock code, wrong tries).
 *   - The clock cannot be moved back to reopen it: the latest time ever seen is kept and time never goes below it.
 *   - An unlock code is "SB1-<payload>.<signature>" made by tools/license/make_code.js with a PRIVATE key that is not in this repository;
 *     only the PUBLIC key is here, so reading this file does not let anyone make a code. A code is for one device ID (or every device) and
 *     may end on a date. Five wrong tries block the box for a minute, then longer.
 *   - The DEFAULT unlock code (CFG.defaultCode, only a salted PBKDF2 hash of it is here, made by tools/license/make_default.js) opens the lock for
 *     CFG.grantDays (30) days from the moment it is typed; then the lock comes back and the code is typed again. The repository is public, so the hash
 *     can be attacked offline: the code should be long and unusual. For a person you want to unlock for longer, or for one device only, make a signed code.
 *   - Honest limit: this runs in the visitor's own browser. Someone who clears the site's data gets a new month, and someone who edits the
 *     page can remove the lock. It stops ordinary use, not a determined person (docs/TRIAL_LOCK.md says what would stop that: the server).
 *
 * TRIAL_DAYS = 0 switches the lock off. Public API: window.SBLicense.status() -> {kind: 'open' | 'trial' | 'locked', licensed, daysLeft, deviceId}. */
(function (root) {
  'use strict';

  var CFG = {
    trialDays: 30,
    contactLocal: '0343 0155606',
    contactWa: '923430155606',
    // the PUBLIC half of the key pair (base64 SubjectPublicKeyInfo, ECDSA P-256); the private half is on the developer's PC only
    publicKey: 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEQgQ/xK5Uu72UXOOTb34IM+xuTu8pxHV/wL5qA4zyyQ2XVod2Wjud4VreHLy6p772W1seDCjtgFA2XpG6ySQkNg==',
    // the default unlock code: PBKDF2-HMAC-SHA256 of it (the code itself is not in the repository); typing it opens the lock for grantDays days
    grantDays: 30,
    defaultCode: { salt: 'FFmYR8H5Gtxhgr9GspRu5w==', iterations: 100000, hash: 'pcgFL/pbnUwRUBM8CqBAojgl4HDF7np0f4DFACPueGg=' },
    storeKey: 'sb.lic.v1',
    noticeDays: 7
  };
  var DAY = 86400000, FREE_TRIES = 5;
  var ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';           // no 0 O 1 I: a device ID is read aloud and typed
  var PAYLOAD_RX = /^SB1\|([A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}|\*)\|(0|\d{8})$/;

  // ---- pure helpers (also used by tests/license/unit.js in Node) ---------------------------------------------------------------------

  function b64ToBytes(s) {
    s = String(s).replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    if (typeof atob === 'function') { var bin = atob(s), out = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; }
    return new Uint8Array(Buffer.from(s, 'base64'));
  }

  var INVISIBLE = '[\\s\\u200b-\\u200f\\u202a-\\u202e\\ufeff]';   // spaces, line breaks and the invisible marks WhatsApp adds
  function normalizeCode(code) { return String(code || '').replace(new RegExp(INVISIBLE + '+', 'g'), ''); }
  function trimCode(code) { return String(code || '').replace(new RegExp('^' + INVISIBLE + '+|' + INVISIBLE + '+$', 'g'), ''); }

  /** "SB1-<payload>.<signature>" -> {bytes, sig, dev, until} or null (the signature is not checked here) */
  function parseCode(code) {
    var m = /^SB1-([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)$/.exec(normalizeCode(code));
    if (!m) return null;
    var bytes, sig, text = '';
    try { bytes = b64ToBytes(m[1]); sig = b64ToBytes(m[2]); } catch (e) { return null; }
    for (var i = 0; i < bytes.length; i++) text += String.fromCharCode(bytes[i]);
    var p = PAYLOAD_RX.exec(text);
    if (!p || sig.length !== 64) return null;
    return { bytes: bytes, sig: sig, dev: p[1], until: p[2] };
  }

  /** the last millisecond (UTC) of a YYYYMMDD date */
  function endOfDay(ymd) { return Date.UTC(+ymd.slice(0, 4), +ymd.slice(4, 6) - 1, +ymd.slice(6, 8), 23, 59, 59, 999); }

  function normalizeDevice(s) {
    var d = String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    return d.length === 8 ? d.slice(0, 4) + '-' + d.slice(4) : '';
  }

  function newDeviceId() {
    var b = new Uint8Array(8), c = root.crypto;
    if (c && c.getRandomValues) c.getRandomValues(b); else for (var i = 0; i < 8; i++) b[i] = Math.floor(Math.random() * 256);
    var s = '';
    for (var j = 0; j < 8; j++) s += ALPHABET.charAt(b[j] & 31);       // 32 symbols: no modulo bias
    return s.slice(0, 4) + '-' + s.slice(4);
  }

  function subtle() {
    if (root.crypto && root.crypto.subtle) return root.crypto.subtle;
    try { return require('crypto').webcrypto.subtle; } catch (e) { return null; }
  }

  /** Is this code made with the private key of publicKey, for this device, and not past its date? -> Promise<{ok, reason}> */
  function verifyCode(code, deviceId, now, publicKey) {
    var p = parseCode(code), s = subtle();
    if (!p) return Promise.resolve({ ok: false, reason: 'format' });
    if (!s) return Promise.resolve({ ok: false, reason: 'nocrypto' });
    return s.importKey('spki', b64ToBytes(publicKey || CFG.publicKey), { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify'])
      .then(function (key) { return s.verify({ name: 'ECDSA', hash: 'SHA-256' }, key, p.sig, p.bytes); })
      .then(function (ok) {
        if (!ok) return { ok: false, reason: 'signature' };
        if (p.dev !== '*' && p.dev !== deviceId) return { ok: false, reason: 'device' };
        if (p.until !== '0' && now > endOfDay(p.until)) return { ok: false, reason: 'expired' };
        return { ok: true, dev: p.dev, until: p.until };
      }, function () { return { ok: false, reason: 'error' }; });
  }

  /** Is this the default unlock code? PBKDF2-HMAC-SHA256 of the typed text against the stored salt and hash -> Promise<boolean> */
  function checkDefault(code, d) {
    var s = subtle();
    d = d || CFG.defaultCode;
    if (!s || !d || !d.hash || !code) return Promise.resolve(false);
    var bytes = typeof TextEncoder === 'function' ? new TextEncoder().encode(code) : new Uint8Array(Buffer.from(code, 'utf8'));
    return s.importKey('raw', bytes, 'PBKDF2', false, ['deriveBits'])
      .then(function (k) { return s.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: b64ToBytes(d.salt), iterations: d.iterations }, k, 256); })
      .then(function (bits) {
        var a = new Uint8Array(bits), b = b64ToBytes(d.hash), diff = a.length ^ b.length;
        for (var i = 0; i < a.length && i < b.length; i++) diff |= a[i] ^ b[i];
        return diff === 0;
      }, function () { return false; });
  }

  /** what the lock does at time `now`, given what is remembered (rec) and whether a valid code is stored; the default code moves the end (rec.extendUntil) */
  function decide(rec, now, licensed, trialDays) {
    if (!trialDays || licensed) return { kind: 'open', licensed: !!licensed };
    var ends = Math.max(rec.start + trialDays * DAY, rec.extendUntil || 0);
    if (now >= ends) return { kind: 'locked', endsAt: ends };
    return { kind: 'trial', endsAt: ends, daysLeft: Math.ceil((ends - now) / DAY) };
  }

  var api = {
    CFG: CFG, parseCode: parseCode, verifyCode: verifyCode, decide: decide, normalizeCode: normalizeCode, trimCode: trimCode, checkDefault: checkDefault, normalizeDevice: normalizeDevice,
    newDeviceId: newDeviceId, endOfDay: endOfDay, FREE_TRIES: FREE_TRIES, DAY: DAY
  };
  if (typeof module === 'object' && module && module.exports) module.exports = api;
  else root.SBLicense = api;

  // ---- the page part ------------------------------------------------------------------------------------------------------------------
  if (typeof document === 'undefined' || !document.documentElement) return;
  api.status = function () { return { kind: 'open', licensed: false, daysLeft: 0, deviceId: '', endsAt: 0 }; };   // until/unless the lock below takes over
  if (!CFG.trialDays) return;
  if (root.SBHost) return;                                           // the Android app's WebView: the app has its own gate (expiry/TrialGate.kt)

  var mem = null;                                                    // used when localStorage is not available
  function load() {
    var raw = null, rec = null;
    try { raw = root.localStorage.getItem(CFG.storeKey); } catch (e) { raw = null; }
    if (raw) { try { rec = JSON.parse(raw); } catch (e2) { rec = null; } }
    if (!rec || typeof rec !== 'object') rec = mem || {};
    return rec;
  }
  function save(rec) {
    mem = rec;
    try { root.localStorage.setItem(CFG.storeKey, JSON.stringify(rec)); } catch (e) { /* kept in memory for this page */ }
  }

  var current = { kind: 'open' }, lockEl = null, noteEl = null, inertSet = [], observer = null, timer = 0;

  function status() { var r = load(); return { kind: current.kind, licensed: !!current.licensed, daysLeft: current.daysLeft || 0, deviceId: r.device || '', endsAt: current.endsAt || 0 }; }
  api.status = status;
  root.SBLicense = api;

  function check() {
    var rec = load(), now = Math.max(Date.now(), rec.seen || 0);
    if (!rec.start) rec.start = now;
    if (!rec.device) rec.device = newDeviceId();
    if (now > (rec.seen || 0)) rec.seen = now;
    save(rec);
    var done = function (licensed) { current = decide(rec, now, licensed, CFG.trialDays); render(rec, now); };
    if (!rec.code) { done(false); return; }
    verifyCode(rec.code, rec.device, now, CFG.publicKey).then(function (r) { done(r.ok); }, function () { done(false); });
  }

  function el(tag, attrs, text) {
    var e = document.createElement(tag), k;
    for (k in (attrs || {})) if (Object.prototype.hasOwnProperty.call(attrs, k)) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }

  function whatsappHref(device) {
    var text = 'Assalam o Alaikum. My SpaceBook free trial has ended. My device ID is ' + device + '. Please unlock it.';
    return 'https://wa.me/' + CFG.contactWa + '?text=' + encodeURIComponent(text);
  }

  function markInert(on) {
    var kids = document.body ? Array.prototype.slice.call(document.body.children) : [];
    if (on) {
      kids.forEach(function (c) { if (c !== lockEl && !c.hasAttribute('inert')) { c.setAttribute('inert', ''); c.setAttribute('data-sblic', '1'); inertSet.push(c); } });
    } else {
      inertSet.forEach(function (c) { c.removeAttribute('inert'); c.removeAttribute('data-sblic'); });
      inertSet = [];
    }
  }

  function render(rec, now) {
    if (current.kind === 'locked') showLock(rec);
    else { hideLock(); if (current.kind === 'trial' && current.daysLeft <= CFG.noticeDays) showNote(rec, now); else hideNote(); }
  }

  function showLock(rec) {
    hideNote();
    if (lockEl) { var dv = lockEl.querySelector('#sblicDev'); if (dv) dv.textContent = rec.device; return; }
    var card = el('div', { 'class': 'sblic-card' });
    card.appendChild(el('div', { 'class': 'sblic-logo', 'aria-hidden': 'true' }, '🚀'));
    var title = el('h1', { id: 'sblicTitle', tabindex: '-1' }, 'Your 1-month free trial has ended');
    card.appendChild(title);
    card.appendChild(el('p', { id: 'sblicText' }, 'To keep using SpaceBook, please contact the developer on WhatsApp. Your progress and notes on this device are kept.'));
    card.appendChild(el('p', { 'class': 'sblic-ur', lang: 'ur', dir: 'rtl' }, 'آپ کی ایک ماہ کی مفت آزمائش ختم ہو گئی ہے۔ SpaceBook جاری رکھنے کے لیے براہِ کرم ڈویلپر سے واٹس ایپ پر رابطہ کریں۔'));
    var wa = el('a', { 'class': 'sblic-wa', href: whatsappHref(rec.device), target: '_blank', rel: 'noopener' }, 'Contact the developer on WhatsApp: ' + CFG.contactLocal);
    card.appendChild(wa);
    var dev = el('p', { 'class': 'sblic-dev' });
    dev.appendChild(document.createTextNode('Your device ID: '));
    dev.appendChild(el('strong', { id: 'sblicDev' }, rec.device));
    var copy = el('button', { type: 'button', 'class': 'sblic-copy' }, 'Copy');
    copy.addEventListener('click', function () {
      var t = rec.device;
      try { root.navigator.clipboard.writeText(t).then(function () { copy.textContent = 'Copied'; }, function () { copy.textContent = t; }); } catch (e) { copy.textContent = t; }
    });
    dev.appendChild(copy);
    card.appendChild(dev);
    var form = el('form', { 'class': 'sblic-form', autocomplete: 'off' });
    form.appendChild(el('label', { 'for': 'sblicCode' }, 'I have an unlock code'));
    var input = el('input', { id: 'sblicCode', type: 'text', autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false', 'aria-describedby': 'sblicMsg' });
    form.appendChild(input);
    form.appendChild(el('button', { type: 'submit', 'class': 'sblic-go' }, 'Unlock'));
    var msg = el('p', { id: 'sblicMsg', role: 'alert', 'class': 'sblic-msg' });
    form.appendChild(msg);
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      tryUnlock(input.value).then(function (r) { msg.textContent = r.message; if (r.ok) input.value = ''; });
    });
    card.appendChild(form);
    lockEl = el('div', { id: 'sbLicLock', 'class': 'sblic', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'sblicTitle', 'aria-describedby': 'sblicText' });
    lockEl.appendChild(card);
    document.documentElement.classList.add('sblic-on');
    document.body.appendChild(lockEl);
    markInert(true);
    if (root.MutationObserver && !observer) {
      observer = new MutationObserver(function () { if (lockEl) markInert(true); });
      observer.observe(document.body, { childList: true });
    }
    document.addEventListener('keydown', trapTab, true);
    try { title.focus(); } catch (e) { /* no focus in this environment */ }
  }

  /** Tab and Shift+Tab go round the lock screen: nothing behind it can take the focus */
  function trapTab(ev) {
    if (ev.key !== 'Tab' || !lockEl) return;
    var f = Array.prototype.slice.call(lockEl.querySelectorAll('a[href], button, input')).filter(function (x) { return !x.disabled; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1], a = document.activeElement, inside = lockEl.contains(a);
    if (ev.shiftKey && (a === first || !inside || a.id === 'sblicTitle')) { ev.preventDefault(); last.focus(); }
    else if (!ev.shiftKey && (a === last || !inside)) { ev.preventDefault(); first.focus(); }
  }

  function hideLock() {
    if (!lockEl) return;
    if (observer) { observer.disconnect(); observer = null; }
    document.removeEventListener('keydown', trapTab, true);
    markInert(false);
    if (lockEl.parentNode) lockEl.parentNode.removeChild(lockEl);
    lockEl = null;
    document.documentElement.classList.remove('sblic-on');
  }

  function showNote(rec, now) {
    var today = Math.floor(now / DAY);
    if (rec.noteDay === today || noteEl) return;
    noteEl = el('div', { 'class': 'sblic-note', role: 'status' });
    var d = current.daysLeft;
    noteEl.appendChild(el('span', null, 'SpaceBook access: ' + d + (d === 1 ? ' day' : ' days') + ' left. After that, contact the developer on WhatsApp ' + CFG.contactLocal + '.'));
    var ok = el('button', { type: 'button' }, 'OK');
    ok.addEventListener('click', function () { var r = load(); r.noteDay = today; save(r); hideNote(); });
    noteEl.appendChild(ok);
    document.body.appendChild(noteEl);
  }
  function hideNote() { if (noteEl && noteEl.parentNode) noteEl.parentNode.removeChild(noteEl); noteEl = null; }

  /** the unlock box: a signed code (made for this device) first; anything that is not shaped like one is tried as the default code -> Promise<{ok, message}> */
  function tryUnlock(code) {
    var rec = load(), now = Math.max(Date.now(), rec.seen || 0);
    if (now < (rec.blocked || 0)) return Promise.resolve({ ok: false, message: 'Too many wrong tries. Please wait ' + Math.max(1, Math.ceil((rec.blocked - now) / 1000)) + ' seconds.' });
    var fail = function (reason) {
      rec.fails = (rec.fails || 0) + 1;
      var over = rec.fails - FREE_TRIES, message;
      if (over >= 0) { var wait = Math.min(3600000, 60000 * Math.pow(2, Math.min(over, 6))); rec.blocked = now + wait; message = 'Too many wrong tries. Please wait ' + Math.round(wait / 1000) + ' seconds.'; }
      else if (reason === 'device') message = 'This code is for another device. Send your device ID to the developer to get a code for this one.';
      else if (reason === 'expired') message = 'This code has ended. Please ask the developer for a new one.';
      else message = 'That code is not right. ' + (FREE_TRIES - rec.fails) + (FREE_TRIES - rec.fails === 1 ? ' try' : ' tries') + ' left.';
      save(rec);
      return { ok: false, message: message };
    };
    return verifyCode(code, rec.device, now, CFG.publicKey).then(function (r) {
      if (r.ok) { rec.code = normalizeCode(code); rec.fails = 0; rec.blocked = 0; save(rec); check(); return { ok: true, message: '' }; }
      if (r.reason !== 'format') return fail(r.reason);
      return checkDefault(trimCode(code), CFG.defaultCode).then(function (yes) {
        if (!yes) return fail('format');
        rec.extendUntil = Math.max(rec.extendUntil || 0, now + CFG.grantDays * DAY);   // a month from now
        rec.fails = 0; rec.blocked = 0; save(rec); check();
        return { ok: true, message: '' };
      });
    });
  }
  api.tryUnlock = tryUnlock;

  // a page left open for days must lock when the date passes; another tab that unlocked must unlock this one
  timer = root.setInterval(check, 60000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) check(); });
  root.addEventListener('storage', function (e) { if (e.key === CFG.storeKey) check(); });
  check();
})(typeof self !== 'undefined' ? self : this);
