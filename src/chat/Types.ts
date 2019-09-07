export type Message = {
  id: string;
  text: string;
  user: string;
  timestamp: Date;
};

export type User = {
  id: string;
  name: string;
  avatar_url: string;
};

export const SLACK_DUMP_TYPE = "SLACK";
