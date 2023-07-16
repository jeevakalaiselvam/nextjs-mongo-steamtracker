import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../../helper/urlHelper";
import { calculateAllTrophyCountForGames } from "../../../helper/gameHelper";
import MobileGameDisplay from "../../../components/mobile/MobileGameDisplay";
import {
  ALL,
  BLIZZARD,
  EPIC,
  GOG,
  ORIGIN,
  PLAYSTATION,
  STEAM,
  UPLAY,
  XBOX,
  getLoader,
} from "../../../helper/constantHelper";
import TrophiesMobileGames from "../../../components/molecules/TrophiesMobileGames";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../../../components/molecules/Profile";
import Trophies from "../../../components/molecules/Trophies";
import GameMenu from "../../../components/atoms/GameMenu";
import Button from "../../../components/atoms/Button";
import {
  ICON_BLIZZARD,
  ICON_EPIC,
  ICON_GAMES,
  ICON_GOG,
  ICON_ORIGIN,
  ICON_PLAYSTATION,
  ICON_STEAM,
  ICON_UPLAY,
  ICON_XBOX,
  getIcon,
} from "../../../helper/iconHelper";
import { actionGamesFilter } from "../../../store/actions/steam.actions";
import GamesMenu from "../../../components/atoms/GamesMenu";
import MobileGameDisplayPSUI from "../../../components/mobile/MobileGameDisplayPSUI";
import PSUIHeader from "../../../components/atoms/PSUIHeader";

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
  backdrop-filter: blur(50px);
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
  backdrop-filter: blur(20px);
  transition: 0.5s all;
`;

const LeftSidebarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 8vh;
  transition: 0.5s all;
  left: ${(props) => (props.open ? "0" : "-60vw")};
  width: 60vw;
  z-index: 100;
  min-height: 92vh;
  max-height: 92vh;
  background: ${(props) => `url(${props.image})`};
  background-repeat: no-repeat;
  background-size: cover;
`;

const SidebarOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  flex-direction: column;
  width: 100%;
  transition: 0.5s all;
  width: 60vw;
  z-index: 100;
  min-height: 92vh;
  max-height: 92vh;
  padding: 0.5rem;
  backdrop-filter: blur(20px);
  background-color: rgba(0, 0, 0, 0.2);
`;

export default function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const { forceRefreshAchievement, themeId, gamesFilter, showHiddenGames } =
    settings;
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
              <PSUIHeader />
            </Header>
            <Content>
              <GamesOverview></GamesOverview>
              <GamesHeader>Games Played</GamesHeader>
              <GamesList>
                {games
                  .filter((game) => {
                    if (
                      (game?.platform == gamesFilter || gamesFilter == ALL) &&
                      (showHiddenGames ? true : !game.hidden)
                    ) {
                      return true;
                    }
                  })
                  .sort((game1, game2) => {
                    return (game2?.lastPlayed ?? 0) - (game1?.lastPlayed ?? 0);
                  })
                  .map((game) => {
                    return <MobileGameDisplayPSUI game={game} key={game._id} />;
                  })}
              </GamesList>
            </Content>
          </GamesContainer>
        )}
        <OptionContainer open={optionOpen}>OPTIONS</OptionContainer>
        <LeftSidebarContainer
          open={leftSidebarOpen}
          image={HEADER_IMAGE(themeId ?? "130130")}
        >
          <SidebarOverlay>
            <Profile games={games} />
            <Trophies games={games} title={"COLLECTION"} />
            <GamesMenu mobile={true} />
          </SidebarOverlay>
        </LeftSidebarContainer>
      </Overlay>
    </Container>
  );
}

const GamesOverview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GamesList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const GamesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
