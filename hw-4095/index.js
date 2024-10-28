const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
const port = 7681;

app.use(express.static("public"));
app.use(bodyParser.json());

async function init() {
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  app.post("/proxy-request", async (req, res) => {
    const { url, params, headers, method, body } = req.body;
    try {
      const fullUrl = new URL(url);
      if (params) {
        Object.keys(params).forEach((key) =>
          fullUrl.searchParams.append(key, params[key])
        );
      }

      const response = await fetch(fullUrl.toString(), {
        method,
        headers,
        ...(method !== "GET" && { body }),
        redirect: "manual",
      });
      const statusCode = response.status;
      let responseBody = await response.text();
      const responseHeaders = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      res.status(statusCode).json({
        body: responseBody,
        headers: responseHeaders,
        code: statusCode,
      });
    } catch (error) {
      res.status(500).json({
        body: { error: error.message },
        headers: {},
        code: 500,
      });
    }
  });

  app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
  });
}
init();
