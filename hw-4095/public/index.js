const paramsManager = new Manager();
const headerManager = new Manager();
new DynamicInputHandler(
  "paramsContainer",
  "addParamsBtn",
  "templateRow",
  paramsManager,
  "Params"
);
new DynamicInputHandler(
  "headerContainer",
  "addHeaderBtn",
  "templateRow",
  headerManager,
  "Headers"
);

const submitFormBtn = document.getElementById("submitFormBtn");
const resetFormBtn = document.getElementById("resetFormBtn");
const form = document.getElementById("form");
const urlManager = new UrlManager("urlInput");
const bodyManager = new BodyManager("bodyInput");
const methodManager = new MethodManager("methodSelect");

submitFormBtn.addEventListener("click", async (event) => {
  const paramsObj = paramsManager.getEntries();
  const params = encodeData(paramsObj);
  const headers = headerManager.getEntries();
  const url = urlManager.getUrl();
  const body = bodyManager.getBody();
  const method = methodManager.getMethod();
  const response = await getResponse(url, params, headers, method, body);
  renderResponse(response);
});

resetFormBtn.addEventListener("click", (event) => {
  const container = document.getElementById("responseContainer");

  if (container) {
    container.innerHTML = "";
  }
  form.reset();
});

function encodeData(data) {
  return Object.keys(data)
    .map(function (key) {
      if (key.length === 0) {
        return;
      }
      return [key, data[key]].map(encodeURIComponent).join("=");
    })
    .join("&");
}

async function getResponse(url, params, headers, method, body) {
  try {
    const response = await fetch("/proxy-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...url,
        params,
        headers,
        ...method,
        body,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {}
}

function renderResponse({ body, code, headers }) {
  const html = `
  <h1>Code : </h1>
  <p>${code}</p>
  <div>
    <h1>Body : </h1>
    <div>${JSON.stringify(body, null, 2)}</div>
  </div>
    <div>
        <h1>Headers : </h1>
    <div>${JSON.stringify(headers, null, 2)}</div>
  </div>
  `;
  const container = document.getElementById("responseContainer");

  if (container) {
    container.innerHTML = "";
    container.insertAdjacentHTML("afterbegin", html);
  }
}
