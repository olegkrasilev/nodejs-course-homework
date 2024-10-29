function saveHTMLToLocalStorage(elementId) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Элемент с ID "${elementId}" не найден.`);
    return;
  }
  const htmlContent = element.innerHTML;
  const storedHTMLArray = JSON.parse(localStorage.getItem("htmlArray")) || [];
  storedHTMLArray.push(htmlContent);
  localStorage.setItem("htmlArray", JSON.stringify(storedHTMLArray));
}
