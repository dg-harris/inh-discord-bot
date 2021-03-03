import { startBot } from "https://deno.land/x/discordeno/mod.ts";
import { invokeCommand } from './invokeCommand.ts'
import { token } from './secrets.ts'

startBot({
  token,
  intents: ["GUILDS", "GUILD_MESSAGES"],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(message) {
      switch (message.content) {
	case "!ping":
	  message.reply("Pong using Discordeno")
	  break;
	case "!uname":
	  invokeCommand('uname').then(results => message.reply(results)).catch(results => message.reply('Error processing command, check logs'));
	  break;
	case "!pwd":
	  invokeCommand('pwd').then(results => message.reply(results)).catch(results => message.reply('Error processing command, check logs'));
      }
    },
  },
});

// const invokeCommandMessaging(command: () => Promise<String>, message
