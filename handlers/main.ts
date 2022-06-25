import { CommandHandler } from "../global.types.ts";
import { invokeShellTask } from "../util/invokeShellTask.ts";
import {
  ButtonStyles,
  getButtonGridPayload,
} from "../messaging/getButtonPayload.ts";
import { isDryRun } from "../util/isDryRun.ts";
import { invokeFactorioCommand } from "./factorio.ts";
import { invokeTestCommand } from "./test.ts";
import { invokeValheimCommand } from "./valheim.ts";
import { invokeZomboidCommand } from "./zomboid.ts";
import { invokeVRisingCommand } from "./vrising.ts";

export const handleCommand: CommandHandler = (command) => {
  switch (command.name) {
    case "ping":
      return invokeShellTask("ping");
    case "ip":
      return invokeShellTask("ip");
    case "status":
      return invokeShellTask("status");
    case "help":
      return invokeShellTask("help");
    case "stats":
      return invokeShellTask("stats");
    case "factorio":
      return invokeFactorioCommand(command);
    case "valheim":
      return invokeValheimCommand(command);
    case "vrising":
      return invokeVRisingCommand(command);
    case "zomboid":
      return invokeZomboidCommand(command);
    case "bot":
      return Promise.resolve(
        getButtonGridPayload("choose a command", [
          [
            {
              label: "Valheim",
              custom_id: "valheim",
              emoji: { name: "viking", id: "816717521611784272" },
            },
            {
              label: "⚙️ Factorio",
              custom_id: "factorio",
            },
            {
              label: "🧟 Zomboid",
              custom_id: "zomboid",
            },
		{
              label: "🧛 V Rising",
              custom_id: "vrising",
            },
          ],
          [
            { label: "ping", custom_id: "ping" },
            { label: "ip", custom_id: "ip" },
            { label: "status", custom_id: "status" },
            { label: "stats", custom_id: "stats" },
          ],
          [
            {
              label: "❓ help",
              custom_id: "help",
              style: ButtonStyles.Secondary,
            },
          ],
        ])
      );
    case "cancel":
      return Promise.resolve("Command was cancelled");
    case "test":
      if (isDryRun()) {
        return invokeTestCommand(command);
      }
    // fall through to unrecognized command if we're not in test mode
    default:
      return Promise.resolve(`Unrecognized command ${command.name}`);
  }
};
