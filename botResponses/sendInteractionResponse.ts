import { DiscordCreateMessagePayload } from "./messaging.types.ts";

interface InteractionContext {
  id: BigInt;
  token: string;
}
export const sendInteractionResponse = (
  response: { type: number; data: DiscordCreateMessagePayload },
  context: InteractionContext
) => {
  const url = `https://discord.com/api/v8/interactions/${context.id}/${context.token}/callback`;

  //HACK: fix discordeno payload to match discord payload
  const components = response.data.components?.map((component) => {
    const subcomponents = component.components.map((subcomponent) => {
      const { customId, ...rest } = subcomponent;
      return {
        ...rest,
        custom_id: customId,
      };
    });
    return { ...component, components: subcomponents };
  });

  const transformedResponse: any = { ...response };
  transformedResponse.data.components = components;
  console.log(JSON.stringify(transformedResponse, null, 2));

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(transformedResponse),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
