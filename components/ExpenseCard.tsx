import { Expense } from "../types/expense";

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

export default function ExpenseCard({
  expense,
  onEdit,
  onDelete,
}: ExpenseCardProps) {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">
          {expense.title}
        </h3>

        <p className="text-gray-600">
          {expense.category}
        </p>

        <p className="text-sm text-gray-500">
          {expense.date}
        </p>
      </div>

      <div className="text-right">
        <div className="text-lg font-bold mb-2">
          ₹{expense.amount}
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={() => onEdit(expense)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(expense.id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}