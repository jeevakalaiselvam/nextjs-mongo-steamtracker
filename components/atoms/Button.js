import React from "react";
import styled from "styled-components";
import { COLOR_BUTTON_PRIMARY } from "../../helper/colorHelper";

export default function Button({
  title,
  onClick,
  width,
  margin,
  fontSize,
  icon,
}) {
  return (
    <Container
      onClick={onClick}
      width={width}
      margin={margin}
      fontSize={fontSize}
    >
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
    </Container>
  );
}

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.25rem 1rem;
  width: ${(props) => props.width ?? "100%"};
  margin: ${(props) => props.margin ?? ""};
  font-size: ${(props) => props.fontSize ?? "1.1rem"};

  &:hover {
    background-color: ${(props) => COLOR_BUTTON_PRIMARY};
  }
`;
