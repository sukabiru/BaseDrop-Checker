export const scoringConfig = {
  weights: {
    txCount: 0.2,
    activeDays90d: 0.25,
    firstSeenAge: 0.1,
    balanceNow: 0.1,
    dexInteractions: 0.2,
    diversityProtocols: 0.15 // placeholder (belum dipakai di MVP)
  },
  thresholds: {
    txCount: [1, 5, 20, 50, 100],
    activeDays90d: [1, 5, 10, 20, 40],
    balanceNowEth: [0.01, 0.05, 0.1, 0.5, 1.0],
    firstSeenAgeDays: [1, 7, 30, 90, 180],
    dexInteractions: [0, 1, 3, 5, 10]
  }
};
