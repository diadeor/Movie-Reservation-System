import { z } from "zod";

export const idParamSchema = z.object({
  params: z.object({
    id: z.uuid({ error: "ID is not a valid uuid" }),
  }),
});
