package pk.wantuch.spacebook.ui.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil3.compose.AsyncImage
import pk.wantuch.spacebook.data.remote.ClassDto
import pk.wantuch.spacebook.ui.theme.Sb

/** The cover pictures ship inside the app (assets/covers/, made by tools/app/make_app_covers.py), so they show with no network. */
private fun coverUri(subjectId: String) = "file:///android_asset/covers/$subjectId.webp"
private fun classUri(classId: String) = "file:///android_asset/covers/class-$classId.webp"

/**
 * A book's cover picture, as the website shows it. While the picture loads (or when a book has none) the subject's own colour and
 * emoji are shown instead, so a tile is never empty.
 */
@Composable
fun BookCover(subjectId: String, emoji: String, modifier: Modifier = Modifier, ratio: Float = 0.7f, corner: Dp = 12.dp) {
    Box(
        modifier
            .aspectRatio(ratio)
            .clip(RoundedCornerShape(corner))
            .background(Sb.brushFor(subjectId)),
        contentAlignment = Alignment.Center,
    ) {
        Text(emoji, fontSize = 36.sp)
        AsyncImage(
            model = coverUri(subjectId),
            contentDescription = null,
            contentScale = ContentScale.Fit,   // the whole cover, whatever its shape (they run from 0.45 to 0.75 wide-to-tall)
            modifier = Modifier.matchParentSize(),
        )
    }
}

/** A class's card picture, as on the website's class page. */
@Composable
fun ClassCardImage(classId: String, name: String, selected: Boolean, modifier: Modifier = Modifier, onClick: () -> Unit) {
    Surface(
        shape = RoundedCornerShape(16.dp),
        shadowElevation = if (selected) 6.dp else 2.dp,
        border = if (selected) BorderStroke(3.dp, MaterialTheme.colorScheme.primary) else null,
        modifier = modifier.clickable(onClick = onClick),
    ) {
        Box(Modifier.aspectRatio(1.57f).background(Sb.brushFor(classId)), contentAlignment = Alignment.Center) {
            Text(name.removePrefix("Class "), fontSize = 40.sp, color = androidx.compose.ui.graphics.Color.White)
            AsyncImage(
                model = classUri(classId),
                contentDescription = name,
                contentScale = ContentScale.Crop,
                modifier = Modifier.matchParentSize(),
            )
        }
    }
}

/** Pick a class from the card pictures. Used first time (no class yet) and from the class button on Home. */
@Composable
fun ClassPickerDialog(classes: List<ClassDto>, selected: String, onPick: (String) -> Unit, onDismiss: () -> Unit) {
    AlertDialog(
        onDismissRequest = onDismiss,
        confirmButton = { TextButton(onClick = onDismiss) { Text("Close") } },
        title = { Text("Choose your class") },
        text = {
            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                contentPadding = PaddingValues(2.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                items(classes, key = { it.id }) { c ->
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        ClassCardImage(c.id, c.name, selected = c.id == selected, modifier = Modifier.fillMaxWidth()) { onPick(c.id); onDismiss() }
                        Text(c.name, style = MaterialTheme.typography.labelMedium, modifier = Modifier.padding(top = 4.dp), textAlign = TextAlign.Center, maxLines = 1, overflow = TextOverflow.Ellipsis)
                    }
                }
            }
        },
    )
}

/** A horizontal strip of class cards (Library, first-run picker). */
@Composable
fun ClassStrip(classes: List<ClassDto>, selected: String, onPick: (String) -> Unit, modifier: Modifier = Modifier, cardWidth: Dp = 150.dp) {
    androidx.compose.foundation.lazy.LazyRow(
        modifier,
        contentPadding = PaddingValues(horizontal = 12.dp, vertical = 8.dp),
        horizontalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        items(classes.size, key = { classes[it].id }) { i ->
            val c = classes[i]
            ClassCardImage(c.id, c.name, selected = c.id == selected, modifier = Modifier.width(cardWidth)) { onPick(c.id) }
        }
    }
}

@Composable
fun ClassChipRow(classes: List<ClassDto>, selected: String, onPick: (String) -> Unit) {
    Row(Modifier.fillMaxWidth()) { ClassStrip(classes, selected, onPick) }
}
