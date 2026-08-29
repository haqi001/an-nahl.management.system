"use client";

import { useState } from "react";

import {
  CashFlow,
  CashFlowCategory,
} from "@/types/cashflow";

interface CashFlowFormProps {
  initialData?: Omit<CashFlow, "id">;

  onSubmit: (
    data: Omit<CashFlow, "id">
  ) => void;

  onCancel: () => void;
}

export default function CashFlowForm({
  initialData,
  onSubmit,
  onCancel,
}: CashFlowFormProps) {
  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [category, setCategory] =
    useState<CashFlowCategory>(
      initialData?.category ?? "Income"
    );

  const [amount, setAmount] = useState(
    initialData?.amount
      ? new Intl.NumberFormat("id-ID").format(
          initialData.amount
        )
      : ""
  );

  const [date, setDate] = useState(
    initialData?.date ?? ""
  );

  const [description, setDescription] =
    useState(
      initialData?.description ?? ""
    );

  const [errors, setErrors] =
    useState({
      title: "",
      amount: "",
      date: "",
    });

  function formatAmount(
    value: string
  ) {
    const numericValue =
      value.replace(/\D/g, "");

    if (!numericValue) {
      return "";
    }

    return new Intl.NumberFormat(
      "id-ID"
    ).format(
      Number(numericValue)
    );
  }

  function getNumericAmount() {
    return Number(
      amount.replace(/\./g, "")
    );
  }

  function validateForm() {
    const newErrors = {
      title: "",
      amount: "",
      date: "",
    };

    let isValid = true;

    if (!title.trim()) {
      newErrors.title =
        "Title is required.";

      isValid = false;
    }

    const numericAmount =
      getNumericAmount();

    if (!amount.trim()) {
      newErrors.amount =
        "Amount is required.";

      isValid = false;
    } else if (
      numericAmount <= 0
    ) {
      newErrors.amount =
        "Amount must be greater than zero.";

      isValid = false;
    }

    if (!date) {
      newErrors.date =
        "Date is required.";

      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  }

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      title,
      category,
      amount: getNumericAmount(),
      date,
      description,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className={`w-full rounded-lg border p-2 ${
            errors.title
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-600">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Category
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value as CashFlowCategory
            )
          }
          className="w-full rounded-lg border border-slate-300 p-2"
        >
          <option value="Income">
            Income
          </option>

          <option value="Expense">
            Expense
          </option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Amount
        </label>

        <input
          type="text"
          inputMode="numeric"
          value={amount}
          onChange={(e) =>
            setAmount(
              formatAmount(
                e.target.value
              )
            )
          }
          placeholder="Contoh: 1.500.000"
          className={`w-full rounded-lg border p-2 ${
            errors.amount
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />

        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">
            {errors.amount}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className={`w-full rounded-lg border p-2 ${
            errors.date
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />

        {errors.date && (
          <p className="mt-1 text-sm text-red-600">
            {errors.date}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Description
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-slate-300 p-2"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Save Cash Flow
        </button>
      </div>
    </form>
  );
}