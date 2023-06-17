import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to right,
    #ff00cc 0%,
    #333399 51%,
    #ff00cc 100%
  );
  transition: 0.5s;
  padding: 0.5rem 1rem;
  text-align: center;
  text-transform: uppercase;
  background-size: 200% auto;
  color: white;
  display: block;
  font-size: 2rem;

  &:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;

export default function ButtonIcon({ icon, onClick }) {
  return <Container onClick={onClick}>{icon}</Container>;
}
