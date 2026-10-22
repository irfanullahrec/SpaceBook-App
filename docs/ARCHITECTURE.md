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
  (`filesDir/site/<hash>/<path>`), (2) the **shell shipped inside the app** (`assets/site/`, 153 files, 5.2 MB: `lazy.html`, scripts,
  styles, KaTeX fonts; made by `tools/app/pack_shell.js`), (3) the website, whose answer is kept for next time (read-through cache).
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
* The catalog is bundled and cached. Notes, bookmarks, reading position and likes are in Room. Study events wait in the outbox and are
  sent by WorkManager when there is a network (nothing is dropped on a 5xx, 429 or 401).

## Code map (`app/src/main/java/pk/wantuch/spacebook`)

| Package | Contents |
|---|---|
| `data/offline` | `SiteStore` (the phone's copy of the website + WebView interceptor), `OfflineRepository` (what each book needs, what is on the phone), `DownloadWorker` (in `work/`) |
| `data/` | `Prefs` (DataStore), `Titles` (split "2 My Family and I میرا…"), `local/Database` (Room: outbox, reading position, bookmarks, notes, reactions), `remote/` (Retrofit `ApiService`, `Endpoint`, interceptors, models), `repo/Repositories` (catalog, auth, sync, entitlements) |
| `di/AppModule` | Hilt: Json, OkHttp, Retrofit, Room |
| `work/SyncWorker` | sends the outbox |
| `ui/home` | Home feed (`FeedBuilder` is pure and unit-tested) |
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

## Games tab

Every page has a Games tab. `PageGame` is the interface (`supports(page)`, `Play(page, onStep)`); `GameRegistry.games` is
empty for now. A game reports `onStep(step, total)`; the app sends it as a `step` reward event under a key of the shape the
server accepts (`GameKeys.rewardKey`, tested against the server's pattern), so coins come from the same rules as the web (+1
per new step, +5 for finishing, daily caps), decided on the server.

## Not done / not verified (honest list)

Verified on a real phone (realme C71, Android 16) on 2026-10-22: the Home feed, class switcher, Library with covers, "Books on this
phone", a book opening from the phone's own storage **with the PC server switched off**, the page-size fix. Verified only in a desktop
browser against the real website: the sentence and word gestures. Not yet seen on the phone: the meaning pop-up and the new footer.

See `PARITY_CHECKLIST.md`. In short: the app has been compiled and unit-tested on the PC, and the injected page script was
exercised against the real website in a desktop browser at phone size, but **it has not been run on an Android phone or
emulator** (none is attached to this PC and the SDK has no emulator image). Layout, touch, WebView behaviour and
performance on a low-end phone are therefore unchecked.
