import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ICON_HIDDEN_VISIBLE,
  ICON_TROPHY,
  IMAGE_BRONZE,
  IMAGE_GOLD,
  IMAGE_PLATINUM,
  IMAGE_SILVER,
  getIcon,
  getImage,
} from "../../helper/iconHelper";
import {
  COLOR_COPPER,
  COLOR_GOLD,
  COLOR_GREY,
  COLOR_PLATINUM,
  COLOR_SILVER,
} from "../../helper/colorHelper";
import {
  calculateAllTrophyCountForGames,
  getTrophyCount,
} from "../../helper/gameHelper";
import { useDispatch, useSelector } from "react-redux";
import { actionAchievementFilter } from "../../store/actions/steam.actions";
import {
  ALL,
  COPPER,
  GOLD,
  PLATINUM,
  SILVER,
} from "../../helper/constantHelper";
import Loading from "../atoms/Loading";
import axios from "axios";

export default function Trophies({ title, game }) {
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);

  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const { forceRefreshProfile } = settings;

  const { platinum, gold, silver, copper } =
    games && !game
      ? calculateAllTrophyCountForGames(games)
      : getTrophyCount(game?.achievements);

  useEffect(() => {
    axios.get("/api/games").then((response) => {
      setGames(response.data.games);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/games").then((response) => {
      setGames(response.data.games);
    });
  }, [forceRefreshProfile]);

  return (
    <Container>
      <Name onClick={() => dispatch(actionAchievementFilter(ALL))}>
        {title}
      </Name>

      {copper == -1 ? (
        <TrophiesPlaceholderContainer>
          <TrophyPlaceholder>
            <Trophy color={COLOR_PLATINUM}>
              <Icon onClick={() => dispatch(actionAchievementFilter(PLATINUM))}>
                {getImage(IMAGE_PLATINUM, "40px")}
              </Icon>
            </Trophy>

            <Trophy color={COLOR_GOLD}>
              <Icon onClick={() => dispatch(actionAchievementFilter(GOLD))}>
                {getImage(IMAGE_GOLD, "40px")}
              </Icon>
            </Trophy>

            <Trophy color={COLOR_SILVER}>
              <Icon onClick={() => dispatch(actionAchievementFilter(SILVER))}>
                {getImage(IMAGE_SILVER, "40px")}
              </Icon>
            </Trophy>

            <Trophy color={COLOR_COPPER}>
              <Icon onClick={() => dispatch(actionAchievementFilter(COPPER))}>
                {getImage(IMAGE_BRONZE, "40px")}
              </Icon>
            </Trophy>
          </TrophyPlaceholder>
          <LoaderContainer>
            <Loading size={1} color={COLOR_SILVER} />
          </LoaderContainer>
        </TrophiesPlaceholderContainer>
      ) : (
        <TrophiesContainer>
          <Trophy color={COLOR_PLATINUM}>
            <Icon onClick={() => dispatch(actionAchievementFilter(PLATINUM))}>
              {getImage(IMAGE_PLATINUM, "40px")}
            </Icon>
            <Count>{platinum}</Count>
          </Trophy>

          <Trophy color={COLOR_GOLD}>
            <Icon onClick={() => dispatch(actionAchievementFilter(GOLD))}>
              {getImage(IMAGE_GOLD, "40px")}
            </Icon>
            <Count>{gold}</Count>
          </Trophy>

          <Trophy color={COLOR_SILVER}>
            <Icon onClick={() => dispatch(actionAchievementFilter(SILVER))}>
              {getImage(IMAGE_SILVER, "40px")}
            </Icon>
            <Count>{silver}</Count>
          </Trophy>

          <Trophy color={COLOR_COPPER}>
            <Icon onClick={() => dispatch(actionAchievementFilter(COPPER))}>
              {getImage(IMAGE_BRONZE, "40px")}
            </Icon>
            <Count>{copper}</Count>
          </Trophy>
        </TrophiesContainer>
      )}
    </Container>
  );
}

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  opacity: 0.5;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  background-color: #121315;
  margin-top: 0.25rem;
`;

const TrophyPlaceholder = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
`;

const TrophiesPlaceholderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  margin-right: 0rem;
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
  opacity: 0.5;
  align-items: center;
  justify-content: center;
`;
