import { z } from "zod";

export const addShowSchema = z.object({
  body: z.object({
    price: z.coerce.number().min(0, "Price cannot be less than 0"),
    movie_id: z
      .string({ error: "Movie id is required." })
      .regex(/tt[0-9]+/, { error: "Invalid IMDB id" }),
    date: z.coerce
      .date({ error: "Date is required" })
      .min(new Date(), { error: "Date is not valid" }),
  }),
});
