import { z } from "zod";

export const lockSeatSchema = z.object({
  body: z.object({
    show: z
      .string({ error: "Show id is required" })
      .trim()
      .pipe(z.uuid({ error: "Not a valid uuid" })),
    seats: z
      .array(z.string(), { error: "Seats array is required" })
      .min(1, { error: "At least one seat is required." }),
  }),
});

export const getSeatsByShowSchema = z.object({
  params: z.object({
    id: z.uuid({ error: "Not a valid uuid" }),
  }),
});
