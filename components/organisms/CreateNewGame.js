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
import {
  COLOR_BLIZZARD,
  COLOR_BUTTON_PRIMARY,
  COLOR_EPIC,
  COLOR_GOG,
  COLOR_GREY,
  COLOR_ORIGIN,
  COLOR_PLATINUM,
  COLOR_PLAYSTATION,
  COLOR_STEAM,
  COLOR_UPLAY,
  COLOR_XBOX,
} from "../../helper/colorHelper";
import {
  ICON_BLIZZARD,
  ICON_EPIC,
  ICON_GOG,
  ICON_ORIGIN,
  ICON_PLAYSTATION,
  ICON_STEAM,
  ICON_TROPHY,
  ICON_UPLAY,
  ICON_XBOX,
  getIcon,
} from "../../helper/iconHelper";
import {
  BLIZZARD,
  EPIC,
  GOG,
  ORIGIN,
  PLAYSTATION,
  STEAM,
  UPLAY,
  XBOX,
} from "../../helper/constantHelper";

export default function CreateNewGame() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [platform, setPlatform] = useState("");
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
        <Input>
          <Label>Name:</Label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Input>
        <Input>
          <Label>Image:</Label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Input>
        <Input>
          <Label>Platform:</Label>
          <PlatformSelection>
            <Platform
              hoverColor={COLOR_STEAM}
              color={platform == STEAM ? COLOR_STEAM : COLOR_GREY}
              selected={platform == STEAM}
              onClick={() => setPlatform(STEAM)}
            >
              {getIcon(ICON_STEAM)}
            </Platform>
            <Platform
              hoverColor={COLOR_UPLAY}
              color={platform == UPLAY ? COLOR_UPLAY : COLOR_GREY}
              selected={platform == UPLAY}
              onClick={() => setPlatform(UPLAY)}
            >
              {getIcon(ICON_UPLAY)}
            </Platform>
            <Platform
              hoverColor={COLOR_EPIC}
              color={platform == EPIC ? COLOR_EPIC : COLOR_GREY}
              selected={platform == EPIC}
              onClick={() => setPlatform(EPIC)}
            >
              {getIcon(ICON_EPIC)}
            </Platform>
            <Platform
              fontSize={"1.5rem"}
              hoverColor={COLOR_GOG}
              color={platform == GOG ? COLOR_GOG : COLOR_GREY}
              selected={platform == GOG}
              onClick={() => setPlatform(GOG)}
            >
              {getIcon(ICON_GOG)}
            </Platform>
            <Platform
              hoverColor={COLOR_PLAYSTATION}
              color={platform == PLAYSTATION ? COLOR_PLAYSTATION : COLOR_GREY}
              selected={platform == PLAYSTATION}
              onClick={() => setPlatform(PLAYSTATION)}
            >
              {getIcon(ICON_PLAYSTATION)}
            </Platform>
            <Platform
              hoverColor={COLOR_XBOX}
              color={platform == XBOX ? COLOR_XBOX : COLOR_GREY}
              selected={platform == XBOX}
              onClick={() => setPlatform(XBOX)}
            >
              {getIcon(ICON_XBOX)}
            </Platform>
            <Platform
              hoverColor={COLOR_BLIZZARD}
              fontSize={"2rem"}
              color={platform == BLIZZARD ? COLOR_BLIZZARD : COLOR_GREY}
              selected={platform == BLIZZARD}
              onClick={() => setPlatform(BLIZZARD)}
            >
              {getIcon(ICON_BLIZZARD)}
            </Platform>
            <Platform
              fontSize={"1.5rem"}
              hoverColor={COLOR_ORIGIN}
              color={platform == ORIGIN ? COLOR_ORIGIN : COLOR_GREY}
              selected={platform == ORIGIN}
              onClick={() => setPlatform(ORIGIN)}
            >
              {getIcon(ICON_ORIGIN)}
            </Platform>
          </PlatformSelection>
        </Input>
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

const PlatformSelection = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
`;

const Platform = styled.div`
  display: flex;
  font-size: ${(props) => props.fontSize ?? "1.5rem"};
  align-items: center;
  margin-right: 0.25rem;
  padding: 0.25rem 1rem;
  justify-content: flex-start;
  color: ${(props) => props.color};

  &:hover {
    color: ${(props) => props.hoverColor};
  }
`;

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
  width: 380px;
  height: 140px;
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
  background: rgba(0, 0, 0, 0.5);
  font-size: 1rem;
  width: 100%;
  height: 100%;
  position: relative;
  flex-direction: column;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  width: 50px;
  justify-content: flex-start;
  color: ${(props) => COLOR_BUTTON_PRIMARY};
`;

const Input = styled.div`
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
