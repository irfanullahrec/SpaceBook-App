/* Class12 study views use the same cards and navigation as Class9.
 * Content stays in subject data. Unanswered or ambiguous records never get an
 * invented first-option answer or a generic model solution. */
(function () {
  const safe = value => sanitize(String(value ?? ''));
  const subjectIds = {phys:'phy',chem:'chem',bio:'bio',stat:'stat',eng:'eng',urdu:'urdu',pakstudy:'pak',comp:'comp',civics:'civics',econ:'econ',hpe:'hpe',islopt:'islopt',islhist:'islhist',quran:'quran'};
  const subjectKey = id => Object.keys(subjectIds).find(key => id === key || id === 'cls12-'+subjectIds[key]);
  SBHooks.use('selectSubjectChapter', function (originalSelect) { return function (key,index,classId) {
    if(classId !== 'cls12')return originalSelect(key,index,classId);
    state.selectedSubjChapter=index;
    document.querySelectorAll('.bio-ch-btn, .math-ch-btn').forEach((button,i)=>button.classList.toggle('active',i===index));
    const subject=(DATA.subjects.cls12||[]).find(item=>item.id==='cls12-'+subjectIds[key]);
    renderSubjectChapterView(key,index,classId,subject);
  }; });
  SBHooks.use('openGenericChapterDetails', function (originalGeneric) { return function (classId,id,name,number) {
    if(classId==='cls12'&&id==='cls12-math'){
      const index=MATH_12_DATA.findIndex(ch=>String(ch.number??ch.num)===String(number));
      openSubject('cls12','cls12-math');
      selectMathChapter(index<0?0:index);
      switchMathTab('lesson');
      return;
    }
    const key=subjectKey(id);
    if(classId!=='cls12'||!key)return originalGeneric(classId,id,name,number);
    const subject=(DATA.subjects.cls12||[]).find(item=>item.id==='cls12-'+subjectIds[key]);
    const chapters=getSubjectChapterList(key,classId),index=chapters.findIndex(ch=>String(ch.number??ch.num)===String(number));
    state.selectedSubjChapter=index<0?0:index;
    state.activeSubjTab='lesson';
    openSubjectWorkspace(classId,key,subject);
  }; });
  SBHooks.use('openSubjectWorkspace', function (originalWorkspace) { return function (classId,key,subject) {
    if(classId==='cls12'){
      const chapters=getSubjectChapterList(key,classId);
      if(!chapters[state.selectedSubjChapter])state.selectedSubjChapter=0;
    }
    const result=originalWorkspace(classId,key,subject);
    if(classId==='cls12'){
      const area=document.getElementById('subjectTopicArea'),shell=area?.closest('.math-unified-view');
      if(shell){shell.dataset.class12Subject=key;const count=shell.querySelector('.math-sidebar-sub');if(count)count.textContent=getSubjectChapterList(key,classId).length+' textbook units';}
    }
    return result;
  }; });
  window.getClass12SubjectTabs=function(key,tabs){
    const result=tabs.filter(tab=>tab.id!=='booktext'); // same tab names as Class 9/10
    if(!result.some(tab=>tab.id===state.activeSubjTab))state.activeSubjTab='lesson';
    return result;
  };
  const array=value=>Array.isArray(value)?value:[];
  const qText=item=>typeof item==='string'?item:item?.q||item?.question||item?.problem||item?.title||'';
  const clean=value=>String(value??'').replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/^[A-Da-d][.)]\s*/,'').replace(/\s+/g,' ').trim().toLowerCase();
  function choices(item){
    const options=array(item.options||item.opts);
    if(item.choiceIssues)return {options,correct:null};
    let correct=null;
    const raw=typeof item.correct==='string' && /^\d+$/.test(item.correct) ? Number(item.correct) : item.correct ?? item.ans ?? item.answer;
    if(typeof raw==='number'&&Number.isInteger(raw)&&raw>=0&&raw<options.length)correct=raw;
    else if(typeof raw==='string'){
      const matched=options.map((option,index)=>clean(option)===clean(raw)?index:-1).filter(index=>index>=0);
      if(matched.length===1)correct=matched[0];
      else if(/^[A-Da-d][.)]?$/.test(raw.trim()))correct=raw.trim().toUpperCase().charCodeAt(0)-65;
    }
    if(correct===null||correct<0||correct>=options.length)correct=null;
    if(new Set(options.map(clean)).size!==options.length)correct=null;
    return {options,correct};
  }
  window.getClass12QuestionBank=function(chapter,kind='exercise'){
    const bank={mcqs:[],objective:[],shortQuestions:[],longQuestions:[],numericals:[],activities:[]};
    const canonical=kind==='exercise'?chapter.class12Exercise:chapter.class12StudyBank||chapter.class12Exercise;
    const holders=canonical?[canonical]:kind==='exercise'?[chapter.exercise||chapter.textbookExercise||{}]:[chapter.sloBank,chapter.slos,chapter.sloQuestions,chapter.exercise||chapter.textbookExercise].filter(item=>item&&!Array.isArray(item));
    const aliases={mcqs:['textbookMcqs','mcqs'],shortQuestions:['comprehension','shortQuestions','sqs','crqs','sq'],longQuestions:['detailedQuestions','longQuestions','essayQuestions','erqs','lqs','lq'],objective:['objective'],numericals:['numericals'],activities:['activities','practicalActivities']};
    for(const [category,fields] of Object.entries(aliases)){
      const seen=new Map();
      for(const holder of holders)for(const field of fields)for(const item of array(holder[field])){
        const text=qText(item),key=clean(text);if(!key)continue;
        const record=typeof item==='string'?{q:item}:{...item,q:text};
        if(seen.has(key)){
          const saved=bank[category][seen.get(key)];
          for(const [field,value] of Object.entries(record))if(saved[field]===undefined||saved[field]===''||(Array.isArray(saved[field])&&!saved[field].length))saved[field]=value;
          continue;
        }
        seen.set(key,bank[category].length);bank[category].push(record);
      }
    }
    return bank;
  };
  const translation=(item,answer=false)=>{
    const ur=answer?(item.solUrdu||item.expUrdu||item.answerUrdu||item.ansUrdu):[item.qUrdu||item.questionUrdu,...array(item.optionsUrdu)].filter(Boolean).join('\n');
    const ps=answer?(item.solPashto||item.expPashto||item.answerPashto||item.ansPashto):[item.qPashto||item.questionPashto,...array(item.optionsPashto)].filter(Boolean).join('\n');
    // Urdu-medium books show the Urdu original as the question and give English as a translation.
    const en=answer?(item.solEnglish||item.answerEnglish):[item.qEnglish,...array(item.optionsEnglish)].filter(Boolean).join('\n');
    const label=[en&&'English',ur&&'Urdu',ps&&'Pashto'].filter(Boolean).join(' / ');
    return en||ur||ps?`<details class="class12-language"><summary>${answer?'Answer':'Question'} in ${label}</summary>${en?`<p lang="en">${safe(en)}</p>`:''}${ur?`<p dir="rtl" lang="ur">${safe(ur)}</p>`:''}${ps?`<p dir="rtl" lang="ps">${safe(ps)}</p>`:''}</details>`:'';
  };
  function answerBody(item,choice){
    const text=item.sol||item.solution||item.explanation||item.exp||item.plainAnswer||(typeof item.answer==='string'?item.answer:typeof item.ans==='string'?item.ans:'')||item.desc||'';
    const steps=array(item.steps);
    const final=item.plainAnswer||(typeof item.answer==='string'?item.answer:'');
    const hasAnswer=text||steps.length||choice.correct!==null;
    return `${item.answerOrigin||item.solutionOrigin?`<p class="class12-study-note">${safe(item.answerOrigin||item.solutionOrigin)}</p>`:''}${item.sourceClarification?`<p class="class12-study-note">${safe(item.sourceClarification)}</p>`:''}
      ${choice.correct!==null?`<p><strong>Correct answer: ${String.fromCharCode(65+choice.correct)}. ${safe(choice.options[choice.correct])}</strong></p>`:''}
      ${steps.length?((()=>{const st=steps.map(step=>typeof step==='string'?step:step.text||'');return window.SBVR&&window.SBVR.autoHtml&&!st.some(s=>/\n/.test(s))?window.SBVR.autoHtml({steps:st,question:item.q,solutionStatus:item.solutionStatus}):'';})())||`<ol>${steps.map(step=>{const s=typeof step==='string'?step:step.text||'';return /\n/.test(s)?`<li><pre class="class12-answer-code"><code>${safe(s)}</code></pre></li>`:`<li>${safe(s)}</li>`;}).join('')}</ol>`:text?`<div class="class12-answer-text">${text}</div>`:''}
      ${steps.length&&final?`<p><strong>Answer:</strong> ${final}</p>`:''}
      ${translation(item,true)}
      ${!hasAnswer?'<p class="class12-study-note" data-answer-pending="true">The answer to this saved question still needs to be completed.</p>':''}`;
  }
  function card(item,index,prefix){
    const choice=choices(item),canQuiz=choice.options.length>1&&choice.correct!==null;
    return `<article class="math-topic-card class12-question" id="${safe(prefix)}-${index}">
      <div class="math-badge">${choice.options.length?'MCQ':'Question'} ${safe(item.qNo||index+1)}</div>
      ${item.origin==='SpaceBook supplementary practice'?'<p class="class12-study-note">SpaceBook supplementary practice</p>':''}
      <div class="class12-question-text" dir="auto">${item.q}</div>${translation(item)}
      ${item.diagramSvg||''}
      ${choice.options.length?`<div class="class12-choices"${item.lang==='ur'?' dir="rtl"':''}>${choice.options.map((option,i)=>canQuiz?`<button type="button" class="math-mcq-opt" data-option="${i}" data-correct="${choice.correct}" onclick="class12CheckAnswer(this)"><strong>${String.fromCharCode(65+i)}.</strong> ${option}</button>`:`<div><strong>${String.fromCharCode(65+i)}.</strong> ${option}</div>`).join('')}</div><p role="status"></p>`:''}
      <details class="class12-answer"${item.lang==='ur'?' dir="rtl"':''}><summary>Show answer and explanation</summary>${answerBody(item,choice)}</details>
    </article>`;
  }
  window.class12CheckAnswer=function(button){
    const card=button.closest('.class12-question'),correct=Number(button.dataset.correct),chosen=Number(button.dataset.option);
    card.querySelectorAll('[data-option]').forEach(option=>{const isCorrect=Number(option.dataset.option)===correct;option.classList.toggle('class12-correct',isCorrect);option.classList.toggle('class12-incorrect',option===button&&!isCorrect);option.setAttribute('aria-pressed',String(option===button));});
    card.querySelector('[role="status"]').textContent=correct===chosen?'Correct. The explanation is shown below.':`The correct answer is ${String.fromCharCode(65+correct)}. Read the explanation below.`;
    card.querySelector('.class12-answer').open=true;
  };
  function renderBank(key,chapter,kind){
    const bank=getClass12QuestionBank(chapter,kind);
    const fields=[['mcqs','🎯 MCQs'],['objective','🧩 Fill in, True/False & Matching'],['shortQuestions','📝 Short Questions'],['longQuestions','📚 Long Questions'],['numericals','🔢 Numericals'],['activities','🛠️ Activities']]; // Class 9 wording
    const available=fields.filter(([field])=>bank[field].length);
    if(!available.length)return null;
    const stateKey=kind==='exercise'?'class12ExerciseCategory':'class12StudyCategory';
    const active=available.find(([field])=>field===state[stateKey])?.[0]||available[0][0];state[stateKey]=active;
    return `<section class="class12-study-bank"><h3>${kind==='exercise'?'✍️ Solved Textbook Exercises':'🎯 Board SLO Based Examination Bank'}</h3><div class="category-sub-tabs-bar">${available.map(([field,label])=>`<button type="button" class="category-sub-tab-btn ${active===field?'active':''}" data-category="${field}" onclick="class12SwitchQuestionCategory('${safe(key)}','${kind}','${field}')">${label} (${bank[field].length})</button>`).join('')}</div><div class="class12-question-list">${bank[active].map((item,index)=>card(item,index,'class12-'+key+'-'+kind)).join('')}</div></section>`;
  }
  window.class12SwitchQuestionCategory=function(key,kind,category){
    state[kind==='exercise'?'class12ExerciseCategory':'class12StudyCategory']=category;
    const ch=getSubjectChapterList(key,state.selectedClass)[state.selectedSubjChapter||0],container=document.getElementById('subjTabContent');
    container.innerHTML=kind==='exercise'?renderSubjectExerciseTab(key,ch):renderSubjectSLOsTab(key,ch);
    typesetChapterMath(container);
  };
  const studyClass=ch=>state.selectedClass==='cls12'||(state.selectedClass==='cls11'&&ch&&ch.class11Adapted);
  SBHooks.use('renderSubjectExerciseTab', function (oldExercise) { return function (key,ch) {
    if(!studyClass(ch))return oldExercise(key,ch);
    const bank=renderBank(key,ch,'exercise');
    if(bank)return bank;
    // Leave source questions visible where structured question/answer matching
    // is still pending. Never promote fragmented legacy OCR into a quiz.
    const sections=(ch.sections||[]).filter(s=>/exercise|مشق|تمرین/i.test(s.title||''));
    if(!sections.length)return '<p class="class12-study-note">This unit has no separate saved textbook exercise. Its lesson and chapter questions remain available in the adjoining tabs.</p>';
    return '<h3>Textbook Exercises</h3>'+sections.map((s,i)=>`<details class="math-topic-card class12-source-exercise"><summary>${safe(s.title)}</summary>${s.sourceLayout?renderScienceSourceLayout(s,s.paras||getScienceSectionParagraphsWithTranslations(s,ch,key),'en','class12-ex-'+i):renderTextbookLessonBody(s.theory||s.content||'')}</details>`).join('');
  }; });
  SBHooks.use('renderSubjectSLOsTab', function (oldStudy) { return function (key,ch) {
    if(!studyClass(ch))return oldStudy(key,ch);
    return renderBank(key,ch,'study')||'<p class="class12-study-note">No separate chapter question bank is saved for this unit. The textbook questions are available under Exercises.</p>';
  }; });
})();
