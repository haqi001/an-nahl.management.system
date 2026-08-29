import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

function getDriveClient(request: NextRequest) {
  const accessToken =
    request.cookies.get("google_access_token")?.value;

  if (!accessToken) {
    throw new Error("Google belum terautentikasi.");
  }

  const auth = new google.auth.OAuth2();

  auth.setCredentials({
    access_token: accessToken,
  });

  return google.drive({
    version: "v3",
    auth,
  });
}

// GET — mengambil daftar file
export async function GET(request: NextRequest) {
  try {
    const drive = getDriveClient(request);

    const result = await drive.files.list({
      pageSize: 20,
      q: "trashed = false",
      fields:
        "files(id,name,mimeType,webViewLink,createdTime,modifiedTime)",
      orderBy: "modifiedTime desc",
    });

    return NextResponse.json({
      success: true,
      files: result.data.files ?? [],
    });
  } catch (error: any) {
    console.error("Google Drive GET error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? "Gagal mengambil data Google Drive.",
      },
      { status: 500 }
    );
  }
}

// POST — membuat folder
export async function POST(request: NextRequest) {
  try {
    const drive = getDriveClient(request);

    const body = await request.json();

    const name = body.name || "An-Nahl Management System";

    // Cek apakah folder sudah ada
    const existing = await drive.files.list({
      q: `name = '${name.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: "files(id,name,mimeType,webViewLink)",
      pageSize: 1,
    });

    if (existing.data.files && existing.data.files.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Folder sudah ada.",
        folder: existing.data.files[0],
      });
    }

    // Buat folder baru
    const folder = await drive.files.create({
      requestBody: {
        name,
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
    console.error("Google Drive POST error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? "Gagal membuat folder Google Drive.",
      },
      { status: 500 }
    );
  }
}