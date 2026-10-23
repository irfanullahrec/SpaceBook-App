/* sb_games.js - the Games page: pick a class, pick a game, play it level by level, earn coins.
 *   Games hub  -> level map (10 levels, locked / open / cleared, 1-3 stars) -> level intro -> the game -> results.
 * What the games are made of: js/sb_games_content.js. Pictures and picture words: js/games_vocab.js. Look: css/sb_games.css.
 *
 * Coins are NOT decided here. Every question answered right (without help) is one step of the level's activity:
 *   SBRewards.step(key, title, total, i)  ->  +1 coin the first time that step is done, +5 when all steps of the level are done,
 * and SBRewards.again(key) pays +2 once a day for playing a finished level again (rules: js/sb_rewards.js, api/lib/rewards.php).
 * Level progress is read back from the same records (so it follows the account to every device and, as a guest, stays on this
 * device): a level is CLEARED when 60 % of its steps have been done, or when one run reached 60 % (kept in localStorage).
 *
 * Public: window.renderGames() (called by the Games tab of the header), window.SBGames.open(gameId, classNumber). */
(function () {
  'use strict';
  const C = window.SBGamesContent;
  if (!C) return;
  const esc = C.esc;
  const BANK_SRC = 'js/test_prep_bank.js?v=20261018_tp1';      // the same URL as js/test_prep.js, so the browser keeps one copy
  const PASS = C.PASS;
  const LIVES = 3;

  // ---------- small helpers ----------
  const host = () => document.getElementById('dashboard-body');
  const R = () => window.SBRewards || null;
  const todayStr = d => { const x = d || new Date(); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
  const reduceMotion = () => { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
  const stars = n => '★'.repeat(n) + '☆'.repeat(3 - n);

  // ---------- preferences (this device only: class, scope, sound, best runs, streak) ----------
  const PK = 'sb_games_v1';
  let prefsCache = null, prefsKey = null;
  function uid() { try { const u = window.SpaceBookAuth && window.SpaceBookAuth.user; return (u && (u.id || u.email)) ? String(u.id || u.email).toLowerCase() : 'guest'; } catch (e) { return 'guest'; } }
  function prefs() {
    const k = PK + ':' + uid();
    if (prefsCache && prefsKey === k) return prefsCache;
    let d = null; try { d = JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { d = null; }
    prefsCache = Object.assign({cls: null, scope: {}, sound: true, tr: {}, best: {}, streak: {n: 0, last: ''}, last: null}, d || {});
    prefsKey = k;
    return prefsCache;
  }
  function savePrefs() {
    try { localStorage.setItem(prefsKey || (PK + ':' + uid()), JSON.stringify(prefs())); } catch (e) { /* storage blocked: the game still works */ }
    mirrorPrefs();
  }
  // The class and scope the student chose, the streak and the best run of every level follow the account to the other devices
  // (user items "pref/games" and "gbest", js/core/items.js; best runs only ever go up, like the server's rule).
  let mirrored = '';
  function mirrorPrefs() {
    const I = window.SBItems;
    if (!I || !I.userId()) return;
    const p = prefs();
    Object.keys(p.best || {}).forEach(k => {
      const cur = I.get('gbest', k);
      if (!cur || p.best[k] > cur.b) I.put('gbest', k, {b: Math.min(1, p.best[k])});
    });
    const v = {};
    if (p.cls) v.cls = +p.cls;
    if (p.scope && Object.keys(p.scope).length && Object.keys(p.scope).length <= 80) v.scope = p.scope;
    if (p.streak && p.streak.last) v.streak = {n: p.streak.n, last: p.streak.last};
    const sig = JSON.stringify(v);
    if (sig !== mirrored && Object.keys(v).length) { mirrored = sig; I.put('pref', 'games', v); }
  }
  if (window.SBItems) {
    window.SBItems.on('change', e => {
      if (e.origin !== 'remote' || !e.value) return;
      const p = prefs();
      if (e.kind === 'gbest') { if (e.value.b > (p.best[e.key] || 0)) { p.best[e.key] = e.value.b; savePrefsLocal(); } }
      else if (e.kind === 'pref' && e.key === 'games') {
        if (e.value.cls) p.cls = e.value.cls;
        if (e.value.scope) Object.assign(p.scope, e.value.scope);
        if (e.value.streak && (e.value.streak.last || '') > (p.streak.last || '')) p.streak = e.value.streak;
        mirrored = JSON.stringify(e.value);
        savePrefsLocal();
      }
    });
    document.addEventListener('spacebook:auth', () => setTimeout(mirrorPrefs, 400));
  }
  function savePrefsLocal() { try { localStorage.setItem(prefsKey || (PK + ':' + uid()), JSON.stringify(prefs())); } catch (e) { /* storage blocked */ } }
  function touchStreak() {
    const p = prefs(), t = todayStr();
    if (p.streak.last === t) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    p.streak = {n: p.streak.last === todayStr(y) ? p.streak.n + 1 : 1, last: t};
    savePrefs();
  }

  // ---------- the textbook questions (loaded once, only when the page is opened) ----------
  const S = {cls: 1, view: 'hub', game: null, bank: null, bankState: 'idle', run: null, ov: null};
  function ensureBank() {
    if (window.SB_MCQ_BANK) { S.bank = window.SB_MCQ_BANK; S.bankState = 'ok'; return; }
    if (S.bankState === 'loading') return;
    S.bankState = 'loading';
    const s = document.createElement('script');
    s.src = BANK_SRC; s.async = true;
    s.onload = () => { S.bank = window.SB_MCQ_BANK || null; S.bankState = S.bank ? 'ok' : 'error'; if (onPage() && !S.ov) paint(); };
    s.onerror = () => { S.bankState = 'error'; if (onPage() && !S.ov) paint(); };
    document.head.appendChild(s);
  }

  // ---------- progress ----------
  const ctxOf = (cls, scope) => ({cls, scope, bank: S.bank});
  function scopesOf(game, cls) { return C.scopesFor(game, ctxOf(cls || S.cls, 'all')); }
  function scopeFor(game, scopes) {
    const want = prefs().scope[S.cls + '|' + game];
    return scopes.some(s => s.id === want) ? want : (scopes[0] && scopes[0].id);
  }
  function levelProgress(game, scope, lv) {
    const key = C.levelKey(game, S.cls, scope, lv.level, lv.total);
    const rw = R(), a = rw && rw.get ? rw.get(key) : null;
    const done = a ? Math.min(lv.total, (a.done || []).length) : 0;
    const best = prefs().best[key] || 0;
    const pct = Math.max(done / lv.total, best);
    const cleared = pct >= PASS - 1e-9;
    return {key, total: lv.total, done, best, pct, cleared, stars: pct >= 0.999 ? 3 : pct >= 0.8 ? 2 : cleared ? 1 : 0, completed: !!(a && a.times > 0)};
  }
  function whyNot(game) {
    if (game === 'learn') return 'Little Learners is for Classes 1 to 3.';
    if (!C.GAMES[game].bank) return 'Not available for this class yet.';
    if (S.bankState === 'error') return 'The textbook questions could not be loaded. Check your connection and open this page again.';
    if (!S.bank) return 'Loading the textbook questions…';
    return 'Not enough textbook questions for this class yet.';
  }
  function summary(game) {
    const scopes = scopesOf(game);
    if (!scopes.length) return {ok: false, why: whyNot(game), loading: C.GAMES[game].bank && S.bankState === 'loading'};
    const scope = scopeFor(game, scopes), plan = C.planFor(game, ctxOf(S.cls, scope));
    if (!plan.levels) return {ok: false, why: plan.why};
    let cleared = 0, st = 0, next = null;
    plan.levels.forEach((lv, i) => {
      const p = levelProgress(game, scope, lv);
      if (p.cleared) cleared++;
      st += p.stars;
      if (!next && !p.cleared) next = lv.level;
    });
    return {ok: true, scope, scopes, plan, cleared, stars: st, levels: plan.levels.length, next};
  }

  // ---------- page ----------
  const onPage = () => { try { return state.page === 'games'; } catch (e) { return false; } };
  function classFromApp() { try { const m = /^cls(\d+)$/.exec(state.selectedClass || ''); return m && +m[1] >= 1 && +m[1] <= 12 ? +m[1] : null; } catch (e) { return null; } }
  function renderGames() {
    try {
      state.page = 'games'; state.activeView = 'games';
      setActiveNav('games');
      setDashHeader('🎮 Games', 'Play, learn and earn coins — level by level');
      setBreadcrumb([{label: 'Home', onclick: () => { setActiveNav('home'); renderHome(); }}, {label: 'Games', active: true, onclick: () => { S.view = 'hub'; paint(); }}]);
    } catch (e) { /* app helpers missing: the page still draws */ }
    addCss();
    S.cls = prefs().cls || classFromApp() || 1;
    S.view = 'hub'; S.game = null;
    ensureBank();
    paint();
    window.scrollTo(0, 0);
    try { const t = document.querySelector('.nav-tab.active[data-page="games"]'); if (t && t.scrollIntoView) t.scrollIntoView({block: 'nearest', inline: 'nearest'}); } catch (e) { /* no header */ }
  }
  function paint() {
    const h = host(); if (!h) return;
    h.innerHTML = S.view === 'map' ? mapHtml() : hubHtml();
    h.querySelector('.gm-root').addEventListener('click', onClick);
    const sel = h.querySelector('.gm-scope'); if (sel) sel.addEventListener('change', () => { prefs().scope[S.cls + '|' + S.game] = sel.value; savePrefs(); paint(); });
  }

  function hubHtml() {
    const p = prefs();
    let cleared = 0, levels = 0, st = 0, cont = null;
    const cards = C.ORDER.map(g => {
      const G = C.GAMES[g], sm = summary(g);
      if (sm.ok) { cleared += sm.cleared; levels += sm.levels; st += sm.stars; if (!cont && p.last && p.last.game === g && p.last.cls === S.cls && sm.next) cont = {game: g, level: sm.next, scope: sm.scope}; }
      const body = sm.ok
        ? '<div class="gm-meter" aria-hidden="true"><i style="width:' + Math.round(100 * sm.cleared / sm.levels) + '%"></i></div>' +
          '<div class="gm-cardstats"><span>' + sm.cleared + ' / ' + sm.levels + ' levels</span><span class="gm-stars" aria-label="' + sm.stars + ' stars">★ ' + sm.stars + '</span></div>' +
          '<button type="button" class="gm-play" data-act="play" data-game="' + g + '">' + (sm.cleared ? (sm.next ? 'Continue' : 'Play again') : 'Play') + ' ▶</button>'
        : '<p class="gm-why">' + esc(sm.why) + '</p>' + (sm.loading ? '<div class="gm-meter gm-load"><i></i></div>' : '');
      return '<article class="gm-card' + (sm.ok ? '' : ' is-off') + '" style="--gc:' + G.color + '"><div class="gm-cardhead"><span class="gm-ico" aria-hidden="true">' + G.emoji + '</span><h3>' + esc(G.title) + '</h3></div><p class="gm-blurb">' + esc(G.blurb) + '</p>' + body + '</article>';
    }).join('');
    if (!cont && p.last && p.last.cls === S.cls) { const sm = summary(p.last.game); if (sm.ok && sm.next) cont = {game: p.last.game, level: sm.next, scope: sm.scope}; }
    const pills = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => '<button type="button" class="gm-pill' + (n === S.cls ? ' on' : '') + '" data-act="cls" data-cls="' + n + '" aria-pressed="' + (n === S.cls) + '">' + n + '</button>').join('');
    return '<div class="gm-root" data-view="hub">' +
      '<section class="gm-hero"><div class="gm-hero-txt"><h2>Play · Learn · Earn</h2><p>Every right answer is a step. Finish steps to earn 🪙, clear a level to open the next one.</p>' +
      (cont ? '<button type="button" class="gm-cont" data-act="cont" data-game="' + cont.game + '" data-level="' + cont.level + '">▶ Continue · ' + esc(C.GAMES[cont.game].title) + ' · Level ' + cont.level + '</button>' : '') +
      '</div><div class="gm-stats"><div><b>🔥 ' + p.streak.n + '</b><small>day streak</small></div><div><b>🏅 ' + cleared + '/' + levels + '</b><small>levels cleared</small></div><div><b>⭐ ' + st + '</b><small>stars</small></div></div></section>' +
      '<div class="gm-pick"><span class="gm-lbl" id="gm-cls-lbl">My class</span><div class="gm-pills" role="group" aria-labelledby="gm-cls-lbl">' + pills + '</div></div>' +
      '<div class="gm-grid">' + cards + '</div>' + howHtml() + '</div>';
  }
  function howHtml() {
    return '<details class="gm-how"><summary>How do coins work?</summary><ul>' +
      '<li><b>+1 🪙</b> the first time you answer a question of a level right (no hints, no 50:50).</li>' +
      '<li><b>+5 🪙</b> when every question of a level has been answered right at least once.</li>' +
      '<li><b>+2 🪙</b> for playing a finished level again, once a day.</li>' +
      '<li>You clear a level with 60 % right. ★ = 60 %, ★★ = 80 %, ★★★ = all right.</li>' +
      '<li>Log in to keep your coins and levels on every device.</li></ul></details>';
  }

  function mapHtml() {
    const g = S.game, G = C.GAMES[g], sm = summary(g);
    let head = '<button type="button" class="gm-back" data-act="hub">← All games</button>';
    head += '<header class="gm-maphead" style="--gc:' + G.color + '"><span class="gm-ico" aria-hidden="true">' + G.emoji + '</span><div><h2>' + esc(G.title) + ' <small>Class ' + S.cls + '</small></h2><p>' + esc(G.blurb) + '</p></div></header>';
    if (!sm.ok) return '<div class="gm-root" data-view="map">' + head + '<p class="gm-why">' + esc(sm.why) + '</p></div>';
    const sel = sm.scopes.length > 1
      ? '<label class="gm-scopebar">Subject <select class="gm-scope" aria-label="Subject">' + sm.scopes.map(s => '<option value="' + esc(s.id) + '"' + (s.id === sm.scope ? ' selected' : '') + '>' + esc(s.name) + '</option>').join('') + '</select></label>'
      : '<div class="gm-scopebar">' + esc(sm.scopes[0].name) + '</div>';
    let open = true;
    const nodes = sm.plan.levels.map(lv => {
      const p = levelProgress(g, sm.scope, lv), locked = !open;
      if (!p.cleared) open = false;
      const boss = lv.level === C.LEVELS || lv.level === sm.plan.levels.length;
      const cls = 'gm-node' + (locked ? ' is-locked' : p.cleared ? ' is-cleared' : ' is-open') + (boss && sm.plan.levels.length >= 3 ? ' is-boss' : '') + (p.completed ? ' is-complete' : '');
      const label = 'Level ' + lv.level + ', ' + lv.total + ' questions, ' + (locked ? 'locked' : p.cleared ? p.stars + ' stars' : 'ready');
      return '<li><button type="button" class="' + cls + '" data-act="node" data-level="' + lv.level + '"' + (locked ? ' disabled' : '') + ' aria-label="' + esc(label) + '">' +
        '<span class="gm-n">' + (locked ? '🔒' : boss && sm.plan.levels.length >= 3 ? '👑' : lv.level) + '</span>' +
        '<span class="gm-st" aria-hidden="true">' + stars(locked ? 0 : p.stars) + '</span><span class="gm-nl">' + esc(lv.label) + '</span></button></li>';
    }).join('');
    const total = sm.plan.levels.reduce((t, l) => t + l.total + 5, 0);
    return '<div class="gm-root" data-view="map">' + head + sel +
      '<ol class="gm-path" style="--gc:' + G.color + '">' + nodes + '</ol>' +
      '<p class="gm-coinnote">' + sm.cleared + ' of ' + sm.levels + ' levels cleared · up to <b>' + total + ' 🪙</b> to earn here the first time, then +2 🪙 a day for replaying finished levels.</p>' + howHtml() + '</div>';
  }

  function onClick(e) {
    const b = e.target.closest('[data-act]'); if (!b || b.disabled) return;
    const act = b.dataset.act;
    if (act === 'cls') { S.cls = +b.dataset.cls; prefs().cls = S.cls; savePrefs(); paint(); }
    else if (act === 'play') openMap(b.dataset.game);
    else if (act === 'hub') { S.view = 'hub'; S.game = null; paint(); }
    else if (act === 'node') intro(S.game, +b.dataset.level, b);
    else if (act === 'cont') { S.game = b.dataset.game; S.view = 'map'; const sm = summary(S.game); intro(S.game, +b.dataset.level, b, sm.scope); }
  }
  function openMap(game) {
    S.game = game; S.view = 'map';
    paint(); window.scrollTo(0, 0);
  }

  // ---------- a level: intro -> run -> results ----------
  let lastFocus = null, keyHandler = null;
  function lockBody(on) { document.body.classList.toggle('gm-lock', on); }
  function openOverlay(game, label) {
    closeOverlay(true);
    const G = C.GAMES[game];
    const ov = document.createElement('div');
    ov.className = 'gm-ov'; ov.style.setProperty('--gc', G.color);
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', label);
    ov.innerHTML = '<div class="gm-ovin"></div>';
    document.body.appendChild(ov); lockBody(true);
    keyHandler = ev => {
      if (ev.key === 'Tab') {            // keep the keyboard inside the game
        const f = [...ov.querySelectorAll('button:not([disabled]), select, [tabindex="0"]')].filter(x => x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
        else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
      }
      if (S.ov && S.ov.onKey) S.ov.onKey(ev);
    };
    document.addEventListener('keydown', keyHandler, true);
    S.ov = {el: ov, inner: ov.firstChild, timers: [], onKey: null};
    return S.ov;
  }
  function clearTimers() { if (S.ov) { S.ov.timers.forEach(t => { clearTimeout(t); clearInterval(t); }); S.ov.timers = []; } }
  function closeOverlay(quiet) {
    if (!S.ov) return;
    clearTimers();
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { /* no voice */ }
    S.ov.el.remove(); S.ov = null; S.run = null;
    document.removeEventListener('keydown', keyHandler, true); keyHandler = null;
    lockBody(false);
    if (!quiet) { if (onPage()) paint(); if (lastFocus && document.contains(lastFocus)) { try { lastFocus.focus(); } catch (e) { /* element gone */ } } }
  }
  const later = (fn, ms) => { const t = setTimeout(fn, ms); if (S.ov) S.ov.timers.push(t); return t; };

  function intro(game, level, from, scopeId) {
    lastFocus = from || null;
    const scopes = scopesOf(game), scope = scopeId || scopeFor(game, scopes);
    const plan = C.planFor(game, ctxOf(S.cls, scope));
    if (!plan.levels || !plan.levels[level - 1]) return;
    const lv = plan.levels[level - 1], G = C.GAMES[game], p = levelProgress(game, scope, lv);
    const sc = scopes.find(s => s.id === scope), scName = sc && scopes.length > 1 ? ' · ' + sc.name : '';
    const ov = openOverlay(game, G.title + ' level ' + level);
    const hasTimer = game === 'math' || game === 'tf';
    const rules = game === 'memory'
      ? '<li>Look at the cards, press <b>Hide</b>, then flip two at a time to find each question’s answer.</li><li>Every pair you find is one step.</li>'
      : '<li>' + lv.total + ' ' + (game === 'spell' ? 'words' : 'questions') + ' · ' + LIVES + ' lives ❤️</li><li>Get <b>' + C.stepsNeeded(lv.total) + ' of ' + lv.total + '</b> right to clear the level.</li>' + (hasTimer ? '<li>Beat the clock on every question.</li>' : '');
    ov.inner.innerHTML = '<div class="gm-intro"><button type="button" class="gm-x" data-x aria-label="Close">✕</button>' +
      '<div class="gm-bigico" aria-hidden="true">' + (lv.level === plan.levels.length && plan.levels.length >= 3 ? '👑' : G.emoji) + '</div>' +
      '<h2>' + esc(G.title) + ' · Level ' + level + '</h2><p class="gm-sub">Class ' + S.cls + esc(scName) + ' · ' + esc(lv.label) + '</p>' +
      '<ul class="gm-rules">' + rules + '</ul>' +
      '<div class="gm-earn"><b>🪙 What you can earn</b><span>+1 for each new right answer · +5 when all ' + lv.total + ' are done' + (p.completed ? ' · +2 for playing again today' : '') + '</span>' +
      (p.done ? '<span class="gm-got">Done so far: ' + p.done + ' / ' + lv.total + (p.completed ? ' ✅' : '') + '</span>' : '') + '</div>' +
      '<div class="gm-introbtns"><button type="button" class="gm-go" data-go>Start ▶</button><button type="button" class="gm-ghost" data-x>Not now</button></div></div>';
    ov.inner.addEventListener('click', ev => {
      if (ev.target.closest('[data-x]')) closeOverlay();
      else if (ev.target.closest('[data-go]')) start(game, scope, level);
    });
    ov.el.addEventListener('click', ev => { if (ev.target === ov.el) closeOverlay(); });
    ov.onKey = ev => { if (ev.key === 'Escape') closeOverlay(); };
    const go = ov.inner.querySelector('[data-go]'); if (go) go.focus();
  }

  function start(game, scope, level) {
    const ctx = ctxOf(S.cls, scope), plan = C.planFor(game, ctx), lv = plan.levels[level - 1];
    const built = C.buildLevel(game, ctx, level);
    if (!built) { closeOverlay(); return; }
    const scopes = scopesOf(game), sc = scopes.find(s => s.id === scope);
    const key = C.levelKey(game, S.cls, scope, level, lv.total), rw = R(), a = rw && rw.get ? rw.get(key) : null;
    const run = S.run = {game, scope, level, lv, built, key, total: lv.total, G: C.GAMES[game], idx: 0, lives: LIVES, streak: 0, bestStreak: 0, correct: 0, coins: 0, pending: [], mistakes: 0, missed: [], finished: false,
      title: C.GAMES[game].title + ' · Class ' + S.cls + (sc && scopes.length > 1 ? ' · ' + sc.name : '') + ' · Level ' + level, wasComplete: !!(a && a.times > 0), fifty: true};
    const p = prefs(); p.last = {game, cls: S.cls, scope}; savePrefs();
    clearTimers();
    const ov = S.ov;
    ov.el.setAttribute('aria-label', run.title);
    ov.inner.innerHTML = '<div class="gm-top"><button type="button" class="gm-x" data-leave aria-label="Leave this level">✕</button><div class="gm-ttl"><span>' + run.G.emoji + '</span> Level ' + level + '</div>' +
      '<div class="gm-lives" aria-live="polite"></div><div class="gm-run" title="Coins earned in this run">🪙 <b>+0</b></div><button type="button" class="gm-snd" data-snd aria-pressed="' + p.sound + '" title="Sound">' + (p.sound ? '🔊' : '🔇') + '</button></div>' +
      '<div class="gm-bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + run.total + '" aria-valuenow="0"><i></i></div><div class="gm-body"></div>';
    run.body = ov.inner.querySelector('.gm-body');
    ov.inner.onclick = ev => {
      if (ev.target.closest('[data-leave]')) return askLeave();
      const snd = ev.target.closest('[data-snd]');
      if (snd) { p.sound = !p.sound; savePrefs(); snd.textContent = p.sound ? '🔊' : '🔇'; snd.setAttribute('aria-pressed', p.sound); beep('ok'); }
    };
    ov.onKey = ev => { if (ev.key === 'Escape') askLeave(); else if (run.keys) run.keys(ev); };
    paintTop(run);
    if (built.runner === 'tiles') tilesQ(run); else if (built.runner === 'flip') flipStart(run); else choiceQ(run);
  }
  function paintTop(run) {
    const t = S.ov.inner;
    const lives = t.querySelector('.gm-lives');
    if (lives) lives.innerHTML = run.built.runner === 'flip' ? '<span title="Mistakes">❌ ' + run.mistakes + '</span>' : '❤️'.repeat(Math.max(0, run.lives)) + '<span class="gm-lost">' + '🤍'.repeat(LIVES - Math.max(0, run.lives)) + '</span>';
    const bar = t.querySelector('.gm-bar'); if (bar) { const done = run.built.runner === 'flip' ? run.correct : Math.min(run.idx, run.total); bar.firstChild.style.width = Math.round(100 * done / run.total) + '%'; bar.setAttribute('aria-valuenow', done); }
    const r = t.querySelector('.gm-run b'); if (r) r.textContent = '+' + run.coins;
  }
  function askLeave() {
    const run = S.run;
    if (!run || run.finished || (run.idx === 0 && !run.correct && !run.mistakes)) return closeOverlay();
    if (S.ov.el.querySelector('.gm-ask')) return;
    const d = document.createElement('div'); d.className = 'gm-ask'; d.setAttribute('role', 'alertdialog'); d.setAttribute('aria-label', 'Leave this level?');
    d.innerHTML = '<div><h3>Leave this level?</h3><p>The coins you have earned are kept. This run will not count towards clearing the level.</p><div class="gm-introbtns"><button type="button" class="gm-go" data-keep>Keep playing</button><button type="button" class="gm-ghost" data-quit>Leave</button></div></div>';
    S.ov.el.appendChild(d);
    d.querySelector('[data-keep]').focus();
    d.addEventListener('click', ev => { if (ev.target.closest('[data-keep]')) d.remove(); else if (ev.target.closest('[data-quit]')) closeOverlay(); });
    d.addEventListener('keydown', ev => { if (ev.key === 'Escape') { ev.stopPropagation(); d.remove(); } });
  }

  // ---------- sound, voice, coins ----------
  let actx = null;
  function beep(kind) {
    if (!prefs().sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const seq = kind === 'ok' ? [[660, 0.08], [880, 0.1]] : kind === 'bad' ? [[220, 0.2]] : kind === 'win' ? [[523, 0.1], [659, 0.1], [784, 0.1], [1047, 0.25]] : kind === 'flip' ? [[520, 0.05]] : [];
      let t = actx.currentTime;
      seq.forEach(s => { const o = actx.createOscillator(), g = actx.createGain(); o.type = kind === 'bad' ? 'sawtooth' : 'sine'; o.frequency.value = s[0]; g.gain.setValueAtTime(0.07, t); g.gain.exponentialRampToValueAtTime(0.0001, t + s[1]); o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + s[1]); t += s[1] * 0.9; });
    } catch (e) { /* no audio */ }
  }
  function speak(text) {
    try { if (!text || !window.speechSynthesis) return; window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'en-US'; u.rate = 0.85; window.speechSynthesis.speak(u); } catch (e) { /* no voice on this device */ }
  }
  // one step of the level done: the server decides the coins
  function reportStep(run, i, from) {
    const rw = R(); if (!rw || !rw.step) return;
    let x, y; if (from && from.getBoundingClientRect) { const r = from.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top; }
    const pr = rw.step(run.key, run.title, run.total, i, x, y).then(r => { if (r && r.earned) { run.coins += r.earned; if (S.run === run && S.ov) paintTop(run); } return r; }).catch(() => null);
    run.pending.push(pr);
  }

  // ---------- the "choice" game (Quiz Quest, Math Sprint, Little Learners, True or False) ----------
  function choiceQ(run) {
    const it = run.built.items[run.idx];
    if (!it) return finish(run);
    paintTop(run);
    const rtl = it.dir === 'rtl', p = prefs();
    const tools = [];
    if (it.say) tools.push('<button type="button" class="gm-tool" data-say aria-label="Hear it">🔊</button>');
    if (it.tr && it.tr.ur) tools.push('<button type="button" class="gm-tool" data-tr="ur" aria-pressed="false">اردو</button>');
    if (it.tr && it.tr.ps) tools.push('<button type="button" class="gm-tool" data-tr="ps" aria-pressed="false">پښتو</button>');
    if (it.c.length >= 3 && run.fifty && run.game !== 'learn') tools.push('<button type="button" class="gm-tool" data-fifty title="Remove two wrong answers (no coin for this question)">💡 50:50</button>');
    const opts = it.c.map((c, i) => '<button type="button" class="gm-opt" data-i="' + i + '"' + (rtl ? ' dir="rtl"' : '') + '><span class="gm-k">' + (it.c.length === 2 ? (i ? '✘' : '✔') : 'ABCD'[i]) + '</span><span class="gm-t">' + c + '</span></button>').join('');
    run.body.innerHTML = '<div class="gm-qno">Question ' + (run.idx + 1) + ' of ' + run.total + (run.streak > 1 ? ' · 🔥 ' + run.streak + ' in a row' : '') + '</div>' +
      (run.built.secs ? '<div class="gm-clock" aria-hidden="true"><i></i></div>' : '') +
      '<div class="gm-q" ' + (rtl ? 'dir="rtl" ' : '') + 'id="gm-q">' + it.p + '</div>' +
      (tools.length ? '<div class="gm-tools">' + tools.join('') + '</div>' : '') + '<div class="gm-trbox" hidden></div>' +
      '<div class="gm-opts' + (it.big ? ' is-big' : '') + (it.c.length === 2 ? ' is-two' : '') + '" role="group" aria-labelledby="gm-q">' + opts + '</div>' +
      '<div class="gm-fb" aria-live="polite"></div>';
    const st = run.q = {it, locked: false, assisted: false, t0: Date.now()};
    run.body.onclick = ev => {
      const o = ev.target.closest('.gm-opt'); if (o && !st.locked) return pick(run, +o.dataset.i, o);
      if (ev.target.closest('[data-say]')) return speak(it.say);
      const tr = ev.target.closest('[data-tr]');
      if (tr) { const box = run.body.querySelector('.gm-trbox'), on = tr.getAttribute('aria-pressed') !== 'true'; run.body.querySelectorAll('[data-tr]').forEach(x => x.setAttribute('aria-pressed', 'false')); if (on) { tr.setAttribute('aria-pressed', 'true'); box.hidden = false; box.setAttribute('dir', 'rtl'); box.textContent = it.tr[tr.dataset.tr]; } else box.hidden = true; return; }
      if (ev.target.closest('[data-fifty]') && !st.locked) {
        run.fifty = false; st.assisted = true;
        const wrong = it.c.map((c, i) => i).filter(i => i !== it.a).sort(() => Math.random() - 0.5).slice(0, it.c.length - 2);
        wrong.forEach(i => { const b = run.body.querySelector('.gm-opt[data-i="' + i + '"]'); if (b) { b.disabled = true; b.classList.add('is-gone'); } });
        ev.target.closest('[data-fifty]').remove();
        return;
      }
      if (ev.target.closest('[data-next]')) return nextQ(run);
    };
    run.keys = ev => {
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      const k = ev.key.toLowerCase();
      if (!st.locked) { const i = /^[1-4]$/.test(k) ? +k - 1 : 'abcd'.indexOf(k); if (i >= 0 && i < it.c.length && k.length === 1) { const b = run.body.querySelector('.gm-opt[data-i="' + i + '"]'); if (b && !b.disabled) { ev.preventDefault(); pick(run, i, b); } } }
      else if ((k === 'enter' || k === ' ') && run.body.querySelector('[data-next]') && document.activeElement && document.activeElement.tagName !== 'BUTTON') { ev.preventDefault(); nextQ(run); }
    };
    if (it.say && run.game === 'learn') later(() => { if (S.run === run && run.q === st) speak(it.say); }, 350);
    if (run.built.secs) startClock(run, st);
    const first = run.body.querySelector('.gm-opt'); if (first && !reduceMotion()) first.focus({preventScroll: true});
  }
  function startClock(run, st) {
    const bar = run.body.querySelector('.gm-clock i'), total = run.built.secs * 1000, t0 = Date.now();
    const t = setInterval(() => {
      if (st.locked || S.run !== run || run.q !== st) return clearInterval(t);
      const left = total - (Date.now() - t0);
      if (bar) { bar.style.width = Math.max(0, 100 * left / total) + '%'; bar.parentNode.classList.toggle('is-low', left < total * 0.3); }
      if (left <= 0) { clearInterval(t); pick(run, -1, null); }
    }, 100);
    S.ov.timers.push(t);
  }
  function pick(run, i, btn) {
    const st = run.q, it = st.it; if (st.locked) return;
    st.locked = true;
    const right = i === it.a, timeout = i < 0;
    run.body.querySelectorAll('.gm-opt').forEach(b => { b.disabled = true; if (+b.dataset.i === it.a) b.classList.add('is-right'); });
    if (btn && !right) btn.classList.add('is-wrong');
    const fb = run.body.querySelector('.gm-fb');
    if (right) {
      run.correct++; run.streak++; run.bestStreak = Math.max(run.bestStreak, run.streak);
      beep('ok');
      if (!st.assisted) reportStep(run, run.idx, btn);
    } else {
      run.lives--; run.streak = 0; beep('bad');
      run.missed.push({p: it.p, a: it.x ? '' : it.c[it.a], x: it.x || '', rtl: it.dir === 'rtl'});   // x (when there is one) already names the right answer
      if (btn && !reduceMotion()) { btn.classList.add('gm-shake'); }
    }
    paintTop(run);
    const dead = run.lives <= 0, last = run.idx + 1 >= run.total;
    const msg = right ? '<b class="gm-yes">✔ ' + pickWord(['Correct!', 'Well done!', 'Yes!', 'Great!', 'Super!']) + '</b>' : '<b class="gm-no">' + (timeout ? '⏰ Time is up.' : '✘ Not quite.') + '</b>';
    const showX = it.x && (!right || run.game === 'quiz' || run.game === 'learn' || run.game === 'tf');
    const needNext = !right || showX || dead;
    fb.innerHTML = msg + (st.assisted && right ? ' <span class="gm-note">(no coin: you used 50:50)</span>' : '') + (showX ? '<div class="gm-x-txt"' + (it.dir === 'rtl' ? ' dir="rtl"' : '') + '>' + it.x + '</div>' : '') +
      (needNext ? '<button type="button" class="gm-next" data-next>' + (dead ? 'See results' : last ? 'Finish' : 'Next') + ' ▶</button>' : '');
    if (needNext) { const nb = fb.querySelector('[data-next]'); if (nb) nb.focus({preventScroll: true}); }
    else later(() => { if (S.run === run && run.q === st) nextQ(run); }, 750);
  }
  const pickWord = a => a[Math.floor(Math.random() * a.length)];
  function nextQ(run) {
    if (S.run !== run) return;
    run.idx++;
    if (run.lives <= 0 || run.idx >= run.total) return finish(run);
    choiceQ(run);
  }

  // ---------- the "tiles" game (Word Builder) ----------
  function tilesQ(run) {
    const it = run.built.items[run.idx];
    if (!it) return finish(run);
    paintTop(run);
    const ans = it.ans, n = ans.length, r = C.makeRng();
    let order = ans.split('').map((ch, i) => i);
    for (let t = 0; t < 8 && order.every((v, i) => ans[v] === ans[i]); t++) order = C.shuffle(r, order);
    const letters = order.map(i => ans[i]);
    const st = run.q = {it, slots: new Array(n).fill(null), locked: new Array(n).fill(false), used: new Array(n).fill(false), wrongTries: 0, hinted: false, done: false};
    run.body.innerHTML = '<div class="gm-qno">Word ' + (run.idx + 1) + ' of ' + run.total + (run.streak > 1 ? ' · 🔥 ' + run.streak + ' in a row' : '') + '</div>' +
      '<div class="gm-q" id="gm-q">' + it.p + '</div><div class="gm-slots" dir="ltr" role="group" aria-label="Your word"></div><div class="gm-tiles" dir="ltr" role="group" aria-label="Letters">' +
      letters.map((l, i) => '<button type="button" class="gm-tile" data-t="' + i + '">' + l + '</button>').join('') + '</div>' +
      '<div class="gm-tools">' + (it.say ? '<button type="button" class="gm-tool" data-say aria-label="Hear it">🔊</button>' : '') + '<button type="button" class="gm-tool" data-hint title="Put the next letter in place (no coin for this word)">💡 Hint</button><button type="button" class="gm-tool" data-back>⌫ Back</button><button type="button" class="gm-tool" data-clear>↺ Clear</button></div><div class="gm-fb" aria-live="polite"></div>';
    const slotsEl = run.body.querySelector('.gm-slots'), tilesEl = run.body.querySelector('.gm-tiles');
    const draw = () => {
      slotsEl.innerHTML = st.slots.map((v, i) => '<button type="button" class="gm-slot' + (v != null ? ' on' : '') + (st.locked[i] ? ' is-hint' : '') + '" data-s="' + i + '" aria-label="Letter ' + (i + 1) + (v != null ? ': ' + letters[v] : ': empty') + '">' + (v != null ? letters[v] : '') + '</button>').join('');
      tilesEl.querySelectorAll('.gm-tile').forEach(b => { b.disabled = st.used[+b.dataset.t] || st.done; });
    };
    const place = ti => {
      if (st.done || st.used[ti]) return;
      const at = st.slots.indexOf(null); if (at < 0) return;
      st.slots[at] = ti; st.used[ti] = true; draw(); beep('flip');
      if (st.slots.indexOf(null) < 0) check();
    };
    const removeAt = si => { if (st.done || st.locked[si] || st.slots[si] == null) return; st.used[st.slots[si]] = false; st.slots[si] = null; draw(); };
    const removeLast = () => { for (let i = n - 1; i >= 0; i--) if (st.slots[i] != null && !st.locked[i]) return removeAt(i); };
    const check = () => {
      const word = st.slots.map(v => letters[v]).join('');
      if (word === ans) {
        st.done = true; draw();
        const clean = !st.wrongTries && !st.hinted;
        run.correct++; run.streak++; run.bestStreak = Math.max(run.bestStreak, run.streak); beep('ok');
        if (clean) reportStep(run, run.idx, slotsEl);
        paintTop(run);
        const last = run.idx + 1 >= run.total;
        run.body.querySelector('.gm-fb').innerHTML = '<b class="gm-yes">✔ ' + pickWord(['Spelled!', 'Perfect!', 'Great!', 'Well done!']) + '</b>' + (clean ? '' : ' <span class="gm-note">(no coin: you needed help or a second try)</span>') +
          (it.x ? '<div class="gm-x-txt">' + it.x + '</div>' : '') + '<button type="button" class="gm-next" data-next>' + (last ? 'Finish' : 'Next') + ' ▶</button>';
        const nb = run.body.querySelector('[data-next]'); if (nb) nb.focus({preventScroll: true});
        return;
      }
      st.wrongTries++; run.lives--; run.streak = 0; beep('bad'); paintTop(run);
      if (st.wrongTries === 1) run.missed.push({p: it.p, a: '<b>' + ans + '</b>', x: it.x || '', rtl: false});
      slotsEl.classList.add('gm-shake'); setTimeout(() => slotsEl.classList.remove('gm-shake'), 500);
      if (run.lives <= 0) {
        st.done = true;
        run.body.querySelector('.gm-fb').innerHTML = '<b class="gm-no">✘ Out of lives.</b><div class="gm-x-txt">The word was <b>' + ans + '</b>.</div><button type="button" class="gm-next" data-next>See results ▶</button>';
        draw(); return;
      }
      run.body.querySelector('.gm-fb').innerHTML = '<b class="gm-no">✘ Not quite — try again.</b>';
      for (let i = 0; i < n; i++) if (!st.locked[i] && st.slots[i] != null) { st.used[st.slots[i]] = false; st.slots[i] = null; }
      draw();
    };
    const hint = () => {
      if (st.done) return;
      let j = 0; while (j < n && st.slots[j] != null && letters[st.slots[j]] === ans[j]) j++;
      if (j >= n) return;
      for (let i = j; i < n; i++) if (!st.locked[i] && st.slots[i] != null) { st.used[st.slots[i]] = false; st.slots[i] = null; }
      const ti = letters.findIndex((l, k) => l === ans[j] && !st.used[k]);
      if (ti < 0) return;
      st.slots[j] = ti; st.used[ti] = true; st.locked[j] = true; st.hinted = true; draw();
      if (st.slots.indexOf(null) < 0) check();
    };
    run.body.onclick = ev => {
      const t = ev.target.closest('.gm-tile'); if (t) return place(+t.dataset.t);
      const s = ev.target.closest('.gm-slot'); if (s) return removeAt(+s.dataset.s);
      if (ev.target.closest('[data-hint]')) return hint();
      if (ev.target.closest('[data-back]')) return removeLast();
      if (ev.target.closest('[data-clear]')) { for (let i = 0; i < n; i++) removeAt(i); return; }
      if (ev.target.closest('[data-say]')) return speak(it.say);
      if (ev.target.closest('[data-next]')) { run.idx++; if (run.lives <= 0 || run.idx >= run.total) finish(run); else tilesQ(run); }
    };
    run.keys = ev => {
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      if (st.done) { if (ev.key === 'Enter' && run.body.querySelector('[data-next]') && document.activeElement.tagName !== 'BUTTON') { ev.preventDefault(); run.body.querySelector('[data-next]').click(); } return; }
      if (ev.key === 'Backspace') { ev.preventDefault(); return removeLast(); }
      if (/^[a-z]$/i.test(ev.key)) { const L = ev.key.toUpperCase(), ti = letters.findIndex((l, k) => l === L && !st.used[k]); if (ti >= 0) { ev.preventDefault(); place(ti); } }
    };
    draw();
    if (it.say && run.idx === 0) { /* the picture is enough; the speaker button is there */ }
  }

  // ---------- the "flip" game (Memory Match) ----------
  function flipStart(run) {
    const pairs = run.built.items, N = pairs.length;
    const cards = [];
    pairs.forEach((p, i) => { cards.push({pair: i, side: 'q', html: p.q, rtl: p.dir === 'rtl', kind: p.kind}); cards.push({pair: i, side: 'a', html: p.a, rtl: p.dir === 'rtl', kind: p.kind}); });
    const deck = C.shuffle(C.makeRng(), cards);
    const cols = N <= 3 ? 3 : N <= 4 ? 4 : N <= 6 ? 4 : 4;
    const st = run.q = {deck, open: [], matched: new Set(), busy: false, peek: true};
    paintTop(run);
    run.body.innerHTML = '<div class="gm-qno" aria-live="polite"></div><div class="gm-memgrid" style="--cols:' + cols + '"></div><div class="gm-fb" aria-live="polite"></div>';
    const grid = run.body.querySelector('.gm-memgrid'), info = run.body.querySelector('.gm-qno'), fb = run.body.querySelector('.gm-fb');
    const draw = () => {
      grid.innerHTML = deck.map((c, i) => {
        const up = st.peek || st.open.includes(i) || st.matched.has(c.pair);
        return '<button type="button" class="gm-card2' + (up ? ' up' : '') + (st.matched.has(c.pair) ? ' ok' : '') + ' ' + (c.side === 'q' ? 'is-q' : 'is-a') + (c.kind === 'pic' ? ' is-pic' : '') + '" data-c="' + i + '"' + (st.matched.has(c.pair) || st.peek ? ' disabled' : '') + ' aria-label="' + (up ? esc(C.plain(c.html)) : 'Hidden card ' + (i + 1)) + '"><span class="gm-face"' + (c.rtl ? ' dir="rtl"' : '') + '>' + (up ? c.html : '?') + '</span></button>';
      }).join('');
      info.textContent = st.peek ? 'Look at the cards — each question has an answer card. Then press Hide.' : 'Pairs found: ' + st.matched.size + ' of ' + N + ' · mistakes: ' + run.mistakes;
    };
    fb.innerHTML = '<button type="button" class="gm-next" data-hide>Hide the cards ▶</button>';
    run.body.onclick = ev => {
      if (ev.target.closest('[data-hide]')) { st.peek = false; fb.innerHTML = ''; draw(); const f = grid.querySelector('.gm-card2'); if (f) f.focus({preventScroll: true}); return; }
      const c = ev.target.closest('.gm-card2'); if (!c || st.peek || st.busy) return;
      const i = +c.dataset.c; if (st.open.includes(i) || st.matched.has(deck[i].pair)) return;
      st.open.push(i); beep('flip'); draw();
      if (st.open.length < 2) return;
      const a = deck[st.open[0]], b = deck[st.open[1]];
      if (a.pair === b.pair && a.side !== b.side) {
        st.matched.add(a.pair); st.open = []; run.correct++; run.streak++; beep('ok');
        reportStep(run, a.pair, c);
        paintTop(run); draw();
        if (st.matched.size === N) later(() => finish(run), 700);
      } else {
        run.mistakes++; run.streak = 0; st.busy = true; beep('bad'); paintTop(run);
        later(() => { st.open = []; st.busy = false; if (S.run === run) draw(); }, 1000);
      }
    };
    run.keys = null;
    draw();
    const h = fb.querySelector('[data-hide]'); if (h) h.focus({preventScroll: true});
  }

  // ---------- results ----------
  async function finish(run) {
    if (run.finished) return; run.finished = true; clearTimers();
    const rw = R(), isFlip = run.built.runner === 'flip';
    const body = run.body;
    body.innerHTML = '<div class="gm-res"><div class="gm-res-badge">⏳</div><h2>Counting your coins…</h2></div>';
    await Promise.all(run.pending).catch(() => null);
    // how well this run went: right answers / questions; for Memory Match from the mistakes
    const pct = isFlip ? (run.mistakes <= Math.floor(run.total / 2) ? 1 : run.mistakes <= Math.ceil(run.total * 1.5) ? 0.8 : PASS) : run.correct / run.total;
    const passed = pct >= PASS - 1e-9;
    const runStars = pct >= 0.999 ? 3 : pct >= 0.8 ? 2 : passed ? 1 : 0;
    const p = prefs();
    if (pct > (p.best[run.key] || 0)) p.best[run.key] = Math.round(pct * 1000) / 1000;
    touchStreak(); savePrefs();
    let practice = 0;
    if (passed && run.wasComplete && rw && rw.again) { const r = await rw.again(run.key).catch(() => null); if (r && r.earned) { practice = r.earned; run.coins += r.earned; } }
    if (S.run !== run || !S.ov) return;
    paintTop(run);
    const plan = C.planFor(run.game, ctxOf(S.cls, run.scope)), hasNext = passed && plan.levels && plan.levels[run.level];
    const prog = levelProgress(run.game, run.scope, run.lv);
    beep(passed ? 'win' : 'bad');
    const line = isFlip
      ? 'You found <b>' + run.correct + '</b> of <b>' + run.total + '</b> pairs with <b>' + run.mistakes + '</b> mistake' + (run.mistakes === 1 ? '' : 's') + '.'
      : 'You got <b>' + run.correct + '</b> of <b>' + run.total + '</b> right' + (run.bestStreak > 2 ? ' · best streak 🔥 ' + run.bestStreak : '') + '.';
    const encourage = passed ? (runStars === 3 ? 'Perfect!' : 'Level cleared!') : (run.lives <= 0 ? 'Out of lives — try again!' : 'So close — try again!');
    const doneLine = prog.done >= run.total ? '✅ Every step of this level is done.' : 'Steps done on this level: <b>' + prog.done + ' / ' + run.total + '</b>' + (prog.done < run.total ? ' — answer the rest right to earn the +5 bonus.' : '');
    body.innerHTML = '<div class="gm-res' + (passed ? ' is-pass' : '') + '"><div class="gm-res-badge" aria-hidden="true">' + (passed ? (runStars === 3 ? '🏆' : '🎉') : '💪') + '</div><h2>' + encourage + '</h2>' +
      '<div class="gm-res-stars" aria-label="' + runStars + ' of 3 stars">' + stars(runStars) + '</div><p>' + line + '</p>' +
      '<div class="gm-res-coins">🪙 <b>+' + run.coins + '</b> coin' + (run.coins === 1 ? '' : 's') + ' this run' + (practice ? ' <small>(includes +' + practice + ' practice)</small>' : '') + '</div>' +
      '<p class="gm-res-note">' + (run.coins === 0 && prog.done >= 1 ? 'You already earned the coins for the questions you answered right. ' : '') + doneLine + '</p>' +
      reviewHtml(run) +
      '<div class="gm-introbtns">' + (hasNext ? '<button type="button" class="gm-go" data-nextlv>Next level ▶</button>' : '') + '<button type="button" class="' + (hasNext ? 'gm-ghost' : 'gm-go') + '" data-again>Play again ↺</button><button type="button" class="gm-ghost" data-map>All levels</button></div></div>';
    if (passed && !reduceMotion()) confetti(S.ov.el);
    body.onclick = ev => {
      if (ev.target.closest('[data-nextlv]')) { const g = run.game, sc = run.scope, lv = run.level + 1; closeOverlay(true); intro(g, lv, null, sc); }
      else if (ev.target.closest('[data-again]')) { const g = run.game, sc = run.scope, lv = run.level; closeOverlay(true); intro(g, lv, null, sc); }
      else if (ev.target.closest('[data-map]')) closeOverlay();
    };
    run.keys = null;
    const first = body.querySelector('button'); if (first) first.focus({preventScroll: true});
  }
  // what to learn from this run: every question that went wrong, with the right answer and the book's explanation
  function reviewHtml(run) {
    if (!run.missed.length) return '';
    return '<details class="gm-review" open><summary>Review the ' + run.missed.length + ' you missed</summary>' + run.missed.map(m =>
      '<div class="gm-rv"' + (m.rtl ? ' dir="rtl"' : '') + '><div class="gm-rv-q">' + m.p + '</div>' + (m.a ? '<div class="gm-rv-a">✔ ' + m.a + '</div>' : '') + (m.x ? '<div class="' + (m.a ? 'gm-rv-x' : 'gm-rv-a') + '">' + (m.a ? '' : '✔ ') + m.x + '</div>' : '') + '</div>').join('') + '</details>';
  }
  function confetti(root) {
    const box = document.createElement('div'); box.className = 'gm-conf'; box.setAttribute('aria-hidden', 'true');
    const cols = ['#f59e0b', '#ef4444', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];
    for (let i = 0; i < 36; i++) { const s = document.createElement('i'); s.style.cssText = 'left:' + Math.round(Math.random() * 100) + '%;background:' + cols[i % cols.length] + ';animation-delay:' + (Math.random() * 0.5).toFixed(2) + 's;animation-duration:' + (1.6 + Math.random() * 1.2).toFixed(2) + 's;transform:rotate(' + Math.round(Math.random() * 360) + 'deg)'; box.appendChild(s); }
    root.appendChild(box); setTimeout(() => box.remove(), 3200);
  }

  // ---------- style ----------
  function addCss() {
    if (document.getElementById('gm-css-link')) return;
    if (document.querySelector('link[href*="sb_games.css"]')) return;
    const l = document.createElement('link'); l.id = 'gm-css-link'; l.rel = 'stylesheet'; l.href = 'css/sb_games.css?v=20261023_g2'; document.head.appendChild(l);
  }

  // coins changed (a step was saved, or the account loaded): redraw the page unless a game is open
  if (R() && R().onChange) R().onChange(() => { if (onPage() && !S.ov && host() && host().querySelector('.gm-root')) paint(); });
  else document.addEventListener('DOMContentLoaded', () => { if (R() && R().onChange) R().onChange(() => { if (onPage() && !S.ov && host() && host().querySelector('.gm-root')) paint(); }); });
  document.addEventListener('spacebook:auth', () => { prefsCache = null; });

  window.renderGames = renderGames;
  window.SBGames = {open: (game, cls) => { renderGames(); if (cls) { S.cls = +cls; prefs().cls = S.cls; savePrefs(); } if (C.GAMES[game]) openMap(game); }, state: S};
})();
