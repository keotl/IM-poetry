import { Message, User, Emoji } from "./Types";
import { SlackChatLogParser } from './Parser/SlackChatParser';

export interface ChatLogParser {
  extractMessages(dump: string): Message[];
    extractUsers(dump: string): User[];
    extractEmojis(dump: string) : Emoji[];
}

export function createChatLogParser() {
    return new SlackChatLogParser();
}
