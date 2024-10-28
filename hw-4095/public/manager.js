class Manager {
  constructor() {
    this.entries = new Map();
  }

  addEntry(id, name, value) {
    this.entries.set(id, { name, value });
  }

  removeEntry(id) {
    this.entries.delete(id);
  }

  updateEntry(id, name, value) {
    if (this.entries.has(id)) {
      this.entries.set(id, { name, value });
    } else {
      console.warn(`Запись с id ${id} не найдена.`);
    }
  }

  getEntries() {
    const obj = {};
    for (let [, { name, value }] of this.entries) {
      obj[name] = value;
    }
    return obj;
  }
}
