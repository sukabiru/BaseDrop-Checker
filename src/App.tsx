import { useState, useMemo } from "react";
import ConnectWallet from "./components/ConnectWallet";
import ManualAddressInput from "./components/ManualAddressInput";
import BaseDropChecker from "./components/BaseDropChecker";
import { useAddress } from "./hooks/useAddress";

export default function App() {
  const { address: connectedAddress } = useAddress();
  const [manual, setManual] = useState<`0x${string}` | null>(null);

  // Prioritas: manual > connected
  const selected = useMemo<`0x${string}` | null>(() => manual ?? (connectedAddress ?? null), [manual, connectedAddress]);

  return (
    <div className="fullscreen">
      <div className="center card maxw">
        {!selected ? (
          <>
            <h1 className="title">BaseDrop Checker</h1>
            <p className="subtitle">Pilih metode cek: connect wallet atau input alamat manual.</p>

            <div className="stack">
              <div className="row center">
                <ConnectWallet />
              </div>
              <div className="divider"><span>atau</span></div>
              <ManualAddressInput onSelect={setManual} />
            </div>

            <p className="tiny muted center">Kami hanya membaca data publik di jaringan Base.</p>
          </>
        ) : (
          <>
            <BaseDropChecker address={selected} />
            <div className="row center gap-sm" style={{ marginTop: 16 }}>
              <button className="btn" onClick={() => setManual(null)}>Ganti alamat</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


