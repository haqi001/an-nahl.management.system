"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteCashFlow } from "@/services/cashflow.service";
import { CashFlow } from "@/types/cashflow";

interface DeleteCashFlowModalProps {
  cashFlow: CashFlow;
}

export default function DeleteCashFlowModal({
  cashFlow,
}: DeleteCashFlowModalProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      await deleteCashFlow(
        cashFlow.id
      );

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete cash flow."
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
        className="text-red-600 hover:underline"
      >
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[420px] rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold">
              Delete Cash Flow
            </h2>

            <p className="text-slate-600">
              Are you sure you want to delete
              <span className="font-semibold">
                {" "}
                {cashFlow.title}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-red-500">
              This action cannot be undone.
            </p>

            <div className="mt-8 flex justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                disabled={loading}
                className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}