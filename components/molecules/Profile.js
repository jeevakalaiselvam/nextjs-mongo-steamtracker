import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR_GOLD, COLOR_GREY, COLOR_SILVER } from "../../helper/colorHelper";
import { calculateLevel } from "../../helper/gameHelper";
import { MoonLoader } from "react-spinners";
import Loading from "../atoms/Loading";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Profile() {
  const [games, setGames] = useState([]);
  const { currentLevel, totalPoints, toNext } = calculateLevel(games);

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

  return (
    <Container>
      <Icon url="https://avatars.cloudflare.steamstatic.com/3984d41a867b9b4eca056cdfcd1134bd591d9100_full.jpg"></Icon>
      <Info>
        <Title>NotRealLogan</Title>
        <Level>
          {currentLevel == -1 && <Loading size={2} color={COLOR_GREY} />}
          {currentLevel != -1 && (
            <Data color={COLOR_GOLD}>Level {currentLevel}</Data>
          )}
          {currentLevel != -1 && <ToNext>{toNext} more..</ToNext>}
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
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem;
  height: 80px;
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
  justify-content: flex-start;
  margin-left: 1rem;
  flex: 1;
`;

const Data = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.color};
  justify-content: flex-start;
`;

const ToNext = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.color};
  justify-content: flex-start;
  opacity: 0.4;
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
  flex: 2;
  font-size: 1.5rem;
`;
