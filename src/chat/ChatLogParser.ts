import { Message, User } from "./Types";
import { SlackChatLogParser } from './Parser/SlackChatParser';

export interface ChatLogParser {
  extractMessages(dump: string): Message[];
  extractUsers(dump: string): User[];
}

export function createChatLogParser() {
    return new SlackChatLogParser();
}
