import React from "react";
import { Message, User, Emoji } from "../chat/Types";
import { SlackMessageContainer } from "../components/Slack/MessageContainer";
import { UserStoreContextContainer } from "../components/UserStore";
import { EmojiStoreContextContainer } from '../components/EmojiStore';

type SlackPageProps = {
  pageContext: {
    messages: Message[];
    users: User[];
    emojis: Emoji[];
  };
};

export default function SlackPage(props: SlackPageProps) {
  return (
    <UserStoreContextContainer users={props.pageContext.users}>
      <EmojiStoreContextContainer emojis={props.pageContext.emojis}>
        <SlackMessageContainer messages={props.pageContext.messages} />
      </EmojiStoreContextContainer>
    </UserStoreContextContainer>
  );
}
