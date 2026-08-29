import { Timeline } from "@/types/timeline";

import TimelineModal from "./TimelineModal";
import DeleteTimelineModal from "./DeleteTimelineModal";

import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import FormatDate from "@/components/common/FormatDate";

interface TimelineTableProps {
  timelines: Timeline[];
}

export default function TimelineTable({
  timelines,
}: TimelineTableProps) {
  if (timelines.length === 0) {
    return (
      <EmptyState
        icon="📅"
        title="No Timeline Found"
        description="Click + Add Timeline to create your first agenda."
        action={<TimelineModal />}
      />
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
              Department
            </th>

            <th className="px-4 py-3 text-left">
              Date
            </th>

            <th className="px-4 py-3 text-left">
              Location
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
          {timelines.map((timeline) => (
            <tr
              key={timeline.id}
              className="border-t"
            >
              <td className="px-4 py-3">
                {timeline.title}
              </td>

              <td className="px-4 py-3">
                {timeline.department}
              </td>

              <td className="px-4 py-3">
                <FormatDate
                  date={timeline.date}
                />
              </td>

              <td className="px-4 py-3">
                {timeline.location}
              </td>

              <td className="px-4 py-3">
                <StatusBadge
                  status={timeline.status}
                />
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <TimelineModal
                    mode="edit"
                    timeline={timeline}
                  />

                  <DeleteTimelineModal
                    timeline={timeline}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}