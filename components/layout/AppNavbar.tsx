"use client";

import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase/config";
import { Button } from "@/components/ui/button";

export default function AppNavbar() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return unsubscribe;
  }, []);

  async function handleLogout() {
    setLoading(true);

    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  }

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
            {user?.email ?? "User"}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Keluar..." : "Keluar"}
        </Button>
      </div>
    </header>
  );
}