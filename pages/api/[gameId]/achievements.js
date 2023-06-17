import clientPromise from "../../../lib/mongo";
import mongodb from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("steamtracker");
  const gameId = req.query.gameId;
  switch (req.method) {
    case "GET":
      const game = await db
        .collection("games")
        .find({ _id: new mongodb.ObjectID(gameId) })
        .toArray();
      res.json({ status: 200, game: game[0] });
      break;
  }
}
