/* ======================================================================
 *  cls2_book_reader.js - Class 2 Unified Textbook Reader for SpaceBook
 *  Supports all 8 official KPK Textbook Board Class 2 subjects:
 *    1. Mathematics (6 units, verified blocks, KaTeX, coded SVG figures)
 *    2. English (12 units, verbatim texts, phonics, grammar, trilingual translations)
 *    3. Urdu (22 units, Hamd, Naat, stories, Nastaliq RTL, EN & PS translations)
 *    4. General Knowledge (16 units, science & social concepts, trilingual)
 *    5. Islamyat (11 units, Arabic verses, Hadith, Tashreeh, trilingual)
 *    6. Nazira Quran (15 units, Tajweed rules, Arabic text, trilingual)
 *    7. Pashto (28 units, Pashto lessons, RTL typography, UR & EN translations)
 *    8. Drawing (32 units, coded SVG illustrations, step-by-step drawing guides)
 * ====================================================================== */
(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  const esc = value => String(value == null ? '' : value)
    .replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Inject Class 2 Reader CSS
  const styleId = 'cls2-reader-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .c2-root { color: #1e293b; line-height: 1.8; font-size: 1.02rem; font-family: system-ui, -apple-system, sans-serif; }
      .c2-topic-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 1.5rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: transform 0.15s ease; }
      .c2-card-header { padding: 0.9rem 1.25rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; }
      .c2-card-title { font-weight: 750; font-size: 1.15rem; color: #0f172a; }
      .c2-card-badge { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; padding: 0.25rem 0.6rem; border-radius: 6px; background: #e0f2fe; color: #0284c7; }
      .c2-card-body { padding: 1.25rem; }
      
      /* Paragraphs & Clickable Translations */
      .c2-p-block { margin: 0.85rem 0; cursor: pointer; border-radius: 8px; padding: 0.5rem 0.75rem; background: #f8fafc; border-left: 3px solid #cbd5e1; transition: all 0.2s ease; }
      .c2-p-block:hover { background: #f0f9ff; border-left-color: #0284c7; }
      .c2-p-block.active { background: #e0f2fe; border-left-color: #0284c7; }
      .c2-p-orig { font-size: 1.05rem; font-weight: 500; color: #0f172a; }
      .c2-p-orig.ur { font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', 'Urdu Typesetting', serif; font-size: 1.35rem; line-height: 2.3; direction: rtl; text-align: right; }
      .c2-p-orig.ps { font-family: 'Noto Naskh Arabic', 'Segoe UI', Tahoma, serif; font-size: 1.25rem; line-height: 2.1; direction: rtl; text-align: right; }
      .c2-p-orig.ar { font-family: 'Amiri', 'Traditional Arabic', 'Noto Naskh Arabic', serif; font-size: 1.45rem; line-height: 2.4; direction: rtl; text-align: right; color: #047857; }
      
      .c2-tr-drawer { margin-top: 0.6rem; padding: 0.75rem 1rem; border-radius: 6px; background: #ffffff; border: 1px dashed #93c5fd; }
      .c2-tr-line { margin: 0.35rem 0; }
      .c2-lang-pill { display: inline-block; font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.45rem; border-radius: 4px; background: #0284c7; color: #fff; margin-inline-end: 0.5rem; }
      .c2-tr-text { font-size: 1rem; }
      .c2-tr-text.ur { font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif; font-size: 1.2rem; line-height: 2.2; direction: rtl; text-align: right; display: block; }
      .c2-tr-text.ps { font-family: 'Noto Naskh Arabic', 'Segoe UI', Tahoma, serif; font-size: 1.15rem; line-height: 2.0; direction: rtl; text-align: right; display: block; }

      /* Exercise Components */
      .c2-ex-box { border: 1px solid #e2e8f0; border-left: 4px solid #7c3aed; border-radius: 8px; padding: 1rem; margin: 1rem 0; background: #faf5ff; }
      .c2-ex-title { font-weight: 750; color: #6d28d9; margin-bottom: 0.4rem; font-size: 1.05rem; }
      .c2-btn-ans { display: inline-block; margin-top: 0.6rem; padding: 0.35rem 0.9rem; font-size: 0.85rem; font-weight: 600; color: #ffffff; background: #7c3aed; border-radius: 6px; border: none; cursor: pointer; transition: background 0.15s ease; }
      .c2-btn-ans:hover { background: #6d28d9; }
      .c2-ans-content { margin-top: 0.75rem; padding: 0.75rem 1rem; background: #ffffff; border: 1px solid #ddd6fe; border-radius: 6px; color: #1e293b; display: none; }
      
      /* MCQs */
      .c2-mcq-box { margin: 1rem 0; padding: 1rem; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
      .c2-mcq-q { font-weight: 700; margin-bottom: 0.5rem; font-size: 1.05rem; }
      .c2-opt-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.5rem; margin: 0.6rem 0; }
      .c2-opt-btn { padding: 0.5rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 6px; background: #f8fafc; cursor: pointer; text-align: left; font-size: 0.95rem; transition: all 0.15s ease; }
      .c2-opt-btn:hover { background: #f1f5f9; border-color: #94a3b8; }
      .c2-opt-btn.correct { background: #dcfce7; border-color: #22c55e; color: #15803d; font-weight: 600; }
      .c2-opt-btn.wrong { background: #fee2e2; border-color: #ef4444; color: #b91c1c; }

      /* Drawing Visualizer */
      .c2-art-card { display: flex; flex-direction: column; align-items: center; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
      .c2-art-svg { max-width: 380px; width: 100%; height: auto; border: 2px dashed #93c5fd; border-radius: 8px; background: #fafafa; padding: 1rem; }
      .c2-art-caption { margin-top: 1rem; text-align: center; }
    `;
    document.head.appendChild(style);
  }

  // Global toggle for translation block
  window.toggleC2Translation = function (el) {
    el.classList.toggle('active');
    const tr = el.querySelector('.c2-tr-drawer');
    if (tr) {
      tr.style.display = (tr.style.display === 'none' || !tr.style.display) ? 'block' : 'none';
    }
  };

  // Global toggle for answer box
  window.toggleC2Answer = function (btn) {
    const parent = btn.closest('.c2-ex-box') || btn.parentElement;
    const ans = parent.querySelector('.c2-ans-content');
    if (ans) {
      const isHidden = (ans.style.display === 'none' || !ans.style.display);
      ans.style.display = isHidden ? 'block' : 'none';
      btn.textContent = isHidden ? 'Hide Solution' : 'Show Solution';
    }
  };

  // Helper to get dataset by subject key
  function getSubjectDataset(subjKey) {
    if (subjKey === 'math' || subjKey === 'cls2-math') return window.MATH_2_DATA;
    if (subjKey === 'eng' || subjKey === 'cls2-eng') return window.ENGLISH_2_DATA;
    if (subjKey === 'urdu' || subjKey === 'cls2-urdu') return window.URDU_2_DATA;
    if (subjKey === 'gk' || subjKey === 'cls2-gk') return window.GK_2_DATA;
    if (subjKey === 'isl' || subjKey === 'cls2-isl') return window.ISLAMYAT_2_DATA;
    if (subjKey === 'nazira' || subjKey === 'cls2-nazira') return window.NAZIRA_2_DATA;
    if (subjKey === 'pashto' || subjKey === 'cls2-pashto') return window.PASHTO_2_DATA;
    if (subjKey === 'drawing' || subjKey === 'cls2-drawing') return window.DRAWING_2_DATA;
    return null;
  }

  // Helper to render Mathematics with MATH6_READER
  function renderMathUnit(ch, tabId) {
    const R = window.MATH6_READER;
    if (!R) return `<div class="c2-topic-card" style="padding:1.5rem;">Math reader initializing...</div>`;
    const book = window.MATH_2_BOOK || { answers: {} };
    const words = window.MATH_2_WORDS || {};

    return R.withBook(words, book, () => {
      if (tabId === 'lesson') {
        let html = '';
        if (ch.number === 1 && book.frontMatter && book.frontMatter.length) {
          html += R.card('c2-math-front', 'Textbook', 'Cover and Curriculum Information', R.root(R.blocks(book.frontMatter)), false);
        }
        html += (ch.sections || []).map((sec, idx) => {
          return R.card(`c2-math-${ch.number}-${sec.id}`, `Section ${sec.id || idx+1}`, sec.title + (sec.titleUrdu ? ` · ${sec.titleUrdu}` : ''), R.root(R.blocks(sec.blocks, {showAnswers: true})), idx === 0);
        }).join('');
        return html;
      }
      if (tabId === 'exercise') {
        if (!ch.exercises || !ch.exercises.length) {
          return `<div class="c2-topic-card" style="padding:1.5rem;color:#64748b;text-align:center;">This unit's exercises are integrated into the lesson page.</div>`;
        }
        return ch.exercises.map((ex, idx) => {
          return R.card(`c2-math-ex-${ch.number}-${idx}`, 'Exercise', (ex.id || 'Practice') + (ex.printed ? ` (p. ${ex.printed})` : ''), R.root(R.blocks([ex], {showAnswers: true, noPages: true})), idx === 0);
        }).join('');
      }
      if (tabId === 'slos') {
        if (!ch.slos || !ch.slos.length) return `<div class="c2-topic-card" style="padding:1.5rem;">No learning outcomes defined.</div>`;
        return R.root(`<div class="m6-h3">Student Learning Outcomes (Curriculum 2020)</div><ul class="m6-ul">${ch.slos.map(s => `<li>${R.sentence(s, 'span')}</li>`).join('')}</ul>`);
      }
      if (tabId === 'concepts' || tabId === 'formulas') {
        return (ch.sections || []).map((sec, idx) => {
          return R.card(`c2-math-c-${ch.number}-${idx}`, 'Concepts', sec.title, R.root(R.blocks(sec.blocks.filter(b => b.t === 'example' || b.t === 'box'), {showAnswers: true})), idx === 0);
        }).join('');
      }
      return `<div class="c2-topic-card" style="padding:1.5rem;">Select a valid tab.</div>`;
    });
  }

  // Render Generic Subject Lesson
  function renderSubjectLesson(subjKey, ch) {
    if (!ch) return `<div class="c2-topic-card" style="padding:1.5rem;text-align:center;">Lesson not found.</div>`;
    let html = `<div class="c2-root">`;

    // Overview Header
    html += `
      <div class="c2-topic-card">
        <div class="c2-card-header">
          <span class="c2-card-title">${esc(ch.title || ch.titleEn || ch.titleUrdu || `Unit ${ch.number}`)}</span>
          <span class="c2-card-badge">Class 2 Verified Source</span>
        </div>
        <div class="c2-card-body">
          <p style="font-size:1.05rem;color:#475569;margin-bottom:0.75rem;">
            ${esc(ch.titleUrdu ? ch.titleUrdu + ' · ' : '')} ${esc(ch.titlePashto || ch.titlePs || '')}
          </p>
          ${ch.author ? `<p style="font-size:0.9rem;color:#64748b;"><strong>Theme/Author:</strong> ${esc(ch.author)}</p>` : ''}
          ${ch.authorInfo ? `<p style="font-size:0.85rem;color:#94a3b8;white-space:pre-line;">${esc(ch.authorInfo)}</p>` : ''}
        </div>
      </div>`;

    // Drawing Subject Handling
    if (subjKey.includes('drawing')) {
      const art = (window.DRAWING_2_ART && window.DRAWING_2_ART[ch.artwork]) || '';
      html += `
        <div class="c2-art-card">
          <svg class="c2-art-svg" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
            ${art}
          </svg>
          <div class="c2-art-caption">
            <h3 style="font-size:1.2rem;margin:0.5rem 0;">${esc(ch.title)}</h3>
            <div class="c2-p-block" onclick="toggleC2Translation(this)">
              <div class="c2-p-orig">${esc(ch.en)}</div>
              <div class="c2-tr-drawer" style="display:none;">
                <div class="c2-tr-line"><span class="c2-lang-pill">اردو</span><span class="c2-tr-text ur">${esc(ch.ur)}</span></div>
                <div class="c2-tr-line"><span class="c2-lang-pill">پښتو</span><span class="c2-tr-text ps">${esc(ch.ps)}</span></div>
              </div>
            </div>
          </div>
        </div>`;
      html += `</div>`;
      return html;
    }

    // Sections and Paragraphs
    if (ch.sections && ch.sections.length) {
      ch.sections.forEach((sec, idx) => {
        html += `
          <div class="c2-topic-card">
            <div class="c2-card-header">
              <span class="c2-card-title">${esc(sec.heading || sec.headingEn || sec.headingUrdu || `Part ${idx+1}`)}</span>
              <span class="c2-card-badge">KPTBB Lesson</span>
            </div>
            <div class="c2-card-body">`;

        // If Quranic / Hadith / Arabic text
        if (sec.arabic) {
          html += `
            <div class="c2-p-block" onclick="toggleC2Translation(this)">
              <div class="c2-p-orig ar">${esc(sec.arabic)}</div>
              <div class="c2-tr-drawer" style="display:block;">
                ${sec.urduTranslation ? `<div class="c2-tr-line"><span class="c2-lang-pill">اردو ترجمہ</span><span class="c2-tr-text ur">${esc(sec.urduTranslation)}</span></div>` : ''}
                ${sec.pashtoTranslation ? `<div class="c2-tr-line"><span class="c2-lang-pill">پښتو ژباړه</span><span class="c2-tr-text ps">${esc(sec.pashtoTranslation)}</span></div>` : ''}
                ${sec.englishTranslation ? `<div class="c2-tr-line"><span class="c2-lang-pill">English</span><span class="c2-tr-text">${esc(sec.englishTranslation)}</span></div>` : ''}
              </div>
            </div>`;
        }

        // Paragraphs with translations
        if (sec.paras && sec.paras.length) {
          sec.paras.forEach((p, pIdx) => {
            const urText = sec.urdu || (ch.urduText ? ch.urduText : '');
            const psText = sec.pashto || '';
            const enText = sec.english || '';
            const isUr = Boolean(subjKey.includes('urdu') || subjKey.includes('gk') || subjKey.includes('isl'));
            const isPs = Boolean(subjKey.includes('pashto'));

            html += `
              <div class="c2-p-block" onclick="toggleC2Translation(this)">
                <div class="c2-p-orig ${isUr ? 'ur' : (isPs ? 'ps' : '')}">${esc(p)}</div>
                <div class="c2-tr-drawer" style="display:none;">
                  ${urText && !isUr ? `<div class="c2-tr-line"><span class="c2-lang-pill">اردو</span><span class="c2-tr-text ur">${esc(urText)}</span></div>` : ''}
                  ${psText && !isPs ? `<div class="c2-tr-line"><span class="c2-lang-pill">پښتو</span><span class="c2-tr-text ps">${esc(psText)}</span></div>` : ''}
                  ${enText && (isUr || isPs) ? `<div class="c2-tr-line"><span class="c2-lang-pill">English</span><span class="c2-tr-text">${esc(enText)}</span></div>` : ''}
                </div>
              </div>`;
          });
        } else if (sec.text) {
          html += `<p style="white-space:pre-line;font-size:1.05rem;">${esc(sec.text)}</p>`;
        }

        html += `</div></div>`;
      });
    }

    html += `</div>`;
    return html;
  }

  // Render Generic Subject Exercises
  function renderSubjectExercises(subjKey, ch) {
    if (subjKey.includes('drawing')) {
      const exam = window.DRAWING_2_EXAM || {};
      let html = `<div class="c2-root">`;
      if (exam.mcqs && exam.mcqs.length) {
        html += `<div class="c2-topic-card"><div class="c2-card-header"><span class="c2-card-title">Drawing &amp; Art MCQs</span></div><div class="c2-card-body">`;
        exam.mcqs.forEach((m, idx) => {
          html += `
            <div class="c2-mcq-box">
              <div class="c2-mcq-q">${idx+1}. ${esc(m.q)}</div>
              <div style="direction:rtl;text-align:right;color:#64748b;font-size:0.95rem;margin-bottom:0.4rem;">${esc(m.qUr || '')}</div>
              <div class="c2-opt-grid">
                ${m.options.map((opt, oIdx) => `
                  <button class="c2-opt-btn ${oIdx === m.answer ? 'correct' : ''}">(${String.fromCharCode(65+oIdx)}) ${esc(opt)}</button>
                `).join('')}
              </div>
            </div>`;
        });
        html += `</div></div>`;
      }
      if (exam.sqs && exam.sqs.length) {
        html += `<div class="c2-topic-card"><div class="c2-card-header"><span class="c2-card-title">Short Questions</span></div><div class="c2-card-body">`;
        exam.sqs.forEach((sq, idx) => {
          html += `
            <div class="c2-ex-box">
              <div class="c2-ex-title">Q${idx+1}: ${esc(sq.q)}</div>
              <div style="direction:rtl;text-align:right;color:#64748b;font-size:0.95rem;">${esc(sq.qUr || '')}</div>
              <button class="c2-btn-ans" onclick="toggleC2Answer(this)">Show Solution</button>
              <div class="c2-ans-content">
                <p><strong>Answer:</strong> ${esc(sq.a)}</p>
                <p style="direction:rtl;text-align:right;color:#0f172a;">${esc(sq.aUr || '')}</p>
                <p style="direction:rtl;text-align:right;color:#334155;">${esc(sq.aPs || '')}</p>
              </div>
            </div>`;
        });
        html += `</div></div>`;
      }
      html += `</div>`;
      return html;
    }

    if (!ch || !ch.exercise) {
      return `<div class="c2-topic-card" style="padding:1.5rem;text-align:center;color:#64748b;">No separate exercises in this unit.</div>`;
    }

    const ex = ch.exercise;
    let html = `<div class="c2-root">`;

    // MCQs
    if (ex.mcqs && ex.mcqs.length) {
      html += `<div class="c2-topic-card"><div class="c2-card-header"><span class="c2-card-title">Multiple Choice Questions (MCQs)</span></div><div class="c2-card-body">`;
      ex.mcqs.forEach((m, idx) => {
        const correctIdx = (typeof m.correct === 'number') ? m.correct : (m.answer || 0);
        html += `
          <div class="c2-mcq-box">
            <div class="c2-mcq-q">${idx+1}. ${esc(m.question || m.q)}</div>
            ${m.urdu ? `<div style="direction:rtl;text-align:right;color:#475569;font-size:0.95rem;margin-bottom:0.35rem;">${esc(m.urdu)}</div>` : ''}
            <div class="c2-opt-grid">
              ${(m.options || []).map((opt, oIdx) => `
                <button class="c2-opt-btn ${oIdx === correctIdx ? 'correct' : ''}">(${String.fromCharCode(65+oIdx)}) ${esc(opt)}</button>
              `).join('')}
            </div>
            ${m.explanation ? `<div style="font-size:0.85rem;color:#15803d;margin-top:0.4rem;"><strong>Explanation:</strong> ${esc(m.explanation)}</div>` : ''}
          </div>`;
      });
      html += `</div></div>`;
    }

    // Short Questions
    if (ex.shortQuestions && ex.shortQuestions.length) {
      html += `<div class="c2-topic-card"><div class="c2-card-header"><span class="c2-card-title">Short Questions &amp; Answers</span></div><div class="c2-card-body">`;
      ex.shortQuestions.forEach((sq, idx) => {
        html += `
          <div class="c2-ex-box">
            <div class="c2-ex-title">Q${idx+1}: ${esc(sq.question || sq.q)}</div>
            ${sq.urdu ? `<div style="direction:rtl;text-align:right;color:#475569;font-size:0.95rem;">${esc(sq.urdu)}</div>` : ''}
            <button class="c2-btn-ans" onclick="toggleC2Answer(this)">Show Solution</button>
            <div class="c2-ans-content">
              <p><strong>Answer:</strong> ${esc(sq.answer || sq.a)}</p>
              ${sq.urduAnswer ? `<p style="direction:rtl;text-align:right;color:#0f172a;">${esc(sq.urduAnswer)}</p>` : ''}
              ${sq.pashtoAnswer ? `<p style="direction:rtl;text-align:right;color:#334155;">${esc(sq.pashtoAnswer)}</p>` : ''}
            </div>
          </div>`;
      });
      html += `</div></div>`;
    }

    // Long Questions
    if (ex.longQuestions && ex.longQuestions.length) {
      html += `<div class="c2-topic-card"><div class="c2-card-header"><span class="c2-card-title">Long &amp; Analytical Questions</span></div><div class="c2-card-body">`;
      ex.longQuestions.forEach((lq, idx) => {
        html += `
          <div class="c2-ex-box" style="border-left-color:#0284c7;background:#f0f9ff;">
            <div class="c2-ex-title" style="color:#0369a1;">Q${idx+1}: ${esc(lq.question || lq.q)}</div>
            ${lq.urdu ? `<div style="direction:rtl;text-align:right;color:#475569;font-size:0.95rem;">${esc(lq.urdu)}</div>` : ''}
            <button class="c2-btn-ans" style="background:#0284c7;" onclick="toggleC2Answer(this)">Show Solution</button>
            <div class="c2-ans-content" style="border-color:#bae6fd;">
              <p><strong>Solution:</strong></p>
              <p style="white-space:pre-line;">${esc(lq.answer || lq.a)}</p>
              ${lq.urduAnswer ? `<p style="direction:rtl;text-align:right;white-space:pre-line;color:#0f172a;">${esc(lq.urduAnswer)}</p>` : ''}
            </div>
          </div>`;
      });
      html += `</div></div>`;
    }

    html += `</div>`;
    return html;
  }

  // Intercept switchSubjectTab for Class 2
  if (typeof window.switchSubjectTab === 'function') {
    const originalSwitch = window.switchSubjectTab;
    window.switchSubjectTab = function (subjKey, tabId, chIdx, classId) {
      const isCls2 = (classId === 'cls2' || (typeof state !== 'undefined' && state.selectedClass === 'cls2'));
      if (isCls2) {
        const dataset = getSubjectDataset(subjKey);
        const ch = dataset ? (dataset[chIdx] || dataset[0]) : null;
        if (ch) {
          state.activeSubjTab = tabId;
          document.querySelectorAll('.math-top-tab, .math-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
          });
          const container = document.getElementById('subjTabContent');
          if (container) {
            if (subjKey === 'math' || subjKey === 'cls2-math') {
              container.innerHTML = renderMathUnit(ch, tabId);
            } else {
              if (tabId === 'lesson' || tabId === 'concepts') {
                container.innerHTML = renderSubjectLesson(subjKey, ch);
              } else if (tabId === 'exercise') {
                container.innerHTML = renderSubjectExercises(subjKey, ch);
              } else {
                container.innerHTML = renderSubjectLesson(subjKey, ch);
              }
            }
            container.scrollTop = 0;
            return;
          }
        }
      }
      return originalSwitch.apply(this, arguments);
    };
  }

  // Intercept openSubject for Class 2
  if (typeof window.openSubject === 'function') {
    const originalOpen = window.openSubject;
    window.openSubject = function (classId, subjId) {
      if (classId === 'cls2') {
        state.activeView = "subject-detail";
        state.selectedClass = classId;
        const subs = (typeof DATA !== 'undefined' && DATA.subjects && DATA.subjects.cls2) || [];
        const subj = subs.find(s => s.id === subjId) || { id: subjId, name: 'Subject' };
        state.activeSubject = subjId.replace('cls2-', '');
        if (typeof window.openSubjectWorkspace === 'function') {
          window.openSubjectWorkspace(classId, state.activeSubject, subj);
          return;
        }
      }
      return originalOpen.apply(this, arguments);
    };
  }

  console.log('Class 2 Unified Textbook Reader initialized for all 8 subjects.');
})();
