import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  COLOR_BUTTON_PRIMARY,
  COLOR_GOLD,
  COLOR_GREY,
  COLOR_SILVER,
  COLOR_SUCCESS,
} from "../../helper/colorHelper";
import {
  calculateLevel,
  calculateLevelForGame,
  calculateLevelFromXP,
} from "../../helper/gameHelper";
import { MoonLoader } from "react-spinners";
import Loading from "../atoms/Loading";
import { useSelector } from "react-redux";
import axios from "axios";
import CirclePercentage from "../atoms/CirclePercentage";

export default function Profile() {
  const [games, setGames] = useState([]);

  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const { forceRefreshProfile } = settings;

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

  const {
    totalXP,
    totalTrophies,
    totalPlatinum,
    totalBronze,
    totalSilver,
    totalGold,
  } = calculateLevelForGame(games);

  const { currentLevel, toNext, xpForNext } = calculateLevelFromXP(totalXP);

  return (
    <Container>
      {currentLevel != -1 && (
        <ToNext>
          <CirclePercentage
            percentage={toNext}
            size={50}
            textSize={"25px"}
            pathColor={COLOR_BUTTON_PRIMARY}
            trailColor={COLOR_GREY}
          />
        </ToNext>
      )}
      <Icon url="https://i.pinimg.com/736x/1b/4f/be/1b4fbe252793720e0c88cc2b65bcb8c1.jpg"></Icon>
      <Info>
        <Title>NotRealLogan</Title>
        <Level>
          {currentLevel == -1 && <Loading size={2} color={COLOR_GREY} />}
          {currentLevel != -1 && (
            <Data color={COLOR_GOLD}>Level {currentLevel}</Data>
          )}
        </Level>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  background-color: #121315;
  padding: 0.5rem;
  height: 80px;
  position: relative;
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
  height: 80px;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: 0.5rem;
  justify-content: flex-start;
  margin-left: 1rem;
`;

const Data = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  opacity: 0.5;
  font-size: 1.3rem;
  justify-content: flex-start;
`;

const ToNext = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 1rem;
  right: 1rem;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
  font-size: 1.2rem;
`;

const Level = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 1rem;
  font-size: 1.5rem;
`;
