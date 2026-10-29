package pk.wantuch.spacebook.ui.lock

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import pk.wantuch.spacebook.expiry.UnlockResult
import java.text.DateFormat
import java.util.Date

/**
 * The only screen when a dated preview build has ended (release builds have no end date). It needs no network: the unlock code is checked on the phone.
 */
@Composable
fun LockScreen(
    expiredAt: Long,
    onSubmit: (String) -> UnlockResult,
) {
    var code by remember { mutableStateOf("") }
    var message by remember { mutableStateOf("") }
    val date = remember(expiredAt) { DateFormat.getDateInstance(DateFormat.LONG).format(Date(expiredAt)) }
    fun submit() {
        message = when (val r = onSubmit(code)) {
            UnlockResult.Ok -> ""
            is UnlockResult.Wrong -> "That code is not right. ${r.triesLeft} ${if (r.triesLeft == 1) "try" else "tries"} left."
            is UnlockResult.Blocked -> "Too many wrong tries. Please wait ${r.seconds.coerceAtLeast(1)} seconds."
        }
    }
    Box(
        Modifier.fillMaxSize().background(Brush.verticalGradient(listOf(Color(0xFF0A0630), Color(0xFF2C1478)))).statusBarsPadding().imePadding(),
        contentAlignment = Alignment.Center,
    ) {
        Column(Modifier.verticalScroll(rememberScrollState()).padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
            Text("🚀", style = MaterialTheme.typography.displayMedium)
            Spacer(Modifier.height(8.dp))
            Text("SpaceBook", style = MaterialTheme.typography.headlineLarge, color = Color.White)
            Spacer(Modifier.height(24.dp))
            Surface(shape = MaterialTheme.shapes.extraLarge, color = MaterialTheme.colorScheme.surface, tonalElevation = 6.dp) {
                Column(Modifier.padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("🔒", style = MaterialTheme.typography.displaySmall)
                    Spacer(Modifier.height(8.dp))
                    Text("This preview of SpaceBook has ended", style = MaterialTheme.typography.titleLarge, textAlign = TextAlign.Center)
                    Spacer(Modifier.height(8.dp))
                    Text(
                        "It stopped working on $date. Type the unlock code from the SpaceBook team below to open the app again.",
                        style = MaterialTheme.typography.bodyMedium, textAlign = TextAlign.Center, color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                    Spacer(Modifier.height(20.dp))
                    OutlinedTextField(
                        value = code, onValueChange = { code = it.take(400); message = "" },
                        label = { Text("Unlock code") }, singleLine = true, isError = message.isNotEmpty(),
                        keyboardOptions = KeyboardOptions(capitalization = KeyboardCapitalization.None, autoCorrectEnabled = false, imeAction = ImeAction.Done),
                        keyboardActions = KeyboardActions(onDone = { submit() }),
                        modifier = Modifier.fillMaxWidth(),
                    )
                    if (message.isNotEmpty()) Text(message, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 6.dp))
                    Spacer(Modifier.height(16.dp))
                    Button(onClick = { submit() }, enabled = code.isNotBlank(), modifier = Modifier.fillMaxWidth()) { Text("Unlock") }
                }
            }
        }
    }
}
