import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

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

    const auth = new google.auth.OAuth2();

    auth.setCredentials({
      access_token: accessToken,
    });

    const drive = google.drive({
      version: "v3",
      auth,
    });

    // Cari folder AMS terlebih dahulu
    const existingFolder = await drive.files.list({
      q: [
        "name = 'An-Nahl Management System'",
        "mimeType = 'application/vnd.google-apps.folder'",
        "trashed = false",
      ].join(" and "),
      fields: "files(id,name,mimeType,webViewLink)",
      spaces: "drive",
    });

    // Jika folder sudah ada, gunakan folder tersebut
    if (
      existingFolder.data.files &&
      existingFolder.data.files.length > 0
    ) {
      const folder = existingFolder.data.files[0];

      return NextResponse.json({
        success: true,
        message: "Folder An-Nahl Management System sudah tersedia.",
        folder,
      });
    }

    // Jika belum ada, buat folder baru
    const folder = await drive.files.create({
      requestBody: {
        name: "An-Nahl Management System",
        mimeType: "application/vnd.google-apps.folder",
      },
      fields: "id,name,mimeType,webViewLink",
    });

    return NextResponse.json({
      success: true,
      message: "Folder berhasil dibuat.",
      folder: folder.data,
    });
  } catch (error: any) {
    console.error("Setup Drive error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? "Gagal menyiapkan folder Google Drive.",
      },
      { status: 500 }
    );
  }
}