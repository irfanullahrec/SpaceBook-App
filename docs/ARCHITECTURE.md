# SpaceBook Android app: architecture

Written 2026-10-22 with the first working build. Where this file and the code disagree, the code is right.

## The decision that shapes everything

The website has about 150 book data files (360 MB) in five different shapes, and a renderer in vanilla JavaScript that turns
them into 9,710 chapter tabs with fonts, boxes, diagrams, KaTeX maths, word and sentence meanings, step-by-step and animated
solutions, Class 1 worksheets and so on. Re-writing that renderer natively would produce a second copy that is never
exactly the same as the book the website shows, and would have to be kept in step with every fix to the books.

So the app is **hybrid**:

| Part | Made with | Why |
|---|---|---|
| The page you read (fonts, colours, highlights, exercises, diagrams, charts, maths, meanings, animations) | the website's own renderer inside a `WebView` | identical to the web by construction; every fix to a book reaches the app with no app update |
| Everything around the page (Home feed, Library, search, page turning, bookmarks, notes, read aloud, Games tab, sign-in, profile, settings, coins, sync, notifications) | Kotlin, Jetpack Compose, Material 3 | fast, touch-first, works with no network |

The web's two-page spread (`js/sb_book_spread.js`) already collapses to one column on a phone. The app shows **one page at a
time**: `assets/reader_bridge.js` splits the open tab into pages (the web's `.bk-page` printed pages when present, otherwise
one topic card per page) and the app turns them with swipe, buttons, or a page jump list.

## Data and the live database

The app never talks to MySQL and holds **no database host, user or password**. An APK can be unpacked in minutes, so a
credential inside it would expose the whole `tafseelk_spacebook` database. The app talks only to the website's PHP API over
HTTPS; the PHP code holds the database credentials in `api/config.php` on the server.

| App feature | Endpoint (all exist on the web already unless marked) |
|---|---|
| Sign in / register / sign out | `api/auth.php?action=login|register|logout|me` (`me` now also accepts the device token) |
| Coins, plans, test history, progress | `api/v2/sync.php` (push events, pull since a cursor), decided on the server |
| What the student may use (payment plans) | **new** `api/v2/entitlements.php`, today everything is unlocked |
| Classes, subjects, chapters | **new** `content/app_catalog.json`, built by `tools/build/make_app_catalog.js`; a copy is bundled in the APK as a first-run fallback |
| The pages themselves | `lazy.html` + `js/*` + `content/*` (the web app) |

Because the web and the app write to the same tables through the same endpoints, a coin earned in the app appears on the web
and the other way round.

### Sign-in

`login` is asked for a **device token** (`want_device`), a random 256-bit value the server stores only as a SHA-256, revocable
per device (sign out revokes it) and usable only for the student's own data. It is sent as `Authorization: Bearer`. This is
the server's existing design (`PHASE2_SYNC_DESIGN.md`); the app did not invent a second one. A short-lived access token with a
refresh token is a possible later step (it would be a server change); until then the token lives in the app's private
DataStore. The sign-in response also sets the session cookie, which the app copies into the WebView so the website inside the
app is signed in as well, and `SBApp.setAuth()` gives the page the device token so its own sync uses the same account.

### Guests

The app opens straight into the books. Nothing needs an account. Study steps made as a guest are kept in the on-phone outbox
(`OutboxEvent.userId = 0`); after the next sign-in the student is asked "Add your progress to your account?", never merged
silently (same rule as the website).

### Payment plans

`EntitlementsRepository` reads `api/v2/entitlements.php`, stores the answer, and `allows(feature)` is true unless the server
says `false`. No screen is gated yet; the hook exists so limits can be switched on from the server later with no app update.
Change `sb_entitlements()` in that PHP file to read a plan from the database and both the website and the app follow.

### Offline (`data/offline/`)

The app works with no internet once a book is on the phone. The website's pages are plain files (scripts, styles, fonts, book data,
pictures), so the app keeps its own copy and answers the WebView from it:

