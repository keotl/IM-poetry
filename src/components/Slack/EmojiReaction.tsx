import { EmojiReaction } from "../../chat/Types";
import styled from "styled-components";
import React, { useContext } from "react";
import { EmojiStoreContext } from "../EmojiStore";
import { Tooltip } from "./Util/Tooltip";
import { UserStore, UserStoreContext } from "../UserStore";

type EmojiReactionContainerProps = {
  reactions: EmojiReaction[];
};

export function EmojiReactionContainer(props: EmojiReactionContainerProps) {
  const emojiStore = useContext(EmojiStoreContext);
  const userStore = useContext(UserStoreContext);

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
          <Tooltip title={formatReactionHoverText(r, userStore)}>
            <ReactionComponent>
              <EmojiImg src={emoji.image_url} />

              <div> {r.users.length}</div>
            </ReactionComponent>
          </Tooltip>
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

function formatReactionHoverText(
  reaction: EmojiReaction,
  userStore: UserStore
): JSX.Element[] {
  let message = reaction.users.map(u => userStore.getUser(u).name).join(", ");
  if (reaction.users.length > 1) {
    message =
      message.slice(0, message.lastIndexOf(", ")) +
      " and " +
      message.slice(message.lastIndexOf(", ") + 2, message.length);
  }

  return [
    <TitleSpan> {message} </TitleSpan>,
    <SubTitleSpan> reacted with :{reaction.emojiId}:</SubTitleSpan>,
  ];
}

const TitleSpan = styled.span`
  font-size: 10pt;
  color: white;
  font-weight: bold;
`;

const SubTitleSpan = styled.span`
  font-size: 10pt;
  color: gray;
`;
