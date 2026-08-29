import CashFlowTable from "@/components/cashflow/CashFlowTable";
import CashFlowModal from "@/components/cashflow/CashFlowModal";
import CashFlowSummary from "@/components/cashflow/CashFlowSummary";

import { getCashFlows } from "@/services/cashflow.service";

export default async function CashFlowPage() {
  const cashFlows = await getCashFlows();

  const totalIncome = cashFlows
    .filter(
      (cashFlow) =>
        cashFlow.category === "Income"
    )
    .reduce(
      (total, cashFlow) =>
        total + cashFlow.amount,
      0
    );

  const totalExpense = cashFlows
    .filter(
      (cashFlow) =>
        cashFlow.category === "Expense"
    )
    .reduce(
      (total, cashFlow) =>
        total + cashFlow.amount,
      0
    );

  const balance =
    totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Cash Flow
          </h1>

          <p className="text-slate-500">
            Kelola pemasukan dan pengeluaran
            An-Nahl.
          </p>
        </div>

        <CashFlowModal />
      </div>

      {/* Summary */}
      <CashFlowSummary
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
      />

      {/* Table */}
      <CashFlowTable
        cashFlows={cashFlows}
      />
    </div>
  );
}