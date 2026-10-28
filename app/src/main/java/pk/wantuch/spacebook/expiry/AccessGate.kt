package pk.wantuch.spacebook.expiry

import android.content.Context
import pk.wantuch.spacebook.BuildConfig
import java.net.URLEncoder

/** Who to contact when the free trial has ended. */
object Contact {
    /** the number as it is written on the screen */
    const val LOCAL = "0343 0155606"

    /** the same number for wa.me: country code 92, no leading 0, no spaces */
    const val WHATSAPP = "923430155606"

    fun message(deviceId: String) = "Assalam o Alaikum. My SpaceBook free trial has ended. My device ID is $deviceId. Please unlock it."

    /** opens WhatsApp (or the browser) with the message ready; the device ID is in it so the developer can make the code */
    fun whatsappUrl(deviceId: String): String = "https://wa.me/$WHATSAPP?text=" + URLEncoder.encode(message(deviceId), "UTF-8").replace("+", "%20")
}

/**
 * What the app asks on every start: the dated preview lock of a build ([ExpiryGate], docs/EXPIRY.md) and the person's 1-month free trial
 * ([TrialGate], docs/TRIAL_LOCK.md in the website repository). A valid code for this phone (made by the developer) opens everything.
 */
class AccessGate(private val preview: ExpiryGate, private val trial: TrialGate) {
    /** the ID the lock screen shows and the WhatsApp message carries */
    val deviceId: String get() = trial.deviceId

    fun check(): LockState {
        val t = trial.check()
        if (trial.enabled && trial.hasLicense()) return LockState.Open
        val p = preview.check()
        return when {
            p is LockState.Locked -> p
            t is LockState.Locked -> t
            t is LockState.Counting -> t
            else -> p
        }
    }

    /** a signed code for this phone first; the old build code only while a dated preview build is locked */
    fun tryUnlock(code: String): UnlockResult {
        if (!trial.enabled) return preview.tryUnlock(code)
        val previewLocked = preview.check() is LockState.Locked
        val t = trial.tryUnlock(code)
        if (t is UnlockResult.Ok) return t
        if (previewLocked && t is UnlockResult.Wrong) {
            val p = preview.tryUnlock(code)
            if (p is UnlockResult.Ok) return p
        }
        return t
    }

    companion object {
        fun forApp(context: Context): AccessGate = AccessGate(
            ExpiryGate.forApp(context),
            TrialGate(BuildConfig.TRIAL_DAYS, LicenseCode.PUBLIC_KEY, SharedPrefsTrialStore(context.applicationContext), defaultCode = DefaultCode.SPEC),
        )
    }
}
