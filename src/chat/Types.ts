export type Message = {
  id: string;
  text: string;
  user: string;
  timestamp: Date;
  reactions: EmojiReaction[];
};

export type EmojiReaction = {
  emojiId: string;
  users: string[];
};

export type User = {
  id: string;
  name: string;
  avatar_url: string;
};

export type Emoji = {
  id: string;
  image_url: string;
};

export const SLACK_DUMP_TYPE = "SLACK";
