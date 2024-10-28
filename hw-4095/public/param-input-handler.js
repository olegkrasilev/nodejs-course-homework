class DynamicInputHandler {
  constructor(wrapperId, triggerButtonId, layoutId, dataManager, type) {
    this.wrapper = document.getElementById(wrapperId);
    this.triggerButton = document.getElementById(triggerButtonId);
    this.layout = document.getElementById(layoutId);
    this.dataManager = dataManager;
    this.triggerButton.addEventListener("click", this.createRow.bind(this));
    this.type = type;
  }

  createRow() {
    const rowLayout = this.layout.content.cloneNode(true);
    const row = rowLayout.querySelector(".input-group");
    const inputKey = row.querySelector('input[name="key"]');
    const inputValue = row.querySelector('input[name="value"]');
    const deleteButton = row.querySelector("button");
    rowLayout.querySelector(".input-group-text").textContent = this.type;

    const rowId = Date.now().toString();
    this.dataManager.addEntry(rowId, "", "");

    inputKey.addEventListener("input", () => {
      this.dataManager.updateEntry(rowId, inputKey.value, inputValue.value);
    });

    inputValue.addEventListener("input", () => {
      this.dataManager.updateEntry(rowId, inputKey.value, inputValue.value);
    });

    deleteButton.addEventListener("click", () => {
      this.deleteRow(row, rowId);
    });

    this.wrapper.appendChild(row);
  }

  deleteRow(row, rowId) {
    this.dataManager.removeEntry(rowId);
    this.wrapper.removeChild(row);
  }
}
