import React from "react";
import CirclePercentage from "./CirclePercentage";
import styled from "styled-components";
import { getAllStatsForGame } from "../../helper/gameHelper";
import {
  IMAGE_BRONZE,
  IMAGE_GOLD,
  IMAGE_PLATINUM,
  IMAGE_SILVER,
  getImage,
} from "../../helper/iconHelper";

export default function GameCompleteOverview({ game }) {
  const { total, completed, notCompleted, platinum, bronze, silver, gold } =
    getAllStatsForGame(game);

  return (
    <Overview>
      <ProfileImage>
        <Image
          alt=""
          src="https://i.pinimg.com/736x/1b/4f/be/1b4fbe252793720e0c88cc2b65bcb8c1.jpg"
        ></Image>
        <Name>Jeeva Kalaiselvam</Name>
      </ProfileImage>
      <Completion>
        <Earned>
          <EarnedNumber>{completed}</EarnedNumber>
          <EarnedText>Earned</EarnedText>
        </Earned>
        <CompletionCircle>
          <CirclePercentage
            percentage={Math.floor((completed / total) * 100)}
          />
        </CompletionCircle>
        <Available>
          <AvailableNumber>{total - completed}</AvailableNumber>
          <AvailableText>Available</AvailableText>
        </Available>
      </Completion>
      <TrophiesOverview>
        <Trophy>
          <Icon>{getImage(IMAGE_PLATINUM)}</Icon>
          <Count>{platinum}</Count>
        </Trophy>
        <Trophy>
          <Icon>{getImage(IMAGE_GOLD)}</Icon>
          <Count>{gold}</Count>
        </Trophy>
        <Trophy>
          <Icon>{getImage(IMAGE_SILVER)}</Icon>
          <Count>{silver}</Count>
        </Trophy>
        <Trophy>
          <Icon>{getImage(IMAGE_BRONZE)}</Icon>
          <Count>{bronze}</Count>
        </Trophy>
      </TrophiesOverview>
    </Overview>
  );
}

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  margin-right: 0.5rem;
  height: 30px;
  background: ${(props) => `url(${props.src})`};
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 10rem;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.5;
  justify-content: center;
`;

const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -15px;
  z-index: 1000;
  left: 25px;
`;

const Overview = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  background-color: red;
  padding: 2rem;
  background-color: #1d1d1f;
  justify-content: center;
  margin-top: 3rem;
  border-radius: 8px;
  position: relative;
`;

const Completion = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 1rem;
  margin-top: 1rem;
  transform: translateX(-2px);
  align-items: center;
  justify-content: center;
`;

const TrophiesOverview = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 1rem;
  align-items: center;
  transform: translateX(-2px);
  justify-content: center;
`;

const Trophy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  font-weight: 100;
  justify-content: center;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvailableNumber = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 100;
  justify-content: center;
`;

const AvailableText = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.5;
  font-weight: 100;
  justify-content: center;
`;

const Available = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

const EarnedNumber = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 100;
  justify-content: center;
`;

const EarnedText = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.5;
  font-weight: 100;
  justify-content: center;
`;

const Earned = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

const CompletionCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
