const { renderView, renderLoginForm } = require("./render-login-form");

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
    const loginForm = renderLoginForm(true, username);
    return loginForm;
  }
}

exports.NoDigitsValidator = NoDigitsValidator;
exports.UsernameHandler = UsernameHandler;
