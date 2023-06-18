import React from "react";
import styled from "styled-components";
import { COLOR_GOLD } from "../../helper/colorHelper";
import { calculateLevel } from "../../helper/gameHelper";

export default function Profile({ games }) {
  return (
    <Container>
      <Icon url="https://avatars.cloudflare.steamstatic.com/3984d41a867b9b4eca056cdfcd1134bd591d9100_full.jpg"></Icon>
      <Info>
        <Title>NotRealLogan</Title>
        <Level color={COLOR_GOLD}>Level {calculateLevel(games)}</Level>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem;
  height: 70px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 60px;
  height: 60px;
  padding: 1rem;
  background: ${(props) => `url(${props.url})`};
  background-repeat: no-repeat;
  background-size: contain;
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  margin-left: 1rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 70px;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-left: 1rem;
  flex: 1;
`;

const Level = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 1rem;
  flex: 1;
  color: ${(props) => props.color};
  font-size: 1.5rem;
`;
