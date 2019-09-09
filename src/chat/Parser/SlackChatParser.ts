import { ChatLogParser } from "../ChatLogParser";
import { Message, User, SLACK_DUMP_TYPE } from "../Types";

export class SlackChatLogParser implements ChatLogParser {
  extractMessages(dump: string): Message[] {
    const payload = JSON.parse(dump) as SlackDumpFormat;
    const messages = payload.messages.map(m => ({
      id: m.client_msg_id,
      text: m.text,
      user: m.user,
      timestamp: new Date(parseInt(m.ts.split(".")[0]) * 1000),
    }));
      messages.sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime());
      return messages;
  }
  extractUsers(dump: string): User[] {
      const payload = JSON.parse(dump) as SlackDumpFormat;
      return payload.users.map(u => ({
          id: u.id,
          name: u.real_name,
          avatar_url: u.profile.image_512
      }));
  }
}

type SlackDumpFormat = {
  type: typeof SLACK_DUMP_TYPE;
  messages: {
    client_msg_id: string;
    text: string;
    ts: string;
    user: string;
    team: string;
    type: string;
  }[];
    users: {
        id: string;
        team_id: string;
        name: string;
        real_name: string;
        profile: {
            image_24: string;
            image_32: string;
            image_48: string;
            image_72: string;
            image_192: string;
            image_512: string;
        }
    }[]
};
