"use client";

import { useState } from "react";

import { ArchiveCategory } from "@/types/archive";

interface ArchiveFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const MAX_FILE_SIZE = 500 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".jpg",
  ".jpeg",
  ".png",
  ".dwg",
  ".skp",
  ".zip",
  ".rar",
];

export default function ArchiveForm({
  onSuccess,
  onCancel,
}: ArchiveFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState<ArchiveCategory>("Document");
  const [description, setDescription] =
    useState("");
  const [file, setFile] =
    useState<File | null>(null);

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    file: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  function validateForm() {
    const newErrors = {
      title: "",
      category: "",
      file: "",
    };

    let isValid = true;

    if (!title.trim()) {
      newErrors.title =
        "Title is required.";
      isValid = false;
    }

    if (!category) {
      newErrors.category =
        "Category is required.";
      isValid = false;
    }

    if (!file) {
      newErrors.file =
        "File is required.";
      isValid = false;
    } else {
      if (file.size > MAX_FILE_SIZE) {
        newErrors.file =
          "File size must not exceed 500 MB.";
        isValid = false;
      }

      const extension =
        "." +
        file.name
          .split(".")
          .pop()
          ?.toLowerCase();

      if (
        !ALLOWED_EXTENSIONS.includes(
          extension
        )
      ) {
        newErrors.file =
          "File type is not supported.";
        isValid = false;
      }
    }

    setErrors(newErrors);

    return isValid;
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!validateForm() || !file) {
      return;
    }

    try {
      setLoading(true);
      setProgress(0);

      const formData = new FormData();

      formData.append("file", file);

      /*
       * Simpan metadata sementara.
       * Nanti akan dikirim ke Firestore
       * setelah upload Google Drive berhasil.
       */
      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "category",
        category
      );

      formData.append(
        "description",
        description.trim()
      );

      const xhr = new XMLHttpRequest();

      xhr.open(
        "POST",
        "/api/google/drive/upload"
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round(
            (event.loaded / event.total) *
              100
          );

          setProgress(percent);
        }
      };

      xhr.onload = () => {
        try {
          const response =
            JSON.parse(
              xhr.responseText
            );

          if (
            xhr.status >= 200 &&
            xhr.status < 300 &&
            response.success
          ) {
            setProgress(100);

            onSuccess();
            return;
          }

          alert(
            response.error ??
              "Failed to upload archive."
          );
        } catch {
          alert(
            "Failed to process upload response."
          );
        } finally {
          setLoading(false);
        }
      };

      xhr.onerror = () => {
        alert(
          "Network error while uploading file."
        );

        setLoading(false);
        setProgress(0);
      };

      xhr.onabort = () => {
        setLoading(false);
        setProgress(0);
      };

      xhr.send(formData);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to upload archive."
      );

      setLoading(false);
      setProgress(0);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          disabled={loading}
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
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Category
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target
                .value as ArchiveCategory
            )
          }
          disabled={loading}
          className={`w-full rounded-lg border p-2 ${
            errors.category
              ? "border-red-500"
              : "border-slate-300"
          }`}
        >
          <option value="Correspondence">
            Correspondence
          </option>

          <option value="Document">
            Document
          </option>

          <option value="Asset">
            Asset
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        {errors.category && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
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
          disabled={loading}
          placeholder="Deskripsi arsip..."
          className="w-full rounded-lg border border-slate-300 p-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          File
        </label>

        <input
          type="file"
          accept={ALLOWED_EXTENSIONS.join(
            ","
          )}
          onChange={(e) =>
            setFile(
              e.target.files?.[0] ??
                null
            )
          }
          disabled={loading}
          className={`w-full rounded-lg border p-2 ${
            errors.file
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />

        <p className="mt-1 text-xs text-slate-500">
          Maksimal 500 MB.
          <br />
          PDF, DOC, DOCX, XLS, XLSX,
          PPT, PPTX, JPG, JPEG, PNG,
          DWG, SKP, ZIP, atau RAR.
        </p>

        {file && (
          <p className="mt-1 text-xs text-slate-600">
            Selected:{" "}
            <strong>
              {file.name}
            </strong>
          </p>
        )}

        {errors.file && (
          <p className="mt-1 text-sm text-red-600">
            {errors.file}
          </p>
        )}
      </div>

      {loading && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-600">
            <span>
              Uploading...
            </span>

            <span>
              {progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? `Uploading ${progress}%`
            : "Upload Archive"}
        </button>
      </div>
    </form>
  );
}