import { CommandHandler } from "../global.types.ts";
import { invokeShellTask } from "../invokeShellTask.ts";
import {
  ButtonStyles,
  getButtonGridPayload,
} from "../messaging/getButtonPayload.ts";
import { isDryRun } from "../util/isDryRun.ts";
import { invokeFactorioCommand } from "./factorio.ts";
import { invokeTestCommand } from "./test.ts";
import { invokeValheimCommand } from "./valheim.ts";

export const handleCommand: CommandHandler = (command) => {
  switch (command.name) {
    case "ping":
      return invokeShellTask("ping");
    case "ip":
      return invokeShellTask("ip");
    case "status":
      return invokeShellTask("status");
    case "update":
      return invokeShellTask("update");
    case "help":
      return invokeShellTask("help");
    case "stats":
      return invokeShellTask("stats");
    case "factorio":
      return invokeFactorioCommand(command);
    case "valheim":
      return invokeValheimCommand(command);
    case "commands":
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
          ],
          [
            { label: "ping", custom_id: "ping" },
            { label: "ip", custom_id: "ip" },
            { label: "status", custom_id: "status" },
            { label: "update", custom_id: "update" },
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
    case "test":
      if (isDryRun()) {
        return invokeTestCommand(command);
      }
    // fall through to unrecognized command if we're not in test mode
    default:
      return Promise.resolve(`Unrecognized command ${command.name}`);
  }
};
