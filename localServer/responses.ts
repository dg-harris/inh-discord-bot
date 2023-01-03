export const httpInvalidRequest = (response: unknown) =>
  new Response(JSON.stringify(response), { status: 400 });

export const httpMethodNotSupported = (response: unknown) =>
  new Response(JSON.stringify(response), { status: 405 });

export const httpOk = (response: unknown) =>
  new Response(JSON.stringify(response), { status: 200 });
