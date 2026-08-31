"use client";

import { useState } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { auth } from "@/firebase/config";

export default function AppNavbar() {
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  async function handleLogout() {
    if (isLoggingOut) {
      return;
    }

    try {
      setIsLoggingOut(true);

      await signOut(auth);

      router.replace("/login");
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );

      setIsLoggingOut(false);
    }
  }

  const userEmail =
    auth.currentUser?.email ??
    "Administrator";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-lg font-semibold">
        An-Nahl Management System
      </h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-700">
            Administrator
          </p>

          <p className="text-xs text-slate-500">
            {userEmail}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogOut className="h-4 w-4" />

          {isLoggingOut
            ? "Keluar..."
            : "Keluar"}
        </button>
      </div>
    </header>
  );
}