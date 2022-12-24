interface InteractionContext {
  id: BigInt;
  token: string;
}
export const sendInteractionResponse = (
  response: Record<string, unknown>,
  context: InteractionContext
) => {
  const url = `https://discord.com/api/v8/interactions/${context.id}/${context.token}/callback`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
