import { useQuery } from "@tanstack/react-query";
import { getBaseSnapshot } from "../features/checker/getBaseSnapshot";
import { computeEligibility } from "../features/checker/scoring";
import ScoreBadge from "./ScoreBadge";
import { MetricCard } from "./MetricCard";
import ScoreBreakdown from "./ScoreBreakdown";
import ShareCastButton from "./ShareCastButton";
import { formatEther } from "viem";
import { openWalletModal } from "../appkit/appkit";
import { useDisconnect } from "wagmi";

export default function BaseDropChecker({ address }: { address: `0x${string}` }) {
  const { disconnect } = useDisconnect();

  function changeWallet() {
    disconnect();
    setTimeout(() => {
      openWalletModal();
    }, 100);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["snapshot", address],
    queryFn: () => getBaseSnapshot(address),
  });

  if (isLoading) return <div className="center">Mengambil data dari Base…</div>;
  if (isError || !data) return <div className="center">Gagal mengambil data.</div>;

  const { score, tier, tips } = computeEligibility(data);

  return (
    <div className="checker">
      <div className="header">
        <h1 className="title">BaseDrop Checker</h1>
        <p className="subtitle">Cek indikasi eligibility airdrop (Base)</p>
      </div>

      {/* ✅ Tambah tombol ganti wallet */}
      <div className="row center" style={{ marginBottom: 20 }}>
        <button className="btn" onClick={changeWallet}>Disconnect</button>
      </div>

      <div className="stack">
        <div className="row gap">
          <ScoreBadge score={score} tier={tier as any} />
          <ShareCastButton address={address} score={score} tier={tier as any} snapshot={data} />
        </div>

        <div className="grid">
          <MetricCard label="Alamat" value={`${address.slice(0, 6)}…${address.slice(-4)}`} />
          <MetricCard label="Saldo (ETH - Base)" value={Number(formatEther(data.balanceWei)).toFixed(4)} />
          <MetricCard label="Tx Count (Base)" value={String(data.txCount)} />
          <MetricCard label="Active Days (90d)" value={String(data.activeDays90d)} hint="MVP placeholder" />
          <MetricCard label="DEX Interactions" value={String(data.dexInteractions)} hint="MVP placeholder" />
        </div>

        <ScoreBreakdown tips={tips} />

        <div className="footnote">
          Diukur pada: {new Date(data.measuredAt).toLocaleString()} <br />
          Catatan: skor ini indikasi berbasis metrik onchain, bukan jaminan airdrop resmi.
        </div>
      </div>
    </div>
  );
}
