import { CommandHandler } from "../global.types.ts";
import { invokeShellTask } from "../invokeShellTask.ts";
import { getGameServiceButtons } from "../messaging/getGameServiceButtons.ts";

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
      const buttons = getGameServiceButtons("zomboid");
      return Promise.resolve(buttons);
    }
    default:
      return Promise.resolve(`unknown factorio command ${command.args[0]}`);
  }
};
