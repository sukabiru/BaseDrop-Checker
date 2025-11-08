import { useMemo } from "react";
import type { BaseSnapshot } from "../features/checker/getBaseSnapshot";

export default function ShareCastButton({
  address,
  score,
  tier,
  snapshot
}: {
  address: `0x${string}`;
  score: number;
  tier: "Low" | "Medium" | "High";
  snapshot: BaseSnapshot;
}) {
  const text = useMemo(() => {
    const short = `${address.slice(0, 6)}…${address.slice(-4)}`;
    return `My Base eligibility score: ${score} (${tier}) for ${short} — measured ${new Date(snapshot.measuredAt).toLocaleString()} #BaseOnchain #Farcaster`;
  }, [address, score, tier, snapshot.measuredAt]);

  // Placeholder: integrasi ke Farcaster Mini Apps share/cast action
  const onShare = () => {
    // e.g., window?.farcaster?.share?.(text)
    alert("Cast text copied:\n\n" + text);
    navigator.clipboard?.writeText(text);
  };

  return (
    <button className="btn" onClick={onShare}>Share to Farcaster</button>
  );
}
