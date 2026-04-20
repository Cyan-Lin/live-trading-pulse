import { z } from "zod";

export const binanceTickerPayloadSchema = z
  .object({
    e: z.literal("24hrTicker"),
    E: z.number().int().nonnegative(),
    s: z.string().min(1),
    c: z.string().min(1),
    o: z.string().min(1),
  })
  .passthrough();

export const binanceKlinePayloadSchema = z
  .object({
    e: z.literal("kline"),
    E: z.number().int().nonnegative(),
    s: z.string().min(1),
    k: z
      .object({
        t: z.number().int().nonnegative(),
        T: z.number().int().nonnegative(),
        i: z.string().min(1),
        o: z.string().min(1),
        c: z.string().min(1),
        h: z.string().min(1),
        l: z.string().min(1),
        v: z.string().min(1),
        x: z.boolean(),
      })
      .passthrough(),
  })
  .passthrough();

export type BinanceTickerPayload = z.infer<typeof binanceTickerPayloadSchema>;
export type BinanceKlinePayload = z.infer<typeof binanceKlinePayloadSchema>;
