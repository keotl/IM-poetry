import React, { useContext } from "react";
import { Message } from "../../chat/Types";
import styled from "styled-components";
import { UserStoreContext } from "../UserStore";
import { SlackMessageRenderer } from "./SlackMessageRenderer";
import { EmojiReactionContainer } from "./EmojiReaction";

type MessageComponentProps = {
  message: Message;
};

export function MessageComponent(props: MessageComponentProps) {
  const userStore = useContext(UserStoreContext);
  const user = userStore.getUser(props.message.user);

  if (user === undefined) {
    // TODO create user placeholder
    return null;
  }

  return (
    <div>
      <Container key={props.message.id}>
        <Avatar src={user.avatar_url} />
        <TextContent>
          <UserName>{user.name}</UserName>
          <TextContent>
            <SlackMessageRenderer message={props.message} />
          </TextContent>
          <EmojiReactionContainer reactions={props.message.reactions} />
        </TextContent>
      </Container>
    </div>
  );
}

const Container = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: row;
  &:hover {
    background-color: aliceblue;
  }
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  margin-right: 8px;
`;

const TextContent = styled.div`
  flex: 1;
  display: inline;
`;

const UserName = styled.div`
  font-weight: bold;
`;
