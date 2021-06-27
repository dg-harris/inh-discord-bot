import { createHandler, gameCommandConfigs } from "../util/handlers.ts";

export const invokeFactorioCommand = createHandler({
  ...gameCommandConfigs,
});
