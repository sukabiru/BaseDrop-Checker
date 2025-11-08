import { formatEther } from "viem";
import { scoringConfig } from "./scoring.config";
import type { BaseSnapshot } from "./getBaseSnapshot";

function bucketScore(value: number, thresholds: number[]) {
  let score = 0;
  for (const t of thresholds) if (value >= t) score++;
  // normalize ke 0..1
  return Math.min(score / thresholds.length, 1);
}

export function computeEligibility(snapshot: BaseSnapshot) {
  const balanceEth = Number(formatEther(snapshot.balanceWei));

  const sTx = bucketScore(snapshot.txCount, scoringConfig.thresholds.txCount);
  const sDays = bucketScore(snapshot.activeDays90d, scoringConfig.thresholds.activeDays90d);
  const sAge = snapshot.firstSeenAgeDays == null
    ? 0
    : bucketScore(snapshot.firstSeenAgeDays, scoringConfig.thresholds.firstSeenAgeDays);
  const sBal = bucketScore(balanceEth, scoringConfig.thresholds.balanceNowEth);
  const sDex = bucketScore(snapshot.dexInteractions, scoringConfig.thresholds.dexInteractions);

  const { weights } = scoringConfig;
  const raw =
    sTx * weights.txCount +
    sDays * weights.activeDays90d +
    sAge * weights.firstSeenAge +
    sBal * weights.balanceNow +
    sDex * weights.dexInteractions;

  const score100 = Math.round(raw * 100);

  const tier = score100 >= 75 ? "High" : score100 >= 45 ? "Medium" : "Low";

  const tips: string[] = [];
  if (snapshot.txCount < 20) tips.push("Tambah aktivitas transaksi di Base");
  if (snapshot.activeDays90d < 10) tips.push("Naikkan hari aktif (target 10–20/90d)");
  if (balanceEth < 0.1) tips.push("Pertahankan saldo ETH Base ≥ 0.1");
  if (snapshot.dexInteractions < 1) tips.push("Coba swap di DEX ekosistem Base");

  return { score: score100, tier, balanceEth, tips };
}
