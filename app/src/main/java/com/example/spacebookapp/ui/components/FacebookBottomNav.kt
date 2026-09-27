package com.example.spacebookapp.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.OndemandVideo
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.outlined.Group
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.MenuBook
import androidx.compose.material.icons.outlined.Notifications
import androidx.compose.material.icons.outlined.OndemandVideo
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

enum class BottomTab {
    HOME,
    REELS,
    GROUPS,
    LIBRARY,
    NOTIFICATIONS,
    PROFILE
}

@Composable
fun FacebookBottomNav(
    selectedTab: BottomTab,
    onTabSelected: (BottomTab) -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(Color.White)
    ) {
        HorizontalDivider(thickness = 1.dp, color = Color(0xFFE4E6EB))

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceAround
        ) {
            // 1. Home
            BottomNavItem(
                icon = if (selectedTab == BottomTab.HOME) Icons.Filled.Home else Icons.Outlined.Home,
                label = "Home",
                isSelected = selectedTab == BottomTab.HOME,
                onClick = { onTabSelected(BottomTab.HOME) }
            )

            // 2. Video / Reels
            BottomNavItem(
                icon = if (selectedTab == BottomTab.REELS) Icons.Filled.OndemandVideo else Icons.Outlined.OndemandVideo,
                label = "Video",
                isSelected = selectedTab == BottomTab.REELS,
                onClick = { onTabSelected(BottomTab.REELS) }
            )

            // 3. Groups (with badge 2)
            BottomNavItem(
                icon = if (selectedTab == BottomTab.GROUPS) Icons.Filled.Group else Icons.Outlined.Group,
                label = "Groups",
                badgeCount = "2",
                isSelected = selectedTab == BottomTab.GROUPS,
                onClick = { onTabSelected(BottomTab.GROUPS) }
            )

            // 4. Library / Textbooks
            BottomNavItem(
                icon = if (selectedTab == BottomTab.LIBRARY) Icons.Filled.MenuBook else Icons.Outlined.MenuBook,
                label = "Books",
                isSelected = selectedTab == BottomTab.LIBRARY,
                onClick = { onTabSelected(BottomTab.LIBRARY) }
            )

            // 5. Notifications (with badge 9+)
            BottomNavItem(
                icon = if (selectedTab == BottomTab.NOTIFICATIONS) Icons.Filled.Notifications else Icons.Outlined.Notifications,
                label = "Notifications",
                badgeCount = "9+",
                isSelected = selectedTab == BottomTab.NOTIFICATIONS,
                onClick = { onTabSelected(BottomTab.NOTIFICATIONS) }
            )

            // 6. Profile Avatar
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxHeight()
                    .clickable { onTabSelected(BottomTab.PROFILE) },
                contentAlignment = Alignment.Center
            ) {
                Box(
                    modifier = Modifier
                        .size(28.dp)
                        .clip(CircleShape)
                        .background(if (selectedTab == BottomTab.PROFILE) FacebookBlue else Color(0xFF334155)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Person,
                        contentDescription = "Profile",
                        tint = Color.White,
                        modifier = Modifier.size(18.dp)
                    )
                }

                if (selectedTab == BottomTab.PROFILE) {
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomCenter)
                            .fillMaxWidth(0.6f)
                            .height(2.5.dp)
                            .background(FacebookBlue, RoundedCornerShape(topStart = 2.dp, topEnd = 2.dp))
                    )
                }
            }
        }
    }
}

@Composable
private fun RowScope.BottomNavItem(
    icon: ImageVector,
    label: String,
    isSelected: Boolean,
    badgeCount: String? = null,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .weight(1f)
            .fillMaxHeight()
            .clickable { onClick() },
        contentAlignment = Alignment.Center
    ) {
        if (badgeCount != null) {
            BadgedBox(
                badge = {
                    Badge(
                        containerColor = Color(0xFFE41E3F),
                        contentColor = Color.White,
                        modifier = Modifier.offset(x = 4.dp, y = (-2).dp)
                    ) {
                        Text(
                            text = badgeCount,
                            fontSize = 9.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = label,
                    tint = if (isSelected) FacebookBlue else Color(0xFF65676B),
                    modifier = Modifier.size(26.dp)
                )
            }
        } else {
            Icon(
                imageVector = icon,
                contentDescription = label,
                tint = if (isSelected) FacebookBlue else Color(0xFF65676B),
                modifier = Modifier.size(26.dp)
            )
        }

        if (isSelected) {
            Box(
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .fillMaxWidth(0.6f)
                    .height(2.5.dp)
                    .background(FacebookBlue, RoundedCornerShape(topStart = 2.dp, topEnd = 2.dp))
            )
        }
    }
}
