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
  const {
    total,
    completed,
    notCompleted,
    platinum,
    bronze,
    silver,
    gold,
    platinumLeft,
    goldLeft,
    silverLeft,
    bronzeLeft,
  } = getAllStatsForGame(game);

  return (
    <Overview>
      <ProfileImage>
        <Image alt="" src={game?.image}></Image>
        <Name>{game?.name}</Name>
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
          <Count>{platinumLeft}</Count>
        </Trophy>
        <Trophy>
          <Icon>{getImage(IMAGE_GOLD)}</Icon>
          <Count>{goldLeft}</Count>
        </Trophy>
        <Trophy>
          <Icon>{getImage(IMAGE_SILVER)}</Icon>
          <Count>{silverLeft}</Count>
        </Trophy>
        <Trophy>
          <Icon>{getImage(IMAGE_BRONZE)}</Icon>
          <Count>{bronzeLeft}</Count>
        </Trophy>
      </TrophiesOverview>
    </Overview>
  );
}

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  margin-right: 1.5rem;
  height: 40px;
  background: ${(props) => `url(${props.src})`};
  background-repeat: no-repeat;
  background-size: cover;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.5;
  transform: translateY(-5px);
  justify-content: center;
`;

const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -30px;
  z-index: 1000;
  left: 25px;
`;

const Overview = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
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
  opacity: 0.5;
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
