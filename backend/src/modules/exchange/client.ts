import { z } from "zod";

import { ExchangeRestError } from "./errors.js";
import {
  binanceErrorResponseSchema,
  exchangeInfoResponseSchema,
  exchangeKlinesResponseSchema,
  type ExchangeInfoResponse,
  type ExchangeKlinesResponse,
} from "./schemas.js";

const defaultExchangeRestBaseUrl =
  process.env.EXCHANGE_REST_BASE_URL ?? "https://api.binance.com";

type QueryValue = boolean | number | string | readonly string[] | undefined;

export type ExchangeFetchFn = (
  input: URL,
  init?: RequestInit,
) => Promise<Response>;

export type ExchangeSymbolStatus = "TRADING" | "HALT" | "BREAK";

export type ExchangeKlineInterval =
  | "1s"
  | "1m"
  | "3m"
  | "5m"
  | "15m"
  | "30m"
  | "1h"
  | "2h"
  | "4h"
  | "6h"
  | "8h"
  | "12h"
  | "1d"
  | "3d"
  | "1w"
  | "1M";

export type GetPairsParams = {
  symbol?: string;
  symbols?: string[];
  symbolStatus?: ExchangeSymbolStatus;
};

export type GetKlinesParams = {
  symbol: string;
  interval: ExchangeKlineInterval;
  startTime?: number;
  endTime?: number;
  timeZone?: string;
  limit?: number;
};

type CreateExchangeRestClientOptions = {
  baseUrl?: string;
  fetch?: ExchangeFetchFn;
};

export class ExchangeRestClient {
  readonly baseUrl: string;
  readonly fetchFn: ExchangeFetchFn;

  constructor(options: CreateExchangeRestClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? defaultExchangeRestBaseUrl;
    this.fetchFn = options.fetch ?? defaultExchangeFetch;
  }

  async getPairs(params: GetPairsParams = {}): Promise<ExchangeInfoResponse> {
    return this.request(
      "/api/v3/exchangeInfo",
      {
        symbol: params.symbol,
        symbols: params.symbols,
        symbolStatus: params.symbolStatus,
      },
      exchangeInfoResponseSchema,
    );
  }

  async getKlines(params: GetKlinesParams): Promise<ExchangeKlinesResponse> {
    return this.request(
      "/api/v3/klines",
      {
        symbol: params.symbol,
        interval: params.interval,
        startTime: params.startTime,
        endTime: params.endTime,
        timeZone: params.timeZone,
        limit: params.limit,
      },
      exchangeKlinesResponseSchema,
    );
  }

  private async request<T>(
    path: string,
    query: Record<string, QueryValue>,
    schema: z.ZodType<T>,
  ): Promise<T> {
    const url = new URL(path, this.baseUrl);

    appendQuery(url, query);

    let response: Response;

    try {
      response = await this.fetchFn(url, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
    } catch (error) {
      throw new ExchangeRestError({
        code: "UPSTREAM_NETWORK_ERROR",
        message: "Failed to reach exchange REST API.",
        endpoint: formatEndpoint(url),
        details: error,
      });
    }

    const payload = parseResponseBody(await response.text());

    if (!response.ok) {
      const upstreamError = binanceErrorResponseSchema.safeParse(payload);

      throw new ExchangeRestError({
        code: "UPSTREAM_HTTP_ERROR",
        message: upstreamError.success
          ? upstreamError.data.msg
          : `Exchange REST API returned ${response.status}.`,
        endpoint: formatEndpoint(url),
        statusCode: response.status,
        upstreamCode: upstreamError.success
          ? upstreamError.data.code
          : undefined,
        upstreamMessage: upstreamError.success
          ? upstreamError.data.msg
          : undefined,
        details: payload,
      });
    }

    const result = schema.safeParse(payload);

    if (!result.success) {
      throw new ExchangeRestError({
        code: "INVALID_RESPONSE",
        message: "Exchange REST API returned an invalid response payload.",
        endpoint: formatEndpoint(url),
        statusCode: response.status,
        details: result.error.flatten(),
      });
    }

    return result.data;
  }
}

export const createExchangeRestClient = (
  options: CreateExchangeRestClientOptions = {},
): ExchangeRestClient => new ExchangeRestClient(options);

const appendQuery = (url: URL, query: Record<string, QueryValue>): void => {
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      url.searchParams.set(key, JSON.stringify(value));
      continue;
    }

    url.searchParams.set(key, String(value));
  }
};

const defaultExchangeFetch: ExchangeFetchFn = (input, init) =>
  fetch(input, init);

const formatEndpoint = (url: URL): string => `${url.pathname}${url.search}`;

const parseResponseBody = (bodyText: string): unknown => {
  if (bodyText.length === 0) {
    return undefined;
  }

  try {
    return JSON.parse(bodyText) as unknown;
  } catch {
    return bodyText;
  }
};
