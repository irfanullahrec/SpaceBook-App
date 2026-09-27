package com.example.spacebookapp.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ChatBubbleOutline
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

val FacebookBlue = Color(0xFF1877F2)
val FacebookTopBg = Color.White
val FacebookIconBg = Color(0xFFF0F2F5)
val FacebookTextPrimary = Color(0xFF050505)

@Composable
fun FacebookTopBar(
    onHamburgerClick: () -> Unit,
    onCreateClick: () -> Unit,
    onSearchClick: () -> Unit,
    onMessengerClick: () -> Unit,
    unreadMessages: Int = 6,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier
            .fillMaxWidth()
            .background(FacebookTopBg)
            .padding(horizontal = 12.dp, vertical = 6.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Top Left Hamburger Menu (3 lines)
        IconButton(
            onClick = onHamburgerClick,
            modifier = Modifier.size(40.dp)
        ) {
            Icon(
                imageVector = Icons.Default.Menu,
                contentDescription = "Open Study Menu",
                tint = FacebookTextPrimary,
                modifier = Modifier.size(28.dp)
            )
        }

        Spacer(modifier = Modifier.width(6.dp))

        // Brand Name in Facebook iconic blue & bold style
        Text(
            text = "spacebook",
            color = FacebookBlue,
            fontSize = 28.sp,
            fontWeight = FontWeight.ExtraBold,
            letterSpacing = (-1.2).sp
        )

        Spacer(modifier = Modifier.weight(1f))

        // Plus / Create Icon Button
        IconButton(
            onClick = onCreateClick,
            modifier = Modifier
                .size(38.dp)
                .clip(CircleShape)
                .background(FacebookIconBg)
        ) {
            Icon(
                imageVector = Icons.Default.Add,
                contentDescription = "Create",
                tint = FacebookTextPrimary,
                modifier = Modifier.size(22.dp)
            )
        }

        Spacer(modifier = Modifier.width(8.dp))

        // Search Icon Button
        IconButton(
            onClick = onSearchClick,
            modifier = Modifier
                .size(38.dp)
                .clip(CircleShape)
                .background(FacebookIconBg)
        ) {
            Icon(
                imageVector = Icons.Default.Search,
                contentDescription = "Search",
                tint = FacebookTextPrimary,
                modifier = Modifier.size(22.dp)
            )
        }

        Spacer(modifier = Modifier.width(8.dp))

        // Messenger / Study Chat Icon Button with Unread Badge
        BadgedBox(
            badge = {
                if (unreadMessages > 0) {
                    Badge(
                        containerColor = Color(0xFFE41E3F),
                        contentColor = Color.White,
                        modifier = Modifier.offset(x = (-4).dp, y = 4.dp)
                    ) {
                        Text(
                            text = unreadMessages.toString(),
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        ) {
            IconButton(
                onClick = onMessengerClick,
                modifier = Modifier
                    .size(38.dp)
                    .clip(CircleShape)
                    .background(FacebookIconBg)
            ) {
                Icon(
                    imageVector = Icons.Default.ChatBubbleOutline,
                    contentDescription = "Messenger",
                    tint = FacebookTextPrimary,
                    modifier = Modifier.size(20.dp)
                )
            }
        }
    }
}
