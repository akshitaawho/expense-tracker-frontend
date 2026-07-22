"use client";

import { useEffect, useState } from "react";
import { Expense } from "../types/expense";
import ExpenseCard from "../components/ExpenseCard";
import ExpenseForm from "../components/ExpenseForm";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      const expense = {
        title,
        amount: Number(amount),
        category,
        date,
      };

      if (editingId !== null) {
        await updateExpense(editingId, expense);
      } else {
        await createExpense(expense);
      }

      clearForm();
      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingId(expense.id);
    setTitle(expense.title);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
    setDate(expense.date);
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await deleteExpense(id);

      if (editingId === id) {
        clearForm();
      }

      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      expense.category.toLowerCase() ===
        selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-2">
          Expense Tracker
        </h1>

        <p className="text-gray-600 mb-8">
          Manage your daily expenses
        </p>

        <ExpenseForm
          title={title}
          amount={amount}
          category={category}
          date={date}
          setTitle={setTitle}
          setAmount={setAmount}
          setCategory={setCategory}
          setDate={setDate}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onSubmit={handleSubmit}
          isEditing={editingId !== null}
        />

        <div className="bg-white rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            Expenses
          </h2>

          {filteredExpenses.length === 0 ? (
            <p>
              {expenses.length === 0
                ? "No expenses yet."
                : "No matching expenses found."}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredExpenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onEdit={handleEditExpense}
                  onDelete={handleDeleteExpense}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}