"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CompetitionForm from "./CompetitionForm";

import {
  createCompetition,
  updateCompetition,
} from "@/services/competition.service";

import { Competition } from "@/types/competition";

interface CompetitionModalProps {
  mode?: "create" | "edit";
  competition?: Competition;
}

export default function CompetitionModal({
  mode = "create",
  competition,
}: CompetitionModalProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    data: Omit<Competition, "id">
  ) {
    try {
      setLoading(true);

      if (mode === "edit" && competition) {
        await updateCompetition(
          competition.id,
          data
        );
      } else {
        await createCompetition(data);
      }

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Failed to save competition.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          mode === "create"
            ? "rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            : "text-blue-600 hover:underline"
        }
      >
        {mode === "create"
          ? "+ Add Competition"
          : "Edit"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="flex max-h-[90vh] w-full max-w-[520px] flex-col rounded-xl bg-white shadow-xl">

            <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
              <h2 className="text-xl font-bold">
                {mode === "edit"
                  ? "Edit Competition"
                  : "Add Competition"}
              </h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xl text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-5">
              <CompetitionForm
                initialData={
                  mode === "edit" &&
                  competition
                    ? {
                        title: competition.title,
                        organizer:
                          competition.organizer,
                        deadline:
                          competition.deadline,
                        category:
                          competition.category,
                        status:
                          competition.status,
                        description:
                          competition.description,
                      }
                    : undefined
                }
                onSubmit={handleSubmit}
                onCancel={() =>
                  setOpen(false)
                }
              />

              {loading && (
                <p className="mt-4 text-sm text-slate-500">
                  Saving...
                </p>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}