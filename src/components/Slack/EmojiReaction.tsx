import { EmojiReaction } from "../../chat/Types";
import styled from "styled-components";
import React, { useContext } from "react";
import { EmojiStoreContext } from "../EmojiStore";

type EmojiReactionContainerProps = {
  reactions: EmojiReaction[];
};

export function EmojiReactionContainer(props: EmojiReactionContainerProps) {
  const emojiStore = useContext(EmojiStoreContext);

  if (props.reactions.length === 0) {
    return null;
  }

  return (
    <Container>
      {props.reactions.map(r => {
        const emoji = emojiStore.getEmoji(r.emojiId);
        if (!emoji) {
          return <span> {r.emojiId} </span>;
        }

        return (
          <ReactionComponent>
            <EmojiImg src={emoji.image_url} />
            <div> {r.users.length}</div>
          </ReactionComponent>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

const ReactionComponent = styled.div`
  border: 1px solid #768ee8;
  background-color: #f4f7ff;
  border-radius: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 6px;
  padding-left: 8px;
  padding-top: 2px;
  padding-bottom: 2px;
  margin-right: 2px;
  margin-left: 2px;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
  transition-property: background-color;
  transition-duration: 0.2s;
`;
const EmojiImg = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 4px;
`;
