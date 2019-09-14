import React from "react";
import styled from "styled-components";

type TooltipProps = {
  title: JSX.Element[];
  subTitle?: string;
  children: JSX.Element;
};

export function Tooltip(props: TooltipProps) {
  return (
    <div>
      <TooltipTrigger>{props.children}</TooltipTrigger>
      <TooltipContentContainer>
        <TooltipContent>{props.title}</TooltipContent>
      </TooltipContentContainer>
    </div>
  );
}

const TooltipContentContainer = styled.div`
  position: absolute;
  visibility: hidden;
  transition-property: opacity;
  transition-duration: 0.5s;
  opacity: 0;
  z-index: 1000;
`;

const TooltipContent = styled.div`
  background-color: black;
  color: white;

  width: 120px;
  bottom: 100%;
  left: 50%;
  // margin-left: -60px;
  border-radius: 10px;
  padding: 10px;
  opacity: 0.9;
`;

const TooltipTrigger = styled.div`
  display: inline-block;
  &:hover + ${TooltipContentContainer} {
    visibility: visible;
    opacity: 1;
  }
`;
