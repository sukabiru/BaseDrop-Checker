import type { BaseSnapshot } from "../features/checker/getBaseSnapshot";

type Tier = "Low" | "Medium" | "High";

type Props = {
  address: `0x${string}`;
  score: number;
  tier: Tier;
  snapshot: BaseSnapshot;
};

// minimal shape untuk environment Farcaster tanpa SDK
type MiniAppLike = { openCastComposer?: (args: { text: string }) => void };

export default function ShareCastButton({
  address,
  score,
  tier,
  snapshot,
}: Props) {
  const text = `BaseDrop Score: ${score} (${tier}) for ${address.slice(
    0,
    6
  )}…${address.slice(-4)} — measured ${new Date(
    snapshot.measuredAt
  ).toLocaleString()}`;

  const onShare = () => {
    // dukung global api jika berjalan di Farcaster Mini App
    const w = window as unknown as {
      farcaster?: MiniAppLike;
      miniapp?: MiniAppLike;
    };
    const fc = w.farcaster ?? w.miniapp;

    if (fc?.openCastComposer) {
      fc.openCastComposer({ text });
      return;
    }

    // fallback di browser biasa
    navigator.clipboard?.writeText(text);
    alert("Copied to clipboard. Paste it in Farcaster.");
  };

  return (
    <button className="btn" onClick={onShare}>
      Share to Farcaster
    </button>
  );
}

