'use strict';
/* ==========================================================================
 * SpaceBook — Primary page-by-page learning renderer.
 *
 * Consumes a page model (js/english_1_pages.js) whose figures are INLINE
 * SVG vector art (js/primary_page_art.js) and turns each page into:
 *   1. Tap-to-name cards (reveal the word + initial sound, hear it spoken)
 *   2. An initial-sound quiz (which picture starts with this letter?)
 *   3. A "name five objects" collection activity
 * All activities are generated from the page data, not hard-coded per page.
 *
 * Deliberately decoupled from app.js: only reads the global page/art
 * registries and uses the browser SpeechSynthesis API for audio.
 * ========================================================================== */
var PRIMARY_PAGE_UI = {
  classId: 'cls1',
  subjKey: 'eng',
  pageIndex: 0,
  revealed: {},
  quiz: null,
  collected: {}
};

function primaryPagesFor(classId, subjKey) {
  if (classId === 'cls1' && subjKey === 'eng' && typeof ENGLISH_1_PAGES !== 'undefined') {
    return ENGLISH_1_PAGES;
  }
  return [];
}

function primaryPageSpeak(text) {
  try {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  } catch (e) { /* audio optional */ }
}

function primaryPageRevealKey(figIdx) {
  return PRIMARY_PAGE_UI.pageIndex + ':' + figIdx;
}

function renderPrimaryPageView(classId, subjKey) {
  PRIMARY_PAGE_UI.classId = classId || 'cls1';
  PRIMARY_PAGE_UI.subjKey = subjKey || 'eng';
  var pages = primaryPagesFor(PRIMARY_PAGE_UI.classId, PRIMARY_PAGE_UI.subjKey);
  if (!pages.length) {
    return '<div class="math-topic-card" style="padding:1rem;">Page-by-page content for this book is not yet added.</div>';
  }
  var idx = Math.min(PRIMARY_PAGE_UI.pageIndex, pages.length - 1);
  PRIMARY_PAGE_UI.pageIndex = idx;
  var page = pages[idx];
  var figures = page.figures || [];

  return `
    <div class="primary-page-wrap">
      <style>${primaryPageStyles()}</style>

      <div class="primary-page-nav">
        <button class="topic-sub-tab-btn" onclick="primaryPageNav(-1)" ${idx === 0 ? 'disabled' : ''}>◀ Prev</button>
        <span class="primary-page-badge">Printed page ${page.page} · PDF page ${page.pdfPage}${page.unitTitle ? ' · ' + page.unitTitle : ''}</span>
        <button class="topic-sub-tab-btn" onclick="primaryPageNav(1)" ${idx === pages.length - 1 ? 'disabled' : ''}>Next ▶</button>
      </div>

      ${renderPrimaryPageBlocks(page.blocks)}
      ${renderPrimaryFigureGrid(figures)}

      <div class="primary-activity-grid">
        ${renderPrimarySayNames(figures)}
        ${renderPrimaryInitialSoundQuiz(figures)}
        ${renderPrimaryNameFive(figures)}
      </div>
    </div>
  `;
}

function primaryPageNav(delta) {
  var pages = primaryPagesFor(PRIMARY_PAGE_UI.classId, PRIMARY_PAGE_UI.subjKey);
  var next = PRIMARY_PAGE_UI.pageIndex + delta;
  if (next < 0 || next >= pages.length) return;
  PRIMARY_PAGE_UI.pageIndex = next;
  PRIMARY_PAGE_UI.revealed = {};
  PRIMARY_PAGE_UI.quiz = null;
  PRIMARY_PAGE_UI.collected = {};
  primaryPageRerender();
}

function primaryPageRerender() {
  var el = document.getElementById('subjTabContent');
  if (el) {
    el.innerHTML = renderPrimaryPageView(PRIMARY_PAGE_UI.classId, PRIMARY_PAGE_UI.subjKey);
  }
}

function renderPrimaryPageBlocks(blocks) {
  if (!blocks || !blocks.length) return '';
  var out = blocks.map(function (b) {
    if (b.kind === 'heading') {
      return '<h3 class="primary-page-heading">' + b.text + '</h3>';
    }
    if (b.kind === 'instruction') {
      return '<p class="primary-page-instruction">' + b.text + '</p>';
    }
    if (b.kind === 'bullets') {
      return '<ul class="primary-page-bullets">' + (b.items || []).map(function (t) {
        return '<li>' + t + '</li>';
      }).join('') + '</ul>';
    }
    if (b.kind === 'para') {
      return '<p class="primary-page-para">' + b.text + '</p>';
    }
    return '';
  }).join('');
  return '<div class="primary-page-text">' + out + '</div>';
}

