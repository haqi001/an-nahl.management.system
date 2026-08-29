import { google } from "googleapis";
import { Readable } from "stream";

const ROOT_FOLDER_NAME =
  "An-Nahl Management System";

function createDriveClient(
  accessToken: string,
  refreshToken?: string
) {
  const auth =
    new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

  auth.setCredentials({
    access_token: accessToken,
    ...(refreshToken
      ? {
          refresh_token: refreshToken,
        }
      : {}),
  });

  return google.drive({
    version: "v3",
    auth,
  });
}

export async function refreshDriveAccessToken(
  refreshToken: string
) {
  const auth =
    new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

  auth.setCredentials({
    refresh_token: refreshToken,
  });

  const { credentials } =
    await auth.refreshAccessToken();

  if (!credentials.access_token) {
    throw new Error(
      "Google tidak mengembalikan access token baru."
    );
  }

  return {
    accessToken:
      credentials.access_token,
    expiresIn:
      credentials.expiry_date
        ? Math.max(
            Math.floor(
              (credentials.expiry_date -
                Date.now()) /
                1000
            ),
            60
          )
        : 3600,
  };
}

export async function getValidDriveAccessToken(
  accessToken?: string,
  refreshToken?: string
) {
  if (!accessToken && !refreshToken) {
    throw new Error(
      "Google belum terautentikasi."
    );
  }

  if (accessToken) {
    return {
      accessToken,
      refreshed: false,
      expiresIn: 3600,
    };
  }

  if (!refreshToken) {
    throw new Error(
      "Google refresh token tidak ditemukan."
    );
  }

  const refreshed =
    await refreshDriveAccessToken(
      refreshToken
    );

  return {
    accessToken:
      refreshed.accessToken,
    refreshed: true,
    expiresIn:
      refreshed.expiresIn,
  };
}

async function getOrCreateRootFolder(
  accessToken: string,
  refreshToken?: string
) {
  const drive =
    createDriveClient(
      accessToken,
      refreshToken
    );

  const existingFolder =
    await drive.files.list({
      q: [
        `name = '${ROOT_FOLDER_NAME}'`,
        "mimeType = 'application/vnd.google-apps.folder'",
        "trashed = false",
      ].join(" and "),
      fields:
        "files(id,name,mimeType,webViewLink)",
      spaces: "drive",
      pageSize: 1,
    });

  const existing =
    existingFolder.data.files?.[0];

  if (existing?.id) {
    return existing;
  }

  const folder =
    await drive.files.create({
      requestBody: {
        name: ROOT_FOLDER_NAME,
        mimeType:
          "application/vnd.google-apps.folder",
      },
      fields:
        "id,name,mimeType,webViewLink",
    });

  return folder.data;
}

export async function listDriveFiles(
  accessToken: string,
  refreshToken?: string
) {
  if (!accessToken) {
    throw new Error(
      "Google access token tidak ditemukan."
    );
  }

  const drive =
    createDriveClient(
      accessToken,
      refreshToken
    );

  const result =
    await drive.files.list({
      q: [
        "trashed = false",
        "mimeType != 'application/vnd.google-apps.folder'",
      ].join(" and "),
      fields:
        "files(id,name,mimeType,size,createdTime,modifiedTime,webViewLink,webContentLink,parents)",
      orderBy:
        "createdTime desc",
      pageSize: 100,
      spaces: "drive",
    });

  return result.data.files ?? [];
}

export async function uploadDriveFile(
  accessToken: string,
  file: File,
  refreshToken?: string
) {
  if (!accessToken) {
    throw new Error(
      "Google access token tidak ditemukan."
    );
  }

  const drive =
    createDriveClient(
      accessToken,
      refreshToken
    );

  const rootFolder =
    await getOrCreateRootFolder(
      accessToken,
      refreshToken
    );

  if (!rootFolder.id) {
    throw new Error(
      "Folder An-Nahl Management System tidak memiliki ID."
    );
  }

  const buffer = Buffer.from(
    await file.arrayBuffer()
  );

  const media = {
    mimeType:
      file.type ||
      "application/octet-stream",
    body: Readable.from(buffer),
  };

  const result =
    await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [
          rootFolder.id,
        ],
      },
      media,
      fields:
        "id,name,mimeType,size,createdTime,modifiedTime,webViewLink,webContentLink",
    });

  if (!result.data.id) {
    throw new Error(
      "Google Drive tidak mengembalikan file ID."
    );
  }

  return result.data;
}

export async function deleteDriveFile(
  accessToken: string,
  fileId: string
) {
  if (!accessToken) {
    throw new Error(
      "Google access token tidak ditemukan."
    );
  }

  if (!fileId) {
    throw new Error(
      "Google Drive File ID tidak ditemukan."
    );
  }

  const drive =
    createDriveClient(accessToken);

  await drive.files.delete({
    fileId,
  });

  return {
    success: true,
    fileId,
  };
}