"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Member } from "@/types/member";
import { deleteMember } from "@/services/member.service";

interface DeleteMemberModalProps {
  member: Member;
}

export default function DeleteMemberModal({
  member,
}: DeleteMemberModalProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      await deleteMember(member.id);

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete member.");
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

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[420px] rounded-xl bg-white p-6 shadow-xl">

            <h2 className="mb-4 text-xl font-bold">
              Delete Member
            </h2>

            <p className="text-slate-600">
              Are you sure you want to delete
              <span className="font-semibold">
                {" "}
                {member.name}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-red-500">
              This action cannot be undone.
            </p>

            <div className="mt-8 flex justify-end gap-2">

              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}