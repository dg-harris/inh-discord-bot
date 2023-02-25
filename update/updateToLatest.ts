import { invokeAsyncShellTask } from "../util/invokeAsyncShellTask.ts";
import { invokeRawCommand } from "../util/invokeRawCommand.ts";
import { isDryRun } from "../util/isDryRun.ts";

export const updateToLatest = async () => {
  // get current commit
  const currentCommit = await invokeRawCommand(
    ["git", "rev-parse", "--short", "HEAD"],
    true
  );

  // pull latest
  await invokeRawCommand(["git", "checkout", "main"]);
  await invokeRawCommand(["git", "pull", "origin", "main"]);

  // get commit
  const updateCommit = await invokeRawCommand(
    ["git", "rev-parse", "--short", "HEAD"],
    true
  );

  if (currentCommit === updateCommit) {
    return `Already on latest version ${updateCommit}`;
  }

  // tag previous commit as previous
  await invokeRawCommand(
    ["git", "tag", "previous", currentCommit, "--force"],
    true
  );
  if (isDryRun()) {
    invokeAsyncShellTask("bot-dry-run-restart", true);
  } else {
    invokeAsyncShellTask("bot-restart", true);
  }

  return `Updated version on disk from ${currentCommit.trim()} to ${updateCommit.trim()}`;
};
