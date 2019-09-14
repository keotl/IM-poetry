import { EmojiStore } from "../../EmojiStore";
import { UserStore } from "../../UserStore";
import { AbstractRichTextRenderer } from "./RichTextRenderer";
import React from "react";

export class ItalicTextRenderer extends AbstractRichTextRenderer {
  constructor() {
    super(/\_(.+)\_/);
  }

  render(
    innerText: string,
    _userStore: UserStore,
    _emojiStore: EmojiStore
  ): JSX.Element {
    return <i>{innerText}</i>;
  }
}
