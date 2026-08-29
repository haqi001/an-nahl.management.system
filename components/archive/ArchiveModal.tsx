"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ArchiveForm from "./ArchiveForm";

export default function ArchiveModal() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  function handleSuccess() {
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
      >
        + Upload Arsip
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="flex max-h-[90vh] w-full max-w-[520px] flex-col rounded-xl bg-white shadow-xl">
            <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
              <h2 className="text-xl font-bold text-slate-800">
                Upload Archive
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
              <ArchiveForm
                onSuccess={handleSuccess}
                onCancel={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}