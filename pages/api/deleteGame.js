import clientPromise from "../../lib/mongo";
import mongodb from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("steamtracker");
  switch (req.method) {
    case "DELETE":
      let id = req.query.id;
      let games = await db
        .collection("games")
        .deleteOne({ _id: new mongodb.ObjectID(id) });
      res.json(games);
      break;
  }
}
