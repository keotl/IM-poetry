import { Message } from "../../chat/Types";
import React, { Fragment, useContext } from "react";
import { EmojiStoreContext } from "../EmojiStore";

type SlackMessageRendererProps = {
  message: Message;
};
const emojiRe = /:(\S+):/;

export function SlackMessageRenderer(props: SlackMessageRendererProps) {
  const emojiStore = useContext(EmojiStoreContext);

  const rendered = [];
  let matches = emojiRe.exec(props.message.text);
  let message = props.message.text;
  while (matches) {
    const [outerText, innerText] = matches;
    rendered.push(<span>{message.slice(0, matches.index)}</span>);
    const emoji = emojiStore.getEmoji(innerText);
    if (emoji) {
      rendered.push(<img src={emojiStore.getEmoji(innerText).image_url} />);
    } else {
      rendered.push(<div> EMOJI {innerText} </div>);
    }

    message = message.slice(matches.index + outerText.length, message.length);
    matches = emojiRe.exec(message);
  }
  rendered.push(<span>{message} </span>);

  return <Fragment>{rendered}</Fragment>;
}
