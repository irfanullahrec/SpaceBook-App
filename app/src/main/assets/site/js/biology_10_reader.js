/* Class 10 Biology source-aligned reader. Only chapters flagged by the Class 10 Biology
 * source overlays (ch.__bio10Source === true) are rendered here; every other route keeps
 * its existing renderer. No scans or raster images: figures are inline SVG/HTML. */
(function (root) {
  'use strict';
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const owns = ch => !!(ch && ch.__bio10Source === true && typeof DATA !== 'undefined' && Array.isArray(DATA.bio10Chapters) && DATA.bio10Chapters.includes(ch));
  const isCls10 = () => typeof state !== 'undefined' && state.selectedClass === 'cls10';
  const FIELD = {en:'text', ur:'urdu', ps:'pashto'};
  const DIR = lang => lang === 'en' ? '' : ' dir="rtl"';
  const LANGATTR = lang => lang === 'en' ? '' : ` lang="${lang}"`;
  const BOX = {
    recalling: {bg:'#dcfce7', border:'#16a34a', color:'#14532d', en:'Recalling', ur:'یاد دہانی', ps:'یادونه'},
    fyi:       {bg:'#fce7f3', border:'#0ea5e9', color:'#831843', en:'For Your Information', ur:'آپ کی معلومات کے لیے', ps:'ستاسو د معلوماتو لپاره'},
    tidbit:    {bg:'#fff1f2', border:'#e11d48', color:'#881337', en:'Tidbit', ur:'دلچسپ بات', ps:'په زړه پورې خبره'},
    sts:       {bg:'#fff7ed', border:'#ea580c', color:'#7c2d12', en:'Science, Technology and Society', ur:'سائنس، ٹیکنالوجی اور معاشرہ', ps:'ساینس، ټکنالوژي او ټولنه'},
    activity:  {bg:'#eff6ff', border:'#2563eb', color:'#1e3a8a', en:'Activity', ur:'سرگرمی', ps:'فعالیت'},
    note:      {bg:'#f8fafc', border:'#64748b', color:'#1e293b', en:'Note', ur:'نوٹ', ps:'یادښت'}
  };
  const STYLE = `<style id="bio10-source-style">
    .bio10-side{float:inline-end;clear:inline-end;width:min(44%,320px);margin:0 0 .8rem 1rem;}
    .bio10-box{border-radius:8px;padding:.6rem .8rem;margin:.6rem 0;font-size:.92em;line-height:1.7;}
    .bio10-box h5{margin:0 0 .35rem;font-size:.95em;font-weight:800;}
    .bio10-box h6{margin:0 0 .3rem;font-size:1em;font-weight:800;text-align:center;}
    .bio10-fig{margin:.9rem auto;text-align:center;clear:both;}
    .bio10-fig svg{display:block;width:100%;height:auto;max-width:100%;margin:0 auto;}
    .bio10-fig figcaption{font-weight:700;font-size:.88em;margin-top:.35rem;color:#1e3a8a;}
    .bio10-side .bio10-fig{clear:none;margin:.2rem 0 .6rem;}
    .bio10-h{font-weight:800;color:#be123c;margin:1rem 0 .35rem;font-size:1.02em;}
    .bio10-clear{clear:both;}
    .bio10-table{width:100%;border-collapse:collapse;margin:.8rem 0;}
    .bio10-table th,.bio10-table td{border:1px solid #94a3b8;padding:.4rem .55rem;vertical-align:top;text-align:start;}
    .bio10-table th{background:#f1f5f9;}
    .bio10-ref{font-size:.74rem;color:#64748b;margin:.25rem 0 .6rem;}
    .bio10-strong{font-weight:700;color:#0f172a;}
    @media (max-width:640px){.bio10-side{float:none;width:100%;margin:.6rem 0;}}
  </style>`;
  let serial = 0;

  function boldTokens(html, text, terms) {
    if (!terms || !terms.length || !text) return html;
    const ranges = [];
    for (const term of terms) { let at = text.indexOf(term); while (at >= 0) { ranges.push([at, at + term.length]); at = text.indexOf(term, at + term.length); } }
    if (!ranges.length) return html;
    const tokens = [...text.matchAll(/\S+/g)].filter(m => /[a-zA-Z0-9'-]/.test(m[0]));
    let i = 0;
    return html.replace(/<span class="tts-word dict-clickable-word"[^>]*>[^<]*<\/span>/g, span => {
      const token = tokens[i++];
      if (!token) return span;
      const hit = ranges.some(([s, e]) => token.index < e && token.index + token[0].length > s);
      return hit ? span.replace('<span ', '<span class="bio10-strong" ') : span;
    });
  }

  function para(p, lang, key) {
    if (!p) return '';
    const field = FIELD[lang];
    const text = p[field] || '';
    if (lang !== 'en') return esc(text);
    const id = `bio10-${key || ++serial}`;
    const html = typeof renderInteractiveParagraphHtml === 'function'
      ? renderInteractiveParagraphHtml(p.text, p.urdu || '', p.pashto || '', id, true)
      : esc(p.text);
    return boldTokens(html, p.text, p.bold);
  }

  function figure(fig, lang) {
    if (!fig) return '';
    let svg = fig.svg || '';
    const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]).sort((a, b) => b.length - a.length);
    for (const id of ids) svg = svg.replaceAll(`id="${id}"`, `id="${id}-${lang}"`).replaceAll(`#${id}`, `#${id}-${lang}`);
    if (lang !== 'en') for (const label of fig.labels || []) {
      const to = label[FIELD[lang]];
      if (to) svg = svg.replaceAll(`>${label.text}<`, `>${esc(to)}<`);
    }
    const caption = fig.caption ? (fig.caption[FIELD[lang]] || fig.caption.text) : '';
    const width = fig.widthRatio ? `style="max-width:${Math.round(560 * fig.widthRatio)}px"` : '';
    return `<figure class="bio10-fig" ${width}>${svg}${caption ? `<figcaption${DIR(lang)}${LANGATTR(lang)}>${esc(caption)}</figcaption>` : ''}${fig.note && lang === 'en' ? `<div class="bio10-ref">${esc(fig.note)}</div>` : ''}</figure>`;
  }

  function table(tb, lang) {
    if (!tb) return '';
    const field = FIELD[lang];
    const cell = c => (c && typeof c === 'object') ? esc(c[field] || c.text || '') : esc(c);
    const head = tb.headers ? `<thead><tr>${tb.headers.map(h => `<th scope="col">${cell(h)}</th>`).join('')}</tr></thead>` : '';
    const body = `<tbody>${(tb.rows || []).map(r => `<tr>${r.map((c, i) => i === 0 && tb.rowHeaders ? `<th scope="row">${cell(c)}</th>` : `<td>${cell(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
    const caption = tb.caption ? `<caption style="caption-side:top;font-weight:700;text-align:start;padding:.3rem 0;">${cell(tb.caption)}</caption>` : '';
    return `<div style="overflow-x:auto"><table class="bio10-table"${DIR(lang)}${LANGATTR(lang)}>${caption}${head}${body}</table></div>`;
  }

  function blocks(sec, list, lang, key) {
    const P = i => sec.paras[i];
    const render = (b, n) => {
      const k = `${key}-${n}`;
      if (typeof b === 'number') return `<p style="margin:.6rem 0;text-align:start;">${para(P(b), lang, k)}</p>`;
      switch (b.t) {
        case 'p': return `<p style="margin:.6rem 0;text-align:start;">${para(P(b.i), lang, k)}</p>`;
        case 'h': return `<div class="bio10-h" role="heading" aria-level="5">${para(P(b.i), lang, k)}</div>`;
        case 'list': return `<${b.ordered ? 'ol' : 'ul'}${b.ordered === 'a' ? ' type="a"' : ''} style="margin:.4rem 0 .8rem;padding-inline-start:1.4rem;">${b.items.map((i, m) => `<li style="margin:.25rem 0;">${para(P(i), lang, `${k}-${m}`)}</li>`).join('')}</${b.ordered ? 'ol' : 'ul'}>`;
        case 'fig': return figure(sec.figures && sec.figures[b.id], lang);
        case 'table': return table(sec.tables && sec.tables[b.id], lang);
        case 'clear': return '<div class="bio10-clear"></div>';
        case 'box': {
          const kind = BOX[b.kind] || BOX.note;
          const heading = Number.isInteger(b.headingIndex) ? null : (b.heading ? (b.heading[FIELD[lang]] || b.heading.text) : kind[lang]);
          const title = b.title ? `<h6>${para(P(b.title), lang, `${k}-title`)}</h6>` : '';
          const inner = (b.blocks || (b.paras || []).map(i => ({t:'p', i}))).map((x, m) => render(x, `${n}-${m}`)).join('');
          return `<div role="note" class="bio10-box" style="background:${kind.bg};border:1px solid ${kind.border};border-inline-start:4px solid ${kind.border};color:${kind.color};"${DIR(lang)}${LANGATTR(lang)}>${heading === null ? `<h5>${para(P(b.headingIndex), lang, `${k}-head`)}</h5>` : `<h5>${esc(heading)}</h5>`}${title}${inner}</div>`;
        }
        case 'side': return `<div class="bio10-side">${(b.blocks || []).map((x, m) => render(x, `${n}-${m}`)).join('')}</div>`;
        case 'columns': return `<div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;"><div style="flex:1 1 260px;min-width:0;">${(b.main || []).map((x, m) => render(x, `${n}-m${m}`)).join('')}</div><div style="flex:0 1 ${b.sideWidth || 240}px;min-width:0;">${(b.side || []).map((x, m) => render(x, `${n}-s${m}`)).join('')}</div></div>`;
        case 'equation': return `<div style="text-align:center;margin:.6rem 0;font-weight:600;">${esc(P(b.i)[FIELD[lang]] || P(b.i).text)}</div>`;
        default: return '';
      }
    };
    return (list || []).map(render).join('') + '<div class="bio10-clear"></div>';
  }

  function refs(sec) {
    const r = sec.sourceReferences || [];
    if (!r.length) return '';
    return `<div class="bio10-ref">Source: Biology Class 10 KPK textbook · PDF page${r.length > 1 ? 's' : ''} ${r.map(x => x.pdfPage).join(', ')} · printed page${r.length > 1 ? 's' : ''} ${r.map(x => x.printedPage).filter(Boolean).join(', ')}</div>`;
  }

  function sectionCard(sec, idx) {
    const title = sec.title || sec.name || '';
    const en = blocks(sec, sec.layout, 'en', `s${idx}`);
    const ur = blocks(sec, sec.layout, 'ur', `s${idx}u`);
    const ps = blocks(sec, sec.layout, 'ps', `s${idx}p`);
    return `
      <div class="para-card math-topic-card bio10-section" style="margin-bottom:1.5rem;padding:1.25rem;border:1px solid #e2e8f0;border-radius:10px;background:#ffffff;box-shadow:0 1px 3px rgba(0,0,0,0.03);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.85rem;flex-wrap:wrap;gap:0.5rem;border-bottom:1px solid #f1f5f9;padding-bottom:0.65rem;">
          <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
            ${sec.num && sec.num !== 'intro' ? `<span class="math-badge" style="background:#dcfce7;color:#166534;">${esc(sec.num)}</span>` : ''}
            <h4 style="color:#0f172a;font-size:1.05rem;font-weight:700;margin:0;">${esc(title)}
              ${sec.urduTitle ? `<span lang="ur" dir="rtl" style="font-family:'Jameel Noori Nastaleeq',serif;margin-inline-start:0.5rem;color:#15803d;font-size:1.1rem;font-weight:600;">(${esc(sec.urduTitle)})</span>` : ''}
              ${sec.pashtoTitle ? `<span lang="ps" dir="rtl" style="margin-inline-start:0.4rem;color:#92400e;font-size:0.95rem;font-weight:600;">(${esc(sec.pashtoTitle)})</span>` : ''}
            </h4>
          </div>
          <div id="para-lang-tabs-${idx}" class="para-lang-tabs-bar" style="display:flex;gap:0.3rem;">
            <button class="para-lang-tab-btn active" onclick="switchParaLangTab(${idx}, 'en', this)">🇬🇧 English</button>
            <button class="para-lang-tab-btn" onclick="switchParaLangTab(${idx}, 'ur', this)">🇵🇰 اردو (Urdu)</button>
            <button class="para-lang-tab-btn" onclick="switchParaLangTab(${idx}, 'ps', this)">🇦🇫 پښتو (Pashto)</button>
            <button class="para-lang-tab-btn" onclick="switchParaLangTab(${idx}, 'all', this)">📑 All (Parallel)</button>
          </div>
        </div>
        ${refs(sec)}
        ${sec.sourceClarification || sec.sourceGap ? `<details style="margin:.3rem 0 .7rem;padding:.5rem .7rem;background:#f8fafc;border:1px dashed #94a3b8;border-radius:6px;font-size:.85rem;"><summary style="cursor:pointer;font-weight:700;color:#475569;">Editorial clarification (not textbook text)</summary>${sec.sourceGap ? `<p style="margin:.3rem 0;">${esc(sec.sourceGap)}</p>` : ''}${sec.sourceClarification ? `<p style="margin:.3rem 0;">${esc(sec.sourceClarification)}</p>` : ''}</details>` : ''}
        <div id="para-lang-en-${idx}" style="margin-bottom:0.75rem;display:block;">
          <span style="font-size:0.74rem;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.5px;">English Original (Hover for Word Meaning • Click Paragraph for Translation):</span>
          <div class="para-text-box" style="font-size:0.95rem;color:#1e293b;line-height:1.85;margin-top:0.35rem;">${en}</div>
        </div>
        <div id="para-lang-ur-${idx}" style="margin-bottom:0.75rem;display:none;">
          <span style="font-size:0.74rem;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:0.5px;">Urdu Translation (اردو ترجمہ):</span>
          <div lang="ur" style="font-family:'Jameel Noori Nastaleeq',serif;direction:rtl;text-align:right;font-size:1.25rem;color:#166534;line-height:2.2;margin-top:0.35rem;background:#f0fdf4;padding:0.75rem 1rem;border-radius:8px;border:1px solid #bbf7d0;">${ur}</div>
        </div>
        <div id="para-lang-ps-${idx}" style="display:none;">
          <span style="font-size:0.74rem;font-weight:700;color:#d97706;text-transform:uppercase;letter-spacing:0.5px;">Pashto Translation (د پښتو ژباړه):</span>
          <div lang="ps" style="font-family:'Pashto Koodak','Segoe UI',serif;direction:rtl;text-align:right;font-size:1.1rem;color:#92400e;line-height:2.0;margin-top:0.35rem;background:#fefce8;padding:0.75rem 1rem;border-radius:8px;border:1px solid #fef08a;">${ps}</div>
        </div>
      </div>`;
  }

  function pageCard(page, lang) {
    const field = FIELD[lang];
    const title = page.title ? (page.title[field] || page.title.text) : '';
    let html = `<h4${DIR(lang)}${LANGATTR(lang)}>${esc(title)}</h4>`;
    html += blocks(page, page.layout, lang, `${page.id}-${lang}`);
    if (page.exclusions && lang === 'en') html += `<details style="margin:.4rem 0;font-size:.8rem;color:#64748b;"><summary>Non-instructional elements on this page (not reproduced)</summary><ul>${page.exclusions.map(e => `<li>${esc(e)}</li>`).join('')}</ul></details>`;
    return html;
  }

  function frontMatter(ch) {
    const pages = [...(ch.sourceFrontMatter || []), ...(ch.sourceOpening ? [ch.sourceOpening] : [])];
    if (!pages.length) return '';
    return pages.map(page => `
      <details class="bio10-front-matter math-topic-card" ${page.open ? 'open' : ''} style="margin-bottom:1rem;padding:1rem;border:1px solid #e2e8f0;border-radius:10px;background:#fff;">
        <summary style="cursor:pointer;font-weight:700;color:#0f172a;">${esc(page.summary || page.title?.text || page.kind)} <span class="bio10-ref" style="display:inline;">· PDF page ${page.pdfPage}${page.printedPage ? ` · printed page ${esc(page.printedPage)}` : ''}</span></summary>
        ${pageCard(page, 'en')}
        <details lang="ur" dir="rtl" style="margin-top:.6rem;background:#f0fdf4;padding:.6rem;border-radius:8px;"><summary style="cursor:pointer;">اردو ترجمہ</summary><div style="font-family:'Jameel Noori Nastaleeq',serif;font-size:1.2rem;line-height:2.1;color:#166534;">${pageCard(page, 'ur')}</div></details>
        <details lang="ps" dir="rtl" style="margin-top:.6rem;background:#fefce8;padding:.6rem;border-radius:8px;"><summary style="cursor:pointer;">پښتو ژباړه</summary><div style="font-size:1.05rem;line-height:2;color:#92400e;">${pageCard(page, 'ps')}</div></details>
      </details>`).join('');
  }

  function lesson(ch) {
    const sections = ch.topics || [];
    return `${STYLE}<div>
      <div style="margin-bottom:1.25rem;">
        <h3 style="color:#0f172a;font-size:1.15rem;font-weight:800;margin:0 0 0.25rem 0;">🌐 Textbook Lesson &amp; Translations (English • اردو • پښتو)</h3>
        <p style="color:#64748b;font-size:0.84rem;margin:0;">Original KPK Textbook Board text, verified page by page against the printed book. Hover over any word for its meaning; click any paragraph for its full Urdu/Pashto translation.</p>
        ${ch.sourceReview ? `<p class="bio10-ref">Source review status: ${esc(ch.sourceReview.status)} · last fully verified PDF page ${ch.sourceReview.lastFullyVerifiedPdfPage}${ch.sourceReview.note ? ' · ' + esc(ch.sourceReview.note) : ''}</p>` : ''}
      </div>
      ${frontMatter(ch)}
      <div class="science-lesson-cards-list">${sections.map((sec, idx) => sec.layout ? sectionCard(sec, idx) : '').join('')}</div>
    </div>`;
  }

  let exFigures = {};
  function question(q, lang, key) {
    const field = FIELD[lang];
    // MCQs: options side by side as radio buttons with a correct / wrong alert (js/sb_mcq.js)
    if (q.options && q.answer && window.SBMcq && !q.parts) {
      const texts = q.options.map(o => String(o[field] || o.text || ''));
      const correct = SBMcq.resolve(q.answer[field] || q.answer.text, texts);
      if (correct >= 0) {
        const fig = q.figure && exFigures[q.figure] ? figure(exFigures[q.figure], lang) : '';
        return SBMcq.html({stem: para(q, lang, key) + fig, options: texts.map(esc), optionsText: texts, correct, lang: lang === 'en' ? 'en' : lang});
      }
    }
    let html = `<div style="margin:.35rem 0;">${para(q, lang, key)}</div>`;
    if (q.figure && exFigures[q.figure]) html += figure(exFigures[q.figure], lang);
    if (q.options) html += `<ol type="a" style="margin:.2rem 0 .4rem;padding-inline-start:1.6rem;">${q.options.map((o, i) => `<li>${para(o, lang, `${key}-o${i}`)}</li>`).join('')}</ol>`;
    if (q.parts) html += `<ol type="i" style="margin:.2rem 0 .4rem;padding-inline-start:1.6rem;">${q.parts.map((o, i) => `<li>${para(o, lang, `${key}-p${i}`)}</li>`).join('')}</ol>`;
    if (q.answer) html += `<details style="margin:.3rem 0;"><summary style="cursor:pointer;color:#15803d;font-weight:700;">${q.answerType === 'source' ? (lang === 'ur' ? 'کتابی جواب' : lang === 'ps' ? 'د کتاب ځواب' : 'Textbook answer') : (lang === 'ur' ? 'اسپیس بک کا تجویز کردہ جواب' : lang === 'ps' ? 'د سپیس بک وړاندیز شوی ځواب' : 'SpaceBook suggested answer (not printed in the textbook)')}</summary><div style="margin:.3rem 0;">${para(q.answer, lang, `${key}-a`)}</div></details>`;
    return html;
  }

  function exerciseLang(ex, lang) {
    const field = FIELD[lang];
    return (ex.groups || []).map((g, gi) => `<section class="math-topic-card" style="padding:1rem;margin:0 0 1rem;line-height:1.8;"${DIR(lang)}${LANGATTR(lang)}>
      <h4 style="margin:0 0 .4rem;">${esc(g.heading ? (g.heading[field] || g.heading.text) : '')}</h4>
      ${g.instruction ? `<p style="margin:.3rem 0 .6rem;">${para(g.instruction, lang, `ex-${lang}-${gi}-i`)}</p>` : ''}
      <ol style="padding-inline-start:1.5rem;">${(g.questions || []).map((q, qi) => `<li style="margin:.5rem 0;">${question(q, lang, `ex-${lang}-${gi}-${qi}`)}</li>`).join('')}</ol>
      ${g.note ? `<p class="bio10-ref">${esc(g.note)}</p>` : ''}
    </section>`).join('');
  }

  function exercise(ch) {
    const ex = ch.sourceExercise;
    if (!ex) return null;
    exFigures = ch.sourceExerciseFigures || {};
    return `${STYLE}<div>
      <h3 style="margin:0 0 .3rem;">✍️ ${esc(ex.title ? ex.title.text : 'Exercise')}</h3>
      ${refs(ex)}
      ${exerciseLang(ex, 'en')}
      <details lang="ur" dir="rtl" style="margin-top:.6rem;background:#f0fdf4;padding:.6rem;border-radius:8px;"><summary style="cursor:pointer;font-weight:700;">اردو ترجمہ</summary><div style="font-family:'Jameel Noori Nastaleeq',serif;font-size:1.15rem;line-height:2.1;color:#166534;">${exerciseLang(ex, 'ur')}</div></details>
      <details lang="ps" dir="rtl" style="margin-top:.6rem;background:#fefce8;padding:.6rem;border-radius:8px;"><summary style="cursor:pointer;font-weight:700;">پښتو ژباړه</summary><div style="font-size:1.05rem;line-height:2;color:#92400e;">${exerciseLang(ex, 'ps')}</div></details>
    </div>`;
  }

  function slos(ch) {
    const pairs = ch.sloPairs;
    if (!pairs || !pairs.length) return '';
    const op = ch.sourceOpening || {};
    return `${STYLE}<section class="math-topic-card" style="padding:1rem;margin:0 0 1rem;line-height:1.8;">
      <h4 style="margin:0 0 .2rem;">🎯 ${esc(op.sloHeading?.text || 'Students Learning Outcomes')} <span class="bio10-ref" style="display:inline;">(textbook, unit opening page${op.printedPage ? ', printed page ' + esc(op.printedPage) : ''})</span></h4>
      <p style="margin:.2rem 0 .5rem;">${esc(op.sloIntro?.text || 'The students will be able to:')}</p>
      <ul style="padding-inline-start:1.4rem;">${pairs.map((p, i) => `<li style="margin:.3rem 0;">${para(p, 'en', `slo-${i}`)}</li>`).join('')}</ul>
      <details lang="ur" dir="rtl" style="margin-top:.5rem;"><summary style="cursor:pointer;">اردو</summary><ul style="font-family:'Jameel Noori Nastaleeq',serif;font-size:1.15rem;line-height:2;color:#166534;">${pairs.map(p => `<li>${esc(p.urdu)}</li>`).join('')}</ul></details>
      <details lang="ps" dir="rtl" style="margin-top:.4rem;"><summary style="cursor:pointer;">پښتو</summary><ul style="font-size:1.05rem;line-height:2;color:#92400e;">${pairs.map(p => `<li>${esc(p.pashto)}</li>`).join('')}</ul></details>
    </section>`;
  }

  function wrap(name, replacement) {
    if (typeof root[name] !== 'function') return;
    SBHooks.use(name, function (original) { return function (...args) { return replacement(original, args); }; });
  }
  wrap('renderScienceLessonSubContent', (old, args) => {
    const [subjKey, ch, subTab] = args;
    if (subjKey === 'bio' && isCls10() && owns(ch)) {
      if (subTab === 'translations') return lesson(ch);
      if (subTab === 'exercise') { const html = exercise(ch); if (html) return html + `<details style="margin-top:1rem;"><summary style="cursor:pointer;font-weight:700;">SpaceBook practice questions (not printed in the textbook)</summary>${old(...args)}</details>`; }
      if (subTab === 'slos') return slos(ch) + old(...args);
    }
    return old(...args);
  });
  root.Biology10SourceReader = {owns, lesson, exercise, slos, figure, blocks};
})(typeof globalThis !== 'undefined' ? globalThis : window);
