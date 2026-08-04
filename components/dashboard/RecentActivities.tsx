import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  "Anggota baru: Ahmad Fauzi",
  "Dokumen AD/ART diunggah",
  "Kas masuk Rp500.000",
  "Program Kerja Ramadhan diperbarui",
];

export default function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aktivitas Terbaru</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {activities.map((activity, index) => (
            <li
              key={index}
              className="border-b pb-2 text-sm text-slate-600 last:border-none"
            >
              {activity}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}