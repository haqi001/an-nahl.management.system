"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import MemberForm from "./MemberForm";

import {
  createMember,
  updateMember,
} from "@/services/member.service";

import { Member } from "@/types/member";

interface MemberModalProps {
  mode?: "create" | "edit";
  member?: Member;
}

export default function MemberModal({
  mode = "create",
  member,
}: MemberModalProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  async function handleSubmit(data: {
    name: string;
    nim: string;
    division: string;
    status: string;
  }) {
    try {
      if (mode === "edit" && member) {
        await updateMember(member.id, data);
      } else {
        await createMember(data);
      }

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save member.");
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
          : "+ Add Member"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[500px] rounded-xl bg-white p-6 shadow-xl">

            <h2 className="mb-6 text-xl font-bold">
              {mode === "edit"
                ? "Edit Member"
                : "Add Member"}
            </h2>

            <MemberForm
              member={member}
              onSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
            />

          </div>
        </div>
      )}
    </>
  );
}