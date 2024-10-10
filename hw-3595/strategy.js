const jsonResponseStrategy = (data) => {
  return JSON.stringify({ message: data });
};

const htmlResponseStrategy = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return "<div>Нет доступных данных</div>";
  }

  return data
    .map(
      (item, index) => `<div>Вариант ${index + 1}: ${item.votes} голосов</div>`
    )
    .join("");
};

const xmlResponseStrategy = (data) => {
  return `<response><message>${data
    .map(
      (item, index) => `<div>Вариант ${index + 1}: ${item.votes} голосов</div>`
    )
    .join("")}</message></response>`;
};

class ResponseContext {
  constructor() {
    this.strategies = {
      "application/json": jsonResponseStrategy,
      "text/html": htmlResponseStrategy,
      "application/xml": xmlResponseStrategy,
    };
  }

  sendResponse(header, data) {
    const strategy =
      this.strategies[header] || this.strategies["application/json"];
    return strategy(data);
  }
}

module.exports = ResponseContext;
