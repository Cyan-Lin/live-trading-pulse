export const priceDirections = ["up", "down", "flat"] as const;

export type PriceDirection = (typeof priceDirections)[number];

export const connectionStatuses = [
  "connected",
  "disconnected",
  "reconnecting",
] as const;

export type ConnectionStatus = (typeof connectionStatuses)[number];

export type TradingPair = {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  displayName: string;
};

export type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isClosed: boolean;
};

export type PriceTickEvent = {
  symbol: string;
  price: number;
  change24h?: number;
  direction: PriceDirection;
  eventTime: number;
};

export type KlineUpdateEvent = {
  symbol: string;
  interval: string;
  eventTime: number;
  candle: Candle;
};

export type ConnectionStatusEvent = {
  status: ConnectionStatus;
  reconnectAttempts: number;
  lastMessageAt: number | null;
  eventTime: number;
};

export type LatencySampleEvent = {
  latencyMs: number;
  eventTime: number;
};
