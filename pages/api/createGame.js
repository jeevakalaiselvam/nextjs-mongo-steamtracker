import clientPromise from "../../lib/mongo";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("steamtracker");
  switch (req.method) {
    case "POST":
      let game = req.body.game;
      let games = await db.collection("games").insertOne(game);
      res.json(games);
      break;
  }
}
