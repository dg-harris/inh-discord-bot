import { DiscordCreateMessagePayload } from "./botResponses/messaging.types.ts";

export interface Command {
  name: string;
  args: string[];
}

export type DiscordResponse = string | DiscordCreateMessagePayload;

export type CommandHandler = (command: Command) => Promise<DiscordResponse>;
export type CommandRunner = (
  rawCommand: string,
  skipDryRun?: boolean
) => Promise<DiscordResponse>;
