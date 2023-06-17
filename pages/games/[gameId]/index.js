import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import { BACKGROUND_IMAGE } from "../../../helper/urlHelper";
import Profile from "../../../components/molecules/Profile";
import Trophies from "../../../components/molecules/Trophies";
import GameMenu from "../../../components/atoms/GameMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  actionForceRefresh,
  actionForceRefreshAchievement,
  actionShowCreateBulkAchievements,
  actionShowCreateNewAchievement,
  actionShowCreateNewGame,
} from "../../../store/actions/steam.actions";
import Button from "../../../components/atoms/Button";
import CreateNewAchievement from "../../../components/organisms/CreateNewAchievement";
import { useRouter } from "next/router";
import AchievementDisplay from "../../../components/atoms/AchievementDisplay";
import { ICON_CLOSE, getIcon } from "../../../helper/iconHelper";
import { COLOR_DANGER } from "../../../helper/colorHelper";

export default function GamesPage() {
  const [achievementsLoading, setAchievementsLoading] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [editModeActive, setEditModeActive] = useState(false);
  const [achievementToEdit, setAchievementToEdit] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const { forceRefreshAchievement } = settings;
  const { toggle } = steam;
  const { createNewAchievementModal } = toggle;

  const finalizeGenerate = () => {
    setShowGenerate(false);
  };

  useEffect(() => {
    if (router.query.gameId) {
      axios
        .get(`/api/${router.query.gameId}/achievements`)
        .then((response) => {
          console.log(response);
          setAchievements(response.data.game.achievements ?? []);
          actionForceRefreshAchievement(false);
        })
        .catch((error) => {
          setAchievements([]);
          actionForceRefreshAchievement(false);
        });
    }
  }, [forceRefreshAchievement, router.query.gameId]);

  const updateAchievementToEdit = (achievement) => {
    setAchievementToEdit(achievement);
  };

  return (
    <Container image={BACKGROUND_IMAGE}>
      <Overlay>
        {createNewAchievementModal && !achievementsLoading && (
          <CreateModal>
            <CreateNewAchievement />
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
          <Profile />
          <Trophies />
          <GameMenu />
        </SidebarContainer>
        <MainContainer>
          {achievementsLoading && (
            <LoaderContainer>
              <HashLoader />
            </LoaderContainer>
          )}
          {
            <InnerContainer>
              {!createNewAchievementModal &&
                !achievementsLoading &&
                achievements.length == 0 && (
                  <NoGames>
                    <Button
                      title={"Add New Achievement"}
                      onClick={() => {
                        dispatch(actionShowCreateNewAchievement(true));
                      }}
                    />
                  </NoGames>
                )}
              {!achievementsLoading &&
                achievements.length != 0 &&
                achievements.map((achievement, index) => {
                  return (
                    <AchievementDisplay
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
  width: 600px;
  height: 400px;
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

const CreateAchievementCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  width: 350px;
  height: 120px;
  margin: 0.5rem;
  border-radius: 2px;

  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
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
  backdrop-filter: blur(20px);
  position: relative;
`;

const SidebarContainer = styled.div`
  min-width: 8vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const MainContainer = styled.div`
  min-width: 92vw;
  padding: 1rem;
  min-height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
