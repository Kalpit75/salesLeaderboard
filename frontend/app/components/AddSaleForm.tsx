"use client";

import { useState } from "react";

interface AddSaleFormProps {
  onAdd: () => void;
}

export default function AddSaleForm({ onAdd }: AddSaleFormProps) {
  const [agentName, setAgentName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [deals, setDeals] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentName, amount: Number(amount), deals: Number(deals) }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to add sale");
      }

      setAgentName("");
      setAmount("");
      setDeals("");
      onAdd();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Agent Name"
        value={agentName}
        onChange={(e) => setAgentName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Deals"
        value={deals}
        onChange={(e) => setDeals(Number(e.target.value))}
        required
      />
      <button type="submit">Add Sale</button>
      {error && <div className="error-text">{error}</div>}
    </form>
  );
}
