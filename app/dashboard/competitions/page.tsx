import { getCompetitions } from "@/services/competition.service";

import CompetitionTable from "@/components/competitions/CompetitionTable";
import CompetitionModal from "@/components/competitions/CompetitionModal";

export default async function CompetitionsPage() {
  const competitions =
    await getCompetitions();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Competitions
          </h1>

          <p className="mt-2 text-slate-500">
            Kelola informasi sayembara dan
            kompetisi.
          </p>
        </div>

        <CompetitionModal />
      </div>

      <CompetitionTable
        competitions={competitions}
      />
    </div>
  );
}