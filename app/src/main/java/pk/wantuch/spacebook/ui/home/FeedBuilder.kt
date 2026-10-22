package pk.wantuch.spacebook.ui.home

import pk.wantuch.spacebook.data.local.ReadingPosition
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.data.remote.ChapterDto
import pk.wantuch.spacebook.data.remote.SubjectDto

/** One post of the Home feed. [id] is stable so a like on it survives a refresh. */
sealed interface FeedPost {
    val id: String

    data class Chapter(
        val classId: String,
        val className: String,
        val subject: SubjectDto,
        val chapterIndex: Int,
        val chapter: ChapterDto,
    ) : FeedPost { override val id get() = "ch:${subject.id}:$chapterIndex" }

    data class Continue(val position: ReadingPosition, val subject: SubjectDto?, val className: String) : FeedPost {
        override val id get() = "continue:${position.subjectId}"
    }

    data class Practice(val classId: String) : FeedPost { override val id get() = "practice" }
    data class Plan(val classId: String) : FeedPost { override val id get() = "plan" }
    data class Games(val classId: String) : FeedPost { override val id get() = "games" }
}

/**
 * Builds the feed from the catalog: what you were reading, then one chapter from each subject of your class (a different
 * chapter each day, the same all day), with practice / plan / games posts between them.
 * @param daySeed changes once a day (days since 1970)
 */
fun buildFeed(catalog: Catalog?, classId: String, reading: List<ReadingPosition>, daySeed: Int): List<FeedPost> {
    val cls = catalog?.cls(classId) ?: return emptyList()
    val out = mutableListOf<FeedPost>()
    reading.filter { it.classId == classId }.take(2).forEach { p ->
        out += FeedPost.Continue(p, catalog.subject(p.subjectId), cls.name)
    }
    val chapterPosts = cls.subjects.filter { it.chapters.isNotEmpty() }.map { s ->
        val idx = ((daySeed + (s.id.hashCode() and 0x7fffffff)) % s.chapters.size)
        FeedPost.Chapter(cls.id, cls.name, s, idx, s.chapters[idx])
    }
    val extras = listOf(FeedPost.Practice(cls.id), FeedPost.Plan(cls.id), FeedPost.Games(cls.id))
    var e = 0
    chapterPosts.forEachIndexed { i, p ->
        out += p
        if ((i + 1) % 3 == 0 && e < extras.size) out += extras[e++]
    }
    while (e < extras.size) out += extras[e++]
    return out
}
