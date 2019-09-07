import { DumpParser } from "content/DumpParser";
import { Message, User, SLACK_DUMP_TYPE } from "content/Types";

export class SlackDumpParser implements DumpParser {
  extractMessages(dump: string): Message[] {
      const payload = JSON.parse(dump) as SlackDumpFormat;
      return payload.messages.map(m => ({
          id: m.client_msg_id,
          text: m.text,
          user: m.user,
          timestamp: new Date(parseInt(m.ts.split(".")[0]) * 1000)
      }));

  }
    extractUsers(dump: string): User[] {
    return []
  }
}

type SlackDumpFormat = {
    type: typeof SLACK_DUMP_TYPE,
    messages: {
        client_msg_id: string;
        text: string;
        ts: string;
        user: string;
        team: string;
        type: string;
    }[]

}

