import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR_PLATINUM, getColorForPlatform } from "../../helper/colorHelper";
import {
  ICON_RIGHT,
  ICON_TROPHY,
  IMAGE_BRONZE,
  IMAGE_GOLD,
  IMAGE_PLATINUM,
  IMAGE_SILVER,
  getIcon,
  getIconForPlatform,
  getImage,
} from "../../helper/iconHelper";
import moment from "moment";
import CirclePercentage from "../atoms/CirclePercentage";
import { getAllStatsForGame } from "../../helper/gameHelper";

export default function MobileGameDisplayPSUI({ game }) {
  const { image, _id, name, platform, target, targetStart, targetEnd } = game;
  const router = useRouter();

  const isPlatinumCompleted =
    game?.achievements &&
    game?.achievements?.length &&
    game?.achievements.filter((achievement) => !achievement.achieved)?.length ==
      0;

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

  let completion = Math.floor((completed / total) * 100);

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
    <Container
      onClick={() => {
        router.push(`/mobile/games/${_id}`);
      }}
    >
      <Image alt="" src={image} />
      <Content>
        <Name
          onClick={() => {
            router.push(`/mobile/games/${_id}`);
          }}
        >
          {game?.name}
        </Name>
        <TrophyAndCompletion>
          <TrophiesContainer>
            <Trophies>
              <Trophy>
                <Icon>{getImage(IMAGE_PLATINUM, "30px")}</Icon>
                <Count>{platinumLeft}</Count>
              </Trophy>
              <Trophy>
                <Icon>{getImage(IMAGE_GOLD, "30px")}</Icon>
                <Count>{goldLeft}</Count>
              </Trophy>
              <Trophy>
                <Icon>{getImage(IMAGE_SILVER, "30px")}</Icon>
                <Count>{silverLeft}</Count>
              </Trophy>
              <Trophy>
                <Icon>{getImage(IMAGE_BRONZE, "30px")}</Icon>
                <Count>{bronzeLeft}</Count>
              </Trophy>
            </Trophies>
          </TrophiesContainer>
          {completion < 100 && <Completion>{completion} %</Completion>}
          {completion == 100 && (
            <Platinum>{getImage(IMAGE_PLATINUM, "55px")}</Platinum>
          )}
        </TrophyAndCompletion>
        <CompletionOuter>
          <CompletionLine width={`${completion}%`}></CompletionLine>
        </CompletionOuter>
      </Content>
    </Container>
  );
}

const CompletionOuter = styled.div`
  display: flex;
  width: 100%;
  margin-left: 3rem;
  align-items: center;
  justify-content: flex-start;
  background-color: #fefefe11;
  height: 2px;
  transform: translateY(-7px);
  border-radius: 4px;
`;

const CompletionLine = styled.div`
  display: flex;
  z-index: 100000;
  align-items: center;
  justify-content: flex-start;
  width: ${(props) => props.width ?? "0%"};
  background-color: #fefefe;
  height: 2px;
  border-radius: 4px;
`;

const Name = styled.div`
  display: flex;
  width: 100%;
  opacity: 0.5;
  margin-left: 3rem;
  font-weight: 100;
  align-items: center;
  justify-content: flex-start;
`;

const TrophiesContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

const Completion = styled.div`
  display: flex;
  opacity: 0.7;
  width: 100px;
  align-items: center;
  justify-content: flex-end;
`;

const Platinum = styled.div`
  display: flex;
  width: 100px;
  transform: translateX(14px);
  align-items: center;
  justify-content: flex-end;
`;

const TrophyAndCompletion = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const Atom = styled.div`
  display: flex;
  align-items: center;
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
  font-size: 1rem;
  opacity: 0.5;
  justify-content: center;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Trophies = styled.div`
  display: flex;
  padding: 1.5rem 1rem;
  align-items: center;
  transform: translateX(-2px);
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-start;
  width: 90%;
  transform: translateX(-5px);
  padding: 0.25rem 1rem;
`;

const Image = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 4px;
  width: 30%;
  height: 50px;
  background: ${(props) => `url(${props.src})`};
  background-size: cover;
  background-repeat: no-repeat;
`;

const Content = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
