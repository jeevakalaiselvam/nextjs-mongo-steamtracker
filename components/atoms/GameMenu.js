import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  actionChangeTheme,
  actionShowAchievementDeleteSelection,
  actionShowCreateBulkAchievements,
  actionShowCreateNewAchievement,
  actionShowCreateNewAchievementCard,
  actionShowCreateNewGame,
} from "../../store/actions/steam.actions";
import Button from "./Button";
import { useRouter } from "next/router";
import {
  ICON_ADD,
  ICON_GAMES,
  ICON_THEME,
  getIcon,
} from "../../helper/iconHelper";
import axios from "axios";
import { FETCH_ALL_GAMES } from "../../helper/urlHelper";
import { themeIds } from "../../helper/constantHelper";

export default function GameMenu({ mobile }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const { toggle } = steam;

  const changeTheme = () => {
    let newThemeId = themeIds[Math.floor(Math.random() * themeIds.length)];
    dispatch(actionChangeTheme(newThemeId));
  };

  const fontSize = mobile ? "1.5rem" : "1.25rem";

  return (
    <Container>
      <Link>
        <Button
          icon={getIcon(ICON_GAMES)}
          fontSize={fontSize}
          title="My Games"
          onClick={() => {
            router.push("/games");
          }}
        />
      </Link>
      {router.pathname == "/games" && (
        <Link>
          <Button
            icon={getIcon(ICON_ADD)}
            fontSize={fontSize}
            title="Add Game"
            onClick={() => {
              dispatch(actionShowCreateNewGame(true));
            }}
          />
        </Link>
      )}
      {router.pathname?.includes("/games/") && (
        <Link>
          <Button
            icon={getIcon(ICON_ADD)}
            fontSize={fontSize}
            title="Add Achievement"
            onClick={() => {
              dispatch(actionShowCreateNewAchievement(true));
            }}
          />
        </Link>
      )}
      <Link>
        <Button
          icon={getIcon(ICON_THEME)}
          fontSize={fontSize}
          title="Change Theme"
          onClick={() => {
            changeTheme();
          }}
        />
      </Link>
      <Link>
        <Button
          icon={getIcon(ICON_THEME)}
          fontSize={fontSize}
          title="Mobile View"
          onClick={() => {
            router.push("/mobile/games");
          }}
        />
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Link = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
`;
