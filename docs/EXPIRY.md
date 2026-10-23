# The offline expiry lock (preview builds)

A **release** build of the app stops working a fixed number of days after it was built (default **30**), on every phone, with no
internet needed. It then shows only an "unlock" screen. Someone who knows the **unlock code** can open it again, and the
phone remembers that.

## How it works

* `app/build.gradle.kts` writes `BuildConfig.EXPIRES_AT_MILLIS` = build time + `spacebook.expireDays` days (release builds).
  Debug builds never expire (`spacebook.debugExpireDays=N` makes a debug build expire too, to try the lock on a phone).
* `expiry/ExpiryGate.kt` decides, on every start and every return to the app (`MainActivity.onResume`): open, counting down, or
  locked. WorkManager jobs (sync, book downloads) also do nothing while locked.
* **The clock cannot be set back to reopen it**: the latest time ever seen is kept, and the lock never goes by an earlier time.
* **The code is not in the app.** `app/unlock.properties` holds only a random salt and the PBKDF2-HMAC-SHA256 hash of the code
  (60 000 rounds). Five wrong tries block the lock screen for a minute, then longer (up to an hour).
* Settings shows "Preview build: works until ..." so testers know the date.

## Everyday use

```
.\gradlew.bat :app:assembleRelease                              # expires 30 days after this build
.\gradlew.bat :app:assembleRelease -Pspacebook.expireDays=60     # 60 days
.\gradlew.bat :app:assembleRelease -Pspacebook.expireDays=0      # a copy that never expires
.\gradlew.bat :app:assembleDebug -Pspacebook.debugExpireDays=1   # try the lock on a phone
```

Each build gets its own end date, so a build is only valid for its 30 days; a new build gives a new 30 days.

## A new unlock code

```
node tools/make_unlock.js                     # prints a new code ONCE and rewrites app/unlock.properties
node tools/make_unlock.js --check SB-XXXX-XXXX-XXXX-XXXX   # is this the code of the current build?
```

Write the new code down: it is not stored anywhere. A build made with the new hash no longer accepts the old code (phones that
were already unlocked stay unlocked for the build they unlocked).

## What it cannot do

It is an *offline* lock, so it cannot stop:

* someone who installs a fresh copy and sets the phone's clock back before the first start,
* someone with a rooted phone who edits the app's data, or who rebuilds the app without the lock.

For a lock that cannot be bypassed the app would also have to ask the server (a signed "stop" message from the SpaceBook
site); that can be added later on top of this.
