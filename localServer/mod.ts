import { devChannelId, valheimChannelId } from "../secrets.ts";

import { Bot } from "https://deno.land/x/discordeno@17.0.0/mod.ts";

const channels = {
  dev: devChannelId,
  valheim: valheimChannelId,
};
type ChannelName = keyof typeof channels;
const channelList = Object.keys(channels);

const isValidChannel = (string: string): string is ChannelName =>
  channelList.includes(string);

/**
 * Starts a small local http server
 * listens on port 8080 by default but can be set with BOT_LOCAL_HTTP_PORT env variable
 * to send an bot message send a JSON request to `127.0.0.1:<PORT>/<CHANNEL>` with the body `{"content": "<MESSAGE_TO_SEND>"}`
 * ex:  `curl -X POST 127.0.0.1:8080/dev -d '{"content": "test message from http call"}'`
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
    const url = requestEvent.request.url;
    let body;
    try {
      body = await requestEvent.request.json();
    } catch (e) {
      const errorResponse = {
        message: e?.message,
      };
      return requestEvent.respondWith(
        new Response(JSON.stringify(errorResponse), { status: 400 })
      );
    }

    // Validate channel
    const path = url.split("/").pop();
    if (!path || !isValidChannel(path)) {
      return requestEvent.respondWith(
        new Response(
          JSON.stringify({
            message: "please add a valid channel name to the url path",
            channelList,
            channel: path,
          }),
          { status: 400 }
        )
      );
    }
    const channel = channels[path];

    // Validate Content
    // TODO: support more sophisticated content
    const { content } = body;
    if (!content || !(typeof content === "string")) {
      return requestEvent.respondWith(
        new Response(
          JSON.stringify({
            message: `invalid data provided for key 'content', received: ${content}`,
            content,
          }),
          { status: 400 }
        )
      );
    }

    await botContext.helpers.sendMessage(channel, { content });

    requestEvent.respondWith(
      new Response(JSON.stringify({ body, channel: path, status: "success" }), {
        status: 200,
      })
    );
    // The requestEvent's `.respondWith()` method is how we send the response
    // back to the client.
    // requestEvent.respondWith(
    //   new Response(body, {
    //     status: 200,
    //   })
    // );
  }
};
