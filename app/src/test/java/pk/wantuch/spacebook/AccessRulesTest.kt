package pk.wantuch.spacebook

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.access.AccessRules
import pk.wantuch.spacebook.data.remote.AccessDto
import pk.wantuch.spacebook.data.remote.EntitlementsDto
import pk.wantuch.spacebook.data.remote.RegisterBody
import pk.wantuch.spacebook.data.remote.SubscriptionDto
import java.time.Instant

/**
 * The access rules, the same cases as the server (tests/php/billing_tests.php) and the website (tests/access/unit.js) run:
 * tests/parity/access_contract.json, copied here by tools/app/sync_app.js. Plus: the server's answer is read as sent, and a plan kept on the phone
 * stops opening things at its end date even with no network.
 */
class AccessRulesTest {
    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true; explicitNulls = false; encodeDefaults = true }
    private val contract: JsonObject = json.parseToJsonElement(javaClass.getResource("/parity/access_contract.json")!!.readText()).jsonObject
    private val now = Instant.parse(contract["now"]!!.jsonPrimitive.content).toEpochMilli()

    private fun dtoOf(subs: JsonArray, access: JsonObject?): EntitlementsDto {
        val body = buildString {
            append("""{"ok":true,"signedIn":true,"subscriptions":""").append(subs.toString())
            if (access != null) append(""","access":""").append(access.toString())
            append("}")
        }
        return json.decodeFromString(EntitlementsDto.serializer(), body)
    }

    @Test fun twoChaptersAreFreeAndTheOwnersPassStartsOff() {
        assertEquals(2, AccessRules.FREE_CHAPTERS)
        val none = AccessDto()
        assertTrue(AccessRules.canRead(none, "cls9", "cls9-eng", 0))
        assertTrue(AccessRules.canRead(none, "cls9", "cls9-eng", 1))
        assertFalse(AccessRules.canRead(none, "cls9", "cls9-eng", 2))
        // the owner's pass is a switch of this phone, off until the page says the key was right (access/OwnerPass.kt)
        assertFalse(pk.wantuch.spacebook.access.OwnerPass.on)
    }

    @Test fun everyScenarioOfTheSharedContractHolds() {
        val scenarios = contract["scenarios"]!!.jsonArray
        assertTrue(scenarios.size >= 6)
        for (s in scenarios) {
            val sc = s.jsonObject
            val name = sc["name"]!!.jsonPrimitive.content
            val dto = dtoOf(sc["subscriptions"]!!.jsonArray, sc["access"]!!.jsonObject)
            val expected = json.decodeFromString(AccessDto.serializer(), sc["access"]!!.toString())
            // what the server lists, and what this phone works out from the saved plans, are the same
            val worked = AccessRules.fromSubscriptions(dto, now)
            assertEquals("$name: classes", expected.readClasses.sorted(), worked.readClasses.sorted())
            assertEquals("$name: subjects", expected.readSubjects.sorted(), worked.readSubjects.sorted())
            assertEquals("$name: study plan classes", expected.planClasses.sorted(), worked.planClasses.sorted())
            assertEquals("$name: paper subjects", expected.paperSubjects.sorted(), worked.paperSubjects.sorted())
            assertEquals("$name: test preparation", expected.prep, worked.prep)
            for (c in sc["read"]!!.jsonArray) {
                val o = c.jsonObject
                val got = AccessRules.canRead(worked, o["cls"]!!.jsonPrimitive.content, o["subject"]!!.jsonPrimitive.content, o["chapter"]!!.jsonPrimitive.intOrNull!!)
                assertEquals("$name: read ${o["subject"]} chapter ${o["chapter"]}", o["expect"]!!.jsonPrimitive.booleanOrNull, got)
            }
            for (c in sc["unlimited"]!!.jsonArray) {
                val o = c.jsonObject
                val got = AccessRules.unlimited(worked, o["metric"]!!.jsonPrimitive.content, o["cls"]!!.jsonPrimitive.content, o["subject"]!!.jsonPrimitive.content)
                assertEquals("$name: unlimited ${o["metric"]} ${o["cls"]} ${o["subject"]}", o["expect"]!!.jsonPrimitive.booleanOrNull, got)
            }
        }
    }

    @Test fun aFirstRunWithNoAnswerIsTheFreeTierNotEverythingOpen() {
        val dto = EntitlementsDto()
        assertFalse(dto.unlocked)
        val a = AccessRules.fromSubscriptions(dto, now)
        assertTrue(AccessRules.canRead(a, "cls9", "cls9-eng", 0))
        assertTrue(AccessRules.canRead(a, "cls9", "cls9-eng", 1))
        assertFalse(AccessRules.canRead(a, "cls9", "cls9-eng", 2))
        assertEquals(50, dto.free.prepQ.limit); assertEquals(50, dto.free.planQ.limit); assertEquals(1, dto.free.paper.limit)
    }

    @Test fun thePlanKeptOnThePhoneEndsOnItsEndDateEvenOffline() {
        val dto = EntitlementsDto(subscriptions = listOf(SubscriptionDto(planType = "student", classId = "cls9", status = "active", expiresAt = "2026-10-30T00:00:00Z")))
        val before = Instant.parse("2026-10-29T23:59:59Z").toEpochMilli()
        val after = Instant.parse("2026-10-30T00:00:01Z").toEpochMilli()
        assertTrue(AccessRules.canRead(AccessRules.fromSubscriptions(dto, before), "cls9", "cls9-eng", 4))
        assertFalse(AccessRules.canRead(AccessRules.fromSubscriptions(dto, after), "cls9", "cls9-eng", 4))
        assertTrue(AccessRules.canRead(AccessRules.fromSubscriptions(dto, after), "cls9", "cls9-eng", 0))
    }

    @Test fun theServersAnswerIsReadAsSent() {
        val body = """{"ok":true,"signedIn":true,"version":2,"plan":"paid","unlocked":false,"classes":["cls9"],"features":{"books":true,"sync":true},
            "access":{"readClasses":["cls9"],"readSubjects":[],"planClasses":["cls9"],"paperSubjects":[],"prep":false},
            "free":{"chapters":1,"prep_q":{"limit":50,"used":12},"plan_q":{"limit":50,"used":0},"paper":{"limit":1,"used":1}},
            "subscriptions":[{"id":4,"planType":"student","classId":"cls9","label":"Student plan · Class 9","subjects":[],"status":"active","startsAt":"2026-10-29T10:00:00Z","expiresAt":"2026-11-29T10:00:00Z","daysLeft":31,"source":"payment","suspendReason":""}],
            "pendingPayments":1,"serverTime":"2026-10-29T10:05:00Z","visitor":"${"a".repeat(32)}","flags":{"syncV2":false}}"""
        val dto = json.decodeFromString(EntitlementsDto.serializer(), body)
        assertEquals("paid", dto.plan); assertEquals(listOf("cls9"), dto.access.readClasses)
        assertEquals(12, dto.free.prepQ.used); assertEquals(1, dto.free.paper.used)
        assertEquals("Student plan · Class 9", dto.subscriptions[0].label); assertEquals(31, dto.subscriptions[0].daysLeft)
        assertEquals(1, dto.pendingPayments)
    }

    @Test fun registrationNoLongerSendsAUserType() {
        val sent = json.encodeToString(RegisterBody("Ayesha", "Khan", "03001234567", "secret1"))
        assertFalse(sent, sent.contains("user_type"))
        assertTrue(sent.contains("father_name"))
    }
}
