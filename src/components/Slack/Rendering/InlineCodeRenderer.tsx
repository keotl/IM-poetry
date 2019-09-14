import { EmojiStore } from "../../EmojiStore";
import { UserStore } from "../../UserStore";
import { AbstractRichTextRenderer } from "./RichTextRenderer";
import React from "react";
import styled from "styled-components";

export class TripleBacktickInlineCodeRenderer extends AbstractRichTextRenderer {
  constructor() {
    super(/```([^`]*)```/);
  }

  render(
    innerText: string,
    _userStore: UserStore,
    _emojiStore: EmojiStore
  ): JSX.Element {
    return <MonospacedDiv>{innerText}</MonospacedDiv>;
  }
}

export class SingleBacktickInlineCodeRenderer extends AbstractRichTextRenderer {
  constructor() {
    super(/`([^`]*)`/);
  }

  render(
    innerText: string,
    _userStore: UserStore,
    _emojiStore: EmojiStore
  ): JSX.Element {
    return <MonospacedSpan>{innerText}</MonospacedSpan>;
  }
}

const MonospacedDiv = styled.div`
  font-family: monospace;
  background-color: aliceblue;
`;

const MonospacedSpan = styled.div`
  font-family: monospace;
  background-color: aliceblue;
`;
