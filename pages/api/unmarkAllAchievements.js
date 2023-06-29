import moment from "moment";
import clientPromise from "../../lib/mongo";
import mongodb from "mongodb";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("steamtracker");
  switch (req.method) {
    case "GET":
      let gameId = req.query.gameId;
      let query = { _id: new mongodb.ObjectID(gameId) };
      let game = await db.collection("games").findOne(query);
      let updatedAchievements = game.achievements.map((achievement) => {
        let updatedAchievement = {
          ...achievement,
          achieved: false,
          unlockTime: "",
        };
        return updatedAchievement;
      });
      let toUpdate = { $set: { achievements: updatedAchievements } };
      let games = await db.collection("games").updateOne(query, toUpdate);
      res.json(games);
      break;
  }
}
