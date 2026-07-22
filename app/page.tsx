"use client";

import { useEffect, useState } from "react";
import { Expense } from "../types/expense";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/expenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error(error));
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