import { isDryRun } from "./isDryRun.ts";
import { Command } from "../global.types.ts";

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
  data: {
    custom_id: string;
  };
}
export const parseInteractionCommand = (interaction: Interaction): Command => {
  //TODO: filter for applicationId?
  return parseCommand(interaction.data.custom_id);
};
