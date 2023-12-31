import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useRouter } from "next/router";
import CreateNewGame from "../organisms/CreateNewGame";
import { useDispatch } from "react-redux";
import { actionForceRefreshGames } from "../../store/actions/steam.actions";
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
  getColorForPlatform,
} from "../../helper/colorHelper";
import {
  ICON_BLIZZARD,
  ICON_EPIC,
  ICON_GOG,
  ICON_ORIGIN,
  ICON_PLAYSTATION,
  ICON_STEAM,
  ICON_TROPHY,
  ICON_EDIT,
  ICON_DELETE,
  ICON_UPLAY,
  ICON_XBOX,
  getIcon,
  getIconForPlatform,
  getImage,
  IMAGE_PLATINUM,
} from "../../helper/iconHelper";
import {
  BLIZZARD,
  EPIC,
  GOG,
  ORIGIN,
  PLATINUM,
  PLAYSTATION,
  STEAM,
  UPLAY,
  XBOX,
} from "../../helper/constantHelper";
import moment from "moment";

export default function GameDisplay({ game }) {
  const { image, _id, name, platform, target, targetStart, targetEnd } = game;
  const router = useRouter();
  const dispatch = useDispatch();

  const [editModeActive, setEditModeActive] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedImage, setUpdatedImage] = useState(image);
  const [updatedPlatform, setUpdatedPlatform] = useState(platform);
  const [updatedHidden, setUpdatedHidden] = useState(game?.hidden ?? false);
  const [updatedTarget, setUpdatedTarget] = useState(target ?? 7);
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
        game: {
          name: updatedName,
          image: updatedImage,
          id: _id,
          platform: updatedPlatform,
          hidden: updatedHidden,
          target: updatedTarget,
          targetStart: targetStart,
        },
      })
      .then((response) => {
        setLoading(false);
        setEditModeActive(false);
        dispatch(actionForceRefreshGames(true));
        router.push("/games");
      });
  };

  const isPlatinumCompleted =
    game?.achievements &&
    game?.achievements?.length &&
    game?.achievements.filter((achievement) => !achievement.achieved)?.length ==
      0;

  const [daysDifference, setDaysDifference] = useState(
    moment(targetEnd).diff(moment(), "days")
  );
  const [hoursDifference, setHoursDifference] = useState(
    moment(targetEnd).diff(moment(), "hours") % 24
  );
  const [minutesDifference, setMinutesDifference] = useState(
    moment(targetEnd).diff(moment(), "minutes") % 60
  );
  useEffect(() => {
    if (!isPlatinumCompleted) {
      const timing = setInterval(() => {
        setDaysDifference(moment(targetEnd).diff(moment(), "days"));
        setHoursDifference(moment(targetEnd).diff(moment(), "hours") % 24);
        setMinutesDifference(moment(targetEnd).diff(moment(), "minutes") % 60);
      }, [1000]);
      return () => {
        clearInterval(timing);
      };
    }
  }, [target, targetStart, targetEnd]);

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
                <Input>
                  <Label>Name:</Label>
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </Input>
                <Input>
                  <Label>Image:</Label>
                  <input
                    type="text"
                    value={updatedImage}
                    onChange={(e) => setUpdatedImage(e.target.value)}
                  />
                </Input>
                <Input>
                  <Label>Platform:</Label>
                  <PlatformSelection>
                    <Platform
                      hoverColor={COLOR_STEAM}
                      color={
                        updatedPlatform == STEAM ? COLOR_STEAM : COLOR_GREY
                      }
                      selected={updatedPlatform == STEAM}
                      onClick={() => setUpdatedPlatform(STEAM)}
                    >
                      {getIcon(ICON_STEAM)}
                    </Platform>
                    <Platform
                      hoverColor={COLOR_UPLAY}
                      color={
                        updatedPlatform == UPLAY ? COLOR_UPLAY : COLOR_GREY
                      }
                      selected={updatedPlatform == UPLAY}
                      onClick={() => setUpdatedPlatform(UPLAY)}
                    >
                      {getIcon(ICON_UPLAY)}
                    </Platform>
                    <Platform
                      hoverColor={COLOR_EPIC}
                      color={updatedPlatform == EPIC ? COLOR_EPIC : COLOR_GREY}
                      selected={updatedPlatform == EPIC}
                      onClick={() => setUpdatedPlatform(EPIC)}
                    >
                      {getIcon(ICON_EPIC)}
                    </Platform>
                    <Platform
                      fontSize={"1.5rem"}
                      hoverColor={COLOR_GOG}
                      color={updatedPlatform == GOG ? COLOR_GOG : COLOR_GREY}
                      selected={updatedPlatform == GOG}
                      onClick={() => setUpdatedPlatform(GOG)}
                    >
                      {getIcon(ICON_GOG)}
                    </Platform>
                    <Platform
                      hoverColor={COLOR_PLAYSTATION}
                      color={
                        updatedPlatform == PLAYSTATION
                          ? COLOR_PLAYSTATION
                          : COLOR_GREY
                      }
                      selected={updatedPlatform == PLAYSTATION}
                      onClick={() => setUpdatedPlatform(PLAYSTATION)}
                    >
                      {getIcon(ICON_PLAYSTATION)}
                    </Platform>
                    <Platform
                      hoverColor={COLOR_XBOX}
                      color={updatedPlatform == XBOX ? COLOR_XBOX : COLOR_GREY}
                      selected={updatedPlatform == XBOX}
                      onClick={() => setUpdatedPlatform(XBOX)}
                    >
                      {getIcon(ICON_XBOX)}
                    </Platform>
                    <Platform
                      hoverColor={COLOR_BLIZZARD}
                      fontSize={"2rem"}
                      color={
                        updatedPlatform == BLIZZARD
                          ? COLOR_BLIZZARD
                          : COLOR_GREY
                      }
                      selected={updatedPlatform == BLIZZARD}
                      onClick={() => setUpdatedPlatform(BLIZZARD)}
                    >
                      {getIcon(ICON_BLIZZARD)}
                    </Platform>
                    <Platform
                      fontSize={"1.5rem"}
                      hoverColor={COLOR_ORIGIN}
                      color={
                        updatedPlatform == ORIGIN ? COLOR_ORIGIN : COLOR_GREY
                      }
                      selected={updatedPlatform == ORIGIN}
                      onClick={() => setUpdatedPlatform(ORIGIN)}
                    >
                      {getIcon(ICON_ORIGIN)}
                    </Platform>
                  </PlatformSelection>
                </Input>
                <Input>
                  <HiddenContainer>
                    <Label>Hidden:</Label>
                    <Hidden>
                      <HiddenYes
                        active={updatedHidden}
                        onClick={() => {
                          setUpdatedHidden(true);
                        }}
                      >
                        YES
                      </HiddenYes>
                      <HiddenNo
                        active={!updatedHidden}
                        onClick={() => {
                          setUpdatedHidden(false);
                        }}
                      >
                        NO
                      </HiddenNo>
                    </Hidden>
                  </HiddenContainer>
                  <DaysTargetContainer>
                    <input
                      type="number"
                      placeholder="Target Days.."
                      value={updatedTarget}
                      onChange={(e) => setUpdatedTarget(e.target.value)}
                    />
                  </DaysTargetContainer>
                </Input>
                <SaveContainer>
                  <Button
                    width={"auto"}
                    title={"SAVE"}
                    onClick={() => {
                      updateGame();
                    }}
                  />
                  <Button
                    width={"auto"}
                    title={"CLOSE"}
                    onClick={() => {
                      setEditModeActive(false);
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
        {!isPlatinumCompleted && (
          <Before>
            {targetEnd &&
              targetStart &&
              target &&
              `${daysDifference} days - ${hoursDifference} hours - ${minutesDifference} minutes`}
          </Before>
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
        <PlatformIcon color={getColorForPlatform(platform)}>
          {getIcon(getIconForPlatform(platform))}
        </PlatformIcon>
        <TrophyCount>
          <Count>
            {
              (game?.achievements ?? [])?.filter(
                (achievement) => achievement.achieved
              ).length
            }{" "}
            / {(game?.achievements ?? []).length}
          </Count>
        </TrophyCount>
        {isPlatinumCompleted && (
          <PlatinumCompletion>
            {getImage(IMAGE_PLATINUM, "40px")}
          </PlatinumCompletion>
        )}
      </Overlay>
    </Container>
  );
}

const Before = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  font-size: 1.25rem;
  display: flex;
  padding: 1rem;
  transform: translateX(-50%);
  align-items: center;
  justify-content: center;
`;

const HiddenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const DaysTargetContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 5;
  justify-content: flex-start;

  & > input {
    width: 100px;
    margin-left: 1rem;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.5);
    outline: none;
    border: none;
    cursor: text;
  }
`;

const PlatinumCompletion = styled.div`
  display: flex;
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 2rem;
  align-items: center;
  justify-content: center;
  color: ${COLOR_PLATINUM};
  color: ${(props) => props.color};
`;

const TrophyCount = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  margin-left: 1rem;
  margin-bottom: 0.6rem;
  font-size: 1.5rem;
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Platinum = styled.div`
  display: flex;
  margin-right: 1rem;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
`;

const Hidden = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
`;

const HiddenYes = styled.div`
  display: flex;
  background-color: ${(props) =>
    props.active ? COLOR_BUTTON_PRIMARY : "rgba(0, 0, 0, 0.5)"};
  align-items: center;
  padding: 0.2rem 1rem;
  border-radius: 4px 0 0 4px;
  justify-content: center;
`;

const HiddenNo = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem 1rem;
  background-color: ${(props) =>
    props.active ? COLOR_BUTTON_PRIMARY : "rgba(0, 0, 0, 0.5)"};
  border-radius: 0 4px 4px 0;
  justify-content: center;
`;

const PlatformIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 1rem;
  margin-bottom: 0.6rem;
  font-size: 1.5rem;
  color: ${(props) => props.color};
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 380px;
  height: 150px;
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
  width: 100%;
  height: 100%;
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
  font-size: 1.25rem;
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
  font-size: 1.5rem;
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
  font-size: 1.5rem;
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
  position: absolute;
  bottom: 0;
  right: 0;
`;

const EditMode = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
`;

const EditContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: contain;

  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

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

const EditOverlay = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  flex-direction: column;
  font-size: 1rem;
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
    cursor: text;
  }
`;
