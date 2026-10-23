/* The app's call into the website's own search (js/core/search.js, loaded just before this file in the hidden page of data/search/BookSearch.kt).
 *   SBAppSearch(id, query, subjectIds)  searches the books named, then tells the app through SBSearchHost.done(id, json):
 *   [{id: subject, chapter: index in the subject's chapter list, title, hits, score}], best first, at most ten; [] on any problem.
 * The words, letter variants, ranking and index files are the website's; nothing is re-implemented here. tools/parity/app_pages.js runs this
 * file in Chrome against the real index and compares it with the website's own SBSearch. */
window.SBAppSearch = function (id, query, subjectIds) {
  return window.SBSearch.searchSubjects(String(query), subjectIds).then(function (r) {
    var ix = window.SBSearch._state.index;
    r.forEach(function (x) { var m = ix && ix.subjects[x.id]; x.title = m && m.c && m.c[x.chapter] ? m.c[x.chapter].t : ''; });
    return r;
  }).then(function (r) { window.SBSearchHost.done(id, JSON.stringify(r)); }, function () { window.SBSearchHost.done(id, '[]'); });
};
