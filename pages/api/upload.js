import moment from "moment";
import clientPromise from "../../lib/mongo";
import mongodb from "mongodb";
import { v4 as uuidv4 } from "uuid";
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("steamtracker");
  switch (req.method) {
    case "GET":
      res.status(200).json({
        status: "success",
        allAchievements,
      });
      break;
  }
}
