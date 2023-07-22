import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { BACKGROUND_IMAGE, HEADER_IMAGE } from "../../../../helper/urlHelper";
import {
  findRarestAchievementForGame,
  getAllStatsForGame,
  getTrophyCount,
} from "../../../../helper/gameHelper";
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
import GameMenu from "../../../../components/atoms/GameMenu";
import Trophies from "../../../../components/molecules/Trophies";
import Profile from "../../../../components/molecules/Profile";
import GameInfo from "../../../../components/molecules/GameInfo";
import MobileAchievementDisplayPSUI from "../../../../components/mobile/MobileAchievementDisplayPSUI";
import {
  IMAGE_BRONZE,
  IMAGE_GOLD,
  IMAGE_PLATINUM,
  IMAGE_SILVER,
  getImage,
} from "../../../../helper/iconHelper";
import CirclePercentage from "../../../../components/atoms/CirclePercentage";
import GameCompleteOverview from "../../../../components/atoms/GameCompleteOverview";
import PSUIHeader from "../../../../components/atoms/PSUIHeader";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  color: #fefefe;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #121315;
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #121315;
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
  background-color: #0e0e0f;
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
  background-color: rgba(0, 0, 0, 0.2);
  min-height: 92vh;
  max-height: 92vh;
  padding: 0.5rem;
  backdrop-filter: blur(20px);
`;

export default function Game() {
  const router = useRouter();
  const [optionOpen, setOptionOpen] = useState(false);
  const [game, setGame] = useState([]);
  const [loading, setLoading] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [games, setGames] = useState([]);

  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const {
    forceRefreshAchievement,
    forceRefreshProfile,
    themeId,
    achievementSearch,
    achievementFilter,
    achievementFilterCategory,
    pinnedAchievements,
  } = settings;
  const { toggle } = steam;

  useEffect(() => {
    axios.get("/api/games").then((response) => {
      setGames(response.data.games);
    });
  }, [forceRefreshProfile]);

  const dispatch = useDispatch();

  const trophies = getTrophyCount(game?.achievements ?? []);

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
  }, [
    router.query.gameId,
    forceRefreshAchievement,
    dispatch,
    forceRefreshProfile,
  ]);

  const optionToggle = (toggle) => {
    setOptionOpen(toggle);
  };

  const leftSidebarToggle = (toggle) => {
    setLeftSidebarOpen(toggle);
  };

  let rarestAchievement = findRarestAchievementForGame(game?.achievements);
  let pinnedAchievementIds = (pinnedAchievements ?? {})?.[game?._id] ?? [];
  let pinnedAchievementsForGame = game?.achievements?.filter((ach) =>
    pinnedAchievementIds?.includes(ach?.id)
  );

  let unPinnedAchievementsForGame = game?.achievements?.filter(
    (ach) => !pinnedAchievementIds?.includes(ach?.id)
  );

  const [showLongPressOptions, setShowLongPresOptions] = useState(false);
  const achievementLongPressed = (game, id) => {
    pinOrUnpinAchievement(game, id);
  };

  return (
    <Container image={HEADER_IMAGE(themeId ?? "130130")}>
      <Overlay>
        {showLongPressOptions && (
          <LongPressOptions>
            <OptionItem>Pin Achievement</OptionItem>
          </LongPressOptions>
        )}
        {loading && <LoadingContainer>{getLoader()}</LoadingContainer>}
        {!loading && (
          <GamesContainer>
            <Header>
              <PSUIHeader games={games} />
            </Header>
            <Content>
              <GameOverview>
                <GameCompleteOverview game={game} />
              </GameOverview>
              {pinnedAchievementsForGame?.length > 0 && (
                <Section>
                  <SectionHeader>Pinned Trophies</SectionHeader>
                  <SectionContent>
                    {(pinnedAchievementsForGame ?? [])
                      ?.sort(
                        (ach1, ach2) =>
                          Number(ach2.percentage?.replace("%", "")) -
                          Number(ach1.percentage?.replace("%", ""))
                      )
                      ?.map((ach) => {
                        return (
                          <MobileAchievementDisplayPSUI
                            game={game}
                            key={ach.name}
                            achievement={ach}
                            achievementLongPressed={achievementLongPressed}
                          />
                        );
                      })}
                  </SectionContent>
                </Section>
              )}
              {rarestAchievement && (
                <Section>
                  <SectionHeader>Rarest Trophy Earned</SectionHeader>
                  <SectionContent>
                    {rarestAchievement && (
                      <MobileAchievementDisplayPSUI
                        game={game}
                        achievement={rarestAchievement}
                      />
                    )}
                  </SectionContent>
                </Section>
              )}
              <Section>
                <SectionHeader>All Trophies</SectionHeader>
                <SectionContent>
                  {unPinnedAchievementsForGame
                    ?.sort(
                      (ach1, ach2) =>
                        Number(ach2.percentage?.replace("%", "")) -
                        Number(ach1.percentage?.replace("%", ""))
                    )
                    ?.map((ach) => {
                      return (
                        <MobileAchievementDisplayPSUI
                          game={game}
                          key={ach.name}
                          achievement={ach}
                          achievementLongPressed={achievementLongPressed}
                        />
                      );
                    })}
                </SectionContent>
              </Section>
            </Content>
          </GamesContainer>
        )}
        <OptionContainer open={optionOpen}></OptionContainer>
        <LeftSidebarContainer
          open={leftSidebarOpen}
          image={HEADER_IMAGE(themeId ?? "130130")}
        >
          <SidebarOverlay>
            <Profile games={games} />
            <Trophies games={games} title={"COLLECTION"} />
            <GameInfo game={game} />
            <GameMenu mobile={true} game={game} />
          </SidebarOverlay>
        </LeftSidebarContainer>
      </Overlay>
    </Container>
  );
}

const Atom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LongPressOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  color: #fefefe;
  top: 50%;
  width: 80%;
  left: 50%;
  padding: 1rem;
  z-index: 9099999999;
  background-color: #010101;
  transform: translate(-50%, -50%);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: flex-start;
  width: 100%;
`;

const SectionContent = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  width: 100%;
  flex-direction: column;
`;

const GameOverview = styled.div`
  display: flex;
  width: 94%;
  align-items: center;
  justify-content: center;
`;
