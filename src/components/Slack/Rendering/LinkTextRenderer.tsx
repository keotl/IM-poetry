import { AbstractRichTextRenderer } from "./RichTextRenderer";
import { EmojiStore } from "../../EmojiStore";
import { UserStore } from "../../UserStore";
import React from "react";

export class LinkTextRenderer extends AbstractRichTextRenderer {
  constructor() {
    super(/<([a-zA-Z0-9:/_.?#%+=&]+)>/);
  }

  render(
    innerText: string,
    _userStore: UserStore,
    _emojiStore: EmojiStore
  ): JSX.Element {
    return <a href={innerText}> {innerText}</a>;
  }
}
