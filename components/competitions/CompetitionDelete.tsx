"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import DeleteModal from "@/components/common/DeleteModal";

import { deleteCompetition } from "@/services/competition.service";

interface CompetitionDeleteProps {
  id: string;
  title: string;
}

export default function CompetitionDelete({
  id,
  title,
}: CompetitionDeleteProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      await deleteCompetition(id);

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Failed to delete competition.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>

      <DeleteModal
        open={open}
        title="Delete Competition"
        message={`Are you sure you want to delete "${title}"?`}
        loading={loading}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}