/* Local LaTeX support for the existing interactive lesson reader. */
(function (root) {
  'use strict';
  const mathPattern = /(\\+)\(([\s\S]*?)\1\)|(\\+)\[([\s\S]*?)\3\]|\$\$([\s\S]*?)\$\$|(?<!\\)\$([^$\n]+)\$/g;
  const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

  function mathParts(value) {
    const text = String(value || '');
    const parts = [];
    let position = 0;
    for (const match of text.matchAll(mathPattern)) {
      if (match.index > position) parts.push({text:text.slice(position,match.index)});
      const slashes = match[1] || match[3] || '\\';
      let latex = match[2] ?? match[4] ?? match[5] ?? match[6];
      // Some legacy data escaped backslashes twice before saving the string.
      if (slashes.length > 1) latex = latex.replace(/\\+/g, run => '\\'.repeat(Math.max(1,Math.floor(run.length / slashes.length))));
      parts.push({latex, original:match[0], display:match[4] !== undefined || match[5] !== undefined});
      position = match.index + match[0].length;
    }
    if (position < text.length) parts.push({text:text.slice(position)});
    return parts;
  }

  function renderMath(part) {
    if (!root.katex) return escape(part.latex);
    return root.katex.renderToString(part.latex, {displayMode:part.display, throwOnError:false, trust:false, strict:'ignore', output:'htmlAndMathml'});
  }

  root.SpaceBookLessonMath = {mathParts, renderMath};
  if (typeof root.renderInteractiveParagraphHtml !== 'function') return;
  const originalReader = root.renderInteractiveParagraphHtml;
  root.renderInteractiveParagraphHtml = function (text, urdu, pashto, index, preserveAlignedParagraph) {
    const classId = typeof state !== 'undefined' ? state.selectedClass : '';
    if (classId !== 'cls9' && classId !== 'cls10') return originalReader(text,urdu,pashto,index,preserveAlignedParagraph);
    const parts = mathParts(text);
    const equations = parts.filter(part => part.latex !== undefined);
    if (!equations.length) return originalReader(text,urdu,pashto,index,preserveAlignedParagraph);
    let equationIndex = 0;
    const protectedText = parts.map(part => part.latex === undefined ? part.text : `SPACEBOOKMATH${equationIndex++}TOKEN`).join('');
    let html = originalReader(protectedText,urdu,pashto,index,true);
    html = html.replace(/<span\b[^>]*data-word="SPACEBOOKMATH(\d+)TOKEN"[^>]*>([^<]*)<\/span>/g, (_,number,content) => content.replace(`SPACEBOOKMATH${number}TOKEN`,renderMath(equations[Number(number)])));
    // Source notation remains in hidden speech/translation attributes only.
    return html.replace(/SPACEBOOKMATH(\d+)TOKEN/g, (_,number) => escape(equations[Number(number)].original));
  };
})(typeof window !== 'undefined' ? window : globalThis);
