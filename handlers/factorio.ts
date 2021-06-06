import { CommandHandler } from "../global.types.ts";
import { invokeShellTask } from "../invokeShellTask.ts";
import {
  ButtonStyles,
  getButtonPayload,
} from "../messaging/getButtonPayload.ts";

export const invokeFactorioCommand: CommandHandler = (command) => {
  switch (command.args[0]) {
    case "start":
      return invokeShellTask("factorio-start");
    case "stop":
      return invokeShellTask("factorio-stop");
    case "update":
      return invokeShellTask("factorio-update");
    case "status":
      return invokeShellTask("factorio-status");
    case undefined: {
      const buttons = getButtonPayload("Choose a factorio action", [
        {
          label: "start",
          custom_id: "factorio start",
          style: ButtonStyles.Success,
        },
        {
          label: "stop",
          custom_id: "factorio stop",
          style: ButtonStyles.Danger,
        },
        {
          label: "update",
          custom_id: "factorio update",
        },
        {
          label: "status",
          custom_id: "factorio status",
        },
      ]);
      return Promise.resolve(buttons);
    }
    default:
      return Promise.resolve(`unknown factorio command ${command.args[0]}`);
  }
};
