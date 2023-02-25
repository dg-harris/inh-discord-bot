import { invokeRawCommand } from "../util/invokeRawCommand.ts";

export const rollbackToPrevious = async () => {
  const tags = await invokeRawCommand(
    ["git", "--no-pager", "tag", "-l", "--points-at", "HEAD"],
    true
  );

  if (tags.includes("previous")) {
    return "Already rolled back to lastest stable version";
  }

  // checkout previous
  await invokeRawCommand(["git", "checkout", "previous"], true);

  // get commit
  const currentCommit = await invokeRawCommand(
    ["git", "rev-parse", "--short", "HEAD"],
    true
  );

  return `Rollback to ${currentCommit.trim()} complete`;
};
