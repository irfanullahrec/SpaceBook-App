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
}
