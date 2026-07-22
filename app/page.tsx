"use client";

import { useEffect, useState } from "react";
import { Expense } from "../types/expense";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const fetchExpenses = () => {
    fetch("http://localhost:8080/expenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error(error));
  };

  const addExpense = async () => {
    const expense = {
      title,
      amount: Number(amount),
      category,
      date,
    };

    try {
      await fetch("http://localhost:8080/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
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

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-2">
          Expense Tracker
        </h1>

        <p className="text-gray-600 mb-8">
          Manage your daily expenses
        </p>

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
            onClick={addExpense}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Add Expense
          </button>
        </div>

        <div className="bg-white rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            Expenses
          </h2>

          {expenses.length === 0 ? (
            <p>No expenses yet.</p>
          ) : (
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{expense.title}</h3>

                    <p className="text-gray-600">
                      {expense.category}
                    </p>

                    <p className="text-sm text-gray-500">
                      {expense.date}
                    </p>
                  </div>

                  <div className="text-lg font-bold">
                    ₹{expense.amount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}