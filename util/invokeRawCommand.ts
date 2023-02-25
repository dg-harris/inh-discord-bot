import { isDryRun } from "./isDryRun.ts";

/**
 * CAUTION: DO NOT PASS USER INPUT DIRECLTY INTO THIS FUNCTION
 * Directly calls a command and returns the output as a string once it is finished
 * @param cmd raw command
 * @returns
 */
export const invokeRawCommand = async (
  rawCommand: string | string[],
  skipDryRun?: boolean
): Promise<string> => {
  if (isDryRun() && !skipDryRun) {
    return `Would have executed command: ${rawCommand}`;
  }

  const cmd =
    typeof rawCommand === "string" ? rawCommand.split(" ") : rawCommand;
  try {
    const results = Deno.run({
      cmd,
      stdout: "piped",
      stderr: "piped",
    });

    const { code } = await results.status();
    if (code === 0) {
      const rawOutput = await results.output();
      const output = new TextDecoder().decode(rawOutput);
      return output;
    } else {
      const rawError = await results.stderrOutput();
      Deno.stderr.write(rawError);
      return "Error Parsing command, check logs";
    }
  } catch (error) {
    console.error(error);
    return error.toString();
  }
};
