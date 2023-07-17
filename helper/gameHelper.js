import {
  BRONZE,
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

export const getXPForTrophyType = (type) => {
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
      return 0;
  }
};

export const calculateLevelForGame = (games) => {
  let currentLevel = 0,
    xpToNext = 0,
    xpToNextPercentageComplete = 0,
    totalTrophies = 0,
    totalPlatinum = 0,
    totalBronze = 0,
    totalSilver = 0,
    totalGold = 0;
  let totalXP = 0;

  if (games?.length) {
    games?.forEach((game) => {
      if (game?.achievements) {
        game?.achievements?.forEach((achievement) => {
          if (achievement.achieved) {
            totalXP += getXPForTrophyType(achievement?.type ?? COPPER);
            totalTrophies++;
            if (achievement?.type == PLATINUM) {
              totalPlatinum++;
            }
            if (achievement?.type == GOLD) {
              totalGold++;
            }
            if (achievement?.type == SILVER) {
              totalSilver++;
            }
            if (achievement?.type == BRONZE) {
              totalBronze++;
            }
          }
        });
      }
    });
  }

  return {
    currentLevel,
    xpToNext,
    xpToNextPercentageComplete,
    totalXP,
    totalTrophies,
    totalPlatinum,
    totalBronze,
    totalSilver,
    totalGold,
  };
};

// Levels 1-99: 60 points (4 bronzes) per level-up
// Levels 100-199: 90 points (6 bronzes) per level-up
// Levels 200-299: 450 points (30 bronzes) per level-up
// Levels 300-399: 900 points (60 bronzes) per level-up
// Levels 400-499: 1,350 points (90 bronzes) per level-up
// Levels 500-599: 1,800 points (120 bronzes) per level-up
// Levels 600-699: 2,250 points (150 bronzes) per level-up
// Levels 700-799: 2,700 points (180 bronzes) per level-up
// Levels 800-899: 3,150 points (210 bronzes) per level-up
// Levels 900-999: 3,600 points (240 bronzes) per level-up

export const calculateLevelFromXP = (totalXP) => {
  let currentLevel = 0;
  let remainingXP = totalXP;
  let lastLevel = 0;
  let toNext = 0;
  let xpForNext = 0;

  let L0_100 = 60;
  let L100_200 = 90;
  let L200_300 = 450;
  let L300_400 = 900;
  let L400_500 = 1350;

  while (remainingXP >= L0_100) {
    if (currentLevel >= 0 && currentLevel < 100) {
      currentLevel++;
      remainingXP = remainingXP - L0_100;
      console.log(
        "JEEVA REMAINING XP 0-100 LEVEL UP",
        remainingXP,
        currentLevel
      );
      lastLevel = "0-100";
      toNext = (remainingXP / L0_100) * 100;
      xpForNext = L0_100 - remainingXP;
    } else {
      console.log("JEEVA REMAINING XP 0-100 END", remainingXP, currentLevel);
      toNext = (remainingXP / L0_100) * 100;
      xpForNext = L0_100 - remainingXP;
      break;
    }
  }

  while (remainingXP >= L100_200) {
    if (currentLevel >= 99 && currentLevel < 200) {
      currentLevel++;
      remainingXP = remainingXP - L100_200;
      console.log(
        "JEEVA REMAINING XP 100-200 LEVEL UP",
        remainingXP,
        currentLevel
      );
      lastLevel = "100-200";
      toNext = (remainingXP / L100_200) * 100;
      xpForNext = L100_200 - remainingXP;
    } else {
      console.log("JEEVA REMAINING XP 100-200 END", remainingXP, currentLevel);
      toNext = (remainingXP / L100_200) * 100;
      xpForNext = L100_200 - remainingXP;
      break;
    }
  }

  while (remainingXP >= L200_300) {
    if (currentLevel >= 199 && currentLevel < 300) {
      currentLevel++;
      remainingXP = remainingXP - L200_300;
      console.log(
        "JEEVA REMAINING XP 200-300 LEVEL UP",
        remainingXP,
        currentLevel
      );
      lastLevel = "200-300";
      toNext = (remainingXP / L200_300) * 100;
      xpForNext = L200_300 - remainingXP;
    } else {
      console.log("JEEVA REMAINING XP 200-300 END", remainingXP, currentLevel);
      toNext = (remainingXP / L200_300) * 100;
      xpForNext = L200_300 - remainingXP;
      break;
    }
  }

  while (remainingXP >= L300_400) {
    if (currentLevel >= 299 && currentLevel < 400) {
      currentLevel++;
      remainingXP = remainingXP - L300_400;
      console.log(
        "JEEVA REMAINING XP 300-400 LEVEL UP",
        remainingXP,
        currentLevel
      );
      lastLevel = "300-400";
      toNext = (remainingXP / L300_400) * 100;
      xpForNext = L300_400 - remainingXP;
    } else {
      console.log("JEEVA REMAINING XP 300-400 END", remainingXP, currentLevel);
      toNext = (remainingXP / L300_400) * 100;
      xpForNext = L300_400 - remainingXP;
      break;
    }
  }

  while (remainingXP >= L400_500) {
    if (currentLevel >= 399 && currentLevel < 500) {
      currentLevel++;
      remainingXP = remainingXP - L400_500;
      console.log(
        "JEEVA REMAINING XP 399-500 LEVEL UP",
        remainingXP,
        currentLevel
      );
      lastLevel = "399-500";
      toNext = (remainingXP / L400_500) * 100;
      xpForNext = L400_500 - remainingXP;
    } else {
      console.log("JEEVA REMAINING XP 399-500 END", remainingXP, currentLevel);
      toNext = (remainingXP / L400_500) * 100;
      xpForNext = L400_500 - remainingXP;
      break;
    }
  }

  return {
    currentLevel,
    toNext: Math.floor(toNext),
    xpForNext: xpForNext,
  };
};

export const getUnCompletedGames = (games) => {
  let uncompletedGames = [];
  games?.forEach((game) => {
    let gameCompleted = true;
    game?.achievements?.forEach((achievement) => {
      if (!achievement.achieved) {
        gameCompleted = false;
      }
    });
    if (!gameCompleted) {
      uncompletedGames.push(game);
    }
  });

  return uncompletedGames;
};
