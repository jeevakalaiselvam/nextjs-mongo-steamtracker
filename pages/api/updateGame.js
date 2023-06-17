import clientPromise from "../../lib/mongo";
import mongodb from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("steamtracker");
  switch (req.method) {
    case "POST":
      let game = req.body.game;
      let name = game.name;
      let image = game.image;
      let platform = game.platform;
      let id = game.id;
      let query = { _id: new mongodb.ObjectID(id) };
      let toUpdate = { $set: { name, image, platform } };
      let games = await db.collection("games").updateOne(query, toUpdate);
      res.json(games);
      break;
  }
}
