import { Message } from "../../chat/Types";
import React, { Fragment, useContext } from "react";
import { EmojiStoreContext, EmojiStore } from "../EmojiStore";
import styled from "styled-components";
import { UserStore, UserStoreContext } from "../UserStore";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
type SlackMessageRendererProps = {
  message: Message;
};

export function SlackMessageRenderer(props: SlackMessageRendererProps) {
  const emojiStore = useContext(EmojiStoreContext);
  const userStore = useContext(UserStoreContext);
  return renderRichText(props.message.text, userStore, emojiStore);
}

const emojiRe = /:(\S+):/;
const userMentionRe = /<@(\S+)>/;
const boldTextRe = /\*(.+)\*/;
const strikethroughTextRe = /\~.+\~/;

function renderRichText(
  text: string,
  userStore: UserStore,
  emojiStore: EmojiStore
): JSX.Element[] {
  const userMentionMatches = userMentionRe.exec(text);
  if (userMentionMatches) {
    const [outerText, innerText] = userMentionMatches;
    const user = userStore.getUser(innerText);
    if (user) {
      return [
        ...renderRichText(
          text.slice(0, userMentionMatches.index),
          userStore,
          emojiStore
        ),
        <UserMention>@{user.name} </UserMention>,
        ...renderRichText(
          text.slice(userMentionMatches.index + outerText.length, text.length),
          userStore,
          emojiStore
        ),
      ];
    }
  }

  const emojiMatches = emojiRe.exec(text);
  if (emojiMatches) {
    const [outerText, innerText] = emojiMatches;
    const emoji = emojiStore.getEmoji(innerText);
    if (emoji) {
      return [
        ...renderRichText(
          text.slice(0, emojiMatches.index),
          userStore,
          emojiStore
        ),
        <RenderedEmoji src={emojiStore.getEmoji(innerText).image_url} />,
        ...renderRichText(
          text.slice(emojiMatches.index + outerText.length, text.length),
          userStore,
          emojiStore
        ),
      ];
    } else {
      [
        ...renderRichText(
          text.slice(0, emojiMatches.index),
          userStore,
          emojiStore
        ),
        <div> EMOJI {innerText}</div>,
        ...renderRichText(
          text.slice(emojiMatches.index + outerText.length, text.length),
          userStore,
          emojiStore
        ),
      ];
    }
  }

  const boldMatches = boldTextRe.exec(text);
  if (boldMatches) {
    const [outerText, innerText] = boldMatches;
    return [
      ...renderRichText(
        text.slice(0, boldMatches.index),
        userStore,
        emojiStore
      ),
      <b>{innerText}</b>,
      ...renderRichText(
        text.slice(boldMatches.index + outerText.length, text.length),
        userStore,
        emojiStore
      ),
    ];
  }

  return [<span>{text}</span>];
}

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
