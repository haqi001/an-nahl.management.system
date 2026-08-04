import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold text-center">
          Tentang Himpunan
        </h2>

        <Card className="mt-8 p-8">

          <p className="text-gray-600 leading-8">
            Himpunan Mahasiswa Arsitektur An-Nahl merupakan organisasi
            mahasiswa di bawah Program Studi Arsitektur dan Fakultas Teknik
            yang berfokus pada pengembangan akademik, kreativitas,
            profesionalisme, serta kolaborasi antar mahasiswa.
          </p>

        </Card>

      </div>
    </section>
  );
}