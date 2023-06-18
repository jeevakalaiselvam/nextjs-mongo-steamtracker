import {
  BLIZZARD,
  EPIC,
  GOG,
  ORIGIN,
  PLAYSTATION,
  STEAM,
  UPLAY,
  XBOX,
} from "./constantHelper";

export const COLOR_PLATINUM = "#667FB2";
export const COLOR_GOLD = "#CD9A46";
export const COLOR_SILVER = "#D6D6D6";
export const COLOR_COPPER = "#BF6A3A";
export const COLOR_DANGER = "#EC4134";
export const COLOR_SUCCESS = "#5CB85C";
export const COLOR_BUTTON_PRIMARY = "#277FFE";
export const COLOR_GREY = "#555555";

export const PLATINUM = "PLATINUM";
export const GOLD = "GOLD";
export const COPPER = "COPPER";

export const getColor = (trophyType) => {
  switch (trophyType) {
    case PLATINUM:
      return COLOR_PLATINUM;
    case GOLD:
      return COLOR_GOLD;
    case COPPER:
      return COLOR_COPPER;
    default:
      return COLOR_SILVER;
  }
};

export const COLOR_STEAM = "#006CCA";
export const COLOR_UPLAY = "#016CF6";
export const COLOR_EPIC = "#E0E0E0";
export const COLOR_GOG = "#BD00E2";
export const COLOR_BLIZZARD = "#03A4EC";
export const COLOR_PLAYSTATION = "#006CCA";
export const COLOR_XBOX = "#0F770F";
export const COLOR_MICROSOFT = "#494A4E";
export const COLOR_ORIGIN = "#ED692C";

export const getColorForPlatform = (platform) => {
  switch (platform) {
    case PLAYSTATION:
      return COLOR_PLAYSTATION;
    case XBOX:
      return COLOR_XBOX;
    case GOG:
      return COLOR_GOG;
    case EPIC:
      return COLOR_EPIC;
    case STEAM:
      return COLOR_STEAM;
    case UPLAY:
      return COLOR_UPLAY;
    case BLIZZARD:
      return COLOR_BLIZZARD;
    case ORIGIN:
      return COLOR_ORIGIN;
    default:
  }
};
