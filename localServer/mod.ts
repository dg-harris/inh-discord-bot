import { Bot } from "../deps.ts";
import { messagesRouter } from "./messagesRouter.ts";
import { pinnedMessagesRouter } from "./pinnedMessagesRouter.ts";

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

const handleRequest = async (httpConn: Deno.HttpConn, botContext: Bot) => {
  for await (const requestEvent of httpConn) {
    // add routes here
    // routes should return a response object if the url matches or undefined if the url does not match
    const result: Response | undefined =
      (await pinnedMessagesRouter(requestEvent.request, botContext)) ||
      (await messagesRouter(requestEvent.request, botContext));
    if (result) return requestEvent.respondWith(result);
  }
};
