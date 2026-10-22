/* sb_morph.js — base forms of English words, offline.  window.SBMorph.bases('running') -> ['run', 'rune', ...] in the order to try.
 * Used by the word meanings (hover card, word-by-word gloss) so that "children", "running", "studies" or "hydrogens" find the entry of
 * "child", "run", "study", "hydrogen". A candidate is only a guess: the caller keeps the first one that has a stored meaning. */
(function () {
  'use strict';
  const IRREG = {
    am: 'be', is: 'be', are: 'be', was: 'be', were: 'be', been: 'be', being: 'be',
    has: 'have', had: 'have', having: 'have', does: 'do', did: 'do', done: 'do', doing: 'do',
    went: 'go', gone: 'go', goes: 'go', going: 'go', saw: 'see', seen: 'see', took: 'take', taken: 'take', gave: 'give', given: 'give',
    made: 'make', came: 'come', ran: 'run', got: 'get', gotten: 'get', knew: 'know', known: 'know', grew: 'grow', grown: 'grow', threw: 'throw', thrown: 'throw',
    drew: 'draw', drawn: 'draw', wrote: 'write', written: 'write', spoke: 'speak', spoken: 'speak', broke: 'break', broken: 'break', chose: 'choose', chosen: 'choose',
    rose: 'rise', risen: 'rise', fell: 'fall', fallen: 'fall', ate: 'eat', eaten: 'eat', drank: 'drink', drunk: 'drink', sang: 'sing', sung: 'sing',
    began: 'begin', begun: 'begin', swam: 'swim', swum: 'swim', flew: 'fly', flown: 'fly', wore: 'wear', worn: 'wear', woke: 'wake', woken: 'wake',
    bore: 'bear', born: 'bear', borne: 'bear', bought: 'buy', brought: 'bring', built: 'build', burnt: 'burn', caught: 'catch', taught: 'teach', thought: 'think',
    sought: 'seek', fought: 'fight', felt: 'feel', kept: 'keep', left: 'leave', lost: 'lose', meant: 'mean', met: 'meet', paid: 'pay', said: 'say', sold: 'sell',
    sent: 'send', spent: 'spend', stood: 'stand', told: 'tell', understood: 'understand', won: 'win', held: 'hold', heard: 'hear', found: 'find', led: 'lead',
    slept: 'sleep', swept: 'sweep', wept: 'weep', dealt: 'deal', dug: 'dig',
    hung: 'hang', laid: 'lay', lit: 'light', rode: 'ride', ridden: 'ride', shook: 'shake', shaken: 'shake', shot: 'shoot', sat: 'sit', slid: 'slide', spun: 'spin',
    stole: 'steal', stolen: 'steal', stuck: 'stick', struck: 'strike', swore: 'swear', tore: 'tear', torn: 'tear', woven: 'weave', wove: 'weave', froze: 'freeze', frozen: 'freeze',
    forgot: 'forget', forgotten: 'forget', forgave: 'forgive', forgiven: 'forgive', hid: 'hide', hidden: 'hide', bit: 'bite', bitten: 'bite', blew: 'blow', blown: 'blow',
    children: 'child', men: 'man', women: 'woman', feet: 'foot', teeth: 'tooth', mice: 'mouse', geese: 'goose', people: 'person', lives: 'life', knives: 'knife',
    wives: 'wife', leaves: 'leaf', wolves: 'wolf', halves: 'half', shelves: 'shelf', thieves: 'thief', loaves: 'loaf', selves: 'self', oxen: 'ox', dice: 'die',
    bacteria: 'bacterium', fungi: 'fungus', nuclei: 'nucleus', stimuli: 'stimulus', cacti: 'cactus', alumni: 'alumnus', bacilli: 'bacillus', radii: 'radius',
    larvae: 'larva', algae: 'alga', vertebrae: 'vertebra', formulae: 'formula', antennae: 'antenna', phenomena: 'phenomenon', criteria: 'criterion', media: 'medium',
    data: 'datum', analyses: 'analysis', bases: 'basis', crises: 'crisis', hypotheses: 'hypothesis', oases: 'oasis', theses: 'thesis', diagnoses: 'diagnosis',
    axes: 'axis', matrices: 'matrix', vertices: 'vertex', indices: 'index', appendices: 'appendix', apices: 'apex', better: 'good', best: 'good', worse: 'bad', worst: 'bad',
    more: 'much', most: 'much', further: 'far', furthest: 'far', farther: 'far', elder: 'old', eldest: 'old',
    ones: 'one', them: 'they', their: 'they', theirs: 'they', me: 'i', my: 'i', mine: 'i', us: 'we', our: 'we', ours: 'we', him: 'he', his: 'he', her: 'she', hers: 'she'
  };
  const VOWEL = /[aeiou]/;
  const PREFIX = /^(un|re|dis|mis|pre|non|over|under|out|sub|inter|anti|semi|multi)(.+)$/;

  function bases(raw) {
    const w = String(raw || '').toLowerCase().replace(/’/g, "'").replace(/^['-]+|['-]+$/g, '');
    const out = [];
    const add = x => { if (x && x.length > 1 && x !== w && out.indexOf(x) < 0) out.push(x); };
    if (!w) return out;
    if (IRREG[w]) add(IRREG[w]);
    let b = w;
    if (/'s$/.test(b)) { add(b.slice(0, -2)); b = b.slice(0, -2); }
    else if (/s'$/.test(b)) { add(b.slice(0, -1)); b = b.slice(0, -1); }
    if (b !== w && IRREG[b]) add(IRREG[b]);
    // plural / 3rd person
    if (/ies$/.test(b) && b.length > 4) add(b.slice(0, -3) + 'y');
    if (/ves$/.test(b) && b.length > 4) { add(b.slice(0, -3) + 'f'); add(b.slice(0, -3) + 'fe'); }
    if (/(ss|sh|ch|x|z|o)es$/.test(b)) add(b.slice(0, -2));
    if (/ses$/.test(b) && b.length > 4) { add(b.slice(0, -1)); add(b.slice(0, -2)); }
    if (/s$/.test(b) && !/(ss|us|is)$/.test(b) && b.length > 2) add(b.slice(0, -1));
    // past
    if (/ied$/.test(b) && b.length > 4) add(b.slice(0, -3) + 'y');
    if (/ed$/.test(b) && b.length > 3) {
      add(b.slice(0, -2)); add(b.slice(0, -1));
      if (/([^aeiouy])\1ed$/.test(b)) add(b.slice(0, -3));
    }
    // -ing
    if (/ing$/.test(b) && b.length > 4) {
      const s = b.slice(0, -3);
      add(s); add(s + 'e');
      if (/([^aeiouy])\1$/.test(s)) add(s.slice(0, -1));
      if (/ying$/.test(b)) add(b.slice(0, -4) + 'ie');
    }
    // adverbs / comparatives / derivations
    if (/ily$/.test(b) && b.length > 4) add(b.slice(0, -3) + 'y');
    if (/ally$/.test(b) && b.length > 5) { add(b.slice(0, -2)); add(b.slice(0, -4)); }
    if (/ly$/.test(b) && b.length > 3) { add(b.slice(0, -2)); add(b.slice(0, -2) + 'e'); }
    if (/(er|est)$/.test(b) && b.length > 4) {
      const s = b.replace(/(er|est)$/, '');
      add(s); add(s + 'e');
      if (/([^aeiouy])\1$/.test(s)) add(s.slice(0, -1));
      if (/i$/.test(s)) add(s.slice(0, -1) + 'y');
    }
    if (/ness$/.test(b) && b.length > 5) { add(b.slice(0, -4)); if (/i$/.test(b.slice(0, -4))) add(b.slice(0, -5) + 'y'); }
    if (/ment$/.test(b) && b.length > 5) add(b.slice(0, -4));
    if (/ful$/.test(b) && b.length > 5) add(b.slice(0, -3));
    if (/less$/.test(b) && b.length > 5) add(b.slice(0, -4));
    if (/able$/.test(b) && b.length > 6) { add(b.slice(0, -4)); add(b.slice(0, -4) + 'e'); }
    if (/ation$/.test(b) && b.length > 6) { add(b.slice(0, -5) + 'e'); add(b.slice(0, -5)); }
    if (/ion$/.test(b) && b.length > 5) { add(b.slice(0, -3)); add(b.slice(0, -3) + 'e'); }
    const m = b.match(PREFIX);
    if (m && m[2].length > 3 && VOWEL.test(m[2])) add(m[2]);
    return out;
  }

  window.SBMorph = { bases: bases, irregular: IRREG };
})();
