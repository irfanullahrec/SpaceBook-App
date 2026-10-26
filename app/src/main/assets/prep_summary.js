/* Runs inside a tiny page of the website's own address, so it can read what the student has done on the website (Tests Preps and
 * Study Plans, kept in this app's browser storage) and hand the native Home one JSON summary.
 *
 *   SBPrepSummary(hints, nowMillis) -> JSON string
 *     hints: names the website may have used for the signed-in student's test record ("sbTP:v1:<id|email|name>"), lower case;
 *            "guest" is tried after them, then the most recently used record.
 *
 * Reads, never writes:  sbTP:v1:<user>  (js/test_prep.js)    sb_study_plans_v1  (js/sb_study_plan.js)
 *                       sbWS:progress:<user>  (js/word_stats.js)    tuition_hub_study_stats  (js/app.js)
 * Keep CAT_MIN in step with CATS in js/sb_study_plan.js (minutes a kind of work takes per item). */
(function () {
  'use strict';
  var CAT_MIN = { read: 20, slo: 3, mcq: 1.5, tf: 1, blank: 1, match: 2, sq: 5, lq: 15, num: 8, ex: 4 };
  var DAY = 86400000;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parseYmd(s) { var p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function mins(t) { var p = String(t).split(':'); return (+p[0]) * 60 + (+p[1] || 0); }
  function read(key, fallback) {
    try { var v = JSON.parse(window.localStorage.getItem(key) || 'null'); return v == null ? fallback : v; } catch (e) { return fallback; }
  }
  function allKeys() {
    var out = [];
    try { for (var i = 0; i < window.localStorage.length; i++) out.push(window.localStorage.key(i)); } catch (e) { /* storage blocked */ }
    return out;
  }

  function pickTestKey(hints) {
    var keys = allKeys().filter(function (k) { return k.indexOf('sbTP:v1:') === 0; });
    for (var i = 0; i < (hints || []).length; i++) {
      var k = 'sbTP:v1:' + String(hints[i]).toLowerCase();
      if (keys.indexOf(k) >= 0) return k;
    }
    if (keys.indexOf('sbTP:v1:guest') >= 0) return 'sbTP:v1:guest';
    var best = null, bestAt = -1;
    keys.forEach(function (k) { var d = read(k, null); var at = (d && d.updatedAt) || 0; if (at > bestAt) { best = k; bestAt = at; } });
    return best;
  }

  // minutes studied on each of the last [n] days, oldest first, from a {date: [ms, questions, correct]} record
  function lastDays(days, n, today) {
    var out = [];
    for (var i = n - 1; i >= 0; i--) {
      var rec = days && days[ymd(new Date(today.getTime() - i * DAY))];
      out.push(rec ? Math.round((rec[0] || 0) / 60000) : 0);
    }
    return out;
  }

  function streakOf(days, today) {
    var n = 0, d = new Date(today.getTime());
    if (!(days && days[ymd(d)] && days[ymd(d)][1] > 0)) d = new Date(d.getTime() - DAY);   // today may not have started yet
    while (days && days[ymd(d)] && days[ymd(d)][1] > 0) { n++; d = new Date(d.getTime() - DAY); }
    return n;
  }

  function summariseTests(hints, metaById, today) {
    var key = pickTestKey(hints);
    var db = key ? read(key, null) : null;
    var out = { key: key || '', tests: [], recent: [], totals: { questions: 0, correct: 0, minutes: 0, sessions: 0, studyDays: 0, streak: 0, todayQuestions: 0, todayCorrect: 0 }, week: [] };
    if (!db) return out;
    var sessions = Array.isArray(db.sessions) ? db.sessions : [], days = db.days || {};
    var by = {};
    function track(id) {
      return by[id] || (by[id] = { id: id, sessions: 0, practice: 0, mock: 0, questions: 0, correct: 0, ms: 0, last: 0, bestMock: -1, week: [], running: false });
    }
    sessions.forEach(function (s) {
      if (!s || !s.track) return;
      var t = track(s.track);
      t.sessions++; if (s.mode === 'mock') t.mock++; else t.practice++;
      t.last = Math.max(t.last, s.ts || 0);
      if (s.mode === 'mock' && s.n > 0) t.bestMock = Math.max(t.bestMock, Math.round(100 * (s.c || 0) / s.n));
    });
    Object.keys(days).forEach(function (k) {
      if (k === 'all') return;
      var t = track(k), rec = days[k] || {};
      Object.keys(rec).forEach(function (date) { t.ms += rec[date][0] || 0; t.questions += rec[date][1] || 0; t.correct += rec[date][2] || 0; });
      t.week = lastDays(rec, 14, today);
    });
    if (db.run && db.run.track && !db.run.finished) track(db.run.track).running = true;
    var ids = Object.keys(by).filter(function (id) { var t = by[id]; return t.sessions || t.questions || t.running; });
    ids.sort(function (a, b) { return (by[b].last || 0) - (by[a].last || 0); });
    ids.forEach(function (id) {
      var t = by[id], m = metaById[id] || {};
      out.tests.push({
        id: id, title: m.title || id.toUpperCase(), fullName: m.fullName || '', emoji: m.emoji || '📝', color: m.color || '#5b4bff',
        sessions: t.sessions, practice: t.practice, mock: t.mock, questions: t.questions, correct: t.correct,
        minutes: Math.round(t.ms / 60000), last: t.last, bestMock: t.bestMock, week: t.week.length ? t.week : lastDays(null, 14, today), running: t.running,
      });
    });
    sessions.slice(-8).reverse().forEach(function (s) {
      if (!s || !s.track) return;
      var m = metaById[s.track] || {};
      out.recent.push({ track: s.track, title: m.title || s.track.toUpperCase(), mode: s.mode || 'practice', ts: s.ts || 0, n: s.n || 0, c: s.c || 0 });
    });
    var all = days.all || {};
    Object.keys(all).forEach(function (date) {
      var r = all[date]; out.totals.minutes += Math.round((r[0] || 0) / 60000); out.totals.questions += r[1] || 0; out.totals.correct += r[2] || 0;
      if ((r[1] || 0) > 0) out.totals.studyDays++;
    });
    out.totals.sessions = sessions.length;
    out.totals.streak = streakOf(all, today);
    var tr = all[ymd(today)];
    if (tr) { out.totals.todayQuestions = tr[1] || 0; out.totals.todayCorrect = tr[2] || 0; }          // for the News Feed's "my study today" post
    out.week = lastDays(all, 14, today);
    return out;
  }

  function summarisePlans(today, nowMin) {
    var plans = read('sb_study_plans_v1', []);
    if (!Array.isArray(plans)) plans = [];
    var t = ymd(today);
    var ended = function (s) { return s.date < t || (s.date === t && mins(s.to) <= nowMin); };
    return plans.filter(function (p) { return p && Array.isArray(p.sessions); }).map(function (p) {
      var all = 0, done = 0, items = 0, itemsDone = 0, todayTasks = 0, todayTasksDone = 0, todayMin = 0, todayItemsLeft = 0, pending = 0, byCat = {}, next = null, sessionsDone = 0;
      p.sessions.forEach(function (s) {
        var finished = true;
        (s.tasks || []).forEach(function (k) {
          if (k.cat === 'rev') { if (k.done < k.n) finished = false; return; }
          var m = CAT_MIN[k.cat] || 1, d = Math.min(k.done || 0, k.n);
          all += m * k.n; done += m * d; items += k.n; itemsDone += d;
          var c = byCat[k.cat] || (byCat[k.cat] = { n: 0, done: 0 }); c.n += k.n; c.done += d;
          if (d < k.n) finished = false;
          if (s.date === t) { todayTasks++; if (d >= k.n) todayTasksDone++; todayMin += m * (k.n - d); todayItemsLeft += k.n - d; }
          if (ended(s) && !s.revision && d < k.n) pending++;
        });
        if (finished && (s.tasks || []).length) sessionsDone++;
        if (!next && !ended(s)) next = s;
      });
      var end = p.end ? parseYmd(p.end) : null;
      return {
        id: p.id, name: p.name || 'Study plan', classId: p.classId || '', start: p.start || '', end: p.end || '',
        subjects: (p.scope || []).map(function (sc) { return { id: sc.subj, chapters: (sc.ch || []).length }; }),
        pct: all ? Math.round(done * 100 / all) : 0, items: items, itemsDone: itemsDone,
        todayTasks: todayTasks, todayTasksDone: todayTasksDone, todayMinutes: Math.round(todayMin), todayItemsLeft: todayItemsLeft, pending: pending,
        nextDate: next ? next.date : '', nextFrom: next ? next.from : '', nextTo: next ? next.to : '',
        daysLeft: end ? Math.max(0, Math.round((end.getTime() - parseYmd(t).getTime()) / DAY)) : 0,
        sessions: p.sessions.length, sessionsDone: sessionsDone, byCat: byCat, updatedAt: p.updatedAt || 0,
      };
    }).sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
  }

  // Words the student marked "I learnt it" (s:'l') or "I already knew it" (s:'k') in the Word Stats of a subject (js/word_stats.js):
  // "sbWS:progress:<id|email|name>" -> { words: { "<lang>:<word>": { s, t } } }. Only the student's own record is used, never another one's.
  function pickWordKey(hints) {
    var keys = allKeys().filter(function (k) { return k.indexOf('sbWS:progress:') === 0; });
    for (var i = 0; i < (hints || []).length; i++) {
      var k = 'sbWS:progress:' + String(hints[i]).toLowerCase();
      if (keys.indexOf(k) >= 0) return k;
    }
    return keys.indexOf('sbWS:progress:guest') >= 0 ? 'sbWS:progress:guest' : null;
  }

  function summariseWords(hints, today) {
    var out = { learnt: 0, knew: 0, today: 0, week: 0, total: 0, byLang: {} };
    ['en', 'ur', 'ps', 'ar'].forEach(function (l) { out.byLang[l] = { learnt: 0, knew: 0 }; });
    var key = pickWordKey(hints), rec = key ? read(key, null) : null;
    var words = (rec && rec.words) || {};
    var dayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime(), weekStart = dayStart - 6 * DAY;
    Object.keys(words).forEach(function (k) {
      var e = words[k], l = k.slice(0, 2);
      if (!e || !out.byLang[l]) return;
      if (e.s === 'l') { out.learnt++; out.byLang[l].learnt++; if (e.t >= dayStart) out.today++; if (e.t >= weekStart) out.week++; }
      else if (e.s === 'k') { out.knew++; out.byLang[l].knew++; }
    });
    out.total = out.learnt + out.knew;
    return out;
  }

  // what this phone holds for the Account page: drills answered anywhere, and the size of the site's saved data
  function summariseUsage() {
    var st = read('tuition_hub_study_stats', {}) || {}, bytes = 0, keys = 0;
    allKeys().forEach(function (k) {
      keys++;
      var v = ''; try { v = window.localStorage.getItem(k) || ''; } catch (e) { /* storage blocked */ }
      bytes += (k.length + v.length) * 2;
    });
    return { studiedQuestions: st.studiedQuestions || 0, bytes: bytes, keys: keys };
  }

  /** @param hints  ids/emails/names of the signed-in student   @param tests [{id,title,fullName,emoji,color}]   @param now epoch millis */
  window.SBPrepSummary = function (hints, tests, now) {
    var today = new Date(now || Date.now());
    var meta = {};
    (tests || []).forEach(function (m) { meta[m.id] = m; });
    var nowMin = today.getHours() * 60 + today.getMinutes();
    return JSON.stringify({
      today: ymd(today), tests: summariseTests(hints || [], meta, today), plans: summarisePlans(today, nowMin),
      words: summariseWords(hints || [], today), usage: summariseUsage(),
    });
  };
})();
