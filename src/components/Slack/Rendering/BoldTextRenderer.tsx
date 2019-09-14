import React from "react";
import { EmojiStore } from "../../EmojiStore";
import { UserStore } from "../../UserStore";
import { AbstractRichTextRenderer } from "./RichTextRenderer";

export class BoldTextRenderer extends AbstractRichTextRenderer {
  constructor() {
    super(/\*(.+)\*/);
  }

  render(
    innerText: string,
    _userStore: UserStore,
    _emojiStore: EmojiStore
  ): JSX.Element {
    return <b>{innerText}</b>;
  }
}
