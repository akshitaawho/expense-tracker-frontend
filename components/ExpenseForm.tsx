interface ExpenseFormProps {
  title: string;
  amount: string;
  category: string;
  date: string;

  setTitle: (value: string) => void;
  setAmount: (value: string) => void;
  setCategory: (value: string) => void;
  setDate: (value: string) => void;

  onSubmit: () => void;
}

export default function ExpenseForm({
  title,
  amount,
  category,
  date,
  setTitle,
  setAmount,
  setCategory,
  setDate,
  onSubmit,
}: ExpenseFormProps) {
  return (
    <div className="bg-white rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Add Expense
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-lg p-2"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded-lg p-2"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg p-2"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-lg p-2"
        />
      </div>

      <button
        onClick={onSubmit}
        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        Add Expense
      </button>
    </div>
  );
}