import TimelineModal from "@/components/timeline/TimelineModal";
import TimelineContent from "@/components/timeline/TimelineContent";
import TimelineStats from "@/components/timeline/TimelineStats";

import { getTimeline } from "@/services/timeline.service";

export default async function TimelinePage() {
  const timelines = await getTimeline();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Timeline
          </h1>

          <p className="text-slate-500">
            Kelola agenda dan kegiatan An-Nahl.
          </p>
        </div>

        <TimelineModal />
      </div>

      <TimelineStats
        timelines={timelines}
      />

      <TimelineContent
        timelines={timelines}
      />
    </div>
  );
}