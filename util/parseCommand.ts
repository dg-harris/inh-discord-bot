import { Command } from "../global.types.ts";
import { isDryRun } from "./isDryRun.ts";

const parseCommand = (commandText: string): Command => {
  const [name, ...args] = commandText.split(" ");
  return {
    name,
    args,
  };
};

export const parseMessageCommand = (message: string): Command | false => {
  const commandLeader = isDryRun() ? "$" : "!";
  if (!message.startsWith(commandLeader)) {
    return false;
  }
  const commandText = message.substring(1);
  return parseCommand(commandText);
};

interface Interaction {
  data?: {
    customId?: string;
  };
}

//TODO: filter for applicationId?
export const parseInteractionCommand = (
  interaction: Interaction
): Command | undefined => {
  if (!interaction?.data?.customId) {
    return undefined;
  }

  return parseCommand(interaction.data.customId);
};
