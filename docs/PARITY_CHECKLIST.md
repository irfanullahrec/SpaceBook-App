# Feature parity: website to app

> **2026-10-23: this list is superseded** by the website's `docs/PARITY_MATRIX.md` (generated from `docs/parity.json`, checked by
> `node tools/parity/check.js`, `data_parity.js` and the end-to-end test `tests/sync/parity_e2e.js`). The table below is kept as history; where it
> disagrees with the matrix, the matrix is right. Changed since it was written: bookmarks, notes, highlights, the reading position and "my class" are
> items of the account (server table `user_items`) shared with the website; search inside the books, the Games arcade, account actions (My account),
> study reminders and the owner's one sync switch were added; Home became My Stats / Project Stats / My Account.

Status words: **web** = done by the website's own renderer inside the app's WebView (so it behaves as on the web);
**native** = built in Kotlin; **partial**; **not yet**. "Checked" says how it was verified; nothing here has been run on an
Android device (none available), so "web" items are verified only where stated.

Source of the list: `SpaceBook Web/docs/ARCHITECTURE.md`, `js/` file names and the owner's brief of 2026-10-22.

## Access, accounts, plans

| # | Feature | Status | Checked |
|---|---|---|---|
| 1 | Opens with no login, everything readable | native | compiled; not run on a device |
| 2 | Register / login / logout with the website's accounts | native | `NetworkTest` (request shape, errors, token) against a mock server; not against the live server |
| 3 | Profile (name, type, number), class selection | native | compiled |
| 4 | Forgot password | not yet (the server has no reset channel: owner decision 9 in `HANDOVER.md`); screen tells the student what to do | n/a |
| 5 | Guest progress asked about on sign-in | native | compiled |
| 6 | Payment plans from one server source (`entitlements.php`) | native hook + server file, nothing gated | PHP syntax checked; not exercised |
| 7 | Account works the same on web and app (same tables) | by design | not tested end to end |

## Reading

| # | Feature | Status | Checked |
|---|---|---|---|
| 8 | Single-page view (swipe, buttons, page list) | native + injected script | script exercised on the real website (Class 5 Maths) at phone size: 9 pages, next/go/tab change |
| 9 | Page looks like the book (fonts, colours, highlights, boxes, exercises) | web | by construction; not seen on a phone |
| 10 | Diagrams, charts, graphs, shapes, tables | web | same |
| 11 | Maths (KaTeX), questions and answers | web | same |
| 12 | Word meaning | **native pop-up on a long press**, book glossary + offline lexicon, speaker | gesture checked in a browser against the real site; pop-up not yet seen on the phone |
| 13 | Sentence meaning, EN / UR / PS (and AR) lines | **native pop-up on a tap anywhere on the page**, speaker per line | same |
| 14 | Language / medium labels, no language drop-downs | web | same |
| 15 | Interactive MCQs | web | same |
| 16 | Step-by-step, vertical board-style, animated solutions | web | same |
| 17 | Class 1 / 2 interactive worksheets | web | same |
| 18 | Topic practice panels, Board SLO tabs | web | same |
| 19 | Chapter structure Lessons, Summary, Exercise, practice | web (tabs stay inside the page) | script reads the tab row |
| 20 | Continue where you left off | native | compiled |
| 21 | Bookmarks, notes | native (on the phone only) | compiled |
| 22 | Read page aloud | native (device voices) | compiled |
| 23 | Text size, dark mode for the app | native; books stay on white paper | compiled |
| 24 | Search chapter titles, offline | native | unit-tested pure parts only |
| 24b | Books work with no internet: shell in the app, books downloaded per class, read-through cache | native (`SiteStore`, `OfflineRepository`) | 15 unit tests; on the phone a book opened with the PC server off |
| 24c | Book covers and class cards as on the website | native (bundled thumbnails) | seen on the phone |
| 24d | Class switcher on Home, class strip in Library | native | seen on the phone |
| 25 | Search inside the books (words) | not yet (the web has `js/core/search.js`; not exposed) | n/a |
| 26 | RTL Urdu / Pashto / Arabic | web | not seen on a phone; fonts depend on the phone |
| 27 | Open book spread | by design single page on a phone (the web does the same under 900 px) | n/a |

## Study tools

| # | Feature | Status | Checked |
|---|---|---|---|
| 28 | Tests Preps (MCQ bank) | web page in the app | not checked |
| 29 | Papers (Set A / B / C) | web page in the app | not checked |
| 30 | BISE Swat board centre | web (strip inside subjects) | not checked |
| 31 | Study Plan (+ reminders) | web page in the app; reminders as web notifications are **not** available in a WebView | not checked; native reminders not yet |
| 32 | Reward coins / progress | server-decided, shared; native coin chip | `NetworkTest` for the request shape |
| 33 | Word Stats / My Stats | not yet (reachable only through the web page) | n/a |

## Look and feel

| # | Feature | Status |
|---|---|---|
| 34 | Home feed of post cards (header, banner, chips, actions), stories row, "What do you want to study today?" bar | native |
| 35 | Study surfaces (chapter, practice, plan, games) shown as the same post card | native for Home/Practice; the page itself is the web's |
| 36 | Big touch targets, icon-first navigation, colours per subject | native |
| 37 | Mascot / illustrations, voice help for the youngest | not yet |
| 38 | TalkBack labels on icon buttons | partial |

## Games

| # | Feature | Status |
|---|---|---|
| 39 | Games tab on every page | native tab; "coming soon" panel |
| 40 | `PageGame` interface, registry, coin path through the server | native; no game yet |

## Server additions made for the app (in `SpaceBook Web`)

* `api/v2/entitlements.php` (new), `api/auth.php` `me` accepts the device token, `tools/build/make_app_catalog.js` and
  `content/app_catalog.json` (new). None of them is deployed.
