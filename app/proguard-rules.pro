# kotlinx.serialization keeps its generated serializers through the plugin; keep our API models readable by name.
-keepclassmembers class pk.wantuch.spacebook.data.remote.** { *; }
-keepattributes *Annotation*, InnerClasses
-dontwarn org.slf4j.**
# JavaScript bridge methods are called by name from the web page.
-keepclassmembers class pk.wantuch.spacebook.ui.reader.ReaderBridge { @android.webkit.JavascriptInterface <methods>; }
