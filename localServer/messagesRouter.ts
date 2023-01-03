import { getChannel, isValidChannel } from "./channels.ts";
import {
  httpInvalidRequest,
  httpMethodNotSupported,
  httpOk,
} from "./responses.ts";

import { Bot } from "../deps.ts";
import { discordMessageSchema } from "./schemas.ts";

export const messagesRoute = new URLPattern({
  pathname: "/messages/:channelName/:messageId?",
});

export const messagesRouter = async (
  req: Request,
  botContext: Bot
): Promise<Response | undefined> => {
  const match = messagesRoute.exec(req.url);
  if (!match) {
    return undefined;
  }

  const channelName = match.pathname.groups.channelName;
  const messageId = match.pathname.groups.messageId;

  if (!isValidChannel(channelName)) {
    return httpInvalidRequest({
      message: `invalid channel name ${channelName}`,
    });
  }
  const channelId = getChannel(channelName);

  const body = await req.json().catch((e) => {
    console.error(e);
    return e;
  });
  if (body instanceof Error) {
    return httpInvalidRequest({ ...body, message: "invalid json" });
  }

  switch (req.method) {
    case "POST": {
      const requestMessage = await discordMessageSchema.safeParseAsync(body);
      if (!requestMessage.success) {
        return httpInvalidRequest(requestMessage.error);
      }
      const result = await botContext.helpers.sendMessage(
        channelId,
        requestMessage.data
      );
      return httpOk({ messageId: result.id.toString(), success: true });
    }
    case "PUT": {
      if (!messageId || messageId.length < 1) {
        return httpInvalidRequest({
          message: "editing a message requires a messageId",
        });
      }
      const requestMessage = await discordMessageSchema.safeParseAsync(body);
      if (!requestMessage.success) {
        return httpInvalidRequest(requestMessage.error);
      }
      const result = await botContext.helpers.editMessage(
        channelId,
        messageId,
        requestMessage.data
      );
      return httpOk({ messageId: result.id.toString(), success: true });
    }
    default:
      return httpMethodNotSupported(`method "${req.method}" not supported`);
  }
};
