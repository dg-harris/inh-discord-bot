import { CommandHandler } from "../global.types.ts";
import { invokeRawCommand } from "../invokeRawCommand.ts";
import { invokeShellTask } from "../invokeShellTask.ts";
import {
  ButtonStyles,
  getButtonPayload,
} from "../messaging/getButtonPayload.ts";

export const invokeTestCommand: CommandHandler = (command) => {
  switch (command.args[0]) {
    case "shell":
      return invokeShellTask("test", true);
    case "raw":
      return invokeRawCommand("pwd", true);
    case undefined: {
      const buttons = getButtonPayload("Choose a test action", [
        {
          label: "shell",
          custom_id: "test shell",
        },
        {
          label: "raw",
          custom_id: "test raw",
          style: ButtonStyles.Danger,
        },
      ]);
      return Promise.resolve(buttons);
    }
    default:
      return Promise.resolve(`unknown test command ${command.args[0]}`);
  }
};
