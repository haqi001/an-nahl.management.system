"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CashFlowForm from "./CashFlowForm";

import {
  createCashFlow,
  updateCashFlow,
} from "@/services/cashflow.service";

import { CashFlow } from "@/types/cashflow";

interface CashFlowModalProps {
  mode?: "create" | "edit";
  cashFlow?: CashFlow;
}

export default function CashFlowModal({
  mode = "create",
  cashFlow,
}: CashFlowModalProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    data: Omit<CashFlow, "id">
  ) {
    try {
      setLoading(true);

      if (
        mode === "edit" &&
        cashFlow
      ) {
        await updateCashFlow(
          cashFlow.id,
          data
        );
      } else {
        await createCashFlow(data);
      }

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        `Failed to ${
          mode === "edit"
            ? "update"
            : "save"
        } cash flow.`
      );
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
          ? "+ Add Cash Flow"
          : "Edit"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[600px] rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold">
              {mode === "create"
                ? "Add Cash Flow"
                : "Edit Cash Flow"}
            </h2>

            <CashFlowForm
              initialData={
                cashFlow
                  ? {
                      title:
                        cashFlow.title,
                      category:
                        cashFlow.category,
                      amount:
                        cashFlow.amount,
                      date:
                        cashFlow.date,
                      description:
                        cashFlow.description,
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
      )}
    </>
  );
}