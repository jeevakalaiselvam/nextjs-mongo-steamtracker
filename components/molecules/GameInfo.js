import React from "react";
import styled from "styled-components";
import { COLOR_GOLD } from "../../helper/colorHelper";
import Trophies from "./Trophies";
import { getTrophyCount } from "../../helper/gameHelper";

export default function GameInfo({ game }) {
  const { platinum, silver, gold, copper } = getTrophyCount(
    game?.achievements ?? []
  );

  return (
    <Container>
      <Trophies
        title={game?.name}
        platinum={platinum}
        gold={gold}
        silver={silver}
        copper={copper}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  backdrop-filter: blur(10px);
  margin-top: 0.5rem;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
