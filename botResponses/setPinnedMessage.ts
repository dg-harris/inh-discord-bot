import { Bot } from "../deps.ts";
import { DiscordCreateMessagePayload } from "./messaging.types.ts";
import { devChannelId } from "../secrets.ts";

export const setPinnedMessage = async (
  message: DiscordCreateMessagePayload,
  channelId: string,
  botContext: Bot
) => {
  const pinnedMessage = await botContext.helpers
    .getPinnedMessages(devChannelId)
    .then((result) =>
      result.filter((message) => message.authorId === botContext.id).first()
    );

  if (!pinnedMessage) {
    const newMessage = await botContext.helpers.sendMessage(channelId, message);
    try {
      await botContext.helpers.pinMessage(channelId, newMessage.id);
    } catch (e) {
      console.error("Unable to pin message");
      console.error(e);
      return { ...newMessage, success: false };
    }
    return newMessage;
  }

  return botContext.helpers.editMessage(channelId, pinnedMessage?.id, message);
};
