import { z } from "../deps.ts";

export const discordMessageSchema = z.object({
  content: z.string(),
});
