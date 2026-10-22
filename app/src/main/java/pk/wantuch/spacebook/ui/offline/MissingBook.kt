package pk.wantuch.spacebook.ui.offline

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pk.wantuch.spacebook.data.offline.DownloadProgress

/**
 * Shown instead of a blank page when the book's files are not on the phone and there is no way to fetch them right now.
 * @param bookName the book being opened (null for the website's own pages such as Tests Preps)
 * @param bytesNeeded size of what is missing, when known
 * @param progress the running download, if it is for this book
 */
@Composable
fun MissingBookPanel(
    bookName: String?,
    bytesNeeded: Long?,
    progress: DownloadProgress?,
    onDownload: (() -> Unit)?,
    onOpenOffline: () -> Unit,
    modifier: Modifier = Modifier,
) {
    Column(
        modifier.fillMaxSize().padding(28.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
    ) {
        Text("📚", fontSize = 56.sp)
        Text(
            if (bookName != null) "$bookName is not on this phone yet" else "These books are not on this phone yet",
            style = MaterialTheme.typography.titleLarge, textAlign = TextAlign.Center, modifier = Modifier.padding(top = 12.dp),
        )
        Text(
            "Download once, then read with no internet. The books stay on your phone.",
            style = MaterialTheme.typography.bodyLarge, textAlign = TextAlign.Center,
            color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 8.dp, bottom = 20.dp),
        )
        val running = progress?.takeIf { !it.finished }
        if (running != null) {
            Text(
                if (running.totalBytes > 0) "Downloading… ${formatBytes(running.doneBytes)} of ${formatBytes(running.totalBytes)}" else "Preparing…",
                style = MaterialTheme.typography.titleSmall,
            )
            if (running.totalBytes > 0) LinearProgressIndicator(progress = { (running.doneBytes.toFloat() / running.totalBytes).coerceIn(0f, 1f) }, modifier = Modifier.fillMaxWidth().padding(top = 10.dp))
            else LinearProgressIndicator(modifier = Modifier.fillMaxWidth().padding(top = 10.dp))
        } else {
            if (progress?.finished == true && progress.failed > 0) {
                Text("Some files could not be downloaded. Check the connection and try again.", color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(bottom = 12.dp), textAlign = TextAlign.Center)
            }
            if (onDownload != null) {
                Button(onClick = onDownload, modifier = Modifier.fillMaxWidth().height(54.dp)) {
                    Text(if (bytesNeeded != null && bytesNeeded > 0) "Download this book (${formatBytes(bytesNeeded)})" else "Download this book")
                }
            }
            OutlinedButton(onClick = onOpenOffline, modifier = Modifier.fillMaxWidth().padding(top = 10.dp).height(50.dp)) { Text("Books on this phone") }
        }
    }
}
