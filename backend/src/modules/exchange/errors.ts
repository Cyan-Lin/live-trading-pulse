export const exchangeRestErrorCodes = [
  "UPSTREAM_NETWORK_ERROR",
  "UPSTREAM_HTTP_ERROR",
  "INVALID_RESPONSE",
] as const;

export type ExchangeRestErrorCode = (typeof exchangeRestErrorCodes)[number];

type ExchangeRestErrorOptions = {
  code: ExchangeRestErrorCode;
  message: string;
  endpoint: string;
  statusCode?: number;
  upstreamCode?: number;
  upstreamMessage?: string;
  details?: unknown;
};

export class ExchangeRestError extends Error {
  readonly code: ExchangeRestErrorCode;
  readonly endpoint: string;
  readonly statusCode?: number;
  readonly upstreamCode?: number;
  readonly upstreamMessage?: string;
  readonly details?: unknown;

  constructor(options: ExchangeRestErrorOptions) {
    super(options.message);
    this.name = "ExchangeRestError";
    this.code = options.code;
    this.endpoint = options.endpoint;
    this.statusCode = options.statusCode;
    this.upstreamCode = options.upstreamCode;
    this.upstreamMessage = options.upstreamMessage;
    this.details = options.details;
  }
}

export const isExchangeRestError = (
  error: unknown,
): error is ExchangeRestError => error instanceof ExchangeRestError;
