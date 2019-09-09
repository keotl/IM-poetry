import React from "react";
import { Message } from "../../chat/Types";
import styled from "styled-components";

type MessageComponentProps = {
  message: Message;
};

export function MessageComponent(props: MessageComponentProps) {
  return (
    <Container>
      <Avatar src="https://ca.slack-edge.com/TCPTHK869-USLACKBOT-sv41d8cd98f0-48" />
      <TextContent>
        <UserName>{props.message.user}</UserName>
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
