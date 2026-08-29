import { CashFlow } from "@/types/cashflow";

import EmptyState from "@/components/common/EmptyState";
import FormatDate from "@/components/common/FormatDate";

import CashFlowModal from "./CashFlowModal";
import DeleteCashFlowModal from "./DeleteCashFlowModal";
import CashFlowCategoryBadge from "./CashFlowCategoryBadge";

interface CashFlowTableProps {
  cashFlows: CashFlow[];
}

export default function CashFlowTable({
  cashFlows,
}: CashFlowTableProps) {
  if (cashFlows.length === 0) {
    return (
      <EmptyState
        icon="💰"
        title="No Cash Flow Found"
        description="Click + Add Cash Flow to create your first transaction."
        action={<CashFlowModal />}
      />
    );
  }

  function formatCurrency(
    amount: number
  ) {
    return new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }
    ).format(amount);
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">
              Title
            </th>

            <th className="px-4 py-3 text-left">
              Category
            </th>

            <th className="px-4 py-3 text-left">
              Amount
            </th>

            <th className="px-4 py-3 text-left">
              Date
            </th>

            <th className="px-4 py-3 text-left">
              Description
            </th>

            <th className="px-4 py-3 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {cashFlows.map((cashFlow) => (
            <tr
              key={cashFlow.id}
              className="border-t"
            >
              <td className="px-4 py-3">
                {cashFlow.title}
              </td>

              <td className="px-4 py-3">
                <CashFlowCategoryBadge
                  category={cashFlow.category}
                />
              </td>

              <td className="px-4 py-3 font-medium">
                {formatCurrency(
                  cashFlow.amount
                )}
              </td>

              <td className="px-4 py-3">
                <FormatDate
                  date={cashFlow.date}
                />
              </td>

              <td className="px-4 py-3">
                {cashFlow.description}
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <CashFlowModal
                    mode="edit"
                    cashFlow={cashFlow}
                  />

                  <DeleteCashFlowModal
                    cashFlow={cashFlow}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}