//https://discord.com/developers/docs/interactions/message-components#buttons-button-styles
export enum ButtonStyles {
  Primary = 1, // blurple (not a typo)
  Secondary = 2, // grey
  Success = 3, // green
  Danger = 4, // red
  Link = 5, // grey and only used with links
}

export interface ButtonParams {
  type?: number;
  style?: ButtonStyles;
  emoji?: {
    id: string;
    name: string;
  };
  label: string;
  custom_id: string;
}

interface ButtonSettings extends ButtonParams {
  type: number;
  style: ButtonStyles;
}

export interface ButtonPayload {
  content: string;
  components: { type: number; components: ButtonSettings[] }[];
}

const defaultButton = {
  type: 2,
  style: 1,
};

const cancelButton: ButtonSettings = {
  type: 2,
  style: ButtonStyles.Secondary,
  label: "Cancel",
  custom_id: "cancel",
};

export const getButtonPayload = (
  content: string,
  buttons: ButtonParams[],
  excludeCancel?: boolean
): ButtonPayload => {
  const components = buttons.map((button) => ({ ...defaultButton, ...button }));

  return {
    content,
    components: [
      {
        type: 1,
        components: excludeCancel ? components : [...components, cancelButton],
      },
    ],
  };
};
export const getButtonGridPayload = (
  content: string,
  buttonGrid: ButtonParams[][],
  excludeCancel?: boolean
) => {
  if (!excludeCancel) {
    buttonGrid.push([cancelButton]);
  }

  return {
    content,
    components: buttonGrid.map((buttonRow) => {
      return {
        type: 1,
        components: buttonRow.map((button) => ({
          ...defaultButton,
          ...button,
        })),
      };
    }),
  };
};
