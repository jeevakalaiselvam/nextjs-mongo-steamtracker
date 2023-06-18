import axios from "axios";
import {
  FORCE_REFRESH_ACHIEVEMENT,
  FORCE_REFRESH_GAMES,
  KEEP_ADDING_ACHIEVEMENT,
  SHOW_ACHIEVEMENT_DELETE_SELECTION,
  SHOW_CREATE_BULK_ACHIEVEMENTS,
  SHOW_CREATE_NEW_ACHIEVEMENT,
  SHOW_CREATE_NEW_ACHIEVEMENT_CARD,
  SHOW_CREATE_NEW_GAME,
} from "../types/steam.types";

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
