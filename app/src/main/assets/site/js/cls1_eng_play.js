/* Class 1 English — hands-on play layer for the WHOLE book (units 2-11, reviews, and the loose questions of unit 1).
 *
 * js/cls1_eng_activities.js already turned Unit 1's alphabet worksheets into games. This file looks at every other
 * question of the Class 1 English book, reads the question text + the SpaceBook answer (window.CLS6_SOLUTIONS) and
 * the pictures / tables / dialogue lines printed under it, and mounts a small game for it:
 *   choice      fill-in-the-blank with 2-4 words: tap the word, it jumps into the gap        (pronouns, is/am/are, a/an, rhymes…)
 *   letter      missing letter(s) of a word: tap the right one, the word is read aloud         (Sh_e, __ead, cro__n …)
 *   pairs       match two columns (words ↔ pictures A-F, rhymes, masculine ↔ feminine, sounds) tap-tap with lines
 *   order       jumbled sentences and alphabetical order: tap the word chips in the right order
 *   fix         sentences with missing capital / full stop / comma / article: edit, then check
 *   spell       "circle the correct spelling in each row"
 *   pick        "circle the …" from a word list: tap only the right words
 *   tapword     tap the noun / verb / name inside a sentence
 *   typeanswer  one-word answers (plurals, meanings) · typelist: rows of answers (plurals, feminine, numbers in words)
 *   open        speaking / writing / comprehension questions: type or speak, get praise, hear a model answer
 *   dialogue    role-play: the computer reads one part, you read the other
 *   readaloud   tap every word to hear it, "Read all", then a star
 *   trace       drag along dotted words and sentences (same engine as the alphabet game)
 *   done        everything else: a big "I did it!" star + 🔊 read the question
 * Questions that the SpaceBook MCQ widget already handles (a)-(d) are left alone.
 * The book data is never touched; every game is built next to the printed question. */
