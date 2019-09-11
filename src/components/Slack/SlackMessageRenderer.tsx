import { Message } from "../../chat/Types";
import React, { Fragment } from "react";

type SlackMessageRendererProps = {
  message: Message;
};
const emojiRe = /:(\S+):/;

export function SlackMessageRenderer(props: SlackMessageRendererProps) {
  const matches = emojiRe.exec(props.message.text);

  return <Fragment>{props.message.text}</Fragment>;
}
