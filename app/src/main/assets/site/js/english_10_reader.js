/* Readers for explicitly reviewed Class 10 English chapters. Other routes retain their existing renderers. */
(function (root) {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // the cheap flag first: asking DATA.eng10Chapters about a Class 11/12 chapter would load the Class 10 English book (lazy page)
  const owns = ch => !!(ch && ch.sourceReader === true && typeof DATA !== 'undefined' && DATA.eng10Chapters?.includes(ch));
  const card = (title, body) => `<section class="math-topic-card eng10-source-card" style="margin-bottom:1rem;padding:1rem;line-height:1.8"><h3>${esc(title)}</h3>${body}</section>`;
  let serial = 0;
  function reading(p) {
    if (typeof p === 'string') p = {text:p};
    if(p?.kind==='list')return `<ul>${p.items.map(item=>`<li>${reading(item)}</li>`).join('')}</ul>`;
    if (!p?.text) return '';
    if(p.sourceLanguage==='ur')return `<details style="margin:.7rem 0"><summary lang="ur" dir="rtl">${esc(p.text)}</summary><div lang="en"><strong>English</strong>${reading({text:p.english,urdu:p.text,pashto:p.pashto})}</div><p lang="ps" dir="rtl"><strong>پښتو</strong> ${esc(p.pashto)}</p></details>`;
    const id = 'eng10-source-' + (++serial);
    let html = p.urdu && p.pashto && typeof renderInteractiveParagraphHtml === 'function'
      ? renderInteractiveParagraphHtml(p.text, p.urdu || '', p.pashto || '', id, true)
      : esc(p.text);
    if(p.underline && p.text.includes(p.underline)) {
      const start=p.text.indexOf(p.underline),end=start+p.underline.length;
      const tokens=[...p.text.matchAll(/\S+/g)].filter(m=>/[a-zA-Z0-9'-]/.test(m[0]));
      let i=0;
      html=html.replace(/<span class="tts-word dict-clickable-word"[^>]*>[^<]*<\/span>/g,span=>{
        const token=tokens[i++];
        return token&&token.index<end&&token.index+token[0].length>start?span.replace('<span ','<span style="text-decoration:underline;text-underline-offset:3px" '):span;
      });
    }
    // Paragraph-level pairing avoids guessed sentence alignment at names, initials or quotations.
    return `<div class="para-text-box" style="white-space:pre-line;margin:.6rem 0;${p.kind==='quote'?'border:2px solid #64748b;padding:1.2rem;text-align:center;':''}">${html}</div>`;
  }
  function translatedTitle(text, urdu, pashto) {
    return `<h4>${esc(text)}</h4>${urdu||pashto?`<details><summary>اردو / پښتو</summary><p lang="ur" dir="rtl">${esc(urdu)}</p><p lang="ps" dir="rtl">${esc(pashto)}</p></details>`:''}`;
  }
  function answer(q) {
    const selected = Number.isInteger(q.correct) ? q.correct : -1;
    const text = q.answer || q.ans || q.options?.[selected];
    if (!text) return '';
    return `<details style="margin:.5rem 0"><summary>${esc(q.answerType==='source'?'Textbook answer':q.answerLabel||'SpaceBook suggested answer')}</summary>${reading({text,urdu:q.answerUrdu||q.ansUrdu||q.optionsUrdu?.[selected],pashto:q.answerPashto||q.ansPashto||q.optionsPashto?.[selected]})}</details>`;
  }
  const qPair = q => ({text:q.question||q.q||q.sentence,urdu:q.questionUrdu||q.qUrdu,pashto:q.questionPashto||q.qPashto,underline:q.sourceUnderline});
  function questions(items) {
    const mcq = q => q.options && q.options.length > 1 && Number.isInteger(q.correct) && q.correct < q.options.length && window.SBMcq
      ? SBMcq.html({stem: reading(qPair(q)), options: q.options.map(esc), correct: q.correct, explain: q.explanation ? esc(q.explanation) : ''}) : '';
    return `<ol>${(items||[]).map(q=>mcq(q)?`<li>${mcq(q)}</li>`:`<li>${reading(qPair(q))}${q.options?`<ol type="a">${q.options.map((o,i)=>`<li>${reading({text:o,urdu:q.optionsUrdu?.[i],pashto:q.optionsPashto?.[i]})}</li>`).join('')}</ol>`:''}${answer(q)}</li>`).join('')}</ol>`;
  }
  function table(headers, rows) {
    return `<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse"><thead><tr>${headers.map(h=>`<th style="border:1px solid #cbd5e1;padding:.5rem;text-align:left">${typeof h==='object'?reading(h):esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td style="border:1px solid #cbd5e1;padding:.5rem;vertical-align:top">${typeof c==='object'?reading(c):esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function grammar(ch) {
    const groups = ch.exercise?.grammarActivities || [];
    return (Array.isArray(groups)?groups:Object.values(groups)).map(g=>{
      if (Array.isArray(g)) return card('Grammar',questions(g));
      let body = translatedTitle(g.topic||'Grammar',g.topicUrdu,g.topicPashto);
      body += reading({text:g.instructions||g.instruction,urdu:g.instructionsUrdu||g.instructionUrdu,pashto:g.instructionsPashto||g.instructionPashto});
      body += reading({text:g.rule,urdu:g.ruleUrdu,pashto:g.rulePashto});
      body += (g.pairs||[]).map(reading).join('');
      if(g.table)body+=table(g.table.headers,g.table.rows);
      if(g.markers) body += table(['The clause markers can indicate:','Words'],g.markers.map(m=>[{text:m.kind,urdu:m.kindUrdu,pashto:m.kindPashto},{text:m.words,urdu:m.wordsUrdu,pashto:m.wordsPashto}]));
      body += g.diagramSvg||'';
      body += (g.examplePairs||[]).map(reading).join('');
      if(!g.examplePairs) body += (g.examples||[]).map(p=>reading(typeof p==='string'?p:{text:p.sentence,urdu:p.urdu,pashto:p.pashto})).join('');
      body += questions(g.exercises);
      if(g.sourceClarification) body += `<aside>${esc(g.sourceClarification)}</aside>`;
      return `<section class="math-topic-card" style="padding:1rem;margin:1rem 0;line-height:1.8">${body}</section>`;
    }).join('');
  }
  function exercises(ch) {
    const e=ch.exercise||{};
    let html=card('Comprehension',reading(e.comprehensionInstruction)+questions(e.comprehension));
    if(e.textbookMcqs?.length)html+=card('Choose the correct option.',reading(e.mcqInstruction)+questions(e.textbookMcqs));
    if(e.sourceGap)html+=card('Source note',reading(e.sourceGap));
    if(e.vocabulary?.length) html+=card('Glossary',table(['Words','Meaning'],e.vocabulary.map(v=>[v.word,{text:v.meaning,urdu:v.urdu,pashto:v.pashto}])));
    if(e.rootTable) html+=card('Vocabulary',reading(e.rootIntroduction)+table(['root words','meaning','examples'],e.rootTable.map(v=>[v.root,{text:v.meaning,urdu:v.meaningUrdu,pashto:v.meaningPashto},v.examples]))+reading(e.rootPracticePair)+`<p>${esc((e.rootWordPractice||[]).join(' · '))}</p>`);
    html+=(e.sourceVocabularyActivities||[]).map(v=>card(v.title,(v.pairs||[]).map(reading).join('')+(v.words?`<p>${esc(v.words.join(' · '))}</p>`:'')+(v.table?table(v.table.headers,v.table.rows):'')+(v.diagramSvg||'')+(v.afterPairs||[]).map(reading).join(''))).join('');
    html+=(e.writingTasks||[]).map(w=>card(w.title||w.prompt,(w.pairs||[{text:w.content||w.prompt,urdu:w.contentUrdu||w.urdu,pashto:w.contentPashto||w.pashto}]).map(reading).join(''))).join('');
    if(e.speakingActivity){const s=e.speakingActivity;html+=card('Listening and speaking',(s.pairs||[{text:s.instructions||s.content,urdu:s.instructionsUrdu||s.urdu,pashto:s.instructionsPashto||s.pashto}]).map(reading).join('')+(s.sourceIncomplete?'<p>Part of this instruction is unreadable in the available source scan.</p>':''));}
    return html+grammar(ch)+(e.sourceReviewGroups?card(e.sourceReviewTitle||'Review Unit 6 - 10',grammar({exercise:{grammarActivities:e.sourceReviewGroups}})):'');
  }
  function lesson(ch) {
    let html='';
    const visual=v=>card(v.title,v.svg+(v.captionPairs||[]).map(reading).join(''));
    const visuals=(ch.sourceVisuals||[]).filter(v=>v.svg&&!v.supplementary);
    if(ch.preReadingQuestions?.length)html+=card('Pre-reading',questions(ch.preReadingQuestions.map((q,i)=>({q,questionUrdu:ch.preReadingQuestionsUrdu?.[i],questionPashto:ch.preReadingQuestionsPashto?.[i]}))));
    html+=visuals.filter(v=>v.placement==='pre-reading').map(visual).join('');
    for(const s of ch.sections||[]) {
      const pairs=s.sourcePairs || getSectionParagraphsWithTranslations(s,ch);
      const sectionVisuals=visuals.filter(v=>v.sectionId?v.sectionId===s.id:v.sectionHeading===s.heading);
      const headingTranslation=s.headingUrdu||s.headingPashto?`<details><summary>اردو / پښتو</summary><p lang="ur" dir="rtl">${esc(s.headingUrdu)}</p><p lang="ps" dir="rtl">${esc(s.headingPashto)}</p></details>`:'';
      html+=card(s.heading||ch.title,headingTranslation+pairs.map((p,i)=>reading(p)+sectionVisuals.filter(v=>v.afterParagraph===i).map(visual).join('')).join('')+(s.diagramSvg||''));
      html+=sectionVisuals.filter(v=>!Number.isInteger(v.afterParagraph)).map(visual).join('');
    }
    if(ch.authorInfo)html+=card('About the poet',reading({text:ch.authorInfo,urdu:ch.authorInfoUrdu,pashto:ch.authorInfoPashto}));
    html+=(ch.sourceNotes||[]).map(p=>card('Textbook note',reading(p))).join('');
    if(ch.sourceCredit)html+=card('Source',reading(ch.sourceCredit)+(ch.sourceCreditUrl?`<p><a href="${esc(ch.sourceCreditUrl)}">${esc(ch.sourceCreditUrl)}</a></p>`:''));
    html+=visuals.filter(v=>!v.placement&&!v.sectionHeading&&!v.sectionId).map(visual).join('');
    if(ch.sourceBackMatter)html+=card('Book back matter',ch.sourceBackMatter.pairs.map(reading).join(''));
    return html;
  }
  function slos(ch) {
    return card('Students Learning Outcomes',(ch.sloPairs||ch.slos.map((text,i)=>({text,urdu:ch.slosUrdu?.[i],pashto:ch.slosPashto?.[i]}))).map(reading).join(''));
  }
  function wrap(name, replacement) {
    if(typeof root[name]!=='function')return;
    SBHooks.use(name,function(original){return function(...args){return replacement(original,args);};});
  }
  wrap('renderEngLesson',(old,args)=>owns(args[0])?lesson(args[0]):old(...args));
  wrap('renderEngExercise',(old,args)=>owns(args[0])?exercises(args[0]):old(...args));
  wrap('renderEngSLOs',(old,args)=>owns(args[0])?slos(args[0]):old(...args));
  wrap('renderLangLessonSubContent',(old,args)=>args[0]==='eng'&&owns(args[1])&&['paragraphs','translations','slos'].includes(args[2])?(args[2]==='slos'?slos(args[1]):lesson(args[1])):old(...args));
  wrap('renderLanguageGrammarTab',(old,args)=>args[0]==='eng'&&owns(args[1])?grammar(args[1]):old(...args));
  wrap('renderSubjectExerciseTab',(old,args)=>args[0]==='eng'&&owns(args[1])?exercises(args[1]):old(...args));
  root.English10SourceReader={owns,lesson,exercises,grammar,slos};
})(window);
