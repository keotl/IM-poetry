import React, { useContext } from "react";
import { Message } from "../../chat/Types";
import styled from "styled-components";
import { UserStoreContext } from "../UserStore";

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
    <Container>
      <Avatar src={user.avatar_url} />
      <TextContent>
        <UserName>{user.name}</UserName>
        <TextContent>{props.message.text}</TextContent>
      </TextContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Avatar = styled.img`
  width: 28px;
  height: 28px;
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: bold;
`;

const Content = styled.div`
  flex: 1;
`;
