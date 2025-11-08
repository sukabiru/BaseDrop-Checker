export function MetricCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      padding: 12
    }}>
      <div style={{ fontSize: 12, color: "#6b7280" }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 600 }}>{value}</div>
      {hint && <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>{hint}</div>}
    </div>
  );
}
