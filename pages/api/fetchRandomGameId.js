import axios from "axios";
import { FETCH_ALL_GAMES } from "../../helper/urlHelper";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      axios.get(FETCH_ALL_GAMES).then((response) => {
        let allGameIds = response.data.response.games.map((game) => game.appid);
        res.json({ status: 200, games: allGameIds });
      });
      break;
  }
}
