import { type ExchangeInfoSymbol } from "../exchange/index.js";
import { MarketMappingError } from "./errors.js";
import {
  type Candle,
  type KlineUpdateEvent,
  type PriceTickEvent,
  type TradingPair,
} from "./models.js";
import {
  calculate24hChangePercent,
  mapExchangeSymbolToInternalSymbol,
  normalizeSymbol,
  normalizeUtcEpochMilliseconds,
  parseExchangeDecimal,
  resolvePriceDirection,
} from "./normalizers.js";
import {
  binanceKlinePayloadSchema,
  binanceTickerPayloadSchema,
  type BinanceKlinePayload,
  type BinanceTickerPayload,
} from "./schemas.js";

export const mapExchangeInfoSymbolToTradingPair = (
  symbol: ExchangeInfoSymbol,
): TradingPair => {
  const baseAsset = normalizeSymbol(symbol.baseAsset);
  const quoteAsset = normalizeSymbol(symbol.quoteAsset);

  return {
    symbol: mapExchangeSymbolToInternalSymbol(symbol.symbol),
    baseAsset,
    quoteAsset,
    displayName: `${baseAsset}/${quoteAsset}`,
  };
};

export const mapTickerPayloadToPriceTickEvent = (
  payload: unknown,
): PriceTickEvent => {
  const parsedPayload = parseTickerPayload(payload);
  const price = parseExchangeDecimal(parsedPayload.c, "c");
  const openPrice24h = parseExchangeDecimal(parsedPayload.o, "o");
  const change24h = calculate24hChangePercent(price, openPrice24h);

  return {
    symbol: mapExchangeSymbolToInternalSymbol(parsedPayload.s),
    price,
    change24h,
    direction: resolvePriceDirection(change24h),
    eventTime: normalizeUtcEpochMilliseconds(parsedPayload.E),
  };
};

export const mapKlinePayloadToKlineUpdateEvent = (
  payload: unknown,
): KlineUpdateEvent => {
  const parsedPayload = parseKlinePayload(payload);

  return {
    symbol: mapExchangeSymbolToInternalSymbol(parsedPayload.s),
    interval: parsedPayload.k.i,
    eventTime: normalizeUtcEpochMilliseconds(parsedPayload.E),
    candle: mapBinanceKlineToCandle(parsedPayload),
  };
};

const parseTickerPayload = (payload: unknown): BinanceTickerPayload => {
  const parsedPayload = binanceTickerPayloadSchema.safeParse(payload);

  if (!parsedPayload.success) {
    throw new MarketMappingError({
      code: "INVALID_TICKER_PAYLOAD",
      message: "Ticker payload did not match the expected exchange shape.",
      details: parsedPayload.error.flatten(),
    });
  }

  return parsedPayload.data;
};

const parseKlinePayload = (payload: unknown): BinanceKlinePayload => {
  const parsedPayload = binanceKlinePayloadSchema.safeParse(payload);

  if (!parsedPayload.success) {
    throw new MarketMappingError({
      code: "INVALID_KLINE_PAYLOAD",
      message: "Kline payload did not match the expected exchange shape.",
      details: parsedPayload.error.flatten(),
    });
  }

  return parsedPayload.data;
};

const mapBinanceKlineToCandle = (payload: BinanceKlinePayload): Candle => ({
  time: normalizeUtcEpochMilliseconds(payload.k.t),
  open: parseExchangeDecimal(payload.k.o, "k.o"),
  high: parseExchangeDecimal(payload.k.h, "k.h"),
  low: parseExchangeDecimal(payload.k.l, "k.l"),
  close: parseExchangeDecimal(payload.k.c, "k.c"),
  volume: parseExchangeDecimal(payload.k.v, "k.v"),
  isClosed: payload.k.x,
});
