import { isDryRun } from "./isDryRun.ts";

// async to match existing command handlers
// deno-lint-ignore require-await
export const invokeAsyncShellTask = async (
  command: string,
  skipDryRun?: boolean
) => {
  const script = `./shellTasks/${command}.sh`;
  if (isDryRun() && !skipDryRun) {
    return `Would have started command: ${script}`;
  }

  Deno.run({ cmd: [script] });
  return `starting command ${command}`;
};
