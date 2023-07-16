import React from "react";
import styled from "styled-components";
import {
  ICON_COG,
  ICON_NOTIFICATION,
  ICON_STEAM,
  getIcon,
} from "../../helper/iconHelper";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  justify-content: center;
`;

export default function PSUIHeader() {
  const router = useRouter();

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
          <Name>
            <Handle>NotRealLogan</Handle>
            <Sub>Jeeva Kalaiselvam</Sub>
          </Name>
        </ProfileImage>
      </Profile>
      <Buttons>
        <Icon>{getIcon(ICON_NOTIFICATION)}</Icon>
        <Icon>{getIcon(ICON_COG)}</Icon>
      </Buttons>
    </Container>
  );
}

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
  opacity: 1;
  justify-content: flex-start;
`;

const Sub = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  opacity: 0.5;
  font-weight: 100;
  justify-content: center;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`;

const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  margin-left: -8rem;
  width: 100%;
  justify-content: center;
`;

const Profile = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.div`
  display: flex;
  flex: 1;
  margin-right: -3rem;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  display: flex;
  font-size: 2rem;
  margin-right: 3rem;
  align-items: center;
  justify-content: center;
`;
