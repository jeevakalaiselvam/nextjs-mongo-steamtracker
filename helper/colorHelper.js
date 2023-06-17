export const COLOR_PLATINUM = "#277FFE";
export const COLOR_GOLD = "#FCE72A";
export const COLOR_SILVER = "#FEFEFE";
export const COLOR_COPPER = "#F08A41";
export const COLOR_DANGER = "#EC4134";
export const COLOR_BUTTON_PRIMARY = "#277FFE";
export const COLOR_GREY = "#333333";

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
