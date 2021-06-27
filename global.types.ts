import { ButtonPayload } from "./messaging/getButtonPayload.ts";

export interface Command {
  name: string;
  args: string[];
}

export type DiscordResponse = string | ButtonPayload;

export type CommandHandler = (command: Command) => Promise<DiscordResponse>;
export type CommandRunner = (
  rawCommand: string,
  skipDryRun?: boolean
) => Promise<DiscordResponse>;
