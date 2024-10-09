const express = require("express");
const bodyParser = require("body-parser");
const ResponseContext = require("./strategy");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

let votes = {};
const variants = [
  { code: 1, text: "Вариант 1" },
  { code: 2, text: "Вариант 2" },
  { code: 3, text: "Вариант 3" },
];

variants.forEach((v) => (votes[v.code] = 0));

app.get("/variants", (req, res) => {
  res.json(variants);
});

app.post("/vote", (req, res) => {
  const { code } = req.body;
  if (votes[code] !== undefined) {
    votes[code] += 1;
    res.json({ success: true, message: "Голос принят" });
  } else {
    res.status(400).json({ success: false, message: "Неверный код ответа" });
  }
});

app.post("/stat", (req, res) => {
  const stats = Object.keys(votes).map((code) => ({
    code: parseInt(code),
    votes: votes[code],
  }));
  const header = req.headers.accept;
  const responseContext = new ResponseContext();
  const result = responseContext.sendResponse(header, stats);
  res.setHeader("Content-Type", header);
  res.send(result);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
