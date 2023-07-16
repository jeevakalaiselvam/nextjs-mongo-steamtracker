import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size ?? "50px"};
  height: ${(props) => props.size ?? "50px"};
  background: ${(props) => `url(/images/${props.src})`};
  background-size: contain;
  background-repeat: no-repeat;
`;

export default function ImageIcon({ src, size }) {
  return <Container src={src} size={size}></Container>;
}
