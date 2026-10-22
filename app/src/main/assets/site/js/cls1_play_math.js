/* Class 1 Mathematics — play layer (uses the toolkit exported by js/cls1_eng_play.js as window.C1P).
 * Every Class 1 maths question is turned into a tap-and-play game next to the printed question:
 *   counting / missing numbers / sums and differences  → pick the number, it jumps into the gap
 *   ordering numbers  → tap the number cards in the right order
 *   more than / less than, greater / smaller            → tap the right one
 *   tens and ones, several blanks                        → little answer boxes
 *   coins and notes, clocks, shapes, days and months     → picture questions with the right choices
 *   "tick the longest…", "colour the tallest…"           → pick the right object from the picture
 *   matching                                             → tap-tap pairs
 *   anything that needs drawing/colouring                → ⭐ I did it! (the picture has its own pencil tool)
 * The answers come from window.CLS6_SOLUTIONS (SpaceBook answers); the book data is untouched. */
(function () {
  'use strict';
  const P = window.C1P; if (!P) return;
  const C = window.C1A;
  const {norm, stripParen, hasBlank, solAnswer, qText, nextOf, sameGroup, shuffle} = P;
  const clean = C.clean;
  const isInt = s => /^\d+$/.test(String(s).trim());

  function numOpts(n) {
    n = +n; const set = new Set([n]);
    const cand = n < 10 ? [n + 1, n - 1, n + 2, n - 2, n + 3] : [n + 1, n - 1, n + 2, n - 2, n + 10, n - 10];
    if (n >= 10 && n < 100 && n % 11) cand.unshift((n % 10) * 10 + Math.floor(n / 10));
    shuffle(cand.slice(0, 6)).concat(cand.slice(6)).forEach(c => { if (c >= 0 && set.size < 4) set.add(c); });
    let k = 1; while (set.size < 3) set.add(n + 3 + k++);
    return shuffle([...set]).map(String);
  }
  function leadInt(a) {
    const m = /^(?:Rs\.?\s*)?(\d+)(?=$|\s*[—–(]|\s+[A-Za-z]+(?:\s*\(|$|\s+\())/.exec(a.trim());
    return m ? m[1] : null;
  }
  function prevPara(q) {
    let n = q.previousElementSibling, steps = 0;
    while (n && steps < 10) { steps++; if (n.matches('p,.m6-para')) return clean(n); if (n.matches('[role=heading],.m6-h3,.m6-h4')) break; n = n.previousElementSibling; }
    return '';
  }
  function figCaption(fig) {
    if (!fig) return '';
    const c = fig.querySelector('figcaption .m6-s'); const lab = fig.querySelector('svg') && fig.querySelector('svg').getAttribute('aria-label');
    return ((c ? clean(c) : '') + ' | ' + (lab || '')).trim();
  }
  const blanksIn = s => (s.match(/_{2,}|☐/g) || []).length;

  /* "Tick the chilli (shortest); cross the carrot (longest)" -> [{verb, noun, how}] */
  function segments(a) {
    const out = [];
    a.split(/;\s*/).forEach(seg => {
      const m = /^(Tick|Cross|Colour|Circle|Encircle|Colou?r)\b[^A-Za-z]*(?:\([^)]*\))?\s*(?:the\s+)?([A-Za-z ]+?)\s*(?:\(([a-z ]+)\))?\.?$/i.exec(seg.trim());
      if (m) out.push({verb: m[1], noun: m[2].trim(), how: (m[3] || '').trim()});
    });
    return out;
  }
  function itemsFromCaption(cap) {
    const t = cap.split('|')[0].replace(/^(A|An|The)\s/i, '').replace(/\s+to colour.*$/i, '');
    const parts = t.split(/\s*,\s*|\s+and\s+/).map(x => x.replace(/^(a|an|the|three|two)\s+/i, '').replace(/\s+of different heights/i, '').trim()).filter(Boolean);
    return parts.length >= 2 && parts.length <= 6 && parts.every(x => x.split(' ').length <= 3) ? parts : null;
  }

  function classify(q) {
    const t = qText(q); if (!t) return null;
    const a = solAnswer(q);
    const nxt = nextOf(q);
    const fig = nxt.find(n => n.matches('figure.m6-fig'));
    const cap = figCaption(fig);
    if (a == null) return null;
    const af = a.replace(/\.\s*$/, '').trim();
    let m;
    const nb = blanksIn(t);

    /* open / opinion */
    if (/^(answers? (will )?vary|for example|e\.g\.)/i.test(a) || /\(for example/i.test(a)) return {kind: 'open', t, a, mode: 'say'};

    /* "5 + 4 = 9" answers for pictures */
    m = /^(\d+\s*[+−-]\s*\d+)\s*=\s*(\d+)$/.exec(af);
    if (m && !/=/.test(t)) return {kind: 'choice', stem: m[1] + ' = ___', opts: numOpts(m[2]), correct: m[2], title: '➕ Solve it', help: 'Count the picture and solve. Tap the number!'};

    m = /(\d+)\s+is\s+(\d+)\s+(more|less)\s+than\s+(\d+)/.exec(af);
    if (m && nb >= 1) return {kind: 'choice', prompt: m[1] + ' is how many ' + m[3] + ' than ' + m[4] + '?', opts: numOpts(m[2]), correct: m[2], title: '🔢 How much ' + m[3] + '?', help: 'Count the hops or look at the picture. Tap the number!'};
    /* "split 11 into tens and ones": 11 + 2 = __ with the working shown in the answer */
    m = /=\s*(\d+)\s*$/.exec(af);
    if (m && nb === 1 && /^\d+\s*[+−-]\s*\d+\s*=\s*__/.test(t) && /into tens and ones/.test(t)) return {kind: 'choice', stem: t.replace(/\s*\(.*\)\s*$/, ''), opts: numOpts(m[1]), correct: m[1], title: '➕ Solve it', help: 'Split the number into tens and ones to help you. Tap the answer!'};
    /* three-number rows like __, 14, __ */
    if (nb >= 1 && /^[\d_,\s]+$/.test(t)) {
      const toks = t.split(/\s*,\s*/), lst = af.split(/\s*,\s*/);
      if (toks.length === lst.length && lst.every(isInt)) { const vals = []; toks.forEach((tk, i) => { if (/^_+$/.test(tk)) vals.push(lst[i]); }); if (vals.length === nb) return {kind: 'typelist', cues: vals.map((_, i) => 'gap ' + (i + 1)), answers: vals, title: 'Write the missing numbers'}; }
    }
    /* several blanks: 5 + __ = __, ____ + ____ = ____ … */
    if (nb >= 2) {
      const ints = af.match(/\d+/g) || [];
      if (/=/.test(t) && !/[A-Za-z]{3,}/.test(t.replace(/Rs|rupees?/gi, ''))) {
        const tt = t.replace(/[()]/g, ' ').split(/\s+/), aa = af.replace(/[()]/g, ' ').split(/\s+/); const vals = [];
        tt.forEach((tok, i) => { if (/^_+$|^☐$/.test(tok) && aa[i] != null) vals.push(aa[i]); });
        if (vals.length === nb && vals.every(isInt)) return {kind: 'typelist', cues: vals.map((_, i) => 'gap ' + (i + 1)), answers: vals, title: 'Fill the gaps'};
      }
      if (ints.length === nb) return {kind: 'typelist', cues: ints.map((_, i) => 'gap ' + (i + 1)), answers: ints, title: 'Fill the gaps'};
      /* number sequences: 0, __, 2, __, __, 5 */
      const list = af.split(/\s*,\s*/);
      if (list.length === nb && list.every(isInt)) return {kind: 'typelist', cues: list.map((_, i) => 'gap ' + (i + 1)), answers: list, title: 'Write the missing numbers'};
    }

    /* single blank / equation with a number answer */
    const num = leadInt(af) || (isInt(af) ? af : null);
    if (nb === 1 && num != null && !/more than|less than/i.test(af)) {
      if (/^[\d\s,+−\-=×÷_]+$/.test(t) || /^[\d\s,+−\-=_]*_+[\d\s,+−\-=_]*$/.test(t))
        return {kind: 'choice', stem: t, opts: numOpts(num), correct: num, title: /[+−\-=]/.test(t) ? '➕ Solve it' : '🔢 Which number comes here?', help: 'Tap the number. It will jump into the gap!'};
      return {kind: 'choice', stem: t.replace(/\(.*?\)\s*$/, ''), opts: numOpts(num), correct: num, title: '🔢 Count and choose'};
    }
    if (nb === 0 && /^[\d\s]+[+−×÷\-][\d\s]+$/.test(t) && isInt(af)) return {kind: 'choice', stem: t + ' = ___', opts: numOpts(af), correct: af, title: '➕ Solve it', help: 'Work it out in your head, then tap the number!'};

    /* more than / less than */
    if (/^(more than|less than)$/i.test(af) && nb >= 1) return {kind: 'choice', stem: t, opts: ['more than', 'less than'], correct: af.toLowerCase(), title: '⚖️ More or less?'};
    if (/^\d+,\s*\d+$/.test(t) && isInt(af)) {
      const pp = prevPara(q).toLowerCase(); const big = /greater|bigger|larger/.test(pp), small = /smaller|lesser|less|smallest/.test(pp);
      return {kind: 'choice', prompt: big ? 'Which number is greater?' : small ? 'Which number is smaller?' : 'Which number is it?', opts: t.split(/\s*,\s*/), correct: af, title: '⚖️ Compare the numbers'};
    }
    m = /^(Which number is (?:greater|smaller)\?)\s*(\d+)\s*or\s*(\d+)$/i.exec(t);
    if (m && isInt(af)) return {kind: 'choice', prompt: m[1], opts: [m[2], m[3]], correct: af, title: '⚖️ Compare the numbers'};

    /* ordering numbers */
    const ol = t.replace(/^[^:]*:\s*/, '');
    if (/^\d+(\s*,\s*\d+){2,}$/.test(ol) && /^\d+(\s*,\s*\d+){2,}$/.test(af)) {
      const seq = af.split(/\s*,\s*/), asc = +seq[0] < +seq[seq.length - 1];
      return {kind: 'order', chips: ol.split(/\s*,\s*/), target: seq.join(', '), sequence: seq, exact: true, title: asc ? '🔢 Smallest to biggest' : '🔢 Biggest to smallest', help: asc ? 'Tap the number cards from the smallest to the biggest.' : 'Tap the number cards from the biggest to the smallest.'};
    }

    /* tens and ones */
    m = /^Tens (\d+), Ones (\d+)(?:, Number (\d+))?$/.exec(af);
    if (m) return {kind: 'typelist', cues: m[3] ? ['Tens', 'Ones', 'Number'] : ['Tens', 'Ones'], answers: m[3] ? [m[1], m[2], m[3]] : [m[1], m[2]], title: 'Tens and ones'};

    m = /^Left (\d), middle (\d), right (\d)$/i.exec(af);
    if (m) return {kind: 'typelist', cues: ['Left', 'Middle', 'Right'], answers: [m[1], m[2], m[3]], title: 'Write 1, 2 or 3'};
    m = /^((?:[A-Za-z][A-Za-z ]*? \d(?: \([a-z]+\))?(?:,\s*)?){3,})$/.exec(af);
    if (m && /write \d|write 1/i.test(prevPara(q) + ' ' + t)) { const it = [...af.matchAll(/([A-Za-z][A-Za-z ]*?) (\d)/g)]; if (it.length >= 3) return {kind: 'typelist', cues: it.map(x => x[1].trim()), answers: it.map(x => x[2]), title: 'Write the numbers'}; }
    /* coins and notes */
    if (/Rupees?\s*☐|Rupee ☐/i.test(t) && isInt(af)) {
      const set = new Set([af]); shuffle([1, 2, 5, 10, 20, 50, 100].map(String)).forEach(v => { if (set.size < 4) set.add(v); });
      return {kind: 'choice', stem: t.replace(/:.*$/, ''), prompt: t.replace(/:?\s*Rupees?\s*☐/i, '') + ' — how many rupees?', opts: shuffle([...set]), correct: af, title: '💰 What is it worth?'};
    }

    /* clocks */
    if (/clock/i.test(t + ' ' + cap) && /(o'clock|^\d{1,2}:00$)/.test(af)) {
      const ch = /choices?\s+([\d:]+(?:,\s*[\d:]+)+)/i.exec(cap);
      let opts, cor = af;
      if (ch) opts = ch[1].split(/\s*,\s*/);
      else { const h0 = parseInt(af, 10); const set = new Set([h0]); [h0 + 1, h0 - 1, h0 + 2, h0 - 2].forEach(x => { x = ((x + 11) % 12) + 1; if (set.size < 3) set.add(x); }); opts = shuffle([...set]).map(x => x + " o'clock"); cor = h0 + " o'clock"; }
      return {kind: 'choice', prompt: 'What time does the clock show?', opts, correct: cor, title: '🕐 Read the clock'};
    }

    /* choose between two named things: (Thursday / Wednesday) */
    const pl = /\(([^()]+?)\s*[\/]\s*([^()]+?)\)\s*[.?]?$/.exec(t);
    if (pl) {
      const opts = [pl[1].trim(), pl[2].trim()]; const cor = opts.find(o => norm(af).startsWith(norm(o)));
      if (cor) return {kind: 'choice', stem: hasBlank(t) ? t.replace(/\s*\([^()]*\)\s*[.?]?$/, '.') : null, prompt: hasBlank(t) ? null : t.replace(/\s*\([^()]*\)\s*$/, ''), opts, correct: cor, title: '🎯 Choose the right answer'};
    }
    m = /^Which one is (\w+),\s*(?:a |an |the |your )?([\w ]+?) or (?:a |an |the |your )?([\w ]+)\?$/i.exec(t);
    if (m) { const opts = [m[2], m[3]]; const cor = opts.find(o => norm(af).includes(norm(o))); if (cor) return {kind: 'choice', prompt: t.replace(/,.*$/, '?'), opts, correct: cor, title: '🎯 Choose the right answer'}; }
    m = /^(.+?):\s*(\d+),\s*(\d+) or (\d+)\?$/.exec(t);
    if (m && isInt(af)) return {kind: 'choice', prompt: 'How many ' + m[1].toLowerCase() + '? (count the picture)', opts: [m[2], m[3], m[4]], correct: af, title: '🔢 Count and choose'};

    /* shapes */
    if (/^(circle|square|triangle|rectangle)$/i.test(af)) return {kind: 'choice', prompt: 'What shape is ' + (/\?$/.test(t) ? 'it' : 'the ' + t.toLowerCase()) + '?', opts: ['Circle', 'Square', 'Triangle', 'Rectangle'], correct: cap1(af), title: '🔷 Name the shape'};

    /* yes / no */
    if (/^(✓\s*)?yes\b|^(✗\s*)?no\b/i.test(af) && (/\?$/.test(t) || /Rs/.test(t))) {
      const yes = /^(✓\s*)?yes/i.test(af);
      return {kind: 'choice', prompt: /\?$/.test(t) ? t : t + ' — is it exactly the price?', opts: ['Yes', 'No'], correct: yes ? 'Yes' : 'No', title: '🤔 Yes or no?'};
    }

    /* pairs: January–1st, Monday 1st, cook – book */
    const pairs = parsePairs(af);
    if (pairs) return {kind: 'pairs', pairs, help: 'Tap one on the left, then its partner on the right.', fig, after: fig || q};

    /* which picture / group / position */
    m = /^Picture ([A-D])$/i.exec(af);
    if (m) { const letters = [...new Set((cap.match(/\b([A-D])\s*:/g) || []).map(x => x[0]))]; const opts = (letters.length >= 2 ? letters : ['A', 'B']).map(x => 'Picture ' + x); return {kind: 'choice', prompt: t.replace(/\.$/, '') + ' — which picture?', opts, correct: 'Picture ' + m[1].toUpperCase(), title: '🖼️ Look and choose'}; }
    m = /^Tick groups? ([A-C])(?: and ([A-C]))?\b/i.exec(af);
    if (m && !m[2]) return {kind: 'choice', prompt: t + ' — which group?', opts: ['Group A', 'Group B', 'Group C'], correct: 'Group ' + m[1].toUpperCase(), title: '💰 Which group?'};
    m = /\b(left|middle|right)\b/i.exec(af.replace(/\(the [^)]*\)/g, ''));
    if (m && /^(tick|colou?r|circle|encircle|cross)/i.test(t) && fig && !/ and /.test(af.replace(/\([^)]*\)/g, ''))) return {kind: 'choice', prompt: t.replace(/\.$/, '') + ' — where is it?', opts: ['Left', 'Middle', 'Right'], correct: cap1(m[1].toLowerCase()), title: '🖼️ Look and choose'};
    /* picture picks: tick / colour / encircle */
    if (/^(tick|cross|colou?r|circle|encircle)/i.test(t) && fig) {
      const items = itemsFromCaption(cap);
      const segs = segments(af);
      if (items && segs.length) {
        const steps = segs.map(sg => {
          const noun = items.find(it => norm(sg.noun).includes(norm(it).replace(/s$/, '')) || norm(it).includes(norm(sg.noun)));
          return noun ? {prompt: (sg.how ? 'Which one is the ' + sg.how + '? ' : '') + sg.verb + ' it.', correct: noun} : null;
        });
        if (steps.every(Boolean)) return {kind: 'choiceseq', items, steps};
      }
      m = /^(?:Tick|Cross|Colour|Circle|Encircle)[^A-Za-z]*(?:\([^)]*\))?\s*(?:the\s+)?(.+?)\.?$/i.exec(af);
      if (items && m) { const cor = items.find(it => norm(m[1]).includes(norm(it).replace(/s$/, ''))); if (cor) return {kind: 'choice', prompt: t.replace(/\.$/, '') + ' — which one?', opts: items, correct: cor, title: '🖼️ Look and choose'}; }
    }

    /* numeric answers to questions: what number comes before 100? / how many …? */
    if ((num != null) && (/\?$/.test(t) || fig || /^(Add|Subtract|Find the difference)/i.test(t))) {
      if (/^(Tick|Colour|Circle|Draw|Cross)/i.test(t)) return {kind: 'done', t};
      return {kind: 'choice', prompt: /\?$/.test(t) ? t : 'Count: ' + t + '. How many?', opts: numOpts(num), correct: num, title: '🔢 Count and choose', help: 'Tap the number. It will jump into the gap!'};
    }

    /* factual questions */
    if (/\?$/.test(t) && !/^(draw|colou?r|tick)/i.test(t)) return {kind: 'open', t, a, mode: 'say'};
    return {kind: 'done', t};
  }
  const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);
  function parsePairs(af) {
    const parts = af.split(/\s*,\s+(?=[A-Za-z])/);
    if (parts.length < 3) return null;
    const out = [];
    for (const p of parts) {
      let m = /^([A-Za-z' -]{2,20}?)\s*[–—]\s*(\d+(?:st|nd|rd|th))$/.exec(p.trim()) || /^([A-Z][a-z'-]+)\s+(\d+(?:st|nd|rd|th))$/.exec(p.trim());
      if (!m) m = /^([A-Za-z0-9:' -]{1,22}?)\s*[–—]\s*([A-Za-z0-9:' -]{1,30})$/.exec(p.trim());
      if (!m) return null;
      out.push([m[1].trim(), m[2].trim()]);
    }
    return out.length >= 3 ? out : null;
  }

  /* a short run of picture questions, one after the other */
  P.BUILD.choiceseq = spec => {
    const card = P.mini('🖼️ Look and choose', 'Look at the picture. Tap the right word for each question.');
    const h = C.h; const stem = h('div', 'c1a-stem', '', card), opts = h('div', 'c1a-wopts', '', card), msg = h('div', 'c1a-msg c1a-center', '', card);
    let i = 0;
    function show() {
      stem.textContent = spec.steps[i].prompt; opts.innerHTML = '';
      shuffle(spec.items.slice()).forEach(it => {
        const b = h('button', 'c1a-wopt', it, opts); b.type = 'button';
        b.addEventListener('click', () => {
          if (norm(it) === norm(spec.steps[i].correct)) {
            b.classList.add('right'); C.sndOk(); P.speak(it); i++;
            if (i >= spec.steps.length) { C.confetti(card); P.say(msg, '🏆 ' + P.praise(), 'ok'); Array.from(opts.children).forEach(x => { x.disabled = true; }); stem.textContent = '✅'; }
            else { P.say(msg, P.praise(), 'ok'); setTimeout(show, 700); }
          } else { b.classList.add('wrong'); C.sndNo(); P.say(msg, P.again(), 'no'); }
        });
      });
    }
    show();
    return card;
  };

  P.register('math', classify);
  if (P.scan) P.scan();
})();
