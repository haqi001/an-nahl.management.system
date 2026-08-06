export default function QuickActions() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-3">
        <button className="rounded-lg bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700">
          + Tambah Member
        </button>

        <button className="rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700">
          + Tambah Event
        </button>

        <button className="rounded-lg bg-orange-600 px-4 py-3 text-white hover:bg-orange-700">
          + Tambah Kas
        </button>

        <button className="rounded-lg bg-slate-700 px-4 py-3 text-white hover:bg-slate-800">
          + Upload Arsip
        </button>
      </div>
    </div>
  );
}