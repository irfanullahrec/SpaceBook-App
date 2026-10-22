package pk.wantuch.spacebook.di

import android.content.Context
import androidx.room.Room
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import pk.wantuch.spacebook.BuildConfig
import pk.wantuch.spacebook.data.local.SpaceBookDb
import pk.wantuch.spacebook.data.remote.ApiService
import pk.wantuch.spacebook.data.remote.Endpoint
import pk.wantuch.spacebook.data.remote.SiteInterceptor
import pk.wantuch.spacebook.data.remote.WebViewCookieJar
import retrofit2.Retrofit
import retrofit2.converter.kotlinx.serialization.asConverterFactory
import java.util.concurrent.TimeUnit
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides @Singleton
    fun json(): Json = Json {
        ignoreUnknownKeys = true
        coerceInputValues = true
        explicitNulls = false
        encodeDefaults = true
    }

    @Provides @Singleton
    fun okHttp(endpoint: Endpoint): OkHttpClient {
        val b = OkHttpClient.Builder()
            .cookieJar(WebViewCookieJar())
            .addInterceptor(SiteInterceptor(endpoint))
            .connectTimeout(15, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
        if (BuildConfig.DEBUG) {
            b.addInterceptor(HttpLoggingInterceptor().apply {
                level = HttpLoggingInterceptor.Level.BASIC
                redactHeader("Authorization")
                redactHeader("Cookie")
            })
        }
        return b.build()
    }

    @Provides @Singleton
    fun retrofit(client: OkHttpClient, json: Json): Retrofit = Retrofit.Builder()
        .baseUrl(Endpoint.DEFAULT)
        .client(client)
        .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
        .build()

    @Provides @Singleton
    fun api(retrofit: Retrofit): ApiService = retrofit.create(ApiService::class.java)

    @Provides @Singleton
    fun db(@ApplicationContext ctx: Context): SpaceBookDb =
        Room.databaseBuilder(ctx, SpaceBookDb::class.java, "spacebook.db").build()

    @Provides fun outboxDao(db: SpaceBookDb) = db.outbox()
    @Provides fun readingDao(db: SpaceBookDb) = db.reading()
    @Provides fun bookmarkDao(db: SpaceBookDb) = db.bookmarks()
    @Provides fun noteDao(db: SpaceBookDb) = db.notes()
    @Provides fun reactionDao(db: SpaceBookDb) = db.reactions()
}
