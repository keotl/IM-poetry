import { Message } from "../../chat/Types";
import React, { Fragment, useContext } from "react";
import { EmojiStoreContext, EmojiStore } from "../EmojiStore";
import styled from "styled-components";
import { UserStore, UserStoreContext } from "../UserStore";
const Entities = require("html-entities").XmlEntities;

type SlackMessageRendererProps = {
  message: Message;
};
const emojiRe = /:(\S+):/;

const entities = new Entities();

export function SlackMessageRenderer(props: SlackMessageRendererProps) {
    const emojiStore = useContext(EmojiStoreContext);
    const userStore = useContext(UserStoreContext);

  const rendered = [];
  let matches = emojiRe.exec(props.message.text);
  let message = props.message.text;
  while (matches) {
    const [outerText, innerText] = matches;
      rendered.push(renderText(message.slice(0, matches.index), userStore));
    const emoji = emojiStore.getEmoji(innerText);
    if (emoji) {
      rendered.push(
        <RenderedEmoji src={emojiStore.getEmoji(innerText).image_url} />
      );
    } else {
      rendered.push(<div> EMOJI {innerText} </div>);
    }

    message = message.slice(matches.index + outerText.length, message.length);
    matches = emojiRe.exec(message);
  }
    rendered.push(<span>{renderText(message, userStore)} </span>);

  return <Fragment>{rendered}</Fragment>;
}

function renderText(text: string, userStore: UserStore) {
    return <span>{renderUserName(entities.decode(text), userStore)}</span>;
}

const userMentionRe = /<@(\S+)>/;

function renderUserName(text: string, userStore: UserStore): JSX.Element[] {
  const rendered = [];
  let matches = userMentionRe.exec(text);
  let message = text;
  while (matches) {
    const [outerText, innerText] = matches;
      rendered.push(<span>{message.slice(0, matches.index)}</span>);
    const user = userStore.getUser(innerText);
    if (user) {
      rendered.push(<UserMention>@{user.name} </UserMention>);
    } else {
      rendered.push(<span>{innerText}</span>);
    }

    message = message.slice(matches.index + outerText.length, message.length);
    matches = userMentionRe.exec(message);
  }
  rendered.push(<span>{message} </span>);
  return rendered;
}

// function renderRichText(text: string, userStore: UserStore, emojiStore: EmojiStore) : JSX.Element[] {
//     if (userMentionRe.test())
// }

const RenderedEmoji = styled.img`
  width: 22px;
  height: 22px;
  margin-top: -11px;
  position: relative;
  top: 5px;
`;

const UserMention = styled.a`
cursor: pointer;
color: blue;

`;
