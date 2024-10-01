/**
 * Генерирует HTML-код для формы входа с возможностью отображения ошибки.
 *
 * @param {boolean} hasError - Указывает, произошла ли ошибка при отправке формы.
 * @param {string} submittedUsername - Имя пользователя, введенное в форму (если есть ошибка).
 * @returns {string} - HTML-код страницы с формой входа.
 */
function renderLoginForm(hasError, submittedUsername) {
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
    <form action="/login" method="get">
      <label for="username">Логин</label>
      <input
        type="text"
        name="username"
        value="${hasError ? submittedUsername : ""}"
        placeholder="Только буквы"
        id="username"
      />
      <button type="submit">Отправить</button>
      ${
        hasError
          ? '<span style="color: red;">Цифры и символы не допускаются.</span>'
          : ""
      }
    </form>
  </body>
</html>
  `;
}

exports.renderLoginForm = renderLoginForm;
