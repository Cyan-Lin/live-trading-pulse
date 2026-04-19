import { describe, expect, it, vi } from "vitest";

import {
  createExchangeRestClient,
  ExchangeRestError,
  type ExchangeFetchFn,
} from "../src/modules/exchange/index.js";

const createJsonResponse = (payload: unknown, status = 200): Response =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json",
    },
  });

describe("exchange REST client", () => {
  it("fetches and validates exchange pairs responses", async () => {
    const fetchMock = vi.fn<ExchangeFetchFn>().mockResolvedValue(
      createJsonResponse({
        timezone: "UTC",
        serverTime: 1711111111111,
        symbols: [
          {
            symbol: "BTCUSDT",
            status: "TRADING",
            baseAsset: "BTC",
            quoteAsset: "USDT",
            permissions: ["SPOT"],
          },
        ],
      }),
    );

    const client = createExchangeRestClient({
      baseUrl: "https://api.binance.com",
      fetch: fetchMock,
    });

    const response = await client.getPairs({
      symbolStatus: "TRADING",
      symbols: ["BTCUSDT", "ETHUSDT"],
    });

    expect(response.symbols).toHaveLength(1);

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] ?? [];

    expect(requestUrl?.toString()).toBe(
      "https://api.binance.com/api/v3/exchangeInfo?symbols=%5B%22BTCUSDT%22%2C%22ETHUSDT%22%5D&symbolStatus=TRADING",
    );
    expect(requestInit).toMatchObject({
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
  });

  it("fetches and validates klines responses", async () => {
    const fetchMock = vi
      .fn<ExchangeFetchFn>()
      .mockResolvedValue(
        createJsonResponse([
          [
            1711111110000,
            "64000.00",
            "64100.00",
            "63950.00",
            "64050.00",
            "10.50",
            1711111169999,
            "672000.00",
            123,
            "5.00",
            "320000.00",
            "0",
          ],
        ]),
      );

    const client = createExchangeRestClient({
      baseUrl: "https://api.binance.com",
      fetch: fetchMock,
    });

    const response = await client.getKlines({
      symbol: "BTCUSDT",
      interval: "1m",
      limit: 1,
    });

    expect(response).toEqual([
      [
        1711111110000,
        "64000.00",
        "64100.00",
        "63950.00",
        "64050.00",
        "10.50",
        1711111169999,
        "672000.00",
        123,
        "5.00",
        "320000.00",
        "0",
      ],
    ]);
  });

  it("normalizes upstream HTTP errors into ExchangeRestError", async () => {
    const fetchMock = vi.fn<ExchangeFetchFn>().mockResolvedValue(
      createJsonResponse(
        {
          code: -1121,
          msg: "Invalid symbol.",
        },
        400,
      ),
    );

    const client = createExchangeRestClient({
      baseUrl: "https://api.binance.com",
      fetch: fetchMock,
    });

    await expect(client.getPairs({ symbol: "NOTREAL" })).rejects.toMatchObject({
      name: "ExchangeRestError",
      code: "UPSTREAM_HTTP_ERROR",
      statusCode: 400,
      upstreamCode: -1121,
      upstreamMessage: "Invalid symbol.",
      endpoint: "/api/v3/exchangeInfo?symbol=NOTREAL",
    } satisfies Partial<ExchangeRestError>);
  });

  it("rejects malformed success payloads with INVALID_RESPONSE", async () => {
    const fetchMock = vi.fn<ExchangeFetchFn>().mockResolvedValue(
      createJsonResponse({
        timezone: "UTC",
        symbols: [
          {
            symbol: "BTCUSDT",
          },
        ],
      }),
    );

    const client = createExchangeRestClient({
      baseUrl: "https://api.binance.com",
      fetch: fetchMock,
    });

    await expect(client.getPairs()).rejects.toMatchObject({
      name: "ExchangeRestError",
      code: "INVALID_RESPONSE",
      statusCode: 200,
      endpoint: "/api/v3/exchangeInfo",
    } satisfies Partial<ExchangeRestError>);
  });
});
