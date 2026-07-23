import { Expense } from "../types/expense";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/expenses`;

export async function getExpenses(): Promise<Expense[]> {
  const response = await fetch(API_URL);
  return response.json();
}

export async function createExpense(expense: Omit<Expense, "id">) {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
}

export async function deleteExpense(id: number) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

export async function updateExpense(
  id: number,
  expense: Omit<Expense, "id">
) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
}