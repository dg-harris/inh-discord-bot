import { ButtonStyles } from "../botResponses/messaging.types.ts";
import { createHandler } from "../util/handlers.ts";
import { getButtonPayload } from "../botResponses/buttons.ts";
import { invokeAsyncShellTask } from "../util/invokeAsyncShellTask.ts";
import { invokeRawCommand } from "../util/invokeRawCommand.ts";
import { invokeShellTask } from "../util/invokeShellTask.ts";

export const invokeTestCommand = createHandler({
  shell: { task: () => invokeShellTask("test", true) },
  raw: { task: () => invokeRawCommand("pwd", true) },
  async: { task: () => invokeAsyncShellTask("async-test", true) },
  buttons: {
    task: () => {
      return Promise.resolve(
        getButtonPayload("test buttons", [
          { label: "normal", customId: "normal" },
          {
            label: "success",
            style: ButtonStyles.Success,
            customId: "success",
          },
          { label: "danger", style: ButtonStyles.Danger, customId: "danger" },
          {
            label: "secondary",
            style: ButtonStyles.Secondary,
            customId: "secondary",
          },
        ])
      );
    },
  },
});
