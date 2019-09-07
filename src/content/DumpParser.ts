import { Message, User } from "./Types";

export interface DumpParser {
  extractMessages(dump: string): Message[];
  extractUsers(dump: string): User[];
}
