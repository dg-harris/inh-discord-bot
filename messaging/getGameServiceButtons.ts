import {
  ButtonParams,
  ButtonStyles,
  getButtonGridPayload,
} from "./getButtonPayload.ts";

interface Options {
  additionalButtons?: ButtonParams[];
  /**
   * custom message for the button display instead of the default "choose a {service} action"
   */
  message?: string;
}

export const getGameServiceButtons = (
  serviceName: string,
  options?: Options
) => {
  const { additionalButtons = [], message = `Choose a ${serviceName} action` } =
    options || {};

  return getButtonGridPayload(message, [
    [
      {
        label: "start",
        custom_id: `${serviceName} start`,
        style: ButtonStyles.Success,
      },
      {
        label: "stop",
        custom_id: `${serviceName} stop`,
        style: ButtonStyles.Danger,
      },
      {
        label: "update",
        custom_id: `${serviceName} update`,
      },
      {
        label: "status",
        custom_id: `${serviceName} status`,
      },
      ...additionalButtons,
    ],
  ]);
};
