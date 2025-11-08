import { baseClient } from "../../services/baseClient";

export interface BaseSnapshot {
  address: `0x${string}`;
  balanceWei: bigint;
  txCount: number;
  activeDays90d: number;       // placeholder (0 di MVP)
  dexInteractions: number;     // placeholder
  firstSeenAgeDays: number | null; // placeholder
  measuredAt: string;          // ISO
}

export async function getBaseSnapshot(address: `0x${string}`): Promise<BaseSnapshot> {
  const [balanceWei, txCount] = await Promise.all([
    baseClient.getBalance({ address }),
    baseClient.getTransactionCount({ address })
  ]);

  return {
    address,
    balanceWei,
    txCount,
    activeDays90d: 0,
    dexInteractions: 0,
    firstSeenAgeDays: null,
    measuredAt: new Date().toISOString()
  };
}
