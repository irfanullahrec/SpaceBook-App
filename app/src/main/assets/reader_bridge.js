/* Runs inside the SpaceBook web app in the Android WebView (injected after the page loads, safe to inject twice).
 * It is the only place that knows the web page's structure; the Kotlin side only talks to window.SBApp.
 *
 *   SBApp.open(classId, subjectId, call, startPage, tab)   open a chapter: openSubject() then the chapter's own button, then its tab ("Lessons" ...)
 *   SBApp.openPage(name)                              a web section: tests-preps | papers | create-test | assistant | study-plan | subjects | home
 *   SBApp.openGrammar(lang)                           the Grammar Stats page on one language: en | ur | ps | ar
 *   SBApp.go(n) / next() / prev()                     one-page view
 *   SBApp.openFeedback()                              the website's suggest / report-a-problem dialog (js/sb_feedback.js) over the page on screen
 *   SBApp.openAccount()                               the website's own "My account" dialog (details, password, download my data, delete my account)
 *   SBApp.setAuth(user, device, flags) / clearAuth()  hand the app's sign-in to the web page (cookie is shared already); flags = the owner's switches as the server published them
 *   SBApp.pageText()                                  text of the page on screen (for read aloud)
 *   SBApp.openGames() / gamesBack() / closeGames()    the arcade (js/sb_arcade.js) made from the page on screen; it reports SBHost.onAction('gamesClosed') when it closes itself
 *   SBApp.state()                                     {ready, pages, page, tab, title}
 *
 * Calls back into the app through window.SBHost (an Android JavascriptInterface; absent in a desktop browser):
 *   SBHost.onReady(), SBHost.onState(json), SBHost.onAction(name, json)
 */
