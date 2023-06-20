import React from "react";
import { MoonLoader, PulseLoader } from "react-spinners";
import styled from "styled-components";

export default function Loading({ size, color }) {
  return (
    <Container>
      <PulseLoader size={size} color={color} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: center;
`;
