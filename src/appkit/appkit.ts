// src/appkit/appkit.ts
import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { http, createConfig } from "wagmi";
import { base } from "viem/chains";

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID as string;
const baseRpc   = import.meta.env.VITE_BASE_RPC_URL as string;

// (opsional tapi berguna untuk WagmiProvider)
export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(baseRpc)
  }
});

// ✅ PERBAIKAN: tambahkan projectId + networks
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [base],                 // <- wajib
  ssr: false,
  transports: {
    [base.id]: http(baseRpc)
  },
  // opsional: kalau mau eksplisit
  // customRpcUrls: {
  //   [base.id]: { http: [baseRpc] }
  // }
});

// ✅ Tambahkan networks juga di AppKit
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [base],
  metadata: {
    name: "BaseDrop Checker",
    description: "Cek skor eligibility airdrop di jaringan Base",
    url: import.meta.env.VITE_APP_URL || "http://localhost:5173",
    icons: [`${import.meta.env.VITE_APP_URL || ""}/icon.png`]
  }
});

// helper untuk buka modal (pakai instance langsung, bukan window)
export function openWalletModal() {
  (appKit as any).open?.() ?? (appKit as any).openModal?.(); // dukung variasi API
}
