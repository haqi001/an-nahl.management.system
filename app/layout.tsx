import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import UserProfileProvider from "@/components/auth/UserProfileProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "An-Nahl Management System",
  description:
    "Sistem Informasi Himpunan Mahasiswa Arsitektur An-Nahl",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <UserProfileProvider>
          {children}
        </UserProfileProvider>
      </body>
    </html>
  );
}