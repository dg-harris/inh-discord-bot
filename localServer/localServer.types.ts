import { Bot } from "../deps.ts";

export type RouteHandler = (
  match: URLPatternResult,
  req: Request,
  botContext: Bot
) => Promise<Response>;

export interface RouteDefinition {
  route: URLPattern;
  handler: RouteHandler;
}
