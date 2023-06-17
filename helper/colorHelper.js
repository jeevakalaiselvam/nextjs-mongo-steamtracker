export const COLOR_PLATINUM = "#277FFE";
export const COLOR_GOLD = "#FCE72A";
export const COLOR_SILVER = "#FEFEFE";
export const COLOR_COPPER = "#F08A41";
export const COLOR_DANGER = "#EC4134";
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
