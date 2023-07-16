import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  actionAcheievementFilter,
  actionAchievementFilterCategory,
  actionAchievementSearch,
  actionChangeTheme,
  actionForceRefreshAchievement,
  actionForceRefreshProfile,
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
import { gatherAchievementCategories } from "../../helper/gameHelper";

export default function GameMenu({ mobile, game }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const { toggle } = steam;
  const { gamesFilter, showHiddenGames, achievementFilterCategory } = settings;

  const [confirmClickMarkAll, setConfirmClickMarkAll] = useState(0);
  const [confirmClickUnmarkAll, setConfirmClickUnmarkAll] = useState(0);

  const changeTheme = () => {
    let newThemeId = themeIds[Math.floor(Math.random() * themeIds.length)];
    dispatch(actionChangeTheme(489830 ?? newThemeId));
  };

  const fontSize = mobile ? "1.5rem" : "1.25rem";
  const height = mobile ? "35px" : "25px";

  let achievements = game?.achievements ?? [];
  let { all, easy, side, missable, collectible, grind, hard, replay, online } =
    gatherAchievementCategories(achievements);

  useEffect(() => {
    if (confirmClickMarkAll >= 3) {
      const gameId = game?._id;
      dispatch(actionForceRefreshAchievement(false));
      dispatch(actionForceRefreshProfile(false));
      axios
        .get(`/api/markAllAchievements?gameId=${gameId}`)
        .then((response) => {
          dispatch(actionForceRefreshAchievement(true));
          dispatch(actionForceRefreshProfile(true));
          router.push(`/games/${gameId}`);
          setConfirmClickMarkAll(0);
        });
    }
  }, [confirmClickMarkAll, game, dispatch, router]);

  useEffect(() => {
    if (confirmClickUnmarkAll >= 3) {
      const gameId = game?._id;
      dispatch(actionForceRefreshAchievement(false));
      dispatch(actionForceRefreshProfile(false));
      axios
        .get(`/api/unmarkAllAchievements?gameId=${gameId}`)
        .then((response) => {
          dispatch(actionForceRefreshAchievement(true));
          dispatch(actionForceRefreshProfile(true));
          router.push(`/games/${gameId}`);
          setConfirmClickUnmarkAll(0);
        });
    }
  }, [confirmClickUnmarkAll, game, dispatch, router]);

  const markAllAchievements = () => {
    if (confirmClickMarkAll >= 3) {
    } else {
      setConfirmClickMarkAll((count) => count + 1);
    }
  };
  const unmarkAllAchievements = () => {
    if (confirmClickUnmarkAll >= 3) {
    } else {
      setConfirmClickUnmarkAll((count) => count + 1);
    }
  };

  return (
    <Container>
      <SubTitle>Actions</SubTitle>
      {!mobile && (
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
      {!mobile && (
        <Link>
          <Button
            height={height}
            fontSize={fontSize}
            icon={getIcon(ICON_ADD)}
            title={`Mark All ${
              confirmClickMarkAll == 0 ? "" : confirmClickMarkAll
            }`}
            onClick={() => {
              markAllAchievements();
            }}
          />
        </Link>
      )}
      {!mobile && (
        <Link>
          <Button
            height={height}
            fontSize={fontSize}
            icon={getIcon(ICON_ADD)}
            title={`Unmark All ${
              confirmClickUnmarkAll == 0 ? "" : confirmClickUnmarkAll
            }`}
            onClick={() => {
              unmarkAllAchievements();
            }}
          />
        </Link>
      )}
      <Link>
        <SearchInput
          height={height}
          onSearchChange={(search) => {
            dispatch(actionAchievementSearch(search));
          }}
          fontSize={fontSize}
        />
      </Link>
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
      <SubTitle>Filter</SubTitle>
      <>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_CATEGORY)}
            fontSize={fontSize}
            title={`ALL - ${all}`}
            active={achievementFilterCategory == ALL}
            onClick={() => {
              dispatch(actionAchievementFilterCategory(ALL));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_CATEGORY)}
            fontSize={fontSize}
            title={`EASY - ${easy}`}
            active={achievementFilterCategory == EASY}
            onClick={() => {
              dispatch(actionAchievementFilterCategory(EASY));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_CATEGORY)}
            fontSize={fontSize}
            title={`SIDE QUEST - ${side}`}
            active={achievementFilterCategory == SIDEQUEST}
            onClick={() => {
              dispatch(actionAchievementFilterCategory(SIDEQUEST));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_CATEGORY)}
            fontSize={fontSize}
            title={`MISSABLE - ${missable}`}
            active={achievementFilterCategory == MISSABLE}
            onClick={() => {
              dispatch(actionAchievementFilterCategory(MISSABLE));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_CATEGORY)}
            fontSize={fontSize}
            title={`COLLECTIBLE - ${collectible}`}
            active={achievementFilterCategory == COLLECTIBLE}
            onClick={() => {
              dispatch(actionAchievementFilterCategory(COLLECTIBLE));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_CATEGORY)}
            fontSize={fontSize}
            title={`GRIND - ${grind}`}
            active={achievementFilterCategory == GRIND}
            onClick={() => {
              dispatch(actionAchievementFilterCategory(GRIND));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_CATEGORY)}
            fontSize={fontSize}
            title={`HARD - ${hard}`}
            active={achievementFilterCategory == HARD}
            onClick={() => {
              dispatch(actionAchievementFilterCategory(HARD));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_CATEGORY)}
            fontSize={fontSize}
            title={`REPLAY - ${replay}`}
            active={achievementFilterCategory == REPLAY}
            onClick={() => {
              dispatch(actionAchievementFilterCategory(REPLAY));
            }}
          />
        </Link>
        <Link>
          <Button
            height={height}
            icon={getIcon(ICON_CATEGORY)}
            fontSize={fontSize}
            title={`ONLINE - ${online}`}
            active={achievementFilterCategory == ONLINE}
            onClick={() => {
              dispatch(actionAchievementFilterCategory(ONLINE));
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
  justify-content: flex-start;
  flex-direction: column;
  overflow: scroll;
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
  opacity: 1;
  margin-top: 0.5rem;
`;
