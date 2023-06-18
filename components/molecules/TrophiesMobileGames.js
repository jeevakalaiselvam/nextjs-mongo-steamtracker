import React from "react";
import styled from "styled-components";
import {
  ICON_BACK,
  ICON_CLOSE,
  ICON_GAMES,
  ICON_MENU,
  ICON_OPTIONS,
  ICON_TROPHY,
  getIcon,
} from "../../helper/iconHelper";
import {
  COLOR_BUTTON_PRIMARY,
  COLOR_COPPER,
  COLOR_GOLD,
  COLOR_PLATINUM,
  COLOR_SILVER,
} from "../../helper/colorHelper";
import { useRouter } from "next/router";

export default function TrophiesMobileGames({
  trophies,
  optionToggle,
  optionOpen,
  leftSidebarToggle,
  leftSidebarOpen,
}) {
  const router = useRouter();
  return (
    <Container>
      <MenuIcon
        onClick={() => {
          leftSidebarToggle(!leftSidebarOpen);
        }}
      >
        {!leftSidebarOpen && getIcon(ICON_MENU)}
        {leftSidebarOpen && getIcon(ICON_BACK)}
      </MenuIcon>
      <TrophiesContainer>
        <Trophy color={COLOR_PLATINUM}>
          <Icon>{getIcon(ICON_TROPHY)}</Icon>
          <Count>{trophies?.platinum ?? 0}</Count>
        </Trophy>

        <Trophy color={COLOR_GOLD}>
          <Icon>{getIcon(ICON_TROPHY)}</Icon>
          <Count>{trophies?.gold ?? 0}</Count>
        </Trophy>

        <Trophy color={COLOR_SILVER}>
          <Icon>{getIcon(ICON_TROPHY)}</Icon>
          <Count>{trophies?.silver ?? 0}</Count>
        </Trophy>

        <Trophy color={COLOR_COPPER}>
          <Icon>{getIcon(ICON_TROPHY)}</Icon>
          <Count>{trophies?.copper ?? 0}</Count>
        </Trophy>
      </TrophiesContainer>
      <OptionIcon
        onClick={() => {
          optionToggle(!optionOpen);
        }}
      >
        {getIcon(ICON_OPTIONS)}
      </OptionIcon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  margin-top: 0.25rem;
`;
const MenuIcon = styled.div`
  display: flex;
  font-size: 2.5rem;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

const OptionIcon = styled.div`
  display: flex;
  font-size: 2rem;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;

  &:active {
    color: ${COLOR_BUTTON_PRIMARY};
  }
`;

const TrophiesContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  transform: translateY(3px);
  justify-content: center;
`;

const Trophy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-right: 0.5rem;
  color: ${(props) => props.color};
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  justify-content: center;
  font-size: 2.25rem;
`;

const Count = styled.div`
  display: flex;
  transform: translateY(-5px);
  margin-left: 0.5rem;
  align-items: center;
  font-size: 1.5rem;
  justify-content: center;
`;
