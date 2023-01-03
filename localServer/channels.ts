import { devChannelId, valheimChannelId } from "../secrets.ts";

const channels = {
  dev: devChannelId,
  valheim: valheimChannelId,
};

type ChannelName = keyof typeof channels;
const channelList = Object.keys(channels);

export const isValidChannel = (string: string): string is ChannelName =>
  channelList.includes(string);

export const getChannel = (name: ChannelName) => channels[name];
