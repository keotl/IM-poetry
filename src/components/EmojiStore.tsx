import emojiData from "emoji-datasource/emoji.json";
import React, { createContext } from "react";
import { Emoji } from "../chat/Types";

export type EmojiStore = {
  getEmoji: (id: string) => Emoji | undefined;
};

export const EmojiStoreContext = createContext<EmojiStore>({
  getEmoji: () => {
    /* empty */
  },
} as any);
export function EmojiStoreContextContainer(props: {
  emojis: Emoji[];
  children: any;
}) {
  function getEmoji(id: string): Emoji | undefined {
    const customEmoji = props.emojis.find(e => e.id === id);
    if (customEmoji) {
      if (customEmoji.image_url.startsWith("alias:")) {
        return getEmoji(
          customEmoji.image_url.slice(
            "alias:".length,
            customEmoji.image_url.length
          )
        );
      }
      return customEmoji;
    }
    const standardEmoji = findStandardEmoji(id);
    if (standardEmoji) {
      return standardEmoji;
    }
  }

  return (
    <EmojiStoreContext.Provider
      value={{
        getEmoji,
      }}
    >
      {props.children}
    </EmojiStoreContext.Provider>
  );
}

function findStandardEmoji(shortName: string): Emoji | undefined {
  const emoji = emojiData.find(e => e.short_names.includes(shortName));
  if (emoji) {
    return {
      id: shortName,
      image_url: `/static/emojis/${emoji.image}`,
    };
  }
}
