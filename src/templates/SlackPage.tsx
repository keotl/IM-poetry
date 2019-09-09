import React from "react";
import { Message, User } from "../chat/Types";
import { SlackMessageContainer } from "../components/Slack/MessageContainer";
import { UserStoreContextContainer } from "../components/UserStore";

type SlackPageProps = {
  pageContext: {
    messages: Message[];
    users: User[];
  };
};

export default function SlackPage(props: SlackPageProps) {
  return (
    <UserStoreContextContainer users={props.pageContext.users}>
      <SlackMessageContainer messages={props.pageContext.messages} />
    </UserStoreContextContainer>
  );
}
