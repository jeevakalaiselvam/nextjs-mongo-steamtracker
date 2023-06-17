import { COPPER, GOLD, PLATINUM, SILVER } from "./constantHelper";

export const getTrophyCount = (achievements) => {
  let platinum = 0,
    gold = 0,
    silver = 0,
    copper = 0;

  if (achievements?.length > 0) {
    achievements?.forEach((achievement) => {
      if (!achievement?.achieved) {
        switch (achievement?.type) {
          case PLATINUM:
            platinum++;
          case GOLD:
            gold++;
          case SILVER:
            silver++;
          case COPPER:
            copper++;
          default:
        }
      }
    });
  }

  return { platinum, gold, silver, copper };
};
