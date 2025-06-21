// src/lib/coinsMapping.ts
export const getCoinsForAmount = (amount: number): number => {
  const mapping = {
    9.99: 1000,
    19.99: 2500,
    49.99: 7000,
    99.99: 15000,
  };
  return mapping[amount as keyof typeof mapping] || 0;
};