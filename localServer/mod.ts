import { RouteDefinition, RouteHandler } from "./localServer.types.ts";
import { httpInvalidRequest, notFound } from "./responses.ts";

import { Bot } from "../deps.ts";
import { isValidChannel } from "./channels.ts";
import messagesRouter from "./messagesRouter.ts";
import pinnedMessagesRouter from "./pinnedMessagesRouter.ts";

/**
 * Starts a small local http server
 * listens on port 8080 by default but can be set with BOT_LOCAL_HTTP_PORT env variable
 * to send an bot message send a JSON request to `127.0.0.1:<PORT>/messages/<CHANNEL>` with the body `{"content": "<MESSAGE_TO_SEND>"}`
 * ex:  `curl -X POST 127.0.0.1:8080/messages/dev -d '{"content": "test message from http call"}'`
 * @param botContext Bot context provided by the discord bot startup process
 */

export const startServer = async (botContext: Bot) => {
  const port = Number(Deno.env.get("BOT_LOCAL_HTTP_PORT")) || 8080;
  const hostname = "127.0.0.1";

  const server = Deno.listen({ port, hostname });
  for await (const conn of server) {
    const httpConn = Deno.serveHttp(conn);
    handleRequest(httpConn, botContext);
  }
};

// add routes here, they will be evaluated in the order provided
const routers: RouteDefinition[] = [messagesRouter, pinnedMessagesRouter];

const handleRequest = async (httpConn: Deno.HttpConn, botContext: Bot) => {
  for await (const requestEvent of httpConn) {
    // Find Route to handle request
    let match: URLPatternResult | null = null;
    let handler: RouteHandler | null = null;
    for (const router of routers) {
      match = router.route.exec(requestEvent.request.url);
      if (match) {
        handler = router.handler;
        break;
      }
    }

    if (match && handler) {
      // Load channelId into channel name param
      const channelName = match.pathname.groups.channelName;
      if (typeof channelName !== "undefined" && !isValidChannel(channelName)) {
        return httpInvalidRequest({
          message: `invalid channel name ${channelName}`,
        });
      }

      const response = await handler(match, requestEvent.request, botContext);
      return requestEvent.respondWith(response);
    }

    return requestEvent.respondWith(
      notFound({ message: "Route does not exist" })
    );
  }
};
