import axios from "axios";
import {
  ACHIEVEMENT_FILTER,
  ACHIEVEMENT_FILTER_CATEGORY,
  ACHIEVEMENT_SEARCH,
  CHANGE_THEME,
  FORCE_REFRESH_ACHIEVEMENT,
  FORCE_REFRESH_GAMES,
  FORCE_REFRESH_PROFILE,
  GAMES_FILTER,
  KEEP_ADDING_ACHIEVEMENT,
  SHOW_ACHIEVEMENT_DELETE_SELECTION,
  SHOW_CREATE_BULK_ACHIEVEMENTS,
  SHOW_CREATE_NEW_ACHIEVEMENT,
  SHOW_CREATE_NEW_ACHIEVEMENT_CARD,
  SHOW_CREATE_NEW_GAME,
  SHOW_HIDDEN_GAMES,
} from "../types/steam.types";

export const actionForceRefreshProfile = (shouldRefresh) => {
  return {
    type: FORCE_REFRESH_PROFILE,
    payload: shouldRefresh,
  };
};

export const actionShowHiddenGames = (showHidden) => {
  return {
    type: SHOW_HIDDEN_GAMES,
    payload: showHidden,
  };
};

export const actionAchievementSearch = (search) => {
  return {
    type: ACHIEVEMENT_SEARCH,
    payload: search,
  };
};

export const actionAchievementFilterCategory = (filter) => {
  return {
    type: ACHIEVEMENT_FILTER_CATEGORY,
    payload: filter,
  };
};

export const actionGamesFilter = (filter) => {
  return {
    type: GAMES_FILTER,
    payload: filter,
  };
};

export const actionAchievementFilter = (filter) => {
  return {
    type: ACHIEVEMENT_FILTER,
    payload: filter,
  };
};

export const actionChangeTheme = (themeId) => {
  return {
    type: CHANGE_THEME,
    payload: themeId,
  };
};

export const actionKeepAddingAchievements = (toggle) => {
  return {
    type: KEEP_ADDING_ACHIEVEMENT,
    payload: toggle,
  };
};

export const actionShowCreateNewGame = (toggle) => {
  return {
    type: SHOW_CREATE_NEW_GAME,
    payload: toggle,
  };
};

export const actionShowCreateNewAchievement = (toggle) => {
  return {
    type: SHOW_CREATE_NEW_ACHIEVEMENT,
    payload: toggle,
  };
};

export const actionShowCreateNewAchievementCard = (toggle) => {
  return {
    type: SHOW_CREATE_NEW_ACHIEVEMENT_CARD,
    payload: toggle,
  };
};

export const actionShowCreateBulkAchievements = (toggle) => {
  return {
    type: SHOW_CREATE_BULK_ACHIEVEMENTS,
    payload: toggle,
  };
};

export const actionShowAchievementDeleteSelection = (toggle) => {
  return {
    type: SHOW_ACHIEVEMENT_DELETE_SELECTION,
    payload: toggle,
  };
};

export const actionForceRefreshGames = (toggle) => {
  return {
    type: FORCE_REFRESH_GAMES,
    payload: toggle,
  };
};

export const actionForceRefreshAchievement = (toggle) => {
  return {
    type: FORCE_REFRESH_ACHIEVEMENT,
    payload: toggle,
  };
};

// export const fetchAllGames = () => {
//   return (dispatch) => {
//     dispatch({ type: FETCH_ALL_GAMES_REQUEST });
//     return axios.get(API_GET_GAMES).then(
//       (data) => {
//         dispatch({ type: FETCH_ALL_GAMES_SUCCESS, payload: data.data.data });
//       },
//       (error) => {
//         dispatch({ type: FETCH_ALL_GAMES_ERROR, payload: error });
//       }
//     );
//   };
// };

// export const setHiddenAchievementsForGame = (gameId, hiddenAchievements) => {
//   return (dispatch) => {
//     return dispatch({
//       type: SET_HIDDEN_ACHIEVEMENTS_GAME,
//       payload: { gameId, hiddenAchievements },
//     });
//   };
// };
