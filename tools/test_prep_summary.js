#!/usr/bin/env node
/* Checks assets/prep_summary.js without a phone: a fake localStorage holds a student's Tests Preps record and study plans, and the
 * summary the native Home would get is compared with what is expected.   node tools/test_prep_summary.js */
'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const src = fs.readFileSync(path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'prep_summary.js'), 'utf8');
const tests = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'prep_tests.json'), 'utf8'));
const DAY = 86400000;
const NOW = new Date(2026, 9, 23, 11, 0).getTime();                       // 23 Oct 2026, 11:00 local
const pad = n => String(n).padStart(2, '0');
const ymd = t => { const d = new Date(t); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
const day = k => ymd(NOW - k * DAY);

function run(store, hints) {
  const window = { localStorage: { get length() { return Object.keys(store).length; }, key: i => Object.keys(store)[i], getItem: k => (k in store ? store[k] : null) } };
  new Function('window', src)(window);
  return JSON.parse(window.SBPrepSummary(hints || [], tests, NOW));
}

// ---- nothing started
let r = run({});
assert.deepStrictEqual([r.tests.tests.length, r.plans.length, r.tests.totals.questions], [0, 0, 0]);

// ---- tests: PST (practice + mock) and SST General, for a signed-in student, plus a guest record that must be ignored
const pst = day(1), sst = day(0);
const record = {
  v: 1, updatedAt: NOW,
  sessions: [
    { id: 'a', track: 'pst', mode: 'practice', ts: NOW - 3 * DAY, n: 20, c: 14, ms: 600000 },
    { id: 'b', track: 'pst', mode: 'mock', ts: NOW - DAY, n: 50, c: 35, ms: 3000000 },
    { id: 'c', track: 'sst-gen', mode: 'practice', ts: NOW - 3600000, n: 10, c: 9, ms: 300000 },
  ],
  days: {
    pst: { [day(3)]: [600000, 20, 14], [pst]: [3000000, 50, 35] },
    'sst-gen': { [sst]: [300000, 10, 9] },
    all: { [day(3)]: [600000, 20, 14], [pst]: [3000000, 50, 35], [sst]: [300000, 10, 9] },
  },
  run: { track: 'ct', finished: false },
};
const store = { 'sbTP:v1:ayesha@x.pk': JSON.stringify(record), 'sbTP:v1:guest': JSON.stringify({ updatedAt: 1, sessions: [{ track: 'dm', mode: 'practice', ts: 1, n: 1, c: 1 }], days: {} }) };
r = run(store, ['12', 'ayesha@x.pk']);
assert.strictEqual(r.tests.key, 'sbTP:v1:ayesha@x.pk');
assert.deepStrictEqual(r.tests.tests.map(t => t.id), ['sst-gen', 'pst', 'ct'], 'newest first; a running test counts as started');
const p = r.tests.tests.find(t => t.id === 'pst');
assert.deepStrictEqual([p.title, p.sessions, p.practice, p.mock, p.questions, p.correct, p.minutes, p.bestMock], ['PST', 2, 1, 1, 70, 49, 60, 70]);
assert.strictEqual(p.week.length, 14);
assert.strictEqual(p.week[13 - 1], 50, 'yesterday: 3000000 ms = 50 minutes');
assert.strictEqual(r.tests.tests.find(t => t.id === 'ct').running, true);
assert.deepStrictEqual([r.tests.totals.questions, r.tests.totals.correct, r.tests.totals.minutes, r.tests.totals.studyDays, r.tests.totals.streak], [80, 58, 65, 3, 2]);
assert.deepStrictEqual(r.tests.recent.map(x => x.track), ['sst-gen', 'pst', 'pst']);
// without a matching hint: guest, then the most recent record
assert.strictEqual(run(store, ['nobody']).tests.key, 'sbTP:v1:guest');
delete store['sbTP:v1:guest'];
assert.strictEqual(run(store, ['nobody']).tests.key, 'sbTP:v1:ayesha@x.pk');

// ---- study plans
const plan = {
  id: 'p1', name: 'Class 6 term 1', classId: 'cls6', start: day(10), end: ymd(NOW + 5 * DAY), updatedAt: 5,
  scope: [{ subj: 'cls6-math', ch: [0, 1, 2] }, { subj: 'cls6-eng', ch: [0] }],
  sessions: [
    { id: 's1', date: day(2), from: '16:00', to: '17:00', tasks: [{ cat: 'read', n: 2, done: 2 }, { cat: 'mcq', n: 20, done: 20 }] },          // finished
    { id: 's2', date: day(1), from: '16:00', to: '17:00', tasks: [{ cat: 'read', n: 2, done: 1 }, { cat: 'sq', n: 4, done: 0 }] },            // missed work
    { id: 's3', date: day(0), from: '09:00', to: '10:00', tasks: [{ cat: 'read', n: 1, done: 0 }] },                                           // today, already ended (it is 11:00)
    { id: 's4', date: day(0), from: '17:00', to: '18:00', tasks: [{ cat: 'mcq', n: 10, done: 4 }, { cat: 'tf', n: 6, done: 0 }] },            // today, still to come
    { id: 's5', date: ymd(NOW + DAY), from: '17:00', to: '18:00', tasks: [{ cat: 'lq', n: 2, done: 0 }] },
  ],
};
const other = { id: 'p2', name: 'Weekend revision', classId: 'cls9', start: day(0), end: ymd(NOW + 9 * DAY), updatedAt: 9, scope: [{ subj: 'cls9-phy', ch: [1] }],
  sessions: [{ id: 't1', date: day(0), from: '20:00', to: '21:00', tasks: [{ cat: 'read', n: 1, done: 0 }] }] };
r = run({ sb_study_plans_v1: JSON.stringify([plan, other]) });
assert.deepStrictEqual(r.plans.map(x => x.id), ['p2', 'p1'], 'most recently changed first');
const q = r.plans.find(x => x.id === 'p1');
// minutes: s1 = 2*20 + 20*1.5 = 70 (all done); s2 = 40 + 20 = 60 (20 done); s3 = 20 (0); s4 = 15 + 6 = 21 (6 done); s5 = 30 (0)
assert.deepStrictEqual([q.pct, q.items, q.itemsDone], [Math.round(100 * (70 + 20 + 6) / (70 + 60 + 20 + 21 + 30)), 47, 27]);
assert.deepStrictEqual([q.todayTasks, q.todayMinutes, q.todayItemsLeft], [3, 35, 13], 'today: the ended 09:00 session and the 17:00 one');
assert.strictEqual(q.pending, 3, 'unfinished work of sessions that have ended (s2 twice, s3)');
assert.deepStrictEqual([q.nextDate, q.nextFrom, q.nextTo, q.daysLeft], [day(0), '17:00', '18:00', 5]);
assert.deepStrictEqual([q.sessions, q.sessionsDone], [5, 1]);
assert.deepStrictEqual(q.subjects, [{ id: 'cls6-math', chapters: 3 }, { id: 'cls6-eng', chapters: 1 }]);
assert.deepStrictEqual(q.byCat.read, { n: 5, done: 3 });
// a record that cannot be read is ignored, not fatal
assert.deepStrictEqual(run({ sb_study_plans_v1: '{broken', 'sbTP:v1:guest': 'x' }).plans, []);

// ---- words marked in the Word Stats of the subjects, and what the phone holds
const mark = (s, ago) => ({ s, t: NOW - ago });
const words = {
  v: 1,
  words: {
    'en:apple': mark('l', 3600000), 'en:river': mark('l', 2 * DAY), 'en:mountain': mark('k', 20 * DAY),
    'ur:کتاب': mark('l', 3 * DAY), 'ur:قلم': mark('k', 40 * DAY), 'ps:کور': mark('l', 9 * DAY), 'xx:junk': mark('l', 1), 'ar:باب': null,
  },
};
const wstore = { 'sbWS:progress:ayesha@x.pk': JSON.stringify(words), 'sbWS:progress:guest': JSON.stringify({ words: { 'en:cat': mark('l', 1000) } }), tuition_hub_study_stats: JSON.stringify({ studiedQuestions: 42 }) };
r = run(wstore, ['12', 'ayesha@x.pk']);
assert.deepStrictEqual([r.words.learnt, r.words.knew, r.words.total], [4, 2, 6]);
assert.deepStrictEqual([r.words.today, r.words.week], [1, 3], 'today: apple; last 7 days: apple, river, the Urdu word');
assert.deepStrictEqual(r.words.byLang.en, { learnt: 2, knew: 1 });
assert.deepStrictEqual(r.words.byLang.ur, { learnt: 1, knew: 1 });
assert.deepStrictEqual(r.words.byLang.ps, { learnt: 1, knew: 0 });
assert.deepStrictEqual(r.words.byLang.ar, { learnt: 0, knew: 0 });
assert.strictEqual(r.usage.studiedQuestions, 42);
assert.strictEqual(r.usage.keys, 3);
assert.ok(r.usage.bytes > 100);
// a student without a record of their own gets the guest record (as the website does), never somebody else's
assert.strictEqual(run(wstore, ['nobody']).words.total, 1);
delete wstore['sbWS:progress:guest'];
assert.deepStrictEqual([run(wstore, ['nobody']).words.total, run(wstore, []).words.total], [0, 0]);
assert.strictEqual(run({}).usage.keys, 0);
// --sample writes what the native Home reads (the Kotlin test PrepModelsTest decodes this file, so the two sides cannot drift apart)
if (process.argv.includes('--sample')) {
  const out = path.join(__dirname, '..', 'app', 'src', 'test', 'resources', 'prep_sample.json');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const sample = { 'sbTP:v1:ayesha@x.pk': JSON.stringify(record), sb_study_plans_v1: JSON.stringify([plan, other]), 'sbWS:progress:ayesha@x.pk': JSON.stringify(words), tuition_hub_study_stats: JSON.stringify({ studiedQuestions: 42 }) };
  fs.writeFileSync(out, JSON.stringify(run(sample, ['ayesha@x.pk']), null, 1));
  console.log('wrote', out);
}
console.log('prep summary ok');
