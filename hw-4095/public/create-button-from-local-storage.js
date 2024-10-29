function createButtonsFromLocalStorage() {
  const buttonContainer = document.getElementById("responseBtns");
  buttonContainer.innerHTML = "";
  const storedHTMLArray = JSON.parse(localStorage.getItem("htmlArray")) || [];
  if (storedHTMLArray.length === 0) {
    console.log("В localStorage нет сохранённых данных.");
    return;
  }

  storedHTMLArray.forEach((htmlContent, index) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const methodSelect = tempDiv.querySelector("#methodSelect");
    const urlInput = tempDiv.querySelector("#urlInput");
    const method = methodSelect ? methodSelect.value : "GET";
    const url = urlInput ? urlInput.value : ""; //
    const button = document.createElement("button");
    const classes = ["btn", "btn-success", "m-1"];
    button.classList.add(...classes);
    button.textContent = `${url} / ${method}`;
    button.setAttribute("data-html", htmlContent);
    buttonContainer.appendChild(button);
  });
  document.body.insertBefore(buttonContainer, document.body.firstChild);
}
