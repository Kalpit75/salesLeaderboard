"use client";

import { useState, useEffect } from "react";
import AddSaleForm from "./components/AddSaleForm";
import Leaderboard from "./components/Leaderboard";

export default function Home() {
  const [leaderboard, setLeaderboard] = useState<
    { rank: number; agentName: string; totalAmount: number; totalDeals: number }[]
  >([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard`);
      const data = await res.json();
      setLeaderboard(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Sales Leaderboard</h1>
      <AddSaleForm onAdd={fetchLeaderboard} />
      <Leaderboard data={leaderboard} />
    </main>
  );
}
