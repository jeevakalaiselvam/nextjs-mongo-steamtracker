import React from "react";
import styled from "styled-components";
import { COLOR_GOLD } from "../../helper/colorHelper";
import Trophies from "./Trophies";
import { getTrophyCount } from "../../helper/gameHelper";

export default function GameInfo({ game }) {
  return (
    <Container>
      <Trophies title={game?.name} game={game} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #121315;
  margin-top: 0.5rem;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
