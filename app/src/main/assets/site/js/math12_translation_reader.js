/* Exact passage translations from the reviewed Class 12 source. */
(function () {
  const sourceRenderer = renderMathSourceBlocks;
  const safe = value => sanitize(String(value || ''));
  window.math12ReadTranslation = function (button) {
    const text = button.dataset.text, lang = button.dataset.lang;
    const status = button.parentElement.querySelector('[role="status"]');
    const voices = typeof speechSynthesis === 'undefined' ? [] : speechSynthesis.getVoices();
    const voice = voices.find(item => item.lang.toLowerCase().split('-')[0] === lang);
    if (!voice) { status.textContent = 'No '+({en:'English',ur:'Urdu',ps:'Pashto'}[lang])+' voice is available on this device.'; return; }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voice.lang; utterance.voice = voice; utterance.rate = .85;
    status.textContent = 'Reading…';
    utterance.onend = () => { status.textContent = ''; };
    utterance.onerror = () => { status.textContent = 'Audio could not be played.'; };
    speechSynthesis.speak(utterance);
  };
  const listen = (text,lang) => `<button type="button" data-text="${safe(text)}" data-lang="${lang}" onclick="math12ReadTranslation(this)">Listen in ${{en:'English',ur:'Urdu',ps:'Pashto'}[lang]}</button><span role="status" style="font-size:.85rem;"></span>`;
  window.math12ShowWord = function(button,event) {
    event.preventDefault(); event.stopPropagation();
    const key=button.dataset.math12Word, meanings=MATH12_WORD_MEANINGS[key];
    if(!meanings)return;
    let panel=document.getElementById('math12-word-meaning');
    if(!panel){panel=document.createElement('dialog');panel.id='math12-word-meaning';panel.style.cssText='max-width:calc(100vw - 2rem);width:360px;border:1px solid #94a3b8;border-radius:12px;padding:1rem;';document.body.appendChild(panel);}
    panel.innerHTML=`<button type="button" style="float:right;" onclick="this.closest('dialog').close()" aria-label="Close word meaning">×</button><h3>${safe(button.textContent)}</h3><div>${listen(button.textContent,'en')}</div><p lang="ur" dir="rtl">${safe(meanings[0])}</p><div>${listen(meanings[0],'ur')}</div><p lang="ps" dir="rtl">${safe(meanings[1])}</p><div>${listen(meanings[1],'ps')}</div>`;
    panel.showModal();
  };
  const words = text => text.split(/(\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])/).map(part=>/^\\[([]/.test(part)?safe(part):part.split(/([A-Za-z]+(?:-[A-Za-z]+)*)/).map(token => {
    const key=token.toLowerCase();
    const meanings=MATH12_WORD_MEANINGS[key];
    return meanings ? `<button type="button" data-math12-word="${safe(key)}" onclick="math12ShowWord(this,event)" title="اردو: ${safe(meanings[0])} | پښتو: ${safe(meanings[1])}" style="font:inherit;color:inherit;background:none;border:0;padding:0;text-decoration:underline dotted;text-underline-offset:4px;cursor:help;">${safe(token)}</button>` : safe(token);
  }).join('')).join('');
  SBHooks.replace('renderMathSourceBlocks', function (blocks) {
    return blocks.map(block => {
      if(block.type==='list'&&block.items.some(text=>MATH12_SENTENCE_TRANSLATIONS[text]))return `<ul class="math-book-list">${block.items.map(text=>`<li>${renderMathSourceBlocks([{type:'paragraph',text,sentenceTranslations:MATH12_SENTENCE_TRANSLATIONS[text]}])}</li>`).join('')}</ul>`;
      if (!block.sentenceTranslations) {
        const html=sourceRenderer([block]);
        return block.type==='paragraph'&&/[\u0600-\u06ff]/.test(block.text||'') ? html.replace('<p class="math-book-paragraph"','<p dir="auto" class="math-book-paragraph"') : html;
      }
      return `<div class="math-book-body math12-translated-passage">${block.sentenceTranslations.map(pair => `<details style="margin:.75rem 0;line-height:1.9;"><summary style="cursor:pointer;">${words(pair.en)}</summary><div style="padding:.7rem;border-left:3px solid #0284c7;background:#f0f9ff;"><div>${listen(pair.en,'en')}</div><p lang="ur" dir="rtl" style="text-align:right;font-size:1.15rem;line-height:2.2;">${safe(pair.ur)}</p><div>${listen(pair.ur,'ur')}</div><p lang="ps" dir="rtl" style="text-align:right;font-size:1.1rem;line-height:2;">${safe(pair.ps)}</p><div>${listen(pair.ps,'ps')}</div></div></details>`).join('')}</div>`;
    }).join('');
  });
})();
