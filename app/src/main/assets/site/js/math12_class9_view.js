/* Class 12 uses the shared mathematics cards with its own source-backed content. */
(function () {
  const safe = value => sanitize(String(value == null ? '' : value));
  const context = () => getMathChapterList('cls12')[state.selectedMathChapter || 0];
  const chapterBank = (chapter, section) => typeof getMath12StudyBank === 'function'
    ? getMath12StudyBank(chapter, section) : (chapter.slos || {});
  const nativeSourceRenderer = renderMathSourceBlocks;
  const languageDetails = (urdu,pashto,label) => (urdu || pashto) ? `<details class="math12-question-translations"><summary>${label || 'Urdu / Pashto'}</summary>${urdu ? `<p lang="ur" dir="rtl">${safe(urdu)}</p>` : ''}${pashto ? `<p lang="ps" dir="rtl">${safe(pashto)}</p>` : ''}</details>` : '';
  SBHooks.use('renderMathSourceOpening', function (originalSourceOpening) { return function (chapter) {
    const content=originalSourceOpening(chapter);
    return state.selectedClass === 'cls12' && content ? `<details class="math-topic-card math12-source-overview"><summary>Book information and learning objectives</summary>${content}</details>` : content;
  }; });

  window.renderMath12TopicTabs = function (section) {
    return [['english','📖 English'],['urdu','🌐 Urdu'],['pashto','🌐 Pashto'],['video','🎥 Video'],['exercise','✍️ Topic Exercise'],['slos','🎯 Topic SLOs']]
      .map(([key,label]) => `<button type="button" class="topic-sub-tab-btn ${key === 'english' ? 'active' : ''}" data-subtab="${key}" onclick="switchMathTopicSubTab('${safe(section.id)}','${key}',this)">${label}</button>`).join('');
  };

  function translatedLesson(section, language) {
    const lang = language === 'urdu' ? 'ur' : 'ps';
    const label = lang === 'ur' ? 'Urdu' : 'Pashto';
    const full = lang === 'ur' ? section.theoryUrdu : section.theoryPashto;
    if (full) return `<div class="math-book-body" lang="${lang}" dir="rtl">${renderTextbookLessonBody(full)}</div>`;
    let translated = 0, pending = 0;
    const body = (section.sourceBlocks || []).map(block => {
      const pairs = block.sentenceTranslations;
      if (Array.isArray(pairs) && pairs.length) {
        return pairs.map(pair => {
          if (!pair[lang]) { pending++; return nativeSourceRenderer([{type:'paragraph',text:pair.en}]); }
          translated++;
          return `<div class="math12-language-passage"><p lang="${lang}" dir="rtl">${safe(pair[lang])}</p><details><summary>English source</summary>${nativeSourceRenderer([{type:'paragraph',text:pair.en}])}</details></div>`;
        }).join('');
      }
      if (block.type === 'list' && Array.isArray(block.items)) {
        return '<ul class="math-book-list">'+block.items.map(item => {
          const matches = typeof MATH12_SENTENCE_TRANSLATIONS !== 'undefined' ? MATH12_SENTENCE_TRANSLATIONS[item] : null;
          if (matches && matches.every(pair=>pair[lang])) { translated+=matches.length; return `<li lang="${lang}" dir="rtl">${matches.map(pair=>safe(pair[lang])).join(' ')}</li>`; }
          pending++; return `<li lang="en">${safe(item)}</li>`;
        }).join('')+'</ul>';
      }
      if (block.headerSentenceTranslations || block.cellSentenceTranslations) {
        const localized={...block};
        const translatedCell=(value,rows)=>rows?.length ? rows.map(pair=>pair[lang] || pair.en).join(' ') : value;
        if(Array.isArray(block.headers))localized.headers=block.headers.map((value,i)=>translatedCell(value,block.headerSentenceTranslations?.[i]));
        if(Array.isArray(block.rows))localized.rows=block.rows.map((row,r)=>row.map((value,c)=>translatedCell(value,block.cellSentenceTranslations?.[r]?.[c])));
        return nativeSourceRenderer([localized]);
      }
      if (block.captionSentenceTranslations || block.altSentenceTranslations) {
        const localized={...block};
        if (block.captionSentenceTranslations) localized.caption=block.captionSentenceTranslations.map(pair=>pair[lang] || pair.en).join(' ');
        if (block.altSentenceTranslations) localized.alt=block.altSentenceTranslations.map(pair=>pair[lang] || pair.en).join(' ');
        return nativeSourceRenderer([localized]);
      }
      if (['paragraph','heading','clarification'].includes(block.type) && /[A-Za-z]/.test(block.text || '')) pending++;
      return nativeSourceRenderer([block]);
    }).join('');
    return `${pending ? `<p class="math12-study-note">${translated ? `${label} translations are available for ${translated} passages. ` : ''}Remaining passages are shown in English while their ${label} translations are completed.</p>` : ''}${body || renderTextbookLessonBody(section.theory || '')}${section.unreviewedTheory ? `<details class="math12-study-note"><summary>English continuation awaiting source review</summary>${renderTextbookLessonBody(section.unreviewedTheory)}</details>` : ''}`;
  }

  function workedContent(problem) {
    const solution = problem.solution || problem.sol || problem.exp || '';
    const steps = Array.isArray(problem.steps) ? problem.steps : [];
    const answer = problem.answer;
    return `${problem.solutionStatus && problem.solutionStatus.startsWith('partial') ? `<p class="math12-study-note">${safe(problem.solutionStatus)}</p>` : ''}
      ${problem.sourceClarification ? `<p class="math12-study-note">${safe(problem.sourceClarification)}</p>` : ''}
      ${steps.length ? ((window.SBVR && window.SBVR.autoHtml && window.SBVR.autoHtml(problem)) || `<ol>${steps.map(step=>`<li>${safe(step)}</li>`).join('')}</ol>`) : `<div class="math12-worked-text">${safe(solution)}</div>`}
      ${answer ? `<div class="math-result-pill"><strong>Answer:</strong> ${safe(answer)}</div>` : ''}
      ${languageDetails(problem.solUrdu || problem.expUrdu || problem.answerUrdu,problem.solPashto || problem.expPashto || problem.answerPashto,'Answer in Urdu / Pashto')}
      ${problem.solutionDiagram ? renderMathDiagram({...problem,diagram:problem.solutionDiagram},context().number) : ''}
      ${problem.solutionBlocks ? nativeSourceRenderer(problem.solutionBlocks) : ''}`;
  }

  function questionCard(item, index, prefix) {
    const problem = item.sourceProblem || item;
    const question = item.q || problem.question || problem.problem || '';
    const isMcq = Array.isArray(item.options) && Number.isInteger(item.correct) && item.correct >= 0 && item.correct < item.options.length;
    const uid = prefix+'-'+index;
    const options = isMcq ? `<div class="math12-answer-options">${item.options.map((option,i)=>`<button type="button" class="math-mcq-opt" data-option="${i}" data-correct="${item.correct}" onclick="math12CheckStudyAnswer(this)"><strong>${String.fromCharCode(65+i)}.</strong> ${safe(option)}</button>`).join('')}</div><p role="status" class="math12-answer-status"></p>` : `${problem.options ? `<ol type="a">${problem.options.map(option=>`<li>${safe(option)}</li>`).join('')}</ol>` : ''}${problem.sourceQuestionBlocks ? nativeSourceRenderer(problem.sourceQuestionBlocks) : ''}`;
    return `<article class="math-topic-card math12-study-question" id="${safe(uid)}">
      <div class="math-badge">${isMcq ? 'MCQ' : 'Question'} ${safe(problem.qNo || index+1)}</div>
      ${item.origin === 'SpaceBook supplementary practice' ? '<p class="math12-study-note">SpaceBook supplementary practice</p>' : ''}
      <div class="math12-question-text">${safe(question)}</div>
      ${languageDetails(problem.qUrdu || problem.questionUrdu,problem.qPashto || problem.questionPashto,'Question in Urdu / Pashto')}
      ${renderMathDiagram(problem,context().number)}${options}
      <details class="math12-worked-answer"><summary>Show answer and working</summary>
        ${isMcq ? `<p><strong>Correct answer: ${String.fromCharCode(65+item.correct)}. ${safe(item.options[item.correct])}</strong></p>` : ''}
        ${workedContent({...problem,sol:problem.sol || item.sol || item.exp,answer:problem.answer || item.answer})}
        ${isMcq && problem.optionExplanations ? `<ol type="A">${problem.optionExplanations.map(reason=>`<li>${safe(reason)}</li>`).join('')}</ol>` : ''}
      </details></article>`;
  }
  window.math12CheckStudyAnswer = function (button) {
    const card = button.closest('.math12-study-question');
    const correct = Number(button.dataset.correct), chosen = Number(button.dataset.option);
    card.querySelectorAll('[data-option]').forEach(option => {
      const isAnswer = Number(option.dataset.option) === correct;
      option.classList.toggle('math12-option-correct',isAnswer);
      option.classList.toggle('math12-option-incorrect',option === button && !isAnswer);
      option.setAttribute('aria-pressed',String(option === button));
    });
    card.querySelector('[role="status"]').textContent = chosen === correct ? 'Correct. The working is shown below.' : `The correct answer is ${String.fromCharCode(65+correct)}. Read the working below.`;
    card.querySelector('.math12-worked-answer').open = true;
  };

  window.renderMath12StudyCategory = function (category, bank, prefix='math12-study') {
    const items = category === 'mcqs' ? bank.mcqs || [] : category === 'sqs' ? bank.shortQuestions || [] : bank.longQuestions || [];
    return items.length ? items.map((item,index)=>questionCard(item,index,prefix)).join('') : `<p class="math12-study-note">This ${bank.scope === 'chapter' ? 'chapter' : 'topic'} has no separate ${category === 'mcqs' ? 'multiple-choice' : category === 'sqs' ? 'short' : 'long'} question set. Its available questions and worked answers are in the other categories.</p>`;
  };
  window.math12SwitchTopicStudy = function (button, topicId, category) {
    const chapter=context(),section=chapter.sections.find(item=>item.id===topicId);
    const root=button.closest('.math12-topic-study');
    root.querySelectorAll('[data-study-category]').forEach(tab=>tab.classList.toggle('active',tab===button));
    const content=root.querySelector('.math12-topic-study-content');
    content.innerHTML=renderMath12StudyCategory(category,chapterBank(chapter,section),'math12-'+topicId+'-'+category);
    typesetChapterMath(content);
  };
  window.renderMath12TopicContent = function (section, chapter, tab) {
    if (tab === 'english') return null;
    if (tab === 'urdu' || tab === 'pashto') return translatedLesson(section,tab);
    if (tab === 'video') return `<div class="math-topic-card"><h4>${safe(section.title)}</h4><p>No video is attached to this topic yet. The lesson, diagrams, examples and worked questions are available in the adjoining tabs.</p></div>`;
    if (tab === 'exercise') {
      const exercises=typeof getMath12TopicExercises === 'function' ? getMath12TopicExercises(chapter,section) : [];
      return exercises.length ? exercises.map((exercise,index)=>`<section><h4>${safe(exercise.title || exercise.exercise)}</h4>${exercise.problems.map((problem,i)=>questionCard({sourceProblem:problem},i,'math12-topic-'+section.id+'-'+index)).join('')}</section>`).join('') : `<p class="math12-study-note">There is no separate printed exercise for this topic. Use the chapter’s Examples and Exercises tabs for the available worked questions.</p>`;
    }
    if (tab === 'slos') {
      const bank=chapterBank(chapter,section);
      return `<section class="math12-topic-study"><p class="math12-study-note">${bank.scope === 'chapter' ? 'Chapter' : 'Topic'} practice with worked answers.</p><div class="category-sub-tabs-bar">${[['mcqs','MCQs'],['sqs','Short Questions'],['lqs','Long Questions']].map(([key,label])=>`<button type="button" class="category-sub-tab-btn ${key==='mcqs'?'active':''}" data-study-category="${key}" onclick="math12SwitchTopicStudy(this,'${safe(section.id)}','${key}')">${label} (${(bank[key==='mcqs'?'mcqs':key==='sqs'?'shortQuestions':'longQuestions']||[]).length})</button>`).join('')}</div><div class="math12-topic-study-content">${renderMath12StudyCategory('mcqs',bank,'math12-'+section.id+'-mcqs')}</div></section>`;
    }
    return null;
  };

  SBHooks.use('renderMathSloCategoryContent', function (oldCategory) { return function (category,bank) {
    return state.selectedClass === 'cls12' ? renderMath12StudyCategory(category,bank) : oldCategory(category,bank);
  }; });
  SBHooks.use('renderMathSLOs', function (oldStudyView) { return function (chapter) {
    if (state.selectedClass !== 'cls12') return oldStudyView(chapter);
    const bank=chapterBank(chapter), active=state.activeMathSloCategory || 'mcqs';
    return `<section><h3>MCQs, Short Questions and Long Questions</h3><p class="math12-study-note">Textbook questions and chapter practice, with answers and worked solutions.</p><div class="category-sub-tabs-bar">${[['mcqs','MCQs','mcqs'],['sqs','Short Questions','shortQuestions'],['lqs','Long Questions','longQuestions']].map(([key,label,field])=>`<button type="button" class="category-sub-tab-btn slo-sub-cat-btn ${active===key?'active':''}" data-cat="${key}" onclick="switchMathSloCategory('${key}')">${label} (${(bank[field]||[]).length})</button>`).join('')}</div><div id="mathSloContentArea">${renderMath12StudyCategory(active,bank)}</div></section>`;
  }; });
  SBHooks.use('renderMathExercises', function (oldExercises) { return function (chapter) {
    if (state.selectedClass !== 'cls12' || !chapter.exercises?.length) return oldExercises(chapter);
    // Keep original indexes: switchMathEx reads the original chapter array.
    const visible=chapter.exercises.map((exercise,index)=>({exercise,index})).filter(({exercise})=>exercise.problems?.length || exercise.sourceContextBlocks?.length);
    if (!visible.length) return oldExercises(chapter);
    const selected=visible.find(item=>String(item.index)===String(state.activeMathEx)) || visible[0];
    const html=`<div class="math-sub-tabs">${visible.map(({exercise,index})=>`<button type="button" class="math-sub-tab-btn ${index===selected.index?'active':''}" data-ex="${index}" onclick="switchMathEx('${index}')">${safe(exercise.title || exercise.exercise)}</button>`).join('')}</div><div id="mathExerciseContent"></div>`;
    setTimeout(()=>{if(state.activeMathTab==='exercises' && context()===chapter)switchMathEx(String(selected.index));},10);
    return html;
  }; });
})();
