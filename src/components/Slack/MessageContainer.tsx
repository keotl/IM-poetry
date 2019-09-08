import React from "react";
import { MessageComponent } from "./Message";
import { Message } from '../../chat/Types';

type SlackMessageContainerProps = {
  messages: Message[];
};

export function SlackMessageContainer(props: SlackMessageContainerProps) {
  return (
    <div>
      {props.messages.map(m => (
        <MessageComponent message={m} key={m.id} />
      ))}
    </div>
  );
}
