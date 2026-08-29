import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: `Google OAuth error: ${error}`,
        },
        { status: 400 }
      );
    }

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Authorization code tidak ditemukan.",
        },
        { status: 400 }
      );
    }

    const clientId =
      process.env.GOOGLE_CLIENT_ID;

    const clientSecret =
      process.env.GOOGLE_CLIENT_SECRET;

    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI;

    if (
      !clientId ||
      !clientSecret ||
      !redirectUri
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Konfigurasi Google OAuth belum lengkap di .env.local.",
        },
        { status: 500 }
      );
    }

    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      }
    );

    const tokenData =
      await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error(
        "[Google OAuth Callback] Token error:",
        tokenData
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Gagal mendapatkan access token dari Google.",
        },
        { status: 500 }
      );
    }

    if (!tokenData.access_token) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google tidak mengembalikan access token.",
        },
        { status: 500 }
      );
    }

    const response =
      NextResponse.redirect(
        new URL(
          "/dashboard",
          request.url
        )
      );

    /*
     * Access token
     */
    response.cookies.set(
      "google_access_token",
      tokenData.access_token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        maxAge:
          tokenData.expires_in ??
          3600,
      }
    );

    /*
     * Refresh token
     *
     * Google biasanya hanya mengirimkan
     * refresh_token ketika authorization
     * meminta offline access dan consent.
     */
    if (tokenData.refresh_token) {
      response.cookies.set(
        "google_refresh_token",
        tokenData.refresh_token,
        {
          httpOnly: true,
          secure:
            process.env.NODE_ENV ===
            "production",
          sameSite: "lax",
          path: "/",
          maxAge:
            60 * 60 * 24 * 30 * 6,
        }
      );
    }

    return response;
  } catch (error) {
    console.error(
      "[Google OAuth Callback] Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Terjadi kesalahan saat memproses Google OAuth.",
      },
      { status: 500 }
    );
  }
}