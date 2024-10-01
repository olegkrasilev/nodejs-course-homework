class UsernameValidator {
  validate(username) {
    throw new Error("Not implemented");
  }
}

class NoDigitsValidator extends UsernameValidator {
  validate(username) {
    if (!username) {
      return false;
    }

    const digit = /\d/.test(username);

    return !digit;
  }
}

class UsernameHandler {
  constructor(validator) {
    this.validator = validator;
  }

  handle(username) {
    if (this.validator.validate(username)) {
      return `Логин : ${username}`;
    }

    return `
      <!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
   </head>
   <style>
      body {
      display: grid;
      place-items: center;
      min-height: 100vh;
      }
      button {
      display: block;
      }
   </style>
   <body>
      <form action="http://localhost:7681/login" method="get">
         <label for="username">Логин</label>
         <input
            type="text"
            name="username"
            value="${username}"
            placeholder="Только буквы"
            id="username"
            />
         <button type="submit">Отправить</button>
         <span style="color: red;">Цифры и символы не допускаются.</span>
      </form>
   </body>
</html>
    `;
  }
}

exports.NoDigitsValidator = NoDigitsValidator;
exports.UsernameHandler = UsernameHandler;
