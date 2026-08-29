"use client";

import { useState } from "react";

import { Timeline } from "@/types/timeline";
import TimelineForm from "./TimelineForm";

import {
  createTimeline,
  updateTimeline,
} from "@/services/timeline.service";

interface TimelineModalProps {
  mode?: "create" | "edit";
  timeline?: Timeline;
}

export default function TimelineModal({
  mode = "create",
  timeline,
}: TimelineModalProps) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(data: {
    title: string;
    department: string;
    date: string;
    location: string;
    status: "Upcoming" | "Completed";
  }) {
    try {
      if (mode === "edit" && timeline) {
        await updateTimeline(
          timeline.id,
          data
        );
      } else {
        await createTimeline(data);
      }

      setOpen(false);

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to save timeline.");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          mode === "edit"
            ? "text-blue-600 hover:underline"
            : "rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        }
      >
        {mode === "edit"
          ? "Edit"
          : "+ Add Timeline"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[600px] rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-6 text-xl font-bold">
              {mode === "edit"
                ? "Edit Timeline"
                : "Add Timeline"}
            </h2>

            <TimelineForm
              timeline={timeline}
              onSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}