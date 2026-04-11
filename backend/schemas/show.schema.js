import { z } from "zod";

const addShowSchema = z.object({
  body: z.object({}),
});
