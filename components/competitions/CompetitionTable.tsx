import { Competition } from "@/types/competition";

import CompetitionModal from "./CompetitionModal";
import CompetitionDelete from "./CompetitionDelete";

interface CompetitionTableProps {
  competitions: Competition[];
}

export default function CompetitionTable({
  competitions,
}: CompetitionTableProps) {
  if (competitions.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
        <div className="text-5xl">
          🏆
        </div>

        <h2 className="mt-4 text-xl font-bold text-slate-800">
          No Competitions Found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Belum ada competition yang
          tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">
              Title
            </th>

            <th className="px-4 py-3 text-left">
              Organizer
            </th>

            <th className="px-4 py-3 text-left">
              Category
            </th>

            <th className="px-4 py-3 text-left">
              Deadline
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>

            <th className="px-4 py-3 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {competitions.map(
            (competition) => (
              <tr
                key={competition.id}
                className="border-t"
              >
                <td className="px-4 py-3 font-medium">
                  {competition.title}
                </td>

                <td className="px-4 py-3">
                  {competition.organizer}
                </td>

                <td className="px-4 py-3">
                  {competition.category}
                </td>

                <td className="px-4 py-3">
                  {competition.deadline}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      competition.status ===
                      "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {competition.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <CompetitionModal
                      mode="edit"
                      competition={competition}
                    />

                    <CompetitionDelete
                      id={competition.id}
                      title={competition.title}
                    />
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}