interface StatusBadgeProps {
  status: "Active" | "Inactive";
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        isActive
          ? "bg-emerald-100 text-emerald-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      <span
        className={`mr-2 h-2 w-2 rounded-full ${
          isActive
            ? "bg-emerald-500"
            : "bg-red-500"
        }`}
      />

      {status}
    </span>
  );
}