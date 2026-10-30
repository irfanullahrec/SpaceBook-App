package pk.wantuch.spacebook.ui.auth

import androidx.compose.foundation.background
import pk.wantuch.spacebook.R
import androidx.compose.ui.unit.sp
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.graphics.Color
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material.icons.rounded.Lock
import androidx.compose.material.icons.rounded.Phone
import androidx.compose.material.icons.rounded.Person
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowBack
import androidx.compose.material.icons.rounded.Visibility
import androidx.compose.material.icons.rounded.VisibilityOff
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import pk.wantuch.spacebook.data.remote.ApiResult
import pk.wantuch.spacebook.data.remote.UserDto
import pk.wantuch.spacebook.data.repo.AuthRepository
import pk.wantuch.spacebook.data.repo.SyncRepository
import pk.wantuch.spacebook.ui.theme.Sb
import android.content.Context
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject

data class AuthUi(val busy: Boolean = false, val error: String? = null, val signedIn: UserDto? = null, val guestEvents: Int = 0)

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val auth: AuthRepository,
    private val sync: SyncRepository,
    @ApplicationContext private val context: Context,
) : ViewModel() {
    private val _ui = MutableStateFlow(AuthUi())
    val ui: StateFlow<AuthUi> = _ui.asStateFlow()

    fun login(whatsapp: String, password: String) = run { auth.login(whatsapp, password) }

    fun register(name: String, father: String, whatsapp: String, password: String) = run {
        auth.register(name, father, whatsapp, password)
    }

    private fun run(call: suspend () -> ApiResult<UserDto>) {
        if (_ui.value.busy) return
        _ui.value = AuthUi(busy = true)
        viewModelScope.launch {
            when (val r = call()) {
                is ApiResult.Failure -> _ui.value = AuthUi(error = r.message)
                is ApiResult.Success -> {
                    val guest = auth.guestEventCount()
                    _ui.value = AuthUi(signedIn = r.value, guestEvents = guest)
                    if (guest == 0) SyncRepository.schedule(context)
                }
            }
        }
    }

    /** The student chose whether this phone's progress from before signing in joins the account. */
    fun resolveGuest(add: Boolean, userId: Int) = viewModelScope.launch {
        if (add) { auth.adoptGuestEvents(userId); SyncRepository.schedule(context) }
        _ui.value = _ui.value.copy(guestEvents = 0)
    }

    fun clearError() { _ui.value = _ui.value.copy(error = null) }
}