* **`SiteStore.intercept()`** answers every WebView request for the site: (1) files already on the phone
  (`filesDir/site/<hash>/<path>`), (2) the **shell shipped inside the app** (`assets/site/`, about 236 files, 72 MB: `lazy.html`, scripts,
  styles, KaTeX fonts; made by `tools/app/sync_app.js`) **and the books shipped inside the app** (`assets/books/`, about 350 files, 420 MB,
  about 100 MB inside the APK: every book data file, search file and chapter picture of `content/offline_map.json`; made by
  `tools/app/pack_books.js` on the machine that builds the APK and NOT committed to git), (3) the website, whose answer is kept for next
  time (read-through cache). So a fresh install reads every book with no internet at all.
* **The app's copy against the website.** `books/books-index.json` carries `builtAt` (when the books were packed). The entry page and the list
  files (`lazy.html`, `content/*.json`, no `?v=`) are asked of the website first, but only when the website's `lazy.html` has a `Last-Modified`
  NEWER than `builtAt` (`SiteStore.siteIsNewer()`, cached five minutes): a website that was deployed before the app was built (or cannot be
  reached) never takes the app back to older books, while a later deployment reaches the app by itself (new files are downloaded and kept).
  A list file kept from an older visit and older than `builtAt` is ignored in favour of the copy inside the app.
  `api/...` calls are never answered here: they go to the real server. The website's own service worker is refused (`sw.js` gets 404):
  the app is its own offline layer.
* Files are immutable per `?v=<hash>` (the site names them by content hash), so a copy is never stale. `lazy.html` and `content/*.json`
  are asked of the site first (3 s), and a new `lazy.html` is kept only when every script it names is on the phone, so the phone never
  holds a page whose files it lacks.
* **"Books on this phone"** (Me): `OfflineRepository` reads `content/offline_map.json` (every file each book needs, with size and
  SHA-256; refreshed from the site, the shipped copy is the fallback) and `DownloadWorker` downloads a class or everything, three files
  at a time, each checked against its hash, as a foreground "data sync" job with a progress notification. About 387 MB for all classes.
* A book that is not on the phone and cannot be fetched shows **"This book is not on this phone yet" with a Download button** instead
  of a blank page (`MissingBookPanel`), and opens by itself when the download finishes.
* Covers and class cards are bundled (`assets/covers/`, 4.3 MB, made by `tools/app/make_app_covers.py`).
* The catalog is bundled and cached. Study events wait in the outbox and are sent by WorkManager when there is a network (nothing is
  dropped on a 5xx, 429 or 401).

## Saved items: bookmarks, notes, highlights, reading position, my class (one account on every device)

They are the website's `user_items` kinds (`bm`, `note`, `pos`, `pref/class`; server rules in `SpaceBook Web/api/lib/items.php`, website client
`js/core/items.js` + `js/sb_library.js`). `LibraryRepository` keeps them in Room (`items`: userId, kind, key, value JSON, `at`, deleted, sent), local first,
and:

* **sends** unsent rows as `item.put` / `item.del` events through the outbox, only when signed in and only while the owner's sync switch is on;
* **merges** what a pull returns (`items`, `itemsDeleted`) with the website's rule: the later `at` wins, the server's copy at equal times, a delete is a
  tombstone, so an older copy arriving late cannot bring a deleted item back;
* keeps what was saved while nobody was signed in under userId 0: the next sign-in asks "Add your progress to your account?" (same dialog as for study
  steps), and Saved shows a banner for a student who was already signed in. `MIGRATION_1_2` carries the old bookmarks / notes / position tables over as such
  items (nothing is lost);
* writes a tab as the website does (`ItemCodec.cleanTab`: letters, digits, space, `_`, `-`, 30 characters), so a bookmark made in one platform opens the
  same page in the other. `tests/parity/locator_golden.json` and `events_contract.json` of the website (copied into `src/test/resources/parity/` by
  `tools/app/sync_app.js`) are checked by `EventContractTest`.

Marked words, game level bests, ticked SLOs and the like are kept by the website's page inside the WebView, which sends them with the same events.

## The owner's sync switch

`flags.syncV2` (server: `api/lib/flags.php`, published in `entitlements` and `me`) is stored as `AppState.syncOn`. The app passes it to the page
(`SBApp.setAuth(user, device, flags)`; the page no longer forces sync on) and uses it for the saved items. Off: nothing is sent, no request is made.
The app's own coin steps always go through `api/v2/sync.php` (it has no older endpoint), which the server accepts alongside the website's older one.

