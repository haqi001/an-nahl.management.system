"use client";

import { useState } from "react";
import { Timeline } from "@/types/timeline";

interface TimelineFormProps {
  timeline?: Timeline;

  onSubmit: (data: {
    title: string;
    department: string;
    date: string;
    location: string;
    status: "Upcoming" | "Completed";
  }) => void;

  onCancel: () => void;
}

interface FormData {
  title: string;
  department: string;
  date: string;
  location: string;
  status: "Upcoming" | "Completed";
}

export default function TimelineForm({
  timeline,
  onSubmit,
  onCancel,
}: TimelineFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: timeline?.title ?? "",
    department: timeline?.department ?? "",
    date: timeline?.date ?? "",
    location: timeline?.location ?? "",
    status: timeline?.status ?? "Upcoming",
  });

  const [errors, setErrors] = useState({
    title: "",
    department: "",
    date: "",
    location: "",
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
      title: "",
      department: "",
      date: "",
      location: "",
    };

    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
      isValid = false;
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required.";
      isValid = false;
    }

    if (!formData.date) {
      newErrors.date = "Date is required.";
      isValid = false;
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
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
          Title
        </label>

        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            updateField("title", e.target.value)
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
          Department
        </label>

        <input
          type="text"
          value={formData.department}
          onChange={(e) =>
            updateField("department", e.target.value)
          }
          className={`w-full rounded-lg border p-2 ${
            errors.department
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />

        {errors.department && (
          <p className="mt-1 text-sm text-red-600">
            {errors.department}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Date
        </label>

        <input
          type="date"
          value={formData.date}
          onChange={(e) =>
            updateField("date", e.target.value)
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
          Location
        </label>

        <input
          type="text"
          value={formData.location}
          onChange={(e) =>
            updateField("location", e.target.value)
          }
          className={`w-full rounded-lg border p-2 ${
            errors.location
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />

        {errors.location && (
          <p className="mt-1 text-sm text-red-600">
            {errors.location}
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
              e.target.value as "Upcoming" | "Completed"
            )
          }
          className="w-full rounded-lg border border-slate-300 p-2"
        >
          <option value="Upcoming">
            Upcoming
          </option>

          <option value="Completed">
            Completed
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
          Save Timeline
        </button>
      </div>
    </form>
  );
}