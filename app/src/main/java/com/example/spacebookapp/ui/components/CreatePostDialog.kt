package com.example.spacebookapp.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Functions
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PhotoLibrary
import androidx.compose.material.icons.filled.Public
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties

@Composable
fun CreatePostDialog(
    onDismiss: () -> Unit,
    onPostCreated: (content: String, subject: String, formula: String?, bookRef: String) -> Unit
) {
    var contentText by remember { mutableStateOf("") }
    var selectedSubject by remember { mutableStateOf("Physics") }
    var formulaText by remember { mutableStateOf("") }
    var showFormulaInput by remember { mutableStateOf(false) }

    val subjects = listOf("Physics", "Chemistry", "Biology", "Mathematics", "English", "Urdu", "Computer Sci", "General")

    Dialog(
        onDismissRequest = onDismiss,
        properties = DialogProperties(usePlatformDefaultWidth = false)
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.White)
        ) {
            Column(modifier = Modifier.fillMaxSize()) {
                // ─── Header ───
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 14.dp, vertical = 12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(onClick = onDismiss, modifier = Modifier.size(36.dp)) {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = "Cancel",
                            tint = Color(0xFF050505)
                        )
                    }

                    Text(
                        text = "Create Study Post",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF050505),
                        modifier = Modifier
                            .weight(1f)
                            .padding(start = 12.dp)
                    )

                    Button(
                        onClick = {
                            if (contentText.isNotBlank()) {
                                onPostCreated(
                                    contentText,
                                    selectedSubject,
                                    if (formulaText.isNotBlank()) formulaText else null,
                                    "Class 10 $selectedSubject Notes"
                                )
                                onDismiss()
                            }
                        },
                        enabled = contentText.isNotBlank(),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = FacebookBlue,
                            disabledContainerColor = Color(0xFFE4E6EB)
                        ),
                        shape = RoundedCornerShape(6.dp),
                        contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 18.dp, vertical = 6.dp)
                    ) {
                        Text(
                            text = "Post",
                            color = if (contentText.isNotBlank()) Color.White else Color(0xFF8A8D91),
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp
                        )
                    }
                }

                HorizontalDivider(thickness = 1.dp, color = Color(0xFFE4E6EB))

                // ─── Author Info Row ───
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(46.dp)
                            .clip(CircleShape)
                            .background(Color(0xFF1E293B)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Person,
                            contentDescription = null,
                            tint = Color.White,
                            modifier = Modifier.size(28.dp)
                        )
                    }

                    Spacer(modifier = Modifier.width(12.dp))

                    Column {
                        Text(
                            text = "Student Scholar",
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF050505)
                        )
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier
                                .border(1.dp, Color(0xFFCED0D4), RoundedCornerShape(4.dp))
                                .padding(horizontal = 6.dp, vertical = 2.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Public,
                                contentDescription = null,
                                tint = Color(0xFF65676B),
                                modifier = Modifier.size(12.dp)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = "Public Study Feed",
                                fontSize = 11.sp,
                                color = Color(0xFF65676B),
                                fontWeight = FontWeight.Medium
                            )
                        }
                    }
                }

                // ─── Subject Selector Chips ───
                Text(
                    text = "Select Study Subject Tag:",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = Color(0xFF65676B),
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp)
                )

                LazyRow(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp),
                    contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 16.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(subjects) { subject ->
                        val isSelected = selectedSubject == subject
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(16.dp))
                                .background(if (isSelected) FacebookBlue else Color(0xFFF0F2F5))
                                .clickable { selectedSubject = subject }
                                .padding(horizontal = 12.dp, vertical = 6.dp)
                        ) {
                            Text(
                                text = subject,
                                color = if (isSelected) Color.White else Color(0xFF050505),
                                fontSize = 13.sp,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                            )
                        }
                    }
                }

                // ─── Content Editor ───
                OutlinedTextField(
                    value = contentText,
                    onValueChange = { contentText = it },
                    placeholder = {
                        Text(
                            text = "What book topic, conceptual question, or study tip would you like to share with fellow students?",
                            color = Color(0xFF8A8D91),
                            fontSize = 17.sp,
                            lineHeight = 24.sp
                        )
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f)
                        .padding(horizontal = 16.dp, vertical = 8.dp),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color.Transparent,
                        unfocusedBorderColor = Color.Transparent,
                        focusedContainerColor = Color.Transparent,
                        unfocusedContainerColor = Color.Transparent
                    )
                )

                // ─── Formula Input Field (Toggleable) ───
                if (showFormulaInput) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp, vertical = 6.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(Color(0xFFF8FAFC))
                            .border(1.dp, FacebookBlue, RoundedCornerShape(8.dp))
                            .padding(10.dp)
                    ) {
                        Column {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = "📐 Highlighted Formula or Equation",
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = FacebookBlue
                                )
                                Spacer(modifier = Modifier.weight(1f))
                                IconButton(
                                    onClick = { showFormulaInput = false; formulaText = "" },
                                    modifier = Modifier.size(20.dp)
                                ) {
                                    Icon(Icons.Default.Close, contentDescription = "Remove", tint = Color.Gray)
                                }
                            }
                            OutlinedTextField(
                                value = formulaText,
                                onValueChange = { formulaText = it },
                                placeholder = { Text("e.g. vf = vi + at, or D = b² - 4ac") },
                                modifier = Modifier.fillMaxWidth(),
                                singleLine = true
                            )
                        }
                    }
                }

                // ─── Bottom Add-To-Post Tools ───
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp)
                        .clip(RoundedCornerShape(10.dp))
                        .border(1.dp, Color(0xFFCED0D4), RoundedCornerShape(10.dp))
                        .padding(horizontal = 14.dp, vertical = 10.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Add to your study post",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = Color(0xFF050505),
                            modifier = Modifier.weight(1f)
                        )

                        // Attach Photo/Diagram
                        IconButton(onClick = { /* Media Attachment */ }) {
                            Icon(
                                imageVector = Icons.Default.PhotoLibrary,
                                contentDescription = "Add Image",
                                tint = Color(0xFF45BD62)
                            )
                        }

                        // Attach Formula
                        IconButton(onClick = { showFormulaInput = !showFormulaInput }) {
                            Icon(
                                imageVector = Icons.Default.Functions,
                                contentDescription = "Add Formula",
                                tint = FacebookBlue
                            )
                        }

                        // Attach Book Reference
                        IconButton(onClick = { /* Book ref */ }) {
                            Icon(
                                imageVector = Icons.Default.MenuBook,
                                contentDescription = "Tag Textbook",
                                tint = Color(0xFFF59E0B)
                            )
                        }
                    }
                }
            }
        }
    }
}
