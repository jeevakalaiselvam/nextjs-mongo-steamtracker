import {
  ACHIEVEMENT_SEARCH,
  CHANGE_THEME,
  FORCE_REFRESH_ACHIEVEMENT,
  FORCE_REFRESH_GAMES,
  KEEP_ADDING_ACHIEVEMENT,
  SHOW_ACHIEVEMENT_DELETE_SELECTION,
  SHOW_CREATE_BULK_ACHIEVEMENTS,
  SHOW_CREATE_NEW_ACHIEVEMENT,
  SHOW_CREATE_NEW_ACHIEVEMENT_CARD,
  SHOW_CREATE_NEW_GAME,
} from "../types/steam.types";

const INITIAL_STATE = {
  toggle: {
    createNewGameModal: false,
    createNewAchievementModal: false,
    createNewAchievementCard: false,
    createNewBulkAchievementModal: false,
    deleteAchievementSelection: false,
    keepAddingAchievements: false,
  },
  settings: {
    forceRefreshGames: false,
    forceRefreshAchievement: false,
    themeId: 130130,
    achievementSearch: "",
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACHIEVEMENT_SEARCH:
      return {
        ...state,
        settings: {
          ...state.settings,
          achievementSearch: payload,
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
