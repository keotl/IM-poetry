import React from "react";
import { MessageComponent } from "./Message";
import { Message } from '../../chat/Types';
import styled from 'styled-components';

type SlackMessageContainerProps = {
  messages: Message[];
};

export function SlackMessageContainer(props: SlackMessageContainerProps) {
  return (
    <Container>
      {props.messages.map(m => (
        <MessageComponent message={m} key={m.id} />
      ))}
    </Container>
  );
}

const Container = styled.div`
display: flex;
flex-direction: column;
`
