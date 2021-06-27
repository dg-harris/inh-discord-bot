import { Command, CommandHandler, DiscordResponse } from "../global.types.ts";
import { invokeShellTask } from "../util/invokeShellTask.ts";
import {
  ButtonParams,
  ButtonStyles,
  getButtonGridPayload,
} from "../messaging/getButtonPayload.ts";

interface CommandConfig {
  task: (command: Command) => Promise<DiscordResponse>;
  buttonSettings?: Partial<ButtonParams>;
  noButton?: boolean;
}
type CommandConfigs = { [key: string]: CommandConfig };

export const createHandler = (commands: CommandConfigs): CommandHandler => {
  return (command) => {
    const [subcommand, ..._] = command.args;
    // return buttons if no args are provided
    if (!subcommand) {
      const buttonConfigs = Object.entries(commands)
        .filter(([_, { noButton }]) => !noButton)
        .map<ButtonParams>(([commandKey, { buttonSettings }]) => ({
          label: commandKey,
          custom_id: `${command.name} ${commandKey}`,
          ...buttonSettings,
        }));

      return Promise.resolve(
        getButtonGridPayload(`Select action for ${command.name}`, [
          buttonConfigs,
        ])
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
