import {
  ActionRow,
  ButtonComponent,
  CreateMessage,
  MessageComponentTypes,
} from "https://deno.land/x/discordeno@17.0.0/mod.ts";

export type DiscordCreateMessagePayload = CreateMessage;

export type DiscordActionRow = ActionRow;

export type DiscordMessageComponentTypes = MessageComponentTypes;

export type DiscordButtonComponent = ButtonComponent;

//https://discord.com/developers/docs/interactions/message-components#buttons-button-styles
export enum ButtonStyles {
  Primary = 1, // blurple (not a typo)
  Secondary = 2, // grey
  Success = 3, // green
  Danger = 4, // red
  Link = 5, // grey and only used with links
}
