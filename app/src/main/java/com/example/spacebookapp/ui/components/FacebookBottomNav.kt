package com.example.spacebookapp.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Bolt
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material.icons.outlined.Bolt
import androidx.compose.material.icons.outlined.MenuBook
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.Psychology
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
    LEARN,
    PLAY,
    BRAIN,
    ME
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
        HorizontalDivider(thickness = 1.dp, color = Color(0xFFE2E8F0))

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(58.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceAround
        ) {
            // 1. Learn (Books)
            KidBottomNavItem(
                icon = if (selectedTab == BottomTab.LEARN) Icons.Filled.MenuBook else Icons.Outlined.MenuBook,
                label = "Learn",
                emoji = "📚",
                isSelected = selectedTab == BottomTab.LEARN,
                activeColor = Color(0xFF2563EB),
                onClick = { onTabSelected(BottomTab.LEARN) }
            )

            // 2. Play (Quick Challenges / Games)
            KidBottomNavItem(
                icon = if (selectedTab == BottomTab.PLAY) Icons.Filled.Bolt else Icons.Outlined.Bolt,
                label = "Play",
                emoji = "⚡",
                isSelected = selectedTab == BottomTab.PLAY,
                activeColor = Color(0xFFEC4899),
                onClick = { onTabSelected(BottomTab.PLAY) }
            )

            // 3. Brain (Brain Zone Hub)
            KidBottomNavItem(
                icon = if (selectedTab == BottomTab.BRAIN) Icons.Filled.Psychology else Icons.Outlined.Psychology,
                label = "Brain",
                emoji = "🧠",
                isSelected = selectedTab == BottomTab.BRAIN,
                activeColor = Color(0xFF6366F1),
                onClick = { onTabSelected(BottomTab.BRAIN) }
            )

            // 4. Me (Profile / Stars / Parent Corner)
            KidBottomNavItem(
                icon = if (selectedTab == BottomTab.ME) Icons.Filled.Person else Icons.Outlined.Person,
                label = "Me",
                emoji = "⭐",
                isSelected = selectedTab == BottomTab.ME,
                activeColor = Color(0xFFF59E0B),
                onClick = { onTabSelected(BottomTab.ME) }
            )
        }
    }
}

@Composable
private fun RowScope.KidBottomNavItem(
    icon: ImageVector,
    label: String,
    emoji: String,
    isSelected: Boolean,
    activeColor: Color,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .weight(1f)
            .fillMaxHeight()
            .clickable { onClick() },
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.padding(vertical = 4.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(34.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(if (isSelected) activeColor.copy(alpha = 0.14f) else Color.Transparent),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = label,
                    tint = if (isSelected) activeColor else Color(0xFF64748B),
                    modifier = Modifier.size(24.dp)
                )
            }

            Spacer(Modifier.height(2.dp))

            Text(
                text = label,
                fontSize = 11.5.sp,
                fontWeight = if (isSelected) FontWeight.ExtraBold else FontWeight.Medium,
                color = if (isSelected) activeColor else Color(0xFF64748B)
            )
        }

        if (isSelected) {
            Box(
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .fillMaxWidth(0.55f)
                    .height(3.dp)
                    .background(activeColor, RoundedCornerShape(topStart = 3.dp, topEnd = 3.dp))
            )
        }
    }
}
