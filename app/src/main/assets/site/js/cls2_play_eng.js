/* Class 2 English — extra rules for the play layer (toolkit: window.C1P from js/cls1_eng_play.js).
 * Class 2 questions come in groups ("Circle the correct spelling in each row" with rows a) b) c)…), so the play
 * layer treats every row as its own little game and uses the instruction line for context:
 *   i) ii) iii) iv) options → tap the right one          a / b / c rows → "which is spelled correctly?"
 *   (a/the) inside a sentence                           sounds (k / l / d) — a duck
 *   word bank in the instruction "(help, writes, …)"     'is', 'are' or 'am' quoted in the instruction
 *   draw__ng, g__ests, … lists → one missing-letter game per word
 *   cue lists (tree, watch, fox → trees, watches, foxes) → answer boxes      arrows a → b → pairs
 *   syllable counts, paragraph blanks, sight words, circle/underline words in a sentence */
(function () {
  'use strict';
  const P = window.C1P; if (!P || !P.registerExtra) return;
  const {norm, stripParen, hasBlank, solAnswer, qText, nextOf, shuffle, distractors, instrOf, bankFromText, wordBank, sameGroup} = P;
  const ROM = '(?:i{1,3}|iv|v|vi)';

  function quoted(instr) { const m = [...instr.matchAll(/['‘’]([A-Za-z]{1,8})['‘’]/g)].map(x => x[1]); return m.length >= 2 ? [...new Set(m)] : null; }

  function classify(item, cls) {
    if (cls !== 'cls2') return null;
    const t0 = qText(item).replace(/^[ivx]+\.\s*/i, '').trim(); if (!t0) return null;
    const a = solAnswer(item); if (a == null) return null;
    const af = a.replace(/\.\s*$/, '').trim();
    const instr = instrOf(item);
    const isPart = item.classList.contains('m6-part');
    let m;

    /* i) ii) iii) options */
    const re = new RegExp('(?:^|\\s)(' + ROM + ')\\)\\s+(.+?)(?=\\s+' + ROM + '\\)\\s|$)', 'g'); const opts = [];
    while ((m = re.exec(t0))) opts.push({l: m[1], t: m[2].trim()});
    if (opts.length >= 2) {
      const cl = new RegExp('^(' + ROM + ')\\)\\s*(.*)$').exec(af); const cor = cl && (opts.find(o => o.l === cl[1]) || opts.find(o => norm(o.t) === norm(cl[2])));
      const cut = t0.search(new RegExp('\\s' + ROM + '\\)\\s'));
      if (cor) return {kind: 'choice', stem: (cut > 0 ? t0.slice(0, cut) : t0).trim(), opts: opts.map(o => o.t), correct: cor.t};
    }

    /* rows of spellings: glad / glade / gled */
    if (/^[\p{L}'’ -]+(?:\s\/\s[\p{L}'’ -]+){1,3}$/u.test(t0)) {
      const its = t0.split(/\s\/\s/).map(x => x.trim()); const cor = its.find(x => norm(x) === norm(af));
      if (cor) return {kind: 'choice', prompt: /spell/i.test(instr) ? 'Which word is spelled correctly?' : 'Which one is right?', opts: its, correct: cor, title: /spell/i.test(instr) ? '⭕ Correct spelling' : '🎯 Choose the right word'};
    }
    /* inline (a/the) */
    m = /\(([^()/]+)\/([^()/]+)\)/.exec(t0);
    if (m && [m[1], m[2]].some(x => norm(x) === norm(af))) return {kind: 'choice', stem: t0.replace(m[0], '___'), opts: [m[1].trim(), m[2].trim()], correct: af};

    /* initial / final sounds with letter options */
    m = /^\(([a-z])\s*\/\s*([a-z])\s*\/\s*([a-z])\)\s*[—–-]\s*(.+)$/i.exec(t0);
    if (m && /^[a-z]$/i.test(af)) return {kind: 'choice', prompt: 'What is the ' + (/final|last|end/i.test(instr) ? 'final' : 'first') + ' sound of “' + m[4].trim() + '”?', opts: [m[1], m[2], m[3]], correct: af.toLowerCase(), title: '🔤 Find the sound'};

    /* blanks with a bank or quoted choices in the instruction */
    if (hasBlank(t0) && af.split(/\s+/).length <= 3) {
      const q2 = quoted(instr); const bank = q2 || bankFromText(instr);
      const cor = stripParen(af);
      if (bank && bank.some(x => norm(x) === norm(cor))) {
        let o = bank.slice(); if (o.length > 5) o = [cor].concat(distractors(cor, bank, 3));
        return {kind: 'choice', stem: t0.replace(/\s*\([^()]*\)\s*$/, ''), opts: o, correct: cor};
      }
    }

    if (!isPart) {
      /* draw__ng, g__ests, sist__r … */
      const tail = /\.\s*((?:[A-Za-z]*_+[A-Za-z]*,?\s*)+)$/.exec(t0);
      const ans = af.split(/\s*,\s*/);
      if (tail) {
        const pats = tail[1].trim().replace(/,\s*$/, '').split(/\s*,\s*/);
        if (pats.length === ans.length && pats.length >= 2) {
          const specs = [];
          pats.forEach((pt, i) => {
            const mm = /^([A-Za-z]*)(_+)([A-Za-z]*)$/.exec(pt); const w = ans[i].replace(/\s*\(.*\)/, '').trim();
            if (mm && w.toLowerCase().startsWith(mm[1].toLowerCase()) && w.toLowerCase().endsWith(mm[3].toLowerCase()) && w.length > mm[1].length + mm[3].length)
              specs.push({kind: 'letter', pattern: pt, frag: w.slice(mm[1].length, w.length - mm[3].length), word: w, clue: ''});
            else specs.push({kind: 'type', prompt: pt.replace(/_+/g, '_'), answer: w.split(/\s+or\s+/)[0], label: 'Write the whole word'});   // several gaps in one word
          });
          if (specs.length === pats.length) return {kind: 'group', specs};
        }
      }
      /* cue list -> answer list (plurals…) */
      const cueM = /\.\s*([A-Za-z]+(?:,\s*[A-Za-z]+){2,})\s*$/.exec(t0);
      if (cueM && /,/.test(af) && !/→|—/.test(af)) {
        const cues = cueM[1].split(/\s*,\s*/), ans2 = af.split(/\s*,\s*/).map(x => x.replace(/\s*\(.*\)/, '').trim());
        if (cues.length === ans2.length) return {kind: 'typelist', cues, answers: ans2, title: 'Write the answers'};
      }
      /* "word: meaning; word: meaning" */
      const meanings = af.split(/;\s*/).map(x => /^([A-Za-z][A-Za-z ]{0,20}?):\s*(.{3,80})$/.exec(x.trim())).filter(Boolean);
      if (meanings.length >= 3 && meanings.length === af.split(/;\s*/).length && /meaning/i.test(t0)) return {kind: 'pairs', pairs: meanings.map(x => [x[1].trim(), x[2].trim().replace(/\.$/, '')]), help: 'Tap a word, then its meaning.'};
      /* rearrange the words: (fine. We are) (Is a This car.) */
      if (/rearrange|arrange/i.test(t0)) {
        const groups = [...t0.matchAll(/\(([^()]+)\)/g)].map(x => x[1].trim()).filter(x => x.split(/\s+/).length >= 2);
        const sents = af.split(/(?<=[.?!])\s+/);
        if (groups.length >= 2 && groups.length === sents.length) {
          const specs = groups.map((g, i) => ({kind: 'order', chips: g.replace(/[.?!]/g, '').split(/\s+/), target: sents[i], sequence: sents[i].replace(/[.?!]$/, '').split(/\s+/), title: '🧩 Make a sentence', help: 'Tap the words to build a sentence that makes sense.'}));
          return {kind: 'group', specs};
        }
      }
      /* arrows: me → she, fast → last */
      if (/→/.test(af)) {
        const prs = af.split(/\s*,\s+/).map(x => x.split(/\s*→\s*/).map(y => y.trim())).filter(x => x.length === 2 && x[0] && x[1]);
        if (prs.length >= 2 && prs.length === af.split(/\s*,\s+/).length) return {kind: 'pairs', pairs: prs};
      }
      /* syllables: shoes 1, inside 2 */
      const syl = [...af.matchAll(/([A-Za-z·]+)\s+(\d)(?=,|$)/g)];
      if (syl.length >= 3 && /syllable/i.test(t0)) return {kind: 'typelist', cues: syl.map(x => x[1]), answers: syl.map(x => x[2]), title: 'How many syllables?'};
      /* sight words in shape boxes */
      if (/sight words?/i.test(t0) && /^[a-z]+/i.test(af)) {
        const ws = af.split(/\s*,\s*(?![^()]*\))/).map(x => x.trim().split(/\s+/)[0].replace(/\..*$/, '')).filter(x => /^[a-z']{1,10}$/i.test(x)); if (ws.length >= 3) return {kind: 'read', words: ws};
      }
      /* paragraph with several blanks and an answer per blank */
      const nb = (t0.match(/_{2,}/g) || []).length;
      if (nb >= 2) { const ans3 = af.split(/\s*,\s*/); if (ans3.length === nb) return {kind: 'typelist', cues: ans3.map((_, i) => 'gap ' + (i + 1)), answers: ans3, title: 'Fill the gaps'}; }
    }
    /* circle / underline words in the sentence */
    if (isPart && /(circle|underline|tick)/i.test(instr) && !hasBlank(t0)) {
      const words = af.replace(/\([^)]*\)/g, '').split(/\s*,\s*/).map(x => x.trim()).filter(Boolean);
      const sw = (t0.match(/[\p{L}'’]+/gu) || []).map(x => x.toLowerCase());
      if (words.length && words.every(w => w.split(/\s+/).every(x => sw.includes(x.replace(/-.*$/, '').toLowerCase())))) return {kind: 'tapword', sentence: t0, answer: words.join(' ')};
    }
    return null;
  }
  P.registerExtra('eng', classify);
  if (P.scan) P.scan();
})();
