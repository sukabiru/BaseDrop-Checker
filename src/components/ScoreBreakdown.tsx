export default function ScoreBreakdown({ tips }: { tips: string[] }) {
  if (!tips.length) return null;
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Rekomendasi</div>
      <ul style={{ marginLeft: 18, lineHeight: 1.7 }}>
        {tips.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
}