## Search, account, reminders, Games

* **Search in the books**: `BookSearch` runs the website's `js/core/search.js` (bundled in the shell) in a hidden WebView through `SiteStore`, so the index
  files of a book on the phone are searched with no internet; `assets/search_bridge.js` is the one-line call. The search screen shows chapter-title hits
  first, then "In the books"; "Search all classes" widens the scope.
* **My account**: the website's own dialog (details, password, download my data, delete my account) opens inside the page (`SBApp.openAccount`); the data
  file goes to the share sheet (`SBDownload` in the bridge, `FileProvider` cache path), a deletion signs the app out.
* **Study reminders**: a WebView has no Notification API. `ReminderReader` loads the start page in a hidden WebView (`SB_BACKGROUND_READ` set, API refused),
  calls `SBStudyPlan.reminders(7)` (the website's own words), and `ReminderScheduler` schedules each as a WorkManager job that posts a notification; a
  daily job refreshes them; the switch is in Settings (asks for the notification permission on Android 13+).
* **Games**: the Games button of the reader footer opens the website's page arcade (`js/sb_arcade*.js`, fifteen games made from the page on screen, same coins, see "Games tab" below); the website's level-by-level games open from Practice.

## Code map (`app/src/main/java/pk/wantuch/spacebook`)

| Package | Contents |
|---|---|
| `data/offline` | `SiteStore` (the phone's copy of the website + WebView interceptor), `OfflineRepository` (what each book needs, what is on the phone), `DownloadWorker` (in `work/`) |
| `data/` | `Prefs` (DataStore), `Titles` (split "2 My Family and I میرا…"), `local/Database` (Room v2: outbox, **items**, reactions; `MIGRATION_1_2`), `local/LibraryItems` (Bookmark, Note, ReadingPosition and their keys, `ItemCodec`), `remote/` (Retrofit `ApiService`, `Endpoint`, interceptors, models), `repo/Repositories` (catalog, auth, sync, entitlements), `repo/LibraryRepository` (the saved items, below), `search/BookSearch` (words inside the books), `reminders/` (study-plan reminders) |
| `di/AppModule` | Hilt: Json, OkHttp, Retrofit, Room |
| `work/SyncWorker` | sends the outbox |
| `ui/home` | Home: My Stats / Project Stats / My Account tabs (see "Home" below). `FeedBuilder` (the old feed) is still there and unit-tested but no longer shown |
| `data/prep` | `PrepReader` (reads the student's tests, plans, words and usage from the website's storage), `PrepModels`, `ProjectWords` |
| `ui/library` | classes, subject tiles, chapter list, offline search |
| `ui/reader` | `ReaderScreen` (footer with page arrows in its corners, bookmark, notes, read aloud, Games tab), `MeaningSheet` (the sentence / word pop-up), `Speaker` (the phone's voices) |
| `ui/offline` | `OfflineScreen` ("Books on this phone"), `MissingBookPanel` |
| `ui/web` | `SbWebView` / `WebController` (the only code that talks to `window.SBApp`), `FeatureScreen` (Tests Preps, Papers, Study Plan) |
| `ui/games` | `PageGame` interface, `GameRegistry`, `GameKeys`, Games tab |
| `ui/auth`, `ui/me`, `ui/practice`, `ui/AppNav` | the remaining screens and routes |
| `assets/` | `reader_bridge.js`, `reader_mobile.css`, `app_catalog.json` |

### Meanings: tap a sentence, hold a word

`reader_bridge.js` listens on `window` in the capture phase, so it runs before every handler the website registered; the page is never
re-rendered and never jumps. **Tap a sentence** (anywhere on a book page) and **hold a word** (about half a second, with a vibration)
send a message to the app, which shows a bottom sheet over the page. The meanings are the book's own where the page holds them (the
sentence's hidden translation lines, `data-ur` / `data-ps` of a word), and the rest come from the website's offline lexicon
(`SBTranslate.translate`, no internet) and arrive a moment later. Every line has a speaker button that reads it with the phone's own
voice (English, Urdu and Arabic voices depend on the phone; if there is none the sheet says so). Text selection and the system menu are
switched off on book pages so a long press does not select. Class names differ per book family (`m5-s`, `m6-s`, `c1-s` ...), so the
script matches by suffix.

### The bridge (`assets/reader_bridge.js`)

The only file that knows the website's DOM. Kotlin calls `SBApp.open(classId, subjectId, call, page)` (the same way the
website's own search opens a chapter: `openSubject()` then the chapter's own button), `SBApp.go/next/prev`, `SBApp.openPage`,
`SBApp.setAuth`, `SBApp.pageText`. The page calls back through `SBHost` (`onReady`, `onState`, `onAction`). If the website
changes its markup, only this file and `reader_mobile.css` need updating, and the web can ship them without an app update
if they are later served from the site (not done: they are bundled).

## Home: My Stats, Project Stats, My Account

Home shows only what the student has started, in three tabs named as on the website.

- **My Stats**: every test preparation (PST, CT, SST ... as many as were started) and every study plan, each with *Practice* and
  *Statistics* buttons that open that test (on its Practice or Stats tab) or that plan; a *Delete plan* button on each plan; the
  recent practice; and *My Vocabulary* (words marked learnt / already known while studying a subject).
- **Project Stats**: distinct words in all the books, per language and per class. Read from `site/js/word_stats_summary.js`, which
  the app already carries inside its offline copy of the website, so nothing is packed twice.
- **My Account**: who is signed in, the server's plan (`entitlements.plan`), the preview expiry date (from `ExpiryGate`; only the
  days left, never the unlock code), Free / Premium plans (Premium shows "Price to be announced": no price is invented), and usage.

Where the numbers come from: the website keeps tests (`sbTP:v1:<user>`), plans (`sb_study_plans_v1`) and word marks
(`sbWS:progress:<user>`) in the browser's own storage, which only a page of the website's address can open. `PrepReader` loads an
empty page of that address in a WebView nobody sees, runs `assets/prep_summary.js` in it (read-only) and gets one JSON summary
(`tools/test_prep_summary.js` tests the script on the PC; `--sample` writes the file `PrepModelsTest` decodes). Home refreshes on
every return to it and on pull-to-refresh. A student who has an account sees the record of that account, otherwise the guest
record, never somebody else's.

**Learnt and checked** (2026-10-25): in a Study Plan a task is ticked done only after the student passes a check of questions from the
book (`site/js/sb_mastery.js`, the questions are `site/content/testbank`; mistakes come back until every answer is right), and the task
keeps a record (`learn` on the task in `sb_study_plans_v1`). The plan screen is the website's own page, so the check is the same code on
both platforms. Home counts them for each plan: `prep_summary.js` gives `tasks`, `checked` (passed the check) and `selfMarked` (ticked
by hand, where the book holds no question for the task), `PlanDto` reads them and `checkedLine()` prints "🧠 3 of 12 tasks learnt and checked".

**Deleting a plan** asks first (a native dialog), then opens the Study Plan screen with `study-plan-delete:<id>`; the bridge's
`SBApp.deletePlan` calls the website's own `SBStudyPlan.removePlan`, so a signed-in student's deletion also reaches the account and
the plan does not come back with the next sync, then reports `done` and the screen closes. Not seen yet with a real signed-in
account on a phone: the 1.5 s waits around the call (for the sign-in to reach the page and for the sync outbox) are a precaution.

## Games tab (changed 2026-10-24)

Every page has a Games button in the reader footer. It runs `SBApp.openGames()` (`assets/reader_bridge.js`), which opens the website's own **page
arcade** (`js/sb_arcade.js` and the four `sb_arcade_*.js` game files) over the page on screen: fifteen arcade games (snake, lane runner, fruit slicing,
penalty shoot-out ...) made from that page's text, not multiple choice; a page with nothing to make questions from says "There are no games on this
page". The overlay lives inside the WebView, so the footer stays; the system Back button goes game -> hub -> closed (`SBApp.gamesBack()`), and the
overlay tells the app when it closes itself (`SBHost.onAction("gamesClosed")`). Coins are the page's own `SBRewards.step` with the keys
`cls<N>|g-pg-<game>-<subject>|u<chapter>|count|<hash>|<steps>`, decided by the server like every other game.

The old native per-page quests (`ui/games/PageGames.kt`: `PageGame`, `GameRegistry`, `GameKeys`, `GamesPanel`) are no longer shown; they are kept, with their
key-shape tests, until the owner deletes them (parity row `games.pagequests`, retired).

## Not done / not verified (honest list)

Verified on a real phone (realme C71, Android 16) on 2026-10-22: the Home feed, class switcher, Library with covers, "Books on this
phone", a book opening from the phone's own storage **with the PC server switched off**, the page-size fix. Verified only in a desktop
browser against the real website: the sentence and word gestures. Not yet seen on the phone: the meaning pop-up and the new footer.

See `PARITY_CHECKLIST.md`. In short: the app has been compiled and unit-tested on the PC, and the injected page script was
exercised against the real website in a desktop browser at phone size, but **it has not been run on an Android phone or
emulator** (none is attached to this PC and the SDK has no emulator image). Layout, touch, WebView behaviour and
performance on a low-end phone are therefore unchecked.

## The page first: the reader layout (2026-10-24)

When a page is open nothing else is on the screen: no chapter title, no page title, no board strip, no hint line, no floating buttons. From the top:
the status bar, the tab strip (Lessons, Exercises ...; 36 dp, sticky), the page's own Board SLOs / Exercise / Games bar, and the page edge to edge.
It is layout only and App only (`assets/reader_mobile.css`, `reader_bridge.js`; parity row `read.fullbleed`):

* the bridge now treats **every topic / page card of a tab** as a page, however deep the tab nests them, so Classes 9-12 open one topic at a time like Classes 1-8,
  and opens the closed topic headings inside the page; it marks the website's chrome (hint lines, the "Textbook Lesson & Translations" heading) so the CSS can hide it;
* `ReaderScreen` has no top bar: back, bookmark, read aloud, go to page and the chapter's name are in the footer's menu; the footer is 48 dp (previous page, page number,
  Read / Games / Notes as icons, menu, next page);
* a Class 11 Physics lesson used to rewrite its card titles forever (`js/sb_medium.js` split a text node on every pass, every change ran it again); it now decides on a copy first.

Pictures to compare: `SpaceBook Web/tests/app/gallery.js` (12 book families at phone width), `tests/app/phone.js` (the site with this CSS and bridge in a phone-sized Chrome).

## Papers, Plan, Practice (2026-10-24)

* **Papers** is the website's paper maker again: its own strip (class, subject, paper mode, columns, option style, marks, categories, Info, Blueprint, Print) is shown
  at the top; the wizard and the live paper scroll with the page. `window.print()` does nothing in a WebView, so the bridge turns it into
  `SBHost.onAction("print")` and `SbWebView.printPage()` opens the phone's print dialog (which also saves a PDF) on the page's own print layout.
* **Study Plan** and **Tests Preps** have a phone theme (cards, a header, two columns) in `reader_mobile.css`; the website is unchanged.
* **Practice** is a hero card (Tests Preps) and a grid of tiles (Papers, Games, Study Plan), all on one screen (`ui/practice/PracticeScreen.kt`).
* The pages opened from Practice have no title bar of their own on a main tab, and only a 40 dp line with Back when pushed (`FeatureScreen`).

## Loading screens (2026-10-24)

`ui/components/Loading.kt`: `LoadingPanel` (a bar and a percent). A WebView screen (book, Papers, Plan ...) shows the **real** page progress for the first 60 % (`WebChromeClient.onProgressChanged`),
then an estimate that slows down near the end and stops at 98 until the page is really open (`LoadProgress`, tested); Home uses a timed percent while it reads the student's record; every download
screen shows its percent. The website has the same idea in `js/sb_loading.js` (the bar is a CSS transform, so it keeps moving while the page is busy).

## The copy on the phone is encrypted (2026-10-24)

`data/offline/Vault.kt`: everything `SiteStore` writes (the books, pictures, the page) is AES-256-GCM encrypted in 64 KiB chunks with a key per file; the data key is
random, made on first start and kept only wrapped by a non-exportable Android Keystore key. Plain copies from an older version are served and then encrypted in the background
(`SpaceBookApp`). The device token in the DataStore is sealed with the same key. `security/Integrity.kt` and `FLAG_SECURE` (release builds). What this does and does not do:
`SpaceBook Web/docs/PHASE8_SECURITY.md` (2026-10-24 section): it protects the copy on the phone, not the public files of the website.