(function () {
  'use strict';
  if (typeof window === 'undefined' || window.__c1PlayInit) return;
  window.__c1PlayInit = true;
  const C = window.C1A;
  if (!C) return;
  const {G, PRAISE, TRYAGAIN, pick, rnd, shuffle, el, h, sndOk, sndNo, sndPop, confetti, flyTo, clean} = C;
  const speakEn = C.speak, sayC = C.say;

  /* ---------------------------------------------------------------- small text helpers */
  const norm = s => String(s || '').toLowerCase().replace(/[^\p{L}\p{N}']+/gu, ' ').trim();
  const stripParen = s => String(s || '').replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  const wordsOf = s => String(s || '').match(/[\p{L}\p{M}][\p{L}\p{M}'’-]*|\d+/gu) || [];
  const hasBlank = s => /_{1,}/.test(s);
  const STOP = new Set('a an the is are am was were be been he she they it his her their its of to in on at and for with we you i my our your me us this that these those'.split(' ').concat('ہے ہیں کا کی کے نے کو سے میں اور تھا تھی تھے یہ وہ کہ په د ده دے دي او چې ئې نه'.split(' ')));
  const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);
  const GENERIC = ['big', 'red', 'nice', 'happy', 'book', 'cat', 'run', 'play', 'blue', 'tree', 'sun', 'pen', 'bag', 'cup', 'good'];

  function solAnswer(q) {
    const hasParts = q.classList.contains('m6-q') && q.querySelector(':scope > .m6-parts');
    const b = hasParts ? q.querySelector(':scope > .m6-s .sb-ans') : q.querySelector('.sb-ans');
    const m = b && /m6SolOpen\(this,'([^']+)'/.exec(b.getAttribute('onclick') || '');
    const S = window.CLS6_SOLUTIONS || {};
    return m && S[m[1]] ? String(S[m[1]].answer || '') : null;
  }
  function qText(q) {
    const c = q.cloneNode(true);
    c.querySelectorAll('.m6-tr,.sb-solve,.c1-say,.sb-ans,.m6-qno,.m6-lang,.m6-parts,.c1a-card').forEach(n => n.remove());
    const lab = c.querySelector(':scope > strong:first-child'); if (lab && c.classList.contains('m6-part')) lab.remove();   // "a)" of a part
    return c.textContent.replace(/\s+/g, ' ').trim();
  }
  const parentQ = el => el.classList.contains('m6-part') ? el.closest('.m6-q') : el;
  function instrOf(el) { return el.classList.contains('m6-part') ? qText(parentQ(el)) : ''; }
  function bankFromText(t) {   // "(help, writes, cleans, read)" in an instruction
    const ms = [...String(t).matchAll(/\(([^()]+)\)/g)];
    for (let i = ms.length - 1; i >= 0; i--) {
      const inner = ms[i][1].indexOf(':') >= 0 ? ms[i][1].slice(ms[i][1].lastIndexOf(':') + 1) : ms[i][1];
      const its = inner.split(/\s*[,/،]\s*/).map(x => x.trim()).filter(Boolean);
      if (its.length >= 2 && its.length <= 12 && its.every(x => /^[\p{L}'’ -]{1,24}$/u.test(x) && x.split(' ').length <= 3)) return its;
    }
    return null;
  }
  /* ---------------------------------------------------------------- DOM context around a question */
  const isStop = n => n.classList.contains('m6-q') || n.matches('[role=heading],.m6-h3,.m6-h4,aside,.m6-box');
  function nextOf(q) {
    q = parentQ(q);
    const out = []; let n = q.nextElementSibling;
    while (n && !isStop(n) && out.length < 8) { out.push(n); n = n.nextElementSibling; }
    return out;
  }
  function sameGroup(q) {   // neighbouring questions of the same exercise part, nearest first
    const out = [];
    if (q.classList.contains('m6-part')) { [...q.parentElement.children].forEach(x => { if (x !== q && x.classList.contains('m6-part')) out.push(x); }); return out; }
    [['previousElementSibling', 12], ['nextElementSibling', 12]].forEach(([dir, max]) => {
      let n = q[dir], seen = 0;
      while (n && seen < max) {
        if (n.matches('[role=heading],.m6-h3,.m6-h4')) break;
        if (n.classList.contains('m6-q')) { out.push(n); seen++; }
        n = n[dir];
      }
    });
    return out;
  }
  function wordBank(q) {
    const ib = bankFromText(instrOf(q)); if (ib) return ib;
    q = parentQ(q);
    let n = q.previousElementSibling, steps = 0;
    while (n && steps < 14) {
      steps++;
      if (n.matches('[role=heading],.m6-h3,.m6-h4')) break;
      if (!n.classList.contains('m6-q') && /word bank/i.test(n.textContent)) {
        const t = clean(n); const i = t.lastIndexOf(':');
        const tok = (i >= 0 ? t.slice(i + 1) : '').split(/[\s,/]+/).filter(w => /^[A-Za-z'-]{2,}$/.test(w));
        if (tok.length >= 2 && tok.length <= 12) return tok;
        break;
      }
      n = n.previousElementSibling;
    }
    return null;
  }
  function parenList(t) {   // trailing "(a, b / c)" with 2-6 simple items
    const m = /\(([^()]*)\)\s*[.?!]?\s*$/.exec(t); if (!m) return null;
    const items = m[1].split(/\s*[,/]\s*/).map(x => x.trim()).filter(Boolean);
    return items.length >= 2 && items.length <= 8 ? items : null;
  }

  /* ---------------------------------------------------------------- styles */
  function css() {
    if (document.getElementById('c1p-css')) return;
    const s = document.createElement('style'); s.id = 'c1p-css';
    s.textContent = `
.c1a-mini{margin:.5rem 0 .9rem;padding:.65rem .8rem .75rem;border-width:2px}
.c1a-mini .c1a-h{font-size:.95rem}
.c1a-stem{font-size:1.25rem;font-weight:800;color:#0f172a;line-height:2.2;text-align:center;margin:.2rem 0 .5rem}
.c1a-blank{display:inline-flex;min-width:3.4rem;height:2.4rem;padding:0 .5rem;align-items:center;justify-content:center;border:3px dashed #f472b6;border-radius:12px;color:#be185d;background:#fff;vertical-align:middle;margin:0 .2rem}
.c1a-blank.full{border-style:solid;border-color:#22c55e;background:#f0fdf4;color:#15803d;animation:c1a-pop .5s}
.c1a-wopts{display:flex;flex-wrap:wrap;justify-content:center;gap:.6rem;margin:.3rem 0}
.c1a-wopt{border:3px solid #fbbf24;background:#fffbeb;color:#92400e;border-radius:999px;padding:.35rem 1.1rem;font:inherit;font-size:1.15rem;font-weight:900;cursor:pointer;transition:transform .12s}
.c1a-wopt:hover{transform:scale(1.07)}
.c1a-wopt.wrong{animation:c1a-shake .45s;border-color:#f87171;background:#fee2e2;color:#b91c1c;opacity:.55;pointer-events:none}
.c1a-wopt.right{border-color:#22c55e;background:#dcfce7;color:#15803d}
.c1a-wopt.sel{border-color:#0ea5e9;background:#e0f2fe;color:#0369a1;transform:scale(1.06)}
.c1a-wopt.done{border-color:#22c55e;background:#dcfce7;color:#15803d;pointer-events:none}
.c1a-wopt:disabled{cursor:default}
.c1a-tiles{display:flex;justify-content:center;flex-wrap:wrap;gap:.25rem;margin:.2rem 0 .6rem}
.c1a-tile{min-width:2.3rem;height:3rem;padding:0 .3rem;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#e0f2fe;border:2px solid #7dd3fc;color:#0369a1;font-size:1.7rem;font-weight:900}
.c1a-tile.gap{background:#fff;border:3px dashed #f472b6;color:#be185d;min-width:3.2rem}
.c1a-tile.gap.full{border-style:solid;border-color:#22c55e;background:#f0fdf4;color:#15803d;animation:c1a-pop .5s}
.c1a-cols{display:grid;grid-template-columns:1fr 1fr;gap:.5rem 1.4rem;max-width:440px;margin:.3rem auto}
.c1a-cols .c1a-wopt{width:100%;font-size:1.05rem;padding:.35rem .5rem}
.c1a-bank,.c1a-line{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;min-height:3rem;padding:.4rem;border-radius:14px}
.c1a-line{background:#fff;border:3px dashed #7dd3fc;margin:.4rem 0}
.c1a-line.ok{border-style:solid;border-color:#22c55e;background:#f0fdf4}
.c1a-inp{width:100%;box-sizing:border-box;border:3px solid #bae6fd;border-radius:14px;padding:.5rem .7rem;font:inherit;font-size:1.1rem;font-weight:700;color:#0f172a;background:#fff;outline:0}
.c1a-inp:focus{border-color:#0ea5e9}
textarea.c1a-inp{min-height:4.2rem;resize:vertical}
.c1a-rows{display:grid;gap:.4rem;margin:.3rem 0}
.c1a-rowi{display:flex;align-items:center;gap:.5rem}
.c1a-rowi b{min-width:5.5rem;color:#0369a1}
.c1a-rowi .c1a-inp{flex:1;min-width:0;padding:.3rem .6rem}
.c1a-rowi .c1a-inp.ok{border-color:#22c55e;background:#f0fdf4}
.c1a-rowi .c1a-inp.no{border-color:#f87171;background:#fef2f2}
.c1a-model{margin:.5rem 0 0;padding:.5rem .7rem;border-radius:12px;background:#ecfeff;border:2px solid #67e8f9;color:#164e63;font-weight:700;font-size:.95rem}
.c1a-star{font-size:2.2rem}
.c1a-bigstar{display:inline-block;border:3px solid #f59e0b;background:#fef3c7;color:#78350f;border-radius:999px;padding:.5rem 1.6rem;font:inherit;font-size:1.1rem;font-weight:900;cursor:pointer}
.c1a-bigstar.on{background:#fde047;animation:c1a-pop .5s}
.c1a-chipw{border:2px solid #bae6fd;background:#fff;border-radius:12px;padding:.25rem .7rem;font:inherit;font-size:1.05rem;font-weight:800;color:#0369a1;cursor:pointer}
.c1a-chipw.hot{background:#fde68a;border-color:#f59e0b}
.c1a-chipw.right{background:#dcfce7;border-color:#22c55e;color:#15803d}
.c1a-chipw.wrong{animation:c1a-shake .45s;background:#fee2e2;border-color:#f87171;color:#b91c1c}
.c1a-dlg{display:grid;gap:.35rem;margin:.3rem 0}
.c1a-dl{padding:.4rem .7rem;border-radius:14px;font-weight:700;font-size:1.02rem;max-width:90%}
.c1a-dl.a{background:#e0f2fe;border:2px solid #7dd3fc;justify-self:start}
.c1a-dl.b{background:#fce7f3;border:2px solid #f9a8d4;justify-self:end}
.c1a-dl.now{box-shadow:0 0 0 4px #fde047;transform:scale(1.02)}
.c1a-dl.me{outline:3px dashed #22c55e}
.c1a-spell{display:grid;gap:.45rem;margin:.3rem 0}
.c1a-spell .row{display:flex;gap:.45rem;justify-content:center;flex-wrap:wrap;align-items:center}
.c1a-spell .row .c1a-wopt{font-size:1.05rem;padding:.3rem .9rem}
.c1a-pair-line{position:relative}
.c1a-reading{background:#fde68a!important;border-radius:6px;box-shadow:0 0 0 3px #fde68a}
.c1a-readbar{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;margin:.4rem 0 .8rem;padding:.5rem .7rem;border:3px dashed #38bdf8;border-radius:16px;background:#f0f9ff;font-weight:800;color:#0c4a6e}
`;
    document.head.appendChild(s);
  }


  /* ---------------------------------------------------------------- language packs (English / Urdu / Pashto) */
  const DICT = {
    '🎯 Choose the right word': ['🎯 درست لفظ چنیں', '🎯 سمه کلمه وټاکئ'],
    'Tap the correct answer. It will jump into the gap!': ['صحیح جواب پر ٹیپ کریں۔ وہ خالی جگہ میں چلا جائے گا!', 'سم ځواب ته ټیپ کړئ. هغه به په تشه ځای کې کښېني!'],
    'Tap the right one. 👆': ['درست والا چنیں۔ 👆', 'سم یو وټاکئ. 👆'],
    '🔄 Play again': ['🔄 دوبارہ کھیلیں', '🔄 بیا لوبه وکړئ'],
    '🔊 Hear it': ['🔊 سنیں', '🔊 واورئ'],
    '🔗 Match them': ['🔗 جوڑے ملائیں', '🔗 جوړې سره ونښلوئ'],
    'Tap one on the left, then its partner on the right.': ['بائیں طرف سے ایک چنیں، پھر دائیں طرف اس کا جوڑ چنیں۔', 'کیڼ اړخ نه یو وټاکئ، بیا د هغه جوړه په ښي اړخ کې وټاکئ.'],
    'Start with any word on the left. 👆': ['بائیں طرف کسی بھی لفظ سے شروع کریں۔ 👆', 'له کیڼ اړخ نه له هره کلمې پیل وکړئ. 👆'],
    'Now tap its partner on the right. 👉': ['اب دائیں طرف اس کا جوڑ چنیں۔ 👉', 'اوس په ښي اړخ کې د هغې جوړه وټاکئ. 👉'],
    'Tap a word on the left first. 👈': ['پہلے بائیں طرف سے ایک لفظ چنیں۔ 👈', 'لومړی له کیڼ اړخ نه یوه کلمه وټاکئ. 👈'],
    '🏆 All matched!': ['🏆 سب جوڑے مل گئے!', '🏆 ټولې جوړې سره ولګېدې!'],
    '🧩 Put them in order': ['🧩 ترتیب سے لگائیں', '🧩 په ترتیب یې کېږدئ'],
    'Tap the words in the right order to build it.': ['درست ترتیب سے لفظوں پر ٹیپ کریں۔', 'کلمې په سمه ترتیب ټیپ کړئ.'],
    'Tap the words in order. 👆': ['لفظ ترتیب سے چنیں۔ 👆', 'کلمې په ترتیب وټاکئ. 👆'],
    'Almost! Tap a word to take it back and try a new order. 🙂': ['تقریباً! کسی لفظ پر ٹیپ کر کے اسے واپس کریں اور نئی ترتیب آزمائیں۔ 🙂', 'نږدې! یوې کلمې ته ټیپ کړئ چې بېرته شي او نوې ترتیب هڅه کړئ. 🙂'],
    '⌨️ Type the answer': ['⌨️ جواب لکھیں', '⌨️ ځواب ولیکئ'],
    'Type your answer and press Check.': ['اپنا جواب لکھیں اور چیک دبائیں۔', 'خپل ځواب ولیکئ او چیک کېکاږئ.'],
    'your answer…': ['آپ کا جواب…', 'ستاسو ځواب…'],
    '✔ Check': ['✔ جانچیں', '✔ وګورئ'],
    '👀 Show answer': ['👀 جواب دیکھیں', '👀 ځواب وګورئ'],
    '👀 Show answers': ['👀 جوابات دیکھیں', '👀 ځوابونه وګورئ'],
    'Good try! ': ['اچھی کوشش! ', 'ښه هڅه! '],
    'Look again and try once more. 🙂': ['دوبارہ دیکھیں اور ایک بار پھر کوشش کریں۔ 🙂', 'بیا وګورئ او یو ځل بیا هڅه وکړئ. 🙂'],
    '  Answer: ': ['  جواب: ', '  ځواب: '],
    '⌨️ Write the answers': ['⌨️ جوابات لکھیں', '⌨️ ځوابونه ولیکئ'],
    'Type each answer in its box. Then press Check.': ['ہر جواب اس کے خانے میں لکھیں، پھر چیک دبائیں۔', 'هر ځواب په خپل خانه کې ولیکئ، بیا چیک کېکاږئ.'],
    '💬 Say or type your answer': ['💬 جواب بولیں یا لکھیں', '💬 ځواب ووایاست یا ولیکئ'],
    '📝 Write your answer': ['📝 اپنا جواب لکھیں', '📝 خپل ځواب ولیکئ'],
    'Type your answer, or press the microphone and say it. Then press Check.': ['اپنا جواب لکھیں یا مائیک دبا کر بولیں، پھر چیک دبائیں۔', 'خپل ځواب ولیکئ یا مایک کېکاږئ او ووایاست، بیا چیک کېکاږئ.'],
    'Write in the box. When you finish, press Done and read the example.': ['خانے میں لکھیں۔ مکمل ہو جائے تو "مکمل" دبائیں اور مثال پڑھیں۔', 'په خانه کې ولیکئ. چې بشپړ شو "بشپړ" کېکاږئ او بېلګه ولولئ.'],
    '✔ Done': ['✔ مکمل', '✔ بشپړ'],
    '🎤 Speak': ['🎤 بولیں', '🎤 ووایاست'],
    '💡 Show an example': ['💡 مثال دیکھیں', '💡 بېلګه وګورئ'],
    '🔊 Hear the question': ['🔊 سوال سنیں', '🔊 پوښتنه واورئ'],
    'Write or say something first. 🙂': ['پہلے کچھ لکھیں یا بولیں۔ 🙂', 'لومړی څه ولیکئ یا ووایاست. 🙂'],
    'Good start! Can you write a little more? ✍️': ['اچھی شروعات! کیا آپ تھوڑا اور لکھ سکتے ہیں؟ ✍️', 'ښه پیل! ایا لږ نور لیکلی شئ؟ ✍️'],
    '💡 Example answer: ': ['💡 مثالی جواب: ', '💡 بېلګه ځواب: '],
    '✅ Answer: ': ['✅ جواب: ', '✅ ځواب: '],
    '  Lovely! Now see the example.': ['  بہت خوب! اب مثال دیکھیں۔', '  ډېر ښه! اوس بېلګه وګورئ.'],
    '🔊 Tap and read': ['🔊 ٹیپ کریں اور پڑھیں', '🔊 ټیپ کړئ او ولولئ'],
    'Tap a word to hear it, then say it out loud. Press the star when you have read them all!': ['لفظ پر ٹیپ کر کے سنیں، پھر بلند آواز سے پڑھیں۔ سب پڑھ لیں تو ستارہ دبائیں!', 'پر کلمه ټیپ کړئ او واورئ، بیا په لوړ غږ ولولئ. چې ټولې دې ولوستلې ستوری کېکاږئ!'],
    '🔊 Read all to me': ['🔊 سب مجھے سنائیں', '🔊 ټولې ما ته ولولئ'],
    '⭐ I did it!': ['⭐ میں نے کر لیا!', '⭐ ما وکړل!'],
    '🌟 Star earned!': ['🌟 ستارہ مل گیا!', '🌟 ستوری وګټل شو!'],
    '  Keep going, little star!': ['  آگے بڑھتے رہیں، ننھے ستارے!', '  مخکې ځئ، کوچنی ستوریه!'],
    "🌟 Let's do it!": ['🌟 آئیں کریں!', '🌟 راځئ چې یې وکړو!'],
    'Do the activity in your book or on the picture. Press the star when you finish!': ['سرگرمی اپنی کتاب میں یا تصویر پر کریں۔ مکمل ہو جائے تو ستارہ دبائیں!', 'فعالیت په خپله کتاب کې یا په انځور کې وکړئ. چې بشپړ شو ستوری کېکاږئ!'],
    '🔊 Read the task to me': ['🔊 سرگرمی مجھے سنائیں', '🔊 فعالیت ما ته ولولئ'],
    'Oops. Try again.': ['اوہو۔ دوبارہ کوشش کریں۔', 'اوهو. بیا هڅه وکړئ.'],
    'Well done!': ['شاباش!', 'شاباش!'],
    'Great job!': ['بہت خوب!', 'ډېر ښه!'],
    'Super star!': ['سپر اسٹار!', 'سوپر ستوری!'],
    'Tap only the words that fit. Tap again to listen.': ['صرف درست لفظوں پر ٹیپ کریں۔ سننے کے لیے دوبارہ ٹیپ کریں۔', 'یوازې سمې کلمې وټاکئ. د اورېدو لپاره بیا ټیپ کړئ.'],
    '🏆 You found all ': ['🏆 آپ نے سب ڈھونڈ لیے ', '🏆 تاسو ټولې وموندلې '],
    ' found.': [' مل گئے۔', ' وموندل شوې.'],
    '▶ Read to me': ['▶ مجھے پڑھ کر سنائیں', '▶ ما ته ولولئ'],
    '⏹ Stop': ['⏹ رکیں', '⏹ ودرېږئ'],
    'Listen and follow along': ['سنیں اور ساتھ ساتھ پڑھیں', 'واورئ او ملګرې شئ'],
    '🌟 Well listened! Now read it yourself.': ['🌟 آپ نے خوب سنا! اب خود پڑھیں۔', '🌟 ښه مو واورېدل! اوس پخپله ولولئ.'],
    '📖 Book picture': ['📖 کتاب کی تصویر', '📖 د کتاب انځور'],
    '🙈 Hide book picture': ['🙈 تصویر چھپائیں', '🙈 انځور پټ کړئ'],
    '✍️ Trace it': ['✍️ ٹریس کریں', '✍️ ټریس یې کړئ'],
    'Press the blinking dot at the start of the first letter and drag along the dots. The dotted letters turn solid!': ['پہلے حرف کے شروع میں ٹمٹماتے نقطے کو دبائیں اور نقطوں پر کھینچیں۔ نقطے والے حروف گہرے ہو جائیں گے!', 'د لومړي توري په پیل کې ځلېدونکی ټکی کېکاږئ او په ټکو باندې وکاږئ. ټکي لرونکي توري به ټینګ شي!'],
    '👉 Press on the blinking dot first, then drag along the dots.': ['👉 پہلے ٹمٹماتے نقطے کو دبائیں، پھر نقطوں پر کھینچیں۔', '👉 لومړی ځلېدونکی ټکی کېکاږئ، بیا په ټکو باندې وکاږئ.'],
    'Good! Keep holding and follow the dots. 🟠': ['اچھا! دبائے رکھیں اور نقطوں کے ساتھ چلیں۔ 🟠', 'ښه! کېکاږئ وساتئ او ټکو پسې ځئ. 🟠'],
    'Oops, you let go. Press the blinking dot and try this letter again. 🙂': ['اوہو، آپ نے چھوڑ دیا۔ ٹمٹماتے نقطے کو دبا کر دوبارہ کوشش کریں۔ 🙂', 'اوهو، پرېښودل مو. ځلېدونکی ټکی کېکاږئ او بیا هڅه وکړئ. 🙂'],
    'Start at the first letter.': ['پہلے حرف سے شروع کریں۔', 'له لومړي توري پیل وکړئ.'],
    '🔄 Start again': ['🔄 دوبارہ شروع کریں', '🔄 بیا پیل کړئ'],
    '🏆 Everything traced! Beautiful writing!': ['🏆 سب ٹریس ہو گیا! خوب صورت لکھائی!', '🏆 ټول ټریس شو! ښکلې لیکنه!'],
    'Tap the words in the sentence, one step at a time.': ['جملے میں لفظوں پر ٹیپ کریں، ایک ایک قدم۔', 'په جمله کې کلمې یو یو ټیپ کړئ.'],
    '🏆 All sorted!': ['🏆 سب الگ الگ ہو گئے!', '🏆 ټولې جلا شوې!'],
    'Which one is it? 👆': ['کون سا ہے؟ 👆', 'کوم یو دی؟ 👆'],
    '🏆 All correct!': ['🏆 سب درست!', '🏆 ټول سم!'],
    ' of ': [' میں سے ', ' له '],
    '🔢 Count and choose': ['🔢 گنیں اور چنیں', '🔢 وشمېرئ او وټاکئ'],
    '➕ Solve it': ['➕ حل کریں', '➕ حل یې کړئ'],
    'Tap the number. It will jump into the gap!': ['عدد پر ٹیپ کریں۔ وہ خالی جگہ میں چلا جائے گا!', 'شمېرې ته ټیپ کړئ. هغه به په تشه ځای کې کښېني!'],
    '🖼️ Look and choose': ['🖼️ دیکھیں اور چنیں', '🖼️ وګورئ او وټاکئ'],
    'How does the sentence end? Look at the last mark. ⚫': ['جملہ کیسے ختم ہوتا ہے؟ آخری نشان دیکھیں۔ ⚫', 'جمله څنګه پای ته رسېږي؟ وروستۍ نښه وګورئ. ⚫'],
    'Look at the list of things. Do you need a comma between them? 🤔': ['چیزوں کی فہرست دیکھیں۔ کیا ان کے درمیان سکتہ (،) چاہیے؟ 🤔', 'د شیانو لېست وګورئ. ایا ترمنځ کامه (،) پکار ده؟ 🤔'],
    'Check the words and the marks. Try again. 🙂': ['لفظ اور نشان دیکھیں۔ دوبارہ کوشش کریں۔ 🙂', 'کلمې او نښې وګورئ. بیا هڅه وکړئ. 🙂'],
    'Look at the model. Which colour is this part? 🔍': ['نمونے کو دیکھیں۔ اس حصے کا رنگ کون سا ہے؟ 🔍', 'نمونې ته وګورئ. د دې برخې رنګ کوم دی؟ 🔍'],
    'This part is just a line. No colour needed. 🙂': ['یہ صرف ایک لکیر ہے۔ اس میں رنگ نہیں بھرنا۔ 🙂', 'دا یوازې یوه کرښه ده. رنګ ته اړتیا نشته. 🙂'],
    '✏️ Fix the sentence': ['✏️ جملہ درست کریں', '✏️ جمله سمه کړئ'],
    'Edit the sentence so it is perfect, then press Check.': ['جملے کو ٹھیک کریں، پھر جانچیں دبائیں۔', 'جمله سمه کړئ، بیا چیک کېکاږئ.'],
    '🎯 Choose the right answer': ['🎯 درست جواب چنیں', '🎯 سم ځواب وټاکئ'],
    '✅ True or false?': ['✅ درست یا غلط؟', '✅ سم که غلط؟'],
    '🎨 Trace and colour': ['🎨 ٹریس کریں اور رنگ بھریں', '🎨 ټریس کړئ او رنګ یې کړئ'],
    'Press the blinking dot and drag along the dots to trace each shape. The line gets drawn as you go!': ['ٹمٹماتے نقطے کو دبائیں اور نقطوں پر کھینچ کر ہر شکل ٹریس کریں۔ لکیر آپ کے ساتھ بنتی جائے گی!', 'ځلېدونکی ټکی کېکاږئ او په ټکو باندې وکاږئ چې هره بڼه ټریس شي. کرښه به ستاسو سره جوړېږي!'],
    'Great! Now colour it. Tap a colour, then tap a part of the picture. Use the colours of the model!': ['شاباش! اب رنگ بھریں۔ پہلے رنگ پر ٹیپ کریں، پھر تصویر کے کسی حصے پر۔ نمونے کے رنگ استعمال کریں!', 'شاباش! اوس رنګ یې کړئ. لومړی رنګ ټیپ کړئ بیا د انځور یوه برخه. د نمونې رنګونه وکاروئ!'],
    '🎨 Tap a colour first, then tap the picture.': ['🎨 پہلے رنگ چنیں، پھر تصویر پر ٹیپ کریں۔', '🎨 لومړی رنګ وټاکئ بیا انځور ټیپ کړئ.'],
    '🏆 Beautiful picture! You traced and coloured it.': ['🏆 خوب صورت تصویر! آپ نے ٹریس بھی کیا اور رنگ بھی بھرے۔', '🏆 ښکلی انځور! تاسو ټریس هم کړ او رنګ هم.'],
    '✔ I finished colouring': ['✔ رنگ بھرنا مکمل', '✔ رنګ کول بشپړ شول'],
    '🖍️ Step by step': ['🖍️ قدم بہ قدم', '🖍️ ګام په ګام'],
    'Look at the steps. Draw each step in your notebook, one after the other. Press the star when your drawing is ready!': ['مراحل دیکھیں۔ ایک کے بعد ایک ہر مرحلہ اپنی کاپی میں بنائیں۔ تصویر مکمل ہو جائے تو ستارہ دبائیں!', 'ګامونه وګورئ. یو په بل پسې هر ګام په خپله کاپي کې جوړ کړئ. چې انځور بشپړ شو ستوری کېکاږئ!']
  };
  const LANGS = {
    en: {id: 'en', speech: ['en'], rtl: false, praise: PRAISE, again: TRYAGAIN},
    ur: {id: 'ur', speech: ['ur', 'hi', 'ar'], rtl: true, idx: 0,
      praise: ['شاباش! ⭐', 'بہت خوب! 🌟', 'زبردست! 🎉', 'واہ! آپ نے کر دکھایا! 👏', 'کمال! 🌈', 'بالکل ٹھیک! ✨'],
      again: ['اوہو، یہ نہیں ہے۔ دوبارہ کوشش کریں! 💪', 'اچھی کوشش! ایک بار پھر کوشش کریں۔ 🙂', 'یہ نہیں۔ غور سے دیکھیں اور پھر کوشش کریں! 🔍', 'شاباش، آپ سیکھ رہے ہیں! دوبارہ کوشش کریں! 🌱']},
    ps: {id: 'ps', speech: ['ps', 'ur', 'ar', 'fa'], rtl: true, idx: 1,
      praise: ['شاباش! ⭐', 'ډېر ښه! 🌟', 'ټکنی! 🎉', 'واه! تاسو وکړل! 👏', 'ډېر ښه کار! 🌈', 'بالکل سم! ✨'],
      again: ['اوهو، دا نه دی. بیا هڅه وکړئ! 💪', 'ښه هڅه! یو ځل بیا هڅه وکړئ. 🙂', 'دا نه. ښه وګورئ او بیا هڅه وکړئ! 🔍', 'شاباش، تاسو زده کوئ! بیا هڅه وکړئ! 🌱']}
  };
  const DKEYS = Object.keys(DICT).sort((a, b) => b.length - a.length);
  function subjOfRoot(root) {
    const m = root && /\bc1-(eng|math|isl|nazira|pashto|drawing|urdu|gk)\b/.exec(root.className || ''); return m ? m[1] : null;
  }
  function langOf(sub) { return sub === 'pashto' ? LANGS.ps : (sub === 'isl' || sub === 'nazira' || sub === 'urdu' || sub === 'drawing') ? LANGS.ur : LANGS.en; }
  function LG() {
    const r = document.querySelector('#subjTabContent .m6-root[class*="c1-"]') || document.querySelector('.m6-root[class*="c1-"]');
    return langOf(subjOfRoot(r));
  }
  function tx(text, lg) {
    lg = lg || LG(); if (lg.id === 'en' || !text) return text;
    const d = DICT[text]; if (d) return d[lg.idx];
    let out = text;
    DKEYS.forEach(k => { if (out.indexOf(k) >= 0) out = out.split(k).join(DICT[k][lg.idx]); });
    return out;
  }
  const praise = () => pick(LG().praise);
  const again = () => pick(LG().again);
  const say = (box, text, kind) => sayC(box, tx(text), kind);
  function pickVoice(lg) {
    try {
      const vs = speechSynthesis.getVoices() || [];
      for (const pre of lg.speech) { const v = vs.find(x => (x.lang || '').toLowerCase().startsWith(pre)); if (v) return v; }
    } catch (e) { /* none */ }
    return null;
  }
  function speak(text, rate) {
    try {
      if (!('speechSynthesis' in window)) return;
      const lg = LG(); speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(tx(text, lg)); const v = pickVoice(lg);
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = lg.id === 'en' ? 'en-US' : lg.id === 'ps' ? 'ps-AF' : 'ur-PK';
      u.rate = rate || (lg.id === 'en' ? 0.85 : 0.8); u.pitch = 1.1; speechSynthesis.speak(u);
    } catch (e) { /* speech optional */ }
  }
  function loc(card, lg) {   // localise static labels of a freshly built card and set its direction
    lg = lg || LG();
    if (lg.id === 'en') return card;
    card.setAttribute('dir', lg.rtl ? 'rtl' : 'ltr'); card.setAttribute('lang', lg.id); card.classList.add('c1a-rtl');
    const w = document.createTreeWalker(card, NodeFilter.SHOW_TEXT); const nodes = [];
    while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(n => { const t = n.nodeValue; if (t && t.trim()) { const k = t.trim(); const r = tx(k, lg); if (r !== k) n.nodeValue = t.replace(k, r); } });
    card.querySelectorAll('[placeholder]').forEach(e => { e.placeholder = tx(e.placeholder, lg); });
    return card;
  }

  /* ---------------------------------------------------------------- common bits */
  function mini(title, help) { const c = C.shell(title, help); c.classList.add('c1a-mini'); return c; }
  window.__c1pLoc = loc;
  function addStar(msg) { /* the message line carries the fun; nothing else to track */ return msg; }
  function resetBtn(tools, fn) { const b = h('button', 'c1a-btn', '🔄 Play again', tools); b.type = 'button'; b.addEventListener('click', fn); return b; }
  function speakAsync(text, pitch) {
    return new Promise(res => {
      let done = false; const fin = () => { if (!done) { done = true; res(); } };
      try {
        if (!('speechSynthesis' in window)) { setTimeout(fin, 700 + text.length * 55); return; }
        speechSynthesis.cancel();
        const lg = LG(); const u = new SpeechSynthesisUtterance(text); const v = pickVoice(lg);
        if (v) { u.voice = v; u.lang = v.lang; } else u.lang = lg.id === 'en' ? 'en-US' : lg.id === 'ps' ? 'ps-AF' : 'ur-PK';
        u.rate = lg.id === 'en' ? 0.85 : 0.8; u.pitch = pitch || 1.1;
        u.onend = fin; u.onerror = fin; speechSynthesis.speak(u);
        setTimeout(fin, 1500 + text.length * 90);
      } catch (e) { setTimeout(fin, 700 + text.length * 55); }
    });
  }
  function blankSplit(stem) {   // 'Saad ___ ten' -> ['Saad ', ' ten']; null when no blank
    const m = /_{2,}|(?<![A-Za-z])_(?![A-Za-z])/.exec(stem); if (!m) return null;
    return [stem.slice(0, m.index), stem.slice(m.index + m[0].length)];
  }
  function distractors(correct, pool, n) {
    const bad = new Set([norm(correct)]);
    const out = [];
    shuffle(pool.slice()).forEach(w => { const k = norm(w); if (k && !bad.has(k) && out.length < n) { bad.add(k); out.push(w); } });
    shuffle(GENERIC.slice()).forEach(w => { if (out.length < n && !bad.has(w)) { bad.add(w); out.push(w); } });
    return out;
  }

  /* ---------------------------------------------------------------- choice */
  function wChoice(o) {
    const card = mini(o.title || '🎯 Choose the right word', o.help || 'Tap the correct answer. It will jump into the gap!');
    const stem = h('div', 'c1a-stem', '', card);
    const parts = o.stem ? blankSplit(o.stem) : null;
    let blank;
    if (parts) {
      stem.appendChild(document.createTextNode(parts[0]));
      blank = h('span', 'c1a-blank', '?', stem);
      stem.appendChild(document.createTextNode(parts[1]));
    } else {
      if (o.prompt) stem.appendChild(document.createTextNode(o.prompt + ' '));
      blank = h('span', 'c1a-blank', '?', stem);
    }
    const opts = h('div', 'c1a-wopts', '', card);
    const msg = h('div', 'c1a-msg c1a-center', '', card);
    const tools = h('div', 'c1a-tools', '', card);
    let solved = false;
    const spoken = ans => o.stem && parts ? (parts[0] + ans + parts[1]).replace(/\s+/g, ' ').trim() : ans;
    function deal() {
      solved = false; blank.textContent = '?'; blank.className = 'c1a-blank'; opts.innerHTML = '';
      say(msg, 'Tap the right one. 👆');
      shuffle(o.opts.slice()).forEach(w => {
        const b = h('button', 'c1a-wopt', w, opts); b.type = 'button';
        b.addEventListener('click', () => {
          if (solved) return;
          if (norm(w) === norm(o.correct)) {
            solved = true;
            Array.from(opts.children).forEach(x => { if (x !== b) x.disabled = true; });
            b.classList.add('right'); sndOk();
            flyTo(b, blank, w, () => { blank.textContent = w; blank.classList.add('full'); confetti(card); });
            say(msg, praise() + '  ' + spoken(w), 'ok'); speak(spoken(w)); againBtn.style.display = '';
          } else {
            b.classList.add('wrong'); sndNo(); say(msg, again(), 'no'); speak('Oops. Try again.');
          }
        });
      });
    }
    const againBtn = resetBtn(tools, () => { againBtn.style.display = 'none'; deal(); }); againBtn.style.display = 'none';
    const hear = h('button', 'c1a-btn', '🔊 Hear it', tools); hear.type = 'button';
    hear.addEventListener('click', () => speak((o.stem || o.prompt || '').replace(/_{1,}/g, 'blank')));
    deal();
    return card;
  }

  /* ---------------------------------------------------------------- missing letter(s) */
  const BLENDS = ['cl', 'bl', 'dr', 'br', 'gr', 'fl', 'st', 'pl', 'tr', 'sh', 'ch', 'th', 'ph', 'sp', 'sn', 'sw', 'cr', 'fr', 'pr', 'gl'];
  const VOW = 'aeiou'.split(''), CON = 'bcdfghjklmnprstwy'.split('');
  function wLetter(patternText, frag, fullWord, clue) {
    const card = mini('🔡 Find the missing letter' + (frag.length > 1 ? 's' : ''), 'Tap the letters that finish the word. Listen to it when you are right!');
    const m = /_+/.exec(patternText);
    const pre = patternText.slice(0, m.index), post = patternText.slice(m.index + m[0].length);
    const tiles = h('div', 'c1a-tiles', '', card);
    const addT = (txt, cls) => h('div', 'c1a-tile' + (cls ? ' ' + cls : ''), txt, tiles);
    pre.split('').forEach(ch => addT(ch)); const gap = addT('?', 'gap'); post.split('').forEach(ch => addT(ch));
    if (clue) h('div', 'c1a-center c1a-help', '💡 ' + clue, card);
    const opts = h('div', 'c1a-wopts', '', card);
    const msg = h('div', 'c1a-msg c1a-center', 'Which letters are missing?', card);
    const f = frag.toLowerCase();
    let pool;
    if (f.length === 1) pool = (VOW.includes(f) ? VOW : CON.concat(VOW.slice(0, 2))).filter(x => x !== f);
    else pool = BLENDS.filter(x => x !== f && (x[0] === f[0] || x[1] === f[1] || rnd(3) === 0));
    const options = shuffle([f].concat(shuffle(pool).slice(0, 2)));
    let solved = false;
    options.forEach(w => {
      const b = h('button', 'c1a-wopt', w, opts); b.type = 'button';
      b.addEventListener('click', () => {
        if (solved) return;
        if (w === f) {
          solved = true; Array.from(opts.children).forEach(x => { if (x !== b) x.disabled = true; });
          b.classList.add('right'); sndOk();
          flyTo(b, gap, w, () => { gap.textContent = w; gap.classList.add('full'); confetti(card); });
          say(msg, praise() + '  ' + fullWord, 'ok'); speak(fullWord.replace(/[^A-Za-z' ]/g, ''));
        } else { b.classList.add('wrong'); sndNo(); say(msg, again(), 'no'); speak('Try again.'); }
      });
    });
    return card;
  }

  /* ---------------------------------------------------------------- pairs */
  function wPairs(pairs, opt) {
    opt = opt || {};
    const card = mini('🔗 Match them', opt.help || 'Tap one on the left, then its partner on the right.');
    const cols = h('div', 'c1a-cols', '', card);
    const L = pairs.map((p, i) => ({t: p[0], i}));
    const R = shuffle(pairs.map((p, i) => ({t: p[1], i})));
    const lb = [], rb = []; let sel = null, matched = 0;
    const msg = h('div', 'c1a-msg c1a-center', 'Start with any word on the left. 👆', card);
    const colL = h('div', '', '', cols), colR = h('div', '', '', cols);
    colL.style.cssText = colR.style.cssText = 'display:grid;gap:.5rem;align-content:start';
    L.forEach(x => {
      const b = h('button', 'c1a-wopt', x.t, colL); b.type = 'button'; lb.push(b);
      b.addEventListener('click', () => { if (b.classList.contains('done')) return; lb.forEach(y => y.classList.remove('sel')); b.classList.add('sel'); sel = x; speak(x.t); say(msg, 'Now tap its partner on the right. 👉'); });
    });
    R.forEach(x => {
      const b = h('button', 'c1a-wopt', x.t, colR); b.type = 'button'; rb.push(b);
      b.addEventListener('click', () => {
        if (b.classList.contains('done')) return;
        if (!sel) { say(msg, 'Tap a word on the left first. 👈', 'no'); return; }
        if (norm(pairs[sel.i][1]) === norm(x.t)) {
          const l = lb[sel.i]; l.classList.remove('sel'); l.classList.add('done'); b.classList.add('done'); sndOk(); matched++;
          say(msg, praise() + '  ' + pairs[sel.i][0] + ' – ' + pairs[sel.i][1], 'ok'); speak(pairs[sel.i][0] + ', ' + pairs[sel.i][1]); sel = null;
          if (matched === pairs.length) { say(msg, '🏆 All matched! ' + praise(), 'ok'); confetti(card); }
        } else { b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 600); sndNo(); say(msg, again(), 'no'); }
      });
    });
    return card;
  }

  /* ---------------------------------------------------------------- order (jumbled sentence / alphabetical) */
  function wOrder(chips, target, opt) {
    opt = opt || {};
    const card = mini(opt.title || '🧩 Put them in order', opt.help || 'Tap the words in the right order to build it.');
    const line = h('div', 'c1a-line', '', card);
    const bank = h('div', 'c1a-bank', '', card);
    const msg = h('div', 'c1a-msg c1a-center', '', card);
    const tools = h('div', 'c1a-tools', '', card);
    let items;
    const exact = !!opt.exact;
    const flat = s => exact ? s.join(' ') : norm(s.join(' '));
    function build() {
      line.innerHTML = ''; bank.innerHTML = ''; line.classList.remove('ok'); say(msg, 'Tap the words in order. 👆');
      items = shuffle(chips.map((w, i) => ({w, i})));
      if (items.length > 1 && items.every((x, k) => x.i === k)) items.reverse();
      items.forEach(x => { x.btn = h('button', 'c1a-wopt', x.w, bank); x.btn.type = 'button'; x.btn.addEventListener('click', () => take(x)); x.inLine = false; });
    }
    const placed = () => items.filter(x => x.inLine).sort((a, b) => a.pos - b.pos);
    let counter = 0;
    function take(x) {
      if (line.classList.contains('ok')) return;
      if (!x.inLine) { x.inLine = true; x.pos = ++counter; line.appendChild(x.btn); sndPop(); speak(x.w); }
      else { x.inLine = false; bank.appendChild(x.btn); }
      const cur = placed().map(y => y.w);
      if (cur.length === chips.length) {
        if (flat(cur) === flat(opt.sequence || chips)) {
          line.classList.add('ok'); sndOk(); confetti(card);
          say(msg, praise() + '  ' + target, 'ok'); speak(target);
        } else { sndNo(); say(msg, 'Almost! Tap a word to take it back and try a new order. 🙂', 'no'); }
      }
    }
    resetBtn(tools, build);
    build();
    return card;
  }

  /* ---------------------------------------------------------------- fix the sentence */
  function wFix(t, a, marks, ttl) {
    const card = mini(ttl || '✏️ Fix the sentence', ttl ? 'Edit the sentence so it is perfect, then press Check.' : 'Edit the sentence so it is perfect: capital letter, comma, full stop or question mark. Then press Check.');
    const inp = h('textarea', 'c1a-inp', null, card); inp.value = t; inp.rows = 2; inp.spellcheck = false;
    const bar = h('div', 'c1a-tools', '', card);
    const ins = ch => { const s = inp.selectionStart != null ? inp.selectionStart : inp.value.length; inp.value = inp.value.slice(0, s) + ch + inp.value.slice(inp.selectionEnd != null ? inp.selectionEnd : s); inp.focus(); inp.selectionStart = inp.selectionEnd = s + ch.length; };
    (marks || [['. full stop', '.'], [', comma', ','], ['? question mark', '?']]).forEach(([lbl, ch]) => {
      const b = h('button', 'c1a-btn', lbl, bar); b.type = 'button'; b.addEventListener('click', () => ins(ch));
    });
    if (!marks) { const cp = h('button', 'c1a-btn', 'Aa Capital first letter', bar); cp.type = 'button';
    cp.addEventListener('click', () => { inp.value = cap1(inp.value.trimStart()); inp.focus(); }); }
    const msg = h('div', 'c1a-msg', '', card);
    const tools = h('div', 'c1a-tools', '', card);
    let misses = 0;
    const ck = h('button', 'c1a-btn', '✔ Check', tools); ck.type = 'button';
    ck.addEventListener('click', () => {
      const cur = inp.value.replace(/\s+/g, ' ').trim();
      if (cur === a) { sndOk(); confetti(card); say(msg, praise() + '  ' + a, 'ok'); speak(a); return; }
      misses++; sndNo();
      let hint = 'Not yet. Read it again and try once more. 🙂';
      if (marks) hint = cur.slice(-1) !== a.slice(-1) ? 'How does the sentence end? Look at the last mark. ⚫' : ((cur.match(/،/g) || []).length !== (a.match(/،/g) || []).length ? 'Look at the list of things. Do you need a comma between them? 🤔' : 'Check the words and the marks. Try again. 🙂');
      else if (cur[0] !== a[0]) hint = 'Look at the first letter. Does a sentence start with a capital letter? 🔠';
      else if ((cur.match(/,/g) || []).length !== (a.match(/,/g) || []).length) hint = 'Look at the list of things. Do you need a comma (,) between them? 🤔';
      else if (cur.slice(-1) !== a.slice(-1)) hint = a.slice(-1) === '?' ? 'This sentence asks something. What goes at the end? ❓' : 'How does a telling sentence end? Think about the little dot. ⚫';
      else if (norm(cur) !== norm(a)) hint = 'Check the words. Is a little word missing? 👀';
      say(msg, hint + (misses >= 3 ? '   The answer is: ' + a : ''), 'no');
    });
    const sh = h('button', 'c1a-btn', '👀 Show answer', tools); sh.type = 'button';
    sh.addEventListener('click', () => { say(msg, 'Answer: ' + a); speak(a); });
    return card;
  }

  /* ---------------------------------------------------------------- tap the word inside a sentence */
  function wTapWord(sentence, answer, label) {
    const card = mini('👆 Find it in the sentence', label || 'Tap the right word.');
    const row = h('div', 'c1a-wopts', '', card);
    const msg = h('div', 'c1a-msg c1a-center', '', card);
    const ansSet = new Set(wordsOf(answer).map(w => w.toLowerCase()));
    let found = 0; const need = ansSet.size; let solved = false;
    sentence.split(/\s+/).forEach(tok => {
      const w = tok.replace(/[^A-Za-z'’-]/g, '');
      const b = h('button', 'c1a-chipw', tok, row); b.type = 'button';
      b.addEventListener('click', () => {
        if (solved || b.classList.contains('right')) return; speak(w);
        if (ansSet.has(w.toLowerCase())) {
          b.classList.add('right'); sndOk(); found++;
          if (found >= need) { solved = true; confetti(card); say(msg, praise() + '  “' + answer + '”', 'ok'); speak(answer); } else say(msg, 'Good! Find the other one too. 🔍', 'ok');
        } else { b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 600); sndNo(); say(msg, again(), 'no'); }
      });
    });
    return card;
  }


  /* ---------------------------------------------------------------- tap words in steps (noun, then action word) */
  function wTapSteps(sentence, steps) {
    const card = mini('👆 Find the words', 'Tap the words in the sentence, one step at a time.');
    const lab = h('div', 'c1a-stem', '', card);
    const row = h('div', 'c1a-wopts', '', card);
    const msg = h('div', 'c1a-msg c1a-center', '', card);
    let si = 0, found = 0, solved = false;
    const show = () => { lab.textContent = steps[si].label; };
    show();
    const ok = (w, acc) => acc.some(x => { const a = x.toLowerCase(), b = w.toLowerCase(); return b === a || (a.length >= 3 && b.startsWith(a)); });
    sentence.split(/\s+/).forEach(tok => {
      const w = tok.replace(/[^A-Za-z'’-]/g, '');
      const b = h('button', 'c1a-chipw', tok, row); b.type = 'button';
      b.addEventListener('click', () => {
        if (solved || b.classList.contains('right')) return; speak(w);
        const st = steps[si];
        if (ok(w, st.answers)) {
          b.classList.add('right'); sndOk(); found++;
          if (found >= st.need) {
            si++; found = 0;
            if (si >= steps.length) { solved = true; confetti(card); say(msg, '🏆 ' + praise(), 'ok'); lab.textContent = '✅ All found!'; }
            else { say(msg, praise() + '  Next step!', 'ok'); show(); }
          } else say(msg, 'Good! Find one more. 🔍', 'ok');
        } else { b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 600); sndNo(); say(msg, again(), 'no'); }
      });
    });
    return card;
  }

  /* ---------------------------------------------------------------- sort words into two buckets */
  function wSort(groups) {
    const card = mini('🧺 Sort the words', 'Tap a word, then tap the box where it belongs.');
    const chips = h('div', 'c1a-wopts', '', card);
    const bx = h('div', 'c1a-cols', '', card); bx.style.maxWidth = '560px';
    const msg = h('div', 'c1a-msg c1a-center', '', card);
    let sel = null, left = 0;
    const where = {};
    groups.forEach((g, gi) => g.words.forEach(w => { where[w.toLowerCase()] = gi; left++; }));
    const buckets = groups.map((g, gi) => {
      const b = h('div', 'c1a-line', '<div style="width:100%;text-align:center;font-weight:900;color:#0369a1">' + g.label + '</div>', bx); b.style.cursor = 'pointer';
      b.addEventListener('click', () => {
        if (!sel) { say(msg, 'Tap a word first. 👆', 'no'); return; }
        const w = sel.textContent;
        if (where[w.toLowerCase()] === gi) { b.appendChild(sel); sel.classList.remove('sel'); sel.classList.add('done'); sndOk(); speak(w); sel = null; left--; if (!left) { confetti(card); say(msg, '🏆 All sorted! ' + praise(), 'ok'); } else say(msg, praise(), 'ok'); }
        else { sndNo(); say(msg, 'Not that box. Say the word slowly and listen to the end sound. 👂', 'no'); speak(w); }
      });
      return b;
    });
    shuffle(Object.keys(where)).forEach(w => {
      const bt = h('button', 'c1a-wopt', w, chips); bt.type = 'button';
      bt.addEventListener('click', () => { if (bt.classList.contains('done')) return; chips.querySelectorAll('.sel').forEach(x => x.classList.remove('sel')); buckets.forEach(b => b.querySelectorAll('.sel').forEach(x => x.classList.remove('sel'))); bt.classList.add('sel'); sel = bt; speak(w); });
    });
    return card;
  }

  /* ---------------------------------------------------------------- pick the right words from a list */
  function wPick(list, correct, verb) {
    const card = mini('🎯 ' + cap1(verb || 'pick') + ' the right words', 'Tap only the words that fit. Tap again to listen.');
    const row = h('div', 'c1a-wopts', '', card);
    const msg = h('div', 'c1a-msg c1a-center', '0 of ' + correct.length + ' found.', card);
    const okSet = new Set(correct.map(x => x.toLowerCase())); let found = 0;
    list.forEach(w => {
      const b = h('button', 'c1a-chipw', w, row); b.type = 'button';
      b.addEventListener('click', () => {
        if (b.classList.contains('right')) { speak(w); return; }
        speak(w);
        if (okSet.has(w.toLowerCase())) {
          b.classList.add('right'); sndOk(); found++;
          if (found === correct.length) { confetti(card); say(msg, '🏆 You found all ' + found + '! ' + praise(), 'ok'); } else say(msg, praise() + '  ' + found + ' of ' + correct.length + ' found.', 'ok');
        } else { b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 600); sndNo(); say(msg, '“' + w + '” is not one of them. Try another! 🙂', 'no'); }
      });
    });
    return card;
  }

  /* ---------------------------------------------------------------- spelling rows from a table */
  function wSpell(rows, answers) {
    const card = mini('⭕ Circle the correct spelling', 'Tap the word that is spelled correctly in each row.');
    const box = h('div', 'c1a-spell', '', card);
    const msg = h('div', 'c1a-msg c1a-center', '0 of ' + rows.length + ' rows done.', card);
    let done = 0;
    rows.forEach(r => {
      const correct = r.find(w => answers.has(w.toLowerCase())) || null;
      const row = h('div', 'row', '', box); let solved = false;
      shuffle(r.slice()).forEach(w => {
        const b = h('button', 'c1a-wopt', w, row); b.type = 'button';
        b.addEventListener('click', () => {
          if (solved) return;
          if (w.toLowerCase() === (correct || '').toLowerCase()) {
            solved = true; b.classList.add('right'); sndOk(); done++; speak(w);
            Array.from(row.children).forEach(x => { if (x !== b) x.disabled = true; });
            if (done === rows.length) { confetti(card); say(msg, '🏆 All correct! ' + praise(), 'ok'); } else say(msg, praise() + '  ' + done + ' of ' + rows.length + ' rows done.', 'ok');
          } else { b.classList.add('wrong'); sndNo(); say(msg, 'Look at every letter again. 🔍', 'no'); }
        });
      });
    });
    return card;
  }

  /* ---------------------------------------------------------------- type the answer(s) */
  function matches(inp, ans) {
    const a = norm(stripParen(ans)), b = norm(inp);
    return !!b && (b === a || b === norm(ans) || (a.length > 2 && b.replace(/ /g, '') === a.replace(/ /g, '')));
  }
  function wType(prompt, answer, label) {
    const card = mini('⌨️ ' + (label || 'Type the answer'), 'Type your answer and press Check.');
    h('div', 'c1a-stem', prompt, card);
    const inp = h('input', 'c1a-inp', null, card); inp.type = 'text'; inp.autocomplete = 'off'; inp.spellcheck = false; inp.placeholder = 'your answer…';
    const msg = h('div', 'c1a-msg', '', card);
    const tools = h('div', 'c1a-tools', '', card);
    let misses = 0;
    const check = () => {
      if (matches(inp.value, answer)) { sndOk(); confetti(card); say(msg, praise() + '  ' + answer, 'ok'); speak(answer); inp.classList.add('ok'); return; }
      misses++; sndNo();
      const a = stripParen(answer);
      say(msg, 'Good try! ' + (misses === 1 ? 'Look again and try once more. 🙂' : 'Hint: it starts with “' + a.slice(0, misses) + '”.') + (misses >= 4 ? '  Answer: ' + answer : ''), 'no');
    };
    const ck = h('button', 'c1a-btn', '✔ Check', tools); ck.type = 'button'; ck.addEventListener('click', check);
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
    return card;
  }
  function wTypeList(cues, answers, title) {
    const card = mini('⌨️ ' + (title || 'Write the answers'), 'Type each answer in its box. Then press Check.');
    const rows = h('div', 'c1a-rows', '', card); const ins = [];
    answers.forEach((ans, i) => {
      const r = h('div', 'c1a-rowi', '', rows);
      if (cues && cues[i]) h('b', '', cues[i] + ' →', r); else h('b', '', (i + 1) + '.', r);
      const inp = h('input', 'c1a-inp', null, r); inp.type = 'text'; inp.autocomplete = 'off'; inp.spellcheck = false; ins.push(inp);
    });
    const msg = h('div', 'c1a-msg', '', card);
    const tools = h('div', 'c1a-tools', '', card);
    const ck = h('button', 'c1a-btn', '✔ Check', tools); ck.type = 'button';
    ck.addEventListener('click', () => {
      let good = 0;
      ins.forEach((inp, i) => { const ok = matches(inp.value, answers[i]); inp.classList.toggle('ok', ok); inp.classList.toggle('no', !ok && !!inp.value.trim()); if (ok) good++; });
      if (good === answers.length) { sndOk(); confetti(card); say(msg, '🏆 All ' + good + ' correct! ' + praise(), 'ok'); speak('All correct. ' + pick(['Well done!', 'Great job!'])); }
      else { sndNo(); say(msg, good + ' of ' + answers.length + ' are right. Fix the red boxes and check again. 💪', 'no'); }
    });
    const sh = h('button', 'c1a-btn', '👀 Show answers', tools); sh.type = 'button';
    sh.addEventListener('click', () => { ins.forEach((inp, i) => { inp.value = answers[i]; inp.classList.add('ok'); inp.classList.remove('no'); }); say(msg, 'Read them aloud: ' + answers.join(', ')); });
    return card;
  }

  /* ---------------------------------------------------------------- open questions (speak / write) */
  let Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  function wOpen(t, a, mode) {
    const card = mini(mode === 'write' ? '📝 Write your answer' : '💬 Say or type your answer', mode === 'write' ? 'Write in the box. When you finish, press Done and read the example.' : 'Type your answer, or press the microphone and say it. Then press Check.');
    const inp = h('textarea', 'c1a-inp', null, card); inp.rows = mode === 'write' ? 4 : 2; inp.placeholder = 'write here…'; inp.spellcheck = false;
    const tools = h('div', 'c1a-tools', '', card);
    const msg = h('div', 'c1a-msg', '', card);
    const vary = /^(answers? (will )?vary|for example|e\.g\.|مثلاً|مثال|زبانی|زباني|عملی|عملي|بېلګه|practical|group activity|oral activity|role play|class activity|expected result|the answer depends)/i.test(a.trim()) || /\(e\.g\./i.test(a) || mode === 'write';
    const model = a.replace(/^answers? (will )?vary\s*(\(e\.g\.\s*)?/i, m => '').replace(/^for example:?\s*/i, '').replace(/^\(?e\.g\.\s*/i, '').replace(/\)\s*$/, '').trim() || a;
    let tries = 0;
    function showModel() {
      let m = card.querySelector('.c1a-model');
      if (!m) { m = h('div', 'c1a-model', '', card); }
      m.textContent = (vary ? '💡 Example answer: ' : '✅ Answer: ') + (vary ? model : a);
      speak(vary ? model : a);
    }
    const ck = h('button', 'c1a-btn', mode === 'write' ? '✔ Done' : '✔ Check', tools); ck.type = 'button';
    ck.addEventListener('click', () => {
      const v = inp.value.trim();
      if (!v) { say(msg, 'Write or say something first. 🙂', 'no'); return; }
      if (vary) {
        if (wordsOf(v).length < (mode === 'write' ? 3 : 1)) { sndNo(); say(msg, 'Good start! Can you write a little more? ✍️', 'no'); return; }
        sndOk(); confetti(card); say(msg, praise() + '  Lovely! Now see the example.', 'ok'); showModel(); return;
      }
      const key = wordsOf(stripParen(a)).filter(w => !STOP.has(w.toLowerCase()));
      const alt = wordsOf((a.match(/\(([^)]*)\)/) || [])[1] || '').map(x => x.toLowerCase());
      const low = norm(v);
      const hit = key.filter(w => low.includes(w.toLowerCase().slice(0, Math.max(3, w.length - 2))) || alt.includes(w.toLowerCase())).length;
      const need = Math.max(1, Math.ceil(key.length / 2));
      if (!key.length || hit >= need || (alt.length && alt.some(x => low.includes(x)))) { sndOk(); confetti(card); say(msg, praise() + '  ' + a, 'ok'); speak(a); }
      else { tries++; sndNo(); say(msg, tries < 2 ? again() + '  Think about the story. 📖' : 'Nice try! Here is the answer: ' + a, 'no'); if (tries >= 2) showModel(); }
    });
    if (Rec) {
      const mic = h('button', 'c1a-btn', '🎤 Speak', tools); mic.type = 'button';
      mic.addEventListener('click', () => {
        try {
          const r = new Rec(); r.lang = LG().id === 'en' ? 'en-US' : LG().id === 'ps' ? 'ps-AF' : 'ur-PK'; r.interimResults = false; r.maxAlternatives = 1;
          mic.textContent = '🎤 Listening…';
          r.onresult = e => { inp.value = (inp.value + ' ' + e.results[0][0].transcript).trim(); };
          r.onend = r.onerror = () => { mic.textContent = '🎤 Speak'; };
          r.start();
        } catch (e) { mic.textContent = '🎤 Speak'; }
      });
    }
    const hint = h('button', 'c1a-btn', vary ? '💡 Show an example' : '👀 Show answer', tools); hint.type = 'button';
    hint.addEventListener('click', showModel);
    const hear = h('button', 'c1a-btn', '🔊 Hear the question', tools); hear.type = 'button';
    hear.addEventListener('click', () => speak(t));
    return card;
  }

  /* ---------------------------------------------------------------- dialogue role-play */
  function wDialogue(lines) {
    const card = mini('🎭 Role-play the dialogue', 'Listen to the whole talk, or choose a part. The computer reads the other part and you read yours!');
    const box = h('div', 'c1a-dlg', '', card);
    const who = []; lines.forEach(l => { if (!who.includes(l.who)) who.push(l.who); });
    const els = lines.map(l => { const d = h('div', 'c1a-dl ' + (who.indexOf(l.who) % 2 ? 'b' : 'a'), '<b>' + l.who + ':</b> ' + l.text.replace(/</g, '&lt;'), box); return d; });
    const tools = h('div', 'c1a-tools', '', card);
    const msg = h('div', 'c1a-msg', '', card);
    let token = 0;
    const clear = () => els.forEach(e => e.classList.remove('now', 'me'));
    async function play(role) {
      const my = ++token; clear(); try { speechSynthesis.cancel(); } catch (e) { /* none */ }
      for (let i = 0; i < lines.length; i++) {
        if (my !== token) return;
        els[i].classList.add('now');
        els[i].scrollIntoView({block: 'nearest', behavior: 'smooth'});
        if (role && lines[i].who === role) {
          els[i].classList.add('me'); say(msg, 'Your turn! Read “' + lines[i].who + '” aloud, then press Next. 🎤');
          await new Promise(res => { next.onclick = () => res(); next.style.display = ''; });
          next.style.display = 'none';
        } else { await speakAsync(lines[i].text, who.indexOf(lines[i].who) % 2 ? 1.5 : 1.0); }
        els[i].classList.remove('now');
      }
      if (my === token) { sndOk(); confetti(card); say(msg, '🏆 Dialogue finished! ' + praise(), 'ok'); }
    }
    const all = h('button', 'c1a-btn', '▶ Listen to all', tools); all.type = 'button'; all.addEventListener('click', () => { say(msg, ''); play(null); });
    who.slice(0, 3).forEach(w => { const b = h('button', 'c1a-btn', '🎭 I will be ' + w, tools); b.type = 'button'; b.addEventListener('click', () => play(w)); });
    const next = h('button', 'c1a-btn', 'Next ▶', tools); next.type = 'button'; next.style.display = 'none';
    const stop = h('button', 'c1a-btn', '⏹ Stop', tools); stop.type = 'button'; stop.addEventListener('click', () => { token++; clear(); next.style.display = 'none'; try { speechSynthesis.cancel(); } catch (e) { /* none */ } say(msg, ''); });
    return card;
  }
  function dialogueLines(ps) {
    const out = [];
    ps.forEach(p => {
      let t = clean(p).replace(/\*\*/g, '');
      t.split(/\s+—\s+|\s+(?=\d+\.\s+[A-Z][A-Za-z]*:)/).forEach(seg => {
        const m = /^(?:\d+\.\s*)?([A-Z][A-Za-z]{1,12}):\s*(.+)$/.exec(seg.trim());
        if (m) out.push({who: m[1], text: m[2].replace(/\s+/g, ' ').trim()});
      });
    });
    return out;
  }

  /* ---------------------------------------------------------------- read aloud / did it */
  function wRead(wordsList, title, say2) {
    const spk = say2 || (w => w);
    const card = mini(title || '🔊 Tap and read', 'Tap a word to hear it, then say it out loud. Press the star when you have read them all!');
    const row = h('div', 'c1a-wopts', '', card);
    const msg = h('div', 'c1a-msg c1a-center', '', card);
    const tools = h('div', 'c1a-tools', '', card);
    const chips = wordsList.map(w => { const b = h('button', 'c1a-chipw', w, row); b.type = 'button'; b.addEventListener('click', () => { chips.forEach(c => c.classList.remove('hot')); b.classList.add('hot'); sndPop(); speak(spk(w)); }); return b; });
    let token = 0;
    const all = h('button', 'c1a-btn', '🔊 Read all to me', tools); all.type = 'button';
    all.addEventListener('click', async () => { const my = ++token; for (let i = 0; i < chips.length && my === token; i++) { chips.forEach(c => c.classList.remove('hot')); chips[i].classList.add('hot'); await speakAsync(spk(wordsList[i])); } chips.forEach(c => c.classList.remove('hot')); });
    wStar(tools, msg, card);
    return card;
  }
  function wStar(tools, msg, card) {
    const b = h('button', 'c1a-bigstar', '⭐ I did it!', tools); b.type = 'button';
    b.addEventListener('click', () => { b.classList.add('on'); b.textContent = '🌟 Star earned!'; sndOk(); confetti(card); say(msg, praise() + '  Keep going, little star!', 'ok'); speak(pick(['Well done!', 'Great job!', 'Super star!'])); });
    return b;
  }
  function wDone(t) {
    const card = mini('🌟 Let\'s do it!', 'Do the activity in your book or on the picture. Press the star when you finish!');
    const tools = h('div', 'c1a-tools', '', card);
    const msg = h('div', 'c1a-msg', '', card);
    const hear = h('button', 'c1a-btn', '🔊 Read the task to me', tools); hear.type = 'button'; hear.addEventListener('click', () => speak(t.replace(/_{2,}/g, 'blank').replace(/^[ivx]+\.\s*/i, '')));
    wStar(tools, msg, card);
    return card;
  }

  /* ---------------------------------------------------------------- tracing (dotted words / sentences) */
  function dottedTexts(fig) {
    const svg = fig && fig.querySelector('svg'); if (!svg) return [];
    return [...svg.querySelectorAll('text')].filter(x => (x.getAttribute('fill') === 'none') && x.getAttribute('stroke-dasharray')).map(x => x.textContent.trim().replace(/!/g, '').trim()).filter(Boolean);
  }
  function wTrace(texts) {
    const card = mini('✍️ Trace it', 'Press the blinking dot at the start of the first letter and drag along the dots. The dotted letters turn solid!');
    const S = 0.8, ADV = 74 * S, CH = 172 * S, MAXC = 11;
    const lines = [];
    texts.forEach(tx => {
      let cur = '';
      tx.split(/\s+/).forEach(w => { if (cur && (cur + ' ' + w).length > MAXC) { lines.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w; });
      if (cur) lines.push(cur);
    });
    const widest = Math.max.apply(null, lines.map(l => l.length));
    const W = Math.max(300, widest * ADV + 40), H = lines.length * (CH + 6) + 10;
    const svg = C.newSvg(W, H, 'Trace: ' + texts.join(' / ')); card.appendChild(svg);
    const msg = h('div', 'c1a-msg', '', card);
    const tools = h('div', 'c1a-tools', '', card);
    const items = [];
    lines.forEach((ln, li) => {
      const y0 = 4 + li * (CH + 6); C.ruledLines(svg, 6, W - 6, y0, S);
      ln.split('').forEach((ch, k) => { if (G[ch]) { const it = C.buildGlyph(svg, ch, 14 + k * ADV - 12 * S, y0, S, {guide: true, colour: '#ec4899'}); it.line = ln; items.push(it); } });
    });
    const againBtn = h('button', 'c1a-btn', '🔄 Start again', tools); againBtn.type = 'button';
    const tr = new C.Tracer(svg, items, {
      onMiss: () => say(msg, '👉 Press on the blinking dot first, then drag along the dots.', 'no'),
      onPress: () => say(msg, 'Good! Keep holding and follow the dots. 🟠'),
      onLift: () => say(msg, 'Oops, you let go. Press the blinking dot and try this letter again. 🙂', 'no'),
      onItem: (it, last) => { if (!last) { sndPop(); const idx = items.indexOf(it); const nx = items[idx + 1]; if (!nx || nx.line !== it.line) { sndOk(); say(msg, praise() + '  “' + it.line + '”', 'ok'); speak(it.line); } } },
      onAll: () => { sndOk(); say(msg, '🏆 Everything traced! Beautiful writing!', 'ok'); speak('Everything traced. Beautiful writing!'); confetti(card); }
    });
    againBtn.addEventListener('click', () => { tr.reset(); say(msg, 'Start at the first letter.'); });
    say(msg, 'Start at the first letter. Press its blinking dot and hold.');
    const iv = setInterval(() => { if (!svg.isConnected) { clearInterval(iv); return; } if (svg.getBoundingClientRect().width > 0) { clearInterval(iv); try { tr.showMarker(); } catch (e) { /* first press retries */ } } }, 250);
    return card;
  }

  /* ---------------------------------------------------------------- classification */
  function parsePairs(a) {
    if (!a || a.length > 260) return null;
    const parts = a.split(/\s*[,;]\s+(?=[A-Za-z])/).map(x => x.trim().replace(/\.$/, ''));
    const pairs = [];
    for (const p of parts) {
      const m = /^([A-Za-z' ]{1,22}?)\s+[–—-]\s+([A-Za-z' ]{1,30}?)$/.exec(p);
      if (!m) return null;
      pairs.push([m[1].trim(), m[2].trim()]);
    }
    return pairs.length >= 2 ? pairs : null;
  }
  function parseSoundPairs(a) {
    const re = /([A-Za-z]+)\s+\/([A-Za-z]+)\/(?:\s*\(([A-Za-z]+)\))?/g; const out = []; let m;
    while ((m = re.exec(a))) out.push(m[3] ? [m[1], m[3]] : [m[1], '/' + m[2] + '/']);
    return out.length >= 3 ? out : null;
  }
  function simpleAns(a, max) { return a && a.length <= (max || 40) && !/^(answers?|for example|e\.g\.|read|say|practise|write|copy|tick|circle|cross|colour|draw)/i.test(a); }

  const RULES = {};   // other books register their classifiers here (js/cls1_play_*.js)
  const EXTRA = {};   // class-specific rules tried first: EXTRA[sub](item, cls) -> spec | null
  const BUILD = {};
  function clsOf(el) {
    const card = el.closest('.math-accordion-card'); const m = card && /^math-topic-c(\d+)-/.exec(card.id);
    if (m) return 'cls' + m[1];
    try { if (typeof state !== 'undefined' && state.selectedClass) return state.selectedClass; } catch (e) { /* none */ }
    return 'cls1';
  }
  /* "(a) 250 (b) 205 (c) 25 (d) 0" typed inside a question or a part: the answer is "(b) 205" or "b) 205" */
  function genericMcq(q) {
    const t = qText(q).replace(/^[ivx]+\.\s*/i, ''); if (!/\(a\)/.test(t) || !/\(b\)/.test(t)) return null;
    const a = solAnswer(q); if (a == null) return null;
    const re = /\(([a-d])\)\s*(.+?)(?=\s*\([a-d]\)|\s*$)/g; const opts = []; let m;
    while ((m = re.exec(t))) opts.push({l: m[1], t: m[2].trim()});
    const cl = /^\(?([a-d])\)\s*(.*)$/.exec(a.trim());
    if (opts.length < 2 || !cl) return null;
    const cor = opts.find(o => o.l === cl[1]); if (!cor) return null;
    return {kind: 'choice', stem: t.slice(0, t.indexOf('(a)')).trim(), prompt: t.indexOf('(a)') < 2 ? 'Choose the right answer.' : null, opts: opts.map(o => o.t), correct: cor.t};
  }
  function classify(q) {
    const sub = subjOfRoot(q.closest('.m6-root'));
    if (q.querySelector('.sbq')) return null;
    const mc = genericMcq(q); if (mc) return mc;
    if (EXTRA[sub]) { let r = null; try { r = EXTRA[sub](q, clsOf(q)); } catch (e) { if (window.console) console.warn('c1 play extra', e); } if (r) return r; }
    if (sub !== 'eng') { const f = RULES[sub]; return f && !q.querySelector('.sbq') ? f(q) : null; }
    return classifyEng(q);
  }
  function classifyEng(q) {
    if (q.querySelector('.sbq')) return null;                                      // existing (a)-(d) MCQ widget
    const t = qText(q); if (!t) return null;
    const t0 = t.replace(/^[ivx]+\.\s*/i, '').trim();
    const a = solAnswer(q);
    const nxt = nextOf(q);
    const fig = nxt.find(n => n.matches('figure.m6-fig'));
    const tbl = nxt.find(n => n.querySelector && n.querySelector('table'));
    const ps = nxt.filter(n => n.matches('p,.m6-para'));
    const isInstr = t0.split(/\s+/).length >= 2 && /^(read|say|pronounce|practise|write|trace|copy|circle|underline|colou?r|match|tick|cross|draw|look|find|arrange|rearrange|make|complete|fill|think|talk|discuss|share|express|engage|get students|listen|name|put|punctuate|rewrite|sing|act|act out|use|choose|identify|group|sort)\b/i.test(t0);

    if (/^read aloud the given letters/i.test(t0)) return {kind: 'letters'};
    /* tracing dotted words / sentences */
    if (/\b(trace|copy)\b/i.test(t0) && fig) { const tx = dottedTexts(fig); if (tx.length) return {kind: 'trace', texts: tx, fig, after: fig}; }

    if (a != null) {
      const af = a.replace(/\.\s*$/, '');
      /* options in the text */
      let m = /\(\s*i\.\s*(.+?)\s+ii\.\s*(.+?)\s*\)/.exec(t0);
      if (m && hasBlank(t0)) return {kind: 'choice', stem: t0.slice(0, m.index).trim(), opts: [m[1], m[2]], correct: stripParen(af)};
      const pl = parenList(t0);
      if (pl && hasBlank(t0) && pl.some(x => norm(x) === norm(stripParen(af)))) return {kind: 'choice', stem: t0.replace(/\s*\([^()]*\)\s*([.?!])?\s*$/, '$1'), opts: pl, correct: stripParen(af)};
      if (pl && !hasBlank(t0) && /\(\s*[A-Za-z' ]+\s*[,/]\s*[A-Za-z' ]+\s*\)/.test(t0) && pl.some(x => norm(x) === norm(af)) && pl.length <= 3 && t0.length < 90)
        return {kind: 'choice', stem: t0.replace(/\s*\([^()]*\)\s*$/, ''), opts: pl, correct: af};
      m = /\b([A-Za-z]+)\s*\/\s*([A-Za-z]+)\b/.exec(t0);
      if (m && !hasBlank(t0) && [m[1], m[2]].some(x => norm(x) === norm(af)) && t0.length < 70)
        return {kind: 'choice', stem: t0.replace(m[0], '___'), opts: [m[1], m[2]], correct: af, title: '🎯 Choose the right word'};
      m = /^([A-Za-z']+):\s*(.+)$/.exec(t0);
      if (m && !hasBlank(t0)) { const its = m[2].split(/\s*,\s*/); if (its.length >= 3 && its.some(x => norm(x) === norm(af))) return {kind: 'choice', prompt: 'Which word rhymes with “' + m[1] + '”?', opts: its, correct: af, title: '🎵 Find the rhyme'}; }
      if (/^[✓✗]/.test(a)) return {kind: 'choice', stem: t0, opts: ['✓ command', '✗ not a command'], correct: a.startsWith('✓') ? '✓ command' : '✗ not a command', prompt: t0, title: '🎯 Is it a command?'};
      if (/^___\s+\w/.test(t0) && /^(a|an)\b/i.test(af)) return {kind: 'choice', stem: t0, opts: ['a', 'an'], correct: af.split(/\s+/)[0].toLowerCase()};
      if (/^\d$/.test(af) && !hasBlank(t0) && t0.length > 12) {
        const mx = Math.max.apply(null, sameGroup(q).map(x => solAnswer(x)).filter(v => /^\d$/.test(v || '')).map(Number).concat([+af]));
        return {kind: 'choice', prompt: '“' + t0 + '” is step number…', opts: Array.from({length: Math.max(2, mx)}, (_, i) => String(i + 1)), correct: af, title: '🔢 Which step?'};
      }

      /* missing letters */
      const mm = /^([A-Za-z'-]*_+[A-Za-z'-]*)\s*(?:\(([^)]*)\))?$/.exec(t0);
      const am = /^([A-Za-z'-]+)\s*\(([a-z]{1,3})\)\s*$/.exec(af);
      if (mm && am) return {kind: 'letter', pattern: mm[1], frag: am[2], word: am[1], clue: mm[2] || ''};


      /* word (cluster) pairs: "blink (bl), draw (dr)" */
      {
        const wp = [...a.matchAll(/([A-Za-z]+)\s*\(([a-z]{2,3})\)/g)];
        if (wp.length >= 4 && /cluster|blend|digraph|initial|sound/i.test(t0) && wp.every(x => x[1].toLowerCase().includes(x[2]))) {
          const seen = new Set(); const prs = [];
          wp.forEach(x => { const k = x[1].toLowerCase(); if (!seen.has(k)) { seen.add(k); prs.push([x[1], x[2]]); } });
          return {kind: 'pairs', pairs: prs.slice(0, 6), help: 'Match each word with the letters it starts with.'};
        }
      }
      /* tick the fruits, circle the vegetables */
      {
        const tv = /Tick[^)]*\)\s*(.+?)\s*\(([A-Za-z]+)\);\s*circle[^)]*\)\s*(.+?)\s*\(([A-Za-z]+)\)/i.exec(a);
        if (tv) {
          const wl = x => x.split(/\s*(?:,|\band\b)\s*/).map(y => y.trim()).filter(Boolean);
          return {kind: 'sort', groups: [{label: '✓ ' + tv[2], words: wl(tv[1])}, {label: '○ ' + tv[4], words: wl(tv[3])}]};
        }
      }

      /* pairs */
      if (!hasBlank(t0)) {
        const sp = parseSoundPairs(af) || (/initial sounds|sounds of the given letters/i.test(t0) ? parseSoundPairs(a) : null);
        if (sp) return {kind: 'pairs', pairs: sp, help: 'Match each word with its first sound or letter.'};
        const pp = parsePairs(a.replace(/;/g, ',')) || parsePairs(a);
        if (pp && !/^(trace|read)/i.test(t0)) return {kind: 'pairs', pairs: pp, fig, after: fig || q};
      }


      /* steps in order (recipe) */
      if (/order|sequence/i.test(t0) && /^1\.\s.+2\.\s/.test(a)) {
        const steps = a.split(/\s*(?=\d+\.\s)/).map(x => x.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
        if (steps.length >= 3) return {kind: 'order', chips: steps, target: 'Perfect order!', sequence: steps, exact: true, title: '🔢 Put the steps in order', help: 'Tap the steps in the order they happen.'};
      }
      /* naming word + action word */
      const nv = /^(?:Nouns?|Naming words?):\s*([^;]+?);\s*action words?:\s*(.+?)\.?$/i.exec(a);
      if (nv && t0.split(/\s+/).length >= 3) {
        const mainPart = nv[1].replace(/\(.*$/, ''); const accept = nv[1].replace(/[()]/g, ' ').replace(/\bor\b/gi, ',').split(/\s*,\s*/).map(x => x.trim()).filter(Boolean);
        const need = mainPart.split(/\s*,\s*/).filter(x => x.trim()).length;
        const verb = nv[2].replace(/\(.*?\)/g, '').split(/\s*[,/]\s*/)[0].trim();
        return {kind: 'tapsteps', sentence: t0.replace(/^Picture \d+:\s*/i, ''), steps: [{label: '1️⃣ Tap the naming word' + (need > 1 ? 's' : '') + ' (nouns)', answers: accept, need}, {label: '2️⃣ Now tap the action word', answers: [verb], need: 1}]};
      }
      /* sort into /s/ and /z/ (or similar) */
      const sortGroups = (() => {
        const mm = /Circle\s*\(([^)]+)\):\s*(.+?)\.\s*Square\s*\(([^)]+)\):\s*(.+?)\.?$/i.exec(a);
        const wl = x => x.split(/\s*,\s*/).map(y => y.replace(/\(s\)/g, '').replace(/[^A-Za-z]/g, '')).filter(Boolean);
        if (mm) return [{label: '⭕ ' + mm[1], words: wl(mm[2])}, {label: '⬜ ' + mm[3], words: wl(mm[4])}];
        const tk = [...a.matchAll(/([A-Za-z]+)\s*([✓☆])/g)];
        if (tk.length >= 4) return [{label: '✓ /s/ sound', words: tk.filter(x => x[2] === '✓').map(x => x[1])}, {label: '☆ /z/ sound', words: tk.filter(x => x[2] === '☆').map(x => x[1])}];
        const cu = [...a.matchAll(/([A-Za-z]+)\s*\((?:circle|underline)[^,)]*,\s*(\/\w\/)\)/gi)];
        if (cu.length >= 3) { const labs = [...new Set(cu.map(x => x[2]))]; return labs.map(l => ({label: l + ' sound', words: cu.filter(x => x[2] === l).map(x => x[1])})); }
        return null;
      })();
      if (sortGroups && sortGroups.length === 2 && sortGroups.every(g => g.words.length)) return {kind: 'sort', groups: sortGroups};
      /* pick whole sentences */
      if (/\s\/\s/.test(t0) && /["“]/.test(a)) {
        const segs = t0.split(/\s+\/\s+/).map(x => x.trim()).filter(Boolean);
        const good = segs.filter(x => a.includes(x.replace(/[.?!]$/, '')));
        if (segs.length >= 3 && good.length && good.length < segs.length) return {kind: 'pick', list: segs, correct: good, verb: 'circle'};
      }

      /* ordering */
      if (/alphabetical/i.test(t0)) {
        const m2 = /[:]\s*(.+?)\.?$/.exec(t0.replace(/\s*\([^()]*\)\s*$/, '')) || /\(([^()]*)\)\s*\.?$/.exec(t0);
        const lst = m2 ? m2[1].split(/\s*,\s*/).map(x => x.replace(/\.$/, '').trim()).filter(Boolean) : [];
        if (lst.length >= 3 && lst.length <= 8) { const sorted = lst.slice().sort((x, y) => x.toLowerCase() < y.toLowerCase() ? -1 : 1); return {kind: 'order', chips: lst, target: sorted.join(', '), sequence: sorted, exact: true, title: '🔤 Alphabetical order', help: 'Tap the words in ABC order. Which letter comes first?'}; }
      }
      const clean0 = af.replace(/[()]/g, '');
      if (!hasBlank(t0) && !/[.?!]\s*$/.test(t0) && t0.split(/\s+/).length >= 3 && norm(t0).split(' ').sort().join(' ') === norm(clean0).split(' ').sort().join(' ') && norm(t0) !== norm(clean0))
        return {kind: 'order', chips: t0.split(/\s+/), target: af.replace(/[()]/g, ''), sequence: clean0.replace(/[.?!]$/, '').split(/\s+/), title: '🧩 Make a sentence', help: 'Tap the words to build a sentence that makes sense.'};

      /* fix the sentence */
      const a2 = stripParen(af.replace(/\s*\(no article\)/i, '')) + (/[.?!]$/.test(af.trim()) ? '' : '');
      const aFull = a.replace(/\s*\(no article\)\s*/i, '').trim();
      if (!hasBlank(t0) && t0.split(/\s+/).length >= 3 && /^[A-Za-z]/.test(aFull)) {
        const nt = norm(t0), na = norm(aFull);
        if (nt === na || (na.startsWith(nt.split(' ')[0]) && na !== nt && wordsOf(aFull).length - wordsOf(t0).length >= 1 && wordsOf(aFull).length - wordsOf(t0).length <= 2 && nt.split(' ').every(w => na.split(' ').includes(w)))) {
          if (nt !== na || nt === na) return {kind: 'fix', t: t0, a: aFull};
        }
      }

      /* tap a word in the sentence */
      if (!hasBlank(t0) && t0.split(/\s+/).length >= 3 && af.split(/\s+/).length <= 2 && wordsOf(af).length && wordsOf(af).every(w => wordsOf(t0).map(x => x.toLowerCase()).includes(w.toLowerCase())) && /^(read|find|underline|circle)/i.test((ps[0] ? '' : '') + '') === false && simpleAns(a))
        return {kind: 'tapword', sentence: t0, answer: af};

      /* pick from a list */
      const pl2 = /\(([^()]*,[^()]*)\)\s*\.?\s*$/.exec(t0);
      if (pl2 && /(circle|colou?r|underline|tick|find|pronounce|say)/i.test(t0)) {
        const lst = pl2[1].split(/\s*[,/]\s*/).map(x => x.replace(/\.$/, '').trim()).filter(w => /^[A-Za-z'-]+$/.test(w));
        const correct = lst.filter(w => new RegExp('\\b' + w + '\\b', 'i').test(a));
        if (lst.length >= 3 && correct.length >= 1 && correct.length < lst.length && !/—|blends are/.test(a)) return {kind: 'pick', list: lst, correct, verb: (/(circle|colou?r|underline|tick)/i.exec(t0) || ['pick'])[1].toLowerCase()};
      }

      /* spelling table */
      if (/correct spelling/i.test(t0) && tbl) {
        const rows = [...tbl.querySelectorAll('tbody tr, tr')].map(r => [...r.querySelectorAll('td,th')].map(c => c.textContent.trim()).filter(Boolean)).filter(r => r.length >= 2);
        if (rows.length >= 2) return {kind: 'spell', rows, answers: new Set(af.split(/\s*,\s*/).map(x => x.toLowerCase())), tbl, after: tbl};
      }

      /* blank sentences: word bank / pooled */
      if (hasBlank(t0) && simpleAns(a, 90) && wordsOf(stripParen(af)).length <= 3 && !/^\d+\./.test(af)) {
        const bank = wordBank(q); const cor = stripParen(af);
        let pool = bank ? bank.slice() : [];
        if (!bank || pool.length < 3) sameGroup(q).forEach(x => { const s = solAnswer(x); if (s && simpleAns(s) && wordsOf(s).length <= 3) pool.push(stripParen(s.replace(/\.$/, ''))); });
        const opts = [cor].concat(distractors(cor, pool, 3));
        if (norm(cor).split(' ').length === 1 || bank) return {kind: 'choice', stem: t0.replace(/\s*\((?:[^()]*picture[^()]*)\)\s*/i, ' ').trim(), opts, correct: cor};
        return {kind: 'type', prompt: t0, answer: cor, label: 'Finish the sentence'};
      }

      /* single words: meaning / plural / feminine */
      if (!/[?.]/.test(t0) && t0.split(/\s+/).length <= 3 && !hasBlank(t0) && !isInstr && simpleAns(a, 90)) {
        if (wordsOf(af).length >= 3 && /^[a-z]/.test(t0)) {
          const pool = []; sameGroup(q).forEach(x => { const s = solAnswer(x); if (s && wordsOf(s).length >= 3) pool.push(s.replace(/\.$/, '')); });
          if (pool.length >= 2) return {kind: 'choice', prompt: 'What does “' + t0 + '” mean?', opts: [af].concat(distractors(af, pool, 2)), correct: af, title: '📖 Word meaning'};
        }
        return {kind: 'type', prompt: t0 + '  →', answer: af, label: /s$/.test(af) && !/s$/.test(t0) ? 'Write the plural' : 'Type the answer'};
      }

      /* lists of cue -> answer (plurals, feminine, numbers in words) */
      if (!hasBlank(t0) && /,/.test(af)) {
        const cues = t0.replace(/^[^:]*:\s*/, '').split(/\s*,\s*/); const ans = af.split(/\s*,\s*/).map(x => x.replace(/\.$/, ''));
        if (!isInstr && cues.length === ans.length && cues.length >= 3 && cues.every(c => /^[A-Za-z]+$/.test(c))) return {kind: 'typelist', cues, answers: ans};
        if (/numbers? from 1.?10 in words/i.test(t0) && ans.length === 10) return {kind: 'typelist', cues: ans.map((_, i) => String(i + 1)), answers: ans, title: 'Write the number words'};
      }
    }

    /* dialogue */
    const dl = dialogueLines(ps);
    if (dl.length >= 2 && /dialogue|practise/i.test(t0)) return {kind: 'dialogue', lines: dl, after: ps[ps.length - 1]};

    /* open questions: speaking / writing / comprehension */
    if (a != null) {
      const vary = /^(answers? (will )?vary|for example|e\.g\.)/i.test(a) || /\(e\.g\./i.test(a);
      const wh = /\?\s*$/.test(t0) || /^(who|what|why|where|when|how|which|did|do|does|is|are|can|would|will|have|has)\b/i.test(t0);
      const write = /^(write|make|complete|share|think|talk|discuss|express|engage|get students|describe|name\b|look at the .* (write|and write)|rewrite|use the)/i.test(t0);
      if (vary || (wh && !isInstr)) return {kind: 'open', t: t0, a, mode: /sentences|write|notebook/i.test(t0) && vary ? 'write' : 'say'};
      if (write) return {kind: 'open', t: t0, a, mode: 'write'};
    }

    /* read aloud */
    if (/^(read|say|pronounce|practise)\b/i.test(t0)) {
      const wl = [];
      const fromList = /[:(]\s*([A-Za-z'’,.\s–-]+?)\)?\.?\s*$/.exec(t0);
      if (fromList) fromList[1].split(/\s*[,–-]\s*/).forEach(x => { x = x.trim().replace(/\.$/, ''); if (/^[A-Za-z']{1,14}$/.test(x)) wl.push(x); });
      nxt.forEach(n => { n.querySelectorAll('td,th').forEach(c => { const x = c.textContent.trim(); if (/^[A-Za-z']{2,14}$/.test(x)) wl.push(x); }); n.querySelectorAll('svg text').forEach(c => { const x = c.textContent.trim(); if (/^[A-Za-z']{2,14}$/.test(x) && c.getAttribute('fill') !== 'none') wl.push(x); }); });
      const uniq = [...new Set(wl.map(x => x))].slice(0, 24);
      if (uniq.length >= 2) return {kind: 'read', words: uniq};
    }
    return {kind: 'done', t: t0};
  }


  /* ---------------------------------------------------------------- read-along for stories and poems */
  function addReadAlong(card) {
    const root = card.querySelector('.m6-root[class*="c1-"]'); if (!root || root.querySelector('.c1a-readbar')) return;
    const sents = () => [...root.querySelectorAll('.m6-s')].filter(x => !x.closest('.m6-q,.m6-box.teach,.m6-box.note,.m6-box.check,.m6-help,.m6-tr,.c1a-card,.sb-tp,figure,.m6-table,.c1-sheet > .m6-page') && x.textContent.trim().length > 6 && !x.closest('[role=heading]'));
    if (sents().length < 2) return;
    const lg = langOf(subjOfRoot(root));
    const bar = h('div', 'c1a-readbar', '🎧 ', null); root.insertBefore(bar, root.querySelector('.c1-sheet') || root.firstChild);
    const lab = h('span', '', 'Listen and follow along', bar);
    const play = h('button', 'c1a-btn', '▶ Read to me', bar); play.type = 'button';
    const stop = h('button', 'c1a-btn', '⏹ Stop', bar); stop.type = 'button';
    let token = 0;
    const clear = () => root.querySelectorAll('.c1a-reading').forEach(x => x.classList.remove('c1a-reading'));
    stop.addEventListener('click', () => { token++; clear(); try { speechSynthesis.cancel(); } catch (e) { /* none */ } lab.textContent = tx('Listen and follow along', lg); });
    play.addEventListener('click', async () => {
      const my = ++token; clear(); const list = sents();
      for (let i = 0; i < list.length && my === token; i++) {
        const el = list[i]; el.classList.add('c1a-reading'); try { el.scrollIntoView({block: 'center', behavior: 'smooth'}); } catch (e) { /* ignore */ }
        lab.textContent = (lg.id === 'en' ? 'Sentence ' : '') + (i + 1) + tx(' of ', lg) + list.length;
        await speakAsync(clean(el), 1.1);
        el.classList.remove('c1a-reading');
      }
      if (my === token) { sndOk(); lab.textContent = tx('🌟 Well listened! Now read it yourself.', lg); }
    });
    loc(bar, lg);
  }

  /* ---------------------------------------------------------------- mount */
  function build(spec) {
    switch (spec.kind) {
      case 'choice': return wChoice(spec);
      case 'letter': return wLetter(spec.pattern, spec.frag, spec.word, spec.clue);
      case 'pairs': return wPairs(spec.pairs, spec);
      case 'order': return wOrder(spec.chips, spec.target, spec);
      case 'fix': return wFix(spec.t, spec.a, spec.marks, spec.title);
      case 'tapword': return wTapWord(spec.sentence, spec.answer);
      case 'pick': return wPick(spec.list, spec.correct, spec.verb);
      case 'tapsteps': return wTapSteps(spec.sentence, spec.steps);
      case 'sort': return wSort(spec.groups);
      case 'spell': return wSpell(spec.rows, spec.answers);
      case 'type': return wType(spec.prompt, spec.answer, spec.label);
      case 'typelist': return wTypeList(spec.cues, spec.answers, spec.title);
      case 'open': return wOpen(spec.t, spec.a, spec.mode);
      case 'dialogue': return wDialogue(spec.lines);
      case 'read': return wRead(spec.words);
      case 'letters': return wRead('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => l + l.toLowerCase()), '🔤 Tap a letter and hear its sound', w => { const l = w[1]; return w[0] + '. ' + C.SOUND[l] + '. ' + w[0] + ' for ' + C.WORD[l]; });
      case 'trace': return wTrace(spec.texts);
      case 'group': { const d = h('div', 'c1a-group'); spec.specs.forEach(sp => { const w = build(sp); w.dataset.c1p = sp.kind; d.appendChild(w); }); return d; }
      default: return BUILD[spec.kind] ? BUILD[spec.kind](spec) : wDone(spec.t);
    }
  }
  function scan() {
    css();
    document.querySelectorAll('.math-accordion-card[id^="math-topic-c1-"],.math-accordion-card[id^="math-topic-c2-"]').forEach(card => {
      if (card.dataset.c1r) return;
      const root = card.querySelector('.m6-root[class*="c1-"]'); if (!root) return;
      const sub = subjOfRoot(root);
      const ok = sub === 'eng' ? /^math-topic-c[12]-\d+-(reading|story|poem)$/.test(card.id) : (sub === 'isl' || sub === 'pashto' || sub === 'urdu') && !/-(opening|exercises|exercise)$/.test(card.id) && /^math-topic-c[12]-\d+-/.test(card.id);
      if (!ok) return;
      card.dataset.c1r = '1'; try { addReadAlong(card); } catch (e) { /* optional */ }
    });
    document.querySelectorAll('.m6-root[class*="c1-"] .m6-q:not([data-c1a]):not([data-c1p])').forEach(q => {
      if (!q.closest('.m6-root')) return;
      q.dataset.c1p = '1';
      const parts = [...q.querySelectorAll(':scope > .m6-parts > .m6-part')];
      const items = parts.length ? parts.slice() : [q];
      if (parts.length && q.querySelector(':scope > .m6-s .sb-ans')) items.unshift(q);    // the question itself has an answer too
      const gp = parts.length >= 3 ? partsPairs(q, parts) : null;
      if (gp) { const last = parts[parts.length - 1]; const sp = {kind: 'pairs', pairs: gp, help: 'Tap one on the left, then its partner on the right.'}; let w; try { w = build(sp); } catch (e) { w = null; } if (w) { w.dataset.c1p = 'pairs'; loc(w, langOf(subjOfRoot(q.closest('.m6-root')))); last.after(w); return; } }
      items.forEach(item => mountItem(q, item));
    });
  }
  function partsPairs(q, parts) {   // "Match the following" with one row per pair: row text -> row answer
    if (!/(match|join|ملائیں|ملا کر|جوڑ|کالم|ونښلوئ|یو ځائے)/i.test(qText(q))) return null;
    const prs = [];
    for (const pt of parts) {
      const a = solAnswer(pt); const t = qText(pt);
      if (a == null || !t || t.length > 46 || a.length > 46 || /\n|;/.test(a)) return null;
      prs.push([t.replace(/\s*\([^)]*\)\s*$/, ''), a.replace(/[.۔]\s*$/, '').replace(/\s*✓\s*$/, '')]);
    }
    const ra = new Set(prs.map(x => norm(x[1]))); const la = new Set(prs.map(x => norm(x[0])));
    return ra.size === prs.length && la.size === prs.length ? prs : null;
  }
  function mountItem(q, item) {
    {
      let spec; try { spec = classify(item); } catch (e) { spec = null; if (window.console) console.warn('c1 play classify', e); }
      if (!spec) return;
      let w; try { w = build(spec); } catch (e) { if (window.console) console.warn('c1 play build', e); return; }
      w.dataset.c1p = spec.kind; loc(w, langOf(subjOfRoot(q.closest('.m6-root'))));
      const anchor = spec.after || item;
      // every card, "Let's do it!" included, is folded behind a pill by js/sb_card_fold.js
      if (spec.kind === 'trace' && spec.fig) {
        spec.fig.style.display = 'none';
        const b = h('button', 'c1a-btn', '📖 Book picture', null); b.type = 'button';
        b.addEventListener('click', () => { const hid = spec.fig.style.display === 'none'; spec.fig.style.display = hid ? '' : 'none'; b.textContent = hid ? '🙈 Hide book picture' : '📖 Book picture'; });
        const tools = w.querySelector('.c1a-tools'); if (tools) tools.appendChild(b);
      }
      anchor.after(w);
    }
  }
  const obs = new MutationObserver(() => { clearTimeout(scan.t); scan.t = setTimeout(scan, 80); });
  const start = () => { obs.observe(document.body, {childList: true, subtree: true}); scan(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.C1_ENG_PLAY = {scan, classify};
  window.C1P = {partsPairs, wFix, wTapWord, EXTRA, clsOf, registerExtra: (sub, fn) => { EXTRA[sub] = fn; }, instrOf, bankFromText, parentQ, shuffle, pick, rnd, RULES, BUILD, register: (sub, fn) => { RULES[sub] = fn; }, LANGS, DICT, tx, loc, LG, langOf, subjOfRoot, praise, again, say, speak, speakAsync,
    norm, stripParen, wordsOf, hasBlank, solAnswer, qText, nextOf, sameGroup, wordBank, parenList, simpleAns, distractors, blankSplit, mini, cap1, STOP, scan,
    wChoice, wPairs, wOrder, wPick, wType, wTypeList, wOpen, wRead, wDone, wStar, wSort, resetBtn};
})();
