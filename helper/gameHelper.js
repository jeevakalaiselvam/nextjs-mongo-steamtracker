import {
  COLLECTIBLE,
  COPPER,
  EASY,
  GOLD,
  GRIND,
  HARD,
  MISSABLE,
  ONLINE,
  PLATINUM,
  REPLAY,
  SIDEQUEST,
  SILVER,
} from "./constantHelper";

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
    return { platinum, gold, silver, copper };
  } else {
    return { platinum: -1, gold: -1, silver: -1, copper: -1 };
  }
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

const EACH_LEVEL_XP = 500;

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

  let remainingPoints = totalPoints;
  let beforeBreakingPoints = 0;
  let breakPoint = 0;
  let currentLevel = 0;
  while (remainingPoints > 0) {
    if (currentLevel < 100) {
      currentLevel++;
      beforeBreakingPoints = remainingPoints;
      breakPoint = 60;
      remainingPoints = remainingPoints - 60;
    } else if (currentLevel >= 100 && currentLevel < 199) {
      currentLevel++;
      beforeBreakingPoints = remainingPoints;
      breakPoint = 90;
      remainingPoints = remainingPoints - 90;
    } else if (currentLevel >= 200 && currentLevel < 299) {
      currentLevel++;
      beforeBreakingPoints = remainingPoints;
      breakPoint = 150;
      remainingPoints = remainingPoints - 150;
    } else if (currentLevel >= 300 && currentLevel < 399) {
      currentLevel++;
      beforeBreakingPoints = remainingPoints;
      breakPoint = 300;
      remainingPoints = remainingPoints - 300;
    } else if (currentLevel >= 400 && currentLevel < 499) {
      currentLevel++;
      beforeBreakingPoints = remainingPoints;
      breakPoint = 450;
      remainingPoints = remainingPoints - 450;
    } else if (currentLevel >= 500 && currentLevel < 599) {
      currentLevel++;
      beforeBreakingPoints = remainingPoints;
      breakPoint = 600;
      remainingPoints = remainingPoints - 600;
    } else if (currentLevel >= 600 && currentLevel < 699) {
      currentLevel++;
      beforeBreakingPoints = remainingPoints;
      breakPoint = 900;
      remainingPoints = remainingPoints - 900;
    } else if (currentLevel >= 700 && currentLevel < 799) {
      currentLevel++;
      beforeBreakingPoints = remainingPoints;
      breakPoint = 1350;
      remainingPoints = remainingPoints - 1350;
    } else if (currentLevel >= 800 && currentLevel < 899) {
      currentLevel++;
      beforeBreakingPoints = remainingPoints;
      breakPoint = 1800;
      remainingPoints = remainingPoints - 1800;
    } else if (currentLevel >= 900 && currentLevel < 999) {
      currentLevel++;
      beforeBreakingPoints = remainingPoints;
      breakPoint = 2700;
      remainingPoints = remainingPoints - 2700;
    }
  }

  return {
    currentLevel: currentLevel - 1,
    totalPoints,
    toNext: breakPoint - beforeBreakingPoints,
  };
};

export const gatherAchievementCategories = (achievements) => {
  let all = 0,
    easy = 0,
    side = 0,
    missable = 0,
    collectible = 0,
    grind = 0,
    hard = 0,
    replay = 0,
    online = 0;

  achievements?.forEach((achievement) => {
    all++;
    if (!achievement.achieved) {
      achievement?.categories?.forEach((category) => {
        switch (category) {
          case EASY:
            easy++;
            break;
          case SIDEQUEST:
            side++;
            break;
          case MISSABLE:
            missable++;
            break;
          case COLLECTIBLE:
            collectible++;
            break;
          case GRIND:
            grind++;
            break;
          case HARD:
            hard++;
            break;
          case REPLAY:
            replay++;
            break;
          case ONLINE:
            online++;
            break;
        }
      });
    }
  });

  return {
    all,
    easy,
    side,
    missable,
    collectible,
    grind,
    hard,
    replay,
    online,
  };
};

export const getAllStatsForGame = (game) => {
  let total = 0,
    completed = 0,
    notCompleted = 0,
    platinum = 0,
    gold = 0,
    silver = 0,
    bronze = 0,
    platinumCompleted = 0,
    goldCompleted = 0,
    silverCompleted = 0,
    bronzeCompleted = 0,
    platinumLeft = 0,
    goldLeft = 0,
    silverLeft = 0,
    bronzeLeft = 0;
  game?.achievements?.forEach((achievement) => {
    if (achievement?.type == PLATINUM) {
      platinum++;
      if (achievement?.achieved) {
        platinumCompleted++;
      } else {
        platinumLeft++;
      }
    }
    if (achievement?.type == GOLD) {
      gold++;
      if (achievement?.achieved) {
        goldCompleted++;
      } else {
        goldLeft++;
      }
    }
    if (achievement?.type == SILVER) {
      silver++;
      if (achievement?.achieved) {
        silverCompleted++;
      } else {
        silverLeft++;
      }
    }
    if (achievement?.type == COPPER) {
      bronze++;
      if (achievement?.achieved) {
        bronzeCompleted++;
      } else {
        bronzeLeft++;
      }
    }
    if (achievement?.achieved) {
      completed++;
    } else {
      notCompleted++;
    }
    total++;
  });
  return {
    total,
    completed,
    notCompleted,
    platinum,
    gold,
    silver,
    bronze,
    platinumCompleted,
    goldCompleted,
    silverCompleted,
    bronzeCompleted,
    platinumLeft,
    goldLeft,
    silverLeft,
    bronzeLeft,
  };
};

export const findRarestAchievementForGame = (achievements) => {
  let rarestAchievement = null;

  rarestAchievement = achievements
    ?.filter((achievement) => achievement.achieved)
    ?.sort((ach1, ach2) => {
      return ach2?.percentage - ach1?.percentage;
    })?.[0];

  return rarestAchievement;
};
