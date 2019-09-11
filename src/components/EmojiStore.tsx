import React from "react";
import { Emoji } from "../chat/Types";
import { createContext } from "react";

export type EmojiStore = {
  getEmoji: (id: string) => Emoji;
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
  return (
    <EmojiStoreContext.Provider
      value={{
        getEmoji: (id: string) => props.emojis.find(e => e.id === id)!,
      }}
    >
      {props.children}
    </EmojiStoreContext.Provider>
  );
}
