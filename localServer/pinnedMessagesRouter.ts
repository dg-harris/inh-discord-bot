import { getChannel, isValidChannel } from "./channels.ts";
import {
  httpInvalidRequest,
  httpMethodNotSupported,
  httpOk,
} from "./responses.ts";

import { Bot } from "../deps.ts";
import { discordMessageSchema } from "./schemas.ts";
import { setPinnedMessage } from "../botResponses/setPinnedMessage.ts";

export const pinnedMessagesRoute = new URLPattern({
  pathname: "/pinned/:channelName",
});

export const pinnedMessagesRouter = async (
  req: Request,
  botContext: Bot
): Promise<Response | undefined> => {
  const match = pinnedMessagesRoute.exec(req.url);
  if (!match) {
    // do a thing
    return undefined;
  }

  const channelName = match.pathname.groups.channelName;
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
    case "PUT": {
      const requestMessage = await discordMessageSchema.safeParseAsync(body);
      if (!requestMessage.success) {
        return httpInvalidRequest(requestMessage.error);
      }
      const result = await setPinnedMessage(
        requestMessage.data,
        channelId,
        botContext
      );
      return httpOk({ messageId: result.id.toString(), success: true });
    }
    default:
      return httpMethodNotSupported(`method "${req.method}" not supported`);
  }
};
