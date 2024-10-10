const express = require("express");
const bodyParser = require("body-parser");
const ResponseContext = require("./strategy");
const readFile = require("./readFile");
const writeFile = require("./writeFile");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

async function init() {
  let votes = await readFile("./votes.json");
  let variants = await readFile("./variants.json");
  app.get("/variants", (req, res) => {
    res.json(variants);
  });

  app.post("/vote", async (req, res) => {
    const { code } = req.body;
    if (votes[code] !== undefined) {
      votes[code].votes = votes[code].votes + 1;
      await writeFile("./votes.json", JSON.stringify(votes));
      res.json({ success: true, message: "Голос принят" });
    } else {
      res.status(400).json({ success: false, message: "Неверный код ответа" });
    }
  });

  app.post("/stat", (req, res) => {
    const header = req.headers.accept;
    const responseContext = new ResponseContext();
    const result = responseContext.sendResponse(header, votes);
    res.setHeader("Content-Type", header);
    res.send(result);
  });

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
  });
}
init();

// [
//   { code: 1, votes: 4 },
//   { code: 2, votes: 2 },
//   { code: 3, votes: 2 },
// ];
