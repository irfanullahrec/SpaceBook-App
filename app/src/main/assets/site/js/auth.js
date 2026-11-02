// ─── ACCOUNTS: login / create account modal (talks to api/auth.php) ───
(function () {
  const API = 'api/auth.php';
  let currentUser = null;

  async function call(action, body, extraHeaders) {
    const opts = { credentials: 'same-origin', headers: Object.assign({}, extraHeaders || {}) };
    if (body !== undefined) {
      opts.method = 'POST';
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
    let res;
    try {
      res = await fetch(`${API}?action=${action}`, opts);
    } catch (e) {
      return { ok: false, error: 'Cannot reach server. Check your connection.' };
    }
    try {
      return await res.json();
    } catch (e) {
      return { ok: false, error: 'Server error (is PHP running?)' };
    }
  }

  function deviceName() {
    const ua = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
    return ua.replace(/\s+/g, ' ').slice(0, 60);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function buildModal() {
    const wrap = document.createElement('div');
    wrap.id = 'authModal';
    wrap.className = 'auth-backdrop';
    wrap.hidden = true;
    wrap.innerHTML = `
      <div class="auth-card" role="dialog" aria-modal="true" aria-labelledby="authTitle" data-tab="login">
        <button class="auth-close" type="button" aria-label="Close">✕</button>
        <section class="sbd-auth-hero sbd-hero-login">
          <h3>Welcome to <span>Space</span><em>Book</em></h3>
          <p class="sbd-tag">Digital Textbooks for a Smarter Generation</p>
          <div class="sbd-langs"><i class="en"><img src="assets/ui/flag-en.png" alt="">English</i><i class="ur"><img src="assets/ui/flag-ur.png" alt="">Urdu</i><i class="ps"><img src="assets/ui/flag-ps.png" alt="">Pashto</i><i class="ar"><img src="assets/ui/flag-ar.png" alt="">Arabic</i></div>
          <img class="sbd-hero-img" src="assets/ui/hero-books.png" alt="" width="625" height="405">
          <div class="sbd-feats"><div><img src="assets/ui/feat-1.png" alt=""><span>Learn from digital textbooks</span></div><div><img src="assets/ui/feat-2.png" alt=""><span>Track your progress</span></div><div><img src="assets/ui/feat-3.png" alt=""><span>Practice with MCQs &amp; tests</span></div><div><img src="assets/ui/feat-4.png" alt=""><span>Build a brighter future</span></div></div>
        </section>
        <section class="sbd-auth-fields">
        <h2 id="authTitle">Sign in to SpaceBook</h2>
        <p class="sbd-sub sbd-sub-login">Access your study materials, track your progress, and continue your learning journey.</p>
        <p class="sbd-sub sbd-sub-register">Join SpaceBook and start your learning journey today!</p>
        <div class="auth-tabs" role="tablist">
          <button type="button" role="tab" aria-selected="true" data-tab="login" class="active">Login</button>
          <button type="button" role="tab" aria-selected="false" data-tab="register">Create Account</button>
        </div>

        <form class="auth-form" data-form="login" novalidate>
          <label>WhatsApp Number<span class="sbd-field"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#4a5f8a" stroke-width="1.8" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg><input name="whatsapp" type="tel" inputmode="tel" autocomplete="tel" placeholder="03XX XXXXXXX" required></span></label>
          <label>Password<span class="sbd-field"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#4a5f8a" stroke-width="1.8" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><input name="password" type="password" autocomplete="current-password" required><button type="button" class="sbd-eye" aria-label="Show password"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#4a5f8a" stroke-width="1.8"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg></button></span></label>
          <p class="auth-error" aria-live="polite"></p>
          <button class="auth-submit" type="submit">Sign in <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </form>

        <form class="auth-form" data-form="register" novalidate hidden>
          <label>Full Name<span class="sbd-field"><svg viewBox="0 0 24 24" width="22" height="22" fill="#4a5f8a" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6z"/></svg><input name="name" type="text" autocomplete="name" maxlength="100" required></span></label>
          <label>Father Name<span class="sbd-field"><svg viewBox="0 0 24 24" width="22" height="22" fill="#4a5f8a" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6z"/></svg><input name="father_name" type="text" maxlength="100" required></span></label>
          <label>WhatsApp Number<span class="sbd-field"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#4a5f8a" stroke-width="1.8" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg><input name="whatsapp" type="tel" inputmode="tel" autocomplete="tel" placeholder="03XX XXXXXXX" required></span></label>
          <label>Password<span class="sbd-field"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#4a5f8a" stroke-width="1.8" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><input name="password" type="password" autocomplete="new-password" minlength="6" required><button type="button" class="sbd-eye" aria-label="Show password"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#4a5f8a" stroke-width="1.8"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg></button></span></label>
          <p class="auth-error" aria-live="polite"></p>
          <button class="auth-submit" type="submit">Create Account <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </form>
        <p class="sbd-or"><span>or</span></p>
        <button type="button" class="sbd-guest"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M2 5c4-1.5 7-1 10 1v14c-3-2-6-2.5-10-1zM22 5c-4-1.5-7-1-10 1v14c3-2 6-2.5 10-1z"/></svg>Continue as a guest</button>
        <p class="sbd-switch sbd-switch-login">Don’t have an account? <button type="button" data-go="register">Create a new account →</button></p>
        <p class="sbd-switch sbd-switch-register">Already have an account? <button type="button" data-go="login">Sign In</button></p>
        </section>
        <section class="sbd-auth-hero sbd-hero-register">
          <h3>A Smarter Way<br>to Learn <em>Every Subject</em></h3>
          <p class="sbd-tag">Study, practice, and explore in English, Urdu, Pashto and Arabic with SpaceBook.</p>
          <div class="sbd-langs"><i class="en"><img src="assets/ui/flag-en.png" alt="">English</i><i class="ur"><img src="assets/ui/flag-ur.png" alt="">Urdu</i><i class="ps"><img src="assets/ui/flag-ps.png" alt="">Pashto</i><i class="ar"><img src="assets/ui/flag-ar.png" alt="">Arabic</i></div>
          <img class="sbd-hero-img" src="assets/ui/hero-laptop.png" alt="" width="627" height="420">
        </section>
      </div>`;
    document.body.appendChild(wrap);

    wrap.addEventListener('click', e => { if (e.target === wrap) close(); });
    wrap.querySelector('.auth-close').addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !wrap.hidden) close(); });
    wrap.querySelectorAll('.auth-tabs button').forEach(b =>
      b.addEventListener('click', () => showTab(b.dataset.tab)));

    wrap.querySelector('.sbd-guest').addEventListener('click', close);
    wrap.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => showTab(b.dataset.go)));
    wrap.querySelectorAll('.sbd-eye').forEach(b => b.addEventListener('click', () => { const i = b.parentNode.querySelector('input'); const show = i.type === 'password'; i.type = show ? 'text' : 'password'; b.setAttribute('aria-label', show ? 'Hide password' : 'Show password'); }));
    wrap.querySelectorAll('.auth-form').forEach(form => {
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const err = form.querySelector('.auth-error');
        const btn = form.querySelector('.auth-submit');
        const data = Object.fromEntries(new FormData(form).entries());
        err.textContent = '';
        btn.disabled = true;
        // ask for a device token: offline-safe sync (js/core/sync.js) uses it instead of the cookie
        const r = await call(form.dataset.form, Object.assign({ want_device: true, device_name: deviceName() }, data));
        btn.disabled = false;
        if (!r.ok) { err.textContent = r.error || 'Something went wrong'; return; }
        if (r.device && window.SBSync) { try { await window.SBSync.setDevice(r.user.id, r.device); } catch (e) { /* sync falls back to the cookie */ } }
        setUser(r.user);
        form.reset();
        close();
      });
    });
    return wrap;
  }

  function modal() { return document.getElementById('authModal') || buildModal(); }

  function showTab(tab) {
    const m = modal();
    m.querySelectorAll('.auth-tabs button').forEach(b => { b.classList.toggle('active', b.dataset.tab === tab); b.setAttribute('aria-selected', String(b.dataset.tab === tab)); });
    m.querySelectorAll('.auth-form').forEach(f => { f.hidden = f.dataset.form !== tab; });
    const card = m.querySelector('.auth-card'); if (card) card.dataset.tab = tab;
    const ttl = m.querySelector('#authTitle'); if (ttl) ttl.textContent = tab === 'register' ? 'Create Your Account' : 'Sign in to SpaceBook';
    const first = m.querySelector(`.auth-form[data-form="${tab}"] input`);
    if (first) first.focus();
  }

  // keyboard: Tab stays in the dialog, Escape closes it, the focus goes back to what opened it (js/core/a11y.js)
  let releaseAuth = null;
  function open(tab) {
    modal().hidden = false;
    if (releaseAuth) releaseAuth();
    releaseAuth = window.SBA11y ? window.SBA11y.trap(modal(), { onClose: close }) : null;
    showTab(tab || 'login');
  }

  function close() {
    modal().hidden = true;
    if (releaseAuth) { releaseAuth(); releaseAuth = null; }
  }

  function closeMenu() {
    const menu = document.getElementById('authMenu');
    if (menu) menu.remove();
  }

  // ---- own account: profile, password, data export, deletion (server: api/auth.php, tests: tests/php/run.php) ----
  const bearer = () => (window.SBSync ? window.SBSync.bearerHeaders() : {});
  async function updateProfile(name, fatherName) {
    const r = await call('update_profile', { name, father_name: fatherName });
    if (r.ok) setUser(r.user);
    return r;
  }
  async function changePassword(current, next) {
    return call('change_password', { current_password: current, new_password: next }, bearer());     // this device's token stays valid, the others are signed out
  }
  async function exportData() {
    const r = await call('export');
    if (r && r.schema && typeof window.SBDownload === 'function') {
      // the Android app's page cannot save a blob link: its bridge (assets/reader_bridge.js) hands the file to the phone's share sheet
      window.SBDownload('spacebook-my-data.json', 'application/json', JSON.stringify(r, null, 2));
    } else if (r && r.schema && typeof document !== 'undefined' && typeof Blob !== 'undefined' && window.URL && URL.createObjectURL) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(r, null, 2)], { type: 'application/json' }));
      a.download = 'spacebook-my-data.json';
      document.body.appendChild(a); a.click(); a.remove();
    }
    return r;
  }
  async function deleteAccount(password) {
    const uid = currentUser && currentUser.id;
    const r = await call('delete_account', { password });
    if (r.ok) {
      if (window.SBSync && uid != null) { try { await window.SBSync.clearDevice(uid); } catch (e) { /* fine */ } }
      setUser(null);
    }
    return r;
  }

  let releaseAccount = null;
  function closeAccount() {
    const m = document.getElementById('accountModal'); if (m) m.remove();
    if (releaseAccount) { releaseAccount(); releaseAccount = null; }
  }
  function openAccount() {
    if (!currentUser) { open('login'); return; }
    closeAccount();
    const wrap = document.createElement('div');
    wrap.id = 'accountModal';
    wrap.className = 'auth-backdrop';
    wrap.classList.add('sbd-acct-page');
    wrap.innerHTML = `
      <div class="auth-card sbd-acct" role="dialog" aria-modal="true" aria-labelledby="accTitle">
        <button class="auth-close" type="button" aria-label="Close">✕</button>
        <h2 id="accTitle">My Account</h2>
        <p class="sbd-acct-sub">Manage your profile, security, data and connected devices.</p>
        <div class="sbd-acct-tabs" role="tablist">
          <button type="button" role="tab" class="on" data-pane="profile"><svg viewBox="0 0 24 24" width="26" height="26" fill="#1d6fe8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6z"/></svg>Profile</button>
          <button type="button" role="tab" data-pane="security"><svg viewBox="0 0 24 24" width="26" height="26" fill="#0a2a6b"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="#0a2a6b" stroke-width="2"/></svg>Security</button>
          <button type="button" role="tab" data-pane="data"><svg viewBox="0 0 24 24" width="26" height="26" fill="#0a2a6b"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>My Data</button>
        </div>
        <section class="sbd-pane" data-pane="profile">
          <div class="sbd-acct-hero"><div class="sbd-avatar">${esc(currentUser.name.trim().charAt(0).toUpperCase())}</div>
            <div><h3>${esc(currentUser.name)}</h3><p>S/O ${esc(currentUser.father_name || '')}</p><p class="sbd-acct-wa">+${esc(currentUser.whatsapp)}</p></div>
            <div class="sbd-acct-prog" id="sbdAcctProg"></div></div>
          <div class="sbd-acct-card"><h3>Personal Information</h3><p>Keep your information up to date so we can personalize your learning experience.</p>
          <form class="auth-form" data-acc="profile" novalidate>
            <label>Full Name <input name="name" type="text" maxlength="100" value="${esc(currentUser.name)}" required></label>
            <label>Father Name <input name="father_name" type="text" maxlength="100" value="${esc(currentUser.father_name || '')}" required></label>
            <p class="auth-error" aria-live="polite"></p>
            <button class="auth-submit" type="submit">Save Changes</button>
          </form></div>
        </section>
        <section class="sbd-pane" data-pane="security" hidden>
          <div class="sbd-acct-card"><h3>Account Actions — Change Password</h3><p>Use a strong password to keep your account safe.</p>
          <form class="auth-form" data-acc="password" novalidate>
            <label>Current Password <span class="sbd-field"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#4a5f8a" stroke-width="1.8"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><input name="current_password" type="password" autocomplete="current-password" placeholder="Enter current password" required><button type="button" class="sbd-eye" aria-label="Show password"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#4a5f8a" stroke-width="1.8"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg></button></span></label>
            <label>New Password <span class="sbd-field"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#4a5f8a" stroke-width="1.8"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><input name="new_password" type="password" autocomplete="new-password" minlength="6" placeholder="Enter new password" required><button type="button" class="sbd-eye" aria-label="Show password"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#4a5f8a" stroke-width="1.8"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg></button></span></label>
            <p class="auth-error" aria-live="polite"></p>
            <button class="auth-submit sbd-green" type="submit">Update Password</button>
          </form></div>
        </section>
        <section class="sbd-pane" data-pane="data" hidden>
          <div class="sbd-acct-card sbd-dl"><div><h3>Download Your Data</h3><p>Get a copy of your learning data, progress and saved items. A file with your details, coins, study plans and practice record.</p></div>
          <form class="auth-form" data-acc="export" novalidate><p class="auth-error" aria-live="polite"></p><button class="auth-submit sbd-outline" type="submit">Download My Data</button></form></div>
          <div class="sbd-acct-card sbd-danger"><h3>Delete Account</h3><p>This removes your account and everything saved in it after 30 days. Enter your password to confirm. This action cannot be undone.</p>
          <form class="auth-form" data-acc="delete" novalidate>
            <label>Password <input name="password" type="password" autocomplete="current-password" required></label>
            <p class="auth-error" aria-live="polite"></p>
            <button class="auth-submit sbd-red" type="submit">Delete My Account</button>
          </form></div>
        </section>
      </div>`;
    wrap.querySelectorAll('.sbd-acct-tabs button').forEach(t => t.addEventListener('click', () => {
      wrap.querySelectorAll('.sbd-acct-tabs button').forEach(x => x.classList.toggle('on', x === t));
      wrap.querySelectorAll('.sbd-pane').forEach(p => { p.hidden = p.dataset.pane !== t.dataset.pane; });
    }));
    wrap.querySelectorAll('.sbd-eye').forEach(bt => bt.addEventListener('click', () => { const i = bt.parentNode.querySelector('input'); i.type = i.type === 'password' ? 'text' : 'password'; }));
    try {
      const sum = window.SBWordStats && window.SBWordStats.progressSummary && window.SBWordStats.progressSummary();
      const box = wrap.querySelector('#sbdAcctProg');
      if (sum && box) {
        const L = [['en', 'English', 'en'], ['ur', 'Urdu', 'ur'], ['ps', 'Pashto', 'ps'], ['ar', 'Arabic', 'ar']];
        box.innerHTML = '<h4>My Learning Progress</h4><div>' + L.map(l => { const m = (sum.byLang || {})[l[0]] || {}; const n = (m.learnt || 0) + (m.knew || 0); return '<span class="sbd-lp ' + l[2] + '"><img src="assets/ui/flag-' + l[0] + '.png" alt="">' + l[1] + '<b>' + n.toLocaleString() + '</b><small>words known</small></span>'; }).join('') + '</div>';
      }
    } catch (e) { /* progress is optional here */ }
    document.body.appendChild(wrap);
    if (window.SBA11y) releaseAccount = window.SBA11y.trap(wrap, { onClose: closeAccount });
    wrap.addEventListener('click', e => { if (e.target === wrap) closeAccount(); });
    wrap.querySelector('.auth-close').addEventListener('click', closeAccount);
    wrap.querySelectorAll('form').forEach(form => form.addEventListener('submit', async e => {
      e.preventDefault();
      const err = form.querySelector('.auth-error'), btn = form.querySelector('.auth-submit');
      const f = Object.fromEntries(new FormData(form).entries());
      err.textContent = ''; btn.disabled = true;
      let r;
      switch (form.dataset.acc) {
        case 'profile': r = await updateProfile(f.name, f.father_name); break;
        case 'password': r = await changePassword(f.current_password, f.new_password); break;
        case 'export': r = await exportData(); r = r && r.schema ? { ok: true } : r; break;
        case 'delete':
          if (!confirm('Delete your account? This cannot be undone after 30 days.')) { btn.disabled = false; return; }
          r = await deleteAccount(f.password); break;
      }
      btn.disabled = false;
      if (!r || r.ok === false) { err.textContent = (r && r.error) || 'Something went wrong'; return; }
      if (form.dataset.acc === 'password') form.reset();
      err.style.color = '#15803d'; err.textContent = form.dataset.acc === 'delete' ? 'Your account was deleted.' : 'Done.';
      if (form.dataset.acc === 'delete') setTimeout(closeAccount, 1200);
    }));
  }

  function showMenu(anchor) {
    if (document.getElementById('authMenu')) { closeMenu(); return; }
    const u = currentUser;
    const menu = document.createElement('div');
    menu.id = 'authMenu';
    menu.className = 'auth-menu';
    menu.innerHTML = `
      <div class="auth-menu-name">${esc(u.name)}</div>
      <div class="auth-menu-meta">+${esc(u.whatsapp)}</div>
      <button type="button" class="auth-logout" data-act="plans" style="margin-bottom:.4rem">My plans</button>
      <button type="button" class="auth-logout" data-act="account" style="margin-bottom:.4rem">My account</button>
      <button type="button" class="auth-logout">Logout</button>`;
    anchor.appendChild(menu);
    menu.addEventListener('click', e => e.stopPropagation());
    menu.querySelector('[data-act="account"]').addEventListener('click', () => { closeMenu(); openAccount(); });
    menu.querySelector('[data-act="plans"]').addEventListener('click', () => { closeMenu(); if (window.SBBilling) window.SBBilling.openAccount(); });
    menu.querySelector('.auth-logout:not([data-act])').addEventListener('click', async () => {
      const uid = currentUser && currentUser.id;
      await call('logout', {}, window.SBSync ? window.SBSync.bearerHeaders() : {});   // the device token ends with the logout
      if (window.SBSync && uid != null) { try { await window.SBSync.clearDevice(uid); } catch (e) { /* fine */ } }   // events waiting to be sent stay on the device
      setUser(null);
      closeMenu();
    });
    setTimeout(() => document.addEventListener('click', closeMenu, { once: true }));
  }

  function setUser(u) {
    currentUser = u || null;
    const avatar = document.querySelector('.header-user-avatar');
    if (avatar) {
      avatar.classList.toggle('auth-signed-in', !!currentUser);
      avatar.title = currentUser ? currentUser.name : 'Login / Create Account';
      let badge = avatar.querySelector('.auth-initial');
      if (currentUser) {
        if (!badge) { badge = document.createElement('span'); badge.className = 'auth-initial'; avatar.appendChild(badge); }
        badge.textContent = currentUser.name.trim().charAt(0).toUpperCase();
      } else if (badge) {
        badge.remove();
      }
    }
    document.dispatchEvent(new CustomEvent('spacebook:auth', { detail: { user: currentUser } }));
  }

  function init() {
    const avatar = document.querySelector('.header-user-avatar');
    if (avatar) {
      avatar.setAttribute('role', 'button');
      avatar.tabIndex = 0;
      const activate = () => (currentUser ? showMenu(avatar) : open('login'));
      avatar.addEventListener('click', e => { e.stopPropagation(); activate(); });
      avatar.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
    }
    call('me').then(r => {
      if (r && r.flags && window.SBSync && window.SBSync.setServerFlags) window.SBSync.setServerFlags(r.flags);      // the owner's sync switch (api/lib/flags.php)
      setUser(r.ok ? r.user : null);
    });
  }

  window.SpaceBookAuth = {
    open, close, openAccount, updateProfile, changePassword, exportData, deleteAccount,
    get user() { return currentUser; },
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
