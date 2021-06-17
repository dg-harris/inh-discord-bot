import { invokeRawCommand } from "../invokeRawCommand.ts";
import { invokeShellTask } from "../invokeShellTask.ts";
import {
  ButtonStyles,
  getButtonPayload,
} from "../messaging/getButtonPayload.ts";
import { createHandler } from "../util/handlers.ts";

export const invokeTestCommand = createHandler({
  shell: { task: () => invokeShellTask("test", true) },
  raw: { task: () => invokeRawCommand("pwd", true) },
  buttons: {
    task: () => {
      const id = { custom_id: "test buttons" };
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
