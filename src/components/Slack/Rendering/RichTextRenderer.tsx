import { EmojiStore } from "../../EmojiStore";
import { UserStore } from "../../UserStore";

export interface RichTextRenderer {
  getMatch(text: string): Match | undefined;
  render(
    innerText: string,
    userStore: UserStore,
    emojiStore: EmojiStore
  ): JSX.Element;
}

export abstract class AbstractRichTextRenderer implements RichTextRenderer {
  private re: RegExp;

    constructor(re: RegExp) {
    this.re = re;
  }

  getMatch(text: string): Match | undefined {
    const match = this.re.exec(text);
    if (match) {
      const [outerText, innerText] = match;
      return {
        startIndex: match.index,
        endIndex: match.index + outerText.length,
        innerText,
      };
    }
  }

  abstract render(
    innerText: string,
    userStore: UserStore,
    emojiStore: EmojiStore
  ): JSX.Element;
}

type Match = {
  startIndex: number;
  endIndex: number;
  innerText: string;
};

