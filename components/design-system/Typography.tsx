export default function Typography() {
  return (
    <div className="space-y-6">

      <div>
        <p className="text-sm text-slate-500">Display</p>
        <h1 className="text-5xl font-bold text-slate-900">
          An-Nahl Management System
        </h1>
      </div>

      <div>
        <p className="text-sm text-slate-500">Heading 1</p>
        <h1 className="text-4xl font-bold">
          Dashboard Organisasi
        </h1>
      </div>

      <div>
        <p className="text-sm text-slate-500">Heading 2</p>
        <h2 className="text-3xl font-semibold">
          Statistik Keanggotaan
        </h2>
      </div>

      <div>
        <p className="text-sm text-slate-500">Heading 3</p>
        <h3 className="text-2xl font-semibold">
          Timeline Kegiatan
        </h3>
      </div>

      <div>
        <p className="text-sm text-slate-500">Body</p>
        <p className="text-base text-slate-700">
          AMS adalah sistem informasi yang digunakan untuk
          mengelola organisasi An-Nahl secara terintegrasi,
          mulai dari anggota, arsip, cash flow, hingga
          kompetisi.
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Caption</p>
        <p className="text-sm text-slate-500">
          Last updated 5 August 2026
        </p>
      </div>

    </div>
  );
}