//https://discord.com/developers/docs/interactions/message-components#buttons-button-styles
export enum ButtonStyles {
  Primary = 1, // blurple (not a typo)
  Secondary = 2, // grey
  Success = 3, // green
  Danger = 4, // red
  Link = 5, // grey and only used with links
}

interface ButtonParams {
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

export const getButtonPayload = (
  content: string,
  buttons: ButtonParams[]
): ButtonPayload => {
  return {
    content,
    components: [
      {
        type: 1,
        components: buttons.map((button) => ({ ...defaultButton, ...button })),
      },
    ],
  };
};
export const getButtonGridPayload = (
  content: string,
  buttonGrid: ButtonParams[][]
) => {
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
