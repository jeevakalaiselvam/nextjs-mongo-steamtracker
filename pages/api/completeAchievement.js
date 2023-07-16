import moment from "moment";
import clientPromise from "../../lib/mongo";
import mongodb from "mongodb";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("steamtracker");
  switch (req.method) {
    case "POST":
      let achievementId = req.query.achievementId;
      let gameId = req.query.gameId;
      let achieved = req.body.achieved;
      let unlockTime = req.body.unlockTime;
      let query = { _id: new mongodb.ObjectID(gameId) };
      let game = await db.collection("games").findOne(query);
      let updatedAchievements = game.achievements.map((achievement) => {
        if (achievement.id == achievementId) {
          let updatedAchievement = {
            ...achievement,
            achieved: achieved,
            unlockTime: unlockTime,
          };
          return updatedAchievement;
        } else {
          return achievement;
        }
      });
      let toUpdate = {
        $set: { achievements: updatedAchievements, lastPlayed: moment.now() },
      };
      let games = await db.collection("games").updateOne(query, toUpdate);
      res.json(games);
      break;
  }
}
