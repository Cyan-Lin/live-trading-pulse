import { MarketMappingError } from "./errors.js";
import { type PriceDirection } from "./models.js";

const symbolSeparatorsPattern = /[\s\-_/.:]+/g;
const invalidSymbolCharactersPattern = /[^A-Za-z0-9]/;

export const normalizeSymbol = (symbol: string): string => {
  const compactSymbol = symbol.trim().replace(symbolSeparatorsPattern, "");

  if (compactSymbol.length === 0) {
    throw new MarketMappingError({
      code: "INVALID_SYMBOL",
      message: "Symbol must not be empty.",
      details: symbol,
    });
  }

  if (invalidSymbolCharactersPattern.test(compactSymbol)) {
    throw new MarketMappingError({
      code: "INVALID_SYMBOL",
      message: "Symbol may only contain letters and digits.",
      details: symbol,
    });
  }

  return compactSymbol.toUpperCase();
};

export const mapExchangeSymbolToInternalSymbol = (symbol: string): string =>
  normalizeSymbol(symbol);

export const normalizeUtcEpochMilliseconds = (value: number): number => {
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < 0) {
    throw new MarketMappingError({
      code: "INVALID_TIMESTAMP",
      message: "Timestamp must be a non-negative UTC epoch millisecond value.",
      details: value,
    });
  }

  return value;
};

export const parseExchangeDecimal = (value: string, field: string): number => {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw new MarketMappingError({
      code: "INVALID_NUMBER",
      message: `Exchange field ${field} did not contain a valid decimal number.`,
      details: value,
    });
  }

  return parsedValue;
};

// The rolling 24h open price is the stable baseline for upstream ticker change.
export const calculate24hChangePercent = (
  currentPrice: number,
  openPrice24h: number,
): number | undefined => {
  if (openPrice24h <= 0) {
    return undefined;
  }

  return ((currentPrice - openPrice24h) / openPrice24h) * 100;
};

export const resolvePriceDirection = (change24h?: number): PriceDirection => {
  if (change24h === undefined || change24h === 0) {
    return "flat";
  }

  return change24h > 0 ? "up" : "down";
};
