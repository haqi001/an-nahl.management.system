import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";

import {
  deleteArchive,
} from "@/services/archive.service";

import {
  deleteDriveFile,
  getValidDriveAccessToken,
} from "@/services/google-drive.service";

export async function POST(
  request: NextRequest
) {
  try {
    const accessToken =
      request.cookies.get(
        "google_access_token"
      )?.value;

    const refreshToken =
      request.cookies.get(
        "google_refresh_token"
      )?.value;

    const authResult =
      await getValidDriveAccessToken(
        accessToken,
        refreshToken
      );

    const body =
      await request.json();

    const archiveId =
      body?.archiveId;

    if (
      typeof archiveId !== "string" ||
      !archiveId.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Archive ID tidak ditemukan.",
        },
        { status: 400 }
      );
    }

    /*
     * Ambil metadata archive
     * dari Firestore.
     */
    const archiveRef = doc(
      db,
      "archives",
      archiveId
    );

    const archiveSnapshot =
      await getDoc(archiveRef);

    if (!archiveSnapshot.exists()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Archive tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    const archiveData =
      archiveSnapshot.data();

    const driveFileId =
      archiveData.storagePath;

    if (
      !driveFileId ||
      typeof driveFileId !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Drive File ID tidak ditemukan.",
        },
        { status: 400 }
      );
    }

    /*
     * Hapus file dari Google Drive.
     *
     * Access token + refresh token
     * diberikan ke Google OAuth client.
     */
    await deleteDriveFile(
      authResult.accessToken,
      driveFileId,
      refreshToken
    );

    /*
     * Hapus metadata dari Firestore
     * dan buat activity log.
     */
    await deleteArchive(
      archiveId,
      driveFileId
    );

    const response =
      NextResponse.json({
        success: true,
        message:
          "Archive berhasil dihapus.",
      });

    /*
     * Jika access token diperbarui,
     * simpan token baru ke cookie.
     */
    if (authResult.refreshed) {
      response.cookies.set(
        "google_access_token",
        authResult.accessToken,
        {
          httpOnly: true,
          secure:
            process.env.NODE_ENV ===
            "production",
          sameSite: "lax",
          path: "/",
          maxAge:
            authResult.expiresIn ||
            3600,
        }
      );
    }

    return response;
  } catch (error: any) {
    console.error(
      "[Google Drive Delete] Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ??
          "Gagal menghapus archive.",
      },
      { status: 500 }
    );
  }
}