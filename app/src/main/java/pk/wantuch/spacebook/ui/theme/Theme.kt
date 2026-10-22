package pk.wantuch.spacebook.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Density
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.foundation.shape.RoundedCornerShape

/** SpaceBook's own colours: a violet-to-pink brand, a warm gold for coins, one gradient per subject. */
object Sb {
    val Violet = Color(0xFF5B4BFF)
    val VioletDeep = Color(0xFF3B2FD1)
    val Pink = Color(0xFFFF5C8A)
    val Gold = Color(0xFFFFC53D)
    val Mint = Color(0xFF22C7A0)
    val Sky = Color(0xFF3FA9FF)
    val Ink = Color(0xFF17143A)

    val Brand = Brush.linearGradient(listOf(Color(0xFF6D5CFF), Color(0xFFFF5C8A)))

    private val gradients = listOf(
        listOf(Color(0xFF6D5CFF), Color(0xFF9B8CFF)),
        listOf(Color(0xFFFF5C8A), Color(0xFFFF9A6B)),
        listOf(Color(0xFF1FB89A), Color(0xFF5EE0B8)),
        listOf(Color(0xFF2F8CFF), Color(0xFF63C6FF)),
        listOf(Color(0xFFF59E0B), Color(0xFFFFD36B)),
        listOf(Color(0xFFB249F8), Color(0xFFE08CFF)),
        listOf(Color(0xFFEF4444), Color(0xFFFF8A7A)),
        listOf(Color(0xFF0EA5A5), Color(0xFF6ADBD0)),
    )

    /** The same subject always gets the same colours, so students learn to find a book by its colour. */
    fun gradientFor(key: String): List<Color> = gradients[(key.hashCode() and 0x7fffffff) % gradients.size]
    fun brushFor(key: String): Brush = Brush.linearGradient(gradientFor(key))
}

private val LightColors = lightColorScheme(
    primary = Sb.Violet,
    onPrimary = Color.White,
    primaryContainer = Color(0xFFE7E3FF),
    onPrimaryContainer = Sb.VioletDeep,
    secondary = Sb.Pink,
    onSecondary = Color.White,
    tertiary = Sb.Mint,
    background = Color(0xFFF4F1FF),
    onBackground = Sb.Ink,
    surface = Color.White,
    onSurface = Sb.Ink,
    surfaceVariant = Color(0xFFEFEBFF),
    onSurfaceVariant = Color(0xFF5A5780),
    outline = Color(0xFFC9C4F0),
)

private val DarkColors = darkColorScheme(
    primary = Color(0xFF9D92FF),
    onPrimary = Color(0xFF14103F),
    primaryContainer = Color(0xFF2B2478),
    onPrimaryContainer = Color(0xFFE7E3FF),
    secondary = Color(0xFFFF8AAE),
    tertiary = Color(0xFF4EE0BD),
    background = Color(0xFF0F0D1E),
    onBackground = Color(0xFFEDEBFF),
    surface = Color(0xFF1A1735),
    onSurface = Color(0xFFEDEBFF),
    surfaceVariant = Color(0xFF252148),
    onSurfaceVariant = Color(0xFFB9B5E6),
    outline = Color(0xFF433E7A),
)

/** Large, friendly type: the same screens are read by a Class 1 child and a Class 12 student. */
private val SbTypography = Typography(
    headlineLarge = TextStyle(fontSize = 32.sp, lineHeight = 38.sp, fontWeight = FontWeight.ExtraBold),
    headlineMedium = TextStyle(fontSize = 26.sp, lineHeight = 32.sp, fontWeight = FontWeight.ExtraBold),
    headlineSmall = TextStyle(fontSize = 22.sp, lineHeight = 28.sp, fontWeight = FontWeight.Bold),
    titleLarge = TextStyle(fontSize = 21.sp, lineHeight = 27.sp, fontWeight = FontWeight.Bold),
    titleMedium = TextStyle(fontSize = 18.sp, lineHeight = 24.sp, fontWeight = FontWeight.Bold),
    titleSmall = TextStyle(fontSize = 16.sp, lineHeight = 22.sp, fontWeight = FontWeight.SemiBold),
    bodyLarge = TextStyle(fontSize = 17.sp, lineHeight = 25.sp),
    bodyMedium = TextStyle(fontSize = 15.sp, lineHeight = 22.sp),
    bodySmall = TextStyle(fontSize = 13.sp, lineHeight = 18.sp),
    labelLarge = TextStyle(fontSize = 15.sp, lineHeight = 20.sp, fontWeight = FontWeight.Bold),
    labelMedium = TextStyle(fontSize = 13.sp, lineHeight = 18.sp, fontWeight = FontWeight.SemiBold),
)

private val SbShapes = Shapes(
    extraSmall = RoundedCornerShape(8.dp),
    small = RoundedCornerShape(12.dp),
    medium = RoundedCornerShape(18.dp),
    large = RoundedCornerShape(24.dp),
    extraLarge = RoundedCornerShape(32.dp),
)

val LocalCoins = staticCompositionLocalOf { 0 }

/** @param themeMode 0 = follow the phone, 1 = light, 2 = dark. @param fontScalePercent 100 = normal. */
@Composable
fun SpaceBookTheme(themeMode: Int, fontScalePercent: Int, content: @Composable () -> Unit) {
    val dark = when (themeMode) { 1 -> false; 2 -> true; else -> isSystemInDarkTheme() }
    val base = LocalDensity.current
    val scaled = Density(base.density, base.fontScale * fontScalePercent / 100f)
    CompositionLocalProvider(LocalDensity provides scaled) {
        MaterialTheme(
            colorScheme = if (dark) DarkColors else LightColors,
            typography = SbTypography,
            shapes = SbShapes,
            content = content,
        )
    }
}
