import { CommandRunner } from "../global.types.ts";
import { invokeRawCommand } from "./invokeRawCommand.ts";

/**
 * Executes a shell script from shellTasks and returns the output
 * @param command command name, should match a shellscript in the shellTasks folder
 * @returns results of the command as a string
 */

// this is done for consistency and to return a promise from dry run automatically
// deno-lint-ignore require-await
export const invokeShellTask: CommandRunner = async (command, skipDryRun) => {
  const script = `./shellTasks/${command}.sh`;
  return invokeRawCommand(script, skipDryRun);
};
