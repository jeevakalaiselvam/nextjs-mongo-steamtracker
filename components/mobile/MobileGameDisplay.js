import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR_PLATINUM, getColorForPlatform } from "../../helper/colorHelper";
import {
  ICON_TROPHY,
  getIcon,
  getIconForPlatform,
} from "../../helper/iconHelper";
import moment from "moment";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;
  margin-bottom: 0.5rem;
  background: ${(props) => `url(${props.image})`};
  background-repeat: no-repeat;
  background-size: cover;
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
`;

const Name = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  backdrop-filter: blur(5px);
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  left: 0;
  bottom: 0;
`;

const PlatformIcon = styled.div`
  position: absolute;
  bottom: 0.4rem;
  right: 0;
  margin-right: 1rem;
  margin-bottom: 0.6rem;
  font-size: 1.5rem;
  color: ${(props) => props.color};
  z-index: 100;
`;

const TrophyCount = styled.div`
  position: absolute;
  bottom: 0.4rem;
  left: 0;
  margin-left: 1rem;
  margin-bottom: 0.6rem;
  font-size: 1.5rem;
  color: ${(props) => props.color};
  z-index: 100;
`;

const PlatinumCompletion = styled.div`
  display: flex;
  position: absolute;
  top: 45%;
  font-size: 5rem;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  color: ${COLOR_PLATINUM};
  color: ${(props) => props.color};
`;

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

export default function MobileGameDisplay({ game }) {
  const { image, _id, name, platform, target, targetStart, targetEnd } = game;
  const router = useRouter();

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
      <Overlay>
        {!isPlatinumCompleted && (
          <Before>
            {targetEnd &&
              targetStart &&
              target &&
              `${daysDifference} days - ${hoursDifference} hours - ${minutesDifference} minutes`}
          </Before>
        )}
        {isPlatinumCompleted && <Before>PLATINUM</Before>}
        <TrophyCount>
          {
            (game?.achievements ?? [])?.filter(
              (achievement) => achievement.achieved
            ).length
          }{" "}
          / {(game?.achievements ?? []).length}
        </TrophyCount>
        <PlatformIcon color={getColorForPlatform(platform)}>
          {getIcon(getIconForPlatform(platform))}
        </PlatformIcon>
        <Name
          onClick={() => {
            router.push(`/mobile/games/${_id}`);
          }}
        >
          {name}
        </Name>
        {isPlatinumCompleted && (
          <PlatinumCompletion>{getIcon(ICON_TROPHY)}</PlatinumCompletion>
        )}
      </Overlay>
    </Container>
  );
}
