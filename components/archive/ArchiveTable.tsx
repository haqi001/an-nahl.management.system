import { Archive } from "@/types/archive";

import ArchiveDelete from "./ArchiveDelete";

interface ArchiveTableProps {
  archives: Archive[];
}

export default function ArchiveTable({
  archives,
}: ArchiveTableProps) {
  if (archives.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-500">
          Belum ada archive.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Description
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                File
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Date
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {archives.map((archive) => (
              <tr
                key={archive.id}
                className="hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-800">
                    {archive.title}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    {archive.category}
                  </span>
                </td>

                <td className="max-w-[280px] px-6 py-4">
                  <p className="truncate text-sm text-slate-500">
                    {archive.description || "-"}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <div className="max-w-[220px]">
                    <p
                      className="truncate text-sm font-medium text-slate-700"
                      title={archive.fileName}
                    >
                      {archive.fileName}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-500">
                  {new Date(
                    archive.createdAt
                  ).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <a
                      href={archive.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Open
                    </a>

                    <ArchiveDelete
                      id={archive.id}
                      title={archive.title}
                      storagePath={
                        archive.storagePath
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}