@Composable
fun AuthScreen(onDone: () -> Unit, onBack: () -> Unit, vm: AuthViewModel = hiltViewModel()) {
    val ui by vm.ui.collectAsStateWithLifecycle()
    var tab by remember { mutableStateOf(0) }
    var whatsapp by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var show by remember { mutableStateOf(false) }
    var name by remember { mutableStateOf("") }
    var father by remember { mutableStateOf("") }

    val user = ui.signedIn
    if (user != null && ui.guestEvents > 0) {
        AlertDialog(
            onDismissRequest = {},
            title = { Text("Add your progress?") },
            text = { Text("This phone has ${ui.guestEvents} saved ${if (ui.guestEvents == 1) "thing" else "things"} (study steps, bookmarks or notes) from before you signed in. Add them to your account?") },
            confirmButton = { TextButton(onClick = { vm.resolveGuest(true, user.id) }) { Text("Yes, add") } },
            dismissButton = { TextButton(onClick = { vm.resolveGuest(false, user.id) }) { Text("No, keep separate") } },
        )
    }
    androidx.compose.runtime.LaunchedEffect(user, ui.guestEvents) { if (user != null && ui.guestEvents == 0) onDone() }

    val navy = Color(0xFF0B2056)
    val fieldShape = RoundedCornerShape(12.dp)
    val fieldColors = OutlinedTextFieldDefaults.colors(
        focusedBorderColor = Color(0xFF0785FF), unfocusedBorderColor = Color(0xFFCFE0F5),
        focusedContainerColor = Color.White, unfocusedContainerColor = Color.White,
    )
    Column(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background).statusBarsPadding().imePadding().verticalScroll(rememberScrollState())) {
        Image(painterResource(R.drawable.au_hero), "SpaceBook", Modifier.fillMaxWidth().padding(horizontal = 10.dp), contentScale = ContentScale.FillWidth)
        Column(
            Modifier.padding(horizontal = 16.dp).padding(top = 4.dp, bottom = 20.dp).fillMaxWidth()
                .background(Color.White, RoundedCornerShape(24.dp)).padding(horizontal = 20.dp, vertical = 18.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp), horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Text(if (tab == 0) "Sign In" else "Create Account", fontSize = 32.sp, fontWeight = FontWeight.ExtraBold, color = navy)
            Text(
                if (tab == 0) "Welcome back to SpaceBook!\nAccess your study bank, practice questions and much more." else "Join SpaceBook and start your learning journey today!",
                style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, textAlign = TextAlign.Center,
            )
            if (tab == 1) {
                OutlinedTextField(name, { name = it }, Modifier.fillMaxWidth(), shape = fieldShape, colors = fieldColors, label = { Text("Your name") }, singleLine = true,
                    leadingIcon = { Icon(Icons.Rounded.Person, null) }, keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next))
                OutlinedTextField(father, { father = it }, Modifier.fillMaxWidth(), shape = fieldShape, colors = fieldColors, label = { Text("Father name") }, singleLine = true,
                    leadingIcon = { Icon(Icons.Rounded.Person, null) }, keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next))
            }
            OutlinedTextField(
                whatsapp, { whatsapp = it }, Modifier.fillMaxWidth(), shape = fieldShape, colors = fieldColors, label = { Text("WhatsApp number") }, singleLine = true,
                placeholder = { Text("03xx xxxxxxx") }, leadingIcon = { Icon(Icons.Rounded.Phone, null) },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone, imeAction = ImeAction.Next),
            )
            OutlinedTextField(
                password, { password = it }, Modifier.fillMaxWidth(), shape = fieldShape, colors = fieldColors, label = { Text("Password") }, singleLine = true,
                leadingIcon = { Icon(Icons.Rounded.Lock, null) },
                visualTransformation = if (show) VisualTransformation.None else PasswordVisualTransformation(),
                trailingIcon = { IconButton(onClick = { show = !show }) { Icon(if (show) Icons.Rounded.VisibilityOff else Icons.Rounded.Visibility, if (show) "Hide password" else "Show password") } },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password, imeAction = ImeAction.Done),
            )
            ui.error?.let { Text(it, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodyMedium) }
            Button(
                onClick = { if (tab == 0) vm.login(whatsapp, password) else vm.register(name, father, whatsapp, password) },
                enabled = !ui.busy && whatsapp.isNotBlank() && password.length >= (if (tab == 1) 6 else 1) && (tab == 0 || (name.length >= 2 && father.length >= 2)),
                modifier = Modifier.fillMaxWidth().height(54.dp),
                shape = fieldShape,
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF079F51)),
            ) {
                if (ui.busy) CircularProgressIndicator(Modifier.height(24.dp), strokeWidth = 2.dp, color = MaterialTheme.colorScheme.onPrimary)
                else Text(if (tab == 0) "Sign In" else "Create my account", fontSize = 18.sp, fontWeight = FontWeight.ExtraBold)
            }
            Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                HorizontalDivider(Modifier.weight(1f), color = Color(0xFFD5E2F2))
                Text("  OR  ", color = MaterialTheme.colorScheme.onSurfaceVariant)
                HorizontalDivider(Modifier.weight(1f), color = Color(0xFFD5E2F2))
            }
            OutlinedButton(
                onClick = { tab = if (tab == 0) 1 else 0; vm.clearError() }, modifier = Modifier.fillMaxWidth().height(52.dp), shape = fieldShape,
                border = BorderStroke(1.5.dp, Color(0xFF0785FF)),
            ) { Text(if (tab == 0) "Create Account" else "I already have an account", fontSize = 17.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0B4FC2)) }
            Button(
                onClick = onBack, modifier = Modifier.fillMaxWidth().height(52.dp), shape = fieldShape,
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFE3EEFB), contentColor = navy),
            ) { Text("Continue as Guest", fontSize = 17.sp, fontWeight = FontWeight.Bold) }
            if (tab == 0) Text("Forgot your password? Ask your teacher or write to SpaceBook support on WhatsApp.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, textAlign = TextAlign.Center)
            Text("Your data is safe and secure with us.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}
