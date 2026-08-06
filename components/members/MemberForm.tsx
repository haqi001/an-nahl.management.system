"use client";

import { useState } from "react";
import { Member } from "@/types/member";

interface MemberFormProps {
  member?: Member;

  onSubmit: (data: {
    name: string;
    nim: string;
    division: string;
    status: string;
  }) => void;

  onCancel: () => void;
}

interface FormData {
  name: string;
  nim: string;
  division: string;
  status: "Active" | "Inactive";
}

export default function MemberForm({
  member,
  onSubmit,
  onCancel,
}: MemberFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: member?.name ?? "",
    nim: member?.nim ?? "",
    division: member?.division ?? "",
    status: member?.status ?? "Active",
  });

  const [errors, setErrors] = useState({
    name: "",
    nim: "",
    division: "",
  });

  function updateField<K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function validateForm() {
    const newErrors = {
      name: "",
      nim: "",
      division: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
      isValid = false;
    }

    if (!formData.nim.trim()) {
      newErrors.nim = "NIM is required.";
      isValid = false;
    }

    if (!formData.division.trim()) {
      newErrors.division = "Division is required.";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          Full Name
        </label>

        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            updateField("name", e.target.value)
          }
          className={`w-full rounded-lg border p-2 ${
            errors.name
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          NIM
        </label>

        <input
          type="text"
          value={formData.nim}
          onChange={(e) =>
            updateField("nim", e.target.value)
          }
          className={`w-full rounded-lg border p-2 ${
            errors.nim
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />

        {errors.nim && (
          <p className="mt-1 text-sm text-red-600">
            {errors.nim}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Division
        </label>

        <input
          type="text"
          value={formData.division}
          onChange={(e) =>
            updateField("division", e.target.value)
          }
          className={`w-full rounded-lg border p-2 ${
            errors.division
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />

        {errors.division && (
          <p className="mt-1 text-sm text-red-600">
            {errors.division}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Status
        </label>

        <select
          value={formData.status}
          onChange={(e) =>
            updateField(
              "status",
              e.target.value as "Active" | "Inactive"
            )
          }
          className="w-full rounded-lg border border-slate-300 p-2"
        >
          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>
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
          Save Member
        </button>
      </div>
    </form>
  );
}