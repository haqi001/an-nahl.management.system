import { NextRequest, NextResponse } from "next/server";

import {
  uploadDriveFile,
  getValidDriveAccessToken,
} from "@/services/google-drive.service";

import { createArchive } from "@/services/archive.service";

const MAX_FILE_SIZE = 500 * 1024 * 1024;

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

    const formData =
      await request.formData();

    const file = formData.get("file");
    const title = formData.get("title");
    const category =
      formData.get("category");
    const description =
      formData.get("description");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "File tidak ditemukan.",
        },
        { status: 400 }
      );
    }

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Title wajib diisi.",
        },
        { status: 400 }
      );
    }

    if (
      typeof category !== "string" ||
      !category
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Category wajib diisi.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Ukuran file maksimal adalah 500 MB.",
        },
        { status: 400 }
      );
    }

    /*
     * Upload ke Google Drive.
     *
     * Access token dan refresh token
     * diberikan bersama-sama supaya
     * Google OAuth client dapat menangani
     * pembaruan credential.
     */
    const uploadedFile =
      await uploadDriveFile(
        authResult.accessToken,
        file,
        refreshToken
      );

    if (!uploadedFile.id) {
      throw new Error(
        "Google Drive tidak mengembalikan file ID."
      );
    }

    /*
     * Simpan metadata ke Firestore.
     */
    await createArchive({
      title: title.trim(),

      category:
        category as any,

      description:
        typeof description === "string"
          ? description.trim()
          : "",

      fileName: file.name,

      fileUrl:
        uploadedFile.webViewLink ??
        `https://drive.google.com/file/d/${uploadedFile.id}/view`,

      storagePath:
        uploadedFile.id,

      createdAt:
        new Date().toISOString(),
    });

    const response =
      NextResponse.json({
        success: true,
        message:
          "File berhasil diupload dan disimpan ke Archive.",
        file: uploadedFile,
      });

    /*
     * Jika token baru diperoleh melalui
     * refresh token, simpan access token
     * baru ke cookie.
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
      "[Google Drive Upload] Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ??
          "Gagal mengupload archive.",
      },
      { status: 500 }
    );
  }
}