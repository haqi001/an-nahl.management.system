"use client";

import { useMemo, useState } from "react";

import { Timeline } from "@/types/timeline";

import SearchInput from "@/components/common/SearchInput";
import TimelineTable from "./TimelineTable";

interface TimelineContentProps {
  timelines: Timeline[];
}

export default function TimelineContent({
  timelines,
}: TimelineContentProps) {
  const [search, setSearch] = useState("");

  const filteredTimelines = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return timelines;
    }

    return timelines.filter((timeline) => {
      return (
        timeline.title
          .toLowerCase()
          .includes(keyword) ||
        timeline.department
          .toLowerCase()
          .includes(keyword) ||
        timeline.location
          .toLowerCase()
          .includes(keyword) ||
        timeline.date
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [timelines, search]);

  return (
    <div className="space-y-6">
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search title, department, location, or date..."
      />

      <TimelineTable
        timelines={filteredTimelines}
      />
    </div>
  );
}