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
      let name = req.body.game.name;
      let description = req.body.game.description;
      let image = req.body.game.image;
      let type = req.body.game.type;
      let query = { _id: new mongodb.ObjectID(gameId) };
      let game = await db.collection("games").findOne(query);
      let updatedAchievements = game.achievements.map((achievement) => {
        if (achievement.id == achievementId) {
          let updatedAchievement = {
            ...achievement,
            name,
            description,
            image,
            type,
          };
          return updatedAchievement;
        } else {
          return achievement;
        }
      });
      let toUpdate = { $set: { achievements: updatedAchievements } };
      let games = await db.collection("games").updateOne(query, toUpdate);
      res.json(games);
      break;
  }
}
