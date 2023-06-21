import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { BACKGROUND_IMAGE, HEADER_IMAGE } from "../../../../helper/urlHelper";
import { getTrophyCount } from "../../../../helper/gameHelper";
import { useRouter } from "next/router";
import MobileAchievementDisplay from "../../../../components/mobile/MobileAchievementDisplay";
import { ALL, getLoader } from "../../../../helper/constantHelper";
import TrophiesMobileGame from "../../../../components/molecules/TrophiesMobileGame";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAchievementSearch,
  actionForceRefreshAchievement,
} from "../../../../store/actions/steam.actions";
import SearchInput from "../../../../components/atoms/SearchInput";
import Button from "../../../../components/atoms/Button";
import GameMenu from "../../../../components/atoms/GamesMenu";
import Trophies from "../../../../components/molecules/Trophies";
import Profile from "../../../../components/molecules/Profile";
import GameInfo from "../../../../components/molecules/GameInfo";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  color: #fefefe;
  min-height: 100vh;
  backdrop-filter: blur(20px);
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
  top: ${(props) => (props.open ? "8vh" : "-8vh")};
  right: 0;
  width: 80%;
  padding: 0.5rem;
  backdrop-filter: blur(20px);
`;

const NoAchievements = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  min-height: 92vh;
  max-height: 92vh;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
`;

export default function Game() {
  const router = useRouter();
  const [optionOpen, setOptionOpen] = useState(false);
  const [game, setGame] = useState([]);
  const [loading, setLoading] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [games, setGames] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/games").then((response) => {
      setGames(response.data.games);
      setLoading(false);
    });
  }, []);

  const dispatch = useDispatch();

  const trophies = getTrophyCount(game?.achievements ?? []);

  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const {
    forceRefreshAchievement,
    themeId,
    achievementSearch,
    achievementFilter,
  } = settings;
  const { toggle } = steam;

  useEffect(() => {
    if (router.query.gameId) {
      axios
        .get(`/api/${router.query.gameId}/achievements`)
        .then((response) => {
          setGame(response.data.game ?? {});
          dispatch(actionForceRefreshAchievement(false));
        })
        .catch((error) => {
          setGame([]);
          dispatch(actionForceRefreshAchievement(false));
        });
    }
  }, [router.query.gameId, forceRefreshAchievement, dispatch]);

  const optionToggle = (toggle) => {
    setOptionOpen(toggle);
  };

  const leftSidebarToggle = (toggle) => {
    setLeftSidebarOpen(toggle);
  };

  return (
    <Container image={HEADER_IMAGE(themeId ?? "130130")}>
      <Overlay>
        {loading && <LoadingContainer>{getLoader()}</LoadingContainer>}
        {!loading && (
          <GamesContainer>
            <Header>
              <TrophiesMobileGame
                trophies={trophies}
                optionToggle={optionToggle}
                optionOpen={optionOpen}
                leftSidebarToggle={leftSidebarToggle}
                leftSidebarOpen={leftSidebarOpen}
              />
            </Header>
            <Content>
              {game?.achievements?.length == 0 && (
                <NoAchievements>No Achievements</NoAchievements>
              )}
              {game?.achievements?.length != 0 &&
                game?.achievements
                  ?.filter((achievement) => {
                    if (
                      (achievement?.name
                        ?.toLowerCase()
                        .trim()
                        ?.includes(achievementSearch ?? "") ||
                        achievement?.description
                          ?.toLowerCase()
                          .trim()
                          ?.includes(achievementSearch ?? "")) &&
                      (achievement.type == achievementFilter ||
                        achievementFilter == ALL)
                    ) {
                      return true;
                    }
                  })
                  .sort((ach1, ach2) => ach2.percentage - ach1.percentage)
                  .map((achievement) => {
                    return (
                      <MobileAchievementDisplay
                        achievement={achievement}
                        game={game}
                        key={achievement.id}
                      />
                    );
                  })}
            </Content>
          </GamesContainer>
        )}
        <OptionContainer open={optionOpen}>
          <SearchInput
            background={"rgba(0,0,0,0.2)"}
            height={"50px"}
            padding={"2rem"}
            fontSize="1.5rem"
            onSearchChange={(search) => {
              dispatch(actionAchievementSearch(search));
            }}
          />
        </OptionContainer>
        <LeftSidebarContainer open={leftSidebarOpen}>
          <Profile games={games} />
          <Trophies games={games} title={"COLLECTION"} />
          <GameInfo game={game} />
          <GameMenu mobile={true} />
        </LeftSidebarContainer>
      </Overlay>
    </Container>
  );
}
