"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import DeleteModal from "@/components/common/DeleteModal";

interface ArchiveDeleteProps {
  id: string;
  title: string;
  storagePath: string;
}

export default function ArchiveDelete({
  id,
  title,
}: ArchiveDeleteProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/google/drive/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            archiveId: id,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ??
            "Failed to delete archive."
        );
      }

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(
        "Delete archive error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete archive."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={loading}
        className="text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
      >
        Delete
      </button>

      <DeleteModal
        open={open}
        title="Delete Archive"
        message={`Are you sure you want to delete "${title}"?`}
        loading={loading}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}