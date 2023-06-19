import React from "react";
import styled from "styled-components";
import {
  ICON_CHECK,
  ICON_CROSS,
  ICON_DELETE,
  ICON_EDIT,
  ICON_TROPHY,
  getIcon,
} from "../../helper/iconHelper";
import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { actionForceRefreshAchievement } from "../../store/actions/steam.actions";
import {
  COLOR_BUTTON_PRIMARY,
  COLOR_DANGER,
  COLOR_SUCCESS,
  getColor,
} from "../../helper/colorHelper";
import moment from "moment";

export default function AchievementDisplay({
  achievement,
  setEditModeActive,
  updateAchievementToEdit,
  game,
}) {
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

  const [mouseEnter, setMouseEnter] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const confirmDelete = () => {
    dispatch(actionForceRefreshAchievement(false));
    axios
      .delete(`/api/deleteAchievement?gameId=${gameId}&achievementId=${id}`)
      .then((response) => {
        dispatch(actionForceRefreshAchievement(true));
        router.push(`/games/${gameId}`);
      });
  };

  const completeAchievement = (shouldCompleteOrNot) => {
    dispatch(actionForceRefreshAchievement(false));
    axios
      .post(`/api/completeAchievement?gameId=${gameId}&achievementId=${id}`, {
        achieved: shouldCompleteOrNot,
        unlockTime: shouldCompleteOrNot ? moment.now() : "",
      })
      .then((response) => {
        dispatch(actionForceRefreshAchievement(true));
        router.push(`/games/${gameId}`);
      });
  };

  return (
    <Container achieved={achieved}>
      <Overlay
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        {showConfirm && (
          <Confirm>
            <Info>Are you Sure ?</Info>
            <Yes>
              <Button
                title="YES"
                onClick={() => {
                  confirmDelete();
                  setShowConfirm(false);
                }}
              />
            </Yes>
            <No>
              <Button
                title="NO"
                onClick={() => {
                  setShowConfirm(false);
                }}
              />
            </No>
          </Confirm>
        )}

        <Delete
          show={mouseEnter}
          onClick={() => {
            setShowConfirm(true);
          }}
        >
          {getIcon(ICON_DELETE)}
        </Delete>

        <Edit
          show={mouseEnter}
          onClick={() => {
            setEditModeActive(true);
            updateAchievementToEdit(achievement);
          }}
        >
          {getIcon(ICON_EDIT)}
        </Edit>

        <CompletedOrNot
          achieved={achieved}
          show={mouseEnter}
          onClick={() => {
            completeAchievement(!achieved);
          }}
        >
          {!achieved && getIcon(ICON_CHECK)}
          {achieved && getIcon(ICON_CROSS)}
        </CompletedOrNot>

        <Trophy achieved={achieved} color={getColor(type)}>
          {getIcon(ICON_TROPHY)}
        </Trophy>

        <AchievementIcon achieved={achieved}>
          {image && <Icon image={image}></Icon>}
          {false && <Percentage>{percentage} %</Percentage>}
        </AchievementIcon>

        <AchievementDetails achieved={achieved}>
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
            {categories.map((category, index) => {
              return <Category key={index}>{category}</Category>;
            })}
          </Categories>
        </AchievementDetails>
      </Overlay>
    </Container>
  );
}

const Overlay = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  width: 350px;
  border-radius: 2px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.75rem;
  font-size: 1.3rem;
  opacity: ${(props) => (props.achieved ? "0.25" : "1")};

  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-color: ${(props) =>
    props.selected ? COLOR_BUTTON_PRIMARY : `rgba(0,0,0,0.5)`};
  justify-content: flex-start;
  margin-right: 0.5rem;
  color: #888888;
`;

const Categories = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3rem;
  font-size: 1rem;
  color: ${(props) => props.color};
`;

const Trophy = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: 1rem;
  margin-right: 1rem;
  color: ${(props) => props.color};
  opacity: ${(props) => (props.achieved ? "0.25" : "1")};
`;

const Delete = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: ${(props) => (props.show ? "0px" : "-100px")};
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.25);
  opacity: 0.5;
  overflow: hidden;
  font-size: 1.25rem;
  transition: 0.25s all;
  &:hover {
    background: ${(props) => COLOR_DANGER};
    opacity: 1;
  }
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: ${(props) => (props.show ? "25px" : "-100px")};
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.25);
  opacity: 0.5;
  overflow: hidden;
  font-size: 1.25rem;
  transition: 0.25s all;
  &:hover {
    background: ${(props) => COLOR_BUTTON_PRIMARY};
    opacity: 1;
  }
`;

const CompletedOrNot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.25);
  left: ${(props) => (props.show ? "0px" : "-100px")};
  opacity: 0.5;
  overflow: hidden;
  font-size: 1.25rem;
  transition: 0.25s all;
  &:hover {
    background: ${(props) => (!props.achieved ? COLOR_SUCCESS : COLOR_DANGER)};
    opacity: 1;
  }
`;

const AchievementIcon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  opacity: ${(props) => (props.achieved ? "0.25" : "1")};
`;

const Title = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 20px;
`;
const Percentage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Description = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 40px;
  overflow: scroll;
  opacity: 0.5;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  width: 50px;
  height: 50px;
  background: ${(props) => `url(${props.image})`};
  background-size: cover;
  margin: 1rem;
`;

const AchievementDetails = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  justify-content: center;
  opacity: ${(props) => (props.achieved ? "0.25" : "1")};
  flex-direction: column;
  margin: 1rem 0;
`;

const Confirm = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

const Info = styled.div`
  display: flex;
  margin-right: 2rem;
  align-items: center;
  justify-content: center;
`;
const Yes = styled.div`
  padding: 0.5rem;
  margin-right: 0.5rem;
`;
const No = styled.div`
  padding: 0.5rem;
`;
