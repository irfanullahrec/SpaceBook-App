// Looks through assets/mcq_bank.json for text a quiz card cannot show (LaTeX left over) and prints a few converted formulas.
const fs = require('fs'), path = require('path');
const b = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'mcq_bank.json'), 'utf8'));
const BS = String.fromCharCode(92);
const texts = r => [r[1], ...r[2], r[4], r[5]];
const bad = b.q.filter(r => texts(r).some(t => t.includes(BS) || t.includes('$')));
console.log('questions:', b.q.length, ' with LaTeX left over:', bad.length);
bad.slice(0, 5).forEach(r => console.log('  ', r[1]));
const shown = b.q.filter(r => /[⁰-₟²³¹×√]/.test(texts(r).join(' '))).slice(0, 8);
shown.forEach(r => console.log(' ', r[1], '  ||  ', r[2].join(' ; ')));
process.exit(bad.length ? 1 : 0);
