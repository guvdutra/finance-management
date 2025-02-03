"use client";
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [form, setForm] = useState({ description: "", amount: "", type: "income", date: "" });

  useEffect(() => {
    fetch("http://localhost:3001/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedAmount = parseFloat(form.amount.replace(/,/g, '.'));
    const response = await fetch("http://localhost:3001/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, amount: formattedAmount }),
    });

    if (response.ok) {
      const newTransaction = await response.json();
      setTransactions([...transactions, newTransaction]);
      setForm({ description: "", amount: "", type: "income", date: "" });
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:3001/api/transactions/${id}`, {
      method: "DELETE",
    });
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const formatCurrency = (value: string) => {
    let number = value.replace(/[^0-9,]/g, '').replace(/,/g, '.');
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(parseFloat(number) || 0);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Sistema de Gestão Financeira</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 border p-4 rounded-lg">
        <input type="text" placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border p-2 rounded text-gray-800" />
        <input type="text" placeholder="Valor" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="border p-2 rounded text-gray-800" />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "income" | "expense" })} className="border p-2 rounded text-gray-800">
          <option value="income">Entrada</option>
          <option value="expense">Saída</option>
        </select>
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="border p-2 rounded text-gray-800" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Adicionar</button>
      </form>

      <ul className="mt-6 space-y-2">
        {transactions.map((t) => (
          <li key={t.id} className="border p-2 rounded flex justify-between">
            <span>{t.description} - {formatCurrency(t.amount.toString())}</span>
            <div className="flex gap-2">
              <span className={t.type === "income" ? "text-green-500" : "text-red-500"}>{t.type === "income" ? "↑" : "↓"}</span>
              <button onClick={() => handleDelete(t.id)} className="bg-red-500 text-white px-2 rounded">X</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}