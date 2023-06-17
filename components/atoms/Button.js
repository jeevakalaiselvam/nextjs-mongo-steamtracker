import React from "react";
import styled from "styled-components";
import { COLOR_BUTTON_PRIMARY } from "../../helper/colorHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  width: ${(props) => props.width ?? "100%"};
  margin: ${(props) => props.margin ?? ""};

  &:hover {
    background-color: ${(props) => COLOR_BUTTON_PRIMARY};
  }
`;

export default function Button({ title, onClick, width, margin }) {
  return (
    <Container onClick={onClick} width={width} margin={margin}>
      {title}
    </Container>
  );
}
