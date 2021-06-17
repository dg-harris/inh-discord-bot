import { CommandHandler } from "../global.types.ts";
import { ButtonStyles } from "../messaging/getButtonPayload.ts";
import { createHandler, shellSubcommandHander } from "../util/handlers.ts";

export const invokeValheimCommand: CommandHandler = createHandler({
  start: {
    task: shellSubcommandHander,
    buttonSettings: { style: ButtonStyles.Success },
  },
  stop: {
    task: shellSubcommandHander,
    buttonSettings: { style: ButtonStyles.Danger },
  },
  update: { task: shellSubcommandHander },
  players: { task: shellSubcommandHander },
});
