import { getArchives } from "@/services/archive.service";

import ArchiveTable from "@/components/archive/ArchiveTable";
import ArchiveModal from "@/components/archive/ArchiveModal";

export default async function ArchivePage() {
  const archives = await getArchives();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Archive
          </h1>

          <p className="mt-2 text-slate-500">
            Kelola dokumen dan aset organisasi.
          </p>
        </div>

        <ArchiveModal />
      </div>

      <ArchiveTable
        archives={archives}
      />
    </div>
  );
}