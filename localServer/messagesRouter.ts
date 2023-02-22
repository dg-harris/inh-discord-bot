import { getChannel, isValidChannel } from "./channels.ts";
import {
  httpInvalidRequest,
  httpMethodNotSupported,
  httpOk,
} from "./responses.ts";

import { RouteHandler } from "./localServer.types.ts";
import { discordMessageSchema } from "./schemas.ts";

export const route = new URLPattern({
  pathname: "/messages/:channelName/:messageId?",
});

const handler: RouteHandler = async (match, req, botContext) => {
  const messageId = match.pathname.groups.messageId;
  const channelName = match.pathname.groups.channelName;

  if (!isValidChannel(channelName)) {
    return httpInvalidRequest({
      message: `invalid channel name ${channelName}`,
    });
  }
  const channelId = getChannel(channelName);

  const text = await req.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch (e) {
    console.error;
    body = e;
  }
  // const body = await req.json().catch((e) => {
  // console.error(e);
  // return e;
  // });

  if (body instanceof Error) {
    return httpInvalidRequest({ ...body, message: "invalid json", body: text });
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

export default {
  route,
  handler,
};
