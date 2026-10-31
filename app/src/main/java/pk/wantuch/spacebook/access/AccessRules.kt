package pk.wantuch.spacebook.access

import pk.wantuch.spacebook.data.remote.AccessDto
import pk.wantuch.spacebook.data.remote.EntitlementsDto
import java.time.Instant

/**
 * What a person may open, decided by the one rule set of the server (api/lib/billing.php) and applied here and on the website (js/sb_access.js)
 * in the same way: Chapters 1 and 2 of every subject are free; later chapters need a Student plan for the class or a Teacher plan that lists the subject;
 * the free allowance of questions and the paper is counted by the server. tests/parity/access_contract.json holds the cases all three share.
 */
object AccessRules {
    /** Chapters 1 and 2 (index 0 and 1) of every subject of every class. */
    const val FREE_CHAPTERS = 2

    fun canRead(access: AccessDto, cls: String, subject: String, chapterIdx: Int): Boolean =
        chapterIdx < FREE_CHAPTERS || cls in access.readClasses || subject in access.readSubjects

    /** @param metric prep_q | plan_q | paper */
    fun unlimited(access: AccessDto, metric: String, cls: String = "", subject: String = ""): Boolean = when (metric) {
        "prep_q" -> access.prep
        "plan_q" -> cls.isNotEmpty() && cls in access.planClasses
        "paper" -> subject.isNotEmpty() && subject in access.paperSubjects
        else -> false
    }

    /**
     * The access worked out again from the saved plans with this phone's clock, so an answer kept for offline use never outlives a plan's end date.
     * Only active plans that have not ended count; a suspended or ended plan opens nothing.
     */
    fun fromSubscriptions(dto: EntitlementsDto, nowMs: Long): AccessDto {
        val classes = sortedSetOf<String>(); val subjects = sortedSetOf<String>(); val plan = sortedSetOf<String>(); val paper = sortedSetOf<String>()
        var prep = false
        for (s in dto.subscriptions) {
            val end = s.expiresAt?.let { runCatching { Instant.parse(it).toEpochMilli() }.getOrNull() } ?: continue
            if (s.status != "active" || end <= nowMs) continue
            when (s.planType) {
                "student" -> s.classId?.let { classes += it; plan += it }
                "teacher" -> s.subjects.forEach { subjects += it.id; paper += it.id }
                "prep" -> prep = true
            }
        }
        return AccessDto(classes.toList(), subjects.toList(), plan.toList(), paper.toList(), prep)
    }
}
