const jsonResponseStrategy = (data) => {
  return JSON.stringify({ message: data });
};

const htmlResponseStrategy = (data) => {
  return `<h1>${JSON.stringify({ message: data })}</h1>`;
};

const xmlResponseStrategy = (data) => {
  return `<response><message>${JSON.stringify({
    message: data,
  })}</message></response>`;
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
