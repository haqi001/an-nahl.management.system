import { CashFlowCategory } from "@/types/cashflow";

interface CashFlowCategoryBadgeProps {
  category: CashFlowCategory;
}

export default function CashFlowCategoryBadge({
  category,
}: CashFlowCategoryBadgeProps) {
  const isIncome =
    category === "Income";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        isIncome
          ? "bg-emerald-100 text-emerald-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      <span
        className={`mr-2 h-2 w-2 rounded-full ${
          isIncome
            ? "bg-emerald-500"
            : "bg-red-500"
        }`}
      />

      {category}
    </span>
  );
}