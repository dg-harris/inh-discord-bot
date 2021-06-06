import { CommandHandler } from "../global.types.ts";
import { invokeShellTask } from "../invokeShellTask.ts";
import {
  ButtonStyles,
  getButtonPayload,
} from "../messaging/getButtonPayload.ts";

export const invokeValheimCommand: CommandHandler = (command) => {
  switch (command.args[0]) {
    case "start":
      return invokeShellTask("valheim-start");
    case "stop":
      return invokeShellTask("valheim-stop");
    case "update":
      return invokeShellTask("valheim-update");
    case "players":
      return invokeShellTask("valheim-players");
    case undefined: {
      const buttons = getButtonPayload("Choose a valheim action", [
        {
          label: "start",
          custom_id: "valheim start",
          style: ButtonStyles.Success,
        },
        {
          label: "stop",
          custom_id: "valheim stop",
          style: ButtonStyles.Danger,
        },
        {
          label: "update",
          custom_id: "valheim update",
        },
        {
          label: "players",
          custom_id: "valheim players",
        },
      ]);
      return Promise.resolve(buttons);
    }
    default:
      return Promise.resolve(`unknown valheim command ${command.args[0]}`);
  }
};
