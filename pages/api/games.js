import clientPromise from "../../lib/mongo";
import mongodb from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("steamtracker");
  switch (req.method) {
    case "GET":
      const allGames = await db.collection("games").find({}).toArray();
      res.json({ status: 200, games: allGames });
      break;
  }
}
