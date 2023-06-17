import React from "react";
import styled from "styled-components";
import {
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
  getColor,
} from "../../helper/colorHelper";

export default function AchievementDisplay({ achievement }) {
  const { image, id, name, description, gameId, type } = achievement;
  const router = useRouter();
  const dispatch = useDispatch();

  const [editModeActive, setEditModeActive] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedImage, setUpdatedImage] = useState(image);
  const [loading, setLoading] = useState(false);

  const confirmDelete = () => {
    dispatch(actionForceRefreshAchievement(false));
    axios
      .delete(`/api/deleteAchievement?gameId=${gameId}&achievementId=${id}`)
      .then((response) => {
        dispatch(actionForceRefreshAchievement(true));
        router.push(`/games/${gameId}`);
      });
  };

  const updateAchievement = () => {
    setLoading(true);
    axios
      .post("/api/updateAchievement", {
        game: { name: updatedName, image: updatedImage, id: _id },
      })
      .then((response) => {
        setLoading(false);
        setEditModeActive(false);
        dispatch(actionForceRefreshAchievement(true));
        router.push("/games");
      });
  };

  return (
    <Container>
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
        {
          <Delete
            show={mouseEnter}
            onClick={() => {
              setShowConfirm(true);
            }}
          >
            {getIcon(ICON_DELETE)}
          </Delete>
        }
        {false && (
          <DeleteCheck>
            <input
              type="checkbox"
              checked={true}
              onChange={(e) => {
                const checked = e.target.value;
                console.log(checked);
              }}
            />
          </DeleteCheck>
        )}
        <Trophy color={getColor(type)}>{getIcon(ICON_TROPHY)}</Trophy>
        <AchievementIcon>
          {image && <Icon image={image}></Icon>}
          {!image && <IconPlaceholder>{getIcon(ICON_TROPHY)}</IconPlaceholder>}
        </AchievementIcon>
        <AchievementDetails>
          <Title>{name}</Title>
          <Description>{description}</Description>
        </AchievementDetails>
      </Overlay>
    </Container>
  );
}

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
`;

const DeleteCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 0.5rem;
  margin-right: 1rem;
`;

const Delete = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: ${(props) => (props.show ? "0px" : "-100px")};
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  background: ${(props) => COLOR_DANGER};
  opacity: 0.5;
  overflow: hidden;
  font-size: 1.25rem;
  transition: 0.25s all;
  &:hover {
    background: ${(props) => COLOR_DANGER};
    opacity: 1;
  }
`;

const AchievementIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 30px;
`;

const Description = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 30px;
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

const IconPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  width: 50px;
  height: 50px;
  font-size: 3rem;
  background: ${(props) => `url(${props.image})`};
  background-size: cover;
  margin: 1rem;
  opacity: 0.25;
`;

const AchievementDetails = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  margin: 1rem 0;
`;

const Overlay = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  width: 300px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;

  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
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
