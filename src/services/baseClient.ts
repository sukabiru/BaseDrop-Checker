import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

const baseRpc = import.meta.env.VITE_BASE_RPC_URL as string;

export const baseClient = createPublicClient({
  chain: base,
  transport: http(baseRpc)
});
