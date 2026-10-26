package pk.wantuch.spacebook.data.remote

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

// The PHP API of the website (api/*.php). Relative to the site address; see SiteInterceptor.
interface ApiService {
    @POST("api/auth.php?action=register")
    suspend fun register(@Body body: RegisterBody): Response<AuthResponse>

    @POST("api/auth.php?action=login")
    suspend fun login(@Body body: LoginBody): Response<AuthResponse>

    @POST("api/auth.php?action=logout")
    suspend fun logout(@Body body: EmptyBody): Response<OkResponse>

    @GET("api/auth.php?action=me")
    suspend fun me(): Response<AuthResponse>

    @POST("api/v2/sync.php")
    suspend fun push(@Body body: SyncPushBody): Response<SyncPushResponse>

    @GET("api/v2/sync.php")
    suspend fun pull(@Query("since") since: Long): Response<PullResponse>

    @GET("api/v2/entitlements.php")
    suspend fun entitlements(): Response<EntitlementsDto>

    @GET("content/app_catalog.json")
    suspend fun catalog(): Response<Catalog>

    // News Feed (api/feed.php). Signed-in students only; the device token is the credential.
    @GET("api/feed.php?action=list")
    suspend fun feedList(@Query("before") before: Long, @Query("limit") limit: Int, @Query("mine") mine: Int, @Query("kind") kind: String?): Response<FeedListResponse>

    @GET("api/feed.php?action=comments")
    suspend fun feedComments(@Query("post") post: Long, @Query("before") before: Long): Response<FeedCommentsResponse>

    @POST("api/feed.php?action=create")
    suspend fun feedCreate(@Body body: FeedCreateBody): Response<FeedPostResponse>

    @POST("api/feed.php?action=share")
    suspend fun feedShare(@Body body: FeedShareBody): Response<FeedPostResponse>

    @POST("api/feed.php?action=like")
    suspend fun feedLike(@Body body: FeedLikeBody): Response<FeedLikeResponse>

    @POST("api/feed.php?action=comment")
    suspend fun feedComment(@Body body: FeedCommentBody): Response<FeedCommentResponse>

    @POST("api/feed.php?action=delete")
    suspend fun feedDelete(@Body body: FeedIdBody): Response<OkResponse>

    @POST("api/feed.php?action=comment_delete")
    suspend fun feedCommentDelete(@Body body: FeedIdBody): Response<FeedCountResponse>

    @POST("api/feed.php?action=report")
    suspend fun feedReport(@Body body: FeedReportBody): Response<FeedCountResponse>
}