(function () {
  'use strict';
  if (window.SBApp && window.SBApp.__v) return;

  var doc = document, html = doc.documentElement;
  html.classList.add('sbapp');
  var cfg = { paginate: true };
  var cur = 0, units = [], mode = '', lastKey = '', lastTab = '', dir = 24, pendingStart = -1, observer = null, timer = null, opening = 0;

  function host(name, data) {
    try {
      if (window.SBHost && typeof window.SBHost[name] === 'function') {
        if (name === 'onAction') window.SBHost.onAction(data[0], data[1] || '');
        else window.SBHost[name](typeof data === 'string' ? data : JSON.stringify(data || {}));
      }
    } catch (e) { /* the page must never break because the app is not listening */ }
  }
  var $ = function (q, r) { return (r || doc).querySelector(q); };
  var $$ = function (q, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(q)); };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  async function until(fn, ms, step) {
    var end = Date.now() + (ms || 8000);
    for (;;) { var v = fn(); if (v) return v; if (Date.now() > end) return null; await wait(step || 80); }
  }

  // ---------- keep the page where the student is ----------
  // The website sizes its reader to the window and calls scrollTo(0, 0) from fitReaders() every time the page changes (a solution step
  // appears, an animation moves on ...). On the website the window does not scroll, so that is harmless; in the app the page IS the
  // scroller, so it threw the student back to the top at every step. Only that call is ignored; every other scroll works as before.
  var nativeScrollTo = window.scrollTo.bind(window);
  window.scrollTo = function () {
    var a = arguments;
    var toTop = (a.length >= 2 && +a[0] === 0 && +a[1] === 0) || (a.length === 1 && a[0] && typeof a[0] === 'object' && !+a[0].top && !+a[0].left);
    if (toTop) { var st = ''; try { st = String(new Error().stack || ''); } catch (e) { /* no stack */ } if (st.indexOf('fitReaders') >= 0) return; }
    return nativeScrollTo.apply(window, a);
  };
  // a solution step must not pull the page along when it appears
  var nativeIntoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function () {
    if (this.classList && this.classList.contains('sbs-step')) return;
    return nativeIntoView.apply(this, arguments);
  };

  // ---------- speech: the page's speechSynthesis, spoken by the phone's own Android voices ----------
  // The website reads things aloud (the Animate Solution voice explaining each step, English or Urdu) with window.speechSynthesis.
  // A WebView often has no usable voices for that, so here it is replaced by a small stand-in that hands the text to Android's
  // text-to-speech (SBHost.speak) and reports the end back (window.SBSpeechDone), so the page's own code keeps working unchanged.
  (function speechShim() {
    if (!window.SBHost || typeof window.SBHost.speak !== 'function' || window.speechSynthesis && window.speechSynthesis.__sb) return;
    var seq = 0, live = {};
    var voices = [
      { name: 'English', lang: 'en-US', localService: true, default: true, voiceURI: 'sb-en' },
      { name: 'Urdu', lang: 'ur-PK', localService: true, default: false, voiceURI: 'sb-ur' },
    ];
    function size() { return Object.keys(live).length; }
    var synth = {
      __sb: true, paused: false, onvoiceschanged: null,
      get speaking() { return size() > 0; }, get pending() { return false; },
      getVoices: function () { return voices.slice(); },
      speak: function (u) {
        var id = String(++seq);
        live[id] = u;
        var lang = String((u.voice && u.voice.lang) || u.lang || 'en').slice(0, 2).toLowerCase();
        try { window.SBHost.speak(id, String(u.text || ''), lang, +u.rate || 1); } catch (e) { window.SBSpeechDone(id, false); }
      },
      cancel: function () { live = {}; try { window.SBHost.stopSpeech(''); } catch (e) { /* nothing is speaking */ } },
      pause: function () { }, resume: function () { },
      addEventListener: function () { }, removeEventListener: function () { },
    };
    window.SBSpeechDone = function (id, ok) {
      var u = live[id]; delete live[id];
      if (!u) return;
      var ev = { type: ok ? 'end' : 'error', utterance: u, charIndex: 0, elapsedTime: 0 };
      try { if (ok) { if (u.onend) u.onend(ev); } else if (u.onerror) u.onerror(ev); } catch (e) { /* a page handler failed; speech goes on */ }
    };
    // the page sets utterance.voice to one of the voices above, which the browser's own utterance would refuse: use a plain one
    function Utterance(text) { this.text = text == null ? '' : String(text); this.lang = ''; this.voice = null; this.rate = 1; this.pitch = 1; this.volume = 1; this.onend = null; this.onerror = null; this.onstart = null; }
    try { Object.defineProperty(window, 'SpeechSynthesisUtterance', { value: Utterance, configurable: true, writable: true }); } catch (e) { window.SpeechSynthesisUtterance = Utterance; }
    try { Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true, writable: true }); } catch (e) { window.speechSynthesis = synth; }
  })();

  // ---------- where the readable content is ----------
  function root() {
    var cands = ['#subjTabContent', '#mathTabContent', '#page-content'].map(function (q) { return $(q); }).filter(Boolean);
    return cands.find(function (c) { return c.querySelector('.bk-page'); }) || cands[0] || null;
  }

  // a page card that carries nothing but its page label, its page number and perhaps a heading: its questions are read on the Exercises tab,
  // so it is not a page to turn to (Classes 1-11 worksheet pages)
  function blankPage(c) {
    if (!c.classList.contains('sb-pgcard')) return false;
    var body = c.querySelector(':scope > .math-accordion-body');
    if (!body) return false;
    var k = body.cloneNode(true);
    $$('.sb-pt, [class$="-tools"], [class*="-tools "], [class$="-help"], [class*="-help "], [aria-label="Source page"], .c1-pno, .bk-no, script, style', k).forEach(function (e) { e.remove(); });
    if (k.querySelector('img, svg, canvas, table, video, audio, iframe, input, textarea, select, .katex')) return false;
    $$('[role="heading"], h1, h2, h3, h4, h5, h6', k).forEach(function (e) { e.remove(); });
    return !(k.textContent || '').replace(/\s+/g, '').length;
  }

  // The units shown one at a time. A printed-page view (.bk-page, the web's open-book exercise pages) wins;
  // otherwise each topic / page card of the tab (one topic / exercise / section) is a page, however deep the tab nests them.
  var CARD_SEL = '.math-topic-card, .para-card, .sb-pgcard';
  function collect() {
    var r = root();
    if (!r) return { mode: '', units: [] };
    var pages = $$('.bk-page', r);
    if (pages.length) return { mode: 'book', units: pages };
    var nested = $$(CARD_SEL, r).filter(function (c) {
      var up = c.parentElement && c.parentElement.closest(CARD_SEL);
      return !up && !c.closest('.bk-modal, .sb-tp, .sb-pt, dialog') && (c.textContent || '').trim().length > 0;
    });
    // a page of the Lessons tab that holds only its page number (its exercise questions are read on the Exercises tab) is not a page to turn to
    var full = nested.filter(function (c) { return !blankPage(c); });
    if (full.length && full.length < nested.length) return { mode: 'cards', units: full };
    if (nested.length > 1) return { mode: 'cards', units: nested };
    var cards = Array.prototype.filter.call(r.children, function (c) {
      return c.nodeType === 1 && c.offsetParent !== null || (c.nodeType === 1 && c.classList.contains('sbapp-hide'));
    });
    cards = cards.filter(function (c) { return !/^(SCRIPT|STYLE)$/.test(c.tagName) && (c.textContent || '').trim().length > 0; });
    return { mode: cards.length > 1 ? 'cards' : '', units: cards.length > 1 ? cards : [] };
  }

  // the "Click any sentence ..." line the website puts above a lesson: the app teaches the gesture itself, so the line only takes room
  var HINT_RX = /click any sentence|point at a word|tap any sentence|کلک کریں|ماؤس رکھیں|ماوس رکھیں|کلیک|ټک وکړئ/i;
  function dressPage() {
    $$('[class$="-help"], [class*="-help "], .sh-help, .sh-bar').forEach(function (h) {
      if (!h.classList.contains('sbapp-hint') && h.children.length < 3 && HINT_RX.test((h.textContent || '').slice(0, 260))) h.classList.add('sbapp-hint');
    });
    // the "Textbook Lesson & Translations" heading and its description above the cards of a lesson (Classes 9-12) are the website's own chrome
    if (units.length) $$('h3[data-sbg]', root()).filter(function (h) { return !units.some(function (u) { return u.contains(h); }); }).forEach(function (h) {
      var e = h; while (e.parentElement && !e.parentElement.contains(units[0])) e = e.parentElement;
      // Statistics (Classes 11-12): the heading is the title of the question bank, whose cards are the later pages of the tab; hiding
      // the box would blank every page after the first, so only the heading goes
      if (!e.contains(units[0]) && units.some(function (u) { return e.contains(u); })) e = h;
      if (e !== units[0] && !e.contains(units[0]) && e.parentElement && !e.querySelector('input, select, textarea')) e.classList.add('sbapp-hint');
    });
    // the tab strip's sticky offset depends on whether a second strip (Lesson text / Videos ...) is under it
    var sub = $('#subjSubTabsBar button, .topic-sub-tabs-bar-fixed button');
    html.classList.toggle('sbapp-subbar', !!sub);
    // a page is read, not browsed: the closed topic headings inside it (Classes 9-12) are opened, so the page shows its text
    var u = units[cur];
    if (u) [u].concat($$('.sb-topic-closed', u)).forEach(function (c) { if (!c.classList.contains('sb-topic-closed')) return; var h = c.querySelector(':scope > .sb-topic-head'); if (h) h.click(); });
    // a tab that is one collapsed card (a short chapter, a lone exercise) is read open, not as a bare heading
    if (!units.length) {
      var lone = root() ? $$('.math-accordion-card', root()).filter(function (c) { return !c.closest('.bk-modal, .sb-tp, .sb-pt, dialog') && !(c.parentElement && c.parentElement.closest('.math-accordion-card')); }) : [];
      if (lone.length === 1) openCard(lone[0]);
    }
  }

  function openCard(card) {
    // a topic card is an accordion (or a <details>, like the book information of a Class 12 Mathematics chapter): show its body so the page reads like the book
    if (card.tagName === 'DETAILS' && !card.open) card.open = true;
    var body = card.querySelector && card.querySelector('.math-accordion-body');
    if (body && body.style.display !== 'block') {
      var h = card.querySelector('.math-acc-header');
      if (h) h.click(); else body.style.display = 'block';
    }
  }

  function show(n, fromDir) {
    if (!units.length) return;
    cur = Math.max(0, Math.min(units.length - 1, n));
    dir = fromDir || dir;
    html.style.setProperty('--sbapp-from', (dir > 0 ? 24 : -24) + 'px');
    units.forEach(function (u, i) {
      u.classList.toggle('sbapp-hide', i !== cur);
      u.classList.toggle('sbapp-page-on', i === cur);
    });
    if (mode === 'cards') openCard(units[cur]);
    dressPage();
    nativeScrollTo(0, 0);
    report();
  }

  function titleOf() {
    var h = $('.math-compact-header-bar') || $('#dash-title');
    return h ? (h.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120) : doc.title;
  }
  function activeTab() {
    var b = $('.math-nav-tabs .active, .math-nav-tabs button.active, .topic-sub-tabs-bar .active');
    return b ? (b.textContent || '').trim() : '';
  }
  function state() {
    return { ready: true, pages: units.length || 1, page: cur, tab: activeTab(), title: titleOf(), mode: mode || (cfg.paginate ? 'flow' : 'web') };
  }
  var lastSent = '';
  function report() {
    var s = JSON.stringify(state());
    if (s !== lastSent) { lastSent = s; host('onState', s); }
  }

  function refresh() {
    if (!cfg.paginate) { units = []; mode = ''; report(); return; }
    var c = collect();
    var tab = activeTab();
    var key = c.mode + '|' + c.units.length + '|' + tab + '|' + (root() ? root().id : '');
    // the cards of a lesson can be wrapped into page cards a moment after they were first drawn (a unit inside a closed wrapper is
    // hidden with it): the list is made again whenever it is no longer the list of the page
    var sameList = units.length === c.units.length && units.every(function (u, i) { return u === c.units[i]; });
    if (key === lastKey && units.length && sameList && units.every(function (u) { return doc.body.contains(u); })) return;
    // the tab or chapter changed (or the content was rebuilt): start again from the saved page or the first
    var changedTab = c.mode !== mode || tab !== lastTab;
    units.forEach(function (u) { u.classList.remove('sbapp-hide', 'sbapp-page-on'); });
    lastKey = key; lastTab = tab; mode = c.mode; units = c.units;
    var start = pendingStart >= 0 ? pendingStart : (changedTab ? 0 : cur);
    pendingStart = -1;
    if (units.length) show(start); else { cur = 0; dressPage(); report(); }
    setTimeout(dressPage, 350);
  }
  function schedule() { clearTimeout(timer); timer = setTimeout(refresh, 160); }

  function observe() {
    if (observer) return;
    var target = $('#dashboard-body') || $('#page-content') || doc.body;
    observer = new MutationObserver(function (muts) {
      // ignore our own class changes: only a rebuilt list of children matters
      for (var i = 0; i < muts.length; i++) if (muts[i].type === 'childList') { schedule(); return; }
    });
    observer.observe(target, { childList: true, subtree: true });
  }

  // ---------- swipe between pages ----------
  var sx = 0, sy = 0, st = 0, swipeOk = false;
  doc.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { swipeOk = false; return; }
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; st = Date.now();
    var t = e.target;
    // not on things that scroll sideways or are being selected
    swipeOk = !(t.closest && t.closest('input, textarea, select, table, svg, canvas, .katex-display, .math-nav-tabs, .no-swipe, .sba'));
  }, { passive: true });
  doc.addEventListener('touchend', function (e) {
    if (!swipeOk || !cfg.paginate || units.length < 2) return;
    var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    var sel = window.getSelection && String(window.getSelection());
    if (sel) return;
    if (Date.now() - st < 700 && Math.abs(dx) > 70 && Math.abs(dy) < Math.abs(dx) * 0.5) {
      var rtl = doc.dir === 'rtl' || html.dir === 'rtl';
      if ((dx < 0) !== rtl) api.next(); else api.prev();
    }
  }, { passive: true });

  // ---------- public API ----------
  var api = {
    __v: 1,
    setMode: function (o) { cfg = Object.assign(cfg, o || {}); lastKey = ''; refresh(); },
    state: state,
    go: function (n) { show(n, n >= cur ? 24 : -24); },
    next: function () { if (cur < units.length - 1) show(cur + 1, 24); else host('onAction', ['end', '']); },
    prev: function () { if (cur > 0) show(cur - 1, -24); else host('onAction', ['start', '']); },
    pageText: function () {
      var u = units[cur] || root();
      return u ? (u.innerText || '').replace(/\n{3,}/g, '\n\n').trim() : '';
    },
    // the arcade: fifteen games made from the text of the page on screen (the website's own js/sb_arcade.js, same coins as on the web)
    openGames: function () {
      if (!window.SBArcade) { host('onAction', ['error', 'Games did not load. Check your connection.']); return false; }
      try { window.SBArcade.open(units[cur] || root() || document.body); return true; } catch (e) { host('onAction', ['error', String(e && e.message || e)]); return false; }
    },
    gamesBack: function () { if (window.SBArcade && window.SBArcade.current) window.SBArcade.back(); else host('onAction', ['gamesClosed', '']); },
    closeGames: function () { if (window.SBArcade) window.SBArcade.close(); },
    selectedText: function () { return String(window.getSelection ? window.getSelection() : '').trim(); },
    setTextZoom: function (pct) { html.style.fontSize = pct + '%'; },
    clickTab: function (label) {
      // the same whitespace as tabs() reports, so a label read from tabs() always finds its button
      var want = String(label).replace(/\s+/g, ' ').trim();
      var b = $$('.math-nav-tabs button, .topic-sub-tabs-bar button').find(function (x) { return (x.textContent || '').replace(/\s+/g, ' ').indexOf(want) >= 0; });
      if (b) b.click();
      return !!b;
    },
    tabs: function () { return $$('.math-nav-tabs button').map(function (b) { return (b.textContent || '').replace(/\s+/g, ' ').trim(); }); },

    // Open a chapter exactly the way the website's own search does: openSubject, then the chapter's button.
    open: async function (classId, subjectId, call, startPage, tab) {
      var token = ++opening;
      lastKey = ''; units = []; cur = 0; pendingStart = startPage >= 0 ? startPage : 0;
      var fn = await until(function () { return typeof window.openSubject === 'function'; }, 20000, 100);
      if (!fn || token !== opening) { host('onAction', ['error', 'The book did not load. Check your connection.']); return false; }
      try { window.openSubject(classId, subjectId); } catch (e) { host('onAction', ['error', String(e && e.message || e)]); return false; }
      if (call) {
        var btn = await until(function () {
          return $$('[onclick]').find(function (e) { return e.getAttribute('onclick') === call; });
        }, 12000, 100);
        if (token !== opening) return false;
        if (btn) btn.click();
        else if (/^[A-Za-z_]+\([\w\s,'"\-.]*\)$/.test(call)) { try { (new Function(call))(); } catch (e) { /* the subject opens on its first chapter */ } }
      }
      // The website's loading overlay (sb_loading.js) holds a click on a chapter for a moment and replays it later, so the chapter is not
      // open yet when the click returns: the old chapter's pages are still on screen. A tab clicked then belongs to the old chapter's tab
      // strip (its buttons carry the chapter number), and the website replays that click later on a button that is gone, which drew the old
      // chapter's exercises under the new chapter's title. So wait until the tab strip is the requested chapter's.
      var want = /selectSubjectChapter\(\s*'[^']*'\s*,\s*(\d+)/.exec(call || '') || /selectMathChapter\(\s*(\d+)/.exec(call || '');
      if (want) {
        var stripChapter = function () {
          var b = $('.math-nav-tabs button'), m = b && /switchSubjectTab\([^,]*,[^,]*,\s*(\d+)/.exec(b.getAttribute('onclick') || '');
          return m ? +m[1] : -1;                                  // -1: a tab strip that does not carry the chapter, nothing to wait for
        };
        await until(function () { var c = stripChapter(); return c < 0 || c === +want[1]; }, 8000, 100);
        if (token !== opening) return false;
      }
      await until(function () { var c = collect(); return c.units.length || (root() && root().children.length); }, 12000, 120);
      observe(); refresh();
      // a saved place also names the tab (Lessons, Exercises ...): the same words the website stores, without the emoji
      var clean = function (t) { return String(t || '').replace(/[^A-Za-z0-9 _-]/g, '').trim(); };
      if (tab && clean(activeTab()) !== clean(tab)) {
        var tb = $$('.math-nav-tabs button, .topic-sub-tabs-bar button').find(function (x) { return clean(x.textContent) === clean(tab); });
        if (tb && token === opening) {
          pendingStart = startPage >= 0 ? startPage : 0;
          tb.click();
          await wait(250);
          await until(function () { return collect().units.length; }, 5000, 120);
          refresh();
        }
      }
      return true;
    },
    openPage: async function (name) {
      lastKey = ''; units = []; opening++;
      var link = await until(function () { return $('.nav-link[data-page="' + name + '"]'); }, 20000, 100);
      if (!link) { host('onAction', ['error', 'This section did not load.']); return false; }
      link.click();
      observe();
      await wait(300);
      refresh();
      return true;
    },

    // Home sends the student straight to one test (PST, CT, SST ...) on one of its tabs: practice | mock | mistakes | history | stats
    openTestPrep: async function (trackId, tab) {
      var ok = await api.openPage('tests-preps');
      if (!ok) return false;
      var tp = await until(function () { return window.SBTestPrep && typeof window.SBTestPrep.open === 'function'; }, 20000, 100);
      if (!tp) { host('onAction', ['error', 'Tests Preps did not load.']); return false; }
      try { await window.SBTestPrep.open(trackId); if (tab && tab !== 'practice') window.SBTestPrep.tab(tab); } catch (e) { host('onAction', ['error', String(e && e.message || e)]); return false; }
      return true;
    },

    // ... or straight to one study plan
    openPlan: async function (planId) {
      var ok = await api.openPage('study-plan');
      if (!ok) return false;
      var btn = await until(function () { return $('.spx-card[data-id="' + planId + '"] [data-act="open"]'); }, 15000, 120);
      if (btn) btn.click();
      return !!btn;
    },

    // ... or deletes one (Home asked the student first). The website's own removePlan does it, so a signed-in student's deletion
    // also reaches the account and the plan does not come back with the next sync. Reports ("done", text) when finished.
    deletePlan: async function (planId) {
      if (!(await api.openPage('study-plan'))) return false;
      var sp = await until(function () { return window.SBStudyPlan && typeof window.SBStudyPlan.removePlan === 'function'; }, 20000, 100);
      if (!sp) { host('onAction', ['error', 'Study plans did not load.']); return false; }
      var syncs = false;
      try { syncs = !!(window.SBSync && window.SBSync.isEnabled && window.SBSync.isEnabled()); } catch (e) { /* sync not loaded */ }
      if (syncs) await wait(1500);                       // the sign-in reaches the page a moment after it loads; a deletion before that stays on this phone only
      var find = function () { return window.SBStudyPlan.plans().find(function (p) { return p.id === planId; }); };
      var stored = function () {
        try { return (JSON.parse(localStorage.getItem('sb_study_plans_v1') || '[]') || []).some(function (p) { return p && p.id === planId; }); } catch (e) { return false; }
      };
      // the page reads its plans from storage as it starts, so a plan that is stored is found at once; give it a moment, never a long wait
      var plan = find() || (stored() ? await until(find, 2500, 150) : null);
      if (!plan && stored()) { host('onAction', ['error', 'That plan could not be deleted. Open it in Study Plan and use its delete button.']); return false; }
      if (plan) {
        try { window.SBStudyPlan.removePlan(plan); } catch (e) { host('onAction', ['error', String(e && e.message || e)]); return false; }
        if (syncs) await wait(1500);                     // time for the deletion to be written to the sync outbox
      }
      host('onAction', ['done', plan ? 'Plan deleted' : 'That plan was already gone']);
      return true;
    },

    // Home's My Vocabulary sets the student's word marks back to zero (Home asked the student first). The website's own SBWordStats.resetWords
    // clears the stored record and the synced "word" items, so a signed-in student's marks do not come back with the next sync.
    // Reports ("done", text) when finished.
    resetWords: async function () {
      var w = await until(function () { return window.SBWordStats && typeof window.SBWordStats.resetWords === 'function'; }, 20000, 100);
      if (!w) { host('onAction', ['error', 'The vocabulary did not load.']); return false; }
      // the marks are kept under the student's own id: let the page learn who is signed in (the session cookie the app shares with it) before clearing
      await until(function () { return window.SpaceBookAuth && window.SpaceBookAuth.user; }, 2500, 100);
      var syncs = false;
      try { syncs = !!(window.SBSync && window.SBSync.isEnabled && window.SBSync.isEnabled()); } catch (e) { /* sync not loaded */ }
      if (syncs) await wait(1500);                       // the sign-in reaches the page a moment after it loads; clearing before that would stay on this phone only
      var n = 0;
      try { n = await window.SBWordStats.resetWords({ ask: false }); } catch (e) { host('onAction', ['error', String(e && e.message || e)]); return false; }
      if (syncs) await wait(1500);                       // time for the deletions to be written to the sync outbox
      host('onAction', ['done', n ? 'Vocabulary reset' : 'There was nothing to reset']);
      return true;
    },

    // Home's Project Stats sends the student to the website's Grammar Stats page on one language (en | ur | ps | ar)
    openGrammar: async function (lang) {
      if (!(await api.openPage('grammar-stats'))) return false;
      var g = await until(function () { return window.SBGrammar && typeof window.SBGrammar.open === 'function'; }, 20000, 100);
      if (!g) { host('onAction', ['error', 'Grammar Stats did not load.']); return false; }
      window.SBGrammar.open(lang || 'en');
      return true;
    },

    // The website's own suggest / report-a-problem dialog (js/sb_feedback.js), filled in with the class, subject, chapter and page on screen.
    openFeedback: async function () {
      var fb = await until(function () { return window.SBFeedback && window.SBFeedback.open; }, 20000, 100);
      if (!fb) { host('onAction', ['error', 'The report form did not load.']); return false; }
      window.SBFeedback.open({});
      return true;
    },

    // The website's own account dialog (js/auth.js): the same details, password change, data download and deletion as on the web.
    openAccount: async function () {
      var auth = await until(function () { return window.SpaceBookAuth && window.SpaceBookAuth.openAccount; }, 20000, 100);
      if (!auth) { host('onAction', ['error', 'The account page did not load.']); return false; }
      // the page learns who is signed in from the session cookie the app shares with it: wait a moment for that answer
      await until(function () { return window.SpaceBookAuth.user; }, 6000, 100);
      if (!window.SpaceBookAuth.user) { host('onAction', ['auth', '']); return false; }
      window.SpaceBookAuth.openAccount();
      return true;
    },

    // The app signed in (or out): tell the page so rewards, plans and tests sync to the same account.
    setAuth: async function (user, device, flags) {
      // The page follows the owner's one switch (api/lib/flags.php), exactly as the website does: this does not switch sync on by itself.
      var sync = await until(function () { return window.SBSync; }, 15000, 150);
      try { if (sync && sync.setServerFlags && flags) sync.setServerFlags(flags); } catch (e) { /* storage blocked */ }
      try { if (sync && sync.setDevice && user && device) await sync.setDevice(user.id, device); } catch (e) { /* falls back to the cookie */ }
      doc.dispatchEvent(new CustomEvent('spacebook:auth', { detail: { user: user || null } }));
    },
    clearAuth: function () { doc.dispatchEvent(new CustomEvent('spacebook:auth', { detail: { user: null } })); },
  };
  window.SBApp = api;

  // a file the page wants the student to keep (the data download): a blob link cannot be saved in a WebView, so the phone's share sheet gets it
  window.SBDownload = function (name, mime, text) { host('onAction', ['saveFile', JSON.stringify({ name: String(name), mime: String(mime), text: String(text) })]); };
  // the account was deleted (or the session ended) inside the page: the app signs out too
  var hadUser = false;
  doc.addEventListener('spacebook:auth', function (e) {
    var u = e.detail && e.detail.user;
    if (u) hadUser = true;
    else if (hadUser) { hadUser = false; host('onAction', ['signedOut', '']); }
  });

  // ---------- meanings: tap a sentence, hold a word ----------
  // Both open a native pop-up in the app (with speaker buttons). The listeners sit on `window` in the capture phase, so they run
  // before every handler the website registered: the page is never re-rendered, never jumps, and no drawer opens inside the page.
  var ORDER = ['en', 'ur', 'ps', 'ar'];
  var SPLIT = /(?<=[.!?؟۔])\s+(?=\S)/;
  var norm = function (x) { return String(x == null ? '' : x).replace(/\s+/g, ' ').trim(); };
  var seq = 0;
  var T = function () { return window.SBTranslate; };
  // each book family names its classes with its own prefix (m5-s, m6-s, c1-s ...): match by the ending
  var SENT_RX = /(?:^|\s)[a-z]+\d*-s(?:\s|$)/, TR_RX = /(?:^|\s)[a-z]+\d*-tr(?:\s|$)/;
  function sentenceElOf(t) {
    for (var e = t; e && e !== doc.body; e = e.parentElement) {
      if (e.classList && (e.classList.contains('lesson-sentence') || e.classList.contains('sb-tri-target'))) return e;
      if (e.nodeType === 1 && typeof e.className === 'string' && SENT_RX.test(e.className) && e.hasAttribute('onclick')) return e;
    }
    return null;
  }
  function detect(text) {
    try { if (T() && T().detectLang) return T().detectLang(text).lang; } catch (e) { /* fall through */ }
    return /[؀-ۿ]/.test(text) && !/[A-Za-z]/.test(text) ? 'ur' : 'en';
  }
  function ownText(el) {
    var c = el.cloneNode(true);
    $$('.sb-tri-drawer, [id^="sent-trans-"], .m6-tr, button, script, style, .katex-mathml, .sb-solve, .sb-ans', c).forEach(function (n) { n.remove(); });
    return norm(c.textContent);
  }
  function plain(v) {            // a translation may be {html} (maths): keep the words
    if (v && typeof v === 'object' && v.html) { var d = doc.createElement('div'); d.innerHTML = v.html; return norm(d.textContent); }
    return typeof v === 'string' ? norm(v) : '';
  }
  // the website's "translation available" placeholders are not translations
  var PLACEHOLDER = /^(اردو ترجمہ دستیاب ہے۔|د پښتو ژباړه شتون لري\.)$/;
  var clean = function (v) { v = plain(v); return v && !PLACEHOLDER.test(v) ? v : ''; };

  function caretAt(x, y) {
    var node, off;
    if (doc.caretRangeFromPoint) { var r = doc.caretRangeFromPoint(x, y); if (!r) return null; node = r.startContainer; off = r.startOffset; }
    else if (doc.caretPositionFromPoint) { var p = doc.caretPositionFromPoint(x, y); if (!p) return null; node = p.offsetNode; off = p.offset; }
    else return null;
    return node && node.nodeType === 3 ? { node: node, off: off } : null;
  }
  // the word under a finger (letters, apostrophes and hyphens), or null when the finger is not really on a word
  var WORD_CH = /[\p{L}\p{M}'’-]/u;
  function wordAt(x, y) {
    var c = caretAt(x, y); if (!c) return null;
    var owner = c.node.parentElement; if (!owner || owner.closest('input, textarea, select, script, style, .katex, .ut-root')) return null;
    var t = c.node.data, a = c.off, b = c.off;
    while (a > 0 && WORD_CH.test(t[a - 1])) a--;
    while (b < t.length && WORD_CH.test(t[b])) b++;
    var word = t.slice(a, b).replace(/^['’-]+|['’-]+$/g, '');
    if (!word || !/\p{L}/u.test(word)) return null;
    var range = doc.createRange(); range.setStart(c.node, a); range.setEnd(c.node, b);
    var rc = range.getBoundingClientRect();
    if (!rc || x < rc.left - 6 || x > rc.right + 6 || y < rc.top - 6 || y > rc.bottom + 6) return null;
    return { word: word, el: owner };
  }
  // the sentence around a finger: the block of text it is in, cut at . ! ? ؟ ۔
  var BLOCK = 'p, li, td, th, dd, dt, h1, h2, h3, h4, h5, h6, figcaption, blockquote, div';
  function sentenceAt(x, y) {
    var c = caretAt(x, y); if (!c) return null;
    var el = c.node.parentElement; if (!el || el.closest('input, textarea, select, script, style, .katex, .ut-root')) return null;
    var block = el.closest(BLOCK) || el;
    var r = doc.createRange(); r.setStart(block, 0); r.setEnd(c.node, c.off);
    var before = norm(r.toString()).length;
    var full = ownText(block); if (!full) return null;
    var parts = full.split(SPLIT), acc = 0, idx = parts.length - 1;
    for (var i = 0; i < parts.length; i++) { acc += parts[i].length + 1; if (before < acc) { idx = i; break; } }
    var text = norm(parts[idx]);
    return text.split(' ').length >= 2 ? { text: text, src: detect(text), map: {} } : null;
  }

  // what the page already knows about the sentence element that was tapped (its book translations)
  function fromSentenceEl(el, x, y) {
    var text, src, map = {};
    if (!el.classList.contains('lesson-sentence') && !el.classList.contains('sb-tri-target')) {
      var panel = el.nextElementSibling;
      if (panel && typeof panel.className === 'string' && TR_RX.test(panel.className)) $$('p[lang]', panel).forEach(function (p) {
        var cp = p.cloneNode(true), lab = cp.querySelector('[class*="-lang"]'); if (lab) lab.remove();
        var v = clean(cp.textContent); if (v) map[p.getAttribute('lang')] = v;
      });
      text = ownText(el);
      src = ORDER.indexOf(el.getAttribute('lang')) >= 0 ? el.getAttribute('lang') : detect(text);
    } else if (el.classList.contains('lesson-sentence')) {
      text = ownText(el);
      var d = el.dataset;
      ORDER.forEach(function (l) { var v = clean(d[l]); if (v) map[l] = v; });
      src = ORDER.indexOf(d.sourceLanguage) >= 0 ? d.sourceLanguage : detect(text);
    } else if (el.classList.contains('sb-tri-target') && el._sbTriBoxes && el._sbTriBoxes[0] && el._sbTriBoxes[0]._sbTri) {
      var info = el._sbTriBoxes[0]._sbTri;
      ORDER.forEach(function (l) { var v = clean(info.map[l]); if (v) map[l] = v; });
      src = info.src || 'en';
      text = map[src] || ownText(el);
      // a paragraph whose versions have the same number of sentences: only the tapped sentence
      var counts = ORDER.map(function (l) { return map[l] ? map[l].split(SPLIT).length : 0; }).filter(Boolean);
      if (counts.length > 1 && counts.every(function (n) { return n === counts[0]; }) && counts[0] > 1) {
        var own = ownText(el), parts = own.split(SPLIT), pick = parts.length - 1;
        var c = caretAt(x, y);
        if (c && el.contains(c.node)) {
          var rr = doc.createRange(); rr.setStart(el, 0); rr.setEnd(c.node, c.off);
          var at = norm(rr.toString()).length, acc = 0;
          for (var i = 0; i < parts.length; i++) { acc += parts[i].length + 1; if (at < acc) { pick = i; break; } }
        }
        ORDER.forEach(function (l) { if (map[l]) { var ps = map[l].split(SPLIT); map[l] = ps[Math.min(pick, ps.length - 1)]; } });
        text = map[src] || text;
      }
    } else return null;
    text = norm(text);
    if (!text) return null;
    map[src] = text;
    return { text: text, src: src, map: map };
  }

  // Tells the app what to show now, then fills the languages the page does not hold from the offline lexicon (SBTranslate).
  function post(kind, text, src, map, langs) {
    var id = ++seq;
    var rows = langs.map(function (l) { return { lang: l, text: map[l] || '', pending: !map[l] }; });
    host('onAction', ['meaning', JSON.stringify({ id: id, kind: kind, text: text, src: src, rows: rows })]);
    rows.filter(function (r) { return r.pending; }).forEach(function (r) {
      var done = false;
      var finish = function (t, approx) { if (done) return; done = true; host('onAction', ['meaningUpdate', JSON.stringify({ id: id, lang: r.lang, text: t || '', approx: !!approx })]); };
      try {
        if (!T() || !T().translate) return finish('');
        setTimeout(function () { finish(''); }, 7000);
        T().translate(text, src, r.lang, true).then(function (res) {
          finish(res && res.text, res && (res.source === 'machine' || res.source === 'gloss' || res.source === 'pivot'));
        }, function () { finish(''); });
      } catch (e) { finish(''); }
    });
  }

  function showSentence(info) {
    var langs = ['en', 'ur', 'ps'];
    if (info.src === 'ar' || info.map.ar) langs.push('ar');
    post('sentence', info.text, info.src, info.map, langs);
  }
  function showWord(w) {
    var map = {}, src = detect(w.word);
    var key = w.el.closest && w.el.closest('[data-w]');
    if (key && key.dataset) {                           // a book word: its own meaning from the glossary of that book
      var l1 = key.dataset.l1 || 'ur', l2 = key.dataset.l2 || 'ps';
      if (clean(key.dataset.ur)) map[l1] = clean(key.dataset.ur);
      if (clean(key.dataset.ps)) map[l2] = clean(key.dataset.ps);
      var fn = /([A-Za-z0-9_]+Word)\(this/.exec(key.getAttribute('onclick') || '');
      fn = fn && window[fn[1]];
      if (!map[l1] && typeof fn === 'function') {       // let the page's own function look it up, but do not show its dialog
        var orig = HTMLDialogElement.prototype.showModal;
        try {
          HTMLDialogElement.prototype.showModal = function () { };
          fn(key, { preventDefault: function () { }, stopPropagation: function () { } });
          var dlg = doc.querySelector('dialog[id$="-word"]');
          if (dlg) $$('p[lang]', dlg).forEach(function (p) {
            var cp = p.cloneNode(true), st = cp.querySelector('strong'); if (st) st.remove();
            var v = clean(cp.textContent); if (v) map[p.getAttribute('lang')] = v;
          });
        } catch (e) { /* the offline lexicon covers it */ }
        finally { HTMLDialogElement.prototype.showModal = orig; }
      }
    }
    map[src] = w.word;
    post('word', w.word, src, map, ORDER);
  }

  // the elements that mean something when tapped; everything else the page does itself
  var KEEP_SEL = 'a, button, input, select, textarea, summary, label, [role="tab"], .math-acc-header, .math-nav-tabs, .topic-sub-tabs-bar, .category-sub-tabs-bar, .sb-ans, .sb-page-tabs, .sbp-bar, .m6-tools, .vocab-card, dialog, .sb-tri-drawer';
  var swallowUntil = 0;
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    // Only a finger is a tap on a sentence. A click made by code (this bridge opening a collapsed page's heading, the page's own scripts)
    // arrives at (0, 0): whenever some text sat in that corner it was taken for a tap there, swallowed, and the page stayed collapsed
    // with a meaning pop-up nobody asked for.
    if (!e.isTrusted) return;
    if (Date.now() < swallowUntil) { e.preventDefault(); e.stopImmediatePropagation(); return; }     // the release of a long-press
    if (!cfg.paginate) return;                                                                        // only on book pages
    var sel = window.getSelection && window.getSelection(); if (sel && !sel.isCollapsed) return;
    var info = null, se = sentenceElOf(t);
    if (!se && t.closest(KEEP_SEL)) return;
    // A button inside a sentence is still a button: "Ans" / "جواب" is placed right after the sentence it answers, inside that sentence's
    // element, and its tap was taken for a tap on the sentence (a meaning pop-up, the answer never opened).
    var btn = se && t.closest('button, .sb-ans');
    if (btn && btn !== se && se.contains(btn)) return;
    if (se) info = fromSentenceEl(se, e.clientX, e.clientY);
    if (!info) {                                                                                      // any other text of the page
      if (!t.closest('#subjTabContent, #mathTabContent, #page-content')) return;
      var oc = t.closest('[onclick]'); if (oc && !sentenceElOf(oc)) return;                   // something clickable that is not text
      info = sentenceAt(e.clientX, e.clientY);
    }
    if (!info) return;
    e.preventDefault(); e.stopImmediatePropagation();
    showSentence(info);
  }, true);

  var hold = null;
  function cancelHold() { if (hold) { clearTimeout(hold.t); hold = null; } }
  window.addEventListener('pointerdown', function (e) {
    cancelHold();
    if (e.pointerType === 'mouse' || !e.isPrimary || !cfg.paginate) return;
    var t = e.target; if (!t || !t.closest || t.closest('input, textarea, select, svg, canvas, .katex, .math-nav-tabs, button, a, .sba')) return;
    var x = e.clientX, y = e.clientY;
    hold = { x: x, y: y, t: setTimeout(function () {
      hold = null;
      var w = wordAt(x, y); if (!w) return;
      swallowUntil = Date.now() + 700;
      try { window.getSelection().removeAllRanges(); } catch (e2) { /* nothing selected */ }
      host('onAction', ['haptic', '']);
      showWord(w);
    }, 450) };
  }, true);
  window.addEventListener('pointermove', function (e) { if (hold && Math.hypot(e.clientX - hold.x, e.clientY - hold.y) > 12) cancelHold(); }, true);
  ['pointerup', 'pointercancel'].forEach(function (n) { window.addEventListener(n, cancelHold, true); });
  window.addEventListener('scroll', cancelHold, true);
  window.addEventListener('contextmenu', function (e) { e.preventDefault(); }, true);          // no system menu on a long press

  // Printing a paper (and saving it as a PDF): a WebView's window.print() does nothing, so the phone's own print dialog is asked for instead
  try { window.print = function () { host('onAction', ['print', '']); }; } catch (e) { /* the page keeps its own print */ }

  // The website's own sign-in / sign-up buttons open the app's screen instead.
  doc.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-auth-open], .auth-open, #authBtn, #loginBtn');
    if (t) { e.preventDefault(); e.stopPropagation(); host('onAction', ['auth', '']); }
  }, true);

  // The app is its own offline layer (SiteStore answers every file from the phone), so the website's service worker is not wanted:
  // remove one an earlier version of the app may have registered, and the caches it made.
  try {
    if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) navigator.serviceWorker.getRegistrations().then(function (rs) { rs.forEach(function (r) { r.unregister(); }); });
    if (window.caches && caches.keys) caches.keys().then(function (ks) { ks.forEach(function (k) { caches.delete(k); }); });
  } catch (e) { /* not available: nothing to remove */ }

  // "Ans": the website types a solution out one step at a time. In the app the whole solution shows at once, the moment it opens
  // (the page's own "Show all" does the work, so languages, equations and the Animate button are untouched).
  try {
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var added = muts[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var n = added[j]; if (n.nodeType !== 1) continue;
          var ctl = n.matches && n.matches('.sbs-ctl') ? n : (n.querySelector ? n.querySelector('.sbs-ctl') : null);
          if (!ctl || ctl.getAttribute('data-sbapp-all')) continue;
          ctl.setAttribute('data-sbapp-all', '1');
          var all = ctl.querySelector('[data-a="all"]'); if (all) all.click();
        }
      }
    }).observe(doc.body, { childList: true, subtree: true });
  } catch (e) { /* the solution still plays step by step */ }

  doc.addEventListener('visibilitychange', function () { if (!doc.hidden) schedule(); });
  observe();
  host('onReady', {});
})();
