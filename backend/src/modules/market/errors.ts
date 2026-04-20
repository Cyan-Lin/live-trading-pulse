export const marketMappingErrorCodes = [
  "INVALID_SYMBOL",
  "INVALID_TIMESTAMP",
  "INVALID_NUMBER",
  "INVALID_TICKER_PAYLOAD",
  "INVALID_KLINE_PAYLOAD",
] as const;

export type MarketMappingErrorCode = (typeof marketMappingErrorCodes)[number];

type MarketMappingErrorOptions = {
  code: MarketMappingErrorCode;
  message: string;
  details?: unknown;
};

export class MarketMappingError extends Error {
  readonly code: MarketMappingErrorCode;
  readonly details?: unknown;

  constructor(options: MarketMappingErrorOptions) {
    super(options.message);
    this.name = "MarketMappingError";
    this.code = options.code;
    this.details = options.details;
  }
}

export const isMarketMappingError = (
  error: unknown,
): error is MarketMappingError => error instanceof MarketMappingError;
