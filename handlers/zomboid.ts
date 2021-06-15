import { CommandHandler } from "../global.types.ts";
import { invokeShellTask } from "../invokeShellTask.ts";
import {
  ButtonStyles,
  getButtonPayload,
} from "../messaging/getButtonPayload.ts";

export const invokeZomboidCommand: CommandHandler = (command) => {
  switch (command.args[0]) {
    case "start":
      return invokeShellTask("zomboid-start");
    case "stop":
      return invokeShellTask("zomboid-stop");
    case "update":
      return invokeShellTask("zomboid-update");
    case "status":
      return invokeShellTask("zomboid-status");
    case undefined: {
      const buttons = getButtonPayload("Choose a Zomboid action", [
        {
          label: "start",
          custom_id: "zomboid start",
          style: ButtonStyles.Success,
        },
        {
          label: "stop",
          custom_id: "zomboid stop",
          style: ButtonStyles.Danger,
        },
        {
          label: "update",
          custom_id: "zomboid update",
        },
        {
          label: "status",
          custom_id: "zomboid status",
        },
      ]);
      return Promise.resolve(buttons);
    }
    default:
      return Promise.resolve(`unknown zomboid command ${command.args[0]}`);
  }
};
