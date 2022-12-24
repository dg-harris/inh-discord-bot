import {
  ButtonStyles,
  DiscordButtonComponent,
  DiscordCreateMessagePayload,
} from "./messaging.types.ts";

export interface ButtonParams {
  type?: number;
  style?: ButtonStyles;
  emoji?: {
    id: string;
    name: string;
  };
  label: string;
  customId: string;
}

/**
 * determines the default type and style of button when type and style are not provided
 */
const defaultButton = {
  type: 2,
  style: ButtonStyles.Primary,
};

/**
 * Determines the style of the automatically added cancel button to the bottom of every message payload
 */
const cancelButton = {
  type: 2,
  style: ButtonStyles.Secondary,
  label: "Cancel",
  customId: "cancel",
};

/**
 * Maps button params to a full button message,
 * Primarily for setting defaults for buttons or any other abstractions
 * we want to make. Also keeps id's a strings because we're not psychos like discordeno
 * @param buttonParams Settings for a given button
 */
const getButtonComponent = (
  buttonParams: ButtonParams
): DiscordButtonComponent => {
  const { emoji: emojiParam, ...restOfButtonParams } = buttonParams;

  // Map emoji Id to BigInt
  const emoji = emojiParam
    ? { ...emojiParam, id: BigInt(emojiParam.id) }
    : undefined;

  return {
    ...defaultButton,
    emoji,
    ...restOfButtonParams,
  };
};

/**
 * Hacky work around for tuple type for button rows in discordeno, the tuple type is too restrictive as is
 * so this turns it into a runtime check
 * @returns type check for button row length
 */
const isButtonRowValidLength = (
  buttonRow: DiscordButtonComponent[]
): buttonRow is [DiscordButtonComponent] => {
  return buttonRow.length <= 5 && buttonRow.length > 0;
};

export type ButtonRow =
  | [ButtonParams]
  | [ButtonParams, ButtonParams]
  | [ButtonParams, ButtonParams, ButtonParams]
  | [ButtonParams, ButtonParams, ButtonParams, ButtonParams]
  | [ButtonParams, ButtonParams, ButtonParams, ButtonParams, ButtonParams];

type ButtonGrid = ButtonRow[];

/**
 * Creates a discord message data structure for displaying a multi-row set of buttons
 * @param content message to send with the button grid
 * @param buttonGrid data type defining the what buttons to show
 * @param excludeCancel prevents adding the default cancel button as the last row
 * @returns A discord message payload that will display a button grid
 */
export const getButtonGridPayload = (
  content: string,
  buttonGrid: ButtonGrid,
  excludeCancel?: boolean
): DiscordCreateMessagePayload => {
  if (!excludeCancel) {
    buttonGrid.push([cancelButton]);
  }

  const components = buttonGrid.map((buttonRow) => {
    const components = buttonRow.map(getButtonComponent);
    if (isButtonRowValidLength(components)) {
      return {
        type: 1,
        components,
      };
    } else {
      throw new Error(
        `recieved invalid number of buttons for a given button row`
      );
    }
  });

  return {
    content,
    components,
  };
};

/**
 * Return a message with a single row of buttons
 * @param content
 * @param buttons
 * @param excludeCancel
 * @returns
 */
export const getButtonPayload = (
  content: string,
  buttons: ButtonRow,
  excludeCancel?: boolean
) => getButtonGridPayload(content, [buttons], excludeCancel);
