import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { BACKGROUND_IMAGE, HEADER_IMAGE } from "../../../helper/urlHelper";
import Profile from "../../../components/molecules/Profile";
import Trophies from "../../../components/molecules/Trophies";
import GameMenu from "../../../components/atoms/GameMenu";
import { useDispatch, useSelector } from "react-redux";
import { actionForceRefreshAchievement } from "../../../store/actions/steam.actions";
import CreateNewAchievement from "../../../components/organisms/CreateNewAchievement";
import { useRouter } from "next/router";
import AchievementDisplay from "../../../components/atoms/AchievementDisplay";
import GameInfo from "../../../components/molecules/GameInfo";
import { getLoader } from "../../../helper/constantHelper";
import {
  calculateAllTrophyCountForGames,
  getTrophyCount,
} from "../../../helper/gameHelper";

export default function GamesPage() {
  const [achievementsLoading, setAchievementsLoading] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [game, setGame] = useState({});
  const [games, setGames] = useState([]);
  const [editModeActive, setEditModeActive] = useState(false);
  const [achievementToEdit, setAchievementToEdit] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const { forceRefreshAchievement, themeId } = settings;
  const { toggle } = steam;
  const { createNewAchievementModal, keepAddingAchievements } = toggle;

  useEffect(() => {
    if (router.query.gameId) {
      axios
        .get(`/api/${router.query.gameId}/achievements`)
        .then((response) => {
          setGame(response.data.game ?? {});
          setAchievements(response.data.game.achievements ?? []);
          dispatch(actionForceRefreshAchievement(false));
        })
        .catch((error) => {
          setAchievements([]);
          dispatch(actionForceRefreshAchievement(false));
        });
    }
  }, [forceRefreshAchievement, router.query.gameId, dispatch]);

  useEffect(() => {
    axios.get("/api/games").then((response) => {
      setGames(response.data.games);
    });
  }, [dispatch]);

  const updateAchievementToEdit = (achievement) => {
    setAchievementToEdit(achievement);
  };

  return (
    <Container image={HEADER_IMAGE(themeId ?? "130130")}>
      <Overlay>
        {createNewAchievementModal && !achievementsLoading && (
          <CreateModal>
            <CreateNewAchievement
              keepAddingAchievements={keepAddingAchievements}
            />
          </CreateModal>
        )}
        {editModeActive && !achievementsLoading && (
          <CreateModal>
            <CreateNewAchievement
              achievementToEdit={achievementToEdit}
              isEditMode={true}
              setEditModeActive={setEditModeActive}
            />
          </CreateModal>
        )}
        <SidebarContainer>
          <Profile games={games} />
          <Trophies games={games} title={"COLLECTION"} />
          <GameInfo game={game} />
          <GameMenu />
        </SidebarContainer>
        <MainContainer>
          {achievementsLoading && (
            <LoaderContainer>{getLoader()}</LoaderContainer>
          )}
          {
            <InnerContainer>
              {!createNewAchievementModal &&
                !achievementsLoading &&
                achievements.length == 0 && <NoGames>No Achievements</NoGames>}
              {!achievementsLoading &&
                achievements.length != 0 &&
                achievements
                  .sort((ach1, ach2) => ach2.percentage - ach1.percentage)
                  .map((achievement, index) => {
                    return (
                      <AchievementDisplay
                        game={game}
                        achievement={achievement}
                        key={achievement._id}
                        setEditModeActive={setEditModeActive}
                        updateAchievementToEdit={updateAchievementToEdit}
                      />
                    );
                  })}
            </InnerContainer>
          }
        </MainContainer>
      </Overlay>
    </Container>
  );
}

const CreateModal = styled.div`
  width: 700px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 100;
  background: ${`url(${BACKGROUND_IMAGE})`};
`;

const NoGames = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => `url(${props.image})`};
  background-repeat: no-repeat;
  background-size: cover;
  color: #fefefe;
  position: relative;
`;

const Overlay = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  backdrop-filter: blur(50px);
  position: relative;
`;

const SidebarContainer = styled.div`
  min-width: 200px;
  backdrop-filter: blur(10px);
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  min-height: 100vh;
  justify-content: flex-start;
  flex-direction: column;
  z-index: 101;
`;

const MainContainer = styled.div`
  flex: 1;
  padding: 1rem 1rem 1rem 2vw;
  min-height: 100vh;
  display: flex;
  overflow: scroll;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  justify-content: flex-start;
  flex-direction: column;
`;

const LoaderContainer = styled.div`
  min-width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  min-width: 100%;
  min-height: 100%;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;
