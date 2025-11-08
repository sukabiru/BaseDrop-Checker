import { openWalletModal } from "../appkit/appkit";
import { useAddress } from "../hooks/useAddress";
import { useDisconnect } from "wagmi";
import { useCallback } from "react";

export default function ConnectWallet() {
  const { isConnected, address } = useAddress();
  const { disconnect } = useDisconnect();

  const onChangeWallet = useCallback(() => {
    // 1) putuskan koneksi wagmi
    disconnect();
    // 2) beri jeda singkat supaya state WAGMI benar2 update
    setTimeout(() => {
      openWalletModal(); // tampilkan modal Reown untuk pilih wallet baru
    }, 50);
  }, [disconnect]);

  if (isConnected && address) {
    return (
      <div className="row center gap">
        <button className="btn" onClick={onChangeWallet}>
          {address.slice(0, 6)}…{address.slice(-4)} (Ganti)
        </button>
        <button className="btn" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button className="btn primary" onClick={openWalletModal}>
      Connect Wallet
    </button>
  );
}


