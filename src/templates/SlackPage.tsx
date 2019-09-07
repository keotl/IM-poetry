import React from "react";
import { Message, User } from "chat/Types";

type SlackPageProps = {
  pageContext: {
    messages: Message[];
    users: User[];
  };
};

export default function SlackPage(props: SlackPageProps) {
  return <div>{JSON.stringify(props.pageContext.messages)}</div>;
}
