import { ButtonStyles } from "../botResponses/messaging.types.ts";
import { createHandler } from "../util/handlers.ts";
import { getButtonPayload } from "../botResponses/buttons.ts";
import { invokeRawCommand } from "../util/invokeRawCommand.ts";
import { invokeShellTask } from "../util/invokeShellTask.ts";

export const invokeTestCommand = createHandler({
  shell: { task: () => invokeShellTask("test", true) },
  raw: { task: () => invokeRawCommand("pwd", true) },
  buttons: {
    task: () => {
      const id = { customId: "test buttons" };
      return Promise.resolve(
        getButtonPayload("test buttons", [
          { label: "normal", ...id },
          {
            label: "success",
            style: ButtonStyles.Success,
            ...id,
          },
          { label: "danger", style: ButtonStyles.Danger, ...id },
          { label: "secondary", style: ButtonStyles.Secondary, ...id },
        ])
      );
    },
  },
});
