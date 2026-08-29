import Link from "next/link";

export default function QuickActions() {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800">
        Quick Actions
      </h2>

      <div className="mt-4 grid gap-3">
        <Link
          href="/dashboard/members"
          className="rounded-lg bg-emerald-600 px-4 py-3 text-center text-white hover:bg-emerald-700"
        >
          + Tambah Member
        </Link>

        <Link
          href="/dashboard/timeline"
          className="rounded-lg bg-blue-600 px-4 py-3 text-center text-white hover:bg-blue-700"
        >
          + Tambah Event
        </Link>

        <Link
          href="/dashboard/cashflow"
          className="rounded-lg bg-orange-600 px-4 py-3 text-center text-white hover:bg-orange-700"
        >
          + Tambah Kas
        </Link>

        <Link
          href="/dashboard/competitions"
          className="rounded-lg bg-violet-600 px-4 py-3 text-center text-white hover:bg-violet-700"
        >
          + Tambah Competition
        </Link>

        <Link
          href="/dashboard/archive"
          className="rounded-lg bg-slate-700 px-4 py-3 text-center text-white hover:bg-slate-800"
        >
          + Upload Arsip
        </Link>
      </div>
    </div>
  );
}