import { CommandHandler } from "../global.types.ts";
import { ButtonStyles } from "../messaging/getButtonPayload.ts";
import { createHandler, shellSubcommandHander } from "../util/handlers.ts";

export const invokeVRisingCommand: CommandHandler = createHandler({
  start: {
    task: shellSubcommandHander,
    buttonSettings: { style: ButtonStyles.Success },
  },
  stop: {
    task: shellSubcommandHander,
    buttonSettings: { style: ButtonStyles.Danger },
  },
  status: { task: shellSubcommandHander },
});
