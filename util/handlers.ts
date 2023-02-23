import {
  ButtonParams,
  ButtonRow,
  getButtonGridPayload,
} from "../botResponses/buttons.ts";
import { Command, CommandHandler, DiscordResponse } from "../global.types.ts";

import { ButtonStyles } from "../botResponses/messaging.types.ts";
import { invokeAsyncShellTask } from "./invokeAsyncShellTask.ts";
import { invokeShellTask } from "../util/invokeShellTask.ts";

interface CommandConfig {
  task: (command: Command) => Promise<DiscordResponse>;
  buttonSettings?: Partial<ButtonParams>;
  noButton?: boolean;
}
type CommandConfigs = { [key: string]: CommandConfig };

/**
 * Creates a bot command handler for a given list of commands
 * it addes the direct commands accessed via "!handlerName commandName [...args]"
 * Also adds a a list of buttons that appear when a handler is accessed via "!handlerName" or another button that opens the handler
 * @param commands list of commands for a given handler
 * @returns a function that takes in a command (parsed from a discord message) and returns a response
 */
export const createHandler = (commands: CommandConfigs): CommandHandler => {
  return (command) => {
    const [subcommand, ..._] = command.args;
    // return buttons if no args are provided
    if (!subcommand) {
      // filter no button commands, add customId to button based on command name, and chunk buttons into rows of 5
      const commandButtons = Object.entries(commands)
        .filter(([_, { noButton }]) => !noButton)
        .reduce((buttonRows, [commandKey, { buttonSettings }]) => {
          const buttonParams: ButtonParams = {
            label: commandKey,
            customId: `${command.name} ${commandKey}`,
            ...buttonSettings,
          };
          const latestRow = buttonRows.pop();
          if (!latestRow) {
            return [[buttonParams]] as ButtonRow[];
          } else if (latestRow.length > 5) {
            return [...buttonRows, latestRow, [buttonParams]] as ButtonRow[];
          } else {
            return [...buttonRows, [...latestRow, buttonParams]] as ButtonRow[];
          }
        }, [] as ButtonRow[]);

      return Promise.resolve(
        getButtonGridPayload(
          `Select action for ${command.name}`,
          commandButtons
        )
      );
    }

    const matchingConfig = commands[subcommand];
    // execute action if it exists
    if (matchingConfig) {
      return matchingConfig.task(command);
    } else {
      return Promise.resolve(
        `Command ${command.name} does not have a sub-command: ${subcommand}`
      );
    }
  };
};

export const shellSubcommandHander = (command: Command) =>
  invokeShellTask(`${command.name}-${command.args[0]}`);

export const asyncShellSubcommandHandler = (command: Command) => {
  return invokeAsyncShellTask(`${command.name}-${command.args[0]}`);
};

export const gameCommandConfigs: CommandConfigs = {
  start: {
    task: shellSubcommandHander,
    buttonSettings: { style: ButtonStyles.Success },
  },
  stop: {
    task: shellSubcommandHander,
    buttonSettings: { style: ButtonStyles.Danger },
  },
  update: { task: shellSubcommandHander },
  status: { task: shellSubcommandHander },
};
