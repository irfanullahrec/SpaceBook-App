/* SBBilling: the plans window, the Easypaisa payment window and "My plans" (js/sb_access.js decides when to open it; api/billing.php is the server).
 * The same file runs on the website and inside the Android app's web pages, so both show the same prices, the same words and the same account.
 *
 *   SBBilling.open({why, cls, subject})   choose a plan   (why: prep_q | plan_q | paper | chapter, only to say what was reached)
 *   SBBilling.checkout({plan, cls, subjects})   straight to the payment window (asks for sign-in first and comes back)
 *   SBBilling.openAccount()               my plans, payments and notices
 * The chosen plan, class and subjects are kept in localStorage 'sb_checkout' through registration and sign-in. A submitted payment is only
 * "Pending Verification": nothing is unlocked until an administrator approves it. */
(function () {
  'use strict';
  if (typeof document === 'undefined') return;
  const A = window.SBAccess;
  const KEY_PLANS = 'sb_plans_v1', KEY_INTENT = 'sb_checkout';
  let plans = null, modal = null, release = null, sel = { plan: '', cls: '', subjects: [] }, idem = '', busy = false, view = 'plans', whyInfo = null;
  let resumeAfterAuth = false;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rd = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const wr = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) { /* private mode */ } };
  const money = n => 'PKR ' + Number(n).toLocaleString('en-US');
  // who is signed in: the page's own account module, or what the Android app told the page (its sign-in is native; the page learns of it by this event)
  let authUser = null;
  document.addEventListener('spacebook:auth', e => { authUser = (e.detail && e.detail.user) || null; });
  const user = () => (window.SpaceBookAuth && window.SpaceBookAuth.user) || authUser;
  // the sign-in screen: the website's dialog, or the app's own screen when this page runs inside the Android app
  const inApp = () => !!(window.SBHost && typeof window.SBHost.onAction === 'function');
  function askAuth(tab) {
    if (inApp()) { try { window.SBHost.onAction('auth', ''); } catch (e) { /* the app screen did not open */ } return; }
    if (window.SpaceBookAuth) window.SpaceBookAuth.open(tab);
  }
  const fmtDate = iso => { if (!iso) return '—'; const d = new Date(iso); return isNaN(d) ? '—' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); };
  const fmtTime = iso => { if (!iso) return '—'; const d = new Date(iso); return isNaN(d) ? '—' : d.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); };
  const newKey = () => { const b = new Uint8Array(12); try { crypto.getRandomValues(b); } catch (e) { for (let i = 0; i < 12; i++) b[i] = Math.floor(Math.random() * 256); } return Array.prototype.map.call(b, x => ('0' + x.toString(16)).slice(-2)).join(''); };

  // -------- plans from the server (kept for offline)
  async function loadPlans() {
    if (plans) return plans;
    try {
      const r = await A.call('billing.php?action=plans', { headers: A.headers() }, 8000);
      if (r.json && r.json.ok) { plans = r.json; wr(KEY_PLANS, JSON.stringify(plans)); return plans; }
    } catch (e) { /* offline */ }
    try { plans = JSON.parse(rd(KEY_PLANS) || 'null'); } catch (e) { plans = null; }
    return plans;
  }
  const planById = id => (plans && plans.plans.find(p => p.id === id)) || null;
  const clsName = id => { const c = plans && plans.classes.find(x => x.id === id); return c ? c.name : id; };
  const subjName = id => { const s = plans && plans.subjects.find(x => x.id === id); return s ? clsName(s.class) + ' ' + s.name : id; };

  // -------- the window
  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'sbbModal'; modal.className = 'sbb-backdrop';
    modal.innerHTML = '<div class="sbb-card" role="dialog" aria-modal="true" aria-labelledby="sbbTitle" tabindex="-1"><button type="button" class="sbb-x" aria-label="Close">✕</button><div class="sbb-body"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    modal.querySelector('.sbb-x').addEventListener('click', () => close());
    modal.addEventListener('click', onClick);
    modal.addEventListener('input', onInput);
    modal.addEventListener('submit', onSubmit);
    return modal;
  }
  function show() {
    ensureModal(); modal.hidden = false; modal.classList.add('sbb-show');
    document.body.classList.add('sbb-lock');
    if (release) release();
    release = window.SBA11y && window.SBA11y.trap ? window.SBA11y.trap(modal, { onClose: () => close() }) : null;
  }
  // close(true): the window goes away for the sign-in screen and comes back (no "closed" event). Otherwise the person closed it: the app goes back a screen.
  function close(silent) {
    if (!modal) return;
    modal.classList.remove('sbb-show'); modal.hidden = true; document.body.classList.remove('sbb-lock');
    if (release) { release(); release = null; }
    busy = false;
    if (silent !== true) document.dispatchEvent(new CustomEvent('sbbilling:close'));
  }
  const body = () => modal.querySelector('.sbb-body');
  function paint(html) { body().innerHTML = html; const c = modal.querySelector('.sbb-card'); c.scrollTop = 0; const h = body().querySelector('h2'); if (h) h.id = 'sbbTitle'; }

  // -------- the three plans
  function whyText() {
    const w = whyInfo && whyInfo.why;
    const m = { prep_q: 'You have used your ' + 50 + ' free Test Preparation questions.', plan_q: 'You have used your 50 free Study Plan questions.', paper: 'Your free paper is used. Paper creation needs a plan.', chapter: 'Chapters 1 and 2 are free. The other chapters need a plan.' };
    return m[w] || '';
  }
  const PCOLOR = { student: 'blue', teacher: 'green', prep: 'purple' };
  const PIMG = { student: 'assets/ui/plan-student.png', teacher: 'assets/ui/plan-teacher.png', prep: 'assets/ui/plan-prep.png' };
  const tick = '<i class="sbp-ic sbp-ok" aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg></i>';
  const cross = '<i class="sbp-ic sbp-no" aria-hidden="true"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></i>';
  const homeIc = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#1d6fe8" aria-hidden="true"><path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>';
  const arrow = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const crumb = last => '<nav class="sbp-crumb" aria-label="Breadcrumb">' + homeIc + '<span>›</span><span>Home</span><span>›</span><b>' + esc(last) + '</b></nav>';
  const notIncl = x => (/not included|separately/i.test(x) ? x : x + ' (Not included)');
  function planCard(p) {
    const c = PCOLOR[p.id] || 'blue';
    return '<article class="sbb-plan sbp-' + c + '" data-plan="' + esc(p.id) + '"><div class="sbp-head"><div><h3>' + esc(p.title.replace(' module', '')) + '</h3>' +
      '<p class="sbb-price"><b>' + money(p.price) + '</b> / month</p></div><img src="' + (PIMG[p.id] || PIMG.student) + '" alt="" width="110" height="104"></div>' +
      '<p class="sbp-desc">' + esc(p.tagline) + '</p><div class="sbp-rule"></div>' +
      '<ul class="sbb-in">' + p.includes.map(x => '<li>' + tick + '<span>' + esc(x) + '</span></li>').join('') + '</ul>' +
      '<ul class="sbb-out">' + p.excludes.map(x => '<li>' + cross + '<span>' + esc(notIncl(x)) + '</span></li>').join('') + '</ul>' +
      '<button type="button" class="sbb-btn sbb-main sbp-btn-' + c + '" data-act="choose" data-plan="' + esc(p.id) + '">Choose Plan ' + arrow + '</button></article>';
  }
  function viewPlans() {
    view = 'plans';
    const w = whyText();
    const u = user();
    paint(crumb('Choose a Plan') + '<div class="sbp-title"><img class="sbp-title-ic" src="assets/ui/crown.png" alt="" width="60" height="60"><div><h2>Choose a Plan</h2><p>Get full access to SpaceBook and boost your learning journey.</p></div></div>' +
      (w ? '<p class="sbb-why" role="status">' + esc(w) + '</p>' : '') +
      '<div class="sbp-free"><img src="assets/ui/gift.png" alt="" width="46" height="55"><h3>First Chapter Free!</h3><i class="sbp-vr"></i><div><b>' + esc(plans.free.title) + '</b><ul>' + plans.free.items.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></div></div>' +
      '<div class="sbb-plans">' + plans.plans.map(planCard).join('') + '</div>' +
      '<div class="sbp-pay-strip"><img src="assets/ui/easypaisa.png" alt="easypaisa" width="140" height="49"><i class="sbp-vr"></i><div><b>Pay with Easypaisa.</b><span>Access starts after manual approval.</span></div>' +
      (u ? '<button type="button" class="sbb-link" data-act="account">My plans and payments</button>' : '<button type="button" class="sbb-link" data-act="signin">Already paid? Sign in</button>') + '</div>' +
      '<p class="sbp-key"><button type="button" class="sbb-btn" data-act="key">Enter licence key</button></p>');
  }

  // the owner's pass (js/sb_access.js): a line in "My plans" while it is on, with the way to switch it off
  const ownerNote = () => (A.ownerPass && A.ownerPass() ? '<p class="sbb-note" role="status">Owner access is on for this device. <button type="button" class="sbb-link" data-act="keyoff">Turn off</button></p>' : '');

  // -------- class / subjects
  function stepper(n) {
    const names = ['Plan', 'Coverage', 'Payment', 'Verification'];
    return '<ol class="sbp-steps">' + names.map((t, i) => '<li class="' + (i + 1 < n ? 'done' : i + 1 === n ? 'now' : '') + '"><i>' + (i + 1 < n ? '✓' : i + 1) + '</i><span>' + t + '</span></li>').join('') + '</ol>';
  }
  const subjIcons = { math: '#1d6fe8', science: '#12a05c', english: '#1d6fe8', urdu: '#12a05c', pashto: '#7a3fe0', arabic: '#f58220' };
  function viewPick() {
    view = 'pick';
    const p = planById(sel.plan);
    let pick = '';
    if (p.pick === 'class') {
      const subs = plans.subjects.filter(s => s.class === sel.cls);
      pick = '<section class="sbp-panel"><h3><i class="sbp-num">1</i> Select Class</h3><p>Choose the class for which you want to access content.</p><fieldset class="sbb-pick"><legend class="sr-only">Which class?</legend><div class="sbb-classes">' + plans.classes.map(c =>
        '<label class="sbb-chip"><input type="radio" name="cls" value="' + esc(c.id) + '"' + (sel.cls === c.id ? ' checked' : '') + '><span>' + esc(c.name.replace(/^Class\s*/i, '')) + '</span></label>').join('') + '</div></fieldset></section>' +
        '<section class="sbp-panel"><h3><i class="sbp-num">2</i> Subjects Included</h3><p>All subjects of the class you choose are included in the Student plan.</p><div class="sbp-subjects" id="sbpSubjects"></div></section>';
    } else if (p.pick === 'subjects') {
      const byClass = {};
      plans.subjects.forEach(s => { (byClass[s.class] = byClass[s.class] || []).push(s); });
      pick = '<section class="sbp-panel"><h3><i class="sbp-num">1</i> Select Subjects</h3><p>Choose up to ' + p.maxSubjects + ' subjects, from any classes.</p><fieldset class="sbb-pick">' +
        '<p class="sbb-count" aria-live="polite"></p><input type="search" class="sbb-find" placeholder="Search a subject" aria-label="Search a subject">' +
        plans.classes.map(c => '<details class="sbb-cls"' + (sel.subjects.some(id => (plans.subjects.find(s => s.id === id) || {}).class === c.id) || c.id === sel.cls ? ' open' : '') + '><summary>' + esc(c.name) + '</summary><div>' +
          (byClass[c.id] || []).map(s => '<label class="sbb-sub"><input type="checkbox" name="subjects" value="' + esc(s.id) + '"' + (sel.subjects.indexOf(s.id) >= 0 ? ' checked' : '') + '> <span>' + esc(s.name) + '</span></label>').join('') + '</div></details>').join('') + '</fieldset></section>';
    } else {
      pick = '<section class="sbp-panel"><h3><i class="sbp-num">1</i> Coverage</h3><p>The Test Preparation module covers all classes and subjects.</p></section>';
    }
    paint(crumb('Plan Coverage') + '<div class="sbp-title sbp-title-row"><div><h2>Choose Plan Coverage</h2><p>Select your class and the subjects you want to include in your SpaceBook plan.</p></div>' +
      '<div class="sbp-tip"><img src="assets/ui/gift.png" alt="" width="34" height="40"><span>Access digital textbooks, word meanings, MCQs, past papers, tests and more in your selected subjects and languages.</span></div></div>' +
      stepper(2) + '<div class="sbp-two"><div class="sbp-main-col">' + pick + '</div>' +
      '<aside class="sbp-panel sbp-cover"><h3>Your Plan Coverage</h3><p>Review your selected plan.</p><div class="sbb-summary" aria-live="polite"></div><div class="sbp-list" id="sbpCoverList"></div>' +
      '<div class="sbp-incl"><b>What\'s included?</b><ul>' + p.includes.map(x => '<li>' + tick + '<span>' + esc(x) + '</span></li>').join('') + '</ul></div>' +
      '<div class="sbp-total"><span>Plan total</span><b>' + money(p.price) + '</b></div>' +
      '<button type="button" class="sbb-btn sbb-main sbp-btn-green" data-act="continue">Continue to Payment ' + arrow + '</button>' +
      '<button type="button" class="sbb-btn sbp-back" data-act="plans">← Back to plans</button></aside></div>');
    refreshPick();
  }
  function selectionOk() {
    const p = planById(sel.plan); if (!p) return false;
    if (p.pick === 'class') return !!plans.classes.find(c => c.id === sel.cls);
    if (p.pick === 'subjects') return sel.subjects.length >= 1 && sel.subjects.length <= p.maxSubjects;
    return true;
  }
  function selectionText() {
    const p = planById(sel.plan);
    if (p.pick === 'class') return sel.cls ? p.title + ' · ' + clsName(sel.cls) : 'Choose your class';
    if (p.pick === 'subjects') return sel.subjects.length ? sel.subjects.length + ' of ' + p.maxSubjects + ' subjects chosen' : 'Choose at least one subject';
    return p.title;
  }
  function refreshPick() {
    const p = planById(sel.plan); if (!p || !modal) return;
    const sum = body().querySelector('.sbb-summary'); if (sum) sum.textContent = selectionText();
    const cnt = body().querySelector('.sbb-count'); if (cnt) cnt.textContent = sel.subjects.length + ' of ' + p.maxSubjects + ' chosen';
    if (p.pick === 'subjects') body().querySelectorAll('input[name="subjects"]').forEach(i => { i.disabled = !i.checked && sel.subjects.length >= p.maxSubjects; });
    const list = body().querySelector('#sbpCoverList');
    if (list) {
      let names = [];
      if (p.pick === 'class') names = plans.subjects.filter(s => s.class === sel.cls).map(s => s.name);
      else if (p.pick === 'subjects') names = sel.subjects.map(id => subjName(id));
      list.innerHTML = names.length ? '<b class="sbp-list-h">' + (p.pick === 'class' ? 'Subjects (' + names.length + ')' : 'Selected subjects (' + names.length + ')') + '</b>' + names.map(n => '<span class="sbp-chip-line">' + esc(n) + '</span>').join('') : '';
    }
    const box = body().querySelector('#sbpSubjects');
    if (box) box.innerHTML = plans.subjects.filter(s => s.class === sel.cls).map(s => '<div class="sbp-subj">' + tick + '<span>' + esc(s.name) + '</span></div>').join('') || '<p class="sbb-note">Choose a class to see its subjects.</p>';
    const go = body().querySelector('[data-act="continue"]'); if (go) go.disabled = !selectionOk();
  }

  // -------- payment
  function saveIntent() { wr(KEY_INTENT, JSON.stringify({ plan: sel.plan, cls: sel.cls, subjects: sel.subjects, at: Date.now() })); }
  function readIntent() { try { const v = JSON.parse(rd(KEY_INTENT) || 'null'); return v && v.plan && Date.now() - v.at < 7 * 864e5 ? v : null; } catch (e) { return null; } }
  function toPayment() {
    if (!selectionOk()) return;
    saveIntent();
    if (!user()) {                                   // the account comes first; the choice is kept and the payment window opens after sign-in
      resumeAfterAuth = true; close(true);
      askAuth('register');
      return;
    }
    viewPay();
  }
  function copyBtn(text, label) { return '<button type="button" class="sbb-copy" data-act="copy" data-text="' + esc(text) + '" aria-label="Copy ' + esc(label) + '">Copy</button>'; }
  function viewPay(err) {
    view = 'pay';
    const p = planById(sel.plan); const pay = plans.payment;
    if (!idem) idem = newKey();
    const where = p.pick === 'class' ? 'All subjects of ' + esc(clsName(sel.cls)) : p.pick === 'subjects' ? sel.subjects.map(id => esc(subjName(id))).join(', ') : 'All classes and subjects';
    const today = new Date().toISOString().slice(0, 10);
    const copyRow = (label, val, icon) => '<div class="sbp-copyrow"><span class="sbp-ci">' + icon + '</span><label>' + label + '</label><b class="sbb-num">' + esc(val) + '</b>' + copyBtn(val, label) + '</div>';
    const phone = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1d6fe8" stroke-width="2"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>';
    const person = '<svg viewBox="0 0 24 24" width="20" height="20" fill="#1d6fe8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6z"/></svg>';
    const how = [['Open your Easypaisa app', 'Launch the Easypaisa mobile app on your phone.'], ['Send Money', 'Send ' + money(p.price) + ' to the Easypaisa number shown.'], ['Check Account Title', 'Make sure the account title is “' + esc(pay.title) + '”.'], ['Save Transaction ID', 'After payment, note the Transaction ID (Trx ID).'], ['Submit for Verification', 'Enter the Transaction ID below and click submit.']];
    paint('<button type="button" class="sbp-backlink" data-act="pick"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Back to Plans</button>' +
      '<div class="sbp-title"><span class="sbp-wallet" aria-hidden="true"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#fff" stroke-width="1.8"><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 15h2"/></svg></span><div><h2>Easypaisa Payment</h2><p>Complete your payment to activate your SpaceBook plan.</p></div></div>' +
      '<div class="sbp-two sbp-two-pay"><div class="sbp-main-col">' +
      '<section class="sbp-panel"><div class="sbp-row"><h3>Selected Plan</h3><button type="button" class="sbb-link" data-act="pick">Change Plan</button></div>' +
      '<div class="sbp-sel"><img src="' + (PIMG[p.id] || PIMG.student) + '" alt="" width="70" height="66"><div><b>' + esc(p.title.replace(' module', '')) + (sel.cls ? ' · ' + esc(clsName(sel.cls)) : '') + '</b><small>' + where + '</small></div><div class="sbp-amt"><b>' + money(p.price) + '</b><small>' + esc(p.duration) + '</small></div></div></section>' +
      '<section class="sbp-panel sbp-eppanel"><div class="sbp-eph"><img src="assets/ui/easypaisa.png" alt="easypaisa" width="120" height="42"><div><b>Pay with Easypaisa</b><span>Follow the steps below to make your payment</span></div></div>' +
      '<h3><i class="sbp-num">1</i> Send Payment to This Easypaisa Account</h3>' +
      copyRow('Easypaisa Number', pay.number, phone) + copyRow('Account Title', pay.title, person) +
      '<div class="sbp-info"><i>i</i><p>Send the <b>exact amount (' + money(p.price) + ')</b> to the above Easypaisa number.<br>Make sure the account title is “' + esc(pay.title) + '” before sending.</p></div>' +
      '<h3><i class="sbp-num">2</i> Enter Payment Details</h3>' +
      '<form class="sbb-form" novalidate><div class="sbp-fields"><label>Transaction ID (Trx ID) <em>*</em><input name="trx" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="30" required placeholder="e.g. 1234567890"><small>You can find the Transaction ID in your Easypaisa payment receipt.</small></label>' +
      '<label>Payment Date <small>(Optional)</small><input name="paid_on" type="date" max="' + today + '" value="' + today + '"></label></div>' +
      '<p class="sbb-err" role="alert" aria-live="assertive">' + esc(err || '') + '</p>' +
      '<button type="submit" class="sbb-btn sbb-main sbb-submit sbp-btn-green"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M21 3L3 10l7 3 3 7z"/><path d="M10 13l11-10"/></svg>Submit Payment for Verification</button></form></section></div>' +
      '<aside class="sbp-side"><section class="sbp-panel sbp-how"><h3><span class="sbp-phone">' + phone.replace('#1d6fe8', '#fff') + '</span>How to Pay with Easypaisa</h3><ol>' + how.map((h, i) => '<li><i>' + (i + 1) + '</i><div><b>' + h[0] + '</b><small>' + h[1] + '</small></div></li>').join('') + '</ol></section>' +
      '<section class="sbp-panel sbp-manual"><h3><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#f58220" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Manual Verification</h3><p>Your payment will be verified by our team, usually within a few minutes to a few hours during working days. You will receive a notification once your plan is activated.</p></section>' +
      '<section class="sbp-panel sbp-secure"><h3><svg viewBox="0 0 24 24" width="28" height="28" fill="#12a05c"><path d="M12 2l8 3v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V5z"/><path d="M8 12l3 3 5-6" stroke="#fff" stroke-width="2" fill="none"/></svg>Secure &amp; Safe</h3><ul><li>' + tick + 'Your payment information is safe with us.</li><li>' + tick + 'We only verify your transaction ID.</li><li>' + tick + 'For any issues, contact our support team.</li></ul></section></aside></div>');
    const t = body().querySelector('input[name="trx"]'); if (t) t.focus();
  }
  async function submitPayment(form) {
    if (busy) return; // a double tap sends once
    const trx = (form.elements.trx.value || '').trim();
    const err = form.querySelector('.sbb-err');
    if (!trx) { err.textContent = 'Please enter your Transaction ID (Trx ID).'; form.elements.trx.focus(); return; }
    if (!/^[A-Za-z0-9]{6,30}$/.test(trx)) { err.textContent = 'The Transaction ID has 6 to 30 letters and numbers. Copy it exactly from your Easypaisa receipt.'; form.elements.trx.focus(); return; }
    busy = true; err.textContent = '';
    const btn = form.querySelector('.sbb-submit'); btn.disabled = true; btn.textContent = 'Sending…';
    let r;
    try {
      r = await A.call('billing.php?action=submit_payment', { method: 'POST', headers: A.headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ plan: sel.plan, cls: sel.cls || null, subjects: sel.subjects, trx: trx, paid_on: form.elements.paid_on.value || '', idem: idem }) }, 15000);
    } catch (e) { r = null; }
    busy = false;
    if (!r || !r.json) { btn.disabled = false; btn.textContent = 'Submit Payment for Verification'; err.textContent = 'We could not reach SpaceBook. Check your internet and press the button again — it will not be sent twice.'; return; }
    if (!r.json.ok) {
      btn.disabled = false; btn.textContent = 'Submit Payment for Verification';
      if (r.json.needSignIn) { err.textContent = 'Please sign in again.'; saveIntent(); resumeAfterAuth = true; close(true); askAuth('login'); return; }
      err.textContent = r.json.error || 'Something went wrong.'; return;
    }
    wr(KEY_INTENT, null); idem = '';
    A.load();
    viewDone(r.json);
  }
  function viewDone(j) {
    view = 'done';
    paint('<div class="sbb-done"><div class="sbb-done-icon" aria-hidden="true">🎉</div><h2>Payment submitted</h2><p class="sbb-thanks" role="status">' + esc(j.message) + '</p>' +
      '<p><span class="sbb-badge sbb-b-pending">Pending Verification</span> <small>Reference ' + esc(j.payment.ref) + '</small></p></div>' +
      '<div class="sbb-actions"><button type="button" class="sbb-btn sbb-main" data-act="account">See my payments</button><button type="button" class="sbb-btn" data-act="close">Close</button></div>');
  }

  // -------- my plans
  const statusText = { active: 'Active', expired: 'Expired', suspended: 'Suspended' };
  const clock = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  function subCard(s) {
    const what = s.planType === 'student' ? 'All subjects of ' + esc(clsName(s.classId)) + ' + Study Plan' : s.planType === 'teacher' ? s.subjects.map(x => esc(x.name)).join(', ') : 'Test Preparation · all classes';
    const live = s.status === 'active';
    return '<section class="sbp-panel sbp-active sbp-s-' + esc(s.status) + '"><span class="sbp-pill sbp-pill-' + esc(s.status) + '">' + (live ? '✓ ' : '') + statusText[s.status] + ' Plan</span>' +
      '<div class="sbp-active-body"><div><h3>' + esc(s.label) + '</h3><p>' + what + '</p></div>' +
      '<div class="sbp-renew"><svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="#12a05c" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg><div><small>' + (live ? 'Renews on' : 'Ended on') + '</small><b>' + fmtDate(s.expiresAt) + '</b>' + (live ? '<small>' + s.daysLeft + ' days remaining</small>' : '') + '</div></div></div>' +
      (s.status === 'suspended' ? '<p class="sbb-err">Suspended' + (s.suspendReason ? ': ' + esc(s.suspendReason) : '') + '. Contact us on WhatsApp if this is a mistake.</p>' : '') +
      (s.status !== 'suspended' ? '<button type="button" class="sbb-btn sbp-outline" data-act="renew" data-id="' + s.id + '">' + (live ? 'Renew early · ' : 'Renew · ') + 'PKR 500</button>' : '') + '</section>';
  }
  function payRow(p, i) {
    const cls = p.status === 'pending' ? 'pending' : p.status === 'approved' ? 'active' : 'suspended';
    const icon = p.status === 'pending' ? '<i class="sbp-st sbp-st-pending">' + clock + '</i>' : p.status === 'approved' ? '<i class="sbp-st sbp-st-ok">✓</i>' : '<i class="sbp-st sbp-st-no">✕</i>';
    return '<tr class="sbp-prow' + (i === 0 ? ' sel' : '') + '" data-pay="' + i + '"><td>' + fmtDate(p.submittedAt) + '</td><td><b>' + esc(p.label) + '</b><small>Monthly Plan (1 Month)</small></td><td><b>' + money(p.amount) + '</b></td>' +
      '<td class="sbp-' + cls + '">' + icon + esc(p.statusText) + '</td><td><button type="button" class="sbb-btn sbp-sm" data-act="paydetail" data-i="' + i + '">' + (p.status === 'approved' ? 'View Invoice' : 'View Details') + '</button></td></tr>';
  }
  function payDetail(p) {
    if (!p) return '<p class="sbb-note">No payments yet.</p>';
    const msg = p.status === 'pending' ? '<div class="sbp-review"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#f58220" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><div><b>Your payment is under review</b><p>We have received your payment of ' + money(p.amount) + ' for ' + esc(p.label) + '. Our team is verifying the payment. You will be notified once it is confirmed.</p></div></div>'
      : p.status === 'rejected' ? '<p class="sbb-err">Not approved' + (p.reviewNote ? ': ' + esc(p.reviewNote) : '') + '</p>' : '<p class="sbb-small">Plan period: ' + fmtDate(p.activatedAt) + ' → ' + fmtDate(p.expiresAt) + '</p>';
    return msg + '<dl class="sbp-dl"><dt>Date</dt><dd>' + fmtTime(p.submittedAt) + '</dd><dt>Plan</dt><dd><b>' + esc(p.label) + '</b></dd><dt>Amount</dt><dd><b>' + money(p.amount) + '</b></dd><dt>Payment Method</dt><dd>Easypaisa</dd><dt>Transaction ID</dt><dd>' + esc(p.trxId) + '</dd><dt>Reference</dt><dd>' + esc(p.ref) + '</dd><dt>Status</dt><dd class="sbp-' + (p.status === 'pending' ? 'pending' : p.status === 'approved' ? 'active' : 'suspended') + '"><b>' + esc(p.statusText) + '</b></dd></dl>';
  }
  async function viewAccount() {
    view = 'account';
    const head = crumb('My Plans & Payments') + '<div class="sbp-title"><div><h2>My Plans &amp; Payments</h2><p>Manage your subscription, view payment history, and explore plans.</p></div></div>' + ownerNote();
    if (!user()) { paint(head + '<section class="sbp-panel"><p>Sign in to see your plans and payments.</p><div class="sbb-actions"><button type="button" class="sbb-btn sbb-main" data-act="signin">Sign in</button><button type="button" class="sbb-btn" data-act="plans">See plans</button></div></section>'); return; }
    paint(head + '<p class="sbb-note">Loading…</p>');
    let r = null;
    try { r = await A.call('billing.php?action=account', { headers: A.headers() }, 10000); } catch (e) { r = null; }
    if (view !== 'account') return;
    if (!r || !r.json || !r.json.ok) { paint(head + '<p class="sbb-err">' + (r && r.json && r.json.needSignIn ? 'Please sign in again.' : 'We could not load your plans. Check your internet.') + '</p><div class="sbb-actions"><button type="button" class="sbb-btn" data-act="plans">See plans</button></div>'); return; }
    const j = r.json;
    window.__sbbAccount = j;
    const manage = plans ? plans.plans.map((p, i) => '<label class="sbp-opt"><input type="radio" name="mgplan" value="' + esc(p.id) + '"' + (i === 0 ? ' checked' : '') + '><img src="' + (PIMG[p.id] || PIMG.student) + '" alt="" width="40" height="38"><span><b>' + esc(p.title.replace(' module', '')) + '</b><small>' + esc(p.tagline) + '</small></span><em><b>' + money(p.price) + '</b><small>per month</small></em></label>').join('') : '';
    paint(head +
      (j.reminders.length ? '<div class="sbb-remind">' + j.reminders.map(x => '<p>⏰ ' + esc(x.text) + '</p>').join('') + '</div>' : '') +
      '<div class="sbp-two sbp-two-acct"><div class="sbp-main-col">' + (j.subscriptions.length ? j.subscriptions.map(subCard).join('') : '<section class="sbp-panel"><p class="sbb-note">You do not have a plan yet. Chapters 1 and 2 of every subject are free.</p></section>') + '</div>' +
      '<aside class="sbp-panel sbp-manage"><div class="sbp-mh"><img src="assets/ui/crown.png" alt="" width="40" height="40"><div><h3>Manage Plans</h3><small>Choose the plan that\'s right for you.</small></div></div>' + manage +
      '<button type="button" class="sbb-btn sbb-main sbp-btn-green" data-act="plans">Change or Upgrade Plan</button></aside></div>' +
      '<div class="sbp-two sbp-two-hist"><section class="sbp-panel"><div class="sbp-row"><h3>Payment History</h3></div><p class="sbp-sub">View all your payments and their status.</p>' +
      (j.payments.length ? '<table class="sbp-table"><thead><tr><th>Date</th><th>Plan / Description</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead><tbody>' + j.payments.map(payRow).join('') + '</tbody></table>' : '<p class="sbb-note">No payments yet.</p>') + '</section>' +
      '<aside class="sbp-panel sbp-detail"><div class="sbp-row"><h3>Payment Details</h3>' + (j.payments[0] ? '<span class="sbb-badge sbb-b-' + (j.payments[0].status === 'pending' ? 'pending' : j.payments[0].status === 'approved' ? 'active' : 'suspended') + '" id="sbpDetailBadge">' + esc(j.payments[0].statusText) + '</span>' : '') + '</div><div id="sbpDetail">' + payDetail(j.payments[0]) + '</div></aside></div>' +
      '<section class="sbp-panel"><h3 class="sbb-h">Messages ' + (j.unread ? '<span class="sbb-badge sbb-b-pending">' + j.unread + ' new</span>' : '') + '</h3>' +
      (j.notifications.length ? j.notifications.map(n => '<article class="sbb-note-row' + (n.read ? '' : ' sbb-unread') + '"><b>' + esc(n.title) + '</b><p>' + esc(n.body) + '</p><small>' + fmtTime(n.at) + '</small></article>').join('') : '<p class="sbb-note">Nothing yet.</p>') + '</section>');
    if (j.unread) A.call('billing.php?action=read_notes', { method: 'POST', headers: A.headers({ 'Content-Type': 'application/json' }), body: '{}' }, 5000).catch(() => {});
  }

  // -------- events
  function onClick(e) {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const a = b.dataset.act;
    if (a === 'choose') { sel = { plan: b.dataset.plan, cls: sel.cls && planById(b.dataset.plan).pick === 'class' ? sel.cls : (whyInfo && whyInfo.cls) || '', subjects: whyInfo && whyInfo.subject && planById(b.dataset.plan).pick === 'subjects' ? [whyInfo.subject] : [] }; idem = ''; planById(sel.plan).pick === 'none' ? toPayment() : viewPick(); }
    else if (a === 'paydetail') { const j = window.__sbbAccount; const p = j && j.payments[Number(b.dataset.i)]; const d = body().querySelector('#sbpDetail'); if (d && p) { d.innerHTML = payDetail(p); body().querySelectorAll('.sbp-prow').forEach(r => r.classList.toggle('sel', r.dataset.pay === b.dataset.i)); } }
    else if (a === 'plans') viewPlans();
    else if (a === 'pick') planById(sel.plan).pick === 'none' ? viewPlans() : viewPick();
    else if (a === 'continue') toPayment();
    else if (a === 'account') viewAccount();
    else if (a === 'key') { if (A.keyDialog) A.keyDialog(() => { if (view === 'account') viewAccount(); else close(); }); }
    else if (a === 'keyoff') { if (A.lockOwnerPass) A.lockOwnerPass(); viewAccount(); }
    else if (a === 'close') close();
    else if (a === 'signin') { resumeAfterAuth = false; close(true); askAuth('login'); }
    else if (a === 'renew') {
      const s = ((window.__sbbAccount || {}).subscriptions || []).find(x => String(x.id) === b.dataset.id); if (!s) return;
      sel = { plan: s.planType, cls: s.classId || '', subjects: s.subjects.map(x => x.id) }; idem = ''; saveIntent(); viewPay();
    }
    else if (a === 'copy') {
      const t = b.dataset.text;
      const done = () => { b.textContent = 'Copied ✓'; setTimeout(() => { b.textContent = 'Copy'; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, () => fallbackCopy(t, done));
      else fallbackCopy(t, done);
    }
  }
  function fallbackCopy(t, done) {
    const ta = document.createElement('textarea'); ta.value = t; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* the number is on screen to copy by hand */ }
    ta.remove();
  }
  function onInput(e) {
    const t = e.target;
    if (t.name === 'cls') { sel.cls = t.value; refreshPick(); }
    else if (t.name === 'subjects') {
      const p = planById(sel.plan);
      if (t.checked && sel.subjects.length >= p.maxSubjects) { t.checked = false; return; }
      sel.subjects = Array.from(body().querySelectorAll('input[name="subjects"]:checked')).map(i => i.value);
      refreshPick();
    } else if (t.classList.contains('sbb-find')) {
      const q = t.value.trim().toLowerCase();
      body().querySelectorAll('.sbb-cls').forEach(d => {
        let any = false;
        d.querySelectorAll('.sbb-sub').forEach(l => { const hit = !q || l.textContent.toLowerCase().indexOf(q) >= 0 || d.querySelector('summary').textContent.toLowerCase().indexOf(q) >= 0; l.hidden = !hit; if (hit) any = true; });
        d.hidden = !any; if (q && any) d.open = true;
      });
    }
  }
  function onSubmit(e) { if (e.target.classList.contains('sbb-form')) { e.preventDefault(); submitPayment(e.target); } }

  // -------- public
  async function open(o) {
    whyInfo = o || null;
    show(); paint('<h2>Plans</h2><p class="sbb-note">Loading…</p>');
    if (!(await loadPlans())) { paint('<h2>Plans</h2><p class="sbb-err">We could not load the plans. Check your internet and try again.</p><div class="sbb-actions"><button type="button" class="sbb-btn" data-act="close">Close</button></div>'); return; }
    viewPlans();
  }
  async function checkout(c) {
    whyInfo = null; show(); paint('<h2>Payment</h2><p class="sbb-note">Loading…</p>');
    if (!(await loadPlans())) { close(); return; }
    sel = { plan: c.plan, cls: c.cls || '', subjects: c.subjects || [] };
    if (!planById(sel.plan) || !selectionOk()) { viewPlans(); return; }
    idem = ''; saveIntent();
    if (!user()) { resumeAfterAuth = true; close(true); askAuth('register'); return; }
    viewPay();
  }
  async function openAccount() { whyInfo = null; show(); await loadPlans(); viewAccount(); }

  // back from sign-in or registration with the choice kept: straight to the payment window
  document.addEventListener('spacebook:auth', async ev => {
    const u = ev.detail && ev.detail.user;
    if (!u || !resumeAfterAuth) return;
    resumeAfterAuth = false;
    const it = readIntent(); if (!it) return;
    if (!(await loadPlans())) return;
    sel = { plan: it.plan, cls: it.cls || '', subjects: it.subjects || [] };
    if (!planById(sel.plan) || !selectionOk()) return;
    idem = ''; show(); viewPay();
  });

  window.SBBilling = { open, checkout, openAccount, close };
})();
