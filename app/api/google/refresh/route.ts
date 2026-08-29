import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  refreshGoogleAccessToken,
} from "@/services/google-auth.service";

export async function GET(
  request: NextRequest
) {
  try {
    const refreshToken =
      request.cookies.get(
        "google_refresh_token"
      )?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google refresh token tidak ditemukan.",
        },
        { status: 401 }
      );
    }

    const {
      accessToken,
      expiresIn,
    } =
      await refreshGoogleAccessToken(
        refreshToken
      );

    const response =
      NextResponse.json({
        success: true,
        message:
          "Google access token berhasil diperbarui.",
      });

    response.cookies.set(
      "google_access_token",
      accessToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        maxAge: expiresIn,
      }
    );

    return response;
  } catch (error: any) {
    console.error(
      "Google refresh error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ??
          "Gagal memperbarui Google access token.",
      },
      { status: 500 }
    );
  }
}