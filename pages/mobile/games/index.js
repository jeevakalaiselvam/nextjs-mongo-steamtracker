import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../../helper/urlHelper";
import {
  calculateAllTrophyCountForGames,
  calculateLevelForGame,
  calculateLevelFromXP,
  getUnCompletedGames,
} from "../../../helper/gameHelper";
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
  getLevelImage,
} from "../../../helper/iconHelper";
import { actionGamesFilter } from "../../../store/actions/steam.actions";
import GamesMenu from "../../../components/atoms/GamesMenu";
import MobileGameDisplayPSUI from "../../../components/mobile/MobileGameDisplayPSUI";
import PSUIHeader from "../../../components/atoms/PSUIHeader";
import ProfileCompletionOverview from "../../../components/atoms/ProfileCompletionOverview";
import CirclePercentage from "../../../components/atoms/CirclePercentage";

export default function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const {
    forceRefreshAchievement,
    themeId,
    gamesFilter,
    showHiddenGames,
    forceRefreshProfile,
  } = settings;
  const { toggle } = steam;

  useEffect(() => {
    setLoading(true);
    axios.get("/api/games").then((response) => {
      setGames(response.data.games);
      setLoading(false);
    });
  }, [forceRefreshProfile]);

  const optionToggle = (toggle) => {
    setOptionOpen(toggle);
  };

  const leftSidebarToggle = (toggle) => {
    setLeftSidebarOpen(toggle);
  };

  const trophies = calculateAllTrophyCountForGames(games);

  const {
    totalXP,
    totalTrophies,
    totalPlatinum,
    totalBronze,
    totalSilver,
    totalGold,
  } = calculateLevelForGame(games);

  const { currentLevel, toNext } = calculateLevelFromXP(totalXP);

  let latestPlayedGame = games?.sort((game1, game2) => {
    return (game2?.lastPlayed ?? 0) - (game1?.lastPlayed ?? 0);
  })[0];

  let notCompleted = getUnCompletedGames(
    games?.filter((game) => game.name !== latestPlayedGame.name)
  );

  let unCompletedNames = notCompleted?.map((unCompleted) => unCompleted?.name);

  let gamesSortedByName = games
    ?.sort((game1, game2) => {
      if (game1.name < game2.name) {
        return -1;
      }
      if (game1.name > game2.name) {
        return 1;
      }
      return 0;
    })
    .filter(
      (game) =>
        game.name !== latestPlayedGame?.name &&
        !unCompletedNames?.includes(game?.name)
    );

  let gamesListToShow = [];
  if (latestPlayedGame) {
    gamesListToShow = [latestPlayedGame, ...notCompleted, ...gamesSortedByName];
  }

  return (
    <Container image={HEADER_IMAGE(themeId ?? "130130")}>
      <Overlay>
        {loading && <LoadingContainer>{getLoader()}</LoadingContainer>}
        {!loading && (
          <GamesContainer>
            <Header>
              <PSUIHeader games={games} />
            </Header>
            <Content>
              <GamesHeader>Profile Overview</GamesHeader>
              <GamesOverview>
                <Top>
                  <Level>
                    <LevelIcon image={getLevelImage(currentLevel)} />
                    <LevelData>Level {currentLevel}</LevelData>
                  </Level>
                  <ToNext>
                    <CirclePercentage percentage={toNext} />
                  </ToNext>
                  <Total>
                    <TotalNumber>{totalTrophies}</TotalNumber>
                    <TotalText>Total Trophies</TotalText>
                  </Total>
                </Top>
                <Bottom>
                  <ProfileCompletionOverview
                    platinum={totalPlatinum}
                    gold={totalGold}
                    silver={totalSilver}
                    bronze={totalBronze}
                  />
                </Bottom>
              </GamesOverview>
              <GamesHeader>Games Played</GamesHeader>
              <GamesList>
                {gamesListToShow?.length &&
                  gamesListToShow.map((game) => {
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  color: #fefefe;
  min-height: 100vh;
  background-color: #121315;
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  backdrop-filter: blur(50px);
  overflow: hidden;
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
  max-width: 100vw;
  max-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 9vh;
  background-color: #1e1e1f;
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
  overflow-y: scroll;
  overflow-x: hidden;
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

const LevelIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => `url(${props.image})`};
  width: 50px;
  height: 50px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const LevelData = styled.div`
  display: flex;
  align-items: center;
  font-weight: 100;
  margin-top: 1rem;
  opacity: 0.5;
  justify-content: center;
`;

const TotalNumber = styled.div`
  display: flex;
  align-items: center;
  font-weight: 100;
  transform: translateY(-5px);
  font-size: 2rem;
  margin-top: 1rem;
  justify-content: center;
`;

const TotalText = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  font-weight: 100;
  opacity: 0.5;
  justify-content: center;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  transform: translateX(-6px);
  justify-content: center;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Level = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate(10px, 10px);
`;

const ToNext = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  opacity: 0.75;
  transform: translate(5px, 10px);
`;

const Total = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: translate(-3px, 15px);
`;

const GamesOverview = styled.div`
  display: flex;
  width: 92%;
  border-radius: 4px;
  padding: 0.5rem;
  background-color: #1d1d1f;
  align-items: center;
  flex-direction: column;
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
  padding: 1rem;
  width: 100%;
  transform: translateX(-7px);
  margin-left: 2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  justify-content: flex-start;
`;
