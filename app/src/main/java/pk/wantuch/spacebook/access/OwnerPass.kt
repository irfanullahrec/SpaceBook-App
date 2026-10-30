package pk.wantuch.spacebook.access

/**
 * The owner's pass (js/sb_access.js unlockWithKey): a key only the owner knows, for showing the app somewhere. The web page checks the key (only a salted hash of it is in
 * the code) and tells the app through SBHost; the app remembers the answer (Prefs) so its own screens, the chapter list and the pages agree. [on] is read from any thread;
 * [persist] is set by AppViewModel and writes it to the settings. It opens every chapter and lifts the free limits on THIS phone; the server does not know it.
 */
object OwnerPass {
    @Volatile var on: Boolean = false
    @Volatile var persist: (Boolean) -> Unit = {}
}
