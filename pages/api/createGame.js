import moment from "moment";
import clientPromise from "../../lib/mongo";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("steamtracker");
  switch (req.method) {
    case "POST":
      let game = req.body.game;
      let games = await db.collection("games").insertOne({
        ...game,
        created: moment.now(),
        lastUpdated: moment.now(),
      });
      res.json(games);
      break;
  }
}

//FORMAT FOR PSN PROFILE
/*
JSON.stringify(
  new Array(
    $x("//table//tbody//tr//td//a[@class='title']").map(
      (i) => i.innerHTML
    ).length
  )
    .fill(0)
    .map((item, index) => ({
      id: String(index),
      name: $x("//table//tbody//tr//td//a[@class='title']").map(
        (i) => i.innerHTML
      )[index],
      image: $x(
        "//tr//td//img[@class='trophy unearned'] | //tr//td//img[@class='trophy earned']"
      ).map((i) => i.currentSrc)[index],
      description: $x(
        "//div[contains(@class,'section-holder')]//table//tbody//tr//td//a[@class='title']/.."
      )
        .map((i) => i.innerHTML)
        .map((item) => item?.split("<br>")[1].split("\n\t")[0])[index],
      percentage: $x(
        "//div[contains(@class,'section-holder')]//table//tbody//tr//td//span[@class='typo-top']"
      ).map((i) => i.innerHTML)[index],
      type: $x("//table[@class='zebra']//tr//td[5]//center/img").map(
        (i) => i.alt
      )[index],
      categories: ["STORY"],
    }))
);
*/

//NEW TIME LOGIC
/*
JSON.stringify(
  new Array(
    $x("//table//tbody//tr//td//a[@class='title']").map(
      (i) => i.innerHTML
    ).length
  )
    .fill(0)
    .map((item, index) => ({
      id: String(new Date().getTime() + (Math.floor(Math.random() * 10000))),
      name: $x("//table//tbody//tr//td//a[@class='title']").map(
        (i) => i.innerHTML
      )[index],
      image: $x(
        "//tr//td//img[@class='trophy unearned'] | //tr//td//img[@class='trophy earned']"
      ).map((i) => i.currentSrc)[index],
      description: $x(
        "//div[contains(@class,'section-holder')]//table//tbody//tr//td//a[@class='title']/.."
      )
        .map((i) => i.innerHTML)
        .map((item) => item?.split("<br>")[1].split("\n\t")[0]?.replaceAll('\"',''))[index],
      percentage: $x(
        "//div[contains(@class,'section-holder')]//table//tbody//tr//td//span[@class='typo-top']"
      ).map((i) => i.innerHTML)[index],
      type: $x("//table[@class='zebra']//tr//td[5]//center/img").map(
        (i) => i.alt
      )[index],
      categories: ["STORY"],
    }))
)
*/
