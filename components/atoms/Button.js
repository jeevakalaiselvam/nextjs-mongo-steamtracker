import React from "react";
import styled from "styled-components";
import { COLOR_BUTTON_PRIMARY } from "../../helper/colorHelper";

export default function Button({
  ignoreTitle,
  title,
  onClick,
  width,
  margin,
  fontSize,
  icon,
  height,
  active,
}) {
  return (
    <Container
      onClick={onClick}
      width={width}
      margin={margin}
      fontSize={fontSize}
      height={height}
      active={active}
    >
      <Icon>{icon}</Icon>
      {!ignoreTitle && <Title>{title}</Title>}
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
  opacity: 0.7;
  background-color: ${(props) =>
    props.active ? COLOR_BUTTON_PRIMARY : "#121315"};
  padding: 0.25rem 1rem;
  height: ${(props) => props.height ?? "auto"};
  width: ${(props) => props.width ?? "100%"};
  margin: ${(props) => props.margin ?? ""};
  font-size: ${(props) => props.fontSize ?? "1.1rem"};

  &:hover {
    background-color: ${(props) => COLOR_BUTTON_PRIMARY};
  }
`;
