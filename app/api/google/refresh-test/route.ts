import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const refreshToken =
      request.cookies.get("google_refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Google refresh token tidak ditemukan.",
        },
        { status: 401 }
      );
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        {
          success: false,
          error:
            "GOOGLE_CLIENT_ID atau GOOGLE_CLIENT_SECRET belum tersedia.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Google refresh token error:",
        data
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Google gagal melakukan refresh access token.",
        },
        { status: 500 }
      );
    }

    const accessToken = data.access_token;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google tidak mengembalikan access token baru.",
        },
        { status: 500 }
      );
    }

    const result = NextResponse.json({
      success: true,
      message:
        "Refresh token berhasil digunakan. Access token baru berhasil diperoleh.",
      expiresIn: data.expires_in ?? null,
    });

    result.cookies.set(
      "google_access_token",
      accessToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: data.expires_in ?? 3600,
      }
    );

    return result;
  } catch (error) {
    console.error(
      "Google refresh test error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Terjadi kesalahan saat menguji refresh token.",
      },
      { status: 500 }
    );
  }
}