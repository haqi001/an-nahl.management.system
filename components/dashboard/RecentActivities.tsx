const activities = [
  {
    title: "Member baru ditambahkan",
    time: "10 menit yang lalu",
  },
  {
    title: "Pembayaran kas diterima",
    time: "30 menit yang lalu",
  },
  {
    title: "Agenda Pengajian dibuat",
    time: "1 jam yang lalu",
  },
  {
    title: "Dokumen arsip diunggah",
    time: "Kemarin",
  },
];

export default function RecentActivities() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Recent Activities
      </h2>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="border-b pb-3 last:border-none"
          >
            <p className="font-medium">
              {activity.title}
            </p>

            <p className="text-sm text-slate-500">
              {activity.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}