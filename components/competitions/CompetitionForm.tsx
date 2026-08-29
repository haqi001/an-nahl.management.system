"use client";

import { useState } from "react";

import {
  Competition,
} from "@/types/competition";

interface CompetitionFormProps {
  initialData?: Omit<Competition, "id">;

  onSubmit: (
    data: Omit<Competition, "id">
  ) => void;

  onCancel: () => void;
}

export default function CompetitionForm({
  initialData,
  onSubmit,
  onCancel,
}: CompetitionFormProps) {
  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [organizer, setOrganizer] =
    useState(
      initialData?.organizer ?? ""
    );

  const [deadline, setDeadline] =
    useState(
      initialData?.deadline ?? ""
    );

  const [category, setCategory] =
    useState(
      initialData?.category ?? ""
    );

  const [status, setStatus] =
    useState<
      "Active" | "Closed"
    >(
      initialData?.status ?? "Active"
    );

  const [description, setDescription] =
    useState(
      initialData?.description ?? ""
    );

  const [errors, setErrors] =
    useState({
      title: "",
      organizer: "",
      deadline: "",
      category: "",
    });

  function validateForm() {
    const newErrors = {
      title: "",
      organizer: "",
      deadline: "",
      category: "",
    };

    let isValid = true;

    if (!title.trim()) {
      newErrors.title =
        "Title is required.";

      isValid = false;
    }

    if (!organizer.trim()) {
      newErrors.organizer =
        "Organizer is required.";

      isValid = false;
    }

    if (!deadline) {
      newErrors.deadline =
        "Deadline is required.";

      isValid = false;
    }

    if (!category.trim()) {
      newErrors.category =
        "Category is required.";

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
      organizer,
      deadline,
      category,
      status,
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
          Organizer
        </label>

        <input
          type="text"
          value={organizer}
          onChange={(e) =>
            setOrganizer(e.target.value)
          }
          className={`w-full rounded-lg border p-2 ${
            errors.organizer
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />

        {errors.organizer && (
          <p className="mt-1 text-sm text-red-600">
            {errors.organizer}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Category
        </label>

        <input
          type="text"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          placeholder="Contoh: Arsitektur"
          className={`w-full rounded-lg border p-2 ${
            errors.category
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />

        {errors.category && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Deadline
        </label>

        <input
          type="date"
          value={deadline}
          onChange={(e) =>
            setDeadline(e.target.value)
          }
          className={`w-full rounded-lg border p-2 ${
            errors.deadline
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />

        {errors.deadline && (
          <p className="mt-1 text-sm text-red-600">
            {errors.deadline}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as
                | "Active"
                | "Closed"
            )
          }
          className="w-full rounded-lg border border-slate-300 p-2"
        >
          <option value="Active">
            Active
          </option>

          <option value="Closed">
            Closed
          </option>
        </select>
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
          placeholder="Deskripsi competition..."
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
          Save Competition
        </button>
      </div>
    </form>
  );
}