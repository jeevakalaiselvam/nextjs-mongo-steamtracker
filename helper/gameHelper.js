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
            break;
          case GOLD:
            gold++;
            break;
          case SILVER:
            silver++;
            break;
          case COPPER:
            copper++;
            break;
          default:
            break;
        }
      }
    });
  }

  return { platinum, gold, silver, copper };
};

export const calculateAllTrophyCountForGames = (games) => {
  let platinum = 0,
    gold = 0,
    silver = 0,
    copper = 0;

  if (games && games?.length > 0) {
    games.forEach((game) => {
      let achievements = game.achievements;
      if (achievements?.length > 0) {
        achievements?.forEach((achievement) => {
          if (achievement?.achieved) {
            switch (achievement?.type) {
              case PLATINUM:
                platinum++;
                break;
              case GOLD:
                gold++;
                break;
              case SILVER:
                silver++;
                break;
              case COPPER:
                copper++;
                break;
              default:
                break;
            }
          }
        });
      }
    });
  }

  return { platinum, gold, silver, copper };
};

const getPointForTrophyType = (type) => {
  switch (type) {
    case PLATINUM:
      return 300;
    case GOLD:
      return 90;
    case SILVER:
      return 30;
    case COPPER:
      return 15;
    default:
  }
};

export const calculateLevel = (games) => {
  let totalPoints = 0;

  if (games?.length > 0) {
    games.forEach((game) => {
      if (game?.achievements?.length > 0) {
        game?.achievements?.forEach((achievement) => {
          if (achievement.achieved) {
            let currentPoint = getPointForTrophyType(
              achievement?.type ?? COPPER
            );
            totalPoints += currentPoint;
          }
        });
      }
    });
  }

  let level_1_99 = 0;
  let level_99_199 = 0;
  let level_199_200 = 0;
  let level_299_300 = 0;
  let level_399_400 = 0;
  let level_499_500 = 0;
  let level_599_600 = 0;
  let level_699_700 = 0;
  let level_799_800 = 0;
  let level_899_900 = 0;
  let level_999_1000 = 0;

  let remainingPoints = totalPoints;

  if (remainingPoints >= 60) {
    let levelsIn1_99 = remainingPoints / 60;
    level_1_99 = levelsIn1_99 >= 99 ? 99 : levelsIn1_99;
    if (levelsIn1_99 >= 99) {
      remainingPoints = remainingPoints - 99 * 60;
    }
  }

  if (remainingPoints >= 90) {
    let levelsIn1_99 = remainingPoints / 90;
    level_99_199 = levelsIn1_99 >= 99 ? 99 : levelsIn1_99;
    if (levelsIn1_99 >= 99) {
      remainingPoints = remainingPoints - 99 * 90;
    }
  }

  let finalLevel =
    level_1_99 +
    level_99_199 +
    level_199_200 +
    level_299_300 +
    level_399_400 +
    level_499_500 +
    level_599_600 +
    level_699_700 +
    level_799_800 +
    level_899_900 +
    level_999_1000;

  return finalLevel;
};
