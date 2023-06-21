import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  actionAcheievementFilter,
  actionAchievementFilterCategory,
  actionAchievementSearch,
  actionChangeTheme,
  actionGamesFilter,
  actionShowAchievementDeleteSelection,
  actionShowCreateBulkAchievements,
  actionShowCreateNewAchievement,
  actionShowCreateNewAchievementCard,
  actionShowCreateNewGame,
  actionShowHiddenGames,
} from "../../store/actions/steam.actions";
import Button from "./Button";
import { useRouter } from "next/router";
import {
  ICON_ADD,
  ICON_BLIZZARD,
  ICON_CATEGORY,
  ICON_EPIC,
  ICON_GAMES,
  ICON_GOG,
  ICON_HIDDEN_INVISIBLE,
  ICON_HIDDEN_VISIBLE,
  ICON_ORIGIN,
  ICON_PLAYSTATION,
  ICON_STEAM,
  ICON_THEME,
  ICON_UPLAY,
  ICON_XBOX,
  getIcon,
} from "../../helper/iconHelper";
import axios from "axios";
import { FETCH_ALL_GAMES } from "../../helper/urlHelper";
import {
  ALL,
  BLIZZARD,
  COLLECTIBLE,
  EASY,
  EPIC,
  GOG,
  GRIND,
  HARD,
  MISSABLE,
  ONLINE,
  ORIGIN,
  PLAYSTATION,
  REPLAY,
  SIDEQUEST,
  STEAM,
  UPLAY,
  XBOX,
  themeIds,
} from "../../helper/constantHelper";
import SearchInput from "./SearchInput";
import {
  COLOR_BLIZZARD,
  COLOR_EPIC,
  COLOR_GOG,
  COLOR_ORIGIN,
  COLOR_PLAYSTATION,
  COLOR_STEAM,
  COLOR_UPLAY,
  COLOR_XBOX,
} from "../../helper/colorHelper";

export default function GameMenu({ mobile, game }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const { toggle } = steam;
  const { gamesFilter, showHiddenGames, achievementFilterCategory } = settings;

  const changeTheme = () => {
    let newThemeId = themeIds[Math.floor(Math.random() * themeIds.length)];
    dispatch(actionChangeTheme(newThemeId));
  };

  const fontSize = mobile ? "1.5rem" : "1.25rem";
  const height = mobile ? "35px" : "25px";

  return (
    <Container>
      {router.pathname?.includes("/games/") && <SubTitle>Actions</SubTitle>}
      {!mobile && router.pathname?.includes("/games/") && (
        <Link>
          <Button
            height={height}
            fontSize={fontSize}
            icon={getIcon(ICON_ADD)}
            title="Add Achievement"
            onClick={() => {
              dispatch(actionShowCreateNewAchievement(true));
            }}
          />
        </Link>
      )}
      <SubTitle>Menu</SubTitle>
      <Link>
        <Button
          height={height}
          icon={getIcon(ICON_GAMES)}
          fontSize={fontSize}
          title="My Games"
          onClick={() => {
            mobile ? router.push("/mobile/games") : router.push("/games");
          }}
        />
      </Link>
      {router.pathname == "/games" && (
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_ADD)}
            fontSize={fontSize}
            title="Add Game"
            onClick={() => {
              dispatch(actionShowCreateNewGame(true));
            }}
          />
        </Link>
      )}
      <Link>
        <Button
          height={height}
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
          height={height}
          icon={getIcon(ICON_THEME)}
          fontSize={fontSize}
          title="Mobile View"
          onClick={() => {
            router.push("/mobile/games");
          }}
        />
      </Link>
      <Link>
        <Button
          height={height}
          icon={getIcon(ICON_THEME)}
          fontSize={fontSize}
          title="Desktop View"
          onClick={() => {
            router.push("/games");
          }}
        />
      </Link>
      <Link>
        <Button
          height={height}
          icon={getIcon(
            showHiddenGames ? ICON_HIDDEN_INVISIBLE : ICON_HIDDEN_VISIBLE
          )}
          fontSize={fontSize}
          title={showHiddenGames ? "Hide Hidden" : "Show Hidden"}
          onClick={() => {
            dispatch(actionShowHiddenGames(!showHiddenGames));
          }}
        />
      </Link>
      <SubTitle>Platforms</SubTitle>
      <>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_GAMES)}
            fontSize={fontSize}
            title="Show All"
            active={gamesFilter == ALL}
            onClick={() => {
              dispatch(actionGamesFilter(ALL));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_STEAM)}
            fontSize={fontSize}
            title="Steam"
            active={gamesFilter == STEAM}
            onClick={() => {
              dispatch(actionGamesFilter(STEAM));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_PLAYSTATION)}
            fontSize={fontSize}
            title="Playstation"
            active={gamesFilter == PLAYSTATION}
            onClick={() => {
              dispatch(actionGamesFilter(PLAYSTATION));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_XBOX)}
            fontSize={fontSize}
            title="Xbox"
            active={gamesFilter == XBOX}
            onClick={() => {
              dispatch(actionGamesFilter(XBOX));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_UPLAY)}
            fontSize={fontSize}
            title="Uplay"
            active={gamesFilter == UPLAY}
            onClick={() => {
              dispatch(actionGamesFilter(UPLAY));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_GOG)}
            fontSize={fontSize}
            title="Gog"
            active={gamesFilter == GOG}
            onClick={() => {
              dispatch(actionGamesFilter(GOG));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_ORIGIN)}
            fontSize={fontSize}
            title="Origin"
            active={gamesFilter == ORIGIN}
            onClick={() => {
              dispatch(actionGamesFilter(ORIGIN));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_EPIC)}
            fontSize={fontSize}
            title="Epic Games"
            active={gamesFilter == EPIC}
            onClick={() => {
              dispatch(actionGamesFilter(EPIC));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_BLIZZARD)}
            fontSize={fontSize}
            title="Blizzard"
            active={gamesFilter == BLIZZARD}
            onClick={() => {
              dispatch(actionGamesFilter(BLIZZARD));
            }}
          />
        </Link>
      </>
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

const SubTitle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  font-size: 1rem;
  opacity: 0.5;
  margin-top: 0.5rem;
`;
