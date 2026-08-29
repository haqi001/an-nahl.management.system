import { google } from "googleapis";

export interface GoogleDriveAuth {
  accessToken: string;
  refreshed: boolean;
}

export async function refreshGoogleAccessToken(
  refreshToken: string
): Promise<{
  accessToken: string;
  expiresIn: number;
}> {
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
    throw new Error(
      "Konfigurasi Google OAuth belum lengkap."
    );
  }

  const oauth2Client =
    new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const { credentials } =
    await oauth2Client.refreshAccessToken();

  if (!credentials.access_token) {
    throw new Error(
      "Google tidak mengembalikan access token baru."
    );
  }

  const expiresIn =
    credentials.expiry_date
      ? Math.max(
          Math.floor(
            (credentials.expiry_date -
              Date.now()) /
              1000
          ),
          60
        )
      : 3600;

  return {
    accessToken:
      credentials.access_token,
    expiresIn,
  };
}

export async function getGoogleDriveAuth(
  accessToken?: string,
  refreshToken?: string
): Promise<GoogleDriveAuth> {
  if (accessToken) {
    return {
      accessToken,
      refreshed: false,
    };
  }

  if (!refreshToken) {
    throw new Error(
      "Google belum terautentikasi."
    );
  }

  const refreshed =
    await refreshGoogleAccessToken(
      refreshToken
    );

  return {
    accessToken:
      refreshed.accessToken,
    refreshed: true,
  };
}