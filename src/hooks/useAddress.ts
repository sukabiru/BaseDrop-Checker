import { useAccount } from "wagmi";

export function useAddress() {
  const { address, isConnected } = useAccount();
  return { address, isConnected };
}
