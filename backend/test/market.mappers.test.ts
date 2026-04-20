import { describe, expect, it } from "vitest";

import {
  MarketMappingError,
  calculate24hChangePercent,
  mapExchangeInfoSymbolToTradingPair,
  mapExchangeSymbolToInternalSymbol,
  mapKlinePayloadToKlineUpdateEvent,
  mapTickerPayloadToPriceTickEvent,
  normalizeUtcEpochMilliseconds,
} from "../src/modules/market/index.js";

describe("market mappers", () => {
  it("normalizes exchange symbols into the internal uppercase format", () => {
    expect(mapExchangeSymbolToInternalSymbol(" btc/usdt ")).toBe("BTCUSDT");
    expect(mapExchangeSymbolToInternalSymbol("eth-usdt")).toBe("ETHUSDT");
  });

  it("rejects symbols that contain unsupported characters", () => {
    expect(() => mapExchangeSymbolToInternalSymbol("btc?usdt")).toThrowError(
      MarketMappingError,
    );
  });

  it("maps exchange pair payloads into trading pairs", () => {
    expect(
      mapExchangeInfoSymbolToTradingPair({
        symbol: "btcusdt",
        status: "TRADING",
        baseAsset: "btc",
        quoteAsset: "usdt",
      }),
    ).toEqual({
      symbol: "BTCUSDT",
      baseAsset: "BTC",
      quoteAsset: "USDT",
      displayName: "BTC/USDT",
    });
  });

  it("calculates 24h change from the rolling 24h open price baseline", () => {
    expect(calculate24hChangePercent(110, 100)).toBe(10);
    expect(calculate24hChangePercent(90, 100)).toBe(-10);
    expect(calculate24hChangePercent(100, 0)).toBeUndefined();
  });

  it("maps ticker payloads into price tick events", () => {
    expect(
      mapTickerPayloadToPriceTickEvent({
        e: "24hrTicker",
        E: 1711111111111,
        s: "btcusdt",
        c: "110.00",
        o: "100.00",
      }),
    ).toEqual({
      symbol: "BTCUSDT",
      price: 110,
      change24h: 10,
      direction: "up",
      eventTime: 1711111111111,
    });
  });

  it("maps kline payloads into internal candle update events", () => {
    expect(
      mapKlinePayloadToKlineUpdateEvent({
        e: "kline",
        E: 1711111170000,
        s: "btcusdt",
        k: {
          t: 1711111140000,
          T: 1711111199999,
          i: "1m",
          o: "100.00",
          c: "101.50",
          h: "102.00",
          l: "99.50",
          v: "42.25",
          x: false,
        },
      }),
    ).toEqual({
      symbol: "BTCUSDT",
      interval: "1m",
      eventTime: 1711111170000,
      candle: {
        time: 1711111140000,
        open: 100,
        high: 102,
        low: 99.5,
        close: 101.5,
        volume: 42.25,
        isClosed: false,
      },
    });
  });

  it("enforces UTC epoch millisecond timestamps", () => {
    expect(normalizeUtcEpochMilliseconds(1711111111111)).toBe(1711111111111);

    expect(() => normalizeUtcEpochMilliseconds(1711111111.5)).toThrowError(
      MarketMappingError,
    );
  });
});
