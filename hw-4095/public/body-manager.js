class BodyManager {
  constructor(textAreaId) {
    this.textarea = document.getElementById(textAreaId);
    this.obj = { body: "" };
    this.textarea.addEventListener("input", () => {
      this.obj.body = this.textarea.value;
    });
  }

  getBody() {
    return this.obj;
  }
}
