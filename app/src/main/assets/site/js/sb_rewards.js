/* Reward coins + activity progress for students.
 *  Logged in: progress and coins live in the student's account (api/progress.php decides the coins).
 *  Guest:     kept on this device with the same rules, and moved into the account at the next login.
 *  Rules: +1 🪙 per step the first time it is finished, +5 🪙 for first completing an activity,
 *         +2 🪙 for doing a completed activity again (once per activity per day).
 * Public API (window.SBRewards): ready, get(key), step(key, title, total, i, x, y), again(key, x, y), onChange(fn). */
(function () {
  'use strict';
  const API = 'api/progress.php';
  const GUEST = 'sb_rewards_guest_v1';
  const STEP_COIN = 1, COMPLETE_COIN = 5, PRACTICE_COIN = 2;
  let user = null;                // signed-in user or null
  let data = {coins: 0, activities: {}};
  const listeners = [];

  // ---------- storage ----------
  function loadGuest() {
    try { const g = JSON.parse(localStorage.getItem(GUEST) || 'null'); if (g && g.activities) return g; } catch (e) { /* storage unavailable */ }
    return {coins: 0, activities: {}};
  }
  function saveGuest() { try { localStorage.setItem(GUEST, JSON.stringify(data)); } catch (e) { /* storage unavailable */ } }
  async function call(action, body) {
    // a write that cannot reach the server waits in the offline queue (js/core/offline_queue.js) and is sent when the connection is back
    if (body !== undefined && window.SBOfflineQueue && user) return window.SBOfflineQueue.send(API + '?action=' + action, body);
    const opts = {credentials: 'same-origin', headers: {}};
    if (body !== undefined) { opts.method = 'POST'; opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(body); }
    try { const r = await fetch(API + '?action=' + action, opts); return await r.json(); } catch (e) { return {ok: false}; }
  }
  const today = () => new Date().toISOString().slice(0, 10);
  const now = () => new Date().toISOString().slice(0, 19).replace('T', ' ');

  function changed() { paintChip(); listeners.forEach(fn => { try { fn(data); } catch (e) { /* listener error */ } }); }

  async function loadFor(u) {
    user = u;
    if (!user) { data = loadGuest(); changed(); return; }
    if (v2()) { await loadV2(); return; }
    const guest = loadGuest();
    const items = Object.entries(guest.activities).map(([key, a]) => ({key, title: a.title || '', total: a.total, done: a.done}));
    if (items.length) {
      const r = await call('sync', {items});
      if (r.ok) { try { localStorage.removeItem(GUEST); } catch (e) { /* fine */ } if (r.earned) toast('+' + r.earned + ' 🪙 saved to your account'); }
    }
    const r = await call('get');
    data = r.ok ? {coins: r.coins, activities: r.activities || {}} : loadGuest();
    if (!r.ok) user = null;      // server not reachable: keep working as a guest
    changed();
  }

  // ---------- the rules (same as the server: api/lib/rewards.php) ----------
  // st = {coins, activities}; these functions change it in place and say what happened
  function applyStep(st, key, title, total, i) {
    const a = st.activities[key] || (st.activities[key] = {done: [], total: Math.max(1, Math.min(200, total)), times: 0, first: null, last: null, title});
    let earned = 0, completed = false;
    if (i >= 0 && i < a.total && !a.done.includes(i)) { a.done.push(i); a.done.sort((x, y) => x - y); earned += STEP_COIN; }
    if (!a.times && a.done.length >= a.total) { earned += COMPLETE_COIN; a.times = 1; a.first = a.last = now(); completed = true; }
    st.coins += earned;
    return {earned, completed, times: a.times};
  }
  function applyAgain(st, key) {
    const a = st.activities[key]; if (!a || !a.times) return null;
    const earned = a.last && a.last.slice(0, 10) === today() ? 0 : PRACTICE_COIN;
    a.times++; a.last = now(); st.coins += earned;
    return {earned, times: a.times};
  }
  function guestStep(key, title, total, i) {
    const r = applyStep(data, key, title, total, i); saveGuest();
    return {ok: true, earned: r.earned, completed: r.completed, times: r.times, coins: data.coins};
  }
  function guestAgain(key) {
    const r = applyAgain(data, key); if (!r) return {ok: false};
    saveGuest();
    return {ok: true, earned: r.earned, times: r.times, coins: data.coins};
  }

  // ---------- v2: offline-safe sync (js/core/sync.js, behind the sb_sync_v2 flag) ----------
  // What a signed-in student sees = the last pulled snapshot + the events the server has not confirmed yet,
  // replayed with the same rules. A step is written to the outbox first, so a failed request never loses it
  // and never turns the student into a guest.
  const v2 = () => { try { return !!(window.SBSync && window.SBSync.isEnabled && window.SBSync.isEnabled()); } catch (e) { return false; } };
  let hooked = false;
  function hookV2() {
    if (hooked || !window.SBSync) return;
    hooked = true;
    window.SBSync.on('pulled', () => { if (user && v2()) derive(); });
    window.SBSync.on('coins', () => { if (user && v2()) derive(); });
  }
  async function derive() {
    const snap = await window.SBSync.snapshot(), pend = await window.SBSync.pendingEvents();
    const st = {coins: snap.coins || 0, activities: {}};
    Object.entries(snap.progress || {}).forEach(([k, a]) => { st.activities[k] = {done: (a.done || []).slice(), total: a.total, times: a.times || 0, first: a.first || null, last: a.last || null}; });
    pend.forEach(ev => {
      const p = ev.payload || {};
      if (ev.type === 'step') applyStep(st, p.key, p.title || '', p.total, p.step);
      else if (ev.type === 'again') applyAgain(st, p.key);
    });
    data = st; changed();
  }
  let loadingV2 = null;
  // single-flight: the page announces the sign-in more than once (session check, login form); the guest copy must be asked about and moved once
  function loadV2() {
    if (!loadingV2) loadingV2 = loadV2Once().finally(() => { loadingV2 = null; });
    return loadingV2;
  }
  async function loadV2Once() {
    hookV2();
    await window.SBSync.setUser(user);
    // progress made as a guest on this device joins the account (the page will ask first, see docs/PHASE2_SYNC_DESIGN.md)
    const guest = loadGuest();
    let moved = 0;
    if (Object.keys(guest.activities).length && (!window.SBConsent || await window.SBConsent.guestData(user.id))) {   // never moved silently: it may belong to someone else
      for (const [key, a] of Object.entries(guest.activities)) {
        for (const i of a.done) { await window.SBSync.emit('step', {key, title: a.title || '', total: a.total, step: i}); moved++; }
      }
    }
    if (moved) { try { localStorage.removeItem(GUEST); } catch (e) { /* fine */ } toast('Your progress on this device was added to your account'); }
    await derive();
    window.SBSync.sync().then(() => derive()).catch(() => { /* offline: the outbox keeps everything */ });
  }
  // ---------- public actions ----------
  async function step(key, title, total, i, x, y) {
    let r;
    if (user && v2()) {
      const before = data.coins, wasDone = ((data.activities[key] || {}).times || 0) > 0;
      try { await window.SBSync.emit('step', {key, title, total, step: i}); await derive(); } catch (e) { return {ok: false, earned: 0}; }
      const a = data.activities[key] || {};
      r = {ok: true, earned: data.coins - before, completed: !wasDone && (a.times || 0) > 0, times: a.times || 0, coins: data.coins};
    } else if (user) {
      r = await call('step', {key, title, total, step: i});
      if (r.queued) { const a = applyStep(data, key, title, total, i); r = {ok: true, earned: a.earned, completed: a.completed, times: a.times, coins: data.coins}; }   // offline: counted here now, sent later
      else if (r.ok) {
        const a = data.activities[key] || (data.activities[key] = {done: [], total, times: 0, first: null, last: null});
        if (!a.done.includes(i)) a.done.push(i);
        a.times = r.times; if (r.completed) a.first = a.last = now();
        data.coins = r.coins;
      } else if (r.error) { user = null; data = loadGuest(); r = guestStep(key, title, total, i); }   // logged out elsewhere
      else r = {ok: false, earned: 0};
    } else r = guestStep(key, title, total, i);
    if (r.earned) fly('+' + r.earned + ' 🪙', x, y);
    changed();
    return r;
  }
  async function again(key, x, y) {
    let r;
    if (user && v2()) {
      const a0 = data.activities[key];
      if (!a0 || !a0.times) r = {ok: false};
      else {
        const before = data.coins;
        try { await window.SBSync.emit('again', {key}); await derive(); } catch (e) { return {ok: false}; }
        r = {ok: true, earned: data.coins - before, times: (data.activities[key] || {}).times, coins: data.coins};
      }
    } else if (user) {
      r = await call('again', {key});
      if (r.queued) { const a = applyAgain(data, key); r = a ? {ok: true, earned: a.earned, times: a.times, coins: data.coins} : {ok: false}; }
      else if (r.ok) { const a = data.activities[key]; if (a) { a.times = r.times; a.last = now(); } data.coins = r.coins; }
    } else r = guestAgain(key);
    if (r.ok) fly(r.earned ? '+' + r.earned + ' 🪙 practice' : 'Practised again ✔', x, y);
    changed();
    return r;
  }

  // ---------- UI ----------
  const css = `
  .sbr-chip{display:inline-flex;align-items:center;gap:.3rem;margin-right:.6rem;padding:.3rem .7rem;border-radius:999px;background:linear-gradient(180deg,#fef3c7,#fde68a);border:1px solid #f59e0b;color:#78350f;font:800 .95rem system-ui,sans-serif;cursor:pointer;white-space:nowrap;position:relative}
  .sbr-chip:hover{filter:brightness(1.05)}
  .sbr-chip.sbr-bump{animation:sbrBump .45s ease}
  @keyframes sbrBump{40%{transform:scale(1.22)}}
  .sbr-pop{position:absolute;top:calc(100% + 8px);right:0;z-index:2000;width:250px;background:#fff;border:1px solid #e2e8f0;border-radius:14px;box-shadow:0 12px 28px rgba(15,23,42,.18);padding:.8rem .9rem;color:#0f172a;font:500 .88rem system-ui,sans-serif;white-space:normal;cursor:default;text-align:left}
  .sbr-pop b{font-size:1.4rem;color:#b45309}
  .sbr-pop p{margin:.35rem 0}
  .sbr-pop button{margin-top:.3rem;border:0;border-radius:10px;background:#0369a1;color:#fff;font:700 .85rem system-ui,sans-serif;padding:.4rem .8rem;cursor:pointer}
  .sbr-fly{position:fixed;z-index:10002;pointer-events:none;font:900 1.25rem system-ui,sans-serif;color:#b45309;text-shadow:0 1px 0 #fff,0 0 6px #fff;animation:sbrFly 1.3s ease-out forwards}
  @keyframes sbrFly{0%{opacity:0;transform:translateY(6px) scale(.7)}15%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-60px)}}
  .sbr-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:10003;background:#14532d;color:#fff;border-radius:12px;padding:.55rem 1rem;font:700 .92rem system-ui,sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.2)}
  @media (max-width:640px){.sbr-chip{margin-right:.3rem;padding:.25rem .5rem;font-size:.85rem}}
  `;
  function addCss() { if (document.getElementById('sbr-css')) return; const s = document.createElement('style'); s.id = 'sbr-css'; s.textContent = css; document.head.appendChild(s); }
  let chip = null;
  function paintChip() {
    addCss();
    if (!chip) {
      const avatar = document.querySelector('.header-user-avatar'); if (!avatar || !avatar.parentNode) return;
      chip = document.createElement('div'); chip.className = 'sbr-chip'; chip.setAttribute('role', 'button'); chip.tabIndex = 0;
      chip.innerHTML = '<span class="sbr-n"></span>';
      chip.addEventListener('click', e => { e.stopPropagation(); togglePop(); });
      avatar.parentNode.insertBefore(chip, avatar);
    }
    const prev = Number(chip.dataset.n || 0);
    chip.dataset.n = data.coins;
    chip.querySelector('.sbr-n').textContent = '🪙 ' + data.coins;
    chip.title = data.coins + ' coins';
    if (data.coins > prev) { chip.classList.remove('sbr-bump'); void chip.offsetWidth; chip.classList.add('sbr-bump'); }
    const pop = chip.querySelector('.sbr-pop'); if (pop) fillPop(pop);
  }
  function fillPop(pop) {
    const done = Object.values(data.activities).filter(a => a.times > 0).length;
    pop.innerHTML = `<div><b>🪙 ${data.coins}</b> coins</div><p>✅ ${done} activit${done === 1 ? 'y' : 'ies'} completed</p>` +
      `<p style="color:#64748b;font-size:.8rem">+1 🪙 for each step, +5 🪙 for finishing an activity, +2 🪙 for practising it again (once a day).</p>` +
      (user ? '' : '<p style="color:#b45309">You are not logged in: coins are kept on this device only.</p><button type="button">Log in to save coins</button>');
    const b = pop.querySelector('button'); if (b) b.addEventListener('click', () => { pop.remove(); window.SpaceBookAuth && SpaceBookAuth.open('login'); });
  }
  function togglePop() {
    const old = chip.querySelector('.sbr-pop'); if (old) { old.remove(); return; }
    const pop = document.createElement('div'); pop.className = 'sbr-pop'; pop.addEventListener('click', e => e.stopPropagation());
    fillPop(pop); chip.appendChild(pop);
    setTimeout(() => document.addEventListener('click', () => pop.remove(), {once: true}));
  }
  function fly(text, x, y) {
    if (x == null) { const r = chip ? chip.getBoundingClientRect() : {left: innerWidth / 2, bottom: 80}; x = r.left; y = r.bottom + 30; }
    const f = document.createElement('div'); f.className = 'sbr-fly'; f.textContent = text;
    f.style.left = (x + 14) + 'px'; f.style.top = (y - 20) + 'px';
    document.body.appendChild(f); setTimeout(() => f.remove(), 1400);
  }
  function toast(text) { const t = document.createElement('div'); t.className = 'sbr-toast'; t.textContent = text; document.body.appendChild(t); setTimeout(() => t.remove(), 3200); }

  let resolveReady; const ready = new Promise(r => { resolveReady = r; });
  let first = true;
  document.addEventListener('spacebook:auth', e => {
    const u = e.detail && e.detail.user;
    if (!first && (u && user && u.id === user.id)) return;
    loadFor(u).then(() => { if (first) { first = false; resolveReady(); } });
  });
  // no account system on this page (or it never answers): start as a guest
  setTimeout(() => { if (first) { first = false; data = loadGuest(); changed(); resolveReady(); } }, 4000);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', paintChip); else paintChip();

  window.SBRewards = {
    ready,
    get: key => data.activities[key] || null,
    step, again,
    onChange: fn => listeners.push(fn),
    get coins() { return data.coins; },
    get signedIn() { return !!user; },
  };
})();
