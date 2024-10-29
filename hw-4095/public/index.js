function init() {
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
  const saveResponseBtn = document.getElementById("saveResponseBtn");
  createButtonsFromLocalStorage();
  initializeButtonsWithHTMLInsert();

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

  saveResponseBtn.addEventListener("click", () => {
    saveHTMLToLocalStorage("formContainer");
    createButtonsFromLocalStorage();
  });
}

init();

function initializeButtonsWithHTMLInsert() {
  const formContainer = document.getElementById("formContainer");
  const buttons = document.querySelectorAll("button[data-html]");
  buttons?.forEach((button) => {
    button.addEventListener("click", () => {
      const htmlContent = button.getAttribute("data-html");
      formContainer.innerHTML = "";
      formContainer.innerHTML = htmlContent;
      init();
    });
  });
}
