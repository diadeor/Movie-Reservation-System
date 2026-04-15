import { z } from "zod";

export const createTicketSchema = z.object({
  body: z.object({
    seats: z
      .array(z.string(), { error: "Seats array is required" })
      .min(1, { error: "At least one seat is required" }),
    show: z
      .string({ error: "Show id is required" })
      .trim()
      .pipe(z.uuid({ error: "Not a valid uuid" })),
  }),
});
