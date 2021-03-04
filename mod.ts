import { startBot } from "https://cdn.deno.land/discordeno/versions/10.4.0/raw/mod.ts";
import { invokeCommand } from './invokeCommand.ts';
import { token } from './secrets.ts';

startBot({
  token,
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_EMOJIS", "GUILD_WEBHOOKS"],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(message) {
      switch (message.content) {
	case "!ping":
	  invokeCommand('ping').then(results => message.reply(results)).catch(results => message.reply('Error processing status. Check Log.'));
	  break;
	case "!ip":
	  invokeCommand('ip').then(results => message.reply(results)).catch(results => message.reply('Error processing status. Check Log.'));
          break;
	case "!uname":
	  invokeCommand('uname').then(results => message.reply(results)).catch(results => message.reply('Error processing command, check logs'));
	  break;
	case "!pwd":
	  invokeCommand('pwd').then(results => message.reply(results)).catch(results => message.reply('Error processing command, check logs'));
	  break;
	case "!status":
	  invokeCommand('status').then(results => message.reply(results)).catch(results => message.reply('Error processing status. Check Log.'));
	  break;
	case "!update":
	  invokeCommand('update').then(results => message.reply(results)).catch(results => message.reply('Error processing status. Check Log.'));
	  break;
      }
    },
  },
});

// const invokeCommandMessaging(command: () => Promise<String>, message
