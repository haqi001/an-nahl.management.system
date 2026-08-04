import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Hero() {
  return (
    <section className="flex items-center justify-center py-24 px-6">
      <Card className="max-w-4xl w-full p-10 text-center shadow-xl rounded-2xl">

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

          <Button size="lg">
            Masuk
          </Button>

          <Button variant="outline" size="lg">
            Informasi Publik
          </Button>

        </div>

      </Card>
    </section>
  );
}