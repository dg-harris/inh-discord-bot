import { CommandHandler } from "../global.types.ts";
import { invokeShellTask } from "../invokeShellTask.ts";
import { getGameServiceButtons } from "../messaging/getGameServiceButtons.ts";

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
      const buttons = getGameServiceButtons("valheim", {
        additionalButtons: [{ label: "players", custom_id: "valheim players" }],
      });
      return Promise.resolve(buttons);
    }
    default:
      return Promise.resolve(`unknown valheim command ${command.args[0]}`);
  }
};
