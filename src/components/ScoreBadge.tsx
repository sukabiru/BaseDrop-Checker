export default function ScoreBadge({ score, tier }: { score: number; tier: "Low" | "Medium" | "High" }) {
  const color =
    tier === "High" ? "#16a34a" : tier === "Medium" ? "#f59e0b" : "#ef4444";
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 14px",
      borderRadius: 14,
      border: `1px solid ${color}33`,
      background: `${color}10`
    }}>
      <span style={{ fontSize: 28, fontWeight: 700 }}>{score}</span>
      <span style={{ color, fontWeight: 600 }}>{tier}</span>
    </div>
  );
}
