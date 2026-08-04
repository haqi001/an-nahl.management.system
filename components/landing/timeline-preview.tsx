import { Card } from "@/components/ui/card";

export default function TimelinePreview() {
  return (
    <section className="py-20 px-6 bg-slate-50">

      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold text-center">
          Timeline Terdekat
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <Card className="p-6">
            <h3 className="font-semibold">Seminar Arsitektur</h3>
            <p className="text-sm text-gray-500 mt-2">
              15 Agustus 2026
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold">Workshop SketchUp</h3>
            <p className="text-sm text-gray-500 mt-2">
              20 Agustus 2026
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold">Deadline LPJ</h3>
            <p className="text-sm text-gray-500 mt-2">
              25 Agustus 2026
            </p>
          </Card>

        </div>

      </div>

    </section>
  );
}