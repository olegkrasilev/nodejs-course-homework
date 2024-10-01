const express = require("express");
const app = express();
const port = 7681;
const { NoDigitsValidator, UsernameHandler } = require("./strategy");
const { renderLoginForm } = require("./render-login-form");

const noDigitsValidator = new NoDigitsValidator();
const usernameHandler = new UsernameHandler(noDigitsValidator);

app.get("/homepage", (request, response) => {
  const loginForm = renderLoginForm();
  response.send(loginForm);
});

app.get("/login", (request, response) => {
  const query = request.query;
  const username = query.username;
  const result = usernameHandler.handle(username);
  response.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
