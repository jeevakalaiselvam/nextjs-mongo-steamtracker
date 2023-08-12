import React, { useEffect } from "react";
import styled from "styled-components";
import {
  ICON_COG,
  ICON_NOTIFICATION,
  ICON_STEAM,
  IMAGE_BRONZE,
  IMAGE_GOLD,
  IMAGE_PLATINUM,
  IMAGE_SILVER,
  getIcon,
  getImage,
} from "../../helper/iconHelper";
import { useRouter } from "next/router";
import {
  calculateLevelForGame,
  calculateLevelForGameSingle,
  calculateLevelFromXP,
} from "../../helper/gameHelper";
import { useDispatch, useSelector } from "react-redux";
import { actionLevelChange } from "../../store/actions/steam.actions";
import CirclePercentage from "./CirclePercentage";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  justify-content: center;
`;

export default function PSUIHeaderForGame({
  game,
  games,
  showLevelUpModal,
  percentage,
  textCustom,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { totalPlatinum, totalBronze, totalSilver, totalGold } =
    calculateLevelForGameSingle(game);

  const { totalXP } = calculateLevelForGame(games);

  const { currentLevel, toNext, xpForNext } = calculateLevelFromXP(totalXP);

  useEffect(() => {
    if (window) {
      let oldLevel = localStorage.getItem("CURRENT_LEVEL") ?? "0";
      if (currentLevel > oldLevel) {
        dispatch(actionLevelChange(true));
      }
    }
  }, [currentLevel]);

  return (
    <Container
      onClick={() => {
        router.push(`/mobile/games`);
      }}
    >
      <Profile>
        <ProfileImage>
          <Image
            alt=""
            src="https://i.pinimg.com/736x/1b/4f/be/1b4fbe252793720e0c88cc2b65bcb8c1.jpg"
          ></Image>
          {!showLevelUpModal && (
            <Name>
              <Handle>Level {currentLevel}</Handle>
              <Sub>{toNext} %</Sub>
            </Name>
          )}
          {showLevelUpModal && (
            <NameLevelUp>
              <Handle>Level {currentLevel}</Handle>
              <Sub>{toNext} %</Sub>
            </NameLevelUp>
          )}
        </ProfileImage>
      </Profile>
      {true && (
        <Buttons>
          <Trophy>
            <IconTrophy>{getImage(IMAGE_PLATINUM, "20px")}</IconTrophy>
            <CountTrophy>{totalPlatinum}</CountTrophy>
          </Trophy>
          <Trophy>
            <IconTrophy>{getImage(IMAGE_GOLD, "20px")}</IconTrophy>
            <CountTrophy>{totalGold}</CountTrophy>
          </Trophy>
          <Trophy>
            <IconTrophy>{getImage(IMAGE_SILVER, "20px")}</IconTrophy>
            <CountTrophy>{totalSilver}</CountTrophy>
          </Trophy>
          <Trophy>
            <IconTrophy>{getImage(IMAGE_BRONZE, "20px")}</IconTrophy>
            <CountTrophy>{totalBronze}</CountTrophy>
          </Trophy>
        </Buttons>
      )}
    </Container>
  );
}

const LevelUpModal = styled.div`
  display: flex;
  flex: 2;
  padding-right: 1rem;
  align-items: center;
  justify-content: flex-end;
  background-color: red;
`;

const LevelUpText = styled.div`
  display: flex;
  padding: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;
`;

const LevelCircle = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;
`;

const Trophy = styled.div`
  display: flex;
  margin-right: 1rem;
  align-items: center;
  justify-content: center;
`;

const IconTrophy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CountTrophy = styled.div`
  display: flex;
  font-weight: 100;
  align-items: center;
  justify-content: center;
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${(props) => `url(${props.src})`};
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 4px;
  margin-right: 1rem;
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: 400;
  opacity: 1;
  font-size: 1.5rem;
  justify-content: flex-start;
`;

const Sub = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-left: 0.25rem;
  opacity: 0.5;
  font-weight: 400;
  font-size: 1.35rem;
  justify-content: flex-start;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`;

const NameLevelUp = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  animation-name: moveUp;
  animation-duration: 1s;
  animation-timing-function: ease-in;
  animation-iteration-count: 1;
  animation-direction: alternate;

  @keyframes moveUp {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    50% {
      transform: translateY(-100px);
      opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`;

const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
`;

const Profile = styled.div`
  display: flex;
  flex: 2;
  padding-left: 1rem;
  align-items: center;
  justify-content: flex-start;
`;

const Buttons = styled.div`
  display: flex;
  flex: 1;
  padding-right: 1rem;
  align-items: center;
  justify-content: flex-end;
`;

const Icon = styled.div`
  display: flex;
  font-size: 2rem;
  margin-right: 3rem;
  align-items: center;
  justify-content: center;
`;
