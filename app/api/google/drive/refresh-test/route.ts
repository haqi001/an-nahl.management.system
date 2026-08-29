import { NextRequest, NextResponse } from "next/server";

import { refreshGoogleAccessToken } from "@/services/google-auth.service";

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

    const result =
      await refreshGoogleAccessToken(refreshToken);

    const response = NextResponse.json({
      success: true,
      message:
        "Refresh token berhasil digunakan. Access token baru berhasil diperoleh.",
      expiresIn: result.expiresIn,
    });

    response.cookies.set(
      "google_access_token",
      result.accessToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: result.expiresIn,
      }
    );

    return response;
  } catch (error: any) {
    console.error(
      "[Google Refresh Test] Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ??
          "Gagal melakukan refresh Google access token.",
      },
      { status: 500 }
    );
  }
}