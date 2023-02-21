import { createHandler, shellSubcommandHander } from "../util/handlers.ts";

import { ButtonStyles } from "../botResponses/messaging.types.ts";
import { CommandHandler } from "../global.types.ts";

export const invokeForestCommand: CommandHandler = createHandler({
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
