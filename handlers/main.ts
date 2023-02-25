import { ButtonStyles } from "../botResponses/messaging.types.ts";
import { CommandHandler } from "../global.types.ts";
import { getButtonGridPayload } from "../botResponses/buttons.ts";
import { invokeFactorioCommand } from "./factorio.ts";
import { invokeForestCommand } from "./forest.ts";
import { invokeRawCommand } from "../util/invokeRawCommand.ts";
import { invokeShellTask } from "../util/invokeShellTask.ts";
import { invokeTestCommand } from "./test.ts";
import { invokeVRisingCommand } from "./vrising.ts";
import { invokeValheimCommand } from "./valheim.ts";
import { invokeZomboidCommand } from "./zomboid.ts";
import { isDryRun } from "../util/isDryRun.ts";
import { rollbackToPrevious } from "../update/rollbackToPrevious.ts";
import { updateToLatest } from "../update/updateToLatest.ts";

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
    case "forest":
      return invokeForestCommand(command);
    case "zomboid":
      return invokeZomboidCommand(command);
    case "bot":
      return Promise.resolve(
        getButtonGridPayload("choose a command", [
          [
            {
              label: "Valheim",
              customId: "valheim",
              emoji: { name: "viking", id: "816717521611784272" },
            },
            {
              label: "⚙️ Factorio",
              customId: "factorio",
            },
            {
              label: "🧟 Zomboid",
              customId: "zomboid",
            },
            {
              label: "🧛 V Rising",
              customId: "vrising",
            },
            {
              label: "🌲 The Forest",
              customId: "forest",
            },
          ],
          [
            { label: "ping", customId: "ping" },
            { label: "ip", customId: "ip" },
            { label: "status", customId: "status" },
            { label: "stats", customId: "stats" },
          ],
          [
            {
              label: "❓ help",
              customId: "help",
              style: ButtonStyles.Secondary,
            },
          ],
        ])
      );
    case "update":
      return updateToLatest();
    case "rollback":
      return rollbackToPrevious();
    case "version":
      return invokeRawCommand(
        ["git", "rev-parse", "--short", "HEAD"],
        true
      ).then((commit) => `Current version on disk is: ${commit}`);
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
