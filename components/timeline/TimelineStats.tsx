import StatCard from "@/components/common/StatCard";

import {
  CalendarDays,
  Clock3,
  CircleCheck,
  Building2,
} from "lucide-react";

import { Timeline } from "@/types/timeline";

interface TimelineStatsProps {
  timelines: Timeline[];
}

export default function TimelineStats({
  timelines,
}: TimelineStatsProps) {
  const totalTimeline = timelines.length;

  const upcoming = timelines.filter(
    (timeline) =>
      timeline.status === "Upcoming"
  ).length;

  const completed = timelines.filter(
    (timeline) =>
      timeline.status === "Completed"
  ).length;

  const departments = new Set(
    timelines.map(
      (timeline) => timeline.department
    )
  ).size;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Timeline"
        value={totalTimeline}
        description="Total agenda"
        icon={CalendarDays}
      />

      <StatCard
        title="Upcoming"
        value={upcoming}
        description="Agenda mendatang"
        icon={Clock3}
      />

      <StatCard
        title="Completed"
        value={completed}
        description="Agenda selesai"
        icon={CircleCheck}
      />

      <StatCard
        title="Departments"
        value={departments}
        description="Divisi aktif"
        icon={Building2}
      />
    </div>
  );
}