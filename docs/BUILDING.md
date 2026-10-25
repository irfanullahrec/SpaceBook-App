# Building and testing the SpaceBook app

Needs JDK 17 and the Android SDK (platform 36, build-tools 36). `local.properties` (not committed) holds `sdk.dir`.

```
.\gradlew.bat :app:assembleDebug        # app\build\outputs\apk\debug\app-debug.apk
.\gradlew.bat :app:testDebugUnitTest    # unit tests (titles, feed, reward keys, network layer)
```

## Before the build: the books go INSIDE the APK (so reading works offline from the first start)

From a clean checkout of the website commit that is being released (`SpaceBook Web`, next to this folder), after `node tools/build/all.js`:

```
node tools/app/sync_app.js            # the shell, catalog, question bank (committed in this repo)
node tools/app/pack_books.js          # every book file into app/src/main/assets/books/ (about 420 MB, NOT committed: it is in .gitignore)
node tools/app/pack_books.js --check  # the app carries exactly the books of that website commit
```

Without `pack_books.js` the app still works: it downloads the books it needs from the website (read-through cache, "Books on this phone").
With it, every class opens with no internet and the books are the ones of that commit even if the website has not been deployed yet. The APK
is about 100 MB larger (the build deflates the books).

## Two quirks of this PC

1. **"Unable to establish loopback connection"** (JDK 17.0.18 on Windows cannot open a Selector when its Unix-domain-socket
   folder is under a path with a space). Point that folder somewhere short before running Gradle:

   ```
   mkdir C:\tmp
   set GRADLE_OPTS=-Djdk.net.unixdomain.tmpdir=C:/tmp
   set JAVA_TOOL_OPTIONS=-Djdk.net.unixdomain.tmpdir=C:/tmp
   ```

   `gradle.properties` already passes the flag to the Gradle and Kotlin daemons.
2. **Memory.** The PC has 8 GB and often under 1 GB free. `gradle.properties` keeps Gradle at 1.3 GB and runs the Kotlin
   compiler in-process. Close other heavy programs for the first build (dependency download + compile took about 9 minutes).

## Pointing the app at a server

* Live site: `https://wantuch.pk/spacebook/` is the default of every build, debug included (`BuildConfig.SITE_URL`). It has been deployed
  since 2026-10-23. Until 2026-10-24 a debug build pointed at `http://localhost:8790/` and needed `adb reverse tcp:8790 tcp:8790`; once the
  USB tunnel was gone, every page whose files were not on the phone yet came up empty and the rest was slow. A phone needs no cable now.
* Local PHP server on the PC (developers only): build with `gradlew assembleDebug -Pspacebook.siteUrl=http://localhost:8790/`, run
  `adb reverse tcp:8790 tcp:8790`, or instead start the PHP server (`.claude/launch.json` entry `spacebook-php`, port 8790) and in the app go to
  **Me, Settings, Server** and enter `http://10.0.2.2:8790/` (emulator) or `http://<PC address>:8790/` (phone on the same wifi;
  plain http is accepted only for 10.0.2.2, localhost and 127.0.0.1, so for a phone use a tunnel with https).

## Regenerating what the app bundles (never by hand)

Everything under `app/src/main/assets` that is not the app's own (`reader_bridge.js`, `reader_mobile.css`, `search_bridge.js`, `prep_summary.js`) is made
from the website by one command, run from a clean checkout of the commit being released (`SpaceBook Web/docs/RELEASE_AND_ROLLBACK.md` section 1):

```
cd "SpaceBook Web"
node --max-old-space-size=8192 tools/build/all.js           # the website's generated files (includes content/app_catalog.json)
node tools/app/sync_app.js --covers                         # shell (site/), catalog, offline question bank, test list, golden test files, covers,
                                                            # and the files of Create Test, Ask SpaceBook and Grammar Stats (site/content/testbank, assistant,
                                                            # grammar, and the Class 11 search files), so those three work offline from the first start
node tools/app/sync_app.js --check                          # exits 1 and lists what is stale
node --max-old-space-size=8192 tools/parity/data_parity.js  # every class, subject, chapter, file and the app's shell against the website
```

`sync_app.js` refuses to copy a shell file that differs from the last commit. The app also downloads the site's `content/app_catalog.json` on every
start, so the bundled copy is only the first-run fallback. The old `pack_mcq_bank.js` and `pack_prep_meta.js` of this repository were moved into the
website's `tools/app/lib` (the app's data is generated from the website, never typed here).

## Release

`assembleRelease` needs a signing key, which the owner must create (keep it outside the repository). R8 shrinking is on;
`proguard-rules.pro` keeps the API models and the JavaScript bridge.

## Pinning the release certificate (security/Integrity.kt)

After the owner has made the release key, build with the SHA-256 of its certificate so that a re-signed copy refuses to start:

```
.\gradlew.bat :app:assembleRelease -Pspacebook.certSha256=<64 hex characters, colons allowed>
```

Without the property the check is skipped. Debug builds never check.
