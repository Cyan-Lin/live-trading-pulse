import { z } from "zod";

export const binanceErrorResponseSchema = z.object({
  code: z.number(),
  msg: z.string(),
});

export const exchangeInfoSymbolSchema = z
  .object({
    symbol: z.string().min(1),
    status: z.string().min(1),
    baseAsset: z.string().min(1),
    quoteAsset: z.string().min(1),
  })
  .passthrough();

export const exchangeInfoResponseSchema = z
  .object({
    timezone: z.string(),
    serverTime: z.number().int().nonnegative().optional(),
    symbols: z.array(exchangeInfoSymbolSchema),
  })
  .passthrough();

export const exchangeKlineSchema = z.tuple([
  z.number().int().nonnegative(),
  z.string(),
  z.string(),
  z.string(),
  z.string(),
  z.string(),
  z.number().int().nonnegative(),
  z.string(),
  z.number().int().nonnegative(),
  z.string(),
  z.string(),
  z.unknown(),
]);

export const exchangeKlinesResponseSchema = z.array(exchangeKlineSchema);

export type BinanceErrorResponse = z.infer<typeof binanceErrorResponseSchema>;
export type ExchangeInfoResponse = z.infer<typeof exchangeInfoResponseSchema>;
export type ExchangeInfoSymbol = z.infer<typeof exchangeInfoSymbolSchema>;
export type ExchangeKline = z.infer<typeof exchangeKlineSchema>;
export type ExchangeKlinesResponse = z.infer<
  typeof exchangeKlinesResponseSchema
>;
