interface ExpenseFormProps {
  title: string;
  amount: string;
  category: string;
  date: string;

  setTitle: (value: string) => void;
  setAmount: (value: string) => void;
  setCategory: (value: string) => void;
  setDate: (value: string) => void;

  searchTerm: string;
  setSearchTerm: (value: string) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  sortOption: string;
  setSortOption: (value: string) => void;

  onSubmit: () => void;
  isEditing: boolean;
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
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
  onSubmit,
  isEditing,
}: ExpenseFormProps) {
  return (
    <div className="bg-white rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? "Edit Expense" : "Add Expense"}
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
        {isEditing ? "Update Expense" : "Add Expense"}
      </button>

      <div className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded-lg p-2"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="amountHigh">Amount (High → Low)</option>
          <option value="amountLow">Amount (Low → High)</option>
          <option value="title">Title (A → Z)</option>
        </select>
      </div>
    </div>
  );
}