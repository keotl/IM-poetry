import { AbstractRichTextRenderer } from "./RichTextRenderer";
import { UserStore } from "../../UserStore";
import { EmojiStore } from "../../EmojiStore";
import styled from "styled-components";
import React from "react";

export class EmojiTextRenderer extends AbstractRichTextRenderer {
  constructor() {
    super(/:(\S+):/);
  }

  render(
    innerText: string,
    _userStore: UserStore,
    emojiStore: EmojiStore
  ): JSX.Element {
    let emoji = emojiStore.getEmoji(innerText);

    if (!emoji) {
      return <div> UNKNOWN_EMOJI :{innerText}: </div>;
    }

    return <RenderedEmoji src={emoji.image_url} />;
  }
}

const RenderedEmoji = styled.img`
  object-fit: cover;
  width: 22px;
  height: 22px;
  margin-top: -11px;
  position: relative;
  top: 5px;
`;
