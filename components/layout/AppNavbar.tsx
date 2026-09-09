"use client";

import { useState } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase/config";
import { useUserProfile } from "@/components/auth/UserProfileProvider";
import { Button } from "@/components/ui/button";

export default function AppNavbar() {
  const router = useRouter();

  const {
    user,
    profile,
    loading: profileLoading,
  } = useUserProfile();

  const [logoutLoading, setLogoutLoading] =
    useState(false);

  async function handleLogout() {
    setLogoutLoading(true);

    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLogoutLoading(false);
    }
  }

  const displayName =
    profile?.name ||
    user?.email ||
    "User";

  const displayRole =
    profile?.role ||
    "Memuat profil...";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-lg font-semibold">
        An-Nahl Management System
      </h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-700">
            {profileLoading
              ? "Memuat..."
              : displayName}
          </p>

          <p className="text-xs text-slate-500">
            {profileLoading
              ? "Memuat profil..."
              : displayRole}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          disabled={
            logoutLoading ||
            profileLoading
          }
        >
          {logoutLoading
            ? "Keluar..."
            : "Keluar"}
        </Button>
      </div>
    </header>
  );
}