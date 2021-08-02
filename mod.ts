import { startBot } from "https://cdn.deno.land/discordeno/versions/10.4.0/raw/mod.ts";
import { token } from "./secrets.ts";
import {
  parseInteractionCommand,
  parseMessageCommand,
} from "./util/parseCommand.ts";
import { handleCommand } from "./handlers/main.ts";
import { sendInteractionResponse } from "./messaging/sendInteractionResponse.ts";
import { DiscordResponse } from "./global.types.ts";

// deno-lint-ignore no-explicit-any -- this is for typecasting, any is appropriate here
const isString = (obj: any) => typeof obj === "string";

startBot({
  token,
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_EMOJIS", "GUILD_WEBHOOKS"],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(message) {
      const command = parseMessageCommand(message.content);
      if (!command) {
        return;
      }

      const sendResponse = (results: DiscordResponse) => {
        if (isString(results)) message.reply(results);
        else {
          try {
            message.channel?.send({
              payload_json: JSON.stringify(results),
            });
          } catch (e) {
            console.error(e);
          }
        }
      };

      const sendError = (e: Error) =>
        message.reply(`Error Sending Command\nError: ${e.message}`);

      handleCommand(command).then(sendResponse).catch(sendError);
    },
    interactionCreate(data) {
      //@ts-ignore data typing is missing the new custom_id property for buttons that we need
      const command = parseInteractionCommand(data);

      handleCommand(command).then((result) => {
        const response = {
          type: 7,
          data: isString(result) ? { content: result, components: [] } : result,
        };

        sendInteractionResponse(response, data)
          .then((response) => {
            if (response.status !== 200) {
              response.text().then((body) => console.error(body));
            }
          })
          .catch((error) => console.error(error));
      });
    },
  },
});
