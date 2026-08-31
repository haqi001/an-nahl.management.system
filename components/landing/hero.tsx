import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Hero() {
  return (
    <section className="flex items-center justify-center px-6 py-24">
      <Card className="w-full max-w-4xl rounded-2xl p-10 text-center shadow-xl">
        <h1 className="text-5xl font-bold text-emerald-800">
          An-Nahl Management System
        </h1>

        <p className="mt-5 text-lg text-gray-600">
          Sistem Informasi Himpunan Mahasiswa Arsitektur An-Nahl
        </p>

        <p className="mt-3 text-gray-500">
          Kelola organisasi lebih mudah, transparan, dan terstruktur.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/login">
            <Button size="lg">
              Masuk
            </Button>
          </Link>

          <Button variant="outline" size="lg">
            Informasi Publik
          </Button>
        </div>
      </Card>
    </section>
  );
}