function renderPrimaryFigureGrid(figures) {
  if (!figures || !figures.length) return '';
  return '<div class="primary-figure-grid">' + figures.map(function (f, i) {
    var key = primaryPageRevealKey(i);
    var revealed = !!PRIMARY_PAGE_UI.revealed[key];
    return `
      <button class="primary-figure-card ${revealed ? 'revealed' : ''}" onclick="primaryPageToggleReveal(${i})">
        <span class="primary-figure-art">${primaryArtSvg(f.art)}</span>
        <span class="primary-figure-label">${revealed ? f.word : 'Tap to name'}</span>
        ${revealed ? '<span class="primary-figure-sound">🔊 ' + f.initial + ' — ' + f.word + '</span>' : ''}
      </button>
    `;
  }).join('') + '</div>';
}

function primaryPageToggleReveal(figIdx) {
  var key = primaryPageRevealKey(figIdx);
  PRIMARY_PAGE_UI.revealed[key] = !PRIMARY_PAGE_UI.revealed[key];
  if (PRIMARY_PAGE_UI.revealed[key]) {
    var page = primaryPagesFor(PRIMARY_PAGE_UI.classId, PRIMARY_PAGE_UI.subjKey)[PRIMARY_PAGE_UI.pageIndex];
    var f = (page.figures || [])[figIdx];
    if (f) primaryPageSpeak(f.word);
  }
  primaryPageRerender();
}

/* ---- Activity 1: look and say the names ---------------------------------- */
function renderPrimarySayNames(figures) {
  if (!figures || !figures.length) return '';
  return `
    <div class="primary-activity-card">
      <div class="primary-activity-title">🗣️ Look and say the names</div>
      <div class="primary-activity-body">Tap each picture above to hear and see its name. Then say all the names aloud.</div>
      <button class="topic-sub-tab-btn" onclick="primaryPageSayAll()">🔊 Say all names</button>
    </div>
  `;
}

function primaryPageSayAll() {
  var page = primaryPagesFor(PRIMARY_PAGE_UI.classId, PRIMARY_PAGE_UI.subjKey)[PRIMARY_PAGE_UI.pageIndex];
  var words = (page.figures || []).map(function (f) { return f.word; });
  if (!words.length) return;
  primaryPageSpeak(words.join('. '));
}

/* ---- Activity 2: initial-sound quiz -------------------------------------- */
function renderPrimaryInitialSoundQuiz(figures) {
  if (!figures || figures.length < 2) return '';
  var q = PRIMARY_PAGE_UI.quiz;
  var body;
  if (!q) {
    body = '<button class="topic-sub-tab-btn" onclick="primaryPageQuizStart()">Start sound quiz</button>';
  } else {
    var target = figures[q.answer];
    body = `
      <div class="primary-quiz-prompt">Which picture starts with the letter <strong>${target.initial}</strong>?</div>
      <div class="primary-quiz-options">
        ${q.options.map(function (figIdx) {
          var f = figures[figIdx];
          var cls = 'primary-quiz-option';
          if (q.picked !== null) {
            if (figIdx === q.answer) cls += ' correct';
            else if (figIdx === q.picked) cls += ' wrong';
          }
          return '<button class="' + cls + '" onclick="primaryPageQuizPick(' + figIdx + ')" ' + (q.picked !== null ? 'disabled' : '') + '>' +
            primaryArtSvg(f.art) + '</button>';
        }).join('')}
      </div>
      ${q.picked !== null ? '<div class="primary-quiz-result ' + (q.correct ? 'ok' : 'no') + '">' +
        (q.correct ? '✅ Correct! ' + target.word + ' starts with ' + target.initial + '.' : '❌ Not quite. The answer is ' + target.word + '.') +
        ' <button class="topic-sub-tab-btn" onclick="primaryPageQuizStart()">Next ▶</button></div>' : ''}
    `;
  }
  return `
    <div class="primary-activity-card">
      <div class="primary-activity-title">🔤 Initial sound quiz</div>
      <div class="primary-activity-body">${body}</div>
    </div>
  `;
}

function primaryPageQuizStart() {
  var page = primaryPagesFor(PRIMARY_PAGE_UI.classId, PRIMARY_PAGE_UI.subjKey)[PRIMARY_PAGE_UI.pageIndex];
  var figures = page.figures || [];
  if (figures.length < 2) return;
  var answer = Math.floor(Math.random() * figures.length);
  var pool = figures.map(function (_, i) { return i; }).filter(function (i) { return i !== answer; });
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
  }
  var options = pool.slice(0, Math.min(3, pool.length));
  options.push(answer);
  for (var k = options.length - 1; k > 0; k--) {
    var m = Math.floor(Math.random() * (k + 1));
    var s = options[k]; options[k] = options[m]; options[m] = s;
  }
  PRIMARY_PAGE_UI.quiz = { answer: answer, options: options, picked: null, correct: false };
  primaryPageRerender();
}

function primaryPageQuizPick(figIdx) {
  var q = PRIMARY_PAGE_UI.quiz;
  if (!q || q.picked !== null) return;
  q.picked = figIdx;
  q.correct = (figIdx === q.answer);
  var page = primaryPagesFor(PRIMARY_PAGE_UI.classId, PRIMARY_PAGE_UI.subjKey)[PRIMARY_PAGE_UI.pageIndex];
  var f = (page.figures || [])[q.answer];
  if (q.correct && f) primaryPageSpeak(f.word);
  primaryPageRerender();
}

