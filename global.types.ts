import { ButtonPayload } from "./messaging/getButtonPayload.ts";
import { Command } from "./parseCommand.ts";

export type DiscordResponse = string | ButtonPayload;

export type CommandHandler = (command: Command) => Promise<DiscordResponse>;
export type CommandRunner = (
  rawCommand: string,
  skipDryRun?: boolean
) => Promise<DiscordResponse>;
