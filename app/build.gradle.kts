import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.kotlin.serialization)
    alias(libs.plugins.ksp)
    alias(libs.plugins.hilt)
}

// The offline expiry lock (see docs/EXPIRY.md): a release build stops working this many days after it was built, on every phone,
// until the unlock code is entered. -Pspacebook.expireDays=0 builds a copy that never expires; debug builds never expire
// unless -Pspacebook.debugExpireDays=N is given (to try the lock on a phone).
val unlockProps = Properties().apply { file("unlock.properties").takeIf { it.exists() }?.inputStream()?.use { load(it) } }
fun expiryMillis(days: Int): String = if (days > 0) "${System.currentTimeMillis() + days * 86_400_000L}L" else "0L"
// 0 = a release build has no end date. -Pspacebook.expireDays=N makes a dated preview build that locks itself on that date (docs/EXPIRY.md).
val releaseExpireDays = (providers.gradleProperty("spacebook.expireDays").orNull ?: "0").toInt()
val debugExpireDays = (providers.gradleProperty("spacebook.debugExpireDays").orNull ?: "0").toInt()

android {
    namespace = "pk.wantuch.spacebook"
    compileSdk = 37

    defaultConfig {
        applicationId = "pk.wantuch.spacebook"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        // only a salted hash of the unlock code is in the app (tools/make_unlock.js writes unlock.properties)
        buildConfigField("String", "UNLOCK_SALT", "\"${unlockProps.getProperty("salt", "00")}\"")
        buildConfigField("String", "UNLOCK_HASH", "\"${unlockProps.getProperty("hash", "00")}\"")
        buildConfigField("int", "UNLOCK_ITERATIONS", unlockProps.getProperty("iterations", "1"))
        // SHA-256 of the release signing certificate; a release build with a different one refuses to start (security/Integrity.kt). Empty = not pinned yet.
        buildConfigField("String", "CERT_SHA256", "\"${providers.gradleProperty("spacebook.certSha256").orNull ?: ""}\"")
        // The free trial: this many days from the first start on a phone, then only the lock screen (contact the developer on WhatsApp, or an unlock code).
    }

    // SITE_URL is the web app (pages, books, API). No database host, user or password is ever put in the APK: the app only
    // talks to the PHP API under this address, and the PHP side holds the DB credentials.
    buildTypes {
        debug {
            // Debug builds use the live site too, so a phone needs no cable and no PC server: with "localhost" as the address every page
            // whose files were not on the phone yet came up empty as soon as the USB tunnel was gone. To work against the PHP server on the PC:
            //   gradlew assembleDebug -Pspacebook.siteUrl=http://localhost:8790/     and on the phone     adb reverse tcp:8790 tcp:8790
            // (plain http to localhost is the only http the app allows).
            val siteUrl = providers.gradleProperty("spacebook.siteUrl").orNull ?: "https://wantuch.pk/spacebook/"
            buildConfigField("String", "SITE_URL", "\"$siteUrl\"")
            buildConfigField("long", "EXPIRES_AT_MILLIS", expiryMillis(debugExpireDays))
        }
        release {
            buildConfigField("String", "SITE_URL", "\"https://wantuch.pk/spacebook/\"")
            buildConfigField("long", "EXPIRES_AT_MILLIS", expiryMillis(releaseExpireDays))
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    buildFeatures {
        compose = true
        buildConfig = true
    }

    testOptions {
        unitTests {
            isReturnDefaultValues = true
            isIncludeAndroidResources = true   // Robolectric screenshot tests need the app's resources
            all { test ->
                test.maxHeapSize = "768m"
                test.systemProperty("roborazzi.test.record", "true")   // write the pictures (app/build/screenshots)
                // Robolectric cannot load its Android jar from a path with a space ("C:\Users\Some Name\.m2"): when a
                // short folder holding the jar exists (docs/BUILDING.md), use it instead of ~/.m2.
                val deps = file("C:/tmp/robolectric")
                if (deps.isDirectory) {
                    test.systemProperty("robolectric.dependency.dir", deps.absolutePath)
                    test.systemProperty("robolectric.offline", "true")
                }
            }
        }
    }
}

ksp {
    arg("room.schemaLocation", "$projectDir/schemas")
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.lifecycle.runtime.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.navigation.compose)

    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.material.icons)

    implementation(libs.hilt.android)
    ksp(libs.hilt.compiler)
    implementation(libs.androidx.hilt.navigation.compose)
    implementation(libs.androidx.hilt.work)
    ksp(libs.androidx.hilt.compiler)

    implementation(libs.androidx.room.runtime)
    implementation(libs.androidx.room.ktx)
    ksp(libs.androidx.room.compiler)
    implementation(libs.androidx.datastore)
    implementation(libs.androidx.work.runtime)

    implementation(libs.retrofit)
    implementation(libs.retrofit.kotlinx)
    implementation(libs.okhttp)
    implementation(libs.okhttp.logging)
    implementation(libs.kotlinx.serialization.json)
    implementation(libs.kotlinx.coroutines.android)

    implementation(libs.coil.compose)
    implementation(libs.coil.network)
    implementation(libs.androidx.webkit)

    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)

    testImplementation(libs.junit)
    testImplementation(libs.kotlinx.coroutines.test)
    testImplementation(libs.okhttp.mockwebserver)
    testImplementation(platform(libs.androidx.compose.bom))
    testImplementation(libs.androidx.compose.ui.test.junit4)
    testImplementation(libs.robolectric)
    testImplementation(libs.roborazzi)
    testImplementation(libs.roborazzi.compose)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(libs.androidx.compose.ui.test.junit4)
}
