"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/firebase/config";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Login error:", error);

      const firebaseError =
        error as {
          code?: string;
        };

      switch (firebaseError.code) {
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError(
            "Email atau password tidak benar."
          );
          break;

        case "auth/invalid-email":
          setError(
            "Format email tidak valid."
          );
          break;

        case "auth/too-many-requests":
          setError(
            "Terlalu banyak percobaan login. Silakan coba lagi nanti."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Tidak dapat terhubung ke Firebase. Periksa koneksi internet."
          );
          break;

        default:
          setError(
            "Login gagal. Silakan periksa kembali email dan password."
          );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <Card className="w-full max-w-md rounded-2xl p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-800">
            An-Nahl Management System
          </h1>

          <p className="mt-3 text-gray-500">
            Masuk ke sistem manajemen organisasi.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="nama@email.com"
              autoComplete="email"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Masukkan password"
              autoComplete="current-password"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Memproses..."
              : "Masuk"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-emerald-700"
          >
            ← Kembali ke beranda
          </Link>
        </div>
      </Card>
    </main>
  );
}