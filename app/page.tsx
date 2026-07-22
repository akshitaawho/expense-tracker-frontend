"use client";

import { useEffect, useState } from "react";
import { Expense } from "../types/expense";
import ExpenseCard from "../components/ExpenseCard";
import ExpenseForm from "../components/ExpenseForm";
import {
  getExpenses,
  createExpense,
  deleteExpense,
} from "../services/expenseService";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async () => {
    try {
      await createExpense({
        title,
        amount: Number(amount),
        category,
        date,
      });

      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");

      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

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
          onSubmit={addExpense}
        />

        <div className="bg-white rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            Expenses
          </h2>

          {expenses.length === 0 ? (
            <p>No expenses yet.</p>
          ) : (
            <div className="space-y-4">
              {expenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
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