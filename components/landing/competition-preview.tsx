import { Card } from "@/components/ui/card";

export default function CompetitionPreview() {
  return (
    <section className="py-20 px-6 bg-white">

      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold text-center">
          Sayembara Terbaru
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <Card className="p-6">
            <h3 className="font-semibold">
              Sayembara Desain Pavilion
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Deadline: 30 Agustus 2026
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold">
              Lomba Desain Interior
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Deadline: 5 September 2026
            </p>
          </Card>

        </div>

      </div>

    </section>
  );
}