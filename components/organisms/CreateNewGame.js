import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  actionForceRefreshGames,
  actionShowCreateNewGame,
} from "../../store/actions/steam.actions";
import { COLOR_BUTTON_PRIMARY } from "../../helper/colorHelper";

export default function CreateNewGame() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const saveGame = () => {
    setLoading(true);
    axios
      .post("/api/createGame", { game: { name, image } })
      .then((response) => {
        setLoading(false);
        dispatch(actionForceRefreshGames(true));
        router.push("/games");
      });
  };

  return (
    <Container image={image}>
      <Overlay>
        <NameInput>
          <Label>Name:</Label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </NameInput>
        <ImageInput>
          <Label>Image:</Label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </ImageInput>
        <SaveContainer>
          <Button
            margin={"0 1rem 0 0"}
            width={"auto"}
            title={"SAVE"}
            onClick={() => {
              saveGame();
            }}
          />
          <Button
            width={"auto"}
            title={"CLOSE"}
            onClick={() => {
              dispatch(actionShowCreateNewGame(false));
            }}
          />
        </SaveContainer>
      </Overlay>
    </Container>
  );
}

const SaveContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 378px;
  height: 177px;
  background: ${(props) => `url(${props.image})`};
  background-repeat: no-repeat;
  background-size: contain;
  margin: 1rem;

  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 380px;
  height: 177px;
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
