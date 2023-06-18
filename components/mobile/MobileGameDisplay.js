import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { getColorForPlatform } from "../../helper/colorHelper";
import { getIcon, getIconForPlatform } from "../../helper/iconHelper";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 160px;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  margin-bottom: 0.5rem;
  background: ${(props) => `url(${props.image})`};
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
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

export default function MobileGameDisplay({ game }) {
  const { image, _id, name, platform, achievements } = game;
  const router = useRouter();

  return (
    <Container image={image}>
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
    </Container>
  );
}
