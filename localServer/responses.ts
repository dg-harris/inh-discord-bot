const jsonResponse = (response: unknown, status: number) =>
  new Response(JSON.stringify(response), { status });

export const httpInvalidRequest = (response: unknown) =>
  jsonResponse(response, 400);

export const httpMethodNotSupported = (response: unknown) =>
  jsonResponse(response, 405);

export const httpOk = (response: unknown) => jsonResponse(response, 200);

export const notFound = (response: unknown) => jsonResponse(response, 404);
