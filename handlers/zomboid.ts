import { CommandHandler } from "../global.types.ts";
import { invokeShellTask } from "../invokeShellTask.ts";
import { getGameServiceButtons } from "../messaging/getGameServiceButtons.ts";

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
      const buttons = getGameServiceButtons("zomboid");
      return Promise.resolve(buttons);
    }
    default:
      return Promise.resolve(`unknown zomboid command ${command.args[0]}`);
  }
};
