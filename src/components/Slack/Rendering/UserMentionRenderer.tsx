import styled from "styled-components";
import { EmojiStore } from "../../EmojiStore";
import { UserStore } from "../../UserStore";
import { AbstractRichTextRenderer } from "./RichTextRenderer";
import React from "react";

export class UserMentionRenderer extends AbstractRichTextRenderer {
  constructor() {
    super(/<@(\S+)>/);
  }

  render(
    innerText: string,
    userStore: UserStore,
    _emojiStore: EmojiStore
  ): JSX.Element {
    const user = userStore.getUser(innerText);
    if (user) {
      return <UserMention>@{user.name} </UserMention>;
    }
    return <span>{innerText}</span>;
  }
}

const UserMention = styled.a`
  cursor: pointer;
  color: blue;
`;
