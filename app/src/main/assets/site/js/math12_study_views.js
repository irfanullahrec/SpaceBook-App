// Class 12 Mathematics practice views reuse the authored, source-referenced
// exercises. This adapter adds presentation metadata; it creates no answers.
(function () {
    'use strict';

    const classificationPolicy = 'Printed review questions with four readable choices and one unqualified answer become MCQs. Ambiguous review items remain answered written questions. A single conceptual question with at most two solution steps becomes short practice; multipart, computational, proof and graph work remains long practice.';

    // Exercise numbering is independent of section numbering. These links follow
    // the actual source topics and exercise titles, never an array-index guess.
    const topicExerciseIds = {
        'sec-2-1': ['ex-2-1'], 'sec-2-2': ['ex-2-1'], 'sec-2-3': ['ex-2-1'],
        'sec-2-4': ['ex-2-2'], 'sec-2-5': ['ex-2-2'],
        'sec-2-6': ['ex-2-3'], 'sec-2-7': ['ex-2-3'], 'sec-2-8': ['ex-2-4'],
        'sec-3-1': ['ex-3-1'], 'sec-3-2': ['ex-3-2'], 'sec-3-3': ['ex-3-2'],
        'sec-3-4': ['ex-3-3'], 'sec-3-5': ['ex-3-4'],
        'sec-3-6': ['ex-3-5'], 'sec-3-7': ['ex-3-5'], 'sec-3-8': ['ex-3-5'],
        'sec-4-1': ['ex-4-4'], 'sec-4-2': ['ex-4-taylor-challenge'],
        'sec-4-3': ['ex-4-1'], 'sec-4-4': ['ex-4-2'],
        'sec-5-1': ['ex-5-3'], 'sec-5-2': ['ex-5-3'],
        'sec-5-3': ['ex-5-1'], 'sec-5-4': ['ex-5-1'],
        'sec-6-1': ['ex-6-5'], 'sec-6-2': ['ex-6-5'],
        'sec-6-3': ['ex-6-3','ex-6-recovered-substitution-challenges'], 'sec-6-4': ['ex-6-3'], 'sec-6-5': ['ex-6-4'],
        'sec-6-6': ['ex-6-1', 'ex-6-integral-property-challenges'],
        'sec-7-1': ['ex-7-1', 'ex-7-midpoint-project'],
        'sec-7-2': ['ex-7-2'], 'sec-7-3': ['ex-7-2'], 'sec-7-4': ['ex-7-2'],
        'sec-7-5': ['ex-7-5'], 'sec-7-6': ['ex-7-5'],
        'sec-7-7': ['ex-7-6'], 'sec-7-8': ['ex-7-6'], 'sec-7-9': ['ex-7-6'],
        'sec-8-2': ['ex-8-1'], 'sec-8-3': ['ex-8-2'], 'sec-8-4': ['ex-8-3'],
        'sec-9-1': ['ex-9-1'], 'sec-9-2': ['ex-9-2'],
        'sec-9-3': ['ex-9-3'], 'sec-9-4': ['ex-9-4'],
        'sec-10-1': ['ex-10-1'], 'sec-10-2': ['ex-10-1'],
        'sec-10-3': ['ex-10-2'], 'sec-10-4': ['ex-10-2'],
        'sec-11-1': ['ex-11-1'], 'sec-11-2': ['ex-11-2'],
        'sec-12-1': ['ex-12-3'], 'sec-12-2': ['ex-12-4']
    };

    const asText = value => typeof value === 'string' ? value.trim() : '';
    const liveExercises = chapter => (chapter?.exercises || []).filter(exercise => Array.isArray(exercise.problems) && exercise.problems.length > 0);

    function sectionId(chapter, section) {
        const raw = typeof section === 'string' ? section : section?.id;
        const sections = chapter?.sections || [];
        const exact = sections.find(candidate => candidate.id === raw);
        if (exact) return exact.id;
        const title = typeof section === 'string' ? section : section?.title;
        const number = String(title || '').match(/^(\d+)\.(\d+)(?:\s|$)/);
        if (!number || Number(number[1]) !== Number(chapter?.number)) return null;
        const candidate = `sec-${number[1]}-${number[2]}`;
        return sections.some(item => item.id === candidate) ? candidate : null;
    }

    function getMath12TopicExercises(chapter, section) {
        const exercises = liveExercises(chapter);
        if (!section) return exercises;
        const ids = topicExerciseIds[sectionId(chapter, section)] || [];
        // Keep the requested source order and the original exercise objects.
        return ids.map(id => exercises.find(exercise => exercise.id === id)).filter(Boolean);
    }

    function parsedChoices(problem) {
        const question = asText(problem.question || problem.q);
        if (Array.isArray(problem.options) && problem.options.length === 4 && problem.options.every(option => asText(option))) {
            return { question, options: problem.options.slice() };
        }
        const listed = (problem.sourceQuestionBlocks || []).filter(block => block.type === 'list').flatMap(block => block.items || []);
        if (listed.length === 4 && listed.every((item, index) => new RegExp(`^\\(${String.fromCharCode(97 + index)}\\)\\s*`).test(asText(item)))) {
            return { question, options: listed.map(item => item.replace(/^\([a-d]\)\s*/, '').trim()) };
        }
        const labels = Array.from(question.matchAll(/\(([a-d])\)\s*/g));
        if (labels.length !== 4 || labels.map(match => match[1]).join('') !== 'abcd') return null;
        const options = labels.map((label, index) => question.slice(label.index + label[0].length, labels[index + 1]?.index ?? question.length).trim().replace(/;\s*$/, ''));
        if (options.some(option => !option)) return null;
        return { question: question.slice(0, labels[0].index).trim(), options };
    }

    function uniqueAnswer(problem, choices) {
        const answer = asText(problem.answer);
        // These records already explain source defects, equivalent alternatives,
        // conditional readings or approximation choices. Do not flatten them
        // into a quiz that incorrectly rejects another defensible response.
        if (/\b(?:no|not|both|also|and|intended|correcting|closest|assuming|interpreting|if|when|for)\b/i.test(answer)) return null;
        if (!choices) return null;
        const normalize = value => value.toLowerCase().replace(/\s+/g, '').replace(/\\[()[\]]/g, '').replace(/[.;]$/, '');
        if (new Set(choices.options.map(normalize)).size !== 4) return null;
        if (Number.isInteger(problem.correct) && problem.correct >= 0 && problem.correct < choices.options.length) return problem.correct;
        const match = answer.match(/^(?:Option\s*)?\(?([a-d])\)?(?=[\s.,—–-]|$)/i);
        return match ? match[1].toLowerCase().charCodeAt(0) - 97 : null;
    }

    function isConceptualShort(problem) {
        const question = asText(problem.question || problem.q);
        const singleConcept = /^(?:what|which|define|state|name|identify|explain|classify|are|is|does|describe|recognize)\b/i.test(question);
        return singleConcept && !/\([a-z]\)|\b(?:prove|show|derive|sketch|plot|draw)\b/i.test(question) && (problem.steps || []).length <= 2;
    }

    function itemFromProblem(chapter, exercise, problem, exerciseIndex, problemIndex) {
        const explanation = asText(problem.solution) || (problem.steps || []).map(step => typeof step === 'string' ? step : step?.text || '').filter(Boolean).join('\n') || asText(problem.answer);
        const base = {
            id: problem.id || `${exercise.id}-question-${problemIndex + 1}`,
            q: problem.question || problem.q || '',
            sol: explanation,
            answer: problem.answer || '',
            steps: problem.steps || [],
            sourceProblem: problem,
            sourceExercise: exercise,
            sourceReferences: problem.sourceReferences || [],
            sourceQuestionBlocks: problem.sourceQuestionBlocks || [],
            solutionBlocks: problem.solutionBlocks || [],
            diagram: problem.diagram,
            solutionDiagram: problem.solutionDiagram,
            sourceStatus: problem.sourceStatus,
            solutionStatus: problem.solutionStatus,
            sourceClarification: problem.sourceClarification,
            answerKeyReference: problem.answerKeyReference,
            origin: problem.solutionOrigin || 'Existing Class 12 Mathematics exercise',
            exerciseId: exercise.id,
            exerciseLabel: exercise.title || exercise.exercise,
            exerciseOrder: exerciseIndex + 1,
            questionNumber: problem.qNo || String(problemIndex + 1),
            chapterNumber: chapter.number,
            partial: /partial|pending|unverified|uncertified|under_specified/i.test([problem.solutionStatus, problem.sourceStatus].filter(Boolean).join(' '))
        };
        const isReview = /^Review Exercise\b/.test(exercise.title || exercise.exercise || '');
        const choices = isReview ? parsedChoices(problem) : null;
        const correct = isReview ? uniqueAnswer(problem, choices) : null;
        if (choices && correct !== null) {
            return { category: 'mcqs', item: { ...base, q: choices.question, options: choices.options, correct, exp: explanation, format: 'source-review-mcq' } };
        }
        const category = isReview || isConceptualShort(problem) ? 'shortQuestions' : 'longQuestions';
        return { category, item: { ...base, format: isReview ? 'source-review-written' : 'source-exercise-written', classificationReason: isReview ? 'Printed choices need a qualified written answer or cannot be parsed without loss.' : category === 'shortQuestions' ? 'Single conceptual prompt with at most two existing solution steps.' : 'Multipart, computational, proof, graph or extended solution.' } };
    }

    function makeBank(chapter, exercises, scope, includeExistingSlo) {
        const bank = { mcqs: [], shortQuestions: [], longQuestions: [], scope, exerciseIds: exercises.map(exercise => exercise.id), classificationPolicy };
        if (includeExistingSlo) {
            for (const category of ['mcqs', 'shortQuestions', 'longQuestions']) {
                bank[category] = (chapter.slos?.[category] || []).map((item, index) => ({
                    ...item,
                    id: item.id || `math12-unit-${chapter.number}-existing-${category}-${index + 1}`,
                    sourceProblem: item,
                    origin: item.origin || 'Existing chapter study questions',
                    format: 'existing-study-question',
                    chapterNumber: chapter.number
                }));
            }
        }
        const allExercises = liveExercises(chapter);
        for (const exercise of exercises) {
            for (const [index, problem] of exercise.problems.entries()) {
                const result = itemFromProblem(chapter, exercise, problem, allExercises.indexOf(exercise), index);
                bank[result.category].push(result.item);
            }
        }
        bank.totalQuestions = bank.mcqs.length + bank.shortQuestions.length + bank.longQuestions.length;
        bank.partialQuestions = [...bank.mcqs, ...bank.shortQuestions, ...bank.longQuestions].filter(item => item.partial).length;
        return bank;
    }

    function getMath12StudyBank(chapter, section = null) {
        if (!chapter) return { mcqs: [], shortQuestions: [], longQuestions: [], scope: 'chapter', totalQuestions: 0, partialQuestions: 0 };
        if (!chapter.studyBank) chapter.studyBank = makeBank(chapter, liveExercises(chapter), 'chapter', true);
        if (!section) return chapter.studyBank;
        const exercises = getMath12TopicExercises(chapter, section);
        if (!exercises.length) return chapter.studyBank;
        return { ...makeBank(chapter, exercises, 'topic', false), sectionId: sectionId(chapter, section) };
    }

    // Classic scripts are used by SpaceBook. Export through the browser global
    // as well as globalThis so focused VM checks can exercise the same adapter.
    globalThis.getMath12StudyBank = getMath12StudyBank;
    globalThis.getMath12TopicExercises = getMath12TopicExercises;
    // Every chapter's bank is built once the book is in. js/math12_study_bank_warm.js calls this right after this script on the
    // normal page, and right after the book has loaded on the lazy page (tools/build/lazy_overlays.json): touching MATH_12_DATA
    // here would load the 6 MB book at start-up.
    globalThis.warmMath12StudyBanks = function () {
        if (typeof MATH_12_DATA !== 'undefined' && Array.isArray(MATH_12_DATA)) {
            MATH_12_DATA.forEach(chapter => {
                chapter.studyBank = makeBank(chapter, liveExercises(chapter), 'chapter', true);
            });
        }
    };
})();
