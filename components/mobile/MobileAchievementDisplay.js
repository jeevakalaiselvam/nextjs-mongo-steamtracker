import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  ICON_CHECK,
  ICON_CROSS,
  ICON_TROPHY,
  getIcon,
} from "../../helper/iconHelper";
import {
  COLOR_DANGER,
  COLOR_SUCCESS,
  getColor,
} from "../../helper/colorHelper";
import { useSwipeable } from "react-swipeable";
import { actionForceRefreshAchievement } from "../../store/actions/steam.actions";
import axios from "axios";
import moment from "moment";

export default function MobileAchievementDisplay({ game, achievement }) {
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
  } = achievement;
  const router = useRouter();
  const dispatch = useDispatch();

  const [longPressed, setLongPressed] = useState(false);

  const completeAchievement = (shouldCompleteOrNot) => {
    dispatch(actionForceRefreshAchievement(false));
    axios
      .post(`/api/completeAchievement?gameId=${gameId}&achievementId=${id}`, {
        achieved: shouldCompleteOrNot,
        unlockTime: shouldCompleteOrNot ? moment.now() : "",
      })
      .then((response) => {
        dispatch(actionForceRefreshAchievement(true));
        router.push(`/mobile/games/${gameId}`);
      });
  };

  const config = {
    delta: 100, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
  };

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      console.log(eventData);
      completeAchievement(false);
    },
    onSwipedRight: (eventData) => {
      completeAchievement(true);
    },
    ...config,
  });

  return (
    <Container achieved={achieved} {...handlers}>
      <IconContainer>
        <Icon image={image} />
      </IconContainer>
      <DetailContainer>
        <Title
          onClick={() => {
            if (window !== "undefined") {
              const searchQuery = `${name} achievement ${game?.name} `;
              window.open(`https://www.google.com/search?q=${searchQuery}`);
              // window.open(`https://www.youtube.com/results?search_query=${searchQuery}`);
            }
          }}
        >
          {name}
        </Title>
        <Description>{description}</Description>
        <Categories>
          {categories.map((category) => {
            return <Category key={category}>{category}</Category>;
          })}
        </Categories>
      </DetailContainer>
      <Trophy color={getColor(type)}>{getIcon(ICON_TROPHY)}</Trophy>

      {false && (
        <CompletedOrNot
          achieved={achieved}
          show={longPressed}
          onClick={() => {
            completeAchievement(!achieved);
          }}
        >
          {!achieved && getIcon(ICON_CHECK)}
          {achieved && getIcon(ICON_CROSS)}
        </CompletedOrNot>
      )}
    </Container>
  );
}

const CompletedOrNot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  padding: 0.5rem 0.5rem;
  font-size: 2rem;
  background: rgba(0, 0, 0, 0.25);
  right: ${(props) => (props.show ? "0px" : "-100px")};
  opacity: 0.5;
  overflow: hidden;
  font-size: 1.25rem;
  transition: 0.25s all;
  &:hover {
    background: ${(props) => (!props.achieved ? COLOR_SUCCESS : COLOR_DANGER)};
    opacity: 1;
  }
`;

const Categories = styled.div`
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  padding: 0.25rem 0.5rem;
  font-size: 1.1rem;
  color: #888888;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
  opacity: ${(props) => (props.achieved ? "0.25" : "1")};
  position: relative;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 45px;
  height: 45px;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 20px;
  width: 100%;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  width: 100%;
  opacity: 0.5;
`;

const Trophy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
  font-size: 2rem;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  background: ${(props) => `url(${props.image})`};
  background-repeat: no-repeat;
  background-size: contain;
`;

const DetailContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 0.25rem 1rem;
  flex: 1;
  justify-content: center;
`;
