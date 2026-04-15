import { z } from "zod";

export const addShowSchema = z.object({
  body: z.object({
    price: z.coerce.number().min(0, "Price cannot be less than 0"),
    movie_id: z
      .string({ error: "Movie id is required." })
      .trim()
      .regex(/tt[0-9]+/, { error: "Invalid IMDB id" }),
    date: z.coerce
      .date({ error: "Date is required" })
      .min(new Date(), { error: "Date is not valid" }),
  }),
});

export const editShowSchema = z.object({
  params: z.object({
    id: z.uuid({ error: "Show id is not a valid uuid" }),
  }),
  body: z.object({
    price: z.coerce.number().min(0, "Price cannot be less than 0"),
    date: z.coerce.date({ error: "Date is required" }),
    status: z.enum(["upcoming", "cancelled", "expired"]),
  }),
});
