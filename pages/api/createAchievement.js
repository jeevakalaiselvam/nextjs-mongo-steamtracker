import clientPromise from "../../lib/mongo";
import mongodb from "mongodb";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("steamtracker");
  switch (req.method) {
    case "POST":
      let achievement = req.body.achievement;
      let name = achievement?.name ?? "No Name";
      let image = achievement?.image;
      let description = achievement?.description ?? "No Description";
      let gameId = achievement?.id;
      let type = achievement?.type ?? "copper";
      let query = { _id: new mongodb.ObjectID(gameId) };
      let game = await db.collection("games").findOne(query);
      let newAchievents = [
        ...(game.achievements ?? []),
        { name, image, gameId, type, description, id: uuidv4() },
      ];
      let toUpdate = { $set: { achievements: newAchievents } };
      let games = await db.collection("games").updateOne(query, toUpdate);
      res.json(games);
      break;
  }
}
