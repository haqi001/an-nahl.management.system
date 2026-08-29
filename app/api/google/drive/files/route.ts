import { NextRequest, NextResponse } from "next/server";

import { listDriveFiles } from "@/services/google-drive.service";

export async function GET(request: NextRequest) {
  try {
    const accessToken =
      request.cookies.get("google_access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Google belum terautentikasi.",
        },
        { status: 401 }
      );
    }

    const files = await listDriveFiles(accessToken);

    return NextResponse.json({
      success: true,
      files,
    });
  } catch (error: any) {
    console.error(
      "Google Drive files error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ??
          "Gagal mengambil file dari Google Drive.",
      },
      { status: 500 }
    );
  }
}