export const COLOR_PLATINUM = "#2298F8";
export const COLOR_GOLD = "#FCE72A";
export const COLOR_SILVER = "#FEFEFE";
export const COLOR_COPPER = "#F08A41";
export const COLOR_DANGER = "#EC4134";
export const COLOR_BUTTON_PRIMARY = "#3D69CB";

export const PLATINUM = "platinum";
export const GOLD = "gold";
export const COPPER = "copper";

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
