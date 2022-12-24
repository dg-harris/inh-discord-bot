import {
  Intents,
  createBot,
  startBot,
} from "https://deno.land/x/discordeno@17.0.0/mod.ts";
import {
  parseInteractionCommand,
  parseMessageCommand,
} from "./util/parseCommand.ts";

import { DiscordResponse } from "./global.types.ts";
import { handleCommand } from "./handlers/main.ts";
import { sendInteractionResponse } from "./botResponses/sendInteractionResponse.ts";
import { startServer } from "./localServer/mod.ts";
import { token } from "./secrets.ts";

const isString = (obj: DiscordResponse): obj is string =>
  typeof obj === "string";

const bot = createBot({
  token,
  intents:
    Intents.Guilds |
    Intents.GuildMessages |
    Intents.GuildEmojis |
    Intents.GuildWebhooks |
    Intents.MessageContent,
  events: {
    ready(bot) {
      console.log("Successfully connected to gateway");
      startServer(bot);
    },
    messageCreate(client, message) {
      const command = parseMessageCommand(message.content);
      if (!command) {
        return;
      }

      const sendResponse = (results: DiscordResponse) => {
        if (isString(results))
          client.helpers.sendMessage(message.channelId, { content: results });
        else {
          try {
            client.helpers.sendMessage(message.channelId, results);
          } catch (e) {
            console.error(e);
          }
        }
      };

      const sendError = (e: Error) =>
        client.helpers.sendMessage(message.channelId, {
          content: `Error Sending Command\nError: ${e.message}`,
        });

      handleCommand(command).then(sendResponse).catch(sendError);
    },
    interactionCreate(_, interaction) {
      const command = parseInteractionCommand(interaction);
      if (!command) {
        console.error(`did not recieve customId for interaction`);
        return;
      }

      handleCommand(command).then((result) => {
        const response = {
          type: 7,
          data: isString(result) ? { content: result, components: [] } : result,
        };

        sendInteractionResponse(response, interaction)
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

startBot(bot);
