import { createHandler, gameCommandConfigs } from "../util/handlers.ts";

export const invokeZomboidCommand = createHandler({
  ...gameCommandConfigs,
});
