import { useQuery } from "@tanstack/react-query";
import { useAddress } from "../hooks/useAddress";
import { getBaseSnapshot } from "../features/checker/getBaseSnapshot";
import { computeEligibility } from "../features/checker/scoring";
import ScoreBadge from "../components/ScoreBadge";
import { MetricCard } from "../components/MetricCard";
import ScoreBreakdown from "../components/ScoreBreakdown";
import ShareCastButton from "../components/ShareCastButton";
import { formatEther } from "viem";

export default function Dashboard() {
  const { address, isConnected } = useAddress();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["snapshot", address],
    queryFn: () => getBaseSnapshot(address!),
    enabled: !!address
  });

  if (!isConnected || !address) return <div className="page">Silakan connect wallet dulu.</div>;
  if (isLoading) return <div className="page">Mengambil data dari Base…</div>;
  if (isError || !data) return <div className="page">Gagal mengambil data.</div>;

  const { score, tier, tips } = computeEligibility(data);

  return (
    <div className="page">
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <ScoreBadge score={score} tier={tier as any} />
        <ShareCastButton address={address} score={score} tier={tier as any} snapshot={data} />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 12,
        marginTop: 16
      }}>
        <MetricCard label="Alamat" value={`${address.slice(0, 6)}…${address.slice(-4)}`} />
        <MetricCard label="Saldo (ETH - Base)" value={Number(formatEther(data.balanceWei)).toFixed(4)} />
        <MetricCard label="Tx Count (Base)" value={String(data.txCount)} />
        <MetricCard label="Active Days (90d)" value={String(data.activeDays90d)} hint="MVP placeholder" />
        <MetricCard label="DEX Interactions" value={String(data.dexInteractions)} hint="MVP placeholder" />
      </div>

      <ScoreBreakdown tips={tips} />

      <div style={{ marginTop: 24, fontSize: 12, color: "#6b7280" }}>
        Diukur pada: {new Date(data.measuredAt).toLocaleString()}
        <br />
        Catatan: skor ini hanyalah indikasi berbasis metrik onchain, bukan jaminan airdrop resmi.
      </div>
    </div>
  );
}
