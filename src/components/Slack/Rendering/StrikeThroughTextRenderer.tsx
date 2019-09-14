import { EmojiStore } from "../../EmojiStore";
import { UserStore } from "../../UserStore";
import { AbstractRichTextRenderer } from "./RichTextRenderer";
import styled from "styled-components";
import React from "react";

export class StrikeThroughTextRenderer extends AbstractRichTextRenderer {
  constructor() {
    super(/\~(.+)\~/);
  }

  render(
    innerText: string,
    _userStore: UserStore,
    _emojiStore: EmojiStore
  ): JSX.Element {
    return <StrikeThrough>{innerText}</StrikeThrough>;
  }
}

const StrikeThrough = styled.span`
  text-decoration: line-through;
`;
