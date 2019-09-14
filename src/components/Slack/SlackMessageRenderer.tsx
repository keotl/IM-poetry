import { useContext, Fragment } from "react";
import { Message } from "../../chat/Types";
import { EmojiStoreContext, EmojiStore } from "../EmojiStore";
import { UserStoreContext, UserStore } from "../UserStore";
import { RichTextRenderer } from "./Rendering/RichTextRenderer";
import React from "react";
import { EmojiTextRenderer } from "./Rendering/EmojiRenderer";
import { UserMentionRenderer } from "./Rendering/UserMentionRenderer";
import { BoldTextRenderer } from "./Rendering/BoldTextRenderer";
import { StrikeThroughTextRenderer } from "./Rendering/StrikeThroughTextRenderer";
import { ItalicTextRenderer } from "./Rendering/ItalicTextRenderer";
import { v4 as uuidv4 } from "uuid";
import {
  SingleBacktickInlineCodeRenderer,
  TripleBacktickInlineCodeRenderer,
} from "./Rendering/InlineCodeRenderer";

const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
type SlackMessageRendererProps = {
  message: Message;
};

export function SlackMessageRenderer(props: SlackMessageRendererProps) {
  const emojiStore = useContext(EmojiStoreContext);
  const userStore = useContext(UserStoreContext);
  return (
    <Fragment key={props.message.id}>
      {renderText(entities.decode(props.message.text), userStore, emojiStore)}
    </Fragment>
  );
}

const renderers: RichTextRenderer[] = [
  new UserMentionRenderer(),
  new EmojiTextRenderer(),
  new BoldTextRenderer(),
  new StrikeThroughTextRenderer(),
  new ItalicTextRenderer(),
  new TripleBacktickInlineCodeRenderer(),
  new SingleBacktickInlineCodeRenderer(),
];

function renderText(
  text: string,
  userStore: UserStore,
  emojiStore: EmojiStore
): JSX.Element[] {
  for (const renderer of renderers) {
    const match = renderer.getMatch(text);
    if (match) {
      return [
        ...renderText(text.slice(0, match.startIndex), userStore, emojiStore),
        renderer.render(match.innerText, userStore, emojiStore),
        ...renderText(
          text.slice(match.endIndex, text.length),
          userStore,
          emojiStore
        ),
      ];
    }
  }
  return [<span key={uuidv4()}>{text}</span>];
}
