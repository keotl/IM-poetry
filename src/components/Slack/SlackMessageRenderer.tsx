import { Message } from "../../chat/Types";
import React, { Fragment } from "react";

type SlackMessageRendererProps = {
  message: Message;
};

export function SlackMessageRenderer(props: SlackMessageRendererProps) {
  return <Fragment>{props.message.text}</Fragment>;
}
