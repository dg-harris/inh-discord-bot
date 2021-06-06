import { assertEquals } from "https://deno.land/std@0.95.0/testing/asserts.ts";
import { Command, parseMessageCommand } from "./parseCommand.ts";

const commandTests: Array<[string, Command | false]> = [
  ["!ip", { name: "ip", args: [] }],
  ["a message", false],
  ["!factorio start", { name: "factorio", args: ["start"] }],
  ["!valheim update server", { name: "valheim", args: ["update", "server"] }],
];

commandTests.forEach(([test, result]) => {
  Deno.test(test, () => {
    assertEquals(parseMessageCommand(test), result);
  });
});
