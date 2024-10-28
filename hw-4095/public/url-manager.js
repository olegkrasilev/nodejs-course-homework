class UrlManager {
  constructor(inputId) {
    this.input = document.getElementById(inputId);
    this.obj = { url: "" };
    this.input.addEventListener("input", () => {
      this.obj.url = this.input.value;
    });
  }

  getUrl() {
    return this.obj;
  }
}
