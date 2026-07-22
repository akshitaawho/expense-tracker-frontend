interface DashboardCardsProps {
  totalExpenses: number;
  totalEntries: number;
  highestExpense: number;
}

export default function DashboardCards({
  totalExpenses,
  totalEntries,
  highestExpense,
}: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-gray-500 text-sm mb-2">
          Total Expenses
        </h3>

        <p className="text-3xl font-bold text-blue-600">
          ₹{totalExpenses.toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-gray-500 text-sm mb-2">
          Total Entries
        </h3>

        <p className="text-3xl font-bold text-green-600">
          {totalEntries}
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-gray-500 text-sm mb-2">
          Highest Expense
        </h3>

        <p className="text-3xl font-bold text-red-600">
          ₹{highestExpense.toFixed(2)}
        </p>
      </div>
    </div>
  );
}