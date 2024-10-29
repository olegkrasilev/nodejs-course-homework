class MethodManager {
  constructor(selectId) {
    this.select = document.getElementById(selectId);
    this.obj = { method: "GET" };
    this.select.addEventListener("change", () => {
      this.obj.method = this.select.value;
      this.updateSelectedOption();
    });
  }

  updateSelectedOption() {
    const options = this.select.querySelectorAll("option");
    options.forEach((option) => {
      if ((option.selected = option.value === this.obj.method)) {
        option.setAttribute("selected", "selected");
      } else {
        option.removeAttribute("selected"); // Убираем атрибут selected
      }
    });
  }

  getMethod() {
    return this.obj;
  }
}
