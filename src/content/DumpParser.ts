import { Message, User } from "./Types";
import { SlackDumpParser } from './Parser/SlackDumpParser';

export interface DumpParser {
  extractMessages(dump: string): Message[];
  extractUsers(dump: string): User[];
}

export function CreateDumpParser() {
    return new SlackDumpParser();
}
