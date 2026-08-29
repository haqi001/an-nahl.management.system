interface CashFlowSummaryProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export default function CashFlowSummary({
  totalIncome,
  totalExpense,
  balance,
}: CashFlowSummaryProps) {
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
    <div className="grid gap-4 md:grid-cols-3">
      {/* Total Income */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">
          Total Income
        </p>

        <p className="mt-2 text-2xl font-bold text-emerald-600">
          {formatCurrency(
            totalIncome
          )}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Total pemasukan
        </p>
      </div>

      {/* Total Expense */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">
          Total Expense
        </p>

        <p className="mt-2 text-2xl font-bold text-red-600">
          {formatCurrency(
            totalExpense
          )}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Total pengeluaran
        </p>
      </div>

      {/* Balance */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">
          Balance
        </p>

        <p
          className={`mt-2 text-2xl font-bold ${
            balance >= 0
              ? "text-blue-600"
              : "text-red-600"
          }`}
        >
          {formatCurrency(balance)}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Saldo akhir
        </p>
      </div>
    </div>
  );
}