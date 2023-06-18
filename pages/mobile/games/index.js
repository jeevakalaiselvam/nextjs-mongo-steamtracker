import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../../helper/urlHelper";
import { calculateAllTrophyCountForGames } from "../../../helper/gameHelper";
import MobileGameDisplay from "../../../components/mobile/MobileGameDisplay";
import { getLoader } from "../../../helper/constantHelper";
import TrophiesMobileGames from "../../../components/molecules/TrophiesMobileGames";
import { useSelector } from "react-redux";
import Profile from "../../../components/molecules/Profile";
import Trophies from "../../../components/molecules/Trophies";
import GameMenu from "../../../components/atoms/GameMenu";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  color: #fefefe;
  min-height: 100vh;
  background: ${(props) => `url(${props.image})`};
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  backdrop-filter: blur(20px);
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
`;

const GamesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 100vw;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 9vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 91vh;
  max-height: 91vh;
  padding: 0.5rem;
  justify-content: flex-start;
  overflow: scroll;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 8vh;
  right: 0;
  width: 30vw;
  right: ${(props) => (!props.open ? "-30vw" : "0vw")};
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  transition: 0.5s all;
`;

const LeftSidebarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  flex-direction: column;
  position: absolute;
  top: 8vh;
  transition: 0.5s all;
  left: ${(props) => (props.open ? "0" : "-60vw")};
  width: 60vw;
  z-index: 100;
  height: 100%;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
`;

export default function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const { forceRefreshAchievement, themeId } = settings;
  const { toggle } = steam;

  useEffect(() => {
    setLoading(true);
    axios.get("/api/games").then((response) => {
      setGames(response.data.games);
      setLoading(false);
    });
  }, []);

  const optionToggle = (toggle) => {
    setOptionOpen(toggle);
  };

  const leftSidebarToggle = (toggle) => {
    setLeftSidebarOpen(toggle);
  };

  const trophies = calculateAllTrophyCountForGames(games);

  return (
    <Container image={HEADER_IMAGE(themeId ?? "130130")}>
      <Overlay>
        {loading && <LoadingContainer>{getLoader()}</LoadingContainer>}
        {!loading && (
          <GamesContainer>
            <Header>
              <TrophiesMobileGames
                trophies={trophies}
                optionToggle={optionToggle}
                optionOpen={optionOpen}
                leftSidebarToggle={leftSidebarToggle}
                leftSidebarOpen={leftSidebarOpen}
              />
            </Header>
            <Content>
              {games.map((game) => {
                return <MobileGameDisplay game={game} key={game._id} />;
              })}
            </Content>
          </GamesContainer>
        )}
        <OptionContainer open={optionOpen}>OPTIONS</OptionContainer>
        <LeftSidebarContainer open={leftSidebarOpen}>
          <Profile games={games} />
          <Trophies games={games} title={"COLLECTION"} />
          <GameMenu mobile={true} />
        </LeftSidebarContainer>
      </Overlay>
    </Container>
  );
}
