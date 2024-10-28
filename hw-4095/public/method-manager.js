class MethodManager {
  constructor(selectId) {
    this.select = document.getElementById(selectId);
    this.obj = { method: "GET" };
    this.select.addEventListener("change", () => {
      this.obj.method = this.select.value;
    });
  }

  getMethod() {
    return this.obj;
  }
}
