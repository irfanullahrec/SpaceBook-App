# Building and testing the SpaceBook app

Needs JDK 17 and the Android SDK (platform 36, build-tools 36). `local.properties` (not committed) holds `sdk.dir`.

```
.\gradlew.bat :app:assembleDebug        # app\build\outputs\apk\debug\app-debug.apk
.\gradlew.bat :app:testDebugUnitTest    # unit tests (titles, feed, reward keys, network layer)
```

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

* Production: `https://wantuch.pk/spacebook/` (the default, `BuildConfig.SITE_URL`). **It is not deployed yet** (the site returned
  404 on 2026-10-22), so the app needs the website put on that address first.
* Local: start the PHP server (`.claude/launch.json` entry `spacebook-php`, port 8790) and in the app go to
  **Me, Settings, Server** and enter `http://10.0.2.2:8790/` (emulator) or `http://<PC address>:8790/` (phone on the same wifi;
  plain http is accepted only for 10.0.2.2, localhost and 127.0.0.1, so for a phone use a tunnel with https).

## Regenerating the catalog the app bundles

```
cd "SpaceBook Web"
node --max-old-space-size=8192 tools/build/all.js          # as usual, after book data changes
node tools/build/make_app_catalog.js                        # writes content/app_catalog.json
copy content\app_catalog.json "..\SpaceBook App\app\src\main\assets\app_catalog.json"
```

The app also downloads the site's `content/app_catalog.json` on every start, so the bundled copy is only the first-run fallback.

## Release

`assembleRelease` needs a signing key, which the owner must create (keep it outside the repository). R8 shrinking is on;
`proguard-rules.pro` keeps the API models and the JavaScript bridge.
