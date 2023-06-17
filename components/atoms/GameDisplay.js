import React from "react";
import styled from "styled-components";
import { ICON_DELETE, ICON_EDIT, getIcon } from "../../helper/iconHelper";
import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useRouter } from "next/router";
import CreateNewGame from "../organisms/CreateNewGame";
import { useDispatch } from "react-redux";
import { actionForceRefreshGames } from "../../store/actions/steam.actions";
import { COLOR_BUTTON_PRIMARY } from "../../helper/colorHelper";

export default function GameDisplay({ game }) {
  const { image, _id, name } = game;
  const router = useRouter();
  const dispatch = useDispatch();

  const [editModeActive, setEditModeActive] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedImage, setUpdatedImage] = useState(image);
  const [loading, setLoading] = useState(false);

  const confirmDelete = () => {
    axios.delete(`/api/deleteGame?id=${_id}`).then((response) => {
      dispatch(actionForceRefreshGames(true));
      router.push("/games");
    });
  };

  const updateGame = () => {
    setLoading(true);
    axios
      .post("/api/updateGame", {
        game: { name: updatedName, image: updatedImage, id: _id },
      })
      .then((response) => {
        setLoading(false);
        setEditModeActive(false);
        dispatch(actionForceRefreshGames(true));
        router.push("/games");
      });
  };

  return (
    <Container image={image}>
      <Overlay
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        {editModeActive && (
          <EditMode>
            <EditContainer image={image}>
              <EditOverlay>
                <NameInput>
                  <Label>Name:</Label>
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </NameInput>
                <ImageInput>
                  <Label>Image:</Label>
                  <input
                    type="text"
                    value={updatedImage}
                    onChange={(e) => setUpdatedImage(e.target.value)}
                  />
                </ImageInput>
                <SaveContainer>
                  <Button
                    width={"auto"}
                    title={"SAVE"}
                    onClick={() => {
                      updateGame();
                    }}
                  />
                </SaveContainer>
              </EditOverlay>
            </EditContainer>
          </EditMode>
        )}
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
        <Name
          onClick={() => {
            router.push(`/games/${_id}`);
          }}
        >
          {name}
        </Name>
        <Edit
          show={mouseEnter}
          onClick={() => {
            setEditModeActive(true);
          }}
        >
          {getIcon(ICON_EDIT)}
        </Edit>
        <Delete
          show={mouseEnter}
          onClick={() => {
            setShowConfirm(true);
          }}
        >
          {getIcon(ICON_DELETE)}
        </Delete>
      </Overlay>
    </Container>
  );
}

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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 378px;
  height: 177px;
  background: ${(props) => `url(${props.image})`};
  background-repeat: no-repeat;
  background-size: cover;
  margin: 1rem;

  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 380px;
  height: 177px;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
`;

const Name = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

const Edit = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.show ? "0" : "-100px")};
  display: flex;
  font-size: 2rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  transition: 0.25s all;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);

  &:hover {
    color: #2298f8;
  }
`;

const Delete = styled.div`
  position: absolute;
  top: 0;
  right: ${(props) => (props.show ? "0" : "-100px")};
  display: flex;
  font-size: 2rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  transition: 0.25s all;
  &:hover {
    color: #ec4134;
  }
`;

const SaveContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  width: 100%;
`;

const EditMode = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
`;

const EditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;

  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

const EditOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 380px;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  flex-direction: column;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  width: 50px;
  justify-content: center;
  color: ${(props) => COLOR_BUTTON_PRIMARY};
`;

const ImageInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;

  & > input {
    width: 100%;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.5);
    outline: none;
    border: none;
  }
`;

const NameInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;

  & > input {
    width: 100%;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.5);
    outline: none;
    border: none;
  }
`;
