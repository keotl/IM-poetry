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
    return [];
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
};
