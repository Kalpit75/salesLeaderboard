"use client";

interface LeaderboardProps {
  data: { rank: number; agentName: string; totalAmount: number; totalDeals: number }[];
}

export default function Leaderboard({ data }: LeaderboardProps) {
  return (
    <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Agent Name</th>
          <th>Total Amount</th>
          <th>Total Deals</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.agentName}>
            <td>{item.rank}</td>
            <td>{item.agentName}</td>
            <td>{item.totalAmount}</td>
            <td>{item.totalDeals}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
