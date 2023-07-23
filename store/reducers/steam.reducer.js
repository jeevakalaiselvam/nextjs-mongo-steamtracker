import { addAchievementToPinnedOrRemove } from "../../helper/gameHelper";
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
  LEVEL_CHANGE,
  PIN_ACHIEVEMENTS,
  SHOW_ACHIEVEMENT_DELETE_SELECTION,
  SHOW_CREATE_BULK_ACHIEVEMENTS,
  SHOW_CREATE_NEW_ACHIEVEMENT,
  SHOW_CREATE_NEW_ACHIEVEMENT_CARD,
  SHOW_CREATE_NEW_GAME,
  SHOW_HIDDEN_GAMES,
} from "../types/steam.types";

const INITIAL_STATE = {
  toggle: {
    createNewGameModal: false,
    createNewAchievementModal: false,
    createNewAchievementCard: false,
    createNewBulkAchievementModal: false,
    deleteAchievementSelection: false,
    keepAddingAchievements: false,
    showLevelUpModal: false,
  },
  settings: {
    forceRefreshGames: false,
    forceRefreshAchievement: false,
    themeId: 489830,
    achievementSearch: "",
    achievementFilter: "",
    achievementFilterCategory: "",
    showHiddenGames: false,
    gamesFilter: "",
    forceRefreshProfile: false,
    pinnedAchievements: {},
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case LEVEL_CHANGE:
      return {
        ...state,
        toggle: {
          ...state.toggle,
          showLevelUpModal: payload,
        },
      };
    case PIN_ACHIEVEMENTS:
      return {
        ...state,
        settings: {
          ...state.settings,
          pinnedAchievements: addAchievementToPinnedOrRemove(
            payload.game,
            payload.achievementId,
            state?.settings?.pinnedAchievements ?? {}
          ),
        },
      };
    case ACHIEVEMENT_FILTER_CATEGORY:
      return {
        ...state,
        settings: {
          ...state.settings,
          achievementFilterCategory: payload,
        },
      };
    case FORCE_REFRESH_PROFILE:
      return {
        ...state,
        settings: {
          ...state.settings,
          forceRefreshProfile: payload,
        },
      };
    case GAMES_FILTER:
      return {
        ...state,
        settings: {
          ...state.settings,
          gamesFilter: payload,
        },
      };
    case SHOW_HIDDEN_GAMES:
      return {
        ...state,
        settings: {
          ...state.settings,
          showHiddenGames: payload,
        },
      };
    case ACHIEVEMENT_SEARCH:
      return {
        ...state,
        settings: {
          ...state.settings,
          achievementSearch: payload,
        },
      };
    case ACHIEVEMENT_FILTER:
      return {
        ...state,
        settings: {
          ...state.settings,
          achievementFilter: payload,
        },
      };
    case CHANGE_THEME:
      return {
        ...state,
        settings: {
          ...state.settings,
          themeId: payload,
        },
      };
    case KEEP_ADDING_ACHIEVEMENT:
      return {
        ...state,
        toggle: {
          ...state.toggle,
          keepAddingAchievements: payload,
        },
      };
    case SHOW_CREATE_NEW_GAME:
      return {
        ...state,
        toggle: {
          ...state.toggle,
          createNewGameModal: payload,
        },
      };
    case SHOW_CREATE_NEW_ACHIEVEMENT:
      return {
        ...state,
        toggle: {
          ...state.toggle,
          createNewAchievementModal: payload,
        },
      };
    case SHOW_CREATE_NEW_ACHIEVEMENT_CARD:
      return {
        ...state,
        toggle: {
          ...state.toggle,
          createNewAchievementCard: payload,
        },
      };

    case SHOW_CREATE_BULK_ACHIEVEMENTS:
      return {
        ...state,
        toggle: {
          ...state.toggle,
          createNewBulkAchievementModal: payload,
        },
      };

    case SHOW_ACHIEVEMENT_DELETE_SELECTION:
      return {
        ...state,
        toggle: {
          ...state.toggle,
          deleteAchievementSelection: payload,
        },
      };
    case FORCE_REFRESH_GAMES:
      return {
        ...state,
        settings: {
          ...state.settings,
          forceRefreshGames: payload,
        },
      };
    case FORCE_REFRESH_ACHIEVEMENT:
      return {
        ...state,
        settings: {
          ...state.settings,
          forceRefreshAchievement: payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
