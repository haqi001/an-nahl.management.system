"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import DeleteModal from "@/components/common/DeleteModal";

import { deleteTimeline } from "@/services/timeline.service";
import { Timeline } from "@/types/timeline";

interface DeleteTimelineModalProps {
  timeline: Timeline;
}

export default function DeleteTimelineModal({
  timeline,
}: DeleteTimelineModalProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      await deleteTimeline(timeline.id);

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Failed to delete timeline.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>

      <DeleteModal
        open={open}
        title="Delete Timeline"
        message={`Are you sure you want to delete "${timeline.title}"?`}
        loading={loading}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}