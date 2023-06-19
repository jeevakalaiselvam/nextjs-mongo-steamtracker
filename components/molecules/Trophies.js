import React from "react";
import styled from "styled-components";
import {
  ICON_HIDDEN_VISIBLE,
  ICON_TROPHY,
  getIcon,
} from "../../helper/iconHelper";
import {
  COLOR_COPPER,
  COLOR_GOLD,
  COLOR_PLATINUM,
  COLOR_SILVER,
} from "../../helper/colorHelper";
import {
  calculateAllTrophyCountForGames,
  getTrophyCount,
} from "../../helper/gameHelper";
import { useDispatch } from "react-redux";
import { actionAchievementFilter } from "../../store/actions/steam.actions";
import {
  ALL,
  COPPER,
  GOLD,
  PLATINUM,
  SILVER,
} from "../../helper/constantHelper";

export default function Trophies({ games, title, game }) {
  const dispatch = useDispatch();
  const { platinum, gold, silver, copper } = games
    ? calculateAllTrophyCountForGames(games)
    : getTrophyCount(game?.achievements);

  return (
    <Container>
      <Name onClick={() => dispatch(actionAchievementFilter(ALL))}>
        {title}
      </Name>
      <TrophiesContainer>
        <Trophy color={COLOR_PLATINUM}>
          <Icon onClick={() => dispatch(actionAchievementFilter(PLATINUM))}>
            {getIcon(ICON_TROPHY)}
          </Icon>
          <Count>{platinum ?? 0}</Count>
        </Trophy>

        <Trophy color={COLOR_GOLD}>
          <Icon onClick={() => dispatch(actionAchievementFilter(GOLD))}>
            {getIcon(ICON_TROPHY)}
          </Icon>
          <Count>{gold ?? 0}</Count>
        </Trophy>

        <Trophy color={COLOR_SILVER}>
          <Icon onClick={() => dispatch(actionAchievementFilter(SILVER))}>
            {getIcon(ICON_TROPHY)}
          </Icon>
          <Count>{silver ?? 0}</Count>
        </Trophy>

        <Trophy color={COLOR_COPPER}>
          <Icon onClick={() => dispatch(actionAchievementFilter(COPPER))}>
            {getIcon(ICON_TROPHY)}
          </Icon>
          <Count>{copper ?? 0}</Count>
        </Trophy>
      </TrophiesContainer>
    </Container>
  );
}

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  margin-top: 0.25rem;
`;

const TrophiesContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Trophy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  margin-right: 0.5rem;
  color: ${(props) => props.color};
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  justify-content: center;
  font-size: 2rem;
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
