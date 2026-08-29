interface StatusBadgeProps {
  status:
    | "Active"
    | "Inactive"
    | "Upcoming"
    | "Completed";
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles = {
    Active: {
      badge:
        "bg-emerald-100 text-emerald-700",
      dot: "bg-emerald-500",
    },

    Inactive: {
      badge:
        "bg-red-100 text-red-700",
      dot: "bg-red-500",
    },

    Upcoming: {
      badge:
        "bg-blue-100 text-blue-700",
      dot: "bg-blue-500",
    },

    Completed: {
      badge:
        "bg-emerald-100 text-emerald-700",
      dot: "bg-emerald-500",
    },
  };

  const currentStyle =
    styles[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${currentStyle.badge}`}
    >
      <span
        className={`mr-2 h-2 w-2 rounded-full ${currentStyle.dot}`}
      />

      {status}
    </span>
  );
}