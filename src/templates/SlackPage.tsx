import React from "react";
import { Message, User } from '../chat/Types';
import { SlackMessageContainer } from '../components/Slack/MessageContainer';


type SlackPageProps = {
  pageContext: {
    messages: Message[];
    users: User[];
  };
};

export default function SlackPage(props: SlackPageProps) {
  return (
    <div>
      <SlackMessageContainer messages={props.pageContext.messages} />
    </div>
  );
}
