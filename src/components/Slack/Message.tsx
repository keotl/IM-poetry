import React from "react";
import { Message } from "../../chat/Types";

type MessageComponentProps = {
  message: Message;
};

export function MessageComponent(props: MessageComponentProps) {
  return (
    <div>
      {props.message.text}
      by {props.message.user}
      {props.message.timestamp}
    </div>
  );
}

