import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  ICON_CHECK,
  ICON_CROSS,
  ICON_TROPHY,
  IMAGE_BRONZE,
  IMAGE_LOCKED,
  getIcon,
  getImage,
  getImageURL,
  getTrophyImage,
} from "../../helper/iconHelper";
import {
  COLOR_DANGER,
  COLOR_SILVER,
  COLOR_SUCCESS,
  getColor,
} from "../../helper/colorHelper";
import { useSwipeable } from "react-swipeable";
import {
  actionForceRefreshAchievement,
  actionForceRefreshProfile,
} from "../../store/actions/steam.actions";
import axios from "axios";
import moment from "moment";
import Draggable, { DraggableCore } from "react-draggable";
import { BeatLoader, MoonLoader, PulseLoader } from "react-spinners";
import { getLoader } from "../../helper/constantHelper";

export default function AchievementDisplayPSUI({
  game,
  achievement,
  setLeftSidebarOpen,
}) {
  console.log("JEEVA", game);
  const {
    image,
    id,
    name,
    description,
    gameId,
    type,
    percentage,
    categories,
    achieved,
    unlockTime,
  } = achievement;
  const router = useRouter();
  const dispatch = useDispatch();

  const [marking, setMarking] = useState(false);

  const completeAchievement = (shouldCompleteOrNot) => {
    setMarking(true);
    dispatch(actionForceRefreshAchievement(false));
    dispatch(actionForceRefreshProfile(false));
    axios
      .post(`/api/completeAchievement?gameId=${gameId}&achievementId=${id}`, {
        achieved: shouldCompleteOrNot,
        unlockTime: shouldCompleteOrNot ? moment.now() : "",
      })
      .then((response) => {
        setMarking(false);
        dispatch(actionForceRefreshAchievement(true));
        dispatch(actionForceRefreshProfile(true));
        router.push(`/games/${gameId}`);
      });
  };

  return (
    <MainContainer>
      <InnerContainer>
        <IconContainer>
          {achieved && (
            <Icon
              src={image}
              onClick={() => {
                achieved
                  ? completeAchievement(false)
                  : completeAchievement(true);
              }}
            />
          )}
          {!achieved && (
            <LockedIcon
              src={getImageURL(IMAGE_LOCKED)}
              onClick={() => {
                achieved
                  ? completeAchievement(false)
                  : completeAchievement(true);
              }}
            />
          )}
        </IconContainer>
        <Content>
          <Title>{name}</Title>
          <Desc>{description}</Desc>
          <Others>
            <TrophyType>{getTrophyImage(type, "25px")}</TrophyType>
            {achieved && (
              <CompletedTime>
                {moment(unlockTime).format("DD/MM/YYYY HH:MM")}
              </CompletedTime>
            )}
            {achieved && <UnlockIcon>{getIcon(ICON_TROPHY)}</UnlockIcon>}
          </Others>
        </Content>
      </InnerContainer>
      {achieved && <CompletedBar />}
      <LoadingSpinner>
        {marking && <PulseLoader size={5} color="#FEFEFE" />}
      </LoadingSpinner>
    </MainContainer>
  );
}

const Atom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const TrophyType = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
  margin-top: 1rem;
`;

const UnlockIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
`;

const CompletedTime = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  font-size: 1.1rem;
  justify-content: flex-end;
  margin-right: 1rem;
  opacity: 0.6;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  min-height: 50px;
`;

const CompletedBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 8px;
  height: 2px;
  background-color: #fefefe;
`;

const LockedIcon = styled.div`
  display: flex;
  min-width: 50px;
  min-height: 50px;
  align-items: center;
  border-radius: 8px;
  justify-content: center;
  background: ${(props) => `url(${props.src})`};
  background-size: cover;
  margin-right: 1rem;
  background-repeat: no-repeat;
  transform: scale(120%);
`;

const Icon = styled.div`
  display: flex;
  min-width: 50px;
  min-height: 50px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background: ${(props) => `url(${props.src})`};
  background-size: cover;
  margin-right: 1rem;
  background-repeat: no-repeat;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  font-weight: 100;
  font-size: 1.5rem;
  align-items: center;
  opacity: 0.7;
  justify-content: center;
`;

const Desc = styled.div`
  display: flex;
  font-weight: 100;
  opacity: 0.6;
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
`;

const Others = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  justify-content: center;
  overflow: hidden;
  padding: 1rem 2rem;
  margin-right: 2rem;
  border-radius: 8px;
  flex-direction: column;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(0deg, #17181a 0%, #1f2022 90%);
  margin-bottom: 2rem;
  position: relative;
`;