/* ---- Activity 3: name five objects --------------------------------------- */
function renderPrimaryNameFive(figures) {
  if (!figures || !figures.length) return '';
  var want = 5;
  var count = 0;
  var chips = figures.map(function (f, i) {
    var on = !!PRIMARY_PAGE_UI.collected[primaryPageRevealKey(i)];
    if (on) count++;
    return '<button class="primary-collect-chip ' + (on ? 'on' : '') + '" onclick="primaryPageCollect(' + i + ')">' +
      (on ? '✓ ' : '+ ') + f.word + '</button>';
  }).join('');
  var done = count >= want;
  return `
    <div class="primary-activity-card">
      <div class="primary-activity-title">✋ Name any five objects</div>
      <div class="primary-activity-body">
        <div class="primary-collect-progress">${done ? '🎉 Well done! You named five objects.' : 'Tap to name objects — you have ' + count + ' of ' + want + '.'}</div>
        <div class="primary-collect-chips">${chips}</div>
      </div>
    </div>
  `;
}

function primaryPageCollect(figIdx) {
  var key = primaryPageRevealKey(figIdx);
  PRIMARY_PAGE_UI.collected[key] = !PRIMARY_PAGE_UI.collected[key];
  var page = primaryPagesFor(PRIMARY_PAGE_UI.classId, PRIMARY_PAGE_UI.subjKey)[PRIMARY_PAGE_UI.pageIndex];
  var f = (page.figures || [])[figIdx];
  if (PRIMARY_PAGE_UI.collected[key] && f) primaryPageSpeak(f.word);
  primaryPageRerender();
}

function primaryPageStyles() {
  return `
    .primary-page-wrap { padding: 0.25rem 0 1rem; }
    .primary-page-nav { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.9rem; }
    .primary-page-badge { background: #e0f2fe; color: #0369a1; font-weight: 700; font-size: 0.82rem; padding: 0.35rem 0.7rem; border-radius: 999px; }
    .primary-page-heading { color: #0f172a; font-size: 1.15rem; font-weight: 800; margin: 0.6rem 0 0.3rem; }
    .primary-page-instruction { color: #0369a1; font-weight: 700; font-size: 0.98rem; margin: 0.2rem 0; }
    .primary-page-bullets { margin: 0.3rem 0 0.6rem 1.2rem; color: #334155; line-height: 1.7; }
    .primary-page-para { color: #334155; line-height: 1.7; margin: 0.3rem 0; }
    .primary-figure-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.7rem; margin: 0.8rem 0 1.1rem; }
    .primary-figure-card { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; padding: 0.6rem; background: #ffffff; border: 2px solid #e2e8f0; border-radius: 14px; cursor: pointer; transition: transform .12s, border-color .12s; }
    .primary-figure-card:hover { transform: translateY(-2px); border-color: #38bdf8; }
    .primary-figure-card.revealed { border-color: #22c55e; background: #f0fdf4; }
    .primary-figure-art { width: 84px; height: 84px; }
    .primary-figure-label { font-weight: 700; font-size: 0.86rem; color: #0f172a; }
    .primary-figure-sound { font-size: 0.76rem; color: #16a34a; font-weight: 700; }
    .primary-activity-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.8rem; }
    .primary-activity-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0.8rem; }
    .primary-activity-title { font-weight: 800; color: #0f172a; font-size: 0.95rem; margin-bottom: 0.4rem; }
    .primary-activity-body { font-size: 0.88rem; color: #334155; line-height: 1.6; }
    .primary-quiz-prompt { font-size: 0.98rem; color: #0f172a; margin-bottom: 0.5rem; }
    .primary-quiz-options { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
    .primary-quiz-option { padding: 0.4rem; background: #fff; border: 2px solid #e2e8f0; border-radius: 12px; cursor: pointer; }
    .primary-quiz-option:hover:not(:disabled) { border-color: #38bdf8; }
    .primary-quiz-option svg { width: 64px; height: 64px; }
    .primary-quiz-option.correct { border-color: #22c55e; background: #f0fdf4; }
    .primary-quiz-option.wrong { border-color: #ef4444; background: #fef2f2; }
    .primary-quiz-result { margin-top: 0.5rem; font-weight: 700; }
    .primary-quiz-result.ok { color: #16a34a; }
    .primary-quiz-result.no { color: #dc2626; }
    .primary-collect-progress { margin-bottom: 0.4rem; font-weight: 700; }
    .primary-collect-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .primary-collect-chip { padding: 0.3rem 0.6rem; border-radius: 999px; border: 2px solid #e2e8f0; background: #fff; cursor: pointer; font-size: 0.82rem; font-weight: 700; color: #334155; }
    .primary-collect-chip.on { border-color: #22c55e; background: #f0fdf4; color: #16a34a; }
  `;
}
